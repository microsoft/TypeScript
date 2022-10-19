import * as ts from "../_namespaces/ts";

/** @internal */
/**
 * Finds members of the resolved type that are missing in the class pointed to by class decl
 * and generates source code for the missing members.
 * @param possiblyMissingSymbols The collection of symbols to filter and then get insertions for.
 * @param importAdder If provided, type annotations will use identifier type references instead of ImportTypeNodes, and the missing imports will be added to the importAdder.
 * @returns Empty string iff there are no member insertions.
 */
export function createMissingMemberNodes(
    classDeclaration: ts.ClassLikeDeclaration,
    possiblyMissingSymbols: readonly ts.Symbol[],
    sourceFile: ts.SourceFile,
    context: TypeConstructionContext,
    preferences: ts.UserPreferences,
    importAdder: ts.codefix.ImportAdder | undefined,
    addClassElement: (node: AddNode) => void): void {
    const classMembers = classDeclaration.symbol.members!;
    for (const symbol of possiblyMissingSymbols) {
        if (!classMembers.has(symbol.escapedName)) {
            addNewNodeForMemberSymbol(symbol, classDeclaration, sourceFile, context, preferences, importAdder, addClassElement, /* body */ undefined);
        }
    }
}

/** @internal */
export function getNoopSymbolTrackerWithResolver(context: TypeConstructionContext): ts.SymbolTracker {
    return {
        trackSymbol: () => false,
        moduleResolverHost: ts.getModuleSpecifierResolverHost(context.program, context.host),
    };
}

/** @internal */
export interface TypeConstructionContext {
    program: ts.Program;
    host: ts.LanguageServiceHost;
}

type AddNode = ts.PropertyDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.MethodDeclaration | ts.FunctionExpression | ts.ArrowFunction;

/** @internal */
export const enum PreserveOptionalFlags {
    Method  = 1 << 0,
    Property = 1 << 1,
    All     = Method | Property
}

/** @internal */
/**
 * `addClassElement` will not be called if we can't figure out a representation for `symbol` in `enclosingDeclaration`.
 * @param body If defined, this will be the body of the member node passed to `addClassElement`. Otherwise, the body will default to a stub.
 */
export function addNewNodeForMemberSymbol(
    symbol: ts.Symbol,
    enclosingDeclaration: ts.ClassLikeDeclaration,
    sourceFile: ts.SourceFile,
    context: TypeConstructionContext,
    preferences: ts.UserPreferences,
    importAdder: ts.codefix.ImportAdder | undefined,
    addClassElement: (node: AddNode) => void,
    body: ts.Block | undefined,
    preserveOptional = PreserveOptionalFlags.All,
    isAmbient = false,
): void {
    const declarations = symbol.getDeclarations();
    const declaration = declarations?.[0];
    const checker = context.program.getTypeChecker();
    const scriptTarget = ts.getEmitScriptTarget(context.program.getCompilerOptions());

    /**
     * (#49811)
     * Note that there are cases in which the symbol declaration is not present. For example, in the code below both
     * `MappedIndirect.ax` and `MappedIndirect.ay` have no declaration node attached (due to their mapped-type
     * parent):
     *
     * ```ts
     * type Base = { ax: number; ay: string };
     * type BaseKeys = keyof Base;
     * type MappedIndirect = { [K in BaseKeys]: boolean };
     * ```
     *
     * In such cases, we assume the declaration to be a `PropertySignature`.
     */
    const kind = declaration?.kind ?? ts.SyntaxKind.PropertySignature;
    const declarationName = ts.getSynthesizedDeepClone(ts.getNameOfDeclaration(declaration), /*includeTrivia*/ false) as ts.PropertyName;
    const effectiveModifierFlags = declaration ? ts.getEffectiveModifierFlags(declaration) : ts.ModifierFlags.None;
    let modifierFlags =
        effectiveModifierFlags & ts.ModifierFlags.Public ? ts.ModifierFlags.Public :
        effectiveModifierFlags & ts.ModifierFlags.Protected ? ts.ModifierFlags.Protected :
        ts.ModifierFlags.None;
    if (declaration && ts.isAutoAccessorPropertyDeclaration(declaration)) {
        modifierFlags |= ts.ModifierFlags.Accessor;
    }
    const modifiers = modifierFlags ? ts.factory.createNodeArray(ts.factory.createModifiersFromModifierFlags(modifierFlags)) : undefined;
    const type = checker.getWidenedType(checker.getTypeOfSymbolAtLocation(symbol, enclosingDeclaration));
    const optional = !!(symbol.flags & ts.SymbolFlags.Optional);
    const ambient = !!(enclosingDeclaration.flags & ts.NodeFlags.Ambient) || isAmbient;
    const quotePreference = ts.getQuotePreference(sourceFile, preferences);

    switch (kind) {
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyDeclaration:
            const flags = quotePreference === ts.QuotePreference.Single ? ts.NodeBuilderFlags.UseSingleQuotesForStringLiteralType : undefined;
            let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context));
            if (importAdder) {
                const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
                if (importableReference) {
                    typeNode = importableReference.typeNode;
                    importSymbols(importAdder, importableReference.symbols);
                }
            }
            addClassElement(ts.factory.createPropertyDeclaration(
                modifiers,
                declaration ? createName(declarationName) : symbol.getName(),
                optional && (preserveOptional & PreserveOptionalFlags.Property) ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
                typeNode,
                /*initializer*/ undefined));
            break;
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor: {
            ts.Debug.assertIsDefined(declarations);
            let typeNode = checker.typeToTypeNode(type, enclosingDeclaration, /*flags*/ undefined, getNoopSymbolTrackerWithResolver(context));
            const allAccessors = ts.getAllAccessorDeclarations(declarations, declaration as ts.AccessorDeclaration);
            const orderedAccessors = allAccessors.secondAccessor
                ? [allAccessors.firstAccessor, allAccessors.secondAccessor]
                : [allAccessors.firstAccessor];
            if (importAdder) {
                const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
                if (importableReference) {
                    typeNode = importableReference.typeNode;
                    importSymbols(importAdder, importableReference.symbols);
                }
            }
            for (const accessor of orderedAccessors) {
                if (ts.isGetAccessorDeclaration(accessor)) {
                    addClassElement(ts.factory.createGetAccessorDeclaration(
                        modifiers,
                        createName(declarationName),
                        ts.emptyArray,
                        createTypeNode(typeNode),
                        createBody(body, quotePreference, ambient)));
                }
                else {
                    ts.Debug.assertNode(accessor, ts.isSetAccessorDeclaration, "The counterpart to a getter should be a setter");
                    const parameter = ts.getSetAccessorValueParameter(accessor);
                    const parameterName = parameter && ts.isIdentifier(parameter.name) ? ts.idText(parameter.name) : undefined;
                    addClassElement(ts.factory.createSetAccessorDeclaration(
                        modifiers,
                        createName(declarationName),
                        createDummyParameters(1, [parameterName], [createTypeNode(typeNode)], 1, /*inJs*/ false),
                        createBody(body, quotePreference, ambient)));
                }
            }
            break;
        }
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.MethodDeclaration:
            // The signature for the implementation appears as an entry in `signatures` iff
            // there is only one signature.
            // If there are overloads and an implementation signature, it appears as an
            // extra declaration that isn't a signature for `type`.
            // If there is more than one overload but no implementation signature
            // (eg: an abstract method or interface declaration), there is a 1-1
            // correspondence of declarations and signatures.
            ts.Debug.assertIsDefined(declarations);
            const signatures = type.isUnion() ? ts.flatMap(type.types, t => t.getCallSignatures()) : type.getCallSignatures();
            if (!ts.some(signatures)) {
                break;
            }

            if (declarations.length === 1) {
                ts.Debug.assert(signatures.length === 1, "One declaration implies one signature");
                const signature = signatures[0];
                outputMethod(quotePreference, signature, modifiers, createName(declarationName), createBody(body, quotePreference, ambient));
                break;
            }

            for (const signature of signatures) {
                // Ensure nodes are fresh so they can have different positions when going through formatting.
                outputMethod(quotePreference, signature, modifiers, createName(declarationName));
            }

            if (!ambient) {
                if (declarations.length > signatures.length) {
                    const signature = checker.getSignatureFromDeclaration(declarations[declarations.length - 1] as ts.SignatureDeclaration)!;
                    outputMethod(quotePreference, signature, modifiers, createName(declarationName), createBody(body, quotePreference));
                }
                else {
                    ts.Debug.assert(declarations.length === signatures.length, "Declarations and signatures should match count");
                    addClassElement(createMethodImplementingSignatures(checker, context, enclosingDeclaration, signatures, createName(declarationName), optional && !!(preserveOptional & PreserveOptionalFlags.Method), modifiers, quotePreference, body));
                }
            }
            break;
    }

    function outputMethod(quotePreference: ts.QuotePreference, signature: ts.Signature, modifiers: ts.NodeArray<ts.Modifier> | undefined, name: ts.PropertyName, body?: ts.Block): void {
        const method = createSignatureDeclarationFromSignature(ts.SyntaxKind.MethodDeclaration, context, quotePreference, signature, body, name, modifiers, optional && !!(preserveOptional & PreserveOptionalFlags.Method), enclosingDeclaration, importAdder) as ts.MethodDeclaration;
        if (method) addClassElement(method);
    }

    function createName(node: ts.PropertyName) {
        return ts.getSynthesizedDeepClone(node, /*includeTrivia*/ false);
    }

    function createBody(block: ts.Block | undefined, quotePreference: ts.QuotePreference, ambient?: boolean) {
        return ambient ? undefined :
            ts.getSynthesizedDeepClone(block, /*includeTrivia*/ false) || createStubbedMethodBody(quotePreference);
    }

    function createTypeNode(typeNode: ts.TypeNode | undefined) {
        return ts.getSynthesizedDeepClone(typeNode, /*includeTrivia*/ false);
    }
}

/** @internal */
export function createSignatureDeclarationFromSignature(
    kind:
        | ts.SyntaxKind.MethodDeclaration
        | ts.SyntaxKind.FunctionExpression
        | ts.SyntaxKind.ArrowFunction
        | ts.SyntaxKind.FunctionDeclaration,
    context: TypeConstructionContext,
    quotePreference: ts.QuotePreference,
    signature: ts.Signature,
    body: ts.Block | undefined,
    name: ts.PropertyName | undefined,
    modifiers: ts.NodeArray<ts.Modifier> | undefined,
    optional: boolean | undefined,
    enclosingDeclaration: ts.Node | undefined,
    importAdder: ts.codefix.ImportAdder | undefined
) {
    const program = context.program;
    const checker = program.getTypeChecker();
    const scriptTarget = ts.getEmitScriptTarget(program.getCompilerOptions());
    const flags =
        ts.NodeBuilderFlags.NoTruncation
        | ts.NodeBuilderFlags.SuppressAnyReturnType
        | ts.NodeBuilderFlags.AllowEmptyTuple
        | (quotePreference === ts.QuotePreference.Single ? ts.NodeBuilderFlags.UseSingleQuotesForStringLiteralType : ts.NodeBuilderFlags.None);
    const signatureDeclaration = checker.signatureToSignatureDeclaration(signature, kind, enclosingDeclaration, flags, getNoopSymbolTrackerWithResolver(context)) as ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.FunctionDeclaration;
    if (!signatureDeclaration) {
        return undefined;
    }

    let typeParameters = signatureDeclaration.typeParameters;
    let parameters = signatureDeclaration.parameters;
    let type = signatureDeclaration.type;
    if (importAdder) {
        if (typeParameters) {
            const newTypeParameters = ts.sameMap(typeParameters, typeParameterDecl => {
                let constraint = typeParameterDecl.constraint;
                let defaultType = typeParameterDecl.default;
                if (constraint) {
                    const importableReference = tryGetAutoImportableReferenceFromTypeNode(constraint, scriptTarget);
                    if (importableReference) {
                        constraint = importableReference.typeNode;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
                if (defaultType) {
                    const importableReference = tryGetAutoImportableReferenceFromTypeNode(defaultType, scriptTarget);
                    if (importableReference) {
                        defaultType = importableReference.typeNode;
                        importSymbols(importAdder, importableReference.symbols);
                    }
                }
                return ts.factory.updateTypeParameterDeclaration(
                    typeParameterDecl,
                    typeParameterDecl.modifiers,
                    typeParameterDecl.name,
                    constraint,
                    defaultType
                );
            });
            if (typeParameters !== newTypeParameters) {
                typeParameters = ts.setTextRange(ts.factory.createNodeArray(newTypeParameters, typeParameters.hasTrailingComma), typeParameters);
            }
        }
        const newParameters = ts.sameMap(parameters, parameterDecl => {
            const importableReference = tryGetAutoImportableReferenceFromTypeNode(parameterDecl.type, scriptTarget);
            let type = parameterDecl.type;
            if (importableReference) {
                type = importableReference.typeNode;
                importSymbols(importAdder, importableReference.symbols);
            }
            return ts.factory.updateParameterDeclaration(
                parameterDecl,
                parameterDecl.modifiers,
                parameterDecl.dotDotDotToken,
                parameterDecl.name,
                parameterDecl.questionToken,
                type,
                parameterDecl.initializer
            );
        });
        if (parameters !== newParameters) {
            parameters = ts.setTextRange(ts.factory.createNodeArray(newParameters, parameters.hasTrailingComma), parameters);
        }
        if (type) {
            const importableReference = tryGetAutoImportableReferenceFromTypeNode(type, scriptTarget);
            if (importableReference) {
                type = importableReference.typeNode;
                importSymbols(importAdder, importableReference.symbols);
            }
        }
    }

    const questionToken = optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined;
    const asteriskToken = signatureDeclaration.asteriskToken;
    if (ts.isFunctionExpression(signatureDeclaration)) {
        return ts.factory.updateFunctionExpression(signatureDeclaration, modifiers, signatureDeclaration.asteriskToken, ts.tryCast(name, ts.isIdentifier), typeParameters, parameters, type, body ?? signatureDeclaration.body);
    }
    if (ts.isArrowFunction(signatureDeclaration)) {
        return ts.factory.updateArrowFunction(signatureDeclaration, modifiers, typeParameters, parameters, type, signatureDeclaration.equalsGreaterThanToken, body ?? signatureDeclaration.body);
    }
    if (ts.isMethodDeclaration(signatureDeclaration)) {
        return ts.factory.updateMethodDeclaration(signatureDeclaration, modifiers, asteriskToken, name ?? ts.factory.createIdentifier(""), questionToken, typeParameters, parameters, type, body);
    }
    if (ts.isFunctionDeclaration(signatureDeclaration)) {
        return ts.factory.updateFunctionDeclaration(signatureDeclaration, modifiers, signatureDeclaration.asteriskToken, ts.tryCast(name, ts.isIdentifier), typeParameters, parameters, type, body ?? signatureDeclaration.body);
    }
    return undefined;
}

/** @internal */
export function createSignatureDeclarationFromCallExpression(
    kind: ts.SyntaxKind.MethodDeclaration | ts.SyntaxKind.FunctionDeclaration | ts.SyntaxKind.MethodSignature,
    context: ts.CodeFixContextBase,
    importAdder: ts.codefix.ImportAdder,
    call: ts.CallExpression,
    name: ts.Identifier | string,
    modifierFlags: ts.ModifierFlags,
    contextNode: ts.Node
) {
    const quotePreference = ts.getQuotePreference(context.sourceFile, context.preferences);
    const scriptTarget = ts.getEmitScriptTarget(context.program.getCompilerOptions());
    const tracker = getNoopSymbolTrackerWithResolver(context);
    const checker = context.program.getTypeChecker();
    const isJs = ts.isInJSFile(contextNode);
    const { typeArguments, arguments: args, parent } = call;

    const contextualType = isJs ? undefined : checker.getContextualType(call);
    const names = ts.map(args, arg =>
        ts.isIdentifier(arg) ? arg.text : ts.isPropertyAccessExpression(arg) && ts.isIdentifier(arg.name) ? arg.name.text : undefined);
    const instanceTypes = isJs ? [] : ts.map(args, arg => checker.getTypeAtLocation(arg));
    const { argumentTypeNodes, argumentTypeParameters } = getArgumentTypesAndTypeParameters(
        checker, importAdder, instanceTypes, contextNode, scriptTarget, /*flags*/ undefined, tracker
    );

    const modifiers = modifierFlags
        ? ts.factory.createNodeArray(ts.factory.createModifiersFromModifierFlags(modifierFlags))
        : undefined;
    const asteriskToken = ts.isYieldExpression(parent)
        ? ts.factory.createToken(ts.SyntaxKind.AsteriskToken)
        : undefined;
    const typeParameters = isJs ? undefined : createTypeParametersForArguments(checker, argumentTypeParameters, typeArguments);
    const parameters = createDummyParameters(args.length, names, argumentTypeNodes, /*minArgumentCount*/ undefined, isJs);
    const type = isJs || contextualType === undefined
        ? undefined
        : checker.typeToTypeNode(contextualType, contextNode, /*flags*/ undefined, tracker);

    switch (kind) {
        case ts.SyntaxKind.MethodDeclaration:
            return ts.factory.createMethodDeclaration(
                modifiers,
                asteriskToken,
                name,
                /*questionToken*/ undefined,
                typeParameters,
                parameters,
                type,
                createStubbedMethodBody(quotePreference)
            );
        case ts.SyntaxKind.MethodSignature:
            return ts.factory.createMethodSignature(
                modifiers,
                name,
                /*questionToken*/ undefined,
                typeParameters,
                parameters,
                type === undefined ? ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword) : type
            );
        case ts.SyntaxKind.FunctionDeclaration:
            return ts.factory.createFunctionDeclaration(
                modifiers,
                asteriskToken,
                name,
                typeParameters,
                parameters,
                type,
                createStubbedBody(ts.Diagnostics.Function_not_implemented.message, quotePreference)
            );
        default:
            ts.Debug.fail("Unexpected kind");
    }
}

interface ArgumentTypeParameterAndConstraint {
    argumentType: ts.Type;
    constraint?: ts.TypeNode;
}

function createTypeParametersForArguments(checker: ts.TypeChecker, argumentTypeParameters: [string, ArgumentTypeParameterAndConstraint | undefined][], typeArguments: ts.NodeArray<ts.TypeNode> | undefined) {
    const usedNames = new ts.Set(argumentTypeParameters.map(pair => pair[0]));
    const constraintsByName = new ts.Map(argumentTypeParameters);

    if (typeArguments) {
        const typeArgumentsWithNewTypes = typeArguments.filter(typeArgument => !argumentTypeParameters.some(pair => checker.getTypeAtLocation(typeArgument) === pair[1]?.argumentType));
        const targetSize = usedNames.size + typeArgumentsWithNewTypes.length;
        for (let i = 0; usedNames.size < targetSize; i += 1) {
            usedNames.add(createTypeParameterName(i));
        }
    }

    return ts.map(
        ts.arrayFrom(usedNames.values()),
        usedName => ts.factory.createTypeParameterDeclaration(/*modifiers*/ undefined, usedName, constraintsByName.get(usedName)?.constraint),
    );
}

function createTypeParameterName(index: number) {
    return ts.CharacterCodes.T + index <= ts.CharacterCodes.Z
        ? String.fromCharCode(ts.CharacterCodes.T + index)
        : `T${index}`;
}

/** @internal */
export function typeToAutoImportableTypeNode(checker: ts.TypeChecker, importAdder: ts.codefix.ImportAdder, type: ts.Type, contextNode: ts.Node | undefined, scriptTarget: ts.ScriptTarget, flags?: ts.NodeBuilderFlags, tracker?: ts.SymbolTracker): ts.TypeNode | undefined {
    let typeNode = checker.typeToTypeNode(type, contextNode, flags, tracker);
    if (typeNode && ts.isImportTypeNode(typeNode)) {
        const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
        if (importableReference) {
            importSymbols(importAdder, importableReference.symbols);
            typeNode = importableReference.typeNode;
        }
    }

    // Ensure nodes are fresh so they can have different positions when going through formatting.
    return ts.getSynthesizedDeepClone(typeNode);
}

function typeContainsTypeParameter(type: ts.Type) {
    if (type.isUnionOrIntersection()) {
        return type.types.some(typeContainsTypeParameter);
    }

    return type.flags & ts.TypeFlags.TypeParameter;
}

/** @internal */
export function getArgumentTypesAndTypeParameters(checker: ts.TypeChecker, importAdder: ts.codefix.ImportAdder, instanceTypes: ts.Type[], contextNode: ts.Node | undefined, scriptTarget: ts.ScriptTarget, flags?: ts.NodeBuilderFlags, tracker?: ts.SymbolTracker) {
    // Types to be used as the types of the parameters in the new function
    // E.g. from this source:
    //   added("", 0)
    // The value will look like:
    //   [{ typeName: { text: "string" } }, { typeName: { text: "number" }]
    // And in the output function will generate:
    //   function added(a: string, b: number) { ... }
    const argumentTypeNodes: ts.TypeNode[] = [];

    // Names of type parameters provided as arguments to the call
    // E.g. from this source:
    //   added<T, U>(value);
    // The value will look like:
    //   [
    //     ["T", { argumentType: { typeName: { text: "T" } } } ],
    //     ["U", { argumentType: { typeName: { text: "U" } } } ],
    //   ]
    // And in the output function will generate:
    //   function added<T, U>() { ... }
    const argumentTypeParameters = new ts.Map<string, ArgumentTypeParameterAndConstraint | undefined>();

    for (let i = 0; i < instanceTypes.length; i += 1) {
        const instanceType = instanceTypes[i];

        // If the instance type contains a deep reference to an existing type parameter,
        // instead of copying the full union or intersection, create a new type parameter
        // E.g. from this source:
        //   function existing<T, U>(value: T | U & string) {
        //     added/*1*/(value);
        // We don't want to output this:
        //    function added<T>(value: T | U & string) { ... }
        // We instead want to output:
        //    function added<T>(value: T) { ... }
        if (instanceType.isUnionOrIntersection() && instanceType.types.some(typeContainsTypeParameter)) {
            const synthesizedTypeParameterName = createTypeParameterName(i);
            argumentTypeNodes.push(ts.factory.createTypeReferenceNode(synthesizedTypeParameterName));
            argumentTypeParameters.set(synthesizedTypeParameterName, undefined);
            continue;
        }

        // Widen the type so we don't emit nonsense annotations like "function fn(x: 3) {"
        const widenedInstanceType = checker.getBaseTypeOfLiteralType(instanceType);
        const argumentTypeNode = typeToAutoImportableTypeNode(checker, importAdder, widenedInstanceType, contextNode, scriptTarget, flags, tracker);
        if (!argumentTypeNode) {
            continue;
        }

        argumentTypeNodes.push(argumentTypeNode);
        const argumentTypeParameter = getFirstTypeParameterName(instanceType);

        // If the instance type is a type parameter with a constraint (other than an anonymous object),
        // remember that constraint for when we create the new type parameter
        // E.g. from this source:
        //   function existing<T extends string>(value: T) {
        //     added/*1*/(value);
        // We don't want to output this:
        //    function added<T>(value: T) { ... }
        // We instead want to output:
        //    function added<T extends string>(value: T) { ... }
        const instanceTypeConstraint = instanceType.isTypeParameter() && instanceType.constraint && !isAnonymousObjectConstraintType(instanceType.constraint)
            ? typeToAutoImportableTypeNode(checker, importAdder, instanceType.constraint, contextNode, scriptTarget, flags, tracker)
            : undefined;

        if (argumentTypeParameter) {
            argumentTypeParameters.set(argumentTypeParameter, { argumentType: instanceType, constraint: instanceTypeConstraint });
        }
    }

    return { argumentTypeNodes, argumentTypeParameters: ts.arrayFrom(argumentTypeParameters.entries()) };
}

function isAnonymousObjectConstraintType(type: ts.Type) {
    return (type.flags & ts.TypeFlags.Object) && (type as ts.ObjectType).objectFlags === ts.ObjectFlags.Anonymous;
}

function getFirstTypeParameterName(type: ts.Type): string | undefined {
    if (type.flags & (ts.TypeFlags.Union | ts.TypeFlags.Intersection)) {
        for (const subType of (type as ts.UnionType | ts.IntersectionType).types) {
            const subTypeName = getFirstTypeParameterName(subType);
            if (subTypeName) {
                return subTypeName;
            }
        }
    }

    return type.flags & ts.TypeFlags.TypeParameter
        ? type.getSymbol()?.getName()
        : undefined;
}

function createDummyParameters(argCount: number, names: (string | undefined)[] | undefined, types: (ts.TypeNode | undefined)[] | undefined, minArgumentCount: number | undefined, inJs: boolean): ts.ParameterDeclaration[] {
    const parameters: ts.ParameterDeclaration[] = [];
    const parameterNameCounts = new ts.Map<string, number>();
    for (let i = 0; i < argCount; i++) {
        const parameterName = names?.[i] || `arg${i}`;
        const parameterNameCount = parameterNameCounts.get(parameterName);
        parameterNameCounts.set(parameterName, (parameterNameCount || 0) + 1);

        const newParameter = ts.factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            /*name*/ parameterName + (parameterNameCount || ""),
            /*questionToken*/ minArgumentCount !== undefined && i >= minArgumentCount ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
            /*type*/ inJs ? undefined : types?.[i] || ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
            /*initializer*/ undefined);
        parameters.push(newParameter);
    }
    return parameters;
}

function createMethodImplementingSignatures(
    checker: ts.TypeChecker,
    context: TypeConstructionContext,
    enclosingDeclaration: ts.ClassLikeDeclaration,
    signatures: readonly ts.Signature[],
    name: ts.PropertyName,
    optional: boolean,
    modifiers: readonly ts.Modifier[] | undefined,
    quotePreference: ts.QuotePreference,
    body: ts.Block | undefined,
): ts.MethodDeclaration {
    /** This is *a* signature with the maximal number of arguments,
     * such that if there is a "maximal" signature without rest arguments,
     * this is one of them.
     */
    let maxArgsSignature = signatures[0];
    let minArgumentCount = signatures[0].minArgumentCount;
    let someSigHasRestParameter = false;
    for (const sig of signatures) {
        minArgumentCount = Math.min(sig.minArgumentCount, minArgumentCount);
        if (ts.signatureHasRestParameter(sig)) {
            someSigHasRestParameter = true;
        }
        if (sig.parameters.length >= maxArgsSignature.parameters.length && (!ts.signatureHasRestParameter(sig) || ts.signatureHasRestParameter(maxArgsSignature))) {
            maxArgsSignature = sig;
        }
    }
    const maxNonRestArgs = maxArgsSignature.parameters.length - (ts.signatureHasRestParameter(maxArgsSignature) ? 1 : 0);
    const maxArgsParameterSymbolNames = maxArgsSignature.parameters.map(symbol => symbol.name);
    const parameters = createDummyParameters(maxNonRestArgs, maxArgsParameterSymbolNames, /* types */ undefined, minArgumentCount, /*inJs*/ false);

    if (someSigHasRestParameter) {
        const restParameter = ts.factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            ts.factory.createToken(ts.SyntaxKind.DotDotDotToken),
            maxArgsParameterSymbolNames[maxNonRestArgs] || "rest",
            /*questionToken*/ maxNonRestArgs >= minArgumentCount ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
            ts.factory.createArrayTypeNode(ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)),
            /*initializer*/ undefined);
        parameters.push(restParameter);
    }

    return createStubbedMethod(
        modifiers,
        name,
        optional,
        /*typeParameters*/ undefined,
        parameters,
        getReturnTypeFromSignatures(signatures, checker, context, enclosingDeclaration),
        quotePreference,
        body);
}

function getReturnTypeFromSignatures(signatures: readonly ts.Signature[], checker: ts.TypeChecker, context: TypeConstructionContext, enclosingDeclaration: ts.ClassLikeDeclaration): ts.TypeNode | undefined {
    if (ts.length(signatures)) {
        const type = checker.getUnionType(ts.map(signatures, checker.getReturnTypeOfSignature));
        return checker.typeToTypeNode(type, enclosingDeclaration, /*flags*/ undefined, getNoopSymbolTrackerWithResolver(context));
    }
}

function createStubbedMethod(
    modifiers: readonly ts.Modifier[] | undefined,
    name: ts.PropertyName,
    optional: boolean,
    typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
    parameters: readonly ts.ParameterDeclaration[],
    returnType: ts.TypeNode | undefined,
    quotePreference: ts.QuotePreference,
    body: ts.Block | undefined
): ts.MethodDeclaration {
    return ts.factory.createMethodDeclaration(
        modifiers,
        /*asteriskToken*/ undefined,
        name,
        optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
        typeParameters,
        parameters,
        returnType,
        body || createStubbedMethodBody(quotePreference));
}

function createStubbedMethodBody(quotePreference: ts.QuotePreference) {
    return createStubbedBody(ts.Diagnostics.Method_not_implemented.message, quotePreference);
}

/** @internal */
export function createStubbedBody(text: string, quotePreference: ts.QuotePreference): ts.Block {
    return ts.factory.createBlock(
        [ts.factory.createThrowStatement(
            ts.factory.createNewExpression(
                ts.factory.createIdentifier("Error"),
                /*typeArguments*/ undefined,
                // TODO Handle auto quote preference.
                [ts.factory.createStringLiteral(text, /*isSingleQuote*/ quotePreference === ts.QuotePreference.Single)]))],
        /*multiline*/ true);
}

/** @internal */
export function setJsonCompilerOptionValues(
    changeTracker: ts.textChanges.ChangeTracker,
    configFile: ts.TsConfigSourceFile,
    options: [string, ts.Expression][]
) {
    const tsconfigObjectLiteral = ts.getTsConfigObjectLiteralExpression(configFile);
    if (!tsconfigObjectLiteral) return undefined;

    const compilerOptionsProperty = findJsonProperty(tsconfigObjectLiteral, "compilerOptions");
    if (compilerOptionsProperty === undefined) {
        changeTracker.insertNodeAtObjectStart(configFile, tsconfigObjectLiteral, createJsonPropertyAssignment(
            "compilerOptions",
            ts.factory.createObjectLiteralExpression(options.map(([optionName, optionValue]) => createJsonPropertyAssignment(optionName, optionValue)), /*multiLine*/ true)));
        return;
    }

    const compilerOptions = compilerOptionsProperty.initializer;
    if (!ts.isObjectLiteralExpression(compilerOptions)) {
        return;
    }

    for (const [optionName, optionValue] of options) {
        const optionProperty = findJsonProperty(compilerOptions, optionName);
        if (optionProperty === undefined) {
            changeTracker.insertNodeAtObjectStart(configFile, compilerOptions, createJsonPropertyAssignment(optionName, optionValue));
        }
        else {
            changeTracker.replaceNode(configFile, optionProperty.initializer, optionValue);
        }
    }
}

/** @internal */
export function setJsonCompilerOptionValue(
    changeTracker: ts.textChanges.ChangeTracker,
    configFile: ts.TsConfigSourceFile,
    optionName: string,
    optionValue: ts.Expression,
) {
    setJsonCompilerOptionValues(changeTracker, configFile, [[optionName, optionValue]]);
}

/** @internal */
export function createJsonPropertyAssignment(name: string, initializer: ts.Expression) {
    return ts.factory.createPropertyAssignment(ts.factory.createStringLiteral(name), initializer);
}

/** @internal */
export function findJsonProperty(obj: ts.ObjectLiteralExpression, name: string): ts.PropertyAssignment | undefined {
    return ts.find(obj.properties, (p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p) && !!p.name && ts.isStringLiteral(p.name) && p.name.text === name);
}

/** @internal */
/**
 * Given a type node containing 'import("./a").SomeType<import("./b").OtherType<...>>',
 * returns an equivalent type reference node with any nested ImportTypeNodes also replaced
 * with type references, and a list of symbols that must be imported to use the type reference.
 */
export function tryGetAutoImportableReferenceFromTypeNode(importTypeNode: ts.TypeNode | undefined, scriptTarget: ts.ScriptTarget) {
    let symbols: ts.Symbol[] | undefined;
    const typeNode = ts.visitNode(importTypeNode, visit);
    if (symbols && typeNode) {
        return { typeNode, symbols };
    }

    function visit(node: ts.TypeNode): ts.TypeNode;
    function visit(node: ts.Node): ts.Node {
        if (ts.isLiteralImportTypeNode(node) && node.qualifier) {
            // Symbol for the left-most thing after the dot
            const firstIdentifier = ts.getFirstIdentifier(node.qualifier);
            const name = ts.getNameForExportedSymbol(firstIdentifier.symbol, scriptTarget);
            const qualifier = name !== firstIdentifier.text
                ? replaceFirstIdentifierOfEntityName(node.qualifier, ts.factory.createIdentifier(name))
                : node.qualifier;

            symbols = ts.append(symbols, firstIdentifier.symbol);
            const typeArguments = node.typeArguments?.map(visit);
            return ts.factory.createTypeReferenceNode(qualifier, typeArguments);
        }
        return ts.visitEachChild(node, visit, ts.nullTransformationContext);
    }
}

function replaceFirstIdentifierOfEntityName(name: ts.EntityName, newIdentifier: ts.Identifier): ts.EntityName {
    if (name.kind === ts.SyntaxKind.Identifier) {
        return newIdentifier;
    }
    return ts.factory.createQualifiedName(replaceFirstIdentifierOfEntityName(name.left, newIdentifier), name.right);
}

/** @internal */
export function importSymbols(importAdder: ts.codefix.ImportAdder, symbols: readonly ts.Symbol[]) {
    symbols.forEach(s => importAdder.addImportFromExportedSymbol(s, /*isValidTypeOnlyUseSite*/ true));
}

/** @internal */
export function findAncestorMatchingSpan(sourceFile: ts.SourceFile, span: ts.TextSpan): ts.Node {
    const end = ts.textSpanEnd(span);
    let token = ts.getTokenAtPosition(sourceFile, span.start);
    while (token.end < end) {
        token = token.parent;
    }
    return token;
}
