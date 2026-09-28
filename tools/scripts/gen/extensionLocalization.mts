import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

function writeJson(file: string, value: Record<string, string>) {
    fs.writeFileSync(file, JSON.stringify(value, null, 2));
}

function isLocalizationCall(node: ts.Node): node is ts.CallExpression {
    if (!ts.isCallExpression(node)) return false;
    const expression = node.expression;
    return ts.isPropertyAccessExpression(expression)
        && expression.name.text === "t"
        && ts.isPropertyAccessExpression(expression.expression)
        && expression.expression.name.text === "l10n"
        && ts.isIdentifier(expression.expression.expression)
        && expression.expression.expression.text === "vscode";
}

export function generateBundle(sourceDirectory: string, outputFile: string) {
    const messages: Record<string, string> = Object.create(null);
    const files = fs.globSync(["**/*.ts", "**/*.tsx"], { cwd: sourceDirectory });
    for (const file of files) {
        const fileName = path.join(sourceDirectory, file);
        const source = ts.createSourceFile(fileName, fs.readFileSync(fileName, "utf8"), ts.ScriptTarget.Latest, true);
        for (const statement of source.statements) {
            if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === "vscode") {
                const clause = statement.importClause;
                const bindings = clause?.namedBindings;
                const typeOnly = clause?.isTypeOnly || (!clause?.name && bindings && ts.isNamedImports(bindings) && bindings.elements.every(element => element.isTypeOnly));
                if (!typeOnly && (clause?.name || !bindings || !ts.isNamespaceImport(bindings) || bindings.name.text !== "vscode")) {
                    const { line, character } = source.getLineAndCharacterOfPosition(statement.getStart(source));
                    throw new Error(`${fileName}:${line + 1}:${character + 1}: Import vscode as a namespace to extract localization strings`);
                }
            }
        }
        function visit(node: ts.Node) {
            if (isLocalizationCall(node)) {
                const first = node.arguments[0];
                const message = first && (ts.isStringLiteral(first) || ts.isNoSubstitutionTemplateLiteral(first)) ? first.text : undefined;
                if (message === undefined) {
                    const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source));
                    throw new Error(`${fileName}:${line + 1}:${character + 1}: vscode.l10n.t requires a static message`);
                }
                messages[message] = message;
            }
            ts.forEachChild(node, visit);
        }
        visit(source);
    }
    const entries = Object.entries(messages).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
    writeJson(outputFile, Object.fromEntries(entries));
}

const accents: Record<string, string> = {
    a: "à",
    e: "ë",
    i: "ï",
    o: "ô",
    u: "ü",
    y: "ÿ",
    A: "À",
    E: "Ë",
    I: "Ï",
    O: "Ô",
    U: "Ü",
    Y: "Ÿ",
};
const protectedText = /(\$\([^)]+\)|\{[a-zA-Z_0-9]+\}|%\d*\$?[sdif])/g;

function pseudoLocalize(message: string): string {
    const translated = message.split(protectedText).map((part, index) => index % 2 ? part : [...part].map(char => accents[char] ?? char).join(""));
    const length = translated.filter((_, index) => index % 2 === 0).join("").length;
    return `[!! ${translated.join("")}${"~".repeat(Math.ceil(length * 0.3))} !!]`;
}

export function generatePseudo(inputFile: string, outputFile: string) {
    const input: unknown = JSON.parse(fs.readFileSync(inputFile, "utf8"));
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error(`Invalid localization bundle: ${inputFile}`);
    const output: Record<string, string> = Object.create(null);
    for (const [key, value] of Object.entries(input)) {
        if (typeof value !== "string") throw new Error(`Invalid localization string ${key} in ${inputFile}`);
        output[key] = pseudoLocalize(value);
    }
    writeJson(outputFile, output);
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
    const extension = path.resolve(import.meta.dirname, "../../../packages/vscode-typescript");
    switch (process.argv[2]) {
        case "bundle":
            generateBundle(path.join(extension, "src"), path.join(extension, "l10n/bundle.l10n.json"));
            break;
        case "pseudo":
            generatePseudo(path.join(extension, "l10n/bundle.l10n.json"), path.join(extension, "l10n/bundle.l10n.qps-ploc.json"));
            generatePseudo(path.join(extension, "package.nls.json"), path.join(extension, "package.nls.qps-ploc.json"));
            break;
        default:
            throw new Error("Expected bundle or pseudo");
    }
}
