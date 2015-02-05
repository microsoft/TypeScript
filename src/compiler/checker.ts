/// <reference path="binder.ts"/>

module ts {
    var nextSymbolId = 1;
    var nextNodeId = 1;
    var nextMergeId = 1;

    /* @internal */ export var checkTime = 0;

    export function createTypeChecker(host: TypeCheckerHost, produceDiagnostics: boolean): TypeChecker {
        var Symbol = objectAllocator.getSymbolConstructor();
        var Type = objectAllocator.getTypeConstructor();
        var Signature = objectAllocator.getSignatureConstructor();

        var typeCount = 0;

        var emptyArray: any[] = [];
        var emptySymbols: SymbolTable = {};

        var compilerOptions = host.getCompilerOptions();
        var languageVersion = compilerOptions.target || ScriptTarget.ES3;

        var emitResolver = createResolver();

        var checker: TypeChecker = {
            getNodeCount: () => sum(host.getSourceFiles(), "nodeCount"),
            getIdentifierCount: () => sum(host.getSourceFiles(), "identifierCount"),
            getSymbolCount: () => sum(host.getSourceFiles(), "symbolCount"),
            getTypeCount: () => typeCount,
            isUndefinedSymbol: symbol => symbol === undefinedSymbol,
            isArgumentsSymbol: symbol => symbol === argumentsSymbol,
            getDiagnostics,
            getGlobalDiagnostics,
            getTypeOfSymbolAtLocation,
            getDeclaredTypeOfSymbol,
            getPropertiesOfType,
            getPropertyOfType,
            getSignaturesOfType,
            getIndexTypeOfType,
            getReturnTypeOfSignature,
            getSymbolsInScope,
            getSymbolAtLocation,
            getShorthandAssignmentValueSymbol,
            getTypeAtLocation,
            typeToString,
            getSymbolDisplayBuilder,
            symbolToString,
            getAugmentedPropertiesOfType,
            getRootSymbols,
            getContextualType,
            getFullyQualifiedName,
            getResolvedSignature,
            getEnumMemberValue,
            isValidPropertyAccess,
            getSignatureFromDeclaration,
            isImplementationOfOverload,
            getAliasedSymbol: resolveImport,
            getEmitResolver: () => emitResolver,
        };

        var undefinedSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "undefined");
        var argumentsSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "arguments");
        var unknownSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "unknown");
        var resolvingSymbol = createSymbol(SymbolFlags.Transient, "__resolving__");

        var anyType = createIntrinsicType(TypeFlags.Any, "any");
        var stringType = createIntrinsicType(TypeFlags.String, "string");
        var numberType = createIntrinsicType(TypeFlags.Number, "number");
        var booleanType = createIntrinsicType(TypeFlags.Boolean, "boolean");
        var voidType = createIntrinsicType(TypeFlags.Void, "void");
        var undefinedType = createIntrinsicType(TypeFlags.Undefined | TypeFlags.ContainsUndefinedOrNull, "undefined");
        var nullType = createIntrinsicType(TypeFlags.Null | TypeFlags.ContainsUndefinedOrNull, "null");
        var unknownType = createIntrinsicType(TypeFlags.Any, "unknown");
        var resolvingType = createIntrinsicType(TypeFlags.Any, "__resolving__");

        var emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var inferenceFailureType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);

        var anySignature = createSignature(undefined, undefined, emptyArray, anyType, 0, false, false);
        var unknownSignature = createSignature(undefined, undefined, emptyArray, unknownType, 0, false, false);

        var globals: SymbolTable = {};

        var globalArraySymbol: Symbol;

        var globalObjectType: ObjectType;
        var globalFunctionType: ObjectType;
        var globalArrayType: ObjectType;
        var globalStringType: ObjectType;
        var globalNumberType: ObjectType;
        var globalBooleanType: ObjectType;
        var globalRegExpType: ObjectType;
        var globalTemplateStringsArrayType: ObjectType;

        var anyArrayType: Type;

        var tupleTypes: Map<TupleType> = {};
        var unionTypes: Map<UnionType> = {};
        var stringLiteralTypes: Map<StringLiteralType> = {};
        var emitExtends = false;

        var mergedSymbols: Symbol[] = [];
        var symbolLinks: SymbolLinks[] = [];
        var nodeLinks: NodeLinks[] = [];
        var potentialThisCollisions: Node[] = [];

        var diagnostics = createDiagnosticCollection();

        var primitiveTypeInfo: Map<{ type: Type; flags: TypeFlags }> = {
            "string": {
                type: stringType,
                flags: TypeFlags.StringLike
            },
            "number": {
                type: numberType,
                flags: TypeFlags.NumberLike
            },
            "boolean": {
                type: booleanType,
                flags: TypeFlags.Boolean
            }
        };

        function error(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            var diagnostic = location
                ? createDiagnosticForNode(location, message, arg0, arg1, arg2)
                : createCompilerDiagnostic(message, arg0, arg1, arg2);
            diagnostics.add(diagnostic);
        }

        function createSymbol(flags: SymbolFlags, name: string): Symbol {
            return new Symbol(flags, name);
        }

        function getExcludedSymbolFlags(flags: SymbolFlags): SymbolFlags {
            var result: SymbolFlags = 0;
            if (flags & SymbolFlags.BlockScopedVariable) result |= SymbolFlags.BlockScopedVariableExcludes;
            if (flags & SymbolFlags.FunctionScopedVariable) result |= SymbolFlags.FunctionScopedVariableExcludes;
            if (flags & SymbolFlags.Property) result |= SymbolFlags.PropertyExcludes;
            if (flags & SymbolFlags.EnumMember) result |= SymbolFlags.EnumMemberExcludes;
            if (flags & SymbolFlags.Function) result |= SymbolFlags.FunctionExcludes;
            if (flags & SymbolFlags.Class) result |= SymbolFlags.ClassExcludes;
            if (flags & SymbolFlags.Interface) result |= SymbolFlags.InterfaceExcludes;
            if (flags & SymbolFlags.RegularEnum) result |= SymbolFlags.RegularEnumExcludes;
            if (flags & SymbolFlags.ConstEnum) result |= SymbolFlags.ConstEnumExcludes;
            if (flags & SymbolFlags.ValueModule) result |= SymbolFlags.ValueModuleExcludes;
            if (flags & SymbolFlags.Method) result |= SymbolFlags.MethodExcludes;
            if (flags & SymbolFlags.GetAccessor) result |= SymbolFlags.GetAccessorExcludes;
            if (flags & SymbolFlags.SetAccessor) result |= SymbolFlags.SetAccessorExcludes;
            if (flags & SymbolFlags.TypeParameter) result |= SymbolFlags.TypeParameterExcludes;
            if (flags & SymbolFlags.TypeAlias) result |= SymbolFlags.TypeAliasExcludes;
            if (flags & SymbolFlags.Import) result |= SymbolFlags.ImportExcludes;
            return result;
        }

        function recordMergedSymbol(target: Symbol, source: Symbol) {
            if (!source.mergeId) source.mergeId = nextMergeId++;
            mergedSymbols[source.mergeId] = target;
        }

        function cloneSymbol(symbol: Symbol): Symbol {
            var result = createSymbol(symbol.flags | SymbolFlags.Merged, symbol.name);
            result.declarations = symbol.declarations.slice(0);
            result.parent = symbol.parent;
            if (symbol.valueDeclaration) result.valueDeclaration = symbol.valueDeclaration;
            if (symbol.constEnumOnlyModule) result.constEnumOnlyModule = true;
            if (symbol.members) result.members = cloneSymbolTable(symbol.members);
            if (symbol.exports) result.exports = cloneSymbolTable(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }

        function extendSymbol(target: Symbol, source: Symbol) {
            if (!(target.flags & getExcludedSymbolFlags(source.flags))) {
                if (source.flags & SymbolFlags.ValueModule && target.flags & SymbolFlags.ValueModule && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                    // reset flag when merging instantiated module into value module that has only const enums
                    target.constEnumOnlyModule = false;
                }
                target.flags |= source.flags;
                if (!target.valueDeclaration && source.valueDeclaration) target.valueDeclaration = source.valueDeclaration;
                forEach(source.declarations, node => {
                    target.declarations.push(node);
                });
                if (source.members) {
                    if (!target.members) target.members = {};
                    extendSymbolTable(target.members, source.members);
                }
                if (source.exports) {
                    if (!target.exports) target.exports = {};
                    extendSymbolTable(target.exports, source.exports);
                }
                recordMergedSymbol(target, source);
            }
            else {
                var message = target.flags & SymbolFlags.BlockScopedVariable || source.flags & SymbolFlags.BlockScopedVariable
                    ? Diagnostics.Cannot_redeclare_block_scoped_variable_0 : Diagnostics.Duplicate_identifier_0;
                forEach(source.declarations, node => {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
                forEach(target.declarations, node => {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
            }
        }

        function cloneSymbolTable(symbolTable: SymbolTable): SymbolTable {
            var result: SymbolTable = {};
            for (var id in symbolTable) {
                if (hasProperty(symbolTable, id)) {
                    result[id] = symbolTable[id];
                }
            }
            return result;
        }

        function extendSymbolTable(target: SymbolTable, source: SymbolTable) {
            for (var id in source) {
                if (hasProperty(source, id)) {
                    if (!hasProperty(target, id)) {
                        target[id] = source[id];
                    }
                    else {
                        var symbol = target[id];
                        if (!(symbol.flags & SymbolFlags.Merged)) {
                            target[id] = symbol = cloneSymbol(symbol);
                        }
                        extendSymbol(symbol, source[id]);
                    }
                }
            }
        }

        function getSymbolLinks(symbol: Symbol): SymbolLinks {
            if (symbol.flags & SymbolFlags.Transient) return <TransientSymbol>symbol;
            if (!symbol.id) symbol.id = nextSymbolId++;
            return symbolLinks[symbol.id] || (symbolLinks[symbol.id] = {});
        }

        function getNodeLinks(node: Node): NodeLinks {
            if (!node.id) node.id = nextNodeId++;
            return nodeLinks[node.id] || (nodeLinks[node.id] = {});
        }

        function getSourceFile(node: Node): SourceFile {
            return <SourceFile>getAncestor(node, SyntaxKind.SourceFile);
        }

        function isGlobalSourceFile(node: Node) {
            return node.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>node);
        }

        function getSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags): Symbol {
            if (meaning && hasProperty(symbols, name)) {
                var symbol = symbols[name];
                Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
                if (symbol.flags & meaning) {
                    return symbol;
                }

                if (symbol.flags & SymbolFlags.Import) {
                    var target = resolveImport(symbol);
                    // unknown symbol will mean that there were reported error during import resolution
                    // treat it as positive answer to avoid cascading errors
                    if (target === unknownSymbol || target.flags & meaning) {
                        return symbol;
                    }
                }
            }

            // return undefined if we can't find a symbol.
        }

        /** Returns true if node1 is defined before node 2**/
        function isDefinedBefore(node1: Node, node2: Node): boolean {
            var file1 = getSourceFileOfNode(node1);
            var file2 = getSourceFileOfNode(node2);
            if (file1 === file2) {
                return node1.pos <= node2.pos;
            }

            if (!compilerOptions.out) {
                return true;
            }

            var sourceFiles = host.getSourceFiles();
            return sourceFiles.indexOf(file1) <= sourceFiles.indexOf(file2);
        }

        // Resolve a given name for a given meaning at a given location. An error is reported if the name was not found and
        // the nameNotFoundMessage argument is not undefined. Returns the resolved symbol, or undefined if no symbol with
        // the given name can be found.
        function resolveName(location: Node, name: string, meaning: SymbolFlags, nameNotFoundMessage: DiagnosticMessage, nameArg: string | Identifier): Symbol {
            var result: Symbol;
            var lastLocation: Node;
            var propertyWithInvalidInitializer: Node;
            var errorLocation = location;

            loop: while (location) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = getSymbol(location.locals, name, meaning)) {
                        break loop;
                    }
                }
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalModule(<SourceFile>location)) break;
                    case SyntaxKind.ModuleDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & SymbolFlags.ModuleMember)) {
                            break loop;
                        }
                        break;
                    case SyntaxKind.EnumDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & SymbolFlags.EnumMember)) {
                            break loop;
                        }
                        break;
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                        // TypeScript 1.0 spec (April 2014): 8.4.1
                        // Initializer expressions for instance member variables are evaluated in the scope 
                        // of the class constructor body but are not permitted to reference parameters or 
                        // local variables of the constructor. This effectively means that entities from outer scopes 
                        // by the same name as a constructor parameter or local variable are inaccessible 
                        // in initializer expressions for instance member variables.
                        if (location.parent.kind === SyntaxKind.ClassDeclaration && !(location.flags & NodeFlags.Static)) {
                            var ctor = findConstructorDeclaration(<ClassDeclaration>location.parent);
                            if (ctor && ctor.locals) {
                                if (getSymbol(ctor.locals, name, meaning & SymbolFlags.Value)) {
                                    // Remember the property node, it will be used later to report appropriate error
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).members, name, meaning & SymbolFlags.Type)) {
                            if (lastLocation && lastLocation.flags & NodeFlags.Static) {
                                // TypeScript 1.0 spec (April 2014): 3.4.1
                                // The scope of a type parameter extends over the entire declaration with which the type
                                // parameter list is associated, with the exception of static member declarations in classes.
                                error(errorLocation, Diagnostics.Static_members_cannot_reference_class_type_parameters);
                                return undefined;
                            }
                            break loop;
                        }
                        break;

                    // It is not legal to reference a class's own type parameters from a computed property name that
                    // belongs to the class. For example:
                    //
                    //   function foo<T>() { return '' }
                    //   class C<T> { // <-- Class's own type parameter T
                    //       [foo<T>()]() { } // <-- Reference to T from class's own computed property
                    //   }
                    //
                    case SyntaxKind.ComputedPropertyName:
                        var grandparent = location.parent.parent;
                        if (grandparent.kind === SyntaxKind.ClassDeclaration || grandparent.kind === SyntaxKind.InterfaceDeclaration) {
                            // A reference to this grandparent's type parameters would be an error
                            if (result = getSymbol(getSymbolOfNode(grandparent).members, name, meaning & SymbolFlags.Type)) {
                                error(errorLocation, Diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type);
                                return undefined;
                            }
                        }
                        break;
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        break;
                    case SyntaxKind.FunctionExpression:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        var id = (<FunctionExpression>location).name;
                        if (id && name === id.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                    case SyntaxKind.CatchClause:
                        var id = (<CatchClause>location).name;
                        if (name === id.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                }
                lastLocation = location;
                location = location.parent;
            }

            if (!result) {
                result = getSymbol(globals, name, meaning);
            }

            if (!result) {
                if (nameNotFoundMessage) {
                    error(errorLocation, nameNotFoundMessage, typeof nameArg === "string" ? nameArg : declarationNameToString(nameArg));
                }
                return undefined;
            }

            // Perform extra checks only if error reporting was requested
            if (nameNotFoundMessage) {
                if (propertyWithInvalidInitializer) {
                    // We have a match, but the reference occurred within a property initializer and the identifier also binds
                    // to a local variable in the constructor where the code will be emitted.
                    var propertyName = (<PropertyDeclaration>propertyWithInvalidInitializer).name;
                    error(errorLocation, Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor,
                        declarationNameToString(propertyName), typeof nameArg === "string" ? nameArg : declarationNameToString(nameArg));
                    return undefined;
                }
                if (result.flags & SymbolFlags.BlockScopedVariable) {
                    // Block-scoped variables cannot be used before their definition
                    var declaration = forEach(result.declarations, d => getCombinedNodeFlags(d) & NodeFlags.BlockScoped ? d : undefined);
                    Debug.assert(declaration !== undefined, "Block-scoped variable declaration is undefined");
                    if (!isDefinedBefore(declaration, errorLocation)) {
                        error(errorLocation, Diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationNameToString(declaration.name));
                    }
                }
            }
            return result;
        }

        function resolveImport(symbol: Symbol): Symbol {
            Debug.assert((symbol.flags & SymbolFlags.Import) !== 0, "Should only get Imports here.");
            var links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                var node = <ImportDeclaration>getDeclarationOfKind(symbol, SyntaxKind.ImportDeclaration);
                // Grammar checking
                if (node.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                    if ((<ExternalModuleReference>node.moduleReference).expression.kind !== SyntaxKind.StringLiteral) {
                        grammarErrorOnNode((<ExternalModuleReference>node.moduleReference).expression, Diagnostics.String_literal_expected);
                    }
                }

                var target = node.moduleReference.kind === SyntaxKind.ExternalModuleReference
                    ? resolveExternalModuleName(node, getExternalModuleImportDeclarationExpression(node))
                    : getSymbolOfPartOfRightHandSideOfImport(<EntityName>node.moduleReference, node);
                if (links.target === resolvingSymbol) {
                    links.target = target || unknownSymbol;
                }
                else {
                    error(node, Diagnostics.Circular_definition_of_import_alias_0, symbolToString(symbol));
                }
            }
            else if (links.target === resolvingSymbol) {
                links.target = unknownSymbol;
            }
            return links.target;
        }

        // This function is only for imports with entity names
        function getSymbolOfPartOfRightHandSideOfImport(entityName: EntityName, importDeclaration?: ImportDeclaration): Symbol {
            if (!importDeclaration) {
                importDeclaration = <ImportDeclaration>getAncestor(entityName, SyntaxKind.ImportDeclaration);
                Debug.assert(importDeclaration !== undefined);
            }
            // There are three things we might try to look for. In the following examples,
            // the search term is enclosed in |...|:
            //
            //     import a = |b|; // Namespace
            //     import a = |b.c|; // Value, type, namespace
            //     import a = |b.c|.d; // Namespace
            if (entityName.kind === SyntaxKind.Identifier && isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = <QualifiedName>entityName.parent;
            }
            // Check for case 1 and 3 in the above example
            if (entityName.kind === SyntaxKind.Identifier || entityName.parent.kind === SyntaxKind.QualifiedName) {
                return resolveEntityName(importDeclaration, entityName, SymbolFlags.Namespace);
            }
            else {
                // Case 2 in above example
                // entityName.kind could be a QualifiedName or a Missing identifier
                Debug.assert(entityName.parent.kind === SyntaxKind.ImportDeclaration);
                return resolveEntityName(importDeclaration, entityName, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace);
            }
        }

        function getFullyQualifiedName(symbol: Symbol): string {
            return symbol.parent ? getFullyQualifiedName(symbol.parent) + "." + symbolToString(symbol) : symbolToString(symbol);
        }

        // Resolves a qualified name and any involved import aliases
        function resolveEntityName(location: Node, name: EntityName, meaning: SymbolFlags): Symbol {
            if (getFullWidth(name) === 0) {
                return undefined;
            }

            if (name.kind === SyntaxKind.Identifier) {
                var symbol = resolveName(location,(<Identifier>name).text, meaning, Diagnostics.Cannot_find_name_0, <Identifier>name);
                if (!symbol) {
                    return;
                }
            }
            else if (name.kind === SyntaxKind.QualifiedName) {
                var namespace = resolveEntityName(location,(<QualifiedName>name).left, SymbolFlags.Namespace);
                if (!namespace || namespace === unknownSymbol || getFullWidth((<QualifiedName>name).right) === 0) return;
                var symbol = getSymbol(namespace.exports,(<QualifiedName>name).right.text, meaning);
                if (!symbol) {
                    error(location, Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(namespace),
                        declarationNameToString((<QualifiedName>name).right));
                    return;
                }
            }

            Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
            return symbol.flags & meaning ? symbol : resolveImport(symbol);
        }

        function isExternalModuleNameRelative(moduleName: string): boolean {
            // TypeScript 1.0 spec (April 2014): 11.2.1
            // An external module name is "relative" if the first term is "." or "..".
            return moduleName.substr(0, 2) === "./" || moduleName.substr(0, 3) === "../" || moduleName.substr(0, 2) === ".\\" || moduleName.substr(0, 3) === "..\\";
        }

        function resolveExternalModuleName(location: Node, moduleReferenceExpression: Expression): Symbol {
            if (moduleReferenceExpression.kind !== SyntaxKind.StringLiteral) {
                return;
            }

            var moduleReferenceLiteral = <LiteralExpression>moduleReferenceExpression;
            var searchPath = getDirectoryPath(getSourceFile(location).fileName);

            // Module names are escaped in our symbol table.  However, string literal values aren't.
            // Escape the name in the "require(...)" clause to ensure we find the right symbol.
            var moduleName = escapeIdentifier(moduleReferenceLiteral.text);

            if (!moduleName) return;
            var isRelative = isExternalModuleNameRelative(moduleName);
            if (!isRelative) {
                var symbol = getSymbol(globals, '"' + moduleName + '"', SymbolFlags.ValueModule);
                if (symbol) {
                    return getResolvedExportSymbol(symbol);
                }
            }
            while (true) {
                var fileName = normalizePath(combinePaths(searchPath, moduleName));
                var sourceFile = host.getSourceFile(fileName + ".ts") || host.getSourceFile(fileName + ".d.ts");
                if (sourceFile || isRelative) break;
                var parentPath = getDirectoryPath(searchPath);
                if (parentPath === searchPath) break;
                searchPath = parentPath;
            }
            if (sourceFile) {
                if (sourceFile.symbol) {
                    return getResolvedExportSymbol(sourceFile.symbol);
                }
                error(moduleReferenceLiteral, Diagnostics.File_0_is_not_an_external_module, sourceFile.fileName);
                return;
            }
            error(moduleReferenceLiteral, Diagnostics.Cannot_find_external_module_0, moduleName);
        }

        function getResolvedExportSymbol(moduleSymbol: Symbol): Symbol {
            var symbol = getExportAssignmentSymbol(moduleSymbol);
            if (symbol) {
                if (symbol.flags & (SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace)) {
                    return symbol;
                }
                if (symbol.flags & SymbolFlags.Import) {
                    return resolveImport(symbol);
                }
            }
            return moduleSymbol;
        }

        function getExportAssignmentSymbol(symbol: Symbol): Symbol {
            checkTypeOfExportAssignmentSymbol(symbol);
            var symbolLinks = getSymbolLinks(symbol);
            return symbolLinks.exportAssignSymbol === unknownSymbol ? undefined : symbolLinks.exportAssignSymbol;
        }

        function checkTypeOfExportAssignmentSymbol(containerSymbol: Symbol): void {
            var symbolLinks = getSymbolLinks(containerSymbol);
            if (!symbolLinks.exportAssignSymbol) {
                var exportInformation = collectExportInformationForSourceFileOrModule(containerSymbol);
                if (exportInformation.exportAssignments.length) {
                    if (exportInformation.exportAssignments.length > 1) {
                        // TypeScript 1.0 spec (April 2014): 11.2.4
                        // It is an error for an external module to contain more than one export assignment.
                        forEach(exportInformation.exportAssignments, node => error(node, Diagnostics.A_module_cannot_have_more_than_one_export_assignment));
                    }
                    var node = exportInformation.exportAssignments[0];
                    if (exportInformation.hasExportedMember) {
                        // TypeScript 1.0 spec (April 2014): 11.2.3
                        // If an external module contains an export assignment it is an error 
                        // for the external module to also contain export declarations.
                        // The two types of exports are mutually exclusive.
                        error(node, Diagnostics.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements);
                    }
                    if (node.exportName.text) {
                        var meaning = SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace;
                        var exportSymbol = resolveName(node, node.exportName.text, meaning, Diagnostics.Cannot_find_name_0, node.exportName);
                    }
                }
                symbolLinks.exportAssignSymbol = exportSymbol || unknownSymbol;
            }
        }

        function collectExportInformationForSourceFileOrModule(symbol: Symbol) {
            var seenExportedMember = false;
            var result: ExportAssignment[] = [];
            forEach(symbol.declarations, declaration => {
                var block = <Block>(declaration.kind === SyntaxKind.SourceFile ? declaration : (<ModuleDeclaration>declaration).body);
                forEach(block.statements, node => {
                    if (node.kind === SyntaxKind.ExportAssignment) {
                        result.push(<ExportAssignment>node);
                    }
                    else {
                        seenExportedMember = seenExportedMember || (node.flags & NodeFlags.Export) !== 0;
                    }
                });
            });
            return {
                hasExportedMember: seenExportedMember,
                exportAssignments: result
            };
        }

        function getMergedSymbol(symbol: Symbol): Symbol {
            var merged: Symbol;
            return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
        }

        function getSymbolOfNode(node: Node): Symbol {
            return getMergedSymbol(node.symbol);
        }

        function getParentOfSymbol(symbol: Symbol): Symbol {
            return getMergedSymbol(symbol.parent);
        }

        function getExportSymbolOfValueSymbolIfExported(symbol: Symbol): Symbol {
            return symbol && (symbol.flags & SymbolFlags.ExportValue) !== 0
                ? getMergedSymbol(symbol.exportSymbol)
                : symbol;
        }

        function symbolIsValue(symbol: Symbol): boolean {
            // If it is an instantiated symbol, then it is a value if the symbol it is an
            // instantiation of is a value.
            if (symbol.flags & SymbolFlags.Instantiated) {
                return symbolIsValue(getSymbolLinks(symbol).target);
            }

            // If the symbol has the value flag, it is trivially a value.
            if (symbol.flags & SymbolFlags.Value) {
                return true;
            }

            // If it is an import, then it is a value if the symbol it resolves to is a value.
            if (symbol.flags & SymbolFlags.Import) {
                return (resolveImport(symbol).flags & SymbolFlags.Value) !== 0;
            }

            return false;
        }

        function findConstructorDeclaration(node: ClassDeclaration): ConstructorDeclaration {
            var members = node.members;
            for (var i = 0; i < members.length; i++) {
                var member = members[i];
                if (member.kind === SyntaxKind.Constructor && nodeIsPresent((<ConstructorDeclaration>member).body)) {
                    return <ConstructorDeclaration>member;
                }
            }
        }

        function createType(flags: TypeFlags): Type {
            var result = new Type(checker, flags);
            result.id = typeCount++;
            return result;
        }

        function createIntrinsicType(kind: TypeFlags, intrinsicName: string): IntrinsicType {
            var type = <IntrinsicType>createType(kind);
            type.intrinsicName = intrinsicName;
            return type;
        }

        function createObjectType(kind: TypeFlags, symbol?: Symbol): ObjectType {
            var type = <ObjectType>createType(kind);
            type.symbol = symbol;
            return type;
        }

        // A reserved member name starts with two underscores followed by a non-underscore
        function isReservedMemberName(name: string) {
            return name.charCodeAt(0) === CharacterCodes._ && name.charCodeAt(1) === CharacterCodes._ && name.charCodeAt(2) !== CharacterCodes._;
        }

        function getNamedMembers(members: SymbolTable): Symbol[] {
            var result: Symbol[];
            for (var id in members) {
                if (hasProperty(members, id)) {
                    if (!isReservedMemberName(id)) {
                        if (!result) result = [];
                        var symbol = members[id];
                        if (symbolIsValue(symbol)) {
                            result.push(symbol);
                        }
                    }
                }
            }
            return result || emptyArray;
        }

        function setObjectTypeMembers(type: ObjectType, members: SymbolTable, callSignatures: Signature[], constructSignatures: Signature[], stringIndexType: Type, numberIndexType: Type): ResolvedType {
            (<ResolvedType>type).members = members;
            (<ResolvedType>type).properties = getNamedMembers(members);
            (<ResolvedType>type).callSignatures = callSignatures;
            (<ResolvedType>type).constructSignatures = constructSignatures;
            if (stringIndexType) (<ResolvedType>type).stringIndexType = stringIndexType;
            if (numberIndexType) (<ResolvedType>type).numberIndexType = numberIndexType;
            return <ResolvedType>type;
        }

        function createAnonymousType(symbol: Symbol, members: SymbolTable, callSignatures: Signature[], constructSignatures: Signature[], stringIndexType: Type, numberIndexType: Type): ResolvedType {
            return setObjectTypeMembers(createObjectType(TypeFlags.Anonymous, symbol),
                members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function forEachSymbolTableInScope<T>(enclosingDeclaration: Node, callback: (symbolTable: SymbolTable) => T): T {
            var result: T;
            for (var location = enclosingDeclaration; location; location = location.parent) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = callback(location.locals)) {
                        return result;
                    }
                }
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalModule(<SourceFile>location)) {
                            break;
                        }
                    case SyntaxKind.ModuleDeclaration:
                        if (result = callback(getSymbolOfNode(location).exports)) {
                            return result;
                        }
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        if (result = callback(getSymbolOfNode(location).members)) {
                            return result;
                        }
                        break;
                }
            }

            return callback(globals);
        }

        function getQualifiedLeftMeaning(rightMeaning: SymbolFlags) {
            // If we are looking in value space, the parent meaning is value, other wise it is namespace
            return rightMeaning === SymbolFlags.Value ? SymbolFlags.Value : SymbolFlags.Namespace;
        }

        function getAccessibleSymbolChain(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags, useOnlyExternalAliasing: boolean): Symbol[] {
            function getAccessibleSymbolChainFromSymbolTable(symbols: SymbolTable): Symbol[] {
                function canQualifySymbol(symbolFromSymbolTable: Symbol, meaning: SymbolFlags) {
                    // If the symbol is equivalent and doesn't need further qualification, this symbol is accessible
                    if (!needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning)) {
                        return true;
                    }

                    // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                    var accessibleParent = getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning), useOnlyExternalAliasing);
                    return !!accessibleParent;
                }

                function isAccessible(symbolFromSymbolTable: Symbol, resolvedAliasSymbol?: Symbol) {
                    if (symbol === (resolvedAliasSymbol || symbolFromSymbolTable)) {
                        // if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
                        // and if symbolfrom symbolTable or alias resolution matches the symbol, 
                        // check the symbol can be qualified, it is only then this symbol is accessible
                        return !forEach(symbolFromSymbolTable.declarations, hasExternalModuleSymbol) &&
                            canQualifySymbol(symbolFromSymbolTable, meaning);
                    }
                }

                // If symbol is directly available by its name in the symbol table
                if (isAccessible(lookUp(symbols, symbol.name))) {
                    return [symbol];
                }

                // Check if symbol is any of the alias
                return forEachValue(symbols, symbolFromSymbolTable => {
                    if (symbolFromSymbolTable.flags & SymbolFlags.Import) {
                        if (!useOnlyExternalAliasing || // We can use any type of alias to get the name
                            // Is this external alias, then use it to name
                            ts.forEach(symbolFromSymbolTable.declarations, isExternalModuleImportDeclaration)) {

                            var resolvedImportedSymbol = resolveImport(symbolFromSymbolTable);
                            if (isAccessible(symbolFromSymbolTable, resolveImport(symbolFromSymbolTable))) {
                                return [symbolFromSymbolTable];
                            }

                            // Look in the exported members, if we can find accessibleSymbolChain, symbol is accessible using this chain
                            // but only if the symbolFromSymbolTable can be qualified
                            var accessibleSymbolsFromExports = resolvedImportedSymbol.exports ? getAccessibleSymbolChainFromSymbolTable(resolvedImportedSymbol.exports) : undefined;
                            if (accessibleSymbolsFromExports && canQualifySymbol(symbolFromSymbolTable, getQualifiedLeftMeaning(meaning))) {
                                return [symbolFromSymbolTable].concat(accessibleSymbolsFromExports);
                            }
                        }
                    }
                });
            }

            if (symbol) {
                return forEachSymbolTableInScope(enclosingDeclaration, getAccessibleSymbolChainFromSymbolTable);
            }
        }

        function needsQualification(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags) {
            var qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, symbolTable => {
                // If symbol of this name is not available in the symbol table we are ok
                if (!hasProperty(symbolTable, symbol.name)) {
                    // Continue to the next symbol table
                    return false;
                }
                // If the symbol with this name is present it should refer to the symbol
                var symbolFromSymbolTable = symbolTable[symbol.name];
                if (symbolFromSymbolTable === symbol) {
                    // No need to qualify
                    return true;
                }

                // Qualify if the symbol from symbol table has same meaning as expected
                symbolFromSymbolTable = (symbolFromSymbolTable.flags & SymbolFlags.Import) ? resolveImport(symbolFromSymbolTable) : symbolFromSymbolTable;
                if (symbolFromSymbolTable.flags & meaning) {
                    qualify = true;
                    return true;
                }

                // Continue to the next symbol table
                return false;
            });

            return qualify;
        }

        function isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags): SymbolAccessiblityResult {
            if (symbol && enclosingDeclaration && !(symbol.flags & SymbolFlags.TypeParameter)) {
                var initialSymbol = symbol;
                var meaningToLook = meaning;
                while (symbol) {
                    // Symbol is accessible if it by itself is accessible
                    var accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaningToLook, /*useOnlyExternalAliasing*/ false);
                    if (accessibleSymbolChain) {
                        var hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0]);
                        if (!hasAccessibleDeclarations) {
                            return <SymbolAccessiblityResult>{
                                accessibility: SymbolAccessibility.NotAccessible,
                                errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                                errorModuleName: symbol !== initialSymbol ? symbolToString(symbol, enclosingDeclaration, SymbolFlags.Namespace) : undefined,
                            };
                        }
                        return hasAccessibleDeclarations;
                    }

                    // If we haven't got the accessible symbol, it doesn't mean the symbol is actually inaccessible.
                    // It could be a qualified symbol and hence verify the path
                    // e.g.:
                    // module m {
                    //     export class c {
                    //     }
                    // }
                    // var x: typeof m.c
                    // In the above example when we start with checking if typeof m.c symbol is accessible,
                    // we are going to see if c can be accessed in scope directly. 
                    // But it can't, hence the accessible is going to be undefined, but that doesn't mean m.c is inaccessible
                    // It is accessible if the parent m is accessible because then m.c can be accessed through qualification
                    meaningToLook = getQualifiedLeftMeaning(meaning);
                    symbol = getParentOfSymbol(symbol);
                }

                // This could be a symbol that is not exported in the external module 
                // or it could be a symbol from different external module that is not aliased and hence cannot be named
                var symbolExternalModule = forEach(initialSymbol.declarations, getExternalModuleContainer);
                if (symbolExternalModule) {
                    var enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
                    if (symbolExternalModule !== enclosingExternalModule) {
                        // name from different external module that is not visible
                        return {
                            accessibility: SymbolAccessibility.CannotBeNamed,
                            errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                            errorModuleName: symbolToString(symbolExternalModule)
                        };
                    }
                }

                // Just a local name that is not accessible
                return {
                    accessibility: SymbolAccessibility.NotAccessible,
                    errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                };
            }

            return { accessibility: SymbolAccessibility.Accessible };

            function getExternalModuleContainer(declaration: Node) {
                for (; declaration; declaration = declaration.parent) {
                    if (hasExternalModuleSymbol(declaration)) {
                        return getSymbolOfNode(declaration);
                    }
                }
            }
        }

        function hasExternalModuleSymbol(declaration: Node) {
            return (declaration.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>declaration).name.kind === SyntaxKind.StringLiteral) ||
                (declaration.kind === SyntaxKind.SourceFile && isExternalModule(<SourceFile>declaration));
        }

        function hasVisibleDeclarations(symbol: Symbol): SymbolVisibilityResult {
            var aliasesToMakeVisible: ImportDeclaration[];
            if (forEach(symbol.declarations, declaration => !getIsDeclarationVisible(declaration))) {
                return undefined;
            }
            return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible };

            function getIsDeclarationVisible(declaration: Declaration) {
                if (!isDeclarationVisible(declaration)) {
                    // Mark the unexported alias as visible if its parent is visible 
                    // because these kind of aliases can be used to name types in declaration file
                    if (declaration.kind === SyntaxKind.ImportDeclaration &&
                        !(declaration.flags & NodeFlags.Export) &&
                        isDeclarationVisible(<Declaration>declaration.parent)) {
                        getNodeLinks(declaration).isVisible = true;
                        if (aliasesToMakeVisible) {
                            if (!contains(aliasesToMakeVisible, declaration)) {
                                aliasesToMakeVisible.push(<ImportDeclaration>declaration);
                            }
                        }
                        else {
                            aliasesToMakeVisible = [<ImportDeclaration>declaration];
                        }
                        return true;
                    }

                    // Declaration is not visible
                    return false;
                }

                return true;
            }
        }

        function isEntityNameVisible(entityName: EntityName, enclosingDeclaration: Node): SymbolVisibilityResult {
            // get symbol of the first identifier of the entityName
            var meaning: SymbolFlags;
            if (entityName.parent.kind === SyntaxKind.TypeQuery) {
                // Typeof value
                meaning = SymbolFlags.Value | SymbolFlags.ExportValue;
            }
            else if (entityName.kind === SyntaxKind.QualifiedName ||
                entityName.parent.kind === SyntaxKind.ImportDeclaration) {
                // Left identifier from type reference or TypeAlias
                // Entity name of the import declaration 
                meaning = SymbolFlags.Namespace;
            }
            else {
                // Type Reference or TypeAlias entity = Identifier
                meaning = SymbolFlags.Type;
            }

            var firstIdentifier = getFirstIdentifier(entityName);
            var symbol = resolveName(enclosingDeclaration, (<Identifier>firstIdentifier).text, meaning, /*nodeNotFoundErrorMessage*/ undefined, /*nameArg*/ undefined);

            // Verify if the symbol is accessible
            return (symbol && hasVisibleDeclarations(symbol)) || <SymbolVisibilityResult>{
                accessibility: SymbolAccessibility.NotAccessible,
                errorSymbolName: getTextOfNode(firstIdentifier),
                errorNode: firstIdentifier
            };
        }

        function writeKeyword(writer: SymbolWriter, kind: SyntaxKind) {
            writer.writeKeyword(tokenToString(kind));
        }

        function writePunctuation(writer: SymbolWriter, kind: SyntaxKind) {
            writer.writePunctuation(tokenToString(kind));
        }

        function writeSpace(writer: SymbolWriter) {
            writer.writeSpace(" ");
        }

        function symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string {
            var writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning);

            var result = writer.string();
            releaseStringWriter(writer);

            return result;
        }

        function typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string {
            var writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);

            var result = writer.string();
            releaseStringWriter(writer);

            var maxLength = compilerOptions.noErrorTruncation || flags & TypeFormatFlags.NoTruncation ? undefined : 100;
            if (maxLength && result.length >= maxLength) {
                result = result.substr(0, maxLength - "...".length) + "...";
            }

            return result;
        }

        function getTypeAliasForTypeLiteral(type: Type): Symbol {
            if (type.symbol && type.symbol.flags & SymbolFlags.TypeLiteral) {
                var node = type.symbol.declarations[0].parent;
                while (node.kind === SyntaxKind.ParenthesizedType) {
                    node = node.parent;
                }
                if (node.kind === SyntaxKind.TypeAliasDeclaration) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }

        // This is for caching the result of getSymbolDisplayBuilder. Do not access directly.
        var _displayBuilder: SymbolDisplayBuilder;
        function getSymbolDisplayBuilder(): SymbolDisplayBuilder {
            /**
             * Writes only the name of the symbol out to the writer. Uses the original source text
             * for the name of the symbol if it is available to match how the user inputted the name.
             */
            function appendSymbolNameOnly(symbol: Symbol, writer: SymbolWriter): void {
                if (symbol.declarations && symbol.declarations.length > 0) {
                    var declaration = symbol.declarations[0];
                    if (declaration.name) {
                        writer.writeSymbol(declarationNameToString(declaration.name), symbol);
                        return;
                    }
                }

                writer.writeSymbol(symbol.name, symbol);
            }

            /**
             * Enclosing declaration is optional when we don't want to get qualified name in the enclosing declaration scope
             * Meaning needs to be specified if the enclosing declaration is given
             */
            function buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags, typeFlags?: TypeFormatFlags): void {
                var parentSymbol: Symbol;
                function appendParentTypeArgumentsAndSymbolName(symbol: Symbol): void {
                    if (parentSymbol) {
                        // Write type arguments of instantiated class/interface here
                        if (flags & SymbolFormatFlags.WriteTypeParametersOrArguments) {
                            if (symbol.flags & SymbolFlags.Instantiated) {
                                buildDisplayForTypeArgumentsAndDelimiters(getTypeParametersOfClassOrInterface(parentSymbol),
                                    (<TransientSymbol>symbol).mapper, writer, enclosingDeclaration);
                            }
                            else {
                                buildTypeParameterDisplayFromSymbol(parentSymbol, writer, enclosingDeclaration);
                            }
                        }
                        writePunctuation(writer, SyntaxKind.DotToken);
                    }
                    parentSymbol = symbol;
                    appendSymbolNameOnly(symbol, writer);
                }

                // Let the writer know we just wrote out a symbol.  The declaration emitter writer uses 
                // this to determine if an import it has previously seen (and not written out) needs 
                // to be written to the file once the walk of the tree is complete.
                //
                // NOTE(cyrusn): This approach feels somewhat unfortunate.  A simple pass over the tree
                // up front (for example, during checking) could determine if we need to emit the imports
                // and we could then access that data during declaration emit.
                writer.trackSymbol(symbol, enclosingDeclaration, meaning);
                function walkSymbol(symbol: Symbol, meaning: SymbolFlags): void {
                    if (symbol) {
                        var accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, !!(flags & SymbolFormatFlags.UseOnlyExternalAliasing));

                        if (!accessibleSymbolChain ||
                            needsQualification(accessibleSymbolChain[0], enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {

                            // Go up and add our parent.
                            walkSymbol(
                                getParentOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol),
                                getQualifiedLeftMeaning(meaning));
                        }

                        if (accessibleSymbolChain) {
                            for (var i = 0, n = accessibleSymbolChain.length; i < n; i++) {
                                appendParentTypeArgumentsAndSymbolName(accessibleSymbolChain[i]);
                            }
                        }
                        else {
                            // If we didn't find accessible symbol chain for this symbol, break if this is external module
                            if (!parentSymbol && ts.forEach(symbol.declarations, hasExternalModuleSymbol)) {
                                return;
                            }

                            // if this is anonymous type break
                            if (symbol.flags & SymbolFlags.TypeLiteral || symbol.flags & SymbolFlags.ObjectLiteral) {
                                return;
                            }

                            appendParentTypeArgumentsAndSymbolName(symbol);
                        }
                    }
                }

                // Get qualified name if the symbol is not a type parameter
                // and there is an enclosing declaration or we specifically
                // asked for it
                var isTypeParameter = symbol.flags & SymbolFlags.TypeParameter;
                var typeFormatFlag = TypeFormatFlags.UseFullyQualifiedType & typeFlags;
                if (!isTypeParameter && (enclosingDeclaration || typeFormatFlag)) {
                    walkSymbol(symbol, meaning);
                    return;
                }

                return appendParentTypeArgumentsAndSymbolName(symbol);
            }

            function buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, globalFlags?: TypeFormatFlags, typeStack?: Type[]) {
                var globalFlagsToPass = globalFlags & TypeFormatFlags.WriteOwnNameForAnyLike;
                return writeType(type, globalFlags);

                function writeType(type: Type, flags: TypeFormatFlags) {
                    // Write undefined/null type as any
                    if (type.flags & TypeFlags.Intrinsic) {
                        // Special handling for unknown / resolving types, they should show up as any and not unknown or __resolving
                        writer.writeKeyword(!(globalFlags & TypeFormatFlags.WriteOwnNameForAnyLike) &&
                            (type.flags & TypeFlags.Any) ? "any" : (<IntrinsicType>type).intrinsicName);
                    }
                    else if (type.flags & TypeFlags.Reference) {
                        writeTypeReference(<TypeReference>type, flags);
                    }
                    else if (type.flags & (TypeFlags.Class | TypeFlags.Interface | TypeFlags.Enum | TypeFlags.TypeParameter)) {
                        // The specified symbol flags need to be reinterpreted as type flags
                        buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, SymbolFlags.Type, SymbolFormatFlags.None, flags);
                    }
                    else if (type.flags & TypeFlags.Tuple) {
                        writeTupleType(<TupleType>type);
                    }
                    else if (type.flags & TypeFlags.Union) {
                        writeUnionType(<UnionType>type, flags);
                    }
                    else if (type.flags & TypeFlags.Anonymous) {
                        writeAnonymousType(<ObjectType>type, flags);
                    }
                    else if (type.flags & TypeFlags.StringLiteral) {
                        writer.writeStringLiteral((<StringLiteralType>type).text);
                    }
                    else {
                        // Should never get here
                        // { ... }
                        writePunctuation(writer, SyntaxKind.OpenBraceToken);
                        writeSpace(writer);
                        writePunctuation(writer, SyntaxKind.DotDotDotToken);
                        writeSpace(writer);
                        writePunctuation(writer, SyntaxKind.CloseBraceToken);
                    }
                }

                function writeTypeList(types: Type[], union: boolean) {
                    for (var i = 0; i < types.length; i++) {
                        if (i > 0) {
                            if (union) {
                                writeSpace(writer);
                            }
                            writePunctuation(writer, union ? SyntaxKind.BarToken : SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        writeType(types[i], union ? TypeFormatFlags.InElementType : TypeFormatFlags.None);
                    }
                }

                function writeTypeReference(type: TypeReference, flags: TypeFormatFlags) {
                    if (type.target === globalArrayType && !(flags & TypeFormatFlags.WriteArrayAsGenericType)) {
                        writeType(type.typeArguments[0], TypeFormatFlags.InElementType);
                        writePunctuation(writer, SyntaxKind.OpenBracketToken);
                        writePunctuation(writer, SyntaxKind.CloseBracketToken);
                    }
                    else {
                        buildSymbolDisplay(type.target.symbol, writer, enclosingDeclaration, SymbolFlags.Type);
                        writePunctuation(writer, SyntaxKind.LessThanToken);
                        writeTypeList(type.typeArguments, /*union*/ false);
                        writePunctuation(writer, SyntaxKind.GreaterThanToken);
                    }
                }

                function writeTupleType(type: TupleType) {
                    writePunctuation(writer, SyntaxKind.OpenBracketToken);
                    writeTypeList(type.elementTypes, /*union*/ false);
                    writePunctuation(writer, SyntaxKind.CloseBracketToken);
                }

                function writeUnionType(type: UnionType, flags: TypeFormatFlags) {
                    if (flags & TypeFormatFlags.InElementType) {
                        writePunctuation(writer, SyntaxKind.OpenParenToken);
                    }
                    writeTypeList(type.types, /*union*/ true);
                    if (flags & TypeFormatFlags.InElementType) {
                        writePunctuation(writer, SyntaxKind.CloseParenToken);
                    }
                }

                function writeAnonymousType(type: ObjectType, flags: TypeFormatFlags) {
                    // Always use 'typeof T' for type of class, enum, and module objects
                    if (type.symbol && type.symbol.flags & (SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule)) {
                        writeTypeofSymbol(type, flags);
                    }
                    // Use 'typeof T' for types of functions and methods that circularly reference themselves
                    else if (shouldWriteTypeOfFunctionSymbol()) {
                        writeTypeofSymbol(type, flags);
                    }
                    else if (typeStack && contains(typeStack, type)) {
                        // If type is an anonymous type literal in a type alias declaration, use type alias name
                        var typeAlias = getTypeAliasForTypeLiteral(type);
                        if (typeAlias) {
                            // The specified symbol flags need to be reinterpreted as type flags
                            buildSymbolDisplay(typeAlias, writer, enclosingDeclaration, SymbolFlags.Type, SymbolFormatFlags.None, flags);
                        }
                        else {
                            // Recursive usage, use any
                            writeKeyword(writer, SyntaxKind.AnyKeyword);
                        }
                    }
                    else {
                        if (!typeStack) {
                            typeStack = [];
                        }
                        typeStack.push(type);
                        writeLiteralType(type, flags);
                        typeStack.pop();
                    }

                    function shouldWriteTypeOfFunctionSymbol() {
                        if (type.symbol) {
                            var isStaticMethodSymbol = !!(type.symbol.flags & SymbolFlags.Method &&  // typeof static method
                                ts.forEach(type.symbol.declarations, declaration => declaration.flags & NodeFlags.Static));
                            var isNonLocalFunctionSymbol = !!(type.symbol.flags & SymbolFlags.Function) &&
                                (type.symbol.parent || // is exported function symbol
                                    ts.forEach(type.symbol.declarations, declaration =>
                                        declaration.parent.kind === SyntaxKind.SourceFile || declaration.parent.kind === SyntaxKind.ModuleBlock));

                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                // typeof is allowed only for static/non local functions
                                return !!(flags & TypeFormatFlags.UseTypeOfFunction) || // use typeof if format flags specify it
                                    (typeStack && contains(typeStack, type)); // it is type of the symbol uses itself recursively
                            }
                        }
                    }
                }

                function writeTypeofSymbol(type: ObjectType, typeFormatFlags?: TypeFormatFlags) {
                    writeKeyword(writer, SyntaxKind.TypeOfKeyword);
                    writeSpace(writer);
                    buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, SymbolFlags.Value, SymbolFormatFlags.None, typeFormatFlags);
                }

                function getIndexerParameterName(type: ObjectType, indexKind: IndexKind, fallbackName: string): string {
                    var declaration = <SignatureDeclaration>getIndexDeclarationOfSymbol(type.symbol, indexKind);
                    if (!declaration) {
                        // declaration might not be found if indexer was added from the contextual type.
                        // in this case use fallback name
                        return fallbackName;
                    }
                    Debug.assert(declaration.parameters.length !== 0);
                    return declarationNameToString(declaration.parameters[0].name);
                }

                function writeLiteralType(type: ObjectType, flags: TypeFormatFlags) {
                    var resolved = resolveObjectOrUnionTypeMembers(type);
                    if (!resolved.properties.length && !resolved.stringIndexType && !resolved.numberIndexType) {
                        if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                            writePunctuation(writer, SyntaxKind.OpenBraceToken);
                            writePunctuation(writer, SyntaxKind.CloseBraceToken);
                            return;
                        }

                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.OpenParenToken);
                            }
                            buildSignatureDisplay(resolved.callSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | TypeFormatFlags.WriteArrowStyleSignature, typeStack);
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.OpenParenToken);
                            }
                            writeKeyword(writer, SyntaxKind.NewKeyword);
                            writeSpace(writer);
                            buildSignatureDisplay(resolved.constructSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | TypeFormatFlags.WriteArrowStyleSignature, typeStack);
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                    }

                    writePunctuation(writer, SyntaxKind.OpenBraceToken);
                    writer.writeLine();
                    writer.increaseIndent();
                    for (var i = 0; i < resolved.callSignatures.length; i++) {
                        buildSignatureDisplay(resolved.callSignatures[i], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    for (var i = 0; i < resolved.constructSignatures.length; i++) {
                        writeKeyword(writer, SyntaxKind.NewKeyword);
                        writeSpace(writer);

                        buildSignatureDisplay(resolved.constructSignatures[i], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    if (resolved.stringIndexType) {
                        // [x: string]: 
                        writePunctuation(writer, SyntaxKind.OpenBracketToken);
                        writer.writeParameter(getIndexerParameterName(resolved, IndexKind.String, /*fallbackName*/"x"));
                        writePunctuation(writer, SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeKeyword(writer, SyntaxKind.StringKeyword);
                        writePunctuation(writer, SyntaxKind.CloseBracketToken);
                        writePunctuation(writer, SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeType(resolved.stringIndexType, TypeFormatFlags.None);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    if (resolved.numberIndexType) {
                        // [x: number]: 
                        writePunctuation(writer, SyntaxKind.OpenBracketToken);
                        writer.writeParameter(getIndexerParameterName(resolved, IndexKind.Number, /*fallbackName*/"x"));
                        writePunctuation(writer, SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeKeyword(writer, SyntaxKind.NumberKeyword);
                        writePunctuation(writer, SyntaxKind.CloseBracketToken);
                        writePunctuation(writer, SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeType(resolved.numberIndexType, TypeFormatFlags.None);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    for (var i = 0; i < resolved.properties.length; i++) {
                        var p = resolved.properties[i];
                        var t = getTypeOfSymbol(p);
                        if (p.flags & (SymbolFlags.Function | SymbolFlags.Method) && !getPropertiesOfObjectType(t).length) {
                            var signatures = getSignaturesOfType(t, SignatureKind.Call);
                            for (var j = 0; j < signatures.length; j++) {
                                buildSymbolDisplay(p, writer);
                                if (p.flags & SymbolFlags.Optional) {
                                    writePunctuation(writer, SyntaxKind.QuestionToken);
                                }
                                buildSignatureDisplay(signatures[j], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                                writePunctuation(writer, SyntaxKind.SemicolonToken);
                                writer.writeLine();
                            }
                        }
                        else {
                            buildSymbolDisplay(p, writer);
                            if (p.flags & SymbolFlags.Optional) {
                                writePunctuation(writer, SyntaxKind.QuestionToken);
                            }
                            writePunctuation(writer, SyntaxKind.ColonToken);
                            writeSpace(writer);
                            writeType(t, TypeFormatFlags.None);
                            writePunctuation(writer, SyntaxKind.SemicolonToken);
                            writer.writeLine();
                        }
                    }
                    writer.decreaseIndent();
                    writePunctuation(writer, SyntaxKind.CloseBraceToken);
                }
            }

            function buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaraiton?: Node, flags?: TypeFormatFlags) {
                var targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & SymbolFlags.Class || targetSymbol.flags & SymbolFlags.Interface) {
                    buildDisplayForTypeParametersAndDelimiters(getTypeParametersOfClassOrInterface(symbol), writer, enclosingDeclaraiton, flags);
                }
            }

            function buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                appendSymbolNameOnly(tp.symbol, writer);
                var constraint = getConstraintOfTypeParameter(tp);
                if (constraint) {
                    writeSpace(writer);
                    writeKeyword(writer, SyntaxKind.ExtendsKeyword);
                    writeSpace(writer);
                    buildTypeDisplay(constraint, writer, enclosingDeclaration, flags, typeStack);
                }
            }

            function buildParameterDisplay(p: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                if (hasDotDotDotToken(p.valueDeclaration)) {
                    writePunctuation(writer, SyntaxKind.DotDotDotToken);
                }
                appendSymbolNameOnly(p, writer);
                if (hasQuestionToken(p.valueDeclaration) || (<ParameterDeclaration>p.valueDeclaration).initializer) {
                    writePunctuation(writer, SyntaxKind.QuestionToken);
                }
                writePunctuation(writer, SyntaxKind.ColonToken);
                writeSpace(writer);

                buildTypeDisplay(getTypeOfSymbol(p), writer, enclosingDeclaration, flags, typeStack);
            }

            function buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, SyntaxKind.LessThanToken);
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        buildTypeParameterDisplay(typeParameters[i], writer, enclosingDeclaration, flags, typeStack);
                    }
                    writePunctuation(writer, SyntaxKind.GreaterThanToken);
                }
            }

            function buildDisplayForTypeArgumentsAndDelimiters(typeParameters: TypeParameter[], mapper: TypeMapper, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, SyntaxKind.LessThanToken);
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        buildTypeDisplay(mapper(typeParameters[i]), writer, enclosingDeclaration, TypeFormatFlags.None);
                    }
                    writePunctuation(writer, SyntaxKind.GreaterThanToken);
                }
            }

            function buildDisplayForParametersAndDelimiters(parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                writePunctuation(writer, SyntaxKind.OpenParenToken);
                for (var i = 0; i < parameters.length; i++) {
                    if (i > 0) {
                        writePunctuation(writer, SyntaxKind.CommaToken);
                        writeSpace(writer);
                    }
                    buildParameterDisplay(parameters[i], writer, enclosingDeclaration, flags, typeStack);
                }
                writePunctuation(writer, SyntaxKind.CloseParenToken);
            }

            function buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                if (flags & TypeFormatFlags.WriteArrowStyleSignature) {
                    writeSpace(writer);
                    writePunctuation(writer, SyntaxKind.EqualsGreaterThanToken);
                }
                else {
                    writePunctuation(writer, SyntaxKind.ColonToken);
                }
                writeSpace(writer);
                buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags, typeStack);
            }

            function buildSignatureDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, typeStack?: Type[]) {
                if (signature.target && (flags & TypeFormatFlags.WriteTypeArgumentsOfSignature)) {
                    // Instantiated signature, write type arguments instead
                    // This is achieved by passing in the mapper separately
                    buildDisplayForTypeArgumentsAndDelimiters(signature.target.typeParameters, signature.mapper, writer, enclosingDeclaration);
                }
                else {
                    buildDisplayForTypeParametersAndDelimiters(signature.typeParameters, writer, enclosingDeclaration, flags, typeStack);
                }

                buildDisplayForParametersAndDelimiters(signature.parameters, writer, enclosingDeclaration, flags, typeStack);
                buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, typeStack);
            }

            return _displayBuilder || (_displayBuilder = {
                symbolToString: symbolToString,
                typeToString: typeToString,
                buildSymbolDisplay: buildSymbolDisplay,
                buildTypeDisplay: buildTypeDisplay,
                buildTypeParameterDisplay: buildTypeParameterDisplay,
                buildParameterDisplay: buildParameterDisplay,
                buildDisplayForParametersAndDelimiters: buildDisplayForParametersAndDelimiters,
                buildDisplayForTypeParametersAndDelimiters: buildDisplayForTypeParametersAndDelimiters,
                buildDisplayForTypeArgumentsAndDelimiters: buildDisplayForTypeArgumentsAndDelimiters,
                buildTypeParameterDisplayFromSymbol: buildTypeParameterDisplayFromSymbol,
                buildSignatureDisplay: buildSignatureDisplay,
                buildReturnTypeDisplay: buildReturnTypeDisplay
            });
        }

        function isDeclarationVisible(node: Declaration): boolean {
            function getContainingExternalModule(node: Node) {
                for (; node; node = node.parent) {
                    if (node.kind === SyntaxKind.ModuleDeclaration) {
                        if ((<ModuleDeclaration>node).name.kind === SyntaxKind.StringLiteral) {
                            return node;
                        }
                    }
                    else if (node.kind === SyntaxKind.SourceFile) {
                        return isExternalModule(<SourceFile>node) ? node : undefined;
                    }
                }
                Debug.fail("getContainingModule cant reach here");
            }

            function isUsedInExportAssignment(node: Node) {
                // Get source File and see if it is external module and has export assigned symbol
                var externalModule = getContainingExternalModule(node);
                if (externalModule) {
                    // This is export assigned symbol node
                    var externalModuleSymbol = getSymbolOfNode(externalModule);
                    var exportAssignmentSymbol = getExportAssignmentSymbol(externalModuleSymbol);
                    var resolvedExportSymbol: Symbol;
                    var symbolOfNode = getSymbolOfNode(node);
                    if (isSymbolUsedInExportAssignment(symbolOfNode)) {
                        return true;
                    }

                    // if symbolOfNode is import declaration, resolve the symbol declaration and check
                    if (symbolOfNode.flags & SymbolFlags.Import) {
                        return isSymbolUsedInExportAssignment(resolveImport(symbolOfNode));
                    }
                }

                // Check if the symbol is used in export assignment
                function isSymbolUsedInExportAssignment(symbol: Symbol) {
                    if (exportAssignmentSymbol === symbol) {
                        return true;
                    }

                    if (exportAssignmentSymbol && !!(exportAssignmentSymbol.flags & SymbolFlags.Import)) {
                        // if export assigned symbol is import declaration, resolve the import
                        resolvedExportSymbol = resolvedExportSymbol || resolveImport(exportAssignmentSymbol);
                        if (resolvedExportSymbol === symbol) {
                            return true;
                        }

                        // Container of resolvedExportSymbol is visible
                        return forEach(resolvedExportSymbol.declarations, (current: Node) => {
                            while (current) {
                                if (current === node) {
                                    return true;
                                }
                                current = current.parent;
                            }
                        });
                    }
                }
            }

            function determineIfDeclarationIsVisible() {
                switch (node.kind) {
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.BindingElement:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ImportDeclaration:
                        var parent = getDeclarationContainer(node);
                        // If the node is not exported or it is not ambient module element (except import declaration)
                        if (!(getCombinedNodeFlags(node) & NodeFlags.Export) &&
                            !(node.kind !== SyntaxKind.ImportDeclaration && parent.kind !== SyntaxKind.SourceFile && isInAmbientContext(parent))) {
                            return isGlobalSourceFile(parent) || isUsedInExportAssignment(node);
                        }
                        // Exported members/ambient module elements (exception import declaration) are visible if parent is visible
                        return isDeclarationVisible(<Declaration>parent);

                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (node.flags & (NodeFlags.Private | NodeFlags.Protected)) {
                            // Private/protected properties/methods are not visible
                            return false;
                        }
                    // Public properties/methods are visible if its parents are visible, so let it fall into next case statement

                    case SyntaxKind.Constructor:
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.Parameter:
                    case SyntaxKind.ModuleBlock:
                    case SyntaxKind.FunctionType:
                    case SyntaxKind.ConstructorType:
                    case SyntaxKind.TypeLiteral:
                    case SyntaxKind.TypeReference:
                    case SyntaxKind.ArrayType:
                    case SyntaxKind.TupleType:
                    case SyntaxKind.UnionType:
                    case SyntaxKind.ParenthesizedType:
                        return isDeclarationVisible(<Declaration>node.parent);
                    
                    // Type parameters are always visible
                    case SyntaxKind.TypeParameter:
                    // Source file is always visible
                    case SyntaxKind.SourceFile:
                        return true;

                    default:
                        Debug.fail("isDeclarationVisible unknown: SyntaxKind: " + node.kind);
                }
            }

            if (node) {
                var links = getNodeLinks(node);
                if (links.isVisible === undefined) {
                    links.isVisible = !!determineIfDeclarationIsVisible();
                }
                return links.isVisible;
            }
        }

        function getRootDeclaration(node: Node): Node {
            while (node.kind === SyntaxKind.BindingElement) {
                node = node.parent.parent;
            }
            return node;
        }

        function getDeclarationContainer(node: Node): Node {
            node = getRootDeclaration(node);

            // Parent chain: 
            // VaribleDeclaration -> VariableDeclarationList -> VariableStatement -> 'Declaration Container'
            return node.kind === SyntaxKind.VariableDeclaration ? node.parent.parent.parent : node.parent;
        }

        function getTypeOfPrototypeProperty(prototype: Symbol): Type {
            // TypeScript 1.0 spec (April 2014): 8.4
            // Every class automatically contains a static property member named 'prototype', 
            // the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
            // It is an error to explicitly declare a static property member with the name 'prototype'.
            var classType = <InterfaceType>getDeclaredTypeOfSymbol(prototype.parent);
            return classType.typeParameters ? createTypeReference(<GenericType>classType, map(classType.typeParameters, _ => anyType)) : classType;
        }

        // Return the type of the given property in the given type, or undefined if no such property exists
        function getTypeOfPropertyOfType(type: Type, name: string): Type {
            var prop = getPropertyOfType(type, name);
            return prop ? getTypeOfSymbol(prop) : undefined;
        }

        // Return the inferred type for a binding element
        function getTypeForBindingElement(declaration: BindingElement): Type {
            var pattern = <BindingPattern>declaration.parent;
            var parentType = getTypeForVariableLikeDeclaration(<VariableLikeDeclaration>pattern.parent);
            // If parent has the unknown (error) type, then so does this binding element
            if (parentType === unknownType) {
                return unknownType;
            }
            // If no type was specified or inferred for parent, or if the specified or inferred type is any,
            // infer from the initializer of the binding element if one is present. Otherwise, go with the
            // undefined or any type of the parent.
            if (!parentType || parentType === anyType) {
                if (declaration.initializer) {
                    return checkExpressionCached(declaration.initializer);
                }
                return parentType;
            }
            if (pattern.kind === SyntaxKind.ObjectBindingPattern) {
                // Use explicitly specified property name ({ p: xxx } form), or otherwise the implied name ({ p } form)
                var name = declaration.propertyName || <Identifier>declaration.name;
                // Use type of the specified property, or otherwise, for a numeric name, the type of the numeric index signature,
                // or otherwise the type of the string index signature.
                var type = getTypeOfPropertyOfType(parentType, name.text) ||
                    isNumericLiteralName(name.text) && getIndexTypeOfType(parentType, IndexKind.Number) ||
                    getIndexTypeOfType(parentType, IndexKind.String);
                if (!type) {
                    error(name, Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(parentType), declarationNameToString(name));
                    return unknownType;
                }
            }
            else {
                // For an array binding element the specified or inferred type of the parent must be assignable to any[]
                if (!isTypeAssignableTo(parentType, anyArrayType)) {
                    error(pattern, Diagnostics.Type_0_is_not_an_array_type, typeToString(parentType));
                    return unknownType;
                }
                if (!declaration.dotDotDotToken) {
                    // Use specific property type when parent is a tuple or numeric index type when parent is an array
                    var propName = "" + indexOf(pattern.elements, declaration);
                    var type = isTupleLikeType(parentType) ? getTypeOfPropertyOfType(parentType, propName) : getIndexTypeOfType(parentType, IndexKind.Number);
                    if (!type) {
                        error(declaration, Diagnostics.Type_0_has_no_property_1, typeToString(parentType), propName);
                        return unknownType;
                    }
                }
                else {
                    // Rest element has an array type with the same element type as the parent type
                    var type = createArrayType(getIndexTypeOfType(parentType, IndexKind.Number));
                }
            }
            return type;
        }

        // Return the inferred type for a variable, parameter, or property declaration
        function getTypeForVariableLikeDeclaration(declaration: VariableLikeDeclaration): Type {
            // A variable declared in a for..in statement is always of type any
            if (declaration.parent.parent.kind === SyntaxKind.ForInStatement) {
                return anyType;
            }
            if (isBindingPattern(declaration.parent)) {
                return getTypeForBindingElement(<BindingElement>declaration);
            }
            // Use type from type annotation if one is present
            if (declaration.type) {
                return getTypeFromTypeNode(declaration.type);
            }
            if (declaration.kind === SyntaxKind.Parameter) {
                var func = <FunctionLikeDeclaration>declaration.parent;
                // For a parameter of a set accessor, use the type of the get accessor if one is present
                if (func.kind === SyntaxKind.SetAccessor && !hasDynamicName(func)) {
                    var getter = <AccessorDeclaration>getDeclarationOfKind(declaration.parent.symbol, SyntaxKind.GetAccessor);
                    if (getter) {
                        return getReturnTypeOfSignature(getSignatureFromDeclaration(getter));
                    }
                }
                // Use contextual parameter type if one is available
                var type = getContextuallyTypedParameterType(<ParameterDeclaration>declaration);
                if (type) {
                    return type;
                }
            }
            // Use the type of the initializer expression if one is present
            if (declaration.initializer) {
                return checkExpressionCached(declaration.initializer);
            }
            // If it is a short-hand property assignment, use the type of the identifier
            if (declaration.kind === SyntaxKind.ShorthandPropertyAssignment) {
                return checkIdentifier(<Identifier>declaration.name);
            }
            // No type specified and nothing can be inferred
            return undefined;
        }

        // Return the type implied by a binding pattern element. This is the type of the initializer of the element if
        // one is present. Otherwise, if the element is itself a binding pattern, it is the type implied by the binding
        // pattern. Otherwise, it is the type any.
        function getTypeFromBindingElement(element: BindingElement): Type {
            if (element.initializer) {
                return getWidenedType(checkExpressionCached(element.initializer));
            }
            if (isBindingPattern(element.name)) {
                return getTypeFromBindingPattern(<BindingPattern>element.name);
            }
            return anyType;
        }

        // Return the type implied by an object binding pattern
        function getTypeFromObjectBindingPattern(pattern: BindingPattern): Type {
            var members: SymbolTable = {};
            forEach(pattern.elements, e => {
                var flags = SymbolFlags.Property | SymbolFlags.Transient | (e.initializer ? SymbolFlags.Optional : 0);
                var name = e.propertyName || <Identifier>e.name;
                var symbol = <TransientSymbol>createSymbol(flags, name.text);
                symbol.type = getTypeFromBindingElement(e);
                members[symbol.name] = symbol;
            });
            return createAnonymousType(undefined, members, emptyArray, emptyArray, undefined, undefined);
        }

        // Return the type implied by an array binding pattern
        function getTypeFromArrayBindingPattern(pattern: BindingPattern): Type {
            var hasSpreadElement: boolean = false;
            var elementTypes: Type[] = [];
            forEach(pattern.elements, e => {
                elementTypes.push(e.kind === SyntaxKind.OmittedExpression || e.dotDotDotToken ? anyType : getTypeFromBindingElement(e));
                if (e.dotDotDotToken) {
                    hasSpreadElement = true;
                }
            });
            return !elementTypes.length ? anyArrayType : hasSpreadElement ? createArrayType(getUnionType(elementTypes)) : createTupleType(elementTypes);
        }

        // Return the type implied by a binding pattern. This is the type implied purely by the binding pattern itself
        // and without regard to its context (i.e. without regard any type annotation or initializer associated with the
        // declaration in which the binding pattern is contained). For example, the implied type of [x, y] is [any, any]
        // and the implied type of { x, y: z = 1 } is { x: any; y: number; }. The type implied by a binding pattern is
        // used as the contextual type of an initializer associated with the binding pattern. Also, for a destructuring
        // parameter with no type annotation or initializer, the type implied by the binding pattern becomes the type of
        // the parameter.
        function getTypeFromBindingPattern(pattern: BindingPattern): Type {
            return pattern.kind === SyntaxKind.ObjectBindingPattern
                ? getTypeFromObjectBindingPattern(pattern)
                : getTypeFromArrayBindingPattern(pattern);
        }

        // Return the type associated with a variable, parameter, or property declaration. In the simple case this is the type
        // specified in a type annotation or inferred from an initializer. However, in the case of a destructuring declaration it
        // is a bit more involved. For example:
        //
        //   var [x, s = ""] = [1, "one"];
        //
        // Here, the array literal [1, "one"] is contextually typed by the type [any, string], which is the implied type of the
        // binding pattern [x, s = ""]. Because the contextual type is a tuple type, the resulting type of [1, "one"] is the
        // tuple type [number, string]. Thus, the type inferred for 'x' is number and the type inferred for 's' is string.
        function getWidenedTypeForVariableLikeDeclaration(declaration: VariableLikeDeclaration, reportErrors?: boolean): Type {
            var type = getTypeForVariableLikeDeclaration(declaration);
            if (type) {
                if (reportErrors) {
                    reportErrorsFromWidening(declaration, type);
                }
                // During a normal type check we'll never get to here with a property assignment (the check of the containing
                // object literal uses a different path). We exclude widening only so that language services and type verification
                // tools see the actual type.
                return declaration.kind !== SyntaxKind.PropertyAssignment ? getWidenedType(type) : type;
            }
            // If no type was specified and nothing could be inferred, and if the declaration specifies a binding pattern, use
            // the type implied by the binding pattern
            if (isBindingPattern(declaration.name)) {
                return getTypeFromBindingPattern(<BindingPattern>declaration.name);
            }
            // Rest parameters default to type any[], other parameters default to type any
            type = declaration.dotDotDotToken ? anyArrayType : anyType;
            // Report implicit any errors unless this is a private property within an ambient declaration
            if (reportErrors && compilerOptions.noImplicitAny) {
                var root = getRootDeclaration(declaration);
                if (!isPrivateWithinAmbient(root) && !(root.kind === SyntaxKind.Parameter && isPrivateWithinAmbient(root.parent))) {
                    reportImplicitAnyError(declaration, type);
                }
            }
            return type;
        }

        function getTypeOfVariableOrParameterOrProperty(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                // Handle prototype property
                if (symbol.flags & SymbolFlags.Prototype) {
                    return links.type = getTypeOfPrototypeProperty(symbol);
                }
                // Handle catch clause variables
                var declaration = symbol.valueDeclaration;
                if (declaration.kind === SyntaxKind.CatchClause) {
                    return links.type = anyType;
                }
                // Handle variable, parameter or property
                links.type = resolvingType;
                var type = getWidenedTypeForVariableLikeDeclaration(<VariableLikeDeclaration>declaration, /*reportErrors*/ true);
                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    var diagnostic = (<VariableLikeDeclaration>symbol.valueDeclaration).type ?
                        Diagnostics._0_implicitly_has_type_any_because_it_is_referenced_directly_or_indirectly_in_its_own_type_annotation :
                        Diagnostics._0_implicitly_has_type_any_because_it_is_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer;
                    error(symbol.valueDeclaration, diagnostic, symbolToString(symbol));
                }
            }
            return links.type;
        }

        function getSetAccessorTypeAnnotationNode(accessor: AccessorDeclaration): TypeNode | LiteralExpression {
            return accessor && accessor.parameters.length > 0 && accessor.parameters[0].type;
        }

        function getAnnotatedAccessorType(accessor: AccessorDeclaration): Type {
            if (accessor) {
                if (accessor.kind === SyntaxKind.GetAccessor) {
                    return accessor.type && getTypeFromTypeNode(accessor.type);
                }
                else {
                    var setterTypeAnnotation = getSetAccessorTypeAnnotationNode(accessor);
                    return setterTypeAnnotation && getTypeFromTypeNode(setterTypeAnnotation);
                }
            }
            return undefined;
        }

        function getTypeOfAccessors(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            checkAndStoreTypeOfAccessors(symbol, links);
            return links.type;
        }

        function checkAndStoreTypeOfAccessors(symbol: Symbol, links?: SymbolLinks) {
            links = links || getSymbolLinks(symbol);
            if (!links.type) {
                links.type = resolvingType;
                var getter = <AccessorDeclaration>getDeclarationOfKind(symbol, SyntaxKind.GetAccessor);
                var setter = <AccessorDeclaration>getDeclarationOfKind(symbol, SyntaxKind.SetAccessor);

                var type: Type;

                // First try to see if the user specified a return type on the get-accessor.
                var getterReturnType = getAnnotatedAccessorType(getter);
                if (getterReturnType) {
                    type = getterReturnType;
                }
                else {
                    // If the user didn't specify a return type, try to use the set-accessor's parameter type.
                    var setterParameterType = getAnnotatedAccessorType(setter);
                    if (setterParameterType) {
                        type = setterParameterType;
                    }
                    else {
                        // If there are no specified types, try to infer it from the body of the get accessor if it exists.
                        if (getter && getter.body) {
                            type = getReturnTypeFromBody(getter);
                        }
                        // Otherwise, fall back to 'any'.
                        else {
                            if (compilerOptions.noImplicitAny) {
                                error(setter, Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation, symbolToString(symbol));
                            }

                            type = anyType;
                        }
                    }
                }

                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    var getter = <AccessorDeclaration>getDeclarationOfKind(symbol, SyntaxKind.GetAccessor);
                    error(getter, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                }
            }
        }

        function getTypeOfFuncClassEnumModule(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = createObjectType(TypeFlags.Anonymous, symbol);
            }
            return links.type;
        }

        function getTypeOfEnumMember(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getDeclaredTypeOfEnum(getParentOfSymbol(symbol));
            }
            return links.type;
        }

        function getTypeOfImport(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getTypeOfSymbol(resolveImport(symbol));
            }
            return links.type;
        }

        function getTypeOfInstantiatedSymbol(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = instantiateType(getTypeOfSymbol(links.target), links.mapper);
            }
            return links.type;
        }

        function getTypeOfSymbol(symbol: Symbol): Type {
            if (symbol.flags & SymbolFlags.Instantiated) {
                return getTypeOfInstantiatedSymbol(symbol);
            }
            if (symbol.flags & (SymbolFlags.Variable | SymbolFlags.Property)) {
                return getTypeOfVariableOrParameterOrProperty(symbol);
            }
            if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule)) {
                return getTypeOfFuncClassEnumModule(symbol);
            }
            if (symbol.flags & SymbolFlags.EnumMember) {
                return getTypeOfEnumMember(symbol);
            }
            if (symbol.flags & SymbolFlags.Accessor) {
                return getTypeOfAccessors(symbol);
            }
            if (symbol.flags & SymbolFlags.Import) {
                return getTypeOfImport(symbol);
            }
            return unknownType;
        }

        function getTargetType(type: ObjectType): Type {
            return type.flags & TypeFlags.Reference ? (<TypeReference>type).target : type;
        }

        function hasBaseType(type: InterfaceType, checkBase: InterfaceType) {
            return check(type);
            function check(type: InterfaceType): boolean {
                var target = <InterfaceType>getTargetType(type);
                return target === checkBase || forEach(target.baseTypes, check);
            }
        }

        // Return combined list of type parameters from all declarations of a class or interface. Elsewhere we check they're all
        // the same, but even if they're not we still need the complete list to ensure instantiations supply type arguments
        // for all type parameters.
        function getTypeParametersOfClassOrInterface(symbol: Symbol): TypeParameter[] {
            var result: TypeParameter[];
            forEach(symbol.declarations, node => {
                if (node.kind === SyntaxKind.InterfaceDeclaration || node.kind === SyntaxKind.ClassDeclaration) {
                    var declaration = <InterfaceDeclaration>node;
                    if (declaration.typeParameters && declaration.typeParameters.length) {
                        forEach(declaration.typeParameters, node => {
                            var tp = getDeclaredTypeOfTypeParameter(getSymbolOfNode(node));
                            if (!result) {
                                result = [tp];
                            }
                            else if (!contains(result, tp)) {
                                result.push(tp);
                            }
                        });
                    }
                }
            });
            return result;
        }

        function getDeclaredTypeOfClass(symbol: Symbol): InterfaceType {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = links.declaredType = <InterfaceType>createObjectType(TypeFlags.Class, symbol);
                var typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= TypeFlags.Reference;
                    type.typeParameters = typeParameters;
                    (<GenericType>type).instantiations = {};
                    (<GenericType>type).instantiations[getTypeListId(type.typeParameters)] = <GenericType>type;
                    (<GenericType>type).target = <GenericType>type;
                    (<GenericType>type).typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                var declaration = <ClassDeclaration>getDeclarationOfKind(symbol, SyntaxKind.ClassDeclaration);
                var baseTypeNode = getClassBaseTypeNode(declaration);
                if (baseTypeNode) {
                    var baseType = getTypeFromTypeReferenceNode(baseTypeNode);
                    if (baseType !== unknownType) {
                        if (getTargetType(baseType).flags & TypeFlags.Class) {
                            if (type !== baseType && !hasBaseType(<InterfaceType>baseType, type)) {
                                type.baseTypes.push(baseType);
                            }
                            else {
                                error(declaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.WriteArrayAsGenericType));
                            }
                        }
                        else {
                            error(baseTypeNode, Diagnostics.A_class_may_only_extend_another_class);
                        }
                    }
                }
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = emptyArray;
                type.declaredConstructSignatures = emptyArray;
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, IndexKind.String);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, IndexKind.Number);
            }
            return <InterfaceType>links.declaredType;
        }

        function getDeclaredTypeOfInterface(symbol: Symbol): InterfaceType {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = links.declaredType = <InterfaceType>createObjectType(TypeFlags.Interface, symbol);
                var typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= TypeFlags.Reference;
                    type.typeParameters = typeParameters;
                    (<GenericType>type).instantiations = {};
                    (<GenericType>type).instantiations[getTypeListId(type.typeParameters)] = <GenericType>type;
                    (<GenericType>type).target = <GenericType>type;
                    (<GenericType>type).typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                forEach(symbol.declarations, declaration => {
                    if (declaration.kind === SyntaxKind.InterfaceDeclaration && getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration)) {
                        forEach(getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration), node => {
                            var baseType = getTypeFromTypeReferenceNode(node);
                            if (baseType !== unknownType) {
                                if (getTargetType(baseType).flags & (TypeFlags.Class | TypeFlags.Interface)) {
                                    if (type !== baseType && !hasBaseType(<InterfaceType>baseType, type)) {
                                        type.baseTypes.push(baseType);
                                    }
                                    else {
                                        error(declaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.WriteArrayAsGenericType));
                                    }
                                }
                                else {
                                    error(node, Diagnostics.An_interface_may_only_extend_a_class_or_another_interface);
                                }
                            }
                        });
                    }
                });
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = getSignaturesOfSymbol(symbol.members["__call"]);
                type.declaredConstructSignatures = getSignaturesOfSymbol(symbol.members["__new"]);
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, IndexKind.String);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, IndexKind.Number);
            }
            return <InterfaceType>links.declaredType;
        }

        function getDeclaredTypeOfTypeAlias(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = resolvingType;
                var declaration = <TypeAliasDeclaration>getDeclarationOfKind(symbol, SyntaxKind.TypeAliasDeclaration);
                var type = getTypeFromTypeNode(declaration.type);
                if (links.declaredType === resolvingType) {
                    links.declaredType = type;
                }
            }
            else if (links.declaredType === resolvingType) {
                links.declaredType = unknownType;
                var declaration = <TypeAliasDeclaration>getDeclarationOfKind(symbol, SyntaxKind.TypeAliasDeclaration);
                error(declaration.name, Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
            }
            return links.declaredType;
        }

        function getDeclaredTypeOfEnum(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = createType(TypeFlags.Enum);
                type.symbol = symbol;
                links.declaredType = type;
            }
            return links.declaredType;
        }

        function getDeclaredTypeOfTypeParameter(symbol: Symbol): TypeParameter {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = <TypeParameter>createType(TypeFlags.TypeParameter);
                type.symbol = symbol;
                if (!(<TypeParameterDeclaration>getDeclarationOfKind(symbol, SyntaxKind.TypeParameter)).constraint) {
                    type.constraint = noConstraintType;
                }
                links.declaredType = type;
            }
            return <TypeParameter>links.declaredType;
        }

        function getDeclaredTypeOfImport(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = getDeclaredTypeOfSymbol(resolveImport(symbol));
            }
            return links.declaredType;
        }

        function getDeclaredTypeOfSymbol(symbol: Symbol): Type {
            Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0);
            if (symbol.flags & SymbolFlags.Class) {
                return getDeclaredTypeOfClass(symbol);
            }
            if (symbol.flags & SymbolFlags.Interface) {
                return getDeclaredTypeOfInterface(symbol);
            }
            if (symbol.flags & SymbolFlags.TypeAlias) {
                return getDeclaredTypeOfTypeAlias(symbol);
            }
            if (symbol.flags & SymbolFlags.Enum) {
                return getDeclaredTypeOfEnum(symbol);
            }
            if (symbol.flags & SymbolFlags.TypeParameter) {
                return getDeclaredTypeOfTypeParameter(symbol);
            }
            if (symbol.flags & SymbolFlags.Import) {
                return getDeclaredTypeOfImport(symbol);
            }
            return unknownType;
        }

        function createSymbolTable(symbols: Symbol[]): SymbolTable {
            var result: SymbolTable = {};
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                result[symbol.name] = symbol;
            }
            return result;
        }

        function createInstantiatedSymbolTable(symbols: Symbol[], mapper: TypeMapper): SymbolTable {
            var result: SymbolTable = {};
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                result[symbol.name] = instantiateSymbol(symbol, mapper);
            }
            return result;
        }

        function addInheritedMembers(symbols: SymbolTable, baseSymbols: Symbol[]) {
            for (var i = 0; i < baseSymbols.length; i++) {
                var s = baseSymbols[i];
                if (!hasProperty(symbols, s.name)) {
                    symbols[s.name] = s;
                }
            }
        }

        function addInheritedSignatures(signatures: Signature[], baseSignatures: Signature[]) {
            if (baseSignatures) {
                for (var i = 0; i < baseSignatures.length; i++) {
                    signatures.push(baseSignatures[i]);
                }
            }
        }

        function resolveClassOrInterfaceMembers(type: InterfaceType): void {
            var members = type.symbol.members;
            var callSignatures = type.declaredCallSignatures;
            var constructSignatures = type.declaredConstructSignatures;
            var stringIndexType = type.declaredStringIndexType;
            var numberIndexType = type.declaredNumberIndexType;
            if (type.baseTypes.length) {
                members = createSymbolTable(type.declaredProperties);
                forEach(type.baseTypes, baseType => {
                    addInheritedMembers(members, getPropertiesOfObjectType(baseType));
                    callSignatures = concatenate(callSignatures, getSignaturesOfType(baseType, SignatureKind.Call));
                    constructSignatures = concatenate(constructSignatures, getSignaturesOfType(baseType, SignatureKind.Construct));
                    stringIndexType = stringIndexType || getIndexTypeOfType(baseType, IndexKind.String);
                    numberIndexType = numberIndexType || getIndexTypeOfType(baseType, IndexKind.Number);
                });
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function resolveTypeReferenceMembers(type: TypeReference): void {
            var target = type.target;
            var mapper = createTypeMapper(target.typeParameters, type.typeArguments);
            var members = createInstantiatedSymbolTable(target.declaredProperties, mapper);
            var callSignatures = instantiateList(target.declaredCallSignatures, mapper, instantiateSignature);
            var constructSignatures = instantiateList(target.declaredConstructSignatures, mapper, instantiateSignature);
            var stringIndexType = target.declaredStringIndexType ? instantiateType(target.declaredStringIndexType, mapper) : undefined;
            var numberIndexType = target.declaredNumberIndexType ? instantiateType(target.declaredNumberIndexType, mapper) : undefined;
            forEach(target.baseTypes, baseType => {
                var instantiatedBaseType = instantiateType(baseType, mapper);
                addInheritedMembers(members, getPropertiesOfObjectType(instantiatedBaseType));
                callSignatures = concatenate(callSignatures, getSignaturesOfType(instantiatedBaseType, SignatureKind.Call));
                constructSignatures = concatenate(constructSignatures, getSignaturesOfType(instantiatedBaseType, SignatureKind.Construct));
                stringIndexType = stringIndexType || getIndexTypeOfType(instantiatedBaseType, IndexKind.String);
                numberIndexType = numberIndexType || getIndexTypeOfType(instantiatedBaseType, IndexKind.Number);
            });
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function createSignature(declaration: SignatureDeclaration, typeParameters: TypeParameter[], parameters: Symbol[],
            resolvedReturnType: Type, minArgumentCount: number, hasRestParameter: boolean, hasStringLiterals: boolean): Signature {
            var sig = new Signature(checker);
            sig.declaration = declaration;
            sig.typeParameters = typeParameters;
            sig.parameters = parameters;
            sig.resolvedReturnType = resolvedReturnType;
            sig.minArgumentCount = minArgumentCount;
            sig.hasRestParameter = hasRestParameter;
            sig.hasStringLiterals = hasStringLiterals;
            return sig;
        }

        function cloneSignature(sig: Signature): Signature {
            return createSignature(sig.declaration, sig.typeParameters, sig.parameters, sig.resolvedReturnType,
                sig.minArgumentCount, sig.hasRestParameter, sig.hasStringLiterals);
        }

        function getDefaultConstructSignatures(classType: InterfaceType): Signature[] {
            if (classType.baseTypes.length) {
                var baseType = classType.baseTypes[0];
                var baseSignatures = getSignaturesOfType(getTypeOfSymbol(baseType.symbol), SignatureKind.Construct);
                return map(baseSignatures, baseSignature => {
                    var signature = baseType.flags & TypeFlags.Reference ?
                        getSignatureInstantiation(baseSignature, (<TypeReference>baseType).typeArguments) : cloneSignature(baseSignature);
                    signature.typeParameters = classType.typeParameters;
                    signature.resolvedReturnType = classType;
                    return signature;
                });
            }
            return [createSignature(undefined, classType.typeParameters, emptyArray, classType, 0, false, false)];
        }

        function createTupleTypeMemberSymbols(memberTypes: Type[]): SymbolTable {
            var members: SymbolTable = {};
            for (var i = 0; i < memberTypes.length; i++) {
                var symbol = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "" + i);
                symbol.type = memberTypes[i];
                members[i] = symbol;
            }
            return members;
        }

        function resolveTupleTypeMembers(type: TupleType) {
            var arrayType = resolveObjectOrUnionTypeMembers(createArrayType(getUnionType(type.elementTypes)));
            var members = createTupleTypeMemberSymbols(type.elementTypes);
            addInheritedMembers(members, arrayType.properties);
            setObjectTypeMembers(type, members, arrayType.callSignatures, arrayType.constructSignatures, arrayType.stringIndexType, arrayType.numberIndexType);
        }

        function signatureListsIdentical(s: Signature[], t: Signature[]): boolean {
            if (s.length !== t.length) {
                return false;
            }
            for (var i = 0; i < s.length; i++) {
                if (!compareSignatures(s[i], t[i], /*compareReturnTypes*/ false, compareTypes)) {
                    return false;
                }
            }
            return true;
        }

        // If the lists of call or construct signatures in the given types are all identical except for return types,
        // and if none of the signatures are generic, return a list of signatures that has substitutes a union of the
        // return types of the corresponding signatures in each resulting signature.
        function getUnionSignatures(types: Type[], kind: SignatureKind): Signature[] {
            var signatureLists = map(types, t => getSignaturesOfType(t, kind));
            var signatures = signatureLists[0];
            for (var i = 0; i < signatures.length; i++) {
                if (signatures[i].typeParameters) {
                    return emptyArray;
                }
            }
            for (var i = 1; i < signatureLists.length; i++) {
                if (!signatureListsIdentical(signatures, signatureLists[i])) {
                    return emptyArray;
                }
            }
            var result = map(signatures, cloneSignature);
            for (var i = 0; i < result.length; i++) {
                var s = result[i];
                // Clear resolved return type we possibly got from cloneSignature
                s.resolvedReturnType = undefined;
                s.unionSignatures = map(signatureLists, signatures => signatures[i]);
            }
            return result;
        }

        function getUnionIndexType(types: Type[], kind: IndexKind): Type {
            var indexTypes: Type[] = [];
            for (var i = 0; i < types.length; i++) {
                var indexType = getIndexTypeOfType(types[i], kind);
                if (!indexType) {
                    return undefined;
                }
                indexTypes.push(indexType);
            }
            return getUnionType(indexTypes);
        }

        function resolveUnionTypeMembers(type: UnionType) {
            // The members and properties collections are empty for union types. To get all properties of a union
            // type use getPropertiesOfType (only the language service uses this).
            var callSignatures = getUnionSignatures(type.types, SignatureKind.Call);
            var constructSignatures = getUnionSignatures(type.types, SignatureKind.Construct);
            var stringIndexType = getUnionIndexType(type.types, IndexKind.String);
            var numberIndexType = getUnionIndexType(type.types, IndexKind.Number);
            setObjectTypeMembers(type, emptySymbols, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function resolveAnonymousTypeMembers(type: ObjectType) {
            var symbol = type.symbol;
            if (symbol.flags & SymbolFlags.TypeLiteral) {
                var members = symbol.members;
                var callSignatures = getSignaturesOfSymbol(members["__call"]);
                var constructSignatures = getSignaturesOfSymbol(members["__new"]);
                var stringIndexType = getIndexTypeOfSymbol(symbol, IndexKind.String);
                var numberIndexType = getIndexTypeOfSymbol(symbol, IndexKind.Number);
            }
            else {
                // Combinations of function, class, enum and module
                var members = emptySymbols;
                var callSignatures: Signature[] = emptyArray;
                var constructSignatures: Signature[] = emptyArray;
                if (symbol.flags & SymbolFlags.HasExports) {
                    members = symbol.exports;
                }
                if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method)) {
                    callSignatures = getSignaturesOfSymbol(symbol);
                }
                if (symbol.flags & SymbolFlags.Class) {
                    var classType = getDeclaredTypeOfClass(symbol);
                    constructSignatures = getSignaturesOfSymbol(symbol.members["__constructor"]);
                    if (!constructSignatures.length) {
                        constructSignatures = getDefaultConstructSignatures(classType);
                    }
                    if (classType.baseTypes.length) {
                        members = createSymbolTable(getNamedMembers(members));
                        addInheritedMembers(members, getPropertiesOfObjectType(getTypeOfSymbol(classType.baseTypes[0].symbol)));
                    }
                }
                var stringIndexType: Type = undefined;
                var numberIndexType: Type = (symbol.flags & SymbolFlags.Enum) ? stringType : undefined;
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function resolveObjectOrUnionTypeMembers(type: ObjectType): ResolvedType {
            if (!(<ResolvedType>type).members) {
                if (type.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                    resolveClassOrInterfaceMembers(<InterfaceType>type);
                }
                else if (type.flags & TypeFlags.Anonymous) {
                    resolveAnonymousTypeMembers(<ObjectType>type);
                }
                else if (type.flags & TypeFlags.Tuple) {
                    resolveTupleTypeMembers(<TupleType>type);
                }
                else if (type.flags & TypeFlags.Union) {
                    resolveUnionTypeMembers(<UnionType>type);
                }
                else {
                    resolveTypeReferenceMembers(<TypeReference>type);
                }
            }
            return <ResolvedType>type;
        }

        // Return properties of an object type or an empty array for other types
        function getPropertiesOfObjectType(type: Type): Symbol[] {
            if (type.flags & TypeFlags.ObjectType) {
                return resolveObjectOrUnionTypeMembers(<ObjectType>type).properties;
            }
            return emptyArray;
        }

        // If the given type is an object type and that type has a property by the given name, return
        // the symbol for that property. Otherwise return undefined.
        function getPropertyOfObjectType(type: Type, name: string): Symbol {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectOrUnionTypeMembers(<ObjectType>type);
                if (hasProperty(resolved.members, name)) {
                    var symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }
        }

        function getPropertiesOfUnionType(type: UnionType): Symbol[] {
            var result: Symbol[] = [];
            forEach(getPropertiesOfType(type.types[0]), prop => {
                var unionProp = getPropertyOfUnionType(type, prop.name);
                if (unionProp) {
                    result.push(unionProp);
                }
            });
            return result;
        }

        function getPropertiesOfType(type: Type): Symbol[] {
            if (type.flags & TypeFlags.Union) {
                return getPropertiesOfUnionType(<UnionType>type);
            }
            return getPropertiesOfObjectType(getApparentType(type));
        }

        // For a type parameter, return the base constraint of the type parameter. For the string, number, and
        // boolean primitive types, return the corresponding object types.Otherwise return the type itself.
        // Note that the apparent type of a union type is the union type itself.
        function getApparentType(type: Type): Type {
            if (type.flags & TypeFlags.TypeParameter) {
                do {
                    type = getConstraintOfTypeParameter(<TypeParameter>type);
                } while (type && type.flags & TypeFlags.TypeParameter);
                if (!type) {
                    type = emptyObjectType;
                }
            }
            if (type.flags & TypeFlags.StringLike) {
                type = globalStringType;
            }
            else if (type.flags & TypeFlags.NumberLike) {
                type = globalNumberType;
            }
            else if (type.flags & TypeFlags.Boolean) {
                type = globalBooleanType;
            }
            return type;
        }

        function createUnionProperty(unionType: UnionType, name: string): Symbol {
            var types = unionType.types;
            var props: Symbol[];
            for (var i = 0; i < types.length; i++) {
                var type = getApparentType(types[i]);
                if (type !== unknownType) {
                    var prop = getPropertyOfType(type, name);
                    if (!prop) {
                        return undefined;
                    }
                    if (!props) {
                        props = [prop];
                    }
                    else {
                        props.push(prop);
                    }
                }
            }
            var propTypes: Type[] = [];
            var declarations: Declaration[] = [];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop.declarations) {
                    declarations.push.apply(declarations, prop.declarations);
                }
                propTypes.push(getTypeOfSymbol(prop));
            }
            var result = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient | SymbolFlags.UnionProperty, name);
            result.unionType = unionType;
            result.declarations = declarations;
            result.type = getUnionType(propTypes);
            return result;
        }

        function getPropertyOfUnionType(type: UnionType, name: string): Symbol {
            var properties = type.resolvedProperties || (type.resolvedProperties = {});
            if (hasProperty(properties, name)) {
                return properties[name];
            }
            var property = createUnionProperty(type, name);
            if (property) {
                properties[name] = property;
            }
            return property;
        }

        // Return the symbol for the property with the given name in the given type. Creates synthetic union properties when
        // necessary, maps primitive types and type parameters are to their apparent types, and augments with properties from
        // Object and Function as appropriate.
        function getPropertyOfType(type: Type, name: string): Symbol {
            if (type.flags & TypeFlags.Union) {
                return getPropertyOfUnionType(<UnionType>type, name);
            }
            if (!(type.flags & TypeFlags.ObjectType)) {
                type = getApparentType(type);
                if (!(type.flags & TypeFlags.ObjectType)) {
                    return undefined;
                }
            }
            var resolved = resolveObjectOrUnionTypeMembers(type);
            if (hasProperty(resolved.members, name)) {
                var symbol = resolved.members[name];
                if (symbolIsValue(symbol)) {
                    return symbol;
                }
            }
            if (resolved === anyFunctionType || resolved.callSignatures.length || resolved.constructSignatures.length) {
                var symbol = getPropertyOfObjectType(globalFunctionType, name);
                if (symbol) return symbol;
            }
            return getPropertyOfObjectType(globalObjectType, name);
        }

        function getSignaturesOfObjectOrUnionType(type: Type, kind: SignatureKind): Signature[] {
            if (type.flags & (TypeFlags.ObjectType | TypeFlags.Union)) {
                var resolved = resolveObjectOrUnionTypeMembers(<ObjectType>type);
                return kind === SignatureKind.Call ? resolved.callSignatures : resolved.constructSignatures;
            }
            return emptyArray;
        }

        // Return the signatures of the given kind in the given type. Creates synthetic union signatures when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getSignaturesOfType(type: Type, kind: SignatureKind): Signature[] {
            return getSignaturesOfObjectOrUnionType(getApparentType(type), kind);
        }

        function getIndexTypeOfObjectOrUnionType(type: Type, kind: IndexKind): Type {
            if (type.flags & (TypeFlags.ObjectType | TypeFlags.Union)) {
                var resolved = resolveObjectOrUnionTypeMembers(<ObjectType>type);
                return kind === IndexKind.String ? resolved.stringIndexType : resolved.numberIndexType;
            }
        }

        // Return the index type of the given kind in the given type. Creates synthetic union index types when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getIndexTypeOfType(type: Type, kind: IndexKind): Type {
            return getIndexTypeOfObjectOrUnionType(getApparentType(type), kind);
        }

        // Return list of type parameters with duplicates removed (duplicate identifier errors are generated in the actual
        // type checking functions).
        function getTypeParametersFromDeclaration(typeParameterDeclarations: TypeParameterDeclaration[]): TypeParameter[] {
            var result: TypeParameter[] = [];
            forEach(typeParameterDeclarations, node => {
                var tp = getDeclaredTypeOfTypeParameter(node.symbol);
                if (!contains(result, tp)) {
                    result.push(tp);
                }
            });
            return result;
        }

        function getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature {
            var links = getNodeLinks(declaration);
            if (!links.resolvedSignature) {
                var classType = declaration.kind === SyntaxKind.Constructor ? getDeclaredTypeOfClass((<ClassDeclaration>declaration.parent).symbol) : undefined;
                var typeParameters = classType ? classType.typeParameters :
                    declaration.typeParameters ? getTypeParametersFromDeclaration(declaration.typeParameters) : undefined;
                var parameters: Symbol[] = [];
                var hasStringLiterals = false;
                var minArgumentCount = -1;
                for (var i = 0, n = declaration.parameters.length; i < n; i++) {
                    var param = declaration.parameters[i];
                    parameters.push(param.symbol);
                    if (param.type && param.type.kind === SyntaxKind.StringLiteral) {
                        hasStringLiterals = true;
                    }
                    if (minArgumentCount < 0) {
                        if (param.initializer || param.questionToken || param.dotDotDotToken) {
                            minArgumentCount = i;
                        }
                    }
                }

                if (minArgumentCount < 0) {
                    minArgumentCount = declaration.parameters.length;
                }

                var returnType: Type;
                if (classType) {
                    returnType = classType;
                }
                else if (declaration.type) {
                    returnType = getTypeFromTypeNode(declaration.type);
                }
                else {
                    // TypeScript 1.0 spec (April 2014):
                    // If only one accessor includes a type annotation, the other behaves as if it had the same type annotation.
                    if (declaration.kind === SyntaxKind.GetAccessor && !hasDynamicName(declaration)) {
                        var setter = <AccessorDeclaration>getDeclarationOfKind(declaration.symbol, SyntaxKind.SetAccessor);
                        returnType = getAnnotatedAccessorType(setter);
                    }

                    if (!returnType && nodeIsMissing((<FunctionLikeDeclaration>declaration).body)) {
                        returnType = anyType;
                    }
                }

                links.resolvedSignature = createSignature(declaration, typeParameters, parameters, returnType,
                    minArgumentCount, hasRestParameters(declaration), hasStringLiterals);
            }
            return links.resolvedSignature;
        }

        function getSignaturesOfSymbol(symbol: Symbol): Signature[] {
            if (!symbol) return emptyArray;
            var result: Signature[] = [];
            for (var i = 0, len = symbol.declarations.length; i < len; i++) {
                var node = symbol.declarations[i];
                switch (node.kind) {
                    case SyntaxKind.FunctionType:
                    case SyntaxKind.ConstructorType:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        // Don't include signature if node is the implementation of an overloaded function. A node is considered
                        // an implementation node if it has a body and the previous node is of the same kind and immediately
                        // precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
                        if (i > 0 && (<FunctionLikeDeclaration>node).body) {
                            var previous = symbol.declarations[i - 1];
                            if (node.parent === previous.parent && node.kind === previous.kind && node.pos === previous.end) {
                                break;
                            }
                        }
                        result.push(getSignatureFromDeclaration(<SignatureDeclaration>node));
                }
            }
            return result;
        }

        function getReturnTypeOfSignature(signature: Signature): Type {
            if (!signature.resolvedReturnType) {
                signature.resolvedReturnType = resolvingType;
                if (signature.target) {
                    var type = instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper);
                }
                else if (signature.unionSignatures) {
                    var type = getUnionType(map(signature.unionSignatures, getReturnTypeOfSignature));
                }
                else {
                    var type = getReturnTypeFromBody(<FunctionLikeDeclaration>signature.declaration);
                }
                if (signature.resolvedReturnType === resolvingType) {
                    signature.resolvedReturnType = type;
                }
            }
            else if (signature.resolvedReturnType === resolvingType) {
                signature.resolvedReturnType = anyType;
                if (compilerOptions.noImplicitAny) {
                    var declaration = <Declaration>signature.declaration;
                    if (declaration.name) {
                        error(declaration.name, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, declarationNameToString(declaration.name));
                    }
                    else {
                        error(declaration, Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                    }
                }
            }
            return signature.resolvedReturnType;
        }

        function getRestTypeOfSignature(signature: Signature): Type {
            if (signature.hasRestParameter) {
                var type = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                if (type.flags & TypeFlags.Reference && (<TypeReference>type).target === globalArrayType) {
                    return (<TypeReference>type).typeArguments[0];
                }
            }
            return anyType;
        }

        function getSignatureInstantiation(signature: Signature, typeArguments: Type[]): Signature {
            return instantiateSignature(signature, createTypeMapper(signature.typeParameters, typeArguments), true);
        }

        function getErasedSignature(signature: Signature): Signature {
            if (!signature.typeParameters) return signature;
            if (!signature.erasedSignatureCache) {
                if (signature.target) {
                    signature.erasedSignatureCache = instantiateSignature(getErasedSignature(signature.target), signature.mapper);
                }
                else {
                    signature.erasedSignatureCache = instantiateSignature(signature, createTypeEraser(signature.typeParameters), true);
                }
            }
            return signature.erasedSignatureCache;
        }

        function getOrCreateTypeFromSignature(signature: Signature): ObjectType {
            // There are two ways to declare a construct signature, one is by declaring a class constructor
            // using the constructor keyword, and the other is declaring a bare construct signature in an
            // object type literal or interface (using the new keyword). Each way of declaring a constructor
            // will result in a different declaration kind.
            if (!signature.isolatedSignatureType) {
                var isConstructor = signature.declaration.kind === SyntaxKind.Constructor || signature.declaration.kind === SyntaxKind.ConstructSignature;
                var type = <ResolvedType>createObjectType(TypeFlags.Anonymous | TypeFlags.FromSignature);
                type.members = emptySymbols;
                type.properties = emptyArray;
                type.callSignatures = !isConstructor ? [signature] : emptyArray;
                type.constructSignatures = isConstructor ? [signature] : emptyArray;
                signature.isolatedSignatureType = type;
            }

            return signature.isolatedSignatureType;
        }

        function getIndexSymbol(symbol: Symbol): Symbol {
            return symbol.members["__index"];
        }

        function getIndexDeclarationOfSymbol(symbol: Symbol, kind: IndexKind): SignatureDeclaration {
            var syntaxKind = kind === IndexKind.Number ? SyntaxKind.NumberKeyword : SyntaxKind.StringKeyword;
            var indexSymbol = getIndexSymbol(symbol);
            if (indexSymbol) {
                var len = indexSymbol.declarations.length;
                for (var i = 0; i < len; i++) {
                    var node = <SignatureDeclaration>indexSymbol.declarations[i];
                    if (node.parameters.length === 1) {
                        var parameter = node.parameters[0];
                        if (parameter && parameter.type && parameter.type.kind === syntaxKind) {
                            return node;
                        }
                    }
                }
            }

            return undefined;
        }

        function getIndexTypeOfSymbol(symbol: Symbol, kind: IndexKind): Type {
            var declaration = getIndexDeclarationOfSymbol(symbol, kind);
            return declaration
                ? declaration.type ? getTypeFromTypeNode(declaration.type) : anyType
                : undefined;
        }

        function getConstraintOfTypeParameter(type: TypeParameter): Type {
            if (!type.constraint) {
                if (type.target) {
                    var targetConstraint = getConstraintOfTypeParameter(type.target);
                    type.constraint = targetConstraint ? instantiateType(targetConstraint, type.mapper) : noConstraintType;
                }
                else {
                    type.constraint = getTypeFromTypeNode((<TypeParameterDeclaration>getDeclarationOfKind(type.symbol, SyntaxKind.TypeParameter)).constraint);
                }
            }
            return type.constraint === noConstraintType ? undefined : type.constraint;
        }

        function getTypeListId(types: Type[]) {
            switch (types.length) {
                case 1:
                    return "" + types[0].id;
                case 2:
                    return types[0].id + "," + types[1].id;
                default:
                    var result = "";
                    for (var i = 0; i < types.length; i++) {
                        if (i > 0) result += ",";
                        result += types[i].id;
                    }
                    return result;
            }
        }

        // This function is used to propagate widening flags when creating new object types references and union types.
        // It is only necessary to do so if a constituent type might be the undefined type, the null type, or the type
        // of an object literal (since those types have widening related information we need to track).
        function getWideningFlagsOfTypes(types: Type[]): TypeFlags {
            var result: TypeFlags = 0;
            for (var i = 0; i < types.length; i++) {
                result |= types[i].flags;
            }
            return result & TypeFlags.RequiresWidening;
        }

        function createTypeReference(target: GenericType, typeArguments: Type[]): TypeReference {
            var id = getTypeListId(typeArguments);
            var type = target.instantiations[id];
            if (!type) {
                var flags = TypeFlags.Reference | getWideningFlagsOfTypes(typeArguments);
                type = target.instantiations[id] = <TypeReference>createObjectType(flags, target.symbol);
                type.target = target;
                type.typeArguments = typeArguments;
            }
            return type;
        }

        function isTypeParameterReferenceIllegalInConstraint(typeReferenceNode: TypeReferenceNode, typeParameterSymbol: Symbol): boolean {
            var links = getNodeLinks(typeReferenceNode);
            if (links.isIllegalTypeReferenceInConstraint !== undefined) {
                return links.isIllegalTypeReferenceInConstraint;
            }

            // bubble up to the declaration
            var currentNode: Node = typeReferenceNode;
            // forEach === exists
            while (!forEach(typeParameterSymbol.declarations, d => d.parent === currentNode.parent)) {
                currentNode = currentNode.parent;
            }
            // if last step was made from the type parameter this means that path has started somewhere in constraint which is illegal
            links.isIllegalTypeReferenceInConstraint = currentNode.kind === SyntaxKind.TypeParameter;
            return links.isIllegalTypeReferenceInConstraint;
        }

        function checkTypeParameterHasIllegalReferencesInConstraint(typeParameter: TypeParameterDeclaration): void {
            var typeParameterSymbol: Symbol;
            function check(n: Node): void {
                if (n.kind === SyntaxKind.TypeReference && (<TypeReferenceNode>n).typeName.kind === SyntaxKind.Identifier) {
                    var links = getNodeLinks(n);
                    if (links.isIllegalTypeReferenceInConstraint === undefined) {
                        var symbol = resolveName(typeParameter, (<Identifier>(<TypeReferenceNode>n).typeName).text, SymbolFlags.Type, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined);
                        if (symbol && (symbol.flags & SymbolFlags.TypeParameter)) {
                            // TypeScript 1.0 spec (April 2014): 3.4.1
                            // Type parameters declared in a particular type parameter list 
                            // may not be referenced in constraints in that type parameter list
                            
                            // symbol.declaration.parent === typeParameter.parent
                            // -> typeParameter and symbol.declaration originate from the same type parameter list 
                            // -> illegal for all declarations in symbol
                            // forEach === exists
                            links.isIllegalTypeReferenceInConstraint = forEach(symbol.declarations, d => d.parent == typeParameter.parent);
                        }
                    }
                    if (links.isIllegalTypeReferenceInConstraint) {
                        error(typeParameter, Diagnostics.Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list);
                    }
                }
                forEachChild(n, check);
            }

            if (typeParameter.constraint) {
                typeParameterSymbol = getSymbolOfNode(typeParameter);
                check(typeParameter.constraint);
            }
        }

        function getTypeFromTypeReferenceNode(node: TypeReferenceNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                var symbol = resolveEntityName(node, node.typeName, SymbolFlags.Type);
                if (symbol) {
                    var type: Type;
                    if ((symbol.flags & SymbolFlags.TypeParameter) && isTypeParameterReferenceIllegalInConstraint(node, symbol)) {
                        // TypeScript 1.0 spec (April 2014): 3.4.1
                        // Type parameters declared in a particular type parameter list 
                        // may not be referenced in constraints in that type parameter list
                        // Implementation: such type references are resolved to 'unknown' type that usually denotes error
                        type = unknownType;
                    }
                    else {
                        type = getDeclaredTypeOfSymbol(symbol);
                        if (type.flags & (TypeFlags.Class | TypeFlags.Interface) && type.flags & TypeFlags.Reference) {
                            var typeParameters = (<InterfaceType>type).typeParameters;
                            if (node.typeArguments && node.typeArguments.length === typeParameters.length) {
                                type = createTypeReference(<GenericType>type, map(node.typeArguments, getTypeFromTypeNode));
                            }
                            else {
                                error(node, Diagnostics.Generic_type_0_requires_1_type_argument_s, typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.WriteArrayAsGenericType), typeParameters.length);
                                type = undefined;
                            }
                        }
                        else {
                            if (node.typeArguments) {
                                error(node, Diagnostics.Type_0_is_not_generic, typeToString(type));
                                type = undefined;
                            }
                        }
                    }
                }
                links.resolvedType = type || unknownType;
            }
            return links.resolvedType;
        }

        function getTypeFromTypeQueryNode(node: TypeQueryNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                // TypeScript 1.0 spec (April 2014): 3.6.3
                // The expression is processed as an identifier expression (section 4.3)
                // or property access expression(section 4.10),
                // the widened type(section 3.9) of which becomes the result. 
                links.resolvedType = getWidenedType(checkExpressionOrQualifiedName(node.exprName));
            }
            return links.resolvedType;
        }

        function getTypeOfGlobalSymbol(symbol: Symbol, arity: number): ObjectType {

            function getTypeDeclaration(symbol: Symbol): Declaration {
                var declarations = symbol.declarations;
                for (var i = 0; i < declarations.length; i++) {
                    var declaration = declarations[i];
                    switch (declaration.kind) {
                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.EnumDeclaration:
                            return declaration;
                    }
                }
            }

            if (!symbol) {
                return emptyObjectType;
            }
            var type = getDeclaredTypeOfSymbol(symbol);
            if (!(type.flags & TypeFlags.ObjectType)) {
                error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbol.name);
                return emptyObjectType;
            }
            if (((<InterfaceType>type).typeParameters ? (<InterfaceType>type).typeParameters.length : 0) !== arity) {
                error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbol.name, arity);
                return emptyObjectType;
            }
            return <ObjectType>type;
        }

        function getGlobalSymbol(name: string): Symbol {
            return resolveName(undefined, name, SymbolFlags.Type, Diagnostics.Cannot_find_global_type_0, name);
        }

        function getGlobalType(name: string): ObjectType {
            return getTypeOfGlobalSymbol(getGlobalSymbol(name), 0);
        }

        function createArrayType(elementType: Type): Type {
            // globalArrayType will be undefined if we get here during creation of the Array type. This for example happens if
            // user code augments the Array type with call or construct signatures that have an array type as the return type.
            // We instead use globalArraySymbol to obtain the (not yet fully constructed) Array type.
            var arrayType = globalArrayType || getDeclaredTypeOfSymbol(globalArraySymbol);
            return arrayType !== emptyObjectType ? createTypeReference(<GenericType>arrayType, [elementType]) : emptyObjectType;
        }

        function getTypeFromArrayTypeNode(node: ArrayTypeNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createArrayType(getTypeFromTypeNode(node.elementType));
            }
            return links.resolvedType;
        }

        function createTupleType(elementTypes: Type[]) {
            var id = getTypeListId(elementTypes);
            var type = tupleTypes[id];
            if (!type) {
                type = tupleTypes[id] = <TupleType>createObjectType(TypeFlags.Tuple);
                type.elementTypes = elementTypes;
            }
            return type;
        }

        function getTypeFromTupleTypeNode(node: TupleTypeNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createTupleType(map(node.elementTypes, getTypeFromTypeNode));
            }
            return links.resolvedType;
        }

        function addTypeToSortedSet(sortedSet: Type[], type: Type) {
            if (type.flags & TypeFlags.Union) {
                addTypesToSortedSet(sortedSet, (<UnionType>type).types);
            }
            else {
                var i = 0;
                var id = type.id;
                while (i < sortedSet.length && sortedSet[i].id < id) {
                    i++;
                }
                if (i === sortedSet.length || sortedSet[i].id !== id) {
                    sortedSet.splice(i, 0, type);
                }
            }
        }

        function addTypesToSortedSet(sortedTypes: Type[], types: Type[]) {
            for (var i = 0, len = types.length; i < len; i++) {
                addTypeToSortedSet(sortedTypes, types[i]);
            }
        }

        function isSubtypeOfAny(candidate: Type, types: Type[]): boolean {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && isTypeSubtypeOf(candidate, types[i])) {
                    return true;
                }
            }
            return false;
        }

        function removeSubtypes(types: Type[]) {
            var i = types.length;
            while (i > 0) {
                i--;
                if (isSubtypeOfAny(types[i], types)) {
                    types.splice(i, 1);
                }
            }
        }

        function containsAnyType(types: Type[]) {
            for (var i = 0; i < types.length; i++) {
                if (types[i].flags & TypeFlags.Any) {
                    return true;
                }
            }
            return false;
        }

        function removeAllButLast(types: Type[], typeToRemove: Type) {
            var i = types.length;
            while (i > 0 && types.length > 1) {
                i--;
                if (types[i] === typeToRemove) {
                    types.splice(i, 1);
                }
            }
        }

        function getUnionType(types: Type[], noSubtypeReduction?: boolean): Type {
            if (types.length === 0) {
                return emptyObjectType;
            }
            var sortedTypes: Type[] = [];
            addTypesToSortedSet(sortedTypes, types);
            if (noSubtypeReduction) {
                if (containsAnyType(sortedTypes)) {
                    return anyType;
                }
                removeAllButLast(sortedTypes, undefinedType);
                removeAllButLast(sortedTypes, nullType);
            }
            else {
                removeSubtypes(sortedTypes);
            }
            if (sortedTypes.length === 1) {
                return sortedTypes[0];
            }
            var id = getTypeListId(sortedTypes);
            var type = unionTypes[id];
            if (!type) {
                type = unionTypes[id] = <UnionType>createObjectType(TypeFlags.Union | getWideningFlagsOfTypes(sortedTypes));
                type.types = sortedTypes;
            }
            return type;
        }

        function getTypeFromUnionTypeNode(node: UnionTypeNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getUnionType(map(node.types, getTypeFromTypeNode), /*noSubtypeReduction*/ true);
            }
            return links.resolvedType;
        }

        function getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node: Node): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                // Deferred resolution of members is handled by resolveObjectTypeMembers
                links.resolvedType = createObjectType(TypeFlags.Anonymous, node.symbol);
            }
            return links.resolvedType;
        }

        function getStringLiteralType(node: LiteralExpression): StringLiteralType {
            if (hasProperty(stringLiteralTypes, node.text)) {
                return stringLiteralTypes[node.text];
            }

            var type = stringLiteralTypes[node.text] = <StringLiteralType>createType(TypeFlags.StringLiteral);
            type.text = getTextOfNode(node);
            return type;
        }

        function getTypeFromStringLiteral(node: LiteralExpression): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getStringLiteralType(node);
            }
            return links.resolvedType;
        }

        function getTypeFromTypeNode(node: TypeNode | LiteralExpression): Type {
            switch (node.kind) {
                case SyntaxKind.AnyKeyword:
                    return anyType;
                case SyntaxKind.StringKeyword:
                    return stringType;
                case SyntaxKind.NumberKeyword:
                    return numberType;
                case SyntaxKind.BooleanKeyword:
                    return booleanType;
                case SyntaxKind.VoidKeyword:
                    return voidType;
                case SyntaxKind.StringLiteral:
                    return getTypeFromStringLiteral(<LiteralExpression>node);
                case SyntaxKind.TypeReference:
                    return getTypeFromTypeReferenceNode(<TypeReferenceNode>node);
                case SyntaxKind.TypeQuery:
                    return getTypeFromTypeQueryNode(<TypeQueryNode>node);
                case SyntaxKind.ArrayType:
                    return getTypeFromArrayTypeNode(<ArrayTypeNode>node);
                case SyntaxKind.TupleType:
                    return getTypeFromTupleTypeNode(<TupleTypeNode>node);
                case SyntaxKind.UnionType:
                    return getTypeFromUnionTypeNode(<UnionTypeNode>node);
                case SyntaxKind.ParenthesizedType:
                    return getTypeFromTypeNode((<ParenthesizedTypeNode>node).type);
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.TypeLiteral:
                    return getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                // This function assumes that an identifier or qualified name is a type expression
                // Callers should first ensure this by calling isTypeNode
                case SyntaxKind.Identifier:
                case SyntaxKind.QualifiedName:
                    var symbol = getSymbolInfo(node);
                    return symbol && getDeclaredTypeOfSymbol(symbol);
                default:
                    return unknownType;
            }
        }

        function instantiateList<T>(items: T[], mapper: TypeMapper, instantiator: (item: T, mapper: TypeMapper) => T): T[] {
            if (items && items.length) {
                var result: T[] = [];
                for (var i = 0; i < items.length; i++) {
                    result.push(instantiator(items[i], mapper));
                }
                return result;
            }
            return items;
        }

        function createUnaryTypeMapper(source: Type, target: Type): TypeMapper {
            return t => t === source ? target : t;
        }

        function createBinaryTypeMapper(source1: Type, target1: Type, source2: Type, target2: Type): TypeMapper {
            return t => t === source1 ? target1 : t === source2 ? target2 : t;
        }

        function createTypeMapper(sources: Type[], targets: Type[]): TypeMapper {
            switch (sources.length) {
                case 1: return createUnaryTypeMapper(sources[0], targets[0]);
                case 2: return createBinaryTypeMapper(sources[0], targets[0], sources[1], targets[1]);
            }
            return t => {
                for (var i = 0; i < sources.length; i++) {
                    if (t === sources[i]) return targets[i];
                }
                return t;
            };
        }

        function createUnaryTypeEraser(source: Type): TypeMapper {
            return t => t === source ? anyType : t;
        }

        function createBinaryTypeEraser(source1: Type, source2: Type): TypeMapper {
            return t => t === source1 || t === source2 ? anyType : t;
        }

        function createTypeEraser(sources: Type[]): TypeMapper {
            switch (sources.length) {
                case 1: return createUnaryTypeEraser(sources[0]);
                case 2: return createBinaryTypeEraser(sources[0], sources[1]);
            }
            return t => {
                for (var i = 0; i < sources.length; i++) {
                    if (t === sources[i]) return anyType;
                }
                return t;
            };
        }

        function createInferenceMapper(context: InferenceContext): TypeMapper {
            return t => {
                for (var i = 0; i < context.typeParameters.length; i++) {
                    if (t === context.typeParameters[i]) {
                        return getInferredType(context, i);
                    }
                }
                return t;
            }
        }

        function identityMapper(type: Type): Type {
            return type;
        }

        function combineTypeMappers(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
            return t => mapper2(mapper1(t));
        }

        function instantiateTypeParameter(typeParameter: TypeParameter, mapper: TypeMapper): TypeParameter {
            var result = <TypeParameter>createType(TypeFlags.TypeParameter);
            result.symbol = typeParameter.symbol;
            if (typeParameter.constraint) {
                result.constraint = instantiateType(typeParameter.constraint, mapper);
            }
            else {
                result.target = typeParameter;
                result.mapper = mapper;
            }
            return result;
        }

        function instantiateSignature(signature: Signature, mapper: TypeMapper, eraseTypeParameters?: boolean): Signature {
            if (signature.typeParameters && !eraseTypeParameters) {
                var freshTypeParameters = instantiateList(signature.typeParameters, mapper, instantiateTypeParameter);
                mapper = combineTypeMappers(createTypeMapper(signature.typeParameters, freshTypeParameters), mapper);
            }
            var result = createSignature(signature.declaration, freshTypeParameters,
                instantiateList(signature.parameters, mapper, instantiateSymbol),
                signature.resolvedReturnType ? instantiateType(signature.resolvedReturnType, mapper) : undefined,
                signature.minArgumentCount, signature.hasRestParameter, signature.hasStringLiterals);
            result.target = signature;
            result.mapper = mapper;
            return result;
        }

        function instantiateSymbol(symbol: Symbol, mapper: TypeMapper): Symbol {
            if (symbol.flags & SymbolFlags.Instantiated) {
                var links = getSymbolLinks(symbol);
                // If symbol being instantiated is itself a instantiation, fetch the original target and combine the
                // type mappers. This ensures that original type identities are properly preserved and that aliases
                // always reference a non-aliases.
                symbol = links.target;
                mapper = combineTypeMappers(links.mapper, mapper);
            }

            // Keep the flags from the symbol we're instantiating.  Mark that is instantiated, and 
            // also transient so that we can just store data on it directly.
            var result = <TransientSymbol>createSymbol(SymbolFlags.Instantiated | SymbolFlags.Transient | symbol.flags, symbol.name);
            result.declarations = symbol.declarations;
            result.parent = symbol.parent;
            result.target = symbol;
            result.mapper = mapper;
            if (symbol.valueDeclaration) {
                result.valueDeclaration = symbol.valueDeclaration;
            }

            return result;
        }

        function instantiateAnonymousType(type: ObjectType, mapper: TypeMapper): ObjectType {
            var result = <ResolvedType>createObjectType(TypeFlags.Anonymous, type.symbol);
            result.properties = instantiateList(getPropertiesOfObjectType(type), mapper, instantiateSymbol);
            result.members = createSymbolTable(result.properties);
            result.callSignatures = instantiateList(getSignaturesOfType(type, SignatureKind.Call), mapper, instantiateSignature);
            result.constructSignatures = instantiateList(getSignaturesOfType(type, SignatureKind.Construct), mapper, instantiateSignature);
            var stringIndexType = getIndexTypeOfType(type, IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, IndexKind.Number);
            if (stringIndexType) result.stringIndexType = instantiateType(stringIndexType, mapper);
            if (numberIndexType) result.numberIndexType = instantiateType(numberIndexType, mapper);
            return result;
        }

        function instantiateType(type: Type, mapper: TypeMapper): Type {
            if (mapper !== identityMapper) {
                if (type.flags & TypeFlags.TypeParameter) {
                    return mapper(type);
                }
                if (type.flags & TypeFlags.Anonymous) {
                    return type.symbol && type.symbol.flags & (SymbolFlags.Function | SymbolFlags.Method | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral) ?
                        instantiateAnonymousType(<ObjectType>type, mapper) : type;
                }
                if (type.flags & TypeFlags.Reference) {
                    return createTypeReference((<TypeReference>type).target, instantiateList((<TypeReference>type).typeArguments, mapper, instantiateType));
                }
                if (type.flags & TypeFlags.Tuple) {
                    return createTupleType(instantiateList((<TupleType>type).elementTypes, mapper, instantiateType));
                }
                if (type.flags & TypeFlags.Union) {
                    return getUnionType(instantiateList((<UnionType>type).types, mapper, instantiateType), /*noSubtypeReduction*/ true);
                }
            }
            return type;
        }

        // Returns true if the given expression contains (at any level of nesting) a function or arrow expression
        // that is subject to contextual typing.
        function isContextSensitive(node: Expression | MethodDeclaration | ObjectLiteralElement): boolean {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));
            switch (node.kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return isContextSensitiveFunctionLikeDeclaration(<FunctionExpression>node);
                case SyntaxKind.ObjectLiteralExpression:
                    return forEach((<ObjectLiteralExpression>node).properties, isContextSensitive);
                case SyntaxKind.ArrayLiteralExpression:
                    return forEach((<ArrayLiteralExpression>node).elements, isContextSensitive);
                case SyntaxKind.ConditionalExpression:
                    return isContextSensitive((<ConditionalExpression>node).whenTrue) ||
                        isContextSensitive((<ConditionalExpression>node).whenFalse);
                case SyntaxKind.BinaryExpression:
                    return (<BinaryExpression>node).operator === SyntaxKind.BarBarToken &&
                    (isContextSensitive((<BinaryExpression>node).left) || isContextSensitive((<BinaryExpression>node).right));
                case SyntaxKind.PropertyAssignment:
                    return isContextSensitive((<PropertyAssignment>node).initializer);
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return isContextSensitiveFunctionLikeDeclaration(<MethodDeclaration>node);
                case SyntaxKind.ParenthesizedExpression:
                    return isContextSensitive((<ParenthesizedExpression>node).expression);
            }

            return false;
        }

        function isContextSensitiveFunctionLikeDeclaration(node: FunctionLikeDeclaration) {
            return !node.typeParameters && node.parameters.length && !forEach(node.parameters, p => p.type);
        }

        function getTypeWithoutConstructors(type: Type): Type {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectOrUnionTypeMembers(<ObjectType>type);
                if (resolved.constructSignatures.length) {
                    var result = <ResolvedType>createObjectType(TypeFlags.Anonymous, type.symbol);
                    result.members = resolved.members;
                    result.properties = resolved.properties;
                    result.callSignatures = resolved.callSignatures;
                    result.constructSignatures = emptyArray;
                    type = result;
                }
            }
            return type;
        }

        // TYPE CHECKING

        var subtypeRelation: Map<RelationComparisonResult> = {};
        var assignableRelation: Map<RelationComparisonResult> = {};
        var identityRelation: Map<RelationComparisonResult> = {};

        function isTypeIdenticalTo(source: Type, target: Type): boolean {
            return checkTypeRelatedTo(source, target, identityRelation, /*errorNode*/ undefined);
        }

        function compareTypes(source: Type, target: Type): Ternary {
            return checkTypeRelatedTo(source, target, identityRelation, /*errorNode*/ undefined) ? Ternary.True : Ternary.False;
        }

        function isTypeSubtypeOf(source: Type, target: Type): boolean {
            return checkTypeSubtypeOf(source, target, /*errorNode*/ undefined);
        }

        function isTypeAssignableTo(source: Type, target: Type): boolean {
            return checkTypeAssignableTo(source, target, /*errorNode*/ undefined);
        }

        function checkTypeSubtypeOf(source: Type, target: Type, errorNode: Node, headMessage?: DiagnosticMessage, containingMessageChain?: DiagnosticMessageChain): boolean {
            return checkTypeRelatedTo(source, target, subtypeRelation, errorNode, headMessage, containingMessageChain);
        }

        function checkTypeAssignableTo(source: Type, target: Type, errorNode: Node, headMessage?: DiagnosticMessage): boolean {
            return checkTypeRelatedTo(source, target, assignableRelation, errorNode, headMessage);
        }

        function isSignatureAssignableTo(source: Signature, target: Signature): boolean {
            var sourceType = getOrCreateTypeFromSignature(source);
            var targetType = getOrCreateTypeFromSignature(target);
            return checkTypeRelatedTo(sourceType, targetType, assignableRelation, /*errorNode*/ undefined);
        }

        function checkTypeRelatedTo(
            source: Type,
            target: Type,
            relation: Map<RelationComparisonResult>,
            errorNode: Node,
            headMessage?: DiagnosticMessage,
            containingMessageChain?: DiagnosticMessageChain): boolean {

            var errorInfo: DiagnosticMessageChain;
            var sourceStack: ObjectType[];
            var targetStack: ObjectType[];
            var maybeStack: Map<RelationComparisonResult>[];
            var expandingFlags: number;
            var depth = 0;
            var overflow = false;

            Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");

            var result = isRelatedTo(source, target, errorNode !== undefined, headMessage);
            if (overflow) {
                error(errorNode, Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
            }
            else if (errorInfo) {
                // If we already computed this relation, but in a context where we didn't want to report errors (e.g. overload resolution),
                // then we'll only have a top-level error (e.g. 'Class X does not implement interface Y') without any details. If this happened,
                // request a recompuation to get a complete error message. This will be skipped if we've already done this computation in a context
                // where errors were being reported.
                if (errorInfo.next === undefined) {
                    errorInfo = undefined;
                    isRelatedTo(source, target, errorNode !== undefined, headMessage, /* elaborateErrors */ true);
                }
                if (containingMessageChain) {
                    errorInfo = concatenateDiagnosticMessageChains(containingMessageChain, errorInfo);
                }

                diagnostics.add(createDiagnosticForNodeFromMessageChain(errorNode, errorInfo, host.getCompilerHost().getNewLine()));
            }
            return result !== Ternary.False;

            function reportError(message: DiagnosticMessage, arg0?: string, arg1?: string, arg2?: string): void {
                errorInfo = chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2);
            }

            // Compare two types and return
            // Ternary.True if they are related with no assumptions,
            // Ternary.Maybe if they are related with assumptions of other relationships, or
            // Ternary.False if they are not related.
            function isRelatedTo(source: Type, target: Type, reportErrors?: boolean, headMessage?: DiagnosticMessage, elaborateErrors = false): Ternary {
                var result: Ternary;
                // both types are the same - covers 'they are the same primitive type or both are Any' or the same type parameter cases
                if (source === target) return Ternary.True;
                if (relation !== identityRelation) {
                    if (target.flags & TypeFlags.Any) return Ternary.True;
                    if (source === undefinedType) return Ternary.True;
                    if (source === nullType && target !== undefinedType) return Ternary.True;
                    if (source.flags & TypeFlags.Enum && target === numberType) return Ternary.True;
                    if (source.flags & TypeFlags.StringLiteral && target === stringType) return Ternary.True;
                    if (relation === assignableRelation) {
                        if (source.flags & TypeFlags.Any) return Ternary.True;
                        if (source === numberType && target.flags & TypeFlags.Enum) return Ternary.True;
                    }
                }
                if (source.flags & TypeFlags.Union || target.flags & TypeFlags.Union) {
                    if (relation === identityRelation) {
                        if (source.flags & TypeFlags.Union && target.flags & TypeFlags.Union) {
                            if (result = unionTypeRelatedToUnionType(<UnionType>source, <UnionType>target)) {
                                if (result &= unionTypeRelatedToUnionType(<UnionType>target, <UnionType>source)) {
                                    return result;
                                }
                            }
                        }
                        else if (source.flags & TypeFlags.Union) {
                            if (result = unionTypeRelatedToType(<UnionType>source, target, reportErrors)) {
                                return result;
                            }
                        }
                        else {
                            if (result = unionTypeRelatedToType(<UnionType>target, source, reportErrors)) {
                                return result;
                            }
                        }
                    }
                    else {
                        if (source.flags & TypeFlags.Union) {
                            if (result = unionTypeRelatedToType(<UnionType>source, target, reportErrors)) {
                                return result;
                            }
                        }
                        else {
                            if (result = typeRelatedToUnionType(source, <UnionType>target, reportErrors)) {
                                return result;
                            }
                        }
                    }
                }
                else if (source.flags & TypeFlags.TypeParameter && target.flags & TypeFlags.TypeParameter) {
                    if (result = typeParameterRelatedTo(<TypeParameter>source, <TypeParameter>target, reportErrors)) {
                        return result;
                    }
                }
                else {
                    var saveErrorInfo = errorInfo;
                    if (source.flags & TypeFlags.Reference && target.flags & TypeFlags.Reference && (<TypeReference>source).target === (<TypeReference>target).target) {
                        // We have type references to same target type, see if relationship holds for all type arguments
                        if (result = typesRelatedTo((<TypeReference>source).typeArguments, (<TypeReference>target).typeArguments, reportErrors)) {
                            return result;
                        }
                    }
                    // Even if relationship doesn't hold for type arguments, it may hold in a structural comparison
                    // Report structural errors only if we haven't reported any errors yet
                    var reportStructuralErrors = reportErrors && errorInfo === saveErrorInfo;
                    // identity relation does not use apparent type
                    var sourceOrApparentType = relation === identityRelation ? source : getApparentType(source);
                    if (sourceOrApparentType.flags & TypeFlags.ObjectType && target.flags & TypeFlags.ObjectType &&
                        (result = objectTypeRelatedTo(sourceOrApparentType, <ObjectType>target, reportStructuralErrors, elaborateErrors))) {
                        errorInfo = saveErrorInfo;
                        return result;
                    }
                }
                if (reportErrors) {
                    headMessage = headMessage || Diagnostics.Type_0_is_not_assignable_to_type_1;
                    var sourceType = typeToString(source);
                    var targetType = typeToString(target);
                    if (sourceType === targetType) {
                        sourceType = typeToString(source, /*enclosingDeclaration*/ undefined, TypeFormatFlags.UseFullyQualifiedType);
                        targetType = typeToString(target, /*enclosingDeclaration*/ undefined, TypeFormatFlags.UseFullyQualifiedType);
                    }
                    reportError(headMessage, sourceType, targetType);
                }
                return Ternary.False;
            }

            function unionTypeRelatedToUnionType(source: UnionType, target: UnionType): Ternary {
                var result = Ternary.True;
                var sourceTypes = source.types;
                for (var i = 0, len = sourceTypes.length; i < len; i++) {
                    var related = typeRelatedToUnionType(sourceTypes[i], target, false);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function typeRelatedToUnionType(source: Type, target: UnionType, reportErrors: boolean): Ternary {
                var targetTypes = target.types;
                for (var i = 0, len = targetTypes.length; i < len; i++) {
                    var related = isRelatedTo(source, targetTypes[i], reportErrors && i === len - 1);
                    if (related) {
                        return related;
                    }
                }
                return Ternary.False;
            }

            function unionTypeRelatedToType(source: UnionType, target: Type, reportErrors: boolean): Ternary {
                var result = Ternary.True;
                var sourceTypes = source.types;
                for (var i = 0, len = sourceTypes.length; i < len; i++) {
                    var related = isRelatedTo(sourceTypes[i], target, reportErrors);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function typesRelatedTo(sources: Type[], targets: Type[], reportErrors: boolean): Ternary {
                var result = Ternary.True;
                for (var i = 0, len = sources.length; i < len; i++) {
                    var related = isRelatedTo(sources[i], targets[i], reportErrors);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function typeParameterRelatedTo(source: TypeParameter, target: TypeParameter, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    if (source.symbol.name !== target.symbol.name) {
                        return Ternary.False;
                    }
                    // covers case when both type parameters does not have constraint (both equal to noConstraintType)
                    if (source.constraint === target.constraint) {
                        return Ternary.True;
                    }
                    if (source.constraint === noConstraintType || target.constraint === noConstraintType) {
                        return Ternary.False;
                    }
                    return isRelatedTo(source.constraint, target.constraint, reportErrors);
                }
                else {
                    while (true) {
                        var constraint = getConstraintOfTypeParameter(source);
                        if (constraint === target) return Ternary.True;
                        if (!(constraint && constraint.flags & TypeFlags.TypeParameter)) break;
                        source = <TypeParameter>constraint;
                    }
                    return Ternary.False;
                }
            }

            // Determine if two object types are related by structure. First, check if the result is already available in the global cache.
            // Second, check if we have already started a comparison of the given two types in which case we assume the result to be true.
            // Third, check if both types are part of deeply nested chains of generic type instantiations and if so assume the types are
            // equal and infinitely expanding. Fourth, if we have reached a depth of 100 nested comparisons, assume we have runaway recursion
            // and issue an error. Otherwise, actually compare the structure of the two types.
            function objectTypeRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean, elaborateErrors = false): Ternary {
                if (overflow) {
                    return Ternary.False;
                }
                var id = relation !== identityRelation || source.id < target.id ? source.id + "," + target.id : target.id + "," + source.id;
                var related = relation[id];
                //var related: RelationComparisonResult = undefined; // relation[id];
                if (related !== undefined) {
                    // If we computed this relation already and it was failed and reported, or if we're not being asked to elaborate
                    // errors, we can use the cached value. Otherwise, recompute the relation
                    if (!elaborateErrors || (related === RelationComparisonResult.FailedAndReported)) {
                        return related === RelationComparisonResult.Succeeded ? Ternary.True : Ternary.False;
                    }
                }
                if (depth > 0) {
                    for (var i = 0; i < depth; i++) {
                        // If source and target are already being compared, consider them related with assumptions
                        if (maybeStack[i][id]) {
                            return Ternary.Maybe;
                        }
                    }
                    if (depth === 100) {
                        overflow = true;
                        return Ternary.False;
                    }
                }
                else {
                    sourceStack = [];
                    targetStack = [];
                    maybeStack = [];
                    expandingFlags = 0;
                }
                sourceStack[depth] = source;
                targetStack[depth] = target;
                maybeStack[depth] = {};
                maybeStack[depth][id] = RelationComparisonResult.Succeeded;
                depth++;
                var saveExpandingFlags = expandingFlags;
                if (!(expandingFlags & 1) && isDeeplyNestedGeneric(source, sourceStack)) expandingFlags |= 1;
                if (!(expandingFlags & 2) && isDeeplyNestedGeneric(target, targetStack)) expandingFlags |= 2;
                if (expandingFlags === 3) {
                    var result = Ternary.Maybe;
                }
                else {
                    var result = propertiesRelatedTo(source, target, reportErrors);
                    if (result) {
                        result &= signaturesRelatedTo(source, target, SignatureKind.Call, reportErrors);
                        if (result) {
                            result &= signaturesRelatedTo(source, target, SignatureKind.Construct, reportErrors);
                            if (result) {
                                result &= stringIndexTypesRelatedTo(source, target, reportErrors);
                                if (result) {
                                    result &= numberIndexTypesRelatedTo(source, target, reportErrors);
                                }
                            }
                        }
                    }
                }
                expandingFlags = saveExpandingFlags;
                depth--;
                if (result) {
                    var maybeCache = maybeStack[depth];
                    // If result is definitely true, copy assumptions to global cache, else copy to next level up
                    var destinationCache = (result === Ternary.True || depth === 0) ? relation : maybeStack[depth - 1];
                    copyMap(maybeCache, destinationCache);
                }
                else {
                    // A false result goes straight into global cache (when something is false under assumptions it
                    // will also be false without assumptions)
                    relation[id] = reportErrors ? RelationComparisonResult.FailedAndReported : RelationComparisonResult.Failed;
                }
                return result;
            }

            // Return true if the given type is part of a deeply nested chain of generic instantiations. We consider this to be the case
            // when structural type comparisons have been started for 10 or more instantiations of the same generic type. It is possible,
            // though highly unlikely, for this test to be true in a situation where a chain of instantiations is not infinitely expanding.
            // Effectively, we will generate a false positive when two types are structurally equal to at least 10 levels, but unequal at
            // some level beyond that.
            function isDeeplyNestedGeneric(type: ObjectType, stack: ObjectType[]): boolean {
                if (type.flags & TypeFlags.Reference && depth >= 10) {
                    var target = (<TypeReference>type).target;
                    var count = 0;
                    for (var i = 0; i < depth; i++) {
                        var t = stack[i];
                        if (t.flags & TypeFlags.Reference && (<TypeReference>t).target === target) {
                            count++;
                            if (count >= 10) return true;
                        }
                    }
                }
                return false;
            }

            function propertiesRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return propertiesIdenticalTo(source, target);
                }
                var result = Ternary.True;
                var properties = getPropertiesOfObjectType(target);
                var requireOptionalProperties = relation === subtypeRelation && !(source.flags & TypeFlags.ObjectLiteral);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfType(source, targetProp.name);
                    if (sourceProp !== targetProp) {
                        if (!sourceProp) {
                            if (!(targetProp.flags & SymbolFlags.Optional) || requireOptionalProperties) {
                                if (reportErrors) {
                                    reportError(Diagnostics.Property_0_is_missing_in_type_1, symbolToString(targetProp), typeToString(source));
                                }
                                return Ternary.False;
                            }
                        }
                        else if (!(targetProp.flags & SymbolFlags.Prototype)) {
                            var sourceFlags = getDeclarationFlagsFromSymbol(sourceProp);
                            var targetFlags = getDeclarationFlagsFromSymbol(targetProp);
                            if (sourceFlags & NodeFlags.Private || targetFlags & NodeFlags.Private) {
                                if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                                    if (reportErrors) {
                                        if (sourceFlags & NodeFlags.Private && targetFlags & NodeFlags.Private) {
                                            reportError(Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                        }
                                        else {
                                            reportError(Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp),
                                                typeToString(sourceFlags & NodeFlags.Private ? source : target),
                                                typeToString(sourceFlags & NodeFlags.Private ? target : source));
                                        }
                                    }
                                    return Ternary.False;
                                }
                            }
                            else if (targetFlags & NodeFlags.Protected) {
                                var sourceDeclaredInClass = sourceProp.parent && sourceProp.parent.flags & SymbolFlags.Class;
                                var sourceClass = sourceDeclaredInClass ? <InterfaceType>getDeclaredTypeOfSymbol(sourceProp.parent) : undefined;
                                var targetClass = <InterfaceType>getDeclaredTypeOfSymbol(targetProp.parent);
                                if (!sourceClass || !hasBaseType(sourceClass, targetClass)) {
                                    if (reportErrors) {
                                        reportError(Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2,
                                            symbolToString(targetProp), typeToString(sourceClass || source), typeToString(targetClass));
                                    }
                                    return Ternary.False;
                                }
                            }
                            else if (sourceFlags & NodeFlags.Protected) {
                                if (reportErrors) {
                                    reportError(Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2,
                                        symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return Ternary.False;
                            }
                            var related = isRelatedTo(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
                            if (!related) {
                                if (reportErrors) {
                                    reportError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                                }
                                return Ternary.False;
                            }
                            result &= related;
                            if (sourceProp.flags & SymbolFlags.Optional && !(targetProp.flags & SymbolFlags.Optional)) {
                                // TypeScript 1.0 spec (April 2014): 3.8.3
                                // S is a subtype of a type T, and T is a supertype of S if ...
                                // S' and T are object types and, for each member M in T..
                                // M is a property and S' contains a property N where
                                // if M is a required property, N is also a required property 
                                // (M - property in T)
                                // (N - property in S)
                                if (reportErrors) {
                                    reportError(Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2,
                                        symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return Ternary.False;
                            }
                        }
                    }
                }
                return result;
            }

            function propertiesIdenticalTo(source: ObjectType, target: ObjectType): Ternary {
                var sourceProperties = getPropertiesOfObjectType(source);
                var targetProperties = getPropertiesOfObjectType(target);
                if (sourceProperties.length !== targetProperties.length) {
                    return Ternary.False;
                }
                var result = Ternary.True;
                for (var i = 0, len = sourceProperties.length; i < len; ++i) {
                    var sourceProp = sourceProperties[i];
                    var targetProp = getPropertyOfObjectType(target, sourceProp.name);
                    if (!targetProp) {
                        return Ternary.False;
                    }
                    var related = compareProperties(sourceProp, targetProp, isRelatedTo);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function signaturesRelatedTo(source: ObjectType, target: ObjectType, kind: SignatureKind, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return signaturesIdenticalTo(source, target, kind);
                }
                if (target === anyFunctionType || source === anyFunctionType) {
                    return Ternary.True;
                }
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var result = Ternary.True;
                var saveErrorInfo = errorInfo;
                outer: for (var i = 0; i < targetSignatures.length; i++) {
                    var t = targetSignatures[i];
                    if (!t.hasStringLiterals || target.flags & TypeFlags.FromSignature) {
                        var localErrors = reportErrors;
                        for (var j = 0; j < sourceSignatures.length; j++) {
                            var s = sourceSignatures[j];
                            if (!s.hasStringLiterals || source.flags & TypeFlags.FromSignature) {
                                var related = signatureRelatedTo(s, t, localErrors);
                                if (related) {
                                    result &= related;
                                    errorInfo = saveErrorInfo;
                                    continue outer;
                                }
                                // Only report errors from the first failure
                                localErrors = false;
                            }
                        }
                        return Ternary.False;
                    }
                }
                return result;
            }

            function signatureRelatedTo(source: Signature, target: Signature, reportErrors: boolean): Ternary {
                if (source === target) {
                    return Ternary.True;
                }
                if (!target.hasRestParameter && source.minArgumentCount > target.parameters.length) {
                    return Ternary.False;
                }
                var sourceMax = source.parameters.length;
                var targetMax = target.parameters.length;
                var checkCount: number;
                if (source.hasRestParameter && target.hasRestParameter) {
                    checkCount = sourceMax > targetMax ? sourceMax : targetMax;
                    sourceMax--;
                    targetMax--;
                }
                else if (source.hasRestParameter) {
                    sourceMax--;
                    checkCount = targetMax;
                }
                else if (target.hasRestParameter) {
                    targetMax--;
                    checkCount = sourceMax;
                }
                else {
                    checkCount = sourceMax < targetMax ? sourceMax : targetMax;
                }
                // Spec 1.0 Section 3.8.3 & 3.8.4:
                // M and N (the signatures) are instantiated using type Any as the type argument for all type parameters declared by M and N
                source = getErasedSignature(source);
                target = getErasedSignature(target);
                var result = Ternary.True;
                for (var i = 0; i < checkCount; i++) {
                    var s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                    var t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                    var saveErrorInfo = errorInfo;
                    var related = isRelatedTo(s, t, reportErrors);
                    if (!related) {
                        related = isRelatedTo(t, s, false);
                        if (!related) {
                            if (reportErrors) {
                                reportError(Diagnostics.Types_of_parameters_0_and_1_are_incompatible,
                                    source.parameters[i < sourceMax ? i : sourceMax].name,
                                    target.parameters[i < targetMax ? i : targetMax].name);
                            }
                            return Ternary.False;
                        }
                        errorInfo = saveErrorInfo;
                    }
                    result &= related;
                }
                var t = getReturnTypeOfSignature(target);
                if (t === voidType) return result;
                var s = getReturnTypeOfSignature(source);
                return result & isRelatedTo(s, t, reportErrors);
            }

            function signaturesIdenticalTo(source: ObjectType, target: ObjectType, kind: SignatureKind): Ternary {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                if (sourceSignatures.length !== targetSignatures.length) {
                    return Ternary.False;
                }
                var result = Ternary.True;
                for (var i = 0, len = sourceSignatures.length; i < len; ++i) {
                    var related = compareSignatures(sourceSignatures[i], targetSignatures[i], /*compareReturnTypes*/ true, isRelatedTo);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function stringIndexTypesRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(IndexKind.String, source, target);
                }
                var targetType = getIndexTypeOfType(target, IndexKind.String);
                if (targetType) {
                    var sourceType = getIndexTypeOfType(source, IndexKind.String);
                    if (!sourceType) {
                        if (reportErrors) {
                            reportError(Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return Ternary.False;
                    }
                    var related = isRelatedTo(sourceType, targetType, reportErrors);
                    if (!related) {
                        if (reportErrors) {
                            reportError(Diagnostics.Index_signatures_are_incompatible);
                        }
                        return Ternary.False;
                    }
                    return related;
                }
                return Ternary.True;
            }

            function numberIndexTypesRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(IndexKind.Number, source, target);
                }
                var targetType = getIndexTypeOfType(target, IndexKind.Number);
                if (targetType) {
                    var sourceStringType = getIndexTypeOfType(source, IndexKind.String);
                    var sourceNumberType = getIndexTypeOfType(source, IndexKind.Number);
                    if (!(sourceStringType || sourceNumberType)) {
                        if (reportErrors) {
                            reportError(Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return Ternary.False;
                    }
                    if (sourceStringType && sourceNumberType) {
                        // If we know for sure we're testing both string and numeric index types then only report errors from the second one
                        var related = isRelatedTo(sourceStringType, targetType, false) || isRelatedTo(sourceNumberType, targetType, reportErrors);
                    }
                    else {
                        var related = isRelatedTo(sourceStringType || sourceNumberType, targetType, reportErrors);
                    }
                    if (!related) {
                        if (reportErrors) {
                            reportError(Diagnostics.Index_signatures_are_incompatible);
                        }
                        return Ternary.False;
                    }
                    return related;
                }
                return Ternary.True;
            }

            function indexTypesIdenticalTo(indexKind: IndexKind, source: ObjectType, target: ObjectType): Ternary {
                var targetType = getIndexTypeOfType(target, indexKind);
                var sourceType = getIndexTypeOfType(source, indexKind);
                if (!sourceType && !targetType) {
                    return Ternary.True;
                }
                if (sourceType && targetType) {
                    return isRelatedTo(sourceType, targetType);
                }
                return Ternary.False;
            }
        }

        function isPropertyIdenticalTo(sourceProp: Symbol, targetProp: Symbol): boolean {
            return compareProperties(sourceProp, targetProp, compareTypes) !== Ternary.False;
        }

        function compareProperties(sourceProp: Symbol, targetProp: Symbol, compareTypes: (source: Type, target: Type) => Ternary): Ternary {
            // Two members are considered identical when
            // - they are public properties with identical names, optionality, and types,
            // - they are private or protected properties originating in the same declaration and having identical types
            if (sourceProp === targetProp) {
                return Ternary.True;
            }
            var sourcePropAccessibility = getDeclarationFlagsFromSymbol(sourceProp) & (NodeFlags.Private | NodeFlags.Protected);
            var targetPropAccessibility = getDeclarationFlagsFromSymbol(targetProp) & (NodeFlags.Private | NodeFlags.Protected);
            if (sourcePropAccessibility !== targetPropAccessibility) {
                return Ternary.False;
            }
            if (sourcePropAccessibility) {
                if (getTargetSymbol(sourceProp) !== getTargetSymbol(targetProp)) {
                    return Ternary.False;
                }
            }
            else {
                if ((sourceProp.flags & SymbolFlags.Optional) !== (targetProp.flags & SymbolFlags.Optional)) {
                    return Ternary.False;
                }
            }
            return compareTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
        }

        function compareSignatures(source: Signature, target: Signature, compareReturnTypes: boolean, compareTypes: (s: Type, t: Type) => Ternary): Ternary {
            if (source === target) {
                return Ternary.True;
            }
            if (source.parameters.length !== target.parameters.length ||
                source.minArgumentCount !== target.minArgumentCount ||
                source.hasRestParameter !== target.hasRestParameter) {
                return Ternary.False;
            }
            var result = Ternary.True;
            if (source.typeParameters && target.typeParameters) {
                if (source.typeParameters.length !== target.typeParameters.length) {
                    return Ternary.False;
                }
                for (var i = 0, len = source.typeParameters.length; i < len; ++i) {
                    var related = compareTypes(source.typeParameters[i], target.typeParameters[i]);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
            }
            else if (source.typeParameters || target.typeParameters) {
                return Ternary.False;
            }
            // Spec 1.0 Section 3.8.3 & 3.8.4:
            // M and N (the signatures) are instantiated using type Any as the type argument for all type parameters declared by M and N
            source = getErasedSignature(source);
            target = getErasedSignature(target);
            for (var i = 0, len = source.parameters.length; i < len; i++) {
                var s = source.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(source) : getTypeOfSymbol(source.parameters[i]);
                var t = target.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(target) : getTypeOfSymbol(target.parameters[i]);
                var related = compareTypes(s, t);
                if (!related) {
                    return Ternary.False;
                }
                result &= related;
            }
            if (compareReturnTypes) {
                result &= compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            return result;
        }

        function isSupertypeOfEach(candidate: Type, types: Type[]): boolean {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && !isTypeSubtypeOf(types[i], candidate)) return false;
            }
            return true;
        }

        function getCommonSupertype(types: Type[]): Type {
            return forEach(types, t => isSupertypeOfEach(t, types) ? t : undefined);
        }

        function reportNoCommonSupertypeError(types: Type[], errorLocation: Node, errorMessageChainHead: DiagnosticMessageChain): void {
            var bestSupertype: Type;
            var bestSupertypeDownfallType: Type; // The type that caused bestSupertype not to be the common supertype
            var bestSupertypeScore = 0;

            for (var i = 0; i < types.length; i++) {
                var score = 0;
                var downfallType: Type = undefined;
                for (var j = 0; j < types.length; j++) {
                    if (isTypeSubtypeOf(types[j], types[i])) {
                        score++;
                    }
                    else if (!downfallType) {
                        downfallType = types[j];
                    }
                }

                if (score > bestSupertypeScore) {
                    bestSupertype = types[i];
                    bestSupertypeDownfallType = downfallType;
                    bestSupertypeScore = score;
                }

                // types.length - 1 is the maximum score, given that getCommonSupertype returned false
                if (bestSupertypeScore === types.length - 1) {
                    break;
                }
            }

            // In the following errors, the {1} slot is before the {0} slot because checkTypeSubtypeOf supplies the
            // subtype as the first argument to the error
            checkTypeSubtypeOf(bestSupertypeDownfallType, bestSupertype, errorLocation,
                Diagnostics.Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0,
                errorMessageChainHead);
        }

        function isArrayType(type: Type): boolean {
            return type.flags & TypeFlags.Reference && (<TypeReference>type).target === globalArrayType;
        }

        function isTupleLikeType(type: Type): boolean {
            return !!getPropertyOfType(type, "0");
        }

        function getWidenedTypeOfObjectLiteral(type: Type): Type {
            var properties = getPropertiesOfObjectType(type);
            var members: SymbolTable = {};
            forEach(properties, p => {
                var propType = getTypeOfSymbol(p);
                var widenedType = getWidenedType(propType);
                if (propType !== widenedType) {
                    var symbol = <TransientSymbol>createSymbol(p.flags | SymbolFlags.Transient, p.name);
                    symbol.declarations = p.declarations;
                    symbol.parent = p.parent;
                    symbol.type = widenedType;
                    symbol.target = p;
                    if (p.valueDeclaration) symbol.valueDeclaration = p.valueDeclaration;
                    p = symbol;
                }
                members[p.name] = p;
            });
            var stringIndexType = getIndexTypeOfType(type, IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, IndexKind.Number);
            if (stringIndexType) stringIndexType = getWidenedType(stringIndexType);
            if (numberIndexType) numberIndexType = getWidenedType(numberIndexType);
            return createAnonymousType(type.symbol, members, emptyArray, emptyArray, stringIndexType, numberIndexType);
        }

        function getWidenedType(type: Type): Type {
            if (type.flags & TypeFlags.RequiresWidening) {
                if (type.flags & (TypeFlags.Undefined | TypeFlags.Null)) {
                    return anyType;
                }
                if (type.flags & TypeFlags.ObjectLiteral) {
                    return getWidenedTypeOfObjectLiteral(type);
                }
                if (type.flags & TypeFlags.Union) {
                    return getUnionType(map((<UnionType>type).types, getWidenedType));
                }
                if (isArrayType(type)) {
                    return createArrayType(getWidenedType((<TypeReference>type).typeArguments[0]));
                }
            }
            return type;
        }

        function reportWideningErrorsInType(type: Type): boolean {
            if (type.flags & TypeFlags.Union) {
                var errorReported = false;
                forEach((<UnionType>type).types, t => {
                    if (reportWideningErrorsInType(t)) {
                        errorReported = true;
                    }
                });
                return errorReported;
            }
            if (isArrayType(type)) {
                return reportWideningErrorsInType((<TypeReference>type).typeArguments[0]);
            }
            if (type.flags & TypeFlags.ObjectLiteral) {
                var errorReported = false;
                forEach(getPropertiesOfObjectType(type), p => {
                    var t = getTypeOfSymbol(p);
                    if (t.flags & TypeFlags.ContainsUndefinedOrNull) {
                        if (!reportWideningErrorsInType(t)) {
                            error(p.valueDeclaration, Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, p.name, typeToString(getWidenedType(t)));
                        }
                        errorReported = true;
                    }
                });
                return errorReported;
            }
            return false;
        }

        function reportImplicitAnyError(declaration: Declaration, type: Type) {
            var typeAsString = typeToString(getWidenedType(type));
            switch (declaration.kind) {
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    var diagnostic = Diagnostics.Member_0_implicitly_has_an_1_type;
                    break;
                case SyntaxKind.Parameter:
                    var diagnostic = (<ParameterDeclaration>declaration).dotDotDotToken ?
                        Diagnostics.Rest_parameter_0_implicitly_has_an_any_type :
                        Diagnostics.Parameter_0_implicitly_has_an_1_type;
                    break;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    if (!declaration.name) {
                        error(declaration, Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                        return;
                    }
                    var diagnostic = Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                    break;
                default:
                    var diagnostic = Diagnostics.Variable_0_implicitly_has_an_1_type;
            }
            error(declaration, diagnostic, declarationNameToString(declaration.name), typeAsString);
        }

        function reportErrorsFromWidening(declaration: Declaration, type: Type) {
            if (produceDiagnostics && compilerOptions.noImplicitAny && type.flags & TypeFlags.ContainsUndefinedOrNull) {
                // Report implicit any error within type if possible, otherwise report error on declaration
                if (!reportWideningErrorsInType(type)) {
                    reportImplicitAnyError(declaration, type);
                }
            }
        }

        function forEachMatchingParameterType(source: Signature, target: Signature, callback: (s: Type, t: Type) => void) {
            var sourceMax = source.parameters.length;
            var targetMax = target.parameters.length;
            var count: number;
            if (source.hasRestParameter && target.hasRestParameter) {
                count = sourceMax > targetMax ? sourceMax : targetMax;
                sourceMax--;
                targetMax--;
            }
            else if (source.hasRestParameter) {
                sourceMax--;
                count = targetMax;
            }
            else if (target.hasRestParameter) {
                targetMax--;
                count = sourceMax;
            }
            else {
                count = sourceMax < targetMax ? sourceMax : targetMax;
            }
            for (var i = 0; i < count; i++) {
                var s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                var t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                callback(s, t);
            }
        }

        function createInferenceContext(typeParameters: TypeParameter[], inferUnionTypes: boolean): InferenceContext {
            var inferences: TypeInferences[] = [];
            for (var i = 0; i < typeParameters.length; i++) {
                inferences.push({ primary: undefined, secondary: undefined });
            }
            return {
                typeParameters: typeParameters,
                inferUnionTypes: inferUnionTypes,
                inferenceCount: 0,
                inferences: inferences,
                inferredTypes: new Array(typeParameters.length),
            };
        }

        function inferTypes(context: InferenceContext, source: Type, target: Type) {
            var sourceStack: Type[];
            var targetStack: Type[];
            var depth = 0;
            var inferiority = 0;
            inferFromTypes(source, target);

            function isInProcess(source: Type, target: Type) {
                for (var i = 0; i < depth; i++) {
                    if (source === sourceStack[i] && target === targetStack[i]) return true;
                }
                return false;
            }

            function isWithinDepthLimit(type: Type, stack: Type[]) {
                if (depth >= 5) {
                    var target = (<TypeReference>type).target;
                    var count = 0;
                    for (var i = 0; i < depth; i++) {
                        var t = stack[i];
                        if (t.flags & TypeFlags.Reference && (<TypeReference>t).target === target) count++;
                    }
                    return count < 5;
                }
                return true;
            }

            function inferFromTypes(source: Type, target: Type) {
                if (source === anyFunctionType) {
                    return;
                }
                if (target.flags & TypeFlags.TypeParameter) {
                    // If target is a type parameter, make an inference
                    var typeParameters = context.typeParameters;
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (target === typeParameters[i]) {
                            var inferences = context.inferences[i];
                            var candidates = inferiority ?
                                inferences.secondary || (inferences.secondary = []) :
                                inferences.primary || (inferences.primary = []);
                            if (!contains(candidates, source)) candidates.push(source);
                            break;
                        }
                    }
                }
                else if (source.flags & TypeFlags.Reference && target.flags & TypeFlags.Reference && (<TypeReference>source).target === (<TypeReference>target).target) {
                    // If source and target are references to the same generic type, infer from type arguments
                    var sourceTypes = (<TypeReference>source).typeArguments;
                    var targetTypes = (<TypeReference>target).typeArguments;
                    for (var i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], targetTypes[i]);
                    }
                }
                else if (target.flags & TypeFlags.Union) {
                    var targetTypes = (<UnionType>target).types;
                    var typeParameterCount = 0;
                    var typeParameter: TypeParameter;
                    // First infer to each type in union that isn't a type parameter
                    for (var i = 0; i < targetTypes.length; i++) {
                        var t = targetTypes[i];
                        if (t.flags & TypeFlags.TypeParameter && contains(context.typeParameters, t)) {
                            typeParameter = <TypeParameter>t;
                            typeParameterCount++;
                        }
                        else {
                            inferFromTypes(source, t);
                        }
                    }
                    // If union contains a single naked type parameter, make a secondary inference to that type parameter
                    if (typeParameterCount === 1) {
                        inferiority++;
                        inferFromTypes(source, typeParameter);
                        inferiority--;
                    }
                }
                else if (source.flags & TypeFlags.Union) {
                    // Source is a union type, infer from each consituent type
                    var sourceTypes = (<UnionType>source).types;
                    for (var i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], target);
                    }
                }
                else if (source.flags & TypeFlags.ObjectType && (target.flags & (TypeFlags.Reference | TypeFlags.Tuple) ||
                    (target.flags & TypeFlags.Anonymous) && target.symbol && target.symbol.flags & (SymbolFlags.Method | SymbolFlags.TypeLiteral))) {
                    // If source is an object type, and target is a type reference, a tuple type, the type of a method, or a type literal, infer from members
                    if (!isInProcess(source, target) && isWithinDepthLimit(source, sourceStack) && isWithinDepthLimit(target, targetStack)) {
                        if (depth === 0) {
                            sourceStack = [];
                            targetStack = [];
                        }
                        sourceStack[depth] = source;
                        targetStack[depth] = target;
                        depth++;
                        inferFromProperties(source, target);
                        inferFromSignatures(source, target, SignatureKind.Call);
                        inferFromSignatures(source, target, SignatureKind.Construct);
                        inferFromIndexTypes(source, target, IndexKind.String, IndexKind.String);
                        inferFromIndexTypes(source, target, IndexKind.Number, IndexKind.Number);
                        inferFromIndexTypes(source, target, IndexKind.String, IndexKind.Number);
                        depth--;
                    }
                }
            }

            function inferFromProperties(source: Type, target: Type) {
                var properties = getPropertiesOfObjectType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfObjectType(source, targetProp.name);
                    if (sourceProp) {
                        inferFromTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
                    }
                }
            }

            function inferFromSignatures(source: Type, target: Type, kind: SignatureKind) {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var sourceLen = sourceSignatures.length;
                var targetLen = targetSignatures.length;
                var len = sourceLen < targetLen ? sourceLen : targetLen;
                for (var i = 0; i < len; i++) {
                    inferFromSignature(getErasedSignature(sourceSignatures[sourceLen - len + i]), getErasedSignature(targetSignatures[targetLen - len + i]));
                }
            }

            function inferFromSignature(source: Signature, target: Signature) {
                forEachMatchingParameterType(source, target, inferFromTypes);
                inferFromTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }

            function inferFromIndexTypes(source: Type, target: Type, sourceKind: IndexKind, targetKind: IndexKind) {
                var targetIndexType = getIndexTypeOfType(target, targetKind);
                if (targetIndexType) {
                    var sourceIndexType = getIndexTypeOfType(source, sourceKind);
                    if (sourceIndexType) {
                        inferFromTypes(sourceIndexType, targetIndexType);
                    }
                }
            }
        }

        function getInferenceCandidates(context: InferenceContext, index: number): Type[] {
            var inferences = context.inferences[index];
            return inferences.primary || inferences.secondary || emptyArray;
        }

        function getInferredType(context: InferenceContext, index: number): Type {
            var inferredType = context.inferredTypes[index];
            if (!inferredType) {
                var inferences = getInferenceCandidates(context, index);
                if (inferences.length) {
                    // Infer widened union or supertype, or the undefined type for no common supertype
                    var unionOrSuperType = context.inferUnionTypes ? getUnionType(inferences) : getCommonSupertype(inferences);
                    inferredType = unionOrSuperType ? getWidenedType(unionOrSuperType) : inferenceFailureType;
                }
                else {
                    // Infer the empty object type when no inferences were made
                    inferredType = emptyObjectType;
                }
                if (inferredType !== inferenceFailureType) {
                    var constraint = getConstraintOfTypeParameter(context.typeParameters[index]);
                    inferredType = constraint && !isTypeAssignableTo(inferredType, constraint) ? constraint : inferredType;
                }
                context.inferredTypes[index] = inferredType;
            }
            return inferredType;
        }

        function getInferredTypes(context: InferenceContext): Type[] {
            for (var i = 0; i < context.inferredTypes.length; i++) {
                getInferredType(context, i);
            }

            return context.inferredTypes;
        }

        function hasAncestor(node: Node, kind: SyntaxKind): boolean {
            return getAncestor(node, kind) !== undefined;
        }

        // EXPRESSION TYPE CHECKING

        function getResolvedSymbol(node: Identifier): Symbol {
            var links = getNodeLinks(node);
            if (!links.resolvedSymbol) {
                links.resolvedSymbol = (getFullWidth(node) > 0 && resolveName(node, node.text, SymbolFlags.Value | SymbolFlags.ExportValue, Diagnostics.Cannot_find_name_0, node)) || unknownSymbol;
            }
            return links.resolvedSymbol;
        }

        function isInTypeQuery(node: Node): boolean {
            // TypeScript 1.0 spec (April 2014): 3.6.3
            // A type query consists of the keyword typeof followed by an expression.
            // The expression is restricted to a single identifier or a sequence of identifiers separated by periods
            while (node) {
                switch (node.kind) {
                    case SyntaxKind.TypeQuery:
                        return true;
                    case SyntaxKind.Identifier:
                    case SyntaxKind.QualifiedName:
                        node = node.parent;
                        continue;
                    default:
                        return false;
                }
            }
            Debug.fail("should not get here");
        }

        // For a union type, remove all constituent types that are of the given type kind (when isOfTypeKind is true)
        // or not of the given type kind (when isOfTypeKind is false)
        function removeTypesFromUnionType(type: Type, typeKind: TypeFlags, isOfTypeKind: boolean): Type {
            if (type.flags & TypeFlags.Union) {
                var types = (<UnionType>type).types;
                if (forEach(types, t => !!(t.flags & typeKind) === isOfTypeKind)) {
                    // Above we checked if we have anything to remove, now use the opposite test to do the removal
                    var narrowedType = getUnionType(filter(types, t => !(t.flags & typeKind) === isOfTypeKind));
                    if (narrowedType !== emptyObjectType) {
                        return narrowedType;
                    }
                }
            }
            return type;
        }

        function hasInitializer(node: VariableLikeDeclaration): boolean {
            return !!(node.initializer || isBindingPattern(node.parent) && hasInitializer(<VariableLikeDeclaration>node.parent.parent));
        }

        // Check if a given variable is assigned within a given syntax node
        function isVariableAssignedWithin(symbol: Symbol, node: Node): boolean {
            var links = getNodeLinks(node);
            if (links.assignmentChecks) {
                var cachedResult = links.assignmentChecks[symbol.id];
                if (cachedResult !== undefined) {
                    return cachedResult;
                }
            }
            else {
                links.assignmentChecks = {};
            }
            return links.assignmentChecks[symbol.id] = isAssignedIn(node);

            function isAssignedInBinaryExpression(node: BinaryExpression) {
                if (node.operator >= SyntaxKind.FirstAssignment && node.operator <= SyntaxKind.LastAssignment) {
                    var n = node.left;
                    while (n.kind === SyntaxKind.ParenthesizedExpression) {
                        n = (<ParenthesizedExpression>n).expression;
                    }
                    if (n.kind === SyntaxKind.Identifier && getResolvedSymbol(<Identifier>n) === symbol) {
                        return true;
                    }
                }
                return forEachChild(node, isAssignedIn);
            }

            function isAssignedInVariableDeclaration(node: VariableLikeDeclaration) {
                if (!isBindingPattern(node.name) && getSymbolOfNode(node) === symbol && hasInitializer(node)) {
                    return true;
                }
                return forEachChild(node, isAssignedIn);
            }

            function isAssignedIn(node: Node): boolean {
                switch (node.kind) {
                    case SyntaxKind.BinaryExpression:
                        return isAssignedInBinaryExpression(<BinaryExpression>node);
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.BindingElement:
                        return isAssignedInVariableDeclaration(<VariableLikeDeclaration>node);
                    case SyntaxKind.ObjectBindingPattern:
                    case SyntaxKind.ArrayBindingPattern:
                    case SyntaxKind.ArrayLiteralExpression:
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.ElementAccessExpression:
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.TypeAssertionExpression:
                    case SyntaxKind.ParenthesizedExpression:
                    case SyntaxKind.PrefixUnaryExpression:
                    case SyntaxKind.DeleteExpression:
                    case SyntaxKind.TypeOfExpression:
                    case SyntaxKind.VoidExpression:
                    case SyntaxKind.PostfixUnaryExpression:
                    case SyntaxKind.ConditionalExpression:
                    case SyntaxKind.SpreadElementExpression:
                    case SyntaxKind.Block:
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.ExpressionStatement:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.CatchClause:
                        return forEachChild(node, isAssignedIn);
                }
                return false;
            }
        }

        function resolveLocation(node: Node) {
            // Resolve location from top down towards node if it is a context sensitive expression
            // That helps in making sure not assigning types as any when resolved out of order
            var containerNodes: Node[] = [];
            for (var parent = node.parent; parent; parent = parent.parent) {
                if ((isExpression(parent) || isObjectLiteralMethod(node)) &&
                    isContextSensitive(<Expression>parent)) {
                    containerNodes.unshift(parent);
                }
            }

            ts.forEach(containerNodes, node => { getTypeOfNode(node); });
        }

        function getSymbolAtLocation(node: Node): Symbol {
            resolveLocation(node);
            return getSymbolInfo(node);
        }

        function getTypeAtLocation(node: Node): Type {
            resolveLocation(node);
            return getTypeOfNode(node);
        }

        function getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type {
            resolveLocation(node);
            // Get the narrowed type of symbol at given location instead of just getting 
            // the type of the symbol.
            // eg. 
            // function foo(a: string | number) {
            //     if (typeof a === "string") {
            //         a/**/
            //     }
            // }
            // getTypeOfSymbol for a would return type of parameter symbol string | number
            // Unless we provide location /**/, checker wouldn't know how to narrow the type
            // By using getNarrowedTypeOfSymbol would return string since it would be able to narrow
            // it by typeguard in the if true condition
            return getNarrowedTypeOfSymbol(symbol, node);
        }

        // Get the narrowed type of a given symbol at a given location
        function getNarrowedTypeOfSymbol(symbol: Symbol, node: Node) {
            var type = getTypeOfSymbol(symbol);
            // Only narrow when symbol is variable of type any or an object, union, or type parameter type
            if (node && symbol.flags & SymbolFlags.Variable && type.flags & (TypeFlags.Any | TypeFlags.ObjectType | TypeFlags.Union | TypeFlags.TypeParameter)) {
                loop: while (node.parent) {
                    var child = node;
                    node = node.parent;
                    var narrowedType = type;
                    switch (node.kind) {
                        case SyntaxKind.IfStatement:
                            // In a branch of an if statement, narrow based on controlling expression
                            if (child !== (<IfStatement>node).expression) {
                                narrowedType = narrowType(type, (<IfStatement>node).expression, /*assumeTrue*/ child === (<IfStatement>node).thenStatement);
                            }
                            break;
                        case SyntaxKind.ConditionalExpression:
                            // In a branch of a conditional expression, narrow based on controlling condition
                            if (child !== (<ConditionalExpression>node).condition) {
                                narrowedType = narrowType(type, (<ConditionalExpression>node).condition, /*assumeTrue*/ child === (<ConditionalExpression>node).whenTrue);
                            }
                            break;
                        case SyntaxKind.BinaryExpression:
                            // In the right operand of an && or ||, narrow based on left operand
                            if (child === (<BinaryExpression>node).right) {
                                if ((<BinaryExpression>node).operator === SyntaxKind.AmpersandAmpersandToken) {
                                    narrowedType = narrowType(type, (<BinaryExpression>node).left, /*assumeTrue*/ true);
                                }
                                else if ((<BinaryExpression>node).operator === SyntaxKind.BarBarToken) {
                                    narrowedType = narrowType(type, (<BinaryExpression>node).left, /*assumeTrue*/ false);
                                }
                            }
                            break;
                        case SyntaxKind.SourceFile:
                        case SyntaxKind.ModuleDeclaration:
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                        case SyntaxKind.GetAccessor:
                        case SyntaxKind.SetAccessor:
                        case SyntaxKind.Constructor:
                            // Stop at the first containing function or module declaration
                            break loop;
                    }
                    // Use narrowed type if construct contains no assignments to variable
                    if (narrowedType !== type) {
                        if (isVariableAssignedWithin(symbol, node)) {
                            break;
                        }
                        type = narrowedType;
                    }
                }
            }
            return type;

            function narrowTypeByEquality(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                // Check that we have 'typeof <symbol>' on the left and string literal on the right
                if (expr.left.kind !== SyntaxKind.TypeOfExpression || expr.right.kind !== SyntaxKind.StringLiteral) {
                    return type;
                }
                var left = <TypeOfExpression>expr.left;
                var right = <LiteralExpression>expr.right;
                if (left.expression.kind !== SyntaxKind.Identifier || getResolvedSymbol(<Identifier>left.expression) !== symbol) {
                    return type;
                }
                var typeInfo = primitiveTypeInfo[right.text];
                if (expr.operator === SyntaxKind.ExclamationEqualsEqualsToken) {
                    assumeTrue = !assumeTrue;
                }
                if (assumeTrue) {
                    // Assumed result is true. If check was not for a primitive type, remove all primitive types
                    if (!typeInfo) {
                        return removeTypesFromUnionType(type, /*typeKind*/ TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.Boolean, /*isOfTypeKind*/ true);
                    }
                    // Check was for a primitive type, return that primitive type if it is a subtype
                    if (isTypeSubtypeOf(typeInfo.type, type)) {
                        return typeInfo.type;
                    }
                    // Otherwise, remove all types that aren't of the primitive type kind. This can happen when the type is
                    // union of enum types and other types.
                    return removeTypesFromUnionType(type, /*typeKind*/ typeInfo.flags, /*isOfTypeKind*/ false);
                }
                else {
                    // Assumed result is false. If check was for a primitive type, remove that primitive type
                    if (typeInfo) {
                        return removeTypesFromUnionType(type, /*typeKind*/ typeInfo.flags, /*isOfTypeKind*/ true);
                    }
                    // Otherwise we don't have enough information to do anything.
                    return type;
                }
            }

            function narrowTypeByAnd(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                if (assumeTrue) {
                    // The assumed result is true, therefore we narrow assuming each operand to be true.
                    return narrowType(narrowType(type, expr.left, /*assumeTrue*/ true), expr.right, /*assumeTrue*/ true);
                }
                else {
                    // The assumed result is false. This means either the first operand was false, or the first operand was true
                    // and the second operand was false. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, /*assumeTrue*/ false),
                        narrowType(narrowType(type, expr.left, /*assumeTrue*/ true), expr.right, /*assumeTrue*/ false)
                    ]);
                }
            }

            function narrowTypeByOr(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                if (assumeTrue) {
                    // The assumed result is true. This means either the first operand was true, or the first operand was false
                    // and the second operand was true. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, /*assumeTrue*/ true),
                        narrowType(narrowType(type, expr.left, /*assumeTrue*/ false), expr.right, /*assumeTrue*/ true)
                    ]);
                }
                else {
                    // The assumed result is false, therefore we narrow assuming each operand to be false.
                    return narrowType(narrowType(type, expr.left, /*assumeTrue*/ false), expr.right, /*assumeTrue*/ false);
                }
            }

            function narrowTypeByInstanceof(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                // Check that type is not any, assumed result is true, and we have variable symbol on the left
                if (type.flags & TypeFlags.Any || !assumeTrue || expr.left.kind !== SyntaxKind.Identifier || getResolvedSymbol(<Identifier>expr.left) !== symbol) {
                    return type;
                }
                // Check that right operand is a function type with a prototype property
                var rightType = checkExpression(expr.right);
                if (!isTypeSubtypeOf(rightType, globalFunctionType)) {
                    return type;
                }
                // Target type is type of prototype property
                var prototypeProperty = getPropertyOfType(rightType, "prototype");
                if (!prototypeProperty) {
                    return type;
                }
                var targetType = getTypeOfSymbol(prototypeProperty);
                // Narrow to target type if it is a subtype of current type
                if (isTypeSubtypeOf(targetType, type)) {
                    return targetType;
                }
                // If current type is a union type, remove all constituents that aren't subtypes of target type
                if (type.flags & TypeFlags.Union) {
                    return getUnionType(filter((<UnionType>type).types, t => isTypeSubtypeOf(t, targetType)));
                }
                return type;
            }

            // Narrow the given type based on the given expression having the assumed boolean value. The returned type
            // will be a subtype or the same type as the argument.
            function narrowType(type: Type, expr: Expression, assumeTrue: boolean): Type {
                switch (expr.kind) {
                    case SyntaxKind.ParenthesizedExpression:
                        return narrowType(type, (<ParenthesizedExpression>expr).expression, assumeTrue);
                    case SyntaxKind.BinaryExpression:
                        var operator = (<BinaryExpression>expr).operator;
                        if (operator === SyntaxKind.EqualsEqualsEqualsToken || operator === SyntaxKind.ExclamationEqualsEqualsToken) {
                            return narrowTypeByEquality(type, <BinaryExpression>expr, assumeTrue);
                        }
                        else if (operator === SyntaxKind.AmpersandAmpersandToken) {
                            return narrowTypeByAnd(type, <BinaryExpression>expr, assumeTrue);
                        }
                        else if (operator === SyntaxKind.BarBarToken) {
                            return narrowTypeByOr(type, <BinaryExpression>expr, assumeTrue);
                        }
                        else if (operator === SyntaxKind.InstanceOfKeyword) {
                            return narrowTypeByInstanceof(type, <BinaryExpression>expr, assumeTrue);
                        }
                        break;
                    case SyntaxKind.PrefixUnaryExpression:
                        if ((<PrefixUnaryExpression>expr).operator === SyntaxKind.ExclamationToken) {
                            return narrowType(type,(<PrefixUnaryExpression>expr).operand, !assumeTrue);
                        }
                        break;
                }
                return type;
            }
        }

        /*Transitively mark all linked imports as referenced*/
        function markLinkedImportsAsReferenced(node: ImportDeclaration): void {
            var nodeLinks = getNodeLinks(node);
            while (nodeLinks.importOnRightSide) {
                var rightSide = nodeLinks.importOnRightSide;
                nodeLinks.importOnRightSide = undefined;

                getSymbolLinks(rightSide).referenced = true;
                Debug.assert((rightSide.flags & SymbolFlags.Import) !== 0);

                nodeLinks = getNodeLinks(getDeclarationOfKind(rightSide, SyntaxKind.ImportDeclaration))
            }
        }

        function checkIdentifier(node: Identifier): Type {
            var symbol = getResolvedSymbol(node);

            // As noted in ECMAScript 6 language spec, arrow functions never have an arguments objects.
            // Although in down-level emit of arrow function, we emit it using function expression which means that
            // arguments objects will be bound to the inner object; emitting arrow function natively in ES6, arguments objects
            // will be bound to non-arrow function that contain this arrow function. This results in inconsistent behavior.
            // To avoid that we will give an error to users if they use arguments objects in arrow function so that they
            // can explicitly bound arguments objects
            if (symbol === argumentsSymbol && getContainingFunction(node).kind === SyntaxKind.ArrowFunction) {
              error(node, Diagnostics.The_arguments_object_cannot_be_referenced_in_an_arrow_function_Consider_using_a_standard_function_expression);
            }

            if (symbol.flags & SymbolFlags.Import) {
                var symbolLinks = getSymbolLinks(symbol);
                if (!symbolLinks.referenced) {
                    var importOrExportAssignment = getLeftSideOfImportOrExportAssignment(node);

                    // decision about whether import is referenced can be made now if
                    // - import that are used anywhere except right side of import declarations
                    // - imports that are used on the right side of exported import declarations
                    // for other cases defer decision until the check of left side
                    if (!importOrExportAssignment ||
                        (importOrExportAssignment.flags & NodeFlags.Export) ||
                        (importOrExportAssignment.kind === SyntaxKind.ExportAssignment)) {
                        // Mark the import as referenced so that we emit it in the final .js file.
                        // exception: identifiers that appear in type queries, const enums, modules that contain only const enums
                        symbolLinks.referenced = !isInTypeQuery(node) && !isConstEnumOrConstEnumOnlyModule(resolveImport(symbol));
                    }
                    else {
                        var nodeLinks = getNodeLinks(importOrExportAssignment);
                        Debug.assert(!nodeLinks.importOnRightSide);
                        nodeLinks.importOnRightSide = symbol;
                    }
                }
                
                if (symbolLinks.referenced) {
                    markLinkedImportsAsReferenced(<ImportDeclaration>getDeclarationOfKind(symbol, SyntaxKind.ImportDeclaration));
                }
            }

            checkCollisionWithCapturedSuperVariable(node, node);
            checkCollisionWithCapturedThisVariable(node, node);

            return getNarrowedTypeOfSymbol(getExportSymbolOfValueSymbolIfExported(symbol), node);
        }

        function captureLexicalThis(node: Node, container: Node): void {
            var classNode = container.parent && container.parent.kind === SyntaxKind.ClassDeclaration ? container.parent : undefined;
            getNodeLinks(node).flags |= NodeCheckFlags.LexicalThis;
            if (container.kind === SyntaxKind.PropertyDeclaration || container.kind === SyntaxKind.Constructor) {
                getNodeLinks(classNode).flags |= NodeCheckFlags.CaptureThis;
            }
            else {
                getNodeLinks(container).flags |= NodeCheckFlags.CaptureThis;
            }
        }

        function checkThisExpression(node: Node): Type {
            // Stop at the first arrow function so that we can
            // tell whether 'this' needs to be captured.
            var container = getThisContainer(node, /* includeArrowFunctions */ true);
            var needToCaptureLexicalThis = false;

            // Now skip arrow functions to get the "real" owner of 'this'.
            if (container.kind === SyntaxKind.ArrowFunction) {
                container = getThisContainer(container, /* includeArrowFunctions */ false);

                // When targeting es6, arrow function lexically bind "this" so we do not need to do the work of binding "this" in emitted code
                needToCaptureLexicalThis = (languageVersion < ScriptTarget.ES6);
            }

            switch (container.kind) {
                case SyntaxKind.ModuleDeclaration:
                    error(node, Diagnostics.this_cannot_be_referenced_in_a_module_body);
                    // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    break;
                case SyntaxKind.EnumDeclaration:
                    error(node, Diagnostics.this_cannot_be_referenced_in_current_location);
                    // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    break;
                case SyntaxKind.Constructor:
                    if (isInConstructorArgumentInitializer(node, container)) {
                        error(node, Diagnostics.this_cannot_be_referenced_in_constructor_arguments);
                        // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    }
                    break;
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    if (container.flags & NodeFlags.Static) {
                        error(node, Diagnostics.this_cannot_be_referenced_in_a_static_property_initializer);
                        // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    }
                    break;
                case SyntaxKind.ComputedPropertyName:
                    error(node, Diagnostics.this_cannot_be_referenced_in_a_computed_property_name);
                    break;
            }

            if (needToCaptureLexicalThis) {
                captureLexicalThis(node, container);
            }

            var classNode = container.parent && container.parent.kind === SyntaxKind.ClassDeclaration ? container.parent : undefined;
            if (classNode) {
                var symbol = getSymbolOfNode(classNode);
                return container.flags & NodeFlags.Static ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol);
            }
            return anyType;
        }

        function isInConstructorArgumentInitializer(node: Node, constructorDecl: Node): boolean {
            for (var n = node; n && n !== constructorDecl; n = n.parent) {
                if (n.kind === SyntaxKind.Parameter) {
                    return true;
                }
            }
            return false;
        }

        function checkSuperExpression(node: Node): Type {
            var isCallExpression = node.parent.kind === SyntaxKind.CallExpression && (<CallExpression>node.parent).expression === node;
            var enclosingClass = <ClassDeclaration>getAncestor(node, SyntaxKind.ClassDeclaration);
            var baseClass: Type;
            if (enclosingClass && getClassBaseTypeNode(enclosingClass)) {
                var classType = <InterfaceType>getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClass));
                baseClass = classType.baseTypes.length && classType.baseTypes[0];
            }

            if (!baseClass) {
                error(node, Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                return unknownType;
            }

            var container = getSuperContainer(node, /*includeFunctions*/ true);

            if (container) {
                var canUseSuperExpression = false;
                if (isCallExpression) {
                    // TS 1.0 SPEC (April 2014): 4.8.1
                    // Super calls are only permitted in constructors of derived classes
                    canUseSuperExpression = container.kind === SyntaxKind.Constructor;
                }
                else {
                    // TS 1.0 SPEC (April 2014)
                    // 'super' property access is allowed
                    // - In a constructor, instance member function, instance member accessor, or instance member variable initializer where this references a derived class instance
                    // - In a static member function or static member accessor

                    // super property access might appear in arrow functions with arbitrary deep nesting
                    var needToCaptureLexicalThis = false;
                    while (container && container.kind === SyntaxKind.ArrowFunction) {
                        container = getSuperContainer(container, /*includeFunctions*/ true);
                        needToCaptureLexicalThis = true;
                    }

                    // topmost container must be something that is directly nested in the class declaration
                    if (container && container.parent && container.parent.kind === SyntaxKind.ClassDeclaration) {
                        if (container.flags & NodeFlags.Static) {
                            canUseSuperExpression =
                                container.kind === SyntaxKind.MethodDeclaration ||
                                container.kind === SyntaxKind.MethodSignature ||
                                container.kind === SyntaxKind.GetAccessor ||
                                container.kind === SyntaxKind.SetAccessor;
                        }
                        else {
                            canUseSuperExpression =
                                container.kind === SyntaxKind.MethodDeclaration ||
                                container.kind === SyntaxKind.MethodSignature ||
                                container.kind === SyntaxKind.GetAccessor ||
                                container.kind === SyntaxKind.SetAccessor ||
                                container.kind === SyntaxKind.PropertyDeclaration ||
                                container.kind === SyntaxKind.PropertySignature ||
                                container.kind === SyntaxKind.Constructor;
                        }
                    }
                }

                if (canUseSuperExpression) {
                    var returnType: Type;

                    if ((container.flags & NodeFlags.Static) || isCallExpression) {
                        getNodeLinks(node).flags |= NodeCheckFlags.SuperStatic;
                        returnType = getTypeOfSymbol(baseClass.symbol);
                    }
                    else {
                        getNodeLinks(node).flags |= NodeCheckFlags.SuperInstance;
                        returnType = baseClass;
                    }

                    if (container.kind === SyntaxKind.Constructor && isInConstructorArgumentInitializer(node, container)) {
                        // issue custom error message for super property access in constructor arguments (to be aligned with old compiler)
                        error(node, Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
                        returnType = unknownType;
                    }

                    if (!isCallExpression && needToCaptureLexicalThis) {
                        // call expressions are allowed only in constructors so they should always capture correct 'this'
                        // super property access expressions can also appear in arrow functions -
                        // in this case they should also use correct lexical this
                        captureLexicalThis(node.parent, container);
                    }

                    return returnType;
                }
            }

            if (container.kind === SyntaxKind.ComputedPropertyName) {
                error(node, Diagnostics.super_cannot_be_referenced_in_a_computed_property_name);
            }
            else if (isCallExpression) {
                error(node, Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
            }
            else {
                error(node, Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
            }

            return unknownType;
        }

        // Return contextual type of parameter or undefined if no contextual type is available
        function getContextuallyTypedParameterType(parameter: ParameterDeclaration): Type {
            if (isFunctionExpressionOrArrowFunction(parameter.parent)) {
                var func = <FunctionExpression>parameter.parent;
                if (isContextSensitive(func)) {
                    var contextualSignature = getContextualSignature(func);
                    if (contextualSignature) {

                        var funcHasRestParameters = hasRestParameters(func);
                        var len = func.parameters.length - (funcHasRestParameters ? 1 : 0);
                        var indexOfParameter = indexOf(func.parameters, parameter);
                        if (indexOfParameter < len) {
                            return getTypeAtPosition(contextualSignature, indexOfParameter);
                        }

                        // If last parameter is contextually rest parameter get its type
                        if (indexOfParameter === (func.parameters.length - 1) &&
                            funcHasRestParameters && contextualSignature.hasRestParameter && func.parameters.length >= contextualSignature.parameters.length) {
                            return getTypeOfSymbol(contextualSignature.parameters[contextualSignature.parameters.length - 1]);
                        }
                    }
                }
            }
            return undefined;
        }

        // In a variable, parameter or property declaration with a type annotation, the contextual type of an initializer
        // expression is the type of the variable, parameter or property. Otherwise, in a parameter declaration of a
        // contextually typed function expression, the contextual type of an initializer expression is the contextual type
        // of the parameter. Otherwise, in a variable or parameter declaration with a binding pattern name, the contextual
        // type of an initializer expression is the type implied by the binding pattern.
        function getContextualTypeForInitializerExpression(node: Expression): Type {
            var declaration = <VariableLikeDeclaration>node.parent;
            if (node === declaration.initializer) {
                if (declaration.type) {
                    return getTypeFromTypeNode(declaration.type);
                }
                if (declaration.kind === SyntaxKind.Parameter) {
                    var type = getContextuallyTypedParameterType(<ParameterDeclaration>declaration);
                    if (type) {
                        return type;
                    }
                }
                if (isBindingPattern(declaration.name)) {
                    return getTypeFromBindingPattern(<BindingPattern>declaration.name);
                }
            }
            return undefined;
        }

        function getContextualTypeForReturnExpression(node: Expression): Type {
            var func = getContainingFunction(node);
            if (func) {
                // If the containing function has a return type annotation, is a constructor, or is a get accessor whose
                // corresponding set accessor has a type annotation, return statements in the function are contextually typed
                if (func.type || func.kind === SyntaxKind.Constructor || func.kind === SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(<AccessorDeclaration>getDeclarationOfKind(func.symbol, SyntaxKind.SetAccessor))) {
                    return getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                }
                // Otherwise, if the containing function is contextually typed by a function type with exactly one call signature
                // and that call signature is non-generic, return statements are contextually typed by the return type of the signature
                var signature = getContextualSignatureForFunctionLikeDeclaration(<FunctionExpression>func);
                if (signature) {
                    return getReturnTypeOfSignature(signature);
                }
            }
            return undefined;
        }

        // In a typed function call, an argument or substitution expression is contextually typed by the type of the corresponding parameter.
        function getContextualTypeForArgument(callTarget: CallLikeExpression, arg: Expression): Type {
            var args = getEffectiveCallArguments(callTarget);
            var argIndex = indexOf(args, arg);
            if (argIndex >= 0) {
                var signature = getResolvedSignature(callTarget);
                return getTypeAtPosition(signature, argIndex);
            }
            return undefined;
        }

        function getContextualTypeForSubstitutionExpression(template: TemplateExpression, substitutionExpression: Expression) {
            if (template.parent.kind === SyntaxKind.TaggedTemplateExpression) {
                return getContextualTypeForArgument(<TaggedTemplateExpression>template.parent, substitutionExpression);
            }

            return undefined;
        }

        function getContextualTypeForBinaryOperand(node: Expression): Type {
            var binaryExpression = <BinaryExpression>node.parent;
            var operator = binaryExpression.operator;
            if (operator >= SyntaxKind.FirstAssignment && operator <= SyntaxKind.LastAssignment) {
                // In an assignment expression, the right operand is contextually typed by the type of the left operand.
                if (node === binaryExpression.right) {
                    return checkExpression(binaryExpression.left);
                }
            }
            else if (operator === SyntaxKind.BarBarToken) {
                // When an || expression has a contextual type, the operands are contextually typed by that type. When an ||
                // expression has no contextual type, the right operand is contextually typed by the type of the left operand.
                var type = getContextualType(binaryExpression);
                if (!type && node === binaryExpression.right) {
                    type = checkExpression(binaryExpression.left);
                }
                return type;
            }
            return undefined;
        }

        // Apply a mapping function to a contextual type and return the resulting type. If the contextual type
        // is a union type, the mapping function is applied to each constituent type and a union of the resulting
        // types is returned.
        function applyToContextualType(type: Type, mapper: (t: Type) => Type): Type {
            if (!(type.flags & TypeFlags.Union)) {
                return mapper(type);
            }
            var types = (<UnionType>type).types;
            var mappedType: Type;
            var mappedTypes: Type[];
            for (var i = 0; i < types.length; i++) {
                var t = mapper(types[i]);
                if (t) {
                    if (!mappedType) {
                        mappedType = t;
                    }
                    else if (!mappedTypes) {
                        mappedTypes = [mappedType, t];
                    }
                    else {
                        mappedTypes.push(t);
                    }
                }
            }
            return mappedTypes ? getUnionType(mappedTypes) : mappedType;
        }

        function getTypeOfPropertyOfContextualType(type: Type, name: string) {
            return applyToContextualType(type, t => {
                var prop = getPropertyOfObjectType(t, name);
                return prop ? getTypeOfSymbol(prop) : undefined;
            });
        }

        function getIndexTypeOfContextualType(type: Type, kind: IndexKind) {
            return applyToContextualType(type, t => getIndexTypeOfObjectOrUnionType(t, kind));
        }

        // Return true if the given contextual type is a tuple-like type
        function contextualTypeIsTupleLikeType(type: Type): boolean {
            return !!(type.flags & TypeFlags.Union ? forEach((<UnionType>type).types, isTupleLikeType) : isTupleLikeType(type));
        }

        // Return true if the given contextual type provides an index signature of the given kind
        function contextualTypeHasIndexSignature(type: Type, kind: IndexKind): boolean {
            return !!(type.flags & TypeFlags.Union ? forEach((<UnionType>type).types, t => getIndexTypeOfObjectOrUnionType(t, kind)) : getIndexTypeOfObjectOrUnionType(type, kind));
        }

        // In an object literal contextually typed by a type T, the contextual type of a property assignment is the type of
        // the matching property in T, if one exists. Otherwise, it is the type of the numeric index signature in T, if one
        // exists. Otherwise, it is the type of the string index signature in T, if one exists.
        function getContextualTypeForObjectLiteralMethod(node: MethodDeclaration): Type {
            Debug.assert(isObjectLiteralMethod(node));
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }

            return getContextualTypeForObjectLiteralElement(node);
        }

        function getContextualTypeForObjectLiteralElement(element: ObjectLiteralElement) {
            var objectLiteral = <ObjectLiteralExpression>element.parent;
            var type = getContextualType(objectLiteral);
            if (type) {
                if (!hasDynamicName(element)) {
                    // For a (non-symbol) computed property, there is no reason to look up the name
                    // in the type. It will just be "__computed", which does not appear in any
                    // SymbolTable.
                    var symbolName = getSymbolOfNode(element).name;
                    var propertyType = getTypeOfPropertyOfContextualType(type, symbolName);
                    if (propertyType) {
                        return propertyType;
                    }
                }
                
                return isNumericName(element.name) && getIndexTypeOfContextualType(type, IndexKind.Number) ||
                    getIndexTypeOfContextualType(type, IndexKind.String);
            }

            return undefined;
        }

        // In an array literal contextually typed by a type T, the contextual type of an element expression at index N is
        // the type of the property with the numeric name N in T, if one exists. Otherwise, it is the type of the numeric
        // index signature in T, if one exists.
        function getContextualTypeForElementExpression(node: Expression): Type {
            var arrayLiteral = <ArrayLiteralExpression>node.parent;
            var type = getContextualType(arrayLiteral);
            if (type) {
                var index = indexOf(arrayLiteral.elements, node);
                return getTypeOfPropertyOfContextualType(type, "" + index) || getIndexTypeOfContextualType(type, IndexKind.Number);
            }
            return undefined;
        }

        // In a contextually typed conditional expression, the true/false expressions are contextually typed by the same type.
        function getContextualTypeForConditionalOperand(node: Expression): Type {
            var conditional = <ConditionalExpression>node.parent;
            return node === conditional.whenTrue || node === conditional.whenFalse ? getContextualType(conditional) : undefined;
        }

        // Return the contextual type for a given expression node. During overload resolution, a contextual type may temporarily
        // be "pushed" onto a node using the contextualType property.
        function getContextualType(node: Expression): Type {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            if (node.contextualType) {
                return node.contextualType;
            }
            var parent = node.parent;
            switch (parent.kind) {
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.Parameter:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.BindingElement:
                    return getContextualTypeForInitializerExpression(node);
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.ReturnStatement:
                    return getContextualTypeForReturnExpression(node);
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    return getContextualTypeForArgument(<CallExpression>parent, node);
                case SyntaxKind.TypeAssertionExpression:
                    return getTypeFromTypeNode((<TypeAssertion>parent).type);
                case SyntaxKind.BinaryExpression:
                    return getContextualTypeForBinaryOperand(node);
                case SyntaxKind.PropertyAssignment:
                    return getContextualTypeForObjectLiteralElement(<ObjectLiteralElement>parent);
                case SyntaxKind.ArrayLiteralExpression:
                    return getContextualTypeForElementExpression(node);
                case SyntaxKind.ConditionalExpression:
                    return getContextualTypeForConditionalOperand(node);
                case SyntaxKind.TemplateSpan:
                    Debug.assert(parent.parent.kind === SyntaxKind.TemplateExpression);
                    return getContextualTypeForSubstitutionExpression(<TemplateExpression>parent.parent, node);
                case SyntaxKind.ParenthesizedExpression:
                    return getContextualType(<ParenthesizedExpression>parent);
            }
            return undefined;
        }

        // If the given type is an object or union type, if that type has a single signature, and if
        // that signature is non-generic, return the signature. Otherwise return undefined.
        function getNonGenericSignature(type: Type): Signature {
            var signatures = getSignaturesOfObjectOrUnionType(type, SignatureKind.Call);
            if (signatures.length === 1) {
                var signature = signatures[0];
                if (!signature.typeParameters) {
                    return signature;
                }
            }
        }

        function isFunctionExpressionOrArrowFunction(node: Node): boolean {
            return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.ArrowFunction;
        }

        function getContextualSignatureForFunctionLikeDeclaration(node: FunctionLikeDeclaration): Signature {
            // Only function expressions and arrow functions are contextually typed.
            return isFunctionExpressionOrArrowFunction(node) ? getContextualSignature(<FunctionExpression>node) : undefined;
        }

        // Return the contextual signature for a given expression node. A contextual type provides a
        // contextual signature if it has a single call signature and if that call signature is non-generic.
        // If the contextual type is a union type, get the signature from each type possible and if they are 
        // all identical ignoring their return type, the result is same signature but with return type as 
        // union type of return types from these signatures
        function getContextualSignature(node: FunctionExpression | MethodDeclaration): Signature {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));
            var type = isObjectLiteralMethod(node)
                ? getContextualTypeForObjectLiteralMethod(<MethodDeclaration>node)
                : getContextualType(<FunctionExpression>node);
            if (!type) {
                return undefined;
            }
            if (!(type.flags & TypeFlags.Union)) {
                return getNonGenericSignature(type);
            }
            var signatureList: Signature[];
            var types = (<UnionType>type).types;
            for (var i = 0; i < types.length; i++) {
                // The signature set of all constituent type with call signatures should match
                // So number of signatures allowed is either 0 or 1
                if (signatureList &&
                    getSignaturesOfObjectOrUnionType(types[i], SignatureKind.Call).length > 1) {
                    return undefined;
                }

                var signature = getNonGenericSignature(types[i]);
                if (signature) {
                    if (!signatureList) {
                        // This signature will contribute to contextual union signature
                        signatureList = [signature];
                    }
                    else if (!compareSignatures(signatureList[0], signature, /*compareReturnTypes*/ false, compareTypes)) {
                        // Signatures aren't identical, do not use
                        return undefined;
                    }
                    else {
                        // Use this signature for contextual union signature
                        signatureList.push(signature);
                    }
                }
            }

            // Result is union of signatures collected (return type is union of return types of this signature set)
            var result: Signature;
            if (signatureList) {
                result = cloneSignature(signatureList[0]);
                // Clear resolved return type we possibly got from cloneSignature
                result.resolvedReturnType = undefined;
                result.unionSignatures = signatureList;
            }
            return result;
        }

        // Presence of a contextual type mapper indicates inferential typing, except the identityMapper object is
        // used as a special marker for other purposes.
        function isInferentialContext(mapper: TypeMapper) {
            return mapper && mapper !== identityMapper;
        }

        // A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
        // assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
        // an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ p: a}] = xxx'.
        function isAssignmentTarget(node: Node): boolean {
            var parent = node.parent;
            if (parent.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>parent).operator === SyntaxKind.EqualsToken && (<BinaryExpression>parent).left === node) {
                return true;
            }
            if (parent.kind === SyntaxKind.PropertyAssignment) {
                return isAssignmentTarget(parent.parent);
            }
            if (parent.kind === SyntaxKind.ArrayLiteralExpression) {
                return isAssignmentTarget(parent);
            }
            return false;
        }

        function checkSpreadElementExpression(node: SpreadElementExpression, contextualMapper?: TypeMapper): Type {
            var type = checkExpressionCached(node.expression, contextualMapper);
            if (!isTypeAssignableTo(type, anyArrayType)) {
                error(node.expression, Diagnostics.Type_0_is_not_an_array_type, typeToString(type));
                return unknownType;
            }
            return type;
        }

        function checkArrayLiteral(node: ArrayLiteralExpression, contextualMapper?: TypeMapper): Type {
            var elements = node.elements;
            if (!elements.length) {
                return createArrayType(undefinedType);
            }
            var hasSpreadElement: boolean = false;
            var elementTypes: Type[] = [];
            forEach(elements, e => {
                var type = checkExpression(e, contextualMapper);
                if (e.kind === SyntaxKind.SpreadElementExpression) {
                    elementTypes.push(getIndexTypeOfType(type, IndexKind.Number) || anyType);
                    hasSpreadElement = true;
                }
                else {
                    elementTypes.push(type);
                }
            });
            if (!hasSpreadElement) {
                var contextualType = getContextualType(node);
                if (contextualType && contextualTypeIsTupleLikeType(contextualType) || isAssignmentTarget(node)) {
                    return createTupleType(elementTypes);
                }
            }
            return createArrayType(getUnionType(elementTypes));
        }

        function isNumericName(name: DeclarationName): boolean {
            return name.kind === SyntaxKind.ComputedPropertyName ? isNumericComputedName(<ComputedPropertyName>name) : isNumericLiteralName((<Identifier>name).text);
        }

        function isNumericComputedName(name: ComputedPropertyName): boolean {
            // It seems odd to consider an expression of type Any to result in a numeric name,
            // but this behavior is consistent with checkIndexedAccess
            return isTypeOfKind(checkComputedPropertyName(name), TypeFlags.Any | TypeFlags.NumberLike);
        }

        function isNumericLiteralName(name: string) {
            // The intent of numeric names is that
            //     - they are names with text in a numeric form, and that
            //     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
            //         acquired by applying the abstract 'ToNumber' operation on the name's text.
            //
            // The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
            // In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
            //
            // Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
            // according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
            // Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
            // because their 'ToString' representation is not equal to their original text.
            // This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
            //
            // Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
            // The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
            // Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
            //
            // Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
            // This is desired behavior, because when indexing with them as numeric entities, you are indexing
            // with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
            return (+name).toString() === name;
        }

        function checkComputedPropertyName(node: ComputedPropertyName): Type {
            var links = getNodeLinks(node.expression);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node.expression);

                // This will allow types number, string, or any. It will also allow enums, the unknown
                // type, and any union of these types (like string | number).
                if (!isTypeOfKind(links.resolvedType, TypeFlags.Any | TypeFlags.NumberLike | TypeFlags.StringLike)) {
                    error(node, Diagnostics.A_computed_property_name_must_be_of_type_string_number_or_any);
                }
            }

            return links.resolvedType;
        }

        function checkObjectLiteral(node: ObjectLiteralExpression, contextualMapper?: TypeMapper): Type {
            // Grammar checking
            checkGrammarObjectLiteralExpression(node);

            var propertiesTable: SymbolTable = {};
            var propertiesArray: Symbol[] = [];
            var contextualType = getContextualType(node);
            var typeFlags: TypeFlags;

            for (var i = 0; i < node.properties.length; i++) {
                var memberDecl = node.properties[i];
                var member = memberDecl.symbol;
                if (memberDecl.kind === SyntaxKind.PropertyAssignment ||
                    memberDecl.kind === SyntaxKind.ShorthandPropertyAssignment ||
                    isObjectLiteralMethod(memberDecl)) {
                    if (memberDecl.kind === SyntaxKind.PropertyAssignment) {
                        var type = checkPropertyAssignment(<PropertyAssignment>memberDecl, contextualMapper);
                    }
                    else if (memberDecl.kind === SyntaxKind.MethodDeclaration) {
                        var type = checkObjectLiteralMethod(<MethodDeclaration>memberDecl, contextualMapper);
                    }
                    else {
                        Debug.assert(memberDecl.kind === SyntaxKind.ShorthandPropertyAssignment);
                        var type = memberDecl.name.kind === SyntaxKind.ComputedPropertyName
                            ? unknownType
                            : checkExpression(<Identifier>memberDecl.name, contextualMapper);
                    }
                    typeFlags |= type.flags;
                    var prop = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient | member.flags, member.name);
                    prop.declarations = member.declarations;
                    prop.parent = member.parent;
                    if (member.valueDeclaration) {
                        prop.valueDeclaration = member.valueDeclaration;
                    }

                    prop.type = type;
                    prop.target = member;
                    member = prop;
                }
                else {
                    // TypeScript 1.0 spec (April 2014)
                    // A get accessor declaration is processed in the same manner as 
                    // an ordinary function declaration(section 6.1) with no parameters.
                    // A set accessor declaration is processed in the same manner 
                    // as an ordinary function declaration with a single parameter and a Void return type.
                    Debug.assert(memberDecl.kind === SyntaxKind.GetAccessor || memberDecl.kind === SyntaxKind.SetAccessor);
                    checkAccessorDeclaration(<AccessorDeclaration>memberDecl);
                }

                if (!hasDynamicName(memberDecl)) {
                    propertiesTable[member.name] = member;
                }
                propertiesArray.push(member);
            }

            var stringIndexType = getIndexType(IndexKind.String);
            var numberIndexType = getIndexType(IndexKind.Number);
            var result = createAnonymousType(node.symbol, propertiesTable, emptyArray, emptyArray, stringIndexType, numberIndexType);
            result.flags |= TypeFlags.ObjectLiteral | TypeFlags.ContainsObjectLiteral | (typeFlags & TypeFlags.ContainsUndefinedOrNull);
            return result;

            function getIndexType(kind: IndexKind) {
                if (contextualType && contextualTypeHasIndexSignature(contextualType, kind)) {
                    var propTypes: Type[] = [];
                    for (var i = 0; i < propertiesArray.length; i++) {
                        var propertyDecl = node.properties[i];
                        if (kind === IndexKind.String || isNumericName(propertyDecl.name)) {
                            // Do not call getSymbolOfNode(propertyDecl), as that will get the
                            // original symbol for the node. We actually want to get the symbol
                            // created by checkObjectLiteral, since that will be appropriately
                            // contextually typed and resolved.
                            var type = getTypeOfSymbol(propertiesArray[i]);
                            if (!contains(propTypes, type)) {
                                propTypes.push(type);
                            }
                        }
                    }
                    var result = propTypes.length ? getUnionType(propTypes) : undefinedType;
                    typeFlags |= result.flags;
                    return result;
                }
                return undefined;
            }
        }

        // If a symbol is a synthesized symbol with no value declaration, we assume it is a property. Example of this are the synthesized
        // '.prototype' property as well as synthesized tuple index properties.
        function getDeclarationKindFromSymbol(s: Symbol) {
            return s.valueDeclaration ? s.valueDeclaration.kind : SyntaxKind.PropertyDeclaration;
        }

        function getDeclarationFlagsFromSymbol(s: Symbol) {
            return s.valueDeclaration ? getCombinedNodeFlags(s.valueDeclaration) : s.flags & SymbolFlags.Prototype ? NodeFlags.Public | NodeFlags.Static : 0;
        }

        function checkClassPropertyAccess(node: PropertyAccessExpression | QualifiedName, left: Expression | QualifiedName, type: Type, prop: Symbol) {
            var flags = getDeclarationFlagsFromSymbol(prop);
            // Public properties are always accessible
            if (!(flags & (NodeFlags.Private | NodeFlags.Protected))) {
                return;
            }
            // Property is known to be private or protected at this point
            // Get the declaring and enclosing class instance types
            var enclosingClassDeclaration = getAncestor(node, SyntaxKind.ClassDeclaration);
            var enclosingClass = enclosingClassDeclaration ? <InterfaceType>getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClassDeclaration)) : undefined;
            var declaringClass = <InterfaceType>getDeclaredTypeOfSymbol(prop.parent);
            // Private property is accessible if declaring and enclosing class are the same
            if (flags & NodeFlags.Private) {
                if (declaringClass !== enclosingClass) {
                    error(node, Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(declaringClass));
                }
                return;
            }
            // Property is known to be protected at this point
            // All protected properties of a supertype are accessible in a super access
            if (left.kind === SyntaxKind.SuperKeyword) {
                return;
            }
            // A protected property is accessible in the declaring class and classes derived from it
            if (!enclosingClass || !hasBaseType(enclosingClass, declaringClass)) {
                error(node, Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(declaringClass));
                return;
            }
            // No further restrictions for static properties
            if (flags & NodeFlags.Static) {
                return;
            }
            // An instance property must be accessed through an instance of the enclosing class
            if (!(getTargetType(type).flags & (TypeFlags.Class | TypeFlags.Interface) && hasBaseType(<InterfaceType>type, enclosingClass))) {
                error(node, Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1, symbolToString(prop), typeToString(enclosingClass));
            }
        }

        function checkPropertyAccessExpression(node: PropertyAccessExpression) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.expression, node.name);
        }

        function checkQualifiedName(node: QualifiedName) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.left, node.right);
        }

        function checkPropertyAccessExpressionOrQualifiedName(node: PropertyAccessExpression | QualifiedName, left: Expression | QualifiedName, right: Identifier) {
            var type = checkExpressionOrQualifiedName(left);
            if (type === unknownType) return type;
            if (type !== anyType) {
                var apparentType = getApparentType(getWidenedType(type));
                if (apparentType === unknownType) {
                    // handle cases when type is Type parameter with invalid constraint
                    return unknownType;
                }
                var prop = getPropertyOfType(apparentType, right.text);
                if (!prop) {
                    if (right.text) {
                        error(right, Diagnostics.Property_0_does_not_exist_on_type_1, declarationNameToString(right), typeToString(type));
                    }
                    return unknownType;
                }
                getNodeLinks(node).resolvedSymbol = prop;
                if (prop.parent && prop.parent.flags & SymbolFlags.Class) {
                    // TS 1.0 spec (April 2014): 4.8.2
                    // - In a constructor, instance member function, instance member accessor, or 
                    //   instance member variable initializer where this references a derived class instance, 
                    //   a super property access is permitted and must specify a public instance member function of the base class.
                    // - In a static member function or static member accessor 
                    //   where this references the constructor function object of a derived class, 
                    //   a super property access is permitted and must specify a public static member function of the base class.
                    if (left.kind === SyntaxKind.SuperKeyword && getDeclarationKindFromSymbol(prop) !== SyntaxKind.MethodDeclaration) {
                        error(right, Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                    }
                    else {
                        checkClassPropertyAccess(node, left, type, prop);
                    }
                }
                return getTypeOfSymbol(prop);
            }
            return anyType;
        }

        function isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName, propertyName: string): boolean {
            var left = node.kind === SyntaxKind.PropertyAccessExpression
                ? (<PropertyAccessExpression>node).expression
                : (<QualifiedName>node).left;

            var type = checkExpressionOrQualifiedName(left);
            if (type !== unknownType && type !== anyType) {
                var prop = getPropertyOfType(getWidenedType(type), propertyName);
                if (prop && prop.parent && prop.parent.flags & SymbolFlags.Class) {
                    if (left.kind === SyntaxKind.SuperKeyword && getDeclarationKindFromSymbol(prop) !== SyntaxKind.MethodDeclaration) {
                        return false;
                    }
                    else {
                        var modificationCount = diagnostics.getModificationCount();
                        checkClassPropertyAccess(node, left, type, prop);
                        return diagnostics.getModificationCount() === modificationCount;
                    }
                }
            }
            return true;
        }

        function checkIndexedAccess(node: ElementAccessExpression): Type {
            // Grammar checking
            if (!node.argumentExpression) {
                var sourceFile = getSourceFile(node);
                if (node.parent.kind === SyntaxKind.NewExpression && (<NewExpression>node.parent).expression === node) {
                    var start = skipTrivia(sourceFile.text, node.expression.end);
                    var end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                }
                else {
                    var start = node.end - "]".length;
                    var end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Expression_expected);
                }
            }

            // Obtain base constraint such that we can bail out if the constraint is an unknown type
            var objectType = getApparentType(checkExpression(node.expression));
            var indexType = node.argumentExpression ? checkExpression(node.argumentExpression) : unknownType;

            if (objectType === unknownType) {
                return unknownType;
            }

            var isConstEnum = isConstEnumObjectType(objectType);
            if (isConstEnum &&
                (!node.argumentExpression || node.argumentExpression.kind !== SyntaxKind.StringLiteral)) {
                error(node.argumentExpression, Diagnostics.A_const_enum_member_can_only_be_accessed_using_a_string_literal);
                return unknownType;
            }

            // TypeScript 1.0 spec (April 2014): 4.10 Property Access
            // - If IndexExpr is a string literal or a numeric literal and ObjExpr's apparent type has a property with the name 
            //    given by that literal(converted to its string representation in the case of a numeric literal), the property access is of the type of that property.
            // - Otherwise, if ObjExpr's apparent type has a numeric index signature and IndexExpr is of type Any, the Number primitive type, or an enum type, 
            //    the property access is of the type of that index signature.
            // - Otherwise, if ObjExpr's apparent type has a string index signature and IndexExpr is of type Any, the String or Number primitive type, or an enum type, 
            //    the property access is of the type of that index signature.
            // - Otherwise, if IndexExpr is of type Any, the String or Number primitive type, or an enum type, the property access is of type Any.

            // See if we can index as a property.
            if (node.argumentExpression) {
                if (node.argumentExpression.kind === SyntaxKind.StringLiteral || node.argumentExpression.kind === SyntaxKind.NumericLiteral) {
                    var name = (<LiteralExpression>node.argumentExpression).text;
                    var prop = getPropertyOfType(objectType, name);
                    if (prop) {
                        getNodeLinks(node).resolvedSymbol = prop;
                        return getTypeOfSymbol(prop);
                    }
                    else if (isConstEnum) {
                        error(node.argumentExpression, Diagnostics.Property_0_does_not_exist_on_const_enum_1, name, symbolToString(objectType.symbol));
                        return unknownType;
                    }
                }
            }

            // Check for compatible indexer types.
            if (isTypeOfKind(indexType, TypeFlags.Any | TypeFlags.StringLike | TypeFlags.NumberLike)) {

                // Try to use a number indexer.
                if (isTypeOfKind(indexType, TypeFlags.Any | TypeFlags.NumberLike)) {
                    var numberIndexType = getIndexTypeOfType(objectType, IndexKind.Number);
                    if (numberIndexType) {
                        return numberIndexType;
                    }
                }

                // Try to use string indexing.
                var stringIndexType = getIndexTypeOfType(objectType, IndexKind.String);
                if (stringIndexType) {
                    return stringIndexType;
                }

                // Fall back to any.
                if (compilerOptions.noImplicitAny && !compilerOptions.suppressImplicitAnyIndexErrors && objectType !== anyType) {
                    error(node, Diagnostics.Index_signature_of_object_type_implicitly_has_an_any_type);
                }

                return anyType;
            }

            // REVIEW: Users should know the type that was actually used.
            error(node, Diagnostics.An_index_expression_argument_must_be_of_type_string_number_or_any);

            return unknownType;
        }

        function resolveUntypedCall(node: CallLikeExpression): Signature {
            if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                checkExpression((<TaggedTemplateExpression>node).template);
            }
            else {
                forEach((<CallExpression>node).arguments, argument => {
                    checkExpression(argument);
                });
            }
            return anySignature;
        }

        function resolveErrorCall(node: CallLikeExpression): Signature {
            resolveUntypedCall(node);
            return unknownSignature;
        }

        function hasCorrectArity(node: CallLikeExpression, args: Expression[], signature: Signature) {
            var adjustedArgCount: number;
            var typeArguments: NodeArray<TypeNode>;
            var callIsIncomplete: boolean;

            if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                var tagExpression = <TaggedTemplateExpression>node;

                // Even if the call is incomplete, we'll have a missing expression as our last argument,
                // so we can say the count is just the arg list length
                adjustedArgCount = args.length;
                typeArguments = undefined;

                if (tagExpression.template.kind === SyntaxKind.TemplateExpression) {
                    // If a tagged template expression lacks a tail literal, the call is incomplete.
                    // Specifically, a template only can end in a TemplateTail or a Missing literal.
                    var templateExpression = <TemplateExpression>tagExpression.template;
                    var lastSpan = lastOrUndefined(templateExpression.templateSpans);
                    Debug.assert(lastSpan !== undefined); // we should always have at least one span.
                    callIsIncomplete = getFullWidth(lastSpan.literal) === 0 || !!lastSpan.literal.isUnterminated;
                }
                else {
                    // If the template didn't end in a backtick, or its beginning occurred right prior to EOF,
                    // then this might actually turn out to be a TemplateHead in the future;
                    // so we consider the call to be incomplete.
                    var templateLiteral = <LiteralExpression>tagExpression.template;
                    Debug.assert(templateLiteral.kind === SyntaxKind.NoSubstitutionTemplateLiteral);
                    callIsIncomplete = !!templateLiteral.isUnterminated;
                }
            }
            else {
                var callExpression = <CallExpression>node;
                if (!callExpression.arguments) {
                    // This only happens when we have something of the form: 'new C'
                    Debug.assert(callExpression.kind === SyntaxKind.NewExpression);

                    return signature.minArgumentCount === 0;
                }
                
                // For IDE scenarios we may have an incomplete call, so a trailing comma is tantamount to adding another argument.
                adjustedArgCount = callExpression.arguments.hasTrailingComma ? args.length + 1 : args.length;

                // If we are missing the close paren, the call is incomplete.
                callIsIncomplete = (<CallExpression>callExpression).arguments.end === callExpression.end;

                typeArguments = callExpression.typeArguments;
            }

            Debug.assert(adjustedArgCount !== undefined, "'adjustedArgCount' undefined");
            Debug.assert(callIsIncomplete !== undefined, "'callIsIncomplete' undefined");

            return checkArity(adjustedArgCount, typeArguments, callIsIncomplete, signature);

            /**
             * @param adjustedArgCount The "apparent" number of arguments that we will have in this call.
             * @param typeArguments    Type arguments node of the call if it exists; undefined otherwise.
             * @param callIsIncomplete Whether or not a call is unfinished, and we should be "lenient" when we have too few arguments.
             * @param signature        The signature whose arity we are comparing.
             */
            function checkArity(adjustedArgCount: number, typeArguments: NodeArray<TypeNode>, callIsIncomplete: boolean, signature: Signature): boolean {
                // Too many arguments implies incorrect arity.
                if (!signature.hasRestParameter && adjustedArgCount > signature.parameters.length) {
                    return false;
                }

                // If the user supplied type arguments, but the number of type arguments does not match
                // the declared number of type parameters, the call has an incorrect arity.
                var hasRightNumberOfTypeArgs = !typeArguments ||
                    (signature.typeParameters && typeArguments.length === signature.typeParameters.length);
                if (!hasRightNumberOfTypeArgs) {
                    return false;
                }

                // If the call is incomplete, we should skip the lower bound check.
                var hasEnoughArguments = adjustedArgCount >= signature.minArgumentCount;
                return callIsIncomplete || hasEnoughArguments;
            }
        }

        // If type has a single call signature and no other members, return that signature. Otherwise, return undefined.
        function getSingleCallSignature(type: Type): Signature {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectOrUnionTypeMembers(<ObjectType>type);
                if (resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0 &&
                    resolved.properties.length === 0 && !resolved.stringIndexType && !resolved.numberIndexType) {
                    return resolved.callSignatures[0];
                }
            }
            return undefined;
        }

        // Instantiate a generic signature in the context of a non-generic signature (section 3.8.5 in TypeScript spec)
        function instantiateSignatureInContextOf(signature: Signature, contextualSignature: Signature, contextualMapper: TypeMapper): Signature {
            var context = createInferenceContext(signature.typeParameters, /*inferUnionTypes*/ true);
            forEachMatchingParameterType(contextualSignature, signature, (source, target) => {
                // Type parameters from outer context referenced by source type are fixed by instantiation of the source type
                inferTypes(context, instantiateType(source, contextualMapper), target);
            });
            return getSignatureInstantiation(signature, getInferredTypes(context));
        }

        function inferTypeArguments(signature: Signature, args: Expression[], excludeArgument: boolean[]): InferenceContext {
            var typeParameters = signature.typeParameters;
            var context = createInferenceContext(typeParameters, /*inferUnionTypes*/ false);
            var inferenceMapper = createInferenceMapper(context);

            // We perform two passes over the arguments. In the first pass we infer from all arguments, but use
            // wildcards for all context sensitive function expressions.
            for (var i = 0; i < args.length; i++) {
                if (args[i].kind === SyntaxKind.OmittedExpression) {
                    continue;
                }
                var parameterType = getTypeAtPosition(signature, i);
                if (i === 0 && args[i].parent.kind === SyntaxKind.TaggedTemplateExpression) {
                    inferTypes(context, globalTemplateStringsArrayType, parameterType);
                    continue;
                }
                // For context sensitive arguments we pass the identityMapper, which is a signal to treat all
                // context sensitive function expressions as wildcards
                var mapper = excludeArgument && excludeArgument[i] !== undefined ? identityMapper : inferenceMapper;
                inferTypes(context, checkExpressionWithContextualType(args[i], parameterType, mapper), parameterType);
            }

            // In the second pass we visit only context sensitive arguments, and only those that aren't excluded, this
            // time treating function expressions normally (which may cause previously inferred type arguments to be fixed
            // as we construct types for contextually typed parameters)
            if (excludeArgument) {
                for (var i = 0; i < args.length; i++) {
                    if (args[i].kind === SyntaxKind.OmittedExpression) {
                        continue;
                    }
                    // No need to special-case tagged templates; their excludeArgument value will be 'undefined'.
                    if (excludeArgument[i] === false) {
                        var parameterType = getTypeAtPosition(signature, i);
                        inferTypes(context, checkExpressionWithContextualType(args[i], parameterType, inferenceMapper), parameterType);
                    }
                }
            }

            var inferredTypes = getInferredTypes(context);
            // Inference has failed if the inferenceFailureType type is in list of inferences
            context.failedTypeParameterIndex = indexOf(inferredTypes, inferenceFailureType);

            // Wipe out the inferenceFailureType from the array so that error recovery can work properly
            for (var i = 0; i < inferredTypes.length; i++) {
                if (inferredTypes[i] === inferenceFailureType) {
                    inferredTypes[i] = unknownType;
                }
            }

            return context;
        }

        function checkTypeArguments(signature: Signature, typeArguments: TypeNode[], typeArgumentResultTypes: Type[], reportErrors: boolean): boolean {
            var typeParameters = signature.typeParameters;
            var typeArgumentsAreAssignable = true;
            for (var i = 0; i < typeParameters.length; i++) {
                var typeArgNode = typeArguments[i];
                var typeArgument = getTypeFromTypeNode(typeArgNode);
                // Do not push on this array! It has a preallocated length
                typeArgumentResultTypes[i] = typeArgument;
                if (typeArgumentsAreAssignable /* so far */) {
                    var constraint = getConstraintOfTypeParameter(typeParameters[i]);
                    if (constraint) {
                        typeArgumentsAreAssignable = checkTypeAssignableTo(typeArgument, constraint, reportErrors ? typeArgNode : undefined,
                            Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
            return typeArgumentsAreAssignable;
        }

        function checkApplicableSignature(node: CallLikeExpression, args: Node[], signature: Signature, relation: Map<RelationComparisonResult>, excludeArgument: boolean[], reportErrors: boolean) {
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                var argType: Type;

                if (arg.kind === SyntaxKind.OmittedExpression) {
                    continue;
                }

                var paramType = getTypeAtPosition(signature, i);

                if (i === 0 && node.kind === SyntaxKind.TaggedTemplateExpression) {
                    // A tagged template expression has something of a
                    // "virtual" parameter with the "cooked" strings array type.
                    argType = globalTemplateStringsArrayType;
                }
                else {
                    // String literals get string literal types unless we're reporting errors
                    argType = arg.kind === SyntaxKind.StringLiteral && !reportErrors
                        ? getStringLiteralType(<LiteralExpression>arg)
                        : checkExpressionWithContextualType(<LiteralExpression>arg, paramType, excludeArgument && excludeArgument[i] ? identityMapper : undefined);
                }

                // Use argument expression as error location when reporting errors
                var isValidArgument = checkTypeRelatedTo(argType, paramType, relation, reportErrors ? arg : undefined,
                    Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1);
                if (!isValidArgument) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Returns the effective arguments for an expression that works like a function invocation.
         *
         * If 'node' is a CallExpression or a NewExpression, then its argument list is returned.
         * If 'node' is a TaggedTemplateExpression, a new argument list is constructed from the substitution
         *    expressions, where the first element of the list is the template for error reporting purposes.
         */
        function getEffectiveCallArguments(node: CallLikeExpression): Expression[] {
            var args: Expression[];
            if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                var template = (<TaggedTemplateExpression>node).template;
                args = [template];

                if (template.kind === SyntaxKind.TemplateExpression) {
                    forEach((<TemplateExpression>template).templateSpans, span => {
                        args.push(span.expression);
                    });
                }
            }
            else {
                args = (<CallExpression>node).arguments || emptyArray;
            }

            return args;
        }

        /**
         * In a 'super' call, type arguments are not provided within the CallExpression node itself.
         * Instead, they must be fetched from the class declaration's base type node.
         *
         * If 'node' is a 'super' call (e.g. super(...), new super(...)), then we attempt to fetch
         * the type arguments off the containing class's first heritage clause (if one exists). Note that if
         * type arguments are supplied on the 'super' call, they are ignored (though this is syntactically incorrect).
         *
         * In all other cases, the call's explicit type arguments are returned.
         */
        function getEffectiveTypeArguments(callExpression: CallExpression): TypeNode[] {
            if (callExpression.expression.kind === SyntaxKind.SuperKeyword) {
                var containingClass = <ClassDeclaration>getAncestor(callExpression, SyntaxKind.ClassDeclaration);
                var baseClassTypeNode = containingClass && getClassBaseTypeNode(containingClass);
                return baseClassTypeNode && baseClassTypeNode.typeArguments;
            }
            else {
                // Ordinary case - simple function invocation.
                return callExpression.typeArguments;
            }
        }

        function resolveCall(node: CallLikeExpression, signatures: Signature[], candidatesOutArray: Signature[]): Signature {
            var isTaggedTemplate = node.kind === SyntaxKind.TaggedTemplateExpression;

            var typeArguments: TypeNode[];

            if (!isTaggedTemplate) {
                typeArguments = getEffectiveTypeArguments(<CallExpression>node);

                // We already perform checking on the type arguments on the class declaration itself.
                if ((<CallExpression>node).expression.kind !== SyntaxKind.SuperKeyword) {
                    forEach(typeArguments, checkSourceElement);
                }
            }

            var candidates = candidatesOutArray || [];
            // collectCandidates fills up the candidates array directly
            collectCandidates();
            if (!candidates.length) {
                error(node, Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
                return resolveErrorCall(node);
            }

            var args = getEffectiveCallArguments(node);
            
            // The following applies to any value of 'excludeArgument[i]':
            //    - true:      the argument at 'i' is susceptible to a one-time permanent contextual typing.
            //    - undefined: the argument at 'i' is *not* susceptible to permanent contextual typing.
            //    - false:     the argument at 'i' *was* and *has been* permanently contextually typed.
            //
            // The idea is that we will perform type argument inference & assignability checking once
            // without using the susceptible parameters that are functions, and once more for each of those
            // parameters, contextually typing each as we go along.
            //
            // For a tagged template, then the first argument be 'undefined' if necessary
            // because it represents a TemplateStringsArray.
            var excludeArgument: boolean[];
            for (var i = isTaggedTemplate ? 1 : 0; i < args.length; i++) {
                if (isContextSensitive(args[i])) {
                    if (!excludeArgument) {
                        excludeArgument = new Array(args.length);
                    }
                    excludeArgument[i] = true;
                }
            }

            // The following variables are captured and modified by calls to chooseOverload.
            // If overload resolution or type argument inference fails, we want to report the
            // best error possible. The best error is one which says that an argument was not
            // assignable to a parameter. This implies that everything else about the overload
            // was fine. So if there is any overload that is only incorrect because of an
            // argument, we will report an error on that one.
            //
            //     function foo(s: string) {}
            //     function foo(n: number) {} // Report argument error on this overload
            //     function foo() {}
            //     foo(true);
            //
            // If none of the overloads even made it that far, there are two possibilities.
            // There was a problem with type arguments for some overload, in which case
            // report an error on that. Or none of the overloads even had correct arity,
            // in which case give an arity error.
            //
            //     function foo<T>(x: T, y: T) {} // Report type argument inference error
            //     function foo() {}
            //     foo(0, true);
            //
            var candidateForArgumentError: Signature;
            var candidateForTypeArgumentError: Signature;
            var resultOfFailedInference: InferenceContext;
            var result: Signature;

            // Section 4.12.1:
            // if the candidate list contains one or more signatures for which the type of each argument
            // expression is a subtype of each corresponding parameter type, the return type of the first
            // of those signatures becomes the return type of the function call.
            // Otherwise, the return type of the first signature in the candidate list becomes the return
            // type of the function call.
            //
            // Whether the call is an error is determined by assignability of the arguments. The subtype pass
            // is just important for choosing the best signature. So in the case where there is only one
            // signature, the subtype pass is useless. So skipping it is an optimization.
            if (candidates.length > 1) {
                result = chooseOverload(candidates, subtypeRelation);
            }
            if (!result) {
                // Reinitialize these pointers for round two
                candidateForArgumentError = undefined;
                candidateForTypeArgumentError = undefined;
                resultOfFailedInference = undefined;
                result = chooseOverload(candidates, assignableRelation);
            }
            if (result) {
                return result;
            }

            // No signatures were applicable. Now report errors based on the last applicable signature with
            // no arguments excluded from assignability checks.
            // If candidate is undefined, it means that no candidates had a suitable arity. In that case,
            // skip the checkApplicableSignature check.
            if (candidateForArgumentError) {
                // excludeArgument is undefined, in this case also equivalent to [undefined, undefined, ...]
                // The importance of excludeArgument is to prevent us from typing function expression parameters
                // in arguments too early. If possible, we'd like to only type them once we know the correct
                // overload. However, this matters for the case where the call is correct. When the call is
                // an error, we don't need to exclude any arguments, although it would cause no harm to do so.
                checkApplicableSignature(node, args, candidateForArgumentError, assignableRelation, /*excludeArgument*/ undefined, /*reportErrors*/ true);
            }
            else if (candidateForTypeArgumentError) {
                if (!isTaggedTemplate && (<CallExpression>node).typeArguments) {
                    checkTypeArguments(candidateForTypeArgumentError, (<CallExpression>node).typeArguments, [], /*reportErrors*/ true)
                }
                else {
                    Debug.assert(resultOfFailedInference.failedTypeParameterIndex >= 0);
                    var failedTypeParameter = candidateForTypeArgumentError.typeParameters[resultOfFailedInference.failedTypeParameterIndex];
                    var inferenceCandidates = getInferenceCandidates(resultOfFailedInference, resultOfFailedInference.failedTypeParameterIndex);

                    var diagnosticChainHead = chainDiagnosticMessages(/*details*/ undefined, // details will be provided by call to reportNoCommonSupertypeError
                        Diagnostics.The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly,
                        typeToString(failedTypeParameter));

                    reportNoCommonSupertypeError(inferenceCandidates, (<CallExpression>node).expression || (<TaggedTemplateExpression>node).tag, diagnosticChainHead);
                }
            }
            else {
                error(node, Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
            }

            // No signature was applicable. We have already reported the errors for the invalid signature.
            // If this is a type resolution session, e.g. Language Service, try to get better information that anySignature.
            // Pick the first candidate that matches the arity. This way we can get a contextual type for cases like:
            //  declare function f(a: { xa: number; xb: number; });
            //  f({ |
            if (!produceDiagnostics) {
                for (var i = 0, n = candidates.length; i < n; i++) {
                    if (hasCorrectArity(node, args, candidates[i])) {
                        return candidates[i];
                    }
                }
            }

            return resolveErrorCall(node);

            function chooseOverload(candidates: Signature[], relation: Map<RelationComparisonResult>) {
                for (var i = 0; i < candidates.length; i++) {
                    if (!hasCorrectArity(node, args, candidates[i])) {
                        continue;
                    }

                    var originalCandidate = candidates[i];
                    var inferenceResult: InferenceContext;

                    while (true) {
                        var candidate = originalCandidate;
                        if (candidate.typeParameters) {
                            var typeArgumentTypes: Type[];
                            var typeArgumentsAreValid: boolean;
                            if (typeArguments) {
                                typeArgumentTypes = new Array<Type>(candidate.typeParameters.length);
                                typeArgumentsAreValid = checkTypeArguments(candidate, typeArguments, typeArgumentTypes, /*reportErrors*/ false)
                            }
                            else {
                                inferenceResult = inferTypeArguments(candidate, args, excludeArgument);
                                typeArgumentsAreValid = inferenceResult.failedTypeParameterIndex < 0;
                                typeArgumentTypes = inferenceResult.inferredTypes;
                            }
                            if (!typeArgumentsAreValid) {
                                break;
                            }
                            candidate = getSignatureInstantiation(candidate, typeArgumentTypes);
                        }
                        if (!checkApplicableSignature(node, args, candidate, relation, excludeArgument, /*reportErrors*/ false)) {
                            break;
                        }
                        var index = excludeArgument ? indexOf(excludeArgument, true) : -1;
                        if (index < 0) {
                            return candidate;
                        }
                        excludeArgument[index] = false;
                    }

                    // A post-mortem of this iteration of the loop. The signature was not applicable,
                    // so we want to track it as a candidate for reporting an error. If the candidate
                    // had no type parameters, or had no issues related to type arguments, we can
                    // report an error based on the arguments. If there was an issue with type
                    // arguments, then we can only report an error based on the type arguments.
                    if (originalCandidate.typeParameters) {
                        var instantiatedCandidate = candidate;
                        if (typeArgumentsAreValid) {
                            candidateForArgumentError = instantiatedCandidate;
                        }
                        else {
                            candidateForTypeArgumentError = originalCandidate;
                            if (!typeArguments) {
                                resultOfFailedInference = inferenceResult;
                            }
                        }
                    }
                    else {
                        Debug.assert(originalCandidate === candidate);
                        candidateForArgumentError = originalCandidate;
                    }
                }

                return undefined;
            }

            // The candidate list orders groups in reverse, but within a group signatures are kept in declaration order
            // A nit here is that we reorder only signatures that belong to the same symbol,
            // so order how inherited signatures are processed is still preserved.
            // interface A { (x: string): void }
            // interface B extends A { (x: 'foo'): string }
            // var b: B;
            // b('foo') // <- here overloads should be processed as [(x:'foo'): string, (x: string): void]
            function collectCandidates(): void {
                var result = candidates;
                var lastParent: Node;
                var lastSymbol: Symbol;
                var cutoffIndex: number = 0;
                var index: number;
                var specializedIndex: number = -1;
                var spliceIndex: number;
                Debug.assert(!result.length);
                for (var i = 0; i < signatures.length; i++) {
                    var signature = signatures[i];
                    var symbol = signature.declaration && getSymbolOfNode(signature.declaration);
                    var parent = signature.declaration && signature.declaration.parent;
                    if (!lastSymbol || symbol === lastSymbol) {
                        if (lastParent && parent === lastParent) {
                            index++;
                        }
                        else {
                            lastParent = parent;
                            index = cutoffIndex;
                        }
                    }
                    else {
                        // current declaration belongs to a different symbol
                        // set cutoffIndex so re-orderings in the future won't change result set from 0 to cutoffIndex
                        index = cutoffIndex = result.length;
                        lastParent = parent;
                    }
                    lastSymbol = symbol;

                    // specialized signatures always need to be placed before non-specialized signatures regardless
                    // of the cutoff position; see GH#1133
                    if (signature.hasStringLiterals) {
                        specializedIndex++;
                        spliceIndex = specializedIndex;
                        // The cutoff index always needs to be greater than or equal to the specialized signature index
                        // in order to prevent non-specialized signatures from being added before a specialized
                        // signature.
                        cutoffIndex++;
                    }
                    else {
                        spliceIndex = index;
                    }

                    result.splice(spliceIndex, 0, signature);
                }
            }
        }

        function resolveCallExpression(node: CallExpression, candidatesOutArray: Signature[]): Signature {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                var superType = checkSuperExpression(node.expression);
                if (superType !== unknownType) {
                    return resolveCall(node, getSignaturesOfType(superType, SignatureKind.Construct), candidatesOutArray);
                }
                return resolveUntypedCall(node);
            }

            var funcType = checkExpression(node.expression);
            var apparentType = getApparentType(funcType);

            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }

            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including call signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            var callSignatures = getSignaturesOfType(apparentType, SignatureKind.Call);

            var constructSignatures = getSignaturesOfType(apparentType, SignatureKind.Construct);
            // TS 1.0 spec: 4.12
            // If FuncExpr is of type Any, or of an object type that has no call or construct signatures
            // but is a subtype of the Function interface, the call is an untyped function call. In an
            // untyped function call no TypeArgs are permitted, Args can be any argument list, no contextual
            // types are provided for the argument expressions, and the result is always of type Any.
            // We exclude union types because we may have a union of function types that happen to have
            // no common signatures.
            if (funcType === anyType || (!callSignatures.length && !constructSignatures.length && !(funcType.flags & TypeFlags.Union) && isTypeAssignableTo(funcType, globalFunctionType))) {
                if (node.typeArguments) {
                    error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }
            // If FuncExpr's apparent type(section 3.8.1) is a function type, the call is a typed function call.
            // TypeScript employs overload resolution in typed function calls in order to support functions
            // with multiple call signatures.
            if (!callSignatures.length) {
                if (constructSignatures.length) {
                    error(node, Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                }
                else {
                    error(node, Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                }
                return resolveErrorCall(node);
            }
            return resolveCall(node, callSignatures, candidatesOutArray);
        }

        function resolveNewExpression(node: NewExpression, candidatesOutArray: Signature[]): Signature {
            var expressionType = checkExpression(node.expression);
            // TS 1.0 spec: 4.11
            // If ConstructExpr is of type Any, Args can be any argument
            // list and the result of the operation is of type Any.
            if (expressionType === anyType) {
                if (node.typeArguments) {
                    error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }

            // If ConstructExpr's apparent type(section 3.8.1) is an object type with one or
            // more construct signatures, the expression is processed in the same manner as a
            // function call, but using the construct signatures as the initial set of candidate
            // signatures for overload resolution.The result type of the function call becomes
            // the result type of the operation.
            expressionType = getApparentType(expressionType);
            if (expressionType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }

            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including construct signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            var constructSignatures = getSignaturesOfType(expressionType, SignatureKind.Construct);
            if (constructSignatures.length) {
                return resolveCall(node, constructSignatures, candidatesOutArray);
            }

            // If ConstructExpr's apparent type is an object type with no construct signatures but
            // one or more call signatures, the expression is processed as a function call. A compile-time
            // error occurs if the result of the function call is not Void. The type of the result of the
            // operation is Any.
            var callSignatures = getSignaturesOfType(expressionType, SignatureKind.Call);
            if (callSignatures.length) {
                var signature = resolveCall(node, callSignatures, candidatesOutArray);
                if (getReturnTypeOfSignature(signature) !== voidType) {
                    error(node, Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                }
                return signature;
            }

            error(node, Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature);
            return resolveErrorCall(node);
        }

        function resolveTaggedTemplateExpression(node: TaggedTemplateExpression, candidatesOutArray: Signature[]): Signature {
            var tagType = checkExpression(node.tag);
            var apparentType = getApparentType(tagType);

            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }

            var callSignatures = getSignaturesOfType(apparentType, SignatureKind.Call);

            if (tagType === anyType || (!callSignatures.length && !(tagType.flags & TypeFlags.Union) && isTypeAssignableTo(tagType, globalFunctionType))) {
                return resolveUntypedCall(node);
            }

            if (!callSignatures.length) {
                error(node, Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                return resolveErrorCall(node);
            }

            return resolveCall(node, callSignatures, candidatesOutArray);
        }

        // candidatesOutArray is passed by signature help in the language service, and collectCandidates
        // must fill it up with the appropriate candidate signatures
        function getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[]): Signature {
            var links = getNodeLinks(node);
            // If getResolvedSignature has already been called, we will have cached the resolvedSignature.
            // However, it is possible that either candidatesOutArray was not passed in the first time,
            // or that a different candidatesOutArray was passed in. Therefore, we need to redo the work
            // to correctly fill the candidatesOutArray.
            if (!links.resolvedSignature || candidatesOutArray) {
                links.resolvedSignature = anySignature;

                if (node.kind === SyntaxKind.CallExpression) {
                    links.resolvedSignature = resolveCallExpression(<CallExpression>node, candidatesOutArray);
                }
                else if (node.kind === SyntaxKind.NewExpression) {
                    links.resolvedSignature = resolveNewExpression(<NewExpression>node, candidatesOutArray);
                }
                else if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                    links.resolvedSignature = resolveTaggedTemplateExpression(<TaggedTemplateExpression>node, candidatesOutArray);
                }
                else {
                    Debug.fail("Branch in 'getResolvedSignature' should be unreachable.");
                }
            }
            return links.resolvedSignature;
        }

        function checkCallExpression(node: CallExpression): Type {
            // Grammar checking; stop grammar-checking if checkGrammarTypeArguments return true
            checkGrammarTypeArguments(node, node.typeArguments) || checkGrammarArguments(node, node.arguments);

            var signature = getResolvedSignature(node);
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                return voidType;
            }
            if (node.kind === SyntaxKind.NewExpression) {
                var declaration = signature.declaration;
                if (declaration &&
                    declaration.kind !== SyntaxKind.Constructor &&
                    declaration.kind !== SyntaxKind.ConstructSignature &&
                    declaration.kind !== SyntaxKind.ConstructorType) {

                    // When resolved signature is a call signature (and not a construct signature) the result type is any
                    if (compilerOptions.noImplicitAny) {
                        error(node, Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type);
                    }
                    return anyType;
                }
            }
            return getReturnTypeOfSignature(signature);
        }

        function checkTaggedTemplateExpression(node: TaggedTemplateExpression): Type {
            // Grammar checking
            if (languageVersion < ScriptTarget.ES6) {
                grammarErrorOnFirstToken(node.template, Diagnostics.Tagged_templates_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }

            return getReturnTypeOfSignature(getResolvedSignature(node));
        }

        function checkTypeAssertion(node: TypeAssertion): Type {
            var exprType = checkExpression(node.expression);
            var targetType = getTypeFromTypeNode(node.type);
            if (produceDiagnostics && targetType !== unknownType) {
                var widenedType = getWidenedType(exprType);
                if (!(isTypeAssignableTo(targetType, widenedType))) {
                    checkTypeAssignableTo(exprType, targetType, node, Diagnostics.Neither_type_0_nor_type_1_is_assignable_to_the_other);
                }
            }
            return targetType;
        }

        function getTypeAtPosition(signature: Signature, pos: number): Type {
            return signature.hasRestParameter ?
                pos < signature.parameters.length - 1 ? getTypeOfSymbol(signature.parameters[pos]) : getRestTypeOfSignature(signature) :
                pos < signature.parameters.length ? getTypeOfSymbol(signature.parameters[pos]) : anyType;
        }

        function assignContextualParameterTypes(signature: Signature, context: Signature, mapper: TypeMapper) {
            var len = signature.parameters.length - (signature.hasRestParameter ? 1 : 0);
            for (var i = 0; i < len; i++) {
                var parameter = signature.parameters[i];
                var links = getSymbolLinks(parameter);
                links.type = instantiateType(getTypeAtPosition(context, i), mapper);
            }
            if (signature.hasRestParameter && context.hasRestParameter && signature.parameters.length >= context.parameters.length) {
                var parameter = signature.parameters[signature.parameters.length - 1];
                var links = getSymbolLinks(parameter);
                links.type = instantiateType(getTypeOfSymbol(context.parameters[context.parameters.length - 1]), mapper);
            }
        }

        function getReturnTypeFromBody(func: FunctionLikeDeclaration, contextualMapper?: TypeMapper): Type {
            var contextualSignature = getContextualSignatureForFunctionLikeDeclaration(func);
            if (!func.body) {
                return unknownType;
            }
            if (func.body.kind !== SyntaxKind.Block) {
                var type = checkExpressionCached(<Expression>func.body, contextualMapper);
            }
            else {
                // Aggregate the types of expressions within all the return statements.
                var types = checkAndAggregateReturnExpressionTypes(<Block>func.body, contextualMapper);
                if (types.length === 0) {
                    return voidType;
                }
                // When return statements are contextually typed we allow the return type to be a union type. Otherwise we require the
                // return expressions to have a best common supertype.
                var type = contextualSignature ? getUnionType(types) : getCommonSupertype(types);
                if (!type) {
                    error(func, Diagnostics.No_best_common_type_exists_among_return_expressions);
                    return unknownType;
                }
            }
            if (!contextualSignature) {
                reportErrorsFromWidening(func, type);
            }
            return getWidenedType(type);
        }

        /// Returns a set of types relating to every return expression relating to a function block.
        function checkAndAggregateReturnExpressionTypes(body: Block, contextualMapper?: TypeMapper): Type[] {
            var aggregatedTypes: Type[] = [];

            forEachReturnStatement(body, returnStatement => {
                var expr = returnStatement.expression;
                if (expr) {
                    var type = checkExpressionCached(expr, contextualMapper);
                    if (!contains(aggregatedTypes, type)) {
                        aggregatedTypes.push(type);
                    }
                }
            });

            return aggregatedTypes;
        }

        function bodyContainsAReturnStatement(funcBody: Block) {
            return forEachReturnStatement(funcBody, returnStatement => {
                return true;
            });
        }

        function bodyContainsSingleThrowStatement(body: Block) {
            return (body.statements.length === 1) && (body.statements[0].kind === SyntaxKind.ThrowStatement);
        }

        // TypeScript Specification 1.0 (6.3) - July 2014
        // An explicitly typed function whose return type isn't the Void or the Any type
        // must have at least one return statement somewhere in its body.
        // An exception to this rule is if the function implementation consists of a single 'throw' statement.
        function checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(func: FunctionLikeDeclaration, returnType: Type): void {
            if (!produceDiagnostics) {
                return;
            }

            // Functions that return 'void' or 'any' don't need any return expressions.
            if (returnType === voidType || returnType === anyType) {
                return;
            }

            // If all we have is a function signature, or an arrow function with an expression body, then there is nothing to check.
            if (nodeIsMissing(func.body) || func.body.kind !== SyntaxKind.Block) {
                return;
            }

            var bodyBlock = <Block>func.body;

            // Ensure the body has at least one return expression.
            if (bodyContainsAReturnStatement(bodyBlock)) {
                return;
            }

            // If there are no return expressions, then we need to check if
            // the function body consists solely of a throw statement;
            // this is to make an exception for unimplemented functions.
            if (bodyContainsSingleThrowStatement(bodyBlock)) {
                return;
            }

            // This function does not conform to the specification.
            error(func.type, Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_or_consist_of_a_single_throw_statement);
        }

        function checkFunctionExpressionOrObjectLiteralMethod(node: FunctionExpression | MethodDeclaration, contextualMapper?: TypeMapper): Type {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));

            // Grammar checking
            var hasGrammarError = checkGrammarFunctionLikeDeclaration(node);
            if (!hasGrammarError && node.kind === SyntaxKind.FunctionExpression) {
                checkGrammarFunctionName(node.name) || checkGrammarForGenerator(node);
            }

            // The identityMapper object is used to indicate that function expressions are wildcards
            if (contextualMapper === identityMapper && isContextSensitive(node)) {
                return anyFunctionType;
            }
            var links = getNodeLinks(node);
            var type = getTypeOfSymbol(node.symbol);
            // Check if function expression is contextually typed and assign parameter types if so
            if (!(links.flags & NodeCheckFlags.ContextChecked)) {
                var contextualSignature = getContextualSignature(node);
                // If a type check is started at a function expression that is an argument of a function call, obtaining the
                // contextual type may recursively get back to here during overload resolution of the call. If so, we will have
                // already assigned contextual types.
                if (!(links.flags & NodeCheckFlags.ContextChecked)) {
                    links.flags |= NodeCheckFlags.ContextChecked;
                    if (contextualSignature) {
                        var signature = getSignaturesOfType(type, SignatureKind.Call)[0];
                        if (isContextSensitive(node)) {
                            assignContextualParameterTypes(signature, contextualSignature, contextualMapper || identityMapper);
                        }
                        if (!node.type) {
                            signature.resolvedReturnType = resolvingType;
                            var returnType = getReturnTypeFromBody(node, contextualMapper);
                            if (signature.resolvedReturnType === resolvingType) {
                                signature.resolvedReturnType = returnType;
                            }
                        }
                    }
                    checkSignatureDeclaration(node);
                }
            }

            if (produceDiagnostics && node.kind !== SyntaxKind.MethodDeclaration && node.kind !== SyntaxKind.MethodSignature) {
                checkCollisionWithCapturedSuperVariable(node, (<FunctionExpression>node).name);
                checkCollisionWithCapturedThisVariable(node,(<FunctionExpression>node).name);
            }

            return type;
        }

        function checkFunctionExpressionOrObjectLiteralMethodBody(node: FunctionExpression | MethodDeclaration) {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));
            if (node.type) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
            }

            if (node.body) {
                if (node.body.kind === SyntaxKind.Block) {
                    checkSourceElement(node.body);
                }
                else {
                    var exprType = checkExpression(<Expression>node.body);
                    if (node.type) {
                        checkTypeAssignableTo(exprType, getTypeFromTypeNode(node.type), node.body, /*headMessage*/ undefined);
                    }
                    checkFunctionExpressionBodies(node.body);
                }
            }
        }

        function checkArithmeticOperandType(operand: Node, type: Type, diagnostic: DiagnosticMessage): boolean {
            if (!isTypeOfKind(type, TypeFlags.Any | TypeFlags.NumberLike)) {
                error(operand, diagnostic);
                return false;
            }
            return true;
        }

        function checkReferenceExpression(n: Node, invalidReferenceMessage: DiagnosticMessage, constantVarianleMessage: DiagnosticMessage): boolean {
            function findSymbol(n: Node): Symbol {
                var symbol = getNodeLinks(n).resolvedSymbol;
                // Because we got the symbol from the resolvedSymbol property, it might be of kind
                // SymbolFlags.ExportValue. In this case it is necessary to get the actual export
                // symbol, which will have the correct flags set on it.
                return symbol && getExportSymbolOfValueSymbolIfExported(symbol);
            }

            function isReferenceOrErrorExpression(n: Node): boolean {
                // TypeScript 1.0 spec (April 2014):
                // Expressions are classified as values or references. 
                // References are the subset of expressions that are permitted as the target of an assignment.
                // Specifically, references are combinations of identifiers(section 4.3), parentheses(section 4.7), 
                // and property accesses(section 4.10).
                // All other expression constructs described in this chapter are classified as values.
                switch (n.kind) {
                    case SyntaxKind.Identifier:
                        var symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.3
                        // An identifier expression that references a variable or parameter is classified as a reference. 
                        // An identifier expression that references any other kind of entity is classified as a value(and therefore cannot be the target of an assignment).
                        return !symbol || symbol === unknownSymbol || symbol === argumentsSymbol || (symbol.flags & SymbolFlags.Variable) !== 0;
                    case SyntaxKind.PropertyAccessExpression:
                        var symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.10
                        // A property access expression is always classified as a reference.
                        // NOTE (not in spec): assignment to enum members should not be allowed
                        return !symbol || symbol === unknownSymbol || (symbol.flags & ~SymbolFlags.EnumMember) !== 0;
                    case SyntaxKind.ElementAccessExpression:
                        //  old compiler doesn't check indexed assess
                        return true;
                    case SyntaxKind.ParenthesizedExpression:
                        return isReferenceOrErrorExpression((<ParenthesizedExpression>n).expression);
                    default:
                        return false;
                }
            }

            function isConstVariableReference(n: Node): boolean {
                switch (n.kind) {
                    case SyntaxKind.Identifier:
                    case SyntaxKind.PropertyAccessExpression:
                        var symbol = findSymbol(n);
                        return symbol && (symbol.flags & SymbolFlags.Variable) !== 0 && (getDeclarationFlagsFromSymbol(symbol) & NodeFlags.Const) !== 0;
                    case SyntaxKind.ElementAccessExpression:
                        var index = (<ElementAccessExpression>n).argumentExpression;
                        var symbol = findSymbol((<ElementAccessExpression>n).expression);

                        if (symbol && index && index.kind === SyntaxKind.StringLiteral) {
                            var name = (<LiteralExpression>index).text;
                            var prop = getPropertyOfType(getTypeOfSymbol(symbol), name);
                            return prop && (prop.flags & SymbolFlags.Variable) !== 0 && (getDeclarationFlagsFromSymbol(prop) & NodeFlags.Const) !== 0;
                        }
                        return false;
                    case SyntaxKind.ParenthesizedExpression:
                        return isConstVariableReference((<ParenthesizedExpression>n).expression);
                    default:
                        return false;
                }
            }

            if (!isReferenceOrErrorExpression(n)) {
                error(n, invalidReferenceMessage);
                return false;
            }
            if (isConstVariableReference(n)) {
                error(n, constantVarianleMessage);
                return false;
            }
            return true;
        }

        function checkDeleteExpression(node: DeleteExpression): Type {
            // Grammar checking
            if (node.parserContextFlags & ParserContextFlags.StrictMode && node.expression.kind === SyntaxKind.Identifier) {
                // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
                // UnaryExpression is a direct reference to a variable, function argument, or function name
                grammarErrorOnNode(node.expression, Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode);
            }

            var operandType = checkExpression(node.expression);
            return booleanType;
        }

        function checkTypeOfExpression(node: TypeOfExpression): Type {
            var operandType = checkExpression(node.expression);
            return stringType;
        }

        function checkVoidExpression(node: VoidExpression): Type {
            var operandType = checkExpression(node.expression);
            return undefinedType;
        }

        function checkPrefixUnaryExpression(node: PrefixUnaryExpression): Type {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator
            if ((node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken)) {
                checkGrammarEvalOrArgumentsInStrictMode(node, <Identifier>node.operand);
            }

            var operandType = checkExpression(node.operand);
            switch (node.operator) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                    return numberType;
                case SyntaxKind.ExclamationToken:
                    return booleanType;
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    var ok = checkArithmeticOperandType(node.operand, operandType, Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
                    if (ok) {
                        // run check only if former checks succeeded to avoid reporting cascading errors
                        checkReferenceExpression(node.operand,
                            Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer,
                            Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
                    }
                    return numberType;
            }
            return unknownType;
        }

        function checkPostfixUnaryExpression(node: PostfixUnaryExpression): Type {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
            checkGrammarEvalOrArgumentsInStrictMode(node, <Identifier>node.operand);

            var operandType = checkExpression(node.operand);
            var ok = checkArithmeticOperandType(node.operand, operandType, Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
            if (ok) {
                // run check only if former checks succeeded to avoid reporting cascading errors
                checkReferenceExpression(node.operand,
                    Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer,
                    Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
            }
            return numberType;
        }

        // Return true if type has the given flags, or is a union type composed of types that all have those flags
        function isTypeOfKind(type: Type, kind: TypeFlags): boolean {
            if (type.flags & kind) {
                return true;
            }
            if (type.flags & TypeFlags.Union) {
                var types = (<UnionType>type).types;
                for (var i = 0; i < types.length; i++) {
                    if (!(types[i].flags & kind)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        function isConstEnumObjectType(type: Type): boolean {
            return type.flags & (TypeFlags.ObjectType | TypeFlags.Anonymous) && type.symbol && isConstEnumSymbol(type.symbol);
        }

        function isConstEnumSymbol(symbol: Symbol): boolean {
            return (symbol.flags & SymbolFlags.ConstEnum) !== 0;
        }

        function checkInstanceOfExpression(node: BinaryExpression, leftType: Type, rightType: Type): Type {
            // TypeScript 1.0 spec (April 2014): 4.15.4
            // The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
            // and the right operand to be of type Any or a subtype of the 'Function' interface type. 
            // The result is always of the Boolean primitive type.
            // NOTE: do not raise error if leftType is unknown as related error was already reported
            if (isTypeOfKind(leftType, TypeFlags.Primitive)) {
                error(node.left, Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            // NOTE: do not raise error if right is unknown as related error was already reported
            if (!(rightType.flags & TypeFlags.Any || isTypeSubtypeOf(rightType, globalFunctionType))) {
                error(node.right, Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
            }
            return booleanType;
        }

        function checkInExpression(node: BinaryExpression, leftType: Type, rightType: Type): Type {
            // TypeScript 1.0 spec (April 2014): 4.15.5
            // The in operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type,
            // and the right operand to be of type Any, an object type, or a type parameter type.
            // The result is always of the Boolean primitive type.
            if (!isTypeOfKind(leftType, TypeFlags.Any | TypeFlags.StringLike | TypeFlags.NumberLike)) {
                error(node.left, Diagnostics.The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number);
            }
            if (!isTypeOfKind(rightType, TypeFlags.Any | TypeFlags.ObjectType | TypeFlags.TypeParameter)) {
                error(node.right, Diagnostics.The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            return booleanType;
        }

        function checkObjectLiteralAssignment(node: ObjectLiteralExpression, sourceType: Type, contextualMapper?: TypeMapper): Type {
            var properties = node.properties;
            for (var i = 0; i < properties.length; i++) {
                var p = properties[i];
                if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    // TODO(andersh): Computed property support
                    var name = <Identifier>(<PropertyAssignment>p).name;
                    var type = sourceType.flags & TypeFlags.Any ? sourceType :
                        getTypeOfPropertyOfType(sourceType, name.text) ||
                        isNumericLiteralName(name.text) && getIndexTypeOfType(sourceType, IndexKind.Number) ||
                        getIndexTypeOfType(sourceType, IndexKind.String);
                    if (type) {
                        checkDestructuringAssignment((<PropertyAssignment>p).initializer || name, type);
                    }
                    else {
                        error(name, Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(sourceType), declarationNameToString(name));
                    }
                }
                else {
                    error(p, Diagnostics.Property_assignment_expected);
                }
            }
            return sourceType;
        }

        function checkArrayLiteralAssignment(node: ArrayLiteralExpression, sourceType: Type, contextualMapper?: TypeMapper): Type {
            // TODOO(andersh): Allow iterable source type in ES6
            if (!isTypeAssignableTo(sourceType, anyArrayType)) {
                error(node, Diagnostics.Type_0_is_not_an_array_type, typeToString(sourceType));
                return sourceType;
            }
            var elements = node.elements;
            for (var i = 0; i < elements.length; i++) {
                var e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        var propName = "" + i;
                        var type = sourceType.flags & TypeFlags.Any ? sourceType :
                            isTupleLikeType(sourceType) ? getTypeOfPropertyOfType(sourceType, propName) :
                            getIndexTypeOfType(sourceType, IndexKind.Number);
                        if (type) {
                            checkDestructuringAssignment(e, type, contextualMapper);
                        }
                        else {
                            error(e, Diagnostics.Type_0_has_no_property_1, typeToString(sourceType), propName);
                        }
                    }
                    else {
                        if (i === elements.length - 1) {
                            checkReferenceAssignment((<SpreadElementExpression>e).expression, sourceType, contextualMapper);
                        }
                        else {
                            error(e, Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                        }
                    }
                }
            }
            return sourceType;
        }

        function checkDestructuringAssignment(target: Expression, sourceType: Type, contextualMapper?: TypeMapper): Type {
            if (target.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>target).operator === SyntaxKind.EqualsToken) {
                checkBinaryExpression(<BinaryExpression>target, contextualMapper);
                target = (<BinaryExpression>target).left;
            }
            if (target.kind === SyntaxKind.ObjectLiteralExpression) {
                return checkObjectLiteralAssignment(<ObjectLiteralExpression>target, sourceType, contextualMapper);
            }
            if (target.kind === SyntaxKind.ArrayLiteralExpression) {
                return checkArrayLiteralAssignment(<ArrayLiteralExpression>target, sourceType, contextualMapper);
            }
            return checkReferenceAssignment(target, sourceType, contextualMapper);
        }

        function checkReferenceAssignment(target: Expression, sourceType: Type, contextualMapper?: TypeMapper): Type {
            var targetType = checkExpression(target, contextualMapper);
            if (checkReferenceExpression(target, Diagnostics.Invalid_left_hand_side_of_assignment_expression, Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant)) {
                checkTypeAssignableTo(sourceType, targetType, target, /*headMessage*/ undefined);
            }
            return sourceType;
        }

        function checkBinaryExpression(node: BinaryExpression, contextualMapper?: TypeMapper) {
            // Grammar checking
            if (isLeftHandSideExpression(node.left) && isAssignmentOperator(node.operator)) {
                // ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
                // Assignment operator(11.13) or of a PostfixExpression(11.3)
                checkGrammarEvalOrArgumentsInStrictMode(node, <Identifier>node.left);
            }

            var operator = node.operator;
            if (operator === SyntaxKind.EqualsToken && (node.left.kind === SyntaxKind.ObjectLiteralExpression || node.left.kind === SyntaxKind.ArrayLiteralExpression)) {
                return checkDestructuringAssignment(node.left, checkExpression(node.right, contextualMapper), contextualMapper);
            }
            var leftType = checkExpression(node.left, contextualMapper);
            var rightType = checkExpression(node.right, contextualMapper);
            switch (operator) {
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.LessThanLessThanToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.BarToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.CaretToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.AmpersandToken:
                case SyntaxKind.AmpersandEqualsToken:
                    // TypeScript 1.0 spec (April 2014): 4.15.1
                    // These operators require their operands to be of type Any, the Number primitive type,
                    // or an enum type. Operands of an enum type are treated 
                    // as having the primitive type Number. If one operand is the null or undefined value,
                    // it is treated as having the type of the other operand.
                    // The result is always of the Number primitive type.
                    if (leftType.flags & (TypeFlags.Undefined | TypeFlags.Null)) leftType = rightType;
                    if (rightType.flags & (TypeFlags.Undefined | TypeFlags.Null)) rightType = leftType;

                    var suggestedOperator: SyntaxKind;
                    // if a user tries to apply a bitwise operator to 2 boolean operands 
                    // try and return them a helpful suggestion
                    if ((leftType.flags & TypeFlags.Boolean) &&
                        (rightType.flags & TypeFlags.Boolean) &&
                        (suggestedOperator = getSuggestedBooleanOperator(node.operator)) !== undefined) {
                        error(node, Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, tokenToString(node.operator), tokenToString(suggestedOperator));
                    }
                    else {
                        // otherwise just check each operand separately and report errors as normal 
                        var leftOk = checkArithmeticOperandType(node.left, leftType, Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        var rightOk = checkArithmeticOperandType(node.right, rightType, Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        if (leftOk && rightOk) {
                            checkAssignmentOperator(numberType);
                        }
                    }

                    return numberType;
                case SyntaxKind.PlusToken:
                case SyntaxKind.PlusEqualsToken:
                    // TypeScript 1.0 spec (April 2014): 4.15.2
                    // The binary + operator requires both operands to be of the Number primitive type or an enum type,
                    // or at least one of the operands to be of type Any or the String primitive type.

                    // If one operand is the null or undefined value, it is treated as having the type of the other operand.
                    if (leftType.flags & (TypeFlags.Undefined | TypeFlags.Null)) leftType = rightType;
                    if (rightType.flags & (TypeFlags.Undefined | TypeFlags.Null)) rightType = leftType;

                    var resultType: Type;
                    if (isTypeOfKind(leftType, TypeFlags.NumberLike) && isTypeOfKind(rightType, TypeFlags.NumberLike)) {
                        // Operands of an enum type are treated as having the primitive type Number.
                        // If both operands are of the Number primitive type, the result is of the Number primitive type.
                        resultType = numberType;
                    }
                    else if (isTypeOfKind(leftType, TypeFlags.StringLike) || isTypeOfKind(rightType, TypeFlags.StringLike)) {
                        // If one or both operands are of the String primitive type, the result is of the String primitive type.
                        resultType = stringType;
                    }
                    else if (leftType.flags & TypeFlags.Any || rightType.flags & TypeFlags.Any) {
                        // Otherwise, the result is of type Any.
                        // NOTE: unknown type here denotes error type. Old compiler treated this case as any type so do we.
                        resultType = anyType;
                    }

                    if (!resultType) {
                        reportOperatorError();
                        return anyType;
                    }

                    if (operator === SyntaxKind.PlusEqualsToken) {
                        checkAssignmentOperator(resultType);
                    }
                    return resultType;
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                case SyntaxKind.LessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanEqualsToken:
                    if (!isTypeAssignableTo(leftType, rightType) && !isTypeAssignableTo(rightType, leftType)) {
                        reportOperatorError();
                    }
                    return booleanType;
                case SyntaxKind.InstanceOfKeyword:
                    return checkInstanceOfExpression(node, leftType, rightType);
                case SyntaxKind.InKeyword:
                    return checkInExpression(node, leftType, rightType);
                case SyntaxKind.AmpersandAmpersandToken:
                    return rightType;
                case SyntaxKind.BarBarToken:
                    return getUnionType([leftType, rightType]);
                case SyntaxKind.EqualsToken:
                    checkAssignmentOperator(rightType);
                    return rightType;
                case SyntaxKind.CommaToken:
                    return rightType;
            }

            function getSuggestedBooleanOperator(operator: SyntaxKind): SyntaxKind {
                switch (operator) {
                    case SyntaxKind.BarToken:
                    case SyntaxKind.BarEqualsToken:
                        return SyntaxKind.BarBarToken;
                    case SyntaxKind.CaretToken:
                    case SyntaxKind.CaretEqualsToken:
                        return SyntaxKind.ExclamationEqualsEqualsToken;
                    case SyntaxKind.AmpersandToken:
                    case SyntaxKind.AmpersandEqualsToken:
                        return SyntaxKind.AmpersandAmpersandToken;
                    default:
                        return undefined;
                }
            }

            function checkAssignmentOperator(valueType: Type): void {
                if (produceDiagnostics && operator >= SyntaxKind.FirstAssignment && operator <= SyntaxKind.LastAssignment) {
                    // TypeScript 1.0 spec (April 2014): 4.17
                    // An assignment of the form
                    //    VarExpr = ValueExpr
                    // requires VarExpr to be classified as a reference
                    // A compound assignment furthermore requires VarExpr to be classified as a reference (section 4.1) 
                    // and the type of the non - compound operation to be assignable to the type of VarExpr.
                    var ok = checkReferenceExpression(node.left, Diagnostics.Invalid_left_hand_side_of_assignment_expression, Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                    // Use default messages
                    if (ok) {
                        // to avoid cascading errors check assignability only if 'isReference' check succeeded and no errors were reported
                        checkTypeAssignableTo(valueType, leftType, node.left, /*headMessage*/ undefined);
                    }
                }
            }

            function reportOperatorError() {
                error(node, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, tokenToString(node.operator), typeToString(leftType), typeToString(rightType));
            }
        }

        function checkYieldExpression(node: YieldExpression): void {
            // Grammar checking
            if (!(node.parserContextFlags & ParserContextFlags.Yield)) {
                grammarErrorOnFirstToken(node, Diagnostics.yield_expression_must_be_contained_within_a_generator_declaration);
            }
            else {
                grammarErrorOnFirstToken(node, Diagnostics.yield_expressions_are_not_currently_supported);
            }
        }

        function checkConditionalExpression(node: ConditionalExpression, contextualMapper?: TypeMapper): Type {
            checkExpression(node.condition);
            var type1 = checkExpression(node.whenTrue, contextualMapper);
            var type2 = checkExpression(node.whenFalse, contextualMapper);
            return getUnionType([type1, type2]);
        }

        function checkTemplateExpression(node: TemplateExpression): Type {
            // We just want to check each expressions, but we are unconcerned with
            // the type of each expression, as any value may be coerced into a string.
            // It is worth asking whether this is what we really want though.
            // A place where we actually *are* concerned with the expressions' types are
            // in tagged templates.
            forEach((<TemplateExpression>node).templateSpans, templateSpan => {
                checkExpression(templateSpan.expression);
            });

            return stringType;
        }

        function checkExpressionWithContextualType(node: Expression, contextualType: Type, contextualMapper?: TypeMapper): Type {
            var saveContextualType = node.contextualType;
            node.contextualType = contextualType;
            var result = checkExpression(node, contextualMapper);
            node.contextualType = saveContextualType;
            return result;
        }

        function checkExpressionCached(node: Expression, contextualMapper?: TypeMapper): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node, contextualMapper);
            }
            return links.resolvedType;
        }

        function checkPropertyAssignment(node: PropertyAssignment, contextualMapper?: TypeMapper): Type {
            if (hasDynamicName(node)) {
                checkComputedPropertyName(<ComputedPropertyName>node.name);
            }

            return checkExpression((<PropertyAssignment>node).initializer, contextualMapper);
        }

        function checkObjectLiteralMethod(node: MethodDeclaration, contextualMapper?: TypeMapper): Type {
            // Grammar checking
            checkGrammarMethod(node);

            if (hasDynamicName(node)) {
                checkComputedPropertyName(<ComputedPropertyName>node.name);
            }

            var uninstantiatedType = checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper);
            return instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, contextualMapper);
        }

        function instantiateTypeWithSingleGenericCallSignature(node: Expression | MethodDeclaration, type: Type, contextualMapper?: TypeMapper) {
            if (contextualMapper && contextualMapper !== identityMapper) {
                var signature = getSingleCallSignature(type);
                if (signature && signature.typeParameters) {
                    var contextualType = getContextualType(<Expression>node);
                    if (contextualType) {
                        var contextualSignature = getSingleCallSignature(contextualType);
                        if (contextualSignature && !contextualSignature.typeParameters) {
                            return getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper));
                        }
                    }
                }
            }

            return type;
        }

        function checkExpression(node: Expression, contextualMapper?: TypeMapper): Type {
            return checkExpressionOrQualifiedName(node, contextualMapper);
        }

        // Checks an expression and returns its type. The contextualMapper parameter serves two purposes: When
        // contextualMapper is not undefined and not equal to the identityMapper function object it indicates that the
        // expression is being inferentially typed (section 4.12.2 in spec) and provides the type mapper to use in
        // conjunction with the generic contextual type. When contextualMapper is equal to the identityMapper function
        // object, it serves as an indicator that all contained function and arrow expressions should be considered to
        // have the wildcard function type; this form of type check is used during overload resolution to exclude
        // contextually typed function and arrow expressions in the initial phase.
        function checkExpressionOrQualifiedName(node: Expression | QualifiedName, contextualMapper?: TypeMapper): Type {
            var type: Type;
            if (node.kind == SyntaxKind.QualifiedName) {
                type = checkQualifiedName(<QualifiedName>node);
            }
            else {
                var uninstantiatedType = checkExpressionWorker(<Expression>node, contextualMapper);
                type = instantiateTypeWithSingleGenericCallSignature(<Expression>node, uninstantiatedType, contextualMapper);
            }

            if (isConstEnumObjectType(type)) {
                // enum object type for const enums are only permitted in:
                // - 'left' in property access 
                // - 'object' in indexed access
                // - target in rhs of import statement
                var ok =
                    (node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).expression === node) ||
                    (node.parent.kind === SyntaxKind.ElementAccessExpression && (<ElementAccessExpression>node.parent).expression === node) ||
                    ((node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName) && isInRightSideOfImportOrExportAssignment(<Identifier>node));

                if (!ok) {
                    error(node, Diagnostics.const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment);
                }
            }
            return type;
        }

        function checkNumericLiteral(node: LiteralExpression): Type {
            // Grammar checking
            checkGrammarNumbericLiteral(node);
            return numberType;
        }

        function checkExpressionWorker(node: Expression, contextualMapper: TypeMapper): Type {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return checkIdentifier(<Identifier>node);
                case SyntaxKind.ThisKeyword:
                    return checkThisExpression(node);
                case SyntaxKind.SuperKeyword:
                    return checkSuperExpression(node);
                case SyntaxKind.NullKeyword:
                    return nullType;
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return booleanType;
                case SyntaxKind.NumericLiteral:
                    return checkNumericLiteral(<LiteralExpression>node);
                case SyntaxKind.TemplateExpression:
                    return checkTemplateExpression(<TemplateExpression>node);
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return stringType;
                case SyntaxKind.RegularExpressionLiteral:
                    return globalRegExpType;
                case SyntaxKind.ArrayLiteralExpression:
                    return checkArrayLiteral(<ArrayLiteralExpression>node, contextualMapper);
                case SyntaxKind.ObjectLiteralExpression:
                    return checkObjectLiteral(<ObjectLiteralExpression>node, contextualMapper);
                case SyntaxKind.PropertyAccessExpression:
                    return checkPropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return checkIndexedAccess(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    return checkCallExpression(<CallExpression>node);
                case SyntaxKind.TaggedTemplateExpression:
                    return checkTaggedTemplateExpression(<TaggedTemplateExpression>node);
                case SyntaxKind.TypeAssertionExpression:
                    return checkTypeAssertion(<TypeAssertion>node);
                case SyntaxKind.ParenthesizedExpression:
                    return checkExpression((<ParenthesizedExpression>node).expression, contextualMapper);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return checkFunctionExpressionOrObjectLiteralMethod(<FunctionExpression>node, contextualMapper);
                case SyntaxKind.TypeOfExpression:
                    return checkTypeOfExpression(<TypeOfExpression>node);
                case SyntaxKind.DeleteExpression:
                    return checkDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.VoidExpression:
                    return checkVoidExpression(<VoidExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                    return checkPrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.PostfixUnaryExpression:
                    return checkPostfixUnaryExpression(<PostfixUnaryExpression>node);
                case SyntaxKind.BinaryExpression:
                    return checkBinaryExpression(<BinaryExpression>node, contextualMapper);
                case SyntaxKind.ConditionalExpression:
                    return checkConditionalExpression(<ConditionalExpression>node, contextualMapper);
                case SyntaxKind.SpreadElementExpression:
                    return checkSpreadElementExpression(<SpreadElementExpression>node, contextualMapper);
                case SyntaxKind.OmittedExpression:
                    return undefinedType;
                case SyntaxKind.YieldExpression:
                    checkYieldExpression(<YieldExpression>node);
                    return unknownType;
            }
            return unknownType;
        }

        // DECLARATION AND STATEMENT TYPE CHECKING

        function checkTypeParameter(node: TypeParameterDeclaration) {
            // Grammar Checking
            if (node.expression) {
                grammarErrorOnFirstToken(node.expression, Diagnostics.Type_expected);
            }

            checkSourceElement(node.constraint);
            if (produceDiagnostics) {
                checkTypeParameterHasIllegalReferencesInConstraint(node);
                checkTypeNameIsReserved(node.name, Diagnostics.Type_parameter_name_cannot_be_0);
            }
            // TODO: Check multiple declarations are identical
        }

        function checkParameter(node: ParameterDeclaration) {
            // Grammar checking
            // It is a SyntaxError if the Identifier "eval" or the Identifier "arguments" occurs as the
            // Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in strict code
            // or if its FunctionBody is strict code(11.1.5).
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
            // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)

            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarEvalOrArgumentsInStrictMode(node, <Identifier>node.name);

            checkVariableLikeDeclaration(node);
            var func = getContainingFunction(node);
            if (node.flags & NodeFlags.AccessibilityModifier) {
                func = getContainingFunction(node);
                if (!(func.kind === SyntaxKind.Constructor && nodeIsPresent(func.body))) {
                    error(node, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                }
            }
            if (node.questionToken && isBindingPattern(node.name) && func.body) {
                error(node, Diagnostics.A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature);
            }
            if (node.dotDotDotToken) {
                if (!isArrayType(getTypeOfSymbol(node.symbol))) {
                    error(node, Diagnostics.A_rest_parameter_must_be_of_an_array_type);
                }
            }
        }

        function checkSignatureDeclaration(node: SignatureDeclaration) {
            // Grammar checking
            if (node.kind === SyntaxKind.IndexSignature) {
                checkGrammarIndexSignature(<SignatureDeclaration>node);
            }
            // TODO (yuisu): Remove this check in else-if when SyntaxKind.Construct is moved and ambient context is handled
            else if (node.kind === SyntaxKind.FunctionType || node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.ConstructorType ||
                      node.kind === SyntaxKind.CallSignature || node.kind === SyntaxKind.Constructor ||
                      node.kind === SyntaxKind.ConstructSignature){
                checkGrammarFunctionLikeDeclaration(<FunctionLikeDeclaration>node);
            }

            checkTypeParameters(node.typeParameters);

            forEach(node.parameters, checkParameter);

            if (node.type) {
                checkSourceElement(node.type);
            }

            if (produceDiagnostics) {
                checkCollisionWithArgumentsInGeneratedCode(node);
                if (compilerOptions.noImplicitAny && !node.type) {
                    switch (node.kind) {
                        case SyntaxKind.ConstructSignature:
                            error(node, Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                        case SyntaxKind.CallSignature:
                            error(node, Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                    }
                }
            }

            checkSpecializedSignatureDeclaration(node);
        }

        function checkTypeForDuplicateIndexSignatures(node: Node) {
            if (node.kind === SyntaxKind.InterfaceDeclaration) {
                var nodeSymbol = getSymbolOfNode(node);
                // in case of merging interface declaration it is possible that we'll enter this check procedure several times for every declaration
                // to prevent this run check only for the first declaration of a given kind
                if (nodeSymbol.declarations.length > 0 && nodeSymbol.declarations[0] !== node) {
                    return;
                }
            }

            // TypeScript 1.0 spec (April 2014)
            // 3.7.4: An object type can contain at most one string index signature and one numeric index signature.
            // 8.5: A class declaration can have at most one string index member declaration and one numeric index member declaration
            var indexSymbol = getIndexSymbol(getSymbolOfNode(node));
            if (indexSymbol) {
                var seenNumericIndexer = false;
                var seenStringIndexer = false;
                for (var i = 0, len = indexSymbol.declarations.length; i < len; ++i) {
                    var declaration = <SignatureDeclaration>indexSymbol.declarations[i];
                    if (declaration.parameters.length === 1 && declaration.parameters[0].type) {
                        switch (declaration.parameters[0].type.kind) {
                            case SyntaxKind.StringKeyword:
                                if (!seenStringIndexer) {
                                    seenStringIndexer = true;
                                }
                                else {
                                    error(declaration, Diagnostics.Duplicate_string_index_signature);
                                }
                                break;
                            case SyntaxKind.NumberKeyword:
                                if (!seenNumericIndexer) {
                                    seenNumericIndexer = true;
                                }
                                else {
                                    error(declaration, Diagnostics.Duplicate_number_index_signature);
                                }
                                break;
                        }
                    }
                }
            }
        }

        function checkPropertyDeclaration(node: PropertyDeclaration) {
            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarProperty(node);

            checkVariableLikeDeclaration(node);
        }

        function checkMethodDeclaration(node: MethodDeclaration) {
            // Grammar checking
            checkGrammarMethod(node) || checkGrammarComputedPropertyName(node.name);

            // Grammar checking for modifiers is done inside the function checkGrammarFunctionLikeDeclaration
            checkFunctionLikeDeclaration(node);
        }

        function checkConstructorDeclaration(node: ConstructorDeclaration) {
            // Grammar check on signature of constructor and modifier of the constructor is done in checkSignatureDeclaration function.
            checkSignatureDeclaration(node);
            // Grammar check for checking only related to constructoDeclaration
            checkGrammarConstructorTypeParameters(node) || checkGrammarConstructorTypeAnnotation(node);

            checkSourceElement(node.body);

            var symbol = getSymbolOfNode(node);
            var firstDeclaration = getDeclarationOfKind(symbol, node.kind);
            // Only type check the symbol once
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(symbol);
            }

            // exit early in the case of signature - super checks are not relevant to them
            if (nodeIsMissing(node.body)) {
                return;
            }

            if (!produceDiagnostics) {
                return;
            }

            function isSuperCallExpression(n: Node): boolean {
                return n.kind === SyntaxKind.CallExpression && (<CallExpression>n).expression.kind === SyntaxKind.SuperKeyword;
            }

            function containsSuperCall(n: Node): boolean {
                if (isSuperCallExpression(n)) {
                    return true;
                }
                switch (n.kind) {
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.ObjectLiteralExpression: return false;
                    default: return forEachChild(n, containsSuperCall);
                }
            }

            function markThisReferencesAsErrors(n: Node): void {
                if (n.kind === SyntaxKind.ThisKeyword) {
                    error(n, Diagnostics.this_cannot_be_referenced_in_current_location);
                }
                else if (n.kind !== SyntaxKind.FunctionExpression && n.kind !== SyntaxKind.FunctionDeclaration) {
                    forEachChild(n, markThisReferencesAsErrors);
                }
            }

            function isInstancePropertyWithInitializer(n: Node): boolean {
                return n.kind === SyntaxKind.PropertyDeclaration &&
                    !(n.flags & NodeFlags.Static) &&
                    !!(<PropertyDeclaration>n).initializer;
            }

            // TS 1.0 spec (April 2014): 8.3.2
            // Constructors of classes with no extends clause may not contain super calls, whereas 
            // constructors of derived classes must contain at least one super call somewhere in their function body.
            if (getClassBaseTypeNode(<ClassDeclaration>node.parent)) {

                if (containsSuperCall(node.body)) {
                    // The first statement in the body of a constructor must be a super call if both of the following are true:
                    // - The containing class is a derived class.
                    // - The constructor declares parameter properties 
                    //   or the containing class declares instance member variables with initializers.
                    var superCallShouldBeFirst =
                        forEach((<ClassDeclaration>node.parent).members, isInstancePropertyWithInitializer) ||
                        forEach(node.parameters, p => p.flags & (NodeFlags.Public | NodeFlags.Private | NodeFlags.Protected));

                    if (superCallShouldBeFirst) {
                        var statements = (<Block>node.body).statements;
                        if (!statements.length || statements[0].kind !== SyntaxKind.ExpressionStatement || !isSuperCallExpression((<ExpressionStatement>statements[0]).expression)) {
                            error(node, Diagnostics.A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties);
                        }
                        else {
                            // In such a required super call, it is a compile-time error for argument expressions to reference this.
                            markThisReferencesAsErrors((<ExpressionStatement>statements[0]).expression);
                        }
                    }
                }
                else {
                    error(node, Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call);
                }
            }
        }

        function checkAccessorDeclaration(node: AccessorDeclaration) {
            if (produceDiagnostics) {
                // Grammar checking accessors
                checkGrammarFunctionLikeDeclaration(node) || checkGrammarAccessor(node) || checkGrammarComputedPropertyName(node.name);

                if (node.kind === SyntaxKind.GetAccessor) {
                    if (!isInAmbientContext(node) && nodeIsPresent(node.body) && !(bodyContainsAReturnStatement(<Block>node.body) || bodyContainsSingleThrowStatement(<Block>node.body))) {
                        error(node.name, Diagnostics.A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement);
                    }
                }

                if (!hasDynamicName(node)) {
                    // TypeScript 1.0 spec (April 2014): 8.4.3
                    // Accessors for the same member name must specify the same accessibility.
                    var otherKind = node.kind === SyntaxKind.GetAccessor ? SyntaxKind.SetAccessor : SyntaxKind.GetAccessor;
                    var otherAccessor = <AccessorDeclaration>getDeclarationOfKind(node.symbol, otherKind);
                    if (otherAccessor) {
                        if (((node.flags & NodeFlags.AccessibilityModifier) !== (otherAccessor.flags & NodeFlags.AccessibilityModifier))) {
                            error(node.name, Diagnostics.Getter_and_setter_accessors_do_not_agree_in_visibility);
                        }

                        var currentAccessorType = getAnnotatedAccessorType(node);
                        var otherAccessorType = getAnnotatedAccessorType(otherAccessor);
                        // TypeScript 1.0 spec (April 2014): 4.5
                        // If both accessors include type annotations, the specified types must be identical.
                        if (currentAccessorType && otherAccessorType) {
                            if (!isTypeIdenticalTo(currentAccessorType, otherAccessorType)) {
                                error(node, Diagnostics.get_and_set_accessor_must_have_the_same_type);
                            }
                        }
                    }
                }

                checkAndStoreTypeOfAccessors(getSymbolOfNode(node));
            }

            checkFunctionLikeDeclaration(node);
        }

        function checkTypeReference(node: TypeReferenceNode) {
            // Grammar checking
            checkGrammarTypeArguments(node, node.typeArguments);

            var type = getTypeFromTypeReferenceNode(node);
            if (type !== unknownType && node.typeArguments) {
                // Do type argument local checks only if referenced type is successfully resolved
                var len = node.typeArguments.length;
                for (var i = 0; i < len; i++) {
                    checkSourceElement(node.typeArguments[i]);
                    var constraint = getConstraintOfTypeParameter((<TypeReference>type).target.typeParameters[i]);
                    if (produceDiagnostics && constraint) {
                        var typeArgument = (<TypeReference>type).typeArguments[i];
                        checkTypeAssignableTo(typeArgument, constraint, node, Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
        }

        function checkTypeQuery(node: TypeQueryNode) {
            getTypeFromTypeQueryNode(node);
        }

        function checkTypeLiteral(node: TypeLiteralNode) {
            forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                var type = getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }

        function checkArrayType(node: ArrayTypeNode) {
            checkSourceElement(node.elementType);
        }

        function checkTupleType(node: TupleTypeNode) {
            // Grammar checking
            var hasErrorFromDisallowedTrailingComma = checkGrammarForDisallowedTrailingComma(node.elementTypes);
            if (!hasErrorFromDisallowedTrailingComma && node.elementTypes.length === 0) {
                grammarErrorOnNode(node, Diagnostics.A_tuple_type_element_list_cannot_be_empty);
            }

            forEach(node.elementTypes, checkSourceElement);
        }

        function checkUnionType(node: UnionTypeNode) {
            forEach(node.types, checkSourceElement);
        }

        function isPrivateWithinAmbient(node: Node): boolean {
            return (node.flags & NodeFlags.Private) && isInAmbientContext(node);
        }

        function checkSpecializedSignatureDeclaration(signatureDeclarationNode: SignatureDeclaration): void {
            if (!produceDiagnostics) {
                return;
            }
            var signature = getSignatureFromDeclaration(signatureDeclarationNode);
            if (!signature.hasStringLiterals) {
                return;
            }

            // TypeScript 1.0 spec (April 2014): 3.7.2.2
            // Specialized signatures are not permitted in conjunction with a function body
            if (nodeIsPresent((<FunctionLikeDeclaration>signatureDeclarationNode).body)) {
                error(signatureDeclarationNode, Diagnostics.A_signature_with_an_implementation_cannot_use_a_string_literal_type);
                return;
            }

            // TypeScript 1.0 spec (April 2014): 3.7.2.4
            // Every specialized call or construct signature in an object type must be assignable
            // to at least one non-specialized call or construct signature in the same object type
            var signaturesToCheck: Signature[];
            // Unnamed (call\construct) signatures in interfaces are inherited and not shadowed so examining just node symbol won't give complete answer.
            // Use declaring type to obtain full list of signatures.
            if (!signatureDeclarationNode.name && signatureDeclarationNode.parent && signatureDeclarationNode.parent.kind === SyntaxKind.InterfaceDeclaration) {
                Debug.assert(signatureDeclarationNode.kind === SyntaxKind.CallSignature || signatureDeclarationNode.kind === SyntaxKind.ConstructSignature);
                var signatureKind = signatureDeclarationNode.kind === SyntaxKind.CallSignature ? SignatureKind.Call : SignatureKind.Construct;
                var containingSymbol = getSymbolOfNode(signatureDeclarationNode.parent);
                var containingType = getDeclaredTypeOfSymbol(containingSymbol);
                signaturesToCheck = getSignaturesOfType(containingType, signatureKind);
            }
            else {
                signaturesToCheck = getSignaturesOfSymbol(getSymbolOfNode(signatureDeclarationNode));
            }

            for (var i = 0; i < signaturesToCheck.length; i++) {
                var otherSignature = signaturesToCheck[i];
                if (!otherSignature.hasStringLiterals && isSignatureAssignableTo(signature, otherSignature)) {
                    return;
                }
            }

            error(signatureDeclarationNode, Diagnostics.Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature);
        }

        function getEffectiveDeclarationFlags(n: Node, flagsToCheck: NodeFlags) {
            var flags = getCombinedNodeFlags(n);
            if (n.parent.kind !== SyntaxKind.InterfaceDeclaration && isInAmbientContext(n)) {
                if (!(flags & NodeFlags.Ambient)) {
                    // It is nested in an ambient context, which means it is automatically exported
                    flags |= NodeFlags.Export;
                }
                flags |= NodeFlags.Ambient;
            }

            return flags & flagsToCheck;
        }

        function checkFunctionOrConstructorSymbol(symbol: Symbol): void {
            if (!produceDiagnostics) {
                return;
            }

            function getCanonicalOverload(overloads: Declaration[], implementation: FunctionLikeDeclaration) {
                // Consider the canonical set of flags to be the flags of the bodyDeclaration or the first declaration
                // Error on all deviations from this canonical set of flags
                // The caveat is that if some overloads are defined in lib.d.ts, we don't want to
                // report the errors on those. To achieve this, we will say that the implementation is
                // the canonical signature only if it is in the same container as the first overload
                var implementationSharesContainerWithFirstOverload = implementation !== undefined && implementation.parent === overloads[0].parent;
                return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
            }

            function checkFlagAgreementBetweenOverloads(overloads: Declaration[], implementation: FunctionLikeDeclaration, flagsToCheck: NodeFlags, someOverloadFlags: NodeFlags, allOverloadFlags: NodeFlags): void {
                // Error if some overloads have a flag that is not shared by all overloads. To find the
                // deviations, we XOR someOverloadFlags with allOverloadFlags
                var someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                if (someButNotAllOverloadFlags !== 0) {
                    var canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck);

                    forEach(overloads, o => {
                        var deviation = getEffectiveDeclarationFlags(o, flagsToCheck) ^ canonicalFlags;
                        if (deviation & NodeFlags.Export) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_exported_or_not_exported);
                        }
                        else if (deviation & NodeFlags.Ambient) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                        }
                        else if (deviation & (NodeFlags.Private | NodeFlags.Protected)) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                        }
                    });
                }
            }

            function checkQuestionTokenAgreementBetweenOverloads(overloads: Declaration[], implementation: FunctionLikeDeclaration, someHaveQuestionToken: boolean, allHaveQuestionToken: boolean): void {
                if (someHaveQuestionToken !== allHaveQuestionToken) {
                    var canonicalHasQuestionToken = hasQuestionToken(getCanonicalOverload(overloads, implementation));
                    forEach(overloads, o => {
                        var deviation = hasQuestionToken(o) !== canonicalHasQuestionToken;
                        if (deviation) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                        }
                    });
                }
            }

            var flagsToCheck: NodeFlags = NodeFlags.Export | NodeFlags.Ambient | NodeFlags.Private | NodeFlags.Protected;
            var someNodeFlags: NodeFlags = 0;
            var allNodeFlags = flagsToCheck;
            var someHaveQuestionToken = false;
            var allHaveQuestionToken = true;
            var hasOverloads = false;
            var bodyDeclaration: FunctionLikeDeclaration;
            var lastSeenNonAmbientDeclaration: FunctionLikeDeclaration;
            var previousDeclaration: FunctionLikeDeclaration;

            var declarations = symbol.declarations;
            var isConstructor = (symbol.flags & SymbolFlags.Constructor) !== 0;

            function reportImplementationExpectedError(node: FunctionLikeDeclaration): void {
                if (node.name && getFullWidth(node.name) === 0) {
                    return;
                }

                var seen = false;
                var subsequentNode = forEachChild(node.parent, c => {
                    if (seen) {
                        return c;
                    }
                    else {
                        seen = c === node;
                    }
                });
                if (subsequentNode) {
                    if (subsequentNode.kind === node.kind) {
                        var errorNode: Node = (<FunctionLikeDeclaration>subsequentNode).name || subsequentNode;
                        // TODO(jfreeman): These are methods, so handle computed name case
                        if (node.name && (<FunctionLikeDeclaration>subsequentNode).name && (<Identifier>node.name).text === (<Identifier>(<FunctionLikeDeclaration>subsequentNode).name).text) {
                            // the only situation when this is possible (same kind\same name but different symbol) - mixed static and instance class members
                            Debug.assert(node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature);
                            Debug.assert((node.flags & NodeFlags.Static) !== (subsequentNode.flags & NodeFlags.Static));
                            var diagnostic = node.flags & NodeFlags.Static ? Diagnostics.Function_overload_must_be_static : Diagnostics.Function_overload_must_not_be_static;
                            error(errorNode, diagnostic);
                            return;
                        }
                        else if (nodeIsPresent((<FunctionLikeDeclaration>subsequentNode).body)) {
                            error(errorNode, Diagnostics.Function_implementation_name_must_be_0, declarationNameToString(node.name));
                            return;
                        }
                    }
                }
                var errorNode: Node = node.name || node;
                if (isConstructor) {
                    error(errorNode, Diagnostics.Constructor_implementation_is_missing);
                }
                else {
                    error(errorNode, Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                }
            }

            // when checking exported function declarations across modules check only duplicate implementations
            // names and consistency of modifiers are verified when we check local symbol
            var isExportSymbolInsideModule = symbol.parent && symbol.parent.flags & SymbolFlags.Module;
            var duplicateFunctionDeclaration = false;
            var multipleConstructorImplementation = false;
            for (var i = 0; i < declarations.length; i++) {
                var node = <FunctionLikeDeclaration>declarations[i];
                var inAmbientContext = isInAmbientContext(node);
                var inAmbientContextOrInterface = node.parent.kind === SyntaxKind.InterfaceDeclaration || node.parent.kind === SyntaxKind.TypeLiteral || inAmbientContext;
                if (inAmbientContextOrInterface) {
                    // check if declarations are consecutive only if they are non-ambient
                    // 1. ambient declarations can be interleaved
                    // i.e. this is legal
                    //     declare function foo();
                    //     declare function bar();
                    //     declare function foo();
                    // 2. mixing ambient and non-ambient declarations is a separate error that will be reported - do not want to report an extra one
                    previousDeclaration = undefined;
                }

                if (node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature || node.kind === SyntaxKind.Constructor) {
                    var currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
                    someNodeFlags |= currentNodeFlags;
                    allNodeFlags &= currentNodeFlags;
                    someHaveQuestionToken = someHaveQuestionToken || hasQuestionToken(node);
                    allHaveQuestionToken = allHaveQuestionToken && hasQuestionToken(node);

                    if (nodeIsPresent(node.body) && bodyDeclaration) {
                        if (isConstructor) {
                            multipleConstructorImplementation = true;
                        }
                        else {
                            duplicateFunctionDeclaration = true;
                        }
                    }
                    else if (!isExportSymbolInsideModule && previousDeclaration && previousDeclaration.parent === node.parent && previousDeclaration.end !== node.pos) {
                        reportImplementationExpectedError(previousDeclaration);
                    }

                    if (nodeIsPresent(node.body)) {
                        if (!bodyDeclaration) {
                            bodyDeclaration = node;
                        }
                    }
                    else {
                        hasOverloads = true;
                    }

                    previousDeclaration = node;

                    if (!inAmbientContextOrInterface) {
                        lastSeenNonAmbientDeclaration = node;
                    }
                }
            }

            if (multipleConstructorImplementation) {
                forEach(declarations, declaration => {
                    error(declaration, Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                });
            }

            if (duplicateFunctionDeclaration) {
                forEach(declarations, declaration => {
                    error(declaration.name, Diagnostics.Duplicate_function_implementation);
                });
            }

            if (!isExportSymbolInsideModule && lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body) {
                reportImplementationExpectedError(lastSeenNonAmbientDeclaration);
            }

            if (hasOverloads) {
                checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
                checkQuestionTokenAgreementBetweenOverloads(declarations, bodyDeclaration, someHaveQuestionToken, allHaveQuestionToken);

                if (bodyDeclaration) {
                    var signatures = getSignaturesOfSymbol(symbol);
                    var bodySignature = getSignatureFromDeclaration(bodyDeclaration);
                    // If the implementation signature has string literals, we will have reported an error in
                    // checkSpecializedSignatureDeclaration
                    if (!bodySignature.hasStringLiterals) {
                        // TypeScript 1.0 spec (April 2014): 6.1
                        // If a function declaration includes overloads, the overloads determine the call 
                        // signatures of the type given to the function object 
                        // and the function implementation signature must be assignable to that type
                        //
                        // TypeScript 1.0 spec (April 2014): 3.8.4
                        // Note that specialized call and construct signatures (section 3.7.2.4) are not significant when determining assignment compatibility
                        // Consider checking against specialized signatures too. Not doing so creates a type hole:
                        //
                        // function g(x: "hi", y: boolean);
                        // function g(x: string, y: {});
                        // function g(x: string, y: string) { }
                        //
                        // The implementation is completely unrelated to the specialized signature, yet we do not check this.
                        for (var i = 0, len = signatures.length; i < len; ++i) {
                            if (!signatures[i].hasStringLiterals && !isSignatureAssignableTo(bodySignature, signatures[i])) {
                                error(signatures[i].declaration, Diagnostics.Overload_signature_is_not_compatible_with_function_implementation);
                                break;
                            }
                        }
                    }
                }
            }
        }

        function checkExportsOnMergedDeclarations(node: Node): void {
            if (!produceDiagnostics) {
                return;
            }

            var symbol: Symbol;

            // Exports should be checked only if enclosing module contains both exported and non exported declarations.
            // In case if all declarations are non-exported check is unnecessary.

            // if localSymbol is defined on node then node itself is exported - check is required
            var symbol = node.localSymbol;
            if (!symbol) {
                // local symbol is undefined => this declaration is non-exported.
                // however symbol might contain other declarations that are exported
                symbol = getSymbolOfNode(node);
                if (!(symbol.flags & SymbolFlags.Export)) {
                    // this is a pure local symbol (all declarations are non-exported) - no need to check anything
                    return;
                }
            }

            // run the check only for the first declaration in the list
            if (getDeclarationOfKind(symbol, node.kind) !== node) {
                return;
            }

            // we use SymbolFlags.ExportValue, SymbolFlags.ExportType and SymbolFlags.ExportNamespace 
            // to denote disjoint declarationSpaces (without making new enum type).
            var exportedDeclarationSpaces: SymbolFlags = 0;
            var nonExportedDeclarationSpaces: SymbolFlags = 0;
            forEach(symbol.declarations, d => {
                var declarationSpaces = getDeclarationSpaces(d);
                if (getEffectiveDeclarationFlags(d, NodeFlags.Export)) {
                    exportedDeclarationSpaces |= declarationSpaces;
                }
                else {
                    nonExportedDeclarationSpaces |= declarationSpaces;
                }
            });

            var commonDeclarationSpace = exportedDeclarationSpaces & nonExportedDeclarationSpaces;

            if (commonDeclarationSpace) {
                // declaration spaces for exported and non-exported declarations intersect
                forEach(symbol.declarations, d => {
                    if (getDeclarationSpaces(d) & commonDeclarationSpace) {
                        error(d.name, Diagnostics.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local, declarationNameToString(d.name));
                    }
                });
            }

            function getDeclarationSpaces(d: Declaration): SymbolFlags {
                switch (d.kind) {
                    case SyntaxKind.InterfaceDeclaration:
                        return SymbolFlags.ExportType;
                    case SyntaxKind.ModuleDeclaration:
                        return (<ModuleDeclaration>d).name.kind === SyntaxKind.StringLiteral || getModuleInstanceState(d) !== ModuleInstanceState.NonInstantiated
                            ? SymbolFlags.ExportNamespace | SymbolFlags.ExportValue
                            : SymbolFlags.ExportNamespace;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                        return SymbolFlags.ExportType | SymbolFlags.ExportValue;
                    case SyntaxKind.ImportDeclaration:
                        var result: SymbolFlags = 0;
                        var target = resolveImport(getSymbolOfNode(d));
                        forEach(target.declarations, d => { result |= getDeclarationSpaces(d); });
                        return result;
                    default:
                        return SymbolFlags.ExportValue;
                }
            }
        }

        function checkFunctionDeclaration(node: FunctionDeclaration): void {
            if (produceDiagnostics) {
                checkFunctionLikeDeclaration(node) ||
                    checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) ||
                    checkGrammarFunctionName(node.name) ||
                    checkGrammarForGenerator(node);

                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
        }

        function checkFunctionLikeDeclaration(node: FunctionLikeDeclaration): void {
            checkSignatureDeclaration(node);

            if (hasDynamicName(node)) {
                // This check will account for methods in class/interface declarations,
                // as well as accessors in classes/object literals
                checkComputedPropertyName(<ComputedPropertyName>node.name);
            }
            else {
                // first we want to check the local symbol that contain this declaration
                // - if node.localSymbol !== undefined - this is current declaration is exported and localSymbol points to the local symbol
                // - if node.localSymbol === undefined - this node is non-exported so we can just pick the result of getSymbolOfNode
                var symbol = getSymbolOfNode(node);
                var localSymbol = node.localSymbol || symbol;

                var firstDeclaration = getDeclarationOfKind(localSymbol, node.kind);
                // Only type check the symbol once
                if (node === firstDeclaration) {
                    checkFunctionOrConstructorSymbol(localSymbol);
                }

                if (symbol.parent) {
                    // run check once for the first declaration
                    if (getDeclarationOfKind(symbol, node.kind) === node) {
                        // run check on export symbol to check that modifiers agree across all exported declarations
                        checkFunctionOrConstructorSymbol(symbol);
                    }
                }
            }

            checkSourceElement(node.body);
            if (node.type && !isAccessor(node.kind)) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
            }

            // Report an implicit any error if there is no body, no explicit return type, and node is not a private method
            // in an ambient context
            if (compilerOptions.noImplicitAny && nodeIsMissing(node.body) && !node.type && !isPrivateWithinAmbient(node)) {
                reportImplicitAnyError(node, anyType);
            }
        }

        function checkBlock(node: Block) {
            // Grammar checking for SyntaxKind.Block
            if (node.kind === SyntaxKind.Block) {
                checkGrammarForStatementInAmbientContext(node);
            }

            forEach(node.statements, checkSourceElement);
            if (isFunctionBlock(node) || node.kind === SyntaxKind.ModuleBlock) {
                checkFunctionExpressionBodies(node);
            }
        }

        function checkCollisionWithArgumentsInGeneratedCode(node: SignatureDeclaration) {
            // no rest parameters \ declaration context \ overload - no codegen impact
            if (!hasRestParameters(node) || isInAmbientContext(node) || nodeIsMissing((<FunctionLikeDeclaration>node).body)) {
                return;
            }

            forEach(node.parameters, p => {
                if (p.name && !isBindingPattern(p.name) && (<Identifier>p.name).text === argumentsSymbol.name) {
                    error(p, Diagnostics.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters);
                }
            });
        }

        function needCollisionCheckForIdentifier(node: Node, identifier: Identifier, name: string): boolean {
            if (!(identifier && identifier.text === name)) {
                return false;
            }

            if (node.kind === SyntaxKind.PropertyDeclaration ||
                node.kind === SyntaxKind.PropertySignature ||
                node.kind === SyntaxKind.MethodDeclaration ||
                node.kind === SyntaxKind.MethodSignature ||
                node.kind === SyntaxKind.GetAccessor ||
                node.kind === SyntaxKind.SetAccessor) {
                // it is ok to have member named '_super' or '_this' - member access is always qualified
                return false;
            }

            if (isInAmbientContext(node)) {
                // ambient context - no codegen impact
                return false;
            }

            var root = getRootDeclaration(node);
            if (root.kind === SyntaxKind.Parameter && nodeIsMissing((<FunctionLikeDeclaration>root.parent).body)) {
                // just an overload - no codegen impact
                return false;
            }

            return true;
        }
        
        function checkCollisionWithCapturedThisVariable(node: Node, name: Identifier): void {
            if (needCollisionCheckForIdentifier(node, name, "_this")) {
                potentialThisCollisions.push(node);
            }
        }

        // this function will run after checking the source file so 'CaptureThis' is correct for all nodes
        function checkIfThisIsCapturedInEnclosingScope(node: Node): void {
            var current = node;
            while (current) {                
                if (getNodeCheckFlags(current) & NodeCheckFlags.CaptureThis) {
                    var isDeclaration = node.kind !== SyntaxKind.Identifier;
                    if (isDeclaration) {
                        error((<Declaration>node).name, Diagnostics.Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference);
                    }
                    else {
                        error(node, Diagnostics.Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference);
                    }
                    return;
                }
                current = current.parent;
            }
        }

        function checkCollisionWithCapturedSuperVariable(node: Node, name: Identifier) {
            if (!needCollisionCheckForIdentifier(node, name, "_super")) {
                return;
            }

            // bubble up and find containing type
            var enclosingClass = <ClassDeclaration>getAncestor(node, SyntaxKind.ClassDeclaration);
            // if containing type was not found or it is ambient - exit (no codegen)
            if (!enclosingClass || isInAmbientContext(enclosingClass)) {
                return;
            }

            if (getClassBaseTypeNode(enclosingClass)) {
                var isDeclaration = node.kind !== SyntaxKind.Identifier;
                if (isDeclaration) {
                    error(node, Diagnostics.Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference);
                }
                else {
                    error(node, Diagnostics.Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference);
                }
            }
        }

        function checkCollisionWithRequireExportsInGeneratedCode(node: Node, name: Identifier) {
            if (!needCollisionCheckForIdentifier(node, name, "require") && !needCollisionCheckForIdentifier(node, name, "exports")) {
                return;
            }

            // Uninstantiated modules shouldnt do this check
            if (node.kind === SyntaxKind.ModuleDeclaration && getModuleInstanceState(node) !== ModuleInstanceState.Instantiated) {
                return;
            }

            // In case of variable declaration, node.parent is variable statement so look at the variable statement's parent
            var parent = getDeclarationContainer(node);
            if (parent.kind === SyntaxKind.SourceFile && isExternalModule(<SourceFile>parent)) {
                // If the declaration happens to be in external module, report error that require and exports are reserved keywords
                error(name, Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module,
                    declarationNameToString(name), declarationNameToString(name));
            }
        }

        function checkCollisionWithConstDeclarations(node: VariableLikeDeclaration) {
            // Variable declarations are hoisted to the top of their function scope. They can shadow
            // block scoped declarations, which bind tighter. this will not be flagged as duplicate definition
            // by the binder as the declaration scope is different.
            // A non-initialized declaration is a no-op as the block declaration will resolve before the var
            // declaration. the problem is if the declaration has an initializer. this will act as a write to the
            // block declared value. this is fine for let, but not const.
            //
            // Only consider declarations with initializers, uninitialized var declarations will not 
            // step on a const variable.
            // Do not consider let and const declarations, as duplicate block-scoped declarations 
            // are handled by the binder.
            // We are only looking for var declarations that step on const declarations from a 
            // different scope. e.g.:
            //      var x = 0;
            //      {
            //          const x = 0;
            //          var x = 0;
            //      }
            if (node.initializer && (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === 0) {
                var symbol = getSymbolOfNode(node);
                if (symbol.flags & SymbolFlags.FunctionScopedVariable) {
                    var localDeclarationSymbol = resolveName(node, (<Identifier>node.name).text, SymbolFlags.Variable, /*nodeNotFoundErrorMessage*/ undefined, /*nameArg*/ undefined);
                    if (localDeclarationSymbol && localDeclarationSymbol !== symbol && localDeclarationSymbol.flags & SymbolFlags.BlockScopedVariable) {
                        if (getDeclarationFlagsFromSymbol(localDeclarationSymbol) & NodeFlags.Const) {
                            error(node, Diagnostics.Cannot_redeclare_block_scoped_variable_0, symbolToString(localDeclarationSymbol));
                        }
                    }
                }
            }
        }

        function isParameterDeclaration(node: VariableLikeDeclaration) {
            while (node.kind === SyntaxKind.BindingElement) {
                node = <VariableLikeDeclaration>node.parent.parent;
            }
            return node.kind === SyntaxKind.Parameter;
        }

        // Check that a parameter initializer contains no references to parameters declared to the right of itself
        function checkParameterInitializer(node: VariableLikeDeclaration): void {
            if (getRootDeclaration(node).kind === SyntaxKind.Parameter) {
                var func = getContainingFunction(node);
                visit(node.initializer);
            }
            function visit(n: Node) {
                if (n.kind === SyntaxKind.Identifier) {
                    var referencedSymbol = getNodeLinks(n).resolvedSymbol;
                    // check FunctionLikeDeclaration.locals (stores parameters\function local variable) 
                    // if it contains entry with a specified name and if this entry matches the resolved symbol
                    if (referencedSymbol && referencedSymbol !== unknownSymbol && getSymbol(func.locals, referencedSymbol.name, SymbolFlags.Value) === referencedSymbol) {
                        if (referencedSymbol.valueDeclaration.kind === SyntaxKind.Parameter) {
                            if (referencedSymbol.valueDeclaration === node) {
                                error(n, Diagnostics.Parameter_0_cannot_be_referenced_in_its_initializer, declarationNameToString(node.name));
                                return;
                            }
                            if (referencedSymbol.valueDeclaration.pos < node.pos) {
                                // legal case - parameter initializer references some parameter strictly on left of current parameter declaration
                                return;
                            }
                            // fall through to error reporting
                        }
                        error(n, Diagnostics.Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it, declarationNameToString(node.name), declarationNameToString(<Identifier>n));
                    }
                }
                else {
                    forEachChild(n, visit);
                }
            }
        }

        // Check variable, parameter, or property declaration
        function checkVariableLikeDeclaration(node: VariableLikeDeclaration) {
            checkSourceElement(node.type);
            // For a computed property, just check the initializer and exit
            if (hasDynamicName(node)) {
                checkComputedPropertyName(<ComputedPropertyName>node.name);
                if (node.initializer) {
                    checkExpressionCached(node.initializer);
                }
                return;
            }
            // For a binding pattern, check contained binding elements
            if (isBindingPattern(node.name)) {
                forEach((<BindingPattern>node.name).elements, checkSourceElement);
            }
            // For a parameter declaration with an initializer, error and exit if the containing function doesn't have a body
            if (node.initializer && getRootDeclaration(node).kind === SyntaxKind.Parameter && nodeIsMissing(getContainingFunction(node).body)) {
                error(node, Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                return;
            }
            // For a binding pattern, validate the initializer and exit
            if (isBindingPattern(node.name)) {
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), getWidenedTypeForVariableLikeDeclaration(node), node, /*headMessage*/ undefined);
                    checkParameterInitializer(node);
                }
                return;
            }
            var symbol = getSymbolOfNode(node);
            var type = getTypeOfVariableOrParameterOrProperty(symbol);
            if (node === symbol.valueDeclaration) {
                // Node is the primary declaration of the symbol, just validate the initializer
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), type, node, /*headMessage*/ undefined);
                    checkParameterInitializer(node);
                }
            }
            else {
                // Node is a secondary declaration, check that type is identical to primary declaration and check that
                // initializer is consistent with type associated with the node
                var declarationType = getWidenedTypeForVariableLikeDeclaration(node);
                if (type !== unknownType && declarationType !== unknownType && !isTypeIdenticalTo(type, declarationType)) {
                    error(node.name, Diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2, declarationNameToString(node.name), typeToString(type), typeToString(declarationType));
                }
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), declarationType, node, /*headMessage*/ undefined);
                }
            }
            if (node.kind !== SyntaxKind.PropertyDeclaration && node.kind !== SyntaxKind.PropertySignature) {
                // We know we don't have a binding pattern or computed name here
                checkExportsOnMergedDeclarations(node);
                checkCollisionWithConstDeclarations(node);
                checkCollisionWithCapturedSuperVariable(node, <Identifier>node.name);
                checkCollisionWithCapturedThisVariable(node, <Identifier>node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, <Identifier>node.name);
            }
        }

        function checkVariableDeclaration(node: VariableDeclaration) {
            checkGrammarVariableDeclaration(node);
            return checkVariableLikeDeclaration(node);
        }

        function checkBindingElement(node: BindingElement) {
            checkGrammarBindingElement(<BindingElement>node);
            return checkVariableLikeDeclaration(node);
        }

        function checkVariableStatement(node: VariableStatement) {
            // Grammar checking
            checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) || checkGrammarModifiers(node) || checkGrammarVariableDeclarationList(node.declarationList) || checkGrammarForDisallowedLetOrConstStatement(node);

            forEach(node.declarationList.declarations, checkSourceElement);
        }

        function checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node: Node) {
            if (node.modifiers) {
                if (inBlockOrObjectLiteralExpression(node)) {
                    return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                }
            }
        }

        function inBlockOrObjectLiteralExpression(node: Node) {
            while (node) {
                if (node.kind === SyntaxKind.Block || node.kind === SyntaxKind.ObjectLiteralExpression) {
                    return true;
                }

                node = node.parent;
            }
        }

        function checkExpressionStatement(node: ExpressionStatement) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node)

            checkExpression(node.expression);
        }

        function checkIfStatement(node: IfStatement) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);

            checkExpression(node.expression);
            checkSourceElement(node.thenStatement);
            checkSourceElement(node.elseStatement);
        }

        function checkDoStatement(node: DoStatement) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);

            checkSourceElement(node.statement);
            checkExpression(node.expression);
        }

        function checkWhileStatement(node: WhileStatement) {
            // Grammar checking 
            checkGrammarForStatementInAmbientContext(node);

            checkExpression(node.expression);
            checkSourceElement(node.statement);
        }

        function checkForStatement(node: ForStatement) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.initializer && node.initializer.kind == SyntaxKind.VariableDeclarationList) {
                    checkGrammarVariableDeclarationList(<VariableDeclarationList>node.initializer);
                }
            }

            if (node.initializer) {
                if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    forEach((<VariableDeclarationList>node.initializer).declarations, checkVariableDeclaration)
                }
                else {
                    checkExpression(<Expression>node.initializer)
                }
            }

            if (node.condition) checkExpression(node.condition);
            if (node.iterator) checkExpression(node.iterator);
            checkSourceElement(node.statement);
        }

        function checkForInStatement(node: ForInStatement) {
            // Grammar checking 
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    var variableList = <VariableDeclarationList>node.initializer;
                    if (!checkGrammarVariableDeclarationList(variableList)) {
                        if (variableList.declarations.length > 1) {
                            grammarErrorOnFirstToken(variableList.declarations[1], Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
                        }
                    }
                }
            }

            // TypeScript 1.0 spec  (April 2014): 5.4
            // In a 'for-in' statement of the form
            // for (var VarDecl in Expr) Statement
            //   VarDecl must be a variable declaration without a type annotation that declares a variable of type Any,
            //   and Expr must be an expression of type Any, an object type, or a type parameter type.                        
            if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                var variableDeclarationList = <VariableDeclarationList>node.initializer;
                if (variableDeclarationList.declarations.length >= 1) {
                    var decl = variableDeclarationList.declarations[0];
                    checkVariableDeclaration(decl);
                    if (decl.type) {
                        error(decl, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation);
                    }
                }
            }
            else {
                // In a 'for-in' statement of the form
                // for (Var in Expr) Statement
                //   Var must be an expression classified as a reference of type Any or the String primitive type,
                //   and Expr must be an expression of type Any, an object type, or a type parameter type.
                var varExpr = <Expression>node.initializer;
                var exprType = checkExpression(varExpr);
                if (exprType !== anyType && exprType !== stringType) {
                    error(varExpr, Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                }
                else {
                    // run check only former check succeeded to avoid cascading errors
                    checkReferenceExpression(varExpr, Diagnostics.Invalid_left_hand_side_in_for_in_statement, Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                }
            }

            var exprType = checkExpression(node.expression);
            // unknownType is returned i.e. if node.expression is identifier whose name cannot be resolved
            // in this case error about missing name is already reported - do not report extra one
            if (!isTypeOfKind(exprType, TypeFlags.Any | TypeFlags.ObjectType | TypeFlags.TypeParameter)) {
                error(node.expression, Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }

            checkSourceElement(node.statement);
        }

        function checkBreakOrContinueStatement(node: BreakOrContinueStatement) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node) || checkGrammarBreakOrContinueStatement(node);

            // TODO: Check that target label is valid
        }

        function isGetAccessorWithAnnotatatedSetAccessor(node: FunctionLikeDeclaration) {
            return !!(node.kind === SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(<AccessorDeclaration>getDeclarationOfKind(node.symbol, SyntaxKind.SetAccessor)));
        }

        function checkReturnStatement(node: ReturnStatement) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                var functionBlock = getContainingFunction(node);
                if (!functionBlock) {
                    grammarErrorOnFirstToken(node, Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
                }
            }

            if (node.expression) {
                var func = getContainingFunction(node);
                if (func) {
                    var returnType = getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                    var exprType = checkExpressionCached(node.expression);
                    if (func.kind === SyntaxKind.SetAccessor) {
                        error(node.expression, Diagnostics.Setters_cannot_return_a_value);
                    }
                    else {
                        if (func.kind === SyntaxKind.Constructor) {
                            if (!isTypeAssignableTo(exprType, returnType)) {
                                error(node.expression, Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                            }
                        }
                        else if (func.type || isGetAccessorWithAnnotatatedSetAccessor(func)) {
                            checkTypeAssignableTo(exprType, returnType, node.expression, /*headMessage*/ undefined);
                        }
                    }
                }
            }
        }

        function checkWithStatement(node: WithStatement) {
            // Grammar checking for withStatement
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.parserContextFlags & ParserContextFlags.StrictMode) {
                    grammarErrorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_strict_mode);
                }
            }

            checkExpression(node.expression);
            error(node.expression, Diagnostics.All_symbols_within_a_with_block_will_be_resolved_to_any);
        }

        function checkSwitchStatement(node: SwitchStatement) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);

            var firstDefaultClause: CaseOrDefaultClause;
            var hasDuplicateDefaultClause = false;

            var expressionType = checkExpression(node.expression);
            forEach(node.clauses, clause => {
                // Grammar check for duplicate default clauses, skip if we already report duplicate default clause
                if (clause.kind === SyntaxKind.DefaultClause && !hasDuplicateDefaultClause) {
                    if (firstDefaultClause === undefined) {
                        firstDefaultClause = clause;
                    }
                    else {
                        var sourceFile = getSourceFileOfNode(node);
                        var start = skipTrivia(sourceFile.text, clause.pos);
                        var end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                        grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
                        hasDuplicateDefaultClause = true;
                    }
                }

                if (produceDiagnostics && clause.kind === SyntaxKind.CaseClause) {
                    var caseClause = <CaseClause>clause;
                    // TypeScript 1.0 spec (April 2014):5.9
                    // In a 'switch' statement, each 'case' expression must be of a type that is assignable to or from the type of the 'switch' expression.
                    var caseType = checkExpression(caseClause.expression);
                    if (!isTypeAssignableTo(expressionType, caseType)) {
                        // check 'expressionType isAssignableTo caseType' failed, try the reversed check and report errors if it fails
                        checkTypeAssignableTo(caseType, expressionType, caseClause.expression, /*headMessage*/ undefined);
                    }
                }
                forEach(clause.statements, checkSourceElement);
            });
        }

        function checkLabeledStatement(node: LabeledStatement) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                var current = node.parent;
                while (current) {
                    if (isAnyFunction(current)) {
                        break;
                    }
                    if (current.kind === SyntaxKind.LabeledStatement && (<LabeledStatement>current).label.text === node.label.text) {
                        var sourceFile = getSourceFileOfNode(node);
                        grammarErrorOnNode(node.label, Diagnostics.Duplicate_label_0, getTextOfNodeFromSourceText(sourceFile.text, node.label));
                        break;
                    }
                    current = current.parent;
                }
            }

            // ensure that label is unique
            checkSourceElement(node.statement);
        }

        function checkThrowStatement(node: ThrowStatement) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.expression === undefined) {
                    grammarErrorAfterFirstToken(node, Diagnostics.Line_break_not_permitted_here);
                }
            }

            if (node.expression) {
                checkExpression(node.expression);
            }
        }

        function checkTryStatement(node: TryStatement) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);

            checkBlock(node.tryBlock);
            var catchClause = node.catchClause;
            if (catchClause) {
                // Grammar checking
                if (catchClause.type) {
                    var sourceFile = getSourceFileOfNode(node);
                    var colonStart = skipTrivia(sourceFile.text, catchClause.name.end);
                    grammarErrorAtPos(sourceFile, colonStart, ":".length, Diagnostics.Catch_clause_parameter_cannot_have_a_type_annotation);
                }
                // It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
                // Catch production is eval or arguments
                checkGrammarEvalOrArgumentsInStrictMode(node, catchClause.name);

                checkBlock(catchClause.block);
            }
            if (node.finallyBlock) checkBlock(node.finallyBlock);
        }

        function checkIndexConstraints(type: Type) {
            var declaredNumberIndexer = getIndexDeclarationOfSymbol(type.symbol, IndexKind.Number);
            var declaredStringIndexer = getIndexDeclarationOfSymbol(type.symbol, IndexKind.String);

            var stringIndexType = getIndexTypeOfType(type, IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, IndexKind.Number);

            if (stringIndexType || numberIndexType) {
                forEach(getPropertiesOfObjectType(type), prop => {
                    var propType = getTypeOfSymbol(prop);
                    checkIndexConstraintForProperty(prop, propType, type, declaredStringIndexer, stringIndexType, IndexKind.String);
                    checkIndexConstraintForProperty(prop, propType, type, declaredNumberIndexer, numberIndexType, IndexKind.Number);
                });

                if (type.flags & TypeFlags.Class && type.symbol.valueDeclaration.kind === SyntaxKind.ClassDeclaration) {
                    var classDeclaration = <ClassDeclaration>type.symbol.valueDeclaration;
                    for (var i = 0; i < classDeclaration.members.length; i++) {
                        var member = classDeclaration.members[i];
                        // Only process instance properties with computed names here.
                        // Static properties cannot be in conflict with indexers,
                        // and properties with literal names were already checked.
                        if (!(member.flags & NodeFlags.Static) && hasDynamicName(member)) {
                            var propType = getTypeOfSymbol(member.symbol);
                            checkIndexConstraintForProperty(member.symbol, propType, type, declaredStringIndexer, stringIndexType, IndexKind.String);
                            checkIndexConstraintForProperty(member.symbol, propType, type, declaredNumberIndexer, numberIndexType, IndexKind.Number); 
                        }
                    }
                }
            }

            var errorNode: Node;
            if (stringIndexType && numberIndexType) {
                errorNode = declaredNumberIndexer || declaredStringIndexer;
                // condition 'errorNode === undefined' may appear if types does not declare nor string neither number indexer
                if (!errorNode && (type.flags & TypeFlags.Interface)) {
                    var someBaseTypeHasBothIndexers = forEach((<InterfaceType>type).baseTypes, base => getIndexTypeOfType(base, IndexKind.String) && getIndexTypeOfType(base, IndexKind.Number));
                    errorNode = someBaseTypeHasBothIndexers ? undefined : type.symbol.declarations[0];
                }
            }

            if (errorNode && !isTypeAssignableTo(numberIndexType, stringIndexType)) {                
                error(errorNode, Diagnostics.Numeric_index_type_0_is_not_assignable_to_string_index_type_1,
                    typeToString(numberIndexType), typeToString(stringIndexType));
            }

            function checkIndexConstraintForProperty(
                prop: Symbol,
                propertyType: Type,
                containingType: Type,
                indexDeclaration: Declaration,
                indexType: Type,
                indexKind: IndexKind): void {

                if (!indexType) {
                    return;
                }

                // index is numeric and property name is not valid numeric literal
                if (indexKind === IndexKind.Number && !isNumericName(prop.valueDeclaration.name)) {
                    return;
                }

                // perform property check if property or indexer is declared in 'type'
                // this allows to rule out cases when both property and indexer are inherited from the base class
                var errorNode: Node;
                if (prop.valueDeclaration.name.kind === SyntaxKind.ComputedPropertyName || prop.parent === containingType.symbol) {
                    errorNode = prop.valueDeclaration;
                }
                else if (indexDeclaration) {
                    errorNode = indexDeclaration;
                }
                else if (containingType.flags & TypeFlags.Interface) {
                    // for interfaces property and indexer might be inherited from different bases
                    // check if any base class already has both property and indexer.
                    // check should be performed only if 'type' is the first type that brings property\indexer together
                    var someBaseClassHasBothPropertyAndIndexer = forEach((<InterfaceType>containingType).baseTypes, base => getPropertyOfObjectType(base, prop.name) && getIndexTypeOfType(base, indexKind));
                    errorNode = someBaseClassHasBothPropertyAndIndexer ? undefined : containingType.symbol.declarations[0];
                }

                if (errorNode && !isTypeAssignableTo(propertyType, indexType)) {
                    var errorMessage =
                        indexKind === IndexKind.String
                            ? Diagnostics.Property_0_of_type_1_is_not_assignable_to_string_index_type_2
                            : Diagnostics.Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2;
                    error(errorNode, errorMessage, symbolToString(prop), typeToString(propertyType), typeToString(indexType));
                }
            }
        }

        function checkTypeNameIsReserved(name: DeclarationName, message: DiagnosticMessage): void {
            // TS 1.0 spec (April 2014): 3.6.1
            // The predefined type keywords are reserved and cannot be used as names of user defined types.
            switch ((<Identifier>name).text) {
                case "any":
                case "number":
                case "boolean":
                case "string":
                case "void":
                    error(name, message, (<Identifier>name).text);
            }
        }

        // Check each type parameter and check that list has no duplicate type parameter declarations
        function checkTypeParameters(typeParameterDeclarations: TypeParameterDeclaration[]) {
            if (typeParameterDeclarations) {
                for (var i = 0; i < typeParameterDeclarations.length; i++) {
                    var node = typeParameterDeclarations[i];
                    checkTypeParameter(node);

                    if (produceDiagnostics) {
                        for (var j = 0; j < i; j++) {
                            if (typeParameterDeclarations[j].symbol === node.symbol) {
                                error(node.name, Diagnostics.Duplicate_identifier_0, declarationNameToString(node.name));
                            }
                        }
                    }
                }
            }
        }

        function checkClassDeclaration(node: ClassDeclaration) {
            // Grammar checking
            checkGrammarClassDeclarationHeritageClauses(node);

            checkTypeNameIsReserved(node.name, Diagnostics.Class_name_cannot_be_0);
            checkTypeParameters(node.typeParameters);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);
            var symbol = getSymbolOfNode(node);
            var type = <InterfaceType>getDeclaredTypeOfSymbol(symbol);
            var staticType = <ObjectType>getTypeOfSymbol(symbol);
            var baseTypeNode = getClassBaseTypeNode(node);
            if (baseTypeNode) {
                emitExtends = emitExtends || !isInAmbientContext(node);
                checkTypeReference(baseTypeNode);
            }
            if (type.baseTypes.length) {
                if (produceDiagnostics) {
                    var baseType = type.baseTypes[0];
                    checkTypeAssignableTo(type, baseType, node.name, Diagnostics.Class_0_incorrectly_extends_base_class_1);
                    var staticBaseType = getTypeOfSymbol(baseType.symbol);
                    checkTypeAssignableTo(staticType, getTypeWithoutConstructors(staticBaseType), node.name,
                        Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);
                    if (baseType.symbol !== resolveEntityName(node, baseTypeNode.typeName, SymbolFlags.Value)) {
                        error(baseTypeNode, Diagnostics.Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0, typeToString(baseType));
                    }

                    checkKindsOfPropertyMemberOverrides(type, baseType);
                }
                
                // Check that base type can be evaluated as expression
                checkExpressionOrQualifiedName(baseTypeNode.typeName);
            }

            var implementedTypeNodes = getClassImplementedTypeNodes(node);
            if (implementedTypeNodes) {
                forEach(implementedTypeNodes, typeRefNode => {
                    checkTypeReference(typeRefNode);
                    if (produceDiagnostics) {
                        var t = getTypeFromTypeReferenceNode(typeRefNode);
                        if (t !== unknownType) {
                            var declaredType = (t.flags & TypeFlags.Reference) ? (<TypeReference>t).target : t;
                            if (declaredType.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                                checkTypeAssignableTo(type, t, node.name, Diagnostics.Class_0_incorrectly_implements_interface_1);
                            }
                            else {
                                error(typeRefNode, Diagnostics.A_class_may_only_implement_another_class_or_interface);
                            }
                        }
                    }
                });
            }

            forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }

        function getTargetSymbol(s: Symbol) {
            // if symbol is instantiated its flags are not copied from the 'target'
            // so we'll need to get back original 'target' symbol to work with correct set of flags
            return s.flags & SymbolFlags.Instantiated ? getSymbolLinks(s).target : s;
        }

        function checkKindsOfPropertyMemberOverrides(type: InterfaceType, baseType: ObjectType): void {

            // TypeScript 1.0 spec (April 2014): 8.2.3
            // A derived class inherits all members from its base class it doesn't override.
            // Inheritance means that a derived class implicitly contains all non - overridden members of the base class.
            // Both public and private property members are inherited, but only public property members can be overridden.
            // A property member in a derived class is said to override a property member in a base class
            // when the derived class property member has the same name and kind(instance or static) 
            // as the base class property member.
            // The type of an overriding property member must be assignable(section 3.8.4)
            // to the type of the overridden property member, or otherwise a compile - time error occurs.
            // Base class instance member functions can be overridden by derived class instance member functions,
            // but not by other kinds of members.
            // Base class instance member variables and accessors can be overridden by 
            // derived class instance member variables and accessors, but not by other kinds of members.

            // NOTE: assignability is checked in checkClassDeclaration
            var baseProperties = getPropertiesOfObjectType(baseType);
            for (var i = 0, len = baseProperties.length; i < len; ++i) {
                var base = getTargetSymbol(baseProperties[i]);

                if (base.flags & SymbolFlags.Prototype) {
                    continue;
                }

                var derived = getTargetSymbol(getPropertyOfObjectType(type, base.name));
                if (derived) {
                    var baseDeclarationFlags = getDeclarationFlagsFromSymbol(base);
                    var derivedDeclarationFlags = getDeclarationFlagsFromSymbol(derived);
                    if ((baseDeclarationFlags & NodeFlags.Private)  || (derivedDeclarationFlags & NodeFlags.Private)) {
                        // either base or derived property is private - not override, skip it
                        continue;
                    }

                    if ((baseDeclarationFlags & NodeFlags.Static) !== (derivedDeclarationFlags & NodeFlags.Static)) {
                        // value of 'static' is not the same for properties - not override, skip it
                        continue;
                    }

                    if ((base.flags & derived.flags & SymbolFlags.Method) || ((base.flags & SymbolFlags.PropertyOrAccessor) && (derived.flags & SymbolFlags.PropertyOrAccessor))) {
                        // method is overridden with method or property/accessor is overridden with property/accessor - correct case
                        continue;
                    }

                    var errorMessage: DiagnosticMessage;
                    if (base.flags & SymbolFlags.Method) {
                        if (derived.flags & SymbolFlags.Accessor) {
                            errorMessage = Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                        }
                        else {
                            Debug.assert((derived.flags & SymbolFlags.Property) !== 0);
                            errorMessage = Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property;
                        }
                    }
                    else if (base.flags & SymbolFlags.Property) {
                        Debug.assert((derived.flags & SymbolFlags.Method) !== 0);
                        errorMessage = Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    else {
                        Debug.assert((base.flags & SymbolFlags.Accessor) !== 0);
                        Debug.assert((derived.flags & SymbolFlags.Method) !== 0);
                        errorMessage = Diagnostics.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }

                    error(derived.valueDeclaration.name, errorMessage, typeToString(baseType), symbolToString(base), typeToString(type));
                }
            }
        }

        function isAccessor(kind: SyntaxKind): boolean {
            return kind === SyntaxKind.GetAccessor || kind === SyntaxKind.SetAccessor;
        }

        function areTypeParametersIdentical(list1: TypeParameterDeclaration[], list2: TypeParameterDeclaration[]) {
            if (!list1 && !list2) {
                return true;
            }
            if (!list1 || !list2 || list1.length !== list2.length) {
                return false;
            }
            // TypeScript 1.0 spec (April 2014):
            // When a generic interface has multiple declarations,  all declarations must have identical type parameter
            // lists, i.e. identical type parameter names with identical constraints in identical order.
            for (var i = 0, len = list1.length; i < len; i++) {
                var tp1 = list1[i];
                var tp2 = list2[i];
                if (tp1.name.text !== tp2.name.text) {
                    return false;
                }
                if (!tp1.constraint && !tp2.constraint) {
                    continue;
                }
                if (!tp1.constraint || !tp2.constraint) {
                    return false;
                }
                if (!isTypeIdenticalTo(getTypeFromTypeNode(tp1.constraint), getTypeFromTypeNode(tp2.constraint))) {
                    return false;
                }
            }
            return true;
        }

        function checkInheritedPropertiesAreIdentical(type: InterfaceType, typeNode: Node): boolean {
            if (!type.baseTypes.length || type.baseTypes.length === 1) {
                return true;
            }

            var seen: Map<{ prop: Symbol; containingType: Type }> = {};
            forEach(type.declaredProperties, p => { seen[p.name] = { prop: p, containingType: type }; });
            var ok = true;

            for (var i = 0, len = type.baseTypes.length; i < len; ++i) {
                var base = type.baseTypes[i];
                var properties = getPropertiesOfObjectType(base);
                for (var j = 0, proplen = properties.length; j < proplen; ++j) {
                    var prop = properties[j];
                    if (!hasProperty(seen, prop.name)) {
                        seen[prop.name] = { prop: prop, containingType: base };
                    }
                    else {
                        var existing = seen[prop.name];
                        var isInheritedProperty = existing.containingType !== type;
                        if (isInheritedProperty && !isPropertyIdenticalTo(existing.prop, prop)) {
                            ok = false;

                            var typeName1 = typeToString(existing.containingType);
                            var typeName2 = typeToString(base);

                            var errorInfo = chainDiagnosticMessages(undefined, Diagnostics.Named_properties_0_of_types_1_and_2_are_not_identical, prop.name, typeName1, typeName2);
                            errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2, typeToString(type), typeName1, typeName2);
                            diagnostics.add(createDiagnosticForNodeFromMessageChain(typeNode, errorInfo, host.getCompilerHost().getNewLine()));
                        }
                    }
                }
            }

            return ok;
        }

        function checkInterfaceDeclaration(node: InterfaceDeclaration) {
            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarInterfaceDeclaration(node);

            checkTypeParameters(node.typeParameters);
            if (produceDiagnostics) {
                checkTypeNameIsReserved(node.name, Diagnostics.Interface_name_cannot_be_0);

                checkExportsOnMergedDeclarations(node);
                var symbol = getSymbolOfNode(node);
                var firstInterfaceDecl = <InterfaceDeclaration>getDeclarationOfKind(symbol, SyntaxKind.InterfaceDeclaration);
                if (symbol.declarations.length > 1) {
                    if (node !== firstInterfaceDecl && !areTypeParametersIdentical(firstInterfaceDecl.typeParameters, node.typeParameters)) {
                        error(node.name, Diagnostics.All_declarations_of_an_interface_must_have_identical_type_parameters);
                    }
                }

                // Only check this symbol once
                if (node === firstInterfaceDecl) {
                    var type = <InterfaceType>getDeclaredTypeOfSymbol(symbol);
                    // run subsequent checks only if first set succeeded
                    if (checkInheritedPropertiesAreIdentical(type, node.name)) {
                        forEach(type.baseTypes, baseType => {
                            checkTypeAssignableTo(type, baseType, node.name , Diagnostics.Interface_0_incorrectly_extends_interface_1);
                        });
                        checkIndexConstraints(type);
                    }
                }
            }
            forEach(getInterfaceBaseTypeNodes(node), checkTypeReference);
            forEach(node.members, checkSourceElement);

            if (produceDiagnostics) {
                checkTypeForDuplicateIndexSignatures(node);
            }
        }

        function checkTypeAliasDeclaration(node: TypeAliasDeclaration) {
            // Grammar checking
            checkGrammarModifiers(node);
            
            checkTypeNameIsReserved(node.name, Diagnostics.Type_alias_name_cannot_be_0);
            checkSourceElement(node.type);
        }

        function computeEnumMemberValues(node: EnumDeclaration) {
            var nodeLinks = getNodeLinks(node);

            if (!(nodeLinks.flags & NodeCheckFlags.EnumValuesComputed)) {
                var enumSymbol = getSymbolOfNode(node);
                var enumType = getDeclaredTypeOfSymbol(enumSymbol);
                var autoValue = 0;
                var ambient = isInAmbientContext(node);
                var enumIsConst = isConst(node);

                forEach(node.members, member => {
                    if (member.name.kind !== SyntaxKind.ComputedPropertyName && isNumericLiteralName((<Identifier>member.name).text)) {
                        error(member.name, Diagnostics.An_enum_member_cannot_have_a_numeric_name);
                    }
                    var initializer = member.initializer;
                    if (initializer) {
                        autoValue = getConstantValueForEnumMemberInitializer(initializer, enumIsConst);
                        if (autoValue === undefined) {
                            if (enumIsConst) {
                                error(initializer, Diagnostics.In_const_enum_declarations_member_initializer_must_be_constant_expression);
                            }
                            else if (!ambient) {
                                // Only here do we need to check that the initializer is assignable to the enum type.
                                // If it is a constant value (not undefined), it is syntactically constrained to be a number. 
                                // Also, we do not need to check this for ambients because there is already
                                // a syntax error if it is not a constant.
                            checkTypeAssignableTo(checkExpression(initializer), enumType, initializer, /*headMessage*/ undefined);
                            }
                        }
                        else if (enumIsConst) {
                            if (isNaN(autoValue)) {
                                error(initializer, Diagnostics.const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN);
                            }
                            else if (!isFinite(autoValue)) {
                                error(initializer, Diagnostics.const_enum_member_initializer_was_evaluated_to_a_non_finite_value);
                            }
                        }

                    }
                    else if (ambient && !enumIsConst) {
                        autoValue = undefined;
                    }

                    if (autoValue !== undefined) {
                        getNodeLinks(member).enumMemberValue = autoValue++;
                    }
                });

                nodeLinks.flags |= NodeCheckFlags.EnumValuesComputed;
            }

            function getConstantValueForEnumMemberInitializer(initializer: Expression, enumIsConst: boolean): number {
                return evalConstant(initializer);

                function evalConstant(e: Node): number {
                    switch (e.kind) {
                        case SyntaxKind.PrefixUnaryExpression:
                            var value = evalConstant((<PrefixUnaryExpression>e).operand);
                            if (value === undefined) {
                                return undefined;
                            }
                            switch ((<PrefixUnaryExpression>e).operator) {
                                case SyntaxKind.PlusToken: return value;
                                case SyntaxKind.MinusToken: return -value;
                                case SyntaxKind.TildeToken: return enumIsConst ? ~value : undefined;
                            }
                            return undefined;
                        case SyntaxKind.BinaryExpression:
                            if (!enumIsConst) {
                                return undefined;
                            }

                            var left = evalConstant((<BinaryExpression>e).left);
                            if (left === undefined) {
                                return undefined;
                            }
                            var right = evalConstant((<BinaryExpression>e).right);
                            if (right === undefined) {
                                return undefined;
                            }
                            switch ((<BinaryExpression>e).operator) {
                                case SyntaxKind.BarToken: return left | right;
                                case SyntaxKind.AmpersandToken: return left & right;
                                case SyntaxKind.GreaterThanGreaterThanToken: return left >> right;
                                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken: return left >>> right;
                                case SyntaxKind.LessThanLessThanToken: return left << right;
                                case SyntaxKind.CaretToken: return left ^ right;
                                case SyntaxKind.AsteriskToken: return left * right;
                                case SyntaxKind.SlashToken: return left / right;
                                case SyntaxKind.PlusToken: return left + right;
                                case SyntaxKind.MinusToken: return left - right;
                                case SyntaxKind.PercentToken: return left % right;
                            }
                            return undefined;
                        case SyntaxKind.NumericLiteral:
                            return +(<LiteralExpression>e).text;
                        case SyntaxKind.ParenthesizedExpression:
                            return enumIsConst ? evalConstant((<ParenthesizedExpression>e).expression) : undefined;
                        case SyntaxKind.Identifier:
                        case SyntaxKind.ElementAccessExpression:
                        case SyntaxKind.PropertyAccessExpression:
                            if (!enumIsConst) {
                                return undefined;
                            }

                            var member = initializer.parent;
                            var currentType = getTypeOfSymbol(getSymbolOfNode(member.parent));
                            var enumType: Type;
                            var propertyName: string;

                            if (e.kind === SyntaxKind.Identifier) {
                                // unqualified names can refer to member that reside in different declaration of the enum so just doing name resolution won't work.
                                // instead pick current enum type and later try to fetch member from the type
                                enumType = currentType;
                                propertyName = (<Identifier>e).text;
                            }
                            else {
                                if (e.kind === SyntaxKind.ElementAccessExpression) {
                                    if ((<ElementAccessExpression>e).argumentExpression === undefined ||
                                        (<ElementAccessExpression>e).argumentExpression.kind !== SyntaxKind.StringLiteral) {
                                        return undefined;
                                    }
                                    var enumType = getTypeOfNode((<ElementAccessExpression>e).expression);
                                    propertyName = (<LiteralExpression>(<ElementAccessExpression>e).argumentExpression).text;
                                }
                                else {
                                    var enumType = getTypeOfNode((<PropertyAccessExpression>e).expression);
                                    propertyName = (<PropertyAccessExpression>e).name.text;
                                }
                                if (enumType !== currentType) {
                                    return undefined;
                                }
                            }

                            if (propertyName === undefined) {
                                return undefined;
                            }
                            var property = getPropertyOfObjectType(enumType, propertyName);
                            if (!property || !(property.flags & SymbolFlags.EnumMember)) {
                                return undefined;
                            }
                            var propertyDecl = property.valueDeclaration;
                            // self references are illegal
                            if (member === propertyDecl) {
                                return undefined;
                            }

                            // illegal case: forward reference
                            if (!isDefinedBefore(propertyDecl, member)) {
                                return undefined;
                            }
                            return <number>getNodeLinks(propertyDecl).enumMemberValue;
                    }
                }
            }
        }

        function checkEnumDeclaration(node: EnumDeclaration) {
            if (!produceDiagnostics) {
                return;
            }

            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarEnumDeclaration(node);

            checkTypeNameIsReserved(node.name, Diagnostics.Enum_name_cannot_be_0);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);

            computeEnumMemberValues(node);

            // Spec 2014 - Section 9.3:
            // It isn't possible for one enum declaration to continue the automatic numbering sequence of another,
            // and when an enum type has multiple declarations, only one declaration is permitted to omit a value
            // for the first member.
            //
            // Only perform this check once per symbol
            var enumSymbol = getSymbolOfNode(node);
            var firstDeclaration = getDeclarationOfKind(enumSymbol, node.kind);
            if (node === firstDeclaration) {
                if (enumSymbol.declarations.length > 1) {
                    var enumIsConst = isConst(node);
                    // check that const is placed\omitted on all enum declarations
                    forEach(enumSymbol.declarations, decl => {
                        if (isConstEnumDeclaration(decl) !== enumIsConst) {
                            error(decl.name, Diagnostics.Enum_declarations_must_all_be_const_or_non_const);
                        }
                    });
                }

                var seenEnumMissingInitialInitializer = false;
                forEach(enumSymbol.declarations, declaration => {
                    // return true if we hit a violation of the rule, false otherwise
                    if (declaration.kind !== SyntaxKind.EnumDeclaration) {
                        return false;
                    }

                    var enumDeclaration = <EnumDeclaration>declaration;
                    if (!enumDeclaration.members.length) {
                        return false;
                    }

                    var firstEnumMember = enumDeclaration.members[0];
                    if (!firstEnumMember.initializer) {
                        if (seenEnumMissingInitialInitializer) {
                            error(firstEnumMember.name, Diagnostics.In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element);
                        }
                        else {
                            seenEnumMissingInitialInitializer = true;
                        }
                    }
                });
            }
        }

        function getFirstNonAmbientClassOrFunctionDeclaration(symbol: Symbol): Declaration {
            var declarations = symbol.declarations;
            for (var i = 0; i < declarations.length; i++) {
                var declaration = declarations[i];
                if ((declaration.kind === SyntaxKind.ClassDeclaration || (declaration.kind === SyntaxKind.FunctionDeclaration && nodeIsPresent((<FunctionLikeDeclaration>declaration).body))) && !isInAmbientContext(declaration)) {
                    return declaration;
                }
            }
            return undefined;
        }

        function checkModuleDeclaration(node: ModuleDeclaration) {
            if (produceDiagnostics) {
                // Grammar checking
                if (!checkGrammarModifiers(node)) {
                    if (!isInAmbientContext(node) && node.name.kind === SyntaxKind.StringLiteral) {
                        grammarErrorOnNode(node.name, Diagnostics.Only_ambient_modules_can_use_quoted_names);
                    }
                    else if (node.name.kind === SyntaxKind.Identifier && node.body.kind === SyntaxKind.ModuleBlock) {
                        var statements = (<ModuleBlock>node.body).statements;
                        for (var i = 0, n = statements.length; i < n; i++) {
                            var statement = statements[i];

                            if (statement.kind === SyntaxKind.ExportAssignment) {
                                // Export assignments are not allowed in an internal module
                                grammarErrorOnNode(statement, Diagnostics.An_export_assignment_cannot_be_used_in_an_internal_module);
                            }
                            else if (isExternalModuleImportDeclaration(statement)) {
                                grammarErrorOnNode(getExternalModuleImportDeclarationExpression(statement), Diagnostics.Import_declarations_in_an_internal_module_cannot_reference_an_external_module);
                            }
                        }
                    }
                }

                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                checkExportsOnMergedDeclarations(node);
                var symbol = getSymbolOfNode(node);

                // The following checks only apply on a non-ambient instantiated module declaration.
                if (symbol.flags & SymbolFlags.ValueModule
                    && symbol.declarations.length > 1
                    && !isInAmbientContext(node)
                    && isInstantiatedModule(node, compilerOptions.preserveConstEnums)) {
                    var classOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                    if (classOrFunc) {
                        if (getSourceFileOfNode(node) !== getSourceFileOfNode(classOrFunc)) {
                            error(node.name, Diagnostics.A_module_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                        }
                        else if (node.pos < classOrFunc.pos) {
                            error(node.name, Diagnostics.A_module_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                        }
                    }
                }

                // Checks for ambient external modules.
                if (node.name.kind === SyntaxKind.StringLiteral) {
                    if (!isGlobalSourceFile(node.parent)) {
                        error(node.name, Diagnostics.Ambient_external_modules_cannot_be_nested_in_other_modules);
                    }
                    if (isExternalModuleNameRelative(node.name.text)) {
                        error(node.name, Diagnostics.Ambient_external_module_declaration_cannot_specify_relative_module_name);
                    }
                }
            }
            checkSourceElement(node.body);
        }

        function getFirstIdentifier(node: EntityName): Identifier {
            while (node.kind === SyntaxKind.QualifiedName) {
                node = (<QualifiedName>node).left;
            }
            return <Identifier>node;
        }

        function checkImportDeclaration(node: ImportDeclaration) {
            // Grammar checking
            checkGrammarModifiers(node);

            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            var symbol = getSymbolOfNode(node);
            var target: Symbol;
            
            if (isInternalModuleImportDeclaration(node)) {
                target = resolveImport(symbol);
                // Import declaration for an internal module
                if (target !== unknownSymbol) {
                    if (target.flags & SymbolFlags.Value) {
                        // Target is a value symbol, check that it is not hidden by a local declaration with the same name and
                        // ensure it can be evaluated as an expression
                        var moduleName = getFirstIdentifier(<EntityName>node.moduleReference);
                        if (resolveEntityName(node, moduleName, SymbolFlags.Value | SymbolFlags.Namespace).flags & SymbolFlags.Namespace) {
                            checkExpressionOrQualifiedName(<EntityName>node.moduleReference);
                        }
                        else {
                            error(moduleName, Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, declarationNameToString(moduleName));
                        }
                    }
                    if (target.flags & SymbolFlags.Type) {
                        checkTypeNameIsReserved(node.name, Diagnostics.Import_name_cannot_be_0);
                    }
                }
            }
            else {
                // Import declaration for an external module
                if (node.parent.kind === SyntaxKind.SourceFile) {
                    target = resolveImport(symbol);
                }
                else if (node.parent.kind === SyntaxKind.ModuleBlock && (<ModuleDeclaration>node.parent.parent).name.kind === SyntaxKind.StringLiteral) {
                    // TypeScript 1.0 spec (April 2013): 12.1.6
                    // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference 
                    // other external modules only through top - level external module names.
                    // Relative external module names are not permitted.
                    if (getExternalModuleImportDeclarationExpression(node).kind === SyntaxKind.StringLiteral) {
                        if (isExternalModuleNameRelative((<LiteralExpression>getExternalModuleImportDeclarationExpression(node)).text)) {
                            error(node, Diagnostics.Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name);
                            target = unknownSymbol;
                        }
                        else {
                            target = resolveImport(symbol);
                        }
                    }
                    else {
                        target = unknownSymbol;
                    }
                }
                else {
                    // Parent is an internal module (syntax error is already reported)
                    target = unknownSymbol;
                }
            }
            if (target !== unknownSymbol) {
                var excludedMeanings =
                    (symbol.flags & SymbolFlags.Value ? SymbolFlags.Value : 0) |
                    (symbol.flags & SymbolFlags.Type ? SymbolFlags.Type : 0) |
                    (symbol.flags & SymbolFlags.Namespace ? SymbolFlags.Namespace : 0);
                if (target.flags & excludedMeanings) {
                    error(node, Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0, symbolToString(symbol));
                }
            }
        }

        function checkExportAssignment(node: ExportAssignment) {
            // Grammar checking
            if (!checkGrammarModifiers(node) && (node.flags & NodeFlags.Modifier)) {
                grammarErrorOnFirstToken(node, Diagnostics.An_export_assignment_cannot_have_modifiers);
            }

            var container = node.parent;
            if (container.kind !== SyntaxKind.SourceFile) {
                // In a module, the immediate parent will be a block, so climb up one more parent
                container = container.parent;
            }
            checkTypeOfExportAssignmentSymbol(getSymbolOfNode(container));
        }

        function checkSourceElement(node: Node): void {
            if (!node) return;
            switch (node.kind) {
                case SyntaxKind.TypeParameter:
                    return checkTypeParameter(<TypeParameterDeclaration>node);
                case SyntaxKind.Parameter:
                    return checkParameter(<ParameterDeclaration>node);
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return checkPropertyDeclaration(<PropertyDeclaration>node);
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                    return checkSignatureDeclaration(<SignatureDeclaration>node);
                case SyntaxKind.IndexSignature:
                    return checkSignatureDeclaration(<SignatureDeclaration>node);
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return checkMethodDeclaration(<MethodDeclaration>node);
                case SyntaxKind.Constructor:
                    return checkConstructorDeclaration(<ConstructorDeclaration>node);
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return checkAccessorDeclaration(<AccessorDeclaration>node);
                case SyntaxKind.TypeReference:
                    return checkTypeReference(<TypeReferenceNode>node);
                case SyntaxKind.TypeQuery:
                    return checkTypeQuery(<TypeQueryNode>node);
                case SyntaxKind.TypeLiteral:
                    return checkTypeLiteral(<TypeLiteralNode>node);
                case SyntaxKind.ArrayType:
                    return checkArrayType(<ArrayTypeNode>node);
                case SyntaxKind.TupleType:
                    return checkTupleType(<TupleTypeNode>node);
                case SyntaxKind.UnionType:
                    return checkUnionType(<UnionTypeNode>node);
                case SyntaxKind.ParenthesizedType:
                    return checkSourceElement((<ParenthesizedTypeNode>node).type);
                case SyntaxKind.FunctionDeclaration:
                    return checkFunctionDeclaration(<FunctionDeclaration>node);
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                    return checkBlock(<Block>node);
                case SyntaxKind.VariableStatement:
                    return checkVariableStatement(<VariableStatement>node);
                case SyntaxKind.ExpressionStatement:
                    return checkExpressionStatement(<ExpressionStatement>node);
                case SyntaxKind.IfStatement:
                    return checkIfStatement(<IfStatement>node);
                case SyntaxKind.DoStatement:
                    return checkDoStatement(<DoStatement>node);
                case SyntaxKind.WhileStatement:
                    return checkWhileStatement(<WhileStatement>node);
                case SyntaxKind.ForStatement:
                    return checkForStatement(<ForStatement>node);
                case SyntaxKind.ForInStatement:
                    return checkForInStatement(<ForInStatement>node);
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.BreakStatement:
                    return checkBreakOrContinueStatement(<BreakOrContinueStatement>node);
                case SyntaxKind.ReturnStatement:
                    return checkReturnStatement(<ReturnStatement>node);
                case SyntaxKind.WithStatement:
                    return checkWithStatement(<WithStatement>node);
                case SyntaxKind.SwitchStatement:
                    return checkSwitchStatement(<SwitchStatement>node);
                case SyntaxKind.LabeledStatement:
                    return checkLabeledStatement(<LabeledStatement>node);
                case SyntaxKind.ThrowStatement:
                    return checkThrowStatement(<ThrowStatement>node);
                case SyntaxKind.TryStatement:
                    return checkTryStatement(<TryStatement>node);
                case SyntaxKind.VariableDeclaration:
                    return checkVariableDeclaration(<VariableDeclaration>node);
                case SyntaxKind.BindingElement:
                    return checkBindingElement(<BindingElement>node);
                case SyntaxKind.ClassDeclaration:
                    return checkClassDeclaration(<ClassDeclaration>node);
                case SyntaxKind.InterfaceDeclaration:
                    return checkInterfaceDeclaration(<InterfaceDeclaration>node);
                case SyntaxKind.TypeAliasDeclaration:
                    return checkTypeAliasDeclaration(<TypeAliasDeclaration>node);
                case SyntaxKind.EnumDeclaration:
                    return checkEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return checkModuleDeclaration(<ModuleDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                    return checkImportDeclaration(<ImportDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return checkExportAssignment(<ExportAssignment>node);
                case SyntaxKind.EmptyStatement:
                    checkGrammarForStatementInAmbientContext(node);
                    return;
                case SyntaxKind.DebuggerStatement:
                    checkGrammarForStatementInAmbientContext(node);
                    return;
            }
        }

        // Function expression bodies are checked after all statements in the enclosing body. This is to ensure
        // constructs like the following are permitted:
        //     var foo = function () {
        //        var s = foo();
        //        return "hello";
        //     }
        // Here, performing a full type check of the body of the function expression whilst in the process of
        // determining the type of foo would cause foo to be given type any because of the recursive reference.
        // Delaying the type check of the body ensures foo has been assigned a type.
        function checkFunctionExpressionBodies(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    forEach((<FunctionLikeDeclaration>node).parameters, checkFunctionExpressionBodies);
                    checkFunctionExpressionOrObjectLiteralMethodBody(<FunctionExpression>node);
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    forEach((<MethodDeclaration>node).parameters, checkFunctionExpressionBodies);
                    if (isObjectLiteralMethod(node)) {
                        checkFunctionExpressionOrObjectLiteralMethodBody(<MethodDeclaration>node);
                    }
                    break;
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                    forEach((<FunctionLikeDeclaration>node).parameters, checkFunctionExpressionBodies);
                    break;
                case SyntaxKind.WithStatement:
                    checkFunctionExpressionBodies((<WithStatement>node).expression);
                    break;
                case SyntaxKind.Parameter:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.BindingElement:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.ElementAccessExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.TaggedTemplateExpression:
                case SyntaxKind.TemplateExpression:
                case SyntaxKind.TemplateSpan:
                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.TypeOfExpression:
                case SyntaxKind.VoidExpression:
                case SyntaxKind.DeleteExpression:
                case SyntaxKind.PrefixUnaryExpression:
                case SyntaxKind.PostfixUnaryExpression:
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.ConditionalExpression:
                case SyntaxKind.SpreadElementExpression:
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.ThrowStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.CatchClause:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.VariableDeclarationList:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.EnumMember:
                case SyntaxKind.SourceFile:
                    forEachChild(node, checkFunctionExpressionBodies);
                    break;
            }
        }

        function checkSourceFile(node: SourceFile) {
            var start = new Date().getTime();
            checkSourceFileWorker(node);
            checkTime += new Date().getTime() - start;
        }

        // Fully type check a source file and collect the relevant diagnostics.
        function checkSourceFileWorker(node: SourceFile) {
            var links = getNodeLinks(node);
            if (!(links.flags & NodeCheckFlags.TypeChecked)) {
                // Grammar checking
                checkGrammarSourceFile(node);

                emitExtends = false;
                potentialThisCollisions.length = 0;

                forEach(node.statements, checkSourceElement);
                checkFunctionExpressionBodies(node);

                if (isExternalModule(node)) {
                    var symbol = getExportAssignmentSymbol(node.symbol);
                    if (symbol && symbol.flags & SymbolFlags.Import) {
                        // Mark the import as referenced so that we emit it in the final .js file.
                        getSymbolLinks(symbol).referenced = true;
                        // mark any import declarations that depend upon this import as referenced
                        markLinkedImportsAsReferenced(<ImportDeclaration>getDeclarationOfKind(symbol, SyntaxKind.ImportDeclaration))
                    }
                }

                if (potentialThisCollisions.length) {
                    forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                    potentialThisCollisions.length = 0;
                }

                if (emitExtends) {
                    links.flags |= NodeCheckFlags.EmitExtends;
                }

                links.flags |= NodeCheckFlags.TypeChecked;
            }
        }

        function getDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            throwIfNonDiagnosticsProducing();
            if (sourceFile) {
                checkSourceFile(sourceFile);
                return diagnostics.getDiagnostics(sourceFile.fileName);
            }
            forEach(host.getSourceFiles(), checkSourceFile);
            return diagnostics.getDiagnostics();
        }

        function getGlobalDiagnostics(): Diagnostic[]{
            throwIfNonDiagnosticsProducing();
            return diagnostics.getGlobalDiagnostics();
        }

        function throwIfNonDiagnosticsProducing() {
            if (!produceDiagnostics) {
                throw new Error("Trying to get diagnostics from a type checker that does not produce them.");
            }
        }

        // Language service support

        function isInsideWithStatementBody(node: Node): boolean {
            if (node) {
                while (node.parent) {
                    if (node.parent.kind === SyntaxKind.WithStatement && (<WithStatement>node.parent).statement === node) {
                        return true;
                    }
                    node = node.parent;
                }
            }

            return false;
        }

        function getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[]{
            var symbols: SymbolTable = {};
            var memberFlags: NodeFlags = 0;
            function copySymbol(symbol: Symbol, meaning: SymbolFlags) {
                if (symbol.flags & meaning) {
                    var id = symbol.name;
                    if (!isReservedMemberName(id) && !hasProperty(symbols, id)) {
                        symbols[id] = symbol;
                    }
                }
            }
            function copySymbols(source: SymbolTable, meaning: SymbolFlags) {
                if (meaning) {
                    for (var id in source) {
                        if (hasProperty(source, id)) {
                            copySymbol(source[id], meaning);
                        }
                    }
                }
            }

            if (isInsideWithStatementBody(location)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return [];
            }

            while (location) {
                if (location.locals && !isGlobalSourceFile(location)) {
                    copySymbols(location.locals, meaning);
                }
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalModule(<SourceFile>location)) break;
                    case SyntaxKind.ModuleDeclaration:
                        copySymbols(getSymbolOfNode(location).exports, meaning & SymbolFlags.ModuleMember);
                        break;
                    case SyntaxKind.EnumDeclaration:
                        copySymbols(getSymbolOfNode(location).exports, meaning & SymbolFlags.EnumMember);
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        if (!(memberFlags & NodeFlags.Static)) {
                            copySymbols(getSymbolOfNode(location).members, meaning & SymbolFlags.Type);
                        }
                        break;
                    case SyntaxKind.FunctionExpression:
                        if ((<FunctionExpression>location).name) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                    case SyntaxKind.CatchClause:
                        if ((<CatchClause>location).name.text) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                }
                memberFlags = location.flags;
                location = location.parent;
            }
            copySymbols(globals, meaning);
            return mapToArray(symbols);
        }

        function isTypeDeclarationName(name: Node): boolean {
            return name.kind == SyntaxKind.Identifier &&
                isTypeDeclaration(name.parent) &&
                (<Declaration>name.parent).name === name;
        }

        function isTypeDeclaration(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.TypeParameter:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return true;
            }
        }

        // True if the given identifier is part of a type reference
        function isTypeReferenceIdentifier(entityName: EntityName): boolean {
            var node: Node = entityName;
            while (node.parent && node.parent.kind === SyntaxKind.QualifiedName) node = node.parent;
            return node.parent && node.parent.kind === SyntaxKind.TypeReference;
        }

        function isTypeNode(node: Node): boolean {
            if (SyntaxKind.FirstTypeNode <= node.kind && node.kind <= SyntaxKind.LastTypeNode) {
                return true;
            }

            switch (node.kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.BooleanKeyword:
                    return true;
                case SyntaxKind.VoidKeyword:
                    return node.parent.kind !== SyntaxKind.VoidExpression;
                case SyntaxKind.StringLiteral:
                    // Specialized signatures can have string literals as their parameters' type names
                    return node.parent.kind === SyntaxKind.Parameter;

                // Identifiers and qualified names may be type nodes, depending on their context. Climb
                // above them to find the lowest container
                case SyntaxKind.Identifier:
                    // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
                    if (node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node) {
                        node = node.parent;
                    }
                    // fall through
                case SyntaxKind.QualifiedName:
                    // At this point, node is either a qualified name or an identifier
                    Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName, "'node' was expected to be a qualified name or identifier in 'isTypeNode'.");

                    var parent = node.parent;
                    if (parent.kind === SyntaxKind.TypeQuery) {
                        return false;
                    }
                    // Do not recursively call isTypeNode on the parent. In the example:
                    //
                    //     var a: A.B.C;
                    //
                    // Calling isTypeNode would consider the qualified name A.B a type node. Only C or
                    // A.B.C is a type node.
                    if (SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= SyntaxKind.LastTypeNode) {
                        return true;
                    }
                    switch (parent.kind) {
                        case SyntaxKind.TypeParameter:
                            return node === (<TypeParameterDeclaration>parent).constraint;
                        case SyntaxKind.PropertyDeclaration:
                        case SyntaxKind.PropertySignature:
                        case SyntaxKind.Parameter:
                        case SyntaxKind.VariableDeclaration:
                            return node === (<VariableLikeDeclaration>parent).type;
                        case SyntaxKind.FunctionDeclaration:
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.ArrowFunction:
                        case SyntaxKind.Constructor:
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                        case SyntaxKind.GetAccessor:
                        case SyntaxKind.SetAccessor:
                            return node === (<FunctionLikeDeclaration>parent).type;
                        case SyntaxKind.CallSignature:
                        case SyntaxKind.ConstructSignature:
                        case SyntaxKind.IndexSignature:
                            return node === (<SignatureDeclaration>parent).type;
                        case SyntaxKind.TypeAssertionExpression:
                            return node === (<TypeAssertion>parent).type;
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                            return (<CallExpression>parent).typeArguments && indexOf((<CallExpression>parent).typeArguments, node) >= 0;
                        case SyntaxKind.TaggedTemplateExpression:
                            // TODO (drosen): TaggedTemplateExpressions may eventually support type arguments.
                            return false;
                    }
            }

            return false;
        }

        function getLeftSideOfImportOrExportAssignment(nodeOnRightSide: EntityName): ImportDeclaration | ExportAssignment {
            while (nodeOnRightSide.parent.kind === SyntaxKind.QualifiedName) {
                nodeOnRightSide = <QualifiedName>nodeOnRightSide.parent;
            }

            if (nodeOnRightSide.parent.kind === SyntaxKind.ImportDeclaration) {
                return (<ImportDeclaration>nodeOnRightSide.parent).moduleReference === nodeOnRightSide && <ImportDeclaration>nodeOnRightSide.parent;
            }

            if (nodeOnRightSide.parent.kind === SyntaxKind.ExportAssignment) {
                return (<ExportAssignment>nodeOnRightSide.parent).exportName === nodeOnRightSide && <ExportAssignment>nodeOnRightSide.parent;
            }

            return undefined;
        }

        function isInRightSideOfImportOrExportAssignment(node: EntityName) {
            return getLeftSideOfImportOrExportAssignment(node) !== undefined;
        }

        function isRightSideOfQualifiedNameOrPropertyAccess(node: Node) {
            return (node.parent.kind === SyntaxKind.QualifiedName && (<QualifiedName>node.parent).right === node) ||
                (node.parent.kind === SyntaxKind.PropertyAccessExpression && (<PropertyAccessExpression>node.parent).name === node);
        }

        function getSymbolOfEntityNameOrPropertyAccessExpression(entityName: EntityName | PropertyAccessExpression): Symbol {
            if (isDeclarationOrFunctionExpressionOrCatchVariableName(entityName)) {
                return getSymbolOfNode(entityName.parent);
            }

            if (entityName.parent.kind === SyntaxKind.ExportAssignment) {
                return resolveEntityName(/*location*/ entityName.parent.parent, <Identifier>entityName,
                    /*all meanings*/ SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Import);
            }

            if (entityName.kind !== SyntaxKind.PropertyAccessExpression) {
                if (isInRightSideOfImportOrExportAssignment(<EntityName>entityName)) {
                    // Since we already checked for ExportAssignment, this really could only be an Import
                    return getSymbolOfPartOfRightHandSideOfImport(<EntityName>entityName);
                }
            }

            if (isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = <QualifiedName | PropertyAccessExpression>entityName.parent;
            }

            if (isExpression(entityName)) {
                if (getFullWidth(entityName) === 0) {
                    // Missing entity name.
                    return undefined;
                }

                if (entityName.kind === SyntaxKind.Identifier) {
                    // Include Import in the meaning, this ensures that we do not follow aliases to where they point and instead
                    // return the alias symbol.
                    var meaning: SymbolFlags = SymbolFlags.Value | SymbolFlags.Import;
                    return resolveEntityName(entityName, <Identifier>entityName, meaning);
                }
                else if (entityName.kind === SyntaxKind.PropertyAccessExpression) {
                    var symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkPropertyAccessExpression(<PropertyAccessExpression>entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
                else if (entityName.kind === SyntaxKind.QualifiedName) {
                    var symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkQualifiedName(<QualifiedName>entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
            }
            else if (isTypeReferenceIdentifier(<EntityName>entityName)) {
                var meaning = entityName.parent.kind === SyntaxKind.TypeReference ? SymbolFlags.Type : SymbolFlags.Namespace;
                // Include Import in the meaning, this ensures that we do not follow aliases to where they point and instead
                // return the alias symbol.
                meaning |= SymbolFlags.Import;
                return resolveEntityName(entityName, <EntityName>entityName, meaning);
            }

            // Do we want to return undefined here?
            return undefined;
        }

        function getSymbolInfo(node: Node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }

            if (isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                // This is a declaration, call getSymbolOfNode
                return getSymbolOfNode(node.parent);
            }

            if (node.kind === SyntaxKind.Identifier && isInRightSideOfImportOrExportAssignment(<Identifier>node)) {
                return node.parent.kind === SyntaxKind.ExportAssignment
                    ? getSymbolOfEntityNameOrPropertyAccessExpression(<Identifier>node)
                    : getSymbolOfPartOfRightHandSideOfImport(<Identifier>node);
            }

            switch (node.kind) {
                case SyntaxKind.Identifier:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.QualifiedName:
                    return getSymbolOfEntityNameOrPropertyAccessExpression(<EntityName | PropertyAccessExpression>node);

                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                    var type = checkExpression(<Expression>node);
                    return type.symbol;

                case SyntaxKind.ConstructorKeyword:
                    // constructor keyword for an overload, should take us to the definition if it exist
                    var constructorDeclaration = node.parent;
                    if (constructorDeclaration && constructorDeclaration.kind === SyntaxKind.Constructor) {
                        return (<ClassDeclaration>constructorDeclaration.parent).symbol;
                    }
                    return undefined;

                case SyntaxKind.StringLiteral:
                    // External module name in an import declaration
                    if (isExternalModuleImportDeclaration(node.parent.parent) &&
                        getExternalModuleImportDeclarationExpression(node.parent.parent) === node) {
                        var importSymbol = getSymbolOfNode(node.parent.parent);
                        var moduleType = getTypeOfSymbol(importSymbol);
                        return moduleType ? moduleType.symbol : undefined;
                    }

                // Intentional fall-through
                case SyntaxKind.NumericLiteral:
                    // index access
                    if (node.parent.kind == SyntaxKind.ElementAccessExpression && (<ElementAccessExpression>node.parent).argumentExpression === node) {
                        var objectType = checkExpression((<ElementAccessExpression>node.parent).expression);
                        if (objectType === unknownType) return undefined;
                        var apparentType = getApparentType(objectType);
                        if (apparentType === unknownType) return undefined;
                        return getPropertyOfType(apparentType, (<LiteralExpression>node).text);
                    }
                    break;
            }
            return undefined;
        }

        function getShorthandAssignmentValueSymbol(location: Node): Symbol {
            // The function returns a value symbol of an identifier in the short-hand property assignment.
            // This is necessary as an identifier in short-hand property assignment can contains two meaning:
            // property name and property value.
            if (location && location.kind === SyntaxKind.ShorthandPropertyAssignment) {
                return resolveEntityName(location, (<ShorthandPropertyAssignment>location).name, SymbolFlags.Value);
            }
            return undefined;
        }

        function getTypeOfNode(node: Node): Type {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return unknownType;
            }

            if (isExpression(node)) {
                return getTypeOfExpression(<Expression>node);
            }

            if (isTypeNode(node)) {
                return getTypeFromTypeNode(<TypeNode>node);
            }

            if (isTypeDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolInfo because it is a declaration
                var symbol = getSymbolOfNode(node);
                return getDeclaredTypeOfSymbol(symbol);
            }

            if (isTypeDeclarationName(node)) {
                var symbol = getSymbolInfo(node);
                return symbol && getDeclaredTypeOfSymbol(symbol);
            }

            if (isDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolInfo because it is a declaration
                var symbol = getSymbolOfNode(node);
                return getTypeOfSymbol(symbol);
            }

            if (isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                var symbol = getSymbolInfo(node);
                return symbol && getTypeOfSymbol(symbol);
            }

            if (isInRightSideOfImportOrExportAssignment(<Identifier>node)) {
                var symbol = getSymbolInfo(node);
                var declaredType = symbol && getDeclaredTypeOfSymbol(symbol);
                return declaredType !== unknownType ? declaredType : getTypeOfSymbol(symbol);
            }

            return unknownType;
        }

        function getTypeOfExpression(expr: Expression): Type {
            if (isRightSideOfQualifiedNameOrPropertyAccess(expr)) {
                expr = <Expression>expr.parent;
            }
            return checkExpression(expr);
        }

        // Return the list of properties of the given type, augmented with properties from Function
        // if the type has call or construct signatures
        function getAugmentedPropertiesOfType(type: Type): Symbol[] {
            var type = getApparentType(type);
            var propsByName = createSymbolTable(getPropertiesOfType(type));
            if (getSignaturesOfType(type, SignatureKind.Call).length || getSignaturesOfType(type, SignatureKind.Construct).length) {
                forEach(getPropertiesOfType(globalFunctionType), p => {
                    if (!hasProperty(propsByName, p.name)) {
                        propsByName[p.name] = p;
                    }
                });
            }
            return getNamedMembers(propsByName);
        }

        function getRootSymbols(symbol: Symbol): Symbol[]{
            if (symbol.flags & SymbolFlags.UnionProperty) {
                var symbols: Symbol[] = [];
                var name = symbol.name;
                forEach(getSymbolLinks(symbol).unionType.types, t => {
                    symbols.push(getPropertyOfType(t, name));
                });
                return symbols;
            }
            else if (symbol.flags & SymbolFlags.Transient) {
                var target = getSymbolLinks(symbol).target;
                if (target) {
                    return [target];
                }
            }
            return [symbol];
        }

        // Emitter support

        function isExternalModuleSymbol(symbol: Symbol): boolean {
            return symbol.flags & SymbolFlags.ValueModule && symbol.declarations.length === 1 && symbol.declarations[0].kind === SyntaxKind.SourceFile;
        }

        function isNodeDescendentOf(node: Node, ancestor: Node): boolean {
            while (node) {
                if (node === ancestor) return true;
                node = node.parent;
            }
            return false;
        }

        function isUniqueLocalName(name: string, container: Node): boolean {
            for (var node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && hasProperty(node.locals, name)) {
                    var symbolWithRelevantName = node.locals[name];
                    if (symbolWithRelevantName.flags & (SymbolFlags.Value | SymbolFlags.ExportValue)) {
                        return false;
                    }
                    
                    // An import can be emitted too, if it is referenced as a value.
                    // Make sure the name in question does not collide with an import.
                    if (symbolWithRelevantName.flags & SymbolFlags.Import) {
                        var importDeclarationWithRelevantName = <ImportDeclaration>getDeclarationOfKind(symbolWithRelevantName, SyntaxKind.ImportDeclaration);
                        if (isReferencedImportDeclaration(importDeclarationWithRelevantName)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        function getLocalNameOfContainer(container: ModuleDeclaration | EnumDeclaration): string {
            var links = getNodeLinks(container);
            if (!links.localModuleName) {
                var prefix = "";
                var name = unescapeIdentifier(container.name.text);
                while (!isUniqueLocalName(escapeIdentifier(prefix + name), container)) {
                    prefix += "_";
                }
                links.localModuleName = prefix + getTextOfNode(container.name);
            }
            return links.localModuleName;
        }

        function getLocalNameForSymbol(symbol: Symbol, location: Node): string {
            var node = location;
            while (node) {
                if ((node.kind === SyntaxKind.ModuleDeclaration || node.kind === SyntaxKind.EnumDeclaration) && getSymbolOfNode(node) === symbol) {
                    return getLocalNameOfContainer(<ModuleDeclaration | EnumDeclaration>node);
                }
                node = node.parent;
            }
            Debug.fail("getLocalNameForSymbol failed");
        }

        function getExpressionNamePrefix(node: Identifier): string {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol) {
                // In general, we need to prefix an identifier with its parent name if it references
                // an exported entity from another module declaration. If we reference an exported
                // entity within the same module declaration, then whether we prefix depends on the
                // kind of entity. SymbolFlags.ExportHasLocal encompasses all the kinds that we
                // do NOT prefix.
                var exportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
                if (symbol !== exportSymbol && !(exportSymbol.flags & SymbolFlags.ExportHasLocal)) {
                    symbol = exportSymbol;
                }
                if (symbol.parent) {
                    return isExternalModuleSymbol(symbol.parent) ? "exports" : getLocalNameForSymbol(getParentOfSymbol(symbol), node.parent);
                }
            }
        }

        function getExportAssignmentName(node: SourceFile): string {
            var symbol = getExportAssignmentSymbol(getSymbolOfNode(node));
            return symbol && symbolIsValue(symbol) && !isConstEnumSymbol(symbol) ? symbolToString(symbol): undefined;
        }

        function isTopLevelValueImportWithEntityName(node: ImportDeclaration): boolean {
            if (node.parent.kind !== SyntaxKind.SourceFile || !isInternalModuleImportDeclaration(node)) {
                // parent is not source file or it is not reference to internal module
                return false;
            }
            return isImportResolvedToValue(getSymbolOfNode(node));
        }

        function hasSemanticDiagnostics(sourceFile?: SourceFile) {
            // Return true if there is any semantic error in a file or globally
            return getDiagnostics(sourceFile).length > 0 || getGlobalDiagnostics().length > 0;
        }

        function isImportResolvedToValue(symbol: Symbol): boolean {
            var target = resolveImport(symbol);
            // const enums and modules that contain only const enums are not considered values from the emit perespective
            return target !== unknownSymbol && target.flags & SymbolFlags.Value && !isConstEnumOrConstEnumOnlyModule(target);
        }

        function isConstEnumOrConstEnumOnlyModule(s: Symbol): boolean {
            return isConstEnumSymbol(s) || s.constEnumOnlyModule;
        }

        function isReferencedImportDeclaration(node: ImportDeclaration): boolean {
            var symbol = getSymbolOfNode(node);
            if (getSymbolLinks(symbol).referenced) {
                return true;
            }
            // logic below will answer 'true' for exported import declaration in a nested module that itself is not exported.
            // As a consequence this might cause emitting extra.
            if (node.flags & NodeFlags.Export) {
                return isImportResolvedToValue(symbol);
            }
            return false;
        }

        function isImplementationOfOverload(node: FunctionLikeDeclaration) {
            if (nodeIsPresent(node.body)) {
                var symbol = getSymbolOfNode(node);
                var signaturesOfSymbol = getSignaturesOfSymbol(symbol);
                // If this function body corresponds to function with multiple signature, it is implementation of overload
                // e.g.: function foo(a: string): string;
                //       function foo(a: number): number;
                //       function foo(a: any) { // This is implementation of the overloads
                //           return a;
                //       }
                return signaturesOfSymbol.length > 1 ||
                    // If there is single signature for the symbol, it is overload if that signature isn't coming from the node
                    // e.g.: function foo(a: string): string;
                    //       function foo(a: any) { // This is implementation of the overloads
                    //           return a;
                    //       }
                    (signaturesOfSymbol.length === 1 && signaturesOfSymbol[0].declaration !== node);
            }
            return false;
        }

        function getNodeCheckFlags(node: Node): NodeCheckFlags {
            return getNodeLinks(node).flags;
        }

        function getEnumMemberValue(node: EnumMember): number {
            computeEnumMemberValues(<EnumDeclaration>node.parent);
            return getNodeLinks(node).enumMemberValue;
        }

        function getConstantValue(node: PropertyAccessExpression | ElementAccessExpression): number {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol && (symbol.flags & SymbolFlags.EnumMember)) {
                var declaration = symbol.valueDeclaration;
                var constantValue: number;
                if (declaration.kind === SyntaxKind.EnumMember) {
                    return getEnumMemberValue(<EnumMember>declaration);
                }
            }

            return undefined;
        }

        function writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter) {
            // Get type of the symbol if this is the valid symbol otherwise get type at location
            var symbol = getSymbolOfNode(declaration);
            var type = symbol && !(symbol.flags & (SymbolFlags.TypeLiteral | SymbolFlags.Signature))
                ? getTypeOfSymbol(symbol)
                : unknownType;

            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }

        function writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter) {
            var signature = getSignatureFromDeclaration(signatureDeclaration);
            getSymbolDisplayBuilder().buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags);
        }

        function isUnknownIdentifier(location: Node, name: string): boolean {
            return !resolveName(location, name, SymbolFlags.Value, /*nodeNotFoundMessage*/ undefined, /*nameArg*/ undefined);
        }

        function createResolver(): EmitResolver {
            return {
                getLocalNameOfContainer,
                getExpressionNamePrefix,
                getExportAssignmentName,
                isReferencedImportDeclaration,
                getNodeCheckFlags,
                getEnumMemberValue,
                isTopLevelValueImportWithEntityName,
                hasSemanticDiagnostics,
                isDeclarationVisible,
                isImplementationOfOverload,
                writeTypeOfDeclaration,
                writeReturnTypeOfSignatureDeclaration,
                isSymbolAccessible,
                isEntityNameVisible,
                getConstantValue,
                isUnknownIdentifier,
            };
        }

        function initializeTypeChecker() {
            // Bind all source files and propagate errors
            forEach(host.getSourceFiles(), file => {
                bindSourceFile(file);
                forEach(file.bindDiagnostics, d => diagnostics.add(d));
            });
            // Initialize global symbol table
            forEach(host.getSourceFiles(), file => {
                if (!isExternalModule(file)) {
                    extendSymbolTable(globals, file.locals);
                }
            });
            // Initialize special symbols
            getSymbolLinks(undefinedSymbol).type = undefinedType;
            getSymbolLinks(argumentsSymbol).type = getGlobalType("IArguments");
            getSymbolLinks(unknownSymbol).type = unknownType;
            globals[undefinedSymbol.name] = undefinedSymbol;
            // Initialize special types
            globalArraySymbol = getGlobalSymbol("Array");
            globalArrayType = getTypeOfGlobalSymbol(globalArraySymbol, 1);
            globalObjectType = getGlobalType("Object");
            globalFunctionType = getGlobalType("Function");
            globalStringType = getGlobalType("String");
            globalNumberType = getGlobalType("Number");
            globalBooleanType = getGlobalType("Boolean");
            globalRegExpType = getGlobalType("RegExp");
            // If we're in ES6 mode, load the TemplateStringsArray.
            // Otherwise, default to 'unknown' for the purposes of type checking in LS scenarios.
            globalTemplateStringsArrayType = languageVersion >= ScriptTarget.ES6
                ? getGlobalType("TemplateStringsArray")
                : unknownType;
            anyArrayType = createArrayType(anyType);
        }


        // GRAMMAR CHECKING
        function checkGrammarModifiers(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.Constructor:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.Parameter:
                    break;
                default:
                    return false;
            }

            if (!node.modifiers) {
                return;
            }

            var lastStatic: Node, lastPrivate: Node, lastProtected: Node, lastDeclare: Node;
            var flags = 0;
            for (var i = 0, n = node.modifiers.length; i < n; i++) {
                var modifier = node.modifiers[i];

                switch (modifier.kind) {
                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.ProtectedKeyword:
                    case SyntaxKind.PrivateKeyword:
                        var text: string;
                        if (modifier.kind === SyntaxKind.PublicKeyword) {
                            text = "public";
                        }
                        else if (modifier.kind === SyntaxKind.ProtectedKeyword) {
                            text = "protected";
                            lastProtected = modifier;
                        }
                        else {
                            text = "private";
                            lastPrivate = modifier;
                        }

                        if (flags & NodeFlags.AccessibilityModifier) {
                            return grammarErrorOnNode(modifier, Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "static");
                        }
                        else if (node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_element, text);
                        }
                        flags |= modifierToFlag(modifier.kind);
                        break;

                    case SyntaxKind.StaticKeyword:
                        if (flags & NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        flags |= NodeFlags.Static;
                        lastStatic = modifier;
                        break;

                    case SyntaxKind.ExportKeyword:
                        if (flags & NodeFlags.Export) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "export");
                        }
                        else if (flags & NodeFlags.Ambient) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                        }
                        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_class_element, "export");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                        }
                        flags |= NodeFlags.Export;
                        break;

                    case SyntaxKind.DeclareKeyword:
                        if (flags & NodeFlags.Ambient) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "declare");
                        }
                        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_class_element, "declare");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                        }
                        else if (isInAmbientContext(node.parent) && node.parent.kind === SyntaxKind.ModuleBlock) {
                            return grammarErrorOnNode(modifier, Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                        }
                        flags |= NodeFlags.Ambient;
                        lastDeclare = modifier
                        break;
                }
            }

            if (node.kind === SyntaxKind.Constructor) {
                if (flags & NodeFlags.Static) {
                    return grammarErrorOnNode(lastStatic, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                }
                else if (flags & NodeFlags.Protected) {
                    return grammarErrorOnNode(lastProtected, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "protected");
                }
                else if (flags & NodeFlags.Private) {
                    return grammarErrorOnNode(lastPrivate, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
                }
            }
            else if (node.kind === SyntaxKind.ImportDeclaration && flags & NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, Diagnostics.A_declare_modifier_cannot_be_used_with_an_import_declaration, "declare");
            }
            else if (node.kind === SyntaxKind.InterfaceDeclaration && flags & NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, Diagnostics.A_declare_modifier_cannot_be_used_with_an_interface_declaration, "declare");
            }
            else if (node.kind === SyntaxKind.Parameter && (flags & NodeFlags.AccessibilityModifier) && isBindingPattern((<ParameterDeclaration>node).name)) {
                return grammarErrorOnNode(node, Diagnostics.A_parameter_property_may_not_be_a_binding_pattern);
            }
        }

        function checkGrammarForDisallowedTrailingComma(list: NodeArray<Node>): boolean {
            if (list && list.hasTrailingComma) {
                var start = list.end - ",".length;
                var end = list.end;
                var sourceFile = getSourceFileOfNode(list[0]);
                return grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Trailing_comma_not_allowed);
            }
        }

        function checkGrammarTypeParameterList(node: FunctionLikeDeclaration, typeParameters: NodeArray<TypeParameterDeclaration>): boolean {
            if (checkGrammarForDisallowedTrailingComma(typeParameters)) {
                return true;
            }

            if (typeParameters && typeParameters.length === 0) {
                var start = typeParameters.pos - "<".length;
                var sourceFile = getSourceFileOfNode(node);
                var end = skipTrivia(sourceFile.text, typeParameters.end) + ">".length;
                return grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Type_parameter_list_cannot_be_empty);
            }
        }

        function checkGrammarParameterList(parameters: NodeArray<ParameterDeclaration>) {
            if (checkGrammarForDisallowedTrailingComma(parameters)) {
                return true;
            }

            var seenOptionalParameter = false;
            var parameterCount = parameters.length;

            for (var i = 0; i < parameterCount; i++) {
                var parameter = parameters[i];
                if (parameter.dotDotDotToken) {
                    if (i !== (parameterCount - 1)) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                    }

                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_rest_parameter_cannot_be_optional);
                    }

                    if (parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                    }
                }
                else if (parameter.questionToken || parameter.initializer) {
                    seenOptionalParameter = true;

                    if (parameter.questionToken && parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                    }
                }
            }
        }

        function checkGrammarFunctionLikeDeclaration(node: FunctionLikeDeclaration): boolean {
            // Prevent cascading error by short-circuit
            return checkGrammarModifiers(node) || checkGrammarTypeParameterList(node, node.typeParameters) || checkGrammarParameterList(node.parameters);
        }

        function checkGrammarIndexSignatureParameters(node: SignatureDeclaration): boolean {
            var parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                if (parameter) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
                else {
                    return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
            }
            else if (parameter.dotDotDotToken) {
                return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
            }
            else if (parameter.flags & NodeFlags.Modifier) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
            }
            else if (parameter.questionToken) {
                return grammarErrorOnNode(parameter.questionToken, Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
            }
            else if (parameter.initializer) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
            }
            else if (!parameter.type) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
            }
            else if (parameter.type.kind !== SyntaxKind.StringKeyword && parameter.type.kind !== SyntaxKind.NumberKeyword) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
            }
            else if (!node.type) {
                return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_a_type_annotation);
            }
        }

        function checkGrammarForIndexSignatureModifier(node: SignatureDeclaration): void {
            if (node.flags & NodeFlags.Modifier) {
                grammarErrorOnFirstToken(node, Diagnostics.Modifiers_not_permitted_on_index_signature_members);
            }
        }

        function checkGrammarIndexSignature(node: SignatureDeclaration) {
            // Prevent cascading error by short-circuit
            checkGrammarModifiers(node) || checkGrammarIndexSignatureParameters(node) || checkGrammarForIndexSignatureModifier(node);
        }

        function checkGrammarForAtLeastOneTypeArgument(node: Node, typeArguments: NodeArray<TypeNode>): boolean {
            if (typeArguments && typeArguments.length === 0) {
                var sourceFile = getSourceFileOfNode(node);
                var start = typeArguments.pos - "<".length;
                var end = skipTrivia(sourceFile.text, typeArguments.end) + ">".length;
                return grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Type_argument_list_cannot_be_empty);
            }
        }

        function checkGrammarTypeArguments(node: Node, typeArguments: NodeArray<TypeNode>): boolean {
            return checkGrammarForDisallowedTrailingComma(typeArguments) ||
                checkGrammarForAtLeastOneTypeArgument(node, typeArguments);
        }

        function checkGrammarForOmittedArgument(node: CallExpression, arguments: NodeArray<Expression>): boolean {
            if (arguments) {
                var sourceFile = getSourceFileOfNode(node);
                for (var i = 0, n = arguments.length; i < n; i++) {
                    var arg = arguments[i];
                    if (arg.kind === SyntaxKind.OmittedExpression) {
                        return grammarErrorAtPos(sourceFile, arg.pos, 0, Diagnostics.Argument_expression_expected);
                    }
                }
            }
        }

        function checkGrammarArguments(node: CallExpression, arguments: NodeArray<Expression>): boolean {
            return checkGrammarForDisallowedTrailingComma(arguments) ||
                checkGrammarForOmittedArgument(node, arguments);
        }

        function checkGrammarHeritageClause(node: HeritageClause): boolean {
            var types = node.types;
            if (checkGrammarForDisallowedTrailingComma(types)) {
                return true;
            }
            if (types && types.length === 0) {
                var listType = tokenToString(node.token);
                var sourceFile = getSourceFileOfNode(node);
                return grammarErrorAtPos(sourceFile, types.pos, 0, Diagnostics._0_list_cannot_be_empty, listType)
            }
        }

        function checkGrammarClassDeclarationHeritageClauses(node: ClassDeclaration) {
            var seenExtendsClause = false;
            var seenImplementsClause = false;

            if (!checkGrammarModifiers(node) && node.heritageClauses) {
                for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                    Debug.assert(i <= 2);
                    var heritageClause = node.heritageClauses[i];

                    if (heritageClause.token === SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen)
                        }

                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_must_precede_implements_clause);
                        }

                        if (heritageClause.types.length > 1) {
                            return grammarErrorOnFirstToken(heritageClause.types[1], Diagnostics.Classes_can_only_extend_a_single_class);
                        }

                        seenExtendsClause = true;
                    }
                    else {
                        Debug.assert(heritageClause.token === SyntaxKind.ImplementsKeyword);
                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.implements_clause_already_seen);
                        }

                        seenImplementsClause = true;
                    }

                    // Grammar checking heritageClause inside class declaration
                    checkGrammarHeritageClause(heritageClause);
                }
            }
        }

        function checkGrammarInterfaceDeclaration(node: InterfaceDeclaration) {
            var seenExtendsClause = false;

            if (node.heritageClauses) {
                for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                    Debug.assert(i <= 1);
                    var heritageClause = node.heritageClauses[i];

                    if (heritageClause.token === SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen);
                        }

                        seenExtendsClause = true;
                    }
                    else {
                        Debug.assert(heritageClause.token === SyntaxKind.ImplementsKeyword);
                        return grammarErrorOnFirstToken(heritageClause, Diagnostics.Interface_declaration_cannot_have_implements_clause);
                    }

                    // Grammar checking heritageClause inside class declaration
                    checkGrammarHeritageClause(heritageClause);
                }
            }

            return false;
        }

        function checkGrammarComputedPropertyName(node: Node): boolean {
            // If node is not a computedPropertyName, just skip the grammar checking
            if (node.kind !== SyntaxKind.ComputedPropertyName) {
                return false;
            }

            var computedPropertyName = <ComputedPropertyName>node;
            if (languageVersion < ScriptTarget.ES6) {
                return grammarErrorOnNode(node, Diagnostics.Computed_property_names_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }
            else if (computedPropertyName.expression.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>computedPropertyName.expression).operator === SyntaxKind.CommaToken) {
                return grammarErrorOnNode(computedPropertyName.expression, Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name);
            }
        }

        function checkGrammarForGenerator(node: FunctionLikeDeclaration) {
            if (node.asteriskToken) {
                return grammarErrorOnNode(node.asteriskToken, Diagnostics.Generators_are_not_currently_supported);
            }
        }

        function checkGrammarFunctionName(name: Node) {
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
            return checkGrammarEvalOrArgumentsInStrictMode(name, <Identifier>name);
        }

        function checkGrammarForInvalidQuestionMark(node: Declaration, questionToken: Node, message: DiagnosticMessage): boolean {
            if (questionToken) {
                return grammarErrorOnNode(questionToken, message);
            }
        }

        function checkGrammarObjectLiteralExpression(node: ObjectLiteralExpression) {
            var seen: Map<SymbolFlags> = {};
            var Property = 1;
            var GetAccessor = 2;
            var SetAccesor = 4;
            var GetOrSetAccessor = GetAccessor | SetAccesor;
            var inStrictMode = (node.parserContextFlags & ParserContextFlags.StrictMode) !== 0;

            for (var i = 0, n = node.properties.length; i < n; i++) {
                var prop = node.properties[i];
                var name = prop.name;
                if (prop.kind === SyntaxKind.OmittedExpression || 
                    name.kind === SyntaxKind.ComputedPropertyName) {
                    // If the name is not a ComputedPropertyName, the grammar checking will skip it
                    checkGrammarComputedPropertyName(<ComputedPropertyName>name);
                    continue;
                }

                // ECMA-262 11.1.5 Object Initialiser
                // If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
                // a.This production is contained in strict code and IsDataDescriptor(previous) is true and
                // IsDataDescriptor(propId.descriptor) is true.
                //    b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
                //    c.IsAccessorDescriptor(previous) is true and IsDataDescriptor(propId.descriptor) is true.
                //    d.IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true
                // and either both previous and propId.descriptor have[[Get]] fields or both previous and propId.descriptor have[[Set]] fields
                var currentKind: number;
                if (prop.kind === SyntaxKind.PropertyAssignment || prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    // Grammar checking for computedPropertName and shorthandPropertyAssignment
                    checkGrammarForInvalidQuestionMark(prop,(<PropertyAssignment>prop).questionToken, Diagnostics.An_object_member_cannot_be_declared_optional);
                    if (name.kind === SyntaxKind.NumericLiteral) {
                        checkGrammarNumbericLiteral(<Identifier>name);
                    }
                    currentKind = Property;
                }
                else if ( prop.kind === SyntaxKind.MethodDeclaration) {
                    currentKind = Property;
                }
                else if (prop.kind === SyntaxKind.GetAccessor) {
                    currentKind = GetAccessor;
                }
                else if (prop.kind === SyntaxKind.SetAccessor) {
                    currentKind = SetAccesor;
                }
                else {
                    Debug.fail("Unexpected syntax kind:" + prop.kind);
                }

                if (!hasProperty(seen, (<Identifier>name).text)) {
                    seen[(<Identifier>name).text] = currentKind;
                }
                else {
                    var existingKind = seen[(<Identifier>name).text];
                    if (currentKind === Property && existingKind === Property) {
                        if (inStrictMode) {
                            grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode);
                        }
                    }
                    else if ((currentKind & GetOrSetAccessor) && (existingKind & GetOrSetAccessor)) {
                        if (existingKind !== GetOrSetAccessor && currentKind !== existingKind) {
                            seen[(<Identifier>name).text] = currentKind | existingKind;
                        }
                        else {
                            return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                        }
                    }
                    else {
                        return grammarErrorOnNode(name, Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                    }
                }
            }
        }

        function checkGrammarAccessor(accessor: MethodDeclaration): boolean {
            var kind = accessor.kind;
            if (languageVersion < ScriptTarget.ES5) {
                return grammarErrorOnNode(accessor.name, Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
            }
            else if (isInAmbientContext(accessor)) {
                return grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_be_declared_in_an_ambient_context);
            }
            else if (accessor.body === undefined) {
                return grammarErrorAtPos(getSourceFileOfNode(accessor), accessor.end - 1, ";".length, Diagnostics._0_expected, "{");
            }
            else if (accessor.typeParameters) {
                return grammarErrorOnNode(accessor.name, Diagnostics.An_accessor_cannot_have_type_parameters);
            }
            else if (kind === SyntaxKind.GetAccessor && accessor.parameters.length) {
                return grammarErrorOnNode(accessor.name, Diagnostics.A_get_accessor_cannot_have_parameters);
            }
            else if (kind === SyntaxKind.SetAccessor) {
                if (accessor.type) {
                    return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                }
                else if (accessor.parameters.length !== 1) {
                    return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                }
                else {
                    var parameter = accessor.parameters[0];
                    if (parameter.dotDotDotToken) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                    }
                    else if (parameter.flags & NodeFlags.Modifier) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                    }
                    else if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                    }
                    else if (parameter.initializer) {
                        return grammarErrorOnNode(accessor.name, Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                    }
                }
            }
        }

        function checkGrammarForDisallowedComputedProperty(node: DeclarationName, message: DiagnosticMessage) {
            if (node.kind === SyntaxKind.ComputedPropertyName) {
                return grammarErrorOnNode(node, message);
            }
        }

        function checkGrammarMethod(node: MethodDeclaration) {
            if (checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) ||
                checkGrammarFunctionLikeDeclaration(node) ||
                checkGrammarForGenerator(node)) {
                return true;
            }

            if (node.parent.kind === SyntaxKind.ObjectLiteralExpression) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                else if (node.body === undefined) {
                    return grammarErrorAtPos(getSourceFile(node), node.end - 1, ";".length, Diagnostics._0_expected, "{");
                }
            }

            if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                // Technically, computed properties in ambient contexts is disallowed
                // for property declarations and accessors too, not just methods.
                // However, property declarations disallow computed names in general,
                // and accessors are not allowed in ambient contexts in general,
                // so this error only really matters for methods.
                if (isInAmbientContext(node)) {
                    return checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_an_ambient_context);
                }
                else if (!node.body) {
                    return checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_method_overloads);
                }
            }
            else if (node.parent.kind === SyntaxKind.InterfaceDeclaration) {
                return checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_interfaces);
            }
            else if (node.parent.kind === SyntaxKind.TypeLiteral) {
                return checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_type_literals);
            }
        }

        function isIterationStatement(node: Node, lookInLabeledStatements: boolean): boolean {
            switch (node.kind) {
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    return true;
                case SyntaxKind.LabeledStatement:
                    return lookInLabeledStatements && isIterationStatement((<LabeledStatement>node).statement, lookInLabeledStatements);
            }

            return false;
        }

        function checkGrammarBreakOrContinueStatement(node: BreakOrContinueStatement): boolean {
            var current: Node = node;
            while (current) {
                if (isAnyFunction(current)) {
                    return grammarErrorOnNode(node, Diagnostics.Jump_target_cannot_cross_function_boundary);
                }

                switch (current.kind) {
                    case SyntaxKind.LabeledStatement:
                        if (node.label && (<LabeledStatement>current).label.text === node.label.text) {
                            // found matching label - verify that label usage is correct
                            // continue can only target labels that are on iteration statements
                            var isMisplacedContinueLabel = node.kind === SyntaxKind.ContinueStatement
                                && !isIterationStatement((<LabeledStatement>current).statement, /*lookInLabeledStatement*/ true);

                            if (isMisplacedContinueLabel) {
                                return grammarErrorOnNode(node, Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement);
                            }

                            return false;
                        }
                        break;
                    case SyntaxKind.SwitchStatement:
                        if (node.kind === SyntaxKind.BreakStatement && !node.label) {
                            // unlabeled break within switch statement - ok
                            return false;
                        }
                        break;
                    default:
                        if (isIterationStatement(current, /*lookInLabeledStatement*/ false) && !node.label) {
                            // unlabeled break or continue within iteration statement - ok
                            return false;
                        }
                        break;
                }

                current = current.parent;
            }

            if (node.label) {
                var message = node.kind === SyntaxKind.BreakStatement
                    ? Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement
                    : Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;

                return grammarErrorOnNode(node, message)
            }
            else {
                var message = node.kind === SyntaxKind.BreakStatement
                    ? Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement
                    : Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message)
            }
        }

        function checkGrammarBindingElement(node: BindingElement) {
            if (node.dotDotDotToken) {
                var elements = (<BindingPattern>node.parent).elements;
                if (node !== elements[elements.length - 1]) {
                    return grammarErrorOnNode(node, Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                }
                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(getSourceFileOfNode(node), node.initializer.pos - 1, 1, Diagnostics.A_rest_element_cannot_have_an_initializer);
                }
            }
            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code 
            // and its Identifier is eval or arguments 
            return checkGrammarEvalOrArgumentsInStrictMode(node, <Identifier>node.name);
        }

        function checkGrammarVariableDeclaration(node: VariableDeclaration) {
            if (isInAmbientContext(node)) {
                if (isBindingPattern(node.name)) {
                    return grammarErrorOnNode(node, Diagnostics.Destructuring_declarations_are_not_allowed_in_ambient_contexts);
                }
                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(getSourceFileOfNode(node), node.initializer.pos - 1, 1, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                }
            }
            else {
                if (!node.initializer) {
                    if (isBindingPattern(node.name) && !isBindingPattern(node.parent)) {
                        return grammarErrorOnNode(node, Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                    }
                    if (isConst(node)) {
                        return grammarErrorOnNode(node, Diagnostics.const_declarations_must_be_initialized);
                    }
                }
            }
            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code 
            // and its Identifier is eval or arguments 
            return checkGrammarEvalOrArgumentsInStrictMode(node, <Identifier>node.name);
        }

        function checkGrammarVariableDeclarationList(declarationList: VariableDeclarationList): boolean {
            var declarations = declarationList.declarations;
            if (checkGrammarForDisallowedTrailingComma(declarationList.declarations)) {
                return true;
            }

            if (!declarationList.declarations.length) {
                return grammarErrorAtPos(getSourceFileOfNode(declarationList), declarations.pos, declarations.end - declarations.pos, Diagnostics.Variable_declaration_list_cannot_be_empty);
            }

            if (languageVersion < ScriptTarget.ES6) {
                if (isLet(declarationList)) {
                    return grammarErrorOnFirstToken(declarationList, Diagnostics.let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                }
                else if (isConst(declarationList)) {
                    return grammarErrorOnFirstToken(declarationList, Diagnostics.const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                }
            }
        }

        function allowLetAndConstDeclarations(parent: Node): boolean {
            switch (parent.kind) {
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                    return false;
                case SyntaxKind.LabeledStatement:
                    return allowLetAndConstDeclarations(parent.parent);
            }

            return true;
        }

        function checkGrammarForDisallowedLetOrConstStatement(node: VariableStatement) {
            if (!allowLetAndConstDeclarations(node.parent)) {
                if (isLet(node.declarationList)) {
                    return grammarErrorOnNode(node, Diagnostics.let_declarations_can_only_be_declared_inside_a_block);
                }
                else if (isConst(node.declarationList)) {
                    return grammarErrorOnNode(node, Diagnostics.const_declarations_can_only_be_declared_inside_a_block);
                }
            }
        }

        function isIntegerLiteral(expression: Expression): boolean {
            if (expression.kind === SyntaxKind.PrefixUnaryExpression) {
                var unaryExpression = <PrefixUnaryExpression>expression;
                if (unaryExpression.operator === SyntaxKind.PlusToken || unaryExpression.operator === SyntaxKind.MinusToken) {
                    expression = unaryExpression.operand;
                }
            }
            if (expression.kind === SyntaxKind.NumericLiteral) {
                // Allows for scientific notation since literalExpression.text was formed by
                // coercing a number to a string. Sometimes this coercion can yield a string
                // in scientific notation.
                // We also don't need special logic for hex because a hex integer is converted
                // to decimal when it is coerced.
                return /^[0-9]+([eE]\+?[0-9]+)?$/.test((<LiteralExpression>expression).text);
            }

            return false;
        }

        function checkGrammarEnumDeclaration(enumDecl: EnumDeclaration): boolean {
            var enumIsConst = (enumDecl.flags & NodeFlags.Const) !== 0;

            var hasError = false;

            // skip checks below for const enums  - they allow arbitrary initializers as long as they can be evaluated to constant expressions.
            // since all values are known in compile time - it is not necessary to check that constant enum section precedes computed enum members.
            if (!enumIsConst) {
                var inConstantEnumMemberSection = true;
                var inAmbientContext = isInAmbientContext(enumDecl);
                for (var i = 0, n = enumDecl.members.length; i < n; i++) {
                    var node = enumDecl.members[i];
                    if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                        hasError = grammarErrorOnNode(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_enums);
                    }
                    else if (inAmbientContext) {
                        if (node.initializer && !isIntegerLiteral(node.initializer)) {
                            hasError = grammarErrorOnNode(node.name, Diagnostics.Ambient_enum_elements_can_only_have_integer_literal_initializers) || hasError;
                        }
                    }
                    else if (node.initializer) {
                        inConstantEnumMemberSection = isIntegerLiteral(node.initializer);
                    }
                    else if (!inConstantEnumMemberSection) {
                        hasError = grammarErrorOnNode(node.name, Diagnostics.Enum_member_must_have_initializer) || hasError;
                    }
                }
            }

            return hasError;
        }

        function hasParseDiagnostics(sourceFile: SourceFile): boolean {
            return sourceFile.parseDiagnostics.length > 0;
        }

        function scanToken(scanner: Scanner, pos: number) {
            scanner.setTextPos(pos);
            scanner.scan();
            var start = scanner.getTokenPos();
            return start;
        }

        function grammarErrorOnFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            var sourceFile = getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                var scanner = createScanner(languageVersion, /*skipTrivia*/ true, sourceFile.text);
                var start = scanToken(scanner, node.pos);
                diagnostics.add(createFileDiagnostic(sourceFile, start, scanner.getTextPos() - start, message, arg0, arg1, arg2));
                return true;
            }
        }

        function grammarErrorAtPos(sourceFile: SourceFile, start: number, length: number, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            if (!hasParseDiagnostics(sourceFile)) {
                diagnostics.add(createFileDiagnostic(sourceFile, start, length, message, arg0, arg1, arg2));
                return true;
            }
        }

        function grammarErrorOnNode(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            var sourceFile = getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                var span = getErrorSpanForNode(node);
                var start = span.end > span.pos ? skipTrivia(sourceFile.text, span.pos) : span.pos;
                diagnostics.add(createFileDiagnostic(sourceFile, start, span.end - start, message, arg0, arg1, arg2));
                return true;
            }
        }

        function checkGrammarEvalOrArgumentsInStrictMode(contextNode: Node, identifier: Identifier): boolean {
            if (contextNode && (contextNode.parserContextFlags & ParserContextFlags.StrictMode) && isEvalOrArgumentsIdentifier(identifier)) {
                var name = declarationNameToString(identifier);
                return grammarErrorOnNode(identifier, Diagnostics.Invalid_use_of_0_in_strict_mode, name);
            }
        }

        function checkGrammarConstructorTypeParameters(node: ConstructorDeclaration) {
            if (node.typeParameters) {
                return grammarErrorAtPos(getSourceFileOfNode(node), node.typeParameters.pos, node.typeParameters.end - node.typeParameters.pos, Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
            }
        }

        function checkGrammarConstructorTypeAnnotation(node: ConstructorDeclaration) {
            if (node.type) {
                return grammarErrorOnNode(node.type, Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
            }
        }

        function checkGrammarProperty(node: PropertyDeclaration) {
            if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional) ||
                    checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_class_property_declarations)) {
                    return true;
                }
            }
            else if (node.parent.kind === SyntaxKind.InterfaceDeclaration) {
                if (checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_interfaces)) {
                    return true;
                }
            }
            else if (node.parent.kind === SyntaxKind.TypeLiteral) {
                if (checkGrammarForDisallowedComputedProperty(node.name, Diagnostics.Computed_property_names_are_not_allowed_in_type_literals)) {
                    return true;
                }
            }

            if (isInAmbientContext(node) && node.initializer) {
                return grammarErrorOnFirstToken(node.initializer, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
        }

        function checkGrammarTopLevelElementForRequiredDeclareModifier(node: Node): boolean {
            // A declare modifier is required for any top level .d.ts declaration except export=, interfaces and imports:
            // categories:
            //
            //  DeclarationElement:
            //     ExportAssignment
            //     export_opt   InterfaceDeclaration
            //     export_opt   ImportDeclaration
            //     export_opt   ExternalImportDeclaration
            //     export_opt   AmbientDeclaration
            //
            if (node.kind === SyntaxKind.InterfaceDeclaration ||
                node.kind === SyntaxKind.ImportDeclaration ||
                node.kind === SyntaxKind.ExportAssignment ||
                (node.flags & NodeFlags.Ambient)) {

                return false;
            }

            return grammarErrorOnFirstToken(node, Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
        }

        function checkGrammarTopLevelElementsForRequiredDeclareModifier(file: SourceFile): boolean {
            for (var i = 0, n = file.statements.length; i < n; i++) {
                var decl = file.statements[i];
                if (isDeclaration(decl) || decl.kind === SyntaxKind.VariableStatement) {
                    if (checkGrammarTopLevelElementForRequiredDeclareModifier(decl)) {
                        return true;
                    }
                }
            }
        }

        function checkGrammarSourceFile(node: SourceFile): boolean {
            return isInAmbientContext(node) && checkGrammarTopLevelElementsForRequiredDeclareModifier(node);
        }

        function checkGrammarForStatementInAmbientContext(node: Node): boolean {
            if (isInAmbientContext(node)) {
                // An accessors is already reported about the ambient context
                if (isAccessor(node.parent.kind)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = true;
                }

                // Find containing block which is either Block, ModuleBlock, SourceFile
                var links = getNodeLinks(node);
                if (!links.hasReportedStatementInAmbientContext && isAnyFunction(node.parent)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts)
                }
                
                // We are either parented by another statement, or some sort of block.
                // If we're in a block, we only want to really report an error once
                // to prevent noisyness.  So use a bit on the block to indicate if
                // this has already been reported, and don't report if it has.
                //
                if (node.parent.kind === SyntaxKind.Block || node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                    var links = getNodeLinks(node.parent);
                    // Check if the containing block ever report this error
                    if (!links.hasReportedStatementInAmbientContext) {
                        return links.hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
                    }
                }
                else {
                    // We must be parented by a statement.  If so, there's no need
                    // to report the error as our parent will have already done it.
                    // Debug.assert(isStatement(node.parent));
                }
            }
        }

        function checkGrammarNumbericLiteral(node: Identifier): boolean {
            // Grammar checking
            if (node.flags & NodeFlags.OctalLiteral) {
                if (node.parserContextFlags & ParserContextFlags.StrictMode) {
                    return grammarErrorOnNode(node, Diagnostics.Octal_literals_are_not_allowed_in_strict_mode);
                }
                else if (languageVersion >= ScriptTarget.ES5) {
                    return grammarErrorOnNode(node, Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher);
                }
            }
        }

        function grammarErrorAfterFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            var sourceFile = getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                var scanner = createScanner(languageVersion, /*skipTrivia*/ true, sourceFile.text);
                scanToken(scanner, node.pos);
                diagnostics.add(createFileDiagnostic(sourceFile, scanner.getTextPos(), 0, message, arg0, arg1, arg2));
                return true;
            }
        }

        initializeTypeChecker();

        return checker;
    }
}
