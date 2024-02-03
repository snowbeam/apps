import * as qs from 'node:querystring';
import type { ClientOAuth2, ClientOAuth2Options } from 'src/ClientOAuth2';

import {
  ClientOAuth2Token,
  ClientOAuth2TokenData
} from 'src/ClientOAuth2Token';
import { DEFAULT_HEADERS, DEFAULT_URL_BASE } from 'src/constants';
import {
  auth,
  expects,
  getAuthError,
  getRequestOptions
} from 'src/utils/helpers';

export interface CodeFlowBody {
  code: string | string[];
  grant_type: 'authorization_code';
  redirect_uri?: string;
  client_id?: string;
}

/* The `CodeFlow` class is a TypeScript class that handles the authorization code flow for OAuth2
authentication. */
export class CodeFlow {
  /**
   * The constructor function takes a ClientOAuth2 object as a parameter and assigns it to the private
   * client property.
   * .param {ClientOAuth2} client - The `client` parameter is of type `ClientOAuth2`. It is a private
   * property that is passed to the constructor of the class.
   */
  constructor(private client: ClientOAuth2) {}

  /**
   * Generate the uri for doing the first redirect.
   */
  getUri(opts?: Partial<ClientOAuth2Options>): string {
    const options: ClientOAuth2Options = { ...this.client.options, ...opts };

    // Check the required parameters are set.
    expects(options, 'clientId', 'authorizationUri');

    const url = new URL(options.authorizationUri as string);

    const queryParams = {
      ...options.query,
      client_id: options.clientId,
      redirect_uri: options.redirectUri,
      response_type: 'code',
      state: options.state,
      ...(options.scopes
        ? { scope: options.scopes.join(options.scopesSeparator ?? ' ') }
        : {})
    };

    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    }

    return url.toString();
  }

  /**
   * Get the code token from the redirected uri and make another request for
   * the user access token.
   */
  async getToken(
    urlString: string,
    opts?: Partial<ClientOAuth2Options>
  ): Promise<ClientOAuth2Token> {
    const options: ClientOAuth2Options = { ...this.client.options, ...opts };
    expects(options, 'clientId', 'accessTokenUri');

    const url = new URL(urlString, DEFAULT_URL_BASE);
    if (
      typeof options.redirectUri === 'string' &&
      typeof url.pathname === 'string' &&
      url.pathname !== new URL(options.redirectUri, DEFAULT_URL_BASE).pathname
    ) {
      throw new TypeError(
        'Redirected path should match configured path, but got: ' + url.pathname
      );
    }

    if (!url.search?.substring(1)) {
      throw new TypeError(`Unable to process uri: ${urlString}`);
    }

    const data =
      typeof url.search === 'string'
        ? qs.parse(url.search.substring(1))
        : url.search || {};

    // eslint-disable-next-line .typescript-eslint/ban-ts-comment
    // .ts-ignore
    const error = getAuthError(
      data as {
        error: string;
        error_description?: string;
      }
    );
    if (error) throw error;

    if (options.state && data.state !== options.state) {
      // eslint-disable-next-line .typescript-eslint/restrict-template-expressions
      throw new TypeError(`Invalid state: ${data.state}`);
    }

    // Check whether the response code is set.
    if (!data.code) {
      throw new TypeError('Missing code, unable to request token');
    }

    const headers = { ...DEFAULT_HEADERS };
    const body: CodeFlowBody = {
      code: data.code,
      grant_type: 'authorization_code',
      redirect_uri: options.redirectUri
    };

    // `client_id`: REQUIRED, if the client is not authenticating with the
    // authorization server as described in Section 3.2.1.
    // Reference: https://tools.ietf.org/html/rfc6749#section-3.2.1
    if (options.clientSecret) {
      headers.Authorization = auth(options.clientId, options.clientSecret);
    } else {
      body.client_id = options.clientId;
    }

    const requestOptions = getRequestOptions(
      {
        url: options.accessTokenUri,
        method: 'POST',
        headers,
        body
      },
      options
    );

    const responseData =
      await this.client.request<ClientOAuth2TokenData>(requestOptions);
    return this.client.createToken(responseData);
  }
}
