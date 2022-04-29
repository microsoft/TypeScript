//@module: amd
// @declaration: true
// @outFile: ./out.js
// @filename: file1.ts
/// <amd-module name="mynamespace::SomeModuleA" />
export class Foo {}
// @filename: file2.ts
/// <amd-module name="mynamespace::SomeModuleB" />
export class Bar {}