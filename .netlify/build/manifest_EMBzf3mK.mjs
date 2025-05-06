import { N as NOOP_MIDDLEWARE_HEADER, d as decodeKey } from './chunks/astro/server_Djeu0AXp.mjs';

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	Object.defineProperty(dist, "__esModule", { value: true });
	dist.parse = parse;
	dist.serialize = serialize;
	/**
	 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
	 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
	 * which has been replaced by the token definition in RFC 7230 appendix B.
	 *
	 * cookie-name       = token
	 * token             = 1*tchar
	 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
	 *                     "*" / "+" / "-" / "." / "^" / "_" /
	 *                     "`" / "|" / "~" / DIGIT / ALPHA
	 *
	 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
	 * Allow same range as cookie value, except `=`, which delimits end of name.
	 */
	const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
	/**
	 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
	 *
	 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
	 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
	 *                     ; US-ASCII characters excluding CTLs,
	 *                     ; whitespace DQUOTE, comma, semicolon,
	 *                     ; and backslash
	 *
	 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
	 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
	 */
	const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
	/**
	 * RegExp to match domain-value in RFC 6265 sec 4.1.1
	 *
	 * domain-value      = <subdomain>
	 *                     ; defined in [RFC1034], Section 3.5, as
	 *                     ; enhanced by [RFC1123], Section 2.1
	 * <subdomain>       = <label> | <subdomain> "." <label>
	 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
	 *                     Labels must be 63 characters or less.
	 *                     'let-dig' not 'letter' in the first char, per RFC1123
	 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
	 * <let-dig-hyp>     = <let-dig> | "-"
	 * <let-dig>         = <letter> | <digit>
	 * <letter>          = any one of the 52 alphabetic characters A through Z in
	 *                     upper case and a through z in lower case
	 * <digit>           = any one of the ten digits 0 through 9
	 *
	 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
	 *
	 * > (Note that a leading %x2E ("."), if present, is ignored even though that
	 * character is not permitted, but a trailing %x2E ("."), if present, will
	 * cause the user agent to ignore the attribute.)
	 */
	const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	/**
	 * RegExp to match path-value in RFC 6265 sec 4.1.1
	 *
	 * path-value        = <any CHAR except CTLs or ";">
	 * CHAR              = %x01-7F
	 *                     ; defined in RFC 5234 appendix B.1
	 */
	const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
	const __toString = Object.prototype.toString;
	const NullObject = /* @__PURE__ */ (() => {
	    const C = function () { };
	    C.prototype = Object.create(null);
	    return C;
	})();
	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 */
	function parse(str, options) {
	    const obj = new NullObject();
	    const len = str.length;
	    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
	    if (len < 2)
	        return obj;
	    const dec = options?.decode || decode;
	    let index = 0;
	    do {
	        const eqIdx = str.indexOf("=", index);
	        if (eqIdx === -1)
	            break; // No more cookie pairs.
	        const colonIdx = str.indexOf(";", index);
	        const endIdx = colonIdx === -1 ? len : colonIdx;
	        if (eqIdx > endIdx) {
	            // backtrack on prior semicolon
	            index = str.lastIndexOf(";", eqIdx - 1) + 1;
	            continue;
	        }
	        const keyStartIdx = startIndex(str, index, eqIdx);
	        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
	        const key = str.slice(keyStartIdx, keyEndIdx);
	        // only assign once
	        if (obj[key] === undefined) {
	            let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
	            let valEndIdx = endIndex(str, endIdx, valStartIdx);
	            const value = dec(str.slice(valStartIdx, valEndIdx));
	            obj[key] = value;
	        }
	        index = endIdx + 1;
	    } while (index < len);
	    return obj;
	}
	function startIndex(str, index, max) {
	    do {
	        const code = str.charCodeAt(index);
	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
	            return index;
	    } while (++index < max);
	    return max;
	}
	function endIndex(str, index, min) {
	    while (index > min) {
	        const code = str.charCodeAt(--index);
	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
	            return index + 1;
	    }
	    return min;
	}
	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize a name value pair into a cookie string suitable for
	 * http headers. An optional options object specifies cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 */
	function serialize(name, val, options) {
	    const enc = options?.encode || encodeURIComponent;
	    if (!cookieNameRegExp.test(name)) {
	        throw new TypeError(`argument name is invalid: ${name}`);
	    }
	    const value = enc(val);
	    if (!cookieValueRegExp.test(value)) {
	        throw new TypeError(`argument val is invalid: ${val}`);
	    }
	    let str = name + "=" + value;
	    if (!options)
	        return str;
	    if (options.maxAge !== undefined) {
	        if (!Number.isInteger(options.maxAge)) {
	            throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
	        }
	        str += "; Max-Age=" + options.maxAge;
	    }
	    if (options.domain) {
	        if (!domainValueRegExp.test(options.domain)) {
	            throw new TypeError(`option domain is invalid: ${options.domain}`);
	        }
	        str += "; Domain=" + options.domain;
	    }
	    if (options.path) {
	        if (!pathValueRegExp.test(options.path)) {
	            throw new TypeError(`option path is invalid: ${options.path}`);
	        }
	        str += "; Path=" + options.path;
	    }
	    if (options.expires) {
	        if (!isDate(options.expires) ||
	            !Number.isFinite(options.expires.valueOf())) {
	            throw new TypeError(`option expires is invalid: ${options.expires}`);
	        }
	        str += "; Expires=" + options.expires.toUTCString();
	    }
	    if (options.httpOnly) {
	        str += "; HttpOnly";
	    }
	    if (options.secure) {
	        str += "; Secure";
	    }
	    if (options.partitioned) {
	        str += "; Partitioned";
	    }
	    if (options.priority) {
	        const priority = typeof options.priority === "string"
	            ? options.priority.toLowerCase()
	            : undefined;
	        switch (priority) {
	            case "low":
	                str += "; Priority=Low";
	                break;
	            case "medium":
	                str += "; Priority=Medium";
	                break;
	            case "high":
	                str += "; Priority=High";
	                break;
	            default:
	                throw new TypeError(`option priority is invalid: ${options.priority}`);
	        }
	    }
	    if (options.sameSite) {
	        const sameSite = typeof options.sameSite === "string"
	            ? options.sameSite.toLowerCase()
	            : options.sameSite;
	        switch (sameSite) {
	            case true:
	            case "strict":
	                str += "; SameSite=Strict";
	                break;
	            case "lax":
	                str += "; SameSite=Lax";
	                break;
	            case "none":
	                str += "; SameSite=None";
	                break;
	            default:
	                throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
	        }
	    }
	    return str;
	}
	/**
	 * URL-decode string value. Optimized to skip native call when no %.
	 */
	function decode(str) {
	    if (str.indexOf("%") === -1)
	        return str;
	    try {
	        return decodeURIComponent(str);
	    }
	    catch (e) {
	        return str;
	    }
	}
	/**
	 * Determine if value is a Date.
	 */
	function isDate(val) {
	    return __toString.call(val) === "[object Date]";
	}
	
	return dist;
}

requireDist();

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

/* es-module-lexer 1.7.0 */
var ImportType;!function(A){A[A.Static=1]="Static",A[A.Dynamic=2]="Dynamic",A[A.ImportMeta=3]="ImportMeta",A[A.StaticSourcePhase=4]="StaticSourcePhase",A[A.DynamicSourcePhase=5]="DynamicSourcePhase",A[A.StaticDeferPhase=6]="StaticDeferPhase",A[A.DynamicDeferPhase=7]="DynamicDeferPhase";}(ImportType||(ImportType={}));1===new Uint8Array(new Uint16Array([1]).buffer)[0];const E=()=>{return A="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GzYCHAtBAEEAKAKwCkECajYCsAoCQAJAAkACQEEAECkiAUHhAEYNACABQfcARg0BQQAoArAKIQEMAgtBACgCsAoiAUECakHACEEKEC8NAUEGIQIMAgtBACgCsAoiAS8BAkHpAEcNACABLwEEQfQARw0AQQQhAiABLwEGQegARg0BC0EAIAFBfmo2ArAKDwtBACABIAJBAXRqNgKwCgJAQQEQKUH7AEYNAEEAIAE2ArAKDwtBACgCsAoiACECA0BBACACQQJqNgKwCgJAAkACQEEBECkiAkEiRg0AIAJBJ0cNAUEnEBpBAEEAKAKwCkECajYCsApBARApIQIMAgtBIhAaQQBBACgCsApBAmo2ArAKQQEQKSECDAELIAIQLCECCwJAIAJBOkYNAEEAIAE2ArAKDwtBAEEAKAKwCkECajYCsAoCQEEBECkiAkEiRg0AIAJBJ0YNAEEAIAE2ArAKDwsgAhAaQQBBACgCsApBAmo2ArAKAkACQEEBECkiAkEsRg0AIAJB/QBGDQFBACABNgKwCg8LQQBBACgCsApBAmo2ArAKQQEQKUH9AEYNAEEAKAKwCiECDAELC0EAKALwCSIBIAA2AhAgAUEAKAKwCkECajYCDAttAQJ/AkACQANAAkAgAEH//wNxIgFBd2oiAkEXSw0AQQEgAnRBn4CABHENAgsgAUGgAUYNASAAIQIgARAoDQJBACECQQBBACgCsAoiAEECajYCsAogAC8BAiIADQAMAgsLIAAhAgsgAkH//wNxC6sBAQR/AkACQEEAKAKwCiICLwEAIgNB4QBGDQAgASEEIAAhBQwBC0EAIAJBBGo2ArAKQQEQKSECQQAoArAKIQUCQAJAIAJBIkYNACACQSdGDQAgAhAsGkEAKAKwCiEEDAELIAIQGkEAQQAoArAKQQJqIgQ2ArAKC0EBECkhA0EAKAKwCiECCwJAIAIgBUYNACAFIARBACAAIAAgAUYiAhtBACABIAIbEAILIAMLcgEEf0EAKAKwCiEAQQAoArQKIQECQAJAA0AgAEECaiECIAAgAU8NAQJAAkAgAi8BACIDQaR/ag4CAQQACyACIQAgA0F2ag4EAgEBAgELIABBBGohAAwACwtBACACNgKwChAlQQAPC0EAIAI2ArAKQd0AC0kBA39BACEDAkAgAkUNAAJAA0AgAC0AACIEIAEtAAAiBUcNASABQQFqIQEgAEEBaiEAIAJBf2oiAg0ADAILCyAEIAVrIQMLIAMLC+wBAgBBgAgLzgEAAHgAcABvAHIAdABtAHAAbwByAHQAZgBvAHIAZQB0AGEAbwB1AHIAYwBlAHIAbwBtAHUAbgBjAHQAaQBvAG4AcwBzAGUAcgB0AHYAbwB5AGkAZQBkAGUAbABlAGMAbwBuAHQAaQBuAGkAbgBzAHQAYQBuAHQAeQBiAHIAZQBhAHIAZQB0AHUAcgBkAGUAYgB1AGcAZwBlAGEAdwBhAGkAdABoAHIAdwBoAGkAbABlAGkAZgBjAGEAdABjAGYAaQBuAGEAbABsAGUAbABzAABB0AkLEAEAAAACAAAAAAQAAEA5AAA=","undefined"!=typeof Buffer?Buffer.from(A,"base64"):Uint8Array.from(atob(A),(A=>A.charCodeAt(0)));var A;};WebAssembly.compile(E()).then(WebAssembly.instantiate).then((({exports:A})=>{}));

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/felipe/FCI/transparentes/uetransparentes/","cacheDir":"file:///home/felipe/FCI/transparentes/uetransparentes/node_modules/.astro/","outDir":"file:///home/felipe/FCI/transparentes/uetransparentes/dist/","srcDir":"file:///home/felipe/FCI/transparentes/uetransparentes/src/","publicDir":"file:///home/felipe/FCI/transparentes/uetransparentes/public/","buildClientDir":"file:///home/felipe/FCI/transparentes/uetransparentes/dist/","buildServerDir":"file:///home/felipe/FCI/transparentes/uetransparentes/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"1/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/1","isIndex":false,"type":"page","pattern":"^\\/1\\/?$","segments":[[{"content":"1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/1.astro","pathname":"/1","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"10/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/10","isIndex":false,"type":"page","pattern":"^\\/10\\/?$","segments":[[{"content":"10","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/10.astro","pathname":"/10","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"11/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/11","isIndex":false,"type":"page","pattern":"^\\/11\\/?$","segments":[[{"content":"11","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/11.astro","pathname":"/11","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"12/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/12","isIndex":false,"type":"page","pattern":"^\\/12\\/?$","segments":[[{"content":"12","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/12.astro","pathname":"/12","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"13/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/13","isIndex":false,"type":"page","pattern":"^\\/13\\/?$","segments":[[{"content":"13","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/13.astro","pathname":"/13","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"14/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/14","isIndex":false,"type":"page","pattern":"^\\/14\\/?$","segments":[[{"content":"14","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/14.astro","pathname":"/14","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"15/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/15","isIndex":false,"type":"page","pattern":"^\\/15\\/?$","segments":[[{"content":"15","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/15.astro","pathname":"/15","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"2/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/2","isIndex":false,"type":"page","pattern":"^\\/2\\/?$","segments":[[{"content":"2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/2.astro","pathname":"/2","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"3/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/3","isIndex":false,"type":"page","pattern":"^\\/3\\/?$","segments":[[{"content":"3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/3.astro","pathname":"/3","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"4/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/4","isIndex":false,"type":"page","pattern":"^\\/4\\/?$","segments":[[{"content":"4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/4.astro","pathname":"/4","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"5/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/5","isIndex":false,"type":"page","pattern":"^\\/5\\/?$","segments":[[{"content":"5","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/5.astro","pathname":"/5","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"6/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/6","isIndex":false,"type":"page","pattern":"^\\/6\\/?$","segments":[[{"content":"6","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/6.astro","pathname":"/6","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"7/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/7","isIndex":false,"type":"page","pattern":"^\\/7\\/?$","segments":[[{"content":"7","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/7.astro","pathname":"/7","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"8/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/8","isIndex":false,"type":"page","pattern":"^\\/8\\/?$","segments":[[{"content":"8","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/8.astro","pathname":"/8","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"9/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/9","isIndex":false,"type":"page","pattern":"^\\/9\\/?$","segments":[[{"content":"9","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/9.astro","pathname":"/9","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"justicia/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/justicia","isIndex":false,"type":"page","pattern":"^\\/justicia\\/?$","segments":[[{"content":"justicia","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/justicia.astro","pathname":"/justicia","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"medioambiente/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/medioambiente","isIndex":false,"type":"page","pattern":"^\\/medioambiente\\/?$","segments":[[{"content":"medioambiente","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/medioambiente.astro","pathname":"/medioambiente","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"participacion/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/participacion","isIndex":false,"type":"page","pattern":"^\\/participacion\\/?$","segments":[[{"content":"participacion","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/participacion.astro","pathname":"/participacion","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"probidad/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/probidad","isIndex":false,"type":"page","pattern":"^\\/probidad\\/?$","segments":[[{"content":"probidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/probidad.astro","pathname":"/probidad","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"proyecto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proyecto","isIndex":false,"type":"page","pattern":"^\\/proyecto\\/?$","segments":[[{"content":"proyecto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyecto.astro","pathname":"/proyecto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"seguimiento/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/seguimiento","isIndex":false,"type":"page","pattern":"^\\/seguimiento\\/?$","segments":[[{"content":"seguimiento","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/seguimiento.astro","pathname":"/seguimiento","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"transparencia/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/transparencia","isIndex":false,"type":"page","pattern":"^\\/transparencia\\/?$","segments":[[{"content":"transparencia","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/transparencia.astro","pathname":"/transparencia","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/felipe/FCI/transparentes/uetransparentes/src/pages/1.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/10.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/11.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/12.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/13.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/14.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/15.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/2.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/3.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/4.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/5.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/6.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/7.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/8.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/9.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/justicia.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/medioambiente.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/participacion.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/probidad.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/seguimiento.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/pages/transparencia.astro",{"propagation":"in-tree","containsHead":true}],["/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/1@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/10@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/11@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/12@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/13@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/14@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/15@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/2@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/3@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/4@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/5@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/6@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/7@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/8@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/9@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/justicia@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/medioambiente@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/participacion@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/probidad@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/seguimiento@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/transparencia@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/1@_@astro":"pages/1.astro.mjs","\u0000@astro-page:src/pages/10@_@astro":"pages/10.astro.mjs","\u0000@astro-page:src/pages/11@_@astro":"pages/11.astro.mjs","\u0000@astro-page:src/pages/12@_@astro":"pages/12.astro.mjs","\u0000@astro-page:src/pages/13@_@astro":"pages/13.astro.mjs","\u0000@astro-page:src/pages/14@_@astro":"pages/14.astro.mjs","\u0000@astro-page:src/pages/15@_@astro":"pages/15.astro.mjs","\u0000@astro-page:src/pages/2@_@astro":"pages/2.astro.mjs","\u0000@astro-page:src/pages/3@_@astro":"pages/3.astro.mjs","\u0000@astro-page:src/pages/4@_@astro":"pages/4.astro.mjs","\u0000@astro-page:src/pages/5@_@astro":"pages/5.astro.mjs","\u0000@astro-page:src/pages/6@_@astro":"pages/6.astro.mjs","\u0000@astro-page:src/pages/7@_@astro":"pages/7.astro.mjs","\u0000@astro-page:src/pages/8@_@astro":"pages/8.astro.mjs","\u0000@astro-page:src/pages/9@_@astro":"pages/9.astro.mjs","\u0000@astro-page:src/pages/justicia@_@astro":"pages/justicia.astro.mjs","\u0000@astro-page:src/pages/medioambiente@_@astro":"pages/medioambiente.astro.mjs","\u0000@astro-page:src/pages/participacion@_@astro":"pages/participacion.astro.mjs","\u0000@astro-page:src/pages/probidad@_@astro":"pages/probidad.astro.mjs","\u0000@astro-page:src/pages/proyecto@_@astro":"pages/proyecto.astro.mjs","\u0000@astro-page:src/pages/seguimiento@_@astro":"pages/seguimiento.astro.mjs","\u0000@astro-page:src/pages/transparencia@_@astro":"pages/transparencia.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astro-renderers":"renderers.mjs","/home/felipe/FCI/transparentes/uetransparentes/node_modules/.pnpm/astro@5.7.10_@netlify+blobs@8.2.0_@types+node@22.15.3_rollup@4.40.1_typescript@5.8.3/node_modules/astro/dist/assets/services/noop.js":"chunks/noop_CnS2KHEf.mjs","/home/felipe/FCI/transparentes/uetransparentes/node_modules/.pnpm/unstorage@1.16.0_@netlify+blobs@8.2.0/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","\u0000@astrojs-manifest":"manifest_EMBzf3mK.mjs","/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CbsHxQAA.js","/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.IJHd-p1-.js","/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts":"_astro/Layout.astro_astro_type_script_index_2_lang.BqkX8aMw.js","/home/felipe/FCI/transparentes/uetransparentes/node_modules/.pnpm/astro@5.7.10_@netlify+blobs@8.2.0_@types+node@22.15.3_rollup@4.40.1_typescript@5.8.3/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.querySelector(\"body\").style.overflow=\"auto\";"],["/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","const o=document.querySelectorAll('[data-bs-toggle=\"tooltip\"]');[...o].map(t=>new bootstrap.Tooltip(t));"],["/home/felipe/FCI/transparentes/uetransparentes/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){var e=document.querySelector(\".grid\"),t=new Masonry(e,{itemSelector:\".proyecto-resumen\",columnWidth:\".proyecto-resumen\",percentPosition:!0,gutter:20});window.addEventListener(\"resize\",function(){t.layout()})});"]],"assets":["/_astro/logo-transparentes-black.DVTMDamH.svg","/_astro/collage-1-footer.ZCA1mgaP.png","/_astro/1.BwBEUrLR.css","/alfil-recorte.png","/astro.svg","/background.svg","/collage-1-footer.png","/collage-2-footer.png","/dado-recorte.png","/decoracion-amarilla.png","/decoracion-azul.png","/favicon.svg","/flecha-black.png","/flecha.png","/informacion-icono.png","/logo-ct.png","/logo-fci.png","/logo-transparentes-black.svg","/mano-collage.png","/poligono-decoracion.png","/proyecto.html","/seguimiento-legislativo.html","/slogan-footer.svg","/styles.css","/tailwind.html","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","/css/styles.css","/img/alfil-recorte.png","/img/collage-1-footer.png","/img/collage-2-footer.png","/img/dado-recorte.png","/img/decoracion-amarilla.png","/img/decoracion-azul.png","/img/flecha-black.png","/img/flecha.png","/img/informacion-icono.png","/img/logo-ct.png","/img/logo-fci.png","/img/logo-transparentes-black.svg","/img/mano-collage.png","/img/poligono-decoracion.png","/img/slogan-footer.svg","/1/index.html","/10/index.html","/11/index.html","/12/index.html","/13/index.html","/14/index.html","/15/index.html","/2/index.html","/3/index.html","/4/index.html","/5/index.html","/6/index.html","/7/index.html","/8/index.html","/9/index.html","/justicia/index.html","/medioambiente/index.html","/participacion/index.html","/probidad/index.html","/proyecto/index.html","/seguimiento/index.html","/transparencia/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"6XqiP4X7FccObTDoHlaah+av57wdGCzXaQcj36AWNz8=","sessionConfig":{"driver":"fs-lite","options":{"base":"/home/felipe/FCI/transparentes/uetransparentes/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
