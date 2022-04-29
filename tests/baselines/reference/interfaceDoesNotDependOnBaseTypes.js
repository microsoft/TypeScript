//// [interfaceDoesNotDependOnBaseTypes.ts]
var x: StringTree;
if (typeof x !== "string") {
    x.push("");
    x.push([""]);
}

type StringTree = string | StringTreeArray;
interface StringTreeArray extends Array<StringTree> { }

//// [interfaceDoesNotDependOnBaseTypes.js]
var x;
if (typeof x !== "string") {
    x.push("");
    x.push([""]);
}
