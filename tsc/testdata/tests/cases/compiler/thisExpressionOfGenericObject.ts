// @target: es2015
class MyClass1<T> {
    private obj: MyClass1<string>;
    constructor() {
        () => this;
    }
}
