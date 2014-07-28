/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>
/// <reference path="binder.ts"/>
/// <reference path="emitter.ts"/>

module ts {

    var nextSymbolId = 1;
    var nextNodeId = 1;
    var nextMergeId = 1;

    export function createTypeChecker(program: Program): TypeChecker {

        var Symbol = objectAllocator.getSymbolConstructor();
        var Type = objectAllocator.getTypeConstructor();
        var Signature = objectAllocator.getSignatureConstructor();

        var typeCount = 0;

        var emptyArray: any[] = [];
        var emptySymbols: SymbolTable = {};

        var undefinedSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "undefined");
        var argumentsSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "arguments");
        var unknownSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "unknown");
        var resolvingSymbol = createSymbol(SymbolFlags.Transient, "__resolving__");

        var anyType = createIntrinsicType(TypeFlags.Any, "any");
        var stringType = createIntrinsicType(TypeFlags.String, "string");
        var numberType = createIntrinsicType(TypeFlags.Number, "number");
        var booleanType = createIntrinsicType(TypeFlags.Boolean, "boolean");
        var voidType = createIntrinsicType(TypeFlags.Void, "void");
        var undefinedType = createIntrinsicType(TypeFlags.Undefined, "undefined");
        var nullType = createIntrinsicType(TypeFlags.Null, "null");
        var unknownType = createIntrinsicType(TypeFlags.Any, "unknown");
        var resolvingType = createIntrinsicType(TypeFlags.Any, "__resolving__");

        var emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        var noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);

        var globals: SymbolTable = {};

        var globalObjectType: ObjectType;
        var globalFunctionType: ObjectType;
        var globalArrayType: ObjectType;
        var globalStringType: ObjectType;
        var globalNumberType: ObjectType;
        var globalBooleanType: ObjectType;
        var globalRegExpType: ObjectType;

        var stringLiteralTypes: Map<StringLiteralType> = {};

        var emitExtends = false;

        var mergedSymbols: Symbol[] = [];
        var symbolLinks: SymbolLinks[] = [];
        var nodeLinks: NodeLinks[] = [];
        var potentialThisCollisions: Node[] = [];

        var diagnostics: Diagnostic[] = [];
        var diagnosticsModified: boolean = false;

        var checker: TypeChecker;

        function addDiagnostic(diagnostic: Diagnostic) {
            diagnostics.push(diagnostic);
            diagnosticsModified = true;
        }

        function error(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            var diagnostic = location
                ? createDiagnosticForNode(location, message, arg0, arg1, arg2)
                : createCompilerDiagnostic(message, arg0, arg1, arg2);
            addDiagnostic(diagnostic);
        }

        function createSymbol(flags: SymbolFlags, name: string): Symbol {
            return new Symbol(flags, name);
        }

        function getExcludedSymbolFlags(flags: SymbolFlags): SymbolFlags {
            var result: SymbolFlags = 0;
            if (flags & SymbolFlags.Variable) result |= SymbolFlags.VariableExcludes;
            if (flags & SymbolFlags.Property) result |= SymbolFlags.PropertyExcludes;
            if (flags & SymbolFlags.EnumMember) result |= SymbolFlags.EnumMemberExcludes;
            if (flags & SymbolFlags.Function) result |= SymbolFlags.FunctionExcludes;
            if (flags & SymbolFlags.Class) result |= SymbolFlags.ClassExcludes;
            if (flags & SymbolFlags.Interface) result |= SymbolFlags.InterfaceExcludes;
            if (flags & SymbolFlags.Enum) result |= SymbolFlags.EnumExcludes;
            if (flags & SymbolFlags.ValueModule) result |= SymbolFlags.ValueModuleExcludes;
            if (flags & SymbolFlags.Method) result |= SymbolFlags.MethodExcludes;
            if (flags & SymbolFlags.GetAccessor) result |= SymbolFlags.GetAccessorExcludes;
            if (flags & SymbolFlags.SetAccessor) result |= SymbolFlags.SetAccessorExcludes;
            if (flags & SymbolFlags.TypeParameter) result |= SymbolFlags.TypeParameterExcludes;
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
            if (symbol.members) result.members = cloneSymbolTable(symbol.members);
            if (symbol.exports) result.exports = cloneSymbolTable(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }

        function extendSymbol(target: Symbol, source: Symbol) {
            if (!(target.flags & getExcludedSymbolFlags(source.flags))) {
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
                forEach(source.declarations, node => {
                    error(node.name ? node.name : node, Diagnostics.Duplicate_identifier_0, symbolToString(source));
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

        function resolveName(location: Node, name: string, meaning: SymbolFlags, nameNotFoundMessage: DiagnosticMessage, nameArg: string): Symbol {
            var errorLocation = location;
            var result: Symbol;
            var lastLocation: Node;

            var memberWithInitializerThatReferencesIdentifierFromConstructor: Node;

            function returnResolvedSymbol(s: Symbol) {
                // we've seen member with initializer that references identifier defined in constructor during the search.
                // if this was the only result with given name then just report default 'nameNotFound' message.
                // however if we met something else that was 'shadowed' by the identifier in constructor - report more specific error
                if (s && memberWithInitializerThatReferencesIdentifierFromConstructor) {
                    var propertyName = (<PropertyDeclaration>memberWithInitializerThatReferencesIdentifierFromConstructor).name;
                    error(errorLocation, Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor, identifierToString(propertyName), nameArg);
                    return undefined;
                }
                if (!s && nameNotFoundMessage) {
                    error(errorLocation, nameNotFoundMessage, nameArg);
                }
                return s;
            }

            while (location) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = getSymbol(location.locals, name, meaning)) {
                        return returnResolvedSymbol(result);
                    }
                }
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalModule(<SourceFile>location)) break;
                    case SyntaxKind.ModuleDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & SymbolFlags.ModuleMember)) {
                            return returnResolvedSymbol(result);
                        }
                        break;
                    case SyntaxKind.EnumDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & SymbolFlags.EnumMember)) {
                            return returnResolvedSymbol(result);
                        }
                        break;
                    case SyntaxKind.Property:
                        // TypeScript 1.0 spec (April 2014): 8.4.1
                        // Initializer expressions for instance member variables are evaluated in the scope 
                        // of the class constructor body but are not permitted to reference parameters or 
                        // local variables of the constructor.This effectively means that entities from outer scopes 
                        // by the same name as a constructor parameter or local variable are inaccessible 
                        // in initializer expressions for instance member variables.
                        if (location.parent.kind === SyntaxKind.ClassDeclaration && !(location.flags & NodeFlags.Static)) {
                            var ctor = findConstructorDeclaration(<ClassDeclaration>location.parent);
                            if (ctor && ctor.locals) {
                                if (getSymbol(ctor.locals, name, meaning & SymbolFlags.Value)) {
                                    // save the property node - later it will be used by 'returnResolvedSymbol' to report appropriate error
                                    memberWithInitializerThatReferencesIdentifierFromConstructor = location;
                                }
                            }
                        }
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        if (result = getSymbol(getSymbolOfNode(location).members, name, meaning & SymbolFlags.Type)) {
                            if (lastLocation && lastLocation.flags & NodeFlags.Static) {
                                // TypeScript 1.0 spec (April 2014): 3.4.1
                                // The scope of a type parameter extends over the entire declaration 
                                // with which the type parameter list is associated, with the exception of static member declarations in classes.
                                error(errorLocation, Diagnostics.Static_members_cannot_reference_class_type_parameters);
                                return undefined;
                            }
                            else {
                                return returnResolvedSymbol(result);
                            }
                        }                        
                        break;
                    case SyntaxKind.Method:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                        if (name === "arguments") {
                            return returnResolvedSymbol(argumentsSymbol);
                        }
                        break;
                    case SyntaxKind.FunctionExpression:
                        if (name === "arguments") {
                            return returnResolvedSymbol(argumentsSymbol);
                        }
                        var id = (<FunctionExpression>location).name;
                        if (id && name === id.text) {
                            return returnResolvedSymbol(location.symbol);
                        }
                        break;
                    case SyntaxKind.CatchBlock:
                        var id = (<CatchBlock>location).variable;
                        if (name === id.text) {
                            return returnResolvedSymbol((<CatchBlock>location).variable.symbol);
                        }
                        break;
                }
                lastLocation = location;
                location = location.parent;
            }
            if (result = getSymbol(globals, name, meaning)) {
                return returnResolvedSymbol(result);
            }

            return returnResolvedSymbol(undefined);
        }

        function resolveImport(symbol: Symbol): Symbol {
            Debug.assert((symbol.flags & SymbolFlags.Import) !== 0, "Should only get Imports here.");
            var links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                var node = <ImportDeclaration>getDeclarationOfKind(symbol, SyntaxKind.ImportDeclaration);
                var target = node.externalModuleName ?
                    resolveExternalModuleName(node, node.externalModuleName) :
                    resolveEntityName(node, node.entityName, node.entityName.kind === SyntaxKind.QualifiedName ?
                        SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace : SymbolFlags.Namespace);
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

        function getFullyQualifiedName(symbol: Symbol) {
            return symbol.parent ? getFullyQualifiedName(symbol.parent) + "." + symbolToString(symbol) : symbolToString(symbol);
        }

        // Resolves a qualified name and any involved import aliases
        function resolveEntityName(location: Node, name: EntityName, meaning: SymbolFlags): Symbol {
            if (name.kind === SyntaxKind.Identifier) {
                // TODO: Investigate error recovery for symbols not found
                var symbol = resolveName(location, (<Identifier>name).text, meaning, Diagnostics.Cannot_find_name_0, identifierToString(<Identifier>name));
                if (!symbol) {
                    return;
                }
            }
            else if (name.kind === SyntaxKind.QualifiedName) {
                var namespace = resolveEntityName(location, (<QualifiedName>name).left, SymbolFlags.Namespace);
                if (!namespace || namespace === unknownSymbol || (<QualifiedName>name).right.kind === SyntaxKind.Missing) return;
                var symbol = getSymbol(namespace.exports, (<QualifiedName>name).right.text, meaning);
                if (!symbol) {
                    error(location, Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(namespace),
                        identifierToString((<QualifiedName>name).right));
                    return;
                }
            }
            else {
                // Missing identifier
                return;
            }
            Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
            return symbol.flags & meaning ? symbol : resolveImport(symbol);
        }

        function isExternalModuleNameRelative(moduleName: string): boolean {
            // TypeScript 1.0 spec (April 2014): 11.2.1
            // An external module name is "relative" if the first term is "." or "..".
            return moduleName.substr(0, 2) === "./" || moduleName.substr(0, 3) === "../" || moduleName.substr(0, 2) === ".\\" || moduleName.substr(0, 3) === "..\\";
        }

        function resolveExternalModuleName(location: Node, moduleLiteral: LiteralExpression): Symbol {
            var searchPath = getDirectoryPath(getSourceFile(location).filename);
            var moduleName = moduleLiteral.text;
            if (!moduleName) return;
            var isRelative = isExternalModuleNameRelative(moduleName);
            if (!isRelative) {
                var symbol = getSymbol(globals, '"' + moduleName + '"', SymbolFlags.ValueModule);
                if (symbol) {
                    return getResolvedExportSymbol(symbol);
                }
            }
            while (true) {
                var filename = normalizePath(combinePaths(searchPath, moduleName));
                var sourceFile = program.getSourceFile(filename + ".ts") || program.getSourceFile(filename + ".d.ts");
                if (sourceFile || isRelative) break;
                var parentPath = getDirectoryPath(searchPath);
                if (parentPath === searchPath) break;
                searchPath = parentPath;
            }
            if (sourceFile) {
                if (sourceFile.symbol) {
                    return getResolvedExportSymbol(sourceFile.symbol);
                }
                error(moduleLiteral, Diagnostics.File_0_is_not_an_external_module, sourceFile.filename);
                return;
            }
            error(moduleLiteral, Diagnostics.Cannot_find_external_module_0, moduleName);
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
            return symbol.exportAssignSymbol === unknownSymbol ? undefined : symbol.exportAssignSymbol;
        }

        function checkTypeOfExportAssignmentSymbol(containerSymbol: Symbol): void {
            if (!containerSymbol.exportAssignSymbol) {
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
                        var exportSymbol = resolveName(node, node.exportName.text, meaning, Diagnostics.Cannot_find_name_0, identifierToString(node.exportName));
                    }
                }
                containerSymbol.exportAssignSymbol = exportSymbol || unknownSymbol;
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
            // If the symbol has the value flag, it is trivially a value.
            if (symbol.flags & SymbolFlags.Value) {
                return true;
            }

            // If it is an import, then it is a value if the symbol it resolves to is a value.
            if (symbol.flags & SymbolFlags.Import) {
                return (resolveImport(symbol).flags & SymbolFlags.Value) !== 0;
            }

            // If it is an instantiated symbol, then it is a value if hte symbol it is an 
            // instantiation of is a value.
            if (symbol.flags & SymbolFlags.Instantiated) {
                return (getSymbolLinks(symbol).target.flags & SymbolFlags.Value) !== 0;
            }

            return false;
        }

        function getDeclarationOfKind(symbol: Symbol, kind: SyntaxKind): Declaration {
            var declarations = symbol.declarations;
            for (var i = 0; i < declarations.length; i++) {
                var declaration = declarations[i];
                if (declaration.kind === kind) {
                    return declaration;
                }
            }

            return undefined;
        }

        function findConstructorDeclaration(node: ClassDeclaration): ConstructorDeclaration {
            var members = node.members;
            for (var i = 0; i < members.length; i++) {
                var member = members[i];
                if (member.kind === SyntaxKind.Constructor && (<ConstructorDeclaration>member).body) {
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

        function setObjectTypeMembers(type: ObjectType, members: SymbolTable, callSignatures: Signature[], constructSignatures: Signature[], stringIndexType: Type, numberIndexType: Type): ResolvedObjectType {
            (<ResolvedObjectType>type).members = members;
            (<ResolvedObjectType>type).properties = getNamedMembers(members);
            (<ResolvedObjectType>type).callSignatures = callSignatures;
            (<ResolvedObjectType>type).constructSignatures = constructSignatures;
            if (stringIndexType) (<ResolvedObjectType>type).stringIndexType = stringIndexType;
            if (numberIndexType) (<ResolvedObjectType>type).numberIndexType = numberIndexType;
            return <ResolvedObjectType>type;
        }

        function createAnonymousType(symbol: Symbol, members: SymbolTable, callSignatures: Signature[], constructSignatures: Signature[], stringIndexType: Type, numberIndexType: Type): ResolvedObjectType {
            return setObjectTypeMembers(createObjectType(TypeFlags.Anonymous, symbol),
                members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        // Takes a VariableDeclaration because it could be an exported var from a module (VariableDeclaration),
        // a class or object type property (PropertyDeclaration), or a parameter property (ParameterDeclaration)
        function isOptionalProperty(propertySymbol: Symbol): boolean {
            if (propertySymbol.flags & SymbolFlags.Prototype) {
                return false;
            }
            //  class C {
            //      constructor(public x?) { }
            //  }
            //
            // x is an optional parameter, but it is a required property.
            return (propertySymbol.valueDeclaration.flags & NodeFlags.QuestionMark) && propertySymbol.valueDeclaration.kind !== SyntaxKind.Parameter;
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

        function getAccessibleSymbol(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags) {
            function getAccessibleSymbolFromSymbolTable(symbols: SymbolTable) {
                function isAccessible(symbolFromSymbolTable: Symbol, resolvedAliasSymbol?: Symbol) {
                    if (symbol === (resolvedAliasSymbol || symbolFromSymbolTable)) {
                        // If the symbol is equivalent and doesnt need futher qualification, this symbol is accessible
                        if (!needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning)) {
                            return true;
                        }

                        // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                        var accessibleParent = getAccessibleSymbol(symbolFromSymbolTable.parent, enclosingDeclaration, SymbolFlags.Namespace);
                        return !!accessibleParent;
                    }
                }

                // If symbol is directly available by its name in the symbol table
                if (isAccessible(symbols[symbol.name])) {
                    return symbol;
                }

                // Check if symbol is any of the alias
                return forEachValue(symbols, symbolFromSymbolTable => {
                    if (symbolFromSymbolTable.flags & SymbolFlags.Import) {
                        if (isAccessible(symbolFromSymbolTable, resolveImport(symbolFromSymbolTable))) {
                            return symbolFromSymbolTable;
                        }
                    }
                });
            }

            if (symbol) {
                return forEachSymbolTableInScope(enclosingDeclaration, getAccessibleSymbolFromSymbolTable);
            }
        }

        function needsQualification(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags) {
            var qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, symbolTable => {
                // If symbol of this name is not available in the symbol table we are ok
                if (!symbolTable[symbol.name]) {
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

            return qualify
        }

        // Enclosing declaration is optional when we dont want to get qualified name in the enclosing declaration scope
        // Meaning needs to be specified if the enclosing declaration is given
        function symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
            function getSymbolName(symbol: Symbol) {
                if (symbol.declarations && symbol.declarations.length > 0) {
                    var declaration = symbol.declarations[0];
                    if (declaration.name) {
                        return identifierToString(declaration.name);
                    }
                }
                return symbol.name;
            }

            // Get qualified name 
            if (enclosingDeclaration &&
                // Properties/methods/Signatures/Constructors/TypeParameters do not need qualification
                !(symbol.flags & SymbolFlags.PropertyOrAccessor & SymbolFlags.Signature & SymbolFlags.Constructor & SymbolFlags.Method & SymbolFlags.TypeParameter)) {
                var symbolName: string;
                while (symbol) { 
                    var isFirstName = !symbolName;
                    var meaningToLook = isFirstName ? meaning : SymbolFlags.Namespace;
                    var accessibleSymbol = getAccessibleSymbol(symbol, enclosingDeclaration, meaningToLook);
                    symbolName = getSymbolName(accessibleSymbol || symbol) + (isFirstName ? "" : ("." + symbolName));
                    if (accessibleSymbol && !needsQualification(accessibleSymbol, enclosingDeclaration, meaningToLook)) {
                        break;
                    }
                    symbol = accessibleSymbol ? accessibleSymbol.parent : symbol.parent;
                }

                return symbolName;
            }

            return getSymbolName(symbol);
        }

        function createSingleLineTextWriter() {
            var result = "";
            return {
                write(s: string) { result += s; },
                writeLine() { result += " "; },
                increaseIndent() { },
                decreaseIndent() { },
                getText() { return result; }
            };
        }

        function typeToString(type: Type, flags?: TypeFormatFlags): string {
            var stringWriter = createSingleLineTextWriter();
            // TODO(shkamat): typeToString should take enclosingDeclaration as input, once we have implemented enclosingDeclaration
            writeTypeToTextWriter(type, /*enclosingDeclaration*/ null, flags, stringWriter);
            return stringWriter.getText();
        }

        function writeTypeToTextWriter(type: Type, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: TextWriter) {
            var typeStack: Type[];
            return writeType(type, /*allowFunctionOrConstructorTypeLiteral*/ true);

            function writeType(type: Type, allowFunctionOrConstructorTypeLiteral: boolean) {
                if (type.flags & TypeFlags.Intrinsic) {
                    writer.write((<IntrinsicType>type).intrinsicName);
                }
                else if (type.flags & TypeFlags.Reference) {
                    writeTypeReference(<TypeReference>type);
                }
                else if (type.flags & (TypeFlags.Class | TypeFlags.Interface | TypeFlags.Enum | TypeFlags.TypeParameter)) {
                    writer.write(symbolToString(type.symbol, enclosingDeclaration, SymbolFlags.Type));
                }
                else if (type.flags & TypeFlags.Anonymous) {
                    writeAnonymousType(<ObjectType>type, allowFunctionOrConstructorTypeLiteral);
                }
                else if (type.flags & TypeFlags.StringLiteral) {
                    writer.write((<StringLiteralType>type).text);
                }
                else {
                    // Should never get here
                    writer.write("{ ... }");
                }
            }

            function writeTypeReference(type: TypeReference) {
                if (type.target === globalArrayType && !(flags & TypeFormatFlags.WriteArrayAsGenericType)) {
                    // If we are writing array element type the arrow style signatures are not allowed as 
                    // we need to surround it by curlies, eg. { (): T; }[]; as () => T[] would mean something different
                    writeType(type.typeArguments[0], /*allowFunctionOrConstructorTypeLiteral*/ false);
                    writer.write("[]");
                }
                else {
                    writer.write(symbolToString(type.target.symbol, enclosingDeclaration, SymbolFlags.Type));
                    writer.write("<");
                    for (var i = 0; i < type.typeArguments.length; i++) {
                        if (i > 0) {
                            writer.write(", ");
                        }
                        writeType(type.typeArguments[i], /*allowFunctionOrConstructorTypeLiteral*/ true);
                    }
                    writer.write(">");
                }
            }

            function writeAnonymousType(type: ObjectType, allowFunctionOrConstructorTypeLiteral: boolean) {
                // Always use 'typeof T' for type of class, enum, and module objects
                if (type.symbol && type.symbol.flags & (SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule)) {
                    writeTypeofSymbol(type);
                }
                // Use 'typeof T' for types of functions and methods that circularly reference themselves
                // TODO(shkamat): correct the usuage of typeof function - always on functions that are visible
                else if (type.symbol && type.symbol.flags & (SymbolFlags.Function | SymbolFlags.Method) && typeStack && contains(typeStack, type)) {
                    writeTypeofSymbol(type);
                }
                else {
                    if (!typeStack) {
                        typeStack = [];
                    }
                    typeStack.push(type);
                    writeLiteralType(type, allowFunctionOrConstructorTypeLiteral);
                    typeStack.pop();
                }
            }

            function writeTypeofSymbol(type: ObjectType) {
                writer.write("typeof ");
                writer.write(symbolToString(type.symbol, enclosingDeclaration, SymbolFlags.Value));
            }

            function writeLiteralType(type: ObjectType, allowFunctionOrConstructorTypeLiteral: boolean) {
                var resolved = resolveObjectTypeMembers(type);
                if (!resolved.properties.length && !resolved.stringIndexType && !resolved.numberIndexType) {
                    if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                        writer.write("{}");
                        return;
                    }

                    if (allowFunctionOrConstructorTypeLiteral) {
                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            writeSignature(resolved.callSignatures[0], /*arrowStyle*/ true);
                            return;
                        }
                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            writer.write("new ");
                            writeSignature(resolved.constructSignatures[0], /*arrowStyle*/ true);
                            return;
                        }
                    }
                }

                writer.write("{");
                writer.writeLine();
                writer.increaseIndent();
                for (var i = 0; i < resolved.callSignatures.length; i++) {
                    writeSignature(resolved.callSignatures[i]);
                    writer.write(";");
                    writer.writeLine();
                }
                for (var i = 0; i < resolved.constructSignatures.length; i++) {
                    writer.write("new ");
                    writeSignature(resolved.constructSignatures[i]);
                    writer.write(";");
                    writer.writeLine();
                }
                if (resolved.stringIndexType) {
                    writer.write("[x: string]: ");
                    writeType(resolved.stringIndexType, /*allowFunctionOrConstructorTypeLiteral*/ true);
                    writer.write(";");
                    writer.writeLine();
                }
                if (resolved.numberIndexType) {
                    writer.write("[x: number]: ");
                    writeType(resolved.numberIndexType, /*allowFunctionOrConstructorTypeLiteral*/ true);
                    writer.write(";");
                    writer.writeLine();
                }
                for (var i = 0; i < resolved.properties.length; i++) {
                    var p = resolved.properties[i];
                    var t = getTypeOfSymbol(p);
                    if (p.flags & (SymbolFlags.Function | SymbolFlags.Method) && !getPropertiesOfType(t).length) {
                        var signatures = getSignaturesOfType(t, SignatureKind.Call);
                        for (var j = 0; j < signatures.length; j++) {
                            writer.write(symbolToString(p));
                            if (isOptionalProperty(p)) {
                                writer.write("?");
                            }
                            writeSignature(signatures[j]);
                            writer.write(";");
                            writer.writeLine();
                        }
                    }
                    else {
                        writer.write(symbolToString(p));
                        if (isOptionalProperty(p)) {
                            writer.write("?");
                        }
                        writer.write(": ");
                        writeType(t, /*allowFunctionOrConstructorTypeLiteral*/ true);
                        writer.write(";");
                        writer.writeLine();
                    }
                }
                writer.decreaseIndent();
                writer.write("}");
            }

            function writeSignature(signature: Signature, arrowStyle?: boolean) {
                if (signature.typeParameters) {
                    writer.write("<");
                    for (var i = 0; i < signature.typeParameters.length; i++) {
                        if (i > 0) {
                            writer.write(", ");
                        }
                        var tp = signature.typeParameters[i];
                        writer.write(symbolToString(tp.symbol));
                        var constraint = getConstraintOfTypeParameter(tp);
                        if (constraint) {
                            writer.write(" extends ");
                            writeType(constraint, /*allowFunctionOrConstructorTypeLiteral*/ true);
                        }
                    }
                    writer.write(">");
                }
                writer.write("(");
                for (var i = 0; i < signature.parameters.length; i++) {
                    if (i > 0) {
                        writer.write(", ");
                    }
                    var p = signature.parameters[i];
                    if (getDeclarationFlagsFromSymbol(p) & NodeFlags.Rest) {
                        writer.write("...");
                    }
                    writer.write(symbolToString(p));
                    if (p.valueDeclaration.flags & NodeFlags.QuestionMark || (<VariableDeclaration>p.valueDeclaration).initializer) {
                        writer.write("?");
                    }
                    writer.write(": ");
                    writeType(getTypeOfSymbol(p), /*allowFunctionOrConstructorTypeLiteral*/ true);
                }
                writer.write(arrowStyle ? ") => " : "): ");
                writeType(getReturnTypeOfSignature(signature), /*allowFunctionOrConstructorTypeLiteral*/ true);
            }
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
                    var symbolOfNode = getSymbolOfNode(node);
                    if (exportAssignmentSymbol === symbolOfNode) {
                        return true;
                    }

                    if (exportAssignmentSymbol && !!(exportAssignmentSymbol.flags & SymbolFlags.Import)) {
                        // if export assigned symbol is import declaration, resolve the import
                        var resolvedExportSymbol = resolveImport(exportAssignmentSymbol);
                        if (resolvedExportSymbol === symbolOfNode) {
                            return true;
                        }

                        // TODO(shkamat): Chained import assignment
                        // eg. a should be visible too.
                        //module m {
                        //    export module c {
                        //        export class c {
                        //        }
                        //    }
                        //}
                        //import a = m.c;
                        //import b = a;
                        //export = b;

                        // Container of resolvedExportSymbol is visible
                        return forEach(resolvedExportSymbol.declarations, declaration => {
                            while (declaration) {
                                if (declaration === node) {
                                    return true;
                                }
                                declaration = declaration.parent;
                            }
                        });
                    }
                }
            }

            function determineIfDeclarationIsVisible() {
                switch (node.kind) {
                    case SyntaxKind.VariableDeclaration:
                        if (!(node.flags & NodeFlags.Export)) {
                            // node.parent is variable statement so look at the variable statement's parent
                            return isGlobalSourceFile(node.parent.parent) || isUsedInExportAssignment(node);
                        }
                        // Exported members are visible if parent is visible
                        return isDeclarationVisible(node.parent.parent);

                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ImportDeclaration:
                        if (!(node.flags & NodeFlags.Export)) {
                            // TODO(shkamat): non exported aliases can be visible if they are referenced else where for value/type/namespace
                            return isGlobalSourceFile(node.parent) || isUsedInExportAssignment(node);
                        }
                        // Exported members are visible if parent is visible
                        return isDeclarationVisible(node.parent);

                    case SyntaxKind.Property:
                    case SyntaxKind.Method:
                        if (node.flags & NodeFlags.Private) {
                            // Private properties/methods are not visible
                            return false;
                        }
                    // Public properties/methods are visible if its parents are visible, so let it fall into next case statement

                    case SyntaxKind.Constructor:
                    case SyntaxKind.ConstructSignature:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.IndexSignature:
                    case SyntaxKind.Parameter:
                    case SyntaxKind.ModuleBlock:
                        return isDeclarationVisible(node.parent);

                    // Source file is always visible
                    case SyntaxKind.SourceFile:
                        return true;

                    default:
                        Debug.fail("isDeclarationVisible unknown: SyntaxKind: " + SyntaxKind[node.kind]);
                }
            }

            if (node) {
                var links = getNodeLinks(node);
                if (links.isVisible === undefined) {
                    links.isVisible = determineIfDeclarationIsVisible();
                }
                return links.isVisible;
            }
        }

        function getApparentType(type: Type): ApparentType {
            if (type.flags & TypeFlags.TypeParameter) {
                do {
                    type = getConstraintOfTypeParameter(<TypeParameter>type);
                } while (type && type.flags & TypeFlags.TypeParameter);
                if (!type) type = emptyObjectType;
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
            return <ApparentType>type;
        }

        function getTypeOfPrototypeProperty(prototype: Symbol): Type {
            // TypeScript 1.0 spec (April 2014): 8.4
            // Every class automatically contains a static property member named 'prototype', 
            // the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
            // It is an error to explicitly declare a static property member with the name 'prototype'.
            var classType = <InterfaceType>getDeclaredTypeOfSymbol(prototype.parent);
            return classType.typeParameters ? createTypeReference(<GenericType>classType, map(classType.typeParameters, _ => anyType)) : classType;
        }

        function getTypeOfVariableDeclaration(declaration: VariableDeclaration): Type {
            var type: Type;

            if (declaration.parent.kind === SyntaxKind.CatchBlock || declaration.parent.kind === SyntaxKind.ForInStatement) {
                type = anyType;
            }
            else if (declaration.type) {
                type = getTypeFromTypeNode(declaration.type);
            }
            else {
                // TypeScript 1.0 spec (April 2014):
                // If only one accessor includes a type annotation, the other behaves as if it had the same type annotation.
                // If neither accessor includes a type annotation, the inferred return type of the get accessor becomes the parameter type of the set accessor.
                if (declaration.kind === SyntaxKind.Parameter && declaration.parent.kind === SyntaxKind.SetAccessor) {
                    var getter = <AccessorDeclaration>getDeclarationOfKind(declaration.parent.symbol, SyntaxKind.GetAccessor);
                    if (getter) {
                        //getReturnTypeOfSignature will check both type annotation and return type inferred from body
                        type = getReturnTypeOfSignature(getSignatureFromDeclaration(getter));
                    }
                }

                var unwidenedType: Type;

                if (!type) {
                    if (declaration.initializer) {
                        unwidenedType = checkAndMarkExpression(declaration.initializer);
                        type = getWidenedType(unwidenedType);
                    }
                    else if (declaration.flags & NodeFlags.Rest) {
                        type = createArrayType(anyType);
                    }
                    else {
                        type = anyType;
                    }
                }

                if (program.getCompilerOptions().noImplicitAny && shouldReportNoImplicitAnyOnVariableOrParameterOrProperty(declaration, type, unwidenedType)) {
                    reportNoImplicitAnyOnVariableOrParameterOrProperty(declaration, type);
                }
            }

            return type;

            function shouldReportNoImplicitAnyOnVariableOrParameterOrProperty(declaration: VariableDeclaration, type: Type, unwidenedType: Type): boolean {
                // If we attempted to widen, the resulting type has to be a different.
                if (type === unwidenedType) {
                    return false;
                }

                // We need to have ended up with 'any', 'any[]', 'any[][]', etc.
                if (getInnermostTypeOfNestedArrayTypes(type) !== anyType) {
                    return false;
                }

                // Ignore privates within ambient contexts; they exist purely for documentative purposes to avoid name clashing.
                // (e.g. privates within .d.ts files do not expose type information)
                if (isPrivateWithinAmbient(declaration) || (declaration.kind === SyntaxKind.Parameter && isPrivateWithinAmbient(declaration.parent))) {
                    return false;
                }

                return true;
            }

            function reportNoImplicitAnyOnVariableOrParameterOrProperty(declaration: VariableDeclaration, type: Type): void {
                var varName = identifierToString(declaration.name);
                var typeName = typeToString(type);

                switch (declaration.kind) {
                    case SyntaxKind.VariableDeclaration:
                        error(declaration, Diagnostics.Variable_0_implicitly_has_an_1_type, varName, typeName)
                        break;

                    case SyntaxKind.Property:
                        error(declaration, Diagnostics.Member_0_implicitly_has_an_1_type, varName, typeName)
                        break;

                    case SyntaxKind.Parameter:
                        var funcDeclaration = <FunctionDeclaration>declaration.parent;

                        // If this is a rest parameter, we should have widened specifically to 'any[]'.
                        if (declaration.flags & NodeFlags.Rest) {
                            error(declaration, Diagnostics.Rest_parameter_0_implicitly_has_an_any_type, varName)
                        }
                        else {
                            error(declaration, Diagnostics.Parameter_0_implicitly_has_an_1_type, varName, typeName)
                        }

                        break;

                    default:
                        Debug.fail("Received a '" + SyntaxKind[declaration.kind] + "', but expected '" +
                            SyntaxKind[SyntaxKind.VariableDeclaration] + "', '" +
                            SyntaxKind[SyntaxKind.Property] + "', or '" +
                            SyntaxKind[SyntaxKind.Parameter] + "'.\r\n");
                }
            }

        }

        function getTypeOfVariableOrParameterOrProperty(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                if (symbol.flags & SymbolFlags.Prototype) {
                    links.type = getTypeOfPrototypeProperty(symbol);
                }
                else {
                    links.type = resolvingType;
                    var type = getTypeOfVariableDeclaration(<VariableDeclaration>symbol.valueDeclaration);
                    if (links.type === resolvingType) {
                        links.type = type;
                    }
                }
            }

            else if (links.type === resolvingType) {
                links.type = anyType;
            }

            return links.type;

        }

        function getSetAccessorTypeAnnotationNode(accessor: AccessorDeclaration): TypeNode {
            return accessor && accessor.parameters.length > 0  && accessor.parameters[0].type;
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
                        if (getter) {
                            type = getReturnTypeFromBody(getter);
                        }
                        // Otherwise, fall back to 'any'.
                        else {
                            if (program.getCompilerOptions().noImplicitAny) {
                                error(setter, Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation, symbol.name);
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
            }
        }

        function getTypeOfFuncClassEnumModule(symbol: Symbol): Type {
            var links = getSymbolLinks(symbol);
            if (!links.type) {
                var type = links.type = createObjectType(TypeFlags.Anonymous, symbol);
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
            if (symbol.flags & SymbolFlags.Instantiated) {
                return getTypeOfInstantiatedSymbol(symbol);
            }
            return unknownType;
        }

        function getTargetType(type: ObjectType): Type {
            return type.flags & TypeFlags.Reference ? (<TypeReference>type).target : type;
        }

        function hasBaseType(type: InterfaceType, checkBase: InterfaceType) {
            return check(type);
            function check(type: InterfaceType) {
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
                if (declaration.baseType) {
                    var baseType = getTypeFromTypeReferenceNode(declaration.baseType);
                    if (baseType !== unknownType) {
                        if (getTargetType(baseType).flags & TypeFlags.Class) {
                            if (type !== baseType && !hasBaseType(<InterfaceType>baseType, type)) {
                                type.baseTypes.push(baseType);
                            }
                            else {
                                error(declaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, TypeFormatFlags.WriteArrayAsGenericType));
                            }
                        }
                        else {
                            error(declaration.baseType, Diagnostics.A_class_may_only_extend_another_class);
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
                    if (declaration.kind === SyntaxKind.InterfaceDeclaration && (<InterfaceDeclaration>declaration).baseTypes) {
                        forEach((<InterfaceDeclaration>declaration).baseTypes, node => {
                            var baseType = getTypeFromTypeReferenceNode(node);
                            if (baseType !== unknownType) {
                                if (getTargetType(baseType).flags & (TypeFlags.Class | TypeFlags.Interface)) {
                                    if (type !== baseType && !hasBaseType(<InterfaceType>baseType, type)) {
                                        type.baseTypes.push(baseType);
                                    }
                                    else {
                                        error(declaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, TypeFormatFlags.WriteArrayAsGenericType));
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
            if (symbol.flags & SymbolFlags.Class) {
                return getDeclaredTypeOfClass(symbol);
            }
            if (symbol.flags & SymbolFlags.Interface) {
                return getDeclaredTypeOfInterface(symbol);
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
            Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0);
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
                    addInheritedMembers(members, getPropertiesOfType(baseType));
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
                addInheritedMembers(members, getPropertiesOfType(instantiatedBaseType));
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

        function resolveAnonymousTypeMembers(type: ObjectType) {
            var symbol = type.symbol;
            var members = emptySymbols;
            var callSignatures = emptyArray;
            var constructSignatures = emptyArray;
            if (symbol.flags & SymbolFlags.HasExports) {
                members = symbol.exports;
            }
            if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method)) {
                callSignatures = getSignaturesOfSymbol(symbol);
            }
            if (symbol.flags & SymbolFlags.Class) {
                var classType = getDeclaredTypeOfClass(symbol);
                constructSignatures = getSignaturesOfSymbol(symbol.members["__constructor"]);
                if (!constructSignatures.length) constructSignatures = getDefaultConstructSignatures(classType);
                if (classType.baseTypes.length) {
                    var members = createSymbolTable(getNamedMembers(members));
                    addInheritedMembers(members, getPropertiesOfType(getTypeOfSymbol(classType.baseTypes[0].symbol)));
                }
            }
            var numberIndexType = (symbol.flags & SymbolFlags.Enum) ? stringType : undefined;

            setObjectTypeMembers(type, members, callSignatures, constructSignatures, /* stringIndexType */ undefined, numberIndexType);
        }

        function resolveObjectTypeMembers(type: ObjectType): ResolvedObjectType {
            if (!(<ResolvedObjectType>type).members) {
                if (type.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                    resolveClassOrInterfaceMembers(<InterfaceType>type);
                }
                else if (type.flags & TypeFlags.Anonymous) {
                    resolveAnonymousTypeMembers(<ObjectType>type);
                }
                else {
                    resolveTypeReferenceMembers(<TypeReference>type);
                }
            }
            return <ResolvedObjectType>type;
        }

        function getPropertiesOfType(type: Type): Symbol[] {
            if (type.flags & TypeFlags.ObjectType) {
                return resolveObjectTypeMembers(<ObjectType>type).properties;
            }
            return emptyArray;
        }

        function getPropertyOfType(type: Type, name: string): Symbol {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectTypeMembers(<ObjectType>type);
                if (hasProperty(resolved.members, name)) {
                    var symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }
        }

        function getPropertyOfApparentType(type: ApparentType, name: string): Symbol {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectTypeMembers(<ObjectType>type);
                if (hasProperty(resolved.members, name)) {
                    var symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
                if (resolved === anyFunctionType || resolved.callSignatures.length || resolved.constructSignatures.length) {
                    var symbol = getPropertyOfType(globalFunctionType, name);
                    if (symbol) return symbol;
                }
                return getPropertyOfType(globalObjectType, name);
            }
        }

        function getSignaturesOfType(type: Type, kind: SignatureKind): Signature[] {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectTypeMembers(<ObjectType>type);
                return kind === SignatureKind.Call ? resolved.callSignatures : resolved.constructSignatures;
            }
            return emptyArray;
        }

        function getIndexTypeOfType(type: Type, kind: IndexKind): Type {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectTypeMembers(<ObjectType>type);
                return kind === IndexKind.String ? resolved.stringIndexType : resolved.numberIndexType;
            }
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
                        if (param.initializer || param.flags & (NodeFlags.QuestionMark | NodeFlags.Rest)) {
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
                    if (declaration.kind === SyntaxKind.GetAccessor) {
                        var setter = <AccessorDeclaration>getDeclarationOfKind(declaration.symbol, SyntaxKind.SetAccessor);
                        returnType = getAnnotatedAccessorType(setter);
                    }

                    if (!returnType && !(<FunctionDeclaration>declaration).body) {
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
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Method:
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
                        if (i > 0 && (<FunctionDeclaration>node).body) {
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
                else {
                    var type = getReturnTypeFromBody(<FunctionDeclaration>signature.declaration);
                }
                if (signature.resolvedReturnType === resolvingType) {
                    signature.resolvedReturnType = type;
                }
            }
            else if (signature.resolvedReturnType === resolvingType) {
                signature.resolvedReturnType = anyType;
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
                var type = <ResolvedObjectType>createObjectType(TypeFlags.Anonymous | TypeFlags.FromSignature);
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

        function createTypeReference(target: GenericType, typeArguments: Type[]): TypeReference {
            var id = getTypeListId(typeArguments);
            var type = target.instantiations[id];
            if (!type) {
                type = target.instantiations[id] = <TypeReference>createObjectType(TypeFlags.Reference, target.symbol);
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
                                type = createTypeReference(<GenericType>type, map(node.typeArguments, t => getTypeFromTypeNode(t)));
                            }
                            else {
                                error(node, Diagnostics.Generic_type_0_requires_1_type_argument_s, typeToString(type, TypeFormatFlags.WriteArrayAsGenericType), typeParameters.length);
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
                links.resolvedType = getWidenedType(checkExpression(node.exprName));
            }
            return links.resolvedType;
        }

        function getGlobalType(name: string, arity: number = 0): ObjectType {

            function getTypeDeclaration(symbol: Symbol): Declaration {
                var declarations = symbol.declarations;
                for (var i = 0; i < declarations.length; i++) {
                    var declaration = declarations[i];
                    switch (declaration.kind) {
                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.EnumDeclaration:
                        case SyntaxKind.TypeLiteral:
                        case SyntaxKind.FunctionDeclaration:
                            return declaration;
                    }
                }
            }

            var symbol = resolveName(undefined, name, SymbolFlags.Type, Diagnostics.Cannot_find_global_type_0, name);
            if (!symbol) {
                return emptyObjectType;
            }
            var type = getDeclaredTypeOfSymbol(symbol);
            if (!(type.flags & TypeFlags.ObjectType)) {
                error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_be_a_class_or_interface_type, name);
                return emptyObjectType;
            }
            if (((<InterfaceType>type).typeParameters ? (<InterfaceType>type).typeParameters.length : 0) !== arity) {
                error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_have_1_type_parameter_s, name, arity);
                return emptyObjectType;
            }
            return <ObjectType>type;
        }

        // arrayType argument is used as a backup in case if globalArrayType is not defined
        function createArrayType(elementType: Type, arrayType?: ObjectType): Type {
            var rootType = globalArrayType || arrayType;
            return rootType !== emptyObjectType ? createTypeReference(<GenericType>rootType, [elementType]) : emptyObjectType;
        }

        function getTypeFromArrayTypeNode(node: ArrayTypeNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                var arrayType = globalArrayType;
                if (!arrayType) {
                    // if user code contains augmentation for Array type that includes call\construct signatures with arrays as parameter\return types,
                    // then we might step here then during initialization of the global Array type when globalArrayType is not yet set.
                    // CODE: interface Array<T> { (): number[] }
                    // in this case just resolve name 'Array' again and get declared type of symbol.
                    // this type is the one that eventually should be set as 'globalArrayType'.
                    // NOTE: this is specific to signatures since got signatures we realize parameter\return types.
                    var arrayTypeSymbol = resolveName(node, "Array", SymbolFlags.Type, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined);
                    Debug.assert(arrayTypeSymbol);
                    arrayType = getDeclaredTypeOfSymbol(arrayTypeSymbol);
                    Debug.assert(arrayType);
                }
                links.resolvedType = createArrayType(getTypeFromTypeNode(node.elementType), arrayType);
            }
            return links.resolvedType;
        }

        function getTypeFromTypeLiteralNode(node: TypeLiteralNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                var symbol = node.symbol;
                var members = symbol.members;
                var callSignatures = getSignaturesOfSymbol(members["__call"]);
                var constructSignatures = getSignaturesOfSymbol(members["__new"]);
                var stringIndexType = getIndexTypeOfSymbol(symbol, IndexKind.String);
                var numberIndexType = getIndexTypeOfSymbol(symbol, IndexKind.Number);
                links.resolvedType = createAnonymousType(symbol, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
            }
            return links.resolvedType;
        }

        function getStringLiteralType(node: StringLiteralTypeNode): StringLiteralType {
            if (hasProperty(stringLiteralTypes, node.text)) return stringLiteralTypes[node.text];
            var type = stringLiteralTypes[node.text] = <StringLiteralType>createType(TypeFlags.StringLiteral);
            type.text = getSourceTextOfNode(node);
            return type;
        }

        function getTypeFromStringLiteral(node: StringLiteralTypeNode): Type {
            var links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getStringLiteralType(node);
            }
            return links.resolvedType;
        }

        function getTypeFromTypeNode(node: TypeNode): Type {
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
                    return getTypeFromStringLiteral(<StringLiteralTypeNode>node);
                case SyntaxKind.TypeReference:
                    return getTypeFromTypeReferenceNode(<TypeReferenceNode>node);
                case SyntaxKind.TypeQuery:
                    return getTypeFromTypeQueryNode(<TypeQueryNode>node);
                case SyntaxKind.ArrayType:
                    return getTypeFromArrayTypeNode(<ArrayTypeNode>node);
                case SyntaxKind.TypeLiteral:
                    return getTypeFromTypeLiteralNode(<TypeLiteralNode>node);
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
            var result = <TransientSymbol>createSymbol(SymbolFlags.Instantiated | SymbolFlags.Transient, symbol.name);
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
            var result = <ResolvedObjectType>createObjectType(TypeFlags.Anonymous, type.symbol);
            result.properties = instantiateList(getPropertiesOfType(type), mapper, instantiateSymbol);
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
            return type;
        }

        // Returns true if the given expression contains (at any level of nesting) a function or arrow expression
        // that is subject to contextual typing.
        function isContextSensitiveExpression(node: Expression): boolean {
            switch (node.kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return !(<FunctionExpression>node).typeParameters && !forEach((<FunctionExpression>node).parameters, p => p.type);
                case SyntaxKind.ObjectLiteral:
                    return forEach((<ObjectLiteral>node).properties, p =>
                        p.kind === SyntaxKind.PropertyAssignment && isContextSensitiveExpression((<PropertyDeclaration>p).initializer));
                case SyntaxKind.ArrayLiteral:
                    return forEach((<ArrayLiteral>node).elements, e => isContextSensitiveExpression(e));
                case SyntaxKind.ConditionalExpression:
                    return isContextSensitiveExpression((<ConditionalExpression>node).whenTrue) ||
                        isContextSensitiveExpression((<ConditionalExpression>node).whenFalse);
                case SyntaxKind.BinaryExpression:
                    return (<BinaryExpression>node).operator === SyntaxKind.BarBarToken &&
                        (isContextSensitiveExpression((<BinaryExpression>node).left) || isContextSensitiveExpression((<BinaryExpression>node).right));
            }
            return false;
        }

        function getTypeWithoutConstructors(type: Type): Type {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectTypeMembers(<ObjectType>type);
                if (resolved.constructSignatures.length) {
                    var result = <ResolvedObjectType>createObjectType(TypeFlags.Anonymous, type.symbol);
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

        var subtypeRelation: Map<boolean> = {};
        var assignableRelation: Map<boolean> = {};
        var identityRelation: Map<boolean> = {};

        function isTypeIdenticalTo(source: Type, target: Type): boolean {
            return checkTypeRelatedTo(source, target, identityRelation, /*errorNode*/ undefined, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
        }

        function isTypeSubtypeOf(source: Type, target: Type): boolean {
            return checkTypeSubtypeOf(source, target, /*errorNode*/ undefined, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
        }

        function checkTypeSubtypeOf(source: Type, target: Type, errorNode: Node, chainedMessage: DiagnosticMessage, terminalMessage: DiagnosticMessage): boolean {
            return checkTypeRelatedTo(source, target, subtypeRelation, errorNode, chainedMessage, terminalMessage);
        }

        function isTypeAssignableTo(source: Type, target: Type): boolean {
            return checkTypeAssignableTo(source, target, /*errorNode*/ undefined, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
        }

        function checkTypeAssignableTo(source: Type, target: Type, errorNode: Node, chainedMessage: DiagnosticMessage, terminalMessage: DiagnosticMessage): boolean {
            return checkTypeRelatedTo(source, target, assignableRelation, errorNode, chainedMessage, terminalMessage);
        }

        function isTypeRelatedTo(source: Type, target: Type, relation: Map<boolean>): boolean {
            return checkTypeRelatedTo(source, target, relation, /*errorNode*/ undefined, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
        }

        function isSignatureAssignableTo(source: Signature, target: Signature): boolean {
            var sourceType = getOrCreateTypeFromSignature(source);
            var targetType = getOrCreateTypeFromSignature(target);
            return checkTypeRelatedTo(sourceType, targetType, assignableRelation, /*errorNode*/ undefined, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
        }

        function isPropertyIdenticalTo(sourceProp: Symbol, targetProp: Symbol): boolean {
            return isPropertyIdenticalToRecursive(sourceProp, targetProp, /*reportErrors*/ false, (s, t, _reportErrors) => isTypeIdenticalTo(s, t));
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
                var properties = getPropertiesOfType(base);
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
                            errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2_Colon, typeToString(type), typeName1, typeName2);
                            addDiagnostic(createDiagnosticForNodeFromMessageChain(typeNode, errorInfo));
                        }
                    }
                }
            }

            return ok;
        }

        function isPropertyIdenticalToRecursive(sourceProp: Symbol, targetProp: Symbol, reportErrors: boolean, relate: (source: Type, target: Type, reportErrors: boolean) => boolean): boolean {
            Debug.assert(sourceProp);
            if (!targetProp) {
                return false;
            }

            // Two members are considered identical when
            // - they are public properties with identical names, optionality, and types,
            // - they are private properties originating in the same declaration and having identical types
            var sourcePropIsPrivate = getDeclarationFlagsFromSymbol(sourceProp) & NodeFlags.Private;
            var targetPropIsPrivate = getDeclarationFlagsFromSymbol(targetProp) & NodeFlags.Private;
            if (sourcePropIsPrivate !== targetPropIsPrivate) {
                return false;
            }

            if (sourcePropIsPrivate) {
                return (getTargetSymbol(sourceProp).parent === getTargetSymbol(targetProp).parent) && relate(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
            }
            else {
                return isOptionalProperty(sourceProp) === isOptionalProperty(targetProp) && relate(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
            }
        }

        function checkTypeRelatedTo(source: Type, target: Type, relation: Map<boolean>, errorNode: Node, chainedMessage: DiagnosticMessage, terminalMessage: DiagnosticMessage): boolean {
            var errorInfo: DiagnosticMessageChain;
            var sourceStack: ObjectType[];
            var targetStack: ObjectType[];
            var expandingFlags: number;
            var depth = 0;
            var overflow = false;

            Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");

            var result = isRelatedToWithCustomErrors(source, target, errorNode !== undefined, chainedMessage, terminalMessage);
            if (overflow) {
                error(errorNode, Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
            }
            else if (errorInfo) {
                addDiagnostic(createDiagnosticForNodeFromMessageChain(errorNode, errorInfo));
            }
            return result;

            function reportError(message: DiagnosticMessage, arg0?: string, arg1?: string): void {
                errorInfo = chainDiagnosticMessages(errorInfo, message, arg0, arg1);
            }

            function isRelatedTo(source: Type, target: Type, reportErrors: boolean): boolean {
                return isRelatedToWithCustomErrors(source, target, reportErrors, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
            }

            function isRelatedToWithCustomErrors(source: Type, target: Type, reportErrors: boolean, chainedMessage: DiagnosticMessage, terminalMessage: DiagnosticMessage): boolean {
                if (relation === identityRelation) {
                    // both types are the same - covers 'they are the same primitive type or both are Any' or the same type parameter cases
                    if (source === target) return true;
                }
                else {
                    if (source === target) return true;
                    if (target.flags & TypeFlags.Any) return true;
                    if (source === undefinedType) return true;
                    if (source === nullType && target !== undefinedType) return true;
                    if (source.flags & TypeFlags.Enum && target === numberType) return true;
                    if (source.flags & TypeFlags.StringLiteral && target === stringType) return true;
                    if (relation === assignableRelation) {
                        if (source.flags & TypeFlags.Any) return true;
                        if (source === numberType && target.flags & TypeFlags.Enum) return true;
                    }
                }

                if (source.flags & TypeFlags.TypeParameter && target.flags & TypeFlags.TypeParameter) {
                    if (typeParameterRelatedTo(<TypeParameter>source, <TypeParameter>target, reportErrors)) {
                        return true;
                    }
                }
                else {
                    var saveErrorInfo = errorInfo;
                    if (source.flags & TypeFlags.Reference && target.flags & TypeFlags.Reference && (<TypeReference>source).target === (<TypeReference>target).target) {
                        // We have type references to same target type, see if relationship holds for all type arguments
                        if (typesRelatedTo((<TypeReference>source).typeArguments, (<TypeReference>target).typeArguments, reportErrors)) {
                            return true;
                        }
                    }
                    // Even if relationship doesn't hold for type arguments, it may hold in a structural comparison
                    // Report structural errors only if we haven't reported any errors yet
                    var reportStructuralErrors = reportErrors && errorInfo === saveErrorInfo;
                    // identity relation does not use apparent type
                    var sourceOrApparentType =  relation === identityRelation ? source : getApparentType(source);
                    if (sourceOrApparentType.flags & TypeFlags.ObjectType && target.flags & TypeFlags.ObjectType &&
                        objectTypeRelatedTo(sourceOrApparentType, <ObjectType>target, reportStructuralErrors)) {
                        errorInfo = saveErrorInfo;
                        return true;
                    }
                }
                if (reportErrors) {
                    // The error should end in a period when this is the deepest error in the chain
                    // (when errorInfo is undefined). Otherwise, it has a colon before the nested
                    // error.

                    chainedMessage = chainedMessage || Diagnostics.Type_0_is_not_assignable_to_type_1_Colon;
                    terminalMessage = terminalMessage || Diagnostics.Type_0_is_not_assignable_to_type_1;
                    var diagnosticKey = errorInfo ? chainedMessage : terminalMessage;
                    Debug.assert(diagnosticKey);
                    reportError(diagnosticKey, typeToString(source), typeToString(target));
                }
                return false;
            }

            function typesRelatedTo(sources: Type[], targets: Type[], reportErrors: boolean): boolean {
                for (var i = 0, len = sources.length; i < len; i++) {
                    if (!isRelatedTo(sources[i], targets[i], reportErrors)) return false;
                }
                return true;
            }

            function typeParameterRelatedTo(source: TypeParameter, target: TypeParameter, reportErrors: boolean): boolean {
                if (relation === identityRelation) {
                    if (source.symbol.name !== target.symbol.name) {
                        return false;
                    }

                    // covers case when both type parameters does not have constraint (both equal to noConstraintType)
                    if (source.constraint === target.constraint) {
                        return true;
                    }

                    if (source.constraint === noConstraintType || target.constraint === noConstraintType) {
                        return false;
                    }

                    return isRelatedTo(source.constraint, target.constraint, reportErrors);
                }
                else {
                    while (true) {
                        var constraint = getConstraintOfTypeParameter(source);
                        if (constraint === target) return true;
                        if (!(constraint && constraint.flags & TypeFlags.TypeParameter)) break;
                        source = <TypeParameter>constraint;
                    }
                    return false;
                }
            }

            // Determine if two object types are related by structure. First, check if the result is already available in the global cache.
            // Second, check if we have already started a comparison of the given two types in which case we assume the result to be true.
            // Third, check if both types are part of deeply nested chains of generic type instantiations and if so assume the types are
            // equal and infinitely expanding. Fourth, if we have reached a depth of 100 nested comparisons, assume we have runaway recursion
            // and issue an error. Otherwise, actually compare the structure of the two types.
            function objectTypeRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): boolean {
                if (overflow) return false;
                var result: boolean;
                var id = source.id + "," + target.id;
                if ((result = relation[id]) !== undefined) return result;
                if (depth > 0) {
                    for (var i = 0; i < depth; i++) {
                        if (source === sourceStack[i] && target === targetStack[i]) return true;
                    }
                    if (depth === 100) {
                        overflow = true;
                        return false;
                    }
                }
                else {
                    sourceStack = [];
                    targetStack = [];
                    expandingFlags = 0;
                }
                sourceStack[depth] = source;
                targetStack[depth] = target;
                depth++;
                var saveExpandingFlags = expandingFlags;
                if (!(expandingFlags & 1) && isDeeplyNestedGeneric(source, sourceStack)) expandingFlags |= 1;
                if (!(expandingFlags & 2) && isDeeplyNestedGeneric(target, targetStack)) expandingFlags |= 2;
                result = expandingFlags === 3 ||
                    propertiesRelatedTo(source, target, reportErrors) &&
                    signaturesRelatedTo(source, target, SignatureKind.Call, reportErrors) &&
                    signaturesRelatedTo(source, target, SignatureKind.Construct, reportErrors) &&
                    stringIndexTypesRelatedTo(source, target, reportErrors) &&
                    numberIndexTypesRelatedTo(source, target, reportErrors);
                expandingFlags = saveExpandingFlags;
                depth--;
                if (depth === 0) {
                    relation[id] = result;
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

            function propertiesRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): boolean {
                if (relation === identityRelation) {
                    return propertiesAreIdenticalTo(source, target, reportErrors);
                }
                else {
                    return propertiesAreSubtypeOrAssignableTo(<ApparentType>source, target, reportErrors);
                }
            }

            function propertiesAreIdenticalTo(source: ObjectType, target: ObjectType, reportErrors: boolean): boolean {
                if (source === target) {
                    return true;
                }

                var sourceProperties = getPropertiesOfType(source);
                var targetProperties = getPropertiesOfType(target);
                if (sourceProperties.length !== targetProperties.length) {
                    return false;
                }

                for (var i = 0, len = sourceProperties.length; i < len; ++i) {
                    var sourceProp = sourceProperties[i];
                    var targetProp = getPropertyOfType(target, sourceProp.name);

                    if (!isPropertyIdenticalToRecursive(sourceProp, targetProp, reportErrors, isRelatedTo)) {
                        return false;
                    }
                }

                return true;
            }

            function propertiesAreSubtypeOrAssignableTo(source: ApparentType, target: ObjectType, reportErrors: boolean): boolean {
                var properties = getPropertiesOfType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfApparentType(source, targetProp.name);
                    if (sourceProp === targetProp) {
                        continue;
                    }

                    var targetPropIsOptional = isOptionalProperty(targetProp);
                    if (!sourceProp) {
                        if (!targetPropIsOptional) {
                            if (reportErrors) {
                                reportError(Diagnostics.Property_0_is_missing_in_type_1, symbolToString(targetProp), typeToString(source));
                            }
                            return false;
                        }
                    }
                    else if (sourceProp !== targetProp) {
                        if (targetProp.flags & SymbolFlags.Prototype) {
                            continue;
                        }

                        if (getDeclarationFlagsFromSymbol(sourceProp) & NodeFlags.Private || getDeclarationFlagsFromSymbol(targetProp) & NodeFlags.Private) {
                            if (reportErrors) {
                                reportError(Diagnostics.Private_property_0_cannot_be_reimplemented, symbolToString(targetProp));
                            }
                            return false;
                        }
                        if (!isRelatedTo(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors)) {
                            if (reportErrors) {
                                reportError(Diagnostics.Types_of_property_0_are_incompatible_Colon, symbolToString(targetProp));
                            }
                            return false;
                        }
                        else if (isOptionalProperty(sourceProp) && !targetPropIsOptional) {
                            // TypeScript 1.0 spec (April 2014): 3.8.3
                            // S is a subtype of a type T, and T is a supertype of S if ...
                            // S' and T are object types and, for each member M in T..
                            // M is a property and S' contains a property N where
                            // if M is a required property, N is also a required property 
                            // (M - property in T)
                            // (N - property in S)
                            if (reportErrors) {
                                reportError(Diagnostics.Required_property_0_cannot_be_reimplemented_with_optional_property_in_1, targetProp.name, typeToString(source));
                            }
                            return false;
                        }
                    }
                }
                return true;
            }

            function signaturesRelatedTo(source: ObjectType, target: ObjectType, kind: SignatureKind, reportErrors: boolean): boolean {
                if (relation === identityRelation) {
                    return areSignaturesIdenticalTo(source, target, kind, reportErrors);
                }
                else {
                    return areSignaturesSubtypeOrAssignableTo(source, target, kind, reportErrors);
                }
            }

            function areSignaturesIdenticalTo(source: ObjectType, target: ObjectType, kind: SignatureKind, reportErrors: boolean): boolean {
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                if (sourceSignatures.length !== targetSignatures.length) {
                    return false;
                }

                for (var i = 0, len = sourceSignatures.length; i < len; ++i) {
                    if (!isSignatureIdenticalTo(sourceSignatures[i], targetSignatures[i], reportErrors)) {
                        return false;
                    }
                }

                return true;
            }

            function isSignatureIdenticalTo(source: Signature, target: Signature, reportErrors: boolean): boolean {
                if (source === target) {
                    return true;
                }

                if (source.hasRestParameter !== target.hasRestParameter) {
                    return false;
                }

                if (source.parameters.length !== target.parameters.length) {
                    return false;
                }

                if (source.minArgumentCount !== target.minArgumentCount) {
                    return false;
                }

                if (source.typeParameters && target.typeParameters) {
                    if (source.typeParameters.length !== target.typeParameters.length) {
                        return false;
                    }

                    for (var i = 0, len = source.typeParameters.length; i < len; ++i) {
                        if (!isRelatedTo(source.typeParameters[i], target.typeParameters[i], reportErrors)) {
                            return false;
                        }
                    }
                }
                else if (source.typeParameters || source.typeParameters) {
                    return false;
                }

                // Spec 1.0 Section 3.8.3 & 3.8.4:
                // M and N (the signatures) are instantiated using type Any as the type argument for all type parameters declared by M and N
                source = getErasedSignature(source);
                target = getErasedSignature(target);
                for (var i = 0, len = source.parameters.length; i < len; i++) {
                    var s = source.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(source) : getTypeOfSymbol(source.parameters[i]);
                    var t = target.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(target) : getTypeOfSymbol(target.parameters[i]);
                    if (!isRelatedTo(s, t, reportErrors)) {
                        return false;
                    }
                }
                var t = getReturnTypeOfSignature(target);
                var s = getReturnTypeOfSignature(source);
                return isRelatedTo(s, t, reportErrors);
            }

            function areSignaturesSubtypeOrAssignableTo(source: ObjectType, target: ObjectType, kind: SignatureKind, reportErrors: boolean): boolean {
                if (target === anyFunctionType || source === anyFunctionType) return true;
                var sourceSignatures = getSignaturesOfType(source, kind);
                var targetSignatures = getSignaturesOfType(target, kind);
                var saveErrorInfo = errorInfo;
                outer: for (var i = 0; i < targetSignatures.length; i++) {
                    var t = targetSignatures[i];
                    if (!t.hasStringLiterals || target.flags & TypeFlags.FromSignature) {
                        var localErrors = reportErrors;
                        for (var j = 0; j < sourceSignatures.length; j++) {
                            var s = sourceSignatures[j];
                            if (!s.hasStringLiterals || source.flags & TypeFlags.FromSignature) {
                                if (isSignatureSubtypeOrAssignableTo(s, t, localErrors)) {
                                    errorInfo = saveErrorInfo;
                                    continue outer;
                                }
                                // Only report errors from the first failure
                                localErrors = false;
                            }
                        }
                        return false;
                    }
                }
                return true;
            }

            function isSignatureSubtypeOrAssignableTo(source: Signature, target: Signature, reportErrors: boolean): boolean {
                if (source === target) {
                    return true;
                }

                if (!target.hasRestParameter && source.minArgumentCount > target.parameters.length) {
                    return false;
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
                for (var i = 0; i < checkCount; i++) {
                    var s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                    var t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                    var saveErrorInfo = errorInfo;
                    if (!isRelatedTo(s, t, reportErrors)) {
                        if (!isRelatedTo(t, s, false)) {
                            if (reportErrors) {
                                reportError(Diagnostics.Types_of_parameters_0_and_1_are_incompatible_Colon,
                                    source.parameters[i < sourceMax ? i : sourceMax].name,
                                    target.parameters[i < targetMax ? i : targetMax].name);
                            }
                            return false;
                        }
                        errorInfo = saveErrorInfo;
                    }
                }
                var t = getReturnTypeOfSignature(target);
                if (t === voidType) return true;
                var s = getReturnTypeOfSignature(source);
                return isRelatedTo(s, t, reportErrors);
            }

            function stringIndexTypesRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): boolean {
                if (relation === identityRelation) {
                    return areIndexTypesIdenticalTo(IndexKind.String, source, target, reportErrors);
                }
                else {
                    var targetType = getIndexTypeOfType(target, IndexKind.String);
                    if (targetType) {
                        var sourceType = getIndexTypeOfType(source, IndexKind.String);
                        if (!sourceType) {
                            if (reportErrors) {
                                reportError(Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                            }
                            return false;
                        }
                        if (!isRelatedTo(sourceType, targetType, reportErrors)) {
                            if (reportErrors) {
                                reportError(Diagnostics.Index_signatures_are_incompatible_Colon);
                            }
                            return false;
                        }
                    }
                    return true;
                }
            } 

            function numberIndexTypesRelatedTo(source: ObjectType, target: ObjectType, reportErrors: boolean): boolean {
                if (relation === identityRelation) {
                    return areIndexTypesIdenticalTo(IndexKind.Number, source, target, reportErrors);
                }
                else {
                    var targetType = getIndexTypeOfType(target, IndexKind.Number);
                    if (targetType) {
                        var sourceStringType = getIndexTypeOfType(source, IndexKind.String);
                        var sourceNumberType = getIndexTypeOfType(source, IndexKind.Number);
                        if (!(sourceStringType || sourceNumberType)) {
                            if (reportErrors) {
                                reportError(Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                            }
                            return false;
                        }
                        if (sourceStringType && sourceNumberType) {
                            // If we know for sure we're testing both string and numeric index types then only report errors from the second one
                            var compatible = isRelatedTo(sourceStringType, targetType, false) || isRelatedTo(sourceNumberType, targetType, reportErrors);
                        }
                        else {
                            var compatible = isRelatedTo(sourceStringType || sourceNumberType, targetType, reportErrors);
                        }
                        if (!compatible) {
                            if (reportErrors) {
                                reportError(Diagnostics.Index_signatures_are_incompatible_Colon);
                            }
                            return false;
                        }
                    }
                    return true;
                }
            }

            function areIndexTypesIdenticalTo(indexKind: IndexKind, source: ObjectType, target: ObjectType, reportErrors: boolean): boolean {
                var targetType = getIndexTypeOfType(target, indexKind);
                var sourceType = getIndexTypeOfType(source, indexKind);
                return (!sourceType && !targetType) || (sourceType && targetType && isRelatedTo(sourceType, targetType, reportErrors));
            }
        }

        function isSupertypeOfEach(candidate: Type, types: Type[]): boolean {
            for (var i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && !isTypeSubtypeOf(types[i], candidate)) return false;
            }
            return true;
        }

        function getBestCommonType(types: Type[], contextualType?: Type, candidatesOnly?: boolean): Type {
            if (contextualType && isSupertypeOfEach(contextualType, types)) return contextualType;
            return forEach(types, t => isSupertypeOfEach(t, types) ? t : undefined) || (candidatesOnly ? undefined : emptyObjectType);
        }

        function isTypeOfObjectLiteral(type: Type): boolean {
            return (type.flags & TypeFlags.Anonymous) && type.symbol && (type.symbol.flags & SymbolFlags.ObjectLiteral) ? true : false;
        }

        function getWidenedTypeOfObjectLiteral(type: Type): Type {
            var properties = getPropertiesOfType(type);
            if (properties.length) {
                var widenedTypes: Type[] = [];
                var propTypeWasWidened: boolean = false;
                forEach(properties, p => {
                    var propType = getTypeOfSymbol(p);
                    var widenedType = getWidenedType(propType);
                    if (propType !== widenedType) {
                        propTypeWasWidened = true;

                        if (program.getCompilerOptions().noImplicitAny && getInnermostTypeOfNestedArrayTypes(widenedType) === anyType) {
                            error(p.valueDeclaration, Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, p.name, typeToString(widenedType));
                        }
                    }
                    widenedTypes.push(widenedType);
                });
                if (propTypeWasWidened) {
                    var members: SymbolTable = {};
                    var index = 0;
                    forEach(properties, p => {
                        var symbol = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient, p.name);
                        symbol.declarations = p.declarations;
                        symbol.parent = p.parent;
                        symbol.type = widenedTypes[index++];
                        if (p.valueDeclaration) symbol.valueDeclaration = p.valueDeclaration;
                        members[symbol.name] = symbol;
                    });
                    var stringIndexType = getIndexTypeOfType(type, IndexKind.String);
                    var numberIndexType = getIndexTypeOfType(type, IndexKind.Number);
                    if (stringIndexType) stringIndexType = getWidenedType(stringIndexType);
                    if (numberIndexType) numberIndexType = getWidenedType(numberIndexType);
                    type = createAnonymousType(type.symbol, members, emptyArray, emptyArray, stringIndexType, numberIndexType);
                }
            }
            return type;
        }

        function isArrayType(type: Type): boolean {
            return type.flags & TypeFlags.Reference && (<TypeReference>type).target === globalArrayType;
        }

        function getInnermostTypeOfNestedArrayTypes(type: Type): Type {
            while (isArrayType(type)) {
                type = (<GenericType>type).typeArguments[0];
            }

            return type;
        }

        function getWidenedTypeOfArrayLiteral(type: Type): Type {
            var elementType = (<TypeReference>type).typeArguments[0];
            var widenedType = getWidenedType(elementType);

            type = elementType !== widenedType ? createArrayType(widenedType) : type;

            return type;
        }

        /* If we are widening on a literal, then we may need to the 'node' parameter for reporting purposes */
        function getWidenedType(type: Type): Type {
            if (type.flags & (TypeFlags.Undefined | TypeFlags.Null)) {
                return anyType;
            }
            if (isTypeOfObjectLiteral(type)) {
                return getWidenedTypeOfObjectLiteral(type);
            }
            if (isArrayType(type)) {
                return getWidenedTypeOfArrayLiteral(type);
            }
            return type;
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

        function createInferenceContext(typeParameters: TypeParameter[]): InferenceContext {
            var inferences: Type[][] = [];
            for (var i = 0; i < typeParameters.length; i++) inferences.push([]);
            return {
                typeParameters: typeParameters,
                inferences: inferences,
                inferredTypes: new Array(typeParameters.length)
            };
        }

        function inferTypes(context: InferenceContext, source: Type, target: Type) {
            var sourceStack: Type[];
            var targetStack: Type[];
            var depth = 0;
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
                if (target.flags & TypeFlags.TypeParameter) {
                    // If target is a type parameter, make an inference
                    var typeParameters = context.typeParameters;
                    for (var i = 0; i < typeParameters.length; i++) {
                        if (target === typeParameters[i]) {
                            var inferences = context.inferences[i];
                            if (!contains(inferences, source)) inferences.push(source);
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
                else if (source.flags & TypeFlags.ObjectType && (target.flags & TypeFlags.Reference || (target.flags & TypeFlags.Anonymous) &&
                    target.symbol && target.symbol.flags & (SymbolFlags.Method | SymbolFlags.TypeLiteral))) {
                    // If source is an object type, and target is a type reference, the type of a method, or a type literal, infer from members
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
                var properties = getPropertiesOfType(target);
                for (var i = 0; i < properties.length; i++) {
                    var targetProp = properties[i];
                    var sourceProp = getPropertyOfType(source, targetProp.name);
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

        function getInferredType(context: InferenceContext, index: number): Type {
            var result = context.inferredTypes[index];
            if (!result) {
                var commonType = getWidenedType(getBestCommonType(context.inferences[index]));
                var constraint = getConstraintOfTypeParameter(context.typeParameters[index]);
                var result = constraint && !isTypeAssignableTo(commonType, constraint) ? constraint : commonType;
                context.inferredTypes[index] = result;
            }
            return result;
        }

        function getInferredTypes(context: InferenceContext): Type[] {
            for (var i = 0; i < context.inferredTypes.length; i++) {
                getInferredType(context, i);
            }
            context.inferences = undefined;
            return context.inferredTypes;
        }

        function hasAncestor(node: Node, kind: SyntaxKind): boolean {
            return getAncestor(node, kind) !== undefined;
        }

        function getAncestor(node: Node, kind: SyntaxKind): Node {
            switch (kind) {
                // special-cases that can be come first
                case SyntaxKind.ClassDeclaration:
                    while (node) {
                        switch (node.kind) {
                            case SyntaxKind.ClassDeclaration:
                                return <ClassDeclaration>node;
                            case SyntaxKind.EnumDeclaration:
                            case SyntaxKind.InterfaceDeclaration:
                            case SyntaxKind.ModuleDeclaration:
                            case SyntaxKind.ImportDeclaration:
                                // early exit cases - declarations cannot be nested in classes
                                return undefined;
                            default:
                                node = node.parent;
                                continue;
                        }
                    }
                    break;
                default:
                    while (node) {
                        if (node.kind === kind) {
                            return node;
                        }
                        else {
                            node = node.parent;
                        }
                    }
                    break;
            }

            return undefined;
        }

        // EXPRESSION TYPE CHECKING

        function checkIdentifier(node: Identifier): Type {
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

            var symbol = resolveName(node, node.text, SymbolFlags.Value | SymbolFlags.ExportValue, Diagnostics.Cannot_find_name_0, identifierToString(node));
            if (!symbol) {
                symbol = unknownSymbol;
            }

            if (symbol.flags & SymbolFlags.Import) {
                // Mark the import as referenced so that we emit it in the final .js file.
                // exception: identifiers that appear in type queries
                getSymbolLinks(symbol).referenced = !isInTypeQuery(node);
            }

            getNodeLinks(node).resolvedSymbol = symbol;

            checkCollisionWithCapturedSuperVariable(node, node);
            checkCollisionWithCapturedThisVariable(node, node);
            checkCollisionWithIndexVariableInGeneratedCode(node, node);

            return getTypeOfSymbol(getExportSymbolOfValueSymbolIfExported(symbol));
        }

        function getThisContainer(node: Node): Node {
            while (true) {
                node = node.parent;
                if (!node) {
                    return node;
                }
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.Property:
                    case SyntaxKind.Method:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.SourceFile:
                    case SyntaxKind.ArrowFunction:
                        return node;
                }
            }
        }

        function captureLexicalThis(node: Node, container: Node): void {
            var classNode = container.parent && container.parent.kind === SyntaxKind.ClassDeclaration ? container.parent : undefined;
            getNodeLinks(node).flags |= NodeCheckFlags.LexicalThis;
            if (container.kind === SyntaxKind.Property || container.kind === SyntaxKind.Constructor) {
                getNodeLinks(classNode).flags |= NodeCheckFlags.CaptureThis;
            }
            else {
                getNodeLinks(container).flags |= NodeCheckFlags.CaptureThis;
            }
        }

        function checkThisExpression(node: Node): Type {
            var container = getThisContainer(node);
            var needToCaptureLexicalThis = false;
            // skip arrow functions
            while (container.kind === SyntaxKind.ArrowFunction) {
                container = getThisContainer(container);
                needToCaptureLexicalThis = true;
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
                case SyntaxKind.Property:
                    if (container.flags & NodeFlags.Static) {
                        error(node, Diagnostics.this_cannot_be_referenced_in_a_static_property_initializer);
                        // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    }
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

        function getSuperContainer(node: Node): Node {
            while (true) {
                node = node.parent;
                if (!node) return node;
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.Property:
                    case SyntaxKind.Method:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        return node;
                }
            }
        }

        function isInConstructorArgumentInitializer(node: Node, constructorDecl: Node): boolean {
            for (var n = node; n && n !== constructorDecl; n = n.parent) {
                if (n.kind === SyntaxKind.Parameter) {
                    return true;
                }
            }
            return false;
        }

        function checkSuperExpression(node: Node, isCallExpression: boolean): Type {
            var enclosingClass = <ClassDeclaration>getAncestor(node, SyntaxKind.ClassDeclaration);
            var baseClass: Type;
            if (enclosingClass && enclosingClass.baseType) {
                var classType = <InterfaceType>getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClass));
                baseClass = classType.baseTypes.length && classType.baseTypes[0];
            }

            if (!baseClass) {
                error(node, Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                return unknownType;
            }

            var container = getSuperContainer(node);

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
                        container = getSuperContainer(container);
                        needToCaptureLexicalThis = true;
                    }

                    // topmost container must be something that is directly nested in the class declaration
                    if (container && container.parent && container.parent.kind === SyntaxKind.ClassDeclaration) {
                        if (container.flags & NodeFlags.Static) {
                            canUseSuperExpression =
                                container.kind === SyntaxKind.Method ||
                                container.kind === SyntaxKind.GetAccessor ||
                                container.kind === SyntaxKind.SetAccessor;
                        }
                        else {
                            canUseSuperExpression =
                                container.kind === SyntaxKind.Method ||
                                container.kind === SyntaxKind.GetAccessor ||
                                container.kind === SyntaxKind.SetAccessor ||
                                container.kind === SyntaxKind.Property ||
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

            if (isCallExpression) {
                error(node, Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
            }
            else {
                error(node, Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
            }

            return unknownType;
        }

        // Presence of a contextual type mapper indicates inferential typing, except the identityMapper object is
        // used as a special marker for other purposes.
        function isInferentialContext(mapper: TypeMapper) {
            return mapper && mapper !== identityMapper;
        }

        function checkArrayLiteral(node: ArrayLiteral, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            var contextualElementType = contextualType && getIndexTypeOfType(contextualType, IndexKind.Number);
            var elementTypes: Type[] = [];
            forEach(node.elements, element => {
                if (element.kind !== SyntaxKind.OmittedExpression) {
                    var type = checkExpression(element, contextualElementType, contextualMapper);
                    if (!contains(elementTypes, type)) elementTypes.push(type);
                }
            });
            var elementType = getBestCommonType(elementTypes, isInferentialContext(contextualMapper) ? undefined : contextualElementType, true);
            if (!elementType) elementType = elementTypes.length ? emptyObjectType : undefinedType;
            return createArrayType(elementType);
        }

        function isNumericName(name: string) {
            return !isNaN(<number><any>name);
        }

        function getContextualTypeForProperty(type: Type, name: string) {
            var prop = getPropertyOfType(type, name);
            if (prop) return getTypeOfSymbol(prop);
            return isNumericName(name) && getIndexTypeOfType(type, IndexKind.Number) || getIndexTypeOfType(type, IndexKind.String);
        }

        function checkObjectLiteral(node: ObjectLiteral, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            var members = node.symbol.members;
            var properties: SymbolTable = {};

            for (var id in members) {
                if (hasProperty(members, id)) {
                    var member = members[id];
                    if (member.flags & SymbolFlags.Property) {
                        var contextualPropType = contextualType && getContextualTypeForProperty(contextualType, member.name);
                        var type = checkExpression((<PropertyDeclaration>member.declarations[0]).initializer, contextualPropType, contextualMapper);
                        var prop = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient, member.name);
                        prop.declarations = member.declarations;
                        prop.parent = member.parent;
                        if (member.valueDeclaration) prop.valueDeclaration = member.valueDeclaration;
                        prop.type = type;
                        member = prop;
                    }
                    else {
                        // TypeScript 1.0 spec (April 2014)
                        // A get accessor declaration is processed in the same manner as 
                        // an ordinary function declaration(section 6.1) with no parameters.
                        // A set accessor declaration is processed in the same manner 
                        // as an ordinary function declaration with a single parameter and a Void return type.
                        var getAccessor = <AccessorDeclaration>getDeclarationOfKind(member, SyntaxKind.GetAccessor);
                        if (getAccessor) {
                            checkAccessorDeclaration(getAccessor);
                        }

                        var setAccessor = <AccessorDeclaration>getDeclarationOfKind(member, SyntaxKind.SetAccessor);
                        if (setAccessor) {
                            checkAccessorDeclaration(setAccessor);
                        }
                    }
                    properties[member.name] = member;
                }
            }
            var stringIndexType = getIndexType(properties, IndexKind.String);
            var numberIndexType = getIndexType(properties, IndexKind.Number);
            return createAnonymousType(node.symbol, properties, emptyArray, emptyArray, stringIndexType, numberIndexType);

            function getIndexType(properties: SymbolTable, kind: IndexKind) {
                if (contextualType) {
                    var indexType = getIndexTypeOfType(contextualType, kind);
                    if (indexType) {
                        var propTypes: Type[] = [];
                        for (var id in properties) {
                            if (hasProperty(properties, id)) {
                                if (kind === IndexKind.String || isNumericName(id)) {
                                    var type = getTypeOfSymbol(properties[id]);
                                    if (!contains(propTypes, type)) propTypes.push(type);
                                }
                            }
                        }

                        return getBestCommonType(propTypes, isInferentialContext(contextualMapper) ? undefined : indexType);
                    }
                }
            }
        }

        function getDeclarationKindFromSymbol(s: Symbol) {
            return s.flags & SymbolFlags.Prototype ? SyntaxKind.Property : s.valueDeclaration.kind;
        }

        function getDeclarationFlagsFromSymbol(s: Symbol) {
            return s.flags & SymbolFlags.Prototype ? NodeFlags.Public | NodeFlags.Static : s.valueDeclaration.flags;
        }

        function checkPropertyAccess(node: PropertyAccess) {
            var type = checkExpression(node.left);
            if (type === unknownType) return type;
            if (type !== anyType) {
                var apparentType = getApparentType(getWidenedType(type));
                if (<Type>apparentType === unknownType) {
                    // handle cases when type is Type parameter with invalid constraint
                    return unknownType;
                }
                var prop = getPropertyOfApparentType(apparentType, node.right.text);
                if (!prop) {
                    if (node.right.text) {
                        error(node.right, Diagnostics.Property_0_does_not_exist_on_type_1, identifierToString(node.right), typeToString(type));
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
                    if (node.left.kind === SyntaxKind.SuperKeyword && getDeclarationKindFromSymbol(prop) !== SyntaxKind.Method) {
                        error(node.right, Diagnostics.Only_public_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                    }
                    else if (getDeclarationFlagsFromSymbol(prop) & NodeFlags.Private) {
                        var classDeclaration = getAncestor(node, SyntaxKind.ClassDeclaration);
                        if (!classDeclaration || !contains(prop.parent.declarations, classDeclaration)) {
                            error(node, Diagnostics.Property_0_is_inaccessible, getFullyQualifiedName(prop));
                        }
                    }
                }
                return getTypeOfSymbol(prop);
            }
            return anyType;
        }

        function checkIndexedAccess(node: IndexedAccess): Type {
            var objectType = checkExpression(node.object);
            var indexType = checkExpression(node.index);
            if (objectType === unknownType) return unknownType;

            // TypeScript 1.0 spec (April 2014): 4.10 Property Access
            // - If IndexExpr is a string literal or a numeric literal and ObjExpr's apparent type has a property with the name 
            //    given by that literal(converted to its string representation in the case of a numeric literal), the property access is of the type of that property.
            // - Otherwise, if ObjExpr's apparent type has a numeric index signature and IndexExpr is of type Any, the Number primitive type, or an enum type, 
            //    the property access is of the type of that index signature.
            // - Otherwise, if ObjExpr's apparent type has a string index signature and IndexExpr is of type Any, the String or Number primitive type, or an enum type, 
            //    the property access is of the type of that index signature.
            // - Otherwise, if IndexExpr is of type Any, the String or Number primitive type, or an enum type, the property access is of type Any.

            // See if we can index as a property.
            var apparentType = getApparentType(objectType);
            if (<Type>apparentType === unknownType) {
                // handle cases when objectType is type parameter with invalid type
                return unknownType;
            }
            if (node.index.kind === SyntaxKind.StringLiteral || node.index.kind === SyntaxKind.NumericLiteral) {
                var name = (<LiteralExpression>node.index).text;
                var prop = getPropertyOfApparentType(apparentType, name);
                if (prop) {
                    return getTypeOfSymbol(prop);
                }
            }

            // Check for compatible indexer types.
            if (indexType.flags & (TypeFlags.Any | TypeFlags.StringLike | TypeFlags.NumberLike)) { 

                // Try to use a number indexer.
                if (indexType.flags & (TypeFlags.Any | TypeFlags.NumberLike)) {
                    var numberIndexType = getIndexTypeOfType(apparentType, IndexKind.Number);
                    if (numberIndexType) {
                        return numberIndexType;
                    }
                }

                // Try to use string indexing.
                var stringIndexType = getIndexTypeOfType(apparentType, IndexKind.String);
                if (stringIndexType) {
                    return stringIndexType;
                }

                // Fall back to any.
                if (program.getCompilerOptions().noImplicitAny && objectType !== anyType) {
                    error(node, Diagnostics.Index_signature_of_object_type_implicitly_has_an_any_type);
                }

                return anyType;
            }

            // REVIEW: Users should know the type that was actually used.
            error(node, Diagnostics.An_index_expression_argument_must_be_of_type_string_number_or_any);

            return unknownType;
        }

        function checkUntypedCall(node: CallExpression): Type {
            forEach(node.arguments, argument => { checkExpression(argument); });
            return anyType;
        }

        function checkErrorCall(node: CallExpression): Type {
            checkUntypedCall(node);
            return unknownType;
        }

        function isCandidateSignature(node: CallExpression, signature: Signature) {
            var args = node.arguments || emptyArray;
            return args.length >= signature.minArgumentCount &&
                (signature.hasRestParameter || args.length <= signature.parameters.length) &&
                (!node.typeArguments || signature.typeParameters && node.typeArguments.length === signature.typeParameters.length);
        }

        // The candidate list orders groups in reverse, but within a group signatures are kept in declaration order
        function collectCandidates(node: CallExpression, signatures: Signature[]): Signature[]{
            var result: Signature[] = [];
            var lastParent: Node;
            var pos: number;
            for (var i = 0; i < signatures.length; i++) {
                var signature = signatures[i];
                if (isCandidateSignature(node, signature)) {
                    var parent = signature.declaration ? signature.declaration.parent : undefined;
                    if (lastParent && parent === lastParent) {
                        pos++;
                    }
                    else {
                        lastParent = parent;
                        pos = 0;
                    }
                    for (var j = result.length; j > pos; j--) {
                        result[j] = result[j - 1];
                    }
                    result[pos] = signature;
                }
            }
            return result;
        }

        // If type has a single call signature and no other members, return that signature. Otherwise, return undefined.
        function getSingleCallSignature(type: Type): Signature {
            if (type.flags & TypeFlags.ObjectType) {
                var resolved = resolveObjectTypeMembers(<ObjectType>type);
                if (resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0 &&
                    resolved.properties.length === 0 && !resolved.stringIndexType && !resolved.numberIndexType) {
                    return resolved.callSignatures[0];
                }
            }
            return undefined;
        }

        // Instantiate a generic signature in the context of a non-generic signature (section 3.8.5 in TypeScript spec)
        function instantiateSignatureInContextOf(signature: Signature, contextualSignature: Signature, contextualMapper: TypeMapper): Signature {
            var context = createInferenceContext(signature.typeParameters);
            forEachMatchingParameterType(contextualSignature, signature, (source, target) => {
                // Type parameters from outer context referenced by source type are fixed by instantiation of the source type
                inferTypes(context, instantiateType(source, contextualMapper), target);
            });
            return getSignatureInstantiation(signature, getInferredTypes(context));
        }

        // Inferentially type an expression by a contextual parameter type (section 4.12.2 in TypeScript spec)
        function inferentiallyTypeExpession(expr: Expression, contextualType: Type, contextualMapper: TypeMapper): Type {
            var type = checkExpression(expr, contextualType, contextualMapper);
            var signature = getSingleCallSignature(type);
            if (signature && signature.typeParameters) {
                var contextualSignature = getSingleCallSignature(contextualType);
                if (contextualSignature && !contextualSignature.typeParameters) {
                    type = getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper));
                }
            }
            return type;
        }

        function inferTypeArguments(signature: Signature, args: Expression[], excludeArgument?: boolean[]): Type[] {
            var typeParameters = signature.typeParameters;
            var context = createInferenceContext(typeParameters);
            var mapper = createInferenceMapper(context);
            // First infer from arguments that are not context sensitive
            for (var i = 0; i < args.length; i++) {
                if (!excludeArgument || excludeArgument[i] === undefined) {
                    var parameterType = getTypeAtPosition(signature, i);
                    inferTypes(context, inferentiallyTypeExpession(args[i], parameterType, mapper), parameterType);
                }
            }
            // Next, infer from those context sensitive arguments that are no longer excluded
            if (excludeArgument) {
                for (var i = 0; i < args.length; i++) {
                    if (excludeArgument[i] === false) {
                        var parameterType = getTypeAtPosition(signature, i);
                        inferTypes(context, inferentiallyTypeExpession(args[i], parameterType, mapper), parameterType);
                    }
                }
            }
            return getInferredTypes(context);
        }

        function checkTypeArguments(signature: Signature, typeArguments: TypeNode[]): Type[] {
            var typeParameters = signature.typeParameters;
            var result: Type[] = [];
            for (var i = 0; i < typeParameters.length; i++) {
                var typeArgNode = typeArguments[i];
                var typeArgument = getTypeFromTypeNode(typeArgNode);
                var constraint = getConstraintOfTypeParameter(typeParameters[i]);
                if (constraint) {
                    checkTypeAssignableTo(typeArgument, constraint, typeArgNode, Diagnostics.Type_0_does_not_satisfy_the_constraint_1_Colon, Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                }
                result.push(typeArgument);
            }
            return result;
        }

        function checkApplicableSignature(node: CallExpression, signature: Signature, relation: Map<boolean>, excludeArgument: boolean[], reportErrors: boolean) {
            if (node.arguments) {
                for (var i = 0; i < node.arguments.length; i++) {
                    var arg = node.arguments[i];
                    var paramType = getTypeAtPosition(signature, i);
                    // String literals get string literal types unless we're reporting errors
                    var argType = arg.kind === SyntaxKind.StringLiteral && !reportErrors ?
                        getStringLiteralType(<LiteralExpression>arg) :
                        checkExpression(arg, paramType, excludeArgument && excludeArgument[i] ? identityMapper : undefined);
                    // Use argument expression as error location when reporting errors
                    var isValidArgument = checkTypeRelatedTo(argType, paramType, relation, reportErrors ? arg : undefined,
                        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1,
                        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1);
                    if (!isValidArgument) {
                        return false;
                    }
                }
            }
            return true;
        }

        function checkCall(node: CallExpression, signatures: Signature[]): Type {
            forEach(node.typeArguments, checkSourceElement);
            var candidates = collectCandidates(node, signatures);
            if (!candidates.length) {
                error(node, Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
                return checkErrorCall(node);
            }
            var args = node.arguments || emptyArray;
            var excludeArgument: boolean[];
            for (var i = 0; i < args.length; i++) {
                if (isContextSensitiveExpression(args[i])) {
                    if (!excludeArgument) excludeArgument = new Array(args.length);
                    excludeArgument[i] = true;
                }
            }
            var relation = candidates.length === 1 ? assignableRelation : subtypeRelation;
            while (true) {
                for (var i = 0; i < candidates.length; i++) {
                    while (true) {
                        var candidate = candidates[i];
                        if (candidate.typeParameters) {
                            var typeArguments = node.typeArguments ?
                                checkTypeArguments(candidate, node.typeArguments) :
                                inferTypeArguments(candidate, args, excludeArgument);
                            candidate = getSignatureInstantiation(candidate, typeArguments);
                        }
                        if (!checkApplicableSignature(node, candidate, relation, excludeArgument, /*reportErrors*/ false)) {
                            break;
                        }
                        var index = excludeArgument ? indexOf(excludeArgument, true) : -1;
                        if (index < 0) {
                            return getReturnTypeOfSignature(candidate);
                        }
                        excludeArgument[index] = false;
                    }
                }
                if (relation === assignableRelation) {
                    break;
                }
                relation = assignableRelation;
            }
            // No signatures were applicable. Now report errors based on the last applicable signature with
            // no arguments excluded from assignability checks.
            checkApplicableSignature(node, candidate, relation, undefined, /*reportErrors*/ true);
            return checkErrorCall(node);
        }

        function checkCallExpression(node: CallExpression): Type {
            if (node.func.kind === SyntaxKind.SuperKeyword) {
                var superType = checkSuperExpression(node.func, true);
                if (superType !== unknownType) {
                    checkCall(node, getSignaturesOfType(superType, SignatureKind.Construct));
                }
                else {
                    checkUntypedCall(node);
                }

                // TS 1.0 spec: 4.8.1
                // The type of a super call expression is Void.
                return voidType;
            }

            var funcType = checkExpression(node.func);
            if (funcType === unknownType) {
                // Another error has already been reported
                return checkErrorCall(node);
            }
            
            var apparentType = getApparentType(funcType)
            if (<Type>apparentType === unknownType) {
                // handler cases when funcType is type parameter with invalid constraint
                // Another error was already reported
                return checkErrorCall(node);
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
            if ((funcType === anyType) || (!callSignatures.length && !constructSignatures.length && isTypeAssignableTo(funcType, globalFunctionType))) {
                if (node.typeArguments) {
                    error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return checkUntypedCall(node);
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
                return checkErrorCall(node);
            }
            return checkCall(node, callSignatures);
        }

        function checkNewExpression(node: NewExpression): Type {
            var expressionType = checkExpression(node.func);
            if (expressionType === unknownType) {
                // Another error has already been reported
                return checkErrorCall(node);
            }
            // TS 1.0 spec: 4.11
            // If ConstructExpr is of type Any, Args can be any argument
            // list and the result of the operation is of type Any.
            if (expressionType === anyType) {
                if (node.typeArguments) {
                    error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }

                return checkUntypedCall(node);
            }

            // If ConstructExpr's apparent type(section 3.8.1) is an object type with one or
            // more construct signatures, the expression is processed in the same manner as a
            // function call, but using the construct signatures as the initial set of candidate
            // signatures for overload resolution.The result type of the function call becomes
            // the result type of the operation.
            expressionType = getApparentType(expressionType);
            if (<Type>expressionType === unknownType) {
                // handler cases when original expressionType is a type parameter with invalid constraint
                // another error has already been reported
                return checkErrorCall(node);
            }

            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including construct signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            var constructSignatures = getSignaturesOfType(expressionType, SignatureKind.Construct);
            if (constructSignatures.length) {
                return checkCall(node, constructSignatures);
            }

            // If ConstructExpr's apparent type is an object type with no construct signatures but
            // one or more call signatures, the expression is processed as a function call. A compile-time
            // error occurs if the result of the function call is not Void. The type of the result of the
            // operation is Any.
            var callSignatures = getSignaturesOfType(expressionType, SignatureKind.Call);
            if (callSignatures.length) {
                var type = checkCall(node, callSignatures);

                if (type !== voidType) {
                    error(node, Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                }

                // Since we found no constructor signature, we (implicitly) return any.
                if (program.getCompilerOptions().noImplicitAny) {
                    error(node, Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type);
                }

                return anyType;
            }

            error(node, Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature);
            return checkErrorCall(node);
        }

        function checkTypeAssertion(node: TypeAssertion): Type {
            var targetType = getTypeFromTypeNode(node.type);
            if (targetType === unknownType) return unknownType;
            var exprType = checkExpression(node.operand, targetType);
            var widenedType = getWidenedType(exprType);
            if (!(isTypeAssignableTo(exprType, targetType) || isTypeAssignableTo(targetType, widenedType))) {
                checkTypeAssignableTo(targetType, widenedType, node, Diagnostics.Neither_type_0_nor_type_1_is_assignable_to_the_other_Colon, Diagnostics.Neither_type_0_nor_type_1_is_assignable_to_the_other);
            }
            return targetType;
        }

        function getContextualSignature(contextualType: Type) {
            if (contextualType) {
                var signatures = getSignaturesOfType(contextualType, SignatureKind.Call);
                if (signatures.length === 1) {
                    var signature = signatures[0];
                    if (!signature.typeParameters) {
                        return signature;
                    }
                }
            }
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
                if (!links.type) {
                    links.type = instantiateType(getTypeAtPosition(context, i), mapper);
                }
            }
            if (signature.hasRestParameter && context.hasRestParameter && signature.parameters.length >= context.parameters.length) {
                var parameter = signature.parameters[signature.parameters.length - 1];
                var links = getSymbolLinks(parameter);
                if (!links.type) {
                    links.type = instantiateType(getTypeOfSymbol(context.parameters[context.parameters.length - 1]), mapper);
                }
            }
        }

        function getReturnTypeFromBody(func: FunctionDeclaration, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            if (func.body.kind !== SyntaxKind.FunctionBlock) {
                var unwidenedType = checkAndMarkExpression(func.body, contextualType, contextualMapper);
                var widenedType = getWidenedType(unwidenedType);

                if (program.getCompilerOptions().noImplicitAny && widenedType !== unwidenedType && getInnermostTypeOfNestedArrayTypes(widenedType) === anyType) {
                    error(func, Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeToString(widenedType));
                }

                return widenedType;
            }

            // Aggregate the types of expressions within all the return statements.
            var types = checkAndAggregateReturnExpressionTypes(<Block>func.body, contextualType, contextualMapper);

            // Try to return the best common type if we have any return expressions.
            if (types.length > 0) {
                var commonType = getBestCommonType(types, /*contextualType:*/ undefined, /*candidatesOnly:*/ true);
                if (!commonType) {
                    error(func, Diagnostics.No_best_common_type_exists_among_return_expressions);
                    
                    return unknownType;
                }

                var widenedType = getWidenedType(commonType);

                // Check and report for noImplicitAny if the best common type implicitly gets widened to an 'any'/arrays-of-'any' type.
                if (program.getCompilerOptions().noImplicitAny && widenedType !== commonType && getInnermostTypeOfNestedArrayTypes(widenedType) === anyType) {
                    var typeName = typeToString(widenedType);

                    if (func.name) {
                        error(func, Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type, identifierToString(func.name), typeName);
                    }
                    else {
                        error(func, Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeName);
                    }
                }

                return widenedType;
            }

            return voidType;
        }

        // WARNING: This has the same semantics as the forEach family of functions,
        //          in that traversal terminates in the event that 'visitor' supplies a truthy value.
        function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T {

            return traverse(body);

            function traverse(node: Node): T {
                switch (node.kind) {
                    case SyntaxKind.ReturnStatement:
                        return visitor(node);
                    case SyntaxKind.Block:
                    case SyntaxKind.FunctionBlock:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                    case SyntaxKind.LabelledStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.TryBlock:
                    case SyntaxKind.CatchBlock:
                    case SyntaxKind.FinallyBlock:
                        return forEachChild(node, traverse);
                }
            }
        }

        /// Returns a set of types relating to every return expression relating to a function block.
        function checkAndAggregateReturnExpressionTypes(body: Block, contextualType?: Type, contextualMapper?: TypeMapper): Type[] {
            var aggregatedTypes: Type[] = [];

            forEachReturnStatement(body, returnStatement => {
                var expr = returnStatement.expression;
                if (expr) {
                    var type = checkAndMarkExpression(expr, contextualType, contextualMapper);
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
            return (body.statements.length === 1) && (body.statements[0].kind === SyntaxKind.ThrowStatement)
        }

        // TypeScript Specification 1.0 (6.3) - July 2014
        // An explicitly typed function whose return type isn't the Void or the Any type
        // must have at least one return statement somewhere in its body.
        // An exception to this rule is if the function implementation consists of a single 'throw' statement.
        function checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(func: FunctionDeclaration, returnType: Type): void {
            // Functions that return 'void' or 'any' don't need any return expressions.
            if (returnType === voidType || returnType === anyType) {
                return;
            }

            // If all we have is a function signature, or an arrow function with an expression body, then there is nothing to check.
            if (!func.body || func.body.kind !== SyntaxKind.FunctionBlock) {
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

        function checkFunctionExpression(node: FunctionExpression, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            // The identityMapper object is used to indicate that function expressions are wildcards
            if (contextualMapper === identityMapper) {
                return anyFunctionType;
            }

            var type = getTypeOfSymbol(node.symbol);
            var links = getNodeLinks(node);

            if (!(links.flags & NodeCheckFlags.TypeChecked)) {
                var signature = getSignaturesOfType(type, SignatureKind.Call)[0];
                var contextualSignature = getContextualSignature(contextualType);
                if (contextualSignature) {
                    if (!node.typeParameters && !forEach(node.parameters, p => p.type)) {
                        assignContextualParameterTypes(signature, contextualSignature, contextualMapper || identityMapper);
                    }
                    if (!node.type) {
                        signature.resolvedReturnType = resolvingType;
                        var returnType = getReturnTypeFromBody(node, getReturnTypeOfSignature(contextualSignature), contextualMapper);
                        if (signature.resolvedReturnType === resolvingType) {
                            signature.resolvedReturnType = returnType;
                        }
                    }
                    else {
                        checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
                    }
                }
                checkSignatureDeclaration(node);
                if (node.body.kind === SyntaxKind.FunctionBlock) {
                    checkSourceElement(node.body);
                }
                else {
                    var returnType = getReturnTypeOfSignature(signature);
                    if (node.type) {
                        // Use default error messages for this check
                        checkTypeAssignableTo(checkExpression(node.body, returnType), returnType, node.body, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
                    }
                }
                links.flags |= NodeCheckFlags.TypeChecked;
            }
            return type;
        }

        function checkArithmeticOperandType(operand: Node, type: Type, diagnostic: DiagnosticMessage): boolean {
            if (!(type.flags & (TypeFlags.Any | TypeFlags.NumberLike))) {
                error(operand, diagnostic);
                return false;
            }
            return true;
        }

        function checkReferenceExpression(n: Node, message: DiagnosticMessage): boolean {
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
                    case SyntaxKind.PropertyAccess:
                        var symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.10
                        // A property access expression is always classified as a reference.
                        // NOTE (not in spec): assignment to enum members should not be allowed
                        return !symbol || symbol === unknownSymbol || (symbol.flags & ~SymbolFlags.EnumMember) !== 0;
                    case SyntaxKind.IndexedAccess:
                        //  old compiler doesn't check indexed assess
                        return true;
                    case SyntaxKind.ParenExpression:
                        return isReferenceOrErrorExpression((<ParenExpression>n).expression);
                    default:
                        return false;
                }
            }

            if (!isReferenceOrErrorExpression(n)) {
                error(n, message);
                return false;
            }
            return true;
        }

        function checkPrefixExpression(node: UnaryExpression): Type {
            var operandType = checkExpression(node.operand);
            switch (node.operator) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                    return numberType;
                case SyntaxKind.ExclamationToken:
                case SyntaxKind.DeleteKeyword:
                    return booleanType;
                case SyntaxKind.TypeOfKeyword:
                    return stringType;
                case SyntaxKind.VoidKeyword:
                    return undefinedType;
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    var ok = checkArithmeticOperandType(node.operand, operandType, Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
                    if (ok) {
                        // run check only if former checks succeeded to avoid reporting cascading errors
                        checkReferenceExpression(node.operand, Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer);
                    }
                    return numberType;
            }
            return unknownType;
        }

        function checkPostfixExpression(node: UnaryExpression): Type {
            var operandType = checkExpression(node.operand);
            var ok = checkArithmeticOperandType(node.operand, operandType, Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
            if (ok) {
                // run check only if former checks succeeded to avoid reporting cascading errors
                checkReferenceExpression(node.operand, Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer);
            }
            return numberType;
        }

        function isTypeAnyTypeObjectTypeOrTypeParameter(type: Type): boolean {
            return type === anyType || ((type.flags & (TypeFlags.ObjectType | TypeFlags.TypeParameter)) !== 0);
        }

        function checkInstanceOfExpression(node: BinaryExpression, leftType: Type, rightType: Type): Type {
            // TypeScript 1.0 spec (April 2014): 4.15.4
            // The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
            // and the right operand to be of type Any or a subtype of the 'Function' interface type. 
            // The result is always of the Boolean primitive type.
            if (!isTypeAnyTypeObjectTypeOrTypeParameter(leftType)) {
                error(node.left, Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            if (rightType !== anyType && !isTypeSubtypeOf(rightType, globalFunctionType)) {
                error(node.right, Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
            }
            return booleanType;
        }

        function checkInExpression(node: BinaryExpression, leftType: Type, rightType: Type): Type {
            // TypeScript 1.0 spec (April 2014): 4.15.5
            // The in operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type,
            // and the right operand to be of type Any, an object type, or a type parameter type.
            // The result is always of the Boolean primitive type.
            if (leftType !== anyType && leftType !== stringType && leftType !== numberType) {
                error(node.left, Diagnostics.The_left_hand_side_of_an_in_expression_must_be_of_types_any_string_or_number);
            }
            if (!isTypeAnyTypeObjectTypeOrTypeParameter(rightType)) {
                error(node.right, Diagnostics.The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            return booleanType;
        }

        function checkBinaryExpression(node: BinaryExpression, contextualType?: Type, contextualMapper?: TypeMapper) {
            var operator = node.operator;
            var leftContextualType = operator === SyntaxKind.BarBarToken ? contextualType : undefined
            var leftType = checkExpression(node.left, leftContextualType, contextualMapper);
            var rightContextualType = operator >= SyntaxKind.FirstAssignment && operator <= SyntaxKind.LastAssignment ? leftType :
                operator === SyntaxKind.BarBarToken ? contextualType || leftType : undefined;
            var rightType = checkExpression(node.right, rightContextualType, contextualMapper);
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

                    var leftOk = checkArithmeticOperandType(node.left, leftType, Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                    var rightOk = checkArithmeticOperandType(node.right, rightType, Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                    if (leftOk && rightOk) {
                        checkAssignmentOperator(numberType);
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
                    if (leftType.flags & TypeFlags.NumberLike && rightType.flags & TypeFlags.NumberLike) {
                        // Operands of an enum type are treated as having the primitive type Number.
                        // If both operands are of the Number primitive type, the result is of the Number primitive type.
                        resultType = numberType;
                    }
                    else if (leftType.flags & TypeFlags.StringLike || rightType.flags & TypeFlags.StringLike) {
                        // If one or both operands are of the String primitive type, the result is of the String primitive type.
                        resultType = stringType;
                    }
                    else if (leftType.flags & TypeFlags.Any || leftType === unknownType || rightType.flags & TypeFlags.Any || rightType === unknownType) {
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
                    if (!isTypeSubtypeOf(leftType, rightType) && !isTypeSubtypeOf(rightType, leftType)) {
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
                    return getBestCommonType([leftType, rightType], isInferentialContext(contextualMapper) ? undefined : contextualType);
                case SyntaxKind.EqualsToken:
                    checkAssignmentOperator(rightType);
                    return rightType;
                case SyntaxKind.CommaToken:
                    return rightType;
            }

            function checkAssignmentOperator(valueType: Type): void {
                if (operator >= SyntaxKind.FirstAssignment && operator <= SyntaxKind.LastAssignment) {
                    // TypeScript 1.0 spec (April 2014): 4.17
                    // An assignment of the form
                    //    VarExpr = ValueExpr
                    // requires VarExpr to be classified as a reference
                    // A compound assignment furthermore requires VarExpr to be classified as a reference (section 4.1) 
                    // and the type of the non - compound operation to be assignable to the type of VarExpr.
                    var ok = checkReferenceExpression(node.left, Diagnostics.Invalid_left_hand_side_of_assignment_expression);
                    // Use default messages
                    if (ok) {
                        // to avoid cascading errors check assignability only if 'isReference' check succeded and no errors were reported
                        checkTypeAssignableTo(valueType, leftType, node.left, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
                    }
                }
            }

            function reportOperatorError() {
                error(node, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, tokenToString(node.operator), typeToString(leftType), typeToString(rightType));
            }
        }

        function checkConditionalExpression(node: ConditionalExpression, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            checkExpression(node.condition);
            var type1 = checkExpression(node.whenTrue, contextualType, contextualMapper);
            var type2 = checkExpression(node.whenFalse, contextualType, contextualMapper);
            var resultType = getBestCommonType([type1, type2], isInferentialContext(contextualMapper) ? undefined : contextualType, true);
            if (!resultType) {

                if (contextualType && !isInferentialContext(contextualMapper)) {
                    error(node, Diagnostics.No_best_common_type_exists_between_0_1_and_2, typeToString(contextualType), typeToString(type1), typeToString(type2));
                }
                else {
                    error(node, Diagnostics.No_best_common_type_exists_between_0_and_1, typeToString(type1), typeToString(type2));
                }

                resultType = emptyObjectType;
            }
            return resultType;
        }

        function checkAndMarkExpression(node: Expression, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            var result = checkExpression(node, contextualType, contextualMapper);
            getNodeLinks(node).flags |= NodeCheckFlags.TypeChecked;
            return result;
        }

        // Checks an expression and returns its type. The contextualType parameter provides a contextual type for
        // the check or is undefined if there is no contextual type. The contextualMapper parameter serves two
        // purposes: When contextualMapper is not undefined and not equal to the identityMapper function object
        // it provides a type mapper to use during inferential typing (the contextual type is then a generic type).
        // When contextualMapper is equal to the identityMapper function object, it serves as an indicator that all
        // contained function and arrow expressions should be considered to have the wildcard function type; this
        // form of type check is used during overload resolution to exclude contextually typed function and arrow
        // expressions in the initial phase.
        function checkExpression(node: Expression, contextualType?: Type, contextualMapper?: TypeMapper): Type {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return checkIdentifier(<Identifier>node);
                case SyntaxKind.ThisKeyword:
                    return checkThisExpression(node);
                case SyntaxKind.SuperKeyword:
                    return checkSuperExpression(node, false);
                case SyntaxKind.NullKeyword:
                    return nullType;
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                    return booleanType;
                case SyntaxKind.NumericLiteral:
                    return numberType;
                case SyntaxKind.StringLiteral:
                    return stringType;
                case SyntaxKind.RegularExpressionLiteral:
                    return globalRegExpType;
                case SyntaxKind.QualifiedName:
                    return checkPropertyAccess(<QualifiedName>node);
                case SyntaxKind.ArrayLiteral:
                    return checkArrayLiteral(<ArrayLiteral>node, contextualType, contextualMapper);
                case SyntaxKind.ObjectLiteral:
                    return checkObjectLiteral(<ObjectLiteral>node, contextualType, contextualMapper);
                case SyntaxKind.PropertyAccess:
                    return checkPropertyAccess(<PropertyAccess>node);
                case SyntaxKind.IndexedAccess:
                    return checkIndexedAccess(<IndexedAccess>node);
                case SyntaxKind.CallExpression:
                    return checkCallExpression(<CallExpression>node);
                case SyntaxKind.NewExpression:
                    return checkNewExpression(<NewExpression>node);
                case SyntaxKind.TypeAssertion:
                    return checkTypeAssertion(<TypeAssertion>node);
                case SyntaxKind.ParenExpression:
                    return checkExpression((<ParenExpression>node).expression);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return checkFunctionExpression(<FunctionExpression>node, contextualType, contextualMapper);
                case SyntaxKind.PrefixOperator:
                    return checkPrefixExpression(<UnaryExpression>node);
                case SyntaxKind.PostfixOperator:
                    return checkPostfixExpression(<UnaryExpression>node);
                case SyntaxKind.BinaryExpression:
                    return checkBinaryExpression(<BinaryExpression>node, contextualType, contextualMapper);
                case SyntaxKind.ConditionalExpression:
                    return checkConditionalExpression(<ConditionalExpression>node, contextualType, contextualMapper);
            }
            return unknownType;
        }

        // DECLARATION AND STATEMENT TYPE CHECKING

        function checkTypeParameter(node: TypeParameterDeclaration) {
            checkTypeNameIsReserved(node.name, Diagnostics.Type_parameter_name_cannot_be_0);
            checkSourceElement(node.constraint);
            checkTypeParameterHasIllegalReferencesInConstraint(node);
            // TODO: Check multiple declarations are identical
        }

        function checkParameter(parameterDeclaration: ParameterDeclaration) {
            checkVariableDeclaration(parameterDeclaration);

            checkCollisionWithIndexVariableInGeneratedCode(parameterDeclaration, parameterDeclaration.name);

            if (parameterDeclaration.flags & (NodeFlags.Public | NodeFlags.Private) && !(parameterDeclaration.parent.kind === SyntaxKind.Constructor && (<ConstructorDeclaration>parameterDeclaration.parent).body)) {
                error(parameterDeclaration, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
            }
            if (parameterDeclaration.flags & NodeFlags.Rest) {
                if (!isArrayType(getTypeOfSymbol(parameterDeclaration.symbol))) {
                    error(parameterDeclaration, Diagnostics.A_rest_parameter_must_be_of_an_array_type);
                }
            }
            else {
                if (parameterDeclaration.initializer && !(<FunctionDeclaration>parameterDeclaration.parent).body) {
                    error(parameterDeclaration, Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                }
            }

            function checkReferencesInInitializer(n: Node): void {
                if (n.kind === SyntaxKind.Identifier) {
                    var referencedSymbol = getNodeLinks(n).resolvedSymbol;
                    // check FunctionDeclaration.locals (stores parameters\function local variable) 
                    // if it contains entry with a specified name and if this entry matches the resolved symbol
                    if (referencedSymbol && referencedSymbol !== unknownSymbol && getSymbol(parameterDeclaration.parent.locals, referencedSymbol.name, SymbolFlags.Value) === referencedSymbol) {
                        if (referencedSymbol.valueDeclaration.kind === SyntaxKind.Parameter) {
                            if (referencedSymbol.valueDeclaration === parameterDeclaration) {
                                error(n, Diagnostics.Parameter_0_cannot_be_referenced_in_its_initializer, identifierToString(parameterDeclaration.name));
                                return;
                            }
                            var enclosingOrReferencedParameter =
                                forEach((<FunctionDeclaration>parameterDeclaration.parent).parameters, p => p === parameterDeclaration || p === referencedSymbol.valueDeclaration ? p : undefined);

                            if (enclosingOrReferencedParameter === referencedSymbol.valueDeclaration) {
                                // legal case - parameter initializer references some parameter strictly on left of current parameter declaration
                                return;
                            }
                            // fallthrough to error reporting
                        }

                        error(n, Diagnostics.Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it, identifierToString(parameterDeclaration.name), identifierToString(<Identifier>n));
                    }
                }
                else {
                    forEachChild(n, checkReferencesInInitializer);
                }
            }

            if (parameterDeclaration.initializer) {
                checkReferencesInInitializer(parameterDeclaration.initializer);
            }
        }

        function checkSignatureDeclaration(node: SignatureDeclaration) {
            checkTypeParameters(node.typeParameters);
            forEach(node.parameters, checkParameter);
            if (node.type) {
                checkSourceElement(node.type);
            }

            checkCollisionWithCapturedSuperVariable(node, node.name);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithArgumentsInGeneratedCode(node);
            if (program.getCompilerOptions().noImplicitAny && !node.type) {
                switch (node.kind) {
                    case SyntaxKind.ConstructSignature:
                        error(node, Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                        break;
                    case SyntaxKind.CallSignature:
                        error(node, Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                        break;
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
                    if (declaration.parameters.length  == 1 && declaration.parameters[0].type) {
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
            // TODO
            checkVariableDeclaration(node);
        }

        function checkMethodDeclaration(node: MethodDeclaration) {
            // TODO
            checkFunctionDeclaration(node);
        }

        function checkConstructorDeclaration(node: ConstructorDeclaration) {
            // TODO
            checkSignatureDeclaration(node);
            checkSourceElement(node.body);

            var symbol = getSymbolOfNode(node);
            var firstDeclaration = getDeclarationOfKind(symbol, node.kind);
            // Only type check the symbol once
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(symbol);
            }

            // exit early in the case of signature - super checks are not relevant to them
            if (!node.body) {
                return;
            }

            function isSuperCallExpression(n: Node): boolean {
                return n.kind === SyntaxKind.CallExpression && (<CallExpression>n).func.kind === SyntaxKind.SuperKeyword
            }

            function containsSuperCall(n: Node): boolean {
                if (isSuperCallExpression(n)) {
                    return true;
                }
                switch (n.kind) {
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.ObjectLiteral: return false;
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
                return n.kind === SyntaxKind.Property &&
                    !(n.flags & NodeFlags.Static) &&
                    !!(<PropertyDeclaration>n).initializer;
            }

            // TS 1.0 spec (April 2014): 8.3.2
            // Constructors of classes with no extends clause may not contain super calls, whereas 
            // constructors of derived classes must contain at least one super call somewhere in their function body.
            if ((<ClassDeclaration>node.parent).baseType) {
                
                if (containsSuperCall(node.body)) {
                    // The first statement in the body of a constructor must be a super call if both of the following are true:
                    // - The containing class is a derived class.
                    // - The constructor declares parameter properties 
                    //   or the containing class declares instance member variables with initializers.
                    var superCallShouldBeFirst =
                        forEach((<ClassDeclaration>node.parent).members, isInstancePropertyWithInitializer) ||
                        forEach(node.parameters, p => p.flags & (NodeFlags.Public | NodeFlags.Private));

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
            if (node.kind === SyntaxKind.GetAccessor) {
                if (!isInAmbientContext(node) && node.body && !(bodyContainsAReturnStatement(<Block>node.body) || bodyContainsSingleThrowStatement(<Block>node.body))) {
                    error(node.name, Diagnostics.A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement);
                }
            }

            // TypeScript 1.0 spec (April 2014): 8.4.3
            // Accessors for the same member name must specify the same accessibility.
            var otherKind = node.kind === SyntaxKind.GetAccessor ? SyntaxKind.SetAccessor : SyntaxKind.GetAccessor;
            var otherAccessor = <AccessorDeclaration>getDeclarationOfKind(node.symbol, otherKind);
            if (otherAccessor) {
                var visibilityFlags = NodeFlags.Private | NodeFlags.Public;
                if (((node.flags & visibilityFlags) !== (otherAccessor.flags & visibilityFlags))) {
                    error(node.name, Diagnostics.Getter_and_setter_accessors_do_not_agree_in_visibility);
                }

                var thisType = getAnnotatedAccessorType(node);
                var otherType = getAnnotatedAccessorType(otherAccessor);
                // TypeScript 1.0 spec (April 2014): 4.5
                // If both accessors include type annotations, the specified types must be identical.
                if (thisType && otherType) {
                    if (!isTypeIdenticalTo(thisType, otherType)) {
                        error(node, Diagnostics.get_and_set_accessor_must_have_the_same_type);
                    }
                }
            }

            checkFunctionDeclaration(node);
            checkAndStoreTypeOfAccessors(getSymbolOfNode(node));
        }

        function checkTypeReference(node: TypeReferenceNode) {
            var type = getTypeFromTypeReferenceNode(node);
            if (type !== unknownType && node.typeArguments) {
                // Do type argument local checks only if referenced type is successfully resolved
                var len = node.typeArguments.length;
                for (var i = 0; i < len; i++) {
                    checkSourceElement(node.typeArguments[i]);
                    var constraint = getConstraintOfTypeParameter((<TypeReference>type).target.typeParameters[i]);
                    if (constraint) {
                        var typeArgument = (<TypeReference>type).typeArguments[i];
                        checkTypeAssignableTo(typeArgument, constraint, node, Diagnostics.Type_0_does_not_satisfy_the_constraint_1_Colon, Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
        }

        function checkTypeQuery(node: TypeQueryNode) {
            getTypeFromTypeQueryNode(node);
        }

        function checkTypeLiteral(node: TypeLiteralNode) {
            forEach(node.members, checkSourceElement);
            var type = getTypeFromTypeLiteralNode(node);
            checkIndexConstraints(type);
            checkTypeForDuplicateIndexSignatures(node);
        }

        function checkArrayType(node: ArrayTypeNode) {
            getTypeFromArrayTypeNode(node);
        }

        function isPrivateWithinAmbient(node: Node): boolean {
            return (node.flags & NodeFlags.Private) && isInAmbientContext(node);
        }

        function isInAmbientContext(node: Node): boolean {
            while (node) {
                if (node.flags & (NodeFlags.Ambient | NodeFlags.DeclarationFile)) return true;
                node = node.parent;
            }
            return false;
        }

        function checkSpecializedSignatureDeclaration(signatureDeclarationNode: SignatureDeclaration): void {
            var signature = getSignatureFromDeclaration(signatureDeclarationNode);
            if (!signature.hasStringLiterals) {
                return;
            }

            // TypeScript 1.0 spec (April 2014): 3.7.2.2
            // Specialized signatures are not permitted in conjunction with a function body
            if ((<FunctionDeclaration>signatureDeclarationNode).body) {
                error(signatureDeclarationNode, Diagnostics.A_signature_with_an_implementation_cannot_use_a_string_literal_type);
                return;
            }

            // TypeScript 1.0 spec (April 2014): 3.7.2.4
            // Every specialized call or construct signature in an object type must be assignable
            // to at least one non-specialized call or construct signature in the same object type
            var signaturesOfSymbol = getSignaturesOfSymbol(getSymbolOfNode(signatureDeclarationNode));
            for (var i = 0; i < signaturesOfSymbol.length; i++) {
                var otherSignature = signaturesOfSymbol[i];
                if (!otherSignature.hasStringLiterals && isSignatureAssignableTo(signature, otherSignature)) {
                    return;
                }
            }

            error(signatureDeclarationNode, Diagnostics.Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature);
        }

        function checkFunctionOrConstructorSymbol(symbol: Symbol) {
            function getEffectiveFlagsForFunctionCheck(n: Node) {
                var flags = n.flags;
                // We want to determine if an overload is effectively ambient, which can happen if it
                // is nested in an ambient context. However, do not treat members of interfaces differently
                // based on whether the interface itself is in an ambient context. Interfaces should never
                // be considered ambient for purposes of comparing overload attributes.
                if (n.parent.kind !== SyntaxKind.InterfaceDeclaration && isInAmbientContext(n)) {
                    if (!(flags & NodeFlags.Ambient)) {
                        // It is nested in an ambient context, which means it is automatically exported
                        flags |= NodeFlags.Export;
                    }
                    flags |= NodeFlags.Ambient;
                }

                return flags & flagsToCheck;
            }

            function checkFlagAgreementBetweenOverloads(overloads: Declaration[], implementation: FunctionDeclaration, flagsToCheck: NodeFlags, someOverloadFlags: NodeFlags, allOverloadFlags: NodeFlags): void {
                // Error if some overloads have a flag that is not shared by all overloads. To find the
                // deviations, we XOR someOverloadFlags with allOverloadFlags
                var someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                if (someButNotAllOverloadFlags !== 0) {
                    // Consider the canonical set of flags to be the flags of the bodyDeclaration or the first declaration
                    // Error on all deviations from this canonical set of flags
                    // The caveat is that if some overloads are defined in lib.d.ts, we don't want to
                    // report the errors on those. To achieve this, we will say that the implementation is
                    // the canonical signature only if it is in the same container as the first overload
                    var implementationSharesContainerWithFirstOverload = implementation !== undefined && implementation.parent === overloads[0].parent;
                    var canonicalFlags = implementationSharesContainerWithFirstOverload
                        ? getEffectiveFlagsForFunctionCheck(implementation)
                        : getEffectiveFlagsForFunctionCheck(overloads[0]);
                    forEach(overloads, o => {
                        var deviation = getEffectiveFlagsForFunctionCheck(o) ^ canonicalFlags;
                        if (deviation & NodeFlags.Export) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_exported_or_not_exported);
                        }
                        else if (deviation & NodeFlags.Ambient) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                        }
                        else if (deviation & NodeFlags.Private) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_public_or_private);
                        }
                        else if (deviation & NodeFlags.QuestionMark) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                        }
                    });
                }
            }

            var flagsToCheck: NodeFlags = NodeFlags.Export | NodeFlags.Ambient | NodeFlags.Private | NodeFlags.QuestionMark;
            var someNodeFlags: NodeFlags = 0;
            var allNodeFlags = flagsToCheck;
            var hasOverloads = false;
            var bodyDeclaration: FunctionDeclaration;
            var lastSeenNonAmbientDeclaration: FunctionDeclaration;
            var declarations = symbol.declarations;
            var isConstructor = (symbol.flags & SymbolFlags.Constructor) !== 0;
            for (var i = 0; i < declarations.length; i++) {
                var node = <FunctionDeclaration>declarations[i];
                if (node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.Method || node.kind === SyntaxKind.Constructor) {
                    var currentNodeFlags = getEffectiveFlagsForFunctionCheck(node);
                    someNodeFlags |= currentNodeFlags;
                    allNodeFlags &= currentNodeFlags;

                    var inAmbientContext = isInAmbientContext(node);
                    var inAmbientContextOrInterface = node.parent.kind === SyntaxKind.InterfaceDeclaration || node.parent.kind === SyntaxKind.TypeLiteral || inAmbientContext;
                    if (!inAmbientContextOrInterface) {
                        lastSeenNonAmbientDeclaration = node;
                    }

                    if (node.body) {
                        if (bodyDeclaration) {
                            if (isConstructor) {
                                error(node, Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                            }
                            else {
                                error(node, Diagnostics.Duplicate_function_implementation);
                            }
                        }
                        else {
                            bodyDeclaration = node;
                        }
                    }
                    else {
                        hasOverloads = true;
                    }
                }
            }

            if (lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body) {
                if (isConstructor) {
                    error(lastSeenNonAmbientDeclaration, Diagnostics.Constructor_implementation_expected);
                }
                else {
                    error(lastSeenNonAmbientDeclaration, Diagnostics.Function_implementation_expected);
                }
            }

            if (hasOverloads) {
                checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
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

        function checkFunctionDeclaration(node: FunctionDeclaration) {
            checkSignatureDeclaration(node);

            var symbol = getSymbolOfNode(node);
            var firstDeclaration = getDeclarationOfKind(symbol, node.kind);
            // Only type check the symbol once
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(symbol);
            }

            checkSourceElement(node.body);
            if (node.type) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNode(node.type));
            }

            // If there is no body and no explicit return type, then report an error.
            if (program.getCompilerOptions().noImplicitAny && !node.body && !node.type) {
                // Ignore privates within ambient contexts; they exist purely for documentative purposes to avoid name clashing.
                // (e.g. privates within .d.ts files do not expose type information)
                if (!isPrivateWithinAmbient(node)) {
                    var typeName = typeToString(anyType);

                    if (node.name) {
                        error(node, Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type, identifierToString(node.name), typeName);
                    }
                    else {
                        error(node, Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeName);
                    }
                }
            }
        }

        function checkBlock(node: Block) {
            forEach(node.statements, checkSourceElement);
        }

        function checkCollisionWithArgumentsInGeneratedCode(node: SignatureDeclaration) {
            // no rest parameters \ declaration context \ overload - no codegen impact
            if (!hasRestParameters(node) || isInAmbientContext(node) || !(<FunctionDeclaration>node).body) {
                return;
            }

            forEach(node.parameters, p => {
                if (p.name && p.name.text === argumentsSymbol.name) {
                    error(p, Diagnostics.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters);
                }
            });
        }

        function checkCollisionWithIndexVariableInGeneratedCode(node: Node, name: Identifier) {
            if (!(name && name.text === "_i")) {
                return;
            }

            if (node.kind === SyntaxKind.Parameter) {
                // report error if parameter has name '_i' when:
                // - function has implementation (not a signature)
                // - function has rest parameters
                // - context is not ambient (otherwise no codegen impact)
                if ((<FunctionDeclaration>node.parent).body && hasRestParameters(<FunctionDeclaration>node.parent) && !isInAmbientContext(node)) {
                    error(node, Diagnostics.Duplicate_identifier_i_Compiler_uses_i_to_initialize_rest_parameter);                    
                }
                return;
            }

            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol === unknownSymbol) {
                return;
            }

            // we would like to discover cases like one below:
            //
            // var _i = "!";
            // function foo(...a) {
            //    function bar() {
            //        var x = { get baz() { return _i; } }
            //    }
            // }
            // 
            // at runtime '_i' referenced in getter will be resolved to the generated index variable '_i' used to initialize rest parameters.
            // legitimate case: when '_i' is defined inside the function declaration with rest parameters.
            // 
            // function foo(...a) {
            //    var _i = "!";
            //    function bar() {
            //        var x = { get baz() { return _i; } }
            //    }
            // }

            ////  if resolved symbol for node has more than one declaration - this is definitely an error
            ////  (there is nothing value-like in the language that can be nested in function and consists of multiple declarations)
            //if (symbol.declarations.length > 1) {
            //    error(node, Diagnostics.Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter);
            //    return;
            //}

            // short gist of the check:
            // - otherwise
            // - walk to the top of the tree starting from the 'node'
            // - at every step check if 'current' node contains any declaration of original node
            //   yes - return
            //   no - check if current declaration is function with rest parameters
            //        yes - report error since '_i' from this function will shadow '_i' defined in the outer scope
            //        no - go up to the next level
            var current = node;
            while (current) {
                var definedOnCurrentLevel = forEach(symbol.declarations, d => d.parent === current ? d : undefined);
                if (definedOnCurrentLevel) {
                    return;
                }
                switch (current.kind) {
                    // all kinds that might have rest parameters
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.Method:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.Constructor:
                        if (hasRestParameters(<FunctionDeclaration>current)) {
                            error(node, Diagnostics.Expression_resolves_to_variable_declaration_i_that_compiler_uses_to_initialize_rest_parameter);
                            return;
                        }
                        break;
                }
                current = current.parent;
            }
        }

        function needCollisionCheckForIdentifier(node: Node, identifier: Identifier, name: string): boolean {
            if (!(identifier && identifier.text === name)) {
                return false;
            }

            if (node.kind === SyntaxKind.Property ||
                node.kind === SyntaxKind.Method ||
                node.kind === SyntaxKind.GetAccessor ||
                node.kind === SyntaxKind.SetAccessor) {
                // it is ok to have member named '_super' or '_this' - member access is always qualified
                return false
            }

            if (isInAmbientContext(node)) {
                // ambient context - no codegen impact
                return false;
            }

            if (node.kind === SyntaxKind.Parameter && !(<FunctionDeclaration>node.parent).body) {
                // just an overload - no codegen impact
                return false;
            }

            return true;
        }

        function checkCollisionWithCapturedThisVariable(node: Node, name: Identifier): void {
            if (!needCollisionCheckForIdentifier(node, name, "_this")) {
                return;
            }
            potentialThisCollisions.push(node);
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

            if (enclosingClass.baseType) {
                var isDeclaration = node.kind !== SyntaxKind.Identifier;
                if (isDeclaration) {
                    error(node, Diagnostics.Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference);
                }
                else {
                    error(node, Diagnostics.Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference);
                }
            }
        }

        function checkVariableDeclaration(node: VariableDeclaration) {
            checkSourceElement(node.type);

            var symbol = getSymbolOfNode(node);

            var typeOfValueDeclaration = getTypeOfVariableOrParameterOrProperty(symbol);
            var type: Type;
            var useTypeFromValueDeclaration = node === symbol.valueDeclaration;
            if (useTypeFromValueDeclaration) {
                type = typeOfValueDeclaration;
            }
            else {
                type = getTypeOfVariableDeclaration(node);
            }

            if (node.initializer) {
                if (!(getNodeLinks(node.initializer).flags & NodeCheckFlags.TypeChecked)) {
                    // Use default messages
                    checkTypeAssignableTo(checkAndMarkExpression(node.initializer, type), type, node, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
                }
            }

            checkCollisionWithCapturedSuperVariable(node, node.name);
            checkCollisionWithCapturedThisVariable(node, node.name);
            if (!useTypeFromValueDeclaration) {
                // TypeScript 1.0 spec (April 2014): 5.1
                // Multiple declarations for the same variable name in the same declaration space are permitted,
                // provided that each declaration associates the same type with the variable.
                if (typeOfValueDeclaration !== unknownType && type !== unknownType && !isTypeIdenticalTo(typeOfValueDeclaration, type)) {
                    error(node.name, Diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2, identifierToString(node.name), typeToString(typeOfValueDeclaration), typeToString(type));
                }
            }
        }

        function checkVariableStatement(node: VariableStatement) {
            forEach(node.declarations, checkVariableDeclaration);
        }

        function checkExpressionStatement(node: ExpressionStatement) {
            checkExpression(node.expression);
        }

        function checkIfStatement(node: IfStatement) {
            checkExpression(node.expression);
            checkSourceElement(node.thenStatement);
            checkSourceElement(node.elseStatement);
        }

        function checkDoStatement(node: DoStatement) {
            checkSourceElement(node.statement);
            checkExpression(node.expression);
        }

        function checkWhileStatement(node: WhileStatement) {
            checkExpression(node.expression);
            checkSourceElement(node.statement);
        }

        function checkForStatement(node: ForStatement) {
            if (node.declarations) forEach(node.declarations, checkVariableDeclaration);
            if (node.initializer) checkExpression(node.initializer);
            if (node.condition) checkExpression(node.condition);
            if (node.iterator) checkExpression(node.iterator);
            checkSourceElement(node.statement);
        }

        function checkForInStatement(node: ForInStatement) {

            // TypeScript 1.0 spec  (April 2014): 5.4
            // In a 'for-in' statement of the form
            // for (var VarDecl in Expr) Statement
            //   VarDecl must be a variable declaration without a type annotation that declares a variable of type Any,
            //   and Expr must be an expression of type Any, an object type, or a type parameter type.                        
            if (node.declaration) {
                checkVariableDeclaration(node.declaration);
                if (node.declaration.type) {
                    error(node.declaration, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation);
                }
            }

            // In a 'for-in' statement of the form
            // for (Var in Expr) Statement
            //   Var must be an expression classified as a reference of type Any or the String primitive type,
            //   and Expr must be an expression of type Any, an object type, or a type parameter type.
            if (node.variable) {
                var exprType = checkExpression(node.variable);
                if (exprType !== anyType && exprType !== stringType) {
                    error(node.variable, Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                }
                else {
                    // run check only former check succeeded to avoid cascading errors
                    checkReferenceExpression(node.variable, Diagnostics.Invalid_left_hand_side_in_for_in_statement); 
                }
            }

            var exprType = checkExpression(node.expression);
            // unknownType is returned i.e. if node.expression is identifier whose name cannot be resolved
            // in this case error about missing name is already reported - do not report extra one
            if (!isTypeAnyTypeObjectTypeOrTypeParameter(exprType) && exprType !== unknownType) {
                error(node.expression, Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }

            checkSourceElement(node.statement);
        }

        function checkBreakOrContinueStatement(node: BreakOrContinueStatement) {
            // TODO: Check that target label is valid
        }

        function getContainingFunction(node: Node): SignatureDeclaration {
            while (true) {
                node = node.parent;
                if (!node || node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.FunctionExpression ||
                    node.kind === SyntaxKind.ArrowFunction || node.kind === SyntaxKind.Method || node.kind === SyntaxKind.Constructor ||
                    node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor) {
                    return <SignatureDeclaration>node;
                }
            }
        }

        function checkReturnStatement(node: ReturnStatement) {
            if (node.expression && !(getNodeLinks(node.expression).flags & NodeCheckFlags.TypeChecked)) {
                var func = getContainingFunction(node);
                if (func) {
                    if (func.kind === SyntaxKind.SetAccessor) {
                        if (node.expression) {
                            error(node.expression, Diagnostics.Setters_cannot_return_a_value);
                        }
                    }
                    else {
                        var returnType = getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                        // do assignability check only if we short circuited in determining return type
                        // - function has explicit type annotation
                        // - function is getter with no type annotation and setter parameter type is used
                        // - function is a constructor (will be special cased below)
                        var checkAssignability =
                            func.type ||
                            (func.kind === SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(<AccessorDeclaration>getDeclarationOfKind(func.symbol, SyntaxKind.SetAccessor)));
                        if (checkAssignability) {
                            checkTypeAssignableTo(checkExpression(node.expression, returnType), returnType, node.expression, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
                        }
                        else if (func.kind == SyntaxKind.Constructor) {
                            // constructor doesn't have explicit return type annontation and yet its return type is known - declaring type
                            // handle constructors and issue specialized error message for them.
                            if (!isTypeAssignableTo(checkExpression(node.expression, returnType), returnType)) {
                                error(node.expression, Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                            }
                        }
                    }
                }
            }
        }

        function checkWithStatement(node: WithStatement) {
            checkExpression(node.expression);
            error(node.expression, Diagnostics.All_symbols_within_a_with_block_will_be_resolved_to_any);
        }

        function checkSwitchStatement(node: SwitchStatement) {
            var expressionType = checkExpression(node.expression);
            forEach(node.clauses, clause => {
                if (clause.expression) {
                    // TypeScript 1.0 spec (April 2014):5.9
                    // In a 'switch' statement, each 'case' expression must be of a type that is assignable to or from the type of the 'switch' expression.
                    var caseType = checkExpression(clause.expression);
                    if (!isTypeAssignableTo(expressionType, caseType)) {
                        // check 'expressionType isAssignableTo caseType' failed, try the reversed check and report errors if it fails
                        checkTypeAssignableTo(caseType, expressionType, clause.expression, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
                    }
                }
                checkBlock(clause);
            });
        }

        function checkLabelledStatement(node: LabelledStatement) {
            checkSourceElement(node.statement);
        }

        function checkThrowStatement(node: ThrowStatement) {
            checkExpression(node.expression);
        }

        function checkTryStatement(node: TryStatement) {
            checkBlock(node.tryBlock);
            if (node.catchBlock) checkBlock(node.catchBlock);
            if (node.finallyBlock) checkBlock(node.finallyBlock);
        }

        function checkIndexConstraints(type: Type) { 

            function checkIndexConstraintForProperty(prop: Symbol, propertyType: Type, indexDeclaration: Declaration, indexType: Type, indexKind: IndexKind): void {
                if (!indexType) {
                    return;
                }

                // index is numeric and property name is not valid numeric literal
                if (indexKind === IndexKind.Number && !isNumericName(prop.name)) {
                    return;
                }

                // perform property check if property or indexer is declared in 'type'
                // this allows to rule out cases when both property and indexer are inherited from the base class
                var errorNode: Node;
                if (prop.parent === type.symbol) {
                    errorNode = prop.valueDeclaration;
                }
                else if (indexDeclaration) {
                    errorNode = indexDeclaration;
                }

                else if (type.flags & TypeFlags.Interface) {
                    // for interfaces property and indexer might be inherited from different bases
                    // check if any base class already has both property and indexer.
                    // check should be performed only if 'type' is the first type that brings property\indexer together
                    var someBaseClassHasBothPropertyAndIndexer = forEach((<InterfaceType>type).baseTypes, base => getPropertyOfType(base, prop.name) && getIndexTypeOfType(base, indexKind));
                    errorNode = someBaseClassHasBothPropertyAndIndexer ? undefined : type.symbol.declarations[0];
                }

                if (errorNode && !isTypeAssignableTo(propertyType, indexType)) {
                    var errorMessage =
                        indexKind === IndexKind.String
                        ? Diagnostics.Property_0_of_type_1_is_not_assignable_to_string_index_type_2
                        : Diagnostics.Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2;
                    error(errorNode, errorMessage, symbolToString(prop), typeToString(propertyType), typeToString(indexType));
                }
            }

            var declaredNumberIndexer = getIndexDeclarationOfSymbol(type.symbol, IndexKind.Number);
            var declaredStringIndexer = getIndexDeclarationOfSymbol(type.symbol, IndexKind.String);

            var stringIndexType = getIndexTypeOfType(type, IndexKind.String);
            var numberIndexType = getIndexTypeOfType(type, IndexKind.Number);

            if (stringIndexType || numberIndexType) {
                forEach(getPropertiesOfType(type), prop => {
                    var propType = getTypeOfSymbol(prop);
                    checkIndexConstraintForProperty(prop, propType, declaredStringIndexer, stringIndexType, IndexKind.String);
                    checkIndexConstraintForProperty(prop, propType, declaredNumberIndexer, numberIndexType, IndexKind.Number);
                });
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
        }

        function checkTypeNameIsReserved(name: Identifier, message: DiagnosticMessage): void {
            // TS 1.0 spec (April 2014): 3.6.1
            // The predefined type keywords are reserved and cannot be used as names of user defined types.
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
        function checkTypeParameters(typeParameterDeclarations: TypeParameterDeclaration[]) {
            if (typeParameterDeclarations) {
                for (var i = 0; i < typeParameterDeclarations.length; i++) {
                    var node = typeParameterDeclarations[i];
                    checkTypeParameter(node);
                    for (var j = 0; j < i; j++) {
                        if (typeParameterDeclarations[j].symbol === node.symbol) {
                            error(node.name, Diagnostics.Duplicate_identifier_0, identifierToString(node.name));
                        }
                    }
                }
            }
        }

        function checkClassDeclaration(node: ClassDeclaration) {
            checkTypeNameIsReserved(node.name, Diagnostics.Class_name_cannot_be_0);
            checkTypeParameters(node.typeParameters);
            checkCollisionWithCapturedThisVariable(node, node.name);
            var symbol = getSymbolOfNode(node);
            var type = <InterfaceType>getDeclaredTypeOfSymbol(symbol);
            var staticType = <ObjectType>getTypeOfSymbol(symbol);
            if (node.baseType) {
                emitExtends = emitExtends || !isInAmbientContext(node);
                checkTypeReference(node.baseType);
            }
            if (type.baseTypes.length) {
                var baseType = type.baseTypes[0];
                checkTypeAssignableTo(type, baseType, node.name, Diagnostics.Class_0_incorrectly_extends_base_class_1_Colon, Diagnostics.Class_0_incorrectly_extends_base_class_1);
                var staticBaseType = getTypeOfSymbol(baseType.symbol);
                checkTypeAssignableTo(staticType, getTypeWithoutConstructors(staticBaseType), node.name,
                    Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1_Colon, Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);
                if (baseType.symbol !== resolveEntityName(node, node.baseType.typeName, SymbolFlags.Value)) {
                    error(node.baseType, Diagnostics.Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0, typeToString(baseType));
                }
                
                // Check that base type can be evaluated as expression
                checkExpression(node.baseType.typeName);

                checkKindsOfPropertyMemberOverrides(type, baseType);
            }
            if (node.implementedTypes) {
                forEach(node.implementedTypes, typeRefNode => {
                    checkTypeReference(typeRefNode);
                    var t = getTypeFromTypeReferenceNode(typeRefNode);
                    if (t !== unknownType) {
                        var declaredType = (t.flags & TypeFlags.Reference) ? (<TypeReference>t).target : t;
                        if (declaredType.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                            checkTypeAssignableTo(type, t, node.name, Diagnostics.Class_0_incorrectly_implements_interface_1_Colon, Diagnostics.Class_0_incorrectly_implements_interface_1);
                        }
                        else {
                            error(typeRefNode, Diagnostics.A_class_may_only_implement_another_class_or_interface);
                        }
                    }
                });
            }
            checkIndexConstraints(type);
            forEach(node.members, checkSourceElement);

            checkTypeForDuplicateIndexSignatures(node);
        }

        function getTargetSymbol(s: Symbol) {
            // if symbol is instantiated it's flags are not copied from the 'target'
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
            var baseProperties = getPropertiesOfType(baseType);
            for (var i = 0, len = baseProperties.length; i < len; ++i) {
                var base = getTargetSymbol(baseProperties[i]);

                if (base.flags & SymbolFlags.Prototype) {
                    continue;
                }

                var derived = getTargetSymbol(getPropertyOfType(type, base.name));
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
                        // method is overridden with method or property\accessor is overridden with property\accessor - correct case
                        continue;
                    }

                    var errorMessage: DiagnosticMessage;
                    if (base.flags & SymbolFlags.Method) {
                        if (derived.flags & SymbolFlags.Accessor) {
                            errorMessage = Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                        }
                        else {
                            Debug.assert(derived.flags & SymbolFlags.Property);
                            errorMessage = Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property;
                        }
                    }
                    else if (base.flags & SymbolFlags.Property) {
                        Debug.assert(derived.flags & SymbolFlags.Method);
                        errorMessage = Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    else {
                        Debug.assert(base.flags & SymbolFlags.Accessor);
                        Debug.assert(derived.flags & SymbolFlags.Method);
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

        function checkInterfaceDeclaration(node: InterfaceDeclaration) {
            checkTypeNameIsReserved(node.name, Diagnostics.Interface_name_cannot_be_0);
            checkTypeParameters(node.typeParameters);
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
                        checkTypeAssignableTo(type, baseType, node.name, Diagnostics.Interface_0_incorrectly_extends_interface_1_Colon, Diagnostics.Interface_0_incorrectly_extends_interface_1);
                    });
                    checkIndexConstraints(type);
                }
            }
            forEach(node.baseTypes, checkTypeReference);
            forEach(node.members, checkSourceElement);

            checkTypeForDuplicateIndexSignatures(node);
        }

        function getConstantValue(node: Expression): number {
            var isNegative = false;
            if (node.kind === SyntaxKind.PrefixOperator) {
                var unaryExpression = <UnaryExpression>node;
                if (unaryExpression.operator === SyntaxKind.MinusToken || unaryExpression.operator === SyntaxKind.PlusToken) {
                    node = unaryExpression.operand;
                    isNegative = unaryExpression.operator === SyntaxKind.MinusToken;
                }
            }
            if (node.kind === SyntaxKind.NumericLiteral) {
                var literalText = (<LiteralExpression>node).text;
                return isNegative ? -literalText : +literalText;
            }

            return undefined;
        }

        function checkEnumDeclaration(node: EnumDeclaration) {
            checkTypeNameIsReserved(node.name, Diagnostics.Enum_name_cannot_be_0);
            checkCollisionWithCapturedThisVariable(node, node.name);
            var enumSymbol = getSymbolOfNode(node);
            var enumType = getDeclaredTypeOfSymbol(enumSymbol);
            var autoValue = 0;
            var ambient = isInAmbientContext(node);
            forEach(node.members, member => {
                var initializer = member.initializer;
                if (initializer) {
                    autoValue = getConstantValue(initializer);
                    if (autoValue === undefined && !ambient) {
                        // Only here do we need to check that the initializer is assignable to the enum type.
                        // If it is a constant value (not undefined), it is syntactically constrained to be a number. 
                        // Also, we do not need to check this for ambients because there is already
                        // a syntax error if it is not a constant.
                        checkTypeAssignableTo(checkExpression(initializer), enumType, initializer, /*chainedMessage*/ undefined, /*terminalMessage*/ undefined);
                    }
                }
                else if (ambient) {
                    autoValue = undefined;
                }

                if (autoValue !== undefined) {
                    getNodeLinks(member).enumMemberValue = autoValue++;
                }
            });

            // Spec 2014 - Section 9.3:
            // It isn't possible for one enum declaration to continue the automatic numbering sequence of another,
            // and when an enum type has multiple declarations, only one declaration is permitted to omit a value
            // for the first member.
            //
            // Only perform this check once per symbol
            var firstDeclaration = getDeclarationOfKind(enumSymbol, node.kind);
            if (node === firstDeclaration) {
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
                if ((declaration.kind === SyntaxKind.ClassDeclaration || (declaration.kind === SyntaxKind.FunctionDeclaration && (<FunctionDeclaration>declaration).body)) && !isInAmbientContext(declaration)) {
                    return declaration;
                }
            }
            return undefined;
        }

        function checkModuleDeclaration(node: ModuleDeclaration) {
            checkCollisionWithCapturedThisVariable(node, node.name);
            var symbol = getSymbolOfNode(node);
            if (symbol.flags & SymbolFlags.ValueModule && symbol.declarations.length > 1 && !isInAmbientContext(node)) {
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
            if (node.name.kind === SyntaxKind.StringLiteral) {
                if (!isGlobalSourceFile(node.parent)) {
                    error(node.name, Diagnostics.Ambient_external_modules_cannot_be_nested_in_other_modules);
                }
                if (isExternalModuleNameRelative(node.name.text)) {
                    error(node.name, Diagnostics.Ambient_external_module_declaration_cannot_specify_relative_module_name);
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
            checkCollisionWithCapturedThisVariable(node, node.name);
            var symbol = getSymbolOfNode(node);
            var target: Symbol;
            
            if (node.entityName) {
                target = resolveImport(symbol);
                // Import declaration for an internal module
                if (target !== unknownSymbol) {
                    if (target.flags & SymbolFlags.Value) {
                        // Target is a value symbol, check that it is not hidden by a local declaration with the same name and
                        // ensure it can be evaluated as an expression
                        var moduleName = getFirstIdentifier(node.entityName);
                        if (resolveEntityName(node, moduleName, SymbolFlags.Value | SymbolFlags.Namespace).flags & SymbolFlags.Namespace) {
                            checkExpression(node.entityName);
                        }
                        else {
                            error(moduleName, Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, identifierToString(moduleName));
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
                    if (isExternalModuleNameRelative(node.externalModuleName.text)) {
                        error(node, Diagnostics.Import_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name);
                        target = unknownSymbol;
                    }
                    else {
                        target = resolveImport(symbol);
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
                case SyntaxKind.Property:
                    return checkPropertyDeclaration(<PropertyDeclaration>node);
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return checkSignatureDeclaration(<SignatureDeclaration>node);
                case SyntaxKind.Method:
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
                case SyntaxKind.FunctionDeclaration:
                    return checkFunctionDeclaration(<FunctionDeclaration>node);
                case SyntaxKind.Block:
                case SyntaxKind.FunctionBlock:
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
                case SyntaxKind.LabelledStatement:
                    return checkLabelledStatement(<LabelledStatement>node);
                case SyntaxKind.ThrowStatement:
                    return checkThrowStatement(<ThrowStatement>node);
                case SyntaxKind.TryStatement:
                    return checkTryStatement(<TryStatement>node);
                case SyntaxKind.VariableDeclaration:
                    return Debug.fail("Checker encountered variable declaration");
                case SyntaxKind.ClassDeclaration:
                    return checkClassDeclaration(<ClassDeclaration>node);
                case SyntaxKind.InterfaceDeclaration:
                    return checkInterfaceDeclaration(<InterfaceDeclaration>node);
                case SyntaxKind.EnumDeclaration:
                    return checkEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return checkModuleDeclaration(<ModuleDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                    return checkImportDeclaration(<ImportDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return checkExportAssignment(<ExportAssignment>node);
            }
        }

        function checkSourceFile(node: SourceFile) {
            var links = getNodeLinks(node);
            if (!(links.flags & NodeCheckFlags.TypeChecked)) {
                emitExtends = false;
                potentialThisCollisions.length = 0;
                forEach(node.statements, checkSourceElement);
                if (isExternalModule(node)) {
                    var symbol = getExportAssignmentSymbol(node.symbol);
                    if (symbol && symbol.flags & SymbolFlags.Import) {
                        // Mark the import as referenced so that we emit it in the final .js file.
                        getSymbolLinks(symbol).referenced = true;
                    }
                }
                if (potentialThisCollisions.length) {
                    forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                    potentialThisCollisions.length = 0;
                }
                if (emitExtends) links.flags |= NodeCheckFlags.EmitExtends;
                links.flags |= NodeCheckFlags.TypeChecked;
            }
        }

        function checkProgram() {
            forEach(program.getSourceFiles(), checkSourceFile);
        }

        function getSortedDiagnostics(): Diagnostic[] {
            if (diagnosticsModified) {
                diagnostics.sort(compareDiagnostics);
                diagnostics = deduplicateSortedDiagnostics(diagnostics);
                diagnosticsModified = false;
            }
            return diagnostics;
        }

        function getDiagnostics(sourceFile?: SourceFile): Diagnostic[] {
            if (sourceFile) {
                checkSourceFile(sourceFile);
                return filter(getSortedDiagnostics(), d => d.file === sourceFile);
            }
            checkProgram();
            return getSortedDiagnostics();
        }

        function getGlobalDiagnostics(): Diagnostic[] {
            return filter(getSortedDiagnostics(), d => !d.file);
        }

        // Language service support

        function getNodeAtPosition(sourceFile: SourceFile, position: number): Node {
            function findChildAtPosition(parent: Node) {
                var child = forEachChild(parent, node => {
                    if (position >= node.pos && position <= node.end && position >= getTokenPosOfNode(node)) {
                        return findChildAtPosition(node);
                    }
                });
                return child || parent;
            }
            if (position < sourceFile.pos) position = sourceFile.pos;
            if (position > sourceFile.end) position = sourceFile.end;
            return findChildAtPosition(sourceFile);
        }

        function getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[] {
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
                    case SyntaxKind.CatchBlock:
                        if ((<CatchBlock>location).variable.text) {
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

        // True if the given identifier is the identifier of a declaration node
        function isDeclarationIdentifier(identifier: Identifier): boolean {
            if (identifier.parent) {
                switch (identifier.parent.kind) {
                    case SyntaxKind.TypeParameter:
                    case SyntaxKind.Parameter:
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.Property:
                    case SyntaxKind.PropertyAssignment:
                    case SyntaxKind.EnumMember:
                    case SyntaxKind.Method:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ImportDeclaration:
                        return (<Declaration>identifier.parent).name === identifier;
                    case SyntaxKind.CatchBlock:
                        return (<CatchBlock>identifier.parent).variable === identifier;
                }
            }
            return false;
        }

        // True if the given identifier is part of a type reference
        function isTypeReferenceIdentifier(identifier: Identifier): boolean {
            var node: Node = identifier;
            while (node.parent && node.parent.kind === SyntaxKind.QualifiedName) node = node.parent;
            return node.parent && node.parent.kind === SyntaxKind.TypeReference;
        }

        function isExpression(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.ArrayLiteral:
                case SyntaxKind.ObjectLiteral:
                case SyntaxKind.PropertyAccess:
                case SyntaxKind.IndexedAccess:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.TypeAssertion:
                case SyntaxKind.ParenExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.PrefixOperator:
                case SyntaxKind.PostfixOperator:
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.ConditionalExpression:
                    return true;
                case SyntaxKind.QualifiedName:
                    while (node.parent && node.parent.kind === SyntaxKind.QualifiedName) node = node.parent;
                    return node.parent && node.parent.kind === SyntaxKind.TypeQuery;
                case SyntaxKind.Identifier:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.StringLiteral:
                    var parent = node.parent;
                    if (parent) {
                        if (isExpression(parent)) return true;
                        switch (parent.kind) {
                            case SyntaxKind.VariableDeclaration:
                            case SyntaxKind.Parameter:
                            case SyntaxKind.Property:
                            case SyntaxKind.EnumMember:
                                return (<VariableDeclaration>parent).initializer === node;
                            case SyntaxKind.ExpressionStatement:
                            case SyntaxKind.IfStatement:
                            case SyntaxKind.DoStatement:
                            case SyntaxKind.WhileStatement:
                            case SyntaxKind.ReturnStatement:
                            case SyntaxKind.WithStatement:
                            case SyntaxKind.SwitchStatement:
                            case SyntaxKind.CaseClause:
                            case SyntaxKind.ThrowStatement:
                            case SyntaxKind.SwitchStatement:
                                return (<ExpressionStatement>parent).expression === node;
                            case SyntaxKind.ForStatement:
                                return (<ForStatement>parent).initializer === node || (<ForStatement>parent).condition === node ||
                                    (<ForStatement>parent).iterator === node;
                            case SyntaxKind.ForInStatement:
                                return (<ForInStatement>parent).variable === node || (<ForInStatement>parent).expression === node;
                        }
                    }
            }
            return false;
        }

        function getSymbolOfIdentifier(identifier: Identifier) {
            if (isExpression(identifier)) {
                if (isRightSideOfQualifiedName()) {
                    // TODO
                }
                return resolveEntityName(identifier, identifier, SymbolFlags.Value);
            }
            if (isDeclarationIdentifier(identifier)) {
                return getSymbolOfNode(identifier.parent);
            }
            if (isTypeReferenceIdentifier(identifier)) {
                var entityName = isRightSideOfQualifiedName() ? identifier.parent : identifier;
                var meaning = entityName.parent.kind === SyntaxKind.TypeReference ? SymbolFlags.Type : SymbolFlags.Namespace;
                return resolveEntityName(entityName, entityName, meaning);
            }
            function isRightSideOfQualifiedName() {
                return (identifier.parent.kind === SyntaxKind.QualifiedName || identifier.parent.kind === SyntaxKind.PropertyAccess) &&
                    (<QualifiedName>identifier.parent).right === identifier;
            }
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
                if (node.locals && hasProperty(node.locals, name) && node.locals[name].flags & (SymbolFlags.Value | SymbolFlags.ExportValue)) {
                    return false;
                }
            }
            return true;
        }

        function getLocalNameOfContainer(container: Declaration): string {
            var links = getNodeLinks(container);
            if (!links.localModuleName) {
                var prefix = "";
                var name = unescapeIdentifier(container.name.text);
                while (!isUniqueLocalName(escapeIdentifier(prefix + name), container)) {
                    prefix += "_";
                }
                links.localModuleName = prefix + getSourceTextOfNode(container.name);
            }
            return links.localModuleName;
        }

        function getLocalNameForSymbol(symbol: Symbol, location: Node): string {
            var node = location;
            while (node) {
                if ((node.kind === SyntaxKind.ModuleDeclaration || node.kind === SyntaxKind.EnumDeclaration) && getSymbolOfNode(node) === symbol) {
                    return getLocalNameOfContainer(node);
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

        function getPropertyAccessSubstitution(node: PropertyAccess): string {
            var symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol && (symbol.flags & SymbolFlags.EnumMember)) {
                var declaration = symbol.valueDeclaration;
                var constantValue: number;
                if (declaration.kind === SyntaxKind.EnumMember && (constantValue = getNodeLinks(declaration).enumMemberValue) !== undefined) {
                    return constantValue.toString() + " /* " + identifierToString(declaration.name) + " */";
                }
            }
        }

        function getExportAssignmentName(node: SourceFile): string {
            var symbol = getExportAssignmentSymbol(getSymbolOfNode(node));
            return symbol && symbolIsValue(symbol) ? symbolToString(symbol): undefined;
        }

        function isTopLevelValueImportedViaEntityName(node: ImportDeclaration): boolean {
            if (node.parent.kind !== SyntaxKind.SourceFile || !node.entityName) {
                // parent is not source file or it is not reference to internal module
                return false;
            }
            var symbol = getSymbolOfNode(node);
            var target = resolveImport(symbol);
            return target !== unknownSymbol && ((target.flags & SymbolFlags.Value) !== 0);
        }

        function shouldEmitDeclarations() {
            // If the declaration emit and there are no errors being reported in program or by checker
            // declarations can be emitted
            return program.getCompilerOptions().declaration &&
                !program.getDiagnostics().length &&
                !getDiagnostics().length;
        }

        function isReferencedImportDeclaration(node: ImportDeclaration): boolean {
            var symbol = getSymbolOfNode(node);
            if (getSymbolLinks(symbol).referenced) {
                return true;
            }
            // logic below will answer 'true' for exported import declaration in a nested module that itself is not exported.
            // As a consequence this might cause emitting extra.
            if (node.flags & NodeFlags.Export) {
                var target = resolveImport(symbol);
                if (target !== unknownSymbol && target.flags & SymbolFlags.Value) {
                    return true;
                }
            }
            return false;
        }

        function isImplementationOfOverload(node: FunctionDeclaration) {
            if (node.body) {
                var symbol = getSymbolOfNode(node);
                return getSignaturesOfSymbol(symbol).length > 1;
            }
            return false;
        }

        function getNodeCheckFlags(node: Node): NodeCheckFlags {
            return getNodeLinks(node).flags;
        }

        function getEnumMemberValue(node: EnumMember): number {
            return getNodeLinks(node).enumMemberValue;
        }

        function writeTypeAtLocation(location: Node, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: TextWriter) {
            // Get type of the symbol if this is the valid symbol otherwise get type at location
            var symbol = getSymbolOfNode(location);
            var type = symbol && !(symbol.flags & SymbolFlags.TypeLiteral) ? getTypeOfSymbol(symbol) : getTypeFromTypeNode(location);

            writeTypeToTextWriter(type, enclosingDeclaration, flags, writer);
        }

        function writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: TextWriter) {
            var signature = getSignatureFromDeclaration(signatureDeclaration);
            writeTypeToTextWriter(getReturnTypeOfSignature(signature), enclosingDeclaration, flags , writer);
        }

        function invokeEmitter() {
            var resolver: EmitResolver = {
                getProgram: () => program,
                getLocalNameOfContainer: getLocalNameOfContainer,
                getExpressionNamePrefix: getExpressionNamePrefix,
                getPropertyAccessSubstitution: getPropertyAccessSubstitution,
                getExportAssignmentName: getExportAssignmentName,
                isReferencedImportDeclaration: isReferencedImportDeclaration,
                getNodeCheckFlags: getNodeCheckFlags,
                getEnumMemberValue: getEnumMemberValue,
                isTopLevelValueImportedViaEntityName: isTopLevelValueImportedViaEntityName,
                shouldEmitDeclarations: shouldEmitDeclarations,
                isDeclarationVisible: isDeclarationVisible,
                isImplementationOfOverload: isImplementationOfOverload,
                writeTypeAtLocation: writeTypeAtLocation,
                writeReturnTypeOfSignatureDeclaration: writeReturnTypeOfSignatureDeclaration
            };
            checkProgram();
            return emitFiles(resolver);
        }

        function initializeTypeChecker() {
            // Bind all source files and propagate errors
            forEach(program.getSourceFiles(), file => {
                bindSourceFile(file);
                forEach(file.semanticErrors, addDiagnostic);
            });
            // Initialize global symbol table
            forEach(program.getSourceFiles(), file => {
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
            globalArrayType = getGlobalType("Array", 1);
            globalObjectType = getGlobalType("Object");
            globalFunctionType = getGlobalType("Function");
            globalStringType = getGlobalType("String");
            globalNumberType = getGlobalType("Number");
            globalBooleanType = getGlobalType("Boolean");
            globalRegExpType = getGlobalType("RegExp");
        }

        initializeTypeChecker();
        checker = {
            getProgram: () => program,
            getDiagnostics: getDiagnostics,
            getGlobalDiagnostics: getGlobalDiagnostics,
            getNodeCount: () => sum(program.getSourceFiles(), "nodeCount"),
            getIdentifierCount: () => sum(program.getSourceFiles(), "identifierCount"),
            getSymbolCount: () => sum(program.getSourceFiles(), "symbolCount"),
            getTypeCount: () => typeCount,
            checkProgram: checkProgram,
            emitFiles: invokeEmitter,
            getSymbolOfNode: getSymbolOfNode,
            getParentOfSymbol: getParentOfSymbol,
            getTypeOfSymbol: getTypeOfSymbol,
            getDeclaredTypeOfSymbol: getDeclaredTypeOfSymbol,
            getPropertiesOfType: getPropertiesOfType,
            getSignaturesOfType: getSignaturesOfType,
            getIndexTypeOfType: getIndexTypeOfType,
            getReturnTypeOfSignature: getReturnTypeOfSignature,
            resolveEntityName: resolveEntityName,
            getSymbolsInScope: getSymbolsInScope,
            getSymbolOfIdentifier: getSymbolOfIdentifier
        };
        return checker;
    }
}
