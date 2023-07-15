//// [tests/cases/compiler/commentsOnObjectLiteralAccessors.ts] ////

//// [commentsOnObjectLiteralAccessors.ts]
var v = {
    /**
     * Get accessor
     */
    get bar(): number {
     return 12;
    },

    /**
     * Set accessor
     */
    set bar(v: number) {}
   }
   

//// [commentsOnObjectLiteralAccessors.js]
var v = {
    /**
     * Get accessor
     */
    get bar() {
        return 12;
    },
    /**
     * Set accessor
     */
    set bar(v) { }
};


//// [commentsOnObjectLiteralAccessors.d.ts]
declare var v: {
    /**
     * Get accessor
     */
    get bar(): number;
    /**
     * Set accessor
     */
    set bar(v: number);
};
