// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3709

// @filename: main.js

function f1() {
    /** @type {Record<string, boolean>} */
    let merged_props = {};
    merged_props.foo = true;
    return merged_props;
}

function f2() {}
/** @type {Record<string, boolean>} */
f2.merged_props = {};
f2.merged_props.foo = true;
f2.merged_props
