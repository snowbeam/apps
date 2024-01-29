import type { AxiosRequestConfig } from "axios";
import type { ClientOAuth2TokenData } from "src/ClientOAuth2Token";

import { CodeFlow } from "src/controllers/CodeFlow";
import { getAuthError } from "src/utils/helpers";
import { CredentialsFlow } from "src/controllers/CredentialsFlow";

import { ClientOAuth2Token } from "src/ClientOAuth2Token";

import axios from "axios";
import { Agent } from "node:https";
import * as qs from "node:querystring";

export interface ClientOAuth2RequestObj {
  url: string;
  method: "HEAD" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, any>;
  query?: qs.ParsedUrlQuery;
  headers?: Record<string, string | string[]>;
  ignoreSSLIssues?: boolean;
}

export interface ClientOAuth2Options {
  clientId: string;
  clientSecret?: string;
  accessTokenUri: string;
  authorizationUri?: string;
  redirectUri?: string;
  scopes?: string[];
  scopesSeparator?: "," | " ";
  authorizationGrants?: string[];
  state?: string;
  body?: Record<string, any>;
  query?: qs.ParsedUrlQuery;
  ignoreSSLIssues?: boolean;
}

/* The class ResponseError extends the Error class and represents an error response from an HTTP
request. */
class ResponseError extends Error {
  constructor(
    readonly status: number,
    readonly body: object,
    readonly code = "ESTATUS"
  ) {
    super(`HTTP status ${status}`);
  }
}

/* The line `const sslIgnoringAgent = new Agent({ rejectUnauthorized: false });` is creating a new
instance of the `Agent` class from the `node:https` module. This agent is used to make HTTPS
requests and it is configured to ignore SSL certificate verification. By setting
`rejectUnauthorized` to `false`, the agent will allow requests to proceed even if the server's SSL
certificate is invalid or self-signed. This can be useful in development or testing environments
where SSL certificates may not be properly configured. */
const sslIgnoringAgent = new Agent({ rejectUnauthorized: false });

/* The `ClientOAuth2` class is a TypeScript implementation of an OAuth2 client that handles
authentication and authorization with an OAuth2 server. */
export class ClientOAuth2 {
  code: CodeFlow;

  credentials: CredentialsFlow;

  /**
   * The constructor function initializes the options and creates instances of the CodeFlow and
   * CredentialsFlow classes.
   * .param {ClientOAuth2Options} options - The `options` parameter is an object that contains the
   * configuration options for the OAuth2 client. It typically includes properties such as `clientId`,
   * `clientSecret`, `redirectUri`, `authorizationUri`, `tokenUri`, and `scopes`. These options are
   * used to authenticate and authorize the client application with
   */
  constructor(readonly options: ClientOAuth2Options) {
    this.code = new CodeFlow(this);
    this.credentials = new CredentialsFlow(this);
  }

  /**
   * Create a new token from existing data.
   */
  createToken(data: ClientOAuth2TokenData, type?: string): ClientOAuth2Token {
    return new ClientOAuth2Token(this, {
      ...data,
      ...(typeof type === "string" ? { token_type: type } : type)
    });
  }

  /**
   * Attempt to parse response body as JSON, fall back to parsing as a query string.
   */
  private parseResponseBody<T extends object>(body: string): T {
    try {
      return JSON.parse(body);
    } catch (e) {
      return qs.parse(body) as T;
    }
  }

  /**
   * Using the built-in request method, we'll automatically attempt to parse
   * the response.
   */
  async request<T extends object>(options: ClientOAuth2RequestObj): Promise<T> {
    let url = options.url;
    const query = qs.stringify(options.query);

    if (query) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + query;
    }

    const requestConfig: AxiosRequestConfig = {
      url,
      method: options.method,
      data: qs.stringify(options.body),
      headers: options.headers,
      transformResponse: res => res,
      // Axios rejects the promise by default for all status codes 4xx.
      // We override this to reject promises only on 5xxs
      validateStatus: status => status < 500
    };

    if (options.ignoreSSLIssues) {
      requestConfig.httpsAgent = sslIgnoringAgent;
    }

    const response = await axios.request(requestConfig);

    const body = this.parseResponseBody<T>(response.data);

    // eslint-disable-next-line .typescript-eslint/ban-ts-comment
    // .ts-ignore
    const authErr = getAuthError(
      body as {
        error: string;
        error_description?: string;
      }
    );
    if (authErr) throw authErr;

    if (response.status < 200 || response.status >= 399)
      throw new ResponseError(response.status, response.data);

    return body;
  }
}
