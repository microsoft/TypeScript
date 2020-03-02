import { Diagnostics, hasProperty, SourceFile } from "../ts";
import { registerCodeFix, createCodeFixActionWithoutFixAll, createCodeFixAction } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixIdHtmlEntity = "invalidJsxCharactersConvertToHtmlEntity";
/* @internal */
const fixIdExpression = "invalidJsxCharactersConvertToExpression";
/* @internal */
const errorCodes = [Diagnostics.Unexpected_token_Did_you_mean_or_gt.code, Diagnostics.Unexpected_token_Did_you_mean_or_rbrace.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const { sourceFile, span } = context;
        const changeToExpression = ChangeTracker.with(context, t => doChange(t, sourceFile, span.start, /* useHtmlEntity */ false));
        const changeToHtmlEntity = ChangeTracker.with(context, t => doChange(t, sourceFile, span.start, /* useHtmlEntity */ true));
        return [
            createCodeFixActionWithoutFixAll(fixIdExpression, changeToExpression, Diagnostics.Wrap_invalid_character_in_an_expression_container),
            createCodeFixAction(fixIdHtmlEntity, changeToHtmlEntity, Diagnostics.Convert_invalid_character_to_its_html_entity_code, fixIdHtmlEntity, Diagnostics.Convert_invalid_character_to_its_html_entity_code),
        ];
    },
    fixIds: [fixIdExpression, fixIdHtmlEntity],
});
/* @internal */
const htmlEntity = {
    ">": "&gt;",
    "}": "&rbrace;",
};
/* @internal */
function isValidCharacter(character: string): character is keyof typeof htmlEntity {
    return hasProperty(htmlEntity, character);
}
/* @internal */
function doChange(changes: ChangeTracker, sourceFile: SourceFile, start: number, useHtmlEntity: boolean) {
    const character = sourceFile.getText()[start];
    // sanity check
    if (!isValidCharacter(character)) {
        return;
    }
    const replacement = useHtmlEntity
        ? htmlEntity[character]
        : `{'${character}'}`;
    changes.replaceRangeWithText(sourceFile, { pos: start, end: start + 1 }, replacement);
}
