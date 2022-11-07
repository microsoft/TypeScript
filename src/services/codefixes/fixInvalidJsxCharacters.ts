/* @internal */
namespace ts.codefix {
const fixIdExpression = "fixInvalidJsxCharacters_expression";
const fixIdHtmlEntity = "fixInvalidJsxCharacters_htmlEntity";

const errorCodes = [
    ts.Diagnostics.Unexpected_token_Did_you_mean_or_gt.code,
    ts.Diagnostics.Unexpected_token_Did_you_mean_or_rbrace.code
];

ts.codefix.registerCodeFix({
    errorCodes,
    fixIds: [fixIdExpression, fixIdHtmlEntity],
    getCodeActions(context) {
        const { sourceFile, preferences, span } = context;
        const changeToExpression = ts.textChanges.ChangeTracker.with(context, t => doChange(t, preferences, sourceFile, span.start, /* useHtmlEntity */ false));
        const changeToHtmlEntity = ts.textChanges.ChangeTracker.with(context, t => doChange(t, preferences, sourceFile, span.start, /* useHtmlEntity */ true));

        return [
            ts.codefix.createCodeFixAction(fixIdExpression, changeToExpression, ts.Diagnostics.Wrap_invalid_character_in_an_expression_container, fixIdExpression, ts.Diagnostics.Wrap_all_invalid_characters_in_an_expression_container),
            ts.codefix.createCodeFixAction(fixIdHtmlEntity, changeToHtmlEntity, ts.Diagnostics.Convert_invalid_character_to_its_html_entity_code, fixIdHtmlEntity, ts.Diagnostics.Convert_all_invalid_characters_to_HTML_entity_code)
        ];
    },
    getAllCodeActions(context) {
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diagnostic) => doChange(changes, context.preferences, diagnostic.file, diagnostic.start, context.fixId === fixIdHtmlEntity));
    }
});

const htmlEntity = {
    ">": "&gt;",
    "}": "&rbrace;",
};

function isValidCharacter(character: string): character is keyof typeof htmlEntity {
    return ts.hasProperty(htmlEntity, character);
}

function doChange(changes: ts.textChanges.ChangeTracker, preferences: ts.UserPreferences, sourceFile: ts.SourceFile, start: number, useHtmlEntity: boolean) {
    const character = sourceFile.getText()[start];
    // sanity check
    if (!isValidCharacter(character)) {
        return;
    }

    const replacement = useHtmlEntity ? htmlEntity[character] : `{${ts.quote(sourceFile, preferences, character)}}`;
    changes.replaceRangeWithText(sourceFile, { pos: start, end: start + 1 }, replacement);
}
}
