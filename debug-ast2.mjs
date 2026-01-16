import * as ts from "./built/local/typescript.js";

const sourceFile = ts.createSourceFile(
    "test.ts",
    `const { c, f }: keyof = { c: 0, f };`,
    ts.ScriptTarget.Latest,
    true
);

function printNode(node, indent = 0) {
    const prefix = "  ".repeat(indent);
    let info = `${prefix}${ts.SyntaxKind[node.kind]}`;
    if (ts.isTypeOperatorNode(node)) {
        info += ` (operator: ${ts.SyntaxKind[node.operator]})`;
    }
    if (ts.isIdentifier(node)) {
        info += ` (text: "${node.text}")`;
    }
    console.log(info);
    ts.forEachChild(node, child => printNode(child, indent + 1));
}

printNode(sourceFile);
