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

// TypeScript Helpers

var decorateHelper = &EmitHelper{
	Name:       "typescript:decorate",
	ImportName: "__decorate",
	Scoped:     false,
	Priority:   &Priority{2},
	Text: `var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};`,
}

var metadataHelper = &EmitHelper{
	Name:       "typescript:metadata",
	ImportName: "__metadata",
	Scoped:     false,
	Priority:   &Priority{3},
	Text: `var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};`,
}

var paramHelper = &EmitHelper{
	Name:       "typescript:param",
	ImportName: "__param",
	Scoped:     false,
	Priority:   &Priority{4},
	Text: `var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};`,
}

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

// Class Fields Helpers

/**
 * Parameters:
 *  @param receiver — The object from which the private member will be read.
 *  @param state — One of the following:
 *      - A WeakMap used to read a private instance field.
 *      - A WeakSet used as an instance brand for private instance methods and accessors.
 *      - A function value that should be the undecorated class constructor used to brand check private static fields, methods, and accessors.
 *  @param kind — (optional pre TS 4.3, required for TS 4.3+) One of the following values:
 *      - undefined — Indicates a private instance field (pre TS 4.3).
 *      - "f" — Indicates a private field (instance or static).
 *      - "m" — Indicates a private method (instance or static).
 *      - "a" — Indicates a private accessor (instance or static).
 *  @param f — (optional pre TS 4.3) Depends on the arguments for state and kind:
 *      - If kind is "m", this should be the function corresponding to the static or instance method.
 *      - If kind is "a", this should be the function corresponding to the getter method, or undefined if the getter was not defined.
 *      - If kind is "f" and state is a function, this should be an object holding the value of a static field, or undefined if the static field declaration has not yet been evaluated.
 * Usage:
 * This helper will only ever be used by the compiler in the following ways:
 *
 * Reading from a private instance field (pre TS 4.3):
 *      __classPrivateFieldGet(<any>, <WeakMap>)
 *
 * Reading from a private instance field (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakMap>, "f")
 *
 * Reading from a private instance get accessor (when defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakSet>, "a", <function>)
 *
 * Reading from a private instance get accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakSet>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Reading from a private instance method (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <WeakSet>, "m", <function>)
 *
 * Reading from a private static field (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "f", <{ value: any }>)
 *
 * Reading from a private static get accessor (when defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "a", <function>)
 *
 * Reading from a private static get accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Reading from a private static method (TS 4.3+):
 *      __classPrivateFieldGet(<any>, <constructor>, "m", <function>)
 */
var classPrivateFieldGetHelper = &EmitHelper{
	Name:       "typescript:classPrivateFieldGet",
	ImportName: "__classPrivateFieldGet",
	Scoped:     false,
	Text: `var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};`,
}

/**
 * Parameters:
 *  @param receiver — The object on which the private member will be set.
 *  @param state — One of the following:
 *      - A WeakMap used to store a private instance field.
 *      - A WeakSet used as an instance brand for private instance methods and accessors.
 *      - A function value that should be the undecorated class constructor used to brand check private static fields, methods, and accessors.
 *  @param value — The value to set.
 *  @param kind — (optional pre TS 4.3, required for TS 4.3+) One of the following values:
 *       - undefined — Indicates a private instance field (pre TS 4.3).
 *       - "f" — Indicates a private field (instance or static).
 *       - "m" — Indicates a private method (instance or static).
 *       - "a" — Indicates a private accessor (instance or static).
 *   @param f — (optional pre TS 4.3) Depends on the arguments for state and kind:
 *       - If kind is "m", this should be the function corresponding to the static or instance method.
 *       - If kind is "a", this should be the function corresponding to the setter method, or undefined if the setter was not defined.
 *       - If kind is "f" and state is a function, this should be an object holding the value of a static field, or undefined if the static field declaration has not yet been evaluated.
 * Usage:
 * This helper will only ever be used by the compiler in the following ways:
 *
 * Writing to a private instance field (pre TS 4.3):
 *      __classPrivateFieldSet(<any>, <WeakMap>, <any>)
 *
 * Writing to a private instance field (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakMap>, <any>, "f")
 *
 * Writing to a private instance set accessor (when defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakSet>, <any>, "a", <function>)
 *
 * Writing to a private instance set accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakSet>, <any>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Writing to a private instance method (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <WeakSet>, <any>, "m", <function>)
 *      NOTE: This always results in a runtime error.
 *
 * Writing to a private static field (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "f", <{ value: any }>)
 *
 * Writing to a private static set accessor (when defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "a", <function>)
 *
 * Writing to a private static set accessor (when not defined, TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "a", void 0)
 *      NOTE: This always results in a runtime error.
 *
 * Writing to a private static method (TS 4.3+):
 *      __classPrivateFieldSet(<any>, <constructor>, <any>, "m", <function>)
 *      NOTE: This always results in a runtime error.
 */
var classPrivateFieldSetHelper = &EmitHelper{
	Name:       "typescript:classPrivateFieldSet",
	ImportName: "__classPrivateFieldSet",
	Scoped:     false,
	Text: `var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};`,
}

/**
 * Parameters:
 *  @param state — One of the following:
 *      - A WeakMap when the member is a private instance field.
 *      - A WeakSet when the member is a private instance method or accessor.
 *      - A function value that should be the undecorated class constructor when the member is a private static field, method, or accessor.
 *  @param receiver — The object being checked if it has the private member.
 *
 * Usage:
 * This helper is used to transform `#field in expression` to
 *      `__classPrivateFieldIn(<weakMap/weakSet/constructor>, expression)`
 */
var classPrivateFieldInHelper = &EmitHelper{
	Name:       "typescript:classPrivateFieldIn",
	ImportName: "__classPrivateFieldIn",
	Scoped:     false,
	Text: `var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};`,
}

// ES2018 Helpers

var awaitHelper = &EmitHelper{
	Name:       "typescript:await",
	ImportName: "__await",
	Scoped:     false,
	Text:       `var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }`,
}

var asyncGeneratorHelper = &EmitHelper{
	Name:         "typescript:asyncGenerator",
	ImportName:   "__asyncGenerator",
	Scoped:       false,
	Dependencies: []*EmitHelper{awaitHelper},
	Text: `var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};`,
}

var asyncDelegatorHelper = &EmitHelper{
	Name:         "typescript:asyncDelegator",
	ImportName:   "__asyncDelegator",
	Scoped:       false,
	Dependencies: []*EmitHelper{awaitHelper},
	Text: `var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};`,
}

var asyncValuesHelper = &EmitHelper{
	Name:       "typescript:asyncValues",
	ImportName: "__asyncValues",
	Scoped:     false,
	Text: `var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};`,
}

// ES2018 Destructuring Helpers
var restHelper = &EmitHelper{
	Name:       "typescript:rest",
	ImportName: "__rest",
	Scoped:     false,
	Text: `var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};`,
}

// !!! ES2017 Helpers

var awaiterHelper = &EmitHelper{
	Name:       "typescript:awaiter",
	ImportName: "__awaiter",
	Scoped:     false,
	Priority:   &Priority{5},
	Text: `var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};`,
}

var AsyncSuperHelper = &EmitHelper{
	Name:   "typescript:async-super",
	Scoped: true,
	TextCallback: func(makeUniqueName func(string) string) string {
		return "\nconst " + makeUniqueName("_superIndex") + " = name => super[name];"
	},
}

var AdvancedAsyncSuperHelper = &EmitHelper{
	Name:   "typescript:advanced-async-super",
	Scoped: true,
	TextCallback: func(makeUniqueName func(string) string) string {
		return "\nconst " + makeUniqueName("_superIndex") + " = (function (geti, seti) {\n" +
			"    const cache = Object.create(null);\n" +
			"    return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });\n" +
			"})(name => super[name], (name, value) => super[name] = value);"
	},
}

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
