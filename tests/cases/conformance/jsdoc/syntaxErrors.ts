// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: dummyType.d.ts
declare class C<T> { t: T }

// @Filename: badTypeArguments.js
/** @param {C.<>} x */
/** @param {C.<number,>} y */
function f(x, y) {
    return x.t + y.t;
}
var x = f({ t: 1000 }, { t: 3000 });
