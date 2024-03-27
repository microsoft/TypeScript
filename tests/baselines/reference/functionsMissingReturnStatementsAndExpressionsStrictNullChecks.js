//// [tests/cases/compiler/functionsMissingReturnStatementsAndExpressionsStrictNullChecks.ts] ////

//// [functionsMissingReturnStatementsAndExpressionsStrictNullChecks.ts]
function f10(): undefined {
    // Ok, return type allows implicit return of undefined
}

function f11(): undefined | number {
    // Error, return type isn't just undefined
}

function f12(): number {
    // Error, return type doesn't include undefined
}

const f20: () => undefined = () => {
    // Ok, contextual type for implicit return is undefined
}

const f21: () => undefined | number = () => {
    // Ok, contextual type for implicit return contains undefined
}

const f22: () => number = () => {
    // Error, regular void function because contextual type for implicit return isn't just undefined
}

async function f30(): Promise<undefined> {
    // Ok, return type allows implicit return of undefined
}

async function f31(): Promise<undefined | number> {
    // Error, return type isn't just undefined
}

async function f32(): Promise<number> {
    // Error, return type doesn't include undefined
}

// Examples from #36288

declare function f(a: () => undefined): void;

f(() => { });

f((): undefined => { });

const g1: () => undefined = () => { };

const g2 = (): undefined => { };

function h1() {
}

f(h1);  // Error

function h2(): undefined {
}

f(h2);

// https://github.com/microsoft/TypeScript/issues/57840

type FN = () => Promise<undefined> | undefined;

const fn1: FN = () => {
    return;
};

const fn2: FN = async () => {
    return;
};

const fn3: FN = () => {};

const fn4: FN = async () => {};


//// [functionsMissingReturnStatementsAndExpressionsStrictNullChecks.js]
function f10() {
    // Ok, return type allows implicit return of undefined
}
function f11() {
    // Error, return type isn't just undefined
}
function f12() {
    // Error, return type doesn't include undefined
}
const f20 = () => {
    // Ok, contextual type for implicit return is undefined
};
const f21 = () => {
    // Ok, contextual type for implicit return contains undefined
};
const f22 = () => {
    // Error, regular void function because contextual type for implicit return isn't just undefined
};
async function f30() {
    // Ok, return type allows implicit return of undefined
}
async function f31() {
    // Error, return type isn't just undefined
}
async function f32() {
    // Error, return type doesn't include undefined
}
f(() => { });
f(() => { });
const g1 = () => { };
const g2 = () => { };
function h1() {
}
f(h1); // Error
function h2() {
}
f(h2);
const fn1 = () => {
    return;
};
const fn2 = async () => {
    return;
};
const fn3 = () => { };
const fn4 = async () => { };
