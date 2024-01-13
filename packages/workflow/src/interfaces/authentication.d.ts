export type AuthenticationMethod = "email" | "ldap" | "saml";

// All properties in this interface except for
// "includeCredentialsOnRefreshOnBody" will get
// removed once we add the OAuth2 hooks to the
// credentials file.
export interface OAuth2Options {
  includeCredentialsOnRefreshOnBody?: boolean;
  property?: string;
  tokenType?: string;
  keepBearer?: boolean;
  tokenExpiredStatusCode?: number;
  keyToIncludeInAccessTokenHeader?: string;
}
