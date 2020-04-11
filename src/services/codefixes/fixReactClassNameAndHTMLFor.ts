/* @internal */
namespace ts.codefix {
    const fixID = "fixReactClassNameAndHTMLFor";
    const errorCodes = [Diagnostics.Type_0_is_not_assignable_to_type_1.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { jsx } = context.program.getCompilerOptions();
            if (jsx !== JsxEmit.React) {
                return undefined;
            }
            const { sourceFile, span } = context;
            const node = getTokenAtPosition(sourceFile, span.start);
            if (!shouldFix(node)) return undefined;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, node));
            return [createCodeFixAction(fixID, changes, [Diagnostics.Did_you_mean_0, getCorrectName(node)], fixID, Diagnostics.Fix_all_detected_spelling_errors)];
        },
        fixIds: [fixID],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const node = getTokenAtPosition(context.sourceFile, diag.start);
            if (!shouldFix(node)) return;
            doChange(changes, context.sourceFile, node);
        }),
    });

    function doChange(changeTracker: textChanges.ChangeTracker, sf: SourceFile, node: Identifier) {
        changeTracker.replaceNode(sf, node, createIdentifier(getCorrectName(node)));
    }

    function getCorrectName(node: Identifier) {
        const text = node.text;
        if (text === "class") return "className";
        if (text === "for") return "htmlFor";
        return Debug.fail();
    }

    function shouldFix(node: Node): node is Identifier {
        // <label for="content">, the error is on the `for`
        if (!isIdentifier(node)) return false;

        const id = node.text;
        // Only fix class => className and for => htmlFor
        if (id !== "for" && id !== "class") return false;

        if (!isJsxAttribute(node.parent)) return false;
        const parent = node.parent.parent.parent;
        if (!isIdentifier(parent.tagName)) return false;
        const tagName = parent.tagName.text;
        // html for only appear on label tag
        if (tagName !== "label" && id === "for") return false;
        const firstChar = tagName[0];
        // Only fix for html elements. Non-lowercase elements are React Elements
        if (firstChar.toLowerCase() !== firstChar) return false;

        // See https://reactjs.org/docs/web-components.html#using-web-components-in-react
        // "One common confusion is that Web Components use “class” instead of “className”."
        if (tagName.indexOf("-") !== -1 && id === "class") return false;
        return true;
    }
}
