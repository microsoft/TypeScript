// @strict: true
// @declaration: true
// @emitDeclarationOnly: true

export function Z() {}
Z.test = "foo";
const aliasTopZ = Z;
if (Math.random()) {
  const Z = function Z() {};
  if (Math.random()) {
    Z.test = 42;
  }

  const topZcheck: { (): void; test: string } = aliasTopZ;
  const blockZcheck: { (): void; test: number } = Z;
}
