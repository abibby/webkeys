interface TrustedTypePolicyConfig {
  createHTML(html: string): string;
}
interface TrustedTypePolicy {
  createHTML(html: string): string;
}
interface TrustedTypePolicyFactory {
  createPolicy(
    name: string,
    config: TrustedTypePolicyConfig
  ): TrustedTypePolicy;
}
declare const trustedTypes: TrustedTypePolicyFactory;
