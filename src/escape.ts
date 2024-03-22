if (!("trustedTypes" in globalThis)) {
  const trustedTypes: TrustedTypePolicyFactory = {
    createPolicy(name, cfg) {
      return cfg;
    },
  };
  (globalThis as any).trustedTypes = trustedTypes;
}

export const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
  createHTML: (to_escape) => to_escape,
});
