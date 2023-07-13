//// [tests/cases/conformance/salsa/constructorNameInObjectLiteralAccessor.ts] ////

//// [constructorNameInObjectLiteralAccessor.ts]
const c1 = {
    get constructor() { return },
    set constructor(value) {}
}


//// [constructorNameInObjectLiteralAccessor.js]
const c1 = {
    get constructor() { return; },
    set constructor(value) { }
};
