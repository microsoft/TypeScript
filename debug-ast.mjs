import * as ts from "./built/local/typescript.js";

const sourceFile = ts.createSourceFile(
    "test.ts",
    `const { c, f }: keyof = { c: 0, f };`,
    ts.ScriptTarget.Latest,
    true
);

function printNode(node, indent = 0) {
    const prefix = "  ".repeat(indent);
    console.log(`${prefix}${ts.SyntaxKind[node.kind]}`);
    if (ts.isTypeOperatorNode(node)) {
        console.log(`${prefix}  operator: ${ts.SyntaxKind[node.operator]}`);
        console.log(`${prefix}  type: ${ts.SyntaxKind[node.type.kind]}`);
    }
    ts.forEachChild(node, child => printNode(child, indent + 1));
}

printNode(sourceFile);
