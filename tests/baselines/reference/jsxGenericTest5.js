//// [file.tsx]
/* @jsx-mode generic */

function test() {
    return <div class="test">
                <span/>
           </div>;
}

//// [file.js]
/* @jsx-mode generic */
function test() {
    return ERROR_UNKNOWN_INTRINSIC_FACTORY("div", { "class": "test" },
        ERROR_UNKNOWN_INTRINSIC_FACTORY("span", null));
}
