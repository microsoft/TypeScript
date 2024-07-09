//// [tests/cases/compiler/commentsVarDecl.ts] ////

//// [commentsVarDecl.ts]
/** Variable comments*/
var myVariable = 10; // This trailing Comment1

/** This is another variable comment*/
var anotherVariable = 30;

// shouldn't appear
var aVar = "";

/** this is multiline comment
  * All these variables are of number type */
var anotherAnotherVariable = 70; /* these are multiple trailing comments */ /* multiple trailing comments */

/** Triple slash multiline comment*/
/** another line in the comment*/
/** comment line 2*/
var x = 70; /* multiline trailing comment 
this is multiline trailing comment */
/** Triple slash comment on the assignment shouldnt be in .d.ts file*/
x = myVariable;

/** triple slash comment1*/
/** jsdocstyle comment - only this comment should be in .d.ts file*/
var n = 30;

/** var deckaration with comment on type as well*/
var y = /** value comment */ 20;

/// var deckaration with comment on type as well
var yy =
    /// value comment
    20;

/** comment2 */
var z = /** lambda comment */ (x: number, y: number) => x + y;

var z2: /** type comment*/ (x: number) => string;

var x2 = z2;

var n4: (x: number) => string;
n4 = z2;

//// [commentsVarDecl.js]
/** Variable comments*/
var myVariable = 10; // This trailing Comment1
/** This is another variable comment*/
var anotherVariable = 30;
// shouldn't appear
var aVar = "";
/** this is multiline comment
  * All these variables are of number type */
var anotherAnotherVariable = 70; /* these are multiple trailing comments */ /* multiple trailing comments */
/** Triple slash multiline comment*/
/** another line in the comment*/
/** comment line 2*/
var x = 70; /* multiline trailing comment
this is multiline trailing comment */
/** Triple slash comment on the assignment shouldnt be in .d.ts file*/
x = myVariable;
/** triple slash comment1*/
/** jsdocstyle comment - only this comment should be in .d.ts file*/
var n = 30;
/** var deckaration with comment on type as well*/
var y = /** value comment */ 20;
/// var deckaration with comment on type as well
var yy = 
/// value comment
20;
/** comment2 */
var z = /** lambda comment */ function (x, y) { return x + y; };
var z2;
var x2 = z2;
var n4;
n4 = z2;


//// [commentsVarDecl.d.ts]
/** Variable comments*/
declare var myVariable: number;
/** This is another variable comment*/
declare var anotherVariable: number;
declare var aVar: string;
/** this is multiline comment
  * All these variables are of number type */
declare var anotherAnotherVariable: number;
/** Triple slash multiline comment*/
/** another line in the comment*/
/** comment line 2*/
declare var x: number;
/** triple slash comment1*/
/** jsdocstyle comment - only this comment should be in .d.ts file*/
declare var n: number;
/** var deckaration with comment on type as well*/
declare var y: number;
declare var yy: number;
/** comment2 */
declare var z: (x: number, y: number) => number;
declare var z2: (x: number) => string;
declare var x2: (x: number) => string;
declare var n4: (x: number) => string;
