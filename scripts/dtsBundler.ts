/**
 * WARNING: this is a very, very rudimentary d.ts bundler; it only works
 * in the TS project thanks to our history using namespaces, which has
 * prevented us from duplicating names across files, and allows us to
 * bundle as namespaces again, even though the project is modules.
 */

import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as minimist from "minimist";
import * as ts from "../lib/typescript";

const options = minimist(process.argv.slice(2), {
    boolean: ["stripInternal"],
    string: ["project", "entrypoint", "output"],
    default: {
        stripInternal: true,
    },
});

const stripInternal = !!options.stripInternal;
const entrypoint = options.entrypoint;
const output = options.output;


assert(typeof entrypoint === "string" && entrypoint);
assert(typeof output === "string" && output);

console.log(`Bundling ${entrypoint} to ${output}`);

const newLineKind = ts.NewLineKind.LineFeed;
const newLine = newLineKind === ts.NewLineKind.LineFeed ? "\n" : "\r\n";

function isDeclarationStatement(node: ts.Node): node is ts.DeclarationStatement {
    return (ts as any).isDeclarationStatement(node);
}

function isInternalDeclaration(node: ts.Node): boolean {
    return (ts as any).isInternalDeclaration(node, node.getSourceFile());
}

function getParentVariableStatement(node: ts.VariableDeclaration): ts.VariableStatement {
    const declarationList = node.parent as ts.VariableDeclarationList;
    assert(ts.isVariableDeclarationList(declarationList), `expected VariableDeclarationList at ${nodeToLocation(node)}`);
    assert(declarationList.declarations.length === 1, `expected VariableDeclarationList of length 1 at ${nodeToLocation(node)}`);
    const variableStatement = declarationList.parent;
    assert(ts.isVariableStatement(variableStatement), `expected VariableStatement at ${nodeToLocation(node)}`);
    return variableStatement;
}

function getDeclarationStatement(node: ts.Declaration): ts.Statement | undefined {
    if (ts.isVariableDeclaration(node)) {
        return getParentVariableStatement(node);
    }
    else if (isDeclarationStatement(node)) {
        return node;
    }
    return undefined;
}

const nullTransformationContext: ts.TransformationContext = (ts as any).nullTransformationContext;

const program = ts.createProgram([entrypoint], { target: ts.ScriptTarget.ES5 });

const typeChecker = program.getTypeChecker();

const sourceFile = program.getSourceFile(entrypoint);
assert(sourceFile);
const moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
assert(moduleSymbol);

const printer = ts.createPrinter({ newLine: newLineKind });


const lines: string[] = [];
const indent = "    ";
let currentIndent = "";

function increaseIndent() {
    currentIndent += indent;
}

function decreaseIndent() {
    currentIndent = currentIndent.slice(indent.length);
}

function write(s: string) {
    if (!s) {
        lines.push("");
    }
    else {
        lines.push(...s.split(/\r?\n/).filter(line => line).map(line => (currentIndent + line).trimEnd()));
    }
}

const containsPublicAPICache = new Map<ts.Symbol, boolean>();

function containsPublicAPI(symbol: ts.Symbol): boolean {
    const cached = containsPublicAPICache.get(symbol);
    if (cached !== undefined) {
        return cached;
    }

    const result = containsPublicAPIWorker();
    containsPublicAPICache.set(symbol, result);
    return result;

    function containsPublicAPIWorker(): boolean {
        if (!symbol.declarations?.length) {
            return false;
        }

        if (symbol.flags & ts.SymbolFlags.Alias) {
            const resolved = typeChecker.getAliasedSymbol(symbol);
            return containsPublicAPI(resolved);
        }

        if (symbol.flags & ts.SymbolFlags.ValueModule) {
            for (const me of typeChecker.getExportsOfModule(symbol)) {
                if (containsPublicAPI(me)) {
                    return true;
                }
            }
            return false;
        }

        for (const decl of symbol.declarations) {
            const statement = getDeclarationStatement(decl);
            if (statement && !isInternalDeclaration(statement)) {
                return true;
            }
        }

        return false;
    }
}

function nodeToLocation(decl: ts.Node): string {
    const sourceFile = decl.getSourceFile();
    const lc = sourceFile.getLineAndCharacterOfPosition(decl.pos);
    return `${sourceFile.fileName}:${lc.line}:${lc.character}`;
}

function emitAsNamespace(name: string, moduleSymbol: ts.Symbol) {
    assert(moduleSymbol.flags & ts.SymbolFlags.ValueModule);

    if (name === "ts") {
        // We will write `export = ts` at the end.
        write(`declare namespace ${name} {`);
    }
    else {
        // No export modifier; we are already in the namespace.
        write(`namespace ${name} {`);
    }
    increaseIndent();

    const moduleExports = typeChecker.getExportsOfModule(moduleSymbol);
    for (const me of moduleExports) {
        if (stripInternal && !containsPublicAPI(me)) {
            continue;
        }

        assert(me.declarations?.length);

        if (me.flags & ts.SymbolFlags.Alias) {
            const resolved = typeChecker.getAliasedSymbol(me);
            emitAsNamespace(me.name, resolved);
            continue;
        }

        for (const decl of me.declarations) {
            let statement = getDeclarationStatement(decl);

            if (!statement) {
                throw new Error(`Unhandled declaration for ${me.name} at ${nodeToLocation(decl)}`);
            }

            // Ignore an internal declaration.
            if (stripInternal && isInternalDeclaration(statement)) {
                continue;
            }

            // Remove internal components and declare/const keywords.
            statement = ts.visitEachChild(statement, (node) => {
                if (stripInternal && isInternalDeclaration(node)) {
                    return undefined;
                }

                switch (node.kind) {
                    case ts.SyntaxKind.DeclareKeyword: // No need to emit this in d.ts files.
                    case ts.SyntaxKind.ConstKeyword:   // Remove const from const enums.
                    case ts.SyntaxKind.ExportKeyword:  // No export modifier; we are already in the namespace.
                        return undefined;
                }

                return node;
            }, nullTransformationContext);

            write(printer.printNode(ts.EmitHint.Unspecified, statement, decl.getSourceFile()));
        }
    }

    decreaseIndent();
    write(`}`);
}

emitAsNamespace("ts", moduleSymbol);

write("export = ts;");

const copyrightNotice = fs.readFileSync(path.join(__dirname, "..", "CopyrightNotice.txt"), "utf-8");
const outputContents = copyrightNotice + lines.join(newLine);

if (stripInternal && outputContents.includes("@internal")) {
    console.error("Output includes untrimmed @internal nodes!");
}

fs.writeFileSync(output, outputContents);
