import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    JSDocParameterTag,
    textChanges,
    Diagnostics,
    SyntaxKind,
    SourceFile,
    createIdentifier,
    Node,
} from "../_namespaces/ts.js";

const fixId = "fixJSDocParam";
const errorCodes = [
    Diagnostics.Rename_param_tag_name.code,
];

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile } = context;
        const paramTag = findJSDocParamTag(sourceFile, context.span.start);
        if (!paramTag) return;

        const changes = textChanges.ChangeTracker.with(context, t => doRename(t, sourceFile, paramTag, context.newName));
        return [createCodeFixAction(fixId, changes, Diagnostics.Rename_param_tag_name, fixId)];
    },
    fixIds: [fixId],
    getAllCodeActions(context) {
        return codeFixAll(context, errorCodes, (changes, err) => {
            const paramTag = findJSDocParamTag(err.file, err.start);
            if (!paramTag) return;
            doRename(changes, err.file, paramTag, context.newName);
        });
    },
});

function findJSDocParamTag(sourceFile: SourceFile, pos: number): JSDocParameterTag | undefined {
    // Traverse the AST to find the relevant @param JSDoc tag
    const token = getTokenAtPosition(sourceFile, pos);
    return token && findAncestor(token, isJSDocParameterTag);
}

function doRename(changes: textChanges.ChangeTracker, sourceFile: SourceFile, paramTag: JSDocParameterTag, newName: string): void {
    const paramName = paramTag.name;
    changes.replaceNode(sourceFile, paramName, createIdentifier(newName));
}

function isJSDocParameterTag(node: Node): node is JSDocParameterTag {
    return node.kind === SyntaxKind.JSDocParameterTag;
}
