/// <reference path="fourslash.ts" />

////
//// interface Person {
////     name:string;
////     age: number;
//// }
//// let person: Person = {
////     name:"Obi-Wan Kenobi",
////     age: 38
//// };
//// let ground:object = { type:"high" };
//// function greet(from: typeof person, message:"hello there"):void { }
//// let landing:(type: string) => string = function (type:"another"):"sad" | "happy" {
////     return "happy"; 
//// };
////

// 1. Variable, field, parameter and return types should all be affected.
// 2. Make sure colons in object literals aren't affected.
// 3. Check one-liner object literals on the same line as type annotations as well, just in case.

//format.setOption("insertSpaceAfterTypeAnnotation", true); // true should be the default option.
format.document();
verify.currentFileContentIs(
`
interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: "Obi-Wan Kenobi",
    age: 38
};
let ground: object = { type: "high" };
function greet(from: typeof person, message: "hello there"): void { }
let landing: (type: string) => string = function(type: "another"): "sad" | "happy" {
    return "happy";
};
`
);

format.setOption("insertSpaceAfterTypeAnnotation", false);
format.document();
verify.currentFileContentIs(
`
interface Person {
    name:string;
    age:number;
}
let person:Person = {
    name: "Obi-Wan Kenobi",
    age: 38
};
let ground:object = { type: "high" };
function greet(from:typeof person, message:"hello there"):void { }
let landing:(type:string) => string = function(type:"another"):"sad" | "happy" {
    return "happy";
};
`
);
