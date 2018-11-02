/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export class Example {
////    prop: any;
////    constructor(private readonly arg: any) {
////        this.prop = arg;
////    }
////}

verify.codeFix({
    description: "Remove declaration for: 'arg'",
    newFileContent:
`export class Example {
    prop: any;
    constructor(arg: any) {
        this.prop = arg;
    }
}`,
});
