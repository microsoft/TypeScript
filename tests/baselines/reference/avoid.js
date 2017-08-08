//// [avoid.ts]
function f() {
    var x=1;
}

var y=f();  // error void fn
var why:any=f(); // error void fn
var w:any;
w=f(); // error void fn

class C {
    g() {
        
    }
}

var z=new C().g(); // error void fn
var N=new f();  // ok with void fn



//// [avoid.js]
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
function f() {
    var x = 1;
}
var y = f(); // error void fn
var why = f(); // error void fn
var w;
w = f(); // error void fn
var C = (function () {
    function C() {
    }
    C.prototype.g = function () {
    };
    __names(C.prototype, ["g"]);
    return C;
}());
var z = new C().g(); // error void fn
var N = new f(); // ok with void fn
