// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60202

declare class Document<Parent> {}

declare class BaseItem extends Document<typeof Item> {}

declare function ClientDocumentMixin<
  BaseClass extends new (...args: any[]) => any,
>(Base: BaseClass): any;

declare class Item extends ClientDocumentMixin(BaseItem) {}

export {};
