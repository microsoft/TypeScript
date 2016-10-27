/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {

    const enum ES2015SubstitutionFlags {
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

    const enum SuperCaptureResult {
        /**
         * A capture may have been added for calls to 'super', but
         * the caller should emit subsequent statements normally.
         */
        NoReplacement,
        /**
         * A call to 'super()' got replaced with a capturing statement like:
         *
         *  var _this = _super.call(...) || this;
         *
         * Callers should skip the current statement.
         */
        ReplaceSuperCapture,
        /**
         * A call to 'super()' got replaced with a capturing statement like:
         *
         *  return _super.call(...) || this;
         *
         * Callers should skip the current statement and avoid any returns of '_this'.
         */
        ReplaceWithReturn,
    }

    export function transformES2015(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;

        const resolver = context.getEmitResolver();
        const previousOnSubstituteNode = context.onSubstituteNode;
        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

        let currentSourceFile: SourceFile;
        let currentText: string;
        let currentParent: Node;
        let currentNode: Node;
        let enclosingVariableStatement: VariableStatement;
        let enclosingBlockScopeContainer: Node;
        let enclosingBlockScopeContainerParent: Node;
        let enclosingFunction: FunctionLikeDeclaration;
        let enclosingNonArrowFunction: FunctionLikeDeclaration;
        let enclosingNonAsyncFunctionBody: FunctionLikeDeclaration | ClassElement;
        let isInConstructorWithCapturedSuper: boolean;

        /**
         * Used to track if we are emitting body of the converted loop
         */
        let convertedLoopState: ConvertedLoopState;

        /**
         * Keeps track of whether substitutions have been enabled for specific cases.
         * They are persisted between each SourceFile transformation and should not
         * be reset.
         */
        let enabledSubstitutions: ES2015SubstitutionFlags;

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            currentSourceFile = node;
            currentText = node.text;
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

        function saveStateAndInvoke<T extends Node, U>(node: T, f: (node: T) => U): U {
            const savedEnclosingFunction = enclosingFunction;
            const savedEnclosingNonArrowFunction = enclosingNonArrowFunction;
            const savedEnclosingNonAsyncFunctionBody = enclosingNonAsyncFunctionBody;
            const savedEnclosingBlockScopeContainer = enclosingBlockScopeContainer;
            const savedEnclosingBlockScopeContainerParent = enclosingBlockScopeContainerParent;
            const savedEnclosingVariableStatement = enclosingVariableStatement;
            const savedCurrentParent = currentParent;
            const savedCurrentNode = currentNode;
            const savedConvertedLoopState = convertedLoopState;
            const savedIsInConstructorWithCapturedSuper = isInConstructorWithCapturedSuper;
            if (nodeStartsNewLexicalEnvironment(node)) {
                // don't treat content of nodes that start new lexical environment as part of converted loop copy or constructor body
                isInConstructorWithCapturedSuper = false;
                convertedLoopState = undefined;
            }

            onBeforeVisitNode(node);
            const visited = f(node);

            isInConstructorWithCapturedSuper = savedIsInConstructorWithCapturedSuper;
            convertedLoopState = savedConvertedLoopState;
            enclosingFunction = savedEnclosingFunction;
            enclosingNonArrowFunction = savedEnclosingNonArrowFunction;
            enclosingNonAsyncFunctionBody = savedEnclosingNonAsyncFunctionBody;
            enclosingBlockScopeContainer = savedEnclosingBlockScopeContainer;
            enclosingBlockScopeContainerParent = savedEnclosingBlockScopeContainerParent;
            enclosingVariableStatement = savedEnclosingVariableStatement;
            currentParent = savedCurrentParent;
            currentNode = savedCurrentNode;
            return visited;
        }

        function returnCapturedThis(node: Node): Node {
            return setOriginalNode(createReturn(createIdentifier("_this")), node);
        }

        function isReturnVoidStatementInConstructorWithCapturedSuper(node: Node): boolean {
            return isInConstructorWithCapturedSuper && node.kind === SyntaxKind.ReturnStatement && !(<ReturnStatement>node).expression;
        }

        function shouldCheckNode(node: Node): boolean {
            return (node.transformFlags & TransformFlags.ES2015) !== 0 ||
                node.kind === SyntaxKind.LabeledStatement ||
                (isIterationStatement(node, /*lookInLabeledStatements*/ false) && shouldConvertIterationStatementBody(node));
        }

        function visitorWorker(node: Node): VisitResult<Node> {
            if (isReturnVoidStatementInConstructorWithCapturedSuper(node)) {
                return returnCapturedThis(<ReturnStatement>node);
            }
            else if (shouldCheckNode(node)) {
                return visitJavaScript(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsES2015 || (isInConstructorWithCapturedSuper && !isExpression(node))) {
                // we want to dive in this branch either if node has children with ES2015 specific syntax
                // or we are inside constructor that captures result of the super call so all returns without expression should be
                // rewritten. Note: we skip expressions since returns should never appear there 
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorForConvertedLoopWorker(node: Node): VisitResult<Node> {
            let result: VisitResult<Node>;
            if (shouldCheckNode(node)) {
                result = visitJavaScript(node);
            }
            else {
                result = visitNodesInConvertedLoop(node);
            }
            return result;
        }

        function visitNodesInConvertedLoop(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ReturnStatement:
                    node = isReturnVoidStatementInConstructorWithCapturedSuper(node) ? returnCapturedThis(node) : node;
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
                case SyntaxKind.StaticKeyword:
                    return undefined; // elide static keyword

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

                case SyntaxKind.CatchClause:
                    return visitCatchClause(<CatchClause>node);

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

                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(<YieldExpression>node);

                case SyntaxKind.SuperKeyword:
                    return visitSuperKeyword();

                case SyntaxKind.YieldExpression:
                    // `yield` will be handled by a generators transform.
                    return visitEachChild(node, visitor, context);

                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.SourceFile:
                    return visitSourceFileNode(<SourceFile>node);

                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);

                default:
                    Debug.failBadSyntaxKind(node);
                    return visitEachChild(node, visitor, context);
            }

        }

        function onBeforeVisitNode(node: Node) {
            if (currentNode) {
                if (isBlockScope(currentNode, currentParent)) {
                    enclosingBlockScopeContainer = currentNode;
                    enclosingBlockScopeContainerParent = currentParent;
                }

                if (isFunctionLike(currentNode)) {
                    enclosingFunction = currentNode;
                    if (currentNode.kind !== SyntaxKind.ArrowFunction) {
                        enclosingNonArrowFunction = currentNode;
                        if (!(getEmitFlags(currentNode) & EmitFlags.AsyncFunctionBody)) {
                            enclosingNonAsyncFunctionBody = currentNode;
                        }
                    }
                }

                // keep track of the enclosing variable statement when in the context of
                // variable statements, variable declarations, binding elements, and binding
                // patterns.
                switch (currentNode.kind) {
                    case SyntaxKind.VariableStatement:
                        enclosingVariableStatement = <VariableStatement>currentNode;
                        break;

                    case SyntaxKind.VariableDeclarationList:
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.BindingElement:
                    case SyntaxKind.ObjectBindingPattern:
                    case SyntaxKind.ArrayBindingPattern:
                        break;

                    default:
                        enclosingVariableStatement = undefined;
                }
            }

            currentParent = currentNode;
            currentNode = node;
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
            if (enclosingFunction && enclosingFunction.kind === SyntaxKind.ArrowFunction) {
                // if the enclosing function is an ArrowFunction is then we use the captured 'this' keyword.
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
        function visitClassDeclaration(node: ClassDeclaration): VisitResult<Statement> {
            // [source]
            //      class C { }
            //
            // [output]
            //      var C = (function () {
            //          function C() {
            //          }
            //          return C;
            //      }());

            const variable = createVariableDeclaration(
                getLocalName(node, /*allowComments*/ true),
                /*type*/ undefined,
                transformClassLikeDeclarationToExpression(node)
            );

            setOriginalNode(variable, node);

            const statements: Statement[] = [];
            const statement = createVariableStatement(/*modifiers*/ undefined, createVariableDeclarationList([variable]), /*location*/ node);

            setOriginalNode(statement, node);
            startOnNewLine(statement);
            statements.push(statement);

            // Add an `export default` statement for default exports (for `--target es5 --module es6`)
            if (hasModifier(node, ModifierFlags.Export)) {
                const exportStatement = hasModifier(node, ModifierFlags.Default)
                    ? createExportDefault(getLocalName(node))
                    : createExternalModuleExport(getLocalName(node));

                setOriginalNode(exportStatement, statement);
                statements.push(exportStatement);
            }

            const emitFlags = getEmitFlags(node);
            if ((emitFlags & EmitFlags.HasEndOfDeclarationMarker) === 0) {
                // Add a DeclarationMarker as a marker for the end of the declaration
                statements.push(createEndOfDeclarationMarker(node));
                setEmitFlags(statement, emitFlags | EmitFlags.HasEndOfDeclarationMarker);
            }

            return singleOrMany(statements);
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

            const extendsClauseElement = getClassExtendsHeritageClauseElement(node);
            const classFunction = createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                extendsClauseElement ? [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, "_super")] : [],
                /*type*/ undefined,
                transformClassBody(node, extendsClauseElement)
            );

            // To preserve the behavior of the old emitter, we explicitly indent
            // the body of the function here if it was requested in an earlier
            // transformation.
            if (getEmitFlags(node) & EmitFlags.Indented) {
                setEmitFlags(classFunction, EmitFlags.Indented);
            }

            // "inner" and "outer" below are added purely to preserve source map locations from
            // the old emitter
            const inner = createPartiallyEmittedExpression(classFunction);
            inner.end = node.end;
            setEmitFlags(inner, EmitFlags.NoComments);

            const outer = createPartiallyEmittedExpression(inner);
            outer.end = skipTrivia(currentText, node.pos);
            setEmitFlags(outer, EmitFlags.NoComments);

            return createParen(
                createCall(
                    outer,
                    /*typeArguments*/ undefined,
                    extendsClauseElement
                        ? [visitNode(extendsClauseElement.expression, visitor, isExpression)]
                        : []
                )
            );
        }

        /**
         * Transforms a ClassExpression or ClassDeclaration into a function body.
         *
         * @param node A ClassExpression or ClassDeclaration node.
         * @param extendsClauseElement The expression for the class `extends` clause.
         */
        function transformClassBody(node: ClassExpression | ClassDeclaration, extendsClauseElement: ExpressionWithTypeArguments): Block {
            const statements: Statement[] = [];
            startLexicalEnvironment();
            addExtendsHelperIfNeeded(statements, node, extendsClauseElement);
            addConstructor(statements, node, extendsClauseElement);
            addClassMembers(statements, node);

            // Create a synthetic text range for the return statement.
            const closingBraceLocation = createTokenRange(skipTrivia(currentText, node.members.end), SyntaxKind.CloseBraceToken);
            const localName = getLocalName(node);

            // The following partially-emitted expression exists purely to align our sourcemap
            // emit with the original emitter.
            const outer = createPartiallyEmittedExpression(localName);
            outer.end = closingBraceLocation.end;
            setEmitFlags(outer, EmitFlags.NoComments);

            const statement = createReturn(outer);
            statement.pos = closingBraceLocation.pos;
            setEmitFlags(statement, EmitFlags.NoComments | EmitFlags.NoTokenSourceMaps);
            statements.push(statement);

            addRange(statements, endLexicalEnvironment());

            const block = createBlock(createNodeArray(statements, /*location*/ node.members), /*location*/ undefined, /*multiLine*/ true);
            setEmitFlags(block, EmitFlags.NoComments);
            return block;
        }

        /**
         * Adds a call to the `__extends` helper if needed for a class.
         *
         * @param statements The statements of the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         * @param extendsClauseElement The expression for the class `extends` clause.
         */
        function addExtendsHelperIfNeeded(statements: Statement[], node: ClassExpression | ClassDeclaration, extendsClauseElement: ExpressionWithTypeArguments): void {
            if (extendsClauseElement) {
                statements.push(
                    createStatement(
                        createExtendsHelper(currentSourceFile.externalHelpersModuleName, getLocalName(node)),
                        /*location*/ extendsClauseElement
                    )
                );
            }
        }

        /**
         * Adds the constructor of the class to a class body function.
         *
         * @param statements The statements of the class body function.
         * @param node The ClassExpression or ClassDeclaration node.
         * @param extendsClauseElement The expression for the class `extends` clause.
         */
        function addConstructor(statements: Statement[], node: ClassExpression | ClassDeclaration, extendsClauseElement: ExpressionWithTypeArguments): void {
            const constructor = getFirstConstructorWithBody(node);
            const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, extendsClauseElement !== undefined);

            const constructorFunction =
                createFunctionDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    getDeclarationName(node),
                    /*typeParameters*/ undefined,
                    transformConstructorParameters(constructor, hasSynthesizedSuper),
                    /*type*/ undefined,
                    transformConstructorBody(constructor, node, extendsClauseElement, hasSynthesizedSuper),
                    /*location*/ constructor || node
                );

            if (extendsClauseElement) {
                setEmitFlags(constructorFunction, EmitFlags.CapturesThis);
            }
            statements.push(constructorFunction);
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
         * @param node The node which contains the constructor.
         * @param extendsClauseElement The expression for the class `extends` clause.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorBody(constructor: ConstructorDeclaration | undefined, node: ClassDeclaration | ClassExpression, extendsClauseElement: ExpressionWithTypeArguments, hasSynthesizedSuper: boolean) {
            const statements: Statement[] = [];
            startLexicalEnvironment();

            let statementOffset = -1;
            if (hasSynthesizedSuper) {
                // If a super call has already been synthesized,
                // we're going to assume that we should just transform everything after that.
                // The assumption is that no prior step in the pipeline has added any prologue directives.
                statementOffset = 1;
            }
            else if (constructor) {
                // Otherwise, try to emit all potential prologue directives first.
                statementOffset = addPrologueDirectives(statements, constructor.body.statements, /*ensureUseStrict*/ false, visitor);
            }

            if (constructor) {
                addDefaultValueAssignmentsIfNeeded(statements, constructor);
                addRestParameterIfNeeded(statements, constructor, hasSynthesizedSuper);
                Debug.assert(statementOffset >= 0, "statementOffset not initialized correctly!");

            }

            const superCaptureStatus = declareOrCaptureOrReturnThisForConstructorIfNeeded(statements, constructor, !!extendsClauseElement, hasSynthesizedSuper, statementOffset);

            // The last statement expression was replaced. Skip it.
            if (superCaptureStatus === SuperCaptureResult.ReplaceSuperCapture || superCaptureStatus === SuperCaptureResult.ReplaceWithReturn) {
                statementOffset++;
            }

            if (constructor) {
                const body = saveStateAndInvoke(constructor, constructor => {
                    isInConstructorWithCapturedSuper = superCaptureStatus === SuperCaptureResult.ReplaceSuperCapture;
                    return visitNodes(constructor.body.statements, visitor, isStatement, /*start*/ statementOffset);
                });
                addRange(statements, body);
            }

            // Return `_this` unless we're sure enough that it would be pointless to add a return statement.
            // If there's a constructor that we can tell returns in enough places, then we *do not* want to add a return.
            if (extendsClauseElement
                && superCaptureStatus !== SuperCaptureResult.ReplaceWithReturn
                && !(constructor && isSufficientlyCoveredByReturnStatements(constructor.body))) {
                statements.push(
                    createReturn(
                        createIdentifier("_this")
                    )
                );
            }

            addRange(statements, endLexicalEnvironment());
            const block = createBlock(
                createNodeArray(
                    statements,
                    /*location*/ constructor ? constructor.body.statements : node.members
                ),
                /*location*/ constructor ? constructor.body : node,
                /*multiLine*/ true
            );

            if (!constructor) {
                setEmitFlags(block, EmitFlags.NoComments);
            }

            return block;
        }

        /**
         * We want to try to avoid emitting a return statement in certain cases if a user already returned something.
         * It would generate obviously dead code, so we'll try to make things a little bit prettier
         * by doing a minimal check on whether some common patterns always explicitly return.
         */
        function isSufficientlyCoveredByReturnStatements(statement: Statement): boolean {
            // A return statement is considered covered.
            if (statement.kind === SyntaxKind.ReturnStatement) {
                return true;
            }
            // An if-statement with two covered branches is covered.
            else if (statement.kind === SyntaxKind.IfStatement) {
                const ifStatement = statement as IfStatement;
                if (ifStatement.elseStatement) {
                    return isSufficientlyCoveredByReturnStatements(ifStatement.thenStatement) &&
                        isSufficientlyCoveredByReturnStatements(ifStatement.elseStatement);
                }
            }
            // A block is covered if it has a last statement which is covered.
            else if (statement.kind === SyntaxKind.Block) {
                const lastStatement = lastOrUndefined((statement as Block).statements);
                if (lastStatement && isSufficientlyCoveredByReturnStatements(lastStatement)) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Declares a `_this` variable for derived classes and for when arrow functions capture `this`.
         *
         * @returns The new statement offset into the `statements` array.
         */
        function declareOrCaptureOrReturnThisForConstructorIfNeeded(
                    statements: Statement[],
                    ctor: ConstructorDeclaration | undefined,
                    hasExtendsClause: boolean,
                    hasSynthesizedSuper: boolean,
                    statementOffset: number) {
            // If this isn't a derived class, just capture 'this' for arrow functions if necessary.
            if (!hasExtendsClause) {
                if (ctor) {
                    addCaptureThisForNodeIfNeeded(statements, ctor);
                }
                return SuperCaptureResult.NoReplacement;
            }

            // We must be here because the user didn't write a constructor
            // but we needed to call 'super(...args)' anyway as per 14.5.14 of the ES2016 spec.
            // If that's the case we can just immediately return the result of a 'super()' call.
            if (!ctor) {
                statements.push(createReturn(createDefaultSuperCallOrThis()));
                return SuperCaptureResult.ReplaceWithReturn;
            }

            // The constructor exists, but it and the 'super()' call it contains were generated
            // for something like property initializers.
            // Create a captured '_this' variable and assume it will subsequently be used.
            if (hasSynthesizedSuper) {
                captureThisForNode(statements, ctor, createDefaultSuperCallOrThis());
                enableSubstitutionsForCapturedThis();
                return SuperCaptureResult.ReplaceSuperCapture;
            }

            // Most of the time, a 'super' call will be the first real statement in a constructor body.
            // In these cases, we'd like to transform these into a *single* statement instead of a declaration
            // followed by an assignment statement for '_this'. For instance, if we emitted without an initializer,
            // we'd get:
            //
            //      var _this;
            //      _this = _super.call(...) || this;
            //
            // instead of
            //
            //      var _this = _super.call(...) || this;
            //
            // Additionally, if the 'super()' call is the last statement, we should just avoid capturing
            // entirely and immediately return the result like so:
            //
            //      return _super.call(...) || this;
            //
            let firstStatement: Statement;
            let superCallExpression: Expression;

            const ctorStatements = ctor.body.statements;
            if (statementOffset < ctorStatements.length) {
                firstStatement = ctorStatements[statementOffset];

                if (firstStatement.kind === SyntaxKind.ExpressionStatement && isSuperCall((firstStatement as ExpressionStatement).expression)) {
                    const superCall = (firstStatement as ExpressionStatement).expression as CallExpression;
                    superCallExpression = setOriginalNode(
                        saveStateAndInvoke(superCall, visitImmediateSuperCallInBody),
                        superCall
                    );
                }
            }

            // Return the result if we have an immediate super() call on the last statement.
            if (superCallExpression && statementOffset === ctorStatements.length - 1) {
                statements.push(createReturn(superCallExpression));
                return SuperCaptureResult.ReplaceWithReturn;
            }

            // Perform the capture.
            captureThisForNode(statements, ctor, superCallExpression, firstStatement);

            // If we're actually replacing the original statement, we need to signal this to the caller.
            if (superCallExpression) {
                return SuperCaptureResult.ReplaceSuperCapture;
            }

            return SuperCaptureResult.NoReplacement;
        }

        function createDefaultSuperCallOrThis() {
            const actualThis = createThis();
            setEmitFlags(actualThis, EmitFlags.NoSubstitution);
            const superCall = createFunctionApply(
                createIdentifier("_super"),
                actualThis,
                createIdentifier("arguments"),
            );
            return createLogicalOr(superCall, actualThis);
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
                return setOriginalNode(
                    createParameter(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        getGeneratedNameForNode(node),
                        /*questionToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined,
                        /*location*/ node
                    ),
                    /*original*/ node
                );
            }
            else if (node.initializer) {
                // Initializers are elided
                return setOriginalNode(
                    createParameter(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        node.name,
                        /*questionToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined,
                        /*location*/ node
                    ),
                    /*original*/ node
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
                    setEmitFlags(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                flattenParameterDestructuring(parameter, temp, visitor)
                            )
                        ),
                        EmitFlags.CustomPrologue
                    )
                );
            }
            else if (initializer) {
                statements.push(
                    setEmitFlags(
                        createStatement(
                            createAssignment(
                                temp,
                                visitNode(initializer, visitor, isExpression)
                            )
                        ),
                        EmitFlags.CustomPrologue
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
            initializer = visitNode(initializer, visitor, isExpression);
            const statement = createIf(
                createStrictEquality(
                    getSynthesizedClone(name),
                    createVoidZero()
                ),
                setEmitFlags(
                    createBlock([
                        createStatement(
                            createAssignment(
                                setEmitFlags(getMutableClone(name), EmitFlags.NoSourceMap),
                                setEmitFlags(initializer, EmitFlags.NoSourceMap | getEmitFlags(initializer)),
                                /*location*/ parameter
                            )
                        )
                    ], /*location*/ parameter),
                    EmitFlags.SingleLine | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTokenSourceMaps
                ),
                /*elseStatement*/ undefined,
                /*location*/ parameter
            );
            statement.startsOnNewLine = true;
            setEmitFlags(statement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoTrailingSourceMap | EmitFlags.CustomPrologue);
            statements.push(statement);
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
            return node && node.dotDotDotToken && node.name.kind === SyntaxKind.Identifier && !inConstructorWithSynthesizedSuper;
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

            // `declarationName` is the name of the local declaration for the parameter.
            const declarationName = getMutableClone(<Identifier>parameter.name);
            setEmitFlags(declarationName, EmitFlags.NoSourceMap);

            // `expressionName` is the name of the parameter used in expressions.
            const expressionName = getSynthesizedClone(<Identifier>parameter.name);
            const restIndex = node.parameters.length - 1;
            const temp = createLoopVariable();

            // var param = [];
            statements.push(
                setEmitFlags(
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList([
                            createVariableDeclaration(
                                declarationName,
                                /*type*/ undefined,
                                createArrayLiteral([])
                            )
                        ]),
                        /*location*/ parameter
                    ),
                    EmitFlags.CustomPrologue
                )
            );

            // for (var _i = restIndex; _i < arguments.length; _i++) {
            //   param[_i - restIndex] = arguments[_i];
            // }
            const forStatement = createFor(
                createVariableDeclarationList([
                    createVariableDeclaration(temp, /*type*/ undefined, createLiteral(restIndex))
                ], /*location*/ parameter),
                createLessThan(
                    temp,
                    createPropertyAccess(createIdentifier("arguments"), "length"),
                    /*location*/ parameter
                ),
                createPostfixIncrement(temp, /*location*/ parameter),
                createBlock([
                    startOnNewLine(
                        createStatement(
                            createAssignment(
                                createElementAccess(
                                    expressionName,
                                    createSubtract(temp, createLiteral(restIndex))
                                ),
                                createElementAccess(createIdentifier("arguments"), temp)
                            ),
                            /*location*/ parameter
                        )
                    )
                ])
            );

            setEmitFlags(forStatement, EmitFlags.CustomPrologue);
            startOnNewLine(forStatement);
            statements.push(forStatement);
        }

        /**
         * Adds a statement to capture the `this` of a function declaration if it is needed.
         *
         * @param statements The statements for the new function body.
         * @param node A node.
         */
        function addCaptureThisForNodeIfNeeded(statements: Statement[], node: Node): void {
            if (node.transformFlags & TransformFlags.ContainsCapturedLexicalThis && node.kind !== SyntaxKind.ArrowFunction) {
                captureThisForNode(statements, node, createThis());
            }
        }

        function captureThisForNode(statements: Statement[], node: Node, initializer: Expression | undefined, originalStatement?: Statement): void {
            enableSubstitutionsForCapturedThis();
            const captureThisStatement = createVariableStatement(
                /*modifiers*/ undefined,
                createVariableDeclarationList([
                    createVariableDeclaration(
                        "_this",
                        /*type*/ undefined,
                        initializer
                    )
                ]),
                originalStatement
            );

            setEmitFlags(captureThisStatement, EmitFlags.NoComments | EmitFlags.CustomPrologue);
            setSourceMapRange(captureThisStatement, node);
            statements.push(captureThisStatement);
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
            const commentRange = getCommentRange(member);
            const sourceMapRange = getSourceMapRange(member);

            const func = transformFunctionLikeToExpression(member, /*location*/ member, /*name*/ undefined);
            setEmitFlags(func, EmitFlags.NoComments);
            setSourceMapRange(func, sourceMapRange);

            const statement = createStatement(
                createAssignment(
                    createMemberAccessForPropertyName(
                        receiver,
                        visitNode(member.name, visitor, isPropertyName),
                        /*location*/ member.name
                    ),
                    func
                ),
                /*location*/ member
            );

            setOriginalNode(statement, member);
            setCommentRange(statement, commentRange);

            // The location for the statement is used to emit comments only.
            // No source map should be emitted for this statement to align with the
            // old emitter.
            setEmitFlags(statement, EmitFlags.NoSourceMap);
            return statement;
        }

        /**
         * Transforms a set of related of get/set accessors into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param accessors The set of related get/set accessors.
         */
        function transformAccessorsToStatement(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations): Statement {
            const statement = createStatement(
                transformAccessorsToExpression(receiver, accessors, /*startsOnNewLine*/ false),
                /*location*/ getSourceMapRange(accessors.firstAccessor)
            );

            // The location for the statement is used to emit source maps only.
            // No comments should be emitted for this statement to align with the
            // old emitter.
            setEmitFlags(statement, EmitFlags.NoComments);
            return statement;
        }

        /**
         * Transforms a set of related get/set accessors into an expression for either a class
         * body function or an ObjectLiteralExpression with computed properties.
         *
         * @param receiver The receiver for the member.
         */
        function transformAccessorsToExpression(receiver: LeftHandSideExpression, { firstAccessor, getAccessor, setAccessor }: AllAccessorDeclarations, startsOnNewLine: boolean): Expression {
            // To align with source maps in the old emitter, the receiver and property name
            // arguments are both mapped contiguously to the accessor name.
            const target = getMutableClone(receiver);
            setEmitFlags(target, EmitFlags.NoComments | EmitFlags.NoTrailingSourceMap);
            setSourceMapRange(target, firstAccessor.name);

            const propertyName = createExpressionForPropertyName(visitNode(firstAccessor.name, visitor, isPropertyName));
            setEmitFlags(propertyName, EmitFlags.NoComments | EmitFlags.NoLeadingSourceMap);
            setSourceMapRange(propertyName, firstAccessor.name);

            const properties: ObjectLiteralElementLike[] = [];
            if (getAccessor) {
                const getterFunction = transformFunctionLikeToExpression(getAccessor, /*location*/ undefined, /*name*/ undefined);
                setSourceMapRange(getterFunction, getSourceMapRange(getAccessor));
                setEmitFlags(getterFunction, EmitFlags.NoLeadingComments);
                const getter = createPropertyAssignment("get", getterFunction);
                setCommentRange(getter, getCommentRange(getAccessor));
                properties.push(getter);
            }

            if (setAccessor) {
                const setterFunction = transformFunctionLikeToExpression(setAccessor, /*location*/ undefined, /*name*/ undefined);
                setSourceMapRange(setterFunction, getSourceMapRange(setAccessor));
                setEmitFlags(setterFunction, EmitFlags.NoLeadingComments);
                const setter = createPropertyAssignment("set", setterFunction);
                setCommentRange(setter, getCommentRange(setAccessor));
                properties.push(setter);
            }

            properties.push(
                createPropertyAssignment("enumerable", createLiteral(true)),
                createPropertyAssignment("configurable", createLiteral(true))
            );

            const call = createCall(
                createPropertyAccess(createIdentifier("Object"), "defineProperty"),
                /*typeArguments*/ undefined,
                [
                    target,
                    propertyName,
                    createObjectLiteral(properties, /*location*/ undefined, /*multiLine*/ true)
                ]
            );
            if (startsOnNewLine) {
                call.startsOnNewLine = true;
            }
            return call;
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

            const func = transformFunctionLikeToExpression(node, /*location*/ node, /*name*/ undefined);
            setEmitFlags(func, EmitFlags.CapturesThis);
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
            return setOriginalNode(
                createFunctionDeclaration(
                    /*decorators*/ undefined,
                    node.modifiers,
                    node.asteriskToken,
                    node.name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    transformFunctionBody(node),
                    /*location*/ node
                ),
                /*original*/ node);
        }

        /**
         * Transforms a function-like node into a FunctionExpression.
         *
         * @param node The function-like node to transform.
         * @param location The source-map location for the new FunctionExpression.
         * @param name The name of the new FunctionExpression.
         */
        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location: TextRange, name: Identifier): FunctionExpression {
            const savedContainingNonArrowFunction = enclosingNonArrowFunction;
            if (node.kind !== SyntaxKind.ArrowFunction) {
                enclosingNonArrowFunction = node;
            }

            const expression = setOriginalNode(
                createFunctionExpression(
                    /*modifiers*/ undefined,
                    node.asteriskToken,
                    name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    saveStateAndInvoke(node, transformFunctionBody),
                    location
                ),
                /*original*/ node
            );

            enclosingNonArrowFunction = savedContainingNonArrowFunction;
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
            let closeBraceLocation: TextRange;

            const statements: Statement[] = [];
            const body = node.body;
            let statementOffset: number;

            startLexicalEnvironment();
            if (isBlock(body)) {
                // ensureUseStrict is false because no new prologue-directive should be added.
                // addPrologueDirectives will simply put already-existing directives at the beginning of the target statement-array
                statementOffset = addPrologueDirectives(statements, body.statements, /*ensureUseStrict*/ false, visitor);
            }

            addCaptureThisForNodeIfNeeded(statements, node);
            addDefaultValueAssignmentsIfNeeded(statements, node);
            addRestParameterIfNeeded(statements, node, /*inConstructorWithSynthesizedSuper*/ false);

            // If we added any generated statements, this must be a multi-line block.
            if (!multiLine && statements.length > 0) {
                multiLine = true;
            }

            if (isBlock(body)) {
                statementsLocation = body.statements;
                addRange(statements, visitNodes(body.statements, visitor, isStatement, statementOffset));

                // If the original body was a multi-line block, this must be a multi-line block.
                if (!multiLine && body.multiLine) {
                    multiLine = true;
                }
            }
            else {
                Debug.assert(node.kind === SyntaxKind.ArrowFunction);

                // To align with the old emitter, we use a synthetic end position on the location
                // for the statement list we synthesize when we down-level an arrow function with
                // an expression function body. This prevents both comments and source maps from
                // being emitted for the end position only.
                statementsLocation = moveRangeEnd(body, -1);

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
                const returnStatement = createReturn(expression, /*location*/ body);
                setEmitFlags(returnStatement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTrailingComments);
                statements.push(returnStatement);

                // To align with the source map emit for the old emitter, we set a custom
                // source map location for the close brace.
                closeBraceLocation = body;
            }

            const lexicalEnvironment = endLexicalEnvironment();
            addRange(statements, lexicalEnvironment);

            // If we added any final generated statements, this must be a multi-line block
            if (!multiLine && lexicalEnvironment && lexicalEnvironment.length) {
                multiLine = true;
            }

            const block = createBlock(createNodeArray(statements, statementsLocation), node.body, multiLine);
            if (!multiLine && singleLine) {
                setEmitFlags(block, EmitFlags.SingleLine);
            }

            if (closeBraceLocation) {
                setTokenSourceMapRange(block, SyntaxKind.CloseBraceToken, closeBraceLocation);
            }

            setOriginalNode(block, node.body);
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
                    return updateStatement(node,
                        visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false)
                    );

                case SyntaxKind.BinaryExpression:
                    return updateStatement(node,
                        visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false)
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
                            assignment = flattenVariableDestructuringToExpression(decl, hoistVariableDeclaration, /*createAssignmentCallback*/ undefined, visitor);
                        }
                        else {
                            assignment = createBinary(<Identifier>decl.name, SyntaxKind.EqualsToken, visitNode(decl.initializer, visitor, isExpression));
                        }
                        (assignments || (assignments = [])).push(assignment);
                    }
                }
                if (assignments) {
                    return createStatement(reduceLeft(assignments, (acc, v) => createBinary(v, SyntaxKind.CommaToken, acc)), node);
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
            if (node.flags & NodeFlags.BlockScoped) {
                enableSubstitutionsForBlockScopedBindings();
            }

            const declarations = flatten(map(node.declarations, node.flags & NodeFlags.Let
                ? visitVariableDeclarationInLetDeclarationList
                : visitVariableDeclaration));

            const declarationList = createVariableDeclarationList(declarations, /*location*/ node);
            setOriginalNode(declarationList, node);
            setCommentRange(declarationList, node);

            if (node.transformFlags & TransformFlags.ContainsBindingPattern
                && (isBindingPattern(node.declarations[0].name)
                    || isBindingPattern(lastOrUndefined(node.declarations).name))) {
                // If the first or last declaration is a binding pattern, we need to modify
                // the source map range for the declaration list.
                const firstDeclaration = firstOrUndefined(declarations);
                const lastDeclaration = lastOrUndefined(declarations);
                setSourceMapRange(declarationList, createRange(firstDeclaration.pos, lastDeclaration.end));
            }

            return declarationList;
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
            if (isBindingPattern(node.name)) {
                const recordTempVariablesInLine = !enclosingVariableStatement
                    || !hasModifier(enclosingVariableStatement, ModifierFlags.Export);
                return flattenVariableDestructuring(node, /*value*/ undefined, visitor,
                    recordTempVariablesInLine ? undefined : hoistVariableDeclaration);
            }

            return visitEachChild(node, visitor, context);
        }

        function visitLabeledStatement(node: LabeledStatement): VisitResult<Statement> {
            if (convertedLoopState) {
                if (!convertedLoopState.labels) {
                    convertedLoopState.labels = createMap<string>();
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

            const expression = visitNode(node.expression, visitor, isExpression);
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
                if (initializer.flags & NodeFlags.BlockScoped) {
                    enableSubstitutionsForBlockScopedBindings();
                }

                const firstOriginalDeclaration = firstOrUndefined(initializer.declarations);
                if (firstOriginalDeclaration && isBindingPattern(firstOriginalDeclaration.name)) {
                    // This works whether the declaration is a var, let, or const.
                    // It will use rhsIterationValue _a[_i] as the initializer.
                    const declarations = flattenVariableDestructuring(
                        firstOriginalDeclaration,
                        createElementAccess(rhsReference, counter),
                        visitor
                    );

                    const declarationList = createVariableDeclarationList(declarations, /*location*/ initializer);
                    setOriginalNode(declarationList, initializer);

                    // Adjust the source map range for the first declaration to align with the old
                    // emitter.
                    const firstDeclaration = declarations[0];
                    const lastDeclaration = lastOrUndefined(declarations);
                    setSourceMapRange(declarationList, createRange(firstDeclaration.pos, lastDeclaration.end));

                    statements.push(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            declarationList
                        )
                    );
                }
                else {
                    // The following call does not include the initializer, so we have
                    // to emit it separately.
                    statements.push(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            setOriginalNode(
                                createVariableDeclarationList([
                                    createVariableDeclaration(
                                        firstOriginalDeclaration ? firstOriginalDeclaration.name : createTempVariable(/*recordTempVariable*/ undefined),
                                        /*type*/ undefined,
                                        createElementAccess(rhsReference, counter)
                                    )
                                ], /*location*/ moveRangePos(initializer, -1)),
                                initializer
                            ),
                            /*location*/ moveRangeEnd(initializer, -1)
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
                    // Currently there is not way to check that assignment is binary expression of destructing assignment
                    // so we have to cast never type to binaryExpression
                    (<BinaryExpression>assignment).end = initializer.end;
                    statements.push(createStatement(assignment, /*location*/ moveRangeEnd(initializer, -1)));
                }
            }

            let bodyLocation: TextRange;
            let statementsLocation: TextRange;
            if (convertedLoopBodyStatements) {
                addRange(statements, convertedLoopBodyStatements);
            }
            else {
                const statement = visitNode(node.statement, visitor, isStatement);
                if (isBlock(statement)) {
                    addRange(statements, statement.statements);
                    bodyLocation = statement;
                    statementsLocation = statement.statements;
                }
                else {
                    statements.push(statement);
                }
            }

            // The old emitter does not emit source maps for the expression
            setEmitFlags(expression, EmitFlags.NoSourceMap | getEmitFlags(expression));

            // The old emitter does not emit source maps for the block.
            // We add the location to preserve comments.
            const body = createBlock(
                createNodeArray(statements, /*location*/ statementsLocation),
                /*location*/ bodyLocation
            );

            setEmitFlags(body, EmitFlags.NoSourceMap | EmitFlags.NoTokenSourceMaps);

            const forStatement = createFor(
                setEmitFlags(
                    createVariableDeclarationList([
                        createVariableDeclaration(counter, /*type*/ undefined, createLiteral(0), /*location*/ moveRangePos(node.expression, -1)),
                        createVariableDeclaration(rhsReference, /*type*/ undefined, expression, /*location*/ node.expression)
                    ], /*location*/ node.expression),
                    EmitFlags.NoHoisting
                ),
                createLessThan(
                    counter,
                    createPropertyAccess(rhsReference, "length"),
                    /*location*/ node.expression
                ),
                createPostfixIncrement(counter, /*location*/ node.expression),
                body,
                /*location*/ node
            );

            // Disable trailing source maps for the OpenParenToken to align source map emit with the old emitter.
            setEmitFlags(forStatement, EmitFlags.NoTokenTrailingSourceMaps);
            return forStatement;
        }

        /**
         * Visits an ObjectLiteralExpression with computed propety names.
         *
         * @param node An ObjectLiteralExpression node.
         */
        function visitObjectLiteralExpression(node: ObjectLiteralExpression): Expression {
            // We are here because a ComputedPropertyName was used somewhere in the expression.
            const properties = node.properties;
            const numProperties = properties.length;

            // Find the first computed property.
            // Everything until that point can be emitted as part of the initial object literal.
            let numInitialProperties = numProperties;
            for (let i = 0; i < numProperties; i++) {
                const property = properties[i];
                if (property.transformFlags & TransformFlags.ContainsYield
                    || property.name.kind === SyntaxKind.ComputedPropertyName) {
                    numInitialProperties = i;
                    break;
                }
            }

            Debug.assert(numInitialProperties !== numProperties);

            // For computed properties, we need to create a unique handle to the object
            // literal so we can modify it without risking internal assignments tainting the object.
            const temp = createTempVariable(hoistVariableDeclaration);

            // Write out the first non-computed properties, then emit the rest through indexing on the temp variable.
            const expressions: Expression[] = [];
            const assignment = createAssignment(
                temp,
                setEmitFlags(
                    createObjectLiteral(
                        visitNodes(properties, visitor, isObjectLiteralElementLike, 0, numInitialProperties),
                        /*location*/ undefined,
                        node.multiLine
                    ),
                    EmitFlags.Indented
                )
            );
            if (node.multiLine) {
                assignment.startsOnNewLine = true;
            }
            expressions.push(assignment);

            addObjectLiteralMembers(expressions, node, temp, numInitialProperties);

            // We need to clone the temporary identifier so that we can write it on a
            // new line
            expressions.push(node.multiLine ? startOnNewLine(getMutableClone(temp)) : temp);
            return inlineExpressions(expressions);
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
                        if (!isOmittedExpression(element)) {
                            visit(element.name);
                        }
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
                        loopInitializer = <VariableDeclarationList>initializer;
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

            const isAsyncBlockContainingAwait =
                enclosingNonArrowFunction
                && (getEmitFlags(enclosingNonArrowFunction) & EmitFlags.AsyncFunctionBody) !== 0
                && (node.statement.transformFlags & TransformFlags.ContainsYield) !== 0;

            let loopBodyFlags: EmitFlags = 0;
            if (currentState.containsLexicalThis) {
                loopBodyFlags |= EmitFlags.CapturesThis;
            }

            if (isAsyncBlockContainingAwait) {
                loopBodyFlags |= EmitFlags.AsyncFunctionBody;
            }

            const convertedLoopVariable =
                createVariableStatement(
                    /*modifiers*/ undefined,
                    setEmitFlags(
                        createVariableDeclarationList(
                            [
                                createVariableDeclaration(
                                    functionName,
                                    /*type*/ undefined,
                                    setEmitFlags(
                                        createFunctionExpression(
                                            /*modifiers*/ undefined,
                                            isAsyncBlockContainingAwait ? createToken(SyntaxKind.AsteriskToken) : undefined,
                                            /*name*/ undefined,
                                            /*typeParameters*/ undefined,
                                            loopParameters,
                                            /*type*/ undefined,
                                            <Block>loopBody
                                        ),
                                        loopBodyFlags
                                    )
                                )
                            ]
                        ),
                        EmitFlags.NoHoisting
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
                            /*type*/ undefined,
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
                            /*type*/ undefined,
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
                    for (const identifier of currentState.hoistedLocalVariables) {
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

            const convertedLoopBodyStatements = generateCallToConvertedLoop(functionName, loopParameters, currentState, isAsyncBlockContainingAwait);
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
                    convertedLoopBodyStatements,
                    /*location*/ undefined,
                    /*multiline*/ true
                );

                // reset and re-aggregate the transform flags
                loop.transformFlags = 0;
                aggregateTransformFlags(loop);
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

        function generateCallToConvertedLoop(loopFunctionExpressionName: Identifier, parameters: ParameterDeclaration[], state: ConvertedLoopState, isAsyncBlockContainingAwait: boolean): Statement[] {
            const outerConvertedLoopState = convertedLoopState;

            const statements: Statement[] = [];
            // loop is considered simple if it does not have any return statements or break\continue that transfer control outside of the loop
            // simple loops are emitted as just 'loop()';
            // NOTE: if loop uses only 'continue' it still will be emitted as simple loop
            const isSimpleLoop =
                !(state.nonLocalJumps & ~Jump.Continue) &&
                !state.labeledNonLocalBreaks &&
                !state.labeledNonLocalContinues;

            const call = createCall(loopFunctionExpressionName, /*typeArguments*/ undefined, map(parameters, p => <Identifier>p.name));
            const callResult = isAsyncBlockContainingAwait ? createYield(createToken(SyntaxKind.AsteriskToken), call) : call;
            if (isSimpleLoop) {
                statements.push(createStatement(callResult));
                copyOutParameters(state.loopOutParameters, CopyDirection.ToOriginal, statements);
            }
            else {
                const loopResultName = createUniqueName("state");
                const stateVariable = createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(
                        [createVariableDeclaration(loopResultName, /*type*/ undefined, callResult)]
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
                    state.labeledNonLocalBreaks = createMap<string>();
                }
                state.labeledNonLocalBreaks[labelText] = labelMarker;
            }
            else {
                if (!state.labeledNonLocalContinues) {
                    state.labeledNonLocalContinues = createMap<string>();
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
                    if (!isOmittedExpression(element)) {
                        processLoopVariableDeclaration(element, loopParameters, loopOutParameters);
                    }
                }
            }
            else {
                loopParameters.push(createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, name));
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
        function addObjectLiteralMembers(expressions: Expression[], node: ObjectLiteralExpression, receiver: Identifier, start: number) {
            const properties = node.properties;
            const numProperties = properties.length;
            for (let i = start; i < numProperties; i++) {
                const property = properties[i];
                switch (property.kind) {
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.properties, <AccessorDeclaration>property);
                        if (property === accessors.firstAccessor) {
                            expressions.push(transformAccessorsToExpression(receiver, accessors, node.multiLine));
                        }

                        break;

                    case SyntaxKind.PropertyAssignment:
                        expressions.push(transformPropertyAssignmentToExpression(<PropertyAssignment>property, receiver, node.multiLine));
                        break;

                    case SyntaxKind.ShorthandPropertyAssignment:
                        expressions.push(transformShorthandPropertyAssignmentToExpression(<ShorthandPropertyAssignment>property, receiver, node.multiLine));
                        break;

                    case SyntaxKind.MethodDeclaration:
                        expressions.push(transformObjectLiteralMethodDeclarationToExpression(<MethodDeclaration>property, receiver, node.multiLine));
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
        function transformPropertyAssignmentToExpression(property: PropertyAssignment, receiver: Expression, startsOnNewLine: boolean) {
            const expression = createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(property.name, visitor, isPropertyName)
                ),
                visitNode(property.initializer, visitor, isExpression),
                /*location*/ property
            );
            if (startsOnNewLine) {
                expression.startsOnNewLine = true;
            }
            return expression;
        }

        /**
         * Transforms a ShorthandPropertyAssignment node into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the ShorthandPropertyAssignment.
         * @param property The ShorthandPropertyAssignment node.
         * @param receiver The receiver for the assignment.
         */
        function transformShorthandPropertyAssignmentToExpression(property: ShorthandPropertyAssignment, receiver: Expression, startsOnNewLine: boolean) {
            const expression = createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(property.name, visitor, isPropertyName)
                ),
                getSynthesizedClone(property.name),
                /*location*/ property
            );
            if (startsOnNewLine) {
                expression.startsOnNewLine = true;
            }
            return expression;
        }

        /**
         * Transforms a MethodDeclaration of an ObjectLiteralExpression into an expression.
         *
         * @param node The ObjectLiteralExpression that contains the MethodDeclaration.
         * @param method The MethodDeclaration node.
         * @param receiver The receiver for the assignment.
         */
        function transformObjectLiteralMethodDeclarationToExpression(method: MethodDeclaration, receiver: Expression, startsOnNewLine: boolean) {
            const expression = createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(method.name, visitor, isPropertyName)
                ),
                transformFunctionLikeToExpression(method, /*location*/ method, /*name*/ undefined),
                /*location*/ method
            );
            if (startsOnNewLine) {
                expression.startsOnNewLine = true;
            }
            return expression;
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            Debug.assert(isBindingPattern(node.variableDeclaration.name));

            const temp = createTempVariable(undefined);
            const newVariableDeclaration = createVariableDeclaration(temp, undefined, undefined, node.variableDeclaration);

            const vars = flattenVariableDestructuring(node.variableDeclaration, temp, visitor);
            const list = createVariableDeclarationList(vars, /*location*/node.variableDeclaration, /*flags*/node.variableDeclaration.flags);
            const destructure = createVariableStatement(undefined, list);

            return updateCatchClause(node, newVariableDeclaration, addStatementToStartOfBlock(node.block, destructure));
        }

        function addStatementToStartOfBlock(block: Block, statement: Statement): Block {
            const transformedStatements = visitNodes(block.statements, visitor, isStatement);
            return updateBlock(block, [statement].concat(transformedStatements));
        }

        /**
         * Visits a MethodDeclaration of an ObjectLiteralExpression and transforms it into a
         * PropertyAssignment.
         *
         * @param node A MethodDeclaration node.
         */
        function visitMethodDeclaration(node: MethodDeclaration): ObjectLiteralElementLike {
            // We should only get here for methods on an object literal with regular identifier names.
            // Methods on classes are handled in visitClassDeclaration/visitClassExpression.
            // Methods with computed property names are handled in visitObjectLiteralExpression.
            Debug.assert(!isComputedPropertyName(node.name));
            const functionExpression = transformFunctionLikeToExpression(node, /*location*/ moveRangePos(node, -1), /*name*/ undefined);
            setEmitFlags(functionExpression, EmitFlags.NoLeadingComments | getEmitFlags(functionExpression));
            return createPropertyAssignment(
                node.name,
                functionExpression,
                /*location*/ node
            );
        }

        /**
         * Visits a ShorthandPropertyAssignment and transforms it into a PropertyAssignment.
         *
         * @param node A ShorthandPropertyAssignment node.
         */
        function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElementLike {
            return createPropertyAssignment(
                node.name,
                getSynthesizedClone(node.name),
                /*location*/ node
            );
        }

        /**
         * Visits a YieldExpression node.
         *
         * @param node A YieldExpression node.
         */
        function visitYieldExpression(node: YieldExpression): Expression {
            // `yield` expressions are transformed using the generators transformer.
            return visitEachChild(node, visitor, context);
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
        function visitCallExpression(node: CallExpression) {
            return visitCallExpressionWithPotentialCapturedThisAssignment(node, /*assignToCapturedThis*/ true);
        }

        function visitImmediateSuperCallInBody(node: CallExpression) {
            return visitCallExpressionWithPotentialCapturedThisAssignment(node, /*assignToCapturedThis*/ false);
        }

        function visitCallExpressionWithPotentialCapturedThisAssignment(node: CallExpression, assignToCapturedThis: boolean): CallExpression | BinaryExpression {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.

            const { target, thisArg } = createCallBinding(node.expression, hoistVariableDeclaration);
            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                setEmitFlags(thisArg, EmitFlags.NoSubstitution);
            }
            let resultingCall: CallExpression | BinaryExpression;
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

                resultingCall = createFunctionApply(
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

                resultingCall = createFunctionCall(
                    visitNode(target, visitor, isExpression),
                    visitNode(thisArg, visitor, isExpression),
                    visitNodes(node.arguments, visitor, isExpression),
                    /*location*/ node
                );
            }

            if (node.expression.kind === SyntaxKind.SuperKeyword) {
                const actualThis = createThis();
                setEmitFlags(actualThis, EmitFlags.NoSubstitution);
                const initializer =
                    createLogicalOr(
                        resultingCall,
                        actualThis
                    );
                return assignToCapturedThis
                    ? createAssignment(createIdentifier("_this"), initializer)
                    : initializer;
            }
            return resultingCall;
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
                /*typeArguments*/ undefined,
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
                spanMap(elements, partitionSpreadElement, (partition, visitPartition, _start, end) =>
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

        function visitSpanOfSpreadElements(chunk: Expression[]): VisitResult<Expression> {
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
                    createCall(tag, /*typeArguments*/ undefined, templateArguments)
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
        function visitSuperKeyword(): LeftHandSideExpression {
            return enclosingNonAsyncFunctionBody
                && isClassElement(enclosingNonAsyncFunctionBody)
                && !hasModifier(enclosingNonAsyncFunctionBody, ModifierFlags.Static)
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
        function onEmitNode(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void) {
            const savedEnclosingFunction = enclosingFunction;

            if (enabledSubstitutions & ES2015SubstitutionFlags.CapturedThis && isFunctionLike(node)) {
                // If we are tracking a captured `this`, keep track of the enclosing function.
                enclosingFunction = node;
            }

            previousOnEmitNode(emitContext, node, emitCallback);

            enclosingFunction = savedEnclosingFunction;
        }

        /**
         * Enables a more costly code path for substitutions when we determine a source file
         * contains block-scoped bindings (e.g. `let` or `const`).
         */
        function enableSubstitutionsForBlockScopedBindings() {
            if ((enabledSubstitutions & ES2015SubstitutionFlags.BlockScopedBindings) === 0) {
                enabledSubstitutions |= ES2015SubstitutionFlags.BlockScopedBindings;
                context.enableSubstitution(SyntaxKind.Identifier);
            }
        }

        /**
         * Enables a more costly code path for substitutions when we determine a source file
         * contains a captured `this`.
         */
        function enableSubstitutionsForCapturedThis() {
            if ((enabledSubstitutions & ES2015SubstitutionFlags.CapturedThis) === 0) {
                enabledSubstitutions |= ES2015SubstitutionFlags.CapturedThis;
                context.enableSubstitution(SyntaxKind.ThisKeyword);
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
         * Hooks node substitutions.
         *
         * @param emitContext The context for the emitter.
         * @param node The node to substitute.
         */
        function onSubstituteNode(emitContext: EmitContext, node: Node) {
            node = previousOnSubstituteNode(emitContext, node);

            if (emitContext === EmitContext.Expression) {
                return substituteExpression(node);
            }

            if (isIdentifier(node)) {
                return substituteIdentifier(node);
            }

            return node;
        }

        /**
         * Hooks substitutions for non-expression identifiers.
         */
        function substituteIdentifier(node: Identifier) {
            // Only substitute the identifier if we have enabled substitutions for block-scoped
            // bindings.
            if (enabledSubstitutions & ES2015SubstitutionFlags.BlockScopedBindings) {
                const original = getParseTreeNode(node, isIdentifier);
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
        function substituteExpression(node: Node) {
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
            if (enabledSubstitutions & ES2015SubstitutionFlags.BlockScopedBindings) {
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
            if (enabledSubstitutions & ES2015SubstitutionFlags.CapturedThis
                && enclosingFunction
                && getEmitFlags(enclosingFunction) & EmitFlags.CapturesThis) {
                return createIdentifier("_this", /*location*/ node);
            }

            return node;
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            const expression = getLocalName(node);
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
