// @declaration: true
// @noImplicitAny: true

const c: any = null;
const src = ["hello", c];

const okayDest: string[] = src;
const badDest = number[] = src;