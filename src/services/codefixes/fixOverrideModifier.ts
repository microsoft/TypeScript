/* @internal */
namespace ts.codefix {
const fixName = "fixOverrideModifier";
const fixAddOverrideId = "fixAddOverrideModifier";
const fixRemoveOverrideId = "fixRemoveOverrideModifier";

type ClassElementLikeHasJSDoc =
    | ts.ConstructorDeclaration
    | ts.PropertyDeclaration
    | ts.MethodDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration
    | ts.ParameterPropertyDeclaration;

const errorCodes = [
    ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code,
    ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code,
    ts.Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0.code,
    ts.Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code,
    ts.Diagnostics.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0.code,
    ts.Diagnostics.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code,
    ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class.code,
    ts.Diagnostics.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code,
    ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0.code,
];

interface ErrorCodeFixInfo {
    descriptions: ts.DiagnosticMessage;
    fixId?: string | undefined;
    fixAllDescriptions?: ts.DiagnosticMessage | undefined;
}

const errorCodeFixIdMap: Record<number, ErrorCodeFixInfo> = {
    // case #1:
    [ts.Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code]: {
        descriptions: ts.Diagnostics.Add_override_modifier,
        fixId: fixAddOverrideId,
        fixAllDescriptions: ts.Diagnostics.Add_all_missing_override_modifiers,
    },
    [ts.Diagnostics.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code]: {
        descriptions: ts.Diagnostics.Add_override_modifier,
        fixId: fixAddOverrideId,
        fixAllDescriptions: ts.Diagnostics.Add_all_missing_override_modifiers
    },
    // case #2:
    [ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code]: {
        descriptions: ts.Diagnostics.Remove_override_modifier,
        fixId: fixRemoveOverrideId,
        fixAllDescriptions: ts.Diagnostics.Remove_all_unnecessary_override_modifiers,
    },
    [ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class.code]: {
        descriptions: ts.Diagnostics.Remove_override_modifier,
        fixId: fixRemoveOverrideId,
        fixAllDescriptions: ts.Diagnostics.Remove_override_modifier
    },
    // case #3:
    [ts.Diagnostics.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0.code]: {
        descriptions: ts.Diagnostics.Add_override_modifier,
        fixId: fixAddOverrideId,
        fixAllDescriptions: ts.Diagnostics.Add_all_missing_override_modifiers,
    },
    [ts.Diagnostics.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code]: {
        descriptions: ts.Diagnostics.Add_override_modifier,
        fixId: fixAddOverrideId,
        fixAllDescriptions: ts.Diagnostics.Add_all_missing_override_modifiers,
    },
    // case #4:
    [ts.Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0.code]: {
        descriptions: ts.Diagnostics.Add_override_modifier,
        fixId: fixAddOverrideId,
        fixAllDescriptions: ts.Diagnostics.Remove_all_unnecessary_override_modifiers,
    },
    // case #5:
    [ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code]: {
        descriptions: ts.Diagnostics.Remove_override_modifier,
        fixId: fixRemoveOverrideId,
        fixAllDescriptions: ts.Diagnostics.Remove_all_unnecessary_override_modifiers,
    },
    [ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0.code]: {
        descriptions: ts.Diagnostics.Remove_override_modifier,
        fixId: fixRemoveOverrideId,
        fixAllDescriptions: ts.Diagnostics.Remove_all_unnecessary_override_modifiers,
    }
};

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixOverrideModifierIssues(context) {
        const { errorCode, span } = context;

        const info = errorCodeFixIdMap[errorCode];
        if (!info) return ts.emptyArray;

        const { descriptions, fixId, fixAllDescriptions } = info;
        const changes = ts.textChanges.ChangeTracker.with(context, changes => dispatchChanges(changes, context, errorCode, span.start));

        return [
            ts.codefix.createCodeFixActionMaybeFixAll(fixName, changes, descriptions, fixId, fixAllDescriptions)
        ];
    },
    fixIds: [fixName, fixAddOverrideId, fixRemoveOverrideId],
    getAllCodeActions: context =>
        ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const { code, start } = diag;
            const info = errorCodeFixIdMap[code];
            if (!info || info.fixId !== context.fixId) {
                return;
            }

            dispatchChanges(changes, context, code, start);
        })
});

function dispatchChanges(
    changeTracker: ts.textChanges.ChangeTracker,
    context: ts.CodeFixContext | ts.CodeFixAllContext,
    errorCode: number,
    pos: number) {
    switch (errorCode) {
        case ts.Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code:
        case ts.Diagnostics.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code:
        case ts.Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0.code:
        case ts.Diagnostics.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0.code:
        case ts.Diagnostics.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code:
            return doAddOverrideModifierChange(changeTracker, context.sourceFile, pos);
        case ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code:
        case ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0.code:
        case ts.Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code:
        case ts.Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class.code:
            return doRemoveOverrideModifierChange(changeTracker, context.sourceFile, pos);
        default:
            ts.Debug.fail("Unexpected error code: " + errorCode);
    }
}

function doAddOverrideModifierChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number) {
    const classElement = findContainerClassElementLike(sourceFile, pos);
    if (ts.isSourceFileJS(sourceFile)) {
        changeTracker.addJSDocTags(sourceFile, classElement, [ts.factory.createJSDocOverrideTag(ts.factory.createIdentifier("override"))]);
        return;
    }
    const modifiers = classElement.modifiers || ts.emptyArray;
    const staticModifier = ts.find(modifiers, ts.isStaticModifier);
    const abstractModifier = ts.find(modifiers, ts.isAbstractModifier);
    const accessibilityModifier = ts.find(modifiers, m => ts.isAccessibilityModifier(m.kind));
    const lastDecorator = ts.findLast(modifiers, ts.isDecorator);
    const modifierPos = abstractModifier ? abstractModifier.end :
        staticModifier ? staticModifier.end :
        accessibilityModifier ? accessibilityModifier.end :
        lastDecorator ? ts.skipTrivia(sourceFile.text, lastDecorator.end) : classElement.getStart(sourceFile);
    const options = accessibilityModifier || staticModifier || abstractModifier ? { prefix: " " } : { suffix: " " };
    changeTracker.insertModifierAt(sourceFile, modifierPos, ts.SyntaxKind.OverrideKeyword, options);
}

function doRemoveOverrideModifierChange(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, pos: number) {
    const classElement = findContainerClassElementLike(sourceFile, pos);
    if (ts.isSourceFileJS(sourceFile)) {
        changeTracker.filterJSDocTags(sourceFile, classElement, ts.not(ts.isJSDocOverrideTag));
        return;
    }
    const overrideModifier = ts.find(classElement.modifiers, ts.isOverrideModifier);
    ts.Debug.assertIsDefined(overrideModifier);

    changeTracker.deleteModifier(sourceFile, overrideModifier);
}

function isClassElementLikeHasJSDoc(node: ts.Node): node is ClassElementLikeHasJSDoc {
    switch (node.kind) {
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return true;
        case ts.SyntaxKind.Parameter:
            return ts.isParameterPropertyDeclaration(node, node.parent);
        default:
            return false;
    }
}

function findContainerClassElementLike(sourceFile: ts.SourceFile, pos: number) {
    const token = ts.getTokenAtPosition(sourceFile, pos);
    const classElement = ts.findAncestor(token, node => {
        if (ts.isClassLike(node)) return "quit";
        return isClassElementLikeHasJSDoc(node);
    });

    ts.Debug.assert(classElement && isClassElementLikeHasJSDoc(classElement));
    return classElement;
}
}

