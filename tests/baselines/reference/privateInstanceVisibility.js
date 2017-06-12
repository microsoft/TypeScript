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
    var Example = (function () {
        function Example() {
        }
        var proto_1 = Example.prototype;
        proto_1.doSomething = function () {
            var that = this;
            function innerFunction() {
                var num = that.someNumber;
            }
        };
        return Example;
    }());
    Test.Example = Example;
})(Test || (Test = {}));
var C = (function () {
    function C() {
    }
    var proto_2 = C.prototype;
    proto_2.getX = function () { return this.x; };
    proto_2.clone = function (other) {
        this.x = other.x;
    };
    return C;
}());
