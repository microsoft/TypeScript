/// <reference path="binder.ts"/>
var ts;
(function (ts) {
    var nextSymbolId = 1;
    var nextNodeId = 1;
    var nextMergeId = 1;
    function createTypeChecker(host, produceDiagnostics) {
        var Symbol = ts.objectAllocator.getSymbolConstructor();
        var Type = ts.objectAllocator.getTypeConstructor();
        var Signature = ts.objectAllocator.getSignatureConstructor();
        var typeCount = 0;
        var emptyArray = [];
        var emptySymbols = {};
        var compilerOptions = host.getCompilerOptions();
        var emitResolver = createResolver();
        var checker = {
            getNodeCount: function () { return ts.sum(host.getSourceFiles(), "nodeCount"); },
            getIdentifierCount: function () { return ts.sum(host.getSourceFiles(), "identifierCount"); },
            getSymbolCount: function () { return ts.sum(host.getSourceFiles(), "symbolCount"); },
            getTypeCount: function () { return typeCount; },
            isUndefinedSymbol: function (symbol) { return symbol === undefinedSymbol; },
            isArgumentsSymbol: function (symbol) { return symbol === argumentsSymbol; },
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
            getEmitResolver: function () { return emitResolver; },
        };
        var undefinedSymbol = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Transient, "undefined");
        var argumentsSymbol = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Transient, "arguments");
        var unknownSymbol = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Transient, "unknown");
        var resolvingSymbol = createSymbol(ts.SymbolFlags.Transient, "__resolving__");
        var anyType = createIntrinsicType(ts.TypeFlags.Any, "any");
        var stringType = createIntrinsicType(ts.TypeFlags.String, "string");
        var numberType = createIntrinsicType(ts.TypeFlags.Number, "number");
        var booleanType = createIntrinsicType(ts.TypeFlags.Boolean, "boolean");
        var voidType = createIntrinsicType(ts.TypeFlags.Void, "void");
        var undefinedType = createIntrinsicType(ts.TypeFlags.Undefined | ts.TypeFlags.Unwidened, "undefined");
        var nullType = createIntrinsicType(ts.TypeFlags.Null | ts.TypeFlags.Unwidened, "null");
        var unknownType = createIntrinsicType(ts.TypeFlags.Any, "unknown");
        var resolvingType = createIntrinsicType(ts.TypeFlags.Any, "__resolving__");
        var emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var inferenceFailureType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var anySignature = createSignature(undefined, undefined, emptyArray, anyType, 0, false, false);
        var unknownSignature = createSignature(undefined, undefined, emptyArray, unknownType, 0, false, false);
        var globals = {};
        var globalArraySymbol;
        var globalObjectType;
        var globalFunctionType;
        var globalArrayType;
        var globalStringType;
        var globalNumberType;
        var globalBooleanType;
        var globalRegExpType;
        var globalTemplateStringsArrayType;
        var anyArrayType;
        var tupleTypes = {};
        var unionTypes = {};
        var stringLiteralTypes = {};
        var emitExtends = false;
        var mergedSymbols = [];
        var symbolLinks = [];
        var nodeLinks = [];
        var potentialThisCollisions = [];
        var diagnostics = [];
        var diagnosticsModified = false;
        function addDiagnostic(diagnostic) {
            diagnostics.push(diagnostic);
            diagnosticsModified = true;
        }
        function error(location, message, arg0, arg1, arg2) {
            var diagnostic = location ? ts.createDiagnosticForNode(location, message, arg0, arg1, arg2) : ts.createCompilerDiagnostic(message, arg0, arg1, arg2);
            addDiagnostic(diagnostic);
        }
        function createSymbol(flags, name) {
            return new Symbol(flags, name);
        }
        function getExcludedSymbolFlags(flags) {
            var result = 0;
            if (flags & ts.SymbolFlags.BlockScopedVariable)
                result |= ts.SymbolFlags.BlockScopedVariableExcludes;
            if (flags & ts.SymbolFlags.FunctionScopedVariable)
                result |= ts.SymbolFlags.FunctionScopedVariableExcludes;
            if (flags & ts.SymbolFlags.Property)
                result |= ts.SymbolFlags.PropertyExcludes;
            if (flags & ts.SymbolFlags.EnumMember)
                result |= ts.SymbolFlags.EnumMemberExcludes;
            if (flags & ts.SymbolFlags.Function)
                result |= ts.SymbolFlags.FunctionExcludes;
            if (flags & ts.SymbolFlags.Class)
                result |= ts.SymbolFlags.ClassExcludes;
            if (flags & ts.SymbolFlags.Interface)
                result |= ts.SymbolFlags.InterfaceExcludes;
            if (flags & ts.SymbolFlags.RegularEnum)
                result |= ts.SymbolFlags.RegularEnumExcludes;
            if (flags & ts.SymbolFlags.ConstEnum)
                result |= ts.SymbolFlags.ConstEnumExcludes;
            if (flags & ts.SymbolFlags.ValueModule)
                result |= ts.SymbolFlags.ValueModuleExcludes;
            if (flags & ts.SymbolFlags.Method)
                result |= ts.SymbolFlags.MethodExcludes;
            if (flags & ts.SymbolFlags.GetAccessor)
                result |= ts.SymbolFlags.GetAccessorExcludes;
            if (flags & ts.SymbolFlags.SetAccessor)
                result |= ts.SymbolFlags.SetAccessorExcludes;
            if (flags & ts.SymbolFlags.TypeParameter)
                result |= ts.SymbolFlags.TypeParameterExcludes;
            if (flags & ts.SymbolFlags.TypeAlias)
                result |= ts.SymbolFlags.TypeAliasExcludes;
            if (flags & ts.SymbolFlags.Import)
                result |= ts.SymbolFlags.ImportExcludes;
            return result;
        }
        function recordMergedSymbol(target, source) {
            if (!source.mergeId)
                source.mergeId = nextMergeId++;
            mergedSymbols[source.mergeId] = target;
        }
        function cloneSymbol(symbol) {
            var result = createSymbol(symbol.flags | ts.SymbolFlags.Merged, symbol.name);
            result.declarations = symbol.declarations.slice(0);
            result.parent = symbol.parent;
            if (symbol.valueDeclaration)
                result.valueDeclaration = symbol.valueDeclaration;
            if (symbol.constEnumOnlyModule)
                result.constEnumOnlyModule = true;
            if (symbol.members)
                result.members = cloneSymbolTable(symbol.members);
            if (symbol.exports)
                result.exports = cloneSymbolTable(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }
        function extendSymbol(target, source) {
            if (!(target.flags & getExcludedSymbolFlags(source.flags))) {
                if (source.flags & ts.SymbolFlags.ValueModule && target.flags & ts.SymbolFlags.ValueModule && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                    // reset flag when merging instantiated module into value module that has only const enums
                    target.constEnumOnlyModule = false;
                }
                target.flags |= source.flags;
                if (!target.valueDeclaration && source.valueDeclaration)
                    target.valueDeclaration = source.valueDeclaration;
                ts.forEach(source.declarations, function (node) {
                    target.declarations.push(node);
                });
                if (source.members) {
                    if (!target.members)
                        target.members = {};
                    extendSymbolTable(target.members, source.members);
                }
                if (source.exports) {
                    if (!target.exports)
                        target.exports = {};
                    extendSymbolTable(target.exports, source.exports);
                }
                recordMergedSymbol(target, source);
            }
            else {
                var message = target.flags & ts.SymbolFlags.BlockScopedVariable || source.flags & ts.SymbolFlags.BlockScopedVariable ? ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0 : ts.Diagnostics.Duplicate_identifier_0;
                ts.forEach(source.declarations, function (node) {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
                ts.forEach(target.declarations, function (node) {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
            }
        }
        function cloneSymbolTable(symbolTable) {
            var result = {};
            for (var id in symbolTable) {
                if (ts.hasProperty(symbolTable, id)) {
                    result[id] = symbolTable[id];
                }
            }
            return result;
        }
        function extendSymbolTable(target, source) {
            for (var id in source) {
                if (ts.hasProperty(source, id)) {
                    if (!ts.hasProperty(target, id)) {
                        target[id] = source[id];
                    }
                    else {
                        var symbol = target[id];
                        if (!(symbol.flags & ts.SymbolFlags.Merged)) {
                            target[id] = symbol = cloneSymbol(symbol);
                        }
                        extendSymbol(symbol, source[id]);
                    }
                }
            }
        }
        function getSymbolLinks(symbol) {
            if (symbol.flags & ts.SymbolFlags.Transient)
                return symbol;
            if (!symbol.id)
                symbol.id = nextSymbolId++;
            return symbolLinks[symbol.id] || (symbolLinks[symbol.id] = {});
        }
        function getNodeLinks(node) {
            if (!node.id)
                node.id = nextNodeId++;
            return nodeLinks[node.id] || (nodeLinks[node.id] = {});
        }
        function getSourceFile(node) {
            return ts.getAncestor(node, ts.SyntaxKind.SourceFile);
        }
        function isGlobalSourceFile(node) {
            return node.kind === ts.SyntaxKind.SourceFile && !ts.isExternalModule(node);
        }
        function getSymbol(symbols, name, meaning) {
            if (meaning && ts.hasProperty(symbols, name)) {
                var symbol = symbols[name];
                ts.Debug.assert((symbol.flags & ts.SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
                if (symbol.flags & meaning) {
                    return symbol;
                }
                if (symbol.flags & ts.SymbolFlags.Import) {
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
        function isDefinedBefore(node1, node2) {
            var file1 = ts.getSourceFileOfNode(node1);
            var file2 = ts.getSourceFileOfNode(node2);
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
        function resolveName(location, name, meaning, nameNotFoundMessage, nameArg) {
            var result;
            var lastLocation;
            var propertyWithInvalidInitializer;
            var errorLocation = location;
            loop: while (location) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = getSymbol(location.locals, name, meaning)) {
                        break loop;
                    }
                }
                switch (location.kind) {
                    case ts.SyntaxKind.SourceFile:
                        if (!ts.isExternalModule(location))
                            break;
                    case ts.SyntaxKind.ModuleDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & ts.SymbolFlags.ModuleMember)) {
                            break loop;
                        }
                        break;
                    case ts.SyntaxKind.EnumDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & ts.SymbolFlags.EnumMember)) {
                            break loop;
                        }
                        break;
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.PropertySignature:
                        // TypeScript 1.0 spec (April 2014): 8.4.1
                        // Initializer expressions for instance member variables are evaluated in the scope 
                        // of the class constructor body but are not permitted to reference parameters or 
                        // local variables of the constructor. This effectively means that entities from outer scopes 
                        // by the same name as a constructor parameter or local variable are inaccessible 
                        // in initializer expressions for instance member variables.
                        if (location.parent.kind === ts.SyntaxKind.ClassDeclaration && !(location.flags & ts.NodeFlags.Static)) {
                            var ctor = findConstructorDeclaration(location.parent);
                            if (ctor && ctor.locals) {
                                if (getSymbol(ctor.locals, name, meaning & ts.SymbolFlags.Value)) {
                                    // Remember the property node, it will be used later to report appropriate error
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break;
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.InterfaceDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).members, name, meaning & ts.SymbolFlags.Type)) {
                            if (lastLocation && lastLocation.flags & ts.NodeFlags.Static) {
                                // TypeScript 1.0 spec (April 2014): 3.4.1
                                // The scope of a type parameter extends over the entire declaration with which the type
                                // parameter list is associated, with the exception of static member declarations in classes.
                                error(errorLocation, ts.Diagnostics.Static_members_cannot_reference_class_type_parameters);
                                return undefined;
                            }
                            break loop;
                        }
                        break;
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.ArrowFunction:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        break;
                    case ts.SyntaxKind.FunctionExpression:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        var id = location.name;
                        if (id && name === id.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                    case ts.SyntaxKind.CatchClause:
                        var id = location.name;
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
                    error(errorLocation, nameNotFoundMessage, typeof nameArg === "string" ? nameArg : ts.declarationNameToString(nameArg));
                }
                return undefined;
            }
            // Perform extra checks only if error reporting was requested
            if (nameNotFoundMessage) {
                if (propertyWithInvalidInitializer) {
                    // We have a match, but the reference occurred within a property initializer and the identifier also binds
                    // to a local variable in the constructor where the code will be emitted.
                    var propertyName = propertyWithInvalidInitializer.name;
                    error(errorLocation, ts.Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor, ts.declarationNameToString(propertyName), typeof nameArg === "string" ? nameArg : ts.declarationNameToString(nameArg));
                    return undefined;
                }
                if (result.flags & ts.SymbolFlags.BlockScopedVariable) {
                    // Block-scoped variables cannot be used before their definition
                    var declaration = ts.forEach(result.declarations, function (d) { return ts.getCombinedNodeFlags(d) & ts.NodeFlags.BlockScoped ? d : undefined; });
                    ts.Debug.assert(declaration !== undefined, "Block-scoped variable declaration is undefined");
                    if (!isDefinedBefore(declaration, errorLocation)) {
                        error(errorLocation, ts.Diagnostics.Block_scoped_variable_0_used_before_its_declaration, ts.declarationNameToString(declaration.name));
                    }
                }
            }
            return result;
        }
        function resolveImport(symbol) {
            ts.Debug.assert((symbol.flags & ts.SymbolFlags.Import) !== 0, "Should only get Imports here.");
            var links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                var node = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.ImportDeclaration);
                // Grammar checking
                if (node.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference) {
                    if (node.moduleReference.expression.kind !== ts.SyntaxKind.StringLiteral) {
                        grammarErrorOnNode(node.moduleReference.expression, ts.Diagnostics.String_literal_expected);
                    }
                }
                var target = node.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference ? resolveExternalModuleName(node, ts.getExternalModuleImportDeclarationExpression(node)) : getSymbolOfPartOfRightHandSideOfImport(node.moduleReference, node);
                if (links.target === resolvingSymbol) {
                    links.target = target || unknownSymbol;
                }
                else {
                    error(node, ts.Diagnostics.Circular_definition_of_import_alias_0, symbolToString(symbol));
                }
            }
            else if (links.target === resolvingSymbol) {
                links.target = unknownSymbol;
            }
            return links.target;
        }
        // This function is only for imports with entity names
        function getSymbolOfPartOfRightHandSideOfImport(entityName, importDeclaration) {
            if (!importDeclaration) {
                importDeclaration = ts.getAncestor(entityName, ts.SyntaxKind.ImportDeclaration);
                ts.Debug.assert(importDeclaration !== undefined);
            }
            // There are three things we might try to look for. In the following examples,
            // the search term is enclosed in |...|:
            //
            //     import a = |b|; // Namespace
            //     import a = |b.c|; // Value, type, namespace
            //     import a = |b.c|.d; // Namespace
            if (entityName.kind === ts.SyntaxKind.Identifier && isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = entityName.parent;
            }
            // Check for case 1 and 3 in the above example
            if (entityName.kind === ts.SyntaxKind.Identifier || entityName.parent.kind === ts.SyntaxKind.QualifiedName) {
                return resolveEntityName(importDeclaration, entityName, ts.SymbolFlags.Namespace);
            }
            else {
                // Case 2 in above example
                // entityName.kind could be a QualifiedName or a Missing identifier
                ts.Debug.assert(entityName.parent.kind === ts.SyntaxKind.ImportDeclaration);
                return resolveEntityName(importDeclaration, entityName, ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace);
            }
        }
        function getFullyQualifiedName(symbol) {
            return symbol.parent ? getFullyQualifiedName(symbol.parent) + "." + symbolToString(symbol) : symbolToString(symbol);
        }
        // Resolves a qualified name and any involved import aliases
        function resolveEntityName(location, name, meaning) {
            if (ts.getFullWidth(name) === 0) {
                return undefined;
            }
            if (name.kind === ts.SyntaxKind.Identifier) {
                var symbol = resolveName(location, name.text, meaning, ts.Diagnostics.Cannot_find_name_0, name);
                if (!symbol) {
                    return;
                }
            }
            else if (name.kind === ts.SyntaxKind.QualifiedName) {
                var namespace = resolveEntityName(location, name.left, ts.SymbolFlags.Namespace);
                if (!namespace || namespace === unknownSymbol || ts.getFullWidth(name.right) === 0)
                    return;
                var symbol = getSymbol(namespace.exports, name.right.text, meaning);
                if (!symbol) {
                    error(location, ts.Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(namespace), ts.declarationNameToString(name.right));
                    return;
                }
            }
            ts.Debug.assert((symbol.flags & ts.SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
            return symbol.flags & meaning ? symbol : resolveImport(symbol);
        }
        function isExternalModuleNameRelative(moduleName) {
            // TypeScript 1.0 spec (April 2014): 11.2.1
            // An external module name is "relative" if the first term is "." or "..".
            return moduleName.substr(0, 2) === "./" || moduleName.substr(0, 3) === "../" || moduleName.substr(0, 2) === ".\\" || moduleName.substr(0, 3) === "..\\";
        }
        function resolveExternalModuleName(location, moduleReferenceExpression) {
            if (moduleReferenceExpression.kind !== ts.SyntaxKind.StringLiteral) {
                return;
            }
            var moduleReferenceLiteral = moduleReferenceExpression;
            var searchPath = ts.getDirectoryPath(getSourceFile(location).filename);
            // Module names are escaped in our symbol table.  However, string literal values aren't.
            // Escape the name in the "require(...)" clause to ensure we find the right symbol.
            var moduleName = ts.escapeIdentifier(moduleReferenceLiteral.text);
            if (!moduleName)
                return;
            var isRelative = isExternalModuleNameRelative(moduleName);
            if (!isRelative) {
                var symbol = getSymbol(globals, '"' + moduleName + '"', ts.SymbolFlags.ValueModule);
                if (symbol) {
                    return getResolvedExportSymbol(symbol);
                }
            }
            while (true) {
                var filename = ts.normalizePath(ts.combinePaths(searchPath, moduleName));
                var sourceFile = host.getSourceFile(filename + ".ts") || host.getSourceFile(filename + ".d.ts");
                if (sourceFile || isRelative)
                    break;
                var parentPath = ts.getDirectoryPath(searchPath);
                if (parentPath === searchPath)
                    break;
                searchPath = parentPath;
            }
            if (sourceFile) {
                if (sourceFile.symbol) {
                    return getResolvedExportSymbol(sourceFile.symbol);
                }
                error(moduleReferenceLiteral, ts.Diagnostics.File_0_is_not_an_external_module, sourceFile.filename);
                return;
            }
            error(moduleReferenceLiteral, ts.Diagnostics.Cannot_find_external_module_0, moduleName);
        }
        function getResolvedExportSymbol(moduleSymbol) {
            var symbol = getExportAssignmentSymbol(moduleSymbol);
            if (symbol) {
                if (symbol.flags & (ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace)) {
                    return symbol;
                }
                if (symbol.flags & ts.SymbolFlags.Import) {
                    return resolveImport(symbol);
                }
            }
            return moduleSymbol;
        }
        function getExportAssignmentSymbol(symbol) {
            checkTypeOfExportAssignmentSymbol(symbol);
            var symbolLinks = getSymbolLinks(symbol);
            return symbolLinks.exportAssignSymbol === unknownSymbol ? undefined : symbolLinks.exportAssignSymbol;
        }
        function checkTypeOfExportAssignmentSymbol(containerSymbol) {
            var symbolLinks = getSymbolLinks(containerSymbol);
            if (!symbolLinks.exportAssignSymbol) {
                var exportInformation = collectExportInformationForSourceFileOrModule(containerSymbol);
                if (exportInformation.exportAssignments.length) {
                    if (exportInformation.exportAssignments.length > 1) {
                        // TypeScript 1.0 spec (April 2014): 11.2.4
                        // It is an error for an external module to contain more than one export assignment.
                        ts.forEach(exportInformation.exportAssignments, function (node) { return error(node, ts.Diagnostics.A_module_cannot_have_more_than_one_export_assignment); });
                    }
                    var node = exportInformation.exportAssignments[0];
                    if (exportInformation.hasExportedMember) {
                        // TypeScript 1.0 spec (April 2014): 11.2.3
                        // If an external module contains an export assignment it is an error 
                        // for the external module to also contain export declarations.
                        // The two types of exports are mutually exclusive.
                        error(node, ts.Diagnostics.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements);
                    }
                    if (node.exportName.text) {
                        var meaning = ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace;
                        var exportSymbol = resolveName(node, node.exportName.text, meaning, ts.Diagnostics.Cannot_find_name_0, node.exportName);
                    }
                }
                symbolLinks.exportAssignSymbol = exportSymbol || unknownSymbol;
            }
        }
        function collectExportInformationForSourceFileOrModule(symbol) {
            var seenExportedMember = false;
            var result = [];
            ts.forEach(symbol.declarations, function (declaration) {
                var block = (declaration.kind === ts.SyntaxKind.SourceFile ? declaration : declaration.body);
                ts.forEach(block.statements, function (node) {
                    if (node.kind === ts.SyntaxKind.ExportAssignment) {
                        result.push(node);
                    }
                    else {
                        seenExportedMember = seenExportedMember || (node.flags & ts.NodeFlags.Export) !== 0;
                    }
                });
            });
            return {
                hasExportedMember: seenExportedMember,
                exportAssignments: result
            };
        }
        function getMergedSymbol(symbol) {
            var merged;
            return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
        }
        function getSymbolOfNode(node) {
            return getMergedSymbol(node.symbol);
        }
        function getParentOfSymbol(symbol) {
            return getMergedSymbol(symbol.parent);
        }
        function getExportSymbolOfValueSymbolIfExported(symbol) {
            return symbol && (symbol.flags & ts.SymbolFlags.ExportValue) !== 0 ? getMergedSymbol(symbol.exportSymbol) : symbol;
        }
        function symbolIsValue(symbol) {
            // If it is an instantiated symbol, then it is a value if the symbol it is an
            // instantiation of is a value.
            if (symbol.flags & ts.SymbolFlags.Instantiated) {
                return symbolIsValue(getSymbolLinks(symbol).target);
            }
            // If the symbol has the value flag, it is trivially a value.
            if (symbol.flags & ts.SymbolFlags.Value) {
                return true;
            }
            // If it is an import, then it is a value if the symbol it resolves to is a value.
            if (symbol.flags & ts.SymbolFlags.Import) {
                return (resolveImport(symbol).flags & ts.SymbolFlags.Value) !== 0;
            }
            return false;
        }
        function findConstructorDeclaration(node) {
            var members = node.members;
            for (var i = 0; i < members.length; i++) {
                var member = members[i];
                if (member.kind === ts.SyntaxKind.Constructor && ts.nodeIsPresent(member.body)) {
                    return member;
                }
            }
        }
        function createType(flags) {
            var result = new Type(checker, flags);
            result.id = typeCount++;
            return result;
        }
        function createIntrinsicType(kind, intrinsicName) {
            var type = createType(kind);
            type.intrinsicName = intrinsicName;
            return type;
        }
        function createObjectType(kind, symbol) {
            var type = createType(kind);
            type.symbol = symbol;
            return type;
        }
        // A reserved member name starts with two underscores followed by a non-underscore
        function isReservedMemberName(name) {
            return name.charCodeAt(0) === ts.CharacterCodes._ && name.charCodeAt(1) === ts.CharacterCodes._ && name.charCodeAt(2) !== ts.CharacterCodes._;
        }
        function getNamedMembers(members) {
            var result;
            for (var id in members) {
                if (ts.hasProperty(members, id)) {
                    if (!isReservedMemberName(id)) {
                        if (!result)
                            result = [];
                        var symbol = members[id];
                        if (symbolIsValue(symbol)) {
                            result.push(symbol);
                        }
                    }
                }
            }
            return result || emptyArray;
        }
        function setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType) {
            type.members = members;
            type.properties = getNamedMembers(members);
            type.callSignatures = callSignatures;
            type.constructSignatures = constructSignatures;
            if (stringIndexType)
                type.stringIndexType = stringIndexType;
            if (numberIndexType)
                type.numberIndexType = numberIndexType;
            return type;
        }
        function createAnonymousType(symbol, members, callSignatures, constructSignatures, stringIndexType, numberIndexType) {
            return setObjectTypeMembers(createObjectType(ts.TypeFlags.Anonymous, symbol), members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function forEachSymbolTableInScope(enclosingDeclaration, callback) {
            var result;
            for (var location = enclosingDeclaration; location; location = location.parent) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = callback(location.locals)) {
                        return result;
                    }
                }
                switch (location.kind) {
                    case ts.SyntaxKind.SourceFile:
                        if (!ts.isExternalModule(location)) {
                            break;
                        }
                    case ts.SyntaxKind.ModuleDeclaration:
                        if (result = callback(getSymbolOfNode(location).exports)) {
                            return result;
                        }
                        break;
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.InterfaceDeclaration:
                        if (result = callback(getSymbolOfNode(location).members)) {
                            return result;
                        }
                        break;
                }
            }
            return callback(globals);
        }
        function getQualifiedLeftMeaning(rightMeaning) {
            // If we are looking in value space, the parent meaning is value, other wise it is namespace
            return rightMeaning === ts.SymbolFlags.Value ? ts.SymbolFlags.Value : ts.SymbolFlags.Namespace;
        }
        function getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, useOnlyExternalAliasing) {
            function getAccessibleSymbolChainFromSymbolTable(symbols) {
                function canQualifySymbol(symbolFromSymbolTable, meaning) {
                    // If the symbol is equivalent and doesn't need further qualification, this symbol is accessible
                    if (!needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning)) {
                        return true;
                    }
                    // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                    var accessibleParent = getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning), useOnlyExternalAliasing);
                    return !!accessibleParent;
                }
                function isAccessible(symbolFromSymbolTable, resolvedAliasSymbol) {
                    if (symbol === (resolvedAliasSymbol || symbolFromSymbolTable)) {
                        // if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
                        // and if symbolfrom symbolTable or alias resolution matches the symbol, 
                        // check the symbol can be qualified, it is only then this symbol is accessible
                        return !ts.forEach(symbolFromSymbolTable.declarations, hasExternalModuleSymbol) && canQualifySymbol(symbolFromSymbolTable, meaning);
                    }
                }
                // If symbol is directly available by its name in the symbol table
                if (isAccessible(ts.lookUp(symbols, symbol.name))) {
                    return [symbol];
                }
                // Check if symbol is any of the alias
                return ts.forEachValue(symbols, function (symbolFromSymbolTable) {
                    if (symbolFromSymbolTable.flags & ts.SymbolFlags.Import) {
                        if (!useOnlyExternalAliasing || ts.forEach(symbolFromSymbolTable.declarations, ts.isExternalModuleImportDeclaration)) {
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
        function needsQualification(symbol, enclosingDeclaration, meaning) {
            var qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, function (symbolTable) {
                // If symbol of this name is not available in the symbol table we are ok
                if (!ts.hasProperty(symbolTable, symbol.name)) {
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
                symbolFromSymbolTable = (symbolFromSymbolTable.flags & ts.SymbolFlags.Import) ? resolveImport(symbolFromSymbolTable) : symbolFromSymbolTable;
                if (symbolFromSymbolTable.flags & meaning) {
                    qualify = true;
                    return true;
                }
                // Continue to the next symbol table
                return false;
            });
            return qualify;
        }
        function isSymbolAccessible(symbol, enclosingDeclaration, meaning) {
            if (symbol && enclosingDeclaration && !(symbol.flags & ts.SymbolFlags.TypeParameter)) {
                var initialSymbol = symbol;
                var meaningToLook = meaning;
                while (symbol) {
                    // Symbol is accessible if it by itself is accessible
                    var accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaningToLook, false);
                    if (accessibleSymbolChain) {
                        var hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0]);
                        if (!hasAccessibleDeclarations) {
                            return {
                                accessibility: ts.SymbolAccessibility.NotAccessible,
                                errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                                errorModuleName: symbol !== initialSymbol ? symbolToString(symbol, enclosingDeclaration, ts.SymbolFlags.Namespace) : undefined,
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
                var symbolExternalModule = ts.forEach(initialSymbol.declarations, getExternalModuleContainer);
                if (symbolExternalModule) {
                    var enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
                    if (symbolExternalModule !== enclosingExternalModule) {
                        // name from different external module that is not visible
                        return {
                            accessibility: ts.SymbolAccessibility.CannotBeNamed,
                            errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                            errorModuleName: symbolToString(symbolExternalModule)
                        };
                    }
                }
                // Just a local name that is not accessible
                return {
                    accessibility: ts.SymbolAccessibility.NotAccessible,
                    errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                };
            }
            return { accessibility: ts.SymbolAccessibility.Accessible };
            function getExternalModuleContainer(declaration) {
                for (; declaration; declaration = declaration.parent) {
                    if (hasExternalModuleSymbol(declaration)) {
                        return getSymbolOfNode(declaration);
                    }
                }
            }
        }
        function hasExternalModuleSymbol(declaration) {
            return (declaration.kind === ts.SyntaxKind.ModuleDeclaration && declaration.name.kind === ts.SyntaxKind.StringLiteral) || (declaration.kind === ts.SyntaxKind.SourceFile && ts.isExternalModule(declaration));
        }
        function hasVisibleDeclarations(symbol) {
            var aliasesToMakeVisible;
            if (ts.forEach(symbol.declarations, function (declaration) { return !getIsDeclarationVisible(declaration); })) {
                return undefined;
            }
            return { accessibility: ts.SymbolAccessibility.Accessible, aliasesToMakeVisible };
            function getIsDeclarationVisible(declaration) {
                if (!isDeclarationVisible(declaration)) {
                    // Mark the unexported alias as visible if its parent is visible 
                    // because these kind of aliases can be used to name types in declaration file
                    if (declaration.kind === ts.SyntaxKind.ImportDeclaration && !(declaration.flags & ts.NodeFlags.Export) && isDeclarationVisible(declaration.parent)) {
                        getNodeLinks(declaration).isVisible = true;
                        if (aliasesToMakeVisible) {
                            if (!ts.contains(aliasesToMakeVisible, declaration)) {
                                aliasesToMakeVisible.push(declaration);
                            }
                        }
                        else {
                            aliasesToMakeVisible = [declaration];
                        }
                        return true;
                    }
                    // Declaration is not visible
                    return false;
                }
                return true;
            }
        }
        function isEntityNameVisible(entityName, enclosingDeclaration) {
            // get symbol of the first identifier of the entityName
            var meaning;
            if (entityName.parent.kind === ts.SyntaxKind.TypeQuery) {
                // Typeof value
                meaning = ts.SymbolFlags.Value | ts.SymbolFlags.ExportValue;
            }
            else if (entityName.kind === ts.SyntaxKind.QualifiedName || entityName.parent.kind === ts.SyntaxKind.ImportDeclaration) {
                // Left identifier from type reference or TypeAlias
                // Entity name of the import declaration 
                meaning = ts.SymbolFlags.Namespace;
            }
            else {
                // Type Reference or TypeAlias entity = Identifier
                meaning = ts.SymbolFlags.Type;
            }
            var firstIdentifier = getFirstIdentifier(entityName);
            var symbol = resolveName(enclosingDeclaration, firstIdentifier.text, meaning, undefined, undefined);
            // Verify if the symbol is accessible
            return (symbol && hasVisibleDeclarations(symbol)) || {
                accessibility: ts.SymbolAccessibility.NotAccessible,
                errorSymbolName: ts.getTextOfNode(firstIdentifier),
                errorNode: firstIdentifier
            };
        }
        function writeKeyword(writer, kind) {
            writer.writeKeyword(ts.tokenToString(kind));
        }
        function writePunctuation(writer, kind) {
            writer.writePunctuation(ts.tokenToString(kind));
        }
        function writeSpace(writer) {
            writer.writeSpace(" ");
        }
        function symbolToString(symbol, enclosingDeclaration, meaning) {
            var writer = ts.getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning);
            var result = writer.string();
            ts.releaseStringWriter(writer);
            return result;
        }
        function typeToString(type, enclosingDeclaration, flags) {
            var writer = ts.getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
            var result = writer.string();
            ts.releaseStringWriter(writer);
            var maxLength = compilerOptions.noErrorTruncation || flags & ts.TypeFormatFlags.NoTruncation ? undefined : 100;
            if (maxLength && result.length >= maxLength) {
                result = result.substr(0, maxLength - "...".length) + "...";
            }
            return result;
        }
        function getTypeAliasForTypeLiteral(type) {
            if (type.symbol && type.symbol.flags & ts.SymbolFlags.TypeLiteral) {
                var node = type.symbol.declarations[0].parent;
                while (node.kind === ts.SyntaxKind.ParenthesizedType) {
                    node = node.parent;
                }
                if (node.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }
        // This is for caching the result of getSymbolDisplayBuilder. Do not access directly.
        var _displayBuilder;
        function getSymbolDisplayBuilder() {
            /**
             * Writes only the name of the symbol out to the writer. Uses the original source text
             * for the name of the symbol if it is available to match how the user inputted the name.
             */
            function appendSymbolNameOnly(symbol, writer) {
                if (symbol.declarations && symbol.declarations.length > 0) {
                    var declaration = symbol.declarations[0];
                    if (declaration.name) {
                        writer.writeSymbol(ts.declarationNameToString(declaration.name), symbol);
                        return;
                    }
                }
                writer.writeSymbol(symbol.name, symbol);
            }
            /**
             * Enclosing declaration is optional when we don't want to get qualified name in the enclosing declaration scope
             * Meaning needs to be specified if the enclosing declaration is given
             */
            function buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning, flags) {
                var parentSymbol;
                function appendParentTypeArgumentsAndSymbolName(symbol) {
                    if (parentSymbol) {
                        // Write type arguments of instantiated class/interface here
                        if (flags & ts.SymbolFormatFlags.WriteTypeParametersOrArguments) {
                            if (symbol.flags & ts.SymbolFlags.Instantiated) {
                                buildDisplayForTypeArgumentsAndDelimiters(getTypeParametersOfClassOrInterface(parentSymbol), symbol.mapper, writer, enclosingDeclaration);
                            }
                            else {
                                buildTypeParameterDisplayFromSymbol(parentSymbol, writer, enclosingDeclaration);
                            }
                        }
                        writePunctuation(writer, ts.SyntaxKind.DotToken);
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
                function walkSymbol(symbol, meaning) {
                    if (symbol) {
                        var accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, !!(flags & ts.SymbolFormatFlags.UseOnlyExternalAliasing));
                        if (!accessibleSymbolChain || needsQualification(accessibleSymbolChain[0], enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {
                            // Go up and add our parent.
                            walkSymbol(getParentOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol), getQualifiedLeftMeaning(meaning));
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
                            if (symbol.flags & ts.SymbolFlags.TypeLiteral || symbol.flags & ts.SymbolFlags.ObjectLiteral) {
                                return;
                            }
                            appendParentTypeArgumentsAndSymbolName(symbol);
                        }
                    }
                }
                // Get qualified name 
                if (enclosingDeclaration && !(symbol.flags & ts.SymbolFlags.TypeParameter)) {
                    walkSymbol(symbol, meaning);
                    return;
                }
                return appendParentTypeArgumentsAndSymbolName(symbol);
            }
            function buildTypeDisplay(type, writer, enclosingDeclaration, globalFlags, typeStack) {
                var globalFlagsToPass = globalFlags & ts.TypeFormatFlags.WriteOwnNameForAnyLike;
                return writeType(type, globalFlags);
                function writeType(type, flags) {
                    // Write undefined/null type as any
                    if (type.flags & ts.TypeFlags.Intrinsic) {
                        // Special handling for unknown / resolving types, they should show up as any and not unknown or __resolving
                        writer.writeKeyword(!(globalFlags & ts.TypeFormatFlags.WriteOwnNameForAnyLike) && (type.flags & ts.TypeFlags.Any) ? "any" : type.intrinsicName);
                    }
                    else if (type.flags & ts.TypeFlags.Reference) {
                        writeTypeReference(type, flags);
                    }
                    else if (type.flags & (ts.TypeFlags.Class | ts.TypeFlags.Interface | ts.TypeFlags.Enum | ts.TypeFlags.TypeParameter)) {
                        buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, ts.SymbolFlags.Type);
                    }
                    else if (type.flags & ts.TypeFlags.Tuple) {
                        writeTupleType(type);
                    }
                    else if (type.flags & ts.TypeFlags.Union) {
                        writeUnionType(type, flags);
                    }
                    else if (type.flags & ts.TypeFlags.Anonymous) {
                        writeAnonymousType(type, flags);
                    }
                    else if (type.flags & ts.TypeFlags.StringLiteral) {
                        writer.writeStringLiteral(type.text);
                    }
                    else {
                        // Should never get here
                        // { ... }
                        writePunctuation(writer, ts.SyntaxKind.OpenBraceToken);
                        writeSpace(writer);
                        writePunctuation(writer, ts.SyntaxKind.DotDotDotToken);
                        writeSpace(writer);
                        writePunctuation(writer, ts.SyntaxKind.CloseBraceToken);
                    }
                }
                function writeTypeList(types, union) {
                    for (var i = 0; i < types.length; i++) {
                        if (i > 0) {
                            if (union) {
                                writeSpace(writer);
                            }
                            writePunctuation(writer, union ? ts.SyntaxKind.BarToken : ts.SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        writeType(types[i], union ? ts.TypeFormatFlags.InElementType : ts.TypeFormatFlags.None);
                    }
                }
                function writeTypeReference(type, flags) {
                    if (type.target === globalArrayType && !(flags & ts.TypeFormatFlags.WriteArrayAsGenericType)) {
                        writeType(type.typeArguments[0], ts.TypeFormatFlags.InElementType);
                        writePunctuation(writer, ts.SyntaxKind.OpenBracketToken);
                        writePunctuation(writer, ts.SyntaxKind.CloseBracketToken);
                    }
                    else {
                        buildSymbolDisplay(type.target.symbol, writer, enclosingDeclaration, ts.SymbolFlags.Type);
                        writePunctuation(writer, ts.SyntaxKind.LessThanToken);
                        writeTypeList(type.typeArguments, false);
                        writePunctuation(writer, ts.SyntaxKind.GreaterThanToken);
                    }
                }
                function writeTupleType(type) {
                    writePunctuation(writer, ts.SyntaxKind.OpenBracketToken);
                    writeTypeList(type.elementTypes, false);
                    writePunctuation(writer, ts.SyntaxKind.CloseBracketToken);
                }
                function writeUnionType(type, flags) {
                    if (flags & ts.TypeFormatFlags.InElementType) {
                        writePunctuation(writer, ts.SyntaxKind.OpenParenToken);
                    }
                    writeTypeList(type.types, true);
                    if (flags & ts.TypeFormatFlags.InElementType) {
                        writePunctuation(writer, ts.SyntaxKind.CloseParenToken);
                    }
                }
                function writeAnonymousType(type, flags) {
                    // Always use 'typeof T' for type of class, enum, and module objects
                    if (type.symbol && type.symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Enum | ts.SymbolFlags.ValueModule)) {
                        writeTypeofSymbol(type);
                    }
                    else if (shouldWriteTypeOfFunctionSymbol()) {
                        writeTypeofSymbol(type);
                    }
                    else if (typeStack && ts.contains(typeStack, type)) {
                        // If type is an anonymous type literal in a type alias declaration, use type alias name
                        var typeAlias = getTypeAliasForTypeLiteral(type);
                        if (typeAlias) {
                            buildSymbolDisplay(typeAlias, writer, enclosingDeclaration, ts.SymbolFlags.Type);
                        }
                        else {
                            // Recursive usage, use any
                            writeKeyword(writer, ts.SyntaxKind.AnyKeyword);
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
                            var isStaticMethodSymbol = !!(type.symbol.flags & ts.SymbolFlags.Method && ts.forEach(type.symbol.declarations, function (declaration) { return declaration.flags & ts.NodeFlags.Static; }));
                            var isNonLocalFunctionSymbol = !!(type.symbol.flags & ts.SymbolFlags.Function) && (type.symbol.parent || ts.forEach(type.symbol.declarations, function (declaration) { return declaration.parent.kind === ts.SyntaxKind.SourceFile || declaration.parent.kind === ts.SyntaxKind.ModuleBlock; }));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                // typeof is allowed only for static/non local functions
                                return !!(flags & ts.TypeFormatFlags.UseTypeOfFunction) || (typeStack && ts.contains(typeStack, type)); // it is type of the symbol uses itself recursively
                            }
                        }
                    }
                }
                function writeTypeofSymbol(type) {
                    writeKeyword(writer, ts.SyntaxKind.TypeOfKeyword);
                    writeSpace(writer);
                    buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, ts.SymbolFlags.Value);
                }
                function getIndexerParameterName(type, indexKind, fallbackName) {
                    var declaration = getIndexDeclarationOfSymbol(type.symbol, indexKind);
                    if (!declaration) {
                        // declaration might not be found if indexer was added from the contextual type.
                        // in this case use fallback name
                        return fallbackName;
                    }
                    ts.Debug.assert(declaration.parameters.length !== 0);
                    return ts.declarationNameToString(declaration.parameters[0].name);
                }
                function writeLiteralType(type, flags) {
                    var resolved = resolveObjectOrUnionTypeMembers(type);
                    if (!resolved.properties.length && !resolved.stringIndexType && !resolved.numberIndexType) {
                        if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                            writePunctuation(writer, ts.SyntaxKind.OpenBraceToken);
                            writePunctuation(writer, ts.SyntaxKind.CloseBraceToken);
                            return;
                        }
                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            if (flags & ts.TypeFormatFlags.InElementType) {
                                writePunctuation(writer, ts.SyntaxKind.OpenParenToken);
                            }
                            buildSignatureDisplay(resolved.callSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | ts.TypeFormatFlags.WriteArrowStyleSignature, typeStack);
                            if (flags & ts.TypeFormatFlags.InElementType) {
                                writePunctuation(writer, ts.SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            if (flags & ts.TypeFormatFlags.InElementType) {
                                writePunctuation(writer, ts.SyntaxKind.OpenParenToken);
                            }
                            writeKeyword(writer, ts.SyntaxKind.NewKeyword);
                            writeSpace(writer);
                            buildSignatureDisplay(resolved.constructSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | ts.TypeFormatFlags.WriteArrowStyleSignature, typeStack);
                            if (flags & ts.TypeFormatFlags.InElementType) {
                                writePunctuation(writer, ts.SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                    }
                    writePunctuation(writer, ts.SyntaxKind.OpenBraceToken);
                    writer.writeLine();
                    writer.increaseIndent();
                    for (var i = 0; i < resolved.callSignatures.length; i++) {
                        buildSignatureDisplay(resolved.callSignatures[i], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, ts.SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    for (var i = 0; i < resolved.constructSignatures.length; i++) {
                        writeKeyword(writer, ts.SyntaxKind.NewKeyword);
                        writeSpace(writer);
                        buildSignatureDisplay(resolved.constructSignatures[i], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, ts.SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    if (resolved.stringIndexType) {
                        // [x: string]: 
                        writePunctuation(writer, ts.SyntaxKind.OpenBracketToken);
                        writer.writeParameter(getIndexerParameterName(resolved, ts.IndexKind.String, "x"));
                        writePunctuation(writer, ts.SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeKeyword(writer, ts.SyntaxKind.StringKeyword);
                        writePunctuation(writer, ts.SyntaxKind.CloseBracketToken);
                        writePunctuation(writer, ts.SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeType(resolved.stringIndexType, ts.TypeFormatFlags.None);
                        writePunctuation(writer, ts.SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    if (resolved.numberIndexType) {
                        // [x: number]: 
                        writePunctuation(writer, ts.SyntaxKind.OpenBracketToken);
                        writer.writeParameter(getIndexerParameterName(resolved, ts.IndexKind.Number, "x"));
                        writePunctuation(writer, ts.SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeKeyword(writer, ts.SyntaxKind.NumberKeyword);
                        writePunctuation(writer, ts.SyntaxKind.CloseBracketToken);
                        writePunctuation(writer, ts.SyntaxKind.ColonToken);
                        writeSpace(writer);
                        writeType(resolved.numberIndexType, ts.TypeFormatFlags.None);
                        writePunctuation(writer, ts.SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    for (var i = 0; i < resolved.properties.length; i++) {
                        var p = resolved.properties[i];
                        var t = getTypeOfSymbol(p);
                        if (p.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Method) && !getPropertiesOfObjectType(t).length) {
                            var signatures = getSignaturesOfType(t, ts.SignatureKind.Call);
                            for (var j = 0; j < signatures.length; j++) {
                                buildSymbolDisplay(p, writer);
                                if (p.flags & ts.SymbolFlags.Optional) {
                                    writePunctuation(writer, ts.SyntaxKind.QuestionToken);
                                }
                                buildSignatureDisplay(signatures[j], writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                                writePunctuation(writer, ts.SyntaxKind.SemicolonToken);
                                writer.writeLine();
                            }
                        }
                        else {
                            buildSymbolDisplay(p, writer);
                            if (p.flags & ts.SymbolFlags.Optional) {
                                writePunctuation(writer, ts.SyntaxKind.QuestionToken);
                            }
                            writePunctuation(writer, ts.SyntaxKind.ColonToken);
                            writeSpace(writer);
                            writeType(t, ts.TypeFormatFlags.None);
                            writePunctuation(writer, ts.SyntaxKind.SemicolonToken);
                            writer.writeLine();
                        }
                    }
                    writer.decreaseIndent();
                    writePunctuation(writer, ts.SyntaxKind.CloseBraceToken);
                }
            }
            function buildTypeParameterDisplayFromSymbol(symbol, writer, enclosingDeclaraiton, flags) {
                var targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & ts.SymbolFlags.Class || targetSymbol.flags & ts.SymbolFlags.Interface) {
                    buildDisplayForTypeParametersAndDelimiters(getTypeParametersOfClassOrInterface(symbol), writer, enclosingDeclaraiton, flags);
                }
            }
            function buildTypeParameterDisplay(tp, writer, enclosingDeclaration, flags, typeStack) {
                appendSymbolNameOnly(tp.symbol, writer);
                var constraint = getConstraintOfTypeParameter(tp);
                if (constraint) {
                    writeSpace(writer);
                    writeKeyword(writer, ts.SyntaxKind.ExtendsKeyword);
                    writeSpace(writer);
                    buildTypeDisplay(constraint, writer, enclosingDeclaration, flags, typeStack);
                }
            }
            function buildParameterDisplay(p, writer, enclosingDeclaration, flags, typeStack) {
                if (ts.hasDotDotDotToken(p.valueDeclaration)) {
                    writePunctuation(writer, ts.SyntaxKind.DotDotDotToken);
                }
                appendSymbolNameOnly(p, writer);
                if (ts.hasQuestionToken(p.valueDeclaration) || p.valueDeclaration.initializer) {
                    writePunctuation(writer, ts.SyntaxKind.QuestionToken);
                }
                writePunctuation(writer, ts.SyntaxKind.ColonToken);
                writeSpace(writer);
                buildTypeDisplay(getTypeOfSymbol(p), writer, enclosingDeclaration, flags, typeStack);
            }
            function buildDisplayForTypeParametersAndDelimiters(typeParameters, writer, enclosingDeclaration, flags, typeStack) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, ts.SyntaxKind.LessThanToken);
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, ts.SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        buildTypeParameterDisplay(typeParameters[i], writer, enclosingDeclaration, flags, typeStack);
                    }
                    writePunctuation(writer, ts.SyntaxKind.GreaterThanToken);
                }
            }
            function buildDisplayForTypeArgumentsAndDelimiters(typeParameters, mapper, writer, enclosingDeclaration, flags, typeStack) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, ts.SyntaxKind.LessThanToken);
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, ts.SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        buildTypeDisplay(mapper(typeParameters[i]), writer, enclosingDeclaration, ts.TypeFormatFlags.None);
                    }
                    writePunctuation(writer, ts.SyntaxKind.GreaterThanToken);
                }
            }
            function buildDisplayForParametersAndDelimiters(parameters, writer, enclosingDeclaration, flags, typeStack) {
                writePunctuation(writer, ts.SyntaxKind.OpenParenToken);
                for (var i = 0; i < parameters.length; i++) {
                    if (i > 0) {
                        writePunctuation(writer, ts.SyntaxKind.CommaToken);
                        writeSpace(writer);
                    }
                    buildParameterDisplay(parameters[i], writer, enclosingDeclaration, flags, typeStack);
                }
                writePunctuation(writer, ts.SyntaxKind.CloseParenToken);
            }
            function buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, typeStack) {
                if (flags & ts.TypeFormatFlags.WriteArrowStyleSignature) {
                    writeSpace(writer);
                    writePunctuation(writer, ts.SyntaxKind.EqualsGreaterThanToken);
                }
                else {
                    writePunctuation(writer, ts.SyntaxKind.ColonToken);
                }
                writeSpace(writer);
                buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags, typeStack);
            }
            function buildSignatureDisplay(signature, writer, enclosingDeclaration, flags, typeStack) {
                if (signature.target && (flags & ts.TypeFormatFlags.WriteTypeArgumentsOfSignature)) {
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
        function isDeclarationVisible(node) {
            function getContainingExternalModule(node) {
                for (; node; node = node.parent) {
                    if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
                        if (node.name.kind === ts.SyntaxKind.StringLiteral) {
                            return node;
                        }
                    }
                    else if (node.kind === ts.SyntaxKind.SourceFile) {
                        return ts.isExternalModule(node) ? node : undefined;
                    }
                }
                ts.Debug.fail("getContainingModule cant reach here");
            }
            function isUsedInExportAssignment(node) {
                // Get source File and see if it is external module and has export assigned symbol
                var externalModule = getContainingExternalModule(node);
                if (externalModule) {
                    // This is export assigned symbol node
                    var externalModuleSymbol = getSymbolOfNode(externalModule);
                    var exportAssignmentSymbol = getExportAssignmentSymbol(externalModuleSymbol);
                    var resolvedExportSymbol;
                    var symbolOfNode = getSymbolOfNode(node);
                    if (isSymbolUsedInExportAssignment(symbolOfNode)) {
                        return true;
                    }
                    // if symbolOfNode is import declaration, resolve the symbol declaration and check
                    if (symbolOfNode.flags & ts.SymbolFlags.Import) {
                        return isSymbolUsedInExportAssignment(resolveImport(symbolOfNode));
                    }
                }
                // Check if the symbol is used in export assignment
                function isSymbolUsedInExportAssignment(symbol) {
                    if (exportAssignmentSymbol === symbol) {
                        return true;
                    }
                    if (exportAssignmentSymbol && !!(exportAssignmentSymbol.flags & ts.SymbolFlags.Import)) {
                        // if export assigned symbol is import declaration, resolve the import
                        resolvedExportSymbol = resolvedExportSymbol || resolveImport(exportAssignmentSymbol);
                        if (resolvedExportSymbol === symbol) {
                            return true;
                        }
                        // Container of resolvedExportSymbol is visible
                        return ts.forEach(resolvedExportSymbol.declarations, function (current) {
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
                    case ts.SyntaxKind.VariableDeclaration:
                    case ts.SyntaxKind.BindingElement:
                    case ts.SyntaxKind.ModuleDeclaration:
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.InterfaceDeclaration:
                    case ts.SyntaxKind.TypeAliasDeclaration:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.EnumDeclaration:
                    case ts.SyntaxKind.ImportDeclaration:
                        var parent = getDeclarationContainer(node);
                        // If the node is not exported or it is not ambient module element (except import declaration)
                        if (!(ts.getCombinedNodeFlags(node) & ts.NodeFlags.Export) && !(node.kind !== ts.SyntaxKind.ImportDeclaration && parent.kind !== ts.SyntaxKind.SourceFile && ts.isInAmbientContext(parent))) {
                            return isGlobalSourceFile(parent) || isUsedInExportAssignment(node);
                        }
                        // Exported members/ambient module elements (exception import declaration) are visible if parent is visible
                        return isDeclarationVisible(parent);
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.PropertySignature:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                        if (node.flags & (ts.NodeFlags.Private | ts.NodeFlags.Protected)) {
                            // Private/protected properties/methods are not visible
                            return false;
                        }
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.ConstructSignature:
                    case ts.SyntaxKind.CallSignature:
                    case ts.SyntaxKind.IndexSignature:
                    case ts.SyntaxKind.Parameter:
                    case ts.SyntaxKind.ModuleBlock:
                    case ts.SyntaxKind.FunctionType:
                    case ts.SyntaxKind.ConstructorType:
                    case ts.SyntaxKind.TypeLiteral:
                    case ts.SyntaxKind.TypeReference:
                    case ts.SyntaxKind.ArrayType:
                    case ts.SyntaxKind.TupleType:
                    case ts.SyntaxKind.UnionType:
                    case ts.SyntaxKind.ParenthesizedType:
                        return isDeclarationVisible(node.parent);
                    case ts.SyntaxKind.TypeParameter:
                    case ts.SyntaxKind.SourceFile:
                        return true;
                    default:
                        ts.Debug.fail("isDeclarationVisible unknown: SyntaxKind: " + node.kind);
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
        function getRootDeclaration(node) {
            while (node.kind === ts.SyntaxKind.BindingElement) {
                node = node.parent.parent;
            }
            return node;
        }
        function getDeclarationContainer(node) {
            node = getRootDeclaration(node);
            // Parent chain: 
            // VaribleDeclaration -> VariableDeclarationList -> VariableStatement -> 'Declaration Container'
            return node.kind === ts.SyntaxKind.VariableDeclaration ? node.parent.parent.parent : node.parent;
        }
        function getTypeOfPrototypeProperty(prototype) {
            // TypeScript 1.0 spec (April 2014): 8.4
            // Every class automatically contains a static property member named 'prototype', 
            // the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
            // It is an error to explicitly declare a static property member with the name 'prototype'.
            var classType = getDeclaredTypeOfSymbol(prototype.parent);
            return classType.typeParameters ? createTypeReference(classType, ts.map(classType.typeParameters, function (_) { return anyType; })) : classType;
        }
        // Return the type of the given property in the given type, or undefined if no such property exists
        function getTypeOfPropertyOfType(type, name) {
            var prop = getPropertyOfType(type, name);
            return prop ? getTypeOfSymbol(prop) : undefined;
        }
        // Return the inferred type for a binding element
        function getTypeForBindingElement(declaration) {
            var pattern = declaration.parent;
            var parentType = getTypeForVariableLikeDeclaration(pattern.parent);
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
            if (pattern.kind === ts.SyntaxKind.ObjectBindingPattern) {
                // Use explicitly specified property name ({ p: xxx } form), or otherwise the implied name ({ p } form)
                var name = declaration.propertyName || declaration.name;
                // Use type of the specified property, or otherwise, for a numeric name, the type of the numeric index signature,
                // or otherwise the type of the string index signature.
                var type = getTypeOfPropertyOfType(parentType, name.text) || isNumericName(name.text) && getIndexTypeOfType(parentType, ts.IndexKind.Number) || getIndexTypeOfType(parentType, ts.IndexKind.String);
                if (!type) {
                    error(name, ts.Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(parentType), ts.declarationNameToString(name));
                    return unknownType;
                }
            }
            else {
                // For an array binding element the specified or inferred type of the parent must be assignable to any[]
                if (!isTypeAssignableTo(parentType, anyArrayType)) {
                    error(pattern, ts.Diagnostics.Type_0_is_not_an_array_type, typeToString(parentType));
                    return unknownType;
                }
                if (!declaration.dotDotDotToken) {
                    // Use specific property type when parent is a tuple or numeric index type when parent is an array
                    var propName = "" + ts.indexOf(pattern.elements, declaration);
                    var type = isTupleLikeType(parentType) ? getTypeOfPropertyOfType(parentType, propName) : getIndexTypeOfType(parentType, ts.IndexKind.Number);
                    if (!type) {
                        error(declaration, ts.Diagnostics.Type_0_has_no_property_1, typeToString(parentType), propName);
                        return unknownType;
                    }
                }
                else {
                    // Rest element has an array type with the same element type as the parent type
                    var type = createArrayType(getIndexTypeOfType(parentType, ts.IndexKind.Number));
                }
            }
            return type;
        }
        // Return the inferred type for a variable, parameter, or property declaration
        function getTypeForVariableLikeDeclaration(declaration) {
            // A variable declared in a for..in statement is always of type any
            if (declaration.parent.parent.kind === ts.SyntaxKind.ForInStatement) {
                return anyType;
            }
            if (ts.isBindingPattern(declaration.parent)) {
                return getTypeForBindingElement(declaration);
            }
            // Use type from type annotation if one is present
            if (declaration.type) {
                return getTypeFromTypeNode(declaration.type);
            }
            if (declaration.kind === ts.SyntaxKind.Parameter) {
                var func = declaration.parent;
                // For a parameter of a set accessor, use the type of the get accessor if one is present
                if (func.kind === ts.SyntaxKind.SetAccessor && !ts.hasComputedNameButNotSymbol(func)) {
                    var getter = ts.getDeclarationOfKind(declaration.parent.symbol, ts.SyntaxKind.GetAccessor);
                    if (getter) {
                        return getReturnTypeOfSignature(getSignatureFromDeclaration(getter));
                    }
                }
                // Use contextual parameter type if one is available
                var type = getContextuallyTypedParameterType(declaration);
                if (type) {
                    return type;
                }
            }
            // Use the type of the initializer expression if one is present
            if (declaration.initializer) {
                return checkExpressionCached(declaration.initializer);
            }
            // If it is a short-hand property assignment, use the type of the identifier
            if (declaration.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                return checkIdentifier(declaration.name);
            }
            // No type specified and nothing can be inferred
            return undefined;
        }
        // Return the type implied by a binding pattern element. This is the type of the initializer of the element if
        // one is present. Otherwise, if the element is itself a binding pattern, it is the type implied by the binding
        // pattern. Otherwise, it is the type any.
        function getTypeFromBindingElement(element) {
            if (element.initializer) {
                return getWidenedType(checkExpressionCached(element.initializer));
            }
            if (ts.isBindingPattern(element.name)) {
                return getTypeFromBindingPattern(element.name);
            }
            return anyType;
        }
        // Return the type implied by an object binding pattern
        function getTypeFromObjectBindingPattern(pattern) {
            var members = {};
            ts.forEach(pattern.elements, function (e) {
                var flags = ts.SymbolFlags.Property | ts.SymbolFlags.Transient | (e.initializer ? ts.SymbolFlags.Optional : 0);
                var name = e.propertyName || e.name;
                var symbol = createSymbol(flags, name.text);
                symbol.type = getTypeFromBindingElement(e);
                members[symbol.name] = symbol;
            });
            return createAnonymousType(undefined, members, emptyArray, emptyArray, undefined, undefined);
        }
        // Return the type implied by an array binding pattern
        function getTypeFromArrayBindingPattern(pattern) {
            var hasSpreadElement = false;
            var elementTypes = [];
            ts.forEach(pattern.elements, function (e) {
                elementTypes.push(e.kind === ts.SyntaxKind.OmittedExpression || e.dotDotDotToken ? anyType : getTypeFromBindingElement(e));
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
        function getTypeFromBindingPattern(pattern) {
            return pattern.kind === ts.SyntaxKind.ObjectBindingPattern ? getTypeFromObjectBindingPattern(pattern) : getTypeFromArrayBindingPattern(pattern);
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
        function getWidenedTypeForVariableLikeDeclaration(declaration, reportErrors) {
            var type = getTypeForVariableLikeDeclaration(declaration);
            if (type) {
                if (reportErrors) {
                    reportErrorsFromWidening(declaration, type);
                }
                // During a normal type check we'll never get to here with a property assignment (the check of the containing
                // object literal uses a different path). We exclude widening only so that language services and type verification
                // tools see the actual type.
                return declaration.kind !== ts.SyntaxKind.PropertyAssignment ? getWidenedType(type) : type;
            }
            // If no type was specified and nothing could be inferred, and if the declaration specifies a binding pattern, use
            // the type implied by the binding pattern
            if (ts.isBindingPattern(declaration.name)) {
                return getTypeFromBindingPattern(declaration.name);
            }
            // Rest parameters default to type any[], other parameters default to type any
            type = declaration.dotDotDotToken ? anyArrayType : anyType;
            // Report implicit any errors unless this is a private property within an ambient declaration
            if (reportErrors && compilerOptions.noImplicitAny) {
                var root = getRootDeclaration(declaration);
                if (!isPrivateWithinAmbient(root) && !(root.kind === ts.SyntaxKind.Parameter && isPrivateWithinAmbient(root.parent))) {
                    reportImplicitAnyError(declaration, type);
                }
            }
            return type;
        }
        function getTypeOfVariableOrParameterOrProperty(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                // Handle prototype property
                if (symbol.flags & ts.SymbolFlags.Prototype) {
                    return links.type = getTypeOfPrototypeProperty(symbol);
                }
                // Handle catch clause variables
                var declaration = symbol.valueDeclaration;
                if (declaration.kind === ts.SyntaxKind.CatchClause) {
                    return links.type = anyType;
                }
                // Handle variable, parameter or property
                links.type = resolvingType;
                var type = getWidenedTypeForVariableLikeDeclaration(declaration, true);
                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    var diagnostic = symbol.valueDeclaration.type ? ts.Diagnostics._0_implicitly_has_type_any_because_it_is_referenced_directly_or_indirectly_in_its_own_type_annotation : ts.Diagnostics._0_implicitly_has_type_any_because_it_is_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer;
                    error(symbol.valueDeclaration, diagnostic, symbolToString(symbol));
                }
            }
            return links.type;
        }
        function getSetAccessorTypeAnnotationNode(accessor) {
            return accessor && accessor.parameters.length > 0 && accessor.parameters[0].type;
        }
        function getAnnotatedAccessorType(accessor) {
            if (accessor) {
                if (accessor.kind === ts.SyntaxKind.GetAccessor) {
                    return accessor.type && getTypeFromTypeNode(accessor.type);
                }
                else {
                    var setterTypeAnnotation = getSetAccessorTypeAnnotationNode(accessor);
                    return setterTypeAnnotation && getTypeFromTypeNode(setterTypeAnnotation);
                }
            }
            return undefined;
        }
        function getTypeOfAccessors(symbol) {
            var links = getSymbolLinks(symbol);
            checkAndStoreTypeOfAccessors(symbol, links);
            return links.type;
        }
        function checkAndStoreTypeOfAccessors(symbol, links) {
            links = links || getSymbolLinks(symbol);
            if (!links.type) {
                links.type = resolvingType;
                var getter = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.GetAccessor);
                var setter = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.SetAccessor);
                var type;
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
                        else {
                            if (compilerOptions.noImplicitAny) {
                                error(setter, ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation, symbolToString(symbol));
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
                    var getter = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.GetAccessor);
                    error(getter, ts.Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                }
            }
        }
        function getTypeOfFuncClassEnumModule(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = createObjectType(ts.TypeFlags.Anonymous, symbol);
            }
            return links.type;
        }
        function getTypeOfEnumMember(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getDeclaredTypeOfEnum(getParentOfSymbol(symbol));
            }
            return links.type;
        }
        function getTypeOfImport(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getTypeOfSymbol(resolveImport(symbol));
            }
            return links.type;
        }
        function getTypeOfInstantiatedSymbol(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = instantiateType(getTypeOfSymbol(links.target), links.mapper);
            }
            return links.type;
        }
        function getTypeOfSymbol(symbol) {
            if (symbol.flags & ts.SymbolFlags.Instantiated) {
                return getTypeOfInstantiatedSymbol(symbol);
            }
            if (symbol.flags & (ts.SymbolFlags.Variable | ts.SymbolFlags.Property)) {
                return getTypeOfVariableOrParameterOrProperty(symbol);
            }
            if (symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Method | ts.SymbolFlags.Class | ts.SymbolFlags.Enum | ts.SymbolFlags.ValueModule)) {
                return getTypeOfFuncClassEnumModule(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.EnumMember) {
                return getTypeOfEnumMember(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.Accessor) {
                return getTypeOfAccessors(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.Import) {
                return getTypeOfImport(symbol);
            }
            return unknownType;
        }
        function getTargetType(type) {
            return type.flags & ts.TypeFlags.Reference ? type.target : type;
        }
        function hasBaseType(type, checkBase) {
            return check(type);
            function check(type) {
                var target = getTargetType(type);
                return target === checkBase || ts.forEach(target.baseTypes, check);
            }
        }
        // Return combined list of type parameters from all declarations of a class or interface. Elsewhere we check they're all
        // the same, but even if they're not we still need the complete list to ensure instantiations supply type arguments
        // for all type parameters.
        function getTypeParametersOfClassOrInterface(symbol) {
            var result;
            ts.forEach(symbol.declarations, function (node) {
                if (node.kind === ts.SyntaxKind.InterfaceDeclaration || node.kind === ts.SyntaxKind.ClassDeclaration) {
                    var declaration = node;
                    if (declaration.typeParameters && declaration.typeParameters.length) {
                        ts.forEach(declaration.typeParameters, function (node) {
                            var tp = getDeclaredTypeOfTypeParameter(getSymbolOfNode(node));
                            if (!result) {
                                result = [tp];
                            }
                            else if (!ts.contains(result, tp)) {
                                result.push(tp);
                            }
                        });
                    }
                }
            });
            return result;
        }
        function getDeclaredTypeOfClass(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = links.declaredType = createObjectType(ts.TypeFlags.Class, symbol);
                var typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= ts.TypeFlags.Reference;
                    type.typeParameters = typeParameters;
                    type.instantiations = {};
                    type.instantiations[getTypeListId(type.typeParameters)] = type;
                    type.target = type;
                    type.typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                var declaration = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.ClassDeclaration);
                var baseTypeNode = ts.getClassBaseTypeNode(declaration);
                if (baseTypeNode) {
                    var baseType = getTypeFromTypeReferenceNode(baseTypeNode);
                    if (baseType !== unknownType) {
                        if (getTargetType(baseType).flags & ts.TypeFlags.Class) {
                            if (type !== baseType && !hasBaseType(baseType, type)) {
                                type.baseTypes.push(baseType);
                            }
                            else {
                                error(declaration, ts.Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, undefined, ts.TypeFormatFlags.WriteArrayAsGenericType));
                            }
                        }
                        else {
                            error(baseTypeNode, ts.Diagnostics.A_class_may_only_extend_another_class);
                        }
                    }
                }
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = emptyArray;
                type.declaredConstructSignatures = emptyArray;
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, ts.IndexKind.String);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, ts.IndexKind.Number);
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfInterface(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = links.declaredType = createObjectType(ts.TypeFlags.Interface, symbol);
                var typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= ts.TypeFlags.Reference;
                    type.typeParameters = typeParameters;
                    type.instantiations = {};
                    type.instantiations[getTypeListId(type.typeParameters)] = type;
                    type.target = type;
                    type.typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                ts.forEach(symbol.declarations, function (declaration) {
                    if (declaration.kind === ts.SyntaxKind.InterfaceDeclaration && ts.getInterfaceBaseTypeNodes(declaration)) {
                        ts.forEach(ts.getInterfaceBaseTypeNodes(declaration), function (node) {
                            var baseType = getTypeFromTypeReferenceNode(node);
                            if (baseType !== unknownType) {
                                if (getTargetType(baseType).flags & (ts.TypeFlags.Class | ts.TypeFlags.Interface)) {
                                    if (type !== baseType && !hasBaseType(baseType, type)) {
                                        type.baseTypes.push(baseType);
                                    }
                                    else {
                                        error(declaration, ts.Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, undefined, ts.TypeFormatFlags.WriteArrayAsGenericType));
                                    }
                                }
                                else {
                                    error(node, ts.Diagnostics.An_interface_may_only_extend_a_class_or_another_interface);
                                }
                            }
                        });
                    }
                });
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = getSignaturesOfSymbol(symbol.members["__call"]);
                type.declaredConstructSignatures = getSignaturesOfSymbol(symbol.members["__new"]);
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, ts.IndexKind.String);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, ts.IndexKind.Number);
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfTypeAlias(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = resolvingType;
                var declaration = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.TypeAliasDeclaration);
                var type = getTypeFromTypeNode(declaration.type);
                if (links.declaredType === resolvingType) {
                    links.declaredType = type;
                }
            }
            else if (links.declaredType === resolvingType) {
                links.declaredType = unknownType;
                var declaration = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.TypeAliasDeclaration);
                error(declaration.name, ts.Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfEnum(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = createType(ts.TypeFlags.Enum);
                type.symbol = symbol;
                links.declaredType = type;
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfTypeParameter(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                var type = createType(ts.TypeFlags.TypeParameter);
                type.symbol = symbol;
                if (!ts.getDeclarationOfKind(symbol, ts.SyntaxKind.TypeParameter).constraint) {
                    type.constraint = noConstraintType;
                }
                links.declaredType = type;
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfImport(symbol) {
            var links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = getDeclaredTypeOfSymbol(resolveImport(symbol));
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfSymbol(symbol) {
            ts.Debug.assert((symbol.flags & ts.SymbolFlags.Instantiated) === 0);
            if (symbol.flags & ts.SymbolFlags.Class) {
                return getDeclaredTypeOfClass(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.Interface) {
                return getDeclaredTypeOfInterface(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.TypeAlias) {
                return getDeclaredTypeOfTypeAlias(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.Enum) {
                return getDeclaredTypeOfEnum(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.TypeParameter) {
                return getDeclaredTypeOfTypeParameter(symbol);
            }
            if (symbol.flags & ts.SymbolFlags.Import) {
                return getDeclaredTypeOfImport(symbol);
            }
            return unknownType;
        }
        function createSymbolTable(symbols) {
            var result = {};
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                result[symbol.name] = symbol;
            }
            return result;
        }
        function createInstantiatedSymbolTable(symbols, mapper) {
            var result = {};
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                result[symbol.name] = instantiateSymbol(symbol, mapper);
            }
            return result;
        }
        function addInheritedMembers(symbols, baseSymbols) {
            for (var i = 0; i < baseSymbols.length; i++) {
                var s = baseSymbols[i];
                if (!ts.hasProperty(symbols, s.name)) {
                    symbols[s.name] = s;
                }
            }
        }
        function addInheritedSignatures(signatures, baseSignatures) {
            if (baseSignatures) {
                for (var i = 0; i < baseSignatures.length; i++) {
                    signatures.push(baseSignatures[i]);
                }
            }
        }
        function resolveClassOrInterfaceMembers(type) {
            var members = type.symbol.members;
            var callSignatures = type.declaredCallSignatures;
            var constructSignatures = type.declaredConstructSignatures;
            var stringIndexType = type.declaredStringIndexType;
            var numberIndexType = type.declaredNumberIndexType;
            if (type.baseTypes.length) {
                members = createSymbolTable(type.declaredProperties);
                ts.forEach(type.baseTypes, function (baseType) {
                    addInheritedMembers(members, getPropertiesOfObjectType(baseType));
                    callSignatures = ts.concatenate(callSignatures, getSignaturesOfType(baseType, ts.SignatureKind.Call));
                    constructSignatures = ts.concatenate(constructSignatures, getSignaturesOfType(baseType, ts.SignatureKind.Construct));
                    stringIndexType = stringIndexType || getIndexTypeOfType(baseType, ts.IndexKind.String);
                    numberIndexType = numberIndexType || getIndexTypeOfType(baseType, ts.IndexKind.Number);
                });
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveTypeReferenceMembers(type) {
            var target = type.target;
            var mapper = createTypeMapper(target.typeParameters, type.typeArguments);
            var members = createInstantiatedSymbolTable(target.declaredProperties, mapper);
            var callSignatures = instantiateList(target.declaredCallSignatures, mapper, instantiateSignature);
            var constructSignatures = instantiateList(target.declaredConstructSignatures, mapper, instantiateSignature);
            var stringIndexType = target.declaredStringIndexType ? instantiateType(target.declaredStringIndexType, mapper) : undefined;
            var numberIndexType = target.declaredNumberIndexType ? instantiateType(target.declaredNumberIndexType, mapper) : undefined;
            ts.forEach(target.baseTypes, function (baseType) {
                var instantiatedBaseType = instantiateType(baseType, mapper);
                addInheritedMembers(members, getPropertiesOfObjectType(instantiatedBaseType));
                callSignatures = ts.concatenate(callSignatures, getSignaturesOfType(instantiatedBaseType, ts.SignatureKind.Call));
                constructSignatures = ts.concatenate(constructSignatures, getSignaturesOfType(instantiatedBaseType, ts.SignatureKind.Construct));
                stringIndexType = stringIndexType || getIndexTypeOfType(instantiatedBaseType, ts.IndexKind.String);
                numberIndexType = numberIndexType || getIndexTypeOfType(instantiatedBaseType, ts.IndexKind.Number);
            });
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function createSignature(declaration, typeParameters, parameters, resolvedReturnType, minArgumentCount, hasRestParameter, hasStringLiterals) {
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
        function cloneSignature(sig) {
            return createSignature(sig.declaration, sig.typeParameters, sig.parameters, sig.resolvedReturnType, sig.minArgumentCount, sig.hasRestParameter, sig.hasStringLiterals);
        }
        function getDefaultConstructSignatures(classType) {
            if (classType.baseTypes.length) {
                var baseType = classType.baseTypes[0];
                var baseSignatures = getSignaturesOfType(getTypeOfSymbol(baseType.symbol), ts.SignatureKind.Construct);
                return ts.map(baseSignatures, function (baseSignature) {
                    var signature = baseType.flags & ts.TypeFlags.Reference ? getSignatureInstantiation(baseSignature, baseType.typeArguments) : cloneSignature(baseSignature);
                    signature.typeParameters = classType.typeParameters;
                    signature.resolvedReturnType = classType;
                    return signature;
                });
            }
            return [createSignature(undefined, classType.typeParameters, emptyArray, classType, 0, false, false)];
        }
        function createTupleTypeMemberSymbols(memberTypes) {
            var members = {};
            for (var i = 0; i < memberTypes.length; i++) {
                var symbol = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Transient, "" + i);
                symbol.type = memberTypes[i];
                members[i] = symbol;
            }
            return members;
        }
        function resolveTupleTypeMembers(type) {
            var arrayType = resolveObjectOrUnionTypeMembers(createArrayType(getUnionType(type.elementTypes)));
            var members = createTupleTypeMemberSymbols(type.elementTypes);
            addInheritedMembers(members, arrayType.properties);
            setObjectTypeMembers(type, members, arrayType.callSignatures, arrayType.constructSignatures, arrayType.stringIndexType, arrayType.numberIndexType);
        }
        function signatureListsIdentical(s, t) {
            if (s.length !== t.length) {
                return false;
            }
            for (var i = 0; i < s.length; i++) {
                if (!compareSignatures(s[i], t[i], false, compareTypes)) {
                    return false;
                }
            }
            return true;
        }
        // If the lists of call or construct signatures in the given types are all identical except for return types,
        // and if none of the signatures are generic, return a list of signatures that has substitutes a union of the
        // return types of the corresponding signatures in each resulting signature.
        function getUnionSignatures(types, kind) {
            var signatureLists = ts.map(types, function (t) { return getSignaturesOfType(t, kind); });
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
            var result = ts.map(signatures, cloneSignature);
            for (var i = 0; i < result.length; i++) {
                var s = result[i];
                // Clear resolved return type we possibly got from cloneSignature
                s.resolvedReturnType = undefined;
                s.unionSignatures = ts.map(signatureLists, function (signatures) { return signatures[i]; });
            }
            return result;
        }
        function getUnionIndexType(types, kind) {
            var indexTypes = [];
            for (var i = 0; i < types.length; i++) {
                var indexType = getIndexTypeOfType(types[i], kind);
                if (!indexType) {
                    return undefined;
                }
                indexTypes.push(indexType);
            }
            return getUnionType(indexTypes);
        }
        function resolveUnionTypeMembers(type) {
            // The members and properties collections are empty for union types. To get all properties of a union
            // type use getPropertiesOfType (only the language service uses this).
            var callSignatures = getUnionSignatures(type.types, ts.SignatureKind.Call);
            var constructSignatures = getUnionSignatures(type.types, ts.SignatureKind.Construct);
            var stringIndexType = getUnionIndexType(type.types, ts.IndexKind.String);
            var numberIndexType = getUnionIndexType(type.types, ts.IndexKind.Number);
            setObjectTypeMembers(type, emptySymbols, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveAnonymousTypeMembers(type) {
            var symbol = type.symbol;
            if (symbol.flags & ts.SymbolFlags.TypeLiteral) {
                var members = symbol.members;
                var callSignatures = getSignaturesOfSymbol(members["__call"]);
                var constructSignatures = getSignaturesOfSymbol(members["__new"]);
                var stringIndexType = getIndexTypeOfSymbol(symbol, ts.IndexKind.String);
                var numberIndexType = getIndexTypeOfSymbol(symbol, ts.IndexKind.Number);
            }
            else {
                // Combinations of function, class, enum and module
                var members = emptySymbols;
                var callSignatures = emptyArray;
                var constructSignatures = emptyArray;
                if (symbol.flags & ts.SymbolFlags.HasExports) {
                    members = symbol.exports;
                }
                if (symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Method)) {
                    callSignatures = getSignaturesOfSymbol(symbol);
                }
                if (symbol.flags & ts.SymbolFlags.Class) {
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
                var stringIndexType = undefined;
                var numberIndexType = (symbol.flags & ts.SymbolFlags.Enum) ? stringType : undefined;
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveObjectOrUnionTypeMembers(type) {
            if (!type.members) {
                if (type.flags & (ts.TypeFlags.Class | ts.TypeFlags.Interface)) {
                    resolveClassOrInterfaceMembers(type);
                }
                else if (type.flags & ts.TypeFlags.Anonymous) {
                    resolveAnonymousTypeMembers(type);
                }
                else if (type.flags & ts.TypeFlags.Tuple) {
                    resolveTupleTypeMembers(type);
                }
                else if (type.flags & ts.TypeFlags.Union) {
                    resolveUnionTypeMembers(type);
                }
                else {
                    resolveTypeReferenceMembers(type);
                }
            }
            return type;
        }
        // Return properties of an object type or an empty array for other types
        function getPropertiesOfObjectType(type) {
            if (type.flags & ts.TypeFlags.ObjectType) {
                return resolveObjectOrUnionTypeMembers(type).properties;
            }
            return emptyArray;
        }
        // If the given type is an object type and that type has a property by the given name, return
        // the symbol for that property. Otherwise return undefined.
        function getPropertyOfObjectType(type, name) {
            if (type.flags & ts.TypeFlags.ObjectType) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                if (ts.hasProperty(resolved.members, name)) {
                    var symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }
        }
        function getPropertiesOfUnionType(type) {
            var result = [];
            ts.forEach(getPropertiesOfType(type.types[0]), function (prop) {
                var unionProp = getPropertyOfUnionType(type, prop.name);
                if (unionProp) {
                    result.push(unionProp);
                }
            });
            return result;
        }
        function getPropertiesOfType(type) {
            if (type.flags & ts.TypeFlags.Union) {
                return getPropertiesOfUnionType(type);
            }
            return getPropertiesOfObjectType(getApparentType(type));
        }
        // For a type parameter, return the base constraint of the type parameter. For the string, number, and
        // boolean primitive types, return the corresponding object types.Otherwise return the type itself.
        // Note that the apparent type of a union type is the union type itself.
        function getApparentType(type) {
            if (type.flags & ts.TypeFlags.TypeParameter) {
                do {
                    type = getConstraintOfTypeParameter(type);
                } while (type && type.flags & ts.TypeFlags.TypeParameter);
                if (!type) {
                    type = emptyObjectType;
                }
            }
            if (type.flags & ts.TypeFlags.StringLike) {
                type = globalStringType;
            }
            else if (type.flags & ts.TypeFlags.NumberLike) {
                type = globalNumberType;
            }
            else if (type.flags & ts.TypeFlags.Boolean) {
                type = globalBooleanType;
            }
            return type;
        }
        function createUnionProperty(unionType, name) {
            var types = unionType.types;
            var props;
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
            var propTypes = [];
            var declarations = [];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (prop.declarations) {
                    declarations.push.apply(declarations, prop.declarations);
                }
                propTypes.push(getTypeOfSymbol(prop));
            }
            var result = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Transient | ts.SymbolFlags.UnionProperty, name);
            result.unionType = unionType;
            result.declarations = declarations;
            result.type = getUnionType(propTypes);
            return result;
        }
        function getPropertyOfUnionType(type, name) {
            var properties = type.resolvedProperties || (type.resolvedProperties = {});
            if (ts.hasProperty(properties, name)) {
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
        function getPropertyOfType(type, name) {
            if (type.flags & ts.TypeFlags.Union) {
                return getPropertyOfUnionType(type, name);
            }
            if (!(type.flags & ts.TypeFlags.ObjectType)) {
                type = getApparentType(type);
                if (!(type.flags & ts.TypeFlags.ObjectType)) {
                    return undefined;
                }
            }
            var resolved = resolveObjectOrUnionTypeMembers(type);
            if (ts.hasProperty(resolved.members, name)) {
                var symbol = resolved.members[name];
                if (symbolIsValue(symbol)) {
                    return symbol;
                }
            }
            if (resolved === anyFunctionType || resolved.callSignatures.length || resolved.constructSignatures.length) {
                var symbol = getPropertyOfObjectType(globalFunctionType, name);
                if (symbol)
                    return symbol;
            }
            return getPropertyOfObjectType(globalObjectType, name);
        }
        function getSignaturesOfObjectOrUnionType(type, kind) {
            if (type.flags & (ts.TypeFlags.ObjectType | ts.TypeFlags.Union)) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                return kind === ts.SignatureKind.Call ? resolved.callSignatures : resolved.constructSignatures;
            }
            return emptyArray;
        }
        // Return the signatures of the given kind in the given type. Creates synthetic union signatures when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getSignaturesOfType(type, kind) {
            return getSignaturesOfObjectOrUnionType(getApparentType(type), kind);
        }
        function getIndexTypeOfObjectOrUnionType(type, kind) {
            if (type.flags & (ts.TypeFlags.ObjectType | ts.TypeFlags.Union)) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                return kind === ts.IndexKind.String ? resolved.stringIndexType : resolved.numberIndexType;
            }
        }
        // Return the index type of the given kind in the given type. Creates synthetic union index types when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getIndexTypeOfType(type, kind) {
            return getIndexTypeOfObjectOrUnionType(getApparentType(type), kind);
        }
        // Return list of type parameters with duplicates removed (duplicate identifier errors are generated in the actual
        // type checking functions).
        function getTypeParametersFromDeclaration(typeParameterDeclarations) {
            var result = [];
            ts.forEach(typeParameterDeclarations, function (node) {
                var tp = getDeclaredTypeOfTypeParameter(node.symbol);
                if (!ts.contains(result, tp)) {
                    result.push(tp);
                }
            });
            return result;
        }
        function getSignatureFromDeclaration(declaration) {
            var links = getNodeLinks(declaration);
            if (!links.resolvedSignature) {
                var classType = declaration.kind === ts.SyntaxKind.Constructor ? getDeclaredTypeOfClass(declaration.parent.symbol) : undefined;
                var typeParameters = classType ? classType.typeParameters : declaration.typeParameters ? getTypeParametersFromDeclaration(declaration.typeParameters) : undefined;
                var parameters = [];
                var hasStringLiterals = false;
                var minArgumentCount = -1;
                for (var i = 0, n = declaration.parameters.length; i < n; i++) {
                    var param = declaration.parameters[i];
                    parameters.push(param.symbol);
                    if (param.type && param.type.kind === ts.SyntaxKind.StringLiteral) {
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
                var returnType;
                if (classType) {
                    returnType = classType;
                }
                else if (declaration.type) {
                    returnType = getTypeFromTypeNode(declaration.type);
                }
                else {
                    // TypeScript 1.0 spec (April 2014):
                    // If only one accessor includes a type annotation, the other behaves as if it had the same type annotation.
                    if (declaration.kind === ts.SyntaxKind.GetAccessor && !ts.hasComputedNameButNotSymbol(declaration)) {
                        var setter = ts.getDeclarationOfKind(declaration.symbol, ts.SyntaxKind.SetAccessor);
                        returnType = getAnnotatedAccessorType(setter);
                    }
                    if (!returnType && ts.nodeIsMissing(declaration.body)) {
                        returnType = anyType;
                    }
                }
                links.resolvedSignature = createSignature(declaration, typeParameters, parameters, returnType, minArgumentCount, ts.hasRestParameters(declaration), hasStringLiterals);
            }
            return links.resolvedSignature;
        }
        function getSignaturesOfSymbol(symbol) {
            if (!symbol)
                return emptyArray;
            var result = [];
            for (var i = 0, len = symbol.declarations.length; i < len; i++) {
                var node = symbol.declarations[i];
                switch (node.kind) {
                    case ts.SyntaxKind.FunctionType:
                    case ts.SyntaxKind.ConstructorType:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.CallSignature:
                    case ts.SyntaxKind.ConstructSignature:
                    case ts.SyntaxKind.IndexSignature:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.ArrowFunction:
                        // Don't include signature if node is the implementation of an overloaded function. A node is considered
                        // an implementation node if it has a body and the previous node is of the same kind and immediately
                        // precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
                        if (i > 0 && node.body) {
                            var previous = symbol.declarations[i - 1];
                            if (node.parent === previous.parent && node.kind === previous.kind && node.pos === previous.end) {
                                break;
                            }
                        }
                        result.push(getSignatureFromDeclaration(node));
                }
            }
            return result;
        }
        function getReturnTypeOfSignature(signature) {
            if (!signature.resolvedReturnType) {
                signature.resolvedReturnType = resolvingType;
                if (signature.target) {
                    var type = instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper);
                }
                else if (signature.unionSignatures) {
                    var type = getUnionType(ts.map(signature.unionSignatures, getReturnTypeOfSignature));
                }
                else {
                    var type = getReturnTypeFromBody(signature.declaration);
                }
                if (signature.resolvedReturnType === resolvingType) {
                    signature.resolvedReturnType = type;
                }
            }
            else if (signature.resolvedReturnType === resolvingType) {
                signature.resolvedReturnType = anyType;
                if (compilerOptions.noImplicitAny) {
                    var declaration = signature.declaration;
                    if (declaration.name) {
                        error(declaration.name, ts.Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, ts.declarationNameToString(declaration.name));
                    }
                    else {
                        error(declaration, ts.Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                    }
                }
            }
            return signature.resolvedReturnType;
        }
        function getRestTypeOfSignature(signature) {
            if (signature.hasRestParameter) {
                var type = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                if (type.flags & ts.TypeFlags.Reference && type.target === globalArrayType) {
                    return type.typeArguments[0];
                }
            }
            return anyType;
        }
        function getSignatureInstantiation(signature, typeArguments) {
            return instantiateSignature(signature, createTypeMapper(signature.typeParameters, typeArguments), true);
        }
        function getErasedSignature(signature) {
            if (!signature.typeParameters)
                return signature;
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
        function getOrCreateTypeFromSignature(signature) {
            // There are two ways to declare a construct signature, one is by declaring a class constructor
            // using the constructor keyword, and the other is declaring a bare construct signature in an
            // object type literal or interface (using the new keyword). Each way of declaring a constructor
            // will result in a different declaration kind.
            if (!signature.isolatedSignatureType) {
                var isConstructor = signature.declaration.kind === ts.SyntaxKind.Constructor || signature.declaration.kind === ts.SyntaxKind.ConstructSignature;
                var type = createObjectType(ts.TypeFlags.Anonymous | ts.TypeFlags.FromSignature);
                type.members = emptySymbols;
                type.properties = emptyArray;
                type.callSignatures = !isConstructor ? [signature] : emptyArray;
                type.constructSignatures = isConstructor ? [signature] : emptyArray;
                signature.isolatedSignatureType = type;
            }
            return signature.isolatedSignatureType;
        }
        function getIndexSymbol(symbol) {
            return symbol.members["__index"];
        }
        function getIndexDeclarationOfSymbol(symbol, kind) {
            var syntaxKind = kind === ts.IndexKind.Number ? ts.SyntaxKind.NumberKeyword : ts.SyntaxKind.StringKeyword;
            var indexSymbol = getIndexSymbol(symbol);
            if (indexSymbol) {
                var len = indexSymbol.declarations.length;
                for (var i = 0; i < len; i++) {
                    var node = indexSymbol.declarations[i];
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
        function getIndexTypeOfSymbol(symbol, kind) {
            var declaration = getIndexDeclarationOfSymbol(symbol, kind);
            return declaration ? declaration.type ? getTypeFromTypeNode(declaration.type) : anyType : undefined;
        }
        function getConstraintOfTypeParameter(type) {
            if (!type.constraint) {
                if (type.target) {
                    var targetConstraint = getConstraintOfTypeParameter(type.target);
                    type.constraint = targetConstraint ? instantiateType(targetConstraint, type.mapper) : noConstraintType;
                }
                else {
                    type.constraint = getTypeFromTypeNode(ts.getDeclarationOfKind(type.symbol, ts.SyntaxKind.TypeParameter).constraint);
                }
            }
            return type.constraint === noConstraintType ? undefined : type.constraint;
        }
        function getTypeListId(types) {
            switch (types.length) {
                case 1:
                    return "" + types[0].id;
                case 2:
                    return types[0].id + "," + types[1].id;
                default:
                    var result = "";
                    for (var i = 0; i < types.length; i++) {
                        if (i > 0)
                            result += ",";
                        result += types[i].id;
                    }
                    return result;
            }
        }
        function getUnwidenedFlagOfTypes(types) {
            return ts.forEach(types, function (t) { return t.flags & ts.TypeFlags.Unwidened; }) || 0;
        }
        function createTypeReference(target, typeArguments) {
            var id = getTypeListId(typeArguments);
            var type = target.instantiations[id];
            if (!type) {
                var flags = ts.TypeFlags.Reference | getUnwidenedFlagOfTypes(typeArguments);
                type = target.instantiations[id] = createObjectType(flags, target.symbol);
                type.target = target;
                type.typeArguments = typeArguments;
            }
            return type;
        }
        function isTypeParameterReferenceIllegalInConstraint(typeReferenceNode, typeParameterSymbol) {
            var links = getNodeLinks(typeReferenceNode);
            if (links.isIllegalTypeReferenceInConstraint !== undefined) {
                return links.isIllegalTypeReferenceInConstraint;
            }
            // bubble up to the declaration
            var currentNode = typeReferenceNode;
            while (!ts.forEach(typeParameterSymbol.declarations, function (d) { return d.parent === currentNode.parent; })) {
                currentNode = currentNode.parent;
            }
            // if last step was made from the type parameter this means that path has started somewhere in constraint which is illegal
            links.isIllegalTypeReferenceInConstraint = currentNode.kind === ts.SyntaxKind.TypeParameter;
            return links.isIllegalTypeReferenceInConstraint;
        }
        function checkTypeParameterHasIllegalReferencesInConstraint(typeParameter) {
            var typeParameterSymbol;
            function check(n) {
                if (n.kind === ts.SyntaxKind.TypeReference && n.typeName.kind === ts.SyntaxKind.Identifier) {
                    var links = getNodeLinks(n);
                    if (links.isIllegalTypeReferenceInConstraint === undefined) {
                        var symbol = resolveName(typeParameter, n.typeName.text, ts.SymbolFlags.Type, undefined, undefined);
                        if (symbol && (symbol.flags & ts.SymbolFlags.TypeParameter)) {
                            // TypeScript 1.0 spec (April 2014): 3.4.1
                            // Type parameters declared in a particular type parameter list 
                            // may not be referenced in constraints in that type parameter list
                            // symbol.declaration.parent === typeParameter.parent
                            // -> typeParameter and symbol.declaration originate from the same type parameter list 
                            // -> illegal for all declarations in symbol
                            // forEach === exists
                            links.isIllegalTypeReferenceInConstraint = ts.forEach(symbol.declarations, function (d) { return d.parent == typeParameter.parent; });
                        }
                    }
                    if (links.isIllegalTypeReferenceInConstraint) {
                        error(typeParameter, ts.Diagnostics.Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list);
                    }
                }
                ts.forEachChild(n, check);
            }
            if (typeParameter.constraint) {
                typeParameterSymbol = getSymbolOfNode(typeParameter);
                check(typeParameter.constraint);
            }
        }
        function getTypeFromTypeReferenceNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                var symbol = resolveEntityName(node, node.typeName, ts.SymbolFlags.Type);
                if (symbol) {
                    var type;
                    if ((symbol.flags & ts.SymbolFlags.TypeParameter) && isTypeParameterReferenceIllegalInConstraint(node, symbol)) {
                        // TypeScript 1.0 spec (April 2014): 3.4.1
                        // Type parameters declared in a particular type parameter list 
                        // may not be referenced in constraints in that type parameter list
                        // Implementation: such type references are resolved to 'unknown' type that usually denotes error
                        type = unknownType;
                    }
                    else {
                        type = getDeclaredTypeOfSymbol(symbol);
                        if (type.flags & (ts.TypeFlags.Class | ts.TypeFlags.Interface) && type.flags & ts.TypeFlags.Reference) {
                            var typeParameters = type.typeParameters;
                            if (node.typeArguments && node.typeArguments.length === typeParameters.length) {
                                type = createTypeReference(type, ts.map(node.typeArguments, getTypeFromTypeNode));
                            }
                            else {
                                error(node, ts.Diagnostics.Generic_type_0_requires_1_type_argument_s, typeToString(type, undefined, ts.TypeFormatFlags.WriteArrayAsGenericType), typeParameters.length);
                                type = undefined;
                            }
                        }
                        else {
                            if (node.typeArguments) {
                                error(node, ts.Diagnostics.Type_0_is_not_generic, typeToString(type));
                                type = undefined;
                            }
                        }
                    }
                }
                links.resolvedType = type || unknownType;
            }
            return links.resolvedType;
        }
        function getTypeFromTypeQueryNode(node) {
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
        function getTypeOfGlobalSymbol(symbol, arity) {
            function getTypeDeclaration(symbol) {
                var declarations = symbol.declarations;
                for (var i = 0; i < declarations.length; i++) {
                    var declaration = declarations[i];
                    switch (declaration.kind) {
                        case ts.SyntaxKind.ClassDeclaration:
                        case ts.SyntaxKind.InterfaceDeclaration:
                        case ts.SyntaxKind.EnumDeclaration:
                            return declaration;
                    }
                }
            }
            if (!symbol) {
                return emptyObjectType;
            }
            var type = getDeclaredTypeOfSymbol(symbol);
            if (!(type.flags & ts.TypeFlags.ObjectType)) {
                error(getTypeDeclaration(symbol), ts.Diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbol.name);
                return emptyObjectType;
            }
            if ((type.typeParameters ? type.typeParameters.length : 0) !== arity) {
                error(getTypeDeclaration(symbol), ts.Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbol.name, arity);
                return emptyObjectType;
            }
            return type;
        }
        function getGlobalSymbol(name) {
            return resolveName(undefined, name, ts.SymbolFlags.Type, ts.Diagnostics.Cannot_find_global_type_0, name);
        }
        function getGlobalType(name) {
            return getTypeOfGlobalSymbol(getGlobalSymbol(name), 0);
        }
        function createArrayType(elementType) {
            // globalArrayType will be undefined if we get here during creation of the Array type. This for example happens if
            // user code augments the Array type with call or construct signatures that have an array type as the return type.
            // We instead use globalArraySymbol to obtain the (not yet fully constructed) Array type.
            var arrayType = globalArrayType || getDeclaredTypeOfSymbol(globalArraySymbol);
            return arrayType !== emptyObjectType ? createTypeReference(arrayType, [elementType]) : emptyObjectType;
        }
        function getTypeFromArrayTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createArrayType(getTypeFromTypeNode(node.elementType));
            }
            return links.resolvedType;
        }
        function createTupleType(elementTypes) {
            var id = getTypeListId(elementTypes);
            var type = tupleTypes[id];
            if (!type) {
                type = tupleTypes[id] = createObjectType(ts.TypeFlags.Tuple);
                type.elementTypes = elementTypes;
            }
            return type;
        }
        function getTypeFromTupleTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createTupleType(ts.map(node.elementTypes, getTypeFromTypeNode));
            }
            return links.resolvedType;
        }
        function addTypeToSortedSet(sortedSet, type) {
            if (type.flags & ts.TypeFlags.Union) {
                addTypesToSortedSet(sortedSet, type.types);
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
        function addTypesToSortedSet(sortedTypes, types) {
            for (var i = 0, len = types.length; i < len; i++) {
                addTypeToSortedSet(sortedTypes, types[i]);
            }
        }
        function isSubtypeOfAny(candidate, types) {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && isTypeSubtypeOf(candidate, types[i])) {
                    return true;
                }
            }
            return false;
        }
        function removeSubtypes(types) {
            var i = types.length;
            while (i > 0) {
                i--;
                if (isSubtypeOfAny(types[i], types)) {
                    types.splice(i, 1);
                }
            }
        }
        function containsAnyType(types) {
            for (var i = 0; i < types.length; i++) {
                if (types[i].flags & ts.TypeFlags.Any) {
                    return true;
                }
            }
            return false;
        }
        function removeAllButLast(types, typeToRemove) {
            var i = types.length;
            while (i > 0 && types.length > 1) {
                i--;
                if (types[i] === typeToRemove) {
                    types.splice(i, 1);
                }
            }
        }
        function getUnionType(types, noSubtypeReduction) {
            if (types.length === 0) {
                return emptyObjectType;
            }
            var sortedTypes = [];
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
                type = unionTypes[id] = createObjectType(ts.TypeFlags.Union | getUnwidenedFlagOfTypes(sortedTypes));
                type.types = sortedTypes;
            }
            return type;
        }
        function getTypeFromUnionTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getUnionType(ts.map(node.types, getTypeFromTypeNode), true);
            }
            return links.resolvedType;
        }
        function getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                // Deferred resolution of members is handled by resolveObjectTypeMembers
                links.resolvedType = createObjectType(ts.TypeFlags.Anonymous, node.symbol);
            }
            return links.resolvedType;
        }
        function getStringLiteralType(node) {
            if (ts.hasProperty(stringLiteralTypes, node.text)) {
                return stringLiteralTypes[node.text];
            }
            var type = stringLiteralTypes[node.text] = createType(ts.TypeFlags.StringLiteral);
            type.text = ts.getTextOfNode(node);
            return type;
        }
        function getTypeFromStringLiteral(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getStringLiteralType(node);
            }
            return links.resolvedType;
        }
        function getTypeFromTypeNode(node) {
            switch (node.kind) {
                case ts.SyntaxKind.AnyKeyword:
                    return anyType;
                case ts.SyntaxKind.StringKeyword:
                    return stringType;
                case ts.SyntaxKind.NumberKeyword:
                    return numberType;
                case ts.SyntaxKind.BooleanKeyword:
                    return booleanType;
                case ts.SyntaxKind.VoidKeyword:
                    return voidType;
                case ts.SyntaxKind.StringLiteral:
                    return getTypeFromStringLiteral(node);
                case ts.SyntaxKind.TypeReference:
                    return getTypeFromTypeReferenceNode(node);
                case ts.SyntaxKind.TypeQuery:
                    return getTypeFromTypeQueryNode(node);
                case ts.SyntaxKind.ArrayType:
                    return getTypeFromArrayTypeNode(node);
                case ts.SyntaxKind.TupleType:
                    return getTypeFromTupleTypeNode(node);
                case ts.SyntaxKind.UnionType:
                    return getTypeFromUnionTypeNode(node);
                case ts.SyntaxKind.ParenthesizedType:
                    return getTypeFromTypeNode(node.type);
                case ts.SyntaxKind.FunctionType:
                case ts.SyntaxKind.ConstructorType:
                case ts.SyntaxKind.TypeLiteral:
                    return getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                case ts.SyntaxKind.Identifier:
                case ts.SyntaxKind.QualifiedName:
                    var symbol = getSymbolInfo(node);
                    return symbol && getDeclaredTypeOfSymbol(symbol);
                default:
                    return unknownType;
            }
        }
        function instantiateList(items, mapper, instantiator) {
            if (items && items.length) {
                var result = [];
                for (var i = 0; i < items.length; i++) {
                    result.push(instantiator(items[i], mapper));
                }
                return result;
            }
            return items;
        }
        function createUnaryTypeMapper(source, target) {
            return function (t) { return t === source ? target : t; };
        }
        function createBinaryTypeMapper(source1, target1, source2, target2) {
            return function (t) { return t === source1 ? target1 : t === source2 ? target2 : t; };
        }
        function createTypeMapper(sources, targets) {
            switch (sources.length) {
                case 1: return createUnaryTypeMapper(sources[0], targets[0]);
                case 2: return createBinaryTypeMapper(sources[0], targets[0], sources[1], targets[1]);
            }
            return function (t) {
                for (var i = 0; i < sources.length; i++) {
                    if (t === sources[i])
                        return targets[i];
                }
                return t;
            };
        }
        function createUnaryTypeEraser(source) {
            return function (t) { return t === source ? anyType : t; };
        }
        function createBinaryTypeEraser(source1, source2) {
            return function (t) { return t === source1 || t === source2 ? anyType : t; };
        }
        function createTypeEraser(sources) {
            switch (sources.length) {
                case 1: return createUnaryTypeEraser(sources[0]);
                case 2: return createBinaryTypeEraser(sources[0], sources[1]);
            }
            return function (t) {
                for (var i = 0; i < sources.length; i++) {
                    if (t === sources[i])
                        return anyType;
                }
                return t;
            };
        }
        function createInferenceMapper(context) {
            return function (t) {
                for (var i = 0; i < context.typeParameters.length; i++) {
                    if (t === context.typeParameters[i]) {
                        return getInferredType(context, i);
                    }
                }
                return t;
            };
        }
        function identityMapper(type) {
            return type;
        }
        function combineTypeMappers(mapper1, mapper2) {
            return function (t) { return mapper2(mapper1(t)); };
        }
        function instantiateTypeParameter(typeParameter, mapper) {
            var result = createType(ts.TypeFlags.TypeParameter);
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
        function instantiateSignature(signature, mapper, eraseTypeParameters) {
            if (signature.typeParameters && !eraseTypeParameters) {
                var freshTypeParameters = instantiateList(signature.typeParameters, mapper, instantiateTypeParameter);
                mapper = combineTypeMappers(createTypeMapper(signature.typeParameters, freshTypeParameters), mapper);
            }
            var result = createSignature(signature.declaration, freshTypeParameters, instantiateList(signature.parameters, mapper, instantiateSymbol), signature.resolvedReturnType ? instantiateType(signature.resolvedReturnType, mapper) : undefined, signature.minArgumentCount, signature.hasRestParameter, signature.hasStringLiterals);
            result.target = signature;
            result.mapper = mapper;
            return result;
        }
        function instantiateSymbol(symbol, mapper) {
            if (symbol.flags & ts.SymbolFlags.Instantiated) {
                var links = getSymbolLinks(symbol);
                // If symbol being instantiated is itself a instantiation, fetch the original target and combine the
                // type mappers. This ensures that original type identities are properly preserved and that aliases
                // always reference a non-aliases.
                symbol = links.target;
                mapper = combineTypeMappers(links.mapper, mapper);
            }
            // Keep the flags from the symbol we're instantiating.  Mark that is instantiated, and 
            // also transient so that we can just store data on it directly.
            var result = createSymbol(ts.SymbolFlags.Instantiated | ts.SymbolFlags.Transient | symbol.flags, symbol.name);
            result.declarations = symbol.declarations;
            result.parent = symbol.parent;
            result.target = symbol;
            result.mapper = mapper;
            if (symbol.valueDeclaration) {
                result.valueDeclaration = symbol.valueDeclaration;
            }
            return result;
        }
        function instantiateAnonymousType(type, mapper) {
            var result = createObjectType(ts.TypeFlags.Anonymous, type.symbol);
            result.properties = instantiateList(getPropertiesOfObjectType(type), mapper, instantiateSymbol);
            result.members = createSymbolTable(result.properties);
            result.callSignatures = instantiateList(getSignaturesOfType(type, ts.SignatureKind.Call), mapper, instantiateSignature);
            result.constructSignatures = instantiateList(getSignaturesOfType(type, ts.SignatureKind.Construct), mapper, instantiateSignature);
            var stringIndexType = getIndexTypeOfType(type, ts.IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, ts.IndexKind.Number);
            if (stringIndexType)
                result.stringIndexType = instantiateType(stringIndexType, mapper);
            if (numberIndexType)
                result.numberIndexType = instantiateType(numberIndexType, mapper);
            return result;
        }
        function instantiateType(type, mapper) {
            if (mapper !== identityMapper) {
                if (type.flags & ts.TypeFlags.TypeParameter) {
                    return mapper(type);
                }
                if (type.flags & ts.TypeFlags.Anonymous) {
                    return type.symbol && type.symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Method | ts.SymbolFlags.TypeLiteral | ts.SymbolFlags.ObjectLiteral) ? instantiateAnonymousType(type, mapper) : type;
                }
                if (type.flags & ts.TypeFlags.Reference) {
                    return createTypeReference(type.target, instantiateList(type.typeArguments, mapper, instantiateType));
                }
                if (type.flags & ts.TypeFlags.Tuple) {
                    return createTupleType(instantiateList(type.elementTypes, mapper, instantiateType));
                }
                if (type.flags & ts.TypeFlags.Union) {
                    return getUnionType(instantiateList(type.types, mapper, instantiateType), true);
                }
            }
            return type;
        }
        // Returns true if the given expression contains (at any level of nesting) a function or arrow expression
        // that is subject to contextual typing.
        function isContextSensitive(node) {
            ts.Debug.assert(node.kind !== ts.SyntaxKind.MethodDeclaration || ts.isObjectLiteralMethod(node));
            switch (node.kind) {
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    return isContextSensitiveFunctionLikeDeclaration(node);
                case ts.SyntaxKind.ObjectLiteralExpression:
                    return ts.forEach(node.properties, isContextSensitive);
                case ts.SyntaxKind.ArrayLiteralExpression:
                    return ts.forEach(node.elements, isContextSensitive);
                case ts.SyntaxKind.ConditionalExpression:
                    return isContextSensitive(node.whenTrue) || isContextSensitive(node.whenFalse);
                case ts.SyntaxKind.BinaryExpression:
                    return node.operator === ts.SyntaxKind.BarBarToken && (isContextSensitive(node.left) || isContextSensitive(node.right));
                case ts.SyntaxKind.PropertyAssignment:
                    return isContextSensitive(node.initializer);
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                    return isContextSensitiveFunctionLikeDeclaration(node);
                case ts.SyntaxKind.ParenthesizedExpression:
                    return isContextSensitive(node.expression);
            }
            return false;
        }
        function isContextSensitiveFunctionLikeDeclaration(node) {
            return !node.typeParameters && node.parameters.length && !ts.forEach(node.parameters, function (p) { return p.type; });
        }
        function getTypeWithoutConstructors(type) {
            if (type.flags & ts.TypeFlags.ObjectType) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                if (resolved.constructSignatures.length) {
                    var result = createObjectType(ts.TypeFlags.Anonymous, type.symbol);
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
        var subtypeRelation = {};
        var assignableRelation = {};
        var identityRelation = {};
        function isTypeIdenticalTo(source, target) {
            return checkTypeRelatedTo(source, target, identityRelation, undefined);
        }
        function compareTypes(source, target) {
            return checkTypeRelatedTo(source, target, identityRelation, undefined) ? ts.Ternary.True : ts.Ternary.False;
        }
        function isTypeSubtypeOf(source, target) {
            return checkTypeSubtypeOf(source, target, undefined);
        }
        function isTypeAssignableTo(source, target) {
            return checkTypeAssignableTo(source, target, undefined);
        }
        function checkTypeSubtypeOf(source, target, errorNode, headMessage, containingMessageChain) {
            return checkTypeRelatedTo(source, target, subtypeRelation, errorNode, headMessage, containingMessageChain);
        }
        function checkTypeAssignableTo(source, target, errorNode, headMessage) {
            return checkTypeRelatedTo(source, target, assignableRelation, errorNode, headMessage);
        }
        function isSignatureAssignableTo(source, target) {
            var sourceType = getOrCreateTypeFromSignature(source);
            var targetType = getOrCreateTypeFromSignature(target);
            return checkTypeRelatedTo(sourceType, targetType, assignableRelation, undefined);
        }
        function checkTypeRelatedTo(source, target, relation, errorNode, headMessage, containingMessageChain) {
            var errorInfo;
            var sourceStack;
            var targetStack;
            var maybeStack;
            var expandingFlags;
            var depth = 0;
            var overflow = false;
            ts.Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");
            var result = isRelatedTo(source, target, errorNode !== undefined, headMessage);
            if (overflow) {
                error(errorNode, ts.Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
            }
            else if (errorInfo) {
                // If we already computed this relation, but in a context where we didn't want to report errors (e.g. overload resolution),
                // then we'll only have a top-level error (e.g. 'Class X does not implement interface Y') without any details. If this happened,
                // request a recompuation to get a complete error message. This will be skipped if we've already done this computation in a context
                // where errors were being reported.
                if (errorInfo.next === undefined) {
                    errorInfo = undefined;
                    isRelatedTo(source, target, errorNode !== undefined, headMessage, true);
                }
                if (containingMessageChain) {
                    errorInfo = ts.concatenateDiagnosticMessageChains(containingMessageChain, errorInfo);
                }
                addDiagnostic(ts.createDiagnosticForNodeFromMessageChain(errorNode, errorInfo, host.getCompilerHost().getNewLine()));
            }
            return result !== ts.Ternary.False;
            function reportError(message, arg0, arg1, arg2) {
                errorInfo = ts.chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2);
            }
            // Compare two types and return
            // Ternary.True if they are related with no assumptions,
            // Ternary.Maybe if they are related with assumptions of other relationships, or
            // Ternary.False if they are not related.
            function isRelatedTo(source, target, reportErrors, headMessage, mustRecompute) {
                if (mustRecompute === void 0) { mustRecompute = false; }
                var result;
                // both types are the same - covers 'they are the same primitive type or both are Any' or the same type parameter cases
                if (source === target)
                    return ts.Ternary.True;
                if (relation !== identityRelation) {
                    if (target.flags & ts.TypeFlags.Any)
                        return ts.Ternary.True;
                    if (source === undefinedType)
                        return ts.Ternary.True;
                    if (source === nullType && target !== undefinedType)
                        return ts.Ternary.True;
                    if (source.flags & ts.TypeFlags.Enum && target === numberType)
                        return ts.Ternary.True;
                    if (source.flags & ts.TypeFlags.StringLiteral && target === stringType)
                        return ts.Ternary.True;
                    if (relation === assignableRelation) {
                        if (source.flags & ts.TypeFlags.Any)
                            return ts.Ternary.True;
                        if (source === numberType && target.flags & ts.TypeFlags.Enum)
                            return ts.Ternary.True;
                    }
                }
                if (source.flags & ts.TypeFlags.Union || target.flags & ts.TypeFlags.Union) {
                    if (relation === identityRelation) {
                        if (source.flags & ts.TypeFlags.Union && target.flags & ts.TypeFlags.Union) {
                            if (result = unionTypeRelatedToUnionType(source, target)) {
                                if (result &= unionTypeRelatedToUnionType(target, source)) {
                                    return result;
                                }
                            }
                        }
                        else if (source.flags & ts.TypeFlags.Union) {
                            if (result = unionTypeRelatedToType(source, target, reportErrors)) {
                                return result;
                            }
                        }
                        else {
                            if (result = unionTypeRelatedToType(target, source, reportErrors)) {
                                return result;
                            }
                        }
                    }
                    else {
                        if (source.flags & ts.TypeFlags.Union) {
                            if (result = unionTypeRelatedToType(source, target, reportErrors)) {
                                return result;
                            }
                        }
                        else {
                            if (result = typeRelatedToUnionType(source, target, reportErrors)) {
                                return result;
                            }
                        }
                    }
                }
                else if (source.flags & ts.TypeFlags.TypeParameter && target.flags & ts.TypeFlags.TypeParameter) {
                    if (result = typeParameterRelatedTo(source, target, reportErrors)) {
                        return result;
                    }
                }
                else {
                    var saveErrorInfo = errorInfo;
                    if (source.flags & ts.TypeFlags.Reference && target.flags & ts.TypeFlags.Reference && source.target === target.target) {
                        // We have type references to same target type, see if relationship holds for all type arguments
                        if (result = typesRelatedTo(source.typeArguments, target.typeArguments, reportErrors)) {
                            return result;
                        }
                    }
                    // Even if relationship doesn't hold for type arguments, it may hold in a structural comparison
                    // Report structural errors only if we haven't reported any errors yet
                    var reportStructuralErrors = reportErrors && errorInfo === saveErrorInfo;
                    // identity relation does not use apparent type
                    var sourceOrApparentType = relation === identityRelation ? source : getApparentType(source);
                    if (sourceOrApparentType.flags & ts.TypeFlags.ObjectType && target.flags & ts.TypeFlags.ObjectType && (result = objectTypeRelatedTo(sourceOrApparentType, target, reportStructuralErrors, mustRecompute))) {
                        errorInfo = saveErrorInfo;
                        return result;
                    }
                }
                if (reportErrors) {
                    headMessage = headMessage || ts.Diagnostics.Type_0_is_not_assignable_to_type_1;
                    reportError(headMessage, typeToString(source), typeToString(target));
                }
                return ts.Ternary.False;
            }
            function unionTypeRelatedToUnionType(source, target) {
                var result = ts.Ternary.True;
                var sourceTypes = source.types;
                for (var i = 0, len = sourceTypes.length; i < len; i++) {
                    var related = typeRelatedToUnionType(sourceTypes[i], target, false);
                    if (!related) {
                        return ts.Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }
            function typeRelatedToUnionType(source, target, reportErrors) {
                var targetTypes = target.types;
                for (var i = 0, len = targetTypes.length; i < len; i++) {
                    var related = isRelatedTo(source, targetTypes[i], reportErrors && i === len - 1);
                    if (related) {
                        return related;
                    }
                }
                return ts.Ternary.False;
            }
            function unionTypeRelatedToType(source, target, reportErrors) {
                var result = ts.Ternary.True;
                var sourceTypes = source.types;
                for (var i = 0, len = sourceTypes.length; i < len; i++) {
                    var related = isRelatedTo(sourceTypes[i], target, reportErrors);
                    if (!related) {
                        return ts.Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }
            function typesRelatedTo(sources, targets, reportErrors) {
                var result = ts.Ternary.True;
                for (var i = 0, len = sources.length; i < len; i++) {
                    var related = isRelatedTo(sources[i], targets[i], reportErrors);
                    if (!related) {
                        return ts.Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }
            function typeParameterRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    if (source.symbol.name !== target.symbol.name) {
                        return ts.Ternary.False;
                    }
                    // covers case when both type parameters does not have constraint (both equal to noConstraintType)
                    if (source.constraint === target.constraint) {
                        return ts.Ternary.True;
                    }
                    if (source.constraint === noConstraintType || target.constraint === noConstraintType) {
                        return ts.Ternary.False;
                    }
                    return isRelatedTo(source.constraint, target.constraint, reportErrors);
                }
                else {
                    while (true) {
                        var constraint = getConstraintOfTypeParameter(source);
                        if (constraint === target)
                            return ts.Ternary.True;
                        if (!(constraint && constraint.flags & ts.TypeFlags.TypeParameter))
                            break;
                        source = constraint;
                    }
                    return ts.Ternary.False;
                }
            }
            // Determine if two object types are related by structure. First, check if the result is already available in the global cache.
            // Second, check if we have already started a comparison of the given two types in which case we assume the result to be true.
            // Third, check if both types are part of deeply nested chains of generic type instantiations and if so assume the types are
            // equal and infinitely expanding. Fourth, if we have reached a depth of 100 nested comparisons, assume we have runaway recursion
            // and issue an error. Otherwise, actually compare the structure of the two types.
            function objectTypeRelatedTo(source, target, reportErrors, elaborateErrors) {
                if (elaborateErrors === void 0) { elaborateErrors = false; }
                if (overflow) {
                    return ts.Ternary.False;
                }
                var id = relation !== identityRelation || source.id < target.id ? source.id + "," + target.id : target.id + "," + source.id;
                var related = relation[id];
                if (related !== undefined) {
                    if (!elaborateErrors || related === ts.RelationComparisonResult.FailedAndReported) {
                        return related === ts.RelationComparisonResult.Succeeded ? ts.Ternary.True : ts.Ternary.False;
                    }
                }
                if (depth > 0) {
                    for (var i = 0; i < depth; i++) {
                        // If source and target are already being compared, consider them related with assumptions
                        if (maybeStack[i][id]) {
                            return ts.Ternary.Maybe;
                        }
                    }
                    if (depth === 100) {
                        overflow = true;
                        return ts.Ternary.False;
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
                maybeStack[depth][id] = true;
                depth++;
                var saveExpandingFlags = expandingFlags;
                if (!(expandingFlags & 1) && isDeeplyNestedGeneric(source, sourceStack))
                    expandingFlags |= 1;
                if (!(expandingFlags & 2) && isDeeplyNestedGeneric(target, targetStack))
                    expandingFlags |= 2;
                if (expandingFlags === 3) {
                    var result = ts.Ternary.Maybe;
                }
                else {
                    var result = propertiesRelatedTo(source, target, reportErrors);
                    if (result) {
                        result &= signaturesRelatedTo(source, target, ts.SignatureKind.Call, reportErrors);
                        if (result) {
                            result &= signaturesRelatedTo(source, target, ts.SignatureKind.Construct, reportErrors);
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
                    var destinationCache = result === ts.Ternary.True || depth === 0 ? relation : maybeStack[depth - 1];
                    for (var key in maybeCache) {
                        destinationCache[key] = maybeCache[key] ? ts.RelationComparisonResult.Succeeded : ts.RelationComparisonResult.Failed;
                    }
                }
                else {
                    // A false result goes straight into global cache (when something is false under assumptions it
                    // will also be false without assumptions)
                    relation[id] = reportErrors ? ts.RelationComparisonResult.FailedAndReported : ts.RelationComparisonResult.Failed;
                }
                return result;
            }
            // Return true if the given type is part of a deeply nested chain of generic instantiations. We consider this to be the case
            // when structural type comparisons have been started for 10 or more instantiations of the same generic type. It is possible,
            // though highly unlikely, for this test to be true in a situation where a chain of instantiations is not infinitely expanding.
            // Effectively, we will generate a false positive when two types are structurally equal to at least 10 levels, but unequal at
            // some level beyond that.
            function isDeeplyNestedGeneric(type, stack) {
                if (type.flags & ts.TypeFlags.Reference && depth >= 10) {
                    var target = type.target;
                    var count = 0;
                    for (var i = 0; i < depth; i++) {
                        var t = stack[i];
                        if (t.flags & ts.TypeFlags.Reference && t.target === target) {
                            count++;
                            if (count >= 10)
                                return true;
                        }
                    }
                }
                return false;
            }
            function propertiesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return propertiesIdenticalTo(source, target);
                }
                var result = ts.Ternary.True;
                var properties = getPropertiesOfObjectType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfType(source, targetProp.name);
                    if (sourceProp !== targetProp) {
                        if (!sourceProp) {
                            if (relation === subtypeRelation || !(targetProp.flags & ts.SymbolFlags.Optional)) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_missing_in_type_1, symbolToString(targetProp), typeToString(source));
                                }
                                return ts.Ternary.False;
                            }
                        }
                        else if (!(targetProp.flags & ts.SymbolFlags.Prototype)) {
                            var sourceFlags = getDeclarationFlagsFromSymbol(sourceProp);
                            var targetFlags = getDeclarationFlagsFromSymbol(targetProp);
                            if (sourceFlags & ts.NodeFlags.Private || targetFlags & ts.NodeFlags.Private) {
                                if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                                    if (reportErrors) {
                                        if (sourceFlags & ts.NodeFlags.Private && targetFlags & ts.NodeFlags.Private) {
                                            reportError(ts.Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                        }
                                        else {
                                            reportError(ts.Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp), typeToString(sourceFlags & ts.NodeFlags.Private ? source : target), typeToString(sourceFlags & ts.NodeFlags.Private ? target : source));
                                        }
                                    }
                                    return ts.Ternary.False;
                                }
                            }
                            else if (targetFlags & ts.NodeFlags.Protected) {
                                var sourceDeclaredInClass = sourceProp.parent && sourceProp.parent.flags & ts.SymbolFlags.Class;
                                var sourceClass = sourceDeclaredInClass ? getDeclaredTypeOfSymbol(sourceProp.parent) : undefined;
                                var targetClass = getDeclaredTypeOfSymbol(targetProp.parent);
                                if (!sourceClass || !hasBaseType(sourceClass, targetClass)) {
                                    if (reportErrors) {
                                        reportError(ts.Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, symbolToString(targetProp), typeToString(sourceClass || source), typeToString(targetClass));
                                    }
                                    return ts.Ternary.False;
                                }
                            }
                            else if (sourceFlags & ts.NodeFlags.Protected) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return ts.Ternary.False;
                            }
                            var related = isRelatedTo(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
                            if (!related) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                                }
                                return ts.Ternary.False;
                            }
                            result &= related;
                            if (sourceProp.flags & ts.SymbolFlags.Optional && !(targetProp.flags & ts.SymbolFlags.Optional)) {
                                // TypeScript 1.0 spec (April 2014): 3.8.3
                                // S is a subtype of a type T, and T is a supertype of S if ...
                                // S' and T are object types and, for each member M in T..
                                // M is a property and S' contains a property N where
                                // if M is a required property, N is also a required property 
                                // (M - property in T)
                                // (N - property in S)
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return ts.Ternary.False;
                            }
                        }
                    }
                }
                return result;
            }
            function propertiesIdenticalTo(source, target) {
                var sourceProperties = getPropertiesOfObjectType(source);
                var targetProperties = getPropertiesOfObjectType(target);
                if (sourceProperties.length !== targetProperties.length) {
                    return ts.Ternary.False;
                }
                var result = ts.Ternary.True;
                for (var i = 0, len = sourceProperties.length; i < len; ++i) {
                    var sourceProp = sourceProperties[i];
                    var targetProp = getPropertyOfObjectType(target, sourceProp.name);
                    if (!targetProp) {
                        return ts.Ternary.False;
                    }
                    var related = compareProperties(sourceProp, targetProp, isRelatedTo);
                    if (!related) {
                        return ts.Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }
            function signaturesRelatedTo(source, target, kind, reportErrors) {
                if (relation === identityRelation) {
                    return signaturesIdenticalTo(source, target, kind);
                }
                if (target === anyFunctionType || source === anyFunctionType) {
                    return ts.Ternary.True;
                }
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var result = ts.Ternary.True;
                var saveErrorInfo = errorInfo;
                outer: for (var i = 0; i < targetSignatures.length; i++) {
                    var t = targetSignatures[i];
                    if (!t.hasStringLiterals || target.flags & ts.TypeFlags.FromSignature) {
                        var localErrors = reportErrors;
                        for (var j = 0; j < sourceSignatures.length; j++) {
                            var s = sourceSignatures[j];
                            if (!s.hasStringLiterals || source.flags & ts.TypeFlags.FromSignature) {
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
                        return ts.Ternary.False;
                    }
                }
                return result;
            }
            function signatureRelatedTo(source, target, reportErrors) {
                if (source === target) {
                    return ts.Ternary.True;
                }
                if (!target.hasRestParameter && source.minArgumentCount > target.parameters.length) {
                    return ts.Ternary.False;
                }
                var sourceMax = source.parameters.length;
                var targetMax = target.parameters.length;
                var checkCount;
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
                var result = ts.Ternary.True;
                for (var i = 0; i < checkCount; i++) {
                    var s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                    var t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                    var saveErrorInfo = errorInfo;
                    var related = isRelatedTo(s, t, reportErrors);
                    if (!related) {
                        related = isRelatedTo(t, s, false);
                        if (!related) {
                            if (reportErrors) {
                                reportError(ts.Diagnostics.Types_of_parameters_0_and_1_are_incompatible, source.parameters[i < sourceMax ? i : sourceMax].name, target.parameters[i < targetMax ? i : targetMax].name);
                            }
                            return ts.Ternary.False;
                        }
                        errorInfo = saveErrorInfo;
                    }
                    result &= related;
                }
                var t = getReturnTypeOfSignature(target);
                if (t === voidType)
                    return result;
                var s = getReturnTypeOfSignature(source);
                return result & isRelatedTo(s, t, reportErrors);
            }
            function signaturesIdenticalTo(source, target, kind) {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                if (sourceSignatures.length !== targetSignatures.length) {
                    return ts.Ternary.False;
                }
                var result = ts.Ternary.True;
                for (var i = 0, len = sourceSignatures.length; i < len; ++i) {
                    var related = compareSignatures(sourceSignatures[i], targetSignatures[i], true, isRelatedTo);
                    if (!related) {
                        return ts.Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }
            function stringIndexTypesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(ts.IndexKind.String, source, target);
                }
                var targetType = getIndexTypeOfType(target, ts.IndexKind.String);
                if (targetType) {
                    var sourceType = getIndexTypeOfType(source, ts.IndexKind.String);
                    if (!sourceType) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return ts.Ternary.False;
                    }
                    var related = isRelatedTo(sourceType, targetType, reportErrors);
                    if (!related) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signatures_are_incompatible);
                        }
                        return ts.Ternary.False;
                    }
                    return related;
                }
                return ts.Ternary.True;
            }
            function numberIndexTypesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(ts.IndexKind.Number, source, target);
                }
                var targetType = getIndexTypeOfType(target, ts.IndexKind.Number);
                if (targetType) {
                    var sourceStringType = getIndexTypeOfType(source, ts.IndexKind.String);
                    var sourceNumberType = getIndexTypeOfType(source, ts.IndexKind.Number);
                    if (!(sourceStringType || sourceNumberType)) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return ts.Ternary.False;
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
                            reportError(ts.Diagnostics.Index_signatures_are_incompatible);
                        }
                        return ts.Ternary.False;
                    }
                    return related;
                }
                return ts.Ternary.True;
            }
            function indexTypesIdenticalTo(indexKind, source, target) {
                var targetType = getIndexTypeOfType(target, indexKind);
                var sourceType = getIndexTypeOfType(source, indexKind);
                if (!sourceType && !targetType) {
                    return ts.Ternary.True;
                }
                if (sourceType && targetType) {
                    return isRelatedTo(sourceType, targetType);
                }
                return ts.Ternary.False;
            }
        }
        function isPropertyIdenticalTo(sourceProp, targetProp) {
            return compareProperties(sourceProp, targetProp, compareTypes) !== ts.Ternary.False;
        }
        function compareProperties(sourceProp, targetProp, compareTypes) {
            // Two members are considered identical when
            // - they are public properties with identical names, optionality, and types,
            // - they are private or protected properties originating in the same declaration and having identical types
            if (sourceProp === targetProp) {
                return ts.Ternary.True;
            }
            var sourcePropAccessibility = getDeclarationFlagsFromSymbol(sourceProp) & (ts.NodeFlags.Private | ts.NodeFlags.Protected);
            var targetPropAccessibility = getDeclarationFlagsFromSymbol(targetProp) & (ts.NodeFlags.Private | ts.NodeFlags.Protected);
            if (sourcePropAccessibility !== targetPropAccessibility) {
                return ts.Ternary.False;
            }
            if (sourcePropAccessibility) {
                if (getTargetSymbol(sourceProp) !== getTargetSymbol(targetProp)) {
                    return ts.Ternary.False;
                }
            }
            else {
                if ((sourceProp.flags & ts.SymbolFlags.Optional) !== (targetProp.flags & ts.SymbolFlags.Optional)) {
                    return ts.Ternary.False;
                }
            }
            return compareTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
        }
        function compareSignatures(source, target, compareReturnTypes, compareTypes) {
            if (source === target) {
                return ts.Ternary.True;
            }
            if (source.parameters.length !== target.parameters.length || source.minArgumentCount !== target.minArgumentCount || source.hasRestParameter !== target.hasRestParameter) {
                return ts.Ternary.False;
            }
            var result = ts.Ternary.True;
            if (source.typeParameters && target.typeParameters) {
                if (source.typeParameters.length !== target.typeParameters.length) {
                    return ts.Ternary.False;
                }
                for (var i = 0, len = source.typeParameters.length; i < len; ++i) {
                    var related = compareTypes(source.typeParameters[i], target.typeParameters[i]);
                    if (!related) {
                        return ts.Ternary.False;
                    }
                    result &= related;
                }
            }
            else if (source.typeParameters || target.typeParameters) {
                return ts.Ternary.False;
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
                    return ts.Ternary.False;
                }
                result &= related;
            }
            if (compareReturnTypes) {
                result &= compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            return result;
        }
        function isSupertypeOfEach(candidate, types) {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && !isTypeSubtypeOf(types[i], candidate))
                    return false;
            }
            return true;
        }
        function getCommonSupertype(types) {
            return ts.forEach(types, function (t) { return isSupertypeOfEach(t, types) ? t : undefined; });
        }
        function reportNoCommonSupertypeError(types, errorLocation, errorMessageChainHead) {
            var bestSupertype;
            var bestSupertypeDownfallType; // The type that caused bestSupertype not to be the common supertype
            var bestSupertypeScore = 0;
            for (var i = 0; i < types.length; i++) {
                var score = 0;
                var downfallType = undefined;
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
            checkTypeSubtypeOf(bestSupertypeDownfallType, bestSupertype, errorLocation, ts.Diagnostics.Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0, errorMessageChainHead);
        }
        function isTypeOfObjectLiteral(type) {
            return (type.flags & ts.TypeFlags.Anonymous) && type.symbol && (type.symbol.flags & ts.SymbolFlags.ObjectLiteral) ? true : false;
        }
        function isArrayType(type) {
            return type.flags & ts.TypeFlags.Reference && type.target === globalArrayType;
        }
        function isTupleLikeType(type) {
            return !!getPropertyOfType(type, "0");
        }
        function getWidenedTypeOfObjectLiteral(type) {
            var properties = getPropertiesOfObjectType(type);
            var members = {};
            ts.forEach(properties, function (p) {
                var symbol = createSymbol(p.flags | ts.SymbolFlags.Transient, p.name);
                symbol.declarations = p.declarations;
                symbol.parent = p.parent;
                symbol.type = getWidenedType(getTypeOfSymbol(p));
                symbol.target = p;
                if (p.valueDeclaration)
                    symbol.valueDeclaration = p.valueDeclaration;
                members[symbol.name] = symbol;
            });
            var stringIndexType = getIndexTypeOfType(type, ts.IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, ts.IndexKind.Number);
            if (stringIndexType)
                stringIndexType = getWidenedType(stringIndexType);
            if (numberIndexType)
                numberIndexType = getWidenedType(numberIndexType);
            return createAnonymousType(type.symbol, members, emptyArray, emptyArray, stringIndexType, numberIndexType);
        }
        function getWidenedType(type) {
            if (type.flags & ts.TypeFlags.Unwidened) {
                if (type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) {
                    return anyType;
                }
                if (type.flags & ts.TypeFlags.Union) {
                    return getUnionType(ts.map(type.types, getWidenedType));
                }
                if (isTypeOfObjectLiteral(type)) {
                    return getWidenedTypeOfObjectLiteral(type);
                }
                if (isArrayType(type)) {
                    return createArrayType(getWidenedType(type.typeArguments[0]));
                }
            }
            return type;
        }
        function reportWideningErrorsInType(type) {
            if (type.flags & ts.TypeFlags.Union) {
                var errorReported = false;
                ts.forEach(type.types, function (t) {
                    if (reportWideningErrorsInType(t)) {
                        errorReported = true;
                    }
                });
                return errorReported;
            }
            if (isArrayType(type)) {
                return reportWideningErrorsInType(type.typeArguments[0]);
            }
            if (isTypeOfObjectLiteral(type)) {
                var errorReported = false;
                ts.forEach(getPropertiesOfObjectType(type), function (p) {
                    var t = getTypeOfSymbol(p);
                    if (t.flags & ts.TypeFlags.Unwidened) {
                        if (!reportWideningErrorsInType(t)) {
                            error(p.valueDeclaration, ts.Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, p.name, typeToString(getWidenedType(t)));
                        }
                        errorReported = true;
                    }
                });
                return errorReported;
            }
            return false;
        }
        function reportImplicitAnyError(declaration, type) {
            var typeAsString = typeToString(getWidenedType(type));
            switch (declaration.kind) {
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                    var diagnostic = ts.Diagnostics.Member_0_implicitly_has_an_1_type;
                    break;
                case ts.SyntaxKind.Parameter:
                    var diagnostic = declaration.dotDotDotToken ? ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type : ts.Diagnostics.Parameter_0_implicitly_has_an_1_type;
                    break;
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    if (!declaration.name) {
                        error(declaration, ts.Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                        return;
                    }
                    var diagnostic = ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                    break;
                default:
                    var diagnostic = ts.Diagnostics.Variable_0_implicitly_has_an_1_type;
            }
            error(declaration, diagnostic, ts.declarationNameToString(declaration.name), typeAsString);
        }
        function reportErrorsFromWidening(declaration, type) {
            if (produceDiagnostics && compilerOptions.noImplicitAny && type.flags & ts.TypeFlags.Unwidened) {
                // Report implicit any error within type if possible, otherwise report error on declaration
                if (!reportWideningErrorsInType(type)) {
                    reportImplicitAnyError(declaration, type);
                }
            }
        }
        function forEachMatchingParameterType(source, target, callback) {
            var sourceMax = source.parameters.length;
            var targetMax = target.parameters.length;
            var count;
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
        function createInferenceContext(typeParameters, inferUnionTypes) {
            var inferences = [];
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
        function inferTypes(context, source, target) {
            var sourceStack;
            var targetStack;
            var depth = 0;
            var inferiority = 0;
            inferFromTypes(source, target);
            function isInProcess(source, target) {
                for (var i = 0; i < depth; i++) {
                    if (source === sourceStack[i] && target === targetStack[i])
                        return true;
                }
                return false;
            }
            function isWithinDepthLimit(type, stack) {
                if (depth >= 5) {
                    var target = type.target;
                    var count = 0;
                    for (var i = 0; i < depth; i++) {
                        var t = stack[i];
                        if (t.flags & ts.TypeFlags.Reference && t.target === target)
                            count++;
                    }
                    return count < 5;
                }
                return true;
            }
            function inferFromTypes(source, target) {
                if (target.flags & ts.TypeFlags.TypeParameter) {
                    // If target is a type parameter, make an inference
                    var typeParameters = context.typeParameters;
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (target === typeParameters[i]) {
                            var inferences = context.inferences[i];
                            var candidates = inferiority ? inferences.secondary || (inferences.secondary = []) : inferences.primary || (inferences.primary = []);
                            if (!ts.contains(candidates, source))
                                candidates.push(source);
                            break;
                        }
                    }
                }
                else if (source.flags & ts.TypeFlags.Reference && target.flags & ts.TypeFlags.Reference && source.target === target.target) {
                    // If source and target are references to the same generic type, infer from type arguments
                    var sourceTypes = source.typeArguments;
                    var targetTypes = target.typeArguments;
                    for (var i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], targetTypes[i]);
                    }
                }
                else if (target.flags & ts.TypeFlags.Union) {
                    var targetTypes = target.types;
                    var typeParameterCount = 0;
                    var typeParameter;
                    for (var i = 0; i < targetTypes.length; i++) {
                        var t = targetTypes[i];
                        if (t.flags & ts.TypeFlags.TypeParameter && ts.contains(context.typeParameters, t)) {
                            typeParameter = t;
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
                else if (source.flags & ts.TypeFlags.Union) {
                    // Source is a union type, infer from each consituent type
                    var sourceTypes = source.types;
                    for (var i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], target);
                    }
                }
                else if (source.flags & ts.TypeFlags.ObjectType && (target.flags & (ts.TypeFlags.Reference | ts.TypeFlags.Tuple) || (target.flags & ts.TypeFlags.Anonymous) && target.symbol && target.symbol.flags & (ts.SymbolFlags.Method | ts.SymbolFlags.TypeLiteral))) {
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
                        inferFromSignatures(source, target, ts.SignatureKind.Call);
                        inferFromSignatures(source, target, ts.SignatureKind.Construct);
                        inferFromIndexTypes(source, target, ts.IndexKind.String, ts.IndexKind.String);
                        inferFromIndexTypes(source, target, ts.IndexKind.Number, ts.IndexKind.Number);
                        inferFromIndexTypes(source, target, ts.IndexKind.String, ts.IndexKind.Number);
                        depth--;
                    }
                }
            }
            function inferFromProperties(source, target) {
                var properties = getPropertiesOfObjectType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfObjectType(source, targetProp.name);
                    if (sourceProp) {
                        inferFromTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
                    }
                }
            }
            function inferFromSignatures(source, target, kind) {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var sourceLen = sourceSignatures.length;
                var targetLen = targetSignatures.length;
                var len = sourceLen < targetLen ? sourceLen : targetLen;
                for (var i = 0; i < len; i++) {
                    inferFromSignature(getErasedSignature(sourceSignatures[sourceLen - len + i]), getErasedSignature(targetSignatures[targetLen - len + i]));
                }
            }
            function inferFromSignature(source, target) {
                forEachMatchingParameterType(source, target, inferFromTypes);
                inferFromTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            function inferFromIndexTypes(source, target, sourceKind, targetKind) {
                var targetIndexType = getIndexTypeOfType(target, targetKind);
                if (targetIndexType) {
                    var sourceIndexType = getIndexTypeOfType(source, sourceKind);
                    if (sourceIndexType) {
                        inferFromTypes(sourceIndexType, targetIndexType);
                    }
                }
            }
        }
        function getInferenceCandidates(context, index) {
            var inferences = context.inferences[index];
            return inferences.primary || inferences.secondary || emptyArray;
        }
        function getInferredType(context, index) {
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
        function getInferredTypes(context) {
            for (var i = 0; i < context.inferredTypes.length; i++) {
                getInferredType(context, i);
            }
            return context.inferredTypes;
        }
        function hasAncestor(node, kind) {
            return ts.getAncestor(node, kind) !== undefined;
        }
        // EXPRESSION TYPE CHECKING
        function getResolvedSymbol(node) {
            var links = getNodeLinks(node);
            if (!links.resolvedSymbol) {
                links.resolvedSymbol = (ts.getFullWidth(node) > 0 && resolveName(node, node.text, ts.SymbolFlags.Value | ts.SymbolFlags.ExportValue, ts.Diagnostics.Cannot_find_name_0, node)) || unknownSymbol;
            }
            return links.resolvedSymbol;
        }
        function isInTypeQuery(node) {
            while (node) {
                switch (node.kind) {
                    case ts.SyntaxKind.TypeQuery:
                        return true;
                    case ts.SyntaxKind.Identifier:
                    case ts.SyntaxKind.QualifiedName:
                        node = node.parent;
                        continue;
                    default:
                        return false;
                }
            }
            ts.Debug.fail("should not get here");
        }
        // Remove one or more primitive types from a union type
        function subtractPrimitiveTypes(type, subtractMask) {
            if (type.flags & ts.TypeFlags.Union) {
                var types = type.types;
                if (ts.forEach(types, function (t) { return t.flags & subtractMask; })) {
                    return getUnionType(ts.filter(types, function (t) { return !(t.flags & subtractMask); }));
                }
            }
            return type;
        }
        function hasInitializer(node) {
            return !!(node.initializer || ts.isBindingPattern(node.parent) && hasInitializer(node.parent.parent));
        }
        // Check if a given variable is assigned within a given syntax node
        function isVariableAssignedWithin(symbol, node) {
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
            function isAssignedInBinaryExpression(node) {
                if (node.operator >= ts.SyntaxKind.FirstAssignment && node.operator <= ts.SyntaxKind.LastAssignment) {
                    var n = node.left;
                    while (n.kind === ts.SyntaxKind.ParenthesizedExpression) {
                        n = n.expression;
                    }
                    if (n.kind === ts.SyntaxKind.Identifier && getResolvedSymbol(n) === symbol) {
                        return true;
                    }
                }
                return ts.forEachChild(node, isAssignedIn);
            }
            function isAssignedInVariableDeclaration(node) {
                if (!ts.isBindingPattern(node.name) && getSymbolOfNode(node) === symbol && hasInitializer(node)) {
                    return true;
                }
                return ts.forEachChild(node, isAssignedIn);
            }
            function isAssignedIn(node) {
                switch (node.kind) {
                    case ts.SyntaxKind.BinaryExpression:
                        return isAssignedInBinaryExpression(node);
                    case ts.SyntaxKind.VariableDeclaration:
                    case ts.SyntaxKind.BindingElement:
                        return isAssignedInVariableDeclaration(node);
                    case ts.SyntaxKind.ObjectBindingPattern:
                    case ts.SyntaxKind.ArrayBindingPattern:
                    case ts.SyntaxKind.ArrayLiteralExpression:
                    case ts.SyntaxKind.ObjectLiteralExpression:
                    case ts.SyntaxKind.PropertyAccessExpression:
                    case ts.SyntaxKind.ElementAccessExpression:
                    case ts.SyntaxKind.CallExpression:
                    case ts.SyntaxKind.NewExpression:
                    case ts.SyntaxKind.TypeAssertionExpression:
                    case ts.SyntaxKind.ParenthesizedExpression:
                    case ts.SyntaxKind.PrefixUnaryExpression:
                    case ts.SyntaxKind.DeleteExpression:
                    case ts.SyntaxKind.TypeOfExpression:
                    case ts.SyntaxKind.VoidExpression:
                    case ts.SyntaxKind.PostfixUnaryExpression:
                    case ts.SyntaxKind.ConditionalExpression:
                    case ts.SyntaxKind.SpreadElementExpression:
                    case ts.SyntaxKind.Block:
                    case ts.SyntaxKind.VariableStatement:
                    case ts.SyntaxKind.ExpressionStatement:
                    case ts.SyntaxKind.IfStatement:
                    case ts.SyntaxKind.DoStatement:
                    case ts.SyntaxKind.WhileStatement:
                    case ts.SyntaxKind.ForStatement:
                    case ts.SyntaxKind.ForInStatement:
                    case ts.SyntaxKind.ReturnStatement:
                    case ts.SyntaxKind.WithStatement:
                    case ts.SyntaxKind.SwitchStatement:
                    case ts.SyntaxKind.CaseClause:
                    case ts.SyntaxKind.DefaultClause:
                    case ts.SyntaxKind.LabeledStatement:
                    case ts.SyntaxKind.ThrowStatement:
                    case ts.SyntaxKind.TryStatement:
                    case ts.SyntaxKind.CatchClause:
                        return ts.forEachChild(node, isAssignedIn);
                }
                return false;
            }
        }
        function resolveLocation(node) {
            // Resolve location from top down towards node if it is a context sensitive expression
            // That helps in making sure not assigning types as any when resolved out of order
            var containerNodes = [];
            for (var parent = node.parent; parent; parent = parent.parent) {
                if ((ts.isExpression(parent) || ts.isObjectLiteralMethod(node)) && isContextSensitive(parent)) {
                    containerNodes.unshift(parent);
                }
            }
            ts.forEach(containerNodes, function (node) {
                getTypeOfNode(node);
            });
        }
        function getSymbolAtLocation(node) {
            resolveLocation(node);
            return getSymbolInfo(node);
        }
        function getTypeAtLocation(node) {
            resolveLocation(node);
            return getTypeOfNode(node);
        }
        function getTypeOfSymbolAtLocation(symbol, node) {
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
        function getNarrowedTypeOfSymbol(symbol, node) {
            var type = getTypeOfSymbol(symbol);
            // Only narrow when symbol is variable of type any or an object, union, or type parameter type
            if (node && symbol.flags & ts.SymbolFlags.Variable && type.flags & (ts.TypeFlags.Any | ts.TypeFlags.ObjectType | ts.TypeFlags.Union | ts.TypeFlags.TypeParameter)) {
                loop: while (node.parent) {
                    var child = node;
                    node = node.parent;
                    var narrowedType = type;
                    switch (node.kind) {
                        case ts.SyntaxKind.IfStatement:
                            // In a branch of an if statement, narrow based on controlling expression
                            if (child !== node.expression) {
                                narrowedType = narrowType(type, node.expression, child === node.thenStatement);
                            }
                            break;
                        case ts.SyntaxKind.ConditionalExpression:
                            // In a branch of a conditional expression, narrow based on controlling condition
                            if (child !== node.condition) {
                                narrowedType = narrowType(type, node.condition, child === node.whenTrue);
                            }
                            break;
                        case ts.SyntaxKind.BinaryExpression:
                            // In the right operand of an && or ||, narrow based on left operand
                            if (child === node.right) {
                                if (node.operator === ts.SyntaxKind.AmpersandAmpersandToken) {
                                    narrowedType = narrowType(type, node.left, true);
                                }
                                else if (node.operator === ts.SyntaxKind.BarBarToken) {
                                    narrowedType = narrowType(type, node.left, false);
                                }
                            }
                            break;
                        case ts.SyntaxKind.SourceFile:
                        case ts.SyntaxKind.ModuleDeclaration:
                        case ts.SyntaxKind.FunctionDeclaration:
                        case ts.SyntaxKind.MethodDeclaration:
                        case ts.SyntaxKind.MethodSignature:
                        case ts.SyntaxKind.GetAccessor:
                        case ts.SyntaxKind.SetAccessor:
                        case ts.SyntaxKind.Constructor:
                            break loop;
                    }
                    // Use narrowed type if it is a subtype and construct contains no assignments to variable
                    if (narrowedType !== type && isTypeSubtypeOf(narrowedType, type)) {
                        if (isVariableAssignedWithin(symbol, node)) {
                            break;
                        }
                        type = narrowedType;
                    }
                }
            }
            return type;
            function narrowTypeByEquality(type, expr, assumeTrue) {
                // Check that we have 'typeof <symbol>' on the left and string literal on the right
                if (expr.left.kind !== ts.SyntaxKind.TypeOfExpression || expr.right.kind !== ts.SyntaxKind.StringLiteral) {
                    return type;
                }
                var left = expr.left;
                var right = expr.right;
                if (left.expression.kind !== ts.SyntaxKind.Identifier || getResolvedSymbol(left.expression) !== symbol) {
                    return type;
                }
                var t = right.text;
                var checkType = t === "string" ? stringType : t === "number" ? numberType : t === "boolean" ? booleanType : emptyObjectType;
                if (expr.operator === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
                    assumeTrue = !assumeTrue;
                }
                if (assumeTrue) {
                    // The assumed result is true. If check was for a primitive type, that type is the narrowed type. Otherwise we can
                    // remove the primitive types from the narrowed type.
                    return checkType === emptyObjectType ? subtractPrimitiveTypes(type, ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean) : checkType;
                }
                else {
                    // The assumed result is false. If check was for a primitive type we can remove that type from the narrowed type.
                    // Otherwise we don't have enough information to do anything.
                    return checkType === emptyObjectType ? type : subtractPrimitiveTypes(type, checkType.flags);
                }
            }
            function narrowTypeByAnd(type, expr, assumeTrue) {
                if (assumeTrue) {
                    // The assumed result is true, therefore we narrow assuming each operand to be true.
                    return narrowType(narrowType(type, expr.left, true), expr.right, true);
                }
                else {
                    // The assumed result is false. This means either the first operand was false, or the first operand was true
                    // and the second operand was false. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, false),
                        narrowType(narrowType(type, expr.left, true), expr.right, false)
                    ]);
                }
            }
            function narrowTypeByOr(type, expr, assumeTrue) {
                if (assumeTrue) {
                    // The assumed result is true. This means either the first operand was true, or the first operand was false
                    // and the second operand was true. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, true),
                        narrowType(narrowType(type, expr.left, false), expr.right, true)
                    ]);
                }
                else {
                    // The assumed result is false, therefore we narrow assuming each operand to be false.
                    return narrowType(narrowType(type, expr.left, false), expr.right, false);
                }
            }
            function narrowTypeByInstanceof(type, expr, assumeTrue) {
                // Check that type is not any, assumed result is true, and we have variable symbol on the left
                if (type.flags & ts.TypeFlags.Any || !assumeTrue || expr.left.kind !== ts.SyntaxKind.Identifier || getResolvedSymbol(expr.left) !== symbol) {
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
                if (type.flags & ts.TypeFlags.Union) {
                    return getUnionType(ts.filter(type.types, function (t) { return isTypeSubtypeOf(t, targetType); }));
                }
                return type;
            }
            // Narrow the given type based on the given expression having the assumed boolean value
            function narrowType(type, expr, assumeTrue) {
                switch (expr.kind) {
                    case ts.SyntaxKind.ParenthesizedExpression:
                        return narrowType(type, expr.expression, assumeTrue);
                    case ts.SyntaxKind.BinaryExpression:
                        var operator = expr.operator;
                        if (operator === ts.SyntaxKind.EqualsEqualsEqualsToken || operator === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
                            return narrowTypeByEquality(type, expr, assumeTrue);
                        }
                        else if (operator === ts.SyntaxKind.AmpersandAmpersandToken) {
                            return narrowTypeByAnd(type, expr, assumeTrue);
                        }
                        else if (operator === ts.SyntaxKind.BarBarToken) {
                            return narrowTypeByOr(type, expr, assumeTrue);
                        }
                        else if (operator === ts.SyntaxKind.InstanceOfKeyword) {
                            return narrowTypeByInstanceof(type, expr, assumeTrue);
                        }
                        break;
                    case ts.SyntaxKind.PrefixUnaryExpression:
                        if (expr.operator === ts.SyntaxKind.ExclamationToken) {
                            return narrowType(type, expr.operand, !assumeTrue);
                        }
                        break;
                }
                return type;
            }
        }
        /*Transitively mark all linked imports as referenced*/
        function markLinkedImportsAsReferenced(node) {
            var nodeLinks = getNodeLinks(node);
            while (nodeLinks.importOnRightSide) {
                var rightSide = nodeLinks.importOnRightSide;
                nodeLinks.importOnRightSide = undefined;
                getSymbolLinks(rightSide).referenced = true;
                ts.Debug.assert((rightSide.flags & ts.SymbolFlags.Import) !== 0);
                nodeLinks = getNodeLinks(ts.getDeclarationOfKind(rightSide, ts.SyntaxKind.ImportDeclaration));
            }
        }
        function checkIdentifier(node) {
            var symbol = getResolvedSymbol(node);
            if (symbol.flags & ts.SymbolFlags.Import) {
                var symbolLinks = getSymbolLinks(symbol);
                if (!symbolLinks.referenced) {
                    var importOrExportAssignment = getLeftSideOfImportOrExportAssignment(node);
                    // decision about whether import is referenced can be made now if
                    // - import that are used anywhere except right side of import declarations
                    // - imports that are used on the right side of exported import declarations
                    // for other cases defer decision until the check of left side
                    if (!importOrExportAssignment || (importOrExportAssignment.flags & ts.NodeFlags.Export) || (importOrExportAssignment.kind === ts.SyntaxKind.ExportAssignment)) {
                        // Mark the import as referenced so that we emit it in the final .js file.
                        // exception: identifiers that appear in type queries, const enums, modules that contain only const enums
                        symbolLinks.referenced = !isInTypeQuery(node) && !isConstEnumOrConstEnumOnlyModule(resolveImport(symbol));
                    }
                    else {
                        var nodeLinks = getNodeLinks(importOrExportAssignment);
                        ts.Debug.assert(!nodeLinks.importOnRightSide);
                        nodeLinks.importOnRightSide = symbol;
                    }
                }
                if (symbolLinks.referenced) {
                    markLinkedImportsAsReferenced(ts.getDeclarationOfKind(symbol, ts.SyntaxKind.ImportDeclaration));
                }
            }
            checkCollisionWithCapturedSuperVariable(node, node);
            checkCollisionWithCapturedThisVariable(node, node);
            return getNarrowedTypeOfSymbol(getExportSymbolOfValueSymbolIfExported(symbol), node);
        }
        function captureLexicalThis(node, container) {
            var classNode = container.parent && container.parent.kind === ts.SyntaxKind.ClassDeclaration ? container.parent : undefined;
            getNodeLinks(node).flags |= ts.NodeCheckFlags.LexicalThis;
            if (container.kind === ts.SyntaxKind.PropertyDeclaration || container.kind === ts.SyntaxKind.Constructor) {
                getNodeLinks(classNode).flags |= ts.NodeCheckFlags.CaptureThis;
            }
            else {
                getNodeLinks(container).flags |= ts.NodeCheckFlags.CaptureThis;
            }
        }
        function checkThisExpression(node) {
            // Stop at the first arrow function so that we can
            // tell whether 'this' needs to be captured.
            var container = ts.getThisContainer(node, true);
            var needToCaptureLexicalThis = false;
            // Now skip arrow functions to get the "real" owner of 'this'.
            if (container.kind === ts.SyntaxKind.ArrowFunction) {
                container = ts.getThisContainer(container, false);
                needToCaptureLexicalThis = true;
            }
            switch (container.kind) {
                case ts.SyntaxKind.ModuleDeclaration:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_module_body);
                    break;
                case ts.SyntaxKind.EnumDeclaration:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_current_location);
                    break;
                case ts.SyntaxKind.Constructor:
                    if (isInConstructorArgumentInitializer(node, container)) {
                        error(node, ts.Diagnostics.this_cannot_be_referenced_in_constructor_arguments);
                    }
                    break;
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                    if (container.flags & ts.NodeFlags.Static) {
                        error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_static_property_initializer);
                    }
                    break;
            }
            if (needToCaptureLexicalThis) {
                captureLexicalThis(node, container);
            }
            var classNode = container.parent && container.parent.kind === ts.SyntaxKind.ClassDeclaration ? container.parent : undefined;
            if (classNode) {
                var symbol = getSymbolOfNode(classNode);
                return container.flags & ts.NodeFlags.Static ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol);
            }
            return anyType;
        }
        function getSuperContainer(node) {
            while (true) {
                node = node.parent;
                if (!node)
                    return node;
                switch (node.kind) {
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.ArrowFunction:
                    case ts.SyntaxKind.PropertyDeclaration:
                    case ts.SyntaxKind.PropertySignature:
                    case ts.SyntaxKind.MethodDeclaration:
                    case ts.SyntaxKind.MethodSignature:
                    case ts.SyntaxKind.Constructor:
                    case ts.SyntaxKind.GetAccessor:
                    case ts.SyntaxKind.SetAccessor:
                        return node;
                }
            }
        }
        function isInConstructorArgumentInitializer(node, constructorDecl) {
            for (var n = node; n && n !== constructorDecl; n = n.parent) {
                if (n.kind === ts.SyntaxKind.Parameter) {
                    return true;
                }
            }
            return false;
        }
        function checkSuperExpression(node) {
            var isCallExpression = node.parent.kind === ts.SyntaxKind.CallExpression && node.parent.expression === node;
            var enclosingClass = ts.getAncestor(node, ts.SyntaxKind.ClassDeclaration);
            var baseClass;
            if (enclosingClass && ts.getClassBaseTypeNode(enclosingClass)) {
                var classType = getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClass));
                baseClass = classType.baseTypes.length && classType.baseTypes[0];
            }
            if (!baseClass) {
                error(node, ts.Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                return unknownType;
            }
            var container = getSuperContainer(node);
            if (container) {
                var canUseSuperExpression = false;
                if (isCallExpression) {
                    // TS 1.0 SPEC (April 2014): 4.8.1
                    // Super calls are only permitted in constructors of derived classes
                    canUseSuperExpression = container.kind === ts.SyntaxKind.Constructor;
                }
                else {
                    // TS 1.0 SPEC (April 2014)
                    // 'super' property access is allowed
                    // - In a constructor, instance member function, instance member accessor, or instance member variable initializer where this references a derived class instance
                    // - In a static member function or static member accessor
                    // super property access might appear in arrow functions with arbitrary deep nesting
                    var needToCaptureLexicalThis = false;
                    while (container && container.kind === ts.SyntaxKind.ArrowFunction) {
                        container = getSuperContainer(container);
                        needToCaptureLexicalThis = true;
                    }
                    // topmost container must be something that is directly nested in the class declaration
                    if (container && container.parent && container.parent.kind === ts.SyntaxKind.ClassDeclaration) {
                        if (container.flags & ts.NodeFlags.Static) {
                            canUseSuperExpression = container.kind === ts.SyntaxKind.MethodDeclaration || container.kind === ts.SyntaxKind.MethodSignature || container.kind === ts.SyntaxKind.GetAccessor || container.kind === ts.SyntaxKind.SetAccessor;
                        }
                        else {
                            canUseSuperExpression = container.kind === ts.SyntaxKind.MethodDeclaration || container.kind === ts.SyntaxKind.MethodSignature || container.kind === ts.SyntaxKind.GetAccessor || container.kind === ts.SyntaxKind.SetAccessor || container.kind === ts.SyntaxKind.PropertyDeclaration || container.kind === ts.SyntaxKind.PropertySignature || container.kind === ts.SyntaxKind.Constructor;
                        }
                    }
                }
                if (canUseSuperExpression) {
                    var returnType;
                    if ((container.flags & ts.NodeFlags.Static) || isCallExpression) {
                        getNodeLinks(node).flags |= ts.NodeCheckFlags.SuperStatic;
                        returnType = getTypeOfSymbol(baseClass.symbol);
                    }
                    else {
                        getNodeLinks(node).flags |= ts.NodeCheckFlags.SuperInstance;
                        returnType = baseClass;
                    }
                    if (container.kind === ts.SyntaxKind.Constructor && isInConstructorArgumentInitializer(node, container)) {
                        // issue custom error message for super property access in constructor arguments (to be aligned with old compiler)
                        error(node, ts.Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
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
            if (isCallExpression) {
                error(node, ts.Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
            }
            else {
                error(node, ts.Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
            }
            return unknownType;
        }
        // Return contextual type of parameter or undefined if no contextual type is available
        function getContextuallyTypedParameterType(parameter) {
            if (isFunctionExpressionOrArrowFunction(parameter.parent)) {
                var func = parameter.parent;
                if (isContextSensitive(func)) {
                    var contextualSignature = getContextualSignature(func);
                    if (contextualSignature) {
                        var funcHasRestParameters = ts.hasRestParameters(func);
                        var len = func.parameters.length - (funcHasRestParameters ? 1 : 0);
                        var indexOfParameter = ts.indexOf(func.parameters, parameter);
                        if (indexOfParameter < len) {
                            return getTypeAtPosition(contextualSignature, indexOfParameter);
                        }
                        // If last parameter is contextually rest parameter get its type
                        if (indexOfParameter === (func.parameters.length - 1) && funcHasRestParameters && contextualSignature.hasRestParameter && func.parameters.length >= contextualSignature.parameters.length) {
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
        function getContextualTypeForInitializerExpression(node) {
            var declaration = node.parent;
            if (node === declaration.initializer) {
                if (declaration.type) {
                    return getTypeFromTypeNode(declaration.type);
                }
                if (declaration.kind === ts.SyntaxKind.Parameter) {
                    var type = getContextuallyTypedParameterType(declaration);
                    if (type) {
                        return type;
                    }
                }
                if (ts.isBindingPattern(declaration.name)) {
                    return getTypeFromBindingPattern(declaration.name);
                }
            }
            return undefined;
        }
        function getContextualTypeForReturnExpression(node) {
            var func = ts.getContainingFunction(node);
            if (func) {
                // If the containing function has a return type annotation, is a constructor, or is a get accessor whose
                // corresponding set accessor has a type annotation, return statements in the function are contextually typed
                if (func.type || func.kind === ts.SyntaxKind.Constructor || func.kind === ts.SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(ts.getDeclarationOfKind(func.symbol, ts.SyntaxKind.SetAccessor))) {
                    return getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                }
                // Otherwise, if the containing function is contextually typed by a function type with exactly one call signature
                // and that call signature is non-generic, return statements are contextually typed by the return type of the signature
                var signature = getContextualSignatureForFunctionLikeDeclaration(func);
                if (signature) {
                    return getReturnTypeOfSignature(signature);
                }
            }
            return undefined;
        }
        // In a typed function call, an argument or substitution expression is contextually typed by the type of the corresponding parameter.
        function getContextualTypeForArgument(callTarget, arg) {
            var args = getEffectiveCallArguments(callTarget);
            var argIndex = ts.indexOf(args, arg);
            if (argIndex >= 0) {
                var signature = getResolvedSignature(callTarget);
                return getTypeAtPosition(signature, argIndex);
            }
            return undefined;
        }
        function getContextualTypeForSubstitutionExpression(template, substitutionExpression) {
            if (template.parent.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                return getContextualTypeForArgument(template.parent, substitutionExpression);
            }
            return undefined;
        }
        function getContextualTypeForBinaryOperand(node) {
            var binaryExpression = node.parent;
            var operator = binaryExpression.operator;
            if (operator >= ts.SyntaxKind.FirstAssignment && operator <= ts.SyntaxKind.LastAssignment) {
                // In an assignment expression, the right operand is contextually typed by the type of the left operand.
                if (node === binaryExpression.right) {
                    return checkExpression(binaryExpression.left);
                }
            }
            else if (operator === ts.SyntaxKind.BarBarToken) {
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
        function applyToContextualType(type, mapper) {
            if (!(type.flags & ts.TypeFlags.Union)) {
                return mapper(type);
            }
            var types = type.types;
            var mappedType;
            var mappedTypes;
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
        function getTypeOfPropertyOfContextualType(type, name) {
            return applyToContextualType(type, function (t) {
                var prop = getPropertyOfObjectType(t, name);
                return prop ? getTypeOfSymbol(prop) : undefined;
            });
        }
        function getIndexTypeOfContextualType(type, kind) {
            return applyToContextualType(type, function (t) { return getIndexTypeOfObjectOrUnionType(t, kind); });
        }
        // Return true if the given contextual type is a tuple-like type
        function contextualTypeIsTupleLikeType(type) {
            return !!(type.flags & ts.TypeFlags.Union ? ts.forEach(type.types, isTupleLikeType) : isTupleLikeType(type));
        }
        // Return true if the given contextual type provides an index signature of the given kind
        function contextualTypeHasIndexSignature(type, kind) {
            return !!(type.flags & ts.TypeFlags.Union ? ts.forEach(type.types, function (t) { return getIndexTypeOfObjectOrUnionType(t, kind); }) : getIndexTypeOfObjectOrUnionType(type, kind));
        }
        // In an object literal contextually typed by a type T, the contextual type of a property assignment is the type of
        // the matching property in T, if one exists. Otherwise, it is the type of the numeric index signature in T, if one
        // exists. Otherwise, it is the type of the string index signature in T, if one exists.
        function getContextualTypeForObjectLiteralMethod(node) {
            ts.Debug.assert(ts.isObjectLiteralMethod(node));
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            return getContextualTypeForObjectLiteralElement(node);
        }
        function getContextualTypeForObjectLiteralElement(element) {
            var objectLiteral = element.parent;
            var type = getContextualType(objectLiteral);
            // TODO(jfreeman): Handle this case for computed names and symbols
            var name = element.name.text;
            if (type && name) {
                return getTypeOfPropertyOfContextualType(type, name) || isNumericName(name) && getIndexTypeOfContextualType(type, ts.IndexKind.Number) || getIndexTypeOfContextualType(type, ts.IndexKind.String);
            }
            return undefined;
        }
        // In an array literal contextually typed by a type T, the contextual type of an element expression at index N is
        // the type of the property with the numeric name N in T, if one exists. Otherwise, it is the type of the numeric
        // index signature in T, if one exists.
        function getContextualTypeForElementExpression(node) {
            var arrayLiteral = node.parent;
            var type = getContextualType(arrayLiteral);
            if (type) {
                var index = ts.indexOf(arrayLiteral.elements, node);
                return getTypeOfPropertyOfContextualType(type, "" + index) || getIndexTypeOfContextualType(type, ts.IndexKind.Number);
            }
            return undefined;
        }
        // In a contextually typed conditional expression, the true/false expressions are contextually typed by the same type.
        function getContextualTypeForConditionalOperand(node) {
            var conditional = node.parent;
            return node === conditional.whenTrue || node === conditional.whenFalse ? getContextualType(conditional) : undefined;
        }
        // Return the contextual type for a given expression node. During overload resolution, a contextual type may temporarily
        // be "pushed" onto a node using the contextualType property.
        function getContextualType(node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            if (node.contextualType) {
                return node.contextualType;
            }
            var parent = node.parent;
            switch (parent.kind) {
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.BindingElement:
                    return getContextualTypeForInitializerExpression(node);
                case ts.SyntaxKind.ArrowFunction:
                case ts.SyntaxKind.ReturnStatement:
                    return getContextualTypeForReturnExpression(node);
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.NewExpression:
                    return getContextualTypeForArgument(parent, node);
                case ts.SyntaxKind.TypeAssertionExpression:
                    return getTypeFromTypeNode(parent.type);
                case ts.SyntaxKind.BinaryExpression:
                    return getContextualTypeForBinaryOperand(node);
                case ts.SyntaxKind.PropertyAssignment:
                    return getContextualTypeForObjectLiteralElement(parent);
                case ts.SyntaxKind.ArrayLiteralExpression:
                    return getContextualTypeForElementExpression(node);
                case ts.SyntaxKind.ConditionalExpression:
                    return getContextualTypeForConditionalOperand(node);
                case ts.SyntaxKind.TemplateSpan:
                    ts.Debug.assert(parent.parent.kind === ts.SyntaxKind.TemplateExpression);
                    return getContextualTypeForSubstitutionExpression(parent.parent, node);
                case ts.SyntaxKind.ParenthesizedExpression:
                    return getContextualType(parent);
            }
            return undefined;
        }
        // If the given type is an object or union type, if that type has a single signature, and if
        // that signature is non-generic, return the signature. Otherwise return undefined.
        function getNonGenericSignature(type) {
            var signatures = getSignaturesOfObjectOrUnionType(type, ts.SignatureKind.Call);
            if (signatures.length === 1) {
                var signature = signatures[0];
                if (!signature.typeParameters) {
                    return signature;
                }
            }
        }
        function isFunctionExpressionOrArrowFunction(node) {
            return node.kind === ts.SyntaxKind.FunctionExpression || node.kind === ts.SyntaxKind.ArrowFunction;
        }
        function getContextualSignatureForFunctionLikeDeclaration(node) {
            // Only function expressions and arrow functions are contextually typed.
            return isFunctionExpressionOrArrowFunction(node) ? getContextualSignature(node) : undefined;
        }
        // Return the contextual signature for a given expression node. A contextual type provides a
        // contextual signature if it has a single call signature and if that call signature is non-generic.
        // If the contextual type is a union type, get the signature from each type possible and if they are 
        // all identical ignoring their return type, the result is same signature but with return type as 
        // union type of return types from these signatures
        function getContextualSignature(node) {
            ts.Debug.assert(node.kind !== ts.SyntaxKind.MethodDeclaration || ts.isObjectLiteralMethod(node));
            var type = ts.isObjectLiteralMethod(node) ? getContextualTypeForObjectLiteralMethod(node) : getContextualType(node);
            if (!type) {
                return undefined;
            }
            if (!(type.flags & ts.TypeFlags.Union)) {
                return getNonGenericSignature(type);
            }
            var signatureList;
            var types = type.types;
            for (var i = 0; i < types.length; i++) {
                // The signature set of all constituent type with call signatures should match
                // So number of signatures allowed is either 0 or 1
                if (signatureList && getSignaturesOfObjectOrUnionType(types[i], ts.SignatureKind.Call).length > 1) {
                    return undefined;
                }
                var signature = getNonGenericSignature(types[i]);
                if (signature) {
                    if (!signatureList) {
                        // This signature will contribute to contextual union signature
                        signatureList = [signature];
                    }
                    else if (!compareSignatures(signatureList[0], signature, false, compareTypes)) {
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
            var result;
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
        function isInferentialContext(mapper) {
            return mapper && mapper !== identityMapper;
        }
        // A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
        // assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
        // an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ p: a}] = xxx'.
        function isAssignmentTarget(node) {
            var parent = node.parent;
            if (parent.kind === ts.SyntaxKind.BinaryExpression && parent.operator === ts.SyntaxKind.EqualsToken && parent.left === node) {
                return true;
            }
            if (parent.kind === ts.SyntaxKind.PropertyAssignment) {
                return isAssignmentTarget(parent.parent);
            }
            if (parent.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                return isAssignmentTarget(parent);
            }
            return false;
        }
        function checkSpreadElementExpression(node, contextualMapper) {
            var type = checkExpressionCached(node.expression, contextualMapper);
            if (!isTypeAssignableTo(type, anyArrayType)) {
                error(node.expression, ts.Diagnostics.Type_0_is_not_an_array_type, typeToString(type));
                return unknownType;
            }
            return type;
        }
        function checkArrayLiteral(node, contextualMapper) {
            var elements = node.elements;
            if (!elements.length) {
                return createArrayType(undefinedType);
            }
            var hasSpreadElement = false;
            var elementTypes = [];
            ts.forEach(elements, function (e) {
                var type = checkExpression(e, contextualMapper);
                if (e.kind === ts.SyntaxKind.SpreadElementExpression) {
                    elementTypes.push(getIndexTypeOfType(type, ts.IndexKind.Number) || anyType);
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
        function isNumericName(name) {
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
        function checkObjectLiteral(node, contextualMapper) {
            // Grammar checking
            checkGrammarObjectLiteralExpression(node);
            var members = node.symbol.members;
            var properties = {};
            var contextualType = getContextualType(node);
            var typeFlags;
            for (var id in members) {
                if (ts.hasProperty(members, id)) {
                    var member = members[id];
                    if (member.flags & ts.SymbolFlags.Property || ts.isObjectLiteralMethod(member.declarations[0])) {
                        var memberDecl = member.declarations[0];
                        if (memberDecl.kind === ts.SyntaxKind.PropertyAssignment) {
                            var type = checkExpression(memberDecl.initializer, contextualMapper);
                        }
                        else if (memberDecl.kind === ts.SyntaxKind.MethodDeclaration) {
                            var type = checkObjectLiteralMethod(memberDecl, contextualMapper);
                        }
                        else {
                            ts.Debug.assert(memberDecl.kind === ts.SyntaxKind.ShorthandPropertyAssignment);
                            var type = memberDecl.name.kind === ts.SyntaxKind.ComputedPropertyName ? unknownType : checkExpression(memberDecl.name, contextualMapper);
                        }
                        typeFlags |= type.flags;
                        var prop = createSymbol(ts.SymbolFlags.Property | ts.SymbolFlags.Transient | member.flags, member.name);
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
                        var getAccessor = ts.getDeclarationOfKind(member, ts.SyntaxKind.GetAccessor);
                        if (getAccessor) {
                            checkAccessorDeclaration(getAccessor);
                        }
                        var setAccessor = ts.getDeclarationOfKind(member, ts.SyntaxKind.SetAccessor);
                        if (setAccessor) {
                            checkAccessorDeclaration(setAccessor);
                        }
                    }
                    properties[member.name] = member;
                }
            }
            var stringIndexType = getIndexType(ts.IndexKind.String);
            var numberIndexType = getIndexType(ts.IndexKind.Number);
            var result = createAnonymousType(node.symbol, properties, emptyArray, emptyArray, stringIndexType, numberIndexType);
            result.flags |= (typeFlags & ts.TypeFlags.Unwidened);
            return result;
            function getIndexType(kind) {
                if (contextualType && contextualTypeHasIndexSignature(contextualType, kind)) {
                    var propTypes = [];
                    for (var id in properties) {
                        if (ts.hasProperty(properties, id)) {
                            if (kind === ts.IndexKind.String || isNumericName(id)) {
                                var type = getTypeOfSymbol(properties[id]);
                                if (!ts.contains(propTypes, type)) {
                                    propTypes.push(type);
                                }
                            }
                        }
                    }
                    return propTypes.length ? getUnionType(propTypes) : undefinedType;
                }
                return undefined;
            }
        }
        // If a symbol is a synthesized symbol with no value declaration, we assume it is a property. Example of this are the synthesized
        // '.prototype' property as well as synthesized tuple index properties.
        function getDeclarationKindFromSymbol(s) {
            return s.valueDeclaration ? s.valueDeclaration.kind : ts.SyntaxKind.PropertyDeclaration;
        }
        function getDeclarationFlagsFromSymbol(s) {
            return s.valueDeclaration ? ts.getCombinedNodeFlags(s.valueDeclaration) : s.flags & ts.SymbolFlags.Prototype ? ts.NodeFlags.Public | ts.NodeFlags.Static : 0;
        }
        function checkClassPropertyAccess(node, left, type, prop) {
            var flags = getDeclarationFlagsFromSymbol(prop);
            // Public properties are always accessible
            if (!(flags & (ts.NodeFlags.Private | ts.NodeFlags.Protected))) {
                return;
            }
            // Property is known to be private or protected at this point
            // Get the declaring and enclosing class instance types
            var enclosingClassDeclaration = ts.getAncestor(node, ts.SyntaxKind.ClassDeclaration);
            var enclosingClass = enclosingClassDeclaration ? getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClassDeclaration)) : undefined;
            var declaringClass = getDeclaredTypeOfSymbol(prop.parent);
            // Private property is accessible if declaring and enclosing class are the same
            if (flags & ts.NodeFlags.Private) {
                if (declaringClass !== enclosingClass) {
                    error(node, ts.Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(declaringClass));
                }
                return;
            }
            // Property is known to be protected at this point
            // All protected properties of a supertype are accessible in a super access
            if (left.kind === ts.SyntaxKind.SuperKeyword) {
                return;
            }
            // A protected property is accessible in the declaring class and classes derived from it
            if (!enclosingClass || !hasBaseType(enclosingClass, declaringClass)) {
                error(node, ts.Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(declaringClass));
                return;
            }
            // No further restrictions for static properties
            if (flags & ts.NodeFlags.Static) {
                return;
            }
            // An instance property must be accessed through an instance of the enclosing class
            if (!(getTargetType(type).flags & (ts.TypeFlags.Class | ts.TypeFlags.Interface) && hasBaseType(type, enclosingClass))) {
                error(node, ts.Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1, symbolToString(prop), typeToString(enclosingClass));
            }
        }
        function checkPropertyAccessExpression(node) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.expression, node.name);
        }
        function checkQualifiedName(node) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.left, node.right);
        }
        function checkPropertyAccessExpressionOrQualifiedName(node, left, right) {
            var type = checkExpressionOrQualifiedName(left);
            if (type === unknownType)
                return type;
            if (type !== anyType) {
                var apparentType = getApparentType(getWidenedType(type));
                if (apparentType === unknownType) {
                    // handle cases when type is Type parameter with invalid constraint
                    return unknownType;
                }
                var prop = getPropertyOfType(apparentType, right.text);
                if (!prop) {
                    if (right.text) {
                        error(right, ts.Diagnostics.Property_0_does_not_exist_on_type_1, ts.declarationNameToString(right), typeToString(type));
                    }
                    return unknownType;
                }
                getNodeLinks(node).resolvedSymbol = prop;
                if (prop.parent && prop.parent.flags & ts.SymbolFlags.Class) {
                    // TS 1.0 spec (April 2014): 4.8.2
                    // - In a constructor, instance member function, instance member accessor, or 
                    //   instance member variable initializer where this references a derived class instance, 
                    //   a super property access is permitted and must specify a public instance member function of the base class.
                    // - In a static member function or static member accessor 
                    //   where this references the constructor function object of a derived class, 
                    //   a super property access is permitted and must specify a public static member function of the base class.
                    if (left.kind === ts.SyntaxKind.SuperKeyword && getDeclarationKindFromSymbol(prop) !== ts.SyntaxKind.MethodDeclaration) {
                        error(right, ts.Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                    }
                    else {
                        checkClassPropertyAccess(node, left, type, prop);
                    }
                }
                return getTypeOfSymbol(prop);
            }
            return anyType;
        }
        function isValidPropertyAccess(node, propertyName) {
            var left = node.kind === ts.SyntaxKind.PropertyAccessExpression ? node.expression : node.left;
            var type = checkExpressionOrQualifiedName(left);
            if (type !== unknownType && type !== anyType) {
                var prop = getPropertyOfType(getWidenedType(type), propertyName);
                if (prop && prop.parent && prop.parent.flags & ts.SymbolFlags.Class) {
                    if (left.kind === ts.SyntaxKind.SuperKeyword && getDeclarationKindFromSymbol(prop) !== ts.SyntaxKind.MethodDeclaration) {
                        return false;
                    }
                    else {
                        var diagnosticsCount = diagnostics.length;
                        checkClassPropertyAccess(node, left, type, prop);
                        return diagnostics.length === diagnosticsCount;
                    }
                }
            }
            return true;
        }
        function checkIndexedAccess(node) {
            // Grammar checking
            if (!node.argumentExpression) {
                var sourceFile = getSourceFile(node);
                if (node.parent.kind === ts.SyntaxKind.NewExpression && node.parent.expression === node) {
                    var start = ts.skipTrivia(sourceFile.text, node.expression.end);
                    var end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                }
                else {
                    var start = node.end - "]".length;
                    var end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Expression_expected);
                }
            }
            // Obtain base constraint such that we can bail out if the constraint is an unknown type
            var objectType = getApparentType(checkExpression(node.expression));
            var indexType = node.argumentExpression ? checkExpression(node.argumentExpression) : unknownType;
            if (objectType === unknownType) {
                return unknownType;
            }
            var isConstEnum = isConstEnumObjectType(objectType);
            if (isConstEnum && (!node.argumentExpression || node.argumentExpression.kind !== ts.SyntaxKind.StringLiteral)) {
                error(node.argumentExpression, ts.Diagnostics.A_const_enum_member_can_only_be_accessed_using_a_string_literal);
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
                if (node.argumentExpression.kind === ts.SyntaxKind.StringLiteral || node.argumentExpression.kind === ts.SyntaxKind.NumericLiteral) {
                    var name = node.argumentExpression.text;
                    var prop = getPropertyOfType(objectType, name);
                    if (prop) {
                        getNodeLinks(node).resolvedSymbol = prop;
                        return getTypeOfSymbol(prop);
                    }
                    else if (isConstEnum) {
                        error(node.argumentExpression, ts.Diagnostics.Property_0_does_not_exist_on_const_enum_1, name, symbolToString(objectType.symbol));
                        return unknownType;
                    }
                }
            }
            // Check for compatible indexer types.
            if (indexType.flags & (ts.TypeFlags.Any | ts.TypeFlags.StringLike | ts.TypeFlags.NumberLike)) {
                // Try to use a number indexer.
                if (indexType.flags & (ts.TypeFlags.Any | ts.TypeFlags.NumberLike)) {
                    var numberIndexType = getIndexTypeOfType(objectType, ts.IndexKind.Number);
                    if (numberIndexType) {
                        return numberIndexType;
                    }
                }
                // Try to use string indexing.
                var stringIndexType = getIndexTypeOfType(objectType, ts.IndexKind.String);
                if (stringIndexType) {
                    return stringIndexType;
                }
                // Fall back to any.
                if (compilerOptions.noImplicitAny && !compilerOptions.suppressImplicitAnyIndexErrors && objectType !== anyType) {
                    error(node, ts.Diagnostics.Index_signature_of_object_type_implicitly_has_an_any_type);
                }
                return anyType;
            }
            // REVIEW: Users should know the type that was actually used.
            error(node, ts.Diagnostics.An_index_expression_argument_must_be_of_type_string_number_or_any);
            return unknownType;
        }
        function resolveUntypedCall(node) {
            if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                checkExpression(node.template);
            }
            else {
                ts.forEach(node.arguments, function (argument) {
                    checkExpression(argument);
                });
            }
            return anySignature;
        }
        function resolveErrorCall(node) {
            resolveUntypedCall(node);
            return unknownSignature;
        }
        function hasCorrectArity(node, args, signature) {
            var adjustedArgCount;
            var typeArguments;
            var callIsIncomplete;
            if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                var tagExpression = node;
                // Even if the call is incomplete, we'll have a missing expression as our last argument,
                // so we can say the count is just the arg list length
                adjustedArgCount = args.length;
                typeArguments = undefined;
                if (tagExpression.template.kind === ts.SyntaxKind.TemplateExpression) {
                    // If a tagged template expression lacks a tail literal, the call is incomplete.
                    // Specifically, a template only can end in a TemplateTail or a Missing literal.
                    var templateExpression = tagExpression.template;
                    var lastSpan = ts.lastOrUndefined(templateExpression.templateSpans);
                    ts.Debug.assert(lastSpan !== undefined); // we should always have at least one span.
                    callIsIncomplete = ts.getFullWidth(lastSpan.literal) === 0 || !!lastSpan.literal.isUnterminated;
                }
                else {
                    // If the template didn't end in a backtick, or its beginning occurred right prior to EOF,
                    // then this might actually turn out to be a TemplateHead in the future;
                    // so we consider the call to be incomplete.
                    var templateLiteral = tagExpression.template;
                    ts.Debug.assert(templateLiteral.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral);
                    callIsIncomplete = !!templateLiteral.isUnterminated;
                }
            }
            else {
                var callExpression = node;
                if (!callExpression.arguments) {
                    // This only happens when we have something of the form: 'new C'
                    ts.Debug.assert(callExpression.kind === ts.SyntaxKind.NewExpression);
                    return signature.minArgumentCount === 0;
                }
                // For IDE scenarios we may have an incomplete call, so a trailing comma is tantamount to adding another argument.
                adjustedArgCount = callExpression.arguments.hasTrailingComma ? args.length + 1 : args.length;
                // If we are missing the close paren, the call is incomplete.
                callIsIncomplete = callExpression.arguments.end === callExpression.end;
                typeArguments = callExpression.typeArguments;
            }
            ts.Debug.assert(adjustedArgCount !== undefined, "'adjustedArgCount' undefined");
            ts.Debug.assert(callIsIncomplete !== undefined, "'callIsIncomplete' undefined");
            return checkArity(adjustedArgCount, typeArguments, callIsIncomplete, signature);
            /**
             * @param adjustedArgCount The "apparent" number of arguments that we will have in this call.
             * @param typeArguments    Type arguments node of the call if it exists; undefined otherwise.
             * @param callIsIncomplete Whether or not a call is unfinished, and we should be "lenient" when we have too few arguments.
             * @param signature        The signature whose arity we are comparing.
             */
            function checkArity(adjustedArgCount, typeArguments, callIsIncomplete, signature) {
                // Too many arguments implies incorrect arity.
                if (!signature.hasRestParameter && adjustedArgCount > signature.parameters.length) {
                    return false;
                }
                // If the user supplied type arguments, but the number of type arguments does not match
                // the declared number of type parameters, the call has an incorrect arity.
                var hasRightNumberOfTypeArgs = !typeArguments || (signature.typeParameters && typeArguments.length === signature.typeParameters.length);
                if (!hasRightNumberOfTypeArgs) {
                    return false;
                }
                // If the call is incomplete, we should skip the lower bound check.
                var hasEnoughArguments = adjustedArgCount >= signature.minArgumentCount;
                return callIsIncomplete || hasEnoughArguments;
            }
        }
        // If type has a single call signature and no other members, return that signature. Otherwise, return undefined.
        function getSingleCallSignature(type) {
            if (type.flags & ts.TypeFlags.ObjectType) {
                var resolved = resolveObjectOrUnionTypeMembers(type);
                if (resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0 && resolved.properties.length === 0 && !resolved.stringIndexType && !resolved.numberIndexType) {
                    return resolved.callSignatures[0];
                }
            }
            return undefined;
        }
        // Instantiate a generic signature in the context of a non-generic signature (section 3.8.5 in TypeScript spec)
        function instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper) {
            var context = createInferenceContext(signature.typeParameters, true);
            forEachMatchingParameterType(contextualSignature, signature, function (source, target) {
                // Type parameters from outer context referenced by source type are fixed by instantiation of the source type
                inferTypes(context, instantiateType(source, contextualMapper), target);
            });
            return getSignatureInstantiation(signature, getInferredTypes(context));
        }
        function inferTypeArguments(signature, args, excludeArgument) {
            var typeParameters = signature.typeParameters;
            var context = createInferenceContext(typeParameters, false);
            var mapper = createInferenceMapper(context);
            for (var i = 0; i < args.length; i++) {
                if (args[i].kind === ts.SyntaxKind.OmittedExpression) {
                    continue;
                }
                if (!excludeArgument || excludeArgument[i] === undefined) {
                    var parameterType = getTypeAtPosition(signature, i);
                    if (i === 0 && args[i].parent.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                        inferTypes(context, globalTemplateStringsArrayType, parameterType);
                        continue;
                    }
                    inferTypes(context, checkExpressionWithContextualType(args[i], parameterType, mapper), parameterType);
                }
            }
            // Next, infer from those context sensitive arguments that are no longer excluded
            if (excludeArgument) {
                for (var i = 0; i < args.length; i++) {
                    if (args[i].kind === ts.SyntaxKind.OmittedExpression) {
                        continue;
                    }
                    // No need to special-case tagged templates; their excludeArgument value will be 'undefined'.
                    if (excludeArgument[i] === false) {
                        var parameterType = getTypeAtPosition(signature, i);
                        inferTypes(context, checkExpressionWithContextualType(args[i], parameterType, mapper), parameterType);
                    }
                }
            }
            var inferredTypes = getInferredTypes(context);
            // Inference has failed if the inferenceFailureType type is in list of inferences
            context.failedTypeParameterIndex = ts.indexOf(inferredTypes, inferenceFailureType);
            for (var i = 0; i < inferredTypes.length; i++) {
                if (inferredTypes[i] === inferenceFailureType) {
                    inferredTypes[i] = unknownType;
                }
            }
            return context;
        }
        function checkTypeArguments(signature, typeArguments, typeArgumentResultTypes, reportErrors) {
            var typeParameters = signature.typeParameters;
            var typeArgumentsAreAssignable = true;
            for (var i = 0; i < typeParameters.length; i++) {
                var typeArgNode = typeArguments[i];
                var typeArgument = getTypeFromTypeNode(typeArgNode);
                // Do not push on this array! It has a preallocated length
                typeArgumentResultTypes[i] = typeArgument;
                if (typeArgumentsAreAssignable) {
                    var constraint = getConstraintOfTypeParameter(typeParameters[i]);
                    if (constraint) {
                        typeArgumentsAreAssignable = checkTypeAssignableTo(typeArgument, constraint, reportErrors ? typeArgNode : undefined, ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
            return typeArgumentsAreAssignable;
        }
        function checkApplicableSignature(node, args, signature, relation, excludeArgument, reportErrors) {
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                var argType;
                if (arg.kind === ts.SyntaxKind.OmittedExpression) {
                    continue;
                }
                var paramType = getTypeAtPosition(signature, i);
                if (i === 0 && node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                    // A tagged template expression has something of a
                    // "virtual" parameter with the "cooked" strings array type.
                    argType = globalTemplateStringsArrayType;
                }
                else {
                    // String literals get string literal types unless we're reporting errors
                    argType = arg.kind === ts.SyntaxKind.StringLiteral && !reportErrors ? getStringLiteralType(arg) : checkExpressionWithContextualType(arg, paramType, excludeArgument && excludeArgument[i] ? identityMapper : undefined);
                }
                // Use argument expression as error location when reporting errors
                var isValidArgument = checkTypeRelatedTo(argType, paramType, relation, reportErrors ? arg : undefined, ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1);
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
        function getEffectiveCallArguments(node) {
            var args;
            if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                var template = node.template;
                args = [template];
                if (template.kind === ts.SyntaxKind.TemplateExpression) {
                    ts.forEach(template.templateSpans, function (span) {
                        args.push(span.expression);
                    });
                }
            }
            else {
                args = node.arguments || emptyArray;
            }
            return args;
        }
        function resolveCall(node, signatures, candidatesOutArray) {
            var isTaggedTemplate = node.kind === ts.SyntaxKind.TaggedTemplateExpression;
            var typeArguments = isTaggedTemplate ? undefined : node.typeArguments;
            ts.forEach(typeArguments, checkSourceElement);
            var candidates = candidatesOutArray || [];
            // collectCandidates fills up the candidates array directly
            collectCandidates();
            if (!candidates.length) {
                error(node, ts.Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
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
            var excludeArgument;
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
            var candidateForArgumentError;
            var candidateForTypeArgumentError;
            var resultOfFailedInference;
            var result;
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
                checkApplicableSignature(node, args, candidateForArgumentError, assignableRelation, undefined, true);
            }
            else if (candidateForTypeArgumentError) {
                if (!isTaggedTemplate && node.typeArguments) {
                    checkTypeArguments(candidateForTypeArgumentError, node.typeArguments, [], true);
                }
                else {
                    ts.Debug.assert(resultOfFailedInference.failedTypeParameterIndex >= 0);
                    var failedTypeParameter = candidateForTypeArgumentError.typeParameters[resultOfFailedInference.failedTypeParameterIndex];
                    var inferenceCandidates = getInferenceCandidates(resultOfFailedInference, resultOfFailedInference.failedTypeParameterIndex);
                    var diagnosticChainHead = ts.chainDiagnosticMessages(undefined, ts.Diagnostics.The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly, typeToString(failedTypeParameter));
                    reportNoCommonSupertypeError(inferenceCandidates, node.expression || node.tag, diagnosticChainHead);
                }
            }
            else {
                error(node, ts.Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
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
            function chooseOverload(candidates, relation) {
                for (var i = 0; i < candidates.length; i++) {
                    if (!hasCorrectArity(node, args, candidates[i])) {
                        continue;
                    }
                    var originalCandidate = candidates[i];
                    var inferenceResult;
                    while (true) {
                        var candidate = originalCandidate;
                        if (candidate.typeParameters) {
                            var typeArgumentTypes;
                            var typeArgumentsAreValid;
                            if (typeArguments) {
                                typeArgumentTypes = new Array(candidate.typeParameters.length);
                                typeArgumentsAreValid = checkTypeArguments(candidate, typeArguments, typeArgumentTypes, false);
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
                        if (!checkApplicableSignature(node, args, candidate, relation, excludeArgument, false)) {
                            break;
                        }
                        var index = excludeArgument ? ts.indexOf(excludeArgument, true) : -1;
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
                        ts.Debug.assert(originalCandidate === candidate);
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
            function collectCandidates() {
                var result = candidates;
                var lastParent;
                var lastSymbol;
                var cutoffIndex = 0;
                var index;
                var specializedIndex = -1;
                var spliceIndex;
                ts.Debug.assert(!result.length);
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
        function resolveCallExpression(node, candidatesOutArray) {
            if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
                var superType = checkSuperExpression(node.expression);
                if (superType !== unknownType) {
                    return resolveCall(node, getSignaturesOfType(superType, ts.SignatureKind.Construct), candidatesOutArray);
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
            var callSignatures = getSignaturesOfType(apparentType, ts.SignatureKind.Call);
            var constructSignatures = getSignaturesOfType(apparentType, ts.SignatureKind.Construct);
            // TS 1.0 spec: 4.12
            // If FuncExpr is of type Any, or of an object type that has no call or construct signatures
            // but is a subtype of the Function interface, the call is an untyped function call. In an
            // untyped function call no TypeArgs are permitted, Args can be any argument list, no contextual
            // types are provided for the argument expressions, and the result is always of type Any.
            // We exclude union types because we may have a union of function types that happen to have
            // no common signatures.
            if (funcType === anyType || (!callSignatures.length && !constructSignatures.length && !(funcType.flags & ts.TypeFlags.Union) && isTypeAssignableTo(funcType, globalFunctionType))) {
                if (node.typeArguments) {
                    error(node, ts.Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }
            // If FuncExpr's apparent type(section 3.8.1) is a function type, the call is a typed function call.
            // TypeScript employs overload resolution in typed function calls in order to support functions
            // with multiple call signatures.
            if (!callSignatures.length) {
                if (constructSignatures.length) {
                    error(node, ts.Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                }
                else {
                    error(node, ts.Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                }
                return resolveErrorCall(node);
            }
            return resolveCall(node, callSignatures, candidatesOutArray);
        }
        function resolveNewExpression(node, candidatesOutArray) {
            var expressionType = checkExpression(node.expression);
            // TS 1.0 spec: 4.11
            // If ConstructExpr is of type Any, Args can be any argument
            // list and the result of the operation is of type Any.
            if (expressionType === anyType) {
                if (node.typeArguments) {
                    error(node, ts.Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
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
            var constructSignatures = getSignaturesOfType(expressionType, ts.SignatureKind.Construct);
            if (constructSignatures.length) {
                return resolveCall(node, constructSignatures, candidatesOutArray);
            }
            // If ConstructExpr's apparent type is an object type with no construct signatures but
            // one or more call signatures, the expression is processed as a function call. A compile-time
            // error occurs if the result of the function call is not Void. The type of the result of the
            // operation is Any.
            var callSignatures = getSignaturesOfType(expressionType, ts.SignatureKind.Call);
            if (callSignatures.length) {
                var signature = resolveCall(node, callSignatures, candidatesOutArray);
                if (getReturnTypeOfSignature(signature) !== voidType) {
                    error(node, ts.Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                }
                return signature;
            }
            error(node, ts.Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature);
            return resolveErrorCall(node);
        }
        function resolveTaggedTemplateExpression(node, candidatesOutArray) {
            var tagType = checkExpression(node.tag);
            var apparentType = getApparentType(tagType);
            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }
            var callSignatures = getSignaturesOfType(apparentType, ts.SignatureKind.Call);
            if (tagType === anyType || (!callSignatures.length && !(tagType.flags & ts.TypeFlags.Union) && isTypeAssignableTo(tagType, globalFunctionType))) {
                return resolveUntypedCall(node);
            }
            if (!callSignatures.length) {
                error(node, ts.Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                return resolveErrorCall(node);
            }
            return resolveCall(node, callSignatures, candidatesOutArray);
        }
        // candidatesOutArray is passed by signature help in the language service, and collectCandidates
        // must fill it up with the appropriate candidate signatures
        function getResolvedSignature(node, candidatesOutArray) {
            var links = getNodeLinks(node);
            // If getResolvedSignature has already been called, we will have cached the resolvedSignature.
            // However, it is possible that either candidatesOutArray was not passed in the first time,
            // or that a different candidatesOutArray was passed in. Therefore, we need to redo the work
            // to correctly fill the candidatesOutArray.
            if (!links.resolvedSignature || candidatesOutArray) {
                links.resolvedSignature = anySignature;
                if (node.kind === ts.SyntaxKind.CallExpression) {
                    links.resolvedSignature = resolveCallExpression(node, candidatesOutArray);
                }
                else if (node.kind === ts.SyntaxKind.NewExpression) {
                    links.resolvedSignature = resolveNewExpression(node, candidatesOutArray);
                }
                else if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
                    links.resolvedSignature = resolveTaggedTemplateExpression(node, candidatesOutArray);
                }
                else {
                    ts.Debug.fail("Branch in 'getResolvedSignature' should be unreachable.");
                }
            }
            return links.resolvedSignature;
        }
        function checkCallExpression(node) {
            // Grammar checking; stop grammar-checking if checkGrammarTypeArguments return true
            checkGrammarTypeArguments(node, node.typeArguments) || checkGrammarArguments(node, node.arguments);
            var signature = getResolvedSignature(node);
            if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
                return voidType;
            }
            if (node.kind === ts.SyntaxKind.NewExpression) {
                var declaration = signature.declaration;
                if (declaration && declaration.kind !== ts.SyntaxKind.Constructor && declaration.kind !== ts.SyntaxKind.ConstructSignature && declaration.kind !== ts.SyntaxKind.ConstructorType) {
                    // When resolved signature is a call signature (and not a construct signature) the result type is any
                    if (compilerOptions.noImplicitAny) {
                        error(node, ts.Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type);
                    }
                    return anyType;
                }
            }
            return getReturnTypeOfSignature(signature);
        }
        function checkTaggedTemplateExpression(node) {
            // Grammar checking
            if (compilerOptions.target < ts.ScriptTarget.ES6) {
                grammarErrorOnFirstToken(node.template, ts.Diagnostics.Tagged_templates_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }
            return getReturnTypeOfSignature(getResolvedSignature(node));
        }
        function checkTypeAssertion(node) {
            var exprType = checkExpression(node.expression);
            var targetType = getTypeFromTypeNode(node.type);
            if (produceDiagnostics && targetType !== unknownType) {
                var widenedType = getWidenedType(exprType);
                if (!(isTypeAssignableTo(targetType, widenedType))) {
                    checkTypeAssignableTo(exprType, targetType, node, ts.Diagnostics.Neither_type_0_nor_type_1_is_assignable_to_the_other);
                }
            }
            return targetType;
        }
        function getTypeAtPosition(signature, pos) {
            return signature.hasRestParameter ? pos < signature.parameters.length - 1 ? getTypeOfSymbol(signature.parameters[pos]) : getRestTypeOfSignature(signature) : pos < signature.parameters.length ? getTypeOfSymbol(signature.parameters[pos]) : anyType;
        }
        function assignContextualParameterTypes(signature, context, mapper) {
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
        function getReturnTypeFromBody(func, contextualMapper) {
            var contextualSignature = getContextualSignatureForFunctionLikeDeclaration(func);
            if (func.body.kind !== ts.SyntaxKind.Block) {
                var type = checkExpressionCached(func.body, contextualMapper);
            }
            else {
                // Aggregate the types of expressions within all the return statements.
                var types = checkAndAggregateReturnExpressionTypes(func.body, contextualMapper);
                if (types.length === 0) {
                    return voidType;
                }
                // When return statements are contextually typed we allow the return type to be a union type. Otherwise we require the
                // return expressions to have a best common supertype.
                var type = contextualSignature ? getUnionType(types) : getCommonSupertype(types);
                if (!type) {
                    error(func, ts.Diagnostics.No_best_common_type_exists_among_return_expressions);
                    return unknownType;
                }
            }
            if (!contextualSignature) {
                reportErrorsFromWidening(func, type);
            }
            return getWidenedType(type);
        }
        /// Returns a set of types relating to every return expression relating to a function block.
        function checkAndAggregateReturnExpressionTypes(body, contextualMapper) {
            var aggregatedTypes = [];
            ts.forEachReturnStatement(body, function (returnStatement) {
                var expr = returnStatement.expression;
                if (expr) {
                    var type = checkExpressionCached(expr, contextualMapper);
                    if (!ts.contains(aggregatedTypes, type)) {
                        aggregatedTypes.push(type);
                    }
                }
            });
            return aggregatedTypes;
        }
        function bodyContainsAReturnStatement(funcBody) {
            return ts.forEachReturnStatement(funcBody, function (returnStatement) {
                return true;
            });
        }
        function bodyContainsSingleThrowStatement(body) {
            return (body.statements.length === 1) && (body.statements[0].kind === ts.SyntaxKind.ThrowStatement);
        }
        // TypeScript Specification 1.0 (6.3) - July 2014
        // An explicitly typed function whose return type isn't the Void or the Any type
        // must have at least one return statement somewhere in its body.
        // An exception to this rule is if the function implementation consists of a single 'throw' statement.
        function checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(func, returnType) {
            if (!produceDiagnostics) {
                return;
            }
            // Functions that return 'void' or 'any' don't need any return expressions.
            if (returnType === voidType || returnType === anyType) {
                return;
            }
            // If all we have is a function signature, or an arrow function with an expression body, then there is nothing to check.
            if (ts.nodeIsMissing(func.body) || func.body.kind !== ts.SyntaxKind.Block) {
                return;
            }
            var bodyBlock = func.body;
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
            error(func.type, ts.Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_or_consist_of_a_single_throw_statement);
        }
        function checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper) {
            ts.Debug.assert(node.kind !== ts.SyntaxKind.MethodDeclaration || ts.isObjectLiteralMethod(node));
            // Grammar checking
            var hasGrammarError = checkGrammarFunctionLikeDeclaration(node);
            if (!hasGrammarError && node.kind === ts.SyntaxKind.FunctionExpression) {
                checkGrammarFunctionName(node.name) || checkGrammarForGenerator(node);
            }
            // The identityMapper object is used to indicate that function expressions are wildcards
            if (contextualMapper === identityMapper) {
                return anyFunctionType;
            }
            var links = getNodeLinks(node);
            var type = getTypeOfSymbol(node.symbol);
            // Check if function expression is contextually typed and assign parameter types if so
            if (!(links.flags & ts.NodeCheckFlags.ContextChecked)) {
                var contextualSignature = getContextualSignature(node);
                // If a type check is started at a function expression that is an argument of a function call, obtaining the
                // contextual type may recursively get back to here during overload resolution of the call. If so, we will have
                // already assigned contextual types.
                if (!(links.flags & ts.NodeCheckFlags.ContextChecked)) {
                    links.flags |= ts.NodeCheckFlags.ContextChecked;
                    if (contextualSignature) {
                        var signature = getSignaturesOfType(type, ts.SignatureKind.Call)[0];
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
            if (produceDiagnostics && node.kind !== ts.SyntaxKind.MethodDeclaration && node.kind !== ts.SyntaxKind.MethodSignature) {
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
            }
            return type;
        }
        function checkFunctionExpressionOrObjectLiteralMethodBody(node) {
            ts.Debug.assert(node.kind !== ts.SyntaxKind.MethodDeclaration || ts.isObjectLiteralMethod(node));
            if (node.type) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
            }
            if (node.body) {
                if (node.body.kind === ts.SyntaxKind.Block) {
                    checkSourceElement(node.body);
                }
                else {
                    var exprType = checkExpression(node.body);
                    if (node.type) {
                        checkTypeAssignableTo(exprType, getTypeFromTypeNode(node.type), node.body, undefined);
                    }
                    checkFunctionExpressionBodies(node.body);
                }
            }
        }
        function checkArithmeticOperandType(operand, type, diagnostic) {
            if (!(type.flags & (ts.TypeFlags.Any | ts.TypeFlags.NumberLike))) {
                error(operand, diagnostic);
                return false;
            }
            return true;
        }
        function checkReferenceExpression(n, invalidReferenceMessage, constantVarianleMessage) {
            function findSymbol(n) {
                var symbol = getNodeLinks(n).resolvedSymbol;
                // Because we got the symbol from the resolvedSymbol property, it might be of kind
                // SymbolFlags.ExportValue. In this case it is necessary to get the actual export
                // symbol, which will have the correct flags set on it.
                return symbol && getExportSymbolOfValueSymbolIfExported(symbol);
            }
            function isReferenceOrErrorExpression(n) {
                switch (n.kind) {
                    case ts.SyntaxKind.Identifier:
                        var symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.3
                        // An identifier expression that references a variable or parameter is classified as a reference. 
                        // An identifier expression that references any other kind of entity is classified as a value(and therefore cannot be the target of an assignment).
                        return !symbol || symbol === unknownSymbol || symbol === argumentsSymbol || (symbol.flags & ts.SymbolFlags.Variable) !== 0;
                    case ts.SyntaxKind.PropertyAccessExpression:
                        var symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.10
                        // A property access expression is always classified as a reference.
                        // NOTE (not in spec): assignment to enum members should not be allowed
                        return !symbol || symbol === unknownSymbol || (symbol.flags & ~ts.SymbolFlags.EnumMember) !== 0;
                    case ts.SyntaxKind.ElementAccessExpression:
                        //  old compiler doesn't check indexed assess
                        return true;
                    case ts.SyntaxKind.ParenthesizedExpression:
                        return isReferenceOrErrorExpression(n.expression);
                    default:
                        return false;
                }
            }
            function isConstVariableReference(n) {
                switch (n.kind) {
                    case ts.SyntaxKind.Identifier:
                    case ts.SyntaxKind.PropertyAccessExpression:
                        var symbol = findSymbol(n);
                        return symbol && (symbol.flags & ts.SymbolFlags.Variable) !== 0 && (getDeclarationFlagsFromSymbol(symbol) & ts.NodeFlags.Const) !== 0;
                    case ts.SyntaxKind.ElementAccessExpression:
                        var index = n.argumentExpression;
                        var symbol = findSymbol(n.expression);
                        if (symbol && index && index.kind === ts.SyntaxKind.StringLiteral) {
                            var name = index.text;
                            var prop = getPropertyOfType(getTypeOfSymbol(symbol), name);
                            return prop && (prop.flags & ts.SymbolFlags.Variable) !== 0 && (getDeclarationFlagsFromSymbol(prop) & ts.NodeFlags.Const) !== 0;
                        }
                        return false;
                    case ts.SyntaxKind.ParenthesizedExpression:
                        return isConstVariableReference(n.expression);
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
        function checkDeleteExpression(node) {
            // Grammar checking
            if (node.parserContextFlags & ts.ParserContextFlags.StrictMode && node.expression.kind === ts.SyntaxKind.Identifier) {
                // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
                // UnaryExpression is a direct reference to a variable, function argument, or function name
                grammarErrorOnNode(node.expression, ts.Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode);
            }
            var operandType = checkExpression(node.expression);
            return booleanType;
        }
        function checkTypeOfExpression(node) {
            var operandType = checkExpression(node.expression);
            return stringType;
        }
        function checkVoidExpression(node) {
            var operandType = checkExpression(node.expression);
            return undefinedType;
        }
        function checkPrefixUnaryExpression(node) {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator
            if ((node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
                checkGrammarEvalOrArgumentsInStrictMode(node, node.operand);
            }
            var operandType = checkExpression(node.operand);
            switch (node.operator) {
                case ts.SyntaxKind.PlusToken:
                case ts.SyntaxKind.MinusToken:
                case ts.SyntaxKind.TildeToken:
                    return numberType;
                case ts.SyntaxKind.ExclamationToken:
                    return booleanType;
                case ts.SyntaxKind.PlusPlusToken:
                case ts.SyntaxKind.MinusMinusToken:
                    var ok = checkArithmeticOperandType(node.operand, operandType, ts.Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
                    if (ok) {
                        // run check only if former checks succeeded to avoid reporting cascading errors
                        checkReferenceExpression(node.operand, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
                    }
                    return numberType;
            }
            return unknownType;
        }
        function checkPostfixUnaryExpression(node) {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
            checkGrammarEvalOrArgumentsInStrictMode(node, node.operand);
            var operandType = checkExpression(node.operand);
            var ok = checkArithmeticOperandType(node.operand, operandType, ts.Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
            if (ok) {
                // run check only if former checks succeeded to avoid reporting cascading errors
                checkReferenceExpression(node.operand, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
            }
            return numberType;
        }
        // Return true if type an object type, a type parameter, or a union type composed of only those kinds of types
        function isStructuredType(type) {
            if (type.flags & ts.TypeFlags.Union) {
                return !ts.forEach(type.types, function (t) { return !isStructuredType(t); });
            }
            return (type.flags & (ts.TypeFlags.ObjectType | ts.TypeFlags.TypeParameter)) !== 0;
        }
        function isConstEnumObjectType(type) {
            return type.flags & (ts.TypeFlags.ObjectType | ts.TypeFlags.Anonymous) && type.symbol && isConstEnumSymbol(type.symbol);
        }
        function isConstEnumSymbol(symbol) {
            return (symbol.flags & ts.SymbolFlags.ConstEnum) !== 0;
        }
        function checkInstanceOfExpression(node, leftType, rightType) {
            // TypeScript 1.0 spec (April 2014): 4.15.4
            // The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
            // and the right operand to be of type Any or a subtype of the 'Function' interface type. 
            // The result is always of the Boolean primitive type.
            // NOTE: do not raise error if leftType is unknown as related error was already reported
            if (!(leftType.flags & ts.TypeFlags.Any || isStructuredType(leftType))) {
                error(node.left, ts.Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            // NOTE: do not raise error if right is unknown as related error was already reported
            if (!(rightType.flags & ts.TypeFlags.Any || isTypeSubtypeOf(rightType, globalFunctionType))) {
                error(node.right, ts.Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
            }
            return booleanType;
        }
        function checkInExpression(node, leftType, rightType) {
            // TypeScript 1.0 spec (April 2014): 4.15.5
            // The in operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type,
            // and the right operand to be of type Any, an object type, or a type parameter type.
            // The result is always of the Boolean primitive type.
            if (leftType !== anyType && leftType !== stringType && leftType !== numberType) {
                error(node.left, ts.Diagnostics.The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number);
            }
            if (!(rightType.flags & ts.TypeFlags.Any || isStructuredType(rightType))) {
                error(node.right, ts.Diagnostics.The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            return booleanType;
        }
        function checkObjectLiteralAssignment(node, sourceType, contextualMapper) {
            var properties = node.properties;
            for (var i = 0; i < properties.length; i++) {
                var p = properties[i];
                if (p.kind === ts.SyntaxKind.PropertyAssignment || p.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    // TODO(andersh): Computed property support
                    var name = p.name;
                    var type = sourceType.flags & ts.TypeFlags.Any ? sourceType : getTypeOfPropertyOfType(sourceType, name.text) || isNumericName(name.text) && getIndexTypeOfType(sourceType, ts.IndexKind.Number) || getIndexTypeOfType(sourceType, ts.IndexKind.String);
                    if (type) {
                        checkDestructuringAssignment(p.initializer || name, type);
                    }
                    else {
                        error(name, ts.Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(sourceType), ts.declarationNameToString(name));
                    }
                }
                else {
                    error(p, ts.Diagnostics.Property_assignment_expected);
                }
            }
            return sourceType;
        }
        function checkArrayLiteralAssignment(node, sourceType, contextualMapper) {
            // TODOO(andersh): Allow iterable source type in ES6
            if (!isTypeAssignableTo(sourceType, anyArrayType)) {
                error(node, ts.Diagnostics.Type_0_is_not_an_array_type, typeToString(sourceType));
                return sourceType;
            }
            var elements = node.elements;
            for (var i = 0; i < elements.length; i++) {
                var e = elements[i];
                if (e.kind !== ts.SyntaxKind.OmittedExpression) {
                    if (e.kind !== ts.SyntaxKind.SpreadElementExpression) {
                        var propName = "" + i;
                        var type = sourceType.flags & ts.TypeFlags.Any ? sourceType : isTupleLikeType(sourceType) ? getTypeOfPropertyOfType(sourceType, propName) : getIndexTypeOfType(sourceType, ts.IndexKind.Number);
                        if (type) {
                            checkDestructuringAssignment(e, type, contextualMapper);
                        }
                        else {
                            error(e, ts.Diagnostics.Type_0_has_no_property_1, typeToString(sourceType), propName);
                        }
                    }
                    else {
                        if (i === elements.length - 1) {
                            checkReferenceAssignment(e.expression, sourceType, contextualMapper);
                        }
                        else {
                            error(e, ts.Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                        }
                    }
                }
            }
            return sourceType;
        }
        function checkDestructuringAssignment(target, sourceType, contextualMapper) {
            if (target.kind === ts.SyntaxKind.BinaryExpression && target.operator === ts.SyntaxKind.EqualsToken) {
                checkBinaryExpression(target, contextualMapper);
                target = target.left;
            }
            if (target.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                return checkObjectLiteralAssignment(target, sourceType, contextualMapper);
            }
            if (target.kind === ts.SyntaxKind.ArrayLiteralExpression) {
                return checkArrayLiteralAssignment(target, sourceType, contextualMapper);
            }
            return checkReferenceAssignment(target, sourceType, contextualMapper);
        }
        function checkReferenceAssignment(target, sourceType, contextualMapper) {
            var targetType = checkExpression(target, contextualMapper);
            if (checkReferenceExpression(target, ts.Diagnostics.Invalid_left_hand_side_of_assignment_expression, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant)) {
                checkTypeAssignableTo(sourceType, targetType, target, undefined);
            }
            return sourceType;
        }
        function checkBinaryExpression(node, contextualMapper) {
            // Grammar checking
            if (ts.isLeftHandSideExpression(node.left) && ts.isAssignmentOperator(node.operator)) {
                // ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
                // Assignment operator(11.13) or of a PostfixExpression(11.3)
                checkGrammarEvalOrArgumentsInStrictMode(node, node.left);
            }
            var operator = node.operator;
            if (operator === ts.SyntaxKind.EqualsToken && (node.left.kind === ts.SyntaxKind.ObjectLiteralExpression || node.left.kind === ts.SyntaxKind.ArrayLiteralExpression)) {
                return checkDestructuringAssignment(node.left, checkExpression(node.right, contextualMapper), contextualMapper);
            }
            var leftType = checkExpression(node.left, contextualMapper);
            var rightType = checkExpression(node.right, contextualMapper);
            switch (operator) {
                case ts.SyntaxKind.AsteriskToken:
                case ts.SyntaxKind.AsteriskEqualsToken:
                case ts.SyntaxKind.SlashToken:
                case ts.SyntaxKind.SlashEqualsToken:
                case ts.SyntaxKind.PercentToken:
                case ts.SyntaxKind.PercentEqualsToken:
                case ts.SyntaxKind.MinusToken:
                case ts.SyntaxKind.MinusEqualsToken:
                case ts.SyntaxKind.LessThanLessThanToken:
                case ts.SyntaxKind.LessThanLessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanToken:
                case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case ts.SyntaxKind.BarToken:
                case ts.SyntaxKind.BarEqualsToken:
                case ts.SyntaxKind.CaretToken:
                case ts.SyntaxKind.CaretEqualsToken:
                case ts.SyntaxKind.AmpersandToken:
                case ts.SyntaxKind.AmpersandEqualsToken:
                    // TypeScript 1.0 spec (April 2014): 4.15.1
                    // These operators require their operands to be of type Any, the Number primitive type,
                    // or an enum type. Operands of an enum type are treated 
                    // as having the primitive type Number. If one operand is the null or undefined value,
                    // it is treated as having the type of the other operand.
                    // The result is always of the Number primitive type.
                    if (leftType.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null))
                        leftType = rightType;
                    if (rightType.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null))
                        rightType = leftType;
                    var suggestedOperator;
                    // if a user tries to apply a bitwise operator to 2 boolean operands 
                    // try and return them a helpful suggestion
                    if ((leftType.flags & ts.TypeFlags.Boolean) && (rightType.flags & ts.TypeFlags.Boolean) && (suggestedOperator = getSuggestedBooleanOperator(node.operator)) !== undefined) {
                        error(node, ts.Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, ts.tokenToString(node.operator), ts.tokenToString(suggestedOperator));
                    }
                    else {
                        // otherwise just check each operand separately and report errors as normal 
                        var leftOk = checkArithmeticOperandType(node.left, leftType, ts.Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        var rightOk = checkArithmeticOperandType(node.right, rightType, ts.Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        if (leftOk && rightOk) {
                            checkAssignmentOperator(numberType);
                        }
                    }
                    return numberType;
                case ts.SyntaxKind.PlusToken:
                case ts.SyntaxKind.PlusEqualsToken:
                    // TypeScript 1.0 spec (April 2014): 4.15.2
                    // The binary + operator requires both operands to be of the Number primitive type or an enum type,
                    // or at least one of the operands to be of type Any or the String primitive type.
                    // If one operand is the null or undefined value, it is treated as having the type of the other operand.
                    if (leftType.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null))
                        leftType = rightType;
                    if (rightType.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null))
                        rightType = leftType;
                    var resultType;
                    if (leftType.flags & ts.TypeFlags.NumberLike && rightType.flags & ts.TypeFlags.NumberLike) {
                        // Operands of an enum type are treated as having the primitive type Number.
                        // If both operands are of the Number primitive type, the result is of the Number primitive type.
                        resultType = numberType;
                    }
                    else if (leftType.flags & ts.TypeFlags.StringLike || rightType.flags & ts.TypeFlags.StringLike) {
                        // If one or both operands are of the String primitive type, the result is of the String primitive type.
                        resultType = stringType;
                    }
                    else if (leftType.flags & ts.TypeFlags.Any || leftType === unknownType || rightType.flags & ts.TypeFlags.Any || rightType === unknownType) {
                        // Otherwise, the result is of type Any.
                        // NOTE: unknown type here denotes error type. Old compiler treated this case as any type so do we.
                        resultType = anyType;
                    }
                    if (!resultType) {
                        reportOperatorError();
                        return anyType;
                    }
                    if (operator === ts.SyntaxKind.PlusEqualsToken) {
                        checkAssignmentOperator(resultType);
                    }
                    return resultType;
                case ts.SyntaxKind.EqualsEqualsToken:
                case ts.SyntaxKind.ExclamationEqualsToken:
                case ts.SyntaxKind.EqualsEqualsEqualsToken:
                case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                case ts.SyntaxKind.LessThanToken:
                case ts.SyntaxKind.GreaterThanToken:
                case ts.SyntaxKind.LessThanEqualsToken:
                case ts.SyntaxKind.GreaterThanEqualsToken:
                    if (!isTypeAssignableTo(leftType, rightType) && !isTypeAssignableTo(rightType, leftType)) {
                        reportOperatorError();
                    }
                    return booleanType;
                case ts.SyntaxKind.InstanceOfKeyword:
                    return checkInstanceOfExpression(node, leftType, rightType);
                case ts.SyntaxKind.InKeyword:
                    return checkInExpression(node, leftType, rightType);
                case ts.SyntaxKind.AmpersandAmpersandToken:
                    return rightType;
                case ts.SyntaxKind.BarBarToken:
                    return getUnionType([leftType, rightType]);
                case ts.SyntaxKind.EqualsToken:
                    checkAssignmentOperator(rightType);
                    return rightType;
                case ts.SyntaxKind.CommaToken:
                    return rightType;
            }
            function getSuggestedBooleanOperator(operator) {
                switch (operator) {
                    case ts.SyntaxKind.BarToken:
                    case ts.SyntaxKind.BarEqualsToken:
                        return ts.SyntaxKind.BarBarToken;
                    case ts.SyntaxKind.CaretToken:
                    case ts.SyntaxKind.CaretEqualsToken:
                        return ts.SyntaxKind.ExclamationEqualsEqualsToken;
                    case ts.SyntaxKind.AmpersandToken:
                    case ts.SyntaxKind.AmpersandEqualsToken:
                        return ts.SyntaxKind.AmpersandAmpersandToken;
                    default:
                        return undefined;
                }
            }
            function checkAssignmentOperator(valueType) {
                if (produceDiagnostics && operator >= ts.SyntaxKind.FirstAssignment && operator <= ts.SyntaxKind.LastAssignment) {
                    // TypeScript 1.0 spec (April 2014): 4.17
                    // An assignment of the form
                    //    VarExpr = ValueExpr
                    // requires VarExpr to be classified as a reference
                    // A compound assignment furthermore requires VarExpr to be classified as a reference (section 4.1) 
                    // and the type of the non - compound operation to be assignable to the type of VarExpr.
                    var ok = checkReferenceExpression(node.left, ts.Diagnostics.Invalid_left_hand_side_of_assignment_expression, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                    // Use default messages
                    if (ok) {
                        // to avoid cascading errors check assignability only if 'isReference' check succeeded and no errors were reported
                        checkTypeAssignableTo(valueType, leftType, node.left, undefined);
                    }
                }
            }
            function reportOperatorError() {
                error(node, ts.Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, ts.tokenToString(node.operator), typeToString(leftType), typeToString(rightType));
            }
        }
        function checkYieldExpression(node) {
            // Grammar checking
            if (!(node.parserContextFlags & ts.ParserContextFlags.Yield)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.yield_expression_must_be_contained_within_a_generator_declaration);
            }
            else {
                grammarErrorOnFirstToken(node, ts.Diagnostics.yield_expressions_are_not_currently_supported);
            }
        }
        function checkConditionalExpression(node, contextualMapper) {
            checkExpression(node.condition);
            var type1 = checkExpression(node.whenTrue, contextualMapper);
            var type2 = checkExpression(node.whenFalse, contextualMapper);
            return getUnionType([type1, type2]);
        }
        function checkTemplateExpression(node) {
            // We just want to check each expressions, but we are unconcerned with
            // the type of each expression, as any value may be coerced into a string.
            // It is worth asking whether this is what we really want though.
            // A place where we actually *are* concerned with the expressions' types are
            // in tagged templates.
            ts.forEach(node.templateSpans, function (templateSpan) {
                checkExpression(templateSpan.expression);
            });
            return stringType;
        }
        function checkExpressionWithContextualType(node, contextualType, contextualMapper) {
            var saveContextualType = node.contextualType;
            node.contextualType = contextualType;
            var result = checkExpression(node, contextualMapper);
            node.contextualType = saveContextualType;
            return result;
        }
        function checkExpressionCached(node, contextualMapper) {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node, contextualMapper);
            }
            return links.resolvedType;
        }
        function checkObjectLiteralMethod(node, contextualMapper) {
            // Grammar checking
            checkGrammarMethod(node);
            var uninstantiatedType = checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper);
            return instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, contextualMapper);
        }
        function instantiateTypeWithSingleGenericCallSignature(node, type, contextualMapper) {
            if (contextualMapper && contextualMapper !== identityMapper) {
                var signature = getSingleCallSignature(type);
                if (signature && signature.typeParameters) {
                    var contextualType = getContextualType(node);
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
        function checkExpression(node, contextualMapper) {
            return checkExpressionOrQualifiedName(node, contextualMapper);
        }
        // Checks an expression and returns its type. The contextualMapper parameter serves two purposes: When
        // contextualMapper is not undefined and not equal to the identityMapper function object it indicates that the
        // expression is being inferentially typed (section 4.12.2 in spec) and provides the type mapper to use in
        // conjunction with the generic contextual type. When contextualMapper is equal to the identityMapper function
        // object, it serves as an indicator that all contained function and arrow expressions should be considered to
        // have the wildcard function type; this form of type check is used during overload resolution to exclude
        // contextually typed function and arrow expressions in the initial phase.
        function checkExpressionOrQualifiedName(node, contextualMapper) {
            var type;
            if (node.kind == ts.SyntaxKind.QualifiedName) {
                type = checkQualifiedName(node);
            }
            else {
                var uninstantiatedType = checkExpressionWorker(node, contextualMapper);
                type = instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, contextualMapper);
            }
            if (isConstEnumObjectType(type)) {
                // enum object type for const enums are only permitted in:
                // - 'left' in property access 
                // - 'object' in indexed access
                // - target in rhs of import statement
                var ok = (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && node.parent.expression === node) || (node.parent.kind === ts.SyntaxKind.ElementAccessExpression && node.parent.expression === node) || ((node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.QualifiedName) && isInRightSideOfImportOrExportAssignment(node));
                if (!ok) {
                    error(node, ts.Diagnostics.const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment);
                }
            }
            return type;
        }
        function checkNumericLiteral(node) {
            // Grammar checking
            checkGrammarNumbericLiteral(node);
            return numberType;
        }
        function checkExpressionWorker(node, contextualMapper) {
            switch (node.kind) {
                case ts.SyntaxKind.Identifier:
                    return checkIdentifier(node);
                case ts.SyntaxKind.ThisKeyword:
                    return checkThisExpression(node);
                case ts.SyntaxKind.SuperKeyword:
                    return checkSuperExpression(node);
                case ts.SyntaxKind.NullKeyword:
                    return nullType;
                case ts.SyntaxKind.TrueKeyword:
                case ts.SyntaxKind.FalseKeyword:
                    return booleanType;
                case ts.SyntaxKind.NumericLiteral:
                    return checkNumericLiteral(node);
                case ts.SyntaxKind.TemplateExpression:
                    return checkTemplateExpression(node);
                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                    return stringType;
                case ts.SyntaxKind.RegularExpressionLiteral:
                    return globalRegExpType;
                case ts.SyntaxKind.ArrayLiteralExpression:
                    return checkArrayLiteral(node, contextualMapper);
                case ts.SyntaxKind.ObjectLiteralExpression:
                    return checkObjectLiteral(node, contextualMapper);
                case ts.SyntaxKind.PropertyAccessExpression:
                    return checkPropertyAccessExpression(node);
                case ts.SyntaxKind.ElementAccessExpression:
                    return checkIndexedAccess(node);
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.NewExpression:
                    return checkCallExpression(node);
                case ts.SyntaxKind.TaggedTemplateExpression:
                    return checkTaggedTemplateExpression(node);
                case ts.SyntaxKind.TypeAssertionExpression:
                    return checkTypeAssertion(node);
                case ts.SyntaxKind.ParenthesizedExpression:
                    return checkExpression(node.expression);
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    return checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper);
                case ts.SyntaxKind.TypeOfExpression:
                    return checkTypeOfExpression(node);
                case ts.SyntaxKind.DeleteExpression:
                    return checkDeleteExpression(node);
                case ts.SyntaxKind.VoidExpression:
                    return checkVoidExpression(node);
                case ts.SyntaxKind.PrefixUnaryExpression:
                    return checkPrefixUnaryExpression(node);
                case ts.SyntaxKind.PostfixUnaryExpression:
                    return checkPostfixUnaryExpression(node);
                case ts.SyntaxKind.BinaryExpression:
                    return checkBinaryExpression(node, contextualMapper);
                case ts.SyntaxKind.ConditionalExpression:
                    return checkConditionalExpression(node, contextualMapper);
                case ts.SyntaxKind.SpreadElementExpression:
                    return checkSpreadElementExpression(node, contextualMapper);
                case ts.SyntaxKind.OmittedExpression:
                    return undefinedType;
                case ts.SyntaxKind.YieldExpression:
                    checkYieldExpression(node);
                    return unknownType;
            }
            return unknownType;
        }
        // DECLARATION AND STATEMENT TYPE CHECKING
        function checkTypeParameter(node) {
            // Grammar Checking
            if (node.expression) {
                grammarErrorOnFirstToken(node.expression, ts.Diagnostics.Type_expected);
            }
            checkSourceElement(node.constraint);
            if (produceDiagnostics) {
                checkTypeParameterHasIllegalReferencesInConstraint(node);
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Type_parameter_name_cannot_be_0);
            }
            // TODO: Check multiple declarations are identical
        }
        function checkParameter(node) {
            // Grammar checking
            // It is a SyntaxError if the Identifier "eval" or the Identifier "arguments" occurs as the
            // Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in strict code
            // or if its FunctionBody is strict code(11.1.5).
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
            // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarEvalOrArgumentsInStrictMode(node, node.name);
            checkVariableLikeDeclaration(node);
            var func = ts.getContainingFunction(node);
            if (node.flags & ts.NodeFlags.AccessibilityModifier) {
                func = ts.getContainingFunction(node);
                if (!(func.kind === ts.SyntaxKind.Constructor && ts.nodeIsPresent(func.body))) {
                    error(node, ts.Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                }
            }
            if (node.questionToken && ts.isBindingPattern(node.name) && func.body) {
                error(node, ts.Diagnostics.A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature);
            }
            if (node.dotDotDotToken) {
                if (!isArrayType(getTypeOfSymbol(node.symbol))) {
                    error(node, ts.Diagnostics.A_rest_parameter_must_be_of_an_array_type);
                }
            }
        }
        function checkSignatureDeclaration(node) {
            // Grammar checking
            if (node.kind === ts.SyntaxKind.IndexSignature) {
                checkGrammarIndexSignature(node);
            }
            else if (node.kind === ts.SyntaxKind.FunctionType || node.kind === ts.SyntaxKind.FunctionDeclaration || node.kind === ts.SyntaxKind.ConstructorType || node.kind === ts.SyntaxKind.CallSignature || node.kind === ts.SyntaxKind.Constructor || node.kind === ts.SyntaxKind.ConstructSignature) {
                checkGrammarFunctionLikeDeclaration(node);
            }
            checkTypeParameters(node.typeParameters);
            ts.forEach(node.parameters, checkParameter);
            if (node.type) {
                checkSourceElement(node.type);
            }
            if (produceDiagnostics) {
                checkCollisionWithArgumentsInGeneratedCode(node);
                if (compilerOptions.noImplicitAny && !node.type) {
                    switch (node.kind) {
                        case ts.SyntaxKind.ConstructSignature:
                            error(node, ts.Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                        case ts.SyntaxKind.CallSignature:
                            error(node, ts.Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                    }
                }
            }
            checkSpecializedSignatureDeclaration(node);
        }
        function checkTypeForDuplicateIndexSignatures(node) {
            if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
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
                    var declaration = indexSymbol.declarations[i];
                    if (declaration.parameters.length === 1 && declaration.parameters[0].type) {
                        switch (declaration.parameters[0].type.kind) {
                            case ts.SyntaxKind.StringKeyword:
                                if (!seenStringIndexer) {
                                    seenStringIndexer = true;
                                }
                                else {
                                    error(declaration, ts.Diagnostics.Duplicate_string_index_signature);
                                }
                                break;
                            case ts.SyntaxKind.NumberKeyword:
                                if (!seenNumericIndexer) {
                                    seenNumericIndexer = true;
                                }
                                else {
                                    error(declaration, ts.Diagnostics.Duplicate_number_index_signature);
                                }
                                break;
                        }
                    }
                }
            }
        }
        function checkPropertyDeclaration(node) {
            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarProperty(node);
            checkVariableLikeDeclaration(node);
        }
        function checkMethodDeclaration(node) {
            // Grammar checking
            checkGrammarMethod(node) || checkGrammarComputedPropertyName(node.name);
            // Grammar checking for modifiers is done inside the function checkGrammarFunctionLikeDeclaration
            checkFunctionLikeDeclaration(node);
        }
        function checkConstructorDeclaration(node) {
            // Grammar check on signature of constructor and modifier of the constructor is done in checkSignatureDeclaration function.
            checkSignatureDeclaration(node);
            // Grammar check for checking only related to constructoDeclaration
            checkGrammarConstructorTypeParameters(node) || checkGrammarConstructorTypeAnnotation(node);
            checkSourceElement(node.body);
            var symbol = getSymbolOfNode(node);
            var firstDeclaration = ts.getDeclarationOfKind(symbol, node.kind);
            // Only type check the symbol once
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(symbol);
            }
            // exit early in the case of signature - super checks are not relevant to them
            if (ts.nodeIsMissing(node.body)) {
                return;
            }
            if (!produceDiagnostics) {
                return;
            }
            function isSuperCallExpression(n) {
                return n.kind === ts.SyntaxKind.CallExpression && n.expression.kind === ts.SyntaxKind.SuperKeyword;
            }
            function containsSuperCall(n) {
                if (isSuperCallExpression(n)) {
                    return true;
                }
                switch (n.kind) {
                    case ts.SyntaxKind.FunctionExpression:
                    case ts.SyntaxKind.FunctionDeclaration:
                    case ts.SyntaxKind.ArrowFunction:
                    case ts.SyntaxKind.ObjectLiteralExpression: return false;
                    default: return ts.forEachChild(n, containsSuperCall);
                }
            }
            function markThisReferencesAsErrors(n) {
                if (n.kind === ts.SyntaxKind.ThisKeyword) {
                    error(n, ts.Diagnostics.this_cannot_be_referenced_in_current_location);
                }
                else if (n.kind !== ts.SyntaxKind.FunctionExpression && n.kind !== ts.SyntaxKind.FunctionDeclaration) {
                    ts.forEachChild(n, markThisReferencesAsErrors);
                }
            }
            function isInstancePropertyWithInitializer(n) {
                return n.kind === ts.SyntaxKind.PropertyDeclaration && !(n.flags & ts.NodeFlags.Static) && !!n.initializer;
            }
            // TS 1.0 spec (April 2014): 8.3.2
            // Constructors of classes with no extends clause may not contain super calls, whereas 
            // constructors of derived classes must contain at least one super call somewhere in their function body.
            if (ts.getClassBaseTypeNode(node.parent)) {
                if (containsSuperCall(node.body)) {
                    // The first statement in the body of a constructor must be a super call if both of the following are true:
                    // - The containing class is a derived class.
                    // - The constructor declares parameter properties 
                    //   or the containing class declares instance member variables with initializers.
                    var superCallShouldBeFirst = ts.forEach(node.parent.members, isInstancePropertyWithInitializer) || ts.forEach(node.parameters, function (p) { return p.flags & (ts.NodeFlags.Public | ts.NodeFlags.Private | ts.NodeFlags.Protected); });
                    if (superCallShouldBeFirst) {
                        var statements = node.body.statements;
                        if (!statements.length || statements[0].kind !== ts.SyntaxKind.ExpressionStatement || !isSuperCallExpression(statements[0].expression)) {
                            error(node, ts.Diagnostics.A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties);
                        }
                        else {
                            // In such a required super call, it is a compile-time error for argument expressions to reference this.
                            markThisReferencesAsErrors(statements[0].expression);
                        }
                    }
                }
                else {
                    error(node, ts.Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call);
                }
            }
        }
        function checkAccessorDeclaration(node) {
            if (produceDiagnostics) {
                // Grammar checking accessors
                checkGrammarFunctionLikeDeclaration(node) || checkGrammarAccessor(node) || checkGrammarComputedPropertyName(node.name);
                if (node.kind === ts.SyntaxKind.GetAccessor) {
                    if (!ts.isInAmbientContext(node) && ts.nodeIsPresent(node.body) && !(bodyContainsAReturnStatement(node.body) || bodyContainsSingleThrowStatement(node.body))) {
                        error(node.name, ts.Diagnostics.A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement);
                    }
                }
                if (!ts.hasComputedNameButNotSymbol(node)) {
                    // TypeScript 1.0 spec (April 2014): 8.4.3
                    // Accessors for the same member name must specify the same accessibility.
                    var otherKind = node.kind === ts.SyntaxKind.GetAccessor ? ts.SyntaxKind.SetAccessor : ts.SyntaxKind.GetAccessor;
                    var otherAccessor = ts.getDeclarationOfKind(node.symbol, otherKind);
                    if (otherAccessor) {
                        if (((node.flags & ts.NodeFlags.AccessibilityModifier) !== (otherAccessor.flags & ts.NodeFlags.AccessibilityModifier))) {
                            error(node.name, ts.Diagnostics.Getter_and_setter_accessors_do_not_agree_in_visibility);
                        }
                        var currentAccessorType = getAnnotatedAccessorType(node);
                        var otherAccessorType = getAnnotatedAccessorType(otherAccessor);
                        // TypeScript 1.0 spec (April 2014): 4.5
                        // If both accessors include type annotations, the specified types must be identical.
                        if (currentAccessorType && otherAccessorType) {
                            if (!isTypeIdenticalTo(currentAccessorType, otherAccessorType)) {
                                error(node, ts.Diagnostics.get_and_set_accessor_must_have_the_same_type);
                            }
                        }
                    }
                    checkAndStoreTypeOfAccessors(getSymbolOfNode(node));
                }
            }
            checkFunctionLikeDeclaration(node);
        }
        function checkTypeReference(node) {
            // Grammar checking
            checkGrammarTypeArguments(node, node.typeArguments);
            var type = getTypeFromTypeReferenceNode(node);
            if (type !== unknownType && node.typeArguments) {
                // Do type argument local checks only if referenced type is successfully resolved
                var len = node.typeArguments.length;
                for (var i = 0; i < len; i++) {
                    checkSourceElement(node.typeArguments[i]);
                    var constraint = getConstraintOfTypeParameter(type.target.typeParameters[i]);
                    if (produceDiagnostics && constraint) {
                        var typeArgument = type.typeArguments[i];
                        checkTypeAssignableTo(typeArgument, constraint, node, ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
        }
        function checkTypeQuery(node) {
            getTypeFromTypeQueryNode(node);
        }
        function checkTypeLiteral(node) {
            ts.forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                var type = getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function checkArrayType(node) {
            checkSourceElement(node.elementType);
        }
        function checkTupleType(node) {
            // Grammar checking
            var hasErrorFromDisallowedTrailingComma = checkGrammarForDisallowedTrailingComma(node.elementTypes);
            if (!hasErrorFromDisallowedTrailingComma && node.elementTypes.length === 0) {
                grammarErrorOnNode(node, ts.Diagnostics.A_tuple_type_element_list_cannot_be_empty);
            }
            ts.forEach(node.elementTypes, checkSourceElement);
        }
        function checkUnionType(node) {
            ts.forEach(node.types, checkSourceElement);
        }
        function isPrivateWithinAmbient(node) {
            return (node.flags & ts.NodeFlags.Private) && ts.isInAmbientContext(node);
        }
        function checkSpecializedSignatureDeclaration(signatureDeclarationNode) {
            if (!produceDiagnostics) {
                return;
            }
            var signature = getSignatureFromDeclaration(signatureDeclarationNode);
            if (!signature.hasStringLiterals) {
                return;
            }
            // TypeScript 1.0 spec (April 2014): 3.7.2.2
            // Specialized signatures are not permitted in conjunction with a function body
            if (ts.nodeIsPresent(signatureDeclarationNode.body)) {
                error(signatureDeclarationNode, ts.Diagnostics.A_signature_with_an_implementation_cannot_use_a_string_literal_type);
                return;
            }
            // TypeScript 1.0 spec (April 2014): 3.7.2.4
            // Every specialized call or construct signature in an object type must be assignable
            // to at least one non-specialized call or construct signature in the same object type
            var signaturesToCheck;
            // Unnamed (call\construct) signatures in interfaces are inherited and not shadowed so examining just node symbol won't give complete answer.
            // Use declaring type to obtain full list of signatures.
            if (!signatureDeclarationNode.name && signatureDeclarationNode.parent && signatureDeclarationNode.parent.kind === ts.SyntaxKind.InterfaceDeclaration) {
                ts.Debug.assert(signatureDeclarationNode.kind === ts.SyntaxKind.CallSignature || signatureDeclarationNode.kind === ts.SyntaxKind.ConstructSignature);
                var signatureKind = signatureDeclarationNode.kind === ts.SyntaxKind.CallSignature ? ts.SignatureKind.Call : ts.SignatureKind.Construct;
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
            error(signatureDeclarationNode, ts.Diagnostics.Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature);
        }
        function getEffectiveDeclarationFlags(n, flagsToCheck) {
            var flags = ts.getCombinedNodeFlags(n);
            if (n.parent.kind !== ts.SyntaxKind.InterfaceDeclaration && ts.isInAmbientContext(n)) {
                if (!(flags & ts.NodeFlags.Ambient)) {
                    // It is nested in an ambient context, which means it is automatically exported
                    flags |= ts.NodeFlags.Export;
                }
                flags |= ts.NodeFlags.Ambient;
            }
            return flags & flagsToCheck;
        }
        function checkFunctionOrConstructorSymbol(symbol) {
            if (!produceDiagnostics) {
                return;
            }
            function getCanonicalOverload(overloads, implementation) {
                // Consider the canonical set of flags to be the flags of the bodyDeclaration or the first declaration
                // Error on all deviations from this canonical set of flags
                // The caveat is that if some overloads are defined in lib.d.ts, we don't want to
                // report the errors on those. To achieve this, we will say that the implementation is
                // the canonical signature only if it is in the same container as the first overload
                var implementationSharesContainerWithFirstOverload = implementation !== undefined && implementation.parent === overloads[0].parent;
                return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
            }
            function checkFlagAgreementBetweenOverloads(overloads, implementation, flagsToCheck, someOverloadFlags, allOverloadFlags) {
                // Error if some overloads have a flag that is not shared by all overloads. To find the
                // deviations, we XOR someOverloadFlags with allOverloadFlags
                var someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                if (someButNotAllOverloadFlags !== 0) {
                    var canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck);
                    ts.forEach(overloads, function (o) {
                        var deviation = getEffectiveDeclarationFlags(o, flagsToCheck) ^ canonicalFlags;
                        if (deviation & ts.NodeFlags.Export) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_exported_or_not_exported);
                        }
                        else if (deviation & ts.NodeFlags.Ambient) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                        }
                        else if (deviation & (ts.NodeFlags.Private | ts.NodeFlags.Protected)) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                        }
                    });
                }
            }
            function checkQuestionTokenAgreementBetweenOverloads(overloads, implementation, someHaveQuestionToken, allHaveQuestionToken) {
                if (someHaveQuestionToken !== allHaveQuestionToken) {
                    var canonicalHasQuestionToken = ts.hasQuestionToken(getCanonicalOverload(overloads, implementation));
                    ts.forEach(overloads, function (o) {
                        var deviation = ts.hasQuestionToken(o) !== canonicalHasQuestionToken;
                        if (deviation) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                        }
                    });
                }
            }
            var flagsToCheck = ts.NodeFlags.Export | ts.NodeFlags.Ambient | ts.NodeFlags.Private | ts.NodeFlags.Protected;
            var someNodeFlags = 0;
            var allNodeFlags = flagsToCheck;
            var someHaveQuestionToken = false;
            var allHaveQuestionToken = true;
            var hasOverloads = false;
            var bodyDeclaration;
            var lastSeenNonAmbientDeclaration;
            var previousDeclaration;
            var declarations = symbol.declarations;
            var isConstructor = (symbol.flags & ts.SymbolFlags.Constructor) !== 0;
            function reportImplementationExpectedError(node) {
                if (node.name && ts.getFullWidth(node.name) === 0) {
                    return;
                }
                var seen = false;
                var subsequentNode = ts.forEachChild(node.parent, function (c) {
                    if (seen) {
                        return c;
                    }
                    else {
                        seen = c === node;
                    }
                });
                if (subsequentNode) {
                    if (subsequentNode.kind === node.kind) {
                        var errorNode = subsequentNode.name || subsequentNode;
                        // TODO(jfreeman): These are methods, so handle computed name case
                        if (node.name && subsequentNode.name && node.name.text === subsequentNode.name.text) {
                            // the only situation when this is possible (same kind\same name but different symbol) - mixed static and instance class members
                            ts.Debug.assert(node.kind === ts.SyntaxKind.MethodDeclaration || node.kind === ts.SyntaxKind.MethodSignature);
                            ts.Debug.assert((node.flags & ts.NodeFlags.Static) !== (subsequentNode.flags & ts.NodeFlags.Static));
                            var diagnostic = node.flags & ts.NodeFlags.Static ? ts.Diagnostics.Function_overload_must_be_static : ts.Diagnostics.Function_overload_must_not_be_static;
                            error(errorNode, diagnostic);
                            return;
                        }
                        else if (ts.nodeIsPresent(subsequentNode.body)) {
                            error(errorNode, ts.Diagnostics.Function_implementation_name_must_be_0, ts.declarationNameToString(node.name));
                            return;
                        }
                    }
                }
                var errorNode = node.name || node;
                if (isConstructor) {
                    error(errorNode, ts.Diagnostics.Constructor_implementation_is_missing);
                }
                else {
                    error(errorNode, ts.Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                }
            }
            // when checking exported function declarations across modules check only duplicate implementations
            // names and consistency of modifiers are verified when we check local symbol
            var isExportSymbolInsideModule = symbol.parent && symbol.parent.flags & ts.SymbolFlags.Module;
            var duplicateFunctionDeclaration = false;
            var multipleConstructorImplementation = false;
            for (var i = 0; i < declarations.length; i++) {
                var node = declarations[i];
                var inAmbientContext = ts.isInAmbientContext(node);
                var inAmbientContextOrInterface = node.parent.kind === ts.SyntaxKind.InterfaceDeclaration || node.parent.kind === ts.SyntaxKind.TypeLiteral || inAmbientContext;
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
                if (node.kind === ts.SyntaxKind.FunctionDeclaration || node.kind === ts.SyntaxKind.MethodDeclaration || node.kind === ts.SyntaxKind.MethodSignature || node.kind === ts.SyntaxKind.Constructor) {
                    var currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
                    someNodeFlags |= currentNodeFlags;
                    allNodeFlags &= currentNodeFlags;
                    someHaveQuestionToken = someHaveQuestionToken || ts.hasQuestionToken(node);
                    allHaveQuestionToken = allHaveQuestionToken && ts.hasQuestionToken(node);
                    if (ts.nodeIsPresent(node.body) && bodyDeclaration) {
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
                    if (ts.nodeIsPresent(node.body)) {
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
                ts.forEach(declarations, function (declaration) {
                    error(declaration, ts.Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                });
            }
            if (duplicateFunctionDeclaration) {
                ts.forEach(declarations, function (declaration) {
                    error(declaration.name, ts.Diagnostics.Duplicate_function_implementation);
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
                        for (var i = 0, len = signatures.length; i < len; ++i) {
                            if (!signatures[i].hasStringLiterals && !isSignatureAssignableTo(bodySignature, signatures[i])) {
                                error(signatures[i].declaration, ts.Diagnostics.Overload_signature_is_not_compatible_with_function_implementation);
                                break;
                            }
                        }
                    }
                }
            }
        }
        function checkExportsOnMergedDeclarations(node) {
            if (!produceDiagnostics) {
                return;
            }
            var symbol;
            // Exports should be checked only if enclosing module contains both exported and non exported declarations.
            // In case if all declarations are non-exported check is unnecessary.
            // if localSymbol is defined on node then node itself is exported - check is required
            var symbol = node.localSymbol;
            if (!symbol) {
                // local symbol is undefined => this declaration is non-exported.
                // however symbol might contain other declarations that are exported
                symbol = getSymbolOfNode(node);
                if (!(symbol.flags & ts.SymbolFlags.Export)) {
                    // this is a pure local symbol (all declarations are non-exported) - no need to check anything
                    return;
                }
            }
            // run the check only for the first declaration in the list
            if (ts.getDeclarationOfKind(symbol, node.kind) !== node) {
                return;
            }
            // we use SymbolFlags.ExportValue, SymbolFlags.ExportType and SymbolFlags.ExportNamespace 
            // to denote disjoint declarationSpaces (without making new enum type).
            var exportedDeclarationSpaces = 0;
            var nonExportedDeclarationSpaces = 0;
            ts.forEach(symbol.declarations, function (d) {
                var declarationSpaces = getDeclarationSpaces(d);
                if (getEffectiveDeclarationFlags(d, ts.NodeFlags.Export)) {
                    exportedDeclarationSpaces |= declarationSpaces;
                }
                else {
                    nonExportedDeclarationSpaces |= declarationSpaces;
                }
            });
            var commonDeclarationSpace = exportedDeclarationSpaces & nonExportedDeclarationSpaces;
            if (commonDeclarationSpace) {
                // declaration spaces for exported and non-exported declarations intersect
                ts.forEach(symbol.declarations, function (d) {
                    if (getDeclarationSpaces(d) & commonDeclarationSpace) {
                        error(d.name, ts.Diagnostics.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local, ts.declarationNameToString(d.name));
                    }
                });
            }
            function getDeclarationSpaces(d) {
                switch (d.kind) {
                    case ts.SyntaxKind.InterfaceDeclaration:
                        return ts.SymbolFlags.ExportType;
                    case ts.SyntaxKind.ModuleDeclaration:
                        return d.name.kind === ts.SyntaxKind.StringLiteral || ts.getModuleInstanceState(d) !== ts.ModuleInstanceState.NonInstantiated ? ts.SymbolFlags.ExportNamespace | ts.SymbolFlags.ExportValue : ts.SymbolFlags.ExportNamespace;
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.EnumDeclaration:
                        return ts.SymbolFlags.ExportType | ts.SymbolFlags.ExportValue;
                    case ts.SyntaxKind.ImportDeclaration:
                        var result = 0;
                        var target = resolveImport(getSymbolOfNode(d));
                        ts.forEach(target.declarations, function (d) {
                            result |= getDeclarationSpaces(d);
                        });
                        return result;
                    default:
                        return ts.SymbolFlags.ExportValue;
                }
            }
        }
        function checkFunctionDeclaration(node) {
            if (produceDiagnostics) {
                checkFunctionLikeDeclaration(node) || checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) || checkGrammarFunctionName(node.name) || checkGrammarForGenerator(node);
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
        }
        function checkFunctionLikeDeclaration(node) {
            checkSignatureDeclaration(node);
            if (!ts.hasComputedNameButNotSymbol(node)) {
                // first we want to check the local symbol that contain this declaration
                // - if node.localSymbol !== undefined - this is current declaration is exported and localSymbol points to the local symbol
                // - if node.localSymbol === undefined - this node is non-exported so we can just pick the result of getSymbolOfNode
                var symbol = getSymbolOfNode(node);
                var localSymbol = node.localSymbol || symbol;
                var firstDeclaration = ts.getDeclarationOfKind(localSymbol, node.kind);
                // Only type check the symbol once
                if (node === firstDeclaration) {
                    checkFunctionOrConstructorSymbol(localSymbol);
                }
                if (symbol.parent) {
                    // run check once for the first declaration
                    if (ts.getDeclarationOfKind(symbol, node.kind) === node) {
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
            if (compilerOptions.noImplicitAny && ts.nodeIsMissing(node.body) && !node.type && !isPrivateWithinAmbient(node)) {
                reportImplicitAnyError(node, anyType);
            }
        }
        function checkBlock(node) {
            // Grammar checking for SyntaxKind.Block
            if (node.kind === ts.SyntaxKind.Block) {
                checkGrammarForStatementInAmbientContext(node);
            }
            ts.forEach(node.statements, checkSourceElement);
            if (ts.isFunctionBlock(node) || node.kind === ts.SyntaxKind.ModuleBlock) {
                checkFunctionExpressionBodies(node);
            }
        }
        function checkCollisionWithArgumentsInGeneratedCode(node) {
            // no rest parameters \ declaration context \ overload - no codegen impact
            if (!ts.hasRestParameters(node) || ts.isInAmbientContext(node) || ts.nodeIsMissing(node.body)) {
                return;
            }
            ts.forEach(node.parameters, function (p) {
                if (p.name && !ts.isBindingPattern(p.name) && p.name.text === argumentsSymbol.name) {
                    error(p, ts.Diagnostics.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters);
                }
            });
        }
        function needCollisionCheckForIdentifier(node, identifier, name) {
            if (!(identifier && identifier.text === name)) {
                return false;
            }
            if (node.kind === ts.SyntaxKind.PropertyDeclaration || node.kind === ts.SyntaxKind.PropertySignature || node.kind === ts.SyntaxKind.MethodDeclaration || node.kind === ts.SyntaxKind.MethodSignature || node.kind === ts.SyntaxKind.GetAccessor || node.kind === ts.SyntaxKind.SetAccessor) {
                // it is ok to have member named '_super' or '_this' - member access is always qualified
                return false;
            }
            if (ts.isInAmbientContext(node)) {
                // ambient context - no codegen impact
                return false;
            }
            var root = getRootDeclaration(node);
            if (root.kind === ts.SyntaxKind.Parameter && ts.nodeIsMissing(root.parent.body)) {
                // just an overload - no codegen impact
                return false;
            }
            return true;
        }
        function checkCollisionWithCapturedThisVariable(node, name) {
            if (needCollisionCheckForIdentifier(node, name, "_this")) {
                potentialThisCollisions.push(node);
            }
        }
        // this function will run after checking the source file so 'CaptureThis' is correct for all nodes
        function checkIfThisIsCapturedInEnclosingScope(node) {
            var current = node;
            while (current) {
                if (getNodeCheckFlags(current) & ts.NodeCheckFlags.CaptureThis) {
                    var isDeclaration = node.kind !== ts.SyntaxKind.Identifier;
                    if (isDeclaration) {
                        error(node.name, ts.Diagnostics.Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference);
                    }
                    else {
                        error(node, ts.Diagnostics.Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference);
                    }
                    return;
                }
                current = current.parent;
            }
        }
        function checkCollisionWithCapturedSuperVariable(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "_super")) {
                return;
            }
            // bubble up and find containing type
            var enclosingClass = ts.getAncestor(node, ts.SyntaxKind.ClassDeclaration);
            // if containing type was not found or it is ambient - exit (no codegen)
            if (!enclosingClass || ts.isInAmbientContext(enclosingClass)) {
                return;
            }
            if (ts.getClassBaseTypeNode(enclosingClass)) {
                var isDeclaration = node.kind !== ts.SyntaxKind.Identifier;
                if (isDeclaration) {
                    error(node, ts.Diagnostics.Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference);
                }
                else {
                    error(node, ts.Diagnostics.Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference);
                }
            }
        }
        function checkCollisionWithRequireExportsInGeneratedCode(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "require") && !needCollisionCheckForIdentifier(node, name, "exports")) {
                return;
            }
            // Uninstantiated modules shouldnt do this check
            if (node.kind === ts.SyntaxKind.ModuleDeclaration && ts.getModuleInstanceState(node) !== ts.ModuleInstanceState.Instantiated) {
                return;
            }
            // In case of variable declaration, node.parent is variable statement so look at the variable statement's parent
            var parent = getDeclarationContainer(node);
            if (parent.kind === ts.SyntaxKind.SourceFile && ts.isExternalModule(parent)) {
                // If the declaration happens to be in external module, report error that require and exports are reserved keywords
                error(name, ts.Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module, ts.declarationNameToString(name), ts.declarationNameToString(name));
            }
        }
        function checkCollisionWithConstDeclarations(node) {
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
            if (node.initializer && (ts.getCombinedNodeFlags(node) & ts.NodeFlags.BlockScoped) === 0) {
                var symbol = getSymbolOfNode(node);
                if (symbol.flags & ts.SymbolFlags.FunctionScopedVariable) {
                    var localDeclarationSymbol = resolveName(node, node.name.text, ts.SymbolFlags.Variable, undefined, undefined);
                    if (localDeclarationSymbol && localDeclarationSymbol !== symbol && localDeclarationSymbol.flags & ts.SymbolFlags.BlockScopedVariable) {
                        if (getDeclarationFlagsFromSymbol(localDeclarationSymbol) & ts.NodeFlags.Const) {
                            error(node, ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0, symbolToString(localDeclarationSymbol));
                        }
                    }
                }
            }
        }
        function isParameterDeclaration(node) {
            while (node.kind === ts.SyntaxKind.BindingElement) {
                node = node.parent.parent;
            }
            return node.kind === ts.SyntaxKind.Parameter;
        }
        // Check that a parameter initializer contains no references to parameters declared to the right of itself
        function checkParameterInitializer(node) {
            if (getRootDeclaration(node).kind === ts.SyntaxKind.Parameter) {
                var func = ts.getContainingFunction(node);
                visit(node.initializer);
            }
            function visit(n) {
                if (n.kind === ts.SyntaxKind.Identifier) {
                    var referencedSymbol = getNodeLinks(n).resolvedSymbol;
                    // check FunctionLikeDeclaration.locals (stores parameters\function local variable) 
                    // if it contains entry with a specified name and if this entry matches the resolved symbol
                    if (referencedSymbol && referencedSymbol !== unknownSymbol && getSymbol(func.locals, referencedSymbol.name, ts.SymbolFlags.Value) === referencedSymbol) {
                        if (referencedSymbol.valueDeclaration.kind === ts.SyntaxKind.Parameter) {
                            if (referencedSymbol.valueDeclaration === node) {
                                error(n, ts.Diagnostics.Parameter_0_cannot_be_referenced_in_its_initializer, ts.declarationNameToString(node.name));
                                return;
                            }
                            if (referencedSymbol.valueDeclaration.pos < node.pos) {
                                // legal case - parameter initializer references some parameter strictly on left of current parameter declaration
                                return;
                            }
                        }
                        error(n, ts.Diagnostics.Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it, ts.declarationNameToString(node.name), ts.declarationNameToString(n));
                    }
                }
                else {
                    ts.forEachChild(n, visit);
                }
            }
        }
        // Check variable, parameter, or property declaration
        function checkVariableLikeDeclaration(node) {
            checkSourceElement(node.type);
            // For a computed property, just check the initializer and exit
            if (ts.hasComputedNameButNotSymbol(node)) {
                if (node.initializer) {
                    checkExpressionCached(node.initializer);
                }
                return;
            }
            // For a binding pattern, check contained binding elements
            if (ts.isBindingPattern(node.name)) {
                ts.forEach(node.name.elements, checkSourceElement);
            }
            // For a parameter declaration with an initializer, error and exit if the containing function doesn't have a body
            if (node.initializer && getRootDeclaration(node).kind === ts.SyntaxKind.Parameter && ts.nodeIsMissing(ts.getContainingFunction(node).body)) {
                error(node, ts.Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                return;
            }
            // For a binding pattern, validate the initializer and exit
            if (ts.isBindingPattern(node.name)) {
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), getWidenedTypeForVariableLikeDeclaration(node), node, undefined);
                    checkParameterInitializer(node);
                }
                return;
            }
            var symbol = getSymbolOfNode(node);
            var type = getTypeOfVariableOrParameterOrProperty(symbol);
            if (node === symbol.valueDeclaration) {
                // Node is the primary declaration of the symbol, just validate the initializer
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), type, node, undefined);
                    checkParameterInitializer(node);
                }
            }
            else {
                // Node is a secondary declaration, check that type is identical to primary declaration and check that
                // initializer is consistent with type associated with the node
                var declarationType = getWidenedTypeForVariableLikeDeclaration(node);
                if (type !== unknownType && declarationType !== unknownType && !isTypeIdenticalTo(type, declarationType)) {
                    error(node.name, ts.Diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2, ts.declarationNameToString(node.name), typeToString(type), typeToString(declarationType));
                }
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), declarationType, node, undefined);
                }
            }
            if (node.kind !== ts.SyntaxKind.PropertyDeclaration && node.kind !== ts.SyntaxKind.PropertySignature) {
                // We know we don't have a binding pattern or computed name here
                checkExportsOnMergedDeclarations(node);
                checkCollisionWithConstDeclarations(node);
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
        }
        function checkVariableDeclaration(node) {
            checkGrammarVariableDeclaration(node);
            return checkVariableLikeDeclaration(node);
        }
        function checkBindingElement(node) {
            checkGrammarBindingElement(node);
            return checkVariableLikeDeclaration(node);
        }
        function checkVariableStatement(node) {
            // Grammar checking
            checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) || checkGrammarModifiers(node) || checkGrammarVariableDeclarationList(node.declarationList) || checkGrammarForDisallowedLetOrConstStatement(node);
            ts.forEach(node.declarationList.declarations, checkSourceElement);
        }
        function checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) {
            if (node.modifiers) {
                if (inBlockOrObjectLiteralExpression(node)) {
                    return grammarErrorOnFirstToken(node, ts.Diagnostics.Modifiers_cannot_appear_here);
                }
            }
        }
        function inBlockOrObjectLiteralExpression(node) {
            while (node) {
                if (node.kind === ts.SyntaxKind.Block || node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                    return true;
                }
                node = node.parent;
            }
        }
        function checkExpressionStatement(node) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);
            checkExpression(node.expression);
        }
        function checkIfStatement(node) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);
            checkExpression(node.expression);
            checkSourceElement(node.thenStatement);
            checkSourceElement(node.elseStatement);
        }
        function checkDoStatement(node) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);
            checkSourceElement(node.statement);
            checkExpression(node.expression);
        }
        function checkWhileStatement(node) {
            // Grammar checking 
            checkGrammarForStatementInAmbientContext(node);
            checkExpression(node.expression);
            checkSourceElement(node.statement);
        }
        function checkForStatement(node) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.initializer && node.initializer.kind == ts.SyntaxKind.VariableDeclarationList) {
                    checkGrammarVariableDeclarationList(node.initializer);
                }
            }
            if (node.initializer) {
                if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
                    ts.forEach(node.initializer.declarations, checkVariableDeclaration);
                }
                else {
                    checkExpression(node.initializer);
                }
            }
            if (node.condition)
                checkExpression(node.condition);
            if (node.iterator)
                checkExpression(node.iterator);
            checkSourceElement(node.statement);
        }
        function checkForInStatement(node) {
            // Grammar checking 
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
                    var variableList = node.initializer;
                    if (!checkGrammarVariableDeclarationList(variableList)) {
                        if (variableList.declarations.length > 1) {
                            grammarErrorOnFirstToken(variableList.declarations[1], ts.Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement);
                        }
                    }
                }
            }
            // TypeScript 1.0 spec  (April 2014): 5.4
            // In a 'for-in' statement of the form
            // for (var VarDecl in Expr) Statement
            //   VarDecl must be a variable declaration without a type annotation that declares a variable of type Any,
            //   and Expr must be an expression of type Any, an object type, or a type parameter type.                        
            if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
                var variableDeclarationList = node.initializer;
                if (variableDeclarationList.declarations.length >= 1) {
                    var decl = variableDeclarationList.declarations[0];
                    checkVariableDeclaration(decl);
                    if (decl.type) {
                        error(decl, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation);
                    }
                }
            }
            else {
                // In a 'for-in' statement of the form
                // for (Var in Expr) Statement
                //   Var must be an expression classified as a reference of type Any or the String primitive type,
                //   and Expr must be an expression of type Any, an object type, or a type parameter type.
                var varExpr = node.initializer;
                var exprType = checkExpression(varExpr);
                if (exprType !== anyType && exprType !== stringType) {
                    error(varExpr, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                }
                else {
                    // run check only former check succeeded to avoid cascading errors
                    checkReferenceExpression(varExpr, ts.Diagnostics.Invalid_left_hand_side_in_for_in_statement, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                }
            }
            var exprType = checkExpression(node.expression);
            // unknownType is returned i.e. if node.expression is identifier whose name cannot be resolved
            // in this case error about missing name is already reported - do not report extra one
            if (!(exprType.flags & ts.TypeFlags.Any || isStructuredType(exprType))) {
                error(node.expression, ts.Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            checkSourceElement(node.statement);
        }
        function checkBreakOrContinueStatement(node) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node) || checkGrammarBreakOrContinueStatement(node);
            // TODO: Check that target label is valid
        }
        function isGetAccessorWithAnnotatatedSetAccessor(node) {
            return !!(node.kind === ts.SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(ts.getDeclarationOfKind(node.symbol, ts.SyntaxKind.SetAccessor)));
        }
        function checkReturnStatement(node) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                var functionBlock = ts.getContainingFunction(node);
                if (!functionBlock) {
                    grammarErrorOnFirstToken(node, ts.Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
                }
            }
            if (node.expression) {
                var func = ts.getContainingFunction(node);
                if (func) {
                    var returnType = getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                    var exprType = checkExpressionCached(node.expression);
                    if (func.kind === ts.SyntaxKind.SetAccessor) {
                        error(node.expression, ts.Diagnostics.Setters_cannot_return_a_value);
                    }
                    else {
                        if (func.kind === ts.SyntaxKind.Constructor) {
                            if (!isTypeAssignableTo(exprType, returnType)) {
                                error(node.expression, ts.Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                            }
                        }
                        else if (func.type || isGetAccessorWithAnnotatatedSetAccessor(func)) {
                            checkTypeAssignableTo(exprType, returnType, node.expression, undefined);
                        }
                    }
                }
            }
        }
        function checkWithStatement(node) {
            // Grammar checking for withStatement
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.parserContextFlags & ts.ParserContextFlags.StrictMode) {
                    grammarErrorOnFirstToken(node, ts.Diagnostics.with_statements_are_not_allowed_in_strict_mode);
                }
            }
            checkExpression(node.expression);
            error(node.expression, ts.Diagnostics.All_symbols_within_a_with_block_will_be_resolved_to_any);
        }
        function checkSwitchStatement(node) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);
            var firstDefaultClause;
            var hasDuplicateDefaultClause = false;
            var expressionType = checkExpression(node.expression);
            ts.forEach(node.clauses, function (clause) {
                // Grammar check for duplicate default clauses, skip if we already report duplicate default clause
                if (clause.kind === ts.SyntaxKind.DefaultClause && !hasDuplicateDefaultClause) {
                    if (firstDefaultClause === undefined) {
                        firstDefaultClause = clause;
                    }
                    else {
                        var sourceFile = ts.getSourceFileOfNode(node);
                        var start = ts.skipTrivia(sourceFile.text, clause.pos);
                        var end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                        grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
                        hasDuplicateDefaultClause = true;
                    }
                }
                if (produceDiagnostics && clause.kind === ts.SyntaxKind.CaseClause) {
                    var caseClause = clause;
                    // TypeScript 1.0 spec (April 2014):5.9
                    // In a 'switch' statement, each 'case' expression must be of a type that is assignable to or from the type of the 'switch' expression.
                    var caseType = checkExpression(caseClause.expression);
                    if (!isTypeAssignableTo(expressionType, caseType)) {
                        // check 'expressionType isAssignableTo caseType' failed, try the reversed check and report errors if it fails
                        checkTypeAssignableTo(caseType, expressionType, caseClause.expression, undefined);
                    }
                }
                ts.forEach(clause.statements, checkSourceElement);
            });
        }
        function checkLabeledStatement(node) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                var current = node.parent;
                while (current) {
                    if (ts.isAnyFunction(current)) {
                        break;
                    }
                    if (current.kind === ts.SyntaxKind.LabeledStatement && current.label.text === node.label.text) {
                        var sourceFile = ts.getSourceFileOfNode(node);
                        grammarErrorOnNode(node.label, ts.Diagnostics.Duplicate_label_0, ts.getTextOfNodeFromSourceText(sourceFile.text, node.label));
                        break;
                    }
                    current = current.parent;
                }
            }
            // ensure that label is unique
            checkSourceElement(node.statement);
        }
        function checkThrowStatement(node) {
            // Grammar checking
            if (!checkGrammarForStatementInAmbientContext(node)) {
                if (node.expression === undefined) {
                    grammarErrorAfterFirstToken(node, ts.Diagnostics.Line_break_not_permitted_here);
                }
            }
            if (node.expression) {
                checkExpression(node.expression);
            }
        }
        function checkTryStatement(node) {
            // Grammar checking
            checkGrammarForStatementInAmbientContext(node);
            checkBlock(node.tryBlock);
            var catchClause = node.catchClause;
            if (catchClause) {
                // Grammar checking
                if (catchClause.type) {
                    var sourceFile = ts.getSourceFileOfNode(node);
                    var colonStart = ts.skipTrivia(sourceFile.text, catchClause.name.end);
                    grammarErrorAtPos(sourceFile, colonStart, ":".length, ts.Diagnostics.Catch_clause_parameter_cannot_have_a_type_annotation);
                }
                // It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
                // Catch production is eval or arguments
                checkGrammarEvalOrArgumentsInStrictMode(node, catchClause.name);
                checkBlock(catchClause.block);
            }
            if (node.finallyBlock)
                checkBlock(node.finallyBlock);
        }
        function checkIndexConstraints(type) {
            function checkIndexConstraintForProperty(prop, propertyType, indexDeclaration, indexType, indexKind) {
                if (!indexType) {
                    return;
                }
                // index is numeric and property name is not valid numeric literal
                if (indexKind === ts.IndexKind.Number && !isNumericName(prop.name)) {
                    return;
                }
                // perform property check if property or indexer is declared in 'type'
                // this allows to rule out cases when both property and indexer are inherited from the base class
                var errorNode;
                if (prop.parent === type.symbol) {
                    errorNode = prop.valueDeclaration;
                }
                else if (indexDeclaration) {
                    errorNode = indexDeclaration;
                }
                else if (type.flags & ts.TypeFlags.Interface) {
                    // for interfaces property and indexer might be inherited from different bases
                    // check if any base class already has both property and indexer.
                    // check should be performed only if 'type' is the first type that brings property\indexer together
                    var someBaseClassHasBothPropertyAndIndexer = ts.forEach(type.baseTypes, function (base) { return getPropertyOfObjectType(base, prop.name) && getIndexTypeOfType(base, indexKind); });
                    errorNode = someBaseClassHasBothPropertyAndIndexer ? undefined : type.symbol.declarations[0];
                }
                if (errorNode && !isTypeAssignableTo(propertyType, indexType)) {
                    var errorMessage = indexKind === ts.IndexKind.String ? ts.Diagnostics.Property_0_of_type_1_is_not_assignable_to_string_index_type_2 : ts.Diagnostics.Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2;
                    error(errorNode, errorMessage, symbolToString(prop), typeToString(propertyType), typeToString(indexType));
                }
            }
            var declaredNumberIndexer = getIndexDeclarationOfSymbol(type.symbol, ts.IndexKind.Number);
            var declaredStringIndexer = getIndexDeclarationOfSymbol(type.symbol, ts.IndexKind.String);
            var stringIndexType = getIndexTypeOfType(type, ts.IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, ts.IndexKind.Number);
            if (stringIndexType || numberIndexType) {
                ts.forEach(getPropertiesOfObjectType(type), function (prop) {
                    var propType = getTypeOfSymbol(prop);
                    checkIndexConstraintForProperty(prop, propType, declaredStringIndexer, stringIndexType, ts.IndexKind.String);
                    checkIndexConstraintForProperty(prop, propType, declaredNumberIndexer, numberIndexType, ts.IndexKind.Number);
                });
            }
            var errorNode;
            if (stringIndexType && numberIndexType) {
                errorNode = declaredNumberIndexer || declaredStringIndexer;
                // condition 'errorNode === undefined' may appear if types does not declare nor string neither number indexer
                if (!errorNode && (type.flags & ts.TypeFlags.Interface)) {
                    var someBaseTypeHasBothIndexers = ts.forEach(type.baseTypes, function (base) { return getIndexTypeOfType(base, ts.IndexKind.String) && getIndexTypeOfType(base, ts.IndexKind.Number); });
                    errorNode = someBaseTypeHasBothIndexers ? undefined : type.symbol.declarations[0];
                }
            }
            if (errorNode && !isTypeAssignableTo(numberIndexType, stringIndexType)) {
                error(errorNode, ts.Diagnostics.Numeric_index_type_0_is_not_assignable_to_string_index_type_1, typeToString(numberIndexType), typeToString(stringIndexType));
            }
        }
        // TODO(jfreeman): Decide what to do for computed properties
        function checkTypeNameIsReserved(name, message) {
            switch (name.text) {
                case "any":
                case "number":
                case "boolean":
                case "string":
                case "void":
                    error(name, message, name.text);
            }
        }
        // Check each type parameter and check that list has no duplicate type parameter declarations
        function checkTypeParameters(typeParameterDeclarations) {
            if (typeParameterDeclarations) {
                for (var i = 0; i < typeParameterDeclarations.length; i++) {
                    var node = typeParameterDeclarations[i];
                    checkTypeParameter(node);
                    if (produceDiagnostics) {
                        for (var j = 0; j < i; j++) {
                            if (typeParameterDeclarations[j].symbol === node.symbol) {
                                error(node.name, ts.Diagnostics.Duplicate_identifier_0, ts.declarationNameToString(node.name));
                            }
                        }
                    }
                }
            }
        }
        function checkClassDeclaration(node) {
            // Grammar checking
            checkGrammarClassDeclarationHeritageClauses(node);
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Class_name_cannot_be_0);
            checkTypeParameters(node.typeParameters);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);
            var symbol = getSymbolOfNode(node);
            var type = getDeclaredTypeOfSymbol(symbol);
            var staticType = getTypeOfSymbol(symbol);
            var baseTypeNode = ts.getClassBaseTypeNode(node);
            if (baseTypeNode) {
                emitExtends = emitExtends || !ts.isInAmbientContext(node);
                checkTypeReference(baseTypeNode);
            }
            if (type.baseTypes.length) {
                if (produceDiagnostics) {
                    var baseType = type.baseTypes[0];
                    checkTypeAssignableTo(type, baseType, node.name, ts.Diagnostics.Class_0_incorrectly_extends_base_class_1);
                    var staticBaseType = getTypeOfSymbol(baseType.symbol);
                    checkTypeAssignableTo(staticType, getTypeWithoutConstructors(staticBaseType), node.name, ts.Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);
                    if (baseType.symbol !== resolveEntityName(node, baseTypeNode.typeName, ts.SymbolFlags.Value)) {
                        error(baseTypeNode, ts.Diagnostics.Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0, typeToString(baseType));
                    }
                    checkKindsOfPropertyMemberOverrides(type, baseType);
                }
                // Check that base type can be evaluated as expression
                checkExpressionOrQualifiedName(baseTypeNode.typeName);
            }
            var implementedTypeNodes = ts.getClassImplementedTypeNodes(node);
            if (implementedTypeNodes) {
                ts.forEach(implementedTypeNodes, function (typeRefNode) {
                    checkTypeReference(typeRefNode);
                    if (produceDiagnostics) {
                        var t = getTypeFromTypeReferenceNode(typeRefNode);
                        if (t !== unknownType) {
                            var declaredType = (t.flags & ts.TypeFlags.Reference) ? t.target : t;
                            if (declaredType.flags & (ts.TypeFlags.Class | ts.TypeFlags.Interface)) {
                                checkTypeAssignableTo(type, t, node.name, ts.Diagnostics.Class_0_incorrectly_implements_interface_1);
                            }
                            else {
                                error(typeRefNode, ts.Diagnostics.A_class_may_only_implement_another_class_or_interface);
                            }
                        }
                    }
                });
            }
            ts.forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function getTargetSymbol(s) {
            // if symbol is instantiated its flags are not copied from the 'target'
            // so we'll need to get back original 'target' symbol to work with correct set of flags
            return s.flags & ts.SymbolFlags.Instantiated ? getSymbolLinks(s).target : s;
        }
        function checkKindsOfPropertyMemberOverrides(type, baseType) {
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
                if (base.flags & ts.SymbolFlags.Prototype) {
                    continue;
                }
                var derived = getTargetSymbol(getPropertyOfObjectType(type, base.name));
                if (derived) {
                    var baseDeclarationFlags = getDeclarationFlagsFromSymbol(base);
                    var derivedDeclarationFlags = getDeclarationFlagsFromSymbol(derived);
                    if ((baseDeclarationFlags & ts.NodeFlags.Private) || (derivedDeclarationFlags & ts.NodeFlags.Private)) {
                        continue;
                    }
                    if ((baseDeclarationFlags & ts.NodeFlags.Static) !== (derivedDeclarationFlags & ts.NodeFlags.Static)) {
                        continue;
                    }
                    if ((base.flags & derived.flags & ts.SymbolFlags.Method) || ((base.flags & ts.SymbolFlags.PropertyOrAccessor) && (derived.flags & ts.SymbolFlags.PropertyOrAccessor))) {
                        continue;
                    }
                    var errorMessage;
                    if (base.flags & ts.SymbolFlags.Method) {
                        if (derived.flags & ts.SymbolFlags.Accessor) {
                            errorMessage = ts.Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                        }
                        else {
                            ts.Debug.assert((derived.flags & ts.SymbolFlags.Property) !== 0);
                            errorMessage = ts.Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property;
                        }
                    }
                    else if (base.flags & ts.SymbolFlags.Property) {
                        ts.Debug.assert((derived.flags & ts.SymbolFlags.Method) !== 0);
                        errorMessage = ts.Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    else {
                        ts.Debug.assert((base.flags & ts.SymbolFlags.Accessor) !== 0);
                        ts.Debug.assert((derived.flags & ts.SymbolFlags.Method) !== 0);
                        errorMessage = ts.Diagnostics.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    error(derived.valueDeclaration.name, errorMessage, typeToString(baseType), symbolToString(base), typeToString(type));
                }
            }
        }
        function isAccessor(kind) {
            return kind === ts.SyntaxKind.GetAccessor || kind === ts.SyntaxKind.SetAccessor;
        }
        function areTypeParametersIdentical(list1, list2) {
            if (!list1 && !list2) {
                return true;
            }
            if (!list1 || !list2 || list1.length !== list2.length) {
                return false;
            }
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
        function checkInheritedPropertiesAreIdentical(type, typeNode) {
            if (!type.baseTypes.length || type.baseTypes.length === 1) {
                return true;
            }
            var seen = {};
            ts.forEach(type.declaredProperties, function (p) {
                seen[p.name] = { prop: p, containingType: type };
            });
            var ok = true;
            for (var i = 0, len = type.baseTypes.length; i < len; ++i) {
                var base = type.baseTypes[i];
                var properties = getPropertiesOfObjectType(base);
                for (var j = 0, proplen = properties.length; j < proplen; ++j) {
                    var prop = properties[j];
                    if (!ts.hasProperty(seen, prop.name)) {
                        seen[prop.name] = { prop: prop, containingType: base };
                    }
                    else {
                        var existing = seen[prop.name];
                        var isInheritedProperty = existing.containingType !== type;
                        if (isInheritedProperty && !isPropertyIdenticalTo(existing.prop, prop)) {
                            ok = false;
                            var typeName1 = typeToString(existing.containingType);
                            var typeName2 = typeToString(base);
                            var errorInfo = ts.chainDiagnosticMessages(undefined, ts.Diagnostics.Named_properties_0_of_types_1_and_2_are_not_identical, prop.name, typeName1, typeName2);
                            errorInfo = ts.chainDiagnosticMessages(errorInfo, ts.Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2, typeToString(type), typeName1, typeName2);
                            addDiagnostic(ts.createDiagnosticForNodeFromMessageChain(typeNode, errorInfo, host.getCompilerHost().getNewLine()));
                        }
                    }
                }
            }
            return ok;
        }
        function checkInterfaceDeclaration(node) {
            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarInterfaceDeclaration(node);
            checkTypeParameters(node.typeParameters);
            if (produceDiagnostics) {
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Interface_name_cannot_be_0);
                checkExportsOnMergedDeclarations(node);
                var symbol = getSymbolOfNode(node);
                var firstInterfaceDecl = ts.getDeclarationOfKind(symbol, ts.SyntaxKind.InterfaceDeclaration);
                if (symbol.declarations.length > 1) {
                    if (node !== firstInterfaceDecl && !areTypeParametersIdentical(firstInterfaceDecl.typeParameters, node.typeParameters)) {
                        error(node.name, ts.Diagnostics.All_declarations_of_an_interface_must_have_identical_type_parameters);
                    }
                }
                // Only check this symbol once
                if (node === firstInterfaceDecl) {
                    var type = getDeclaredTypeOfSymbol(symbol);
                    // run subsequent checks only if first set succeeded
                    if (checkInheritedPropertiesAreIdentical(type, node.name)) {
                        ts.forEach(type.baseTypes, function (baseType) {
                            checkTypeAssignableTo(type, baseType, node.name, ts.Diagnostics.Interface_0_incorrectly_extends_interface_1);
                        });
                        checkIndexConstraints(type);
                    }
                }
            }
            ts.forEach(ts.getInterfaceBaseTypeNodes(node), checkTypeReference);
            ts.forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function checkTypeAliasDeclaration(node) {
            // Grammar checking
            checkGrammarModifiers(node);
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Type_alias_name_cannot_be_0);
            checkSourceElement(node.type);
        }
        function computeEnumMemberValues(node) {
            var nodeLinks = getNodeLinks(node);
            if (!(nodeLinks.flags & ts.NodeCheckFlags.EnumValuesComputed)) {
                var enumSymbol = getSymbolOfNode(node);
                var enumType = getDeclaredTypeOfSymbol(enumSymbol);
                var autoValue = 0;
                var ambient = ts.isInAmbientContext(node);
                var enumIsConst = ts.isConst(node);
                ts.forEach(node.members, function (member) {
                    // TODO(jfreeman): Check that it is not a computed name
                    if (isNumericName(member.name.text)) {
                        error(member.name, ts.Diagnostics.An_enum_member_cannot_have_a_numeric_name);
                    }
                    var initializer = member.initializer;
                    if (initializer) {
                        autoValue = getConstantValueForEnumMemberInitializer(initializer, enumIsConst);
                        if (autoValue === undefined) {
                            if (enumIsConst) {
                                error(initializer, ts.Diagnostics.In_const_enum_declarations_member_initializer_must_be_constant_expression);
                            }
                            else if (!ambient) {
                                // Only here do we need to check that the initializer is assignable to the enum type.
                                // If it is a constant value (not undefined), it is syntactically constrained to be a number. 
                                // Also, we do not need to check this for ambients because there is already
                                // a syntax error if it is not a constant.
                                checkTypeAssignableTo(checkExpression(initializer), enumType, initializer, undefined);
                            }
                        }
                        else if (enumIsConst) {
                            if (isNaN(autoValue)) {
                                error(initializer, ts.Diagnostics.const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN);
                            }
                            else if (!isFinite(autoValue)) {
                                error(initializer, ts.Diagnostics.const_enum_member_initializer_was_evaluated_to_a_non_finite_value);
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
                nodeLinks.flags |= ts.NodeCheckFlags.EnumValuesComputed;
            }
            function getConstantValueForEnumMemberInitializer(initializer, enumIsConst) {
                return evalConstant(initializer);
                function evalConstant(e) {
                    switch (e.kind) {
                        case ts.SyntaxKind.PrefixUnaryExpression:
                            var value = evalConstant(e.operand);
                            if (value === undefined) {
                                return undefined;
                            }
                            switch (e.operator) {
                                case ts.SyntaxKind.PlusToken: return value;
                                case ts.SyntaxKind.MinusToken: return -value;
                                case ts.SyntaxKind.TildeToken: return enumIsConst ? ~value : undefined;
                            }
                            return undefined;
                        case ts.SyntaxKind.BinaryExpression:
                            if (!enumIsConst) {
                                return undefined;
                            }
                            var left = evalConstant(e.left);
                            if (left === undefined) {
                                return undefined;
                            }
                            var right = evalConstant(e.right);
                            if (right === undefined) {
                                return undefined;
                            }
                            switch (e.operator) {
                                case ts.SyntaxKind.BarToken: return left | right;
                                case ts.SyntaxKind.AmpersandToken: return left & right;
                                case ts.SyntaxKind.GreaterThanGreaterThanToken: return left >> right;
                                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: return left >>> right;
                                case ts.SyntaxKind.LessThanLessThanToken: return left << right;
                                case ts.SyntaxKind.CaretToken: return left ^ right;
                                case ts.SyntaxKind.AsteriskToken: return left * right;
                                case ts.SyntaxKind.SlashToken: return left / right;
                                case ts.SyntaxKind.PlusToken: return left + right;
                                case ts.SyntaxKind.MinusToken: return left - right;
                                case ts.SyntaxKind.PercentToken: return left % right;
                            }
                            return undefined;
                        case ts.SyntaxKind.NumericLiteral:
                            return +e.text;
                        case ts.SyntaxKind.ParenthesizedExpression:
                            return enumIsConst ? evalConstant(e.expression) : undefined;
                        case ts.SyntaxKind.Identifier:
                        case ts.SyntaxKind.ElementAccessExpression:
                        case ts.SyntaxKind.PropertyAccessExpression:
                            if (!enumIsConst) {
                                return undefined;
                            }
                            var member = initializer.parent;
                            var currentType = getTypeOfSymbol(getSymbolOfNode(member.parent));
                            var enumType;
                            var propertyName;
                            if (e.kind === ts.SyntaxKind.Identifier) {
                                // unqualified names can refer to member that reside in different declaration of the enum so just doing name resolution won't work.
                                // instead pick current enum type and later try to fetch member from the type
                                enumType = currentType;
                                propertyName = e.text;
                            }
                            else {
                                if (e.kind === ts.SyntaxKind.ElementAccessExpression) {
                                    if (e.argumentExpression === undefined || e.argumentExpression.kind !== ts.SyntaxKind.StringLiteral) {
                                        return undefined;
                                    }
                                    var enumType = getTypeOfNode(e.expression);
                                    propertyName = e.argumentExpression.text;
                                }
                                else {
                                    var enumType = getTypeOfNode(e.expression);
                                    propertyName = e.name.text;
                                }
                                if (enumType !== currentType) {
                                    return undefined;
                                }
                            }
                            if (propertyName === undefined) {
                                return undefined;
                            }
                            var property = getPropertyOfObjectType(enumType, propertyName);
                            if (!property || !(property.flags & ts.SymbolFlags.EnumMember)) {
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
                            return getNodeLinks(propertyDecl).enumMemberValue;
                    }
                }
            }
        }
        function checkEnumDeclaration(node) {
            if (!produceDiagnostics) {
                return;
            }
            // Grammar checking
            checkGrammarModifiers(node) || checkGrammarEnumDeclaration(node);
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Enum_name_cannot_be_0);
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
            var firstDeclaration = ts.getDeclarationOfKind(enumSymbol, node.kind);
            if (node === firstDeclaration) {
                if (enumSymbol.declarations.length > 1) {
                    var enumIsConst = ts.isConst(node);
                    // check that const is placed\omitted on all enum declarations
                    ts.forEach(enumSymbol.declarations, function (decl) {
                        if (ts.isConstEnumDeclaration(decl) !== enumIsConst) {
                            error(decl.name, ts.Diagnostics.Enum_declarations_must_all_be_const_or_non_const);
                        }
                    });
                }
                var seenEnumMissingInitialInitializer = false;
                ts.forEach(enumSymbol.declarations, function (declaration) {
                    // return true if we hit a violation of the rule, false otherwise
                    if (declaration.kind !== ts.SyntaxKind.EnumDeclaration) {
                        return false;
                    }
                    var enumDeclaration = declaration;
                    if (!enumDeclaration.members.length) {
                        return false;
                    }
                    var firstEnumMember = enumDeclaration.members[0];
                    if (!firstEnumMember.initializer) {
                        if (seenEnumMissingInitialInitializer) {
                            error(firstEnumMember.name, ts.Diagnostics.In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element);
                        }
                        else {
                            seenEnumMissingInitialInitializer = true;
                        }
                    }
                });
            }
        }
        function getFirstNonAmbientClassOrFunctionDeclaration(symbol) {
            var declarations = symbol.declarations;
            for (var i = 0; i < declarations.length; i++) {
                var declaration = declarations[i];
                if ((declaration.kind === ts.SyntaxKind.ClassDeclaration || (declaration.kind === ts.SyntaxKind.FunctionDeclaration && ts.nodeIsPresent(declaration.body))) && !ts.isInAmbientContext(declaration)) {
                    return declaration;
                }
            }
            return undefined;
        }
        function checkModuleDeclaration(node) {
            if (produceDiagnostics) {
                // Grammar checking
                if (!checkGrammarModifiers(node)) {
                    if (!ts.isInAmbientContext(node) && node.name.kind === ts.SyntaxKind.StringLiteral) {
                        grammarErrorOnNode(node.name, ts.Diagnostics.Only_ambient_modules_can_use_quoted_names);
                    }
                    else if (node.name.kind === ts.SyntaxKind.Identifier && node.body.kind === ts.SyntaxKind.ModuleBlock) {
                        var statements = node.body.statements;
                        for (var i = 0, n = statements.length; i < n; i++) {
                            var statement = statements[i];
                            if (statement.kind === ts.SyntaxKind.ExportAssignment) {
                                // Export assignments are not allowed in an internal module
                                grammarErrorOnNode(statement, ts.Diagnostics.An_export_assignment_cannot_be_used_in_an_internal_module);
                            }
                            else if (ts.isExternalModuleImportDeclaration(statement)) {
                                grammarErrorOnNode(ts.getExternalModuleImportDeclarationExpression(statement), ts.Diagnostics.Import_declarations_in_an_internal_module_cannot_reference_an_external_module);
                            }
                        }
                    }
                }
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                checkExportsOnMergedDeclarations(node);
                var symbol = getSymbolOfNode(node);
                // The following checks only apply on a non-ambient instantiated module declaration.
                if (symbol.flags & ts.SymbolFlags.ValueModule && symbol.declarations.length > 1 && !ts.isInAmbientContext(node) && ts.isInstantiatedModule(node, compilerOptions.preserveConstEnums)) {
                    var classOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                    if (classOrFunc) {
                        if (ts.getSourceFileOfNode(node) !== ts.getSourceFileOfNode(classOrFunc)) {
                            error(node.name, ts.Diagnostics.A_module_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                        }
                        else if (node.pos < classOrFunc.pos) {
                            error(node.name, ts.Diagnostics.A_module_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                        }
                    }
                }
                // Checks for ambient external modules.
                if (node.name.kind === ts.SyntaxKind.StringLiteral) {
                    if (!isGlobalSourceFile(node.parent)) {
                        error(node.name, ts.Diagnostics.Ambient_external_modules_cannot_be_nested_in_other_modules);
                    }
                    if (isExternalModuleNameRelative(node.name.text)) {
                        error(node.name, ts.Diagnostics.Ambient_external_module_declaration_cannot_specify_relative_module_name);
                    }
                }
            }
            checkSourceElement(node.body);
        }
        function getFirstIdentifier(node) {
            while (node.kind === ts.SyntaxKind.QualifiedName) {
                node = node.left;
            }
            return node;
        }
        function checkImportDeclaration(node) {
            // Grammar checking
            checkGrammarModifiers(node);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            var symbol = getSymbolOfNode(node);
            var target;
            if (ts.isInternalModuleImportDeclaration(node)) {
                target = resolveImport(symbol);
                // Import declaration for an internal module
                if (target !== unknownSymbol) {
                    if (target.flags & ts.SymbolFlags.Value) {
                        // Target is a value symbol, check that it is not hidden by a local declaration with the same name and
                        // ensure it can be evaluated as an expression
                        var moduleName = getFirstIdentifier(node.moduleReference);
                        if (resolveEntityName(node, moduleName, ts.SymbolFlags.Value | ts.SymbolFlags.Namespace).flags & ts.SymbolFlags.Namespace) {
                            checkExpressionOrQualifiedName(node.moduleReference);
                        }
                        else {
                            error(moduleName, ts.Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, ts.declarationNameToString(moduleName));
                        }
                    }
                    if (target.flags & ts.SymbolFlags.Type) {
                        checkTypeNameIsReserved(node.name, ts.Diagnostics.Import_name_cannot_be_0);
                    }
                }
            }
            else {
                // Import declaration for an external module
                if (node.parent.kind === ts.SyntaxKind.SourceFile) {
                    target = resolveImport(symbol);
                }
                else if (node.parent.kind === ts.SyntaxKind.ModuleBlock && node.parent.parent.name.kind === ts.SyntaxKind.StringLiteral) {
                    // TypeScript 1.0 spec (April 2013): 12.1.6
                    // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference 
                    // other external modules only through top - level external module names.
                    // Relative external module names are not permitted.
                    if (ts.getExternalModuleImportDeclarationExpression(node).kind === ts.SyntaxKind.StringLiteral) {
                        if (isExternalModuleNameRelative(ts.getExternalModuleImportDeclarationExpression(node).text)) {
                            error(node, ts.Diagnostics.Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name);
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
                var excludedMeanings = (symbol.flags & ts.SymbolFlags.Value ? ts.SymbolFlags.Value : 0) | (symbol.flags & ts.SymbolFlags.Type ? ts.SymbolFlags.Type : 0) | (symbol.flags & ts.SymbolFlags.Namespace ? ts.SymbolFlags.Namespace : 0);
                if (target.flags & excludedMeanings) {
                    error(node, ts.Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0, symbolToString(symbol));
                }
            }
        }
        function checkExportAssignment(node) {
            // Grammar checking
            if (!checkGrammarModifiers(node) && (node.flags & ts.NodeFlags.Modifier)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.An_export_assignment_cannot_have_modifiers);
            }
            var container = node.parent;
            if (container.kind !== ts.SyntaxKind.SourceFile) {
                // In a module, the immediate parent will be a block, so climb up one more parent
                container = container.parent;
            }
            checkTypeOfExportAssignmentSymbol(getSymbolOfNode(container));
        }
        function checkSourceElement(node) {
            if (!node)
                return;
            switch (node.kind) {
                case ts.SyntaxKind.TypeParameter:
                    return checkTypeParameter(node);
                case ts.SyntaxKind.Parameter:
                    return checkParameter(node);
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                    return checkPropertyDeclaration(node);
                case ts.SyntaxKind.FunctionType:
                case ts.SyntaxKind.ConstructorType:
                case ts.SyntaxKind.CallSignature:
                case ts.SyntaxKind.ConstructSignature:
                    return checkSignatureDeclaration(node);
                case ts.SyntaxKind.IndexSignature:
                    return checkSignatureDeclaration(node);
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                    return checkMethodDeclaration(node);
                case ts.SyntaxKind.Constructor:
                    return checkConstructorDeclaration(node);
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                    return checkAccessorDeclaration(node);
                case ts.SyntaxKind.TypeReference:
                    return checkTypeReference(node);
                case ts.SyntaxKind.TypeQuery:
                    return checkTypeQuery(node);
                case ts.SyntaxKind.TypeLiteral:
                    return checkTypeLiteral(node);
                case ts.SyntaxKind.ArrayType:
                    return checkArrayType(node);
                case ts.SyntaxKind.TupleType:
                    return checkTupleType(node);
                case ts.SyntaxKind.UnionType:
                    return checkUnionType(node);
                case ts.SyntaxKind.ParenthesizedType:
                    return checkSourceElement(node.type);
                case ts.SyntaxKind.FunctionDeclaration:
                    return checkFunctionDeclaration(node);
                case ts.SyntaxKind.Block:
                case ts.SyntaxKind.ModuleBlock:
                    return checkBlock(node);
                case ts.SyntaxKind.VariableStatement:
                    return checkVariableStatement(node);
                case ts.SyntaxKind.ExpressionStatement:
                    return checkExpressionStatement(node);
                case ts.SyntaxKind.IfStatement:
                    return checkIfStatement(node);
                case ts.SyntaxKind.DoStatement:
                    return checkDoStatement(node);
                case ts.SyntaxKind.WhileStatement:
                    return checkWhileStatement(node);
                case ts.SyntaxKind.ForStatement:
                    return checkForStatement(node);
                case ts.SyntaxKind.ForInStatement:
                    return checkForInStatement(node);
                case ts.SyntaxKind.ContinueStatement:
                case ts.SyntaxKind.BreakStatement:
                    return checkBreakOrContinueStatement(node);
                case ts.SyntaxKind.ReturnStatement:
                    return checkReturnStatement(node);
                case ts.SyntaxKind.WithStatement:
                    return checkWithStatement(node);
                case ts.SyntaxKind.SwitchStatement:
                    return checkSwitchStatement(node);
                case ts.SyntaxKind.LabeledStatement:
                    return checkLabeledStatement(node);
                case ts.SyntaxKind.ThrowStatement:
                    return checkThrowStatement(node);
                case ts.SyntaxKind.TryStatement:
                    return checkTryStatement(node);
                case ts.SyntaxKind.VariableDeclaration:
                    return checkVariableDeclaration(node);
                case ts.SyntaxKind.BindingElement:
                    return checkBindingElement(node);
                case ts.SyntaxKind.ClassDeclaration:
                    return checkClassDeclaration(node);
                case ts.SyntaxKind.InterfaceDeclaration:
                    return checkInterfaceDeclaration(node);
                case ts.SyntaxKind.TypeAliasDeclaration:
                    return checkTypeAliasDeclaration(node);
                case ts.SyntaxKind.EnumDeclaration:
                    return checkEnumDeclaration(node);
                case ts.SyntaxKind.ModuleDeclaration:
                    return checkModuleDeclaration(node);
                case ts.SyntaxKind.ImportDeclaration:
                    return checkImportDeclaration(node);
                case ts.SyntaxKind.ExportAssignment:
                    return checkExportAssignment(node);
                case ts.SyntaxKind.EmptyStatement:
                    checkGrammarForStatementInAmbientContext(node);
                    return;
                case ts.SyntaxKind.DebuggerStatement:
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
        function checkFunctionExpressionBodies(node) {
            switch (node.kind) {
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    checkFunctionExpressionOrObjectLiteralMethodBody(node);
                    break;
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    if (ts.isObjectLiteralMethod(node)) {
                        checkFunctionExpressionOrObjectLiteralMethodBody(node);
                    }
                    break;
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.FunctionDeclaration:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    break;
                case ts.SyntaxKind.WithStatement:
                    checkFunctionExpressionBodies(node.expression);
                    break;
                case ts.SyntaxKind.Parameter:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.ObjectBindingPattern:
                case ts.SyntaxKind.ArrayBindingPattern:
                case ts.SyntaxKind.BindingElement:
                case ts.SyntaxKind.ArrayLiteralExpression:
                case ts.SyntaxKind.ObjectLiteralExpression:
                case ts.SyntaxKind.PropertyAssignment:
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.ElementAccessExpression:
                case ts.SyntaxKind.CallExpression:
                case ts.SyntaxKind.NewExpression:
                case ts.SyntaxKind.TaggedTemplateExpression:
                case ts.SyntaxKind.TemplateExpression:
                case ts.SyntaxKind.TemplateSpan:
                case ts.SyntaxKind.TypeAssertionExpression:
                case ts.SyntaxKind.ParenthesizedExpression:
                case ts.SyntaxKind.TypeOfExpression:
                case ts.SyntaxKind.VoidExpression:
                case ts.SyntaxKind.DeleteExpression:
                case ts.SyntaxKind.PrefixUnaryExpression:
                case ts.SyntaxKind.PostfixUnaryExpression:
                case ts.SyntaxKind.BinaryExpression:
                case ts.SyntaxKind.ConditionalExpression:
                case ts.SyntaxKind.SpreadElementExpression:
                case ts.SyntaxKind.Block:
                case ts.SyntaxKind.ModuleBlock:
                case ts.SyntaxKind.VariableStatement:
                case ts.SyntaxKind.ExpressionStatement:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ContinueStatement:
                case ts.SyntaxKind.BreakStatement:
                case ts.SyntaxKind.ReturnStatement:
                case ts.SyntaxKind.SwitchStatement:
                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.DefaultClause:
                case ts.SyntaxKind.LabeledStatement:
                case ts.SyntaxKind.ThrowStatement:
                case ts.SyntaxKind.TryStatement:
                case ts.SyntaxKind.CatchClause:
                case ts.SyntaxKind.VariableDeclaration:
                case ts.SyntaxKind.VariableDeclarationList:
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.EnumMember:
                case ts.SyntaxKind.SourceFile:
                    ts.forEachChild(node, checkFunctionExpressionBodies);
                    break;
            }
        }
        // Fully type check a source file and collect the relevant diagnostics.
        function checkSourceFile(node) {
            var links = getNodeLinks(node);
            if (!(links.flags & ts.NodeCheckFlags.TypeChecked)) {
                // Grammar checking
                checkGrammarSourceFile(node);
                emitExtends = false;
                potentialThisCollisions.length = 0;
                ts.forEach(node.statements, checkSourceElement);
                checkFunctionExpressionBodies(node);
                if (ts.isExternalModule(node)) {
                    var symbol = getExportAssignmentSymbol(node.symbol);
                    if (symbol && symbol.flags & ts.SymbolFlags.Import) {
                        // Mark the import as referenced so that we emit it in the final .js file.
                        getSymbolLinks(symbol).referenced = true;
                        // mark any import declarations that depend upon this import as referenced
                        markLinkedImportsAsReferenced(ts.getDeclarationOfKind(symbol, ts.SyntaxKind.ImportDeclaration));
                    }
                }
                if (potentialThisCollisions.length) {
                    ts.forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                    potentialThisCollisions.length = 0;
                }
                if (emitExtends) {
                    links.flags |= ts.NodeCheckFlags.EmitExtends;
                }
                links.flags |= ts.NodeCheckFlags.TypeChecked;
            }
        }
        function getSortedDiagnostics() {
            ts.Debug.assert(produceDiagnostics, "diagnostics are available only in the full typecheck mode");
            if (diagnosticsModified) {
                diagnostics.sort(ts.compareDiagnostics);
                diagnostics = ts.deduplicateSortedDiagnostics(diagnostics);
                diagnosticsModified = false;
            }
            return diagnostics;
        }
        function getDiagnostics(sourceFile) {
            throwIfNonDiagnosticsProducing();
            if (sourceFile) {
                checkSourceFile(sourceFile);
                return ts.filter(getSortedDiagnostics(), function (d) { return d.file === sourceFile; });
            }
            ts.forEach(host.getSourceFiles(), checkSourceFile);
            return getSortedDiagnostics();
        }
        function getGlobalDiagnostics() {
            throwIfNonDiagnosticsProducing();
            return ts.filter(getSortedDiagnostics(), function (d) { return !d.file; });
        }
        function throwIfNonDiagnosticsProducing() {
            if (!produceDiagnostics) {
                throw new Error("Trying to get diagnostics from a type checker that does not produce them.");
            }
        }
        // Language service support
        function isInsideWithStatementBody(node) {
            if (node) {
                while (node.parent) {
                    if (node.parent.kind === ts.SyntaxKind.WithStatement && node.parent.statement === node) {
                        return true;
                    }
                    node = node.parent;
                }
            }
            return false;
        }
        function getSymbolsInScope(location, meaning) {
            var symbols = {};
            var memberFlags = 0;
            function copySymbol(symbol, meaning) {
                if (symbol.flags & meaning) {
                    var id = symbol.name;
                    if (!isReservedMemberName(id) && !ts.hasProperty(symbols, id)) {
                        symbols[id] = symbol;
                    }
                }
            }
            function copySymbols(source, meaning) {
                if (meaning) {
                    for (var id in source) {
                        if (ts.hasProperty(source, id)) {
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
                    case ts.SyntaxKind.SourceFile:
                        if (!ts.isExternalModule(location))
                            break;
                    case ts.SyntaxKind.ModuleDeclaration:
                        copySymbols(getSymbolOfNode(location).exports, meaning & ts.SymbolFlags.ModuleMember);
                        break;
                    case ts.SyntaxKind.EnumDeclaration:
                        copySymbols(getSymbolOfNode(location).exports, meaning & ts.SymbolFlags.EnumMember);
                        break;
                    case ts.SyntaxKind.ClassDeclaration:
                    case ts.SyntaxKind.InterfaceDeclaration:
                        if (!(memberFlags & ts.NodeFlags.Static)) {
                            copySymbols(getSymbolOfNode(location).members, meaning & ts.SymbolFlags.Type);
                        }
                        break;
                    case ts.SyntaxKind.FunctionExpression:
                        if (location.name) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                    case ts.SyntaxKind.CatchClause:
                        if (location.name.text) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                }
                memberFlags = location.flags;
                location = location.parent;
            }
            copySymbols(globals, meaning);
            return ts.mapToArray(symbols);
        }
        function isTypeDeclarationName(name) {
            return name.kind == ts.SyntaxKind.Identifier && isTypeDeclaration(name.parent) && name.parent.name === name;
        }
        function isTypeDeclaration(node) {
            switch (node.kind) {
                case ts.SyntaxKind.TypeParameter:
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.TypeAliasDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                    return true;
            }
        }
        // True if the given identifier is part of a type reference
        function isTypeReferenceIdentifier(entityName) {
            var node = entityName;
            while (node.parent && node.parent.kind === ts.SyntaxKind.QualifiedName)
                node = node.parent;
            return node.parent && node.parent.kind === ts.SyntaxKind.TypeReference;
        }
        function isTypeNode(node) {
            if (ts.SyntaxKind.FirstTypeNode <= node.kind && node.kind <= ts.SyntaxKind.LastTypeNode) {
                return true;
            }
            switch (node.kind) {
                case ts.SyntaxKind.AnyKeyword:
                case ts.SyntaxKind.NumberKeyword:
                case ts.SyntaxKind.StringKeyword:
                case ts.SyntaxKind.BooleanKeyword:
                    return true;
                case ts.SyntaxKind.VoidKeyword:
                    return node.parent.kind !== ts.SyntaxKind.VoidExpression;
                case ts.SyntaxKind.StringLiteral:
                    // Specialized signatures can have string literals as their parameters' type names
                    return node.parent.kind === ts.SyntaxKind.Parameter;
                case ts.SyntaxKind.Identifier:
                    // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
                    if (node.parent.kind === ts.SyntaxKind.QualifiedName && node.parent.right === node) {
                        node = node.parent;
                    }
                case ts.SyntaxKind.QualifiedName:
                    // At this point, node is either a qualified name or an identifier
                    ts.Debug.assert(node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.QualifiedName, "'node' was expected to be a qualified name or identifier in 'isTypeNode'.");
                    var parent = node.parent;
                    if (parent.kind === ts.SyntaxKind.TypeQuery) {
                        return false;
                    }
                    // Do not recursively call isTypeNode on the parent. In the example:
                    //
                    //     var a: A.B.C;
                    //
                    // Calling isTypeNode would consider the qualified name A.B a type node. Only C or
                    // A.B.C is a type node.
                    if (ts.SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= ts.SyntaxKind.LastTypeNode) {
                        return true;
                    }
                    switch (parent.kind) {
                        case ts.SyntaxKind.TypeParameter:
                            return node === parent.constraint;
                        case ts.SyntaxKind.PropertyDeclaration:
                        case ts.SyntaxKind.PropertySignature:
                        case ts.SyntaxKind.Parameter:
                        case ts.SyntaxKind.VariableDeclaration:
                            return node === parent.type;
                        case ts.SyntaxKind.FunctionDeclaration:
                        case ts.SyntaxKind.FunctionExpression:
                        case ts.SyntaxKind.ArrowFunction:
                        case ts.SyntaxKind.Constructor:
                        case ts.SyntaxKind.MethodDeclaration:
                        case ts.SyntaxKind.MethodSignature:
                        case ts.SyntaxKind.GetAccessor:
                        case ts.SyntaxKind.SetAccessor:
                            return node === parent.type;
                        case ts.SyntaxKind.CallSignature:
                        case ts.SyntaxKind.ConstructSignature:
                        case ts.SyntaxKind.IndexSignature:
                            return node === parent.type;
                        case ts.SyntaxKind.TypeAssertionExpression:
                            return node === parent.type;
                        case ts.SyntaxKind.CallExpression:
                        case ts.SyntaxKind.NewExpression:
                            return parent.typeArguments && ts.indexOf(parent.typeArguments, node) >= 0;
                        case ts.SyntaxKind.TaggedTemplateExpression:
                            // TODO (drosen): TaggedTemplateExpressions may eventually support type arguments.
                            return false;
                    }
            }
            return false;
        }
        function getLeftSideOfImportOrExportAssignment(nodeOnRightSide) {
            while (nodeOnRightSide.parent.kind === ts.SyntaxKind.QualifiedName) {
                nodeOnRightSide = nodeOnRightSide.parent;
            }
            if (nodeOnRightSide.parent.kind === ts.SyntaxKind.ImportDeclaration) {
                return nodeOnRightSide.parent.moduleReference === nodeOnRightSide && nodeOnRightSide.parent;
            }
            if (nodeOnRightSide.parent.kind === ts.SyntaxKind.ExportAssignment) {
                return nodeOnRightSide.parent.exportName === nodeOnRightSide && nodeOnRightSide.parent;
            }
            return undefined;
        }
        function isInRightSideOfImportOrExportAssignment(node) {
            return getLeftSideOfImportOrExportAssignment(node) !== undefined;
        }
        function isRightSideOfQualifiedNameOrPropertyAccess(node) {
            return (node.parent.kind === ts.SyntaxKind.QualifiedName && node.parent.right === node) || (node.parent.kind === ts.SyntaxKind.PropertyAccessExpression && node.parent.name === node);
        }
        function getSymbolOfEntityNameOrPropertyAccessExpression(entityName) {
            if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(entityName)) {
                return getSymbolOfNode(entityName.parent);
            }
            if (entityName.parent.kind === ts.SyntaxKind.ExportAssignment) {
                return resolveEntityName(entityName.parent.parent, entityName, ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace | ts.SymbolFlags.Import);
            }
            if (entityName.kind !== ts.SyntaxKind.PropertyAccessExpression) {
                if (isInRightSideOfImportOrExportAssignment(entityName)) {
                    // Since we already checked for ExportAssignment, this really could only be an Import
                    return getSymbolOfPartOfRightHandSideOfImport(entityName);
                }
            }
            if (isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = entityName.parent;
            }
            if (ts.isExpression(entityName)) {
                if (ts.getFullWidth(entityName) === 0) {
                    // Missing entity name.
                    return undefined;
                }
                if (entityName.kind === ts.SyntaxKind.Identifier) {
                    // Include Import in the meaning, this ensures that we do not follow aliases to where they point and instead
                    // return the alias symbol.
                    var meaning = ts.SymbolFlags.Value | ts.SymbolFlags.Import;
                    return resolveEntityName(entityName, entityName, meaning);
                }
                else if (entityName.kind === ts.SyntaxKind.PropertyAccessExpression) {
                    var symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkPropertyAccessExpression(entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
                else if (entityName.kind === ts.SyntaxKind.QualifiedName) {
                    var symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkQualifiedName(entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
            }
            else if (isTypeReferenceIdentifier(entityName)) {
                var meaning = entityName.parent.kind === ts.SyntaxKind.TypeReference ? ts.SymbolFlags.Type : ts.SymbolFlags.Namespace;
                // Include Import in the meaning, this ensures that we do not follow aliases to where they point and instead
                // return the alias symbol.
                meaning |= ts.SymbolFlags.Import;
                return resolveEntityName(entityName, entityName, meaning);
            }
            // Do we want to return undefined here?
            return undefined;
        }
        function getSymbolInfo(node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                // This is a declaration, call getSymbolOfNode
                return getSymbolOfNode(node.parent);
            }
            if (node.kind === ts.SyntaxKind.Identifier && isInRightSideOfImportOrExportAssignment(node)) {
                return node.parent.kind === ts.SyntaxKind.ExportAssignment ? getSymbolOfEntityNameOrPropertyAccessExpression(node) : getSymbolOfPartOfRightHandSideOfImport(node);
            }
            switch (node.kind) {
                case ts.SyntaxKind.Identifier:
                case ts.SyntaxKind.PropertyAccessExpression:
                case ts.SyntaxKind.QualifiedName:
                    return getSymbolOfEntityNameOrPropertyAccessExpression(node);
                case ts.SyntaxKind.ThisKeyword:
                case ts.SyntaxKind.SuperKeyword:
                    var type = checkExpression(node);
                    return type.symbol;
                case ts.SyntaxKind.ConstructorKeyword:
                    // constructor keyword for an overload, should take us to the definition if it exist
                    var constructorDeclaration = node.parent;
                    if (constructorDeclaration && constructorDeclaration.kind === ts.SyntaxKind.Constructor) {
                        return constructorDeclaration.parent.symbol;
                    }
                    return undefined;
                case ts.SyntaxKind.StringLiteral:
                    // External module name in an import declaration
                    if (ts.isExternalModuleImportDeclaration(node.parent.parent) && ts.getExternalModuleImportDeclarationExpression(node.parent.parent) === node) {
                        var importSymbol = getSymbolOfNode(node.parent.parent);
                        var moduleType = getTypeOfSymbol(importSymbol);
                        return moduleType ? moduleType.symbol : undefined;
                    }
                case ts.SyntaxKind.NumericLiteral:
                    // index access
                    if (node.parent.kind == ts.SyntaxKind.ElementAccessExpression && node.parent.argumentExpression === node) {
                        var objectType = checkExpression(node.parent.expression);
                        if (objectType === unknownType)
                            return undefined;
                        var apparentType = getApparentType(objectType);
                        if (apparentType === unknownType)
                            return undefined;
                        return getPropertyOfType(apparentType, node.text);
                    }
                    break;
            }
            return undefined;
        }
        function getShorthandAssignmentValueSymbol(location) {
            // The function returns a value symbol of an identifier in the short-hand property assignment.
            // This is necessary as an identifier in short-hand property assignment can contains two meaning:
            // property name and property value.
            if (location && location.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                return resolveEntityName(location, location.name, ts.SymbolFlags.Value);
            }
            return undefined;
        }
        function getTypeOfNode(node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return unknownType;
            }
            if (ts.isExpression(node)) {
                return getTypeOfExpression(node);
            }
            if (isTypeNode(node)) {
                return getTypeFromTypeNode(node);
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
            if (ts.isDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolInfo because it is a declaration
                var symbol = getSymbolOfNode(node);
                return getTypeOfSymbol(symbol);
            }
            if (ts.isDeclarationOrFunctionExpressionOrCatchVariableName(node)) {
                var symbol = getSymbolInfo(node);
                return symbol && getTypeOfSymbol(symbol);
            }
            if (isInRightSideOfImportOrExportAssignment(node)) {
                var symbol = getSymbolInfo(node);
                var declaredType = symbol && getDeclaredTypeOfSymbol(symbol);
                return declaredType !== unknownType ? declaredType : getTypeOfSymbol(symbol);
            }
            return unknownType;
        }
        function getTypeOfExpression(expr) {
            if (isRightSideOfQualifiedNameOrPropertyAccess(expr)) {
                expr = expr.parent;
            }
            return checkExpression(expr);
        }
        // Return the list of properties of the given type, augmented with properties from Function
        // if the type has call or construct signatures
        function getAugmentedPropertiesOfType(type) {
            var type = getApparentType(type);
            var propsByName = createSymbolTable(getPropertiesOfType(type));
            if (getSignaturesOfType(type, ts.SignatureKind.Call).length || getSignaturesOfType(type, ts.SignatureKind.Construct).length) {
                ts.forEach(getPropertiesOfType(globalFunctionType), function (p) {
                    if (!ts.hasProperty(propsByName, p.name)) {
                        propsByName[p.name] = p;
                    }
                });
            }
            return getNamedMembers(propsByName);
        }
        function getRootSymbols(symbol) {
            if (symbol.flags & ts.SymbolFlags.UnionProperty) {
                var symbols = [];
                var name = symbol.name;
                ts.forEach(getSymbolLinks(symbol).unionType.types, function (t) {
                    symbols.push(getPropertyOfType(t, name));
                });
                return symbols;
            }
            else if (symbol.flags & ts.SymbolFlags.Transient) {
                var target = getSymbolLinks(symbol).target;
                if (target) {
                    return [target];
                }
            }
            return [symbol];
        }
        // Emitter support
        function isExternalModuleSymbol(symbol) {
            return symbol.flags & ts.SymbolFlags.ValueModule && symbol.declarations.length === 1 && symbol.declarations[0].kind === ts.SyntaxKind.SourceFile;
        }
        function isNodeDescendentOf(node, ancestor) {
            while (node) {
                if (node === ancestor)
                    return true;
                node = node.parent;
            }
            return false;
        }
        function isUniqueLocalName(name, container) {
            for (var node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && ts.hasProperty(node.locals, name)) {
                    var symbolWithRelevantName = node.locals[name];
                    if (symbolWithRelevantName.flags & (ts.SymbolFlags.Value | ts.SymbolFlags.ExportValue)) {
                        return false;
                    }
                    // An import can be emitted too, if it is referenced as a value.
                    // Make sure the name in question does not collide with an import.
                    if (symbolWithRelevantName.flags & ts.SymbolFlags.Import) {
                        var importDeclarationWithRelevantName = ts.getDeclarationOfKind(symbolWithRelevantName, ts.SyntaxKind.ImportDeclaration);
                        if (isReferencedImportDeclaration(importDeclarationWithRelevantName)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        function getLocalNameOfContainer(container) {
            var links = getNodeLinks(container);
            if (!links.localModuleName) {
                var prefix = "";
                var name = ts.unescapeIdentifier(container.name.text);
                while (!isUniqueLocalName(ts.escapeIdentifier(prefix + name), container)) {
                    prefix += "_";
                }
                links.localModuleName = prefix + ts.getTextOfNode(container.name);
            }
            return links.localModuleName;
        }
        function getLocalNameForSymbol(symbol, location) {
            var node = location;
            while (node) {
                if ((node.kind === ts.SyntaxKind.ModuleDeclaration || node.kind === ts.SyntaxKind.EnumDeclaration) && getSymbolOfNode(node) === symbol) {
                    return getLocalNameOfContainer(node);
                }
                node = node.parent;
            }
            ts.Debug.fail("getLocalNameForSymbol failed");
        }
        function getExpressionNamePrefix(node) {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol) {
                // In general, we need to prefix an identifier with its parent name if it references
                // an exported entity from another module declaration. If we reference an exported
                // entity within the same module declaration, then whether we prefix depends on the
                // kind of entity. SymbolFlags.ExportHasLocal encompasses all the kinds that we
                // do NOT prefix.
                var exportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
                if (symbol !== exportSymbol && !(exportSymbol.flags & ts.SymbolFlags.ExportHasLocal)) {
                    symbol = exportSymbol;
                }
                if (symbol.parent) {
                    return isExternalModuleSymbol(symbol.parent) ? "exports" : getLocalNameForSymbol(getParentOfSymbol(symbol), node.parent);
                }
            }
        }
        function getExportAssignmentName(node) {
            var symbol = getExportAssignmentSymbol(getSymbolOfNode(node));
            return symbol && symbolIsValue(symbol) && !isConstEnumSymbol(symbol) ? symbolToString(symbol) : undefined;
        }
        function isTopLevelValueImportWithEntityName(node) {
            if (node.parent.kind !== ts.SyntaxKind.SourceFile || !ts.isInternalModuleImportDeclaration(node)) {
                // parent is not source file or it is not reference to internal module
                return false;
            }
            return isImportResolvedToValue(getSymbolOfNode(node));
        }
        function hasSemanticErrors(sourceFile) {
            // Return true if there is any semantic error in a file or globally
            return getDiagnostics(sourceFile).length > 0 || getGlobalDiagnostics().length > 0;
        }
        function isImportResolvedToValue(symbol) {
            var target = resolveImport(symbol);
            // const enums and modules that contain only const enums are not considered values from the emit perespective
            return target !== unknownSymbol && target.flags & ts.SymbolFlags.Value && !isConstEnumOrConstEnumOnlyModule(target);
        }
        function isConstEnumOrConstEnumOnlyModule(s) {
            return isConstEnumSymbol(s) || s.constEnumOnlyModule;
        }
        function isReferencedImportDeclaration(node) {
            var symbol = getSymbolOfNode(node);
            if (getSymbolLinks(symbol).referenced) {
                return true;
            }
            // logic below will answer 'true' for exported import declaration in a nested module that itself is not exported.
            // As a consequence this might cause emitting extra.
            if (node.flags & ts.NodeFlags.Export) {
                return isImportResolvedToValue(symbol);
            }
            return false;
        }
        function isImplementationOfOverload(node) {
            if (ts.nodeIsPresent(node.body)) {
                var symbol = getSymbolOfNode(node);
                var signaturesOfSymbol = getSignaturesOfSymbol(symbol);
                // If this function body corresponds to function with multiple signature, it is implementation of overload
                // e.g.: function foo(a: string): string;
                //       function foo(a: number): number;
                //       function foo(a: any) { // This is implementation of the overloads
                //           return a;
                //       }
                return signaturesOfSymbol.length > 1 || (signaturesOfSymbol.length === 1 && signaturesOfSymbol[0].declaration !== node);
            }
            return false;
        }
        function getNodeCheckFlags(node) {
            return getNodeLinks(node).flags;
        }
        function getEnumMemberValue(node) {
            computeEnumMemberValues(node.parent);
            return getNodeLinks(node).enumMemberValue;
        }
        function getConstantValue(node) {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol && (symbol.flags & ts.SymbolFlags.EnumMember)) {
                var declaration = symbol.valueDeclaration;
                var constantValue;
                if (declaration.kind === ts.SyntaxKind.EnumMember && (constantValue = getNodeLinks(declaration).enumMemberValue) !== undefined) {
                    return constantValue;
                }
            }
            return undefined;
        }
        function writeTypeOfDeclaration(declaration, enclosingDeclaration, flags, writer) {
            // Get type of the symbol if this is the valid symbol otherwise get type at location
            var symbol = getSymbolOfNode(declaration);
            var type = symbol && !(symbol.flags & (ts.SymbolFlags.TypeLiteral | ts.SymbolFlags.Signature)) ? getTypeOfSymbol(symbol) : unknownType;
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }
        function writeReturnTypeOfSignatureDeclaration(signatureDeclaration, enclosingDeclaration, flags, writer) {
            var signature = getSignatureFromDeclaration(signatureDeclaration);
            getSymbolDisplayBuilder().buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags);
        }
        function isUnknownIdentifier(location, name) {
            return !resolveName(location, name, ts.SymbolFlags.Value, undefined, undefined);
        }
        function createResolver() {
            return {
                getLocalNameOfContainer,
                getExpressionNamePrefix,
                getExportAssignmentName,
                isReferencedImportDeclaration,
                getNodeCheckFlags,
                getEnumMemberValue,
                isTopLevelValueImportWithEntityName,
                hasSemanticErrors,
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
            ts.forEach(host.getSourceFiles(), function (file) {
                ts.bindSourceFile(file);
                ts.forEach(file.semanticDiagnostics, addDiagnostic);
            });
            // Initialize global symbol table
            ts.forEach(host.getSourceFiles(), function (file) {
                if (!ts.isExternalModule(file)) {
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
            globalTemplateStringsArrayType = compilerOptions.target >= ts.ScriptTarget.ES6 ? getGlobalType("TemplateStringsArray") : unknownType;
            anyArrayType = createArrayType(anyType);
        }
        // GRAMMAR CHECKING
        function checkGrammarModifiers(node) {
            switch (node.kind) {
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.IndexSignature:
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.ModuleDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.ExportAssignment:
                case ts.SyntaxKind.VariableStatement:
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.TypeAliasDeclaration:
                case ts.SyntaxKind.ImportDeclaration:
                case ts.SyntaxKind.Parameter:
                    break;
                default:
                    return false;
            }
            if (!node.modifiers) {
                return;
            }
            var lastStatic, lastPrivate, lastProtected, lastDeclare;
            var flags = 0;
            for (var i = 0, n = node.modifiers.length; i < n; i++) {
                var modifier = node.modifiers[i];
                switch (modifier.kind) {
                    case ts.SyntaxKind.PublicKeyword:
                    case ts.SyntaxKind.ProtectedKeyword:
                    case ts.SyntaxKind.PrivateKeyword:
                        var text;
                        if (modifier.kind === ts.SyntaxKind.PublicKeyword) {
                            text = "public";
                        }
                        else if (modifier.kind === ts.SyntaxKind.ProtectedKeyword) {
                            text = "protected";
                            lastProtected = modifier;
                        }
                        else {
                            text = "private";
                            lastPrivate = modifier;
                        }
                        if (flags & ts.NodeFlags.AccessibilityModifier) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & ts.NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_must_precede_1_modifier, text, "static");
                        }
                        else if (node.parent.kind === ts.SyntaxKind.ModuleBlock || node.parent.kind === ts.SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, text);
                        }
                        flags |= ts.modifierToFlag(modifier.kind);
                        break;
                    case ts.SyntaxKind.StaticKeyword:
                        if (flags & ts.NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (node.parent.kind === ts.SyntaxKind.ModuleBlock || node.parent.kind === ts.SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (node.kind === ts.SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        flags |= ts.NodeFlags.Static;
                        lastStatic = modifier;
                        break;
                    case ts.SyntaxKind.ExportKeyword:
                        if (flags & ts.NodeFlags.Export) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_already_seen, "export");
                        }
                        else if (flags & ts.NodeFlags.Ambient) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                        }
                        else if (node.parent.kind === ts.SyntaxKind.ClassDeclaration) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_class_element, "export");
                        }
                        else if (node.kind === ts.SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                        }
                        flags |= ts.NodeFlags.Export;
                        break;
                    case ts.SyntaxKind.DeclareKeyword:
                        if (flags & ts.NodeFlags.Ambient) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_already_seen, "declare");
                        }
                        else if (node.parent.kind === ts.SyntaxKind.ClassDeclaration) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_class_element, "declare");
                        }
                        else if (node.kind === ts.SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                        }
                        else if (ts.isInAmbientContext(node.parent) && node.parent.kind === ts.SyntaxKind.ModuleBlock) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                        }
                        flags |= ts.NodeFlags.Ambient;
                        lastDeclare = modifier;
                        break;
                }
            }
            if (node.kind === ts.SyntaxKind.Constructor) {
                if (flags & ts.NodeFlags.Static) {
                    return grammarErrorOnNode(lastStatic, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                }
                else if (flags & ts.NodeFlags.Protected) {
                    return grammarErrorOnNode(lastProtected, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "protected");
                }
                else if (flags & ts.NodeFlags.Private) {
                    return grammarErrorOnNode(lastPrivate, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
                }
            }
            else if (node.kind === ts.SyntaxKind.ImportDeclaration && flags & ts.NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, ts.Diagnostics.A_declare_modifier_cannot_be_used_with_an_import_declaration, "declare");
            }
            else if (node.kind === ts.SyntaxKind.InterfaceDeclaration && flags & ts.NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, ts.Diagnostics.A_declare_modifier_cannot_be_used_with_an_interface_declaration, "declare");
            }
            else if (node.kind === ts.SyntaxKind.Parameter && (flags & ts.NodeFlags.AccessibilityModifier) && ts.isBindingPattern(node.name)) {
                return grammarErrorOnNode(node, ts.Diagnostics.A_parameter_property_may_not_be_a_binding_pattern);
            }
        }
        function checkGrammarForDisallowedTrailingComma(list) {
            if (list && list.hasTrailingComma) {
                var start = list.end - ",".length;
                var end = list.end;
                var sourceFile = ts.getSourceFileOfNode(list[0]);
                return grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Trailing_comma_not_allowed);
            }
        }
        function checkGrammarTypeParameterList(node, typeParameters) {
            if (checkGrammarForDisallowedTrailingComma(typeParameters)) {
                return true;
            }
            if (typeParameters && typeParameters.length === 0) {
                var start = typeParameters.pos - "<".length;
                var sourceFile = ts.getSourceFileOfNode(node);
                var end = ts.skipTrivia(sourceFile.text, typeParameters.end) + ">".length;
                return grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Type_parameter_list_cannot_be_empty);
            }
        }
        function checkGrammarParameterList(parameters) {
            if (checkGrammarForDisallowedTrailingComma(parameters)) {
                return true;
            }
            var seenOptionalParameter = false;
            var parameterCount = parameters.length;
            for (var i = 0; i < parameterCount; i++) {
                var parameter = parameters[i];
                if (parameter.dotDotDotToken) {
                    if (i !== (parameterCount - 1)) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, ts.Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                    }
                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, ts.Diagnostics.A_rest_parameter_cannot_be_optional);
                    }
                    if (parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, ts.Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                    }
                }
                else if (parameter.questionToken || parameter.initializer) {
                    seenOptionalParameter = true;
                    if (parameter.questionToken && parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, ts.Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        return grammarErrorOnNode(parameter.name, ts.Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                    }
                }
            }
        }
        function checkGrammarFunctionLikeDeclaration(node) {
            // Prevent cascading error by short-circuit
            return checkGrammarModifiers(node) || checkGrammarTypeParameterList(node, node.typeParameters) || checkGrammarParameterList(node.parameters);
        }
        function checkGrammarIndexSignatureParameters(node) {
            var parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                if (parameter) {
                    return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
                else {
                    return grammarErrorOnNode(node, ts.Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
            }
            else if (parameter.dotDotDotToken) {
                return grammarErrorOnNode(parameter.dotDotDotToken, ts.Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
            }
            else if (parameter.flags & ts.NodeFlags.Modifier) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
            }
            else if (parameter.questionToken) {
                return grammarErrorOnNode(parameter.questionToken, ts.Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
            }
            else if (parameter.initializer) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
            }
            else if (!parameter.type) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
            }
            else if (parameter.type.kind !== ts.SyntaxKind.StringKeyword && parameter.type.kind !== ts.SyntaxKind.NumberKeyword) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
            }
            else if (!node.type) {
                return grammarErrorOnNode(node, ts.Diagnostics.An_index_signature_must_have_a_type_annotation);
            }
        }
        function checkGrammarForIndexSignatureModifier(node) {
            if (node.flags & ts.NodeFlags.Modifier) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.Modifiers_not_permitted_on_index_signature_members);
            }
        }
        function checkGrammarIndexSignature(node) {
            // Prevent cascading error by short-circuit
            checkGrammarModifiers(node) || checkGrammarIndexSignatureParameters(node) || checkGrammarForIndexSignatureModifier(node);
        }
        function checkGrammarForAtLeastOneTypeArgument(node, typeArguments) {
            if (typeArguments && typeArguments.length === 0) {
                var sourceFile = ts.getSourceFileOfNode(node);
                var start = typeArguments.pos - "<".length;
                var end = ts.skipTrivia(sourceFile.text, typeArguments.end) + ">".length;
                return grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Type_argument_list_cannot_be_empty);
            }
        }
        function checkGrammarTypeArguments(node, typeArguments) {
            return checkGrammarForDisallowedTrailingComma(typeArguments) || checkGrammarForAtLeastOneTypeArgument(node, typeArguments);
        }
        function checkGrammarForOmittedArgument(node, arguments) {
            if (arguments) {
                var sourceFile = ts.getSourceFileOfNode(node);
                for (var i = 0, n = arguments.length; i < n; i++) {
                    var arg = arguments[i];
                    if (arg.kind === ts.SyntaxKind.OmittedExpression) {
                        return grammarErrorAtPos(sourceFile, arg.pos, 0, ts.Diagnostics.Argument_expression_expected);
                    }
                }
            }
        }
        function checkGrammarArguments(node, arguments) {
            return checkGrammarForDisallowedTrailingComma(arguments) || checkGrammarForOmittedArgument(node, arguments);
        }
        function checkGrammarHeritageClause(node) {
            var types = node.types;
            if (checkGrammarForDisallowedTrailingComma(types)) {
                return true;
            }
            if (types && types.length === 0) {
                var listType = ts.tokenToString(node.token);
                var sourceFile = ts.getSourceFileOfNode(node);
                return grammarErrorAtPos(sourceFile, types.pos, 0, ts.Diagnostics._0_list_cannot_be_empty, listType);
            }
        }
        function checkGrammarClassDeclarationHeritageClauses(node) {
            var seenExtendsClause = false;
            var seenImplementsClause = false;
            if (!checkGrammarModifiers(node) && node.heritageClauses) {
                for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                    ts.Debug.assert(i <= 2);
                    var heritageClause = node.heritageClauses[i];
                    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.extends_clause_already_seen);
                        }
                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.extends_clause_must_precede_implements_clause);
                        }
                        if (heritageClause.types.length > 1) {
                            return grammarErrorOnFirstToken(heritageClause.types[1], ts.Diagnostics.Classes_can_only_extend_a_single_class);
                        }
                        seenExtendsClause = true;
                    }
                    else {
                        ts.Debug.assert(heritageClause.token === ts.SyntaxKind.ImplementsKeyword);
                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.implements_clause_already_seen);
                        }
                        seenImplementsClause = true;
                    }
                    // Grammar checking heritageClause inside class declaration
                    checkGrammarHeritageClause(heritageClause);
                }
            }
        }
        function checkGrammarInterfaceDeclaration(node) {
            var seenExtendsClause = false;
            if (node.heritageClauses) {
                for (var i = 0, n = node.heritageClauses.length; i < n; i++) {
                    ts.Debug.assert(i <= 1);
                    var heritageClause = node.heritageClauses[i];
                    if (heritageClause.token === ts.SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.extends_clause_already_seen);
                        }
                        seenExtendsClause = true;
                    }
                    else {
                        ts.Debug.assert(heritageClause.token === ts.SyntaxKind.ImplementsKeyword);
                        return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.Interface_declaration_cannot_have_implements_clause);
                    }
                    // Grammar checking heritageClause inside class declaration
                    checkGrammarHeritageClause(heritageClause);
                }
            }
            return false;
        }
        function checkGrammarComputedPropertyName(node) {
            // If node is not a computedPropertyName, just skip the grammar checking
            if (node.kind !== ts.SyntaxKind.ComputedPropertyName) {
                return;
            }
            // Since computed properties are not supported in the type checker, disallow them in TypeScript 1.4
            // Once full support is added, remove this error.
            grammarErrorOnNode(node, ts.Diagnostics.Computed_property_names_are_not_currently_supported);
            return;
            var computedPropertyName = node;
            if (compilerOptions.target < ts.ScriptTarget.ES6) {
                grammarErrorOnNode(node, ts.Diagnostics.Computed_property_names_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }
            else if (computedPropertyName.expression.kind === ts.SyntaxKind.BinaryExpression && computedPropertyName.expression.operator === ts.SyntaxKind.CommaToken) {
                grammarErrorOnNode(computedPropertyName.expression, ts.Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name);
            }
        }
        function checkGrammarForGenerator(node) {
            if (node.asteriskToken) {
                return grammarErrorOnNode(node.asteriskToken, ts.Diagnostics.Generators_are_not_currently_supported);
            }
        }
        function checkGrammarFunctionName(name) {
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
            return checkGrammarEvalOrArgumentsInStrictMode(name, name);
        }
        function checkGrammarForInvalidQuestionMark(node, questionToken, message) {
            if (questionToken) {
                return grammarErrorOnNode(questionToken, message);
            }
        }
        function checkGrammarObjectLiteralExpression(node) {
            var seen = {};
            var Property = 1;
            var GetAccessor = 2;
            var SetAccesor = 4;
            var GetOrSetAccessor = GetAccessor | SetAccesor;
            var inStrictMode = (node.parserContextFlags & ts.ParserContextFlags.StrictMode) !== 0;
            for (var i = 0, n = node.properties.length; i < n; i++) {
                var prop = node.properties[i];
                var name = prop.name;
                if (prop.kind === ts.SyntaxKind.OmittedExpression || name.kind === ts.SyntaxKind.ComputedPropertyName) {
                    // If the name is not a ComputedPropertyName, the grammar checking will skip it
                    checkGrammarComputedPropertyName(name);
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
                var currentKind;
                if (prop.kind === ts.SyntaxKind.PropertyAssignment || prop.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    // Grammar checking for computedPropertName and shorthandPropertyAssignment
                    checkGrammarForInvalidQuestionMark(prop, prop.questionToken, ts.Diagnostics.An_object_member_cannot_be_declared_optional);
                    if (name.kind === ts.SyntaxKind.NumericLiteral) {
                        checkGrammarNumbericLiteral(name);
                    }
                    currentKind = Property;
                }
                else if (prop.kind === ts.SyntaxKind.MethodDeclaration) {
                    currentKind = Property;
                }
                else if (prop.kind === ts.SyntaxKind.GetAccessor) {
                    currentKind = GetAccessor;
                }
                else if (prop.kind === ts.SyntaxKind.SetAccessor) {
                    currentKind = SetAccesor;
                }
                else {
                    ts.Debug.fail("Unexpected syntax kind:" + prop.kind);
                }
                if (!ts.hasProperty(seen, name.text)) {
                    seen[name.text] = currentKind;
                }
                else {
                    var existingKind = seen[name.text];
                    if (currentKind === Property && existingKind === Property) {
                        if (inStrictMode) {
                            grammarErrorOnNode(name, ts.Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode);
                        }
                    }
                    else if ((currentKind & GetOrSetAccessor) && (existingKind & GetOrSetAccessor)) {
                        if (existingKind !== GetOrSetAccessor && currentKind !== existingKind) {
                            seen[name.text] = currentKind | existingKind;
                        }
                        else {
                            return grammarErrorOnNode(name, ts.Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                        }
                    }
                    else {
                        return grammarErrorOnNode(name, ts.Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                    }
                }
            }
        }
        function checkGrammarAccessor(accessor) {
            var kind = accessor.kind;
            if (compilerOptions.target < ts.ScriptTarget.ES5) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
            }
            else if (ts.isInAmbientContext(accessor)) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.An_accessor_cannot_be_declared_in_an_ambient_context);
            }
            else if (accessor.body === undefined) {
                return grammarErrorAtPos(ts.getSourceFileOfNode(accessor), accessor.end - 1, ";".length, ts.Diagnostics._0_expected, "{");
            }
            else if (accessor.typeParameters) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.An_accessor_cannot_have_type_parameters);
            }
            else if (kind === ts.SyntaxKind.GetAccessor && accessor.parameters.length) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_get_accessor_cannot_have_parameters);
            }
            else if (kind === ts.SyntaxKind.SetAccessor) {
                if (accessor.type) {
                    return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                }
                else if (accessor.parameters.length !== 1) {
                    return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                }
                else {
                    var parameter = accessor.parameters[0];
                    if (parameter.dotDotDotToken) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, ts.Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                    }
                    else if (parameter.flags & ts.NodeFlags.Modifier) {
                        return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                    }
                    else if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, ts.Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                    }
                    else if (parameter.initializer) {
                        return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                    }
                }
            }
        }
        function checkGrammarForDisallowedComputedProperty(node, message) {
            if (node.kind === ts.SyntaxKind.ComputedPropertyName) {
                return grammarErrorOnNode(node, message);
            }
        }
        function checkGrammarMethod(node) {
            if (checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) || checkGrammarFunctionLikeDeclaration(node) || checkGrammarForGenerator(node)) {
                return true;
            }
            if (node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, ts.Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                else if (node.body === undefined) {
                    return grammarErrorAtPos(getSourceFile(node), node.end - 1, ";".length, ts.Diagnostics._0_expected, "{");
                }
            }
            if (node.parent.kind === ts.SyntaxKind.ClassDeclaration) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, ts.Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                // Technically, computed properties in ambient contexts is disallowed
                // for property declarations and accessors too, not just methods.
                // However, property declarations disallow computed names in general,
                // and accessors are not allowed in ambient contexts in general,
                // so this error only really matters for methods.
                if (ts.isInAmbientContext(node)) {
                    return checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_an_ambient_context);
                }
                else if (!node.body) {
                    return checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_method_overloads);
                }
            }
            else if (node.parent.kind === ts.SyntaxKind.InterfaceDeclaration) {
                return checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_interfaces);
            }
            else if (node.parent.kind === ts.SyntaxKind.TypeLiteral) {
                return checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_type_literals);
            }
        }
        function isIterationStatement(node, lookInLabeledStatements) {
            switch (node.kind) {
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.WhileStatement:
                    return true;
                case ts.SyntaxKind.LabeledStatement:
                    return lookInLabeledStatements && isIterationStatement(node.statement, lookInLabeledStatements);
            }
            return false;
        }
        function checkGrammarBreakOrContinueStatement(node) {
            var current = node;
            while (current) {
                if (ts.isAnyFunction(current)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Jump_target_cannot_cross_function_boundary);
                }
                switch (current.kind) {
                    case ts.SyntaxKind.LabeledStatement:
                        if (node.label && current.label.text === node.label.text) {
                            // found matching label - verify that label usage is correct
                            // continue can only target labels that are on iteration statements
                            var isMisplacedContinueLabel = node.kind === ts.SyntaxKind.ContinueStatement && !isIterationStatement(current.statement, true);
                            if (isMisplacedContinueLabel) {
                                return grammarErrorOnNode(node, ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement);
                            }
                            return false;
                        }
                        break;
                    case ts.SyntaxKind.SwitchStatement:
                        if (node.kind === ts.SyntaxKind.BreakStatement && !node.label) {
                            // unlabeled break within switch statement - ok
                            return false;
                        }
                        break;
                    default:
                        if (isIterationStatement(current, false) && !node.label) {
                            // unlabeled break or continue within iteration statement - ok
                            return false;
                        }
                        break;
                }
                current = current.parent;
            }
            if (node.label) {
                var message = node.kind === ts.SyntaxKind.BreakStatement ? ts.Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement : ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message);
            }
            else {
                var message = node.kind === ts.SyntaxKind.BreakStatement ? ts.Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement : ts.Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message);
            }
        }
        function checkGrammarBindingElement(node) {
            if (node.dotDotDotToken) {
                var elements = node.parent.elements;
                if (node !== elements[elements.length - 1]) {
                    return grammarErrorOnNode(node, ts.Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                }
                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(ts.getSourceFileOfNode(node), node.initializer.pos - 1, 1, ts.Diagnostics.A_rest_element_cannot_have_an_initializer);
                }
            }
            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code 
            // and its Identifier is eval or arguments 
            return checkGrammarEvalOrArgumentsInStrictMode(node, node.name);
        }
        function checkGrammarVariableDeclaration(node) {
            if (ts.isInAmbientContext(node)) {
                if (ts.isBindingPattern(node.name)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Destructuring_declarations_are_not_allowed_in_ambient_contexts);
                }
                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(ts.getSourceFileOfNode(node), node.initializer.pos - 1, 1, ts.Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                }
            }
            else {
                if (!node.initializer) {
                    if (ts.isBindingPattern(node.name) && !ts.isBindingPattern(node.parent)) {
                        return grammarErrorOnNode(node, ts.Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                    }
                    if (ts.isConst(node)) {
                        return grammarErrorOnNode(node, ts.Diagnostics.const_declarations_must_be_initialized);
                    }
                }
            }
            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code 
            // and its Identifier is eval or arguments 
            return checkGrammarEvalOrArgumentsInStrictMode(node, node.name);
        }
        function checkGrammarVariableDeclarationList(declarationList) {
            var declarations = declarationList.declarations;
            if (checkGrammarForDisallowedTrailingComma(declarationList.declarations)) {
                return true;
            }
            if (!declarationList.declarations.length) {
                return grammarErrorAtPos(ts.getSourceFileOfNode(declarationList), declarations.pos, declarations.end - declarations.pos, ts.Diagnostics.Variable_declaration_list_cannot_be_empty);
            }
            if (compilerOptions.target < ts.ScriptTarget.ES6) {
                if (ts.isLet(declarationList)) {
                    return grammarErrorOnFirstToken(declarationList, ts.Diagnostics.let_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                }
                else if (ts.isConst(declarationList)) {
                    return grammarErrorOnFirstToken(declarationList, ts.Diagnostics.const_declarations_are_only_available_when_targeting_ECMAScript_6_and_higher);
                }
            }
        }
        function allowLetAndConstDeclarations(parent) {
            switch (parent.kind) {
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.WithStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.ForInStatement:
                    return false;
                case ts.SyntaxKind.LabeledStatement:
                    return allowLetAndConstDeclarations(parent.parent);
            }
            return true;
        }
        function checkGrammarForDisallowedLetOrConstStatement(node) {
            if (!allowLetAndConstDeclarations(node.parent)) {
                if (ts.isLet(node.declarationList)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.let_declarations_can_only_be_declared_inside_a_block);
                }
                else if (ts.isConst(node.declarationList)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.const_declarations_can_only_be_declared_inside_a_block);
                }
            }
        }
        function isIntegerLiteral(expression) {
            if (expression.kind === ts.SyntaxKind.PrefixUnaryExpression) {
                var unaryExpression = expression;
                if (unaryExpression.operator === ts.SyntaxKind.PlusToken || unaryExpression.operator === ts.SyntaxKind.MinusToken) {
                    expression = unaryExpression.operand;
                }
            }
            if (expression.kind === ts.SyntaxKind.NumericLiteral) {
                // Allows for scientific notation since literalExpression.text was formed by
                // coercing a number to a string. Sometimes this coercion can yield a string
                // in scientific notation.
                // We also don't need special logic for hex because a hex integer is converted
                // to decimal when it is coerced.
                return /^[0-9]+([eE]\+?[0-9]+)?$/.test(expression.text);
            }
            return false;
        }
        function checkGrammarEnumDeclaration(enumDecl) {
            var enumIsConst = (enumDecl.flags & ts.NodeFlags.Const) !== 0;
            var hasError = false;
            // skip checks below for const enums  - they allow arbitrary initializers as long as they can be evaluated to constant expressions.
            // since all values are known in compile time - it is not necessary to check that constant enum section precedes computed enum members.
            if (!enumIsConst) {
                var inConstantEnumMemberSection = true;
                var inAmbientContext = ts.isInAmbientContext(enumDecl);
                for (var i = 0, n = enumDecl.members.length; i < n; i++) {
                    var node = enumDecl.members[i];
                    if (node.name.kind === ts.SyntaxKind.ComputedPropertyName) {
                        hasError = grammarErrorOnNode(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_enums);
                    }
                    else if (inAmbientContext) {
                        if (node.initializer && !isIntegerLiteral(node.initializer)) {
                            hasError = grammarErrorOnNode(node.name, ts.Diagnostics.Ambient_enum_elements_can_only_have_integer_literal_initializers) || hasError;
                        }
                    }
                    else if (node.initializer) {
                        inConstantEnumMemberSection = isIntegerLiteral(node.initializer);
                    }
                    else if (!inConstantEnumMemberSection) {
                        hasError = grammarErrorOnNode(node.name, ts.Diagnostics.Enum_member_must_have_initializer) || hasError;
                    }
                }
            }
            return hasError;
        }
        function hasParseDiagnostics(sourceFile) {
            return sourceFile.parseDiagnostics.length > 0;
        }
        function scanToken(scanner, pos) {
            scanner.setTextPos(pos);
            scanner.scan();
            var start = scanner.getTokenPos();
            return start;
        }
        function grammarErrorOnFirstToken(node, message, arg0, arg1, arg2) {
            var sourceFile = ts.getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                var scanner = ts.createScanner(compilerOptions.target, true, sourceFile.text);
                var start = scanToken(scanner, node.pos);
                diagnostics.push(ts.createFileDiagnostic(sourceFile, start, scanner.getTextPos() - start, message, arg0, arg1, arg2));
                return true;
            }
        }
        function grammarErrorAtPos(sourceFile, start, length, message, arg0, arg1, arg2) {
            if (!hasParseDiagnostics(sourceFile)) {
                diagnostics.push(ts.createFileDiagnostic(sourceFile, start, length, message, arg0, arg1, arg2));
                return true;
            }
        }
        function grammarErrorOnNode(node, message, arg0, arg1, arg2) {
            var sourceFile = ts.getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                var span = ts.getErrorSpanForNode(node);
                var start = span.end > span.pos ? ts.skipTrivia(sourceFile.text, span.pos) : span.pos;
                diagnostics.push(ts.createFileDiagnostic(sourceFile, start, span.end - start, message, arg0, arg1, arg2));
                return true;
            }
        }
        function checkGrammarEvalOrArgumentsInStrictMode(contextNode, identifier) {
            if (contextNode && (contextNode.parserContextFlags & ts.ParserContextFlags.StrictMode) && ts.isEvalOrArgumentsIdentifier(identifier)) {
                var name = ts.declarationNameToString(identifier);
                return grammarErrorOnNode(identifier, ts.Diagnostics.Invalid_use_of_0_in_strict_mode, name);
            }
        }
        function checkGrammarConstructorTypeParameters(node) {
            if (node.typeParameters) {
                return grammarErrorAtPos(ts.getSourceFileOfNode(node), node.typeParameters.pos, node.typeParameters.end - node.typeParameters.pos, ts.Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
            }
        }
        function checkGrammarConstructorTypeAnnotation(node) {
            if (node.type) {
                return grammarErrorOnNode(node.type, ts.Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
            }
        }
        function checkGrammarProperty(node) {
            if (node.parent.kind === ts.SyntaxKind.ClassDeclaration) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, ts.Diagnostics.A_class_member_cannot_be_declared_optional) || checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_class_property_declarations)) {
                    return true;
                }
            }
            else if (node.parent.kind === ts.SyntaxKind.InterfaceDeclaration) {
                if (checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_interfaces)) {
                    return true;
                }
            }
            else if (node.parent.kind === ts.SyntaxKind.TypeLiteral) {
                if (checkGrammarForDisallowedComputedProperty(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_type_literals)) {
                    return true;
                }
            }
            if (ts.isInAmbientContext(node) && node.initializer) {
                return grammarErrorOnFirstToken(node.initializer, ts.Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
        }
        function checkGrammarTopLevelElementForRequiredDeclareModifier(node) {
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
            if (node.kind === ts.SyntaxKind.InterfaceDeclaration || node.kind === ts.SyntaxKind.ImportDeclaration || node.kind === ts.SyntaxKind.ExportAssignment || (node.flags & ts.NodeFlags.Ambient)) {
                return false;
            }
            return grammarErrorOnFirstToken(node, ts.Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
        }
        function checkGrammarTopLevelElementsForRequiredDeclareModifier(file) {
            for (var i = 0, n = file.statements.length; i < n; i++) {
                var decl = file.statements[i];
                if (ts.isDeclaration(decl) || decl.kind === ts.SyntaxKind.VariableStatement) {
                    if (checkGrammarTopLevelElementForRequiredDeclareModifier(decl)) {
                        return true;
                    }
                }
            }
        }
        function checkGrammarSourceFile(node) {
            return ts.isInAmbientContext(node) && checkGrammarTopLevelElementsForRequiredDeclareModifier(node);
        }
        function checkGrammarForStatementInAmbientContext(node) {
            if (ts.isInAmbientContext(node)) {
                // An accessors is already reported about the ambient context
                if (isAccessor(node.parent.kind)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = true;
                }
                // Find containing block which is either Block, ModuleBlock, SourceFile
                var links = getNodeLinks(node);
                if (!links.hasReportedStatementInAmbientContext && ts.isAnyFunction(node.parent)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, ts.Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts);
                }
                // We are either parented by another statement, or some sort of block.
                // If we're in a block, we only want to really report an error once
                // to prevent noisyness.  So use a bit on the block to indicate if
                // this has already been reported, and don't report if it has.
                //
                if (node.parent.kind === ts.SyntaxKind.Block || node.parent.kind === ts.SyntaxKind.ModuleBlock || node.parent.kind === ts.SyntaxKind.SourceFile) {
                    var links = getNodeLinks(node.parent);
                    // Check if the containing block ever report this error
                    if (!links.hasReportedStatementInAmbientContext) {
                        return links.hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, ts.Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
                    }
                }
                else {
                }
            }
        }
        function checkGrammarNumbericLiteral(node) {
            // Grammar checking
            if (node.flags & ts.NodeFlags.OctalLiteral) {
                if (node.parserContextFlags & ts.ParserContextFlags.StrictMode) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Octal_literals_are_not_allowed_in_strict_mode);
                }
                else if (compilerOptions.target >= ts.ScriptTarget.ES5) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher);
                }
            }
        }
        function grammarErrorAfterFirstToken(node, message, arg0, arg1, arg2) {
            var sourceFile = ts.getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                var scanner = ts.createScanner(compilerOptions.target, true, sourceFile.text);
                scanToken(scanner, node.pos);
                diagnostics.push(ts.createFileDiagnostic(sourceFile, scanner.getTextPos(), 0, message, arg0, arg1, arg2));
                return true;
            }
        }
        initializeTypeChecker();
        return checker;
    }
    ts.createTypeChecker = createTypeChecker;
})(ts || (ts = {}));
