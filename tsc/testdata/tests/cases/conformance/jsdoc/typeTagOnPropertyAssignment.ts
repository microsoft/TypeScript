// @target: es2015
// @noEmit: true
// @checkJs: true
// @filename: typeTagOnPropertyAssignment.js
const o = {
    /**
     * @type {"a"}
     */
    a: "a",
    /** @type {() => 'b'} */
    n: () => 'b'
};
o.a
o.n
