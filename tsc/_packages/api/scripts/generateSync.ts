/**
 * Generates sync API from async API source files.
 *
 * Reads async/types.ts and async/api.ts, applies directive-based and
 * AST-based transforms, and writes sync/types.ts and sync/api.ts.
 *
 * Directives (placed in comments in the async source):
 *   // @sync-skip                     — omit this line in sync output
 *   // @sync-skip-block-start/end     — omit all lines between (inclusive)
 *   // @sync-only-start/end           — uncomment lines between (strip "// " prefix)
 *   // @sync: <code>                  — replace this line with <code> (preserving indent)
 *
 * AST-based transforms (applied after directives using the TypeScript compiler API):
 *   - Remove `async` modifier from function/method declarations
 *   - Remove `await` from await expressions (replace with operand)
 *   - Unwrap `Promise<T>` → `T` in type references
 *
 * Usage:
 *   node --experimental-strip-types --no-warnings scripts/generate.ts
 */

import { execaSync } from "execa";
import {
    mkdirSync,
    readFileSync,
    writeFileSync,
} from "node:fs";
import {
    dirname,
    join,
    relative,
} from "node:path";
import ts from "typescript";

function generatedHeader(asyncSourceRelPath: string): string {
    return [
        "//",
        "// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        "// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!",
        "// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
        "//",
        `// Source: ${asyncSourceRelPath}`,
        "// Regenerate: npm run generate (from _packages/api)",
        "//",
        "",
    ].join("\n");
}

const ROOT = join(import.meta.dirname!, "..");
const SRC = join(ROOT, "src");
const TEST = join(ROOT, "test");

function generateSyncFile(srcPath: string, destPath: string): string {
    const source = readFileSync(srcPath, "utf-8");

    // Normalize line endings to LF
    const normalized = source.replace(/\r/g, "");

    // Phase 1: Process sync directives (text-based, operates on comments/lines)
    const afterDirectives = processDirectives(normalized.split("\n")).join("\n");

    // Phase 2: AST-based async→sync transforms
    const fileName = destPath.split("/").pop()!;
    let result = removeAsyncAwaitAndPromise(afterDirectives, fileName);

    // Prepend generated header pointing to async source
    const srcRelPath = relative(ROOT, srcPath).replaceAll("\\", "/");
    result = generatedHeader(srcRelPath) + result;

    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, result);
    const label = relative(ROOT, srcPath).replaceAll("\\", "/");
    const destLabel = relative(ROOT, destPath).replaceAll("\\", "/");
    console.log(`  ${label} → ${destLabel}`);
    return destPath;
}

// ── Directive processing ─────────────────────────────────────────

function processDirectives(lines: string[]): string[] {
    const output: string[] = [];
    let skipBlock = false;
    let syncOnlyBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();

        // Block-skip markers
        if (trimmed === "// @sync-skip-block-start") {
            skipBlock = true;
            continue;
        }
        if (trimmed === "// @sync-skip-block-end") {
            skipBlock = false;
            continue;
        }
        if (skipBlock) continue;

        // Sync-only markers (uncomment block)
        if (trimmed === "// @sync-only-start") {
            syncOnlyBlock = true;
            continue;
        }
        if (trimmed === "// @sync-only-end") {
            syncOnlyBlock = false;
            continue;
        }

        if (syncOnlyBlock) {
            const indent = line.match(/^(\s*)/)![1];
            const rest = line.slice(indent.length);
            if (rest.startsWith("// ")) {
                output.push(indent + rest.slice(3));
            }
            else if (rest === "//") {
                output.push(indent);
            }
            else {
                output.push(line);
            }
            continue;
        }

        // Single-line skip
        if (line.includes("// @sync-skip")) {
            continue;
        }

        // Single-line replacement: // @sync: <replacement>
        const syncReplaceMatch = line.match(/\/\/ @sync: (.+)$/);
        if (syncReplaceMatch) {
            const indent = line.match(/^(\s*)/)![1];
            output.push(indent + syncReplaceMatch[1]);
            continue;
        }

        output.push(line);
    }

    return output;
}

// ── AST-based transforms ────────────────────────────────────────

interface Edit {
    start: number;
    end: number;
    newText: string;
}

/**
 * Uses the TypeScript compiler API to parse the source, walk the AST,
 * and collect edits to remove async/await and unwrap Promise<T>.
 * Edits are applied in reverse order to preserve positions.
 */
function removeAsyncAwaitAndPromise(source: string, fileName: string): string {
    const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
    const edits: Edit[] = [];

    function visit(node: ts.Node): void {
        // Remove `async` modifier from function-like declarations
        if (
            (ts.isFunctionDeclaration(node) ||
                ts.isMethodDeclaration(node) ||
                ts.isArrowFunction(node) ||
                ts.isFunctionExpression(node)) &&
            node.modifiers
        ) {
            for (const mod of node.modifiers) {
                if (mod.kind === ts.SyntaxKind.AsyncKeyword) {
                    // Remove the async keyword and any trailing whitespace
                    let end = mod.end;
                    while (end < source.length && source[end] === " ") end++;
                    edits.push({ start: mod.getStart(sourceFile), end, newText: "" });
                }
            }
        }

        // Remove `await` from await expressions → replace with the operand
        if (ts.isAwaitExpression(node)) {
            const operandStart = node.expression.getStart(sourceFile);
            edits.push({
                start: node.getStart(sourceFile),
                end: operandStart,
                newText: "",
            });
        }

        // Unwrap Promise<T> → T in type references
        if (
            ts.isTypeReferenceNode(node) &&
            ts.isIdentifier(node.typeName) &&
            node.typeName.text === "Promise" &&
            node.typeArguments &&
            node.typeArguments.length === 1
        ) {
            const innerType = node.typeArguments[0];
            const innerText = source.slice(innerType.getStart(sourceFile), innerType.end);
            edits.push({
                start: node.getStart(sourceFile),
                end: node.end,
                newText: innerText,
            });
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    // Sort edits in reverse order by start position and apply
    edits.sort((a, b) => b.start - a.start);
    let result = source;
    for (const edit of edits) {
        result = result.slice(0, edit.start) + edit.newText + result.slice(edit.end);
    }

    return result;
}

// ── Formatting ───────────────────────────────────────────────────

function formatFiles(paths: string[]): void {
    execaSync("dprint", ["fmt", ...paths]);
}

// ── Main ─────────────────────────────────────────────────────────

export function generateSync(): void {
    console.log("Generating sync API from async source...");
    const generatedFiles: string[] = [];

    // Source files
    for (const relPath of ["types.ts", "api.ts"]) {
        generatedFiles.push(generateSyncFile(
            join(SRC, "async", relPath),
            join(SRC, "sync", relPath),
        ));
    }

    // Test files
    for (const relPath of ["api.test.ts", "api.bench.ts"]) {
        generatedFiles.push(generateSyncFile(
            join(TEST, "async", relPath),
            join(TEST, "sync", relPath),
        ));
    }

    console.log("Formatting...");
    formatFiles(generatedFiles);
    console.log("Done.");
}

if (process.argv[1] === import.meta.filename) {
    generateSync();
}
