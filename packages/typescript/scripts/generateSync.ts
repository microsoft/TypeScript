#!/usr/bin/env node

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
 *   - Generate synchronous and generator implementations of each async method
 *     as private methods (`#name` and `#nameGen`)
 *   - Expose each as a prototype getter returning a callable bound to the
 *     instance, with the generator variant as its `.gen` property. Bound
 *     callables are cached in a per-instance slot array, so instances never
 *     gain per-method own properties.
 *   - Call private implementations directly for `this.method()` calls
 *   - Unwrap `Promise<T>` → `T` in synchronous type references
 *
 * Usage:
 *   node generateSync.ts
 */

import { readFileSync } from "node:fs";
import {
    join,
    relative,
} from "node:path";
import ts from "typescript";
import { GeneratedFile } from "../../../tools/scripts/gen/generatedFile.mts";
import {
    formatFilesSync,
    parseGeneratorArgs,
} from "../../../tools/scripts/gen/utils.mts";

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
type SyncVariant = "sync" | "generators";

function generateSyncFile(
    srcPath: string,
    destPath: string,
    transform: SourceTransform,
    force: boolean,
    variant: SyncVariant = "sync",
): GeneratedFile | undefined {
    const generated = new GeneratedFile(destPath, [import.meta.filename, srcPath]);
    if (generated.isCurrent(force)) return;
    const source = readFileSync(srcPath, "utf-8");

    // Normalize line endings to LF
    const normalized = source.replace(/\r/g, "");

    // Phase 1: Process sync directives (text-based, operates on comments/lines)
    const afterDirectives = processDirectives(normalized.split("\n"), variant).join("\n");

    // Phase 2: AST-based async→sync transforms
    const fileName = destPath.split("/").pop()!;
    let result = transform(afterDirectives, fileName);

    // Prepend generated header pointing to async source
    const srcRelPath = relative(ROOT, srcPath).replaceAll("\\", "/");
    result = generatedHeader(srcRelPath) + result;

    generated.write(result);
    const label = relative(ROOT, srcPath).replaceAll("\\", "/");
    const destLabel = relative(ROOT, destPath).replaceAll("\\", "/");
    console.log(`  ${label} → ${destLabel}`);
    return generated;
}

// ── Directive processing ─────────────────────────────────────────

function processDirectives(lines: string[], variant: SyncVariant): string[] {
    const output: string[] = [];
    let skipBlock = false;
    let syncOnlyBlock = false;
    let generatorsOnlyBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed === "// @generators-skip-block-start") {
            skipBlock = variant === "generators";
            continue;
        }
        if (trimmed === "// @generators-skip-block-end") {
            skipBlock = false;
            continue;
        }

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

        if (trimmed === "// @generators-only-start") {
            generatorsOnlyBlock = true;
            continue;
        }
        if (trimmed === "// @generators-only-end") {
            generatorsOnlyBlock = false;
            continue;
        }

        if (generatorsOnlyBlock) {
            if (variant === "generators") output.push(uncommentLine(line));
            continue;
        }

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
            output.push(uncommentLine(line));
            continue;
        }

        if (variant === "generators" && line.includes("// @generators-skip")) {
            continue;
        }

        // Single-line skip
        if (line.includes("// @sync-skip")) {
            continue;
        }

        // Single-line replacement: // @sync: <replacement>
        const generatorsReplaceMatch = line.match(/\/\/ @generators: (.+)$/);
        if (variant === "generators" && generatorsReplaceMatch) {
            const indent = line.match(/^(\s*)/)![1];
            output.push(indent + generatorsReplaceMatch[1]);
            continue;
        }

        const lineWithoutGeneratorsDirective = generatorsReplaceMatch
            ? line.slice(0, generatorsReplaceMatch.index).trimEnd()
            : line;
        const syncReplaceMatch = lineWithoutGeneratorsDirective.match(/\/\/ @sync: (.+)$/);
        if (syncReplaceMatch) {
            const indent = lineWithoutGeneratorsDirective.match(/^(\s*)/)![1];
            output.push(indent + syncReplaceMatch[1]);
            continue;
        }

        output.push(lineWithoutGeneratorsDirective);
    }

    return output;
}

function uncommentLine(line: string): string {
    const indent = line.match(/^(\s*)/)![1];
    const rest = line.slice(indent.length);
    if (rest.startsWith("// ")) return indent + rest.slice(3);
    if (rest === "//") return indent;
    return line;
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

const generatorMethodCacheField = "#generatorMethods";
const staticGeneratorMethodCacheField = "#staticGeneratorMethods";

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

    // Slot indices of each class's generated methods, keyed by `getMethodKey`.
    let currentClassSlots: Map<string, number> | undefined;
    let currentClass: ts.ClassDeclaration | undefined;

    visit(sourceFile);
    return applyEdits(source, edits);

    function visit(node: ts.Node): void {
        if (attachGenerators && ts.isClassDeclaration(node)) {
            const replacedMethods = new Set<ts.MethodDeclaration>();
            const generatedGroups = [...getMethodGroups(node).values()].filter(group => isGeneratorMethod(group.implementation));
            const slots = new Map<string, number>();
            let instanceSlotCount = 0;
            let staticSlotCount = 0;
            for (const group of generatedGroups) {
                slots.set(getMethodKey(group.implementation), isStaticMethod(group.implementation) ? staticSlotCount++ : instanceSlotCount++);
            }
            currentClassSlots = slots;
            currentClass = node;
            for (const group of generatedGroups) {
                for (const declaration of group.declarations) replacedMethods.add(declaration);
                edits.push({
                    start: group.declarations[0].getStart(sourceFile),
                    end: group.implementation.end,
                    newText: createCombinedMethodFromAsync(group, node, source, sourceFile),
                });
            }
            if (generatedGroups.length) {
                const cacheFields = [
                    instanceSlotCount ? `${generatorMethodCacheField}: GeneratorMethodCache | undefined;` : undefined,
                    staticSlotCount ? `static ${staticGeneratorMethodCacheField}: GeneratorMethodCache | undefined;` : undefined,
                ].filter(field => field !== undefined);
                edits.push({ start: node.members.pos, end: node.members.pos, newText: `\n${cacheFields.join("\n")}` });
            }
            for (const member of node.members) {
                if (!ts.isMethodDeclaration(member) || !replacedMethods.has(member)) visit(member);
            }
            currentClassSlots = undefined;
            currentClass = undefined;
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
        addPrivateImplementationCallEdit(node, edits, 0);
        ts.forEachChild(node, visit);
    }

    function createCombinedMethodFromAsync(group: MethodGroup, classDeclaration: ts.ClassDeclaration, source: string, sourceFile: ts.SourceFile): string {
        const method = group.implementation;
        const name = (method.name as ts.Identifier).text;
        const isStatic = isStaticMethod(method);
        const staticPrefix = isStatic ? "static " : "";
        const indent = getIndent(source, group.declarations[0].getStart(sourceFile));
        const modifiers = method.modifiers
            ?.filter(modifier => modifier.kind !== ts.SyntaxKind.AsyncKeyword)
            .map(modifier => source.slice(modifier.getStart(sourceFile), modifier.end))
            .join(" ");
        const declarations = getPublicDeclarations(group);
        const syncSignatures = declarations.map(declaration => `${indent}    ${createAsyncCallSignature(declaration, "sync")}`).join("\n");
        const generatorSignatures = declarations.map(declaration => `${indent}    gen${createAsyncCallSignature(declaration, "generator")}`).join("\n");
        const slot = currentClassSlots!.get(getMethodKey(method))!;
        const cacheOwner = isStatic ? classDeclaration.name!.text : "this";
        const slotCount = [...currentClassSlots!.keys()].filter(key => key.startsWith("static:") === isStatic).length;
        const getter = `${modifiers ? `${modifiers} ` : ""}get ${name}(): {\n${syncSignatures}\n${generatorSignatures}\n${indent}} {\n` +
            `${indent}    return getGeneratorMethod(this, ${cacheOwner}.${isStatic ? staticGeneratorMethodCacheField : generatorMethodCacheField} ??= createGeneratorMethodCache(${slotCount}), ${slot}, this.#${name}, this.#${name}Gen);\n` +
            `${indent}}`;
        const hasOverloads = group.declarations.some(declaration => !declaration.body);
        const syncOverloads = hasOverloads ? declarations.map(declaration => `${staticPrefix}#${name}${createAsyncCallSignature(declaration, "sync")}\n${indent}`).join("") : "";
        const generatorOverloads = hasOverloads ? declarations.map(declaration => `${staticPrefix}#${name}Gen${createAsyncCallSignature(declaration, "generator")}\n${indent}`).join("") : "";
        const syncImplementation = `${staticPrefix}${createAsyncImplementation(`#${name}`, method, "sync")}`;
        const generatorImplementation = `${staticPrefix}*${createAsyncImplementation(`#${name}Gen`, method, "generator")}`;
        return `${getter}\n\n${indent}${syncOverloads}${syncImplementation}\n\n${indent}${generatorOverloads}${generatorImplementation}`;
    }

    function createAsyncCallSignature(node: ts.SignatureDeclarationBase, mode: TransformMode): string {
        return `${getTypeParametersText(node, source, sourceFile)}(${getAsyncSignatureParameters(node, mode)}): ${getAsyncReturnType(node, mode)};`;
    }

    function createAsyncImplementation(name: string, node: ts.MethodDeclaration, mode: TransformMode): string {
        const parameters = node.parameters.map(parameter => transformNodeText(parameter, mode, false)).join(", ");
        const body = transformNodeText(node.body!, mode, true);
        return `${name}${getTypeParametersText(node, source, sourceFile)}(${parameters}): ${getAsyncReturnType(node, mode)} ${body}`;
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

    function transformNodeText(node: ts.Node, mode: TransformMode, isBody: boolean): string {
        const start = node.getStart(sourceFile);
        const localEdits: Edit[] = [];

        function visitNode(current: ts.Node): void {
            if (isBody && ts.isBlock(node) && current !== node && ts.isFunctionLike(current) && !ts.isArrowFunction(current)) return;

            if (mode === "sync") {
                if (addSyncEdit(current, source, sourceFile, localEdits, start)) return;
            }
            else if (addGeneratorEdit(current, start, localEdits)) {
                return;
            }
            addPrivateImplementationCallEdit(current, localEdits, start);
            ts.forEachChild(current, visitNode);
        }

        visitNode(node);
        return applyEdits(source.slice(start, node.end), localEdits);
    }

    /**
     * Returns the private implementation name for a call like `this.method()`
     * when `method` is a generated method of the class `this` refers to.
     */
    function getPrivateImplementationName(call: ts.CallExpression): string | undefined {
        if (!currentClassSlots) return undefined;
        const callee = call.expression;
        if (!ts.isPropertyAccessExpression(callee) || callee.expression.kind !== ts.SyntaxKind.ThisKeyword || !ts.isIdentifier(callee.name)) return undefined;
        let container: ts.Node = callee.parent;
        while (!ts.isClassStaticBlockDeclaration(container) && !ts.isPropertyDeclaration(container) && !(ts.isFunctionLike(container) && !ts.isArrowFunction(container))) {
            container = container.parent;
        }
        if (container.parent !== currentClass) return undefined;
        const isStatic = ts.isClassStaticBlockDeclaration(container) || (ts.canHaveModifiers(container) && !!ts.getModifiers(container)?.some(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword));
        const name = callee.name.text;
        return currentClassSlots.has(`${isStatic ? "static:" : ""}${name}`) ? `#${name}` : undefined;
    }

    function addPrivateImplementationCallEdit(node: ts.Node, targetEdits: Edit[], offset: number): void {
        if (!ts.isCallExpression(node) || !getPrivateImplementationName(node)) return;
        const name = (node.expression as ts.PropertyAccessExpression).name;
        targetEdits.push({ start: name.getStart(sourceFile) - offset, end: name.end - offset, newText: `#${name.text}` });
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
            return `yield ${getNodeText(node.expression)}`;
        }
        if (
            ts.isCallExpression(node.expression) &&
            ts.isPropertyAccessExpression(node.expression.expression) &&
            ts.isPropertyAccessExpression(node.expression.expression.expression) &&
            node.expression.expression.expression.name.text === "client"
        ) {
            return getNodeText(node.expression);
        }
        if (ts.isCallExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === "cb") {
            return `yield* (${getNodeText(node.expression)} ?? [])`;
        }
        const expression = ts.isCallExpression(node.expression) && ts.isPropertyAccessExpression(node.expression.expression)
            ? getGeneratorCallText(node.expression)
            : getNodeText(node.expression);
        return `(yield* ${expression})`;
    }

    function getRequestYieldText(call: ts.CallExpression): string {
        const [method, params] = call.arguments;
        const methodText = getNodeText(method);
        const paramsText = params ? getNodeText(params) : "undefined";
        const request = `yield* apiRequest(${methodText}, ${paramsText})`;
        return ts.isPropertyAccessExpression(call.expression) && call.expression.name.text === "apiRequestBinary"
            ? `sourceFileResponseToUint8Array((${request}))`
            : request;
    }

    function getGeneratorCallText(call: ts.CallExpression): string {
        const expression = getNodeText(call.expression);
        const callText = getNodeText(call);
        const privateName = getPrivateImplementationName(call);
        if (privateName) return `this.${privateName}Gen${callText.slice(expression.length)}`;
        return `${expression}.gen${callText.slice(expression.length)}`;
    }

    function getNodeText(node: ts.Node): string {
        return source.slice(node.getStart(sourceFile), node.end);
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
        return ts.isCallExpression(node)
            && ts.isPropertyAccessExpression(node.expression)
            && (node.expression.name.text === "apiRequest" || node.expression.name.text === "apiRequestBinary");
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
    return `${isStaticMethod(node) ? "static:" : ""}${(node.name as ts.Identifier).text}`;
}

function isStaticMethod(node: ts.MethodDeclaration): boolean {
    return !!node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword);
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

// ── Main ─────────────────────────────────────────────────────────

export function generateSync(force = false): void {
    const generatedFiles: (GeneratedFile | undefined)[] = [];

    // Source files
    for (const relPath of ["types.ts", "api.ts"]) {
        generatedFiles.push(generateSyncFile(
            join(SRC, "async", relPath),
            join(SRC, "sync", relPath),
            relPath === "api.ts"
                ? (source, fileName) =>
                    [
                        'import type { APIRequest as ProtocolRequest, APIResponse as ProtocolResponse } from "../proto.ts";',
                        'import { apiRequest, createGeneratorMethodCache, getGeneratorMethod, type GeneratorMethodCache } from "./generatorSupport.ts";',
                        "",
                        transformAsyncSource(source, fileName, true),
                    ].join("\n")
                : (source, fileName) =>
                    [
                        'import type { APIRequest as ProtocolRequest, APIResponse as ProtocolResponse } from "../proto.ts";',
                        "",
                        transformAsyncSource(source, fileName, true),
                    ].join("\n"),
            force,
        ));
    }

    // Test files
    for (const relPath of ["api.test.ts", "api.bench.ts", "astnav.test.ts"]) {
        generatedFiles.push(generateSyncFile(
            join(TEST, "async", relPath),
            join(TEST, "sync", relPath),
            (source, fileName) => transformAsyncSource(source, fileName, false),
            force,
        ));
    }

    generatedFiles.push(generateSyncFile(
        join(TEST, "async", "api.bench.ts"),
        join(TEST, "generators", "api.bench.ts"),
        (source, fileName) => transformAsyncSource(source, fileName, false),
        force,
        "generators",
    ));

    const changedFiles = generatedFiles.filter(file => file !== undefined);
    if (!changedFiles.length) {
        return;
    }
    console.log("Formatting...");
    formatFilesSync(changedFiles.map(file => file.fileName));
    for (const file of changedFiles) file.markCurrent();
    console.log("Done.");
}

if (process.argv[1] === import.meta.filename) {
    generateSync(parseGeneratorArgs({}).force);
}
