//// [tests/cases/compiler/strictInstanceOfTypeParametersFromAnonymousClass.ts] ////

//// [strictInstanceOfTypeParametersFromAnonymousClass.ts]
function MakeClass<T>(someStuff: T) {
    return class {
        someStuff = someStuff;
    };
}

const MadeClassNumber = MakeClass(123);
const MadeClassString = MakeClass("foo");

const numberInstance = new MadeClassNumber();
numberInstance.someStuff;

declare const someInstance: unknown;
if (someInstance instanceof MadeClassNumber) {
    someInstance.someStuff;
}


//// [strictInstanceOfTypeParametersFromAnonymousClass.js]
function MakeClass(someStuff) {
    return /** @class */ (function () {
        function class_1() {
            this.someStuff = someStuff;
        }
        return class_1;
    }());
}
var MadeClassNumber = MakeClass(123);
var MadeClassString = MakeClass("foo");
var numberInstance = new MadeClassNumber();
numberInstance.someStuff;
if (someInstance instanceof MadeClassNumber) {
    someInstance.someStuff;
}
