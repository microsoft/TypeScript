//// [file.tsx]
/* @jsx-mode generic */
/* @jsx-intrinsic-factory createElement */

interface HTMLAttributes {
    class?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}



function createElement(tagName:"div", attrs?: HTMLAttributes, ...children:HTMLElement[]): HTMLDivElement;
function createElement(tagName:"span", attrs?: HTMLAttributes, ...children:HTMLElement[]): HTMLSpanElement;
function createElement(tagName:"br"): HTMLBRElement;
function createElement(tagName:"div"|"span"|"br", attrs?: HTMLAttributes, ...children:HTMLElement[]): HTMLElement {
    return document.createElement(tagName);
}

function test() {
    return <div class="test">
                <span/>
                <br>
                    <span class=""/>
                </br>
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
        createElement("span", null),
        createElement("br", null,
            createElement("span", { "class": "" })));
}
