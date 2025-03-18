//// [tests/cases/compiler/superCallOutsideConstructor.ts] ////

//// [superCallOutsideConstructor.ts]
class C {
    foo() { }
}
 
class D extends C {
    x = super(); 
 
    constructor() {
        super();
 
        var y = () => {
            super(); 
        }

        var y2 = function() {
            super();
        }
    }
}
 
var d = new D();


//// [superCallOutsideConstructor.js]
class C {
    foo() { }
}
class D extends C {
    x = super();
    constructor() {
        super();
        var y = () => {
            super();
        };
        var y2 = function () {
            super();
        };
    }
}
var d = new D();
