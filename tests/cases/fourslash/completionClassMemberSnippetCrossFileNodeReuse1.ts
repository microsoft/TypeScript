/// <reference path="fourslash.ts" />

// @strict: true

// @filename: KlassConstructor.ts

//// type GenericConstructor<T> = new (...args: any[]) => T;
//// export type KlassConstructor<Cls extends GenericConstructor<any>> =
////   GenericConstructor<InstanceType<Cls>> & { [k in keyof Cls]: Cls[k] };

// @filename: ElementNode.ts
//// import { KlassConstructor } from "./KlassConstructor";
////
//// export type NodeKey = string;
////
//// export class ElementNode {
////   ["constructor"]!: KlassConstructor<typeof ElementNode>;
//// }

// @filename: CollapsibleContainerNode.ts
//// import { ElementNode, NodeKey } from "./ElementNode";
////
//// export class CollapsibleContainerNode extends ElementNode {
////   __open: boolean;
////
////   /*1*/
//// }

format.setFormatOptions({
  insertSpaceAfterConstructor: false,
});

verify.completions({
    marker: "1",
    preferences: {
        includeCompletionsWithClassMemberSnippets: true,
        includeCompletionsWithInsertText: true,
    },
    includes: [{
      name: `["constructor"]`,
      insertText: `["constructor"]: KlassConstructor<typeof ElementNode>;`,
      filterText: `["constructor"]`,
      hasAction: true,
      source: 'ClassMemberSnippet/'
    }],
    isNewIdentifierLocation: true,
});
