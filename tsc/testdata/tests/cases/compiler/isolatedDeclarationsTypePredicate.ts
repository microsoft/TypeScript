// @isolatedDeclarations: true
// @declaration: true

export function isString(value: unknown) {
  return typeof value === "string";
}

export function isExplicitString(value: unknown): value is string {
  return typeof value === "string";
}
