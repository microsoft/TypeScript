// @removeComments: false
// @target: ES5
// @declaration: true

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
   