// @strictInstanceOfTypeParameters: true

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
