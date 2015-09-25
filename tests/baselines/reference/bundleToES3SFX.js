//// [tests/cases/compiler/bundleToES3SFX.ts] ////

//// [bundleToES3SFX_file0.ts]

export class Foo {
	static CONSTANT = "Foo";
}

export function assert(value: boolean) {
	if (!value) throw new Error("Assertion failed!");
}


//// [bundleToES3SFX_file1.ts]
import {Foo, assert} from "./bundleToES3SFX_file0";
assert(Foo.CONSTANT === "Foo");


//// [bundleToES3SFX_bundle.js]
(function() {
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
    __define("/tests/cases/compiler/bundleToES3SFX_file0", function(require, exports, module){
        var Foo = (function () {
            function Foo() {
            }
            Foo.CONSTANT = "Foo";
            return Foo;
        })();
        exports.Foo = Foo;
        function assert(value) {
            if (!value)
                throw new Error("Assertion failed!");
        }
        exports.assert = assert;
    });
    __define("/tests/cases/compiler/bundleToES3SFX_file1", function(require, exports, module){
        var bundleToES3SFX_file0_1 = require("./bundleToES3SFX_file0");
        bundleToES3SFX_file0_1.assert(bundleToES3SFX_file0_1.Foo.CONSTANT === "Foo");
    });
    return __define.require("bundleToES3SFX_file1");
})()
