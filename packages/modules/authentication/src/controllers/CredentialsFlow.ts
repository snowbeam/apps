import type { ClientOAuth2, ClientOAuth2Options } from 'src/ClientOAuth2';
import type { ClientOAuth2Token } from 'src/ClientOAuth2Token';

import { ClientOAuth2TokenData } from 'src/ClientOAuth2Token';
import { DEFAULT_HEADERS } from 'src/constants';
import { auth, expects, getRequestOptions } from 'src/utils/helpers';

export interface CredentialsFlowBody {
  grant_type: 'client_credentials';
  scope?: string;
}

/* The `CredentialsFlow` class is responsible for requesting an access token using the client
credentials flow in OAuth2. */
export class CredentialsFlow {
  /**
   * The constructor function takes a ClientOAuth2 object as a parameter and assigns it to the private
   * client property.
   * .param {ClientOAuth2} client - The `client` parameter is of type `ClientOAuth2`. It is a private
   * property that is passed to the constructor of the class.
   */
  constructor(private client: ClientOAuth2) {}
  /**
   * Request an access token using the client credentials.
   */
  async getToken(
    opts?: Partial<ClientOAuth2Options>
  ): Promise<ClientOAuth2Token> {
    const options = { ...this.client.options, ...opts };
    expects(options, 'clientId', 'clientSecret', 'accessTokenUri');

    const body: CredentialsFlowBody = {
      grant_type: 'client_credentials'
    };

    if (options.scopes !== undefined) {
      body.scope = options.scopes.join(options.scopesSeparator ?? ' ');
    }

    const requestOptions = getRequestOptions(
      {
        url: options.accessTokenUri,
        method: 'POST',
        headers: {
          ...DEFAULT_HEADERS,
          // eslint-disable-next-line .typescript-eslint/naming-convention
          Authorization: auth(options.clientId, options.clientSecret as string)
        },
        body
      },
      options
    );

    const responseData =
      await this.client.request<ClientOAuth2TokenData>(requestOptions);
    return this.client.createToken(responseData);
  }
}
