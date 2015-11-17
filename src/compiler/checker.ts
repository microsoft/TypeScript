/// <reference path="binder.ts"/>

/* @internal */
namespace ts {
    let nextSymbolId = 1;
    let nextNodeId = 1;
    let nextMergeId = 1;

    export function getNodeId(node: Node): number {
        if (!node.id) node.id = nextNodeId++;
        return node.id;
    }

    export let checkTime = 0;

    export function getSymbolId(symbol: Symbol): number {
        if (!symbol.id) {
            symbol.id = nextSymbolId++;
        }

        return symbol.id;
    }

    export function createTypeChecker(host: TypeCheckerHost, produceDiagnostics: boolean): TypeChecker {
        // Cancellation that controls whether or not we can cancel in the middle of type checking.
        // In general cancelling is *not* safe for the type checker.  We might be in the middle of
        // computing something, and we will leave our internals in an inconsistent state.  Callers
        // who set the cancellation token should catch if a cancellation exception occurs, and
        // should throw away and create a new TypeChecker.
        //
        // Currently we only support setting the cancellation token when getting diagnostics.  This
        // is because diagnostics can be quite expensive, and we want to allow hosts to bail out if
        // they no longer need the information (for example, if the user started editing again).
        let cancellationToken: CancellationToken;

        const Symbol = objectAllocator.getSymbolConstructor();
        const Type = objectAllocator.getTypeConstructor();
        const Signature = objectAllocator.getSignatureConstructor();

        let typeCount = 0;
        let symbolCount = 0;

        const emptyArray: any[] = [];
        const emptySymbols: SymbolTable = {};

        const compilerOptions = host.getCompilerOptions();
        const languageVersion = compilerOptions.target || ScriptTarget.ES3;
        const modulekind = compilerOptions.module ? compilerOptions.module : languageVersion === ScriptTarget.ES6 ? ModuleKind.ES6 : ModuleKind.None;

        const emitResolver = createResolver();

        const undefinedSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "undefined");
        const argumentsSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "arguments");

        const checker: TypeChecker = {
            getNodeCount: () => sum(host.getSourceFiles(), "nodeCount"),
            getIdentifierCount: () => sum(host.getSourceFiles(), "identifierCount"),
            getSymbolCount: () => sum(host.getSourceFiles(), "symbolCount") + symbolCount,
            getTypeCount: () => typeCount,
            isUndefinedSymbol: symbol => symbol === undefinedSymbol,
            isArgumentsSymbol: symbol => symbol === argumentsSymbol,
            getDiagnostics,
            getGlobalDiagnostics,

            // The language service will always care about the narrowed type of a symbol, because that is
            // the type the language says the symbol should have.
            getTypeOfSymbolAtLocation: getNarrowedTypeOfSymbol,
            getDeclaredTypeOfSymbol,
            getPropertiesOfType,
            getPropertyOfType,
            getSignaturesOfType,
            getIndexTypeOfType,
            getBaseTypes,
            getReturnTypeOfSignature,
            getSymbolsInScope,
            getSymbolAtLocation,
            getShorthandAssignmentValueSymbol,
            getTypeAtLocation: getTypeOfNode,
            typeToString,
            getSymbolDisplayBuilder,
            symbolToString,
            getAugmentedPropertiesOfType,
            getRootSymbols,
            getContextualType,
            getFullyQualifiedName,
            getResolvedSignature,
            getConstantValue,
            isValidPropertyAccess,
            getSignatureFromDeclaration,
            isImplementationOfOverload,
            getAliasedSymbol: resolveAlias,
            getEmitResolver,
            getExportsOfModule: getExportsOfModuleAsArray,

            getJsxElementAttributesType,
            getJsxIntrinsicTagNames,
            isOptionalParameter
        };

        const unknownSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "unknown");
        const resolvingSymbol = createSymbol(SymbolFlags.Transient, "__resolving__");

        const anyType = createIntrinsicType(TypeFlags.Any, "any");
        const stringType = createIntrinsicType(TypeFlags.String, "string");
        const numberType = createIntrinsicType(TypeFlags.Number, "number");
        const booleanType = createIntrinsicType(TypeFlags.Boolean, "boolean");
        const esSymbolType = createIntrinsicType(TypeFlags.ESSymbol, "symbol");
        const voidType = createIntrinsicType(TypeFlags.Void, "void");
        const undefinedType = createIntrinsicType(TypeFlags.Undefined | TypeFlags.ContainsUndefinedOrNull, "undefined");
        const nullType = createIntrinsicType(TypeFlags.Null | TypeFlags.ContainsUndefinedOrNull, "null");
        const unknownType = createIntrinsicType(TypeFlags.Any, "unknown");

        const emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        const emptyUnionType = emptyObjectType;
        const emptyGenericType = <GenericType><ObjectType>createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        emptyGenericType.instantiations = {};

        const anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        // The anyFunctionType contains the anyFunctionType by definition. The flag is further propagated
        // in getPropagatingFlagsOfTypes, and it is checked in inferFromTypes.
        anyFunctionType.flags |= TypeFlags.ContainsAnyFunctionType;

        const noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);

        const anySignature = createSignature(undefined, undefined, emptyArray, anyType, undefined, 0, /*hasRestParameter*/ false, /*hasStringLiterals*/ false);
        const unknownSignature = createSignature(undefined, undefined, emptyArray, unknownType, undefined, 0, /*hasRestParameter*/ false, /*hasStringLiterals*/ false);

        const globals: SymbolTable = {};

        let globalESSymbolConstructorSymbol: Symbol;

        let getGlobalPromiseConstructorSymbol: () => Symbol;

        let globalObjectType: ObjectType;
        let globalFunctionType: ObjectType;
        let globalArrayType: GenericType;
        let globalStringType: ObjectType;
        let globalNumberType: ObjectType;
        let globalBooleanType: ObjectType;
        let globalRegExpType: ObjectType;
        let globalTemplateStringsArrayType: ObjectType;
        let globalESSymbolType: ObjectType;
        let jsxElementType: ObjectType;
        /** Lazily loaded, use getJsxIntrinsicElementType() */
        let jsxIntrinsicElementsType: ObjectType;
        let globalIterableType: GenericType;
        let globalIteratorType: GenericType;
        let globalIterableIteratorType: GenericType;

        let anyArrayType: Type;
        let getGlobalClassDecoratorType: () => ObjectType;
        let getGlobalParameterDecoratorType: () => ObjectType;
        let getGlobalPropertyDecoratorType: () => ObjectType;
        let getGlobalMethodDecoratorType: () => ObjectType;
        let getGlobalTypedPropertyDescriptorType: () => ObjectType;
        let getGlobalPromiseType: () => ObjectType;
        let tryGetGlobalPromiseType: () => ObjectType;
        let getGlobalPromiseLikeType: () => ObjectType;
        let getInstantiatedGlobalPromiseLikeType: () => ObjectType;
        let getGlobalPromiseConstructorLikeType: () => ObjectType;
        let getGlobalThenableType: () => ObjectType;

        let jsxElementClassType: Type;

        const tupleTypes: Map<TupleType> = {};
        const unionTypes: Map<UnionType> = {};
        const intersectionTypes: Map<IntersectionType> = {};
        const stringLiteralTypes: Map<StringLiteralType> = {};
        let emitExtends = false;
        let emitDecorate = false;
        let emitParam = false;
        let emitAwaiter = false;
        const emitGenerator = false;

        const resolutionTargets: TypeSystemEntity[] = [];
        const resolutionResults: boolean[] = [];
        const resolutionPropertyNames: TypeSystemPropertyName[] = [];

        const mergedSymbols: Symbol[] = [];
        const symbolLinks: SymbolLinks[] = [];
        const nodeLinks: NodeLinks[] = [];
        const potentialThisCollisions: Node[] = [];
        const awaitedTypeStack: number[] = [];

        const diagnostics = createDiagnosticCollection();

        const primitiveTypeInfo: Map<{ type: Type; flags: TypeFlags }> = {
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
            },
            "symbol": {
                type: esSymbolType,
                flags: TypeFlags.ESSymbol
            },
            "undefined": {
                type: undefinedType,
                flags: TypeFlags.ContainsUndefinedOrNull
            }
        };

        const JsxNames = {
            JSX: "JSX",
            IntrinsicElements: "IntrinsicElements",
            ElementClass: "ElementClass",
            ElementAttributesPropertyNameContainer: "ElementAttributesProperty",
            Element: "Element"
        };

        const subtypeRelation: Map<RelationComparisonResult> = {};
        const assignableRelation: Map<RelationComparisonResult> = {};
        const identityRelation: Map<RelationComparisonResult> = {};

        // This is for caching the result of getSymbolDisplayBuilder. Do not access directly.
        let _displayBuilder: SymbolDisplayBuilder;

        type TypeSystemEntity = Symbol | Type | Signature;

        const enum TypeSystemPropertyName {
            Type,
            ResolvedBaseConstructorType,
            DeclaredType,
            ResolvedReturnType
        }

        initializeTypeChecker();

        return checker;

        function getEmitResolver(sourceFile: SourceFile, cancellationToken: CancellationToken) {
            // Ensure we have all the type information in place for this file so that all the
            // emitter questions of this resolver will return the right information.
            getDiagnostics(sourceFile, cancellationToken);
            return emitResolver;
        }

        function error(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
            const diagnostic = location
                ? createDiagnosticForNode(location, message, arg0, arg1, arg2)
                : createCompilerDiagnostic(message, arg0, arg1, arg2);
            diagnostics.add(diagnostic);
        }

        function createSymbol(flags: SymbolFlags, name: string): Symbol {
            symbolCount++;
            return new Symbol(flags, name);
        }

        function getExcludedSymbolFlags(flags: SymbolFlags): SymbolFlags {
            let result: SymbolFlags = 0;
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
            if (flags & SymbolFlags.Alias) result |= SymbolFlags.AliasExcludes;
            return result;
        }

        function recordMergedSymbol(target: Symbol, source: Symbol) {
            if (!source.mergeId) source.mergeId = nextMergeId++;
            mergedSymbols[source.mergeId] = target;
        }

        function cloneSymbol(symbol: Symbol): Symbol {
            const result = createSymbol(symbol.flags | SymbolFlags.Merged, symbol.name);
            result.declarations = symbol.declarations.slice(0);
            result.parent = symbol.parent;
            if (symbol.valueDeclaration) result.valueDeclaration = symbol.valueDeclaration;
            if (symbol.constEnumOnlyModule) result.constEnumOnlyModule = true;
            if (symbol.members) result.members = cloneSymbolTable(symbol.members);
            if (symbol.exports) result.exports = cloneSymbolTable(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }

        function mergeSymbol(target: Symbol, source: Symbol) {
            if (!(target.flags & getExcludedSymbolFlags(source.flags))) {
                if (source.flags & SymbolFlags.ValueModule && target.flags & SymbolFlags.ValueModule && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                    // reset flag when merging instantiated module into value module that has only const enums
                    target.constEnumOnlyModule = false;
                }
                target.flags |= source.flags;
                if (source.valueDeclaration &&
                    (!target.valueDeclaration ||
                     (target.valueDeclaration.kind === SyntaxKind.ModuleDeclaration && source.valueDeclaration.kind !== SyntaxKind.ModuleDeclaration))) {
                    // other kinds of value declarations take precedence over modules
                    target.valueDeclaration = source.valueDeclaration;
                }
                forEach(source.declarations, node => {
                    target.declarations.push(node);
                });
                if (source.members) {
                    if (!target.members) target.members = {};
                    mergeSymbolTable(target.members, source.members);
                }
                if (source.exports) {
                    if (!target.exports) target.exports = {};
                    mergeSymbolTable(target.exports, source.exports);
                }
                recordMergedSymbol(target, source);
            }
            else {
                const message = target.flags & SymbolFlags.BlockScopedVariable || source.flags & SymbolFlags.BlockScopedVariable
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
            const result: SymbolTable = {};
            for (const id in symbolTable) {
                if (hasProperty(symbolTable, id)) {
                    result[id] = symbolTable[id];
                }
            }
            return result;
        }

        function mergeSymbolTable(target: SymbolTable, source: SymbolTable) {
            for (const id in source) {
                if (hasProperty(source, id)) {
                    if (!hasProperty(target, id)) {
                        target[id] = source[id];
                    }
                    else {
                        let symbol = target[id];
                        if (!(symbol.flags & SymbolFlags.Merged)) {
                            target[id] = symbol = cloneSymbol(symbol);
                        }
                        mergeSymbol(symbol, source[id]);
                    }
                }
            }
        }

        function getSymbolLinks(symbol: Symbol): SymbolLinks {
            if (symbol.flags & SymbolFlags.Transient) return <TransientSymbol>symbol;
            const id = getSymbolId(symbol);
            return symbolLinks[id] || (symbolLinks[id] = {});
        }

        function getNodeLinks(node: Node): NodeLinks {
            const nodeId = getNodeId(node);
            return nodeLinks[nodeId] || (nodeLinks[nodeId] = {});
        }

        function getSourceFile(node: Node): SourceFile {
            return <SourceFile>getAncestor(node, SyntaxKind.SourceFile);
        }

        function isGlobalSourceFile(node: Node) {
            return node.kind === SyntaxKind.SourceFile && !isExternalOrCommonJsModule(<SourceFile>node);
        }

        function getSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags): Symbol {
            if (meaning && hasProperty(symbols, name)) {
                const symbol = symbols[name];
                Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
                if (symbol.flags & meaning) {
                    return symbol;
                }
                if (symbol.flags & SymbolFlags.Alias) {
                    const target = resolveAlias(symbol);
                    // Unknown symbol means an error occurred in alias resolution, treat it as positive answer to avoid cascading errors
                    if (target === unknownSymbol || target.flags & meaning) {
                        return symbol;
                    }
                }
            }
            // return undefined if we can't find a symbol.
        }

        function isBlockScopedNameDeclaredBeforeUse(declaration: Declaration, usage: Node): boolean {
            const declarationFile = getSourceFileOfNode(declaration);
            const useFile = getSourceFileOfNode(usage);
            if (declarationFile !== useFile) {
                if (modulekind || (!compilerOptions.outFile && !compilerOptions.out)) {
                    // nodes are in different files and order cannot be determines
                    return true;
                }

                const sourceFiles = host.getSourceFiles();
                return indexOf(sourceFiles, declarationFile) <= indexOf(sourceFiles, useFile);
            }

            if (declaration.pos <= usage.pos) {
                // declaration is before usage
                // still might be illegal if usage is in the initializer of the variable declaration
                return declaration.kind !== SyntaxKind.VariableDeclaration ||
                    !isImmediatelyUsedInInitializerOfBlockScopedVariable(<VariableDeclaration>declaration, usage);
            }

            // declaration is after usage
            // can be legal if usage is deferred (i.e. inside function or in initializer of instance property)
            return isUsedInFunctionOrNonStaticProperty(declaration, usage);

            function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration: VariableDeclaration, usage: Node): boolean {
                const container = getEnclosingBlockScopeContainer(declaration);

                if (declaration.parent.parent.kind === SyntaxKind.VariableStatement ||
                    declaration.parent.parent.kind === SyntaxKind.ForStatement) {
                    // variable statement/for statement case,
                    // use site should not be inside variable declaration (initializer of declaration or binding element)
                    return isSameScopeDescendentOf(usage, declaration, container);
                }
                else if (declaration.parent.parent.kind === SyntaxKind.ForOfStatement ||
                    declaration.parent.parent.kind === SyntaxKind.ForInStatement) {
                    // ForIn/ForOf case - use site should not be used in expression part
                    const expression = (<ForInStatement | ForOfStatement>declaration.parent.parent).expression;
                    return isSameScopeDescendentOf(usage, expression, container);
                }
            }

            function isUsedInFunctionOrNonStaticProperty(declaration: Declaration, usage: Node): boolean {
                const container = getEnclosingBlockScopeContainer(declaration);
                let current = usage;
                while (current) {
                    if (current === container) {
                        return false;
                    }

                    if (isFunctionLike(current)) {
                        return true;
                    }

                    const initializerOfNonStaticProperty = current.parent &&
                        current.parent.kind === SyntaxKind.PropertyDeclaration &&
                        (current.parent.flags & NodeFlags.Static) === 0 &&
                        (<PropertyDeclaration>current.parent).initializer === current;

                    if (initializerOfNonStaticProperty) {
                        return true;
                    }

                    current = current.parent;
                }
                return false;
            }
        }

        // Resolve a given name for a given meaning at a given location. An error is reported if the name was not found and
        // the nameNotFoundMessage argument is not undefined. Returns the resolved symbol, or undefined if no symbol with
        // the given name can be found.
        function resolveName(location: Node, name: string, meaning: SymbolFlags, nameNotFoundMessage: DiagnosticMessage, nameArg: string | Identifier): Symbol {
            let result: Symbol;
            let lastLocation: Node;
            let propertyWithInvalidInitializer: Node;
            const errorLocation = location;
            let grandparent: Node;

            loop: while (location) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = getSymbol(location.locals, name, meaning)) {
                        // Type parameters of a function are in scope in the entire function declaration, including the parameter
                        // list and return type. However, local types are only in scope in the function body.
                        if (!(meaning & SymbolFlags.Type) ||
                            !(result.flags & (SymbolFlags.Type & ~SymbolFlags.TypeParameter)) ||
                            !isFunctionLike(location) ||
                            lastLocation === (<FunctionLikeDeclaration>location).body) {
                            break loop;
                        }
                        result = undefined;
                    }
                }
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalOrCommonJsModule(<SourceFile>location)) break;
                    case SyntaxKind.ModuleDeclaration:
                        const moduleExports = getSymbolOfNode(location).exports;
                        if (location.kind === SyntaxKind.SourceFile ||
                            (location.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>location).name.kind === SyntaxKind.StringLiteral)) {

                            // It's an external module. First see if the module has an export default and if the local
                            // name of that export default matches.
                            if (result = moduleExports["default"]) {
                                const localSymbol = getLocalSymbolForExportDefault(result);
                                if (localSymbol && (result.flags & meaning) && localSymbol.name === name) {
                                    break loop;
                                }
                                result = undefined;
                            }

                            // Because of module/namespace merging, a module's exports are in scope,
                            // yet we never want to treat an export specifier as putting a member in scope. 
                            // Therefore, if the name we find is purely an export specifier, it is not actually considered in scope.
                            // Two things to note about this:
                            //     1. We have to check this without calling getSymbol. The problem with calling getSymbol
                            //        on an export specifier is that it might find the export specifier itself, and try to
                            //        resolve it as an alias. This will cause the checker to consider the export specifier
                            //        a circular alias reference when it might not be.
                            //     2. We check === SymbolFlags.Alias in order to check that the symbol is *purely*
                            //        an alias. If we used &, we'd be throwing out symbols that have non alias aspects,
                            //        which is not the desired behavior.
                            if (hasProperty(moduleExports, name) &&
                                moduleExports[name].flags === SymbolFlags.Alias &&
                                getDeclarationOfKind(moduleExports[name], SyntaxKind.ExportSpecifier)) {
                                break;
                            }
                        }

                        if (result = getSymbol(moduleExports, name, meaning & SymbolFlags.ModuleMember)) {
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
                        if (isClassLike(location.parent) && !(location.flags & NodeFlags.Static)) {
                            const ctor = findConstructorDeclaration(<ClassLikeDeclaration>location.parent);
                            if (ctor && ctor.locals) {
                                if (getSymbol(ctor.locals, name, meaning & SymbolFlags.Value)) {
                                    // Remember the property node, it will be used later to report appropriate error
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
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
                        if (location.kind === SyntaxKind.ClassExpression && meaning & SymbolFlags.Class) {
                            const className = (<ClassExpression>location).name;
                            if (className && name === className.text) {
                                result = location.symbol;
                                break loop;
                            }
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
                        grandparent = location.parent.parent;
                        if (isClassLike(grandparent) || grandparent.kind === SyntaxKind.InterfaceDeclaration) {
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
                        if (meaning & SymbolFlags.Variable && name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        break;
                    case SyntaxKind.FunctionExpression:
                        if (meaning & SymbolFlags.Variable && name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }

                        if (meaning & SymbolFlags.Function) {
                            const functionName = (<FunctionExpression>location).name;
                            if (functionName && name === functionName.text) {
                                result = location.symbol;
                                break loop;
                            }
                        }
                        break;
                    case SyntaxKind.Decorator:
                        // Decorators are resolved at the class declaration. Resolving at the parameter
                        // or member would result in looking up locals in the method.
                        //
                        //   function y() {}
                        //   class C {
                        //       method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
                        //   }
                        //
                        if (location.parent && location.parent.kind === SyntaxKind.Parameter) {
                            location = location.parent;
                        }
                        //
                        //   function y() {}
                        //   class C {
                        //       @y method(x, y) {} // <-- decorator y should be resolved at the class declaration, not the method.
                        //   }
                        //
                        if (location.parent && isClassElement(location.parent)) {
                            location = location.parent;
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
                    const propertyName = (<PropertyDeclaration>propertyWithInvalidInitializer).name;
                    error(errorLocation, Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor,
                        declarationNameToString(propertyName), typeof nameArg === "string" ? nameArg : declarationNameToString(nameArg));
                    return undefined;
                }

                // Only check for block-scoped variable if we are looking for the
                // name with variable meaning
                //      For example,
                //          declare module foo {
                //              interface bar {}
                //          }
                //      const foo/*1*/: foo/*2*/.bar;
                // The foo at /*1*/ and /*2*/ will share same symbol with two meaning
                // block - scope variable and namespace module. However, only when we
                // try to resolve name in /*1*/ which is used in variable position,
                // we want to check for block- scoped
                if (meaning & SymbolFlags.BlockScopedVariable) {
                    const exportOrLocalSymbol = getExportSymbolOfValueSymbolIfExported(result);
                    if (exportOrLocalSymbol.flags & SymbolFlags.BlockScopedVariable) {
                        checkResolvedBlockScopedVariable(exportOrLocalSymbol, errorLocation);
                    }
                }
            }
            return result;
        }

        function checkResolvedBlockScopedVariable(result: Symbol, errorLocation: Node): void {
            Debug.assert((result.flags & SymbolFlags.BlockScopedVariable) !== 0);
            // Block-scoped variables cannot be used before their definition
            const declaration = forEach(result.declarations, d => isBlockOrCatchScoped(d) ? d : undefined);

            Debug.assert(declaration !== undefined, "Block-scoped variable declaration is undefined");

            if (!isBlockScopedNameDeclaredBeforeUse(<Declaration>getAncestor(declaration, SyntaxKind.VariableDeclaration), errorLocation)) {
                error(errorLocation, Diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationNameToString(declaration.name));
            }
        }

        /* Starting from 'initial' node walk up the parent chain until 'stopAt' node is reached.
         * If at any point current node is equal to 'parent' node - return true.
         * Return false if 'stopAt' node is reached or isFunctionLike(current) === true.
         */
        function isSameScopeDescendentOf(initial: Node, parent: Node, stopAt: Node): boolean {
            if (!parent) {
                return false;
            }
            for (let current = initial; current && current !== stopAt && !isFunctionLike(current); current = current.parent) {
                if (current === parent) {
                    return true;
                }
            }
            return false;
        }

        function getAnyImportSyntax(node: Node): AnyImportSyntax {
            if (isAliasSymbolDeclaration(node)) {
                if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
                    return <ImportEqualsDeclaration>node;
                }

                while (node && node.kind !== SyntaxKind.ImportDeclaration) {
                    node = node.parent;
                }
                return <ImportDeclaration>node;
            }
        }

        function getDeclarationOfAliasSymbol(symbol: Symbol): Declaration {
            return forEach(symbol.declarations, d => isAliasSymbolDeclaration(d) ? d : undefined);
        }

        function getTargetOfImportEqualsDeclaration(node: ImportEqualsDeclaration): Symbol {
            if (node.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                return resolveExternalModuleSymbol(resolveExternalModuleName(node, getExternalModuleImportEqualsDeclarationExpression(node)));
            }
            return getSymbolOfPartOfRightHandSideOfImportEquals(<EntityName>node.moduleReference, node);
        }

        function getTargetOfImportClause(node: ImportClause): Symbol {
            const moduleSymbol = resolveExternalModuleName(node, (<ImportDeclaration>node.parent).moduleSpecifier);
            if (moduleSymbol) {
                const exportDefaultSymbol = resolveSymbol(moduleSymbol.exports["default"]);
                if (!exportDefaultSymbol) {
                    error(node.name, Diagnostics.Module_0_has_no_default_export, symbolToString(moduleSymbol));
                }
                return exportDefaultSymbol;
            }
        }

        function getTargetOfNamespaceImport(node: NamespaceImport): Symbol {
            const moduleSpecifier = (<ImportDeclaration>node.parent.parent).moduleSpecifier;
            return resolveESModuleSymbol(resolveExternalModuleName(node, moduleSpecifier), moduleSpecifier);
        }

        function getMemberOfModuleVariable(moduleSymbol: Symbol, name: string): Symbol {
            if (moduleSymbol.flags & SymbolFlags.Variable) {
                const typeAnnotation = (<VariableDeclaration>moduleSymbol.valueDeclaration).type;
                if (typeAnnotation) {
                    return getPropertyOfType(getTypeFromTypeNode(typeAnnotation), name);
                }
            }
        }

        // This function creates a synthetic symbol that combines the value side of one symbol with the
        // type/namespace side of another symbol. Consider this example:
        //
        //   declare module graphics {
        //       interface Point {
        //           x: number;
        //           y: number;
        //       }
        //   }
        //   declare var graphics: {
        //       Point: new (x: number, y: number) => graphics.Point;
        //   }
        //   declare module "graphics" {
        //       export = graphics;
        //   }
        //
        // An 'import { Point } from "graphics"' needs to create a symbol that combines the value side 'Point'
        // property with the type/namespace side interface 'Point'.
        function combineValueAndTypeSymbols(valueSymbol: Symbol, typeSymbol: Symbol): Symbol {
            if (valueSymbol.flags & (SymbolFlags.Type | SymbolFlags.Namespace)) {
                return valueSymbol;
            }
            const result = createSymbol(valueSymbol.flags | typeSymbol.flags, valueSymbol.name);
            result.declarations = concatenate(valueSymbol.declarations, typeSymbol.declarations);
            result.parent = valueSymbol.parent || typeSymbol.parent;
            if (valueSymbol.valueDeclaration) result.valueDeclaration = valueSymbol.valueDeclaration;
            if (typeSymbol.members) result.members = typeSymbol.members;
            if (valueSymbol.exports) result.exports = valueSymbol.exports;
            return result;
        }

        function getExportOfModule(symbol: Symbol, name: string): Symbol {
            if (symbol.flags & SymbolFlags.Module) {
                const exports = getExportsOfSymbol(symbol);
                if (hasProperty(exports, name)) {
                    return resolveSymbol(exports[name]);
                }
            }
        }

        function getPropertyOfVariable(symbol: Symbol, name: string): Symbol {
            if (symbol.flags & SymbolFlags.Variable) {
                const typeAnnotation = (<VariableDeclaration>symbol.valueDeclaration).type;
                if (typeAnnotation) {
                    return resolveSymbol(getPropertyOfType(getTypeFromTypeNode(typeAnnotation), name));
                }
            }
        }

        function getExternalModuleMember(node: ImportDeclaration | ExportDeclaration, specifier: ImportOrExportSpecifier): Symbol {
            const moduleSymbol = resolveExternalModuleName(node, node.moduleSpecifier);
            const targetSymbol = resolveESModuleSymbol(moduleSymbol, node.moduleSpecifier);
            if (targetSymbol) {
                const name = specifier.propertyName || specifier.name;
                if (name.text) {
                    const symbolFromModule = getExportOfModule(targetSymbol, name.text);
                    const symbolFromVariable = getPropertyOfVariable(targetSymbol, name.text);
                    const symbol = symbolFromModule && symbolFromVariable ?
                        combineValueAndTypeSymbols(symbolFromVariable, symbolFromModule) :
                        symbolFromModule || symbolFromVariable;
                    if (!symbol) {
                        error(name, Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(moduleSymbol), declarationNameToString(name));
                    }
                    return symbol;
                }
            }
        }

        function getTargetOfImportSpecifier(node: ImportSpecifier): Symbol {
            return getExternalModuleMember(<ImportDeclaration>node.parent.parent.parent, node);
        }

        function getTargetOfExportSpecifier(node: ExportSpecifier): Symbol {
            return (<ExportDeclaration>node.parent.parent).moduleSpecifier ?
                getExternalModuleMember(<ExportDeclaration>node.parent.parent, node) :
                resolveEntityName(node.propertyName || node.name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace);
        }

        function getTargetOfExportAssignment(node: ExportAssignment): Symbol {
            return resolveEntityName(<Identifier>node.expression, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace);
        }

        function getTargetOfAliasDeclaration(node: Declaration): Symbol {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    return getTargetOfImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ImportClause:
                    return getTargetOfImportClause(<ImportClause>node);
                case SyntaxKind.NamespaceImport:
                    return getTargetOfNamespaceImport(<NamespaceImport>node);
                case SyntaxKind.ImportSpecifier:
                    return getTargetOfImportSpecifier(<ImportSpecifier>node);
                case SyntaxKind.ExportSpecifier:
                    return getTargetOfExportSpecifier(<ExportSpecifier>node);
                case SyntaxKind.ExportAssignment:
                    return getTargetOfExportAssignment(<ExportAssignment>node);
            }
        }

        function resolveSymbol(symbol: Symbol): Symbol {
            return symbol && symbol.flags & SymbolFlags.Alias && !(symbol.flags & (SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace)) ? resolveAlias(symbol) : symbol;
        }

        function resolveAlias(symbol: Symbol): Symbol {
            Debug.assert((symbol.flags & SymbolFlags.Alias) !== 0, "Should only get Alias here.");
            const links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                const node = getDeclarationOfAliasSymbol(symbol);
                const target = getTargetOfAliasDeclaration(node);
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

        function markExportAsReferenced(node: ImportEqualsDeclaration | ExportAssignment | ExportSpecifier) {
            const symbol = getSymbolOfNode(node);
            const target = resolveAlias(symbol);
            if (target) {
                const markAlias =
                    (target === unknownSymbol && compilerOptions.isolatedModules) ||
                    (target !== unknownSymbol && (target.flags & SymbolFlags.Value) && !isConstEnumOrConstEnumOnlyModule(target));

                if (markAlias) {
                    markAliasSymbolAsReferenced(symbol);
                }
            }
        }

        // When an alias symbol is referenced, we need to mark the entity it references as referenced and in turn repeat that until
        // we reach a non-alias or an exported entity (which is always considered referenced). We do this by checking the target of
        // the alias as an expression (which recursively takes us back here if the target references another alias).
        function markAliasSymbolAsReferenced(symbol: Symbol) {
            const links = getSymbolLinks(symbol);
            if (!links.referenced) {
                links.referenced = true;
                const node = getDeclarationOfAliasSymbol(symbol);
                if (node.kind === SyntaxKind.ExportAssignment) {
                    // export default <symbol>
                    checkExpressionCached((<ExportAssignment>node).expression);
                }
                else if (node.kind === SyntaxKind.ExportSpecifier) {
                    // export { <symbol> } or export { <symbol> as foo }
                    checkExpressionCached((<ExportSpecifier>node).propertyName || (<ExportSpecifier>node).name);
                }
                else if (isInternalModuleImportEqualsDeclaration(node)) {
                    // import foo = <symbol>
                    checkExpressionCached(<Expression>(<ImportEqualsDeclaration>node).moduleReference);
                }
            }
        }

        // This function is only for imports with entity names
        function getSymbolOfPartOfRightHandSideOfImportEquals(entityName: EntityName, importDeclaration?: ImportEqualsDeclaration): Symbol {
            if (!importDeclaration) {
                importDeclaration = <ImportEqualsDeclaration>getAncestor(entityName, SyntaxKind.ImportEqualsDeclaration);
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
                return resolveEntityName(entityName, SymbolFlags.Namespace);
            }
            else {
                // Case 2 in above example
                // entityName.kind could be a QualifiedName or a Missing identifier
                Debug.assert(entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration);
                return resolveEntityName(entityName, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace);
            }
        }

        function getFullyQualifiedName(symbol: Symbol): string {
            return symbol.parent ? getFullyQualifiedName(symbol.parent) + "." + symbolToString(symbol) : symbolToString(symbol);
        }

        // Resolves a qualified name and any involved aliases
        function resolveEntityName(name: EntityName | Expression, meaning: SymbolFlags, ignoreErrors?: boolean): Symbol {
            if (nodeIsMissing(name)) {
                return undefined;
            }

            let symbol: Symbol;
            if (name.kind === SyntaxKind.Identifier) {
                const message = meaning === SymbolFlags.Namespace ? Diagnostics.Cannot_find_namespace_0 : Diagnostics.Cannot_find_name_0;

                symbol = resolveName(name, (<Identifier>name).text, meaning, ignoreErrors ? undefined : message, <Identifier>name);
                if (!symbol) {
                    return undefined;
                }
            }
            else if (name.kind === SyntaxKind.QualifiedName || name.kind === SyntaxKind.PropertyAccessExpression) {
                const left = name.kind === SyntaxKind.QualifiedName ? (<QualifiedName>name).left : (<PropertyAccessExpression>name).expression;
                const right = name.kind === SyntaxKind.QualifiedName ? (<QualifiedName>name).right : (<PropertyAccessExpression>name).name;

                const namespace = resolveEntityName(left, SymbolFlags.Namespace, ignoreErrors);
                if (!namespace || namespace === unknownSymbol || nodeIsMissing(right)) {
                    return undefined;
                }
                symbol = getSymbol(getExportsOfSymbol(namespace), right.text, meaning);
                if (!symbol) {
                    if (!ignoreErrors) {
                        error(right, Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(namespace), declarationNameToString(right));
                    }
                    return undefined;
                }
            }
            else {
                Debug.fail("Unknown entity name kind.");
            }
            Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
            return symbol.flags & meaning ? symbol : resolveAlias(symbol);
        }

        function resolveExternalModuleName(location: Node, moduleReferenceExpression: Expression): Symbol {
            if (moduleReferenceExpression.kind !== SyntaxKind.StringLiteral) {
                return;
            }

            const moduleReferenceLiteral = <LiteralExpression>moduleReferenceExpression;
            const searchPath = getDirectoryPath(getSourceFile(location).fileName);

            // Module names are escaped in our symbol table.  However, string literal values aren't.
            // Escape the name in the "require(...)" clause to ensure we find the right symbol.
            let moduleName = escapeIdentifier(moduleReferenceLiteral.text);

            if (moduleName === undefined) {
                return;
            }

            if (moduleName.indexOf("!") >= 0) {
                moduleName = moduleName.substr(0, moduleName.indexOf("!"));
            }

            const isRelative = isExternalModuleNameRelative(moduleName);
            if (!isRelative) {
                const symbol = getSymbol(globals, "\"" + moduleName + "\"", SymbolFlags.ValueModule);
                if (symbol) {
                    return symbol;
                }
            }

            const resolvedModule = getResolvedModule(getSourceFile(location), moduleReferenceLiteral.text);
            const sourceFile = resolvedModule && host.getSourceFile(resolvedModule.resolvedFileName);
            if (sourceFile) {
                if (sourceFile.symbol) {
                    return sourceFile.symbol;
                }
                error(moduleReferenceLiteral, Diagnostics.File_0_is_not_a_module, sourceFile.fileName);
                return;
            }
            error(moduleReferenceLiteral, Diagnostics.Cannot_find_module_0, moduleName);
        }

        // An external module with an 'export =' declaration resolves to the target of the 'export =' declaration,
        // and an external module with no 'export =' declaration resolves to the module itself.
        function resolveExternalModuleSymbol(moduleSymbol: Symbol): Symbol {
            return moduleSymbol && resolveSymbol(moduleSymbol.exports["export="]) || moduleSymbol;
        }

        // An external module with an 'export =' declaration may be referenced as an ES6 module provided the 'export ='
        // references a symbol that is at least declared as a module or a variable. The target of the 'export =' may
        // combine other declarations with the module or variable (e.g. a class/module, function/module, interface/variable).
        function resolveESModuleSymbol(moduleSymbol: Symbol, moduleReferenceExpression: Expression): Symbol {
            let symbol = resolveExternalModuleSymbol(moduleSymbol);
            if (symbol && !(symbol.flags & (SymbolFlags.Module | SymbolFlags.Variable))) {
                error(moduleReferenceExpression, Diagnostics.Module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct, symbolToString(moduleSymbol));
                symbol = undefined;
            }
            return symbol;
        }

        function getExportAssignmentSymbol(moduleSymbol: Symbol): Symbol {
            return moduleSymbol.exports["export="];
        }

        function getExportsOfModuleAsArray(moduleSymbol: Symbol): Symbol[] {
            return symbolsToArray(getExportsOfModule(moduleSymbol));
        }

        function getExportsOfSymbol(symbol: Symbol): SymbolTable {
            return symbol.flags & SymbolFlags.Module ? getExportsOfModule(symbol) : symbol.exports || emptySymbols;
        }

        function getExportsOfModule(moduleSymbol: Symbol): SymbolTable {
            const links = getSymbolLinks(moduleSymbol);
            return links.resolvedExports || (links.resolvedExports = getExportsForModule(moduleSymbol));
        }

        function extendExportSymbols(target: SymbolTable, source: SymbolTable) {
            for (const id in source) {
                if (id !== "default" && !hasProperty(target, id)) {
                    target[id] = source[id];
                }
            }
        }

        function getExportsForModule(moduleSymbol: Symbol): SymbolTable {
            let result: SymbolTable;
            const visitedSymbols: Symbol[] = [];
            visit(moduleSymbol);
            return result || moduleSymbol.exports;

            // The ES6 spec permits export * declarations in a module to circularly reference the module itself. For example,
            // module 'a' can 'export * from "b"' and 'b' can 'export * from "a"' without error.
            function visit(symbol: Symbol) {
                if (symbol && symbol.flags & SymbolFlags.HasExports && !contains(visitedSymbols, symbol)) {
                    visitedSymbols.push(symbol);
                    if (symbol !== moduleSymbol) {
                        if (!result) {
                            result = cloneSymbolTable(moduleSymbol.exports);
                        }
                        extendExportSymbols(result, symbol.exports);
                    }
                    // All export * declarations are collected in an __export symbol by the binder
                    const exportStars = symbol.exports["__export"];
                    if (exportStars) {
                        for (const node of exportStars.declarations) {
                            visit(resolveExternalModuleName(node, (<ExportDeclaration>node).moduleSpecifier));
                        }
                    }
                }
            }
        }

        function getMergedSymbol(symbol: Symbol): Symbol {
            let merged: Symbol;
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

            // If it is an alias, then it is a value if the symbol it resolves to is a value.
            if (symbol.flags & SymbolFlags.Alias) {
                return (resolveAlias(symbol).flags & SymbolFlags.Value) !== 0;
            }

            return false;
        }

        function findConstructorDeclaration(node: ClassLikeDeclaration): ConstructorDeclaration {
            const members = node.members;
            for (const member of members) {
                if (member.kind === SyntaxKind.Constructor && nodeIsPresent((<ConstructorDeclaration>member).body)) {
                    return <ConstructorDeclaration>member;
                }
            }
        }

        function createType(flags: TypeFlags): Type {
            const result = new Type(checker, flags);
            result.id = typeCount++;
            return result;
        }

        function createIntrinsicType(kind: TypeFlags, intrinsicName: string): IntrinsicType {
            const type = <IntrinsicType>createType(kind);
            type.intrinsicName = intrinsicName;
            return type;
        }

        function createObjectType(kind: TypeFlags, symbol?: Symbol): ObjectType {
            const type = <ObjectType>createType(kind);
            type.symbol = symbol;
            return type;
        }

        // A reserved member name starts with two underscores, but the third character cannot be an underscore
        // or the @ symbol. A third underscore indicates an escaped form of an identifer that started
        // with at least two underscores. The @ character indicates that the name is denoted by a well known ES
        // Symbol instance.
        function isReservedMemberName(name: string) {
            return name.charCodeAt(0) === CharacterCodes._ &&
                name.charCodeAt(1) === CharacterCodes._ &&
                name.charCodeAt(2) !== CharacterCodes._ &&
                name.charCodeAt(2) !== CharacterCodes.at;
        }

        function getNamedMembers(members: SymbolTable): Symbol[] {
            let result: Symbol[];
            for (const id in members) {
                if (hasProperty(members, id)) {
                    if (!isReservedMemberName(id)) {
                        if (!result) result = [];
                        const symbol = members[id];
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
            let result: T;
            for (let location = enclosingDeclaration; location; location = location.parent) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = callback(location.locals)) {
                        return result;
                    }
                }
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalOrCommonJsModule(<SourceFile>location)) {
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
                    const accessibleParent = getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning), useOnlyExternalAliasing);
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
                    if (symbolFromSymbolTable.flags & SymbolFlags.Alias
                        && symbolFromSymbolTable.name !== "export="
                        && !getDeclarationOfKind(symbolFromSymbolTable, SyntaxKind.ExportSpecifier)) {
                        if (!useOnlyExternalAliasing || // We can use any type of alias to get the name
                            // Is this external alias, then use it to name
                            ts.forEach(symbolFromSymbolTable.declarations, isExternalModuleImportEqualsDeclaration)) {

                            const resolvedImportedSymbol = resolveAlias(symbolFromSymbolTable);
                            if (isAccessible(symbolFromSymbolTable, resolveAlias(symbolFromSymbolTable))) {
                                return [symbolFromSymbolTable];
                            }

                            // Look in the exported members, if we can find accessibleSymbolChain, symbol is accessible using this chain
                            // but only if the symbolFromSymbolTable can be qualified
                            const accessibleSymbolsFromExports = resolvedImportedSymbol.exports ? getAccessibleSymbolChainFromSymbolTable(resolvedImportedSymbol.exports) : undefined;
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
            let qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, symbolTable => {
                // If symbol of this name is not available in the symbol table we are ok
                if (!hasProperty(symbolTable, symbol.name)) {
                    // Continue to the next symbol table
                    return false;
                }
                // If the symbol with this name is present it should refer to the symbol
                let symbolFromSymbolTable = symbolTable[symbol.name];
                if (symbolFromSymbolTable === symbol) {
                    // No need to qualify
                    return true;
                }

                // Qualify if the symbol from symbol table has same meaning as expected
                symbolFromSymbolTable = (symbolFromSymbolTable.flags & SymbolFlags.Alias && !getDeclarationOfKind(symbolFromSymbolTable, SyntaxKind.ExportSpecifier)) ? resolveAlias(symbolFromSymbolTable) : symbolFromSymbolTable;
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
                const initialSymbol = symbol;
                let meaningToLook = meaning;
                while (symbol) {
                    // Symbol is accessible if it by itself is accessible
                    const accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaningToLook, /*useOnlyExternalAliasing*/ false);
                    if (accessibleSymbolChain) {
                        const hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0]);
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
                    // const x: typeof m.c
                    // In the above example when we start with checking if typeof m.c symbol is accessible,
                    // we are going to see if c can be accessed in scope directly.
                    // But it can't, hence the accessible is going to be undefined, but that doesn't mean m.c is inaccessible
                    // It is accessible if the parent m is accessible because then m.c can be accessed through qualification
                    meaningToLook = getQualifiedLeftMeaning(meaning);
                    symbol = getParentOfSymbol(symbol);
                }

                // This could be a symbol that is not exported in the external module
                // or it could be a symbol from different external module that is not aliased and hence cannot be named
                const symbolExternalModule = forEach(initialSymbol.declarations, getExternalModuleContainer);
                if (symbolExternalModule) {
                    const enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
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
                (declaration.kind === SyntaxKind.SourceFile && isExternalOrCommonJsModule(<SourceFile>declaration));
        }

        function hasVisibleDeclarations(symbol: Symbol): SymbolVisibilityResult {
            let aliasesToMakeVisible: AnyImportSyntax[];
            if (forEach(symbol.declarations, declaration => !getIsDeclarationVisible(declaration))) {
                return undefined;
            }
            return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible };

            function getIsDeclarationVisible(declaration: Declaration) {
                if (!isDeclarationVisible(declaration)) {
                    // Mark the unexported alias as visible if its parent is visible
                    // because these kind of aliases can be used to name types in declaration file

                    const anyImportSyntax = getAnyImportSyntax(declaration);
                    if (anyImportSyntax &&
                        !(anyImportSyntax.flags & NodeFlags.Export) && // import clause without export
                        isDeclarationVisible(<Declaration>anyImportSyntax.parent)) {
                        getNodeLinks(declaration).isVisible = true;
                        if (aliasesToMakeVisible) {
                            if (!contains(aliasesToMakeVisible, anyImportSyntax)) {
                                aliasesToMakeVisible.push(anyImportSyntax);
                            }
                        }
                        else {
                            aliasesToMakeVisible = [anyImportSyntax];
                        }
                        return true;
                    }

                    // Declaration is not visible
                    return false;
                }

                return true;
            }
        }

        function isEntityNameVisible(entityName: EntityName | Expression, enclosingDeclaration: Node): SymbolVisibilityResult {
            // get symbol of the first identifier of the entityName
            let meaning: SymbolFlags;
            if (entityName.parent.kind === SyntaxKind.TypeQuery) {
                // Typeof value
                meaning = SymbolFlags.Value | SymbolFlags.ExportValue;
            }
            else if (entityName.kind === SyntaxKind.QualifiedName || entityName.kind === SyntaxKind.PropertyAccessExpression ||
                entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
                // Left identifier from type reference or TypeAlias
                // Entity name of the import declaration
                meaning = SymbolFlags.Namespace;
            }
            else {
                // Type Reference or TypeAlias entity = Identifier
                meaning = SymbolFlags.Type;
            }

            const firstIdentifier = getFirstIdentifier(entityName);
            const symbol = resolveName(enclosingDeclaration, (<Identifier>firstIdentifier).text, meaning, /*nodeNotFoundErrorMessage*/ undefined, /*nameArg*/ undefined);

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
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning);
            const result = writer.string();
            releaseStringWriter(writer);

            return result;
        }

        function signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string {
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSignatureDisplay(signature, writer, enclosingDeclaration, flags);
            const result = writer.string();
            releaseStringWriter(writer);

            return result;
        }

        function typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string {
            const writer = getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
            let result = writer.string();
            releaseStringWriter(writer);

            const maxLength = compilerOptions.noErrorTruncation || flags & TypeFormatFlags.NoTruncation ? undefined : 100;
            if (maxLength && result.length >= maxLength) {
                result = result.substr(0, maxLength - "...".length) + "...";
            }
            return result;
        }

        function getTypeAliasForTypeLiteral(type: Type): Symbol {
            if (type.symbol && type.symbol.flags & SymbolFlags.TypeLiteral) {
                let node = type.symbol.declarations[0].parent;
                while (node.kind === SyntaxKind.ParenthesizedType) {
                    node = node.parent;
                }
                if (node.kind === SyntaxKind.TypeAliasDeclaration) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }

        function getSymbolDisplayBuilder(): SymbolDisplayBuilder {

            function getNameOfSymbol(symbol: Symbol): string {
                if (symbol.declarations && symbol.declarations.length) {
                    const declaration = symbol.declarations[0];
                    if (declaration.name) {
                        return declarationNameToString(declaration.name);
                    }
                    switch (declaration.kind) {
                        case SyntaxKind.ClassExpression:
                            return "(Anonymous class)";
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.ArrowFunction:
                            return "(Anonymous function)";
                    }
                }
                return symbol.name;
            }

            /**
             * Writes only the name of the symbol out to the writer. Uses the original source text
             * for the name of the symbol if it is available to match how the user inputted the name.
             */
            function appendSymbolNameOnly(symbol: Symbol, writer: SymbolWriter): void {
                writer.writeSymbol(getNameOfSymbol(symbol), symbol);
            }

            /**
             * Enclosing declaration is optional when we don't want to get qualified name in the enclosing declaration scope
             * Meaning needs to be specified if the enclosing declaration is given
             */
            function buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags, typeFlags?: TypeFormatFlags): void {
                let parentSymbol: Symbol;
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

                // const the writer know we just wrote out a symbol.  The declaration emitter writer uses
                // this to determine if an import it has previously seen (and not written out) needs
                // to be written to the file once the walk of the tree is complete.
                //
                // NOTE(cyrusn): This approach feels somewhat unfortunate.  A simple pass over the tree
                // up front (for example, during checking) could determine if we need to emit the imports
                // and we could then access that data during declaration emit.
                writer.trackSymbol(symbol, enclosingDeclaration, meaning);
                function walkSymbol(symbol: Symbol, meaning: SymbolFlags): void {
                    if (symbol) {
                        const accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, !!(flags & SymbolFormatFlags.UseOnlyExternalAliasing));

                        if (!accessibleSymbolChain ||
                            needsQualification(accessibleSymbolChain[0], enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {

                            // Go up and add our parent.
                            walkSymbol(
                                getParentOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol),
                                getQualifiedLeftMeaning(meaning));
                        }

                        if (accessibleSymbolChain) {
                            for (const accessibleSymbol of accessibleSymbolChain) {
                                appendParentTypeArgumentsAndSymbolName(accessibleSymbol);
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
                const isTypeParameter = symbol.flags & SymbolFlags.TypeParameter;
                const typeFormatFlag = TypeFormatFlags.UseFullyQualifiedType & typeFlags;
                if (!isTypeParameter && (enclosingDeclaration || typeFormatFlag)) {
                    walkSymbol(symbol, meaning);
                    return;
                }

                return appendParentTypeArgumentsAndSymbolName(symbol);
            }

            function buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, globalFlags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                const globalFlagsToPass = globalFlags & TypeFormatFlags.WriteOwnNameForAnyLike;
                let inObjectTypeLiteral = false;
                return writeType(type, globalFlags);

                function writeType(type: Type, flags: TypeFormatFlags) {
                    // Write undefined/null type as any
                    if (type.flags & TypeFlags.Intrinsic) {
                        // Special handling for unknown / resolving types, they should show up as any and not unknown or __resolving
                        writer.writeKeyword(!(globalFlags & TypeFormatFlags.WriteOwnNameForAnyLike) && isTypeAny(type)
                            ? "any"
                            : (<IntrinsicType>type).intrinsicName);
                    }
                    else if (type.flags & TypeFlags.ThisType) {
                        if (inObjectTypeLiteral) {
                            writer.reportInaccessibleThisError();
                        }
                        writer.writeKeyword("this");
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
                    else if (type.flags & TypeFlags.UnionOrIntersection) {
                        writeUnionOrIntersectionType(<UnionOrIntersectionType>type, flags);
                    }
                    else if (type.flags & TypeFlags.Anonymous) {
                        writeAnonymousType(<ObjectType>type, flags);
                    }
                    else if (type.flags & TypeFlags.StringLiteral) {
                        writer.writeStringLiteral(`"${escapeString((<StringLiteralType>type).text)}"`);
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

                function writeTypeList(types: Type[], delimiter: SyntaxKind) {
                    for (let i = 0; i < types.length; i++) {
                        if (i > 0) {
                            if (delimiter !== SyntaxKind.CommaToken) {
                                writeSpace(writer);
                            }
                            writePunctuation(writer, delimiter);
                            writeSpace(writer);
                        }
                        writeType(types[i], delimiter === SyntaxKind.CommaToken ? TypeFormatFlags.None : TypeFormatFlags.InElementType);
                    }
                }

                function writeSymbolTypeReference(symbol: Symbol, typeArguments: Type[], pos: number, end: number, flags: TypeFormatFlags) {
                    // Unnamed function expressions and arrow functions have reserved names that we don't want to display
                    if (symbol.flags & SymbolFlags.Class || !isReservedMemberName(symbol.name)) {
                        buildSymbolDisplay(symbol, writer, enclosingDeclaration, SymbolFlags.Type, SymbolFormatFlags.None, flags);
                    }
                    if (pos < end) {
                        writePunctuation(writer, SyntaxKind.LessThanToken);
                        writeType(typeArguments[pos++], TypeFormatFlags.None);
                        while (pos < end) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                            writeType(typeArguments[pos++], TypeFormatFlags.None);
                        }
                        writePunctuation(writer, SyntaxKind.GreaterThanToken);
                    }
                }

                function writeTypeReference(type: TypeReference, flags: TypeFormatFlags) {
                    const typeArguments = type.typeArguments || emptyArray;
                    if (type.target === globalArrayType && !(flags & TypeFormatFlags.WriteArrayAsGenericType)) {
                        writeType(typeArguments[0], TypeFormatFlags.InElementType);
                        writePunctuation(writer, SyntaxKind.OpenBracketToken);
                        writePunctuation(writer, SyntaxKind.CloseBracketToken);
                    }
                    else {
                        // Write the type reference in the format f<A>.g<B>.C<X, Y> where A and B are type arguments
                        // for outer type parameters, and f and g are the respective declaring containers of those
                        // type parameters.
                        const outerTypeParameters = type.target.outerTypeParameters;
                        let i = 0;
                        if (outerTypeParameters) {
                            const length = outerTypeParameters.length;
                            while (i < length) {
                                // Find group of type arguments for type parameters with the same declaring container.
                                const start = i;
                                const parent = getParentSymbolOfTypeParameter(outerTypeParameters[i]);
                                do {
                                    i++;
                                } while (i < length && getParentSymbolOfTypeParameter(outerTypeParameters[i]) === parent);
                                // When type parameters are their own type arguments for the whole group (i.e. we have
                                // the default outer type arguments), we don't show the group.
                                if (!rangeEquals(outerTypeParameters, typeArguments, start, i)) {
                                    writeSymbolTypeReference(parent, typeArguments, start, i, flags);
                                    writePunctuation(writer, SyntaxKind.DotToken);
                                }
                            }
                        }
                        const typeParameterCount = (type.target.typeParameters || emptyArray).length;
                        writeSymbolTypeReference(type.symbol, typeArguments, i, typeParameterCount, flags);
                    }
                }

                function writeTupleType(type: TupleType) {
                    writePunctuation(writer, SyntaxKind.OpenBracketToken);
                    writeTypeList(type.elementTypes, SyntaxKind.CommaToken);
                    writePunctuation(writer, SyntaxKind.CloseBracketToken);
                }

                function writeUnionOrIntersectionType(type: UnionOrIntersectionType, flags: TypeFormatFlags) {
                    if (flags & TypeFormatFlags.InElementType) {
                        writePunctuation(writer, SyntaxKind.OpenParenToken);
                    }
                    writeTypeList(type.types, type.flags & TypeFlags.Union ? SyntaxKind.BarToken : SyntaxKind.AmpersandToken);
                    if (flags & TypeFormatFlags.InElementType) {
                        writePunctuation(writer, SyntaxKind.CloseParenToken);
                    }
                }

                function writeAnonymousType(type: ObjectType, flags: TypeFormatFlags) {
                    const symbol = type.symbol;
                    if (symbol) {
                        // Always use 'typeof T' for type of class, enum, and module objects
                        if (symbol.flags & (SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule)) {
                            writeTypeofSymbol(type, flags);
                        }
                        else if (shouldWriteTypeOfFunctionSymbol()) {
                            writeTypeofSymbol(type, flags);
                        }
                        else if (contains(symbolStack, symbol)) {
                            // If type is an anonymous type literal in a type alias declaration, use type alias name
                            const typeAlias = getTypeAliasForTypeLiteral(type);
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
                            // Since instantiations of the same anonymous type have the same symbol, tracking symbols instead
                            // of types allows us to catch circular references to instantiations of the same anonymous type
                            if (!symbolStack) {
                                symbolStack = [];
                            }
                            symbolStack.push(symbol);
                            writeLiteralType(type, flags);
                            symbolStack.pop();
                        }
                    }
                    else {
                        // Anonymous types with no symbol are never circular
                        writeLiteralType(type, flags);
                    }

                    function shouldWriteTypeOfFunctionSymbol() {
                        const isStaticMethodSymbol = !!(symbol.flags & SymbolFlags.Method &&  // typeof static method
                            forEach(symbol.declarations, declaration => declaration.flags & NodeFlags.Static));
                        const isNonLocalFunctionSymbol = !!(symbol.flags & SymbolFlags.Function) &&
                            (symbol.parent || // is exported function symbol
                                forEach(symbol.declarations, declaration =>
                                    declaration.parent.kind === SyntaxKind.SourceFile || declaration.parent.kind === SyntaxKind.ModuleBlock));
                        if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                            // typeof is allowed only for static/non local functions
                            return !!(flags & TypeFormatFlags.UseTypeOfFunction) || // use typeof if format flags specify it
                                (contains(symbolStack, symbol)); // it is type of the symbol uses itself recursively
                        }
                    }
                }

                function writeTypeofSymbol(type: ObjectType, typeFormatFlags?: TypeFormatFlags) {
                    writeKeyword(writer, SyntaxKind.TypeOfKeyword);
                    writeSpace(writer);
                    buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, SymbolFlags.Value, SymbolFormatFlags.None, typeFormatFlags);
                }

                function getIndexerParameterName(type: ObjectType, indexKind: IndexKind, fallbackName: string): string {
                    const declaration = <SignatureDeclaration>getIndexDeclarationOfSymbol(type.symbol, indexKind);
                    if (!declaration) {
                        // declaration might not be found if indexer was added from the contextual type.
                        // in this case use fallback name
                        return fallbackName;
                    }
                    Debug.assert(declaration.parameters.length !== 0);
                    return declarationNameToString(declaration.parameters[0].name);
                }

                function writeLiteralType(type: ObjectType, flags: TypeFormatFlags) {
                    const resolved = resolveStructuredTypeMembers(type);
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
                            buildSignatureDisplay(resolved.callSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | TypeFormatFlags.WriteArrowStyleSignature, symbolStack);
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
                            buildSignatureDisplay(resolved.constructSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | TypeFormatFlags.WriteArrowStyleSignature, symbolStack);
                            if (flags & TypeFormatFlags.InElementType) {
                                writePunctuation(writer, SyntaxKind.CloseParenToken);
                            }
                            return;
                        }
                    }

                    const saveInObjectTypeLiteral = inObjectTypeLiteral;
                    inObjectTypeLiteral = true;
                    writePunctuation(writer, SyntaxKind.OpenBraceToken);
                    writer.writeLine();
                    writer.increaseIndent();
                    for (const signature of resolved.callSignatures) {
                        buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, symbolStack);
                        writePunctuation(writer, SyntaxKind.SemicolonToken);
                        writer.writeLine();
                    }
                    for (const signature of resolved.constructSignatures) {
                        writeKeyword(writer, SyntaxKind.NewKeyword);
                        writeSpace(writer);

                        buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, symbolStack);
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
                    for (const p of resolved.properties) {
                        const t = getTypeOfSymbol(p);
                        if (p.flags & (SymbolFlags.Function | SymbolFlags.Method) && !getPropertiesOfObjectType(t).length) {
                            const signatures = getSignaturesOfType(t, SignatureKind.Call);
                            for (const signature of signatures) {
                                buildSymbolDisplay(p, writer);
                                if (p.flags & SymbolFlags.Optional) {
                                    writePunctuation(writer, SyntaxKind.QuestionToken);
                                }
                                buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, symbolStack);
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
                    inObjectTypeLiteral = saveInObjectTypeLiteral;
                }
            }

            function buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaraiton?: Node, flags?: TypeFormatFlags) {
                const targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & SymbolFlags.Class || targetSymbol.flags & SymbolFlags.Interface || targetSymbol.flags & SymbolFlags.TypeAlias) {
                    buildDisplayForTypeParametersAndDelimiters(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol), writer, enclosingDeclaraiton, flags);
                }
            }

            function buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                appendSymbolNameOnly(tp.symbol, writer);
                const constraint = getConstraintOfTypeParameter(tp);
                if (constraint) {
                    writeSpace(writer);
                    writeKeyword(writer, SyntaxKind.ExtendsKeyword);
                    writeSpace(writer);
                    buildTypeDisplay(constraint, writer, enclosingDeclaration, flags, symbolStack);
                }
            }

            function buildParameterDisplay(p: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                const parameterNode = <ParameterDeclaration>p.valueDeclaration;
                if (isRestParameter(parameterNode)) {
                    writePunctuation(writer, SyntaxKind.DotDotDotToken);
                }
                appendSymbolNameOnly(p, writer);
                if (isOptionalParameter(parameterNode)) {
                    writePunctuation(writer, SyntaxKind.QuestionToken);
                }
                writePunctuation(writer, SyntaxKind.ColonToken);
                writeSpace(writer);

                buildTypeDisplay(getTypeOfSymbol(p), writer, enclosingDeclaration, flags, symbolStack);
            }

            function buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, SyntaxKind.LessThanToken);
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        buildTypeParameterDisplay(typeParameters[i], writer, enclosingDeclaration, flags, symbolStack);
                    }
                    writePunctuation(writer, SyntaxKind.GreaterThanToken);
                }
            }

            function buildDisplayForTypeArgumentsAndDelimiters(typeParameters: TypeParameter[], mapper: TypeMapper, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, SyntaxKind.LessThanToken);
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, SyntaxKind.CommaToken);
                            writeSpace(writer);
                        }
                        buildTypeDisplay(mapper(typeParameters[i]), writer, enclosingDeclaration, TypeFormatFlags.None);
                    }
                    writePunctuation(writer, SyntaxKind.GreaterThanToken);
                }
            }

            function buildDisplayForParametersAndDelimiters(parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                writePunctuation(writer, SyntaxKind.OpenParenToken);
                for (let i = 0; i < parameters.length; i++) {
                    if (i > 0) {
                        writePunctuation(writer, SyntaxKind.CommaToken);
                        writeSpace(writer);
                    }
                    buildParameterDisplay(parameters[i], writer, enclosingDeclaration, flags, symbolStack);
                }
                writePunctuation(writer, SyntaxKind.CloseParenToken);
            }

            function buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (flags & TypeFormatFlags.WriteArrowStyleSignature) {
                    writeSpace(writer);
                    writePunctuation(writer, SyntaxKind.EqualsGreaterThanToken);
                }
                else {
                    writePunctuation(writer, SyntaxKind.ColonToken);
                }
                writeSpace(writer);

                let returnType: Type;
                if (signature.typePredicate) {
                    writer.writeParameter(signature.typePredicate.parameterName);
                    writeSpace(writer);
                    writeKeyword(writer, SyntaxKind.IsKeyword);
                    writeSpace(writer);
                    returnType = signature.typePredicate.type;
                }
                else {
                    returnType = getReturnTypeOfSignature(signature);
                }
                buildTypeDisplay(returnType, writer, enclosingDeclaration, flags, symbolStack);
            }

            function buildSignatureDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags, symbolStack?: Symbol[]) {
                if (signature.target && (flags & TypeFormatFlags.WriteTypeArgumentsOfSignature)) {
                    // Instantiated signature, write type arguments instead
                    // This is achieved by passing in the mapper separately
                    buildDisplayForTypeArgumentsAndDelimiters(signature.target.typeParameters, signature.mapper, writer, enclosingDeclaration);
                }
                else {
                    buildDisplayForTypeParametersAndDelimiters(signature.typeParameters, writer, enclosingDeclaration, flags, symbolStack);
                }

                buildDisplayForParametersAndDelimiters(signature.parameters, writer, enclosingDeclaration, flags, symbolStack);
                buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, symbolStack);
            }

            return _displayBuilder || (_displayBuilder = {
                buildSymbolDisplay,
                buildTypeDisplay,
                buildTypeParameterDisplay,
                buildParameterDisplay,
                buildDisplayForParametersAndDelimiters,
                buildDisplayForTypeParametersAndDelimiters,
                buildTypeParameterDisplayFromSymbol,
                buildSignatureDisplay,
                buildReturnTypeDisplay
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
                        return isExternalOrCommonJsModule(<SourceFile>node) ? node : undefined;
                    }
                }
                Debug.fail("getContainingModule cant reach here");
            }

            function isUsedInExportAssignment(node: Node) {
                // Get source File and see if it is external module and has export assigned symbol
                const externalModule = getContainingExternalModule(node);
                let exportAssignmentSymbol: Symbol;
                let resolvedExportSymbol: Symbol;
                if (externalModule) {
                    // This is export assigned symbol node
                    const externalModuleSymbol = getSymbolOfNode(externalModule);
                    exportAssignmentSymbol = getExportAssignmentSymbol(externalModuleSymbol);
                    const symbolOfNode = getSymbolOfNode(node);
                    if (isSymbolUsedInExportAssignment(symbolOfNode)) {
                        return true;
                    }

                    // if symbolOfNode is alias declaration, resolve the symbol declaration and check
                    if (symbolOfNode.flags & SymbolFlags.Alias) {
                        return isSymbolUsedInExportAssignment(resolveAlias(symbolOfNode));
                    }
                }

                // Check if the symbol is used in export assignment
                function isSymbolUsedInExportAssignment(symbol: Symbol) {
                    if (exportAssignmentSymbol === symbol) {
                        return true;
                    }

                    if (exportAssignmentSymbol && !!(exportAssignmentSymbol.flags & SymbolFlags.Alias)) {
                        // if export assigned symbol is alias declaration, resolve the alias
                        resolvedExportSymbol = resolvedExportSymbol || resolveAlias(exportAssignmentSymbol);
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
                    case SyntaxKind.BindingElement:
                        return isDeclarationVisible(<Declaration>node.parent.parent);
                    case SyntaxKind.VariableDeclaration:
                        if (isBindingPattern(node.name) &&
                            !(<BindingPattern>node.name).elements.length) {
                            // If the binding pattern is empty, this variable declaration is not visible
                            return false;
                        }
                    // Otherwise fall through
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                        const parent = getDeclarationContainer(node);
                        // If the node is not exported or it is not ambient module element (except import declaration)
                        if (!(getCombinedNodeFlags(node) & NodeFlags.Export) &&
                            !(node.kind !== SyntaxKind.ImportEqualsDeclaration && parent.kind !== SyntaxKind.SourceFile && isInAmbientContext(parent))) {
                            return isGlobalSourceFile(parent);
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
                    // Public properties/methods are visible if its parents are visible, so const it fall into next case statement

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
                    case SyntaxKind.IntersectionType:
                    case SyntaxKind.ParenthesizedType:
                        return isDeclarationVisible(<Declaration>node.parent);

                    // Default binding, import specifier and namespace import is visible
                    // only on demand so by default it is not visible
                    case SyntaxKind.ImportClause:
                    case SyntaxKind.NamespaceImport:
                    case SyntaxKind.ImportSpecifier:
                        return false;

                    // Type parameters are always visible
                    case SyntaxKind.TypeParameter:
                    // Source file is always visible
                    case SyntaxKind.SourceFile:
                        return true;

                    // Export assignments do not create name bindings outside the module
                    case SyntaxKind.ExportAssignment:
                        return false;

                    default:
                        Debug.fail("isDeclarationVisible unknown: SyntaxKind: " + node.kind);
                }
            }

            if (node) {
                const links = getNodeLinks(node);
                if (links.isVisible === undefined) {
                    links.isVisible = !!determineIfDeclarationIsVisible();
                }
                return links.isVisible;
            }
        }

        function collectLinkedAliases(node: Identifier): Node[] {
            let exportSymbol: Symbol;
            if (node.parent && node.parent.kind === SyntaxKind.ExportAssignment) {
                exportSymbol = resolveName(node.parent, node.text, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias, Diagnostics.Cannot_find_name_0, node);
            }
            else if (node.parent.kind === SyntaxKind.ExportSpecifier) {
                const exportSpecifier = <ExportSpecifier>node.parent;
                exportSymbol = (<ExportDeclaration>exportSpecifier.parent.parent).moduleSpecifier ?
                    getExternalModuleMember(<ExportDeclaration>exportSpecifier.parent.parent, exportSpecifier) :
                    resolveEntityName(exportSpecifier.propertyName || exportSpecifier.name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias);
            }
            const result: Node[] = [];
            if (exportSymbol) {
                buildVisibleNodeList(exportSymbol.declarations);
            }
            return result;

            function buildVisibleNodeList(declarations: Declaration[]) {
                forEach(declarations, declaration => {
                    getNodeLinks(declaration).isVisible = true;
                    const resultNode = getAnyImportSyntax(declaration) || declaration;
                    if (!contains(result, resultNode)) {
                        result.push(resultNode);
                    }

                    if (isInternalModuleImportEqualsDeclaration(declaration)) {
                        // Add the referenced top container visible
                        const internalModuleReference = <Identifier | QualifiedName>(<ImportEqualsDeclaration>declaration).moduleReference;
                        const firstIdentifier = getFirstIdentifier(internalModuleReference);
                        const importSymbol = resolveName(declaration, firstIdentifier.text, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace,
                            Diagnostics.Cannot_find_name_0, firstIdentifier);
                        buildVisibleNodeList(importSymbol.declarations);
                    }
                });
            }
        }

        /**
         * Push an entry on the type resolution stack. If an entry with the given target and the given property name
         * is already on the stack, and no entries in between already have a type, then a circularity has occurred.
         * In this case, the result values of the existing entry and all entries pushed after it are changed to false,
         * and the value false is returned. Otherwise, the new entry is just pushed onto the stack, and true is returned.
         * In order to see if the same query has already been done before, the target object and the propertyName both
         * must match the one passed in.
         *
         * @param target The symbol, type, or signature whose type is being queried
         * @param propertyName The property name that should be used to query the target for its type
         */
        function pushTypeResolution(target: TypeSystemEntity, propertyName: TypeSystemPropertyName): boolean {
            const resolutionCycleStartIndex = findResolutionCycleStartIndex(target, propertyName);
            if (resolutionCycleStartIndex >= 0) {
                // A cycle was found
                const { length } = resolutionTargets;
                for (let i = resolutionCycleStartIndex; i < length; i++) {
                    resolutionResults[i] = false;
                }
                return false;
            }
            resolutionTargets.push(target);
            resolutionResults.push(/*items*/ true);
            resolutionPropertyNames.push(propertyName);
            return true;
        }

        function findResolutionCycleStartIndex(target: TypeSystemEntity, propertyName: TypeSystemPropertyName): number {
            for (let i = resolutionTargets.length - 1; i >= 0; i--) {
                if (hasType(resolutionTargets[i], resolutionPropertyNames[i])) {
                    return -1;
                }
                if (resolutionTargets[i] === target && resolutionPropertyNames[i] === propertyName) {
                    return i;
                }
            }

            return -1;
        }

        function hasType(target: TypeSystemEntity, propertyName: TypeSystemPropertyName): Type {
            if (propertyName === TypeSystemPropertyName.Type) {
                return getSymbolLinks(<Symbol>target).type;
            }
            if (propertyName === TypeSystemPropertyName.DeclaredType) {
                return getSymbolLinks(<Symbol>target).declaredType;
            }
            if (propertyName === TypeSystemPropertyName.ResolvedBaseConstructorType) {
                Debug.assert(!!((<Type>target).flags & TypeFlags.Class));
                return (<InterfaceType>target).resolvedBaseConstructorType;
            }
            if (propertyName === TypeSystemPropertyName.ResolvedReturnType) {
                return (<Signature>target).resolvedReturnType;
            }

            Debug.fail("Unhandled TypeSystemPropertyName " + propertyName);
        }

        // Pop an entry from the type resolution stack and return its associated result value. The result value will
        // be true if no circularities were detected, or false if a circularity was found.
        function popTypeResolution(): boolean {
            resolutionTargets.pop();
            resolutionPropertyNames.pop();
            return resolutionResults.pop();
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
            const classType = <InterfaceType>getDeclaredTypeOfSymbol(prototype.parent);
            return classType.typeParameters ? createTypeReference(<GenericType>classType, map(classType.typeParameters, _ => anyType)) : classType;
        }

        // Return the type of the given property in the given type, or undefined if no such property exists
        function getTypeOfPropertyOfType(type: Type, name: string): Type {
            const prop = getPropertyOfType(type, name);
            return prop ? getTypeOfSymbol(prop) : undefined;
        }

        function isTypeAny(type: Type) {
            return type && (type.flags & TypeFlags.Any) !== 0;
        }

        // Return the type of a binding element parent. We check SymbolLinks first to see if a type has been
        // assigned by contextual typing.
        function getTypeForBindingElementParent(node: VariableLikeDeclaration) {
            const symbol = getSymbolOfNode(node);
            return symbol && getSymbolLinks(symbol).type || getTypeForVariableLikeDeclaration(node);
        }

        function getTextOfPropertyName(name: PropertyName): string {
            switch (name.kind) {
                case SyntaxKind.Identifier:
                    return (<Identifier>name).text;
                case SyntaxKind.StringLiteral:
                case SyntaxKind.NumericLiteral:
                    return (<LiteralExpression>name).text;
                case SyntaxKind.ComputedPropertyName:
                    if (isStringOrNumericLiteral((<ComputedPropertyName>name).expression.kind)) {
                        return (<LiteralExpression>(<ComputedPropertyName>name).expression).text;
                    }
            }

            return undefined;
        }

        function isComputedNonLiteralName(name: PropertyName): boolean {
            return name.kind === SyntaxKind.ComputedPropertyName && !isStringOrNumericLiteral((<ComputedPropertyName>name).expression.kind);
        }

        // Return the inferred type for a binding element
        function getTypeForBindingElement(declaration: BindingElement): Type {
            const pattern = <BindingPattern>declaration.parent;
            const parentType = getTypeForBindingElementParent(<VariableLikeDeclaration>pattern.parent);
            // If parent has the unknown (error) type, then so does this binding element
            if (parentType === unknownType) {
                return unknownType;
            }
            // If no type was specified or inferred for parent, or if the specified or inferred type is any,
            // infer from the initializer of the binding element if one is present. Otherwise, go with the
            // undefined or any type of the parent.
            if (!parentType || isTypeAny(parentType)) {
                if (declaration.initializer) {
                    return checkExpressionCached(declaration.initializer);
                }
                return parentType;
            }

            let type: Type;
            if (pattern.kind === SyntaxKind.ObjectBindingPattern) {
                // Use explicitly specified property name ({ p: xxx } form), or otherwise the implied name ({ p } form)
                const name = declaration.propertyName || <Identifier>declaration.name;
                if (isComputedNonLiteralName(name)) {
                    // computed properties with non-literal names are treated as 'any'
                    return anyType;
                }

                // Use type of the specified property, or otherwise, for a numeric name, the type of the numeric index signature,
                // or otherwise the type of the string index signature.
                const text = getTextOfPropertyName(name);

                type = getTypeOfPropertyOfType(parentType, text) ||
                    isNumericLiteralName(text) && getIndexTypeOfType(parentType, IndexKind.Number) ||
                    getIndexTypeOfType(parentType, IndexKind.String);
                if (!type) {
                    error(name, Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(parentType), declarationNameToString(name));
                    return unknownType;
                }
            }
            else {
                // This elementType will be used if the specific property corresponding to this index is not
                // present (aka the tuple element property). This call also checks that the parentType is in
                // fact an iterable or array (depending on target language).
                const elementType = checkIteratedTypeOrElementType(parentType, pattern, /*allowStringInput*/ false);
                if (!declaration.dotDotDotToken) {
                    // Use specific property type when parent is a tuple or numeric index type when parent is an array
                    const propName = "" + indexOf(pattern.elements, declaration);
                    type = isTupleLikeType(parentType)
                        ? getTypeOfPropertyOfType(parentType, propName)
                        : elementType;
                    if (!type) {
                        if (isTupleType(parentType)) {
                            error(declaration, Diagnostics.Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2, typeToString(parentType), (<TupleType>parentType).elementTypes.length, pattern.elements.length);
                        }
                        else {
                            error(declaration, Diagnostics.Type_0_has_no_property_1, typeToString(parentType), propName);
                        }
                        return unknownType;
                    }
                }
                else {
                    // Rest element has an array type with the same element type as the parent type
                    type = createArrayType(elementType);
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

            if (declaration.parent.parent.kind === SyntaxKind.ForOfStatement) {
                // checkRightHandSideOfForOf will return undefined if the for-of expression type was
                // missing properties/signatures required to get its iteratedType (like
                // [Symbol.iterator] or next). This may be because we accessed properties from anyType,
                // or it may have led to an error inside getElementTypeOfIterable.
                return checkRightHandSideOfForOf((<ForOfStatement>declaration.parent.parent).expression) || anyType;
            }

            if (isBindingPattern(declaration.parent)) {
                return getTypeForBindingElement(<BindingElement>declaration);
            }

            // Use type from type annotation if one is present
            if (declaration.type) {
                return getTypeFromTypeNode(declaration.type);
            }

            if (declaration.kind === SyntaxKind.Parameter) {
                const func = <FunctionLikeDeclaration>declaration.parent;
                // For a parameter of a set accessor, use the type of the get accessor if one is present
                if (func.kind === SyntaxKind.SetAccessor && !hasDynamicName(func)) {
                    const getter = <AccessorDeclaration>getDeclarationOfKind(declaration.parent.symbol, SyntaxKind.GetAccessor);
                    if (getter) {
                        return getReturnTypeOfSignature(getSignatureFromDeclaration(getter));
                    }
                }
                // Use contextual parameter type if one is available
                const type = getContextuallyTypedParameterType(<ParameterDeclaration>declaration);
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

            // If the declaration specifies a binding pattern, use the type implied by the binding pattern
            if (isBindingPattern(declaration.name)) {
                return getTypeFromBindingPattern(<BindingPattern>declaration.name, /*includePatternInType*/ false);
            }

            // No type specified and nothing can be inferred
            return undefined;
        }

        // Return the type implied by a binding pattern element. This is the type of the initializer of the element if
        // one is present. Otherwise, if the element is itself a binding pattern, it is the type implied by the binding
        // pattern. Otherwise, it is the type any.
        function getTypeFromBindingElement(element: BindingElement, includePatternInType?: boolean): Type {
            if (element.initializer) {
                return getWidenedType(checkExpressionCached(element.initializer));
            }
            if (isBindingPattern(element.name)) {
                return getTypeFromBindingPattern(<BindingPattern>element.name, includePatternInType);
            }
            return anyType;
        }

        // Return the type implied by an object binding pattern
        function getTypeFromObjectBindingPattern(pattern: BindingPattern, includePatternInType: boolean): Type {
            const members: SymbolTable = {};
            let hasComputedProperties = false;
            forEach(pattern.elements, e => {
                const name = e.propertyName || <Identifier>e.name;
                if (isComputedNonLiteralName(name)) {
                    // do not include computed properties in the implied type
                    hasComputedProperties = true;
                    return;
                }

                const text = getTextOfPropertyName(name);
                const flags = SymbolFlags.Property | SymbolFlags.Transient | (e.initializer ? SymbolFlags.Optional : 0);
                const symbol = <TransientSymbol>createSymbol(flags, text);
                symbol.type = getTypeFromBindingElement(e, includePatternInType);
                symbol.bindingElement = e;
                members[symbol.name] = symbol;
            });
            const result = createAnonymousType(undefined, members, emptyArray, emptyArray, undefined, undefined);
            if (includePatternInType) {
                result.pattern = pattern;
            }
            if (hasComputedProperties) {
                result.flags |= TypeFlags.ObjectLiteralPatternWithComputedProperties;
            }
            return result;
        }

        // Return the type implied by an array binding pattern
        function getTypeFromArrayBindingPattern(pattern: BindingPattern, includePatternInType: boolean): Type {
            const elements = pattern.elements;
            if (elements.length === 0 || elements[elements.length - 1].dotDotDotToken) {
                return languageVersion >= ScriptTarget.ES6 ? createIterableType(anyType) : anyArrayType;
            }
            // If the pattern has at least one element, and no rest element, then it should imply a tuple type.
            const elementTypes = map(elements, e => e.kind === SyntaxKind.OmittedExpression ? anyType : getTypeFromBindingElement(e, includePatternInType));
            if (includePatternInType) {
                const result = createNewTupleType(elementTypes);
                result.pattern = pattern;
                return result;
            }
            return createTupleType(elementTypes);
        }

        // Return the type implied by a binding pattern. This is the type implied purely by the binding pattern itself
        // and without regard to its context (i.e. without regard any type annotation or initializer associated with the
        // declaration in which the binding pattern is contained). For example, the implied type of [x, y] is [any, any]
        // and the implied type of { x, y: z = 1 } is { x: any; y: number; }. The type implied by a binding pattern is
        // used as the contextual type of an initializer associated with the binding pattern. Also, for a destructuring
        // parameter with no type annotation or initializer, the type implied by the binding pattern becomes the type of
        // the parameter.
        function getTypeFromBindingPattern(pattern: BindingPattern, includePatternInType?: boolean): Type {
            return pattern.kind === SyntaxKind.ObjectBindingPattern
                ? getTypeFromObjectBindingPattern(pattern, includePatternInType)
                : getTypeFromArrayBindingPattern(pattern, includePatternInType);
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
            let type = getTypeForVariableLikeDeclaration(declaration);
            if (type) {
                if (reportErrors) {
                    reportErrorsFromWidening(declaration, type);
                }
                // During a normal type check we'll never get to here with a property assignment (the check of the containing
                // object literal uses a different path). We exclude widening only so that language services and type verification
                // tools see the actual type.
                return declaration.kind !== SyntaxKind.PropertyAssignment ? getWidenedType(type) : type;
            }

            // Rest parameters default to type any[], other parameters default to type any
            type = declaration.dotDotDotToken ? anyArrayType : anyType;

            // Report implicit any errors unless this is a private property within an ambient declaration
            if (reportErrors && compilerOptions.noImplicitAny) {
                const root = getRootDeclaration(declaration);
                if (!isPrivateWithinAmbient(root) && !(root.kind === SyntaxKind.Parameter && isPrivateWithinAmbient(root.parent))) {
                    reportImplicitAnyError(declaration, type);
                }
            }
            return type;
        }

        function getTypeOfVariableOrParameterOrProperty(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.type) {
                // Handle prototype property
                if (symbol.flags & SymbolFlags.Prototype) {
                    return links.type = getTypeOfPrototypeProperty(symbol);
                }
                // Handle catch clause variables
                const declaration = symbol.valueDeclaration;
                if (declaration.parent.kind === SyntaxKind.CatchClause) {
                    return links.type = anyType;
                }
                // Handle export default expressions
                if (declaration.kind === SyntaxKind.ExportAssignment) {
                    return links.type = checkExpression((<ExportAssignment>declaration).expression);
                }
                // Handle module.exports = expr
                if (declaration.kind === SyntaxKind.BinaryExpression) {
                    return links.type = checkExpression((<BinaryExpression>declaration).right);
                }
                // Handle exports.p = expr
                if (declaration.kind === SyntaxKind.PropertyAccessExpression) {
                    return checkExpressionCached((<BinaryExpression>declaration.parent).right);
                }
                // Handle variable, parameter or property
                if (!pushTypeResolution(symbol, TypeSystemPropertyName.Type)) {
                    return unknownType;
                }
                let type = getWidenedTypeForVariableLikeDeclaration(<VariableLikeDeclaration>declaration, /*reportErrors*/ true);
                if (!popTypeResolution()) {
                    if ((<VariableLikeDeclaration>symbol.valueDeclaration).type) {
                        // Variable has type annotation that circularly references the variable itself
                        type = unknownType;
                        error(symbol.valueDeclaration, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_type_annotation,
                            symbolToString(symbol));
                    }
                    else {
                        // Variable has initializer that circularly references the variable itself
                        type = anyType;
                        if (compilerOptions.noImplicitAny) {
                            error(symbol.valueDeclaration, Diagnostics._0_implicitly_has_type_any_because_it_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer,
                                symbolToString(symbol));
                        }
                    }
                }
                links.type = type;
            }
            return links.type;
        }

        function getAnnotatedAccessorType(accessor: AccessorDeclaration): Type {
            if (accessor) {
                if (accessor.kind === SyntaxKind.GetAccessor) {
                    return accessor.type && getTypeFromTypeNode(accessor.type);
                }
                else {
                    const setterTypeAnnotation = getSetAccessorTypeAnnotationNode(accessor);
                    return setterTypeAnnotation && getTypeFromTypeNode(setterTypeAnnotation);
                }
            }
            return undefined;
        }

        function getTypeOfAccessors(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.type) {
                if (!pushTypeResolution(symbol, TypeSystemPropertyName.Type)) {
                    return unknownType;
                }
                const getter = <AccessorDeclaration>getDeclarationOfKind(symbol, SyntaxKind.GetAccessor);
                const setter = <AccessorDeclaration>getDeclarationOfKind(symbol, SyntaxKind.SetAccessor);
                let type: Type;
                // First try to see if the user specified a return type on the get-accessor.
                const getterReturnType = getAnnotatedAccessorType(getter);
                if (getterReturnType) {
                    type = getterReturnType;
                }
                else {
                    // If the user didn't specify a return type, try to use the set-accessor's parameter type.
                    const setterParameterType = getAnnotatedAccessorType(setter);
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
                if (!popTypeResolution()) {
                    type = anyType;
                    if (compilerOptions.noImplicitAny) {
                        const getter = <AccessorDeclaration>getDeclarationOfKind(symbol, SyntaxKind.GetAccessor);
                        error(getter, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                    }
                }
                links.type = type;
            }
            return links.type;
        }

        function getTypeOfFuncClassEnumModule(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = createObjectType(TypeFlags.Anonymous, symbol);
            }
            return links.type;
        }

        function getTypeOfEnumMember(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getDeclaredTypeOfEnum(getParentOfSymbol(symbol));
            }
            return links.type;
        }

        function getTypeOfAlias(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.type) {
                const targetSymbol = resolveAlias(symbol);

                // It only makes sense to get the type of a value symbol. If the result of resolving
                // the alias is not a value, then it has no type. To get the type associated with a
                // type symbol, call getDeclaredTypeOfSymbol.
                // This check is important because without it, a call to getTypeOfSymbol could end
                // up recursively calling getTypeOfAlias, causing a stack overflow.
                links.type = targetSymbol.flags & SymbolFlags.Value
                    ? getTypeOfSymbol(targetSymbol)
                    : unknownType;
            }
            return links.type;
        }

        function getTypeOfInstantiatedSymbol(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
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
            if (symbol.flags & SymbolFlags.Alias) {
                return getTypeOfAlias(symbol);
            }
            return unknownType;
        }

        function getTargetType(type: ObjectType): Type {
            return type.flags & TypeFlags.Reference ? (<TypeReference>type).target : type;
        }

        function hasBaseType(type: InterfaceType, checkBase: InterfaceType) {
            return check(type);
            function check(type: InterfaceType): boolean {
                const target = <InterfaceType>getTargetType(type);
                return target === checkBase || forEach(getBaseTypes(target), check);
            }
        }

        // Appends the type parameters given by a list of declarations to a set of type parameters and returns the resulting set.
        // The function allocates a new array if the input type parameter set is undefined, but otherwise it modifies the set
        // in-place and returns the same array.
        function appendTypeParameters(typeParameters: TypeParameter[], declarations: TypeParameterDeclaration[]): TypeParameter[] {
            for (const declaration of declarations) {
                const tp = getDeclaredTypeOfTypeParameter(getSymbolOfNode(declaration));
                if (!typeParameters) {
                    typeParameters = [tp];
                }
                else if (!contains(typeParameters, tp)) {
                    typeParameters.push(tp);
                }
            }
            return typeParameters;
        }

        // Appends the outer type parameters of a node to a set of type parameters and returns the resulting set. The function
        // allocates a new array if the input type parameter set is undefined, but otherwise it modifies the set in-place and
        // returns the same array.
        function appendOuterTypeParameters(typeParameters: TypeParameter[], node: Node): TypeParameter[] {
            while (true) {
                node = node.parent;
                if (!node) {
                    return typeParameters;
                }
                if (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression ||
                    node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.FunctionExpression ||
                    node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.ArrowFunction) {
                    const declarations = (<ClassLikeDeclaration | FunctionLikeDeclaration>node).typeParameters;
                    if (declarations) {
                        return appendTypeParameters(appendOuterTypeParameters(typeParameters, node), declarations);
                    }
                }
            }
        }

        // The outer type parameters are those defined by enclosing generic classes, methods, or functions.
        function getOuterTypeParametersOfClassOrInterface(symbol: Symbol): TypeParameter[] {
            const declaration = symbol.flags & SymbolFlags.Class ? symbol.valueDeclaration : getDeclarationOfKind(symbol, SyntaxKind.InterfaceDeclaration);
            return appendOuterTypeParameters(undefined, declaration);
        }

        // The local type parameters are the combined set of type parameters from all declarations of the class,
        // interface, or type alias.
        function getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol: Symbol): TypeParameter[] {
            let result: TypeParameter[];
            for (const node of symbol.declarations) {
                if (node.kind === SyntaxKind.InterfaceDeclaration || node.kind === SyntaxKind.ClassDeclaration ||
                    node.kind === SyntaxKind.ClassExpression || node.kind === SyntaxKind.TypeAliasDeclaration) {
                    const declaration = <InterfaceDeclaration | TypeAliasDeclaration>node;
                    if (declaration.typeParameters) {
                        result = appendTypeParameters(result, declaration.typeParameters);
                    }
                }
            }
            return result;
        }

        // The full set of type parameters for a generic class or interface type consists of its outer type parameters plus
        // its locally declared type parameters.
        function getTypeParametersOfClassOrInterface(symbol: Symbol): TypeParameter[] {
            return concatenate(getOuterTypeParametersOfClassOrInterface(symbol), getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol));
        }

        function isConstructorType(type: Type): boolean {
            return type.flags & TypeFlags.ObjectType && getSignaturesOfType(type, SignatureKind.Construct).length > 0;
        }

        function getBaseTypeNodeOfClass(type: InterfaceType): ExpressionWithTypeArguments {
            return getClassExtendsHeritageClauseElement(<ClassLikeDeclaration>type.symbol.valueDeclaration);
        }

        function getConstructorsForTypeArguments(type: ObjectType, typeArgumentNodes: TypeNode[]): Signature[] {
            const typeArgCount = typeArgumentNodes ? typeArgumentNodes.length : 0;
            return filter(getSignaturesOfType(type, SignatureKind.Construct),
                sig => (sig.typeParameters ? sig.typeParameters.length : 0) === typeArgCount);
        }

        function getInstantiatedConstructorsForTypeArguments(type: ObjectType, typeArgumentNodes: TypeNode[]): Signature[] {
            let signatures = getConstructorsForTypeArguments(type, typeArgumentNodes);
            if (typeArgumentNodes) {
                const typeArguments = map(typeArgumentNodes, getTypeFromTypeNode);
                signatures = map(signatures, sig => getSignatureInstantiation(sig, typeArguments));
            }
            return signatures;
        }

        // The base constructor of a class can resolve to
        // undefinedType if the class has no extends clause,
        // unknownType if an error occurred during resolution of the extends expression,
        // nullType if the extends expression is the null value, or
        // an object type with at least one construct signature.
        function getBaseConstructorTypeOfClass(type: InterfaceType): ObjectType {
            if (!type.resolvedBaseConstructorType) {
                const baseTypeNode = getBaseTypeNodeOfClass(type);
                if (!baseTypeNode) {
                    return type.resolvedBaseConstructorType = undefinedType;
                }
                if (!pushTypeResolution(type, TypeSystemPropertyName.ResolvedBaseConstructorType)) {
                    return unknownType;
                }
                const baseConstructorType = checkExpression(baseTypeNode.expression);
                if (baseConstructorType.flags & TypeFlags.ObjectType) {
                    // Resolving the members of a class requires us to resolve the base class of that class.
                    // We force resolution here such that we catch circularities now.
                    resolveStructuredTypeMembers(baseConstructorType);
                }
                if (!popTypeResolution()) {
                    error(type.symbol.valueDeclaration, Diagnostics._0_is_referenced_directly_or_indirectly_in_its_own_base_expression, symbolToString(type.symbol));
                    return type.resolvedBaseConstructorType = unknownType;
                }
                if (baseConstructorType !== unknownType && baseConstructorType !== nullType && !isConstructorType(baseConstructorType)) {
                    error(baseTypeNode.expression, Diagnostics.Type_0_is_not_a_constructor_function_type, typeToString(baseConstructorType));
                    return type.resolvedBaseConstructorType = unknownType;
                }
                type.resolvedBaseConstructorType = baseConstructorType;
            }
            return type.resolvedBaseConstructorType;
        }

        function hasClassBaseType(type: InterfaceType): boolean {
            return !!forEach(getBaseTypes(type), t => !!(t.symbol.flags & SymbolFlags.Class));
        }

        function getBaseTypes(type: InterfaceType): ObjectType[] {
            const isClass = type.symbol.flags & SymbolFlags.Class;
            const isInterface = type.symbol.flags & SymbolFlags.Interface;
            if (!type.resolvedBaseTypes) {
                if (!isClass && !isInterface) {
                    Debug.fail("type must be class or interface");
                }
                if (isClass) {
                    resolveBaseTypesOfClass(type);
                }
                if (isInterface) {
                    resolveBaseTypesOfInterface(type);
                }
            }
            return type.resolvedBaseTypes;
        }

        function resolveBaseTypesOfClass(type: InterfaceType): void {
            type.resolvedBaseTypes = type.resolvedBaseTypes || emptyArray;
            const baseConstructorType = getBaseConstructorTypeOfClass(type);
            if (!(baseConstructorType.flags & TypeFlags.ObjectType)) {
                return;
            }
            const baseTypeNode = getBaseTypeNodeOfClass(type);
            let baseType: Type;
            const originalBaseType = baseConstructorType && baseConstructorType.symbol ? getDeclaredTypeOfSymbol(baseConstructorType.symbol) : undefined;
            if (baseConstructorType.symbol && baseConstructorType.symbol.flags & SymbolFlags.Class &&
                areAllOuterTypeParametersApplied(originalBaseType)) {
                // When base constructor type is a class with no captured type arguments we know that the constructors all have the same type parameters as the
                // class and all return the instance type of the class. There is no need for further checks and we can apply the
                // type arguments in the same manner as a type reference to get the same error reporting experience.
                baseType = getTypeFromClassOrInterfaceReference(baseTypeNode, baseConstructorType.symbol);
            }
            else {
                // The class derives from a "class-like" constructor function, check that we have at least one construct signature
                // with a matching number of type parameters and use the return type of the first instantiated signature. Elsewhere
                // we check that all instantiated signatures return the same type.
                const constructors = getInstantiatedConstructorsForTypeArguments(baseConstructorType, baseTypeNode.typeArguments);
                if (!constructors.length) {
                    error(baseTypeNode.expression, Diagnostics.No_base_constructor_has_the_specified_number_of_type_arguments);
                    return;
                }
                baseType = getReturnTypeOfSignature(constructors[0]);
            }
            if (baseType === unknownType) {
                return;
            }
            if (!(getTargetType(baseType).flags & (TypeFlags.Class | TypeFlags.Interface))) {
                error(baseTypeNode.expression, Diagnostics.Base_constructor_return_type_0_is_not_a_class_or_interface_type, typeToString(baseType));
                return;
            }
            if (type === baseType || hasBaseType(<InterfaceType>baseType, type)) {
                error(type.symbol.valueDeclaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type,
                    typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.WriteArrayAsGenericType));
                return;
            }
            if (type.resolvedBaseTypes === emptyArray) {
                type.resolvedBaseTypes = [baseType];
            }
            else {
                type.resolvedBaseTypes.push(baseType);
            }
        }

        function areAllOuterTypeParametersApplied(type: Type): boolean {
            // An unapplied type parameter has its symbol still the same as the matching argument symbol.
            // Since parameters are applied outer-to-inner, only the last outer parameter needs to be checked.
            const outerTypeParameters = (<InterfaceType>type).outerTypeParameters;
            if (outerTypeParameters) {
                const last = outerTypeParameters.length - 1;
                const typeArguments = (<TypeReference>type).typeArguments;
                return outerTypeParameters[last].symbol !== typeArguments[last].symbol;
            }
            return true;
        }

        function resolveBaseTypesOfInterface(type: InterfaceType): void {
            type.resolvedBaseTypes = type.resolvedBaseTypes || emptyArray;
            for (const declaration of type.symbol.declarations) {
                if (declaration.kind === SyntaxKind.InterfaceDeclaration && getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration)) {
                    for (const node of getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration)) {
                        const baseType = getTypeFromTypeNode(node);
                        if (baseType !== unknownType) {
                            if (getTargetType(baseType).flags & (TypeFlags.Class | TypeFlags.Interface)) {
                                if (type !== baseType && !hasBaseType(<InterfaceType>baseType, type)) {
                                    if (type.resolvedBaseTypes === emptyArray) {
                                        type.resolvedBaseTypes = [baseType];
                                    }
                                    else {
                                        type.resolvedBaseTypes.push(baseType);
                                    }
                                }
                                else {
                                    error(declaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.WriteArrayAsGenericType));
                                }
                            }
                            else {
                                error(node, Diagnostics.An_interface_may_only_extend_a_class_or_another_interface);
                            }
                        }
                    }
                }
            }
        }

        // Returns true if the interface given by the symbol is free of "this" references. Specifically, the result is
        // true if the interface itself contains no references to "this" in its body, if all base types are interfaces,
        // and if none of the base interfaces have a "this" type.
        function isIndependentInterface(symbol: Symbol): boolean {
            for (const declaration of symbol.declarations) {
                if (declaration.kind === SyntaxKind.InterfaceDeclaration) {
                    if (declaration.flags & NodeFlags.ContainsThis) {
                        return false;
                    }
                    const baseTypeNodes = getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration);
                    if (baseTypeNodes) {
                        for (const node of baseTypeNodes) {
                            if (isSupportedExpressionWithTypeArguments(node)) {
                                const baseSymbol = resolveEntityName(node.expression, SymbolFlags.Type, /*ignoreErrors*/ true);
                                if (!baseSymbol || !(baseSymbol.flags & SymbolFlags.Interface) || getDeclaredTypeOfClassOrInterface(baseSymbol).thisType) {
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }

        function getDeclaredTypeOfClassOrInterface(symbol: Symbol): InterfaceType {
            const links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                const kind = symbol.flags & SymbolFlags.Class ? TypeFlags.Class : TypeFlags.Interface;
                const type = links.declaredType = <InterfaceType>createObjectType(kind, symbol);
                const outerTypeParameters = getOuterTypeParametersOfClassOrInterface(symbol);
                const localTypeParameters = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                // A class or interface is generic if it has type parameters or a "this" type. We always give classes a "this" type
                // because it is not feasible to analyze all members to determine if the "this" type escapes the class (in particular,
                // property types inferred from initializers and method return types inferred from return statements are very hard
                // to exhaustively analyze). We give interfaces a "this" type if we can't definitely determine that they are free of
                // "this" references.
                if (outerTypeParameters || localTypeParameters || kind === TypeFlags.Class || !isIndependentInterface(symbol)) {
                    type.flags |= TypeFlags.Reference;
                    type.typeParameters = concatenate(outerTypeParameters, localTypeParameters);
                    type.outerTypeParameters = outerTypeParameters;
                    type.localTypeParameters = localTypeParameters;
                    (<GenericType>type).instantiations = {};
                    (<GenericType>type).instantiations[getTypeListId(type.typeParameters)] = <GenericType>type;
                    (<GenericType>type).target = <GenericType>type;
                    (<GenericType>type).typeArguments = type.typeParameters;
                    type.thisType = <TypeParameter>createType(TypeFlags.TypeParameter | TypeFlags.ThisType);
                    type.thisType.symbol = symbol;
                    type.thisType.constraint = type;
                }
            }
            return <InterfaceType>links.declaredType;
        }

        function getDeclaredTypeOfTypeAlias(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                // Note that we use the links object as the target here because the symbol object is used as the unique
                // identity for resolution of the 'type' property in SymbolLinks.
                if (!pushTypeResolution(symbol, TypeSystemPropertyName.DeclaredType)) {
                    return unknownType;
                }
                const declaration = <TypeAliasDeclaration>getDeclarationOfKind(symbol, SyntaxKind.TypeAliasDeclaration);
                let type = getTypeFromTypeNode(declaration.type);
                if (popTypeResolution()) {
                    links.typeParameters = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                    if (links.typeParameters) {
                        // Initialize the instantiation cache for generic type aliases. The declared type corresponds to
                        // an instantiation of the type alias with the type parameters supplied as type arguments.
                        links.instantiations = {};
                        links.instantiations[getTypeListId(links.typeParameters)] = type;
                    }
                }
                else {
                    type = unknownType;
                    error(declaration.name, Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
                }
                links.declaredType = type;
            }
            return links.declaredType;
        }

        function getDeclaredTypeOfEnum(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                const type = createType(TypeFlags.Enum);
                type.symbol = symbol;
                links.declaredType = type;
            }
            return links.declaredType;
        }

        function getDeclaredTypeOfTypeParameter(symbol: Symbol): TypeParameter {
            const links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                const type = <TypeParameter>createType(TypeFlags.TypeParameter);
                type.symbol = symbol;
                if (!(<TypeParameterDeclaration>getDeclarationOfKind(symbol, SyntaxKind.TypeParameter)).constraint) {
                    type.constraint = noConstraintType;
                }
                links.declaredType = type;
            }
            return <TypeParameter>links.declaredType;
        }

        function getDeclaredTypeOfAlias(symbol: Symbol): Type {
            const links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = getDeclaredTypeOfSymbol(resolveAlias(symbol));
            }
            return links.declaredType;
        }

        function getDeclaredTypeOfSymbol(symbol: Symbol): Type {
            Debug.assert((symbol.flags & SymbolFlags.Instantiated) === 0);
            if (symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                return getDeclaredTypeOfClassOrInterface(symbol);
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
            if (symbol.flags & SymbolFlags.Alias) {
                return getDeclaredTypeOfAlias(symbol);
            }
            return unknownType;
        }

        // A type reference is considered independent if each type argument is considered independent.
        function isIndependentTypeReference(node: TypeReferenceNode): boolean {
            if (node.typeArguments) {
                for (const typeNode of node.typeArguments) {
                    if (!isIndependentType(typeNode)) {
                        return false;
                    }
                }
            }
            return true;
        }

        // A type is considered independent if it the any, string, number, boolean, symbol, or void keyword, a string
        // literal type, an array with an element type that is considered independent, or a type reference that is
        // considered independent.
        function isIndependentType(node: TypeNode): boolean {
            switch (node.kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.SymbolKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.StringLiteral:
                    return true;
                case SyntaxKind.ArrayType:
                    return isIndependentType((<ArrayTypeNode>node).elementType);
                case SyntaxKind.TypeReference:
                    return isIndependentTypeReference(<TypeReferenceNode>node);
            }
            return false;
        }

        // A variable-like declaration is considered independent (free of this references) if it has a type annotation
        // that specifies an independent type, or if it has no type annotation and no initializer (and thus of type any).
        function isIndependentVariableLikeDeclaration(node: VariableLikeDeclaration): boolean {
            return node.type && isIndependentType(node.type) || !node.type && !node.initializer;
        }

        // A function-like declaration is considered independent (free of this references) if it has a return type
        // annotation that is considered independent and if each parameter is considered independent.
        function isIndependentFunctionLikeDeclaration(node: FunctionLikeDeclaration): boolean {
            if (node.kind !== SyntaxKind.Constructor && (!node.type || !isIndependentType(node.type))) {
                return false;
            }
            for (const parameter of node.parameters) {
                if (!isIndependentVariableLikeDeclaration(parameter)) {
                    return false;
                }
            }
            return true;
        }

        // Returns true if the class or interface member given by the symbol is free of "this" references. The
        // function may return false for symbols that are actually free of "this" references because it is not
        // feasible to perform a complete analysis in all cases. In particular, property members with types
        // inferred from their initializers and function members with inferred return types are convervatively
        // assumed not to be free of "this" references.
        function isIndependentMember(symbol: Symbol): boolean {
            if (symbol.declarations && symbol.declarations.length === 1) {
                const declaration = symbol.declarations[0];
                if (declaration) {
                    switch (declaration.kind) {
                        case SyntaxKind.PropertyDeclaration:
                        case SyntaxKind.PropertySignature:
                            return isIndependentVariableLikeDeclaration(<VariableLikeDeclaration>declaration);
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                        case SyntaxKind.Constructor:
                            return isIndependentFunctionLikeDeclaration(<FunctionLikeDeclaration>declaration);
                    }
                }
            }
            return false;
        }

        function createSymbolTable(symbols: Symbol[]): SymbolTable {
            const result: SymbolTable = {};
            for (const symbol of symbols) {
                result[symbol.name] = symbol;
            }
            return result;
        }

        // The mappingThisOnly flag indicates that the only type parameter being mapped is "this". When the flag is true,
        // we check symbols to see if we can quickly conclude they are free of "this" references, thus needing no instantiation.
        function createInstantiatedSymbolTable(symbols: Symbol[], mapper: TypeMapper, mappingThisOnly: boolean): SymbolTable {
            const result: SymbolTable = {};
            for (const symbol of symbols) {
                result[symbol.name] = mappingThisOnly && isIndependentMember(symbol) ? symbol : instantiateSymbol(symbol, mapper);
            }
            return result;
        }

        function addInheritedMembers(symbols: SymbolTable, baseSymbols: Symbol[]) {
            for (const s of baseSymbols) {
                if (!hasProperty(symbols, s.name)) {
                    symbols[s.name] = s;
                }
            }
        }

        function addInheritedSignatures(signatures: Signature[], baseSignatures: Signature[]) {
            if (baseSignatures) {
                for (const signature of baseSignatures) {
                    signatures.push(signature);
                }
            }
        }

        function resolveDeclaredMembers(type: InterfaceType): InterfaceTypeWithDeclaredMembers {
            if (!(<InterfaceTypeWithDeclaredMembers>type).declaredProperties) {
                const symbol = type.symbol;
                (<InterfaceTypeWithDeclaredMembers>type).declaredProperties = getNamedMembers(symbol.members);
                (<InterfaceTypeWithDeclaredMembers>type).declaredCallSignatures = getSignaturesOfSymbol(symbol.members["__call"]);
                (<InterfaceTypeWithDeclaredMembers>type).declaredConstructSignatures = getSignaturesOfSymbol(symbol.members["__new"]);
                (<InterfaceTypeWithDeclaredMembers>type).declaredStringIndexType = getIndexTypeOfSymbol(symbol, IndexKind.String);
                (<InterfaceTypeWithDeclaredMembers>type).declaredNumberIndexType = getIndexTypeOfSymbol(symbol, IndexKind.Number);
            }
            return <InterfaceTypeWithDeclaredMembers>type;
        }

        function getTypeWithThisArgument(type: ObjectType, thisArgument?: Type) {
            if (type.flags & TypeFlags.Reference) {
                return createTypeReference((<TypeReference>type).target,
                    concatenate((<TypeReference>type).typeArguments, [thisArgument || (<TypeReference>type).target.thisType]));
            }
            return type;
        }

        function resolveObjectTypeMembers(type: ObjectType, source: InterfaceTypeWithDeclaredMembers, typeParameters: TypeParameter[], typeArguments: Type[]) {
            let mapper = identityMapper;
            let members = source.symbol.members;
            let callSignatures = source.declaredCallSignatures;
            let constructSignatures = source.declaredConstructSignatures;
            let stringIndexType = source.declaredStringIndexType;
            let numberIndexType = source.declaredNumberIndexType;
            if (!rangeEquals(typeParameters, typeArguments, 0, typeParameters.length)) {
                mapper = createTypeMapper(typeParameters, typeArguments);
                members = createInstantiatedSymbolTable(source.declaredProperties, mapper, /*mappingThisOnly*/ typeParameters.length === 1);
                callSignatures = instantiateList(source.declaredCallSignatures, mapper, instantiateSignature);
                constructSignatures = instantiateList(source.declaredConstructSignatures, mapper, instantiateSignature);
                stringIndexType = instantiateType(source.declaredStringIndexType, mapper);
                numberIndexType = instantiateType(source.declaredNumberIndexType, mapper);
            }
            const baseTypes = getBaseTypes(source);
            if (baseTypes.length) {
                if (members === source.symbol.members) {
                    members = createSymbolTable(source.declaredProperties);
                }
                const thisArgument = lastOrUndefined(typeArguments);
                for (const baseType of baseTypes) {
                    const instantiatedBaseType = thisArgument ? getTypeWithThisArgument(instantiateType(baseType, mapper), thisArgument) : baseType;
                    addInheritedMembers(members, getPropertiesOfObjectType(instantiatedBaseType));
                    callSignatures = concatenate(callSignatures, getSignaturesOfType(instantiatedBaseType, SignatureKind.Call));
                    constructSignatures = concatenate(constructSignatures, getSignaturesOfType(instantiatedBaseType, SignatureKind.Construct));
                    stringIndexType = stringIndexType || getIndexTypeOfType(instantiatedBaseType, IndexKind.String);
                    numberIndexType = numberIndexType || getIndexTypeOfType(instantiatedBaseType, IndexKind.Number);
                }
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function resolveClassOrInterfaceMembers(type: InterfaceType): void {
            resolveObjectTypeMembers(type, resolveDeclaredMembers(type), emptyArray, emptyArray);
        }

        function resolveTypeReferenceMembers(type: TypeReference): void {
            const source = resolveDeclaredMembers(type.target);
            const typeParameters = concatenate(source.typeParameters, [source.thisType]);
            const typeArguments = type.typeArguments && type.typeArguments.length === typeParameters.length ?
                type.typeArguments : concatenate(type.typeArguments, [type]);
            resolveObjectTypeMembers(type, source, typeParameters, typeArguments);
        }

        function createSignature(declaration: SignatureDeclaration, typeParameters: TypeParameter[], parameters: Symbol[],
            resolvedReturnType: Type, typePredicate: TypePredicate, minArgumentCount: number, hasRestParameter: boolean, hasStringLiterals: boolean): Signature {
            const sig = new Signature(checker);
            sig.declaration = declaration;
            sig.typeParameters = typeParameters;
            sig.parameters = parameters;
            sig.resolvedReturnType = resolvedReturnType;
            sig.typePredicate = typePredicate;
            sig.minArgumentCount = minArgumentCount;
            sig.hasRestParameter = hasRestParameter;
            sig.hasStringLiterals = hasStringLiterals;
            return sig;
        }

        function cloneSignature(sig: Signature): Signature {
            return createSignature(sig.declaration, sig.typeParameters, sig.parameters, sig.resolvedReturnType, sig.typePredicate,
                sig.minArgumentCount, sig.hasRestParameter, sig.hasStringLiterals);
        }

        function getDefaultConstructSignatures(classType: InterfaceType): Signature[] {
            if (!hasClassBaseType(classType)) {
                return [createSignature(undefined, classType.localTypeParameters, emptyArray, classType, undefined, 0, /*hasRestParameter*/ false, /*hasStringLiterals*/ false)];
            }
            const baseConstructorType = getBaseConstructorTypeOfClass(classType);
            const baseSignatures = getSignaturesOfType(baseConstructorType, SignatureKind.Construct);
            const baseTypeNode = getBaseTypeNodeOfClass(classType);
            const typeArguments = map(baseTypeNode.typeArguments, getTypeFromTypeNode);
            const typeArgCount = typeArguments ? typeArguments.length : 0;
            const result: Signature[] = [];
            for (const baseSig of baseSignatures) {
                const typeParamCount = baseSig.typeParameters ? baseSig.typeParameters.length : 0;
                if (typeParamCount === typeArgCount) {
                    const sig = typeParamCount ? getSignatureInstantiation(baseSig, typeArguments) : cloneSignature(baseSig);
                    sig.typeParameters = classType.localTypeParameters;
                    sig.resolvedReturnType = classType;
                    result.push(sig);
                }
            }
            return result;
        }

        function createTupleTypeMemberSymbols(memberTypes: Type[]): SymbolTable {
            const members: SymbolTable = {};
            for (let i = 0; i < memberTypes.length; i++) {
                const symbol = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient, "" + i);
                symbol.type = memberTypes[i];
                members[i] = symbol;
            }
            return members;
        }

        function resolveTupleTypeMembers(type: TupleType) {
            const arrayElementType = getUnionType(type.elementTypes, /*noSubtypeReduction*/ true);
            // Make the tuple type itself the 'this' type by including an extra type argument
            const arrayType = resolveStructuredTypeMembers(createTypeFromGenericGlobalType(globalArrayType, [arrayElementType, type]));
            const members = createTupleTypeMemberSymbols(type.elementTypes);
            addInheritedMembers(members, arrayType.properties);
            setObjectTypeMembers(type, members, arrayType.callSignatures, arrayType.constructSignatures, arrayType.stringIndexType, arrayType.numberIndexType);
        }

        function findMatchingSignature(signatureList: Signature[], signature: Signature, partialMatch: boolean, ignoreReturnTypes: boolean): Signature {
            for (const s of signatureList) {
                if (compareSignatures(s, signature, partialMatch, ignoreReturnTypes, compareTypes)) {
                    return s;
                }
            }
        }

        function findMatchingSignatures(signatureLists: Signature[][], signature: Signature, listIndex: number): Signature[] {
            if (signature.typeParameters) {
                // We require an exact match for generic signatures, so we only return signatures from the first
                // signature list and only if they have exact matches in the other signature lists.
                if (listIndex > 0) {
                    return undefined;
                }
                for (let i = 1; i < signatureLists.length; i++) {
                    if (!findMatchingSignature(signatureLists[i], signature, /*partialMatch*/ false, /*ignoreReturnTypes*/ false)) {
                        return undefined;
                    }
                }
                return [signature];
            }
            let result: Signature[] = undefined;
            for (let i = 0; i < signatureLists.length; i++) {
                // Allow matching non-generic signatures to have excess parameters and different return types
                const match = i === listIndex ? signature : findMatchingSignature(signatureLists[i], signature, /*partialMatch*/ true, /*ignoreReturnTypes*/ true);
                if (!match) {
                    return undefined;
                }
                if (!contains(result, match)) {
                    (result || (result = [])).push(match);
                }
            }
            return result;
        }

        // The signatures of a union type are those signatures that are present in each of the constituent types.
        // Generic signatures must match exactly, but non-generic signatures are allowed to have extra optional
        // parameters and may differ in return types. When signatures differ in return types, the resulting return
        // type is the union of the constituent return types.
        function getUnionSignatures(types: Type[], kind: SignatureKind): Signature[] {
            const signatureLists = map(types, t => getSignaturesOfType(t, kind));
            let result: Signature[] = undefined;
            for (let i = 0; i < signatureLists.length; i++) {
                for (const signature of signatureLists[i]) {
                    // Only process signatures with parameter lists that aren't already in the result list
                    if (!result || !findMatchingSignature(result, signature, /*partialMatch*/ false, /*ignoreReturnTypes*/ true)) {
                        const unionSignatures = findMatchingSignatures(signatureLists, signature, i);
                        if (unionSignatures) {
                            let s = signature;
                            // Union the result types when more than one signature matches
                            if (unionSignatures.length > 1) {
                                s = cloneSignature(signature);
                                // Clear resolved return type we possibly got from cloneSignature
                                s.resolvedReturnType = undefined;
                                s.unionSignatures = unionSignatures;
                            }
                            (result || (result = [])).push(s);
                        }
                    }
                }
            }
            return result || emptyArray;
        }

        function getUnionIndexType(types: Type[], kind: IndexKind): Type {
            const indexTypes: Type[] = [];
            for (const type of types) {
                const indexType = getIndexTypeOfType(type, kind);
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
            const callSignatures = getUnionSignatures(type.types, SignatureKind.Call);
            const constructSignatures = getUnionSignatures(type.types, SignatureKind.Construct);
            const stringIndexType = getUnionIndexType(type.types, IndexKind.String);
            const numberIndexType = getUnionIndexType(type.types, IndexKind.Number);
            setObjectTypeMembers(type, emptySymbols, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function intersectTypes(type1: Type, type2: Type): Type {
            return !type1 ? type2 : !type2 ? type1 : getIntersectionType([type1, type2]);
        }

        function resolveIntersectionTypeMembers(type: IntersectionType) {
            // The members and properties collections are empty for intersection types. To get all properties of an
            // intersection type use getPropertiesOfType (only the language service uses this).
            let callSignatures: Signature[] = emptyArray;
            let constructSignatures: Signature[] = emptyArray;
            let stringIndexType: Type = undefined;
            let numberIndexType: Type = undefined;
            for (const t of type.types) {
                callSignatures = concatenate(callSignatures, getSignaturesOfType(t, SignatureKind.Call));
                constructSignatures = concatenate(constructSignatures, getSignaturesOfType(t, SignatureKind.Construct));
                stringIndexType = intersectTypes(stringIndexType, getIndexTypeOfType(t, IndexKind.String));
                numberIndexType = intersectTypes(numberIndexType, getIndexTypeOfType(t, IndexKind.Number));
            }
            setObjectTypeMembers(type, emptySymbols, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function resolveAnonymousTypeMembers(type: AnonymousType) {
            const symbol = type.symbol;
            let members: SymbolTable;
            let callSignatures: Signature[];
            let constructSignatures: Signature[];
            let stringIndexType: Type;
            let numberIndexType: Type;

            if (type.target) {
                members = createInstantiatedSymbolTable(getPropertiesOfObjectType(type.target), type.mapper, /*mappingThisOnly*/ false);
                callSignatures = instantiateList(getSignaturesOfType(type.target, SignatureKind.Call), type.mapper, instantiateSignature);
                constructSignatures = instantiateList(getSignaturesOfType(type.target, SignatureKind.Construct), type.mapper, instantiateSignature);
                stringIndexType = instantiateType(getIndexTypeOfType(type.target, IndexKind.String), type.mapper);
                numberIndexType = instantiateType(getIndexTypeOfType(type.target, IndexKind.Number), type.mapper);
            }
            else if (symbol.flags & SymbolFlags.TypeLiteral) {
                members = symbol.members;
                callSignatures = getSignaturesOfSymbol(members["__call"]);
                constructSignatures = getSignaturesOfSymbol(members["__new"]);
                stringIndexType = getIndexTypeOfSymbol(symbol, IndexKind.String);
                numberIndexType = getIndexTypeOfSymbol(symbol, IndexKind.Number);
            }
            else {
                // Combinations of function, class, enum and module
                members = emptySymbols;
                callSignatures = emptyArray;
                constructSignatures = emptyArray;
                if (symbol.flags & SymbolFlags.HasExports) {
                    members = getExportsOfSymbol(symbol);
                }
                if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method)) {
                    callSignatures = getSignaturesOfSymbol(symbol);
                }
                if (symbol.flags & SymbolFlags.Class) {
                    const classType = getDeclaredTypeOfClassOrInterface(symbol);
                    constructSignatures = getSignaturesOfSymbol(symbol.members["__constructor"]);
                    if (!constructSignatures.length) {
                        constructSignatures = getDefaultConstructSignatures(classType);
                    }
                    const baseConstructorType = getBaseConstructorTypeOfClass(classType);
                    if (baseConstructorType.flags & TypeFlags.ObjectType) {
                        members = createSymbolTable(getNamedMembers(members));
                        addInheritedMembers(members, getPropertiesOfObjectType(baseConstructorType));
                    }
                }
                stringIndexType = undefined;
                numberIndexType = (symbol.flags & SymbolFlags.Enum) ? stringType : undefined;
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }

        function resolveStructuredTypeMembers(type: ObjectType): ResolvedType {
            if (!(<ResolvedType>type).members) {
                if (type.flags & TypeFlags.Reference) {
                    resolveTypeReferenceMembers(<TypeReference>type);
                }
                else if (type.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                    resolveClassOrInterfaceMembers(<InterfaceType>type);
                }
                else if (type.flags & TypeFlags.Anonymous) {
                    resolveAnonymousTypeMembers(<AnonymousType>type);
                }
                else if (type.flags & TypeFlags.Tuple) {
                    resolveTupleTypeMembers(<TupleType>type);
                }
                else if (type.flags & TypeFlags.Union) {
                    resolveUnionTypeMembers(<UnionType>type);
                }
                else if (type.flags & TypeFlags.Intersection) {
                    resolveIntersectionTypeMembers(<IntersectionType>type);
                }
            }
            return <ResolvedType>type;
        }

        // Return properties of an object type or an empty array for other types
        function getPropertiesOfObjectType(type: Type): Symbol[] {
            if (type.flags & TypeFlags.ObjectType) {
                return resolveStructuredTypeMembers(<ObjectType>type).properties;
            }
            return emptyArray;
        }

        // If the given type is an object type and that type has a property by the given name,
        // return the symbol for that property.Otherwise return undefined.
        function getPropertyOfObjectType(type: Type, name: string): Symbol {
            if (type.flags & TypeFlags.ObjectType) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                if (hasProperty(resolved.members, name)) {
                    const symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }
        }

        function getPropertiesOfUnionOrIntersectionType(type: UnionOrIntersectionType): Symbol[] {
            for (const current of type.types) {
                for (const prop of getPropertiesOfType(current)) {
                    getPropertyOfUnionOrIntersectionType(type, prop.name);
                }
                // The properties of a union type are those that are present in all constituent types, so
                // we only need to check the properties of the first type
                if (type.flags & TypeFlags.Union) {
                    break;
                }
            }
            return type.resolvedProperties ? symbolsToArray(type.resolvedProperties) : emptyArray;
        }

        function getPropertiesOfType(type: Type): Symbol[] {
            type = getApparentType(type);
            return type.flags & TypeFlags.UnionOrIntersection ? getPropertiesOfUnionOrIntersectionType(<UnionType>type) : getPropertiesOfObjectType(type);
        }

        /**
         * The apparent type of a type parameter is the base constraint instantiated with the type parameter
         * as the type argument for the 'this' type.
         */
        function getApparentTypeOfTypeParameter(type: TypeParameter) {
            if (!type.resolvedApparentType) {
                let constraintType = getConstraintOfTypeParameter(type);
                while (constraintType && constraintType.flags & TypeFlags.TypeParameter) {
                    constraintType = getConstraintOfTypeParameter(<TypeParameter>constraintType);
                }
                type.resolvedApparentType = getTypeWithThisArgument(constraintType || emptyObjectType, type);
            }
            return type.resolvedApparentType;
        }

        /**
         * For a type parameter, return the base constraint of the type parameter. For the string, number,
         * boolean, and symbol primitive types, return the corresponding object types. Otherwise return the
         * type itself. Note that the apparent type of a union type is the union type itself.
         */
        function getApparentType(type: Type): Type {
            if (type.flags & TypeFlags.TypeParameter) {
                type = getApparentTypeOfTypeParameter(<TypeParameter>type);
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
            else if (type.flags & TypeFlags.ESSymbol) {
                type = globalESSymbolType;
            }
            return type;
        }

        function createUnionOrIntersectionProperty(containingType: UnionOrIntersectionType, name: string): Symbol {
            const types = containingType.types;
            let props: Symbol[];
            for (const current of types) {
                const type = getApparentType(current);
                if (type !== unknownType) {
                    const prop = getPropertyOfType(type, name);
                    if (prop && !(getDeclarationFlagsFromSymbol(prop) & (NodeFlags.Private | NodeFlags.Protected))) {
                        if (!props) {
                            props = [prop];
                        }
                        else if (!contains(props, prop)) {
                            props.push(prop);
                        }
                    }
                    else if (containingType.flags & TypeFlags.Union) {
                        // A union type requires the property to be present in all constituent types
                        return undefined;
                    }
                }
            }
            if (!props) {
                return undefined;
            }
            if (props.length === 1) {
                return props[0];
            }
            const propTypes: Type[] = [];
            const declarations: Declaration[] = [];
            for (const prop of props) {
                if (prop.declarations) {
                    addRange(declarations, prop.declarations);
                }
                propTypes.push(getTypeOfSymbol(prop));
            }
            const result = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient | SymbolFlags.SyntheticProperty, name);
            result.containingType = containingType;
            result.declarations = declarations;
            result.type = containingType.flags & TypeFlags.Union ? getUnionType(propTypes) : getIntersectionType(propTypes);
            return result;
        }

        function getPropertyOfUnionOrIntersectionType(type: UnionOrIntersectionType, name: string): Symbol {
            const properties = type.resolvedProperties || (type.resolvedProperties = {});
            if (hasProperty(properties, name)) {
                return properties[name];
            }
            const property = createUnionOrIntersectionProperty(type, name);
            if (property) {
                properties[name] = property;
            }
            return property;
        }

        // Return the symbol for the property with the given name in the given type. Creates synthetic union properties when
        // necessary, maps primitive types and type parameters are to their apparent types, and augments with properties from
        // Object and Function as appropriate.
        function getPropertyOfType(type: Type, name: string): Symbol {
            type = getApparentType(type);
            if (type.flags & TypeFlags.ObjectType) {
                const resolved = resolveStructuredTypeMembers(type);
                if (hasProperty(resolved.members, name)) {
                    const symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
                if (resolved === anyFunctionType || resolved.callSignatures.length || resolved.constructSignatures.length) {
                    const symbol = getPropertyOfObjectType(globalFunctionType, name);
                    if (symbol) {
                        return symbol;
                    }
                }
                return getPropertyOfObjectType(globalObjectType, name);
            }
            if (type.flags & TypeFlags.UnionOrIntersection) {
                return getPropertyOfUnionOrIntersectionType(<UnionOrIntersectionType>type, name);
            }
            return undefined;
        }

        function getSignaturesOfStructuredType(type: Type, kind: SignatureKind): Signature[] {
            if (type.flags & TypeFlags.StructuredType) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                return kind === SignatureKind.Call ? resolved.callSignatures : resolved.constructSignatures;
            }
            return emptyArray;
        }

        /**
         * Return the signatures of the given kind in the given type. Creates synthetic union signatures when necessary and
         * maps primitive types and type parameters are to their apparent types.
         */
        function getSignaturesOfType(type: Type, kind: SignatureKind): Signature[] {
            return getSignaturesOfStructuredType(getApparentType(type), kind);
        }

        function typeHasConstructSignatures(type: Type): boolean {
            const apparentType = getApparentType(type);
            if (apparentType.flags & (TypeFlags.ObjectType | TypeFlags.Union)) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                return resolved.constructSignatures.length > 0;
            }
            return false;
        }

        function typeHasCallOrConstructSignatures(type: Type): boolean {
            const apparentType = getApparentType(type);
            if (apparentType.flags & TypeFlags.StructuredType) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                return resolved.callSignatures.length > 0 || resolved.constructSignatures.length > 0;
            }
            return false;
        }

        function getIndexTypeOfStructuredType(type: Type, kind: IndexKind): Type {
            if (type.flags & TypeFlags.StructuredType) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                return kind === IndexKind.String ? resolved.stringIndexType : resolved.numberIndexType;
            }
        }

        // Return the index type of the given kind in the given type. Creates synthetic union index types when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getIndexTypeOfType(type: Type, kind: IndexKind): Type {
            return getIndexTypeOfStructuredType(getApparentType(type), kind);
        }

        // Return list of type parameters with duplicates removed (duplicate identifier errors are generated in the actual
        // type checking functions).
        function getTypeParametersFromDeclaration(typeParameterDeclarations: TypeParameterDeclaration[]): TypeParameter[] {
            const result: TypeParameter[] = [];
            forEach(typeParameterDeclarations, node => {
                const tp = getDeclaredTypeOfTypeParameter(node.symbol);
                if (!contains(result, tp)) {
                    result.push(tp);
                }
            });
            return result;
        }

        function symbolsToArray(symbols: SymbolTable): Symbol[] {
            const result: Symbol[] = [];
            for (const id in symbols) {
                if (!isReservedMemberName(id)) {
                    result.push(symbols[id]);
                }
            }
            return result;
        }

        function isOptionalParameter(node: ParameterDeclaration) {
            if (hasQuestionToken(node)) {
                return true;
            }

            if (node.initializer) {
                const signatureDeclaration = <SignatureDeclaration>node.parent;
                const signature = getSignatureFromDeclaration(signatureDeclaration);
                const parameterIndex = ts.indexOf(signatureDeclaration.parameters, node);
                Debug.assert(parameterIndex >= 0);
                return parameterIndex >= signature.minArgumentCount;
            }

            return false;
        }

        function getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature {
            const links = getNodeLinks(declaration);
            if (!links.resolvedSignature) {
                const classType = declaration.kind === SyntaxKind.Constructor ?
                    getDeclaredTypeOfClassOrInterface(getMergedSymbol((<ClassDeclaration>declaration.parent).symbol))
                    : undefined;
                const typeParameters = classType ? classType.localTypeParameters :
                    declaration.typeParameters ? getTypeParametersFromDeclaration(declaration.typeParameters) : undefined;
                const parameters: Symbol[] = [];
                let hasStringLiterals = false;
                let minArgumentCount = -1;
                for (let i = 0, n = declaration.parameters.length; i < n; i++) {
                    const param = declaration.parameters[i];
                    let paramSymbol = param.symbol;
                    // Include parameter symbol instead of property symbol in the signature
                    if (paramSymbol && !!(paramSymbol.flags & SymbolFlags.Property) && !isBindingPattern(param.name)) {
                        const resolvedSymbol = resolveName(param, paramSymbol.name, SymbolFlags.Value, undefined, undefined);
                        paramSymbol = resolvedSymbol;
                    }
                    parameters.push(paramSymbol);
                    if (param.type && param.type.kind === SyntaxKind.StringLiteral) {
                        hasStringLiterals = true;
                    }

                    if (param.initializer || param.questionToken || param.dotDotDotToken) {
                        if (minArgumentCount < 0) {
                            minArgumentCount = i;
                        }
                    }
                    else {
                        // If we see any required parameters, it means the prior ones were not in fact optional.
                        minArgumentCount = -1;
                    }
                }

                if (minArgumentCount < 0) {
                    minArgumentCount = declaration.parameters.length;
                }

                let returnType: Type;
                let typePredicate: TypePredicate;
                if (classType) {
                    returnType = classType;
                }
                else if (declaration.type) {
                    returnType = getTypeFromTypeNode(declaration.type);
                    if (declaration.type.kind === SyntaxKind.TypePredicate) {
                        const typePredicateNode = <TypePredicateNode>declaration.type;
                        typePredicate = {
                            parameterName: typePredicateNode.parameterName ? typePredicateNode.parameterName.text : undefined,
                            parameterIndex: typePredicateNode.parameterName ? getTypePredicateParameterIndex(declaration.parameters, typePredicateNode.parameterName) : undefined,
                            type: getTypeFromTypeNode(typePredicateNode.type)
                        };
                    }
                }
                else {
                    // TypeScript 1.0 spec (April 2014):
                    // If only one accessor includes a type annotation, the other behaves as if it had the same type annotation.
                    if (declaration.kind === SyntaxKind.GetAccessor && !hasDynamicName(declaration)) {
                        const setter = <AccessorDeclaration>getDeclarationOfKind(declaration.symbol, SyntaxKind.SetAccessor);
                        returnType = getAnnotatedAccessorType(setter);
                    }

                    if (!returnType && nodeIsMissing((<FunctionLikeDeclaration>declaration).body)) {
                        returnType = anyType;
                    }
                }

                links.resolvedSignature = createSignature(declaration, typeParameters, parameters, returnType, typePredicate,
                    minArgumentCount, hasRestParameter(declaration), hasStringLiterals);
            }
            return links.resolvedSignature;
        }

        function getSignaturesOfSymbol(symbol: Symbol): Signature[] {
            if (!symbol) return emptyArray;
            const result: Signature[] = [];
            for (let i = 0, len = symbol.declarations.length; i < len; i++) {
                const node = symbol.declarations[i];
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
                            const previous = symbol.declarations[i - 1];
                            if (node.parent === previous.parent && node.kind === previous.kind && node.pos === previous.end) {
                                break;
                            }
                        }
                        result.push(getSignatureFromDeclaration(<SignatureDeclaration>node));
                }
            }
            return result;
        }

        function resolveExternalModuleTypeByLiteral(name: StringLiteral) {
            const moduleSym = resolveExternalModuleName(name, name);
            if (moduleSym) {
                const resolvedModuleSymbol = resolveExternalModuleSymbol(moduleSym);
                if (resolvedModuleSymbol) {
                    return getTypeOfSymbol(resolvedModuleSymbol);
                }
            }

            return anyType;
        }

        function getReturnTypeOfSignature(signature: Signature): Type {
            if (!signature.resolvedReturnType) {
                if (!pushTypeResolution(signature, TypeSystemPropertyName.ResolvedReturnType)) {
                    return unknownType;
                }
                let type: Type;
                if (signature.target) {
                    type = instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper);
                }
                else if (signature.unionSignatures) {
                    type = getUnionType(map(signature.unionSignatures, getReturnTypeOfSignature));
                }
                else {
                    type = getReturnTypeFromBody(<FunctionLikeDeclaration>signature.declaration);
                }
                if (!popTypeResolution()) {
                    type = anyType;
                    if (compilerOptions.noImplicitAny) {
                        const declaration = <Declaration>signature.declaration;
                        if (declaration.name) {
                            error(declaration.name, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, declarationNameToString(declaration.name));
                        }
                        else {
                            error(declaration, Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                        }
                    }
                }
                signature.resolvedReturnType = type;
            }
            return signature.resolvedReturnType;
        }

        function getRestTypeOfSignature(signature: Signature): Type {
            if (signature.hasRestParameter) {
                const type = getTypeOfSymbol(lastOrUndefined(signature.parameters));
                if (type.flags & TypeFlags.Reference && (<TypeReference>type).target === globalArrayType) {
                    return (<TypeReference>type).typeArguments[0];
                }
            }
            return anyType;
        }

        function getSignatureInstantiation(signature: Signature, typeArguments: Type[]): Signature {
            return instantiateSignature(signature, createTypeMapper(signature.typeParameters, typeArguments), /*eraseTypeParameters*/ true);
        }

        function getErasedSignature(signature: Signature): Signature {
            if (!signature.typeParameters) return signature;
            if (!signature.erasedSignatureCache) {
                if (signature.target) {
                    signature.erasedSignatureCache = instantiateSignature(getErasedSignature(signature.target), signature.mapper);
                }
                else {
                    signature.erasedSignatureCache = instantiateSignature(signature, createTypeEraser(signature.typeParameters), /*eraseTypeParameters*/ true);
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
                const isConstructor = signature.declaration.kind === SyntaxKind.Constructor || signature.declaration.kind === SyntaxKind.ConstructSignature;
                const type = <ResolvedType>createObjectType(TypeFlags.Anonymous | TypeFlags.FromSignature);
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
            const syntaxKind = kind === IndexKind.Number ? SyntaxKind.NumberKeyword : SyntaxKind.StringKeyword;
            const indexSymbol = getIndexSymbol(symbol);
            if (indexSymbol) {
                for (const decl of indexSymbol.declarations) {
                    const node = <SignatureDeclaration>decl;
                    if (node.parameters.length === 1) {
                        const parameter = node.parameters[0];
                        if (parameter && parameter.type && parameter.type.kind === syntaxKind) {
                            return node;
                        }
                    }
                }
            }

            return undefined;
        }

        function getIndexTypeOfSymbol(symbol: Symbol, kind: IndexKind): Type {
            const declaration = getIndexDeclarationOfSymbol(symbol, kind);
            return declaration
                ? declaration.type ? getTypeFromTypeNode(declaration.type) : anyType
                : undefined;
        }

        function getConstraintOfTypeParameter(type: TypeParameter): Type {
            if (!type.constraint) {
                if (type.target) {
                    const targetConstraint = getConstraintOfTypeParameter(type.target);
                    type.constraint = targetConstraint ? instantiateType(targetConstraint, type.mapper) : noConstraintType;
                }
                else {
                    type.constraint = getTypeFromTypeNode((<TypeParameterDeclaration>getDeclarationOfKind(type.symbol, SyntaxKind.TypeParameter)).constraint);
                }
            }
            return type.constraint === noConstraintType ? undefined : type.constraint;
        }

        function getParentSymbolOfTypeParameter(typeParameter: TypeParameter): Symbol {
            return getSymbolOfNode(getDeclarationOfKind(typeParameter.symbol, SyntaxKind.TypeParameter).parent);
        }

        function getTypeListId(types: Type[]) {
            if (types) {
                switch (types.length) {
                    case 1:
                        return "" + types[0].id;
                    case 2:
                        return types[0].id + "," + types[1].id;
                    default:
                        let result = "";
                        for (let i = 0; i < types.length; i++) {
                            if (i > 0) {
                                result += ",";
                            }
                            result += types[i].id;
                        }
                        return result;
                }
            }
            return "";
        }

        // This function is used to propagate certain flags when creating new object type references and union types.
        // It is only necessary to do so if a constituent type might be the undefined type, the null type, the type
        // of an object literal or the anyFunctionType. This is because there are operations in the type checker
        // that care about the presence of such types at arbitrary depth in a containing type.
        function getPropagatingFlagsOfTypes(types: Type[]): TypeFlags {
            let result: TypeFlags = 0;
            for (const type of types) {
                result |= type.flags;
            }
            return result & TypeFlags.PropagatingFlags;
        }

        function createTypeReference(target: GenericType, typeArguments: Type[]): TypeReference {
            const id = getTypeListId(typeArguments);
            let type = target.instantiations[id];
            if (!type) {
                const flags = TypeFlags.Reference | (typeArguments ? getPropagatingFlagsOfTypes(typeArguments) : 0);
                type = target.instantiations[id] = <TypeReference>createObjectType(flags, target.symbol);
                type.target = target;
                type.typeArguments = typeArguments;
            }
            return type;
        }

        function isTypeParameterReferenceIllegalInConstraint(typeReferenceNode: TypeReferenceNode | ExpressionWithTypeArguments, typeParameterSymbol: Symbol): boolean {
            const links = getNodeLinks(typeReferenceNode);
            if (links.isIllegalTypeReferenceInConstraint !== undefined) {
                return links.isIllegalTypeReferenceInConstraint;
            }

            // bubble up to the declaration
            let currentNode: Node = typeReferenceNode;
            // forEach === exists
            while (!forEach(typeParameterSymbol.declarations, d => d.parent === currentNode.parent)) {
                currentNode = currentNode.parent;
            }
            // if last step was made from the type parameter this means that path has started somewhere in constraint which is illegal
            links.isIllegalTypeReferenceInConstraint = currentNode.kind === SyntaxKind.TypeParameter;
            return links.isIllegalTypeReferenceInConstraint;
        }

        function checkTypeParameterHasIllegalReferencesInConstraint(typeParameter: TypeParameterDeclaration): void {
            let typeParameterSymbol: Symbol;
            function check(n: Node): void {
                if (n.kind === SyntaxKind.TypeReference && (<TypeReferenceNode>n).typeName.kind === SyntaxKind.Identifier) {
                    const links = getNodeLinks(n);
                    if (links.isIllegalTypeReferenceInConstraint === undefined) {
                        const symbol = resolveName(typeParameter, (<Identifier>(<TypeReferenceNode>n).typeName).text, SymbolFlags.Type, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined);
                        if (symbol && (symbol.flags & SymbolFlags.TypeParameter)) {
                            // TypeScript 1.0 spec (April 2014): 3.4.1
                            // Type parameters declared in a particular type parameter list
                            // may not be referenced in constraints in that type parameter list

                            // symbol.declaration.parent === typeParameter.parent
                            // -> typeParameter and symbol.declaration originate from the same type parameter list
                            // -> illegal for all declarations in symbol
                            // forEach === exists
                            links.isIllegalTypeReferenceInConstraint = forEach(symbol.declarations, d => d.parent === typeParameter.parent);
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

        // Get type from reference to class or interface
        function getTypeFromClassOrInterfaceReference(node: TypeReferenceNode | ExpressionWithTypeArguments, symbol: Symbol): Type {
            const type = <InterfaceType>getDeclaredTypeOfSymbol(symbol);
            const typeParameters = type.localTypeParameters;
            if (typeParameters) {
                if (!node.typeArguments || node.typeArguments.length !== typeParameters.length) {
                    error(node, Diagnostics.Generic_type_0_requires_1_type_argument_s, typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.WriteArrayAsGenericType), typeParameters.length);
                    return unknownType;
                }
                // In a type reference, the outer type parameters of the referenced class or interface are automatically
                // supplied as type arguments and the type reference only specifies arguments for the local type parameters
                // of the class or interface.
                return createTypeReference(<GenericType>type, concatenate(type.outerTypeParameters, map(node.typeArguments, getTypeFromTypeNode)));
            }
            if (node.typeArguments) {
                error(node, Diagnostics.Type_0_is_not_generic, typeToString(type));
                return unknownType;
            }
            return type;
        }

        // Get type from reference to type alias. When a type alias is generic, the declared type of the type alias may include
        // references to the type parameters of the alias. We replace those with the actual type arguments by instantiating the
        // declared type. Instantiations are cached using the type identities of the type arguments as the key.
        function getTypeFromTypeAliasReference(node: TypeReferenceNode | ExpressionWithTypeArguments, symbol: Symbol): Type {
            const type = getDeclaredTypeOfSymbol(symbol);
            const links = getSymbolLinks(symbol);
            const typeParameters = links.typeParameters;
            if (typeParameters) {
                if (!node.typeArguments || node.typeArguments.length !== typeParameters.length) {
                    error(node, Diagnostics.Generic_type_0_requires_1_type_argument_s, symbolToString(symbol), typeParameters.length);
                    return unknownType;
                }
                const typeArguments = map(node.typeArguments, getTypeFromTypeNode);
                const id = getTypeListId(typeArguments);
                return links.instantiations[id] || (links.instantiations[id] = instantiateType(type, createTypeMapper(typeParameters, typeArguments)));
            }
            if (node.typeArguments) {
                error(node, Diagnostics.Type_0_is_not_generic, symbolToString(symbol));
                return unknownType;
            }
            return type;
        }

        // Get type from reference to named type that cannot be generic (enum or type parameter)
        function getTypeFromNonGenericTypeReference(node: TypeReferenceNode | ExpressionWithTypeArguments, symbol: Symbol): Type {
            if (symbol.flags & SymbolFlags.TypeParameter && isTypeParameterReferenceIllegalInConstraint(node, symbol)) {
                // TypeScript 1.0 spec (April 2014): 3.4.1
                // Type parameters declared in a particular type parameter list
                // may not be referenced in constraints in that type parameter list
                // Implementation: such type references are resolved to 'unknown' type that usually denotes error
                return unknownType;
            }
            if (node.typeArguments) {
                error(node, Diagnostics.Type_0_is_not_generic, symbolToString(symbol));
                return unknownType;
            }
            return getDeclaredTypeOfSymbol(symbol);
        }

        function getTypeFromTypeReference(node: TypeReferenceNode | ExpressionWithTypeArguments): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                // We only support expressions that are simple qualified names. For other expressions this produces undefined.
                const typeNameOrExpression = node.kind === SyntaxKind.TypeReference ? (<TypeReferenceNode>node).typeName :
                    isSupportedExpressionWithTypeArguments(<ExpressionWithTypeArguments>node) ? (<ExpressionWithTypeArguments>node).expression :
                        undefined;
                const symbol = typeNameOrExpression && resolveEntityName(typeNameOrExpression, SymbolFlags.Type) || unknownSymbol;
                const type = symbol === unknownSymbol ? unknownType :
                    symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface) ? getTypeFromClassOrInterfaceReference(node, symbol) :
                        symbol.flags & SymbolFlags.TypeAlias ? getTypeFromTypeAliasReference(node, symbol) :
                            getTypeFromNonGenericTypeReference(node, symbol);
                // Cache both the resolved symbol and the resolved type. The resolved symbol is needed in when we check the
                // type reference in checkTypeReferenceOrExpressionWithTypeArguments.
                links.resolvedSymbol = symbol;
                links.resolvedType = type;
            }
            return links.resolvedType;
        }

        function getTypeFromTypeQueryNode(node: TypeQueryNode): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                // TypeScript 1.0 spec (April 2014): 3.6.3
                // The expression is processed as an identifier expression (section 4.3)
                // or property access expression(section 4.10),
                // the widened type(section 3.9) of which becomes the result.
                links.resolvedType = getWidenedType(checkExpression(node.exprName));
            }
            return links.resolvedType;
        }

        function getTypeOfGlobalSymbol(symbol: Symbol, arity: number): ObjectType {

            function getTypeDeclaration(symbol: Symbol): Declaration {
                const declarations = symbol.declarations;
                for (const declaration of declarations) {
                    switch (declaration.kind) {
                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                        case SyntaxKind.EnumDeclaration:
                            return declaration;
                    }
                }
            }

            if (!symbol) {
                return arity ? emptyGenericType : emptyObjectType;
            }
            const type = getDeclaredTypeOfSymbol(symbol);
            if (!(type.flags & TypeFlags.ObjectType)) {
                error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbol.name);
                return arity ? emptyGenericType : emptyObjectType;
            }
            if (((<InterfaceType>type).typeParameters ? (<InterfaceType>type).typeParameters.length : 0) !== arity) {
                error(getTypeDeclaration(symbol), Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbol.name, arity);
                return arity ? emptyGenericType : emptyObjectType;
            }
            return <ObjectType>type;
        }

        function getGlobalValueSymbol(name: string): Symbol {
            return getGlobalSymbol(name, SymbolFlags.Value, Diagnostics.Cannot_find_global_value_0);
        }

        function getGlobalTypeSymbol(name: string): Symbol {
            return getGlobalSymbol(name, SymbolFlags.Type, Diagnostics.Cannot_find_global_type_0);
        }

        function getGlobalSymbol(name: string, meaning: SymbolFlags, diagnostic: DiagnosticMessage): Symbol {
            return resolveName(undefined, name, meaning, diagnostic, name);
        }

        function getGlobalType(name: string, arity = 0): ObjectType {
            return getTypeOfGlobalSymbol(getGlobalTypeSymbol(name), arity);
        }

        function tryGetGlobalType(name: string, arity = 0): ObjectType {
            return getTypeOfGlobalSymbol(getGlobalSymbol(name, SymbolFlags.Type, /*diagnostic*/ undefined), arity);
        }

        /**
         * Returns a type that is inside a namespace at the global scope, e.g.
         * getExportedTypeFromNamespace('JSX', 'Element') returns the JSX.Element type
         */
        function getExportedTypeFromNamespace(namespace: string, name: string): Type {
            const namespaceSymbol = getGlobalSymbol(namespace, SymbolFlags.Namespace, /*diagnosticMessage*/ undefined);
            const typeSymbol = namespaceSymbol && getSymbol(namespaceSymbol.exports, name, SymbolFlags.Type);
            return typeSymbol && getDeclaredTypeOfSymbol(typeSymbol);
        }

        function getGlobalESSymbolConstructorSymbol() {
            return globalESSymbolConstructorSymbol || (globalESSymbolConstructorSymbol = getGlobalValueSymbol("Symbol"));
        }

        /**
          * Creates a TypeReference for a generic `TypedPropertyDescriptor<T>`.
          */
        function createTypedPropertyDescriptorType(propertyType: Type): Type {
            const globalTypedPropertyDescriptorType = getGlobalTypedPropertyDescriptorType();
            return globalTypedPropertyDescriptorType !== emptyGenericType
                ? createTypeReference(<GenericType>globalTypedPropertyDescriptorType, [propertyType])
                : emptyObjectType;
        }

        /**
         * Instantiates a global type that is generic with some element type, and returns that instantiation.
         */
        function createTypeFromGenericGlobalType(genericGlobalType: GenericType, typeArguments: Type[]): Type {
            return genericGlobalType !== emptyGenericType ? createTypeReference(genericGlobalType, typeArguments) : emptyObjectType;
        }

        function createIterableType(elementType: Type): Type {
            return createTypeFromGenericGlobalType(globalIterableType, [elementType]);
        }

        function createIterableIteratorType(elementType: Type): Type {
            return createTypeFromGenericGlobalType(globalIterableIteratorType, [elementType]);
        }

        function createArrayType(elementType: Type): Type {
            return createTypeFromGenericGlobalType(globalArrayType, [elementType]);
        }

        function getTypeFromArrayTypeNode(node: ArrayTypeNode): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createArrayType(getTypeFromTypeNode(node.elementType));
            }
            return links.resolvedType;
        }

        function createTupleType(elementTypes: Type[]) {
            const id = getTypeListId(elementTypes);
            return tupleTypes[id] || (tupleTypes[id] = createNewTupleType(elementTypes));
        }

        function createNewTupleType(elementTypes: Type[]) {
            const type = <TupleType>createObjectType(TypeFlags.Tuple | getPropagatingFlagsOfTypes(elementTypes));
            type.elementTypes = elementTypes;
            return type;
        }

        function getTypeFromTupleTypeNode(node: TupleTypeNode): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createTupleType(map(node.elementTypes, getTypeFromTypeNode));
            }
            return links.resolvedType;
        }

        function addTypeToSet(typeSet: Type[], type: Type, typeSetKind: TypeFlags) {
            if (type.flags & typeSetKind) {
                addTypesToSet(typeSet, (<UnionOrIntersectionType>type).types, typeSetKind);
            }
            else if (!contains(typeSet, type)) {
                typeSet.push(type);
            }
        }

        // Add the given types to the given type set. Order is preserved, duplicates are removed,
        // and nested types of the given kind are flattened into the set.
        function addTypesToSet(typeSet: Type[], types: Type[], typeSetKind: TypeFlags) {
            for (const type of types) {
                addTypeToSet(typeSet, type, typeSetKind);
            }
        }

        function isSubtypeOfAny(candidate: Type, types: Type[]): boolean {
            for (let i = 0, len = types.length; i < len; i++) {
                if (candidate !== types[i] && isTypeSubtypeOf(candidate, types[i])) {
                    return true;
                }
            }
            return false;
        }

        function removeSubtypes(types: Type[]) {
            let i = types.length;
            while (i > 0) {
                i--;
                if (isSubtypeOfAny(types[i], types)) {
                    types.splice(i, 1);
                }
            }
        }

        function containsTypeAny(types: Type[]): boolean {
            for (const type of types) {
                if (isTypeAny(type)) {
                    return true;
                }
            }
            return false;
        }

        function removeAllButLast(types: Type[], typeToRemove: Type) {
            let i = types.length;
            while (i > 0 && types.length > 1) {
                i--;
                if (types[i] === typeToRemove) {
                    types.splice(i, 1);
                }
            }
        }

        // We reduce the constituent type set to only include types that aren't subtypes of other types, unless
        // the noSubtypeReduction flag is specified, in which case we perform a simple deduplication based on
        // object identity. Subtype reduction is possible only when union types are known not to circularly
        // reference themselves (as is the case with union types created by expression constructs such as array
        // literals and the || and ?: operators). Named types can circularly reference themselves and therefore
        // cannot be deduplicated during their declaration. For example, "type Item = string | (() => Item" is
        // a named type that circularly references itself.
        function getUnionType(types: Type[], noSubtypeReduction?: boolean): Type {
            if (types.length === 0) {
                return emptyUnionType;
            }
            const typeSet: Type[] = [];
            addTypesToSet(typeSet, types, TypeFlags.Union);
            if (containsTypeAny(typeSet)) {
                return anyType;
            }
            if (noSubtypeReduction) {
                removeAllButLast(typeSet, undefinedType);
                removeAllButLast(typeSet, nullType);
            }
            else {
                removeSubtypes(typeSet);
            }
            if (typeSet.length === 1) {
                return typeSet[0];
            }
            const id = getTypeListId(typeSet);
            let type = unionTypes[id];
            if (!type) {
                type = unionTypes[id] = <UnionType>createObjectType(TypeFlags.Union | getPropagatingFlagsOfTypes(typeSet));
                type.types = typeSet;
            }
            return type;
        }

        function getTypeFromUnionTypeNode(node: UnionTypeNode): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getUnionType(map(node.types, getTypeFromTypeNode), /*noSubtypeReduction*/ true);
            }
            return links.resolvedType;
        }

        // We do not perform structural deduplication on intersection types. Intersection types are created only by the &
        // type operator and we can't reduce those because we want to support recursive intersection types. For example,
        // a type alias of the form "type List<T> = T & { next: List<T> }" cannot be reduced during its declaration.
        // Also, unlike union types, the order of the constituent types is preserved in order that overload resolution
        // for intersections of types with signatures can be deterministic.
        function getIntersectionType(types: Type[]): Type {
            if (types.length === 0) {
                return emptyObjectType;
            }
            const typeSet: Type[] = [];
            addTypesToSet(typeSet, types, TypeFlags.Intersection);
            if (containsTypeAny(typeSet)) {
                return anyType;
            }
            if (typeSet.length === 1) {
                return typeSet[0];
            }
            const id = getTypeListId(typeSet);
            let type = intersectionTypes[id];
            if (!type) {
                type = intersectionTypes[id] = <IntersectionType>createObjectType(TypeFlags.Intersection | getPropagatingFlagsOfTypes(typeSet));
                type.types = typeSet;
            }
            return type;
        }

        function getTypeFromIntersectionTypeNode(node: IntersectionTypeNode): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getIntersectionType(map(node.types, getTypeFromTypeNode));
            }
            return links.resolvedType;
        }

        function getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node: Node): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                // Deferred resolution of members is handled by resolveObjectTypeMembers
                links.resolvedType = createObjectType(TypeFlags.Anonymous, node.symbol);
            }
            return links.resolvedType;
        }

        function getStringLiteralType(node: StringLiteral): StringLiteralType {
            const text = node.text;
            if (hasProperty(stringLiteralTypes, text)) {
                return stringLiteralTypes[text];
            }

            const type = stringLiteralTypes[text] = <StringLiteralType>createType(TypeFlags.StringLiteral);
            type.text = text;
            return type;
        }

        function getTypeFromStringLiteral(node: StringLiteral): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getStringLiteralType(node);
            }
            return links.resolvedType;
        }

        function getThisType(node: TypeNode): Type {
            const container = getThisContainer(node, /*includeArrowFunctions*/ false);
            const parent = container && container.parent;
            if (parent && (isClassLike(parent) || parent.kind === SyntaxKind.InterfaceDeclaration)) {
                if (!(container.flags & NodeFlags.Static) &&
                    (container.kind !== SyntaxKind.Constructor || isNodeDescendentOf(node, (<ConstructorDeclaration>container).body))) {
                    return getDeclaredTypeOfClassOrInterface(getSymbolOfNode(parent)).thisType;
                }
            }
            error(node, Diagnostics.A_this_type_is_available_only_in_a_non_static_member_of_a_class_or_interface);
            return unknownType;
        }

        function getTypeFromThisTypeNode(node: TypeNode): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getThisType(node);
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
                case SyntaxKind.SymbolKeyword:
                    return esSymbolType;
                case SyntaxKind.VoidKeyword:
                    return voidType;
                case SyntaxKind.ThisKeyword:
                    return getTypeFromThisTypeNode(node);
                case SyntaxKind.StringLiteral:
                    return getTypeFromStringLiteral(<StringLiteral>node);
                case SyntaxKind.TypeReference:
                    return getTypeFromTypeReference(<TypeReferenceNode>node);
                case SyntaxKind.TypePredicate:
                    return booleanType;
                case SyntaxKind.ExpressionWithTypeArguments:
                    return getTypeFromTypeReference(<ExpressionWithTypeArguments>node);
                case SyntaxKind.TypeQuery:
                    return getTypeFromTypeQueryNode(<TypeQueryNode>node);
                case SyntaxKind.ArrayType:
                    return getTypeFromArrayTypeNode(<ArrayTypeNode>node);
                case SyntaxKind.TupleType:
                    return getTypeFromTupleTypeNode(<TupleTypeNode>node);
                case SyntaxKind.UnionType:
                    return getTypeFromUnionTypeNode(<UnionTypeNode>node);
                case SyntaxKind.IntersectionType:
                    return getTypeFromIntersectionTypeNode(<IntersectionTypeNode>node);
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
                    const symbol = getSymbolAtLocation(node);
                    return symbol && getDeclaredTypeOfSymbol(symbol);
                default:
                    return unknownType;
            }
        }

        function instantiateList<T>(items: T[], mapper: TypeMapper, instantiator: (item: T, mapper: TypeMapper) => T): T[] {
            if (items && items.length) {
                const result: T[] = [];
                for (const v of items) {
                    result.push(instantiator(v, mapper));
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
                for (let i = 0; i < sources.length; i++) {
                    if (t === sources[i]) {
                        return targets[i];
                    }
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
                for (const source of sources) {
                    if (t === source) {
                        return anyType;
                    }
                }
                return t;
            };
        }

        function createInferenceMapper(context: InferenceContext): TypeMapper {
            const mapper: TypeMapper = t => {
                for (let i = 0; i < context.typeParameters.length; i++) {
                    if (t === context.typeParameters[i]) {
                        context.inferences[i].isFixed = true;
                        return getInferredType(context, i);
                    }
                }
                return t;
            };

            mapper.context = context;
            return mapper;
        }

        function identityMapper(type: Type): Type {
            return type;
        }

        function combineTypeMappers(mapper1: TypeMapper, mapper2: TypeMapper): TypeMapper {
            return t => instantiateType(mapper1(t), mapper2);
        }

        function instantiateTypeParameter(typeParameter: TypeParameter, mapper: TypeMapper): TypeParameter {
            const result = <TypeParameter>createType(TypeFlags.TypeParameter);
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
            let freshTypeParameters: TypeParameter[];
            let freshTypePredicate: TypePredicate;
            if (signature.typeParameters && !eraseTypeParameters) {
                freshTypeParameters = instantiateList(signature.typeParameters, mapper, instantiateTypeParameter);
                mapper = combineTypeMappers(createTypeMapper(signature.typeParameters, freshTypeParameters), mapper);
            }
            if (signature.typePredicate) {
                freshTypePredicate = {
                    parameterName: signature.typePredicate.parameterName,
                    parameterIndex: signature.typePredicate.parameterIndex,
                    type: instantiateType(signature.typePredicate.type, mapper)
                };
            }
            const result = createSignature(signature.declaration, freshTypeParameters,
                instantiateList(signature.parameters, mapper, instantiateSymbol),
                instantiateType(signature.resolvedReturnType, mapper),
                freshTypePredicate,
                signature.minArgumentCount, signature.hasRestParameter, signature.hasStringLiterals);
            result.target = signature;
            result.mapper = mapper;
            return result;
        }

        function instantiateSymbol(symbol: Symbol, mapper: TypeMapper): Symbol {
            if (symbol.flags & SymbolFlags.Instantiated) {
                const links = getSymbolLinks(symbol);
                // If symbol being instantiated is itself a instantiation, fetch the original target and combine the
                // type mappers. This ensures that original type identities are properly preserved and that aliases
                // always reference a non-aliases.
                symbol = links.target;
                mapper = combineTypeMappers(links.mapper, mapper);
            }

            // Keep the flags from the symbol we're instantiating.  Mark that is instantiated, and
            // also transient so that we can just store data on it directly.
            const result = <TransientSymbol>createSymbol(SymbolFlags.Instantiated | SymbolFlags.Transient | symbol.flags, symbol.name);
            result.declarations = symbol.declarations;
            result.parent = symbol.parent;
            result.target = symbol;
            result.mapper = mapper;
            if (symbol.valueDeclaration) {
                result.valueDeclaration = symbol.valueDeclaration;
            }

            return result;
        }

        function instantiateAnonymousType(type: AnonymousType, mapper: TypeMapper): ObjectType {
            if (mapper.instantiations) {
                const cachedType = mapper.instantiations[type.id];
                if (cachedType) {
                    return cachedType;
                }
            }
            else {
                mapper.instantiations = [];
            }
            // Mark the anonymous type as instantiated such that our infinite instantiation detection logic can recognize it
            const result = <AnonymousType>createObjectType(TypeFlags.Anonymous | TypeFlags.Instantiated, type.symbol);
            result.target = type;
            result.mapper = mapper;
            mapper.instantiations[type.id] = result;
            return result;
        }

        function instantiateType(type: Type, mapper: TypeMapper): Type {
            if (type && mapper !== identityMapper) {
                if (type.flags & TypeFlags.TypeParameter) {
                    return mapper(<TypeParameter>type);
                }
                if (type.flags & TypeFlags.Anonymous) {
                    return type.symbol && type.symbol.flags & (SymbolFlags.Function | SymbolFlags.Method | SymbolFlags.Class | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral) ?
                        instantiateAnonymousType(<AnonymousType>type, mapper) : type;
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
                if (type.flags & TypeFlags.Intersection) {
                    return getIntersectionType(instantiateList((<IntersectionType>type).types, mapper, instantiateType));
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
                    return (<BinaryExpression>node).operatorToken.kind === SyntaxKind.BarBarToken &&
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

        function getTypeWithoutSignatures(type: Type): Type {
            if (type.flags & TypeFlags.ObjectType) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                if (resolved.constructSignatures.length) {
                    const result = <ResolvedType>createObjectType(TypeFlags.Anonymous, type.symbol);
                    result.members = resolved.members;
                    result.properties = resolved.properties;
                    result.callSignatures = emptyArray;
                    result.constructSignatures = emptyArray;
                    type = result;
                }
            }
            return type;
        }

        // TYPE CHECKING

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

        function checkTypeAssignableTo(source: Type, target: Type, errorNode: Node, headMessage?: DiagnosticMessage, containingMessageChain?: DiagnosticMessageChain): boolean {
            return checkTypeRelatedTo(source, target, assignableRelation, errorNode, headMessage, containingMessageChain);
        }

        function isSignatureAssignableTo(source: Signature, target: Signature): boolean {
            const sourceType = getOrCreateTypeFromSignature(source);
            const targetType = getOrCreateTypeFromSignature(target);
            return checkTypeRelatedTo(sourceType, targetType, assignableRelation, /*errorNode*/ undefined);
        }

        /**
         * Checks if 'source' is related to 'target' (e.g.: is a assignable to).
         * @param source The left-hand-side of the relation.
         * @param target The right-hand-side of the relation.
         * @param relation The relation considered. One of 'identityRelation', 'assignableRelation', or 'subTypeRelation'.
         * Used as both to determine which checks are performed and as a cache of previously computed results.
         * @param errorNode The suggested node upon which all errors will be reported, if defined. This may or may not be the actual node used.
         * @param headMessage If the error chain should be prepended by a head message, then headMessage will be used.
         * @param containingMessageChain A chain of errors to prepend any new errors found.
         */
        function checkTypeRelatedTo(
            source: Type,
            target: Type,
            relation: Map<RelationComparisonResult>,
            errorNode: Node,
            headMessage?: DiagnosticMessage,
            containingMessageChain?: DiagnosticMessageChain): boolean {

            let errorInfo: DiagnosticMessageChain;
            let sourceStack: ObjectType[];
            let targetStack: ObjectType[];
            let maybeStack: Map<RelationComparisonResult>[];
            let expandingFlags: number;
            let depth = 0;
            let overflow = false;
            let elaborateErrors = false;

            Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");

            const result = isRelatedTo(source, target, errorNode !== undefined, headMessage);
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
                    elaborateErrors = true;
                    isRelatedTo(source, target, errorNode !== undefined, headMessage);
                }
                if (containingMessageChain) {
                    errorInfo = concatenateDiagnosticMessageChains(containingMessageChain, errorInfo);
                }

                diagnostics.add(createDiagnosticForNodeFromMessageChain(errorNode, errorInfo));
            }
            return result !== Ternary.False;

            function reportError(message: DiagnosticMessage, arg0?: string, arg1?: string, arg2?: string): void {
                errorInfo = chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2);
            }

            function reportRelationError(message: DiagnosticMessage, source: Type, target: Type) {
                let sourceType = typeToString(source);
                let targetType = typeToString(target);
                if (sourceType === targetType) {
                    sourceType = typeToString(source, /*enclosingDeclaration*/ undefined, TypeFormatFlags.UseFullyQualifiedType);
                    targetType = typeToString(target, /*enclosingDeclaration*/ undefined, TypeFormatFlags.UseFullyQualifiedType);
                }
                reportError(message || Diagnostics.Type_0_is_not_assignable_to_type_1, sourceType, targetType);
            }

            // Compare two types and return
            // Ternary.True if they are related with no assumptions,
            // Ternary.Maybe if they are related with assumptions of other relationships, or
            // Ternary.False if they are not related.
            function isRelatedTo(source: Type, target: Type, reportErrors?: boolean, headMessage?: DiagnosticMessage): Ternary {
                let result: Ternary;
                // both types are the same - covers 'they are the same primitive type or both are Any' or the same type parameter cases
                if (source === target) return Ternary.True;
                if (relation === identityRelation) {
                    return isIdenticalTo(source, target);
                }

                if (isTypeAny(target)) return Ternary.True;
                if (source === undefinedType) return Ternary.True;
                if (source === nullType && target !== undefinedType) return Ternary.True;
                if (source.flags & TypeFlags.Enum && target === numberType) return Ternary.True;
                if (source.flags & TypeFlags.StringLiteral && target === stringType) return Ternary.True;
                if (relation === assignableRelation) {
                    if (isTypeAny(source)) return Ternary.True;
                    if (source === numberType && target.flags & TypeFlags.Enum) return Ternary.True;
                }

                if (source.flags & TypeFlags.FreshObjectLiteral) {
                    if (hasExcessProperties(<FreshObjectLiteralType>source, target, reportErrors)) {
                        if (reportErrors) {
                            reportRelationError(headMessage, source, target);
                        }
                        return Ternary.False;
                    }
                    // Above we check for excess properties with respect to the entire target type. When union
                    // and intersection types are further deconstructed on the target side, we don't want to
                    // make the check again (as it might fail for a partial target type). Therefore we obtain
                    // the regular source type and proceed with that.
                    if (target.flags & TypeFlags.UnionOrIntersection) {
                        source = getRegularTypeOfObjectLiteral(source);
                    }
                }

                const saveErrorInfo = errorInfo;

                // Note that the "each" checks must precede the "some" checks to produce the correct results
                if (source.flags & TypeFlags.Union) {
                    if (result = eachTypeRelatedToType(<UnionType>source, target, reportErrors)) {
                        return result;
                    }
                }
                else if (target.flags & TypeFlags.Intersection) {
                    if (result = typeRelatedToEachType(source, <IntersectionType>target, reportErrors)) {
                        return result;
                    }
                }
                else {
                    // It is necessary to try "some" checks on both sides because there may be nested "each" checks
                    // on either side that need to be prioritized. For example, A | B = (A | B) & (C | D) or
                    // A & B = (A & B) | (C & D).
                    if (source.flags & TypeFlags.Intersection) {
                        // If target is a union type the following check will report errors so we suppress them here
                        if (result = someTypeRelatedToType(<IntersectionType>source, target, reportErrors && !(target.flags & TypeFlags.Union))) {
                            return result;
                        }
                    }
                    if (target.flags & TypeFlags.Union) {
                        if (result = typeRelatedToSomeType(source, <UnionType>target, reportErrors)) {
                            return result;
                        }
                    }
                }

                if (source.flags & TypeFlags.TypeParameter) {
                    let constraint = getConstraintOfTypeParameter(<TypeParameter>source);
                    if (!constraint || constraint.flags & TypeFlags.Any) {
                        constraint = emptyObjectType;
                    }
                    // Report constraint errors only if the constraint is not the empty object type
                    const reportConstraintErrors = reportErrors && constraint !== emptyObjectType;
                    if (result = isRelatedTo(constraint, target, reportConstraintErrors)) {
                        errorInfo = saveErrorInfo;
                        return result;
                    }
                }
                else {
                    if (source.flags & TypeFlags.Reference && target.flags & TypeFlags.Reference && (<TypeReference>source).target === (<TypeReference>target).target) {
                        // We have type references to same target type, see if relationship holds for all type arguments
                        if (result = typeArgumentsRelatedTo(<TypeReference>source, <TypeReference>target, reportErrors)) {
                            return result;
                        }
                    }
                    // Even if relationship doesn't hold for unions, intersections, or generic type references,
                    // it may hold in a structural comparison.
                    const apparentType = getApparentType(source);
                    // In a check of the form X = A & B, we will have previously checked if A relates to X or B relates
                    // to X. Failing both of those we want to check if the aggregation of A and B's members structurally
                    // relates to X. Thus, we include intersection types on the source side here.
                    if (apparentType.flags & (TypeFlags.ObjectType | TypeFlags.Intersection) && target.flags & TypeFlags.ObjectType) {
                        // Report structural errors only if we haven't reported any errors yet
                        const reportStructuralErrors = reportErrors && errorInfo === saveErrorInfo;
                        if (result = objectTypeRelatedTo(apparentType, source, target, reportStructuralErrors)) {
                            errorInfo = saveErrorInfo;
                            return result;
                        }
                    }
                }

                if (reportErrors) {
                    reportRelationError(headMessage, source, target);
                }
                return Ternary.False;
            }

            function isIdenticalTo(source: Type, target: Type): Ternary {
                let result: Ternary;
                if (source.flags & TypeFlags.ObjectType && target.flags & TypeFlags.ObjectType) {
                    if (source.flags & TypeFlags.Reference && target.flags & TypeFlags.Reference && (<TypeReference>source).target === (<TypeReference>target).target) {
                        // We have type references to same target type, see if all type arguments are identical
                        if (result = typeArgumentsRelatedTo(<TypeReference>source, <TypeReference>target, /*reportErrors*/ false)) {
                            return result;
                        }
                    }
                    return objectTypeRelatedTo(source, source, target, /*reportErrors*/ false);
                }
                if (source.flags & TypeFlags.TypeParameter && target.flags & TypeFlags.TypeParameter) {
                    return typeParameterIdenticalTo(<TypeParameter>source, <TypeParameter>target);
                }
                if (source.flags & TypeFlags.Union && target.flags & TypeFlags.Union ||
                    source.flags & TypeFlags.Intersection && target.flags & TypeFlags.Intersection) {
                    if (result = eachTypeRelatedToSomeType(<UnionOrIntersectionType>source, <UnionOrIntersectionType>target)) {
                        if (result &= eachTypeRelatedToSomeType(<UnionOrIntersectionType>target, <UnionOrIntersectionType>source)) {
                            return result;
                        }
                    }
                }
                return Ternary.False;
            }

            // Check if a property with the given name is known anywhere in the given type. In an object type, a property
            // is considered known if the object type is empty and the check is for assignability, if the object type has
            // index signatures, or if the property is actually declared in the object type. In a union or intersection
            // type, a property is considered known if it is known in any constituent type.
            function isKnownProperty(type: Type, name: string): boolean {
                if (type.flags & TypeFlags.ObjectType) {
                    const resolved = resolveStructuredTypeMembers(type);
                    if (relation === assignableRelation && (type === globalObjectType || resolved.properties.length === 0) ||
                        resolved.stringIndexType || resolved.numberIndexType || getPropertyOfType(type, name)) {
                        return true;
                    }
                }
                else if (type.flags & TypeFlags.UnionOrIntersection) {
                    for (const t of (<UnionOrIntersectionType>type).types) {
                        if (isKnownProperty(t, name)) {
                            return true;
                        }
                    }
                }
                return false;
            }

            function hasExcessProperties(source: FreshObjectLiteralType, target: Type, reportErrors: boolean): boolean {
                if (!(target.flags & TypeFlags.ObjectLiteralPatternWithComputedProperties) && someConstituentTypeHasKind(target, TypeFlags.ObjectType)) {
                    for (const prop of getPropertiesOfObjectType(source)) {
                        if (!isKnownProperty(target, prop.name)) {
                            if (reportErrors) {
                                // We know *exactly* where things went wrong when comparing the types.
                                // Use this property as the error node as this will be more helpful in
                                // reasoning about what went wrong.
                                errorNode = prop.valueDeclaration;
                                reportError(Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1,
                                    symbolToString(prop), typeToString(target));
                            }
                            return true;
                        }
                    }
                }
                return false;
            }

            function eachTypeRelatedToSomeType(source: UnionOrIntersectionType, target: UnionOrIntersectionType): Ternary {
                let result = Ternary.True;
                const sourceTypes = source.types;
                for (const sourceType of sourceTypes) {
                    const related = typeRelatedToSomeType(sourceType, target, /*reportErrors*/ false);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function typeRelatedToSomeType(source: Type, target: UnionOrIntersectionType, reportErrors: boolean): Ternary {
                const targetTypes = target.types;
                for (let i = 0, len = targetTypes.length; i < len; i++) {
                    const related = isRelatedTo(source, targetTypes[i], reportErrors && i === len - 1);
                    if (related) {
                        return related;
                    }
                }
                return Ternary.False;
            }

            function typeRelatedToEachType(source: Type, target: UnionOrIntersectionType, reportErrors: boolean): Ternary {
                let result = Ternary.True;
                const targetTypes = target.types;
                for (const targetType of targetTypes) {
                    const related = isRelatedTo(source, targetType, reportErrors);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function someTypeRelatedToType(source: UnionOrIntersectionType, target: Type, reportErrors: boolean): Ternary {
                const sourceTypes = source.types;
                for (let i = 0, len = sourceTypes.length; i < len; i++) {
                    const related = isRelatedTo(sourceTypes[i], target, reportErrors && i === len - 1);
                    if (related) {
                        return related;
                    }
                }
                return Ternary.False;
            }

            function eachTypeRelatedToType(source: UnionOrIntersectionType, target: Type, reportErrors: boolean): Ternary {
                let result = Ternary.True;
                const sourceTypes = source.types;
                for (const sourceType of sourceTypes) {
                    const related = isRelatedTo(sourceType, target, reportErrors);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function typeArgumentsRelatedTo(source: TypeReference, target: TypeReference, reportErrors: boolean): Ternary {
                const sources = source.typeArguments || emptyArray;
                const targets = target.typeArguments || emptyArray;
                if (sources.length !== targets.length && relation === identityRelation) {
                    return Ternary.False;
                }
                let result = Ternary.True;
                for (let i = 0; i < targets.length; i++) {
                    const related = isRelatedTo(sources[i], targets[i], reportErrors);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function typeParameterIdenticalTo(source: TypeParameter, target: TypeParameter): Ternary {
                // covers case when both type parameters does not have constraint (both equal to noConstraintType)
                if (source.constraint === target.constraint) {
                    return Ternary.True;
                }
                if (source.constraint === noConstraintType || target.constraint === noConstraintType) {
                    return Ternary.False;
                }
                return isIdenticalTo(source.constraint, target.constraint);
            }

            // Determine if two object types are related by structure. First, check if the result is already available in the global cache.
            // Second, check if we have already started a comparison of the given two types in which case we assume the result to be true.
            // Third, check if both types are part of deeply nested chains of generic type instantiations and if so assume the types are
            // equal and infinitely expanding. Fourth, if we have reached a depth of 100 nested comparisons, assume we have runaway recursion
            // and issue an error. Otherwise, actually compare the structure of the two types.
            function objectTypeRelatedTo(apparentSource: Type, originalSource: Type, target: Type, reportErrors: boolean): Ternary {
                if (overflow) {
                    return Ternary.False;
                }
                const id = relation !== identityRelation || apparentSource.id < target.id ? apparentSource.id + "," + target.id : target.id + "," + apparentSource.id;
                const related = relation[id];
                if (related !== undefined) {
                    // If we computed this relation already and it was failed and reported, or if we're not being asked to elaborate
                    // errors, we can use the cached value. Otherwise, recompute the relation
                    if (!elaborateErrors || (related === RelationComparisonResult.FailedAndReported)) {
                        return related === RelationComparisonResult.Succeeded ? Ternary.True : Ternary.False;
                    }
                }
                if (depth > 0) {
                    for (let i = 0; i < depth; i++) {
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
                sourceStack[depth] = apparentSource;
                targetStack[depth] = target;
                maybeStack[depth] = {};
                maybeStack[depth][id] = RelationComparisonResult.Succeeded;
                depth++;
                const saveExpandingFlags = expandingFlags;
                if (!(expandingFlags & 1) && isDeeplyNestedGeneric(apparentSource, sourceStack, depth)) expandingFlags |= 1;
                if (!(expandingFlags & 2) && isDeeplyNestedGeneric(target, targetStack, depth)) expandingFlags |= 2;
                let result: Ternary;
                if (expandingFlags === 3) {
                    result = Ternary.Maybe;
                }
                else {
                    result = propertiesRelatedTo(apparentSource, target, reportErrors);
                    if (result) {
                        result &= signaturesRelatedTo(apparentSource, target, SignatureKind.Call, reportErrors);
                        if (result) {
                            result &= signaturesRelatedTo(apparentSource, target, SignatureKind.Construct, reportErrors);
                            if (result) {
                                result &= stringIndexTypesRelatedTo(apparentSource, originalSource, target, reportErrors);
                                if (result) {
                                    result &= numberIndexTypesRelatedTo(apparentSource, originalSource, target, reportErrors);
                                }
                            }
                        }
                    }
                }
                expandingFlags = saveExpandingFlags;
                depth--;
                if (result) {
                    const maybeCache = maybeStack[depth];
                    // If result is definitely true, copy assumptions to global cache, else copy to next level up
                    const destinationCache = (result === Ternary.True || depth === 0) ? relation : maybeStack[depth - 1];
                    copyMap(maybeCache, destinationCache);
                }
                else {
                    // A false result goes straight into global cache (when something is false under assumptions it
                    // will also be false without assumptions)
                    relation[id] = reportErrors ? RelationComparisonResult.FailedAndReported : RelationComparisonResult.Failed;
                }
                return result;
            }

            function propertiesRelatedTo(source: Type, target: Type, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return propertiesIdenticalTo(source, target);
                }
                let result = Ternary.True;
                const properties = getPropertiesOfObjectType(target);
                const requireOptionalProperties = relation === subtypeRelation && !(source.flags & TypeFlags.ObjectLiteral);
                for (const targetProp of properties) {
                    const sourceProp = getPropertyOfType(source, targetProp.name);

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
                            const sourcePropFlags = getDeclarationFlagsFromSymbol(sourceProp);
                            const targetPropFlags = getDeclarationFlagsFromSymbol(targetProp);
                            if (sourcePropFlags & NodeFlags.Private || targetPropFlags & NodeFlags.Private) {
                                if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                                    if (reportErrors) {
                                        if (sourcePropFlags & NodeFlags.Private && targetPropFlags & NodeFlags.Private) {
                                            reportError(Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                        }
                                        else {
                                            reportError(Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp),
                                                typeToString(sourcePropFlags & NodeFlags.Private ? source : target),
                                                typeToString(sourcePropFlags & NodeFlags.Private ? target : source));
                                        }
                                    }
                                    return Ternary.False;
                                }
                            }
                            else if (targetPropFlags & NodeFlags.Protected) {
                                const sourceDeclaredInClass = sourceProp.parent && sourceProp.parent.flags & SymbolFlags.Class;
                                const sourceClass = sourceDeclaredInClass ? <InterfaceType>getDeclaredTypeOfSymbol(sourceProp.parent) : undefined;
                                const targetClass = <InterfaceType>getDeclaredTypeOfSymbol(targetProp.parent);
                                if (!sourceClass || !hasBaseType(sourceClass, targetClass)) {
                                    if (reportErrors) {
                                        reportError(Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2,
                                            symbolToString(targetProp), typeToString(sourceClass || source), typeToString(targetClass));
                                    }
                                    return Ternary.False;
                                }
                            }
                            else if (sourcePropFlags & NodeFlags.Protected) {
                                if (reportErrors) {
                                    reportError(Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2,
                                        symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return Ternary.False;
                            }
                            const related = isRelatedTo(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
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

            function propertiesIdenticalTo(source: Type, target: Type): Ternary {
                if (!(source.flags & TypeFlags.ObjectType && target.flags & TypeFlags.ObjectType)) {
                    return Ternary.False;
                }
                const sourceProperties = getPropertiesOfObjectType(source);
                const targetProperties = getPropertiesOfObjectType(target);
                if (sourceProperties.length !== targetProperties.length) {
                    return Ternary.False;
                }
                let result = Ternary.True;
                for (const sourceProp of sourceProperties) {
                    const targetProp = getPropertyOfObjectType(target, sourceProp.name);
                    if (!targetProp) {
                        return Ternary.False;
                    }
                    const related = compareProperties(sourceProp, targetProp, isRelatedTo);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function signaturesRelatedTo(source: Type, target: Type, kind: SignatureKind, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return signaturesIdenticalTo(source, target, kind);
                }
                if (target === anyFunctionType || source === anyFunctionType) {
                    return Ternary.True;
                }
                const sourceSignatures = getSignaturesOfType(source, kind);
                const targetSignatures = getSignaturesOfType(target, kind);
                let result = Ternary.True;
                const saveErrorInfo = errorInfo;



                if (kind === SignatureKind.Construct) {
                    // Only want to compare the construct signatures for abstractness guarantees.

                    // Because the "abstractness" of a class is the same across all construct signatures
                    // (internally we are checking the corresponding declaration), it is enough to perform
                    // the check and report an error once over all pairs of source and target construct signatures.
                    //
                    // sourceSig and targetSig are (possibly) undefined.
                    //
                    // Note that in an extends-clause, targetSignatures is stripped, so the check never proceeds.
                    const sourceSig = sourceSignatures[0];
                    const targetSig = targetSignatures[0];

                    result &= abstractSignatureRelatedTo(source, sourceSig, target, targetSig);
                    if (result !== Ternary.True) {
                        return result;
                    }
                }

                outer: for (const t of targetSignatures) {
                    if (!t.hasStringLiterals || target.flags & TypeFlags.FromSignature) {
                        let localErrors = reportErrors;
                        const checkedAbstractAssignability = false;
                        for (const s of sourceSignatures) {
                            if (!s.hasStringLiterals || source.flags & TypeFlags.FromSignature) {
                                const related = signatureRelatedTo(s, t, localErrors);
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

                function abstractSignatureRelatedTo(source: Type, sourceSig: Signature, target: Type, targetSig: Signature) {
                    if (sourceSig && targetSig) {

                        const sourceDecl = source.symbol && getClassLikeDeclarationOfSymbol(source.symbol);
                        const targetDecl = target.symbol && getClassLikeDeclarationOfSymbol(target.symbol);

                        if (!sourceDecl) {
                            // If the source object isn't itself a class declaration, it can be freely assigned, regardless
                            // of whether the constructed object is abstract or not.
                            return Ternary.True;
                        }

                        const sourceErasedSignature = getErasedSignature(sourceSig);
                        const targetErasedSignature = getErasedSignature(targetSig);

                        const sourceReturnType = sourceErasedSignature && getReturnTypeOfSignature(sourceErasedSignature);
                        const targetReturnType = targetErasedSignature && getReturnTypeOfSignature(targetErasedSignature);

                        const sourceReturnDecl = sourceReturnType && sourceReturnType.symbol && getClassLikeDeclarationOfSymbol(sourceReturnType.symbol);
                        const targetReturnDecl = targetReturnType && targetReturnType.symbol && getClassLikeDeclarationOfSymbol(targetReturnType.symbol);
                        const sourceIsAbstract = sourceReturnDecl && sourceReturnDecl.flags & NodeFlags.Abstract;
                        const targetIsAbstract = targetReturnDecl && targetReturnDecl.flags & NodeFlags.Abstract;

                        if (sourceIsAbstract && !(targetIsAbstract && targetDecl)) {
                            // if target isn't a class-declaration type, then it can be new'd, so we forbid the assignment.
                            if (reportErrors) {
                                reportError(Diagnostics.Cannot_assign_an_abstract_constructor_type_to_a_non_abstract_constructor_type);
                            }
                            return Ternary.False;
                        }
                    }
                    return Ternary.True;
                }
            }

            function signatureRelatedTo(source: Signature, target: Signature, reportErrors: boolean): Ternary {
                if (source === target) {
                    return Ternary.True;
                }
                if (!target.hasRestParameter && source.minArgumentCount > target.parameters.length) {
                    return Ternary.False;
                }
                let sourceMax = source.parameters.length;
                let targetMax = target.parameters.length;
                let checkCount: number;
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
                let result = Ternary.True;
                for (let i = 0; i < checkCount; i++) {
                    const s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                    const t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                    const saveErrorInfo = errorInfo;
                    let related = isRelatedTo(s, t, reportErrors);
                    if (!related) {
                        related = isRelatedTo(t, s, /*reportErrors*/ false);
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

                if (source.typePredicate && target.typePredicate) {
                    const hasDifferentParameterIndex = source.typePredicate.parameterIndex !== target.typePredicate.parameterIndex;
                    let hasDifferentTypes: boolean;
                    if (hasDifferentParameterIndex ||
                        (hasDifferentTypes = !isTypeIdenticalTo(source.typePredicate.type, target.typePredicate.type))) {

                        if (reportErrors) {
                            const sourceParamText = source.typePredicate.parameterName;
                            const targetParamText = target.typePredicate.parameterName;
                            const sourceTypeText = typeToString(source.typePredicate.type);
                            const targetTypeText = typeToString(target.typePredicate.type);

                            if (hasDifferentParameterIndex) {
                                reportError(Diagnostics.Parameter_0_is_not_in_the_same_position_as_parameter_1,
                                    sourceParamText,
                                    targetParamText);
                            }
                            else if (hasDifferentTypes) {
                                reportError(Diagnostics.Type_0_is_not_assignable_to_type_1,
                                    sourceTypeText,
                                    targetTypeText);
                            }

                            reportError(Diagnostics.Type_predicate_0_is_not_assignable_to_1,
                                `${sourceParamText} is ${sourceTypeText}`,
                                `${targetParamText} is ${targetTypeText}`);
                        }
                        return Ternary.False;
                    }
                }
                else if (!source.typePredicate && target.typePredicate) {
                    if (reportErrors) {
                        reportError(Diagnostics.Signature_0_must_have_a_type_predicate, signatureToString(source));
                    }
                    return Ternary.False;
                }

                const targetReturnType = getReturnTypeOfSignature(target);
                if (targetReturnType === voidType) return result;
                const sourceReturnType = getReturnTypeOfSignature(source);

                return result & isRelatedTo(sourceReturnType, targetReturnType, reportErrors);
            }

            function signaturesIdenticalTo(source: Type, target: Type, kind: SignatureKind): Ternary {
                const sourceSignatures = getSignaturesOfType(source, kind);
                const targetSignatures = getSignaturesOfType(target, kind);
                if (sourceSignatures.length !== targetSignatures.length) {
                    return Ternary.False;
                }
                let result = Ternary.True;
                for (let i = 0, len = sourceSignatures.length; i < len; ++i) {
                    const related = compareSignatures(sourceSignatures[i], targetSignatures[i], /*partialMatch*/ false, /*ignoreReturnTypes*/ false, isRelatedTo);
                    if (!related) {
                        return Ternary.False;
                    }
                    result &= related;
                }
                return result;
            }

            function stringIndexTypesRelatedTo(source: Type, originalSource: Type, target: Type, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(IndexKind.String, source, target);
                }
                const targetType = getIndexTypeOfType(target, IndexKind.String);
                if (targetType) {
                    if ((targetType.flags & TypeFlags.Any) && !(originalSource.flags & TypeFlags.Primitive)) {
                        // non-primitive assignment to any is always allowed, eg
                        //   `var x: { [index: string]: any } = { property: 12 };`
                        return Ternary.True;
                    }
                    const sourceType = getIndexTypeOfType(source, IndexKind.String);
                    if (!sourceType) {
                        if (reportErrors) {
                            reportError(Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return Ternary.False;
                    }
                    const related = isRelatedTo(sourceType, targetType, reportErrors);
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

            function numberIndexTypesRelatedTo(source: Type, originalSource: Type, target: Type, reportErrors: boolean): Ternary {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(IndexKind.Number, source, target);
                }
                const targetType = getIndexTypeOfType(target, IndexKind.Number);
                if (targetType) {
                    if ((targetType.flags & TypeFlags.Any) && !(originalSource.flags & TypeFlags.Primitive)) {
                        // non-primitive assignment to any is always allowed, eg
                        //   `var x: { [index: number]: any } = { property: 12 };`
                        return Ternary.True;
                    }
                    const sourceStringType = getIndexTypeOfType(source, IndexKind.String);
                    const sourceNumberType = getIndexTypeOfType(source, IndexKind.Number);
                    if (!(sourceStringType || sourceNumberType)) {
                        if (reportErrors) {
                            reportError(Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return Ternary.False;
                    }
                    let related: Ternary;
                    if (sourceStringType && sourceNumberType) {
                        // If we know for sure we're testing both string and numeric index types then only report errors from the second one
                        related = isRelatedTo(sourceStringType, targetType, /*reportErrors*/ false) || isRelatedTo(sourceNumberType, targetType, reportErrors);
                    }
                    else {
                        related = isRelatedTo(sourceStringType || sourceNumberType, targetType, reportErrors);
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

            function indexTypesIdenticalTo(indexKind: IndexKind, source: Type, target: Type): Ternary {
                const targetType = getIndexTypeOfType(target, indexKind);
                const sourceType = getIndexTypeOfType(source, indexKind);
                if (!sourceType && !targetType) {
                    return Ternary.True;
                }
                if (sourceType && targetType) {
                    return isRelatedTo(sourceType, targetType);
                }
                return Ternary.False;
            }
        }

        // Return true if the given type is part of a deeply nested chain of generic instantiations. We consider this to be the case
        // when structural type comparisons have been started for 10 or more instantiations of the same generic type. It is possible,
        // though highly unlikely, for this test to be true in a situation where a chain of instantiations is not infinitely expanding.
        // Effectively, we will generate a false positive when two types are structurally equal to at least 10 levels, but unequal at
        // some level beyond that.
        function isDeeplyNestedGeneric(type: Type, stack: Type[], depth: number): boolean {
            // We track type references (created by createTypeReference) and instantiated types (created by instantiateType)
            if (type.flags & (TypeFlags.Reference | TypeFlags.Instantiated) && depth >= 5) {
                const symbol = type.symbol;
                let count = 0;
                for (let i = 0; i < depth; i++) {
                    const t = stack[i];
                    if (t.flags & (TypeFlags.Reference | TypeFlags.Instantiated) && t.symbol === symbol) {
                        count++;
                        if (count >= 5) return true;
                    }
                }
            }
            return false;
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
            const sourcePropAccessibility = getDeclarationFlagsFromSymbol(sourceProp) & (NodeFlags.Private | NodeFlags.Protected);
            const targetPropAccessibility = getDeclarationFlagsFromSymbol(targetProp) & (NodeFlags.Private | NodeFlags.Protected);
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

        function isMatchingSignature(source: Signature, target: Signature, partialMatch: boolean) {
            // A source signature matches a target signature if the two signatures have the same number of required,
            // optional, and rest parameters.
            if (source.parameters.length === target.parameters.length &&
                source.minArgumentCount === target.minArgumentCount &&
                source.hasRestParameter === target.hasRestParameter) {
                return true;
            }
            // A source signature partially matches a target signature if the target signature has no fewer required
            // parameters and no more overall parameters than the source signature (where a signature with a rest
            // parameter is always considered to have more overall parameters than one without).
            if (partialMatch && source.minArgumentCount <= target.minArgumentCount && (
                source.hasRestParameter && !target.hasRestParameter ||
                source.hasRestParameter === target.hasRestParameter && source.parameters.length >= target.parameters.length)) {
                return true;
            }
            return false;
        }

        function compareSignatures(source: Signature, target: Signature, partialMatch: boolean, ignoreReturnTypes: boolean, compareTypes: (s: Type, t: Type) => Ternary): Ternary {
            if (source === target) {
                return Ternary.True;
            }
            if (!(isMatchingSignature(source, target, partialMatch))) {
                return Ternary.False;
            }
            let result = Ternary.True;
            if (source.typeParameters && target.typeParameters) {
                if (source.typeParameters.length !== target.typeParameters.length) {
                    return Ternary.False;
                }
                for (let i = 0, len = source.typeParameters.length; i < len; ++i) {
                    const related = compareTypes(source.typeParameters[i], target.typeParameters[i]);
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
            const targetLen = target.parameters.length;
            for (let i = 0; i < targetLen; i++) {
                const s = isRestParameterIndex(source, i) ? getRestTypeOfSignature(source) : getTypeOfSymbol(source.parameters[i]);
                const t = isRestParameterIndex(target, i) ? getRestTypeOfSignature(target) : getTypeOfSymbol(target.parameters[i]);
                const related = compareTypes(s, t);
                if (!related) {
                    return Ternary.False;
                }
                result &= related;
            }
            if (!ignoreReturnTypes) {
                result &= compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            return result;
        }

        function isRestParameterIndex(signature: Signature, parameterIndex: number) {
            return signature.hasRestParameter && parameterIndex >= signature.parameters.length - 1;
        }

        function isSupertypeOfEach(candidate: Type, types: Type[]): boolean {
            for (const type of types) {
                if (candidate !== type && !isTypeSubtypeOf(type, candidate)) return false;
            }
            return true;
        }

        function getCommonSupertype(types: Type[]): Type {
            return forEach(types, t => isSupertypeOfEach(t, types) ? t : undefined);
        }

        function reportNoCommonSupertypeError(types: Type[], errorLocation: Node, errorMessageChainHead: DiagnosticMessageChain): void {
            // The downfallType/bestSupertypeDownfallType is the first type that caused a particular candidate
            // to not be the common supertype. So if it weren't for this one downfallType (and possibly others),
            // the type in question could have been the common supertype.
            let bestSupertype: Type;
            let bestSupertypeDownfallType: Type;
            let bestSupertypeScore = 0;

            for (let i = 0; i < types.length; i++) {
                let score = 0;
                let downfallType: Type = undefined;
                for (let j = 0; j < types.length; j++) {
                    if (isTypeSubtypeOf(types[j], types[i])) {
                        score++;
                    }
                    else if (!downfallType) {
                        downfallType = types[j];
                    }
                }

                Debug.assert(!!downfallType, "If there is no common supertype, each type should have a downfallType");

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

        function isArrayLikeType(type: Type): boolean {
            // A type is array-like if it is not the undefined or null type and if it is assignable to any[]
            return !(type.flags & (TypeFlags.Undefined | TypeFlags.Null)) && isTypeAssignableTo(type, anyArrayType);
        }

        function isTupleLikeType(type: Type): boolean {
            return !!getPropertyOfType(type, "0");
        }

        function isStringLiteralType(type: Type) {
            return type.flags & TypeFlags.StringLiteral;
        }

        /**
         * Check if a Type was written as a tuple type literal.
         * Prefer using isTupleLikeType() unless the use of `elementTypes` is required.
         */
        function isTupleType(type: Type): type is TupleType {
            return !!(type.flags & TypeFlags.Tuple);
        }

        function getRegularTypeOfObjectLiteral(type: Type): Type {
            if (type.flags & TypeFlags.FreshObjectLiteral) {
                let regularType = (<FreshObjectLiteralType>type).regularType;
                if (!regularType) {
                    regularType = <ResolvedType>createType((<ResolvedType>type).flags & ~TypeFlags.FreshObjectLiteral);
                    regularType.symbol = (<ResolvedType>type).symbol;
                    regularType.members = (<ResolvedType>type).members;
                    regularType.properties = (<ResolvedType>type).properties;
                    regularType.callSignatures = (<ResolvedType>type).callSignatures;
                    regularType.constructSignatures = (<ResolvedType>type).constructSignatures;
                    regularType.stringIndexType = (<ResolvedType>type).stringIndexType;
                    regularType.numberIndexType = (<ResolvedType>type).numberIndexType;
                    (<FreshObjectLiteralType>type).regularType = regularType;
                }
                return regularType;
            }
            return type;
        }

        function getWidenedTypeOfObjectLiteral(type: Type): Type {
            const properties = getPropertiesOfObjectType(type);
            const members: SymbolTable = {};
            forEach(properties, p => {
                const propType = getTypeOfSymbol(p);
                const widenedType = getWidenedType(propType);
                if (propType !== widenedType) {
                    const symbol = <TransientSymbol>createSymbol(p.flags | SymbolFlags.Transient, p.name);
                    symbol.declarations = p.declarations;
                    symbol.parent = p.parent;
                    symbol.type = widenedType;
                    symbol.target = p;
                    if (p.valueDeclaration) symbol.valueDeclaration = p.valueDeclaration;
                    p = symbol;
                }
                members[p.name] = p;
            });
            let stringIndexType = getIndexTypeOfType(type, IndexKind.String);
            let numberIndexType = getIndexTypeOfType(type, IndexKind.Number);
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
                    return getUnionType(map((<UnionType>type).types, getWidenedType), /*noSubtypeReduction*/ true);
                }
                if (isArrayType(type)) {
                    return createArrayType(getWidenedType((<TypeReference>type).typeArguments[0]));
                }
                if (isTupleType(type)) {
                    return createTupleType(map(type.elementTypes, getWidenedType));
                }
            }
            return type;
        }

        /**
         * Reports implicit any errors that occur as a result of widening 'null' and 'undefined'
         * to 'any'. A call to reportWideningErrorsInType is normally accompanied by a call to
         * getWidenedType. But in some cases getWidenedType is called without reporting errors
         * (type argument inference is an example).
         *
         * The return value indicates whether an error was in fact reported. The particular circumstances
         * are on a best effort basis. Currently, if the null or undefined that causes widening is inside
         * an object literal property (arbitrarily deeply), this function reports an error. If no error is
         * reported, reportImplicitAnyError is a suitable fallback to report a general error.
         */
        function reportWideningErrorsInType(type: Type): boolean {
            let errorReported = false;
            if (type.flags & TypeFlags.Union) {
                for (const t of (<UnionType>type).types) {
                    if (reportWideningErrorsInType(t)) {
                        errorReported = true;
                    }
                }
            }
            if (isArrayType(type)) {
                return reportWideningErrorsInType((<TypeReference>type).typeArguments[0]);
            }
            if (isTupleType(type)) {
                for (const t of type.elementTypes) {
                    if (reportWideningErrorsInType(t)) {
                        errorReported = true;
                    }
                }
            }
            if (type.flags & TypeFlags.ObjectLiteral) {
                for (const p of getPropertiesOfObjectType(type)) {
                    const t = getTypeOfSymbol(p);
                    if (t.flags & TypeFlags.ContainsUndefinedOrNull) {
                        if (!reportWideningErrorsInType(t)) {
                            error(p.valueDeclaration, Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, p.name, typeToString(getWidenedType(t)));
                        }
                        errorReported = true;
                    }
                }
            }
            return errorReported;
        }

        function reportImplicitAnyError(declaration: Declaration, type: Type) {
            const typeAsString = typeToString(getWidenedType(type));
            let diagnostic: DiagnosticMessage;
            switch (declaration.kind) {
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    diagnostic = Diagnostics.Member_0_implicitly_has_an_1_type;
                    break;
                case SyntaxKind.Parameter:
                    diagnostic = (<ParameterDeclaration>declaration).dotDotDotToken ?
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
                    diagnostic = Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                    break;
                default:
                    diagnostic = Diagnostics.Variable_0_implicitly_has_an_1_type;
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
            let sourceMax = source.parameters.length;
            let targetMax = target.parameters.length;
            let count: number;
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
            for (let i = 0; i < count; i++) {
                const s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                const t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                callback(s, t);
            }
        }

        function createInferenceContext(typeParameters: TypeParameter[], inferUnionTypes: boolean): InferenceContext {
            const inferences: TypeInferences[] = [];
            for (const unused of typeParameters) {
                inferences.push({
                    primary: undefined, secondary: undefined, isFixed: false
                });
            }
            return {
                typeParameters,
                inferUnionTypes,
                inferences,
                inferredTypes: new Array(typeParameters.length),
            };
        }

        function inferTypes(context: InferenceContext, source: Type, target: Type) {
            let sourceStack: Type[];
            let targetStack: Type[];
            let depth = 0;
            let inferiority = 0;
            inferFromTypes(source, target);

            function isInProcess(source: Type, target: Type) {
                for (let i = 0; i < depth; i++) {
                    if (source === sourceStack[i] && target === targetStack[i]) {
                        return true;
                    }
                }
                return false;
            }

            function inferFromTypes(source: Type, target: Type) {
                if (target.flags & TypeFlags.TypeParameter) {
                    // If target is a type parameter, make an inference, unless the source type contains
                    // the anyFunctionType (the wildcard type that's used to avoid contextually typing functions).
                    // Because the anyFunctionType is internal, it should not be exposed to the user by adding
                    // it as an inference candidate. Hopefully, a better candidate will come along that does
                    // not contain anyFunctionType when we come back to this argument for its second round
                    // of inference.
                    if (source.flags & TypeFlags.ContainsAnyFunctionType) {
                        return;
                    }

                    const typeParameters = context.typeParameters;
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (target === typeParameters[i]) {
                            const inferences = context.inferences[i];
                            if (!inferences.isFixed) {
                                // Any inferences that are made to a type parameter in a union type are inferior
                                // to inferences made to a flat (non-union) type. This is because if we infer to
                                // T | string[], we really don't know if we should be inferring to T or not (because
                                // the correct constituent on the target side could be string[]). Therefore, we put
                                // such inferior inferences into a secondary bucket, and only use them if the primary
                                // bucket is empty.
                                const candidates = inferiority ?
                                    inferences.secondary || (inferences.secondary = []) :
                                    inferences.primary || (inferences.primary = []);
                                if (!contains(candidates, source)) {
                                    candidates.push(source);
                                }
                            }
                            return;
                        }
                    }
                }
                else if (source.flags & TypeFlags.Reference && target.flags & TypeFlags.Reference && (<TypeReference>source).target === (<TypeReference>target).target) {
                    // If source and target are references to the same generic type, infer from type arguments
                    const sourceTypes = (<TypeReference>source).typeArguments || emptyArray;
                    const targetTypes = (<TypeReference>target).typeArguments || emptyArray;
                    const count = sourceTypes.length < targetTypes.length ? sourceTypes.length : targetTypes.length;
                    for (let i = 0; i < count; i++) {
                        inferFromTypes(sourceTypes[i], targetTypes[i]);
                    }
                }
                else if (source.flags & TypeFlags.Tuple && target.flags & TypeFlags.Tuple && (<TupleType>source).elementTypes.length === (<TupleType>target).elementTypes.length) {
                    // If source and target are tuples of the same size, infer from element types
                    const sourceTypes = (<TupleType>source).elementTypes;
                    const targetTypes = (<TupleType>target).elementTypes;
                    for (let i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], targetTypes[i]);
                    }
                }
                else if (target.flags & TypeFlags.UnionOrIntersection) {
                    const targetTypes = (<UnionOrIntersectionType>target).types;
                    let typeParameterCount = 0;
                    let typeParameter: TypeParameter;
                    // First infer to each type in union or intersection that isn't a type parameter
                    for (const t of targetTypes) {
                        if (t.flags & TypeFlags.TypeParameter && contains(context.typeParameters, t)) {
                            typeParameter = <TypeParameter>t;
                            typeParameterCount++;
                        }
                        else {
                            inferFromTypes(source, t);
                        }
                    }
                    // Next, if target is a union type containing a single naked type parameter, make a
                    // secondary inference to that type parameter. We don't do this for intersection types
                    // because in a target type like Foo & T we don't know how which parts of the source type
                    // should be matched by Foo and which should be inferred to T.
                    if (target.flags & TypeFlags.Union && typeParameterCount === 1) {
                        inferiority++;
                        inferFromTypes(source, typeParameter);
                        inferiority--;
                    }
                }
                else if (source.flags & TypeFlags.UnionOrIntersection) {
                    // Source is a union or intersection type, infer from each consituent type
                    const sourceTypes = (<UnionOrIntersectionType>source).types;
                    for (const sourceType of sourceTypes) {
                        inferFromTypes(sourceType, target);
                    }
                }
                else {
                    source = getApparentType(source);
                    if (source.flags & TypeFlags.ObjectType && (target.flags & (TypeFlags.Reference | TypeFlags.Tuple) ||
                        (target.flags & TypeFlags.Anonymous) && target.symbol && target.symbol.flags & (SymbolFlags.Method | SymbolFlags.TypeLiteral | SymbolFlags.Class))) {
                        // If source is an object type, and target is a type reference, a tuple type, the type of a method, or a type literal, infer from members
                        if (isInProcess(source, target)) {
                            return;
                        }
                        if (isDeeplyNestedGeneric(source, sourceStack, depth) && isDeeplyNestedGeneric(target, targetStack, depth)) {
                            return;
                        }

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
                const properties = getPropertiesOfObjectType(target);
                for (const targetProp of properties) {
                    const sourceProp = getPropertyOfObjectType(source, targetProp.name);
                    if (sourceProp) {
                        inferFromTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
                    }
                }
            }

            function inferFromSignatures(source: Type, target: Type, kind: SignatureKind) {
                const sourceSignatures = getSignaturesOfType(source, kind);
                const targetSignatures = getSignaturesOfType(target, kind);
                const sourceLen = sourceSignatures.length;
                const targetLen = targetSignatures.length;
                const len = sourceLen < targetLen ? sourceLen : targetLen;
                for (let i = 0; i < len; i++) {
                    inferFromSignature(getErasedSignature(sourceSignatures[sourceLen - len + i]), getErasedSignature(targetSignatures[targetLen - len + i]));
                }
            }

            function inferFromSignature(source: Signature, target: Signature) {
                forEachMatchingParameterType(source, target, inferFromTypes);
                if (source.typePredicate && target.typePredicate) {
                    if (target.typePredicate.parameterIndex === source.typePredicate.parameterIndex) {
                        // Return types from type predicates are treated as booleans. In order to infer types
                        // from type predicates we would need to infer using the type within the type predicate
                        // (i.e. 'Foo' from 'x is Foo').
                        inferFromTypes(source.typePredicate.type, target.typePredicate.type);
                    }
                }
                else {
                    inferFromTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
                }
            }

            function inferFromIndexTypes(source: Type, target: Type, sourceKind: IndexKind, targetKind: IndexKind) {
                const targetIndexType = getIndexTypeOfType(target, targetKind);
                if (targetIndexType) {
                    const sourceIndexType = getIndexTypeOfType(source, sourceKind);
                    if (sourceIndexType) {
                        inferFromTypes(sourceIndexType, targetIndexType);
                    }
                }
            }
        }

        function getInferenceCandidates(context: InferenceContext, index: number): Type[] {
            const inferences = context.inferences[index];
            return inferences.primary || inferences.secondary || emptyArray;
        }

        function getInferredType(context: InferenceContext, index: number): Type {
            let inferredType = context.inferredTypes[index];
            let inferenceSucceeded: boolean;
            if (!inferredType) {
                const inferences = getInferenceCandidates(context, index);
                if (inferences.length) {
                    // Infer widened union or supertype, or the unknown type for no common supertype
                    const unionOrSuperType = context.inferUnionTypes ? getUnionType(inferences) : getCommonSupertype(inferences);
                    inferredType = unionOrSuperType ? getWidenedType(unionOrSuperType) : unknownType;
                    inferenceSucceeded = !!unionOrSuperType;
                }
                else {
                    // Infer the empty object type when no inferences were made. It is important to remember that
                    // in this case, inference still succeeds, meaning there is no error for not having inference
                    // candidates. An inference error only occurs when there are *conflicting* candidates, i.e.
                    // candidates with no common supertype.
                    inferredType = emptyObjectType;
                    inferenceSucceeded = true;
                }

                // Only do the constraint check if inference succeeded (to prevent cascading errors)
                if (inferenceSucceeded) {
                    const constraint = getConstraintOfTypeParameter(context.typeParameters[index]);
                    inferredType = constraint && !isTypeAssignableTo(inferredType, constraint) ? constraint : inferredType;
                }
                else if (context.failedTypeParameterIndex === undefined || context.failedTypeParameterIndex > index) {
                    // If inference failed, it is necessary to record the index of the failed type parameter (the one we are on).
                    // It might be that inference has already failed on a later type parameter on a previous call to inferTypeArguments.
                    // So if this failure is on preceding type parameter, this type parameter is the new failure index.
                    context.failedTypeParameterIndex = index;
                }
                context.inferredTypes[index] = inferredType;
            }
            return inferredType;
        }

        function getInferredTypes(context: InferenceContext): Type[] {
            for (let i = 0; i < context.inferredTypes.length; i++) {
                getInferredType(context, i);
            }

            return context.inferredTypes;
        }

        function hasAncestor(node: Node, kind: SyntaxKind): boolean {
            return getAncestor(node, kind) !== undefined;
        }

        // EXPRESSION TYPE CHECKING

        function getResolvedSymbol(node: Identifier): Symbol {
            const links = getNodeLinks(node);
            if (!links.resolvedSymbol) {
                links.resolvedSymbol = (!nodeIsMissing(node) && resolveName(node, node.text, SymbolFlags.Value | SymbolFlags.ExportValue, Diagnostics.Cannot_find_name_0, node)) || unknownSymbol;
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

        function hasInitializer(node: VariableLikeDeclaration): boolean {
            return !!(node.initializer || isBindingPattern(node.parent) && hasInitializer(<VariableLikeDeclaration>node.parent.parent));
        }

        // Check if a given variable is assigned within a given syntax node
        function isVariableAssignedWithin(symbol: Symbol, node: Node): boolean {
            const links = getNodeLinks(node);
            if (links.assignmentChecks) {
                const cachedResult = links.assignmentChecks[symbol.id];
                if (cachedResult !== undefined) {
                    return cachedResult;
                }
            }
            else {
                links.assignmentChecks = {};
            }
            return links.assignmentChecks[symbol.id] = isAssignedIn(node);

            function isAssignedInBinaryExpression(node: BinaryExpression) {
                if (node.operatorToken.kind >= SyntaxKind.FirstAssignment && node.operatorToken.kind <= SyntaxKind.LastAssignment) {
                    let n = node.left;
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
                    case SyntaxKind.AsExpression:
                    case SyntaxKind.ParenthesizedExpression:
                    case SyntaxKind.PrefixUnaryExpression:
                    case SyntaxKind.DeleteExpression:
                    case SyntaxKind.AwaitExpression:
                    case SyntaxKind.TypeOfExpression:
                    case SyntaxKind.VoidExpression:
                    case SyntaxKind.PostfixUnaryExpression:
                    case SyntaxKind.YieldExpression:
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
                    case SyntaxKind.ForOfStatement:
                    case SyntaxKind.ReturnStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.SwitchStatement:
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                    case SyntaxKind.LabeledStatement:
                    case SyntaxKind.ThrowStatement:
                    case SyntaxKind.TryStatement:
                    case SyntaxKind.CatchClause:
                    case SyntaxKind.JsxElement:
                    case SyntaxKind.JsxSelfClosingElement:
                    case SyntaxKind.JsxAttribute:
                    case SyntaxKind.JsxSpreadAttribute:
                    case SyntaxKind.JsxOpeningElement:
                    case SyntaxKind.JsxExpression:
                        return forEachChild(node, isAssignedIn);
                }
                return false;
            }
        }

        // Get the narrowed type of a given symbol at a given location
        function getNarrowedTypeOfSymbol(symbol: Symbol, node: Node) {
            let type = getTypeOfSymbol(symbol);
            // Only narrow when symbol is variable of type any or an object, union, or type parameter type
            if (node && symbol.flags & SymbolFlags.Variable) {
                if (isTypeAny(type) || type.flags & (TypeFlags.ObjectType | TypeFlags.Union | TypeFlags.TypeParameter)) {
                    const originalType = type;
                    const nodeStack: {node: Node, child: Node}[] = [];
                    loop: while (node.parent) {
                        const child = node;
                        node = node.parent;
                        switch (node.kind) {
                            case SyntaxKind.IfStatement:
                            case SyntaxKind.ConditionalExpression:
                            case SyntaxKind.BinaryExpression:
                                nodeStack.push({node, child});
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
                    }

                    let nodes: {node: Node, child: Node};
                    while (nodes = nodeStack.pop()) {
                        const {node, child} = nodes;
                        switch (node.kind) {
                            case SyntaxKind.IfStatement:
                                // In a branch of an if statement, narrow based on controlling expression
                                if (child !== (<IfStatement>node).expression) {
                                    type = narrowType(type, (<IfStatement>node).expression, /*assumeTrue*/ child === (<IfStatement>node).thenStatement);
                                }
                                break;
                            case SyntaxKind.ConditionalExpression:
                                // In a branch of a conditional expression, narrow based on controlling condition
                                if (child !== (<ConditionalExpression>node).condition) {
                                    type = narrowType(type, (<ConditionalExpression>node).condition, /*assumeTrue*/ child === (<ConditionalExpression>node).whenTrue);
                                }
                                break;
                            case SyntaxKind.BinaryExpression:
                                // In the right operand of an && or ||, narrow based on left operand
                                if (child === (<BinaryExpression>node).right) {
                                    if ((<BinaryExpression>node).operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
                                        type = narrowType(type, (<BinaryExpression>node).left, /*assumeTrue*/ true);
                                    }
                                    else if ((<BinaryExpression>node).operatorToken.kind === SyntaxKind.BarBarToken) {
                                        type = narrowType(type, (<BinaryExpression>node).left, /*assumeTrue*/ false);
                                    }
                                }
                                break;
                            default:
                                Debug.fail("Unreachable!");
                        }

                        // Use original type if construct contains assignments to variable
                        if (type !== originalType && isVariableAssignedWithin(symbol, node)) {
                            type = originalType;
                        }
                    }

                    // Preserve old top-level behavior - if the branch is really an empty set, revert to prior type
                    if (type === emptyUnionType) {
                        type = originalType;
                    }
                }
            }

            return type;

            function narrowTypeByEquality(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                // Check that we have 'typeof <symbol>' on the left and string literal on the right
                if (expr.left.kind !== SyntaxKind.TypeOfExpression || expr.right.kind !== SyntaxKind.StringLiteral) {
                    return type;
                }
                const left = <TypeOfExpression>expr.left;
                const right = <LiteralExpression>expr.right;
                if (left.expression.kind !== SyntaxKind.Identifier || getResolvedSymbol(<Identifier>left.expression) !== symbol) {
                    return type;
                }
                if (expr.operatorToken.kind === SyntaxKind.ExclamationEqualsEqualsToken) {
                    assumeTrue = !assumeTrue;
                }
                const typeInfo = primitiveTypeInfo[right.text];
                // Don't narrow `undefined`
                if (typeInfo && typeInfo.type === undefinedType) {
                    return type;
                }
                // If the type to be narrowed is any and we're checking a primitive with assumeTrue=true, return the primitive
                if (!!(type.flags & TypeFlags.Any) && typeInfo && assumeTrue) {
                    return typeInfo.type;
                }
                let flags: TypeFlags;
                if (typeInfo) {
                    flags = typeInfo.flags;
                }
                else {
                    assumeTrue = !assumeTrue;
                    flags = TypeFlags.NumberLike | TypeFlags.StringLike | TypeFlags.ESSymbol | TypeFlags.Boolean;
                }
                // At this point we can bail if it's not a union
                if (!(type.flags & TypeFlags.Union)) {
                    // If the active non-union type would be removed from a union by this type guard, return an empty union
                    return filterUnion(type) ? type : emptyUnionType;
                }
                return getUnionType(filter((type as UnionType).types, filterUnion), /*noSubtypeReduction*/ true);

                function filterUnion(type: Type) {
                    return assumeTrue === !!(type.flags & flags);
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
                        narrowType(type, expr.right, /*assumeTrue*/ false)
                    ]);
                }
            }

            function narrowTypeByOr(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                if (assumeTrue) {
                    // The assumed result is true. This means either the first operand was true, or the first operand was false
                    // and the second operand was true. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, /*assumeTrue*/ true),
                        narrowType(type, expr.right, /*assumeTrue*/ true)
                    ]);
                }
                else {
                    // The assumed result is false, therefore we narrow assuming each operand to be false.
                    return narrowType(narrowType(type, expr.left, /*assumeTrue*/ false), expr.right, /*assumeTrue*/ false);
                }
            }

            function narrowTypeByInstanceof(type: Type, expr: BinaryExpression, assumeTrue: boolean): Type {
                // Check that type is not any, assumed result is true, and we have variable symbol on the left
                if (isTypeAny(type) || expr.left.kind !== SyntaxKind.Identifier || getResolvedSymbol(<Identifier>expr.left) !== symbol) {
                    return type;
                }

                // Check that right operand is a function type with a prototype property
                const rightType = checkExpression(expr.right);
                if (!isTypeSubtypeOf(rightType, globalFunctionType)) {
                    return type;
                }

                let targetType: Type;
                const prototypeProperty = getPropertyOfType(rightType, "prototype");
                if (prototypeProperty) {
                    // Target type is type of the prototype property
                    const prototypePropertyType = getTypeOfSymbol(prototypeProperty);
                    if (!isTypeAny(prototypePropertyType)) {
                        targetType = prototypePropertyType;
                    }
                }

                if (!targetType) {
                    // Target type is type of construct signature
                    let constructSignatures: Signature[];
                    if (rightType.flags & TypeFlags.Interface) {
                        constructSignatures = resolveDeclaredMembers(<InterfaceType>rightType).declaredConstructSignatures;
                    }
                    else if (rightType.flags & TypeFlags.Anonymous) {
                        constructSignatures = getSignaturesOfType(rightType, SignatureKind.Construct);
                    }
                    if (constructSignatures && constructSignatures.length) {
                        targetType = getUnionType(map(constructSignatures, signature => getReturnTypeOfSignature(getErasedSignature(signature))));
                    }
                }

                if (targetType) {
                    if (!assumeTrue) {
                        if (type.flags & TypeFlags.Union) {
                            return getUnionType(filter((<UnionType>type).types, t => !isTypeSubtypeOf(t, targetType)));
                        }
                        return type;
                    }

                    return getNarrowedType(type, targetType);
                }

                return type;
            }

            function getNarrowedType(originalType: Type, narrowedTypeCandidate: Type) {
                // If the current type is a union type, remove all constituents that aren't assignable to target. If that produces
                // 0 candidates, fall back to the assignability check
                if (originalType.flags & TypeFlags.Union) {
                    const assignableConstituents = filter((<UnionType>originalType).types, t => isTypeAssignableTo(t, narrowedTypeCandidate));
                    if (assignableConstituents.length) {
                        return getUnionType(assignableConstituents);
                    }
                }

                if (isTypeAssignableTo(narrowedTypeCandidate, originalType)) {
                    // Narrow to the target type if it's assignable to the current type
                    return narrowedTypeCandidate;
                }

                return originalType;
            }

            function narrowTypeByTypePredicate(type: Type, expr: CallExpression, assumeTrue: boolean): Type {
                if (type.flags & TypeFlags.Any) {
                    return type;
                }
                const signature = getResolvedSignature(expr);

                if (signature.typePredicate &&
                    expr.arguments[signature.typePredicate.parameterIndex] &&
                    getSymbolAtLocation(expr.arguments[signature.typePredicate.parameterIndex]) === symbol) {

                    if (!assumeTrue) {
                        if (type.flags & TypeFlags.Union) {
                            return getUnionType(filter((<UnionType>type).types, t => !isTypeSubtypeOf(t, signature.typePredicate.type)));
                        }
                        return type;
                    }
                    return getNarrowedType(type, signature.typePredicate.type);
                }
                return type;
            }

            // Narrow the given type based on the given expression having the assumed boolean value. The returned type
            // will be a subtype or the same type as the argument.
            function narrowType(type: Type, expr: Expression, assumeTrue: boolean): Type {
                switch (expr.kind) {
                    case SyntaxKind.CallExpression:
                        return narrowTypeByTypePredicate(type, <CallExpression>expr, assumeTrue);
                    case SyntaxKind.ParenthesizedExpression:
                        return narrowType(type, (<ParenthesizedExpression>expr).expression, assumeTrue);
                    case SyntaxKind.BinaryExpression:
                        const operator = (<BinaryExpression>expr).operatorToken.kind;
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
                            return narrowType(type, (<PrefixUnaryExpression>expr).operand, !assumeTrue);
                        }
                        break;
                }
                return type;
            }
        }

        function checkIdentifier(node: Identifier): Type {
            const symbol = getResolvedSymbol(node);

            // As noted in ECMAScript 6 language spec, arrow functions never have an arguments objects.
            // Although in down-level emit of arrow function, we emit it using function expression which means that
            // arguments objects will be bound to the inner object; emitting arrow function natively in ES6, arguments objects
            // will be bound to non-arrow function that contain this arrow function. This results in inconsistent behavior.
            // To avoid that we will give an error to users if they use arguments objects in arrow function so that they
            // can explicitly bound arguments objects
            if (symbol === argumentsSymbol) {
                const container = getContainingFunction(node);
                if (container.kind === SyntaxKind.ArrowFunction) {
                    if (languageVersion < ScriptTarget.ES6) {
                        error(node, Diagnostics.The_arguments_object_cannot_be_referenced_in_an_arrow_function_in_ES3_and_ES5_Consider_using_a_standard_function_expression);
                    }
                }

                if (node.parserContextFlags & ParserContextFlags.Await) {
                    getNodeLinks(container).flags |= NodeCheckFlags.CaptureArguments;
                    getNodeLinks(node).flags |= NodeCheckFlags.LexicalArguments;
                }
            }

            if (symbol.flags & SymbolFlags.Alias && !isInTypeQuery(node) && !isConstEnumOrConstEnumOnlyModule(resolveAlias(symbol))) {
                markAliasSymbolAsReferenced(symbol);
            }

            checkCollisionWithCapturedSuperVariable(node, node);
            checkCollisionWithCapturedThisVariable(node, node);
            checkBlockScopedBindingCapturedInLoop(node, symbol);

            return getNarrowedTypeOfSymbol(getExportSymbolOfValueSymbolIfExported(symbol), node);
        }

        function isInsideFunction(node: Node, threshold: Node): boolean {
            let current = node;
            while (current && current !== threshold) {
                if (isFunctionLike(current)) {
                    return true;
                }
                current = current.parent;
            }

            return false;
        }

        function checkBlockScopedBindingCapturedInLoop(node: Identifier, symbol: Symbol): void {
            if (languageVersion >= ScriptTarget.ES6 ||
                (symbol.flags & (SymbolFlags.BlockScopedVariable | SymbolFlags.Class)) === 0 ||
                symbol.valueDeclaration.parent.kind === SyntaxKind.CatchClause) {
                return;
            }

            // 1. walk from the use site up to the declaration and check
            // if there is anything function like between declaration and use-site (is binding/class is captured in function).
            // 2. walk from the declaration up to the boundary of lexical environment and check
            // if there is an iteration statement in between declaration and boundary (is binding/class declared inside iteration statement)

            let container: Node;
            if (symbol.flags & SymbolFlags.Class) {
                // get parent of class declaration
                container = getClassLikeDeclarationOfSymbol(symbol).parent;
            }
            else {
                // nesting structure:
                // (variable declaration or binding element) -> variable declaration list -> container
                container = symbol.valueDeclaration;
                while (container.kind !== SyntaxKind.VariableDeclarationList) {
                    container = container.parent;
                }
                // get the parent of variable declaration list
                container = container.parent;
                if (container.kind === SyntaxKind.VariableStatement) {
                    // if parent is variable statement - get its parent
                    container = container.parent;
                }
            }

            const inFunction = isInsideFunction(node.parent, container);

            let current = container;
            while (current && !nodeStartsNewLexicalEnvironment(current)) {
                if (isIterationStatement(current, /*lookInLabeledStatements*/ false)) {
                    if (inFunction) {
                        getNodeLinks(current).flags |= NodeCheckFlags.LoopWithBlockScopedBindingCapturedInFunction;
                    }
                    // mark value declaration so during emit they can have a special handling
                    getNodeLinks(<VariableDeclaration>symbol.valueDeclaration).flags |= NodeCheckFlags.BlockScopedBindingInLoop;
                    break;
                }
                current = current.parent;
            }
        }

        function captureLexicalThis(node: Node, container: Node): void {
            getNodeLinks(node).flags |= NodeCheckFlags.LexicalThis;
            if (container.kind === SyntaxKind.PropertyDeclaration || container.kind === SyntaxKind.Constructor) {
                const classNode = container.parent;
                getNodeLinks(classNode).flags |= NodeCheckFlags.CaptureThis;
            }
            else {
                getNodeLinks(container).flags |= NodeCheckFlags.CaptureThis;
            }
        }

        function checkThisExpression(node: Node): Type {
            // Stop at the first arrow function so that we can
            // tell whether 'this' needs to be captured.
            let container = getThisContainer(node, /* includeArrowFunctions */ true);
            let needToCaptureLexicalThis = false;

            // Now skip arrow functions to get the "real" owner of 'this'.
            if (container.kind === SyntaxKind.ArrowFunction) {
                container = getThisContainer(container, /* includeArrowFunctions */ false);

                // When targeting es6, arrow function lexically bind "this" so we do not need to do the work of binding "this" in emitted code
                needToCaptureLexicalThis = (languageVersion < ScriptTarget.ES6);
            }

            switch (container.kind) {
                case SyntaxKind.ModuleDeclaration:
                    error(node, Diagnostics.this_cannot_be_referenced_in_a_module_or_namespace_body);
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

            if (isClassLike(container.parent)) {
                const symbol = getSymbolOfNode(container.parent);
                return container.flags & NodeFlags.Static ? getTypeOfSymbol(symbol) : (<InterfaceType>getDeclaredTypeOfSymbol(symbol)).thisType;
            }
            return anyType;
        }

        function isInConstructorArgumentInitializer(node: Node, constructorDecl: Node): boolean {
            for (let n = node; n && n !== constructorDecl; n = n.parent) {
                if (n.kind === SyntaxKind.Parameter) {
                    return true;
                }
            }
            return false;
        }

        function checkSuperExpression(node: Node): Type {
            const isCallExpression = node.parent.kind === SyntaxKind.CallExpression && (<CallExpression>node.parent).expression === node;
            const classDeclaration = getContainingClass(node);
            const classType = classDeclaration && <InterfaceType>getDeclaredTypeOfSymbol(getSymbolOfNode(classDeclaration));
            const baseClassType = classType && getBaseTypes(classType)[0];

            let container = getSuperContainer(node, /*includeFunctions*/ true);
            let needToCaptureLexicalThis = false;

            if (!isCallExpression) {
                // adjust the container reference in case if super is used inside arrow functions with arbitrary deep nesting
                while (container && container.kind === SyntaxKind.ArrowFunction) {
                    container = getSuperContainer(container, /*includeFunctions*/ true);
                    needToCaptureLexicalThis = languageVersion < ScriptTarget.ES6;
                }
            }

            const canUseSuperExpression = isLegalUsageOfSuperExpression(container);
            let nodeCheckFlag: NodeCheckFlags = 0;

            // always set NodeCheckFlags for 'super' expression node
            if (canUseSuperExpression) {
                if ((container.flags & NodeFlags.Static) || isCallExpression) {
                    nodeCheckFlag = NodeCheckFlags.SuperStatic;
                }
                else {
                    nodeCheckFlag = NodeCheckFlags.SuperInstance;
                }

                getNodeLinks(node).flags |= nodeCheckFlag;

                if (needToCaptureLexicalThis) {
                    // call expressions are allowed only in constructors so they should always capture correct 'this'
                    // super property access expressions can also appear in arrow functions -
                    // in this case they should also use correct lexical this
                    captureLexicalThis(node.parent, container);
                }
            }

            if (!baseClassType) {
                if (!classDeclaration || !getClassExtendsHeritageClauseElement(classDeclaration)) {
                    error(node, Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                }
                return unknownType;
            }

            if (!canUseSuperExpression) {
                if (container && container.kind === SyntaxKind.ComputedPropertyName) {
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

            if (container.kind === SyntaxKind.Constructor && isInConstructorArgumentInitializer(node, container)) {
                // issue custom error message for super property access in constructor arguments (to be aligned with old compiler)
                error(node, Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
                return unknownType;
            }

            return nodeCheckFlag === NodeCheckFlags.SuperStatic
                ? getBaseConstructorTypeOfClass(classType)
                : baseClassType;

            function isLegalUsageOfSuperExpression(container: Node): boolean {
                if (!container) {
                    return false;
                }

                if (isCallExpression) {
                    // TS 1.0 SPEC (April 2014): 4.8.1
                    // Super calls are only permitted in constructors of derived classes
                    return container.kind === SyntaxKind.Constructor;
                }
                else {
                    // TS 1.0 SPEC (April 2014)
                    // 'super' property access is allowed
                    // - In a constructor, instance member function, instance member accessor, or instance member variable initializer where this references a derived class instance
                    // - In a static member function or static member accessor

                    // topmost container must be something that is directly nested in the class declaration
                    if (container && isClassLike(container.parent)) {
                        if (container.flags & NodeFlags.Static) {
                            return container.kind === SyntaxKind.MethodDeclaration ||
                                container.kind === SyntaxKind.MethodSignature ||
                                container.kind === SyntaxKind.GetAccessor ||
                                container.kind === SyntaxKind.SetAccessor;
                        }
                        else {
                            return container.kind === SyntaxKind.MethodDeclaration ||
                                container.kind === SyntaxKind.MethodSignature ||
                                container.kind === SyntaxKind.GetAccessor ||
                                container.kind === SyntaxKind.SetAccessor ||
                                container.kind === SyntaxKind.PropertyDeclaration ||
                                container.kind === SyntaxKind.PropertySignature ||
                                container.kind === SyntaxKind.Constructor;
                        }
                    }
                }

                return false;
            }
        }

        // Return contextual type of parameter or undefined if no contextual type is available
        function getContextuallyTypedParameterType(parameter: ParameterDeclaration): Type {
            const func = parameter.parent;
            if (isFunctionExpressionOrArrowFunction(func) || isObjectLiteralMethod(func)) {
                if (isContextSensitive(func)) {
                    const contextualSignature = getContextualSignature(func);
                    if (contextualSignature) {

                        const funcHasRestParameters = hasRestParameter(func);
                        const len = func.parameters.length - (funcHasRestParameters ? 1 : 0);
                        const indexOfParameter = indexOf(func.parameters, parameter);
                        if (indexOfParameter < len) {
                            return getTypeAtPosition(contextualSignature, indexOfParameter);
                        }

                        // If last parameter is contextually rest parameter get its type
                        if (funcHasRestParameters &&
                            indexOfParameter === (func.parameters.length - 1) &&
                            isRestParameterIndex(contextualSignature, func.parameters.length - 1)) {
                            return getTypeOfSymbol(lastOrUndefined(contextualSignature.parameters));
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
            const declaration = <VariableLikeDeclaration>node.parent;
            if (node === declaration.initializer) {
                if (declaration.type) {
                    return getTypeFromTypeNode(declaration.type);
                }
                if (declaration.kind === SyntaxKind.Parameter) {
                    const type = getContextuallyTypedParameterType(<ParameterDeclaration>declaration);
                    if (type) {
                        return type;
                    }
                }
                if (isBindingPattern(declaration.name)) {
                    return getTypeFromBindingPattern(<BindingPattern>declaration.name, /*includePatternInType*/ true);
                }
            }
            return undefined;
        }

        function getContextualTypeForReturnExpression(node: Expression): Type {
            const func = getContainingFunction(node);
            if (func && !func.asteriskToken) {
                return getContextualReturnType(func);
            }

            return undefined;
        }

        function getContextualTypeForYieldOperand(node: YieldExpression): Type {
            const func = getContainingFunction(node);
            if (func) {
                const contextualReturnType = getContextualReturnType(func);
                if (contextualReturnType) {
                    return node.asteriskToken
                        ? contextualReturnType
                        : getElementTypeOfIterableIterator(contextualReturnType);
                }
            }

            return undefined;
        }

        function isInParameterInitializerBeforeContainingFunction(node: Node) {
            while (node.parent && !isFunctionLike(node.parent)) {
                if (node.parent.kind === SyntaxKind.Parameter && (<ParameterDeclaration>node.parent).initializer === node) {
                    return true;
                }

                node = node.parent;
            }

            return false;
        }

        function getContextualReturnType(functionDecl: FunctionLikeDeclaration): Type {
            // If the containing function has a return type annotation, is a constructor, or is a get accessor whose
            // corresponding set accessor has a type annotation, return statements in the function are contextually typed
            if (functionDecl.type ||
                functionDecl.kind === SyntaxKind.Constructor ||
                functionDecl.kind === SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(<AccessorDeclaration>getDeclarationOfKind(functionDecl.symbol, SyntaxKind.SetAccessor))) {
                return getReturnTypeOfSignature(getSignatureFromDeclaration(functionDecl));
            }

            // Otherwise, if the containing function is contextually typed by a function type with exactly one call signature
            // and that call signature is non-generic, return statements are contextually typed by the return type of the signature
            const signature = getContextualSignatureForFunctionLikeDeclaration(<FunctionExpression>functionDecl);
            if (signature) {
                return getReturnTypeOfSignature(signature);
            }

            return undefined;
        }

        // In a typed function call, an argument or substitution expression is contextually typed by the type of the corresponding parameter.
        function getContextualTypeForArgument(callTarget: CallLikeExpression, arg: Expression): Type {
            const args = getEffectiveCallArguments(callTarget);
            const argIndex = indexOf(args, arg);
            if (argIndex >= 0) {
                const signature = getResolvedSignature(callTarget);
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
            const binaryExpression = <BinaryExpression>node.parent;
            const operator = binaryExpression.operatorToken.kind;
            if (operator >= SyntaxKind.FirstAssignment && operator <= SyntaxKind.LastAssignment) {
                // In an assignment expression, the right operand is contextually typed by the type of the left operand.
                if (node === binaryExpression.right) {
                    return checkExpression(binaryExpression.left);
                }
            }
            else if (operator === SyntaxKind.BarBarToken) {
                // When an || expression has a contextual type, the operands are contextually typed by that type. When an ||
                // expression has no contextual type, the right operand is contextually typed by the type of the left operand.
                let type = getContextualType(binaryExpression);
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
            const types = (<UnionType>type).types;
            let mappedType: Type;
            let mappedTypes: Type[];
            for (const current of types) {
                const t = mapper(current);
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
                const prop = t.flags & TypeFlags.StructuredType ? getPropertyOfType(t, name) : undefined;
                return prop ? getTypeOfSymbol(prop) : undefined;
            });
        }

        function getIndexTypeOfContextualType(type: Type, kind: IndexKind) {
            return applyToContextualType(type, t => getIndexTypeOfStructuredType(t, kind));
        }

        function contextualTypeIsStringLiteralType(type: Type): boolean {
            return !!(type.flags & TypeFlags.Union ? forEach((<UnionType>type).types, isStringLiteralType) : isStringLiteralType(type));
        }

        // Return true if the given contextual type is a tuple-like type
        function contextualTypeIsTupleLikeType(type: Type): boolean {
            return !!(type.flags & TypeFlags.Union ? forEach((<UnionType>type).types, isTupleLikeType) : isTupleLikeType(type));
        }

        // Return true if the given contextual type provides an index signature of the given kind
        function contextualTypeHasIndexSignature(type: Type, kind: IndexKind): boolean {
            return !!(type.flags & TypeFlags.Union ? forEach((<UnionType>type).types, t => getIndexTypeOfStructuredType(t, kind)) : getIndexTypeOfStructuredType(type, kind));
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
            const objectLiteral = <ObjectLiteralExpression>element.parent;
            const type = getApparentTypeOfContextualType(objectLiteral);
            if (type) {
                if (!hasDynamicName(element)) {
                    // For a (non-symbol) computed property, there is no reason to look up the name
                    // in the type. It will just be "__computed", which does not appear in any
                    // SymbolTable.
                    const symbolName = getSymbolOfNode(element).name;
                    const propertyType = getTypeOfPropertyOfContextualType(type, symbolName);
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
        // the type of the property with the numeric name N in T, if one exists. Otherwise, if T has a numeric index signature,
        // it is the type of the numeric index signature in T. Otherwise, in ES6 and higher, the contextual type is the iterated
        // type of T.
        function getContextualTypeForElementExpression(node: Expression): Type {
            const arrayLiteral = <ArrayLiteralExpression>node.parent;
            const type = getApparentTypeOfContextualType(arrayLiteral);
            if (type) {
                const index = indexOf(arrayLiteral.elements, node);
                return getTypeOfPropertyOfContextualType(type, "" + index)
                    || getIndexTypeOfContextualType(type, IndexKind.Number)
                    || (languageVersion >= ScriptTarget.ES6 ? getElementTypeOfIterable(type, /*errorNode*/ undefined) : undefined);
            }
            return undefined;
        }

        // In a contextually typed conditional expression, the true/false expressions are contextually typed by the same type.
        function getContextualTypeForConditionalOperand(node: Expression): Type {
            const conditional = <ConditionalExpression>node.parent;
            return node === conditional.whenTrue || node === conditional.whenFalse ? getContextualType(conditional) : undefined;
        }

        function getContextualTypeForJsxExpression(expr: JsxExpression | JsxSpreadAttribute): Type {
            // Contextual type only applies to JSX expressions that are in attribute assignments (not in 'Children' positions)
            if (expr.parent.kind === SyntaxKind.JsxAttribute) {
                const attrib = <JsxAttribute>expr.parent;
                const attrsType = getJsxElementAttributesType(<JsxOpeningLikeElement>attrib.parent);
                if (!attrsType || isTypeAny(attrsType)) {
                    return undefined;
                }
                else {
                    return getTypeOfPropertyOfType(attrsType, attrib.name.text);
                }
            }

            if (expr.kind === SyntaxKind.JsxSpreadAttribute) {
                return getJsxElementAttributesType(<JsxOpeningLikeElement>expr.parent);
            }

            return undefined;
        }

        // Return the contextual type for a given expression node. During overload resolution, a contextual type may temporarily
        // be "pushed" onto a node using the contextualType property.
        function getApparentTypeOfContextualType(node: Expression): Type {
            const type = getContextualType(node);
            return type && getApparentType(type);
        }

        /**
         * Woah! Do you really want to use this function?
         *
         * Unless you're trying to get the *non-apparent* type for a
         * value-literal type or you're authoring relevant portions of this algorithm,
         * you probably meant to use 'getApparentTypeOfContextualType'.
         * Otherwise this may not be very useful.
         *
         * In cases where you *are* working on this function, you should understand
         * when it is appropriate to use 'getContextualType' and 'getApparentTypeOfContetxualType'.
         *
         *   - Use 'getContextualType' when you are simply going to propagate the result to the expression.
         *   - Use 'getApparentTypeOfContextualType' when you're going to need the members of the type.
         *
         * @param node the expression whose contextual type will be returned.
         * @returns the contextual type of an expression.
         */
        function getContextualType(node: Expression): Type {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            if (node.contextualType) {
                return node.contextualType;
            }
            const parent = node.parent;
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
                case SyntaxKind.YieldExpression:
                    return getContextualTypeForYieldOperand(<YieldExpression>parent);
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    return getContextualTypeForArgument(<CallExpression>parent, node);
                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.AsExpression:
                    return getTypeFromTypeNode((<AssertionExpression>parent).type);
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
                case SyntaxKind.JsxExpression:
                case SyntaxKind.JsxSpreadAttribute:
                    return getContextualTypeForJsxExpression(<JsxExpression>parent);
            }
            return undefined;
        }

        // If the given type is an object or union type, if that type has a single signature, and if
        // that signature is non-generic, return the signature. Otherwise return undefined.
        function getNonGenericSignature(type: Type): Signature {
            const signatures = getSignaturesOfStructuredType(type, SignatureKind.Call);
            if (signatures.length === 1) {
                const signature = signatures[0];
                if (!signature.typeParameters) {
                    return signature;
                }
            }
        }

        function isFunctionExpressionOrArrowFunction(node: Node): node is FunctionExpression {
            return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.ArrowFunction;
        }

        function getContextualSignatureForFunctionLikeDeclaration(node: FunctionLikeDeclaration): Signature {
            // Only function expressions, arrow functions, and object literal methods are contextually typed.
            return isFunctionExpressionOrArrowFunction(node) || isObjectLiteralMethod(node)
                ? getContextualSignature(<FunctionExpression>node)
                : undefined;
        }

        // Return the contextual signature for a given expression node. A contextual type provides a
        // contextual signature if it has a single call signature and if that call signature is non-generic.
        // If the contextual type is a union type, get the signature from each type possible and if they are
        // all identical ignoring their return type, the result is same signature but with return type as
        // union type of return types from these signatures
        function getContextualSignature(node: FunctionExpression | MethodDeclaration): Signature {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));
            const type = isObjectLiteralMethod(node)
                ? getContextualTypeForObjectLiteralMethod(node)
                : getApparentTypeOfContextualType(node);
            if (!type) {
                return undefined;
            }
            if (!(type.flags & TypeFlags.Union)) {
                return getNonGenericSignature(type);
            }
            let signatureList: Signature[];
            const types = (<UnionType>type).types;
            for (const current of types) {
                const signature = getNonGenericSignature(current);
                if (signature) {
                    if (!signatureList) {
                        // This signature will contribute to contextual union signature
                        signatureList = [signature];
                    }
                    else if (!compareSignatures(signatureList[0], signature, /*partialMatch*/ false, /*ignoreReturnTypes*/ true, compareTypes)) {
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
            let result: Signature;
            if (signatureList) {
                result = cloneSignature(signatureList[0]);
                // Clear resolved return type we possibly got from cloneSignature
                result.resolvedReturnType = undefined;
                result.unionSignatures = signatureList;
            }
            return result;
        }

        /**
         * Detect if the mapper implies an inference context. Specifically, there are 4 possible values
         * for a mapper. Let's go through each one of them:
         *
         *    1. undefined - this means we are not doing inferential typing, but we may do contextual typing,
         *       which could cause us to assign a parameter a type
         *    2. identityMapper - means we want to avoid assigning a parameter a type, whether or not we are in
         *       inferential typing (context is undefined for the identityMapper)
         *    3. a mapper created by createInferenceMapper - we are doing inferential typing, we want to assign
         *       types to parameters and fix type parameters (context is defined)
         *    4. an instantiation mapper created by createTypeMapper or createTypeEraser - this should never be
         *       passed as the contextual mapper when checking an expression (context is undefined for these)
         *
         * isInferentialContext is detecting if we are in case 3
         */
        function isInferentialContext(mapper: TypeMapper) {
            return mapper && mapper.context;
        }

        // A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
        // assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
        // an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ p: a}] = xxx'.
        function isAssignmentTarget(node: Node): boolean {
            const parent = node.parent;
            if (parent.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>parent).operatorToken.kind === SyntaxKind.EqualsToken && (<BinaryExpression>parent).left === node) {
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
            // It is usually not safe to call checkExpressionCached if we can be contextually typing.
            // You can tell that we are contextually typing because of the contextualMapper parameter.
            // While it is true that a spread element can have a contextual type, it does not do anything
            // with this type. It is neither affected by it, nor does it propagate it to its operand.
            // So the fact that contextualMapper is passed is not important, because the operand of a spread
            // element is not contextually typed.
            const arrayOrIterableType = checkExpressionCached(node.expression, contextualMapper);
            return checkIteratedTypeOrElementType(arrayOrIterableType, node.expression, /*allowStringInput*/ false);
        }

        function hasDefaultValue(node: BindingElement | Expression): boolean {
            return (node.kind === SyntaxKind.BindingElement && !!(<BindingElement>node).initializer) ||
                (node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.EqualsToken);
        }

        function checkArrayLiteral(node: ArrayLiteralExpression, contextualMapper?: TypeMapper): Type {
            const elements = node.elements;
            let hasSpreadElement = false;
            const elementTypes: Type[] = [];
            const inDestructuringPattern = isAssignmentTarget(node);
            for (const e of elements) {
                if (inDestructuringPattern && e.kind === SyntaxKind.SpreadElementExpression) {
                    // Given the following situation:
                    //    var c: {};
                    //    [...c] = ["", 0];
                    //
                    // c is represented in the tree as a spread element in an array literal.
                    // But c really functions as a rest element, and its purpose is to provide
                    // a contextual type for the right hand side of the assignment. Therefore,
                    // instead of calling checkExpression on "...c", which will give an error
                    // if c is not iterable/array-like, we need to act as if we are trying to
                    // get the contextual element type from it. So we do something similar to
                    // getContextualTypeForElementExpression, which will crucially not error
                    // if there is no index type / iterated type.
                    const restArrayType = checkExpression((<SpreadElementExpression>e).expression, contextualMapper);
                    const restElementType = getIndexTypeOfType(restArrayType, IndexKind.Number) ||
                        (languageVersion >= ScriptTarget.ES6 ? getElementTypeOfIterable(restArrayType, /*errorNode*/ undefined) : undefined);
                    if (restElementType) {
                        elementTypes.push(restElementType);
                    }
                }
                else {
                    const type = checkExpression(e, contextualMapper);
                    elementTypes.push(type);
                }
                hasSpreadElement = hasSpreadElement || e.kind === SyntaxKind.SpreadElementExpression;
            }
            if (!hasSpreadElement) {
                // If array literal is actually a destructuring pattern, mark it as an implied type. We do this such
                // that we get the same behavior for "var [x, y] = []" and "[x, y] = []".
                if (inDestructuringPattern && elementTypes.length) {
                    const type = createNewTupleType(elementTypes);
                    type.pattern = node;
                    return type;
                }
                const contextualType = getApparentTypeOfContextualType(node);
                if (contextualType && contextualTypeIsTupleLikeType(contextualType)) {
                    const pattern = contextualType.pattern;
                    // If array literal is contextually typed by a binding pattern or an assignment pattern, pad the resulting
                    // tuple type with the corresponding binding or assignment element types to make the lengths equal.
                    if (pattern && (pattern.kind === SyntaxKind.ArrayBindingPattern || pattern.kind === SyntaxKind.ArrayLiteralExpression)) {
                        const patternElements = (<BindingPattern | ArrayLiteralExpression>pattern).elements;
                        for (let i = elementTypes.length; i < patternElements.length; i++) {
                            const patternElement = patternElements[i];
                            if (hasDefaultValue(patternElement)) {
                                elementTypes.push((<TupleType>contextualType).elementTypes[i]);
                            }
                            else {
                                if (patternElement.kind !== SyntaxKind.OmittedExpression) {
                                    error(patternElement, Diagnostics.Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value);
                                }
                                elementTypes.push(unknownType);
                            }
                        }
                    }
                    if (elementTypes.length) {
                        return createTupleType(elementTypes);
                    }
                }
            }
            return createArrayType(elementTypes.length ? getUnionType(elementTypes) : undefinedType);
        }

        function isNumericName(name: DeclarationName): boolean {
            return name.kind === SyntaxKind.ComputedPropertyName ? isNumericComputedName(<ComputedPropertyName>name) : isNumericLiteralName((<Identifier>name).text);
        }

        function isNumericComputedName(name: ComputedPropertyName): boolean {
            // It seems odd to consider an expression of type Any to result in a numeric name,
            // but this behavior is consistent with checkIndexedAccess
            return isTypeAnyOrAllConstituentTypesHaveKind(checkComputedPropertyName(name), TypeFlags.NumberLike);
        }

        function isTypeAnyOrAllConstituentTypesHaveKind(type: Type, kind: TypeFlags): boolean {
            return isTypeAny(type) || allConstituentTypesHaveKind(type, kind);
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
            const links = getNodeLinks(node.expression);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node.expression);

                // This will allow types number, string, symbol or any. It will also allow enums, the unknown
                // type, and any union of these types (like string | number).
                if (!isTypeAnyOrAllConstituentTypesHaveKind(links.resolvedType, TypeFlags.NumberLike | TypeFlags.StringLike | TypeFlags.ESSymbol)) {
                    error(node, Diagnostics.A_computed_property_name_must_be_of_type_string_number_symbol_or_any);
                }
                else {
                    checkThatExpressionIsProperSymbolReference(node.expression, links.resolvedType, /*reportError*/ true);
                }
            }

            return links.resolvedType;
        }

        function checkObjectLiteral(node: ObjectLiteralExpression, contextualMapper?: TypeMapper): Type {
            const inDestructuringPattern = isAssignmentTarget(node);
            // Grammar checking
            checkGrammarObjectLiteralExpression(node, inDestructuringPattern);

            const propertiesTable: SymbolTable = {};
            const propertiesArray: Symbol[] = [];
            const contextualType = getApparentTypeOfContextualType(node);
            const contextualTypeHasPattern = contextualType && contextualType.pattern &&
                (contextualType.pattern.kind === SyntaxKind.ObjectBindingPattern || contextualType.pattern.kind === SyntaxKind.ObjectLiteralExpression);
            let typeFlags: TypeFlags = 0;

            let patternWithComputedProperties = false;
            for (const memberDecl of node.properties) {
                let member = memberDecl.symbol;
                if (memberDecl.kind === SyntaxKind.PropertyAssignment ||
                    memberDecl.kind === SyntaxKind.ShorthandPropertyAssignment ||
                    isObjectLiteralMethod(memberDecl)) {
                    let type: Type;
                    if (memberDecl.kind === SyntaxKind.PropertyAssignment) {
                        type = checkPropertyAssignment(<PropertyAssignment>memberDecl, contextualMapper);
                    }
                    else if (memberDecl.kind === SyntaxKind.MethodDeclaration) {
                        type = checkObjectLiteralMethod(<MethodDeclaration>memberDecl, contextualMapper);
                    }
                    else {
                        Debug.assert(memberDecl.kind === SyntaxKind.ShorthandPropertyAssignment);
                        type = checkExpression((<ShorthandPropertyAssignment>memberDecl).name, contextualMapper);
                    }
                    typeFlags |= type.flags;
                    const prop = <TransientSymbol>createSymbol(SymbolFlags.Property | SymbolFlags.Transient | member.flags, member.name);
                    if (inDestructuringPattern) {
                        // If object literal is an assignment pattern and if the assignment pattern specifies a default value
                        // for the property, make the property optional.
                        const isOptional =
                            (memberDecl.kind === SyntaxKind.PropertyAssignment && hasDefaultValue((<PropertyAssignment>memberDecl).initializer)) ||
                            (memberDecl.kind === SyntaxKind.ShorthandPropertyAssignment && (<ShorthandPropertyAssignment>memberDecl).objectAssignmentInitializer);
                        if (isOptional) {
                            prop.flags |= SymbolFlags.Optional;
                        }
                        if (hasDynamicName(memberDecl)) {
                            patternWithComputedProperties = true;
                        }
                    }
                    else if (contextualTypeHasPattern && !(contextualType.flags & TypeFlags.ObjectLiteralPatternWithComputedProperties)) {
                        // If object literal is contextually typed by the implied type of a binding pattern, and if the
                        // binding pattern specifies a default value for the property, make the property optional.
                        const impliedProp = getPropertyOfType(contextualType, member.name);
                        if (impliedProp) {
                            prop.flags |= impliedProp.flags & SymbolFlags.Optional;
                        }
                        else if (!compilerOptions.suppressExcessPropertyErrors) {
                            error(memberDecl.name, Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1,
                                symbolToString(member), typeToString(contextualType));
                        }
                    }
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

            // If object literal is contextually typed by the implied type of a binding pattern, augment the result
            // type with those properties for which the binding pattern specifies a default value.
            if (contextualTypeHasPattern) {
                for (const prop of getPropertiesOfType(contextualType)) {
                    if (!hasProperty(propertiesTable, prop.name)) {
                        if (!(prop.flags & SymbolFlags.Optional)) {
                            error(prop.valueDeclaration || (<TransientSymbol>prop).bindingElement,
                                Diagnostics.Initializer_provides_no_value_for_this_binding_element_and_the_binding_element_has_no_default_value);
                        }
                        propertiesTable[prop.name] = prop;
                        propertiesArray.push(prop);
                    }
                }
            }

            const stringIndexType = getIndexType(IndexKind.String);
            const numberIndexType = getIndexType(IndexKind.Number);
            const result = createAnonymousType(node.symbol, propertiesTable, emptyArray, emptyArray, stringIndexType, numberIndexType);
            const freshObjectLiteralFlag = compilerOptions.suppressExcessPropertyErrors ? 0 : TypeFlags.FreshObjectLiteral;
            result.flags |= TypeFlags.ObjectLiteral | TypeFlags.ContainsObjectLiteral | freshObjectLiteralFlag | (typeFlags & TypeFlags.PropagatingFlags) | (patternWithComputedProperties ? TypeFlags.ObjectLiteralPatternWithComputedProperties : 0);
            if (inDestructuringPattern) {
                result.pattern = node;
            }
            return result;

            function getIndexType(kind: IndexKind) {
                if (contextualType && contextualTypeHasIndexSignature(contextualType, kind)) {
                    const propTypes: Type[] = [];
                    for (let i = 0; i < propertiesArray.length; i++) {
                        const propertyDecl = node.properties[i];
                        if (kind === IndexKind.String || isNumericName(propertyDecl.name)) {
                            // Do not call getSymbolOfNode(propertyDecl), as that will get the
                            // original symbol for the node. We actually want to get the symbol
                            // created by checkObjectLiteral, since that will be appropriately
                            // contextually typed and resolved.
                            const type = getTypeOfSymbol(propertiesArray[i]);
                            if (!contains(propTypes, type)) {
                                propTypes.push(type);
                            }
                        }
                    }
                    const result = propTypes.length ? getUnionType(propTypes) : undefinedType;
                    typeFlags |= result.flags;
                    return result;
                }
                return undefined;
            }
        }

        function checkJsxSelfClosingElement(node: JsxSelfClosingElement) {
            checkJsxOpeningLikeElement(node);
            return jsxElementType || anyType;
        }

        function tagNamesAreEquivalent(lhs: EntityName, rhs: EntityName): boolean {
            if (lhs.kind !== rhs.kind) {
                return false;
            }

            if (lhs.kind === SyntaxKind.Identifier) {
                return (<Identifier>lhs).text === (<Identifier>rhs).text;
            }

            return (<QualifiedName>lhs).right.text === (<QualifiedName>rhs).right.text &&
                tagNamesAreEquivalent((<QualifiedName>lhs).left, (<QualifiedName>rhs).left);
        }

        function checkJsxElement(node: JsxElement) {
            // Check attributes
            checkJsxOpeningLikeElement(node.openingElement);

            // Check that the closing tag matches
            if (!tagNamesAreEquivalent(node.openingElement.tagName, node.closingElement.tagName)) {
                error(node.closingElement, Diagnostics.Expected_corresponding_JSX_closing_tag_for_0, getTextOfNode(node.openingElement.tagName));
            }
            else {
                // Perform resolution on the closing tag so that rename/go to definition/etc work
                getJsxElementTagSymbol(node.closingElement);
            }

            // Check children
            for (const child of node.children) {
                switch (child.kind) {
                    case SyntaxKind.JsxExpression:
                        checkJsxExpression(<JsxExpression>child);
                        break;
                    case SyntaxKind.JsxElement:
                        checkJsxElement(<JsxElement>child);
                        break;
                    case SyntaxKind.JsxSelfClosingElement:
                        checkJsxSelfClosingElement(<JsxSelfClosingElement>child);
                        break;
                }
            }

            return jsxElementType || anyType;
        }

        /**
         * Returns true iff the JSX element name would be a valid JS identifier, ignoring restrictions about keywords not being identifiers
         */
        function isUnhyphenatedJsxName(name: string) {
            // - is the only character supported in JSX attribute names that isn't valid in JavaScript identifiers
            return name.indexOf("-") < 0;
        }

        /**
         * Returns true iff React would emit this tag name as a string rather than an identifier or qualified name
         */
        function isJsxIntrinsicIdentifier(tagName: Identifier | QualifiedName) {
            if (tagName.kind === SyntaxKind.QualifiedName) {
                return false;
            }
            else {
                return isIntrinsicJsxName((<Identifier>tagName).text);
            }
        }

        function checkJsxAttribute(node: JsxAttribute, elementAttributesType: Type, nameTable: Map<boolean>) {
            let correspondingPropType: Type = undefined;

            // Look up the corresponding property for this attribute
            if (elementAttributesType === emptyObjectType && isUnhyphenatedJsxName(node.name.text)) {
                // If there is no 'props' property, you may not have non-"data-" attributes
                error(node.parent, Diagnostics.JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property, getJsxElementPropertiesName());
            }
            else if (elementAttributesType && !isTypeAny(elementAttributesType)) {
                const correspondingPropSymbol = getPropertyOfType(elementAttributesType, node.name.text);
                correspondingPropType = correspondingPropSymbol && getTypeOfSymbol(correspondingPropSymbol);
                if (isUnhyphenatedJsxName(node.name.text)) {
                    // Maybe there's a string indexer?
                    const indexerType = getIndexTypeOfType(elementAttributesType, IndexKind.String);
                    if (indexerType) {
                        correspondingPropType = indexerType;
                    }
                    else {
                        // If there's no corresponding property with this name, error
                        if (!correspondingPropType) {
                            error(node.name, Diagnostics.Property_0_does_not_exist_on_type_1, node.name.text, typeToString(elementAttributesType));
                            return unknownType;
                        }
                    }
                }
            }

            let exprType: Type;
            if (node.initializer) {
                exprType = checkExpression(node.initializer);
            }
            else {
                // <Elem attr /> is sugar for <Elem attr={true} />
                exprType = booleanType;
            }

            if (correspondingPropType) {
                checkTypeAssignableTo(exprType, correspondingPropType, node);
            }

            nameTable[node.name.text] = true;
            return exprType;
        }

        function checkJsxSpreadAttribute(node: JsxSpreadAttribute, elementAttributesType: Type, nameTable: Map<boolean>) {
            const type = checkExpression(node.expression);
            const props = getPropertiesOfType(type);
            for (const prop of props) {
                // Is there a corresponding property in the element attributes type? Skip checking of properties
                // that have already been assigned to, as these are not actually pushed into the resulting type
                if (!nameTable[prop.name]) {
                    const targetPropSym = getPropertyOfType(elementAttributesType, prop.name);
                    if (targetPropSym) {
                        const msg = chainDiagnosticMessages(undefined, Diagnostics.Property_0_of_JSX_spread_attribute_is_not_assignable_to_target_property, prop.name);
                        checkTypeAssignableTo(getTypeOfSymbol(prop), getTypeOfSymbol(targetPropSym), node, undefined, msg);
                    }

                    nameTable[prop.name] = true;
                }
            }
            return type;
        }

        /// Returns the type JSX.IntrinsicElements. May return `unknownType` if that type is not present.
        function getJsxIntrinsicElementsType() {
            if (!jsxIntrinsicElementsType) {
                jsxIntrinsicElementsType = getExportedTypeFromNamespace(JsxNames.JSX, JsxNames.IntrinsicElements) || unknownType;
            }
            return jsxIntrinsicElementsType;
        }

        /// Given a JSX opening element or self-closing element, return the symbol of the property that the tag name points to if
        /// this is an intrinsic tag. This might be a named
        /// property of the IntrinsicElements interface, or its string indexer.
        /// If this is a class-based tag (otherwise returns undefined), returns the symbol of the class
        /// type or factory function.
        /// Otherwise, returns unknownSymbol.
        function getJsxElementTagSymbol(node: JsxOpeningLikeElement | JsxClosingElement): Symbol {
            const flags: JsxFlags = JsxFlags.UnknownElement;
            const links = getNodeLinks(node);
            if (!links.resolvedSymbol) {
                if (isJsxIntrinsicIdentifier(node.tagName)) {
                    links.resolvedSymbol = lookupIntrinsicTag(node);
                }
                else {
                    links.resolvedSymbol = lookupClassTag(node);
                }
            }
            return links.resolvedSymbol;

            function lookupIntrinsicTag(node: JsxOpeningLikeElement | JsxClosingElement): Symbol {
                const intrinsicElementsType = getJsxIntrinsicElementsType();
                if (intrinsicElementsType !== unknownType) {
                    // Property case
                    const intrinsicProp = getPropertyOfType(intrinsicElementsType, (<Identifier>node.tagName).text);
                    if (intrinsicProp) {
                        links.jsxFlags |= JsxFlags.IntrinsicNamedElement;
                        return intrinsicProp;
                    }

                    // Intrinsic string indexer case
                    const indexSignatureType = getIndexTypeOfType(intrinsicElementsType, IndexKind.String);
                    if (indexSignatureType) {
                        links.jsxFlags |= JsxFlags.IntrinsicIndexedElement;
                        return intrinsicElementsType.symbol;
                    }

                    // Wasn't found
                    error(node, Diagnostics.Property_0_does_not_exist_on_type_1, (<Identifier>node.tagName).text, "JSX." + JsxNames.IntrinsicElements);
                    return unknownSymbol;
                }
                else {
                    if (compilerOptions.noImplicitAny) {
                        error(node, Diagnostics.JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists, JsxNames.IntrinsicElements);
                    }
                }
            }

            function lookupClassTag(node: JsxOpeningLikeElement | JsxClosingElement): Symbol {
                const valueSymbol: Symbol = resolveJsxTagName(node);

                // Look up the value in the current scope
                if (valueSymbol && valueSymbol !== unknownSymbol) {
                    links.jsxFlags |= JsxFlags.ClassElement;
                    if (valueSymbol.flags & SymbolFlags.Alias) {
                        markAliasSymbolAsReferenced(valueSymbol);
                    }
                }

                return valueSymbol || unknownSymbol;
            }

            function resolveJsxTagName(node: JsxOpeningLikeElement | JsxClosingElement): Symbol {
                if (node.tagName.kind === SyntaxKind.Identifier) {
                    const tag = <Identifier>node.tagName;
                    const sym = getResolvedSymbol(tag);
                    return sym.exportSymbol || sym;
                }
                else {
                    return checkQualifiedName(<QualifiedName>node.tagName).symbol;
                }
            }
        }

        /**
         * Given a JSX element that is a class element, finds the Element Instance Type. If the
         * element is not a class element, or the class element type cannot be determined, returns 'undefined'.
         * For example, in the element <MyClass>, the element instance type is `MyClass` (not `typeof MyClass`).
         */
        function getJsxElementInstanceType(node: JsxOpeningLikeElement) {
            // There is no such thing as an instance type for a non-class element. This
            // line shouldn't be hit.
            Debug.assert(!!(getNodeLinks(node).jsxFlags & JsxFlags.ClassElement), "Should not call getJsxElementInstanceType on non-class Element");

            const classSymbol = getJsxElementTagSymbol(node);
            if (classSymbol === unknownSymbol) {
                // Couldn't find the class instance type. Error has already been issued
                return anyType;
            }

            const valueType = getTypeOfSymbol(classSymbol);
            if (isTypeAny(valueType)) {
                // Short-circuit if the class tag is using an element type 'any'
                return anyType;
            }

            // Resolve the signatures, preferring constructors
            let signatures = getSignaturesOfType(valueType, SignatureKind.Construct);
            if (signatures.length === 0) {
                // No construct signatures, try call signatures
                signatures = getSignaturesOfType(valueType, SignatureKind.Call);

                if (signatures.length === 0) {
                    // We found no signatures at all, which is an error
                    error(node.tagName, Diagnostics.JSX_element_type_0_does_not_have_any_construct_or_call_signatures, getTextOfNode(node.tagName));
                    return unknownType;
                }
            }

            const returnType = getUnionType(signatures.map(getReturnTypeOfSignature));

            // Issue an error if this return type isn't assignable to JSX.ElementClass
            const elemClassType = getJsxGlobalElementClassType();
            if (elemClassType) {
                checkTypeRelatedTo(returnType, elemClassType, assignableRelation, node, Diagnostics.JSX_element_type_0_is_not_a_constructor_function_for_JSX_elements);
            }

            return returnType;
        }

        /// e.g. "props" for React.d.ts,
        /// or 'undefined' if ElementAttributesPropery doesn't exist (which means all
        ///     non-intrinsic elements' attributes type is 'any'),
        /// or '' if it has 0 properties (which means every
        ///     non-instrinsic elements' attributes type is the element instance type)
        function getJsxElementPropertiesName() {
            // JSX
            const jsxNamespace = getGlobalSymbol(JsxNames.JSX, SymbolFlags.Namespace, /*diagnosticMessage*/undefined);
            // JSX.ElementAttributesProperty [symbol]
            const attribsPropTypeSym = jsxNamespace && getSymbol(jsxNamespace.exports, JsxNames.ElementAttributesPropertyNameContainer, SymbolFlags.Type);
            // JSX.ElementAttributesProperty [type]
            const attribPropType = attribsPropTypeSym && getDeclaredTypeOfSymbol(attribsPropTypeSym);
            // The properites of JSX.ElementAttributesProperty
            const attribProperties = attribPropType && getPropertiesOfType(attribPropType);

            if (attribProperties) {
                // Element Attributes has zero properties, so the element attributes type will be the class instance type
                if (attribProperties.length === 0) {
                    return "";
                }
                // Element Attributes has one property, so the element attributes type will be the type of the corresponding
                // property of the class instance type
                else if (attribProperties.length === 1) {
                    return attribProperties[0].name;
                }
                // More than one property on ElementAttributesProperty is an error
                else {
                    error(attribsPropTypeSym.declarations[0], Diagnostics.The_global_type_JSX_0_may_not_have_more_than_one_property, JsxNames.ElementAttributesPropertyNameContainer);
                    return undefined;
                }
            }
            else {
                // No interface exists, so the element attributes type will be an implicit any
                return undefined;
            }
        }

        /**
         * Given an opening/self-closing element, get the 'element attributes type', i.e. the type that tells
         * us which attributes are valid on a given element.
         */
        function getJsxElementAttributesType(node: JsxOpeningLikeElement): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedJsxType) {
                const sym = getJsxElementTagSymbol(node);

                if (links.jsxFlags & JsxFlags.ClassElement) {
                    const elemInstanceType = getJsxElementInstanceType(node);

                    if (isTypeAny(elemInstanceType)) {
                        return links.resolvedJsxType = elemInstanceType;
                    }

                    const propsName = getJsxElementPropertiesName();
                    if (propsName === undefined) {
                        // There is no type ElementAttributesProperty, return 'any'
                        return links.resolvedJsxType = anyType;
                    }
                    else if (propsName === "") {
                        // If there is no e.g. 'props' member in ElementAttributesProperty, use the element class type instead
                        return links.resolvedJsxType = elemInstanceType;
                    }
                    else {
                        const attributesType = getTypeOfPropertyOfType(elemInstanceType, propsName);

                        if (!attributesType) {
                            // There is no property named 'props' on this instance type
                            return links.resolvedJsxType = emptyObjectType;
                        }
                        else if (isTypeAny(attributesType) || (attributesType === unknownType)) {
                            return links.resolvedJsxType = attributesType;
                        }
                        else if (!(attributesType.flags & TypeFlags.ObjectType)) {
                            error(node.tagName, Diagnostics.JSX_element_attributes_type_0_must_be_an_object_type, typeToString(attributesType));
                            return links.resolvedJsxType = anyType;
                        }
                        else {
                            return links.resolvedJsxType = attributesType;
                        }
                    }
                }
                else if (links.jsxFlags & JsxFlags.IntrinsicNamedElement) {
                    return links.resolvedJsxType = getTypeOfSymbol(sym);
                }
                else if (links.jsxFlags & JsxFlags.IntrinsicIndexedElement) {
                    return links.resolvedJsxType = getIndexTypeOfSymbol(sym, IndexKind.String);
                }
                else {
                    // Resolution failed, so we don't know
                    return links.resolvedJsxType = anyType;
                }
            }

            return links.resolvedJsxType;
        }

        /**
         * Given a JSX attribute, returns the symbol for the corresponds property
         * of the element attributes type. Will return unknownSymbol for attributes
         * that have no matching element attributes type property.
         */
        function getJsxAttributePropertySymbol(attrib: JsxAttribute): Symbol {
            const attributesType = getJsxElementAttributesType(<JsxOpeningElement>attrib.parent);
            const prop = getPropertyOfType(attributesType, attrib.name.text);
            return prop || unknownSymbol;
        }

        function getJsxGlobalElementClassType(): Type {
            if (!jsxElementClassType) {
                jsxElementClassType = getExportedTypeFromNamespace(JsxNames.JSX, JsxNames.ElementClass);
            }
            return jsxElementClassType;
        }

        /// Returns all the properties of the Jsx.IntrinsicElements interface
        function getJsxIntrinsicTagNames(): Symbol[] {
            const intrinsics = getJsxIntrinsicElementsType();
            return intrinsics ? getPropertiesOfType(intrinsics) : emptyArray;
        }

        function checkJsxPreconditions(errorNode: Node) {
            // Preconditions for using JSX
            if ((compilerOptions.jsx || JsxEmit.None) === JsxEmit.None) {
                error(errorNode, Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided);
            }

            if (jsxElementType === undefined) {
                if (compilerOptions.noImplicitAny) {
                    error(errorNode, Diagnostics.JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist);
                }
            }
        }

        function checkJsxOpeningLikeElement(node: JsxOpeningLikeElement) {
            checkGrammarJsxElement(node);
            checkJsxPreconditions(node);

            // If we're compiling under --jsx react, the symbol 'React' should
            // be marked as 'used' so we don't incorrectly elide its import. And if there
            // is no 'React' symbol in scope, we should issue an error.
            if (compilerOptions.jsx === JsxEmit.React) {
                const reactSym = resolveName(node.tagName, "React", SymbolFlags.Value, Diagnostics.Cannot_find_name_0, "React");
                if (reactSym) {
                    getSymbolLinks(reactSym).referenced = true;
                }
            }

            const targetAttributesType = getJsxElementAttributesType(node);

            const nameTable: Map<boolean> = {};
            // Process this array in right-to-left order so we know which
            // attributes (mostly from spreads) are being overwritten and
            // thus should have their types ignored
            let sawSpreadedAny = false;
            for (let i = node.attributes.length - 1; i >= 0; i--) {
                if (node.attributes[i].kind === SyntaxKind.JsxAttribute) {
                    checkJsxAttribute(<JsxAttribute>(node.attributes[i]), targetAttributesType, nameTable);
                }
                else {
                    Debug.assert(node.attributes[i].kind === SyntaxKind.JsxSpreadAttribute);
                    const spreadType = checkJsxSpreadAttribute(<JsxSpreadAttribute>(node.attributes[i]), targetAttributesType, nameTable);
                    if (isTypeAny(spreadType)) {
                        sawSpreadedAny = true;
                    }
                }
            }

            // Check that all required properties have been provided. If an 'any'
            // was spreaded in, though, assume that it provided all required properties
            if (targetAttributesType && !sawSpreadedAny) {
                const targetProperties = getPropertiesOfType(targetAttributesType);
                for (let i = 0; i < targetProperties.length; i++) {
                    if (!(targetProperties[i].flags & SymbolFlags.Optional) &&
                        nameTable[targetProperties[i].name] === undefined) {

                        error(node, Diagnostics.Property_0_is_missing_in_type_1, targetProperties[i].name, typeToString(targetAttributesType));
                    }
                }
            }
        }

        function checkJsxExpression(node: JsxExpression) {
            if (node.expression) {
                return checkExpression(node.expression);
            }
            else {
                return unknownType;
            }
        }

        // If a symbol is a synthesized symbol with no value declaration, we assume it is a property. Example of this are the synthesized
        // '.prototype' property as well as synthesized tuple index properties.
        function getDeclarationKindFromSymbol(s: Symbol) {
            return s.valueDeclaration ? s.valueDeclaration.kind : SyntaxKind.PropertyDeclaration;
        }

        function getDeclarationFlagsFromSymbol(s: Symbol): NodeFlags {
            return s.valueDeclaration ? getCombinedNodeFlags(s.valueDeclaration) : s.flags & SymbolFlags.Prototype ? NodeFlags.Public | NodeFlags.Static : 0;
        }

        /**
         * Check whether the requested property access is valid.
         * Returns true if node is a valid property access, and false otherwise.
         * @param node The node to be checked.
         * @param left The left hand side of the property access (e.g.: the super in `super.foo`).
         * @param type The type of left.
         * @param prop The symbol for the right hand side of the property access.
         */
        function checkClassPropertyAccess(node: PropertyAccessExpression | QualifiedName, left: Expression | QualifiedName, type: Type, prop: Symbol): boolean {
            const flags = getDeclarationFlagsFromSymbol(prop);
            const declaringClass = <InterfaceType>getDeclaredTypeOfSymbol(prop.parent);

            if (left.kind === SyntaxKind.SuperKeyword) {
                const errorNode = node.kind === SyntaxKind.PropertyAccessExpression ?
                    (<PropertyAccessExpression>node).name :
                    (<QualifiedName>node).right;

                // TS 1.0 spec (April 2014): 4.8.2
                // - In a constructor, instance member function, instance member accessor, or
                //   instance member variable initializer where this references a derived class instance,
                //   a super property access is permitted and must specify a public instance member function of the base class.
                // - In a static member function or static member accessor
                //   where this references the constructor function object of a derived class,
                //   a super property access is permitted and must specify a public static member function of the base class.
                if (getDeclarationKindFromSymbol(prop) !== SyntaxKind.MethodDeclaration) {
                    // `prop` refers to a *property* declared in the super class
                    // rather than a *method*, so it does not satisfy the above criteria.

                    error(errorNode, Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                    return false;
                }

                if (flags & NodeFlags.Abstract) {
                    // A method cannot be accessed in a super property access if the method is abstract.
                    // This error could mask a private property access error. But, a member
                    // cannot simultaneously be private and abstract, so this will trigger an
                    // additional error elsewhere.

                    error(errorNode, Diagnostics.Abstract_method_0_in_class_1_cannot_be_accessed_via_super_expression, symbolToString(prop), typeToString(declaringClass));
                    return false;
                }
            }

            // Public properties are otherwise accessible.
            if (!(flags & (NodeFlags.Private | NodeFlags.Protected))) {
                return true;
            }

            // Property is known to be private or protected at this point
            // Get the declaring and enclosing class instance types
            const enclosingClassDeclaration = getContainingClass(node);

            const enclosingClass = enclosingClassDeclaration ? <InterfaceType>getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClassDeclaration)) : undefined;

            // Private property is accessible if declaring and enclosing class are the same
            if (flags & NodeFlags.Private) {
                if (declaringClass !== enclosingClass) {
                    error(node, Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(declaringClass));
                    return false;
                }
                return true;
            }

            // Property is known to be protected at this point

            // All protected properties of a supertype are accessible in a super access
            if (left.kind === SyntaxKind.SuperKeyword) {
                return true;
            }
            // A protected property is accessible in the declaring class and classes derived from it
            if (!enclosingClass || !hasBaseType(enclosingClass, declaringClass)) {
                error(node, Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(declaringClass));
                return false;
            }
            // No further restrictions for static properties
            if (flags & NodeFlags.Static) {
                return true;
            }
            // An instance property must be accessed through an instance of the enclosing class
            if (type.flags & TypeFlags.ThisType) {
                // get the original type -- represented as the type constraint of the 'this' type
                type = getConstraintOfTypeParameter(<TypeParameter>type);
            }

            // TODO: why is the first part of this check here?
            if (!(getTargetType(type).flags & (TypeFlags.Class | TypeFlags.Interface) && hasBaseType(<InterfaceType>type, enclosingClass))) {
                error(node, Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1, symbolToString(prop), typeToString(enclosingClass));
                return false;
            }
            return true;
        }

        function checkPropertyAccessExpression(node: PropertyAccessExpression) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.expression, node.name);
        }

        function checkQualifiedName(node: QualifiedName) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.left, node.right);
        }

        function checkPropertyAccessExpressionOrQualifiedName(node: PropertyAccessExpression | QualifiedName, left: Expression | QualifiedName, right: Identifier) {
            const type = checkExpression(left);
            if (isTypeAny(type)) {
                return type;
            }

            const apparentType = getApparentType(getWidenedType(type));
            if (apparentType === unknownType) {
                // handle cases when type is Type parameter with invalid constraint
                return unknownType;
            }
            const prop = getPropertyOfType(apparentType, right.text);
            if (!prop) {
                if (right.text) {
                    error(right, Diagnostics.Property_0_does_not_exist_on_type_1, declarationNameToString(right), typeToString(type.flags & TypeFlags.ThisType ? apparentType : type));
                }
                return unknownType;
            }

            getNodeLinks(node).resolvedSymbol = prop;

            if (prop.parent && prop.parent.flags & SymbolFlags.Class) {
                checkClassPropertyAccess(node, left, apparentType, prop);
            }
            return getTypeOfSymbol(prop);
        }

        function isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName, propertyName: string): boolean {
            const left = node.kind === SyntaxKind.PropertyAccessExpression
                ? (<PropertyAccessExpression>node).expression
                : (<QualifiedName>node).left;

            const type = checkExpression(left);
            if (type !== unknownType && !isTypeAny(type)) {
                const prop = getPropertyOfType(getWidenedType(type), propertyName);
                if (prop && prop.parent && prop.parent.flags & SymbolFlags.Class) {
                    return checkClassPropertyAccess(node, left, type, prop);
                }
            }
            return true;
        }

        function checkIndexedAccess(node: ElementAccessExpression): Type {
            // Grammar checking
            if (!node.argumentExpression) {
                const sourceFile = getSourceFile(node);
                if (node.parent.kind === SyntaxKind.NewExpression && (<NewExpression>node.parent).expression === node) {
                    const start = skipTrivia(sourceFile.text, node.expression.end);
                    const end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                }
                else {
                    const start = node.end - "]".length;
                    const end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Expression_expected);
                }
            }

            // Obtain base constraint such that we can bail out if the constraint is an unknown type
            const objectType = getApparentType(checkExpression(node.expression));
            const indexType = node.argumentExpression ? checkExpression(node.argumentExpression) : unknownType;

            if (objectType === unknownType) {
                return unknownType;
            }

            const isConstEnum = isConstEnumObjectType(objectType);
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
                const name = getPropertyNameForIndexedAccess(node.argumentExpression, indexType);
                if (name !== undefined) {
                    const prop = getPropertyOfType(objectType, name);
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
            if (isTypeAnyOrAllConstituentTypesHaveKind(indexType, TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbol)) {

                // Try to use a number indexer.
                if (isTypeAnyOrAllConstituentTypesHaveKind(indexType, TypeFlags.NumberLike)) {
                    const numberIndexType = getIndexTypeOfType(objectType, IndexKind.Number);
                    if (numberIndexType) {
                        return numberIndexType;
                    }
                }

                // Try to use string indexing.
                const stringIndexType = getIndexTypeOfType(objectType, IndexKind.String);
                if (stringIndexType) {
                    return stringIndexType;
                }

                // Fall back to any.
                if (compilerOptions.noImplicitAny && !compilerOptions.suppressImplicitAnyIndexErrors && !isTypeAny(objectType)) {
                    error(node, Diagnostics.Index_signature_of_object_type_implicitly_has_an_any_type);
                }

                return anyType;
            }

            // REVIEW: Users should know the type that was actually used.
            error(node, Diagnostics.An_index_expression_argument_must_be_of_type_string_number_symbol_or_any);

            return unknownType;
        }

        /**
         * If indexArgumentExpression is a string literal or number literal, returns its text.
         * If indexArgumentExpression is a constant value, returns its string value.
         * If indexArgumentExpression is a well known symbol, returns the property name corresponding
         *    to this symbol, as long as it is a proper symbol reference.
         * Otherwise, returns undefined.
         */
        function getPropertyNameForIndexedAccess(indexArgumentExpression: Expression, indexArgumentType: Type): string {
            if (indexArgumentExpression.kind === SyntaxKind.StringLiteral || indexArgumentExpression.kind === SyntaxKind.NumericLiteral) {
                return (<LiteralExpression>indexArgumentExpression).text;
            }
            if (indexArgumentExpression.kind === SyntaxKind.ElementAccessExpression || indexArgumentExpression.kind === SyntaxKind.PropertyAccessExpression) {
                const value = getConstantValue(<ElementAccessExpression | PropertyAccessExpression>indexArgumentExpression);
                if (value !== undefined) {
                    return value.toString();
                }
            }
            if (checkThatExpressionIsProperSymbolReference(indexArgumentExpression, indexArgumentType, /*reportError*/ false)) {
                const rightHandSideName = (<Identifier>(<PropertyAccessExpression>indexArgumentExpression).name).text;
                return getPropertyNameForKnownSymbolName(rightHandSideName);
            }

            return undefined;
        }

        /**
         * A proper symbol reference requires the following:
         *   1. The property access denotes a property that exists
         *   2. The expression is of the form Symbol.<identifier>
         *   3. The property access is of the primitive type symbol.
         *   4. Symbol in this context resolves to the global Symbol object
         */
        function checkThatExpressionIsProperSymbolReference(expression: Expression, expressionType: Type, reportError: boolean): boolean {
            if (expressionType === unknownType) {
                // There is already an error, so no need to report one.
                return false;
            }

            if (!isWellKnownSymbolSyntactically(expression)) {
                return false;
            }

            // Make sure the property type is the primitive symbol type
            if ((expressionType.flags & TypeFlags.ESSymbol) === 0) {
                if (reportError) {
                    error(expression, Diagnostics.A_computed_property_name_of_the_form_0_must_be_of_type_symbol, getTextOfNode(expression));
                }
                return false;
            }

            // The name is Symbol.<someName>, so make sure Symbol actually resolves to the
            // global Symbol object
            const leftHandSide = <Identifier>(<PropertyAccessExpression>expression).expression;
            const leftHandSideSymbol = getResolvedSymbol(leftHandSide);
            if (!leftHandSideSymbol) {
                return false;
            }

            const globalESSymbol = getGlobalESSymbolConstructorSymbol();
            if (!globalESSymbol) {
                // Already errored when we tried to look up the symbol
                return false;
            }

            if (leftHandSideSymbol !== globalESSymbol) {
                if (reportError) {
                    error(leftHandSide, Diagnostics.Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object);
                }
                return false;
            }

            return true;
        }

        function resolveUntypedCall(node: CallLikeExpression): Signature {
            if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                checkExpression((<TaggedTemplateExpression>node).template);
            }
            else if (node.kind !== SyntaxKind.Decorator) {
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

        // Re-order candidate signatures into the result array. Assumes the result array to be empty.
        // The candidate list orders groups in reverse, but within a group signatures are kept in declaration order
        // A nit here is that we reorder only signatures that belong to the same symbol,
        // so order how inherited signatures are processed is still preserved.
        // interface A { (x: string): void }
        // interface B extends A { (x: 'foo'): string }
        // const b: B;
        // b('foo') // <- here overloads should be processed as [(x:'foo'): string, (x: string): void]
        function reorderCandidates(signatures: Signature[], result: Signature[]): void {
            let lastParent: Node;
            let lastSymbol: Symbol;
            let cutoffIndex = 0;
            let index: number;
            let specializedIndex = -1;
            let spliceIndex: number;
            Debug.assert(!result.length);
            for (const signature of signatures) {
                const symbol = signature.declaration && getSymbolOfNode(signature.declaration);
                const parent = signature.declaration && signature.declaration.parent;
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

        function getSpreadArgumentIndex(args: Expression[]): number {
            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                if (arg && arg.kind === SyntaxKind.SpreadElementExpression) {
                    return i;
                }
            }
            return -1;
        }

        function hasCorrectArity(node: CallLikeExpression, args: Expression[], signature: Signature) {
            let adjustedArgCount: number;            // Apparent number of arguments we will have in this call
            let typeArguments: NodeArray<TypeNode>;  // Type arguments (undefined if none)
            let callIsIncomplete: boolean;           // In incomplete call we want to be lenient when we have too few arguments
            let isDecorator: boolean;
            let spreadArgIndex = -1;

            if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                const tagExpression = <TaggedTemplateExpression>node;

                // Even if the call is incomplete, we'll have a missing expression as our last argument,
                // so we can say the count is just the arg list length
                adjustedArgCount = args.length;
                typeArguments = undefined;

                if (tagExpression.template.kind === SyntaxKind.TemplateExpression) {
                    // If a tagged template expression lacks a tail literal, the call is incomplete.
                    // Specifically, a template only can end in a TemplateTail or a Missing literal.
                    const templateExpression = <TemplateExpression>tagExpression.template;
                    const lastSpan = lastOrUndefined(templateExpression.templateSpans);
                    Debug.assert(lastSpan !== undefined); // we should always have at least one span.
                    callIsIncomplete = nodeIsMissing(lastSpan.literal) || !!lastSpan.literal.isUnterminated;
                }
                else {
                    // If the template didn't end in a backtick, or its beginning occurred right prior to EOF,
                    // then this might actually turn out to be a TemplateHead in the future;
                    // so we consider the call to be incomplete.
                    const templateLiteral = <LiteralExpression>tagExpression.template;
                    Debug.assert(templateLiteral.kind === SyntaxKind.NoSubstitutionTemplateLiteral);
                    callIsIncomplete = !!templateLiteral.isUnterminated;
                }
            }
            else if (node.kind === SyntaxKind.Decorator) {
                isDecorator = true;
                typeArguments = undefined;
                adjustedArgCount = getEffectiveArgumentCount(node, /*args*/ undefined, signature);
            }
            else {
                const callExpression = <CallExpression>node;
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
                spreadArgIndex = getSpreadArgumentIndex(args);
            }

            // If the user supplied type arguments, but the number of type arguments does not match
            // the declared number of type parameters, the call has an incorrect arity.
            const hasRightNumberOfTypeArgs = !typeArguments ||
                (signature.typeParameters && typeArguments.length === signature.typeParameters.length);
            if (!hasRightNumberOfTypeArgs) {
                return false;
            }

            // If spread arguments are present, check that they correspond to a rest parameter. If so, no
            // further checking is necessary.
            if (spreadArgIndex >= 0) {
                return isRestParameterIndex(signature, spreadArgIndex);
            }

            // Too many arguments implies incorrect arity.
            if (!signature.hasRestParameter && adjustedArgCount > signature.parameters.length) {
                return false;
            }

            // If the call is incomplete, we should skip the lower bound check.
            const hasEnoughArguments = adjustedArgCount >= signature.minArgumentCount;
            return callIsIncomplete || hasEnoughArguments;
        }

        // If type has a single call signature and no other members, return that signature. Otherwise, return undefined.
        function getSingleCallSignature(type: Type): Signature {
            if (type.flags & TypeFlags.ObjectType) {
                const resolved = resolveStructuredTypeMembers(<ObjectType>type);
                if (resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0 &&
                    resolved.properties.length === 0 && !resolved.stringIndexType && !resolved.numberIndexType) {
                    return resolved.callSignatures[0];
                }
            }
            return undefined;
        }

        // Instantiate a generic signature in the context of a non-generic signature (section 3.8.5 in TypeScript spec)
        function instantiateSignatureInContextOf(signature: Signature, contextualSignature: Signature, contextualMapper: TypeMapper): Signature {
            const context = createInferenceContext(signature.typeParameters, /*inferUnionTypes*/ true);
            forEachMatchingParameterType(contextualSignature, signature, (source, target) => {
                // Type parameters from outer context referenced by source type are fixed by instantiation of the source type
                inferTypes(context, instantiateType(source, contextualMapper), target);
            });
            return getSignatureInstantiation(signature, getInferredTypes(context));
        }

        function inferTypeArguments(node: CallLikeExpression, signature: Signature, args: Expression[], excludeArgument: boolean[], context: InferenceContext): void {
            const typeParameters = signature.typeParameters;
            const inferenceMapper = createInferenceMapper(context);

            // Clear out all the inference results from the last time inferTypeArguments was called on this context
            for (let i = 0; i < typeParameters.length; i++) {
                // As an optimization, we don't have to clear (and later recompute) inferred types
                // for type parameters that have already been fixed on the previous call to inferTypeArguments.
                // It would be just as correct to reset all of them. But then we'd be repeating the same work
                // for the type parameters that were fixed, namely the work done by getInferredType.
                if (!context.inferences[i].isFixed) {
                    context.inferredTypes[i] = undefined;
                }
            }

            // On this call to inferTypeArguments, we may get more inferences for certain type parameters that were not
            // fixed last time. This means that a type parameter that failed inference last time may succeed this time,
            // or vice versa. Therefore, the failedTypeParameterIndex is useless if it points to an unfixed type parameter,
            // because it may change. So here we reset it. However, getInferredType will not revisit any type parameters
            // that were previously fixed. So if a fixed type parameter failed previously, it will fail again because
            // it will contain the exact same set of inferences. So if we reset the index from a fixed type parameter,
            // we will lose information that we won't recover this time around.
            if (context.failedTypeParameterIndex !== undefined && !context.inferences[context.failedTypeParameterIndex].isFixed) {
                context.failedTypeParameterIndex = undefined;
            }

            // We perform two passes over the arguments. In the first pass we infer from all arguments, but use
            // wildcards for all context sensitive function expressions.
            const argCount = getEffectiveArgumentCount(node, args, signature);
            for (let i = 0; i < argCount; i++) {
                const arg = getEffectiveArgument(node, args, i);
                // If the effective argument is 'undefined', then it is an argument that is present but is synthetic.
                if (arg === undefined || arg.kind !== SyntaxKind.OmittedExpression) {
                    const paramType = getTypeAtPosition(signature, i);
                    let argType = getEffectiveArgumentType(node, i, arg);

                    // If the effective argument type is 'undefined', there is no synthetic type
                    // for the argument. In that case, we should check the argument.
                    if (argType === undefined) {
                        // For context sensitive arguments we pass the identityMapper, which is a signal to treat all
                        // context sensitive function expressions as wildcards
                        const mapper = excludeArgument && excludeArgument[i] !== undefined ? identityMapper : inferenceMapper;
                        argType = checkExpressionWithContextualType(arg, paramType, mapper);
                    }

                    inferTypes(context, argType, paramType);
                }
            }

            // In the second pass we visit only context sensitive arguments, and only those that aren't excluded, this
            // time treating function expressions normally (which may cause previously inferred type arguments to be fixed
            // as we construct types for contextually typed parameters)
            // Decorators will not have `excludeArgument`, as their arguments cannot be contextually typed.
            // Tagged template expressions will always have `undefined` for `excludeArgument[0]`.
            if (excludeArgument) {
                for (let i = 0; i < argCount; i++) {
                    // No need to check for omitted args and template expressions, their exlusion value is always undefined
                    if (excludeArgument[i] === false) {
                        const arg = args[i];
                        const paramType = getTypeAtPosition(signature, i);
                        inferTypes(context, checkExpressionWithContextualType(arg, paramType, inferenceMapper), paramType);
                    }
                }
            }

            getInferredTypes(context);
        }

        function checkTypeArguments(signature: Signature, typeArguments: TypeNode[], typeArgumentResultTypes: Type[], reportErrors: boolean, headMessage?: DiagnosticMessage): boolean {
            const typeParameters = signature.typeParameters;
            let typeArgumentsAreAssignable = true;
            for (let i = 0; i < typeParameters.length; i++) {
                const typeArgNode = typeArguments[i];
                const typeArgument = getTypeFromTypeNode(typeArgNode);
                // Do not push on this array! It has a preallocated length
                typeArgumentResultTypes[i] = typeArgument;
                if (typeArgumentsAreAssignable /* so far */) {
                    const constraint = getConstraintOfTypeParameter(typeParameters[i]);
                    if (constraint) {
                        let errorInfo: DiagnosticMessageChain;
                        let typeArgumentHeadMessage = Diagnostics.Type_0_does_not_satisfy_the_constraint_1;
                        if (reportErrors && headMessage) {
                            errorInfo = chainDiagnosticMessages(errorInfo, typeArgumentHeadMessage);
                            typeArgumentHeadMessage = headMessage;
                        }

                        typeArgumentsAreAssignable = checkTypeAssignableTo(
                            typeArgument,
                            constraint,
                            reportErrors ? typeArgNode : undefined,
                            typeArgumentHeadMessage,
                            errorInfo);
                    }
                }
            }

            return typeArgumentsAreAssignable;
        }

        function checkApplicableSignature(node: CallLikeExpression, args: Expression[], signature: Signature, relation: Map<RelationComparisonResult>, excludeArgument: boolean[], reportErrors: boolean) {
            const argCount = getEffectiveArgumentCount(node, args, signature);
            for (let i = 0; i < argCount; i++) {
                const arg = getEffectiveArgument(node, args, i);
                // If the effective argument is 'undefined', then it is an argument that is present but is synthetic.
                if (arg === undefined || arg.kind !== SyntaxKind.OmittedExpression) {
                    // Check spread elements against rest type (from arity check we know spread argument corresponds to a rest parameter)
                    const paramType = getTypeAtPosition(signature, i);
                    let argType = getEffectiveArgumentType(node, i, arg);

                    // If the effective argument type is 'undefined', there is no synthetic type
                    // for the argument. In that case, we should check the argument.
                    if (argType === undefined) {
                        argType = arg.kind === SyntaxKind.StringLiteral && !reportErrors
                            ? getStringLiteralType(<StringLiteral>arg)
                            : checkExpressionWithContextualType(arg, paramType, excludeArgument && excludeArgument[i] ? identityMapper : undefined);
                    }

                    // Use argument expression as error location when reporting errors
                    const errorNode = reportErrors ? getEffectiveArgumentErrorNode(node, i, arg) : undefined;
                    const headMessage = Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1;
                    if (!checkTypeRelatedTo(argType, paramType, relation, errorNode, headMessage)) {
                        return false;
                    }
                }
            }

            return true;
        }

        /**
         * Returns the effective arguments for an expression that works like a function invocation.
         *
         * If 'node' is a CallExpression or a NewExpression, then its argument list is returned.
         * If 'node' is a TaggedTemplateExpression, a new argument list is constructed from the substitution
         *    expressions, where the first element of the list is `undefined`.
         * If 'node' is a Decorator, the argument list will be `undefined`, and its arguments and types
         *    will be supplied from calls to `getEffectiveArgumentCount` and `getEffectiveArgumentType`.
         */
        function getEffectiveCallArguments(node: CallLikeExpression): Expression[] {
            let args: Expression[];
            if (node.kind === SyntaxKind.TaggedTemplateExpression) {
                const template = (<TaggedTemplateExpression>node).template;
                args = [undefined];
                if (template.kind === SyntaxKind.TemplateExpression) {
                    forEach((<TemplateExpression>template).templateSpans, span => {
                        args.push(span.expression);
                    });
                }
            }
            else if (node.kind === SyntaxKind.Decorator) {
                // For a decorator, we return undefined as we will determine
                // the number and types of arguments for a decorator using
                // `getEffectiveArgumentCount` and `getEffectiveArgumentType` below.
                return undefined;
            }
            else {
                args = (<CallExpression>node).arguments || emptyArray;
            }

            return args;
        }


        /**
          * Returns the effective argument count for a node that works like a function invocation.
          * If 'node' is a Decorator, the number of arguments is derived from the decoration
          *    target and the signature:
          *    If 'node.target' is a class declaration or class expression, the effective argument
          *       count is 1.
          *    If 'node.target' is a parameter declaration, the effective argument count is 3.
          *    If 'node.target' is a property declaration, the effective argument count is 2.
          *    If 'node.target' is a method or accessor declaration, the effective argument count
          *       is 3, although it can be 2 if the signature only accepts two arguments, allowing
          *       us to match a property decorator.
          * Otherwise, the argument count is the length of the 'args' array.
          */
        function getEffectiveArgumentCount(node: CallLikeExpression, args: Expression[], signature: Signature) {
            if (node.kind === SyntaxKind.Decorator) {
                switch (node.parent.kind) {
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                        // A class decorator will have one argument (see `ClassDecorator` in core.d.ts)
                        return 1;

                    case SyntaxKind.PropertyDeclaration:
                        // A property declaration decorator will have two arguments (see
                        // `PropertyDecorator` in core.d.ts)
                        return 2;

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        // A method or accessor declaration decorator will have two or three arguments (see
                        // `PropertyDecorator` and `MethodDecorator` in core.d.ts)

                        // If we are emitting decorators for ES3, we will only pass two arguments.
                        if (languageVersion === ScriptTarget.ES3) {
                            return 2;
                        }

                        // If the method decorator signature only accepts a target and a key, we will only
                        // type check those arguments.
                        return signature.parameters.length >= 3 ? 3 : 2;

                    case SyntaxKind.Parameter:
                        // A parameter declaration decorator will have three arguments (see
                        // `ParameterDecorator` in core.d.ts)

                        return 3;
                }
            }
            else {
                return args.length;
            }
        }

        /**
          * Returns the effective type of the first argument to a decorator.
          * If 'node' is a class declaration or class expression, the effective argument type
          *    is the type of the static side of the class.
          * If 'node' is a parameter declaration, the effective argument type is either the type
          *    of the static or instance side of the class for the parameter's parent method,
          *    depending on whether the method is declared static.
          *    For a constructor, the type is always the type of the static side of the class.
          * If 'node' is a property, method, or accessor declaration, the effective argument
          *    type is the type of the static or instance side of the parent class for class
          *    element, depending on whether the element is declared static.
          */
        function getEffectiveDecoratorFirstArgumentType(node: Node): Type {
            // The first argument to a decorator is its `target`.
            if (node.kind === SyntaxKind.ClassDeclaration) {
                // For a class decorator, the `target` is the type of the class (e.g. the
                // "static" or "constructor" side of the class)
                const classSymbol = getSymbolOfNode(node);
                return getTypeOfSymbol(classSymbol);
            }

            if (node.kind === SyntaxKind.Parameter) {
                // For a parameter decorator, the `target` is the parent type of the
                // parameter's containing method.
                node = node.parent;
                if (node.kind === SyntaxKind.Constructor) {
                    const classSymbol = getSymbolOfNode(node);
                    return getTypeOfSymbol(classSymbol);
                }
            }

            if (node.kind === SyntaxKind.PropertyDeclaration ||
                node.kind === SyntaxKind.MethodDeclaration ||
                node.kind === SyntaxKind.GetAccessor ||
                node.kind === SyntaxKind.SetAccessor) {
                // For a property or method decorator, the `target` is the
                // "static"-side type of the parent of the member if the member is
                // declared "static"; otherwise, it is the "instance"-side type of the
                // parent of the member.
                return getParentTypeOfClassElement(<ClassElement>node);
            }

            Debug.fail("Unsupported decorator target.");
            return unknownType;
        }

        /**
          * Returns the effective type for the second argument to a decorator.
          * If 'node' is a parameter, its effective argument type is one of the following:
          *    If 'node.parent' is a constructor, the effective argument type is 'any', as we
          *       will emit `undefined`.
          *    If 'node.parent' is a member with an identifier, numeric, or string literal name,
          *       the effective argument type will be a string literal type for the member name.
          *    If 'node.parent' is a computed property name, the effective argument type will
          *       either be a symbol type or the string type.
          * If 'node' is a member with an identifier, numeric, or string literal name, the
          *    effective argument type will be a string literal type for the member name.
          * If 'node' is a computed property name, the effective argument type will either
          *    be a symbol type or the string type.
          * A class decorator does not have a second argument type.
          */
        function getEffectiveDecoratorSecondArgumentType(node: Node) {
            // The second argument to a decorator is its `propertyKey`
            if (node.kind === SyntaxKind.ClassDeclaration) {
                Debug.fail("Class decorators should not have a second synthetic argument.");
                return unknownType;
            }

            if (node.kind === SyntaxKind.Parameter) {
                node = node.parent;
                if (node.kind === SyntaxKind.Constructor) {
                    // For a constructor parameter decorator, the `propertyKey` will be `undefined`.
                    return anyType;
                }

                // For a non-constructor parameter decorator, the `propertyKey` will be either
                // a string or a symbol, based on the name of the parameter's containing method.
            }

            if (node.kind === SyntaxKind.PropertyDeclaration ||
                node.kind === SyntaxKind.MethodDeclaration ||
                node.kind === SyntaxKind.GetAccessor ||
                node.kind === SyntaxKind.SetAccessor) {
                // The `propertyKey` for a property or method decorator will be a
                // string literal type if the member name is an identifier, number, or string;
                // otherwise, if the member name is a computed property name it will
                // be either string or symbol.
                const element = <ClassElement>node;
                switch (element.name.kind) {
                    case SyntaxKind.Identifier:
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                        return getStringLiteralType(<StringLiteral>element.name);

                    case SyntaxKind.ComputedPropertyName:
                        const nameType = checkComputedPropertyName(<ComputedPropertyName>element.name);
                        if (allConstituentTypesHaveKind(nameType, TypeFlags.ESSymbol)) {
                            return nameType;
                        }
                        else {
                            return stringType;
                        }

                    default:
                        Debug.fail("Unsupported property name.");
                        return unknownType;
                }
            }

            Debug.fail("Unsupported decorator target.");
            return unknownType;
        }

        /**
          * Returns the effective argument type for the third argument to a decorator.
          * If 'node' is a parameter, the effective argument type is the number type.
          * If 'node' is a method or accessor, the effective argument type is a
          *    `TypedPropertyDescriptor<T>` instantiated with the type of the member.
          * Class and property decorators do not have a third effective argument.
          */
        function getEffectiveDecoratorThirdArgumentType(node: Node) {
            // The third argument to a decorator is either its `descriptor` for a method decorator
            // or its `parameterIndex` for a paramter decorator
            if (node.kind === SyntaxKind.ClassDeclaration) {
                Debug.fail("Class decorators should not have a third synthetic argument.");
                return unknownType;
            }

            if (node.kind === SyntaxKind.Parameter) {
                // The `parameterIndex` for a parameter decorator is always a number
                return numberType;
            }

            if (node.kind === SyntaxKind.PropertyDeclaration) {
                Debug.fail("Property decorators should not have a third synthetic argument.");
                return unknownType;
            }

            if (node.kind === SyntaxKind.MethodDeclaration ||
                node.kind === SyntaxKind.GetAccessor ||
                node.kind === SyntaxKind.SetAccessor) {
                // The `descriptor` for a method decorator will be a `TypedPropertyDescriptor<T>`
                // for the type of the member.
                const propertyType = getTypeOfNode(node);
                return createTypedPropertyDescriptorType(propertyType);
            }

            Debug.fail("Unsupported decorator target.");
            return unknownType;
        }

        /**
          * Returns the effective argument type for the provided argument to a decorator.
          */
        function getEffectiveDecoratorArgumentType(node: Decorator, argIndex: number): Type {
            if (argIndex === 0) {
                return getEffectiveDecoratorFirstArgumentType(node.parent);
            }
            else if (argIndex === 1) {
                return getEffectiveDecoratorSecondArgumentType(node.parent);
            }
            else if (argIndex === 2) {
                return getEffectiveDecoratorThirdArgumentType(node.parent);
            }

            Debug.fail("Decorators should not have a fourth synthetic argument.");
            return unknownType;
        }

        /**
          * Gets the effective argument type for an argument in a call expression.
          */
        function getEffectiveArgumentType(node: CallLikeExpression, argIndex: number, arg: Expression): Type {
            // Decorators provide special arguments, a tagged template expression provides
            // a special first argument, and string literals get string literal types
            // unless we're reporting errors
            if (node.kind === SyntaxKind.Decorator) {
                return getEffectiveDecoratorArgumentType(<Decorator>node, argIndex);
            }
            else if (argIndex === 0 && node.kind === SyntaxKind.TaggedTemplateExpression) {
                return globalTemplateStringsArrayType;
            }

            // This is not a synthetic argument, so we return 'undefined'
            // to signal that the caller needs to check the argument.
            return undefined;
        }

        /**
          * Gets the effective argument expression for an argument in a call expression.
          */
        function getEffectiveArgument(node: CallLikeExpression, args: Expression[], argIndex: number) {
            // For a decorator or the first argument of a tagged template expression we return undefined.
            if (node.kind === SyntaxKind.Decorator ||
                (argIndex === 0 && node.kind === SyntaxKind.TaggedTemplateExpression)) {
                return undefined;
            }

            return args[argIndex];
        }

        /**
          * Gets the error node to use when reporting errors for an effective argument.
          */
        function getEffectiveArgumentErrorNode(node: CallLikeExpression, argIndex: number, arg: Expression) {
            if (node.kind === SyntaxKind.Decorator) {
                // For a decorator, we use the expression of the decorator for error reporting.
                return (<Decorator>node).expression;
            }
            else if (argIndex === 0 && node.kind === SyntaxKind.TaggedTemplateExpression) {
                // For a the first argument of a tagged template expression, we use the template of the tag for error reporting.
                return (<TaggedTemplateExpression>node).template;
            }
            else {
                return arg;
            }
        }

        function resolveCall(node: CallLikeExpression, signatures: Signature[], candidatesOutArray: Signature[], headMessage?: DiagnosticMessage): Signature {
            const isTaggedTemplate = node.kind === SyntaxKind.TaggedTemplateExpression;
            const isDecorator = node.kind === SyntaxKind.Decorator;

            let typeArguments: TypeNode[];

            if (!isTaggedTemplate && !isDecorator) {
                typeArguments = (<CallExpression>node).typeArguments;

                // We already perform checking on the type arguments on the class declaration itself.
                if ((<CallExpression>node).expression.kind !== SyntaxKind.SuperKeyword) {
                    forEach(typeArguments, checkSourceElement);
                }
            }

            const candidates = candidatesOutArray || [];
            // reorderCandidates fills up the candidates array directly
            reorderCandidates(signatures, candidates);
            if (!candidates.length) {
                reportError(Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
                return resolveErrorCall(node);
            }

            const args = getEffectiveCallArguments(node);

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
            //
            // For a decorator, no arguments are susceptible to contextual typing due to the fact
            // decorators are applied to a declaration by the emitter, and not to an expression.
            let excludeArgument: boolean[];
            if (!isDecorator) {
                // We do not need to call `getEffectiveArgumentCount` here as it only
                // applies when calculating the number of arguments for a decorator.
                for (let i = isTaggedTemplate ? 1 : 0; i < args.length; i++) {
                    if (isContextSensitive(args[i])) {
                        if (!excludeArgument) {
                            excludeArgument = new Array(args.length);
                        }
                        excludeArgument[i] = true;
                    }
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
            let candidateForArgumentError: Signature;
            let candidateForTypeArgumentError: Signature;
            let resultOfFailedInference: InferenceContext;
            let result: Signature;

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
                if (!isTaggedTemplate && !isDecorator && typeArguments) {
                    checkTypeArguments(candidateForTypeArgumentError, (<CallExpression>node).typeArguments, [], /*reportErrors*/ true, headMessage);
                }
                else {
                    Debug.assert(resultOfFailedInference.failedTypeParameterIndex >= 0);
                    const failedTypeParameter = candidateForTypeArgumentError.typeParameters[resultOfFailedInference.failedTypeParameterIndex];
                    const inferenceCandidates = getInferenceCandidates(resultOfFailedInference, resultOfFailedInference.failedTypeParameterIndex);

                    let diagnosticChainHead = chainDiagnosticMessages(/*details*/ undefined, // details will be provided by call to reportNoCommonSupertypeError
                        Diagnostics.The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly,
                        typeToString(failedTypeParameter));

                    if (headMessage) {
                        diagnosticChainHead = chainDiagnosticMessages(diagnosticChainHead, headMessage);
                    }

                    reportNoCommonSupertypeError(inferenceCandidates, (<CallExpression>node).expression || (<TaggedTemplateExpression>node).tag, diagnosticChainHead);
                }
            }
            else {
                reportError(Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
            }

            // No signature was applicable. We have already reported the errors for the invalid signature.
            // If this is a type resolution session, e.g. Language Service, try to get better information that anySignature.
            // Pick the first candidate that matches the arity. This way we can get a contextual type for cases like:
            //  declare function f(a: { xa: number; xb: number; });
            //  f({ |
            if (!produceDiagnostics) {
                for (let candidate of candidates) {
                    if (hasCorrectArity(node, args, candidate)) {
                        if (candidate.typeParameters && typeArguments) {
                            candidate = getSignatureInstantiation(candidate, map(typeArguments, getTypeFromTypeNode));
                        }
                        return candidate;
                    }
                }
            }

            return resolveErrorCall(node);

            function reportError(message: DiagnosticMessage, arg0?: string, arg1?: string, arg2?: string): void {
                let errorInfo: DiagnosticMessageChain;
                errorInfo = chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2);
                if (headMessage) {
                    errorInfo = chainDiagnosticMessages(errorInfo, headMessage);
                }

                diagnostics.add(createDiagnosticForNodeFromMessageChain(node, errorInfo));
            }

            function chooseOverload(candidates: Signature[], relation: Map<RelationComparisonResult>) {
                for (const originalCandidate of candidates) {
                    if (!hasCorrectArity(node, args, originalCandidate)) {
                        continue;
                    }

                    let candidate: Signature;
                    let typeArgumentsAreValid: boolean;
                    const inferenceContext = originalCandidate.typeParameters
                        ? createInferenceContext(originalCandidate.typeParameters, /*inferUnionTypes*/ false)
                        : undefined;

                    while (true) {
                        candidate = originalCandidate;
                        if (candidate.typeParameters) {
                            let typeArgumentTypes: Type[];
                            if (typeArguments) {
                                typeArgumentTypes = new Array<Type>(candidate.typeParameters.length);
                                typeArgumentsAreValid = checkTypeArguments(candidate, typeArguments, typeArgumentTypes, /*reportErrors*/ false);
                            }
                            else {
                                inferTypeArguments(node, candidate, args, excludeArgument, inferenceContext);
                                typeArgumentsAreValid = inferenceContext.failedTypeParameterIndex === undefined;
                                typeArgumentTypes = inferenceContext.inferredTypes;
                            }
                            if (!typeArgumentsAreValid) {
                                break;
                            }
                            candidate = getSignatureInstantiation(candidate, typeArgumentTypes);
                        }
                        if (!checkApplicableSignature(node, args, candidate, relation, excludeArgument, /*reportErrors*/ false)) {
                            break;
                        }
                        const index = excludeArgument ? indexOf(excludeArgument, true) : -1;
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
                        const instantiatedCandidate = candidate;
                        if (typeArgumentsAreValid) {
                            candidateForArgumentError = instantiatedCandidate;
                        }
                        else {
                            candidateForTypeArgumentError = originalCandidate;
                            if (!typeArguments) {
                                resultOfFailedInference = inferenceContext;
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

        }

        function resolveCallExpression(node: CallExpression, candidatesOutArray: Signature[]): Signature {
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                const superType = checkSuperExpression(node.expression);
                if (superType !== unknownType) {
                    // In super call, the candidate signatures are the matching arity signatures of the base constructor function instantiated
                    // with the type arguments specified in the extends clause.
                    const baseTypeNode = getClassExtendsHeritageClauseElement(getContainingClass(node));
                    const baseConstructors = getInstantiatedConstructorsForTypeArguments(superType, baseTypeNode.typeArguments);
                    return resolveCall(node, baseConstructors, candidatesOutArray);
                }
                return resolveUntypedCall(node);
            }

            const funcType = checkExpression(node.expression);
            const apparentType = getApparentType(funcType);

            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }

            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including call signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            const callSignatures = getSignaturesOfType(apparentType, SignatureKind.Call);

            const constructSignatures = getSignaturesOfType(apparentType, SignatureKind.Construct);
            // TS 1.0 spec: 4.12
            // If FuncExpr is of type Any, or of an object type that has no call or construct signatures
            // but is a subtype of the Function interface, the call is an untyped function call. In an
            // untyped function call no TypeArgs are permitted, Args can be any argument list, no contextual
            // types are provided for the argument expressions, and the result is always of type Any.
            // We exclude union types because we may have a union of function types that happen to have
            // no common signatures.
            if (isTypeAny(funcType) || (!callSignatures.length && !constructSignatures.length && !(funcType.flags & TypeFlags.Union) && isTypeAssignableTo(funcType, globalFunctionType))) {
                // The unknownType indicates that an error already occured (and was reported).  No
                // need to report another error in this case.
                if (funcType !== unknownType && node.typeArguments) {
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
            if (node.arguments && languageVersion < ScriptTarget.ES5) {
                const spreadIndex = getSpreadArgumentIndex(node.arguments);
                if (spreadIndex >= 0) {
                    error(node.arguments[spreadIndex], Diagnostics.Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher);
                }
            }

            let expressionType = checkExpression(node.expression);

            // If expressionType's apparent type(section 3.8.1) is an object type with one or
            // more construct signatures, the expression is processed in the same manner as a
            // function call, but using the construct signatures as the initial set of candidate
            // signatures for overload resolution. The result type of the function call becomes
            // the result type of the operation.
            expressionType = getApparentType(expressionType);
            if (expressionType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }

            // If the expression is a class of abstract type, then it cannot be instantiated.
            // Note, only class declarations can be declared abstract.
            // In the case of a merged class-module or class-interface declaration,
            // only the class declaration node will have the Abstract flag set.
            const valueDecl = expressionType.symbol && getClassLikeDeclarationOfSymbol(expressionType.symbol);
            if (valueDecl && valueDecl.flags & NodeFlags.Abstract) {
                error(node, Diagnostics.Cannot_create_an_instance_of_the_abstract_class_0, declarationNameToString(valueDecl.name));
                return resolveErrorCall(node);
            }

            // TS 1.0 spec: 4.11
            // If expressionType is of type Any, Args can be any argument
            // list and the result of the operation is of type Any.
            if (isTypeAny(expressionType)) {
                if (node.typeArguments) {
                    error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }

            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including construct signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            const constructSignatures = getSignaturesOfType(expressionType, SignatureKind.Construct);
            if (constructSignatures.length) {
                return resolveCall(node, constructSignatures, candidatesOutArray);
            }

            // If expressionType's apparent type is an object type with no construct signatures but
            // one or more call signatures, the expression is processed as a function call. A compile-time
            // error occurs if the result of the function call is not Void. The type of the result of the
            // operation is Any.
            const callSignatures = getSignaturesOfType(expressionType, SignatureKind.Call);
            if (callSignatures.length) {
                const signature = resolveCall(node, callSignatures, candidatesOutArray);
                if (getReturnTypeOfSignature(signature) !== voidType) {
                    error(node, Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                }
                return signature;
            }

            error(node, Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature);
            return resolveErrorCall(node);
        }

        function resolveTaggedTemplateExpression(node: TaggedTemplateExpression, candidatesOutArray: Signature[]): Signature {
            const tagType = checkExpression(node.tag);
            const apparentType = getApparentType(tagType);

            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }

            const callSignatures = getSignaturesOfType(apparentType, SignatureKind.Call);

            if (isTypeAny(tagType) || (!callSignatures.length && !(tagType.flags & TypeFlags.Union) && isTypeAssignableTo(tagType, globalFunctionType))) {
                return resolveUntypedCall(node);
            }

            if (!callSignatures.length) {
                error(node, Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                return resolveErrorCall(node);
            }

            return resolveCall(node, callSignatures, candidatesOutArray);
        }

        /**
          * Gets the localized diagnostic head message to use for errors when resolving a decorator as a call expression.
          */
        function getDiagnosticHeadMessageForDecoratorResolution(node: Decorator) {
            switch (node.parent.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    return Diagnostics.Unable_to_resolve_signature_of_class_decorator_when_called_as_an_expression;

                case SyntaxKind.Parameter:
                    return Diagnostics.Unable_to_resolve_signature_of_parameter_decorator_when_called_as_an_expression;

                case SyntaxKind.PropertyDeclaration:
                    return Diagnostics.Unable_to_resolve_signature_of_property_decorator_when_called_as_an_expression;

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return Diagnostics.Unable_to_resolve_signature_of_method_decorator_when_called_as_an_expression;
            }
        }

        /**
          * Resolves a decorator as if it were a call expression.
          */
        function resolveDecorator(node: Decorator, candidatesOutArray: Signature[]): Signature {
            const funcType = checkExpression(node.expression);
            const apparentType = getApparentType(funcType);
            if (apparentType === unknownType) {
                return resolveErrorCall(node);
            }

            const callSignatures = getSignaturesOfType(apparentType, SignatureKind.Call);
            if (funcType === anyType || (!callSignatures.length && !(funcType.flags & TypeFlags.Union) && isTypeAssignableTo(funcType, globalFunctionType))) {
                return resolveUntypedCall(node);
            }

            const headMessage = getDiagnosticHeadMessageForDecoratorResolution(node);
            if (!callSignatures.length) {
                let errorInfo: DiagnosticMessageChain;
                errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                errorInfo = chainDiagnosticMessages(errorInfo, headMessage);
                diagnostics.add(createDiagnosticForNodeFromMessageChain(node, errorInfo));
                return resolveErrorCall(node);
            }

            return resolveCall(node, callSignatures, candidatesOutArray, headMessage);
        }

        // candidatesOutArray is passed by signature help in the language service, and collectCandidates
        // must fill it up with the appropriate candidate signatures
        function getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[]): Signature {
            const links = getNodeLinks(node);
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
                else if (node.kind === SyntaxKind.Decorator) {
                    links.resolvedSignature = resolveDecorator(<Decorator>node, candidatesOutArray);
                }
                else {
                    Debug.fail("Branch in 'getResolvedSignature' should be unreachable.");
                }
            }
            return links.resolvedSignature;
        }

        /**
         * Syntactically and semantically checks a call or new expression.
         * @param node The call/new expression to be checked.
         * @returns On success, the expression's signature's return type. On failure, anyType.
         */
        function checkCallExpression(node: CallExpression): Type {
            // Grammar checking; stop grammar-checking if checkGrammarTypeArguments return true
            checkGrammarTypeArguments(node, node.typeArguments) || checkGrammarArguments(node, node.arguments);

            const signature = getResolvedSignature(node);
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                return voidType;
            }
            if (node.kind === SyntaxKind.NewExpression) {
                const declaration = signature.declaration;

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

            // In JavaScript files, calls to any identifier 'require' are treated as external module imports
            if (isInJavaScriptFile(node) && isRequireCall(node)) {
                return resolveExternalModuleTypeByLiteral(<StringLiteral>node.arguments[0]);
            }

            return getReturnTypeOfSignature(signature);
        }

        function checkTaggedTemplateExpression(node: TaggedTemplateExpression): Type {
            return getReturnTypeOfSignature(getResolvedSignature(node));
        }

        function checkAssertion(node: AssertionExpression) {
            const exprType = getRegularTypeOfObjectLiteral(checkExpression(node.expression));
            const targetType = getTypeFromTypeNode(node.type);
            if (produceDiagnostics && targetType !== unknownType) {
                const widenedType = getWidenedType(exprType);

                // Permit 'number[] | "foo"' to be asserted to 'string'.
                const bothAreStringLike =
                    someConstituentTypeHasKind(targetType, TypeFlags.StringLike) &&
                        someConstituentTypeHasKind(widenedType, TypeFlags.StringLike);
                if (!bothAreStringLike && !(isTypeAssignableTo(targetType, widenedType))) {
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
            const len = signature.parameters.length - (signature.hasRestParameter ? 1 : 0);
            for (let i = 0; i < len; i++) {
                const parameter = signature.parameters[i];
                const contextualParameterType = getTypeAtPosition(context, i);
                assignTypeToParameterAndFixTypeParameters(parameter, contextualParameterType, mapper);
            }
            if (signature.hasRestParameter && isRestParameterIndex(context, signature.parameters.length - 1)) {
                const parameter = lastOrUndefined(signature.parameters);
                const contextualParameterType = getTypeOfSymbol(lastOrUndefined(context.parameters));
                assignTypeToParameterAndFixTypeParameters(parameter, contextualParameterType, mapper);
            }
        }

        // When contextual typing assigns a type to a parameter that contains a binding pattern, we also need to push
        // the destructured type into the contained binding elements.
        function assignBindingElementTypes(node: VariableLikeDeclaration) {
            if (isBindingPattern(node.name)) {
                for (const element of (<BindingPattern>node.name).elements) {
                    if (element.kind !== SyntaxKind.OmittedExpression) {
                        if (element.name.kind === SyntaxKind.Identifier) {
                            getSymbolLinks(getSymbolOfNode(element)).type = getTypeForBindingElement(element);
                        }
                        assignBindingElementTypes(element);
                    }
                }
            }
        }

        function assignTypeToParameterAndFixTypeParameters(parameter: Symbol, contextualType: Type, mapper: TypeMapper) {
            const links = getSymbolLinks(parameter);
            if (!links.type) {
                links.type = instantiateType(contextualType, mapper);
                assignBindingElementTypes(<ParameterDeclaration>parameter.valueDeclaration);
            }
            else if (isInferentialContext(mapper)) {
                // Even if the parameter already has a type, it might be because it was given a type while
                // processing the function as an argument to a prior signature during overload resolution.
                // If this was the case, it may have caused some type parameters to be fixed. So here,
                // we need to ensure that type parameters at the same positions get fixed again. This is
                // done by calling instantiateType to attach the mapper to the contextualType, and then
                // calling inferTypes to force a walk of contextualType so that all the correct fixing
                // happens. The choice to pass in links.type may seem kind of arbitrary, but it serves
                // to make sure that all the correct positions in contextualType are reached by the walk.
                // Here is an example:
                //
                //      interface Base {
                //          baseProp;
                //      }
                //      interface Derived extends Base {
                //          toBase(): Base;
                //      }
                //
                //      var derived: Derived;
                //
                //      declare function foo<T>(x: T, func: (p: T) => T): T;
                //      declare function foo<T>(x: T, func: (p: T) => T): T;
                //
                //      var result = foo(derived, d => d.toBase());
                //
                // We are typing d while checking the second overload. But we've already given d
                // a type (Derived) from the first overload. However, we still want to fix the
                // T in the second overload so that we do not infer Base as a candidate for T
                // (inferring Base would make type argument inference inconsistent between the two
                // overloads).
                inferTypes(mapper.context, links.type, instantiateType(contextualType, mapper));
            }
        }

        function createPromiseType(promisedType: Type): Type {
            // creates a `Promise<T>` type where `T` is the promisedType argument
            const globalPromiseType = getGlobalPromiseType();
            if (globalPromiseType !== emptyGenericType) {
                // if the promised type is itself a promise, get the underlying type; otherwise, fallback to the promised type
                promisedType = getAwaitedType(promisedType);
                return createTypeReference(<GenericType>globalPromiseType, [promisedType]);
            }

            return emptyObjectType;
        }

        function getReturnTypeFromBody(func: FunctionLikeDeclaration, contextualMapper?: TypeMapper): Type {
            const contextualSignature = getContextualSignatureForFunctionLikeDeclaration(func);
            if (!func.body) {
                return unknownType;
            }

            const isAsync = isAsyncFunctionLike(func);
            let type: Type;
            if (func.body.kind !== SyntaxKind.Block) {
                type = checkExpressionCached(<Expression>func.body, contextualMapper);
                if (isAsync) {
                    // From within an async function you can return either a non-promise value or a promise. Any
                    // Promise/A+ compatible implementation will always assimilate any foreign promise, so the
                    // return type of the body should be unwrapped to its awaited type, which we will wrap in
                    // the native Promise<T> type later in this function.
                    type = checkAwaitedType(type, func, Diagnostics.Return_expression_in_async_function_does_not_have_a_valid_callable_then_member);
                }
            }
            else {
                let types: Type[];
                const funcIsGenerator = !!func.asteriskToken;
                if (funcIsGenerator) {
                    types = checkAndAggregateYieldOperandTypes(<Block>func.body, contextualMapper);
                    if (types.length === 0) {
                        const iterableIteratorAny = createIterableIteratorType(anyType);
                        if (compilerOptions.noImplicitAny) {
                            error(func.asteriskToken,
                                Diagnostics.Generator_implicitly_has_type_0_because_it_does_not_yield_any_values_Consider_supplying_a_return_type, typeToString(iterableIteratorAny));
                        }
                        return iterableIteratorAny;
                    }
                }
                else {
                    types = checkAndAggregateReturnExpressionTypes(<Block>func.body, contextualMapper, isAsync);
                    if (types.length === 0) {
                        if (isAsync) {
                            // For an async function, the return type will not be void, but rather a Promise for void.
                            const promiseType = createPromiseType(voidType);
                            if (promiseType === emptyObjectType) {
                                error(func, Diagnostics.An_async_function_or_method_must_have_a_valid_awaitable_return_type);
                                return unknownType;
                            }

                            return promiseType;
                        }
                        else {
                            return voidType;
                        }
                    }
                }
                // When yield/return statements are contextually typed we allow the return type to be a union type.
                // Otherwise we require the yield/return expressions to have a best common supertype.
                type = contextualSignature ? getUnionType(types) : getCommonSupertype(types);
                if (!type) {
                    if (funcIsGenerator) {
                        error(func, Diagnostics.No_best_common_type_exists_among_yield_expressions);
                        return createIterableIteratorType(unknownType);
                    }
                    else {
                        error(func, Diagnostics.No_best_common_type_exists_among_return_expressions);
                        return unknownType;
                    }
                }

                if (funcIsGenerator) {
                    type = createIterableIteratorType(type);
                }
            }
            if (!contextualSignature) {
                reportErrorsFromWidening(func, type);
            }

            const widenedType = getWidenedType(type);
            if (isAsync) {
                // From within an async function you can return either a non-promise value or a promise. Any
                // Promise/A+ compatible implementation will always assimilate any foreign promise, so the
                // return type of the body is awaited type of the body, wrapped in a native Promise<T> type.
                const promiseType = createPromiseType(widenedType);
                if (promiseType === emptyObjectType) {
                    error(func, Diagnostics.An_async_function_or_method_must_have_a_valid_awaitable_return_type);
                    return unknownType;
                }

                return promiseType;
            }
            else {
                return widenedType;
            }
        }

        function checkAndAggregateYieldOperandTypes(body: Block, contextualMapper?: TypeMapper): Type[] {
            const aggregatedTypes: Type[] = [];

            forEachYieldExpression(body, yieldExpression => {
                const expr = yieldExpression.expression;
                if (expr) {
                    let type = checkExpressionCached(expr, contextualMapper);

                    if (yieldExpression.asteriskToken) {
                        // A yield* expression effectively yields everything that its operand yields
                        type = checkElementTypeOfIterable(type, yieldExpression.expression);
                    }

                    if (!contains(aggregatedTypes, type)) {
                        aggregatedTypes.push(type);
                    }
                }
            });

            return aggregatedTypes;
        }

        function checkAndAggregateReturnExpressionTypes(body: Block, contextualMapper?: TypeMapper, isAsync?: boolean): Type[] {
            const aggregatedTypes: Type[] = [];

            forEachReturnStatement(body, returnStatement => {
                const expr = returnStatement.expression;
                if (expr) {
                    let type = checkExpressionCached(expr, contextualMapper);
                    if (isAsync) {
                        // From within an async function you can return either a non-promise value or a promise. Any
                        // Promise/A+ compatible implementation will always assimilate any foreign promise, so the
                        // return type of the body should be unwrapped to its awaited type, which should be wrapped in
                        // the native Promise<T> type by the caller.
                        type = checkAwaitedType(type, body.parent, Diagnostics.Return_expression_in_async_function_does_not_have_a_valid_callable_then_member);
                    }

                    if (!contains(aggregatedTypes, type)) {
                        aggregatedTypes.push(type);
                    }
                }
            });

            return aggregatedTypes;
        }

        // TypeScript Specification 1.0 (6.3) - July 2014
        // An explicitly typed function whose return type isn't the Void or the Any type
        // must have at least one return statement somewhere in its body.
        // An exception to this rule is if the function implementation consists of a single 'throw' statement.
        function checkAllCodePathsInNonVoidFunctionReturnOrThrow(func: FunctionLikeDeclaration, returnType: Type): void {
            if (!produceDiagnostics) {
                return;
            }

            // Functions that return 'void' or 'any' don't need any return expressions.
            if (returnType === voidType || isTypeAny(returnType)) {
                return;
            }

            // If all we have is a function signature, or an arrow function with an expression body, then there is nothing to check.
            // also if HasImplicitReturnValue flags is not set this means that all codepaths in function body end with return of throw
            if (nodeIsMissing(func.body) || func.body.kind !== SyntaxKind.Block || !(func.flags & NodeFlags.HasImplicitReturn)) {
                return;
            }

            if (func.flags & NodeFlags.HasExplicitReturn) {
                if (compilerOptions.noImplicitReturns) {
                    error(func.type, Diagnostics.Not_all_code_paths_return_a_value);
                }
            }
            else {
                // This function does not conform to the specification.
                error(func.type, Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value);
            }
        }

        function checkFunctionExpressionOrObjectLiteralMethod(node: FunctionExpression | MethodDeclaration, contextualMapper?: TypeMapper): Type {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));

            // Grammar checking
            const hasGrammarError = checkGrammarFunctionLikeDeclaration(node);
            if (!hasGrammarError && node.kind === SyntaxKind.FunctionExpression) {
                checkGrammarForGenerator(node);
            }

            // The identityMapper object is used to indicate that function expressions are wildcards
            if (contextualMapper === identityMapper && isContextSensitive(node)) {
                return anyFunctionType;
            }

            const isAsync = isAsyncFunctionLike(node);
            if (isAsync) {
                emitAwaiter = true;
            }

            const links = getNodeLinks(node);
            const type = getTypeOfSymbol(node.symbol);
            const contextSensitive = isContextSensitive(node);
            const mightFixTypeParameters = contextSensitive && isInferentialContext(contextualMapper);

            // Check if function expression is contextually typed and assign parameter types if so.
            // See the comment in assignTypeToParameterAndFixTypeParameters to understand why we need to
            // check mightFixTypeParameters.
            if (mightFixTypeParameters || !(links.flags & NodeCheckFlags.ContextChecked)) {
                const contextualSignature = getContextualSignature(node);
                // If a type check is started at a function expression that is an argument of a function call, obtaining the
                // contextual type may recursively get back to here during overload resolution of the call. If so, we will have
                // already assigned contextual types.
                const contextChecked = !!(links.flags & NodeCheckFlags.ContextChecked);
                if (mightFixTypeParameters || !contextChecked) {
                    links.flags |= NodeCheckFlags.ContextChecked;
                    if (contextualSignature) {
                        const signature = getSignaturesOfType(type, SignatureKind.Call)[0];
                        if (contextSensitive) {
                            assignContextualParameterTypes(signature, contextualSignature, contextualMapper || identityMapper);
                        }
                        if (mightFixTypeParameters || !node.type && !signature.resolvedReturnType) {
                            const returnType = getReturnTypeFromBody(node, contextualMapper);
                            if (!signature.resolvedReturnType) {
                                signature.resolvedReturnType = returnType;
                            }
                        }
                    }

                    if (!contextChecked) {
                        checkSignatureDeclaration(node);
                    }
                }
            }

            if (produceDiagnostics && node.kind !== SyntaxKind.MethodDeclaration && node.kind !== SyntaxKind.MethodSignature) {
                checkCollisionWithCapturedSuperVariable(node, (<FunctionExpression>node).name);
                checkCollisionWithCapturedThisVariable(node, (<FunctionExpression>node).name);
            }

            return type;
        }

        function checkFunctionExpressionOrObjectLiteralMethodBody(node: ArrowFunction | FunctionExpression | MethodDeclaration) {
            Debug.assert(node.kind !== SyntaxKind.MethodDeclaration || isObjectLiteralMethod(node));

            const isAsync = isAsyncFunctionLike(node);
            if (isAsync) {
                emitAwaiter = true;
            }

            const returnType = node.type && getTypeFromTypeNode(node.type);
            let promisedType: Type;
            if (returnType && isAsync) {
                promisedType = checkAsyncFunctionReturnType(node);
            }

            if (returnType && !node.asteriskToken) {
                checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, isAsync ? promisedType : returnType);
            }

            if (node.body) {
                if (!node.type) {
                    // There are some checks that are only performed in getReturnTypeFromBody, that may produce errors
                    // we need. An example is the noImplicitAny errors resulting from widening the return expression
                    // of a function. Because checking of function expression bodies is deferred, there was never an
                    // appropriate time to do this during the main walk of the file (see the comment at the top of
                    // checkFunctionExpressionBodies). So it must be done now.
                    getReturnTypeOfSignature(getSignatureFromDeclaration(node));
                }

                if (node.body.kind === SyntaxKind.Block) {
                    checkSourceElement(node.body);
                }
                else {
                    // From within an async function you can return either a non-promise value or a promise. Any
                    // Promise/A+ compatible implementation will always assimilate any foreign promise, so we
                    // should not be checking assignability of a promise to the return type. Instead, we need to
                    // check assignability of the awaited type of the expression body against the promised type of
                    // its return type annotation.
                    const exprType = checkExpression(<Expression>node.body);
                    if (returnType) {
                        if (isAsync) {
                            const awaitedType = checkAwaitedType(exprType, node.body, Diagnostics.Expression_body_for_async_arrow_function_does_not_have_a_valid_callable_then_member);
                            checkTypeAssignableTo(awaitedType, promisedType, node.body);
                        }
                        else {
                            checkTypeAssignableTo(exprType, returnType, node.body);
                        }
                    }

                    checkFunctionAndClassExpressionBodies(node.body);
                }
            }
        }

        function checkArithmeticOperandType(operand: Node, type: Type, diagnostic: DiagnosticMessage): boolean {
            if (!isTypeAnyOrAllConstituentTypesHaveKind(type, TypeFlags.NumberLike)) {
                error(operand, diagnostic);
                return false;
            }
            return true;
        }

        function checkReferenceExpression(n: Node, invalidReferenceMessage: DiagnosticMessage, constantVariableMessage: DiagnosticMessage): boolean {
            function findSymbol(n: Node): Symbol {
                const symbol = getNodeLinks(n).resolvedSymbol;
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
                    case SyntaxKind.Identifier: {
                        const symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.3
                        // An identifier expression that references a variable or parameter is classified as a reference.
                        // An identifier expression that references any other kind of entity is classified as a value(and therefore cannot be the target of an assignment).
                        return !symbol || symbol === unknownSymbol || symbol === argumentsSymbol || (symbol.flags & SymbolFlags.Variable) !== 0;
                    }
                    case SyntaxKind.PropertyAccessExpression: {
                        const symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.10
                        // A property access expression is always classified as a reference.
                        // NOTE (not in spec): assignment to enum members should not be allowed
                        return !symbol || symbol === unknownSymbol || (symbol.flags & ~SymbolFlags.EnumMember) !== 0;
                    }
                    case SyntaxKind.ElementAccessExpression:
                        //  old compiler doesn't check indexed access
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
                    case SyntaxKind.PropertyAccessExpression: {
                        const symbol = findSymbol(n);
                        return symbol && (symbol.flags & SymbolFlags.Variable) !== 0 && (getDeclarationFlagsFromSymbol(symbol) & NodeFlags.Const) !== 0;
                    }
                    case SyntaxKind.ElementAccessExpression: {
                        const index = (<ElementAccessExpression>n).argumentExpression;
                        const symbol = findSymbol((<ElementAccessExpression>n).expression);
                        if (symbol && index && index.kind === SyntaxKind.StringLiteral) {
                            const name = (<LiteralExpression>index).text;
                            const prop = getPropertyOfType(getTypeOfSymbol(symbol), name);
                            return prop && (prop.flags & SymbolFlags.Variable) !== 0 && (getDeclarationFlagsFromSymbol(prop) & NodeFlags.Const) !== 0;
                        }
                        return false;
                    }
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
                error(n, constantVariableMessage);
                return false;
            }

            return true;
        }

        function checkDeleteExpression(node: DeleteExpression): Type {
            checkExpression(node.expression);
            return booleanType;
        }

        function checkTypeOfExpression(node: TypeOfExpression): Type {
            checkExpression(node.expression);
            return stringType;
        }

        function checkVoidExpression(node: VoidExpression): Type {
            checkExpression(node.expression);
            return undefinedType;
        }

        function checkAwaitExpression(node: AwaitExpression): Type {
            // Grammar checking
            if (produceDiagnostics) {
                if (!(node.parserContextFlags & ParserContextFlags.Await)) {
                    grammarErrorOnFirstToken(node, Diagnostics.await_expression_is_only_allowed_within_an_async_function);
                }

                if (isInParameterInitializerBeforeContainingFunction(node)) {
                    error(node, Diagnostics.await_expressions_cannot_be_used_in_a_parameter_initializer);
                }
            }

            const operandType = checkExpression(node.expression);
            return checkAwaitedType(operandType, node);
        }

        function checkPrefixUnaryExpression(node: PrefixUnaryExpression): Type {
            const operandType = checkExpression(node.operand);
            switch (node.operator) {
                case SyntaxKind.PlusToken:
                case SyntaxKind.MinusToken:
                case SyntaxKind.TildeToken:
                    if (someConstituentTypeHasKind(operandType, TypeFlags.ESSymbol)) {
                        error(node.operand, Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, tokenToString(node.operator));
                    }
                    return numberType;
                case SyntaxKind.ExclamationToken:
                    return booleanType;
                case SyntaxKind.PlusPlusToken:
                case SyntaxKind.MinusMinusToken:
                    const ok = checkArithmeticOperandType(node.operand, operandType, Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
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
            const operandType = checkExpression(node.operand);
            const ok = checkArithmeticOperandType(node.operand, operandType, Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
            if (ok) {
                // run check only if former checks succeeded to avoid reporting cascading errors
                checkReferenceExpression(node.operand,
                    Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer,
                    Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
            }
            return numberType;
        }

        // Just like isTypeOfKind below, except that it returns true if *any* constituent
        // has this kind.
        function someConstituentTypeHasKind(type: Type, kind: TypeFlags): boolean {
            if (type.flags & kind) {
                return true;
            }
            if (type.flags & TypeFlags.UnionOrIntersection) {
                const types = (<UnionOrIntersectionType>type).types;
                for (const current of types) {
                    if (current.flags & kind) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        }

        // Return true if type has the given flags, or is a union or intersection type composed of types that all have those flags.
        function allConstituentTypesHaveKind(type: Type, kind: TypeFlags): boolean {
            if (type.flags & kind) {
                return true;
            }
            if (type.flags & TypeFlags.UnionOrIntersection) {
                const types = (<UnionOrIntersectionType>type).types;
                for (const current of types) {
                    if (!(current.flags & kind)) {
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

        function checkInstanceOfExpression(left: Expression, right: Expression, leftType: Type, rightType: Type): Type {
            // TypeScript 1.0 spec (April 2014): 4.15.4
            // The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
            // and the right operand to be of type Any or a subtype of the 'Function' interface type.
            // The result is always of the Boolean primitive type.
            // NOTE: do not raise error if leftType is unknown as related error was already reported
            if (allConstituentTypesHaveKind(leftType, TypeFlags.Primitive)) {
                error(left, Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            // NOTE: do not raise error if right is unknown as related error was already reported
            if (!(isTypeAny(rightType) || isTypeSubtypeOf(rightType, globalFunctionType))) {
                error(right, Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
            }
            return booleanType;
        }

        function checkInExpression(left: Expression, right: Expression, leftType: Type, rightType: Type): Type {
            // TypeScript 1.0 spec (April 2014): 4.15.5
            // The in operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type,
            // and the right operand to be of type Any, an object type, or a type parameter type.
            // The result is always of the Boolean primitive type.
            if (!isTypeAnyOrAllConstituentTypesHaveKind(leftType, TypeFlags.StringLike | TypeFlags.NumberLike | TypeFlags.ESSymbol)) {
                error(left, Diagnostics.The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol);
            }
            if (!isTypeAnyOrAllConstituentTypesHaveKind(rightType, TypeFlags.ObjectType | TypeFlags.TypeParameter)) {
                error(right, Diagnostics.The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            return booleanType;
        }

        function checkObjectLiteralAssignment(node: ObjectLiteralExpression, sourceType: Type, contextualMapper?: TypeMapper): Type {
            const properties = node.properties;
            for (const p of properties) {
                if (p.kind === SyntaxKind.PropertyAssignment || p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    const name = <PropertyName>(<PropertyAssignment>p).name;
                    if (name.kind === SyntaxKind.ComputedPropertyName) {
                        checkComputedPropertyName(<ComputedPropertyName>name);
                    }
                    if (isComputedNonLiteralName(name)) {
                        continue;
                    }

                    const text = getTextOfPropertyName(name);
                    const type = isTypeAny(sourceType)
                        ? sourceType
                        : getTypeOfPropertyOfType(sourceType, text) ||
                        isNumericLiteralName(text) && getIndexTypeOfType(sourceType, IndexKind.Number) ||
                        getIndexTypeOfType(sourceType, IndexKind.String);
                    if (type) {
                        if (p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                            checkDestructuringAssignment(<ShorthandPropertyAssignment>p, type);
                        }
                        else {
                            // non-shorthand property assignments should always have initializers 
                            checkDestructuringAssignment((<PropertyAssignment>p).initializer, type);
                        }
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
            // This elementType will be used if the specific property corresponding to this index is not
            // present (aka the tuple element property). This call also checks that the parentType is in
            // fact an iterable or array (depending on target language).
            const elementType = checkIteratedTypeOrElementType(sourceType, node, /*allowStringInput*/ false) || unknownType;
            const elements = node.elements;
            for (let i = 0; i < elements.length; i++) {
                const e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        const propName = "" + i;
                        const type = isTypeAny(sourceType)
                            ? sourceType
                            : isTupleLikeType(sourceType)
                                ? getTypeOfPropertyOfType(sourceType, propName)
                                : elementType;
                        if (type) {
                            checkDestructuringAssignment(e, type, contextualMapper);
                        }
                        else {
                            if (isTupleType(sourceType)) {
                                error(e, Diagnostics.Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2, typeToString(sourceType), (<TupleType>sourceType).elementTypes.length, elements.length);
                            }
                            else {
                                error(e, Diagnostics.Type_0_has_no_property_1, typeToString(sourceType), propName);
                            }
                        }
                    }
                    else {
                        if (i < elements.length - 1) {
                            error(e, Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                        }
                        else {
                            const restExpression = (<SpreadElementExpression>e).expression;
                            if (restExpression.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>restExpression).operatorToken.kind === SyntaxKind.EqualsToken) {
                                error((<BinaryExpression>restExpression).operatorToken, Diagnostics.A_rest_element_cannot_have_an_initializer);
                            }
                            else {
                                checkDestructuringAssignment(restExpression, createArrayType(elementType), contextualMapper);
                            }
                        }
                    }
                }
            }
            return sourceType;
        }

        function checkDestructuringAssignment(exprOrAssignment: Expression | ShorthandPropertyAssignment, sourceType: Type, contextualMapper?: TypeMapper): Type {
            let target: Expression;
            if (exprOrAssignment.kind === SyntaxKind.ShorthandPropertyAssignment) {
                const prop = <ShorthandPropertyAssignment>exprOrAssignment;
                if (prop.objectAssignmentInitializer) {
                    checkBinaryLikeExpression(prop.name, prop.equalsToken, prop.objectAssignmentInitializer, contextualMapper);
                }
                target = (<ShorthandPropertyAssignment>exprOrAssignment).name;
            }
            else {
                target = <Expression>exprOrAssignment;
            }

            if (target.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>target).operatorToken.kind === SyntaxKind.EqualsToken) {
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
            const targetType = checkExpression(target, contextualMapper);
            if (checkReferenceExpression(target, Diagnostics.Invalid_left_hand_side_of_assignment_expression, Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant)) {
                checkTypeAssignableTo(sourceType, targetType, target, /*headMessage*/ undefined);
            }
            return sourceType;
        }

        function checkBinaryExpression(node: BinaryExpression, contextualMapper?: TypeMapper) {
            return checkBinaryLikeExpression(node.left, node.operatorToken, node.right, contextualMapper, node);
        }

        function checkBinaryLikeExpression(left: Expression, operatorToken: Node, right: Expression, contextualMapper?: TypeMapper, errorNode?: Node) {
            const operator = operatorToken.kind;
            if (operator === SyntaxKind.EqualsToken && (left.kind === SyntaxKind.ObjectLiteralExpression || left.kind === SyntaxKind.ArrayLiteralExpression)) {
                return checkDestructuringAssignment(left, checkExpression(right, contextualMapper), contextualMapper);
            }
            let leftType = checkExpression(left, contextualMapper);
            let rightType = checkExpression(right, contextualMapper);
            switch (operator) {
                case SyntaxKind.AsteriskToken:
                case SyntaxKind.AsteriskAsteriskToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.AsteriskAsteriskEqualsToken:
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
                    // TypeScript 1.0 spec (April 2014): 4.19.1
                    // These operators require their operands to be of type Any, the Number primitive type,
                    // or an enum type. Operands of an enum type are treated
                    // as having the primitive type Number. If one operand is the null or undefined value,
                    // it is treated as having the type of the other operand.
                    // The result is always of the Number primitive type.
                    if (leftType.flags & (TypeFlags.Undefined | TypeFlags.Null)) leftType = rightType;
                    if (rightType.flags & (TypeFlags.Undefined | TypeFlags.Null)) rightType = leftType;

                    let suggestedOperator: SyntaxKind;
                    // if a user tries to apply a bitwise operator to 2 boolean operands
                    // try and return them a helpful suggestion
                    if ((leftType.flags & TypeFlags.Boolean) &&
                        (rightType.flags & TypeFlags.Boolean) &&
                        (suggestedOperator = getSuggestedBooleanOperator(operatorToken.kind)) !== undefined) {
                        error(errorNode || operatorToken, Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, tokenToString(operatorToken.kind), tokenToString(suggestedOperator));
                    }
                    else {
                        // otherwise just check each operand separately and report errors as normal
                        const leftOk = checkArithmeticOperandType(left, leftType, Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        const rightOk = checkArithmeticOperandType(right, rightType, Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        if (leftOk && rightOk) {
                            checkAssignmentOperator(numberType);
                        }
                    }

                    return numberType;
                case SyntaxKind.PlusToken:
                case SyntaxKind.PlusEqualsToken:
                    // TypeScript 1.0 spec (April 2014): 4.19.2
                    // The binary + operator requires both operands to be of the Number primitive type or an enum type,
                    // or at least one of the operands to be of type Any or the String primitive type.

                    // If one operand is the null or undefined value, it is treated as having the type of the other operand.
                    if (leftType.flags & (TypeFlags.Undefined | TypeFlags.Null)) leftType = rightType;
                    if (rightType.flags & (TypeFlags.Undefined | TypeFlags.Null)) rightType = leftType;

                    let resultType: Type;
                    if (allConstituentTypesHaveKind(leftType, TypeFlags.NumberLike) && allConstituentTypesHaveKind(rightType, TypeFlags.NumberLike)) {
                        // Operands of an enum type are treated as having the primitive type Number.
                        // If both operands are of the Number primitive type, the result is of the Number primitive type.
                        resultType = numberType;
                    }
                    else {
                        if (allConstituentTypesHaveKind(leftType, TypeFlags.StringLike) || allConstituentTypesHaveKind(rightType, TypeFlags.StringLike)) {
                            // If one or both operands are of the String primitive type, the result is of the String primitive type.
                            resultType = stringType;
                        }
                        else if (isTypeAny(leftType) || isTypeAny(rightType)) {
                            // Otherwise, the result is of type Any.
                            // NOTE: unknown type here denotes error type. Old compiler treated this case as any type so do we.
                            resultType = leftType === unknownType || rightType === unknownType ? unknownType : anyType;
                        }

                        // Symbols are not allowed at all in arithmetic expressions
                        if (resultType && !checkForDisallowedESSymbolOperand(operator)) {
                            return resultType;
                        }
                    }

                    if (!resultType) {
                        reportOperatorError();
                        return anyType;
                    }

                    if (operator === SyntaxKind.PlusEqualsToken) {
                        checkAssignmentOperator(resultType);
                    }
                    return resultType;
                case SyntaxKind.LessThanToken:
                case SyntaxKind.GreaterThanToken:
                case SyntaxKind.LessThanEqualsToken:
                case SyntaxKind.GreaterThanEqualsToken:
                    if (!checkForDisallowedESSymbolOperand(operator)) {
                        return booleanType;
                    }
                // Fall through
                case SyntaxKind.EqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsToken:
                case SyntaxKind.EqualsEqualsEqualsToken:
                case SyntaxKind.ExclamationEqualsEqualsToken:
                    // Permit 'number[] | "foo"' to be asserted to 'string'.
                    if (someConstituentTypeHasKind(leftType, TypeFlags.StringLike) && someConstituentTypeHasKind(rightType, TypeFlags.StringLike)) {
                        return booleanType;
                    }
                    if (!isTypeAssignableTo(leftType, rightType) && !isTypeAssignableTo(rightType, leftType)) {
                        reportOperatorError();
                    }
                    return booleanType;
                case SyntaxKind.InstanceOfKeyword:
                    return checkInstanceOfExpression(left, right, leftType, rightType);
                case SyntaxKind.InKeyword:
                    return checkInExpression(left, right, leftType, rightType);
                case SyntaxKind.AmpersandAmpersandToken:
                    return rightType;
                case SyntaxKind.BarBarToken:
                    return getUnionType([leftType, rightType]);
                case SyntaxKind.EqualsToken:
                    checkAssignmentOperator(rightType);
                    return getRegularTypeOfObjectLiteral(rightType);
                case SyntaxKind.CommaToken:
                    return rightType;
            }

            // Return true if there was no error, false if there was an error.
            function checkForDisallowedESSymbolOperand(operator: SyntaxKind): boolean {
                const offendingSymbolOperand =
                    someConstituentTypeHasKind(leftType, TypeFlags.ESSymbol) ? left :
                        someConstituentTypeHasKind(rightType, TypeFlags.ESSymbol) ? right :
                            undefined;
                if (offendingSymbolOperand) {
                    error(offendingSymbolOperand, Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, tokenToString(operator));
                    return false;
                }

                return true;
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
                    const ok = checkReferenceExpression(left, Diagnostics.Invalid_left_hand_side_of_assignment_expression, Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                    // Use default messages
                    if (ok) {
                        // to avoid cascading errors check assignability only if 'isReference' check succeeded and no errors were reported
                        checkTypeAssignableTo(valueType, leftType, left, /*headMessage*/ undefined);
                    }
                }
            }

            function reportOperatorError() {
                error(errorNode || operatorToken, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, tokenToString(operatorToken.kind), typeToString(leftType), typeToString(rightType));
            }
        }

        function isYieldExpressionInClass(node: YieldExpression): boolean {
            let current: Node = node;
            let parent = node.parent;
            while (parent) {
                if (isFunctionLike(parent) && current === (<FunctionLikeDeclaration>parent).body) {
                    return false;
                }
                else if (isClassLike(current)) {
                    return true;
                }

                current = parent;
                parent = parent.parent;
            }

            return false;
        }

        function checkYieldExpression(node: YieldExpression): Type {
            // Grammar checking
            if (produceDiagnostics) {
                if (!(node.parserContextFlags & ParserContextFlags.Yield) || isYieldExpressionInClass(node)) {
                    grammarErrorOnFirstToken(node, Diagnostics.A_yield_expression_is_only_allowed_in_a_generator_body);
                }

                if (isInParameterInitializerBeforeContainingFunction(node)) {
                    error(node, Diagnostics.yield_expressions_cannot_be_used_in_a_parameter_initializer);
                }
            }

            if (node.expression) {
                const func = getContainingFunction(node);
                // If the user's code is syntactically correct, the func should always have a star. After all,
                // we are in a yield context.
                if (func && func.asteriskToken) {
                    const expressionType = checkExpressionCached(node.expression, /*contextualMapper*/ undefined);
                    let expressionElementType: Type;
                    const nodeIsYieldStar = !!node.asteriskToken;
                    if (nodeIsYieldStar) {
                        expressionElementType = checkElementTypeOfIterable(expressionType, node.expression);
                    }
                    // There is no point in doing an assignability check if the function
                    // has no explicit return type because the return type is directly computed
                    // from the yield expressions.
                    if (func.type) {
                        const signatureElementType = getElementTypeOfIterableIterator(getTypeFromTypeNode(func.type)) || anyType;
                        if (nodeIsYieldStar) {
                            checkTypeAssignableTo(expressionElementType, signatureElementType, node.expression, /*headMessage*/ undefined);
                        }
                        else {
                            checkTypeAssignableTo(expressionType, signatureElementType, node.expression, /*headMessage*/ undefined);
                        }
                    }
                }
            }

            // Both yield and yield* expressions have type 'any'
            return anyType;
        }

        function checkConditionalExpression(node: ConditionalExpression, contextualMapper?: TypeMapper): Type {
            checkExpression(node.condition);
            const type1 = checkExpression(node.whenTrue, contextualMapper);
            const type2 = checkExpression(node.whenFalse, contextualMapper);
            return getUnionType([type1, type2]);
        }

        function checkStringLiteralExpression(node: StringLiteral): Type {
            const contextualType = getContextualType(node);
            if (contextualType && contextualTypeIsStringLiteralType(contextualType)) {
                return getStringLiteralType(node);
            }

            return stringType;
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
            const saveContextualType = node.contextualType;
            node.contextualType = contextualType;
            const result = checkExpression(node, contextualMapper);
            node.contextualType = saveContextualType;
            return result;
        }

        function checkExpressionCached(node: Expression, contextualMapper?: TypeMapper): Type {
            const links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node, contextualMapper);
            }
            return links.resolvedType;
        }

        function checkPropertyAssignment(node: PropertyAssignment, contextualMapper?: TypeMapper): Type {
            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                checkComputedPropertyName(<ComputedPropertyName>node.name);
            }

            return checkExpression((<PropertyAssignment>node).initializer, contextualMapper);
        }

        function checkObjectLiteralMethod(node: MethodDeclaration, contextualMapper?: TypeMapper): Type {
            // Grammar checking
            checkGrammarMethod(node);

            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                checkComputedPropertyName(<ComputedPropertyName>node.name);
            }

            const uninstantiatedType = checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper);
            return instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, contextualMapper);
        }

        function instantiateTypeWithSingleGenericCallSignature(node: Expression | MethodDeclaration, type: Type, contextualMapper?: TypeMapper) {
            if (isInferentialContext(contextualMapper)) {
                const signature = getSingleCallSignature(type);
                if (signature && signature.typeParameters) {
                    const contextualType = getApparentTypeOfContextualType(<Expression>node);
                    if (contextualType) {
                        const contextualSignature = getSingleCallSignature(contextualType);
                        if (contextualSignature && !contextualSignature.typeParameters) {
                            return getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper));
                        }
                    }
                }
            }

            return type;
        }

        // Checks an expression and returns its type. The contextualMapper parameter serves two purposes: When
        // contextualMapper is not undefined and not equal to the identityMapper function object it indicates that the
        // expression is being inferentially typed (section 4.12.2 in spec) and provides the type mapper to use in
        // conjunction with the generic contextual type. When contextualMapper is equal to the identityMapper function
        // object, it serves as an indicator that all contained function and arrow expressions should be considered to
        // have the wildcard function type; this form of type check is used during overload resolution to exclude
        // contextually typed function and arrow expressions in the initial phase.
        function checkExpression(node: Expression | QualifiedName, contextualMapper?: TypeMapper): Type {
            let type: Type;
            if (node.kind === SyntaxKind.QualifiedName) {
                type = checkQualifiedName(<QualifiedName>node);
            }
            else {
                const uninstantiatedType = checkExpressionWorker(<Expression>node, contextualMapper);
                type = instantiateTypeWithSingleGenericCallSignature(<Expression>node, uninstantiatedType, contextualMapper);
            }

            if (isConstEnumObjectType(type)) {
                // enum object type for const enums are only permitted in:
                // - 'left' in property access
                // - 'object' in indexed access
                // - target in rhs of import statement
                const ok =
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
            checkGrammarNumericLiteral(node);
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
                    return checkStringLiteralExpression(<StringLiteral>node);
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
                case SyntaxKind.ParenthesizedExpression:
                    return checkExpression((<ParenthesizedExpression>node).expression, contextualMapper);
                case SyntaxKind.ClassExpression:
                    return checkClassExpression(<ClassExpression>node);
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    return checkFunctionExpressionOrObjectLiteralMethod(<FunctionExpression>node, contextualMapper);
                case SyntaxKind.TypeOfExpression:
                    return checkTypeOfExpression(<TypeOfExpression>node);
                case SyntaxKind.TypeAssertionExpression:
                case SyntaxKind.AsExpression:
                    return checkAssertion(<AssertionExpression>node);
                case SyntaxKind.DeleteExpression:
                    return checkDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.VoidExpression:
                    return checkVoidExpression(<VoidExpression>node);
                case SyntaxKind.AwaitExpression:
                    return checkAwaitExpression(<AwaitExpression>node);
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
                    return checkYieldExpression(<YieldExpression>node);
                case SyntaxKind.JsxExpression:
                    return checkJsxExpression(<JsxExpression>node);
                case SyntaxKind.JsxElement:
                    return checkJsxElement(<JsxElement>node);
                case SyntaxKind.JsxSelfClosingElement:
                    return checkJsxSelfClosingElement(<JsxSelfClosingElement>node);
                case SyntaxKind.JsxOpeningElement:
                    Debug.fail("Shouldn't ever directly check a JsxOpeningElement");
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

            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarModifiers(node);

            checkVariableLikeDeclaration(node);
            let func = getContainingFunction(node);
            if (node.flags & NodeFlags.AccessibilityModifier) {
                func = getContainingFunction(node);
                if (!(func.kind === SyntaxKind.Constructor && nodeIsPresent(func.body))) {
                    error(node, Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                }
            }
            if (node.questionToken && isBindingPattern(node.name) && func.body) {
                error(node, Diagnostics.A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature);
            }

            // Only check rest parameter type if it's not a binding pattern. Since binding patterns are
            // not allowed in a rest parameter, we already have an error from checkGrammarParameterList.
            if (node.dotDotDotToken && !isBindingPattern(node.name) && !isArrayType(getTypeOfSymbol(node.symbol))) {
                error(node, Diagnostics.A_rest_parameter_must_be_of_an_array_type);
            }
        }

        function isSyntacticallyValidGenerator(node: SignatureDeclaration): boolean {
            if (!(<FunctionLikeDeclaration>node).asteriskToken || !(<FunctionLikeDeclaration>node).body) {
                return false;
            }

            return node.kind === SyntaxKind.MethodDeclaration ||
                node.kind === SyntaxKind.FunctionDeclaration ||
                node.kind === SyntaxKind.FunctionExpression;
        }

        function getTypePredicateParameterIndex(parameterList: NodeArray<ParameterDeclaration>, parameter: Identifier): number {
            if (parameterList) {
                for (let i = 0; i < parameterList.length; i++) {
                    const param = parameterList[i];
                    if (param.name.kind === SyntaxKind.Identifier &&
                        (<Identifier>param.name).text === parameter.text) {

                        return i;
                    }
                }
            }
            return -1;
        }

        function isInLegalTypePredicatePosition(node: Node): boolean {
            switch (node.parent.kind) {
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.CallSignature:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionType:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return node === (<SignatureDeclaration>node.parent).type;
            }
            return false;
        }

        function checkSignatureDeclaration(node: SignatureDeclaration) {
            // Grammar checking
            if (node.kind === SyntaxKind.IndexSignature) {
                checkGrammarIndexSignature(<SignatureDeclaration>node);
            }
            // TODO (yuisu): Remove this check in else-if when SyntaxKind.Construct is moved and ambient context is handled
            else if (node.kind === SyntaxKind.FunctionType || node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.ConstructorType ||
                node.kind === SyntaxKind.CallSignature || node.kind === SyntaxKind.Constructor ||
                node.kind === SyntaxKind.ConstructSignature) {
                checkGrammarFunctionLikeDeclaration(<FunctionLikeDeclaration>node);
            }

            checkTypeParameters(node.typeParameters);

            forEach(node.parameters, checkParameter);

            if (node.type) {
                if (node.type.kind === SyntaxKind.TypePredicate) {
                    const typePredicate = getSignatureFromDeclaration(node).typePredicate;
                    const typePredicateNode = <TypePredicateNode>node.type;
                    if (isInLegalTypePredicatePosition(typePredicateNode)) {
                        if (typePredicate.parameterIndex >= 0) {
                            if (node.parameters[typePredicate.parameterIndex].dotDotDotToken) {
                                error(typePredicateNode.parameterName,
                                    Diagnostics.A_type_predicate_cannot_reference_a_rest_parameter);
                            }
                            else {
                                checkTypeAssignableTo(typePredicate.type,
                                    getTypeOfNode(node.parameters[typePredicate.parameterIndex]),
                                    typePredicateNode.type);
                            }
                        }
                        else if (typePredicateNode.parameterName) {
                            let hasReportedError = false;
                            for (var param of node.parameters) {
                                if (hasReportedError) {
                                    break;
                                }
                                if (param.name.kind === SyntaxKind.ObjectBindingPattern ||
                                    param.name.kind === SyntaxKind.ArrayBindingPattern) {

                                    (function checkBindingPattern(pattern: BindingPattern) {
                                        for (const element of pattern.elements) {
                                            if (element.name.kind === SyntaxKind.Identifier &&
                                                (<Identifier>element.name).text === typePredicate.parameterName) {

                                                error(typePredicateNode.parameterName,
                                                    Diagnostics.A_type_predicate_cannot_reference_element_0_in_a_binding_pattern,
                                                    typePredicate.parameterName);
                                                hasReportedError = true;
                                                break;
                                            }
                                            else if (element.name.kind === SyntaxKind.ArrayBindingPattern ||
                                                element.name.kind === SyntaxKind.ObjectBindingPattern) {

                                                checkBindingPattern(<BindingPattern>element.name);
                                            }
                                        }
                                    })(<BindingPattern>param.name);
                                }
                            }
                            if (!hasReportedError) {
                                error(typePredicateNode.parameterName,
                                    Diagnostics.Cannot_find_parameter_0,
                                    typePredicate.parameterName);
                            }
                        }
                    }
                    else {
                        error(typePredicateNode,
                            Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
                    }
                }
                else {
                    checkSourceElement(node.type);
                }
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

                if (node.type) {
                    if (languageVersion >= ScriptTarget.ES6 && isSyntacticallyValidGenerator(node)) {
                        const returnType = getTypeFromTypeNode(node.type);
                        if (returnType === voidType) {
                            error(node.type, Diagnostics.A_generator_cannot_have_a_void_type_annotation);
                        }
                        else {
                            const generatorElementType = getElementTypeOfIterableIterator(returnType) || anyType;
                            const iterableIteratorInstantiation = createIterableIteratorType(generatorElementType);

                            // Naively, one could check that IterableIterator<any> is assignable to the return type annotation.
                            // However, that would not catch the error in the following case.
                            //
                            //    interface BadGenerator extends Iterable<number>, Iterator<string> { }
                            //    function* g(): BadGenerator { } // Iterable and Iterator have different types!
                            //
                            checkTypeAssignableTo(iterableIteratorInstantiation, returnType, node.type);
                        }
                    }
                }
            }

            checkSpecializedSignatureDeclaration(node);
        }

        function checkTypeForDuplicateIndexSignatures(node: Node) {
            if (node.kind === SyntaxKind.InterfaceDeclaration) {
                const nodeSymbol = getSymbolOfNode(node);
                // in case of merging interface declaration it is possible that we'll enter this check procedure several times for every declaration
                // to prevent this run check only for the first declaration of a given kind
                if (nodeSymbol.declarations.length > 0 && nodeSymbol.declarations[0] !== node) {
                    return;
                }
            }

            // TypeScript 1.0 spec (April 2014)
            // 3.7.4: An object type can contain at most one string index signature and one numeric index signature.
            // 8.5: A class declaration can have at most one string index member declaration and one numeric index member declaration
            const indexSymbol = getIndexSymbol(getSymbolOfNode(node));
            if (indexSymbol) {
                let seenNumericIndexer = false;
                let seenStringIndexer = false;
                for (const decl of indexSymbol.declarations) {
                    const declaration = <SignatureDeclaration>decl;
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
            checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarProperty(node) || checkGrammarComputedPropertyName(node.name);

            checkVariableLikeDeclaration(node);
        }

        function checkMethodDeclaration(node: MethodDeclaration) {
            // Grammar checking
            checkGrammarMethod(node) || checkGrammarComputedPropertyName(node.name);

            // Grammar checking for modifiers is done inside the function checkGrammarFunctionLikeDeclaration
            checkFunctionLikeDeclaration(node);

            // Abstract methods cannot have an implementation.
            // Extra checks are to avoid reporting multiple errors relating to the "abstractness" of the node.
            if (node.flags & NodeFlags.Abstract && node.body) {
                error(node, Diagnostics.Method_0_cannot_have_an_implementation_because_it_is_marked_abstract, declarationNameToString(node.name));
            }
        }

        function checkConstructorDeclaration(node: ConstructorDeclaration) {
            // Grammar check on signature of constructor and modifier of the constructor is done in checkSignatureDeclaration function.
            checkSignatureDeclaration(node);
            // Grammar check for checking only related to constructoDeclaration
            checkGrammarConstructorTypeParameters(node) || checkGrammarConstructorTypeAnnotation(node);

            checkSourceElement(node.body);

            const symbol = getSymbolOfNode(node);
            const firstDeclaration = getDeclarationOfKind(symbol, node.kind);
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

            function containsSuperCallAsComputedPropertyName(n: Declaration): boolean {
                return n.name && containsSuperCall(n.name);
            }

            function containsSuperCall(n: Node): boolean {
                if (isSuperCallExpression(n)) {
                    return true;
                }
                else if (isFunctionLike(n)) {
                    return false;
                }
                else if (isClassLike(n)) {
                    return forEach((<ClassLikeDeclaration>n).members, containsSuperCallAsComputedPropertyName);
                }
                return forEachChild(n, containsSuperCall);
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
            const containingClassDecl = <ClassDeclaration>node.parent;
            if (getClassExtendsHeritageClauseElement(containingClassDecl)) {
                const containingClassSymbol = getSymbolOfNode(containingClassDecl);
                const containingClassInstanceType = <InterfaceType>getDeclaredTypeOfSymbol(containingClassSymbol);
                const baseConstructorType = getBaseConstructorTypeOfClass(containingClassInstanceType);

                if (containsSuperCall(node.body)) {
                    if (baseConstructorType === nullType) {
                        error(node, Diagnostics.A_constructor_cannot_contain_a_super_call_when_its_class_extends_null);
                    }

                    // The first statement in the body of a constructor (excluding prologue directives) must be a super call
                    // if both of the following are true:
                    // - The containing class is a derived class.
                    // - The constructor declares parameter properties
                    //   or the containing class declares instance member variables with initializers.
                    const superCallShouldBeFirst =
                        forEach((<ClassDeclaration>node.parent).members, isInstancePropertyWithInitializer) ||
                        forEach(node.parameters, p => p.flags & (NodeFlags.Public | NodeFlags.Private | NodeFlags.Protected));

                    // Skip past any prologue directives to find the first statement
                    // to ensure that it was a super call.
                    if (superCallShouldBeFirst) {
                        const statements = (<Block>node.body).statements;
                        let superCallStatement: ExpressionStatement;
                        for (const statement of statements) {
                            if (statement.kind === SyntaxKind.ExpressionStatement && isSuperCallExpression((<ExpressionStatement>statement).expression)) {
                                superCallStatement = <ExpressionStatement>statement;
                                break;
                            }
                            if (!isPrologueDirective(statement)) {
                                break;
                            }
                        }
                        if (!superCallStatement) {
                            error(node, Diagnostics.A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties);
                        }
                        else {
                            // In such a required super call, it is a compile-time error for argument expressions to reference this.
                            markThisReferencesAsErrors(superCallStatement.expression);
                        }
                    }
                }
                else if (baseConstructorType !== nullType) {
                    error(node, Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call);
                }
            }
        }

        function checkAccessorDeclaration(node: AccessorDeclaration) {
            if (produceDiagnostics) {
                // Grammar checking accessors
                checkGrammarFunctionLikeDeclaration(node) || checkGrammarAccessor(node) || checkGrammarComputedPropertyName(node.name);

                if (node.kind === SyntaxKind.GetAccessor) {
                    if (!isInAmbientContext(node) && nodeIsPresent(node.body) && (node.flags & NodeFlags.HasImplicitReturn)) {
                        if (node.flags & NodeFlags.HasExplicitReturn) {
                            if (compilerOptions.noImplicitReturns) {
                                error(node.name, Diagnostics.Not_all_code_paths_return_a_value);
                            }
                        }
                        else {
                            error(node.name, Diagnostics.A_get_accessor_must_return_a_value);
                        }
                    }
                }

                if (!hasDynamicName(node)) {
                    // TypeScript 1.0 spec (April 2014): 8.4.3
                    // Accessors for the same member name must specify the same accessibility.
                    const otherKind = node.kind === SyntaxKind.GetAccessor ? SyntaxKind.SetAccessor : SyntaxKind.GetAccessor;
                    const otherAccessor = <AccessorDeclaration>getDeclarationOfKind(node.symbol, otherKind);
                    if (otherAccessor) {
                        if (((node.flags & NodeFlags.AccessibilityModifier) !== (otherAccessor.flags & NodeFlags.AccessibilityModifier))) {
                            error(node.name, Diagnostics.Getter_and_setter_accessors_do_not_agree_in_visibility);
                        }

                        const currentAccessorType = getAnnotatedAccessorType(node);
                        const otherAccessorType = getAnnotatedAccessorType(otherAccessor);
                        // TypeScript 1.0 spec (April 2014): 4.5
                        // If both accessors include type annotations, the specified types must be identical.
                        if (currentAccessorType && otherAccessorType) {
                            if (!isTypeIdenticalTo(currentAccessorType, otherAccessorType)) {
                                error(node, Diagnostics.get_and_set_accessor_must_have_the_same_type);
                            }
                        }
                    }
                }
                getTypeOfAccessors(getSymbolOfNode(node));
            }

            checkFunctionLikeDeclaration(node);
        }

        function checkMissingDeclaration(node: Node) {
            checkDecorators(node);
        }

        function checkTypeArgumentConstraints(typeParameters: TypeParameter[], typeArguments: TypeNode[]): boolean {
            let result = true;
            for (let i = 0; i < typeParameters.length; i++) {
                const constraint = getConstraintOfTypeParameter(typeParameters[i]);
                if (constraint) {
                    const typeArgument = typeArguments[i];
                    result = result && checkTypeAssignableTo(getTypeFromTypeNode(typeArgument), constraint, typeArgument, Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                }
            }
            return result;
        }

        function checkTypeReferenceNode(node: TypeReferenceNode | ExpressionWithTypeArguments) {
            checkGrammarTypeArguments(node, node.typeArguments);
            const type = getTypeFromTypeReference(node);
            if (type !== unknownType && node.typeArguments) {
                // Do type argument local checks only if referenced type is successfully resolved
                forEach(node.typeArguments, checkSourceElement);
                if (produceDiagnostics) {
                    const symbol = getNodeLinks(node).resolvedSymbol;
                    const typeParameters = symbol.flags & SymbolFlags.TypeAlias ? getSymbolLinks(symbol).typeParameters : (<TypeReference>type).target.localTypeParameters;
                    checkTypeArgumentConstraints(typeParameters, node.typeArguments);
                }
            }
        }

        function checkTypeQuery(node: TypeQueryNode) {
            getTypeFromTypeQueryNode(node);
        }

        function checkTypeLiteral(node: TypeLiteralNode) {
            forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                const type = getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }

        function checkArrayType(node: ArrayTypeNode) {
            checkSourceElement(node.elementType);
        }

        function checkTupleType(node: TupleTypeNode) {
            // Grammar checking
            const hasErrorFromDisallowedTrailingComma = checkGrammarForDisallowedTrailingComma(node.elementTypes);
            if (!hasErrorFromDisallowedTrailingComma && node.elementTypes.length === 0) {
                grammarErrorOnNode(node, Diagnostics.A_tuple_type_element_list_cannot_be_empty);
            }

            forEach(node.elementTypes, checkSourceElement);
        }

        function checkUnionOrIntersectionType(node: UnionOrIntersectionTypeNode) {
            forEach(node.types, checkSourceElement);
        }

        function isPrivateWithinAmbient(node: Node): boolean {
            return (node.flags & NodeFlags.Private) && isInAmbientContext(node);
        }

        function checkSpecializedSignatureDeclaration(signatureDeclarationNode: SignatureDeclaration): void {
            if (!produceDiagnostics) {
                return;
            }
            const signature = getSignatureFromDeclaration(signatureDeclarationNode);
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
            let signaturesToCheck: Signature[];
            // Unnamed (call\construct) signatures in interfaces are inherited and not shadowed so examining just node symbol won't give complete answer.
            // Use declaring type to obtain full list of signatures.
            if (!signatureDeclarationNode.name && signatureDeclarationNode.parent && signatureDeclarationNode.parent.kind === SyntaxKind.InterfaceDeclaration) {
                Debug.assert(signatureDeclarationNode.kind === SyntaxKind.CallSignature || signatureDeclarationNode.kind === SyntaxKind.ConstructSignature);
                const signatureKind = signatureDeclarationNode.kind === SyntaxKind.CallSignature ? SignatureKind.Call : SignatureKind.Construct;
                const containingSymbol = getSymbolOfNode(signatureDeclarationNode.parent);
                const containingType = getDeclaredTypeOfSymbol(containingSymbol);
                signaturesToCheck = getSignaturesOfType(containingType, signatureKind);
            }
            else {
                signaturesToCheck = getSignaturesOfSymbol(getSymbolOfNode(signatureDeclarationNode));
            }

            for (const otherSignature of signaturesToCheck) {
                if (!otherSignature.hasStringLiterals && isSignatureAssignableTo(signature, otherSignature)) {
                    return;
                }
            }

            error(signatureDeclarationNode, Diagnostics.Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature);
        }

        function getEffectiveDeclarationFlags(n: Node, flagsToCheck: NodeFlags): NodeFlags {
            let flags = getCombinedNodeFlags(n);

            // children of classes (even ambient classes) should not be marked as ambient or export
            // because those flags have no useful semantics there.
            if (n.parent.kind !== SyntaxKind.InterfaceDeclaration &&
                n.parent.kind !== SyntaxKind.ClassDeclaration &&
                n.parent.kind !== SyntaxKind.ClassExpression &&
                isInAmbientContext(n)) {
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
                const implementationSharesContainerWithFirstOverload = implementation !== undefined && implementation.parent === overloads[0].parent;
                return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
            }

            function checkFlagAgreementBetweenOverloads(overloads: Declaration[], implementation: FunctionLikeDeclaration, flagsToCheck: NodeFlags, someOverloadFlags: NodeFlags, allOverloadFlags: NodeFlags): void {
                // Error if some overloads have a flag that is not shared by all overloads. To find the
                // deviations, we XOR someOverloadFlags with allOverloadFlags
                const someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                if (someButNotAllOverloadFlags !== 0) {
                    const canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck);

                    forEach(overloads, o => {
                        const deviation = getEffectiveDeclarationFlags(o, flagsToCheck) ^ canonicalFlags;
                        if (deviation & NodeFlags.Export) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_exported_or_not_exported);
                        }
                        else if (deviation & NodeFlags.Ambient) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                        }
                        else if (deviation & (NodeFlags.Private | NodeFlags.Protected)) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                        }
                        else if (deviation & NodeFlags.Abstract) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_abstract_or_not_abstract);
                        }
                    });
                }
            }

            function checkQuestionTokenAgreementBetweenOverloads(overloads: Declaration[], implementation: FunctionLikeDeclaration, someHaveQuestionToken: boolean, allHaveQuestionToken: boolean): void {
                if (someHaveQuestionToken !== allHaveQuestionToken) {
                    const canonicalHasQuestionToken = hasQuestionToken(getCanonicalOverload(overloads, implementation));
                    forEach(overloads, o => {
                        const deviation = hasQuestionToken(o) !== canonicalHasQuestionToken;
                        if (deviation) {
                            error(o.name, Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                        }
                    });
                }
            }

            const flagsToCheck: NodeFlags = NodeFlags.Export | NodeFlags.Ambient | NodeFlags.Private | NodeFlags.Protected | NodeFlags.Abstract;
            let someNodeFlags: NodeFlags = 0;
            let allNodeFlags = flagsToCheck;
            let someHaveQuestionToken = false;
            let allHaveQuestionToken = true;
            let hasOverloads = false;
            let bodyDeclaration: FunctionLikeDeclaration;
            let lastSeenNonAmbientDeclaration: FunctionLikeDeclaration;
            let previousDeclaration: FunctionLikeDeclaration;

            const declarations = symbol.declarations;
            const isConstructor = (symbol.flags & SymbolFlags.Constructor) !== 0;

            function reportImplementationExpectedError(node: FunctionLikeDeclaration): void {
                if (node.name && nodeIsMissing(node.name)) {
                    return;
                }

                let seen = false;
                const subsequentNode = forEachChild(node.parent, c => {
                    if (seen) {
                        return c;
                    }
                    else {
                        seen = c === node;
                    }
                });
                if (subsequentNode) {
                    if (subsequentNode.kind === node.kind) {
                        const errorNode: Node = (<FunctionLikeDeclaration>subsequentNode).name || subsequentNode;
                        // TODO(jfreeman): These are methods, so handle computed name case
                        if (node.name && (<FunctionLikeDeclaration>subsequentNode).name && (<Identifier>node.name).text === (<Identifier>(<FunctionLikeDeclaration>subsequentNode).name).text) {
                            const reportError =
                                (node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.MethodSignature) &&
                                (node.flags & NodeFlags.Static) !== (subsequentNode.flags & NodeFlags.Static);
                            // we can get here in two cases
                            // 1. mixed static and instance class members
                            // 2. something with the same name was defined before the set of overloads that prevents them from merging
                            // here we'll report error only for the first case since for second we should already report error in binder 
                            if (reportError) {
                                const diagnostic = node.flags & NodeFlags.Static ? Diagnostics.Function_overload_must_be_static : Diagnostics.Function_overload_must_not_be_static;
                                error(errorNode, diagnostic);
                            }
                            return;
                        }
                        else if (nodeIsPresent((<FunctionLikeDeclaration>subsequentNode).body)) {
                            error(errorNode, Diagnostics.Function_implementation_name_must_be_0, declarationNameToString(node.name));
                            return;
                        }
                    }
                }
                const errorNode: Node = node.name || node;
                if (isConstructor) {
                    error(errorNode, Diagnostics.Constructor_implementation_is_missing);
                }
                else {
                    // Report different errors regarding non-consecutive blocks of declarations depending on whether
                    // the node in question is abstract.
                    if (node.flags & NodeFlags.Abstract) {
                        error(errorNode, Diagnostics.All_declarations_of_an_abstract_method_must_be_consecutive);
                    }
                    else {
                        error(errorNode, Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                    }
                }
            }

            // when checking exported function declarations across modules check only duplicate implementations
            // names and consistency of modifiers are verified when we check local symbol
            const isExportSymbolInsideModule = symbol.parent && symbol.parent.flags & SymbolFlags.Module;
            let duplicateFunctionDeclaration = false;
            let multipleConstructorImplementation = false;
            for (const current of declarations) {
                const node = <FunctionLikeDeclaration>current;
                const inAmbientContext = isInAmbientContext(node);
                const inAmbientContextOrInterface = node.parent.kind === SyntaxKind.InterfaceDeclaration || node.parent.kind === SyntaxKind.TypeLiteral || inAmbientContext;
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
                    const currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
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

            // Abstract methods can't have an implementation -- in particular, they don't need one.
            if (!isExportSymbolInsideModule && lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body &&
                !(lastSeenNonAmbientDeclaration.flags & NodeFlags.Abstract)) {
                reportImplementationExpectedError(lastSeenNonAmbientDeclaration);
            }

            if (hasOverloads) {
                checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
                checkQuestionTokenAgreementBetweenOverloads(declarations, bodyDeclaration, someHaveQuestionToken, allHaveQuestionToken);

                if (bodyDeclaration) {
                    const signatures = getSignaturesOfSymbol(symbol);
                    const bodySignature = getSignatureFromDeclaration(bodyDeclaration);
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
                        for (const signature of signatures) {
                            if (!signature.hasStringLiterals && !isSignatureAssignableTo(bodySignature, signature)) {
                                error(signature.declaration, Diagnostics.Overload_signature_is_not_compatible_with_function_implementation);
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

            // if localSymbol is defined on node then node itself is exported - check is required
            let symbol = node.localSymbol;
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
            let exportedDeclarationSpaces = SymbolFlags.None;
            let nonExportedDeclarationSpaces = SymbolFlags.None;
            let defaultExportedDeclarationSpaces = SymbolFlags.None;
            for (const d of symbol.declarations) {
                const declarationSpaces = getDeclarationSpaces(d);
                const effectiveDeclarationFlags = getEffectiveDeclarationFlags(d, NodeFlags.Export | NodeFlags.Default);

                if (effectiveDeclarationFlags & NodeFlags.Export) {
                    if (effectiveDeclarationFlags & NodeFlags.Default) {
                        defaultExportedDeclarationSpaces |= declarationSpaces;
                    }
                    else {
                        exportedDeclarationSpaces |= declarationSpaces;
                    }
                }
                else {
                    nonExportedDeclarationSpaces |= declarationSpaces;
                }
            }

            // Spaces for anyting not declared a 'default export'.
            const nonDefaultExportedDeclarationSpaces = exportedDeclarationSpaces | nonExportedDeclarationSpaces;

            const commonDeclarationSpacesForExportsAndLocals = exportedDeclarationSpaces & nonExportedDeclarationSpaces;
            const commonDeclarationSpacesForDefaultAndNonDefault = defaultExportedDeclarationSpaces & nonDefaultExportedDeclarationSpaces;

            if (commonDeclarationSpacesForExportsAndLocals || commonDeclarationSpacesForDefaultAndNonDefault) {
                // declaration spaces for exported and non-exported declarations intersect
                for (const d of symbol.declarations) {
                    const declarationSpaces = getDeclarationSpaces(d);

                    // Only error on the declarations that conributed to the intersecting spaces.
                    if (declarationSpaces & commonDeclarationSpacesForDefaultAndNonDefault) {
                        error(d.name, Diagnostics.Merged_declaration_0_cannot_include_a_default_export_declaration_Consider_adding_a_separate_export_default_0_declaration_instead, declarationNameToString(d.name));
                    }
                    else if (declarationSpaces & commonDeclarationSpacesForExportsAndLocals) {
                        error(d.name, Diagnostics.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local, declarationNameToString(d.name));
                    }
                }
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
                    case SyntaxKind.ImportEqualsDeclaration:
                        let result: SymbolFlags = 0;
                        const target = resolveAlias(getSymbolOfNode(d));
                        forEach(target.declarations, d => { result |= getDeclarationSpaces(d); });
                        return result;
                    default:
                        return SymbolFlags.ExportValue;
                }
            }
        }

        function checkNonThenableType(type: Type, location?: Node, message?: DiagnosticMessage) {
            type = getWidenedType(type);
            if (!isTypeAny(type) && isTypeAssignableTo(type, getGlobalThenableType())) {
                if (location) {
                    if (!message) {
                        message = Diagnostics.Operand_for_await_does_not_have_a_valid_callable_then_member;
                    }

                    error(location, message);
                }

                return unknownType;
            }

            return type;
        }

        /**
          * Gets the "promised type" of a promise.
          * @param type The type of the promise.
          * @remarks The "promised type" of a type is the type of the "value" parameter of the "onfulfilled" callback.
          */
        function getPromisedType(promise: Type): Type {
            //
            //  { // promise
            //      then( // thenFunction
            //          onfulfilled: ( // onfulfilledParameterType
            //              value: T // valueParameterType
            //          ) => any
            //      ): any;
            //  }
            //

            if (promise.flags & TypeFlags.Any) {
                return undefined;
            }

            if ((promise.flags & TypeFlags.Reference) && (<GenericType>promise).target === tryGetGlobalPromiseType()) {
                return (<GenericType>promise).typeArguments[0];
            }

            const globalPromiseLikeType = getInstantiatedGlobalPromiseLikeType();
            if (globalPromiseLikeType === emptyObjectType || !isTypeAssignableTo(promise, globalPromiseLikeType)) {
                return undefined;
            }

            const thenFunction = getTypeOfPropertyOfType(promise, "then");
            if (thenFunction && (thenFunction.flags & TypeFlags.Any)) {
                return undefined;
            }

            const thenSignatures = thenFunction ? getSignaturesOfType(thenFunction, SignatureKind.Call) : emptyArray;
            if (thenSignatures.length === 0) {
                return undefined;
            }

            const onfulfilledParameterType = getUnionType(map(thenSignatures, getTypeOfFirstParameterOfSignature));
            if (onfulfilledParameterType.flags & TypeFlags.Any) {
                return undefined;
            }

            const onfulfilledParameterSignatures = getSignaturesOfType(onfulfilledParameterType, SignatureKind.Call);
            if (onfulfilledParameterSignatures.length === 0) {
                return undefined;
            }

            const valueParameterType = getUnionType(map(onfulfilledParameterSignatures, getTypeOfFirstParameterOfSignature));
            return valueParameterType;
        }

        function getTypeOfFirstParameterOfSignature(signature: Signature) {
            return getTypeAtPosition(signature, 0);
        }

        /**
          * Gets the "awaited type" of a type.
          * @param type The type to await.
          * @remarks The "awaited type" of an expression is its "promised type" if the expression is a
          * Promise-like type; otherwise, it is the type of the expression. This is used to reflect
          * The runtime behavior of the `await` keyword.
          */
        function getAwaitedType(type: Type) {
            return checkAwaitedType(type, /*location*/ undefined, /*message*/ undefined);
        }

        function checkAwaitedType(type: Type, location?: Node, message?: DiagnosticMessage) {
            return checkAwaitedTypeWorker(type);

            function checkAwaitedTypeWorker(type: Type): Type {
                if (type.flags & TypeFlags.Union) {
                    const types: Type[] = [];
                    for (const constituentType of (<UnionType>type).types) {
                        types.push(checkAwaitedTypeWorker(constituentType));
                    }

                    return getUnionType(types);
                }
                else {
                    const promisedType = getPromisedType(type);
                    if (promisedType === undefined) {
                        // The type was not a PromiseLike, so it could not be unwrapped any further.
                        // As long as the type does not have a callable "then" property, it is
                        // safe to return the type; otherwise, an error will have been reported in
                        // the call to checkNonThenableType and we will return unknownType.
                        //
                        // An example of a non-promise "thenable" might be:
                        //
                        //  await { then(): void {} }
                        //
                        // The "thenable" does not match the minimal definition for a PromiseLike. When
                        // a Promise/A+-compatible or ES6 promise tries to adopt this value, the promise
                        // will never settle. We treat this as an error to help flag an early indicator
                        // of a runtime problem. If the user wants to return this value from an async
                        // function, they would need to wrap it in some other value. If they want it to
                        // be treated as a promise, they can cast to <any>.
                        return checkNonThenableType(type, location, message);
                    }
                    else {
                        if (type.id === promisedType.id || awaitedTypeStack.indexOf(promisedType.id) >= 0) {
                            // We have a bad actor in the form of a promise whose promised type is
                            // the same promise type, or a mutually recursive promise. Return the
                            // unknown type as we cannot guess the shape. If this were the actual
                            // case in the JavaScript, this Promise would never resolve.
                            //
                            // An example of a bad actor with a singly-recursive promise type might
                            // be:
                            //
                            //  interface BadPromise {
                            //      then(
                            //          onfulfilled: (value: BadPromise) => any,
                            //          onrejected: (error: any) => any): BadPromise;
                            //  }
                            //
                            // The above interface will pass the PromiseLike check, and return a
                            // promised type of `BadPromise`. Since this is a self reference, we
                            // don't want to keep recursing ad infinitum.
                            //
                            // An example of a bad actor in the form of a mutually-recursive
                            // promise type might be:
                            //
                            //  interface BadPromiseA {
                            //      then(
                            //          onfulfilled: (value: BadPromiseB) => any,
                            //          onrejected: (error: any) => any): BadPromiseB;
                            //  }
                            //
                            //  interface BadPromiseB {
                            //      then(
                            //          onfulfilled: (value: BadPromiseA) => any,
                            //          onrejected: (error: any) => any): BadPromiseA;
                            //  }
                            //
                            if (location) {
                                error(
                                    location,
                                    Diagnostics._0_is_referenced_directly_or_indirectly_in_the_fulfillment_callback_of_its_own_then_method,
                                    symbolToString(type.symbol));
                            }

                            return unknownType;
                        }

                        // Keep track of the type we're about to unwrap to avoid bad recursive promise types.
                        // See the comments above for more information.
                        awaitedTypeStack.push(type.id);
                        const awaitedType = checkAwaitedTypeWorker(promisedType);
                        awaitedTypeStack.pop();
                        return awaitedType;
                    }
                }
            }
        }

        /**
          * Checks the return type of an async function to ensure it is a compatible
          * Promise implementation.
          * @param node The signature to check
          * @param returnType The return type for the function
          * @remarks
          * This checks that an async function has a valid Promise-compatible return type,
          * and returns the *awaited type* of the promise. An async function has a valid
          * Promise-compatible return type if the resolved value of the return type has a
          * construct signature that takes in an `initializer` function that in turn supplies
          * a `resolve` function as one of its arguments and results in an object with a
          * callable `then` signature.
          */
        function checkAsyncFunctionReturnType(node: FunctionLikeDeclaration): Type {
            const globalPromiseConstructorLikeType = getGlobalPromiseConstructorLikeType();
            if (globalPromiseConstructorLikeType === emptyObjectType) {
                // If we couldn't resolve the global PromiseConstructorLike type we cannot verify
                // compatibility with __awaiter.
                return unknownType;
            }

            // As part of our emit for an async function, we will need to emit the entity name of
            // the return type annotation as an expression. To meet the necessary runtime semantics
            // for __awaiter, we must also check that the type of the declaration (e.g. the static
            // side or "constructor" of the promise type) is compatible `PromiseConstructorLike`.
            //
            // An example might be (from lib.es6.d.ts):
            //
            //  interface Promise<T> { ... }
            //  interface PromiseConstructor {
            //      new <T>(...): Promise<T>;
            //  }
            //  declare var Promise: PromiseConstructor;
            //
            // When an async function declares a return type annotation of `Promise<T>`, we
            // need to get the type of the `Promise` variable declaration above, which would
            // be `PromiseConstructor`.
            //
            // The same case applies to a class:
            //
            //  declare class Promise<T> {
            //      constructor(...);
            //      then<U>(...): Promise<U>;
            //  }
            //
            // When we get the type of the `Promise` symbol here, we get the type of the static
            // side of the `Promise` class, which would be `{ new <T>(...): Promise<T> }`.

            const promiseType = getTypeFromTypeNode(node.type);
            if (promiseType === unknownType && compilerOptions.isolatedModules) {
                // If we are compiling with isolatedModules, we may not be able to resolve the
                // type as a value. As such, we will just return unknownType;
                return unknownType;
            }

            const promiseConstructor = getNodeLinks(node.type).resolvedSymbol;
            if (!promiseConstructor || !symbolIsValue(promiseConstructor)) {
                const typeName = promiseConstructor
                    ? symbolToString(promiseConstructor)
                    : typeToString(promiseType);
                error(node, Diagnostics.Type_0_is_not_a_valid_async_function_return_type, typeName);
                return unknownType;
            }

            // Validate the promise constructor type.
            const promiseConstructorType = getTypeOfSymbol(promiseConstructor);
            if (!checkTypeAssignableTo(promiseConstructorType, globalPromiseConstructorLikeType, node, Diagnostics.Type_0_is_not_a_valid_async_function_return_type)) {
                return unknownType;
            }

            // Verify there is no local declaration that could collide with the promise constructor.
            const promiseName = getEntityNameFromTypeNode(node.type);
            const root = getFirstIdentifier(promiseName);
            const rootSymbol = getSymbol(node.locals, root.text, SymbolFlags.Value);
            if (rootSymbol) {
                error(rootSymbol.valueDeclaration, Diagnostics.Duplicate_identifier_0_Compiler_uses_declaration_1_to_support_async_functions,
                    root.text,
                    getFullyQualifiedName(promiseConstructor));
                return unknownType;
            }

            // Get and return the awaited type of the return type.
            return checkAwaitedType(promiseType, node, Diagnostics.An_async_function_or_method_must_have_a_valid_awaitable_return_type);
        }

        /** Check a decorator */
        function checkDecorator(node: Decorator): void {
            const signature = getResolvedSignature(node);
            const returnType = getReturnTypeOfSignature(signature);
            if (returnType.flags & TypeFlags.Any) {
                return;
            }

            let expectedReturnType: Type;
            const headMessage = getDiagnosticHeadMessageForDecoratorResolution(node);
            let errorInfo: DiagnosticMessageChain;
            switch (node.parent.kind) {
                case SyntaxKind.ClassDeclaration:
                    const classSymbol = getSymbolOfNode(node.parent);
                    const classConstructorType = getTypeOfSymbol(classSymbol);
                    expectedReturnType = getUnionType([classConstructorType, voidType]);
                    break;

                case SyntaxKind.Parameter:
                    expectedReturnType = voidType;
                    errorInfo = chainDiagnosticMessages(
                        errorInfo,
                        Diagnostics.The_return_type_of_a_parameter_decorator_function_must_be_either_void_or_any);

                    break;

                case SyntaxKind.PropertyDeclaration:
                    expectedReturnType = voidType;
                    errorInfo = chainDiagnosticMessages(
                        errorInfo,
                        Diagnostics.The_return_type_of_a_property_decorator_function_must_be_either_void_or_any);
                    break;

                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    const methodType = getTypeOfNode(node.parent);
                    const descriptorType = createTypedPropertyDescriptorType(methodType);
                    expectedReturnType = getUnionType([descriptorType, voidType]);
                    break;
            }

            checkTypeAssignableTo(
                returnType,
                expectedReturnType,
                node,
                headMessage,
                errorInfo);
        }

        /** Checks a type reference node as an expression. */
        function checkTypeNodeAsExpression(node: TypeNode) {
            // When we are emitting type metadata for decorators, we need to try to check the type
            // as if it were an expression so that we can emit the type in a value position when we
            // serialize the type metadata.
            if (node && node.kind === SyntaxKind.TypeReference) {
                const root = getFirstIdentifier((<TypeReferenceNode>node).typeName);
                const meaning = root.parent.kind === SyntaxKind.TypeReference ? SymbolFlags.Type : SymbolFlags.Namespace;
                // Resolve type so we know which symbol is referenced
                const rootSymbol = resolveName(root, root.text, meaning | SymbolFlags.Alias, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined);
                // Resolved symbol is alias
                if (rootSymbol && rootSymbol.flags & SymbolFlags.Alias) {
                    const aliasTarget = resolveAlias(rootSymbol);
                    // If alias has value symbol - mark alias as referenced
                    if (aliasTarget.flags & SymbolFlags.Value && !isConstEnumOrConstEnumOnlyModule(resolveAlias(rootSymbol))) {
                        markAliasSymbolAsReferenced(rootSymbol);
                    }
                }
            }
        }

        /**
          * Checks the type annotation of an accessor declaration or property declaration as
          * an expression if it is a type reference to a type with a value declaration.
          */
        function checkTypeAnnotationAsExpression(node: AccessorDeclaration | PropertyDeclaration | ParameterDeclaration | MethodDeclaration) {
            switch (node.kind) {
                case SyntaxKind.PropertyDeclaration:
                    checkTypeNodeAsExpression((<PropertyDeclaration>node).type);
                    break;
                case SyntaxKind.Parameter:
                    checkTypeNodeAsExpression((<ParameterDeclaration>node).type);
                    break;
                case SyntaxKind.MethodDeclaration:
                    checkTypeNodeAsExpression((<MethodDeclaration>node).type);
                    break;
                case SyntaxKind.GetAccessor:
                    checkTypeNodeAsExpression((<AccessorDeclaration>node).type);
                    break;
                case SyntaxKind.SetAccessor:
                    checkTypeNodeAsExpression(getSetAccessorTypeAnnotationNode(<AccessorDeclaration>node));
                    break;
            }
        }

        /** Checks the type annotation of the parameters of a function/method or the constructor of a class as expressions */
        function checkParameterTypeAnnotationsAsExpressions(node: FunctionLikeDeclaration) {
            // ensure all type annotations with a value declaration are checked as an expression
            for (const parameter of node.parameters) {
                checkTypeAnnotationAsExpression(parameter);
            }
        }

        /** Check the decorators of a node */
        function checkDecorators(node: Node): void {
            if (!node.decorators) {
                return;
            }

            // skip this check for nodes that cannot have decorators. These should have already had an error reported by
            // checkGrammarDecorators.
            if (!nodeCanBeDecorated(node)) {
                return;
            }

            if (!compilerOptions.experimentalDecorators) {
                error(node, Diagnostics.Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Specify_experimentalDecorators_to_remove_this_warning);
            }

            if (compilerOptions.emitDecoratorMetadata) {
                // we only need to perform these checks if we are emitting serialized type metadata for the target of a decorator.
                switch (node.kind) {
                    case SyntaxKind.ClassDeclaration:
                        const constructor = getFirstConstructorWithBody(<ClassDeclaration>node);
                        if (constructor) {
                            checkParameterTypeAnnotationsAsExpressions(constructor);
                        }
                        break;

                    case SyntaxKind.MethodDeclaration:
                        checkParameterTypeAnnotationsAsExpressions(<FunctionLikeDeclaration>node);
                    // fall-through

                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.Parameter:
                        checkTypeAnnotationAsExpression(<PropertyDeclaration | ParameterDeclaration>node);
                        break;
                }
            }

            emitDecorate = true;
            if (node.kind === SyntaxKind.Parameter) {
                emitParam = true;
            }

            forEach(node.decorators, checkDecorator);
        }

        function checkFunctionDeclaration(node: FunctionDeclaration): void {
            if (produceDiagnostics) {
                checkFunctionLikeDeclaration(node) || checkGrammarForGenerator(node);

                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
        }

        function checkFunctionLikeDeclaration(node: FunctionLikeDeclaration): void {
            checkDecorators(node);
            checkSignatureDeclaration(node);
            const isAsync = isAsyncFunctionLike(node);
            if (isAsync) {
                emitAwaiter = true;
            }

            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name && node.name.kind === SyntaxKind.ComputedPropertyName) {
                // This check will account for methods in class/interface declarations,
                // as well as accessors in classes/object literals
                checkComputedPropertyName(<ComputedPropertyName>node.name);
            }

            if (!hasDynamicName(node)) {
                // first we want to check the local symbol that contain this declaration
                // - if node.localSymbol !== undefined - this is current declaration is exported and localSymbol points to the local symbol
                // - if node.localSymbol === undefined - this node is non-exported so we can just pick the result of getSymbolOfNode
                const symbol = getSymbolOfNode(node);
                const localSymbol = node.localSymbol || symbol;

                const firstDeclaration = getDeclarationOfKind(localSymbol, node.kind);
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
            if (node.type && !isAccessor(node.kind) && !node.asteriskToken) {
                const returnType = getTypeFromTypeNode(node.type);
                let promisedType: Type;
                if (isAsync) {
                    promisedType = checkAsyncFunctionReturnType(node);
                }

                checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, isAsync ? promisedType : returnType);
            }

            if (produceDiagnostics && !node.type) {
                // Report an implicit any error if there is no body, no explicit return type, and node is not a private method
                // in an ambient context
                if (compilerOptions.noImplicitAny && nodeIsMissing(node.body) && !isPrivateWithinAmbient(node)) {
                    reportImplicitAnyError(node, anyType);
                }

                if (node.asteriskToken && nodeIsPresent(node.body)) {
                    // A generator with a body and no type annotation can still cause errors. It can error if the
                    // yielded values have no common supertype, or it can give an implicit any error if it has no
                    // yielded values. The only way to trigger these errors is to try checking its return type.
                    getReturnTypeOfSignature(getSignatureFromDeclaration(node));
                }
            }
        }

        function checkBlock(node: Block) {
            // Grammar checking for SyntaxKind.Block
            if (node.kind === SyntaxKind.Block) {
                checkGrammarStatementInAmbientContext(node);
            }

            forEach(node.statements, checkSourceElement);
            if (isFunctionBlock(node) || node.kind === SyntaxKind.ModuleBlock) {
                checkFunctionAndClassExpressionBodies(node);
            }
        }

        function checkCollisionWithArgumentsInGeneratedCode(node: SignatureDeclaration) {
            // no rest parameters \ declaration context \ overload - no codegen impact
            if (!hasRestParameter(node) || isInAmbientContext(node) || nodeIsMissing((<FunctionLikeDeclaration>node).body)) {
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

            const root = getRootDeclaration(node);
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
            let current = node;
            while (current) {
                if (getNodeCheckFlags(current) & NodeCheckFlags.CaptureThis) {
                    const isDeclaration = node.kind !== SyntaxKind.Identifier;
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
            const enclosingClass = getContainingClass(node);
            // if containing type was not found or it is ambient - exit (no codegen)
            if (!enclosingClass || isInAmbientContext(enclosingClass)) {
                return;
            }

            if (getClassExtendsHeritageClauseElement(enclosingClass)) {
                const isDeclaration = node.kind !== SyntaxKind.Identifier;
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
            const parent = getDeclarationContainer(node);
            if (parent.kind === SyntaxKind.SourceFile && isExternalOrCommonJsModule(<SourceFile>parent)) {
                // If the declaration happens to be in external module, report error that require and exports are reserved keywords
                error(name, Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_a_module,
                    declarationNameToString(name), declarationNameToString(name));
            }
        }

        function checkVarDeclaredNamesNotShadowed(node: VariableDeclaration | BindingElement) {
            // - ScriptBody : StatementList
            // It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList
            // also occurs in the VarDeclaredNames of StatementList.

            // - Block : { StatementList }
            // It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList
            // also occurs in the VarDeclaredNames of StatementList.

            // Variable declarations are hoisted to the top of their function scope. They can shadow
            // block scoped declarations, which bind tighter. this will not be flagged as duplicate definition
            // by the binder as the declaration scope is different.
            // A non-initialized declaration is a no-op as the block declaration will resolve before the var
            // declaration. the problem is if the declaration has an initializer. this will act as a write to the
            // block declared value. this is fine for let, but not const.
            // Only consider declarations with initializers, uninitialized const declarations will not
            // step on a let/const variable.
            // Do not consider const and const declarations, as duplicate block-scoped declarations
            // are handled by the binder.
            // We are only looking for const declarations that step on let\const declarations from a
            // different scope. e.g.:
            //      {
            //          const x = 0; // localDeclarationSymbol obtained after name resolution will correspond to this declaration
            //          const x = 0; // symbol for this declaration will be 'symbol'
            //      }

            // skip block-scoped variables and parameters
            if ((getCombinedNodeFlags(node) & NodeFlags.BlockScoped) !== 0 || isParameterDeclaration(node)) {
                return;
            }

            // skip variable declarations that don't have initializers
            // NOTE: in ES6 spec initializer is required in variable declarations where name is binding pattern
            // so we'll always treat binding elements as initialized
            if (node.kind === SyntaxKind.VariableDeclaration && !node.initializer) {
                return;
            }

            const symbol = getSymbolOfNode(node);
            if (symbol.flags & SymbolFlags.FunctionScopedVariable) {
                const localDeclarationSymbol = resolveName(node, (<Identifier>node.name).text, SymbolFlags.Variable, /*nodeNotFoundErrorMessage*/ undefined, /*nameArg*/ undefined);
                if (localDeclarationSymbol &&
                    localDeclarationSymbol !== symbol &&
                    localDeclarationSymbol.flags & SymbolFlags.BlockScopedVariable) {
                    if (getDeclarationFlagsFromSymbol(localDeclarationSymbol) & NodeFlags.BlockScoped) {
                        const varDeclList = getAncestor(localDeclarationSymbol.valueDeclaration, SyntaxKind.VariableDeclarationList);
                        const container =
                            varDeclList.parent.kind === SyntaxKind.VariableStatement && varDeclList.parent.parent
                                ? varDeclList.parent.parent
                                : undefined;

                        // names of block-scoped and function scoped variables can collide only
                        // if block scoped variable is defined in the function\module\source file scope (because of variable hoisting)
                        const namesShareScope =
                            container &&
                            (container.kind === SyntaxKind.Block && isFunctionLike(container.parent) ||
                                container.kind === SyntaxKind.ModuleBlock ||
                                container.kind === SyntaxKind.ModuleDeclaration ||
                                container.kind === SyntaxKind.SourceFile);

                        // here we know that function scoped variable is shadowed by block scoped one
                        // if they are defined in the same scope - binder has already reported redeclaration error
                        // otherwise if variable has an initializer - show error that initialization will fail
                        // since LHS will be block scoped name instead of function scoped
                        if (!namesShareScope) {
                            const name = symbolToString(localDeclarationSymbol);
                            error(node, Diagnostics.Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1, name, name);
                        }
                    }
                }
            }
        }

        // Check that a parameter initializer contains no references to parameters declared to the right of itself
        function checkParameterInitializer(node: VariableLikeDeclaration): void {
            if (getRootDeclaration(node).kind !== SyntaxKind.Parameter) {
                return;
            }

            const func = getContainingFunction(node);
            visit(node.initializer);

            function visit(n: Node) {
                if (n.kind === SyntaxKind.Identifier) {
                    const referencedSymbol = getNodeLinks(n).resolvedSymbol;
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
            checkDecorators(node);
            checkSourceElement(node.type);
            // For a computed property, just check the initializer and exit
            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                checkComputedPropertyName(<ComputedPropertyName>node.name);
                if (node.initializer) {
                    checkExpressionCached(node.initializer);
                }
            }

            if (node.kind === SyntaxKind.BindingElement) {
                // check computed properties inside property names of binding elements
                if (node.propertyName && node.propertyName.kind === SyntaxKind.ComputedPropertyName) {
                    checkComputedPropertyName(<ComputedPropertyName>node.propertyName);
                }
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
            const symbol = getSymbolOfNode(node);
            const type = getTypeOfVariableOrParameterOrProperty(symbol);
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
                const declarationType = getWidenedTypeForVariableLikeDeclaration(node);
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
                if (node.kind === SyntaxKind.VariableDeclaration || node.kind === SyntaxKind.BindingElement) {
                    checkVarDeclaredNamesNotShadowed(<VariableDeclaration | BindingElement>node);
                }
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
            checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarVariableDeclarationList(node.declarationList) || checkGrammarForDisallowedLetOrConstStatement(node);

            forEach(node.declarationList.declarations, checkSourceElement);
        }

        function checkGrammarDisallowedModifiersOnObjectLiteralExpressionMethod(node: Node) {
            // We only disallow modifier on a method declaration if it is a property of object-literal-expression
            if (node.modifiers && node.parent.kind === SyntaxKind.ObjectLiteralExpression) {
                if (isAsyncFunctionLike(node)) {
                    if (node.modifiers.length > 1) {
                        return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                    }
                }
                else {
                    return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                }
            }
        }

        function checkExpressionStatement(node: ExpressionStatement) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);

            checkExpression(node.expression);
        }

        function checkIfStatement(node: IfStatement) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);

            checkExpression(node.expression);
            checkSourceElement(node.thenStatement);

            if (node.thenStatement.kind === SyntaxKind.EmptyStatement) {
                error(node.thenStatement, Diagnostics.The_body_of_an_if_statement_cannot_be_the_empty_statement);
            }

            checkSourceElement(node.elseStatement);
        }

        function checkDoStatement(node: DoStatement) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);

            checkSourceElement(node.statement);
            checkExpression(node.expression);
        }

        function checkWhileStatement(node: WhileStatement) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);

            checkExpression(node.expression);
            checkSourceElement(node.statement);
        }

        function checkForStatement(node: ForStatement) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                if (node.initializer && node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    checkGrammarVariableDeclarationList(<VariableDeclarationList>node.initializer);
                }
            }

            if (node.initializer) {
                if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                    forEach((<VariableDeclarationList>node.initializer).declarations, checkVariableDeclaration);
                }
                else {
                    checkExpression(<Expression>node.initializer);
                }
            }

            if (node.condition) checkExpression(node.condition);
            if (node.incrementor) checkExpression(node.incrementor);
            checkSourceElement(node.statement);
        }

        function checkForOfStatement(node: ForOfStatement): void {
            checkGrammarForInOrForOfStatement(node);

            // Check the LHS and RHS
            // If the LHS is a declaration, just check it as a variable declaration, which will in turn check the RHS
            // via checkRightHandSideOfForOf.
            // If the LHS is an expression, check the LHS, as a destructuring assignment or as a reference.
            // Then check that the RHS is assignable to it.
            if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                checkForInOrForOfVariableDeclaration(node);
            }
            else {
                const varExpr = <Expression>node.initializer;
                const iteratedType = checkRightHandSideOfForOf(node.expression);

                // There may be a destructuring assignment on the left side
                if (varExpr.kind === SyntaxKind.ArrayLiteralExpression || varExpr.kind === SyntaxKind.ObjectLiteralExpression) {
                    // iteratedType may be undefined. In this case, we still want to check the structure of
                    // varExpr, in particular making sure it's a valid LeftHandSideExpression. But we'd like
                    // to short circuit the type relation checking as much as possible, so we pass the unknownType.
                    checkDestructuringAssignment(varExpr, iteratedType || unknownType);
                }
                else {
                    const leftType = checkExpression(varExpr);
                    checkReferenceExpression(varExpr, /*invalidReferenceMessage*/ Diagnostics.Invalid_left_hand_side_in_for_of_statement,
                        /*constantVariableMessage*/ Diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_be_a_previously_defined_constant);

                    // iteratedType will be undefined if the rightType was missing properties/signatures
                    // required to get its iteratedType (like [Symbol.iterator] or next). This may be
                    // because we accessed properties from anyType, or it may have led to an error inside
                    // getElementTypeOfIterable.
                    if (iteratedType) {
                        checkTypeAssignableTo(iteratedType, leftType, varExpr, /*headMessage*/ undefined);
                    }
                }
            }

            checkSourceElement(node.statement);
        }

        function checkForInStatement(node: ForInStatement) {
            // Grammar checking
            checkGrammarForInOrForOfStatement(node);

            // TypeScript 1.0 spec  (April 2014): 5.4
            // In a 'for-in' statement of the form
            // for (let VarDecl in Expr) Statement
            //   VarDecl must be a variable declaration without a type annotation that declares a variable of type Any,
            //   and Expr must be an expression of type Any, an object type, or a type parameter type.
            if (node.initializer.kind === SyntaxKind.VariableDeclarationList) {
                const variable = (<VariableDeclarationList>node.initializer).declarations[0];
                if (variable && isBindingPattern(variable.name)) {
                    error(variable.name, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern);
                }

                checkForInOrForOfVariableDeclaration(node);
            }
            else {
                // In a 'for-in' statement of the form
                // for (Var in Expr) Statement
                //   Var must be an expression classified as a reference of type Any or the String primitive type,
                //   and Expr must be an expression of type Any, an object type, or a type parameter type.
                const varExpr = <Expression>node.initializer;
                const leftType = checkExpression(varExpr);
                if (varExpr.kind === SyntaxKind.ArrayLiteralExpression || varExpr.kind === SyntaxKind.ObjectLiteralExpression) {
                    error(varExpr, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern);
                }
                else if (!isTypeAnyOrAllConstituentTypesHaveKind(leftType, TypeFlags.StringLike)) {
                    error(varExpr, Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                }
                else {
                    // run check only former check succeeded to avoid cascading errors
                    checkReferenceExpression(varExpr, Diagnostics.Invalid_left_hand_side_in_for_in_statement, Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_previously_defined_constant);
                }
            }

            const rightType = checkExpression(node.expression);
            // unknownType is returned i.e. if node.expression is identifier whose name cannot be resolved
            // in this case error about missing name is already reported - do not report extra one
            if (!isTypeAnyOrAllConstituentTypesHaveKind(rightType, TypeFlags.ObjectType | TypeFlags.TypeParameter)) {
                error(node.expression, Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }

            checkSourceElement(node.statement);
        }

        function checkForInOrForOfVariableDeclaration(iterationStatement: ForInStatement | ForOfStatement): void {
            const variableDeclarationList = <VariableDeclarationList>iterationStatement.initializer;
            // checkGrammarForInOrForOfStatement will check that there is exactly one declaration.
            if (variableDeclarationList.declarations.length >= 1) {
                const decl = variableDeclarationList.declarations[0];
                checkVariableDeclaration(decl);
            }
        }

        function checkRightHandSideOfForOf(rhsExpression: Expression): Type {
            const expressionType = getTypeOfExpression(rhsExpression);
            return checkIteratedTypeOrElementType(expressionType, rhsExpression, /*allowStringInput*/ true);
        }

        function checkIteratedTypeOrElementType(inputType: Type, errorNode: Node, allowStringInput: boolean): Type {
            if (isTypeAny(inputType)) {
                return inputType;
            }

            if (languageVersion >= ScriptTarget.ES6) {
                return checkElementTypeOfIterable(inputType, errorNode);
            }

            if (allowStringInput) {
                return checkElementTypeOfArrayOrString(inputType, errorNode);
            }

            if (isArrayLikeType(inputType)) {
                const indexType = getIndexTypeOfType(inputType, IndexKind.Number);
                if (indexType) {
                    return indexType;
                }
            }

            error(errorNode, Diagnostics.Type_0_is_not_an_array_type, typeToString(inputType));
            return unknownType;
        }

        /**
         * When errorNode is undefined, it means we should not report any errors.
         */
        function checkElementTypeOfIterable(iterable: Type, errorNode: Node): Type {
            const elementType = getElementTypeOfIterable(iterable, errorNode);
            // Now even though we have extracted the iteratedType, we will have to validate that the type
            // passed in is actually an Iterable.
            if (errorNode && elementType) {
                checkTypeAssignableTo(iterable, createIterableType(elementType), errorNode);
            }

            return elementType || anyType;
        }

        /**
         * We want to treat type as an iterable, and get the type it is an iterable of. The iterable
         * must have the following structure (annotated with the names of the variables below):
         *
         * { // iterable
         *     [Symbol.iterator]: { // iteratorFunction
         *         (): Iterator<T>
         *     }
         * }
         *
         * T is the type we are after. At every level that involves analyzing return types
         * of signatures, we union the return types of all the signatures.
         *
         * Another thing to note is that at any step of this process, we could run into a dead end,
         * meaning either the property is missing, or we run into the anyType. If either of these things
         * happens, we return undefined to signal that we could not find the iterated type. If a property
         * is missing, and the previous step did not result in 'any', then we also give an error if the
         * caller requested it. Then the caller can decide what to do in the case where there is no iterated
         * type. This is different from returning anyType, because that would signify that we have matched the
         * whole pattern and that T (above) is 'any'.
         */
        function getElementTypeOfIterable(type: Type, errorNode: Node): Type {
            if (isTypeAny(type)) {
                return undefined;
            }

            const typeAsIterable = <IterableOrIteratorType>type;
            if (!typeAsIterable.iterableElementType) {
                // As an optimization, if the type is instantiated directly using the globalIterableType (Iterable<number>),
                // then just grab its type argument.
                if ((type.flags & TypeFlags.Reference) && (<GenericType>type).target === globalIterableType) {
                    typeAsIterable.iterableElementType = (<GenericType>type).typeArguments[0];
                }
                else {
                    const iteratorFunction = getTypeOfPropertyOfType(type, getPropertyNameForKnownSymbolName("iterator"));
                    if (isTypeAny(iteratorFunction)) {
                        return undefined;
                    }

                    const iteratorFunctionSignatures = iteratorFunction ? getSignaturesOfType(iteratorFunction, SignatureKind.Call) : emptyArray;
                    if (iteratorFunctionSignatures.length === 0) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator);
                        }
                        return undefined;
                    }

                    typeAsIterable.iterableElementType = getElementTypeOfIterator(getUnionType(map(iteratorFunctionSignatures, getReturnTypeOfSignature)), errorNode);
                }
            }

            return typeAsIterable.iterableElementType;
        }

        /**
         * This function has very similar logic as getElementTypeOfIterable, except that it operates on
         * Iterators instead of Iterables. Here is the structure:
         *
         *  { // iterator
         *      next: { // iteratorNextFunction
         *          (): { // iteratorNextResult
         *              value: T // iteratorNextValue
         *          }
         *      }
         *  }
         *
         */
        function getElementTypeOfIterator(type: Type, errorNode: Node): Type {
            if (isTypeAny(type)) {
                return undefined;
            }

            const typeAsIterator = <IterableOrIteratorType>type;
            if (!typeAsIterator.iteratorElementType) {
                // As an optimization, if the type is instantiated directly using the globalIteratorType (Iterator<number>),
                // then just grab its type argument.
                if ((type.flags & TypeFlags.Reference) && (<GenericType>type).target === globalIteratorType) {
                    typeAsIterator.iteratorElementType = (<GenericType>type).typeArguments[0];
                }
                else {
                    const iteratorNextFunction = getTypeOfPropertyOfType(type, "next");
                    if (isTypeAny(iteratorNextFunction)) {
                        return undefined;
                    }

                    const iteratorNextFunctionSignatures = iteratorNextFunction ? getSignaturesOfType(iteratorNextFunction, SignatureKind.Call) : emptyArray;
                    if (iteratorNextFunctionSignatures.length === 0) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.An_iterator_must_have_a_next_method);
                        }
                        return undefined;
                    }

                    const iteratorNextResult = getUnionType(map(iteratorNextFunctionSignatures, getReturnTypeOfSignature));
                    if (isTypeAny(iteratorNextResult)) {
                        return undefined;
                    }

                    const iteratorNextValue = getTypeOfPropertyOfType(iteratorNextResult, "value");
                    if (!iteratorNextValue) {
                        if (errorNode) {
                            error(errorNode, Diagnostics.The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property);
                        }
                        return undefined;
                    }

                    typeAsIterator.iteratorElementType = iteratorNextValue;
                }
            }

            return typeAsIterator.iteratorElementType;
        }

        function getElementTypeOfIterableIterator(type: Type): Type {
            if (isTypeAny(type)) {
                return undefined;
            }

            // As an optimization, if the type is instantiated directly using the globalIterableIteratorType (IterableIterator<number>),
            // then just grab its type argument.
            if ((type.flags & TypeFlags.Reference) && (<GenericType>type).target === globalIterableIteratorType) {
                return (<GenericType>type).typeArguments[0];
            }

            return getElementTypeOfIterable(type, /*errorNode*/ undefined) ||
                getElementTypeOfIterator(type, /*errorNode*/ undefined);
        }

        /**
         * This function does the following steps:
         *   1. Break up arrayOrStringType (possibly a union) into its string constituents and array constituents.
         *   2. Take the element types of the array constituents.
         *   3. Return the union of the element types, and string if there was a string constitutent.
         *
         * For example:
         *     string -> string
         *     number[] -> number
         *     string[] | number[] -> string | number
         *     string | number[] -> string | number
         *     string | string[] | number[] -> string | number
         *
         * It also errors if:
         *   1. Some constituent is neither a string nor an array.
         *   2. Some constituent is a string and target is less than ES5 (because in ES3 string is not indexable).
         */
        function checkElementTypeOfArrayOrString(arrayOrStringType: Type, errorNode: Node): Type {
            Debug.assert(languageVersion < ScriptTarget.ES6);

            // After we remove all types that are StringLike, we will know if there was a string constituent
            // based on whether the remaining type is the same as the initial type.
            let arrayType = arrayOrStringType;
            if (arrayOrStringType.flags & TypeFlags.Union) {
                arrayType = getUnionType(filter((arrayOrStringType as UnionType).types, t => !(t.flags & TypeFlags.StringLike)));
            }
            else if (arrayOrStringType.flags & TypeFlags.StringLike) {
                arrayType = emptyUnionType;
            }
            const hasStringConstituent = arrayOrStringType !== arrayType;
            let reportedError = false;
            if (hasStringConstituent) {
                if (languageVersion < ScriptTarget.ES5) {
                    error(errorNode, Diagnostics.Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher);
                    reportedError = true;
                }

                // Now that we've removed all the StringLike types, if no constituents remain, then the entire
                // arrayOrStringType was a string.
                if (arrayType === emptyObjectType) {
                    return stringType;
                }
            }

            if (!isArrayLikeType(arrayType)) {
                if (!reportedError) {
                    // Which error we report depends on whether there was a string constituent. For example,
                    // if the input type is number | string, we want to say that number is not an array type.
                    // But if the input was just number, we want to say that number is not an array type
                    // or a string type.
                    const diagnostic = hasStringConstituent
                        ? Diagnostics.Type_0_is_not_an_array_type
                        : Diagnostics.Type_0_is_not_an_array_type_or_a_string_type;
                    error(errorNode, diagnostic, typeToString(arrayType));
                }
                return hasStringConstituent ? stringType : unknownType;
            }

            const arrayElementType = getIndexTypeOfType(arrayType, IndexKind.Number) || unknownType;
            if (hasStringConstituent) {
                // This is just an optimization for the case where arrayOrStringType is string | string[]
                if (arrayElementType.flags & TypeFlags.StringLike) {
                    return stringType;
                }

                return getUnionType([arrayElementType, stringType]);
            }

            return arrayElementType;
        }

        function checkBreakOrContinueStatement(node: BreakOrContinueStatement) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node) || checkGrammarBreakOrContinueStatement(node);

            // TODO: Check that target label is valid
        }

        function isGetAccessorWithAnnotatatedSetAccessor(node: FunctionLikeDeclaration) {
            return !!(node.kind === SyntaxKind.GetAccessor && getSetAccessorTypeAnnotationNode(<AccessorDeclaration>getDeclarationOfKind(node.symbol, SyntaxKind.SetAccessor)));
        }

        function checkReturnStatement(node: ReturnStatement) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                const functionBlock = getContainingFunction(node);
                if (!functionBlock) {
                    grammarErrorOnFirstToken(node, Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
                }
            }

            if (node.expression) {
                const func = getContainingFunction(node);
                if (func) {
                    const signature = getSignatureFromDeclaration(func);
                    const returnType = getReturnTypeOfSignature(signature);
                    const exprType = checkExpressionCached(node.expression);

                    if (func.asteriskToken) {
                        // A generator does not need its return expressions checked against its return type.
                        // Instead, the yield expressions are checked against the element type.
                        // TODO: Check return expressions of generators when return type tracking is added
                        // for generators.
                        return;
                    }

                    if (func.kind === SyntaxKind.SetAccessor) {
                        error(node.expression, Diagnostics.Setters_cannot_return_a_value);
                    }
                    else if (func.kind === SyntaxKind.Constructor) {
                        if (!checkTypeAssignableTo(exprType, returnType, node.expression)) {
                            error(node.expression, Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                        }
                    }
                    else if (func.type || isGetAccessorWithAnnotatatedSetAccessor(func) || signature.typePredicate) {
                        if (isAsyncFunctionLike(func)) {
                            const promisedType = getPromisedType(returnType);
                            const awaitedType = checkAwaitedType(exprType, node.expression, Diagnostics.Return_expression_in_async_function_does_not_have_a_valid_callable_then_member);
                            if (promisedType) {
                                // If the function has a return type, but promisedType is
                                // undefined, an error will be reported in checkAsyncFunctionReturnType
                                // so we don't need to report one here.
                                checkTypeAssignableTo(awaitedType, promisedType, node.expression);
                            }
                        }
                        else {
                            checkTypeAssignableTo(exprType, returnType, node.expression);
                        }
                    }
                }
            }
        }

        function checkWithStatement(node: WithStatement) {
            // Grammar checking for withStatement
            if (!checkGrammarStatementInAmbientContext(node)) {
                if (node.parserContextFlags & ParserContextFlags.Await) {
                    grammarErrorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_an_async_function_block);
                }
            }

            checkExpression(node.expression);
            error(node.expression, Diagnostics.All_symbols_within_a_with_block_will_be_resolved_to_any);
        }

        function checkSwitchStatement(node: SwitchStatement) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);

            let firstDefaultClause: CaseOrDefaultClause;
            let hasDuplicateDefaultClause = false;

            const expressionType = checkExpression(node.expression);
            const expressionTypeIsStringLike = someConstituentTypeHasKind(expressionType, TypeFlags.StringLike);
            forEach(node.caseBlock.clauses, clause => {
                // Grammar check for duplicate default clauses, skip if we already report duplicate default clause
                if (clause.kind === SyntaxKind.DefaultClause && !hasDuplicateDefaultClause) {
                    if (firstDefaultClause === undefined) {
                        firstDefaultClause = clause;
                    }
                    else {
                        const sourceFile = getSourceFileOfNode(node);
                        const start = skipTrivia(sourceFile.text, clause.pos);
                        const end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                        grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
                        hasDuplicateDefaultClause = true;
                    }
                }

                if (produceDiagnostics && clause.kind === SyntaxKind.CaseClause) {
                    const caseClause = <CaseClause>clause;
                    // TypeScript 1.0 spec (April 2014):5.9
                    // In a 'switch' statement, each 'case' expression must be of a type that is assignable to or from the type of the 'switch' expression.
                    const caseType = checkExpression(caseClause.expression);

                    const expressionTypeIsAssignableToCaseType =
                        // Permit 'number[] | "foo"' to be asserted to 'string'.
                        (expressionTypeIsStringLike && someConstituentTypeHasKind(caseType, TypeFlags.StringLike)) ||
                        isTypeAssignableTo(expressionType, caseType);

                    if (!expressionTypeIsAssignableToCaseType) {
                        // 'expressionType is not assignable to caseType', try the reversed check and report errors if it fails
                        checkTypeAssignableTo(caseType, expressionType, caseClause.expression, /*headMessage*/ undefined);
                    }
                }
                forEach(clause.statements, checkSourceElement);
            });
        }

        function checkLabeledStatement(node: LabeledStatement) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                let current = node.parent;
                while (current) {
                    if (isFunctionLike(current)) {
                        break;
                    }
                    if (current.kind === SyntaxKind.LabeledStatement && (<LabeledStatement>current).label.text === node.label.text) {
                        const sourceFile = getSourceFileOfNode(node);
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
            if (!checkGrammarStatementInAmbientContext(node)) {
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
            checkGrammarStatementInAmbientContext(node);

            checkBlock(node.tryBlock);
            const catchClause = node.catchClause;
            if (catchClause) {
                // Grammar checking
                if (catchClause.variableDeclaration) {
                    if (catchClause.variableDeclaration.name.kind !== SyntaxKind.Identifier) {
                        grammarErrorOnFirstToken(catchClause.variableDeclaration.name, Diagnostics.Catch_clause_variable_name_must_be_an_identifier);
                    }
                    else if (catchClause.variableDeclaration.type) {
                        grammarErrorOnFirstToken(catchClause.variableDeclaration.type, Diagnostics.Catch_clause_variable_cannot_have_a_type_annotation);
                    }
                    else if (catchClause.variableDeclaration.initializer) {
                        grammarErrorOnFirstToken(catchClause.variableDeclaration.initializer, Diagnostics.Catch_clause_variable_cannot_have_an_initializer);
                    }
                    else {
                        const identifierName = (<Identifier>catchClause.variableDeclaration.name).text;
                        const locals = catchClause.block.locals;
                        if (locals && hasProperty(locals, identifierName)) {
                            const localSymbol = locals[identifierName];
                            if (localSymbol && (localSymbol.flags & SymbolFlags.BlockScopedVariable) !== 0) {
                                grammarErrorOnNode(localSymbol.valueDeclaration, Diagnostics.Cannot_redeclare_identifier_0_in_catch_clause, identifierName);
                            }
                        }
                    }
                }

                checkBlock(catchClause.block);
            }

            if (node.finallyBlock) {
                checkBlock(node.finallyBlock);
            }
        }

        function checkIndexConstraints(type: Type) {
            const declaredNumberIndexer = getIndexDeclarationOfSymbol(type.symbol, IndexKind.Number);
            const declaredStringIndexer = getIndexDeclarationOfSymbol(type.symbol, IndexKind.String);

            const stringIndexType = getIndexTypeOfType(type, IndexKind.String);
            const numberIndexType = getIndexTypeOfType(type, IndexKind.Number);

            if (stringIndexType || numberIndexType) {
                forEach(getPropertiesOfObjectType(type), prop => {
                    const propType = getTypeOfSymbol(prop);
                    checkIndexConstraintForProperty(prop, propType, type, declaredStringIndexer, stringIndexType, IndexKind.String);
                    checkIndexConstraintForProperty(prop, propType, type, declaredNumberIndexer, numberIndexType, IndexKind.Number);
                });

                if (type.flags & TypeFlags.Class && isClassLike(type.symbol.valueDeclaration)) {
                    const classDeclaration = <ClassLikeDeclaration>type.symbol.valueDeclaration;
                    for (const member of classDeclaration.members) {
                        // Only process instance properties with computed names here.
                        // Static properties cannot be in conflict with indexers,
                        // and properties with literal names were already checked.
                        if (!(member.flags & NodeFlags.Static) && hasDynamicName(member)) {
                            const propType = getTypeOfSymbol(member.symbol);
                            checkIndexConstraintForProperty(member.symbol, propType, type, declaredStringIndexer, stringIndexType, IndexKind.String);
                            checkIndexConstraintForProperty(member.symbol, propType, type, declaredNumberIndexer, numberIndexType, IndexKind.Number);
                        }
                    }
                }
            }

            let errorNode: Node;
            if (stringIndexType && numberIndexType) {
                errorNode = declaredNumberIndexer || declaredStringIndexer;
                // condition 'errorNode === undefined' may appear if types does not declare nor string neither number indexer
                if (!errorNode && (type.flags & TypeFlags.Interface)) {
                    const someBaseTypeHasBothIndexers = forEach(getBaseTypes(<InterfaceType>type), base => getIndexTypeOfType(base, IndexKind.String) && getIndexTypeOfType(base, IndexKind.Number));
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
                let errorNode: Node;
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
                    const someBaseClassHasBothPropertyAndIndexer = forEach(getBaseTypes(<InterfaceType>containingType), base => getPropertyOfObjectType(base, prop.name) && getIndexTypeOfType(base, indexKind));
                    errorNode = someBaseClassHasBothPropertyAndIndexer ? undefined : containingType.symbol.declarations[0];
                }

                if (errorNode && !isTypeAssignableTo(propertyType, indexType)) {
                    const errorMessage =
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
                case "symbol":
                case "void":
                    error(name, message, (<Identifier>name).text);
            }
        }

        // Check each type parameter and check that list has no duplicate type parameter declarations
        function checkTypeParameters(typeParameterDeclarations: TypeParameterDeclaration[]) {
            if (typeParameterDeclarations) {
                for (let i = 0, n = typeParameterDeclarations.length; i < n; i++) {
                    const node = typeParameterDeclarations[i];
                    checkTypeParameter(node);

                    if (produceDiagnostics) {
                        for (let j = 0; j < i; j++) {
                            if (typeParameterDeclarations[j].symbol === node.symbol) {
                                error(node.name, Diagnostics.Duplicate_identifier_0, declarationNameToString(node.name));
                            }
                        }
                    }
                }
            }
        }

        function checkClassExpression(node: ClassExpression): Type {
            checkClassLikeDeclaration(node);
            return getTypeOfSymbol(getSymbolOfNode(node));
        }

        function checkClassDeclaration(node: ClassDeclaration) {
            if (!node.name && !(node.flags & NodeFlags.Default)) {
                grammarErrorOnFirstToken(node, Diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name);
            }
            checkClassLikeDeclaration(node);

            forEach(node.members, checkSourceElement);
        }

        function checkClassLikeDeclaration(node: ClassLikeDeclaration) {
            checkGrammarClassDeclarationHeritageClauses(node);
            checkDecorators(node);
            if (node.name) {
                checkTypeNameIsReserved(node.name, Diagnostics.Class_name_cannot_be_0);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
            checkTypeParameters(node.typeParameters);
            checkExportsOnMergedDeclarations(node);
            const symbol = getSymbolOfNode(node);
            const type = <InterfaceType>getDeclaredTypeOfSymbol(symbol);
            const typeWithThis = getTypeWithThisArgument(type);
            const staticType = <ObjectType>getTypeOfSymbol(symbol);

            const baseTypeNode = getClassExtendsHeritageClauseElement(node);
            if (baseTypeNode) {
                emitExtends = emitExtends || !isInAmbientContext(node);
                const baseTypes = getBaseTypes(type);
                if (baseTypes.length && produceDiagnostics) {
                    const baseType = baseTypes[0];
                    const staticBaseType = getBaseConstructorTypeOfClass(type);
                    checkSourceElement(baseTypeNode.expression);
                    if (baseTypeNode.typeArguments) {
                        forEach(baseTypeNode.typeArguments, checkSourceElement);
                        for (const constructor of getConstructorsForTypeArguments(staticBaseType, baseTypeNode.typeArguments)) {
                            if (!checkTypeArgumentConstraints(constructor.typeParameters, baseTypeNode.typeArguments)) {
                                break;
                            }
                        }
                    }
                    checkTypeAssignableTo(typeWithThis, getTypeWithThisArgument(baseType, type.thisType), node.name || node, Diagnostics.Class_0_incorrectly_extends_base_class_1);
                    checkTypeAssignableTo(staticType, getTypeWithoutSignatures(staticBaseType), node.name || node,
                        Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);

                    if (!(staticBaseType.symbol && staticBaseType.symbol.flags & SymbolFlags.Class)) {
                        // When the static base type is a "class-like" constructor function (but not actually a class), we verify
                        // that all instantiated base constructor signatures return the same type. We can simply compare the type
                        // references (as opposed to checking the structure of the types) because elsewhere we have already checked
                        // that the base type is a class or interface type (and not, for example, an anonymous object type).
                        const constructors = getInstantiatedConstructorsForTypeArguments(staticBaseType, baseTypeNode.typeArguments);
                        if (forEach(constructors, sig => getReturnTypeOfSignature(sig) !== baseType)) {
                            error(baseTypeNode.expression, Diagnostics.Base_constructors_must_all_have_the_same_return_type);
                        }
                    }
                    checkKindsOfPropertyMemberOverrides(type, baseType);
                }
            }

            const implementedTypeNodes = getClassImplementsHeritageClauseElements(node);
            if (implementedTypeNodes) {
                for (const typeRefNode of implementedTypeNodes) {
                    if (!isSupportedExpressionWithTypeArguments(typeRefNode)) {
                        error(typeRefNode.expression, Diagnostics.A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments);
                    }
                    checkTypeReferenceNode(typeRefNode);
                    if (produceDiagnostics) {
                        const t = getTypeFromTypeNode(typeRefNode);
                        if (t !== unknownType) {
                            const declaredType = (t.flags & TypeFlags.Reference) ? (<TypeReference>t).target : t;
                            if (declaredType.flags & (TypeFlags.Class | TypeFlags.Interface)) {
                                checkTypeAssignableTo(typeWithThis, getTypeWithThisArgument(t, type.thisType), node.name || node, Diagnostics.Class_0_incorrectly_implements_interface_1);
                            }
                            else {
                                error(typeRefNode, Diagnostics.A_class_may_only_implement_another_class_or_interface);
                            }
                        }
                    }
                }
            }

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

        function getClassLikeDeclarationOfSymbol(symbol: Symbol): Declaration {
            return forEach(symbol.declarations, d => isClassLike(d) ? d : undefined);
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
            const baseProperties = getPropertiesOfObjectType(baseType);
            for (const baseProperty of baseProperties) {
                const base = getTargetSymbol(baseProperty);

                if (base.flags & SymbolFlags.Prototype) {
                    continue;
                }

                const derived = getTargetSymbol(getPropertyOfObjectType(type, base.name));
                const baseDeclarationFlags = getDeclarationFlagsFromSymbol(base);

                Debug.assert(!!derived, "derived should point to something, even if it is the base class' declaration.");

                if (derived) {
                    // In order to resolve whether the inherited method was overriden in the base class or not,
                    // we compare the Symbols obtained. Since getTargetSymbol returns the symbol on the *uninstantiated*
                    // type declaration, derived and base resolve to the same symbol even in the case of generic classes.
                    if (derived === base) {
                        // derived class inherits base without override/redeclaration

                        const derivedClassDecl = getClassLikeDeclarationOfSymbol(type.symbol);

                        // It is an error to inherit an abstract member without implementing it or being declared abstract.
                        // If there is no declaration for the derived class (as in the case of class expressions),
                        // then the class cannot be declared abstract.
                        if (baseDeclarationFlags & NodeFlags.Abstract && (!derivedClassDecl || !(derivedClassDecl.flags & NodeFlags.Abstract))) {
                            if (derivedClassDecl.kind === SyntaxKind.ClassExpression) {
                                error(derivedClassDecl, Diagnostics.Non_abstract_class_expression_does_not_implement_inherited_abstract_member_0_from_class_1,
                                    symbolToString(baseProperty), typeToString(baseType));
                            }
                            else {
                                error(derivedClassDecl, Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2,
                                    typeToString(type), symbolToString(baseProperty), typeToString(baseType));
                            }
                        }
                    }
                    else {
                        // derived overrides base.
                        const derivedDeclarationFlags = getDeclarationFlagsFromSymbol(derived);
                        if ((baseDeclarationFlags & NodeFlags.Private) || (derivedDeclarationFlags & NodeFlags.Private)) {
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

                        let errorMessage: DiagnosticMessage;
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
            for (let i = 0, len = list1.length; i < len; i++) {
                const tp1 = list1[i];
                const tp2 = list2[i];
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
            const baseTypes = getBaseTypes(type);
            if (baseTypes.length < 2) {
                return true;
            }

            const seen: Map<{ prop: Symbol; containingType: Type }> = {};
            forEach(resolveDeclaredMembers(type).declaredProperties, p => { seen[p.name] = { prop: p, containingType: type }; });
            let ok = true;

            for (const base of baseTypes) {
                const properties = getPropertiesOfObjectType(getTypeWithThisArgument(base, type.thisType));
                for (const prop of properties) {
                    if (!hasProperty(seen, prop.name)) {
                        seen[prop.name] = { prop: prop, containingType: base };
                    }
                    else {
                        const existing = seen[prop.name];
                        const isInheritedProperty = existing.containingType !== type;
                        if (isInheritedProperty && !isPropertyIdenticalTo(existing.prop, prop)) {
                            ok = false;

                            const typeName1 = typeToString(existing.containingType);
                            const typeName2 = typeToString(base);

                            let errorInfo = chainDiagnosticMessages(undefined, Diagnostics.Named_property_0_of_types_1_and_2_are_not_identical, symbolToString(prop), typeName1, typeName2);
                            errorInfo = chainDiagnosticMessages(errorInfo, Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2, typeToString(type), typeName1, typeName2);
                            diagnostics.add(createDiagnosticForNodeFromMessageChain(typeNode, errorInfo));
                        }
                    }
                }
            }

            return ok;
        }

        function checkInterfaceDeclaration(node: InterfaceDeclaration) {
            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarInterfaceDeclaration(node);

            checkTypeParameters(node.typeParameters);
            if (produceDiagnostics) {
                checkTypeNameIsReserved(node.name, Diagnostics.Interface_name_cannot_be_0);

                checkExportsOnMergedDeclarations(node);
                const symbol = getSymbolOfNode(node);
                const firstInterfaceDecl = <InterfaceDeclaration>getDeclarationOfKind(symbol, SyntaxKind.InterfaceDeclaration);
                if (symbol.declarations.length > 1) {
                    if (node !== firstInterfaceDecl && !areTypeParametersIdentical(firstInterfaceDecl.typeParameters, node.typeParameters)) {
                        error(node.name, Diagnostics.All_declarations_of_an_interface_must_have_identical_type_parameters);
                    }
                }

                // Only check this symbol once
                if (node === firstInterfaceDecl) {
                    const type = <InterfaceType>getDeclaredTypeOfSymbol(symbol);
                    const typeWithThis = getTypeWithThisArgument(type);
                    // run subsequent checks only if first set succeeded
                    if (checkInheritedPropertiesAreIdentical(type, node.name)) {
                        for (const baseType of getBaseTypes(type)) {
                            checkTypeAssignableTo(typeWithThis, getTypeWithThisArgument(baseType, type.thisType), node.name, Diagnostics.Interface_0_incorrectly_extends_interface_1);
                        }
                        checkIndexConstraints(type);
                    }
                }
            }
            forEach(getInterfaceBaseTypeNodes(node), heritageElement => {
                if (!isSupportedExpressionWithTypeArguments(heritageElement)) {
                    error(heritageElement.expression, Diagnostics.An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments);
                }
                checkTypeReferenceNode(heritageElement);
            });

            forEach(node.members, checkSourceElement);

            if (produceDiagnostics) {
                checkTypeForDuplicateIndexSignatures(node);
            }
        }

        function checkTypeAliasDeclaration(node: TypeAliasDeclaration) {
            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarModifiers(node);

            checkTypeNameIsReserved(node.name, Diagnostics.Type_alias_name_cannot_be_0);
            checkSourceElement(node.type);
        }

        function computeEnumMemberValues(node: EnumDeclaration) {
            const nodeLinks = getNodeLinks(node);

            if (!(nodeLinks.flags & NodeCheckFlags.EnumValuesComputed)) {
                const enumSymbol = getSymbolOfNode(node);
                const enumType = getDeclaredTypeOfSymbol(enumSymbol);
                let autoValue = 0; // set to undefined when enum member is non-constant
                const ambient = isInAmbientContext(node);
                const enumIsConst = isConst(node);

                for (const member of node.members) {
                    if (isComputedNonLiteralName(<PropertyName>member.name)) {
                        error(member.name, Diagnostics.Computed_property_names_are_not_allowed_in_enums);
                    }
                    else {
                        const text = getTextOfPropertyName(<PropertyName>member.name);
                        if (isNumericLiteralName(text)) {
                            error(member.name, Diagnostics.An_enum_member_cannot_have_a_numeric_name);
                        }
                    }

                    const previousEnumMemberIsNonConstant = autoValue === undefined;

                    const initializer = member.initializer;
                    if (initializer) {
                        autoValue = computeConstantValueForEnumMemberInitializer(initializer, enumType, enumIsConst, ambient);
                    }
                    else if (ambient && !enumIsConst) {
                        // In ambient enum declarations that specify no const modifier, enum member declarations
                        // that omit a value are considered computed members (as opposed to having auto-incremented values assigned).
                        autoValue = undefined;
                    }
                    else if (previousEnumMemberIsNonConstant) {
                        // If the member declaration specifies no value, the member is considered a constant enum member.
                        // If the member is the first member in the enum declaration, it is assigned the value zero.
                        // Otherwise, it is assigned the value of the immediately preceding member plus one,
                        // and an error occurs if the immediately preceding member is not a constant enum member
                        error(member.name, Diagnostics.Enum_member_must_have_initializer);
                    }

                    if (autoValue !== undefined) {
                        getNodeLinks(member).enumMemberValue = autoValue++;
                    }
                }

                nodeLinks.flags |= NodeCheckFlags.EnumValuesComputed;
            }

            function computeConstantValueForEnumMemberInitializer(initializer: Expression, enumType: Type, enumIsConst: boolean, ambient: boolean): number {
                // Controls if error should be reported after evaluation of constant value is completed
                // Can be false if another more precise error was already reported during evaluation.
                let reportError = true;
                const value = evalConstant(initializer);

                if (reportError) {
                    if (value === undefined) {
                        if (enumIsConst) {
                            error(initializer, Diagnostics.In_const_enum_declarations_member_initializer_must_be_constant_expression);
                        }
                        else if (ambient) {
                            error(initializer, Diagnostics.In_ambient_enum_declarations_member_initializer_must_be_constant_expression);
                        }
                        else {
                            // Only here do we need to check that the initializer is assignable to the enum type.
                            checkTypeAssignableTo(checkExpression(initializer), enumType, initializer, /*headMessage*/ undefined);
                        }
                    }
                    else if (enumIsConst) {
                        if (isNaN(value)) {
                            error(initializer, Diagnostics.const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN);
                        }
                        else if (!isFinite(value)) {
                            error(initializer, Diagnostics.const_enum_member_initializer_was_evaluated_to_a_non_finite_value);
                        }
                    }
                }

                return value;

                function evalConstant(e: Node): number {
                    switch (e.kind) {
                        case SyntaxKind.PrefixUnaryExpression:
                            const value = evalConstant((<PrefixUnaryExpression>e).operand);
                            if (value === undefined) {
                                return undefined;
                            }
                            switch ((<PrefixUnaryExpression>e).operator) {
                                case SyntaxKind.PlusToken: return value;
                                case SyntaxKind.MinusToken: return -value;
                                case SyntaxKind.TildeToken: return ~value;
                            }
                            return undefined;
                        case SyntaxKind.BinaryExpression:
                            const left = evalConstant((<BinaryExpression>e).left);
                            if (left === undefined) {
                                return undefined;
                            }
                            const right = evalConstant((<BinaryExpression>e).right);
                            if (right === undefined) {
                                return undefined;
                            }
                            switch ((<BinaryExpression>e).operatorToken.kind) {
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
                            return evalConstant((<ParenthesizedExpression>e).expression);
                        case SyntaxKind.Identifier:
                        case SyntaxKind.ElementAccessExpression:
                        case SyntaxKind.PropertyAccessExpression:
                            const member = initializer.parent;
                            const currentType = getTypeOfSymbol(getSymbolOfNode(member.parent));
                            let enumType: Type;
                            let propertyName: string;

                            if (e.kind === SyntaxKind.Identifier) {
                                // unqualified names can refer to member that reside in different declaration of the enum so just doing name resolution won't work.
                                // instead pick current enum type and later try to fetch member from the type
                                enumType = currentType;
                                propertyName = (<Identifier>e).text;
                            }
                            else {
                                let expression: Expression;
                                if (e.kind === SyntaxKind.ElementAccessExpression) {
                                    if ((<ElementAccessExpression>e).argumentExpression === undefined ||
                                        (<ElementAccessExpression>e).argumentExpression.kind !== SyntaxKind.StringLiteral) {
                                        return undefined;
                                    }
                                    expression = (<ElementAccessExpression>e).expression;
                                    propertyName = (<LiteralExpression>(<ElementAccessExpression>e).argumentExpression).text;
                                }
                                else {
                                    expression = (<PropertyAccessExpression>e).expression;
                                    propertyName = (<PropertyAccessExpression>e).name.text;
                                }

                                // expression part in ElementAccess\PropertyAccess should be either identifier or dottedName
                                let current = expression;
                                while (current) {
                                    if (current.kind === SyntaxKind.Identifier) {
                                        break;
                                    }
                                    else if (current.kind === SyntaxKind.PropertyAccessExpression) {
                                        current = (<ElementAccessExpression>current).expression;
                                    }
                                    else {
                                        return undefined;
                                    }
                                }

                                enumType = checkExpression(expression);
                                // allow references to constant members of other enums
                                if (!(enumType.symbol && (enumType.symbol.flags & SymbolFlags.Enum))) {
                                    return undefined;
                                }
                            }

                            if (propertyName === undefined) {
                                return undefined;
                            }

                            const property = getPropertyOfObjectType(enumType, propertyName);
                            if (!property || !(property.flags & SymbolFlags.EnumMember)) {
                                return undefined;
                            }

                            const propertyDecl = property.valueDeclaration;
                            // self references are illegal
                            if (member === propertyDecl) {
                                return undefined;
                            }

                            // illegal case: forward reference
                            if (!isBlockScopedNameDeclaredBeforeUse(propertyDecl, member)) {
                                reportError = false;
                                error(e, Diagnostics.A_member_initializer_in_a_enum_declaration_cannot_reference_members_declared_after_it_including_members_defined_in_other_enums);
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
            checkGrammarDecorators(node) || checkGrammarModifiers(node);

            checkTypeNameIsReserved(node.name, Diagnostics.Enum_name_cannot_be_0);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);

            computeEnumMemberValues(node);

            const enumIsConst = isConst(node);
            if (compilerOptions.isolatedModules && enumIsConst && isInAmbientContext(node)) {
                error(node.name, Diagnostics.Ambient_const_enums_are_not_allowed_when_the_isolatedModules_flag_is_provided);
            }

            // Spec 2014 - Section 9.3:
            // It isn't possible for one enum declaration to continue the automatic numbering sequence of another,
            // and when an enum type has multiple declarations, only one declaration is permitted to omit a value
            // for the first member.
            //
            // Only perform this check once per symbol
            const enumSymbol = getSymbolOfNode(node);
            const firstDeclaration = getDeclarationOfKind(enumSymbol, node.kind);
            if (node === firstDeclaration) {
                if (enumSymbol.declarations.length > 1) {
                    // check that const is placed\omitted on all enum declarations
                    forEach(enumSymbol.declarations, decl => {
                        if (isConstEnumDeclaration(decl) !== enumIsConst) {
                            error(decl.name, Diagnostics.Enum_declarations_must_all_be_const_or_non_const);
                        }
                    });
                }

                let seenEnumMissingInitialInitializer = false;
                forEach(enumSymbol.declarations, declaration => {
                    // return true if we hit a violation of the rule, false otherwise
                    if (declaration.kind !== SyntaxKind.EnumDeclaration) {
                        return false;
                    }

                    const enumDeclaration = <EnumDeclaration>declaration;
                    if (!enumDeclaration.members.length) {
                        return false;
                    }

                    const firstEnumMember = enumDeclaration.members[0];
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
            const declarations = symbol.declarations;
            for (const declaration of declarations) {
                if ((declaration.kind === SyntaxKind.ClassDeclaration ||
                    (declaration.kind === SyntaxKind.FunctionDeclaration && nodeIsPresent((<FunctionLikeDeclaration>declaration).body))) &&
                    !isInAmbientContext(declaration)) {
                    return declaration;
                }
            }
            return undefined;
        }

        function inSameLexicalScope(node1: Node, node2: Node) {
            const container1 = getEnclosingBlockScopeContainer(node1);
            const container2 = getEnclosingBlockScopeContainer(node2);
            if (isGlobalSourceFile(container1)) {
                return isGlobalSourceFile(container2);
            }
            else if (isGlobalSourceFile(container2)) {
                return false;
            }
            else {
                return container1 === container2;
            }
        }

        function checkModuleDeclaration(node: ModuleDeclaration) {
            if (produceDiagnostics) {
                // Grammar checking
                const isAmbientExternalModule = node.name.kind === SyntaxKind.StringLiteral;
                const contextErrorMessage = isAmbientExternalModule
                    ? Diagnostics.An_ambient_module_declaration_is_only_allowed_at_the_top_level_in_a_file
                    : Diagnostics.A_namespace_declaration_is_only_allowed_in_a_namespace_or_module;
                if (checkGrammarModuleElementContext(node, contextErrorMessage)) {
                    // If we hit a module declaration in an illegal context, just bail out to avoid cascading errors.
                    return;
                }

                if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node)) {
                    if (!isInAmbientContext(node) && node.name.kind === SyntaxKind.StringLiteral) {
                        grammarErrorOnNode(node.name, Diagnostics.Only_ambient_modules_can_use_quoted_names);
                    }
                }

                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                checkExportsOnMergedDeclarations(node);
                const symbol = getSymbolOfNode(node);

                // The following checks only apply on a non-ambient instantiated module declaration.
                if (symbol.flags & SymbolFlags.ValueModule
                    && symbol.declarations.length > 1
                    && !isInAmbientContext(node)
                    && isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.isolatedModules)) {
                    const firstNonAmbientClassOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                    if (firstNonAmbientClassOrFunc) {
                        if (getSourceFileOfNode(node) !== getSourceFileOfNode(firstNonAmbientClassOrFunc)) {
                            error(node.name, Diagnostics.A_namespace_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                        }
                        else if (node.pos < firstNonAmbientClassOrFunc.pos) {
                            error(node.name, Diagnostics.A_namespace_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                        }
                    }

                    // if the module merges with a class declaration in the same lexical scope,
                    // we need to track this to ensure the correct emit.
                    const mergedClass = getDeclarationOfKind(symbol, SyntaxKind.ClassDeclaration);
                    if (mergedClass &&
                        inSameLexicalScope(node, mergedClass)) {
                        getNodeLinks(node).flags |= NodeCheckFlags.LexicalModuleMergesWithClass;
                    }
                }

                // Checks for ambient external modules.
                if (isAmbientExternalModule) {
                    if (!isGlobalSourceFile(node.parent)) {
                        error(node.name, Diagnostics.Ambient_modules_cannot_be_nested_in_other_modules_or_namespaces);
                    }
                    if (isExternalModuleNameRelative(node.name.text)) {
                        error(node.name, Diagnostics.Ambient_module_declaration_cannot_specify_relative_module_name);
                    }
                }
            }
            checkSourceElement(node.body);
        }

        function getFirstIdentifier(node: EntityName | Expression): Identifier {
            while (true) {
                if (node.kind === SyntaxKind.QualifiedName) {
                    node = (<QualifiedName>node).left;
                }
                else if (node.kind === SyntaxKind.PropertyAccessExpression) {
                    node = (<PropertyAccessExpression>node).expression;
                }
                else {
                    break;
                }
            }
            Debug.assert(node.kind === SyntaxKind.Identifier);
            return <Identifier>node;
        }

        function checkExternalImportOrExportDeclaration(node: ImportDeclaration | ImportEqualsDeclaration | ExportDeclaration): boolean {
            const moduleName = getExternalModuleName(node);
            if (!nodeIsMissing(moduleName) && moduleName.kind !== SyntaxKind.StringLiteral) {
                error(moduleName, Diagnostics.String_literal_expected);
                return false;
            }
            const inAmbientExternalModule = node.parent.kind === SyntaxKind.ModuleBlock && (<ModuleDeclaration>node.parent.parent).name.kind === SyntaxKind.StringLiteral;
            if (node.parent.kind !== SyntaxKind.SourceFile && !inAmbientExternalModule) {
                error(moduleName, node.kind === SyntaxKind.ExportDeclaration ?
                    Diagnostics.Export_declarations_are_not_permitted_in_a_namespace :
                    Diagnostics.Import_declarations_in_a_namespace_cannot_reference_a_module);
                return false;
            }
            if (inAmbientExternalModule && isExternalModuleNameRelative((<LiteralExpression>moduleName).text)) {
                // TypeScript 1.0 spec (April 2013): 12.1.6
                // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference
                // other external modules only through top - level external module names.
                // Relative external module names are not permitted.
                error(node, Diagnostics.Import_or_export_declaration_in_an_ambient_module_declaration_cannot_reference_module_through_relative_module_name);
                return false;
            }
            return true;
        }

        function checkAliasSymbol(node: ImportEqualsDeclaration | ImportClause | NamespaceImport | ImportSpecifier | ExportSpecifier) {
            const symbol = getSymbolOfNode(node);
            const target = resolveAlias(symbol);
            if (target !== unknownSymbol) {
                const excludedMeanings =
                    (symbol.flags & SymbolFlags.Value ? SymbolFlags.Value : 0) |
                    (symbol.flags & SymbolFlags.Type ? SymbolFlags.Type : 0) |
                    (symbol.flags & SymbolFlags.Namespace ? SymbolFlags.Namespace : 0);
                if (target.flags & excludedMeanings) {
                    const message = node.kind === SyntaxKind.ExportSpecifier ?
                        Diagnostics.Export_declaration_conflicts_with_exported_declaration_of_0 :
                        Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0;
                    error(node, message, symbolToString(symbol));
                }
            }
        }

        function checkImportBinding(node: ImportEqualsDeclaration | ImportClause | NamespaceImport | ImportSpecifier) {
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkAliasSymbol(node);
        }

        function checkImportDeclaration(node: ImportDeclaration) {
            if (checkGrammarModuleElementContext(node, Diagnostics.An_import_declaration_can_only_be_used_in_a_namespace_or_module)) {
                // If we hit an import declaration in an illegal context, just bail out to avoid cascading errors.
                return;
            }
            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && (node.flags & NodeFlags.Modifier)) {
                grammarErrorOnFirstToken(node, Diagnostics.An_import_declaration_cannot_have_modifiers);
            }
            if (checkExternalImportOrExportDeclaration(node)) {
                const importClause = node.importClause;
                if (importClause) {
                    if (importClause.name) {
                        checkImportBinding(importClause);
                    }
                    if (importClause.namedBindings) {
                        if (importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                            checkImportBinding(<NamespaceImport>importClause.namedBindings);
                        }
                        else {
                            forEach((<NamedImports>importClause.namedBindings).elements, checkImportBinding);
                        }
                    }
                }
            }
        }

        function checkImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            if (checkGrammarModuleElementContext(node, Diagnostics.An_import_declaration_can_only_be_used_in_a_namespace_or_module)) {
                // If we hit an import declaration in an illegal context, just bail out to avoid cascading errors.
                return;
            }

            checkGrammarDecorators(node) || checkGrammarModifiers(node);
            if (isInternalModuleImportEqualsDeclaration(node) || checkExternalImportOrExportDeclaration(node)) {
                checkImportBinding(node);
                if (node.flags & NodeFlags.Export) {
                    markExportAsReferenced(node);
                }
                if (isInternalModuleImportEqualsDeclaration(node)) {
                    const target = resolveAlias(getSymbolOfNode(node));
                    if (target !== unknownSymbol) {
                        if (target.flags & SymbolFlags.Value) {
                            // Target is a value symbol, check that it is not hidden by a local declaration with the same name
                            const moduleName = getFirstIdentifier(<EntityName>node.moduleReference);
                            if (!(resolveEntityName(moduleName, SymbolFlags.Value | SymbolFlags.Namespace).flags & SymbolFlags.Namespace)) {
                                error(moduleName, Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, declarationNameToString(moduleName));
                            }
                        }
                        if (target.flags & SymbolFlags.Type) {
                            checkTypeNameIsReserved(node.name, Diagnostics.Import_name_cannot_be_0);
                        }
                    }
                }
                else {
                    if (modulekind === ModuleKind.ES6 && !isInAmbientContext(node)) {
                        // Import equals declaration is deprecated in es6 or above
                        grammarErrorOnNode(node, Diagnostics.Import_assignment_cannot_be_used_when_targeting_ECMAScript_6_modules_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_import_d_from_mod_or_another_module_format_instead);
                    }
                }
            }
        }

        function checkExportDeclaration(node: ExportDeclaration) {
            if (checkGrammarModuleElementContext(node, Diagnostics.An_export_declaration_can_only_be_used_in_a_module)) {
                // If we hit an export in an illegal context, just bail out to avoid cascading errors.
                return;
            }

            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && (node.flags & NodeFlags.Modifier)) {
                grammarErrorOnFirstToken(node, Diagnostics.An_export_declaration_cannot_have_modifiers);
            }

            if (!node.moduleSpecifier || checkExternalImportOrExportDeclaration(node)) {
                if (node.exportClause) {
                    // export { x, y }
                    // export { x, y } from "foo"
                    forEach(node.exportClause.elements, checkExportSpecifier);

                    const inAmbientExternalModule = node.parent.kind === SyntaxKind.ModuleBlock && (<ModuleDeclaration>node.parent.parent).name.kind === SyntaxKind.StringLiteral;
                    if (node.parent.kind !== SyntaxKind.SourceFile && !inAmbientExternalModule) {
                        error(node, Diagnostics.Export_declarations_are_not_permitted_in_a_namespace);
                    }
                }
                else {
                    // export * from "foo"
                    const moduleSymbol = resolveExternalModuleName(node, node.moduleSpecifier);
                    if (moduleSymbol && moduleSymbol.exports["export="]) {
                        error(node.moduleSpecifier, Diagnostics.Module_0_uses_export_and_cannot_be_used_with_export_Asterisk, symbolToString(moduleSymbol));
                    }
                }
            }
        }

        function checkGrammarModuleElementContext(node: Statement, errorMessage: DiagnosticMessage): boolean {
            if (node.parent.kind !== SyntaxKind.SourceFile && node.parent.kind !== SyntaxKind.ModuleBlock && node.parent.kind !== SyntaxKind.ModuleDeclaration) {
                return grammarErrorOnFirstToken(node, errorMessage);
            }
        }

        function checkExportSpecifier(node: ExportSpecifier) {
            checkAliasSymbol(node);
            if (!(<ExportDeclaration>node.parent.parent).moduleSpecifier) {
                markExportAsReferenced(node);
            }
        }

        function checkExportAssignment(node: ExportAssignment) {
            if (checkGrammarModuleElementContext(node, Diagnostics.An_export_assignment_can_only_be_used_in_a_module)) {
                // If we hit an export assignment in an illegal context, just bail out to avoid cascading errors.
                return;
            }

            const container = node.parent.kind === SyntaxKind.SourceFile ? <SourceFile>node.parent : <ModuleDeclaration>node.parent.parent;
            if (container.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>container).name.kind === SyntaxKind.Identifier) {
                error(node, Diagnostics.An_export_assignment_cannot_be_used_in_a_namespace);
                return;
            }
            // Grammar checking
            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && (node.flags & NodeFlags.Modifier)) {
                grammarErrorOnFirstToken(node, Diagnostics.An_export_assignment_cannot_have_modifiers);
            }
            if (node.expression.kind === SyntaxKind.Identifier) {
                markExportAsReferenced(node);
            }
            else {
                checkExpressionCached(node.expression);
            }

            checkExternalModuleExports(<SourceFile | ModuleDeclaration>container);

            if (node.isExportEquals && !isInAmbientContext(node)) {
                if (modulekind === ModuleKind.ES6) {
                    // export assignment is not supported in es6 modules
                    grammarErrorOnNode(node, Diagnostics.Export_assignment_cannot_be_used_when_targeting_ECMAScript_6_modules_Consider_using_export_default_or_another_module_format_instead);
                }
                else if (modulekind === ModuleKind.System) {
                    // system modules does not support export assignment
                    grammarErrorOnNode(node, Diagnostics.Export_assignment_is_not_supported_when_module_flag_is_system);
                }
            }
        }

        function getModuleStatements(node: Declaration): Statement[] {
            if (node.kind === SyntaxKind.SourceFile) {
                return (<SourceFile>node).statements;
            }
            if (node.kind === SyntaxKind.ModuleDeclaration && (<ModuleDeclaration>node).body.kind === SyntaxKind.ModuleBlock) {
                return (<ModuleBlock>(<ModuleDeclaration>node).body).statements;
            }
            return emptyArray;
        }

        function hasExportedMembers(moduleSymbol: Symbol) {
            for (var id in moduleSymbol.exports) {
                if (id !== "export=") {
                    return true;
                }
            }
            return false;
        }

        function checkExternalModuleExports(node: SourceFile | ModuleDeclaration) {
            const moduleSymbol = getSymbolOfNode(node);
            const links = getSymbolLinks(moduleSymbol);
            if (!links.exportsChecked) {
                const exportEqualsSymbol = moduleSymbol.exports["export="];
                if (exportEqualsSymbol && hasExportedMembers(moduleSymbol)) {
                    const declaration = getDeclarationOfAliasSymbol(exportEqualsSymbol) || exportEqualsSymbol.valueDeclaration;
                    error(declaration, Diagnostics.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements);
                }
                links.exportsChecked = true;
            }
        }

        function checkTypePredicate(node: TypePredicateNode) {
            if (!isInLegalTypePredicatePosition(node)) {
                error(node, Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
            }
        }

        function checkSourceElement(node: Node): void {
            if (!node) {
                return;
            }

            const kind = node.kind;
            if (cancellationToken) {
                // Only bother checking on a few construct kinds.  We don't want to be excessivly
                // hitting the cancellation token on every node we check.
                switch (kind) {
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                        cancellationToken.throwIfCancellationRequested();
                }
            }

            switch (kind) {
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
                    return checkTypeReferenceNode(<TypeReferenceNode>node);
                case SyntaxKind.TypePredicate:
                    return checkTypePredicate(<TypePredicateNode>node);
                case SyntaxKind.TypeQuery:
                    return checkTypeQuery(<TypeQueryNode>node);
                case SyntaxKind.TypeLiteral:
                    return checkTypeLiteral(<TypeLiteralNode>node);
                case SyntaxKind.ArrayType:
                    return checkArrayType(<ArrayTypeNode>node);
                case SyntaxKind.TupleType:
                    return checkTupleType(<TupleTypeNode>node);
                case SyntaxKind.UnionType:
                case SyntaxKind.IntersectionType:
                    return checkUnionOrIntersectionType(<UnionOrIntersectionTypeNode>node);
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
                case SyntaxKind.ForOfStatement:
                    return checkForOfStatement(<ForOfStatement>node);
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
                case SyntaxKind.ImportEqualsDeclaration:
                    return checkImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ExportDeclaration:
                    return checkExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return checkExportAssignment(<ExportAssignment>node);
                case SyntaxKind.EmptyStatement:
                    checkGrammarStatementInAmbientContext(node);
                    return;
                case SyntaxKind.DebuggerStatement:
                    checkGrammarStatementInAmbientContext(node);
                    return;
                case SyntaxKind.MissingDeclaration:
                    return checkMissingDeclaration(node);
            }
        }

        // Function and class expression bodies are checked after all statements in the enclosing body. This is
        // to ensure constructs like the following are permitted:
        //     const foo = function () {
        //        const s = foo();
        //        return "hello";
        //     }
        // Here, performing a full type check of the body of the function expression whilst in the process of
        // determining the type of foo would cause foo to be given type any because of the recursive reference.
        // Delaying the type check of the body ensures foo has been assigned a type.
        function checkFunctionAndClassExpressionBodies(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    forEach((<FunctionLikeDeclaration>node).parameters, checkFunctionAndClassExpressionBodies);
                    checkFunctionExpressionOrObjectLiteralMethodBody(<FunctionExpression>node);
                    break;
                case SyntaxKind.ClassExpression:
                    forEach((<ClassExpression>node).members, checkSourceElement);
                    forEachChild(node, checkFunctionAndClassExpressionBodies);
                    break;
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    forEach(node.decorators, checkFunctionAndClassExpressionBodies);
                    forEach((<MethodDeclaration>node).parameters, checkFunctionAndClassExpressionBodies);
                    if (isObjectLiteralMethod(node)) {
                        checkFunctionExpressionOrObjectLiteralMethodBody(node);
                    }
                    break;
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                    forEach((<FunctionLikeDeclaration>node).parameters, checkFunctionAndClassExpressionBodies);
                    break;
                case SyntaxKind.WithStatement:
                    checkFunctionAndClassExpressionBodies((<WithStatement>node).expression);
                    break;
                case SyntaxKind.Decorator:
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
                case SyntaxKind.AsExpression:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.TypeOfExpression:
                case SyntaxKind.VoidExpression:
                case SyntaxKind.AwaitExpression:
                case SyntaxKind.DeleteExpression:
                case SyntaxKind.PrefixUnaryExpression:
                case SyntaxKind.PostfixUnaryExpression:
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.ConditionalExpression:
                case SyntaxKind.SpreadElementExpression:
                case SyntaxKind.YieldExpression:
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.ThrowStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.CatchClause:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.VariableDeclarationList:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.HeritageClause:
                case SyntaxKind.ExpressionWithTypeArguments:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.EnumMember:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.SourceFile:
                case SyntaxKind.JsxExpression:
                case SyntaxKind.JsxElement:
                case SyntaxKind.JsxSelfClosingElement:
                case SyntaxKind.JsxAttribute:
                case SyntaxKind.JsxSpreadAttribute:
                case SyntaxKind.JsxOpeningElement:
                    forEachChild(node, checkFunctionAndClassExpressionBodies);
                    break;
            }
        }

        function checkSourceFile(node: SourceFile) {
            const start = new Date().getTime();

            checkSourceFileWorker(node);

            checkTime += new Date().getTime() - start;
        }

        // Fully type check a source file and collect the relevant diagnostics.
        function checkSourceFileWorker(node: SourceFile) {
            const links = getNodeLinks(node);
            if (!(links.flags & NodeCheckFlags.TypeChecked)) {
                // Check whether the file has declared it is the default lib,
                // and whether the user has specifically chosen to avoid checking it.
                if (compilerOptions.skipDefaultLibCheck) {
                    // If the user specified '--noLib' and a file has a '/// <reference no-default-lib="true"/>',
                    // then we should treat that file as a default lib.
                    if (node.hasNoDefaultLib) {
                        return;
                    }
                }

                // Grammar checking
                checkGrammarSourceFile(node);

                emitExtends = false;
                emitDecorate = false;
                emitParam = false;
                potentialThisCollisions.length = 0;

                forEach(node.statements, checkSourceElement);
                checkFunctionAndClassExpressionBodies(node);

                if (isExternalOrCommonJsModule(node)) {
                    checkExternalModuleExports(node);
                }

                if (potentialThisCollisions.length) {
                    forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                    potentialThisCollisions.length = 0;
                }

                if (emitExtends) {
                    links.flags |= NodeCheckFlags.EmitExtends;
                }

                if (emitDecorate) {
                    links.flags |= NodeCheckFlags.EmitDecorate;
                }

                if (emitParam) {
                    links.flags |= NodeCheckFlags.EmitParam;
                }

                if (emitAwaiter) {
                    links.flags |= NodeCheckFlags.EmitAwaiter;
                }

                if (emitGenerator || (emitAwaiter && languageVersion < ScriptTarget.ES6)) {
                    links.flags |= NodeCheckFlags.EmitGenerator;
                }

                links.flags |= NodeCheckFlags.TypeChecked;
            }
        }

        function getDiagnostics(sourceFile: SourceFile, ct: CancellationToken): Diagnostic[] {
            try {
                // Record the cancellation token so it can be checked later on during checkSourceElement.
                // Do this in a finally block so we can ensure that it gets reset back to nothing after
                // this call is done.
                cancellationToken = ct;
                return getDiagnosticsWorker(sourceFile);
            }
            finally {
                cancellationToken = undefined;
            }
        }

        function getDiagnosticsWorker(sourceFile: SourceFile): Diagnostic[] {
            throwIfNonDiagnosticsProducing();
            if (sourceFile) {
                checkSourceFile(sourceFile);
                return diagnostics.getDiagnostics(sourceFile.fileName);
            }
            forEach(host.getSourceFiles(), checkSourceFile);
            return diagnostics.getDiagnostics();
        }

        function getGlobalDiagnostics(): Diagnostic[] {
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

        function getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[] {
            const symbols: SymbolTable = {};
            let memberFlags: NodeFlags = 0;

            if (isInsideWithStatementBody(location)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return [];
            }

            populateSymbols();

            return symbolsToArray(symbols);

            function populateSymbols() {
                while (location) {
                    if (location.locals && !isGlobalSourceFile(location)) {
                        copySymbols(location.locals, meaning);
                    }

                    switch (location.kind) {
                        case SyntaxKind.SourceFile:
                            if (!isExternalOrCommonJsModule(<SourceFile>location)) {
                                break;
                            }
                        case SyntaxKind.ModuleDeclaration:
                            copySymbols(getSymbolOfNode(location).exports, meaning & SymbolFlags.ModuleMember);
                            break;
                        case SyntaxKind.EnumDeclaration:
                            copySymbols(getSymbolOfNode(location).exports, meaning & SymbolFlags.EnumMember);
                            break;
                        case SyntaxKind.ClassExpression:
                            const className = (<ClassExpression>location).name;
                            if (className) {
                                copySymbol(location.symbol, meaning);
                            }
                        // fall through; this fall-through is necessary because we would like to handle
                        // type parameter inside class expression similar to how we handle it in classDeclaration and interface Declaration
                        case SyntaxKind.ClassDeclaration:
                        case SyntaxKind.InterfaceDeclaration:
                            // If we didn't come from static member of class or interface,
                            // add the type parameters into the symbol table
                            // (type parameters of classDeclaration/classExpression and interface are in member property of the symbol.
                            // Note: that the memberFlags come from previous iteration.
                            if (!(memberFlags & NodeFlags.Static)) {
                                copySymbols(getSymbolOfNode(location).members, meaning & SymbolFlags.Type);
                            }
                            break;
                        case SyntaxKind.FunctionExpression:
                            const funcName = (<FunctionExpression>location).name;
                            if (funcName) {
                                copySymbol(location.symbol, meaning);
                            }
                            break;
                    }

                    if (introducesArgumentsExoticObject(location)) {
                        copySymbol(argumentsSymbol, meaning);
                    }

                    memberFlags = location.flags;
                    location = location.parent;
                }

                copySymbols(globals, meaning);
            }

            /**
             * Copy the given symbol into symbol tables if the symbol has the given meaning
             * and it doesn't already existed in the symbol table
             * @param key a key for storing in symbol table; if undefined, use symbol.name
             * @param symbol the symbol to be added into symbol table
             * @param meaning meaning of symbol to filter by before adding to symbol table
             */
            function copySymbol(symbol: Symbol, meaning: SymbolFlags): void {
                if (symbol.flags & meaning) {
                    const id = symbol.name;
                    // We will copy all symbol regardless of its reserved name because
                    // symbolsToArray will check whether the key is a reserved name and
                    // it will not copy symbol with reserved name to the array
                    if (!hasProperty(symbols, id)) {
                        symbols[id] = symbol;
                    }
                }
            }

            function copySymbols(source: SymbolTable, meaning: SymbolFlags): void {
                if (meaning) {
                    for (const id in source) {
                        const symbol = source[id];
                        copySymbol(symbol, meaning);
                    }
                }
            }
        }

        function isTypeDeclarationName(name: Node): boolean {
            return name.kind === SyntaxKind.Identifier &&
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
            let node: Node = entityName;
            while (node.parent && node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }

            return node.parent && node.parent.kind === SyntaxKind.TypeReference;
        }

        function isHeritageClauseElementIdentifier(entityName: Node): boolean {
            let node = entityName;
            while (node.parent && node.parent.kind === SyntaxKind.PropertyAccessExpression) {
                node = node.parent;
            }

            return node.parent && node.parent.kind === SyntaxKind.ExpressionWithTypeArguments;
        }

        function getLeftSideOfImportEqualsOrExportAssignment(nodeOnRightSide: EntityName): ImportEqualsDeclaration | ExportAssignment {
            while (nodeOnRightSide.parent.kind === SyntaxKind.QualifiedName) {
                nodeOnRightSide = <QualifiedName>nodeOnRightSide.parent;
            }

            if (nodeOnRightSide.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
                return (<ImportEqualsDeclaration>nodeOnRightSide.parent).moduleReference === nodeOnRightSide && <ImportEqualsDeclaration>nodeOnRightSide.parent;
            }

            if (nodeOnRightSide.parent.kind === SyntaxKind.ExportAssignment) {
                return (<ExportAssignment>nodeOnRightSide.parent).expression === <Node>nodeOnRightSide && <ExportAssignment>nodeOnRightSide.parent;
            }

            return undefined;
        }

        function isInRightSideOfImportOrExportAssignment(node: EntityName) {
            return getLeftSideOfImportEqualsOrExportAssignment(node) !== undefined;
        }

        function getSymbolOfEntityNameOrPropertyAccessExpression(entityName: EntityName | PropertyAccessExpression): Symbol {
            if (isDeclarationName(entityName)) {
                return getSymbolOfNode(entityName.parent);
            }

            if (entityName.parent.kind === SyntaxKind.ExportAssignment) {
                return resolveEntityName(<Identifier>entityName,
                    /*all meanings*/ SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias);
            }

            if (entityName.kind !== SyntaxKind.PropertyAccessExpression) {
                if (isInRightSideOfImportOrExportAssignment(<EntityName>entityName)) {
                    // Since we already checked for ExportAssignment, this really could only be an Import
                    return getSymbolOfPartOfRightHandSideOfImportEquals(<EntityName>entityName);
                }
            }

            if (isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = <QualifiedName | PropertyAccessExpression>entityName.parent;
            }

            if (isHeritageClauseElementIdentifier(<EntityName>entityName)) {
                let meaning = SymbolFlags.None;

                // In an interface or class, we're definitely interested in a type.
                if (entityName.parent.kind === SyntaxKind.ExpressionWithTypeArguments) {
                    meaning = SymbolFlags.Type;

                    // In a class 'extends' clause we are also looking for a value.
                    if (isExpressionWithTypeArgumentsInClassExtendsClause(entityName.parent)) {
                        meaning |= SymbolFlags.Value;
                    }
                }
                else {
                    meaning = SymbolFlags.Namespace;
                }

                meaning |= SymbolFlags.Alias;
                return resolveEntityName(<EntityName>entityName, meaning);
            }
            else if ((entityName.parent.kind === SyntaxKind.JsxOpeningElement) ||
                (entityName.parent.kind === SyntaxKind.JsxSelfClosingElement) ||
                (entityName.parent.kind === SyntaxKind.JsxClosingElement)) {
                return getJsxElementTagSymbol(<JsxOpeningLikeElement>entityName.parent);
            }
            else if (isExpression(entityName)) {
                if (nodeIsMissing(entityName)) {
                    // Missing entity name.
                    return undefined;
                }

                if (entityName.kind === SyntaxKind.Identifier) {
                    // Include aliases in the meaning, this ensures that we do not follow aliases to where they point and instead
                    // return the alias symbol.
                    const meaning: SymbolFlags = SymbolFlags.Value | SymbolFlags.Alias;
                    return resolveEntityName(<Identifier>entityName, meaning);
                }
                else if (entityName.kind === SyntaxKind.PropertyAccessExpression) {
                    const symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkPropertyAccessExpression(<PropertyAccessExpression>entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
                else if (entityName.kind === SyntaxKind.QualifiedName) {
                    const symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkQualifiedName(<QualifiedName>entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
            }
            else if (isTypeReferenceIdentifier(<EntityName>entityName)) {
                let meaning = entityName.parent.kind === SyntaxKind.TypeReference ? SymbolFlags.Type : SymbolFlags.Namespace;
                // Include aliases in the meaning, this ensures that we do not follow aliases to where they point and instead
                // return the alias symbol.
                meaning |= SymbolFlags.Alias;
                return resolveEntityName(<EntityName>entityName, meaning);
            }
            else if (entityName.parent.kind === SyntaxKind.JsxAttribute) {
                return getJsxAttributePropertySymbol(<JsxAttribute>entityName.parent);
            }

            if (entityName.parent.kind === SyntaxKind.TypePredicate) {
                return resolveEntityName(<Identifier>entityName, /*meaning*/ SymbolFlags.FunctionScopedVariable);
            }

            // Do we want to return undefined here?
            return undefined;
        }

        function getSymbolAtLocation(node: Node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }

            if (isDeclarationName(node)) {
                // This is a declaration, call getSymbolOfNode
                return getSymbolOfNode(node.parent);
            }

            if (node.kind === SyntaxKind.Identifier) {
                if (isInRightSideOfImportOrExportAssignment(<Identifier>node)) {
                    return node.parent.kind === SyntaxKind.ExportAssignment
                        ? getSymbolOfEntityNameOrPropertyAccessExpression(<Identifier>node)
                        : getSymbolOfPartOfRightHandSideOfImportEquals(<Identifier>node);
                }
                else if (node.parent.kind === SyntaxKind.BindingElement &&
                    node.parent.parent.kind === SyntaxKind.ObjectBindingPattern &&
                    node === (<BindingElement>node.parent).propertyName) {
                    const typeOfPattern = getTypeOfNode(node.parent.parent);
                    const propertyDeclaration = typeOfPattern && getPropertyOfType(typeOfPattern, (<Identifier>node).text);

                    if (propertyDeclaration) {
                        return propertyDeclaration;
                    }
                }
            }

            switch (node.kind) {
                case SyntaxKind.Identifier:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.QualifiedName:
                    return getSymbolOfEntityNameOrPropertyAccessExpression(<EntityName | PropertyAccessExpression>node);

                case SyntaxKind.ThisKeyword:
                case SyntaxKind.SuperKeyword:
                    const type = isExpression(node) ? checkExpression(<Expression>node) : getTypeFromTypeNode(<TypeNode>node);
                    return type.symbol;

                case SyntaxKind.ConstructorKeyword:
                    // constructor keyword for an overload, should take us to the definition if it exist
                    const constructorDeclaration = node.parent;
                    if (constructorDeclaration && constructorDeclaration.kind === SyntaxKind.Constructor) {
                        return (<ClassDeclaration>constructorDeclaration.parent).symbol;
                    }
                    return undefined;

                case SyntaxKind.StringLiteral:
                    // External module name in an import declaration
                    if ((isExternalModuleImportEqualsDeclaration(node.parent.parent) &&
                        getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node) ||
                        ((node.parent.kind === SyntaxKind.ImportDeclaration || node.parent.kind === SyntaxKind.ExportDeclaration) &&
                            (<ImportDeclaration>node.parent).moduleSpecifier === node)) {
                        return resolveExternalModuleName(node, <LiteralExpression>node);
                    }
                // Fall through

                case SyntaxKind.NumericLiteral:
                    // index access
                    if (node.parent.kind === SyntaxKind.ElementAccessExpression && (<ElementAccessExpression>node.parent).argumentExpression === node) {
                        const objectType = checkExpression((<ElementAccessExpression>node.parent).expression);
                        if (objectType === unknownType) return undefined;
                        const apparentType = getApparentType(objectType);
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
                return resolveEntityName((<ShorthandPropertyAssignment>location).name, SymbolFlags.Value);
            }
            return undefined;
        }

        function getTypeOfNode(node: Node): Type {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return unknownType;
            }

            if (isTypeNode(node)) {
                return getTypeFromTypeNode(<TypeNode>node);
            }

            if (isExpression(node)) {
                return getTypeOfExpression(<Expression>node);
            }

            if (isExpressionWithTypeArgumentsInClassExtendsClause(node)) {
                // A SyntaxKind.ExpressionWithTypeArguments is considered a type node, except when it occurs in the
                // extends clause of a class. We handle that case here.
                return getBaseTypes(<InterfaceType>getDeclaredTypeOfSymbol(getSymbolOfNode(node.parent.parent)))[0];
            }

            if (isTypeDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolAtLocation because it is a declaration
                const symbol = getSymbolOfNode(node);
                return getDeclaredTypeOfSymbol(symbol);
            }

            if (isTypeDeclarationName(node)) {
                const symbol = getSymbolAtLocation(node);
                return symbol && getDeclaredTypeOfSymbol(symbol);
            }

            if (isDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolAtLocation because it is a declaration
                const symbol = getSymbolOfNode(node);
                return getTypeOfSymbol(symbol);
            }

            if (isDeclarationName(node)) {
                const symbol = getSymbolAtLocation(node);
                return symbol && getTypeOfSymbol(symbol);
            }

            if (isBindingPattern(node)) {
                return getTypeForVariableLikeDeclaration(<VariableLikeDeclaration>node.parent);
            }

            if (isInRightSideOfImportOrExportAssignment(<Identifier>node)) {
                const symbol = getSymbolAtLocation(node);
                const declaredType = symbol && getDeclaredTypeOfSymbol(symbol);
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

        /**
          * Gets either the static or instance type of a class element, based on
          * whether the element is declared as "static".
          */
        function getParentTypeOfClassElement(node: ClassElement) {
            const classSymbol = getSymbolOfNode(node.parent);
            return node.flags & NodeFlags.Static
                ? getTypeOfSymbol(classSymbol)
                : getDeclaredTypeOfSymbol(classSymbol);
        }

        // Return the list of properties of the given type, augmented with properties from Function
        // if the type has call or construct signatures
        function getAugmentedPropertiesOfType(type: Type): Symbol[] {
            type = getApparentType(type);
            const propsByName = createSymbolTable(getPropertiesOfType(type));
            if (getSignaturesOfType(type, SignatureKind.Call).length || getSignaturesOfType(type, SignatureKind.Construct).length) {
                forEach(getPropertiesOfType(globalFunctionType), p => {
                    if (!hasProperty(propsByName, p.name)) {
                        propsByName[p.name] = p;
                    }
                });
            }
            return getNamedMembers(propsByName);
        }

        function getRootSymbols(symbol: Symbol): Symbol[] {
            if (symbol.flags & SymbolFlags.SyntheticProperty) {
                const symbols: Symbol[] = [];
                const name = symbol.name;
                forEach(getSymbolLinks(symbol).containingType.types, t => {
                    const symbol = getPropertyOfType(t, name);
                    if (symbol) {
                        symbols.push(symbol);
                    }
                });
                return symbols;
            }
            else if (symbol.flags & SymbolFlags.Transient) {
                const target = getSymbolLinks(symbol).target;
                if (target) {
                    return [target];
                }
            }
            return [symbol];
        }

        // Emitter support

        function isArgumentsLocalBinding(node: Identifier): boolean {
            return getReferencedValueSymbol(node) === argumentsSymbol;
        }

        // When resolved as an expression identifier, if the given node references an exported entity, return the declaration
        // node of the exported entity's container. Otherwise, return undefined.
        function getReferencedExportContainer(node: Identifier): SourceFile | ModuleDeclaration | EnumDeclaration {
            let symbol = getReferencedValueSymbol(node);
            if (symbol) {
                if (symbol.flags & SymbolFlags.ExportValue) {
                    // If we reference an exported entity within the same module declaration, then whether
                    // we prefix depends on the kind of entity. SymbolFlags.ExportHasLocal encompasses all the
                    // kinds that we do NOT prefix.
                    const exportSymbol = getMergedSymbol(symbol.exportSymbol);
                    if (exportSymbol.flags & SymbolFlags.ExportHasLocal) {
                        return undefined;
                    }
                    symbol = exportSymbol;
                }
                const parentSymbol = getParentOfSymbol(symbol);
                if (parentSymbol) {
                    if (parentSymbol.flags & SymbolFlags.ValueModule && parentSymbol.valueDeclaration.kind === SyntaxKind.SourceFile) {
                        return <SourceFile>parentSymbol.valueDeclaration;
                    }
                    for (let n = node.parent; n; n = n.parent) {
                        if ((n.kind === SyntaxKind.ModuleDeclaration || n.kind === SyntaxKind.EnumDeclaration) && getSymbolOfNode(n) === parentSymbol) {
                            return <ModuleDeclaration | EnumDeclaration>n;
                        }
                    }
                }
            }
        }

        // When resolved as an expression identifier, if the given node references an import, return the declaration of
        // that import. Otherwise, return undefined.
        function getReferencedImportDeclaration(node: Identifier): Declaration {
            const symbol = getReferencedValueSymbol(node);
            return symbol && symbol.flags & SymbolFlags.Alias ? getDeclarationOfAliasSymbol(symbol) : undefined;
        }

        function isStatementWithLocals(node: Node) {
            switch (node.kind) {
                case SyntaxKind.Block:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                    return true;
            }
            return false;
        }

        function isNestedRedeclarationSymbol(symbol: Symbol): boolean {
            if (symbol.flags & SymbolFlags.BlockScoped) {
                const links = getSymbolLinks(symbol);
                if (links.isNestedRedeclaration === undefined) {
                    const container = getEnclosingBlockScopeContainer(symbol.valueDeclaration);
                    links.isNestedRedeclaration = isStatementWithLocals(container) &&
                        !!resolveName(container.parent, symbol.name, SymbolFlags.Value, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined);
                }
                return links.isNestedRedeclaration;
            }
            return false;
        }

        // When resolved as an expression identifier, if the given node references a nested block scoped entity with
        // a name that hides an existing name, return the declaration of that entity. Otherwise, return undefined.
        function getReferencedNestedRedeclaration(node: Identifier): Declaration {
            const symbol = getReferencedValueSymbol(node);
            return symbol && isNestedRedeclarationSymbol(symbol) ? symbol.valueDeclaration : undefined;
        }

        // Return true if the given node is a declaration of a nested block scoped entity with a name that hides an
        // existing name.
        function isNestedRedeclaration(node: Declaration): boolean {
            return isNestedRedeclarationSymbol(getSymbolOfNode(node));
        }

        function isValueAliasDeclaration(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ImportClause:
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.ExportSpecifier:
                    return isAliasResolvedToValue(getSymbolOfNode(node));
                case SyntaxKind.ExportDeclaration:
                    const exportClause = (<ExportDeclaration>node).exportClause;
                    return exportClause && forEach(exportClause.elements, isValueAliasDeclaration);
                case SyntaxKind.ExportAssignment:
                    return (<ExportAssignment>node).expression && (<ExportAssignment>node).expression.kind === SyntaxKind.Identifier ? isAliasResolvedToValue(getSymbolOfNode(node)) : true;
            }
            return false;
        }

        function isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean {
            if (node.parent.kind !== SyntaxKind.SourceFile || !isInternalModuleImportEqualsDeclaration(node)) {
                // parent is not source file or it is not reference to internal module
                return false;
            }

            const isValue = isAliasResolvedToValue(getSymbolOfNode(node));
            return isValue && node.moduleReference && !nodeIsMissing(node.moduleReference);
        }

        function isAliasResolvedToValue(symbol: Symbol): boolean {
            const target = resolveAlias(symbol);
            if (target === unknownSymbol && compilerOptions.isolatedModules) {
                return true;
            }
            // const enums and modules that contain only const enums are not considered values from the emit perespective
            // unless 'preserveConstEnums' option is set to true
            return target !== unknownSymbol &&
                target &&
                target.flags & SymbolFlags.Value &&
                (compilerOptions.preserveConstEnums || !isConstEnumOrConstEnumOnlyModule(target));
        }

        function isConstEnumOrConstEnumOnlyModule(s: Symbol): boolean {
            return isConstEnumSymbol(s) || s.constEnumOnlyModule;
        }

        function isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean {
            if (isAliasSymbolDeclaration(node)) {
                const symbol = getSymbolOfNode(node);
                if (getSymbolLinks(symbol).referenced) {
                    return true;
                }
            }

            if (checkChildren) {
                return forEachChild(node, node => isReferencedAliasDeclaration(node, checkChildren));
            }
            return false;
        }

        function isImplementationOfOverload(node: FunctionLikeDeclaration) {
            if (nodeIsPresent(node.body)) {
                const symbol = getSymbolOfNode(node);
                const signaturesOfSymbol = getSignaturesOfSymbol(symbol);
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

        function getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): number {
            if (node.kind === SyntaxKind.EnumMember) {
                return getEnumMemberValue(<EnumMember>node);
            }

            const symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol && (symbol.flags & SymbolFlags.EnumMember)) {
                // inline property\index accesses only for const enums
                if (isConstEnumDeclaration(symbol.valueDeclaration.parent)) {
                    return getEnumMemberValue(<EnumMember>symbol.valueDeclaration);
                }
            }

            return undefined;
        }

        function isFunctionType(type: Type): boolean {
            return type.flags & TypeFlags.ObjectType && getSignaturesOfType(type, SignatureKind.Call).length > 0;
        }

        function getTypeReferenceSerializationKind(typeName: EntityName): TypeReferenceSerializationKind {
            // Resolve the symbol as a value to ensure the type can be reached at runtime during emit.
            const valueSymbol = resolveEntityName(typeName, SymbolFlags.Value, /*ignoreErrors*/ true);
            const constructorType = valueSymbol ? getTypeOfSymbol(valueSymbol) : undefined;
            if (constructorType && isConstructorType(constructorType)) {
                return TypeReferenceSerializationKind.TypeWithConstructSignatureAndValue;
            }

            // Resolve the symbol as a type so that we can provide a more useful hint for the type serializer.
            const typeSymbol = resolveEntityName(typeName, SymbolFlags.Type, /*ignoreErrors*/ true);
            // We might not be able to resolve type symbol so use unknown type in that case (eg error case)
            if (!typeSymbol) {
                return TypeReferenceSerializationKind.ObjectType;
            }
            const type = getDeclaredTypeOfSymbol(typeSymbol);
            if (type === unknownType) {
                return TypeReferenceSerializationKind.Unknown;
            }
            else if (type.flags & TypeFlags.Any) {
                return TypeReferenceSerializationKind.ObjectType;
            }
            else if (allConstituentTypesHaveKind(type, TypeFlags.Void)) {
                return TypeReferenceSerializationKind.VoidType;
            }
            else if (allConstituentTypesHaveKind(type, TypeFlags.Boolean)) {
                return TypeReferenceSerializationKind.BooleanType;
            }
            else if (allConstituentTypesHaveKind(type, TypeFlags.NumberLike)) {
                return TypeReferenceSerializationKind.NumberLikeType;
            }
            else if (allConstituentTypesHaveKind(type, TypeFlags.StringLike)) {
                return TypeReferenceSerializationKind.StringLikeType;
            }
            else if (allConstituentTypesHaveKind(type, TypeFlags.Tuple)) {
                return TypeReferenceSerializationKind.ArrayLikeType;
            }
            else if (allConstituentTypesHaveKind(type, TypeFlags.ESSymbol)) {
                return TypeReferenceSerializationKind.ESSymbolType;
            }
            else if (isFunctionType(type)) {
                return TypeReferenceSerializationKind.TypeWithCallSignature;
            }
            else if (isArrayType(type)) {
                return TypeReferenceSerializationKind.ArrayLikeType;
            }
            else {
                return TypeReferenceSerializationKind.ObjectType;
            }
        }

        function writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter) {
            // Get type of the symbol if this is the valid symbol otherwise get type at location
            const symbol = getSymbolOfNode(declaration);
            const type = symbol && !(symbol.flags & (SymbolFlags.TypeLiteral | SymbolFlags.Signature))
                ? getTypeOfSymbol(symbol)
                : unknownType;

            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }

        function writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter) {
            const signature = getSignatureFromDeclaration(signatureDeclaration);
            getSymbolDisplayBuilder().buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags);
        }

        function writeTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter) {
            const type = getTypeOfExpression(expr);
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }

        function hasGlobalName(name: string): boolean {
            return hasProperty(globals, name);
        }

        function getReferencedValueSymbol(reference: Identifier): Symbol {
            return getNodeLinks(reference).resolvedSymbol ||
                resolveName(reference, reference.text, SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias,
                    /*nodeNotFoundMessage*/ undefined, /*nameArg*/ undefined);
        }

        function getReferencedValueDeclaration(reference: Identifier): Declaration {
            Debug.assert(!nodeIsSynthesized(reference));
            const symbol = getReferencedValueSymbol(reference);
            return symbol && getExportSymbolOfValueSymbolIfExported(symbol).valueDeclaration;
        }

        function instantiateSingleCallFunctionType(functionType: Type, typeArguments: Type[]): Type {
            if (functionType === unknownType) {
                return unknownType;
            }

            const signature = getSingleCallSignature(functionType);
            if (!signature) {
                return unknownType;
            }

            const instantiatedSignature = getSignatureInstantiation(signature, typeArguments);
            return getOrCreateTypeFromSignature(instantiatedSignature);
        }

        function createResolver(): EmitResolver {
            return {
                getReferencedExportContainer,
                getReferencedImportDeclaration,
                getReferencedNestedRedeclaration,
                isNestedRedeclaration,
                isValueAliasDeclaration,
                hasGlobalName,
                isReferencedAliasDeclaration,
                getNodeCheckFlags,
                isTopLevelValueImportEqualsWithEntityName,
                isDeclarationVisible,
                isImplementationOfOverload,
                writeTypeOfDeclaration,
                writeReturnTypeOfSignatureDeclaration,
                writeTypeOfExpression,
                isSymbolAccessible,
                isEntityNameVisible,
                getConstantValue,
                collectLinkedAliases,
                getReferencedValueDeclaration,
                getTypeReferenceSerializationKind,
                isOptionalParameter,
                isArgumentsLocalBinding,
                getExternalModuleFileFromDeclaration
            };
        }

        function getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration): SourceFile {
                const specifier = getExternalModuleName(declaration);
                const moduleSymbol = getSymbolAtLocation(specifier);
                if (!moduleSymbol) {
                    return undefined;
                }
                return getDeclarationOfKind(moduleSymbol, SyntaxKind.SourceFile) as SourceFile;
        }

        function initializeTypeChecker() {
            // Bind all source files and propagate errors
            forEach(host.getSourceFiles(), file => {
                bindSourceFile(file, compilerOptions);
            });

            // Initialize global symbol table
            forEach(host.getSourceFiles(), file => {
                if (!isExternalOrCommonJsModule(file)) {
                    mergeSymbolTable(globals, file.locals);
                }
            });

            getSymbolLinks(undefinedSymbol).type = undefinedType;
            getSymbolLinks(argumentsSymbol).type = getGlobalType("IArguments");
            getSymbolLinks(unknownSymbol).type = unknownType;
            globals[undefinedSymbol.name] = undefinedSymbol;

            // Initialize special types
            globalArrayType = <GenericType>getGlobalType("Array", /*arity*/ 1);
            globalObjectType = getGlobalType("Object");
            globalFunctionType = getGlobalType("Function");
            globalStringType = getGlobalType("String");
            globalNumberType = getGlobalType("Number");
            globalBooleanType = getGlobalType("Boolean");
            globalRegExpType = getGlobalType("RegExp");
            jsxElementType = getExportedTypeFromNamespace("JSX", JsxNames.Element);
            getGlobalClassDecoratorType = memoize(() => getGlobalType("ClassDecorator"));
            getGlobalPropertyDecoratorType = memoize(() => getGlobalType("PropertyDecorator"));
            getGlobalMethodDecoratorType = memoize(() => getGlobalType("MethodDecorator"));
            getGlobalParameterDecoratorType = memoize(() => getGlobalType("ParameterDecorator"));
            getGlobalTypedPropertyDescriptorType = memoize(() => getGlobalType("TypedPropertyDescriptor", /*arity*/ 1));
            getGlobalPromiseType = memoize(() => getGlobalType("Promise", /*arity*/ 1));
            tryGetGlobalPromiseType = memoize(() => getGlobalSymbol("Promise", SymbolFlags.Type, /*diagnostic*/ undefined) && getGlobalPromiseType());
            getGlobalPromiseLikeType = memoize(() => getGlobalType("PromiseLike", /*arity*/ 1));
            getInstantiatedGlobalPromiseLikeType = memoize(createInstantiatedPromiseLikeType);
            getGlobalPromiseConstructorSymbol = memoize(() => getGlobalValueSymbol("Promise"));
            getGlobalPromiseConstructorLikeType = memoize(() => getGlobalType("PromiseConstructorLike"));
            getGlobalThenableType = memoize(createThenableType);

            // If we're in ES6 mode, load the TemplateStringsArray.
            // Otherwise, default to 'unknown' for the purposes of type checking in LS scenarios.
            if (languageVersion >= ScriptTarget.ES6) {
                globalTemplateStringsArrayType = getGlobalType("TemplateStringsArray");
                globalESSymbolType = getGlobalType("Symbol");
                globalESSymbolConstructorSymbol = getGlobalValueSymbol("Symbol");
                globalIterableType = <GenericType>getGlobalType("Iterable", /*arity*/ 1);
                globalIteratorType = <GenericType>getGlobalType("Iterator", /*arity*/ 1);
                globalIterableIteratorType = <GenericType>getGlobalType("IterableIterator", /*arity*/ 1);
            }
            else {
                globalTemplateStringsArrayType = unknownType;

                // Consider putting Symbol interface in lib.d.ts. On the plus side, putting it in lib.d.ts would make it
                // extensible for Polyfilling Symbols. But putting it into lib.d.ts could also break users that have
                // a global Symbol already, particularly if it is a class.
                globalESSymbolType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
                globalESSymbolConstructorSymbol = undefined;
                globalIterableType = emptyGenericType;
                globalIteratorType = emptyGenericType;
                globalIterableIteratorType = emptyGenericType;
            }

            anyArrayType = createArrayType(anyType);
        }

        function createInstantiatedPromiseLikeType(): ObjectType {
            const promiseLikeType = getGlobalPromiseLikeType();
            if (promiseLikeType !== emptyGenericType) {
                return createTypeReference(<GenericType>promiseLikeType, [anyType]);
            }

            return emptyObjectType;
        }

        function createThenableType() {
            // build the thenable type that is used to verify against a non-promise "thenable" operand to `await`.
            const thenPropertySymbol = createSymbol(SymbolFlags.Transient | SymbolFlags.Property, "then");
            getSymbolLinks(thenPropertySymbol).type = globalFunctionType;

            const thenableType = <ResolvedType>createObjectType(TypeFlags.Anonymous);
            thenableType.properties = [thenPropertySymbol];
            thenableType.members = createSymbolTable(thenableType.properties);
            thenableType.callSignatures = [];
            thenableType.constructSignatures = [];
            return thenableType;
        }

        // GRAMMAR CHECKING
        function checkGrammarDecorators(node: Node): boolean {
            if (!node.decorators) {
                return false;
            }
            if (!nodeCanBeDecorated(node)) {
                return grammarErrorOnFirstToken(node, Diagnostics.Decorators_are_not_valid_here);
            }
            else if (node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor) {
                const accessors = getAllAccessorDeclarations((<ClassDeclaration>node.parent).members, <AccessorDeclaration>node);
                if (accessors.firstAccessor.decorators && node === accessors.secondAccessor) {
                    return grammarErrorOnFirstToken(node, Diagnostics.Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name);
                }
            }
            return false;
        }

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
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.Parameter:
                    break;
                case SyntaxKind.FunctionDeclaration:
                    if (node.modifiers && (node.modifiers.length > 1 || node.modifiers[0].kind !== SyntaxKind.AsyncKeyword) &&
                        node.parent.kind !== SyntaxKind.ModuleBlock && node.parent.kind !== SyntaxKind.SourceFile) {
                        return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                    }
                    break;
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.TypeAliasDeclaration:
                    if (node.modifiers && node.parent.kind !== SyntaxKind.ModuleBlock && node.parent.kind !== SyntaxKind.SourceFile) {
                        return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                    }
                    break;
                case SyntaxKind.EnumDeclaration:
                    if (node.modifiers && (node.modifiers.length > 1 || node.modifiers[0].kind !== SyntaxKind.ConstKeyword) &&
                        node.parent.kind !== SyntaxKind.ModuleBlock && node.parent.kind !== SyntaxKind.SourceFile) {
                        return grammarErrorOnFirstToken(node, Diagnostics.Modifiers_cannot_appear_here);
                    }
                    break;
                default:
                    return false;
            }

            if (!node.modifiers) {
                return;
            }

            let lastStatic: Node, lastPrivate: Node, lastProtected: Node, lastDeclare: Node, lastAsync: Node;
            let flags = 0;
            for (const modifier of node.modifiers) {
                switch (modifier.kind) {
                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.ProtectedKeyword:
                    case SyntaxKind.PrivateKeyword:
                        let text: string;
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
                        else if (flags & NodeFlags.Async) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "async");
                        }
                        else if (node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_element, text);
                        }
                        else if (flags & NodeFlags.Abstract) {
                            if (modifier.kind === SyntaxKind.PrivateKeyword) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, text, "abstract");
                            }
                            else {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, text, "abstract");
                            }
                        }
                        flags |= modifierToFlag(modifier.kind);
                        break;

                    case SyntaxKind.StaticKeyword:
                        if (flags & NodeFlags.Static) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (flags & NodeFlags.Async) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "static", "async");
                        }
                        else if (node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        else if (flags & NodeFlags.Abstract) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "static", "abstract");
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
                        else if (flags & NodeFlags.Abstract) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "abstract");
                        }
                        else if (flags & NodeFlags.Async) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_must_precede_1_modifier, "export", "async");
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
                        else if (flags & NodeFlags.Async) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "async");
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
                        lastDeclare = modifier;
                        break;

                    case SyntaxKind.AbstractKeyword:
                        if (flags & NodeFlags.Abstract) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "abstract");
                        }
                        if (node.kind !== SyntaxKind.ClassDeclaration) {
                            if (node.kind !== SyntaxKind.MethodDeclaration) {
                                return grammarErrorOnNode(modifier, Diagnostics.abstract_modifier_can_only_appear_on_a_class_or_method_declaration);
                            }
                            if (!(node.parent.kind === SyntaxKind.ClassDeclaration && node.parent.flags & NodeFlags.Abstract)) {
                                return grammarErrorOnNode(modifier, Diagnostics.Abstract_methods_can_only_appear_within_an_abstract_class);
                            }
                            if (flags & NodeFlags.Static) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "static", "abstract");
                            }
                            if (flags & NodeFlags.Private) {
                                return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_with_1_modifier, "private", "abstract");
                            }
                        }

                        flags |= NodeFlags.Abstract;
                        break;

                    case SyntaxKind.AsyncKeyword:
                        if (flags & NodeFlags.Async) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_already_seen, "async");
                        }
                        else if (flags & NodeFlags.Ambient || isInAmbientContext(node.parent)) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_be_used_in_an_ambient_context, "async");
                        }
                        else if (node.kind === SyntaxKind.Parameter) {
                            return grammarErrorOnNode(modifier, Diagnostics._0_modifier_cannot_appear_on_a_parameter, "async");
                        }
                        flags |= NodeFlags.Async;
                        lastAsync = modifier;
                        break;
                }
            }

            if (node.kind === SyntaxKind.Constructor) {
                if (flags & NodeFlags.Static) {
                    return grammarErrorOnNode(lastStatic, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                }
                if (flags & NodeFlags.Abstract) {
                    return grammarErrorOnNode(lastStatic, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "abstract");
                }
                else if (flags & NodeFlags.Protected) {
                    return grammarErrorOnNode(lastProtected, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "protected");
                }
                else if (flags & NodeFlags.Private) {
                    return grammarErrorOnNode(lastPrivate, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
                }
                else if (flags & NodeFlags.Async) {
                    return grammarErrorOnNode(lastAsync, Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "async");
                }
                return;
            }
            else if ((node.kind === SyntaxKind.ImportDeclaration || node.kind === SyntaxKind.ImportEqualsDeclaration) && flags & NodeFlags.Ambient) {
                return grammarErrorOnNode(lastDeclare, Diagnostics.A_0_modifier_cannot_be_used_with_an_import_declaration, "declare");
            }
            else if (node.kind === SyntaxKind.Parameter && (flags & NodeFlags.AccessibilityModifier) && isBindingPattern((<ParameterDeclaration>node).name)) {
                return grammarErrorOnNode(node, Diagnostics.A_parameter_property_may_not_be_a_binding_pattern);
            }
            if (flags & NodeFlags.Async) {
                return checkGrammarAsyncModifier(node, lastAsync);
            }
        }

        function checkGrammarAsyncModifier(node: Node, asyncModifier: Node): boolean {
            if (languageVersion < ScriptTarget.ES6) {
                return grammarErrorOnNode(asyncModifier, Diagnostics.Async_functions_are_only_available_when_targeting_ECMAScript_6_and_higher);
            }

            switch (node.kind) {
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                    if (!(<FunctionLikeDeclaration>node).asteriskToken) {
                        return false;
                    }
                    break;
            }

            return grammarErrorOnNode(asyncModifier, Diagnostics._0_modifier_cannot_be_used_here, "async");
        }

        function checkGrammarForDisallowedTrailingComma(list: NodeArray<Node>): boolean {
            if (list && list.hasTrailingComma) {
                const start = list.end - ",".length;
                const end = list.end;
                const sourceFile = getSourceFileOfNode(list[0]);
                return grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Trailing_comma_not_allowed);
            }
        }

        function checkGrammarTypeParameterList(node: FunctionLikeDeclaration, typeParameters: NodeArray<TypeParameterDeclaration>, file: SourceFile): boolean {
            if (checkGrammarForDisallowedTrailingComma(typeParameters)) {
                return true;
            }

            if (typeParameters && typeParameters.length === 0) {
                const start = typeParameters.pos - "<".length;
                const end = skipTrivia(file.text, typeParameters.end) + ">".length;
                return grammarErrorAtPos(file, start, end - start, Diagnostics.Type_parameter_list_cannot_be_empty);
            }
        }

        function checkGrammarParameterList(parameters: NodeArray<ParameterDeclaration>) {
            if (checkGrammarForDisallowedTrailingComma(parameters)) {
                return true;
            }

            let seenOptionalParameter = false;
            const parameterCount = parameters.length;

            for (let i = 0; i < parameterCount; i++) {
                const parameter = parameters[i];
                if (parameter.dotDotDotToken) {
                    if (i !== (parameterCount - 1)) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                    }

                    if (isBindingPattern(parameter.name)) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_rest_element_cannot_contain_a_binding_pattern);
                    }

                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, Diagnostics.A_rest_parameter_cannot_be_optional);
                    }

                    if (parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                    }
                }
                else if (parameter.questionToken) {
                    seenOptionalParameter = true;

                    if (parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                    }
                }
                else if (seenOptionalParameter && !parameter.initializer) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                }
            }
        }

        function checkGrammarFunctionLikeDeclaration(node: FunctionLikeDeclaration): boolean {
            // Prevent cascading error by short-circuit
            const file = getSourceFileOfNode(node);
            return checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarTypeParameterList(node, node.typeParameters, file) ||
                checkGrammarParameterList(node.parameters) || checkGrammarArrowFunction(node, file);
        }

        function checkGrammarArrowFunction(node: FunctionLikeDeclaration, file: SourceFile): boolean {
            if (node.kind === SyntaxKind.ArrowFunction) {
                const arrowFunction = <ArrowFunction>node;
                const startLine = getLineAndCharacterOfPosition(file, arrowFunction.equalsGreaterThanToken.pos).line;
                const endLine = getLineAndCharacterOfPosition(file, arrowFunction.equalsGreaterThanToken.end).line;
                if (startLine !== endLine) {
                    return grammarErrorOnNode(arrowFunction.equalsGreaterThanToken, Diagnostics.Line_terminator_not_permitted_before_arrow);
                }
            }
            return false;
        }

        function checkGrammarIndexSignatureParameters(node: SignatureDeclaration): boolean {
            const parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                if (parameter) {
                    return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
                else {
                    return grammarErrorOnNode(node, Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
            }
            if (parameter.dotDotDotToken) {
                return grammarErrorOnNode(parameter.dotDotDotToken, Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
            }
            if (parameter.flags & NodeFlags.Modifier) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
            }
            if (parameter.questionToken) {
                return grammarErrorOnNode(parameter.questionToken, Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
            }
            if (parameter.initializer) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
            }
            if (!parameter.type) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
            }
            if (parameter.type.kind !== SyntaxKind.StringKeyword && parameter.type.kind !== SyntaxKind.NumberKeyword) {
                return grammarErrorOnNode(parameter.name, Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
            }
            if (!node.type) {
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
            return checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarIndexSignatureParameters(node) || checkGrammarForIndexSignatureModifier(node);
        }

        function checkGrammarForAtLeastOneTypeArgument(node: Node, typeArguments: NodeArray<TypeNode>): boolean {
            if (typeArguments && typeArguments.length === 0) {
                const sourceFile = getSourceFileOfNode(node);
                const start = typeArguments.pos - "<".length;
                const end = skipTrivia(sourceFile.text, typeArguments.end) + ">".length;
                return grammarErrorAtPos(sourceFile, start, end - start, Diagnostics.Type_argument_list_cannot_be_empty);
            }
        }

        function checkGrammarTypeArguments(node: Node, typeArguments: NodeArray<TypeNode>): boolean {
            return checkGrammarForDisallowedTrailingComma(typeArguments) ||
                checkGrammarForAtLeastOneTypeArgument(node, typeArguments);
        }

        function checkGrammarForOmittedArgument(node: CallExpression, args: NodeArray<Expression>): boolean {
            if (args) {
                const sourceFile = getSourceFileOfNode(node);
                for (const arg of args) {
                    if (arg.kind === SyntaxKind.OmittedExpression) {
                        return grammarErrorAtPos(sourceFile, arg.pos, 0, Diagnostics.Argument_expression_expected);
                    }
                }
            }
        }

        function checkGrammarArguments(node: CallExpression, args: NodeArray<Expression>): boolean {
            return checkGrammarForDisallowedTrailingComma(args) ||
                checkGrammarForOmittedArgument(node, args);
        }

        function checkGrammarHeritageClause(node: HeritageClause): boolean {
            const types = node.types;
            if (checkGrammarForDisallowedTrailingComma(types)) {
                return true;
            }
            if (types && types.length === 0) {
                const listType = tokenToString(node.token);
                const sourceFile = getSourceFileOfNode(node);
                return grammarErrorAtPos(sourceFile, types.pos, 0, Diagnostics._0_list_cannot_be_empty, listType);
            }
        }

        function checkGrammarClassDeclarationHeritageClauses(node: ClassLikeDeclaration) {
            let seenExtendsClause = false;
            let seenImplementsClause = false;

            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && node.heritageClauses) {
                for (const heritageClause of node.heritageClauses) {
                    if (heritageClause.token === SyntaxKind.ExtendsKeyword) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, Diagnostics.extends_clause_already_seen);
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
            let seenExtendsClause = false;

            if (node.heritageClauses) {
                for (const heritageClause of node.heritageClauses) {
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

            const computedPropertyName = <ComputedPropertyName>node;
            if (computedPropertyName.expression.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>computedPropertyName.expression).operatorToken.kind === SyntaxKind.CommaToken) {
                return grammarErrorOnNode(computedPropertyName.expression, Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name);
            }
        }

        function checkGrammarForGenerator(node: FunctionLikeDeclaration) {
            if (node.asteriskToken) {
                Debug.assert(
                    node.kind === SyntaxKind.FunctionDeclaration ||
                    node.kind === SyntaxKind.FunctionExpression ||
                    node.kind === SyntaxKind.MethodDeclaration);
                if (isInAmbientContext(node)) {
                    return grammarErrorOnNode(node.asteriskToken, Diagnostics.Generators_are_not_allowed_in_an_ambient_context);
                }
                if (!node.body) {
                    return grammarErrorOnNode(node.asteriskToken, Diagnostics.An_overload_signature_cannot_be_declared_as_a_generator);
                }
                if (languageVersion < ScriptTarget.ES6) {
                    return grammarErrorOnNode(node.asteriskToken, Diagnostics.Generators_are_only_available_when_targeting_ECMAScript_6_or_higher);
                }
            }
        }

        function checkGrammarForInvalidQuestionMark(node: Declaration, questionToken: Node, message: DiagnosticMessage): boolean {
            if (questionToken) {
                return grammarErrorOnNode(questionToken, message);
            }
        }

        function checkGrammarObjectLiteralExpression(node: ObjectLiteralExpression, inDestructuring: boolean) {
            const seen: Map<SymbolFlags> = {};
            const Property = 1;
            const GetAccessor = 2;
            const SetAccesor = 4;
            const GetOrSetAccessor = GetAccessor | SetAccesor;

            for (const prop of node.properties) {
                const name = prop.name;
                if (prop.kind === SyntaxKind.OmittedExpression ||
                    name.kind === SyntaxKind.ComputedPropertyName) {
                    // If the name is not a ComputedPropertyName, the grammar checking will skip it
                    checkGrammarComputedPropertyName(<ComputedPropertyName>name);
                    continue;
                }

                if (prop.kind === SyntaxKind.ShorthandPropertyAssignment && !inDestructuring && (<ShorthandPropertyAssignment>prop).objectAssignmentInitializer) {
                    // having objectAssignmentInitializer is only valid in ObjectAssignmentPattern
                    // outside of destructuring it is a syntax error
                    return grammarErrorOnNode((<ShorthandPropertyAssignment>prop).equalsToken, Diagnostics.can_only_be_used_in_an_object_literal_property_inside_a_destructuring_assignment);
                }

                // ECMA-262 11.1.5 Object Initialiser
                // If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
                // a.This production is contained in strict code and IsDataDescriptor(previous) is true and
                // IsDataDescriptor(propId.descriptor) is true.
                //    b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
                //    c.IsAccessorDescriptor(previous) is true and IsDataDescriptor(propId.descriptor) is true.
                //    d.IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true
                // and either both previous and propId.descriptor have[[Get]] fields or both previous and propId.descriptor have[[Set]] fields
                let currentKind: number;
                if (prop.kind === SyntaxKind.PropertyAssignment || prop.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    // Grammar checking for computedPropertName and shorthandPropertyAssignment
                    checkGrammarForInvalidQuestionMark(prop, (<PropertyAssignment>prop).questionToken, Diagnostics.An_object_member_cannot_be_declared_optional);
                    if (name.kind === SyntaxKind.NumericLiteral) {
                        checkGrammarNumericLiteral(<Identifier>name);
                    }
                    currentKind = Property;
                }
                else if (prop.kind === SyntaxKind.MethodDeclaration) {
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
                    const existingKind = seen[(<Identifier>name).text];
                    if (currentKind === Property && existingKind === Property) {
                        continue;
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

        function checkGrammarJsxElement(node: JsxOpeningLikeElement) {
            const seen: Map<boolean> = {};
            for (const attr of node.attributes) {
                if (attr.kind === SyntaxKind.JsxSpreadAttribute) {
                    continue;
                }

                const jsxAttr = (<JsxAttribute>attr);
                const name = jsxAttr.name;
                if (!hasProperty(seen, name.text)) {
                    seen[name.text] = true;
                }
                else {
                    return grammarErrorOnNode(name, Diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name);
                }

                const initializer = jsxAttr.initializer;
                if (initializer && initializer.kind === SyntaxKind.JsxExpression && !(<JsxExpression>initializer).expression) {
                    return grammarErrorOnNode(jsxAttr.initializer, Diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression);
                }
            }
        }

        function checkGrammarForInOrForOfStatement(forInOrOfStatement: ForInStatement | ForOfStatement): boolean {
            if (checkGrammarStatementInAmbientContext(forInOrOfStatement)) {
                return true;
            }

            if (forInOrOfStatement.initializer.kind === SyntaxKind.VariableDeclarationList) {
                const variableList = <VariableDeclarationList>forInOrOfStatement.initializer;
                if (!checkGrammarVariableDeclarationList(variableList)) {
                    if (variableList.declarations.length > 1) {
                        const diagnostic = forInOrOfStatement.kind === SyntaxKind.ForInStatement
                            ? Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement
                            : Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement;
                        return grammarErrorOnFirstToken(variableList.declarations[1], diagnostic);
                    }
                    const firstDeclaration = variableList.declarations[0];
                    if (firstDeclaration.initializer) {
                        const diagnostic = forInOrOfStatement.kind === SyntaxKind.ForInStatement
                            ? Diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer
                            : Diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer;
                        return grammarErrorOnNode(firstDeclaration.name, diagnostic);
                    }
                    if (firstDeclaration.type) {
                        const diagnostic = forInOrOfStatement.kind === SyntaxKind.ForInStatement
                            ? Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation
                            : Diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation;
                        return grammarErrorOnNode(firstDeclaration, diagnostic);
                    }
                }
            }

            return false;
        }

        function checkGrammarAccessor(accessor: MethodDeclaration): boolean {
            const kind = accessor.kind;
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
                    const parameter = accessor.parameters[0];
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

        function checkGrammarForNonSymbolComputedProperty(node: DeclarationName, message: DiagnosticMessage) {
            if (isDynamicName(node)) {
                return grammarErrorOnNode(node, message);
            }
        }

        function checkGrammarMethod(node: MethodDeclaration) {
            if (checkGrammarDisallowedModifiersOnObjectLiteralExpressionMethod(node) ||
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

            if (isClassLike(node.parent)) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                // Technically, computed properties in ambient contexts is disallowed
                // for property declarations and accessors too, not just methods.
                // However, property declarations disallow computed names in general,
                // and accessors are not allowed in ambient contexts in general,
                // so this error only really matters for methods.
                if (isInAmbientContext(node)) {
                    return checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol);
                }
                else if (!node.body) {
                    return checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol);
                }
            }
            else if (node.parent.kind === SyntaxKind.InterfaceDeclaration) {
                return checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol);
            }
            else if (node.parent.kind === SyntaxKind.TypeLiteral) {
                return checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol);
            }
        }

        function checkGrammarBreakOrContinueStatement(node: BreakOrContinueStatement): boolean {
            let current: Node = node;
            while (current) {
                if (isFunctionLike(current)) {
                    return grammarErrorOnNode(node, Diagnostics.Jump_target_cannot_cross_function_boundary);
                }

                switch (current.kind) {
                    case SyntaxKind.LabeledStatement:
                        if (node.label && (<LabeledStatement>current).label.text === node.label.text) {
                            // found matching label - verify that label usage is correct
                            // continue can only target labels that are on iteration statements
                            const isMisplacedContinueLabel = node.kind === SyntaxKind.ContinueStatement
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
                const message = node.kind === SyntaxKind.BreakStatement
                    ? Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement
                    : Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;

                return grammarErrorOnNode(node, message);
            }
            else {
                const message = node.kind === SyntaxKind.BreakStatement
                    ? Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement
                    : Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message);
            }
        }

        function checkGrammarBindingElement(node: BindingElement) {
            if (node.dotDotDotToken) {
                const elements = (<BindingPattern>node.parent).elements;
                if (node !== lastOrUndefined(elements)) {
                    return grammarErrorOnNode(node, Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                }

                if (node.name.kind === SyntaxKind.ArrayBindingPattern || node.name.kind === SyntaxKind.ObjectBindingPattern) {
                    return grammarErrorOnNode(node.name, Diagnostics.A_rest_element_cannot_contain_a_binding_pattern);
                }

                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(getSourceFileOfNode(node), node.initializer.pos - 1, 1, Diagnostics.A_rest_element_cannot_have_an_initializer);
                }
            }
        }

        function checkGrammarVariableDeclaration(node: VariableDeclaration) {
            if (node.parent.parent.kind !== SyntaxKind.ForInStatement && node.parent.parent.kind !== SyntaxKind.ForOfStatement) {
                if (isInAmbientContext(node)) {
                    if (node.initializer) {
                        // Error on equals token which immediate precedes the initializer
                        const equalsTokenLength = "=".length;
                        return grammarErrorAtPos(getSourceFileOfNode(node), node.initializer.pos - equalsTokenLength,
                            equalsTokenLength, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                    }
                }
                else if (!node.initializer) {
                    if (isBindingPattern(node.name) && !isBindingPattern(node.parent)) {
                        return grammarErrorOnNode(node, Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                    }
                    if (isConst(node)) {
                        return grammarErrorOnNode(node, Diagnostics.const_declarations_must_be_initialized);
                    }
                }
            }

            const checkLetConstNames = languageVersion >= ScriptTarget.ES6 && (isLet(node) || isConst(node));

            // 1. LexicalDeclaration : LetOrConst BindingList ;
            // It is a Syntax Error if the BoundNames of BindingList contains "let".
            // 2. ForDeclaration: ForDeclaration : LetOrConst ForBinding
            // It is a Syntax Error if the BoundNames of ForDeclaration contains "let".

            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code
            // and its Identifier is eval or arguments
            return checkLetConstNames && checkGrammarNameInLetOrConstDeclarations(node.name);
        }

        function checkGrammarNameInLetOrConstDeclarations(name: Identifier | BindingPattern): boolean {
            if (name.kind === SyntaxKind.Identifier) {
                if ((<Identifier>name).text === "let") {
                    return grammarErrorOnNode(name, Diagnostics.let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations);
                }
            }
            else {
                const elements = (<BindingPattern>name).elements;
                for (const element of elements) {
                    if (element.kind !== SyntaxKind.OmittedExpression) {
                        checkGrammarNameInLetOrConstDeclarations(element.name);
                    }
                }
            }
        }

        function checkGrammarVariableDeclarationList(declarationList: VariableDeclarationList): boolean {
            const declarations = declarationList.declarations;
            if (checkGrammarForDisallowedTrailingComma(declarationList.declarations)) {
                return true;
            }

            if (!declarationList.declarations.length) {
                return grammarErrorAtPos(getSourceFileOfNode(declarationList), declarations.pos, declarations.end - declarations.pos, Diagnostics.Variable_declaration_list_cannot_be_empty);
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
                case SyntaxKind.ForOfStatement:
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
                const unaryExpression = <PrefixUnaryExpression>expression;
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

        function hasParseDiagnostics(sourceFile: SourceFile): boolean {
            return sourceFile.parseDiagnostics.length > 0;
        }

        function grammarErrorOnFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            const sourceFile = getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                const span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                diagnostics.add(createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2));
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
            const sourceFile = getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                diagnostics.add(createDiagnosticForNode(node, message, arg0, arg1, arg2));
                return true;
            }
        }

        function isEvalOrArgumentsIdentifier(node: Node): boolean {
            return node.kind === SyntaxKind.Identifier &&
                ((<Identifier>node).text === "eval" || (<Identifier>node).text === "arguments");
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
            if (isClassLike(node.parent)) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, Diagnostics.A_class_member_cannot_be_declared_optional) ||
                    checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol)) {
                    return true;
                }
            }
            else if (node.parent.kind === SyntaxKind.InterfaceDeclaration) {
                if (checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol)) {
                    return true;
                }
            }
            else if (node.parent.kind === SyntaxKind.TypeLiteral) {
                if (checkGrammarForNonSymbolComputedProperty(node.name, Diagnostics.A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol)) {
                    return true;
                }
            }

            if (isInAmbientContext(node) && node.initializer) {
                return grammarErrorOnFirstToken(node.initializer, Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
        }

        function checkGrammarTopLevelElementForRequiredDeclareModifier(node: Node): boolean {
            // A declare modifier is required for any top level .d.ts declaration except export=, export default,
            // interfaces and imports categories:
            //
            //  DeclarationElement:
            //     ExportAssignment
            //     export_opt   InterfaceDeclaration
            //     export_opt   TypeAliasDeclaration
            //     export_opt   ImportDeclaration
            //     export_opt   ExternalImportDeclaration
            //     export_opt   AmbientDeclaration
            //
            // TODO: The spec needs to be amended to reflect this grammar.
            if (node.kind === SyntaxKind.InterfaceDeclaration ||
                node.kind === SyntaxKind.TypeAliasDeclaration ||
                node.kind === SyntaxKind.ImportDeclaration ||
                node.kind === SyntaxKind.ImportEqualsDeclaration ||
                node.kind === SyntaxKind.ExportDeclaration ||
                node.kind === SyntaxKind.ExportAssignment ||
                (node.flags & NodeFlags.Ambient) ||
                (node.flags & (NodeFlags.Export | NodeFlags.Default))) {

                return false;
            }

            return grammarErrorOnFirstToken(node, Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
        }

        function checkGrammarTopLevelElementsForRequiredDeclareModifier(file: SourceFile): boolean {
            for (const decl of file.statements) {
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

        function checkGrammarStatementInAmbientContext(node: Node): boolean {
            if (isInAmbientContext(node)) {
                // An accessors is already reported about the ambient context
                if (isAccessor(node.parent.kind)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = true;
                }

                // Find containing block which is either Block, ModuleBlock, SourceFile
                const links = getNodeLinks(node);
                if (!links.hasReportedStatementInAmbientContext && isFunctionLike(node.parent)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts);
                }

                // We are either parented by another statement, or some sort of block.
                // If we're in a block, we only want to really report an error once
                // to prevent noisyness.  So use a bit on the block to indicate if
                // this has already been reported, and don't report if it has.
                //
                if (node.parent.kind === SyntaxKind.Block || node.parent.kind === SyntaxKind.ModuleBlock || node.parent.kind === SyntaxKind.SourceFile) {
                    const links = getNodeLinks(node.parent);
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

        function checkGrammarNumericLiteral(node: Identifier): boolean {
            // Grammar checking
            if (node.flags & NodeFlags.OctalLiteral && languageVersion >= ScriptTarget.ES5) {
                return grammarErrorOnNode(node, Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher);
            }
        }

        function grammarErrorAfterFirstToken(node: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): boolean {
            const sourceFile = getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                const span = getSpanOfTokenAtPosition(sourceFile, node.pos);
                diagnostics.add(createFileDiagnostic(sourceFile, textSpanEnd(span), /*length*/ 0, message, arg0, arg1, arg2));
                return true;
            }
        }
    }
}
