/// <reference path='fourslash.ts' />

//// type NumberAndString = {
////     a: number
//// } & {
////     b: string
//// };
//// 
//// type NumberOrString = {
////     a: number
//// } | {
////     b: string
//// };
//// 
//// type Complexed =
////     Foo &
////     Bar |
////     Baz;


format.document();
verify.currentFileContentIs(`type NumberAndString = {
    a: number
} & {
    b: string
};

type NumberOrString = {
    a: number
} | {
    b: string
};

type Complexed =
    Foo &
    Bar |
    Baz;`);
