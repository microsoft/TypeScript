import * as ts from "../_namespaces/ts";

const fixId = "fixConvertConstToLet";
const errorCodes = [ts.Diagnostics.Cannot_assign_to_0_because_it_is_a_constant.code];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToConvertConstToLet(context) {
        const { sourceFile, span, program } = context;
        const info = getInfo(sourceFile, span.start, program);
        if (info === undefined) return;

        const changes = ts.textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info.token));
        return [ts.codefix.createCodeFixActionMaybeFixAll(fixId, changes, ts.Diagnostics.Convert_const_to_let, fixId, ts.Diagnostics.Convert_all_const_to_let)];
    },
    getAllCodeActions: context => {
        const { program } = context;
        const seen = new ts.Map<number, true>();

        return ts.codefix.createCombinedCodeActions(ts.textChanges.ChangeTracker.with(context, changes => {
            ts.codefix.eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(diag.file, diag.start, program);
                if (info) {
                    if (ts.addToSeen(seen, ts.getSymbolId(info.symbol))) {
                        return doChange(changes, diag.file, info.token);
                    }
                }
                return undefined;
            });
        }));
    },
    fixIds: [fixId]
});

interface Info {
    symbol: ts.Symbol;
    token: ts.Token<ts.SyntaxKind.ConstKeyword>;
}

function getInfo(sourceFile: ts.SourceFile, pos: number, program: ts.Program): Info | undefined {
    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(ts.getTokenAtPosition(sourceFile, pos));
    if (symbol === undefined) return;

    const declaration = ts.tryCast(symbol?.valueDeclaration?.parent, ts.isVariableDeclarationList);
    if (declaration === undefined) return;

    const constToken = ts.findChildOfKind<ts.Token<ts.SyntaxKind.ConstKeyword>>(declaration, ts.SyntaxKind.ConstKeyword, sourceFile);
    if (constToken === undefined) return;

    return { symbol, token: constToken };
}

function doChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, token: ts.Token<ts.SyntaxKind.ConstKeyword>) {
    changes.replaceNode(sourceFile, token, ts.factory.createToken(ts.SyntaxKind.LetKeyword));
}
