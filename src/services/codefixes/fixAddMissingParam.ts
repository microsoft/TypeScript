import {
    append,
    ArrowFunction,
    declarationNameToString,
    DiagnosticOrDiagnosticAndArguments,
    Diagnostics,
    factory,
    find,
    findAncestor,
    first,
    forEach,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    getNameOfAccessExpression,
    getNameOfDeclaration,
    getTokenAtPosition,
    isAccessExpression,
    isCallExpression,
    isIdentifier,
    isParameter,
    isPropertyDeclaration,
    isSourceFileFromLibrary,
    isVariableDeclaration,
    last,
    lastOrUndefined,
    length,
    map,
    MethodDeclaration,
    Node,
    NodeBuilderFlags,
    ParameterDeclaration,
    Program,
    SignatureKind,
    sort,
    SourceFile,
    SyntaxKind,
    textChanges,
    Type,
    TypeChecker,
} from "../_namespaces/ts";
import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix";

const fixId = "addMissingParam";
const errorCodes = [Diagnostics.Expected_0_arguments_but_got_1.code];

registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const info = getInfo(context.sourceFile, context.program, context.span.start);
        if (info === undefined) return undefined;

        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, info));
        return [createCodeFixAction(fixId, changes, info.description, fixId, Diagnostics.Add_all_missing_parameters)];
    },
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const info = getInfo(context.sourceFile, context.program, diag.start);
            if (info) {
                doChange(changes, context.sourceFile, info);
            }
        }),
});

type ConvertableSignatureDeclaration =
    | FunctionDeclaration
    | FunctionExpression
    | ArrowFunction
    | MethodDeclaration;

interface SignatureInfo {
    readonly description: DiagnosticOrDiagnosticAndArguments;
    readonly newParameters: ParameterInfo[];
    readonly declarations: ConvertableSignatureDeclaration[];
    readonly overload: ConvertableSignatureDeclaration | undefined;
}

interface ParameterInfo {
    readonly pos: number;
    readonly declaration: ParameterDeclaration;
}

function getInfo(sourceFile: SourceFile, program: Program, pos: number): SignatureInfo | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    const callExpression = findAncestor(token, isCallExpression);
    if (callExpression === undefined || length(callExpression.arguments) === 0) return undefined;

    const checker = program.getTypeChecker();
    const type = checker.getTypeAtLocation(callExpression.expression);
    const signatures = checker.getSignaturesOfType(type, SignatureKind.Call);
    const signature = lastOrUndefined(sort(signatures, (a, b) => length(a.parameters) - length(b.parameters)));
    if (
        signature &&
        signature.declaration &&
        isConvertableSignatureDeclaration(signature.declaration)
    ) {
        const declaration = (signature.declaration.body === undefined ? find(signature.declaration.symbol.declarations, d => isConvertableSignatureDeclaration(d) && !!d.body) : signature.declaration) as ConvertableSignatureDeclaration;
        if (declaration === undefined) {
            return undefined;
        }

        isSourceFileFromLibrary(program, declaration.getSourceFile());

        const overload = signature.declaration.body === undefined ? signature.declaration : undefined;
        if (overload && length(overload.parameters) !== length(declaration.parameters)) return undefined;

        const name = tryGetName(declaration);
        if (name === undefined) return undefined;

        const declarations: ConvertableSignatureDeclaration[] = append([declaration], overload);
        const newParameters: ParameterInfo[] = [];
        const parametersLength = length(declaration.parameters);
        const argumentsLength = length(callExpression.arguments);
        for (let i = 0, pos = 0, paramIndex = 0; i < argumentsLength; i++) {
            const arg = callExpression.arguments[i];
            const expr = isAccessExpression(arg) ? getNameOfAccessExpression(arg) : arg;
            const type = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(arg)));
            const parameter = pos < parametersLength ? declaration.parameters[pos] : undefined;
            if (
                parameter &&
                checker.isTypeAssignableTo(type, checker.getTypeAtLocation(parameter))
            ) {
                pos++;
            }
            else {
                const newParameter = {
                    pos: i,
                    declaration: factory.createParameterDeclaration(
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        expr && isIdentifier(expr) ? expr.text : `p${paramIndex++}`,
                        /*questionToken*/ undefined,
                        typeToTypeNode(checker, type, declaration),
                        /*initializer*/ undefined,
                    ),
                };
                append(newParameters, newParameter);
            }
        }
        return {
            declarations,
            newParameters,
            overload,
            description: [
                length(newParameters) > 1 ? Diagnostics.Add_missing_parameters_to_0 : Diagnostics.Add_missing_parameter_to_0,
                declarationNameToString(name),
            ],
        };
    }
    return undefined;
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
    const typeNode = checker.typeToTypeNode(checker.getWidenedType(type), enclosingDeclaration, NodeBuilderFlags.NoTruncation);
    return typeNode ? typeNode : factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword);
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, { declarations, newParameters }: SignatureInfo) {
    forEach(declarations, declaration => {
        if (length(declaration.parameters)) {
            changes.replaceNodeRangeWithNodes(
                sourceFile,
                first(declaration.parameters),
                last(declaration.parameters),
                updateParameters(declaration, newParameters),
                {
                    joiner: ", ",
                    indentation: 0,
                    leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll,
                    trailingTriviaOption: textChanges.TrailingTriviaOption.Include,
                },
            );
        }
        else {
            forEach(updateParameters(declaration, newParameters), (parameter, index) => {
                if (length(declaration.parameters) === 0 && index === 0) {
                    changes.insertNodeAt(sourceFile, declaration.parameters.end, parameter);
                }
                else {
                    changes.insertNodeAtEndOfList(sourceFile, declaration.parameters, parameter);
                }
            });
        }
    });
}

function isConvertableSignatureDeclaration(node: Node): node is ConvertableSignatureDeclaration {
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

function updateParameters(node: ConvertableSignatureDeclaration, newParameters: readonly ParameterInfo[]) {
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
                declaration.type,
                declaration.initializer,
            ),
        );
    }
    return parameters;
}
