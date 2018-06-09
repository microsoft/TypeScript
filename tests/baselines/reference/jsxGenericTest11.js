//// [file.tsx]
/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */

interface HTMLAttributes {
    class?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}
 
export interface IContainer {
    readonly container: HTMLElement;
}
export interface AddArray extends Array<AddNode> {}
export type AddNode    = HTMLElement|string|IContainer|AddArray|false;

function createElement(tagName:"div"|"span", attrs?: HTMLAttributes, ...children:AddNode[]): HTMLElement {
    return document.createElement(tagName);
}

function test() {
    return <div class="test">
                <Simple text="test"/>
                <FunctionContainer>
                    <span />
                </FunctionContainer>
                <ClassContainer>
                    <span />
                    { false }
                </ClassContainer>
                { false }
           </div>;
}

function Simple(attr: { text:string }) {
    return <span>{ attr.text }</span>;
}

function FunctionContainer(attr: { }, ...children:AddNode[]) {
    return <div>{ children }</div>;
}

class ClassContainer implements IContainer {
    public container:HTMLElement;

    constructor(attrs?: {}, ...children:AddNode[]) {
        this.container = <div>{ children }</div>;
	}
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
        Simple({ text: "test" }),
        FunctionContainer(null,
            createElement("span", null)),
        new ClassContainer(null,
            createElement("span", null),
            false),
        false);
}
function Simple(attr) {
    return createElement("span", null, attr.text);
}
function FunctionContainer(attr) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return createElement("div", null, children);
}
var ClassContainer = /** @class */ (function () {
    function ClassContainer(attrs) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        this.container = createElement("div", null, children);
    }
    return ClassContainer;
}());
