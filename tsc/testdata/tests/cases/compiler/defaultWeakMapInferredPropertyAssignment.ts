// @target: esnext
// @lib: es2023
// @strict: true
const frameInfo = { frames: new WeakMap() };
const target: { frames: WeakMap<{ id: string }, number> } = frameInfo;
