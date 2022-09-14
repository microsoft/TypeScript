/* @internal */
namespace ts.codefix {
const fixId = "inferFromUsage";
const errorCodes = [
    // Variable declarations
    ts.Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code,

    // Variable uses
    ts.Diagnostics.Variable_0_implicitly_has_an_1_type.code,

    // Parameter declarations
    ts.Diagnostics.Parameter_0_implicitly_has_an_1_type.code,
    ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code,

    // Get Accessor declarations
    ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code,
    ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code,

    // Set Accessor declarations
    ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code,

    // Property declarations
    ts.Diagnostics.Member_0_implicitly_has_an_1_type.code,

    //// Suggestions
    // Variable declarations
    ts.Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage.code,

    // Variable uses
    ts.Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code,

    // Parameter declarations
    ts.Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code,
    ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code,

    // Get Accessor declarations
    ts.Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage.code,
    ts.Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage.code,

    // Set Accessor declarations
    ts.Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage.code,

    // Property declarations
    ts.Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code,

    // Function expressions and declarations
    ts.Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code,
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, program, span: { start }, errorCode, cancellationToken, host, preferences } = context;

        const token = ts.getTokenAtPosition(sourceFile, start);
        let declaration: ts.Declaration | undefined;
        const changes = ts.textChanges.ChangeTracker.with(context, changes => {
            declaration = doChange(changes, sourceFile, token, errorCode, program, cancellationToken, /*markSeen*/ ts.returnTrue, host, preferences);
        });
        const name = declaration && ts.getNameOfDeclaration(declaration);
        return !name || changes.length === 0 ? undefined
            : [ts.codefix.createCodeFixAction(fixId, changes, [getDiagnostic(errorCode, token), ts.getTextOfNode(name)], fixId, ts.Diagnostics.Infer_all_types_from_usage)];
    },
    fixIds: [fixId],
    getAllCodeActions(context) {
        const { sourceFile, program, cancellationToken, host, preferences } = context;
        const markSeen = ts.nodeSeenTracker();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, err) => {
            doChange(changes, sourceFile, ts.getTokenAtPosition(err.file, err.start), err.code, program, cancellationToken, markSeen, host, preferences);
        });
    },
});

function getDiagnostic(errorCode: number, token: ts.Node): ts.DiagnosticMessage {
    switch (errorCode) {
        case ts.Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
        case ts.Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.isSetAccessorDeclaration(ts.getContainingFunction(token)!) ? ts.Diagnostics.Infer_type_of_0_from_usage : ts.Diagnostics.Infer_parameter_types_from_usage; // TODO: GH#18217
        case ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
        case ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Infer_parameter_types_from_usage;
        case ts.Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code:
            return ts.Diagnostics.Infer_this_type_of_0_from_usage;
        default:
            return ts.Diagnostics.Infer_type_of_0_from_usage;
    }
}

/** Map suggestion code to error code */
function mapSuggestionDiagnostic(errorCode: number) {
    switch (errorCode) {
        case ts.Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code;
        case ts.Diagnostics.Variable_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Variable_0_implicitly_has_an_1_type.code;
        case ts.Diagnostics.Parameter_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Parameter_0_implicitly_has_an_1_type.code;
        case ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code;
        case ts.Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_get_accessor_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code;
        case ts.Diagnostics._0_implicitly_has_an_1_return_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code;
        case ts.Diagnostics.Property_0_implicitly_has_type_any_but_a_better_type_for_its_set_accessor_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code;
        case ts.Diagnostics.Member_0_implicitly_has_an_1_type_but_a_better_type_may_be_inferred_from_usage.code:
            return ts.Diagnostics.Member_0_implicitly_has_an_1_type.code;
    }
    return errorCode;
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, token: ts.Node, errorCode: number, program: ts.Program, cancellationToken: ts.CancellationToken, markSeen: ts.NodeSeenTracker, host: ts.LanguageServiceHost, preferences: ts.UserPreferences): ts.Declaration | undefined {
    if (!ts.isParameterPropertyModifier(token.kind) && token.kind !== ts.SyntaxKind.Identifier && token.kind !== ts.SyntaxKind.DotDotDotToken && token.kind !== ts.SyntaxKind.ThisKeyword) {
        return undefined;
    }

    const { parent } = token;
    const importAdder = ts.codefix.createImportAdder(sourceFile, program, preferences, host);
    errorCode = mapSuggestionDiagnostic(errorCode);
    switch (errorCode) {
        // Variable and Property declarations
        case ts.Diagnostics.Member_0_implicitly_has_an_1_type.code:
        case ts.Diagnostics.Variable_0_implicitly_has_type_1_in_some_locations_where_its_type_cannot_be_determined.code:
            if ((ts.isVariableDeclaration(parent) && markSeen(parent)) || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent)) { // handle bad location
                annotateVariableDeclaration(changes, importAdder, sourceFile, parent, program, host, cancellationToken);
                importAdder.writeFixes(changes);
                return parent;
            }
            if (ts.isPropertyAccessExpression(parent)) {
                const type = inferTypeForVariableFromUsage(parent.name, program, cancellationToken);
                const typeNode = ts.getTypeNodeIfAccessible(type, parent, program, host);
                if (typeNode) {
                    // Note that the codefix will never fire with an existing `@type` tag, so there is no need to merge tags
                    const typeTag = ts.factory.createJSDocTypeTag(/*tagName*/ undefined, ts.factory.createJSDocTypeExpression(typeNode), /*comment*/ undefined);
                    changes.addJSDocTags(sourceFile, ts.cast(parent.parent.parent, ts.isExpressionStatement), [typeTag]);
                }
                importAdder.writeFixes(changes);
                return parent;
            }
            return undefined;

        case ts.Diagnostics.Variable_0_implicitly_has_an_1_type.code: {
            const symbol = program.getTypeChecker().getSymbolAtLocation(token);
            if (symbol && symbol.valueDeclaration && ts.isVariableDeclaration(symbol.valueDeclaration) && markSeen(symbol.valueDeclaration)) {
                annotateVariableDeclaration(changes, importAdder, ts.getSourceFileOfNode(symbol.valueDeclaration), symbol.valueDeclaration, program, host, cancellationToken);
                importAdder.writeFixes(changes);
                return symbol.valueDeclaration;
            }
            return undefined;
        }
    }

    const containingFunction = ts.getContainingFunction(token);
    if (containingFunction === undefined) {
        return undefined;
    }

    let declaration: ts.Declaration | undefined;
    switch (errorCode) {
        // Parameter declarations
        case ts.Diagnostics.Parameter_0_implicitly_has_an_1_type.code:
            if (ts.isSetAccessorDeclaration(containingFunction)) {
                annotateSetAccessor(changes, importAdder, sourceFile, containingFunction, program, host, cancellationToken);
                declaration = containingFunction;
                break;
            }
            // falls through
        case ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type.code:
            if (markSeen(containingFunction)) {
                const param = ts.cast(parent, ts.isParameter);
                annotateParameters(changes, importAdder, sourceFile, param, containingFunction, program, host, cancellationToken);
                declaration = param;
            }
            break;

        // Get Accessor declarations
        case ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_get_accessor_lacks_a_return_type_annotation.code:
        case ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type.code:
            if (ts.isGetAccessorDeclaration(containingFunction) && ts.isIdentifier(containingFunction.name)) {
                annotate(changes, importAdder, sourceFile, containingFunction, inferTypeForVariableFromUsage(containingFunction.name, program, cancellationToken), program, host);
                declaration = containingFunction;
            }
            break;

        // Set Accessor declarations
        case ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_parameter_type_annotation.code:
            if (ts.isSetAccessorDeclaration(containingFunction)) {
                annotateSetAccessor(changes, importAdder, sourceFile, containingFunction, program, host, cancellationToken);
                declaration = containingFunction;
            }
            break;

        // Function 'this'
        case ts.Diagnostics.this_implicitly_has_type_any_because_it_does_not_have_a_type_annotation.code:
            if (ts.textChanges.isThisTypeAnnotatable(containingFunction) && markSeen(containingFunction)) {
                annotateThis(changes, sourceFile, containingFunction, program, host, cancellationToken);
                declaration = containingFunction;
            }
            break;

        default:
            return ts.Debug.fail(String(errorCode));
    }

    importAdder.writeFixes(changes);
    return declaration;
}

function annotateVariableDeclaration(
    changes: ts.textChanges.ChangeTracker,
    importAdder: ts.codefix.ImportAdder,
    sourceFile: ts.SourceFile,
    declaration: ts.VariableDeclaration | ts.PropertyDeclaration | ts.PropertySignature,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    cancellationToken: ts.CancellationToken,
): void {
    if (ts.isIdentifier(declaration.name)) {
        annotate(changes, importAdder, sourceFile, declaration, inferTypeForVariableFromUsage(declaration.name, program, cancellationToken), program, host);
    }
}

function annotateParameters(
    changes: ts.textChanges.ChangeTracker,
    importAdder: ts.codefix.ImportAdder,
    sourceFile: ts.SourceFile,
    parameterDeclaration: ts.ParameterDeclaration,
    containingFunction: ts.SignatureDeclaration,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    cancellationToken: ts.CancellationToken,
): void {
    if (!ts.isIdentifier(parameterDeclaration.name)) {
        return;
    }

    const parameterInferences = inferTypeForParametersFromUsage(containingFunction, sourceFile, program, cancellationToken);
    ts.Debug.assert(containingFunction.parameters.length === parameterInferences.length, "Parameter count and inference count should match");

    if (ts.isInJSFile(containingFunction)) {
        annotateJSDocParameters(changes, sourceFile, parameterInferences, program, host);
    }
    else {
        const needParens = ts.isArrowFunction(containingFunction) && !ts.findChildOfKind(containingFunction, ts.SyntaxKind.OpenParenToken, sourceFile);
        if (needParens) changes.insertNodeBefore(sourceFile, ts.first(containingFunction.parameters), ts.factory.createToken(ts.SyntaxKind.OpenParenToken));
        for (const { declaration, type } of parameterInferences) {
            if (declaration && !declaration.type && !declaration.initializer) {
                annotate(changes, importAdder, sourceFile, declaration, type, program, host);
            }
        }
        if (needParens) changes.insertNodeAfter(sourceFile, ts.last(containingFunction.parameters), ts.factory.createToken(ts.SyntaxKind.CloseParenToken));
    }
}

function annotateThis(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, containingFunction: ts.textChanges.ThisTypeAnnotatable, program: ts.Program, host: ts.LanguageServiceHost, cancellationToken: ts.CancellationToken) {
    const references = getFunctionReferences(containingFunction, sourceFile, program, cancellationToken);
    if (!references || !references.length) {
        return;
    }
    const thisInference = inferTypeFromReferences(program, references, cancellationToken).thisParameter();
    const typeNode = ts.getTypeNodeIfAccessible(thisInference, containingFunction, program, host);
    if (!typeNode) {
        return;
    }

    if (ts.isInJSFile(containingFunction)) {
        annotateJSDocThis(changes, sourceFile, containingFunction, typeNode);
    }
    else {
        changes.tryInsertThisTypeAnnotation(sourceFile, containingFunction, typeNode);
    }
}

function annotateJSDocThis(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, containingFunction: ts.SignatureDeclaration, typeNode: ts.TypeNode) {
    changes.addJSDocTags(sourceFile, containingFunction, [
        ts.factory.createJSDocThisTag(/*tagName*/ undefined, ts.factory.createJSDocTypeExpression(typeNode)),
    ]);
}

function annotateSetAccessor(
    changes: ts.textChanges.ChangeTracker,
    importAdder: ts.codefix.ImportAdder,
    sourceFile: ts.SourceFile,
    setAccessorDeclaration: ts.SetAccessorDeclaration,
    program: ts.Program,
    host: ts.LanguageServiceHost,
    cancellationToken: ts.CancellationToken,

): void {
    const param = ts.firstOrUndefined(setAccessorDeclaration.parameters);
    if (param && ts.isIdentifier(setAccessorDeclaration.name) && ts.isIdentifier(param.name)) {
        let type = inferTypeForVariableFromUsage(setAccessorDeclaration.name, program, cancellationToken);
        if (type === program.getTypeChecker().getAnyType()) {
            type = inferTypeForVariableFromUsage(param.name, program, cancellationToken);
        }
        if (ts.isInJSFile(setAccessorDeclaration)) {
            annotateJSDocParameters(changes, sourceFile, [{ declaration: param, type }], program, host);
        }
        else {
            annotate(changes, importAdder, sourceFile, param, type, program, host);
        }
    }
}

function annotate(changes: ts.textChanges.ChangeTracker, importAdder: ts.codefix.ImportAdder, sourceFile: ts.SourceFile, declaration: ts.textChanges.TypeAnnotatable, type: ts.Type, program: ts.Program, host: ts.LanguageServiceHost): void {
    const typeNode = ts.getTypeNodeIfAccessible(type, declaration, program, host);
    if (typeNode) {
        if (ts.isInJSFile(sourceFile) && declaration.kind !== ts.SyntaxKind.PropertySignature) {
            const parent = ts.isVariableDeclaration(declaration) ? ts.tryCast(declaration.parent.parent, ts.isVariableStatement) : declaration;
            if (!parent) {
                return;
            }
            const typeExpression = ts.factory.createJSDocTypeExpression(typeNode);
            const typeTag = ts.isGetAccessorDeclaration(declaration) ? ts.factory.createJSDocReturnTag(/*tagName*/ undefined, typeExpression, /*comment*/ undefined) : ts.factory.createJSDocTypeTag(/*tagName*/ undefined, typeExpression, /*comment*/ undefined);
            changes.addJSDocTags(sourceFile, parent, [typeTag]);
        }
        else if (!tryReplaceImportTypeNodeWithAutoImport(typeNode, declaration, sourceFile, changes, importAdder, ts.getEmitScriptTarget(program.getCompilerOptions()))) {
            changes.tryInsertTypeAnnotation(sourceFile, declaration, typeNode);
        }
    }
}

function tryReplaceImportTypeNodeWithAutoImport(
    typeNode: ts.TypeNode,
    declaration: ts.textChanges.TypeAnnotatable,
    sourceFile: ts.SourceFile,
    changes: ts.textChanges.ChangeTracker,
    importAdder: ts.codefix.ImportAdder,
    scriptTarget: ts.ScriptTarget
): boolean {
    const importableReference = ts.codefix.tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
    if (importableReference && changes.tryInsertTypeAnnotation(sourceFile, declaration, importableReference.typeNode)) {
        ts.forEach(importableReference.symbols, s => importAdder.addImportFromExportedSymbol(s, /*usageIsTypeOnly*/ true));
        return true;
    }
    return false;
}

function annotateJSDocParameters(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, parameterInferences: readonly ParameterInference[], program: ts.Program, host: ts.LanguageServiceHost): void {
    const signature = parameterInferences.length && parameterInferences[0].declaration.parent;
    if (!signature) {
        return;
    }

    const inferences = ts.mapDefined(parameterInferences, inference => {
        const param = inference.declaration;
        // only infer parameters that have (1) no type and (2) an accessible inferred type
        if (param.initializer || ts.getJSDocType(param) || !ts.isIdentifier(param.name)) {
            return;
        }
        const typeNode = inference.type && ts.getTypeNodeIfAccessible(inference.type, param, program, host);
        if (typeNode) {
            const name = ts.factory.cloneNode(param.name);
            ts.setEmitFlags(name, ts.EmitFlags.NoComments | ts.EmitFlags.NoNestedComments);
            return { name: ts.factory.cloneNode(param.name), param, isOptional: !!inference.isOptional, typeNode };
        }
    });

    if (!inferences.length) {
        return;
    }

    if (ts.isArrowFunction(signature) || ts.isFunctionExpression(signature)) {
        const needParens = ts.isArrowFunction(signature) && !ts.findChildOfKind(signature, ts.SyntaxKind.OpenParenToken, sourceFile);
        if (needParens) {
            changes.insertNodeBefore(sourceFile, ts.first(signature.parameters), ts.factory.createToken(ts.SyntaxKind.OpenParenToken));
        }

        ts.forEach(inferences, ({ typeNode, param }) => {
            const typeTag = ts.factory.createJSDocTypeTag(/*tagName*/ undefined, ts.factory.createJSDocTypeExpression(typeNode));
            const jsDoc = ts.factory.createJSDocComment(/*comment*/ undefined, [typeTag]);
            changes.insertNodeAt(sourceFile, param.getStart(sourceFile), jsDoc, { suffix: " " });
        });

        if (needParens) {
            changes.insertNodeAfter(sourceFile, ts.last(signature.parameters), ts.factory.createToken(ts.SyntaxKind.CloseParenToken));
        }
    }
    else {
        const paramTags = ts.map(inferences, ({ name, typeNode, isOptional }) =>
            ts.factory.createJSDocParameterTag(/*tagName*/ undefined, name, /*isBracketed*/ !!isOptional, ts.factory.createJSDocTypeExpression(typeNode), /* isNameFirst */ false, /*comment*/ undefined));
        changes.addJSDocTags(sourceFile, signature, paramTags);
    }
}

function getReferences(token: ts.PropertyName | ts.Token<ts.SyntaxKind.ConstructorKeyword>, program: ts.Program, cancellationToken: ts.CancellationToken): readonly ts.Identifier[] {
    // Position shouldn't matter since token is not a SourceFile.
    return ts.mapDefined(ts.FindAllReferences.getReferenceEntriesForNode(-1, token, program, program.getSourceFiles(), cancellationToken), entry =>
        entry.kind !== ts.FindAllReferences.EntryKind.Span ? ts.tryCast(entry.node, ts.isIdentifier) : undefined);
}

function inferTypeForVariableFromUsage(token: ts.Identifier | ts.PrivateIdentifier, program: ts.Program, cancellationToken: ts.CancellationToken): ts.Type {
    const references = getReferences(token, program, cancellationToken);
    return inferTypeFromReferences(program, references, cancellationToken).single();
}

function inferTypeForParametersFromUsage(func: ts.SignatureDeclaration, sourceFile: ts.SourceFile, program: ts.Program, cancellationToken: ts.CancellationToken) {
    const references = getFunctionReferences(func, sourceFile, program, cancellationToken);
    return references && inferTypeFromReferences(program, references, cancellationToken).parameters(func) ||
        func.parameters.map<ParameterInference>(p => ({
            declaration: p,
            type: ts.isIdentifier(p.name) ? inferTypeForVariableFromUsage(p.name, program, cancellationToken) : program.getTypeChecker().getAnyType()
        }));
}

function getFunctionReferences(containingFunction: ts.SignatureDeclaration, sourceFile: ts.SourceFile, program: ts.Program, cancellationToken: ts.CancellationToken): readonly ts.Identifier[] | undefined {
    let searchToken;
    switch (containingFunction.kind) {
        case ts.SyntaxKind.Constructor:
            searchToken = ts.findChildOfKind<ts.Token<ts.SyntaxKind.ConstructorKeyword>>(containingFunction, ts.SyntaxKind.ConstructorKeyword, sourceFile);
            break;
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            const parent = containingFunction.parent;
            searchToken = (ts.isVariableDeclaration(parent) || ts.isPropertyDeclaration(parent)) && ts.isIdentifier(parent.name) ?
                parent.name :
                containingFunction.name;
            break;
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
            searchToken = containingFunction.name;
            break;
    }

    if (!searchToken) {
        return undefined;
    }

    return getReferences(searchToken, program, cancellationToken);
}

interface ParameterInference {
    readonly declaration: ts.ParameterDeclaration;
    readonly type: ts.Type;
    readonly isOptional?: boolean;
}

function inferTypeFromReferences(program: ts.Program, references: readonly ts.Identifier[], cancellationToken: ts.CancellationToken) {
    const checker = program.getTypeChecker();
    const builtinConstructors: { [s: string]: (t: ts.Type) => ts.Type } = {
        string: () => checker.getStringType(),
        number: () => checker.getNumberType(),
        Array: t => checker.createArrayType(t),
        Promise: t => checker.createPromiseType(t),
    };
    const builtins = [
        checker.getStringType(),
        checker.getNumberType(),
        checker.createArrayType(checker.getAnyType()),
        checker.createPromiseType(checker.getAnyType()),
    ];

    return {
        single,
        parameters,
        thisParameter,
    };

    interface CallUsage {
        argumentTypes: ts.Type[];
        return_: Usage;
    }

    interface Usage {
        isNumber: boolean | undefined;
        isString: boolean | undefined;
        /** Used ambiguously, eg x + ___ or object[___]; results in string | number if no other evidence exists */
        isNumberOrString: boolean | undefined;

        candidateTypes: ts.Type[] | undefined;
        properties: ts.UnderscoreEscapedMap<Usage> | undefined;
        calls: CallUsage[] | undefined;
        constructs: CallUsage[] | undefined;
        numberIndex: Usage | undefined;
        stringIndex: Usage | undefined;
        candidateThisTypes: ts.Type[] | undefined;
        inferredTypes: ts.Type[] | undefined;
    }

    function createEmptyUsage(): Usage {
        return {
            isNumber: undefined,
            isString: undefined,
            isNumberOrString: undefined,
            candidateTypes: undefined,
            properties: undefined,
            calls: undefined,
            constructs: undefined,
            numberIndex: undefined,
            stringIndex: undefined,
            candidateThisTypes: undefined,
            inferredTypes: undefined,
        };
    }

    function combineUsages(usages: Usage[]): Usage {
        const combinedProperties = new ts.Map<ts.__String, Usage[]>();
        for (const u of usages) {
            if (u.properties) {
                u.properties.forEach((p, name) => {
                    if (!combinedProperties.has(name)) {
                        combinedProperties.set(name, []);
                    }
                    combinedProperties.get(name)!.push(p);
                });
            }
        }
        const properties = new ts.Map<ts.__String, Usage>();
        combinedProperties.forEach((ps, name) => {
            properties.set(name, combineUsages(ps));
        });
        return {
            isNumber: usages.some(u => u.isNumber),
            isString: usages.some(u => u.isString),
            isNumberOrString: usages.some(u => u.isNumberOrString),
            candidateTypes: ts.flatMap(usages, u => u.candidateTypes) as ts.Type[],
            properties,
            calls: ts.flatMap(usages, u => u.calls) as CallUsage[],
            constructs: ts.flatMap(usages, u => u.constructs) as CallUsage[],
            numberIndex: ts.forEach(usages, u => u.numberIndex),
            stringIndex: ts.forEach(usages, u => u.stringIndex),
            candidateThisTypes: ts.flatMap(usages, u => u.candidateThisTypes) as ts.Type[],
            inferredTypes: undefined, // clear type cache
        };
    }

    function single(): ts.Type {
        return combineTypes(inferTypesFromReferencesSingle(references));
    }

    function parameters(declaration: ts.SignatureDeclaration): ParameterInference[] | undefined {
        if (references.length === 0 || !declaration.parameters) {
            return undefined;
        }

        const usage = createEmptyUsage();
        for (const reference of references) {
            cancellationToken.throwIfCancellationRequested();
            calculateUsageOfNode(reference, usage);
        }
        const calls = [...usage.constructs || [], ...usage.calls || []];
        return declaration.parameters.map((parameter, parameterIndex): ParameterInference => {
            const types = [];
            const isRest = ts.isRestParameter(parameter);
            let isOptional = false;
            for (const call of calls) {
                if (call.argumentTypes.length <= parameterIndex) {
                    isOptional = ts.isInJSFile(declaration);
                    types.push(checker.getUndefinedType());
                }
                else if (isRest) {
                    for (let i = parameterIndex; i < call.argumentTypes.length; i++) {
                        types.push(checker.getBaseTypeOfLiteralType(call.argumentTypes[i]));
                    }
                }
                else {
                    types.push(checker.getBaseTypeOfLiteralType(call.argumentTypes[parameterIndex]));
                }
            }
            if (ts.isIdentifier(parameter.name)) {
                const inferred = inferTypesFromReferencesSingle(getReferences(parameter.name, program, cancellationToken));
                types.push(...(isRest ? ts.mapDefined(inferred, checker.getElementTypeOfArrayType) : inferred));
            }
            const type = combineTypes(types);
            return {
                type: isRest ? checker.createArrayType(type) : type,
                isOptional: isOptional && !isRest,
                declaration: parameter
            };
        });
    }

    function thisParameter() {
        const usage = createEmptyUsage();
        for (const reference of references) {
            cancellationToken.throwIfCancellationRequested();
            calculateUsageOfNode(reference, usage);
        }

        return combineTypes(usage.candidateThisTypes || ts.emptyArray);
    }

    function inferTypesFromReferencesSingle(references: readonly ts.Identifier[]): ts.Type[] {
        const usage: Usage = createEmptyUsage();
        for (const reference of references) {
            cancellationToken.throwIfCancellationRequested();
            calculateUsageOfNode(reference, usage);
        }
        return inferTypes(usage);
    }

    function calculateUsageOfNode(node: ts.Expression, usage: Usage): void {
        while (ts.isRightSideOfQualifiedNameOrPropertyAccess(node)) {
            node = node.parent as ts.Expression;
        }

        switch (node.parent.kind) {
            case ts.SyntaxKind.ExpressionStatement:
                inferTypeFromExpressionStatement(node, usage);
                break;
            case ts.SyntaxKind.PostfixUnaryExpression:
                usage.isNumber = true;
                break;
            case ts.SyntaxKind.PrefixUnaryExpression:
                inferTypeFromPrefixUnaryExpression(node.parent as ts.PrefixUnaryExpression, usage);
                break;
            case ts.SyntaxKind.BinaryExpression:
                inferTypeFromBinaryExpression(node, node.parent as ts.BinaryExpression, usage);
                break;
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.DefaultClause:
                inferTypeFromSwitchStatementLabel(node.parent as ts.CaseOrDefaultClause, usage);
                break;
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
                if ((node.parent as ts.CallExpression | ts.NewExpression).expression === node) {
                    inferTypeFromCallExpression(node.parent as ts.CallExpression | ts.NewExpression, usage);
                }
                else {
                    inferTypeFromContextualType(node, usage);
                }
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                inferTypeFromPropertyAccessExpression(node.parent as ts.PropertyAccessExpression, usage);
                break;
            case ts.SyntaxKind.ElementAccessExpression:
                inferTypeFromPropertyElementExpression(node.parent as ts.ElementAccessExpression, node, usage);
                break;
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                inferTypeFromPropertyAssignment(node.parent as ts.PropertyAssignment | ts.ShorthandPropertyAssignment, usage);
                break;
            case ts.SyntaxKind.PropertyDeclaration:
                inferTypeFromPropertyDeclaration(node.parent as ts.PropertyDeclaration, usage);
                break;
            case ts.SyntaxKind.VariableDeclaration: {
                const { name, initializer } = node.parent as ts.VariableDeclaration;
                if (node === name) {
                    if (initializer) { // This can happen for `let x = null;` which still has an implicit-any error.
                        addCandidateType(usage, checker.getTypeAtLocation(initializer));
                    }
                    break;
                }
            }
            // falls through
            default:
                return inferTypeFromContextualType(node, usage);
        }
    }

    function inferTypeFromContextualType(node: ts.Expression, usage: Usage): void {
        if (ts.isExpressionNode(node)) {
            addCandidateType(usage, checker.getContextualType(node));
        }
    }

    function inferTypeFromExpressionStatement(node: ts.Expression, usage: Usage): void {
        addCandidateType(usage, ts.isCallExpression(node) ? checker.getVoidType() : checker.getAnyType());
    }

    function inferTypeFromPrefixUnaryExpression(node: ts.PrefixUnaryExpression, usage: Usage): void {
        switch (node.operator) {
            case ts.SyntaxKind.PlusPlusToken:
            case ts.SyntaxKind.MinusMinusToken:
            case ts.SyntaxKind.MinusToken:
            case ts.SyntaxKind.TildeToken:
                usage.isNumber = true;
                break;

            case ts.SyntaxKind.PlusToken:
                usage.isNumberOrString = true;
                break;

            // case SyntaxKind.ExclamationToken:
            // no inferences here;
        }
    }

    function inferTypeFromBinaryExpression(node: ts.Expression, parent: ts.BinaryExpression, usage: Usage): void {
        switch (parent.operatorToken.kind) {
            // ExponentiationOperator
            case ts.SyntaxKind.AsteriskAsteriskToken:

            // MultiplicativeOperator
            // falls through
            case ts.SyntaxKind.AsteriskToken:
            case ts.SyntaxKind.SlashToken:
            case ts.SyntaxKind.PercentToken:

            // ShiftOperator
            // falls through
            case ts.SyntaxKind.LessThanLessThanToken:
            case ts.SyntaxKind.GreaterThanGreaterThanToken:
            case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:

            // BitwiseOperator
            // falls through
            case ts.SyntaxKind.AmpersandToken:
            case ts.SyntaxKind.BarToken:
            case ts.SyntaxKind.CaretToken:

            // CompoundAssignmentOperator
            // falls through
            case ts.SyntaxKind.MinusEqualsToken:
            case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
            case ts.SyntaxKind.AsteriskEqualsToken:
            case ts.SyntaxKind.SlashEqualsToken:
            case ts.SyntaxKind.PercentEqualsToken:
            case ts.SyntaxKind.AmpersandEqualsToken:
            case ts.SyntaxKind.BarEqualsToken:
            case ts.SyntaxKind.CaretEqualsToken:
            case ts.SyntaxKind.LessThanLessThanEqualsToken:
            case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:

            // AdditiveOperator
            // falls through
            case ts.SyntaxKind.MinusToken:

            // RelationalOperator
            // falls through
            case ts.SyntaxKind.LessThanToken:
            case ts.SyntaxKind.LessThanEqualsToken:
            case ts.SyntaxKind.GreaterThanToken:
            case ts.SyntaxKind.GreaterThanEqualsToken:
                const operandType = checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);
                if (operandType.flags & ts.TypeFlags.EnumLike) {
                    addCandidateType(usage, operandType);
                }
                else {
                    usage.isNumber = true;
                }
                break;

            case ts.SyntaxKind.PlusEqualsToken:
            case ts.SyntaxKind.PlusToken:
                const otherOperandType = checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left);
                if (otherOperandType.flags & ts.TypeFlags.EnumLike) {
                    addCandidateType(usage, otherOperandType);
                }
                else if (otherOperandType.flags & ts.TypeFlags.NumberLike) {
                    usage.isNumber = true;
                }
                else if (otherOperandType.flags & ts.TypeFlags.StringLike) {
                    usage.isString = true;
                }
                else if (otherOperandType.flags & ts.TypeFlags.Any) {
                    // do nothing, maybe we'll learn something elsewhere
                }
                else {
                    usage.isNumberOrString = true;
                }
                break;

            //  AssignmentOperators
            case ts.SyntaxKind.EqualsToken:
            case ts.SyntaxKind.EqualsEqualsToken:
            case ts.SyntaxKind.EqualsEqualsEqualsToken:
            case ts.SyntaxKind.ExclamationEqualsEqualsToken:
            case ts.SyntaxKind.ExclamationEqualsToken:
                addCandidateType(usage, checker.getTypeAtLocation(parent.left === node ? parent.right : parent.left));
                break;

            case ts.SyntaxKind.InKeyword:
                if (node === parent.left) {
                    usage.isString = true;
                }
                break;

            // LogicalOperator Or NullishCoalescing
            case ts.SyntaxKind.BarBarToken:
            case ts.SyntaxKind.QuestionQuestionToken:
                if (node === parent.left &&
                    (node.parent.parent.kind === ts.SyntaxKind.VariableDeclaration || ts.isAssignmentExpression(node.parent.parent, /*excludeCompoundAssignment*/ true))) {
                    // var x = x || {};
                    // TODO: use getFalsyflagsOfType
                    addCandidateType(usage, checker.getTypeAtLocation(parent.right));
                }
                break;

            case ts.SyntaxKind.AmpersandAmpersandToken:
            case ts.SyntaxKind.CommaToken:
            case ts.SyntaxKind.InstanceOfKeyword:
                // nothing to infer here
                break;
        }
    }

    function inferTypeFromSwitchStatementLabel(parent: ts.CaseOrDefaultClause, usage: Usage): void {
        addCandidateType(usage, checker.getTypeAtLocation(parent.parent.parent.expression));
    }

    function inferTypeFromCallExpression(parent: ts.CallExpression | ts.NewExpression, usage: Usage): void {
        const call: CallUsage = {
            argumentTypes: [],
            return_: createEmptyUsage()
        };

        if (parent.arguments) {
            for (const argument of parent.arguments) {
                call.argumentTypes.push(checker.getTypeAtLocation(argument));
            }
        }

        calculateUsageOfNode(parent, call.return_);
        if (parent.kind === ts.SyntaxKind.CallExpression) {
            (usage.calls || (usage.calls = [])).push(call);
        }
        else {
            (usage.constructs || (usage.constructs = [])).push(call);
        }
    }

    function inferTypeFromPropertyAccessExpression(parent: ts.PropertyAccessExpression, usage: Usage): void {
        const name = ts.escapeLeadingUnderscores(parent.name.text);
        if (!usage.properties) {
            usage.properties = new ts.Map();
        }
        const propertyUsage = usage.properties.get(name) || createEmptyUsage();
        calculateUsageOfNode(parent, propertyUsage);
        usage.properties.set(name, propertyUsage);
    }

    function inferTypeFromPropertyElementExpression(parent: ts.ElementAccessExpression, node: ts.Expression, usage: Usage): void {
        if (node === parent.argumentExpression) {
            usage.isNumberOrString = true;
            return;
        }
        else {
            const indexType = checker.getTypeAtLocation(parent.argumentExpression);
            const indexUsage = createEmptyUsage();
            calculateUsageOfNode(parent, indexUsage);
            if (indexType.flags & ts.TypeFlags.NumberLike) {
                usage.numberIndex = indexUsage;
            }
            else {
                usage.stringIndex = indexUsage;
            }
        }
    }

    function inferTypeFromPropertyAssignment(assignment: ts.PropertyAssignment | ts.ShorthandPropertyAssignment, usage: Usage) {
        const nodeWithRealType = ts.isVariableDeclaration(assignment.parent.parent) ?
            assignment.parent.parent :
            assignment.parent;
        addCandidateThisType(usage, checker.getTypeAtLocation(nodeWithRealType));
    }

    function inferTypeFromPropertyDeclaration(declaration: ts.PropertyDeclaration, usage: Usage) {
        addCandidateThisType(usage, checker.getTypeAtLocation(declaration.parent));
    }

    interface Priority {
        high: (t: ts.Type) => boolean;
        low: (t: ts.Type) => boolean;
    }

    function removeLowPriorityInferences(inferences: readonly ts.Type[], priorities: Priority[]): ts.Type[] {
        const toRemove: ((t: ts.Type) => boolean)[] = [];
        for (const i of inferences) {
            for (const { high, low } of priorities) {
                if (high(i)) {
                    ts.Debug.assert(!low(i), "Priority can't have both low and high");
                    toRemove.push(low);
                }
            }
        }
        return inferences.filter(i => toRemove.every(f => !f(i)));
    }

    function combineFromUsage(usage: Usage) {
        return combineTypes(inferTypes(usage));
    }

    function combineTypes(inferences: readonly ts.Type[]): ts.Type {
        if (!inferences.length) return checker.getAnyType();

        // 1. string or number individually override string | number
        // 2. non-any, non-void overrides any or void
        // 3. non-nullable, non-any, non-void, non-anonymous overrides anonymous types
        const stringNumber = checker.getUnionType([checker.getStringType(), checker.getNumberType()]);
        const priorities: Priority[] = [
            {
                high: t => t === checker.getStringType() || t === checker.getNumberType(),
                low: t => t === stringNumber
            },
            {
                high: t => !(t.flags & (ts.TypeFlags.Any | ts.TypeFlags.Void)),
                low: t => !!(t.flags & (ts.TypeFlags.Any | ts.TypeFlags.Void))
            },
            {
                high: t => !(t.flags & (ts.TypeFlags.Nullable | ts.TypeFlags.Any | ts.TypeFlags.Void)) && !(ts.getObjectFlags(t) & ts.ObjectFlags.Anonymous),
                low: t => !!(ts.getObjectFlags(t) & ts.ObjectFlags.Anonymous)
            }];
        let good = removeLowPriorityInferences(inferences, priorities);
        const anons = good.filter(i => ts.getObjectFlags(i) & ts.ObjectFlags.Anonymous) as ts.AnonymousType[];
        if (anons.length) {
            good = good.filter(i => !(ts.getObjectFlags(i) & ts.ObjectFlags.Anonymous));
            good.push(combineAnonymousTypes(anons));
        }
        return checker.getWidenedType(checker.getUnionType(good.map(checker.getBaseTypeOfLiteralType), ts.UnionReduction.Subtype));
    }

    function combineAnonymousTypes(anons: ts.AnonymousType[]) {
        if (anons.length === 1) {
            return anons[0];
        }
        const calls = [];
        const constructs = [];
        const stringIndices = [];
        const numberIndices = [];
        let stringIndexReadonly = false;
        let numberIndexReadonly = false;
        const props = ts.createMultiMap<ts.Type>();
        for (const anon of anons) {
            for (const p of checker.getPropertiesOfType(anon)) {
                props.add(p.name, p.valueDeclaration ? checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration) : checker.getAnyType());
            }
            calls.push(...checker.getSignaturesOfType(anon, ts.SignatureKind.Call));
            constructs.push(...checker.getSignaturesOfType(anon, ts.SignatureKind.Construct));
            const stringIndexInfo = checker.getIndexInfoOfType(anon, ts.IndexKind.String);
            if (stringIndexInfo) {
                stringIndices.push(stringIndexInfo.type);
                stringIndexReadonly = stringIndexReadonly || stringIndexInfo.isReadonly;
            }
            const numberIndexInfo = checker.getIndexInfoOfType(anon, ts.IndexKind.Number);
            if (numberIndexInfo) {
                numberIndices.push(numberIndexInfo.type);
                numberIndexReadonly = numberIndexReadonly || numberIndexInfo.isReadonly;
            }
        }
        const members = ts.mapEntries(props, (name, types) => {
            const isOptional = types.length < anons.length ? ts.SymbolFlags.Optional : 0;
            const s = checker.createSymbol(ts.SymbolFlags.Property | isOptional, name as ts.__String);
            s.type = checker.getUnionType(types);
            return [name, s];
        });
        const indexInfos = [];
        if (stringIndices.length) indexInfos.push(checker.createIndexInfo(checker.getStringType(), checker.getUnionType(stringIndices), stringIndexReadonly));
        if (numberIndices.length) indexInfos.push(checker.createIndexInfo(checker.getNumberType(), checker.getUnionType(numberIndices), numberIndexReadonly));
        return checker.createAnonymousType(
            anons[0].symbol,
            members as ts.UnderscoreEscapedMap<ts.TransientSymbol>,
            calls,
            constructs,
            indexInfos);
    }

    function inferTypes(usage: Usage): ts.Type[] {
        const types = [];

        if (usage.isNumber) {
            types.push(checker.getNumberType());
        }
        if (usage.isString) {
            types.push(checker.getStringType());
        }
        if (usage.isNumberOrString) {
            types.push(checker.getUnionType([checker.getStringType(), checker.getNumberType()]));
        }
        if (usage.numberIndex) {
            types.push(checker.createArrayType(combineFromUsage(usage.numberIndex)));
        }
        if (usage.properties?.size || usage.constructs?.length || usage.stringIndex) {
            types.push(inferStructuralType(usage));
        }

        const candidateTypes = (usage.candidateTypes || []).map(t => checker.getBaseTypeOfLiteralType(t));
        const callsType = usage.calls?.length ? inferStructuralType(usage) : undefined;
        if (callsType && candidateTypes) {
            types.push(checker.getUnionType([callsType, ...candidateTypes], ts.UnionReduction.Subtype));
        }
        else {
            if (callsType) {
                types.push(callsType);
            }
            if (ts.length(candidateTypes)) {
                types.push(...candidateTypes);
            }
        }

        types.push(...inferNamedTypesFromProperties(usage));
        return types;
    }

    function inferStructuralType(usage: Usage) {
        const members = new ts.Map<ts.__String, ts.Symbol>();
        if (usage.properties) {
            usage.properties.forEach((u, name) => {
                const symbol = checker.createSymbol(ts.SymbolFlags.Property, name);
                symbol.type = combineFromUsage(u);
                members.set(name, symbol);
            });
        }
        const callSignatures: ts.Signature[] = usage.calls ? [getSignatureFromCalls(usage.calls)] : [];
        const constructSignatures: ts.Signature[] = usage.constructs ? [getSignatureFromCalls(usage.constructs)] : [];
        const indexInfos = usage.stringIndex ? [checker.createIndexInfo(checker.getStringType(), combineFromUsage(usage.stringIndex), /*isReadonly*/ false)] : [];
        return checker.createAnonymousType(/*symbol*/ undefined, members, callSignatures, constructSignatures, indexInfos);
    }

    function inferNamedTypesFromProperties(usage: Usage): ts.Type[] {
        if (!usage.properties || !usage.properties.size) return [];
        const types = builtins.filter(t => allPropertiesAreAssignableToUsage(t, usage));
        if (0 < types.length && types.length < 3) {
            return types.map(t => inferInstantiationFromUsage(t, usage));
        }
        return [];
    }

    function allPropertiesAreAssignableToUsage(type: ts.Type, usage: Usage) {
        if (!usage.properties) return false;
        return !ts.forEachEntry(usage.properties, (propUsage, name) => {
            const source = checker.getTypeOfPropertyOfType(type, name as string);
            if (!source) {
                return true;
            }
            if (propUsage.calls) {
                const sigs = checker.getSignaturesOfType(source, ts.SignatureKind.Call);
                return !sigs.length || !checker.isTypeAssignableTo(source, getFunctionFromCalls(propUsage.calls));
            }
            else {
                return !checker.isTypeAssignableTo(source, combineFromUsage(propUsage));
            }
        });
    }

    /**
     * inference is limited to
     * 1. generic types with a single parameter
     * 2. inference to/from calls with a single signature
     */
    function inferInstantiationFromUsage(type: ts.Type, usage: Usage) {
        if (!(ts.getObjectFlags(type) & ts.ObjectFlags.Reference) || !usage.properties) {
            return type;
        }
        const generic = (type as ts.TypeReference).target;
        const singleTypeParameter = ts.singleOrUndefined(generic.typeParameters);
        if (!singleTypeParameter) return type;

        const types: ts.Type[] = [];
        usage.properties.forEach((propUsage, name) => {
            const genericPropertyType = checker.getTypeOfPropertyOfType(generic, name as string);
            ts.Debug.assert(!!genericPropertyType, "generic should have all the properties of its reference.");
            types.push(...inferTypeParameters(genericPropertyType, combineFromUsage(propUsage), singleTypeParameter));
        });
        return builtinConstructors[type.symbol.escapedName as string](combineTypes(types));
    }

    function inferTypeParameters(genericType: ts.Type, usageType: ts.Type, typeParameter: ts.Type): readonly ts.Type[] {
        if (genericType === typeParameter) {
            return [usageType];
        }
        else if (genericType.flags & ts.TypeFlags.UnionOrIntersection) {
            return ts.flatMap((genericType as ts.UnionOrIntersectionType).types, t => inferTypeParameters(t, usageType, typeParameter));
        }
        else if (ts.getObjectFlags(genericType) & ts.ObjectFlags.Reference && ts.getObjectFlags(usageType) & ts.ObjectFlags.Reference) {
            // this is wrong because we need a reference to the targetType to, so we can check that it's also a reference
            const genericArgs = checker.getTypeArguments(genericType as ts.TypeReference);
            const usageArgs = checker.getTypeArguments(usageType as ts.TypeReference);
            const types = [];
            if (genericArgs && usageArgs) {
                for (let i = 0; i < genericArgs.length; i++) {
                    if (usageArgs[i]) {
                        types.push(...inferTypeParameters(genericArgs[i], usageArgs[i], typeParameter));
                    }
                }
            }
            return types;
        }
        const genericSigs = checker.getSignaturesOfType(genericType, ts.SignatureKind.Call);
        const usageSigs = checker.getSignaturesOfType(usageType, ts.SignatureKind.Call);
        if (genericSigs.length === 1 && usageSigs.length === 1) {
            return inferFromSignatures(genericSigs[0], usageSigs[0], typeParameter);
        }
        return [];
    }

    function inferFromSignatures(genericSig: ts.Signature, usageSig: ts.Signature, typeParameter: ts.Type) {
        const types = [];
        for (let i = 0; i < genericSig.parameters.length; i++) {
            const genericParam = genericSig.parameters[i];
            const usageParam = usageSig.parameters[i];
            const isRest = genericSig.declaration && ts.isRestParameter(genericSig.declaration.parameters[i]);
            if (!usageParam) {
                break;
            }
            let genericParamType = genericParam.valueDeclaration ? checker.getTypeOfSymbolAtLocation(genericParam, genericParam.valueDeclaration) : checker.getAnyType();
            const elementType = isRest && checker.getElementTypeOfArrayType(genericParamType);
            if (elementType) {
                genericParamType = elementType;
            }
            const targetType = (usageParam as ts.SymbolLinks).type
                || (usageParam.valueDeclaration ? checker.getTypeOfSymbolAtLocation(usageParam, usageParam.valueDeclaration) : checker.getAnyType());
            types.push(...inferTypeParameters(genericParamType, targetType, typeParameter));
        }
        const genericReturn = checker.getReturnTypeOfSignature(genericSig);
        const usageReturn = checker.getReturnTypeOfSignature(usageSig);
        types.push(...inferTypeParameters(genericReturn, usageReturn, typeParameter));
        return types;
    }

    function getFunctionFromCalls(calls: CallUsage[]) {
        return checker.createAnonymousType(/*symbol*/ undefined, ts.createSymbolTable(), [getSignatureFromCalls(calls)], ts.emptyArray, ts.emptyArray);
    }

    function getSignatureFromCalls(calls: CallUsage[]): ts.Signature {
        const parameters: ts.Symbol[] = [];
        const length = Math.max(...calls.map(c => c.argumentTypes.length));
        for (let i = 0; i < length; i++) {
            const symbol = checker.createSymbol(ts.SymbolFlags.FunctionScopedVariable, ts.escapeLeadingUnderscores(`arg${i}`));
            symbol.type = combineTypes(calls.map(call => call.argumentTypes[i] || checker.getUndefinedType()));
            if (calls.some(call => call.argumentTypes[i] === undefined)) {
                symbol.flags |= ts.SymbolFlags.Optional;
            }
            parameters.push(symbol);
        }
        const returnType = combineFromUsage(combineUsages(calls.map(call => call.return_)));
        return checker.createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, parameters, returnType, /*typePredicate*/ undefined, length, ts.SignatureFlags.None);
    }

    function addCandidateType(usage: Usage, type: ts.Type | undefined) {
        if (type && !(type.flags & ts.TypeFlags.Any) && !(type.flags & ts.TypeFlags.Never)) {
            (usage.candidateTypes || (usage.candidateTypes = [])).push(type);
        }
    }

    function addCandidateThisType(usage: Usage, type: ts.Type | undefined) {
        if (type && !(type.flags & ts.TypeFlags.Any) && !(type.flags & ts.TypeFlags.Never)) {
            (usage.candidateThisTypes || (usage.candidateThisTypes = [])).push(type);
        }
    }
}
}
