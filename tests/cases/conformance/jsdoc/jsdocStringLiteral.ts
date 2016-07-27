// @allowJs: true
// @filename: in.js
// @out: out.js
/**
 * @param {'literal'} p1
 * @param {"literal"} p2
 * @param {'literal' | 'other'} p3
 * @param {'literal' | number} p4
 */
function f(p1, p2, p3, p4) {
    return p1 + p2 + p3 + p4 + '.';
}
