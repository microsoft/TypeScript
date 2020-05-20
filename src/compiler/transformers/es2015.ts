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
        flags: LoopOutParameterFlags;
        originalName: Identifier;
        outParamName: Identifier;
    }

    const enum LoopOutParameterFlags {
        Body = 1 << 0,          // Modified in the body of the iteration statement
        Initializer = 1 << 1,   // Set in the initializer of a ForStatement
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

        conditionVariable?: Identifier;

        loopParameters: ParameterDeclaration[];

        /**
         * List of loop out parameters - detailed descripion can be found in the comment to LoopOutParameter
         */
        loopOutParameters: LoopOutParameter[];
    }

    type LoopConverter = (node: IterationStatement, outermostLabeledStatement: LabeledStatement | undefined, convertedLoopBodyStatements: Statement[] | undefined, ancestorFacts: HierarchyFacts) => Statement;

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
        IterationStatement = 1 << 8,            // Immediately enclosed in an IterationStatement
        IterationStatementBlock = 1 << 9,       // Enclosing Block is enclosed in an IterationStatement
        IterationContainer = 1 << 10,           // Enclosed in an outer IterationStatement
        ForStatement = 1 << 11,                 // Enclosing block-scoped container is a ForStatement
        ForInOrForOfStatement = 1 << 12,        // Enclosing block-scoped container is a ForInStatement or ForOfStatement
        ConstructorWithCapturedSuper = 1 << 13, // Enclosed in a constructor that captures 'this' for use with 'super'
        // NOTE: do not add more ancestor flags without also updating AncestorFactsMask below.
        // NOTE: when adding a new ancestor flag, be sure to update the subtree flags below.

        //
        // Ancestor masks
        //

        AncestorFactsMask = (ConstructorWithCapturedSuper << 1) - 1,

        // We are always in *some* kind of block scope, but only specific block-scope containers are
        // top-level or Blocks.
        BlockScopeIncludes = None,
        BlockScopeExcludes = TopLevel | Block | IterationStatement | IterationStatementBlock | ForStatement | ForInOrForOfStatement,

        // A source file is a top-level block scope.
        SourceFileIncludes = TopLevel,
        SourceFileExcludes = BlockScopeExcludes & ~TopLevel | IterationContainer,

        // Functions, methods, and accessors are both new lexical scopes and new block scopes.
        FunctionIncludes = Function | TopLevel,
        FunctionExcludes = BlockScopeExcludes & ~TopLevel | ArrowFunction | AsyncFunctionBody | CapturesThis | NonStaticClassElement | ConstructorWithCapturedSuper | IterationContainer,

        AsyncFunctionBodyIncludes = FunctionIncludes | AsyncFunctionBody,
        AsyncFunctionBodyExcludes = FunctionExcludes & ~NonStaticClassElement,

        // Arrow functions are lexically scoped to their container, but are new block scopes.
        ArrowFunctionIncludes = ArrowFunction | TopLevel,
        ArrowFunctionExcludes = BlockScopeExcludes & ~TopLevel | ConstructorWithCapturedSuper,

        // Constructors are both new lexical scopes and new block scopes. Constructors are also
        // always considered non-static members of a class.
        ConstructorIncludes = FunctionIncludes | NonStaticClassElement,
        ConstructorExcludes = FunctionExcludes & ~NonStaticClassElement,

        // 'do' and 'while' statements are not block scopes. We track that the subtree is contained
        // within an IterationStatement to indicate whether the embedded statement is an
        // IterationStatementBlock.
        DoOrWhileStatementIncludes = IterationStatement | IterationContainer,
        DoOrWhileStatementExcludes = None,

        // 'for' statements are new block scopes and have special handling for 'let' declarations.
        ForStatementIncludes = IterationStatement | ForStatement | IterationContainer,
        ForStatementExcludes = BlockScopeExcludes & ~ForStatement,

        // 'for-in' and 'for-of' statements are new block scopes and have special handling for
        // 'let' declarations.
        ForInOrForOfStatementIncludes = IterationStatement | ForInOrForOfStatement | IterationContainer,
        ForInOrForOfStatementExcludes = BlockScopeExcludes & ~ForInOrForOfStatement,

        // Blocks (other than function bodies) are new block scopes.
        BlockIncludes = Block,
        BlockExcludes = BlockScopeExcludes & ~Block,

        IterationStatementBlockIncludes = IterationStatementBlock,
        IterationStatementBlockExcludes = BlockScopeExcludes,

        //
        // Subtree facts
        //

        NewTarget = 1 << 14,                            // Contains a 'new.target' meta-property
        CapturedLexicalThis = 1 << 15,                  // Contains a lexical `this` reference captured by an arrow function.

        //
        // Subtree masks
        //

        SubtreeFactsMask = ~AncestorFactsMask,

        ArrowFunctionSubtreeExcludes = None,
        FunctionSubtreeExcludes = NewTarget | CapturedLexicalThis,
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
        let convertedLoopState: ConvertedLoopState | undefined;

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

            currentSourceFile = undefined!;
            currentText = undefined!;
            taggedTemplateStringDeclarations = undefined!;
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
            return (hierarchyFacts & HierarchyFacts.ConstructorWithCapturedSuper) !== 0
                && node.kind === SyntaxKind.ReturnStatement
                && !(<ReturnStatement>node).expression;
        }

        function shouldVisitNode(node: Node): boolean {
            return (node.transformFlags & TransformFlags.ContainsES2015) !== 0
                || convertedLoopState !== undefined
                || (hierarchyFacts & HierarchyFacts.ConstructorWithCapturedSuper && (isStatement(node) || (node.kind === SyntaxKind.Block)))
                || (isIterationStatement(node, /*lookInLabeledStatements*/ false) && shouldConvertIterationStatement(node))
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
            const prologue: Statement[] = [];
            const statements: Statement[] = [];
            startLexicalEnvironment();
            let statementOffset = addStandardPrologue(prologue, node.statements, /*ensureUseStrict*/ false);
            statementOffset = addCustomPrologue(prologue, node.statements, statementOffset, visitor);
            addRange(statements, visitNodes(node.statements, visitor, isStatement, statementOffset));
            if (taggedTemplateStringDeclarations) {
                statements.push(
                    createVariableStatement(/*modifiers*/ undefined,
                        createVariableDeclarationList(taggedTemplateStringDeclarations)));
            }
            mergeLexicalEnvironment(prologue, endLexicalEnvironment());
            insertCaptureThisForNodeIfNeeded(prologue, node);
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updateSourceFileNode(
                node,
                setTextRange(createNodeArray(concatenate(prologue, statements)), node.statements)
            );
        }

        function visitSwitchStatement(node: SwitchStatement): SwitchStatement {
            if (convertedLoopState !== undefined) {
                const savedAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                // for switch statement allow only non-labeled break
                convertedLoopState.allowedNonLabeledJumps! |= Jump.Break;
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
                convertedLoopState.nonLocalJumps! |= Jump.Return;
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
            if (hierarchyFacts & HierarchyFacts.ArrowFunction) {
                hierarchyFacts |= HierarchyFacts.CapturedLexicalThis;
            }
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
                    (!node.label && (convertedLoopState.allowedNonLabeledJumps! & jump));

                if (!canUseBreakOrContinue) {
                    let labelMarker: string;
                    const label = node.label;
                    if (!label) {
                        if (node.kind === SyntaxKind.BreakStatement) {
                            convertedLoopState.nonLocalJumps! |= Jump.Break;
                            labelMarker = "break";
                        }
                        else {
                            convertedLoopState.nonLocalJumps! |= Jump.Continue;
                            // note: return value is emitted only to simplify debugging, call to converted loop body does not do any dispatching on it.
                            labelMarker = "continue";
                        }
                    }
                    else {
                        if (node.kind === SyntaxKind.BreakStatement) {
                            labelMarker = `break-${label.escapedText}`;
                            setLabeledJump(convertedLoopState, /*isBreak*/ true, idText(label), labelMarker);
                        }
                        else {
                            labelMarker = `continue-${label.escapedText}`;
                            setLabeledJump(convertedLoopState, /*isBreak*/ false, idText(label), labelMarker);
                        }
                    }
                    let returnExpression: Expression = createLiteral(labelMarker);
                    if (convertedLoopState.loopOutParameters.length) {
                        const outParams = convertedLoopState.loopOutParameters;
                        let expr: Expression | undefined;
                        for (let i = 0; i < outParams.length; i++) {
                            const copyExpr = copyOutParameter(outParams[i], CopyDirection.ToOutParameter);
                            if (i === 0) {
                                expr = copyExpr;
                            }
                            else {
                                expr = createBinary(expr!, SyntaxKind.CommaToken, copyExpr);
                            }
                        }
                        returnExpression = createBinary(expr!, SyntaxKind.CommaToken, returnExpression);
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
            if (hasSyntacticModifier(node, ModifierFlags.Export)) {
                const exportStatement = hasSyntacticModifier(node, ModifierFlags.Default)
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

            const extendsClauseElement = getClassExtendsHeritageElement(node);
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
        function transformClassBody(node: ClassExpression | ClassDeclaration, extendsClauseElement: ExpressionWithTypeArguments | undefined): Block {
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

            insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());

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
        function addExtendsHelperIfNeeded(statements: Statement[], node: ClassExpression | ClassDeclaration, extendsClauseElement: ExpressionWithTypeArguments | undefined): void {
            if (extendsClauseElement) {
                statements.push(
                    setTextRange(
                        createExpressionStatement(
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
        function addConstructor(statements: Statement[], node: ClassExpression | ClassDeclaration, extendsClauseElement: ExpressionWithTypeArguments | undefined): void {
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
            exitSubtree(ancestorFacts, HierarchyFacts.FunctionSubtreeExcludes, HierarchyFacts.None);
            convertedLoopState = savedConvertedLoopState;
        }

        /**
         * Transforms the parameters of the constructor declaration of a class.
         *
         * @param constructor The constructor for the class.
         * @param hasSynthesizedSuper A value indicating whether the constructor starts with a
         *                            synthesized `super` call.
         */
        function transformConstructorParameters(constructor: ConstructorDeclaration | undefined, hasSynthesizedSuper: boolean) {
            // If the TypeScript transformer needed to synthesize a constructor for property
            // initializers, it would have also added a synthetic `...args` parameter and
            // `super` call.
            // If this is the case, we do not include the synthetic `...args` parameter and
            // will instead use the `arguments` object in ES5/3.
            return visitParameterList(constructor && !hasSynthesizedSuper ? constructor.parameters : undefined, visitor, context)
                || <ParameterDeclaration[]>[];
        }

        function createDefaultConstructorBody(node: ClassDeclaration | ClassExpression, isDerivedClass: boolean) {
            // We must be here because the user didn't write a constructor
            // but we needed to call 'super(...args)' anyway as per 14.5.14 of the ES2016 spec.
            // If that's the case we can just immediately return the result of a 'super()' call.
            const statements: Statement[] = [];
            resumeLexicalEnvironment();
            mergeLexicalEnvironment(statements, endLexicalEnvironment());

            if (isDerivedClass) {
                // return _super !== null && _super.apply(this, arguments) || this;
                statements.push(createReturn(createDefaultSuperCallOrThis()));
            }

            const statementsArray = createNodeArray(statements);
            setTextRange(statementsArray, node.members);

            const block = createBlock(statementsArray, /*multiLine*/ true);
            setTextRange(block, node);
            setEmitFlags(block, EmitFlags.NoComments);
            return block;
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
        function transformConstructorBody(constructor: ConstructorDeclaration & { body: FunctionBody } | undefined, node: ClassDeclaration | ClassExpression, extendsClauseElement: ExpressionWithTypeArguments | undefined, hasSynthesizedSuper: boolean) {
            // determine whether the class is known syntactically to be a derived class (e.g. a
            // class that extends a value that is not syntactically known to be `null`).
            const isDerivedClass = !!extendsClauseElement && skipOuterExpressions(extendsClauseElement.expression).kind !== SyntaxKind.NullKeyword;

            // When the subclass does not have a constructor, we synthesize a *default* constructor using the following
            // representation:
            //
            // ```
            // // es2015 (source)
            // class C extends Base { }
            //
            // // es5 (transformed)
            // var C = (function (_super) {
            //     function C() {
            //         return _super.apply(this, arguments) || this;
            //     }
            //     return C;
            // })(Base);
            // ```
            if (!constructor) return createDefaultConstructorBody(node, isDerivedClass);

            // The prologue will contain all leading standard and custom prologue statements added by this transform
            const prologue: Statement[] = [];
            const statements: Statement[] = [];
            resumeLexicalEnvironment();

            // If a super call has already been synthesized,
            // we're going to assume that we should just transform everything after that.
            // The assumption is that no prior step in the pipeline has added any prologue directives.
            let statementOffset = 0;
            if (!hasSynthesizedSuper) statementOffset = addStandardPrologue(prologue, constructor.body.statements, /*ensureUseStrict*/ false);
            addDefaultValueAssignmentsIfNeeded(statements, constructor);
            addRestParameterIfNeeded(statements, constructor, hasSynthesizedSuper);
            if (!hasSynthesizedSuper) statementOffset = addCustomPrologue(statements, constructor.body.statements, statementOffset, visitor);

            // If the first statement is a call to `super()`, visit the statement directly
            let superCallExpression: Expression | undefined;
            if (hasSynthesizedSuper) {
                superCallExpression = createDefaultSuperCallOrThis();
            }
            else if (isDerivedClass && statementOffset < constructor.body.statements.length) {
                const firstStatement = constructor.body.statements[statementOffset];
                if (isExpressionStatement(firstStatement) && isSuperCall(firstStatement.expression)) {
                    superCallExpression = visitImmediateSuperCallInBody(firstStatement.expression);
                }
            }

            if (superCallExpression) {
                hierarchyFacts |= HierarchyFacts.ConstructorWithCapturedSuper;
                statementOffset++; // skip this statement, we will add it after visiting the rest of the body.
            }

            // visit the remaining statements
            addRange(statements, visitNodes(constructor.body.statements, visitor, isStatement, /*start*/ statementOffset));

            mergeLexicalEnvironment(prologue, endLexicalEnvironment());
            insertCaptureNewTargetIfNeeded(prologue, constructor, /*copyOnWrite*/ false);

            if (isDerivedClass) {
                if (superCallExpression && statementOffset === constructor.body.statements.length && !(constructor.body.transformFlags & TransformFlags.ContainsLexicalThis)) {
                    // If the subclass constructor does *not* contain `this` and *ends* with a `super()` call, we will use the
                    // following representation:
                    //
                    // ```
                    // // es2015 (source)
                    // class C extends Base {
                    //     constructor() {
                    //         super("foo");
                    //     }
                    // }
                    //
                    // // es5 (transformed)
                    // var C = (function (_super) {
                    //     function C() {
                    //         return _super.call(this, "foo") || this;
                    //     }
                    //     return C;
                    // })(Base);
                    // ```
                    const superCall = cast(cast(superCallExpression, isBinaryExpression).left, isCallExpression);
                    const returnStatement = createReturn(superCallExpression);
                    setCommentRange(returnStatement, getCommentRange(superCall));
                    setEmitFlags(superCall, EmitFlags.NoComments);
                    statements.push(returnStatement);
                }
                else {
                    // Otherwise, we will use the following transformed representation for calls to `super()` in a constructor:
                    //
                    // ```
                    // // es2015 (source)
                    // class C extends Base {
                    //     constructor() {
                    //         super("foo");
                    //         this.x = 1;
                    //     }
                    // }
                    //
                    // // es5 (transformed)
                    // var C = (function (_super) {
                    //     function C() {
                    //         var _this = _super.call(this, "foo") || this;
                    //         _this.x = 1;
                    //         return _this;
                    //     }
                    //     return C;
                    // })(Base);
                    // ```

                    // Since the `super()` call was the first statement, we insert the `this` capturing call to
                    // `super()` at the top of the list of `statements` (after any pre-existing custom prologues).
                    insertCaptureThisForNode(statements, constructor, superCallExpression || createActualThis());

                    if (!isSufficientlyCoveredByReturnStatements(constructor.body)) {
                        statements.push(createReturn(createFileLevelUniqueName("_this")));
                    }
                }
            }
            else {
                // If a class is not derived from a base class or does not have a call to `super()`, `this` is only
                // captured when necessitated by an arrow function capturing the lexical `this`:
                //
                // ```
                // // es2015
                // class C {}
                //
                // // es5
                // var C = (function () {
                //     function C() {
                //     }
                //     return C;
                // })();
                // ```
                insertCaptureThisForNodeIfNeeded(prologue, constructor);
            }

            const block = createBlock(
                setTextRange(
                    createNodeArray(
                        concatenate(prologue, statements)
                    ),
                    /*location*/ constructor.body.statements
                ),
                /*multiLine*/ true
            );

            setTextRange(block, constructor.body);

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
        function visitParameter(node: ParameterDeclaration): ParameterDeclaration | undefined {
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

        function hasDefaultValueOrBindingPattern(node: ParameterDeclaration) {
            return node.initializer !== undefined
                || isBindingPattern(node.name);
        }

        /**
         * Adds statements to the body of a function-like node if it contains parameters with
         * binding patterns or initializers.
         *
         * @param statements The statements for the new function body.
         * @param node A function-like node.
         */
        function addDefaultValueAssignmentsIfNeeded(statements: Statement[], node: FunctionLikeDeclaration): boolean {
            if (!some(node.parameters, hasDefaultValueOrBindingPattern)) {
                return false;
            }

            let added = false;
            for (const parameter of node.parameters) {
                const { name, initializer, dotDotDotToken } = parameter;

                // A rest parameter cannot have a binding pattern or an initializer,
                // so let's just ignore it.
                if (dotDotDotToken) {
                    continue;
                }

                if (isBindingPattern(name)) {
                    added = insertDefaultValueAssignmentForBindingPattern(statements, parameter, name, initializer) || added;
                }
                else if (initializer) {
                    insertDefaultValueAssignmentForInitializer(statements, parameter, name, initializer);
                    added = true;
                }
            }
            return added;
        }

        /**
         * Adds statements to the body of a function-like node for parameters with binding patterns
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         * @param name The name of the parameter.
         * @param initializer The initializer for the parameter.
         */
        function insertDefaultValueAssignmentForBindingPattern(statements: Statement[], parameter: ParameterDeclaration, name: BindingPattern, initializer: Expression | undefined): boolean {
            // In cases where a binding pattern is simply '[]' or '{}',
            // we usually don't want to emit a var declaration; however, in the presence
            // of an initializer, we must emit that expression to preserve side effects.
            if (name.elements.length > 0) {
                insertStatementAfterCustomPrologue(
                    statements,
                    setEmitFlags(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                flattenDestructuringBinding(
                                    parameter,
                                    visitor,
                                    context,
                                    FlattenLevel.All,
                                    getGeneratedNameForNode(parameter)
                                )
                            )
                        ),
                        EmitFlags.CustomPrologue
                    )
                );
                return true;
            }
            else if (initializer) {
                insertStatementAfterCustomPrologue(
                    statements,
                    setEmitFlags(
                        createExpressionStatement(
                            createAssignment(
                                getGeneratedNameForNode(parameter),
                                visitNode(initializer, visitor, isExpression)
                            )
                        ),
                        EmitFlags.CustomPrologue
                    )
                );
                return true;
            }
            return false;
        }

        /**
         * Adds statements to the body of a function-like node for parameters with initializers.
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         * @param name The name of the parameter.
         * @param initializer The initializer for the parameter.
         */
        function insertDefaultValueAssignmentForInitializer(statements: Statement[], parameter: ParameterDeclaration, name: Identifier, initializer: Expression): void {
            initializer = visitNode(initializer, visitor, isExpression);
            const statement = createIf(
                createTypeCheck(getSynthesizedClone(name), "undefined"),
                setEmitFlags(
                    setTextRange(
                        createBlock([
                            createExpressionStatement(
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
            insertStatementAfterCustomPrologue(statements, statement);
        }

        /**
         * Gets a value indicating whether we need to add statements to handle a rest parameter.
         *
         * @param node A ParameterDeclaration node.
         * @param inConstructorWithSynthesizedSuper A value indicating whether the parameter is
         *                                          part of a constructor declaration with a
         *                                          synthesized call to `super`
         */
        function shouldAddRestParameter(node: ParameterDeclaration | undefined, inConstructorWithSynthesizedSuper: boolean): node is ParameterDeclaration {
            return !!(node && node.dotDotDotToken && !inConstructorWithSynthesizedSuper);
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
        function addRestParameterIfNeeded(statements: Statement[], node: FunctionLikeDeclaration, inConstructorWithSynthesizedSuper: boolean): boolean {
            const prologueStatements: Statement[] = [];
            const parameter = lastOrUndefined(node.parameters);
            if (!shouldAddRestParameter(parameter, inConstructorWithSynthesizedSuper)) {
                return false;
            }

            // `declarationName` is the name of the local declaration for the parameter.
            const declarationName = parameter.name.kind === SyntaxKind.Identifier ? getMutableClone(parameter.name) : createTempVariable(/*recordTempVariable*/ undefined);
            setEmitFlags(declarationName, EmitFlags.NoSourceMap);

            // `expressionName` is the name of the parameter used in expressions.
            const expressionName = parameter.name.kind === SyntaxKind.Identifier ? getSynthesizedClone(parameter.name) : declarationName;
            const restIndex = node.parameters.length - 1;
            const temp = createLoopVariable();

            // var param = [];
            prologueStatements.push(
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
                            createExpressionStatement(
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
            prologueStatements.push(forStatement);

            if (parameter.name.kind !== SyntaxKind.Identifier) {
                // do the actual destructuring of the rest parameter if necessary
                prologueStatements.push(
                    setEmitFlags(
                        setTextRange(
                            createVariableStatement(
                                /*modifiers*/ undefined,
                                createVariableDeclarationList(
                                    flattenDestructuringBinding(parameter, visitor, context, FlattenLevel.All, expressionName),
                                )
                            ),
                            parameter
                        ),
                        EmitFlags.CustomPrologue
                    )
                );
            }

            insertStatementsAfterCustomPrologue(statements, prologueStatements);
            return true;
        }

        /**
         * Adds a statement to capture the `this` of a function declaration if it is needed.
         * NOTE: This must be executed *after* the subtree has been visited.
         *
         * @param statements The statements for the new function body.
         * @param node A node.
         */
        function insertCaptureThisForNodeIfNeeded(statements: Statement[], node: Node): boolean {
            if (hierarchyFacts & HierarchyFacts.CapturedLexicalThis && node.kind !== SyntaxKind.ArrowFunction) {
                insertCaptureThisForNode(statements, node, createThis());
                return true;
            }
            return false;
        }

        function insertCaptureThisForNode(statements: Statement[], node: Node, initializer: Expression | undefined): void {
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
            setSourceMapRange(captureThisStatement, node);
            insertStatementAfterCustomPrologue(statements, captureThisStatement);
        }

        function insertCaptureNewTargetIfNeeded(statements: Statement[], node: FunctionLikeDeclaration, copyOnWrite: boolean): Statement[] {
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

                setEmitFlags(captureNewTargetStatement, EmitFlags.NoComments | EmitFlags.CustomPrologue);

                if (copyOnWrite) {
                    statements = statements.slice();
                }

                insertStatementAfterCustomPrologue(statements, captureNewTargetStatement);
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
                        Debug.failBadSyntaxKind(member, currentSourceFile && currentSourceFile.fileName);
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
            const commentRange = getCommentRange(member);
            const sourceMapRange = getSourceMapRange(member);
            const memberFunction = transformFunctionLikeToExpression(member, /*location*/ member, /*name*/ undefined, container);
            const propertyName = visitNode(member.name, visitor, isPropertyName);
            let e: Expression;
            if (!isPrivateIdentifier(propertyName) && context.getCompilerOptions().useDefineForClassFields) {
                const name = isComputedPropertyName(propertyName) ? propertyName.expression
                    : isIdentifier(propertyName) ? createStringLiteral(unescapeLeadingUnderscores(propertyName.escapedText))
                    : propertyName;
                e = createObjectDefinePropertyCall(receiver, name, createPropertyDescriptor({ value: memberFunction, enumerable: false, writable: true, configurable: true }));
            }
            else {
                const memberName = createMemberAccessForPropertyName(receiver, propertyName, /*location*/ member.name);
                e = createAssignment(memberName, memberFunction);
            }
            setEmitFlags(memberFunction, EmitFlags.NoComments);
            setSourceMapRange(memberFunction, sourceMapRange);
            const statement = setTextRange(createExpressionStatement(e), /*location*/ member);

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
        function transformAccessorsToStatement(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations, container: Node): Statement {
            const statement = createExpressionStatement(transformAccessorsToExpression(receiver, accessors, container, /*startsOnNewLine*/ false));
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
            // To align with source maps in the old emitter, the receiver and property name
            // arguments are both mapped contiguously to the accessor name.
            const target = getMutableClone(receiver);
            setEmitFlags(target, EmitFlags.NoComments | EmitFlags.NoTrailingSourceMap);
            setSourceMapRange(target, firstAccessor.name);

            const visitedAccessorName = visitNode(firstAccessor.name, visitor, isPropertyName);
            if (isPrivateIdentifier(visitedAccessorName)) {
                return Debug.failBadSyntaxKind(visitedAccessorName, "Encountered unhandled private identifier while transforming ES2015.");
            }
            const propertyName = createExpressionForPropertyName(visitedAccessorName);
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
                createPropertyAssignment("enumerable", getAccessor || setAccessor ? createFalse() : createTrue()),
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

            return call;
        }

        /**
         * Visits an ArrowFunction and transforms it into a FunctionExpression.
         *
         * @param node An ArrowFunction node.
         */
        function visitArrowFunction(node: ArrowFunction) {
            if (node.transformFlags & TransformFlags.ContainsLexicalThis) {
                hierarchyFacts |= HierarchyFacts.CapturedLexicalThis;
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

            if (hierarchyFacts & HierarchyFacts.CapturedLexicalThis) {
                enableSubstitutionsForCapturedThis();
            }

            // If an arrow function contains
            exitSubtree(ancestorFacts, HierarchyFacts.ArrowFunctionSubtreeExcludes, HierarchyFacts.None);

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
            const body = transformFunctionBody(node);
            const name = hierarchyFacts & HierarchyFacts.NewTarget
                ? getLocalName(node)
                : node.name;

            exitSubtree(ancestorFacts, HierarchyFacts.FunctionSubtreeExcludes, HierarchyFacts.None);
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
            const body = transformFunctionBody(node);
            const name = hierarchyFacts & HierarchyFacts.NewTarget
                ? getLocalName(node)
                : node.name;

            exitSubtree(ancestorFacts, HierarchyFacts.FunctionSubtreeExcludes, HierarchyFacts.None);
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
        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location: TextRange | undefined, name: Identifier | undefined, container: Node | undefined): FunctionExpression {
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const ancestorFacts = container && isClassLike(container) && !hasSyntacticModifier(node, ModifierFlags.Static)
                ? enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes | HierarchyFacts.NonStaticClassElement)
                : enterSubtree(HierarchyFacts.FunctionExcludes, HierarchyFacts.FunctionIncludes);
            const parameters = visitParameterList(node.parameters, visitor, context);
            const body = transformFunctionBody(node);
            if (hierarchyFacts & HierarchyFacts.NewTarget && !name && (node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.FunctionExpression)) {
                name = getGeneratedNameForNode(node);
            }

            exitSubtree(ancestorFacts, HierarchyFacts.FunctionSubtreeExcludes, HierarchyFacts.None);
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
            let closeBraceLocation: TextRange | undefined;

            const prologue: Statement[] = [];
            const statements: Statement[] = [];
            const body = node.body!;
            let statementOffset: number | undefined;

            resumeLexicalEnvironment();
            if (isBlock(body)) {
                // ensureUseStrict is false because no new prologue-directive should be added.
                // addStandardPrologue will put already-existing directives at the beginning of the target statement-array
                statementOffset = addStandardPrologue(prologue, body.statements, /*ensureUseStrict*/ false);
                statementOffset = addCustomPrologue(statements, body.statements, statementOffset, visitor, isHoistedFunction);
                statementOffset = addCustomPrologue(statements, body.statements, statementOffset, visitor, isHoistedVariableStatement);
            }

            multiLine = addDefaultValueAssignmentsIfNeeded(statements, node) || multiLine;
            multiLine = addRestParameterIfNeeded(statements, node, /*inConstructorWithSynthesizedSuper*/ false) || multiLine;

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

                const equalsGreaterThanToken = node.equalsGreaterThanToken;
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

            mergeLexicalEnvironment(prologue, endLexicalEnvironment());
            insertCaptureNewTargetIfNeeded(prologue, node, /*copyOnWrite*/ false);
            insertCaptureThisForNodeIfNeeded(prologue, node);

            // If we added any final generated statements, this must be a multi-line block
            if (some(prologue)) {
                multiLine = true;
            }

            statements.unshift(...prologue);
            if (isBlock(body) && arrayIsEqualTo(statements, body.statements)) {
                // no changes were made, preserve the tree
                return body;
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
                    return updateExpressionStatement(node, visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false));
                case SyntaxKind.BinaryExpression:
                    return updateExpressionStatement(node, visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false));
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

        function isVariableStatementOfTypeScriptClassWrapper(node: VariableStatement) {
            return node.declarationList.declarations.length === 1
                && !!node.declarationList.declarations[0].initializer
                && !!(getEmitFlags(node.declarationList.declarations[0].initializer) & EmitFlags.TypeScriptClassWrapper);
        }

        function visitVariableStatement(node: VariableStatement): Statement | undefined {
            const ancestorFacts = enterSubtree(HierarchyFacts.None, hasSyntacticModifier(node, ModifierFlags.Export) ? HierarchyFacts.ExportedVariableStatement : HierarchyFacts.None);
            let updated: Statement | undefined;
            if (convertedLoopState && (node.declarationList.flags & NodeFlags.BlockScoped) === 0 && !isVariableStatementOfTypeScriptClassWrapper(node)) {
                // we are inside a converted loop - hoist variable declarations
                let assignments: Expression[] | undefined;
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
                    updated = setTextRange(createExpressionStatement(inlineExpressions(assignments)), node);
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
            if (node.flags & NodeFlags.BlockScoped || node.transformFlags & TransformFlags.ContainsBindingPattern) {
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

                // If the first or last declaration is a binding pattern, we need to modify
                // the source map range for the declaration list.
                if (node.transformFlags & TransformFlags.ContainsBindingPattern
                    && (isBindingPattern(node.declarations[0].name) || isBindingPattern(last(node.declarations).name))) {
                    setSourceMapRange(declarationList, getRangeUnion(declarations));
                }

                return declarationList;
            }
            return visitEachChild(node, visitor, context);
        }

        function getRangeUnion(declarations: readonly Node[]): TextRange {
            // declarations may not be sorted by position.
            // pos should be the minimum* position over all nodes (that's not -1), end should be the maximum end over all nodes.
            let pos = -1, end = -1;
            for (const node of declarations) {
                pos = pos === -1 ? node.pos : node.pos === -1 ? pos : Math.min(pos, node.pos);
                end = Math.max(end, node.end);
            }
            return createRange(pos, end);
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
            convertedLoopState!.labels!.set(idText(node.label), true);
        }

        function resetLabel(node: LabeledStatement) {
            convertedLoopState!.labels!.set(idText(node.label), false);
        }

        function visitLabeledStatement(node: LabeledStatement): VisitResult<Statement> {
            if (convertedLoopState && !convertedLoopState.labels) {
                convertedLoopState.labels = createMap<boolean>();
            }
            const statement = unwrapInnermostStatementOfLabel(node, convertedLoopState && recordLabel);
            return isIterationStatement(statement, /*lookInLabeledStatements*/ false)
                ? visitIterationStatement(statement, /*outermostLabeledStatement*/ node)
                : restoreEnclosingLabel(visitNode(statement, visitor, isStatement, liftToBlock), node, convertedLoopState && resetLabel);
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

        function visitIterationStatementWithFacts(excludeFacts: HierarchyFacts, includeFacts: HierarchyFacts, node: IterationStatement, outermostLabeledStatement: LabeledStatement | undefined, convert?: LoopConverter) {
            const ancestorFacts = enterSubtree(excludeFacts, includeFacts);
            const updated = convertIterationStatementBodyIfNecessary(node, outermostLabeledStatement, ancestorFacts, convert);
            exitSubtree(ancestorFacts, HierarchyFacts.None, HierarchyFacts.None);
            return updated;
        }

        function visitDoOrWhileStatement(node: DoStatement | WhileStatement, outermostLabeledStatement: LabeledStatement | undefined) {
            return visitIterationStatementWithFacts(
                HierarchyFacts.DoOrWhileStatementExcludes,
                HierarchyFacts.DoOrWhileStatementIncludes,
                node,
                outermostLabeledStatement);
        }

        function visitForStatement(node: ForStatement, outermostLabeledStatement: LabeledStatement | undefined) {
            return visitIterationStatementWithFacts(
                HierarchyFacts.ForStatementExcludes,
                HierarchyFacts.ForStatementIncludes,
                node,
                outermostLabeledStatement);
        }

        function visitForInStatement(node: ForInStatement, outermostLabeledStatement: LabeledStatement | undefined) {
            return visitIterationStatementWithFacts(
                HierarchyFacts.ForInOrForOfStatementExcludes,
                HierarchyFacts.ForInOrForOfStatementIncludes,
                node,
                outermostLabeledStatement);
        }

        function visitForOfStatement(node: ForOfStatement, outermostLabeledStatement: LabeledStatement | undefined): VisitResult<Statement> {
            return visitIterationStatementWithFacts(
                HierarchyFacts.ForInOrForOfStatementExcludes,
                HierarchyFacts.ForInOrForOfStatementIncludes,
                node,
                outermostLabeledStatement,
                compilerOptions.downlevelIteration ? convertForOfStatementForIterable : convertForOfStatementForArray);
        }

        function convertForOfStatementHead(node: ForOfStatement, boundValue: Expression, convertedLoopBodyStatements: Statement[]) {
            const statements: Statement[] = [];
            const initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                if (node.initializer.flags & NodeFlags.BlockScoped) {
                    enableSubstitutionsForBlockScopedBindings();
                }

                const firstOriginalDeclaration = firstOrUndefined(initializer.declarations);
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
                    setSourceMapRange(declarationList, createRange(declarations[0].pos, last(declarations).end));

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
                                        moveRangePos(initializer, -1)
                                    ),
                                    initializer
                                )
                            ),
                            moveRangeEnd(initializer, -1)
                        )
                    );
                }
            }
            else {
                // Initializer is an expression. Emit the expression in the body, so that it's
                // evaluated on every iteration.
                const assignment = createAssignment(initializer, boundValue);
                if (isDestructuringAssignment(assignment)) {
                    aggregateTransformFlags(assignment);
                    statements.push(createExpressionStatement(visitBinaryExpression(assignment, /*needsDestructuringValue*/ false)));
                }
                else {
                    assignment.end = initializer.end;
                    statements.push(setTextRange(createExpressionStatement(visitNode(assignment, visitor, isExpression)), moveRangeEnd(initializer, -1)));
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

        function convertForOfStatementForIterable(node: ForOfStatement, outermostLabeledStatement: LabeledStatement, convertedLoopBodyStatements: Statement[], ancestorFacts: HierarchyFacts): Statement {
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

            // if we are enclosed in an outer loop ensure we reset 'errorRecord' per each iteration
            const initializer = ancestorFacts & HierarchyFacts.IterationContainer
                ? inlineExpressions([createAssignment(errorRecord, createVoidZero()), values])
                : values;

            const forStatement = setEmitFlags(
                setTextRange(
                    createFor(
                        /*initializer*/ setEmitFlags(
                            setTextRange(
                                createVariableDeclarationList([
                                    setTextRange(createVariableDeclaration(iterator, /*type*/ undefined, initializer), node.expression),
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
                            createExpressionStatement(
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
                                    createExpressionStatement(
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
                if (Debug.checkDefined(property.name).kind === SyntaxKind.ComputedPropertyName) {
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

        interface ForStatementWithConvertibleInitializer extends ForStatement {
            initializer: VariableDeclarationList;
        }

        interface ForStatementWithConvertibleCondition extends ForStatement {
            condition: Expression;
        }

        interface ForStatementWithConvertibleIncrementor extends ForStatement {
            incrementor: Expression;
        }

        function shouldConvertPartOfIterationStatement(node: Node) {
            return (resolver.getNodeCheckFlags(node) & NodeCheckFlags.ContainsCapturedBlockScopeBinding) !== 0;
        }

        function shouldConvertInitializerOfForStatement(node: IterationStatement): node is ForStatementWithConvertibleInitializer {
            return isForStatement(node) && !!node.initializer && shouldConvertPartOfIterationStatement(node.initializer);
        }

        function shouldConvertConditionOfForStatement(node: IterationStatement): node is ForStatementWithConvertibleCondition {
            return isForStatement(node) && !!node.condition && shouldConvertPartOfIterationStatement(node.condition);
        }

        function shouldConvertIncrementorOfForStatement(node: IterationStatement): node is ForStatementWithConvertibleIncrementor {
            return isForStatement(node) && !!node.incrementor && shouldConvertPartOfIterationStatement(node.incrementor);
        }

        function shouldConvertIterationStatement(node: IterationStatement) {
            return shouldConvertBodyOfIterationStatement(node)
                || shouldConvertInitializerOfForStatement(node);
        }

        function shouldConvertBodyOfIterationStatement(node: IterationStatement): boolean {
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
                    state.hoistedLocalVariables!.push(node);
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

        function convertIterationStatementBodyIfNecessary(node: IterationStatement, outermostLabeledStatement: LabeledStatement | undefined, ancestorFacts: HierarchyFacts, convert?: LoopConverter): VisitResult<Statement> {
            if (!shouldConvertIterationStatement(node)) {
                let saveAllowedNonLabeledJumps: Jump | undefined;
                if (convertedLoopState) {
                    // we get here if we are trying to emit normal loop loop inside converted loop
                    // set allowedNonLabeledJumps to Break | Continue to mark that break\continue inside the loop should be emitted as is
                    saveAllowedNonLabeledJumps = convertedLoopState.allowedNonLabeledJumps;
                    convertedLoopState.allowedNonLabeledJumps = Jump.Break | Jump.Continue;
                }

                const result = convert
                    ? convert(node, outermostLabeledStatement, /*convertedLoopBodyStatements*/ undefined, ancestorFacts)
                    : restoreEnclosingLabel(visitEachChild(node, visitor, context), outermostLabeledStatement, convertedLoopState && resetLabel);

                if (convertedLoopState) {
                    convertedLoopState.allowedNonLabeledJumps = saveAllowedNonLabeledJumps;
                }
                return result;
            }

            const currentState = createConvertedLoopState(node);
            const statements: Statement[] = [];

            const outerConvertedLoopState = convertedLoopState;
            convertedLoopState = currentState;

            const initializerFunction = shouldConvertInitializerOfForStatement(node) ? createFunctionForInitializerOfForStatement(node, currentState) : undefined;
            const bodyFunction = shouldConvertBodyOfIterationStatement(node) ? createFunctionForBodyOfIterationStatement(node, currentState, outerConvertedLoopState) : undefined;

            convertedLoopState = outerConvertedLoopState;

            if (initializerFunction) statements.push(initializerFunction.functionDeclaration);
            if (bodyFunction) statements.push(bodyFunction.functionDeclaration);

            addExtraDeclarationsForConvertedLoop(statements, currentState, outerConvertedLoopState);

            if (initializerFunction) {
                statements.push(generateCallToConvertedLoopInitializer(initializerFunction.functionName, initializerFunction.containsYield));
            }

            let loop: Statement;
            if (bodyFunction) {
                if (convert) {
                    loop = convert(node, outermostLabeledStatement, bodyFunction.part, ancestorFacts);
                }
                else {
                    const clone = convertIterationStatementCore(node, initializerFunction, createBlock(bodyFunction.part, /*multiLine*/ true));
                    aggregateTransformFlags(clone);
                    loop = restoreEnclosingLabel(clone, outermostLabeledStatement, convertedLoopState && resetLabel);
                }
            }
            else {
                const clone = convertIterationStatementCore(node, initializerFunction, visitNode(node.statement, visitor, isStatement, liftToBlock));
                aggregateTransformFlags(clone);
                loop = restoreEnclosingLabel(clone, outermostLabeledStatement, convertedLoopState && resetLabel);
            }

            statements.push(loop);
            return statements;
        }

        function convertIterationStatementCore(node: IterationStatement, initializerFunction: IterationStatementPartFunction<VariableDeclarationList> | undefined, convertedLoopBody: Statement) {
            switch (node.kind) {
                case SyntaxKind.ForStatement: return convertForStatement(node as ForStatement, initializerFunction, convertedLoopBody);
                case SyntaxKind.ForInStatement: return convertForInStatement(node as ForInStatement, convertedLoopBody);
                case SyntaxKind.ForOfStatement: return convertForOfStatement(node as ForOfStatement, convertedLoopBody);
                case SyntaxKind.DoStatement: return convertDoStatement(node as DoStatement, convertedLoopBody);
                case SyntaxKind.WhileStatement: return convertWhileStatement(node as WhileStatement, convertedLoopBody);
                default: return Debug.failBadSyntaxKind(node, "IterationStatement expected");
            }
        }

        function convertForStatement(node: ForStatement, initializerFunction: IterationStatementPartFunction<VariableDeclarationList> | undefined, convertedLoopBody: Statement) {
            const shouldConvertCondition = node.condition && shouldConvertPartOfIterationStatement(node.condition);
            const shouldConvertIncrementor = shouldConvertCondition || node.incrementor && shouldConvertPartOfIterationStatement(node.incrementor);
            return updateFor(
                node,
                visitNode(initializerFunction ? initializerFunction.part : node.initializer, visitor, isForInitializer),
                visitNode(shouldConvertCondition ? undefined : node.condition, visitor, isExpression),
                visitNode(shouldConvertIncrementor ? undefined : node.incrementor, visitor, isExpression),
                convertedLoopBody
            );
        }

        function convertForOfStatement(node: ForOfStatement, convertedLoopBody: Statement) {
            return updateForOf(
                node,
                /*awaitModifier*/ undefined,
                visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.expression, visitor, isExpression),
                convertedLoopBody);
        }

        function convertForInStatement(node: ForInStatement, convertedLoopBody: Statement) {
            return updateForIn(
                node,
                visitNode(node.initializer, visitor, isForInitializer),
                visitNode(node.expression, visitor, isExpression),
                convertedLoopBody);
        }

        function convertDoStatement(node: DoStatement, convertedLoopBody: Statement) {
            return updateDo(
                node,
                convertedLoopBody,
                visitNode(node.expression, visitor, isExpression));
        }

        function convertWhileStatement(node: WhileStatement, convertedLoopBody: Statement) {
            return updateWhile(
                node,
                visitNode(node.expression, visitor, isExpression),
                convertedLoopBody);
        }

        function createConvertedLoopState(node: IterationStatement) {
            let loopInitializer: VariableDeclarationList | undefined;
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
                const hasCapturedBindingsInForInitializer = shouldConvertInitializerOfForStatement(node);
                for (const decl of loopInitializer.declarations) {
                    processLoopVariableDeclaration(node, decl, loopParameters, loopOutParameters, hasCapturedBindingsInForInitializer);
                }
            }

            const currentState: ConvertedLoopState = { loopParameters, loopOutParameters };
            if (convertedLoopState) {
                // convertedOuterLoopState !== undefined means that this converted loop is nested in another converted loop.
                // if outer converted loop has already accumulated some state - pass it through
                if (convertedLoopState.argumentsName) {
                    // outer loop has already used 'arguments' so we've already have some name to alias it
                    // use the same name in all nested loops
                    currentState.argumentsName = convertedLoopState.argumentsName;
                }
                if (convertedLoopState.thisName) {
                    // outer loop has already used 'this' so we've already have some name to alias it
                    // use the same name in all nested loops
                    currentState.thisName = convertedLoopState.thisName;
                }
                if (convertedLoopState.hoistedLocalVariables) {
                    // we've already collected some non-block scoped variable declarations in enclosing loop
                    // use the same storage in nested loop
                    currentState.hoistedLocalVariables = convertedLoopState.hoistedLocalVariables;
                }
            }
            return currentState;
        }

        function addExtraDeclarationsForConvertedLoop(statements: Statement[], state: ConvertedLoopState, outerState: ConvertedLoopState | undefined) {
            let extraVariableDeclarations: VariableDeclaration[] | undefined;
            // propagate state from the inner loop to the outer loop if necessary
            if (state.argumentsName) {
                // if alias for arguments is set
                if (outerState) {
                    // pass it to outer converted loop
                    outerState.argumentsName = state.argumentsName;
                }
                else {
                    // this is top level converted loop and we need to create an alias for 'arguments' object
                    (extraVariableDeclarations || (extraVariableDeclarations = [])).push(
                        createVariableDeclaration(
                            state.argumentsName,
                            /*type*/ undefined,
                            createIdentifier("arguments")
                        )
                    );
                }
            }

            if (state.thisName) {
                // if alias for this is set
                if (outerState) {
                    // pass it to outer converted loop
                    outerState.thisName = state.thisName;
                }
                else {
                    // this is top level converted loop so we need to create an alias for 'this' here
                    // NOTE:
                    // if converted loops were all nested in arrow function then we'll always emit '_this' so convertedLoopState.thisName will not be set.
                    // If it is set this means that all nested loops are not nested in arrow function and it is safe to capture 'this'.
                    (extraVariableDeclarations || (extraVariableDeclarations = [])).push(
                        createVariableDeclaration(
                            state.thisName,
                            /*type*/ undefined,
                            createIdentifier("this")
                        )
                    );
                }
            }

            if (state.hoistedLocalVariables) {
                // if hoistedLocalVariables !== undefined this means that we've possibly collected some variable declarations to be hoisted later
                if (outerState) {
                    // pass them to outer converted loop
                    outerState.hoistedLocalVariables = state.hoistedLocalVariables;
                }
                else {
                    if (!extraVariableDeclarations) {
                        extraVariableDeclarations = [];
                    }
                    // hoist collected variable declarations
                    for (const identifier of state.hoistedLocalVariables) {
                        extraVariableDeclarations.push(createVariableDeclaration(identifier));
                    }
                }
            }

            // add extra variables to hold out parameters if necessary
            if (state.loopOutParameters.length) {
                if (!extraVariableDeclarations) {
                    extraVariableDeclarations = [];
                }
                for (const outParam of state.loopOutParameters) {
                    extraVariableDeclarations.push(createVariableDeclaration(outParam.outParamName));
                }
            }

            if (state.conditionVariable) {
                if (!extraVariableDeclarations) {
                    extraVariableDeclarations = [];
                }
                extraVariableDeclarations.push(createVariableDeclaration(state.conditionVariable, /*type*/ undefined, createFalse()));
            }

            // create variable statement to hold all introduced variable declarations
            if (extraVariableDeclarations) {
                statements.push(createVariableStatement(
                    /*modifiers*/ undefined,
                    createVariableDeclarationList(extraVariableDeclarations)
                ));
            }
        }

        interface IterationStatementPartFunction<T> {
            functionName: Identifier;
            functionDeclaration: Statement;
            containsYield: boolean;
            part: T;
        }

        function createOutVariable(p: LoopOutParameter) {
            return createVariableDeclaration(p.originalName, /*type*/ undefined, p.outParamName);
        }

        /**
         * Creates a `_loop_init` function for a `ForStatement` with a block-scoped initializer
         * that is captured in a closure inside of the initializer. The `_loop_init` function is
         * used to preserve the per-iteration environment semantics of
         * [13.7.4.8 RS: ForBodyEvaluation](https://tc39.github.io/ecma262/#sec-forbodyevaluation).
         */
        function createFunctionForInitializerOfForStatement(node: ForStatementWithConvertibleInitializer, currentState: ConvertedLoopState): IterationStatementPartFunction<VariableDeclarationList> {
            const functionName = createUniqueName("_loop_init");

            const containsYield = (node.initializer.transformFlags & TransformFlags.ContainsYield) !== 0;
            let emitFlags = EmitFlags.None;
            if (currentState.containsLexicalThis) emitFlags |= EmitFlags.CapturesThis;
            if (containsYield && hierarchyFacts & HierarchyFacts.AsyncFunctionBody) emitFlags |= EmitFlags.AsyncFunctionBody;

            const statements: Statement[] = [];
            statements.push(createVariableStatement(/*modifiers*/ undefined, node.initializer));
            copyOutParameters(currentState.loopOutParameters, LoopOutParameterFlags.Initializer, CopyDirection.ToOutParameter, statements);

            // This transforms the following ES2015 syntax:
            //
            //  for (let i = (setImmediate(() => console.log(i)), 0); i < 2; i++) {
            //      // loop body
            //  }
            //
            // Into the following ES5 syntax:
            //
            //  var _loop_init_1 = function () {
            //      var i = (setImmediate(() => console.log(i)), 0);
            //      out_i_1 = i;
            //  };
            //  var out_i_1;
            //  _loop_init_1();
            //  for (var i = out_i_1; i < 2; i++) {
            //      // loop body
            //  }
            //
            // Which prevents mutations to `i` in the per-iteration environment of the body
            // from affecting the initial value for `i` outside of the per-iteration environment.

            const functionDeclaration = createVariableStatement(
                /*modifiers*/ undefined,
                setEmitFlags(
                    createVariableDeclarationList([
                        createVariableDeclaration(
                            functionName,
                            /*type*/ undefined,
                            setEmitFlags(
                                createFunctionExpression(
                                    /*modifiers*/ undefined,
                                    containsYield ? createToken(SyntaxKind.AsteriskToken) : undefined,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    /*parameters*/ undefined,
                                    /*type*/ undefined,
                                    visitNode(
                                        createBlock(statements, /*multiLine*/ true),
                                        visitor,
                                        isBlock
                                    )
                                ),
                                emitFlags
                            )
                        )
                    ]),
                    EmitFlags.NoHoisting
                )
            );

            const part = createVariableDeclarationList(map(currentState.loopOutParameters, createOutVariable));
            return { functionName, containsYield, functionDeclaration, part };
        }

        /**
         * Creates a `_loop` function for an `IterationStatement` with a block-scoped initializer
         * that is captured in a closure inside of the loop body. The `_loop` function is used to
         * preserve the per-iteration environment semantics of
         * [13.7.4.8 RS: ForBodyEvaluation](https://tc39.github.io/ecma262/#sec-forbodyevaluation).
         */
        function createFunctionForBodyOfIterationStatement(node: IterationStatement, currentState: ConvertedLoopState, outerState: ConvertedLoopState | undefined): IterationStatementPartFunction<Statement[]> {
            const functionName = createUniqueName("_loop");
            startLexicalEnvironment();
            const statement = visitNode(node.statement, visitor, isStatement, liftToBlock);
            const lexicalEnvironment = endLexicalEnvironment();

            const statements: Statement[] = [];
            if (shouldConvertConditionOfForStatement(node) || shouldConvertIncrementorOfForStatement(node)) {
                // If a block-scoped variable declared in the initializer of `node` is captured in
                // the condition or incrementor, we must move the condition and incrementor into
                // the body of the for loop.
                //
                // This transforms the following ES2015 syntax:
                //
                //  for (let i = 0; setImmediate(() => console.log(i)), i < 2; setImmediate(() => console.log(i)), i++) {
                //      // loop body
                //  }
                //
                // Into the following ES5 syntax:
                //
                //  var _loop_1 = function (i) {
                //      if (inc_1)
                //          setImmediate(() => console.log(i)), i++;
                //      else
                //          inc_1 = true;
                //      if (!(setImmediate(() => console.log(i)), i < 2))
                //          return out_i_1 = i, "break";
                //      // loop body
                //      out_i_1 = i;
                //  }
                //  var out_i_1, inc_1 = false;
                //  for (var i = 0;;) {
                //      var state_1 = _loop_1(i);
                //      i = out_i_1;
                //      if (state_1 === "break")
                //          break;
                //  }
                //
                // Which prevents mutations to `i` in the per-iteration environment of the body
                // from affecting the value of `i` in the previous per-iteration environment.
                //
                // Note that the incrementor of a `for` loop is evaluated in a *new* per-iteration
                // environment that is carried over to the next iteration of the loop. As a result,
                // we must indicate whether this is the first evaluation of the loop body so that
                // we only evaluate the incrementor on subsequent evaluations.

                currentState.conditionVariable = createUniqueName("inc");
                statements.push(createIf(
                    currentState.conditionVariable,
                    createStatement(visitNode(node.incrementor, visitor, isExpression)),
                    createStatement(createAssignment(currentState.conditionVariable, createTrue()))
                ));

                if (shouldConvertConditionOfForStatement(node)) {
                    statements.push(createIf(
                        createPrefix(SyntaxKind.ExclamationToken, visitNode(node.condition, visitor, isExpression)),
                        visitNode(createBreak(), visitor, isStatement)
                    ));
                }
            }

            if (isBlock(statement)) {
                addRange(statements, statement.statements);
            }
            else {
                statements.push(statement);
            }

            copyOutParameters(currentState.loopOutParameters, LoopOutParameterFlags.Body, CopyDirection.ToOutParameter, statements);
            insertStatementsAfterStandardPrologue(statements, lexicalEnvironment);

            const loopBody = createBlock(statements, /*multiLine*/ true);
            if (isBlock(statement)) setOriginalNode(loopBody, statement);

            const containsYield = (node.statement.transformFlags & TransformFlags.ContainsYield) !== 0;

            let emitFlags: EmitFlags = 0;
            if (currentState.containsLexicalThis) emitFlags |= EmitFlags.CapturesThis;
            if (containsYield && (hierarchyFacts & HierarchyFacts.AsyncFunctionBody) !== 0) emitFlags |= EmitFlags.AsyncFunctionBody;

            // This transforms the following ES2015 syntax (in addition to other variations):
            //
            //  for (let i = 0; i < 2; i++) {
            //      setImmediate(() => console.log(i));
            //  }
            //
            // Into the following ES5 syntax:
            //
            //  var _loop_1 = function (i) {
            //      setImmediate(() => console.log(i));
            //  };
            //  for (var i = 0; i < 2; i++) {
            //      _loop_1(i);
            //  }

            const functionDeclaration =
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
                                            currentState.loopParameters,
                                            /*type*/ undefined,
                                            loopBody
                                        ),
                                        emitFlags
                                    )
                                )
                            ]
                        ),
                        EmitFlags.NoHoisting
                    )
                );

            const part = generateCallToConvertedLoop(functionName, currentState, outerState, containsYield);
            return { functionName, containsYield, functionDeclaration, part };
        }

        function copyOutParameter(outParam: LoopOutParameter, copyDirection: CopyDirection): BinaryExpression {
            const source = copyDirection === CopyDirection.ToOriginal ? outParam.outParamName : outParam.originalName;
            const target = copyDirection === CopyDirection.ToOriginal ? outParam.originalName : outParam.outParamName;
            return createBinary(target, SyntaxKind.EqualsToken, source);
        }

        function copyOutParameters(outParams: LoopOutParameter[], partFlags: LoopOutParameterFlags, copyDirection: CopyDirection, statements: Statement[]): void {
            for (const outParam of outParams) {
                if (outParam.flags & partFlags) {
                    statements.push(createExpressionStatement(copyOutParameter(outParam, copyDirection)));
                }
            }
        }

        function generateCallToConvertedLoopInitializer(initFunctionExpressionName: Identifier, containsYield: boolean): Statement {
            const call = createCall(initFunctionExpressionName, /*typeArguments*/ undefined, []);
            const callResult = containsYield
                ? createYield(
                    createToken(SyntaxKind.AsteriskToken),
                    setEmitFlags(call, EmitFlags.Iterator)
                )
                : call;
            return createStatement(callResult);
        }

        function generateCallToConvertedLoop(loopFunctionExpressionName: Identifier, state: ConvertedLoopState, outerState: ConvertedLoopState | undefined, containsYield: boolean): Statement[] {

            const statements: Statement[] = [];
            // loop is considered simple if it does not have any return statements or break\continue that transfer control outside of the loop
            // simple loops are emitted as just 'loop()';
            // NOTE: if loop uses only 'continue' it still will be emitted as simple loop
            const isSimpleLoop =
                !(state.nonLocalJumps! & ~Jump.Continue) &&
                !state.labeledNonLocalBreaks &&
                !state.labeledNonLocalContinues;

            const call = createCall(loopFunctionExpressionName, /*typeArguments*/ undefined, map(state.loopParameters, p => <Identifier>p.name));
            const callResult = containsYield
                ? createYield(
                    createToken(SyntaxKind.AsteriskToken),
                    setEmitFlags(call, EmitFlags.Iterator)
                )
                : call;
            if (isSimpleLoop) {
                statements.push(createExpressionStatement(callResult));
                copyOutParameters(state.loopOutParameters, LoopOutParameterFlags.Body, CopyDirection.ToOriginal, statements);
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
                copyOutParameters(state.loopOutParameters, LoopOutParameterFlags.Body, CopyDirection.ToOriginal, statements);

                if (state.nonLocalJumps! & Jump.Return) {
                    let returnStatement: ReturnStatement;
                    if (outerState) {
                        outerState.nonLocalJumps! |= Jump.Return;
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

                if (state.nonLocalJumps! & Jump.Break) {
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
                    processLabeledJumps(state.labeledNonLocalBreaks!, /*isBreak*/ true, loopResultName, outerState, caseClauses);
                    processLabeledJumps(state.labeledNonLocalContinues!, /*isBreak*/ false, loopResultName, outerState, caseClauses);
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

        function processLabeledJumps(table: Map<string>, isBreak: boolean, loopResultName: Identifier, outerLoop: ConvertedLoopState | undefined, caseClauses: CaseClause[]): void {
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

        function processLoopVariableDeclaration(container: IterationStatement, decl: VariableDeclaration | BindingElement, loopParameters: ParameterDeclaration[], loopOutParameters: LoopOutParameter[], hasCapturedBindingsInForInitializer: boolean) {
            const name = decl.name;
            if (isBindingPattern(name)) {
                for (const element of name.elements) {
                    if (!isOmittedExpression(element)) {
                        processLoopVariableDeclaration(container, element, loopParameters, loopOutParameters, hasCapturedBindingsInForInitializer);
                    }
                }
            }
            else {
                loopParameters.push(createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, /*dotDotDotToken*/ undefined, name));
                const checkFlags = resolver.getNodeCheckFlags(decl);
                if (checkFlags & NodeCheckFlags.NeedsLoopOutParameter || hasCapturedBindingsInForInitializer) {
                    const outParamName = createUniqueName("out_" + idText(name));
                    let flags: LoopOutParameterFlags = 0;
                    if (checkFlags & NodeCheckFlags.NeedsLoopOutParameter) {
                        flags |= LoopOutParameterFlags.Body;
                    }
                    if (isForStatement(container) && container.initializer && resolver.isBindingCapturedByNode(container.initializer, decl)) {
                        flags |= LoopOutParameterFlags.Initializer;
                    }
                    loopOutParameters.push({ flags, originalName: name, outParamName });
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
                            expressions.push(transformAccessorsToExpression(receiver, accessors, node, !!node.multiLine));
                        }

                        break;

                    case SyntaxKind.MethodDeclaration:
                        expressions.push(transformObjectLiteralMethodDeclarationToExpression(property, receiver, node, node.multiLine!));
                        break;

                    case SyntaxKind.PropertyAssignment:
                        expressions.push(transformPropertyAssignmentToExpression(property, receiver, node.multiLine!));
                        break;

                    case SyntaxKind.ShorthandPropertyAssignment:
                        expressions.push(transformShorthandPropertyAssignmentToExpression(property, receiver, node.multiLine!));
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
            const body = transformFunctionBody(node);
            if (node.kind === SyntaxKind.GetAccessor) {
                updated = updateGetAccessor(node, node.decorators, node.modifiers, node.name, parameters, node.type, body);
            }
            else {
                updated = updateSetAccessor(node, node.decorators, node.modifiers, node.name, parameters, body);
            }
            exitSubtree(ancestorFacts, HierarchyFacts.FunctionSubtreeExcludes, HierarchyFacts.None);
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
            return visitEachChild(node, visitor, context);
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
            if (some(node.elements, isSpreadElement)) {
                // We are here because we contain a SpreadElementExpression.
                return transformAndSpreadElements(node.elements, /*needsUniqueCopy*/ true, !!node.multiLine, /*hasTrailingComma*/ !!node.elements.hasTrailingComma);
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

            const expression = skipOuterExpressions(node.expression);
            if (expression.kind === SyntaxKind.SuperKeyword ||
                isSuperProperty(expression) ||
                some(node.arguments, isSpreadElement)) {
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
            const isVariableStatementWithInitializer = (stmt: Statement) => isVariableStatement(stmt) && !!first(stmt.declarationList.declarations).initializer;

            // visit the class body statements outside of any converted loop body.
            const savedConvertedLoopState = convertedLoopState;
            convertedLoopState = undefined;
            const bodyStatements = visitNodes(body.statements, visitor, isStatement);
            convertedLoopState = savedConvertedLoopState;

            const classStatements = filter(bodyStatements, isVariableStatementWithInitializer);
            const remainingStatements = filter(bodyStatements, stmt => !isVariableStatementWithInitializer(stmt));
            const varStatement = cast(first(classStatements), isVariableStatement);

            // We know there is only one variable declaration here as we verified this in an
            // earlier call to isTypeScriptClassWrapper
            const variable = varStatement.declarationList.declarations[0];
            const initializer = skipOuterExpressions(variable.initializer!);

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
                    createExpressionStatement(
                        createAssignment(
                            aliasAssignment.left,
                            cast(variable.name, isIdentifier)
                        )
                    )
                );
            }

            // Find the trailing 'return' statement (4)
            while (!isReturnStatement(elementAt(funcStatements, classBodyEnd)!)) {
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
            if (node.transformFlags & TransformFlags.ContainsRestOrSpread ||
                node.expression.kind === SyntaxKind.SuperKeyword ||
                isSuperProperty(skipOuterExpressions(node.expression))) {

                const { target, thisArg } = createCallBinding(node.expression, hoistVariableDeclaration);
                if (node.expression.kind === SyntaxKind.SuperKeyword) {
                    setEmitFlags(thisArg, EmitFlags.NoSubstitution);
                }

                let resultingCall: CallExpression | BinaryExpression;
                if (node.transformFlags & TransformFlags.ContainsRestOrSpread) {
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
                        node.expression.kind === SyntaxKind.SuperKeyword ? thisArg : visitNode(thisArg, visitor, isExpression),
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
                        node.expression.kind === SyntaxKind.SuperKeyword ? thisArg : visitNode(thisArg, visitor, isExpression),
                        visitNodes(node.arguments, visitor, isExpression),
                        /*location*/ node
                    );
                }

                if (node.expression.kind === SyntaxKind.SuperKeyword) {
                    const initializer =
                        createLogicalOr(
                            resultingCall,
                            createActualThis()
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
            if (some(node.arguments, isSpreadElement)) {
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
                        transformAndSpreadElements(createNodeArray([createVoidZero(), ...node.arguments!]), /*needsUniqueCopy*/ false, /*multiLine*/ false, /*hasTrailingComma*/ false)
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
            // [output (downlevelIteration)]
            //      __spread([a], b, [c])
            //
            // [output]
            //      __spreadArrays([a], b, [c])

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
                    if (isCallToHelper(firstSegment, "___spread" as __String)) {
                        return segments[0];
                    }
                }

                return createSpreadHelper(context, segments);
            }
            else {
                if (segments.length === 1) {
                    const firstSegment = segments[0];
                    if (!needsUniqueCopy
                        || isPackedArrayLiteral(firstSegment)
                        || isCallToHelper(firstSegment, "___spreadArrays" as __String)) {
                        return segments[0];
                    }
                }

                return createSpreadArraysHelper(context, segments);
            }
        }

        function isPackedElement(node: Expression) {
            return !isOmittedExpression(node);
        }

        function isPackedArrayLiteral(node: Expression) {
            return isArrayLiteralExpression(node) && every(node.elements, isPackedElement);
        }

        function isCallToHelper(firstSegment: Expression, helperName: __String) {
            return isCallExpression(firstSegment)
                && isIdentifier(firstSegment.expression)
                && (getEmitFlags(firstSegment.expression) & EmitFlags.HelperName)
                && firstSegment.expression.escapedText === helperName;
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
            return processTaggedTemplateExpression(
                context,
                node,
                visitor,
                currentSourceFile,
                recordTaggedTemplateString,
                ProcessLevel.All
            );
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
            const expression = reduceLeft(expressions, createAdd)!;
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
            return hierarchyFacts & HierarchyFacts.NonStaticClassElement && !isExpressionOfCall ? createPropertyAccess(createFileLevelUniqueName("_super"), "prototype") :
                createFileLevelUniqueName("_super");
        }

        function visitMetaProperty(node: MetaProperty) {
            if (node.keywordToken === SyntaxKind.NewKeyword && node.name.escapedText === "target") {
                hierarchyFacts |= HierarchyFacts.NewTarget;
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
            switch (node.parent.kind) {
                case SyntaxKind.BindingElement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.VariableDeclaration:
                    return (<NamedDeclaration>node.parent).name === node
                        && resolver.isDeclarationWithCollidingName(<Declaration>node.parent);
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
            let currentNode: Node | undefined = getParseTreeNode(node);
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
            return hasSyntacticModifier(member, ModifierFlags.Static)
                ? getInternalName(node)
                : createPropertyAccess(getInternalName(node), "prototype");
        }

        function hasSynthesizedDefaultSuperCall(constructor: ConstructorDeclaration | undefined, hasExtendsClause: boolean) {
            if (!constructor || !hasExtendsClause) {
                return false;
            }

            if (some(constructor.parameters)) {
                return false;
            }

            const statement = firstOrUndefined(constructor.body!.statements);
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
            getUnscopedHelperName("__extends"),
            /*typeArguments*/ undefined,
            [
                name,
                createFileLevelUniqueName("_super")
            ]
        );
    }

    export const extendsHelper: UnscopedEmitHelper = {
        name: "typescript:extends",
        importName: "__extends",
        scoped: false,
        priority: 0,
        text: `
            var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d, b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                    return extendStatics(d, b);
                };

                return function (d, b) {
                    extendStatics(d, b);
                    function __() { this.constructor = d; }
                    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                };
            })();`
    };
}
