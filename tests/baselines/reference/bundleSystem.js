//// [tests/cases/compiler/bundleSystem.ts] ////

//// [bundleSystem_file0.ts]

export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


//// [bundleSystem_file1.ts]
import {Foo, assert} from "./bundleSystem_file0";
assert(Foo.CONSTANT === "Foo");


//// [bundleSystem_bundle.js]
System.register([], function(exports_1) {
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [],
        execute: function() {
            exportStar_1((function() {
                var __define = (this && this.__define) || (function() {
                    var cache = {},
                    id = 0,
                    idMap = {},
                    builtinRequire = typeof require === "function" ? require : function(name) { throw new Error("Could not find module named ""+name+""."); },
                    normalizeSlashes = function(path) { return path.replace("\\", "/"); },
                    forEach = function(array, callback) {
                        for (var i = 0, len = array.length; i < len; i++) {
                            callback(array[i], i);
                        }
                    },
                    resolvePath = function(base, name) {
                        var result = normalizeSlashes(base).split("/");
                        result.pop();
                        forEach(normalizeSlashes(name).split("/"), function(part, index) {
                            switch(part) {
                                case "":
                                case ".":
                                    break;
                                case "..":
                                    if (result.length <= 1) {
                                        if (result[0] === "..") {
                                            result.push("..");
                                            break;
                                        }
                                        else if (result[0] === "." || result[0] === "") {
                                            result[0] = "..";
                                            break;
                                        }
                                    }
                                    result.pop();
                                    break;
                                default:
                                    result.push(part);
                                    break;
                            }
                        });
                        if (result[0] === "") result.shift();
                        return "/"+result.join("/");
                    },
                    initializeAndGet = function(resolved) {
                        if (typeof cache[resolved] === "function") {
                            cache[resolved]();
                        }
                        return (cache[resolved] && cache[resolved].exports);
                    },
                    resolveRequire = function(name, from) {
                        var resolved = resolvePath(from || "/", name);
                        return (initializeAndGet(resolved) || builtinRequire(name));
                    },
                    define = function (declaredName, factory) {
                        idMap[++id] = declaredName;
                        var module = {
                            id: id,
                            exports: {}
                        };
                        var require = function(name) {
                            if (typeof name === "number") return initializeAndGet(idMap[name]);
                            return resolveRequire(name, declaredName);
                        };
                        cache[declaredName] = function() {
                            cache[declaredName] = module;
                            factory(require, module.exports, module);
                        };
                    };
                    define.require = resolveRequire;
                    return define;
                })();
                __define("/tests/cases/compiler/bundleSystem_file0", function(require, exports, module){
                    class Foo {
                    }
                    Foo.CONSTANT = "Foo";
                    Foo = Foo;
                    function assert(value) {
                        if (!value)
                            throw new Error("Assertion failed!");
                    }
                    undefined("assert", assert);
                });
                __define("/tests/cases/compiler/bundleSystem_file1", function(require, exports, module){
                    var bundleSystem_file0_1 = require("./bundleSystem_file0");
                    bundleSystem_file0_1.assert(bundleSystem_file0_1.Foo.CONSTANT === "Foo");
                });
                return __define.require("bundleSystem_file1");
            })());
        }
    };
});
