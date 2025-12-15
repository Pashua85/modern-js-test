const pickEntry = (options) => {
  if (!options || typeof options.ssrEntry !== 'string') {
    return null;
  }
  return options.ssrEntry;
};

const shouldUseServerEntry = () =>
  typeof window === 'undefined' && typeof global !== 'undefined';

const overrideEntry = (target, entry) => {
  if (!target || typeof target !== 'object' || !entry) {
    return;
  }
  if (typeof target.entry === 'string') {
    target.entry = entry;
  }
};

module.exports = (options = {}) => {
  const ssrEntry = pickEntry(options);

  return {
    name: 'resolve-ssr-remote-entry',
    beforeRegisterRemote(args) {
      if (!shouldUseServerEntry() || !ssrEntry) return args;
      overrideEntry(args.remote, ssrEntry);
      return args;
    },
    async afterResolve(args) {
      if (!shouldUseServerEntry() || !ssrEntry) return args;
      overrideEntry(args.remoteInfo, ssrEntry);
      return args;
    },
    loadRemoteSnapshot(args) {
      if (!shouldUseServerEntry() || !ssrEntry) return args;
      const { remoteSnapshot } = args;
      overrideEntry(remoteSnapshot, ssrEntry);
      if (
        remoteSnapshot &&
        typeof remoteSnapshot === 'object' &&
        remoteSnapshot.remotesInfo
      ) {
        Object.values(remoteSnapshot.remotesInfo).forEach((info) =>
          overrideEntry(info, ssrEntry),
        );
      }
      return args;
    },
  };
};
