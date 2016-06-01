//// [noImplicitThisObjectLiterals.ts]
let o = {
    d: this, // error, this: any
    m() {
        return this.d.length; // error, this: any
    },
    f: function() {
        return this.d.length; // error, this: any
    }
}


//// [noImplicitThisObjectLiterals.js]
var o = {
    d: this,
    m: function () {
        return this.d.length; // error, this: any
    },
    f: function () {
        return this.d.length; // error, this: any
    }
};
