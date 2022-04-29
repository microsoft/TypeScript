function foo<T>(o: Take<T>, i: Make<T>) { }
interface Make<T> {
    (): T;
}
interface Take<T> {
    (n: T): void;
}
// Infer string from second argument because it isn't context sensitive
foo(n => n.length, () => 'hi');
