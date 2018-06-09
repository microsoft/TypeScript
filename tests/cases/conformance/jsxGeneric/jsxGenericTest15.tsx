// @filename: file.tsx
// @jsx: transpile
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