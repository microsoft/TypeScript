//// [tests/cases/compiler/jsxFactoryIdentifier.ts] ////

//// [Element.ts]
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

//// [test.tsx]
import { Element} from './Element';
let createElement = Element.createElement;
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


//// [Element.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.Element = void 0;
var Element;
(function (Element) {
    function isElement(el) {
        return el.markAsChildOfRootElement !== undefined;
    }
    Element.isElement = isElement;
    function createElement(args) {
        return {};
    }
    Element.createElement = createElement;
})(Element = exports.Element || (exports.Element = {}));
exports.createElement = Element.createElement;
function toCamelCase(text) {
    return text[0].toLowerCase() + text.substring(1);
}
//# sourceMappingURL=Element.js.map
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Element_1 = require("./Element");
let createElement = Element_1.Element.createElement;
let c;
class A {
    view() {
        return [
            createElement("meta", { content: "helloworld" }),
            createElement("meta", { content: c.a.b })
        ];
    }
}
//# sourceMappingURL=test.js.map