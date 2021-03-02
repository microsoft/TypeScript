//// [tests/cases/compiler/unusedImportWithSpread.ts] ////

//// [a.ts]
export default { a: 1 };

//// [b1.ts]
import a from "./a";

const b1 = {} as unknown;
({
    // @ts-ignore
    ...b1,
    a
})

//// [b2.ts]
import a from "./a";

const b2 = {} as never;
({
    // @ts-ignore
    ...b2,
    a
})


//// [a.js]
export default { a: 1 };
//// [b1.js]
import a from "./a";
const b1 = {};
({
    // @ts-ignore
    ...b1,
    a
});
//// [b2.js]
import a from "./a";
const b2 = {};
({
    // @ts-ignore
    ...b2,
    a
});
