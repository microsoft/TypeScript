// @declaration: true

// https://github.com/microsoft/TypeScript/issues/55075

export const a = {
  new(x: number) { return x + 1 }
}
export const b = {
  "new"(x: number) { return x + 1 }
}
export const c = {
  ["new"](x: number) { return x + 1 }
}
