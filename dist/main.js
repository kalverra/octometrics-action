import { r as requireLib, a as requireUndici, g as getUserAgent, o as once, D as Deprecation, b as beforeAfterHookExports, c as getAugmentedNamespace, d as requireCore, e as requireIo, f as requireExec, h as commonjsGlobal, i as coreExports } from './once-DunWvxhB.js';
import * as require$$0$1 from 'fs';
import require$$0__default from 'fs';
import * as require$$0 from 'os';
import require$$0__default$1 from 'os';
import require$$0$2 from 'crypto';
import require$$2$1, { spawn } from 'child_process';
import * as require$$1 from 'path';
import require$$1__default from 'path';
import require$$0$3 from 'stream';
import require$$0__default$2 from 'util';
import require$$0$4 from 'assert';
import 'http';
import 'https';
import 'net';
import 'tls';
import 'events';
import 'buffer';
import 'querystring';
import 'stream/web';
import 'node:stream';
import 'node:util';
import 'node:events';
import 'worker_threads';
import 'perf_hooks';
import 'util/types';
import 'async_hooks';
import 'console';
import 'url';
import 'zlib';
import 'string_decoder';
import 'diagnostics_channel';
import 'timers';

var github = {};

var context = {};

var hasRequiredContext;

function requireContext () {
	if (hasRequiredContext) return context;
	hasRequiredContext = 1;
	Object.defineProperty(context, "__esModule", { value: true });
	context.Context = void 0;
	const fs_1 = require$$0__default;
	const os_1 = require$$0__default$1;
	class Context {
	    /**
	     * Hydrate the context from the environment
	     */
	    constructor() {
	        var _a, _b, _c;
	        this.payload = {};
	        if (process.env.GITHUB_EVENT_PATH) {
	            if ((0, fs_1.existsSync)(process.env.GITHUB_EVENT_PATH)) {
	                this.payload = JSON.parse((0, fs_1.readFileSync)(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
	            }
	            else {
	                const path = process.env.GITHUB_EVENT_PATH;
	                process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
	            }
	        }
	        this.eventName = process.env.GITHUB_EVENT_NAME;
	        this.sha = process.env.GITHUB_SHA;
	        this.ref = process.env.GITHUB_REF;
	        this.workflow = process.env.GITHUB_WORKFLOW;
	        this.action = process.env.GITHUB_ACTION;
	        this.actor = process.env.GITHUB_ACTOR;
	        this.job = process.env.GITHUB_JOB;
	        this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
	        this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
	        this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
	        this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
	        this.graphqlUrl =
	            (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
	    }
	    get issue() {
	        const payload = this.payload;
	        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
	    }
	    get repo() {
	        if (process.env.GITHUB_REPOSITORY) {
	            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
	            return { owner, repo };
	        }
	        if (this.payload.repository) {
	            return {
	                owner: this.payload.repository.owner.login,
	                repo: this.payload.repository.name
	            };
	        }
	        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
	    }
	}
	context.Context = Context;
	
	return context;
}

var utils$1 = {};

var utils = {};

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils;
	hasRequiredUtils$1 = 1;
	var __createBinding = (utils && utils.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (utils && utils.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (utils && utils.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (utils && utils.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(utils, "__esModule", { value: true });
	utils.getApiBaseUrl = utils.getProxyFetch = utils.getProxyAgentDispatcher = utils.getProxyAgent = utils.getAuthString = void 0;
	const httpClient = __importStar(requireLib());
	const undici_1 = requireUndici();
	function getAuthString(token, options) {
	    if (!token && !options.auth) {
	        throw new Error('Parameter token or opts.auth is required');
	    }
	    else if (token && options.auth) {
	        throw new Error('Parameters token and opts.auth may not both be specified');
	    }
	    return typeof options.auth === 'string' ? options.auth : `token ${token}`;
	}
	utils.getAuthString = getAuthString;
	function getProxyAgent(destinationUrl) {
	    const hc = new httpClient.HttpClient();
	    return hc.getAgent(destinationUrl);
	}
	utils.getProxyAgent = getProxyAgent;
	function getProxyAgentDispatcher(destinationUrl) {
	    const hc = new httpClient.HttpClient();
	    return hc.getAgentDispatcher(destinationUrl);
	}
	utils.getProxyAgentDispatcher = getProxyAgentDispatcher;
	function getProxyFetch(destinationUrl) {
	    const httpDispatcher = getProxyAgentDispatcher(destinationUrl);
	    const proxyFetch = (url, opts) => __awaiter(this, void 0, void 0, function* () {
	        return (0, undici_1.fetch)(url, Object.assign(Object.assign({}, opts), { dispatcher: httpDispatcher }));
	    });
	    return proxyFetch;
	}
	utils.getProxyFetch = getProxyFetch;
	function getApiBaseUrl() {
	    return process.env['GITHUB_API_URL'] || 'https://api.github.com';
	}
	utils.getApiBaseUrl = getApiBaseUrl;
	
	return utils;
}

const VERSION$5 = "9.0.6";

const userAgent = `octokit-endpoint.js/${VERSION$5} ${getUserAgent()}`;
const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: ""
  }
};

function lowercaseKeys(object) {
  if (!object) {
    return {};
  }
  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}

function isPlainObject$1(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (Object.prototype.toString.call(value) !== "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}

function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach((key) => {
    if (isPlainObject$1(options[key])) {
      if (!(key in defaults))
        Object.assign(result, { [key]: options[key] });
      else
        result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, { [key]: options[key] });
    }
  });
  return result;
}

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === void 0) {
      delete obj[key];
    }
  }
  return obj;
}

function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? { method, url } : { url: method }, options);
  } else {
    options = Object.assign({}, route);
  }
  options.headers = lowercaseKeys(options.headers);
  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options);
  if (options.url === "/graphql") {
    if (defaults && defaults.mediaType.previews?.length) {
      mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(
        (preview) => !mergedOptions.mediaType.previews.includes(preview)
      ).concat(mergedOptions.mediaType.previews);
    }
    mergedOptions.mediaType.previews = (mergedOptions.mediaType.previews || []).map((preview) => preview.replace(/-preview/, ""));
  }
  return mergedOptions;
}

function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);
  if (names.length === 0) {
    return url;
  }
  return url + separator + names.map((name) => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }
    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

const urlVariableRegex = /\{[^{}}]+\}/g;
function removeNonChars(variableName) {
  return variableName.replace(/(?:^\W+)|(?:(?<!\W)\W+$)/g, "").split(/,/);
}
function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);
  if (!matches) {
    return [];
  }
  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

function omit(object, keysToOmit) {
  const result = { __proto__: null };
  for (const key of Object.keys(object)) {
    if (keysToOmit.indexOf(key) === -1) {
      result[key] = object[key];
    }
  }
  return result;
}

function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }
    return part;
  }).join("");
}
function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}
function getValues(context, operator, key, modifier) {
  var value = context[key], result = [];
  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();
      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }
      result.push(
        encodeValue(operator, value, isKeyOperator(operator) ? key : "")
      );
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            result.push(
              encodeValue(operator, value2, isKeyOperator(operator) ? key : "")
            );
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            tmp.push(encodeValue(operator, value2));
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }
        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }
  return result;
}
function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}
function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  template = template.replace(
    /\{([^\{\}]+)\}|([^\{\}]+)/g,
    function(_, expression, literal) {
      if (expression) {
        let operator = "";
        const values = [];
        if (operators.indexOf(expression.charAt(0)) !== -1) {
          operator = expression.charAt(0);
          expression = expression.substr(1);
        }
        expression.split(/,/g).forEach(function(variable) {
          var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
          values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
        });
        if (operator && operator !== "+") {
          var separator = ",";
          if (operator === "?") {
            separator = "&";
          } else if (operator !== "#") {
            separator = operator;
          }
          return (values.length !== 0 ? operator : "") + values.join(separator);
        } else {
          return values.join(",");
        }
      } else {
        return encodeReserved(literal);
      }
    }
  );
  if (template === "/") {
    return template;
  } else {
    return template.replace(/\/$/, "");
  }
}

function parse(options) {
  let method = options.method.toUpperCase();
  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, [
    "method",
    "baseUrl",
    "url",
    "headers",
    "request",
    "mediaType"
  ]);
  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);
  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }
  const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      headers.accept = headers.accept.split(/,/).map(
        (format) => format.replace(
          /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
          `application/vnd$1$2.${options.mediaType.format}`
        )
      ).join(",");
    }
    if (url.endsWith("/graphql")) {
      if (options.mediaType.previews?.length) {
        const previewsFromAcceptHeader = headers.accept.match(/(?<![\w-])[\w-]+(?=-preview)/g) || [];
        headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
          const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
          return `application/vnd.github.${preview}-preview${format}`;
        }).join(",");
      }
    }
  }
  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      }
    }
  }
  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  }
  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  }
  return Object.assign(
    { method, url, headers },
    typeof body !== "undefined" ? { body } : null,
    options.request ? { request: options.request } : null
  );
}

function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}

function withDefaults$2(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults$2.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse
  });
}

const endpoint = withDefaults$2(null, DEFAULTS);

const VERSION$4 = "8.4.1";

function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (Object.prototype.toString.call(value) !== "[object Object]")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null)
    return true;
  const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && Function.prototype.call(Ctor) === Function.prototype.call(value);
}

const logOnceCode = once((deprecation) => console.warn(deprecation));
const logOnceHeaders = once((deprecation) => console.warn(deprecation));
class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "HttpError";
    this.status = statusCode;
    let headers;
    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }
    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    }
    const requestCopy = Object.assign({}, options.request);
    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(
          /(?<! ) .*$/,
          " [REDACTED]"
        )
      });
    }
    requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy;
    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(
          new Deprecation(
            "[@octokit/request-error] `error.code` is deprecated, use `error.status`."
          )
        );
        return statusCode;
      }
    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(
          new Deprecation(
            "[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."
          )
        );
        return headers || {};
      }
    });
  }
}

function getBufferResponse(response) {
  return response.arrayBuffer();
}

function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;
  const parseSuccessResponseBody = requestOptions.request?.parseSuccessResponseBody !== false;
  if (isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  let headers = {};
  let status;
  let url;
  let { fetch } = globalThis;
  if (requestOptions.request?.fetch) {
    fetch = requestOptions.request.fetch;
  }
  if (!fetch) {
    throw new Error(
      "fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing"
    );
  }
  return fetch(requestOptions.url, {
    method: requestOptions.method,
    body: requestOptions.body,
    redirect: requestOptions.request?.redirect,
    headers: requestOptions.headers,
    signal: requestOptions.request?.signal,
    // duplex must be set if request.body is ReadableStream or Async Iterables.
    // See https://fetch.spec.whatwg.org/#dom-requestinit-duplex.
    ...requestOptions.body && { duplex: "half" }
  }).then(async (response) => {
    url = response.url;
    status = response.status;
    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }
    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^<>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(
        `[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`
      );
    }
    if (status === 204 || status === 205) {
      return;
    }
    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }
      throw new RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: void 0
        },
        request: requestOptions
      });
    }
    if (status === 304) {
      throw new RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }
    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }
    return parseSuccessResponseBody ? await getResponseData(response) : response.body;
  }).then((data) => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch((error) => {
    if (error instanceof RequestError)
      throw error;
    else if (error.name === "AbortError")
      throw error;
    let message = error.message;
    if (error.name === "TypeError" && "cause" in error) {
      if (error.cause instanceof Error) {
        message = error.cause.message;
      } else if (typeof error.cause === "string") {
        message = error.cause;
      }
    }
    throw new RequestError(message, 500, {
      request: requestOptions
    });
  });
}
async function getResponseData(response) {
  const contentType = response.headers.get("content-type");
  if (/application\/json/.test(contentType)) {
    return response.json().catch(() => response.text()).catch(() => "");
  }
  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }
  return getBufferResponse(response);
}
function toErrorMessage(data) {
  if (typeof data === "string")
    return data;
  let suffix;
  if ("documentation_url" in data) {
    suffix = ` - ${data.documentation_url}`;
  } else {
    suffix = "";
  }
  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}${suffix}`;
    }
    return `${data.message}${suffix}`;
  }
  return `Unknown error: ${JSON.stringify(data)}`;
}

function withDefaults$1(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);
  const newApi = function(route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);
    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }
    const request = (route2, parameters2) => {
      return fetchWrapper(
        endpoint.parse(endpoint.merge(route2, parameters2))
      );
    };
    Object.assign(request, {
      endpoint,
      defaults: withDefaults$1.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };
  return Object.assign(newApi, {
    endpoint,
    defaults: withDefaults$1.bind(null, endpoint)
  });
}

const request = withDefaults$1(endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION$4} ${getUserAgent()}`
  }
});

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$3 = "7.0.2";

// pkg/dist-src/error.js
function _buildMessageForResponseErrors(data) {
  return `Request failed due to following response errors:
` + data.errors.map((e) => ` - ${e.message}`).join("\n");
}
var GraphqlResponseError = class extends Error {
  constructor(request2, headers, response) {
    super(_buildMessageForResponseErrors(response));
    this.request = request2;
    this.headers = headers;
    this.response = response;
    this.name = "GraphqlResponseError";
    this.errors = response.errors;
    this.data = response.data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// pkg/dist-src/graphql.js
var NON_VARIABLE_OPTIONS = [
  "method",
  "baseUrl",
  "url",
  "headers",
  "request",
  "query",
  "mediaType"
];
var FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
var GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request2, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(
        new Error(`[@octokit/graphql] "query" cannot be used as variable name`)
      );
    }
    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key))
        continue;
      return Promise.reject(
        new Error(
          `[@octokit/graphql] "${key}" cannot be used as variable name`
        )
      );
    }
  }
  const parsedOptions = typeof query === "string" ? Object.assign({ query }, options) : query;
  const requestOptions = Object.keys(
    parsedOptions
  ).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }
    if (!result.variables) {
      result.variables = {};
    }
    result.variables[key] = parsedOptions[key];
    return result;
  }, {});
  const baseUrl = parsedOptions.baseUrl || request2.endpoint.DEFAULTS.baseUrl;
  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }
  return request2(requestOptions).then((response) => {
    if (response.data.errors) {
      const headers = {};
      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }
      throw new GraphqlResponseError(
        requestOptions,
        headers,
        response.data
      );
    }
    return response.data.data;
  });
}

// pkg/dist-src/with-defaults.js
function withDefaults(request2, newDefaults) {
  const newRequest = request2.defaults(newDefaults);
  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };
  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: newRequest.endpoint
  });
}

// pkg/dist-src/index.js
withDefaults(request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION$3} ${getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

const REGEX_IS_INSTALLATION_LEGACY = /^v1\./;
const REGEX_IS_INSTALLATION = /^ghs_/;
const REGEX_IS_USER_TO_SERVER = /^ghu_/;
async function auth(token) {
  const isApp = token.split(/\./).length === 3;
  const isInstallation = REGEX_IS_INSTALLATION_LEGACY.test(token) || REGEX_IS_INSTALLATION.test(token);
  const isUserToServer = REGEX_IS_USER_TO_SERVER.test(token);
  const tokenType = isApp ? "app" : isInstallation ? "installation" : isUserToServer ? "user-to-server" : "oauth";
  return {
    type: "token",
    token,
    tokenType
  };
}

function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }
  return `token ${token}`;
}

async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(
    route,
    parameters
  );
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

const createTokenAuth = function createTokenAuth2(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }
  if (typeof token !== "string") {
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  }
  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$2 = "5.0.1";

// pkg/dist-src/index.js
var Octokit = class {
  static {
    this.VERSION = VERSION$2;
  }
  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};
        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }
        super(
          Object.assign(
            {},
            defaults,
            options,
            options.userAgent && defaults.userAgent ? {
              userAgent: `${options.userAgent} ${defaults.userAgent}`
            } : null
          )
        );
      }
    };
    return OctokitWithDefaults;
  }
  static {
    this.plugins = [];
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */
  static plugin(...newPlugins) {
    const currentPlugins = this.plugins;
    const NewOctokit = class extends this {
      static {
        this.plugins = currentPlugins.concat(
          newPlugins.filter((plugin) => !currentPlugins.includes(plugin))
        );
      }
    };
    return NewOctokit;
  }
  constructor(options = {}) {
    const hook = new beforeAfterHookExports.Collection();
    const requestDefaults = {
      baseUrl: request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    };
    requestDefaults.headers["user-agent"] = [
      options.userAgent,
      `octokit-core.js/${VERSION$2} ${getUserAgent()}`
    ].filter(Boolean).join(" ");
    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }
    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }
    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }
    this.request = request.defaults(requestDefaults);
    this.graphql = withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign(
      {
        debug: () => {
        },
        info: () => {
        },
        warn: console.warn.bind(console),
        error: console.error.bind(console)
      },
      options.log
    );
    this.hook = hook;
    if (!options.authStrategy) {
      if (!options.auth) {
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        const auth = createTokenAuth(options.auth);
        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const { authStrategy, ...otherOptions } = options;
      const auth = authStrategy(
        Object.assign(
          {
            request: this.request,
            log: this.log,
            // we pass the current octokit instance as well as its constructor options
            // to allow for authentication strategies that return a new octokit instance
            // that shares the same internal state as the current one. The original
            // requirement for this was the "event-octokit" authentication strategy
            // of https://github.com/probot/octokit-auth-probot.
            octokit: this,
            octokitOptions: otherOptions
          },
          options.auth
        )
      );
      hook.wrap("request", auth.hook);
      this.auth = auth;
    }
    const classConstructor = this.constructor;
    classConstructor.plugins.forEach((plugin) => {
      Object.assign(this, plugin(this, options));
    });
  }
};

var distWeb$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Octokit: Octokit
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(distWeb$1);

const VERSION$1 = "10.1.5";

const Endpoints = {
  actions: {
    addCustomLabelsToSelfHostedRunnerForOrg: [
      "POST /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    addCustomLabelsToSelfHostedRunnerForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"
    ],
    addSelectedRepoToOrgVariable: [
      "PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"
    ],
    approveWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"
    ],
    cancelWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"
    ],
    createEnvironmentVariable: [
      "POST /repositories/{repository_id}/environments/{environment_name}/variables"
    ],
    createOrUpdateEnvironmentSecret: [
      "PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"
    ],
    createOrgVariable: ["POST /orgs/{org}/actions/variables"],
    createRegistrationTokenForOrg: [
      "POST /orgs/{org}/actions/runners/registration-token"
    ],
    createRegistrationTokenForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/registration-token"
    ],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/remove-token"
    ],
    createRepoVariable: ["POST /repos/{owner}/{repo}/actions/variables"],
    createWorkflowDispatch: [
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"
    ],
    deleteActionsCacheById: [
      "DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}"
    ],
    deleteActionsCacheByKey: [
      "DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}"
    ],
    deleteArtifact: [
      "DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"
    ],
    deleteEnvironmentSecret: [
      "DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    deleteEnvironmentVariable: [
      "DELETE /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"
    ],
    deleteRepoVariable: [
      "DELETE /repos/{owner}/{repo}/actions/variables/{name}"
    ],
    deleteSelfHostedRunnerFromOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}"
    ],
    deleteSelfHostedRunnerFromRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"
    ],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: [
      "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"
    ],
    disableSelectedRepositoryGithubActionsOrganization: [
      "DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"
    ],
    disableWorkflow: [
      "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"
    ],
    downloadArtifact: [
      "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"
    ],
    downloadJobLogsForWorkflowRun: [
      "GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"
    ],
    downloadWorkflowRunAttemptLogs: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs"
    ],
    downloadWorkflowRunLogs: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"
    ],
    enableSelectedRepositoryGithubActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"
    ],
    enableWorkflow: [
      "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"
    ],
    forceCancelWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel"
    ],
    generateRunnerJitconfigForOrg: [
      "POST /orgs/{org}/actions/runners/generate-jitconfig"
    ],
    generateRunnerJitconfigForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig"
    ],
    getActionsCacheList: ["GET /repos/{owner}/{repo}/actions/caches"],
    getActionsCacheUsage: ["GET /repos/{owner}/{repo}/actions/cache/usage"],
    getActionsCacheUsageByRepoForOrg: [
      "GET /orgs/{org}/actions/cache/usage-by-repository"
    ],
    getActionsCacheUsageForOrg: ["GET /orgs/{org}/actions/cache/usage"],
    getAllowedActionsOrganization: [
      "GET /orgs/{org}/actions/permissions/selected-actions"
    ],
    getAllowedActionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/selected-actions"
    ],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"
    ],
    getEnvironmentSecret: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    getEnvironmentVariable: [
      "GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    getGithubActionsDefaultWorkflowPermissionsOrganization: [
      "GET /orgs/{org}/actions/permissions/workflow"
    ],
    getGithubActionsDefaultWorkflowPermissionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/workflow"
    ],
    getGithubActionsPermissionsOrganization: [
      "GET /orgs/{org}/actions/permissions"
    ],
    getGithubActionsPermissionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions"
    ],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getOrgVariable: ["GET /orgs/{org}/actions/variables/{name}"],
    getPendingDeploymentsForRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"
    ],
    getRepoPermissions: [
      "GET /repos/{owner}/{repo}/actions/permissions",
      {},
      { renamed: ["actions", "getGithubActionsPermissionsRepository"] }
    ],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getRepoVariable: ["GET /repos/{owner}/{repo}/actions/variables/{name}"],
    getReviewsForRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"
    ],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/{runner_id}"
    ],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowAccessToRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/access"
    ],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunAttempt: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}"
    ],
    getWorkflowRunUsage: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"
    ],
    getWorkflowUsage: [
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"
    ],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets"
    ],
    listEnvironmentVariables: [
      "GET /repositories/{repository_id}/environments/{environment_name}/variables"
    ],
    listJobsForWorkflowRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"
    ],
    listJobsForWorkflowRunAttempt: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs"
    ],
    listLabelsForSelfHostedRunnerForOrg: [
      "GET /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    listLabelsForSelfHostedRunnerForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listOrgVariables: ["GET /orgs/{org}/actions/variables"],
    listRepoOrganizationSecrets: [
      "GET /repos/{owner}/{repo}/actions/organization-secrets"
    ],
    listRepoOrganizationVariables: [
      "GET /repos/{owner}/{repo}/actions/organization-variables"
    ],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoVariables: ["GET /repos/{owner}/{repo}/actions/variables"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/downloads"
    ],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/actions/secrets/{secret_name}/repositories"
    ],
    listSelectedReposForOrgVariable: [
      "GET /orgs/{org}/actions/variables/{name}/repositories"
    ],
    listSelectedRepositoriesEnabledGithubActionsOrganization: [
      "GET /orgs/{org}/actions/permissions/repositories"
    ],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"
    ],
    listWorkflowRuns: [
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"
    ],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunJobForWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun"
    ],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    reRunWorkflowFailedJobs: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs"
    ],
    removeAllCustomLabelsFromSelfHostedRunnerForOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    removeAllCustomLabelsFromSelfHostedRunnerForRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    removeCustomLabelFromSelfHostedRunnerForOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}"
    ],
    removeCustomLabelFromSelfHostedRunnerForRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromOrgVariable: [
      "DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"
    ],
    reviewCustomGatesForRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule"
    ],
    reviewPendingDeploymentsForRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"
    ],
    setAllowedActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/selected-actions"
    ],
    setAllowedActionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"
    ],
    setCustomLabelsForSelfHostedRunnerForOrg: [
      "PUT /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    setCustomLabelsForSelfHostedRunnerForRepo: [
      "PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    setGithubActionsDefaultWorkflowPermissionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/workflow"
    ],
    setGithubActionsDefaultWorkflowPermissionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/workflow"
    ],
    setGithubActionsPermissionsOrganization: [
      "PUT /orgs/{org}/actions/permissions"
    ],
    setGithubActionsPermissionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"
    ],
    setSelectedReposForOrgVariable: [
      "PUT /orgs/{org}/actions/variables/{name}/repositories"
    ],
    setSelectedRepositoriesEnabledGithubActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/repositories"
    ],
    setWorkflowAccessToRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/access"
    ],
    updateEnvironmentVariable: [
      "PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    updateOrgVariable: ["PATCH /orgs/{org}/actions/variables/{name}"],
    updateRepoVariable: [
      "PATCH /repos/{owner}/{repo}/actions/variables/{name}"
    ]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: [
      "DELETE /notifications/threads/{thread_id}/subscription"
    ],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: [
      "GET /notifications/threads/{thread_id}/subscription"
    ],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: [
      "GET /users/{username}/events/orgs/{org}"
    ],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: [
      "GET /users/{username}/received_events/public"
    ],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/notifications"
    ],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: [
      "PUT /notifications/threads/{thread_id}/subscription"
    ],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: [
      "PUT /user/installations/{installation_id}/repositories/{repository_id}",
      {},
      { renamed: ["apps", "addRepoToInstallationForAuthenticatedUser"] }
    ],
    addRepoToInstallationForAuthenticatedUser: [
      "PUT /user/installations/{installation_id}/repositories/{repository_id}"
    ],
    checkToken: ["POST /applications/{client_id}/token"],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: [
      "POST /app/installations/{installation_id}/access_tokens"
    ],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: [
      "GET /marketplace_listing/accounts/{account_id}"
    ],
    getSubscriptionPlanForAccountStubbed: [
      "GET /marketplace_listing/stubbed/accounts/{account_id}"
    ],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: [
      "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"
    ],
    listInstallationReposForAuthenticatedUser: [
      "GET /user/installations/{installation_id}/repositories"
    ],
    listInstallationRequestsForAuthenticatedApp: [
      "GET /app/installation-requests"
    ],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: [
      "GET /user/marketplace_purchases/stubbed"
    ],
    listWebhookDeliveries: ["GET /app/hook/deliveries"],
    redeliverWebhookDelivery: [
      "POST /app/hook/deliveries/{delivery_id}/attempts"
    ],
    removeRepoFromInstallation: [
      "DELETE /user/installations/{installation_id}/repositories/{repository_id}",
      {},
      { renamed: ["apps", "removeRepoFromInstallationForAuthenticatedUser"] }
    ],
    removeRepoFromInstallationForAuthenticatedUser: [
      "DELETE /user/installations/{installation_id}/repositories/{repository_id}"
    ],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: [
      "DELETE /app/installations/{installation_id}/suspended"
    ],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: [
      "GET /users/{username}/settings/billing/actions"
    ],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: [
      "GET /users/{username}/settings/billing/packages"
    ],
    getSharedStorageBillingOrg: [
      "GET /orgs/{org}/settings/billing/shared-storage"
    ],
    getSharedStorageBillingUser: [
      "GET /users/{username}/settings/billing/shared-storage"
    ]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: [
      "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"
    ],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: [
      "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"
    ],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestRun: [
      "POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest"
    ],
    rerequestSuite: [
      "POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"
    ],
    setSuitesPreferences: [
      "PATCH /repos/{owner}/{repo}/check-suites/preferences"
    ],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: [
      "DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"
    ],
    getAlert: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
      {},
      { renamedParameters: { alert_id: "alert_number" } }
    ],
    getAnalysis: [
      "GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"
    ],
    getCodeqlDatabase: [
      "GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"
    ],
    getDefaultSetup: ["GET /repos/{owner}/{repo}/code-scanning/default-setup"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/code-scanning/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
      {},
      { renamed: ["codeScanning", "listAlertInstances"] }
    ],
    listCodeqlDatabases: [
      "GET /repos/{owner}/{repo}/code-scanning/codeql/databases"
    ],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"
    ],
    updateDefaultSetup: [
      "PATCH /repos/{owner}/{repo}/code-scanning/default-setup"
    ],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct"],
    getConductCode: ["GET /codes_of_conduct/{key}"]
  },
  codespaces: {
    addRepositoryForSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    checkPermissionsForDevcontainer: [
      "GET /repos/{owner}/{repo}/codespaces/permissions_check"
    ],
    codespaceMachinesForAuthenticatedUser: [
      "GET /user/codespaces/{codespace_name}/machines"
    ],
    createForAuthenticatedUser: ["POST /user/codespaces"],
    createOrUpdateOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}"
    ],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    createOrUpdateSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}"
    ],
    createWithPrForAuthenticatedUser: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces"
    ],
    createWithRepoForAuthenticatedUser: [
      "POST /repos/{owner}/{repo}/codespaces"
    ],
    deleteForAuthenticatedUser: ["DELETE /user/codespaces/{codespace_name}"],
    deleteFromOrganization: [
      "DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    deleteSecretForAuthenticatedUser: [
      "DELETE /user/codespaces/secrets/{secret_name}"
    ],
    exportForAuthenticatedUser: [
      "POST /user/codespaces/{codespace_name}/exports"
    ],
    getCodespacesForUserInOrg: [
      "GET /orgs/{org}/members/{username}/codespaces"
    ],
    getExportDetailsForAuthenticatedUser: [
      "GET /user/codespaces/{codespace_name}/exports/{export_id}"
    ],
    getForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}"],
    getOrgPublicKey: ["GET /orgs/{org}/codespaces/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}"],
    getPublicKeyForAuthenticatedUser: [
      "GET /user/codespaces/secrets/public-key"
    ],
    getRepoPublicKey: [
      "GET /repos/{owner}/{repo}/codespaces/secrets/public-key"
    ],
    getRepoSecret: [
      "GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    getSecretForAuthenticatedUser: [
      "GET /user/codespaces/secrets/{secret_name}"
    ],
    listDevcontainersInRepositoryForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/devcontainers"
    ],
    listForAuthenticatedUser: ["GET /user/codespaces"],
    listInOrganization: [
      "GET /orgs/{org}/codespaces",
      {},
      { renamedParameters: { org_id: "org" } }
    ],
    listInRepositoryForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces"
    ],
    listOrgSecrets: ["GET /orgs/{org}/codespaces/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/codespaces/secrets"],
    listRepositoriesForSecretForAuthenticatedUser: [
      "GET /user/codespaces/secrets/{secret_name}/repositories"
    ],
    listSecretsForAuthenticatedUser: ["GET /user/codespaces/secrets"],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories"
    ],
    preFlightWithRepoForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/new"
    ],
    publishForAuthenticatedUser: [
      "POST /user/codespaces/{codespace_name}/publish"
    ],
    removeRepositoryForSecretForAuthenticatedUser: [
      "DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    repoMachinesForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/machines"
    ],
    setRepositoriesForSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}/repositories"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories"
    ],
    startForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/start"],
    stopForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/stop"],
    stopInOrganization: [
      "POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop"
    ],
    updateForAuthenticatedUser: ["PATCH /user/codespaces/{codespace_name}"]
  },
  copilot: {
    addCopilotForBusinessSeatsForTeams: [
      "POST /orgs/{org}/copilot/billing/selected_teams"
    ],
    addCopilotForBusinessSeatsForUsers: [
      "POST /orgs/{org}/copilot/billing/selected_users"
    ],
    cancelCopilotSeatAssignmentForTeams: [
      "DELETE /orgs/{org}/copilot/billing/selected_teams"
    ],
    cancelCopilotSeatAssignmentForUsers: [
      "DELETE /orgs/{org}/copilot/billing/selected_users"
    ],
    getCopilotOrganizationDetails: ["GET /orgs/{org}/copilot/billing"],
    getCopilotSeatDetailsForUser: [
      "GET /orgs/{org}/members/{username}/copilot"
    ],
    listCopilotSeats: ["GET /orgs/{org}/copilot/billing/seats"]
  },
  dependabot: {
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"
    ],
    createOrUpdateOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}"
    ],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    getAlert: ["GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
    getOrgPublicKey: ["GET /orgs/{org}/dependabot/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}"],
    getRepoPublicKey: [
      "GET /repos/{owner}/{repo}/dependabot/secrets/public-key"
    ],
    getRepoSecret: [
      "GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    listAlertsForEnterprise: [
      "GET /enterprises/{enterprise}/dependabot/alerts"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/dependabot/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/dependabot/alerts"],
    listOrgSecrets: ["GET /orgs/{org}/dependabot/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/dependabot/secrets"],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories"
    ],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"
    ]
  },
  dependencyGraph: {
    createRepositorySnapshot: [
      "POST /repos/{owner}/{repo}/dependency-graph/snapshots"
    ],
    diffRange: [
      "GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}"
    ],
    exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"]
  },
  emojis: { get: ["GET /emojis"] },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: [
      "GET /user/interaction-limits",
      {},
      { renamed: ["interactions", "getRestrictionsForAuthenticatedUser"] }
    ],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: [
      "DELETE /repos/{owner}/{repo}/interaction-limits"
    ],
    removeRestrictionsForYourPublicRepos: [
      "DELETE /user/interaction-limits",
      {},
      { renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"] }
    ],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: [
      "PUT /user/interaction-limits",
      {},
      { renamed: ["interactions", "setRestrictionsForAuthenticatedUser"] }
    ]
  },
  issues: {
    addAssignees: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"
    ],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    checkUserCanBeAssignedToIssue: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}"
    ],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments"
    ],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: [
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"
    ],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: [
      "DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"
    ],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline"
    ],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: [
      "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"
    ],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/labels"
    ],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"
    ],
    removeAssignees: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"
    ],
    removeLabel: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"
    ],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: [
      "PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"
    ]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: [
      "POST /markdown/raw",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    ]
  },
  meta: {
    get: ["GET /meta"],
    getAllVersions: ["GET /versions"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: [
      "DELETE /repos/{owner}/{repo}/import",
      {},
      {
        deprecated: "octokit.rest.migrations.cancelImport() is deprecated, see https://docs.github.com/rest/migrations/source-imports#cancel-an-import"
      }
    ],
    deleteArchiveForAuthenticatedUser: [
      "DELETE /user/migrations/{migration_id}/archive"
    ],
    deleteArchiveForOrg: [
      "DELETE /orgs/{org}/migrations/{migration_id}/archive"
    ],
    downloadArchiveForOrg: [
      "GET /orgs/{org}/migrations/{migration_id}/archive"
    ],
    getArchiveForAuthenticatedUser: [
      "GET /user/migrations/{migration_id}/archive"
    ],
    getCommitAuthors: [
      "GET /repos/{owner}/{repo}/import/authors",
      {},
      {
        deprecated: "octokit.rest.migrations.getCommitAuthors() is deprecated, see https://docs.github.com/rest/migrations/source-imports#get-commit-authors"
      }
    ],
    getImportStatus: [
      "GET /repos/{owner}/{repo}/import",
      {},
      {
        deprecated: "octokit.rest.migrations.getImportStatus() is deprecated, see https://docs.github.com/rest/migrations/source-imports#get-an-import-status"
      }
    ],
    getLargeFiles: [
      "GET /repos/{owner}/{repo}/import/large_files",
      {},
      {
        deprecated: "octokit.rest.migrations.getLargeFiles() is deprecated, see https://docs.github.com/rest/migrations/source-imports#get-large-files"
      }
    ],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}"],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}"],
    listForAuthenticatedUser: ["GET /user/migrations"],
    listForOrg: ["GET /orgs/{org}/migrations"],
    listReposForAuthenticatedUser: [
      "GET /user/migrations/{migration_id}/repositories"
    ],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories"],
    listReposForUser: [
      "GET /user/migrations/{migration_id}/repositories",
      {},
      { renamed: ["migrations", "listReposForAuthenticatedUser"] }
    ],
    mapCommitAuthor: [
      "PATCH /repos/{owner}/{repo}/import/authors/{author_id}",
      {},
      {
        deprecated: "octokit.rest.migrations.mapCommitAuthor() is deprecated, see https://docs.github.com/rest/migrations/source-imports#map-a-commit-author"
      }
    ],
    setLfsPreference: [
      "PATCH /repos/{owner}/{repo}/import/lfs",
      {},
      {
        deprecated: "octokit.rest.migrations.setLfsPreference() is deprecated, see https://docs.github.com/rest/migrations/source-imports#update-git-lfs-preference"
      }
    ],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: [
      "PUT /repos/{owner}/{repo}/import",
      {},
      {
        deprecated: "octokit.rest.migrations.startImport() is deprecated, see https://docs.github.com/rest/migrations/source-imports#start-an-import"
      }
    ],
    unlockRepoForAuthenticatedUser: [
      "DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock"
    ],
    unlockRepoForOrg: [
      "DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock"
    ],
    updateImport: [
      "PATCH /repos/{owner}/{repo}/import",
      {},
      {
        deprecated: "octokit.rest.migrations.updateImport() is deprecated, see https://docs.github.com/rest/migrations/source-imports#update-an-import"
      }
    ]
  },
  orgs: {
    addSecurityManagerTeam: [
      "PUT /orgs/{org}/security-managers/teams/{team_slug}"
    ],
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: [
      "PUT /orgs/{org}/outside_collaborators/{username}"
    ],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createOrUpdateCustomProperties: ["PATCH /orgs/{org}/properties/schema"],
    createOrUpdateCustomPropertiesValuesForRepos: [
      "PATCH /orgs/{org}/properties/values"
    ],
    createOrUpdateCustomProperty: [
      "PUT /orgs/{org}/properties/schema/{custom_property_name}"
    ],
    createWebhook: ["POST /orgs/{org}/hooks"],
    delete: ["DELETE /orgs/{org}"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    enableOrDisableSecurityProductOnAllOrgRepos: [
      "POST /orgs/{org}/{security_product}/{enablement}"
    ],
    get: ["GET /orgs/{org}"],
    getAllCustomProperties: ["GET /orgs/{org}/properties/schema"],
    getCustomProperty: [
      "GET /orgs/{org}/properties/schema/{custom_property_name}"
    ],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    getWebhookDelivery: [
      "GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"
    ],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listCustomPropertiesValuesForRepos: ["GET /orgs/{org}/properties/values"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPatGrantRepositories: [
      "GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories"
    ],
    listPatGrantRequestRepositories: [
      "GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories"
    ],
    listPatGrantRequests: ["GET /orgs/{org}/personal-access-token-requests"],
    listPatGrants: ["GET /orgs/{org}/personal-access-tokens"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listSecurityManagerTeams: ["GET /orgs/{org}/security-managers"],
    listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: [
      "POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"
    ],
    removeCustomProperty: [
      "DELETE /orgs/{org}/properties/schema/{custom_property_name}"
    ],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: [
      "DELETE /orgs/{org}/outside_collaborators/{username}"
    ],
    removePublicMembershipForAuthenticatedUser: [
      "DELETE /orgs/{org}/public_members/{username}"
    ],
    removeSecurityManagerTeam: [
      "DELETE /orgs/{org}/security-managers/teams/{team_slug}"
    ],
    reviewPatGrantRequest: [
      "POST /orgs/{org}/personal-access-token-requests/{pat_request_id}"
    ],
    reviewPatGrantRequestsInBulk: [
      "POST /orgs/{org}/personal-access-token-requests"
    ],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: [
      "PUT /orgs/{org}/public_members/{username}"
    ],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: [
      "PATCH /user/memberships/orgs/{org}"
    ],
    updatePatAccess: ["POST /orgs/{org}/personal-access-tokens/{pat_id}"],
    updatePatAccesses: ["POST /orgs/{org}/personal-access-tokens"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: [
      "DELETE /user/packages/{package_type}/{package_name}"
    ],
    deletePackageForOrg: [
      "DELETE /orgs/{org}/packages/{package_type}/{package_name}"
    ],
    deletePackageForUser: [
      "DELETE /users/{username}/packages/{package_type}/{package_name}"
    ],
    deletePackageVersionForAuthenticatedUser: [
      "DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    deletePackageVersionForOrg: [
      "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    deletePackageVersionForUser: [
      "DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getAllPackageVersionsForAPackageOwnedByAnOrg: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
      {},
      { renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"] }
    ],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions",
      {},
      {
        renamed: [
          "packages",
          "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"
        ]
      }
    ],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions"
    ],
    getAllPackageVersionsForPackageOwnedByOrg: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions"
    ],
    getAllPackageVersionsForPackageOwnedByUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}/versions"
    ],
    getPackageForAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}"
    ],
    getPackageForOrganization: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}"
    ],
    getPackageForUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}"
    ],
    getPackageVersionForAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getPackageVersionForOrganization: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getPackageVersionForUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    listDockerMigrationConflictingPackagesForAuthenticatedUser: [
      "GET /user/docker/conflicts"
    ],
    listDockerMigrationConflictingPackagesForOrganization: [
      "GET /orgs/{org}/docker/conflicts"
    ],
    listDockerMigrationConflictingPackagesForUser: [
      "GET /users/{username}/docker/conflicts"
    ],
    listPackagesForAuthenticatedUser: ["GET /user/packages"],
    listPackagesForOrganization: ["GET /orgs/{org}/packages"],
    listPackagesForUser: ["GET /users/{username}/packages"],
    restorePackageForAuthenticatedUser: [
      "POST /user/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageForOrg: [
      "POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageForUser: [
      "POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageVersionForAuthenticatedUser: [
      "POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ],
    restorePackageVersionForOrg: [
      "POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ],
    restorePackageVersionForUser: [
      "POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}"],
    createCard: ["POST /projects/columns/{column_id}/cards"],
    createColumn: ["POST /projects/{project_id}/columns"],
    createForAuthenticatedUser: ["POST /user/projects"],
    createForOrg: ["POST /orgs/{org}/projects"],
    createForRepo: ["POST /repos/{owner}/{repo}/projects"],
    delete: ["DELETE /projects/{project_id}"],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}"],
    deleteColumn: ["DELETE /projects/columns/{column_id}"],
    get: ["GET /projects/{project_id}"],
    getCard: ["GET /projects/columns/cards/{card_id}"],
    getColumn: ["GET /projects/columns/{column_id}"],
    getPermissionForUser: [
      "GET /projects/{project_id}/collaborators/{username}/permission"
    ],
    listCards: ["GET /projects/columns/{column_id}/cards"],
    listCollaborators: ["GET /projects/{project_id}/collaborators"],
    listColumns: ["GET /projects/{project_id}/columns"],
    listForOrg: ["GET /orgs/{org}/projects"],
    listForRepo: ["GET /repos/{owner}/{repo}/projects"],
    listForUser: ["GET /users/{username}/projects"],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves"],
    moveColumn: ["POST /projects/columns/{column_id}/moves"],
    removeCollaborator: [
      "DELETE /projects/{project_id}/collaborators/{username}"
    ],
    update: ["PATCH /projects/{project_id}"],
    updateCard: ["PATCH /projects/columns/cards/{card_id}"],
    updateColumn: ["PATCH /projects/columns/{column_id}"]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"
    ],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"
    ],
    deletePendingReview: [
      "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    deleteReviewComment: [
      "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"
    ],
    dismissReview: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"
    ],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"
    ],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    listReviewComments: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"
    ],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: [
      "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    requestReviewers: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    submitReview: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"
    ],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch"
    ],
    updateReview: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    updateReviewComment: [
      "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"
    ]
  },
  rateLimit: { get: ["GET /rate_limit"] },
  reactions: {
    createForCommitComment: [
      "POST /repos/{owner}/{repo}/comments/{comment_id}/reactions"
    ],
    createForIssue: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/reactions"
    ],
    createForIssueComment: [
      "POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"
    ],
    createForPullRequestReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"
    ],
    createForRelease: [
      "POST /repos/{owner}/{repo}/releases/{release_id}/reactions"
    ],
    createForTeamDiscussionCommentInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"
    ],
    createForTeamDiscussionInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"
    ],
    deleteForCommitComment: [
      "DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForIssue: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}"
    ],
    deleteForIssueComment: [
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForPullRequestComment: [
      "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForRelease: [
      "DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}"
    ],
    deleteForTeamDiscussion: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}"
    ],
    deleteForTeamDiscussionComment: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}"
    ],
    listForCommitComment: [
      "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions"
    ],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
    listForIssueComment: [
      "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"
    ],
    listForPullRequestReviewComment: [
      "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"
    ],
    listForRelease: [
      "GET /repos/{owner}/{repo}/releases/{release_id}/reactions"
    ],
    listForTeamDiscussionCommentInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"
    ],
    listForTeamDiscussionInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"
    ]
  },
  repos: {
    acceptInvitation: [
      "PATCH /user/repository_invitations/{invitation_id}",
      {},
      { renamed: ["repos", "acceptInvitationForAuthenticatedUser"] }
    ],
    acceptInvitationForAuthenticatedUser: [
      "PATCH /user/repository_invitations/{invitation_id}"
    ],
    addAppAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    addTeamAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    addUserAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    checkAutomatedSecurityFixes: [
      "GET /repos/{owner}/{repo}/automated-security-fixes"
    ],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: [
      "GET /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: [
      "GET /repos/{owner}/{repo}/compare/{basehead}"
    ],
    createAutolink: ["POST /repos/{owner}/{repo}/autolinks"],
    createCommitComment: [
      "POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"
    ],
    createCommitSignatureProtection: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentBranchPolicy: [
      "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"
    ],
    createDeploymentProtectionRule: [
      "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"
    ],
    createDeploymentStatus: [
      "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"
    ],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: [
      "PUT /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createOrgRuleset: ["POST /orgs/{org}/rulesets"],
    createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployment"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
    createTagProtection: ["POST /repos/{owner}/{repo}/tags/protection"],
    createUsingTemplate: [
      "POST /repos/{template_owner}/{template_repo}/generate"
    ],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: [
      "DELETE /user/repository_invitations/{invitation_id}",
      {},
      { renamed: ["repos", "declineInvitationForAuthenticatedUser"] }
    ],
    declineInvitationForAuthenticatedUser: [
      "DELETE /user/repository_invitations/{invitation_id}"
    ],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"
    ],
    deleteAdminBranchProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    deleteAnEnvironment: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    deleteAutolink: ["DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}"],
    deleteBranchProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: [
      "DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"
    ],
    deleteDeploymentBranchPolicy: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: [
      "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"
    ],
    deleteOrgRuleset: ["DELETE /orgs/{org}/rulesets/{ruleset_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages"],
    deletePullRequestReviewProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: [
      "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"
    ],
    deleteRepoRuleset: ["DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    deleteTagProtection: [
      "DELETE /repos/{owner}/{repo}/tags/protection/{tag_protection_id}"
    ],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: [
      "DELETE /repos/{owner}/{repo}/automated-security-fixes"
    ],
    disableDeploymentProtectionRule: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"
    ],
    disablePrivateVulnerabilityReporting: [
      "DELETE /repos/{owner}/{repo}/private-vulnerability-reporting"
    ],
    disableVulnerabilityAlerts: [
      "DELETE /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    downloadArchive: [
      "GET /repos/{owner}/{repo}/zipball/{ref}",
      {},
      { renamed: ["repos", "downloadZipballArchive"] }
    ],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: [
      "PUT /repos/{owner}/{repo}/automated-security-fixes"
    ],
    enablePrivateVulnerabilityReporting: [
      "PUT /repos/{owner}/{repo}/private-vulnerability-reporting"
    ],
    enableVulnerabilityAlerts: [
      "PUT /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    generateReleaseNotes: [
      "POST /repos/{owner}/{repo}/releases/generate-notes"
    ],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"
    ],
    getAdminBranchProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    getAllDeploymentProtectionRules: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"
    ],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"
    ],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics"],
    getAppsWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"
    ],
    getAutolink: ["GET /repos/{owner}/{repo}/autolinks/{autolink_id}"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    getBranchRules: ["GET /repos/{owner}/{repo}/rules/branches/{branch}"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: [
      "GET /repos/{owner}/{repo}/collaborators/{username}/permission"
    ],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getCustomDeploymentProtectionRule: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"
    ],
    getCustomPropertiesValues: ["GET /repos/{owner}/{repo}/properties/values"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentBranchPolicy: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    getDeploymentStatus: [
      "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"
    ],
    getEnvironment: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getOrgRuleSuite: ["GET /orgs/{org}/rulesets/rule-suites/{rule_suite_id}"],
    getOrgRuleSuites: ["GET /orgs/{org}/rulesets/rule-suites"],
    getOrgRuleset: ["GET /orgs/{org}/rulesets/{ruleset_id}"],
    getOrgRulesets: ["GET /orgs/{org}/rulesets"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getRepoRuleSuite: [
      "GET /repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}"
    ],
    getRepoRuleSuites: ["GET /repos/{owner}/{repo}/rulesets/rule-suites"],
    getRepoRuleset: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    getRepoRulesets: ["GET /repos/{owner}/{repo}/rulesets"],
    getStatusChecksProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    getTeamsWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"
    ],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"
    ],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/config"
    ],
    getWebhookDelivery: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}"
    ],
    listActivities: ["GET /repos/{owner}/{repo}/activity"],
    listAutolinks: ["GET /repos/{owner}/{repo}/autolinks"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head"
    ],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"
    ],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: [
      "GET /repos/{owner}/{repo}/commits/{ref}/statuses"
    ],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listCustomDeploymentRuleIntegrations: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps"
    ],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentBranchPolicies: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"
    ],
    listDeploymentStatuses: [
      "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"
    ],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"
    ],
    listReleaseAssets: [
      "GET /repos/{owner}/{repo}/releases/{release_id}/assets"
    ],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTagProtection: ["GET /repos/{owner}/{repo}/tags/protection"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhookDeliveries: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries"
    ],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    mergeUpstream: ["POST /repos/{owner}/{repo}/merge-upstream"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: [
      "POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"
    ],
    removeAppAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    removeCollaborator: [
      "DELETE /repos/{owner}/{repo}/collaborators/{username}"
    ],
    removeStatusCheckContexts: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    removeStatusCheckProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    removeTeamAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    removeUserAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics"],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    setAppAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    setStatusCheckContexts: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    setTeamAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    setUserAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateDeploymentBranchPolicy: [
      "PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: [
      "PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"
    ],
    updateOrgRuleset: ["PUT /orgs/{org}/rulesets/{ruleset_id}"],
    updatePullRequestReviewProtection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: [
      "PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"
    ],
    updateRepoRuleset: ["PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    updateStatusCheckPotection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      {},
      { renamed: ["repos", "updateStatusCheckProtection"] }
    ],
    updateStatusCheckProtection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: [
      "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"
    ],
    uploadReleaseAsset: [
      "POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}",
      { baseUrl: "https://uploads.github.com" }
    ]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits"],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics"],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: [
      "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"
    ],
    listAlertsForEnterprise: [
      "GET /enterprises/{enterprise}/secret-scanning/alerts"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    listLocationsForAlert: [
      "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations"
    ],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"
    ]
  },
  securityAdvisories: {
    createPrivateVulnerabilityReport: [
      "POST /repos/{owner}/{repo}/security-advisories/reports"
    ],
    createRepositoryAdvisory: [
      "POST /repos/{owner}/{repo}/security-advisories"
    ],
    createRepositoryAdvisoryCveRequest: [
      "POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve"
    ],
    getGlobalAdvisory: ["GET /advisories/{ghsa_id}"],
    getRepositoryAdvisory: [
      "GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}"
    ],
    listGlobalAdvisories: ["GET /advisories"],
    listOrgRepositoryAdvisories: ["GET /orgs/{org}/security-advisories"],
    listRepositoryAdvisories: ["GET /repos/{owner}/{repo}/security-advisories"],
    updateRepositoryAdvisory: [
      "PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}"
    ]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    addOrUpdateProjectPermissionsInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    addOrUpdateRepoPermissionsInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    checkPermissionsForProjectInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    checkPermissionsForRepoInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"
    ],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    deleteDiscussionInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    getDiscussionInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    getMembershipForUserInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"
    ],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/invitations"
    ],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects"],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    removeProjectInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    removeRepoInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    updateDiscussionCommentInOrg: [
      "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    updateDiscussionInOrg: [
      "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: [
      "POST /user/emails",
      {},
      { renamed: ["users", "addEmailForAuthenticatedUser"] }
    ],
    addEmailForAuthenticatedUser: ["POST /user/emails"],
    addSocialAccountForAuthenticatedUser: ["POST /user/social_accounts"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: [
      "POST /user/gpg_keys",
      {},
      { renamed: ["users", "createGpgKeyForAuthenticatedUser"] }
    ],
    createGpgKeyForAuthenticatedUser: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: [
      "POST /user/keys",
      {},
      { renamed: ["users", "createPublicSshKeyForAuthenticatedUser"] }
    ],
    createPublicSshKeyForAuthenticatedUser: ["POST /user/keys"],
    createSshSigningKeyForAuthenticatedUser: ["POST /user/ssh_signing_keys"],
    deleteEmailForAuthenticated: [
      "DELETE /user/emails",
      {},
      { renamed: ["users", "deleteEmailForAuthenticatedUser"] }
    ],
    deleteEmailForAuthenticatedUser: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: [
      "DELETE /user/gpg_keys/{gpg_key_id}",
      {},
      { renamed: ["users", "deleteGpgKeyForAuthenticatedUser"] }
    ],
    deleteGpgKeyForAuthenticatedUser: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: [
      "DELETE /user/keys/{key_id}",
      {},
      { renamed: ["users", "deletePublicSshKeyForAuthenticatedUser"] }
    ],
    deletePublicSshKeyForAuthenticatedUser: ["DELETE /user/keys/{key_id}"],
    deleteSocialAccountForAuthenticatedUser: ["DELETE /user/social_accounts"],
    deleteSshSigningKeyForAuthenticatedUser: [
      "DELETE /user/ssh_signing_keys/{ssh_signing_key_id}"
    ],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: [
      "GET /user/gpg_keys/{gpg_key_id}",
      {},
      { renamed: ["users", "getGpgKeyForAuthenticatedUser"] }
    ],
    getGpgKeyForAuthenticatedUser: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: [
      "GET /user/keys/{key_id}",
      {},
      { renamed: ["users", "getPublicSshKeyForAuthenticatedUser"] }
    ],
    getPublicSshKeyForAuthenticatedUser: ["GET /user/keys/{key_id}"],
    getSshSigningKeyForAuthenticatedUser: [
      "GET /user/ssh_signing_keys/{ssh_signing_key_id}"
    ],
    list: ["GET /users"],
    listBlockedByAuthenticated: [
      "GET /user/blocks",
      {},
      { renamed: ["users", "listBlockedByAuthenticatedUser"] }
    ],
    listBlockedByAuthenticatedUser: ["GET /user/blocks"],
    listEmailsForAuthenticated: [
      "GET /user/emails",
      {},
      { renamed: ["users", "listEmailsForAuthenticatedUser"] }
    ],
    listEmailsForAuthenticatedUser: ["GET /user/emails"],
    listFollowedByAuthenticated: [
      "GET /user/following",
      {},
      { renamed: ["users", "listFollowedByAuthenticatedUser"] }
    ],
    listFollowedByAuthenticatedUser: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: [
      "GET /user/gpg_keys",
      {},
      { renamed: ["users", "listGpgKeysForAuthenticatedUser"] }
    ],
    listGpgKeysForAuthenticatedUser: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: [
      "GET /user/public_emails",
      {},
      { renamed: ["users", "listPublicEmailsForAuthenticatedUser"] }
    ],
    listPublicEmailsForAuthenticatedUser: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: [
      "GET /user/keys",
      {},
      { renamed: ["users", "listPublicSshKeysForAuthenticatedUser"] }
    ],
    listPublicSshKeysForAuthenticatedUser: ["GET /user/keys"],
    listSocialAccountsForAuthenticatedUser: ["GET /user/social_accounts"],
    listSocialAccountsForUser: ["GET /users/{username}/social_accounts"],
    listSshSigningKeysForAuthenticatedUser: ["GET /user/ssh_signing_keys"],
    listSshSigningKeysForUser: ["GET /users/{username}/ssh_signing_keys"],
    setPrimaryEmailVisibilityForAuthenticated: [
      "PATCH /user/email/visibility",
      {},
      { renamed: ["users", "setPrimaryEmailVisibilityForAuthenticatedUser"] }
    ],
    setPrimaryEmailVisibilityForAuthenticatedUser: [
      "PATCH /user/email/visibility"
    ],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};
var endpoints_default = Endpoints;

const endpointMethodsMap = /* @__PURE__ */ new Map();
for (const [scope, endpoints] of Object.entries(endpoints_default)) {
  for (const [methodName, endpoint] of Object.entries(endpoints)) {
    const [route, defaults, decorations] = endpoint;
    const [method, url] = route.split(/ /);
    const endpointDefaults = Object.assign(
      {
        method,
        url
      },
      defaults
    );
    if (!endpointMethodsMap.has(scope)) {
      endpointMethodsMap.set(scope, /* @__PURE__ */ new Map());
    }
    endpointMethodsMap.get(scope).set(methodName, {
      scope,
      methodName,
      endpointDefaults,
      decorations
    });
  }
}
const handler = {
  has({ scope }, methodName) {
    return endpointMethodsMap.get(scope).has(methodName);
  },
  getOwnPropertyDescriptor(target, methodName) {
    return {
      value: this.get(target, methodName),
      // ensures method is in the cache
      configurable: true,
      writable: true,
      enumerable: true
    };
  },
  defineProperty(target, methodName, descriptor) {
    Object.defineProperty(target.cache, methodName, descriptor);
    return true;
  },
  deleteProperty(target, methodName) {
    delete target.cache[methodName];
    return true;
  },
  ownKeys({ scope }) {
    return [...endpointMethodsMap.get(scope).keys()];
  },
  set(target, methodName, value) {
    return target.cache[methodName] = value;
  },
  get({ octokit, scope, cache }, methodName) {
    if (cache[methodName]) {
      return cache[methodName];
    }
    const method = endpointMethodsMap.get(scope).get(methodName);
    if (!method) {
      return void 0;
    }
    const { endpointDefaults, decorations } = method;
    if (decorations) {
      cache[methodName] = decorate(
        octokit,
        scope,
        methodName,
        endpointDefaults,
        decorations
      );
    } else {
      cache[methodName] = octokit.request.defaults(endpointDefaults);
    }
    return cache[methodName];
  }
};
function endpointsToMethods(octokit) {
  const newMethods = {};
  for (const scope of endpointMethodsMap.keys()) {
    newMethods[scope] = new Proxy({ octokit, scope, cache: {} }, handler);
  }
  return newMethods;
}
function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  function withDecorations(...args) {
    let options = requestWithDefaults.endpoint.merge(...args);
    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: void 0
      });
      return requestWithDefaults(options);
    }
    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(
        `octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`
      );
    }
    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }
    if (decorations.renamedParameters) {
      const options2 = requestWithDefaults.endpoint.merge(...args);
      for (const [name, alias] of Object.entries(
        decorations.renamedParameters
      )) {
        if (name in options2) {
          octokit.log.warn(
            `"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`
          );
          if (!(alias in options2)) {
            options2[alias] = options2[name];
          }
          delete options2[name];
        }
      }
      return requestWithDefaults(options2);
    }
    return requestWithDefaults(...args);
  }
  return Object.assign(withDecorations, requestWithDefaults);
}

function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit);
  return {
    rest: api
  };
}
restEndpointMethods.VERSION = VERSION$1;
function legacyRestEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit);
  return {
    ...api,
    rest: api
  };
}
legacyRestEndpointMethods.VERSION = VERSION$1;

var distSrc = /*#__PURE__*/Object.freeze({
    __proto__: null,
    legacyRestEndpointMethods: legacyRestEndpointMethods,
    restEndpointMethods: restEndpointMethods
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(distSrc);

// pkg/dist-src/version.js
var VERSION = "9.2.2";

// pkg/dist-src/normalize-paginated-list-response.js
function normalizePaginatedListResponse(response) {
  if (!response.data) {
    return {
      ...response,
      data: []
    };
  }
  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization)
    return response;
  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;
  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }
  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }
  response.data.total_count = totalCount;
  return response;
}

// pkg/dist-src/iterator.js
function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url)
          return { done: true };
        try {
          const response = await requestMethod({ method, url, headers });
          const normalizedResponse = normalizePaginatedListResponse(response);
          url = ((normalizedResponse.headers.link || "").match(
            /<([^<>]+)>;\s*rel="next"/
          ) || [])[1];
          return { value: normalizedResponse };
        } catch (error) {
          if (error.status !== 409)
            throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }
    })
  };
}

// pkg/dist-src/paginate.js
function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = void 0;
  }
  return gather(
    octokit,
    [],
    iterator(octokit, route, parameters)[Symbol.asyncIterator](),
    mapFn
  );
}
function gather(octokit, results, iterator2, mapFn) {
  return iterator2.next().then((result) => {
    if (result.done) {
      return results;
    }
    let earlyExit = false;
    function done() {
      earlyExit = true;
    }
    results = results.concat(
      mapFn ? mapFn(result.value, done) : result.value.data
    );
    if (earlyExit) {
      return results;
    }
    return gather(octokit, results, iterator2, mapFn);
  });
}

// pkg/dist-src/compose-paginate.js
var composePaginateRest = Object.assign(paginate, {
  iterator
});

// pkg/dist-src/generated/paginating-endpoints.js
var paginatingEndpoints = [
  "GET /advisories",
  "GET /app/hook/deliveries",
  "GET /app/installation-requests",
  "GET /app/installations",
  "GET /assignments/{assignment_id}/accepted_assignments",
  "GET /classrooms",
  "GET /classrooms/{classroom_id}/assignments",
  "GET /enterprises/{enterprise}/dependabot/alerts",
  "GET /enterprises/{enterprise}/secret-scanning/alerts",
  "GET /events",
  "GET /gists",
  "GET /gists/public",
  "GET /gists/starred",
  "GET /gists/{gist_id}/comments",
  "GET /gists/{gist_id}/commits",
  "GET /gists/{gist_id}/forks",
  "GET /installation/repositories",
  "GET /issues",
  "GET /licenses",
  "GET /marketplace_listing/plans",
  "GET /marketplace_listing/plans/{plan_id}/accounts",
  "GET /marketplace_listing/stubbed/plans",
  "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts",
  "GET /networks/{owner}/{repo}/events",
  "GET /notifications",
  "GET /organizations",
  "GET /orgs/{org}/actions/cache/usage-by-repository",
  "GET /orgs/{org}/actions/permissions/repositories",
  "GET /orgs/{org}/actions/runners",
  "GET /orgs/{org}/actions/secrets",
  "GET /orgs/{org}/actions/secrets/{secret_name}/repositories",
  "GET /orgs/{org}/actions/variables",
  "GET /orgs/{org}/actions/variables/{name}/repositories",
  "GET /orgs/{org}/blocks",
  "GET /orgs/{org}/code-scanning/alerts",
  "GET /orgs/{org}/codespaces",
  "GET /orgs/{org}/codespaces/secrets",
  "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories",
  "GET /orgs/{org}/copilot/billing/seats",
  "GET /orgs/{org}/dependabot/alerts",
  "GET /orgs/{org}/dependabot/secrets",
  "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories",
  "GET /orgs/{org}/events",
  "GET /orgs/{org}/failed_invitations",
  "GET /orgs/{org}/hooks",
  "GET /orgs/{org}/hooks/{hook_id}/deliveries",
  "GET /orgs/{org}/installations",
  "GET /orgs/{org}/invitations",
  "GET /orgs/{org}/invitations/{invitation_id}/teams",
  "GET /orgs/{org}/issues",
  "GET /orgs/{org}/members",
  "GET /orgs/{org}/members/{username}/codespaces",
  "GET /orgs/{org}/migrations",
  "GET /orgs/{org}/migrations/{migration_id}/repositories",
  "GET /orgs/{org}/organization-roles/{role_id}/teams",
  "GET /orgs/{org}/organization-roles/{role_id}/users",
  "GET /orgs/{org}/outside_collaborators",
  "GET /orgs/{org}/packages",
  "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
  "GET /orgs/{org}/personal-access-token-requests",
  "GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories",
  "GET /orgs/{org}/personal-access-tokens",
  "GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories",
  "GET /orgs/{org}/projects",
  "GET /orgs/{org}/properties/values",
  "GET /orgs/{org}/public_members",
  "GET /orgs/{org}/repos",
  "GET /orgs/{org}/rulesets",
  "GET /orgs/{org}/rulesets/rule-suites",
  "GET /orgs/{org}/secret-scanning/alerts",
  "GET /orgs/{org}/security-advisories",
  "GET /orgs/{org}/teams",
  "GET /orgs/{org}/teams/{team_slug}/discussions",
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions",
  "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions",
  "GET /orgs/{org}/teams/{team_slug}/invitations",
  "GET /orgs/{org}/teams/{team_slug}/members",
  "GET /orgs/{org}/teams/{team_slug}/projects",
  "GET /orgs/{org}/teams/{team_slug}/repos",
  "GET /orgs/{org}/teams/{team_slug}/teams",
  "GET /projects/columns/{column_id}/cards",
  "GET /projects/{project_id}/collaborators",
  "GET /projects/{project_id}/columns",
  "GET /repos/{owner}/{repo}/actions/artifacts",
  "GET /repos/{owner}/{repo}/actions/caches",
  "GET /repos/{owner}/{repo}/actions/organization-secrets",
  "GET /repos/{owner}/{repo}/actions/organization-variables",
  "GET /repos/{owner}/{repo}/actions/runners",
  "GET /repos/{owner}/{repo}/actions/runs",
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs",
  "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs",
  "GET /repos/{owner}/{repo}/actions/secrets",
  "GET /repos/{owner}/{repo}/actions/variables",
  "GET /repos/{owner}/{repo}/actions/workflows",
  "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
  "GET /repos/{owner}/{repo}/activity",
  "GET /repos/{owner}/{repo}/assignees",
  "GET /repos/{owner}/{repo}/branches",
  "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations",
  "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs",
  "GET /repos/{owner}/{repo}/code-scanning/alerts",
  "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
  "GET /repos/{owner}/{repo}/code-scanning/analyses",
  "GET /repos/{owner}/{repo}/codespaces",
  "GET /repos/{owner}/{repo}/codespaces/devcontainers",
  "GET /repos/{owner}/{repo}/codespaces/secrets",
  "GET /repos/{owner}/{repo}/collaborators",
  "GET /repos/{owner}/{repo}/comments",
  "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions",
  "GET /repos/{owner}/{repo}/commits",
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments",
  "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls",
  "GET /repos/{owner}/{repo}/commits/{ref}/check-runs",
  "GET /repos/{owner}/{repo}/commits/{ref}/check-suites",
  "GET /repos/{owner}/{repo}/commits/{ref}/status",
  "GET /repos/{owner}/{repo}/commits/{ref}/statuses",
  "GET /repos/{owner}/{repo}/contributors",
  "GET /repos/{owner}/{repo}/dependabot/alerts",
  "GET /repos/{owner}/{repo}/dependabot/secrets",
  "GET /repos/{owner}/{repo}/deployments",
  "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
  "GET /repos/{owner}/{repo}/environments",
  "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies",
  "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps",
  "GET /repos/{owner}/{repo}/events",
  "GET /repos/{owner}/{repo}/forks",
  "GET /repos/{owner}/{repo}/hooks",
  "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries",
  "GET /repos/{owner}/{repo}/invitations",
  "GET /repos/{owner}/{repo}/issues",
  "GET /repos/{owner}/{repo}/issues/comments",
  "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions",
  "GET /repos/{owner}/{repo}/issues/events",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/events",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions",
  "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
  "GET /repos/{owner}/{repo}/keys",
  "GET /repos/{owner}/{repo}/labels",
  "GET /repos/{owner}/{repo}/milestones",
  "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels",
  "GET /repos/{owner}/{repo}/notifications",
  "GET /repos/{owner}/{repo}/pages/builds",
  "GET /repos/{owner}/{repo}/projects",
  "GET /repos/{owner}/{repo}/pulls",
  "GET /repos/{owner}/{repo}/pulls/comments",
  "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments",
  "GET /repos/{owner}/{repo}/releases",
  "GET /repos/{owner}/{repo}/releases/{release_id}/assets",
  "GET /repos/{owner}/{repo}/releases/{release_id}/reactions",
  "GET /repos/{owner}/{repo}/rules/branches/{branch}",
  "GET /repos/{owner}/{repo}/rulesets",
  "GET /repos/{owner}/{repo}/rulesets/rule-suites",
  "GET /repos/{owner}/{repo}/secret-scanning/alerts",
  "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations",
  "GET /repos/{owner}/{repo}/security-advisories",
  "GET /repos/{owner}/{repo}/stargazers",
  "GET /repos/{owner}/{repo}/subscribers",
  "GET /repos/{owner}/{repo}/tags",
  "GET /repos/{owner}/{repo}/teams",
  "GET /repos/{owner}/{repo}/topics",
  "GET /repositories",
  "GET /repositories/{repository_id}/environments/{environment_name}/secrets",
  "GET /repositories/{repository_id}/environments/{environment_name}/variables",
  "GET /search/code",
  "GET /search/commits",
  "GET /search/issues",
  "GET /search/labels",
  "GET /search/repositories",
  "GET /search/topics",
  "GET /search/users",
  "GET /teams/{team_id}/discussions",
  "GET /teams/{team_id}/discussions/{discussion_number}/comments",
  "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions",
  "GET /teams/{team_id}/discussions/{discussion_number}/reactions",
  "GET /teams/{team_id}/invitations",
  "GET /teams/{team_id}/members",
  "GET /teams/{team_id}/projects",
  "GET /teams/{team_id}/repos",
  "GET /teams/{team_id}/teams",
  "GET /user/blocks",
  "GET /user/codespaces",
  "GET /user/codespaces/secrets",
  "GET /user/emails",
  "GET /user/followers",
  "GET /user/following",
  "GET /user/gpg_keys",
  "GET /user/installations",
  "GET /user/installations/{installation_id}/repositories",
  "GET /user/issues",
  "GET /user/keys",
  "GET /user/marketplace_purchases",
  "GET /user/marketplace_purchases/stubbed",
  "GET /user/memberships/orgs",
  "GET /user/migrations",
  "GET /user/migrations/{migration_id}/repositories",
  "GET /user/orgs",
  "GET /user/packages",
  "GET /user/packages/{package_type}/{package_name}/versions",
  "GET /user/public_emails",
  "GET /user/repos",
  "GET /user/repository_invitations",
  "GET /user/social_accounts",
  "GET /user/ssh_signing_keys",
  "GET /user/starred",
  "GET /user/subscriptions",
  "GET /user/teams",
  "GET /users",
  "GET /users/{username}/events",
  "GET /users/{username}/events/orgs/{org}",
  "GET /users/{username}/events/public",
  "GET /users/{username}/followers",
  "GET /users/{username}/following",
  "GET /users/{username}/gists",
  "GET /users/{username}/gpg_keys",
  "GET /users/{username}/keys",
  "GET /users/{username}/orgs",
  "GET /users/{username}/packages",
  "GET /users/{username}/projects",
  "GET /users/{username}/received_events",
  "GET /users/{username}/received_events/public",
  "GET /users/{username}/repos",
  "GET /users/{username}/social_accounts",
  "GET /users/{username}/ssh_signing_keys",
  "GET /users/{username}/starred",
  "GET /users/{username}/subscriptions"
];

// pkg/dist-src/paginating-endpoints.js
function isPaginatingEndpoint(arg) {
  if (typeof arg === "string") {
    return paginatingEndpoints.includes(arg);
  } else {
    return false;
  }
}

// pkg/dist-src/index.js
function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;

var distWeb = /*#__PURE__*/Object.freeze({
    __proto__: null,
    composePaginateRest: composePaginateRest,
    isPaginatingEndpoint: isPaginatingEndpoint,
    paginateRest: paginateRest,
    paginatingEndpoints: paginatingEndpoints
});

var require$$4 = /*@__PURE__*/getAugmentedNamespace(distWeb);

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils$1;
	hasRequiredUtils = 1;
	(function (exports) {
		var __createBinding = (utils$1 && utils$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (utils$1 && utils$1.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (utils$1 && utils$1.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getOctokitOptions = exports.GitHub = exports.defaults = exports.context = void 0;
		const Context = __importStar(requireContext());
		const Utils = __importStar(requireUtils$1());
		// octokit + plugins
		const core_1 = require$$2;
		const plugin_rest_endpoint_methods_1 = require$$3;
		const plugin_paginate_rest_1 = require$$4;
		exports.context = new Context.Context();
		const baseUrl = Utils.getApiBaseUrl();
		exports.defaults = {
		    baseUrl,
		    request: {
		        agent: Utils.getProxyAgent(baseUrl),
		        fetch: Utils.getProxyFetch(baseUrl)
		    }
		};
		exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(exports.defaults);
		/**
		 * Convience function to correctly format Octokit Options to pass into the constructor.
		 *
		 * @param     token    the repo PAT or GITHUB_TOKEN
		 * @param     options  other options to set
		 */
		function getOctokitOptions(token, options) {
		    const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
		    // Auth
		    const auth = Utils.getAuthString(token, opts);
		    if (auth) {
		        opts.auth = auth;
		    }
		    return opts;
		}
		exports.getOctokitOptions = getOctokitOptions;
		
	} (utils$1));
	return utils$1;
}

var hasRequiredGithub;

function requireGithub () {
	if (hasRequiredGithub) return github;
	hasRequiredGithub = 1;
	var __createBinding = (github && github.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (github && github.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (github && github.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(github, "__esModule", { value: true });
	github.getOctokit = github.context = void 0;
	const Context = __importStar(requireContext());
	const utils_1 = requireUtils();
	github.context = new Context.Context();
	/**
	 * Returns a hydrated octokit ready to use for GitHub Actions
	 *
	 * @param     token    the repo PAT or GITHUB_TOKEN
	 * @param     options  other options to set
	 */
	function getOctokit(token, options, ...additionalPlugins) {
	    const GitHubWithPlugins = utils_1.GitHub.plugin(...additionalPlugins);
	    return new GitHubWithPlugins((0, utils_1.getOctokitOptions)(token, options));
	}
	github.getOctokit = getOctokit;
	
	return github;
}

var githubExports = requireGithub();

var toolCache = {};

var manifest$1 = {exports: {}};

var semver = {exports: {}};

var hasRequiredSemver;

function requireSemver () {
	if (hasRequiredSemver) return semver.exports;
	hasRequiredSemver = 1;
	(function (module, exports) {
		exports = module.exports = SemVer;

		var debug;
		/* istanbul ignore next */
		if (typeof process === 'object' &&
		    process.env &&
		    process.env.NODE_DEBUG &&
		    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
		  debug = function () {
		    var args = Array.prototype.slice.call(arguments, 0);
		    args.unshift('SEMVER');
		    console.log.apply(console, args);
		  };
		} else {
		  debug = function () {};
		}

		// Note: this is the semver.org version of the spec that it implements
		// Not necessarily the package version of this code.
		exports.SEMVER_SPEC_VERSION = '2.0.0';

		var MAX_LENGTH = 256;
		var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
		  /* istanbul ignore next */ 9007199254740991;

		// Max safe segment length for coercion.
		var MAX_SAFE_COMPONENT_LENGTH = 16;

		var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;

		// The actual regexps go on exports.re
		var re = exports.re = [];
		var safeRe = exports.safeRe = [];
		var src = exports.src = [];
		var t = exports.tokens = {};
		var R = 0;

		function tok (n) {
		  t[n] = R++;
		}

		var LETTERDASHNUMBER = '[a-zA-Z0-9-]';

		// Replace some greedy regex tokens to prevent regex dos issues. These regex are
		// used internally via the safeRe object since all inputs in this library get
		// normalized first to trim and collapse all extra whitespace. The original
		// regexes are exported for userland consumption and lower level usage. A
		// future breaking change could export the safer regex only with a note that
		// all input should have extra whitespace removed.
		var safeRegexReplacements = [
		  ['\\s', 1],
		  ['\\d', MAX_LENGTH],
		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
		];

		function makeSafeRe (value) {
		  for (var i = 0; i < safeRegexReplacements.length; i++) {
		    var token = safeRegexReplacements[i][0];
		    var max = safeRegexReplacements[i][1];
		    value = value
		      .split(token + '*').join(token + '{0,' + max + '}')
		      .split(token + '+').join(token + '{1,' + max + '}');
		  }
		  return value
		}

		// The following Regular Expressions can be used for tokenizing,
		// validating, and parsing SemVer version strings.

		// ## Numeric Identifier
		// A single `0`, or a non-zero digit followed by zero or more digits.

		tok('NUMERICIDENTIFIER');
		src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*';
		tok('NUMERICIDENTIFIERLOOSE');
		src[t.NUMERICIDENTIFIERLOOSE] = '\\d+';

		// ## Non-numeric Identifier
		// Zero or more digits, followed by a letter or hyphen, and then zero or
		// more letters, digits, or hyphens.

		tok('NONNUMERICIDENTIFIER');
		src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-]' + LETTERDASHNUMBER + '*';

		// ## Main Version
		// Three dot-separated numeric identifiers.

		tok('MAINVERSION');
		src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
		                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
		                   '(' + src[t.NUMERICIDENTIFIER] + ')';

		tok('MAINVERSIONLOOSE');
		src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
		                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
		                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')';

		// ## Pre-release Version Identifier
		// A numeric identifier, or a non-numeric identifier.

		tok('PRERELEASEIDENTIFIER');
		src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
		                            '|' + src[t.NONNUMERICIDENTIFIER] + ')';

		tok('PRERELEASEIDENTIFIERLOOSE');
		src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
		                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')';

		// ## Pre-release Version
		// Hyphen, followed by one or more dot-separated pre-release version
		// identifiers.

		tok('PRERELEASE');
		src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
		                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))';

		tok('PRERELEASELOOSE');
		src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
		                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))';

		// ## Build Metadata Identifier
		// Any combination of digits, letters, or hyphens.

		tok('BUILDIDENTIFIER');
		src[t.BUILDIDENTIFIER] = LETTERDASHNUMBER + '+';

		// ## Build Metadata
		// Plus sign, followed by one or more period-separated build metadata
		// identifiers.

		tok('BUILD');
		src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
		             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))';

		// ## Full Version String
		// A main version, followed optionally by a pre-release version and
		// build metadata.

		// Note that the only major, minor, patch, and pre-release sections of
		// the version string are capturing groups.  The build metadata is not a
		// capturing group, because it should not ever be used in version
		// comparison.

		tok('FULL');
		tok('FULLPLAIN');
		src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
		                  src[t.PRERELEASE] + '?' +
		                  src[t.BUILD] + '?';

		src[t.FULL] = '^' + src[t.FULLPLAIN] + '$';

		// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
		// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
		// common in the npm registry.
		tok('LOOSEPLAIN');
		src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
		                  src[t.PRERELEASELOOSE] + '?' +
		                  src[t.BUILD] + '?';

		tok('LOOSE');
		src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$';

		tok('GTLT');
		src[t.GTLT] = '((?:<|>)?=?)';

		// Something like "2.*" or "1.2.x".
		// Note that "x.x" is a valid xRange identifer, meaning "any version"
		// Only the first item is strictly required.
		tok('XRANGEIDENTIFIERLOOSE');
		src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
		tok('XRANGEIDENTIFIER');
		src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*';

		tok('XRANGEPLAIN');
		src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
		                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
		                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
		                   '(?:' + src[t.PRERELEASE] + ')?' +
		                   src[t.BUILD] + '?' +
		                   ')?)?';

		tok('XRANGEPLAINLOOSE');
		src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
		                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
		                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
		                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
		                        src[t.BUILD] + '?' +
		                        ')?)?';

		tok('XRANGE');
		src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$';
		tok('XRANGELOOSE');
		src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$';

		// Coercion.
		// Extract anything that could conceivably be a part of a valid semver
		tok('COERCE');
		src[t.COERCE] = '(^|[^\\d])' +
		              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
		              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
		              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
		              '(?:$|[^\\d])';
		tok('COERCERTL');
		re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g');
		safeRe[t.COERCERTL] = new RegExp(makeSafeRe(src[t.COERCE]), 'g');

		// Tilde ranges.
		// Meaning is "reasonably at or greater than"
		tok('LONETILDE');
		src[t.LONETILDE] = '(?:~>?)';

		tok('TILDETRIM');
		src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+';
		re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g');
		safeRe[t.TILDETRIM] = new RegExp(makeSafeRe(src[t.TILDETRIM]), 'g');
		var tildeTrimReplace = '$1~';

		tok('TILDE');
		src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$';
		tok('TILDELOOSE');
		src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$';

		// Caret ranges.
		// Meaning is "at least and backwards compatible with"
		tok('LONECARET');
		src[t.LONECARET] = '(?:\\^)';

		tok('CARETTRIM');
		src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+';
		re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g');
		safeRe[t.CARETTRIM] = new RegExp(makeSafeRe(src[t.CARETTRIM]), 'g');
		var caretTrimReplace = '$1^';

		tok('CARET');
		src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$';
		tok('CARETLOOSE');
		src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$';

		// A simple gt/lt/eq thing, or just "" to indicate "any version"
		tok('COMPARATORLOOSE');
		src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$';
		tok('COMPARATOR');
		src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$';

		// An expression to strip any whitespace between the gtlt and the thing
		// it modifies, so that `> 1.2.3` ==> `>1.2.3`
		tok('COMPARATORTRIM');
		src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
		                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')';

		// this one has to use the /g flag
		re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g');
		safeRe[t.COMPARATORTRIM] = new RegExp(makeSafeRe(src[t.COMPARATORTRIM]), 'g');
		var comparatorTrimReplace = '$1$2$3';

		// Something like `1.2.3 - 1.2.4`
		// Note that these all use the loose form, because they'll be
		// checked against either the strict or loose comparator form
		// later.
		tok('HYPHENRANGE');
		src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
		                   '\\s+-\\s+' +
		                   '(' + src[t.XRANGEPLAIN] + ')' +
		                   '\\s*$';

		tok('HYPHENRANGELOOSE');
		src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
		                        '\\s+-\\s+' +
		                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
		                        '\\s*$';

		// Star ranges basically just allow anything at all.
		tok('STAR');
		src[t.STAR] = '(<|>)?=?\\s*\\*';

		// Compile to actual regexp objects.
		// All are flag-free, unless they were created above with a flag.
		for (var i = 0; i < R; i++) {
		  debug(i, src[i]);
		  if (!re[i]) {
		    re[i] = new RegExp(src[i]);

		    // Replace all greedy whitespace to prevent regex dos issues. These regex are
		    // used internally via the safeRe object since all inputs in this library get
		    // normalized first to trim and collapse all extra whitespace. The original
		    // regexes are exported for userland consumption and lower level usage. A
		    // future breaking change could export the safer regex only with a note that
		    // all input should have extra whitespace removed.
		    safeRe[i] = new RegExp(makeSafeRe(src[i]));
		  }
		}

		exports.parse = parse;
		function parse (version, options) {
		  if (!options || typeof options !== 'object') {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }

		  if (version instanceof SemVer) {
		    return version
		  }

		  if (typeof version !== 'string') {
		    return null
		  }

		  if (version.length > MAX_LENGTH) {
		    return null
		  }

		  var r = options.loose ? safeRe[t.LOOSE] : safeRe[t.FULL];
		  if (!r.test(version)) {
		    return null
		  }

		  try {
		    return new SemVer(version, options)
		  } catch (er) {
		    return null
		  }
		}

		exports.valid = valid;
		function valid (version, options) {
		  var v = parse(version, options);
		  return v ? v.version : null
		}

		exports.clean = clean;
		function clean (version, options) {
		  var s = parse(version.trim().replace(/^[=v]+/, ''), options);
		  return s ? s.version : null
		}

		exports.SemVer = SemVer;

		function SemVer (version, options) {
		  if (!options || typeof options !== 'object') {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }
		  if (version instanceof SemVer) {
		    if (version.loose === options.loose) {
		      return version
		    } else {
		      version = version.version;
		    }
		  } else if (typeof version !== 'string') {
		    throw new TypeError('Invalid Version: ' + version)
		  }

		  if (version.length > MAX_LENGTH) {
		    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
		  }

		  if (!(this instanceof SemVer)) {
		    return new SemVer(version, options)
		  }

		  debug('SemVer', version, options);
		  this.options = options;
		  this.loose = !!options.loose;

		  var m = version.trim().match(options.loose ? safeRe[t.LOOSE] : safeRe[t.FULL]);

		  if (!m) {
		    throw new TypeError('Invalid Version: ' + version)
		  }

		  this.raw = version;

		  // these are actually numbers
		  this.major = +m[1];
		  this.minor = +m[2];
		  this.patch = +m[3];

		  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
		    throw new TypeError('Invalid major version')
		  }

		  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
		    throw new TypeError('Invalid minor version')
		  }

		  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
		    throw new TypeError('Invalid patch version')
		  }

		  // numberify any prerelease numeric ids
		  if (!m[4]) {
		    this.prerelease = [];
		  } else {
		    this.prerelease = m[4].split('.').map(function (id) {
		      if (/^[0-9]+$/.test(id)) {
		        var num = +id;
		        if (num >= 0 && num < MAX_SAFE_INTEGER) {
		          return num
		        }
		      }
		      return id
		    });
		  }

		  this.build = m[5] ? m[5].split('.') : [];
		  this.format();
		}

		SemVer.prototype.format = function () {
		  this.version = this.major + '.' + this.minor + '.' + this.patch;
		  if (this.prerelease.length) {
		    this.version += '-' + this.prerelease.join('.');
		  }
		  return this.version
		};

		SemVer.prototype.toString = function () {
		  return this.version
		};

		SemVer.prototype.compare = function (other) {
		  debug('SemVer.compare', this.version, this.options, other);
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }

		  return this.compareMain(other) || this.comparePre(other)
		};

		SemVer.prototype.compareMain = function (other) {
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }

		  return compareIdentifiers(this.major, other.major) ||
		         compareIdentifiers(this.minor, other.minor) ||
		         compareIdentifiers(this.patch, other.patch)
		};

		SemVer.prototype.comparePre = function (other) {
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }

		  // NOT having a prerelease is > having one
		  if (this.prerelease.length && !other.prerelease.length) {
		    return -1
		  } else if (!this.prerelease.length && other.prerelease.length) {
		    return 1
		  } else if (!this.prerelease.length && !other.prerelease.length) {
		    return 0
		  }

		  var i = 0;
		  do {
		    var a = this.prerelease[i];
		    var b = other.prerelease[i];
		    debug('prerelease compare', i, a, b);
		    if (a === undefined && b === undefined) {
		      return 0
		    } else if (b === undefined) {
		      return 1
		    } else if (a === undefined) {
		      return -1
		    } else if (a === b) {
		      continue
		    } else {
		      return compareIdentifiers(a, b)
		    }
		  } while (++i)
		};

		SemVer.prototype.compareBuild = function (other) {
		  if (!(other instanceof SemVer)) {
		    other = new SemVer(other, this.options);
		  }

		  var i = 0;
		  do {
		    var a = this.build[i];
		    var b = other.build[i];
		    debug('prerelease compare', i, a, b);
		    if (a === undefined && b === undefined) {
		      return 0
		    } else if (b === undefined) {
		      return 1
		    } else if (a === undefined) {
		      return -1
		    } else if (a === b) {
		      continue
		    } else {
		      return compareIdentifiers(a, b)
		    }
		  } while (++i)
		};

		// preminor will bump the version up to the next minor release, and immediately
		// down to pre-release. premajor and prepatch work the same way.
		SemVer.prototype.inc = function (release, identifier) {
		  switch (release) {
		    case 'premajor':
		      this.prerelease.length = 0;
		      this.patch = 0;
		      this.minor = 0;
		      this.major++;
		      this.inc('pre', identifier);
		      break
		    case 'preminor':
		      this.prerelease.length = 0;
		      this.patch = 0;
		      this.minor++;
		      this.inc('pre', identifier);
		      break
		    case 'prepatch':
		      // If this is already a prerelease, it will bump to the next version
		      // drop any prereleases that might already exist, since they are not
		      // relevant at this point.
		      this.prerelease.length = 0;
		      this.inc('patch', identifier);
		      this.inc('pre', identifier);
		      break
		    // If the input is a non-prerelease version, this acts the same as
		    // prepatch.
		    case 'prerelease':
		      if (this.prerelease.length === 0) {
		        this.inc('patch', identifier);
		      }
		      this.inc('pre', identifier);
		      break

		    case 'major':
		      // If this is a pre-major version, bump up to the same major version.
		      // Otherwise increment major.
		      // 1.0.0-5 bumps to 1.0.0
		      // 1.1.0 bumps to 2.0.0
		      if (this.minor !== 0 ||
		          this.patch !== 0 ||
		          this.prerelease.length === 0) {
		        this.major++;
		      }
		      this.minor = 0;
		      this.patch = 0;
		      this.prerelease = [];
		      break
		    case 'minor':
		      // If this is a pre-minor version, bump up to the same minor version.
		      // Otherwise increment minor.
		      // 1.2.0-5 bumps to 1.2.0
		      // 1.2.1 bumps to 1.3.0
		      if (this.patch !== 0 || this.prerelease.length === 0) {
		        this.minor++;
		      }
		      this.patch = 0;
		      this.prerelease = [];
		      break
		    case 'patch':
		      // If this is not a pre-release version, it will increment the patch.
		      // If it is a pre-release it will bump up to the same patch version.
		      // 1.2.0-5 patches to 1.2.0
		      // 1.2.0 patches to 1.2.1
		      if (this.prerelease.length === 0) {
		        this.patch++;
		      }
		      this.prerelease = [];
		      break
		    // This probably shouldn't be used publicly.
		    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
		    case 'pre':
		      if (this.prerelease.length === 0) {
		        this.prerelease = [0];
		      } else {
		        var i = this.prerelease.length;
		        while (--i >= 0) {
		          if (typeof this.prerelease[i] === 'number') {
		            this.prerelease[i]++;
		            i = -2;
		          }
		        }
		        if (i === -1) {
		          // didn't increment anything
		          this.prerelease.push(0);
		        }
		      }
		      if (identifier) {
		        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
		        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
		        if (this.prerelease[0] === identifier) {
		          if (isNaN(this.prerelease[1])) {
		            this.prerelease = [identifier, 0];
		          }
		        } else {
		          this.prerelease = [identifier, 0];
		        }
		      }
		      break

		    default:
		      throw new Error('invalid increment argument: ' + release)
		  }
		  this.format();
		  this.raw = this.version;
		  return this
		};

		exports.inc = inc;
		function inc (version, release, loose, identifier) {
		  if (typeof (loose) === 'string') {
		    identifier = loose;
		    loose = undefined;
		  }

		  try {
		    return new SemVer(version, loose).inc(release, identifier).version
		  } catch (er) {
		    return null
		  }
		}

		exports.diff = diff;
		function diff (version1, version2) {
		  if (eq(version1, version2)) {
		    return null
		  } else {
		    var v1 = parse(version1);
		    var v2 = parse(version2);
		    var prefix = '';
		    if (v1.prerelease.length || v2.prerelease.length) {
		      prefix = 'pre';
		      var defaultResult = 'prerelease';
		    }
		    for (var key in v1) {
		      if (key === 'major' || key === 'minor' || key === 'patch') {
		        if (v1[key] !== v2[key]) {
		          return prefix + key
		        }
		      }
		    }
		    return defaultResult // may be undefined
		  }
		}

		exports.compareIdentifiers = compareIdentifiers;

		var numeric = /^[0-9]+$/;
		function compareIdentifiers (a, b) {
		  var anum = numeric.test(a);
		  var bnum = numeric.test(b);

		  if (anum && bnum) {
		    a = +a;
		    b = +b;
		  }

		  return a === b ? 0
		    : (anum && !bnum) ? -1
		    : (bnum && !anum) ? 1
		    : a < b ? -1
		    : 1
		}

		exports.rcompareIdentifiers = rcompareIdentifiers;
		function rcompareIdentifiers (a, b) {
		  return compareIdentifiers(b, a)
		}

		exports.major = major;
		function major (a, loose) {
		  return new SemVer(a, loose).major
		}

		exports.minor = minor;
		function minor (a, loose) {
		  return new SemVer(a, loose).minor
		}

		exports.patch = patch;
		function patch (a, loose) {
		  return new SemVer(a, loose).patch
		}

		exports.compare = compare;
		function compare (a, b, loose) {
		  return new SemVer(a, loose).compare(new SemVer(b, loose))
		}

		exports.compareLoose = compareLoose;
		function compareLoose (a, b) {
		  return compare(a, b, true)
		}

		exports.compareBuild = compareBuild;
		function compareBuild (a, b, loose) {
		  var versionA = new SemVer(a, loose);
		  var versionB = new SemVer(b, loose);
		  return versionA.compare(versionB) || versionA.compareBuild(versionB)
		}

		exports.rcompare = rcompare;
		function rcompare (a, b, loose) {
		  return compare(b, a, loose)
		}

		exports.sort = sort;
		function sort (list, loose) {
		  return list.sort(function (a, b) {
		    return exports.compareBuild(a, b, loose)
		  })
		}

		exports.rsort = rsort;
		function rsort (list, loose) {
		  return list.sort(function (a, b) {
		    return exports.compareBuild(b, a, loose)
		  })
		}

		exports.gt = gt;
		function gt (a, b, loose) {
		  return compare(a, b, loose) > 0
		}

		exports.lt = lt;
		function lt (a, b, loose) {
		  return compare(a, b, loose) < 0
		}

		exports.eq = eq;
		function eq (a, b, loose) {
		  return compare(a, b, loose) === 0
		}

		exports.neq = neq;
		function neq (a, b, loose) {
		  return compare(a, b, loose) !== 0
		}

		exports.gte = gte;
		function gte (a, b, loose) {
		  return compare(a, b, loose) >= 0
		}

		exports.lte = lte;
		function lte (a, b, loose) {
		  return compare(a, b, loose) <= 0
		}

		exports.cmp = cmp;
		function cmp (a, op, b, loose) {
		  switch (op) {
		    case '===':
		      if (typeof a === 'object')
		        a = a.version;
		      if (typeof b === 'object')
		        b = b.version;
		      return a === b

		    case '!==':
		      if (typeof a === 'object')
		        a = a.version;
		      if (typeof b === 'object')
		        b = b.version;
		      return a !== b

		    case '':
		    case '=':
		    case '==':
		      return eq(a, b, loose)

		    case '!=':
		      return neq(a, b, loose)

		    case '>':
		      return gt(a, b, loose)

		    case '>=':
		      return gte(a, b, loose)

		    case '<':
		      return lt(a, b, loose)

		    case '<=':
		      return lte(a, b, loose)

		    default:
		      throw new TypeError('Invalid operator: ' + op)
		  }
		}

		exports.Comparator = Comparator;
		function Comparator (comp, options) {
		  if (!options || typeof options !== 'object') {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }

		  if (comp instanceof Comparator) {
		    if (comp.loose === !!options.loose) {
		      return comp
		    } else {
		      comp = comp.value;
		    }
		  }

		  if (!(this instanceof Comparator)) {
		    return new Comparator(comp, options)
		  }

		  comp = comp.trim().split(/\s+/).join(' ');
		  debug('comparator', comp, options);
		  this.options = options;
		  this.loose = !!options.loose;
		  this.parse(comp);

		  if (this.semver === ANY) {
		    this.value = '';
		  } else {
		    this.value = this.operator + this.semver.version;
		  }

		  debug('comp', this);
		}

		var ANY = {};
		Comparator.prototype.parse = function (comp) {
		  var r = this.options.loose ? safeRe[t.COMPARATORLOOSE] : safeRe[t.COMPARATOR];
		  var m = comp.match(r);

		  if (!m) {
		    throw new TypeError('Invalid comparator: ' + comp)
		  }

		  this.operator = m[1] !== undefined ? m[1] : '';
		  if (this.operator === '=') {
		    this.operator = '';
		  }

		  // if it literally is just '>' or '' then allow anything.
		  if (!m[2]) {
		    this.semver = ANY;
		  } else {
		    this.semver = new SemVer(m[2], this.options.loose);
		  }
		};

		Comparator.prototype.toString = function () {
		  return this.value
		};

		Comparator.prototype.test = function (version) {
		  debug('Comparator.test', version, this.options.loose);

		  if (this.semver === ANY || version === ANY) {
		    return true
		  }

		  if (typeof version === 'string') {
		    try {
		      version = new SemVer(version, this.options);
		    } catch (er) {
		      return false
		    }
		  }

		  return cmp(version, this.operator, this.semver, this.options)
		};

		Comparator.prototype.intersects = function (comp, options) {
		  if (!(comp instanceof Comparator)) {
		    throw new TypeError('a Comparator is required')
		  }

		  if (!options || typeof options !== 'object') {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }

		  var rangeTmp;

		  if (this.operator === '') {
		    if (this.value === '') {
		      return true
		    }
		    rangeTmp = new Range(comp.value, options);
		    return satisfies(this.value, rangeTmp, options)
		  } else if (comp.operator === '') {
		    if (comp.value === '') {
		      return true
		    }
		    rangeTmp = new Range(this.value, options);
		    return satisfies(comp.semver, rangeTmp, options)
		  }

		  var sameDirectionIncreasing =
		    (this.operator === '>=' || this.operator === '>') &&
		    (comp.operator === '>=' || comp.operator === '>');
		  var sameDirectionDecreasing =
		    (this.operator === '<=' || this.operator === '<') &&
		    (comp.operator === '<=' || comp.operator === '<');
		  var sameSemVer = this.semver.version === comp.semver.version;
		  var differentDirectionsInclusive =
		    (this.operator === '>=' || this.operator === '<=') &&
		    (comp.operator === '>=' || comp.operator === '<=');
		  var oppositeDirectionsLessThan =
		    cmp(this.semver, '<', comp.semver, options) &&
		    ((this.operator === '>=' || this.operator === '>') &&
		    (comp.operator === '<=' || comp.operator === '<'));
		  var oppositeDirectionsGreaterThan =
		    cmp(this.semver, '>', comp.semver, options) &&
		    ((this.operator === '<=' || this.operator === '<') &&
		    (comp.operator === '>=' || comp.operator === '>'));

		  return sameDirectionIncreasing || sameDirectionDecreasing ||
		    (sameSemVer && differentDirectionsInclusive) ||
		    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
		};

		exports.Range = Range;
		function Range (range, options) {
		  if (!options || typeof options !== 'object') {
		    options = {
		      loose: !!options,
		      includePrerelease: false
		    };
		  }

		  if (range instanceof Range) {
		    if (range.loose === !!options.loose &&
		        range.includePrerelease === !!options.includePrerelease) {
		      return range
		    } else {
		      return new Range(range.raw, options)
		    }
		  }

		  if (range instanceof Comparator) {
		    return new Range(range.value, options)
		  }

		  if (!(this instanceof Range)) {
		    return new Range(range, options)
		  }

		  this.options = options;
		  this.loose = !!options.loose;
		  this.includePrerelease = !!options.includePrerelease;

		  // First reduce all whitespace as much as possible so we do not have to rely
		  // on potentially slow regexes like \s*. This is then stored and used for
		  // future error messages as well.
		  this.raw = range
		    .trim()
		    .split(/\s+/)
		    .join(' ');

		  // First, split based on boolean or ||
		  this.set = this.raw.split('||').map(function (range) {
		    return this.parseRange(range.trim())
		  }, this).filter(function (c) {
		    // throw out any that are not relevant for whatever reason
		    return c.length
		  });

		  if (!this.set.length) {
		    throw new TypeError('Invalid SemVer Range: ' + this.raw)
		  }

		  this.format();
		}

		Range.prototype.format = function () {
		  this.range = this.set.map(function (comps) {
		    return comps.join(' ').trim()
		  }).join('||').trim();
		  return this.range
		};

		Range.prototype.toString = function () {
		  return this.range
		};

		Range.prototype.parseRange = function (range) {
		  var loose = this.options.loose;
		  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
		  var hr = loose ? safeRe[t.HYPHENRANGELOOSE] : safeRe[t.HYPHENRANGE];
		  range = range.replace(hr, hyphenReplace);
		  debug('hyphen replace', range);
		  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
		  range = range.replace(safeRe[t.COMPARATORTRIM], comparatorTrimReplace);
		  debug('comparator trim', range, safeRe[t.COMPARATORTRIM]);

		  // `~ 1.2.3` => `~1.2.3`
		  range = range.replace(safeRe[t.TILDETRIM], tildeTrimReplace);

		  // `^ 1.2.3` => `^1.2.3`
		  range = range.replace(safeRe[t.CARETTRIM], caretTrimReplace);

		  // normalize spaces
		  range = range.split(/\s+/).join(' ');

		  // At this point, the range is completely trimmed and
		  // ready to be split into comparators.

		  var compRe = loose ? safeRe[t.COMPARATORLOOSE] : safeRe[t.COMPARATOR];
		  var set = range.split(' ').map(function (comp) {
		    return parseComparator(comp, this.options)
		  }, this).join(' ').split(/\s+/);
		  if (this.options.loose) {
		    // in loose mode, throw out any that are not valid comparators
		    set = set.filter(function (comp) {
		      return !!comp.match(compRe)
		    });
		  }
		  set = set.map(function (comp) {
		    return new Comparator(comp, this.options)
		  }, this);

		  return set
		};

		Range.prototype.intersects = function (range, options) {
		  if (!(range instanceof Range)) {
		    throw new TypeError('a Range is required')
		  }

		  return this.set.some(function (thisComparators) {
		    return (
		      isSatisfiable(thisComparators, options) &&
		      range.set.some(function (rangeComparators) {
		        return (
		          isSatisfiable(rangeComparators, options) &&
		          thisComparators.every(function (thisComparator) {
		            return rangeComparators.every(function (rangeComparator) {
		              return thisComparator.intersects(rangeComparator, options)
		            })
		          })
		        )
		      })
		    )
		  })
		};

		// take a set of comparators and determine whether there
		// exists a version which can satisfy it
		function isSatisfiable (comparators, options) {
		  var result = true;
		  var remainingComparators = comparators.slice();
		  var testComparator = remainingComparators.pop();

		  while (result && remainingComparators.length) {
		    result = remainingComparators.every(function (otherComparator) {
		      return testComparator.intersects(otherComparator, options)
		    });

		    testComparator = remainingComparators.pop();
		  }

		  return result
		}

		// Mostly just for testing and legacy API reasons
		exports.toComparators = toComparators;
		function toComparators (range, options) {
		  return new Range(range, options).set.map(function (comp) {
		    return comp.map(function (c) {
		      return c.value
		    }).join(' ').trim().split(' ')
		  })
		}

		// comprised of xranges, tildes, stars, and gtlt's at this point.
		// already replaced the hyphen ranges
		// turn into a set of JUST comparators.
		function parseComparator (comp, options) {
		  debug('comp', comp, options);
		  comp = replaceCarets(comp, options);
		  debug('caret', comp);
		  comp = replaceTildes(comp, options);
		  debug('tildes', comp);
		  comp = replaceXRanges(comp, options);
		  debug('xrange', comp);
		  comp = replaceStars(comp, options);
		  debug('stars', comp);
		  return comp
		}

		function isX (id) {
		  return !id || id.toLowerCase() === 'x' || id === '*'
		}

		// ~, ~> --> * (any, kinda silly)
		// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
		// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
		// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
		// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
		// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
		function replaceTildes (comp, options) {
		  return comp.trim().split(/\s+/).map(function (comp) {
		    return replaceTilde(comp, options)
		  }).join(' ')
		}

		function replaceTilde (comp, options) {
		  var r = options.loose ? safeRe[t.TILDELOOSE] : safeRe[t.TILDE];
		  return comp.replace(r, function (_, M, m, p, pr) {
		    debug('tilde', comp, _, M, m, p, pr);
		    var ret;

		    if (isX(M)) {
		      ret = '';
		    } else if (isX(m)) {
		      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		    } else if (isX(p)) {
		      // ~1.2 == >=1.2.0 <1.3.0
		      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		    } else if (pr) {
		      debug('replaceTilde pr', pr);
		      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
		            ' <' + M + '.' + (+m + 1) + '.0';
		    } else {
		      // ~1.2.3 == >=1.2.3 <1.3.0
		      ret = '>=' + M + '.' + m + '.' + p +
		            ' <' + M + '.' + (+m + 1) + '.0';
		    }

		    debug('tilde return', ret);
		    return ret
		  })
		}

		// ^ --> * (any, kinda silly)
		// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
		// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
		// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
		// ^1.2.3 --> >=1.2.3 <2.0.0
		// ^1.2.0 --> >=1.2.0 <2.0.0
		function replaceCarets (comp, options) {
		  return comp.trim().split(/\s+/).map(function (comp) {
		    return replaceCaret(comp, options)
		  }).join(' ')
		}

		function replaceCaret (comp, options) {
		  debug('caret', comp, options);
		  var r = options.loose ? safeRe[t.CARETLOOSE] : safeRe[t.CARET];
		  return comp.replace(r, function (_, M, m, p, pr) {
		    debug('caret', comp, _, M, m, p, pr);
		    var ret;

		    if (isX(M)) {
		      ret = '';
		    } else if (isX(m)) {
		      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
		    } else if (isX(p)) {
		      if (M === '0') {
		        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
		      } else {
		        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
		      }
		    } else if (pr) {
		      debug('replaceCaret pr', pr);
		      if (M === '0') {
		        if (m === '0') {
		          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
		                ' <' + M + '.' + m + '.' + (+p + 1);
		        } else {
		          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
		                ' <' + M + '.' + (+m + 1) + '.0';
		        }
		      } else {
		        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
		              ' <' + (+M + 1) + '.0.0';
		      }
		    } else {
		      debug('no pr');
		      if (M === '0') {
		        if (m === '0') {
		          ret = '>=' + M + '.' + m + '.' + p +
		                ' <' + M + '.' + m + '.' + (+p + 1);
		        } else {
		          ret = '>=' + M + '.' + m + '.' + p +
		                ' <' + M + '.' + (+m + 1) + '.0';
		        }
		      } else {
		        ret = '>=' + M + '.' + m + '.' + p +
		              ' <' + (+M + 1) + '.0.0';
		      }
		    }

		    debug('caret return', ret);
		    return ret
		  })
		}

		function replaceXRanges (comp, options) {
		  debug('replaceXRanges', comp, options);
		  return comp.split(/\s+/).map(function (comp) {
		    return replaceXRange(comp, options)
		  }).join(' ')
		}

		function replaceXRange (comp, options) {
		  comp = comp.trim();
		  var r = options.loose ? safeRe[t.XRANGELOOSE] : safeRe[t.XRANGE];
		  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
		    debug('xRange', comp, ret, gtlt, M, m, p, pr);
		    var xM = isX(M);
		    var xm = xM || isX(m);
		    var xp = xm || isX(p);
		    var anyX = xp;

		    if (gtlt === '=' && anyX) {
		      gtlt = '';
		    }

		    // if we're including prereleases in the match, then we need
		    // to fix this to -0, the lowest possible prerelease value
		    pr = options.includePrerelease ? '-0' : '';

		    if (xM) {
		      if (gtlt === '>' || gtlt === '<') {
		        // nothing is allowed
		        ret = '<0.0.0-0';
		      } else {
		        // nothing is forbidden
		        ret = '*';
		      }
		    } else if (gtlt && anyX) {
		      // we know patch is an x, because we have any x at all.
		      // replace X with 0
		      if (xm) {
		        m = 0;
		      }
		      p = 0;

		      if (gtlt === '>') {
		        // >1 => >=2.0.0
		        // >1.2 => >=1.3.0
		        // >1.2.3 => >= 1.2.4
		        gtlt = '>=';
		        if (xm) {
		          M = +M + 1;
		          m = 0;
		          p = 0;
		        } else {
		          m = +m + 1;
		          p = 0;
		        }
		      } else if (gtlt === '<=') {
		        // <=0.7.x is actually <0.8.0, since any 0.7.x should
		        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
		        gtlt = '<';
		        if (xm) {
		          M = +M + 1;
		        } else {
		          m = +m + 1;
		        }
		      }

		      ret = gtlt + M + '.' + m + '.' + p + pr;
		    } else if (xm) {
		      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr;
		    } else if (xp) {
		      ret = '>=' + M + '.' + m + '.0' + pr +
		        ' <' + M + '.' + (+m + 1) + '.0' + pr;
		    }

		    debug('xRange return', ret);

		    return ret
		  })
		}

		// Because * is AND-ed with everything else in the comparator,
		// and '' means "any version", just remove the *s entirely.
		function replaceStars (comp, options) {
		  debug('replaceStars', comp, options);
		  // Looseness is ignored here.  star is always as loose as it gets!
		  return comp.trim().replace(safeRe[t.STAR], '')
		}

		// This function is passed to string.replace(re[t.HYPHENRANGE])
		// M, m, patch, prerelease, build
		// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
		// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
		// 1.2 - 3.4 => >=1.2.0 <3.5.0
		function hyphenReplace ($0,
		  from, fM, fm, fp, fpr, fb,
		  to, tM, tm, tp, tpr, tb) {
		  if (isX(fM)) {
		    from = '';
		  } else if (isX(fm)) {
		    from = '>=' + fM + '.0.0';
		  } else if (isX(fp)) {
		    from = '>=' + fM + '.' + fm + '.0';
		  } else {
		    from = '>=' + from;
		  }

		  if (isX(tM)) {
		    to = '';
		  } else if (isX(tm)) {
		    to = '<' + (+tM + 1) + '.0.0';
		  } else if (isX(tp)) {
		    to = '<' + tM + '.' + (+tm + 1) + '.0';
		  } else if (tpr) {
		    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
		  } else {
		    to = '<=' + to;
		  }

		  return (from + ' ' + to).trim()
		}

		// if ANY of the sets match ALL of its comparators, then pass
		Range.prototype.test = function (version) {
		  if (!version) {
		    return false
		  }

		  if (typeof version === 'string') {
		    try {
		      version = new SemVer(version, this.options);
		    } catch (er) {
		      return false
		    }
		  }

		  for (var i = 0; i < this.set.length; i++) {
		    if (testSet(this.set[i], version, this.options)) {
		      return true
		    }
		  }
		  return false
		};

		function testSet (set, version, options) {
		  for (var i = 0; i < set.length; i++) {
		    if (!set[i].test(version)) {
		      return false
		    }
		  }

		  if (version.prerelease.length && !options.includePrerelease) {
		    // Find the set of versions that are allowed to have prereleases
		    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
		    // That should allow `1.2.3-pr.2` to pass.
		    // However, `1.2.4-alpha.notready` should NOT be allowed,
		    // even though it's within the range set by the comparators.
		    for (i = 0; i < set.length; i++) {
		      debug(set[i].semver);
		      if (set[i].semver === ANY) {
		        continue
		      }

		      if (set[i].semver.prerelease.length > 0) {
		        var allowed = set[i].semver;
		        if (allowed.major === version.major &&
		            allowed.minor === version.minor &&
		            allowed.patch === version.patch) {
		          return true
		        }
		      }
		    }

		    // Version has a -pre, but it's not one of the ones we like.
		    return false
		  }

		  return true
		}

		exports.satisfies = satisfies;
		function satisfies (version, range, options) {
		  try {
		    range = new Range(range, options);
		  } catch (er) {
		    return false
		  }
		  return range.test(version)
		}

		exports.maxSatisfying = maxSatisfying;
		function maxSatisfying (versions, range, options) {
		  var max = null;
		  var maxSV = null;
		  try {
		    var rangeObj = new Range(range, options);
		  } catch (er) {
		    return null
		  }
		  versions.forEach(function (v) {
		    if (rangeObj.test(v)) {
		      // satisfies(v, range, options)
		      if (!max || maxSV.compare(v) === -1) {
		        // compare(max, v, true)
		        max = v;
		        maxSV = new SemVer(max, options);
		      }
		    }
		  });
		  return max
		}

		exports.minSatisfying = minSatisfying;
		function minSatisfying (versions, range, options) {
		  var min = null;
		  var minSV = null;
		  try {
		    var rangeObj = new Range(range, options);
		  } catch (er) {
		    return null
		  }
		  versions.forEach(function (v) {
		    if (rangeObj.test(v)) {
		      // satisfies(v, range, options)
		      if (!min || minSV.compare(v) === 1) {
		        // compare(min, v, true)
		        min = v;
		        minSV = new SemVer(min, options);
		      }
		    }
		  });
		  return min
		}

		exports.minVersion = minVersion;
		function minVersion (range, loose) {
		  range = new Range(range, loose);

		  var minver = new SemVer('0.0.0');
		  if (range.test(minver)) {
		    return minver
		  }

		  minver = new SemVer('0.0.0-0');
		  if (range.test(minver)) {
		    return minver
		  }

		  minver = null;
		  for (var i = 0; i < range.set.length; ++i) {
		    var comparators = range.set[i];

		    comparators.forEach(function (comparator) {
		      // Clone to avoid manipulating the comparator's semver object.
		      var compver = new SemVer(comparator.semver.version);
		      switch (comparator.operator) {
		        case '>':
		          if (compver.prerelease.length === 0) {
		            compver.patch++;
		          } else {
		            compver.prerelease.push(0);
		          }
		          compver.raw = compver.format();
		          /* fallthrough */
		        case '':
		        case '>=':
		          if (!minver || gt(minver, compver)) {
		            minver = compver;
		          }
		          break
		        case '<':
		        case '<=':
		          /* Ignore maximum versions */
		          break
		        /* istanbul ignore next */
		        default:
		          throw new Error('Unexpected operation: ' + comparator.operator)
		      }
		    });
		  }

		  if (minver && range.test(minver)) {
		    return minver
		  }

		  return null
		}

		exports.validRange = validRange;
		function validRange (range, options) {
		  try {
		    // Return '*' instead of '' so that truthiness works.
		    // This will throw if it's invalid anyway
		    return new Range(range, options).range || '*'
		  } catch (er) {
		    return null
		  }
		}

		// Determine if version is less than all the versions possible in the range
		exports.ltr = ltr;
		function ltr (version, range, options) {
		  return outside(version, range, '<', options)
		}

		// Determine if version is greater than all the versions possible in the range.
		exports.gtr = gtr;
		function gtr (version, range, options) {
		  return outside(version, range, '>', options)
		}

		exports.outside = outside;
		function outside (version, range, hilo, options) {
		  version = new SemVer(version, options);
		  range = new Range(range, options);

		  var gtfn, ltefn, ltfn, comp, ecomp;
		  switch (hilo) {
		    case '>':
		      gtfn = gt;
		      ltefn = lte;
		      ltfn = lt;
		      comp = '>';
		      ecomp = '>=';
		      break
		    case '<':
		      gtfn = lt;
		      ltefn = gte;
		      ltfn = gt;
		      comp = '<';
		      ecomp = '<=';
		      break
		    default:
		      throw new TypeError('Must provide a hilo val of "<" or ">"')
		  }

		  // If it satisifes the range it is not outside
		  if (satisfies(version, range, options)) {
		    return false
		  }

		  // From now on, variable terms are as if we're in "gtr" mode.
		  // but note that everything is flipped for the "ltr" function.

		  for (var i = 0; i < range.set.length; ++i) {
		    var comparators = range.set[i];

		    var high = null;
		    var low = null;

		    comparators.forEach(function (comparator) {
		      if (comparator.semver === ANY) {
		        comparator = new Comparator('>=0.0.0');
		      }
		      high = high || comparator;
		      low = low || comparator;
		      if (gtfn(comparator.semver, high.semver, options)) {
		        high = comparator;
		      } else if (ltfn(comparator.semver, low.semver, options)) {
		        low = comparator;
		      }
		    });

		    // If the edge version comparator has a operator then our version
		    // isn't outside it
		    if (high.operator === comp || high.operator === ecomp) {
		      return false
		    }

		    // If the lowest version comparator has an operator and our version
		    // is less than it then it isn't higher than the range
		    if ((!low.operator || low.operator === comp) &&
		        ltefn(version, low.semver)) {
		      return false
		    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
		      return false
		    }
		  }
		  return true
		}

		exports.prerelease = prerelease;
		function prerelease (version, options) {
		  var parsed = parse(version, options);
		  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
		}

		exports.intersects = intersects;
		function intersects (r1, r2, options) {
		  r1 = new Range(r1, options);
		  r2 = new Range(r2, options);
		  return r1.intersects(r2)
		}

		exports.coerce = coerce;
		function coerce (version, options) {
		  if (version instanceof SemVer) {
		    return version
		  }

		  if (typeof version === 'number') {
		    version = String(version);
		  }

		  if (typeof version !== 'string') {
		    return null
		  }

		  options = options || {};

		  var match = null;
		  if (!options.rtl) {
		    match = version.match(safeRe[t.COERCE]);
		  } else {
		    // Find the right-most coercible string that does not share
		    // a terminus with a more left-ward coercible string.
		    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
		    //
		    // Walk through the string checking with a /g regexp
		    // Manually set the index so as to pick up overlapping matches.
		    // Stop when we get a match that ends at the string end, since no
		    // coercible string can be more right-ward without the same terminus.
		    var next;
		    while ((next = safeRe[t.COERCERTL].exec(version)) &&
		      (!match || match.index + match[0].length !== version.length)
		    ) {
		      if (!match ||
		          next.index + next[0].length !== match.index + match[0].length) {
		        match = next;
		      }
		      safeRe[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
		    }
		    // leave it in a clean state
		    safeRe[t.COERCERTL].lastIndex = -1;
		  }

		  if (match === null) {
		    return null
		  }

		  return parse(match[2] +
		    '.' + (match[3] || '0') +
		    '.' + (match[4] || '0'), options)
		} 
	} (semver, semver.exports));
	return semver.exports;
}

var manifest = manifest$1.exports;

var hasRequiredManifest;

function requireManifest () {
	if (hasRequiredManifest) return manifest$1.exports;
	hasRequiredManifest = 1;
	(function (module, exports) {
		var __createBinding = (manifest && manifest.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (manifest && manifest.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (manifest && manifest.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __awaiter = (manifest && manifest.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports._readLinuxVersionFile = exports._getOsVersion = exports._findMatch = void 0;
		const semver = __importStar(requireSemver());
		const core_1 = requireCore();
		// needs to be require for core node modules to be mocked
		/* eslint @typescript-eslint/no-require-imports: 0 */
		const os = require$$0__default$1;
		const cp = require$$2$1;
		const fs = require$$0__default;
		function _findMatch(versionSpec, stable, candidates, archFilter) {
		    return __awaiter(this, void 0, void 0, function* () {
		        const platFilter = os.platform();
		        let result;
		        let match;
		        let file;
		        for (const candidate of candidates) {
		            const version = candidate.version;
		            (0, core_1.debug)(`check ${version} satisfies ${versionSpec}`);
		            if (semver.satisfies(version, versionSpec) &&
		                (!stable || candidate.stable === stable)) {
		                file = candidate.files.find(item => {
		                    (0, core_1.debug)(`${item.arch}===${archFilter} && ${item.platform}===${platFilter}`);
		                    let chk = item.arch === archFilter && item.platform === platFilter;
		                    if (chk && item.platform_version) {
		                        const osVersion = module.exports._getOsVersion();
		                        if (osVersion === item.platform_version) {
		                            chk = true;
		                        }
		                        else {
		                            chk = semver.satisfies(osVersion, item.platform_version);
		                        }
		                    }
		                    return chk;
		                });
		                if (file) {
		                    (0, core_1.debug)(`matched ${candidate.version}`);
		                    match = candidate;
		                    break;
		                }
		            }
		        }
		        if (match && file) {
		            // clone since we're mutating the file list to be only the file that matches
		            result = Object.assign({}, match);
		            result.files = [file];
		        }
		        return result;
		    });
		}
		exports._findMatch = _findMatch;
		function _getOsVersion() {
		    // TODO: add windows and other linux, arm variants
		    // right now filtering on version is only an ubuntu and macos scenario for tools we build for hosted (python)
		    const plat = os.platform();
		    let version = '';
		    if (plat === 'darwin') {
		        version = cp.execSync('sw_vers -productVersion').toString();
		    }
		    else if (plat === 'linux') {
		        // lsb_release process not in some containers, readfile
		        // Run cat /etc/lsb-release
		        // DISTRIB_ID=Ubuntu
		        // DISTRIB_RELEASE=18.04
		        // DISTRIB_CODENAME=bionic
		        // DISTRIB_DESCRIPTION="Ubuntu 18.04.4 LTS"
		        const lsbContents = module.exports._readLinuxVersionFile();
		        if (lsbContents) {
		            const lines = lsbContents.split('\n');
		            for (const line of lines) {
		                const parts = line.split('=');
		                if (parts.length === 2 &&
		                    (parts[0].trim() === 'VERSION_ID' ||
		                        parts[0].trim() === 'DISTRIB_RELEASE')) {
		                    version = parts[1].trim().replace(/^"/, '').replace(/"$/, '');
		                    break;
		                }
		            }
		        }
		    }
		    return version;
		}
		exports._getOsVersion = _getOsVersion;
		function _readLinuxVersionFile() {
		    const lsbReleaseFile = '/etc/lsb-release';
		    const osReleaseFile = '/etc/os-release';
		    let contents = '';
		    if (fs.existsSync(lsbReleaseFile)) {
		        contents = fs.readFileSync(lsbReleaseFile).toString();
		    }
		    else if (fs.existsSync(osReleaseFile)) {
		        contents = fs.readFileSync(osReleaseFile).toString();
		    }
		    return contents;
		}
		exports._readLinuxVersionFile = _readLinuxVersionFile;
		
	} (manifest$1, manifest$1.exports));
	return manifest$1.exports;
}

var retryHelper = {};

var hasRequiredRetryHelper;

function requireRetryHelper () {
	if (hasRequiredRetryHelper) return retryHelper;
	hasRequiredRetryHelper = 1;
	var __createBinding = (retryHelper && retryHelper.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (retryHelper && retryHelper.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (retryHelper && retryHelper.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (retryHelper && retryHelper.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(retryHelper, "__esModule", { value: true });
	retryHelper.RetryHelper = void 0;
	const core = __importStar(requireCore());
	/**
	 * Internal class for retries
	 */
	class RetryHelper {
	    constructor(maxAttempts, minSeconds, maxSeconds) {
	        if (maxAttempts < 1) {
	            throw new Error('max attempts should be greater than or equal to 1');
	        }
	        this.maxAttempts = maxAttempts;
	        this.minSeconds = Math.floor(minSeconds);
	        this.maxSeconds = Math.floor(maxSeconds);
	        if (this.minSeconds > this.maxSeconds) {
	            throw new Error('min seconds should be less than or equal to max seconds');
	        }
	    }
	    execute(action, isRetryable) {
	        return __awaiter(this, void 0, void 0, function* () {
	            let attempt = 1;
	            while (attempt < this.maxAttempts) {
	                // Try
	                try {
	                    return yield action();
	                }
	                catch (err) {
	                    if (isRetryable && !isRetryable(err)) {
	                        throw err;
	                    }
	                    core.info(err.message);
	                }
	                // Sleep
	                const seconds = this.getSleepAmount();
	                core.info(`Waiting ${seconds} seconds before trying again`);
	                yield this.sleep(seconds);
	                attempt++;
	            }
	            // Last attempt
	            return yield action();
	        });
	    }
	    getSleepAmount() {
	        return (Math.floor(Math.random() * (this.maxSeconds - this.minSeconds + 1)) +
	            this.minSeconds);
	    }
	    sleep(seconds) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise(resolve => setTimeout(resolve, seconds * 1000));
	        });
	    }
	}
	retryHelper.RetryHelper = RetryHelper;
	
	return retryHelper;
}

var hasRequiredToolCache;

function requireToolCache () {
	if (hasRequiredToolCache) return toolCache;
	hasRequiredToolCache = 1;
	var __createBinding = (toolCache && toolCache.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (toolCache && toolCache.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (toolCache && toolCache.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (toolCache && toolCache.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(toolCache, "__esModule", { value: true });
	toolCache.evaluateVersions = toolCache.isExplicitVersion = toolCache.findFromManifest = toolCache.getManifestFromRepo = toolCache.findAllVersions = toolCache.find = toolCache.cacheFile = toolCache.cacheDir = toolCache.extractZip = toolCache.extractXar = toolCache.extractTar = toolCache.extract7z = toolCache.downloadTool = toolCache.HTTPError = void 0;
	const core = __importStar(requireCore());
	const io = __importStar(requireIo());
	const crypto = __importStar(require$$0$2);
	const fs = __importStar(require$$0__default);
	const mm = __importStar(requireManifest());
	const os = __importStar(require$$0__default$1);
	const path = __importStar(require$$1__default);
	const httpm = __importStar(requireLib());
	const semver = __importStar(requireSemver());
	const stream = __importStar(require$$0$3);
	const util = __importStar(require$$0__default$2);
	const assert_1 = require$$0$4;
	const exec_1 = requireExec();
	const retry_helper_1 = requireRetryHelper();
	class HTTPError extends Error {
	    constructor(httpStatusCode) {
	        super(`Unexpected HTTP response: ${httpStatusCode}`);
	        this.httpStatusCode = httpStatusCode;
	        Object.setPrototypeOf(this, new.target.prototype);
	    }
	}
	toolCache.HTTPError = HTTPError;
	const IS_WINDOWS = process.platform === 'win32';
	const IS_MAC = process.platform === 'darwin';
	const userAgent = 'actions/tool-cache';
	/**
	 * Download a tool from an url and stream it into a file
	 *
	 * @param url       url of tool to download
	 * @param dest      path to download tool
	 * @param auth      authorization header
	 * @param headers   other headers
	 * @returns         path to downloaded tool
	 */
	function downloadTool(url, dest, auth, headers) {
	    return __awaiter(this, void 0, void 0, function* () {
	        dest = dest || path.join(_getTempDirectory(), crypto.randomUUID());
	        yield io.mkdirP(path.dirname(dest));
	        core.debug(`Downloading ${url}`);
	        core.debug(`Destination ${dest}`);
	        const maxAttempts = 3;
	        const minSeconds = _getGlobal('TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS', 10);
	        const maxSeconds = _getGlobal('TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS', 20);
	        const retryHelper = new retry_helper_1.RetryHelper(maxAttempts, minSeconds, maxSeconds);
	        return yield retryHelper.execute(() => __awaiter(this, void 0, void 0, function* () {
	            return yield downloadToolAttempt(url, dest || '', auth, headers);
	        }), (err) => {
	            if (err instanceof HTTPError && err.httpStatusCode) {
	                // Don't retry anything less than 500, except 408 Request Timeout and 429 Too Many Requests
	                if (err.httpStatusCode < 500 &&
	                    err.httpStatusCode !== 408 &&
	                    err.httpStatusCode !== 429) {
	                    return false;
	                }
	            }
	            // Otherwise retry
	            return true;
	        });
	    });
	}
	toolCache.downloadTool = downloadTool;
	function downloadToolAttempt(url, dest, auth, headers) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (fs.existsSync(dest)) {
	            throw new Error(`Destination file path ${dest} already exists`);
	        }
	        // Get the response headers
	        const http = new httpm.HttpClient(userAgent, [], {
	            allowRetries: false
	        });
	        if (auth) {
	            core.debug('set auth');
	            if (headers === undefined) {
	                headers = {};
	            }
	            headers.authorization = auth;
	        }
	        const response = yield http.get(url, headers);
	        if (response.message.statusCode !== 200) {
	            const err = new HTTPError(response.message.statusCode);
	            core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
	            throw err;
	        }
	        // Download the response body
	        const pipeline = util.promisify(stream.pipeline);
	        const responseMessageFactory = _getGlobal('TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY', () => response.message);
	        const readStream = responseMessageFactory();
	        let succeeded = false;
	        try {
	            yield pipeline(readStream, fs.createWriteStream(dest));
	            core.debug('download complete');
	            succeeded = true;
	            return dest;
	        }
	        finally {
	            // Error, delete dest before retry
	            if (!succeeded) {
	                core.debug('download failed');
	                try {
	                    yield io.rmRF(dest);
	                }
	                catch (err) {
	                    core.debug(`Failed to delete '${dest}'. ${err.message}`);
	                }
	            }
	        }
	    });
	}
	/**
	 * Extract a .7z file
	 *
	 * @param file     path to the .7z file
	 * @param dest     destination directory. Optional.
	 * @param _7zPath  path to 7zr.exe. Optional, for long path support. Most .7z archives do not have this
	 * problem. If your .7z archive contains very long paths, you can pass the path to 7zr.exe which will
	 * gracefully handle long paths. By default 7zdec.exe is used because it is a very small program and is
	 * bundled with the tool lib. However it does not support long paths. 7zr.exe is the reduced command line
	 * interface, it is smaller than the full command line interface, and it does support long paths. At the
	 * time of this writing, it is freely available from the LZMA SDK that is available on the 7zip website.
	 * Be sure to check the current license agreement. If 7zr.exe is bundled with your action, then the path
	 * to 7zr.exe can be pass to this function.
	 * @returns        path to the destination directory
	 */
	function extract7z(file, dest, _7zPath) {
	    return __awaiter(this, void 0, void 0, function* () {
	        (0, assert_1.ok)(IS_WINDOWS, 'extract7z() not supported on current OS');
	        (0, assert_1.ok)(file, 'parameter "file" is required');
	        dest = yield _createExtractFolder(dest);
	        const originalCwd = process.cwd();
	        process.chdir(dest);
	        if (_7zPath) {
	            try {
	                const logLevel = core.isDebug() ? '-bb1' : '-bb0';
	                const args = [
	                    'x',
	                    logLevel,
	                    '-bd',
	                    '-sccUTF-8',
	                    file
	                ];
	                const options = {
	                    silent: true
	                };
	                yield (0, exec_1.exec)(`"${_7zPath}"`, args, options);
	            }
	            finally {
	                process.chdir(originalCwd);
	            }
	        }
	        else {
	            const escapedScript = path
	                .join(__dirname, '..', 'scripts', 'Invoke-7zdec.ps1')
	                .replace(/'/g, "''")
	                .replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
	            const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, '');
	            const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
	            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
	            const args = [
	                '-NoLogo',
	                '-Sta',
	                '-NoProfile',
	                '-NonInteractive',
	                '-ExecutionPolicy',
	                'Unrestricted',
	                '-Command',
	                command
	            ];
	            const options = {
	                silent: true
	            };
	            try {
	                const powershellPath = yield io.which('powershell', true);
	                yield (0, exec_1.exec)(`"${powershellPath}"`, args, options);
	            }
	            finally {
	                process.chdir(originalCwd);
	            }
	        }
	        return dest;
	    });
	}
	toolCache.extract7z = extract7z;
	/**
	 * Extract a compressed tar archive
	 *
	 * @param file     path to the tar
	 * @param dest     destination directory. Optional.
	 * @param flags    flags for the tar command to use for extraction. Defaults to 'xz' (extracting gzipped tars). Optional.
	 * @returns        path to the destination directory
	 */
	function extractTar(file, dest, flags = 'xz') {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!file) {
	            throw new Error("parameter 'file' is required");
	        }
	        // Create dest
	        dest = yield _createExtractFolder(dest);
	        // Determine whether GNU tar
	        core.debug('Checking tar --version');
	        let versionOutput = '';
	        yield (0, exec_1.exec)('tar --version', [], {
	            ignoreReturnCode: true,
	            silent: true,
	            listeners: {
	                stdout: (data) => (versionOutput += data.toString()),
	                stderr: (data) => (versionOutput += data.toString())
	            }
	        });
	        core.debug(versionOutput.trim());
	        const isGnuTar = versionOutput.toUpperCase().includes('GNU TAR');
	        // Initialize args
	        let args;
	        if (flags instanceof Array) {
	            args = flags;
	        }
	        else {
	            args = [flags];
	        }
	        if (core.isDebug() && !flags.includes('v')) {
	            args.push('-v');
	        }
	        let destArg = dest;
	        let fileArg = file;
	        if (IS_WINDOWS && isGnuTar) {
	            args.push('--force-local');
	            destArg = dest.replace(/\\/g, '/');
	            // Technically only the dest needs to have `/` but for aesthetic consistency
	            // convert slashes in the file arg too.
	            fileArg = file.replace(/\\/g, '/');
	        }
	        if (isGnuTar) {
	            // Suppress warnings when using GNU tar to extract archives created by BSD tar
	            args.push('--warning=no-unknown-keyword');
	            args.push('--overwrite');
	        }
	        args.push('-C', destArg, '-f', fileArg);
	        yield (0, exec_1.exec)(`tar`, args);
	        return dest;
	    });
	}
	toolCache.extractTar = extractTar;
	/**
	 * Extract a xar compatible archive
	 *
	 * @param file     path to the archive
	 * @param dest     destination directory. Optional.
	 * @param flags    flags for the xar. Optional.
	 * @returns        path to the destination directory
	 */
	function extractXar(file, dest, flags = []) {
	    return __awaiter(this, void 0, void 0, function* () {
	        (0, assert_1.ok)(IS_MAC, 'extractXar() not supported on current OS');
	        (0, assert_1.ok)(file, 'parameter "file" is required');
	        dest = yield _createExtractFolder(dest);
	        let args;
	        if (flags instanceof Array) {
	            args = flags;
	        }
	        else {
	            args = [flags];
	        }
	        args.push('-x', '-C', dest, '-f', file);
	        if (core.isDebug()) {
	            args.push('-v');
	        }
	        const xarPath = yield io.which('xar', true);
	        yield (0, exec_1.exec)(`"${xarPath}"`, _unique(args));
	        return dest;
	    });
	}
	toolCache.extractXar = extractXar;
	/**
	 * Extract a zip
	 *
	 * @param file     path to the zip
	 * @param dest     destination directory. Optional.
	 * @returns        path to the destination directory
	 */
	function extractZip(file, dest) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!file) {
	            throw new Error("parameter 'file' is required");
	        }
	        dest = yield _createExtractFolder(dest);
	        if (IS_WINDOWS) {
	            yield extractZipWin(file, dest);
	        }
	        else {
	            yield extractZipNix(file, dest);
	        }
	        return dest;
	    });
	}
	toolCache.extractZip = extractZip;
	function extractZipWin(file, dest) {
	    return __awaiter(this, void 0, void 0, function* () {
	        // build the powershell command
	        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
	        const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
	        const pwshPath = yield io.which('pwsh', false);
	        //To match the file overwrite behavior on nix systems, we use the overwrite = true flag for ExtractToDirectory
	        //and the -Force flag for Expand-Archive as a fallback
	        if (pwshPath) {
	            //attempt to use pwsh with ExtractToDirectory, if this fails attempt Expand-Archive
	            const pwshCommand = [
	                `$ErrorActionPreference = 'Stop' ;`,
	                `try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ;`,
	                `try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`,
	                `catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force } else { throw $_ } } ;`
	            ].join(' ');
	            const args = [
	                '-NoLogo',
	                '-NoProfile',
	                '-NonInteractive',
	                '-ExecutionPolicy',
	                'Unrestricted',
	                '-Command',
	                pwshCommand
	            ];
	            core.debug(`Using pwsh at path: ${pwshPath}`);
	            yield (0, exec_1.exec)(`"${pwshPath}"`, args);
	        }
	        else {
	            const powershellCommand = [
	                `$ErrorActionPreference = 'Stop' ;`,
	                `try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ;`,
	                `if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force }`,
	                `else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`
	            ].join(' ');
	            const args = [
	                '-NoLogo',
	                '-Sta',
	                '-NoProfile',
	                '-NonInteractive',
	                '-ExecutionPolicy',
	                'Unrestricted',
	                '-Command',
	                powershellCommand
	            ];
	            const powershellPath = yield io.which('powershell', true);
	            core.debug(`Using powershell at path: ${powershellPath}`);
	            yield (0, exec_1.exec)(`"${powershellPath}"`, args);
	        }
	    });
	}
	function extractZipNix(file, dest) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const unzipPath = yield io.which('unzip', true);
	        const args = [file];
	        if (!core.isDebug()) {
	            args.unshift('-q');
	        }
	        args.unshift('-o'); //overwrite with -o, otherwise a prompt is shown which freezes the run
	        yield (0, exec_1.exec)(`"${unzipPath}"`, args, { cwd: dest });
	    });
	}
	/**
	 * Caches a directory and installs it into the tool cacheDir
	 *
	 * @param sourceDir    the directory to cache into tools
	 * @param tool          tool name
	 * @param version       version of the tool.  semver format
	 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
	 */
	function cacheDir(sourceDir, tool, version, arch) {
	    return __awaiter(this, void 0, void 0, function* () {
	        version = semver.clean(version) || version;
	        arch = arch || os.arch();
	        core.debug(`Caching tool ${tool} ${version} ${arch}`);
	        core.debug(`source dir: ${sourceDir}`);
	        if (!fs.statSync(sourceDir).isDirectory()) {
	            throw new Error('sourceDir is not a directory');
	        }
	        // Create the tool dir
	        const destPath = yield _createToolPath(tool, version, arch);
	        // copy each child item. do not move. move can fail on Windows
	        // due to anti-virus software having an open handle on a file.
	        for (const itemName of fs.readdirSync(sourceDir)) {
	            const s = path.join(sourceDir, itemName);
	            yield io.cp(s, destPath, { recursive: true });
	        }
	        // write .complete
	        _completeToolPath(tool, version, arch);
	        return destPath;
	    });
	}
	toolCache.cacheDir = cacheDir;
	/**
	 * Caches a downloaded file (GUID) and installs it
	 * into the tool cache with a given targetName
	 *
	 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
	 * @param targetFile    the name of the file name in the tools directory
	 * @param tool          tool name
	 * @param version       version of the tool.  semver format
	 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
	 */
	function cacheFile(sourceFile, targetFile, tool, version, arch) {
	    return __awaiter(this, void 0, void 0, function* () {
	        version = semver.clean(version) || version;
	        arch = arch || os.arch();
	        core.debug(`Caching tool ${tool} ${version} ${arch}`);
	        core.debug(`source file: ${sourceFile}`);
	        if (!fs.statSync(sourceFile).isFile()) {
	            throw new Error('sourceFile is not a file');
	        }
	        // create the tool dir
	        const destFolder = yield _createToolPath(tool, version, arch);
	        // copy instead of move. move can fail on Windows due to
	        // anti-virus software having an open handle on a file.
	        const destPath = path.join(destFolder, targetFile);
	        core.debug(`destination file ${destPath}`);
	        yield io.cp(sourceFile, destPath);
	        // write .complete
	        _completeToolPath(tool, version, arch);
	        return destFolder;
	    });
	}
	toolCache.cacheFile = cacheFile;
	/**
	 * Finds the path to a tool version in the local installed tool cache
	 *
	 * @param toolName      name of the tool
	 * @param versionSpec   version of the tool
	 * @param arch          optional arch.  defaults to arch of computer
	 */
	function find(toolName, versionSpec, arch) {
	    if (!toolName) {
	        throw new Error('toolName parameter is required');
	    }
	    if (!versionSpec) {
	        throw new Error('versionSpec parameter is required');
	    }
	    arch = arch || os.arch();
	    // attempt to resolve an explicit version
	    if (!isExplicitVersion(versionSpec)) {
	        const localVersions = findAllVersions(toolName, arch);
	        const match = evaluateVersions(localVersions, versionSpec);
	        versionSpec = match;
	    }
	    // check for the explicit version in the cache
	    let toolPath = '';
	    if (versionSpec) {
	        versionSpec = semver.clean(versionSpec) || '';
	        const cachePath = path.join(_getCacheDirectory(), toolName, versionSpec, arch);
	        core.debug(`checking cache: ${cachePath}`);
	        if (fs.existsSync(cachePath) && fs.existsSync(`${cachePath}.complete`)) {
	            core.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
	            toolPath = cachePath;
	        }
	        else {
	            core.debug('not found');
	        }
	    }
	    return toolPath;
	}
	toolCache.find = find;
	/**
	 * Finds the paths to all versions of a tool that are installed in the local tool cache
	 *
	 * @param toolName  name of the tool
	 * @param arch      optional arch.  defaults to arch of computer
	 */
	function findAllVersions(toolName, arch) {
	    const versions = [];
	    arch = arch || os.arch();
	    const toolPath = path.join(_getCacheDirectory(), toolName);
	    if (fs.existsSync(toolPath)) {
	        const children = fs.readdirSync(toolPath);
	        for (const child of children) {
	            if (isExplicitVersion(child)) {
	                const fullPath = path.join(toolPath, child, arch || '');
	                if (fs.existsSync(fullPath) && fs.existsSync(`${fullPath}.complete`)) {
	                    versions.push(child);
	                }
	            }
	        }
	    }
	    return versions;
	}
	toolCache.findAllVersions = findAllVersions;
	function getManifestFromRepo(owner, repo, auth, branch = 'master') {
	    return __awaiter(this, void 0, void 0, function* () {
	        let releases = [];
	        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
	        const http = new httpm.HttpClient('tool-cache');
	        const headers = {};
	        if (auth) {
	            core.debug('set auth');
	            headers.authorization = auth;
	        }
	        const response = yield http.getJson(treeUrl, headers);
	        if (!response.result) {
	            return releases;
	        }
	        let manifestUrl = '';
	        for (const item of response.result.tree) {
	            if (item.path === 'versions-manifest.json') {
	                manifestUrl = item.url;
	                break;
	            }
	        }
	        headers['accept'] = 'application/vnd.github.VERSION.raw';
	        let versionsRaw = yield (yield http.get(manifestUrl, headers)).readBody();
	        if (versionsRaw) {
	            // shouldn't be needed but protects against invalid json saved with BOM
	            versionsRaw = versionsRaw.replace(/^\uFEFF/, '');
	            try {
	                releases = JSON.parse(versionsRaw);
	            }
	            catch (_a) {
	                core.debug('Invalid json');
	            }
	        }
	        return releases;
	    });
	}
	toolCache.getManifestFromRepo = getManifestFromRepo;
	function findFromManifest(versionSpec, stable, manifest, archFilter = os.arch()) {
	    return __awaiter(this, void 0, void 0, function* () {
	        // wrap the internal impl
	        const match = yield mm._findMatch(versionSpec, stable, manifest, archFilter);
	        return match;
	    });
	}
	toolCache.findFromManifest = findFromManifest;
	function _createExtractFolder(dest) {
	    return __awaiter(this, void 0, void 0, function* () {
	        if (!dest) {
	            // create a temp dir
	            dest = path.join(_getTempDirectory(), crypto.randomUUID());
	        }
	        yield io.mkdirP(dest);
	        return dest;
	    });
	}
	function _createToolPath(tool, version, arch) {
	    return __awaiter(this, void 0, void 0, function* () {
	        const folderPath = path.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || '');
	        core.debug(`destination ${folderPath}`);
	        const markerPath = `${folderPath}.complete`;
	        yield io.rmRF(folderPath);
	        yield io.rmRF(markerPath);
	        yield io.mkdirP(folderPath);
	        return folderPath;
	    });
	}
	function _completeToolPath(tool, version, arch) {
	    const folderPath = path.join(_getCacheDirectory(), tool, semver.clean(version) || version, arch || '');
	    const markerPath = `${folderPath}.complete`;
	    fs.writeFileSync(markerPath, '');
	    core.debug('finished caching tool');
	}
	/**
	 * Check if version string is explicit
	 *
	 * @param versionSpec      version string to check
	 */
	function isExplicitVersion(versionSpec) {
	    const c = semver.clean(versionSpec) || '';
	    core.debug(`isExplicit: ${c}`);
	    const valid = semver.valid(c) != null;
	    core.debug(`explicit? ${valid}`);
	    return valid;
	}
	toolCache.isExplicitVersion = isExplicitVersion;
	/**
	 * Get the highest satisfiying semantic version in `versions` which satisfies `versionSpec`
	 *
	 * @param versions        array of versions to evaluate
	 * @param versionSpec     semantic version spec to satisfy
	 */
	function evaluateVersions(versions, versionSpec) {
	    let version = '';
	    core.debug(`evaluating ${versions.length} versions`);
	    versions = versions.sort((a, b) => {
	        if (semver.gt(a, b)) {
	            return 1;
	        }
	        return -1;
	    });
	    for (let i = versions.length - 1; i >= 0; i--) {
	        const potential = versions[i];
	        const satisfied = semver.satisfies(potential, versionSpec);
	        if (satisfied) {
	            version = potential;
	            break;
	        }
	    }
	    if (version) {
	        core.debug(`matched: ${version}`);
	    }
	    else {
	        core.debug('match not found');
	    }
	    return version;
	}
	toolCache.evaluateVersions = evaluateVersions;
	/**
	 * Gets RUNNER_TOOL_CACHE
	 */
	function _getCacheDirectory() {
	    const cacheDirectory = process.env['RUNNER_TOOL_CACHE'] || '';
	    (0, assert_1.ok)(cacheDirectory, 'Expected RUNNER_TOOL_CACHE to be defined');
	    return cacheDirectory;
	}
	/**
	 * Gets RUNNER_TEMP
	 */
	function _getTempDirectory() {
	    const tempDirectory = process.env['RUNNER_TEMP'] || '';
	    (0, assert_1.ok)(tempDirectory, 'Expected RUNNER_TEMP to be defined');
	    return tempDirectory;
	}
	/**
	 * Gets a global variable
	 */
	function _getGlobal(key, defaultValue) {
	    /* eslint-disable @typescript-eslint/no-explicit-any */
	    const value = commonjsGlobal[key];
	    /* eslint-enable @typescript-eslint/no-explicit-any */
	    return value !== undefined ? value : defaultValue;
	}
	/**
	 * Returns an array of unique values.
	 * @param values Values to make unique.
	 */
	function _unique(values) {
	    return Array.from(new Set(values));
	}
	
	return toolCache;
}

var toolCacheExports = requireToolCache();

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const version = coreExports.getInput('version', { required: false });
    const token = coreExports.getInput('token', { required: false });

    // Determine OS and architecture
    const platform = require$$0.platform();
    const arch = require$$0.arch();

    // Map platform and arch to GitHub release asset names
    const platformMap = {
      darwin: 'darwin',
      linux: 'linux',
      win32: 'windows'
    };

    const archMap = {
      x64: 'amd64',
      arm64: 'arm64'
    };

    const platformName = platformMap[platform];
    const archName = archMap[arch];

    if (!platformName || !archName) {
      throw new Error(
        `Unsupported platform (${platform}) or architecture (${arch})`
      )
    }

    // Construct the asset name
    const assetName = `octometrics_${platformName}_${archName}${platform === 'win32' ? '.exe' : ''}`;

    // Get the latest release if no version is specified
    const octokit = githubExports.getOctokit(token || process.env.GITHUB_TOKEN);
    const release = version
      ? await octokit.rest.repos.getReleaseByTag({
          owner: 'kalverra',
          repo: 'octometrics',
          tag: version
        })
      : await octokit.rest.repos.getLatestRelease({
          owner: 'kalverra',
          repo: 'octometrics'
        });

    // Find the matching asset
    const asset = release.data.assets.find((a) => a.name === assetName);
    if (!asset) {
      throw new Error(
        `Could not find asset ${assetName} in release ${release.data.tag_name}`
      )
    }

    // Download the asset
    coreExports.info(
      `Downloading ${assetName} from release ${release.data.tag_name}...`
    );
    const downloadPath = await toolCacheExports.downloadTool(asset.browser_download_url);

    // Make it executable (except on Windows)
    if (platform !== 'win32') {
      require$$0$1.chmodSync(downloadPath, '755');
    }

    // Add to PATH
    const toolPath = require$$1.dirname(downloadPath);
    coreExports.addPath(toolPath);

    coreExports.info(
      `Successfully installed octometrics ${release.data.tag_name} for ${platformName}/${archName} at ${downloadPath}`
    );
    coreExports.setOutput('version', release.data.tag_name);
    coreExports.setOutput('path', downloadPath);

    coreExports.info('Running octometrics monitor...');
    // Run the octometrics binary
    const child = spawn(`${downloadPath} monitor -o octometrics.monitor.json`);
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      console.log(`Process exited with code ${code}`);
    });
  } catch (error) {
    // Fail the workflow step if an error occurs
    coreExports.setFailed(error.message);
  }
}

run();

export { run };
