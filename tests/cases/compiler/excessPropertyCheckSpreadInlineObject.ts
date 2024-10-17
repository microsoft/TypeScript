// @strict: true
// @noemit: true

type MyObject = { foo: number; bar?: number };

const b: MyObject = {
    foo: 1,
    ...{
        bar: 2,
        excessProperty: 3,
    },
};

const b2 = {
    foo: 1,
    ...{
        bar: 2,
        excessProperty: 3,
    },
} satisfies MyObject;