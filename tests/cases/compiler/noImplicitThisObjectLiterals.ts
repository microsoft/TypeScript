// @noImplicitThis: true
let o = {
    d: this, // error, this: any
    m() {
        return this.d.length; // error, this: any
    },
    f: function() {
        return this.d.length; // error, this: any
    }
}
