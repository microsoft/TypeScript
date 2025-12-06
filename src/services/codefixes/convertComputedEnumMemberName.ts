import {
    createCodeFixActionMaybeFixAll,
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    ComputedPropertyName,
    Diagnostics,
    factory,
    getTokenAtPosition,
    isComputedPropertyName,
    isEnumMember,
    isNoSubstitutionTemplateLiteral,
    isStringLiteral,
    SourceFile,
    textChanges,
} from "../_namespaces/ts.js";

const fixId = "convertComputedEnumMemberName";
const errorCodes = [Diagnostics.Using_a_string_literal_as_an_enum_member_name_via_a_computed_property_is_deprecated_Use_a_simple_string_literal_instead.code];

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const info = getInfo(sourceFile, span.start);
        if (info === undefined) return;

        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, info));
        return [createCodeFixActionMaybeFixAll(fixId, changes, Diagnostics.Remove_unnecessary_computed_property_name_syntax, fixId, Diagnostics.Remove_all_unnecessary_computed_property_name_syntax)];
    },
    getAllCodeActions(context) {
        return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
            eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(diag.file, diag.start);
                if (info) {
                    return doChange(changes, diag.file, info);
                }
                return undefined;
            });
        }));
    },
    fixIds: [fixId],
});

interface Info {
    computedName: ComputedPropertyName;
    literalText: string;
}

function getInfo(sourceFile: SourceFile, pos: number): Info | undefined {
    const token = getTokenAtPosition(sourceFile, pos);

    // Navigate to find the computed property name
    let node = token;
    while (node && !isComputedPropertyName(node)) {
        node = node.parent;
    }

    if (!node || !isComputedPropertyName(node)) return undefined;
    if (!isEnumMember(node.parent)) return undefined;

    const expression = node.expression;
    let literalText: string;

    if (isStringLiteral(expression)) {
        literalText = expression.text;
    }
    else if (isNoSubstitutionTemplateLiteral(expression)) {
        literalText = expression.text;
    }
    else {
        return undefined;
    }

    return { computedName: node, literalText };
}

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, info: Info) {
    // Replace ['\t'] with '\t' (or ["key"] with "key")
    changes.replaceNode(sourceFile, info.computedName, factory.createStringLiteral(info.literalText));
}
