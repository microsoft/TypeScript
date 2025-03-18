//// [tests/cases/compiler/objectSpreadWithinMethodWithinObjectWithSpread.ts] ////

//// [objectSpreadWithinMethodWithinObjectWithSpread.ts]
const obj = {};
const a = {
    ...obj,
    prop() {
        return {
            ...obj,
            metadata: 213
        };
    }
};


//// [objectSpreadWithinMethodWithinObjectWithSpread.js]
const obj = {};
const a = {
    ...obj,
    prop() {
        return {
            ...obj,
            metadata: 213
        };
    }
};
