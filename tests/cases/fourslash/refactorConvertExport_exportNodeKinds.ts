/// <reference path='fourslash.ts' />

// @Filename: /fn.ts
////export function f() {}

// @Filename: /cls.ts
////export class C {}

// @Filename: /interface.ts
////export interface I {}

// @Filename: /enum.ts
////export const enum E {}

// @Filename: /namespace.ts
////export namespace N {}

// @Filename: /type.ts
////export type T = number;

// @Filename: /var_unused.ts
////export const x = 0;

// @Filename: /var_unused_noInitializer.ts
////export const x;

// @Filename: /var_used.ts
////export const x = 0;
////x;

// @Filename: /var_with_type.ts
////export const fn: (n: number) => number = (n) => 1;

const tests: { [fileName: string]: string | undefined } = {
    fn: `export default function f() {}`,

    cls: `export default class C {}`,

    interface: `export default interface I {}`,

    enum:
`const enum E {}
export default E;
`,

    namespace:
`namespace N {}

export default N;
`,

    type:
`type T = number;
export default T;
`,

    var_unused: `export default 0;`,

    var_unused_noInitializer: undefined,

    var_used:
`const x = 0;
export default x;
x;`,

    var_with_type:
`const fn: (n: number) => number = (n) => 1;
export default fn;
`,
};

for (const name in tests) {
    const newContent = tests[name];
    const fileName = `/${name}.ts`;
    goTo.selectAllInFile(fileName);
    if (newContent === undefined) {
        verify.refactorsAvailable([]);
    }
    else {
        edit.applyRefactor({
            refactorName: "Convert export",
            actionName: "Convert named export to default export",
            actionDescription: "Convert named export to default export",
            newContent: { [fileName]: newContent },
        });
    }
}
