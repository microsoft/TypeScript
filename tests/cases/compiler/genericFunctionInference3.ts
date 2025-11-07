// @strict: true
// @noEmit: true

const enum SyntaxKind {
  JSDocAllType,
  JSDocUnknownType,
}

interface Node {
  readonly kind: SyntaxKind;
}

interface TypeNode extends Node {
  _typeNodeBrand: any;
}

interface JSDocType extends TypeNode {
  _jsDocTypeBrand: any;
}

export interface JSDocAllType extends JSDocType {
  readonly kind: SyntaxKind.JSDocAllType;
}

export interface JSDocUnknownType extends JSDocType {
  readonly kind: SyntaxKind.JSDocUnknownType;
}

type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };

declare function createJSDocPrimaryTypeWorker<T extends JSDocType>(
  kind: T["kind"],
): Mutable<T>;

declare function memoizeOne<A extends string | number | boolean | undefined, T>(
  callback: (arg: A) => T,
): (arg: A) => T;

export const getJSDocPrimaryTypeCreateFunction = memoizeOne(
  <T extends JSDocType>(kind: T["kind"]) =>
    () =>
      createJSDocPrimaryTypeWorker(kind),
);
