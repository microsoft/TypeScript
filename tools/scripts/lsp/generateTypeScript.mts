import fs from "node:fs";
import path from "node:path";
import { x } from "tinyexec";
import ts from "typescript";
import { getTypeScriptModel } from "./generate.mts";
import { generateTypeScript } from "./typeScript.mts";

const root = path.resolve(import.meta.dirname, "../../..");
const output = path.join(root, "packages/typescript/src/vscode/protocol.generated.ts");
const registry = path.join(root, "packages/vscode-typescript/src/lspMiddleware.ts");

export function getMiddlewareMethods(source: string): string[] {
    const file = ts.createSourceFile(registry, source, ts.ScriptTarget.Latest, true);
    const declarations = file.statements.filter(ts.isVariableStatement).flatMap(statement => statement.declarationList.declarations);
    const declaration = declarations.find(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === "supportedMethods");
    if (!declaration?.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) throw new Error("Middleware supportedMethods must be an object literal.");
    return declaration.initializer.properties.map(property => {
        if (!ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.name) || property.initializer.kind !== ts.SyntaxKind.TrueKeyword) {
            throw new Error("Middleware methods must be string literal properties with value true.");
        }
        return property.name.text;
    });
}

export default async function generate() {
    const content = generateTypeScript(getTypeScriptModel(), getMiddlewareMethods(fs.readFileSync(registry, "utf8")));
    fs.writeFileSync(output, content);
    await x("dprint", ["fmt", output], { throwOnError: true, nodeOptions: { cwd: root, stdio: "inherit" } });
}

if (process.argv[1] === import.meta.filename) await generate();
