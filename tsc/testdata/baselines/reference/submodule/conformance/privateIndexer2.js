//// [tests/cases/conformance/classes/indexMemberDeclarations/privateIndexer2.ts] ////

//// [privateIndexer2.ts]
// private indexers not allowed

var x = {
    private [x: string]: string;
}

var y: {
    private[x: string]: string;
}

//// [privateIndexer2.js]
// private indexers not allowed
var x = {
    [x]: string, string,
};
var y;
