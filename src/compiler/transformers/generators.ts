/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

// Transforms generator functions into a compatible ES5 representation with similar runtime
// semantics. This is accomplished by first transforming the body of each generator
// function into an intermediate representation that is the compiled into a JavaScript
// switch statement.
//
// Many functions in this transformer will contain comments indicating the expected
// intermediate representation. For illustrative purposes, the following intermediate
// language is used to define this intermediate representation:
//
//  .nop                            - Performs no operation.
//  .local NAME, ...                - Define local variable declarations.
//  .mark LABEL                     - Mark the location of a label.
//  .br LABEL                       - Jump to a label. If jumping out of a protected
//                                    region, all .finally blocks are executed.
//  .brtrue LABEL, (x)              - Jump to a label IIF the expression `x` is truthy.
//                                    If jumping out of a protected region, all .finally
//                                    blocks are executed.
//  .brfalse LABEL, (x)             - Jump to a label IIF the expression `x` is falsey.
//                                    If jumping out of a protected region, all .finally
//                                    blocks are executed.
//  .yield RESUME, (x)              - Yield the value of the optional expression `x`.
//                                    Resume at the label RESUME.
//  .yieldstar RESUME, (x)          - Delegate yield to the value of the optional
//                                    expression `x`. Resume at the label RESUME.
//  .loop CONTINUE, BREAK           - Marks the beginning of a loop. Any "continue" or
//                                    "break" abrupt completions jump to the CONTINUE or
//                                    BREAK labels, respectively.
//  .endloop                        - Marks the end of a loop.
//  .with (x)                       - Marks the beginning of a WithStatement block, using
//                                    the supplied expression.
//  .endwith                        - Marks the end of a WithStatement.
//  .switch                         - Marks the beginning of a SwitchStatement.
//  .endswitch                      - Marks the end of a SwitchStatement.
//  .labeled NAME                   - Marks the beginning of a LabeledStatement with the
//                                    supplied name.
//  .endlabeled                     - Marks the end of a LabeledStatement.
//  .try TRY, CATCH, FINALLY, END   - Marks the beginning of a protected region, and the
//                                    labels for each block.
//  .catch (x)                      - Marks the beginning of a catch block.
//  .finally                        - Marks the beginning of a finally block.
//  .endfinally                     - Marks the end of a finally block.
//  .endtry                         - Marks the end of a protected region.
//  .throw (x)                      - Throws the value of the expression `x`.
//  .return (x)                     - Returns the value of the expression `x`.
//
// In addition, the illustrative intermediate representation introduces some special
// variables:
//
//  %sent%                          - Either returns the next value sent to the generator,
//                                    returns the result of a delegated yield, or throws
//                                    the exception sent to the generator.
//  %error%                         - Returns the value of the current exception in a
//                                    catch block.
//
// This intermediate representation is then compiled into JavaScript syntax. The resulting
// compilation output looks something like the following:
//
//  function f() {
//      var /*locals*/;
//      /*functions*/
//      return __generator(function (state) {
//          switch (state.label) {
//              /*cases per label*/
//          }
//      });
//  }
//
// Each of the above instructions corresponds to JavaScript emit similar to the following:
//
//  .local NAME                   | var NAME;
// -------------------------------|----------------------------------------------
//  .mark LABEL                   | case LABEL:
// -------------------------------|----------------------------------------------
//  .br LABEL                     |     return [3 /*break*/, LABEL];
// -------------------------------|----------------------------------------------
//  .brtrue LABEL, (x)            |     if (x) return [3 /*break*/, LABEL];
// -------------------------------|----------------------------------------------
//  .brfalse LABEL, (x)           |     if (!(x)) return [3, /*break*/, LABEL];
// -------------------------------|----------------------------------------------
//  .yield RESUME, (x)            |     return [4 /*yield*/, x];
//  .mark RESUME                  | case RESUME:
//      a = %sent%;             |     a = state.sent();
// -------------------------------|----------------------------------------------
//  .yieldstar RESUME, (X)        |     return [5 /*yield**/, x];
//  .mark RESUME                  | case RESUME:
//      a = %sent%;             |     a = state.sent();
// -------------------------------|----------------------------------------------
//  .with (_a)                    |     with (_a) {
//      a();                      |         a();
//                                |     }
//                                |     state.label = LABEL;
//  .mark LABEL                   | case LABEL:
//                                |     with (_a) {
//      b();                      |         b();
//                                |     }
//  .endwith                      |
// -------------------------------|----------------------------------------------
//                                | case 0:
//                                |     state.trys = [];
//                                | ...
//  .try TRY, CATCH, FINALLY, END |
//  .mark TRY                     | case TRY:
//                                |     state.trys.push([TRY, CATCH, FINALLY, END]);
//  .nop                          |
//      a();                      |     a();
//  .br END                       |     return [3 /*break*/, END];
//  .catch (e)                    |
//  .mark CATCH                   | case CATCH:
//                                |     e = state.error;
//      b();                      |     b();
//  .br END                       |     return [3 /*break*/, END];
//  .finally                      |
//  .mark FINALLY                 | case FINALLY:
//      c();                      |     c();
//  .endfinally                   |     return [7 /*endfinally*/];
//  .endtry                       |
//  .mark END                     | case END:

/*@internal*/
namespace ts {
    type Label = number;

    const enum OpCode {
        Nop,                    // No operation, used to force a new case in the state machine
        Statement,              // A regular javascript statement
        Assign,                 // An assignment
        Break,                  // A break instruction used to jump to a label
        BreakWhenTrue,          // A break instruction used to jump to a label if a condition evaluates to true
        BreakWhenFalse,         // A break instruction used to jump to a label if a condition evaluates to false
        Yield,                  // A completion instruction for the `yield` keyword
        YieldStar,              // A completion instruction for the `yield*` keyword
        Return,                 // A completion instruction for the `return` keyword
        Throw,                  // A completion instruction for the `throw` keyword
        Endfinally              // Marks the end of a `finally` block
    }

    type OperationArguments =
        [Label] |
        [Label, Expression] |
        [Statement] |
        [Expression] |
        [Expression, Expression];

    // whether a generated code block is opening or closing at the current operation for a FunctionBuilder
    const enum BlockAction {
        Open,
        Close,
    }

    // the kind for a generated code block in a FunctionBuilder
    const enum CodeBlockKind {
        Exception,
        With,
        Switch,
        Loop,
        Labeled
    }

    // the state for a generated code exception block
    const enum ExceptionBlockState {
        Try,
        Catch,
        Finally,
        Done
    }

    // A generated code block
    interface CodeBlock {
        kind: CodeBlockKind;
    }

    // a generated exception block, used for 'try' statements
    interface ExceptionBlock extends CodeBlock {
        state: ExceptionBlockState;
        startLabel: Label;
        catchVariable?: Identifier;
        catchLabel?: Label;
        finallyLabel?: Label;
        endLabel: Label;
    }

    // A generated code that tracks the target for 'break' statements in a LabeledStatement.
    interface LabeledBlock extends CodeBlock {
        labelText: string;
        isScript: boolean;
        breakLabel: Label;
    }

    // a generated block that tracks the target for 'break' statements in a 'switch' statement
    interface SwitchBlock extends CodeBlock {
        isScript: boolean;
        breakLabel: Label;
    }

    // a generated block that tracks the targets for 'break' and 'continue' statements, used for iteration statements
    interface LoopBlock extends CodeBlock {
        continueLabel: Label;
        isScript: boolean;
        breakLabel: Label;
    }

    // a generated block associated with a 'with' statement
    interface WithBlock extends CodeBlock {
        expression: Identifier;
        startLabel: Label;
        endLabel: Label;
    }

    // NOTE: changes to this enum should be reflected in the __generator helper.
    const enum Instruction {
        Next = 0,
        Throw = 1,
        Return = 2,
        Break = 3,
        Yield = 4,
        YieldStar = 5,
        Catch = 6,
        Endfinally = 7,
    }

    const instructionNames: Map<string> = {
        [Instruction.Return]: "return",
        [Instruction.Break]: "break",
        [Instruction.Yield]: "yield",
        [Instruction.YieldStar]: "yield*",
        [Instruction.Endfinally]: "endfinally",
    };

    export function transformGenerators(context: TransformationContext) {
        const {
            getGeneratedNameForNode,
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistFunctionDeclaration,
            hoistVariableDeclaration,
        } = context;

        const resolver = context.getEmitResolver();
        const previousExpressionSubstitution = context.expressionSubstitution;
        context.expressionSubstitution = substituteExpression;

        let renamedCatchVariables: Map<boolean>;
        let renamedCatchVariableDeclarations: Map<Identifier>;

        let inGeneratorFunctionBody: boolean;
        let inStatementContainingYield: boolean;

        // Indicates whether the builder contains any exception blocks.
        let hasProtectedRegions: boolean;

        // The following three arrays store information about generated code blocks.
        // All three arrays are correlated by their index. This approach is used over allocating
        // objects to store the same information to avoid GC overhead.
        //
        let blocks: CodeBlock[]; // Information about the code block
        let blockOffsets: number[]; // The operation offset at which a code block begins or ends
        let blockActions: BlockAction[]; // Whether the code block is opened or closed
        let blockStack: CodeBlock[]; // A stack of currently open code blocks

        // Labels are used to mark locations in the code that can be the target of a Break (jump)
        // operation. These are translated into case clauses in a switch statement.
        // The following two arrays are correlated by their index. This approach is used over
        // allocating objects to store the same information to avoid GC overhead.
        //
        let labelOffsets: number[]; // The operation offset at which the label is defined.
        let labelExpressions: LiteralExpression[][]; // The NumericLiteral nodes bound to each label.
        let nextLabelId = 1; // The next label id to use.

        // Operations store information about generated code for the function body. This
        // Includes things like statements, assignments, breaks (jumps), and yields.
        // The following three arrays are correlated by their index. This approach is used over
        // allocating objects to store the same information to avoid GC overhead.
        //
        let operations: OpCode[]; // The operation to perform.
        let operationArguments: OperationArguments[]; // The arguments to the operation.
        let operationLocations: TextRange[]; // The source map location for the operation.

        let state: Identifier; // The name of the state object used by the generator at runtime.

        // The following variables store information used by the `build` function:
        //
        let blockIndex = 0; // The index of the current block.
        let labelNumber = 0; // The current label number.
        let lastOperationWasAbrupt: boolean; // Indicates whether the last operation was abrupt (break/continue).
        let lastOperationWasCompletion: boolean; // Indicates whether the last operation was a completion (return/throw).
        let clauses: CaseClause[]; // The case clauses generated for labels.
        let statements: Statement[]; // The statements for the current label.
        let exceptionBlockStack: ExceptionBlock[]; // A stack of containing exception blocks.
        let currentExceptionBlock: ExceptionBlock; // The current exception block.
        let withBlockStack: WithBlock[]; // A stack containing `with` blocks.

        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (node.transformFlags & TransformFlags.ContainsGenerators) {
                return visitEachChild(node, visitor, context);
            }

            return node;
        }

        /**
         * Visits a node.
         *
         * @param node The node to visit.
         */
        function visitor(node: Node): Node {
            if (containsYield(node)) {
                return visitJavaScriptContainingYield(node);
            }
            else if (inStatementContainingYield) {
                return visitJavaScriptInStatementContainingYield(node);
            }
            else if (inGeneratorFunctionBody) {
                return visitJavaScriptInGeneratorFunctionBody(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsGenerators) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        /**
         * Visits a node that contains a YieldExpression.
         *
         * @param node The node to visit.
         */
        function visitJavaScriptContainingYield(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.ConditionalExpression:
                    return visitConditionalExpression(<ConditionalExpression>node);
                case SyntaxKind.YieldExpression:
                    return visitYieldExpression(<YieldExpression>node);
                case SyntaxKind.ArrayLiteralExpression:
                    return visitArrayLiteralExpression(<ArrayLiteralExpression>node);
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(<ObjectLiteralExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return visitElementAccessExpression(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                    return visitCallExpression(<CallExpression>node);
                case SyntaxKind.NewExpression:
                    return visitNewExpression(<NewExpression>node);
                default:
                    return visitJavaScriptInStatementContainingYield(node);
            }
        }

        /**
         * Visits a node that is contained within a statement that contains yield.
         *
         * @param node The node to visit.
         */
        function visitJavaScriptInStatementContainingYield(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.DoStatement:
                    return visitDoStatement(<DoStatement>node);
                case SyntaxKind.WhileStatement:
                    return visitWhileStatement(<WhileStatement>node);
                case SyntaxKind.ForStatement:
                    return visitForStatement(<ForStatement>node);
                case SyntaxKind.ForInStatement:
                    return visitForInStatement(<ForInStatement>node);
                case SyntaxKind.SwitchStatement:
                    return visitSwitchStatement(<SwitchStatement>node);
                case SyntaxKind.LabeledStatement:
                    return visitLabeledStatement(<LabeledStatement>node);
                default:
                    return visitJavaScriptInGeneratorFunctionBody(node);
            }
        }

        /**
         * Visits a node that is contained within a generator function.
         *
         * @param node The node to visit.
         */
        function visitJavaScriptInGeneratorFunctionBody(node: Node): Node {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(<FunctionDeclaration>node);
                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(<FunctionExpression>node);
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return visitAccessorDeclaration(<AccessorDeclaration>node);
                default:
                    if (node.transformFlags & TransformFlags.ContainsGenerators) {
                        return visitEachChild(node, visitor, context);
                    }
                    else {
                        return node;
                    }
            }
        }

        /**
         * Visits a function declaration.
         *
         * This will be called when one of the following conditions are met:
         * - The function declaration is a generator function.
         * - The function declaration is contained within the body of a generator function.
         *
         * @param node The node to visit.
         */
        function visitFunctionDeclaration(node: FunctionDeclaration): Statement {
            if (node.asteriskToken) {
                node = setOriginalNode(
                    createFunctionDeclaration(
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        node.name,
                        node.parameters,
                        transformGeneratorFunctionBody(node.body),
                        /*location*/ node
                    ),
                    node
                );
            }
            else {
                const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                const savedInStatementContainingYield = inStatementContainingYield;
                inGeneratorFunctionBody = false;
                inStatementContainingYield = false;
                node = visitEachChild(node, visitor, context);
                inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                inStatementContainingYield = savedInStatementContainingYield;
            }

            if (inGeneratorFunctionBody) {
                // Function declarations in a generator function body are hoisted
                // to the top of the lexical scope and elided from the current statement.
                hoistFunctionDeclaration(node);
                return undefined;
            }
            else {
                return node;
            }
        }

        /**
         * Visits a function expression.
         *
         * This will be called when one of the following conditions are met:
         * - The function expression is a generator function.
         * - The function expression is contained within the body of a generator function.
         *
         * @param node The node to visit.
         */
        function visitFunctionExpression(node: FunctionExpression): Expression {
            if (node.asteriskToken) {
                node = setOriginalNode(
                    createFunctionExpression(
                        /*asteriskToken*/ undefined,
                        node.name,
                        node.parameters,
                        transformGeneratorFunctionBody(node.body),
                        /*location*/ node
                    ),
                    node
                );
            }
            else {
                const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
                const savedInStatementContainingYield = inStatementContainingYield;
                inGeneratorFunctionBody = false;
                inStatementContainingYield = false;
                node = visitEachChild(node, visitor, context);
                inGeneratorFunctionBody = savedInGeneratorFunctionBody;
                inStatementContainingYield = savedInStatementContainingYield;
            }

            return node;
        }

        /**
         * Visits a get or set accessor declaration.
         *
         * This will be called when one of the following conditions are met:
         * - The accessor is contained within the body of a generator function.
         *
         * @param node The node to visit.
         */
        function visitAccessorDeclaration(node: GetAccessorDeclaration) {
            const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
            const savedInStatementContainingYield = inStatementContainingYield;
            inGeneratorFunctionBody = false;
            inStatementContainingYield = false;
            node = visitEachChild(node, visitor, context);
            inGeneratorFunctionBody = savedInGeneratorFunctionBody;
            inStatementContainingYield = savedInStatementContainingYield;
            return node;
        }

        /**
         * Transforms the body of a generator function declaration.
         *
         * @param node The function body to transform.
         */
        function transformGeneratorFunctionBody(body: Block) {
            // Save existing generator state
            const statements: Statement[] = [];
            const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
            const savedInStatementContainingYield = inStatementContainingYield;
            const savedHasProtectedRegions = hasProtectedRegions;
            const savedBlocks = blocks;
            const savedBlockOffsets = blockOffsets;
            const savedBlockActions = blockActions;
            const savedLabelOffsets = labelOffsets;
            const savedLabelExpressions = labelExpressions;
            const savedNextLabelId = nextLabelId;
            const savedOperations = operations;
            const savedOperationArguments = operationArguments;
            const savedOperationLocations = operationLocations;
            const savedState = state;

            // Initialize generator state
            inGeneratorFunctionBody = true;
            inStatementContainingYield = false;
            hasProtectedRegions = false;
            blocks = undefined;
            blockOffsets = undefined;
            blockActions = undefined;
            labelOffsets = undefined;
            labelExpressions = undefined;
            nextLabelId = 1;
            operations = undefined;
            operationArguments = undefined;
            operationLocations = undefined;
            state = undefined;

            // Build the generator
            startLexicalEnvironment();

            transformAndEmitStatements(body.statements);

            const buildResult = build();
            addNodes(statements, endLexicalEnvironment());
            addNode(statements, createReturn(buildResult));

            // Restore previous generator state
            inGeneratorFunctionBody = savedInGeneratorFunctionBody;
            inStatementContainingYield = savedInStatementContainingYield;
            hasProtectedRegions = savedHasProtectedRegions;
            blocks = savedBlocks;
            blockOffsets = savedBlockOffsets;
            blockActions = savedBlockActions;
            labelOffsets = savedLabelOffsets;
            labelExpressions = savedLabelExpressions;
            nextLabelId = savedNextLabelId;
            operations = savedOperations;
            operationArguments = savedOperationArguments;
            operationLocations = savedOperationLocations;
            state = savedState;

            return createBlock(statements, /*location*/ body, body.multiLine);
        }

        /**
         * Visits a variable statement.
         *
         * This will be called when one of the following conditions are met:
         * - The variable statement is contained within the body of a generator function.
         *
         * @param node The node to visit.
         */
        function visitVariableStatement(node: VariableStatement): Statement {
            if (containsYield(node)) {
                transformAndEmitVariableDeclarationList(node.declarationList);
                return undefined;
            }
            else {
                for (const variable of node.declarationList.declarations) {
                    hoistVariableDeclaration(<Identifier>variable.name);
                }

                const variables = getInitializedVariables(node.declarationList);
                if (variables.length === 0) {
                    return undefined;
                }

                return createStatement(
                    inlineExpressions(
                        map(variables, transformInitializedVariable)
                    )
                );
            }
        }

        /**
         * Visits a binary expression.
         *
         * This will be called when one of the following conditions are met:
         * - The node contains a YieldExpression.
         *
         * @param node The node to visit.
         */
        function visitBinaryExpression(node: BinaryExpression): Expression {
            switch (getExpressionAssociativity(node)) {
                case Associativity.Left:
                    return visitLeftAssociativeBinaryExpression(node);
                case Associativity.Right:
                    return visitRightAssociativeBinaryExpression(node);
                default:
                    Debug.fail("Unknown associativity.");
            }
        }

        /**
         * Visits a right-associative binary expression containing `yield`.
         *
         * @param node The node to visit.
         */
        function visitRightAssociativeBinaryExpression(node: BinaryExpression) {
            switch (node.left.kind) {
                case SyntaxKind.PropertyAccessExpression: {
                    // [source]
                    //      a.b = yield;
                    //
                    // [intermediate]
                    //  .local _a
                    //      _a = a;
                    //  .yield resumeLabel
                    //  .mark resumeLabel
                    //      _a.b = %sent%;

                    const clone = getMutableClone(node);
                    const propertyAccess = <PropertyAccessExpression>node.left;
                    const propertyAccessClone = getMutableClone(propertyAccess);
                    propertyAccessClone.expression = cacheExpression(visitNode(propertyAccess.expression, visitor, isLeftHandSideExpression));
                    clone.left = propertyAccessClone;
                    clone.right = visitNode(node.right, visitor, isExpression);
                    return clone;
                }
                case SyntaxKind.ElementAccessExpression: {
                    // [source]
                    //      a[b] = yield;
                    //
                    // [intermediate]
                    //  .local _a, _b
                    //      _a = a;
                    //      _b = b;
                    //  .yield resumeLabel
                    //  .mark resumeLabel
                    //      _a[_b] = %sent%;

                    const clone = getMutableClone(node);
                    const elementAccess = <ElementAccessExpression>node.left;
                    const elementAccessClone = getMutableClone(elementAccess);
                    elementAccessClone.expression = cacheExpression(visitNode(elementAccess.expression, visitor, isLeftHandSideExpression));
                    elementAccessClone.argumentExpression = cacheExpression(visitNode(elementAccess.argumentExpression, visitor, isExpression));
                    clone.left = elementAccessClone;
                    clone.right = visitNode(node.right, visitor, isExpression);
                    return clone;
                }
            }
            return visitEachChild(node, visitor, context);
        }

        function visitLeftAssociativeBinaryExpression(node: BinaryExpression) {
            if (containsYield(node.right)) {
                if (isLogicalOperator(node.operatorToken.kind)) {
                    return visitLogicalBinaryExpression(node);
                }
                else if (node.operatorToken.kind === SyntaxKind.CommaToken) {
                    return visitCommaExpression(node);
                }

                // [source]
                //      a() + (yield) + c()
                //
                // [intermediate]
                //  .local _a
                //      _a = a();
                //  .yield resumeLabel
                //      _a + %sent% + c()

                const clone = getMutableClone(node);
                clone.left = cacheExpression(visitNode(node.left, visitor, isExpression));
                clone.right = visitNode(node.right, visitor, isExpression);
                return clone;
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a logical binary expression containing `yield`.
         *
         * @param node A node to visit.
         */
        function visitLogicalBinaryExpression(node: BinaryExpression) {
            // Logical binary expressions (`&&` and `||`) are shortcutting expressions and need
            // to be transformed as such:
            //
            // [source]
            //      x = a() && yield;
            //
            // [intermediate]
            //  .local _a
            //      _a = a();
            //  .brfalse resultLabel, (_a)
            //  .yield resumeLabel
            //  .mark resumeLabel
            //      _a = %sent%;
            //  .mark resultLabel
            //      x = _a;
            //
            // [source]
            //      x = a() || yield;
            //
            // [intermediate]
            //  .local _a
            //      _a = a();
            //  .brtrue resultLabel, (_a)
            //  .yield resumeLabel
            //  .mark resumeLabel
            //      _a = %sent%;
            //  .mark resultLabel
            //      x = _a;

            const resultLabel = defineLabel();
            const resultLocal = declareLocal();

            emitAssignment(resultLocal, visitNode(node.left, visitor, isExpression), /*location*/ node.left);
            if (node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
                // Logical `&&` shortcuts when the left-hand operand is falsey.
                emitBreakWhenFalse(resultLabel, resultLocal, /*location*/ node.left);
            }
            else {
                // Logical `||` shortcuts when the left-hand operand is truthy.
                emitBreakWhenTrue(resultLabel, resultLocal, /*location*/ node.left);
            }

            emitAssignment(resultLocal, visitNode(node.right, visitor, isExpression), /*location*/ node.right);
            markLabel(resultLabel);
            return resultLocal;
        }

        /**
         * Visits a comma expression containing `yield`.
         *
         * @param node The node to visit.
         */
        function visitCommaExpression(node: BinaryExpression) {
            // [source]
            //      x = a(), yield, b();
            //
            // [intermediate]
            //      a();
            //  .yield resumeLabel
            //  .mark resumeLabel
            //      x = %sent%, b();

            let pendingExpressions: Expression[] = [];
            visit(node.left);
            visit(node.right);
            return inlineExpressions(pendingExpressions);

            function visit(node: Expression) {
                if (isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.CommaToken) {
                    visit(node.left);
                    visit(node.right);
                }
                else {
                    if (containsYield(node) && pendingExpressions.length > 0) {
                        emitWorker(OpCode.Statement, [createStatement(inlineExpressions(pendingExpressions))]);
                        pendingExpressions = [];
                    }

                    pendingExpressions.push(visitNode(node, visitor, isExpression));
                }
            }
        }

        /**
         * Visits a conditional expression containing `yield`.
         *
         * @param node The node to visit.
         */
        function visitConditionalExpression(node: ConditionalExpression): Expression {
            // [source]
            //      x = a() ? yield : b();
            //
            // [intermediate]
            //  .local _a
            //  .brfalse whenFalseLabel, (a())
            //  .yield resumeLabel
            //  .mark resumeLabel
            //      _a = %sent%;
            //  .br resultLabel
            //  .mark whenFalseLabel
            //      _a = b();
            //  .mark resultLabel
            //      x = _a;

            // We only need to perform a specific transformation if a `yield` expression exists
            // in either the `whenTrue` or `whenFalse` branches.
            // A `yield` in the condition will be handled by the normal visitor.
            if (containsYield(node.whenTrue) || containsYield(node.whenFalse)) {
                const whenFalseLabel = defineLabel();
                const resultLabel = defineLabel();
                const resultLocal = declareLocal();
                emitBreakWhenFalse(whenFalseLabel, visitNode(node.condition, visitor, isExpression), /*location*/ node.condition);
                emitAssignment(resultLocal, visitNode(node.whenTrue, visitor, isExpression), /*location*/ node.whenTrue);
                emitBreak(resultLabel);
                markLabel(whenFalseLabel);
                emitAssignment(resultLocal, visitNode(node.whenFalse, visitor, isExpression), /*location*/ node.whenFalse);
                markLabel(resultLabel);
                return resultLocal;
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a `yield` expression.
         *
         * @param node The node to visit.
         */
        function visitYieldExpression(node: YieldExpression) {
            // [source]
            //      x = yield a();
            //
            // [intermediate]
            //  .yield resumeLabel, (a())
            //  .mark resumeLabel
            //      x = %sent%;

            const resumeLabel = defineLabel();
            if (node.asteriskToken) {
                emitYieldStar(
                    createCall(
                        createIdentifier("__values"),
                        [visitNode(node.expression, visitor, isExpression)]
                    ),
                    /*location*/ node
                );
            }
            else {
                emitYield(visitNode(node.expression, visitor, isExpression), /*location*/ node);
            }

            markLabel(resumeLabel);
            return createGeneratorResume();
        }

        /**
         * Visits an ArrayLiteralExpression that contains a YieldExpression.
         *
         * @param node The node to visit.
         */
        function visitArrayLiteralExpression(node: ArrayLiteralExpression) {
            return visitElements(node.elements, node.multiLine);
        }

        /**
         * Visits an array of expressions containing one or more YieldExpression nodes
         * and returns an expression for the resulting value.
         *
         * @param elements The elements to visit.
         * @param multiLine Whether array literals created should be emitted on multiple lines.
         */
        function visitElements(elements: NodeArray<Expression>, multiLine: boolean) {
            // [source]
            //      ar = [1, yield, 2];
            //
            // [intermediate]
            //  .local _a
            //      _a = [1];
            //  .yield resumeLabel
            //  .mark resumeLabel
            //      ar = _a.concat([%sent%, 2]);

            const numInitialElements = countInitialNodesWithoutYield(elements);

            const temp = declareLocal();
            emitAssignment(temp,
                createArrayLiteral(
                    visitNodes(elements, visitor, isExpression, 0, numInitialElements)
                )
            );

            const expressions = reduceLeft(elements, reduceElement, <Expression[]>[], numInitialElements);
            return createArrayConcat(temp, [createArrayLiteral(expressions)]);

            function reduceElement(expressions: Expression[], element: Expression) {
                if (containsYield(element) && expressions.length > 0) {
                    emitAssignment(
                        temp,
                        createArrayConcat(
                            temp,
                            [createArrayLiteral(expressions)]
                        )
                    );
                    expressions = [];
                }

                expressions.push(visitNode(element, visitor, isExpression));
                return expressions;
            }
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression) {
            // [source]
            //      o = {
            //          a: 1,
            //          b: yield,
            //          c: 2
            //      };
            //
            // [intermediate]
            //  .local _a
            //      _a = {
            //          a: 1
            //      };
            //  .yield resumeLabel
            //  .mark resumeLabel
            //      o = (_a.b = %sent%,
            //          _a.c = 2,
            //          _a);

            const properties = node.properties;
            const numInitialProperties = countInitialNodesWithoutYield(node.properties);

            const temp = declareLocal();
            emitAssignment(temp,
                createObjectLiteral(
                    visitNodes(node.properties, visitor, isObjectLiteralElement, 0, numInitialProperties),
                    /*location*/ undefined,
                    node.multiLine
                )
            );

            const expressions = reduceLeft(node.properties, reduceProperty, <Expression[]>[], numInitialProperties);
            addNode(expressions, getMutableClone(temp), node.multiLine);
            return inlineExpressions(expressions);

            function reduceProperty(expressions: Expression[], property: ObjectLiteralElement) {
                if (containsYield(property) && expressions.length > 0) {
                    emitStatement(createStatement(inlineExpressions(expressions)));
                    expressions = [];
                }

                const expression = createExpressionForObjectLiteralElement(node, property, temp);
                addNode(expressions, visitNode(expression, visitor, isExpression), node.multiLine);
                return expressions;
            }
        }

        /**
         * Visits an ElementAccessExpression that contains a YieldExpression.
         *
         * @param node The node to visit.
         */
        function visitElementAccessExpression(node: ElementAccessExpression) {
            if (containsYield(node.argumentExpression)) {
                // [source]
                //      a = x[yield];
                //
                // [intermediate]
                //  .local _a
                //      _a = x;
                //  .yield resumeLabel
                //  .mark resumeLabel
                //      a = _a[%sent%]

                const clone = getMutableClone(node);
                clone.expression = cacheExpression(visitNode(node.expression, visitor, isLeftHandSideExpression));
                clone.argumentExpression = visitNode(node.argumentExpression, visitor, isExpression);
                return clone;
            }

            return visitEachChild(node, visitor, context);
        }

        function visitCallExpression(node: CallExpression) {
            if (forEach(node.arguments, containsYield)) {
                // [source]
                //      a.b(1, yield, 2);
                //
                // [intermediate]
                //  .local _a, _b, _c
                //      _b = (_a = a).b;
                //      _c = [1];
                //  .yield resumeLabel
                //  .mark resumeLabel
                //      _b.apply(_a, _c.concat([%sent%, 2]));

                const { target, thisArg } = createCallBinding(node.expression);
                return setOriginalNode(
                    createFunctionApply(
                        cacheExpression(visitNode(target, visitor, isLeftHandSideExpression)),
                        thisArg,
                        visitElements(node.arguments, /*multiLine*/ false),
                        /*location*/ node
                    ),
                    node
                );
            }

            return visitEachChild(node, visitor, context);
        }

        function visitNewExpression(node: NewExpression) {
            if (forEach(node.arguments, containsYield)) {
                // [source]
                //      new a.b(1, yield, 2);
                //
                // [intermediate]
                //  .local _a, _b, _c
                //      _b = (_a = a.b).bind;
                //      _c = [1];
                //  .yield resumeLabel
                //  .mark resumeLabel
                //      new (_b.apply(_a, _c.concat([%sent%, 2])));

                const { target, thisArg } = createCallBinding(createPropertyAccess(node.expression, "bind"));
                return setOriginalNode(
                    createNew(
                        createFunctionApply(
                            cacheExpression(visitNode(target, visitor, isExpression)),
                            thisArg,
                            visitElements(node.arguments, /*multiLine*/ false)
                        ),
                        [],
                        /*location*/ node
                    ),
                    node
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function transformAndEmitStatements(statements: Statement[]) {
            for (const statement of statements) {
                transformAndEmitStatement(statement);
            }
        }

        function transformAndEmitEmbeddedStatement(node: Statement) {
            if (isBlock(node)) {
                transformAndEmitStatements(node.statements);
            }
            else {
                transformAndEmitStatement(node);
            }
        }

        function transformAndEmitStatement(node: Statement): void {
            const savedInStatementContainingYield = inStatementContainingYield;
            if (!inStatementContainingYield) {
                inStatementContainingYield = containsYield(node);
            }

            transformAndEmitStatementWorker(node);
            inStatementContainingYield = savedInStatementContainingYield;
        }

        function transformAndEmitStatementWorker(node: Statement): void {
            switch (node.kind) {
                case SyntaxKind.Block:
                    return transformAndEmitBlock(<Block>node);
                case SyntaxKind.ExpressionStatement:
                    return transformAndEmitExpressionStatement(<ExpressionStatement>node);
                case SyntaxKind.IfStatement:
                    return transformAndEmitIfStatement(<IfStatement>node);
                case SyntaxKind.DoStatement:
                    return transformAndEmitDoStatement(<DoStatement>node);
                case SyntaxKind.WhileStatement:
                    return transformAndEmitWhileStatement(<WhileStatement>node);
                case SyntaxKind.ForStatement:
                    return transformAndEmitForStatement(<ForStatement>node);
                case SyntaxKind.ForInStatement:
                    return transformAndEmitForInStatement(<ForInStatement>node);
                case SyntaxKind.ContinueStatement:
                    return transformAndEmitContinueStatement(<ContinueStatement>node);
                case SyntaxKind.BreakStatement:
                    return transformAndEmitBreakStatement(<BreakStatement>node);
                case SyntaxKind.ReturnStatement:
                    return transformAndEmitReturnStatement(<ReturnStatement>node);
                case SyntaxKind.WithStatement:
                    return transformAndEmitWithStatement(<WithStatement>node);
                case SyntaxKind.SwitchStatement:
                    return transformAndEmitSwitchStatement(<SwitchStatement>node);
                case SyntaxKind.LabeledStatement:
                    return transformAndEmitLabeledStatement(<LabeledStatement>node);
                case SyntaxKind.ThrowStatement:
                    return transformAndEmitThrowStatement(<ThrowStatement>node);
                case SyntaxKind.TryStatement:
                    return transformAndEmitTryStatement(<TryStatement>node);
                default:
                    return emitStatement(visitEachChild(node, visitor, context));
            }
        }

        function transformAndEmitBlock(node: Block): void {
            if (containsYield(node)) {
                transformAndEmitStatements(node.statements);
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function transformAndEmitExpressionStatement(node: ExpressionStatement) {
            emitStatement(visitNode(node, visitor, isStatement));
        }

        function transformAndEmitVariableDeclarationList(node: VariableDeclarationList): VariableDeclarationList {
            for (const variable of node.declarations) {
                hoistVariableDeclaration(<Identifier>variable.name);
            }

            const variables = getInitializedVariables(node);
            const numVariables = variables.length;
            let variablesWritten = 0;
            let pendingExpressions: Expression[] = [];
            while (variablesWritten < numVariables) {
                for (let i = variablesWritten; i < numVariables; i++) {
                    const variable = variables[i];
                    if (containsYield(variable.initializer) && pendingExpressions.length > 0) {
                        break;
                    }

                    pendingExpressions.push(transformInitializedVariable(variable));
                }

                if (pendingExpressions.length) {
                    emitStatement(createStatement(inlineExpressions(pendingExpressions)));
                    variablesWritten += pendingExpressions.length;
                    pendingExpressions = [];
                }
            }

            return undefined;
        }

        function transformInitializedVariable(node: VariableDeclaration) {
            return createAssignment(
                <Identifier>getSynthesizedClone(node.name),
                visitNode(node.initializer, visitor, isExpression)
            );
        }

        function transformAndEmitIfStatement(node: IfStatement) {
            if (containsYield(node)) {
                // [source]
                //      if (x)
                //          /*thenStatement*/
                //      else
                //          /*elseStatement*/
                //
                // [intermediate]
                //  .brfalse elseLabel, (x)
                //      /*thenStatement*/
                //  .br endLabel
                //  .mark elseLabel
                //      /*elseStatement*/
                //  .mark endLabel

                if (containsYield(node.thenStatement) || containsYield(node.elseStatement)) {
                    const endLabel = defineLabel();
                    const elseLabel = node.elseStatement ? defineLabel() : undefined;
                    emitBreakWhenFalse(node.elseStatement ? elseLabel : endLabel, visitNode(node.expression, visitor, isExpression));
                    transformAndEmitEmbeddedStatement(node.thenStatement);
                    if (node.elseStatement) {
                        emitBreak(endLabel);
                        markLabel(elseLabel);
                        transformAndEmitEmbeddedStatement(node.elseStatement);
                    }
                    markLabel(endLabel);
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function transformAndEmitDoStatement(node: DoStatement) {
            if (containsYield(node)) {
                // [source]
                //      do {
                //          /*body*/
                //      }
                //      while (i < 10);
                //
                // [intermediate]
                //  .loop conditionLabel, endLabel
                //  .mark loopLabel
                //      /*body*/
                //  .mark conditionLabel
                //  .brtrue loopLabel, (i < 10)
                //  .endloop
                //  .mark endLabel

                const conditionLabel = defineLabel();
                const loopLabel = defineLabel();
                beginLoopBlock(/*continueLabel*/ conditionLabel);
                markLabel(loopLabel);
                transformAndEmitEmbeddedStatement(node.statement);
                markLabel(conditionLabel);
                emitBreakWhenTrue(loopLabel, visitNode(node.expression, visitor, isExpression));
                endLoopBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function visitDoStatement(node: DoStatement) {
            if (inStatementContainingYield) {
                beginScriptLoopBlock();
                node = visitEachChild(node, visitor, context);
                endLoopBlock();
                return node;
            }
            else {
                return visitEachChild(node, visitor, context);
            }
        }

        function transformAndEmitWhileStatement(node: WhileStatement) {
            if (containsYield(node)) {
                // [source]
                //      while (i < 10) {
                //          /*body*/
                //      }
                //
                // [intermediate]
                //  .loop loopLabel, endLabel
                //  .mark loopLabel
                //  .brfalse endLabel, (i < 10)
                //      /*body*/
                //  .br loopLabel
                //  .endloop
                //  .mark endLabel

                const loopLabel = defineLabel();
                const endLabel = beginLoopBlock(loopLabel);
                markLabel(loopLabel);
                emitBreakWhenFalse(endLabel, visitNode(node.expression, visitor, isExpression));
                transformAndEmitEmbeddedStatement(node.statement);
                emitBreak(loopLabel);
                endLoopBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function visitWhileStatement(node: WhileStatement) {
            if (inStatementContainingYield) {
                beginScriptLoopBlock();
                node = visitEachChild(node, visitor, context);
                endLoopBlock();
                return node;
            }
            else {
                return visitEachChild(node, visitor, context);
            }
        }

        function transformAndEmitForStatement(node: ForStatement) {
            if (containsYield(node)) {
                // [source]
                //      for (var i = 0; i < 10; i++) {
                //          /*body*/
                //      }
                //
                // [intermediate]
                //  .local i
                //      i = 0;
                //  .loop incrementLabel, endLoopLabel
                //  .mark conditionLabel
                //  .brfalse endLoopLabel, (i < 10)
                //      /*body*/
                //  .mark incrementLabel
                //      i++;
                //  .br conditionLabel
                //  .endloop
                //  .mark endLoopLabel

                const conditionLabel = defineLabel();
                const incrementLabel = defineLabel();
                const endLabel = beginLoopBlock(incrementLabel);
                if (node.initializer) {
                    const initializer = node.initializer;
                    if (isVariableDeclarationList(initializer)) {
                        transformAndEmitVariableDeclarationList(initializer);
                    }
                    else {
                        emitStatement(
                            createStatement(
                                visitNode(initializer, visitor, isExpression),
                                /*location*/ initializer
                            )
                        );
                    }
                }

                markLabel(conditionLabel);
                if (node.condition) {
                    emitBreakWhenFalse(endLabel, visitNode(node.condition, visitor, isExpression));
                }

                transformAndEmitEmbeddedStatement(node.statement);

                markLabel(incrementLabel);
                if (node.incrementor) {
                    emitStatement(
                        createStatement(
                            visitNode(node.incrementor, visitor, isExpression),
                            /*location*/ node.incrementor
                        )
                    );
                }
                emitBreak(conditionLabel);
                endLoopBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function visitForStatement(node: ForStatement) {
            if (inStatementContainingYield) {
                beginScriptLoopBlock();
            }

            const initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                for (const variable of initializer.declarations) {
                    hoistVariableDeclaration(<Identifier>variable.name);
                }

                node = getMutableClone(node);

                const variables = getInitializedVariables(initializer);
                if (variables.length === 0) {
                    node.initializer = undefined;
                }
                else {
                    node.initializer = inlineExpressions(
                        map(variables, transformInitializedVariable)
                    );
                }

                node.condition = visitNode(node.condition, visitor, isExpression, /*optional*/ true);
                node.incrementor = visitNode(node.incrementor, visitor, isExpression, /*optional*/ true);
                node.statement = visitNode(node.statement, visitor, isStatement);
            }
            else {
                node = visitEachChild(node, visitor, context);
            }

            if (inStatementContainingYield) {
                endLoopBlock();
            }

            return node;
        }

        function transformAndEmitForInStatement(node: ForInStatement) {
            // TODO(rbuckton): Source map locations
            if (containsYield(node)) {
                // [source]
                //      for (var p in o) {
                //          /*body*/
                //      }
                //
                // [intermediate]
                //  .local _a, _b, p
                //      _a = __keys(o);
                //  .loop incrementLabel, endLoopLabel
                //  .try tryLabel, , finallyLabel, endTryLabel
                //  .mark tryLabel
                //  .nop
                //  .mark incrementLabel
                //      _b = _a.next();
                //  .brtrue cleanupLabel, (_b.done)
                //      p = _b.value;
                //      /*body*/
                //  .br incrementLabel
                //  .mark cleanupLabel
                //      _b = _a = void 0;
                //  .br endLoopLabel
                //  .finally
                //  .mark finallyLabel
                //      if (_a && typeof _a.return === "function")
                //          _a.return();
                //  .endfinally
                //  .endtry
                //  .mark endTryLabel
                //  .endloop
                //  .mark endLoopLabel

                const keysIterator = declareLocal(); // _a
                const iteratorResult = declareLocal(); // _b
                const initializer = node.initializer;

                let variable: Expression;
                if (isVariableDeclarationList(initializer)) {
                    for (const variable of initializer.declarations) {
                        hoistVariableDeclaration(<Identifier>variable.name);
                    }

                    variable = <Identifier>getSynthesizedClone(initializer.declarations[0].name);
                }
                else {
                    variable = initializer;
                    Debug.assert(isLeftHandSideExpression(variable));
                }

                emitAssignment(keysIterator,
                    createCall("__keys", [
                        visitNode(node.expression, visitor, isExpression)
                    ])
                );

                const incrementLabel = defineLabel();
                const cleanupLabel = defineLabel();
                const endLabel = beginLoopBlock(incrementLabel);

                beginExceptionBlock();
                markLabel(incrementLabel);
                emitAssignment(iteratorResult, createCall(createPropertyAccess(iteratorResult, "next"), []));
                emitBreakWhenTrue(cleanupLabel, createPropertyAccess(iteratorResult, "done"));
                emitAssignment(variable, createPropertyAccess(iteratorResult, "value"));
                transformAndEmitEmbeddedStatement(node.statement);
                emitBreak(incrementLabel);
                markLabel(cleanupLabel);
                emitAssignment(keysIterator, createAssignment(iteratorResult, createVoidZero()));
                emitBreak(endLabel);
                beginFinallyBlock();
                emitStatement(
                    createIf(
                        createLogicalAnd(
                            keysIterator,
                            createStrictEquality(
                                createTypeOf(
                                    createPropertyAccess(keysIterator, "return")
                                ),
                                createLiteral("function")
                            )
                        ),
                        createStatement(
                            createCall(createPropertyAccess(keysIterator, "return"), [])
                        )
                    )
                );
                emitEndfinally();
                endExceptionBlock();
                endLoopBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function visitForInStatement(node: ForInStatement) {
            // [source]
            //      for (var x in a) {
            //          /*body*/
            //      }
            //
            // [intermediate]
            //  .local x
            //  .loop
            //      for (x in a) {
            //          /*body*/
            //      }
            //  .endloop

            if (inStatementContainingYield) {
                beginScriptLoopBlock();
            }

            const initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                for (const variable of initializer.declarations) {
                    hoistVariableDeclaration(<Identifier>variable.name);
                }

                node = getMutableClone(node);

                const variable = initializer.declarations[0];
                node.initializer = <Identifier>variable.name;
                node.expression = visitNode(node.expression, visitor, isExpression);
                node.statement = visitNode(node.statement, visitor, isStatement);
            }
            else {
                node = visitEachChild(node, visitor, context);
            }

            if (inStatementContainingYield) {
                endLoopBlock();
            }

            return node;
        }

        function transformAndEmitContinueStatement(node: ContinueStatement): void {
            const label = findContinueTarget(node.label ? node.label.text : undefined);
            Debug.assert(label > 0, "Expected continue statment to point to a valid Label.");
            emitBreak(label, /*location*/ node);
        }

        function visitContinueStatement(node: ContinueStatement): Statement {
            if (inStatementContainingYield) {
                const label = findContinueTarget(node.label && node.label.text);
                if (label > 0) {
                    return createInlineBreak(label, /*location*/ node);
                }
            }

            return visitEachChild(node, visitor, context);
        }

        function transformAndEmitBreakStatement(node: BreakStatement): void {
            const label = findBreakTarget(node.label ? node.label.text : undefined);
            Debug.assert(label > 0, "Expected break statment to point to a valid Label.");
            emitBreak(label, /*location*/ node);
        }

        function visitBreakStatement(node: BreakStatement): Statement {
            if (inStatementContainingYield) {
                const label = findBreakTarget(node.label && node.label.text);
                if (label > 0) {
                    return createInlineBreak(label, /*location*/ node);
                }
            }

            return visitEachChild(node, visitor, context);
        }


        function transformAndEmitReturnStatement(node: ReturnStatement): void {
            emitReturn(
                visitNode(node.expression, visitor, isExpression, /*optional*/ true),
                /*location*/ node
            );
        }

        function visitReturnStatement(node: ReturnStatement) {
            return createInlineReturn(
                visitNode(node.expression, visitor, isExpression, /*optional*/ true),
                /*location*/ node
            );
        }

        function transformAndEmitWithStatement(node: WithStatement) {
            if (containsYield(node)) {
                // [source]
                //      with (x) {
                //          /*body*/
                //      }
                //
                // [intermediate]
                //  .with (x)
                //      /*body*/
                //  .endwith
                beginWithBlock(cacheExpression(visitNode(node.expression, visitor, isExpression)));
                transformAndEmitEmbeddedStatement(node.statement);
                endWithBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function transformAndEmitSwitchStatement(node: SwitchStatement) {
            if (containsYield(node)) {
                // [source]
                //      switch (x) {
                //          case a:
                //              /*caseStatements*/
                //          case b:
                //              /*caseStatements*/
                //          default:
                //              /*defaultStatements*/
                //      }
                //
                // [intermediate]
                //  .local _a
                //  .switch endLabel
                //      _a = x;
                //      switch (_a) {
                //          case a:
                //  .br clauseLabels[0]
                //      }
                //      switch (_a) {
                //          case b:
                //  .br clauseLabels[1]
                //      }
                //  .br clauseLabels[2]
                //  .mark clauseLabels[0]
                //      /*caseStatements*/
                //  .mark clauseLabels[1]
                //      /*caseStatements*/
                //  .mark clauseLabels[2]
                //      /*caseStatements*/
                //  .endswitch
                //  .mark endLabel

                const caseBlock = node.caseBlock;
                const numClauses = caseBlock.clauses.length;
                const endLabel = beginSwitchBlock();

                const expression = cacheExpression(visitNode(node.expression, visitor, isExpression));

                // Create labels for each clause and find the index of the first default clause.
                const clauseLabels: Label[] = [];
                let defaultClauseIndex = -1;
                for (let i = 0; i < numClauses; i++) {
                    const clause = caseBlock.clauses[i];
                    clauseLabels.push(defineLabel());
                    if (clause.kind === SyntaxKind.DefaultClause && defaultClauseIndex === -1) {
                        defaultClauseIndex = i;
                    }
                }

                // Emit switch statements for each run of case clauses either from the first case
                // clause or the next case clause with a `yield` in its expression, up to the next
                // case clause with a `yield` in its expression.
                let clausesWritten = 0;
                let pendingClauses: CaseClause[] = [];
                while (clausesWritten < numClauses) {
                    for (let i = clausesWritten; i < numClauses; i++) {
                        const clause = caseBlock.clauses[i];
                        if (clause.kind === SyntaxKind.CaseClause) {
                            const caseClause = <CaseClause>clause;
                            if (containsYield(caseClause.expression) && pendingClauses.length > 0) {
                                break;
                            }

                            pendingClauses.push(
                                createCaseClause(
                                    visitNode(caseClause.expression, visitor, isExpression),
                                    [
                                        createInlineBreak(clauseLabels[i], /*location*/ caseClause.expression)
                                    ]
                                )
                            );
                        }
                    }

                    if (pendingClauses.length) {
                        emitStatement(createSwitch(expression, createCaseBlock(pendingClauses)));
                        clausesWritten += pendingClauses.length;
                        pendingClauses = [];
                    }
                }

                if (defaultClauseIndex >= 0) {
                    emitBreak(clauseLabels[defaultClauseIndex]);
                }
                else {
                    emitBreak(endLabel);
                }

                for (let i = 0; i < numClauses; i++) {
                    markLabel(clauseLabels[i]);
                    transformAndEmitStatements(caseBlock.clauses[i].statements);
                }

                endSwitchBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function visitSwitchStatement(node: SwitchStatement) {
            if (inStatementContainingYield) {
                beginScriptSwitchBlock();
            }

            node = visitEachChild(node, visitor, context);

            if (inStatementContainingYield) {
                endSwitchBlock();
            }

            return node;
        }

        function transformAndEmitLabeledStatement(node: LabeledStatement) {
            if (containsYield(node)) {
                // [source]
                //      x: {
                //          /*body*/
                //      }
                //
                // [intermediate]
                //  .labeled "x", endLabel
                //      /*body*/
                //  .endlabeled
                //  .mark endLabel
                beginLabeledBlock(node.label.text);
                transformAndEmitEmbeddedStatement(node.statement);
                endLabeledBlock();
            }
            else {
                emitStatement(visitNode(node, visitor, isStatement));
            }
        }

        function visitLabeledStatement(node: LabeledStatement) {
            if (inStatementContainingYield) {
                beginScriptLabeledBlock(node.label.text);
            }

            node = visitEachChild(node, visitor, context);

            if (inStatementContainingYield) {
                endLabeledBlock();
            }

            return node;
        }

        function transformAndEmitThrowStatement(node: ThrowStatement): void {
            emitThrow(
                visitNode(node.expression, visitor, isExpression),
                /*location*/ node
            );
        }

        function transformAndEmitTryStatement(node: TryStatement) {
            if (containsYield(node)) {
                // [source]
                //      try {
                //          /*tryBlock*/
                //      }
                //      catch (e) {
                //          /*catchBlock*/
                //      }
                //      finally {
                //          /*finallyBlock*/
                //      }
                //
                // [intermediate]
                //  .local _a
                //  .try tryLabel, catchLabel, finallyLabel, endLabel
                //  .mark tryLabel
                //  .nop
                //      /*tryBlock*/
                //  .br endLabel
                //  .catch
                //  .mark catchLabel
                //      _a = %error%;
                //      /*catchBlock*/
                //  .br endLabel
                //  .finally
                //  .mark finallyLabel
                //      /*finallyBlock*/
                //  .endfinally
                //  .endtry
                //  .mark endLabel

                beginExceptionBlock();
                transformAndEmitEmbeddedStatement(node.tryBlock);
                if (node.catchClause) {
                    if (!renamedCatchVariables) {
                        renamedCatchVariables = {};
                    }

                    beginCatchBlock(node.catchClause.variableDeclaration);
                    transformAndEmitEmbeddedStatement(node.catchClause.block);
                }

                if (node.finallyBlock) {
                    beginFinallyBlock();
                    transformAndEmitEmbeddedStatement(node.finallyBlock);
                }

                endExceptionBlock();
            }
            else {
                emitStatement(visitEachChild(node, visitor, context));
            }
        }

        function containsYield(node: Node) {
            return node && (node.transformFlags & TransformFlags.ContainsYield) !== 0;
        }

        function countInitialNodesWithoutYield(nodes: NodeArray<Node>) {
            const numNodes = nodes.length;
            for (let i = 0; i < numNodes; i++) {
                if (containsYield(nodes[i])) {
                    return i;
                }
            }

            return -1;
        }

        function substituteExpression(node: Expression): Expression {
            node = previousExpressionSubstitution(node);
            if (isIdentifier(node)) {
                return substituteExpressionIdentifier(node);
            }
            return node;
        }

        function substituteExpressionIdentifier(node: Identifier) {
            if (renamedCatchVariables && hasProperty(renamedCatchVariables, node.text)) {
                const original = getOriginalNode(node);
                if (isIdentifier(original) && original.parent) {
                    const declaration = resolver.getReferencedValueDeclaration(original);
                    if (declaration) {
                        const name = getProperty(renamedCatchVariableDeclarations, String(getOriginalNodeId(declaration)));
                        if (name) {
                            return getRelocatedClone(name, /*location*/ node);
                        }
                    }
                }
            }

            return node;
        }

        function cacheExpression(node: Expression): Identifier {
            let temp: Identifier;
            if (isIdentifier(node)) {
                if (nodeIsSynthesized(node) || isGeneratedIdentifier(node)) {
                    return node;
                }

                temp = createUniqueName(node.text);
            }
            else {
                temp = createTempVariable();
            }

            emitAssignment(temp, node, /*location*/ node);
            return temp;
        }

        function declareLocal(name?: string): Identifier {
            const temp = name
                ? createUniqueName(name)
                : createTempVariable();
            hoistVariableDeclaration(temp);
            return temp;
        }

        /**
         * Defines a label, uses as the target of a Break operation.
         */
        function defineLabel(): Label {
            if (!labelOffsets) {
                labelOffsets = [];
            }

            const label = nextLabelId++;
            labelOffsets[label] = -1;
            return label;
        }

        /**
         * Marks the current operation with the specified label.
         */
        function markLabel(label: Label): void {
            Debug.assert(labelOffsets !== undefined, "No labels were defined.");
            labelOffsets[label] = operations ? operations.length : 0;
        }

        /**
         * Begins a block operation (With, Break/Continue, Try/Catch/Finally)
         *
         * @param block Information about the block.
         */
        function beginBlock(block: CodeBlock): number {
            if (!blocks) {
                blocks = [];
                blockActions = [];
                blockOffsets = [];
                blockStack = [];
            }

            const index = blockActions.length;
            blockActions[index] = BlockAction.Open;
            blockOffsets[index] = operations ? operations.length : 0;
            blocks[index] = block;
            blockStack.push(block);
            return index;
        }

        /**
         * Ends the current block operation.
         */
        function endBlock(): CodeBlock {
            const block = peekBlock();
            Debug.assert(block !== undefined, "beginBlock was never called.");

            const index = blockActions.length;
            blockActions[index] = BlockAction.Close;
            blockOffsets[index] = operations ? operations.length : 0;
            blocks[index] = block;
            blockStack.pop();
            return block;
        }

        /**
         * Gets the current open block.
         */
        function peekBlock() {
            return lastOrUndefined(blockStack);
        }

        /**
         * Gets the kind of the current open block.
         */
        function peekBlockKind(): CodeBlockKind {
            const block = peekBlock();
            return block && block.kind;
        }

        /**
         * Begins a code block for a generated `with` statement.
         *
         * @param expression An identifier representing expression for the `with` block.
         */
        function beginWithBlock(expression: Identifier): void {
            const startLabel = defineLabel();
            const endLabel = defineLabel();
            markLabel(startLabel);
            beginBlock(<WithBlock>{
                kind: CodeBlockKind.With,
                expression,
                startLabel,
                endLabel
            });
        }

        /**
         * Ends a code block for a generated `with` statement.
         */
        function endWithBlock(): void {
            Debug.assert(peekBlockKind() === CodeBlockKind.With);
            const block = <WithBlock>endBlock();
            markLabel(block.endLabel);
        }

        function isWithBlock(block: CodeBlock): block is WithBlock {
            return block.kind === CodeBlockKind.With;
        }

        /**
         * Begins a code block for a generated `try` statement.
         */
        function beginExceptionBlock(): Label {
            const startLabel = defineLabel();
            const endLabel = defineLabel();
            markLabel(startLabel);
            beginBlock(<ExceptionBlock>{
                kind: CodeBlockKind.Exception,
                state: ExceptionBlockState.Try,
                startLabel,
                endLabel
            });
            emitWorker(OpCode.Nop);
            hasProtectedRegions = true;
            return endLabel;
        }

        /**
         * Enters the `catch` clause of a generated `try` statement.
         *
         * @param variable The catch variable.
         */
        function beginCatchBlock(variable: VariableDeclaration): void {
            Debug.assert(peekBlockKind() === CodeBlockKind.Exception);

            const text = (<Identifier>variable.name).text;
            const name = createUniqueName(text);

            if (!renamedCatchVariables) {
                renamedCatchVariables = {};
                renamedCatchVariableDeclarations = {};
                context.enableExpressionSubstitution(SyntaxKind.Identifier);
            }

            renamedCatchVariables[text] = true;
            renamedCatchVariableDeclarations[getOriginalNodeId(variable)] = name;

            const exception = <ExceptionBlock>peekBlock();
            Debug.assert(exception.state < ExceptionBlockState.Catch);

            const endLabel = exception.endLabel;
            emitBreak(endLabel);

            const catchLabel = defineLabel();
            markLabel(catchLabel);
            exception.state = ExceptionBlockState.Catch;
            exception.catchVariable = name;
            exception.catchLabel = catchLabel;

            const state = getState();
            emitAssignment(name, createPropertyAccess(state, "error"));
            emitWorker(OpCode.Nop);
        }

        /**
         * Enters the `finally` block of a generated `try` statement.
         */
        function beginFinallyBlock(): void {
            Debug.assert(peekBlockKind() === CodeBlockKind.Exception);

            const exception = <ExceptionBlock>peekBlock();
            Debug.assert(exception.state < ExceptionBlockState.Finally);

            const state = exception.state;
            const endLabel = exception.endLabel;
            emitBreak(endLabel);

            const finallyLabel = defineLabel();
            markLabel(finallyLabel);
            exception.state = ExceptionBlockState.Finally;
            exception.finallyLabel = finallyLabel;
        }

        /**
         * Ends the code block for a generated `try` statement.
         */
        function endExceptionBlock(): void {
            Debug.assert(peekBlockKind() === CodeBlockKind.Exception);
            const exception = <ExceptionBlock>endBlock();
            const state = exception.state;
            if (state < ExceptionBlockState.Finally) {
                emitBreak(exception.endLabel);
            }
            else {
                emitEndfinally();
            }

            markLabel(exception.endLabel);
            exception.state = ExceptionBlockState.Done;
        }

        function isExceptionBlock(block: CodeBlock): block is ExceptionBlock {
            return block.kind === CodeBlockKind.Exception;
        }

        /**
         * Begins a code block that supports `break` or `continue` statements that are defined in
         * the source tree and not from generated code.
         *
         * @param labelText Names from containing labeled statements.
         */
        function beginScriptLoopBlock(): void {
            beginBlock(<LoopBlock>{
                kind: CodeBlockKind.Loop,
                isScript: true,
                breakLabel: -1,
                continueLabel: -1
            });
        }

        /**
         * Begins a code block that supports `break` or `continue` statements that are defined in
         * generated code. Returns a label used to mark the operation to which to jump when a
         * `break` statement targets this block.
         *
         * @param continueLabel A Label used to mark the operation to which to jump when a
         *                      `continue` statement targets this block.
         */
        function beginLoopBlock(continueLabel: Label): Label {
            const breakLabel = defineLabel();
            beginBlock(<LoopBlock>{
                kind: CodeBlockKind.Loop,
                isScript: false,
                breakLabel: breakLabel,
                continueLabel: continueLabel
            });
            return breakLabel;
        }

        /**
         * Ends a code block that supports `break` or `continue` statements that are defined in
         * generated code or in the source tree.
         */
        function endLoopBlock(): void {
            Debug.assert(peekBlockKind() === CodeBlockKind.Loop);
            const block = <SwitchBlock>endBlock();
            const breakLabel = block.breakLabel;
            if (!block.isScript) {
                markLabel(breakLabel);
            }
        }

        /**
         * Begins a code block that supports `break` statements that are defined in the source
         * tree and not from generated code.
         *
         */
        function beginScriptSwitchBlock(): void {
            beginBlock(<SwitchBlock>{
                kind: CodeBlockKind.Switch,
                isScript: true,
                breakLabel: -1
            });
        }


        /**
         * Begins a code block that supports `break` statements that are defined in generated code.
         * Returns a label used to mark the operation to which to jump when a `break` statement
         * targets this block.
         */
        function beginSwitchBlock(): Label {
            const breakLabel = defineLabel();
            beginBlock(<SwitchBlock>{
                kind: CodeBlockKind.Switch,
                isScript: false,
                breakLabel: breakLabel
            });
            return breakLabel;
        }

        /**
         * Ends a code block that supports `break` statements that are defined in generated code.
         */
        function endSwitchBlock(): void {
            Debug.assert(peekBlockKind() === CodeBlockKind.Switch);
            const block = <SwitchBlock>endBlock();
            const breakLabel = block.breakLabel;
            if (!block.isScript) {
                markLabel(breakLabel);
            }
        }

        function beginScriptLabeledBlock(labelText: string) {
            beginBlock(<LabeledBlock>{
                kind: CodeBlockKind.Labeled,
                isScript: true,
                labelText,
                breakLabel: -1
            });
        }

        function beginLabeledBlock(labelText: string) {
            const breakLabel = defineLabel();
            beginBlock(<LabeledBlock>{
                kind: CodeBlockKind.Labeled,
                isScript: false,
                labelText,
                breakLabel
            });
        }

        function endLabeledBlock() {
            Debug.assert(peekBlockKind() === CodeBlockKind.Labeled);
            const block = <LabeledBlock>endBlock();
            if (!block.isScript) {
                markLabel(block.breakLabel);
            }
        }

        /**
         * Indicates whether the provided block supports `break` statements.
         *
         * @param block A code block.
         */
        function supportsUnlabeledBreak(block: CodeBlock): block is SwitchBlock | LoopBlock {
            return block.kind === CodeBlockKind.Switch
                || block.kind === CodeBlockKind.Loop;
        }

        /**
         * Indicates whether the provided block supports `break` statements with labels.
         *
         * @param block A code block.
         */
        function supportsLabeledBreakOrContinue(block: CodeBlock): block is LabeledBlock {
            return block.kind === CodeBlockKind.Labeled;
        }

        /**
         * Indicates whether the provided block supports `continue` statements.
         *
         * @param block A code block.
         */
        function supportsUnlabeledContinue(block: CodeBlock): block is LoopBlock {
            return block.kind === CodeBlockKind.Loop;
        }

        function hasImmediateContainingLabeledBlock(labelText: string, start: number) {
            for (let j = start; j >= 0; j--) {
                const containingBlock = blockStack[j];
                if (supportsLabeledBreakOrContinue(containingBlock)) {
                    if (containingBlock.labelText === labelText) {
                        return true;
                    }
                }
                else {
                    break;
                }
            }

            return false;
        }

        /**
         * Finds the label that is the target for a `break` statement.
         *
         * @param labelText An optional name of a containing labeled statement.
         */
        function findBreakTarget(labelText?: string): Label {
            Debug.assert(blocks !== undefined);
            if (labelText) {
                for (let i = blockStack.length - 1; i >= 0; i--) {
                    const block = blockStack[i];
                    if (supportsLabeledBreakOrContinue(block) && block.labelText === labelText) {
                        return block.breakLabel;
                    }
                    else if (supportsUnlabeledBreak(block) && hasImmediateContainingLabeledBlock(labelText, i - 1)) {
                        return block.breakLabel;
                    }
                }
            }
            else {
                for (let i = blockStack.length - 1; i >= 0; i--) {
                    const block = blockStack[i];
                    if (supportsUnlabeledBreak(block)) {
                        return block.breakLabel;
                    }
                }
            }

            return 0;
        }

        /**
         * Finds the label that is the target for a `continue` statement.
         *
         * @param labelText An optional name of a containing labeled statement.
         */
        function findContinueTarget(labelText?: string): Label {
            Debug.assert(blocks !== undefined);
            if (labelText) {
                for (let i = blockStack.length - 1; i >= 0; i--) {
                    const block = blockStack[i];
                    if (supportsUnlabeledContinue(block) && hasImmediateContainingLabeledBlock(labelText, i - 1)) {
                        return block.continueLabel;
                    }
                }
            }
            else {
                for (let i = blockStack.length - 1; i >= 0; i--) {
                    const block = blockStack[i];
                    if (supportsUnlabeledContinue(block)) {
                        return block.continueLabel;
                    }
                }
            }

            return 0;
        }

        /**
         * Creates an expression that can be used to indicate the value for a label.
         *
         * @param label A label.
         */
        function createLabel(label: Label): Expression {
            if (label > 0) {
                if (labelExpressions === undefined) {
                    labelExpressions = [];
                }

                const expression = <LiteralExpression>createSynthesizedNode(SyntaxKind.NumericLiteral);
                if (labelExpressions[label] === undefined) {
                    labelExpressions[label] = [expression];
                }
                else {
                    labelExpressions[label].push(expression);
                }

                return expression;
            }

            return <OmittedExpression>createNode(SyntaxKind.OmittedExpression);
        }

        /**
         * Creates a numeric literal for the provided instruction.
         */
        function createInstruction(instruction: Instruction): NumericLiteral {
            return createLiteral(instruction, /*location*/ undefined, instructionNames[instruction]);
        }

        /**
         * Creates a statement that can be used indicate a Break operation to the provided label.
         *
         * @param label A label.
         * @param location An optional source map location for the statement.
         */
        function createInlineBreak(label: Label, location?: TextRange): ReturnStatement {
            Debug.assert(label > 0, `Invalid label: ${label}`);
            return createReturn(
                createArrayLiteral([
                    createInstruction(Instruction.Break),
                    createLabel(label)
                ]),
                location
            );
        }

        /**
         * Creates a statement that can be used indicate a Return operation.
         *
         * @param expression The expression for the return statement.
         * @param location An optional source map location for the statement.
         */
        function createInlineReturn(expression?: Expression, location?: TextRange): ReturnStatement {
            return createReturn(
                createArrayLiteral(expression
                    ? [createInstruction(Instruction.Return), expression]
                    : [createInstruction(Instruction.Return)]
                ),
                location
            );
        }

        /**
         * Creates an expression that can be used to resume from a Yield operation.
         */
        function createGeneratorResume(location?: TextRange): LeftHandSideExpression {
            return createCall(createPropertyAccess(getState(), "sent"), [], location);
        }

        /**
         * Gets the identifier for the runtime `state` variable.
         */
        function getState(): Identifier {
            if (state === undefined) {
                state = createUniqueName("state");
            }

            return state;
        }

        /**
         * Emits a NOP (no operation). This is often used to ensure a new operation location exists
         * when marking labels.
         */
        function emitNop(): void {
            emitWorker(OpCode.Nop);
        }

        /**
         * Emits a Statement.
         *
         * @param node A statement.
         */
        function emitStatement(node: Statement): void {
            if (node) {
                emitWorker(OpCode.Statement, [node]);
            }
            else {
                emitWorker(OpCode.Nop);
            }
        }

        /**
         * Emits an Assignment operation.
         *
         * @param left The left-hand side of the assignment.
         * @param right The right-hand side of the assignment.
         * @param location An optional source map location for the assignment.
         */
        function emitAssignment(left: Expression, right: Expression, location?: TextRange): void {
            emitWorker(OpCode.Assign, [left, right], location);
        }

        /**
         * Emits a Break operation to the specified label.
         *
         * @param label A label.
         * @param location An optional source map location for the assignment.
         */
        function emitBreak(label: Label, location?: TextRange): void {
            emitWorker(OpCode.Break, [label], location);
        }

        /**
         * Emits a Break operation to the specified label when a condition evaluates to a truthy
         * value at runtime.
         *
         * @param label A label.
         * @param condition The condition.
         * @param location An optional source map location for the assignment.
         */
        function emitBreakWhenTrue(label: Label, condition: Expression, location?: TextRange): void {
            emitWorker(OpCode.BreakWhenTrue, [label, condition], location);
        }

        /**
         * Emits a Break to the specified label when a condition evaluates to a falsey value at
         * runtime.
         *
         * @param label A label.
         * @param condition The condition.
         * @param location An optional source map location for the assignment.
         */
        function emitBreakWhenFalse(label: Label, condition: Expression, location?: TextRange): void {
            emitWorker(OpCode.BreakWhenFalse, [label, condition], location);
        }

        /**
         * Emits a Yield operation for the provided expression.
         *
         * @param expression An optional value for the yield operation.
         * @param location An optional source map location for the assignment.
         */
        function emitYield(expression?: Expression, location?: TextRange): void {
            emitWorker(OpCode.Yield, [expression], location);
        }

        /**
         * Emits a YieldStar operation for the provided expression.
         *
         * @param expression A value for the operation.
         * @param location An optional source map location for the assignment.
         */
        function emitYieldStar(expression: Expression, location?: TextRange): void {
            emitWorker(OpCode.YieldStar, [expression], location);
        }

        /**
         * Emits a Return operation for the provided expression.
         *
         * @param expression An optional value for the operation.
         * @param location An optional source map location for the assignment.
         */
        function emitReturn(expression?: Expression, location?: TextRange): void {
            emitWorker(OpCode.Return, [expression], location);
        }

        /**
         * Emits a Throw operation for the provided expression.
         *
         * @param expression A value for the operation.
         * @param location An optional source map location for the assignment.
         */
        function emitThrow(expression: Expression, location?: TextRange): void {
            emitWorker(OpCode.Throw, [expression], location);
        }

        /**
         * Emits an Endfinally operation. This is used to handle `finally` block semantics.
         */
        function emitEndfinally(): void {
            emitWorker(OpCode.Endfinally);
        }

        /**
         * Emits an operation.
         *
         * @param code The OpCode for the operation.
         * @param args The optional arguments for the operation.
         */
        function emitWorker(code: OpCode, args?: OperationArguments, location?: TextRange): void {
            if (operations === undefined) {
                operations = [];
                operationArguments = [];
                operationLocations = [];
            }

            if (labelOffsets === undefined) {
                // mark entry point
                markLabel(defineLabel());
            }

            const operationIndex = operations.length;
            operations[operationIndex] = code;
            operationArguments[operationIndex] = args;
            operationLocations[operationIndex] = location;
        }

        /**
         * Builds the generator function body.
         */
        function build() {
            blockIndex = 0;
            labelNumber = 0;
            lastOperationWasAbrupt = false;
            lastOperationWasCompletion = false;
            clauses = undefined;
            statements = undefined;
            exceptionBlockStack = undefined;
            currentExceptionBlock = undefined;
            withBlockStack = undefined;

            return createCall(
                createIdentifier("__generator"),
                [createFunctionExpression(
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    [createParameter(getState())],
                    createBlock(
                        buildStatements()
                    )
                )]
            );
        }

        /**
         * Builds the statements for the generator function body.
         */
        function buildStatements(): Statement[] {
            if (hasProtectedRegions) {
                initializeProtectedRegions();
            }

            if (operations) {
                for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
                    writeOperation(operationIndex);
                }

                flushFinalLabel(operations.length);
            }
            else {
                flushFinalLabel(0);
            }


            if (clauses) {
                const state = getState();
                const labelExpression = createPropertyAccess(state, "label");
                const switchStatement = createSwitch(labelExpression, createCaseBlock(clauses));
                return [switchStatement];
            }

            if (statements) {
                return statements;
            }

            return [];
        }

        /**
         * Initializes protected region information for the generator.
         *
         * This assigns an array to `state.trys` that will be used to capture when execution
         * enters or exits a protected region (i.e. an exception block).
         */
        function initializeProtectedRegions(): void {
            writeAssign(createPropertyAccess(getState(), "trys"), createArrayLiteral(), /*operationLocation*/ undefined);
            flushLabel();
        }

        /**
         * Flush the current label and advance to a new label.
         */
        function flushLabel(): void {
            if (!statements) {
                return;
            }

            appendLabel(/*markLabelEnd*/ !lastOperationWasAbrupt);

            lastOperationWasAbrupt = false;
            lastOperationWasCompletion = false;
            labelNumber++;
        }

        /**
         * Flush the final label of the generator function body.
         */
        function flushFinalLabel(operationIndex: number): void {
            if (!lastOperationWasCompletion) {
                tryEnterLabel(operationIndex);
                writeReturn(/*expression*/ undefined, /*operationLocation*/ undefined);
            }

            if (statements && clauses) {
                appendLabel(/*markLabelEnd*/ false);
            }
        }

        /**
         * Appends a case clause for the last label and sets the new label.
         *
         * @param markLabelEnd Indicates that the transition between labels was a fall-through
         *                     from a previous case clause and the change in labels should be
         *                     reflected on the `state` object.
         */
        function appendLabel(markLabelEnd: boolean): void {
            if (!clauses) {
                clauses = [];
            }

            if (statements) {
                if (withBlockStack) {
                    // The previous label was nested inside one or more `with` blocks, so we
                    // surround the statements in generated `with` blocks to create the same environment.
                    for (let i = withBlockStack.length - 1; i >= 0; i--) {
                        const withBlock = withBlockStack[i];
                        statements = [createWith(withBlock.expression, createBlock(statements))];
                    }
                }

                if (currentExceptionBlock) {
                    // The previous label was nested inside of an exception block, so we must
                    // indicate entry into a protected region by pushing the label numbers
                    // for each block in the protected region.
                    const { startLabel, catchLabel, finallyLabel, endLabel } = currentExceptionBlock;
                    statements.unshift(
                        createStatement(
                            createCall(
                                createPropertyAccess(createPropertyAccess(getState(), "trys"), "push"),
                                [
                                    createArrayLiteral([
                                        createLabel(startLabel),
                                        createLabel(catchLabel),
                                        createLabel(finallyLabel),
                                        createLabel(endLabel)
                                    ])
                                ]
                            )
                        )
                    );

                    currentExceptionBlock = undefined;
                }

                if (markLabelEnd) {
                    // The case clause for the last label falls through to this label, so we
                    // add an assignment statement to reflect the change in labels.
                    statements.push(
                        createStatement(
                            createAssignment(
                                createPropertyAccess(getState(), "label"),
                                createLiteral(labelNumber + 1)
                            )
                        )
                    );
                }
            }

            clauses.push(
                createCaseClause(
                    createLiteral(labelNumber),
                    statements || []
                )
            );

            statements = undefined;
        }

        /**
         * Tries to enter into a new label at the current operation index.
         */
        function tryEnterLabel(operationIndex: number): void {
            if (!labelOffsets) {
                return;
            }

            let isLabel: boolean = false;
            for (let label = 0; label < labelOffsets.length; label++) {
                if (labelOffsets[label] === operationIndex) {
                    flushLabel();
                    if (labelExpressions !== undefined) {
                        const expressions = labelExpressions[label];
                        if (expressions !== undefined) {
                            for (const expression of expressions) {
                                expression.text = String(labelNumber);
                            }
                        }
                    }
                }
            }
        }

        /**
         * Tries to enter or leave a code block.
         */
        function tryEnterOrLeaveBlock(operationIndex: number): void {
            if (blocks) {
                for (; blockIndex < blockActions.length && blockOffsets[blockIndex] <= operationIndex; blockIndex++) {
                    const block = blocks[blockIndex];
                    const blockAction = blockActions[blockIndex];
                    if (isExceptionBlock(block)) {
                        if (blockAction === BlockAction.Open) {
                            if (!exceptionBlockStack) {
                                exceptionBlockStack = [];
                            }

                            if (!statements) {
                                statements = [];
                            }

                            exceptionBlockStack.push(currentExceptionBlock);
                            currentExceptionBlock = block;
                        }
                        else if (blockAction === BlockAction.Close) {
                            currentExceptionBlock = exceptionBlockStack.pop();
                        }
                    }
                    else if (isWithBlock(block)) {
                        if (blockAction === BlockAction.Open) {
                            if (!withBlockStack) {
                                withBlockStack = [];
                            }

                            withBlockStack.push(block);
                        }
                        else if (blockAction === BlockAction.Close) {
                            withBlockStack.pop();
                        }
                    }
                }
            }
        }

        /**
         * Writes an operation as a statement to the current label's statement list.
         *
         * @param operation The OpCode of the operation
         */
        function writeOperation(operationIndex: number): void {
            tryEnterLabel(operationIndex);
            tryEnterOrLeaveBlock(operationIndex);

            // early termination, nothing else to process in this label
            if (lastOperationWasAbrupt) {
                return;
            }

            lastOperationWasAbrupt = false;
            lastOperationWasCompletion = false;

            const opcode = operations[operationIndex];
            if (opcode === OpCode.Nop) {
                return;
            }
            else if (opcode === OpCode.Endfinally) {
                return writeEndfinally();
            }

            const args = operationArguments[operationIndex];
            if (opcode === OpCode.Statement) {
                return writeStatement(<Statement>args[0]);
            }

            const location = operationLocations[operationIndex];
            switch (opcode) {
                case OpCode.Assign:
                    return writeAssign(<Expression>args[0], <Expression>args[1], location);
                case OpCode.Break:
                    return writeBreak(<Label>args[0], location);
                case OpCode.BreakWhenTrue:
                    return writeBreakWhenTrue(<Label>args[0], <Expression>args[1], location);
                case OpCode.BreakWhenFalse:
                    return writeBreakWhenFalse(<Label>args[0], <Expression>args[1], location);
                case OpCode.Yield:
                    return writeYield(<Expression>args[0], location);
                case OpCode.YieldStar:
                    return writeYieldStar(<Expression>args[0], location);
                case OpCode.Return:
                    return writeReturn(<Expression>args[0], location);
                case OpCode.Throw:
                    return writeThrow(<Expression>args[0], location);
            }
        }

        /**
         * Writes a statement to the current label's statement list.
         *
         * @param statement A statement to write.
         */
        function writeStatement(statement: Statement): void {
            if (statement) {
                if (!statements) {
                    statements = [statement];
                }
                else {
                    statements.push(statement);
                }
            }
        }

        /**
         * Writes an Assign operation to the current label's statement list.
         *
         * @param left The left-hand side of the assignment.
         * @param right The right-hand side of the assignment.
         * @param operationLocation The source map location for the operation.
         */
        function writeAssign(left: Expression, right: Expression, operationLocation: TextRange): void {
            writeStatement(createStatement(createAssignment(left, right), operationLocation));
        }

        /**
         * Writes a Throw operation to the current label's statement list.
         *
         * @param expression The value to throw.
         * @param operationLocation The source map location for the operation.
         */
        function writeThrow(expression: Expression, operationLocation: TextRange): void {
            lastOperationWasAbrupt = true;
            lastOperationWasCompletion = true;
            writeStatement(createThrow(expression, operationLocation));
        }

        /**
         * Writes a Return operation to the current label's statement list.
         *
         * @param expression The value to return.
         * @param operationLocation The source map location for the operation.
         */
        function writeReturn(expression: Expression, operationLocation: TextRange): void {
            lastOperationWasAbrupt = true;
            lastOperationWasCompletion = true;
            writeStatement(
                createReturn(
                    createArrayLiteral(expression
                        ? [createInstruction(Instruction.Return), expression]
                        : [createInstruction(Instruction.Return)]
                    ),
                    operationLocation
                )
            );
        }

        /**
         * Writes a Break operation to the current label's statement list.
         *
         * @param label The label for the Break.
         * @param operationLocation The source map location for the operation.
         */
        function writeBreak(label: Label, operationLocation: TextRange): void {
            lastOperationWasAbrupt = true;
            writeStatement(
                createReturn(
                    createArrayLiteral([
                        createInstruction(Instruction.Break),
                        createLabel(label)
                    ]),
                    operationLocation
                )
            );
        }

        /**
         * Writes a BreakWhenTrue operation to the current label's statement list.
         *
         * @param label The label for the Break.
         * @param condition The condition for the Break.
         * @param operationLocation The source map location for the operation.
         */
        function writeBreakWhenTrue(label: Label, condition: Expression, operationLocation: TextRange): void {
            writeStatement(
                createIf(
                    condition,
                    createReturn(
                        createArrayLiteral([
                            createInstruction(Instruction.Break),
                            createLabel(label)
                        ]),
                        operationLocation
                    )
                )
            );
        }

        /**
         * Writes a BreakWhenFalse operation to the current label's statement list.
         *
         * @param label The label for the Break.
         * @param condition The condition for the Break.
         * @param operationLocation The source map location for the operation.
         */
        function writeBreakWhenFalse(label: Label, condition: Expression, operationLocation: TextRange): void {
            writeStatement(
                createIf(
                    createLogicalNot(condition),
                    createReturn(
                        createArrayLiteral([
                            createInstruction(Instruction.Break),
                            createLabel(label)
                        ]),
                        operationLocation
                    )
                )
            );
        }

        /**
         * Writes a Yield operation to the current label's statement list.
         *
         * @param expression The expression to yield.
         * @param operationLocation The source map location for the operation.
         */
        function writeYield(expression: Expression, operationLocation: TextRange): void {
            lastOperationWasAbrupt = true;
            writeStatement(
                createReturn(
                    createArrayLiteral(
                        expression
                            ? [createInstruction(Instruction.Yield), expression]
                            : [createInstruction(Instruction.Yield)]
                    ),
                    operationLocation
                )
            );
        }

        /**
         * Writes a YieldStar instruction to the current label's statement list.
         *
         * @param expression The expression to yield.
         * @param operationLocation The source map location for the operation.
         */
        function writeYieldStar(expression: Expression, operationLocation: TextRange): void {
            lastOperationWasAbrupt = true;
            writeStatement(
                createReturn(
                    createArrayLiteral([
                        createInstruction(Instruction.YieldStar),
                        expression
                    ]),
                    operationLocation
                )
            );
        }

        /**
         * Writes an Endfinally instruction to the current label's statement list.
         */
        function writeEndfinally(): void {
            lastOperationWasAbrupt = true;
            writeStatement(
                createReturn(
                    createArrayLiteral([
                        createInstruction(Instruction.Endfinally)
                    ])
                )
            );
        }
    }
}