//@jsx: react
//@target: es6
//@module: commonjs
//@jsxFactory: id1 id2

// @filename: Element.ts
declare namespace JSX {
    interface Element {
        name: string;
        isIntrinsic: boolean;
        isCustomElement: boolean;
        toString(renderId?: number): string;
        bindDOM(renderId?: number): number;
        resetComponent(): void;
        instantiateComponents(renderId?: number): number;
        props: any;
    }
}
export namespace Element {
    export function isElement(el: any): el is JSX.Element {
        return el.markAsChildOfRootElement !== undefined;
    }

    export function createElement(args: any[]) {

        return {
        }
    }
}

export let createElement = Element.createElement;

function toCamelCase(text: string): string {
    return text[0].toLowerCase() + text.substring(1);
}

// @filename: test.tsx
import { Element} from './Element';

let c: {
	a?: {
		b: string
	}
};

class A {
	view() {
		return [
			<meta content="helloworld"></meta>,
			<meta content={c.a!.b}></meta>
		];
	}
}