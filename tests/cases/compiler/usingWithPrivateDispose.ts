export class DisposableClass {
    public foo() {

    }

    private dispose() {
    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}