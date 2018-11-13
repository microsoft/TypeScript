//// [genericTypeAliases.ts]
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };

var tree: Tree<number> = {
    left: {
        left: 0,
        right: {
            left: 1,
            right: 2
        },
    },
    right: 3
};

type Lazy<T> = T | (() => T);

var ls: Lazy<string>;
ls = "eager";
ls = () => "lazy";

type Foo<T> = T | { x: Foo<T> };
type Bar<U> = U | { x: Bar<U> };

// Deeply instantiated generics
var x: Foo<string>;
var y: Bar<string>;
x = y;
y = x;

x = "string";
x = { x: "hello" };
x = { x: { x: "world" } };

var z: Foo<number>;
z = 42;
z = { x: 42 };
z = { x: { x: 42 } };

type Strange<T> = string;  // Type parameter not used
var s: Strange<number>;
s = "hello";

interface AB<A, B> {
    a: A;
    b: B;
}

type Pair<T> = AB<T, T>;

interface TaggedPair<T> extends Pair<T> {
    tag: string;
}

var p: TaggedPair<number>;
p.a = 1;
p.b = 2;
p.tag = "test";

function f<A>() {
    type Foo<T> = T | { x: Foo<T> };
    var x: Foo<A[]>;
    return x;
}

function g<B>() {
    type Bar<U> = U | { x: Bar<U> };
    var x: Bar<B[]>;
    return x;
}

// Deeply instantiated generics
var a = f<string>();
var b = g<string>();
a = b;


//// [genericTypeAliases.js]
var tree = {
    left: {
        left: 0,
        right: {
            left: 1,
            right: 2
        }
    },
    right: 3
};
var ls;
ls = "eager";
ls = function () { return "lazy"; };
// Deeply instantiated generics
var x;
var y;
x = y;
y = x;
x = "string";
x = { x: "hello" };
x = { x: { x: "world" } };
var z;
z = 42;
z = { x: 42 };
z = { x: { x: 42 } };
var s;
s = "hello";
var p;
p.a = 1;
p.b = 2;
p.tag = "test";
function f() {
    var x;
    return x;
}
function g() {
    var x;
    return x;
}
// Deeply instantiated generics
var a = f();
var b = g();
a = b;
