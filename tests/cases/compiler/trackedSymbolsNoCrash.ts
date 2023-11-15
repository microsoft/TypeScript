// @module: commonjs
// @lib: es2018
// @strict: true
// @declaration: true

// @filename: node_modules/typescript/package.json
{
  "name": "typescript",
  "types": "/.ts/typescript.internal.d.ts"
}

// @filename: index.ts
import ts = require("typescript");

// TODO(jakebailey): this test should not depend on typescript itself
export const isNodeOfType =
  <NodeType extends ts.SyntaxKind>(nodeType: NodeType) =>
  (
    node: ts.ForEachChildNodes | null | undefined,
  ): node is Extract<ts.ForEachChildNodes, { kind: NodeType }> =>
    node?.kind === nodeType;
