import { ParameterPropertyDeclaration, PropertyDeclaration, PropertyAssignment, Identifier, StringLiteral, ClassLikeDeclaration, ObjectLiteralExpression, TypeNode, SourceFile, Program, FileTextChanges, suppressLeadingAndTrailingTrivia, ModifiersArray, isClassLike, getEffectiveModifierFlags, isSourceFileJS, createModifiers, getFirstConstructorWithBody, DeclarationName, isIdentifier, isStringLiteral, Node, isParameterPropertyDeclaration, isPropertyDeclaration, isPropertyAssignment, factory, ModifierFlags, getTokenAtPosition, findAncestor, nodeOverlapsWithStartEnd, getLocaleSpecificMessage, Diagnostics, startsWithUnderscore, getUniqueName, hasStaticModifier, hasEffectiveReadonlyModifier, SyntaxKind, cast, AccessorDeclaration, ConstructorDeclaration, isElementAccessExpression, isWriteAccess, isPropertyAccessExpression, isFunctionLike, getTypeAnnotationNode, isUnionTypeNode, TypeChecker, getClassExtendsHeritageElement, SymbolFlags, find, InterfaceDeclaration } from "../ts";
import { RefactorErrorInfo, isRefactorErrorInfo } from "../ts.refactor";
import { TextChangesContext, ChangeTracker } from "../ts.textChanges";
/* @internal */
type AcceptedDeclaration = ParameterPropertyDeclaration | PropertyDeclaration | PropertyAssignment;
/* @internal */
type AcceptedNameType = Identifier | StringLiteral;
/* @internal */
type ContainerDeclaration = ClassLikeDeclaration | ObjectLiteralExpression;

/* @internal */
type Info = AccessorInfo | RefactorErrorInfo;
/* @internal */
interface AccessorInfo {
    readonly container: ContainerDeclaration;
    readonly isStatic: boolean;
    readonly isReadonly: boolean;
    readonly type: TypeNode | undefined;
    readonly declaration: AcceptedDeclaration;
    readonly fieldName: AcceptedNameType;
    readonly accessorName: AcceptedNameType;
    readonly originalName: string;
    readonly renameAccessor: boolean;
}

/* @internal */
export function generateAccessorFromProperty(file: SourceFile, program: Program, start: number, end: number, context: TextChangesContext, _actionName: string): FileTextChanges[] | undefined {
    const fieldInfo = getAccessorConvertiblePropertyAtPosition(file, program, start, end);
    if (!fieldInfo || isRefactorErrorInfo(fieldInfo))
        return undefined;
    const changeTracker = ChangeTracker.fromContext(context);
    const { isStatic, isReadonly, fieldName, accessorName, originalName, type, container, declaration } = fieldInfo;

    suppressLeadingAndTrailingTrivia(fieldName);
    suppressLeadingAndTrailingTrivia(accessorName);
    suppressLeadingAndTrailingTrivia(declaration);
    suppressLeadingAndTrailingTrivia(container);

    let accessorModifiers: ModifiersArray | undefined;
    let fieldModifiers: ModifiersArray | undefined;
    if (isClassLike(container)) {
        const modifierFlags = getEffectiveModifierFlags(declaration);
        if (isSourceFileJS(file)) {
            const modifiers = createModifiers(modifierFlags);
            accessorModifiers = modifiers;
            fieldModifiers = modifiers;
        }
        else {
            accessorModifiers = createModifiers(prepareModifierFlagsForAccessor(modifierFlags));
            fieldModifiers = createModifiers(prepareModifierFlagsForField(modifierFlags));
        }
    }

    updateFieldDeclaration(changeTracker, file, declaration, type, fieldName, fieldModifiers);

    const getAccessor = generateGetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
    suppressLeadingAndTrailingTrivia(getAccessor);
    insertAccessor(changeTracker, file, getAccessor, declaration, container);

    if (isReadonly) {
        // readonly modifier only existed in classLikeDeclaration
        const constructor = getFirstConstructorWithBody(container as ClassLikeDeclaration);
        if (constructor) {
            updateReadonlyPropertyInitializerStatementConstructor(changeTracker, file, constructor, fieldName.text, originalName);
        }
    }
    else {
        const setAccessor = generateSetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
        suppressLeadingAndTrailingTrivia(setAccessor);
        insertAccessor(changeTracker, file, setAccessor, declaration, container);
    }

    return changeTracker.getChanges();
}

/* @internal */
function isConvertibleName(name: DeclarationName): name is AcceptedNameType {
    return isIdentifier(name) || isStringLiteral(name);
}

/* @internal */
function isAcceptedDeclaration(node: Node): node is AcceptedDeclaration {
    return isParameterPropertyDeclaration(node, node.parent) || isPropertyDeclaration(node) || isPropertyAssignment(node);
}

/* @internal */
function createPropertyName(name: string, originalName: AcceptedNameType) {
    return isIdentifier(originalName) ? factory.createIdentifier(name) : factory.createStringLiteral(name);
}

/* @internal */
function createAccessorAccessExpression(fieldName: AcceptedNameType, isStatic: boolean, container: ContainerDeclaration) {
    const leftHead = isStatic ? (container as ClassLikeDeclaration).name! : factory.createThis(); // TODO: GH#18217
    return isIdentifier(fieldName) ? factory.createPropertyAccessExpression(leftHead, fieldName) : factory.createElementAccessExpression(leftHead, factory.createStringLiteralFromNode(fieldName));
}

/* @internal */
function prepareModifierFlagsForAccessor(modifierFlags: ModifierFlags): ModifierFlags {
    modifierFlags &= ~ModifierFlags.Readonly; // avoid Readonly modifier because it will convert to get accessor
    modifierFlags &= ~ModifierFlags.Private;

    if (!(modifierFlags & ModifierFlags.Protected)) {
        modifierFlags |= ModifierFlags.Public;
    }

    return modifierFlags;
}

/* @internal */
function prepareModifierFlagsForField(modifierFlags: ModifierFlags): ModifierFlags {
    modifierFlags &= ~ModifierFlags.Public;
    modifierFlags &= ~ModifierFlags.Protected;
    modifierFlags |= ModifierFlags.Private;
    return modifierFlags;
}

/* @internal */
export function getAccessorConvertiblePropertyAtPosition(file: SourceFile, program: Program, start: number, end: number, considerEmptySpans = true): Info | undefined {
    const node = getTokenAtPosition(file, start);
    const cursorRequest = start === end && considerEmptySpans;
    const declaration = findAncestor(node.parent, isAcceptedDeclaration);
    // make sure declaration have AccessibilityModifier or Static Modifier or Readonly Modifier
    const meaning = ModifierFlags.AccessibilityModifier | ModifierFlags.Static | ModifierFlags.Readonly;

    if (!declaration || (!(nodeOverlapsWithStartEnd(declaration.name, file, start, end) || cursorRequest))) {
        return {
            error: getLocaleSpecificMessage(Diagnostics.Could_not_find_property_for_which_to_generate_accessor)
        };
    }

    if (!isConvertibleName(declaration.name)) {
        return {
            error: getLocaleSpecificMessage(Diagnostics.Name_is_not_valid)
        };
    }

    if ((getEffectiveModifierFlags(declaration) | meaning) !== meaning) {
        return {
            error: getLocaleSpecificMessage(Diagnostics.Can_only_convert_property_with_modifier)
        };
    }

    const name = declaration.name.text;
    const startWithUnderscore = startsWithUnderscore(name);
    const fieldName = createPropertyName(startWithUnderscore ? name : getUniqueName(`_${name}`, file), declaration.name);
    const accessorName = createPropertyName(startWithUnderscore ? getUniqueName(name.substring(1), file) : name, declaration.name);
    return {
        isStatic: hasStaticModifier(declaration),
        isReadonly: hasEffectiveReadonlyModifier(declaration),
        type: getDeclarationType(declaration, program),
        container: declaration.kind === SyntaxKind.Parameter ? declaration.parent.parent : declaration.parent,
        originalName: (declaration.name as AcceptedNameType).text,
        declaration,
        fieldName,
        accessorName,
        renameAccessor: startWithUnderscore
    };
}

/* @internal */
function generateGetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: TypeNode | undefined, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclaration) {
    return factory.createGetAccessorDeclaration(
    /*decorators*/ undefined, modifiers, accessorName, 
        /*parameters*/ undefined!, // TODO: GH#18217
    type, factory.createBlock([
        factory.createReturnStatement(createAccessorAccessExpression(fieldName, isStatic, container))
    ], /*multiLine*/ true));
}

/* @internal */
function generateSetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: TypeNode | undefined, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclaration) {
    return factory.createSetAccessorDeclaration(
    /*decorators*/ undefined, modifiers, accessorName, [factory.createParameterDeclaration(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
        /*dotDotDotToken*/ undefined, factory.createIdentifier("value"), 
        /*questionToken*/ undefined, type)], factory.createBlock([
        factory.createExpressionStatement(factory.createAssignment(createAccessorAccessExpression(fieldName, isStatic, container), factory.createIdentifier("value")))
    ], /*multiLine*/ true));
}

/* @internal */
function updatePropertyDeclaration(changeTracker: ChangeTracker, file: SourceFile, declaration: PropertyDeclaration, type: TypeNode | undefined, fieldName: AcceptedNameType, modifiers: ModifiersArray | undefined) {
    const property = factory.updatePropertyDeclaration(declaration, declaration.decorators, modifiers, fieldName, declaration.questionToken || declaration.exclamationToken, type, declaration.initializer);
    changeTracker.replaceNode(file, declaration, property);
}

/* @internal */
function updatePropertyAssignmentDeclaration(changeTracker: ChangeTracker, file: SourceFile, declaration: PropertyAssignment, fieldName: AcceptedNameType) {
    const assignment = factory.updatePropertyAssignment(declaration, fieldName, declaration.initializer);
    changeTracker.replacePropertyAssignment(file, declaration, assignment);
}

/* @internal */
function updateFieldDeclaration(changeTracker: ChangeTracker, file: SourceFile, declaration: AcceptedDeclaration, type: TypeNode | undefined, fieldName: AcceptedNameType, modifiers: ModifiersArray | undefined) {
    if (isPropertyDeclaration(declaration)) {
        updatePropertyDeclaration(changeTracker, file, declaration, type, fieldName, modifiers);
    }
    else if (isPropertyAssignment(declaration)) {
        updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName);
    }
    else {
        changeTracker.replaceNode(file, declaration, factory.updateParameterDeclaration(declaration, declaration.decorators, modifiers, declaration.dotDotDotToken, cast(fieldName, isIdentifier), declaration.questionToken, declaration.type, declaration.initializer));
    }
}

/* @internal */
function insertAccessor(changeTracker: ChangeTracker, file: SourceFile, accessor: AccessorDeclaration, declaration: AcceptedDeclaration, container: ContainerDeclaration) {
    isParameterPropertyDeclaration(declaration, declaration.parent) ? changeTracker.insertNodeAtClassStart(file, container as ClassLikeDeclaration, accessor) :
        isPropertyAssignment(declaration) ? changeTracker.insertNodeAfterComma(file, declaration, accessor) :
        changeTracker.insertNodeAfter(file, declaration, accessor);
}

/* @internal */
function updateReadonlyPropertyInitializerStatementConstructor(changeTracker: ChangeTracker, file: SourceFile, constructor: ConstructorDeclaration, fieldName: string, originalName: string) {
    if (!constructor.body)
        return;
    constructor.body.forEachChild(function recur(node) {
        if (isElementAccessExpression(node) &&
            node.expression.kind === SyntaxKind.ThisKeyword &&
            isStringLiteral(node.argumentExpression) &&
            node.argumentExpression.text === originalName &&
            isWriteAccess(node)) {
            changeTracker.replaceNode(file, node.argumentExpression, factory.createStringLiteral(fieldName));
        }
        if (isPropertyAccessExpression(node) && node.expression.kind === SyntaxKind.ThisKeyword && node.name.text === originalName && isWriteAccess(node)) {
            changeTracker.replaceNode(file, node.name, factory.createIdentifier(fieldName));
        }
        if (!isFunctionLike(node) && !isClassLike(node)) {
            node.forEachChild(recur);
        }
    });
}

/* @internal */
function getDeclarationType(declaration: AcceptedDeclaration, program: Program): TypeNode | undefined {
    const typeNode = getTypeAnnotationNode(declaration);
    if (isPropertyDeclaration(declaration) && typeNode && declaration.questionToken) {
        const typeChecker = program.getTypeChecker();
        const type = typeChecker.getTypeFromTypeNode(typeNode);
        if (!typeChecker.isTypeAssignableTo(typeChecker.getUndefinedType(), type)) {
            const types = isUnionTypeNode(typeNode) ? typeNode.types : [typeNode];
            return factory.createUnionTypeNode([...types, factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)]);
        }
    }
    return typeNode;
}

/* @internal */
export function getAllSupers(decl: ClassOrInterface | undefined, checker: TypeChecker): readonly ClassOrInterface[] {
    const res: ClassLikeDeclaration[] = [];
    while (decl) {
        const superElement = getClassExtendsHeritageElement(decl);
        const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
        if (!superSymbol)
            break;
        const symbol = superSymbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(superSymbol) : superSymbol;
        const superDecl = symbol.declarations && find(symbol.declarations, isClassLike);
        if (!superDecl)
            break;
        res.push(superDecl);
        decl = superDecl;
    }
    return res;
}

/* @internal */
export type ClassOrInterface = ClassLikeDeclaration | InterfaceDeclaration;
