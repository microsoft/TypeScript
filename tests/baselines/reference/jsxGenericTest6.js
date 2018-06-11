//// [file.tsx]
/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */

interface HTMLAttributes {
    class?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}
 
export interface AddArray extends Array<AddNode> {}
export type AddNode    = HTMLElement|string|AddArray|false;

function createElement(tagName:"div"|"span", attrs?: HTMLAttributes, ...children:AddNode[]): HTMLElement {
    return document.createElement(tagName);
}

function test() {
    return <div class="test">
                <span/>
           </div>;
}

//// [file.js]
"use strict";
/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */
exports.__esModule = true;
function createElement(tagName, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return document.createElement(tagName);
}
function test() {
    return createElement("div", { "class": "test" },
        createElement("span", null));
}
