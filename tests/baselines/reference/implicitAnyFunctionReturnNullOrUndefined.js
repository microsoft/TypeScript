//// [implicitAnyFunctionReturnNullOrUndefined.ts]
// this should be an error
function nullWidenFunction() { return null;}             // error at "nullWidenFunction"
function undefinedWidenFunction() { return undefined; }  // error at "undefinedWidenFunction"

class C {
    nullWidenFuncOfC() {  // error at "nullWidenFuncOfC"
        return null;
    }

    underfinedWidenFuncOfC() {  // error at "underfinedWidenFuncOfC"
        return undefined;
    }
}

// this should not be an error
function foo1(): any { return null; }
function bar1(): any { return undefined; }
function fooBar(): number { return 1; }
function fooFoo() { return 5; }

// this should not be an error as the error is raised by expr above
nullWidenFunction();
undefinedWidenFunction();


//// [implicitAnyFunctionReturnNullOrUndefined.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
// this should be an error
function nullWidenFunction() { return null; } // error at "nullWidenFunction"
function undefinedWidenFunction() { return undefined; } // error at "undefinedWidenFunction"
var C = (function () {
    function C() {
    }
    C.prototype.nullWidenFuncOfC = function () {
        return null;
    };
    C.prototype.underfinedWidenFuncOfC = function () {
        return undefined;
    };
    __names(C.prototype, ["nullWidenFuncOfC", "underfinedWidenFuncOfC"]);
    return C;
}());
// this should not be an error
function foo1() { return null; }
function bar1() { return undefined; }
function fooBar() { return 1; }
function fooFoo() { return 5; }
// this should not be an error as the error is raised by expr above
nullWidenFunction();
undefinedWidenFunction();
