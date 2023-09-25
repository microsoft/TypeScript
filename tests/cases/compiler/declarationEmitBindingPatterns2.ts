// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

// https://github.com/microsoft/TypeScript/issues/55439

function foo(): { y: 1 } {
  return { y: 1 };
}
  
export const { y = 0 } = foo();
