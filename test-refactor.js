// Quick test to understand the AST structure of bug.ts
const ts = require("./built/local/typescript.js");
const fs = require("fs");

const code = fs.readFileSync("bug.ts", "utf8");
const sourceFile = ts.createSourceFile(
  "bug.ts",
  code,
  ts.ScriptTarget.Latest,
  true
);

console.log("=== AST Structure ===");

function printNode(node, indent = 0) {
  const prefix = "  ".repeat(indent);
  console.log(`${prefix}${ts.SyntaxKind[node.kind]} (${node.pos}-${node.end})`);
  if (ts.isIfStatement(node)) {
    console.log(
      `${prefix}  thenStatement parent check: ${
        node.thenStatement.parent === node
      }`
    );
    console.log(
      `${prefix}  thenStatement.kind: ${ts.SyntaxKind[node.thenStatement.kind]}`
    );
  }
  node.forEachChild((child) => printNode(child, indent + 1));
}

printNode(sourceFile);

// Now test with the position of "const x = 1"
console.log("\n=== Testing position 11 (start of 'const') ===");
const token = ts.getTokenAtPosition(sourceFile, 11);
console.log(
  `Token at pos 11: ${ts.SyntaxKind[token.kind]} (${token.pos}-${token.end})`
);

let current = token;
while (current) {
  console.log(
    `  Ancestor: ${ts.SyntaxKind[current.kind]} (parent: ${
      current.parent ? ts.SyntaxKind[current.parent.kind] : "none"
    })`
  );
  if (ts.isStatement(current)) {
    console.log(`    ^^^ This is a statement!`);
    console.log(`    Parent is SourceFile? ${ts.isSourceFile(current.parent)}`);
    break;
  }
  current = current.parent;
}
