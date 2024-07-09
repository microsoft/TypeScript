interface IA<T> {

foo(x: T): T;

}

interface IB<T> {

bar(x: T): T;

}

interface IC<T> extends IA<T>, IB<T> { }

var c: IC<number>;

var x = c.foo;

var y = c.bar;
