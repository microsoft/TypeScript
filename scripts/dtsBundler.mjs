/**
 * WARNING: this is a very, very rudimentary d.ts bundler; it only works
 * in the TS project thanks to our history using namespaces, which has
 * prevented us from duplicating names across files, and allows us to
 * bundle as namespaces again, even though the project is modules.
 */

import * as dprintFormatter from "@dprint/formatter";
import * as dprintTypeScript from "@dprint/typescript";
import assert, { fail } from "assert";
import fs from "fs";
import minimist from "minimist";
import path from "path";
import ts from "typescript";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

// /** @type {any} */ (ts).Debug.enableDebugInfo();

const dotDts = ".d.ts";

const options = minimist(process.argv.slice(2), {
    string: ["project", "entrypoint", "output"],
});

const entrypoint = options.entrypoint;
const output = options.output;

assert(typeof entrypoint === "string" && entrypoint);
assert(typeof output === "string" && output);
assert(output.endsWith(dotDts));

const internalOutput = output.substring(0, output.length - dotDts.length) + ".internal" + dotDts;

console.log(`Bundling ${entrypoint} to ${output} and ${internalOutput}`);

const newLineKind = ts.NewLineKind.LineFeed;
const newLine = newLineKind === ts.NewLineKind.LineFeed ? "\n" : "\r\n";

/**
 * @param {ts.Node} node
 */
function removeAllComments(node) {
    /** @type {any} */ (ts).removeAllComments(node);
}

/**
 * @param {ts.VariableDeclaration} node
 * @returns {ts.VariableStatement}
 */
function getParentVariableStatement(node) {
    const declarationList = node.parent;
    assert(ts.isVariableDeclarationList(declarationList), `expected VariableDeclarationList at ${nodeToLocation(node)}`);
    assert(declarationList.declarations.length === 1, `expected VariableDeclarationList of length 1 at ${nodeToLocation(node)}`);
    const variableStatement = declarationList.parent;
    assert(ts.isVariableStatement(variableStatement), `expected VariableStatement at ${nodeToLocation(node)}`);
    return variableStatement;
}

/**
 * @param {ts.Declaration} node
 * @returns {ts.Statement | undefined}
 */
function getDeclarationStatement(node) {
    if (ts.isVariableDeclaration(node)) {
        return getParentVariableStatement(node);
    }
    else if (ts.isDeclarationStatement(node)) {
        return node;
    }
    return undefined;
}

const program = ts.createProgram([entrypoint], { target: ts.ScriptTarget.ES5 });

const typeChecker = program.getTypeChecker();

const sourceFile = program.getSourceFile(entrypoint);
assert(sourceFile, "Failed to load source file");
const moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
assert(moduleSymbol, "Failed to get module's symbol");

/** @type {{ writeNode(hint: ts.EmitHint, node: ts.Node, sourceFile: ts.SourceFile | undefined, writer: any): void }} */
const printer = /** @type {any} */ (ts.createPrinter({ newLine: newLineKind }));
/** @type {{ writeComment(s: string): void; getText(): string; clear(): void }} */
const writer = /** @type {any} */ (ts).createTextWriter("\n");
const originalWriteComment = writer.writeComment.bind(writer);
writer.writeComment = s => {
    // Hack; undo https://github.com/microsoft/TypeScript/pull/50097
    // We printNode directly, so we get all of the original source comments.
    // If we were using actual declaration emit instead, this wouldn't be needed.
    if (s.startsWith("//")) {
        return;
    }
    originalWriteComment(s);
};

/**
 * @param {ts.Node} node
 * @param {ts.SourceFile} sourceFile
 */
function printNode(node, sourceFile) {
    printer.writeNode(ts.EmitHint.Unspecified, node, sourceFile, writer);
    const text = writer.getText();
    writer.clear();
    return text;
}

/** @type {string[]} */
const publicLines = [];
/** @type {string[]} */
const internalLines = [];

const indent = "    ";
let currentIndent = "";

function increaseIndent() {
    currentIndent += indent;
}

function decreaseIndent() {
    currentIndent = currentIndent.slice(indent.length);
}

/**
 * @enum {number}
 */
const WriteTarget = {
    Public: 1 << 0,
    Internal: 1 << 1,
    Both: (1 << 0) | (1 << 1),
};

/**
 * @param {string} s
 * @param {WriteTarget} target
 */
function write(s, target) {
    if (!target) {
        return;
    }

    const toPush = !s ? [""] : s.split(/\r?\n/).filter(line => line).map(line => (currentIndent + line).trimEnd());

    if (target & WriteTarget.Public) {
        publicLines.push(...toPush);
    }
    if (target & WriteTarget.Internal) {
        internalLines.push(...toPush);
    }
}

/**
 * @param {ts.Node} node
 * @param {ts.SourceFile} sourceFile
 * @param {WriteTarget} target
 */
function writeNode(node, sourceFile, target) {
    write(printNode(node, sourceFile), target);
}

/** @type {Map<ts.Symbol, boolean>} */
const containsPublicAPICache = new Map();

/**
 * @param {ts.Symbol} symbol
 * @returns {boolean}
 */
function containsPublicAPI(symbol) {
    const cached = containsPublicAPICache.get(symbol);
    if (cached !== undefined) {
        return cached;
    }

    const result = containsPublicAPIWorker();
    containsPublicAPICache.set(symbol, result);
    return result;

    function containsPublicAPIWorker() {
        if (!symbol.declarations?.length) {
            return false;
        }

        if (symbol.flags & ts.SymbolFlags.Alias) {
            const resolved = typeChecker.getAliasedSymbol(symbol);
            return containsPublicAPI(resolved);
        }

        // Namespace barrel; actual namespaces are checked below.
        if (symbol.flags & ts.SymbolFlags.ValueModule && symbol.valueDeclaration?.kind === ts.SyntaxKind.SourceFile) {
            for (const me of typeChecker.getExportsOfModule(symbol)) {
                if (containsPublicAPI(me)) {
                    return true;
                }
            }
            return false;
        }

        for (const decl of symbol.declarations) {
            const statement = getDeclarationStatement(decl);
            if (statement && !ts.isInternalDeclaration(statement)) {
                return true;
            }
        }

        return false;
    }
}

/**
 * @param {ts.Node} node
 */
function nodeToLocation(node) {
    const sourceFile = node.getSourceFile();
    const lc = sourceFile.getLineAndCharacterOfPosition(node.pos);
    return `${sourceFile.fileName}:${lc.line + 1}:${lc.character + 1}`;
}

/**
 * @param {ts.Node} node
 * @param {boolean} needExportModifier
 * @returns {ts.Node | undefined}
 */
function removeDeclareConstExport(node, needExportModifier) {
    switch (node.kind) {
        case ts.SyntaxKind.DeclareKeyword: // No need to emit this in d.ts files.
        case ts.SyntaxKind.ConstKeyword: // Remove const from const enums.
            return undefined;
        case ts.SyntaxKind.ExportKeyword: // No export modifier; we are already in the namespace.
            if (!needExportModifier) {
                return undefined;
            }
    }
    return node;
}

/** @type {{ locals: Map<string, { symbol: ts.Symbol, writeTarget: WriteTarget }>, exports: Map<string, ts.Symbol>}[]} */
const scopeStack = [];

/** @type {Map<ts.Symbol, string>} */
const symbolToNamespace = new Map();

/**
 * @param {string} name
 */
function findInScope(name) {
    for (let i = scopeStack.length - 1; i >= 0; i--) {
        const scope = scopeStack[i];
        const symbol = scope.exports.get(name);
        if (symbol) {
            return symbol;
        }
    }
    return undefined;
}

/** @type {(symbol: ts.Symbol | undefined, excludes?: ts.SymbolFlags) => boolean} */
function isNonLocalAlias(symbol, excludes = ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace) {
    if (!symbol) return false;
    return (symbol.flags & (ts.SymbolFlags.Alias | excludes)) === ts.SymbolFlags.Alias || !!(symbol.flags & ts.SymbolFlags.Alias && symbol.flags & ts.SymbolFlags.Assignment);
}

/**
 * @param {ts.Symbol} symbol
 * @param {boolean | undefined} [dontResolveAlias]
 */
function resolveSymbol(symbol, dontResolveAlias = undefined) {
    return !dontResolveAlias && isNonLocalAlias(symbol) ? typeChecker.getAliasedSymbol(symbol) : symbol;
}

/**
 * @param {ts.Symbol} symbol
 * @returns {ts.Symbol}
 */
function getMergedSymbol(symbol) {
    return typeChecker.getMergedSymbol(symbol);
}

/**
 * @param {ts.Symbol} s1
 * @param {ts.Symbol} s2
 */
function symbolsConflict(s1, s2) {
    // See getSymbolIfSameReference in checker.ts
    s1 = getMergedSymbol(resolveSymbol(getMergedSymbol(s1)));
    s2 = getMergedSymbol(resolveSymbol(getMergedSymbol(s2)));
    if (s1 === s2) {
        return false;
    }

    const s1Flags = s1.flags & (ts.SymbolFlags.Type | ts.SymbolFlags.Value);
    const s2Flags = s2.flags & (ts.SymbolFlags.Type | ts.SymbolFlags.Value);

    // If the two symbols differ by type/value space, ignore.
    if (!(s1Flags & s2Flags)) {
        return false;
    }

    return true;
}

/**
 * @param {ts.Statement} decl
 * @param {boolean} isInternal
 */
function verifyMatchingSymbols(decl, isInternal) {
    ts.visitEachChild(decl, /** @type {(node: ts.Node) => ts.Node} */ function visit(node) {
        if (ts.isIdentifier(node) && ts.isPartOfTypeNode(node)) {
            if (ts.isQualifiedName(node.parent) && node !== node.parent.left) {
                return node;
            }
            if (ts.isParameter(node.parent) && node === node.parent.name) {
                return node;
            }
            if (ts.isNamedTupleMember(node.parent) && node === node.parent.name) {
                return node;
            }

            const symbolOfNode = typeChecker.getSymbolAtLocation(node);
            if (!symbolOfNode) {
                fail(`No symbol for node at ${nodeToLocation(node)}`);
            }
            const symbolInScope = findInScope(symbolOfNode.name);
            if (!symbolInScope) {
                if (symbolOfNode.declarations?.every(d => isLocalDeclaration(d) && d.getSourceFile() === decl.getSourceFile()) && !isSelfReference(node, symbolOfNode)) {
                    // The symbol is a local that needs to be copied into the scope.
                    scopeStack[scopeStack.length - 1].locals.set(symbolOfNode.name, { symbol: symbolOfNode, writeTarget: isInternal ? WriteTarget.Internal : WriteTarget.Both });
                }
                // We didn't find the symbol in scope at all. Just allow it and we'll fail at test time.
                return node;
            }

            if (symbolsConflict(symbolOfNode, symbolInScope)) {
                fail(`Declaration at ${nodeToLocation(decl)}\n    references ${symbolOfNode.name} at ${symbolOfNode.declarations && nodeToLocation(symbolOfNode.declarations[0])},\n    but containing scope contains a symbol with the same name declared at ${symbolInScope.declarations && nodeToLocation(symbolInScope.declarations[0])}`);
            }
        }

        return ts.visitEachChild(node, visit, /*context*/ undefined);
    }, /*context*/ undefined);
}

/**
 * @param {ts.Declaration} decl
 */
function isLocalDeclaration(decl) {
    return ts.canHaveModifiers(decl)
        && !ts.getModifiers(decl)?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
        && !!getDeclarationStatement(decl);
}

/**
 * @param {ts.Node} reference
 * @param {ts.Symbol} symbol
 */
function isSelfReference(reference, symbol) {
    return symbol.declarations?.every(parent => ts.findAncestor(reference, p => p === parent));
}

/**
 * @param {string} name
 * @param {string} parent
 * @param {boolean} needExportModifier
 * @param {ts.Symbol} moduleSymbol
 */
function emitAsNamespace(name, parent, moduleSymbol, needExportModifier) {
    assert(moduleSymbol.flags & ts.SymbolFlags.ValueModule, "moduleSymbol is not a module");

    const fullName = parent ? `${parent}.${name}` : name;

    scopeStack.push({ locals: new Map(), exports: new Map() });
    const currentScope = scopeStack[scopeStack.length - 1];

    const target = containsPublicAPI(moduleSymbol) ? WriteTarget.Both : WriteTarget.Internal;

    if (name === "ts") {
        // We will write `export = ts` at the end.
        assert(!needExportModifier, "ts namespace should not have an export modifier");
        write(`declare namespace ${name} {`, target);
    }
    else {
        write(`${needExportModifier ? "export " : ""}namespace ${name} {`, target);
    }
    increaseIndent();

    const moduleExports = typeChecker.getExportsOfModule(moduleSymbol);
    for (const me of moduleExports) {
        currentScope.exports.set(me.name, me);
        symbolToNamespace.set(me, fullName);
    }

    /** @type {[ts.Statement, ts.SourceFile, WriteTarget][]} */
    const exportedStatements = [];
    /** @type {[name: string, fullName: string, moduleSymbol: ts.Symbol][]} */
    const nestedNamespaces = [];
    for (const me of moduleExports) {
        assert(me.declarations?.length);

        if (me.flags & ts.SymbolFlags.Alias) {
            const resolved = typeChecker.getAliasedSymbol(me);
            if (resolved.flags & ts.SymbolFlags.ValueModule) {
                nestedNamespaces.push([me.name, fullName, resolved]);
            }
            else {
                const namespaceName = symbolToNamespace.get(resolved);
                assert(namespaceName, `Failed to find namespace for ${me.name} at ${nodeToLocation(me.declarations[0])}`);
                write(`export import ${me.name} = ${namespaceName}.${me.name}`, target);
            }
            continue;
        }

        for (const decl of me.declarations) {
            const statement = getDeclarationStatement(decl);
            const sourceFile = decl.getSourceFile();

            if (!statement) {
                fail(`Unhandled declaration for ${me.name} at ${nodeToLocation(decl)}`);
            }

            const isInternal = ts.isInternalDeclaration(statement);
            if (!ts.isModuleDeclaration(decl)) {
                verifyMatchingSymbols(statement, isInternal);
            }

            if (!isInternal) {
                const publicStatement = ts.visitEachChild(statement, node => {
                    // No @internal comments in the public API.
                    if (ts.isInternalDeclaration(node)) {
                        return undefined;
                    }
                    // TODO: remove after https://github.com/microsoft/TypeScript/pull/58187 is released
                    if (ts.canHaveModifiers(node)) {
                        for (const modifier of ts.getModifiers(node) ?? []) {
                            if (modifier.kind === ts.SyntaxKind.PrivateKeyword) {
                                removeAllComments(node);
                                break;
                            }
                        }
                    }
                    return node;
                }, /*context*/ undefined);

                exportedStatements.push([publicStatement, sourceFile, WriteTarget.Public]);
            }

            exportedStatements.push([statement, sourceFile, WriteTarget.Internal]);
        }
    }

    const childrenNeedExportModifier = !!currentScope.locals.size;

    nestedNamespaces.forEach(namespace => emitAsNamespace(...namespace, childrenNeedExportModifier));

    currentScope.locals.forEach(({ symbol, writeTarget }) => {
        symbol.declarations?.forEach(decl => {
            // We already checked that getDeclarationStatement(decl) works for each declaration.
            const statement = getDeclarationStatement(decl);
            writeNode(/** @type {ts.Statement} */ (statement), decl.getSourceFile(), writeTarget);
        });
    });

    exportedStatements.forEach(([statement, ...rest]) => {
        let updated = ts.visitEachChild(statement, node => removeDeclareConstExport(node, childrenNeedExportModifier), /*context*/ undefined);
        if (childrenNeedExportModifier && ts.canHaveModifiers(updated) && !updated.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
            updated = ts.factory.replaceModifiers(
                updated,
                [
                    ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
                    .../**@type {ts.NodeArray<ts.Modifier> | undefined}*/ (updated.modifiers) ?? [],
                ],
            );
        }
        writeNode(updated, ...rest);
    });

    scopeStack.pop();

    decreaseIndent();
    write(`}`, target);
}

emitAsNamespace("ts", "", moduleSymbol, /*needExportModifier*/ false);

write("export = ts;", WriteTarget.Both);

const copyrightNotice = fs.readFileSync(path.join(__dirname, "CopyrightNotice.txt"), "utf-8");
const publicContents = copyrightNotice + publicLines.join(newLine);
const internalContents = copyrightNotice + internalLines.join(newLine);

if (publicContents.includes("@internal")) {
    console.error("Output includes untrimmed @internal nodes!");
}

const buffer = fs.readFileSync(dprintTypeScript.getPath());
const formatter = dprintFormatter.createFromBuffer(buffer);
formatter.setConfig({
    indentWidth: 4,
    lineWidth: 1000,
    newLineKind: "auto",
    useTabs: false,
}, {
    quoteStyle: "preferDouble",
});

/**
 * @param {string} contents
 * @returns {string}
 */
function dprint(contents) {
    const result = formatter.formatText({ filePath: "dummy.d.ts", fileText: contents });
    return result.replace(/\r\n/g, "\n");
}

fs.writeFileSync(output, dprint(publicContents));
fs.writeFileSync(internalOutput, dprint(internalContents));
