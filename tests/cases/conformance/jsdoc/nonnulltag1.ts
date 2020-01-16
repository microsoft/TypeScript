// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * @type {(()=>string)[]}
 */

let queue = [];
while (queue.length) {
    const top = /** @nonnull */(queue.pop());
    top();
}
