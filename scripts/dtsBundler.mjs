/**
 * WARNING: this is a very, very rudimentary d.ts bundler; it only works
 * in the TS project thanks to our history using namespaces, which has
 * prevented us from duplicating names across files, and allows us to
 * bundle as namespaces again, even though the project is modules.
 */

import assert from "assert";
import fs from "fs";
import path from "path";
import minimist from "minimist";
import url from "url";
import ts from "../lib/typescript.js";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);


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
 *
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
 *
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
assert(sourceFile);
const moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
assert(moduleSymbol);

const printer = ts.createPrinter({ newLine: newLineKind });

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
    write(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile), target);
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
 * @param {ts.Node} decl
 */
function nodeToLocation(decl) {
    const sourceFile = decl.getSourceFile();
    const lc = sourceFile.getLineAndCharacterOfPosition(decl.pos);
    return `${sourceFile.fileName}:${lc.line}:${lc.character}`;
}

/**
 * @param {ts.Node} node
 * @returns {ts.Node | undefined}
 */
function removeDeclareConstExport(node) {
    switch (node.kind) {
        case ts.SyntaxKind.DeclareKeyword: // No need to emit this in d.ts files.
        case ts.SyntaxKind.ConstKeyword:   // Remove const from const enums.
        case ts.SyntaxKind.ExportKeyword:  // No export modifier; we are already in the namespace.
            return undefined;
    }
    return node;
}

/**
 * @param {string} name
 * @param {ts.Symbol} moduleSymbol
 */
function emitAsNamespace(name, moduleSymbol) {
    assert(moduleSymbol.flags & ts.SymbolFlags.ValueModule);

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
                throw new Error(`Unhandled declaration for ${me.name} at ${nodeToLocation(decl)}`);
            }

            const isInternal = isInternalDeclaration(statement);
            if (!isInternal) {
                const publicStatement = ts.visitEachChild(statement, (node) => {
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

    decreaseIndent();
    write(`}`, target);
}

emitAsNamespace("ts", moduleSymbol);

write("export = ts;", WriteTarget.Both);

const copyrightNotice = fs.readFileSync(path.join(__dirname, "..", "CopyrightNotice.txt"), "utf-8");
const publicContents = copyrightNotice + publicLines.join(newLine);
const internalContents = copyrightNotice + internalLines.join(newLine);

if (publicContents.includes("@internal")) {
    console.error("Output includes untrimmed @internal nodes!");
}

fs.writeFileSync(output, publicContents);
fs.writeFileSync(internalOutput, internalContents);
