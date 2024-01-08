///<reference path="fourslash.ts"/>

////class C1 implements Array<string>{
////}
////
////class C2 implements Number{
////}
////
////class C3 extends Array<string>{
////}
////
////class C4 extends Number{
////}

format.document();
verify.currentFileContentIs(
`class C1 implements Array<string> {
}

class C2 implements Number {
}

class C3 extends Array<string> {
}

class C4 extends Number {
}`);
