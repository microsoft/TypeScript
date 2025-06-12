package printer

type Priority struct {
	Value int
}

type EmitHelper struct {
	Name         string                                          // A unique name for this helper.
	Scoped       bool                                            // Indicates whether the helper MUST be emitted in the current scope.
	Text         string                                          // ES3-compatible raw script text
	TextCallback func(makeUniqueName func(string) string) string // A function yielding an ES3-compatible raw script text.
	Priority     *Priority                                       // Helpers with a higher priority are emitted earlier than other helpers on the node.
	Dependencies []*EmitHelper                                   // Emit helpers this helper depends on
	ImportName   string                                          // The name of the helper to use when importing via `--importHelpers`.
}

func compareEmitHelpers(x *EmitHelper, y *EmitHelper) int {
	if x == y {
		return 0
	}
	if x.Priority == y.Priority {
		return 0
	}
	if x.Priority == nil {
		return 1
	}
	if y.Priority == nil {
		return -1
	}
	return x.Priority.Value - y.Priority.Value
}

// !!! TypeScript Helpers

// ESNext Helpers

var addDisposableResourceHelper = &EmitHelper{
	Name:       "typescript:addDisposableResource",
	ImportName: "__addDisposableResource",
	Scoped:     false,
	Text: `var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};`,
}

var disposeResourcesHelper = &EmitHelper{
	Name:       "typescript:disposeResources",
	ImportName: "__disposeResources",
	Scoped:     false,
	Text: `var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});`,
}

// !!! Class Fields Helpers
// !!! ES2018 Helpers
var assignHelper = &EmitHelper{
	Name:       "typescript:assign",
	ImportName: "__assign",
	Scoped:     false,
	Priority:   &Priority{1},
	Text: `var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};`,
}

// !!! ES2018 Destructuring Helpers
// !!! ES2017 Helpers

// ES2015 Helpers

var propKeyHelper = &EmitHelper{
	Name:       "typescript:propKey",
	ImportName: "__propKey",
	Scoped:     false,
	Text: `var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};`,
}

// https://tc39.es/ecma262/#sec-setfunctionname
var setFunctionNameHelper = &EmitHelper{
	Name:       "typescript:setFunctionName",
	ImportName: "__setFunctionName",
	Scoped:     false,
	Text: `var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};`,
}

// ES Module Helpers

var createBindingHelper = &EmitHelper{
	Name:       "typescript:commonjscreatebinding",
	ImportName: "__createBinding",
	Scoped:     false,
	Priority:   &Priority{1},
	Text: `var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));`,
}

var setModuleDefaultHelper = &EmitHelper{
	Name:       "typescript:commonjscreatevalue",
	ImportName: "__setModuleDefault",
	Scoped:     false,
	Priority:   &Priority{1},
	Text: `var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});`,
}

var importStarHelper = &EmitHelper{
	Name:         "typescript:commonjsimportstar",
	ImportName:   "__importStar",
	Scoped:       false,
	Dependencies: []*EmitHelper{createBindingHelper, setModuleDefaultHelper},
	Priority:     &Priority{2},
	Text: `var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();`,
}

var importDefaultHelper = &EmitHelper{
	Name:       "typescript:commonjsimportdefault",
	ImportName: "__importDefault",
	Scoped:     false,
	Text: `var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};`,
}

var exportStarHelper = &EmitHelper{
	Name:         "typescript:export-star",
	ImportName:   "__exportStar",
	Scoped:       false,
	Dependencies: []*EmitHelper{createBindingHelper},
	Priority:     &Priority{2},
	Text: `var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};`,
}

var rewriteRelativeImportExtensionsHelper = &EmitHelper{
	Name:       "typescript:rewriteRelativeImportExtensions",
	ImportName: "__rewriteRelativeImportExtension",
	Scoped:     false,
	Text: `var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};`,
}
