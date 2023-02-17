/// <reference path="fourslash.ts" />

// @Filename: ./declarations.d.ts
//// /**
//// * @param {} [x=someComputedValue()]
//// * @param {} [y=someAnotherComputedValue()]
//// */
//// export function foo(x?: any, y?: any): void;

// @Filename: foo.ts
//// import { foo } './declarations.d.ts'
//// foo(/*1*/)

goTo.file('foo.ts')

verify.signatureHelp(
    {
        marker: "1",
        text: "foo(x?: any = someComputedValue(), y?: any = someAnotherComputedValue()): void",
        parameterName: "x",
        parameterSpan: "x?: any = someComputedValue()",
        tags: [
            {
                name: 'param',
                text: [{
                    text: 'x',
                    kind: 'text'
                }],
            },
            {
                name: 'param',
                text: [{
                    text: 'y',
                    kind: 'text'
                }],
            }
        ],
    }
)
