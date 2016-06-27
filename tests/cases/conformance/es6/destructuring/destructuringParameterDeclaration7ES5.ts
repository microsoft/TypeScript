// @target: es5

interface ISomething {
    foo: string,
    bar: string
}

function foo({}, {foo, bar}: ISomething) {}
