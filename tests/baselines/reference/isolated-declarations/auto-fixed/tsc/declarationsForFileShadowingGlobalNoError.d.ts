//// [tests/cases/compiler/declarationsForFileShadowingGlobalNoError.ts] ////

//// [dom.ts]
export type DOMNode = Node;
//// [custom.ts]
export type Node = {};
//// [index.ts]
import { Node } from './custom'
import { DOMNode } from './dom'

type Constructor = new (...args: any[]) => any

export const mixin = (Base: Constructor): {
    new(...args: any[]): {
        [x: string]: any
        get(domNode: DOMNode): void
    }
} => {
  return class extends Base {
    get(domNode: DOMNode) {}
  }
}

/// [Declarations] ////



//// [custom.d.ts]
export type Node = {};
//# sourceMappingURL=custom.d.ts.map
//// [dom.d.ts]
export type DOMNode = Node;
//# sourceMappingURL=dom.d.ts.map
//// [index.d.ts]
import { DOMNode } from './dom';
type Constructor = new (...args: any[]) => any;
export declare const mixin: (Base: Constructor) => new (...args: any[]) => {
    [x: string]: any;
    get(domNode: DOMNode): void;
};
export {};
//# sourceMappingURL=index.d.ts.map