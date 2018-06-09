// @filename: file.tsx
// @jsx: transpile
/* @jsx-mode generic */

interface Attributes {
    class?:     string;
    id?:        string;
    onclick?:   (this: HTMLElement, ev: MouseEvent) => void;
}
 
class Div {
	constructor(attrs?: Attributes, ...children:Span[]) {
	}
	
	public dummy() {
	}
}

class Span {
	constructor(attrs?: Attributes, ...children:Div[]) {
	}
}

function test() {
    return <Div class="test">
                <Span/>
           </Div>;
}