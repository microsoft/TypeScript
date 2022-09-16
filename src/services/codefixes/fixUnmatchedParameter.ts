/* @internal */
namespace ts.codefix {
const deleteUnmatchedParameter = "deleteUnmatchedParameter";
const renameUnmatchedParameter = "renameUnmatchedParameter";

const errorCodes = [
    ts.Diagnostics.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name.code,
];

ts.codefix.registerCodeFix({
    fixIds: [deleteUnmatchedParameter, renameUnmatchedParameter],
    errorCodes,
    getCodeActions: function getCodeActionsToFixUnmatchedParameter(context) {
        const { sourceFile, span } = context;
        const actions: ts.CodeFixAction[] = [];
        const info = getInfo(sourceFile, span.start);
        if (info) {
            ts.append(actions, getDeleteAction(context, info));
            ts.append(actions, getRenameAction(context, info));
            return actions;
        }
        return undefined;
    },
    getAllCodeActions: function getAllCodeActionsToFixUnmatchedParameter(context) {
        const tagsToSignature = new ts.Map<ts.SignatureDeclaration, ts.JSDocTag[]>();
        return ts.codefix.createCombinedCodeActions(ts.textChanges.ChangeTracker.with(context, changes => {
            ts.codefix.eachDiagnostic(context, errorCodes, ({ file, start }) => {
                const info = getInfo(file, start);
                if (info) {
                    tagsToSignature.set(info.signature, ts.append(tagsToSignature.get(info.signature), info.jsDocParameterTag));
                }
            });

            tagsToSignature.forEach((tags, signature) => {
                if (context.fixId === deleteUnmatchedParameter) {
                    const tagsSet = new ts.Set(tags);
                    changes.filterJSDocTags(signature.getSourceFile(), signature, t => !tagsSet.has(t));
                }
            });
        }));
    }
});

function getDeleteAction(context: ts.CodeFixContext, { name, signature, jsDocParameterTag }: Info) {
    const changes = ts.textChanges.ChangeTracker.with(context, changeTracker =>
        changeTracker.filterJSDocTags(context.sourceFile, signature, t => t !== jsDocParameterTag));
    return ts.codefix.createCodeFixAction(
        deleteUnmatchedParameter,
        changes,
        [ts.Diagnostics.Delete_unused_param_tag_0, name.getText(context.sourceFile)],
        deleteUnmatchedParameter,
        ts.Diagnostics.Delete_all_unused_param_tags
    );
}

function getRenameAction(context: ts.CodeFixContext, { name, signature, jsDocParameterTag }: Info) {
    if (!ts.length(signature.parameters)) return undefined;

    const sourceFile = context.sourceFile;
    const tags = ts.getJSDocTags(signature);
    const names = new ts.Set<ts.__String>();
    for (const tag of tags) {
        if (ts.isJSDocParameterTag(tag) && ts.isIdentifier(tag.name)) {
            names.add(tag.name.escapedText);
        }
    }
    // @todo - match to all available names instead to the first parameter name
    // @see /codeFixRenameUnmatchedParameter3.ts
    const parameterName = ts.firstDefined(signature.parameters, p =>
        ts.isIdentifier(p.name) && !names.has(p.name.escapedText) ? p.name.getText(sourceFile) : undefined);
    if (parameterName === undefined) return undefined;

    const newJSDocParameterTag = ts.factory.updateJSDocParameterTag(
        jsDocParameterTag,
        jsDocParameterTag.tagName,
        ts.factory.createIdentifier(parameterName),
        jsDocParameterTag.isBracketed,
        jsDocParameterTag.typeExpression,
        jsDocParameterTag.isNameFirst,
        jsDocParameterTag.comment
    );
    const changes = ts.textChanges.ChangeTracker.with(context, changeTracker =>
        changeTracker.replaceJSDocComment(sourceFile, signature, ts.map(tags, t => t === jsDocParameterTag ? newJSDocParameterTag : t)));
    return ts.codefix.createCodeFixActionWithoutFixAll(renameUnmatchedParameter, changes, [ts.Diagnostics.Rename_param_tag_name_0_to_1, name.getText(sourceFile), parameterName]);
}

interface Info {
    readonly signature: ts.SignatureDeclaration;
    readonly jsDocParameterTag: ts.JSDocParameterTag;
    readonly name: ts.Identifier;
}

function getInfo(sourceFile: ts.SourceFile, pos: number): Info | undefined {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    if (token.parent && ts.isJSDocParameterTag(token.parent) && ts.isIdentifier(token.parent.name)) {
        const jsDocParameterTag = token.parent;
        const signature = ts.getHostSignatureFromJSDoc(jsDocParameterTag);
        if (signature) {
            return { signature, name: token.parent.name, jsDocParameterTag };
        }
    }
    return undefined;
}
}
