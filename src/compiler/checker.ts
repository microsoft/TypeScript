/* @internal */
namespace ts {
    const ambientModuleSymbolRegex = /^".+"$/;
    const anon = "(anonymous)" as __String & string;

    let nextSymbolId = 1;
    let nextNodeId = 1;
    let nextMergeId = 1;
    let nextFlowId = 1;

    const enum IterationUse {
        AllowsSyncIterablesFlag = 1 << 0,
        AllowsAsyncIterablesFlag = 1 << 1,
        AllowsStringInputFlag = 1 << 2,
        ForOfFlag = 1 << 3,
        YieldStarFlag = 1 << 4,
        SpreadFlag = 1 << 5,
        DestructuringFlag = 1 << 6,

        // Spread, Destructuring, Array element assignment
        Element = AllowsSyncIterablesFlag,
        Spread = AllowsSyncIterablesFlag | SpreadFlag,
        Destructuring = AllowsSyncIterablesFlag | DestructuringFlag,

        ForOf = AllowsSyncIterablesFlag | AllowsStringInputFlag | ForOfFlag,
        ForAwaitOf = AllowsSyncIterablesFlag | AllowsAsyncIterablesFlag | AllowsStringInputFlag | ForOfFlag,

        YieldStar = AllowsSyncIterablesFlag | YieldStarFlag,
        AsyncYieldStar = AllowsSyncIterablesFlag | AllowsAsyncIterablesFlag | YieldStarFlag,

        GeneratorReturnType = AllowsSyncIterablesFlag,
        AsyncGeneratorReturnType = AllowsAsyncIterablesFlag,

    }

    const enum IterationTypeKind {
        Yield,
        Return,
        Next,
    }

    interface IterationTypesResolver {
        iterableCacheKey: "iterationTypesOfAsyncIterable" | "iterationTypesOfIterable";
        iteratorCacheKey: "iterationTypesOfAsyncIterator" | "iterationTypesOfIterator";
        iteratorSymbolName: "asyncIterator" | "iterator";
        getGlobalIteratorType: (reportErrors: boolean) => GenericType;
        getGlobalIterableType: (reportErrors: boolean) => GenericType;
        getGlobalIterableIteratorType: (reportErrors: boolean) => GenericType;
        getGlobalGeneratorType: (reportErrors: boolean) => GenericType;
        resolveIterationType: (type: Type, errorNode: Node | undefined) => Type | undefined;
        mustHaveANextMethodDiagnostic: DiagnosticMessage;
        mustBeAMethodDiagnostic: DiagnosticMessage;
        mustHaveAValueDiagnostic: DiagnosticMessage;
    }

    const enum WideningKind {
        Normal,
        FunctionReturn,
        GeneratorNext,
        GeneratorYield,
    }

    const enum TypeFacts {
        None = 0,
        TypeofEQString = 1 << 0,      // typeof x === "string"
        TypeofEQNumber = 1 << 1,      // typeof x === "number"
        TypeofEQBigInt = 1 << 2,      // typeof x === "bigint"
        TypeofEQBoolean = 1 << 3,     // typeof x === "boolean"
        TypeofEQSymbol = 1 << 4,      // typeof x === "symbol"
        TypeofEQObject = 1 << 5,      // typeof x === "object"
        TypeofEQFunction = 1 << 6,    // typeof x === "function"
        TypeofEQHostObject = 1 << 7,  // typeof x === "xxx"
        TypeofNEString = 1 << 8,      // typeof x !== "string"
        TypeofNENumber = 1 << 9,      // typeof x !== "number"
        TypeofNEBigInt = 1 << 10,     // typeof x !== "bigint"
        TypeofNEBoolean = 1 << 11,     // typeof x !== "boolean"
        TypeofNESymbol = 1 << 12,     // typeof x !== "symbol"
        TypeofNEObject = 1 << 13,     // typeof x !== "object"
        TypeofNEFunction = 1 << 14,   // typeof x !== "function"
        TypeofNEHostObject = 1 << 15, // typeof x !== "xxx"
        EQUndefined = 1 << 16,        // x === undefined
        EQNull = 1 << 17,             // x === null
        EQUndefinedOrNull = 1 << 18,  // x === undefined / x === null
        NEUndefined = 1 << 19,        // x !== undefined
        NENull = 1 << 20,             // x !== null
        NEUndefinedOrNull = 1 << 21,  // x != undefined / x != null
        Truthy = 1 << 22,             // x
        Falsy = 1 << 23,              // !x
        All = (1 << 24) - 1,
        // The following members encode facts about particular kinds of types for use in the getTypeFacts function.
        // The presence of a particular fact means that the given test is true for some (and possibly all) values
        // of that kind of type.
        BaseStringStrictFacts = TypeofEQString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
        BaseStringFacts = BaseStringStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        StringStrictFacts = BaseStringStrictFacts | Truthy | Falsy,
        StringFacts = BaseStringFacts | Truthy,
        EmptyStringStrictFacts = BaseStringStrictFacts | Falsy,
        EmptyStringFacts = BaseStringFacts,
        NonEmptyStringStrictFacts = BaseStringStrictFacts | Truthy,
        NonEmptyStringFacts = BaseStringFacts | Truthy,
        BaseNumberStrictFacts = TypeofEQNumber | TypeofNEString | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
        BaseNumberFacts = BaseNumberStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        NumberStrictFacts = BaseNumberStrictFacts | Truthy | Falsy,
        NumberFacts = BaseNumberFacts | Truthy,
        ZeroNumberStrictFacts = BaseNumberStrictFacts | Falsy,
        ZeroNumberFacts = BaseNumberFacts,
        NonZeroNumberStrictFacts = BaseNumberStrictFacts | Truthy,
        NonZeroNumberFacts = BaseNumberFacts | Truthy,
        BaseBigIntStrictFacts = TypeofEQBigInt | TypeofNEString | TypeofNENumber | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
        BaseBigIntFacts = BaseBigIntStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        BigIntStrictFacts = BaseBigIntStrictFacts | Truthy | Falsy,
        BigIntFacts = BaseBigIntFacts | Truthy,
        ZeroBigIntStrictFacts = BaseBigIntStrictFacts | Falsy,
        ZeroBigIntFacts = BaseBigIntFacts,
        NonZeroBigIntStrictFacts = BaseBigIntStrictFacts | Truthy,
        NonZeroBigIntFacts = BaseBigIntFacts | Truthy,
        BaseBooleanStrictFacts = TypeofEQBoolean | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull,
        BaseBooleanFacts = BaseBooleanStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        BooleanStrictFacts = BaseBooleanStrictFacts | Truthy | Falsy,
        BooleanFacts = BaseBooleanFacts | Truthy,
        FalseStrictFacts = BaseBooleanStrictFacts | Falsy,
        FalseFacts = BaseBooleanFacts,
        TrueStrictFacts = BaseBooleanStrictFacts | Truthy,
        TrueFacts = BaseBooleanFacts | Truthy,
        SymbolStrictFacts = TypeofEQSymbol | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | NEUndefined | NENull | NEUndefinedOrNull | Truthy,
        SymbolFacts = SymbolStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        ObjectStrictFacts = TypeofEQObject | TypeofEQHostObject | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEFunction | NEUndefined | NENull | NEUndefinedOrNull | Truthy,
        ObjectFacts = ObjectStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        FunctionStrictFacts = TypeofEQFunction | TypeofEQHostObject | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | NEUndefined | NENull | NEUndefinedOrNull | Truthy,
        FunctionFacts = FunctionStrictFacts | EQUndefined | EQNull | EQUndefinedOrNull | Falsy,
        UndefinedFacts = TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | TypeofNEHostObject | EQUndefined | EQUndefinedOrNull | NENull | Falsy,
        NullFacts = TypeofEQObject | TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEFunction | TypeofNEHostObject | EQNull | EQUndefinedOrNull | NEUndefined | Falsy,
        EmptyObjectStrictFacts = All & ~(EQUndefined | EQNull | EQUndefinedOrNull),
        AllTypeofNE = TypeofNEString | TypeofNENumber | TypeofNEBigInt | TypeofNEBoolean | TypeofNESymbol | TypeofNEObject | TypeofNEFunction | NEUndefined,
        EmptyObjectFacts = All,
    }

    const typeofEQFacts: ReadonlyESMap<string, TypeFacts> = new Map(getEntries({
        string: TypeFacts.TypeofEQString,
        number: TypeFacts.TypeofEQNumber,
        bigint: TypeFacts.TypeofEQBigInt,
        boolean: TypeFacts.TypeofEQBoolean,
        symbol: TypeFacts.TypeofEQSymbol,
        undefined: TypeFacts.EQUndefined,
        object: TypeFacts.TypeofEQObject,
        function: TypeFacts.TypeofEQFunction
    }));

    const typeofNEFacts: ReadonlyESMap<string, TypeFacts> = new Map(getEntries({
        string: TypeFacts.TypeofNEString,
        number: TypeFacts.TypeofNENumber,
        bigint: TypeFacts.TypeofNEBigInt,
        boolean: TypeFacts.TypeofNEBoolean,
        symbol: TypeFacts.TypeofNESymbol,
        undefined: TypeFacts.NEUndefined,
        object: TypeFacts.TypeofNEObject,
        function: TypeFacts.TypeofNEFunction
    }));

    type TypeSystemEntity = Node | Symbol | Type | Signature;

    const enum TypeSystemPropertyName {
        Type,
        ResolvedBaseConstructorType,
        DeclaredType,
        ResolvedReturnType,
        ImmediateBaseConstraint,
        EnumTagType,
        ResolvedTypeArguments,
        ResolvedBaseTypes,
    }

    const enum CheckMode {
        Normal = 0,                     // Normal type checking
        Contextual = 1 << 0,            // Explicitly assigned contextual type, therefore not cacheable
        Inferential = 1 << 1,           // Inferential typing
        SkipContextSensitive = 1 << 2,  // Skip context sensitive function expressions
        SkipGenericFunctions = 1 << 3,  // Skip single signature generic functions
        IsForSignatureHelp = 1 << 4,    // Call resolution for purposes of signature help
    }

    const enum AccessFlags {
        None = 0,
        NoIndexSignatures = 1 << 0,
        Writing = 1 << 1,
        CacheSymbol = 1 << 2,
        NoTupleBoundsCheck = 1 << 3,
    }

    const enum SignatureCheckMode {
        BivariantCallback = 1 << 0,
        StrictCallback    = 1 << 1,
        IgnoreReturnTypes = 1 << 2,
        StrictArity       = 1 << 3,
        Callback          = BivariantCallback | StrictCallback,
    }

    const enum IntersectionState {
        None = 0,
        Source = 1 << 0,
        Target = 1 << 1,
        PropertyCheck = 1 << 2,
        InPropertyCheck = 1 << 3,
    }

    const enum MappedTypeModifiers {
        IncludeReadonly = 1 << 0,
        ExcludeReadonly = 1 << 1,
        IncludeOptional = 1 << 2,
        ExcludeOptional = 1 << 3,
    }

    const enum ExpandingFlags {
        None = 0,
        Source = 1,
        Target = 1 << 1,
        Both = Source | Target,
    }

    const enum MembersOrExportsResolutionKind {
        resolvedExports = "resolvedExports",
        resolvedMembers = "resolvedMembers"
    }

    const enum UnusedKind {
        Local,
        Parameter,
    }

    /** @param containingNode Node to check for parse error */
    type AddUnusedDiagnostic = (containingNode: Node, type: UnusedKind, diagnostic: DiagnosticWithLocation) => void;

    const isNotOverloadAndNotAccessor = and(isNotOverload, isNotAccessor);

    const enum DeclarationMeaning {
        GetAccessor = 1,
        SetAccessor = 2,
        PropertyAssignment = 4,
        Method = 8,
        GetOrSetAccessor = GetAccessor | SetAccessor,
        PropertyAssignmentOrMethod = PropertyAssignment | Method,
    }

    const enum DeclarationSpaces {
        None = 0,
        ExportValue = 1 << 0,
        ExportType = 1 << 1,
        ExportNamespace = 1 << 2,
    }

    const enum MinArgumentCountFlags {
        None = 0,
        StrongArityForUntypedJS = 1 << 0,
        VoidIsNonOptional = 1 << 1,
    }

    function SymbolLinks(this: SymbolLinks) {
    }

    function NodeLinks(this: NodeLinks) {
        this.flags = 0;
    }

    export function getNodeId(node: Node): number {
        if (!node.id) {
            node.id = nextNodeId;
            nextNodeId++;
        }
        return node.id;
    }

    export function getSymbolId(symbol: Symbol): SymbolId {
        if (!symbol.id) {
            symbol.id = nextSymbolId;
            nextSymbolId++;
        }

        return symbol.id;
    }

    export function isInstantiatedModule(node: ModuleDeclaration, preserveConstEnums: boolean) {
        const moduleState = getModuleInstanceState(node);
        return moduleState === ModuleInstanceState.Instantiated ||
            (preserveConstEnums && moduleState === ModuleInstanceState.ConstEnumOnly);
    }

    export function createTypeChecker(host: TypeCheckerHost, produceDiagnostics: boolean): TypeChecker {
        // fix performance
        const getPackagesSet = memoize(() => {
            const set = new Set<string>();
            host.getSourceFiles().forEach(sf => {
                if (!sf.resolvedModules) return;

                forEachEntry(sf.resolvedModules, r => {
                    if (r && r.packageId) set.add(r.packageId.name);
                });
            });
            return set;
        });

        // Cancellation that controls whether or not we can cancel in the middle of type checking.
        // In general cancelling is *not* safe for the type checker.  We might be in the middle of
        // computing something, and we will leave our internals in an inconsistent state.  Callers
        // who set the cancellation token should catch if a cancellation exception occurs, and
        // should throw away and create a new TypeChecker.
        //
        // Currently we only support setting the cancellation token when getting diagnostics.  This
        // is because diagnostics can be quite expensive, and we want to allow hosts to bail out if
        // they no longer need the information (for example, if the user started editing again).
        let cancellationToken: CancellationToken | undefined;
        let requestedExternalEmitHelpers: ExternalEmitHelpers;
        let externalHelpersModule: Symbol;

        const Symbol = objectAllocator.getSymbolConstructor();
        const Type = objectAllocator.getTypeConstructor();
        const Signature = objectAllocator.getSignatureConstructor();

        let typeCount = 0;
        let symbolCount = 0;
        let enumCount = 0;
        let totalInstantiationCount = 0;
        let instantiationCount = 0;
        let instantiationDepth = 0;
        let constraintDepth = 0;
        let currentNode: Node | undefined;

        const emptySymbols = createSymbolTable();
        const arrayVariances = [VarianceFlags.Covariant];

        const compilerOptions = host.getCompilerOptions();
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const allowSyntheticDefaultImports = getAllowSyntheticDefaultImports(compilerOptions);
        const strictNullChecks = getStrictOptionValue(compilerOptions, "strictNullChecks");
        const strictFunctionTypes = getStrictOptionValue(compilerOptions, "strictFunctionTypes");
        const strictBindCallApply = getStrictOptionValue(compilerOptions, "strictBindCallApply");
        const strictPropertyInitialization = getStrictOptionValue(compilerOptions, "strictPropertyInitialization");
        const noImplicitAny = getStrictOptionValue(compilerOptions, "noImplicitAny");
        const noImplicitThis = getStrictOptionValue(compilerOptions, "noImplicitThis");
        const keyofStringsOnly = !!compilerOptions.keyofStringsOnly;
        const freshObjectLiteralFlag = compilerOptions.suppressExcessPropertyErrors ? 0 : ObjectFlags.FreshLiteral;

        const emitResolver = createResolver();
        const nodeBuilder = createNodeBuilder();

        const globals = createSymbolTable();
        const undefinedSymbol = createSymbol(SymbolFlags.Property, "undefined" as __String);
        undefinedSymbol.declarations = [];

        const globalThisSymbol = createSymbol(SymbolFlags.Module, "globalThis" as __String, CheckFlags.Readonly);
        globalThisSymbol.exports = globals;
        globalThisSymbol.declarations = [];
        globals.set(globalThisSymbol.escapedName, globalThisSymbol);

        const argumentsSymbol = createSymbol(SymbolFlags.Property, "arguments" as __String);
        const requireSymbol = createSymbol(SymbolFlags.Property, "require" as __String);

        /** This will be set during calls to `getResolvedSignature` where services determines an apparent number of arguments greater than what is actually provided. */
        let apparentArgumentCount: number | undefined;

        // for public members that accept a Node or one of its subtypes, we must guard against
        // synthetic nodes created during transformations by calling `getParseTreeNode`.
        // for most of these, we perform the guard only on `checker` to avoid any possible
        // extra cost of calling `getParseTreeNode` when calling these functions from inside the
        // checker.
        const checker: TypeChecker = {
            getNodeCount: () => sum(host.getSourceFiles(), "nodeCount"),
            getIdentifierCount: () => sum(host.getSourceFiles(), "identifierCount"),
            getSymbolCount: () => sum(host.getSourceFiles(), "symbolCount") + symbolCount,
            getTypeCount: () => typeCount,
            getInstantiationCount: () => totalInstantiationCount,
            getRelationCacheSizes: () => ({
                assignable: assignableRelation.size,
                identity: identityRelation.size,
                subtype: subtypeRelation.size,
                strictSubtype: strictSubtypeRelation.size,
            }),
            isUndefinedSymbol: symbol => symbol === undefinedSymbol,
            isArgumentsSymbol: symbol => symbol === argumentsSymbol,
            isUnknownSymbol: symbol => symbol === unknownSymbol,
            getMergedSymbol,
            getDiagnostics,
            getGlobalDiagnostics,
            getTypeOfSymbolAtLocation: (symbol, locationIn) => {
                const location = getParseTreeNode(locationIn);
                return location ? getTypeOfSymbolAtLocation(symbol, location) : errorType;
            },
            getSymbolsOfParameterPropertyDeclaration: (parameterIn, parameterName) => {
                const parameter = getParseTreeNode(parameterIn, isParameter);
                if (parameter === undefined) return Debug.fail("Cannot get symbols of a synthetic parameter that cannot be resolved to a parse-tree node.");
                return getSymbolsOfParameterPropertyDeclaration(parameter, escapeLeadingUnderscores(parameterName));
            },
            getDeclaredTypeOfSymbol,
            getPropertiesOfType,
            getPropertyOfType: (type, name) => getPropertyOfType(type, escapeLeadingUnderscores(name)),
            getPrivateIdentifierPropertyOfType: (leftType: Type, name: string, location: Node) => {
                const node = getParseTreeNode(location);
                if (!node) {
                    return undefined;
                }
                const propName = escapeLeadingUnderscores(name);
                const lexicallyScopedIdentifier = lookupSymbolForPrivateIdentifierDeclaration(propName, node);
                return lexicallyScopedIdentifier ? getPrivateIdentifierPropertyOfType(leftType, lexicallyScopedIdentifier) : undefined;
            },
            getTypeOfPropertyOfType: (type, name) => getTypeOfPropertyOfType(type, escapeLeadingUnderscores(name)),
            getIndexInfoOfType,
            getSignaturesOfType,
            getIndexTypeOfType,
            getBaseTypes,
            getBaseTypeOfLiteralType,
            getWidenedType,
            getTypeFromTypeNode: nodeIn => {
                const node = getParseTreeNode(nodeIn, isTypeNode);
                return node ? getTypeFromTypeNode(node) : errorType;
            },
            getParameterType: getTypeAtPosition,
            getPromisedTypeOfPromise,
            getAwaitedType: type => getAwaitedType(type),
            getReturnTypeOfSignature,
            isNullableType,
            getNullableType,
            getNonNullableType,
            getNonOptionalType: removeOptionalTypeMarker,
            getTypeArguments,
            typeToTypeNode: nodeBuilder.typeToTypeNode,
            indexInfoToIndexSignatureDeclaration: nodeBuilder.indexInfoToIndexSignatureDeclaration,
            signatureToSignatureDeclaration: nodeBuilder.signatureToSignatureDeclaration,
            symbolToEntityName: nodeBuilder.symbolToEntityName,
            symbolToExpression: nodeBuilder.symbolToExpression,
            symbolToTypeParameterDeclarations: nodeBuilder.symbolToTypeParameterDeclarations,
            symbolToParameterDeclaration: nodeBuilder.symbolToParameterDeclaration,
            typeParameterToDeclaration: nodeBuilder.typeParameterToDeclaration,
            getSymbolsInScope: (locationIn, meaning) => {
                const location = getParseTreeNode(locationIn);
                return location ? getSymbolsInScope(location, meaning) : [];
            },
            getSymbolAtLocation: nodeIn => {
                const node = getParseTreeNode(nodeIn);
                // set ignoreErrors: true because any lookups invoked by the API shouldn't cause any new errors
                return node ? getSymbolAtLocation(node, /*ignoreErrors*/ true) : undefined;
            },
            getShorthandAssignmentValueSymbol: nodeIn => {
                const node = getParseTreeNode(nodeIn);
                return node ? getShorthandAssignmentValueSymbol(node) : undefined;
            },
            getExportSpecifierLocalTargetSymbol: nodeIn => {
                const node = getParseTreeNode(nodeIn, isExportSpecifier);
                return node ? getExportSpecifierLocalTargetSymbol(node) : undefined;
            },
            getExportSymbolOfSymbol(symbol) {
                return getMergedSymbol(symbol.exportSymbol || symbol);
            },
            getTypeAtLocation: nodeIn => {
                const node = getParseTreeNode(nodeIn);
                return node ? getTypeOfNode(node) : errorType;
            },
            getTypeOfAssignmentPattern: nodeIn => {
                const node = getParseTreeNode(nodeIn, isAssignmentPattern);
                return node && getTypeOfAssignmentPattern(node) || errorType;
            },
            getPropertySymbolOfDestructuringAssignment: locationIn => {
                const location = getParseTreeNode(locationIn, isIdentifier);
                return location ? getPropertySymbolOfDestructuringAssignment(location) : undefined;
            },
            signatureToString: (signature, enclosingDeclaration, flags, kind) => {
                return signatureToString(signature, getParseTreeNode(enclosingDeclaration), flags, kind);
            },
            typeToString: (type, enclosingDeclaration, flags) => {
                return typeToString(type, getParseTreeNode(enclosingDeclaration), flags);
            },
            symbolToString: (symbol, enclosingDeclaration, meaning, flags) => {
                return symbolToString(symbol, getParseTreeNode(enclosingDeclaration), meaning, flags);
            },
            typePredicateToString: (predicate, enclosingDeclaration, flags) => {
                return typePredicateToString(predicate, getParseTreeNode(enclosingDeclaration), flags);
            },
            writeSignature: (signature, enclosingDeclaration, flags, kind, writer) => {
                return signatureToString(signature, getParseTreeNode(enclosingDeclaration), flags, kind, writer);
            },
            writeType: (type, enclosingDeclaration, flags, writer) => {
                return typeToString(type, getParseTreeNode(enclosingDeclaration), flags, writer);
            },
            writeSymbol: (symbol, enclosingDeclaration, meaning, flags, writer) => {
                return symbolToString(symbol, getParseTreeNode(enclosingDeclaration), meaning, flags, writer);
            },
            writeTypePredicate: (predicate, enclosingDeclaration, flags, writer) => {
                return typePredicateToString(predicate, getParseTreeNode(enclosingDeclaration), flags, writer);
            },
            getAugmentedPropertiesOfType,
            getRootSymbols,
            getContextualType: (nodeIn: Expression, contextFlags?: ContextFlags) => {
                const node = getParseTreeNode(nodeIn, isExpression);
                if (!node) {
                    return undefined;
                }
                const containingCall = findAncestor(node, isCallLikeExpression);
                const containingCallResolvedSignature = containingCall && getNodeLinks(containingCall).resolvedSignature;
                if (contextFlags! & ContextFlags.Completions && containingCall) {
                    let toMarkSkip = node as Node;
                    do {
                        getNodeLinks(toMarkSkip).skipDirectInference = true;
                        toMarkSkip = toMarkSkip.parent;
                    } while (toMarkSkip && toMarkSkip !== containingCall);
                    getNodeLinks(containingCall).resolvedSignature = undefined;
                }
                const result = getContextualType(node, contextFlags);
                if (contextFlags! & ContextFlags.Completions && containingCall) {
                    let toMarkSkip = node as Node;
                    do {
                        getNodeLinks(toMarkSkip).skipDirectInference = undefined;
                        toMarkSkip = toMarkSkip.parent;
                    } while (toMarkSkip && toMarkSkip !== containingCall);
                    getNodeLinks(containingCall).resolvedSignature = containingCallResolvedSignature;
                }
                return result;
            },
            getContextualTypeForObjectLiteralElement: nodeIn => {
                const node = getParseTreeNode(nodeIn, isObjectLiteralElementLike);
                return node ? getContextualTypeForObjectLiteralElement(node) : undefined;
            },
            getContextualTypeForArgumentAtIndex: (nodeIn, argIndex) => {
                const node = getParseTreeNode(nodeIn, isCallLikeExpression);
                return node && getContextualTypeForArgumentAtIndex(node, argIndex);
            },
            getContextualTypeForJsxAttribute: (nodeIn) => {
                const node = getParseTreeNode(nodeIn, isJsxAttributeLike);
                return node && getContextualTypeForJsxAttribute(node);
            },
            isContextSensitive,
            getFullyQualifiedName,
            getResolvedSignature: (node, candidatesOutArray, argumentCount) =>
                getResolvedSignatureWorker(node, candidatesOutArray, argumentCount, CheckMode.Normal),
            getResolvedSignatureForSignatureHelp: (node, candidatesOutArray, argumentCount) =>
                getResolvedSignatureWorker(node, candidatesOutArray, argumentCount, CheckMode.IsForSignatureHelp),
            getExpandedParameters,
            hasEffectiveRestParameter,
            getConstantValue: nodeIn => {
                const node = getParseTreeNode(nodeIn, canHaveConstantValue);
                return node ? getConstantValue(node) : undefined;
            },
            isValidPropertyAccess: (nodeIn, propertyName) => {
                const node = getParseTreeNode(nodeIn, isPropertyAccessOrQualifiedNameOrImportTypeNode);
                return !!node && isValidPropertyAccess(node, escapeLeadingUnderscores(propertyName));
            },
            isValidPropertyAccessForCompletions: (nodeIn, type, property) => {
                const node = getParseTreeNode(nodeIn, isPropertyAccessExpression);
                return !!node && isValidPropertyAccessForCompletions(node, type, property);
            },
            getSignatureFromDeclaration: declarationIn => {
                const declaration = getParseTreeNode(declarationIn, isFunctionLike);
                return declaration ? getSignatureFromDeclaration(declaration) : undefined;
            },
            isImplementationOfOverload: nodeIn => {
                const node = getParseTreeNode(nodeIn, isFunctionLike);
                return node ? isImplementationOfOverload(node) : undefined;
            },
            getImmediateAliasedSymbol,
            getAliasedSymbol: resolveAlias,
            getEmitResolver,
            getExportsOfModule: getExportsOfModuleAsArray,
            getExportsAndPropertiesOfModule,
            getSymbolWalker: createGetSymbolWalker(
                getRestTypeOfSignature,
                getTypePredicateOfSignature,
                getReturnTypeOfSignature,
                getBaseTypes,
                resolveStructuredTypeMembers,
                getTypeOfSymbol,
                getResolvedSymbol,
                getIndexTypeOfStructuredType,
                getConstraintOfTypeParameter,
                getFirstIdentifier,
                getTypeArguments,
            ),
            getAmbientModules,
            getJsxIntrinsicTagNamesAt,
            isOptionalParameter: nodeIn => {
                const node = getParseTreeNode(nodeIn, isParameter);
                return node ? isOptionalParameter(node) : false;
            },
            tryGetMemberInModuleExports: (name, symbol) => tryGetMemberInModuleExports(escapeLeadingUnderscores(name), symbol),
            tryGetMemberInModuleExportsAndProperties: (name, symbol) => tryGetMemberInModuleExportsAndProperties(escapeLeadingUnderscores(name), symbol),
            tryFindAmbientModuleWithoutAugmentations: moduleName => {
                // we deliberately exclude augmentations
                // since we are only interested in declarations of the module itself
                return tryFindAmbientModule(moduleName, /*withAugmentations*/ false);
            },
            getApparentType,
            getUnionType,
            isTypeAssignableTo,
            createAnonymousType,
            createSignature,
            createSymbol,
            createIndexInfo,
            getAnyType: () => anyType,
            getStringType: () => stringType,
            getNumberType: () => numberType,
            createPromiseType,
            createArrayType,
            getElementTypeOfArrayType,
            getBooleanType: () => booleanType,
            getFalseType: (fresh?) => fresh ? falseType : regularFalseType,
            getTrueType: (fresh?) => fresh ? trueType : regularTrueType,
            getVoidType: () => voidType,
            getUndefinedType: () => undefinedType,
            getNullType: () => nullType,
            getESSymbolType: () => esSymbolType,
            getNeverType: () => neverType,
            getOptionalType: () => optionalType,
            isSymbolAccessible,
            isArrayType,
            isTupleType,
            isArrayLikeType,
            isTypeInvalidDueToUnionDiscriminant,
            getAllPossiblePropertiesOfTypes,
            getSuggestedSymbolForNonexistentProperty,
            getSuggestionForNonexistentProperty,
            getSuggestedSymbolForNonexistentJSXAttribute,
            getSuggestedSymbolForNonexistentSymbol: (location, name, meaning) => getSuggestedSymbolForNonexistentSymbol(location, escapeLeadingUnderscores(name), meaning),
            getSuggestionForNonexistentSymbol: (location, name, meaning) => getSuggestionForNonexistentSymbol(location, escapeLeadingUnderscores(name), meaning),
            getSuggestedSymbolForNonexistentModule,
            getSuggestionForNonexistentExport,
            getBaseConstraintOfType,
            getDefaultFromTypeParameter: type => type && type.flags & TypeFlags.TypeParameter ? getDefaultFromTypeParameter(type as TypeParameter) : undefined,
            resolveName(name, location, meaning, excludeGlobals) {
                return resolveName(location, escapeLeadingUnderscores(name), meaning, /*nameNotFoundMessage*/ undefined, /*nameArg*/ undefined, /*isUse*/ false, excludeGlobals);
            },
            getJsxNamespace: n => unescapeLeadingUnderscores(getJsxNamespace(n)),
            getAccessibleSymbolChain,
            getTypePredicateOfSignature,
            resolveExternalModuleName: moduleSpecifierIn => {
                const moduleSpecifier = getParseTreeNode(moduleSpecifierIn, isExpression);
                return moduleSpecifier && resolveExternalModuleName(moduleSpecifier, moduleSpecifier, /*ignoreErrors*/ true);
            },
            resolveExternalModuleSymbol,
            tryGetThisTypeAt: (nodeIn, includeGlobalThis) => {
                const node = getParseTreeNode(nodeIn);
                return node && tryGetThisTypeAt(node, includeGlobalThis);
            },
            getTypeArgumentConstraint: nodeIn => {
                const node = getParseTreeNode(nodeIn, isTypeNode);
                return node && getTypeArgumentConstraint(node);
            },
            getSuggestionDiagnostics: (fileIn, ct) => {
                const file = getParseTreeNode(fileIn, isSourceFile) || Debug.fail("Could not determine parsed source file.");
                if (skipTypeChecking(file, compilerOptions, host)) {
                    return emptyArray;
                }

                let diagnostics: DiagnosticWithLocation[] | undefined;
                try {
                    // Record the cancellation token so it can be checked later on during checkSourceElement.
                    // Do this in a finally block so we can ensure that it gets reset back to nothing after
                    // this call is done.
                    cancellationToken = ct;

                    // Ensure file is type checked
                    checkSourceFile(file);
                    Debug.assert(!!(getNodeLinks(file).flags & NodeCheckFlags.TypeChecked));

                    diagnostics = addRange(diagnostics, suggestionDiagnostics.getDiagnostics(file.fileName));
                    checkUnusedIdentifiers(getPotentiallyUnusedIdentifiers(file), (containingNode, kind, diag) => {
                        if (!containsParseError(containingNode) && !unusedIsError(kind, !!(containingNode.flags & NodeFlags.Ambient))) {
                            (diagnostics || (diagnostics = [])).push({ ...diag, category: DiagnosticCategory.Suggestion });
                        }
                    });

                    return diagnostics || emptyArray;
                }
                finally {
                    cancellationToken = undefined;
                }
            },

            runWithCancellationToken: (token, callback) => {
                try {
                    cancellationToken = token;
                    return callback(checker);
                }
                finally {
                    cancellationToken = undefined;
                }
            },

            getLocalTypeParametersOfClassOrInterfaceOrTypeAlias,
            isDeclarationVisible,
        };

        function getResolvedSignatureWorker(nodeIn: CallLikeExpression, candidatesOutArray: Signature[] | undefined, argumentCount: number | undefined, checkMode: CheckMode): Signature | undefined {
            const node = getParseTreeNode(nodeIn, isCallLikeExpression);
            apparentArgumentCount = argumentCount;
            const res = node ? getResolvedSignature(node, candidatesOutArray, checkMode) : undefined;
            apparentArgumentCount = undefined;
            return res;
        }

        const tupleTypes = new Map<string, GenericType>();
        const unionTypes = new Map<string, UnionType>();
        const intersectionTypes = new Map<string, Type>();
        const literalTypes = new Map<string, LiteralType>();
        const indexedAccessTypes = new Map<string, IndexedAccessType>();
        const substitutionTypes = new Map<string, SubstitutionType>();
        const evolvingArrayTypes: EvolvingArrayType[] = [];
        const undefinedProperties: SymbolTable = new Map();

        const unknownSymbol = createSymbol(SymbolFlags.Property, "unknown" as __String);
        const resolvingSymbol = createSymbol(0, InternalSymbolName.Resolving);

        const anyType = createIntrinsicType(TypeFlags.Any, "any");
        const autoType = createIntrinsicType(TypeFlags.Any, "any");
        const wildcardType = createIntrinsicType(TypeFlags.Any, "any");
        const errorType = createIntrinsicType(TypeFlags.Any, "error");
        const nonInferrableAnyType = createIntrinsicType(TypeFlags.Any, "any", ObjectFlags.ContainsWideningType);
        const unknownType = createIntrinsicType(TypeFlags.Unknown, "unknown");
        const undefinedType = createIntrinsicType(TypeFlags.Undefined, "undefined");
        const undefinedWideningType = strictNullChecks ? undefinedType : createIntrinsicType(TypeFlags.Undefined, "undefined", ObjectFlags.ContainsWideningType);
        const optionalType = createIntrinsicType(TypeFlags.Undefined, "undefined");
        const nullType = createIntrinsicType(TypeFlags.Null, "null");
        const nullWideningType = strictNullChecks ? nullType : createIntrinsicType(TypeFlags.Null, "null", ObjectFlags.ContainsWideningType);
        const stringType = createIntrinsicType(TypeFlags.String, "string");
        const numberType = createIntrinsicType(TypeFlags.Number, "number");
        const bigintType = createIntrinsicType(TypeFlags.BigInt, "bigint");
        const falseType = createIntrinsicType(TypeFlags.BooleanLiteral, "false") as FreshableIntrinsicType;
        const regularFalseType = createIntrinsicType(TypeFlags.BooleanLiteral, "false") as FreshableIntrinsicType;
        const trueType = createIntrinsicType(TypeFlags.BooleanLiteral, "true") as FreshableIntrinsicType;
        const regularTrueType = createIntrinsicType(TypeFlags.BooleanLiteral, "true") as FreshableIntrinsicType;
        trueType.regularType = regularTrueType;
        trueType.freshType = trueType;
        regularTrueType.regularType = regularTrueType;
        regularTrueType.freshType = trueType;
        falseType.regularType = regularFalseType;
        falseType.freshType = falseType;
        regularFalseType.regularType = regularFalseType;
        regularFalseType.freshType = falseType;
        const booleanType = createBooleanType([regularFalseType, regularTrueType]);
        // Also mark all combinations of fresh/regular booleans as "Boolean" so they print as `boolean` instead of `true | false`
        // (The union is cached, so simply doing the marking here is sufficient)
        createBooleanType([regularFalseType, trueType]);
        createBooleanType([falseType, regularTrueType]);
        createBooleanType([falseType, trueType]);
        const esSymbolType = createIntrinsicType(TypeFlags.ESSymbol, "symbol");
        const voidType = createIntrinsicType(TypeFlags.Void, "void");
        const neverType = createIntrinsicType(TypeFlags.Never, "never");
        const silentNeverType = createIntrinsicType(TypeFlags.Never, "never");
        const nonInferrableType = createIntrinsicType(TypeFlags.Never, "never", ObjectFlags.NonInferrableType);
        const implicitNeverType = createIntrinsicType(TypeFlags.Never, "never");
        const unreachableNeverType = createIntrinsicType(TypeFlags.Never, "never");
        const nonPrimitiveType = createIntrinsicType(TypeFlags.NonPrimitive, "object");
        const stringNumberSymbolType = getUnionType([stringType, numberType, esSymbolType]);
        const keyofConstraintType = keyofStringsOnly ? stringType : stringNumberSymbolType;
        const numberOrBigIntType = getUnionType([numberType, bigintType]);

        const restrictiveMapper: TypeMapper = makeFunctionTypeMapper(t => t.flags & TypeFlags.TypeParameter ? getRestrictiveTypeParameter(<TypeParameter>t) : t);
        const permissiveMapper: TypeMapper = makeFunctionTypeMapper(t => t.flags & TypeFlags.TypeParameter ? wildcardType : t);

        const emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        const emptyJsxObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        emptyJsxObjectType.objectFlags |= ObjectFlags.JsxAttributes;

        const emptyTypeLiteralSymbol = createSymbol(SymbolFlags.TypeLiteral, InternalSymbolName.Type);
        emptyTypeLiteralSymbol.members = createSymbolTable();
        const emptyTypeLiteralType = createAnonymousType(emptyTypeLiteralSymbol, emptySymbols, emptyArray, emptyArray, undefined, undefined);

        const emptyGenericType = <GenericType><ObjectType>createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        emptyGenericType.instantiations = new Map<string, TypeReference>();

        const anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        // The anyFunctionType contains the anyFunctionType by definition. The flag is further propagated
        // in getPropagatingFlagsOfTypes, and it is checked in inferFromTypes.
        anyFunctionType.objectFlags |= ObjectFlags.NonInferrableType;

        const noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        const circularConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        const resolvingDefaultType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);

        const markerSuperType = createTypeParameter();
        const markerSubType = createTypeParameter();
        markerSubType.constraint = markerSuperType;
        const markerOtherType = createTypeParameter();

        const noTypePredicate = createTypePredicate(TypePredicateKind.Identifier, "<<unresolved>>", 0, anyType);

        const anySignature = createSignature(undefined, undefined, undefined, emptyArray, anyType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
        const unknownSignature = createSignature(undefined, undefined, undefined, emptyArray, errorType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
        const resolvingSignature = createSignature(undefined, undefined, undefined, emptyArray, anyType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
        const silentNeverSignature = createSignature(undefined, undefined, undefined, emptyArray, silentNeverType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);

        const enumNumberIndexInfo = createIndexInfo(stringType, /*isReadonly*/ true);

        const iterationTypesCache = new Map<string, IterationTypes>(); // cache for common IterationTypes instances
        const noIterationTypes: IterationTypes = {
            get yieldType(): Type { return Debug.fail("Not supported"); },
            get returnType(): Type { return Debug.fail("Not supported"); },
            get nextType(): Type { return Debug.fail("Not supported"); },
        };

        const anyIterationTypes = createIterationTypes(anyType, anyType, anyType);
        const anyIterationTypesExceptNext = createIterationTypes(anyType, anyType, unknownType);
        const defaultIterationTypes = createIterationTypes(neverType, anyType, undefinedType); // default iteration types for `Iterator`.

        const asyncIterationTypesResolver: IterationTypesResolver = {
            iterableCacheKey: "iterationTypesOfAsyncIterable",
            iteratorCacheKey: "iterationTypesOfAsyncIterator",
            iteratorSymbolName: "asyncIterator",
            getGlobalIteratorType: getGlobalAsyncIteratorType,
            getGlobalIterableType: getGlobalAsyncIterableType,
            getGlobalIterableIteratorType: getGlobalAsyncIterableIteratorType,
            getGlobalGeneratorType: getGlobalAsyncGeneratorType,
            resolveIterationType: getAwaitedType,
            mustHaveANextMethodDiagnostic: Diagnostics.An_async_iterator_must_have_a_next_method,
            mustBeAMethodDiagnostic: Diagnostics.The_0_property_of_an_async_iterator_must_be_a_method,
            mustHaveAValueDiagnostic: Diagnostics.The_type_returned_by_the_0_method_of_an_async_iterator_must_be_a_promise_for_a_type_with_a_value_property,
        };

        const syncIterationTypesResolver: IterationTypesResolver = {
            iterableCacheKey: "iterationTypesOfIterable",
            iteratorCacheKey: "iterationTypesOfIterator",
            iteratorSymbolName: "iterator",
            getGlobalIteratorType,
            getGlobalIterableType,
            getGlobalIterableIteratorType,
            getGlobalGeneratorType,
            resolveIterationType: (type, _errorNode) => type,
            mustHaveANextMethodDiagnostic: Diagnostics.An_iterator_must_have_a_next_method,
            mustBeAMethodDiagnostic: Diagnostics.The_0_property_of_an_iterator_must_be_a_method,
            mustHaveAValueDiagnostic: Diagnostics.The_type_returned_by_the_0_method_of_an_iterator_must_have_a_value_property,
        };

        interface DuplicateInfoForSymbol {
            readonly firstFileLocations: Declaration[];
            readonly secondFileLocations: Declaration[];
            readonly isBlockScoped: boolean;
        }
        interface DuplicateInfoForFiles {
            readonly firstFile: SourceFile;
            readonly secondFile: SourceFile;
            /** Key is symbol name. */
            readonly conflictingSymbols: ESMap<string, DuplicateInfoForSymbol>;
        }
        /** Key is "/path/to/a.ts|/path/to/b.ts". */
        let amalgamatedDuplicates: ESMap<string, DuplicateInfoForFiles> | undefined;
        const reverseMappedCache = new Map<string, Type | undefined>();
        let inInferTypeForHomomorphicMappedType = false;
        let ambientModulesCache: Symbol[] | undefined;
        /**
         * List of every ambient module with a "*" wildcard.
         * Unlike other ambient modules, these can't be stored in `globals` because symbol tables only deal with exact matches.
         * This is only used if there is no exact match.
         */
        let patternAmbientModules: PatternAmbientModule[];
        let patternAmbientModuleAugmentations: ESMap<string, Symbol> | undefined;

        let globalObjectType: ObjectType;
        let globalFunctionType: ObjectType;
        let globalCallableFunctionType: ObjectType;
        let globalNewableFunctionType: ObjectType;
        let globalArrayType: GenericType;
        let globalReadonlyArrayType: GenericType;
        let globalStringType: ObjectType;
        let globalNumberType: ObjectType;
        let globalBooleanType: ObjectType;
        let globalRegExpType: ObjectType;
        let globalThisType: GenericType;
        let anyArrayType: Type;
        let autoArrayType: Type;
        let anyReadonlyArrayType: Type;
        let deferredGlobalNonNullableTypeAlias: Symbol;

        // The library files are only loaded when the feature is used.
        // This allows users to just specify library files they want to used through --lib
        // and they will not get an error from not having unrelated library files
        let deferredGlobalESSymbolConstructorSymbol: Symbol | undefined;
        let deferredGlobalESSymbolType: ObjectType;
        let deferredGlobalTypedPropertyDescriptorType: GenericType;
        let deferredGlobalPromiseType: GenericType;
        let deferredGlobalPromiseLikeType: GenericType;
        let deferredGlobalPromiseConstructorSymbol: Symbol | undefined;
        let deferredGlobalPromiseConstructorLikeType: ObjectType;
        let deferredGlobalIterableType: GenericType;
        let deferredGlobalIteratorType: GenericType;
        let deferredGlobalIterableIteratorType: GenericType;
        let deferredGlobalGeneratorType: GenericType;
        let deferredGlobalIteratorYieldResultType: GenericType;
        let deferredGlobalIteratorReturnResultType: GenericType;
        let deferredGlobalAsyncIterableType: GenericType;
        let deferredGlobalAsyncIteratorType: GenericType;
        let deferredGlobalAsyncIterableIteratorType: GenericType;
        let deferredGlobalAsyncGeneratorType: GenericType;
        let deferredGlobalTemplateStringsArrayType: ObjectType;
        let deferredGlobalImportMetaType: ObjectType;
        let deferredGlobalExtractSymbol: Symbol;
        let deferredGlobalOmitSymbol: Symbol;
        let deferredGlobalBigIntType: ObjectType;

        const allPotentiallyUnusedIdentifiers = new Map<Path, PotentiallyUnusedIdentifier[]>(); // key is file name

        let flowLoopStart = 0;
        let flowLoopCount = 0;
        let sharedFlowCount = 0;
        let flowAnalysisDisabled = false;
        let flowInvocationCount = 0;
        let lastFlowNode: FlowNode | undefined;
        let lastFlowNodeReachable: boolean;
        let flowTypeCache: Type[] | undefined;

        const emptyStringType = getLiteralType("");
        const zeroType = getLiteralType(0);
        const zeroBigIntType = getLiteralType({ negative: false, base10Value: "0" });

        const resolutionTargets: TypeSystemEntity[] = [];
        const resolutionResults: boolean[] = [];
        const resolutionPropertyNames: TypeSystemPropertyName[] = [];

        let suggestionCount = 0;
        const maximumSuggestionCount = 10;
        const mergedSymbols: Symbol[] = [];
        const symbolLinks: SymbolLinks[] = [];
        const nodeLinks: NodeLinks[] = [];
        const flowLoopCaches: ESMap<string, Type>[] = [];
        const flowLoopNodes: FlowNode[] = [];
        const flowLoopKeys: string[] = [];
        const flowLoopTypes: Type[][] = [];
        const sharedFlowNodes: FlowNode[] = [];
        const sharedFlowTypes: FlowType[] = [];
        const flowNodeReachable: (boolean | undefined)[] = [];
        const flowNodePostSuper: (boolean | undefined)[] = [];
        const potentialThisCollisions: Node[] = [];
        const potentialNewTargetCollisions: Node[] = [];
        const potentialWeakMapCollisions: Node[] = [];
        const awaitedTypeStack: number[] = [];

        const diagnostics = createDiagnosticCollection();
        const suggestionDiagnostics = createDiagnosticCollection();

        const typeofTypesByName: ReadonlyESMap<string, Type> = new Map(getEntries({
            string: stringType,
            number: numberType,
            bigint: bigintType,
            boolean: booleanType,
            symbol: esSymbolType,
            undefined: undefinedType
        }));
        const typeofType = createTypeofType();

        let _jsxNamespace: __String;
        let _jsxFactoryEntity: EntityName | undefined;
        let outofbandVarianceMarkerHandler: ((onlyUnreliable: boolean) => void) | undefined;

        const subtypeRelation = new Map<string, RelationComparisonResult>();
        const strictSubtypeRelation = new Map<string, RelationComparisonResult>();
        const assignableRelation = new Map<string, RelationComparisonResult>();
        const comparableRelation = new Map<string, RelationComparisonResult>();
        const identityRelation = new Map<string, RelationComparisonResult>();
        const enumRelation = new Map<string, RelationComparisonResult>();

        const builtinGlobals = createSymbolTable();
        builtinGlobals.set(undefinedSymbol.escapedName, undefinedSymbol);

        initializeTypeChecker();

        return checker;

        function getJsxNamespace(location: Node | undefined): __String {
            if (location) {
                const file = getSourceFileOfNode(location);
                if (file) {
                    if (isJsxOpeningFragment(location)) {
                        if (file.localJsxFragmentNamespace) {
                            return file.localJsxFragmentNamespace;
                        }
                        const jsxFragmentPragma = file.pragmas.get("jsxfrag");
                        if (jsxFragmentPragma) {
                            const chosenPragma = isArray(jsxFragmentPragma) ? jsxFragmentPragma[0] : jsxFragmentPragma;
                            file.localJsxFragmentFactory = parseIsolatedEntityName(chosenPragma.arguments.factory, languageVersion);
                            visitNode(file.localJsxFragmentFactory, markAsSynthetic);
                            if (file.localJsxFragmentFactory) {
                                return file.localJsxFragmentNamespace = getFirstIdentifier(file.localJsxFragmentFactory).escapedText;
                            }
                        }
                        const entity = getJsxFragmentFactoryEntity(location);
                        if (entity) {
                            file.localJsxFragmentFactory = entity;
                            return file.localJsxFragmentNamespace = getFirstIdentifier(entity).escapedText;
                        }
                    }
                    else {
                        if (file.localJsxNamespace) {
                            return file.localJsxNamespace;
                        }
                        const jsxPragma = file.pragmas.get("jsx");
                        if (jsxPragma) {
                            const chosenPragma = isArray(jsxPragma) ? jsxPragma[0] : jsxPragma;
                            file.localJsxFactory = parseIsolatedEntityName(chosenPragma.arguments.factory, languageVersion);
                            visitNode(file.localJsxFactory, markAsSynthetic);
                            if (file.localJsxFactory) {
                                return file.localJsxNamespace = getFirstIdentifier(file.localJsxFactory).escapedText;
                            }
                        }
                    }
                }
            }
            if (!_jsxNamespace) {
                _jsxNamespace = "React" as __String;
                if (compilerOptions.jsxFactory) {
                    _jsxFactoryEntity = parseIsolatedEntityName(compilerOptions.jsxFactory, languageVersion);
                    visitNode(_jsxFactoryEntity, markAsSynthetic);
                    if (_jsxFactoryEntity) {
                        _jsxNamespace = getFirstIdentifier(_jsxFactoryEntity).escapedText;
                    }
                }
                else if (compilerOptions.reactNamespace) {
                    _jsxNamespace = escapeLeadingUnderscores(compilerOptions.reactNamespace);
                }
            }
            if (!_jsxFactoryEntity) {
                _jsxFactoryEntity = factory.createQualifiedName(factory.createIdentifier(unescapeLeadingUnderscores(_jsxNamespace)), "createElement");
            }
            return _jsxNamespace;

            function markAsSynthetic(node: Node): VisitResult<Node> {
                setTextRangePosEnd(node, -1, -1);
                return visitEachChild(node, markAsSynthetic, nullTransformationContext);
            }
        }

        function getEmitResolver(sourceFile: SourceFile, cancellationToken: CancellationToken) {
            // Ensure we have all the type information in place for this file so that all the
            // emitter questions of this resolver will return the right information.
            getDiagnostics(sourceFile, cancellationToken);
            return emitResolver;
        }

        function lookupOrIssueError(location: Node | undefined, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
            const diagnostic = location
                ? createDiagnosticForNode(location, message, arg0, arg1, arg2, arg3)
                : createCompilerDiagnostic(message, arg0, arg1, arg2, arg3);
            const existing = diagnostics.lookup(diagnostic);
            if (existing) {
                return existing;
            }
            else {
                diagnostics.add(diagnostic);
                return diagnostic;
            }
        }

        function errorSkippedOn(key: keyof CompilerOptions, location: Node | undefined, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
            const diagnostic = error(location, message, arg0, arg1, arg2, arg3);
            diagnostic.skippedOn = key;
            return diagnostic;
        }

        function error(location: Node | undefined, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
            const diagnostic = location
                ? createDiagnosticForNode(location, message, arg0, arg1, arg2, arg3)
                : createCompilerDiagnostic(message, arg0, arg1, arg2, arg3);
            diagnostics.add(diagnostic);
            return diagnostic;
        }

        function addErrorOrSuggestion(isError: boolean, diagnostic: DiagnosticWithLocation) {
            if (isError) {
                diagnostics.add(diagnostic);
            }
            else {
                suggestionDiagnostics.add({ ...diagnostic, category: DiagnosticCategory.Suggestion });
            }
        }
        function errorOrSuggestion(isError: boolean, location: Node, message: DiagnosticMessage | DiagnosticMessageChain, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): void {
            addErrorOrSuggestion(isError, "message" in message ? createDiagnosticForNode(location, message, arg0, arg1, arg2, arg3) : createDiagnosticForNodeFromMessageChain(location, message)); // eslint-disable-line no-in-operator
        }

        function errorAndMaybeSuggestAwait(
            location: Node,
            maybeMissingAwait: boolean,
            message: DiagnosticMessage,
            arg0?: string | number | undefined, arg1?: string | number | undefined, arg2?: string | number | undefined, arg3?: string | number | undefined): Diagnostic {
            const diagnostic = error(location, message, arg0, arg1, arg2, arg3);
            if (maybeMissingAwait) {
                const related = createDiagnosticForNode(location, Diagnostics.Did_you_forget_to_use_await);
                addRelatedInfo(diagnostic, related);
            }
            return diagnostic;
        }

        function createSymbol(flags: SymbolFlags, name: __String, checkFlags?: CheckFlags) {
            symbolCount++;
            const symbol = <TransientSymbol>(new Symbol(flags | SymbolFlags.Transient, name));
            symbol.checkFlags = checkFlags || 0;
            return symbol;
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
            if (!source.mergeId) {
                source.mergeId = nextMergeId;
                nextMergeId++;
            }
            mergedSymbols[source.mergeId] = target;
        }

        function cloneSymbol(symbol: Symbol): Symbol {
            const result = createSymbol(symbol.flags, symbol.escapedName);
            result.declarations = symbol.declarations ? symbol.declarations.slice() : [];
            result.parent = symbol.parent;
            if (symbol.valueDeclaration) result.valueDeclaration = symbol.valueDeclaration;
            if (symbol.constEnumOnlyModule) result.constEnumOnlyModule = true;
            if (symbol.members) result.members = new Map(symbol.members);
            if (symbol.exports) result.exports = new Map(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }

        /**
         * Note: if target is transient, then it is mutable, and mergeSymbol with both mutate and return it.
         * If target is not transient, mergeSymbol will produce a transient clone, mutate that and return it.
         */
        function mergeSymbol(target: Symbol, source: Symbol, unidirectional = false): Symbol {
            if (!(target.flags & getExcludedSymbolFlags(source.flags)) ||
                (source.flags | target.flags) & SymbolFlags.Assignment) {
                if (source === target) {
                    // This can happen when an export assigned namespace exports something also erroneously exported at the top level
                    // See `declarationFileNoCrashOnExtraExportModifier` for an example
                    return target;
                }
                if (!(target.flags & SymbolFlags.Transient)) {
                    const resolvedTarget = resolveSymbol(target);
                    if (resolvedTarget === unknownSymbol) {
                        return source;
                    }
                    target = cloneSymbol(resolvedTarget);
                }
                // Javascript static-property-assignment declarations always merge, even though they are also values
                if (source.flags & SymbolFlags.ValueModule && target.flags & SymbolFlags.ValueModule && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                    // reset flag when merging instantiated module into value module that has only const enums
                    target.constEnumOnlyModule = false;
                }
                target.flags |= source.flags;
                if (source.valueDeclaration) {
                    setValueDeclaration(target, source.valueDeclaration);
                }
                addRange(target.declarations, source.declarations);
                if (source.members) {
                    if (!target.members) target.members = createSymbolTable();
                    mergeSymbolTable(target.members, source.members, unidirectional);
                }
                if (source.exports) {
                    if (!target.exports) target.exports = createSymbolTable();
                    mergeSymbolTable(target.exports, source.exports, unidirectional);
                }
                if (!unidirectional) {
                    recordMergedSymbol(target, source);
                }
            }
            else if (target.flags & SymbolFlags.NamespaceModule) {
                // Do not report an error when merging `var globalThis` with the built-in `globalThis`,
                // as we will already report a "Declaration name conflicts..." error, and this error
                // won't make much sense.
                if (target !== globalThisSymbol) {
                    error(getNameOfDeclaration(source.declarations[0]), Diagnostics.Cannot_augment_module_0_with_value_exports_because_it_resolves_to_a_non_module_entity, symbolToString(target));
                }
            }
            else { // error
                const isEitherEnum = !!(target.flags & SymbolFlags.Enum || source.flags & SymbolFlags.Enum);
                const isEitherBlockScoped = !!(target.flags & SymbolFlags.BlockScopedVariable || source.flags & SymbolFlags.BlockScopedVariable);
                const message = isEitherEnum
                    ? Diagnostics.Enum_declarations_can_only_merge_with_namespace_or_other_enum_declarations
                    : isEitherBlockScoped
                        ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                        : Diagnostics.Duplicate_identifier_0;
                const sourceSymbolFile = source.declarations && getSourceFileOfNode(source.declarations[0]);
                const targetSymbolFile = target.declarations && getSourceFileOfNode(target.declarations[0]);
                const symbolName = symbolToString(source);

                // Collect top-level duplicate identifier errors into one mapping, so we can then merge their diagnostics if there are a bunch
                if (sourceSymbolFile && targetSymbolFile && amalgamatedDuplicates && !isEitherEnum && sourceSymbolFile !== targetSymbolFile) {
                    const firstFile = comparePaths(sourceSymbolFile.path, targetSymbolFile.path) === Comparison.LessThan ? sourceSymbolFile : targetSymbolFile;
                    const secondFile = firstFile === sourceSymbolFile ? targetSymbolFile : sourceSymbolFile;
                    const filesDuplicates = getOrUpdate(amalgamatedDuplicates, `${firstFile.path}|${secondFile.path}`, () =>
                        ({ firstFile, secondFile, conflictingSymbols: new Map() } as DuplicateInfoForFiles));
                    const conflictingSymbolInfo = getOrUpdate(filesDuplicates.conflictingSymbols, symbolName, () =>
                        ({ isBlockScoped: isEitherBlockScoped, firstFileLocations: [], secondFileLocations: [] } as DuplicateInfoForSymbol));
                    addDuplicateLocations(conflictingSymbolInfo.firstFileLocations, source);
                    addDuplicateLocations(conflictingSymbolInfo.secondFileLocations, target);
                }
                else {
                    addDuplicateDeclarationErrorsForSymbols(source, message, symbolName, target);
                    addDuplicateDeclarationErrorsForSymbols(target, message, symbolName, source);
                }
            }
            return target;

            function addDuplicateLocations(locs: Declaration[], symbol: Symbol): void {
                for (const decl of symbol.declarations) {
                    pushIfUnique(locs, decl);
                }
            }
        }

        function addDuplicateDeclarationErrorsForSymbols(target: Symbol, message: DiagnosticMessage, symbolName: string, source: Symbol) {
            forEach(target.declarations, node => {
                addDuplicateDeclarationError(node, message, symbolName, source.declarations);
            });
        }

        function addDuplicateDeclarationError(node: Declaration, message: DiagnosticMessage, symbolName: string, relatedNodes: readonly Declaration[] | undefined) {
            const errorNode = (getExpandoInitializer(node, /*isPrototypeAssignment*/ false) ? getNameOfExpando(node) : getNameOfDeclaration(node)) || node;
            const err = lookupOrIssueError(errorNode, message, symbolName);
            for (const relatedNode of relatedNodes || emptyArray) {
                const adjustedNode = (getExpandoInitializer(relatedNode, /*isPrototypeAssignment*/ false) ? getNameOfExpando(relatedNode) : getNameOfDeclaration(relatedNode)) || relatedNode;
                if (adjustedNode === errorNode) continue;
                err.relatedInformation = err.relatedInformation || [];
                const leadingMessage = createDiagnosticForNode(adjustedNode, Diagnostics._0_was_also_declared_here, symbolName);
                const followOnMessage = createDiagnosticForNode(adjustedNode, Diagnostics.and_here);
                if (length(err.relatedInformation) >= 5 || some(err.relatedInformation, r => compareDiagnostics(r, followOnMessage) === Comparison.EqualTo || compareDiagnostics(r, leadingMessage) === Comparison.EqualTo)) continue;
                addRelatedInfo(err, !length(err.relatedInformation) ? leadingMessage : followOnMessage);
            }
        }

        function combineSymbolTables(first: SymbolTable | undefined, second: SymbolTable | undefined): SymbolTable | undefined {
            if (!first?.size) return second;
            if (!second?.size) return first;
            const combined = createSymbolTable();
            mergeSymbolTable(combined, first);
            mergeSymbolTable(combined, second);
            return combined;
        }

        function mergeSymbolTable(target: SymbolTable, source: SymbolTable, unidirectional = false) {
            source.forEach((sourceSymbol, id) => {
                const targetSymbol = target.get(id);
                target.set(id, targetSymbol ? mergeSymbol(targetSymbol, sourceSymbol, unidirectional) : sourceSymbol);
            });
        }

        function mergeModuleAugmentation(moduleName: StringLiteral | Identifier): void {
            const moduleAugmentation = <ModuleDeclaration>moduleName.parent;
            if (moduleAugmentation.symbol.declarations[0] !== moduleAugmentation) {
                // this is a combined symbol for multiple augmentations within the same file.
                // its symbol already has accumulated information for all declarations
                // so we need to add it just once - do the work only for first declaration
                Debug.assert(moduleAugmentation.symbol.declarations.length > 1);
                return;
            }

            if (isGlobalScopeAugmentation(moduleAugmentation)) {
                mergeSymbolTable(globals, moduleAugmentation.symbol.exports!);
            }
            else {
                // find a module that about to be augmented
                // do not validate names of augmentations that are defined in ambient context
                const moduleNotFoundError = !(moduleName.parent.parent.flags & NodeFlags.Ambient)
                    ? Diagnostics.Invalid_module_name_in_augmentation_module_0_cannot_be_found
                    : undefined;
                let mainModule = resolveExternalModuleNameWorker(moduleName, moduleName, moduleNotFoundError, /*isForAugmentation*/ true);
                if (!mainModule) {
                    return;
                }
                // obtain item referenced by 'export='
                mainModule = resolveExternalModuleSymbol(mainModule);
                if (mainModule.flags & SymbolFlags.Namespace) {
                    // If we're merging an augmentation to a pattern ambient module, we want to
                    // perform the merge unidirectionally from the augmentation ('a.foo') to
                    // the pattern ('*.foo'), so that 'getMergedSymbol()' on a.foo gives you
                    // all the exports both from the pattern and from the augmentation, but
                    // 'getMergedSymbol()' on *.foo only gives you exports from *.foo.
                    if (some(patternAmbientModules, module => mainModule === module.symbol)) {
                        const merged = mergeSymbol(moduleAugmentation.symbol, mainModule, /*unidirectional*/ true);
                        if (!patternAmbientModuleAugmentations) {
                            patternAmbientModuleAugmentations = new Map();
                        }
                        // moduleName will be a StringLiteral since this is not `declare global`.
                        patternAmbientModuleAugmentations.set((moduleName as StringLiteral).text, merged);
                    }
                    else {
                        if (mainModule.exports?.get(InternalSymbolName.ExportStar) && moduleAugmentation.symbol.exports?.size) {
                            // We may need to merge the module augmentation's exports into the target symbols of the resolved exports
                            const resolvedExports = getResolvedMembersOrExportsOfSymbol(mainModule, MembersOrExportsResolutionKind.resolvedExports);
                            for (const [key, value] of arrayFrom(moduleAugmentation.symbol.exports.entries())) {
                                if (resolvedExports.has(key) && !mainModule.exports.has(key)) {
                                    mergeSymbol(resolvedExports.get(key)!, value);
                                }
                            }
                        }
                        mergeSymbol(mainModule, moduleAugmentation.symbol);
                    }
                }
                else {
                    // moduleName will be a StringLiteral since this is not `declare global`.
                    error(moduleName, Diagnostics.Cannot_augment_module_0_because_it_resolves_to_a_non_module_entity, (moduleName as StringLiteral).text);
                }
            }
        }

        function addToSymbolTable(target: SymbolTable, source: SymbolTable, message: DiagnosticMessage) {
            source.forEach((sourceSymbol, id) => {
                const targetSymbol = target.get(id);
                if (targetSymbol) {
                    // Error on redeclarations
                    forEach(targetSymbol.declarations, addDeclarationDiagnostic(unescapeLeadingUnderscores(id), message));
                }
                else {
                    target.set(id, sourceSymbol);
                }
            });

            function addDeclarationDiagnostic(id: string, message: DiagnosticMessage) {
                return (declaration: Declaration) => diagnostics.add(createDiagnosticForNode(declaration, message, id));
            }
        }

        function getSymbolLinks(symbol: Symbol): SymbolLinks {
            if (symbol.flags & SymbolFlags.Transient) return <TransientSymbol>symbol;
            const id = getSymbolId(symbol);
            return symbolLinks[id] || (symbolLinks[id] = new (<any>SymbolLinks)());
        }

        function getNodeLinks(node: Node): NodeLinks {
            const nodeId = getNodeId(node);
            return nodeLinks[nodeId] || (nodeLinks[nodeId] = new (<any>NodeLinks)());
        }

        function isGlobalSourceFile(node: Node) {
            return node.kind === SyntaxKind.SourceFile && !isExternalOrCommonJsModule(<SourceFile>node);
        }

        function getSymbol(symbols: SymbolTable, name: __String, meaning: SymbolFlags): Symbol | undefined {
            if (meaning) {
                const symbol = getMergedSymbol(symbols.get(name));
                if (symbol) {
                    Debug.assert((getCheckFlags(symbol) & CheckFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
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
            }
            // return undefined if we can't find a symbol.
        }

        /**
         * Get symbols that represent parameter-property-declaration as parameter and as property declaration
         * @param parameter a parameterDeclaration node
         * @param parameterName a name of the parameter to get the symbols for.
         * @return a tuple of two symbols
         */
        function getSymbolsOfParameterPropertyDeclaration(parameter: ParameterDeclaration, parameterName: __String): [Symbol, Symbol] {
            const constructorDeclaration = parameter.parent;
            const classDeclaration = parameter.parent.parent;

            const parameterSymbol = getSymbol(constructorDeclaration.locals!, parameterName, SymbolFlags.Value);
            const propertySymbol = getSymbol(getMembersOfSymbol(classDeclaration.symbol), parameterName, SymbolFlags.Value);

            if (parameterSymbol && propertySymbol) {
                return [parameterSymbol, propertySymbol];
            }

            return Debug.fail("There should exist two symbols, one as property declaration and one as parameter declaration");
        }

        function isBlockScopedNameDeclaredBeforeUse(declaration: Declaration, usage: Node): boolean {
            const declarationFile = getSourceFileOfNode(declaration);
            const useFile = getSourceFileOfNode(usage);
            const declContainer = getEnclosingBlockScopeContainer(declaration);
            if (declarationFile !== useFile) {
                if ((moduleKind && (declarationFile.externalModuleIndicator || useFile.externalModuleIndicator)) ||
                    (!outFile(compilerOptions)) ||
                    isInTypeQuery(usage) ||
                    declaration.flags & NodeFlags.Ambient) {
                    // nodes are in different files and order cannot be determined
                    return true;
                }
                // declaration is after usage
                // can be legal if usage is deferred (i.e. inside function or in initializer of instance property)
                if (isUsedInFunctionOrInstanceProperty(usage, declaration)) {
                    return true;
                }
                const sourceFiles = host.getSourceFiles();
                return sourceFiles.indexOf(declarationFile) <= sourceFiles.indexOf(useFile);
            }

            if (declaration.pos <= usage.pos && !(isPropertyDeclaration(declaration) && isThisProperty(usage.parent) && !declaration.initializer && !declaration.exclamationToken)) {
                // declaration is before usage
                if (declaration.kind === SyntaxKind.BindingElement) {
                    // still might be illegal if declaration and usage are both binding elements (eg var [a = b, b = b] = [1, 2])
                    const errorBindingElement = getAncestor(usage, SyntaxKind.BindingElement) as BindingElement;
                    if (errorBindingElement) {
                        return findAncestor(errorBindingElement, isBindingElement) !== findAncestor(declaration, isBindingElement) ||
                            declaration.pos < errorBindingElement.pos;
                    }
                    // or it might be illegal if usage happens before parent variable is declared (eg var [a] = a)
                    return isBlockScopedNameDeclaredBeforeUse(getAncestor(declaration, SyntaxKind.VariableDeclaration) as Declaration, usage);
                }
                else if (declaration.kind === SyntaxKind.VariableDeclaration) {
                    // still might be illegal if usage is in the initializer of the variable declaration (eg var a = a)
                    return !isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration as VariableDeclaration, usage);
                }
                else if (isClassDeclaration(declaration)) {
                    // still might be illegal if the usage is within a computed property name in the class (eg class A { static p = "a"; [A.p]() {} })
                    return !findAncestor(usage, n => isComputedPropertyName(n) && n.parent.parent === declaration);
                }
                else if (isPropertyDeclaration(declaration)) {
                    // still might be illegal if a self-referencing property initializer (eg private x = this.x)
                    return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, /*stopAtAnyPropertyDeclaration*/ false);
                }
                else if (isParameterPropertyDeclaration(declaration, declaration.parent)) {
                    // foo = this.bar is illegal in esnext+useDefineForClassFields when bar is a parameter property
                    return !(compilerOptions.target === ScriptTarget.ESNext && !!compilerOptions.useDefineForClassFields
                             && getContainingClass(declaration) === getContainingClass(usage)
                             && isUsedInFunctionOrInstanceProperty(usage, declaration));
                }
                return true;
            }


            // declaration is after usage, but it can still be legal if usage is deferred:
            // 1. inside an export specifier
            // 2. inside a function
            // 3. inside an instance property initializer, a reference to a non-instance property
            //    (except when target: "esnext" and useDefineForClassFields: true and the reference is to a parameter property)
            // 4. inside a static property initializer, a reference to a static method in the same class
            // 5. inside a TS export= declaration (since we will move the export statement during emit to avoid TDZ)
            // or if usage is in a type context:
            // 1. inside a type query (typeof in type position)
            // 2. inside a jsdoc comment
            if (usage.parent.kind === SyntaxKind.ExportSpecifier || (usage.parent.kind === SyntaxKind.ExportAssignment && (usage.parent as ExportAssignment).isExportEquals)) {
                // export specifiers do not use the variable, they only make it available for use
                return true;
            }
            // When resolving symbols for exports, the `usage` location passed in can be the export site directly
            if (usage.kind === SyntaxKind.ExportAssignment && (usage as ExportAssignment).isExportEquals) {
                return true;
            }

            if (!!(usage.flags & NodeFlags.JSDoc) || isInTypeQuery(usage) || usageInTypeDeclaration()) {
                return true;
            }
            if (isUsedInFunctionOrInstanceProperty(usage, declaration)) {
                if (compilerOptions.target === ScriptTarget.ESNext && !!compilerOptions.useDefineForClassFields
                    && getContainingClass(declaration)
                    && (isPropertyDeclaration(declaration) || isParameterPropertyDeclaration(declaration, declaration.parent))) {
                    return !isPropertyImmediatelyReferencedWithinDeclaration(declaration, usage, /*stopAtAnyPropertyDeclaration*/ true);
                }
                else {
                    return true;
                }
            }
            return false;

            function usageInTypeDeclaration() {
                return !!findAncestor(usage, node => isInterfaceDeclaration(node) || isTypeAliasDeclaration(node));
            }

            function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration: VariableDeclaration, usage: Node): boolean {
                switch (declaration.parent.parent.kind) {
                    case SyntaxKind.VariableStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.ForOfStatement:
                        // variable statement/for/for-of statement case,
                        // use site should not be inside variable declaration (initializer of declaration or binding element)
                        if (isSameScopeDescendentOf(usage, declaration, declContainer)) {
                            return true;
                        }
                        break;
                }

                // ForIn/ForOf case - use site should not be used in expression part
                const grandparent = declaration.parent.parent;
                return isForInOrOfStatement(grandparent) && isSameScopeDescendentOf(usage, grandparent.expression, declContainer);
            }

            function isUsedInFunctionOrInstanceProperty(usage: Node, declaration: Node): boolean {
                return !!findAncestor(usage, current => {
                    if (current === declContainer) {
                        return "quit";
                    }
                    if (isFunctionLike(current)) {
                        return true;
                    }

                    const initializerOfProperty = current.parent &&
                        current.parent.kind === SyntaxKind.PropertyDeclaration &&
                        (<PropertyDeclaration>current.parent).initializer === current;

                    if (initializerOfProperty) {
                        if (hasSyntacticModifier(current.parent, ModifierFlags.Static)) {
                            if (declaration.kind === SyntaxKind.MethodDeclaration) {
                                return true;
                            }
                        }
                        else {
                            const isDeclarationInstanceProperty = declaration.kind === SyntaxKind.PropertyDeclaration && !hasSyntacticModifier(declaration, ModifierFlags.Static);
                            if (!isDeclarationInstanceProperty || getContainingClass(usage) !== getContainingClass(declaration)) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }

            /** stopAtAnyPropertyDeclaration is used for detecting ES-standard class field use-before-def errors */
            function isPropertyImmediatelyReferencedWithinDeclaration(declaration: PropertyDeclaration | ParameterPropertyDeclaration, usage: Node, stopAtAnyPropertyDeclaration: boolean) {
                // always legal if usage is after declaration
                if (usage.end > declaration.end) {
                    return false;
                }

                // still might be legal if usage is deferred (e.g. x: any = () => this.x)
                // otherwise illegal if immediately referenced within the declaration (e.g. x: any = this.x)
                const ancestorChangingReferenceScope = findAncestor(usage, (node: Node) => {
                    if (node === declaration) {
                        return "quit";
                    }

                    switch (node.kind) {
                        case SyntaxKind.ArrowFunction:
                            return true;
                        case SyntaxKind.PropertyDeclaration:
                            // even when stopping at any property declaration, they need to come from the same class
                            return stopAtAnyPropertyDeclaration &&
                                (isPropertyDeclaration(declaration) && node.parent === declaration.parent
                                 || isParameterPropertyDeclaration(declaration, declaration.parent) && node.parent === declaration.parent.parent)
                                ? "quit": true;
                        case SyntaxKind.Block:
                            switch (node.parent.kind) {
                                case SyntaxKind.GetAccessor:
                                case SyntaxKind.MethodDeclaration:
                                case SyntaxKind.SetAccessor:
                                    return true;
                                default:
                                    return false;
                            }
                        default:
                            return false;
                    }
                });

                return ancestorChangingReferenceScope === undefined;
            }
        }

        function useOuterVariableScopeInParameter(result: Symbol, location: Node, lastLocation: Node) {
            const target = getEmitScriptTarget(compilerOptions);
            const functionLocation = <FunctionLikeDeclaration>location;
            if (isParameter(lastLocation) && functionLocation.body && result.valueDeclaration.pos >= functionLocation.body.pos && result.valueDeclaration.end <= functionLocation.body.end) {
                // check for several cases where we introduce temporaries that require moving the name/initializer of the parameter to the body
                // - static field in a class expression
                // - optional chaining pre-es2020
                // - nullish coalesce pre-es2020
                // - spread assignment in binding pattern pre-es2017
                if (target >= ScriptTarget.ES2015) {
                    const links = getNodeLinks(functionLocation);
                    if (links.declarationRequiresScopeChange === undefined) {
                        links.declarationRequiresScopeChange = forEach(functionLocation.parameters, requiresScopeChange) || false;
                    }
                    return !links.declarationRequiresScopeChange;
                }
            }
            return false;

            function requiresScopeChange(node: ParameterDeclaration): boolean {
                return requiresScopeChangeWorker(node.name)
                    || !!node.initializer && requiresScopeChangeWorker(node.initializer);
            }

            function requiresScopeChangeWorker(node: Node): boolean {
                switch (node.kind) {
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Constructor:
                        // do not descend into these
                        return false;
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.PropertyAssignment:
                        return requiresScopeChangeWorker((node as MethodDeclaration | AccessorDeclaration | PropertyAssignment).name);
                    case SyntaxKind.PropertyDeclaration:
                        // static properties in classes introduce temporary variables
                        if (hasStaticModifier(node)) {
                            return target < ScriptTarget.ESNext || !compilerOptions.useDefineForClassFields;
                        }
                        return requiresScopeChangeWorker((node as PropertyDeclaration).name);
                    default:
                        // null coalesce and optional chain pre-es2020 produce temporary variables
                        if (isNullishCoalesce(node) || isOptionalChain(node)) {
                            return target < ScriptTarget.ES2020;
                        }
                        if (isBindingElement(node) && node.dotDotDotToken && isObjectBindingPattern(node.parent)) {
                            return target < ScriptTarget.ES2017;
                        }
                        if (isTypeNode(node)) return false;
                        return forEachChild(node, requiresScopeChangeWorker) || false;
                }
            }
        }

        /**
         * Resolve a given name for a given meaning at a given location. An error is reported if the name was not found and
         * the nameNotFoundMessage argument is not undefined. Returns the resolved symbol, or undefined if no symbol with
         * the given name can be found.
         *
         * @param isUse If true, this will count towards --noUnusedLocals / --noUnusedParameters.
         */
        function resolveName(
            location: Node | undefined,
            name: __String,
            meaning: SymbolFlags,
            nameNotFoundMessage: DiagnosticMessage | undefined,
            nameArg: __String | Identifier | undefined,
            isUse: boolean,
            excludeGlobals = false,
            suggestedNameNotFoundMessage?: DiagnosticMessage): Symbol | undefined {
            return resolveNameHelper(location, name, meaning, nameNotFoundMessage, nameArg, isUse, excludeGlobals, getSymbol, suggestedNameNotFoundMessage);
        }

        function resolveNameHelper(
            location: Node | undefined,
            name: __String,
            meaning: SymbolFlags,
            nameNotFoundMessage: DiagnosticMessage | undefined,
            nameArg: __String | Identifier | undefined,
            isUse: boolean,
            excludeGlobals: boolean,
            lookup: typeof getSymbol,
            suggestedNameNotFoundMessage?: DiagnosticMessage): Symbol | undefined {
            const originalLocation = location; // needed for did-you-mean error reporting, which gathers candidates starting from the original location
            let result: Symbol | undefined;
            let lastLocation: Node | undefined;
            let lastSelfReferenceLocation: Node | undefined;
            let propertyWithInvalidInitializer: Node | undefined;
            let associatedDeclarationForContainingInitializerOrBindingName: ParameterDeclaration | BindingElement | undefined;
            let withinDeferredContext = false;
            const errorLocation = location;
            let grandparent: Node;
            let isInExternalModule = false;

            loop: while (location) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = lookup(location.locals, name, meaning)) {
                        let useResult = true;
                        if (isFunctionLike(location) && lastLocation && lastLocation !== (<FunctionLikeDeclaration>location).body) {
                            // symbol lookup restrictions for function-like declarations
                            // - Type parameters of a function are in scope in the entire function declaration, including the parameter
                            //   list and return type. However, local types are only in scope in the function body.
                            // - parameters are only in the scope of function body
                            // This restriction does not apply to JSDoc comment types because they are parented
                            // at a higher level than type parameters would normally be
                            if (meaning & result.flags & SymbolFlags.Type && lastLocation.kind !== SyntaxKind.JSDocComment) {
                                useResult = result.flags & SymbolFlags.TypeParameter
                                    // type parameters are visible in parameter list, return type and type parameter list
                                    ? lastLocation === (<FunctionLikeDeclaration>location).type ||
                                    lastLocation.kind === SyntaxKind.Parameter ||
                                    lastLocation.kind === SyntaxKind.TypeParameter
                                    // local types not visible outside the function body
                                    : false;
                            }
                            if (meaning & result.flags & SymbolFlags.Variable) {
                                // expression inside parameter will lookup as normal variable scope when targeting es2015+
                                if (useOuterVariableScopeInParameter(result, location, lastLocation)) {
                                    useResult = false;
                                }
                                else if (result.flags & SymbolFlags.FunctionScopedVariable) {
                                    // parameters are visible only inside function body, parameter list and return type
                                    // technically for parameter list case here we might mix parameters and variables declared in function,
                                    // however it is detected separately when checking initializers of parameters
                                    // to make sure that they reference no variables declared after them.
                                    useResult =
                                        lastLocation.kind === SyntaxKind.Parameter ||
                                        (
                                            lastLocation === (<FunctionLikeDeclaration>location).type &&
                                            !!findAncestor(result.valueDeclaration, isParameter)
                                        );
                                }
                            }
                        }
                        else if (location.kind === SyntaxKind.ConditionalType) {
                            // A type parameter declared using 'infer T' in a conditional type is visible only in
                            // the true branch of the conditional type.
                            useResult = lastLocation === (<ConditionalTypeNode>location).trueType;
                        }

                        if (useResult) {
                            break loop;
                        }
                        else {
                            result = undefined;
                        }
                    }
                }
                withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation);
                switch (location.kind) {
                    case SyntaxKind.SourceFile:
                        if (!isExternalOrCommonJsModule(<SourceFile>location)) break;
                        isInExternalModule = true;
                        // falls through
                    case SyntaxKind.ModuleDeclaration:
                        const moduleExports = getSymbolOfNode(location as SourceFile | ModuleDeclaration).exports || emptySymbols;
                        if (location.kind === SyntaxKind.SourceFile || (isModuleDeclaration(location) && location.flags & NodeFlags.Ambient && !isGlobalScopeAugmentation(location))) {

                            // It's an external module. First see if the module has an export default and if the local
                            // name of that export default matches.
                            if (result = moduleExports.get(InternalSymbolName.Default)) {
                                const localSymbol = getLocalSymbolForExportDefault(result);
                                if (localSymbol && (result.flags & meaning) && localSymbol.escapedName === name) {
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
                            const moduleExport = moduleExports.get(name);
                            if (moduleExport &&
                                moduleExport.flags === SymbolFlags.Alias &&
                                (getDeclarationOfKind(moduleExport, SyntaxKind.ExportSpecifier) || getDeclarationOfKind(moduleExport, SyntaxKind.NamespaceExport))) {
                                break;
                            }
                        }

                        // ES6 exports are also visible locally (except for 'default'), but commonjs exports are not (except typedefs)
                        if (name !== InternalSymbolName.Default && (result = lookup(moduleExports, name, meaning & SymbolFlags.ModuleMember))) {
                            if (isSourceFile(location) && location.commonJsModuleIndicator && !result.declarations.some(isJSDocTypeAlias)) {
                                result = undefined;
                            }
                            else {
                                break loop;
                            }
                        }
                        break;
                    case SyntaxKind.EnumDeclaration:
                        if (result = lookup(getSymbolOfNode(location)!.exports!, name, meaning & SymbolFlags.EnumMember)) {
                            break loop;
                        }
                        break;
                    case SyntaxKind.PropertyDeclaration:
                        // TypeScript 1.0 spec (April 2014): 8.4.1
                        // Initializer expressions for instance member variables are evaluated in the scope
                        // of the class constructor body but are not permitted to reference parameters or
                        // local variables of the constructor. This effectively means that entities from outer scopes
                        // by the same name as a constructor parameter or local variable are inaccessible
                        // in initializer expressions for instance member variables.
                        if (!hasSyntacticModifier(location, ModifierFlags.Static)) {
                            const ctor = findConstructorDeclaration(location.parent as ClassLikeDeclaration);
                            if (ctor && ctor.locals) {
                                if (lookup(ctor.locals, name, meaning & SymbolFlags.Value)) {
                                    // Remember the property node, it will be used later to report appropriate error
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.InterfaceDeclaration:
                        // The below is used to lookup type parameters within a class or interface, as they are added to the class/interface locals
                        // These can never be latebound, so the symbol's raw members are sufficient. `getMembersOfNode` cannot be used, as it would
                        // trigger resolving late-bound names, which we may already be in the process of doing while we're here!
                        if (result = lookup(getSymbolOfNode(location as ClassLikeDeclaration | InterfaceDeclaration).members || emptySymbols, name, meaning & SymbolFlags.Type)) {
                            if (!isTypeParameterSymbolDeclaredInContainer(result, location)) {
                                // ignore type parameters not declared in this container
                                result = undefined;
                                break;
                            }
                            if (lastLocation && hasSyntacticModifier(lastLocation, ModifierFlags.Static)) {
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
                            if (className && name === className.escapedText) {
                                result = location.symbol;
                                break loop;
                            }
                        }
                        break;
                    case SyntaxKind.ExpressionWithTypeArguments:
                        // The type parameters of a class are not in scope in the base class expression.
                        if (lastLocation === (<ExpressionWithTypeArguments>location).expression && (<HeritageClause>location.parent).token === SyntaxKind.ExtendsKeyword) {
                            const container = location.parent.parent;
                            if (isClassLike(container) && (result = lookup(getSymbolOfNode(container).members!, name, meaning & SymbolFlags.Type))) {
                                if (nameNotFoundMessage) {
                                    error(errorLocation, Diagnostics.Base_class_expressions_cannot_reference_class_type_parameters);
                                }
                                return undefined;
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
                            if (result = lookup(getSymbolOfNode(grandparent as ClassLikeDeclaration | InterfaceDeclaration).members!, name, meaning & SymbolFlags.Type)) {
                                error(errorLocation, Diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type);
                                return undefined;
                            }
                        }
                        break;
                    case SyntaxKind.ArrowFunction:
                        // when targeting ES6 or higher there is no 'arguments' in an arrow function
                        // for lower compile targets the resolved symbol is used to emit an error
                        if (compilerOptions.target! >= ScriptTarget.ES2015) {
                            break;
                        }
                        // falls through
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionDeclaration:
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
                            if (functionName && name === functionName.escapedText) {
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

                        // class Decorators are resolved outside of the class to avoid referencing type parameters of that class.
                        //
                        //   type T = number;
                        //   declare function y(x: T): any;
                        //   @param(1 as T) // <-- T should resolve to the type alias outside of class C
                        //   class C<T> {}
                        if (location.parent && (isClassElement(location.parent) || location.parent.kind === SyntaxKind.ClassDeclaration)) {
                            location = location.parent;
                        }
                        break;
                    case SyntaxKind.JSDocTypedefTag:
                    case SyntaxKind.JSDocCallbackTag:
                    case SyntaxKind.JSDocEnumTag:
                        // js type aliases do not resolve names from their host, so skip past it
                        location = getJSDocHost(location);
                        break;
                    case SyntaxKind.Parameter:
                        if (lastLocation && (
                            lastLocation === (location as ParameterDeclaration).initializer ||
                            lastLocation === (location as ParameterDeclaration).name && isBindingPattern(lastLocation))) {
                            if (!associatedDeclarationForContainingInitializerOrBindingName) {
                                associatedDeclarationForContainingInitializerOrBindingName = location as ParameterDeclaration;
                            }
                        }
                        break;
                    case SyntaxKind.BindingElement:
                        if (lastLocation && (
                            lastLocation === (location as BindingElement).initializer ||
                            lastLocation === (location as BindingElement).name && isBindingPattern(lastLocation))) {
                            if (isParameterDeclaration(location as BindingElement) && !associatedDeclarationForContainingInitializerOrBindingName) {
                                associatedDeclarationForContainingInitializerOrBindingName = location as BindingElement;
                            }
                        }
                        break;
                }
                if (isSelfReferenceLocation(location)) {
                    lastSelfReferenceLocation = location;
                }
                lastLocation = location;
                location = location.parent;
            }

            // We just climbed up parents looking for the name, meaning that we started in a descendant node of `lastLocation`.
            // If `result === lastSelfReferenceLocation.symbol`, that means that we are somewhere inside `lastSelfReferenceLocation` looking up a name, and resolving to `lastLocation` itself.
            // That means that this is a self-reference of `lastLocation`, and shouldn't count this when considering whether `lastLocation` is used.
            if (isUse && result && (!lastSelfReferenceLocation || result !== lastSelfReferenceLocation.symbol)) {
                result.isReferenced! |= meaning;
            }

            if (!result) {
                if (lastLocation) {
                    Debug.assert(lastLocation.kind === SyntaxKind.SourceFile);
                    if ((lastLocation as SourceFile).commonJsModuleIndicator && name === "exports" && meaning & lastLocation.symbol.flags) {
                        return lastLocation.symbol;
                    }
                }

                if (!excludeGlobals) {
                    result = lookup(globals, name, meaning);
                }
            }
            if (!result) {
                if (originalLocation && isInJSFile(originalLocation) && originalLocation.parent) {
                    if (isRequireCall(originalLocation.parent, /*checkArgumentIsStringLiteralLike*/ false)) {
                        return requireSymbol;
                    }
                }
            }
            if (!result) {
                if (nameNotFoundMessage) {
                    if (!errorLocation ||
                        !checkAndReportErrorForMissingPrefix(errorLocation, name, nameArg!) && // TODO: GH#18217
                        !checkAndReportErrorForExtendingInterface(errorLocation) &&
                        !checkAndReportErrorForUsingTypeAsNamespace(errorLocation, name, meaning) &&
                        !checkAndReportErrorForExportingPrimitiveType(errorLocation, name) &&
                        !checkAndReportErrorForUsingTypeAsValue(errorLocation, name, meaning) &&
                        !checkAndReportErrorForUsingNamespaceModuleAsValue(errorLocation, name, meaning) &&
                        !checkAndReportErrorForUsingValueAsType(errorLocation, name, meaning)) {
                        let suggestion: Symbol | undefined;
                        if (suggestedNameNotFoundMessage && suggestionCount < maximumSuggestionCount) {
                            suggestion = getSuggestedSymbolForNonexistentSymbol(originalLocation, name, meaning);
                            if (suggestion) {
                                const suggestionName = symbolToString(suggestion);
                                const diagnostic = error(errorLocation, suggestedNameNotFoundMessage, diagnosticName(nameArg!), suggestionName);
                                if (suggestion.valueDeclaration) {
                                    addRelatedInfo(
                                        diagnostic,
                                        createDiagnosticForNode(suggestion.valueDeclaration, Diagnostics._0_is_declared_here, suggestionName)
                                    );
                                }
                            }
                        }
                        if (!suggestion) {
                            error(errorLocation, nameNotFoundMessage, diagnosticName(nameArg!));
                        }
                        suggestionCount++;
                    }
                }
                return undefined;
            }

            // Perform extra checks only if error reporting was requested
            if (nameNotFoundMessage) {
                if (propertyWithInvalidInitializer && !(compilerOptions.target === ScriptTarget.ESNext && compilerOptions.useDefineForClassFields)) {
                    // We have a match, but the reference occurred within a property initializer and the identifier also binds
                    // to a local variable in the constructor where the code will be emitted. Note that this is actually allowed
                    // with ESNext+useDefineForClassFields because the scope semantics are different.
                    const propertyName = (<PropertyDeclaration>propertyWithInvalidInitializer).name;
                    error(errorLocation, Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor,
                        declarationNameToString(propertyName), diagnosticName(nameArg!));
                    return undefined;
                }

                // Only check for block-scoped variable if we have an error location and are looking for the
                // name with variable meaning
                //      For example,
                //          declare module foo {
                //              interface bar {}
                //          }
                //      const foo/*1*/: foo/*2*/.bar;
                // The foo at /*1*/ and /*2*/ will share same symbol with two meanings:
                // block-scoped variable and namespace module. However, only when we
                // try to resolve name in /*1*/ which is used in variable position,
                // we want to check for block-scoped
                if (errorLocation &&
                    (meaning & SymbolFlags.BlockScopedVariable ||
                     ((meaning & SymbolFlags.Class || meaning & SymbolFlags.Enum) && (meaning & SymbolFlags.Value) === SymbolFlags.Value))) {
                    const exportOrLocalSymbol = getExportSymbolOfValueSymbolIfExported(result);
                    if (exportOrLocalSymbol.flags & SymbolFlags.BlockScopedVariable || exportOrLocalSymbol.flags & SymbolFlags.Class || exportOrLocalSymbol.flags & SymbolFlags.Enum) {
                        checkResolvedBlockScopedVariable(exportOrLocalSymbol, errorLocation);
                    }
                }

                // If we're in an external module, we can't reference value symbols created from UMD export declarations
                if (result && isInExternalModule && (meaning & SymbolFlags.Value) === SymbolFlags.Value && !(originalLocation!.flags & NodeFlags.JSDoc)) {
                    const merged = getMergedSymbol(result);
                    if (length(merged.declarations) && every(merged.declarations, d => isNamespaceExportDeclaration(d) || isSourceFile(d) && !!d.symbol.globalExports)) {
                        errorOrSuggestion(!compilerOptions.allowUmdGlobalAccess, errorLocation!, Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead, unescapeLeadingUnderscores(name));
                    }
                }

                // If we're in a parameter initializer or binding name, we can't reference the values of the parameter whose initializer we're within or parameters to the right
                if (result && associatedDeclarationForContainingInitializerOrBindingName && !withinDeferredContext && (meaning & SymbolFlags.Value) === SymbolFlags.Value) {
                    const candidate = getMergedSymbol(getLateBoundSymbol(result));
                    const root = (getRootDeclaration(associatedDeclarationForContainingInitializerOrBindingName) as ParameterDeclaration);
                    // A parameter initializer or binding pattern initializer within a parameter cannot refer to itself
                    if (candidate === getSymbolOfNode(associatedDeclarationForContainingInitializerOrBindingName)) {
                        error(errorLocation, Diagnostics.Parameter_0_cannot_reference_itself, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.name));
                    }
                    // And it cannot refer to any declarations which come after it
                    else if (candidate.valueDeclaration && candidate.valueDeclaration.pos > associatedDeclarationForContainingInitializerOrBindingName.pos && root.parent.locals && lookup(root.parent.locals, candidate.escapedName, meaning) === candidate) {
                        error(errorLocation, Diagnostics.Parameter_0_cannot_reference_identifier_1_declared_after_it, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.name), declarationNameToString(<Identifier>errorLocation));
                    }
                }
                if (result && errorLocation && meaning & SymbolFlags.Value && result.flags & SymbolFlags.Alias) {
                    checkSymbolUsageInExpressionContext(result, name, errorLocation);
                }
            }
            return result;
        }

        function checkSymbolUsageInExpressionContext(symbol: Symbol, name: __String, useSite: Node) {
            if (!isValidTypeOnlyAliasUseSite(useSite)) {
                const typeOnlyDeclaration = getTypeOnlyAliasDeclaration(symbol);
                if (typeOnlyDeclaration) {
                    const isExport = typeOnlyDeclarationIsExport(typeOnlyDeclaration);
                    const message = isExport
                        ? Diagnostics._0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type
                        : Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type;
                    const relatedMessage = isExport
                        ? Diagnostics._0_was_exported_here
                        : Diagnostics._0_was_imported_here;
                    const unescapedName = unescapeLeadingUnderscores(name);
                    addRelatedInfo(
                        error(useSite, message, unescapedName),
                        createDiagnosticForNode(typeOnlyDeclaration, relatedMessage, unescapedName));
                }
            }
        }

        function getIsDeferredContext(location: Node, lastLocation: Node | undefined): boolean {
            if (location.kind !== SyntaxKind.ArrowFunction && location.kind !== SyntaxKind.FunctionExpression) {
                // initializers in instance property declaration of class like entities are executed in constructor and thus deferred
                return isTypeQueryNode(location) || ((
                    isFunctionLikeDeclaration(location) ||
                    (location.kind === SyntaxKind.PropertyDeclaration && !hasSyntacticModifier(location, ModifierFlags.Static))
                ) && (!lastLocation || lastLocation !== (location as FunctionLike | PropertyDeclaration).name)); // A name is evaluated within the enclosing scope - so it shouldn't count as deferred
            }
            if (lastLocation && lastLocation === (location as FunctionExpression | ArrowFunction).name) {
                return false;
            }
            // generator functions and async functions are not inlined in control flow when immediately invoked
            if ((location as FunctionExpression | ArrowFunction).asteriskToken || hasSyntacticModifier(location, ModifierFlags.Async)) {
                return true;
            }
            return !getImmediatelyInvokedFunctionExpression(location);
        }

        function isSelfReferenceLocation(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ModuleDeclaration: // For `namespace N { N; }`
                    return true;
                default:
                    return false;
            }
        }

        function diagnosticName(nameArg: __String | Identifier | PrivateIdentifier) {
            return isString(nameArg) ? unescapeLeadingUnderscores(nameArg as __String) : declarationNameToString(nameArg as Identifier);
        }

        function isTypeParameterSymbolDeclaredInContainer(symbol: Symbol, container: Node) {
            for (const decl of symbol.declarations) {
                if (decl.kind === SyntaxKind.TypeParameter) {
                    const parent = isJSDocTemplateTag(decl.parent) ? getJSDocHost(decl.parent) : decl.parent;
                    if (parent === container) {
                        return !(isJSDocTemplateTag(decl.parent) && find((decl.parent.parent as JSDoc).tags!, isJSDocTypeAlias)); // TODO: GH#18217
                    }
                }
            }

            return false;
        }

        function checkAndReportErrorForMissingPrefix(errorLocation: Node, name: __String, nameArg: __String | Identifier): boolean {
            if (!isIdentifier(errorLocation) || errorLocation.escapedText !== name || isTypeReferenceIdentifier(errorLocation) || isInTypeQuery(errorLocation)) {
                return false;
            }

            const container = getThisContainer(errorLocation, /*includeArrowFunctions*/ false);
            let location = container;
            while (location) {
                if (isClassLike(location.parent)) {
                    const classSymbol = getSymbolOfNode(location.parent);
                    if (!classSymbol) {
                        break;
                    }

                    // Check to see if a static member exists.
                    const constructorType = getTypeOfSymbol(classSymbol);
                    if (getPropertyOfType(constructorType, name)) {
                        error(errorLocation, Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0, diagnosticName(nameArg), symbolToString(classSymbol));
                        return true;
                    }

                    // No static member is present.
                    // Check if we're in an instance method and look for a relevant instance member.
                    if (location === container && !hasSyntacticModifier(location, ModifierFlags.Static)) {
                        const instanceType = (<InterfaceType>getDeclaredTypeOfSymbol(classSymbol)).thisType!; // TODO: GH#18217
                        if (getPropertyOfType(instanceType, name)) {
                            error(errorLocation, Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0, diagnosticName(nameArg));
                            return true;
                        }
                    }
                }

                location = location.parent;
            }
            return false;
        }


        function checkAndReportErrorForExtendingInterface(errorLocation: Node): boolean {
            const expression = getEntityNameForExtendingInterface(errorLocation);
            if (expression && resolveEntityName(expression, SymbolFlags.Interface, /*ignoreErrors*/ true)) {
                error(errorLocation, Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements, getTextOfNode(expression));
                return true;
            }
            return false;
        }
        /**
         * Climbs up parents to an ExpressionWithTypeArguments, and returns its expression,
         * but returns undefined if that expression is not an EntityNameExpression.
         */
        function getEntityNameForExtendingInterface(node: Node): EntityNameExpression | undefined {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                case SyntaxKind.PropertyAccessExpression:
                    return node.parent ? getEntityNameForExtendingInterface(node.parent) : undefined;
                case SyntaxKind.ExpressionWithTypeArguments:
                    if (isEntityNameExpression((<ExpressionWithTypeArguments>node).expression)) {
                        return <EntityNameExpression>(<ExpressionWithTypeArguments>node).expression;
                    }
                    // falls through
                default:
                    return undefined;
            }
        }

        function checkAndReportErrorForUsingTypeAsNamespace(errorLocation: Node, name: __String, meaning: SymbolFlags): boolean {
            const namespaceMeaning = SymbolFlags.Namespace | (isInJSFile(errorLocation) ? SymbolFlags.Value : 0);
            if (meaning === namespaceMeaning) {
                const symbol = resolveSymbol(resolveName(errorLocation, name, SymbolFlags.Type & ~namespaceMeaning, /*nameNotFoundMessage*/undefined, /*nameArg*/ undefined, /*isUse*/ false));
                const parent = errorLocation.parent;
                if (symbol) {
                    if (isQualifiedName(parent)) {
                        Debug.assert(parent.left === errorLocation, "Should only be resolving left side of qualified name as a namespace");
                        const propName = parent.right.escapedText;
                        const propType = getPropertyOfType(getDeclaredTypeOfSymbol(symbol), propName);
                        if (propType) {
                            error(
                                parent,
                                Diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1,
                                unescapeLeadingUnderscores(name),
                                unescapeLeadingUnderscores(propName),
                            );
                            return true;
                        }
                    }
                    error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_namespace_here, unescapeLeadingUnderscores(name));
                    return true;
                }
            }

            return false;
        }

        function checkAndReportErrorForUsingValueAsType(errorLocation: Node, name: __String, meaning: SymbolFlags): boolean {
            if (meaning & (SymbolFlags.Type & ~SymbolFlags.Namespace)) {
                const symbol = resolveSymbol(resolveName(errorLocation, name, ~SymbolFlags.Type & SymbolFlags.Value, /*nameNotFoundMessage*/undefined, /*nameArg*/ undefined, /*isUse*/ false));
                if (symbol && !(symbol.flags & SymbolFlags.Namespace)) {
                    error(errorLocation, Diagnostics._0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0, unescapeLeadingUnderscores(name));
                    return true;
                }
            }
            return false;
        }

        function isPrimitiveTypeName(name: __String) {
            return name === "any" || name === "string" || name === "number" || name === "boolean" || name === "never" || name === "unknown";
        }

        function checkAndReportErrorForExportingPrimitiveType(errorLocation: Node, name: __String): boolean {
            if (isPrimitiveTypeName(name) && errorLocation.parent.kind === SyntaxKind.ExportSpecifier) {
                error(errorLocation, Diagnostics.Cannot_export_0_Only_local_declarations_can_be_exported_from_a_module, name as string);
                return true;
            }
            return false;
        }

        function checkAndReportErrorForUsingTypeAsValue(errorLocation: Node, name: __String, meaning: SymbolFlags): boolean {
            if (meaning & (SymbolFlags.Value & ~SymbolFlags.NamespaceModule)) {
                if (isPrimitiveTypeName(name)) {
                    error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here, unescapeLeadingUnderscores(name));
                    return true;
                }
                const symbol = resolveSymbol(resolveName(errorLocation, name, SymbolFlags.Type & ~SymbolFlags.Value, /*nameNotFoundMessage*/undefined, /*nameArg*/ undefined, /*isUse*/ false));
                if (symbol && !(symbol.flags & SymbolFlags.NamespaceModule)) {
                    const rawName = unescapeLeadingUnderscores(name);
                    if (isES2015OrLaterConstructorName(name)) {
                        error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_es2015_or_later, rawName);
                    }
                    else if (maybeMappedType(errorLocation, symbol)) {
                        error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0, rawName, rawName === "K" ? "P" : "K");
                    }
                    else {
                        error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here, rawName);
                    }
                    return true;
                }
            }
            return false;
        }

        function maybeMappedType(node: Node, symbol: Symbol) {
            const container = findAncestor(node.parent, n =>
                isComputedPropertyName(n) || isPropertySignature(n) ? false : isTypeLiteralNode(n) || "quit") as TypeLiteralNode | undefined;
            if (container && container.members.length === 1) {
                const type = getDeclaredTypeOfSymbol(symbol);
                return !!(type.flags & TypeFlags.Union) && allTypesAssignableToKind(type, TypeFlags.StringOrNumberLiteral, /*strict*/ true);
            }
            return false;
        }

        function isES2015OrLaterConstructorName(n: __String) {
            switch (n) {
                case "Promise":
                case "Symbol":
                case "Map":
                case "WeakMap":
                case "Set":
                case "WeakSet":
                    return true;
            }
            return false;
        }

        function checkAndReportErrorForUsingNamespaceModuleAsValue(errorLocation: Node, name: __String, meaning: SymbolFlags): boolean {
            if (meaning & (SymbolFlags.Value & ~SymbolFlags.NamespaceModule & ~SymbolFlags.Type)) {
                const symbol = resolveSymbol(resolveName(errorLocation, name, SymbolFlags.NamespaceModule & ~SymbolFlags.Value, /*nameNotFoundMessage*/undefined, /*nameArg*/ undefined, /*isUse*/ false));
                if (symbol) {
                    error(
                        errorLocation,
                        Diagnostics.Cannot_use_namespace_0_as_a_value,
                        unescapeLeadingUnderscores(name));
                    return true;
                }
            }
            else if (meaning & (SymbolFlags.Type & ~SymbolFlags.NamespaceModule & ~SymbolFlags.Value)) {
                const symbol = resolveSymbol(resolveName(errorLocation, name, (SymbolFlags.ValueModule | SymbolFlags.NamespaceModule) & ~SymbolFlags.Type, /*nameNotFoundMessage*/undefined, /*nameArg*/ undefined, /*isUse*/ false));
                if (symbol) {
                    error(errorLocation, Diagnostics.Cannot_use_namespace_0_as_a_type, unescapeLeadingUnderscores(name));
                    return true;
                }
            }
            return false;
        }

        function checkResolvedBlockScopedVariable(result: Symbol, errorLocation: Node): void {
            Debug.assert(!!(result.flags & SymbolFlags.BlockScopedVariable || result.flags & SymbolFlags.Class || result.flags & SymbolFlags.Enum));
            if (result.flags & (SymbolFlags.Function | SymbolFlags.FunctionScopedVariable | SymbolFlags.Assignment) && result.flags & SymbolFlags.Class) {
                // constructor functions aren't block scoped
                return;
            }
            // Block-scoped variables cannot be used before their definition
            const declaration = find(
                result.declarations,
                d => isBlockOrCatchScoped(d) || isClassLike(d) || (d.kind === SyntaxKind.EnumDeclaration));

            if (declaration === undefined) return Debug.fail("checkResolvedBlockScopedVariable could not find block-scoped declaration");

            if (!(declaration.flags & NodeFlags.Ambient) && !isBlockScopedNameDeclaredBeforeUse(declaration, errorLocation)) {
                let diagnosticMessage;
                const declarationName = declarationNameToString(getNameOfDeclaration(declaration));
                if (result.flags & SymbolFlags.BlockScopedVariable) {
                    diagnosticMessage = error(errorLocation, Diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationName);
                }
                else if (result.flags & SymbolFlags.Class) {
                    diagnosticMessage = error(errorLocation, Diagnostics.Class_0_used_before_its_declaration, declarationName);
                }
                else if (result.flags & SymbolFlags.RegularEnum) {
                    diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
                }
                else {
                    Debug.assert(!!(result.flags & SymbolFlags.ConstEnum));
                    if (compilerOptions.preserveConstEnums) {
                        diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
                    }
                }

                if (diagnosticMessage) {
                    addRelatedInfo(diagnosticMessage,
                        createDiagnosticForNode(declaration, Diagnostics._0_is_declared_here, declarationName)
                    );
                }
            }
        }

        /* Starting from 'initial' node walk up the parent chain until 'stopAt' node is reached.
         * If at any point current node is equal to 'parent' node - return true.
         * Return false if 'stopAt' node is reached or isFunctionLike(current) === true.
         */
        function isSameScopeDescendentOf(initial: Node, parent: Node | undefined, stopAt: Node): boolean {
            return !!parent && !!findAncestor(initial, n => n === stopAt || isFunctionLike(n) ? "quit" : n === parent);
        }

        function getAnyImportSyntax(node: Node): AnyImportSyntax | undefined {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                    return node as ImportEqualsDeclaration;
                case SyntaxKind.ImportClause:
                    return (node as ImportClause).parent;
                case SyntaxKind.NamespaceImport:
                    return (node as NamespaceImport).parent.parent;
                case SyntaxKind.ImportSpecifier:
                    return (node as ImportSpecifier).parent.parent.parent;
                default:
                    return undefined;
            }
        }

        function getDeclarationOfAliasSymbol(symbol: Symbol): Declaration | undefined {
            return find<Declaration>(symbol.declarations, isAliasSymbolDeclaration);
        }

        /**
         * An alias symbol is created by one of the following declarations:
         * import <symbol> = ...
         * import <symbol> from ...
         * import * as <symbol> from ...
         * import { x as <symbol> } from ...
         * export { x as <symbol> } from ...
         * export * as ns <symbol> from ...
         * export = <EntityNameExpression>
         * export default <EntityNameExpression>
         * module.exports = <EntityNameExpression>
         * {<Identifier>}
         * {name: <EntityNameExpression>}
         */
        function isAliasSymbolDeclaration(node: Node): boolean {
            return node.kind === SyntaxKind.ImportEqualsDeclaration
                || node.kind === SyntaxKind.NamespaceExportDeclaration
                || node.kind === SyntaxKind.ImportClause && !!(<ImportClause>node).name
                || node.kind === SyntaxKind.NamespaceImport
                || node.kind === SyntaxKind.NamespaceExport
                || node.kind === SyntaxKind.ImportSpecifier
                || node.kind === SyntaxKind.ExportSpecifier
                || node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(<ExportAssignment>node)
                || isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.ModuleExports && exportAssignmentIsAlias(node)
                || isPropertyAccessExpression(node)
                    && isBinaryExpression(node.parent)
                    && node.parent.left === node
                    && node.parent.operatorToken.kind === SyntaxKind.EqualsToken
                    && isAliasableOrJsExpression(node.parent.right)
                || node.kind === SyntaxKind.ShorthandPropertyAssignment
                || node.kind === SyntaxKind.PropertyAssignment && isAliasableOrJsExpression((node as PropertyAssignment).initializer)
                || isRequireVariableDeclaration(node, /*requireStringLiteralLikeArgument*/ true);
        }

        function isAliasableOrJsExpression(e: Expression) {
            return isAliasableExpression(e) || isFunctionExpression(e) && isJSConstructor(e);
        }

        function getTargetOfImportEqualsDeclaration(node: ImportEqualsDeclaration | VariableDeclaration, dontResolveAlias: boolean): Symbol | undefined {
            if (isVariableDeclaration(node) && node.initializer && isPropertyAccessExpression(node.initializer)) {
                const name = (getLeftmostAccessExpression(node.initializer.expression) as CallExpression).arguments[0] as StringLiteral;
                return isIdentifier(node.initializer.name)
                    ? resolveSymbol(getPropertyOfType(resolveExternalModuleTypeByLiteral(name), node.initializer.name.escapedText))
                    : undefined;
            }
            if (isVariableDeclaration(node) || node.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                const immediate = resolveExternalModuleName(
                    node,
                    getExternalModuleRequireArgument(node) || getExternalModuleImportEqualsDeclarationExpression(node));
               const resolved = resolveExternalModuleSymbol(immediate);
                markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, /*overwriteEmpty*/ false);
                return resolved;
            }
            const resolved = getSymbolOfPartOfRightHandSideOfImportEquals(node.moduleReference, dontResolveAlias);
            checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node, resolved);
            return resolved;
        }

        function checkAndReportErrorForResolvingImportAliasToTypeOnlySymbol(node: ImportEqualsDeclaration, resolved: Symbol | undefined) {
            if (markSymbolOfAliasDeclarationIfTypeOnly(node, /*immediateTarget*/ undefined, resolved, /*overwriteEmpty*/ false)) {
                const typeOnlyDeclaration = getTypeOnlyAliasDeclaration(getSymbolOfNode(node))!;
                const isExport = typeOnlyDeclarationIsExport(typeOnlyDeclaration);
                const message = isExport
                    ? Diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_exported_using_export_type
                    : Diagnostics.An_import_alias_cannot_reference_a_declaration_that_was_imported_using_import_type;
                const relatedMessage = isExport
                    ? Diagnostics._0_was_exported_here
                    : Diagnostics._0_was_imported_here;

                // Non-null assertion is safe because the optionality comes from ImportClause,
                // but if an ImportClause was the typeOnlyDeclaration, it had to have a `name`.
                const name = unescapeLeadingUnderscores(typeOnlyDeclaration.name!.escapedText);
                addRelatedInfo(error(node.moduleReference, message), createDiagnosticForNode(typeOnlyDeclaration, relatedMessage, name));
            }
        }

        function resolveExportByName(moduleSymbol: Symbol, name: __String, sourceNode: TypeOnlyCompatibleAliasDeclaration | undefined, dontResolveAlias: boolean) {
            const exportValue = moduleSymbol.exports!.get(InternalSymbolName.ExportEquals);
            if (exportValue) {
                return getPropertyOfType(getTypeOfSymbol(exportValue), name);
            }
            const exportSymbol = moduleSymbol.exports!.get(name);
            const resolved = resolveSymbol(exportSymbol, dontResolveAlias);
            markSymbolOfAliasDeclarationIfTypeOnly(sourceNode, exportSymbol, resolved, /*overwriteEmpty*/ false);
            return resolved;
        }

        function isSyntacticDefault(node: Node) {
            return ((isExportAssignment(node) && !node.isExportEquals) || hasSyntacticModifier(node, ModifierFlags.Default) || isExportSpecifier(node));
        }

        function canHaveSyntheticDefault(file: SourceFile | undefined, moduleSymbol: Symbol, dontResolveAlias: boolean) {
            if (!allowSyntheticDefaultImports) {
                return false;
            }
            // Declaration files (and ambient modules)
            if (!file || file.isDeclarationFile) {
                // Definitely cannot have a synthetic default if they have a syntactic default member specified
                const defaultExportSymbol = resolveExportByName(moduleSymbol, InternalSymbolName.Default, /*sourceNode*/ undefined, /*dontResolveAlias*/ true); // Dont resolve alias because we want the immediately exported symbol's declaration
                if (defaultExportSymbol && some(defaultExportSymbol.declarations, isSyntacticDefault)) {
                    return false;
                }
                // It _might_ still be incorrect to assume there is no __esModule marker on the import at runtime, even if there is no `default` member
                // So we check a bit more,
                if (resolveExportByName(moduleSymbol, escapeLeadingUnderscores("__esModule"), /*sourceNode*/ undefined, dontResolveAlias)) {
                    // If there is an `__esModule` specified in the declaration (meaning someone explicitly added it or wrote it in their code),
                    // it definitely is a module and does not have a synthetic default
                    return false;
                }
                // There are _many_ declaration files not written with esmodules in mind that still get compiled into a format with __esModule set
                // Meaning there may be no default at runtime - however to be on the permissive side, we allow access to a synthetic default member
                // as there is no marker to indicate if the accompanying JS has `__esModule` or not, or is even native esm
                return true;
            }
            // TypeScript files never have a synthetic default (as they are always emitted with an __esModule marker) _unless_ they contain an export= statement
            if (!isSourceFileJS(file)) {
                return hasExportAssignmentSymbol(moduleSymbol);
            }
            // JS files have a synthetic default if they do not contain ES2015+ module syntax (export = is not valid in js) _and_ do not have an __esModule marker
            return !file.externalModuleIndicator && !resolveExportByName(moduleSymbol, escapeLeadingUnderscores("__esModule"), /*sourceNode*/ undefined, dontResolveAlias);
        }

        function getTargetOfImportClause(node: ImportClause, dontResolveAlias: boolean): Symbol | undefined {
            const moduleSymbol = resolveExternalModuleName(node, node.parent.moduleSpecifier);
            if (moduleSymbol) {
                let exportDefaultSymbol: Symbol | undefined;
                if (isShorthandAmbientModuleSymbol(moduleSymbol)) {
                    exportDefaultSymbol = moduleSymbol;
                }
                else {
                    exportDefaultSymbol = resolveExportByName(moduleSymbol, InternalSymbolName.Default, node, dontResolveAlias);
                }

                const file = find(moduleSymbol.declarations, isSourceFile);
                const hasSyntheticDefault = canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias);
                if (!exportDefaultSymbol && !hasSyntheticDefault) {
                    if (hasExportAssignmentSymbol(moduleSymbol)) {
                        const compilerOptionName = moduleKind >= ModuleKind.ES2015 ? "allowSyntheticDefaultImports" : "esModuleInterop";
                        const exportEqualsSymbol = moduleSymbol.exports!.get(InternalSymbolName.ExportEquals);
                        const exportAssignment = exportEqualsSymbol!.valueDeclaration;
                        const err = error(node.name, Diagnostics.Module_0_can_only_be_default_imported_using_the_1_flag, symbolToString(moduleSymbol), compilerOptionName);

                        addRelatedInfo(err, createDiagnosticForNode(
                            exportAssignment,
                            Diagnostics.This_module_is_declared_with_using_export_and_can_only_be_used_with_a_default_import_when_using_the_0_flag,
                            compilerOptionName
                        ));
                    }
                    else {
                        reportNonDefaultExport(moduleSymbol, node);
                    }
                }
                else if (hasSyntheticDefault) {
                    // per emit behavior, a synthetic default overrides a "real" .default member if `__esModule` is not present
                    const resolved = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) || resolveSymbol(moduleSymbol, dontResolveAlias);
                    markSymbolOfAliasDeclarationIfTypeOnly(node, moduleSymbol, resolved, /*overwriteTypeOnly*/ false);
                    return resolved;
                }
                markSymbolOfAliasDeclarationIfTypeOnly(node, exportDefaultSymbol, /*finalTarget*/ undefined, /*overwriteTypeOnly*/ false);
                return exportDefaultSymbol;
            }
        }

        function reportNonDefaultExport(moduleSymbol: Symbol, node: ImportClause) {
            if (moduleSymbol.exports?.has(node.symbol.escapedName)) {
                error(
                    node.name,
                    Diagnostics.Module_0_has_no_default_export_Did_you_mean_to_use_import_1_from_0_instead,
                    symbolToString(moduleSymbol),
                    symbolToString(node.symbol),
                );
            }
            else {
                const diagnostic = error(node.name, Diagnostics.Module_0_has_no_default_export, symbolToString(moduleSymbol));
                const exportStar = moduleSymbol.exports?.get(InternalSymbolName.ExportStar);
                if (exportStar) {
                    const defaultExport = find(exportStar.declarations, decl => !!(
                        isExportDeclaration(decl) && decl.moduleSpecifier &&
                            resolveExternalModuleName(decl, decl.moduleSpecifier)?.exports?.has(InternalSymbolName.Default)
                    ));
                    if (defaultExport) {
                        addRelatedInfo(diagnostic, createDiagnosticForNode(defaultExport, Diagnostics.export_Asterisk_does_not_re_export_a_default));
                    }
                }
            }
        }

        function getTargetOfNamespaceImport(node: NamespaceImport, dontResolveAlias: boolean): Symbol | undefined {
            const moduleSpecifier = node.parent.parent.moduleSpecifier;
            const immediate = resolveExternalModuleName(node, moduleSpecifier);
            const resolved = resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias, /*suppressUsageError*/ false);
            markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, /*overwriteEmpty*/ false);
            return resolved;
        }

        function getTargetOfNamespaceExport(node: NamespaceExport, dontResolveAlias: boolean): Symbol | undefined {
            const moduleSpecifier = node.parent.moduleSpecifier;
            const immediate = moduleSpecifier && resolveExternalModuleName(node, moduleSpecifier);
            const resolved = moduleSpecifier && resolveESModuleSymbol(immediate, moduleSpecifier, dontResolveAlias, /*suppressUsageError*/ false);
            markSymbolOfAliasDeclarationIfTypeOnly(node, immediate, resolved, /*overwriteEmpty*/ false);
            return resolved;
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
            if (valueSymbol === unknownSymbol && typeSymbol === unknownSymbol) {
                return unknownSymbol;
            }
            if (valueSymbol.flags & (SymbolFlags.Type | SymbolFlags.Namespace)) {
                return valueSymbol;
            }
            const result = createSymbol(valueSymbol.flags | typeSymbol.flags, valueSymbol.escapedName);
            result.declarations = deduplicate(concatenate(valueSymbol.declarations, typeSymbol.declarations), equateValues);
            result.parent = valueSymbol.parent || typeSymbol.parent;
            if (valueSymbol.valueDeclaration) result.valueDeclaration = valueSymbol.valueDeclaration;
            if (typeSymbol.members) result.members = new Map(typeSymbol.members);
            if (valueSymbol.exports) result.exports = new Map(valueSymbol.exports);
            return result;
        }

        function getExportOfModule(symbol: Symbol, specifier: ImportOrExportSpecifier | BindingElement, dontResolveAlias: boolean): Symbol | undefined {
            if (symbol.flags & SymbolFlags.Module) {
                const name = specifier.propertyName ?? specifier.name;
                if (!isIdentifier(name)) {
                    return undefined;
                }
                const exportSymbol = getExportsOfSymbol(symbol).get(name.escapedText);
                const resolved = resolveSymbol(exportSymbol, dontResolveAlias);
                markSymbolOfAliasDeclarationIfTypeOnly(specifier, exportSymbol, resolved, /*overwriteEmpty*/ false);
                return resolved;
            }
        }

        function getPropertyOfVariable(symbol: Symbol, name: __String): Symbol | undefined {
            if (symbol.flags & SymbolFlags.Variable) {
                const typeAnnotation = (<VariableDeclaration>symbol.valueDeclaration).type;
                if (typeAnnotation) {
                    return resolveSymbol(getPropertyOfType(getTypeFromTypeNode(typeAnnotation), name));
                }
            }
        }

        function getExternalModuleMember(node: ImportDeclaration | ExportDeclaration | VariableDeclaration, specifier: ImportOrExportSpecifier | BindingElement, dontResolveAlias = false): Symbol | undefined {
            const moduleSpecifier = getExternalModuleRequireArgument(node) || (node as ImportDeclaration | ExportDeclaration).moduleSpecifier!;
            const moduleSymbol = resolveExternalModuleName(node, moduleSpecifier)!; // TODO: GH#18217
            const name = specifier.propertyName || specifier.name;
            if (!isIdentifier(name)) {
                return undefined;
            }
            const suppressInteropError = name.escapedText === InternalSymbolName.Default && !!(compilerOptions.allowSyntheticDefaultImports || compilerOptions.esModuleInterop);
            const targetSymbol = resolveESModuleSymbol(moduleSymbol, moduleSpecifier, dontResolveAlias, suppressInteropError);
            if (targetSymbol) {
                if (name.escapedText) {
                    if (isShorthandAmbientModuleSymbol(moduleSymbol)) {
                        return moduleSymbol;
                    }

                    let symbolFromVariable: Symbol | undefined;
                    // First check if module was specified with "export=". If so, get the member from the resolved type
                    if (moduleSymbol && moduleSymbol.exports && moduleSymbol.exports.get(InternalSymbolName.ExportEquals)) {
                        symbolFromVariable = getPropertyOfType(getTypeOfSymbol(targetSymbol), name.escapedText);
                    }
                    else {
                        symbolFromVariable = getPropertyOfVariable(targetSymbol, name.escapedText);
                    }

                    // if symbolFromVariable is export - get its final target
                    symbolFromVariable = resolveSymbol(symbolFromVariable, dontResolveAlias);
                    let symbolFromModule = getExportOfModule(targetSymbol, specifier, dontResolveAlias);
                    if (symbolFromModule === undefined && name.escapedText === InternalSymbolName.Default) {
                        const file = find(moduleSymbol.declarations, isSourceFile);
                        if (canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias)) {
                            symbolFromModule = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) || resolveSymbol(moduleSymbol, dontResolveAlias);
                        }
                    }

                    const symbol = symbolFromModule && symbolFromVariable && symbolFromModule !== symbolFromVariable ?
                        combineValueAndTypeSymbols(symbolFromVariable, symbolFromModule) :
                        symbolFromModule || symbolFromVariable;
                    if (!symbol) {
                        const moduleName = getFullyQualifiedName(moduleSymbol, node);
                        const declarationName = declarationNameToString(name);
                        const suggestion = getSuggestedSymbolForNonexistentModule(name, targetSymbol);
                        if (suggestion !== undefined) {
                            const suggestionName = symbolToString(suggestion);
                            const diagnostic = error(name, Diagnostics._0_has_no_exported_member_named_1_Did_you_mean_2, moduleName, declarationName, suggestionName);
                            if (suggestion.valueDeclaration) {
                                addRelatedInfo(diagnostic,
                                    createDiagnosticForNode(suggestion.valueDeclaration, Diagnostics._0_is_declared_here, suggestionName)
                                );
                            }
                        }
                        else {
                            if (moduleSymbol.exports?.has(InternalSymbolName.Default)) {
                                error(
                                    name,
                                    Diagnostics.Module_0_has_no_exported_member_1_Did_you_mean_to_use_import_1_from_0_instead,
                                    moduleName,
                                    declarationName
                                );
                            }
                            else {
                                reportNonExportedMember(node, name, declarationName, moduleSymbol, moduleName);
                            }
                        }
                    }
                    return symbol;
                }
            }
        }

        function reportNonExportedMember(node: ImportDeclaration | ExportDeclaration | VariableDeclaration, name: Identifier, declarationName: string, moduleSymbol: Symbol, moduleName: string): void {
            const localSymbol = moduleSymbol.valueDeclaration.locals?.get(name.escapedText);
            const exports = moduleSymbol.exports;
            if (localSymbol) {
                const exportedEqualsSymbol = exports?.get(InternalSymbolName.ExportEquals);
                if (exportedEqualsSymbol) {
                    getSymbolIfSameReference(exportedEqualsSymbol, localSymbol) ? reportInvalidImportEqualsExportMember(node, name, declarationName, moduleName) :
                        error(name, Diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName);
                }
                else {
                    const exportedSymbol = exports ? find(symbolsToArray(exports), symbol => !!getSymbolIfSameReference(symbol, localSymbol)) : undefined;
                    const diagnostic = exportedSymbol ? error(name, Diagnostics.Module_0_declares_1_locally_but_it_is_exported_as_2, moduleName, declarationName, symbolToString(exportedSymbol)) :
                        error(name, Diagnostics.Module_0_declares_1_locally_but_it_is_not_exported, moduleName, declarationName);

                    addRelatedInfo(diagnostic,
                        ...map(localSymbol.declarations, (decl, index) =>
                            createDiagnosticForNode(decl, index === 0 ? Diagnostics._0_is_declared_here : Diagnostics.and_here, declarationName)));
                }
            }
            else {
                error(name, Diagnostics.Module_0_has_no_exported_member_1, moduleName, declarationName);
            }
        }

        function reportInvalidImportEqualsExportMember(node: ImportDeclaration | ExportDeclaration | VariableDeclaration, name: Identifier, declarationName: string, moduleName: string) {
            if (moduleKind >= ModuleKind.ES2015) {
                const message = compilerOptions.esModuleInterop ? Diagnostics._0_can_only_be_imported_by_using_a_default_import :
                    Diagnostics._0_can_only_be_imported_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
                error(name, message, declarationName);
            }
            else {
                if (isInJSFile(node)) {
                    const message = compilerOptions.esModuleInterop ? Diagnostics._0_can_only_be_imported_by_using_a_require_call_or_by_using_a_default_import :
                        Diagnostics._0_can_only_be_imported_by_using_a_require_call_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
                    error(name, message, declarationName);
                }
                else {
                    const message = compilerOptions.esModuleInterop ? Diagnostics._0_can_only_be_imported_by_using_import_1_require_2_or_a_default_import :
                        Diagnostics._0_can_only_be_imported_by_using_import_1_require_2_or_by_turning_on_the_esModuleInterop_flag_and_using_a_default_import;
                    error(name, message, declarationName, declarationName, moduleName);
                }
            }
        }

        function getTargetOfImportSpecifier(node: ImportSpecifier | BindingElement, dontResolveAlias: boolean): Symbol | undefined {
            const resolved = getExternalModuleMember(isBindingElement(node) ? getRootDeclaration(node) as VariableDeclaration : node.parent.parent.parent, node, dontResolveAlias);
            markSymbolOfAliasDeclarationIfTypeOnly(node, /*immediateTarget*/ undefined, resolved, /*overwriteEmpty*/ false);
            return resolved;
        }

        function getTargetOfNamespaceExportDeclaration(node: NamespaceExportDeclaration, dontResolveAlias: boolean): Symbol {
            const resolved = resolveExternalModuleSymbol(node.parent.symbol, dontResolveAlias);
            markSymbolOfAliasDeclarationIfTypeOnly(node, /*immediateTarget*/ undefined, resolved, /*overwriteEmpty*/ false);
            return resolved;
        }

        function getTargetOfExportSpecifier(node: ExportSpecifier, meaning: SymbolFlags, dontResolveAlias?: boolean) {
            const resolved = node.parent.parent.moduleSpecifier ?
                getExternalModuleMember(node.parent.parent, node, dontResolveAlias) :
                resolveEntityName(node.propertyName || node.name, meaning, /*ignoreErrors*/ false, dontResolveAlias);
            markSymbolOfAliasDeclarationIfTypeOnly(node, /*immediateTarget*/ undefined, resolved, /*overwriteEmpty*/ false);
            return resolved;
        }

        function getTargetOfExportAssignment(node: ExportAssignment | BinaryExpression, dontResolveAlias: boolean): Symbol | undefined {
            const expression = isExportAssignment(node) ? node.expression : node.right;
            const resolved = getTargetOfAliasLikeExpression(expression, dontResolveAlias);
            markSymbolOfAliasDeclarationIfTypeOnly(node, /*immediateTarget*/ undefined, resolved, /*overwriteEmpty*/ false);
            return resolved;
        }

        function getTargetOfAliasLikeExpression(expression: Expression, dontResolveAlias: boolean) {
            if (isClassExpression(expression)) {
                return checkExpressionCached(expression).symbol;
            }
            if (!isEntityName(expression) && !isEntityNameExpression(expression)) {
                return undefined;
            }
            const aliasLike = resolveEntityName(expression, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace, /*ignoreErrors*/ true, dontResolveAlias);
            if (aliasLike) {
                return aliasLike;
            }
            checkExpressionCached(expression);
            return getNodeLinks(expression).resolvedSymbol;
        }

        function getTargetOfPropertyAssignment(node: PropertyAssignment, dontRecursivelyResolve: boolean): Symbol | undefined {
            const expression = node.initializer;
            return getTargetOfAliasLikeExpression(expression, dontRecursivelyResolve);
        }

        function getTargetOfPropertyAccessExpression(node: PropertyAccessExpression, dontRecursivelyResolve: boolean): Symbol | undefined {
            if (!(isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.EqualsToken)) {
                return undefined;
            }

            return getTargetOfAliasLikeExpression(node.parent.right, dontRecursivelyResolve);
        }

        function getTargetOfAliasDeclaration(node: Declaration, dontRecursivelyResolve = false): Symbol | undefined {
            switch (node.kind) {
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.VariableDeclaration:
                    return getTargetOfImportEqualsDeclaration(node as ImportEqualsDeclaration | VariableDeclaration, dontRecursivelyResolve);
                case SyntaxKind.ImportClause:
                    return getTargetOfImportClause(node as ImportClause, dontRecursivelyResolve);
                case SyntaxKind.NamespaceImport:
                    return getTargetOfNamespaceImport(<NamespaceImport>node, dontRecursivelyResolve);
                case SyntaxKind.NamespaceExport:
                    return getTargetOfNamespaceExport(<NamespaceExport>node, dontRecursivelyResolve);
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.BindingElement:
                    return getTargetOfImportSpecifier(node as ImportSpecifier | BindingElement, dontRecursivelyResolve);
                case SyntaxKind.ExportSpecifier:
                    return getTargetOfExportSpecifier(<ExportSpecifier>node, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace, dontRecursivelyResolve);
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.BinaryExpression:
                    return getTargetOfExportAssignment((<ExportAssignment | BinaryExpression>node), dontRecursivelyResolve);
                case SyntaxKind.NamespaceExportDeclaration:
                    return getTargetOfNamespaceExportDeclaration(<NamespaceExportDeclaration>node, dontRecursivelyResolve);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return resolveEntityName((node as ShorthandPropertyAssignment).name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace, /*ignoreErrors*/ true, dontRecursivelyResolve);
                case SyntaxKind.PropertyAssignment:
                    return getTargetOfPropertyAssignment(node as PropertyAssignment, dontRecursivelyResolve);
                case SyntaxKind.PropertyAccessExpression:
                    return getTargetOfPropertyAccessExpression(node as PropertyAccessExpression, dontRecursivelyResolve);
                default:
                    return Debug.fail();
            }
        }

        /**
         * Indicates that a symbol is an alias that does not merge with a local declaration.
         * OR Is a JSContainer which may merge an alias with a local declaration
         */
        function isNonLocalAlias(symbol: Symbol | undefined, excludes = SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace): symbol is Symbol {
            if (!symbol) return false;
            return (symbol.flags & (SymbolFlags.Alias | excludes)) === SymbolFlags.Alias || !!(symbol.flags & SymbolFlags.Alias && symbol.flags & SymbolFlags.Assignment);
        }

        function resolveSymbol(symbol: Symbol, dontResolveAlias?: boolean): Symbol;
        function resolveSymbol(symbol: Symbol | undefined, dontResolveAlias?: boolean): Symbol | undefined;
        function resolveSymbol(symbol: Symbol | undefined, dontResolveAlias?: boolean): Symbol | undefined {
            return !dontResolveAlias && isNonLocalAlias(symbol) ? resolveAlias(symbol) : symbol;
        }

        function resolveAlias(symbol: Symbol): Symbol {
            Debug.assert((symbol.flags & SymbolFlags.Alias) !== 0, "Should only get Alias here.");
            const links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                const node = getDeclarationOfAliasSymbol(symbol);
                if (!node) return Debug.fail();
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

        function tryResolveAlias(symbol: Symbol): Symbol | undefined {
            const links = getSymbolLinks(symbol);
            if (links.target !== resolvingSymbol) {
                return resolveAlias(symbol);
            }

            return undefined;
        }

        /**
         * Marks a symbol as type-only if its declaration is syntactically type-only.
         * If it is not itself marked type-only, but resolves to a type-only alias
         * somewhere in its resolution chain, save a reference to the type-only alias declaration
         * so the alias _not_ marked type-only can be identified as _transitively_ type-only.
         *
         * This function is called on each alias declaration that could be type-only or resolve to
         * another type-only alias during `resolveAlias`, so that later, when an alias is used in a
         * JS-emitting expression, we can quickly determine if that symbol is effectively type-only
         * and issue an error if so.
         *
         * @param aliasDeclaration The alias declaration not marked as type-only
         * has already been marked as not resolving to a type-only alias. Used when recursively resolving qualified
         * names of import aliases, e.g. `import C = a.b.C`. If namespace `a` is not found to be type-only, the
         * import declaration will initially be marked as not resolving to a type-only symbol. But, namespace `b`
         * must still be checked for a type-only marker, overwriting the previous negative result if found.
         * @param immediateTarget The symbol to which the alias declaration immediately resolves
         * @param finalTarget The symbol to which the alias declaration ultimately resolves
         * @param overwriteEmpty Checks `resolvesToSymbol` for type-only declarations even if `aliasDeclaration`
         */
        function markSymbolOfAliasDeclarationIfTypeOnly(
            aliasDeclaration: Declaration | undefined,
            immediateTarget: Symbol | undefined,
            finalTarget: Symbol | undefined,
            overwriteEmpty: boolean,
        ): boolean {
            if (!aliasDeclaration) return false;

            // If the declaration itself is type-only, mark it and return.
            // No need to check what it resolves to.
            const sourceSymbol = getSymbolOfNode(aliasDeclaration);
            if (isTypeOnlyImportOrExportDeclaration(aliasDeclaration)) {
                const links = getSymbolLinks(sourceSymbol);
                links.typeOnlyDeclaration = aliasDeclaration;
                return true;
            }

            const links = getSymbolLinks(sourceSymbol);
            return markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, immediateTarget, overwriteEmpty)
                || markSymbolOfAliasDeclarationIfTypeOnlyWorker(links, finalTarget, overwriteEmpty);
        }

        function markSymbolOfAliasDeclarationIfTypeOnlyWorker(aliasDeclarationLinks: SymbolLinks, target: Symbol | undefined, overwriteEmpty: boolean): boolean {
            if (target && (aliasDeclarationLinks.typeOnlyDeclaration === undefined || overwriteEmpty && aliasDeclarationLinks.typeOnlyDeclaration === false)) {
                const exportSymbol = target.exports?.get(InternalSymbolName.ExportEquals) ?? target;
                const typeOnly = exportSymbol.declarations && find(exportSymbol.declarations, isTypeOnlyImportOrExportDeclaration);
                aliasDeclarationLinks.typeOnlyDeclaration = typeOnly ?? getSymbolLinks(exportSymbol).typeOnlyDeclaration ?? false;
            }
            return !!aliasDeclarationLinks.typeOnlyDeclaration;
        }

        /** Indicates that a symbol directly or indirectly resolves to a type-only import or export. */
        function getTypeOnlyAliasDeclaration(symbol: Symbol): TypeOnlyCompatibleAliasDeclaration | undefined {
            if (!(symbol.flags & SymbolFlags.Alias)) {
                return undefined;
            }
            const links = getSymbolLinks(symbol);
            return links.typeOnlyDeclaration || undefined;
        }

        function markExportAsReferenced(node: ImportEqualsDeclaration | ExportSpecifier) {
            const symbol = getSymbolOfNode(node);
            const target = resolveAlias(symbol);
            if (target) {
                const markAlias = target === unknownSymbol ||
                    ((target.flags & SymbolFlags.Value) && !isConstEnumOrConstEnumOnlyModule(target) && !getTypeOnlyAliasDeclaration(symbol));

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
                if (!node) return Debug.fail();
                // We defer checking of the reference of an `import =` until the import itself is referenced,
                // This way a chain of imports can be elided if ultimately the final input is only used in a type
                // position.
                if (isInternalModuleImportEqualsDeclaration(node)) {
                    const target = resolveSymbol(symbol);
                    if (target === unknownSymbol || target.flags & SymbolFlags.Value) {
                        // import foo = <symbol>
                        checkExpressionCached(<Expression>node.moduleReference);
                    }
                }
            }
        }

        // Aliases that resolve to const enums are not marked as referenced because they are not emitted,
        // but their usage in value positions must be tracked to determine if the import can be type-only.
        function markConstEnumAliasAsReferenced(symbol: Symbol) {
            const links = getSymbolLinks(symbol);
            if (!links.constEnumReferenced) {
                links.constEnumReferenced = true;
            }
        }

        // This function is only for imports with entity names
        function getSymbolOfPartOfRightHandSideOfImportEquals(entityName: EntityName, dontResolveAlias?: boolean): Symbol | undefined {
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
                return resolveEntityName(entityName, SymbolFlags.Namespace, /*ignoreErrors*/ false, dontResolveAlias);
            }
            else {
                // Case 2 in above example
                // entityName.kind could be a QualifiedName or a Missing identifier
                Debug.assert(entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration);
                return resolveEntityName(entityName, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace, /*ignoreErrors*/ false, dontResolveAlias);
            }
        }

        function getFullyQualifiedName(symbol: Symbol, containingLocation?: Node): string {
            return symbol.parent ? getFullyQualifiedName(symbol.parent, containingLocation) + "." + symbolToString(symbol) : symbolToString(symbol, containingLocation, /*meaning*/ undefined, SymbolFormatFlags.DoNotIncludeSymbolChain | SymbolFormatFlags.AllowAnyNodeKind);
        }

        /**
         * Resolves a qualified name and any involved aliases.
         */
        function resolveEntityName(name: EntityNameOrEntityNameExpression, meaning: SymbolFlags, ignoreErrors?: boolean, dontResolveAlias?: boolean, location?: Node): Symbol | undefined {
            if (nodeIsMissing(name)) {
                return undefined;
            }

            const namespaceMeaning = SymbolFlags.Namespace | (isInJSFile(name) ? meaning & SymbolFlags.Value : 0);
            let symbol: Symbol | undefined;
            if (name.kind === SyntaxKind.Identifier) {
                const message = meaning === namespaceMeaning || nodeIsSynthesized(name) ? Diagnostics.Cannot_find_namespace_0 : getCannotFindNameDiagnosticForName(getFirstIdentifier(name));
                const symbolFromJSPrototype = isInJSFile(name) && !nodeIsSynthesized(name) ? resolveEntityNameFromAssignmentDeclaration(name, meaning) : undefined;
                symbol = getMergedSymbol(resolveName(location || name, name.escapedText, meaning, ignoreErrors || symbolFromJSPrototype ? undefined : message, name, /*isUse*/ true));
                if (!symbol) {
                    return getMergedSymbol(symbolFromJSPrototype);
                }
            }
            else if (name.kind === SyntaxKind.QualifiedName || name.kind === SyntaxKind.PropertyAccessExpression) {
                const left = name.kind === SyntaxKind.QualifiedName ? name.left : name.expression;
                const right = name.kind === SyntaxKind.QualifiedName ? name.right : name.name;
                let namespace = resolveEntityName(left, namespaceMeaning, ignoreErrors, /*dontResolveAlias*/ false, location);
                if (!namespace || nodeIsMissing(right)) {
                    return undefined;
                }
                else if (namespace === unknownSymbol) {
                    return namespace;
                }
                if (isInJSFile(name)) {
                    if (namespace.valueDeclaration &&
                        isVariableDeclaration(namespace.valueDeclaration) &&
                        namespace.valueDeclaration.initializer &&
                        isCommonJsRequire(namespace.valueDeclaration.initializer)) {
                        const moduleName = (namespace.valueDeclaration.initializer as CallExpression).arguments[0] as StringLiteral;
                        const moduleSym = resolveExternalModuleName(moduleName, moduleName);
                        if (moduleSym) {
                            const resolvedModuleSymbol = resolveExternalModuleSymbol(moduleSym);
                            if (resolvedModuleSymbol) {
                                namespace = resolvedModuleSymbol;
                            }
                        }
                    }
                }
                symbol = getMergedSymbol(getSymbol(getExportsOfSymbol(namespace), right.escapedText, meaning));
                if (!symbol) {
                    if (!ignoreErrors) {
                        const namespaceName = getFullyQualifiedName(namespace);
                        const declarationName = declarationNameToString(right);
                        const suggestion = getSuggestedSymbolForNonexistentModule(right, namespace);
                        suggestion ?
                            error(right, Diagnostics._0_has_no_exported_member_named_1_Did_you_mean_2, namespaceName, declarationName, symbolToString(suggestion)) :
                            error(right, Diagnostics.Namespace_0_has_no_exported_member_1, namespaceName, declarationName);
                    }
                    return undefined;
                }
            }
            else {
                throw Debug.assertNever(name, "Unknown entity name kind.");
            }
            Debug.assert((getCheckFlags(symbol) & CheckFlags.Instantiated) === 0, "Should never get an instantiated symbol here.");
            if (!nodeIsSynthesized(name) && isEntityName(name) && (symbol.flags & SymbolFlags.Alias || name.parent.kind === SyntaxKind.ExportAssignment)) {
                markSymbolOfAliasDeclarationIfTypeOnly(getAliasDeclarationFromName(name), symbol, /*finalTarget*/ undefined, /*overwriteEmpty*/ true);
            }
            return (symbol.flags & meaning) || dontResolveAlias ? symbol : resolveAlias(symbol);
        }

        /**
         * 1. For prototype-property methods like `A.prototype.m = function () ...`, try to resolve names in the scope of `A` too.
         * Note that prototype-property assignment to locations outside the current file (eg globals) doesn't work, so
         * name resolution won't work either.
         * 2. For property assignments like `{ x: function f () { } }`, try to resolve names in the scope of `f` too.
         */
        function resolveEntityNameFromAssignmentDeclaration(name: Identifier, meaning: SymbolFlags) {
            if (isJSDocTypeReference(name.parent)) {
                const secondaryLocation = getAssignmentDeclarationLocation(name.parent);
                if (secondaryLocation) {
                    return resolveName(secondaryLocation, name.escapedText, meaning, /*nameNotFoundMessage*/ undefined, name, /*isUse*/ true);
                }
            }
        }

        function getAssignmentDeclarationLocation(node: TypeReferenceNode): Node | undefined {
            const typeAlias = findAncestor(node, node => !(isJSDocNode(node) || node.flags & NodeFlags.JSDoc) ? "quit" : isJSDocTypeAlias(node));
            if (typeAlias) {
                return;
            }
            const host = getJSDocHost(node);
            if (isExpressionStatement(host) &&
                isBinaryExpression(host.expression) &&
                getAssignmentDeclarationKind(host.expression) === AssignmentDeclarationKind.PrototypeProperty) {
                // X.prototype.m = /** @param {K} p */ function () { } <-- look for K on X's declaration
                const symbol = getSymbolOfNode(host.expression.left);
                if (symbol) {
                    return getDeclarationOfJSPrototypeContainer(symbol);
                }
            }
            if ((isObjectLiteralMethod(host) || isPropertyAssignment(host)) &&
                isBinaryExpression(host.parent.parent) &&
                getAssignmentDeclarationKind(host.parent.parent) === AssignmentDeclarationKind.Prototype) {
                // X.prototype = { /** @param {K} p */m() { } } <-- look for K on X's declaration
                const symbol = getSymbolOfNode(host.parent.parent.left);
                if (symbol) {
                    return getDeclarationOfJSPrototypeContainer(symbol);
                }
            }
            const sig = getEffectiveJSDocHost(node);
            if (sig && isFunctionLike(sig)) {
                const symbol = getSymbolOfNode(sig);
                return symbol && symbol.valueDeclaration;
            }
        }

        function getDeclarationOfJSPrototypeContainer(symbol: Symbol) {
            const decl = symbol.parent!.valueDeclaration;
            if (!decl) {
                return undefined;
            }
            const initializer = isAssignmentDeclaration(decl) ? getAssignedExpandoInitializer(decl) :
                hasOnlyExpressionInitializer(decl) ? getDeclaredExpandoInitializer(decl) :
                undefined;
            return initializer || decl;
        }

        /**
         * Get the real symbol of a declaration with an expando initializer.
         *
         * Normally, declarations have an associated symbol, but when a declaration has an expando
         * initializer, the expando's symbol is the one that has all the members merged into it.
         */
        function getExpandoSymbol(symbol: Symbol): Symbol | undefined {
            const decl = symbol.valueDeclaration;
            if (!decl || !isInJSFile(decl) || symbol.flags & SymbolFlags.TypeAlias || getExpandoInitializer(decl, /*isPrototypeAssignment*/ false)) {
                return undefined;
            }
            const init = isVariableDeclaration(decl) ? getDeclaredExpandoInitializer(decl) : getAssignedExpandoInitializer(decl);
            if (init) {
                const initSymbol = getSymbolOfNode(init);
                if (initSymbol) {
                    return mergeJSSymbols(initSymbol, symbol);
                }
            }
        }

        function resolveExternalModuleName(location: Node, moduleReferenceExpression: Expression, ignoreErrors?: boolean): Symbol | undefined {
            const isClassic = getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.Classic;
            const errorMessage = isClassic?
                                    Diagnostics.Cannot_find_module_0_Did_you_mean_to_set_the_moduleResolution_option_to_node_or_to_add_aliases_to_the_paths_option
                                  : Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations;
            return resolveExternalModuleNameWorker(location, moduleReferenceExpression, ignoreErrors ? undefined : errorMessage);
        }

        function resolveExternalModuleNameWorker(location: Node, moduleReferenceExpression: Expression, moduleNotFoundError: DiagnosticMessage | undefined, isForAugmentation = false): Symbol | undefined {
            return isStringLiteralLike(moduleReferenceExpression)
                ? resolveExternalModule(location, moduleReferenceExpression.text, moduleNotFoundError, moduleReferenceExpression, isForAugmentation)
                : undefined;
        }

        function resolveExternalModule(location: Node, moduleReference: string, moduleNotFoundError: DiagnosticMessage | undefined, errorNode: Node, isForAugmentation = false): Symbol | undefined {
            if (startsWith(moduleReference, "@types/")) {
                const diag = Diagnostics.Cannot_import_type_declaration_files_Consider_importing_0_instead_of_1;
                const withoutAtTypePrefix = removePrefix(moduleReference, "@types/");
                error(errorNode, diag, withoutAtTypePrefix, moduleReference);
            }

            const ambientModule = tryFindAmbientModule(moduleReference, /*withAugmentations*/ true);
            if (ambientModule) {
                return ambientModule;
            }
            const currentSourceFile = getSourceFileOfNode(location);
            const resolvedModule = getResolvedModule(currentSourceFile, moduleReference)!; // TODO: GH#18217
            const resolutionDiagnostic = resolvedModule && getResolutionDiagnostic(compilerOptions, resolvedModule);
            const sourceFile = resolvedModule && !resolutionDiagnostic && host.getSourceFile(resolvedModule.resolvedFileName);
            if (sourceFile) {
                if (sourceFile.symbol) {
                    if (resolvedModule.isExternalLibraryImport && !resolutionExtensionIsTSOrJson(resolvedModule.extension)) {
                        errorOnImplicitAnyModule(/*isError*/ false, errorNode, resolvedModule, moduleReference);
                    }
                    // merged symbol is module declaration symbol combined with all augmentations
                    return getMergedSymbol(sourceFile.symbol);
                }
                if (moduleNotFoundError) {
                    // report errors only if it was requested
                    error(errorNode, Diagnostics.File_0_is_not_a_module, sourceFile.fileName);
                }
                return undefined;
            }

            if (patternAmbientModules) {
                const pattern = findBestPatternMatch(patternAmbientModules, _ => _.pattern, moduleReference);
                if (pattern) {
                    // If the module reference matched a pattern ambient module ('*.foo') but there's also a
                    // module augmentation by the specific name requested ('a.foo'), we store the merged symbol
                    // by the augmentation name ('a.foo'), because asking for *.foo should not give you exports
                    // from a.foo.
                    const augmentation = patternAmbientModuleAugmentations && patternAmbientModuleAugmentations.get(moduleReference);
                    if (augmentation) {
                        return getMergedSymbol(augmentation);
                    }
                    return getMergedSymbol(pattern.symbol);
                }
            }

            // May be an untyped module. If so, ignore resolutionDiagnostic.
            if (resolvedModule && !resolutionExtensionIsTSOrJson(resolvedModule.extension) && resolutionDiagnostic === undefined || resolutionDiagnostic === Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type) {
                if (isForAugmentation) {
                    const diag = Diagnostics.Invalid_module_name_in_augmentation_Module_0_resolves_to_an_untyped_module_at_1_which_cannot_be_augmented;
                    error(errorNode, diag, moduleReference, resolvedModule.resolvedFileName);
                }
                else {
                    errorOnImplicitAnyModule(/*isError*/ noImplicitAny && !!moduleNotFoundError, errorNode, resolvedModule, moduleReference);
                }
                // Failed imports and untyped modules are both treated in an untyped manner; only difference is whether we give a diagnostic first.
                return undefined;
            }

            if (moduleNotFoundError) {
                // See if this was possibly a projectReference redirect
                if (resolvedModule) {
                    const redirect = host.getProjectReferenceRedirect(resolvedModule.resolvedFileName);
                    if (redirect) {
                        error(errorNode, Diagnostics.Output_file_0_has_not_been_built_from_source_file_1, redirect, resolvedModule.resolvedFileName);
                        return undefined;
                    }
                }

                if (resolutionDiagnostic) {
                    error(errorNode, resolutionDiagnostic, moduleReference, resolvedModule.resolvedFileName);
                }
                else {
                    const tsExtension = tryExtractTSExtension(moduleReference);
                    if (tsExtension) {
                        const diag = Diagnostics.An_import_path_cannot_end_with_a_0_extension_Consider_importing_1_instead;
                        error(errorNode, diag, tsExtension, removeExtension(moduleReference, tsExtension));
                    }
                    else if (!compilerOptions.resolveJsonModule &&
                        fileExtensionIs(moduleReference, Extension.Json) &&
                        getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs &&
                        hasJsonModuleEmitEnabled(compilerOptions)) {
                        error(errorNode, Diagnostics.Cannot_find_module_0_Consider_using_resolveJsonModule_to_import_module_with_json_extension, moduleReference);
                    }
                    else {
                        error(errorNode, moduleNotFoundError, moduleReference);
                    }
                }
            }
            return undefined;
        }

        function errorOnImplicitAnyModule(isError: boolean, errorNode: Node, { packageId, resolvedFileName }: ResolvedModuleFull, moduleReference: string): void {
            const errorInfo = !isExternalModuleNameRelative(moduleReference) && packageId
                ? typesPackageExists(packageId.name)
                    ? chainDiagnosticMessages(
                        /*details*/ undefined,
                        Diagnostics.If_the_0_package_actually_exposes_this_module_consider_sending_a_pull_request_to_amend_https_Colon_Slash_Slashgithub_com_SlashDefinitelyTyped_SlashDefinitelyTyped_Slashtree_Slashmaster_Slashtypes_Slash_1,
                        packageId.name, mangleScopedPackageName(packageId.name))
                    : chainDiagnosticMessages(
                        /*details*/ undefined,
                        Diagnostics.Try_npm_install_types_Slash_1_if_it_exists_or_add_a_new_declaration_d_ts_file_containing_declare_module_0,
                        moduleReference,
                        mangleScopedPackageName(packageId.name))
                : undefined;
            errorOrSuggestion(isError, errorNode, chainDiagnosticMessages(
                errorInfo,
                Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type,
                moduleReference,
                resolvedFileName));
        }
        function typesPackageExists(packageName: string): boolean {
            return getPackagesSet().has(getTypesPackageName(packageName));
        }

        function resolveExternalModuleSymbol(moduleSymbol: Symbol, dontResolveAlias?: boolean): Symbol;
        function resolveExternalModuleSymbol(moduleSymbol: Symbol | undefined, dontResolveAlias?: boolean): Symbol | undefined;
        function resolveExternalModuleSymbol(moduleSymbol: Symbol, dontResolveAlias?: boolean): Symbol {
            if (moduleSymbol?.exports) {
                const exportEquals = resolveSymbol(moduleSymbol.exports.get(InternalSymbolName.ExportEquals), dontResolveAlias);
                const exported = getCommonJsExportEquals(getMergedSymbol(exportEquals), getMergedSymbol(moduleSymbol));
                return getMergedSymbol(exported) || moduleSymbol;
            }
            return undefined!;
        }

        function getCommonJsExportEquals(exported: Symbol | undefined, moduleSymbol: Symbol): Symbol | undefined {
            if (!exported || exported === unknownSymbol || exported === moduleSymbol || moduleSymbol.exports!.size === 1 || exported.flags & SymbolFlags.Alias) {
                return exported;
            }
            const links = getSymbolLinks(exported);
            if (links.cjsExportMerged) {
                return links.cjsExportMerged;
            }
            const merged = exported.flags & SymbolFlags.Transient ? exported : cloneSymbol(exported);
            merged.flags = merged.flags | SymbolFlags.ValueModule;
            if (merged.exports === undefined) {
                merged.exports = createSymbolTable();
            }
            moduleSymbol.exports!.forEach((s, name) => {
                if (name === InternalSymbolName.ExportEquals) return;
                merged.exports!.set(name, merged.exports!.has(name) ? mergeSymbol(merged.exports!.get(name)!, s) : s);
            });
            getSymbolLinks(merged).cjsExportMerged = merged;
            return links.cjsExportMerged = merged;
        }

        // An external module with an 'export =' declaration may be referenced as an ES6 module provided the 'export ='
        // references a symbol that is at least declared as a module or a variable. The target of the 'export =' may
        // combine other declarations with the module or variable (e.g. a class/module, function/module, interface/variable).
        function resolveESModuleSymbol(moduleSymbol: Symbol | undefined, referencingLocation: Node, dontResolveAlias: boolean, suppressInteropError: boolean): Symbol | undefined {
            const symbol = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias);

            if (!dontResolveAlias && symbol) {
                if (!suppressInteropError && !(symbol.flags & (SymbolFlags.Module | SymbolFlags.Variable)) && !getDeclarationOfKind(symbol, SyntaxKind.SourceFile)) {
                    const compilerOptionName = moduleKind >= ModuleKind.ES2015
                        ? "allowSyntheticDefaultImports"
                        : "esModuleInterop";

                    error(referencingLocation, Diagnostics.This_module_can_only_be_referenced_with_ECMAScript_imports_Slashexports_by_turning_on_the_0_flag_and_referencing_its_default_export, compilerOptionName);

                    return symbol;
                }

                if (compilerOptions.esModuleInterop) {
                    const referenceParent = referencingLocation.parent;
                    if (
                        (isImportDeclaration(referenceParent) && getNamespaceDeclarationNode(referenceParent)) ||
                        isImportCall(referenceParent)
                    ) {
                        const type = getTypeOfSymbol(symbol);
                        let sigs = getSignaturesOfStructuredType(type, SignatureKind.Call);
                        if (!sigs || !sigs.length) {
                            sigs = getSignaturesOfStructuredType(type, SignatureKind.Construct);
                        }
                        if (sigs && sigs.length) {
                            const moduleType = getTypeWithSyntheticDefaultImportType(type, symbol, moduleSymbol!);
                            // Create a new symbol which has the module's type less the call and construct signatures
                            const result = createSymbol(symbol.flags, symbol.escapedName);
                            result.declarations = symbol.declarations ? symbol.declarations.slice() : [];
                            result.parent = symbol.parent;
                            result.target = symbol;
                            result.originatingImport = referenceParent;
                            if (symbol.valueDeclaration) result.valueDeclaration = symbol.valueDeclaration;
                            if (symbol.constEnumOnlyModule) result.constEnumOnlyModule = true;
                            if (symbol.members) result.members = new Map(symbol.members);
                            if (symbol.exports) result.exports = new Map(symbol.exports);
                            const resolvedModuleType = resolveStructuredTypeMembers(moduleType as StructuredType); // Should already be resolved from the signature checks above
                            result.type = createAnonymousType(result, resolvedModuleType.members, emptyArray, emptyArray, resolvedModuleType.stringIndexInfo, resolvedModuleType.numberIndexInfo);
                            return result;
                        }
                    }
                }
            }
            return symbol;
        }

        function hasExportAssignmentSymbol(moduleSymbol: Symbol): boolean {
            return moduleSymbol.exports!.get(InternalSymbolName.ExportEquals) !== undefined;
        }

        function getExportsOfModuleAsArray(moduleSymbol: Symbol): Symbol[] {
            return symbolsToArray(getExportsOfModule(moduleSymbol));
        }

        function getExportsAndPropertiesOfModule(moduleSymbol: Symbol): Symbol[] {
            const exports = getExportsOfModuleAsArray(moduleSymbol);
            const exportEquals = resolveExternalModuleSymbol(moduleSymbol);
            if (exportEquals !== moduleSymbol) {
                addRange(exports, getPropertiesOfType(getTypeOfSymbol(exportEquals)));
            }
            return exports;
        }

        function tryGetMemberInModuleExports(memberName: __String, moduleSymbol: Symbol): Symbol | undefined {
            const symbolTable = getExportsOfModule(moduleSymbol);
            if (symbolTable) {
                return symbolTable.get(memberName);
            }
        }

        function tryGetMemberInModuleExportsAndProperties(memberName: __String, moduleSymbol: Symbol): Symbol | undefined {
            const symbol = tryGetMemberInModuleExports(memberName, moduleSymbol);
            if (symbol) {
                return symbol;
            }

            const exportEquals = resolveExternalModuleSymbol(moduleSymbol);
            if (exportEquals === moduleSymbol) {
                return undefined;
            }

            const type = getTypeOfSymbol(exportEquals);
            return type.flags & TypeFlags.Primitive ||
                getObjectFlags(type) & ObjectFlags.Class ||
                isArrayOrTupleLikeType(type)
                ? undefined
                : getPropertyOfType(type, memberName);
        }

        function getExportsOfSymbol(symbol: Symbol): SymbolTable {
            return symbol.flags & SymbolFlags.LateBindingContainer ? getResolvedMembersOrExportsOfSymbol(symbol, MembersOrExportsResolutionKind.resolvedExports) :
                symbol.flags & SymbolFlags.Module ? getExportsOfModule(symbol) :
                symbol.exports || emptySymbols;
        }

        function getExportsOfModule(moduleSymbol: Symbol): SymbolTable {
            const links = getSymbolLinks(moduleSymbol);
            return links.resolvedExports || (links.resolvedExports = getExportsOfModuleWorker(moduleSymbol));
        }

        interface ExportCollisionTracker {
            specifierText: string;
            exportsWithDuplicate: ExportDeclaration[];
        }

        type ExportCollisionTrackerTable = UnderscoreEscapedMap<ExportCollisionTracker>;

        /**
         * Extends one symbol table with another while collecting information on name collisions for error message generation into the `lookupTable` argument
         * Not passing `lookupTable` and `exportNode` disables this collection, and just extends the tables
         */
        function extendExportSymbols(target: SymbolTable, source: SymbolTable | undefined, lookupTable?: ExportCollisionTrackerTable, exportNode?: ExportDeclaration) {
            if (!source) return;
            source.forEach((sourceSymbol, id) => {
                if (id === InternalSymbolName.Default) return;

                const targetSymbol = target.get(id);
                if (!targetSymbol) {
                    target.set(id, sourceSymbol);
                    if (lookupTable && exportNode) {
                        lookupTable.set(id, {
                            specifierText: getTextOfNode(exportNode.moduleSpecifier!)
                        } as ExportCollisionTracker);
                    }
                }
                else if (lookupTable && exportNode && targetSymbol && resolveSymbol(targetSymbol) !== resolveSymbol(sourceSymbol)) {
                    const collisionTracker = lookupTable.get(id)!;
                    if (!collisionTracker.exportsWithDuplicate) {
                        collisionTracker.exportsWithDuplicate = [exportNode];
                    }
                    else {
                        collisionTracker.exportsWithDuplicate.push(exportNode);
                    }
                }
            });
        }

        function getExportsOfModuleWorker(moduleSymbol: Symbol): SymbolTable {
            const visitedSymbols: Symbol[] = [];

            // A module defined by an 'export=' consists of one export that needs to be resolved
            moduleSymbol = resolveExternalModuleSymbol(moduleSymbol);

            return visit(moduleSymbol) || emptySymbols;

            // The ES6 spec permits export * declarations in a module to circularly reference the module itself. For example,
            // module 'a' can 'export * from "b"' and 'b' can 'export * from "a"' without error.
            function visit(symbol: Symbol | undefined): SymbolTable | undefined {
                if (!(symbol && symbol.exports && pushIfUnique(visitedSymbols, symbol))) {
                    return;
                }
                const symbols = new Map(symbol.exports);
                // All export * declarations are collected in an __export symbol by the binder
                const exportStars = symbol.exports.get(InternalSymbolName.ExportStar);
                if (exportStars) {
                    const nestedSymbols = createSymbolTable();
                    const lookupTable: ExportCollisionTrackerTable = new Map();
                    for (const node of exportStars.declarations) {
                        const resolvedModule = resolveExternalModuleName(node, (node as ExportDeclaration).moduleSpecifier!);
                        const exportedSymbols = visit(resolvedModule);
                        extendExportSymbols(
                            nestedSymbols,
                            exportedSymbols,
                            lookupTable,
                            node as ExportDeclaration
                        );
                    }
                    lookupTable.forEach(({ exportsWithDuplicate }, id) => {
                        // It's not an error if the file with multiple `export *`s with duplicate names exports a member with that name itself
                        if (id === "export=" || !(exportsWithDuplicate && exportsWithDuplicate.length) || symbols.has(id)) {
                            return;
                        }
                        for (const node of exportsWithDuplicate) {
                            diagnostics.add(createDiagnosticForNode(
                                node,
                                Diagnostics.Module_0_has_already_exported_a_member_named_1_Consider_explicitly_re_exporting_to_resolve_the_ambiguity,
                                lookupTable.get(id)!.specifierText,
                                unescapeLeadingUnderscores(id)
                            ));
                        }
                    });
                    extendExportSymbols(symbols, nestedSymbols);
                }
                return symbols;
            }
        }

        function getMergedSymbol(symbol: Symbol): Symbol;
        function getMergedSymbol(symbol: Symbol | undefined): Symbol | undefined;
        function getMergedSymbol(symbol: Symbol | undefined): Symbol | undefined {
            let merged: Symbol;
            return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
        }

        function getSymbolOfNode(node: Declaration): Symbol;
        function getSymbolOfNode(node: Node): Symbol | undefined;
        function getSymbolOfNode(node: Node): Symbol | undefined {
            return getMergedSymbol(node.symbol && getLateBoundSymbol(node.symbol));
        }

        function getParentOfSymbol(symbol: Symbol): Symbol | undefined {
            return getMergedSymbol(symbol.parent && getLateBoundSymbol(symbol.parent));
        }

        function getAlternativeContainingModules(symbol: Symbol, enclosingDeclaration: Node): Symbol[] {
            const containingFile = getSourceFileOfNode(enclosingDeclaration);
            const id = getNodeId(containingFile);
            const links = getSymbolLinks(symbol);
            let results: Symbol[] | undefined;
            if (links.extendedContainersByFile && (results = links.extendedContainersByFile.get(id))) {
                return results;
            }
            if (containingFile && containingFile.imports) {
                // Try to make an import using an import already in the enclosing file, if possible
                for (const importRef of containingFile.imports) {
                    if (nodeIsSynthesized(importRef)) continue; // Synthetic names can't be resolved by `resolveExternalModuleName` - they'll cause a debug assert if they error
                    const resolvedModule = resolveExternalModuleName(enclosingDeclaration, importRef, /*ignoreErrors*/ true);
                    if (!resolvedModule) continue;
                    const ref = getAliasForSymbolInContainer(resolvedModule, symbol);
                    if (!ref) continue;
                    results = append(results, resolvedModule);
                }
                if (length(results)) {
                    (links.extendedContainersByFile || (links.extendedContainersByFile = new Map())).set(id, results!);
                    return results!;
                }
            }
            if (links.extendedContainers) {
                return links.extendedContainers;
            }
            // No results from files already being imported by this file - expand search (expensive, but not location-specific, so cached)
            const otherFiles = host.getSourceFiles();
            for (const file of otherFiles) {
                if (!isExternalModule(file)) continue;
                const sym = getSymbolOfNode(file);
                const ref = getAliasForSymbolInContainer(sym, symbol);
                if (!ref) continue;
                results = append(results, sym);
            }
            return links.extendedContainers = results || emptyArray;
        }

        /**
         * Attempts to find the symbol corresponding to the container a symbol is in - usually this
         * is just its' `.parent`, but for locals, this value is `undefined`
         */
        function getContainersOfSymbol(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): Symbol[] | undefined {
            const container = getParentOfSymbol(symbol);
            // Type parameters end up in the `members` lists but are not externally visible
            if (container && !(symbol.flags & SymbolFlags.TypeParameter)) {
                const additionalContainers = mapDefined(container.declarations, fileSymbolIfFileSymbolExportEqualsContainer);
                const reexportContainers = enclosingDeclaration && getAlternativeContainingModules(symbol, enclosingDeclaration);
                const objectLiteralContainer = getVariableDeclarationOfObjectLiteral(container, meaning);
                if (enclosingDeclaration && getAccessibleSymbolChain(container, enclosingDeclaration, SymbolFlags.Namespace, /*externalOnly*/ false)) {
                    return append(concatenate(concatenate([container], additionalContainers), reexportContainers), objectLiteralContainer); // This order expresses a preference for the real container if it is in scope
                }
                const res = append(append(additionalContainers, container), objectLiteralContainer);
                return concatenate(res, reexportContainers);
            }
            const candidates = mapDefined(symbol.declarations, d => {
                if (!isAmbientModule(d) && d.parent && hasNonGlobalAugmentationExternalModuleSymbol(d.parent)) {
                    return getSymbolOfNode(d.parent);
                }
                if (isClassExpression(d) && isBinaryExpression(d.parent) && d.parent.operatorToken.kind === SyntaxKind.EqualsToken && isAccessExpression(d.parent.left) && isEntityNameExpression(d.parent.left.expression)) {
                    if (isModuleExportsAccessExpression(d.parent.left) || isExportsIdentifier(d.parent.left.expression)) {
                        return getSymbolOfNode(getSourceFileOfNode(d));
                    }
                    checkExpressionCached(d.parent.left.expression);
                    return getNodeLinks(d.parent.left.expression).resolvedSymbol;
                }
            });
            if (!length(candidates)) {
                return undefined;
            }
            return mapDefined(candidates, candidate => getAliasForSymbolInContainer(candidate, symbol) ? candidate : undefined);

            function fileSymbolIfFileSymbolExportEqualsContainer(d: Declaration) {
                return container && getFileSymbolIfFileSymbolExportEqualsContainer(d, container);
            }
        }

        function getVariableDeclarationOfObjectLiteral(symbol: Symbol, meaning: SymbolFlags) {
            // If we're trying to reference some object literal in, eg `var a = { x: 1 }`, the symbol for the literal, `__object`, is distinct
            // from the symbol of the declaration it is being assigned to. Since we can use the declaration to refer to the literal, however,
            // we'd like to make that connection here - potentially causing us to paint the declaration's visibility, and therefore the literal.
            const firstDecl: Node | false = !!length(symbol.declarations) && first(symbol.declarations);
            if (meaning & SymbolFlags.Value && firstDecl && firstDecl.parent && isVariableDeclaration(firstDecl.parent)) {
                if (isObjectLiteralExpression(firstDecl) && firstDecl === firstDecl.parent.initializer || isTypeLiteralNode(firstDecl) && firstDecl === firstDecl.parent.type) {
                    return getSymbolOfNode(firstDecl.parent);
                }
            }
        }

        function getFileSymbolIfFileSymbolExportEqualsContainer(d: Declaration, container: Symbol) {
            const fileSymbol = getExternalModuleContainer(d);
            const exported = fileSymbol && fileSymbol.exports && fileSymbol.exports.get(InternalSymbolName.ExportEquals);
            return exported && getSymbolIfSameReference(exported, container) ? fileSymbol : undefined;
        }

        function getAliasForSymbolInContainer(container: Symbol, symbol: Symbol) {
            if (container === getParentOfSymbol(symbol)) {
                // fast path, `symbol` is either already the alias or isn't aliased
                return symbol;
            }
            // Check if container is a thing with an `export=` which points directly at `symbol`, and if so, return
            // the container itself as the alias for the symbol
            const exportEquals = container.exports && container.exports.get(InternalSymbolName.ExportEquals);
            if (exportEquals && getSymbolIfSameReference(exportEquals, symbol)) {
                return container;
            }
            const exports = getExportsOfSymbol(container);
            const quick = exports.get(symbol.escapedName);
            if (quick && getSymbolIfSameReference(quick, symbol)) {
                return quick;
            }
            return forEachEntry(exports, exported => {
                if (getSymbolIfSameReference(exported, symbol)) {
                    return exported;
                }
            });
        }

        /**
         * Checks if two symbols, through aliasing and/or merging, refer to the same thing
         */
        function getSymbolIfSameReference(s1: Symbol, s2: Symbol) {
            if (getMergedSymbol(resolveSymbol(getMergedSymbol(s1))) === getMergedSymbol(resolveSymbol(getMergedSymbol(s2)))) {
                return s1;
            }
        }

        function getExportSymbolOfValueSymbolIfExported(symbol: Symbol): Symbol;
        function getExportSymbolOfValueSymbolIfExported(symbol: Symbol | undefined): Symbol | undefined;
        function getExportSymbolOfValueSymbolIfExported(symbol: Symbol | undefined): Symbol | undefined {
            return getMergedSymbol(symbol && (symbol.flags & SymbolFlags.ExportValue) !== 0 ? symbol.exportSymbol : symbol);
        }

        function symbolIsValue(symbol: Symbol): boolean {
            return !!(symbol.flags & SymbolFlags.Value || symbol.flags & SymbolFlags.Alias && resolveAlias(symbol).flags & SymbolFlags.Value && !getTypeOnlyAliasDeclaration(symbol));
        }

        function findConstructorDeclaration(node: ClassLikeDeclaration): ConstructorDeclaration | undefined {
            const members = node.members;
            for (const member of members) {
                if (member.kind === SyntaxKind.Constructor && nodeIsPresent((<ConstructorDeclaration>member).body)) {
                    return <ConstructorDeclaration>member;
                }
            }
        }

        function createType(flags: TypeFlags): Type {
            const result = new Type(checker, flags);
            typeCount++;
            result.id = typeCount;
            return result;
        }

        function createIntrinsicType(kind: TypeFlags, intrinsicName: string, objectFlags: ObjectFlags = 0): IntrinsicType {
            const type = <IntrinsicType>createType(kind);
            type.intrinsicName = intrinsicName;
            type.objectFlags = objectFlags;
            return type;
        }

        function createBooleanType(trueFalseTypes: readonly Type[]): IntrinsicType & UnionType {
            const type = <IntrinsicType & UnionType>getUnionType(trueFalseTypes);
            type.flags |= TypeFlags.Boolean;
            type.intrinsicName = "boolean";
            return type;
        }

        function createObjectType(objectFlags: ObjectFlags, symbol?: Symbol): ObjectType {
            const type = <ObjectType>createType(TypeFlags.Object);
            type.objectFlags = objectFlags;
            type.symbol = symbol!;
            type.members = undefined;
            type.properties = undefined;
            type.callSignatures = undefined;
            type.constructSignatures = undefined;
            type.stringIndexInfo = undefined;
            type.numberIndexInfo = undefined;
            return type;
        }

        function createTypeofType() {
            return getUnionType(arrayFrom(typeofEQFacts.keys(), getLiteralType));
        }

        function createTypeParameter(symbol?: Symbol) {
            const type = <TypeParameter>createType(TypeFlags.TypeParameter);
            if (symbol) type.symbol = symbol;
            return type;
        }

        // A reserved member name starts with two underscores, but the third character cannot be an underscore,
        // @, or #. A third underscore indicates an escaped form of an identifier that started
        // with at least two underscores. The @ character indicates that the name is denoted by a well known ES
        // Symbol instance and the # character indicates that the name is a PrivateIdentifier.
        function isReservedMemberName(name: __String) {
            return (name as string).charCodeAt(0) === CharacterCodes._ &&
                (name as string).charCodeAt(1) === CharacterCodes._ &&
                (name as string).charCodeAt(2) !== CharacterCodes._ &&
                (name as string).charCodeAt(2) !== CharacterCodes.at &&
                (name as string).charCodeAt(2) !== CharacterCodes.hash;
        }

        function getNamedMembers(members: SymbolTable): Symbol[] {
            let result: Symbol[] | undefined;
            members.forEach((symbol, id) => {
                if (!isReservedMemberName(id) && symbolIsValue(symbol)) {
                    (result || (result = [])).push(symbol);
                }
            });
            return result || emptyArray;
        }

        function setStructuredTypeMembers(type: StructuredType, members: SymbolTable, callSignatures: readonly Signature[], constructSignatures: readonly Signature[], stringIndexInfo: IndexInfo | undefined, numberIndexInfo: IndexInfo | undefined): ResolvedType {
            (<ResolvedType>type).members = members;
            (<ResolvedType>type).properties = members === emptySymbols ? emptyArray : getNamedMembers(members);
            (<ResolvedType>type).callSignatures = callSignatures;
            (<ResolvedType>type).constructSignatures = constructSignatures;
            (<ResolvedType>type).stringIndexInfo = stringIndexInfo;
            (<ResolvedType>type).numberIndexInfo = numberIndexInfo;
            return <ResolvedType>type;
        }

        function createAnonymousType(symbol: Symbol | undefined, members: SymbolTable, callSignatures: readonly Signature[], constructSignatures: readonly Signature[], stringIndexInfo: IndexInfo | undefined, numberIndexInfo: IndexInfo | undefined): ResolvedType {
            return setStructuredTypeMembers(createObjectType(ObjectFlags.Anonymous, symbol),
                members, callSignatures, constructSignatures, stringIndexInfo, numberIndexInfo);
        }

        function forEachSymbolTableInScope<T>(enclosingDeclaration: Node | undefined, callback: (symbolTable: SymbolTable) => T): T {
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
                        // falls through
                    case SyntaxKind.ModuleDeclaration:
                        const sym = getSymbolOfNode(location as ModuleDeclaration);
                        // `sym` may not have exports if this module declaration is backed by the symbol for a `const` that's being rewritten
                        // into a namespace - in such cases, it's best to just let the namespace appear empty (the const members couldn't have referred
                        // to one another anyway)
                        if (result = callback(sym?.exports || emptySymbols)) {
                            return result;
                        }
                        break;
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.InterfaceDeclaration:
                        // Type parameters are bound into `members` lists so they can merge across declarations
                        // This is troublesome, since in all other respects, they behave like locals :cries:
                        // TODO: the below is shared with similar code in `resolveName` - in fact, rephrasing all this symbol
                        // lookup logic in terms of `resolveName` would be nice
                        // The below is used to lookup type parameters within a class or interface, as they are added to the class/interface locals
                        // These can never be latebound, so the symbol's raw members are sufficient. `getMembersOfNode` cannot be used, as it would
                        // trigger resolving late-bound names, which we may already be in the process of doing while we're here!
                        let table: UnderscoreEscapedMap<Symbol> | undefined;
                        // TODO: Should this filtered table be cached in some way?
                        (getSymbolOfNode(location as ClassLikeDeclaration | InterfaceDeclaration).members || emptySymbols).forEach((memberSymbol, key) => {
                            if (memberSymbol.flags & (SymbolFlags.Type & ~SymbolFlags.Assignment)) {
                                (table || (table = createSymbolTable())).set(key, memberSymbol);
                            }
                        });
                        if (table && (result = callback(table))) {
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

        function getAccessibleSymbolChain(symbol: Symbol | undefined, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, useOnlyExternalAliasing: boolean, visitedSymbolTablesMap: ESMap<SymbolId, SymbolTable[]> = new Map()): Symbol[] | undefined {
            if (!(symbol && !isPropertyOrMethodDeclarationSymbol(symbol))) {
                return undefined;
            }

            const id = getSymbolId(symbol);
            let visitedSymbolTables = visitedSymbolTablesMap.get(id);
            if (!visitedSymbolTables) {
                visitedSymbolTablesMap.set(id, visitedSymbolTables = []);
            }
            return forEachSymbolTableInScope(enclosingDeclaration, getAccessibleSymbolChainFromSymbolTable);

            /**
             * @param {ignoreQualification} boolean Set when a symbol is being looked for through the exports of another symbol (meaning we have a route to qualify it already)
             */
            function getAccessibleSymbolChainFromSymbolTable(symbols: SymbolTable, ignoreQualification?: boolean): Symbol[] | undefined {
                if (!pushIfUnique(visitedSymbolTables!, symbols)) {
                    return undefined;
                }

                const result = trySymbolTable(symbols, ignoreQualification);
                visitedSymbolTables!.pop();
                return result;
            }

            function canQualifySymbol(symbolFromSymbolTable: Symbol, meaning: SymbolFlags) {
                // If the symbol is equivalent and doesn't need further qualification, this symbol is accessible
                return !needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning) ||
                    // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                    !!getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning), useOnlyExternalAliasing, visitedSymbolTablesMap);
            }

            function isAccessible(symbolFromSymbolTable: Symbol, resolvedAliasSymbol?: Symbol, ignoreQualification?: boolean) {
                return (symbol === (resolvedAliasSymbol || symbolFromSymbolTable) || getMergedSymbol(symbol) === getMergedSymbol(resolvedAliasSymbol || symbolFromSymbolTable)) &&
                    // if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
                    // and if symbolFromSymbolTable or alias resolution matches the symbol,
                    // check the symbol can be qualified, it is only then this symbol is accessible
                    !some(symbolFromSymbolTable.declarations, hasNonGlobalAugmentationExternalModuleSymbol) &&
                    (ignoreQualification || canQualifySymbol(getMergedSymbol(symbolFromSymbolTable), meaning));
            }

            function trySymbolTable(symbols: SymbolTable, ignoreQualification: boolean | undefined): Symbol[] | undefined {
                // If symbol is directly available by its name in the symbol table
                if (isAccessible(symbols.get(symbol!.escapedName)!, /*resolvedAliasSymbol*/ undefined, ignoreQualification)) {
                    return [symbol!];
                }

                // Check if symbol is any of the aliases in scope
                const result = forEachEntry(symbols, symbolFromSymbolTable => {
                    if (symbolFromSymbolTable.flags & SymbolFlags.Alias
                        && symbolFromSymbolTable.escapedName !== InternalSymbolName.ExportEquals
                        && symbolFromSymbolTable.escapedName !== InternalSymbolName.Default
                        && !(isUMDExportSymbol(symbolFromSymbolTable) && enclosingDeclaration && isExternalModule(getSourceFileOfNode(enclosingDeclaration)))
                        // If `!useOnlyExternalAliasing`, we can use any type of alias to get the name
                        && (!useOnlyExternalAliasing || some(symbolFromSymbolTable.declarations, isExternalModuleImportEqualsDeclaration))
                        // While exports are generally considered to be in scope, export-specifier declared symbols are _not_
                        // See similar comment in `resolveName` for details
                        && (ignoreQualification || !getDeclarationOfKind(symbolFromSymbolTable, SyntaxKind.ExportSpecifier))
                    ) {

                        const resolvedImportedSymbol = resolveAlias(symbolFromSymbolTable);
                        const candidate = getCandidateListForSymbol(symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification);
                        if (candidate) {
                            return candidate;
                        }
                    }
                    if (symbolFromSymbolTable.escapedName === symbol!.escapedName && symbolFromSymbolTable.exportSymbol) {
                        if (isAccessible(getMergedSymbol(symbolFromSymbolTable.exportSymbol), /*aliasSymbol*/ undefined, ignoreQualification)) {
                            return [symbol!];
                        }
                    }
                });

                // If there's no result and we're looking at the global symbol table, treat `globalThis` like an alias and try to lookup thru that
                return result || (symbols === globals ? getCandidateListForSymbol(globalThisSymbol, globalThisSymbol, ignoreQualification) : undefined);
            }

            function getCandidateListForSymbol(symbolFromSymbolTable: Symbol, resolvedImportedSymbol: Symbol, ignoreQualification: boolean | undefined) {
                if (isAccessible(symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification)) {
                    return [symbolFromSymbolTable];
                }

                // Look in the exported members, if we can find accessibleSymbolChain, symbol is accessible using this chain
                // but only if the symbolFromSymbolTable can be qualified
                const candidateTable = getExportsOfSymbol(resolvedImportedSymbol);
                const accessibleSymbolsFromExports = candidateTable && getAccessibleSymbolChainFromSymbolTable(candidateTable, /*ignoreQualification*/ true);
                if (accessibleSymbolsFromExports && canQualifySymbol(symbolFromSymbolTable, getQualifiedLeftMeaning(meaning))) {
                    return [symbolFromSymbolTable].concat(accessibleSymbolsFromExports);
                }
            }
        }

        function needsQualification(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags) {
            let qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, symbolTable => {
                // If symbol of this name is not available in the symbol table we are ok
                let symbolFromSymbolTable = getMergedSymbol(symbolTable.get(symbol.escapedName));
                if (!symbolFromSymbolTable) {
                    // Continue to the next symbol table
                    return false;
                }
                // If the symbol with this name is present it should refer to the symbol
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

        function isPropertyOrMethodDeclarationSymbol(symbol: Symbol) {
            if (symbol.declarations && symbol.declarations.length) {
                for (const declaration of symbol.declarations) {
                    switch (declaration.kind) {
                        case SyntaxKind.PropertyDeclaration:
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.GetAccessor:
                        case SyntaxKind.SetAccessor:
                            continue;
                        default:
                            return false;
                    }
                }
                return true;
            }
            return false;
        }

        function isTypeSymbolAccessible(typeSymbol: Symbol, enclosingDeclaration: Node | undefined): boolean {
            const access = isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, SymbolFlags.Type, /*shouldComputeAliasesToMakeVisible*/ false, /*allowModules*/ true);
            return access.accessibility === SymbolAccessibility.Accessible;
        }

        function isValueSymbolAccessible(typeSymbol: Symbol, enclosingDeclaration: Node | undefined): boolean {
            const access = isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, SymbolFlags.Value, /*shouldComputeAliasesToMakeVisible*/ false, /*allowModules*/ true);
            return access.accessibility === SymbolAccessibility.Accessible;
        }

        function isSymbolAccessibleByFlags(typeSymbol: Symbol, enclosingDeclaration: Node | undefined, flags: SymbolFlags): boolean {
            const access = isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, flags, /*shouldComputeAliasesToMakeVisible*/ false, /*allowModules*/ false);
            return access.accessibility === SymbolAccessibility.Accessible;
        }

        function isAnySymbolAccessible(symbols: Symbol[] | undefined, enclosingDeclaration: Node | undefined, initialSymbol: Symbol, meaning: SymbolFlags, shouldComputeAliasesToMakeVisible: boolean, allowModules: boolean): SymbolAccessibilityResult | undefined {
            if (!length(symbols)) return;

            let hadAccessibleChain: Symbol | undefined;
            let earlyModuleBail = false;
            for (const symbol of symbols!) {
                // Symbol is accessible if it by itself is accessible
                const accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, /*useOnlyExternalAliasing*/ false);
                if (accessibleSymbolChain) {
                    hadAccessibleChain = symbol;
                    const hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0], shouldComputeAliasesToMakeVisible);
                    if (hasAccessibleDeclarations) {
                        return hasAccessibleDeclarations;
                    }
                }
                else if (allowModules) {
                    if (some(symbol.declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                        if (shouldComputeAliasesToMakeVisible) {
                            earlyModuleBail = true;
                            // Generally speaking, we want to use the aliases that already exist to refer to a module, if present
                            // In order to do so, we need to find those aliases in order to retain them in declaration emit; so
                            // if we are in declaration emit, we cannot use the fast path for module visibility until we've exhausted
                            // all other visibility options (in order to capture the possible aliases used to reference the module)
                            continue;
                        }
                        // Any meaning of a module symbol is always accessible via an `import` type
                        return {
                            accessibility: SymbolAccessibility.Accessible
                        };
                    }
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

                const containers = getContainersOfSymbol(symbol, enclosingDeclaration, meaning);
                const parentResult = isAnySymbolAccessible(containers, enclosingDeclaration, initialSymbol, initialSymbol === symbol ? getQualifiedLeftMeaning(meaning) : meaning, shouldComputeAliasesToMakeVisible, allowModules);
                if (parentResult) {
                    return parentResult;
                }
            }

            if (earlyModuleBail) {
                return {
                    accessibility: SymbolAccessibility.Accessible
                };
            }

            if (hadAccessibleChain) {
                return {
                    accessibility: SymbolAccessibility.NotAccessible,
                    errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                    errorModuleName: hadAccessibleChain !== initialSymbol ? symbolToString(hadAccessibleChain, enclosingDeclaration, SymbolFlags.Namespace) : undefined,
                };
            }
        }

        /**
         * Check if the given symbol in given enclosing declaration is accessible and mark all associated alias to be visible if requested
         *
         * @param symbol a Symbol to check if accessible
         * @param enclosingDeclaration a Node containing reference to the symbol
         * @param meaning a SymbolFlags to check if such meaning of the symbol is accessible
         * @param shouldComputeAliasToMakeVisible a boolean value to indicate whether to return aliases to be mark visible in case the symbol is accessible
         */
        function isSymbolAccessible(symbol: Symbol | undefined, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, shouldComputeAliasesToMakeVisible: boolean): SymbolAccessibilityResult {
            return isSymbolAccessibleWorker(symbol, enclosingDeclaration, meaning, shouldComputeAliasesToMakeVisible, /*allowModules*/ true);
        }

        function isSymbolAccessibleWorker(symbol: Symbol | undefined, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, shouldComputeAliasesToMakeVisible: boolean, allowModules: boolean): SymbolAccessibilityResult {
            if (symbol && enclosingDeclaration) {
                const result = isAnySymbolAccessible([symbol], enclosingDeclaration, symbol, meaning, shouldComputeAliasesToMakeVisible, allowModules);
                if (result) {
                    return result;
                }

                // This could be a symbol that is not exported in the external module
                // or it could be a symbol from different external module that is not aliased and hence cannot be named
                const symbolExternalModule = forEach(symbol.declarations, getExternalModuleContainer);
                if (symbolExternalModule) {
                    const enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
                    if (symbolExternalModule !== enclosingExternalModule) {
                        // name from different external module that is not visible
                        return {
                            accessibility: SymbolAccessibility.CannotBeNamed,
                            errorSymbolName: symbolToString(symbol, enclosingDeclaration, meaning),
                            errorModuleName: symbolToString(symbolExternalModule)
                        };
                    }
                }

                // Just a local name that is not accessible
                return {
                    accessibility: SymbolAccessibility.NotAccessible,
                    errorSymbolName: symbolToString(symbol, enclosingDeclaration, meaning),
                };
            }

            return { accessibility: SymbolAccessibility.Accessible };
        }

        function getExternalModuleContainer(declaration: Node) {
            const node = findAncestor(declaration, hasExternalModuleSymbol);
            return node && getSymbolOfNode(node);
        }

        function hasExternalModuleSymbol(declaration: Node) {
            return isAmbientModule(declaration) || (declaration.kind === SyntaxKind.SourceFile && isExternalOrCommonJsModule(<SourceFile>declaration));
        }

        function hasNonGlobalAugmentationExternalModuleSymbol(declaration: Node) {
            return isModuleWithStringLiteralName(declaration) || (declaration.kind === SyntaxKind.SourceFile && isExternalOrCommonJsModule(<SourceFile>declaration));
        }

        function hasVisibleDeclarations(symbol: Symbol, shouldComputeAliasToMakeVisible: boolean): SymbolVisibilityResult | undefined {
            let aliasesToMakeVisible: LateVisibilityPaintedStatement[] | undefined;
            if (!every(filter(symbol.declarations, d => d.kind !== SyntaxKind.Identifier), getIsDeclarationVisible)) {
                return undefined;
            }
            return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible };

            function getIsDeclarationVisible(declaration: Declaration) {
                if (!isDeclarationVisible(declaration)) {
                    // Mark the unexported alias as visible if its parent is visible
                    // because these kind of aliases can be used to name types in declaration file

                    const anyImportSyntax = getAnyImportSyntax(declaration);
                    if (anyImportSyntax &&
                        !hasSyntacticModifier(anyImportSyntax, ModifierFlags.Export) && // import clause without export
                        isDeclarationVisible(anyImportSyntax.parent)) {
                        return addVisibleAlias(declaration, anyImportSyntax);
                    }
                    else if (isVariableDeclaration(declaration) && isVariableStatement(declaration.parent.parent) &&
                        !hasSyntacticModifier(declaration.parent.parent, ModifierFlags.Export) && // unexported variable statement
                        isDeclarationVisible(declaration.parent.parent.parent)) {
                        return addVisibleAlias(declaration, declaration.parent.parent);
                    }
                    else if (isLateVisibilityPaintedStatement(declaration) // unexported top-level statement
                        && !hasSyntacticModifier(declaration, ModifierFlags.Export)
                        && isDeclarationVisible(declaration.parent)) {
                        return addVisibleAlias(declaration, declaration);
                    }

                    // Declaration is not visible
                    return false;
                }

                return true;
            }

            function addVisibleAlias(declaration: Declaration, aliasingStatement: LateVisibilityPaintedStatement) {
                // In function "buildTypeDisplay" where we decide whether to write type-alias or serialize types,
                // we want to just check if type- alias is accessible or not but we don't care about emitting those alias at that time
                // since we will do the emitting later in trackSymbol.
                if (shouldComputeAliasToMakeVisible) {
                    getNodeLinks(declaration).isVisible = true;
                    aliasesToMakeVisible = appendIfUnique(aliasesToMakeVisible, aliasingStatement);
                }
                return true;
            }
        }

        function isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult {
            // get symbol of the first identifier of the entityName
            let meaning: SymbolFlags;
            if (entityName.parent.kind === SyntaxKind.TypeQuery ||
                isExpressionWithTypeArgumentsInClassExtendsClause(entityName.parent) ||
                entityName.parent.kind === SyntaxKind.ComputedPropertyName) {
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
            const symbol = resolveName(enclosingDeclaration, firstIdentifier.escapedText, meaning, /*nodeNotFoundErrorMessage*/ undefined, /*nameArg*/ undefined, /*isUse*/ false);
            if (symbol && symbol.flags & SymbolFlags.TypeParameter && meaning & SymbolFlags.Type) {
                return { accessibility: SymbolAccessibility.Accessible };
            }

            // Verify if the symbol is accessible
            return (symbol && hasVisibleDeclarations(symbol, /*shouldComputeAliasToMakeVisible*/ true)) || {
                accessibility: SymbolAccessibility.NotAccessible,
                errorSymbolName: getTextOfNode(firstIdentifier),
                errorNode: firstIdentifier
            };
        }

        function symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags: SymbolFormatFlags = SymbolFormatFlags.AllowAnyNodeKind, writer?: EmitTextWriter): string {
            let nodeFlags = NodeBuilderFlags.IgnoreErrors;
            if (flags & SymbolFormatFlags.UseOnlyExternalAliasing) {
                nodeFlags |= NodeBuilderFlags.UseOnlyExternalAliasing;
            }
            if (flags & SymbolFormatFlags.WriteTypeParametersOrArguments) {
                nodeFlags |= NodeBuilderFlags.WriteTypeParametersInQualifiedName;
            }
            if (flags & SymbolFormatFlags.UseAliasDefinedOutsideCurrentScope) {
                nodeFlags |= NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;
            }
            if (flags & SymbolFormatFlags.DoNotIncludeSymbolChain) {
                nodeFlags |= NodeBuilderFlags.DoNotIncludeSymbolChain;
            }
            const builder = flags & SymbolFormatFlags.AllowAnyNodeKind ? nodeBuilder.symbolToExpression : nodeBuilder.symbolToEntityName;
            return writer ? symbolToStringWorker(writer).getText() : usingSingleLineStringWriter(symbolToStringWorker);

            function symbolToStringWorker(writer: EmitTextWriter) {
                const entity = builder(symbol, meaning!, enclosingDeclaration, nodeFlags)!; // TODO: GH#18217
                // add neverAsciiEscape for GH#39027
                const printer = enclosingDeclaration?.kind === SyntaxKind.SourceFile ? createPrinter({ removeComments: true, neverAsciiEscape: true }) : createPrinter({ removeComments: true });
                const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                printer.writeNode(EmitHint.Unspecified, entity, /*sourceFile*/ sourceFile, writer);
                return writer;
            }
        }

        function signatureToString(signature: Signature, enclosingDeclaration?: Node, flags = TypeFormatFlags.None, kind?: SignatureKind, writer?: EmitTextWriter): string {
            return writer ? signatureToStringWorker(writer).getText() : usingSingleLineStringWriter(signatureToStringWorker);

            function signatureToStringWorker(writer: EmitTextWriter) {
                let sigOutput: SyntaxKind;
                if (flags & TypeFormatFlags.WriteArrowStyleSignature) {
                    sigOutput = kind === SignatureKind.Construct ? SyntaxKind.ConstructorType : SyntaxKind.FunctionType;
                }
                else {
                    sigOutput = kind === SignatureKind.Construct ? SyntaxKind.ConstructSignature : SyntaxKind.CallSignature;
                }
                const sig = nodeBuilder.signatureToSignatureDeclaration(signature, sigOutput, enclosingDeclaration, toNodeBuilderFlags(flags) | NodeBuilderFlags.IgnoreErrors | NodeBuilderFlags.WriteTypeParametersInQualifiedName);
                const printer = createPrinter({ removeComments: true, omitTrailingSemicolon: true });
                const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                printer.writeNode(EmitHint.Unspecified, sig!, /*sourceFile*/ sourceFile, getTrailingSemicolonDeferringWriter(writer)); // TODO: GH#18217
                return writer;
            }
        }

        function typeToString(type: Type, enclosingDeclaration?: Node, flags: TypeFormatFlags = TypeFormatFlags.AllowUniqueESSymbolType | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope, writer: EmitTextWriter = createTextWriter("")): string {
            const noTruncation = compilerOptions.noErrorTruncation || flags & TypeFormatFlags.NoTruncation;
            const typeNode = nodeBuilder.typeToTypeNode(type, enclosingDeclaration, toNodeBuilderFlags(flags) | NodeBuilderFlags.IgnoreErrors | (noTruncation ? NodeBuilderFlags.NoTruncation : 0), writer);
            if (typeNode === undefined) return Debug.fail("should always get typenode");
            const options = { removeComments: true };
            const printer = createPrinter(options);
            const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
            printer.writeNode(EmitHint.Unspecified, typeNode, /*sourceFile*/ sourceFile, writer);
            const result = writer.getText();

            const maxLength = noTruncation ? noTruncationMaximumTruncationLength * 2 : defaultMaximumTruncationLength * 2;
            if (maxLength && result && result.length >= maxLength) {
                return result.substr(0, maxLength - "...".length) + "...";
            }
            return result;
        }

        function getTypeNamesForErrorDisplay(left: Type, right: Type): [string, string] {
            let leftStr = symbolValueDeclarationIsContextSensitive(left.symbol) ? typeToString(left, left.symbol.valueDeclaration) : typeToString(left);
            let rightStr = symbolValueDeclarationIsContextSensitive(right.symbol) ? typeToString(right, right.symbol.valueDeclaration) : typeToString(right);
            if (leftStr === rightStr) {
                leftStr = getTypeNameForErrorDisplay(left);
                rightStr = getTypeNameForErrorDisplay(right);
            }
            return [leftStr, rightStr];
        }

        function getTypeNameForErrorDisplay(type: Type) {
            return typeToString(type, /*enclosingDeclaration*/ undefined, TypeFormatFlags.UseFullyQualifiedType);
        }

        function symbolValueDeclarationIsContextSensitive(symbol: Symbol): boolean {
            return symbol && symbol.valueDeclaration && isExpression(symbol.valueDeclaration) && !isContextSensitive(symbol.valueDeclaration);
        }

        function toNodeBuilderFlags(flags = TypeFormatFlags.None): NodeBuilderFlags {
            return flags & TypeFormatFlags.NodeBuilderFlagsMask;
        }

        function createNodeBuilder() {
            return {
                typeToTypeNode: (type: Type, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => typeToTypeNodeHelper(type, context)),
                indexInfoToIndexSignatureDeclaration: (indexInfo: IndexInfo, kind: IndexKind, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => indexInfoToIndexSignatureDeclarationHelper(indexInfo, kind, context, /*typeNode*/ undefined)),
                signatureToSignatureDeclaration: (signature: Signature, kind: SignatureDeclaration["kind"], enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => signatureToSignatureDeclarationHelper(signature, kind, context)),
                symbolToEntityName: (symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => symbolToName(symbol, context, meaning, /*expectsIdentifier*/ false)),
                symbolToExpression: (symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => symbolToExpression(symbol, context, meaning)),
                symbolToTypeParameterDeclarations: (symbol: Symbol, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => typeParametersToTypeParameterDeclarations(symbol, context)),
                symbolToParameterDeclaration: (symbol: Symbol, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => symbolToParameterDeclaration(symbol, context)),
                typeParameterToDeclaration: (parameter: TypeParameter, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker) =>
                    withContext(enclosingDeclaration, flags, tracker, context => typeParameterToDeclaration(parameter, context)),
                symbolTableToDeclarationStatements: (symbolTable: SymbolTable, enclosingDeclaration?: Node, flags?: NodeBuilderFlags, tracker?: SymbolTracker, bundled?: boolean) =>
                    withContext(enclosingDeclaration, flags, tracker, context => symbolTableToDeclarationStatements(symbolTable, context, bundled)),
            };

            function withContext<T>(enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, tracker: SymbolTracker | undefined, cb: (context: NodeBuilderContext) => T): T | undefined {
                Debug.assert(enclosingDeclaration === undefined || (enclosingDeclaration.flags & NodeFlags.Synthesized) === 0);
                const context: NodeBuilderContext = {
                    enclosingDeclaration,
                    flags: flags || NodeBuilderFlags.None,
                    // If no full tracker is provided, fake up a dummy one with a basic limited-functionality moduleResolverHost
                    tracker: tracker && tracker.trackSymbol ? tracker : { trackSymbol: noop, moduleResolverHost: flags! & NodeBuilderFlags.DoNotIncludeSymbolChain ? {
                        getCommonSourceDirectory: !!(host as Program).getCommonSourceDirectory ? () => (host as Program).getCommonSourceDirectory() : () => "",
                        getSourceFiles: () => host.getSourceFiles(),
                        getCurrentDirectory: () => host.getCurrentDirectory(),
                        getSymlinkCache: maybeBind(host, host.getSymlinkCache),
                        useCaseSensitiveFileNames: maybeBind(host, host.useCaseSensitiveFileNames),
                        redirectTargetsMap: host.redirectTargetsMap,
                        getProjectReferenceRedirect: fileName => host.getProjectReferenceRedirect(fileName),
                        isSourceOfProjectReferenceRedirect: fileName => host.isSourceOfProjectReferenceRedirect(fileName),
                        fileExists: fileName => host.fileExists(fileName),
                    } : undefined },
                    encounteredError: false,
                    visitedTypes: undefined,
                    symbolDepth: undefined,
                    inferTypeParameters: undefined,
                    approximateLength: 0
                };
                const resultingNode = cb(context);
                return context.encounteredError ? undefined : resultingNode;
            }

            function checkTruncationLength(context: NodeBuilderContext): boolean {
                if (context.truncating) return context.truncating;
                return context.truncating = context.approximateLength > ((context.flags & NodeBuilderFlags.NoTruncation) ? noTruncationMaximumTruncationLength : defaultMaximumTruncationLength);
            }

            function typeToTypeNodeHelper(type: Type, context: NodeBuilderContext): TypeNode {
                if (cancellationToken && cancellationToken.throwIfCancellationRequested) {
                    cancellationToken.throwIfCancellationRequested();
                }
                const inTypeAlias = context.flags & NodeBuilderFlags.InTypeAlias;
                context.flags &= ~NodeBuilderFlags.InTypeAlias;

                if (!type) {
                    if (!(context.flags & NodeBuilderFlags.AllowEmptyUnionOrIntersection)) {
                        context.encounteredError = true;
                        return undefined!; // TODO: GH#18217
                    }
                    context.approximateLength += 3;
                    return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                }

                if (!(context.flags & NodeBuilderFlags.NoTypeReduction)) {
                    type = getReducedType(type);
                }

                if (type.flags & TypeFlags.Any) {
                    context.approximateLength += 3;
                    return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                }
                if (type.flags & TypeFlags.Unknown) {
                    return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
                }
                if (type.flags & TypeFlags.String) {
                    context.approximateLength += 6;
                    return factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
                }
                if (type.flags & TypeFlags.Number) {
                    context.approximateLength += 6;
                    return factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
                }
                if (type.flags & TypeFlags.BigInt) {
                    context.approximateLength += 6;
                    return factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword);
                }
                if (type.flags & TypeFlags.Boolean) {
                    context.approximateLength += 7;
                    return factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
                }
                if (type.flags & TypeFlags.EnumLiteral && !(type.flags & TypeFlags.Union)) {
                    const parentSymbol = getParentOfSymbol(type.symbol)!;
                    const parentName = symbolToTypeNode(parentSymbol, context, SymbolFlags.Type);
                    const enumLiteralName = getDeclaredTypeOfSymbol(parentSymbol) === type
                        ? parentName
                        : appendReferenceToType(
                            parentName as TypeReferenceNode | ImportTypeNode,
                            factory.createTypeReferenceNode(symbolName(type.symbol), /*typeArguments*/ undefined)
                        );
                    return enumLiteralName;
                }
                if (type.flags & TypeFlags.EnumLike) {
                    return symbolToTypeNode(type.symbol, context, SymbolFlags.Type);
                }
                if (type.flags & TypeFlags.StringLiteral) {
                    context.approximateLength += ((<StringLiteralType>type).value.length + 2);
                    return factory.createLiteralTypeNode(setEmitFlags(factory.createStringLiteral((<StringLiteralType>type).value, !!(context.flags & NodeBuilderFlags.UseSingleQuotesForStringLiteralType)), EmitFlags.NoAsciiEscaping));
                }
                if (type.flags & TypeFlags.NumberLiteral) {
                    const value = (<NumberLiteralType>type).value;
                    context.approximateLength += ("" + value).length;
                    return factory.createLiteralTypeNode(value < 0 ? factory.createPrefixUnaryExpression(SyntaxKind.MinusToken, factory.createNumericLiteral(-value)) : factory.createNumericLiteral(value));
                }
                if (type.flags & TypeFlags.BigIntLiteral) {
                    context.approximateLength += (pseudoBigIntToString((<BigIntLiteralType>type).value).length) + 1;
                    return factory.createLiteralTypeNode((factory.createBigIntLiteral((<BigIntLiteralType>type).value)));
                }
                if (type.flags & TypeFlags.BooleanLiteral) {
                    context.approximateLength += (<IntrinsicType>type).intrinsicName.length;
                    return factory.createLiteralTypeNode((<IntrinsicType>type).intrinsicName === "true" ? factory.createTrue() : factory.createFalse());
                }
                if (type.flags & TypeFlags.UniqueESSymbol) {
                    if (!(context.flags & NodeBuilderFlags.AllowUniqueESSymbolType)) {
                        if (isValueSymbolAccessible(type.symbol, context.enclosingDeclaration)) {
                            context.approximateLength += 6;
                            return symbolToTypeNode(type.symbol, context, SymbolFlags.Value);
                        }
                        if (context.tracker.reportInaccessibleUniqueSymbolError) {
                            context.tracker.reportInaccessibleUniqueSymbolError();
                        }
                    }
                    context.approximateLength += 13;
                    return factory.createTypeOperatorNode(SyntaxKind.UniqueKeyword, factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword));
                }
                if (type.flags & TypeFlags.Void) {
                    context.approximateLength += 4;
                    return factory.createKeywordTypeNode(SyntaxKind.VoidKeyword);
                }
                if (type.flags & TypeFlags.Undefined) {
                    context.approximateLength += 9;
                    return factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
                }
                if (type.flags & TypeFlags.Null) {
                    context.approximateLength += 4;
                    return factory.createLiteralTypeNode(factory.createNull());
                }
                if (type.flags & TypeFlags.Never) {
                    context.approximateLength += 5;
                    return factory.createKeywordTypeNode(SyntaxKind.NeverKeyword);
                }
                if (type.flags & TypeFlags.ESSymbol) {
                    context.approximateLength += 6;
                    return factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword);
                }
                if (type.flags & TypeFlags.NonPrimitive) {
                    context.approximateLength += 6;
                    return factory.createKeywordTypeNode(SyntaxKind.ObjectKeyword);
                }
                if (isThisTypeParameter(type)) {
                    if (context.flags & NodeBuilderFlags.InObjectTypeLiteral) {
                        if (!context.encounteredError && !(context.flags & NodeBuilderFlags.AllowThisInObjectLiteral)) {
                            context.encounteredError = true;
                        }
                        if (context.tracker.reportInaccessibleThisError) {
                            context.tracker.reportInaccessibleThisError();
                        }
                    }
                    context.approximateLength += 4;
                    return factory.createThisTypeNode();
                }

                if (!inTypeAlias && type.aliasSymbol && (context.flags & NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope || isTypeSymbolAccessible(type.aliasSymbol, context.enclosingDeclaration))) {
                    const typeArgumentNodes = mapToTypeNodes(type.aliasTypeArguments, context);
                    if (isReservedMemberName(type.aliasSymbol.escapedName) && !(type.aliasSymbol.flags & SymbolFlags.Class)) return factory.createTypeReferenceNode(factory.createIdentifier(""), typeArgumentNodes);
                    return symbolToTypeNode(type.aliasSymbol, context, SymbolFlags.Type, typeArgumentNodes);
                }

                const objectFlags = getObjectFlags(type);

                if (objectFlags & ObjectFlags.Reference) {
                    Debug.assert(!!(type.flags & TypeFlags.Object));
                    return (<TypeReference>type).node ? visitAndTransformType(type, typeReferenceToTypeNode) : typeReferenceToTypeNode(<TypeReference>type);
                }
                if (type.flags & TypeFlags.TypeParameter || objectFlags & ObjectFlags.ClassOrInterface) {
                    if (type.flags & TypeFlags.TypeParameter && contains(context.inferTypeParameters, type)) {
                        context.approximateLength += (symbolName(type.symbol).length + 6);
                        return factory.createInferTypeNode(typeParameterToDeclarationWithConstraint(type as TypeParameter, context, /*constraintNode*/ undefined));
                    }
                    if (context.flags & NodeBuilderFlags.GenerateNamesForShadowedTypeParams &&
                        type.flags & TypeFlags.TypeParameter &&
                        !isTypeSymbolAccessible(type.symbol, context.enclosingDeclaration)) {
                        const name = typeParameterToName(type, context);
                        context.approximateLength += idText(name).length;
                        return factory.createTypeReferenceNode(factory.createIdentifier(idText(name)), /*typeArguments*/ undefined);
                    }
                    // Ignore constraint/default when creating a usage (as opposed to declaration) of a type parameter.
                    return type.symbol
                        ? symbolToTypeNode(type.symbol, context, SymbolFlags.Type)
                        : factory.createTypeReferenceNode(factory.createIdentifier("?"), /*typeArguments*/ undefined);
                }
                if (type.flags & (TypeFlags.Union | TypeFlags.Intersection)) {
                    const types = type.flags & TypeFlags.Union ? formatUnionTypes((<UnionType>type).types) : (<IntersectionType>type).types;
                    if (length(types) === 1) {
                        return typeToTypeNodeHelper(types[0], context);
                    }
                    const typeNodes = mapToTypeNodes(types, context, /*isBareList*/ true);
                    if (typeNodes && typeNodes.length > 0) {
                        const unionOrIntersectionTypeNode = type.flags & TypeFlags.Union ? factory.createUnionTypeNode(typeNodes) : factory.createIntersectionTypeNode(typeNodes);
                        return unionOrIntersectionTypeNode;
                    }
                    else {
                        if (!context.encounteredError && !(context.flags & NodeBuilderFlags.AllowEmptyUnionOrIntersection)) {
                            context.encounteredError = true;
                        }
                        return undefined!; // TODO: GH#18217
                    }
                }
                if (objectFlags & (ObjectFlags.Anonymous | ObjectFlags.Mapped)) {
                    Debug.assert(!!(type.flags & TypeFlags.Object));
                    // The type is an object literal type.
                    return createAnonymousTypeNode(<ObjectType>type);
                }
                if (type.flags & TypeFlags.Index) {
                    const indexedType = (<IndexType>type).type;
                    context.approximateLength += 6;
                    const indexTypeNode = typeToTypeNodeHelper(indexedType, context);
                    return factory.createTypeOperatorNode(SyntaxKind.KeyOfKeyword, indexTypeNode);
                }
                if (type.flags & TypeFlags.IndexedAccess) {
                    const objectTypeNode = typeToTypeNodeHelper((<IndexedAccessType>type).objectType, context);
                    const indexTypeNode = typeToTypeNodeHelper((<IndexedAccessType>type).indexType, context);
                    context.approximateLength += 2;
                    return factory.createIndexedAccessTypeNode(objectTypeNode, indexTypeNode);
                }
                if (type.flags & TypeFlags.Conditional) {
                    const checkTypeNode = typeToTypeNodeHelper((<ConditionalType>type).checkType, context);
                    const saveInferTypeParameters = context.inferTypeParameters;
                    context.inferTypeParameters = (<ConditionalType>type).root.inferTypeParameters;
                    const extendsTypeNode = typeToTypeNodeHelper((<ConditionalType>type).extendsType, context);
                    context.inferTypeParameters = saveInferTypeParameters;
                    const trueTypeNode = typeToTypeNodeOrCircularityElision(getTrueTypeFromConditionalType(<ConditionalType>type));
                    const falseTypeNode = typeToTypeNodeOrCircularityElision(getFalseTypeFromConditionalType(<ConditionalType>type));
                    context.approximateLength += 15;
                    return factory.createConditionalTypeNode(checkTypeNode, extendsTypeNode, trueTypeNode, falseTypeNode);
                }
                if (type.flags & TypeFlags.Substitution) {
                    return typeToTypeNodeHelper((<SubstitutionType>type).baseType, context);
                }

                return Debug.fail("Should be unreachable.");


                function typeToTypeNodeOrCircularityElision(type: Type) {
                    if (type.flags & TypeFlags.Union) {
                        if (context.visitedTypes?.has(getTypeId(type))) {
                            if (!(context.flags & NodeBuilderFlags.AllowAnonymousIdentifier)) {
                                context.encounteredError = true;
                                context.tracker?.reportCyclicStructureError?.();
                            }
                            return createElidedInformationPlaceholder(context);
                        }
                        return visitAndTransformType(type, type => typeToTypeNodeHelper(type, context));
                    }
                    return typeToTypeNodeHelper(type, context);
                }

                function createMappedTypeNodeFromType(type: MappedType) {
                    Debug.assert(!!(type.flags & TypeFlags.Object));
                    const readonlyToken = type.declaration.readonlyToken ? <ReadonlyToken | PlusToken | MinusToken>factory.createToken(type.declaration.readonlyToken.kind) : undefined;
                    const questionToken = type.declaration.questionToken ? <QuestionToken | PlusToken | MinusToken>factory.createToken(type.declaration.questionToken.kind) : undefined;
                    let appropriateConstraintTypeNode: TypeNode;
                    if (isMappedTypeWithKeyofConstraintDeclaration(type)) {
                        // We have a { [P in keyof T]: X }
                        // We do this to ensure we retain the toplevel keyof-ness of the type which may be lost due to keyof distribution during `getConstraintTypeFromMappedType`
                        appropriateConstraintTypeNode = factory.createTypeOperatorNode(SyntaxKind.KeyOfKeyword, typeToTypeNodeHelper(getModifiersTypeFromMappedType(type), context));
                    }
                    else {
                        appropriateConstraintTypeNode = typeToTypeNodeHelper(getConstraintTypeFromMappedType(type), context);
                    }
                    const typeParameterNode = typeParameterToDeclarationWithConstraint(getTypeParameterFromMappedType(type), context, appropriateConstraintTypeNode);
                    const templateTypeNode = typeToTypeNodeHelper(getTemplateTypeFromMappedType(type), context);
                    const mappedTypeNode = factory.createMappedTypeNode(readonlyToken, typeParameterNode, questionToken, templateTypeNode);
                    context.approximateLength += 10;
                    return setEmitFlags(mappedTypeNode, EmitFlags.SingleLine);
                }

                function createAnonymousTypeNode(type: ObjectType): TypeNode {
                    const typeId = type.id;
                    const symbol = type.symbol;
                    if (symbol) {
                        if (isJSConstructor(symbol.valueDeclaration)) {
                            // Instance and static types share the same symbol; only add 'typeof' for the static side.
                            const isInstanceType = type === getDeclaredTypeOfClassOrInterface(symbol) ? SymbolFlags.Type : SymbolFlags.Value;
                            return symbolToTypeNode(symbol, context, isInstanceType);
                        }
                        // Always use 'typeof T' for type of class, enum, and module objects
                        else if (symbol.flags & SymbolFlags.Class && !getBaseTypeVariableOfClass(symbol) && !(symbol.valueDeclaration.kind === SyntaxKind.ClassExpression && context.flags & NodeBuilderFlags.WriteClassExpressionAsTypeLiteral) ||
                            symbol.flags & (SymbolFlags.Enum | SymbolFlags.ValueModule) ||
                            shouldWriteTypeOfFunctionSymbol()) {
                            return symbolToTypeNode(symbol, context, SymbolFlags.Value);
                        }
                        else if (context.visitedTypes?.has(typeId)) {
                            // If type is an anonymous type literal in a type alias declaration, use type alias name
                            const typeAlias = getTypeAliasForTypeLiteral(type);
                            if (typeAlias) {
                                // The specified symbol flags need to be reinterpreted as type flags
                                return symbolToTypeNode(typeAlias, context, SymbolFlags.Type);
                            }
                            else {
                                return createElidedInformationPlaceholder(context);
                            }
                        }
                        else {
                            return visitAndTransformType(type, createTypeNodeFromObjectType);
                        }
                    }
                    else {
                        // Anonymous types without a symbol are never circular.
                        return createTypeNodeFromObjectType(type);
                    }
                    function shouldWriteTypeOfFunctionSymbol() {
                        const isStaticMethodSymbol = !!(symbol.flags & SymbolFlags.Method) &&  // typeof static method
                            some(symbol.declarations, declaration => hasSyntacticModifier(declaration, ModifierFlags.Static));
                        const isNonLocalFunctionSymbol = !!(symbol.flags & SymbolFlags.Function) &&
                            (symbol.parent || // is exported function symbol
                                forEach(symbol.declarations, declaration =>
                                    declaration.parent.kind === SyntaxKind.SourceFile || declaration.parent.kind === SyntaxKind.ModuleBlock));
                        if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                            // typeof is allowed only for static/non local functions
                            return (!!(context.flags & NodeBuilderFlags.UseTypeOfFunction) || (context.visitedTypes?.has(typeId))) && // it is type of the symbol uses itself recursively
                                (!(context.flags & NodeBuilderFlags.UseStructuralFallback) || isValueSymbolAccessible(symbol, context.enclosingDeclaration)); // And the build is going to succeed without visibility error or there is no structural fallback allowed
                        }
                    }
                }

                function visitAndTransformType<T>(type: Type, transform: (type: Type) => T) {
                    const typeId = type.id;
                    const isConstructorObject = getObjectFlags(type) & ObjectFlags.Anonymous && type.symbol && type.symbol.flags & SymbolFlags.Class;
                    const id = getObjectFlags(type) & ObjectFlags.Reference && (<TypeReference>type).node ? "N" + getNodeId((<TypeReference>type).node!) :
                        type.symbol ? (isConstructorObject ? "+" : "") + getSymbolId(type.symbol) :
                        undefined;
                    // Since instantiations of the same anonymous type have the same symbol, tracking symbols instead
                    // of types allows us to catch circular references to instantiations of the same anonymous type
                    if (!context.visitedTypes) {
                        context.visitedTypes = new Set();
                    }
                    if (id && !context.symbolDepth) {
                        context.symbolDepth = new Map();
                    }

                    let depth: number | undefined;
                    if (id) {
                        depth = context.symbolDepth!.get(id) || 0;
                        if (depth > 10) {
                            return createElidedInformationPlaceholder(context);
                        }
                        context.symbolDepth!.set(id, depth + 1);
                    }
                    context.visitedTypes.add(typeId);
                    const result = transform(type);
                    context.visitedTypes.delete(typeId);
                    if (id) {
                        context.symbolDepth!.set(id, depth!);
                    }
                    return result;
                }

                function createTypeNodeFromObjectType(type: ObjectType): TypeNode {
                    if (isGenericMappedType(type) || (type as MappedType).containsError) {
                        return createMappedTypeNodeFromType(type as MappedType);
                    }

                    const resolved = resolveStructuredTypeMembers(type);
                    if (!resolved.properties.length && !resolved.stringIndexInfo && !resolved.numberIndexInfo) {
                        if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                            context.approximateLength += 2;
                            return setEmitFlags(factory.createTypeLiteralNode(/*members*/ undefined), EmitFlags.SingleLine);
                        }

                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            const signature = resolved.callSignatures[0];
                            const signatureNode = <FunctionTypeNode>signatureToSignatureDeclarationHelper(signature, SyntaxKind.FunctionType, context);
                            return signatureNode;

                        }

                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            const signature = resolved.constructSignatures[0];
                            const signatureNode = <ConstructorTypeNode>signatureToSignatureDeclarationHelper(signature, SyntaxKind.ConstructorType, context);
                            return signatureNode;
                        }
                    }

                    const savedFlags = context.flags;
                    context.flags |= NodeBuilderFlags.InObjectTypeLiteral;
                    const members = createTypeNodesFromResolvedType(resolved);
                    context.flags = savedFlags;
                    const typeLiteralNode = factory.createTypeLiteralNode(members);
                    context.approximateLength += 2;
                    return setEmitFlags(typeLiteralNode, (context.flags & NodeBuilderFlags.MultilineObjectLiterals) ? 0 : EmitFlags.SingleLine);
                }

                function typeReferenceToTypeNode(type: TypeReference) {
                    const typeArguments: readonly Type[] = getTypeArguments(type);
                    if (type.target === globalArrayType || type.target === globalReadonlyArrayType) {
                        if (context.flags & NodeBuilderFlags.WriteArrayAsGenericType) {
                            const typeArgumentNode = typeToTypeNodeHelper(typeArguments[0], context);
                            return factory.createTypeReferenceNode(type.target === globalArrayType ? "Array" : "ReadonlyArray", [typeArgumentNode]);
                        }
                        const elementType = typeToTypeNodeHelper(typeArguments[0], context);
                        const arrayType = factory.createArrayTypeNode(elementType);
                        return type.target === globalArrayType ? arrayType : factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, arrayType);
                    }
                    else if (type.target.objectFlags & ObjectFlags.Tuple) {
                        if (typeArguments.length > 0) {
                            const arity = getTypeReferenceArity(type);
                            const tupleConstituentNodes = mapToTypeNodes(typeArguments.slice(0, arity), context);
                            if (tupleConstituentNodes) {
                                if ((type.target as TupleType).labeledElementDeclarations) {
                                    for (let i = 0; i < tupleConstituentNodes.length; i++) {
                                        const flags = (type.target as TupleType).elementFlags[i];
                                        tupleConstituentNodes[i] = factory.createNamedTupleMember(
                                            flags & ElementFlags.Variable ? factory.createToken(SyntaxKind.DotDotDotToken) : undefined,
                                            factory.createIdentifier(unescapeLeadingUnderscores(getTupleElementLabel((type.target as TupleType).labeledElementDeclarations![i]))),
                                            flags & ElementFlags.Optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                                            flags & ElementFlags.Rest ? factory.createArrayTypeNode(tupleConstituentNodes[i]) :
                                            tupleConstituentNodes[i]
                                        );
                                    }
                                }
                                else {
                                    for (let i = 0; i < Math.min(arity, tupleConstituentNodes.length); i++) {
                                        const flags = (type.target as TupleType).elementFlags[i];
                                        tupleConstituentNodes[i] =
                                            flags & ElementFlags.Variable ? factory.createRestTypeNode(flags & ElementFlags.Rest ? factory.createArrayTypeNode(tupleConstituentNodes[i]) : tupleConstituentNodes[i]) :
                                            flags & ElementFlags.Optional ? factory.createOptionalTypeNode(tupleConstituentNodes[i]) :
                                            tupleConstituentNodes[i];
                                    }
                                }
                                const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode(tupleConstituentNodes), EmitFlags.SingleLine);
                                return (<TupleType>type.target).readonly ? factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleTypeNode) : tupleTypeNode;
                            }
                        }
                        if (context.encounteredError || (context.flags & NodeBuilderFlags.AllowEmptyTuple)) {
                            const tupleTypeNode = setEmitFlags(factory.createTupleTypeNode([]), EmitFlags.SingleLine);
                            return (<TupleType>type.target).readonly ? factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleTypeNode) : tupleTypeNode;
                        }
                        context.encounteredError = true;
                        return undefined!; // TODO: GH#18217
                    }
                    else if (context.flags & NodeBuilderFlags.WriteClassExpressionAsTypeLiteral &&
                        type.symbol.valueDeclaration &&
                        isClassLike(type.symbol.valueDeclaration) &&
                        !isValueSymbolAccessible(type.symbol, context.enclosingDeclaration)
                    ) {
                        return createAnonymousTypeNode(type);
                    }
                    else {
                        const outerTypeParameters = type.target.outerTypeParameters;
                        let i = 0;
                        let resultType: TypeReferenceNode | ImportTypeNode | undefined;
                        if (outerTypeParameters) {
                            const length = outerTypeParameters.length;
                            while (i < length) {
                                // Find group of type arguments for type parameters with the same declaring container.
                                const start = i;
                                const parent = getParentSymbolOfTypeParameter(outerTypeParameters[i])!;
                                do {
                                    i++;
                                } while (i < length && getParentSymbolOfTypeParameter(outerTypeParameters[i]) === parent);
                                // When type parameters are their own type arguments for the whole group (i.e. we have
                                // the default outer type arguments), we don't show the group.
                                if (!rangeEquals(outerTypeParameters, typeArguments, start, i)) {
                                    const typeArgumentSlice = mapToTypeNodes(typeArguments.slice(start, i), context);
                                    const flags = context.flags;
                                    context.flags |= NodeBuilderFlags.ForbidIndexedAccessSymbolReferences;
                                    const ref = symbolToTypeNode(parent, context, SymbolFlags.Type, typeArgumentSlice) as TypeReferenceNode | ImportTypeNode;
                                    context.flags = flags;
                                    resultType = !resultType ? ref : appendReferenceToType(resultType, ref as TypeReferenceNode);
                                }
                            }
                        }
                        let typeArgumentNodes: readonly TypeNode[] | undefined;
                        if (typeArguments.length > 0) {
                            const typeParameterCount = (type.target.typeParameters || emptyArray).length;
                            typeArgumentNodes = mapToTypeNodes(typeArguments.slice(i, typeParameterCount), context);
                        }
                        const flags = context.flags;
                        context.flags |= NodeBuilderFlags.ForbidIndexedAccessSymbolReferences;
                        const finalRef = symbolToTypeNode(type.symbol, context, SymbolFlags.Type, typeArgumentNodes);
                        context.flags = flags;
                        return !resultType ? finalRef : appendReferenceToType(resultType, finalRef as TypeReferenceNode);
                    }
                }


                function appendReferenceToType(root: TypeReferenceNode | ImportTypeNode, ref: TypeReferenceNode): TypeReferenceNode | ImportTypeNode {
                    if (isImportTypeNode(root)) {
                        // first shift type arguments
                        let typeArguments = root.typeArguments;
                        let qualifier = root.qualifier;
                        if (qualifier) {
                            if (isIdentifier(qualifier)) {
                                qualifier = factory.updateIdentifier(qualifier, typeArguments);
                            }
                            else {
                                qualifier = factory.updateQualifiedName(qualifier,
                                    qualifier.left,
                                    factory.updateIdentifier(qualifier.right, typeArguments));
                            }
                        }
                        typeArguments = ref.typeArguments;
                        // then move qualifiers
                        const ids = getAccessStack(ref);
                        for (const id of ids) {
                            qualifier = qualifier ? factory.createQualifiedName(qualifier, id) : id;
                        }
                        return factory.updateImportTypeNode(
                            root,
                            root.argument,
                            qualifier,
                            typeArguments,
                            root.isTypeOf);
                    }
                    else {
                        // first shift type arguments
                        let typeArguments = root.typeArguments;
                        let typeName = root.typeName;
                        if (isIdentifier(typeName)) {
                            typeName = factory.updateIdentifier(typeName, typeArguments);
                        }
                        else {
                            typeName = factory.updateQualifiedName(typeName,
                                typeName.left,
                                factory.updateIdentifier(typeName.right, typeArguments));
                        }
                        typeArguments = ref.typeArguments;
                        // then move qualifiers
                        const ids = getAccessStack(ref);
                        for (const id of ids) {
                            typeName = factory.createQualifiedName(typeName, id);
                        }
                        return factory.updateTypeReferenceNode(
                            root,
                            typeName,
                            typeArguments);
                    }
                }

                function getAccessStack(ref: TypeReferenceNode): Identifier[] {
                    let state = ref.typeName;
                    const ids = [];
                    while (!isIdentifier(state)) {
                        ids.unshift(state.right);
                        state = state.left;
                    }
                    ids.unshift(state);
                    return ids;
                }

                function createTypeNodesFromResolvedType(resolvedType: ResolvedType): TypeElement[] | undefined {
                    if (checkTruncationLength(context)) {
                        return [factory.createPropertySignature(/*modifiers*/ undefined, "...", /*questionToken*/ undefined, /*type*/ undefined)];
                    }
                    const typeElements: TypeElement[] = [];
                    for (const signature of resolvedType.callSignatures) {
                        typeElements.push(<CallSignatureDeclaration>signatureToSignatureDeclarationHelper(signature, SyntaxKind.CallSignature, context));
                    }
                    for (const signature of resolvedType.constructSignatures) {
                        typeElements.push(<ConstructSignatureDeclaration>signatureToSignatureDeclarationHelper(signature, SyntaxKind.ConstructSignature, context));
                    }
                    if (resolvedType.stringIndexInfo) {
                        let indexSignature: IndexSignatureDeclaration;
                        if (resolvedType.objectFlags & ObjectFlags.ReverseMapped) {
                            indexSignature = indexInfoToIndexSignatureDeclarationHelper(
                                createIndexInfo(anyType, resolvedType.stringIndexInfo.isReadonly, resolvedType.stringIndexInfo.declaration),
                                IndexKind.String,
                                context,
                                createElidedInformationPlaceholder(context));
                        }
                        else {
                            indexSignature = indexInfoToIndexSignatureDeclarationHelper(resolvedType.stringIndexInfo, IndexKind.String, context, /*typeNode*/ undefined);
                        }
                        typeElements.push(indexSignature);
                    }
                    if (resolvedType.numberIndexInfo) {
                        typeElements.push(indexInfoToIndexSignatureDeclarationHelper(resolvedType.numberIndexInfo, IndexKind.Number, context, /*typeNode*/ undefined));
                    }

                    const properties = resolvedType.properties;
                    if (!properties) {
                        return typeElements;
                    }

                    let i = 0;
                    for (const propertySymbol of properties) {
                        i++;
                        if (context.flags & NodeBuilderFlags.WriteClassExpressionAsTypeLiteral) {
                            if (propertySymbol.flags & SymbolFlags.Prototype) {
                                continue;
                            }
                            if (getDeclarationModifierFlagsFromSymbol(propertySymbol) & (ModifierFlags.Private | ModifierFlags.Protected) && context.tracker.reportPrivateInBaseOfClassExpression) {
                                context.tracker.reportPrivateInBaseOfClassExpression(unescapeLeadingUnderscores(propertySymbol.escapedName));
                            }
                        }
                        if (checkTruncationLength(context) && (i + 2 < properties.length - 1)) {
                            typeElements.push(factory.createPropertySignature(/*modifiers*/ undefined, `... ${properties.length - i} more ...`, /*questionToken*/ undefined, /*type*/ undefined));
                            addPropertyToElementList(properties[properties.length - 1], context, typeElements);
                            break;
                        }
                        addPropertyToElementList(propertySymbol, context, typeElements);

                    }
                    return typeElements.length ? typeElements : undefined;
                }
            }

            function createElidedInformationPlaceholder(context: NodeBuilderContext) {
                context.approximateLength += 3;
                if (!(context.flags & NodeBuilderFlags.NoTruncation)) {
                    return factory.createTypeReferenceNode(factory.createIdentifier("..."), /*typeArguments*/ undefined);
                }
                return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }

            function addPropertyToElementList(propertySymbol: Symbol, context: NodeBuilderContext, typeElements: TypeElement[]) {
                const propertyIsReverseMapped = !!(getCheckFlags(propertySymbol) & CheckFlags.ReverseMapped);
                const propertyType = propertyIsReverseMapped && context.flags & NodeBuilderFlags.InReverseMappedType ?
                    anyType : getTypeOfSymbol(propertySymbol);
                const saveEnclosingDeclaration = context.enclosingDeclaration;
                context.enclosingDeclaration = undefined;
                if (context.tracker.trackSymbol && getCheckFlags(propertySymbol) & CheckFlags.Late) {
                    const decl = first(propertySymbol.declarations);
                    if (hasLateBindableName(decl)) {
                        if (isBinaryExpression(decl)) {
                            const name = getNameOfDeclaration(decl);
                            if (name && isElementAccessExpression(name) && isPropertyAccessEntityNameExpression(name.argumentExpression)) {
                                trackComputedName(name.argumentExpression, saveEnclosingDeclaration, context);
                            }
                        }
                        else {
                            trackComputedName(decl.name.expression, saveEnclosingDeclaration, context);
                        }
                    }
                }
                context.enclosingDeclaration = saveEnclosingDeclaration;
                const propertyName = getPropertyNameNodeForSymbol(propertySymbol, context);
                context.approximateLength += (symbolName(propertySymbol).length + 1);
                const optionalToken = propertySymbol.flags & SymbolFlags.Optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined;
                if (propertySymbol.flags & (SymbolFlags.Function | SymbolFlags.Method) && !getPropertiesOfObjectType(propertyType).length && !isReadonlySymbol(propertySymbol)) {
                    const signatures = getSignaturesOfType(filterType(propertyType, t => !(t.flags & TypeFlags.Undefined)), SignatureKind.Call);
                    for (const signature of signatures) {
                        const methodDeclaration = <MethodSignature>signatureToSignatureDeclarationHelper(signature, SyntaxKind.MethodSignature, context, { name: propertyName, questionToken: optionalToken });
                        typeElements.push(preserveCommentsOn(methodDeclaration));
                    }
                }
                else {
                    const savedFlags = context.flags;
                    context.flags |= propertyIsReverseMapped ? NodeBuilderFlags.InReverseMappedType : 0;
                    let propertyTypeNode: TypeNode;
                    if (propertyIsReverseMapped && !!(savedFlags & NodeBuilderFlags.InReverseMappedType)) {
                        propertyTypeNode = createElidedInformationPlaceholder(context);
                    }
                    else {
                        propertyTypeNode = propertyType ? serializeTypeForDeclaration(context, propertyType, propertySymbol, saveEnclosingDeclaration) : factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                    }
                    context.flags = savedFlags;

                    const modifiers = isReadonlySymbol(propertySymbol) ? [factory.createToken(SyntaxKind.ReadonlyKeyword)] : undefined;
                    if (modifiers) {
                        context.approximateLength += 9;
                    }
                    const propertySignature = factory.createPropertySignature(
                        modifiers,
                        propertyName,
                        optionalToken,
                        propertyTypeNode);

                    typeElements.push(preserveCommentsOn(propertySignature));
                }

                function preserveCommentsOn<T extends Node>(node: T) {
                    if (some(propertySymbol.declarations, d => d.kind === SyntaxKind.JSDocPropertyTag)) {
                        const d = find(propertySymbol.declarations, d => d.kind === SyntaxKind.JSDocPropertyTag)! as JSDocPropertyTag;
                        const commentText = d.comment;
                        if (commentText) {
                            setSyntheticLeadingComments(node, [{ kind: SyntaxKind.MultiLineCommentTrivia, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]);
                        }
                    }
                    else if (propertySymbol.valueDeclaration) {
                        // Copy comments to node for declaration emit
                        setCommentRange(node, propertySymbol.valueDeclaration);
                    }
                    return node;
                }
            }

            function mapToTypeNodes(types: readonly Type[] | undefined, context: NodeBuilderContext, isBareList?: boolean): TypeNode[] | undefined {
                if (some(types)) {
                    if (checkTruncationLength(context)) {
                        if (!isBareList) {
                            return [factory.createTypeReferenceNode("...", /*typeArguments*/ undefined)];
                        }
                        else if (types.length > 2) {
                            return [
                                typeToTypeNodeHelper(types[0], context),
                                factory.createTypeReferenceNode(`... ${types.length - 2} more ...`, /*typeArguments*/ undefined),
                                typeToTypeNodeHelper(types[types.length - 1], context)
                            ];
                        }
                    }
                    const mayHaveNameCollisions = !(context.flags & NodeBuilderFlags.UseFullyQualifiedType);
                    /** Map from type reference identifier text to [type, index in `result` where the type node is] */
                    const seenNames = mayHaveNameCollisions ? createUnderscoreEscapedMultiMap<[Type, number]>() : undefined;
                    const result: TypeNode[] = [];
                    let i = 0;
                    for (const type of types) {
                        i++;
                        if (checkTruncationLength(context) && (i + 2 < types.length - 1)) {
                            result.push(factory.createTypeReferenceNode(`... ${types.length - i} more ...`, /*typeArguments*/ undefined));
                            const typeNode = typeToTypeNodeHelper(types[types.length - 1], context);
                            if (typeNode) {
                                result.push(typeNode);
                            }
                            break;
                        }
                        context.approximateLength += 2; // Account for whitespace + separator
                        const typeNode = typeToTypeNodeHelper(type, context);
                        if (typeNode) {
                            result.push(typeNode);
                            if (seenNames && isIdentifierTypeReference(typeNode)) {
                                seenNames.add(typeNode.typeName.escapedText, [type, result.length - 1]);
                            }
                        }
                    }

                    if (seenNames) {
                        // To avoid printing types like `[Foo, Foo]` or `Bar & Bar` where
                        // occurrences of the same name actually come from different
                        // namespaces, go through the single-identifier type reference nodes
                        // we just generated, and see if any names were generated more than
                        // once while referring to different types. If so, regenerate the
                        // type node for each entry by that name with the
                        // `UseFullyQualifiedType` flag enabled.
                        const saveContextFlags = context.flags;
                        context.flags |= NodeBuilderFlags.UseFullyQualifiedType;
                        seenNames.forEach(types => {
                            if (!arrayIsHomogeneous(types, ([a], [b]) => typesAreSameReference(a, b))) {
                                for (const [type, resultIndex] of types) {
                                    result[resultIndex] = typeToTypeNodeHelper(type, context);
                                }
                            }
                        });
                        context.flags = saveContextFlags;
                    }

                    return result;
                }
            }

            function typesAreSameReference(a: Type, b: Type): boolean {
                return a === b
                    || !!a.symbol && a.symbol === b.symbol
                    || !!a.aliasSymbol && a.aliasSymbol === b.aliasSymbol;
            }

            function indexInfoToIndexSignatureDeclarationHelper(indexInfo: IndexInfo, kind: IndexKind, context: NodeBuilderContext, typeNode: TypeNode | undefined): IndexSignatureDeclaration {
                const name = getNameFromIndexInfo(indexInfo) || "x";
                const indexerTypeNode = factory.createKeywordTypeNode(kind === IndexKind.String ? SyntaxKind.StringKeyword : SyntaxKind.NumberKeyword);

                const indexingParameter = factory.createParameterDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    name,
                    /*questionToken*/ undefined,
                    indexerTypeNode,
                    /*initializer*/ undefined);
                if (!typeNode) {
                    typeNode = typeToTypeNodeHelper(indexInfo.type || anyType, context);
                }
                if (!indexInfo.type && !(context.flags & NodeBuilderFlags.AllowEmptyIndexInfoType)) {
                    context.encounteredError = true;
                }
                context.approximateLength += (name.length + 4);
                return factory.createIndexSignature(
                    /*decorators*/ undefined,
                    indexInfo.isReadonly ? [factory.createToken(SyntaxKind.ReadonlyKeyword)] : undefined,
                    [indexingParameter],
                    typeNode);
            }

            interface SignatureToSignatureDeclarationOptions {
                modifiers?: readonly Modifier[];
                name?: PropertyName;
                questionToken?: QuestionToken;
                privateSymbolVisitor?: (s: Symbol) => void;
                bundledImports?: boolean;
            }

            function signatureToSignatureDeclarationHelper(signature: Signature, kind: SignatureDeclaration["kind"], context: NodeBuilderContext, options?: SignatureToSignatureDeclarationOptions): SignatureDeclaration {
                const suppressAny = context.flags & NodeBuilderFlags.SuppressAnyReturnType;
                if (suppressAny) context.flags &= ~NodeBuilderFlags.SuppressAnyReturnType; // suppress only toplevel `any`s
                let typeParameters: TypeParameterDeclaration[] | undefined;
                let typeArguments: TypeNode[] | undefined;
                if (context.flags & NodeBuilderFlags.WriteTypeArgumentsOfSignature && signature.target && signature.mapper && signature.target.typeParameters) {
                    typeArguments = signature.target.typeParameters.map(parameter => typeToTypeNodeHelper(instantiateType(parameter, signature.mapper), context));
                }
                else {
                    typeParameters = signature.typeParameters && signature.typeParameters.map(parameter => typeParameterToDeclaration(parameter, context));
                }

                const parameters = getExpandedParameters(signature, /*skipUnionExpanding*/ true)[0].map(parameter => symbolToParameterDeclaration(parameter, context, kind === SyntaxKind.Constructor, options?.privateSymbolVisitor, options?.bundledImports));
                if (signature.thisParameter) {
                    const thisParameter = symbolToParameterDeclaration(signature.thisParameter, context);
                    parameters.unshift(thisParameter);
                }

                let returnTypeNode: TypeNode | undefined;
                const typePredicate = getTypePredicateOfSignature(signature);
                if (typePredicate) {
                    const assertsModifier = typePredicate.kind === TypePredicateKind.AssertsThis || typePredicate.kind === TypePredicateKind.AssertsIdentifier ?
                        factory.createToken(SyntaxKind.AssertsKeyword) :
                        undefined;
                    const parameterName = typePredicate.kind === TypePredicateKind.Identifier || typePredicate.kind === TypePredicateKind.AssertsIdentifier ?
                        setEmitFlags(factory.createIdentifier(typePredicate.parameterName), EmitFlags.NoAsciiEscaping) :
                        factory.createThisTypeNode();
                    const typeNode = typePredicate.type && typeToTypeNodeHelper(typePredicate.type, context);
                    returnTypeNode = factory.createTypePredicateNode(assertsModifier, parameterName, typeNode);
                }
                else {
                    const returnType = getReturnTypeOfSignature(signature);
                    if (returnType && !(suppressAny && isTypeAny(returnType))) {
                        returnTypeNode = serializeReturnTypeForSignature(context, returnType, signature, options?.privateSymbolVisitor, options?.bundledImports);
                    }
                    else if (!suppressAny) {
                        returnTypeNode = factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                    }
                }
                context.approximateLength += 3; // Usually a signature contributes a few more characters than this, but 3 is the minimum

                const node =
                    kind === SyntaxKind.CallSignature ? factory.createCallSignature(typeParameters, parameters, returnTypeNode) :
                    kind === SyntaxKind.ConstructSignature ? factory.createConstructSignature(typeParameters, parameters, returnTypeNode) :
                    kind === SyntaxKind.MethodSignature ? factory.createMethodSignature(options?.modifiers, options?.name ?? factory.createIdentifier(""), options?.questionToken, typeParameters, parameters, returnTypeNode) :
                    kind === SyntaxKind.MethodDeclaration ? factory.createMethodDeclaration(/*decorators*/ undefined, options?.modifiers, /*asteriskToken*/ undefined, options?.name ?? factory.createIdentifier(""), /*questionToken*/ undefined, typeParameters, parameters, returnTypeNode, /*body*/ undefined) :
                    kind === SyntaxKind.Constructor ? factory.createConstructorDeclaration(/*decorators*/ undefined, options?.modifiers, parameters, /*body*/ undefined) :
                    kind === SyntaxKind.GetAccessor ? factory.createGetAccessorDeclaration(/*decorators*/ undefined, options?.modifiers, options?.name ?? factory.createIdentifier(""), parameters, returnTypeNode, /*body*/ undefined) :
                    kind === SyntaxKind.SetAccessor ? factory.createSetAccessorDeclaration(/*decorators*/ undefined, options?.modifiers, options?.name ?? factory.createIdentifier(""), parameters, /*body*/ undefined) :
                    kind === SyntaxKind.IndexSignature ? factory.createIndexSignature(/*decorators*/ undefined, options?.modifiers, parameters, returnTypeNode) :
                    kind === SyntaxKind.JSDocFunctionType ? factory.createJSDocFunctionType(parameters, returnTypeNode) :
                    kind === SyntaxKind.FunctionType ? factory.createFunctionTypeNode(typeParameters, parameters, returnTypeNode ?? factory.createTypeReferenceNode(factory.createIdentifier(""))) :
                    kind === SyntaxKind.ConstructorType ? factory.createConstructorTypeNode(typeParameters, parameters, returnTypeNode ?? factory.createTypeReferenceNode(factory.createIdentifier(""))) :
                    kind === SyntaxKind.FunctionDeclaration ? factory.createFunctionDeclaration(/*decorators*/ undefined, options?.modifiers, /*asteriskToken*/ undefined, options?.name ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, /*body*/ undefined) :
                    kind === SyntaxKind.FunctionExpression ? factory.createFunctionExpression(options?.modifiers, /*asteriskToken*/ undefined, options?.name ? cast(options.name, isIdentifier) : factory.createIdentifier(""), typeParameters, parameters, returnTypeNode, factory.createBlock([])) :
                    kind === SyntaxKind.ArrowFunction ? factory.createArrowFunction(options?.modifiers, typeParameters, parameters, returnTypeNode, /*equalsGreaterThanToken*/ undefined, factory.createBlock([])) :
                    Debug.assertNever(kind);

                if (typeArguments) {
                    node.typeArguments = factory.createNodeArray(typeArguments);
                }

                return node;
            }

            function typeParameterToDeclarationWithConstraint(type: TypeParameter, context: NodeBuilderContext, constraintNode: TypeNode | undefined): TypeParameterDeclaration {
                const savedContextFlags = context.flags;
                context.flags &= ~NodeBuilderFlags.WriteTypeParametersInQualifiedName; // Avoids potential infinite loop when building for a claimspace with a generic
                const name = typeParameterToName(type, context);
                const defaultParameter = getDefaultFromTypeParameter(type);
                const defaultParameterNode = defaultParameter && typeToTypeNodeHelper(defaultParameter, context);
                context.flags = savedContextFlags;
                return factory.createTypeParameterDeclaration(name, constraintNode, defaultParameterNode);
            }

            function typeParameterToDeclaration(type: TypeParameter, context: NodeBuilderContext, constraint = getConstraintOfTypeParameter(type)): TypeParameterDeclaration {
                const constraintNode = constraint && typeToTypeNodeHelper(constraint, context);
                return typeParameterToDeclarationWithConstraint(type, context, constraintNode);
            }

            function symbolToParameterDeclaration(parameterSymbol: Symbol, context: NodeBuilderContext, preserveModifierFlags?: boolean, privateSymbolVisitor?: (s: Symbol) => void, bundledImports?: boolean): ParameterDeclaration {
                let parameterDeclaration: ParameterDeclaration | JSDocParameterTag | undefined = getDeclarationOfKind<ParameterDeclaration>(parameterSymbol, SyntaxKind.Parameter);
                if (!parameterDeclaration && !isTransientSymbol(parameterSymbol)) {
                    parameterDeclaration = getDeclarationOfKind<JSDocParameterTag>(parameterSymbol, SyntaxKind.JSDocParameterTag);
                }

                let parameterType = getTypeOfSymbol(parameterSymbol);
                if (parameterDeclaration && isRequiredInitializedParameter(parameterDeclaration)) {
                    parameterType = getOptionalType(parameterType);
                }
                if ((context.flags & NodeBuilderFlags.NoUndefinedOptionalParameterType) && parameterDeclaration && !isJSDocParameterTag(parameterDeclaration) && isOptionalUninitializedParameter(parameterDeclaration)) {
                    parameterType = getTypeWithFacts(parameterType, TypeFacts.NEUndefined);
                }
                const parameterTypeNode = serializeTypeForDeclaration(context, parameterType, parameterSymbol, context.enclosingDeclaration, privateSymbolVisitor, bundledImports);

                const modifiers = !(context.flags & NodeBuilderFlags.OmitParameterModifiers) && preserveModifierFlags && parameterDeclaration && parameterDeclaration.modifiers ? parameterDeclaration.modifiers.map(factory.cloneNode) : undefined;
                const isRest = parameterDeclaration && isRestParameter(parameterDeclaration) || getCheckFlags(parameterSymbol) & CheckFlags.RestParameter;
                const dotDotDotToken = isRest ? factory.createToken(SyntaxKind.DotDotDotToken) : undefined;
                const name = parameterDeclaration ? parameterDeclaration.name ?
                    parameterDeclaration.name.kind === SyntaxKind.Identifier ? setEmitFlags(factory.cloneNode(parameterDeclaration.name), EmitFlags.NoAsciiEscaping) :
                    parameterDeclaration.name.kind === SyntaxKind.QualifiedName ? setEmitFlags(factory.cloneNode(parameterDeclaration.name.right), EmitFlags.NoAsciiEscaping) :
                    cloneBindingName(parameterDeclaration.name) :
                    symbolName(parameterSymbol) :
                    symbolName(parameterSymbol);
                const isOptional = parameterDeclaration && isOptionalParameter(parameterDeclaration) || getCheckFlags(parameterSymbol) & CheckFlags.OptionalParameter;
                const questionToken = isOptional ? factory.createToken(SyntaxKind.QuestionToken) : undefined;
                const parameterNode = factory.createParameterDeclaration(
                    /*decorators*/ undefined,
                    modifiers,
                    dotDotDotToken,
                    name,
                    questionToken,
                    parameterTypeNode,
                    /*initializer*/ undefined);
                context.approximateLength += symbolName(parameterSymbol).length + 3;
                return parameterNode;

                function cloneBindingName(node: BindingName): BindingName {
                    return <BindingName>elideInitializerAndSetEmitFlags(node);
                    function elideInitializerAndSetEmitFlags(node: Node): Node {
                        if (context.tracker.trackSymbol && isComputedPropertyName(node) && isLateBindableName(node)) {
                            trackComputedName(node.expression, context.enclosingDeclaration, context);
                        }
                        let visited = visitEachChild(node, elideInitializerAndSetEmitFlags, nullTransformationContext, /*nodesVisitor*/ undefined, elideInitializerAndSetEmitFlags)!;
                        if (isBindingElement(visited)) {
                            visited = factory.updateBindingElement(
                                visited,
                                visited.dotDotDotToken,
                                visited.propertyName,
                                visited.name,
                                /*initializer*/ undefined);
                        }
                        if (!nodeIsSynthesized(visited)) {
                            visited = factory.cloneNode(visited);
                        }
                        return setEmitFlags(visited, EmitFlags.SingleLine | EmitFlags.NoAsciiEscaping);
                    }
                }
            }

            function trackComputedName(accessExpression: EntityNameOrEntityNameExpression, enclosingDeclaration: Node | undefined, context: NodeBuilderContext) {
                if (!context.tracker.trackSymbol) return;
                // get symbol of the first identifier of the entityName
                const firstIdentifier = getFirstIdentifier(accessExpression);
                const name = resolveName(firstIdentifier, firstIdentifier.escapedText, SymbolFlags.Value | SymbolFlags.ExportValue, /*nodeNotFoundErrorMessage*/ undefined, /*nameArg*/ undefined, /*isUse*/ true);
                if (name) {
                    context.tracker.trackSymbol(name, enclosingDeclaration, SymbolFlags.Value);
                }
            }

            function lookupSymbolChain(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags, yieldModuleSymbol?: boolean) {
                context.tracker.trackSymbol!(symbol, context.enclosingDeclaration, meaning); // TODO: GH#18217
                return lookupSymbolChainWorker(symbol, context, meaning, yieldModuleSymbol);
            }

            function lookupSymbolChainWorker(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags, yieldModuleSymbol?: boolean) {
                // Try to get qualified name if the symbol is not a type parameter and there is an enclosing declaration.
                let chain: Symbol[];
                const isTypeParameter = symbol.flags & SymbolFlags.TypeParameter;
                if (!isTypeParameter && (context.enclosingDeclaration || context.flags & NodeBuilderFlags.UseFullyQualifiedType) && !(context.flags & NodeBuilderFlags.DoNotIncludeSymbolChain)) {
                    chain = Debug.checkDefined(getSymbolChain(symbol, meaning, /*endOfChain*/ true));
                    Debug.assert(chain && chain.length > 0);
                }
                else {
                    chain = [symbol];
                }
                return chain;

                /** @param endOfChain Set to false for recursive calls; non-recursive calls should always output something. */
                function getSymbolChain(symbol: Symbol, meaning: SymbolFlags, endOfChain: boolean): Symbol[] | undefined {
                    let accessibleSymbolChain = getAccessibleSymbolChain(symbol, context.enclosingDeclaration, meaning, !!(context.flags & NodeBuilderFlags.UseOnlyExternalAliasing));
                    let parentSpecifiers: (string | undefined)[];
                    if (!accessibleSymbolChain ||
                        needsQualification(accessibleSymbolChain[0], context.enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {

                        // Go up and add our parent.
                        const parents = getContainersOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol, context.enclosingDeclaration, meaning);
                        if (length(parents)) {
                            parentSpecifiers = parents!.map(symbol =>
                                some(symbol.declarations, hasNonGlobalAugmentationExternalModuleSymbol)
                                    ? getSpecifierForModuleSymbol(symbol, context)
                                    : undefined);
                            const indices = parents!.map((_, i) => i);
                            indices.sort(sortByBestName);
                            const sortedParents = indices.map(i => parents![i]);
                            for (const parent of sortedParents) {
                                const parentChain = getSymbolChain(parent, getQualifiedLeftMeaning(meaning), /*endOfChain*/ false);
                                if (parentChain) {
                                    if (parent.exports && parent.exports.get(InternalSymbolName.ExportEquals) &&
                                        getSymbolIfSameReference(parent.exports.get(InternalSymbolName.ExportEquals)!, symbol)) {
                                        // parentChain root _is_ symbol - symbol is a module export=, so it kinda looks like it's own parent
                                        // No need to lookup an alias for the symbol in itself
                                        accessibleSymbolChain = parentChain;
                                        break;
                                    }
                                    accessibleSymbolChain = parentChain.concat(accessibleSymbolChain || [getAliasForSymbolInContainer(parent, symbol) || symbol]);
                                    break;
                                }
                            }
                        }
                    }

                    if (accessibleSymbolChain) {
                        return accessibleSymbolChain;
                    }
                    if (
                        // If this is the last part of outputting the symbol, always output. The cases apply only to parent symbols.
                        endOfChain ||
                        // If a parent symbol is an anonymous type, don't write it.
                        !(symbol.flags & (SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral))) {
                        // If a parent symbol is an external module, don't write it. (We prefer just `x` vs `"foo/bar".x`.)
                        if (!endOfChain && !yieldModuleSymbol && !!forEach(symbol.declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                            return;
                        }
                        return [symbol];
                    }

                    function sortByBestName(a: number, b: number) {
                        const specifierA = parentSpecifiers[a];
                        const specifierB = parentSpecifiers[b];
                        if (specifierA && specifierB) {
                            const isBRelative = pathIsRelative(specifierB);
                            if (pathIsRelative(specifierA) === isBRelative) {
                                // Both relative or both non-relative, sort by number of parts
                                return moduleSpecifiers.countPathComponents(specifierA) - moduleSpecifiers.countPathComponents(specifierB);
                            }
                            if (isBRelative) {
                                // A is non-relative, B is relative: prefer A
                                return -1;
                            }
                            // A is relative, B is non-relative: prefer B
                            return 1;
                        }
                        return 0;
                    }
                }
            }

            function typeParametersToTypeParameterDeclarations(symbol: Symbol, context: NodeBuilderContext) {
                let typeParameterNodes: NodeArray<TypeParameterDeclaration> | undefined;
                const targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & (SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeAlias)) {
                    typeParameterNodes = factory.createNodeArray(map(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol), tp => typeParameterToDeclaration(tp, context)));
                }
                return typeParameterNodes;
            }

            function lookupTypeParameterNodes(chain: Symbol[], index: number, context: NodeBuilderContext) {
                Debug.assert(chain && 0 <= index && index < chain.length);
                const symbol = chain[index];
                const symbolId = getSymbolId(symbol);
                if (context.typeParameterSymbolList?.has(symbolId)) {
                    return undefined;
                }
                (context.typeParameterSymbolList || (context.typeParameterSymbolList = new Set())).add(symbolId);
                let typeParameterNodes: readonly TypeNode[] | readonly TypeParameterDeclaration[] | undefined;
                if (context.flags & NodeBuilderFlags.WriteTypeParametersInQualifiedName && index < (chain.length - 1)) {
                    const parentSymbol = symbol;
                    const nextSymbol = chain[index + 1];
                    if (getCheckFlags(nextSymbol) & CheckFlags.Instantiated) {
                        const params = getTypeParametersOfClassOrInterface(
                            parentSymbol.flags & SymbolFlags.Alias ? resolveAlias(parentSymbol) : parentSymbol
                        );
                        typeParameterNodes = mapToTypeNodes(map(params, t => getMappedType(t, (nextSymbol as TransientSymbol).mapper!)), context);
                    }
                    else {
                        typeParameterNodes = typeParametersToTypeParameterDeclarations(symbol, context);
                    }
                }
                return typeParameterNodes;
            }

            /**
             * Given A[B][C][D], finds A[B]
             */
            function getTopmostIndexedAccessType(top: IndexedAccessTypeNode): IndexedAccessTypeNode {
                if (isIndexedAccessTypeNode(top.objectType)) {
                    return getTopmostIndexedAccessType(top.objectType);
                }
                return top;
            }

            function getSpecifierForModuleSymbol(symbol: Symbol, context: NodeBuilderContext) {
                let file = getDeclarationOfKind<SourceFile>(symbol, SyntaxKind.SourceFile);
                if (!file) {
                    const equivalentFileSymbol = firstDefined(symbol.declarations, d => getFileSymbolIfFileSymbolExportEqualsContainer(d, symbol));
                    if (equivalentFileSymbol) {
                        file = getDeclarationOfKind<SourceFile>(equivalentFileSymbol, SyntaxKind.SourceFile);
                    }
                }
                if (file && file.moduleName !== undefined) {
                    // Use the amd name if it is available
                    return file.moduleName;
                }
                if (!file) {
                    if (context.tracker.trackReferencedAmbientModule) {
                        const ambientDecls = filter(symbol.declarations, isAmbientModule);
                        if (length(ambientDecls)) {
                            for (const decl of ambientDecls) {
                                context.tracker.trackReferencedAmbientModule(decl, symbol);
                            }
                        }
                    }
                    if (ambientModuleSymbolRegex.test(symbol.escapedName as string)) {
                        return (symbol.escapedName as string).substring(1, (symbol.escapedName as string).length - 1);
                    }
                }
                if (!context.enclosingDeclaration || !context.tracker.moduleResolverHost) {
                    // If there's no context declaration, we can't lookup a non-ambient specifier, so we just use the symbol name
                    if (ambientModuleSymbolRegex.test(symbol.escapedName as string)) {
                        return (symbol.escapedName as string).substring(1, (symbol.escapedName as string).length - 1);
                    }
                    return getSourceFileOfNode(getNonAugmentationDeclaration(symbol)!).fileName; // A resolver may not be provided for baselines and errors - in those cases we use the fileName in full
                }
                const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                const links = getSymbolLinks(symbol);
                let specifier = links.specifierCache && links.specifierCache.get(contextFile.path);
                if (!specifier) {
                    const isBundle = !!outFile(compilerOptions);
                    // For declaration bundles, we need to generate absolute paths relative to the common source dir for imports,
                    // just like how the declaration emitter does for the ambient module declarations - we can easily accomplish this
                    // using the `baseUrl` compiler option (which we would otherwise never use in declaration emit) and a non-relative
                    // specifier preference
                    const { moduleResolverHost } = context.tracker;
                    const specifierCompilerOptions = isBundle ? { ...compilerOptions, baseUrl: moduleResolverHost.getCommonSourceDirectory() } : compilerOptions;
                    specifier = first(moduleSpecifiers.getModuleSpecifiers(
                        symbol,
                        specifierCompilerOptions,
                        contextFile,
                        moduleResolverHost,
                        { importModuleSpecifierPreference: isBundle ? "non-relative" : "relative" },
                    ));
                    links.specifierCache ??= new Map();
                    links.specifierCache.set(contextFile.path, specifier);
                }
                return specifier;
            }

            function symbolToTypeNode(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags, overrideTypeArguments?: readonly TypeNode[]): TypeNode {
                const chain = lookupSymbolChain(symbol, context, meaning, !(context.flags & NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope)); // If we're using aliases outside the current scope, dont bother with the module

                const isTypeOf = meaning === SymbolFlags.Value;
                if (some(chain[0].declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                    // module is root, must use `ImportTypeNode`
                    const nonRootParts = chain.length > 1 ? createAccessFromSymbolChain(chain, chain.length - 1, 1) : undefined;
                    const typeParameterNodes = overrideTypeArguments || lookupTypeParameterNodes(chain, 0, context);
                    const specifier = getSpecifierForModuleSymbol(chain[0], context);
                    if (!(context.flags & NodeBuilderFlags.AllowNodeModulesRelativePaths) && getEmitModuleResolutionKind(compilerOptions) === ModuleResolutionKind.NodeJs && specifier.indexOf("/node_modules/") >= 0) {
                        // If ultimately we can only name the symbol with a reference that dives into a `node_modules` folder, we should error
                        // since declaration files with these kinds of references are liable to fail when published :(
                        context.encounteredError = true;
                        if (context.tracker.reportLikelyUnsafeImportRequiredError) {
                            context.tracker.reportLikelyUnsafeImportRequiredError(specifier);
                        }
                    }
                    const lit = factory.createLiteralTypeNode(factory.createStringLiteral(specifier));
                    if (context.tracker.trackExternalModuleSymbolOfImportTypeNode) context.tracker.trackExternalModuleSymbolOfImportTypeNode(chain[0]);
                    context.approximateLength += specifier.length + 10; // specifier + import("")
                    if (!nonRootParts || isEntityName(nonRootParts)) {
                        if (nonRootParts) {
                            const lastId = isIdentifier(nonRootParts) ? nonRootParts : nonRootParts.right;
                            lastId.typeArguments = undefined;
                        }
                        return factory.createImportTypeNode(lit, nonRootParts as EntityName, typeParameterNodes as readonly TypeNode[], isTypeOf);
                    }
                    else {
                        const splitNode = getTopmostIndexedAccessType(nonRootParts);
                        const qualifier = (splitNode.objectType as TypeReferenceNode).typeName;
                        return factory.createIndexedAccessTypeNode(factory.createImportTypeNode(lit, qualifier, typeParameterNodes as readonly TypeNode[], isTypeOf), splitNode.indexType);
                    }
                }

                const entityName = createAccessFromSymbolChain(chain, chain.length - 1, 0);
                if (isIndexedAccessTypeNode(entityName)) {
                    return entityName; // Indexed accesses can never be `typeof`
                }
                if (isTypeOf) {
                    return factory.createTypeQueryNode(entityName);
                }
                else {
                    const lastId = isIdentifier(entityName) ? entityName : entityName.right;
                    const lastTypeArgs = lastId.typeArguments;
                    lastId.typeArguments = undefined;
                    return factory.createTypeReferenceNode(entityName, lastTypeArgs as NodeArray<TypeNode>);
                }

                function createAccessFromSymbolChain(chain: Symbol[], index: number, stopper: number): EntityName | IndexedAccessTypeNode {
                    const typeParameterNodes = index === (chain.length - 1) ? overrideTypeArguments : lookupTypeParameterNodes(chain, index, context);
                    const symbol = chain[index];

                    const parent = chain[index - 1];
                    let symbolName: string | undefined;
                    if (index === 0) {
                        context.flags |= NodeBuilderFlags.InInitialEntityName;
                        symbolName = getNameOfSymbolAsWritten(symbol, context);
                        context.approximateLength += (symbolName ? symbolName.length : 0) + 1;
                        context.flags ^= NodeBuilderFlags.InInitialEntityName;
                    }
                    else {
                        if (parent && getExportsOfSymbol(parent)) {
                            const exports = getExportsOfSymbol(parent);
                            forEachEntry(exports, (ex, name) => {
                                if (getSymbolIfSameReference(ex, symbol) && !isLateBoundName(name) && name !== InternalSymbolName.ExportEquals) {
                                    symbolName = unescapeLeadingUnderscores(name);
                                    return true;
                                }
                            });
                        }
                    }
                    if (!symbolName) {
                        symbolName = getNameOfSymbolAsWritten(symbol, context);
                    }
                    context.approximateLength += symbolName.length + 1;

                    if (!(context.flags & NodeBuilderFlags.ForbidIndexedAccessSymbolReferences) && parent &&
                        getMembersOfSymbol(parent) && getMembersOfSymbol(parent).get(symbol.escapedName) &&
                        getSymbolIfSameReference(getMembersOfSymbol(parent).get(symbol.escapedName)!, symbol)) {
                        // Should use an indexed access
                        const LHS = createAccessFromSymbolChain(chain, index - 1, stopper);
                        if (isIndexedAccessTypeNode(LHS)) {
                            return factory.createIndexedAccessTypeNode(LHS, factory.createLiteralTypeNode(factory.createStringLiteral(symbolName)));
                        }
                        else {
                            return factory.createIndexedAccessTypeNode(factory.createTypeReferenceNode(LHS, typeParameterNodes as readonly TypeNode[]), factory.createLiteralTypeNode(factory.createStringLiteral(symbolName)));
                        }
                    }

                    const identifier = setEmitFlags(factory.createIdentifier(symbolName, typeParameterNodes), EmitFlags.NoAsciiEscaping);
                    identifier.symbol = symbol;

                    if (index > stopper) {
                        const LHS = createAccessFromSymbolChain(chain, index - 1, stopper);
                        if (!isEntityName(LHS)) {
                            return Debug.fail("Impossible construct - an export of an indexed access cannot be reachable");
                        }
                        return factory.createQualifiedName(LHS, identifier);
                    }
                    return identifier;
                }
            }

            function typeParameterShadowsNameInScope(escapedName: __String, context: NodeBuilderContext, type: TypeParameter) {
                const result = resolveName(context.enclosingDeclaration, escapedName, SymbolFlags.Type, /*nameNotFoundArg*/ undefined, escapedName, /*isUse*/ false);
                if (result) {
                    if (result.flags & SymbolFlags.TypeParameter && result === type.symbol) {
                        return false;
                    }
                    return true;
                }
                return false;
            }

            function typeParameterToName(type: TypeParameter, context: NodeBuilderContext) {
                if (context.flags & NodeBuilderFlags.GenerateNamesForShadowedTypeParams && context.typeParameterNames) {
                    const cached = context.typeParameterNames.get(getTypeId(type));
                    if (cached) {
                        return cached;
                    }
                }
                let result = symbolToName(type.symbol, context, SymbolFlags.Type, /*expectsIdentifier*/ true);
                if (!(result.kind & SyntaxKind.Identifier)) {
                    return factory.createIdentifier("(Missing type parameter)");
                }
                if (context.flags & NodeBuilderFlags.GenerateNamesForShadowedTypeParams) {
                    const rawtext = result.escapedText as string;
                    let i = 0;
                    let text = rawtext;
                    while (context.typeParameterNamesByText?.has(text) || typeParameterShadowsNameInScope(text as __String, context, type)) {
                        i++;
                        text = `${rawtext}_${i}`;
                    }
                    if (text !== rawtext) {
                        result = factory.createIdentifier(text, result.typeArguments);
                    }
                    (context.typeParameterNames || (context.typeParameterNames = new Map())).set(getTypeId(type), result);
                    (context.typeParameterNamesByText || (context.typeParameterNamesByText = new Set())).add(result.escapedText as string);
                }
                return result;
            }

            function symbolToName(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags, expectsIdentifier: true): Identifier;
            function symbolToName(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags, expectsIdentifier: false): EntityName;
            function symbolToName(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags, expectsIdentifier: boolean): EntityName {
                const chain = lookupSymbolChain(symbol, context, meaning);

                if (expectsIdentifier && chain.length !== 1
                    && !context.encounteredError
                    && !(context.flags & NodeBuilderFlags.AllowQualifedNameInPlaceOfIdentifier)) {
                    context.encounteredError = true;
                }
                return createEntityNameFromSymbolChain(chain, chain.length - 1);

                function createEntityNameFromSymbolChain(chain: Symbol[], index: number): EntityName {
                    const typeParameterNodes = lookupTypeParameterNodes(chain, index, context);
                    const symbol = chain[index];

                    if (index === 0) {
                        context.flags |= NodeBuilderFlags.InInitialEntityName;
                    }
                    const symbolName = getNameOfSymbolAsWritten(symbol, context);
                    if (index === 0) {
                        context.flags ^= NodeBuilderFlags.InInitialEntityName;
                    }

                    const identifier = setEmitFlags(factory.createIdentifier(symbolName, typeParameterNodes), EmitFlags.NoAsciiEscaping);
                    identifier.symbol = symbol;

                    return index > 0 ? factory.createQualifiedName(createEntityNameFromSymbolChain(chain, index - 1), identifier) : identifier;
                }
            }

            function symbolToExpression(symbol: Symbol, context: NodeBuilderContext, meaning: SymbolFlags) {
                const chain = lookupSymbolChain(symbol, context, meaning);

                return createExpressionFromSymbolChain(chain, chain.length - 1);

                function createExpressionFromSymbolChain(chain: Symbol[], index: number): Expression {
                    const typeParameterNodes = lookupTypeParameterNodes(chain, index, context);
                    const symbol = chain[index];

                    if (index === 0) {
                        context.flags |= NodeBuilderFlags.InInitialEntityName;
                    }
                    let symbolName = getNameOfSymbolAsWritten(symbol, context);
                    if (index === 0) {
                        context.flags ^= NodeBuilderFlags.InInitialEntityName;
                    }
                    let firstChar = symbolName.charCodeAt(0);

                    if (isSingleOrDoubleQuote(firstChar) && some(symbol.declarations, hasNonGlobalAugmentationExternalModuleSymbol)) {
                        return factory.createStringLiteral(getSpecifierForModuleSymbol(symbol, context));
                    }
                    const canUsePropertyAccess = firstChar === CharacterCodes.hash ?
                        symbolName.length > 1 && isIdentifierStart(symbolName.charCodeAt(1), languageVersion) :
                        isIdentifierStart(firstChar, languageVersion);
                    if (index === 0 || canUsePropertyAccess) {
                        const identifier = setEmitFlags(factory.createIdentifier(symbolName, typeParameterNodes), EmitFlags.NoAsciiEscaping);
                        identifier.symbol = symbol;

                        return index > 0 ? factory.createPropertyAccessExpression(createExpressionFromSymbolChain(chain, index - 1), identifier) : identifier;
                    }
                    else {
                        if (firstChar === CharacterCodes.openBracket) {
                            symbolName = symbolName.substring(1, symbolName.length - 1);
                            firstChar = symbolName.charCodeAt(0);
                        }
                        let expression: Expression | undefined;
                        if (isSingleOrDoubleQuote(firstChar)) {
                            expression = factory.createStringLiteral(
                                symbolName
                                    .substring(1, symbolName.length - 1)
                                    .replace(/\\./g, s => s.substring(1)),
                                firstChar === CharacterCodes.singleQuote);
                        }
                        else if (("" + +symbolName) === symbolName) {
                            expression = factory.createNumericLiteral(+symbolName);
                        }
                        if (!expression) {
                            expression = setEmitFlags(factory.createIdentifier(symbolName, typeParameterNodes), EmitFlags.NoAsciiEscaping);
                            expression.symbol = symbol;
                        }
                        return factory.createElementAccessExpression(createExpressionFromSymbolChain(chain, index - 1), expression);
                    }
                }
            }

            function isStringNamed(d: Declaration) {
                const name = getNameOfDeclaration(d);
                return !!name && isStringLiteral(name);
            }

            function isSingleQuotedStringNamed(d: Declaration) {
                const name = getNameOfDeclaration(d);
                return !!(name && isStringLiteral(name) && (name.singleQuote || !nodeIsSynthesized(name) && startsWith(getTextOfNode(name, /*includeTrivia*/ false), "'")));
            }

            function getPropertyNameNodeForSymbol(symbol: Symbol, context: NodeBuilderContext) {
                const singleQuote = !!length(symbol.declarations) && every(symbol.declarations, isSingleQuotedStringNamed);
                const fromNameType = getPropertyNameNodeForSymbolFromNameType(symbol, context, singleQuote);
                if (fromNameType) {
                    return fromNameType;
                }
                if (isKnownSymbol(symbol)) {
                    return factory.createComputedPropertyName(factory.createPropertyAccessExpression(factory.createIdentifier("Symbol"), (symbol.escapedName as string).substr(3)));
                }
                const rawName = unescapeLeadingUnderscores(symbol.escapedName);
                const stringNamed = !!length(symbol.declarations) && every(symbol.declarations, isStringNamed);
                return createPropertyNameNodeForIdentifierOrLiteral(rawName, stringNamed, singleQuote);
            }

            // See getNameForSymbolFromNameType for a stringy equivalent
            function getPropertyNameNodeForSymbolFromNameType(symbol: Symbol, context: NodeBuilderContext, singleQuote?: boolean) {
                const nameType = getSymbolLinks(symbol).nameType;
                if (nameType) {
                    if (nameType.flags & TypeFlags.StringOrNumberLiteral) {
                        const name = "" + (<StringLiteralType | NumberLiteralType>nameType).value;
                        if (!isIdentifierText(name, compilerOptions.target) && !isNumericLiteralName(name)) {
                            return factory.createStringLiteral(name, !!singleQuote);
                        }
                        if (isNumericLiteralName(name) && startsWith(name, "-")) {
                            return factory.createComputedPropertyName(factory.createNumericLiteral(+name));
                        }
                        return createPropertyNameNodeForIdentifierOrLiteral(name);
                    }
                    if (nameType.flags & TypeFlags.UniqueESSymbol) {
                        return factory.createComputedPropertyName(symbolToExpression((<UniqueESSymbolType>nameType).symbol, context, SymbolFlags.Value));
                    }
                }
            }

            function createPropertyNameNodeForIdentifierOrLiteral(name: string, stringNamed?: boolean, singleQuote?: boolean) {
                return isIdentifierText(name, compilerOptions.target) ? factory.createIdentifier(name) :
                    !stringNamed && isNumericLiteralName(name) && +name >= 0 ? factory.createNumericLiteral(+name) :
                    factory.createStringLiteral(name, !!singleQuote);
            }

            function cloneNodeBuilderContext(context: NodeBuilderContext): NodeBuilderContext {
                const initial: NodeBuilderContext = { ...context };
                // Make type parameters created within this context not consume the name outside this context
                // The symbol serializer ends up creating many sibling scopes that all need "separate" contexts when
                // it comes to naming things - within a normal `typeToTypeNode` call, the node builder only ever descends
                // through the type tree, so the only cases where we could have used distinct sibling scopes was when there
                // were multiple generic overloads with similar generated type parameter names
                // The effect:
                // When we write out
                // export const x: <T>(x: T) => T
                // export const y: <T>(x: T) => T
                // we write it out like that, rather than as
                // export const x: <T>(x: T) => T
                // export const y: <T_1>(x: T_1) => T_1
                if (initial.typeParameterNames) {
                    initial.typeParameterNames = new Map(initial.typeParameterNames);
                }
                if (initial.typeParameterNamesByText) {
                    initial.typeParameterNamesByText = new Set(initial.typeParameterNamesByText);
                }
                if (initial.typeParameterSymbolList) {
                    initial.typeParameterSymbolList = new Set(initial.typeParameterSymbolList);
                }
                return initial;
            }


            function getDeclarationWithTypeAnnotation(symbol: Symbol, enclosingDeclaration: Node | undefined) {
                return symbol.declarations && find(symbol.declarations, s => !!getEffectiveTypeAnnotationNode(s) && (!enclosingDeclaration || !!findAncestor(s, n => n === enclosingDeclaration)));
            }

            function existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing: TypeNode, type: Type) {
                return !(getObjectFlags(type) & ObjectFlags.Reference) || !isTypeReferenceNode(existing) || length(existing.typeArguments) >= getMinTypeArgumentCount((type as TypeReference).target.typeParameters);
            }

            /**
             * Unlike `typeToTypeNodeHelper`, this handles setting up the `AllowUniqueESSymbolType` flag
             * so a `unique symbol` is returned when appropriate for the input symbol, rather than `typeof sym`
             */
            function serializeTypeForDeclaration(context: NodeBuilderContext, type: Type, symbol: Symbol, enclosingDeclaration: Node | undefined, includePrivateSymbol?: (s: Symbol) => void, bundled?: boolean) {
                if (type !== errorType && enclosingDeclaration) {
                    const declWithExistingAnnotation = getDeclarationWithTypeAnnotation(symbol, enclosingDeclaration);
                    if (declWithExistingAnnotation && !isFunctionLikeDeclaration(declWithExistingAnnotation)) {
                        // try to reuse the existing annotation
                        const existing = getEffectiveTypeAnnotationNode(declWithExistingAnnotation)!;
                        if (getTypeFromTypeNode(existing) === type && existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing, type)) {
                            const result = serializeExistingTypeNode(context, existing, includePrivateSymbol, bundled);
                            if (result) {
                                return result;
                            }
                        }
                    }
                }
                const oldFlags = context.flags;
                if (type.flags & TypeFlags.UniqueESSymbol &&
                    type.symbol === symbol) {
                    context.flags |= NodeBuilderFlags.AllowUniqueESSymbolType;
                }
                const result = typeToTypeNodeHelper(type, context);
                context.flags = oldFlags;
                return result;
            }

            function serializeReturnTypeForSignature(context: NodeBuilderContext, type: Type, signature: Signature, includePrivateSymbol?: (s: Symbol) => void, bundled?: boolean) {
                if (type !== errorType && context.enclosingDeclaration) {
                    const annotation = signature.declaration && getEffectiveReturnTypeNode(signature.declaration);
                    if (!!findAncestor(annotation, n => n === context.enclosingDeclaration) && annotation && instantiateType(getTypeFromTypeNode(annotation), signature.mapper) === type && existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(annotation, type)) {
                        const result = serializeExistingTypeNode(context, annotation, includePrivateSymbol, bundled);
                        if (result) {
                            return result;
                        }
                    }
                }
                return typeToTypeNodeHelper(type, context);
            }

            function serializeExistingTypeNode(context: NodeBuilderContext, existing: TypeNode, includePrivateSymbol?: (s: Symbol) => void, bundled?: boolean) {
                if (cancellationToken && cancellationToken.throwIfCancellationRequested) {
                    cancellationToken.throwIfCancellationRequested();
                }
                let hadError = false;
                const file = getSourceFileOfNode(existing);
                const transformed = visitNode(existing, visitExistingNodeTreeSymbols);
                if (hadError) {
                    return undefined;
                }
                return transformed === existing ? setTextRange(factory.cloneNode(existing), existing) : transformed;

                function visitExistingNodeTreeSymbols<T extends Node>(node: T): Node {
                    // We don't _actually_ support jsdoc namepath types, emit `any` instead
                    if (isJSDocAllType(node) || node.kind === SyntaxKind.JSDocNamepathType) {
                        return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
                    }
                    if (isJSDocUnknownType(node)) {
                        return factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
                    }
                    if (isJSDocNullableType(node)) {
                        return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols), factory.createLiteralTypeNode(factory.createNull())]);
                    }
                    if (isJSDocOptionalType(node)) {
                        return factory.createUnionTypeNode([visitNode(node.type, visitExistingNodeTreeSymbols), factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
                    }
                    if (isJSDocNonNullableType(node)) {
                        return visitNode(node.type, visitExistingNodeTreeSymbols);
                    }
                    if (isJSDocVariadicType(node)) {
                        return factory.createArrayTypeNode(visitNode((node as JSDocVariadicType).type, visitExistingNodeTreeSymbols));
                    }
                    if (isJSDocTypeLiteral(node)) {
                        return factory.createTypeLiteralNode(map(node.jsDocPropertyTags, t => {
                            const name = isIdentifier(t.name) ? t.name : t.name.right;
                            const typeViaParent = getTypeOfPropertyOfType(getTypeFromTypeNode(node), name.escapedText);
                            const overrideTypeNode = typeViaParent && t.typeExpression && getTypeFromTypeNode(t.typeExpression.type) !== typeViaParent ? typeToTypeNodeHelper(typeViaParent, context) : undefined;

                            return factory.createPropertySignature(
                                /*modifiers*/ undefined,
                                name,
                                t.typeExpression && isJSDocOptionalType(t.typeExpression.type) ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                                overrideTypeNode || (t.typeExpression && visitNode(t.typeExpression.type, visitExistingNodeTreeSymbols)) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                            );
                        }));
                    }
                    if (isTypeReferenceNode(node) && isIdentifier(node.typeName) && node.typeName.escapedText === "") {
                        return setOriginalNode(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node);
                    }
                    if ((isExpressionWithTypeArguments(node) || isTypeReferenceNode(node)) && isJSDocIndexSignature(node)) {
                        return factory.createTypeLiteralNode([factory.createIndexSignature(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            [factory.createParameterDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                /*dotdotdotToken*/ undefined,
                                "x",
                                /*questionToken*/ undefined,
                                visitNode(node.typeArguments![0], visitExistingNodeTreeSymbols)
                            )],
                            visitNode(node.typeArguments![1], visitExistingNodeTreeSymbols)
                        )]);
                    }
                    if (isJSDocFunctionType(node)) {
                        if (isJSDocConstructSignature(node)) {
                            let newTypeNode: TypeNode | undefined;
                            return factory.createConstructorTypeNode(
                                visitNodes(node.typeParameters, visitExistingNodeTreeSymbols),
                                mapDefined(node.parameters, (p, i) => p.name && isIdentifier(p.name) && p.name.escapedText === "new" ? (newTypeNode = p.type, undefined) : factory.createParameterDeclaration(
                                    /*decorators*/ undefined,
                                    /*modifiers*/ undefined,
                                    getEffectiveDotDotDotForParameter(p),
                                    getNameForJSDocFunctionParameter(p, i),
                                    p.questionToken,
                                    visitNode(p.type, visitExistingNodeTreeSymbols),
                                    /*initializer*/ undefined
                                )),
                                visitNode(newTypeNode || node.type, visitExistingNodeTreeSymbols) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                            );
                        }
                        else {
                            return factory.createFunctionTypeNode(
                                visitNodes(node.typeParameters, visitExistingNodeTreeSymbols),
                                map(node.parameters, (p, i) => factory.createParameterDeclaration(
                                    /*decorators*/ undefined,
                                    /*modifiers*/ undefined,
                                    getEffectiveDotDotDotForParameter(p),
                                    getNameForJSDocFunctionParameter(p, i),
                                    p.questionToken,
                                    visitNode(p.type, visitExistingNodeTreeSymbols),
                                    /*initializer*/ undefined
                                )),
                                visitNode(node.type, visitExistingNodeTreeSymbols) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                            );
                        }
                    }
                    if (isTypeReferenceNode(node) && isInJSDoc(node) && (!existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(node, getTypeFromTypeNode(node)) || getIntendedTypeFromJSDocTypeReference(node) || unknownSymbol === resolveTypeReferenceName(getTypeReferenceName(node), SymbolFlags.Type, /*ignoreErrors*/ true))) {
                        return setOriginalNode(typeToTypeNodeHelper(getTypeFromTypeNode(node), context), node);
                    }
                    if (isLiteralImportTypeNode(node)) {
                        return factory.updateImportTypeNode(
                            node,
                            factory.updateLiteralTypeNode(node.argument, rewriteModuleSpecifier(node, node.argument.literal)),
                            node.qualifier,
                            visitNodes(node.typeArguments, visitExistingNodeTreeSymbols, isTypeNode),
                            node.isTypeOf
                        );
                    }

                    if (isEntityName(node) || isEntityNameExpression(node)) {
                        const leftmost = getFirstIdentifier(node);
                        if (isInJSFile(node) && (isExportsIdentifier(leftmost) || isModuleExportsAccessExpression(leftmost.parent) || (isQualifiedName(leftmost.parent) && isModuleIdentifier(leftmost.parent.left) && isExportsIdentifier(leftmost.parent.right)))) {
                            hadError = true;
                            return node;
                        }
                        const sym = resolveEntityName(leftmost, SymbolFlags.All, /*ignoreErrors*/ true, /*dontResolveALias*/ true);
                        if (sym) {
                            if (isSymbolAccessible(sym, context.enclosingDeclaration, SymbolFlags.All, /*shouldComputeAliasesToMakeVisible*/ false).accessibility !== SymbolAccessibility.Accessible) {
                                hadError = true;
                            }
                            else {
                                context.tracker?.trackSymbol?.(sym, context.enclosingDeclaration, SymbolFlags.All);
                                includePrivateSymbol?.(sym);
                            }
                            if (isIdentifier(node)) {
                                const name = sym.flags & SymbolFlags.TypeParameter ? typeParameterToName(getDeclaredTypeOfSymbol(sym), context) : factory.cloneNode(node);
                                name.symbol = sym; // for quickinfo, which uses identifier symbol information
                                return setEmitFlags(setOriginalNode(name, node), EmitFlags.NoAsciiEscaping);
                            }
                        }
                    }

                    if (file && isTupleTypeNode(node) && (getLineAndCharacterOfPosition(file, node.pos).line === getLineAndCharacterOfPosition(file, node.end).line)) {
                        setEmitFlags(node, EmitFlags.SingleLine);
                    }

                    return visitEachChild(node, visitExistingNodeTreeSymbols, nullTransformationContext);

                    function getEffectiveDotDotDotForParameter(p: ParameterDeclaration) {
                        return p.dotDotDotToken || (p.type && isJSDocVariadicType(p.type) ? factory.createToken(SyntaxKind.DotDotDotToken) : undefined);
                    }

                    /** Note that `new:T` parameters are not handled, but should be before calling this function. */
                    function getNameForJSDocFunctionParameter(p: ParameterDeclaration, index: number) {
                        return p.name && isIdentifier(p.name) && p.name.escapedText === "this" ? "this"
                            : getEffectiveDotDotDotForParameter(p) ? `args`
                            : `arg${index}`;
                    }

                    function rewriteModuleSpecifier(parent: ImportTypeNode, lit: StringLiteral) {
                        if (bundled) {
                            if (context.tracker && context.tracker.moduleResolverHost) {
                                const targetFile = getExternalModuleFileFromDeclaration(parent);
                                if (targetFile) {
                                    const getCanonicalFileName = createGetCanonicalFileName(!!host.useCaseSensitiveFileNames);
                                    const resolverHost = {
                                        getCanonicalFileName,
                                        getCurrentDirectory: () => context.tracker.moduleResolverHost!.getCurrentDirectory(),
                                        getCommonSourceDirectory: () => context.tracker.moduleResolverHost!.getCommonSourceDirectory()
                                    };
                                    const newName = getResolvedExternalModuleName(resolverHost, targetFile);
                                    return factory.createStringLiteral(newName);
                                }
                            }
                        }
                        else {
                            if (context.tracker && context.tracker.trackExternalModuleSymbolOfImportTypeNode) {
                                const moduleSym = resolveExternalModuleNameWorker(lit, lit, /*moduleNotFoundError*/ undefined);
                                if (moduleSym) {
                                    context.tracker.trackExternalModuleSymbolOfImportTypeNode(moduleSym);
                                }
                            }
                        }
                        return lit;
                    }
                }
            }

            function symbolTableToDeclarationStatements(symbolTable: SymbolTable, context: NodeBuilderContext, bundled?: boolean): Statement[] {
                const serializePropertySymbolForClass = makeSerializePropertySymbol<ClassElement>(factory.createPropertyDeclaration, SyntaxKind.MethodDeclaration, /*useAcessors*/ true);
                const serializePropertySymbolForInterfaceWorker = makeSerializePropertySymbol<TypeElement>((_decorators, mods, name, question, type) => factory.createPropertySignature(mods, name, question, type), SyntaxKind.MethodSignature, /*useAcessors*/ false);

                // TODO: Use `setOriginalNode` on original declaration names where possible so these declarations see some kind of
                // declaration mapping

                // We save the enclosing declaration off here so it's not adjusted by well-meaning declaration
                // emit codepaths which want to apply more specific contexts (so we can still refer to the root real declaration
                // we're trying to emit from later on)
                const enclosingDeclaration = context.enclosingDeclaration!;
                let results: Statement[] = [];
                const visitedSymbols = new Set<number>();
                const deferredPrivatesStack: ESMap<SymbolId, Symbol>[] = [];
                const oldcontext = context;
                context = {
                    ...oldcontext,
                    usedSymbolNames: new Set(oldcontext.usedSymbolNames),
                    remappedSymbolNames: new Map(),
                    tracker: {
                        ...oldcontext.tracker,
                        trackSymbol: (sym, decl, meaning) => {
                            const accessibleResult = isSymbolAccessible(sym, decl, meaning, /*computeALiases*/ false);
                            if (accessibleResult.accessibility === SymbolAccessibility.Accessible) {
                                // Lookup the root symbol of the chain of refs we'll use to access it and serialize it
                                const chain = lookupSymbolChainWorker(sym, context, meaning);
                                if (!(sym.flags & SymbolFlags.Property)) {
                                    includePrivateSymbol(chain[0]);
                                }
                            }
                            else if (oldcontext.tracker && oldcontext.tracker.trackSymbol) {
                                oldcontext.tracker.trackSymbol(sym, decl, meaning);
                            }
                        }
                    }
                };
                forEachEntry(symbolTable, (symbol, name) => {
                    const baseName = unescapeLeadingUnderscores(name);
                    void getInternalSymbolName(symbol, baseName); // Called to cache values into `usedSymbolNames` and `remappedSymbolNames`
                });
                let addingDeclare = !bundled;
                const exportEquals = symbolTable.get(InternalSymbolName.ExportEquals);
                if (exportEquals && symbolTable.size > 1 && exportEquals.flags & SymbolFlags.Alias) {
                    symbolTable = createSymbolTable();
                    // Remove extraneous elements from root symbol table (they'll be mixed back in when the target of the `export=` is looked up)
                    symbolTable.set(InternalSymbolName.ExportEquals, exportEquals);
                }

                visitSymbolTable(symbolTable);
                return mergeRedundantStatements(results);

                function isIdentifierAndNotUndefined(node: Node | undefined): node is Identifier {
                    return !!node && node.kind === SyntaxKind.Identifier;
                }

                function getNamesOfDeclaration(statement: Statement): Identifier[] {
                    if (isVariableStatement(statement)) {
                        return filter(map(statement.declarationList.declarations, getNameOfDeclaration), isIdentifierAndNotUndefined);
                    }
                    return filter([getNameOfDeclaration(statement as DeclarationStatement)], isIdentifierAndNotUndefined);
                }

                function flattenExportAssignedNamespace(statements: Statement[]) {
                    const exportAssignment = find(statements, isExportAssignment);
                    const nsIndex = findIndex(statements, isModuleDeclaration);
                    let ns = nsIndex !== -1 ? statements[nsIndex] as ModuleDeclaration : undefined;
                    if (ns && exportAssignment && exportAssignment.isExportEquals &&
                        isIdentifier(exportAssignment.expression) && isIdentifier(ns.name) && idText(ns.name) === idText(exportAssignment.expression) &&
                        ns.body && isModuleBlock(ns.body)) {
                        // Pass 0: Correct situations where a module has both an `export = ns` and multiple top-level exports by stripping the export modifiers from
                        //  the top-level exports and exporting them in the targeted ns, as can occur when a js file has both typedefs and `module.export` assignments
                        const excessExports = filter(statements, s => !!(getEffectiveModifierFlags(s) & ModifierFlags.Export));
                        const name = ns.name;
                        let body = ns.body;
                        if (length(excessExports)) {
                            ns = factory.updateModuleDeclaration(
                                ns,
                                ns.decorators,
                                ns.modifiers,
                                ns.name,
                                body = factory.updateModuleBlock(
                                    body,
                                    factory.createNodeArray([...ns.body.statements, factory.createExportDeclaration(
                                        /*decorators*/ undefined,
                                        /*modifiers*/ undefined,
                                        /*isTypeOnly*/ false,
                                        factory.createNamedExports(map(flatMap(excessExports, e => getNamesOfDeclaration(e)), id => factory.createExportSpecifier(/*alias*/ undefined, id))),
                                        /*moduleSpecifier*/ undefined
                                    )])
                                )
                            );
                            statements = [...statements.slice(0, nsIndex), ns, ...statements.slice(nsIndex + 1)];
                        }

                        // Pass 1: Flatten `export namespace _exports {} export = _exports;` so long as the `export=` only points at a single namespace declaration
                        if (!find(statements, s => s !== ns && nodeHasName(s, name))) {
                            results = [];
                            // If the namespace contains no export assignments or declarations, and no declarations flagged with `export`, then _everything_ is exported -
                            // to respect this as the top level, we need to add an `export` modifier to everything
                            const mixinExportFlag = !some(body.statements, s => hasSyntacticModifier(s, ModifierFlags.Export) || isExportAssignment(s) || isExportDeclaration(s));
                            forEach(body.statements, s => {
                                addResult(s, mixinExportFlag ? ModifierFlags.Export : ModifierFlags.None); // Recalculates the ambient (and export, if applicable from above) flag
                            });
                            statements = [...filter(statements, s => s !== ns && s !== exportAssignment), ...results];
                        }
                    }
                    return statements;
                }

                function mergeExportDeclarations(statements: Statement[]) {
                    // Pass 2: Combine all `export {}` declarations
                    const exports = filter(statements, d => isExportDeclaration(d) && !d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause)) as ExportDeclaration[];
                    if (length(exports) > 1) {
                        const nonExports = filter(statements, d => !isExportDeclaration(d) || !!d.moduleSpecifier || !d.exportClause);
                        statements = [...nonExports, factory.createExportDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports(flatMap(exports, e => cast(e.exportClause, isNamedExports).elements)),
                            /*moduleSpecifier*/ undefined
                        )];
                    }
                    // Pass 2b: Also combine all `export {} from "..."` declarations as needed
                    const reexports = filter(statements, d => isExportDeclaration(d) && !!d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause)) as ExportDeclaration[];
                    if (length(reexports) > 1) {
                        const groups = group(reexports, decl => isStringLiteral(decl.moduleSpecifier!) ? ">" + decl.moduleSpecifier.text : ">");
                        if (groups.length !== reexports.length) {
                            for (const group of groups) {
                                if (group.length > 1) {
                                    // remove group members from statements and then merge group members and add back to statements
                                    statements = [
                                        ...filter(statements, s => group.indexOf(s as ExportDeclaration) === -1),
                                        factory.createExportDeclaration(
                                            /*decorators*/ undefined,
                                            /*modifiers*/ undefined,
                                            /*isTypeOnly*/ false,
                                            factory.createNamedExports(flatMap(group, e => cast(e.exportClause, isNamedExports).elements)),
                                            group[0].moduleSpecifier
                                        )
                                    ];
                                }
                            }
                        }
                    }
                    return statements;
                }

                function inlineExportModifiers(statements: Statement[]) {
                    // Pass 3: Move all `export {}`'s to `export` modifiers where possible
                    const index = findIndex(statements, d => isExportDeclaration(d) && !d.moduleSpecifier && !!d.exportClause && isNamedExports(d.exportClause));
                    if (index >= 0) {
                        const exportDecl = statements[index] as ExportDeclaration & { readonly exportClause: NamedExports };
                        const replacements = mapDefined(exportDecl.exportClause.elements, e => {
                            if (!e.propertyName) {
                                // export {name} - look thru `statements` for `name`, and if all results can take an `export` modifier, do so and filter it
                                const indices = indicesOf(statements);
                                const associatedIndices = filter(indices, i => nodeHasName(statements[i], e.name));
                                if (length(associatedIndices) && every(associatedIndices, i => canHaveExportModifier(statements[i]))) {
                                    for (const index of associatedIndices) {
                                        statements[index] = addExportModifier(statements[index] as Extract<HasModifiers, Statement>);
                                    }
                                    return undefined;
                                }
                            }
                            return e;
                        });
                        if (!length(replacements)) {
                            // all clauses removed, remove the export declaration
                            orderedRemoveItemAt(statements, index);
                        }
                        else {
                            // some items filtered, others not - update the export declaration
                            statements[index] = factory.updateExportDeclaration(
                                exportDecl,
                                exportDecl.decorators,
                                exportDecl.modifiers,
                                exportDecl.isTypeOnly,
                                factory.updateNamedExports(
                                    exportDecl.exportClause,
                                    replacements
                                ),
                                exportDecl.moduleSpecifier
                            );
                        }
                    }
                    return statements;
                }

                function mergeRedundantStatements(statements: Statement[]) {
                    statements = flattenExportAssignedNamespace(statements);
                    statements = mergeExportDeclarations(statements);
                    statements = inlineExportModifiers(statements);

                    // Not a cleanup, but as a final step: If there is a mix of `export` and non-`export` declarations, but no `export =` or `export {}` add a `export {};` so
                    // declaration privacy is respected.
                    if (enclosingDeclaration &&
                        ((isSourceFile(enclosingDeclaration) && isExternalOrCommonJsModule(enclosingDeclaration)) || isModuleDeclaration(enclosingDeclaration)) &&
                        (!some(statements, isExternalModuleIndicator) || (!hasScopeMarker(statements) && some(statements, needsScopeMarker)))) {
                        statements.push(createEmptyExports(factory));
                    }
                    return statements;
                }

                function canHaveExportModifier(node: Statement): node is Extract<HasModifiers, Statement> {
                    return isEnumDeclaration(node) ||
                            isVariableStatement(node) ||
                            isFunctionDeclaration(node) ||
                            isClassDeclaration(node) ||
                            (isModuleDeclaration(node) && !isExternalModuleAugmentation(node) && !isGlobalScopeAugmentation(node)) ||
                            isInterfaceDeclaration(node) ||
                            isTypeDeclaration(node);
                }

                function addExportModifier(node: Extract<HasModifiers, Statement>) {
                    const flags = (getEffectiveModifierFlags(node) | ModifierFlags.Export) & ~ModifierFlags.Ambient;
                    return factory.updateModifiers(node, flags);
                }

                function removeExportModifier(node: Extract<HasModifiers, Statement>) {
                    const flags = getEffectiveModifierFlags(node) & ~ModifierFlags.Export;
                    return factory.updateModifiers(node, flags);
                }

                function visitSymbolTable(symbolTable: SymbolTable, suppressNewPrivateContext?: boolean, propertyAsAlias?: boolean) {
                    if (!suppressNewPrivateContext) {
                        deferredPrivatesStack.push(new Map());
                    }
                    symbolTable.forEach((symbol: Symbol) => {
                        serializeSymbol(symbol, /*isPrivate*/ false, !!propertyAsAlias);
                    });
                    if (!suppressNewPrivateContext) {
                        // deferredPrivates will be filled up by visiting the symbol table
                        // And will continue to iterate as elements are added while visited `deferredPrivates`
                        // (As that's how a map iterator is defined to work)
                        deferredPrivatesStack[deferredPrivatesStack.length - 1].forEach((symbol: Symbol) => {
                            serializeSymbol(symbol, /*isPrivate*/ true, !!propertyAsAlias);
                        });
                        deferredPrivatesStack.pop();
                    }
                }

                function serializeSymbol(symbol: Symbol, isPrivate: boolean, propertyAsAlias: boolean) {
                    // cache visited list based on merged symbol, since we want to use the unmerged top-level symbol, but
                    // still skip reserializing it if we encounter the merged product later on
                    const visitedSym = getMergedSymbol(symbol);
                    if (visitedSymbols.has(getSymbolId(visitedSym))) {
                        return; // Already printed
                    }
                    visitedSymbols.add(getSymbolId(visitedSym));
                    // Only actually serialize symbols within the correct enclosing declaration, otherwise do nothing with the out-of-context symbol
                    const skipMembershipCheck = !isPrivate; // We only call this on exported symbols when we know they're in the correct scope
                    if (skipMembershipCheck || (!!length(symbol.declarations) && some(symbol.declarations, d => !!findAncestor(d, n => n === enclosingDeclaration)))) {
                        const oldContext = context;
                        context = cloneNodeBuilderContext(context);
                        const result = serializeSymbolWorker(symbol, isPrivate, propertyAsAlias);
                        context = oldContext;
                        return result;
                    }
                }


                // Synthesize declarations for a symbol - might be an Interface, a Class, a Namespace, a Type, a Variable (const, let, or var), an Alias
                // or a merge of some number of those.
                // An interesting challenge is ensuring that when classes merge with namespaces and interfaces, is keeping
                // each symbol in only one of the representations
                // Also, synthesizing a default export of some kind
                // If it's an alias: emit `export default ref`
                // If it's a property: emit `export default _default` with a `_default` prop
                // If it's a class/interface/function: emit a class/interface/function with a `default` modifier
                // These forms can merge, eg (`export default 12; export default interface A {}`)
                function serializeSymbolWorker(symbol: Symbol, isPrivate: boolean, propertyAsAlias: boolean) {
                    const symbolName = unescapeLeadingUnderscores(symbol.escapedName);
                    const isDefault = symbol.escapedName === InternalSymbolName.Default;
                    if (isPrivate && !(context.flags & NodeBuilderFlags.AllowAnonymousIdentifier) && isStringANonContextualKeyword(symbolName) && !isDefault) {
                        // Oh no. We cannot use this symbol's name as it's name... It's likely some jsdoc had an invalid name like `export` or `default` :(
                        context.encounteredError = true;
                        // TODO: Issue error via symbol tracker?
                        return; // If we need to emit a private with a keyword name, we're done for, since something else will try to refer to it by that name
                    }
                    let needsPostExportDefault = isDefault && !!(
                           symbol.flags & SymbolFlags.ExportDoesNotSupportDefaultModifier
                        || (symbol.flags & SymbolFlags.Function && length(getPropertiesOfType(getTypeOfSymbol(symbol))))
                    ) && !(symbol.flags & SymbolFlags.Alias); // An alias symbol should preclude needing to make an alias ourselves
                    let needsExportDeclaration = !needsPostExportDefault && !isPrivate && isStringANonContextualKeyword(symbolName) && !isDefault;
                    // `serializeVariableOrProperty` will handle adding the export declaration if it is run (since `getInternalSymbolName` will create the name mapping), so we need to ensuer we unset `needsExportDeclaration` if it is
                    if (needsPostExportDefault || needsExportDeclaration) {
                        isPrivate = true;
                    }
                    const modifierFlags = (!isPrivate ? ModifierFlags.Export : 0) | (isDefault && !needsPostExportDefault ? ModifierFlags.Default : 0);
                    const isConstMergedWithNS = symbol.flags & SymbolFlags.Module &&
                        symbol.flags & (SymbolFlags.BlockScopedVariable | SymbolFlags.FunctionScopedVariable | SymbolFlags.Property) &&
                        symbol.escapedName !== InternalSymbolName.ExportEquals;
                    const isConstMergedWithNSPrintableAsSignatureMerge = isConstMergedWithNS && isTypeRepresentableAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol);
                    if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method) || isConstMergedWithNSPrintableAsSignatureMerge) {
                        serializeAsFunctionNamespaceMerge(getTypeOfSymbol(symbol), symbol, getInternalSymbolName(symbol, symbolName), modifierFlags);
                    }
                    if (symbol.flags & SymbolFlags.TypeAlias) {
                        serializeTypeAlias(symbol, symbolName, modifierFlags);
                    }
                    // Need to skip over export= symbols below - json source files get a single `Property` flagged
                    // symbol of name `export=` which needs to be handled like an alias. It's not great, but it is what it is.
                    if (symbol.flags & (SymbolFlags.BlockScopedVariable | SymbolFlags.FunctionScopedVariable | SymbolFlags.Property)
                        && symbol.escapedName !== InternalSymbolName.ExportEquals
                        && !(symbol.flags & SymbolFlags.Prototype)
                        && !(symbol.flags & SymbolFlags.Class)
                        && !isConstMergedWithNSPrintableAsSignatureMerge) {
                        if (propertyAsAlias) {
                            const createdExport = serializeMaybeAliasAssignment(symbol);
                            if (createdExport) {
                                needsExportDeclaration = false;
                                needsPostExportDefault = false;
                            }
                        }
                        else {
                            const type = getTypeOfSymbol(symbol);
                            const localName = getInternalSymbolName(symbol, symbolName);
                            if (!(symbol.flags & SymbolFlags.Function) && isTypeRepresentableAsFunctionNamespaceMerge(type, symbol)) {
                                // If the type looks like a function declaration + ns could represent it, and it's type is sourced locally, rewrite it into a function declaration + ns
                                serializeAsFunctionNamespaceMerge(type, symbol, localName, modifierFlags);
                            }
                            else {
                                // A Class + Property merge is made for a `module.exports.Member = class {}`, and it doesn't serialize well as either a class _or_ a property symbol - in fact, _it behaves like an alias!_
                                // `var` is `FunctionScopedVariable`, `const` and `let` are `BlockScopedVariable`, and `module.exports.thing =` is `Property`
                                const flags = !(symbol.flags & SymbolFlags.BlockScopedVariable) ? undefined
                                    : isConstVariable(symbol) ? NodeFlags.Const
                                    : NodeFlags.Let;
                                const name = (needsPostExportDefault || !(symbol.flags & SymbolFlags.Property)) ? localName : getUnusedName(localName, symbol);
                                let textRange: Node | undefined = symbol.declarations && find(symbol.declarations, d => isVariableDeclaration(d));
                                if (textRange && isVariableDeclarationList(textRange.parent) && textRange.parent.declarations.length === 1) {
                                    textRange = textRange.parent.parent;
                                }
                                const propertyAccessRequire = find(symbol.declarations, isPropertyAccessExpression);
                                if (propertyAccessRequire && isBinaryExpression(propertyAccessRequire.parent) && isIdentifier(propertyAccessRequire.parent.right)
                                    && type.symbol && isSourceFile(type.symbol.valueDeclaration)) {
                                    const alias = localName === propertyAccessRequire.parent.right.escapedText ? undefined : propertyAccessRequire.parent.right;
                                    addResult(
                                        factory.createExportDeclaration(
                                            /*decorators*/ undefined,
                                            /*modifiers*/ undefined,
                                            /*isTypeOnly*/ false,
                                            factory.createNamedExports([factory.createExportSpecifier(alias, localName)])
                                        ),
                                        ModifierFlags.None
                                    );
                                    context.tracker.trackSymbol!(type.symbol, context.enclosingDeclaration, SymbolFlags.Value);
                                }
                                else {
                                    const statement = setTextRange(factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([
                                        factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, serializeTypeForDeclaration(context, type, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                                    ], flags)), textRange);
                                    addResult(statement, name !== localName ? modifierFlags & ~ModifierFlags.Export : modifierFlags);
                                    if (name !== localName && !isPrivate) {
                                        // We rename the variable declaration we generate for Property symbols since they may have a name which
                                        // conflicts with a local declaration. For example, given input:
                                        // ```
                                        // function g() {}
                                        // module.exports.g = g
                                        // ```
                                        // In such a situation, we have a local variable named `g`, and a separate exported variable named `g`.
                                        // Naively, we would emit
                                        // ```
                                        // function g() {}
                                        // export const g: typeof g;
                                        // ```
                                        // That's obviously incorrect - the `g` in the type annotation needs to refer to the local `g`, but
                                        // the export declaration shadows it.
                                        // To work around that, we instead write
                                        // ```
                                        // function g() {}
                                        // const g_1: typeof g;
                                        // export { g_1 as g };
                                        // ```
                                        // To create an export named `g` that does _not_ shadow the local `g`
                                        addResult(
                                            factory.createExportDeclaration(
                                                /*decorators*/ undefined,
                                                /*modifiers*/ undefined,
                                                /*isTypeOnly*/ false,
                                                factory.createNamedExports([factory.createExportSpecifier(name, localName)])
                                            ),
                                            ModifierFlags.None
                                        );
                                        needsExportDeclaration = false;
                                        needsPostExportDefault = false;
                                    }
                                }
                            }
                        }
                    }
                    if (symbol.flags & SymbolFlags.Enum) {
                        serializeEnum(symbol, symbolName, modifierFlags);
                    }
                    if (symbol.flags & SymbolFlags.Class) {
                        if (symbol.flags & SymbolFlags.Property && isBinaryExpression(symbol.valueDeclaration.parent) && isClassExpression(symbol.valueDeclaration.parent.right)) {
                            // Looks like a `module.exports.Sub = class {}` - if we serialize `symbol` as a class, the result will have no members,
                            // since the classiness is actually from the target of the effective alias the symbol is. yes. A BlockScopedVariable|Class|Property
                            // _really_ acts like an Alias, and none of a BlockScopedVariable, Class, or Property. This is the travesty of JS binding today.
                            serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName), modifierFlags);
                        }
                        else {
                            serializeAsClass(symbol, getInternalSymbolName(symbol, symbolName), modifierFlags);
                        }
                    }
                    if ((symbol.flags & (SymbolFlags.ValueModule | SymbolFlags.NamespaceModule) && (!isConstMergedWithNS || isTypeOnlyNamespace(symbol))) || isConstMergedWithNSPrintableAsSignatureMerge) {
                        serializeModule(symbol, symbolName, modifierFlags);
                    }
                    if (symbol.flags & SymbolFlags.Interface) {
                        serializeInterface(symbol, symbolName, modifierFlags);
                    }
                    if (symbol.flags & SymbolFlags.Alias) {
                        serializeAsAlias(symbol, getInternalSymbolName(symbol, symbolName), modifierFlags);
                    }
                    if (symbol.flags & SymbolFlags.Property && symbol.escapedName === InternalSymbolName.ExportEquals) {
                        serializeMaybeAliasAssignment(symbol);
                    }
                    if (symbol.flags & SymbolFlags.ExportStar) {
                        // synthesize export * from "moduleReference"
                        // Straightforward - only one thing to do - make an export declaration
                        for (const node of symbol.declarations) {
                            const resolvedModule = resolveExternalModuleName(node, (node as ExportDeclaration).moduleSpecifier!);
                            if (!resolvedModule) continue;
                            addResult(factory.createExportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*isTypeOnly*/ false, /*exportClause*/ undefined, factory.createStringLiteral(getSpecifierForModuleSymbol(resolvedModule, context))), ModifierFlags.None);
                        }
                    }
                    if (needsPostExportDefault) {
                        addResult(factory.createExportAssignment(/*decorators*/ undefined, /*modifiers*/ undefined, /*isExportAssignment*/ false, factory.createIdentifier(getInternalSymbolName(symbol, symbolName))), ModifierFlags.None);
                    }
                    else if (needsExportDeclaration) {
                        addResult(factory.createExportDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports([factory.createExportSpecifier(getInternalSymbolName(symbol, symbolName), symbolName)])
                        ), ModifierFlags.None);
                    }
                }

                function includePrivateSymbol(symbol: Symbol) {
                    if (some(symbol.declarations, isParameterDeclaration)) return;
                    Debug.assertIsDefined(deferredPrivatesStack[deferredPrivatesStack.length - 1]);
                    getUnusedName(unescapeLeadingUnderscores(symbol.escapedName), symbol); // Call to cache unique name for symbol
                    // Blanket moving (import) aliases into the root private context should work, since imports are not valid within namespaces
                    // (so they must have been in the root to begin with if they were real imports) cjs `require` aliases (an upcoming feature)
                    // will throw a wrench in this, since those may have been nested, but we'll need to synthesize them in the outer scope
                    // anyway, as that's the only place the import they translate to is valid. In such a case, we might need to use a unique name
                    // for the moved import; which hopefully the above `getUnusedName` call should produce.
                    const isExternalImportAlias = !!(symbol.flags & SymbolFlags.Alias) && !some(symbol.declarations, d =>
                        !!findAncestor(d, isExportDeclaration) ||
                        isNamespaceExport(d) ||
                        (isImportEqualsDeclaration(d) && !isExternalModuleReference(d.moduleReference))
                    );
                    deferredPrivatesStack[isExternalImportAlias ? 0 : (deferredPrivatesStack.length - 1)].set(getSymbolId(symbol), symbol);
                }

                function isExportingScope(enclosingDeclaration: Node) {
                    return ((isSourceFile(enclosingDeclaration) && (isExternalOrCommonJsModule(enclosingDeclaration) || isJsonSourceFile(enclosingDeclaration))) ||
                        (isAmbientModule(enclosingDeclaration) && !isGlobalScopeAugmentation(enclosingDeclaration)));
                }

                // Prepends a `declare` and/or `export` modifier if the context requires it, and then adds `node` to `result` and returns `node`
                function addResult(node: Statement, additionalModifierFlags: ModifierFlags) {
                    if (canHaveModifiers(node)) {
                        let newModifierFlags: ModifierFlags = ModifierFlags.None;
                        if (additionalModifierFlags & ModifierFlags.Export &&
                            context.enclosingDeclaration &&
                            (isExportingScope(context.enclosingDeclaration) || isModuleDeclaration(context.enclosingDeclaration)) &&
                            canHaveExportModifier(node)
                        ) {
                            // Classes, namespaces, variables, functions, interfaces, and types should all be `export`ed in a module context if not private
                            newModifierFlags |= ModifierFlags.Export;
                        }
                        if (addingDeclare && !(newModifierFlags & ModifierFlags.Export) &&
                            (!context.enclosingDeclaration || !(context.enclosingDeclaration.flags & NodeFlags.Ambient)) &&
                            (isEnumDeclaration(node) || isVariableStatement(node) || isFunctionDeclaration(node) || isClassDeclaration(node) || isModuleDeclaration(node))) {
                            // Classes, namespaces, variables, enums, and functions all need `declare` modifiers to be valid in a declaration file top-level scope
                            newModifierFlags |= ModifierFlags.Ambient;
                        }
                        if ((additionalModifierFlags & ModifierFlags.Default) && (isClassDeclaration(node) || isInterfaceDeclaration(node) || isFunctionDeclaration(node))) {
                            newModifierFlags |= ModifierFlags.Default;
                        }
                        if (newModifierFlags) {
                            node = factory.updateModifiers(node, newModifierFlags | getEffectiveModifierFlags(node));
                        }
                    }
                    results.push(node);
                }

                function serializeTypeAlias(symbol: Symbol, symbolName: string, modifierFlags: ModifierFlags) {
                    const aliasType = getDeclaredTypeOfTypeAlias(symbol);
                    const typeParams = getSymbolLinks(symbol).typeParameters;
                    const typeParamDecls = map(typeParams, p => typeParameterToDeclaration(p, context));
                    const jsdocAliasDecl = find(symbol.declarations, isJSDocTypeAlias);
                    const commentText = jsdocAliasDecl ? jsdocAliasDecl.comment || jsdocAliasDecl.parent.comment : undefined;
                    const oldFlags = context.flags;
                    context.flags |= NodeBuilderFlags.InTypeAlias;
                    addResult(setSyntheticLeadingComments(
                        factory.createTypeAliasDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, getInternalSymbolName(symbol, symbolName), typeParamDecls, typeToTypeNodeHelper(aliasType, context)),
                        !commentText ? [] : [{ kind: SyntaxKind.MultiLineCommentTrivia, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]
                    ), modifierFlags);
                    context.flags = oldFlags;
                }

                function serializeInterface(symbol: Symbol, symbolName: string, modifierFlags: ModifierFlags) {
                    const interfaceType = getDeclaredTypeOfClassOrInterface(symbol);
                    const localParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                    const typeParamDecls = map(localParams, p => typeParameterToDeclaration(p, context));
                    const baseTypes = getBaseTypes(interfaceType);
                    const baseType = length(baseTypes) ? getIntersectionType(baseTypes) : undefined;
                    const members = flatMap<Symbol, TypeElement>(getPropertiesOfType(interfaceType), p => serializePropertySymbolForInterface(p, baseType));
                    const callSignatures = serializeSignatures(SignatureKind.Call, interfaceType, baseType, SyntaxKind.CallSignature) as CallSignatureDeclaration[];
                    const constructSignatures = serializeSignatures(SignatureKind.Construct, interfaceType, baseType, SyntaxKind.ConstructSignature) as ConstructSignatureDeclaration[];
                    const indexSignatures = serializeIndexSignatures(interfaceType, baseType);

                    const heritageClauses = !length(baseTypes) ? undefined : [factory.createHeritageClause(SyntaxKind.ExtendsKeyword, mapDefined(baseTypes, b => trySerializeAsTypeReference(b, SymbolFlags.Value)))];
                    addResult(factory.createInterfaceDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        getInternalSymbolName(symbol, symbolName),
                        typeParamDecls,
                        heritageClauses,
                        [...indexSignatures, ...constructSignatures, ...callSignatures, ...members]
                    ), modifierFlags);
                }

                function getNamespaceMembersForSerialization(symbol: Symbol) {
                    return !symbol.exports ? [] : filter(arrayFrom(symbol.exports.values()), isNamespaceMember);
                }

                function isTypeOnlyNamespace(symbol: Symbol) {
                    return every(getNamespaceMembersForSerialization(symbol), m => !(resolveSymbol(m).flags & SymbolFlags.Value));
                }

                function serializeModule(symbol: Symbol, symbolName: string, modifierFlags: ModifierFlags) {
                    const members = getNamespaceMembersForSerialization(symbol);
                    // Split NS members up by declaration - members whose parent symbol is the ns symbol vs those whose is not (but were added in later via merging)
                    const locationMap = arrayToMultiMap(members, m => m.parent && m.parent === symbol ? "real" : "merged");
                    const realMembers = locationMap.get("real") || emptyArray;
                    const mergedMembers = locationMap.get("merged") || emptyArray;
                    // TODO: `suppressNewPrivateContext` is questionable -we need to simply be emitting privates in whatever scope they were declared in, rather
                    // than whatever scope we traverse to them in. That's a bit of a complex rewrite, since we're not _actually_ tracking privates at all in advance,
                    // so we don't even have placeholders to fill in.
                    if (length(realMembers)) {
                        const localName = getInternalSymbolName(symbol, symbolName);
                        serializeAsNamespaceDeclaration(realMembers, localName, modifierFlags, !!(symbol.flags & (SymbolFlags.Function | SymbolFlags.Assignment)));
                    }
                    if (length(mergedMembers)) {
                        const containingFile = getSourceFileOfNode(context.enclosingDeclaration);
                        const localName = getInternalSymbolName(symbol, symbolName);
                        const nsBody = factory.createModuleBlock([factory.createExportDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports(mapDefined(filter(mergedMembers, n => n.escapedName !== InternalSymbolName.ExportEquals), s => {
                                const name = unescapeLeadingUnderscores(s.escapedName);
                                const localName = getInternalSymbolName(s, name);
                                const aliasDecl = s.declarations && getDeclarationOfAliasSymbol(s);
                                if (containingFile && (aliasDecl ? containingFile !== getSourceFileOfNode(aliasDecl) : !some(s.declarations, d => getSourceFileOfNode(d) === containingFile))) {
                                    context.tracker?.reportNonlocalAugmentation?.(containingFile, symbol, s);
                                    return undefined;
                                }
                                const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, /*dontRecursivelyResolve*/ true);
                                includePrivateSymbol(target || s);
                                const targetName = target ? getInternalSymbolName(target, unescapeLeadingUnderscores(target.escapedName)) : localName;
                                return factory.createExportSpecifier(name === targetName ? undefined : targetName, name);
                            }))
                        )]);
                        addResult(factory.createModuleDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            factory.createIdentifier(localName),
                            nsBody,
                            NodeFlags.Namespace
                        ), ModifierFlags.None);
                    }
                }

                function serializeEnum(symbol: Symbol, symbolName: string, modifierFlags: ModifierFlags) {
                    addResult(factory.createEnumDeclaration(
                        /*decorators*/ undefined,
                        factory.createModifiersFromModifierFlags(isConstEnumSymbol(symbol) ? ModifierFlags.Const : 0),
                        getInternalSymbolName(symbol, symbolName),
                        map(filter(getPropertiesOfType(getTypeOfSymbol(symbol)), p => !!(p.flags & SymbolFlags.EnumMember)), p => {
                            // TODO: Handle computed names
                            // I hate that to get the initialized value we need to walk back to the declarations here; but there's no
                            // other way to get the possible const value of an enum member that I'm aware of, as the value is cached
                            // _on the declaration_, not on the declaration's symbol...
                            const initializedValue = p.declarations && p.declarations[0] && isEnumMember(p.declarations[0]) ? getConstantValue(p.declarations[0] as EnumMember) : undefined;
                            return factory.createEnumMember(unescapeLeadingUnderscores(p.escapedName), initializedValue === undefined ? undefined :
                                typeof initializedValue === "string" ? factory.createStringLiteral(initializedValue) :
                                factory.createNumericLiteral(initializedValue));
                        })
                    ), modifierFlags);
                }

                function serializeAsFunctionNamespaceMerge(type: Type, symbol: Symbol, localName: string, modifierFlags: ModifierFlags) {
                    const signatures = getSignaturesOfType(type, SignatureKind.Call);
                    for (const sig of signatures) {
                        // Each overload becomes a separate function declaration, in order
                        const decl = signatureToSignatureDeclarationHelper(sig, SyntaxKind.FunctionDeclaration, context, { name: factory.createIdentifier(localName), privateSymbolVisitor: includePrivateSymbol, bundledImports: bundled }) as FunctionDeclaration;
                        // for expressions assigned to `var`s, use the `var` as the text range
                        addResult(setTextRange(decl, sig.declaration && isVariableDeclaration(sig.declaration.parent) && sig.declaration.parent.parent || sig.declaration), modifierFlags);
                    }
                    // Module symbol emit will take care of module-y members, provided it has exports
                    if (!(symbol.flags & (SymbolFlags.ValueModule | SymbolFlags.NamespaceModule) && !!symbol.exports && !!symbol.exports.size)) {
                        const props = filter(getPropertiesOfType(type), isNamespaceMember);
                        serializeAsNamespaceDeclaration(props, localName, modifierFlags, /*suppressNewPrivateContext*/ true);
                    }
                }

                function serializeAsNamespaceDeclaration(props: readonly Symbol[], localName: string, modifierFlags: ModifierFlags, suppressNewPrivateContext: boolean) {
                    if (length(props)) {
                        const localVsRemoteMap = arrayToMultiMap(props, p =>
                            !length(p.declarations) || some(p.declarations, d =>
                                getSourceFileOfNode(d) === getSourceFileOfNode(context.enclosingDeclaration!)
                            ) ? "local" : "remote"
                        );
                        const localProps = localVsRemoteMap.get("local") || emptyArray;
                        // handle remote props first - we need to make an `import` declaration that points at the module containing each remote
                        // prop in the outermost scope (TODO: a namespace within a namespace would need to be appropriately handled by this)
                        // Example:
                        // import Foo_1 = require("./exporter");
                        // export namespace ns {
                        //     import Foo = Foo_1.Foo;
                        //     export { Foo };
                        //     export const c: number;
                        // }
                        // This is needed because in JS, statements like `const x = require("./f")` support both type and value lookup, even if they're
                        // normally just value lookup (so it functions kinda like an alias even when it's not an alias)
                        // _Usually_, we'll simply print the top-level as an alias instead of a `var` in such situations, however is is theoretically
                        // possible to encounter a situation where a type has members from both the current file and other files - in those situations,
                        // emit akin to the above would be needed.

                        // Add a namespace
                        // Create namespace as non-synthetic so it is usable as an enclosing declaration
                        let fakespace = parseNodeFactory.createModuleDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, factory.createIdentifier(localName), factory.createModuleBlock([]), NodeFlags.Namespace);
                        setParent(fakespace, enclosingDeclaration as SourceFile | NamespaceDeclaration);
                        fakespace.locals = createSymbolTable(props);
                        fakespace.symbol = props[0].parent!;

                        const oldResults = results;
                        results = [];
                        const oldAddingDeclare = addingDeclare;
                        addingDeclare = false;
                        const subcontext = { ...context, enclosingDeclaration: fakespace };
                        const oldContext = context;
                        context = subcontext;
                        // TODO: implement handling for the localVsRemoteMap.get("remote") - should be difficult to trigger (see comment above), as only interesting cross-file js merges should make this possible
                        visitSymbolTable(createSymbolTable(localProps), suppressNewPrivateContext, /*propertyAsAlias*/ true);
                        context = oldContext;
                        addingDeclare = oldAddingDeclare;
                        const declarations = results;
                        results = oldResults;
                        // replace namespace with synthetic version
                        const defaultReplaced = map(declarations, d => isExportAssignment(d) && !d.isExportEquals && isIdentifier(d.expression) ? factory.createExportDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports([factory.createExportSpecifier(d.expression, factory.createIdentifier(InternalSymbolName.Default))])
                        ) : d);
                        const exportModifierStripped = every(defaultReplaced, d => hasSyntacticModifier(d, ModifierFlags.Export)) ? map(defaultReplaced, removeExportModifier) : defaultReplaced;
                        fakespace = factory.updateModuleDeclaration(
                            fakespace,
                            fakespace.decorators,
                            fakespace.modifiers,
                            fakespace.name,
                            factory.createModuleBlock(exportModifierStripped));
                        addResult(fakespace, modifierFlags); // namespaces can never be default exported
                    }
                }

                function isNamespaceMember(p: Symbol) {
                    return !!(p.flags & (SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias)) ||
                        !(p.flags & SymbolFlags.Prototype || p.escapedName === "prototype" || p.valueDeclaration && isClassLike(p.valueDeclaration.parent));
                }

                function serializeAsClass(symbol: Symbol, localName: string, modifierFlags: ModifierFlags) {
                    const localParams = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                    const typeParamDecls = map(localParams, p => typeParameterToDeclaration(p, context));
                    const classType = getDeclaredTypeOfClassOrInterface(symbol);
                    const baseTypes = getBaseTypes(classType);
                    const implementsExpressions = mapDefined(getImplementsTypes(classType), serializeImplementedType);
                    const staticType = getTypeOfSymbol(symbol);
                    const isClass = !!staticType.symbol?.valueDeclaration && isClassLike(staticType.symbol.valueDeclaration);
                    const staticBaseType = isClass
                        ? getBaseConstructorTypeOfClass(staticType as InterfaceType)
                        : anyType;
                    const heritageClauses = [
                        ...!length(baseTypes) ? [] : [factory.createHeritageClause(SyntaxKind.ExtendsKeyword, map(baseTypes, b => serializeBaseType(b, staticBaseType, localName)))],
                        ...!length(implementsExpressions) ? [] : [factory.createHeritageClause(SyntaxKind.ImplementsKeyword, implementsExpressions)]
                    ];
                    const symbolProps = getNonInterhitedProperties(classType, baseTypes, getPropertiesOfType(classType));
                    const publicSymbolProps = filter(symbolProps, s => {
                        // `valueDeclaration` could be undefined if inherited from
                        // a union/intersection base type, but inherited properties
                        // don't matter here.
                        const valueDecl = s.valueDeclaration;
                        return valueDecl && !(isNamedDeclaration(valueDecl) && isPrivateIdentifier(valueDecl.name));
                    });
                    const hasPrivateIdentifier = some(symbolProps, s => {
                        // `valueDeclaration` could be undefined if inherited from
                        // a union/intersection base type, but inherited properties
                        // don't matter here.
                        const valueDecl = s.valueDeclaration;
                        return valueDecl && isNamedDeclaration(valueDecl) && isPrivateIdentifier(valueDecl.name);
                    });
                    // Boil down all private properties into a single one.
                    const privateProperties = hasPrivateIdentifier ?
                        [factory.createPropertyDeclaration(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            factory.createPrivateIdentifier("#private"),
                            /*questionOrExclamationToken*/ undefined,
                            /*type*/ undefined,
                            /*initializer*/ undefined,
                        )] :
                        emptyArray;
                    const publicProperties = flatMap<Symbol, ClassElement>(publicSymbolProps, p => serializePropertySymbolForClass(p, /*isStatic*/ false, baseTypes[0]));
                    // Consider static members empty if symbol also has function or module meaning - function namespacey emit will handle statics
                    const staticMembers = flatMap(
                        filter(getPropertiesOfType(staticType), p => !(p.flags & SymbolFlags.Prototype) && p.escapedName !== "prototype" && !isNamespaceMember(p)),
                        p => serializePropertySymbolForClass(p, /*isStatic*/ true, staticBaseType));
                    // When we encounter an `X.prototype.y` assignment in a JS file, we bind `X` as a class regardless as to whether
                    // the value is ever initialized with a class or function-like value. For cases where `X` could never be
                    // created via `new`, we will inject a `private constructor()` declaration to indicate it is not createable.
                    const isNonConstructableClassLikeInJsFile =
                        !isClass &&
                        !!symbol.valueDeclaration &&
                        isInJSFile(symbol.valueDeclaration) &&
                        !some(getSignaturesOfType(staticType, SignatureKind.Construct));
                    const constructors = isNonConstructableClassLikeInJsFile ?
                        [factory.createConstructorDeclaration(/*decorators*/ undefined, factory.createModifiersFromModifierFlags(ModifierFlags.Private), [], /*body*/ undefined)] :
                        serializeSignatures(SignatureKind.Construct, staticType, baseTypes[0], SyntaxKind.Constructor) as ConstructorDeclaration[];
                    const indexSignatures = serializeIndexSignatures(classType, baseTypes[0]);
                    addResult(setTextRange(factory.createClassDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        localName,
                        typeParamDecls,
                        heritageClauses,
                        [...indexSignatures, ...staticMembers, ...constructors, ...publicProperties, ...privateProperties]
                    ), symbol.declarations && filter(symbol.declarations, d => isClassDeclaration(d) || isClassExpression(d))[0]), modifierFlags);
                }

                function serializeAsAlias(symbol: Symbol, localName: string, modifierFlags: ModifierFlags) {
                    // synthesize an alias, eg `export { symbolName as Name }`
                    // need to mark the alias `symbol` points at
                    // as something we need to serialize as a private declaration as well
                    const node = getDeclarationOfAliasSymbol(symbol);
                    if (!node) return Debug.fail();
                    const target = getMergedSymbol(getTargetOfAliasDeclaration(node, /*dontRecursivelyResolve*/ true));
                    if (!target) {
                        return;
                    }
                    let verbatimTargetName = unescapeLeadingUnderscores(target.escapedName);
                    if (verbatimTargetName === InternalSymbolName.ExportEquals && (compilerOptions.esModuleInterop || compilerOptions.allowSyntheticDefaultImports)) {
                        // target refers to an `export=` symbol that was hoisted into a synthetic default - rename here to match
                        verbatimTargetName = InternalSymbolName.Default;
                    }
                    const targetName = getInternalSymbolName(target, verbatimTargetName);
                    includePrivateSymbol(target); // the target may be within the same scope - attempt to serialize it first
                    switch (node.kind) {
                        case SyntaxKind.VariableDeclaration:
                            // commonjs require: const x = require('y')
                            if (isPropertyAccessExpression((node as VariableDeclaration).initializer!)) {
                                // const x = require('y').z
                                const initializer = (node as VariableDeclaration).initializer! as PropertyAccessExpression; // require('y').z
                                const uniqueName = factory.createUniqueName((getExternalModuleRequireArgument(node) as StringLiteral).text); // _y
                                const specifier = getSpecifierForModuleSymbol(target.parent || target, context); // 'y'
                                // import _y = require('y');
                                addResult(factory.createImportEqualsDeclaration(
                                    /*decorators*/ undefined,
                                    /*modifiers*/ undefined,
                                    uniqueName,
                                    factory.createExternalModuleReference(factory.createStringLiteral(specifier))
                                ), ModifierFlags.None);
                                // import x = _y.z
                                addResult(factory.createImportEqualsDeclaration(
                                    /*decorators*/ undefined,
                                    /*modifiers*/ undefined,
                                    factory.createIdentifier(localName),
                                    factory.createQualifiedName(uniqueName, initializer.name as Identifier),
                                ), modifierFlags);
                                break;
                            }
                            // else fall through and treat commonjs require just like import=
                        case SyntaxKind.ImportEqualsDeclaration:
                             if (target.escapedName === InternalSymbolName.ExportEquals) {
                                serializeMaybeAliasAssignment(symbol);
                                break;
                            }
                            // Could be a local `import localName = ns.member` or
                            // an external `import localName = require("whatever")`
                            const isLocalImport = !(target.flags & SymbolFlags.ValueModule) && !isVariableDeclaration(node);
                            addResult(factory.createImportEqualsDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                factory.createIdentifier(localName),
                                isLocalImport
                                    ? symbolToName(target, context, SymbolFlags.All, /*expectsIdentifier*/ false)
                                    : factory.createExternalModuleReference(factory.createStringLiteral(getSpecifierForModuleSymbol(target, context)))
                            ), isLocalImport ? modifierFlags : ModifierFlags.None);
                            break;
                        case SyntaxKind.NamespaceExportDeclaration:
                            // export as namespace foo
                            // TODO: Not part of a file's local or export symbol tables
                            // Is bound into file.symbol.globalExports instead, which we don't currently traverse
                            addResult(factory.createNamespaceExportDeclaration(idText((node as NamespaceExportDeclaration).name)), ModifierFlags.None);
                            break;
                        case SyntaxKind.ImportClause:
                            addResult(factory.createImportDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                factory.createImportClause(/*isTypeOnly*/ false, factory.createIdentifier(localName), /*namedBindings*/ undefined),
                                // We use `target.parent || target` below as `target.parent` is unset when the target is a module which has been export assigned
                                // And then made into a default by the `esModuleInterop` or `allowSyntheticDefaultImports` flag
                                // In such cases, the `target` refers to the module itself already
                                factory.createStringLiteral(getSpecifierForModuleSymbol(target.parent || target, context))
                            ), ModifierFlags.None);
                            break;
                        case SyntaxKind.NamespaceImport:
                            addResult(factory.createImportDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                factory.createImportClause(/*isTypeOnly*/ false, /*importClause*/ undefined, factory.createNamespaceImport(factory.createIdentifier(localName))),
                                factory.createStringLiteral(getSpecifierForModuleSymbol(target, context))
                            ), ModifierFlags.None);
                            break;
                        case SyntaxKind.NamespaceExport:
                            addResult(factory.createExportDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                /*isTypeOnly*/ false,
                                factory.createNamespaceExport(factory.createIdentifier(localName)),
                                factory.createStringLiteral(getSpecifierForModuleSymbol(target, context))
                            ), ModifierFlags.None);
                            break;
                        case SyntaxKind.ImportSpecifier:
                            addResult(factory.createImportDeclaration(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                factory.createImportClause(
                                    /*isTypeOnly*/ false,
                                    /*importClause*/ undefined,
                                    factory.createNamedImports([
                                        factory.createImportSpecifier(
                                            localName !== verbatimTargetName ? factory.createIdentifier(verbatimTargetName) : undefined,
                                            factory.createIdentifier(localName)
                                        )
                                    ])),
                                factory.createStringLiteral(getSpecifierForModuleSymbol(target.parent || target, context))
                            ), ModifierFlags.None);
                            break;
                        case SyntaxKind.ExportSpecifier:
                            // does not use localName because the symbol name in this case refers to the name in the exports table,
                            // which we must exactly preserve
                            const specifier = (node.parent.parent as ExportDeclaration).moduleSpecifier;
                            // targetName is only used when the target is local, as otherwise the target is an alias that points at
                            // another file
                            serializeExportSpecifier(
                                unescapeLeadingUnderscores(symbol.escapedName),
                                specifier ? verbatimTargetName : targetName,
                                specifier && isStringLiteralLike(specifier) ? factory.createStringLiteral(specifier.text) : undefined
                            );
                            break;
                        case SyntaxKind.ExportAssignment:
                            serializeMaybeAliasAssignment(symbol);
                            break;
                        case SyntaxKind.BinaryExpression:
                        case SyntaxKind.PropertyAccessExpression:
                            // Could be best encoded as though an export specifier or as though an export assignment
                            // If name is default or export=, do an export assignment
                            // Otherwise do an export specifier
                            if (symbol.escapedName === InternalSymbolName.Default || symbol.escapedName === InternalSymbolName.ExportEquals) {
                                serializeMaybeAliasAssignment(symbol);
                            }
                            else {
                                serializeExportSpecifier(localName, targetName);
                            }
                            break;
                        default:
                            return Debug.failBadSyntaxKind(node, "Unhandled alias declaration kind in symbol serializer!");
                    }
                }

                function serializeExportSpecifier(localName: string, targetName: string, specifier?: Expression) {
                    addResult(factory.createExportDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*isTypeOnly*/ false,
                        factory.createNamedExports([factory.createExportSpecifier(localName !== targetName ? targetName : undefined, localName)]),
                        specifier
                    ), ModifierFlags.None);
                }

                /**
                 * Returns `true` if an export assignment or declaration was produced for the symbol
                 */
                function serializeMaybeAliasAssignment(symbol: Symbol): boolean {
                    if (symbol.flags & SymbolFlags.Prototype) {
                        return false;
                    }
                    const name = unescapeLeadingUnderscores(symbol.escapedName);
                    const isExportEquals = name === InternalSymbolName.ExportEquals;
                    const isDefault = name === InternalSymbolName.Default;
                    const isExportAssignment = isExportEquals || isDefault;
                    // synthesize export = ref
                    // ref should refer to either be a locally scoped symbol which we need to emit, or
                    // a reference to another namespace/module which we may need to emit an `import` statement for
                    const aliasDecl = symbol.declarations && getDeclarationOfAliasSymbol(symbol);
                    // serialize what the alias points to, preserve the declaration's initializer
                    const target = aliasDecl && getTargetOfAliasDeclaration(aliasDecl, /*dontRecursivelyResolve*/ true);
                    // If the target resolves and resolves to a thing defined in this file, emit as an alias, otherwise emit as a const
                    if (target && length(target.declarations) && some(target.declarations, d => getSourceFileOfNode(d) === getSourceFileOfNode(enclosingDeclaration))) {
                        // In case `target` refers to a namespace member, look at the declaration and serialize the leftmost symbol in it
                        // eg, `namespace A { export class B {} }; exports = A.B;`
                        // Technically, this is all that's required in the case where the assignment is an entity name expression
                        const expr = isExportAssignment ? getExportAssignmentExpression(aliasDecl as ExportAssignment | BinaryExpression) : getPropertyAssignmentAliasLikeExpression(aliasDecl as ShorthandPropertyAssignment | PropertyAssignment | PropertyAccessExpression);
                        const first = isEntityNameExpression(expr) ? getFirstNonModuleExportsIdentifier(expr) : undefined;
                        const referenced = first && resolveEntityName(first, SymbolFlags.All, /*ignoreErrors*/ true, /*dontResolveAlias*/ true, enclosingDeclaration);
                        if (referenced || target) {
                            includePrivateSymbol(referenced || target);
                        }

                        // We disable the context's symbol tracker for the duration of this name serialization
                        // as, by virtue of being here, the name is required to print something, and we don't want to
                        // issue a visibility error on it. Only anonymous classes that an alias points at _would_ issue
                        // a visibility error here (as they're not visible within any scope), but we want to hoist them
                        // into the containing scope anyway, so we want to skip the visibility checks.
                        const oldTrack = context.tracker.trackSymbol;
                        context.tracker.trackSymbol = noop;
                        if (isExportAssignment) {
                            results.push(factory.createExportAssignment(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                isExportEquals,
                                symbolToExpression(target, context, SymbolFlags.All)
                            ));
                        }
                        else {
                            if (first === expr) {
                                // serialize as `export {target as name}`
                                serializeExportSpecifier(name, idText(first));
                            }
                            else if (isClassExpression(expr)) {
                                serializeExportSpecifier(name, getInternalSymbolName(target, symbolName(target)));
                            }
                            else {
                                // serialize as `import _Ref = t.arg.et; export { _Ref as name }`
                                const varName = getUnusedName(name, symbol);
                                addResult(factory.createImportEqualsDeclaration(
                                    /*decorators*/ undefined,
                                    /*modifiers*/ undefined,
                                    factory.createIdentifier(varName),
                                    symbolToName(target, context, SymbolFlags.All, /*expectsIdentifier*/ false)
                                ), ModifierFlags.None);
                                serializeExportSpecifier(name, varName);
                            }
                        }
                        context.tracker.trackSymbol = oldTrack;
                        return true;
                    }
                    else {
                        // serialize as an anonymous property declaration
                        const varName = getUnusedName(name, symbol);
                        // We have to use `getWidenedType` here since the object within a json file is unwidened within the file
                        // (Unwidened types can only exist in expression contexts and should never be serialized)
                        const typeToSerialize = getWidenedType(getTypeOfSymbol(getMergedSymbol(symbol)));
                        if (isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize, symbol)) {
                            // If there are no index signatures and `typeToSerialize` is an object type, emit as a namespace instead of a const
                            serializeAsFunctionNamespaceMerge(typeToSerialize, symbol, varName, isExportAssignment ? ModifierFlags.None : ModifierFlags.Export);
                        }
                        else {
                            const statement = factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([
                                factory.createVariableDeclaration(varName, /*exclamationToken*/ undefined, serializeTypeForDeclaration(context, typeToSerialize, symbol, enclosingDeclaration, includePrivateSymbol, bundled))
                            ], NodeFlags.Const));
                            // Inlined JSON types exported with [module.]exports= will already emit an export=, so should use `declare`.
                            // Otherwise, the type itself should be exported.
                            addResult(statement,
                                target && target.flags & SymbolFlags.Property && target.escapedName === InternalSymbolName.ExportEquals ? ModifierFlags.Ambient
                                : name === varName ? ModifierFlags.Export
                                : ModifierFlags.None);
                        }
                        if (isExportAssignment) {
                            results.push(factory.createExportAssignment(
                                /*decorators*/ undefined,
                                /*modifiers*/ undefined,
                                isExportEquals,
                                factory.createIdentifier(varName)
                            ));
                            return true;
                        }
                        else if (name !== varName) {
                            serializeExportSpecifier(name, varName);
                            return true;
                        }
                        return false;
                    }
                }

                function isTypeRepresentableAsFunctionNamespaceMerge(typeToSerialize: Type, hostSymbol: Symbol) {
                    // Only object types which are not constructable, or indexable, whose members all come from the
                    // context source file, and whose property names are all valid identifiers and not late-bound, _and_
                    // whose input is not type annotated (if the input symbol has an annotation we can reuse, we should prefer it)
                    const ctxSrc = getSourceFileOfNode(context.enclosingDeclaration);
                    return getObjectFlags(typeToSerialize) & (ObjectFlags.Anonymous | ObjectFlags.Mapped) &&
                    !getIndexInfoOfType(typeToSerialize, IndexKind.String) &&
                    !getIndexInfoOfType(typeToSerialize, IndexKind.Number) &&
                    !!(length(getPropertiesOfType(typeToSerialize)) || length(getSignaturesOfType(typeToSerialize, SignatureKind.Call))) &&
                    !length(getSignaturesOfType(typeToSerialize, SignatureKind.Construct)) && // TODO: could probably serialize as function + ns + class, now that that's OK
                    !getDeclarationWithTypeAnnotation(hostSymbol, enclosingDeclaration) &&
                    !(typeToSerialize.symbol && some(typeToSerialize.symbol.declarations, d => getSourceFileOfNode(d) !== ctxSrc)) &&
                    !some(getPropertiesOfType(typeToSerialize), p => isLateBoundName(p.escapedName)) &&
                    !some(getPropertiesOfType(typeToSerialize), p => some(p.declarations, d => getSourceFileOfNode(d) !== ctxSrc)) &&
                    every(getPropertiesOfType(typeToSerialize), p => isIdentifierText(symbolName(p), languageVersion));
                }

                function makeSerializePropertySymbol<T extends Node>(createProperty: (
                    decorators: readonly Decorator[] | undefined,
                    modifiers: readonly Modifier[] | undefined,
                    name: string | PropertyName,
                    questionOrExclamationToken: QuestionToken | undefined,
                    type: TypeNode | undefined,
                    initializer: Expression | undefined
                ) => T, methodKind: SignatureDeclaration["kind"], useAccessors: true): (p: Symbol, isStatic: boolean, baseType: Type | undefined) => (T | AccessorDeclaration | (T | AccessorDeclaration)[]);
                function makeSerializePropertySymbol<T extends Node>(createProperty: (
                    decorators: readonly Decorator[] | undefined,
                    modifiers: readonly Modifier[] | undefined,
                    name: string | PropertyName,
                    questionOrExclamationToken: QuestionToken | undefined,
                    type: TypeNode | undefined,
                    initializer: Expression | undefined
                ) => T, methodKind: SignatureDeclaration["kind"], useAccessors: false): (p: Symbol, isStatic: boolean, baseType: Type | undefined) => (T | T[]);
                function makeSerializePropertySymbol<T extends Node>(createProperty: (
                    decorators: readonly Decorator[] | undefined,
                    modifiers: readonly Modifier[] | undefined,
                    name: string | PropertyName,
                    questionOrExclamationToken: QuestionToken | undefined,
                    type: TypeNode | undefined,
                    initializer: Expression | undefined
                ) => T, methodKind: SignatureDeclaration["kind"], useAccessors: boolean): (p: Symbol, isStatic: boolean, baseType: Type | undefined) => (T | AccessorDeclaration | (T | AccessorDeclaration)[]) {
                    return function serializePropertySymbol(p: Symbol, isStatic: boolean, baseType: Type | undefined): (T | AccessorDeclaration | (T | AccessorDeclaration)[]) {
                        const modifierFlags = getDeclarationModifierFlagsFromSymbol(p);
                        const isPrivate = !!(modifierFlags & ModifierFlags.Private);
                        if (isStatic && (p.flags & (SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias))) {
                            // Only value-only-meaning symbols can be correctly encoded as class statics, type/namespace/alias meaning symbols
                            // need to be merged namespace members
                            return [];
                        }
                        if (p.flags & SymbolFlags.Prototype ||
                            (baseType && getPropertyOfType(baseType, p.escapedName)
                             && isReadonlySymbol(getPropertyOfType(baseType, p.escapedName)!) === isReadonlySymbol(p)
                             && (p.flags & SymbolFlags.Optional) === (getPropertyOfType(baseType, p.escapedName)!.flags & SymbolFlags.Optional)
                             && isTypeIdenticalTo(getTypeOfSymbol(p), getTypeOfPropertyOfType(baseType, p.escapedName)!))) {
                            return [];
                        }
                        const flag = (modifierFlags & ~ModifierFlags.Async) | (isStatic ? ModifierFlags.Static : 0);
                        const name = getPropertyNameNodeForSymbol(p, context);
                        const firstPropertyLikeDecl = find(p.declarations, or(isPropertyDeclaration, isAccessor, isVariableDeclaration, isPropertySignature, isBinaryExpression, isPropertyAccessExpression));
                        if (p.flags & SymbolFlags.Accessor && useAccessors) {
                            const result: AccessorDeclaration[] = [];
                            if (p.flags & SymbolFlags.SetAccessor) {
                                result.push(setTextRange(factory.createSetAccessorDeclaration(
                                    /*decorators*/ undefined,
                                    factory.createModifiersFromModifierFlags(flag),
                                    name,
                                    [factory.createParameterDeclaration(
                                        /*decorators*/ undefined,
                                        /*modifiers*/ undefined,
                                        /*dotDotDotToken*/ undefined,
                                        "arg",
                                        /*questionToken*/ undefined,
                                        isPrivate ? undefined : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled)
                                    )],
                                    /*body*/ undefined
                                ), find(p.declarations, isSetAccessor) || firstPropertyLikeDecl));
                            }
                            if (p.flags & SymbolFlags.GetAccessor) {
                                const isPrivate = modifierFlags & ModifierFlags.Private;
                                result.push(setTextRange(factory.createGetAccessorDeclaration(
                                    /*decorators*/ undefined,
                                    factory.createModifiersFromModifierFlags(flag),
                                    name,
                                    [],
                                    isPrivate ? undefined : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled),
                                    /*body*/ undefined
                                ), find(p.declarations, isGetAccessor) || firstPropertyLikeDecl));
                            }
                            return result;
                        }
                        // This is an else/if as accessors and properties can't merge in TS, but might in JS
                        // If this happens, we assume the accessor takes priority, as it imposes more constraints
                        else if (p.flags & (SymbolFlags.Property | SymbolFlags.Variable)) {
                            return setTextRange(createProperty(
                                /*decorators*/ undefined,
                                factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? ModifierFlags.Readonly : 0) | flag),
                                name,
                                p.flags & SymbolFlags.Optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                                isPrivate ? undefined : serializeTypeForDeclaration(context, getTypeOfSymbol(p), p, enclosingDeclaration, includePrivateSymbol, bundled),
                                // TODO: https://github.com/microsoft/TypeScript/pull/32372#discussion_r328386357
                                // interface members can't have initializers, however class members _can_
                                /*initializer*/ undefined
                            ), find(p.declarations, or(isPropertyDeclaration, isVariableDeclaration)) || firstPropertyLikeDecl);
                        }
                        if (p.flags & (SymbolFlags.Method | SymbolFlags.Function)) {
                            const type = getTypeOfSymbol(p);
                            const signatures = getSignaturesOfType(type, SignatureKind.Call);
                            if (flag & ModifierFlags.Private) {
                                return setTextRange(createProperty(
                                    /*decorators*/ undefined,
                                    factory.createModifiersFromModifierFlags((isReadonlySymbol(p) ? ModifierFlags.Readonly : 0) | flag),
                                    name,
                                    p.flags & SymbolFlags.Optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                                    /*type*/ undefined,
                                    /*initializer*/ undefined
                                ), find(p.declarations, isFunctionLikeDeclaration) || signatures[0] && signatures[0].declaration || p.declarations[0]);
                            }

                            const results = [];
                            for (const sig of signatures) {
                                // Each overload becomes a separate method declaration, in order
                                const decl = signatureToSignatureDeclarationHelper(
                                    sig,
                                    methodKind,
                                    context,
                                    {
                                        name,
                                        questionToken: p.flags & SymbolFlags.Optional ? factory.createToken(SyntaxKind.QuestionToken) : undefined,
                                        modifiers: flag ? factory.createModifiersFromModifierFlags(flag) : undefined
                                    }
                                );
                                results.push(setTextRange(decl, sig.declaration));
                            }
                            return results as unknown as T[];
                        }
                        // The `Constructor`'s symbol isn't in the class's properties lists, obviously, since it's a signature on the static
                        return Debug.fail(`Unhandled class member kind! ${(p as any).__debugFlags || p.flags}`);
                    };
                }

                function serializePropertySymbolForInterface(p: Symbol, baseType: Type | undefined) {
                    return serializePropertySymbolForInterfaceWorker(p, /*isStatic*/ false, baseType);
                }

                function serializeSignatures(kind: SignatureKind, input: Type, baseType: Type | undefined, outputKind: SignatureDeclaration["kind"]) {
                    const signatures = getSignaturesOfType(input, kind);
                    if (kind === SignatureKind.Construct) {
                        if (!baseType && every(signatures, s => length(s.parameters) === 0)) {
                            return []; // No base type, every constructor is empty - elide the extraneous `constructor()`
                        }
                        if (baseType) {
                            // If there is a base type, if every signature in the class is identical to a signature in the baseType, elide all the declarations
                            const baseSigs = getSignaturesOfType(baseType, SignatureKind.Construct);
                            if (!length(baseSigs) && every(signatures, s => length(s.parameters) === 0)) {
                                return []; // Base had no explicit signatures, if all our signatures are also implicit, return an empty list
                            }
                            if (baseSigs.length === signatures.length) {
                                let failed = false;
                                for (let i = 0; i < baseSigs.length; i++) {
                                    if (!compareSignaturesIdentical(signatures[i], baseSigs[i], /*partialMatch*/ false, /*ignoreThisTypes*/ false, /*ignoreReturnTypes*/ true, compareTypesIdentical)) {
                                        failed = true;
                                        break;
                                    }
                                }
                                if (!failed) {
                                    return []; // Every signature was identical - elide constructor list as it is inherited
                                }
                            }
                        }
                        let privateProtected: ModifierFlags = 0;
                        for (const s of signatures) {
                            if (s.declaration) {
                                privateProtected |= getSelectedEffectiveModifierFlags(s.declaration, ModifierFlags.Private | ModifierFlags.Protected);
                            }
                        }
                        if (privateProtected) {
                            return [setTextRange(factory.createConstructorDeclaration(
                                /*decorators*/ undefined,
                                factory.createModifiersFromModifierFlags(privateProtected),
                                /*parameters*/ [],
                                /*body*/ undefined,
                            ), signatures[0].declaration)];
                        }
                    }

                    const results = [];
                    for (const sig of signatures) {
                        // Each overload becomes a separate constructor declaration, in order
                        const decl = signatureToSignatureDeclarationHelper(sig, outputKind, context);
                        results.push(setTextRange(decl, sig.declaration));
                    }
                    return results;
                }

                function serializeIndexSignatures(input: Type, baseType: Type | undefined) {
                    const results: IndexSignatureDeclaration[] = [];
                    for (const type of [IndexKind.String, IndexKind.Number]) {
                        const info = getIndexInfoOfType(input, type);
                        if (info) {
                            if (baseType) {
                                const baseInfo = getIndexInfoOfType(baseType, type);
                                if (baseInfo) {
                                    if (isTypeIdenticalTo(info.type, baseInfo.type)) {
                                        continue; // elide identical index signatures
                                    }
                                }
                            }
                            results.push(indexInfoToIndexSignatureDeclarationHelper(info, type, context, /*typeNode*/ undefined));
                        }
                    }
                    return results;
                }

                function serializeBaseType(t: Type, staticType: Type, rootName: string) {
                    const ref = trySerializeAsTypeReference(t, SymbolFlags.Value);
                    if (ref) {
                        return ref;
                    }
                    const tempName = getUnusedName(`${rootName}_base`);
                    const statement = factory.createVariableStatement(/*modifiers*/ undefined, factory.createVariableDeclarationList([
                        factory.createVariableDeclaration(tempName, /*exclamationToken*/ undefined, typeToTypeNodeHelper(staticType, context))
                    ], NodeFlags.Const));
                    addResult(statement, ModifierFlags.None);
                    return factory.createExpressionWithTypeArguments(factory.createIdentifier(tempName), /*typeArgs*/ undefined);
                }

                function trySerializeAsTypeReference(t: Type, flags: SymbolFlags) {
                    let typeArgs: TypeNode[] | undefined;
                    let reference: Expression | undefined;

                    // We don't use `isValueSymbolAccessible` below. since that considers alternative containers (like modules)
                    // which we can't write out in a syntactically valid way as an expression
                    if ((t as TypeReference).target && isSymbolAccessibleByFlags((t as TypeReference).target.symbol, enclosingDeclaration, flags)) {
                        typeArgs = map(getTypeArguments(t as TypeReference), t => typeToTypeNodeHelper(t, context));
                        reference = symbolToExpression((t as TypeReference).target.symbol, context, SymbolFlags.Type);
                    }
                    else if (t.symbol && isSymbolAccessibleByFlags(t.symbol, enclosingDeclaration, flags)) {
                        reference = symbolToExpression(t.symbol, context, SymbolFlags.Type);
                    }
                    if (reference) {
                        return factory.createExpressionWithTypeArguments(reference, typeArgs);
                    }
                }

                function serializeImplementedType(t: Type) {
                    const ref = trySerializeAsTypeReference(t, SymbolFlags.Type);
                    if (ref) {
                        return ref;
                    }
                    if (t.symbol) {
                        return factory.createExpressionWithTypeArguments(symbolToExpression(t.symbol, context, SymbolFlags.Type), /*typeArgs*/ undefined);
                    }
                }

                function getUnusedName(input: string, symbol?: Symbol): string {
                    const id = symbol ? getSymbolId(symbol) : undefined;
                    if (id) {
                        if (context.remappedSymbolNames!.has(id)) {
                            return context.remappedSymbolNames!.get(id)!;
                        }
                    }
                    if (symbol) {
                        input = getNameCandidateWorker(symbol, input);
                    }
                    let i = 0;
                    const original = input;
                    while (context.usedSymbolNames?.has(input)) {
                        i++;
                        input = `${original}_${i}`;
                    }
                    context.usedSymbolNames?.add(input);
                    if (id) {
                        context.remappedSymbolNames!.set(id, input);
                    }
                    return input;
                }

                function getNameCandidateWorker(symbol: Symbol, localName: string) {
                    if (localName === InternalSymbolName.Default || localName === InternalSymbolName.Class || localName === InternalSymbolName.Function) {
                        const flags = context.flags;
                        context.flags |= NodeBuilderFlags.InInitialEntityName;
                        const nameCandidate = getNameOfSymbolAsWritten(symbol, context);
                        context.flags = flags;
                        localName = nameCandidate.length > 0 && isSingleOrDoubleQuote(nameCandidate.charCodeAt(0)) ? stripQuotes(nameCandidate) : nameCandidate;
                    }
                    if (localName === InternalSymbolName.Default) {
                        localName = "_default";
                    }
                    else if (localName === InternalSymbolName.ExportEquals) {
                        localName = "_exports";
                    }
                    localName = isIdentifierText(localName, languageVersion) && !isStringANonContextualKeyword(localName) ? localName : "_" + localName.replace(/[^a-zA-Z0-9]/g, "_");
                    return localName;
                }

                function getInternalSymbolName(symbol: Symbol, localName: string) {
                    const id = getSymbolId(symbol);
                    if (context.remappedSymbolNames!.has(id)) {
                        return context.remappedSymbolNames!.get(id)!;
                    }
                    localName = getNameCandidateWorker(symbol, localName);
                    // The result of this is going to be used as the symbol's name - lock it in, so `getUnusedName` will also pick it up
                    context.remappedSymbolNames!.set(id, localName);
                    return localName;
                }
            }
        }

        function typePredicateToString(typePredicate: TypePredicate, enclosingDeclaration?: Node, flags: TypeFormatFlags = TypeFormatFlags.UseAliasDefinedOutsideCurrentScope, writer?: EmitTextWriter): string {
            return writer ? typePredicateToStringWorker(writer).getText() : usingSingleLineStringWriter(typePredicateToStringWorker);

            function typePredicateToStringWorker(writer: EmitTextWriter) {
                const predicate = factory.createTypePredicateNode(
                    typePredicate.kind === TypePredicateKind.AssertsThis || typePredicate.kind === TypePredicateKind.AssertsIdentifier ? factory.createToken(SyntaxKind.AssertsKeyword) : undefined,
                    typePredicate.kind === TypePredicateKind.Identifier || typePredicate.kind === TypePredicateKind.AssertsIdentifier ? factory.createIdentifier(typePredicate.parameterName) : factory.createThisTypeNode(),
                    typePredicate.type && nodeBuilder.typeToTypeNode(typePredicate.type, enclosingDeclaration, toNodeBuilderFlags(flags) | NodeBuilderFlags.IgnoreErrors | NodeBuilderFlags.WriteTypeParametersInQualifiedName)! // TODO: GH#18217
                );
                const printer = createPrinter({ removeComments: true });
                const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
                printer.writeNode(EmitHint.Unspecified, predicate, /*sourceFile*/ sourceFile, writer);
                return writer;
            }
        }

        function formatUnionTypes(types: readonly Type[]): Type[] {
            const result: Type[] = [];
            let flags: TypeFlags = 0;
            for (let i = 0; i < types.length; i++) {
                const t = types[i];
                flags |= t.flags;
                if (!(t.flags & TypeFlags.Nullable)) {
                    if (t.flags & (TypeFlags.BooleanLiteral | TypeFlags.EnumLiteral)) {
                        const baseType = t.flags & TypeFlags.BooleanLiteral ? booleanType : getBaseTypeOfEnumLiteralType(<LiteralType>t);
                        if (baseType.flags & TypeFlags.Union) {
                            const count = (<UnionType>baseType).types.length;
                            if (i + count <= types.length && getRegularTypeOfLiteralType(types[i + count - 1]) === getRegularTypeOfLiteralType((<UnionType>baseType).types[count - 1])) {
                                result.push(baseType);
                                i += count - 1;
                                continue;
                            }
                        }
                    }
                    result.push(t);
                }
            }
            if (flags & TypeFlags.Null) result.push(nullType);
            if (flags & TypeFlags.Undefined) result.push(undefinedType);
            return result || types;
        }

        function visibilityToString(flags: ModifierFlags): string | undefined {
            if (flags === ModifierFlags.Private) {
                return "private";
            }
            if (flags === ModifierFlags.Protected) {
                return "protected";
            }
            return "public";
        }

        function getTypeAliasForTypeLiteral(type: Type): Symbol | undefined {
            if (type.symbol && type.symbol.flags & SymbolFlags.TypeLiteral) {
                const node = walkUpParenthesizedTypes(type.symbol.declarations[0].parent);
                if (node.kind === SyntaxKind.TypeAliasDeclaration) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }

        function isTopLevelInExternalModuleAugmentation(node: Node): boolean {
            return node && node.parent &&
                node.parent.kind === SyntaxKind.ModuleBlock &&
                isExternalModuleAugmentation(node.parent.parent);
        }

        interface NodeBuilderContext {
            enclosingDeclaration: Node | undefined;
            flags: NodeBuilderFlags;
            tracker: SymbolTracker;

            // State
            encounteredError: boolean;
            visitedTypes: Set<number> | undefined;
            symbolDepth: ESMap<string, number> | undefined;
            inferTypeParameters: TypeParameter[] | undefined;
            approximateLength: number;
            truncating?: boolean;
            typeParameterSymbolList?: Set<number>;
            typeParameterNames?: ESMap<TypeId, Identifier>;
            typeParameterNamesByText?: Set<string>;
            usedSymbolNames?: Set<string>;
            remappedSymbolNames?: ESMap<SymbolId, string>;
        }

        function isDefaultBindingContext(location: Node) {
            return location.kind === SyntaxKind.SourceFile || isAmbientModule(location);
        }

        function getNameOfSymbolFromNameType(symbol: Symbol, context?: NodeBuilderContext) {
            const nameType = getSymbolLinks(symbol).nameType;
            if (nameType) {
                if (nameType.flags & TypeFlags.StringOrNumberLiteral) {
                    const name = "" + (<StringLiteralType | NumberLiteralType>nameType).value;
                    if (!isIdentifierText(name, compilerOptions.target) && !isNumericLiteralName(name)) {
                        return `"${escapeString(name, CharacterCodes.doubleQuote)}"`;
                    }
                    if (isNumericLiteralName(name) && startsWith(name, "-")) {
                        return `[${name}]`;
                    }
                    return name;
                }
                if (nameType.flags & TypeFlags.UniqueESSymbol) {
                    return `[${getNameOfSymbolAsWritten((<UniqueESSymbolType>nameType).symbol, context)}]`;
                }
            }
        }

        /**
         * Gets a human-readable name for a symbol.
         * Should *not* be used for the right-hand side of a `.` -- use `symbolName(symbol)` for that instead.
         *
         * Unlike `symbolName(symbol)`, this will include quotes if the name is from a string literal.
         * It will also use a representation of a number as written instead of a decimal form, e.g. `0o11` instead of `9`.
         */
        function getNameOfSymbolAsWritten(symbol: Symbol, context?: NodeBuilderContext): string {
            if (context && symbol.escapedName === InternalSymbolName.Default && !(context.flags & NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope) &&
                // If it's not the first part of an entity name, it must print as `default`
                (!(context.flags & NodeBuilderFlags.InInitialEntityName) ||
                // if the symbol is synthesized, it will only be referenced externally it must print as `default`
                !symbol.declarations ||
                // if not in the same binding context (source file, module declaration), it must print as `default`
                (context.enclosingDeclaration && findAncestor(symbol.declarations[0], isDefaultBindingContext) !== findAncestor(context.enclosingDeclaration, isDefaultBindingContext)))) {
                return "default";
            }
            if (symbol.declarations && symbol.declarations.length) {
                let declaration = firstDefined(symbol.declarations, d => getNameOfDeclaration(d) ? d : undefined); // Try using a declaration with a name, first
                const name = declaration && getNameOfDeclaration(declaration);
                if (declaration && name) {
                    if (isCallExpression(declaration) && isBindableObjectDefinePropertyCall(declaration)) {
                        return symbolName(symbol);
                    }
                    if (isComputedPropertyName(name) && !(getCheckFlags(symbol) & CheckFlags.Late)) {
                        const nameType = getSymbolLinks(symbol).nameType;
                        if (nameType && nameType.flags & TypeFlags.StringOrNumberLiteral) {
                            // Computed property name isn't late bound, but has a well-known name type - use name type to generate a symbol name
                            const result = getNameOfSymbolFromNameType(symbol, context);
                            if (result !== undefined) {
                                return result;
                            }
                        }
                    }
                    return declarationNameToString(name);
                }
                if (!declaration) {
                    declaration = symbol.declarations[0]; // Declaration may be nameless, but we'll try anyway
                }
                if (declaration.parent && declaration.parent.kind === SyntaxKind.VariableDeclaration) {
                    return declarationNameToString((<VariableDeclaration>declaration.parent).name);
                }
                switch (declaration.kind) {
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        if (context && !context.encounteredError && !(context.flags & NodeBuilderFlags.AllowAnonymousIdentifier)) {
                            context.encounteredError = true;
                        }
                        return declaration.kind === SyntaxKind.ClassExpression ? "(Anonymous class)" : "(Anonymous function)";
                }
            }
            const name = getNameOfSymbolFromNameType(symbol, context);
            return name !== undefined ? name : symbolName(symbol);
        }

        function isDeclarationVisible(node: Node): boolean {
            if (node) {
                const links = getNodeLinks(node);
                if (links.isVisible === undefined) {
                    links.isVisible = !!determineIfDeclarationIsVisible();
                }
                return links.isVisible;
            }

            return false;

            function determineIfDeclarationIsVisible() {
                switch (node.kind) {
                    case SyntaxKind.JSDocCallbackTag:
                    case SyntaxKind.JSDocTypedefTag:
                    case SyntaxKind.JSDocEnumTag:
                        // Top-level jsdoc type aliases are considered exported
                        // First parent is comment node, second is hosting declaration or token; we only care about those tokens or declarations whose parent is a source file
                        return !!(node.parent && node.parent.parent && node.parent.parent.parent && isSourceFile(node.parent.parent.parent));
                    case SyntaxKind.BindingElement:
                        return isDeclarationVisible(node.parent.parent);
                    case SyntaxKind.VariableDeclaration:
                        if (isBindingPattern((node as VariableDeclaration).name) &&
                            !((node as VariableDeclaration).name as BindingPattern).elements.length) {
                            // If the binding pattern is empty, this variable declaration is not visible
                            return false;
                        }
                        // falls through
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                        // external module augmentation is always visible
                        if (isExternalModuleAugmentation(node)) {
                            return true;
                        }
                        const parent = getDeclarationContainer(node);
                        // If the node is not exported or it is not ambient module element (except import declaration)
                        if (!(getCombinedModifierFlags(node as Declaration) & ModifierFlags.Export) &&
                            !(node.kind !== SyntaxKind.ImportEqualsDeclaration && parent.kind !== SyntaxKind.SourceFile && parent.flags & NodeFlags.Ambient)) {
                            return isGlobalSourceFile(parent);
                        }
                        // Exported members/ambient module elements (exception import declaration) are visible if parent is visible
                        return isDeclarationVisible(parent);

                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (hasEffectiveModifier(node, ModifierFlags.Private | ModifierFlags.Protected)) {
                            // Private/protected properties/methods are not visible
                            return false;
                        }
                        // Public properties/methods are visible if its parents are visible, so:
                        // falls through

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
                    case SyntaxKind.NamedTupleMember:
                        return isDeclarationVisible(node.parent);

                    // Default binding, import specifier and namespace import is visible
                    // only on demand so by default it is not visible
                    case SyntaxKind.ImportClause:
                    case SyntaxKind.NamespaceImport:
                    case SyntaxKind.ImportSpecifier:
                        return false;

                    // Type parameters are always visible
                    case SyntaxKind.TypeParameter:

                    // Source file and namespace export are always visible
                    // falls through
                    case SyntaxKind.SourceFile:
                    case SyntaxKind.NamespaceExportDeclaration:
                        return true;

                    // Export assignments do not create name bindings outside the module
                    case SyntaxKind.ExportAssignment:
                        return false;

                    default:
                        return false;
                }
            }
        }

        function collectLinkedAliases(node: Identifier, setVisibility?: boolean): Node[] | undefined {
            let exportSymbol: Symbol | undefined;
            if (node.parent && node.parent.kind === SyntaxKind.ExportAssignment) {
                exportSymbol = resolveName(node, node.escapedText, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias, /*nameNotFoundMessage*/ undefined, node, /*isUse*/ false);
            }
            else if (node.parent.kind === SyntaxKind.ExportSpecifier) {
                exportSymbol = getTargetOfExportSpecifier(<ExportSpecifier>node.parent, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias);
            }
            let result: Node[] | undefined;
            let visited: Set<number> | undefined;
            if (exportSymbol) {
                visited = new Set();
                visited.add(getSymbolId(exportSymbol));
                buildVisibleNodeList(exportSymbol.declarations);
            }
            return result;

            function buildVisibleNodeList(declarations: Declaration[]) {
                forEach(declarations, declaration => {
                    const resultNode = getAnyImportSyntax(declaration) || declaration;
                    if (setVisibility) {
                        getNodeLinks(declaration).isVisible = true;
                    }
                    else {
                        result = result || [];
                        pushIfUnique(result, resultNode);
                    }

                    if (isInternalModuleImportEqualsDeclaration(declaration)) {
                        // Add the referenced top container visible
                        const internalModuleReference = <Identifier | QualifiedName>declaration.moduleReference;
                        const firstIdentifier = getFirstIdentifier(internalModuleReference);
                        const importSymbol = resolveName(declaration, firstIdentifier.escapedText, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace,
                            undefined, undefined, /*isUse*/ false);
                        if (importSymbol && visited) {
                            if (tryAddToSet(visited, getSymbolId(importSymbol))) {
                                buildVisibleNodeList(importSymbol.declarations);
                            }
                        }
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

        function hasType(target: TypeSystemEntity, propertyName: TypeSystemPropertyName): boolean {
            switch (propertyName) {
                case TypeSystemPropertyName.Type:
                    return !!getSymbolLinks(<Symbol>target).type;
                case TypeSystemPropertyName.EnumTagType:
                    return !!(getNodeLinks(target as JSDocEnumTag).resolvedEnumType);
                case TypeSystemPropertyName.DeclaredType:
                    return !!getSymbolLinks(<Symbol>target).declaredType;
                case TypeSystemPropertyName.ResolvedBaseConstructorType:
                    return !!(<InterfaceType>target).resolvedBaseConstructorType;
                case TypeSystemPropertyName.ResolvedReturnType:
                    return !!(<Signature>target).resolvedReturnType;
                case TypeSystemPropertyName.ImmediateBaseConstraint:
                    return !!(<Type>target).immediateBaseConstraint;
                case TypeSystemPropertyName.ResolvedTypeArguments:
                    return !!(target as TypeReference).resolvedTypeArguments;
                case TypeSystemPropertyName.ResolvedBaseTypes:
                    return !!(target as InterfaceType).baseTypesResolved;
            }
            return Debug.assertNever(propertyName);
        }

        /**
         * Pop an entry from the type resolution stack and return its associated result value. The result value will
         * be true if no circularities were detected, or false if a circularity was found.
         */
        function popTypeResolution(): boolean {
            resolutionTargets.pop();
            resolutionPropertyNames.pop();
            return resolutionResults.pop()!;
        }

        function getDeclarationContainer(node: Node): Node {
            return findAncestor(getRootDeclaration(node), node => {
                switch (node.kind) {
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.VariableDeclarationList:
                    case SyntaxKind.ImportSpecifier:
                    case SyntaxKind.NamedImports:
                    case SyntaxKind.NamespaceImport:
                    case SyntaxKind.ImportClause:
                        return false;
                    default:
                        return true;
                }
            })!.parent;
        }

        function getTypeOfPrototypeProperty(prototype: Symbol): Type {
            // TypeScript 1.0 spec (April 2014): 8.4
            // Every class automatically contains a static property member named 'prototype',
            // the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
            // It is an error to explicitly declare a static property member with the name 'prototype'.
            const classType = <InterfaceType>getDeclaredTypeOfSymbol(getParentOfSymbol(prototype)!);
            return classType.typeParameters ? createTypeReference(<GenericType>classType, map(classType.typeParameters, _ => anyType)) : classType;
        }

        // Return the type of the given property in the given type, or undefined if no such property exists
        function getTypeOfPropertyOfType(type: Type, name: __String): Type | undefined {
            const prop = getPropertyOfType(type, name);
            return prop ? getTypeOfSymbol(prop) : undefined;
        }

        function getTypeOfPropertyOrIndexSignature(type: Type, name: __String): Type {
            return getTypeOfPropertyOfType(type, name) || isNumericLiteralName(name) && getIndexTypeOfType(type, IndexKind.Number) || getIndexTypeOfType(type, IndexKind.String) || unknownType;
        }

        function isTypeAny(type: Type | undefined) {
            return type && (type.flags & TypeFlags.Any) !== 0;
        }

        // Return the type of a binding element parent. We check SymbolLinks first to see if a type has been
        // assigned by contextual typing.
        function getTypeForBindingElementParent(node: BindingElementGrandparent) {
            const symbol = getSymbolOfNode(node);
            return symbol && getSymbolLinks(symbol).type || getTypeForVariableLikeDeclaration(node, /*includeOptionality*/ false);
        }

        function getRestType(source: Type, properties: PropertyName[], symbol: Symbol | undefined): Type {
            source = filterType(source, t => !(t.flags & TypeFlags.Nullable));
            if (source.flags & TypeFlags.Never) {
                return emptyObjectType;
            }
            if (source.flags & TypeFlags.Union) {
                return mapType(source, t => getRestType(t, properties, symbol));
            }
            const omitKeyType = getUnionType(map(properties, getLiteralTypeFromPropertyName));
            if (isGenericObjectType(source) || isGenericIndexType(omitKeyType)) {
                if (omitKeyType.flags & TypeFlags.Never) {
                    return source;
                }

                const omitTypeAlias = getGlobalOmitSymbol();
                if (!omitTypeAlias) {
                    return errorType;
                }
                return getTypeAliasInstantiation(omitTypeAlias, [source, omitKeyType]);
            }
            const members = createSymbolTable();
            for (const prop of getPropertiesOfType(source)) {
                if (!isTypeAssignableTo(getLiteralTypeFromProperty(prop, TypeFlags.StringOrNumberLiteralOrUnique), omitKeyType)
                    && !(getDeclarationModifierFlagsFromSymbol(prop) & (ModifierFlags.Private | ModifierFlags.Protected))
                    && isSpreadableProperty(prop)) {
                    members.set(prop.escapedName, getSpreadSymbol(prop, /*readonly*/ false));
                }
            }
            const stringIndexInfo = getIndexInfoOfType(source, IndexKind.String);
            const numberIndexInfo = getIndexInfoOfType(source, IndexKind.Number);
            const result = createAnonymousType(symbol, members, emptyArray, emptyArray, stringIndexInfo, numberIndexInfo);
            result.objectFlags |= ObjectFlags.ObjectRestType;
            return result;
        }

        // Determine the control flow type associated with a destructuring declaration or assignment. The following
        // forms of destructuring are possible:
        //   let { x } = obj;  // BindingElement
        //   let [ x ] = obj;  // BindingElement
        //   { x } = obj;      // ShorthandPropertyAssignment
        //   { x: v } = obj;   // PropertyAssignment
        //   [ x ] = obj;      // Expression
        // We construct a synthetic element access expression corresponding to 'obj.x' such that the control
        // flow analyzer doesn't have to handle all the different syntactic forms.
        function getFlowTypeOfDestructuring(node: BindingElement | PropertyAssignment | ShorthandPropertyAssignment | Expression, declaredType: Type) {
            const reference = getSyntheticElementAccess(node);
            return reference ? getFlowTypeOfReference(reference, declaredType) : declaredType;
        }

        function getSyntheticElementAccess(node: BindingElement | PropertyAssignment | ShorthandPropertyAssignment | Expression): ElementAccessExpression | undefined {
            const parentAccess = getParentElementAccess(node);
            if (parentAccess && parentAccess.flowNode) {
                const propName = getDestructuringPropertyName(node);
                if (propName) {
                    const literal = setTextRange(parseNodeFactory.createStringLiteral(propName), node);
                    const result = setTextRange(parseNodeFactory.createElementAccessExpression(parentAccess, literal), node);
                    setParent(literal, result);
                    setParent(result, node);
                    result.flowNode = parentAccess.flowNode;
                    return result;
                }
            }
        }

        function getParentElementAccess(node: BindingElement | PropertyAssignment | ShorthandPropertyAssignment | Expression) {
            const ancestor = node.parent.parent;
            switch (ancestor.kind) {
                case SyntaxKind.BindingElement:
                case SyntaxKind.PropertyAssignment:
                    return getSyntheticElementAccess(<BindingElement | PropertyAssignment>ancestor);
                case SyntaxKind.ArrayLiteralExpression:
                    return getSyntheticElementAccess(<Expression>node.parent);
                case SyntaxKind.VariableDeclaration:
                    return (<VariableDeclaration>ancestor).initializer;
                case SyntaxKind.BinaryExpression:
                    return (<BinaryExpression>ancestor).right;
            }
        }

        function getDestructuringPropertyName(node: BindingElement | PropertyAssignment | ShorthandPropertyAssignment | Expression) {
            const parent = node.parent;
            if (node.kind === SyntaxKind.BindingElement && parent.kind === SyntaxKind.ObjectBindingPattern) {
                return getLiteralPropertyNameText((<BindingElement>node).propertyName || <Identifier>(<BindingElement>node).name);
            }
            if (node.kind === SyntaxKind.PropertyAssignment || node.kind === SyntaxKind.ShorthandPropertyAssignment) {
                return getLiteralPropertyNameText((<PropertyAssignment | ShorthandPropertyAssignment>node).name);
            }
            return "" + (<NodeArray<Node>>(<BindingPattern | ArrayLiteralExpression>parent).elements).indexOf(node);
        }

        function getLiteralPropertyNameText(name: PropertyName) {
            const type = getLiteralTypeFromPropertyName(name);
            return type.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral) ? "" + (<StringLiteralType | NumberLiteralType>type).value : undefined;
        }

        /** Return the inferred type for a binding element */
        function getTypeForBindingElement(declaration: BindingElement): Type | undefined {
            const pattern = declaration.parent;
            let parentType = getTypeForBindingElementParent(pattern.parent);
            // If no type or an any type was inferred for parent, infer that for the binding element
            if (!parentType || isTypeAny(parentType)) {
                return parentType;
            }
            // Relax null check on ambient destructuring parameters, since the parameters have no implementation and are just documentation
            if (strictNullChecks && declaration.flags & NodeFlags.Ambient && isParameterDeclaration(declaration)) {
                parentType = getNonNullableType(parentType);
            }
            // Filter `undefined` from the type we check against if the parent has an initializer and that initializer is not possibly `undefined`
            else if (strictNullChecks && pattern.parent.initializer && !(getTypeFacts(getTypeOfInitializer(pattern.parent.initializer)) & TypeFacts.EQUndefined)) {
                parentType = getTypeWithFacts(parentType, TypeFacts.NEUndefined);
            }

            let type: Type | undefined;
            if (pattern.kind === SyntaxKind.ObjectBindingPattern) {
                if (declaration.dotDotDotToken) {
                    parentType = getReducedType(parentType);
                    if (parentType.flags & TypeFlags.Unknown || !isValidSpreadType(parentType)) {
                        error(declaration, Diagnostics.Rest_types_may_only_be_created_from_object_types);
                        return errorType;
                    }
                    const literalMembers: PropertyName[] = [];
                    for (const element of pattern.elements) {
                        if (!element.dotDotDotToken) {
                            literalMembers.push(element.propertyName || element.name as Identifier);
                        }
                    }
                    type = getRestType(parentType, literalMembers, declaration.symbol);
                }
                else {
                    // Use explicitly specified property name ({ p: xxx } form), or otherwise the implied name ({ p } form)
                    const name = declaration.propertyName || <Identifier>declaration.name;
                    const indexType = getLiteralTypeFromPropertyName(name);
                    const declaredType = getConstraintForLocation(getIndexedAccessType(parentType, indexType, name), declaration.name);
                    type = getFlowTypeOfDestructuring(declaration, declaredType);
                }
            }
            else {
                // This elementType will be used if the specific property corresponding to this index is not
                // present (aka the tuple element property). This call also checks that the parentType is in
                // fact an iterable or array (depending on target language).
                const elementType = checkIteratedTypeOrElementType(IterationUse.Destructuring, parentType, undefinedType, pattern);
                const index = pattern.elements.indexOf(declaration);
                if (declaration.dotDotDotToken) {
                    // If the parent is a tuple type, the rest element has a tuple type of the
                    // remaining tuple element types. Otherwise, the rest element has an array type with same
                    // element type as the parent type.
                    type = everyType(parentType, isTupleType) ?
                        mapType(parentType, t => sliceTupleType(<TupleTypeReference>t, index)) :
                        createArrayType(elementType);
                }
                else if (isArrayLikeType(parentType)) {
                    const indexType = getLiteralType(index);
                    const accessFlags = hasDefaultValue(declaration) ? AccessFlags.NoTupleBoundsCheck : 0;
                    const declaredType = getConstraintForLocation(getIndexedAccessTypeOrUndefined(parentType, indexType, declaration.name, accessFlags) || errorType, declaration.name);
                    type = getFlowTypeOfDestructuring(declaration, declaredType);
                }
                else {
                    type = elementType;
                }
            }
            if (!declaration.initializer) {
                return type;
            }
            if (getEffectiveTypeAnnotationNode(walkUpBindingElementsAndPatterns(declaration))) {
                // In strict null checking mode, if a default value of a non-undefined type is specified, remove
                // undefined from the final type.
                return strictNullChecks && !(getFalsyFlags(checkDeclarationInitializer(declaration)) & TypeFlags.Undefined) ?
                    getTypeWithFacts(type, TypeFacts.NEUndefined) :
                    type;
            }
            return widenTypeInferredFromInitializer(declaration, getUnionType([getTypeWithFacts(type, TypeFacts.NEUndefined), checkDeclarationInitializer(declaration)], UnionReduction.Subtype));
        }

        function getTypeForDeclarationFromJSDocComment(declaration: Node) {
            const jsdocType = getJSDocType(declaration);
            if (jsdocType) {
                return getTypeFromTypeNode(jsdocType);
            }
            return undefined;
        }

        function isNullOrUndefined(node: Expression) {
            const expr = skipParentheses(node);
            return expr.kind === SyntaxKind.NullKeyword || expr.kind === SyntaxKind.Identifier && getResolvedSymbol(<Identifier>expr) === undefinedSymbol;
        }

        function isEmptyArrayLiteral(node: Expression) {
            const expr = skipParentheses(node);
            return expr.kind === SyntaxKind.ArrayLiteralExpression && (<ArrayLiteralExpression>expr).elements.length === 0;
        }

        function addOptionality(type: Type, optional = true): Type {
            return strictNullChecks && optional ? getOptionalType(type) : type;
        }

        // Return the inferred type for a variable, parameter, or property declaration
        function getTypeForVariableLikeDeclaration(declaration: ParameterDeclaration | PropertyDeclaration | PropertySignature | VariableDeclaration | BindingElement | JSDocPropertyLikeTag, includeOptionality: boolean): Type | undefined {
            // A variable declared in a for..in statement is of type string, or of type keyof T when the
            // right hand expression is of a type parameter type.
            if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === SyntaxKind.ForInStatement) {
                const indexType = getIndexType(getNonNullableTypeIfNeeded(checkExpression(declaration.parent.parent.expression)));
                return indexType.flags & (TypeFlags.TypeParameter | TypeFlags.Index) ? getExtractStringType(indexType) : stringType;
            }

            if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === SyntaxKind.ForOfStatement) {
                // checkRightHandSideOfForOf will return undefined if the for-of expression type was
                // missing properties/signatures required to get its iteratedType (like
                // [Symbol.iterator] or next). This may be because we accessed properties from anyType,
                // or it may have led to an error inside getElementTypeOfIterable.
                const forOfStatement = declaration.parent.parent;
                return checkRightHandSideOfForOf(forOfStatement) || anyType;
            }

            if (isBindingPattern(declaration.parent)) {
                return getTypeForBindingElement(<BindingElement>declaration);
            }

            const isOptional = includeOptionality && (
                isParameter(declaration) && isJSDocOptionalParameter(declaration)
                || isOptionalJSDocPropertyLikeTag(declaration)
                || !isBindingElement(declaration) && !isVariableDeclaration(declaration) && !!declaration.questionToken);

            // Use type from type annotation if one is present
            const declaredType = tryGetTypeFromEffectiveTypeNode(declaration);
            if (declaredType) {
                return addOptionality(declaredType, isOptional);
            }

            if ((noImplicitAny || isInJSFile(declaration)) &&
                isVariableDeclaration(declaration) && !isBindingPattern(declaration.name) &&
                !(getCombinedModifierFlags(declaration) & ModifierFlags.Export) && !(declaration.flags & NodeFlags.Ambient)) {
                // If --noImplicitAny is on or the declaration is in a Javascript file,
                // use control flow tracked 'any' type for non-ambient, non-exported var or let variables with no
                // initializer or a 'null' or 'undefined' initializer.
                if (!(getCombinedNodeFlags(declaration) & NodeFlags.Const) && (!declaration.initializer || isNullOrUndefined(declaration.i