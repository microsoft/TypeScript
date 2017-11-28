// @target: es6
function foo1(x: number, ...rest) {
    return x;
}

const foo2 = (x: number, ...rest) => x;

const foo3 = function(x: number, ...rest) {
    return x;
}

class Foo {
    constructor(...rest){}

    public foo4(x: number, ...rest) {
        return x;
    }
}

const fooObj = {
    foo5: (x: number, ...rest) => x
}

function bar1(x: number, ...rest) {
    function inner1(rest) {
        return rest;
    }

    return inner1(x);
}

const bar2 = (x: number, ...rest) => {
    function inner2(rest) {
        return rest;
    }

    return inner2(x);
}

const bar3 = function(x: number, ...rest) {
    function inner3(rest) {
        return rest;
    }

    return inner3(x);
}

class Bar {
    constructor(...rest) {
        function innerC(rest) {
            return rest;
        }

        innerC(0);
    }

    public foo4(x: number, ...rest) {
        function inner4(rest) {
            return rest;
        }

        return inner4(x);
    }
}

const barObj = {
    bar5: (x: number, ...rest) => {
        function inner5(rest) {
            return rest;
        }

        return inner5(x);
    }
}
