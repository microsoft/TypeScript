//// [tests/cases/compiler/commentsOnObjectLiteral4.ts] ////

//// [commentsOnObjectLiteral4.ts]
var v = {
 /**
  * @type {number}
  */
 get bar(): number {
  return 12;
 }
}


//// [commentsOnObjectLiteral4.js]
"use strict";
var v = {
    /**
     * @type {number}
     */
    get bar() {
        return 12;
    }
};
