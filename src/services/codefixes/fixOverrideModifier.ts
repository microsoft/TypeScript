/* @internal */
namespace ts.codefix {
    const fixName = "fixOverrideModifier";
    const fixAddOverrideId = "fixAddOverrideModifier";
    const fixRemoveOverrideId = "fixRemoveOverrideModifier";
    const fixConvertToPropertyDeclarationId = "fixConvertToPropertyDeclaration";

    const errorCodes = [
        Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code,
        Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code,
        Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code,
        Diagnostics.This_parameter_must_convert_into_property_declaration_because_it_overrides_a_member_in_the_base_class_0.code
    ];

    const errorCodeFixIdMap: Record<number, [DiagnosticMessage, string | undefined, DiagnosticMessage | undefined]> = {
        [Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code]: [
            Diagnostics.Add_override_modifier, fixAddOverrideId, Diagnostics.Add_all_override_modifier,
        ],
        [Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code]: [
            Diagnostics.Remove_override_modifier, fixRemoveOverrideId, Diagnostics.Remove_all_override_modifier
        ],
        [Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code]: [
            Diagnostics.Remove_override_modifier, fixRemoveOverrideId, Diagnostics.Remove_all_override_modifier
        ],
        [Diagnostics.This_parameter_must_convert_into_property_declaration_because_it_overrides_a_member_in_the_base_class_0.code]: [
            Diagnostics.Convert_to_property_declaration_and_add_override_modifier,
            fixConvertToPropertyDeclarationId,
            Diagnostics.Convert_all_to_property_declaration_and_add_override_modifier
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
        fixIds: [fixName, fixAddOverrideId, fixRemoveOverrideId, fixConvertToPropertyDeclarationId],
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
            case Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code:
                return doAddOverrideModifierChange(changeTracker, context.sourceFile, pos);
            case Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code:
            case Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code:
                return doRemoveOverrideModifierChange(changeTracker, context.sourceFile, pos);
            case Diagnostics.This_parameter_must_convert_into_property_declaration_because_it_overrides_a_member_in_the_base_class_0.code:
                return doConvertToPropertyDeclaration(changeTracker, context.sourceFile, pos);
            default:
                Debug.fail("Unexpected error code: " + errorCode);
        }
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

    function doConvertToPropertyDeclaration(changeTracker: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number) {
        const info = getConvertParameterPropertyToPropertyInfo(sourceFile, pos);
        if (!info) {
            return;
        }

        getConvertParameterPropertyToPropertyChanges(changeTracker, sourceFile, info, ModifierFlags.Override);
    }

    function findContainerClassElement(sourceFile: SourceFile, pos: number) {
        const token = getTokenAtPosition(sourceFile, pos);
        const classElement = findAncestor(token, isClassElement);
        Debug.assertIsDefined(classElement);
        return classElement;
    }
}

