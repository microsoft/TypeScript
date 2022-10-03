// @Filename: genericWithCallSignatures_0.ts
interface Callable<T> {
    (): T;
    (value: T): void;
}

interface CallableExtention<T> extends Callable<T> { }

// @Filename: genericWithCallSignatures_1.ts
///<reference path="genericWithCallSignatures_0.ts"/>
class MyClass {
    public callableThing: CallableExtention<string>;

    public myMethod() {
        var x = <string> this.callableThing();
    }
}