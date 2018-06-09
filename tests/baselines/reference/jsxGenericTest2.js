//// [file.tsx]
/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */

interface HTMLAttributes {
    class?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}
 
function createElement(tagName:"div"|"span", attrs?: HTMLAttributes, ...children:HTMLElement[]): HTMLElement {
    return document.createElement(tagName);
}

function test() {
    return <div class="test">
                <br/>
           </div>;
}

//// [file.js]
/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */
function createElement(tagName, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return document.createElement(tagName);
}
function test() {
    return createElement("div", { "class": "test" },
        createElement("br", null));
}
