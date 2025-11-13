// @strict: true
// @declaration: true

// @filename: a.ts
export const g = (v: "outer") => {
    const f = (v: "inner") => () => null! as typeof v;
    const r = f(null!)
    return r;
}