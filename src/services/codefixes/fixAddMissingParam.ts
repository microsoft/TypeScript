import {
    codeFixAll,
    createCodeFixAction,
    createImportAdder,
    ImportAdder,
    importSymbols,
    registerCodeFix,
    tryGetAutoImportableReferenceFromTypeNode,
} from "../_namespaces/ts.codefix.js";
import {
    append,
    ArrowFunction,
    CodeFixAction,
    declarationNameToString,
    Diagnostics,
    factory,
    filter,
    findAncestor,
    first,
    forEach,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    getEmitScriptTarget,
    getNameOfAccessExpression,
    getNameOfDeclaration,
    getSourceFileOfNode,
    getTokenAtPosition,
    InternalNodeBuilderFlags,
    isAccessExpression,
    isCallExpression,
    isIdentifier,
    isParameter,
    isPropertyDeclaration,
    isSourceFileFromLibrary,
    isVariableDeclaration,
    LanguageServiceHost,
    last,
    lastOrUndefined,
    length,
    map,
    MethodDeclaration,
    Node,
    NodeBuilderFlags,
    ParameterDeclaration,
    Program,
    QuestionToken,
    ScriptTarget,
    some,
    SourceFile,
    SyntaxKind,
    textChanges,
    Type,
    TypeChecker,
    TypeNode,
    UserPreferences,
} from "../_namespaces/ts.js";

const addMissingParamFixId = "addMissingParam";
const addOptionalParamFixId = "addOptionalParam";
const errorCodes = [Diagnostics.Expected_0_arguments_but_got_1.code];

registerCodeFix({
    errorCodes,
    fixIds: [addMissingParamFixId, addOptionalParamFixId],
    getCodeActions(context) {
        const info = getInfo(context.sourceFile, context.program, context.span.start);
        if (info === undefined) return undefined;

        const { name, declarations, newParameters, newOptionalParameters } = info;
        const actions: CodeFixAction[] = [];

        if (length(newParameters)) {
            append(
                actions,
                createCodeFixAction(
                    addMissingParamFixId,
                    textChanges.ChangeTracker.with(context, t => doChange(t, context.program, context.preferences, context.host, declarations, newParameters)),
                    [length(newParameters) > 1 ? Diagnostics.Add_missing_parameters_to_0 : Diagnostics.Add_missing_parameter_to_0, name],
                    addMissingParamFixId,
                    Diagnostics.Add_all_missing_parameters,
                ),
            );
        }

        if (length(newOptionalParameters)) {
            append(
                actions,
                createCodeFixAction(
                    addOptionalParamFixId,
                    textChanges.ChangeTracker.with(context, t => doChange(t, context.program, context.preferences, context.host, declarations, newOptionalParameters)),
                    [length(newOptionalParameters) > 1 ? Diagnostics.Add_optional_parameters_to_0 : Diagnostics.Add_optional_parameter_to_0, name],
                    addOptionalParamFixId,
                    Diagnostics.Add_all_optional_parameters,
                ),
            );
        }

        return actions;
    },
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.sourceFile, context.program, diag.start);
            if (info) {
                const { declarations, newParameters, newOptionalParameters } = info;
                if (context.fixId === addMissingParamFixId) {
                    doChange(changes, context.program, context.preferences, context.host, declarations, newParameters);
                }
                if (context.fixId === addOptionalParamFixId) {
                    doChange(changes, context.program, context.preferences, context.host, declarations, newOptionalParameters);
                }
            }
        }),
});

type ConvertibleSignatureDeclaration =
    | FunctionDeclaration
    | FunctionExpression
    | ArrowFunction
    | MethodDeclaration;

interface SignatureInfo {
    readonly newParameters: ParameterInfo[];
    readonly newOptionalParameters: ParameterInfo[];
    readonly name: string;
    readonly declarations: ConvertibleSignatureDeclaration[];
}

interface ParameterInfo {
    readonly pos: number;
    readonly declaration: ParameterDeclaration;
}

function getInfo(sourceFile: SourceFile, program: Program, pos: number): SignatureInfo | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    const callExpression = findAncestor(token, isCallExpression);
    if (callExpression === undefined || length(callExpression.arguments) === 0) {
        return undefined;
    }

    const checker = program.getTypeChecker();
    const type = checker.getTypeAtLocation(callExpression.expression);
    const convertibleSignatureDeclarations = filter(type.symbol.declarations, isConvertibleSignatureDeclaration);
    if (convertibleSignatureDeclarations === undefined) {
        return undefined;
    }

    const nonOverloadDeclaration = lastOrUndefined(convertibleSignatureDeclarations);
    if (
        nonOverloadDeclaration === undefined ||
        nonOverloadDeclaration.body === undefined ||
        isSourceFileFromLibrary(program, nonOverloadDeclaration.getSourceFile())
    ) {
        return undefined;
    }

    const name = tryGetName(nonOverloadDeclaration);
    if (name === undefined) {
        return undefined;
    }

    const newParameters: ParameterInfo[] = [];
    const newOptionalParameters: ParameterInfo[] = [];
    const parametersLength = length(nonOverloadDeclaration.parameters);
    const argumentsLength = length(callExpression.arguments);
    if (parametersLength > argumentsLength) {
        return undefined;
    }

    const declarations = [nonOverloadDeclaration, ...getOverloads(nonOverloadDeclaration, convertibleSignatureDeclarations)];
    for (let i = 0, pos = 0, paramIndex = 0; i < argumentsLength; i++) {
        const arg = callExpression.arguments[i];
        const expr = isAccessExpression(arg) ? getNameOfAccessExpression(arg) : arg;
        const type = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(arg)));
        const parameter = pos < parametersLength ? nonOverloadDeclaration.parameters[pos] : undefined;
        if (
            parameter &&
            checker.isTypeAssignableTo(type, checker.getTypeAtLocation(parameter))
        ) {
            pos++;
            continue;
        }

        const name = expr && isIdentifier(expr) ? expr.text : `p${paramIndex++}`;
        const typeNode = typeToTypeNode(checker, type, nonOverloadDeclaration);
        append(newParameters, {
            pos: i,
            declaration: createParameter(name, typeNode, /*questionToken*/ undefined),
        });

        if (isOptionalPos(declarations, pos)) {
            continue;
        }

        append(newOptionalParameters, {
            pos: i,
            declaration: createParameter(name, typeNode, factory.createToken(SyntaxKind.QuestionToken)),
        });
    }

    return {
        newParameters,
        newOptionalParameters,
        name: declarationNameToString(name),
        declarations,
    };
}

function tryGetName(node: FunctionLikeDeclaration) {
    const name = getNameOfDeclaration(node);
    if (name) {
        return name;
    }

    if (
        isVariableDeclaration(node.parent) && isIdentifier(node.parent.name) ||
        isPropertyDeclaration(node.parent) ||
        isParameter(node.parent)
    ) {
        return node.parent.name;
    }
}

function typeToTypeNode(checker: TypeChecker, type: Type, enclosingDeclaration: Node) {
    return checker.typeToTypeNode(checker.getWidenedType(type), enclosingDeclaration, NodeBuilderFlags.NoTruncation, InternalNodeBuilderFlags.AllowUnresolvedNames)
        ?? factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
}

function doChange(
    changes: textChanges.ChangeTracker,
    program: Program,
    preferences: UserPreferences,
    host: LanguageServiceHost,
    declarations: ConvertibleSignatureDeclaration[],
    newParameters: ParameterInfo[],
) {
    const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
    forEach(declarations, declaration => {
        const sourceFile = getSourceFileOfNode(declaration);
        const importAdder = createImportAdder(sourceFile, program, preferences, host);
        if (length(declaration.parameters)) {
            changes.replaceNodeRangeWithNodes(
                sourceFile,
                first(declaration.parameters),
                last(declaration.parameters),
                updateParameters(importAdder, scriptTarget, declaration, newParameters),
                {
                    joiner: ", ",
                    indentation: 0,
                    leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll,
                    trailingTriviaOption: textChanges.TrailingTriviaOption.Include,
                },
            );
        }
        else {
            forEach(updateParameters(importAdder, scriptTarget, declaration, newParameters), (parameter, index) => {
                if (length(declaration.parameters) === 0 && index === 0) {
                    changes.insertNodeAt(sourceFile, declaration.parameters.end, parameter);
                }
                else {
                    changes.insertNodeAtEndOfList(sourceFile, declaration.parameters, parameter);
                }
            });
        }
        importAdder.writeFixes(changes);
    });
}

function isConvertibleSignatureDeclaration(node: Node): node is ConvertibleSignatureDeclaration {
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}

function updateParameters(
    importAdder: ImportAdder,
    scriptTarget: ScriptTarget,
    node: ConvertibleSignatureDeclaration,
    newParameters: readonly ParameterInfo[],
) {
    const parameters = map(node.parameters, p =>
        factory.createParameterDeclaration(
            p.modifiers,
            p.dotDotDotToken,
            p.name,
            p.questionToken,
            p.type,
            p.initializer,
        ));
    for (const { pos, declaration } of newParameters) {
        const prev = pos > 0 ? parameters[pos - 1] : undefined;
        parameters.splice(
            pos,
            0,
            factory.updateParameterDeclaration(
                declaration,
                declaration.modifiers,
                declaration.dotDotDotToken,
                declaration.name,
                prev && prev.questionToken ? factory.createToken(SyntaxKind.QuestionToken) : declaration.questionToken,
                getParameterType(importAdder, declaration.type, scriptTarget),
                declaration.initializer,
            ),
        );
    }
    return parameters;
}

function getOverloads(implementation: ConvertibleSignatureDeclaration, declarations: readonly ConvertibleSignatureDeclaration[]): ConvertibleSignatureDeclaration[] {
    const overloads: ConvertibleSignatureDeclaration[] = [];
    for (const declaration of declarations) {
        if (isOverload(declaration)) {
            if (length(declaration.parameters) === length(implementation.parameters)) {
                overloads.push(declaration);
                continue;
            }
            if (length(declaration.parameters) > length(implementation.parameters)) {
                return [];
            }
        }
    }
    return overloads;
}

function isOverload(declaration: ConvertibleSignatureDeclaration) {
    return isConvertibleSignatureDeclaration(declaration) && declaration.body === undefined;
}

function createParameter(name: string, type: TypeNode, questionToken: QuestionToken | undefined) {
    return factory.createParameterDeclaration(
        /*modifiers*/ undefined,
        /*dotDotDotToken*/ undefined,
        name,
        questionToken,
        type,
        /*initializer*/ undefined,
    );
}

function isOptionalPos(declarations: ConvertibleSignatureDeclaration[], pos: number) {
    return length(declarations) && some(declarations, d => pos < length(d.parameters) && !!d.parameters[pos] && d.parameters[pos].questionToken === undefined);
}

function getParameterType(importAdder: ImportAdder, typeNode: TypeNode | undefined, scriptTarget: ScriptTarget) {
    const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
    if (importableReference) {
        importSymbols(importAdder, importableReference.symbols);
        return importableReference.typeNode;
    }
    return typeNode;
}
