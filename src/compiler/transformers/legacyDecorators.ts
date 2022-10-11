import * as ts from "../_namespaces/ts";

/** @internal */
export function transformLegacyDecorators(context: ts.TransformationContext) {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        hoistVariableDeclaration,
    } = context;

    const resolver = context.getEmitResolver();
    const compilerOptions = context.getCompilerOptions();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);

    // Save the previous transformation hooks.
    const previousOnSubstituteNode = context.onSubstituteNode;

    // Set new transformation hooks.
    context.onSubstituteNode = onSubstituteNode;

    /**
     * A map that keeps track of aliases created for classes with decorators to avoid issues
     * with the double-binding behavior of classes.
     */
    let classAliases: ts.Identifier[];

    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        const visited = ts.visitEachChild(node, visitor, context);
        ts.addEmitHelpers(visited, context.readEmitHelpers());
        return visited;
    }

    function modifierVisitor(node: ts.Node): ts.VisitResult<ts.Node> {
        return ts.isDecorator(node) ? undefined : node;
    }

    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        if (!(node.transformFlags & ts.TransformFlags.ContainsDecorators)) {
            return node;
        }

        switch (node.kind) {
            case ts.SyntaxKind.Decorator:
                // Decorators are elided. They will be emitted as part of `visitClassDeclaration`.
                return undefined;
            case ts.SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(node as ts.ClassDeclaration);
            case ts.SyntaxKind.ClassExpression:
                return visitClassExpression(node as ts.ClassExpression);
            case ts.SyntaxKind.Constructor:
                return visitConstructorDeclaration(node as ts.ConstructorDeclaration);
            case ts.SyntaxKind.MethodDeclaration:
                return visitMethodDeclaration(node as ts.MethodDeclaration);
            case ts.SyntaxKind.SetAccessor:
                return visitSetAccessorDeclaration(node as ts.SetAccessorDeclaration);
            case ts.SyntaxKind.GetAccessor:
                return visitGetAccessorDeclaration(node as ts.GetAccessorDeclaration);
            case ts.SyntaxKind.PropertyDeclaration:
                return visitPropertyDeclaration(node as ts.PropertyDeclaration);
            case ts.SyntaxKind.Parameter:
                return visitParameterDeclaration(node as ts.ParameterDeclaration);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    function visitClassDeclaration(node: ts.ClassDeclaration): ts.VisitResult<ts.Statement> {
        if (!(ts.classOrConstructorParameterIsDecorated(node) || ts.childIsDecorated(node))) return ts.visitEachChild(node, visitor, context);

        const statements = ts.hasDecorators(node) ?
            transformClassDeclarationWithClassDecorators(node, node.name) :
            transformClassDeclarationWithoutClassDecorators(node, node.name);

        if (statements.length > 1) {
            // Add a DeclarationMarker as a marker for the end of the declaration
            statements.push(factory.createEndOfDeclarationMarker(node));
            ts.setEmitFlags(statements[0], ts.getEmitFlags(statements[0]) | ts.EmitFlags.HasEndOfDeclarationMarker);
        }

        return ts.singleOrMany(statements);
    }

    function decoratorContainsPrivateIdentifierInExpression(decorator: ts.Decorator) {
        return !!(decorator.transformFlags & ts.TransformFlags.ContainsPrivateIdentifierInExpression);
    }

    function parameterDecoratorsContainPrivateIdentifierInExpression(parameterDecorators: readonly ts.Decorator[] | undefined) {
        return ts.some(parameterDecorators, decoratorContainsPrivateIdentifierInExpression);
    }

    function hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node: ts.ClassDeclaration) {
        for (const member of node.members) {
            if (!ts.canHaveDecorators(member)) continue;
            const allDecorators = ts.getAllDecoratorsOfClassElement(member, node);
            if (ts.some(allDecorators?.decorators, decoratorContainsPrivateIdentifierInExpression)) return true;
            if (ts.some(allDecorators?.parameters, parameterDecoratorsContainPrivateIdentifierInExpression)) return true;
        }
        return false;
    }

    function transformDecoratorsOfClassElements(node: ts.ClassDeclaration, members: ts.NodeArray<ts.ClassElement>) {
        let decorationStatements: ts.Statement[] | undefined = [];
        addClassElementDecorationStatements(decorationStatements, node, /*isStatic*/ false);
        addClassElementDecorationStatements(decorationStatements, node, /*isStatic*/ true);
        if (hasClassElementWithDecoratorContainingPrivateIdentifierInExpression(node)) {
            members = ts.setTextRange(factory.createNodeArray([
                ...members,
                factory.createClassStaticBlockDeclaration(
                    factory.createBlock(decorationStatements, /*multiLine*/ true)
                )
            ]), members);
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
    function transformClassDeclarationWithoutClassDecorators(node: ts.ClassDeclaration, name: ts.Identifier | undefined) {
        //  ${modifiers} class ${name} ${heritageClauses} {
        //      ${members}
        //  }

        const modifiers = ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier);
        const heritageClauses = ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause);
        let members = ts.visitNodes(node.members, visitor, ts.isClassElement);

        let decorationStatements: ts.Statement[] | undefined = [];
        ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));

        const updated = factory.updateClassDeclaration(
            node,
            modifiers,
            name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members
        );

        return ts.addRange([updated], decorationStatements);
    }

    /**
     * Transforms a decorated class declaration and appends the resulting statements. If
     * the class requires an alias to avoid issues with double-binding, the alias is returned.
     */
    function transformClassDeclarationWithClassDecorators(node: ts.ClassDeclaration, name: ts.Identifier | undefined) {
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

        const location = ts.moveRangePastModifiers(node);
        const classAlias = getClassAliasIfNeeded(node);

        // When we transform to ES5/3 this will be moved inside an IIFE and should reference the name
        // without any block-scoped variable collision handling
        const declName = languageVersion <= ts.ScriptTarget.ES2015 ?
            factory.getInternalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true) :
            factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);

        //  ... = class ${name} ${heritageClauses} {
        //      ${members}
        //  }
        const heritageClauses = ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause);
        let members = ts.visitNodes(node.members, visitor, ts.isClassElement);

        let decorationStatements: ts.Statement[] | undefined = [];
        ({ members, decorationStatements } = transformDecoratorsOfClassElements(node, members));

        const classExpression = factory.createClassExpression(
            /*modifiers*/ undefined,
            name,
            /*typeParameters*/ undefined,
            heritageClauses,
            members);

        ts.setOriginalNode(classExpression, node);
        ts.setTextRange(classExpression, location);

        //  let ${name} = ${classExpression} where name is either declaredName if the class doesn't contain self-reference
        //                                         or decoratedClassAlias if the class contain self-reference.
        const statement = factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    declName,
                    /*exclamationToken*/ undefined,
                    /*type*/ undefined,
                    classAlias ? factory.createAssignment(classAlias, classExpression) : classExpression
                )
            ], ts.NodeFlags.Let)
        );
        ts.setOriginalNode(statement, node);
        ts.setTextRange(statement, location);
        ts.setCommentRange(statement, node);

        const statements: ts.Statement[] = [statement];
        ts.addRange(statements, decorationStatements);
        addConstructorDecorationStatement(statements, node);
        return statements;
    }

    function visitClassExpression(node: ts.ClassExpression) {
        // Legacy decorators were not supported on class expressions
        return factory.updateClassExpression(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            node.name,
            /*typeParameters*/ undefined,
            ts.visitNodes(node.heritageClauses, visitor, ts.isHeritageClause),
            ts.visitNodes(node.members, visitor, ts.isClassElement)
        );
    }

    function visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
        return factory.updateConstructorDeclaration(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            ts.visitNodes(node.parameters, visitor, ts.isParameterDeclaration),
            ts.visitNode(node.body, visitor, ts.isBlock));
    }

    function finishClassElement(updated: ts.ClassElement, original: ts.ClassElement) {
        if (updated !== original) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            ts.setCommentRange(updated, original);
            ts.setSourceMapRange(updated, ts.moveRangePastModifiers(original));
        }
        return updated;
    }

    function visitMethodDeclaration(node: ts.MethodDeclaration) {
        return finishClassElement(factory.updateMethodDeclaration(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            node.asteriskToken,
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            /*questionToken*/ undefined,
            /*typeParameters*/ undefined,
            ts.visitNodes(node.parameters, visitor, ts.isParameterDeclaration),
            /*type*/ undefined,
            ts.visitNode(node.body, visitor, ts.isBlock)
        ), node);
    }

    function visitGetAccessorDeclaration(node: ts.GetAccessorDeclaration) {
        return finishClassElement(factory.updateGetAccessorDeclaration(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            ts.visitNodes(node.parameters, visitor, ts.isParameterDeclaration),
            /*type*/ undefined,
            ts.visitNode(node.body, visitor, ts.isBlock)
        ), node);
    }

    function visitSetAccessorDeclaration(node: ts.SetAccessorDeclaration) {
        return finishClassElement(factory.updateSetAccessorDeclaration(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            ts.visitNodes(node.parameters, visitor, ts.isParameterDeclaration),
            ts.visitNode(node.body, visitor, ts.isBlock)
        ), node);
    }

    function visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        if (node.flags & ts.NodeFlags.Ambient || ts.hasSyntacticModifier(node, ts.ModifierFlags.Ambient)) {
            return undefined;
        }

        return finishClassElement(factory.updatePropertyDeclaration(
            node,
            ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier),
            ts.visitNode(node.name, visitor, ts.isPropertyName),
            /*questionOrExclamationToken*/ undefined,
            /*type*/ undefined,
            ts.visitNode(node.initializer, visitor, ts.isExpression)
        ), node);
    }

    function visitParameterDeclaration(node: ts.ParameterDeclaration) {
        const updated = factory.updateParameterDeclaration(
            node,
            ts.elideNodes(factory, node.modifiers),
            node.dotDotDotToken,
            ts.visitNode(node.name, visitor, ts.isBindingName),
            /*questionToken*/ undefined,
            /*type*/ undefined,
            ts.visitNode(node.initializer, visitor, ts.isExpression)
        );
        if (updated !== node) {
            // While we emit the source map for the node after skipping decorators and modifiers,
            // we need to emit the comments for the original range.
            ts.setCommentRange(updated, node);
            ts.setTextRange(updated, ts.moveRangePastModifiers(node));
            ts.setSourceMapRange(updated, ts.moveRangePastModifiers(node));
            ts.setEmitFlags(updated.name, ts.EmitFlags.NoTrailingSourceMap);
        }
        return updated;
    }

    /**
     * Transforms all of the decorators for a declaration into an array of expressions.
     *
     * @param allDecorators An object containing all of the decorators for the declaration.
     */
    function transformAllDecoratorsOfDeclaration(allDecorators: ts.AllDecorators | undefined) {
        if (!allDecorators) {
            return undefined;
        }

        const decoratorExpressions: ts.Expression[] = [];
        ts.addRange(decoratorExpressions, ts.map(allDecorators.decorators, transformDecorator));
        ts.addRange(decoratorExpressions, ts.flatMap(allDecorators.parameters, transformDecoratorsOfParameter));
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
    function addClassElementDecorationStatements(statements: ts.Statement[], node: ts.ClassDeclaration, isStatic: boolean) {
        ts.addRange(statements, ts.map(generateClassElementDecorationExpressions(node, isStatic), expr => factory.createExpressionStatement(expr)));
    }

    /**
     * Determines whether a class member is either a static or an instance member of a class
     * that is decorated, or has parameters that are decorated.
     *
     * @param member The class member.
     */
    function isDecoratedClassElement(member: ts.ClassElement, isStaticElement: boolean, parent: ts.ClassLikeDeclaration) {
        return ts.nodeOrChildIsDecorated(member, parent)
            && isStaticElement === ts.isStatic(member);
    }

    /**
     * Gets either the static or instance members of a class that are decorated, or have
     * parameters that are decorated.
     *
     * @param node The class containing the member.
     * @param isStatic A value indicating whether to retrieve static or instance members of
     *                 the class.
     */
    function getDecoratedClassElements(node: ts.ClassExpression | ts.ClassDeclaration, isStatic: boolean): readonly ts.ClassElement[] {
        return ts.filter(node.members, m => isDecoratedClassElement(m, isStatic, node));
    }

    /**
     * Generates expressions used to apply decorators to either the static or instance members
     * of a class.
     *
     * @param node The class node.
     * @param isStatic A value indicating whether to generate expressions for static or
     *                 instance members.
     */
    function generateClassElementDecorationExpressions(node: ts.ClassExpression | ts.ClassDeclaration, isStatic: boolean) {
        const members = getDecoratedClassElements(node, isStatic);
        let expressions: ts.Expression[] | undefined;
        for (const member of members) {
            expressions = ts.append(expressions, generateClassElementDecorationExpression(node, member));
        }
        return expressions;
    }

    /**
     * Generates an expression used to evaluate class element decorators at runtime.
     *
     * @param node The class node that contains the member.
     * @param member The class member.
     */
    function generateClassElementDecorationExpression(node: ts.ClassExpression | ts.ClassDeclaration, member: ts.ClassElement) {
        const allDecorators = ts.getAllDecoratorsOfClassElement(member, node);
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
        const memberName = getExpressionForPropertyName(member, /*generateNameForComputedPropertyName*/ !ts.hasSyntacticModifier(member, ts.ModifierFlags.Ambient));
        const descriptor = languageVersion > ts.ScriptTarget.ES3
            ? ts.isPropertyDeclaration(member) && !ts.hasAccessorModifier(member)
                // We emit `void 0` here to indicate to `__decorate` that it can invoke `Object.defineProperty` directly, but that it
                // should not invoke `Object.getOwnPropertyDescriptor`.
                ? factory.createVoidZero()

                // We emit `null` here to indicate to `__decorate` that it can invoke `Object.getOwnPropertyDescriptor` directly.
                // We have this extra argument here so that we can inject an explicit property descriptor at a later date.
                : factory.createNull()
            : undefined;

        const helper = emitHelpers().createDecorateHelper(
            decoratorExpressions,
            prefix,
            memberName,
            descriptor
        );

        ts.setEmitFlags(helper, ts.EmitFlags.NoComments);
        ts.setSourceMapRange(helper, ts.moveRangePastModifiers(member));
        return helper;
    }

    /**
     * Generates a __decorate helper call for a class constructor.
     *
     * @param node The class node.
     */
    function addConstructorDecorationStatement(statements: ts.Statement[], node: ts.ClassDeclaration) {
        const expression = generateConstructorDecorationExpression(node);
        if (expression) {
            statements.push(ts.setOriginalNode(factory.createExpressionStatement(expression), node));
        }
    }

    /**
     * Generates a __decorate helper call for a class constructor.
     *
     * @param node The class node.
     */
    function generateConstructorDecorationExpression(node: ts.ClassExpression | ts.ClassDeclaration) {
        const allDecorators = ts.getAllDecoratorsOfClass(node);
        const decoratorExpressions = transformAllDecoratorsOfDeclaration(allDecorators);
        if (!decoratorExpressions) {
            return undefined;
        }

        const classAlias = classAliases && classAliases[ts.getOriginalNodeId(node)];

        // When we transform to ES5/3 this will be moved inside an IIFE and should reference the name
        // without any block-scoped variable collision handling
        const localName = languageVersion <= ts.ScriptTarget.ES2015 ?
            factory.getInternalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true) :
            factory.getLocalName(node, /*allowComments*/ false, /*allowSourceMaps*/ true);
        const decorate = emitHelpers().createDecorateHelper(decoratorExpressions, localName);
        const expression = factory.createAssignment(localName, classAlias ? factory.createAssignment(classAlias, decorate) : decorate);
        ts.setEmitFlags(expression, ts.EmitFlags.NoComments);
        ts.setSourceMapRange(expression, ts.moveRangePastModifiers(node));
        return expression;
    }

    /**
     * Transforms a decorator into an expression.
     *
     * @param decorator The decorator node.
     */
    function transformDecorator(decorator: ts.Decorator) {
        return ts.visitNode(decorator.expression, visitor, ts.isExpression);
    }

    /**
     * Transforms the decorators of a parameter.
     *
     * @param decorators The decorators for the parameter at the provided offset.
     * @param parameterOffset The offset of the parameter.
     */
    function transformDecoratorsOfParameter(decorators: ts.Decorator[], parameterOffset: number) {
        let expressions: ts.Expression[] | undefined;
        if (decorators) {
            expressions = [];
            for (const decorator of decorators) {
                const helper = emitHelpers().createParamHelper(
                    transformDecorator(decorator),
                    parameterOffset);
                ts.setTextRange(helper, decorator.expression);
                ts.setEmitFlags(helper, ts.EmitFlags.NoComments);
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
    function getExpressionForPropertyName(member: ts.ClassElement | ts.EnumMember, generateNameForComputedPropertyName: boolean): ts.Expression {
        const name = member.name!;
        if (ts.isPrivateIdentifier(name)) {
            return factory.createIdentifier("");
        }
        else if (ts.isComputedPropertyName(name)) {
            return generateNameForComputedPropertyName && !ts.isSimpleInlineableExpression(name.expression)
                ? factory.getGeneratedNameForNode(name)
                : name.expression;
        }
        else if (ts.isIdentifier(name)) {
            return factory.createStringLiteral(ts.idText(name));
        }
        else {
            return factory.cloneNode(name);
        }
    }

    function enableSubstitutionForClassAliases() {
        if (!classAliases) {
            // We need to enable substitutions for identifiers. This allows us to
            // substitute class names inside of a class declaration.
            context.enableSubstitution(ts.SyntaxKind.Identifier);

            // Keep track of class aliases.
            classAliases = [];
        }
    }

    /**
     * Gets a local alias for a class declaration if it is a decorated class with an internal
     * reference to the static side of the class. This is necessary to avoid issues with
     * double-binding semantics for the class name.
     */
    function getClassAliasIfNeeded(node: ts.ClassDeclaration) {
        if (resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.ClassWithConstructorReference) {
            enableSubstitutionForClassAliases();
            const classAlias = factory.createUniqueName(node.name && !ts.isGeneratedIdentifier(node.name) ? ts.idText(node.name) : "default");
            classAliases[ts.getOriginalNodeId(node)] = classAlias;
            hoistVariableDeclaration(classAlias);
            return classAlias;
        }
    }

    function getClassPrototype(node: ts.ClassExpression | ts.ClassDeclaration) {
        return factory.createPropertyAccessExpression(factory.getDeclarationName(node), "prototype");
    }

    function getClassMemberPrefix(node: ts.ClassExpression | ts.ClassDeclaration, member: ts.ClassElement) {
        return ts.isStatic(member)
            ? factory.getDeclarationName(node)
            : getClassPrototype(node);
    }

    /**
     * Hooks node substitutions.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node) {
        node = previousOnSubstituteNode(hint, node);
        if (hint === ts.EmitHint.Expression) {
            return substituteExpression(node as ts.Expression);
        }
        return node;
    }

    function substituteExpression(node: ts.Expression) {
        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
                return substituteExpressionIdentifier(node as ts.Identifier);
        }

        return node;
    }

    function substituteExpressionIdentifier(node: ts.Identifier): ts.Expression {
        return trySubstituteClassAlias(node)
            ?? node;
    }

    function trySubstituteClassAlias(node: ts.Identifier): ts.Expression | undefined {
        if (classAliases) {
            if (resolver.getNodeCheckFlags(node) & ts.NodeCheckFlags.ConstructorReferenceInClass) {
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
                        ts.setSourceMapRange(clone, node);
                        ts.setCommentRange(clone, node);
                        return clone;
                    }
                }
            }
        }

        return undefined;
    }
}