// @strict: true
// @noemit: true

type MyObj = { foo: number; bar: number };

const containsExcessProperty = { bar: 2, excessProperty: "A" };

const a1 : MyObj = {
    foo: 1,
    bar: 1, 
    ...containsExcessProperty,
    ...{ bar: 2, excessProperty: "A" },
};

// no EPC errors because the inline excessProperty will be overwritten
const a2 : MyObj = {
    foo: 1,
    ...{ bar: 2, excessProperty: "A" },
    ...containsExcessProperty,
    bar: 1, 
};

// no EPC errors because the inline excessProperty will be overwritten
const a3 : MyObj = {
    foo: 1,
    ...{ bar: 2, excessProperty: "A" },
    ...containsExcessProperty,
};