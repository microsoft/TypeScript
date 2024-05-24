/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @moduleResolution: node
// @target: es2018
// @jsx: react-jsx

////export function two() {
////    const y = "";
////    return {} as typeof y;
////}
////
////export function three() {
////    type Z = string;
////    return {} as Z;
////}

verify.codeFix({
    description: "Add return type '\"\"'",
    index: 0,
    newFileContent:
`export function two(): "" {
    const y = "";
    return {} as typeof y;
}

export function three() {
    type Z = string;
    return {} as Z;
}`,
});


verify.codeFix({
    description: "Add return type 'string'",
    index: 1,
    newFileContent:
`export function two() {
    const y = "";
    return {} as typeof y;
}

export function three(): string {
    type Z = string;
    return {} as Z;
}`,
});