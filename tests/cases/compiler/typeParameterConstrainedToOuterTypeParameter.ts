interface A<T> {
    <U extends T>(x: U[])
}

interface B<T> {
    <U extends T>(x: U)
}

declare var a: A<string>;
var b: B<string> = a; // assignment should be legal (both U's get instantiated to any for comparison)