interface Foo<T> {
    reject(arg: T): void;
}
var foo: Foo<string>
 
interface bar<T> {
    fail(func: (arg: T) => void ): void;
    fail2(func2: { (arg: T): void; }): void;
}
var test: bar<string>;
 
test.fail(arg => foo.reject(arg));
test.fail2(arg => foo.reject(arg)); // Error: Supplied parameters do not match any signature of call target
