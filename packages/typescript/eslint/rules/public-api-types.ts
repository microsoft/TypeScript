import {
    ESLintUtils,
    type TSESTree,
} from "@typescript-eslint/utils";
import path from "node:path";
import ts from "typescript";

const { SyntaxKind, SymbolFlags } = ts;
const createRule = ESLintUtils.RuleCreator(() => "");

type Options = [{ entrypoints?: string[]; sameEntrypoint?: string[]; }?];
type MessageId = "missingExport" | "missingValueExport" | "missingEntrypointExport" | "missingEntrypointValueExport" | "missingRequiredExport" | "unresolvedReference";

const typeExport = 1;
const valueExport = 2;

function hasInternalComment(node: ts.Node): boolean {
    // The tsgo adapter exposes JSDoc nodes but their kinds are not classic JSDoc kinds.
    return !!(node as ts.Node & { jsDoc?: readonly ts.JSDoc[]; }).jsDoc?.some(doc => doc.tags?.some(tag => tag.tagName?.text === "internal"));
}
function isInternal(node: ts.Node): boolean {
    return hasInternalComment(node)
        || ts.isVariableDeclaration(node) && hasInternalComment(node.parent.parent);
}

function isPrivateMember(node: ts.Node): boolean {
    return ts.isClassElement(node) && (
        !!node.name && ts.isPrivateIdentifier(node.name)
        || ts.canHaveModifiers(node) && !!ts.getModifiers(node)?.some(modifier => modifier.kind === SyntaxKind.PrivateKeyword)
    );
}

// Yield only children that contribute to declaration emit.
function forEachEmittedChild(node: ts.Node, callback: (node: ts.Node) => void, isOverloadImplementation: (node: ts.Node) => boolean): void {
    node.forEachChild(child => {
        if (child.kind === SyntaxKind.Decorator || child.kind === SyntaxKind.ClassStaticBlockDeclaration) return;
        if (ts.isFunctionLike(node) && child === (node as ts.FunctionLikeDeclaration).body) return;
        if ((ts.isVariableDeclaration(node) || ts.isPropertyDeclaration(node) || ts.isParameter(node)) && child === node.initializer && node.type) return;
        if (ts.isEnumMember(node) && child === node.initializer) return;
        if (isPrivateMember(child) || isOverloadImplementation(child) || isInternal(child)) return;
        callback(child);
    });
}

function getReferenceName(node: ts.Node): ts.Node | undefined {
    if (ts.isTypeReferenceNode(node)) return node.typeName;
    if (ts.isExpressionWithTypeArguments(node)) return node.expression;
    if (ts.isTypeQueryNode(node)) return node.exprName;
    if (ts.isImportTypeNode(node)) return node.qualifier;
}

export default createRule<Options, MessageId>({
    name: "public-api-types",
    meta: {
        docs: {
            description: "Require types referenced by public declarations to be exported from a public entrypoint.",
        },
        messages: {
            missingExport: "Public API references '{{name}}', but this type is not exported from any public entrypoint.",
            missingValueExport: "Public API references enum '{{name}}', but its value is not exported from any public entrypoint.",
            missingEntrypointExport: "Type '{{name}}', referenced by '{{root}}', is not exported from this entrypoint.",
            missingEntrypointValueExport: "Enum '{{name}}', referenced by '{{root}}', has no value export from this entrypoint.",
            missingRequiredExport: "This entrypoint must export '{{name}}'.",
            unresolvedReference: "Cannot resolve public API reference '{{name}}'.",
        },
        schema: [{
            type: "object",
            properties: {
                entrypoints: { type: "array", items: { type: "string" }, minItems: 1, uniqueItems: true },
                sameEntrypoint: { type: "array", items: { type: "string" }, uniqueItems: true },
            },
            additionalProperties: false,
        }],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const { program } = ESLintUtils.getParserServices(context);
        return {
            Program(programNode) {
                const filename = path.resolve(context.filename);
                const options = context.options[0] ?? {};
                const entrypoints = (options.entrypoints ?? [filename]).map(file => path.resolve(context.cwd, file));
                if (!entrypoints.includes(filename)) {
                    throw new Error(`Public entrypoint ${filename} is missing from the configured entrypoints`);
                }
                check(context, programNode, filename, options.sameEntrypoint ?? [], getAnalysis(program, entrypoints));
            },
        };
    },
});

/** Analyses are shared by every file linted against the same program and entrypoints. */
const analyses = new WeakMap<ts.Program, Map<string, ReturnType<typeof analyze>>>();
function getAnalysis(program: ts.Program, entrypoints: string[]): ReturnType<typeof analyze> {
    let byEntrypoints = analyses.get(program);
    if (!byEntrypoints) analyses.set(program, byEntrypoints = new Map());
    const key = entrypoints.join("\0");
    let analysis = byEntrypoints.get(key);
    if (!analysis) byEntrypoints.set(key, analysis = analyze(program, entrypoints));
    return analysis;
}

function analyze(program: ts.Program, entrypoints: string[]) {
    const checker = program.getTypeChecker() as ts.TypeChecker & { isUnknownSymbol(symbol: ts.Symbol): boolean; };
    const getDeclarations = (symbol: ts.Symbol): readonly ts.Declaration[] => symbol.declarations ?? [];

    // typescript-eslint's tsgo adapter doesn't expose isImplementationOfOverload.
    // Use the checker's signatures, which distinguish static and instance members.
    const isOverloadImplementation = (node: ts.Node): boolean => {
        if (!(ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isConstructorDeclaration(node)) || !node.body) return false;
        const location = ts.isConstructorDeclaration(node) ? node.parent.name ?? node.parent : node.name ?? node;
        let symbol = checker.getSymbolAtLocation(location);
        if (!symbol && ts.isConstructorDeclaration(node) && ts.isClassDeclaration(node.parent) && !node.parent.name) {
            const module = checker.getSymbolAtLocation(node.getSourceFile());
            symbol = module && checker.getExportsOfModule(module).find(exported => exported.declarations?.includes(node.parent));
        }
        if (!symbol) return false;
        const type = checker.getTypeOfSymbolAtLocation(symbol, node);
        const signatures = checker.getSignaturesOfType(type, ts.isConstructorDeclaration(node) ? ts.SignatureKind.Construct : ts.SignatureKind.Call);
        return signatures.length > 1 || signatures.length === 1 && signatures[0].getDeclaration() !== node;
    };

    const resolveCache = new Map<ts.Symbol, ts.Symbol>();
    const resolve = (symbol: ts.Symbol): ts.Symbol => {
        let result = resolveCache.get(symbol);
        if (result) return result;
        result = symbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
        if (result.flags & SymbolFlags.EnumMember) {
            const declaration = getDeclarations(result)[0];
            const enumName = declaration && ts.isEnumDeclaration(declaration.parent) ? declaration.parent.name : undefined;
            const enumSymbol = enumName && checker.getSymbolAtLocation(enumName);
            if (!enumSymbol) throw new Error(`Cannot resolve enum containing '${result.name}'`);
            result = enumSymbol;
        }
        resolveCache.set(symbol, result);
        return result;
    };
    const isInternalSymbol = (symbol: ts.Symbol): boolean => {
        const declarations = getDeclarations(symbol);
        return declarations.length > 0 && declarations.every(isInternal);
    };
    const isInternalExport = (declaration: ts.Declaration): boolean =>
        isInternal(declaration)
        || declaration.kind === SyntaxKind.ExportSpecifier && isInternal(declaration.parent.parent)
        || declaration.kind === SyntaxKind.NamespaceExport && isInternal(declaration.parent);

    const moduleExportsCache = new Map<ts.Symbol, Map<string, ts.Symbol>>();
    const getModuleExports = (symbol: ts.Symbol): Map<string, ts.Symbol> => {
        let exports = moduleExportsCache.get(symbol);
        if (!exports) {
            exports = new Map(checker.getExportsOfModule(symbol).map(member => [member.name, member]));
            moduleExportsCache.set(symbol, exports);
        }
        return exports;
    };
    const getModule = (specifier: ts.Node): ts.Symbol => {
        const module = checker.getSymbolAtLocation(specifier);
        if (!module) throw new Error(`Cannot resolve module ${specifier.getText()}`);
        return module;
    };
    const starExportsCache = new Map<ts.Symbol, { symbol: ts.Symbol; typeOnly: boolean; }[]>();
    const getStarExports = (symbol: ts.Symbol) => {
        let exports = starExportsCache.get(symbol);
        if (!exports) {
            const declaration = getDeclarations(symbol).find(node => ts.isSourceFile(node) || ts.isModuleDeclaration(node));
            const body = declaration && ts.isModuleDeclaration(declaration) ? declaration.body : undefined;
            const statements = declaration && ts.isSourceFile(declaration) ? declaration.statements : body && ts.isModuleBlock(body) ? body.statements : undefined;
            exports = [...statements ?? []]
                .filter((node): node is ts.ExportDeclaration => ts.isExportDeclaration(node) && !node.exportClause && !!node.moduleSpecifier && !isInternal(node))
                .map(node => ({ symbol: getModule(node.moduleSpecifier!), typeOnly: node.isTypeOnly }));
            starExportsCache.set(symbol, exports);
        }
        return exports;
    };
    interface ExportSource {
        symbol: ts.Symbol;
        name: string | undefined;
        typeOnly: boolean;
    }
    const exportSources = new Map<ts.ExportSpecifier, ExportSource | undefined>();
    const getExportSource = (declaration: ts.ExportSpecifier): ExportSource | undefined => {
        if (exportSources.has(declaration)) return exportSources.get(declaration);
        const exportDeclaration = declaration.parent.parent;
        let source;
        if (exportDeclaration.moduleSpecifier) {
            source = {
                symbol: getModule(exportDeclaration.moduleSpecifier),
                name: (declaration.propertyName ?? declaration.name).text,
                typeOnly: false,
            };
        }
        else {
            const local = checker.getExportSpecifierLocalTargetSymbol(declaration);
            if (!local) throw new Error(`Cannot resolve export ${declaration.getText()}`);
            if (local.flags & SymbolFlags.Alias) {
                const imported = getDeclarations(local)[0];
                let clause: ts.ImportClause;
                let name;
                let typeOnly = false;
                if (imported && ts.isImportSpecifier(imported)) {
                    clause = imported.parent.parent;
                    name = (imported.propertyName ?? imported.name).text;
                    typeOnly = imported.isTypeOnly;
                }
                else if (imported && ts.isImportClause(imported)) {
                    clause = imported;
                    name = "default";
                }
                else if (imported && ts.isNamespaceImport(imported)) {
                    clause = imported.parent;
                }
                else {
                    throw new Error(`Unsupported import for export ${declaration.getText()}`);
                }
                source = {
                    symbol: getModule(clause.parent.moduleSpecifier),
                    name,
                    typeOnly: typeOnly || clause.isTypeOnly,
                };
            }
        }
        exportSources.set(declaration, source);
        return source;
    };
    const exportAccessCache = new Map<ts.Symbol, Map<ts.Symbol, number>>();
    const getExportAccess = (module: ts.Symbol, exportedSymbol: ts.Symbol): number => {
        let byModule = exportAccessCache.get(module);
        if (!byModule) exportAccessCache.set(module, byModule = new Map());
        let access = byModule.get(exportedSymbol);
        if (access === undefined) byModule.set(exportedSymbol, access = computeExportAccess(module, exportedSymbol));
        return access;
    };
    const computeExportAccess = (module: ts.Symbol, exportedSymbol: ts.Symbol): number => {
        const target = resolve(exportedSymbol);
        if (checker.isUnknownSymbol(target)) throw new Error(`Cannot resolve export '${exportedSymbol.name}'`);
        if (isInternalSymbol(target)) return 0;
        // The checker flattens star exports. Follow visible paths in source order to preserve type-only precedence.
        const visited = new Map<ts.Symbol, Map<string, number>>();
        const pending = [{ symbol: module, name: exportedSymbol.name, typeOnly: false }];
        while (pending.length) {
            const { symbol, name, typeOnly } = pending.pop()!;
            const pathKind = typeOnly ? typeExport : valueExport;
            let names = visited.get(symbol);
            if (!names) visited.set(symbol, names = new Map());
            if ((names.get(name) ?? 0) & pathKind) continue;
            names.set(name, (names.get(name) ?? 0) | pathKind);
            const member = getModuleExports(symbol).get(name);
            if (!member || resolve(member) !== target) continue;
            const moduleFile = getDeclarations(symbol)[0]?.getSourceFile().fileName;
            const declaration = getDeclarations(member).find(node => node.getSourceFile().fileName === moduleFile);
            if (declaration && !isInternalExport(declaration)) {
                let isTypeOnly = typeOnly || (
                    ts.isExportSpecifier(declaration) && (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly)
                    || ts.isNamespaceExport(declaration) && declaration.parent.isTypeOnly
                );
                if (ts.isExportSpecifier(declaration)) {
                    const source = getExportSource(declaration);
                    if (source) {
                        isTypeOnly ||= source.typeOnly;
                        if (source.name !== undefined) {
                            pending.push({ symbol: source.symbol, name: source.name, typeOnly: isTypeOnly });
                            continue;
                        }
                    }
                }
                return isTypeOnly ? typeExport : typeExport | valueExport;
            }
            else {
                const stars = getStarExports(symbol);
                for (let i = stars.length - 1; i >= 0; i--) {
                    const star = stars[i];
                    pending.push({ symbol: star.symbol, name, typeOnly: typeOnly || star.typeOnly });
                }
            }
        }
        return 0;
    };

    const allExported = new Set<ts.Symbol>();
    const allValueExported = new Set<ts.Symbol>();
    const entrypointExports = new Map<string, { exported: Set<ts.Symbol>; valueExported: Set<ts.Symbol>; publicExports: { symbol: ts.Symbol; target: ts.Symbol; declaration: ts.Declaration | undefined; }[]; }>();
    for (const entrypoint of entrypoints) {
        const sourceFile = program.getSourceFile(entrypoint);
        const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);
        if (!moduleSymbol) throw new Error(`Cannot resolve public entrypoint ${entrypoint}`);
        const exported = new Set<ts.Symbol>();
        const valueExported = new Set<ts.Symbol>();
        const publicExports: { symbol: ts.Symbol; target: ts.Symbol; declaration: ts.Declaration | undefined; }[] = [];
        const namespaces = new Map<ts.Symbol, number>();
        const collectExports = (module: ts.Symbol, typeOnly: boolean, topLevel: boolean): void => {
            for (const symbol of getModuleExports(module).values()) {
                const access = getExportAccess(module, symbol);
                if (!(access & typeExport)) continue;
                const target = resolve(symbol);
                const isTypeOnly = typeOnly || !(access & valueExport);
                exported.add(target);
                allExported.add(target);
                if (!isTypeOnly) {
                    valueExported.add(target);
                    allValueExported.add(target);
                }
                if (topLevel) publicExports.push({ symbol, target, declaration: getDeclarations(symbol)[0] });
                const namespaceKind = isTypeOnly ? typeExport : valueExport;
                if (target.flags & SymbolFlags.Module && !((namespaces.get(target) ?? 0) & namespaceKind)) {
                    namespaces.set(target, (namespaces.get(target) ?? 0) | namespaceKind);
                    collectExports(target, isTypeOnly, /*topLevel*/ false);
                }
            }
        };
        collectExports(moduleSymbol, /*typeOnly*/ false, /*topLevel*/ true);
        entrypointExports.set(entrypoint, { exported, valueExported, publicExports });
    }

    const relevanceCache = new Map<ts.Symbol, boolean>();
    const isProjectFile = (sourceFile: ts.SourceFile): boolean => !program.isSourceFileDefaultLibrary(sourceFile) && !program.isSourceFileFromExternalLibrary(sourceFile);
    const isRelevant = (symbol: ts.Symbol): boolean => {
        let relevant = relevanceCache.get(symbol);
        if (relevant === undefined) {
            relevant = !(symbol.flags & SymbolFlags.TypeParameter) && getDeclarations(symbol).some(declaration => isProjectFile(declaration.getSourceFile()));
            relevanceCache.set(symbol, relevant);
        }
        return relevant;
    };

    /** Each emitted type reference of a symbol, with its target or `undefined` when unresolved. */
    const referencesCache = new Map<ts.Symbol, { name: ts.Node; target: ts.Symbol | undefined; }[]>();
    const getReferences = (symbol: ts.Symbol) => {
        let references = referencesCache.get(symbol);
        if (references) return references;
        references = [];
        const collect = (node: ts.Node): void => {
            const name = getReferenceName(node);
            if (name) {
                const reference = checker.getSymbolAtLocation(name);
                const target = reference && resolve(reference);
                const resolved = target && !checker.isUnknownSymbol(target) && !(target.flags & SymbolFlags.Type && !getDeclarations(target).length);
                references.push({ name, target: resolved ? target : undefined });
            }
            forEachEmittedChild(node, collect, isOverloadImplementation);
        };
        for (const declaration of getDeclarations(symbol)) {
            if (!isPrivateMember(declaration) && !isOverloadImplementation(declaration) && !isInternal(declaration)) collect(declaration);
        }
        referencesCache.set(symbol, references);
        return references;
    };

    return { resolve, getModuleExports, getExportAccess, isRelevant, getReferences, allExported, allValueExported, entrypointExports };
}

function check(context: Readonly<import("@typescript-eslint/utils").TSESLint.RuleContext<MessageId, Options>>, programNode: TSESTree.Program, filename: string, requiredExports: string[], analysis: ReturnType<typeof analyze>): void {
    const { resolve, getModuleExports, getExportAccess, isRelevant, getReferences, allExported, allValueExported, entrypointExports } = analysis;
    const reported = new Set<ts.Symbol>();
    const reportedUnresolved = new Set<ts.Node>();
    const checkExports = (roots: { symbol: ts.Symbol; target: ts.Symbol; declaration: ts.Declaration | undefined; }[], exported: Set<ts.Symbol>, valueExported: Set<ts.Symbol>, sameEntrypoint: boolean): void => {
        const visited = new Set<ts.Symbol>();
        const visitSymbol = (symbol: ts.Symbol, loc: TSESTree.SourceLocation, root: string): void => {
            symbol = resolve(symbol);
            if (!isRelevant(symbol)) return;
            const messageId = symbol.flags & SymbolFlags.Type && !exported.has(symbol)
                ? sameEntrypoint ? "missingEntrypointExport" : "missingExport"
                : symbol.flags & SymbolFlags.Enum && !valueExported.has(symbol)
                ? sameEntrypoint ? "missingEntrypointValueExport" : "missingValueExport"
                : undefined;
            if (messageId && !reported.has(symbol)) {
                reported.add(symbol);
                context.report({ node: programNode, loc, messageId, data: { name: symbol.name, root } });
            }
            if (visited.has(symbol)) return;
            visited.add(symbol);
            visitMembers(symbol, loc, root);
        };
        const visitMembers = (symbol: ts.Symbol, loc: TSESTree.SourceLocation, root: string): void => {
            if (symbol.flags & SymbolFlags.Module) {
                for (const member of getModuleExports(symbol).values()) {
                    if (getExportAccess(symbol, member) & typeExport) visitSymbol(member, loc, root);
                }
                return;
            }
            for (const { name, target } of getReferences(symbol)) {
                if (target) {
                    visitSymbol(target, loc, root);
                }
                else if (!reportedUnresolved.has(name)) {
                    reportedUnresolved.add(name);
                    context.report({ node: programNode, loc, messageId: "unresolvedReference", data: { name: name.getText() } });
                }
            }
        };
        for (const { symbol, target, declaration } of roots) {
            const start = declaration?.getSourceFile().fileName === filename ? declaration.getStart() : 0;
            const position = context.sourceCode.getLocFromIndex(start);
            const loc = { start: position, end: position };
            if (visited.has(target)) continue;
            visited.add(target);
            visitMembers(target, loc, symbol.name);
        }
    };

    const entrypoint = entrypointExports.get(filename);
    if (!entrypoint) throw new Error(`Cannot find public entrypoint ${filename}`);
    const { exported, valueExported, publicExports } = entrypoint;
    const requiredRoots: typeof publicExports = [];
    for (const name of requiredExports) {
        const root = publicExports.find(({ symbol }) => symbol.name === name);
        if (root) requiredRoots.push(root);
        else context.report({ node: programNode, messageId: "missingRequiredExport", data: { name } });
    }
    checkExports(requiredRoots, exported, valueExported, /*sameEntrypoint*/ true);
    checkExports(publicExports, allExported, allValueExported, /*sameEntrypoint*/ false);
}
