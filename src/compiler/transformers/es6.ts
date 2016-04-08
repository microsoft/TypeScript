/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {

    const enum ES6SubstitutionFlags {
        /** Enables substitutions for captured `this` */
        CapturedThis = 1 << 0,
        /** Enables substitutions for block-scoped bindings. */
        BlockScopedBindings = 1 << 1,
    }
    /**
     * If loop contains block scoped binding captured in some function then loop body is converted to a function.
     * Lexical bindings declared in loop initializer will be passed into the loop body function as parameters,
     * however if this binding is modified inside the body - this new value should be propagated back to the original binding.
     * This is done by declaring new variable (out parameter holder) outside of the loop for every binding that is reassigned inside the body.
     * On every iteration this variable is initialized with value of corresponding binding.
     * At every point where control flow leaves the loop either explicitly (break/continue) or implicitly (at the end of loop body)
     * we copy the value inside the loop to the out parameter holder.
     *
     * for (let x;;) {
     *     let a = 1;
     *     let b = () => a;
     *     x++
     *     if (...) break;
     *     ...
     * }
     *
     * will be converted to
     *
     * var out_x;
     * var loop = function(x) {
     *     var a = 1;
     *     var b = function() { return a; }
     *     x++;
     *     if (...) return out_x = x, "break";
     *     ...
     *     out_x = x;
     * }
     * for (var x;;) {
     *     out_x = x;
     *     var state = loop(x);
     *     x = out_x;
     *     if (state === "break") break;
     * }
     *
     * NOTE: values to out parameters are not copies if loop is abrupted with 'return' - in this case this will end the entire enclosing function
     * so nobody can observe this new value.
     */
    interface LoopOutParameter {
        originalName: Identifier;
        outParamName: Identifier;
    }

    const enum CopyDirection {
        ToOriginal,
        ToOutParameter
    }

    const enum Jump {
        Break       = 1 << 1,
        Continue    = 1 << 2,
        Return      = 1 << 3
    }

    interface ConvertedLoopState {
        /*
         * set of labels that occurred inside the converted loop
         * used to determine if labeled jump can be emitted as is or it should be dispatched to calling code
         */
        labels?: Map<string>;
        /*
         * collection of labeled jumps that transfer control outside the converted loop.
         * maps store association 'label -> labelMarker' where
         * - label - value of label as it appear in code
         * - label marker - return value that should be interpreted by calling code as 'jump to <label>'
         */
        labeledNonLocalBreaks?: Map<string>;
        labeledNonLocalContinues?: Map<string>;

        /*
         * set of non-labeled jumps that transfer control outside the converted loop
         * used to emit dispatching logic in the caller of converted loop
         */
        nonLocalJumps?: Jump;

        /*
         * set of non-labeled jumps that should be interpreted as local
         * i.e. if converted loop contains normal loop or switch statement then inside this loop break should be treated as local jump
         */
        allowedNonLabeledJumps?: Jump;

        /*
         * alias for 'arguments' object from the calling code stack frame
         * i.e.
         * for (let x;;) <statement that captures x in closure and uses 'arguments'>
         * should be converted to
         * var loop = function(x) { <code where 'arguments' is replaced with 'arguments_1'> }
         * var arguments_1 = arguments
         * for (var x;;) loop(x);
         * otherwise semantics of the code will be different since 'arguments' inside converted loop body
         * will refer to function that holds converted loop.
         * This value is set on demand.
         */
        argumentsName?: Identifier;

        /*
         * alias for 'this' from the calling code stack frame in case if this was used inside the converted loop
         */
        thisName?: Identifier;

        /*
         * set to true if node contains lexical 'this' so we can mark function that wraps convered loop body as 'CapturedThis' for subsequent substitution.
         */
        containsLexicalThis?: boolean;

        /*
         * list of non-block scoped variable declarations that appear inside converted loop
         * such variable declarations should be moved outside the loop body
         * for (let x;;) {
         *     var y = 1;
         *     ...
         * }
         * should be converted to
         * var loop = function(x) {
         *    y = 1;
         *    ...
         * }
         * var y;
         * for (var x;;) loop(x);
         */
        hoistedLocalVariables?: Identifier[];

        /**
         * List of loop out parameters - detailed descripion can be found in the comment to LoopOutParameter
         */
        loopOutParameters?: LoopOutParameter[];
    }

    export function transformES6(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            getNodeEmitFlags,
            setNodeEmitFlags,
        } = context;

        const resolver = context.getEmitResolver();
        const previousIdentifierSubstitution = context.identifierSubstitution;
        const previousExpressionSubstitution = context.expressionSubstitution;
        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;
        context.identifierSubstitution = substituteIdentifier;
        context.expressionSubstitution = substituteExpression;

        let currentSourceFile: SourceFile;
        let currentParent: Node;
        let currentNode: Node;
        let enclosingBlockScopeContainer: Node;
        let enclosingBlockScopeContainerParent: Node;
        let containingNonArrowFunction: FunctionLikeDeclaration;

        /**
         * Used to track if we are emitting body of the converted loop
         */
        let convertedLoopState: ConvertedLoopState;

        /**
         * Keeps track of whether substitutions have been enabled for specific cases.
         * They are persisted between each SourceFile transformation and should not
         * be reset.
         */
        let enabledSubstitutions: ES6SubstitutionFlags;

        /**
         * This is used to determine whether we need to emit `_this` instead of `this`.
         */
        let useCapturedThis: boolean;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            currentSourceFile = node;
            return visitNode(node, visitor, isSourceFile);
        }

        function visitor(node: Node): VisitResult<Node> {
            return saveStateAndInvoke(node, dispatcher);
        }

        function dispatcher(node: Node): VisitResult<Node> {
            return convertedLoopState
                ? visitorForConvertedLoopWorker(node)
                : visitorWorker(node);
        }

        function saveStateAndInvoke<T>(node: Node, f: (node: Node) => T): T {
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            const savedCurrentParent = currentParent;
            const savedCurrentNode = currentNode;
            const savedEnclosingBlockScopeContainer = enclosingBlockScopeContainer;
            const savedEnclosingBlockScopeContainerParent = enclosingBlockScopeContainerParent;

            const savedConvertedLoopState = convertedLoopState;
            if (nodeStartsNewLexicalEnvironment(node)) {
                // don't treat content of nodes that start new lexical environment as part of converted loop copy
                convertedLoopState = undefined;
            }

            onBeforeVisitNode(node);
            const visited = f(node);

            convertedLoopState = savedConvertedLoopState;
            containingNonArrowFunction = savedContainingNonArrowFunction;
            currentParent = savedCurrentParent;
            currentNode = savedCurrentNode;
            enclosingBlockScopeContainer = savedEnclosingBlockScopeContainer;
            enclosingBlockScopeContainerParent = savedEnclosingBlockScopeContainerParent;
            return visited;
        }

        function shouldCheckNode(node: Node): boolean {
            return (node.transformFlags & TransformFlags.ES6) !== 0 ||
                node.kind === SyntaxKind.LabeledStatement ||
                (isIterationStatement(node, /*lookInLabeledStatements*/ false) && shouldConvertIterationStatementBody(node));
        }

        function visitorWorker(node: Node): VisitResult<Node> {
            if (shouldCheckNode(node)) {
                return visitJavaScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES6) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorForConvertedLoopWorker(node: Node): VisitResult<Node> {
            const savedUseCapturedThis = useCapturedThis;

            if (nodeStartsNewLexicalEnvironment(node)) {
                useCapturedThis = false;
            }

            let result: VisitResult<Node>;

            if (shouldCheckNode(node)) {
                result = visitJavaScript(node);
            }
            else {
                result = visitNodesInConvertedLoop(node);
            }

            useCapturedThis = savedUseCapturedThis;
            return result;
        }

        function visitNodesInConvertedLoop(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ReturnStatement:
                    return visitReturnStatement(<ReturnStatement>node);

                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.SwitchStatement:
                    return visitSwitchStatement(<SwitchStatement>node);

                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    return visitBreakOrContinueStatement(<BreakOrContinueStatement>node);

                case SyntaxKind.ThisKeyword:
                    return visitThisKeyword(node);

                case SyntaxKind.Identifier:
                    return visitIdentifier(<Identifier>node);

                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitJavaScript(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ExportKeyword:
                    return node;

                case SyntaxKind.ClassDeclaration:
                    return visitClassDeclaration(<ClassDeclaration>node);

                case SyntaxKind.ClassExpression:
                    return visitClassExpression(<ClassExpression>node);

                case SyntaxKind.Parameter:
                    return visitParameter(<ParameterDeclaration>node);

                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);

                case SyntaxKind.ArrowFunction:
                    return visitArrowFunction(<ArrowFunction>node);

                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(<FunctionExpression>node);

                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(<VariableDeclaration>node);

                case SyntaxKind.Identifier:
                    return visitIdentifier(<Identifier>node);

                case SyntaxKind.VariableDeclarationList:
                    return visitVariableDeclarationList(<VariableDeclarationList>node);

                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.DoStatement:
                    return visitDoStatement(<DoStatement>node);

                case SyntaxKind.WhileStatement:
                    return visitWhileStatement(<WhileStatement>node);

                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node);

                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node);

                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node);

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(<ObjectLiteralExpression>node);

                case SyntaxKind.ShorthandPropertyAssignment:
                    return visitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);

                case SyntaxKind.ArrayLiteralExpression:
                    return visitArrayLiteralExpression(<ArrayLiteralExpression>node);

                case SyntaxKind.CallExpression:
                    return visitCallExpression(<CallExpression>node);

                case SyntaxKind.NewExpression:
                    return visitNewExpression(<NewExpression>node);

                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(<ParenthesizedExpression>node, /*needsDestructuringValue*/ true);

                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node, /*needsDestructuringValue*/ true);

                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return visitTemplateLiteral(<LiteralExpression>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.SuperKeyword:
                    return visitSuperKeyword(<PrimaryExpression>node);

                case SyntaxKind.YieldExpression:
                    // `yield` will be handled by a generators transform.
                    return visitEachChild(node, visitor, context);

                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.SourceFile:
                    return visitSourceFileNode(<SourceFile>node);

                case SyntaxKind.VariableStatement:
                    return visitEachChild(node, visitor, context);

                default:
                    Debug.failBadSyntaxKind(node);
                    return visitEachChild(node, visitor, context);
            }

        }

        function onBeforeVisitNode(node: Node) {
            const currentGrandparent = currentParent;
            currentParent = currentNode;
            currentNode = node;

            if (currentParent) {
                if (isBlockScope(currentParent, currentGrandparent)) {
                    enclosingBlockScopeContainer = currentParent;
                    enclosingBlockScopeContainerParent = currentGrandparent;
                }

                switch (currentParent.kind) {
                    case SyntaxKind.Constructor:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                        containingNonArrowFunction = <FunctionLikeDeclaration>currentParent;
                        break;
                }
            }
        }

        function visitSwitchStatement(node: SwitchStatement): SwitchStatement {
            Debug.assert(convertedLoopState !== undefined);

            const savedAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
            // for switch statement allow only non-labeled break
            convertedLoopState.allowedNonLabeledJumps |= Jump.Break;

            const result = visitEachChild(node, visitor, context);

            convertedLoopState.allowedNonLabeledJumps = savedAllowedNonLabeledJumps;
            return result;
        }

        function visitReturnStatement(node: ReturnStatement): Statement {
            Debug.assert(convertedLoopState !== undefined);

            convertedLoopState.nonLocalJumps |= Jump.Return;
            return createReturn(
                createObjectLiteral(
                    [
                        createPropertyAssignment(
                            createIdentifier("value"),
                            node.expression
                                ? visitNode(node.expression, visitor, isExpression)
                                : createVoidZero()
                        )
                    ]
                )
            );
        }

        function visitThisKeyword(node: Node): Node {
            Debug.assert(convertedLoopState !== undefined);

            if (useCapturedThis) {
                // if useCapturedThis is true then 'this' keyword is contained inside an arrow function.
                convertedLoopState.containsLexicalThis = true;
                return node;
            }
            return convertedLoopState.thisName || (convertedLoopState.thisName = createUniqueName("this"));
        }

        function visitIdentifier(node: Identifier): Identifier {
            if (!convertedLoopState) {
                return node;
            }
            if (isGeneratedIdentifier(node)) {
                return node;
            }
            if (node.text !== "arguments" && !resolver.isArgumentsLocalBinding(node)) {
                return node;
            }
            return convertedLoopState.argumentsName || (convertedLoopState.argumentsName = createUniqueName("arguments"));
        }

        function visitBreakOrContinueStatement(node: BreakOrContinueStatement): Statement {
            if (convertedLoopState) {
                // check if we can emit break/continue as is
                // it is possible if either
                //   - break/continue is labeled and label is located inside the converted loop
                //   - break/continue is non-labeled and located in non-converted loop/switch statement
                const jump = node.kind === SyntaxKind.BreakStatement ? Jump.Break : Jump.Continue;
                const canUseBreakOrContinue =
                    (node.label && convertedLoopState.labels && convertedLoopState.labels[node.label.text]) ||
                    (!node.label && (convertedLoopState.allowedNonLabeledJumps & jump));

                if (!canUseBreakOrContinue) {
                    let labelMarker: string;
                    if (!node.label) {
                        if (node.kind === SyntaxKind.BreakStatement) {
                            convertedLoopState.nonLocalJumps |= Jump.Break;
                            labelMarker = "break";
                        }
                        else {
                            convertedLoopState.nonLocalJumps |= Jump.Continue;
                            // note: return value is emitted only to simplify debugging, call to converted loop body does not do any dispatching on it.
                            labelMarker = "continue";
                        }
                    }
                    else {
                        if (node.kind === SyntaxKind.BreakStatement) {
                            labelMarker = `break-${node.label.text}`;
                            setLabeledJump(convertedLoopState, /*isBreak*/ true, node.label.text, labelMarker);
                        }
                        else {
                            labelMarker = `continue-${node.label.text}`;
                            setLabeledJump(convertedLoopState, /*isBreak*/ false, node.label.text, labelMarker);
                        }
                    }
                    let returnExpression: Expression = createLiteral(labelMarker);
                    if (convertedLoopState.loopOutParameters.length) {
                        const outParams = convertedLoopState.loopOutParameters;
                        let expr: Expression;
                        for (let i = 0; i < outParams.length; i++) {
                            const copyExpr = copyOutParameter(outParams[i], CopyDirection.ToOutParameter);
                            if (i === 0) {
                                expr = copyExpr;
                            }
                            else {
                                expr = createBinary(expr, SyntaxKind.CommaToken, copyExpr);
                            }
                        }
                        returnExpression = createBinary(expr, SyntaxKind.CommaToken, returnExpression);
                    }
                    return createReturn(returnExpression);
                }
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a ClassDeclaration and transforms it into a variable statement.
         *
         * @param node A ClassDeclaration node.
         */
        function visitClassDeclaration(node: ClassDeclaration): Statement {
            // [source]
            //      class C { }
            //
            // [output]
            //      var C = (function () {
            //          function C() {
            //          }
            //          return C;
            //      }());

            return startOnNewLine(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            getDeclarationName(node, /*allowComments*/ true),
                            transformClassLikeDeclarationToExpression(node)
                        )
                    ]),
                    node
                )
            );
        }

        /**
         * Visits a ClassExpression and transforms it into an expression.
         *
         * @param node A ClassExpression node.
         */
        function visitClassExpression(node: ClassExpression): Expression {
            // [source]
            //      C = class { }
            //
            // [output]
            //      C = (function () {
            //          function class_1() {
            //          }
            //          return class_1;
            //      }())

            return transformClassLikeDeclarationToExpression(node);
        }

        /**
         * Transforms a ClassExpression or ClassDeclaration into an expression.
         *
         * @param node A ClassExpression or ClassDeclaration node.
         */
        function transformClassLikeDeclarationToExpression(node: ClassExpression | ClassDeclaration): Expression {
            // [source]
            //      class C extends D {
            //          constructor() {}
            //          method() {}
            //          get prop() {}
            //          set prop(v) {}
            //      }
            //
            // [output]
            //      (function (_super) {
            //          __extends(C, _super);
            //          function C() {
            //          }
            //          C.prototype.method = function () {}
            //          Object.defineProperty(C.prototype, "prop", {
            //              get: function() {},
            //              set: function() {},
            //              enumerable: true,
            //              configurable: true
            //          });
            //          return C;
            //      }(D))

            if (node.name) {
                enableSubstitutionsForBlockScopedBindings();
            }
            const baseTypeNode = getClassExtendsHeritageClauseElement(node);
            const classFunction = createFunctionExpression(
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                baseTypeNode ? [createParameter("_super")] : [],
                transformClassBody(node, baseTypeNode !== undefined)
            );

            // To preserve the behavior of the old emitter, we explicitly indent
            // the body of the function here if it was requested in an earlier
            // transformation.
            if (getNodeEmitFlags(node) & NodeEmitFlags.Indented) {
                setNodeEmitFlags(classFunction, NodeEmitFlags.Indented);
            }

            return createParen(
                createCall(
                    classFunction,
                    baseTypeNode
                        ? [visitNode(baseTypeNode.expression, visitor, isExpression)]
                        : []
                )
            );
        }

        /**
         * Transforms a ClassExpression or ClassDeclaration into a function body.
         *
         * @param node A ClassExpression or ClassDeclaration node.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         */
        function transformClassBody(node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): Block {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addExtendsHelperIfNeeded(statements, node, hasExtendsClause);
            addConstructor(statements, node, hasExtendsClause);
            addClassMembers(statements, node);
            statements.push(createReturn(getDeclarationName(node)));
            addRange(statements, endLexicalEnvironment());
            return createBlock(statements, /*location*/ undefined, /*multiLine*/ true);
        }

        /**
         * Adds a call to the `__extends` helper if needed for a class.
         *
         * @param statements The statements of the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         */
        function addExtendsHelperIfNeeded(statements: Statement[], node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): void {
            if (hasExtendsClause) {
                statements.push(
                    createStatement(
                        createExtendsHelper(getDeclarationName(node))
                    )
                );
            }
        }

        /**
         * Adds the constructor of the class to a class body function.
         *
         * @param statements The statements of the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         */
        function addConstructor(statements: Statement[], node: ClassExpression | ClassDeclaration, hasExtendsClause: boolean): void {
            const constructor = getFirstConstructorWithBody(node);
            const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, hasExtendsClause);
            statements.push(
                createFunctionDeclaration(
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    getDeclarationName(node),
                    transformConstructorParameters(constructor, hasSynthesizedSuper),
                    transformConstructorBody(constructor, hasExtendsClause, hasSynthesizedSuper),
                    /*location*/ constructor
                )
            );
        }

        /**
         * Transforms the parameters of the constructor declaration of a class.
         *
         * @param constructor The constructor for the class.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorParameters(constructor: ConstructorDeclaration, hasSynthesizedSuper: boolean): ParameterDeclaration[] {
            // If the TypeScript transformer needed to synthesize a constructor for property
            // initializers, it would have also added a synthetic `...args` parameter and
            // `super` call.
            // If this is the case, we do not include the synthetic `...args` parameter and
            // will instead use the `arguments` object in ES5/3.
            if (constructor && !hasSynthesizedSuper) {
                return visitNodes(constructor.parameters, visitor, isParameter);
            }

            return [];
        }

        /**
         * Transforms the body of a constructor declaration of a class.
         *
         * @param constructor The constructor for the class.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorBody(constructor: ConstructorDeclaration, hasExtendsClause: boolean, hasSynthesizedSuper: boolean) {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            if (constructor) {
                addCaptureThisForNodeIfNeeded(statements, constructor);
                addDefaultValueAssignmentsIfNeeded(statements, constructor);
                addRestParameterIfNeeded(statements, constructor, hasSynthesizedSuper);
            }

            addDefaultSuperCallIfNeeded(statements, constructor, hasExtendsClause, hasSynthesizedSuper);

            if (constructor) {
                const body = saveStateAndInvoke(constructor, hasSynthesizedSuper ? transformConstructorBodyWithSynthesizedSuper : transformConstructorBodyWithoutSynthesizedSuper);
                addRange(statements, body);
            }

            addRange(statements, endLexicalEnvironment());
            return createBlock(
                createNodeArray(
                    statements,
                    /*location*/ constructor ? constructor.body.statements : undefined
                ),
                /*location*/ constructor ? constructor.body : undefined,
                /*multiLine*/ true
            );
        }

        function transformConstructorBodyWithSynthesizedSuper(node: ConstructorDeclaration) {
            return visitNodes(node.body.statements, visitor, isStatement, 1);
        }

        function transformConstructorBodyWithoutSynthesizedSuper(node: ConstructorDeclaration) {
            return visitNodes(node.body.statements, visitor, isStatement, 0);
        }

        /**
         * Adds a synthesized call to `_super` if it is needed.
         *
         * @param statements The statements for the new constructor body.
         * @param constructor The constructor for the class.
         * @param hasExtendsClause A value indicating whether the class has an `extends` clause.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function addDefaultSuperCallIfNeeded(statements: Statement[], constructor: ConstructorDeclaration, hasExtendsClause: boolean, hasSynthesizedSuper: boolean) {
            // If the TypeScript transformer needed to synthesize a constructor for property
            // initializers, it would have also added a synthetic `...args` parameter and
            // `super` call.
            // If this is the case, or if the class has an `extends` clause but no
            // constructor, we emit a synthesized call to `_super`.
            if (constructor ? hasSynthesizedSuper : hasExtendsClause) {
                statements.push(
                    createStatement(
                        createFunctionApply(
                            createIdentifier("_super"),
                            createThis(),
                            createIdentifier("arguments")
                        )
                    )
                );
            }
        }

        /**
         * Visits a parameter declaration.
         *
         * @param node A ParameterDeclaration node.
         */
        function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
            if (node.dotDotDotToken) {
                // rest parameters are elided
                return undefined;
            }
            else if (isBindingPattern(node.name)) {
                // Binding patterns are converted into a generated name and are
                // evaluated inside the function body.
                return createParameter(
                    getGeneratedNameForNode(node),
                    /*initializer*/ undefined,
                    /*location*/ node
                );
            }
            else if (node.initializer) {
                // Initializers are elided
                return createParameter(
                    node.name,
                    /*initializer*/ undefined,
                    /*location*/ node
                );
            }
            else {
                return node;
            }
        }

        /**
         * Gets a value indicating whether we need to add default value assignments for a
         * function-like node.
         *
         * @param node A function-like node.
         */
        function shouldAddDefaultValueAssignments(node: FunctionLikeDeclaration): boolean {
            return (node.transformFlags & TransformFlags.ContainsDefaultValueAssignments) !== 0;
        }

        /**
         * Adds statements to the body of a function-like node if it contains parameters with
         * binding patterns or initializers.
         *
         * @param statements The statements for the new function body.
         * @param node A function-like node.
         */
        function addDefaultValueAssignmentsIfNeeded(statements: Statement[], node: FunctionLikeDeclaration): void {
            if (!shouldAddDefaultValueAssignments(node)) {
                return;
            }

            for (const parameter of node.parameters) {
                const { name, initializer, dotDotDotToken } = parameter;

                // A rest parameter cannot have a binding pattern or an initializer,
                // so let's just ignore it.
                if (dotDotDotToken) {
                    continue;
                }

                if (isBindingPattern(name)) {
                    addDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer);
                }
                else if (initializer) {
                    addDefaultValueAssignmentForInitializer(statements, parameter, name, initializer);
                }
            }
        }

        /**
         * Adds statements to the body of a function-like node for parameters with binding patterns
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         * @param name The name of the parameter.
         * @param initializer The initializer for the parameter.
         */
        function addDefaultValueAssignmentForBindingPattern(statements: Statement[], parameter: ParameterDeclaration, name: BindingPattern, initializer: Expression): void {
            const temp = getGeneratedNameForNode(parameter);

            // In cases where a binding pattern is simply '[]' or '{}',
            // we usually don't want to emit a var declaration; however, in the presence
            // of an initializer, we must emit that expression to preserve side effects.
            if (name.elements.length > 0) {
                statements.push(
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(
                            flattenParameterDestructuring(context, parameter, temp, visitor)
                        )
                    )
                );
            }
            else if (initializer) {
                statements.push(
                    createStatement(
                        createAssignment(
                            temp,
                            visitNode(initializer, visitor, isExpression)
                        )
                    )
                );
            }
        }

        /**
         * Adds statements to the body of a function-like node for parameters with initializers.
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         * @param name The name of the parameter.
         * @param initializer The initializer for the parameter.
         */
        function addDefaultValueAssignmentForInitializer(statements: Statement[], parameter: ParameterDeclaration, name: Identifier, initializer: Expression): void {
            statements.push(
                createIf(
                    createStrictEquality(
                        getSynthesizedClone(name),
                        createVoidZero()
                    ),
                    setNodeEmitFlags(
                        createBlock([
                            createStatement(
                                createAssignment(
                                    getSynthesizedClone(name),
                                    visitNode(initializer, visitor, isExpression)
                                )
                            )
                        ]),
                        NodeEmitFlags.SingleLine
                    ),
                    /*elseStatement*/ undefined,
                    /*location*/ undefined,
                    { startOnNewLine: true }
                )
            );
        }

        /**
         * Gets a value indicating whether we need to add statements to handle a rest parameter.
         *
         * @param node A ParameterDeclaration node.
         * @param inConstructorWithSynthesizedSuper A value indicating whether the parameter is
         *                                          part of a constructor declaration with a
         *                                          synthesized call to `super`
         */
        function shouldAddRestParameter(node: ParameterDeclaration, inConstructorWithSynthesizedSuper: boolean) {
            return node && node.dotDotDotToken && !inConstructorWithSynthesizedSuper;
        }

        /**
         * Adds statements to the body of a function-like node if it contains a rest parameter.
         *
         * @param statements The statements for the new function body.
         * @param node A function-like node.
         * @param inConstructorWithSynthesizedSuper A value indicating whether the parameter is
         *                                          part of a constructor declaration with a
         *                                          synthesized call to `super`
         */
        function addRestParameterIfNeeded(statements: Statement[], node: FunctionLikeDeclaration, inConstructorWithSynthesizedSuper: boolean): void {
            const parameter = lastOrUndefined(node.parameters);
            if (!shouldAddRestParameter(parameter, inConstructorWithSynthesizedSuper)) {
                return;
            }

            const name = getSynthesizedClone(<Identifier>parameter.name);
            const restIndex = node.parameters.length - 1;
            const temp = createLoopVariable();

            // var param = [];
            statements.push(
                createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            name,
                            createArrayLiteral([])
                        )
                    ])
                )
            );

            // for (var _i = restIndex; _i < arguments.length; _i++) {
            //   param[_i - restIndex] = arguments[_i];
            // }
            statements.push(
                createFor(
                    createVariableDeclarationList([
                        createVariableDeclaration(temp, createLiteral(restIndex))
                    ]),
                    createLessThan(
                        temp,
                        createPropertyAccess(createIdentifier("arguments"), "length")
                    ),
                    createPostfixIncrement(temp),
                    createBlock([
                        startOnNewLine(
                            createStatement(
                                createAssignment(
                                    createElementAccess(
                                        name,
                                        createSubtract(temp, createLiteral(restIndex))
                                    ),
                                    createElementAccess(createIdentifier("arguments"), temp)
                                )
                            )
                        )
                    ])
                )
            );
        }

        /**
         * Adds a statement to capture the `this` of a function declaration if it is needed.
         *
         * @param statements The statements for the new function body.
         * @param node A node.
         */
        function addCaptureThisForNodeIfNeeded(statements: Statement[], node: Node): void {
            if (node.transformFlags & TransformFlags.ContainsCapturedLexicalThis && node.kind !== SyntaxKind.ArrowFunction) {
                enableSubstitutionsForCapturedThis();
                statements.push(
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList([
                            createVariableDeclaration(
                                "_this",
                                createThis()
                            )
                        ])
                    )
                );
            }
        }

        /**
         * Adds statements to the class body function for a class to define the members of the
         * class.
         *
         * @param statements The statements for the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         */
        function addClassMembers(statements: Statement[], node: ClassExpression | ClassDeclaration): void {
            for (const member of node.members) {
                switch (member.kind) {
                    case SyntaxKind.SemicolonClassElement:
                        statements.push(transformSemicolonClassElementToStatement(<SemicolonClassElement>member));
                        break;

                    case SyntaxKind.MethodDeclaration:
                        statements.push(transformClassMethodDeclarationToStatement(getClassMemberPrefix(node, member), <MethodDeclaration>member));
                        break;

                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
                        if (member === accessors.firstAccessor) {
                            statements.push(transformAccessorsToStatement(getClassMemberPrefix(node, member), accessors));
                        }

                        break;

                    case SyntaxKind.Constructor:
                        // Constructors are handled in visitClassExpression/visitClassDeclaration
                        break;

                    default:
                        Debug.failBadSyntaxKind(node);
                        break;
                }
            }
        }

        /**
         * Transforms a SemicolonClassElement into a statement for a class body function.
         *
         * @param member The SemicolonClassElement node.
         */
        function transformSemicolonClassElementToStatement(member: SemicolonClassElement) {
            return createEmptyStatement(/*location*/ member);
        }

        /**
         * Transforms a MethodDeclaration into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param member The MethodDeclaration node.
         */
        function transformClassMethodDeclarationToStatement(receiver: LeftHandSideExpression, member: MethodDeclaration) {
            return createStatement(
                createAssignment(
                    createMemberAccessForPropertyName(
                        receiver,
                        visitNode(member.name, visitor, isPropertyName)
                    ),
                    transformFunctionLikeToExpression(member, /*location*/ undefined, /*name*/ undefined)
                ),
                /*location*/ member
            );
        }

        /**
         * Transforms a set of related of get/set accessors into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param accessors The set of related get/set accessors.
         */
        function transformAccessorsToStatement(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations): Statement {
            return createStatement(
                transformAccessorsToExpression(receiver, accessors)
            );
        }

        /**
         * Transforms a set of related get/set accessors into an expression for either a class
         * body function or an ObjectLiteralExpression with computed properties.
         *
         * @param receiver The receiver for the member.
         */
        function transformAccessorsToExpression(receiver: LeftHandSideExpression, { firstAccessor, getAccessor, setAccessor }: AllAccessorDeclarations): Expression {
            return setNodeEmitFlags(
                createObjectDefineProperty(
                    receiver,
                    createExpressionForPropertyName(
                        visitNode(firstAccessor.name, visitor, isPropertyName),
                        /*location*/ firstAccessor.name
                    ),
                    /*descriptor*/ {
                        get: getAccessor && transformFunctionLikeToExpression(getAccessor, /*location*/ getAccessor, /*name*/ undefined),
                        set: setAccessor && transformFunctionLikeToExpression(setAccessor, /*location*/ setAccessor, /*name*/ undefined),
                        enumerable: true,
                        configurable: true
                    },
                    /*preferNewLine*/ true,
                    /*location*/ firstAccessor,
                    /*descriptorLocations*/ {
                        get: getAccessor,
                        set: setAccessor
                    }
                ),
                NodeEmitFlags.NoComments
            );
        }

        /**
         * Visits an ArrowFunction and transforms it into a FunctionExpression.
         *
         * @param node An ArrowFunction node.
         */
        function visitArrowFunction(node: ArrowFunction) {
            if (node.transformFlags & TransformFlags.ContainsLexicalThis) {
                enableSubstitutionsForCapturedThis();
            }

            const savedUseCapturedThis = useCapturedThis;
            useCapturedThis = true;

            const func = transformFunctionLikeToExpression(node, /*location*/ node, /*name*/ undefined);

            useCapturedThis = savedUseCapturedThis;
            setNodeEmitFlags(func, NodeEmitFlags.CapturesThis);
            return func;
        }

        /**
         * Visits a FunctionExpression node.
         *
         * @param node a FunctionExpression node.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            return transformFunctionLikeToExpression(node, /*location*/ node, node.name);
        }

        /**
         * Visits a FunctionDeclaration node.
         *
         * @param node a FunctionDeclaration node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            return createFunctionDeclaration(
                /*modifiers*/ undefined,
                node.asteriskToken,
                node.name,
                visitNodes(node.parameters, visitor, isParameter),
                transformFunctionBody(node),
                /*location*/ node,
                /*original*/ node
            );
        }

        /**
         * Transforms a function-like node into a FunctionExpression.
         *
         * @param node The function-like node to transform.
         * @param location The source-map location for the new FunctionExpression.
         * @param name The name of the new FunctionExpression.
         */
        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location: TextRange, name: Identifier): FunctionExpression {
            const savedContainingNonArrowFunction = containingNonArrowFunction;
            if (node.kind !== SyntaxKind.ArrowFunction) {
                containingNonArrowFunction = node;
            }

            const expression = createFunctionExpression(
                node.asteriskToken,
                name,
                visitNodes(node.parameters, visitor, isParameter),
                saveStateAndInvoke(node, transformFunctionBody),
                location,
                /*original*/ node
            );

            containingNonArrowFunction = savedContainingNonArrowFunction;
            return expression;
        }

        /**
         * Transforms the body of a function-like node.
         *
         * @param node A function-like node.
         */
        function transformFunctionBody(node: FunctionLikeDeclaration) {
            let multiLine = false; // indicates whether the block *must* be emitted as multiple lines
            let singleLine = false; // indicates whether the block *may* be emitted as a single line
            let statementsLocation: TextRange;

            const statements: Statement[] = [];
            startLexicalEnvironment();
            addCaptureThisForNodeIfNeeded(statements, node);
            addDefaultValueAssignmentsIfNeeded(statements, node);
            addRestParameterIfNeeded(statements, node, /*inConstructorWithSynthesizedSuper*/ false);

            // If we added any generated statements, this must be a multi-line block.
            if (!multiLine && statements.length > 0) {
                multiLine = true;
            }

            const body = node.body;
            if (isBlock(body)) {
                statementsLocation = body.statements;
                addRange(statements, visitNodes(body.statements, visitor, isStatement));

                // If the original body was a multi-line block, this must be a multi-line block.
                if (!multiLine && body.multiLine) {
                    multiLine = true;
                }
            }
            else {
                Debug.assert(node.kind === SyntaxKind.ArrowFunction);
                statementsLocation = body;

                const equalsGreaterThanToken = (<ArrowFunction>node).equalsGreaterThanToken;
                if (!nodeIsSynthesized(equalsGreaterThanToken) && !nodeIsSynthesized(body)) {
                    if (rangeEndIsOnSameLineAsRangeStart(equalsGreaterThanToken, body, currentSourceFile)) {
                        singleLine = true;
                    }
                    else {
                        multiLine = true;
                    }
                }

                const expression = visitNode(body, visitor, isExpression);
                if (expression) {
                    statements.push(createReturn(expression));
                }
            }

            const lexicalEnvironment = endLexicalEnvironment();
            addRange(statements, lexicalEnvironment);

            // If we added any final generated statements, this must be a multi-line block
            if (!multiLine && lexicalEnvironment && lexicalEnvironment.length) {
                multiLine = true;
            }

            const block = createBlock(createNodeArray(statements, statementsLocation), node.body, multiLine);
            if (!multiLine && singleLine) {
                setNodeEmitFlags(block, NodeEmitFlags.SingleLine);
            }

            return block;
        }

        /**
         * Visits an ExpressionStatement that contains a destructuring assignment.
         *
         * @param node An ExpressionStatement node.
         */
        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            // If we are here it is most likely because our expression is a destructuring assignment.
            switch (node.expression.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return createStatement(
                        visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false),
                        /*location*/ node
                    );

                case SyntaxKind.BinaryExpression:
                    return createStatement(
                        visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false),
                        /*location*/ node
                    );
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a ParenthesizedExpression that may contain a destructuring assignment.
         *
         * @param node A ParenthesizedExpression node.
         * @param needsDestructuringValue A value indicating whether we need to hold onto the rhs
         *                                of a destructuring assignment.
         */
        function visitParenthesizedExpression(node: ParenthesizedExpression, needsDestructuringValue: boolean): ParenthesizedExpression {
            // If we are here it is most likely because our expression is a destructuring assignment.
            if (needsDestructuringValue) {
                switch (node.expression.kind) {
                    case SyntaxKind.ParenthesizedExpression:
                        return createParen(
                            visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ true),
                            /*location*/ node
                        );

                    case SyntaxKind.BinaryExpression:
                        return createParen(
                            visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ true),
                            /*location*/ node
                        );
                }
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         * @param needsDestructuringValue A value indicating whether we need to hold onto the rhs
         *                                of a destructuring assignment.
         */
        function visitBinaryExpression(node: BinaryExpression, needsDestructuringValue: boolean): Expression {
            // If we are here it is because this is a destructuring assignment.
            Debug.assert(isDestructuringAssignment(node));
            return flattenDestructuringAssignment(context, node, needsDestructuringValue, hoistVariableDeclaration, visitor);
        }

        function visitVariableStatement(node: VariableStatement): Statement {
            if (convertedLoopState && (getCombinedNodeFlags(node.declarationList) & NodeFlags.BlockScoped) == 0) {
                // we are inside a converted loop - hoist variable declarations
                let assignments: Expression[];
                for (const decl of node.declarationList.declarations) {
                    hoistVariableDeclarationDeclaredInConvertedLoop(convertedLoopState, decl);
                    if (decl.initializer) {
                        let assignment: Expression;
                        if (isBindingPattern(decl.name)) {
                            assignment = flattenVariableDestructuringToExpression(context, decl, hoistVariableDeclaration, /*nameSubstitution*/ undefined, visitor);
                        }
                        else {
                            assignment = createBinary(<Identifier>decl.name, SyntaxKind.EqualsToken, decl.initializer);
                        }
                        (assignments || (assignments = [])).push(assignment);
                    }
                }
                if (assignments) {
                    return createStatement(reduceLeft(assignments, (acc, v) => createBinary(v, SyntaxKind.CommaToken, acc)));
                }
                else {
                    // none of declarations has initializer - the entire variable statement can be deleted
                    return undefined;
                }
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclarationList that is block scoped (e.g. `let` or `const`).
         *
         * @param node A VariableDeclarationList node.
         */
        function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            // If we are here it is because the list is defined as `let` or `const`.
            Debug.assert((node.flags & NodeFlags.BlockScoped) !== 0);

            enableSubstitutionsForBlockScopedBindings();
            return setOriginalNode(
                createVariableDeclarationList(
                    flatten(map(node.declarations, visitVariableDeclarationInLetDeclarationList)),
                    /*location*/ node
                ),
                node
            );
        }

        /**
         * Gets a value indicating whether we should emit an explicit initializer for a variable
         * declaration in a `let` declaration list.
         *
         * @param node A VariableDeclaration node.
         */
        function shouldEmitExplicitInitializerForLetDeclaration(node: VariableDeclaration) {
            // Nested let bindings might need to be initialized explicitly to preserve
            // ES6 semantic:
            //
            //  { let x = 1; }
            //  { let x; } // x here should be undefined. not 1
            //
            // Top level bindings never collide with anything and thus don't require
            // explicit initialization. As for nested let bindings there are two cases:
            //
            // - Nested let bindings that were not renamed definitely should be
            //   initialized explicitly:
            //
            //    { let x = 1; }
            //    { let x; if (some-condition) { x = 1}; if (x) { /*1*/ } }
            //
            //   Without explicit initialization code in /*1*/ can be executed even if
            //   some-condition is evaluated to false.
            //
            // - Renaming introduces fresh name that should not collide with any
            //   existing names, however renamed bindings sometimes also should be
            //   explicitly initialized. One particular case: non-captured binding
            //   declared inside loop body (but not in loop initializer):
            //
            //    let x;
            //    for (;;) {
            //        let x;
            //    }
            //
            //   In downlevel codegen inner 'x' will be renamed so it won't collide
            //   with outer 'x' however it will should be reset on every iteration as
            //   if it was declared anew.
            //
            //   * Why non-captured binding?
            //     - Because if loop contains block scoped binding captured in some
            //       function then loop body will be rewritten to have a fresh scope
            //       on every iteration so everything will just work.
            //
            //   * Why loop initializer is excluded?
            //     - Since we've introduced a fresh name it already will be undefined.

            const flags = resolver.getNodeCheckFlags(node);
            const isCapturedInFunction = flags & NodeCheckFlags.CapturedBlockScopedBinding;
            const isDeclaredInLoop = flags & NodeCheckFlags.BlockScopedBindingInLoop;
            const emittedAsTopLevel =
                isBlockScopedContainerTopLevel(enclosingBlockScopeContainer)
                || (isCapturedInFunction
                    && isDeclaredInLoop
                    && isBlock(enclosingBlockScopeContainer)
                    && isIterationStatement(enclosingBlockScopeContainerParent, /*lookInLabeledStatements*/ false));

            const emitExplicitInitializer =
                !emittedAsTopLevel
                && enclosingBlockScopeContainer.kind !== SyntaxKind.ForInStatement
                && enclosingBlockScopeContainer.kind !== SyntaxKind.ForOfStatement
                && (!resolver.isDeclarationWithCollidingName(node)
                    || (isDeclaredInLoop
                        && !isCapturedInFunction
                        && !isIterationStatement(enclosingBlockScopeContainer, /*lookInLabeledStatements*/ false)));

            return emitExplicitInitializer;
        }

        /**
         * Visits a VariableDeclaration in a `let` declaration list.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclarationInLetDeclarationList(node: VariableDeclaration) {
            // For binding pattern names that lack initializers there is no point to emit
            // explicit initializer since downlevel codegen for destructuring will fail
            // in the absence of initializer so all binding elements will say uninitialized
            const name = node.name;
            if (isBindingPattern(name)) {
                return visitVariableDeclaration(node);
            }

            if (!node.initializer && shouldEmitExplicitInitializerForLetDeclaration(node)) {
                const clone = getMutableClone(node);
                clone.initializer = createVoidZero();
                return clone;
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern.
            Debug.assert(isBindingPattern(node.name));

            return flattenVariableDestructuring(context, node, /*value*/ undefined, visitor);
        }

        function visitLabeledStatement(node: LabeledStatement): VisitResult<Statement> {
            if (convertedLoopState) {
                if (!convertedLoopState.labels) {
                    convertedLoopState.labels = {};
                }
                convertedLoopState.labels[node.label.text] = node.label.text;
            }

            let result: VisitResult<Statement>;
            if (isIterationStatement(node.statement, /*lookInLabeledStatements*/ false) && shouldConvertIterationStatementBody(<IterationStatement>node.statement)) {
                result = visitNodes(createNodeArray([node.statement]), visitor, isStatement);
            }
            else {
                result = visitEachChild(node, visitor, context);
            }

            if (convertedLoopState) {
                convertedLoopState.labels[node.label.text] = undefined;
            }

            return result;
        }

        function visitDoStatement(node: DoStatement) {
            return convertIterationStatementBodyIfNecessary(node);
        }

        function visitWhileStatement(node: WhileStatement) {
            return convertIterationStatementBodyIfNecessary(node);
        }

        function visitForStatement(node: ForStatement) {
            return convertIterationStatementBodyIfNecessary(node);
        }

        function visitForInStatement(node: ForInStatement) {
            return convertIterationStatementBodyIfNecessary(node);
        }

        /**
         * Visits a ForOfStatement and converts it into a compatible ForStatement.
         *
         * @param node A ForOfStatement.
         */
        function visitForOfStatement(node: ForOfStatement): VisitResult<Statement> {
            return convertIterationStatementBodyIfNecessary(node, convertForOfToFor);
        }

        function convertForOfToFor(node: ForOfStatement, convertedLoopBodyStatements: Statement[]): ForStatement {
            // The following ES6 code:
            //
            //    for (let v of expr) { }
            //
            // should be emitted as
            //
            //    for (var _i = 0, _a = expr; _i < _a.length; _i++) {
            //        var v = _a[_i];
            //    }
            //
            // where _a and _i are temps emitted to capture the RHS and the counter,
            // respectively.
            // When the left hand side is an expression instead of a let declaration,
            // the "let v" is not emitted.
            // When the left hand side is a let/const, the v is renamed if there is
            // another v in scope.
            // Note that all assignments to the LHS are emitted in the body, including
            // all destructuring.
            // Note also that because an extra statement is needed to assign to the LHS,
            // for-of bodies are always emitted as blocks.

            const expression = node.expression;
            const initializer = node.initializer;
            const statements: Statement[] = [];

            // In the case where the user wrote an identifier as the RHS, like this:
            //
            //     for (let v of arr) { }
            //
            // we don't want to emit a temporary variable for the RHS, just use it directly.
            const counter = createLoopVariable();
            const rhsReference = expression.kind === SyntaxKind.Identifier
                ? createUniqueName((<Identifier>expression).text)
                : createTempVariable(/*recordTempVariable*/ undefined);

            // Initialize LHS
            // var v = _a[_i];
            if (isVariableDeclarationList(initializer)) {
                const firstDeclaration = firstOrUndefined(initializer.declarations);
                if (initializer.flags & NodeFlags.BlockScoped) {
                    enableSubstitutionsForBlockScopedBindings();
                }
                if (firstDeclaration && isBindingPattern(firstDeclaration.name)) {
                    // This works whether the declaration is a var, let, or const.
                    // It will use rhsIterationValue _a[_i] as the initializer.
                    statements.push(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                flattenVariableDestructuring(
                                    context,
                                    firstDeclaration,
                                    createElementAccess(rhsReference, counter),
                                    visitor
                                )
                            ),
                            /*location*/ initializer
                        )
                    );
                }
                else {
                    // The following call does not include the initializer, so we have
                    // to emit it separately.
                    statements.push(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList([
                                createVariableDeclaration(
                                    firstDeclaration ? firstDeclaration.name : createTempVariable(/*recordTempVariable*/ undefined),
                                    createElementAccess(rhsReference, counter)
                                )
                            ]),
                            /*location*/ initializer
                        )
                    );
                }
            }
            else {
                // Initializer is an expression. Emit the expression in the body, so that it's
                // evaluated on every iteration.
                const assignment = createAssignment(initializer, createElementAccess(rhsReference, counter));
                if (isDestructuringAssignment(assignment)) {
                    // This is a destructuring pattern, so we flatten the destructuring instead.
                    statements.push(
                        createStatement(
                            flattenDestructuringAssignment(
                                context,
                                assignment,
                                /*needsValue*/ false,
                                hoistVariableDeclaration,
                                visitor
                            )
                        )
                    );
                }
                else {
                    statements.push(createStatement(assignment, /*location*/ node.initializer));
                }
            }

            if (convertedLoopBodyStatements) {
                addRange(statements, convertedLoopBodyStatements);
            }
            else {
                const statement = visitNode(node.statement, visitor, isStatement);
                if (isBlock(statement)) {
                    addRange(statements, (<Block>statement).statements);
                }
                else {
                    statements.push(statement);
                }
            }

            return createFor(
                createVariableDeclarationList(
                    [
                        createVariableDeclaration(counter, createLiteral(0), /*location*/ node.expression),
                        createVariableDeclaration(rhsReference, expression, /*location*/ node.expression)
                    ],
                    /*location*/ node.expression
                ),
                createLessThan(
                    counter,
                    createPropertyAccess(rhsReference, "length"),
                    /*location*/ initializer
                ),
                createPostfixIncrement(counter, /*location*/ initializer),
                createBlock(
                    statements
                ),
                /*location*/ node
            );
        }

        /**
         * Visits an ObjectLiteralExpression with computed propety names.
         *
         * @param node An ObjectLiteralExpression node.
         */
        function visitObjectLiteralExpression(node: ObjectLiteralExpression): LeftHandSideExpression {
            // We are here because a ComputedPropertyName was used somewhere in the expression.
            const properties = node.properties;
            const numProperties = properties.length;

            // Find the first computed property.
            // Everything until that point can be emitted as part of the initial object literal.
            let numInitialNonComputedProperties = numProperties;
            for (let i = 0, n = properties.length; i < n; i++) {
                if (properties[i].name.kind === SyntaxKind.ComputedPropertyName) {
                    numInitialNonComputedProperties = i;
                    break;
                }
            }

            Debug.assert(numInitialNonComputedProperties !== numProperties);

            // For computed properties, we need to create a unique handle to the object
            // literal so we can modify it without risking internal assignments tainting the object.
            const temp = createTempVariable(hoistVariableDeclaration);

            // Write out the first non-computed properties, then emit the rest through indexing on the temp variable.
            const expressions: Expression[] = [];
            addNode(expressions,
                createAssignment(
                    temp,
                    setNodeEmitFlags(
                        createObjectLiteral(
                            visitNodes(properties, visitor, isObjectLiteralElement, 0, numInitialNonComputedProperties),
                            /*location*/ undefined,
                            node.multiLine
                        ),
                        NodeEmitFlags.Indented
                    )
                ),
                node.multiLine
            );

            addObjectLiteralMembers(expressions, node, temp, numInitialNonComputedProperties);

            // We need to clone the temporary identifier so that we can write it on a
            // new line
            addNode(expressions, getMutableClone(temp), node.multiLine);
            return createParen(inlineExpressions(expressions));
        }

        function shouldConvertIterationStatementBody(node: IterationStatement): boolean {
            return (resolver.getNodeCheckFlags(node) & NodeCheckFlags.LoopWithCapturedBlockScopedBinding) !== 0;
        }

        /**
         * Records constituents of name for the given variable to be hoisted in the outer scope.
         */
        function hoistVariableDeclarationDeclaredInConvertedLoop(state: ConvertedLoopState, node: VariableDeclaration): void {
            if (!state.hoistedLocalVariables) {
                state.hoistedLocalVariables = [];
            }

            visit(node.name);

            function visit(node: Identifier | BindingPattern) {
                if (node.kind === SyntaxKind.Identifier) {
                    state.hoistedLocalVariables.push((<Identifier>node));
                }
                else {
                    for (const element of (<BindingPattern>node).elements) {
                        visit(element.name);
                    }
                }
            }
        }

        function convertIterationStatementBodyIfNecessary(node: IterationStatement, convert?: (node: IterationStatement, convertedLoopBodyStatements: Statement[]) => IterationStatement): VisitResult<Statement> {
            if (!shouldConvertIterationStatementBody(node)) {
                let saveAllowedNonLabeledJumps: Jump;
                if (convertedLoopState) {
                    // we get here if we are trying to emit normal loop loop inside converted loop
                    // set allowedNonLabeledJumps to Break | Continue to mark that break\continue inside the loop should be emitted as is
                    saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                    convertedLoopState.allowedNonLabeledJumps = Jump.Break | Jump.Continue;
                }

                const result = convert ? convert(node, /*convertedLoopBodyStatements*/ undefined) : visitEachChild(node, visitor, context);

                if (convertedLoopState) {
                    convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
                }
                return result;
            }

            const functionName = createUniqueName("_loop");
            let loopInitializer: VariableDeclarationList;
            switch (node.kind) {
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                    const initializer = (<ForStatement | ForInStatement | ForOfStatement>node).initializer;
                    if (initializer && initializer.kind === SyntaxKind.VariableDeclarationList) {
                        loopInitializer = <VariableDeclarationList>(<ForStatement | ForInStatement | ForOfStatement>node).initializer;
                    }
                    break;
            }
            // variables that will be passed to the loop as parameters
            const loopParameters: ParameterDeclaration[] = [];
            // variables declared in the loop initializer that will be changed inside the loop
            const loopOutParameters: LoopOutParameter[] = [];
            if (loopInitializer && (getCombinedNodeFlags(loopInitializer) & NodeFlags.BlockScoped)) {
                for (const decl of loopInitializer.declarations) {
                    processLoopVariableDeclaration(decl, loopParameters, loopOutParameters);
                }
            }

            const outerConvertedLoopState = convertedLoopState;
            convertedLoopState = { loopOutParameters };
            if (outerConvertedLoopState) {
                // convertedOuterLoopState !== undefined means that this converted loop is nested in another converted loop.
                // if outer converted loop has already accumulated some state - pass it through
                if (outerConvertedLoopState.argumentsName) {
                    // outer loop has already used 'arguments' so we've already have some name to alias it
                    // use the same name in all nested loops
                    convertedLoopState.argumentsName = outerConvertedLoopState.argumentsName;
                }
                if (outerConvertedLoopState.thisName) {
                    // outer loop has already used 'this' so we've already have some name to alias it
                    // use the same name in all nested loops
                    convertedLoopState.thisName = outerConvertedLoopState.thisName;
                }
                if (outerConvertedLoopState.hoistedLocalVariables) {
                    // we've already collected some non-block scoped variable declarations in enclosing loop
                    // use the same storage in nested loop
                    convertedLoopState.hoistedLocalVariables = outerConvertedLoopState.hoistedLocalVariables;
                }
            }

            let loopBody = visitNode(node.statement, visitor, isStatement);

            const currentState = convertedLoopState;
            convertedLoopState = outerConvertedLoopState;

            if (loopOutParameters.length) {
                const statements = isBlock(loopBody) ? (<Block>loopBody).statements.slice() : [loopBody];
                copyOutParameters(loopOutParameters, CopyDirection.ToOutParameter, statements);
                loopBody = createBlock(statements, /*location*/ undefined, /*multiline*/ true);
            }

            if (!isBlock(loopBody)) {
                loopBody = createBlock([loopBody], /*location*/ undefined, /*multiline*/ true);
            }
            const convertedLoopVariable =
                createVariableStatement(
                /*modifiers*/ undefined,
                    createVariableDeclarationList(
                        [
                            createVariableDeclaration(
                                functionName,
                                setNodeEmitFlags(
                                    createFunctionExpression(
                                        /*asteriskToken*/ undefined,
                                        /*name*/ undefined,
                                        loopParameters,
                                        <Block>loopBody
                                    ),
                                    currentState.containsLexicalThis
                                        ? NodeEmitFlags.CapturesThis
                                        : 0
                                )
                            )
                        ]
                    )
                );

            const statements: Statement[] = [convertedLoopVariable];

            let extraVariableDeclarations: VariableDeclaration[];
            // propagate state from the inner loop to the outer loop if necessary
            if (currentState.argumentsName) {
                // if alias for arguments is set
                if (outerConvertedLoopState) {
                    // pass it to outer converted loop
                    outerConvertedLoopState.argumentsName = currentState.argumentsName;
                }
                else {
                    // this is top level converted loop and we need to create an alias for 'arguments' object
                    (extraVariableDeclarations || (extraVariableDeclarations = [])).push(
                        createVariableDeclaration(
                            currentState.argumentsName,
                            createIdentifier("arguments")
                        )
                    );
                }
            }

            if (currentState.thisName) {
                // if alias for this is set
                if (outerConvertedLoopState) {
                    // pass it to outer converted loop
                    outerConvertedLoopState.thisName = currentState.thisName;
                }
                else {
                    // this is top level converted loop so we need to create an alias for 'this' here
                    // NOTE:
                    // if converted loops were all nested in arrow function then we'll always emit '_this' so convertedLoopState.thisName will not be set.
                    // If it is set this means that all nested loops are not nested in arrow function and it is safe to capture 'this'.
                    (extraVariableDeclarations || (extraVariableDeclarations = [])).push(
                        createVariableDeclaration(
                            currentState.thisName,
                            createIdentifier("this")
                            )
                    );
                }
            }

            if (currentState.hoistedLocalVariables) {
                // if hoistedLocalVariables !== undefined this means that we've possibly collected some variable declarations to be hoisted later
                if (outerConvertedLoopState) {
                    // pass them to outer converted loop
                    outerConvertedLoopState.hoistedLocalVariables = currentState.hoistedLocalVariables;
                }
                else {
                    if (!extraVariableDeclarations) {
                        extraVariableDeclarations = [];
                    }
                    // hoist collected variable declarations
                    for (const name in currentState.hoistedLocalVariables) {
                        const identifier = currentState.hoistedLocalVariables[name];
                        extraVariableDeclarations.push(createVariableDeclaration(identifier));
                    }
                }
            }

            // add extra variables to hold out parameters if necessary
            if (loopOutParameters.length) {
                if (!extraVariableDeclarations) {
                    extraVariableDeclarations = [];
                }
                for (const outParam of loopOutParameters) {
                    extraVariableDeclarations.push(createVariableDeclaration(outParam.outParamName));
                }
            }

            // create variable statement to hold all introduced variable declarations
            if (extraVariableDeclarations) {
                statements.push(createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(extraVariableDeclarations)
                ));
            }

            const convertedLoopBodyStatements = generateCallToConvertedLoop(functionName, loopParameters, currentState);
            let loop: IterationStatement;
            if (convert) {
                loop = convert(node, convertedLoopBodyStatements);
            }
            else {
                loop = <IterationStatement>getMutableClone(node);
                // clean statement part
                loop.statement = undefined;
                // visit childnodes to transform initializer/condition/incrementor parts
                loop = visitEachChild(loop, visitor, context);
                // set loop statement
                loop.statement = createBlock(
                    generateCallToConvertedLoop(functionName, loopParameters, currentState),
                    /*location*/ undefined,
                    /*multiline*/ true
                );
            }

            statements.push(
                currentParent.kind === SyntaxKind.LabeledStatement
                    ? createLabel((<LabeledStatement>currentParent).label, loop)
                    : loop
                );
            return statements;
        }

        function copyOutParameter(outParam: LoopOutParameter, copyDirection: CopyDirection): BinaryExpression {
            const source = copyDirection === CopyDirection.ToOriginal ? outParam.outParamName : outParam.originalName;
            const target = copyDirection === CopyDirection.ToOriginal ? outParam.originalName : outParam.outParamName;
            return createBinary(target, SyntaxKind.EqualsToken, source);
        }

        function copyOutParameters(outParams: LoopOutParameter[], copyDirection: CopyDirection, statements: Statement[]): void {
            for (const outParam of outParams) {
                statements.push(createStatement(copyOutParameter(outParam, copyDirection)));
            }
        }

        function generateCallToConvertedLoop(loopFunctionExpressionName: Identifier, parameters: ParameterDeclaration[], state: ConvertedLoopState): Statement[] {
            const outerConvertedLoopState = convertedLoopState;

            const statements: Statement[] = [];
            // loop is considered simple if it does not have any return statements or break\continue that transfer control outside of the loop
            // simple loops are emitted as just 'loop()';
            // NOTE: if loop uses only 'continue' it still will be emitted as simple loop
            const isSimpleLoop =
                !(state.nonLocalJumps & ~Jump.Continue) &&
                !state.labeledNonLocalBreaks &&
                !state.labeledNonLocalContinues;

            const call = createCall(loopFunctionExpressionName, map(parameters, p => <Identifier>p.name));
            if (isSimpleLoop) {
                statements.push(createStatement(call));
                copyOutParameters(state.loopOutParameters, CopyDirection.ToOriginal, statements);
            }
            else {
                const loopResultName = createUniqueName("state");
                const stateVariable = createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(
                        [createVariableDeclaration(loopResultName, call)]
                    )
                );
                statements.push(stateVariable);
                copyOutParameters(state.loopOutParameters, CopyDirection.ToOriginal, statements);

                if (state.nonLocalJumps & Jump.Return) {
                    let returnStatement: ReturnStatement;
                    if (outerConvertedLoopState) {
                        outerConvertedLoopState.nonLocalJumps |= Jump.Return;
                        returnStatement = createReturn(loopResultName);
                    }
                    else {
                        returnStatement = createReturn(createPropertyAccess(loopResultName, "value"));
                    }
                    statements.push(
                        createIf(
                            createBinary(
                                createTypeOf(loopResultName),
                                SyntaxKind.EqualsEqualsEqualsToken,
                                createLiteral("object")
                            ),
                            returnStatement
                        )
                    );
                }

                if (state.nonLocalJumps & Jump.Break) {
                    statements.push(
                        createIf(
                            createBinary(
                                loopResultName,
                                SyntaxKind.EqualsEqualsEqualsToken,
                                createLiteral("break")
                            ),
                            createBreak()
                        )
                    );
                }

                if (state.labeledNonLocalBreaks || state.labeledNonLocalContinues) {
                    const caseClauses: CaseClause[] = [];
                    processLabeledJumps(state.labeledNonLocalBreaks, /*isBreak*/ true, loopResultName, outerConvertedLoopState, caseClauses);
                    processLabeledJumps(state.labeledNonLocalContinues, /*isBreak*/ false, loopResultName, outerConvertedLoopState, caseClauses);
                    statements.push(
                        createSwitch(
                            loopResultName,
                            createCaseBlock(caseClauses)
                        )
                    );
                }
            }
            return statements;
        }

        function setLabeledJump(state: ConvertedLoopState, isBreak: boolean, labelText: string, labelMarker: string): void {
            if (isBreak) {
                if (!state.labeledNonLocalBreaks) {
                    state.labeledNonLocalBreaks = {};
                }
                state.labeledNonLocalBreaks[labelText] = labelMarker;
            }
            else {
                if (!state.labeledNonLocalContinues) {
                    state.labeledNonLocalContinues = {};
                }
                state.labeledNonLocalContinues[labelText] = labelMarker;
            }
        }

        function processLabeledJumps(table: Map<string>, isBreak: boolean, loopResultName: Identifier, outerLoop: ConvertedLoopState, caseClauses: CaseClause[]): void {
            if (!table) {
                return;
            }
            for (const labelText in table) {
                const labelMarker = table[labelText];
                const statements: Statement[] = [];
                // if there are no outer converted loop or outer label in question is located inside outer converted loop
                // then emit labeled break\continue
                // otherwise propagate pair 'label -> marker' to outer converted loop and emit 'return labelMarker' so outer loop can later decide what to do
                if (!outerLoop || (outerLoop.labels && outerLoop.labels[labelText])) {
                    const label = createIdentifier(labelText);
                    statements.push(isBreak ? createBreak(label) : createContinue(label));
                }
                else {
                    setLabeledJump(outerLoop, isBreak, labelText, labelMarker);
                    statements.push(createReturn(loopResultName));
                }
                caseClauses.push(createCaseClause(createLiteral(labelMarker), statements));
            }
        }

        function processLoopVariableDeclaration(decl: VariableDeclaration | BindingElement, loopParameters: ParameterDeclaration[], loopOutParameters: LoopOutParameter[]) {
            const name = decl.name;
            if (isBindingPattern(name)) {
                for (const element of name.elements) {
                    processLoopVariableDeclaration(element, loopParameters, loopOutParameters);
                }
            }
            else {
                loopParameters.push(createParameter(name));
                if (resolver.getNodeCheckFlags(decl) & NodeCheckFlags.NeedsLoopOutParameter) {
                    const outParamName = createUniqueName("out_" + name.text);
                    loopOutParameters.push({ originalName: name, outParamName });
                }
            }
        }

        /**
         * Adds the members of an object literal to an array of expressions.
         *
         * @param expressions An array of expressions.
         * @param node An ObjectLiteralExpression node.
         * @param receiver The receiver for members of the ObjectLiteralExpression.
         * @param numInitialNonComputedProperties The number of initial properties without
         *                                        computed property names.
         */
        function addObjectLiteralMembers(expressions: Expression[], node: ObjectLiteralExpression, receiver: Identifier, numInitialNonComputedProperties: number) {
            const properties = node.properties;
            const numProperties = properties.length;
            for (let i = numInitialNonComputedProperties; i < numProperties; i++) {
                const property = properties[i];
                switch (property.kind) {
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.properties, <AccessorDeclaration>property);
                        if (property === accessors.firstAccessor) {
                            addNode(expressions, transformAccessorsToExpression(receiver, accessors), node.multiLine);
                        }

                        break;

                    case SyntaxKind.PropertyAssignment:
                        addNode(expressions, transformPropertyAssignmentToExpression(node, <PropertyAssignment>property, receiver), node.multiLine);
                        break;

                    case SyntaxKind.ShorthandPropertyAssignment:
                        addNode(expressions, transformShorthandPropertyAssignmentToExpression(node, <ShorthandPropertyAssignment>property, receiver), node.multiLine);
                        break;

                    case SyntaxKind.MethodDeclaration:
                        addNode(expressions, transformObjectLiteralMethodDeclarationToExpression(node, <MethodDeclaration>property, receiver), node.multiLine);
                        break;

                    default:
                        Debug.failBadSyntaxKind(node);
                        break;
                }
            }
        }

        /**
         * Transforms a PropertyAssignment node into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the PropertyAssignment.
         * @param property The PropertyAssignment node.
         * @param receiver The receiver for the assignment.
         */
        function transformPropertyAssignmentToExpression(node: ObjectLiteralExpression, property: PropertyAssignment, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(property.name, visitor, isPropertyName)
                ),
                visitNode(property.initializer, visitor, isExpression),
                /*location*/ property
            );
        }

        /**
         * Transforms a ShorthandPropertyAssignment node into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the ShorthandPropertyAssignment.
         * @param property The ShorthandPropertyAssignment node.
         * @param receiver The receiver for the assignment.
         */
        function transformShorthandPropertyAssignmentToExpression(node: ObjectLiteralExpression, property: ShorthandPropertyAssignment, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(property.name, visitor, isPropertyName)
                ),
                getSynthesizedClone(property.name),
                /*location*/ property
            );
        }

        /**
         * Transforms a MethodDeclaration of an ObjectLiteralExpression into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the MethodDeclaration.
         * @param method The MethodDeclaration node.
         * @param receiver The receiver for the assignment.
         */
        function transformObjectLiteralMethodDeclarationToExpression(node: ObjectLiteralExpression, method: MethodDeclaration, receiver: Expression) {
            return createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(method.name, visitor, isPropertyName)
                ),
                transformFunctionLikeToExpression(method, /*location*/ method, /*name*/ undefined),
                /*location*/ method
            );
        }

        /**
         * Visits a MethodDeclaration of an ObjectLiteralExpression and transforms it into a
         * PropertyAssignment.
         *
         * @param node A MethodDeclaration node.
         */
        function visitMethodDeclaration(node: MethodDeclaration): ObjectLiteralElement {
            // We should only get here for methods on an object literal with regular identifier names.
            // Methods on classes are handled in visitClassDeclaration/visitClassExpression.
            // Methods with computed property names are handled in visitObjectLiteralExpression.
            Debug.assert(!isComputedPropertyName(node.name));
            return createPropertyAssignment(
                node.name,
                transformFunctionLikeToExpression(node, /*location*/ node, /*name*/ undefined),
                /*location*/ node
            );
        }

        /**
         * Visits a ShorthandPropertyAssignment and transforms it into a PropertyAssignment.
         *
         * @param node A ShorthandPropertyAssignment node.
         */
        function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElement {
            return createPropertyAssignment(
                node.name,
                getSynthesizedClone(node.name),
                /*location*/ node
            );
        }

        /**
         * Visits an ArrayLiteralExpression that contains a spread element.
         *
         * @param node An ArrayLiteralExpression node.
         */
        function visitArrayLiteralExpression(node: ArrayLiteralExpression): Expression {
            // We are here because we contain a SpreadElementExpression.
            return transformAndSpreadElements(node.elements, /*needsUniqueCopy*/ true, node.multiLine, /*hasTrailingComma*/ node.elements.hasTrailingComma);
        }

        /**
         * Visits a CallExpression that contains either a spread element or `super`.
         *
         * @param node a CallExpression.
         */
        function visitCallExpression(node: CallExpression): LeftHandSideExpression {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.

            const { target, thisArg } = createCallBinding(node.expression, hoistVariableDeclaration);
            if (node.transformFlags & TransformFlags.ContainsSpreadElementExpression) {
                // [source]
                //      f(...a, b)
                //      x.m(...a, b)
                //      super(...a, b)
                //      super.m(...a, b) // in static
                //      super.m(...a, b) // in instance
                //
                // [output]
                //      f.apply(void 0, a.concat([b]))
                //      (_a = x).m.apply(_a, a.concat([b]))
                //      _super.apply(this, a.concat([b]))
                //      _super.m.apply(this, a.concat([b]))
                //      _super.prototype.m.apply(this, a.concat([b]))

                return createFunctionApply(
                    visitNode(target, visitor, isExpression),
                    visitNode(thisArg, visitor, isExpression),
                    transformAndSpreadElements(node.arguments, /*needsUniqueCopy*/ false, /*multiLine*/ false, /*hasTrailingComma*/ false)
                );
            }
            else {
                // [source]
                //      super(a)
                //      super.m(a) // in static
                //      super.m(a) // in instance
                //
                // [output]
                //      _super.call(this, a)
                //      _super.m.call(this, a)
                //      _super.prototype.m.call(this, a)

                return createFunctionCall(
                    visitNode(target, visitor, isExpression),
                    visitNode(thisArg, visitor, isExpression),
                    visitNodes(node.arguments, visitor, isExpression),
                    /*location*/ node
                );
            }
        }

        /**
         * Visits a NewExpression that contains a spread element.
         *
         * @param node A NewExpression node.
         */
        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            // We are here because we contain a SpreadElementExpression.
            Debug.assert((node.transformFlags & TransformFlags.ContainsSpreadElementExpression) !== 0);

            // [source]
            //      new C(...a)
            //
            // [output]
            //      new ((_a = C).bind.apply(_a, [void 0].concat(a)))()

            const { target, thisArg } = createCallBinding(createPropertyAccess(node.expression, "bind"), hoistVariableDeclaration);
            return createNew(
                createFunctionApply(
                    visitNode(target, visitor, isExpression),
                    thisArg,
                    transformAndSpreadElements(createNodeArray([createVoidZero(), ...node.arguments]), /*needsUniqueCopy*/ false, /*multiLine*/ false, /*hasTrailingComma*/ false)
                ),
                []
            );
        }

        /**
         * Transforms an array of Expression nodes that contains a SpreadElementExpression.
         *
         * @param elements The array of Expression nodes.
         * @param needsUniqueCopy A value indicating whether to ensure that the result is a fresh array.
         * @param multiLine A value indicating whether the result should be emitted on multiple lines.
         */
        function transformAndSpreadElements(elements: NodeArray<Expression>, needsUniqueCopy: boolean, multiLine: boolean, hasTrailingComma: boolean): Expression {
            // [source]
            //      [a, ...b, c]
            //
            // [output]
            //      [a].concat(b, [c])

            // Map spans of spread expressions into their expressions and spans of other
            // expressions into an array literal.
            const numElements = elements.length;
            const segments = flatten(
                spanMap(elements, partitionSpreadElement, (partition, visitPartition, start, end) =>
                    visitPartition(partition, multiLine, hasTrailingComma && end === numElements)
                )
            );

            if (segments.length === 1) {
                const firstElement = elements[0];
                return needsUniqueCopy && isSpreadElementExpression(firstElement) && firstElement.expression.kind !== SyntaxKind.ArrayLiteralExpression
                    ? createArraySlice(segments[0])
                    : segments[0];
            }

            // Rewrite using the pattern <segment0>.concat(<segment1>, <segment2>, ...)
            return createArrayConcat(segments.shift(), segments);
        }

        function partitionSpreadElement(node: Expression) {
            return isSpreadElementExpression(node)
                ? visitSpanOfSpreadElements
                : visitSpanOfNonSpreadElements;
        }

        function visitSpanOfSpreadElements(chunk: Expression[], multiLine: boolean, hasTrailingComma: boolean): VisitResult<Expression> {
            return map(chunk, visitExpressionOfSpreadElement);
        }

        function visitSpanOfNonSpreadElements(chunk: Expression[], multiLine: boolean, hasTrailingComma: boolean): VisitResult<Expression> {
            return createArrayLiteral(
                visitNodes(createNodeArray(chunk, /*location*/ undefined, hasTrailingComma), visitor, isExpression),
                /*location*/ undefined,
                multiLine
            );
        }

        /**
         * Transforms the expression of a SpreadElementExpression node.
         *
         * @param node A SpreadElementExpression node.
         */
        function visitExpressionOfSpreadElement(node: SpreadElementExpression) {
            return visitNode(node.expression, visitor, isExpression);
        }

        /**
         * Visits a template literal.
         *
         * @param node A template literal.
         */
        function visitTemplateLiteral(node: LiteralExpression): LeftHandSideExpression {
            return createLiteral(node.text, /*location*/ node);
        }

        /**
         * Visits a TaggedTemplateExpression node.
         *
         * @param node A TaggedTemplateExpression node.
         */
        function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            // Visit the tag expression
            const tag = visitNode(node.tag, visitor, isExpression);

            // Allocate storage for the template site object
            const temp = createTempVariable(hoistVariableDeclaration);

            // Build up the template arguments and the raw and cooked strings for the template.
            const templateArguments: Expression[] = [temp];
            const cookedStrings: Expression[] = [];
            const rawStrings: Expression[] = [];
            const template = node.template;
            if (isNoSubstitutionTemplateLiteral(template)) {
                cookedStrings.push(createLiteral(template.text));
                rawStrings.push(getRawLiteral(template));
            }
            else {
                cookedStrings.push(createLiteral(template.head.text));
                rawStrings.push(getRawLiteral(template.head));
                for (const templateSpan of template.templateSpans) {
                    cookedStrings.push(createLiteral(templateSpan.literal.text));
                    rawStrings.push(getRawLiteral(templateSpan.literal));
                    templateArguments.push(visitNode(templateSpan.expression, visitor, isExpression));
                }
            }

            // NOTE: The parentheses here is entirely optional as we are now able to auto-
            //       parenthesize when rebuilding the tree. This should be removed in a
            //       future version. It is here for now to match our existing emit.
            return createParen(
                inlineExpressions([
                    createAssignment(temp, createArrayLiteral(cookedStrings)),
                    createAssignment(createPropertyAccess(temp, "raw"), createArrayLiteral(rawStrings)),
                    createCall(tag, templateArguments)
                ])
            );
        }

        /**
         * Creates an ES5 compatible literal from an ES6 template literal.
         *
         * @param node The ES6 template literal.
         */
        function getRawLiteral(node: LiteralLikeNode) {
            // Find original source text, since we need to emit the raw strings of the tagged template.
            // The raw strings contain the (escaped) strings of what the user wrote.
            // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
            let text = getSourceTextOfNodeFromSourceFile(currentSourceFile, node);

            // text contains the original source, it will also contain quotes ("`"), dolar signs and braces ("${" and "}"),
            // thus we need to remove those characters.
            // First template piece starts with "`", others with "}"
            // Last template piece ends with "`", others with "${"
            const isLast = node.kind === SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === SyntaxKind.TemplateTail;
            text = text.substring(1, text.length - (isLast ? 1 : 2));

            // Newline normalization:
            // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
            // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
            text = text.replace(/\r\n?/g, "\n");
            return createLiteral(text, /*location*/ node);
        }

        /**
         * Visits a TemplateExpression node.
         *
         * @param node A TemplateExpression node.
         */
        function visitTemplateExpression(node: TemplateExpression): Expression {
            const expressions: Expression[] = [];
            addTemplateHead(expressions, node);
            addTemplateSpans(expressions, node);

            // createAdd will check if each expression binds less closely than binary '+'.
            // If it does, it wraps the expression in parentheses. Otherwise, something like
            //    `abc${ 1 << 2 }`
            // becomes
            //    "abc" + 1 << 2 + ""
            // which is really
            //    ("abc" + 1) << (2 + "")
            // rather than
            //    "abc" + (1 << 2) + ""
            const expression = reduceLeft(expressions, createAdd);
            if (nodeIsSynthesized(expression)) {
                setTextRange(expression, node);
            }

            return expression;
        }

        /**
         * Gets a value indicating whether we need to include the head of a TemplateExpression.
         *
         * @param node A TemplateExpression node.
         */
        function shouldAddTemplateHead(node: TemplateExpression) {
            // If this expression has an empty head literal and the first template span has a non-empty
            // literal, then emitting the empty head literal is not necessary.
            //     `${ foo } and ${ bar }`
            // can be emitted as
            //     foo + " and " + bar
            // This is because it is only required that one of the first two operands in the emit
            // output must be a string literal, so that the other operand and all following operands
            // are forced into strings.
            //
            // If the first template span has an empty literal, then the head must still be emitted.
            //     `${ foo }${ bar }`
            // must still be emitted as
            //     "" + foo + bar

            // There is always atleast one templateSpan in this code path, since
            // NoSubstitutionTemplateLiterals are directly emitted via emitLiteral()
            Debug.assert(node.templateSpans.length !== 0);

            return node.head.text.length !== 0 || node.templateSpans[0].literal.text.length === 0;
        }

        /**
         * Adds the head of a TemplateExpression to an array of expressions.
         *
         * @param expressions An array of expressions.
         * @param node A TemplateExpression node.
         */
        function addTemplateHead(expressions: Expression[], node: TemplateExpression): void {
            if (!shouldAddTemplateHead(node)) {
                return;
            }

            expressions.push(createLiteral(node.head.text));
        }

        /**
         * Visits and adds the template spans of a TemplateExpression to an array of expressions.
         *
         * @param expressions An array of expressions.
         * @param node A TemplateExpression node.
         */
        function addTemplateSpans(expressions: Expression[], node: TemplateExpression): void {
            for (const span of node.templateSpans) {
                expressions.push(visitNode(span.expression, visitor, isExpression));

                // Only emit if the literal is non-empty.
                // The binary '+' operator is left-associative, so the first string concatenation
                // with the head will force the result up to this point to be a string.
                // Emitting a '+ ""' has no semantic effect for middles and tails.
                if (span.literal.text.length !== 0) {
                    expressions.push(createLiteral(span.literal.text));
                }
            }
        }

        /**
         * Visits the `super` keyword
         */
        function visitSuperKeyword(node: PrimaryExpression): LeftHandSideExpression {
            return containingNonArrowFunction
                && isClassElement(containingNonArrowFunction)
                && !hasModifier(containingNonArrowFunction, ModifierFlags.Static)
                && currentParent.kind !== SyntaxKind.CallExpression
                    ? createPropertyAccess(createIdentifier("_super"), "prototype")
                    : createIdentifier("_super");
        }

        function visitSourceFileNode(node: SourceFile): SourceFile {
            const [prologue, remaining] = span(node.statements, isPrologueDirective);
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addRange(statements, prologue);
            addCaptureThisForNodeIfNeeded(statements, node);
            addRange(statements, visitNodes(createNodeArray(remaining), visitor, isStatement));
            addRange(statements, endLexicalEnvironment());
            const clone = getMutableClone(node);
            clone.statements = createNodeArray(statements, /*location*/ node.statements);
            return clone;
        }

        /**
         * Called by the printer just before a node is printed.
         *
         * @param node The node to be printed.
         */
        function onEmitNode(node: Node, emit: (node: Node) => void) {
            const savedUseCapturedThis = useCapturedThis;

            if (enabledSubstitutions & ES6SubstitutionFlags.CapturedThis && isFunctionLike(node)) {
                // If we are tracking a captured `this`, push a bit that indicates whether the
                // containing function is an arrow function.
                useCapturedThis = (getNodeEmitFlags(node) & NodeEmitFlags.CapturesThis) !== 0;
            }

            previousOnEmitNode(node, emit);

            useCapturedThis = savedUseCapturedThis;
        }

        /**
         * Enables a more costly code path for substitutions when we determine a source file
         * contains block-scoped bindings (e.g. `let` or `const`).
         */
        function enableSubstitutionsForBlockScopedBindings() {
            if ((enabledSubstitutions & ES6SubstitutionFlags.BlockScopedBindings) === 0) {
                enabledSubstitutions |= ES6SubstitutionFlags.BlockScopedBindings;
                context.enableExpressionSubstitution(SyntaxKind.Identifier);
            }
        }

        /**
         * Enables a more costly code path for substitutions when we determine a source file
         * contains a captured `this`.
         */
        function enableSubstitutionsForCapturedThis() {
            if ((enabledSubstitutions & ES6SubstitutionFlags.CapturedThis) === 0) {
                enabledSubstitutions |= ES6SubstitutionFlags.CapturedThis;
                context.enableExpressionSubstitution(SyntaxKind.ThisKeyword);
                context.enableEmitNotification(SyntaxKind.Constructor);
                context.enableEmitNotification(SyntaxKind.MethodDeclaration);
                context.enableEmitNotification(SyntaxKind.GetAccessor);
                context.enableEmitNotification(SyntaxKind.SetAccessor);
                context.enableEmitNotification(SyntaxKind.ArrowFunction);
                context.enableEmitNotification(SyntaxKind.FunctionExpression);
                context.enableEmitNotification(SyntaxKind.FunctionDeclaration);
            }
        }

        /**
         * Hooks substitutions for non-expression identifiers.
         */
        function substituteIdentifier(node: Identifier) {
            node = previousIdentifierSubstitution(node);

            // Only substitute the identifier if we have enabled substitutions for block-scoped
            // bindings.
            if (enabledSubstitutions & ES6SubstitutionFlags.BlockScopedBindings) {
                const original = getSourceTreeNodeOfType(node, isIdentifier);
                if (original && isNameOfDeclarationWithCollidingName(original)) {
                    return getGeneratedNameForNode(original);
                }
            }

            return node;
        }

        /**
         * Determines whether a name is the name of a declaration with a colliding name.
         * NOTE: This function expects to be called with an original source tree node.
         *
         * @param node An original source tree node.
         */
        function isNameOfDeclarationWithCollidingName(node: Identifier) {
            const parent = node.parent;
            switch (parent.kind) {
                case SyntaxKind.BindingElement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.VariableDeclaration:
                    return (<Declaration>parent).name === node
                        && resolver.isDeclarationWithCollidingName(<Declaration>parent);
            }

            return false;
        }

        /**
         * Substitutes an expression.
         *
         * @param node An Expression node.
         */
        function substituteExpression(node: Expression): Expression {
            node = previousExpressionSubstitution(node);
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return substituteExpressionIdentifier(<Identifier>node);

                case SyntaxKind.ThisKeyword:
                    return substituteThisKeyword(<PrimaryExpression>node);
            }

            return node;
        }

        /**
         * Substitutes an expression identifier.
         *
         * @param node An Identifier node.
         */
        function substituteExpressionIdentifier(node: Identifier): Identifier {
            if (enabledSubstitutions & ES6SubstitutionFlags.BlockScopedBindings) {
                const declaration = resolver.getReferencedDeclarationWithCollidingName(node);
                if (declaration) {
                    return getGeneratedNameForNode(declaration.name);
                }
            }

            return node;
        }

        /**
         * Substitutes `this` when contained within an arrow function.
         *
         * @param node The ThisKeyword node.
         */
        function substituteThisKeyword(node: PrimaryExpression): PrimaryExpression {
            if (enabledSubstitutions & ES6SubstitutionFlags.CapturedThis && useCapturedThis) {
                return createIdentifier("_this", /*location*/ node);
            }

            return node;
        }

        /**
         * Gets the name of a declaration, without source map or comments.
         *
         * @param node The declaration.
         * @param allowComments Allow comments for the name.
         */
        function getDeclarationName(node: DeclarationStatement | ClassExpression, allowComments?: boolean) {
            if (node.name) {
                const name = getMutableClone(node.name);
                let flags = NodeEmitFlags.NoSourceMap;
                if (!allowComments) {
                    flags |= NodeEmitFlags.NoComments;
                }

                setNodeEmitFlags(name, flags | getNodeEmitFlags(name));
                return name;
            }

            return getGeneratedNameForNode(node);
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            const expression = getDeclarationName(node);
            return hasModifier(member, ModifierFlags.Static) ? expression : createPropertyAccess(expression, "prototype");
        }

        function hasSynthesizedDefaultSuperCall(constructor: ConstructorDeclaration, hasExtendsClause: boolean) {
            if (!constructor || !hasExtendsClause) {
                return false;
            }

            const parameter = singleOrUndefined(constructor.parameters);
            if (!parameter || !nodeIsSynthesized(parameter) || !parameter.dotDotDotToken) {
                return false;
            }

            const statement = firstOrUndefined(constructor.body.statements);
            if (!statement || !nodeIsSynthesized(statement) || statement.kind !== SyntaxKind.ExpressionStatement) {
                return false;
            }

            const statementExpression = (<ExpressionStatement>statement).expression;
            if (!nodeIsSynthesized(statementExpression) || statementExpression.kind !== SyntaxKind.CallExpression) {
                return false;
            }

            const callTarget = (<CallExpression>statementExpression).expression;
            if (!nodeIsSynthesized(callTarget) || callTarget.kind !== SyntaxKind.SuperKeyword) {
                return false;
            }

            const callArgument = singleOrUndefined((<CallExpression>statementExpression).arguments);
            if (!callArgument || !nodeIsSynthesized(callArgument) || callArgument.kind !== SyntaxKind.SpreadElementExpression) {
                return false;
            }

            const expression = (<SpreadElementExpression>callArgument).expression;
            return isIdentifier(expression) && expression === parameter.name;
        }
    }
}