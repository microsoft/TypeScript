//// [commentsOnObjectLiteral4.ts]

var v = {
 /**
  * @type {number}
  */
 get bar(): number {
  return this._bar;
 }
}

//// [commentsOnObjectLiteral4.js]
var v = {
    /**
    * @type {number}
    */
    get bar() {
        return this._bar;
    }
};
