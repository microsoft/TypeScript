//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserUnfinishedTypeNameBeforeKeyword1.ts] ////

//// [parserUnfinishedTypeNameBeforeKeyword1.ts]
var x: TypeModule1.
namespace TypeModule2 {
}


//// [parserUnfinishedTypeNameBeforeKeyword1.js]
var x;
