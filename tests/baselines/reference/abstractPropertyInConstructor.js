//// [abstractPropertyInConstructor.ts]
abstract class AbstractClass {
    constructor(str: string) {
        this.method(parseInt(str));
        let val = this.prop.toLowerCase();
        this.prop = "Hello World";
    }

    abstract prop: string;

    abstract method(num: number): void;

    method2() {
        this.prop = this.prop + "!";
    }
}


//// [abstractPropertyInConstructor.js]
var AbstractClass = /** @class */ (function () {
    function AbstractClass(str) {
        this.method(parseInt(str));
        var val = this.prop.toLowerCase();
        this.prop = "Hello World";
    }
    AbstractClass.prototype.method2 = function () {
        this.prop = this.prop + "!";
    };
    return AbstractClass;
}());
