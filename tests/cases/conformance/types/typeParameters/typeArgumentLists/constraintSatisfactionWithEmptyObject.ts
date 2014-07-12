// valid uses of a basic object constraint, no errors expected

// Object constraint
function foo<T extends Object>(x: T) { }
var r = foo({});
var a = {};
var r = foo({});

class C<T extends Object> {
    constructor(public x: T) { }
}

var r2 = new C({});

interface I<T extends Object> {
    x: T;
}
var i: I<{}>;

// {} constraint
function foo2<T extends {}>(x: T) { }
var r = foo2({});
var a = {};
var r = foo2({});

class C2<T extends {}> {
    constructor(public x: T) { }
}

var r2 = new C2({});

interface I2<T extends {}> {
    x: T;
}
var i2: I2<{}>;

