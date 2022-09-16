import * as ts from "../_namespaces/ts";

type AcceptedDeclaration = ts.ParameterPropertyDeclaration | ts.PropertyDeclaration | ts.PropertyAssignment;
type AcceptedNameType = ts.Identifier | ts.StringLiteral;
type ContainerDeclaration = ts.ClassLikeDeclaration | ts.ObjectLiteralExpression;

type Info = AccessorInfo | ts.refactor.RefactorErrorInfo;
interface AccessorInfo {
    readonly container: ContainerDeclaration;
    readonly isStatic: boolean;
    readonly isReadonly: boolean;
    readonly type: ts.TypeNode | undefined;
    readonly declaration: AcceptedDeclaration;
    readonly fieldName: AcceptedNameType;
    readonly accessorName: AcceptedNameType;
    readonly originalName: string;
    readonly renameAccessor: boolean;
}

/** @internal */
export function generateAccessorFromProperty(file: ts.SourceFile, program: ts.Program, start: number, end: number, context: ts.textChanges.TextChangesContext, _actionName: string): ts.FileTextChanges[] | undefined {
    const fieldInfo = getAccessorConvertiblePropertyAtPosition(file, program, start, end);
    if (!fieldInfo || ts.refactor.isRefactorErrorInfo(fieldInfo)) return undefined;

    const changeTracker = ts.textChanges.ChangeTracker.fromContext(context);
    const { isStatic, isReadonly, fieldName, accessorName, originalName, type, container, declaration } = fieldInfo;

    ts.suppressLeadingAndTrailingTrivia(fieldName);
    ts.suppressLeadingAndTrailingTrivia(accessorName);
    ts.suppressLeadingAndTrailingTrivia(declaration);
    ts.suppressLeadingAndTrailingTrivia(container);

    let accessorModifiers: readonly ts.ModifierLike[] | undefined;
    let fieldModifiers: readonly ts.ModifierLike[] | undefined;
    if (ts.isClassLike(container)) {
        const modifierFlags = ts.getEffectiveModifierFlags(declaration);
        if (ts.isSourceFileJS(file)) {
            const modifiers = ts.factory.createModifiersFromModifierFlags(modifierFlags);
            accessorModifiers = modifiers;
            fieldModifiers = modifiers;
        }
        else {
            accessorModifiers = ts.factory.createModifiersFromModifierFlags(prepareModifierFlagsForAccessor(modifierFlags));
            fieldModifiers = ts.factory.createModifiersFromModifierFlags(prepareModifierFlagsForField(modifierFlags));
        }
        if (ts.canHaveDecorators(declaration)) {
            fieldModifiers = ts.concatenate(ts.getDecorators(declaration), fieldModifiers);
        }
    }

    updateFieldDeclaration(changeTracker, file, declaration, type, fieldName, fieldModifiers);

    const getAccessor = generateGetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
    ts.suppressLeadingAndTrailingTrivia(getAccessor);
    insertAccessor(changeTracker, file, getAccessor, declaration, container);

    if (isReadonly) {
        // readonly modifier only existed in classLikeDeclaration
        const constructor = ts.getFirstConstructorWithBody(container as ts.ClassLikeDeclaration);
        if (constructor) {
            updateReadonlyPropertyInitializerStatementConstructor(changeTracker, file, constructor, fieldName.text, originalName);
        }
    }
    else {
        const setAccessor = generateSetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
        ts.suppressLeadingAndTrailingTrivia(setAccessor);
        insertAccessor(changeTracker, file, setAccessor, declaration, container);
    }

    return changeTracker.getChanges();
}

function isConvertibleName(name: ts.DeclarationName): name is AcceptedNameType {
    return ts.isIdentifier(name) || ts.isStringLiteral(name);
}

function isAcceptedDeclaration(node: ts.Node): node is AcceptedDeclaration {
    return ts.isParameterPropertyDeclaration(node, node.parent) || ts.isPropertyDeclaration(node) || ts.isPropertyAssignment(node);
}

function createPropertyName(name: string, originalName: AcceptedNameType) {
    return ts.isIdentifier(originalName) ? ts.factory.createIdentifier(name) : ts.factory.createStringLiteral(name);
}

function createAccessorAccessExpression(fieldName: AcceptedNameType, isStatic: boolean, container: ContainerDeclaration) {
    const leftHead = isStatic ? (container as ts.ClassLikeDeclaration).name! : ts.factory.createThis(); // TODO: GH#18217
    return ts.isIdentifier(fieldName) ? ts.factory.createPropertyAccessExpression(leftHead, fieldName) : ts.factory.createElementAccessExpression(leftHead, ts.factory.createStringLiteralFromNode(fieldName));
}

function prepareModifierFlagsForAccessor(modifierFlags: ts.ModifierFlags): ts.ModifierFlags {
    modifierFlags &= ~ts.ModifierFlags.Readonly; // avoid Readonly modifier because it will convert to get accessor
    modifierFlags &= ~ts.ModifierFlags.Private;

    if (!(modifierFlags & ts.ModifierFlags.Protected)) {
        modifierFlags |= ts.ModifierFlags.Public;
    }

    return modifierFlags;
}

function prepareModifierFlagsForField(modifierFlags: ts.ModifierFlags): ts.ModifierFlags {
    modifierFlags &= ~ts.ModifierFlags.Public;
    modifierFlags &= ~ts.ModifierFlags.Protected;
    modifierFlags |= ts.ModifierFlags.Private;
    return modifierFlags;
}

/** @internal */
export function getAccessorConvertiblePropertyAtPosition(file: ts.SourceFile, program: ts.Program, start: number, end: number, considerEmptySpans = true): Info | undefined {
    const node = ts.getTokenAtPosition(file, start);
    const cursorRequest = start === end && considerEmptySpans;
    const declaration = ts.findAncestor(node.parent, isAcceptedDeclaration);
    // make sure declaration have AccessibilityModifier or Static Modifier or Readonly Modifier
    const meaning = ts.ModifierFlags.AccessibilityModifier | ts.ModifierFlags.Static | ts.ModifierFlags.Readonly;

    if (!declaration || (!(ts.nodeOverlapsWithStartEnd(declaration.name, file, start, end) || cursorRequest))) {
        return {
            error: ts.getLocaleSpecificMessage(ts.Diagnostics.Could_not_find_property_for_which_to_generate_accessor)
        };
    }

    if (!isConvertibleName(declaration.name)) {
        return {
            error: ts.getLocaleSpecificMessage(ts.Diagnostics.Name_is_not_valid)
        };
    }

    if (((ts.getEffectiveModifierFlags(declaration) & ts.ModifierFlags.Modifier) | meaning) !== meaning) {
        return {
            error: ts.getLocaleSpecificMessage(ts.Diagnostics.Can_only_convert_property_with_modifier)
        };
    }

    const name = declaration.name.text;
    const startWithUnderscore = ts.startsWithUnderscore(name);
    const fieldName = createPropertyName(startWithUnderscore ? name : ts.getUniqueName(`_${name}`, file), declaration.name);
    const accessorName = createPropertyName(startWithUnderscore ? ts.getUniqueName(name.substring(1), file) : name, declaration.name);
    return {
        isStatic: ts.hasStaticModifier(declaration),
        isReadonly: ts.hasEffectiveReadonlyModifier(declaration),
        type: getDeclarationType(declaration, program),
        container: declaration.kind === ts.SyntaxKind.Parameter ? declaration.parent.parent : declaration.parent,
        originalName: (declaration.name as AcceptedNameType).text,
        declaration,
        fieldName,
        accessorName,
        renameAccessor: startWithUnderscore
    };
}

function generateGetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: ts.TypeNode | undefined, modifiers: readonly ts.ModifierLike[] | undefined, isStatic: boolean, container: ContainerDeclaration) {
    return ts.factory.createGetAccessorDeclaration(
        modifiers,
        accessorName,
        /*parameters*/ undefined!, // TODO: GH#18217
        type,
        ts.factory.createBlock([
            ts.factory.createReturnStatement(
                createAccessorAccessExpression(fieldName, isStatic, container)
            )
        ], /*multiLine*/ true)
    );
}

function generateSetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: ts.TypeNode | undefined, modifiers: readonly ts.ModifierLike[] | undefined, isStatic: boolean, container: ContainerDeclaration) {
    return ts.factory.createSetAccessorDeclaration(
        modifiers,
        accessorName,
        [ts.factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            ts.factory.createIdentifier("value"),
            /*questionToken*/ undefined,
            type
        )],
        ts.factory.createBlock([
            ts.factory.createExpressionStatement(
                ts.factory.createAssignment(
                    createAccessorAccessExpression(fieldName, isStatic, container),
                    ts.factory.createIdentifier("value")
                )
            )
        ], /*multiLine*/ true)
    );
}

function updatePropertyDeclaration(changeTracker: ts.textChanges.ChangeTracker, file: ts.SourceFile, declaration: ts.PropertyDeclaration, type: ts.TypeNode | undefined, fieldName: AcceptedNameType, modifiers: readonly ts.ModifierLike[] | undefined) {
    const property = ts.factory.updatePropertyDeclaration(
        declaration,
        modifiers,
        fieldName,
        declaration.questionToken || declaration.exclamationToken,
        type,
        declaration.initializer
    );
    changeTracker.replaceNode(file, declaration, property);
}

function updatePropertyAssignmentDeclaration(changeTracker: ts.textChanges.ChangeTracker, file: ts.SourceFile, declaration: ts.PropertyAssignment, fieldName: AcceptedNameType) {
    const assignment = ts.factory.updatePropertyAssignment(declaration, fieldName, declaration.initializer);
    changeTracker.replacePropertyAssignment(file, declaration, assignment);
}

function updateFieldDeclaration(changeTracker: ts.textChanges.ChangeTracker, file: ts.SourceFile, declaration: AcceptedDeclaration, type: ts.TypeNode | undefined, fieldName: AcceptedNameType, modifiers: readonly ts.ModifierLike[] | undefined) {
    if (ts.isPropertyDeclaration(declaration)) {
        updatePropertyDeclaration(changeTracker, file, declaration, type, fieldName, modifiers);
    }
    else if (ts.isPropertyAssignment(declaration)) {
        updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName);
    }
    else {
        changeTracker.replaceNode(file, declaration,
            ts.factory.updateParameterDeclaration(declaration, modifiers, declaration.dotDotDotToken, ts.cast(fieldName, ts.isIdentifier), declaration.questionToken, declaration.type, declaration.initializer));
    }
}

function insertAccessor(changeTracker: ts.textChanges.ChangeTracker, file: ts.SourceFile, accessor: ts.AccessorDeclaration, declaration: AcceptedDeclaration, container: ContainerDeclaration) {
    ts.isParameterPropertyDeclaration(declaration, declaration.parent) ? changeTracker.insertMemberAtStart(file, container as ts.ClassLikeDeclaration, accessor) :
        ts.isPropertyAssignment(declaration) ? changeTracker.insertNodeAfterComma(file, declaration, accessor) :
        changeTracker.insertNodeAfter(file, declaration, accessor);
}

function updateReadonlyPropertyInitializerStatementConstructor(changeTracker: ts.textChanges.ChangeTracker, file: ts.SourceFile, constructor: ts.ConstructorDeclaration, fieldName: string, originalName: string) {
    if (!constructor.body) return;
    constructor.body.forEachChild(function recur(node) {
        if (ts.isElementAccessExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ThisKeyword &&
            ts.isStringLiteral(node.argumentExpression) &&
            node.argumentExpression.text === originalName &&
            ts.isWriteAccess(node)) {
            changeTracker.replaceNode(file, node.argumentExpression, ts.factory.createStringLiteral(fieldName));
        }
        if (ts.isPropertyAccessExpression(node) && node.expression.kind === ts.SyntaxKind.ThisKeyword && node.name.text === originalName && ts.isWriteAccess(node)) {
            changeTracker.replaceNode(file, node.name, ts.factory.createIdentifier(fieldName));
        }
        if (!ts.isFunctionLike(node) && !ts.isClassLike(node)) {
            node.forEachChild(recur);
        }
    });
}

function getDeclarationType(declaration: AcceptedDeclaration, program: ts.Program): ts.TypeNode | undefined {
    const typeNode = ts.getTypeAnnotationNode(declaration);
    if (ts.isPropertyDeclaration(declaration) && typeNode && declaration.questionToken) {
        const typeChecker = program.getTypeChecker();
        const type = typeChecker.getTypeFromTypeNode(typeNode);
        if (!typeChecker.isTypeAssignableTo(typeChecker.getUndefinedType(), type)) {
            const types = ts.isUnionTypeNode(typeNode) ? typeNode.types : [typeNode];
            return ts.factory.createUnionTypeNode([...types, ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword)]);
        }
    }
    return typeNode;
}

/** @internal */
export function getAllSupers(decl: ClassOrInterface | undefined, checker: ts.TypeChecker): readonly ClassOrInterface[] {
    const res: ts.ClassLikeDeclaration[] = [];
    while (decl) {
        const superElement = ts.getClassExtendsHeritageElement(decl);
        const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
        if (!superSymbol) break;
        const symbol = superSymbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(superSymbol) : superSymbol;
        const superDecl = symbol.declarations && ts.find(symbol.declarations, ts.isClassLike);
        if (!superDecl) break;
        res.push(superDecl);
        decl = superDecl;
    }
    return res;
}

/** @internal */
export type ClassOrInterface = ts.ClassLikeDeclaration | ts.InterfaceDeclaration;
