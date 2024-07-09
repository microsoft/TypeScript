/// <reference path="fourslash.ts" />

// @Filename: /user.ts
////foo;

// @Filename: /user2.ts
////unnamed;

// @Filename: /user3.ts
////reExportUnnamed;

// @Filename: /reExportNamed.ts
////export { default } from "./named";

// @Filename: /reExportUnnamed.ts
////export { default } from "./unnamed";

// @Filename: /named.ts
////function foo() {}
////export default foo;

// @Filename: /unnamed.ts
////export default 0;

goTo.file("/user.ts");
verify.importFixAtPosition([
`import foo from "./named";

foo;`,
`import foo from "./reExportNamed";

foo;`,
]);

goTo.file("/user2.ts");
verify.importFixAtPosition([
`import unnamed from "./unnamed";

unnamed;`,
`import unnamed from "./reExportUnnamed";

unnamed;`,
]);

goTo.file("/user3.ts");
verify.importFixAtPosition([
`import reExportUnnamed from "./reExportUnnamed";

reExportUnnamed;`]);
