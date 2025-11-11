// @strict: true
// @noemit: true

declare const someConditions: boolean[];
// bar is optional
type MyObj = { foo: number; bar?: number };
const yWithExtraProp = { Y: 2 };
const zWithExtraProp = { Z: 2, excessPropertyZ: "Z" };

const v1: MyObj = {
    foo: 1,
    ...(someConditions[0]
        ? someConditions[1]
            ? {
                bar: 2,
                excessPropertyA: "A",
            }
            : someConditions[2]
                ? someConditions[3]
                    ? {
                        bar: 2,
                        excessPropertyB: "B",
                    }
                    : { bar: 2 }
                : someConditions[4]
            ? {
                foo: 2,
                excessPropertyC: "C",
            }
            : {}
        : { excessPropertyD: "D" }),
};

// no errors by design since the objects are not defined inline
const v2: MyObj = {
    ...(someConditions[0]
        ? someConditions[1]
            ? { bar: 2 }
            : someConditions[2]
                ? someConditions[3]
                    ? yWithExtraProp
                    : { bar: 2 }
                : someConditions[4]
            ? { foo: 2 }
            : {}
        : zWithExtraProp),
    foo: 1,
};

