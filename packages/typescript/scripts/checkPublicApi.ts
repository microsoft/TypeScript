import * as ast from "@typescript/typescript/ast";
import * as ts from "@typescript/typescript/sync";
import fs from "node:fs";
import path from "node:path";

// These types and their transitive dependencies must be exported from the specified entrypoint.
const requiredEntrypointTypes: Readonly<Record<string, readonly string[]>> = {
    "./async": ["CompilerOptions"],
};

type MessageId = "missingExport" | "missingValueExport" | "missingEntrypointExport" | "missingEntrypointValueExport" | "missingRequiredExport" | "unresolvedReference";

const typeExport = 1;
const valueExport = 2;

function isInternal(node: ast.Node): boolean {
    return ast.getJSDocTags(node).some(tag => tag.tagName.text === "internal");
}

function isPrivateMember(node: ast.Node): boolean {
    return ast.isClassElement(node) && (
        (ast.isPropertyDeclaration(node) || ast.isMethodDeclaration(node) || ast.isGetAccessorDeclaration(node) || ast.isSetAccessorDeclaration(node))
            && ast.isPrivateIdentifier(node.name)
        || !!node.getModifiers()?.some(modifier => modifier.kind === ast.SyntaxKind.PrivateKeyword)
    );
}

// Yield only children that contribute to declaration emit.
function forEachEmittedChild(node: ast.Node, callback: (node: ast.Node) => void, isOverloadImplementation: (node: ast.Node) => boolean): void {
    node.forEachChild(child => {
        if (child.kind === ast.SyntaxKind.Decorator || child.kind === ast.SyntaxKind.ClassStaticBlockDeclaration) return;
        if (ast.isFunctionLikeDeclaration(node) && child === node.body) return;
        if ((ast.isVariableDeclaration(node) || ast.isPropertyDeclaration(node) || ast.isParameterDeclaration(node)) && child === node.initializer && node.type) return;
        if (ast.isEnumMember(node) && child === node.initializer) return;
        if (isPrivateMember(child) || isInternal(child) || isOverloadImplementation(child)) return;
        callback(child);
    });
}

function getReferenceName(node: ast.Node): ast.Node | undefined {
    if (ast.isTypeReferenceNode(node)) return node.typeName;
    if (ast.isExpressionWithTypeArguments(node)) return node.expression;
    if (ast.isTypeQueryNode(node)) return node.exprName;
    if (ast.isImportTypeNode(node)) return node.qualifier ?? node;
}

export interface PublicApiDiagnostic {
    messageId: MessageId;
    message: string;
    entrypoint: string;
    file: string;
    line: number;
    character: number;
}

interface ExportRoot {
    symbol: ts.Symbol;
    target: ts.Symbol;
    declaration: ast.Declaration | undefined;
}

interface PublicApiAnalysis {
    resolve(symbol: ts.Symbol): ts.Symbol;
    getModuleExports(symbol: ts.Symbol): Map<string, ts.Symbol>;
    getExportAccess(module: ts.Symbol, exportedSymbol: ts.Symbol): number;
    isRelevant(symbol: ts.Symbol): boolean;
    getReferences(symbol: ts.Symbol): { name: ast.Node; target: ts.Symbol | undefined; }[];
    allExported: Set<ts.Symbol>;
    allValueExported: Set<ts.Symbol>;
    entrypointExports: Map<string, { exported: Set<ts.Symbol>; valueExported: Set<ts.Symbol>; publicExports: ExportRoot[]; }>;
}

export function analyzePublicApi(api: ts.API, project: ts.Project, entrypoints: string[]): PublicApiAnalysis {
    const { program, checker } = project;
    const declarationCache = new Map<ts.Symbol, readonly ast.Declaration[]>();
    const getDeclarations = (symbol: ts.Symbol): readonly ast.Declaration[] => {
        let declarations = declarationCache.get(symbol);
        if (!declarations) {
            declarations = symbol.declarations.map(handle => {
                const declaration = handle.resolve(project);
                if (!declaration) throw new Error(`Cannot resolve declaration of '${symbol.name}'`);
                return declaration;
            });
            declarationCache.set(symbol, declarations);
        }
        return declarations;
    };
    const overloadCache = new Map<ast.Node, boolean>();
    const isOverloadCandidate = (node: ast.Node): boolean => (ast.isFunctionDeclaration(node) || ast.isMethodDeclaration(node) || ast.isConstructorDeclaration(node)) && !!node.body;
    const isOverloadImplementation = (node: ast.Node): boolean => {
        if (!isOverloadCandidate(node)) return false;
        const implementation = overloadCache.get(node);
        if (implementation === undefined) throw new Error(`Overload status not loaded for ${node.getText()}`);
        return implementation;
    };

    const aliasTargets = new Map<ts.Symbol, ts.Symbol>();
    const loadAliasTargets = (symbols: readonly ts.Symbol[]): void => {
        const aliases = [...new Set(symbols.filter(symbol => symbol.flags & ts.SymbolFlags.Alias && !aliasTargets.has(symbol)))];
        const targets = api.batch(...aliases.map(symbol => checker.getAliasedSymbol.gen(symbol)));
        for (let i = 0; i < aliases.length; i++) aliasTargets.set(aliases[i], targets[i]);
    };
    const resolveCache = new Map<ts.Symbol, ts.Symbol>();
    const resolve = (symbol: ts.Symbol): ts.Symbol => {
        let result = resolveCache.get(symbol);
        if (result) return result;
        result = symbol.flags & ts.SymbolFlags.Alias ? aliasTargets.get(symbol) ?? checker.getAliasedSymbol(symbol) : symbol;
        if (result.flags & ts.SymbolFlags.EnumMember) {
            const declaration = getDeclarations(result)[0];
            const enumName = declaration && ast.isEnumDeclaration(declaration.parent) ? declaration.parent.name : undefined;
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
    const getExportDeclaration = (declaration: ast.ExportSpecifier | ast.NamespaceExport): ast.ExportDeclaration => {
        const parent = ast.isExportSpecifier(declaration) ? declaration.parent.parent : declaration.parent;
        if (!ast.isExportDeclaration(parent)) throw new Error(`Invalid export ${declaration.getText()}`);
        return parent;
    };
    const isInternalExport = (declaration: ast.Declaration): boolean =>
        isInternal(declaration)
        || (ast.isExportSpecifier(declaration) || ast.isNamespaceExport(declaration)) && isInternal(getExportDeclaration(declaration));

    const moduleExportsCache = new Map<ts.Symbol, Map<string, ts.Symbol>>();
    const getModuleExports = (symbol: ts.Symbol): Map<string, ts.Symbol> => {
        let exports = moduleExportsCache.get(symbol);
        if (!exports) {
            const members = checker.getExportsOfModule(symbol);
            loadAliasTargets(members);
            exports = new Map(members.map(member => [member.name, member]));
            moduleExportsCache.set(symbol, exports);
        }
        return exports;
    };
    const getModule = (specifier: ast.Node): ts.Symbol => {
        const module = checker.getSymbolAtLocation(specifier);
        if (!module) throw new Error(`Cannot resolve module ${specifier.getText()}`);
        return module;
    };
    const starExportsCache = new Map<ts.Symbol, { symbol: ts.Symbol; typeOnly: boolean; }[]>();
    const getStarExports = (symbol: ts.Symbol): { symbol: ts.Symbol; typeOnly: boolean; }[] => {
        let exports = starExportsCache.get(symbol);
        if (!exports) {
            const declaration = getDeclarations(symbol).find(node => ast.isSourceFile(node) || ast.isModuleDeclaration(node));
            const body = declaration && ast.isModuleDeclaration(declaration) ? declaration.body : undefined;
            const statements = declaration && ast.isSourceFile(declaration) ? declaration.statements : body && ast.isModuleBlock(body) ? body.statements : undefined;
            exports = [...statements ?? []]
                .filter((node): node is ast.ExportDeclaration => ast.isExportDeclaration(node) && !node.exportClause && !!node.moduleSpecifier && !isInternal(node))
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
    const exportSources = new Map<ast.ExportSpecifier, ExportSource | undefined>();
    const getExportSource = (declaration: ast.ExportSpecifier): ExportSource | undefined => {
        if (exportSources.has(declaration)) return exportSources.get(declaration);
        const exportDeclaration = getExportDeclaration(declaration);
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
            if (local.flags & ts.SymbolFlags.Alias) {
                const imported = getDeclarations(local)[0];
                let clause: ast.ImportClause;
                let name;
                let typeOnly = false;
                if (imported && ast.isImportSpecifier(imported)) {
                    const parent = imported.parent.parent;
                    if (!ast.isImportClause(parent)) throw new Error(`Invalid import for export ${declaration.getText()}`);
                    clause = parent;
                    name = (imported.propertyName ?? imported.name).text;
                    typeOnly = imported.isTypeOnly;
                }
                else if (imported && ast.isImportClause(imported)) {
                    clause = imported;
                    name = "default";
                }
                else if (imported && ast.isNamespaceImport(imported)) {
                    const parent = imported.parent;
                    if (!ast.isImportClause(parent)) throw new Error(`Invalid import for export ${declaration.getText()}`);
                    clause = parent;
                }
                else {
                    throw new Error(`Unsupported import for export ${declaration.getText()}`);
                }
                const importDeclaration = clause.parent;
                if (!ast.isImportDeclaration(importDeclaration)) throw new Error(`Invalid import for export ${declaration.getText()}`);
                source = {
                    symbol: getModule(importDeclaration.moduleSpecifier),
                    name,
                    typeOnly: typeOnly || clause.phaseModifier === ast.SyntaxKind.TypeKeyword,
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
                    ast.isExportSpecifier(declaration) && (declaration.isTypeOnly || getExportDeclaration(declaration).isTypeOnly)
                    || ast.isNamespaceExport(declaration) && getExportDeclaration(declaration).isTypeOnly
                );
                if (ast.isExportSpecifier(declaration)) {
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
    const entrypointExports: PublicApiAnalysis["entrypointExports"] = new Map();
    const sourceFiles = api.batch(...entrypoints.map(file => program.getSourceFile.gen(file))).map((file, index) => {
        if (!file) throw new Error(`Cannot resolve public entrypoint ${entrypoints[index]}`);
        return file;
    });
    const [symbols] = api.batch(checker.getSymbolAtLocation.gen(sourceFiles));
    const moduleSymbols = symbols.map((symbol, index) => {
        if (!symbol) throw new Error(`Cannot resolve public entrypoint ${entrypoints[index]}`);
        return symbol;
    });
    const modulesExports = api.batch(...moduleSymbols.map(symbol => checker.getExportsOfModule.gen(symbol)));
    for (let i = 0; i < moduleSymbols.length; i++) {
        moduleExportsCache.set(moduleSymbols[i], new Map(modulesExports[i].map(symbol => [symbol.name, symbol])));
    }
    loadAliasTargets(modulesExports.flat());
    for (let i = 0; i < entrypoints.length; i++) {
        const entrypoint = entrypoints[i];
        const moduleSymbol = moduleSymbols[i];
        const exported = new Set<ts.Symbol>();
        const valueExported = new Set<ts.Symbol>();
        const publicExports: ExportRoot[] = [];
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
                if (target.flags & ts.SymbolFlags.Module && !((namespaces.get(target) ?? 0) & namespaceKind)) {
                    namespaces.set(target, (namespaces.get(target) ?? 0) | namespaceKind);
                    collectExports(target, isTypeOnly, /*topLevel*/ false);
                }
            }
        };
        collectExports(moduleSymbol, /*typeOnly*/ false, /*topLevel*/ true);
        entrypointExports.set(entrypoint, { exported, valueExported, publicExports });
    }

    const relevanceCache = new Map<ts.Symbol, boolean>();
    const isProjectFile = (sourceFile: ast.SourceFile): boolean => !program.isSourceFileDefaultLibrary(sourceFile) && !program.isSourceFileFromExternalLibrary(sourceFile);
    const isRelevant = (symbol: ts.Symbol): boolean => {
        let relevant = relevanceCache.get(symbol);
        if (relevant === undefined) {
            relevant = !(symbol.flags & ts.SymbolFlags.TypeParameter) && getDeclarations(symbol).some(declaration => isProjectFile(declaration.getSourceFile()));
            relevanceCache.set(symbol, relevant);
        }
        return relevant;
    };

    /** Each emitted type reference of a symbol, with its target or `undefined` when unresolved. */
    const referencesCache = new Map<ts.Symbol, { name: ast.Node; target: ts.Symbol | undefined; }[]>();
    const getReferences = (symbol: ts.Symbol): { name: ast.Node; target: ts.Symbol | undefined; }[] => {
        const references = referencesCache.get(symbol);
        if (!references) throw new Error(`References not loaded for '${symbol.name}'`);
        return references;
    };
    const loadReferences = (symbols: ts.Symbol[]): void => {
        const declarations = symbols.map(symbol => getDeclarations(symbol).filter(node => !ast.isSourceFile(node) && !ast.isModuleDeclaration(node) && !isPrivateMember(node) && !isInternal(node)));
        const overloads = new Set<ast.Node>();
        const collectOverloads = (node: ast.Node): void => {
            if (isOverloadCandidate(node) && !overloadCache.has(node)) overloads.add(node);
            forEachEmittedChild(node, collectOverloads, () => false);
        };
        for (const declaration of declarations.flat()) collectOverloads(declaration);
        const overloadNodes = [...overloads];
        const implementations = api.batch(...overloadNodes.map(node => checker.isImplementationOfOverload.gen(node)));
        for (let i = 0; i < overloadNodes.length; i++) overloadCache.set(overloadNodes[i], implementations[i]);
        const names: ast.Node[] = [];
        const ends: number[] = [];
        const collect = (node: ast.Node): void => {
            const name = getReferenceName(node);
            if (name) names.push(name);
            forEachEmittedChild(node, collect, isOverloadImplementation);
        };
        for (const group of declarations) {
            for (const declaration of group) {
                if (!isOverloadImplementation(declaration)) collect(declaration);
            }
            ends.push(names.length);
        }
        const references = names.length ? api.batch(checker.getSymbolAtLocation.gen(names))[0] : [];
        loadAliasTargets(references.filter((symbol): symbol is ts.Symbol => !!symbol));
        const resolvedReferences = names.map((name, index) => {
            const reference = references[index];
            const target = reference && resolve(reference);
            const resolved = target && !checker.isUnknownSymbol(target) && !(target.flags & ts.SymbolFlags.Type && !getDeclarations(target).length);
            return { name, target: resolved ? target : undefined };
        });
        let start = 0;
        for (let i = 0; i < symbols.length; i++) {
            referencesCache.set(symbols[i], resolvedReferences.slice(start, ends[i]));
            start = ends[i];
        }
    };

    // Load the reachable graph in waves; reporting still follows the original traversal order.
    const visited = new Set<ts.Symbol>();
    let pending = [...entrypointExports.values()].flatMap(entrypoint => entrypoint.publicExports.map(root => root.target));
    while (pending.length) {
        const symbols: ts.Symbol[] = [];
        const next = new Set<ts.Symbol>();
        for (const symbol of pending) {
            if (visited.has(symbol)) continue;
            visited.add(symbol);
            if (symbol.flags & ts.SymbolFlags.Module) {
                for (const member of getModuleExports(symbol).values()) {
                    if (getExportAccess(symbol, member) & typeExport) {
                        const target = resolve(member);
                        if (isRelevant(target)) next.add(target);
                    }
                }
                symbols.push(symbol);
            }
            else {
                symbols.push(symbol);
            }
        }
        loadReferences(symbols);
        for (const symbol of symbols) {
            for (const { target } of getReferences(symbol)) {
                if (target && isRelevant(target)) next.add(target);
            }
        }
        pending = [...next];
    }

    return { resolve, getModuleExports, getExportAccess, isRelevant, getReferences, allExported, allValueExported, entrypointExports };
}

export function checkPublicApi(filename: string, requiredExports: readonly string[], analysis: PublicApiAnalysis): PublicApiDiagnostic[] {
    const { resolve, getModuleExports, getExportAccess, isRelevant, getReferences, allExported, allValueExported, entrypointExports } = analysis;
    const diagnostics: PublicApiDiagnostic[] = [];
    const report = (messageId: MessageId, message: string, node?: ast.Node): void => {
        const sourceFile = node?.getSourceFile();
        const position = sourceFile?.getLineAndCharacterOfPosition(node!.getStart()) ?? { line: 0, character: 0 };
        diagnostics.push({ messageId, message, entrypoint: filename, file: sourceFile?.fileName ?? filename, line: position.line + 1, character: position.character + 1 });
    };
    const reported = new Set<ts.Symbol>();
    const reportedUnresolved = new Set<ast.Node>();
    const checkExports = (roots: ExportRoot[], exported: Set<ts.Symbol>, valueExported: Set<ts.Symbol>, sameEntrypoint: boolean): void => {
        const visited = new Set<ts.Symbol>();
        const visitSymbol = (symbol: ts.Symbol, reference: ast.Node | undefined, root: string): void => {
            symbol = resolve(symbol);
            if (!isRelevant(symbol)) return;
            const messageId = symbol.flags & ts.SymbolFlags.Type && !exported.has(symbol)
                ? sameEntrypoint ? "missingEntrypointExport" : "missingExport"
                : symbol.flags & ts.SymbolFlags.Enum && !valueExported.has(symbol)
                ? sameEntrypoint ? "missingEntrypointValueExport" : "missingValueExport"
                : undefined;
            if (messageId && !reported.has(symbol)) {
                reported.add(symbol);
                const message = messageId === "missingExport" ? `Public API references '${symbol.name}', but this type is not exported from any public entrypoint.`
                    : messageId === "missingValueExport" ? `Public API references enum '${symbol.name}', but its value is not exported from any public entrypoint.`
                    : messageId === "missingEntrypointExport" ? `Type '${symbol.name}', referenced by '${root}', is not exported from this entrypoint.`
                    : `Enum '${symbol.name}', referenced by '${root}', has no value export from this entrypoint.`;
                report(messageId, message, reference);
            }
            if (visited.has(symbol)) return;
            visited.add(symbol);
            visitMembers(symbol, reference, root);
        };
        const visitMembers = (symbol: ts.Symbol, reference: ast.Node | undefined, root: string): void => {
            if (symbol.flags & ts.SymbolFlags.Module) {
                for (const member of getModuleExports(symbol).values()) {
                    if (getExportAccess(symbol, member) & typeExport) visitSymbol(member, reference, root);
                }
            }
            for (const { name, target } of getReferences(symbol)) {
                if (target) {
                    visitSymbol(target, name, root);
                }
                else if (!reportedUnresolved.has(name)) {
                    reportedUnresolved.add(name);
                    report("unresolvedReference", `Cannot resolve public API reference '${name.getText()}'.`, name);
                }
            }
        };
        for (const { symbol, target, declaration } of roots) {
            if (visited.has(target)) continue;
            visited.add(target);
            visitMembers(target, declaration, symbol.name);
        }
    };

    const entrypoint = entrypointExports.get(filename);
    if (!entrypoint) throw new Error(`Cannot find public entrypoint ${filename}`);
    const { exported, valueExported, publicExports } = entrypoint;
    const requiredRoots: typeof publicExports = [];
    for (const name of requiredExports) {
        const root = publicExports.find(({ symbol }) => symbol.name === name);
        if (root) requiredRoots.push(root);
        else report("missingRequiredExport", `This entrypoint must export '${name}'.`);
    }
    checkExports(requiredRoots, exported, valueExported, /*sameEntrypoint*/ true);
    checkExports(publicExports, allExported, allValueExported, /*sameEntrypoint*/ false);
    return diagnostics;
}

export interface PackageJson {
    exports: Record<string, string | { "@typescript/source"?: string; }>;
}

export function checkPackage(api: ts.API, packageDir: string, packageJson: PackageJson, fileSystem?: ts.CreateSnapshotParams["fileSystem"]): PublicApiDiagnostic[] {
    const entrypoints = Object.entries(packageJson.exports)
        .flatMap(([name, value]) =>
            typeof value === "object" && value["@typescript/source"]
                ? [{ name, file: path.resolve(packageDir, value["@typescript/source"]), requiredExports: requiredEntrypointTypes[name] ?? [] }]
                : []
        );
    for (const name of Object.keys(requiredEntrypointTypes)) {
        if (!entrypoints.some(entrypoint => entrypoint.name === name)) throw new Error(`Cannot find public entrypoint '${name}'`);
    }
    const files = entrypoints.map(entrypoint => entrypoint.file);
    using snapshot = api.createSnapshot({ openFiles: files, fileSystem });
    const project = snapshot.getDefaultProjectForFile(files[0]);
    if (!project) throw new Error(`Cannot find project for ${files[0]}`);
    const analysis = analyzePublicApi(api, project, files);
    return entrypoints.flatMap(({ file, requiredExports }) => checkPublicApi(file, requiredExports, analysis));
}

function main(): void {
    const packageDir = path.resolve(import.meta.dirname, "..");
    const packageJson: PackageJson = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf8"));
    using api = new ts.API({ cwd: packageDir });
    const diagnostics = checkPackage(api, packageDir, packageJson);
    for (const diagnostic of diagnostics) {
        console.error(`${diagnostic.file}:${diagnostic.line}:${diagnostic.character}: ${diagnostic.message} (entrypoint: ${diagnostic.entrypoint})`);
    }
    if (diagnostics.length) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
    main();
}
