/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export default function foo(): void {}

// @Filename: /b.ts
////export { default } from "./a";

// @Filename: /user.ts
////[|foo;|]

goTo.file("/user.ts");
verify.importFixAtPosition([
`import foo from "./a";

foo;`,
`import foo from "./b";

foo;`,
]);
