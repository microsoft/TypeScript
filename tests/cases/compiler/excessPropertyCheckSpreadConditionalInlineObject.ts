// @strict: true
// @noemit: true

declare const someCondition: boolean;

// bar is optional
type C = { foo: number; bar?: number };

const c: C = {
    foo: 1,
    ...(someCondition
        ? {
            bar: 2,
            excessProperty: 3,
        }
        : {}),
};

const c2 = {
    foo: 1,
    ...(someCondition
        ? {
            bar: 2,
            excessProperty: 3,
        }
        : {}),
} satisfies C;

function testC(condition: boolean) {
    return someCondition ? { bar: 2, excessProperty: 3 } : {};
}

// no errors on c3 and c4 since not defined inline
const c3: C = {
    foo: 1,
    ...testC(someCondition)
};

const c4 = {
    foo: 1,
    ...testC(someCondition)
} satisfies C;



// bar is not optional 
type D = { foo: number; bar: number };

const d: D = {
    foo: 1,
    ...(someCondition
        ? {
            bar: 2,
            excessProperty: 3,
        }
        : {}),
};

const d2 = {
    foo: 1,
    ...(someCondition
        ? {
            bar: 2,
            excessProperty: 3,
        }
        : {}),
} satisfies D;