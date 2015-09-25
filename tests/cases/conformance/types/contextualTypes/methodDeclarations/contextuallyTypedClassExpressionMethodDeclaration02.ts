// @noImplicitAny: true

interface A {
    numProp: number;
}

interface B  {
    strProp: string;
}

interface Foo {
    new (): Bar;
}

interface Bar {
    method1(arg: A): void;
    method2(arg: B): void;
}

function getFoo1(): Foo {
    return class {
        method1(arg) {
            arg.numProp = 10;
        }
        method2(arg) {
            arg.strProp = "hello";
        }
    }
}

function getFoo2(): Foo {
    return class {
        method1 = (arg) => {
            arg.numProp = 10;
        }
        method2 = (arg) => {
            arg.strProp = "hello";
        }
    }
}

function getFoo3(): Foo {
    return class {
        method1 = function (arg) {
            arg.numProp = 10;
        }
        method2 = function (arg) {
            arg.strProp = "hello";
        }
    }
}