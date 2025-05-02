import {
    __String,
    addEmitHelpers,
    addRange,
    AllDecorators,
    append,
    Bundle,
    canHaveDecorators,
    chainBundle,
    childIsDecorated,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassLikeDeclaration,
    classOrConstructorParameterIsDecorated,
    ConstructorDeclaration,
    Debug,
    Decorator,
    elideNodes,
    EmitFlags,
    EmitHint,
    EnumMember,
    Expression,
    filter,
    flatMap,
    GetAccessorDeclaration,
    getAllDecoratorsOfClass,
    getAllDecoratorsOfClassElement,
    getEmitScriptTarget,
    getOriginalNodeId,
    groupBy,
    hasAccessorModifier,
    hasSyntacticModifier,
    Identifier,
    idText,
    isBindingName,
    isBlock,
    isCallToHelper,
    isClassElement,
    isClassStaticBlockDeclaration,
    isComputedPropertyName,
    isDecorator,
    isExportOrDefaultModifier,
    isExpression,
    isGeneratedIdentifier,
    isHeritageClause,
    isIdentifier,
    isModifier,
    isModifierLike,
    isParameter,
    isPrivateIdentifier,
    isPropertyDeclaration,
    isPropertyName,
    isSimpleInlineableExpression,
    isStatic,
    map,
    MethodDeclaration,
    ModifierFlags,
    moveRangePastModifiers,
    Node,
    NodeArray,
    NodeCheckFlags,
    NodeFlags,
    nodeOrChildIsDecorated,
    ParameterDeclaration,
    PropertyDeclaration,
    ScriptTarget,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setSourceMapRange,
    setTextRange,
    singleOrMany,
    some,
    SourceFile,
    Statement,
    SyntaxKind,
    TransformationContext,
    TransformFlags,
    visitEachChild,
    visitNode,
    visitNodes,
    VisitResult,
} from "../_namespaces/ts.js";

/** @internal */
export function transformLegacyDecorators(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        hoistVariableDeclaration,
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = getEmitScriptTarget(compilerOptions);

    // Save the previous transformation hooks.
    const previousOnSubstituteNode = context.onSubstituteNode;

    // Set new transformation hooks.
    context.onSubstituteNode = onSubstituteNode;

    /**
     * A map that keeps track of aliases created for classes with decorators to avoid issues
     * with the double-binding behavior of classes.
     */
    let classAliases: Identifier[];

    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        const visited = visitEachChild(node, visitor, context);
        addEmitHelpers(visited, context.readEmitHelpers());
        return visited;
    }

    function modifierVisitor(node: Node): VisitResult<Node | undefined> {
        return isDecorator(node) ? undefined : node;
    }

    function visitor(node: Node): VisitResult<Node | undefined> {
        if (!(node.transformFlags & TransformFlags.ContainsDecorators)) {
            return node;
        }

        switch (node.kind) {
            case SyntaxKind.Decorator:
                // Decorators are elided. They will be emitted as part of `visitClassDeclaration`.
                return undefined;
            case SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ClassDeclaration);
            case SyntaxKind.ClassExpression:
                return visitClassExpression(node as ClassExpression);
            case SyntaxKind.Constructor:
                return visitConstructorDeclaration(node as ConstructorDeclaration);
            case SyntaxKind.MethodDeclaration:
                return visitMethodDeclaration(node as MethodDeclaration);
            case SyntaxKind.SetAccessor:
                return visitSetAccessorDeclaration(node as SetAccessorDeclaration);
            case SyntaxKind.GetAccessor:
                return visitGetAccessorDeclaration(node as GetAccessorDeclaration);
            case SyntaxKind.PropertyDeclaration:
                return visitPropertyDeclaration(node as PropertyDeclaration);
            case SyntaxKind.Parameter:
                return visitParameterDeclaration(node as ParameterDeclaration);
            default:
                return visitEachChild(node, visitor, context);
        }
    }

    function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
        if (!(classOrConstructorParameterIsDecorated(/*useLegacyDecorators*/ true, node) || childIsDecorated(/*useLegacyDecorators*/ true, node))) {
            return visitEachChild(node, visitor, context);
        }

        const statements = classOrConstructorParameterIsDecorated(/*useLegacyDecorators*/ true, node) ?
            transformClassDeclarationWithClassDecorators(node, node.name) :
            transformClassDeclarationWithoutClassDecorators(node, node.name);

        return singleOrMany(statements);
    }

    function decoratorContainsPrivateIdentifierInExpression(decorator: Decorator) {
        return !!(decorator.transformFlags & TransformFlags.ContainsPrivateIdentifierInExpression);
    }

    function parameterDecoratorsContainPrivateIdentifierInExpression(parameterDecorators: readonly Decorator[] | undefined) {
        return some(parameterDecorators, decoratorContainsPrivateIdentifierInExpression);
    }

    function hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node: ClassDeclaration) {
        for (const member of node.members) {
            if (!canHaveDecorators(member)) continue;
            const allDecorators = getAllDecoratorsOfClassElement(member, node, /*useLegacyDecorators*/ true);
            if (some(allDecorators?.decorators, decoratorContainsPrivateIdentifierInExpression)) return true;
            if (some(allDecorators?.parameters, parameterDecoratorsContainPrivateIdentifierInExpression)) return true;
        }
        return false;
    }

    function transformDecoratorsOfClassElements(node: ClassDeclaration, members: NodeArray<ClassElement>) {
        let decorationStatements: Statement[] | undefined = [];
        addClassElementDecorationStatements(decorationStatements, node, /*isStatic*/ false);
        addClassElementDecorationStatements(decorationStatements, node, /*isStatic*/ true);
        if (hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node)) {
            members = setTextRange(
                factory.createNodeArray([
                    ...members,
                    factory.createClassStaticBlockDeclaration(
                        factory.createBlock(decorationStatements, /*multiLine*/ true),
                    ),
                ]),
                members,
            );
            decorationStatements = undefined;
        }
        return { decorationStatements, members };
    }

    /**
     * Transforms a non-decorated class declaration.
     *
     * @param node A ClassDeclaration node.
     * @param name The name of the class.
     */
    function transformClassDeclarationWithoutClassDecorators(node: ClassDeclaration, name: Identifier | undefined) {
        //  ${modifiers} class ${name} ${heritageClauses} {
        //      ${members}
        //  }

        const modifiers = visitNodes(node.modifiers, modifierVisitor, isModifier);
        const heritageClauses = visitNodes(node.heritageClauses, visitor, isHeritageClause);
        let members = visitNodes(node.members, visitor, isClassElement);

        let decorationStatements: Statement[] | undefined = [];
        ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));

        const updated = factory.updateClassDeclaration(
            node,
            modifiers,
            name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members,
        );

        return addRange([updated], decorationStatements);
    }

    /**
     * Transforms a decorated class declaration and appends the resulting statements. If
     * the class requires an alias to avoid issues with double-binding, the alias is returned.
     */
    function transformClassDeclarationWithClassDecorators(node: ClassDeclaration, name: Identifier | undefined) {
        // When we emit an ES6 class that has a class decorator, we must tailor the
        // emit to certain specific cases.
        //
        // In the simplest case, we emit the class declaration as a let declaration, and
        // evaluate decorators after the close of the class body:
        //
        //  [Example 1]
        //  ---------------------------------------------------------------------
        //  TypeScript                      | Javascript
        //  ---------------------------------------------------------------------
        //  @dec                            | let C = class C {
        //  class C {                       | }
        //  }                               | C = __decorate([dec], C);
        //  ---------------------------------------------------------------------
        //  @dec                            | let C = class C {
        //  export class C {                | }
        //  }                               | C = __decorate([dec], C);
        //                                  | export { C };
        //  ---------------------------------------------------------------------
        //
        // If a class declaration contains a reference to itself *inside* of the class body,
        // this introduces two bindings to the class: One outside of the class body, and one
        // inside of the class body. If we apply decorators as in [Example 1] above, there
        // is the possibility that the decorator `dec` will return a new value for the
        // constructor, which would result in the binding inside of the class no longer
        // pointing to the same reference as the binding outside of the class.
        //
        // As a result, we must instead rewrite all references to the class *inside* of the
        // class body to instead point to a local temporary alias for the class:
        //
        //  [Example 2]
        //  ---------------------------------------------------------------------
        //  TypeScript                      | Javascript
        //  ---------------------------------------------------------------------
        //  @dec                            | let C = C_1 = class C {
        //  class C {                       |   static x() { return C_1.y; }
        //    static x() { return C.y; }    | }
        //    static y = 1;                 | C.y = 1;
        //  }                               | C = C_1 = __decorate([dec], C);
        //                                  | var C_1;
        //  ---------------------------------------------------------------------
        //  @dec                            | let C = class C {
        //  export class C {                |   static x() { return C_1.y; }
        //    static x() { return C.y; }    | }
        //    static y = 1;                 | C.y = 1;
        //  }                               | C = C_1 = __decorate([dec], C);
        //                                  | export { C };
        //                                  | var C_1;
        //  ---------------------------------------------------------------------
        //
        // If a class declaration is the default export of a module, we instead emit
        // the export after the decorated declaration:
        //
        //  [Example 3]
        //  ---------------------------------------------------------------------
        //  TypeScript                      | Javascript
        //  ---------------------------------------------------------------------
        //  @dec                            | let default_1 = class {
        //  export default class {          | }
        //  }                               | default_1 = __decorate([dec], default_1);
        //                                  | export default default_1;
        //  ---------------------------------------------------------------------
        //  @dec                            | let C = class C {
        //  export default class C {        | }
        //  }                               | C = __decorate([dec], C);
        //                                  | export default C;
        //  ---------------------------------------------------------------------
        //
        // If the class declaration is the default export and a reference to itself
        // inside of the class body, we must emit both an alias for the class *and*
        // move the export after the declaration:
        //
        //  [Example 4]
        //  ---------------------------------------------------------------------
        //  TypeScript                      | Javascript
        //  ---------------------------------------------------------------------
        //  @dec                            | let C = class C {
        //  export default class C {        |   static x() { return C_1.y; }
        //    static x() { return C.y; }    | }
        //    static y = 1;                 | C.y = 1;
        //  }                               | C = C_1 = __decorate([dec], C);
        //                                  | export default C;
        //                                  | var C_1;
        //  ---------------------------------------------------------------------
        //

        const isExport = hasSyntacticModifier(node, ModifierFlags.Export);
        const isDefault = hasSyntacticModifier(node, ModifierFlags.Default);
        const modifiers = visitNodes(node.modifiers, node => isExportOrDefaultModifier(node) || isDecorator(node) ? undefined : node, isModifierLike);

        const location = moveRangePastModifiers(node);
        const classAlias = getClassAliasIfNeeded(node);

        // When we transform to ES5/3 this will be moved inside an IIFE and should reference the name
        // without any block-scoped variable collision handling
        const declName = languageVersion < ScriptTarget.ES2015 ?
            factory.getInternalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true) :
            factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

        //  ... = class ${name} ${heritageClauses} {
        //      ${members}
        //  }
        const heritageClauses = visitNodes(node.heritageClauses, visitor, isHeritageClause);
        let members = visitNodes(node.members, visitor, isClassElement);

        let decorationStatements: Statement[] | undefined = [];
        ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));

        // If we're emitting to ES2022 or later then we need to reassign the class alias before
        // static initializers are evaluated.
        const assignClassAliasInStaticBlock = languageVersion >= ScriptTarget.ES2022 &&
            !!classAlias &&
            some(members, member =>
                isPropertyDeclaration(member) && hasSyntacticModifier(member, ModifierFlags.Static) ||
                isClassStaticBlockDeclaration(member));
        if (assignClassAliasInStaticBlock) {
            members = setTextRange(
                factory.createNodeArray([
                    factory.createClassStaticBlockDeclaration(
                        factory.createBlock([
                            factory.createExpressionStatement(
                                factory.createAssignment(classAlias, factory.createThis()),
                            ),
                        ]),
                    ),
                    ...members,
                ]),
                members,
            );
        }

        const classExpression = factory.createClassExpression(
            modifiers,
            name && isGeneratedIdentifier(name) ? undefined : name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members,
        );

        setOriginalNode(classExpression, node);
        setTextRange(classExpression, location);

        //  let ${name} = ${classExpression} where name is either declaredName if the class doesn't contain self-reference
        //                                         or decoratedClassAlias if the class contain self-reference.
        const varInitializer = classAlias && !assignClassAliasInStaticBlock ? factory.createAssignment(classAlias, classExpression) : classExpression;
        const varDecl = factory.createVariableDeclaration(declName, /*exclamationToken*/ undefined, /*type*/ undefined, varInitializer);
        setOriginalNode(varDecl, node);

        const varDeclList = factory.createVariableDeclarationList([varDecl], NodeFlags.Let);
        const varStatement = factory.createVariableStatement(/*modifiers*/ undefined, varDeclList);
        setOriginalNode(varStatement, node);
        setTextRange(varStatement, location);
        setCommentRange(varStatement, node);

        const statements: Statement[] = [varStatement];
        addRange(statements, decorationStatements);
        addConstructorDecorationStatement(statements, node);

        if (isExport) {
            if (isDefault) {
                const exportStatement = factory.createExportDefault(declName);
                statements.push(exportStatement);
            }
            else {
                const exportStatement = factory.createExternalModuleExport(factory.getDeclarationName(node));
                statements.push(exportStatement);
            }
        }

        return statements;
    }

    function visitClassExpression(node: ClassExpression) {
        // Legacy decorators were not supported on class expressions
        return factory.updateClassExpression(
            node,
            visitNodes(node.modifiers, modifierVisitor, isModifier),
            node.name,
            /*typeParameters*/ undefined,
            visitNodes(node.heritageClauses, visitor, isHeritageClause),
            visitNodes(node.members, visitor, isClassElement),
        );
    }

    function visitConstructorDeclaration(node: ConstructorDeclaration) {
        return factory.updateConstructorDeclaration(
            node,
            visitNodes(node.modifiers, modifierVisitor, isModifier),
            visitNodes(node.parameters, visitor, isParameter),
            visitNode(node.body, visitor, isBlock),
        );
    }

    function finishClassElement(updated: ClassElement, original: ClassElement) {
        if (updated !== original) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            setCommentRange(updated, original);
            setSourceMapRange(updated, moveRangePastModifiers(original));
        }
        return updated;
    }

    function visitMethodDeclaration(node: MethodDeclaration) {
        return finishClassElement(
            factory.updateMethodDeclaration(
                node,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                node.asteriskToken,
                Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)),
                /*questionToken*/ undefined,
                /*typeParameters*/ undefined,
                visitNodes(node.parameters, visitor, isParameter),
                /*type*/ undefined,
                visitNode(node.body, visitor, isBlock),
            ),
            node,
        );
    }

    function visitGetAccessorDeclaration(node: GetAccessorDeclaration) {
        return finishClassElement(
            factory.updateGetAccessorDeclaration(
                node,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)),
                visitNodes(node.parameters, visitor, isParameter),
                /*type*/ undefined,
                visitNode(node.body, visitor, isBlock),
            ),
            node,
        );
    }

    function visitSetAccessorDeclaration(node: SetAccessorDeclaration) {
        return finishClassElement(
            factory.updateSetAccessorDeclaration(
                node,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)),
                visitNodes(node.parameters, visitor, isParameter),
                visitNode(node.body, visitor, isBlock),
            ),
            node,
        );
    }

    function visitPropertyDeclaration(node: PropertyDeclaration) {
        if (node.flags & NodeFlags.Ambient || hasSyntacticModifier(node, ModifierFlags.Ambient)) {
            return undefined;
        }

        return finishClassElement(
            factory.updatePropertyDeclaration(
                node,
                visitNodes(node.modifiers, modifierVisitor, isModifier),
                Debug.checkDefined(visitNode(node.name, visitor, isPropertyName)),
                /*questionOrExclamationToken*/ undefined,
                /*type*/ undefined,
                visitNode(node.initializer, visitor, isExpression),
            ),
            node,
        );
    }

    function visitParameterDeclaration(node: ParameterDeclaration) {
        const updated = factory.updateParameterDeclaration(
            node,
            elideNodes(factory, node.modifiers),
            node.dotDotDotToken,
            Debug.checkDefined(visitNode(node.name, visitor, isBindingName)),
            /*questionToken*/ undefined,
            /*type*/ undefined,
            visitNode(node.initializer, visitor, isExpression),
        );
        if (updated !== node) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            setCommentRange(updated, node);
            setTextRange(updated, moveRangePastModifiers(node));
            setSourceMapRange(updated, moveRangePastModifiers(node));
            setEmitFlags(updated.name, EmitFlags.NoTrailingSourceMap);
        }
        return updated;
    }

    function isSyntheticMetadataDecorator(node: Decorator) {
        return isCallToHelper(node.expression, "___metadata" as __String);
    }

    /**
     * Transforms all of the decorators for a declaration into an array of expressions.
     *
     * @param allDecorators An object containing all of the decorators for the declaration.
     */
    function transformAllDecoratorsOfDeclaration(allDecorators: AllDecorators | undefined) {
        if (!allDecorators) {
            return undefined;
        }

        // ensure that metadata decorators are last
        const { false: decorators, true: metadata } = groupBy(allDecorators.decorators, isSyntheticMetadataDecorator);
        const decoratorExpressions: Expression[] = [];
        addRange(decoratorExpressions, map(decorators, transformDecorator));
        addRange(decoratorExpressions, flatMap(allDecorators.parameters, transformDecoratorsOfParameter));
        addRange(decoratorExpressions, map(metadata, transformDecorator));
        return decoratorExpressions;
    }

    /**
     * Generates statements used to apply decorators to either the static or instance members
     * of a class.
     *
     * @param node The class node.
     * @param isStatic A value indicating whether to generate statements for static or
     *                 instance members.
     */
    function addClassElementDecorationStatements(statements: Statement[], node: ClassDeclaration, isStatic: boolean) {
        addRange(statements, map(generateClassElementDecorationExpressions(node, isStatic), expr => factory.createExpressionStatement(expr)));
    }

    /**
     * Determines whether a class member is either a static or an instance member of a class
     * that is decorated, or has parameters that are decorated.
     *
     * @param member The class member.
     */
    function isDecoratedClassElement(member: ClassElement, isStaticElement: boolean, parent: ClassLikeDeclaration) {
        return nodeOrChildIsDecorated(/*useLegacyDecorators*/ true, member, parent)
            && isStaticElement === isStatic(member);
    }

    /**
     * Gets either the static or instance members of a class that are decorated, or have
     * parameters that are decorated.
     *
     * @param node The class containing the member.
     * @param isStatic A value indicating whether to retrieve static or instance members of
     *                 the class.
     */
    function getDecoratedClassElements(node: ClassExpression | ClassDeclaration, isStatic: boolean): readonly ClassElement[] {
        return filter(node.members, m => isDecoratedClassElement(m, isStatic, node));
    }

    /**
     * Generates expressions used to apply decorators to either the static or instance members
     * of a class.
     *
     * @param node The class node.
     * @param isStatic A value indicating whether to generate expressions for static or
     *                 instance members.
     */
    function generateClassElementDecorationExpressions(node: ClassExpression | ClassDeclaration, isStatic: boolean) {
        const members = getDecoratedClassElements(node, isStatic);
        let expressions: Expression[] | undefined;
        for (const member of members) {
            expressions = append(expressions, generateClassElementDecorationExpression(node, member));
        }
        return expressions;
    }

    /**
     * Generates an expression used to evaluate class element decorators at runtime.
     *
     * @param node The class node that contains the member.
     * @param member The class member.
     */
    function generateClassElementDecorationExpression(node: ClassExpression | ClassDeclaration, member: ClassElement) {
        const allDecorators = getAllDecoratorsOfClassElement(member, node, /*useLegacyDecorators*/ true);
        const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
        if (!decoratorExpressions) {
            return undefined;
        }

        // Emit the call to __decorate. Given the following:
        //
        //   class C {
        //     @dec method(@dec2 x) {}
        //     @dec get accessor() {}
        //     @dec prop;
        //   }
        //
        // The emit for a method is:
        //
        //   __decorate([
        //       dec,
        //       __param(0, dec2),
        //       __metadata("design:type", Function),
        //       __metadata("design:paramtypes", [Object]),
        //       __metadata("design:returntype", void 0)
        //   ], C.prototype, "method", null);
        //
        // The emit for an accessor is:
        //
        //   __decorate([
        //       dec
        //   ], C.prototype, "accessor", null);
        //
        // The emit for a property is:
        //
        //   __decorate([
        //       dec
        //   ], C.prototype, "prop");
        //

        const prefix = getClassMemberPrefix(node, member);
        const memberName = getExpressionForPropertyName(member, /*generateNameForComputedPropertyName*/ !hasSyntacticModifier(member, ModifierFlags.Ambient));
        const descriptor = isPropertyDeclaration(member) && !hasAccessorModifier(member)
            // We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
            // should not invoke `Object.getOwnPropertyDescriptor`.
            ? factory.createVoidZero()
            // We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
            // We have this extra argument here so that we can inject an explicit property descriptor at a later date.
            : factory.createNull();

        const helper = emitHelpers().createDecorateHelper(
            decoratorExpressions,
            prefix,
            memberName,
            descriptor,
        );

        setEmitFlags(helper, EmitFlags.NoComments);
        setSourceMapRange(helper, moveRangePastModifiers(member));
        return helper;
    }

    /**
     * Generates a __decorate helper call for a class constructor.
     *
     * @param node The class node.
     */
    function addConstructorDecorationStatement(statements: Statement[], node: ClassDeclaration) {
        const expression = generateConstructorDecorationExpression(node);
        if (expression) {
            statements.push(setOriginalNode(factory.createExpressionStatement(expression), node));
        }
    }

    /**
     * Generates a __decorate helper call for a class constructor.
     *
     * @param node The class node.
     */
    function generateConstructorDecorationExpression(node: ClassExpression | ClassDeclaration) {
        const allDecorators = getAllDecoratorsOfClass(node, /*useLegacyDecorators*/ true);
        const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
        if (!decoratorExpressions) {
            return undefined;
        }

        const classAlias = classAliases && classAliases[getOriginalNodeId(node)];

        // When we transform to ES5/3 this will be moved inside an IIFE and should reference the name
        // without any block-scoped variable collision handling
        const localName = languageVersion < ScriptTarget.ES2015 ?
            factory.getInternalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true) :
            factory.getDeclarationName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);
        const decorate = emitHelpers().createDecorateHelper(decoratorExpressions, localName);
        const expression = factory.createAssignment(localName, classAlias ? factory.createAssignment(classAlias, decorate) : decorate);
        setEmitFlags(expression, EmitFlags.NoComments);
        setSourceMapRange(expression, moveRangePastModifiers(node));
        return expression;
    }

    /**
     * Transforms a decorator into an expression.
     *
     * @param decorator The decorator node.
     */
    function transformDecorator(decorator: Decorator) {
        return Debug.checkDefined(visitNode(decorator.expression, visitor, isExpression));
    }

    /**
     * Transforms the decorators of a parameter.
     *
     * @param decorators The decorators for the parameter at the provided offset.
     * @param parameterOffset The offset of the parameter.
     */
    function transformDecoratorsOfParameter(decorators: readonly Decorator[] | undefined, parameterOffset: number) {
        let expressions: Expression[] | undefined;
        if (decorators) {
            expressions = [];
            for (const decorator of decorators) {
                const helper = emitHelpers().createParamHelper(
                    transformDecorator(decorator),
                    parameterOffset,
                );
                setTextRange(helper, decorator.expression);
                setEmitFlags(helper, EmitFlags.NoComments);
                expressions.push(helper);
            }
        }

        return expressions;
    }

    /**
     * Gets an expression that represents a property name (for decorated properties or enums).
     * For a computed property, a name is generated for the node.
     *
     * @param member The member whose name should be converted into an expression.
     */
    function getExpressionForPropertyName(member: ClassElement | EnumMember, generateNameForComputedPropertyName: boolean): Expression {
        const name = member.name!;
        if (isPrivateIdentifier(name)) {
            return factory.createIdentifier("");
        }
        else if (isComputedPropertyName(name)) {
            return generateNameForComputedPropertyName && !isSimpleInlineableExpression(name.expression)
                ? factory.getGeneratedNameForNode(name)
                : name.expression;
        }
        else if (isIdentifier(name)) {
            return factory.createStringLiteral(idText(name));
        }
        else {
            return factory.cloneNode(name);
        }
    }

    function enableSubstitutionForClassAliases() {
        if (!classAliases) {
            // We need to enable substitutions for identifiers. This allows us to
            // substitute class names inside of a class declaration.
            context.enableSubstitution(SyntaxKind.Identifier);

            // Keep track of class aliases.
            classAliases = [];
        }
    }

    /**
     * Gets a local alias for a class declaration if it is a decorated class with an internal
     * reference to the static side of the class. This is necessary to avoid issues with
     * double-binding semantics for the class name.
     */
    function getClassAliasIfNeeded(node: ClassDeclaration) {
        if (resolver.hasNodeCheckFlag(node, NodeCheckFlags.ContainsConstructorReference)) {
            enableSubstitutionForClassAliases();
            const classAlias = factory.createUniqueName(node.name && !isGeneratedIdentifier(node.name) ? idText(node.name) : "default");
            classAliases[getOriginalNodeId(node)] = classAlias;
            hoistVariableDeclaration(classAlias);
            return classAlias;
        }
    }

    function getClassPrototype(node: ClassExpression | ClassDeclaration) {
        return factory.createPropertyAccessExpression(factory.getDeclarationName(node), "prototype");
    }

    function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
        return isStatic(member)
            ? factory.getDeclarationName(node)
            : getClassPrototype(node);
    }

    /**
     * Hooks node substitutions.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    function onSubstituteNode(hint: EmitHint, node: Node) {
        node = previousOnSubstituteNode(hint, node);
        if (hint === EmitHint.Expression) {
            return substituteExpression(node as Expression);
        }
        return node;
    }

    function substituteExpression(node: Expression) {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                return substituteExpressionIdentifier(node as Identifier);
        }

        return node;
    }

    function substituteExpressionIdentifier(node: Identifier): Expression {
        return trySubstituteClassAlias(node)
            ?? node;
    }

    function trySubstituteClassAlias(node: Identifier): Expression | undefined {
        if (classAliases) {
            if (resolver.hasNodeCheckFlag(node, NodeCheckFlags.ConstructorReference)) {
                // Due to the emit for class decorators, any reference to the class from inside of the class body
                // must instead be rewritten to point to a temporary variable to avoid issues with the double-bind
                // behavior of class names in ES6.
                // Also, when emitting statics for class expressions, we must substitute a class alias for
                // constructor references in static property initializers.
                const declaration = resolver.getReferencedValueDeclaration(node);
                if (declaration) {
                    const classAlias = classAliases[declaration.id!]; // TODO: GH#18217
                    if (classAlias) {
                        const clone = factory.cloneNode(classAlias);
                        setSourceMapRange(clone, node);
                        setCommentRange(clone, node);
                        return clone;
                    }
                }
            }
        }

        return undefined;
    }
}
