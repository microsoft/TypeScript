//// [es5-system.ts]
export default class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}


//// [es5-system.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __names = (this && this.__names) || (function() {
        var name = Object.defineProperty ? (function(proto, name) {
            Object.defineProperty(proto[name], 'name', { 
                value: name, configurable: true, writable: false, enumerable: false
            });
        }) : (function(proto, name) {
            proto[name].name = name;
        });
        return function (proto, keys) {
            for (var i = keys.length - 1; i >= 0; i--) {
                name(proto, keys[i])
            }
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var A;
    return {
        setters: [],
        execute: function () {
            A = (function () {
                function A() {
                }
                A.prototype.B = function () {
                    return 42;
                };
                __names(A.prototype, ["B"]);
                return A;
            }());
            exports_1("default", A);
        }
    };
});
