/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_find_module_0.code,
            Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
        ],
        getCodeActions: context => {
            const { sourceFile } = context;
            const start = context.span.start;

            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            if (!ts.isStringLiteral(token)) {
                throw Debug.fail(); // These errors should only happen on the module name.
            }

            const text = token.text;

            if (isExternalModuleNameRelative(text)) {
                return undefined;
            }

            const registry = createMapFromTemplate<true>({ abs: true }); //TODO
            if (!registry.has(text)) {
                return undefined;
            }

            //If it's in the registry, then use it.
            //TODO: communicate with the typings registry process???

            const c: CodeAction = {
                description: `Install typings for ${text}`,
                changes: [],
                actions: [{
                    type: "Install package",
                    data: {
                        name: `@types/${text}`,
                    },
                }],
                //TODO: need something saying there will be an action...
            };

            return [c];
        },
    });
}
