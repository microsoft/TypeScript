//// [privateInstanceVisibility.ts]
module Test {
 
    export class Example {
 
        private someNumber: number;
 
        

        public doSomething() {
 
            var that = this;                      

            function innerFunction() {
                
                var num = that.someNumber;
 
            }
 
        }        

    }
 
}



class C {

    private x: number;

    getX() { return this.x; }

    clone(other: C) {
        this.x = other.x;

    }
}


//// [privateInstanceVisibility.js]
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
var Test;
(function (Test) {
    var Example = (function () {
        function Example() {
        }
        Example.prototype.doSomething = function () {
            var that = this;
            function innerFunction() {
                var num = that.someNumber;
            }
        };
        __names(Example.prototype, ["doSomething"]);
        return Example;
    }());
    Test.Example = Example;
})(Test || (Test = {}));
var C = (function () {
    function C() {
    }
    C.prototype.getX = function () { return this.x; };
    C.prototype.clone = function (other) {
        this.x = other.x;
    };
    __names(C.prototype, ["getX", "clone"]);
    return C;
}());
