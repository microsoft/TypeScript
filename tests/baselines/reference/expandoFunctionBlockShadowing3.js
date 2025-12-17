//// [tests/cases/compiler/expandoFunctionBlockShadowing3.ts] ////

//// [expandoFunctionBlockShadowing3.ts]
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




//// [expandoFunctionBlockShadowing3.d.ts]
export declare function Z(): void;
export declare namespace Z {
    var test: string;
}
