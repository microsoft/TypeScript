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
var Test;
(function (Test) {
    var Example = /** @class */ (function () {
        function Example() {
        }
        Example.prototype.doSomething = function () {
            var that = this;
            function innerFunction() {
                var num = that.someNumber;
            }
        };
        return Example;
    }());
    Test.Example = Example;
})(Test || (Test = {}));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.getX = function () { return this.x; };
    C.prototype.clone = function (other) {
        this.x = other.x;
    };
    return C;
}());
