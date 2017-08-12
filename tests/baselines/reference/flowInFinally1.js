//// [flowInFinally1.ts]
class A {
  constructor() { }
  method() { }
}

let a: A | null = null;

try {
  a = new A();
} finally {
  if (a) {
    a.method();
  }
}

//// [flowInFinally1.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.method = function () { };
    __names(A.prototype, ["method"]);
    return A;
}());
var a = null;
try {
    a = new A();
}
finally {
    if (a) {
        a.method();
    }
}
