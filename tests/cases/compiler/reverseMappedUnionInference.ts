// @strict: true
// @noEmit: true

interface AnyExtractor<Result> {
  matches: (node: any) => boolean;
  extract: (node: any) => Result | undefined;
}

interface Extractor<T, Result> {
  matches: (node: unknown) => node is T;
  extract: (node: T) => Result | undefined;
}

declare function createExtractor<T, Result>(params: {
  matcher: (node: unknown) => node is T;
  extract: (node: T) => Result;
}): Extractor<T, Result>;

interface Identifier {
  kind: "identifier";
  name: string;
}

declare function isIdentifier(node: unknown): node is Identifier;

const identifierExtractor = createExtractor({
  matcher: isIdentifier,
  extract: (node) => {
    return {
      node,
      kind: "identifier" as const,
      value: node.name,
    };
  },
});

interface StringLiteral {
  kind: "stringLiteral";
  value: string;
}

declare function isStringLiteral(node: unknown): node is StringLiteral;

const stringExtractor = createExtractor({
  matcher: isStringLiteral,
  extract: (node) => {
    return {
      node,
      kind: "string" as const,
      value: node.value,
    };
  },
});

declare function unionType<Result extends readonly unknown[]>(parsers: {
  [K in keyof Result]: AnyExtractor<Result[K]>;
}): AnyExtractor<Result[number]>;

const myUnion = unionType([identifierExtractor, stringExtractor]);
