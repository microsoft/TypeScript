// @strict: true
// @noemit: true

declare const someCondition: boolean;
type MyObj = { foo: number; bar: number };
const containsExcessProperty = { bar: 2, excessProperty: "A" };

// no epc right now :(
const a4 : MyObj = {
    foo: 1,
    ...(someCondition ? { bar: 2, excessProperty: "A" } : containsExcessProperty),
};

const a5 : MyObj = {
    foo: 1,
    ...(someCondition ? containsExcessProperty : { bar: 2, excessProperty: "A" }),
};