/**
 * WARNING: this is a very, very rudimentary d.ts bundler; it only works
 * in the TS project thanks to our history using namespaces, which has
 * prevented us from duplicating names across files, and allows us to
 * bundle as namespaces again, even though the project is modules.
 */

import assert, {
    fail,
} from "assert";
import cp from "child_process";
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

/** @type {(node: ts.Node) => node is ts.DeclarationStatement} */
function isDeclarationStatement(node) {
    return /** @type {any} */ (ts).isDeclarationStatement(node);
}

/** @type {(node: ts.Node) => boolean} */
function isInternalDeclaration(node) {
    return /** @type {any} */ (ts).isInternalDeclaration(node, node.getSourceFile());
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
    else if (isDeclarationStatement(node)) {
        return node;
    }
    return undefined;
}

/** @type {ts.TransformationContext} */
const nullTransformationContext = /** @type {any} */ (ts).nullTransformationContext;

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
            if (statement && !isInternalDeclaration(statement)) {
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
 * @returns {ts.Node | undefined}
 */
function removeDeclareConstExport(node) {
    switch (node.kind) {
        case ts.SyntaxKind.DeclareKeyword: // No need to emit this in d.ts files.
        case ts.SyntaxKind.ConstKeyword: // Remove const from const enums.
        case ts.SyntaxKind.ExportKeyword: // No export modifier; we are already in the namespace.
            return undefined;
    }
    return node;
}

/** @type {Map<string, ts.Symbol>[]} */
const scopeStack = [];

/**
 * @param {string} name
 */
function findInScope(name) {
    for (let i = scopeStack.length - 1; i >= 0; i--) {
        const scope = scopeStack[i];
        const symbol = scope.get(name);
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
 */
function resolveAlias(symbol) {
    return typeChecker.getAliasedSymbol(symbol);
}

/**
 * @param {ts.Symbol} symbol
 * @param {boolean | undefined} [dontResolveAlias]
 */
function resolveSymbol(symbol, dontResolveAlias = undefined) {
    return !dontResolveAlias && isNonLocalAlias(symbol) ? resolveAlias(symbol) : symbol;
}

/**
 * @param {ts.Symbol} symbol
 * @returns {ts.Symbol}
 */
function getMergedSymbol(symbol) {
    return /** @type {any} */ (typeChecker).getMergedSymbol(symbol);
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
 * @param {ts.Node} node
 * @returns {boolean}
 */
function isPartOfTypeNode(node) {
    return /** @type {any} */ (ts).isPartOfTypeNode(node);
}

/**
 * @param {ts.Statement} decl
 */
function verifyMatchingSymbols(decl) {
    ts.visitEachChild(decl, /** @type {(node: ts.Node) => ts.Node} */ function visit(node) {
        if (ts.isIdentifier(node) && isPartOfTypeNode(node)) {
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
                // We didn't find the symbol in scope at all. Just allow it and we'll fail at test time.
                return node;
            }

            if (symbolsConflict(symbolOfNode, symbolInScope)) {
                fail(`Declaration at ${nodeToLocation(decl)}\n    references ${symbolOfNode.name} at ${symbolOfNode.declarations && nodeToLocation(symbolOfNode.declarations[0])},\n    but containing scope contains a symbol with the same name declared at ${symbolInScope.declarations && nodeToLocation(symbolInScope.declarations[0])}`);
            }
        }

        return ts.visitEachChild(node, visit, nullTransformationContext);
    }, nullTransformationContext);
}

/**
 * @param {string} name
 * @param {ts.Symbol} moduleSymbol
 */
function emitAsNamespace(name, moduleSymbol) {
    assert(moduleSymbol.flags & ts.SymbolFlags.ValueModule, "moduleSymbol is not a module");

    scopeStack.push(new Map());
    const currentScope = scopeStack[scopeStack.length - 1];

    const target = containsPublicAPI(moduleSymbol) ? WriteTarget.Both : WriteTarget.Internal;

    if (name === "ts") {
        // We will write `export = ts` at the end.
        write(`declare namespace ${name} {`, target);
    }
    else {
        // No export modifier; we are already in the namespace.
        write(`namespace ${name} {`, target);
    }
    increaseIndent();

    const moduleExports = typeChecker.getExportsOfModule(moduleSymbol);
    for (const me of moduleExports) {
        currentScope.set(me.name, me);
    }

    for (const me of moduleExports) {
        assert(me.declarations?.length);

        if (me.flags & ts.SymbolFlags.Alias) {
            const resolved = typeChecker.getAliasedSymbol(me);
            emitAsNamespace(me.name, resolved);
            continue;
        }

        for (const decl of me.declarations) {
            const statement = getDeclarationStatement(decl);
            const sourceFile = decl.getSourceFile();

            if (!statement) {
                fail(`Unhandled declaration for ${me.name} at ${nodeToLocation(decl)}`);
            }

            verifyMatchingSymbols(statement);

            const isInternal = isInternalDeclaration(statement);
            if (!isInternal) {
                const publicStatement = ts.visitEachChild(statement, node => {
                    // No @internal comments in the public API.
                    if (isInternalDeclaration(node)) {
                        return undefined;
                    }
                    return removeDeclareConstExport(node);
                }, nullTransformationContext);

                writeNode(publicStatement, sourceFile, WriteTarget.Public);
            }

            const internalStatement = ts.visitEachChild(statement, removeDeclareConstExport, nullTransformationContext);

            writeNode(internalStatement, sourceFile, WriteTarget.Internal);
        }
    }

    scopeStack.pop();

    decreaseIndent();
    write(`}`, target);
}

emitAsNamespace("ts", moduleSymbol);

write("export = ts;", WriteTarget.Both);

const copyrightNotice = fs.readFileSync(path.join(__dirname, "CopyrightNotice.txt"), "utf-8");
const publicContents = copyrightNotice + publicLines.join(newLine);
const internalContents = copyrightNotice + internalLines.join(newLine);

if (publicContents.includes("@internal")) {
    console.error("Output includes untrimmed @internal nodes!");
}

const dprintPath = path.resolve(__dirname, "..", "node_modules", "dprint", "bin.js");

/**
 * @param {string} contents
 * @returns {string}
 */
function dprint(contents) {
    const result = cp.execFileSync(
        process.execPath,
        [dprintPath, "fmt", "--stdin", "ts"],
        {
            stdio: ["pipe", "pipe", "inherit"],
            encoding: "utf-8",
            input: contents,
            maxBuffer: 100 * 1024 * 1024, // 100 MB "ought to be enough for anyone"; https://github.com/nodejs/node/issues/9829
        },
    );
    return result.replace(/\r\n/g, "\n");
}

fs.writeFileSync(output, dprint(publicContents));
fs.writeFileSync(internalOutput, dprint(internalContents));
