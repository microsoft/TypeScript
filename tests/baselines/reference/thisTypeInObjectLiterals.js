//// [thisTypeInObjectLiterals.ts]
let o = {
    d: "bar",
    m() {
        return this.d.length;
    }
}


//// [thisTypeInObjectLiterals.js]
var o = {
    d: "bar",
    m: function () {
        return this.d.length;
    }
};
