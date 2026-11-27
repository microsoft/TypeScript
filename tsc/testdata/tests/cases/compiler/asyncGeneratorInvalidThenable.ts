// @target: es2020
// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/65378
async function* invalidThenableBeforeValue() {
    yield { then() {} };
    yield 1;
}

async function* invalidThenableAfterValue() {
    yield 1;
    yield { then() {} };
}

async function* invalidThenableWithMultipleValues() {
    yield { then() {} };
    yield 1;
    yield "text";
}

async function* onlyInvalidThenables() {
    yield { then() {} };
    yield { then() {} };
}

async function* singleInvalidThenable() {
    yield { then() {} };
}

async function* invalidThenableWithNext() {
    const next: boolean = yield { then() {} };
    yield 1;
    return next;
}

async function* validYields() {
    yield Promise.resolve(1);
    yield "text";
}

function* synchronousThenable() {
    yield { then() {} };
    yield 1;
}
