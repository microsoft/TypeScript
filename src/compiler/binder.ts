/// <reference path="parser.ts"/>

module ts {
    export const enum ModuleInstanceState {
        NonInstantiated = 0,
        Instantiated    = 1,
        ConstEnumOnly   = 2
    }

    export function getModuleInstanceState(node: Node): ModuleInstanceState {
        // A module is uninstantiated if it contains only 
        // 1. interface declarations
        if (node.kind === SyntaxKind.InterfaceDeclaration) {
            return ModuleInstanceState.NonInstantiated;
        }
        // 2. const enum declarations don't make module instantiated
        else if (isConstEnumDeclaration(node)) {
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
                switch (getModuleInstanceState(n)) {
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
            return getModuleInstanceState((<ModuleDeclaration>node).body);
        }
        else {
            return ModuleInstanceState.Instantiated;
        }
    }

    /**
     * Returns false if any of the following are true:
     *   1. declaration has no name
     *   2. declaration has a literal name (not computed)
     *   3. declaration has a computed property name that is a known symbol
     */
    export function hasComputedNameButNotSymbol(declaration: Declaration): boolean {
        return declaration.name && declaration.name.kind === SyntaxKind.ComputedPropertyName;
    }

    export function bindSourceFile(file: SourceFile) {

        var parent: Node;
        var container: Node;
        var blockScopeContainer: Node;
        var lastContainer: Node;
        var statement: Statement;
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

        // Should not be called on a declaration with a computed property name.
        function getDeclarationName(node: Declaration): string {
            if (node.name) {
                if (node.kind === SyntaxKind.ModuleDeclaration && node.name.kind === SyntaxKind.StringLiteral) {
                    return '"' + (<LiteralExpression>node.name).text + '"';
                }
                Debug.assert(!hasComputedNameButNotSymbol(node));
                return (<Identifier | LiteralExpression>node.name).text;
            }
            switch (node.kind) {
                case SyntaxKind.ConstructorType:
                case SyntaxKind.Constructor:
                    return "__constructor";
                case SyntaxKind.FunctionType:
                case SyntaxKind.CallSignature:
                    return "__call";
                case SyntaxKind.ConstructSignature:
                    return "__new";
                case SyntaxKind.IndexSignature:
                    return "__index";
            }
        }

        function getDisplayName(node: Declaration): string {
            return node.name ? declarationNameToString(node.name) : getDeclarationName(node);
        }

        function declareSymbol(symbols: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags): Symbol {
            // Nodes with computed property names will not get symbols, because the type checker
            // does not make properties for them.
            if (hasComputedNameButNotSymbol(node)) {
                return undefined;
            }

            var name = getDeclarationName(node);
            if (name !== undefined) {
                var symbol = hasProperty(symbols, name) ? symbols[name] : (symbols[name] = createSymbol(0, name));
                if (symbol.flags & excludes) {
                    if (node.name) {
                        node.name.parent = node;
                    }

                    // Report errors every position with duplicate declaration
                    // Report errors on previous encountered declarations
                    var message = symbol.flags & SymbolFlags.BlockScopedVariable
                        ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 
                        : Diagnostics.Duplicate_identifier_0;

                    forEach(symbol.declarations, declaration => {
                        file.semanticDiagnostics.push(createDiagnosticForNode(declaration.name, message, getDisplayName(declaration)));
                    });
                    file.semanticDiagnostics.push(createDiagnosticForNode(node.name, message, getDisplayName(node)));

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
                    file.semanticDiagnostics.push(createDiagnosticForNode(symbol.exports[prototypeSymbol.name].declarations[0],
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

            if (getCombinedNodeFlags(node) & NodeFlags.Export || (node.kind !== SyntaxKind.ImportDeclaration && isAmbientContext(container))) {
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
        function bindChildren(node: Node, symbolKind: SymbolFlags, isBlockScopeContainer: boolean) {
            if (symbolKind & SymbolFlags.HasLocals) {
                node.locals = {};
            }

            var saveParent = parent;
            var saveContainer = container;
            var savedBlockScopeContainer = blockScopeContainer;
            parent = node;
            if (symbolKind & SymbolFlags.IsContainer) {
                container = node;

                if (lastContainer) {
                    lastContainer.nextContainer = container;
                }

                lastContainer = container;
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
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
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
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.InterfaceDeclaration:
                    declareSymbol(container.symbol.members, container.symbol, node, symbolKind, symbolExcludes);
                    break;
                case SyntaxKind.EnumDeclaration:
                    declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                    break;
            }
            bindChildren(node, symbolKind, isBlockScopeContainer);
        }

        function bindModuleDeclaration(node: ModuleDeclaration) {
            if (node.name.kind === SyntaxKind.StringLiteral) {
                bindDeclaration(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes, /*isBlockScopeContainer*/ true);
            }
            else {
                var state = getModuleInstanceState(node);
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

        function bindFunctionOrConstructorType(node: SignatureDeclaration) {
            // For a given function symbol "<...>(...) => T" we want to generate a symbol identical
            // to the one we would get for: { <...>(...): T }
            //
            // We do that by making an anonymous type literal symbol, and then setting the function 
            // symbol as its sole member. To the rest of the system, this symbol will be  indistinguishable 
            // from an actual type literal symbol you would have gotten had you used the long form.

            var symbol = createSymbol(SymbolFlags.Signature, getDeclarationName(node));
            addDeclarationToSymbol(symbol, node, SymbolFlags.Signature);
            bindChildren(node, SymbolFlags.Signature, /*isBlockScopeContainer:*/ false);

            var typeLiteralSymbol = createSymbol(SymbolFlags.TypeLiteral, "__type");
            addDeclarationToSymbol(typeLiteralSymbol, node, SymbolFlags.TypeLiteral);
            typeLiteralSymbol.members = {};
            typeLiteralSymbol.members[node.kind === SyntaxKind.FunctionType ? "__call" : "__new"] = symbol
        }

        function bindAnonymousDeclaration(node: Declaration, symbolKind: SymbolFlags, name: string, isBlockScopeContainer: boolean) {
            var symbol = createSymbol(symbolKind, name);
            addDeclarationToSymbol(symbol, node, symbolKind);
            bindChildren(node, symbolKind, isBlockScopeContainer);
        }

        function bindCatchVariableDeclaration(node: CatchClause) {
            var symbol = createSymbol(SymbolFlags.FunctionScopedVariable, node.name.text || "__missing");
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

        function getDestructuringParameterName(node: Declaration) {
            return "__" + indexOf((<SignatureDeclaration>node.parent).parameters, node);
        }
        
        function bindTaggedTemplateExpression(node: TaggedTemplateExpression) {
            if (file.languageVersion >= ScriptTarget.ES6) return;
            
            statement.downlevelTaggedTemplates.push(node);
        }

        function bind(node: Node) {
            node.parent = parent;
            
            var savedStatement = statement;
            
            if (isStatement(node)) {
                statement = <Statement> node;
                if (file.languageVersion < ScriptTarget.ES6) {
                    statement.downlevelTaggedTemplates = [];
                }
            }
            
            switch (node.kind) {
                case SyntaxKind.TypeParameter:
                    bindDeclaration(<Declaration>node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.Parameter:
                    bindParameter(<ParameterDeclaration>node);
                    break;
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.BindingElement:
                    if (isBindingPattern((<Declaration>node).name)) {
                        bindChildren(node, 0, /*isBlockScopeContainer*/ false);
                    }
                    else if (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) {
                        bindBlockScopedVariableDeclaration(<Declaration>node);
                    }
                    else {
                        bindDeclaration(<Declaration>node, SymbolFlags.FunctionScopedVariable, SymbolFlags.FunctionScopedVariableExcludes, /*isBlockScopeContainer*/ false);
                    }
                    break;
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.Property | ((<PropertyDeclaration>node).questionToken ? SymbolFlags.Optional : 0), SymbolFlags.PropertyExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ShorthandPropertyAssignment:
                    bindDeclaration(<Declaration>node, SymbolFlags.Property, SymbolFlags.PropertyExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.EnumMember:
                    bindDeclaration(<Declaration>node, SymbolFlags.EnumMember, SymbolFlags.EnumMemberExcludes, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.Signature, 0, /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    // If this is an ObjectLiteralExpression method, then it sits in the same space
                    // as other properties in the object literal.  So we use SymbolFlags.PropertyExcludes
                    // so that it will conflict with any other object literal members with the same
                    // name.
                    bindDeclaration(<Declaration>node, SymbolFlags.Method | ((<MethodDeclaration>node).questionToken ? SymbolFlags.Optional : 0),
                        isObjectLiteralMethod(node) ? SymbolFlags.PropertyExcludes : SymbolFlags.MethodExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.FunctionDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Function, SymbolFlags.FunctionExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.Constructor:
                    bindDeclaration(<Declaration>node, SymbolFlags.Constructor, /*symbolExcludes:*/ 0, /*isBlockScopeContainer:*/ true);
                    break;
                case SyntaxKind.GetAccessor:
                    bindDeclaration(<Declaration>node, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.SetAccessor:
                    bindDeclaration(<Declaration>node, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes, /*isBlockScopeContainer*/ true);
                    break;

                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    bindFunctionOrConstructorType(<SignatureDeclaration>node);
                    break;

                case SyntaxKind.TypeLiteral:
                    bindAnonymousDeclaration(<TypeLiteralNode>node, SymbolFlags.TypeLiteral, "__type", /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.ObjectLiteralExpression:
                    bindAnonymousDeclaration(<ObjectLiteralExpression>node, SymbolFlags.ObjectLiteral, "__object", /*isBlockScopeContainer*/ false);
                    break;
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    bindAnonymousDeclaration(<FunctionExpression>node, SymbolFlags.Function, "__function", /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.CatchClause:
                    bindCatchVariableDeclaration(<CatchClause>node);
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
                    if (isConst(node)) {
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
                        bindAnonymousDeclaration(<SourceFile>node, SymbolFlags.ValueModule, '"' + removeFileExtension((<SourceFile>node).filename) + '"', /*isBlockScopeContainer*/ true);
                        break;
                    }
                case SyntaxKind.Block:
                case SyntaxKind.CatchClause:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.SwitchStatement:
                    bindChildren(node, 0, /*isBlockScopeContainer*/ true);
                    break;
                case SyntaxKind.TaggedTemplateExpression:
                    bindTaggedTemplateExpression(<TaggedTemplateExpression> node);
                default:
                    var saveParent = parent;
                    parent = node;
                    forEachChild(node, bind);
                    parent = saveParent;
            }
            
            statement = savedStatement;
        }

        function bindParameter(node: ParameterDeclaration) {
            if (isBindingPattern(node.name)) {
                bindAnonymousDeclaration(node, SymbolFlags.FunctionScopedVariable, getDestructuringParameterName(node), /*isBlockScopeContainer*/ false);
            }
            else {
                bindDeclaration(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes, /*isBlockScopeContainer*/ false);
            }

            // If this is a property-parameter, then also declare the property symbol into the 
            // containing class.
            if (node.flags & NodeFlags.AccessibilityModifier &&
                node.parent.kind === SyntaxKind.Constructor &&
                node.parent.parent.kind === SyntaxKind.ClassDeclaration) {

                var classDeclaration = <ClassDeclaration>node.parent.parent;
                declareSymbol(classDeclaration.symbol.members, classDeclaration.symbol, node, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
            }
        }
    }
}
