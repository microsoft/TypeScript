//// [tests/cases/compiler/privateInstanceVisibility.ts] ////

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
    class Example {
        someNumber;
        doSomething() {
            var that = this;
            function innerFunction() {
                var num = that.someNumber;
            }
        }
    }
    Test.Example = Example;
})(Test || (Test = {}));
class C {
    x;
    getX() { return this.x; }
    clone(other) {
        this.x = other.x;
    }
}
