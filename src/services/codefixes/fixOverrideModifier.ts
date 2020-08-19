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

    const errorCodeFixIdMap: Record<number, [DiagnosticMessage, string | undefined, DiagnosticMessage | undefined]> = {
        [Diagnostics.Class_member_must_have_override_modifier_because_it_s_override_the_base_class_0.code]: [
            Diagnostics.Add_override_modifier, fixAddOverrideId, Diagnostics.Add_all_override_modifier,
        ],
        [Diagnostics.Class_member_cannot_have_override_modifier_because_class_0_does_not_extended_another_class.code]: [
            Diagnostics.Remove_override_modifier, fixRemoveOverrideId, Diagnostics.Remove_all_override_modifier
        ],
        [Diagnostics.Class_member_cannot_have_override_modifier_because_it_s_not_existed_in_the_base_class_0.code]: [
            Diagnostics.Remove_override_modifier, fixRemoveOverrideId, Diagnostics.Remove_all_override_modifier
        ],
        [Diagnostics.Override_modifier_must_be_used_with_pedanticOverride_compiler_option.code]: [
            Diagnostics.Enable_the_pedanticOverride_flag_in_your_configuration_file, undefined, undefined
        ]
    };

    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { errorCode, span } = context;

            const info = errorCodeFixIdMap[errorCode];
            if (!info) return emptyArray;

            const [ descriptions, fixId, fixAllDescriptions ] = info;
            const changes = textChanges.ChangeTracker.with(context, changes => dispatchChanges(changes, context, errorCode, span.start));

            return [
                createCodeFixActionMaybeFixAll(fixName, changes, descriptions, fixId, fixAllDescriptions)
            ];
        },
        fixIds: [fixName, fixAddOverrideId, fixRemoveOverrideId],
        getAllCodeActions: context =>
            codeFixAll(context, errorCodes, (changes, diag) => {
                const { code, start } = diag;
                const info = errorCodeFixIdMap[code];
                if (!info || info[1] !== context.fixId) {
                    return;
                }

                dispatchChanges(changes, context, code, start);
            })
    });

    function dispatchChanges(
        changeTracker: textChanges.ChangeTracker,
        context: CodeFixContext | CodeFixAllContext,
        errorCode: number,
        pos: number) {
        switch (errorCode) {
            case Diagnostics.Class_member_must_have_override_modifier_because_it_s_override_the_base_class_0.code:
                return doAddOverrideModifierChange(changeTracker, context.sourceFile, pos);
            case Diagnostics.Class_member_cannot_have_override_modifier_because_class_0_does_not_extended_another_class.code:
            case Diagnostics.Class_member_cannot_have_override_modifier_because_it_s_not_existed_in_the_base_class_0.code:
                return doRemoveOverrideModifierChange(changeTracker, context.sourceFile, pos);
            case Diagnostics.Override_modifier_must_be_used_with_pedanticOverride_compiler_option.code:
                return doAddFlagChange(changeTracker, context.program);
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

