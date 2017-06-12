export class DisposableClass {
    public foo() {

    }

    public dispose(x: number) {
    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}