// @target: es2015
declare const a: { x: () => void }
declare const b: { x?: () => void }

const c = { ...a, ...b };
