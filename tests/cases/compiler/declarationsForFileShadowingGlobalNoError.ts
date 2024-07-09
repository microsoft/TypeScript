// @declaration: true
// @lib: dom,es6
// @filename: dom.ts
export type DOMNode = Node;
// @filename: custom.ts
export type Node = {};
// @filename: index.ts
import { Node } from './custom'
import { DOMNode } from './dom'

type Constructor = new (...args: any[]) => any

export const mixin = (Base: Constructor) => {
  return class extends Base {
    get(domNode: DOMNode) {}
  }
}