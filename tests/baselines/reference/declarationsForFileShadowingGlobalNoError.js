//// [tests/cases/compiler/declarationsForFileShadowingGlobalNoError.ts] ////

//// [dom.ts]
export type DOMNode = Node;
//// [custom.ts]
export type Node = {};
//// [index.ts]
import { Node } from './custom'
import { DOMNode } from './dom'

type Constructor = new (...args: any[]) => any

export const mixin = (Base: Constructor) => {
  return class extends Base {
    get(domNode: DOMNode) {}
  }
}

//// [dom.js]
export {};
//// [custom.js]
export {};
//// [index.js]
export const mixin = (Base) => {
    return class extends Base {
        get(domNode) { }
    };
};


//// [dom.d.ts]
export type DOMNode = Node;
//// [custom.d.ts]
export type Node = {};
//// [index.d.ts]
import { DOMNode } from './dom';
type Constructor = new (...args: any[]) => any;
export declare const mixin: (Base: Constructor) => {
    new (...args: any[]): {
        [x: string]: any;
        get(domNode: DOMNode): void;
    };
};
export {};
