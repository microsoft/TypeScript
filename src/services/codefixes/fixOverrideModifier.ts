/* @internal */
namespace ts.codefix {
    const fixName = "fixOverrideModifier";
    const fixAddOverrideId = "fixAddOverrideModifier";
    const fixRemoveOverrideId = "fixRemoveOverrideModifier";

    const errorCodes = [
        Diagnostics.Class_member_must_have_override_modifier_because_it_s_override_the_base_class_0.code,
        Diagnostics.Class_member_cannot_have_override_modifier_because_class_0_does_not_extended_another_class.code,
        Diagnostics.Class_member_cannot_have_override_modifier_because_it_s_not_existed_in_the_base_class_0.code,
        Diagnostics.Override_modifier_must_be_used_with_pedanticOverride_compiler_option.code
    ];

    const errorCodeFixIdMap = {
        [Diagnostics.Class_member_must_have_override_modifier_because_it_s_override_the_base_class_0.code]: fixAddOverrideId,
        [Diagnostics.Class_member_cannot_have_override_modifier_because_class_0_does_not_extended_another_class.code]: fixRemoveOverrideId,
        [Diagnostics.Class_member_cannot_have_override_modifier_because_it_s_not_existed_in_the_base_class_0.code]: fixRemoveOverrideId,
    };

    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { errorCode, span } = context;

            const [changeFactory, descriptions, fixId, fixAllDescriptions] = dispatchChanges(context, errorCode, span.start);
            const changes = textChanges.ChangeTracker.with(context, changeFactory);

            return [
                createCodeFixActionMaybeFixAll(fixName, changes, descriptions, fixId, fixAllDescriptions)
            ];
        },
        fixIds: [fixName, fixAddOverrideId, fixRemoveOverrideId],
        getAllCodeActions: context =>
            codeFixAll(context, errorCodes, (changes, diag) => {
                const { code, start } = diag;
                if (errorCodeFixIdMap[code] !== context.fixId) {
                    return;
                }

                const [changeFactory] = dispatchChanges(context, code, start);
                changeFactory(changes);
            })
    });

    function dispatchChanges(
        context: CodeFixContext | CodeFixAllContext,
        errorCode: number,
        pos: number): [
            changeFactory: (changeTracker: textChanges.ChangeTracker) => void,
            descriptions: DiagnosticMessage,
            fixId: string | undefined,
            fixAllDescriptions: DiagnosticMessage | undefined
        ] {
        switch (errorCode) {
            case Diagnostics.Class_member_must_have_override_modifier_because_it_s_override_the_base_class_0.code:
                return [
                    (changeTracker: textChanges.ChangeTracker) => doAddOverrideModifierChange(changeTracker, context.sourceFile, pos),
                    Diagnostics.Add_override_modifier,
                    fixAddOverrideId,
                    Diagnostics.Add_all_override_modifier,
                ];
            case Diagnostics.Class_member_cannot_have_override_modifier_because_class_0_does_not_extended_another_class.code:
            case Diagnostics.Class_member_cannot_have_override_modifier_because_it_s_not_existed_in_the_base_class_0.code:
                return [
                    (changeTracker: textChanges.ChangeTracker) => doRemoveOverrideModifierChange(changeTracker, context.sourceFile, pos),
                    Diagnostics.Remove_override_modifier,
                    fixRemoveOverrideId,
                    Diagnostics.Remove_all_override_modifier
                ];
            case Diagnostics.Override_modifier_must_be_used_with_pedanticOverride_compiler_option.code:
                return [
                    (changeTracker: textChanges.ChangeTracker) => doAddFlagChange(changeTracker, context.program),
                    Diagnostics.Enable_the_pedanticOverride_flag_in_your_configuration_file,
                    undefined,
                    undefined
                ];
            default:
                Debug.fail("Unexpected error code: " + errorCode);
        }
    }

    function doAddFlagChange(changeTracker: textChanges.ChangeTracker, program: Program) {
        const { configFile } = program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }

        setJsonCompilerOptionValue(changeTracker, configFile, "pedanticOverride", factory.createTrue());
    }

    function doAddOverrideModifierChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
        const classElement = findContainerClassElement(sourceFile, pos);
        changeTracker.insertLastModifierBefore(sourceFile, SyntaxKind.OverrideKeyword, classElement);
    }

    function doRemoveOverrideModifierChange(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
        const classElement = findContainerClassElement(sourceFile, pos);
        const overrideModifier = classElement.modifiers && find(classElement.modifiers, modifier => modifier.kind === SyntaxKind.OverrideKeyword);
        Debug.assertIsDefined(overrideModifier);

        changeTracker.deleteModifier(sourceFile, overrideModifier);
    }

    function findContainerClassElement(sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos);
        const classElement = findAncestor(token, isClassElement);
        Debug.assertIsDefined(classElement);
        return classElement;
    }
}

