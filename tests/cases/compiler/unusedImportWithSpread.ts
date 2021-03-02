// @target: esnext

// @filename: a.ts
export default { a: 1 };

// @filename: b1.ts
import a from "./a";

const b1 = {} as unknown;
({
    // @ts-ignore
    ...b1,
    a
})

// @filename: b2.ts
import a from "./a";

const b2 = {} as never;
({
    // @ts-ignore
    ...b2,
    a
})
