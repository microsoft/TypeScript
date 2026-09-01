#!/usr/bin/env -S node --experimental-strip-types --no-warnings

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
 *   - Generate synchronous implementations from async methods
 *   - Attach generator implementations as each synchronous method's `.gen` property
 *   - Unwrap `Promise<T>` → `T` in synchronous type references
 *
 * Usage:
 *   node --experimental-strip-types --no-warnings generateSync.ts
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
        "// Regenerate: npm run generate (from packages/typescript)",
        "//",
        "",
    ].join("\n");
}

const ROOT = join(import.meta.dirname!, "..");
const SRC = join(ROOT, "src", "api");
const TEST = join(ROOT, "test");

type SourceTransform = (source: string, fileName: string) => string;

function generateSyncFile(
    srcPath: string,
    destPath: string,
    transform: SourceTransform,
): string {
    const source = readFileSync(srcPath, "utf-8");

    // Normalize line endings to LF
    const normalized = source.replace(/\r/g, "");

    // Phase 1: Process sync directives (text-based, operates on comments/lines)
    const afterDirectives = processDirectives(normalized.split("\n")).join("\n");

    // Phase 2: AST-based async→sync transforms
    const fileName = destPath.split("/").pop()!;
    let result = transform(afterDirectives, fileName);

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

function applyEdits(source: string, edits: Edit[]): string {
    edits.sort((a, b) => b.start - a.start);
    let result = source;
    for (const edit of edits) {
        result = result.slice(0, edit.start) + edit.newText + result.slice(edit.end);
    }
    return result;
}

type TransformMode = "sync" | "generator";

function transformAsyncSource(source: string, fileName: string, attachGenerators: boolean): string {
    const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
    const edits: Edit[] = [];
    const asyncMethodNames = new Set<string>();
    const synchronousMethodNames = new Set<string>();

    for (const classDeclaration of getNamedClasses(sourceFile).values()) {
        for (const group of getMethodGroups(classDeclaration).values()) {
            const method = group.implementation;
            if (isGeneratorMethod(method)) asyncMethodNames.add((method.name as ts.Identifier).text);
            else synchronousMethodNames.add((method.name as ts.Identifier).text);
        }
    }

    visit(sourceFile);
    return applyEdits(source, edits);

    function visit(node: ts.Node): void {
        if (attachGenerators && ts.isClassDeclaration(node)) {
            const replacedMethods = new Set<ts.MethodDeclaration>();
            for (const group of getMethodGroups(node).values()) {
                if (!isGeneratorMethod(group.implementation)) continue;
                for (const declaration of group.declarations) replacedMethods.add(declaration);
                edits.push({
                    start: group.declarations[0].getStart(sourceFile),
                    end: group.implementation.end,
                    newText: createCombinedMethodFromAsync(group, source, sourceFile),
                });
            }
            for (const member of node.members) {
                if (!ts.isMethodDeclaration(member) || !replacedMethods.has(member)) visit(member);
            }
            return;
        }

        if (attachGenerators && ts.isInterfaceDeclaration(node)) {
            const replacedSignatures = new Set<ts.MethodSignature>();
            for (const [name, declarations] of getSignatureGroups(node)) {
                if (!declarations.every(declaration => isPromiseType(declaration.type))) continue;
                for (const declaration of declarations) replacedSignatures.add(declaration);
                const indent = getIndent(source, declarations[0].getStart(sourceFile));
                const syncSignatures = declarations.map(declaration => `${indent}    ${createAsyncCallSignature(declaration, "sync")}`).join("\n");
                const generatorSignatures = declarations.map(declaration => `${indent}    gen${createAsyncCallSignature(declaration, "generator")}`).join("\n");
                edits.push({
                    start: declarations[0].getStart(sourceFile),
                    end: declarations.at(-1)!.end,
                    newText: `${name}: {\n${syncSignatures}\n${generatorSignatures}\n${indent}};`,
                });
            }
            for (const member of node.members) {
                if (!ts.isMethodSignature(member) || !replacedSignatures.has(member)) visit(member);
            }
            return;
        }

        addSyncEdit(node, source, sourceFile, edits);
        ts.forEachChild(node, visit);
    }

    function createCombinedMethodFromAsync(group: MethodGroup, source: string, sourceFile: ts.SourceFile): string {
        const method = group.implementation;
        const name = (method.name as ts.Identifier).text;
        const indent = getIndent(source, group.declarations[0].getStart(sourceFile));
        const modifiers = method.modifiers
            ?.filter(modifier => modifier.kind !== ts.SyntaxKind.AsyncKeyword)
            .map(modifier => source.slice(modifier.getStart(sourceFile), modifier.end))
            .join(" ");
        const declarations = getPublicDeclarations(group);
        const syncSignatures = declarations.map(declaration => `${indent}    ${createAsyncCallSignature(declaration, "sync")}`).join("\n");
        const generatorSignatures = declarations.map(declaration => `${indent}    gen${createAsyncCallSignature(declaration, "generator")}`).join("\n");
        const body = declarations.length > 1
            ? createAsyncOverloadedGetterBody(name, group, indent)
            : `{\n${indent}    const owner = this;\n${indent}    return cacheGeneratorMethod(\n${indent}        owner,\n${indent}        "${name}",\n${indent}        ${createAsyncFunction(method, "sync", false)},\n${indent}        ${createAsyncFunction(method, "generator", true)},\n${indent}    );\n${indent}}`;
        return `${modifiers ? `${modifiers} ` : ""}get ${name}(): {\n${syncSignatures}\n${generatorSignatures}\n${indent}} ${body}`;
    }

    function createAsyncOverloadedGetterBody(name: string, group: MethodGroup, indent: string): string {
        const declarations = getPublicDeclarations(group);
        const syncOverloads = declarations.map(declaration => `function ${name}${createAsyncCallSignature(declaration, "sync")}`).join("\n");
        const generatorOverloads = declarations.map(declaration => `function gen${createAsyncCallSignature(declaration, "generator")}`).join("\n");
        const syncImplementation = createAsyncNamedFunction(name, group.implementation, "sync", false);
        const generatorImplementation = createAsyncNamedFunction("gen", group.implementation, "generator", true);
        return `{\n${indent}    const owner = this;\n${indent}${indentLines(syncOverloads, `${indent}    `)}\n${indent}${indentLines(syncImplementation, `${indent}    `)}\n${indent}${indentLines(generatorOverloads, `${indent}    `)}\n${indent}${indentLines(generatorImplementation, `${indent}    `)}\n${indent}    return cacheGeneratorMethod(owner, "${name}", ${name}, gen);\n${indent}}`;
    }

    function createAsyncCallSignature(node: ts.SignatureDeclarationBase, mode: TransformMode): string {
        return `${getTypeParametersText(node, source, sourceFile)}(${getAsyncSignatureParameters(node, mode)}): ${getAsyncReturnType(node, mode)};`;
    }

    function createAsyncFunction(node: ts.MethodDeclaration, mode: TransformMode, generator: boolean): string {
        const parameters = node.parameters.map(parameter => transformNodeText(parameter, mode, true)).join(", ");
        const body = transformNodeText(node.body!, mode, true);
        return `function${generator ? "*" : ""} ${getTypeParametersText(node, source, sourceFile)}(${parameters}): ${getAsyncReturnType(node, mode)} ${body}`;
    }

    function createAsyncNamedFunction(name: string, node: ts.MethodDeclaration, mode: TransformMode, generator: boolean): string {
        const parameters = node.parameters.map(parameter => transformNodeText(parameter, mode, true)).join(", ");
        const body = transformNodeText(node.body!, mode, true);
        return `function${generator ? "*" : ""} ${name}${getTypeParametersText(node, source, sourceFile)}(${parameters}): ${getAsyncReturnType(node, mode)} ${body}`;
    }

    function getAsyncSignatureParameters(node: ts.SignatureDeclarationBase, mode: TransformMode): string {
        return node.parameters.map(parameter => {
            const rest = parameter.dotDotDotToken ? "..." : "";
            const name = source.slice(parameter.name.getStart(sourceFile), parameter.name.end);
            const optional = parameter.questionToken || parameter.initializer ? "?" : "";
            const type = parameter.type ? transformNodeText(parameter.type, mode, false) : "unknown";
            return `${rest}${name}${optional}: ${type}`;
        }).join(", ");
    }

    function getAsyncReturnType(node: ts.SignatureDeclarationBase, mode: TransformMode): string {
        if (!node.type) return "void";
        if (mode === "generator" && isPromiseType(node.type)) {
            const returnType = getUnwrappedPromiseText(node.type, source, sourceFile);
            return `Generator<ProtocolRequest, ${returnType}, ProtocolResponse["result"]>`;
        }
        return transformNodeText(node.type, mode, false);
    }

    function transformNodeText(node: ts.Node, mode: TransformMode, replaceThis: boolean): string {
        const start = node.getStart(sourceFile);
        const localEdits: Edit[] = [];

        function visitNode(current: ts.Node): void {
            if (replaceThis && current.kind === ts.SyntaxKind.ThisKeyword) {
                localEdits.push({ start: current.getStart(sourceFile) - start, end: current.end - start, newText: "owner" });
                return;
            }
            if (replaceThis && ts.isBlock(node) && current !== node && ts.isFunctionLike(current) && !ts.isArrowFunction(current)) return;

            if (mode === "sync") {
                if (addSyncEdit(current, source, sourceFile, localEdits, start)) return;
            }
            else if (addGeneratorEdit(current, start, localEdits)) {
                return;
            }
            ts.forEachChild(current, visitNode);
        }

        visitNode(node);
        return applyEdits(source.slice(start, node.end), localEdits);
    }

    function addGeneratorEdit(node: ts.Node, offset: number, targetEdits: Edit[]): boolean {
        if (ts.isAwaitExpression(node)) {
            const replacement = getGeneratorAwaitText(node);
            editsForNode(node, replacement, offset);
            return true;
        }
        if (ts.isCallExpression(node) && isAPIRequestCall(node) && !ts.isAwaitExpression(node.parent)) {
            const receiver = node.expression.expression;
            if (ts.isPropertyAccessExpression(receiver) && receiver.name.text === "client") {
                editsForNode(node, getRequestYieldText(node), offset);
                return true;
            }
        }
        if (
            ts.isCallExpression(node) &&
            !ts.isAwaitExpression(node.parent) &&
            isGeneratorCall(node)
        ) {
            const generatorCall = `yield* ${getGeneratorCallText(node)}`;
            editsForNode(node, ts.isReturnStatement(node.parent) ? generatorCall : `(${generatorCall})`, offset);
            return true;
        }
        if (ts.isTypeReferenceNode(node) && isPromiseType(node)) {
            const replacement = isFunctionReturnType(node)
                ? `Generator<ProtocolRequest, ${getUnwrappedPromiseText(node, source, sourceFile)}, ProtocolResponse["result"]>`
                : getUnwrappedPromiseText(node, source, sourceFile);
            editsForNode(node, replacement, offset);
            return true;
        }
        return false;

        function editsForNode(current: ts.Node, replacement: string, base: number): void {
            targetEdits.push({ start: current.getStart(sourceFile) - base, end: current.end - base, newText: replacement });
        }
    }

    function getGeneratorAwaitText(node: ts.AwaitExpression): string {
        if (isAPIRequestCall(node.expression)) {
            const receiver = node.expression.expression.expression;
            if (ts.isPropertyAccessExpression(receiver) && receiver.name.text === "client") return getRequestYieldText(node.expression);
            return `yield ${getTextWithOwner(node.expression)}`;
        }
        if (
            ts.isCallExpression(node.expression) &&
            ts.isPropertyAccessExpression(node.expression.expression) &&
            ts.isPropertyAccessExpression(node.expression.expression.expression) &&
            node.expression.expression.expression.name.text === "client"
        ) {
            return getTextWithOwner(node.expression);
        }
        if (ts.isCallExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === "cb") {
            return `yield* (${getTextWithOwner(node.expression)} ?? [])`;
        }
        const expression = ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression)
            ? getGeneratorCallText(node.expression)
            : getTextWithOwner(node.expression);
        return `(yield* ${expression})`;
    }

    function getRequestYieldText(call: ts.CallExpression): string {
        const [method, params] = call.arguments;
        const methodText = getTextWithOwner(method);
        const paramsText = params ? getTextWithOwner(params) : "undefined";
        return `yield* apiRequest(${methodText}, ${paramsText})`;
    }

    function getGeneratorCallText(call: ts.CallExpression): string {
        const expression = getTextWithOwner(call.expression);
        const callText = getTextWithOwner(call);
        return `${expression}.gen${callText.slice(expression.length)}`;
    }

    function getTextWithOwner(node: ts.Node): string {
        const start = node.getStart(sourceFile);
        const ownerEdits: Edit[] = [];

        function visitNode(current: ts.Node): void {
            if (current.kind === ts.SyntaxKind.ThisKeyword) {
                ownerEdits.push({ start: current.getStart(sourceFile) - start, end: current.end - start, newText: "owner" });
                return;
            }
            if (current !== node && ts.isFunctionLike(current) && !ts.isArrowFunction(current)) return;
            ts.forEachChild(current, visitNode);
        }

        visitNode(node);
        return applyEdits(source.slice(start, node.end), ownerEdits);
    }

    function isGeneratorCall(node: ts.Expression): boolean {
        if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return isGeneratorCall(node.expression);
        if (ts.isConditionalExpression(node)) return isGeneratorCall(node.whenTrue) && isGeneratorCall(node.whenFalse);
        const call = getCallExpression(node);
        return !!call &&
            ts.isPropertyAccessExpression(call.expression) &&
            !(ts.isPropertyAccessExpression(call.expression.expression) && call.expression.expression.name.text === "client") &&
            !synchronousMethodNames.has(call.expression.name.text) &&
            asyncMethodNames.has(call.expression.name.text);
    }

    function isGeneratorMethod(node: ts.MethodDeclaration): boolean {
        return !!node.body && (node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword) || isPromiseType(node.type));
    }

    function isPromiseType(node: ts.TypeNode | undefined): node is ts.TypeReferenceNode {
        return !!node &&
            ts.isTypeReferenceNode(node) &&
            ts.isIdentifier(node.typeName) &&
            node.typeName.text === "Promise" &&
            node.typeArguments?.length === 1;
    }

    function isAPIRequestCall(node: ts.Expression): node is ts.CallExpression & { expression: ts.PropertyAccessExpression; } {
        return ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "apiRequest";
    }

    function getCallExpression(node: ts.Expression): ts.CallExpression | undefined {
        while (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) node = node.expression;
        return ts.isCallExpression(node) ? node : undefined;
    }

    function isFunctionReturnType(node: ts.TypeNode): boolean {
        let current: ts.Node = node;
        while (ts.isTypeNode(current.parent)) {
            if ((ts.isFunctionTypeNode(current.parent) || ts.isConstructorTypeNode(current.parent)) && current.parent.type === current) return true;
            current = current.parent;
        }
        return ts.isFunctionLike(current.parent) && current.parent.type === current;
    }
}

function addSyncEdit(node: ts.Node, source: string, sourceFile: ts.SourceFile, edits: Edit[], offset: number = 0): boolean {
    if (
        (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
        node.modifiers
    ) {
        for (const modifier of node.modifiers) {
            if (modifier.kind !== ts.SyntaxKind.AsyncKeyword) continue;
            let end = modifier.end;
            while (end < source.length && source[end] === " ") end++;
            edits.push({ start: modifier.getStart(sourceFile) - offset, end: end - offset, newText: "" });
        }
    }
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.AwaitUsing) === ts.NodeFlags.AwaitUsing) {
        const awaitKeyword = node.getFirstToken(sourceFile);
        if (awaitKeyword?.kind !== ts.SyntaxKind.AwaitKeyword) throw new Error("Expected await using declaration");
        edits.push({ start: awaitKeyword.getStart(sourceFile) - offset, end: awaitKeyword.end - offset, newText: "" });
    }
    if (ts.isAwaitExpression(node)) {
        edits.push({
            start: node.getStart(sourceFile) - offset,
            end: node.expression.getStart(sourceFile) - offset,
            newText: "",
        });
    }
    if (isPromiseTypeReference(node)) {
        const innerText = getUnwrappedPromiseText(node, source, sourceFile);
        if (ts.isUnionTypeNode(node.parent)) {
            const unionTypes = node.parent.types;
            const currentIndex = unionTypes.indexOf(node);
            const representativeIndex = unionTypes.findIndex(type => getUnwrappedTypeText(type, source, sourceFile) === innerText);
            if (representativeIndex !== currentIndex) {
                if (currentIndex < representativeIndex) {
                    edits.push({
                        start: node.getStart(sourceFile) - offset,
                        end: unionTypes[currentIndex + 1].getStart(sourceFile) - offset,
                        newText: "",
                    });
                }
                else {
                    edits.push({
                        start: unionTypes[currentIndex - 1].end - offset,
                        end: node.end - offset,
                        newText: "",
                    });
                }
                return true;
            }
        }
        edits.push({ start: node.getStart(sourceFile) - offset, end: node.end - offset, newText: innerText });
        return true;
    }
    return false;
}

function isPromiseTypeReference(node: ts.Node | undefined): node is ts.TypeReferenceNode {
    return !!node &&
        ts.isTypeReferenceNode(node) &&
        ts.isIdentifier(node.typeName) &&
        node.typeName.text === "Promise" &&
        node.typeArguments?.length === 1;
}

function getUnwrappedPromiseText(node: ts.TypeNode, source: string, sourceFile: ts.SourceFile): string {
    let current = node;
    while (isPromiseTypeReference(current)) current = current.typeArguments![0];
    return source.slice(current.getStart(sourceFile), current.end);
}

function getUnwrappedTypeText(node: ts.TypeNode, source: string, sourceFile: ts.SourceFile): string {
    return isPromiseTypeReference(node) ? getUnwrappedPromiseText(node, source, sourceFile) : source.slice(node.getStart(sourceFile), node.end);
}

interface MethodGroup {
    declarations: readonly ts.MethodDeclaration[];
    implementation: ts.MethodDeclaration;
}

function getNamedClasses(sourceFile: ts.SourceFile): Map<string, ts.ClassDeclaration> {
    const classes = new Map<string, ts.ClassDeclaration>();
    for (const statement of sourceFile.statements) {
        if (ts.isClassDeclaration(statement) && statement.name) classes.set(statement.name.text, statement);
    }
    return classes;
}

function getMethodGroups(node: ts.ClassDeclaration): Map<string, MethodGroup> {
    const groups = new Map<string, MethodGroup>();
    for (let index = 0; index < node.members.length; index++) {
        const member = node.members[index];
        if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name)) continue;

        const declarations = [member];
        while (index + 1 < node.members.length) {
            const nextMember = node.members[index + 1];
            if (!ts.isMethodDeclaration(nextMember) || !ts.isIdentifier(nextMember.name) || nextMember.name.text !== member.name.text) break;
            declarations.push(nextMember);
            index++;
        }
        const implementation = declarations.findLast(declaration => declaration.body);
        if (!implementation) continue;
        groups.set(getMethodKey(implementation), { declarations, implementation });
    }
    return groups;
}

function getSignatureGroups(node: ts.InterfaceDeclaration): Map<string, readonly ts.MethodSignature[]> {
    const groups = new Map<string, ts.MethodSignature[]>();
    for (const member of node.members) {
        if (!ts.isMethodSignature(member) || !ts.isIdentifier(member.name)) continue;
        const declarations = groups.get(member.name.text) ?? [];
        declarations.push(member);
        groups.set(member.name.text, declarations);
    }
    return groups;
}

function getMethodKey(node: ts.MethodDeclaration): string {
    return `${node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword) ? "static:" : ""}${(node.name as ts.Identifier).text}`;
}

function getPublicDeclarations(group: MethodGroup): readonly ts.MethodDeclaration[] {
    const overloads = group.declarations.filter(declaration => !declaration.body);
    return overloads.length ? overloads : [group.implementation];
}

function indentLines(text: string, indent: string): string {
    return text.replaceAll("\n", `\n${indent}`);
}

function getTypeParametersText(node: ts.SignatureDeclarationBase, source: string, sourceFile: ts.SourceFile): string {
    if (!node.typeParameters?.length) return "";
    return `<${node.typeParameters.map(typeParameter => source.slice(typeParameter.getStart(sourceFile), typeParameter.end)).join(", ")}>`;
}

function getIndent(source: string, position: number): string {
    const lineStart = source.lastIndexOf("\n", position - 1) + 1;
    return source.slice(lineStart, position);
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
            relPath === "api.ts"
                ? (source, fileName) =>
                    [
                        'import type { APIRequest as ProtocolRequest, APIResponse as ProtocolResponse } from "../proto.ts";',
                        'import { apiRequest, cacheGeneratorMethod } from "./generatorSupport.ts";',
                        "",
                        transformAsyncSource(source, fileName, true),
                    ].join("\n")
                : (source, fileName) =>
                    [
                        'import type { APIRequest as ProtocolRequest, APIResponse as ProtocolResponse } from "../proto.ts";',
                        "",
                        transformAsyncSource(source, fileName, true),
                    ].join("\n"),
        ));
    }

    // Test files
    for (const relPath of ["api.test.ts", "api.bench.ts", "astnav.test.ts"]) {
        generatedFiles.push(generateSyncFile(
            join(TEST, "async", relPath),
            join(TEST, "sync", relPath),
            (source, fileName) => transformAsyncSource(source, fileName, false),
        ));
    }

    console.log("Formatting...");
    formatFiles(generatedFiles);
    console.log("Done.");
}

if (process.argv[1] === import.meta.filename) {
    generateSync();
}
