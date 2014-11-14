/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>

module ts {

    export const enum ModuleInstanceState {
        NonInstantiated = 0,
        Instantiated    = 1,
        ConstEnumOnly   = 2
    }

    export function getModuleInstanceState(node: Node, compilerOptions: CompilerOptions): ModuleInstanceState {
        // A module is uninstantiated if it contains only 
        // 1. interface declarations
        if (node.kind === SyntaxKind.InterfaceDeclaration) {
            return ModuleInstanceState.NonInstantiated;
        }
        // 2. const enum declarations don't make module instantiated
        else if (node.kind === SyntaxKind.EnumDeclaration && isConstEnumDeclaration(<EnumDeclaration>node) && !compilerOptions.preserveConstEnums) {
            return ModuleInstanceState.ConstEnumOnly;
        }
        // 3. non - exported import declarations
        else if (node.kind === SyntaxKind.ImportDeclaration && !(node.flags & NodeFlags.Export)) {
            return ModuleInstanceState.NonInstantiated;
        }
        // 4. other uninstantiated module declarations.
        else if (node.kind === SyntaxKind.ModuleBlock) {
            var state = ModuleInstanceState.NonInstantiated;
            forEachChild(node, n => {
                switch (getModuleInstanceState(n, compilerOptions)) {
                    case ModuleInstanceState.NonInstantiated:
                        // child is non-instantiated - continue searching
                        return false;
                    case ModuleInstanceState.ConstEnumOnly:
                        // child is const enum only - record state and continue searching
                        state = ModuleInstanceState.ConstEnumOnly;
                        return false;
                    case ModuleInstanceState.Instantiated:
                        // child is instantiated - record state and stop
                        state = ModuleInstanceState.Instantiated;
                        return true;
                }
            });
            return state;
        }
        else if (node.kind === SyntaxKind.ModuleDeclaration) {
            return getModuleInstanceState((<ModuleDeclaration>node).body, compilerOptions);
        }
        else {
            return ModuleInstanceState.Instantiated;
        }
    }

    export function bindSourceFile(file: SourceFile, options: CompilerOptions) {

        var parent: Node;
        var container: Declaration;
        var blockScopeContainer: Node;
        var lastContainer: Declaration;
        var symbolCount = 0;
        var Symbol = objectAllocator.getSymbolConstructor();

        if (!file.locals) {
            file.locals = {};
            container = blockScopeContainer = file;
            bind(file);
            file.symbolCount = symbolCount;
        }

        function createSymbol(flags: SymbolFlags, name: string): Symbol {
            symbolCount++;
            return new Symbol(flags, name);
        }

        function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolKind: SymbolFlags) {
            symbol.flags |= symbolKind;
            if (!symbol.declarations) symbol.declarations = [];
            symbol.declarations.push(node);
            if (symbolKind & SymbolFlags.HasExports && !symbol.exports) symbol.exports = {};
            if (symbolKind & SymbolFlags.HasMembers && !symbol.members) symbol.members = {};
            node.symbol = symbol;
            if (symbolKind & SymbolFlags.Value && !symbol.valueDeclaration) symbol.valueDeclaration = node;
        }

        // TODO(jfreeman): Implement getDeclarationName for property name
        function getDeclarationName(node: Declaration): string {
            if (node.name) {
                if (node.kind === SyntaxKind.ModuleDeclaration && node.name.kind === SyntaxKind.StringLiteral) {
                    return '"' + (<LiteralExpression>node.name).text + '"';
                }
                return (<Identifier>node.name).text;
            }
            switch (node.kind) {
                case SyntaxKind.Constructor: return "__constructor";
                case SyntaxKind.CallSignature: return "__call";
                case SyntaxKind.ConstructSignature: return "__new";
                case SyntaxKind.IndexSignature: return "__index";
            }
        }

        function getDisplayName(node: Declaration): string {
            return node.name ? declarationNameToString(node.name) : getDeclarationName(node);
        }

        function declareSymbol(symbols: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags): Symbol {
            var name = getDeclarationName(node);
            if (name !== undefined) {
                var symbol = hasProperty(symbols, name) ? symbols[name] : (symbols[name] = createSymbol(0, name));
                if (symbol.flags & excludes) {
                    if (node.name) {
                        node.name.parent = node;
                    }
                    // Report errors every position with duplicate declaration
                    // Report errors on previous encountered declarations
                    var message = symbol.flags & SymbolFlags.BlockScopedVariable ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                    forEach(symbol.declarations, (declaration) => {
                        file.semanticErrors.push(createDiagnosticForNode(declaration.name, message, getDisplayName(declaration)));
                    });
                    file.semanticErrors.push(createDiagnosticForNode(node.name, message, getDisplayName(node)));

                    symbol = createSymbol(0, name);
                }
            }
            else {
                symbol = createSymbol(0, "__missing");
            }
            addDeclarationToSymbol(symbol, node, includes);
            symbol.parent = parent;

            if (node.kind === SyntaxKind.ClassDeclaration && symbol.exports) {
                // TypeScript 1.0 spec (April 2014): 8.4
                // Every class automatically contains a static property member named 'prototype', 
                // the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
                // It is an error to explicitly declare a static property member with the name 'prototype'.
                var prototypeSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Prototype, "prototype");
                if (hasProperty(symbol.exports, prototypeSymbol.name)) {
                    if (node.name) {
                        node.name.parent = node;
                    }
                    file.semanticErrors.push(createDiagnosticForNode(symbol.exports[prototypeSymbol.name].declarations[0],
                        Diagnostics.Duplicate_identifier_0, prototypeSymbol.name));
                }
                symbol.exports[prototypeSymbol.name] = prototypeSymbol;
                prototypeSymbol.parent = symbol;
            }

            return symbol;
        }

        function isAmbientContext(node: Node): boolean {
            while (node) {
                if (node.flags & NodeFlags.Ambient) return true;
                node = node.parent;
            }
            return false;
        }

        function declareModuleMember(node: Declaration, symbolKind: SymbolFlags, symbolExcludes: SymbolFlags) {
            // Exported module members are given 2 symbols: A local symbol that is classified with an ExportValue,
            // ExportType, or ExportContainer flag, and an associated export symbol with all the correct flags set
            // on it. There are 2 main reasons:
            //
            //   1. We treat locals and exports of the same name as mutually exclusive within a container. 
            //      That means the binder will issue a Duplicate Identifier error if you mix locals and exports
            //      with the same name in the same container.
            //      TODO: Make this a more specific error and decouple it from the exclusion logic.
            //   2. When we checkIdentifier in the checker, we set its resolved symbol to the local symbol,
            //      but return the export symbol (by calling getExportSymbolOfValueSymbolIfExported). That way
            //      when the emitter comes back to it, it knows not to qualify the name if it was found in a containing scope.
            var exportKind = 0;
            if (symbolKind & SymbolFlags.Value) {
                exportKind |= SymbolFlags.ExportValue;
            }
            if (symbolKind & SymbolFlags.Type) {
                exportKind |= SymbolFlags.ExportType;
            }
            if (symbolKind & SymbolFlags.Namespace) {
                exportKind |= SymbolFlags.ExportNamespace;
            }
            if (node.flags & NodeFlags.Export || (node.kind !== SyntaxKind.ImportDeclaration && isAmbientContext(container))) {
                if (exportKind) {
                    var local = declareSymbol(container.locals, undefined, node, exportKind, symbolExcludes);
                    local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                    node.localSymbol = local;
                }
                else {
                    declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                }
            }
            else {
                declareSymbol(container.locals, undefined, node, symbolKind, symbolExcludes);
            }
        }

        // All container nodes are kept on a linked list in declaration order. This list is used by the getLocalNameOfContainer function
        // in the type checker to validate that the local name used for a container is unique.
        function bindChildren(node: Declaration, symbolKind: SymbolFlags, isBlockScopeContainer: boolean) {
            if (symbolKind & SymbolFlags.HasLocals) {
                node.locals = {};
            }
            var saveParent = parent;
            var saveContainer = container;
            var savedBlockScopeContainer = blockScopeContainer;
            parent = node;
            if (symbolKind & SymbolFlags.IsContainer) {
                container = node;
                // If container is not on container list, add it to the list
                if (lastContainer !== container && !container.nextContainer) {
                    if (lastContainer) {
                        lastContainer.nextContainer = container;
                    }
                    lastContainer = container;
                }
            }
            if (isBlockScopeContainer) {
                blockScopeContainer = node;
            }
            forEachChild(node, bind);
            container = saveContainer;
            parent = saveParent;
            blockScopeContainer = savedBlockScopeContainer;
        }

        function bindDeclaration(node: Declaration, symbolKind: SymbolFlags, symbolExcludes: SymbolFlags, isBlockScopeContainer: boolean) {
            switch (container.kind) {
                case SyntaxKind.ModuleDeclaration:
                    declareModuleMember(node, symbolKind, symbolExcludes);
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>container)) {
                        declareModuleMember(node, symbolKind, symbolExcludes);
                        break;
                    }
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.Method:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    declareSymbol(container.locals, undefined, node, symbolKind, symbolExcludes);
                    break;
                case SyntaxKind.ClassDeclaration:
                    if (node.flags & NodeFlags.Static) {
                        declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                        break;
                    }
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.ObjectLiteral:
                case SyntaxKind.InterfaceDeclaration:
                    declareSymbol(container.symbol.members, container.symbol, node, symbolKind, symbolExcludes);
                    break;
                case SyntaxKind.EnumDeclaration:
                    declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                    break;
            }
            bindChildren(node, symbolKind, isBlockScopeContainer);
        }

        function bindConstructorDeclaration(node: ConstructorDeclaration) {
            bindDeclaration(node, SymbolFlags.Constructor, 0, /*isBlockScopeContainer*/ true);
            forEach(node.parameters, p => {
                if (p.flags & (NodeFlags.Public | NodeFlags.Private | NodeFlags.Protected)) {
                    bindDeclaration(p, SymbolFlags.Property, SymbolFlags.PropertyExcludes, /*isBlockScopeContainer*/ false);
                }
            });
        }

        function bindModuleDeclaration(node: ModuleDeclaration) {
            if (node.name.kind === SyntaxKind.StringLiteral) {
                bindDeclaration(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes, /*isBlockScopeContainer*/ true);
            }
            else {
                var state = getModuleInstanceState(node, options);
                if (state === ModuleInstanceState.NonInstantiated) {
                    bindDeclaration(node, SymbolFlags.NamespaceModule, SymbolFlags.NamespaceModuleExcludes, /*isBlockScopeContainer*/ true);
                }
                else {
                    bindDeclaration(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes, /*isBlockScopeContainer*/ true);
                    if (state === ModuleInstanceState.ConstEnumOnly) {
                        // mark value module as module that contains only enums
                        node.symbol.constEnumOnlyModule = true;
                    }
                    else if (node.symbol.constEnumOnlyModule) {
                        // const only value module was merged with instantiated module - reset flag
                        node.symbol.constEnumOnlyModule = false;
                    }
                }
            }
        }

        function bindAnonymousDeclaration(node: Node, symbolKind: SymbolFlags, name: string, isBlockScopeContainer: boolean) {
            var symbol = createSymbol(symbolKind, name);
            addDeclarationToSymbol(symbol, node, symbolKind);
            bindChildren(node, symbolKind, isBlockScopeContainer);
        }

        function bindCatchVariableDeclaration(node: CatchBlock) {
            var symbol = createSymbol(SymbolFlags.FunctionScopedVariable, node.variable.text || "__missing");
            addDeclarationToSymbol(symbol, node, SymbolFlags.FunctionScopedVariable);
            var saveParent = parent;
            var savedBlockScopeContainer = blockScopeContainer;
            parent = blockScopeContainer = node;
            forEachChild(node, bind);
            parent = saveParent;
            blockScopeContainer = savedBlockScopeContainer;
        }

        function bindBlockScopedVariableDeclaration(node: Declaration) {
            switch (blockScopeContainer.kind) {
                case SyntaxKind.ModuleDeclaration:
                    declareModuleMember(node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>container)) {
                        declareModuleMember(node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
                        break;
                    }
                default:
                    if (!blockScopeContainer.locals) {
                        blockScopeContainer.locals = {};
                    }
                    declareSymbol(blockScopeContainer.locals, undefined, node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
            }

            bindChildren(node, SymbolFlags.BlockScopedVariable, /*isBlockScopeContainer*/ false);
        }

        function bind(node: Node) {
            node.parent = parent;
            switch (node.kind) {
                case SyntaxKind.TypeParameter:
                    bindDeclaration(<Declaration>node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.Parameter:
                    bindDeclaration(<Declaration>node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.VariableDeclaration:
                    if (node.flags & NodeFlags.BlockScoped) {
                        bindBlockScopedVariableDeclaration(<Declaration>node);
                    }
                    else {
                        bindDeclaration(<Declaration>node, SymbolFlags.FunctionScopedVariable, SymbolFlags.FunctionScopedVariableExcludes, /*isBlockScopeContainer*/ false);
                    }
                    break;
                case SyntaxKind.Property:
                case SyntaxKind.PropertyAssignment:
                    bindDeclaration(<Declaration>node, SymbolFlags.Property, SymbolFlags.PropertyExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.EnumMember:
                    bindDeclaration(<Declaration>node, SymbolFlags.EnumMember, SymbolFlags.EnumMemberExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.CallSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.CallSignature, 0, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.Method:
                    bindDeclaration(<Declaration>node, SymbolFlags.Method, SymbolFlags.MethodExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.ConstructSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.ConstructSignature, 0, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.IndexSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.IndexSignature, 0, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.FunctionDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Function, SymbolFlags.FunctionExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.Constructor:
                    bindConstructorDeclaration(<ConstructorDeclaration>node);
                    break;
                case SyntaxKind.GetAccessor:
                    bindDeclaration(<Declaration>node, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.SetAccessor:
                    bindDeclaration(<Declaration>node, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.TypeLiteral:
                    bindAnonymousDeclaration(node, SymbolFlags.TypeLiteral, "__type", /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.ObjectLiteral:
                    bindAnonymousDeclaration(node, SymbolFlags.ObjectLiteral, "__object", /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    bindAnonymousDeclaration(node, SymbolFlags.Function, "__function", /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.CatchBlock:
                    bindCatchVariableDeclaration(<CatchBlock>node);
                    break;
                case SyntaxKind.ClassDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Class, SymbolFlags.ClassExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Interface, SymbolFlags.InterfaceExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.TypeAliasDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.EnumDeclaration:
                    if (isConstEnumDeclaration(<EnumDeclaration>node)) {
                        bindDeclaration(<Declaration>node, SymbolFlags.ConstEnum, SymbolFlags.ConstEnumExcludes, /*isBlockScopeContainer*/ false);
                    }
                    else {
                        bindDeclaration(<Declaration>node, SymbolFlags.RegularEnum, SymbolFlags.RegularEnumExcludes, /*isBlockScopeContainer*/ false);
                    }
                    break;
                case SyntaxKind.ModuleDeclaration:
                    bindModuleDeclaration(<ModuleDeclaration>node);
                    break;
                case SyntaxKind.ImportDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Import, SymbolFlags.ImportExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>node)) {
                        bindAnonymousDeclaration(node, SymbolFlags.ValueModule, '"' + removeFileExtension((<SourceFile>node).filename) + '"', /*isBlockScopeContainer*/ true);
                        break;
                    }

                case SyntaxKind.Block:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchBlock:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.SwitchStatement:
                    bindChildren(node, 0 , true);
                    break;

                default:
                    var saveParent = parent;
                    parent = node;
                    forEachChild(node, bind);
                    parent = saveParent;
            }
        }
    }
}
