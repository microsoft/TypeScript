/* @internal */
namespace ts.codefix {
    type AcceptedDeclaration = ParameterPropertyDeclaration | PropertyDeclaration | PropertyAssignment;
    type AcceptedNameType = Identifier | StringLiteral;
    type ContainerDeclaration = ClassLikeDeclaration | ObjectLiteralExpression;

    interface Info {
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

    export function generateAccessorFromProperty(file: SourceFile, start: number, end: number, context: textChanges.TextChangesContext, _actionName: string): FileTextChanges[] | undefined {
        const fieldInfo = getAccessorConvertiblePropertyAtPosition(file, start, end);
        if (!fieldInfo) return undefined;

        const changeTracker = textChanges.ChangeTracker.fromContext(context);
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

        updateFieldDeclaration(changeTracker, file, declaration, fieldName, fieldModifiers);

        const getAccessor = generateGetAccessor(fieldName, accessorName, type, accessorModifiers, isStatic, container);
        suppressLeadingAndTrailingTrivia(getAccessor);
        insertAccessor(changeTracker, file, getAccessor, declaration, container);

        if (isReadonly) {
            // readonly modifier only existed in classLikeDeclaration
            const constructor = getFirstConstructorWithBody(<ClassLikeDeclaration>container);
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

    function isConvertibleName(name: DeclarationName): name is AcceptedNameType {
        return isIdentifier(name) || isStringLiteral(name);
    }

    function isAcceptedDeclaration(node: Node): node is AcceptedDeclaration {
        return isParameterPropertyDeclaration(node, node.parent) || isPropertyDeclaration(node) || isPropertyAssignment(node);
    }

    function createPropertyName(name: string, originalName: AcceptedNameType) {
        return isIdentifier(originalName) ? createIdentifier(name) : createLiteral(name);
    }

    function createAccessorAccessExpression(fieldName: AcceptedNameType, isStatic: boolean, container: ContainerDeclaration) {
        const leftHead = isStatic ? (<ClassLikeDeclaration>container).name! : createThis(); // TODO: GH#18217
        return isIdentifier(fieldName) ? createPropertyAccess(leftHead, fieldName) : createElementAccess(leftHead, createLiteral(fieldName));
    }

    function createModifiers(modifierFlags: ModifierFlags): ModifiersArray | undefined {
        return modifierFlags ? createNodeArray(createModifiersFromModifierFlags(modifierFlags)) : undefined;
    }

    function prepareModifierFlagsForAccessor(modifierFlags: ModifierFlags): ModifierFlags {
        modifierFlags &= ~ModifierFlags.Readonly; // avoid Readonly modifier because it will convert to get accessor
        modifierFlags &= ~ModifierFlags.Private;

        if (!(modifierFlags & ModifierFlags.Protected)) {
            modifierFlags |= ModifierFlags.Public;
        }

        return modifierFlags;
    }

    function prepareModifierFlagsForField(modifierFlags: ModifierFlags): ModifierFlags {
        modifierFlags &= ~ModifierFlags.Public;
        modifierFlags &= ~ModifierFlags.Protected;
        modifierFlags |= ModifierFlags.Private;
        return modifierFlags;
    }

    export function getAccessorConvertiblePropertyAtPosition(file: SourceFile, start: number, end: number, considerEmptySpans = true): Info | undefined {
        const node = getTokenAtPosition(file, start);
        const cursorRequest = start === end && considerEmptySpans;
        const declaration = findAncestor(node.parent, isAcceptedDeclaration);
        // make sure declaration have AccessibilityModifier or Static Modifier or Readonly Modifier
        const meaning = ModifierFlags.AccessibilityModifier | ModifierFlags.Static | ModifierFlags.Readonly;
        if (!declaration || !(nodeOverlapsWithStartEnd(declaration.name, file, start, end) || cursorRequest)
            || !isConvertibleName(declaration.name) || (getEffectiveModifierFlags(declaration) | meaning) !== meaning) return undefined;

        const name = declaration.name.text;
        const startWithUnderscore = startsWithUnderscore(name);
        const fieldName = createPropertyName(startWithUnderscore ? name : getUniqueName(`_${name}`, file), declaration.name);
        const accessorName = createPropertyName(startWithUnderscore ? getUniqueName(name.substring(1), file) : name, declaration.name);
        return {
            isStatic: hasStaticModifier(declaration),
            isReadonly: hasEffectiveReadonlyModifier(declaration),
            type: getTypeAnnotationNode(declaration),
            container: declaration.kind === SyntaxKind.Parameter ? declaration.parent.parent : declaration.parent,
            originalName: (<AcceptedNameType>declaration.name).text,
            declaration,
            fieldName,
            accessorName,
            renameAccessor: startWithUnderscore
        };
    }

    function generateGetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: TypeNode | undefined, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclaration) {
        return createGetAccessor(
            /*decorators*/ undefined,
            modifiers,
            accessorName,
            /*parameters*/ undefined!, // TODO: GH#18217
            type,
            createBlock([
                createReturn(
                    createAccessorAccessExpression(fieldName, isStatic, container)
                )
            ], /*multiLine*/ true)
        );
    }

    function generateSetAccessor(fieldName: AcceptedNameType, accessorName: AcceptedNameType, type: TypeNode | undefined, modifiers: ModifiersArray | undefined, isStatic: boolean, container: ContainerDeclaration) {
        return createSetAccessor(
            /*decorators*/ undefined,
            modifiers,
            accessorName,
            [createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                createIdentifier("value"),
                /*questionToken*/ undefined,
                type
            )],
            createBlock([
                createStatement(
                    createAssignment(
                        createAccessorAccessExpression(fieldName, isStatic, container),
                        createIdentifier("value")
                    )
                )
            ], /*multiLine*/ true)
        );
    }

    function updatePropertyDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyDeclaration, fieldName: AcceptedNameType, modifiers: ModifiersArray | undefined) {
        const property = updateProperty(
            declaration,
            declaration.decorators,
            modifiers,
            fieldName,
            declaration.questionToken || declaration.exclamationToken,
            declaration.type,
            declaration.initializer
        );
        changeTracker.replaceNode(file, declaration, property);
    }

    function updatePropertyAssignmentDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: PropertyAssignment, fieldName: AcceptedNameType) {
        const assignment = updatePropertyAssignment(declaration, fieldName, declaration.initializer);
        changeTracker.replacePropertyAssignment(file, declaration, assignment);
    }

    function updateFieldDeclaration(changeTracker: textChanges.ChangeTracker, file: SourceFile, declaration: AcceptedDeclaration, fieldName: AcceptedNameType, modifiers: ModifiersArray | undefined) {
        if (isPropertyDeclaration(declaration)) {
            updatePropertyDeclaration(changeTracker, file, declaration, fieldName, modifiers);
        }
        else if (isPropertyAssignment(declaration)) {
            updatePropertyAssignmentDeclaration(changeTracker, file, declaration, fieldName);
        }
        else {
            changeTracker.replaceNode(file, declaration,
                updateParameter(declaration, declaration.decorators, modifiers, declaration.dotDotDotToken, cast(fieldName, isIdentifier), declaration.questionToken, declaration.type, declaration.initializer));
        }
    }

    function insertAccessor(changeTracker: textChanges.ChangeTracker, file: SourceFile, accessor: AccessorDeclaration, declaration: AcceptedDeclaration, container: ContainerDeclaration) {
        isParameterPropertyDeclaration(declaration, declaration.parent) ? changeTracker.insertNodeAtClassStart(file, <ClassLikeDeclaration>container, accessor) :
            isPropertyAssignment(declaration) ? changeTracker.insertNodeAfterComma(file, declaration, accessor) :
            changeTracker.insertNodeAfter(file, declaration, accessor);
    }

    function updateReadonlyPropertyInitializerStatementConstructor(changeTracker: textChanges.ChangeTracker, file: SourceFile, constructor: ConstructorDeclaration, fieldName: string, originalName: string) {
        if (!constructor.body) return;
        constructor.body.forEachChild(function recur(node) {
            if (isElementAccessExpression(node) &&
                node.expression.kind === SyntaxKind.ThisKeyword &&
                isStringLiteral(node.argumentExpression) &&
                node.argumentExpression.text === originalName &&
                isWriteAccess(node)) {
                changeTracker.replaceNode(file, node.argumentExpression, createStringLiteral(fieldName));
            }
            if (isPropertyAccessExpression(node) && node.expression.kind === SyntaxKind.ThisKeyword && node.name.text === originalName && isWriteAccess(node)) {
                changeTracker.replaceNode(file, node.name, createIdentifier(fieldName));
            }
            if (!isFunctionLike(node) && !isClassLike(node)) {
                node.forEachChild(recur);
            }
        });
    }

    export function getAllSupers(decl: ClassOrInterface | undefined, checker: TypeChecker): readonly ClassOrInterface[] {
        const res: ClassLikeDeclaration[] = [];
        while (decl) {
            const superElement = getClassExtendsHeritageElement(decl);
            const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
            if (!superSymbol) break;
            const symbol = superSymbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(superSymbol) : superSymbol;
            const superDecl = find(symbol.declarations, isClassLike);
            if (!superDecl) break;
            res.push(superDecl);
            decl = superDecl;
        }
        return res;
    }

    export type ClassOrInterface = ClassLikeDeclaration | InterfaceDeclaration;
}
