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
        labels?: Map<boolean>;
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

    type LoopConverter = (node: IterationStatement, outermostLabeledStatement: LabeledStatement, convertedLoopBodyStatements: Statement[]) => Statement;

    // Facts we track as we traverse the tree
    const enum HierarchyFacts {
        None = 0,

        //
        // Ancestor facts
        //

        Function = 1 << 0,                      // Enclosed in a non-arrow function
        ArrowFunction = 1 << 1,                 // Enclosed in an arrow function
        AsyncFunctionBody = 1 << 2,             // Enclosed in an async function body
        NonStaticClassElement = 1 << 3,         // Enclosed in a non-static, non-async class element
        CapturesThis = 1 << 4,                  // Enclosed in a function that captures the lexical 'this' (used in substitution)
        ExportedVariableStatement = 1 << 5,     // Enclosed in an exported variable statement in the current scope
        TopLevel = 1 << 6,                      // Enclosing block-scoped container is a top-level container
        Block = 1 << 7,                         // Enclosing block-scoped container is a Block
        IterationStatement = 1 << 8,            // Enclosed in an IterationStatement
        IterationStatementBlock = 1 << 9,       // Enclosing Block is enclosed in an IterationStatement
        ForStatement = 1 << 10,                 // Enclosing block-scoped container is a ForStatement
        ForInOrForOfStatement = 1 << 11,        // Enclosing block-scoped container is a ForInStatement or ForOfStatement
        ConstructorWithCapturedSuper = 1 << 12, // Enclosed in a constructor that captures 'this' for use with 'super'
        ComputedPropertyName = 1 << 13,         // Enclosed in a computed property name
        // NOTE: do not add more ancestor flags without also updating AncestorFactsMask below.

        //
        // Ancestor masks
        //

        AncestorFactsMask = (ComputedPropertyName << 1) - 1,

        // We are always in *some* kind of block scope, but only specific block-scope containers are
        // top-level or Blocks.
        BlockScopeIncludes = None,
        BlockScopeExcludes = TopLevel | Block | IterationStatement | IterationStatementBlock | ForStatement | ForInOrForOfStatement,

        // A source file is a top-level block scope.
        SourceFileIncludes = TopLevel,
        SourceFileExcludes = BlockScopeExcludes & ~TopLevel,

        // Functions, methods, and accessors are both new lexical scopes and new block scopes.
        FunctionIncludes = Function | TopLevel,
        FunctionExcludes = BlockScopeExcludes & ~TopLevel | ArrowFunction | AsyncFunctionBody | CapturesThis | NonStaticClassElement | ConstructorWithCapturedSuper | ComputedPropertyName,

        AsyncFunctionBodyIncludes = FunctionIncludes | AsyncFunctionBody,
        AsyncFunctionBodyExcludes = FunctionExcludes & ~NonStaticClassElement,

        // Arrow functions are lexically scoped to their container, but are new block scopes.
        ArrowFunctionIncludes = ArrowFunction | TopLevel,
        ArrowFunctionExcludes = BlockScopeExcludes & ~TopLevel | ConstructorWithCapturedSuper | ComputedPropertyName,

        // Constructors are both new lexical scopes and new block scopes. Constructors are also
        // always considered non-static members of a class.
        ConstructorIncludes = FunctionIncludes | NonStaticClassElement,
        ConstructorExcludes = FunctionExcludes & ~NonStaticClassElement,

        // 'do' and 'while' statements are not block scopes. We track that the subtree is contained
        // within an IterationStatement to indicate whether the embedded statement is an
        // IterationStatementBlock.
        DoOrWhileStatementIncludes = IterationStatement,
        DoOrWhileStatementExcludes = None,

        // 'for' statements are new block scopes and have special handling for 'let' declarations.
        ForStatementIncludes = IterationStatement | ForStatement,
        ForStatementExcludes = BlockScopeExcludes & ~ForStatement,

        // 'for-in' and 'for-of' statements are new block scopes and have special handling for
        // 'let' declarations.
        ForInOrForOfStatementIncludes = IterationStatement | ForInOrForOfStatement,
        ForInOrForOfStatementExcludes = BlockScopeExcludes & ~ForInOrForOfStatement,

        // Blocks (other than function bodies) are new block scopes.
        BlockIncludes = Block,
        BlockExcludes = BlockScopeExcludes & ~Block,

        IterationStatementBlockIncludes = IterationStatementBlock,
        IterationStatementBlockExcludes = BlockScopeExcludes,

        // Computed property names track subtree flags differently than their containing members.
        ComputedPropertyNameIncludes = ComputedPropertyName,
        ComputedPropertyNameExcludes = None,

        //
        // Subtree facts
        //
        NewTarget = 1 << 14,                        // Contains a 'new.target' meta-property
        NewTargetInComputedPropertyName = 1 << 15,  // Contains a 'new.target' meta-property in a computed property name.


        //
        // Subtree masks
        //

        SubtreeFactsMask = ~AncestorFactsMask,
        PropagateNewTargetMask = NewTarget | NewTargetInComputedPropertyName,
    }

    export function transformES2015(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;

        const compilerOptions = context.getCompilerOptions();
        const resolver = context.getEmitResolver();
        const previousOnSubstituteNode = context.onSubstituteNode;
        const previousOnEmitNode = context.onEmitNode;
        context.onEmitNode = onEmitNode;
        context.onSubstituteNode = onSubstituteNode;

        let currentSourceFile: SourceFile;
        let currentText: string;
        let hierarchyFacts: HierarchyFacts;
        let taggedTemplateStringDeclarations: VariableDeclaration[];

        function recordTaggedTemplateString(temp: Identifier) {
            taggedTemplateStringDeclarations = append(
                taggedTemplateStringDeclarations,
                createVariableDeclaration(temp));
        }

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

        return chainBundle(transformSourceFile);

        function transformSourceFile(node: SourceFile) {
            if (node.isDeclarationFile) {
                return node;
            }

            currentSourceFile = node;
            currentText = node.text;

            const visited = visitSourceFile(node);
            addEmitHelpers(visited, context.readEmitHelpers());

            currentSourceFile = undefined;
            currentText = undefined;
            taggedTemplateStringDeclarations = undefined;
            hierarchyFacts = HierarchyFacts.None;
            return visited;
        }

        /**
         * Sets the `HierarchyFacts` for this node prior to visiting this node's subtree, returning the facts set prior to modification.
         * @param excludeFacts The existing `HierarchyFacts` to reset before visiting the subtree.
         * @param includeFacts The new `HierarchyFacts` to set before visiting the subtree.
         */
        function enterSubtree(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
            const ancestorFacts = hierarchyFacts;
            hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & HierarchyFacts.AncestorFactsMask;
            return ancestorFacts;
        }

        /**
         * Restores the `HierarchyFacts` for this node's ancestor after visiting this node's
         * subtree, propagating specific facts from the subtree.
         * @param ancestorFacts The `HierarchyFacts` of the ancestor to restore after visiting the subtree.
         * @param excludeFacts The existing `HierarchyFacts` of the subtree that should not be propagated.
         * @param includeFacts The new `HierarchyFacts` of the subtree that should be propagated.
         */
        function exitSubtree(ancestorFacts: HierarchyFacts, excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts) {
            hierarchyFacts = (hierarchyFacts & ~excludeFacts | includeFacts) & HierarchyFacts.SubtreeFactsMask | ancestorFacts;
        }

        function isReturnVoidStatementInConstructorWithCapturedSuper(node: Node): boolean {
            return hierarchyFacts & HierarchyFacts.ConstructorWithCapturedSuper
                && node.kind === SyntaxKind.ReturnStatement
                && !(<ReturnStatement>node).expression;
        }

        function shouldVisitNode(node: Node): boolean {
            return (node.transformFlags & TransformFlags.ContainsES2015) !== 0
                || convertedLoopState !== undefined
                || (hierarchyFacts & HierarchyFacts.ConstructorWithCapturedSuper && (isStatement(node) || (node.kind === SyntaxKind.Block)))
                || (isIterationStatement(node, /*lookInLabeledStatements*/ false) && shouldConvertIterationStatementBody(node))
                || (getEmitFlags(node) & EmitFlags.TypeScriptClassWrapper) !== 0;
        }

        function visitor(node: Node): VisitResult<Node> {
            if (shouldVisitNode(node)) {
                return visitJavaScript(node);
            }
            else {
                return node;
            }
        }

        function functionBodyVisitor(node: Block): Block {
            if (shouldVisitNode(node)) {
                return visitBlock(node, /*isFunctionBody*/ true);
            }
            return node;
        }

        function callExpressionVisitor(node: Node): VisitResult<Node> {
            if (node.kind === SyntaxKind.SuperKeyword) {
                return visitSuperKeyword(/*isExpressionOfCall*/ true);
            }
            return visitor(node);
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

                case SyntaxKind.SwitchStatement:
                    return visitSwitchStatement(<SwitchStatement>node);

                case SyntaxKind.CaseBlock:
                    return visitCaseBlock(<CaseBlock>node);

                case SyntaxKind.Block:
                    return visitBlock(<Block>node, /*isFunctionBody*/ false);

                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    return visitBreakOrContinueStatement(<BreakOrContinueStatement>node);

                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);

                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    return visitDoOrWhileStatement(<DoStatement | WhileStatement>node, /*outermostLabeledStatement*/ undefined);

                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node, /*outermostLabeledStatement*/ undefined);

                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node, /*outermostLabeledStatement*/ undefined);

                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node, /*outermostLabeledStatement*/ undefined);

                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(<ExpressionStatement>node);

                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(<ObjectLiteralExpression>node);

                case SyntaxKind.CatchClause:
                    return visitCatchClause(<CatchClause>node);

                case SyntaxKind.ShorthandPropertyAssignment:
                    return visitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);

                case SyntaxKind.ComputedPropertyName:
                    return visitComputedPropertyName(<ComputedPropertyName>node);

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

                case SyntaxKind.StringLiteral:
                    return visitStringLiteral(<StringLiteral>node);

                case SyntaxKind.NumericLiteral:
                    return visitNumericLiteral(<NumericLiteral>node);

                case SyntaxKind.TaggedTemplateExpression:
                    return visitTaggedTemplateExpression(<TaggedTemplateExpression>node);

                case SyntaxKind.TemplateExpression:
                    return visitTemplateExpression(<TemplateExpression>node);

                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(<YieldExpression>node);

                case SyntaxKind.SpreadElement:
                    return visitSpreadElement(<SpreadElement>node);

                case SyntaxKind.SuperKeyword:
                    return visitSuperKeyword(/*isExpressionOfCall*/ false);

                case SyntaxKind.ThisKeyword:
                    return visitThisKeyword(node);

                case SyntaxKind.MetaProperty:
                    return visitMetaProperty(<MetaProperty>node);

                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(<MethodDeclaration>node);

                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return visitAccessorDeclaration(<AccessorDeclaration>node);

                case SyntaxKind.VariableStatement:
                    return visitVariableStatement(<VariableStatement>node);

                case SyntaxKind.ReturnStatement:
                    return visitReturnStatement(<ReturnStatement>node);

                default:
                    return visitEachChild(node, visitor, context);
            }
        }

        function visitSourceFile(node: SourceFile): SourceFile {
            const ancestorFacts = enterSubtree(HierarchyFacts.SourceFileExcludes, HierarchyFacts.SourceFileIncludes);
            const statements: Statement[] = [];
            startLexicalEnvironment();
            let statementOffset = addStandardPrologue(statements, node.statements, /*ensureUseStrict*/ false);
            addCaptureThisForNodeIfNeeded(statements, node);
            statementOffset = addCustomPrologue(statements, node.statements, statementOffset, visitor);
            addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            if (taggedTemplateStringDeclarations) {
                statements.push(
                    createVariableStatement(/*modifiers*/ undefined,
                        createVariableDeclarationList(taggedTemplateStringDeclarations)));
            }
            prependRange(statements, endLexicalEnvironment());
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updateSourceFileNode(
                node,
                setTextRange(createNodeArray(statements), node.statements)
            );
        }

        function visitSwitchStatement(node: SwitchStatement): SwitchStatement {
            if (convertedLoopState !== undefined) {
                const savedAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                // for switch statement allow only non-labeled break
                convertedLoopState.allowedNonLabeledJumps |= Jump.Break;
                const result = visitEachChild(node, visitor, context);
                convertedLoopState.allowedNonLabeledJumps = savedAllowedNonLabeledJumps;
                return result;
            }
            return visitEachChild(node, visitor, context);
        }

        function visitCaseBlock(node: CaseBlock): CaseBlock {
            const ancestorFacts = enterSubtree(HierarchyFacts.BlockScopeExcludes, HierarchyFacts.BlockScopeIncludes);
            const updated = visitEachChild(node, visitor, context);
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        function returnCapturedThis(node: Node): ReturnStatement {
            return setOriginalNode(createReturn(createFileLevelUniqueName("_this")), node);
        }

        function visitReturnStatement(node: ReturnStatement): Statement {
            if (convertedLoopState) {
                convertedLoopState.nonLocalJumps |= Jump.Return;
                if (isReturnVoidStatementInConstructorWithCapturedSuper(node)) {
                    node = returnCapturedThis(node);
                }
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
            else if (isReturnVoidStatementInConstructorWithCapturedSuper(node)) {
                return returnCapturedThis(node);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitThisKeyword(node: Node): Node {
            if (convertedLoopState) {
                if (hierarchyFacts & HierarchyFacts.ArrowFunction) {
                    // if the enclosing function is an ArrowFunction then we use the captured 'this' keyword.
                    convertedLoopState.containsLexicalThis = true;
                    return node;
                }
                return convertedLoopState.thisName || (convertedLoopState.thisName = createUniqueName("this"));
            }
            return node;
        }

        function visitIdentifier(node: Identifier): Identifier {
            if (!convertedLoopState) {
                return node;
            }
            if (isGeneratedIdentifier(node)) {
                return node;
            }
            if (node.escapedText !== "arguments" || !resolver.isArgumentsLocalBinding(node)) {
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
                    (node.label && convertedLoopState.labels && convertedLoopState.labels.get(idText(node.label))) ||
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
                            labelMarker = `break-${node.label.escapedText}`;
                            setLabeledJump(convertedLoopState, /*isBreak*/ true, idText(node.label), labelMarker);
                        }
                        else {
                            labelMarker = `continue-${node.label.escapedText}`;
                            setLabeledJump(convertedLoopState, /*isBreak*/ false, idText(node.label), labelMarker);
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
            const statement = createVariableStatement(/*modifiers*/ undefined, createVariableDeclarationList([variable]));

            setOriginalNode(statement, node);
            setTextRange(statement, node);
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
                extendsClauseElement ? [createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, createFileLevelUniqueName("_super"))] : [],
                /*type*/ undefined,
                transformClassBody(node, extendsClauseElement)
            );

            // To preserve the behavior of the old emitter, we explicitly indent
            // the body of the function here if it was requested in an earlier
            // transformation.
            setEmitFlags(classFunction, (getEmitFlags(node) & EmitFlags.Indented) | EmitFlags.ReuseTempVariableScope);

            // "inner" and "outer" below are added purely to preserve source map locations from
            // the old emitter
            const inner = createPartiallyEmittedExpression(classFunction);
            inner.end = node.end;
            setEmitFlags(inner, EmitFlags.NoComments);

            const outer = createPartiallyEmittedExpression(inner);
            outer.end = skipTrivia(currentText, node.pos);
            setEmitFlags(outer, EmitFlags.NoComments);

            const result = createParen(
                createCall(
                    outer,
                    /*typeArguments*/ undefined,
                    extendsClauseElement
                        ? [visitNode(extendsClauseElement.expression, visitor, isExpression)]
                        : []
                )
            );
            addSyntheticLeadingComment(result, SyntaxKind.MultiLineCommentTrivia, "* @class ");
            return result;
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
            const localName = getInternalName(node);

            // The following partially-emitted expression exists purely to align our sourcemap
            // emit with the original emitter.
            const outer = createPartiallyEmittedExpression(localName);
            outer.end = closingBraceLocation.end;
            setEmitFlags(outer, EmitFlags.NoComments);

            const statement = createReturn(outer);
            statement.pos = closingBraceLocation.pos;
            setEmitFlags(statement, EmitFlags.NoComments | EmitFlags.NoTokenSourceMaps);
            statements.push(statement);

            prependRange(statements, endLexicalEnvironment());

            const block = createBlock(setTextRange(createNodeArray(statements), /*location*/ node.members), /*multiLine*/ true);
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
                    setTextRange(
                        createStatement(
                            createExtendsHelper(context, getInternalName(node))
                        ),
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
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const ancestorFacts = enterSubtree(HierarchyFacts.ConstructorExcludes, HierarchyFacts.ConstructorIncludes);
            const constructor = getFirstConstructorWithBody(node);
            const hasSynthesizedSuper = hasSynthesizedDefaultSuperCall(constructor, extendsClauseElement !== undefined);
            const constructorFunction = createFunctionDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                getInternalName(node),
                /*typeParameters*/ undefined,
                transformConstructorParameters(constructor, hasSynthesizedSuper),
                /*type*/ undefined,
                transformConstructorBody(constructor, node, extendsClauseElement, hasSynthesizedSuper)
            );

            setTextRange(constructorFunction, constructor || node);
            if (extendsClauseElement) {
                setEmitFlags(constructorFunction, EmitFlags.CapturesThis);
            }

            statements.push(constructorFunction);
            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
        }

        /**
         * Transforms the parameters of the constructor declaration of a class.
         *
         * @param constructor The constructor for the class.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorParameters(constructor: ConstructorDeclaration, hasSynthesizedSuper: boolean) {
            // If the TypeScript transformer needed to synthesize a constructor for property
            // initializers, it would have also added a synthetic `...args` parameter and
            // `super` call.
            // If this is the case, we do not include the synthetic `...args` parameter and
            // will instead use the `arguments` object in ES5/3.
            return visitParameterList(constructor && !hasSynthesizedSuper && constructor.parameters, visitor, context)
                || <ParameterDeclaration[]>[];
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
            resumeLexicalEnvironment();

            let statementOffset = -1;
            if (hasSynthesizedSuper) {
                // If a super call has already been synthesized,
                // we're going to assume that we should just transform everything after that.
                // The assumption is that no prior step in the pipeline has added any prologue directives.
                statementOffset = 0;
            }
            else if (constructor) {
                statementOffset = addStandardPrologue(statements, constructor.body.statements, /*ensureUseStrict*/ false);
            }

            if (constructor) {
                addDefaultValueAssignmentsIfNeeded(statements, constructor);
                addRestParameterIfNeeded(statements, constructor, hasSynthesizedSuper);
                if (!hasSynthesizedSuper) {
                    // If no super call has been synthesized, emit custom prologue directives.
                    statementOffset = addCustomPrologue(statements, constructor.body.statements, statementOffset, visitor);
                }
                Debug.assert(statementOffset >= 0, "statementOffset not initialized correctly!");

            }

            // determine whether the class is known syntactically to be a derived class (e.g. a
            // class that extends a value that is not syntactically known to be `null`).
            const isDerivedClass = extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword;
            const superCaptureStatus = declareOrCaptureOrReturnThisForConstructorIfNeeded(statements, constructor, isDerivedClass, hasSynthesizedSuper, statementOffset);

            // The last statement expression was replaced. Skip it.
            if (superCaptureStatus === SuperCaptureResult.ReplaceSuperCapture || superCaptureStatus === SuperCaptureResult.ReplaceWithReturn) {
                statementOffset++;
            }

            if (constructor) {
                if (superCaptureStatus === SuperCaptureResult.ReplaceSuperCapture) {
                    hierarchyFacts |= HierarchyFacts.ConstructorWithCapturedSuper;
                }

                addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, /*start*/ statementOffset));
            }

            // Return `_this` unless we're sure enough that it would be pointless to add a return statement.
            // If there's a constructor that we can tell returns in enough places, then we *do not* want to add a return.
            if (isDerivedClass
                && superCaptureStatus !== SuperCaptureResult.ReplaceWithReturn
                && !(constructor && isSufficientlyCoveredByReturnStatements(constructor.body))) {
                statements.push(
                    createReturn(
                        createFileLevelUniqueName("_this")
                    )
                );
            }

            prependRange(statements, endLexicalEnvironment());

            if (constructor) {
                prependCaptureNewTargetIfNeeded(statements, constructor, /*copyOnWrite*/ false);
            }

            const block = createBlock(
                setTextRange(
                    createNodeArray(
                        statements
                    ),
                    /*location*/ constructor ? constructor.body.statements : node.members
                ),
                /*multiLine*/ true
            );

            setTextRange(block, constructor ? constructor.body : node);
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
                    isDerivedClass: boolean,
                    hasSynthesizedSuper: boolean,
                    statementOffset: number) {
            // If this isn't a derived class, just capture 'this' for arrow functions if necessary.
            if (!isDerivedClass) {
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
                    superCallExpression = visitImmediateSuperCallInBody((firstStatement as ExpressionStatement).expression as CallExpression);
                }
            }

            // Return the result if we have an immediate super() call on the last statement,
            // but only if the constructor itself doesn't use 'this' elsewhere.
            if (superCallExpression
                && statementOffset === ctorStatements.length - 1
                && !(ctor.transformFlags & (TransformFlags.ContainsLexicalThis | TransformFlags.ContainsCapturedLexicalThis))) {
                const returnStatement = createReturn(superCallExpression);

                if (superCallExpression.kind !== SyntaxKind.BinaryExpression
                    || (superCallExpression as BinaryExpression).left.kind !== SyntaxKind.CallExpression) {
                    Debug.fail("Assumed generated super call would have form 'super.call(...) || this'.");
                }

                // Shift comments from the original super call to the return statement.
                setCommentRange(returnStatement, getCommentRange(
                    setEmitFlags(
                        (superCallExpression as BinaryExpression).left,
                        EmitFlags.NoComments)));

                statements.push(returnStatement);
                return SuperCaptureResult.ReplaceWithReturn;
            }

            // Perform the capture.
            captureThisForNode(statements, ctor, superCallExpression || createActualThis(), firstStatement);

            // If we're actually replacing the original statement, we need to signal this to the caller.
            if (superCallExpression) {
                return SuperCaptureResult.ReplaceSuperCapture;
            }

            return SuperCaptureResult.NoReplacement;
        }

        function createActualThis() {
            return setEmitFlags(createThis(), EmitFlags.NoSubstitution);
        }

        function createDefaultSuperCallOrThis() {
            return createLogicalOr(
                createLogicalAnd(
                    createStrictInequality(
                        createFileLevelUniqueName("_super"),
                        createNull()
                    ),
                    createFunctionApply(
                        createFileLevelUniqueName("_super"),
                        createActualThis(),
                        createIdentifier("arguments"),
                    )
                ),
                createActualThis()
            );
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
                    setTextRange(
                        createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            getGeneratedNameForNode(node),
                            /*questionToken*/ undefined,
                            /*type*/ undefined,
                            /*initializer*/ undefined
                        ),
                        /*location*/ node
                    ),
                    /*original*/ node
                );
            }
            else if (node.initializer) {
                // Initializers are elided
                return setOriginalNode(
                    setTextRange(
                        createParameter(
                            /*decorators*/ undefined,
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            node.name,
                            /*questionToken*/ undefined,
                            /*type*/ undefined,
                            /*initializer*/ undefined
                        ),
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
                                flattenDestructuringBinding(
                                    parameter,
                                    visitor,
                                    context,
                                    FlattenLevel.All,
                                    temp
                                )
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
                createTypeCheck(getSynthesizedClone(name), "undefined"),
                setEmitFlags(
                    setTextRange(
                        createBlock([
                            createStatement(
                                setEmitFlags(
                                    setTextRange(
                                        createAssignment(
                                            setEmitFlags(getMutableClone(name), EmitFlags.NoSourceMap),
                                            setEmitFlags(initializer, EmitFlags.NoSourceMap | getEmitFlags(initializer) | EmitFlags.NoComments)
                                        ),
                                        parameter
                                    ),
                                    EmitFlags.NoComments
                                )
                            )
                        ]),
                        parameter
                    ),
                    EmitFlags.SingleLine | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTokenSourceMaps | EmitFlags.NoComments
                )
            );

            startOnNewLine(statement);
            setTextRange(statement, parameter);
            setEmitFlags(statement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoTrailingSourceMap | EmitFlags.CustomPrologue | EmitFlags.NoComments);
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
                    setTextRange(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList([
                                createVariableDeclaration(
                                    declarationName,
                                    /*type*/ undefined,
                                    createArrayLiteral([])
                                )
                            ])
                        ),
                        /*location*/ parameter
                    ),
                    EmitFlags.CustomPrologue
                )
            );

            // for (var _i = restIndex; _i < arguments.length; _i++) {
            //   param[_i - restIndex] = arguments[_i];
            // }
            const forStatement = createFor(
                setTextRange(
                    createVariableDeclarationList([
                        createVariableDeclaration(temp, /*type*/ undefined, createLiteral(restIndex))
                    ]),
                    parameter
                ),
                setTextRange(
                    createLessThan(
                        temp,
                        createPropertyAccess(createIdentifier("arguments"), "length")
                    ),
                    parameter
                ),
                setTextRange(createPostfixIncrement(temp), parameter),
                createBlock([
                    startOnNewLine(
                        setTextRange(
                            createStatement(
                                createAssignment(
                                    createElementAccess(
                                        expressionName,
                                        restIndex === 0
                                            ? temp
                                            : createSubtract(temp, createLiteral(restIndex))
                                    ),
                                    createElementAccess(createIdentifier("arguments"), temp)
                                )
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
                        createFileLevelUniqueName("_this"),
                        /*type*/ undefined,
                        initializer
                    )
                ])
            );
            setEmitFlags(captureThisStatement, EmitFlags.NoComments | EmitFlags.CustomPrologue);
            setTextRange(captureThisStatement, originalStatement);
            setSourceMapRange(captureThisStatement, node);
            statements.push(captureThisStatement);
        }

        function prependCaptureNewTargetIfNeeded(statements: Statement[], node: FunctionLikeDeclaration, copyOnWrite: boolean): Statement[] {
            if (hierarchyFacts & HierarchyFacts.NewTarget) {
                let newTarget: Expression;
                switch (node.kind) {
                    case SyntaxKind.ArrowFunction:
                        return statements;

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        // Methods and accessors cannot be constructors, so 'new.target' will
                        // always return 'undefined'.
                        newTarget = createVoidZero();
                        break;

                    case SyntaxKind.Constructor:
                        // Class constructors can only be called with `new`, so `this.constructor`
                        // should be relatively safe to use.
                        newTarget = createPropertyAccess(
                            setEmitFlags(createThis(), EmitFlags.NoSubstitution),
                            "constructor"
                        );
                        break;

                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                        // Functions can be called or constructed, and may have a `this` due to
                        // being a member or when calling an imported function via `other_1.f()`.
                        newTarget = createConditional(
                            createLogicalAnd(
                                setEmitFlags(createThis(), EmitFlags.NoSubstitution),
                                createBinary(
                                    setEmitFlags(createThis(), EmitFlags.NoSubstitution),
                                    SyntaxKind.InstanceOfKeyword,
                                    getLocalName(node)
                                )
                            ),
                            createPropertyAccess(
                                setEmitFlags(createThis(), EmitFlags.NoSubstitution),
                                "constructor"
                            ),
                            createVoidZero()
                        );
                        break;

                    default:
                        return Debug.failBadSyntaxKind(node);
                }

                const captureNewTargetStatement = createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            createFileLevelUniqueName("_newTarget"),
                            /*type*/ undefined,
                            newTarget
                        )
                    ])
                );

                if (copyOnWrite) {
                    return [captureNewTargetStatement, ...statements];
                }

                statements.unshift(captureNewTargetStatement);
            }

            return statements;
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
                        statements.push(transformClassMethodDeclarationToStatement(getClassMemberPrefix(node, member), <MethodDeclaration>member, node));
                        break;

                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        const accessors = getAllAccessorDeclarations(node.members, <AccessorDeclaration>member);
                        if (member === accessors.firstAccessor) {
                            statements.push(transformAccessorsToStatement(getClassMemberPrefix(node, member), accessors, node));
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
            return setTextRange(createEmptyStatement(), member);
        }

        /**
         * Transforms a MethodDeclaration into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param member The MethodDeclaration node.
         */
        function transformClassMethodDeclarationToStatement(receiver: LeftHandSideExpression, member: MethodDeclaration, container: Node) {
            const ancestorFacts = enterSubtree(HierarchyFacts.None, HierarchyFacts.None);
            const commentRange = getCommentRange(member);
            const sourceMapRange = getSourceMapRange(member);
            const memberName = createMemberAccessForPropertyName(receiver, visitNode(member.name, visitor, isPropertyName), /*location*/ member.name);
            const memberFunction = transformFunctionLikeToExpression(member, /*location*/ member, /*name*/ undefined, container);
            setEmitFlags(memberFunction, EmitFlags.NoComments);
            setSourceMapRange(memberFunction, sourceMapRange);

            const statement = setTextRange(
                createStatement(
                    createAssignment(memberName, memberFunction)
                ),
                /*location*/ member
            );

            setOriginalNode(statement, member);
            setCommentRange(statement, commentRange);

            // The location for the statement is used to emit comments only.
            // No source map should be emitted for this statement to align with the
            // old emitter.
            setEmitFlags(statement, EmitFlags.NoSourceMap);

            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, hierarchyFacts & HierarchyFacts.PropagateNewTargetMask ? HierarchyFacts.NewTarget : HierarchyFacts.None);
            return statement;
        }

        /**
         * Transforms a set of related of get/set accessors into a statement for a class body function.
         *
         * @param receiver The receiver for the member.
         * @param accessors The set of related get/set accessors.
         */
        function transformAccessorsToStatement(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations, container: Node): Statement {
            const statement = createStatement(transformAccessorsToExpression(receiver, accessors, container, /*startsOnNewLine*/ false));
            // The location for the statement is used to emit source maps only.
            // No comments should be emitted for this statement to align with the
            // old emitter.
            setEmitFlags(statement, EmitFlags.NoComments);
            setSourceMapRange(statement, getSourceMapRange(accessors.firstAccessor));
            return statement;
        }

        /**
         * Transforms a set of related get/set accessors into an expression for either a class
         * body function or an ObjectLiteralExpression with computed properties.
         *
         * @param receiver The receiver for the member.
         */
        function transformAccessorsToExpression(receiver: LeftHandSideExpression, { firstAccessor, getAccessor, setAccessor }: AllAccessorDeclarations, container: Node, startsOnNewLine: boolean): Expression {
            const ancestorFacts = enterSubtree(HierarchyFacts.None, HierarchyFacts.None);

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
                const getterFunction = transformFunctionLikeToExpression(getAccessor, /*location*/ undefined, /*name*/ undefined, container);
                setSourceMapRange(getterFunction, getSourceMapRange(getAccessor));
                setEmitFlags(getterFunction, EmitFlags.NoLeadingComments);
                const getter = createPropertyAssignment("get", getterFunction);
                setCommentRange(getter, getCommentRange(getAccessor));
                properties.push(getter);
            }

            if (setAccessor) {
                const setterFunction = transformFunctionLikeToExpression(setAccessor, /*location*/ undefined, /*name*/ undefined, container);
                setSourceMapRange(setterFunction, getSourceMapRange(setAccessor));
                setEmitFlags(setterFunction, EmitFlags.NoLeadingComments);
                const setter = createPropertyAssignment("set", setterFunction);
                setCommentRange(setter, getCommentRange(setAccessor));
                properties.push(setter);
            }

            properties.push(
                createPropertyAssignment("enumerable", createTrue()),
                createPropertyAssignment("configurable", createTrue())
            );

            const call = createCall(
                createPropertyAccess(createIdentifier("Object"), "defineProperty"),
                /*typeArguments*/ undefined,
                [
                    target,
                    propertyName,
                    createObjectLiteral(properties, /*multiLine*/ true)
                ]
            );
            if (startsOnNewLine) {
                startOnNewLine(call);
            }

            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, hierarchyFacts & HierarchyFacts.PropagateNewTargetMask ? HierarchyFacts.NewTarget : HierarchyFacts.None);
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
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const ancestorFacts = enterSubtree(HierarchyFacts.ArrowFunctionExcludes, HierarchyFacts.ArrowFunctionIncludes);
            const func = createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
            setTextRange(func, node);
            setOriginalNode(func, node);
            setEmitFlags(func, EmitFlags.CapturesThis);
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
            return func;
        }

        /**
         * Visits a FunctionExpression node.
         *
         * @param node a FunctionExpression node.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            const ancestorFacts = getEmitFlags(node) & EmitFlags.AsyncFunctionBody
                ? enterSubtree(HierarchyFacts.AsyncFunctionBodyExcludes, HierarchyFacts.AsyncFunctionBodyIncludes)
                : enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes);
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;

            const parameters = visitParameterList(node.parameters, visitor, context);
            const body = node.transformFlags & TransformFlags.ES2015
                ? transformFunctionBody(node)
                : visitFunctionBodyDownLevel(node);
            const name = hierarchyFacts & HierarchyFacts.NewTarget
                ? getLocalName(node)
                : node.name;

            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
            return updateFunctionExpression(
                node,
                /*modifiers*/ undefined,
                node.asteriskToken,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body
            );
        }

        /**
         * Visits a FunctionDeclaration node.
         *
         * @param node a FunctionDeclaration node.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const ancestorFacts = enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes);
            const parameters = visitParameterList(node.parameters, visitor, context);
            const body = node.transformFlags & TransformFlags.ES2015
                ? transformFunctionBody(node)
                : visitFunctionBodyDownLevel(node);
            const name = hierarchyFacts & HierarchyFacts.NewTarget
                ? getLocalName(node)
                : node.name;

            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
            return updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                visitNodes(node.modifiers, visitor, isModifier),
                node.asteriskToken,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body
            );
        }

        /**
         * Transforms a function-like node into a FunctionExpression.
         *
         * @param node The function-like node to transform.
         * @param location The source-map location for the new FunctionExpression.
         * @param name The name of the new FunctionExpression.
         */
        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location: TextRange, name: Identifier, container: Node): FunctionExpression {
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const ancestorFacts = container && isClassLike(container) && !hasModifier(node, ModifierFlags.Static)
                ? enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes | HierarchyFacts.NonStaticClassElement)
                : enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes);
            const parameters = visitParameterList(node.parameters, visitor, context);
            const body = transformFunctionBody(node);
            if (hierarchyFacts & HierarchyFacts.NewTarget && !name && (node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.FunctionExpression)) {
                name = getGeneratedNameForNode(node);
            }

            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
            return setOriginalNode(
                setTextRange(
                    createFunctionExpression(
                        /*modifiers*/ undefined,
                        node.asteriskToken,
                        name,
                        /*typeParameters*/ undefined,
                        parameters,
                        /*type*/ undefined,
                        body
                    ),
                    location
                ),
                /*original*/ node
            );
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

            resumeLexicalEnvironment();
            if (isBlock(body)) {
                // ensureUseStrict is false because no new prologue-directive should be added.
                // addStandardPrologue will put already-existing directives at the beginning of the target statement-array
                statementOffset = addStandardPrologue(statements, body.statements, /*ensureUseStrict*/ false);
            }

            addCaptureThisForNodeIfNeeded(statements, node);
            addDefaultValueAssignmentsIfNeeded(statements, node);
            addRestParameterIfNeeded(statements, node, /*inConstructorWithSynthesizedSuper*/ false);

            // If we added any generated statements, this must be a multi-line block.
            if (!multiLine && statements.length > 0) {
                multiLine = true;
            }

            if (isBlock(body)) {
                // addCustomPrologue puts already-existing directives at the beginning of the target statement-array
                statementOffset = addCustomPrologue(statements, body.statements, statementOffset, visitor);

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
                const returnStatement = createReturn(expression);
                setTextRange(returnStatement, body);
                moveSyntheticComments(returnStatement, body);
                setEmitFlags(returnStatement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTrailingComments);
                statements.push(returnStatement);

                // To align with the source map emit for the old emitter, we set a custom
                // source map location for the close brace.
                closeBraceLocation = body;
            }

            const lexicalEnvironment = context.endLexicalEnvironment();
            prependRange(statements, lexicalEnvironment);

            prependCaptureNewTargetIfNeeded(statements, node, /*copyOnWrite*/ false);

            // If we added any final generated statements, this must be a multi-line block
            if (!multiLine && lexicalEnvironment && lexicalEnvironment.length) {
                multiLine = true;
            }

            const block = createBlock(setTextRange(createNodeArray(statements), statementsLocation), multiLine);
            setTextRange(block, node.body);
            if (!multiLine && singleLine) {
                setEmitFlags(block, EmitFlags.SingleLine);
            }

            if (closeBraceLocation) {
                setTokenSourceMapRange(block, SyntaxKind.CloseBraceToken, closeBraceLocation);
            }

            setOriginalNode(block, node.body);
            return block;
        }

        function visitFunctionBodyDownLevel(node: FunctionDeclaration | FunctionExpression | AccessorDeclaration) {
            const updated = visitFunctionBody(node.body, functionBodyVisitor, context);
            return updateBlock(
                updated,
                setTextRange(
                    createNodeArray(
                        prependCaptureNewTargetIfNeeded(updated.statements as MutableNodeArray<Statement>, node, /*copyOnWrite*/ true)
                    ),
                    /*location*/ updated.statements
                )
            );
        }

        function visitBlock(node: Block, isFunctionBody: boolean): Block {
            if (isFunctionBody) {
                // A function body is not a block scope.
                return visitEachChild(node, visitor, context);
            }
            const ancestorFacts = hierarchyFacts & HierarchyFacts.IterationStatement
                ? enterSubtree(HierarchyFacts.IterationStatementBlockExcludes, HierarchyFacts.IterationStatementBlockIncludes)
                : enterSubtree(HierarchyFacts.BlockExcludes, HierarchyFacts.BlockIncludes);
            const updated = visitEachChild(node, visitor, context);
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        /**
         * Visits an ExpressionStatement that contains a destructuring assignment.
         *
         * @param node An ExpressionStatement node.
         */
        function visitExpressionStatement(node: ExpressionStatement): Statement {
            // If we are here it is most likely because our expression is a destructuring assignment.
            switch (node.expression.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return updateStatement(node, visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false));
                case SyntaxKind.BinaryExpression:
                    return updateStatement(node, visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false));
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
            if (!needsDestructuringValue) {
                // By default we always emit the RHS at the end of a flattened destructuring
                // expression. If we are in a state where we do not need the destructuring value,
                // we pass that information along to the children that care about it.
                switch (node.expression.kind) {
                    case SyntaxKind.ParenthesizedExpression:
                        return updateParen(node, visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false));
                    case SyntaxKind.BinaryExpression:
                        return updateParen(node, visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false));
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
            if (isDestructuringAssignment(node)) {
                return flattenDestructuringAssignment(
                    node,
                    visitor,
                    context,
                    FlattenLevel.All,
                    needsDestructuringValue);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitVariableStatement(node: VariableStatement): Statement {
            const ancestorFacts = enterSubtree(HierarchyFacts.None, hasModifier(node, ModifierFlags.Export) ? HierarchyFacts.ExportedVariableStatement : HierarchyFacts.None);
            let updated: Statement;
            if (convertedLoopState && (node.declarationList.flags & NodeFlags.BlockScoped) === 0) {
                // we are inside a converted loop - hoist variable declarations
                let assignments: Expression[];
                for (const decl of node.declarationList.declarations) {
                    hoistVariableDeclarationDeclaredInConvertedLoop(convertedLoopState, decl);
                    if (decl.initializer) {
                        let assignment: Expression;
                        if (isBindingPattern(decl.name)) {
                            assignment = flattenDestructuringAssignment(
                                decl,
                                visitor,
                                context,
                                FlattenLevel.All
                            );
                        }
                        else {
                            assignment = createBinary(decl.name, SyntaxKind.EqualsToken, visitNode(decl.initializer, visitor, isExpression));
                            setTextRange(assignment, decl);
                        }

                        assignments = append(assignments, assignment);
                    }
                }
                if (assignments) {
                    updated = setTextRange(createStatement(inlineExpressions(assignments)), node);
                }
                else {
                    // none of declarations has initializer - the entire variable statement can be deleted
                    updated = undefined;
                }
            }
            else {
                updated = visitEachChild(node, visitor, context);
            }

            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        /**
         * Visits a VariableDeclarationList that is block scoped (e.g. `let` or `const`).
         *
         * @param node A VariableDeclarationList node.
         */
        function visitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            if (node.transformFlags & TransformFlags.ES2015) {
                if (node.flags & NodeFlags.BlockScoped) {
                    enableSubstitutionsForBlockScopedBindings();
                }

                const declarations = flatMap(node.declarations, node.flags & NodeFlags.Let
                    ? visitVariableDeclarationInLetDeclarationList
                    : visitVariableDeclaration);

                const declarationList = createVariableDeclarationList(declarations);
                setOriginalNode(declarationList, node);
                setTextRange(declarationList, node);
                setCommentRange(declarationList, node);

                if (node.transformFlags & TransformFlags.ContainsBindingPattern
                    && (isBindingPattern(node.declarations[0].name) || isBindingPattern(lastOrUndefined(node.declarations).name))) {
                    // If the first or last declaration is a binding pattern, we need to modify
                    // the source map range for the declaration list.
                    const firstDeclaration = firstOrUndefined(declarations);
                    if (firstDeclaration) {
                        const lastDeclaration = lastOrUndefined(declarations);
                        setSourceMapRange(declarationList, createRange(firstDeclaration.pos, lastDeclaration.end));
                    }
                }

                return declarationList;
            }
            return visitEachChild(node, visitor, context);
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
                (hierarchyFacts & HierarchyFacts.TopLevel) !== 0
                || (isCapturedInFunction
                    && isDeclaredInLoop
                    && (hierarchyFacts & HierarchyFacts.IterationStatementBlock) !== 0);

            const emitExplicitInitializer =
                !emittedAsTopLevel
                && (hierarchyFacts & HierarchyFacts.ForInOrForOfStatement) === 0
                && (!resolver.isDeclarationWithCollidingName(node)
                    || (isDeclaredInLoop
                        && !isCapturedInFunction
                        && (hierarchyFacts & (HierarchyFacts.ForStatement | HierarchyFacts.ForInOrForOfStatement)) === 0));

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
            const ancestorFacts = enterSubtree(HierarchyFacts.ExportedVariableStatement, HierarchyFacts.None);
            let updated: VisitResult<VariableDeclaration>;
            if (isBindingPattern(node.name)) {
                updated = flattenDestructuringBinding(
                    node,
                    visitor,
                    context,
                    FlattenLevel.All,
                    /*value*/ undefined,
                    (ancestorFacts & HierarchyFacts.ExportedVariableStatement) !== 0
                );
            }
            else {
                updated = visitEachChild(node, visitor, context);
            }

            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        function recordLabel(node: LabeledStatement) {
            convertedLoopState.labels.set(idText(node.label), true);
        }

        function resetLabel(node: LabeledStatement) {
            convertedLoopState.labels.set(idText(node.label), false);
        }

        function visitLabeledStatement(node: LabeledStatement): VisitResult<Statement> {
            if (convertedLoopState && !convertedLoopState.labels) {
                convertedLoopState.labels = createMap<boolean>();
            }
            const statement = unwrapInnermostStatementOfLabel(node, convertedLoopState && recordLabel);
            return isIterationStatement(statement, /*lookInLabeledStatements*/ false)
                ? visitIterationStatement(statement, /*outermostLabeledStatement*/ node)
                : restoreEnclosingLabel(visitNode(statement, visitor, isStatement), node, convertedLoopState && resetLabel);
        }

        function visitIterationStatement(node: IterationStatement, outermostLabeledStatement: LabeledStatement) {
            switch (node.kind) {
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    return visitDoOrWhileStatement(<DoStatement | WhileStatement>node, outermostLabeledStatement);
                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node, outermostLabeledStatement);
                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node, outermostLabeledStatement);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node, outermostLabeledStatement);
            }
        }

        function visitIterationStatementWithFacts(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts, node: IterationStatement, outermostLabeledStatement: LabeledStatement, convert?: LoopConverter) {
            const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
            const updated = convertIterationStatementBodyIfNecessary(node, outermostLabeledStatement, convert);
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        function visitDoOrWhileStatement(node: DoStatement | WhileStatement, outermostLabeledStatement: LabeledStatement) {
            return visitIterationStatementWithFacts(
                HierarchyFacts.DoOrWhileStatementExcludes,
                HierarchyFacts.DoOrWhileStatementIncludes,
                node,
                outermostLabeledStatement);
        }

        function visitForStatement(node: ForStatement, outermostLabeledStatement: LabeledStatement) {
            return visitIterationStatementWithFacts(
                HierarchyFacts.ForStatementExcludes,
                HierarchyFacts.ForStatementIncludes,
                node,
                outermostLabeledStatement);
        }

        function visitForInStatement(node: ForInStatement, outermostLabeledStatement: LabeledStatement) {
            return visitIterationStatementWithFacts(
                HierarchyFacts.ForInOrForOfStatementExcludes,
                HierarchyFacts.ForInOrForOfStatementIncludes,
                node,
                outermostLabeledStatement);
        }

        function visitForOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement): VisitResult<Statement> {
            return visitIterationStatementWithFacts(
                HierarchyFacts.ForInOrForOfStatementExcludes,
                HierarchyFacts.ForInOrForOfStatementIncludes,
                node,
                outermostLabeledStatement,
                compilerOptions.downlevelIteration ? convertForOfStatementForIterable : convertForOfStatementForArray);
        }

        function convertForOfStatementHead(node: ForOfStatement, boundValue: Expression, convertedLoopBodyStatements: Statement[]) {
            const statements: Statement[] = [];
            if (isVariableDeclarationList(node.initializer)) {
                if (node.initializer.flags & NodeFlags.BlockScoped) {
                    enableSubstitutionsForBlockScopedBindings();
                }

                const firstOriginalDeclaration = firstOrUndefined(node.initializer.declarations);
                if (firstOriginalDeclaration && isBindingPattern(firstOriginalDeclaration.name)) {
                    // This works whether the declaration is a var, let, or const.
                    // It will use rhsIterationValue _a[_i] as the initializer.
                    const declarations = flattenDestructuringBinding(
                        firstOriginalDeclaration,
                        visitor,
                        context,
                        FlattenLevel.All,
                        boundValue
                    );

                    const declarationList = setTextRange(createVariableDeclarationList(declarations), node.initializer);
                    setOriginalNode(declarationList, node.initializer);

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
                        setTextRange(
                            createVariableStatement(
                                /*modifiers*/ undefined,
                                setOriginalNode(
                                    setTextRange(
                                        createVariableDeclarationList([
                                            createVariableDeclaration(
                                                firstOriginalDeclaration ? firstOriginalDeclaration.name : createTempVariable(/*recordTempVariable*/ undefined),
                                                /*type*/ undefined,
                                                boundValue
                                            )
                                        ]),
                                        moveRangePos(node.initializer, -1)
                                    ),
                                    node.initializer
                                )
                            ),
                            moveRangeEnd(node.initializer, -1)
                        )
                    );
                }
            }
            else {
                // Initializer is an expression. Emit the expression in the body, so that it's
                // evaluated on every iteration.
                const assignment = createAssignment(node.initializer, boundValue);
                if (isDestructuringAssignment(assignment)) {
                    aggregateTransformFlags(assignment);
                    statements.push(createStatement(visitBinaryExpression(assignment, /*needsDestructuringValue*/ false)));
                }
                else {
                    assignment.end = node.initializer.end;
                    statements.push(setTextRange(createStatement(visitNode(assignment, visitor, isExpression)), moveRangeEnd(node.initializer, -1)));
                }
            }

            if (convertedLoopBodyStatements) {
                return createSyntheticBlockForConvertedStatements(addRange(statements, convertedLoopBodyStatements));
            }
            else {
                const statement = visitNode(node.statement, visitor, isStatement, liftToBlock);
                if (isBlock(statement)) {
                    return updateBlock(statement, setTextRange(createNodeArray(concatenate(statements, statement.statements)), statement.statements));
                }
                else {
                    statements.push(statement);
                    return createSyntheticBlockForConvertedStatements(statements);
                }
            }
        }

        function createSyntheticBlockForConvertedStatements(statements: Statement[]) {
            return setEmitFlags(
                createBlock(
                    createNodeArray(statements),
                    /*multiLine*/ true
                ),
                EmitFlags.NoSourceMap | EmitFlags.NoTokenSourceMaps
            );
        }

        function convertForOfStatementForArray(node: ForOfStatement, outermostLabeledStatement: LabeledStatement, convertedLoopBodyStatements: Statement[]): Statement {
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

            // In the case where the user wrote an identifier as the RHS, like this:
            //
            //     for (let v of arr) { }
            //
            // we don't want to emit a temporary variable for the RHS, just use it directly.
            const counter = createLoopVariable();
            const rhsReference = isIdentifier(expression) ? getGeneratedNameForNode(expression) : createTempVariable(/*recordTempVariable*/ undefined);

            // The old emitter does not emit source maps for the expression
            setEmitFlags(expression, EmitFlags.NoSourceMap | getEmitFlags(expression));

            const forStatement = setTextRange(
                createFor(
                    /*initializer*/ setEmitFlags(
                        setTextRange(
                            createVariableDeclarationList([
                                setTextRange(createVariableDeclaration(counter, /*type*/ undefined, createLiteral(0)), moveRangePos(node.expression, -1)),
                                setTextRange(createVariableDeclaration(rhsReference, /*type*/ undefined, expression), node.expression)
                            ]),
                            node.expression
                        ),
                        EmitFlags.NoHoisting
                    ),
                    /*condition*/ setTextRange(
                        createLessThan(
                            counter,
                            createPropertyAccess(rhsReference, "length")
                        ),
                        node.expression
                    ),
                    /*incrementor*/ setTextRange(createPostfixIncrement(counter), node.expression),
                    /*statement*/ convertForOfStatementHead(
                        node,
                        createElementAccess(rhsReference, counter),
                        convertedLoopBodyStatements
                    )
                ),
                /*location*/ node
            );

            // Disable trailing source maps for the OpenParenToken to align source map emit with the old emitter.
            setEmitFlags(forStatement, EmitFlags.NoTokenTrailingSourceMaps);
            setTextRange(forStatement, node);
            return restoreEnclosingLabel(forStatement, outermostLabeledStatement, convertedLoopState && resetLabel);
        }

        function convertForOfStatementForIterable(node: ForOfStatement, outermostLabeledStatement: LabeledStatement, convertedLoopBodyStatements: Statement[]): Statement {
            const expression = visitNode(node.expression, visitor, isExpression);
            const iterator = isIdentifier(expression) ? getGeneratedNameForNode(expression) : createTempVariable(/*recordTempVariable*/ undefined);
            const result = isIdentifier(expression) ? getGeneratedNameForNode(iterator) : createTempVariable(/*recordTempVariable*/ undefined);
            const errorRecord = createUniqueName("e");
            const catchVariable = getGeneratedNameForNode(errorRecord);
            const returnMethod = createTempVariable(/*recordTempVariable*/ undefined);
            const values = createValuesHelper(context, expression, node.expression);
            const next = createCall(createPropertyAccess(iterator, "next"), /*typeArguments*/ undefined, []);

            hoistVariableDeclaration(errorRecord);
            hoistVariableDeclaration(returnMethod);

            const forStatement = setEmitFlags(
                setTextRange(
                    createFor(
                        /*initializer*/ setEmitFlags(
                            setTextRange(
                                createVariableDeclarationList([
                                    setTextRange(createVariableDeclaration(iterator, /*type*/ undefined, values), node.expression),
                                    createVariableDeclaration(result, /*type*/ undefined, next)
                                ]),
                                node.expression
                            ),
                            EmitFlags.NoHoisting
                        ),
                        /*condition*/ createLogicalNot(createPropertyAccess(result, "done")),
                        /*incrementor*/ createAssignment(result, next),
                        /*statement*/ convertForOfStatementHead(
                            node,
                            createPropertyAccess(result, "value"),
                            convertedLoopBodyStatements
                        )
                    ),
                    /*location*/ node
                ),
                EmitFlags.NoTokenTrailingSourceMaps
            );

            return createTry(
                createBlock([
                    restoreEnclosingLabel(
                        forStatement,
                        outermostLabeledStatement,
                        convertedLoopState && resetLabel
                    )
                ]),
                createCatchClause(createVariableDeclaration(catchVariable),
                    setEmitFlags(
                        createBlock([
                            createStatement(
                                createAssignment(
                                    errorRecord,
                                    createObjectLiteral([
                                        createPropertyAssignment("error", catchVariable)
                                    ])
                                )
                            )
                        ]),
                        EmitFlags.SingleLine
                    )
                ),
                createBlock([
                    createTry(
                        /*tryBlock*/ createBlock([
                            setEmitFlags(
                                createIf(
                                    createLogicalAnd(
                                        createLogicalAnd(
                                            result,
                                            createLogicalNot(
                                                createPropertyAccess(result, "done")
                                            )
                                        ),
                                        createAssignment(
                                            returnMethod,
                                            createPropertyAccess(iterator, "return")
                                        )
                                    ),
                                    createStatement(
                                        createFunctionCall(returnMethod, iterator, [])
                                    )
                                ),
                                EmitFlags.SingleLine
                            ),
                        ]),
                        /*catchClause*/ undefined,
                        /*finallyBlock*/ setEmitFlags(
                            createBlock([
                                setEmitFlags(
                                    createIf(
                                        errorRecord,
                                        createThrow(
                                            createPropertyAccess(errorRecord, "error")
                                        )
                                    ),
                                    EmitFlags.SingleLine
                                )
                            ]),
                            EmitFlags.SingleLine
                        )
                    )
                ])
            );
        }

        /**
         * Visits an ObjectLiteralExpression with computed property names.
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
            let numInitialPropertiesWithoutYield = numProperties;
            for (let i = 0; i < numProperties; i++) {
                const property = properties[i];
                if ((property.transformFlags & TransformFlags.ContainsYield && hierarchyFacts & HierarchyFacts.AsyncFunctionBody)
                    && i < numInitialPropertiesWithoutYield) {
                    numInitialPropertiesWithoutYield = i;
                }
                if (property.name.kind === SyntaxKind.ComputedPropertyName) {
                    numInitialProperties = i;
                    break;
                }
            }

            if (numInitialProperties !== numProperties) {
                if (numInitialPropertiesWithoutYield < numInitialProperties) {
                    numInitialProperties = numInitialPropertiesWithoutYield;
                }

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
                            node.multiLine
                        ),
                        EmitFlags.Indented
                    )
                );

                if (node.multiLine) {
                    startOnNewLine(assignment);
                }

                expressions.push(assignment);

                addObjectLiteralMembers(expressions, node, temp, numInitialProperties);

                // We need to clone the temporary identifier so that we can write it on a
                // new line
                expressions.push(node.multiLine ? startOnNewLine(getMutableClone(temp)) : temp);
                return inlineExpressions(expressions);
            }
            return visitEachChild(node, visitor, context);
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
                    state.hoistedLocalVariables.push(node);
                }
                else {
                    for (const element of node.elements) {
                        if (!isOmittedExpression(element)) {
                            visit(element.name);
                        }
                    }
                }
            }
        }

        function convertIterationStatementBodyIfNecessary(node: IterationStatement, outermostLabeledStatement: LabeledStatement, convert?: LoopConverter): VisitResult<Statement> {
            if (!shouldConvertIterationStatementBody(node)) {
                let saveAllowedNonLabeledJumps: Jump;
                if (convertedLoopState) {
                    // we get here if we are trying to emit normal loop loop inside converted loop
                    // set allowedNonLabeledJumps to Break | Continue to mark that break\continue inside the loop should be emitted as is
                    saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                    convertedLoopState.allowedNonLabeledJumps = Jump.Break | Jump.Continue;
                }

                const result = convert
                    ? convert(node, outermostLabeledStatement, /*convertedLoopBodyStatements*/ undefined)
                    : restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement, convertedLoopState && resetLabel);

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

            startLexicalEnvironment();
            let loopBody = visitNode(node.statement, visitor, isStatement, liftToBlock);
            const lexicalEnvironment = endLexicalEnvironment();

            const currentState = convertedLoopState;
            convertedLoopState = outerConvertedLoopState;

            if (loopOutParameters.length || lexicalEnvironment) {
                const statements = isBlock(loopBody) ? loopBody.statements.slice() : [loopBody];
                if (loopOutParameters.length) {
                    copyOutParameters(loopOutParameters, CopyDirection.ToOutParameter, statements);
                }
                prependRange(statements, lexicalEnvironment);
                loopBody = createBlock(statements, /*multiline*/ true);
            }

            if (isBlock(loopBody)) {
                loopBody.multiLine = true;
            }
            else {
                loopBody = createBlock([loopBody], /*multiline*/ true);
            }

            const containsYield = (node.statement.transformFlags & TransformFlags.ContainsYield) !== 0;
            const isAsyncBlockContainingAwait = containsYield && (hierarchyFacts & HierarchyFacts.AsyncFunctionBody) !== 0;

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
                                            containsYield ? createToken(SyntaxKind.AsteriskToken) : undefined,
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

            const convertedLoopBodyStatements = generateCallToConvertedLoop(functionName, loopParameters, currentState, containsYield);

            let loop: Statement;
            if (convert) {
                loop = convert(node, outermostLabeledStatement, convertedLoopBodyStatements);
            }
            else {
                let clone = getMutableClone(node);
                // clean statement part
                clone.statement = undefined;
                // visit childnodes to transform initializer/condition/incrementor parts
                clone = visitEachChild(clone, visitor, context);
                // set loop statement
                clone.statement = createBlock(convertedLoopBodyStatements, /*multiline*/ true);
                // reset and re-aggregate the transform flags
                clone.transformFlags = 0;
                aggregateTransformFlags(clone);
                loop = restoreEnclosingLabel(clone, outermostLabeledStatement, convertedLoopState && resetLabel);
            }

            statements.push(loop);
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
            const callResult = isAsyncBlockContainingAwait
                ? createYield(
                    createToken(SyntaxKind.AsteriskToken),
                    setEmitFlags(call, EmitFlags.Iterator)
                )
                : call;
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
                state.labeledNonLocalBreaks.set(labelText, labelMarker);
            }
            else {
                if (!state.labeledNonLocalContinues) {
                    state.labeledNonLocalContinues = createMap<string>();
                }
                state.labeledNonLocalContinues.set(labelText, labelMarker);
            }
        }

        function processLabeledJumps(table: Map<string>, isBreak: boolean, loopResultName: Identifier, outerLoop: ConvertedLoopState, caseClauses: CaseClause[]): void {
            if (!table) {
                return;
            }
            table.forEach((labelMarker, labelText) => {
                const statements: Statement[] = [];
                // if there are no outer converted loop or outer label in question is located inside outer converted loop
                // then emit labeled break\continue
                // otherwise propagate pair 'label -> marker' to outer converted loop and emit 'return labelMarker' so outer loop can later decide what to do
                if (!outerLoop || (outerLoop.labels && outerLoop.labels.get(labelText))) {
                    const label = createIdentifier(labelText);
                    statements.push(isBreak ? createBreak(label) : createContinue(label));
                }
                else {
                    setLabeledJump(outerLoop, isBreak, labelText, labelMarker);
                    statements.push(createReturn(loopResultName));
                }
                caseClauses.push(createCaseClause(createLiteral(labelMarker), statements));
            });
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
                    const outParamName = createUniqueName("out_" + idText(name));
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
                        const accessors = getAllAccessorDeclarations(node.properties, property);
                        if (property === accessors.firstAccessor) {
                            expressions.push(transformAccessorsToExpression(receiver, accessors, node, node.multiLine));
                        }

                        break;

                    case SyntaxKind.MethodDeclaration:
                        expressions.push(transformObjectLiteralMethodDeclarationToExpression(property, receiver, node, node.multiLine));
                        break;

                    case SyntaxKind.PropertyAssignment:
                        expressions.push(transformPropertyAssignmentToExpression(property, receiver, node.multiLine));
                        break;

                    case SyntaxKind.ShorthandPropertyAssignment:
                        expressions.push(transformShorthandPropertyAssignmentToExpression(property, receiver, node.multiLine));
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
                visitNode(property.initializer, visitor, isExpression)
            );
            setTextRange(expression, property);
            if (startsOnNewLine) {
                startOnNewLine(expression);
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
                getSynthesizedClone(property.name)
            );
            setTextRange(expression, property);
            if (startsOnNewLine) {
                startOnNewLine(expression);
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
        function transformObjectLiteralMethodDeclarationToExpression(method: MethodDeclaration, receiver: Expression, container: Node, startsOnNewLine: boolean) {
            const ancestorFacts = enterSubtree(HierarchyFacts.None, HierarchyFacts.None);
            const expression = createAssignment(
                createMemberAccessForPropertyName(
                    receiver,
                    visitNode(method.name, visitor, isPropertyName)
                ),
                transformFunctionLikeToExpression(method, /*location*/ method, /*name*/ undefined, container)
            );
            setTextRange(expression, method);
            if (startsOnNewLine) {
                startOnNewLine(expression);
            }
            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, hierarchyFacts & HierarchyFacts.PropagateNewTargetMask ? HierarchyFacts.NewTarget : HierarchyFacts.None);
            return expression;
        }

        function visitCatchClause(node: CatchClause): CatchClause {
            const ancestorFacts = enterSubtree(HierarchyFacts.BlockScopeExcludes, HierarchyFacts.BlockScopeIncludes);
            let updated: CatchClause;
            Debug.assert(!!node.variableDeclaration, "Catch clause variable should always be present when downleveling ES2015.");
            if (isBindingPattern(node.variableDeclaration.name)) {
                const temp = createTempVariable(/*recordTempVariable*/ undefined);
                const newVariableDeclaration = createVariableDeclaration(temp);
                setTextRange(newVariableDeclaration, node.variableDeclaration);
                const vars = flattenDestructuringBinding(
                    node.variableDeclaration,
                    visitor,
                    context,
                    FlattenLevel.All,
                    temp
                );
                const list = createVariableDeclarationList(vars);
                setTextRange(list, node.variableDeclaration);
                const destructure = createVariableStatement(/*modifiers*/ undefined, list);
                updated = updateCatchClause(node, newVariableDeclaration, addStatementToStartOfBlock(node.block, destructure));
            }
            else {
                updated = visitEachChild(node, visitor, context);
            }

            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        function addStatementToStartOfBlock(block: Block, statement: Statement): Block {
            const transformedStatements = visitNodes(block.statements, visitor, isStatement);
            return updateBlock(block, [statement, ...transformedStatements]);
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
            const functionExpression = transformFunctionLikeToExpression(node, /*location*/ moveRangePos(node, -1), /*name*/ undefined, /*container*/ undefined);
            setEmitFlags(functionExpression, EmitFlags.NoLeadingComments | getEmitFlags(functionExpression));
            return setTextRange(
                createPropertyAssignment(
                    node.name,
                    functionExpression
                ),
                /*location*/ node
            );
        }

        /**
         * Visits an AccessorDeclaration of an ObjectLiteralExpression.
         *
         * @param node An AccessorDeclaration node.
         */
        function visitAccessorDeclaration(node: AccessorDeclaration): AccessorDeclaration {
            Debug.assert(!isComputedPropertyName(node.name));
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const ancestorFacts = enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes);
            let updated: AccessorDeclaration;
            const parameters = visitParameterList(node.parameters, visitor, context);
            const body = node.transformFlags & (TransformFlags.ContainsCapturedLexicalThis | TransformFlags.ContainsES2015)
                ? transformFunctionBody(node)
                : visitFunctionBodyDownLevel(node);
            if (node.kind === SyntaxKind.GetAccessor) {
                updated = updateGetAccessor(node, node.decorators, node.modifiers, node.name, parameters, node.type, body);
            }
            else {
                updated = updateSetAccessor(node, node.decorators, node.modifiers, node.name, parameters, body);
            }
            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
            return updated;
        }

        /**
         * Visits a ShorthandPropertyAssignment and transforms it into a PropertyAssignment.
         *
         * @param node A ShorthandPropertyAssignment node.
         */
        function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment): ObjectLiteralElementLike {
            return setTextRange(
                createPropertyAssignment(
                    node.name,
                    getSynthesizedClone(node.name)
                ),
                /*location*/ node
            );
        }

        function visitComputedPropertyName(node: ComputedPropertyName) {
            const ancestorFacts = enterSubtree(HierarchyFacts.ComputedPropertyNameExcludes, HierarchyFacts.ComputedPropertyNameIncludes);
            const updated = visitEachChild(node, visitor, context);
            exitSubtree(ancestorFacts, HierarchyFacts.PropagateNewTargetMask, hierarchyFacts & HierarchyFacts.PropagateNewTargetMask ? HierarchyFacts.NewTargetInComputedPropertyName : HierarchyFacts.None);
            return updated;
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
            if (node.transformFlags & TransformFlags.ES2015) {
                // We are here because we contain a SpreadElementExpression.
                return transformAndSpreadElements(node.elements, /*needsUniqueCopy*/ true, node.multiLine, /*hasTrailingComma*/ node.elements.hasTrailingComma);
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a CallExpression that contains either a spread element or `super`.
         *
         * @param node a CallExpression.
         */
        function visitCallExpression(node: CallExpression) {
            if (getEmitFlags(node) & EmitFlags.TypeScriptClassWrapper) {
                return visitTypeScriptClassWrapper(node);
            }

            if (node.transformFlags & TransformFlags.ES2015) {
                return visitCallExpressionWithPotentialCapturedThisAssignment(node, /*assignToCapturedThis*/ true);
            }

            return updateCall(
                node,
                visitNode(node.expression, callExpressionVisitor, isExpression),
                /*typeArguments*/ undefined,
                visitNodes(node.arguments, visitor, isExpression)
            );
        }

        function visitTypeScriptClassWrapper(node: CallExpression) {
            // This is a call to a class wrapper function (an IIFE) created by the 'ts' transformer.
            // The wrapper has a form similar to:
            //
            //  (function() {
            //      class C { // 1
            //      }
            //      C.x = 1; // 2
            //      return C;
            //  }())
            //
            // When we transform the class, we end up with something like this:
            //
            //  (function () {
            //      var C = (function () { // 3
            //          function C() {
            //          }
            //          return C; // 4
            //      }());
            //      C.x = 1;
            //      return C;
            //  }())
            //
            // We want to simplify the two nested IIFEs to end up with something like this:
            //
            //  (function () {
            //      function C() {
            //      }
            //      C.x = 1;
            //      return C;
            //  }())

            // We skip any outer expressions in a number of places to get to the innermost
            // expression, but we will restore them later to preserve comments and source maps.
            const body = cast(cast(skipOuterExpressions(node.expression), isArrowFunction).body, isBlock);

            // The class statements are the statements generated by visiting the first statement with initializer of the
            // body (1), while all other statements are added to remainingStatements (2)
            const isVariableStatementWithInitializer = (stmt: Statement) => isVariableStatement(stmt) && !!firstOrUndefined(stmt.declarationList.declarations).initializer;
            const bodyStatements = visitNodes(body.statements, visitor, isStatement);
            const classStatements = filter(bodyStatements, isVariableStatementWithInitializer);
            const remainingStatements = filter(bodyStatements, stmt => !isVariableStatementWithInitializer(stmt));
            const varStatement = cast(firstOrUndefined(classStatements), isVariableStatement);

            // We know there is only one variable declaration here as we verified this in an
            // earlier call to isTypeScriptClassWrapper
            const variable = varStatement.declarationList.declarations[0];
            const initializer = skipOuterExpressions(variable.initializer);

            // Under certain conditions, the 'ts' transformer may introduce a class alias, which
            // we see as an assignment, for example:
            //
            //  (function () {
            //      var C_1;
            //      var C = C_1 = (function () {
            //          function C() {
            //          }
            //          C.x = function () { return C_1; }
            //          return C;
            //      }());
            //      C = C_1 = __decorate([dec], C);
            //      return C;
            //  }())
            //
            const aliasAssignment = tryCast(initializer, isAssignmentExpression);

            // The underlying call (3) is another IIFE that may contain a '_super' argument.
            const call = cast(aliasAssignment ? skipOuterExpressions(aliasAssignment.right) : initializer, isCallExpression);
            const func = cast(skipOuterExpressions(call.expression), isFunctionExpression);

            const funcStatements = func.body.statements;
            let classBodyStart = 0;
            let classBodyEnd = -1;

            const statements: Statement[] = [];
            if (aliasAssignment) {
                // If we have a class alias assignment, we need to move it to the down-level constructor
                // function we generated for the class.
                const extendsCall = tryCast(funcStatements[classBodyStart], isExpressionStatement);
                if (extendsCall) {
                    statements.push(extendsCall);
                    classBodyStart++;
                }

                // The next statement is the function declaration.
                statements.push(funcStatements[classBodyStart]);
                classBodyStart++;

                // Add the class alias following the declaration.
                statements.push(
                    createStatement(
                        createAssignment(
                            aliasAssignment.left,
                            cast(variable.name, isIdentifier)
                        )
                    )
                );
            }

            // Find the trailing 'return' statement (4)
            while (!isReturnStatement(elementAt(funcStatements, classBodyEnd))) {
                classBodyEnd--;
            }

            // When we extract the statements of the inner IIFE, we exclude the 'return' statement (4)
            // as we already have one that has been introduced by the 'ts' transformer.
            addRange(statements, funcStatements, classBodyStart, classBodyEnd);

            if (classBodyEnd < -1) {
                // If there were any hoisted declarations following the return statement, we should
                // append them.
                addRange(statements, funcStatements, classBodyEnd + 1);
            }

            // Add the remaining statements of the outer wrapper.
            addRange(statements, remainingStatements);

            // The 'es2015' class transform may add an end-of-declaration marker. If so we will add it
            // after the remaining statements from the 'ts' transformer.
            addRange(statements, classStatements, /*start*/ 1);

            // Recreate any outer parentheses or partially-emitted expressions to preserve source map
            // and comment locations.
            return recreateOuterExpressions(node.expression,
                recreateOuterExpressions(variable.initializer,
                    recreateOuterExpressions(aliasAssignment && aliasAssignment.right,
                        updateCall(call,
                            recreateOuterExpressions(call.expression,
                                updateFunctionExpression(
                                    func,
                                    /*modifiers*/ undefined,
                                    /*asteriskToken*/ undefined,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    func.parameters,
                                    /*type*/ undefined,
                                    updateBlock(
                                        func.body,
                                        statements
                                    )
                                )
                            ),
                            /*typeArguments*/ undefined,
                            call.arguments
                        )
                    )
                )
            );
        }

        function visitImmediateSuperCallInBody(node: CallExpression) {
            return visitCallExpressionWithPotentialCapturedThisAssignment(node, /*assignToCapturedThis*/ false);
        }

        function visitCallExpressionWithPotentialCapturedThisAssignment(node: CallExpression, assignToCapturedThis: boolean): CallExpression | BinaryExpression {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.
            if (node.transformFlags & TransformFlags.ContainsSpread ||
                node.expression.kind === SyntaxKind.SuperKeyword ||
                isSuperProperty(skipOuterExpressions(node.expression))) {

                const { target, thisArg } = createCallBinding(node.expression, hoistVariableDeclaration);
                if (node.expression.kind === SyntaxKind.SuperKeyword) {
                    setEmitFlags(thisArg, EmitFlags.NoSubstitution);
                }

                let resultingCall: CallExpression | BinaryExpression;
                if (node.transformFlags & TransformFlags.ContainsSpread) {
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
                        visitNode(target, callExpressionVisitor, isExpression),
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
                        visitNode(target, callExpressionVisitor, isExpression),
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
                    resultingCall = assignToCapturedThis
                        ? createAssignment(createFileLevelUniqueName("_this"), initializer)
                        : initializer;
                }
                return setOriginalNode(resultingCall, node);
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a NewExpression that contains a spread element.
         *
         * @param node A NewExpression node.
         */
        function visitNewExpression(node: NewExpression): LeftHandSideExpression {
            if (node.transformFlags & TransformFlags.ContainsSpread) {
                // We are here because we contain a SpreadElementExpression.
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
            return visitEachChild(node, visitor, context);
        }

        /**
         * Transforms an array of Expression nodes that contains a SpreadExpression.
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
            const segments = flatten<Expression>(
                spanMap(elements, partitionSpread, (partition, visitPartition, _start, end) =>
                    visitPartition(partition, multiLine, hasTrailingComma && end === numElements)
                )
            );

            if (compilerOptions.downlevelIteration) {
                if (segments.length === 1) {
                    const firstSegment = segments[0];
                    if (isCallExpression(firstSegment)
                        && isIdentifier(firstSegment.expression)
                        && (getEmitFlags(firstSegment.expression) & EmitFlags.HelperName)
                        && firstSegment.expression.escapedText === "___spread") {
                        return segments[0];
                    }
                }

                return createSpreadHelper(context, segments);
            }
            else {
                if (segments.length === 1) {
                    const firstElement = elements[0];
                    return needsUniqueCopy && isSpreadElement(firstElement) && firstElement.expression.kind !== SyntaxKind.ArrayLiteralExpression
                        ? createArraySlice(segments[0])
                        : segments[0];
                }

                // Rewrite using the pattern <segment0>.concat(<segment1>, <segment2>, ...)
                return createArrayConcat(segments.shift(), segments);
            }
        }

        function partitionSpread(node: Expression) {
            return isSpreadElement(node)
                ? visitSpanOfSpreads
                : visitSpanOfNonSpreads;
        }

        function visitSpanOfSpreads(chunk: Expression[]): VisitResult<Expression> {
            return map(chunk, visitExpressionOfSpread);
        }

        function visitSpanOfNonSpreads(chunk: Expression[], multiLine: boolean, hasTrailingComma: boolean): VisitResult<Expression> {
            return createArrayLiteral(
                visitNodes(createNodeArray(chunk, hasTrailingComma), visitor, isExpression),
                multiLine
            );
        }

        function visitSpreadElement(node: SpreadElement) {
            return visitNode(node.expression, visitor, isExpression);
        }

        /**
         * Transforms the expression of a SpreadExpression node.
         *
         * @param node A SpreadExpression node.
         */
        function visitExpressionOfSpread(node: SpreadElement) {
            return visitNode(node.expression, visitor, isExpression);
        }

        /**
         * Visits a template literal.
         *
         * @param node A template literal.
         */
        function visitTemplateLiteral(node: LiteralExpression): LeftHandSideExpression {
            return setTextRange(createLiteral(node.text), node);
        }

        /**
         * Visits a string literal with an extended unicode escape.
         *
         * @param node A string literal.
         */
        function visitStringLiteral(node: StringLiteral) {
            if (node.hasExtendedUnicodeEscape) {
                return setTextRange(createLiteral(node.text), node);
            }
            return node;
        }

        /**
         * Visits a binary or octal (ES6) numeric literal.
         *
         * @param node A string literal.
         */
        function visitNumericLiteral(node: NumericLiteral) {
            if (node.numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier) {
                return setTextRange(createNumericLiteral(node.text), node);
            }
            return node;
        }

        /**
         * Visits a TaggedTemplateExpression node.
         *
         * @param node A TaggedTemplateExpression node.
         */
        function visitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            // Visit the tag expression
            const tag = visitNode(node.tag, visitor, isExpression);

            // Build up the template arguments and the raw and cooked strings for the template.
            // We start out with 'undefined' for the first argument and revisit later
            // to avoid walking over the template string twice and shifting all our arguments over after the fact.
            const templateArguments: Expression[] = [undefined];
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

            const helperCall = createTemplateObjectHelper(context, createArrayLiteral(cookedStrings), createArrayLiteral(rawStrings));

            // Create a variable to cache the template object if we're in a module.
            // Do not do this in the global scope, as any variable we currently generate could conflict with
            // variables from outside of the current compilation. In the future, we can revisit this behavior.
            if (isExternalModule(currentSourceFile)) {
                const tempVar = createUniqueName("templateObject");
                recordTaggedTemplateString(tempVar);
                templateArguments[0] = createLogicalOr(
                    tempVar,
                    createAssignment(
                        tempVar,
                        helperCall)
                );
            }
            else {
                templateArguments[0] = helperCall;
            }

            return createCall(tag, /*typeArguments*/ undefined, templateArguments);
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
            return setTextRange(createLiteral(text), node);
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
                expression.pos = node.pos;
                expression.end = node.end;
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
        function visitSuperKeyword(isExpressionOfCall: boolean): LeftHandSideExpression {
            return hierarchyFacts & HierarchyFacts.NonStaticClassElement
                && !isExpressionOfCall
                    ? createPropertyAccess(createFileLevelUniqueName("_super"), "prototype")
                    : createFileLevelUniqueName("_super");
        }

        function visitMetaProperty(node: MetaProperty) {
            if (node.keywordToken === SyntaxKind.NewKeyword && node.name.escapedText === "target") {
                if (hierarchyFacts & HierarchyFacts.ComputedPropertyName) {
                    hierarchyFacts |= HierarchyFacts.NewTargetInComputedPropertyName;
                }
                else {
                    hierarchyFacts |= HierarchyFacts.NewTarget;
                }
                return createFileLevelUniqueName("_newTarget");
            }
            return node;
        }

        /**
         * Called by the printer just before a node is printed.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to be printed.
         * @param emitCallback The callback used to emit the node.
         */
        function onEmitNode(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            if (enabledSubstitutions & ES2015SubstitutionFlags.CapturedThis && isFunctionLike(node)) {
                // If we are tracking a captured `this`, keep track of the enclosing function.
                const ancestorFacts = enterSubtree(
                    HierarchyFacts.FunctionExcludes,
                    getEmitFlags(node) & EmitFlags.CapturesThis
                        ? HierarchyFacts.FunctionIncludes | HierarchyFacts.CapturesThis
                        : HierarchyFacts.FunctionIncludes);
                previousOnEmitNode(hint, node, emitCallback);
                exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
                return;
            }
            previousOnEmitNode(hint, node, emitCallback);
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
         * @param hint The context for the emitter.
         * @param node The node to substitute.
         */
        function onSubstituteNode(hint: EmitHint, node: Node) {
            node = previousOnSubstituteNode(hint, node);

            if (hint === EmitHint.Expression) {
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
            if (enabledSubstitutions & ES2015SubstitutionFlags.BlockScopedBindings && !isInternalName(node)) {
                const original = getParseTreeNode(node, isIdentifier);
                if (original && isNameOfDeclarationWithCollidingName(original)) {
                    return setTextRange(getGeneratedNameForNode(original), node);
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
                    return (<NamedDeclaration>parent).name === node
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
            if (enabledSubstitutions & ES2015SubstitutionFlags.BlockScopedBindings && !isInternalName(node)) {
                const declaration = resolver.getReferencedDeclarationWithCollidingName(node);
                if (declaration && !(isClassLike(declaration) && isPartOfClassBody(declaration, node))) {
                    return setTextRange(getGeneratedNameForNode(getNameOfDeclaration(declaration)), node);
                }
            }

            return node;
        }

        function isPartOfClassBody(declaration: ClassLikeDeclaration, node: Identifier) {
            let currentNode = getParseTreeNode(node);
            if (!currentNode || currentNode === declaration || currentNode.end <= declaration.pos || currentNode.pos >= declaration.end) {
                // if the node has no correlation to a parse tree node, its definitely not
                // part of the body.
                // if the node is outside of the document range of the declaration, its
                // definitely not part of the body.
                return false;
            }
            const blockScope = getEnclosingBlockScopeContainer(declaration);
            while (currentNode) {
                if (currentNode === blockScope || currentNode === declaration) {
                    // if we are in the enclosing block scope of the declaration, we are definitely
                    // not inside the class body.
                    return false;
                }
                if (isClassElement(currentNode) && currentNode.parent === declaration) {
                    return true;
                }
                currentNode = currentNode.parent;
            }
            return false;
        }

        /**
         * Substitutes `this` when contained within an arrow function.
         *
         * @param node The ThisKeyword node.
         */
        function substituteThisKeyword(node: PrimaryExpression): PrimaryExpression {
            if (enabledSubstitutions & ES2015SubstitutionFlags.CapturedThis
                && hierarchyFacts & HierarchyFacts.CapturesThis) {
                return setTextRange(createFileLevelUniqueName("_this"), node);
            }
            return node;
        }

        function getClassMemberPrefix(node: ClassExpression | ClassDeclaration, member: ClassElement) {
            return hasModifier(member, ModifierFlags.Static)
                ? getInternalName(node)
                : createPropertyAccess(getInternalName(node), "prototype");
        }

        function hasSynthesizedDefaultSuperCall(constructor: ConstructorDeclaration, hasExtendsClause: boolean) {
            if (!constructor || !hasExtendsClause) {
                return false;
            }

            if (some(constructor.parameters)) {
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
            if (!callArgument || !nodeIsSynthesized(callArgument) || callArgument.kind !== SyntaxKind.SpreadElement) {
                return false;
            }

            const expression = (<SpreadElement>callArgument).expression;
            return isIdentifier(expression) && expression.escapedText === "arguments";
        }
    }

    function createExtendsHelper(context: TransformationContext, name: Identifier) {
        context.requestEmitHelper(extendsHelper);
        return createCall(
            getHelperName("__extends"),
            /*typeArguments*/ undefined,
            [
                name,
                createFileLevelUniqueName("_super")
            ]
        );
    }

    function createTemplateObjectHelper(context: TransformationContext, cooked: ArrayLiteralExpression, raw: ArrayLiteralExpression) {
        context.requestEmitHelper(templateObjectHelper);
        return createCall(
            getHelperName("__makeTemplateObject"),
            /*typeArguments*/ undefined,
            [
                cooked,
                raw
            ]
        );
    }

    const extendsHelper: EmitHelper = {
        name: "typescript:extends",
        scoped: false,
        priority: 0,
        text: `
            var __extends = (this && this.__extends) || (function () {
                var extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return function (d, b) {
                    extendStatics(d, b);
                    function __() { this.constructor = d; }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            })();`
    };

    const templateObjectHelper: EmitHelper = {
        name: "typescript:makeTemplateObject",
        scoped: false,
        priority: 0,
        text: `
            var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
                if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
                return cooked;
            };`
    };

}
