/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>

module ts {

    export function isInstantiated(node: Node): boolean {
        // A module is uninstantiated if it contains only 
        // 1. interface declarations
        if (node.kind === SyntaxKind.InterfaceDeclaration) {
            return false;
        }
        // 2. non - exported import declarations
        else if (node.kind === SyntaxKind.ImportDeclaration && !(node.flags & NodeFlags.Export)) {
            return false;
        }
        // 3. other uninstantiated module declarations.
        else if (node.kind === SyntaxKind.ModuleBlock && !forEachChild(node, isInstantiated)) {
            return false;
        }
        else if (node.kind === SyntaxKind.ModuleDeclaration && !isInstantiated((<ModuleDeclaration>node).body)) {
            return false;
        }
        else {
            return true;
        }
    }

    export function bindSourceFile(file: SourceFile) {

        var parent: Node;
        var container: Declaration;
        var lastContainer: Declaration;
        var symbolCount = 0;
        var lastLocals: Declaration;
        var Symbol = objectAllocator.getSymbolConstructor();

        if (!file.locals) {
            file.locals = {};
            container = file;
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

        function getDeclarationName(node: Declaration): string {
            if (node.name) {
                if (node.kind === SyntaxKind.ModuleDeclaration && node.name.kind === SyntaxKind.StringLiteral) {
                    return '"' + node.name.text + '"';
                }
                return node.name.text;
            }
            switch (node.kind) {
                case SyntaxKind.Constructor: return "__constructor";
                case SyntaxKind.CallSignature: return "__call";
                case SyntaxKind.ConstructSignature: return "__new";
                case SyntaxKind.IndexSignature: return "__index";
            }
        }

        function getDisplayName(node: Declaration): string {
            return node.name ? identifierToString(node.name) : getDeclarationName(node);
        }

        function declareSymbol(symbols: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags): Symbol {
            var name = getDeclarationName(node);
            if (name !== undefined) {
                var symbol = hasProperty(symbols, name) ? symbols[name] : (symbols[name] = createSymbol(0, name));
                if (symbol.flags & excludes) {
                    if (node.name) {
                        node.name.parent = node;
                    }
                    file.semanticErrors.push(createDiagnosticForNode(node.name ? node.name : node,
                        Diagnostics.Duplicate_identifier_0, getDisplayName(node)));
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
            var exportExcludes = 0;
            if (symbolKind & SymbolFlags.Value) {
                exportKind |= SymbolFlags.ExportValue;
                exportExcludes |= SymbolFlags.Value;
            }
            if (symbolKind & SymbolFlags.Type) {
                exportKind |= SymbolFlags.ExportType;
                exportExcludes |= SymbolFlags.Type;
            }
            if (symbolKind & SymbolFlags.Namespace) {
                exportKind |= SymbolFlags.ExportNamespace;
                exportExcludes |= SymbolFlags.Namespace;
            }
            if (node.flags & NodeFlags.Export || (node.kind !== SyntaxKind.ImportDeclaration && isAmbientContext(container))) {
                if (exportKind) {
                    var local = declareSymbol(container.locals, undefined, node, exportKind, exportExcludes);
                    local.exportSymbol = declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                }
                else {
                    declareSymbol(container.symbol.exports, container.symbol, node, symbolKind, symbolExcludes);
                }
            }
            else {
                declareSymbol(container.locals, undefined, node, symbolKind, symbolExcludes | exportKind);
            }
        }

        // All container nodes are kept on a linked list in declaration order. This list is used by the getLocalNameOfContainer function
        // in the type checker to validate that the local name used for a container is unique.
        function bindChildren(node: Declaration, symbolKind: SymbolFlags) {
            if (symbolKind & SymbolFlags.HasLocals) {
                node.locals = {};
            }
            var saveParent = parent;
            var saveContainer = container;
            parent = node;
            if (symbolKind & SymbolFlags.IsContainer) {
                container = node;
                if (lastContainer) lastContainer.nextContainer = container;
                lastContainer = container;
            }
            forEachChild(node, bind);
            container = saveContainer;
            parent = saveParent;
        }

        function bindDeclaration(node: Declaration, symbolKind: SymbolFlags, symbolExcludes: SymbolFlags) {
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
            bindChildren(node, symbolKind);
        }

        function bindConstructorDeclaration(node: ConstructorDeclaration) {
            bindDeclaration(node, SymbolFlags.Constructor, 0);
            forEach(node.parameters, p => {
                if (p.flags & (NodeFlags.Public | NodeFlags.Private)) {
                    bindDeclaration(p, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
                }
            });
        }

        function bindModuleDeclaration(node: ModuleDeclaration) {
            if (node.name.kind === SyntaxKind.StringLiteral) {
                bindDeclaration(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes);
            }
            else if (isInstantiated(node)) {
                bindDeclaration(node, SymbolFlags.ValueModule, SymbolFlags.ValueModuleExcludes);
            }
            else {
                bindDeclaration(node, SymbolFlags.NamespaceModule, SymbolFlags.NamespaceModuleExcludes);
            }
        }

        function bindAnonymousDeclaration(node: Node, symbolKind: SymbolFlags, name: string) {
            var symbol = createSymbol(symbolKind, name);
            addDeclarationToSymbol(symbol, node, symbolKind);
            bindChildren(node, symbolKind);
        }

        function bindCatchVariableDeclaration(node: CatchBlock) {
            var symbol = createSymbol(SymbolFlags.Variable, node.variable.text || "__missing");
            addDeclarationToSymbol(symbol, node.variable, SymbolFlags.Variable);
            var saveParent = parent;
            parent = node;
            forEachChild(node, bind);
            parent = saveParent;
        }

        function bind(node: Node) {
            node.parent = parent;
            switch (node.kind) {
                case SyntaxKind.TypeParameter:
                    bindDeclaration(<Declaration>node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
                    break;
                case SyntaxKind.Parameter:
                    bindDeclaration(<Declaration>node, SymbolFlags.Variable, SymbolFlags.ParameterExcludes);
                    break;
                case SyntaxKind.VariableDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Variable, SymbolFlags.VariableExcludes);
                    break;
                case SyntaxKind.Property:
                case SyntaxKind.PropertyAssignment:
                    bindDeclaration(<Declaration>node, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
                    break;
                case SyntaxKind.EnumMember:
                    bindDeclaration(<Declaration>node, SymbolFlags.EnumMember, SymbolFlags.EnumMemberExcludes);
                    break;
                case SyntaxKind.CallSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.CallSignature, 0);
                    break;
                case SyntaxKind.Method:
                    bindDeclaration(<Declaration>node, SymbolFlags.Method, SymbolFlags.MethodExcludes);
                    break;
                case SyntaxKind.ConstructSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.ConstructSignature, 0);
                    break;
                case SyntaxKind.IndexSignature:
                    bindDeclaration(<Declaration>node, SymbolFlags.IndexSignature, 0);
                    break;
                case SyntaxKind.FunctionDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
                    break;
                case SyntaxKind.Constructor:
                    bindConstructorDeclaration(<ConstructorDeclaration>node);
                    break;
                case SyntaxKind.GetAccessor:
                    bindDeclaration(<Declaration>node, SymbolFlags.GetAccessor, SymbolFlags.GetAccessorExcludes);
                    break;
                case SyntaxKind.SetAccessor:
                    bindDeclaration(<Declaration>node, SymbolFlags.SetAccessor, SymbolFlags.SetAccessorExcludes);
                    break;
                case SyntaxKind.TypeLiteral:
                    bindAnonymousDeclaration(node, SymbolFlags.TypeLiteral, "__type");
                    break;
                case SyntaxKind.ObjectLiteral:
                    bindAnonymousDeclaration(node, SymbolFlags.ObjectLiteral, "__object");
                    break;
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    bindAnonymousDeclaration(node, SymbolFlags.Function, "__function");
                    break;
                case SyntaxKind.CatchBlock:
                    bindCatchVariableDeclaration(<CatchBlock>node);
                    break;
                case SyntaxKind.ClassDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Class, SymbolFlags.ClassExcludes);
                    break;
                case SyntaxKind.InterfaceDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Interface, SymbolFlags.InterfaceExcludes);
                    break;
                case SyntaxKind.EnumDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Enum, SymbolFlags.EnumExcludes);
                    break;
                case SyntaxKind.ModuleDeclaration:
                    bindModuleDeclaration(<ModuleDeclaration>node);
                    break;
                case SyntaxKind.ImportDeclaration:
                    bindDeclaration(<Declaration>node, SymbolFlags.Import, SymbolFlags.ImportExcludes);
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>node)) {
                        bindAnonymousDeclaration(node, SymbolFlags.ValueModule, '"' + getModuleNameFromFilename((<SourceFile>node).filename) + '"');
                        break;
                    }
                default:
                    var saveParent = parent;
                    parent = node;
                    forEachChild(node, bind);
                    parent = saveParent;
            }
        }
    }
}
