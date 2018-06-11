// @filename: file.tsx
// @jsx: transpile
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
                <span/>
           </div>;
}