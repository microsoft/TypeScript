export class DisposableClass {
    public foo() {

    }
}
using(let disposedObj = new DisposableClass()) {
    disposedObj.foo();
}