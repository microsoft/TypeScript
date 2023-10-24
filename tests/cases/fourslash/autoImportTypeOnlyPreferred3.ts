// @module: esnext
// @moduleResolution: bundler

// @Filename: /a.ts
//// export class A {}
//// export class B {}

// @Filename: /b.ts
//// let x: A/*b*/;

// @Filename: /c.ts
//// import { A } from "./a";
//// new A();
//// let x: B/*c*/;

// @Filename: /d.ts
//// new A();
//// let x: B;

// @Filename: /ns.ts
//// export * as default from "./a";

// @Filename: /e.ts
//// let x: /*e*/ns.A;

goTo.marker("b");
verify.importFixAtPosition([
`import type { A } from "./a";

let x: A;`],
  /*errorCode*/ undefined,
  {
    preferTypeOnlyAutoImports: true,
  }
);

goTo.marker("c");
verify.importFixAtPosition([
`import { A, type B } from "./a";
new A();
let x: B;`],
  /*errorCode*/ undefined,
  {
    preferTypeOnlyAutoImports: true,
  }
);

goTo.file("/d.ts");
verify.codeFixAll({
  fixId: "fixMissingImport",
  fixAllDescription: "Add all missing imports",
  newFileContent:
`import { A, type B } from "./a";

new A();
let x: B;`,
  preferences: {
    preferTypeOnlyAutoImports: true,
  },
});

goTo.marker("e");
verify.importFixAtPosition([
`import type ns from "./ns";

let x: ns.A;`],
  /*errorCode*/ undefined,
  {
    preferTypeOnlyAutoImports: true,
  }
);
