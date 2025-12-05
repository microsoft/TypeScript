import {
    createCodeFixActionMaybeFixAll,
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    addToSeen,
    Diagnostics,
    factory,
    findChildOfKind,
    getSymbolId,
    getTokenAtPosition,
    isVariableDeclarationList,
    Program,
    SourceFile,
    Symbol,
    SyntaxKind,
    textChanges,
    Token,
    tryCast,
} from "../_namespaces/ts.js";

const fixId = "fixConvertConstToLet";
const errorCodes = [Diagnostics.Cannot_assign_to_0_because_it_is_a_constant.code];

registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertConstToLet(context) {
        const { sourceFile, span, program } = context;
        const info = getInfo(sourceFile, span.start, program);
        if (info === undefined) return;

        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info.token));
        return [createCodeFixActionMaybeFixAll(fixId, changes, Diagnostics.Convert_const_to_let, fixId, Diagnostics.Convert_all_const_to_let)];
    },
    getAllCodeActions: context => {
        const { program } = context;
        const seen = new Set<number>();

        return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
            eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(diag.file, diag.start, program);
                if (info) {
                    if (addToSeen(seen, getSymbolId(info.symbol))) {
                        return doChange(changes, diag.file, info.token);
                    }
                }
                return undefined;
            });
        }));
    },
    fixIds: [fixId],
});

interface Info {
    symbol: Symbol;
    token: Token<SyntaxKind.ConstKeyword>;
}

function getInfo(sourceFile: SourceFile, pos: number, program: Program): Info | undefined {
    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(getTokenAtPosition(sourceFile, pos));
    if (symbol === undefined) return;

    const declaration = tryCast(symbol?.valueDeclaration?.parent, isVariableDeclarationList);
    if (declaration === undefined) return;

    const constToken = findChildOfKind<Token<SyntaxKind.ConstKeyword>>(declaration, SyntaxKind.ConstKeyword, sourceFile);
    if (constToken === undefined) return;

    return { symbol, token: constToken };
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Token<SyntaxKind.ConstKeyword>) {
    changes.replaceNode(sourceFile, token, factory.createToken(SyntaxKind.LetKeyword));
}
