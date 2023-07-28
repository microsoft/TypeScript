// @strict: true
// @declaration: true
// @target: es6

// repro from https://github.com/microsoft/TypeScript/issues/54811

const c = "C"

export function decl () {}
decl["B"] = 'foo'

export function decl2 () {}
decl2[c] = 0

export const arrow = () => {}
arrow["B"] = 'bar'

export const arrow2 = () => {}
arrow2[c] = 100
