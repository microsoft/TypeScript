import {
    append,
    firstDefined,
    length,
    map,
} from "../../compiler/core";
import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import {
    isIdentifier,
    isJSDocParameterTag,
} from "../../compiler/factory/nodeTests";
import {
    __String,
    HasJSDoc,
    Identifier,
    JSDocParameterTag,
    JSDocTag,
    SignatureDeclaration,
    SourceFile,
} from "../../compiler/types";
import {
    getHostSignatureFromJSDoc,
    getJSDocHost,
} from "../../compiler/utilities";
import { getJSDocTags } from "../../compiler/utilitiesPublic";
import {
    createCodeFixAction,
    createCodeFixActionWithoutFixAll,
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import {
    CodeFixAction,
    CodeFixContext,
} from "../types";
import { getTokenAtPosition } from "../utilities";

const deleteUnmatchedParameter = "deleteUnmatchedParameter";
const renameUnmatchedParameter = "renameUnmatchedParameter";

const errorCodes = [
    Diagnostics.JSDoc_param_tag_has_name_0_but_there_is_no_parameter_with_that_name.code,
];

registerCodeFix({
    fixIds: [deleteUnmatchedParameter, renameUnmatchedParameter],
    errorCodes,
    getCodeActions: function getCodeActionsToFixUnmatchedParameter(context) {
        const { sourceFile, span } = context;
        const actions: CodeFixAction[] = [];
        const info = getInfo(sourceFile, span.start);
        if (info) {
            append(actions, getDeleteAction(context, info));
            append(actions, getRenameAction(context, info));
            return actions;
        }
        return undefined;
    },
    getAllCodeActions: function getAllCodeActionsToFixUnmatchedParameter(context) {
        const tagsToSignature = new Map<SignatureDeclaration, JSDocTag[]>();
        return createCombinedCodeActions(ChangeTracker.with(context, changes => {
            eachDiagnostic(context, errorCodes, ({ file, start }) => {
                const info = getInfo(file, start);
                if (info) {
                    tagsToSignature.set(info.signature, append(tagsToSignature.get(info.signature), info.jsDocParameterTag));
                }
            });

            tagsToSignature.forEach((tags, signature) => {
                if (context.fixId === deleteUnmatchedParameter) {
                    const tagsSet = new Set(tags);
                    changes.filterJSDocTags(signature.getSourceFile(), signature, t => !tagsSet.has(t));
                }
            });
        }));
    }
});

function getDeleteAction(context: CodeFixContext, { name, jsDocHost, jsDocParameterTag }: Info) {
    const changes = ChangeTracker.with(context, changeTracker =>
        changeTracker.filterJSDocTags(context.sourceFile, jsDocHost, t => t !== jsDocParameterTag));
    return createCodeFixAction(
        deleteUnmatchedParameter,
        changes,
        [Diagnostics.Delete_unused_param_tag_0, name.getText(context.sourceFile)],
        deleteUnmatchedParameter,
        Diagnostics.Delete_all_unused_param_tags
    );
}

function getRenameAction(context: CodeFixContext, { name, jsDocHost, signature, jsDocParameterTag }: Info) {
    if (!length(signature.parameters)) return undefined;

    const sourceFile = context.sourceFile;
    const tags = getJSDocTags(signature);
    const names = new Set<__String>();
    for (const tag of tags) {
        if (isJSDocParameterTag(tag) && isIdentifier(tag.name)) {
            names.add(tag.name.escapedText);
        }
    }
    // @todo - match to all available names instead to the first parameter name
    // @see /codeFixRenameUnmatchedParameter3.ts
    const parameterName = firstDefined(signature.parameters, p =>
        isIdentifier(p.name) && !names.has(p.name.escapedText) ? p.name.getText(sourceFile) : undefined);
    if (parameterName === undefined) return undefined;

    const newJSDocParameterTag = factory.updateJSDocParameterTag(
        jsDocParameterTag,
        jsDocParameterTag.tagName,
        factory.createIdentifier(parameterName),
        jsDocParameterTag.isBracketed,
        jsDocParameterTag.typeExpression,
        jsDocParameterTag.isNameFirst,
        jsDocParameterTag.comment
    );
    const changes = ChangeTracker.with(context, changeTracker =>
        changeTracker.replaceJSDocComment(sourceFile, jsDocHost, map(tags, t => t === jsDocParameterTag ? newJSDocParameterTag : t)));
    return createCodeFixActionWithoutFixAll(renameUnmatchedParameter, changes, [Diagnostics.Rename_param_tag_name_0_to_1, name.getText(sourceFile), parameterName]);
}

interface Info {
    readonly jsDocHost: HasJSDoc;
    readonly signature: SignatureDeclaration;
    readonly jsDocParameterTag: JSDocParameterTag;
    readonly name: Identifier;
}

function getInfo(sourceFile: SourceFile, pos: number): Info | undefined {
    const token = getTokenAtPosition(sourceFile, pos);
    if (token.parent && isJSDocParameterTag(token.parent) && isIdentifier(token.parent.name)) {
        const jsDocParameterTag = token.parent;
        const jsDocHost = getJSDocHost(jsDocParameterTag);
        const signature = getHostSignatureFromJSDoc(jsDocParameterTag);
        if (jsDocHost && signature) {
            return { jsDocHost, signature, name: token.parent.name, jsDocParameterTag };
        }
    }
    return undefined;
}
