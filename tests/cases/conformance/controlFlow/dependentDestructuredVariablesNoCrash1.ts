// @strict: true
// @declaration: true

// https://github.com/microsoft/TypeScript/issues/63044

function f() 

function f([first, undefined]?: () => any = undefined) {}
