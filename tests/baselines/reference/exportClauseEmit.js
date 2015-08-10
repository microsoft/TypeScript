//// [exportClauseEmit.ts]
var str = "Hello";
// Change str
str = "Hello World!!!";
export {str};

//// [exportClauseEmit.js]
var str = "Hello";
// Change str
str = "Hello World!!!";
exports.str = str;


//// [exportClauseEmit.d.ts]
declare var str: string;
export { str };
