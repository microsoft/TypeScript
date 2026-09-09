//// [variables.ts] ////
export const a = 1;
export let b = 2;
export var c = 3;
using d = undefined;
export { d };
await using e = undefined;
export { e };
//// [interface.ts] ////
export interface Foo {
    a: string;
    readonly b: string;
    c?: string;
}
//// [class.ts] ////
const i = Symbol();
export class Bar {
    a: string;
    b?: string;
    declare c: string;
    #d: string;
    public e: string;
    protected f: string;
    private g: string;
    ["h"]: string;
    [i]: string;
}

export abstract class Baz {
    abstract a: string;
    abstract method(): void;
}
//// [namespace.ts] ////
export namespace ns {
    namespace internal {
        export class Foo {}
    }
    export namespace nested {
        export import inner = internal;
    }
}
//// [alias.ts] ////
export type A<T> = { x: T };
//// [variables.js] ////
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
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
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
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
});
export const a = 1;
export let b = 2;
export var c = 3;
export { d };
export { e };
var d, e;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    d = __addDisposableResource(env_1, undefined, false);
    e = __addDisposableResource(env_1, undefined, true);
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    const result_1 = __disposeResources(env_1);
    if (result_1)
        await result_1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFibGVzLmpzIiwic291cmNlcyI6WyJ2YXJpYWJsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUViLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7OztJQUhQLENBQUMsa0NBQUcsU0FBUyxRQUFBLENBQUM7SUFFUixDQUFDLGtDQUFHLFNBQVMsT0FBQSxDQUFDIn0=
//// [interface.js] ////
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlcyI6WyJpbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiJ9
//// [class.js] ////
var _Bar_d;
const i = Symbol();
export class Bar {
    constructor() {
        _Bar_d.set(this, void 0);
    }
}
_Bar_d = new WeakMap();
export class Baz {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VzIjpbImNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUNuQixNQUFNLE9BQU8sR0FBRztJQUFoQjtRQUlJLHlCQUFXO0lBTWYsQ0FBQztDQUFBOztBQUVELE1BQU0sT0FBZ0IsR0FBRztDQUd4QiJ9
//// [namespace.js] ////
export var ns;
(function (ns) {
    let internal;
    (function (internal) {
        class Foo {
        }
        internal.Foo = Foo;
    })(internal || (internal = {}));
    let nested;
    (function (nested) {
        nested.inner = internal;
    })(nested = ns.nested || (ns.nested = {}));
})(ns || (ns = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZXNwYWNlLmpzIiwic291cmNlcyI6WyJuYW1lc3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxLQUFXLEVBQUUsQ0FPbEI7QUFQRCxXQUFpQixFQUFFO0lBQ2YsSUFBVSxRQUFRLENBRWpCO0lBRkQsV0FBVSxRQUFRO1FBQ2QsTUFBYSxHQUFHO1NBQUc7UUFBTixTQUFBLEdBQUcsTUFBRyxDQUFBO0lBQ3ZCLENBQUMsRUFGUyxRQUFRLEtBQVIsUUFBUSxRQUVqQjtJQUNELElBQWlCLE1BQU0sQ0FFdEI7SUFGRCxXQUFpQixNQUFNO1FBQ0wsT0FBQSxLQUFLLEdBQUcsUUFBUyxDQUFBO0lBQ25DLENBQUMsRUFGZ0IsTUFBTSxHQUFOLEdBQUEsTUFBTSxLQUFOLEdBQUEsTUFBTSxRQUV0QjtBQUNMLENBQUMsRUFQZ0IsRUFBRSxLQUFGLEVBQUUsUUFPbEIifQ==
//// [alias.js] ////
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXMuanMiLCJzb3VyY2VzIjpbImFsaWFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIifQ==
