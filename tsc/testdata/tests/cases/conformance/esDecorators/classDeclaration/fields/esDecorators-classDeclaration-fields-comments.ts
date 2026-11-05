// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

// The field after a decorated field has a JSDoc comment, and the fields have no
// trailing semicolons. The comment must be emitted once, on the field it belongs to.
class C {
    @dec a = 1
    /** doc b */
    @dec b = 2
    /** doc c */
    c = 3
    @dec d = [
        1,
        2 /* trailing comment inside the array */
    ]
    // line comment e
    e = 5
    @dec f = 6 /* trailing comment of f */
    /** doc g */
    g = 7
    @dec h = 8 /* trailing comment of h */;
    /** doc i */
    i = 9
    @dec static j = 10
    /** doc k */
    static k = 11
}
