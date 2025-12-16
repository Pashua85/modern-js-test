#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const [command, ...restArgs] = process.argv.slice(2);

if (!command) {
  console.error('[run-host-modern] Usage: run-host-modern <command> [...args]');
  process.exit(1);
}

const env = {
  ...process.env,
};

const resolvedPort = env.PORT || '8080';
env.PORT = resolvedPort;

const remotePort = env.REMOTE_PORT || '8081';

const discoverPublicHost = () => {
  const candidate =
    env.REMOTE_PUBLIC_HOST ||
    env.PUBLIC_HOST ||
    env.HOST ||
    env.SERVER_HOST ||
    '127.0.0.1';

  if (candidate === '0.0.0.0' || candidate === '::') {
    return '127.0.0.1';
  }

  return candidate;
};

if (!env.REMOTE_BASE_URL) {
  const publicHost = discoverPublicHost();
  env.REMOTE_BASE_URL = `http://${publicHost}:${remotePort}`;
}

const resolveModernBin = () => {
  const searchRoots = [
    process.cwd(),
    __dirname,
    path.join(__dirname, '..', 'host'),
  ];

  for (const root of searchRoots) {
    try {
      return require.resolve('@modern-js/app-tools/bin/modern.js', {
        paths: [root],
      });
    } catch {
      // ignore resolution errors so we can try the next root
    }
  }

  return null;
};

const modernBin = resolveModernBin();

if (!modernBin) {
  console.error(
    '[run-host-modern] Unable to locate the @modern-js/app-tools binary. Make sure dependencies are installed.',
  );
  process.exit(1);
}

const child = spawn(process.execPath, [modernBin, command, ...restArgs], {
  stdio: 'inherit',
  env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
