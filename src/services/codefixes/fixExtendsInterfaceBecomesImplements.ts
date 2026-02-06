import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    getContainingClass,
    getTokenAtPosition,
    HeritageClause,
    isWhiteSpaceSingleLine,
    Node,
    SourceFile,
    SyntaxKind,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "extendsInterfaceBecomesImplements";
const errorCodes = [Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements.code];
registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const nodes = getNodes(sourceFile, context.span.start);
        if (!nodes) return undefined;
        const { extendsToken, heritageClauses } = nodes;
        const changes = textChanges.ChangeTracker.with(context, t => doChanges(t, sourceFile, extendsToken, heritageClauses));
        return [createCodeFixAction(fixId, changes, Diagnostics.Change_extends_to_implements, fixId, Diagnostics.Change_all_extended_interfaces_to_implements)];
    },
    fixIds: [fixId],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, (changes, diag) => {
            const nodes = getNodes(diag.file, diag.start);
            if (nodes) doChanges(changes, diag.file, nodes.extendsToken, nodes.heritageClauses);
        }),
});

function getNodes(sourceFile: SourceFile, pos: number) {
    const token = getTokenAtPosition(sourceFile, pos);
    const heritageClauses = getContainingClass(token)!.heritageClauses!;
    const extendsToken = heritageClauses[0].getFirstToken()!;
    return extendsToken.kind === SyntaxKind.ExtendsKeyword ? { extendsToken, heritageClauses } : undefined;
}

function doChanges(changes: textChanges.ChangeTracker, sourceFile: SourceFile, extendsToken: Node, heritageClauses: readonly HeritageClause[]): void {
    changes.replaceNode(sourceFile, extendsToken, factory.createToken(SyntaxKind.ImplementsKeyword));

    // If there is already an implements clause, replace the implements keyword with a comma.
    if (
        heritageClauses.length === 2 &&
        heritageClauses[0].token === SyntaxKind.ExtendsKeyword &&
        heritageClauses[1].token === SyntaxKind.ImplementsKeyword
    ) {
        const implementsToken = heritageClauses[1].getFirstToken()!;
        const implementsFullStart = implementsToken.getFullStart();
        changes.replaceRange(sourceFile, { pos: implementsFullStart, end: implementsFullStart }, factory.createToken(SyntaxKind.CommaToken));

        // Rough heuristic: delete trailing whitespace after keyword so that it's not excessive.
        // (Trailing because leading might be indentation, which is more sensitive.)
        const text = sourceFile.text;
        let end = implementsToken.end;
        while (end < text.length && isWhiteSpaceSingleLine(text.charCodeAt(end))) {
            end++;
        }

        changes.deleteRange(sourceFile, { pos: implementsToken.getStart(), end });
    }
}
