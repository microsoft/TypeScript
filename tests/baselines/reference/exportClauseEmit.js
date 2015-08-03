//// [exportClauseEmit.ts]
var str = "Hello";
// Change str
str = "Hello World!!!";
export {str};

//// [exportClauseEmit.js]
var str = "Hello";
exports.str = str;
// Change str
str = "Hello World!!!";


//// [exportClauseEmit.d.ts]
declare var str: string;
export { str };
