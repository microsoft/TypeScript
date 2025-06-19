//// [tests/cases/compiler/jsFileCompilationWithMapFileAsJsWithInlineSourceMap.ts] ////

//// [a.ts]
class c {
}

//// [b.js.map]
function foo() {
}

//// [b.js]
function bar() {
}

//// [a.js]
class c {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDO0NBQ04ifQ==
//// [b.js]
function bar() {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxHQUFHLEdBQUc7QUFBQyxDQUNmIn0=