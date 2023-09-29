/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @lib: es2019

// @Filename: /code.ts
////const Enum = {
////    A: "X",
////} as const
////export const o1 = () => ({
////    [Enum.A]: 1
////})


verify.codeFix({
    description: 
`Add return type '{
    [Enum.A]: number;
}'` ,
    index: 0,
    newFileContent:
`const Enum = {
    A: "X",
} as const
export const o1 = (): {
    [Enum.A]: number
} => ({
    [Enum.A]: 1
})`
});
