// @allowJs: true
// @outDir: ./out
// @filename: file.js
// @ts-check
const obj = {
    x: 1,
    y: 2
};

/**
 * @type {keyof typeof obj}
 */
let selected = "x";
selected = "z"; // should fail
