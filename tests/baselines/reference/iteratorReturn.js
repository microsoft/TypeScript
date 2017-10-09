//// [iteratorReturn.ts]
interface Coroutine extends Iterator<number> {
    return?(effect?: string): IteratorResult<string>;
}

interface Process extends Coroutine {
    [Symbol.iterator](): Coroutine;
}

let good = function*(): Process {
    yield 1;
    return "str";
};

let bad = function*(): Process {
    yield "str";
    return 1;
};


//// [iteratorReturn.js]
let good = function* () {
    yield 1;
    return "str";
};
let bad = function* () {
    yield "str";
    return 1;
};
