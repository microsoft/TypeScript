// Debug script to understand the AST structure in the fourslash test case
const ts = require('./built/local/typescript.js');

// This exactly matches our fourslash test case structure
const code = `import type { ObjWithSym } from "./exportsSymbol";

export declare const thing: ObjWithSym;

function main() {
    thing[];
}`;

const sourceFile = ts.createSourceFile('usesSymbol.ts', code, ts.ScriptTarget.Latest, true);

function printNode(node, depth = 0) {
    const indent = ' '.repeat(depth * 2);
    console.log(`${indent}${ts.SyntaxKind[node.kind]} (${node.pos}-${node.end}): "${code.substring(node.pos, node.end).replace(/\n/g, '\\n')}"`);
    if (node.getChildCount && node.getChildCount() > 0) {
        node.forEachChild(child => printNode(child, depth + 1));
    }
}

console.log('AST Structure:');
printNode(sourceFile);

// Find the position inside the brackets in the element access expression
const bracketPos = code.indexOf('thing[') + 6;
console.log(`\nLooking at position ${bracketPos} (inside thing[])`);

// Get the token at that position
const tokenAtPos = ts.getTokenAtPosition(sourceFile, bracketPos);
console.log(`Token at position: ${ts.SyntaxKind[tokenAtPos.kind]} "${code.substring(tokenAtPos.pos, tokenAtPos.end)}"`);

// Get touching property name
const touchingPropertyName = ts.getTouchingPropertyName(sourceFile, bracketPos);
console.log(`Touching property name: ${ts.SyntaxKind[touchingPropertyName.kind]} "${code.substring(touchingPropertyName.pos, touchingPropertyName.end)}"`);

// Check if it's a valid type-only alias use site
console.log(`Is valid type-only alias use site: ${ts.isValidTypeOnlyAliasUseSite(touchingPropertyName)}`);

// Let's also check what the parent is
if (touchingPropertyName.parent) {
    console.log(`Parent: ${ts.SyntaxKind[touchingPropertyName.parent.kind]}`);
}
console.log(`Is expression node: ${ts.isExpressionNode(touchingPropertyName)}`);
console.log(`Is in expression context: ${ts.isInExpressionContext(touchingPropertyName)}`);