// @checkJs: true
// @lib: dom,esnext
// @outDir: dist/
// @declaration: true
// @filename: specializeTag5.js

const fileInput1 =
    /** @specialize {HTMLInputElement} */
    (document.querySelector("input[type=file]"))

/** @specialize {HTMLInputElement} */
const fileInput2 =
    document.querySelector("input[type=file]")
