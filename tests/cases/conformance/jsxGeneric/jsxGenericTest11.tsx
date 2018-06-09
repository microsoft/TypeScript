// @filename: file.tsx
// @jsx: transpile
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
