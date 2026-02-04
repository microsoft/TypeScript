// @strict: true
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/63093

const [r0Def, r0, r1Def, as, string, r1, r2, r3Def, r3]: boolean = (test as number < string > ).ranges();
