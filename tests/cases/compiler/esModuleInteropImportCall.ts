// @esModuleInterop: true
// @lib: es6
// @Filename: foo.d.ts
declare function foo(): void;
declare namespace foo {}
export = foo;

// @Filename: index.ts
import("./foo").then(f => {
    f.default;
});