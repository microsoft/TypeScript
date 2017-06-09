export class DisposableClass {
    public foo() {

    }

    public dispose() {
    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}