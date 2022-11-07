import * as ts from "../_namespaces/ts";

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
//  .yield (x)                      - Yield the value of the optional expression `x`.
//                                    Resume at the next label.
//  .yieldstar (x)                  - Delegate yield to the value of the optional
//                                    expression `x`. Resume at the next label.
//                                    NOTE: `x` must be an Iterator, not an Iterable.
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
//  .yield (x)                    |     return [4 /*yield*/, x];
//  .mark RESUME                  | case RESUME:
//      a = %sent%;               |     a = state.sent();
// -------------------------------|----------------------------------------------
//  .yieldstar (x)                |     return [5 /*yield**/, x];
//  .mark RESUME                  | case RESUME:
//      a = %sent%;               |     a = state.sent();
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
//                                |     e = state.sent();
//      b();                      |     b();
//  .br END                       |     return [3 /*break*/, END];
//  .finally                      |
//  .mark FINALLY                 | case FINALLY:
//      c();                      |     c();
//  .endfinally                   |     return [7 /*endfinally*/];
//  .endtry                       |
//  .mark END                     | case END:

type Label = number;

const enum OpCode {
    Nop,                    // No operation, used to force a new case in the state machine
    Statement,              // A regular javascript statement
    Assign,                 // An assignment
    Break,                  // A break instruction used to jump to a label
    BreakWhenTrue,          // A break instruction used to jump to a label if a condition evaluates to true
    BreakWhenFalse,         // A break instruction used to jump to a label if a condition evaluates to false
    Yield,                  // A completion instruction for the `yield` keyword
    YieldStar,              // A completion instruction for the `yield*` keyword (not implemented, but reserved for future use)
    Return,                 // A completion instruction for the `return` keyword
    Throw,                  // A completion instruction for the `throw` keyword
    Endfinally              // Marks the end of a `finally` block
}

type OperationArguments = [Label] | [Label, ts.Expression] | [ts.Statement] | [ts.Expression | undefined] | [ts.Expression, ts.Expression];

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
type CodeBlock = | ExceptionBlock | LabeledBlock | SwitchBlock | LoopBlock | WithBlock;

// a generated exception block, used for 'try' statements
interface ExceptionBlock {
    kind: CodeBlockKind.Exception;
    state: ExceptionBlockState;
    startLabel: Label;
    catchVariable?: ts.Identifier;
    catchLabel?: Label;
    finallyLabel?: Label;
    endLabel: Label;
}

// A generated code that tracks the target for 'break' statements in a LabeledStatement.
interface LabeledBlock {
    kind: CodeBlockKind.Labeled;
    labelText: string;
    isScript: boolean;
    breakLabel: Label;
}

// a generated block that tracks the target for 'break' statements in a 'switch' statement
interface SwitchBlock {
    kind: CodeBlockKind.Switch;
    isScript: boolean;
    breakLabel: Label;
}

// a generated block that tracks the targets for 'break' and 'continue' statements, used for iteration statements
interface LoopBlock {
    kind: CodeBlockKind.Loop;
    continueLabel: Label;
    isScript: boolean;
    breakLabel: Label;
}

// a generated block associated with a 'with' statement
interface WithBlock {
    kind: CodeBlockKind.With;
    expression: ts.Identifier;
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

function getInstructionName(instruction: Instruction): string {
    switch (instruction) {
        case Instruction.Return: return "return";
        case Instruction.Break: return "break";
        case Instruction.Yield: return "yield";
        case Instruction.YieldStar: return "yield*";
        case Instruction.Endfinally: return "endfinally";
        default: return undefined!; // TODO: GH#18217
    }
}

/** @internal */
export function transformGenerators(context: ts.TransformationContext) {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        resumeLexicalEnvironment,
        endLexicalEnvironment,
        hoistFunctionDeclaration,
        hoistVariableDeclaration
    } = context;

    const compilerOptions = context.getCompilerOptions();
    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const resolver = context.getEmitResolver();
    const previousOnSubstituteNode = context.onSubstituteNode;
    context.onSubstituteNode = onSubstituteNode;

    let renamedCatchVariables: ts.ESMap<string, boolean>;
    let renamedCatchVariableDeclarations: ts.Identifier[];

    let inGeneratorFunctionBody: boolean;
    let inStatementContainingYield: boolean;

    // The following three arrays store information about generated code blocks.
    // All three arrays are correlated by their index. This approach is used over allocating
    // objects to store the same information to avoid GC overhead.
    //
    let blocks: CodeBlock[] | undefined; // Information about the code block
    let blockOffsets: number[] | undefined; // The operation offset at which a code block begins or ends
    let blockActions: BlockAction[] | undefined; // Whether the code block is opened or closed
    let blockStack: CodeBlock[] | undefined; // A stack of currently open code blocks

    // Labels are used to mark locations in the code that can be the target of a Break (jump)
    // operation. These are translated into case clauses in a switch statement.
    // The following two arrays are correlated by their index. This approach is used over
    // allocating objects to store the same information to avoid GC overhead.
    //
    let labelOffsets: number[] | undefined; // The operation offset at which the label is defined.
    let labelExpressions: ts.Mutable<ts.LiteralExpression>[][] | undefined; // The NumericLiteral nodes bound to each label.
    let nextLabelId = 1; // The next label id to use.

    // Operations store information about generated code for the function body. This
    // Includes things like statements, assignments, breaks (jumps), and yields.
    // The following three arrays are correlated by their index. This approach is used over
    // allocating objects to store the same information to avoid GC overhead.
    //
    let operations: OpCode[] | undefined; // The operation to perform.
    let operationArguments: (OperationArguments | undefined)[] | undefined; // The arguments to the operation.
    let operationLocations: (ts.TextRange | undefined)[] | undefined; // The source map location for the operation.

    let state: ts.Identifier; // The name of the state object used by the generator at runtime.

    // The following variables store information used by the `build` function:
    //
    let blockIndex = 0; // The index of the current block.
    let labelNumber = 0; // The current label number.
    let labelNumbers: number[][] | undefined;
    let lastOperationWasAbrupt: boolean; // Indicates whether the last operation was abrupt (break/continue).
    let lastOperationWasCompletion: boolean; // Indicates whether the last operation was a completion (return/throw).
    let clauses: ts.CaseClause[] | undefined; // The case clauses generated for labels.
    let statements: ts.Statement[] | undefined; // The statements for the current label.
    let exceptionBlockStack: ExceptionBlock[] | undefined; // A stack of containing exception blocks.
    let currentExceptionBlock: ExceptionBlock | undefined; // The current exception block.
    let withBlockStack: WithBlock[] | undefined; // A stack containing `with` blocks.

    return ts.chainBundle(context, transformSourceFile);

    function transformSourceFile(node: ts.SourceFile) {
        if (node.isDeclarationFile || (node.transformFlags & ts.TransformFlags.ContainsGenerator) === 0) {
            return node;
        }


        const visited = ts.visitEachChild(node, visitor, context);
        ts.addEmitHelpers(visited, context.readEmitHelpers());
        return visited;
    }

    /**
     * Visits a node.
     *
     * @param node The node to visit.
     */
    function visitor(node: ts.Node): ts.VisitResult<ts.Node> {
        const transformFlags = node.transformFlags;
        if (inStatementContainingYield) {
            return visitJavaScriptInStatementContainingYield(node);
        }
        else if (inGeneratorFunctionBody) {
            return visitJavaScriptInGeneratorFunctionBody(node);
        }
        else if (ts.isFunctionLikeDeclaration(node) && node.asteriskToken) {
            return visitGenerator(node);
        }
        else if (transformFlags & ts.TransformFlags.ContainsGenerator) {
            return ts.visitEachChild(node, visitor, context);
        }
        else {
            return node;
        }
    }

    /**
     * Visits a node that is contained within a statement that contains yield.
     *
     * @param node The node to visit.
     */
    function visitJavaScriptInStatementContainingYield(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.DoStatement:
                return visitDoStatement(node as ts.DoStatement);
            case ts.SyntaxKind.WhileStatement:
                return visitWhileStatement(node as ts.WhileStatement);
            case ts.SyntaxKind.SwitchStatement:
                return visitSwitchStatement(node as ts.SwitchStatement);
            case ts.SyntaxKind.LabeledStatement:
                return visitLabeledStatement(node as ts.LabeledStatement);
            default:
                return visitJavaScriptInGeneratorFunctionBody(node);
        }
    }

    /**
     * Visits a node that is contained within a generator function.
     *
     * @param node The node to visit.
     */
    function visitJavaScriptInGeneratorFunctionBody(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
                return visitFunctionDeclaration(node as ts.FunctionDeclaration);
            case ts.SyntaxKind.FunctionExpression:
                return visitFunctionExpression(node as ts.FunctionExpression);
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return visitAccessorDeclaration(node as ts.AccessorDeclaration);
            case ts.SyntaxKind.VariableStatement:
                return visitVariableStatement(node as ts.VariableStatement);
            case ts.SyntaxKind.ForStatement:
                return visitForStatement(node as ts.ForStatement);
            case ts.SyntaxKind.ForInStatement:
                return visitForInStatement(node as ts.ForInStatement);
            case ts.SyntaxKind.BreakStatement:
                return visitBreakStatement(node as ts.BreakStatement);
            case ts.SyntaxKind.ContinueStatement:
                return visitContinueStatement(node as ts.ContinueStatement);
            case ts.SyntaxKind.ReturnStatement:
                return visitReturnStatement(node as ts.ReturnStatement);
            default:
                if (node.transformFlags & ts.TransformFlags.ContainsYield) {
                    return visitJavaScriptContainingYield(node);
                }
                else if (node.transformFlags & (ts.TransformFlags.ContainsGenerator | ts.TransformFlags.ContainsHoistedDeclarationOrCompletion)) {
                    return ts.visitEachChild(node, visitor, context);
                }
                else {
                    return node;
                }
        }
    }

    /**
     * Visits a node that contains a YieldExpression.
     *
     * @param node The node to visit.
     */
    function visitJavaScriptContainingYield(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.BinaryExpression:
                return visitBinaryExpression(node as ts.BinaryExpression);
            case ts.SyntaxKind.CommaListExpression:
                return visitCommaListExpression(node as ts.CommaListExpression);
            case ts.SyntaxKind.ConditionalExpression:
                return visitConditionalExpression(node as ts.ConditionalExpression);
            case ts.SyntaxKind.YieldExpression:
                return visitYieldExpression(node as ts.YieldExpression);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return visitArrayLiteralExpression(node as ts.ArrayLiteralExpression);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return visitObjectLiteralExpression(node as ts.ObjectLiteralExpression);
            case ts.SyntaxKind.ElementAccessExpression:
                return visitElementAccessExpression(node as ts.ElementAccessExpression);
            case ts.SyntaxKind.CallExpression:
                return visitCallExpression(node as ts.CallExpression);
            case ts.SyntaxKind.NewExpression:
                return visitNewExpression(node as ts.NewExpression);
            default:
                return ts.visitEachChild(node, visitor, context);
        }
    }

    /**
     * Visits a generator function.
     *
     * @param node The node to visit.
     */
    function visitGenerator(node: ts.Node): ts.VisitResult<ts.Node> {
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
                return visitFunctionDeclaration(node as ts.FunctionDeclaration);

            case ts.SyntaxKind.FunctionExpression:
                return visitFunctionExpression(node as ts.FunctionExpression);

            default:
                return ts.Debug.failBadSyntaxKind(node);
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
    function visitFunctionDeclaration(node: ts.FunctionDeclaration): ts.Statement | undefined {
        // Currently, we only support generators that were originally async functions.
        if (node.asteriskToken) {
            node = ts.setOriginalNode(
                ts.setTextRange(
                    factory.createFunctionDeclaration(
                        node.modifiers,
                        /*asteriskToken*/ undefined,
                        node.name,
                        /*typeParameters*/ undefined,
                        ts.visitParameterList(node.parameters, visitor, context),
                        /*type*/ undefined,
                        transformGeneratorFunctionBody(node.body!)
                    ),
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
            node = ts.visitEachChild(node, visitor, context);
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
    function visitFunctionExpression(node: ts.FunctionExpression): ts.Expression {
        // Currently, we only support generators that were originally async functions.
        if (node.asteriskToken) {
            node = ts.setOriginalNode(
                ts.setTextRange(
                    factory.createFunctionExpression(
                        /*modifiers*/ undefined,
                        /*asteriskToken*/ undefined,
                        node.name,
                        /*typeParameters*/ undefined,
                        ts.visitParameterList(node.parameters, visitor, context),
                        /*type*/ undefined,
                        transformGeneratorFunctionBody(node.body)
                    ),
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
            node = ts.visitEachChild(node, visitor, context);
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
    function visitAccessorDeclaration(node: ts.AccessorDeclaration) {
        const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
        const savedInStatementContainingYield = inStatementContainingYield;
        inGeneratorFunctionBody = false;
        inStatementContainingYield = false;
        node = ts.visitEachChild(node, visitor, context);
        inGeneratorFunctionBody = savedInGeneratorFunctionBody;
        inStatementContainingYield = savedInStatementContainingYield;
        return node;
    }

    /**
     * Transforms the body of a generator function declaration.
     *
     * @param node The function body to transform.
     */
    function transformGeneratorFunctionBody(body: ts.Block) {
        // Save existing generator state
        const statements: ts.Statement[] = [];
        const savedInGeneratorFunctionBody = inGeneratorFunctionBody;
        const savedInStatementContainingYield = inStatementContainingYield;
        const savedBlocks = blocks;
        const savedBlockOffsets = blockOffsets;
        const savedBlockActions = blockActions;
        const savedBlockStack = blockStack;
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
        blocks = undefined;
        blockOffsets = undefined;
        blockActions = undefined;
        blockStack = undefined;
        labelOffsets = undefined;
        labelExpressions = undefined;
        nextLabelId = 1;
        operations = undefined;
        operationArguments = undefined;
        operationLocations = undefined;
        state = factory.createTempVariable(/*recordTempVariable*/ undefined);

        // Build the generator
        resumeLexicalEnvironment();

        const statementOffset = factory.copyPrologue(body.statements, statements, /*ensureUseStrict*/ false, visitor);

        transformAndEmitStatements(body.statements, statementOffset);

        const buildResult = build();
        ts.insertStatementsAfterStandardPrologue(statements, endLexicalEnvironment());
        statements.push(factory.createReturnStatement(buildResult));

        // Restore previous generator state
        inGeneratorFunctionBody = savedInGeneratorFunctionBody;
        inStatementContainingYield = savedInStatementContainingYield;
        blocks = savedBlocks;
        blockOffsets = savedBlockOffsets;
        blockActions = savedBlockActions;
        blockStack = savedBlockStack;
        labelOffsets = savedLabelOffsets;
        labelExpressions = savedLabelExpressions;
        nextLabelId = savedNextLabelId;
        operations = savedOperations;
        operationArguments = savedOperationArguments;
        operationLocations = savedOperationLocations;
        state = savedState;

        return ts.setTextRange(factory.createBlock(statements, body.multiLine), body);
    }

    /**
     * Visits a variable statement.
     *
     * This will be called when one of the following conditions are met:
     * - The variable statement is contained within the body of a generator function.
     *
     * @param node The node to visit.
     */
    function visitVariableStatement(node: ts.VariableStatement): ts.Statement | undefined {
        if (node.transformFlags & ts.TransformFlags.ContainsYield) {
            transformAndEmitVariableDeclarationList(node.declarationList);
            return undefined;
        }
        else {
            // Do not hoist custom prologues.
            if (ts.getEmitFlags(node) & ts.EmitFlags.CustomPrologue) {
                return node;
            }

            for (const variable of node.declarationList.declarations) {
                hoistVariableDeclaration(variable.name as ts.Identifier);
            }

            const variables = ts.getInitializedVariables(node.declarationList);
            if (variables.length === 0) {
                return undefined;
            }

            return ts.setSourceMapRange(
                factory.createExpressionStatement(
                    factory.inlineExpressions(
                        ts.map(variables, transformInitializedVariable)
                    )
                ),
                node
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
    function visitBinaryExpression(node: ts.BinaryExpression): ts.Expression {
        const assoc = ts.getExpressionAssociativity(node);
        switch (assoc) {
            case ts.Associativity.Left:
                return visitLeftAssociativeBinaryExpression(node);
            case ts.Associativity.Right:
                return visitRightAssociativeBinaryExpression(node);
            default:
                return ts.Debug.assertNever(assoc);
        }
    }

    /**
     * Visits a right-associative binary expression containing `yield`.
     *
     * @param node The node to visit.
     */
    function visitRightAssociativeBinaryExpression(node: ts.BinaryExpression) {
        const { left, right } = node;
        if (containsYield(right)) {
            let target: ts.Expression;
            switch (left.kind) {
                case ts.SyntaxKind.PropertyAccessExpression:
                    // [source]
                    //      a.b = yield;
                    //
                    // [intermediate]
                    //  .local _a
                    //      _a = a;
                    //  .yield resumeLabel
                    //  .mark resumeLabel
                    //      _a.b = %sent%;

                    target = factory.updatePropertyAccessExpression(
                        left as ts.PropertyAccessExpression,
                        cacheExpression(ts.visitNode((left as ts.PropertyAccessExpression).expression, visitor, ts.isLeftHandSideExpression)),
                        (left as ts.PropertyAccessExpression).name
                    );
                    break;

                case ts.SyntaxKind.ElementAccessExpression:
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

                    target = factory.updateElementAccessExpression(left as ts.ElementAccessExpression,
                        cacheExpression(ts.visitNode((left as ts.ElementAccessExpression).expression, visitor, ts.isLeftHandSideExpression)),
                        cacheExpression(ts.visitNode((left as ts.ElementAccessExpression).argumentExpression, visitor, ts.isExpression))
                    );
                    break;

                default:
                    target = ts.visitNode(left, visitor, ts.isExpression);
                    break;
            }

            const operator = node.operatorToken.kind;
            if (ts.isCompoundAssignment(operator)) {
                return ts.setTextRange(
                    factory.createAssignment(
                        target,
                        ts.setTextRange(
                            factory.createBinaryExpression(
                                cacheExpression(target),
                                ts.getNonAssignmentOperatorForCompoundAssignment(operator),
                                ts.visitNode(right, visitor, ts.isExpression)
                            ),
                            node
                        )
                    ),
                    node
                );
            }
            else {
                return factory.updateBinaryExpression(node, target, node.operatorToken, ts.visitNode(right, visitor, ts.isExpression));
            }
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitLeftAssociativeBinaryExpression(node: ts.BinaryExpression) {
        if (containsYield(node.right)) {
            if (ts.isLogicalOperator(node.operatorToken.kind)) {
                return visitLogicalBinaryExpression(node);
            }
            else if (node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
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

            return factory.updateBinaryExpression(node,
                cacheExpression(ts.visitNode(node.left, visitor, ts.isExpression)),
                node.operatorToken,
                ts.visitNode(node.right, visitor, ts.isExpression));
        }

        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Visits a comma expression containing `yield`.
     *
     * @param node The node to visit.
     */
    function visitCommaExpression(node: ts.BinaryExpression) {
        // [source]
        //      x = a(), yield, b();
        //
        // [intermediate]
        //      a();
        //  .yield resumeLabel
        //  .mark resumeLabel
        //      x = %sent%, b();

        let pendingExpressions: ts.Expression[] = [];
        visit(node.left);
        visit(node.right);
        return factory.inlineExpressions(pendingExpressions);

        function visit(node: ts.Expression) {
            if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                visit(node.left);
                visit(node.right);
            }
            else {
                if (containsYield(node) && pendingExpressions.length > 0) {
                    emitWorker(OpCode.Statement, [factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions))]);
                    pendingExpressions = [];
                }

                pendingExpressions.push(ts.visitNode(node, visitor, ts.isExpression));
            }
        }
    }

    /**
     * Visits a comma-list expression.
     *
     * @param node The node to visit.
     */
    function visitCommaListExpression(node: ts.CommaListExpression) {
        // flattened version of `visitCommaExpression`
        let pendingExpressions: ts.Expression[] = [];
        for (const elem of node.elements) {
            if (ts.isBinaryExpression(elem) && elem.operatorToken.kind === ts.SyntaxKind.CommaToken) {
                pendingExpressions.push(visitCommaExpression(elem));
            }
            else {
                if (containsYield(elem) && pendingExpressions.length > 0) {
                    emitWorker(OpCode.Statement, [factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions))]);
                    pendingExpressions = [];
                }
                pendingExpressions.push(ts.visitNode(elem, visitor, ts.isExpression));
            }
        }
        return factory.inlineExpressions(pendingExpressions);
    }

    /**
     * Visits a logical binary expression containing `yield`.
     *
     * @param node A node to visit.
     */
    function visitLogicalBinaryExpression(node: ts.BinaryExpression) {
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

        emitAssignment(resultLocal, ts.visitNode(node.left, visitor, ts.isExpression), /*location*/ node.left);
        if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
            // Logical `&&` shortcuts when the left-hand operand is falsey.
            emitBreakWhenFalse(resultLabel, resultLocal, /*location*/ node.left);
        }
        else {
            // Logical `||` shortcuts when the left-hand operand is truthy.
            emitBreakWhenTrue(resultLabel, resultLocal, /*location*/ node.left);
        }

        emitAssignment(resultLocal, ts.visitNode(node.right, visitor, ts.isExpression), /*location*/ node.right);
        markLabel(resultLabel);
        return resultLocal;
    }

    /**
     * Visits a conditional expression containing `yield`.
     *
     * @param node The node to visit.
     */
    function visitConditionalExpression(node: ts.ConditionalExpression): ts.Expression {
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
            emitBreakWhenFalse(whenFalseLabel, ts.visitNode(node.condition, visitor, ts.isExpression), /*location*/ node.condition);
            emitAssignment(resultLocal, ts.visitNode(node.whenTrue, visitor, ts.isExpression), /*location*/ node.whenTrue);
            emitBreak(resultLabel);
            markLabel(whenFalseLabel);
            emitAssignment(resultLocal, ts.visitNode(node.whenFalse, visitor, ts.isExpression), /*location*/ node.whenFalse);
            markLabel(resultLabel);
            return resultLocal;
        }

        return ts.visitEachChild(node, visitor, context);
    }

    /**
     * Visits a `yield` expression.
     *
     * @param node The node to visit.
     */
    function visitYieldExpression(node: ts.YieldExpression): ts.LeftHandSideExpression {
        // [source]
        //      x = yield a();
        //
        // [intermediate]
        //  .yield resumeLabel, (a())
        //  .mark resumeLabel
        //      x = %sent%;

        const resumeLabel = defineLabel();
        const expression = ts.visitNode(node.expression, visitor, ts.isExpression);
        if (node.asteriskToken) {
            // NOTE: `expression` must be defined for `yield*`.
            const iterator = (ts.getEmitFlags(node.expression!) & ts.EmitFlags.Iterator) === 0
                ? ts.setTextRange(emitHelpers().createValuesHelper(expression!), node)
                : expression;
            emitYieldStar(iterator, /*location*/ node);
        }
        else {
            emitYield(expression, /*location*/ node);
        }

        markLabel(resumeLabel);
        return createGeneratorResume(/*location*/ node);
    }

    /**
     * Visits an ArrayLiteralExpression that contains a YieldExpression.
     *
     * @param node The node to visit.
     */
    function visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
        return visitElements(node.elements, /*leadingElement*/ undefined, /*location*/ undefined, node.multiLine);
    }

    /**
     * Visits an array of expressions containing one or more YieldExpression nodes
     * and returns an expression for the resulting value.
     *
     * @param elements The elements to visit.
     * @param multiLine Whether array literals created should be emitted on multiple lines.
     */
    function visitElements(elements: ts.NodeArray<ts.Expression>, leadingElement?: ts.Expression, location?: ts.TextRange, multiLine?: boolean) {
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

        let temp: ts.Identifier | undefined;
        if (numInitialElements > 0) {
            temp = declareLocal();
            const initialElements = ts.visitNodes(elements, visitor, ts.isExpression, 0, numInitialElements);
            emitAssignment(temp,
                factory.createArrayLiteralExpression(
                    leadingElement
                        ? [leadingElement, ...initialElements]
                        : initialElements
                )
            );
            leadingElement = undefined;
        }

        const expressions = ts.reduceLeft(elements, reduceElement, [] as ts.Expression[], numInitialElements);
        return temp
            ? factory.createArrayConcatCall(temp, [factory.createArrayLiteralExpression(expressions, multiLine)])
            : ts.setTextRange(
                factory.createArrayLiteralExpression(leadingElement ? [leadingElement, ...expressions] : expressions, multiLine),
                location
            );

        function reduceElement(expressions: ts.Expression[], element: ts.Expression) {
            if (containsYield(element) && expressions.length > 0) {
                const hasAssignedTemp = temp !== undefined;
                if (!temp) {
                    temp = declareLocal();
                }

                emitAssignment(
                    temp,
                    hasAssignedTemp
                        ? factory.createArrayConcatCall(
                            temp,
                            [factory.createArrayLiteralExpression(expressions, multiLine)]
                        )
                        : factory.createArrayLiteralExpression(
                            leadingElement ? [leadingElement, ...expressions] : expressions,
                            multiLine
                        )
                );
                leadingElement = undefined;
                expressions = [];
            }

            expressions.push(ts.visitNode(element, visitor, ts.isExpression));
            return expressions;
        }
    }

    function visitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
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
        const multiLine = node.multiLine;
        const numInitialProperties = countInitialNodesWithoutYield(properties);

        const temp = declareLocal();
        emitAssignment(temp,
            factory.createObjectLiteralExpression(
                ts.visitNodes(properties, visitor, ts.isObjectLiteralElementLike, 0, numInitialProperties),
                multiLine
            )
        );

        const expressions = ts.reduceLeft(properties, reduceProperty, [] as ts.Expression[], numInitialProperties);
        // TODO(rbuckton): Does this need to be parented?
        expressions.push(multiLine ? ts.startOnNewLine(ts.setParent(ts.setTextRange(factory.cloneNode(temp), temp), temp.parent)) : temp);
        return factory.inlineExpressions(expressions);

        function reduceProperty(expressions: ts.Expression[], property: ts.ObjectLiteralElementLike) {
            if (containsYield(property) && expressions.length > 0) {
                emitStatement(factory.createExpressionStatement(factory.inlineExpressions(expressions)));
                expressions = [];
            }

            const expression = ts.createExpressionForObjectLiteralElementLike(factory, node, property, temp);
            const visited = ts.visitNode(expression, visitor, ts.isExpression);
            if (visited) {
                if (multiLine) {
                    ts.startOnNewLine(visited);
                }
                expressions.push(visited);
            }
            return expressions;
        }
    }

    /**
     * Visits an ElementAccessExpression that contains a YieldExpression.
     *
     * @param node The node to visit.
     */
    function visitElementAccessExpression(node: ts.ElementAccessExpression) {
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

            return factory.updateElementAccessExpression(node,
                cacheExpression(ts.visitNode(node.expression, visitor, ts.isLeftHandSideExpression)),
                ts.visitNode(node.argumentExpression, visitor, ts.isExpression));
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitCallExpression(node: ts.CallExpression) {
        if (!ts.isImportCall(node) && ts.forEach(node.arguments, containsYield)) {
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
            const { target, thisArg } = factory.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion, /*cacheIdentifiers*/ true);
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createFunctionApplyCall(
                        cacheExpression(ts.visitNode(target, visitor, ts.isLeftHandSideExpression)),
                        thisArg,
                        visitElements(node.arguments)
                    ),
                    node
                ),
                node
            );
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function visitNewExpression(node: ts.NewExpression) {
        if (ts.forEach(node.arguments, containsYield)) {
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

            const { target, thisArg } = factory.createCallBinding(factory.createPropertyAccessExpression(node.expression, "bind"), hoistVariableDeclaration);
            return ts.setOriginalNode(
                ts.setTextRange(
                    factory.createNewExpression(
                        factory.createFunctionApplyCall(
                            cacheExpression(ts.visitNode(target, visitor, ts.isExpression)),
                            thisArg,
                            visitElements(
                                node.arguments!,
                                /*leadingElement*/ factory.createVoidZero()
                            )
                        ),
                        /*typeArguments*/ undefined,
                        []
                    ),
                    node
                ),
                node
            );
        }
        return ts.visitEachChild(node, visitor, context);
    }

    function transformAndEmitStatements(statements: readonly ts.Statement[], start = 0) {
        const numStatements = statements.length;
        for (let i = start; i < numStatements; i++) {
            transformAndEmitStatement(statements[i]);
        }
    }

    function transformAndEmitEmbeddedStatement(node: ts.Statement) {
        if (ts.isBlock(node)) {
            transformAndEmitStatements(node.statements);
        }
        else {
            transformAndEmitStatement(node);
        }
    }

    function transformAndEmitStatement(node: ts.Statement): void {
        const savedInStatementContainingYield = inStatementContainingYield;
        if (!inStatementContainingYield) {
            inStatementContainingYield = containsYield(node);
        }

        transformAndEmitStatementWorker(node);
        inStatementContainingYield = savedInStatementContainingYield;
    }

    function transformAndEmitStatementWorker(node: ts.Statement): void {
        switch (node.kind) {
            case ts.SyntaxKind.Block:
                return transformAndEmitBlock(node as ts.Block);
            case ts.SyntaxKind.ExpressionStatement:
                return transformAndEmitExpressionStatement(node as ts.ExpressionStatement);
            case ts.SyntaxKind.IfStatement:
                return transformAndEmitIfStatement(node as ts.IfStatement);
            case ts.SyntaxKind.DoStatement:
                return transformAndEmitDoStatement(node as ts.DoStatement);
            case ts.SyntaxKind.WhileStatement:
                return transformAndEmitWhileStatement(node as ts.WhileStatement);
            case ts.SyntaxKind.ForStatement:
                return transformAndEmitForStatement(node as ts.ForStatement);
            case ts.SyntaxKind.ForInStatement:
                return transformAndEmitForInStatement(node as ts.ForInStatement);
            case ts.SyntaxKind.ContinueStatement:
                return transformAndEmitContinueStatement(node as ts.ContinueStatement);
            case ts.SyntaxKind.BreakStatement:
                return transformAndEmitBreakStatement(node as ts.BreakStatement);
            case ts.SyntaxKind.ReturnStatement:
                return transformAndEmitReturnStatement(node as ts.ReturnStatement);
            case ts.SyntaxKind.WithStatement:
                return transformAndEmitWithStatement(node as ts.WithStatement);
            case ts.SyntaxKind.SwitchStatement:
                return transformAndEmitSwitchStatement(node as ts.SwitchStatement);
            case ts.SyntaxKind.LabeledStatement:
                return transformAndEmitLabeledStatement(node as ts.LabeledStatement);
            case ts.SyntaxKind.ThrowStatement:
                return transformAndEmitThrowStatement(node as ts.ThrowStatement);
            case ts.SyntaxKind.TryStatement:
                return transformAndEmitTryStatement(node as ts.TryStatement);
            default:
                return emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function transformAndEmitBlock(node: ts.Block): void {
        if (containsYield(node)) {
            transformAndEmitStatements(node.statements);
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function transformAndEmitExpressionStatement(node: ts.ExpressionStatement) {
        emitStatement(ts.visitNode(node, visitor, ts.isStatement));
    }

    function transformAndEmitVariableDeclarationList(node: ts.VariableDeclarationList): ts.VariableDeclarationList | undefined {
        for (const variable of node.declarations) {
            const name = factory.cloneNode(variable.name as ts.Identifier);
            ts.setCommentRange(name, variable.name);
            hoistVariableDeclaration(name);
        }

        const variables = ts.getInitializedVariables(node);
        const numVariables = variables.length;
        let variablesWritten = 0;
        let pendingExpressions: ts.Expression[] = [];
        while (variablesWritten < numVariables) {
            for (let i = variablesWritten; i < numVariables; i++) {
                const variable = variables[i];
                if (containsYield(variable.initializer) && pendingExpressions.length > 0) {
                    break;
                }

                pendingExpressions.push(transformInitializedVariable(variable));
            }

            if (pendingExpressions.length) {
                emitStatement(factory.createExpressionStatement(factory.inlineExpressions(pendingExpressions)));
                variablesWritten += pendingExpressions.length;
                pendingExpressions = [];
            }
        }

        return undefined;
    }

    function transformInitializedVariable(node: ts.InitializedVariableDeclaration) {
        return ts.setSourceMapRange(
            factory.createAssignment(
                ts.setSourceMapRange(factory.cloneNode(node.name) as ts.Identifier, node.name),
                ts.visitNode(node.initializer, visitor, ts.isExpression)
            ),
            node
        );
    }

    function transformAndEmitIfStatement(node: ts.IfStatement) {
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
                emitBreakWhenFalse(node.elseStatement ? elseLabel! : endLabel, ts.visitNode(node.expression, visitor, ts.isExpression), /*location*/ node.expression);
                transformAndEmitEmbeddedStatement(node.thenStatement);
                if (node.elseStatement) {
                    emitBreak(endLabel);
                    markLabel(elseLabel!);
                    transformAndEmitEmbeddedStatement(node.elseStatement);
                }
                markLabel(endLabel);
            }
            else {
                emitStatement(ts.visitNode(node, visitor, ts.isStatement));
            }
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function transformAndEmitDoStatement(node: ts.DoStatement) {
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
            emitBreakWhenTrue(loopLabel, ts.visitNode(node.expression, visitor, ts.isExpression));
            endLoopBlock();
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function visitDoStatement(node: ts.DoStatement) {
        if (inStatementContainingYield) {
            beginScriptLoopBlock();
            node = ts.visitEachChild(node, visitor, context);
            endLoopBlock();
            return node;
        }
        else {
            return ts.visitEachChild(node, visitor, context);
        }
    }

    function transformAndEmitWhileStatement(node: ts.WhileStatement) {
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
            emitBreakWhenFalse(endLabel, ts.visitNode(node.expression, visitor, ts.isExpression));
            transformAndEmitEmbeddedStatement(node.statement);
            emitBreak(loopLabel);
            endLoopBlock();
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function visitWhileStatement(node: ts.WhileStatement) {
        if (inStatementContainingYield) {
            beginScriptLoopBlock();
            node = ts.visitEachChild(node, visitor, context);
            endLoopBlock();
            return node;
        }
        else {
            return ts.visitEachChild(node, visitor, context);
        }
    }

    function transformAndEmitForStatement(node: ts.ForStatement) {
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
                if (ts.isVariableDeclarationList(initializer)) {
                    transformAndEmitVariableDeclarationList(initializer);
                }
                else {
                    emitStatement(
                        ts.setTextRange(
                            factory.createExpressionStatement(
                                ts.visitNode(initializer, visitor, ts.isExpression)
                            ),
                            initializer
                        )
                    );
                }
            }

            markLabel(conditionLabel);
            if (node.condition) {
                emitBreakWhenFalse(endLabel, ts.visitNode(node.condition, visitor, ts.isExpression));
            }

            transformAndEmitEmbeddedStatement(node.statement);

            markLabel(incrementLabel);
            if (node.incrementor) {
                emitStatement(
                    ts.setTextRange(
                        factory.createExpressionStatement(
                            ts.visitNode(node.incrementor, visitor, ts.isExpression)
                        ),
                        node.incrementor
                    )
                );
            }
            emitBreak(conditionLabel);
            endLoopBlock();
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function visitForStatement(node: ts.ForStatement) {
        if (inStatementContainingYield) {
            beginScriptLoopBlock();
        }

        const initializer = node.initializer;
        if (initializer && ts.isVariableDeclarationList(initializer)) {
            for (const variable of initializer.declarations) {
                hoistVariableDeclaration(variable.name as ts.Identifier);
            }

            const variables = ts.getInitializedVariables(initializer);
            node = factory.updateForStatement(node,
                variables.length > 0
                    ? factory.inlineExpressions(ts.map(variables, transformInitializedVariable))
                    : undefined,
                ts.visitNode(node.condition, visitor, ts.isExpression),
                ts.visitNode(node.incrementor, visitor, ts.isExpression),
                ts.visitIterationBody(node.statement, visitor, context)
            );
        }
        else {
            node = ts.visitEachChild(node, visitor, context);
        }

        if (inStatementContainingYield) {
            endLoopBlock();
        }

        return node;
    }

    function transformAndEmitForInStatement(node: ts.ForInStatement) {
        if (containsYield(node)) {
            // [source]
            //      for (var p in o) {
            //          /*body*/
            //      }
            //
            // [intermediate]
            //  .local _b, _a, _c, _i
            //      _b = [];
            //      _a = o;
            //      for (_c in _a) _b.push(_c);
            //      _i = 0;
            //  .loop incrementLabel, endLoopLabel
            //  .mark conditionLabel
            //  .brfalse endLoopLabel, (_i < _b.length)
            //      _c = _b[_i];
            //  .brfalse incrementLabel, (_c in _a)
            //      p = _c;
            //      /*body*/
            //  .mark incrementLabel
            //      _c++;
            //  .br conditionLabel
            //  .endloop
            //  .mark endLoopLabel

            const obj = declareLocal(); // _a
            const keysArray = declareLocal(); // _b
            const key = declareLocal(); // _c
            const keysIndex = factory.createLoopVariable(); // _i
            const initializer = node.initializer;
            hoistVariableDeclaration(keysIndex);
            emitAssignment(obj, ts.visitNode(node.expression, visitor, ts.isExpression));
            emitAssignment(keysArray, factory.createArrayLiteralExpression());

            emitStatement(
                factory.createForInStatement(
                    key,
                    obj,
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            factory.createPropertyAccessExpression(keysArray, "push"),
                            /*typeArguments*/ undefined,
                            [key]
                        )
                    )
                )
            );

            emitAssignment(keysIndex, factory.createNumericLiteral(0));

            const conditionLabel = defineLabel();
            const incrementLabel = defineLabel();
            const endLoopLabel = beginLoopBlock(incrementLabel);

            markLabel(conditionLabel);
            emitBreakWhenFalse(endLoopLabel, factory.createLessThan(keysIndex, factory.createPropertyAccessExpression(keysArray, "length")));

            emitAssignment(key, factory.createElementAccessExpression(keysArray, keysIndex));
            emitBreakWhenFalse(incrementLabel, factory.createBinaryExpression(key, ts.SyntaxKind.InKeyword, obj));

            let variable: ts.Expression;
            if (ts.isVariableDeclarationList(initializer)) {
                for (const variable of initializer.declarations) {
                    hoistVariableDeclaration(variable.name as ts.Identifier);
                }

                variable = factory.cloneNode(initializer.declarations[0].name) as ts.Identifier;
            }
            else {
                variable = ts.visitNode(initializer, visitor, ts.isExpression);
                ts.Debug.assert(ts.isLeftHandSideExpression(variable));
            }

            emitAssignment(variable, key);
            transformAndEmitEmbeddedStatement(node.statement);

            markLabel(incrementLabel);
            emitStatement(factory.createExpressionStatement(factory.createPostfixIncrement(keysIndex)));

            emitBreak(conditionLabel);
            endLoopBlock();
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function visitForInStatement(node: ts.ForInStatement) {
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
        if (ts.isVariableDeclarationList(initializer)) {
            for (const variable of initializer.declarations) {
                hoistVariableDeclaration(variable.name as ts.Identifier);
            }

            node = factory.updateForInStatement(node,
                initializer.declarations[0].name as ts.Identifier,
                ts.visitNode(node.expression, visitor, ts.isExpression),
                ts.visitNode(node.statement, visitor, ts.isStatement, factory.liftToBlock)
            );
        }
        else {
            node = ts.visitEachChild(node, visitor, context);
        }

        if (inStatementContainingYield) {
            endLoopBlock();
        }

        return node;
    }

    function transformAndEmitContinueStatement(node: ts.ContinueStatement): void {
        const label = findContinueTarget(node.label ? ts.idText(node.label) : undefined);
        if (label > 0) {
            emitBreak(label, /*location*/ node);
        }
        else {
            // invalid continue without a containing loop. Leave the node as is, per #17875.
            emitStatement(node);
        }
    }

    function visitContinueStatement(node: ts.ContinueStatement): ts.Statement {
        if (inStatementContainingYield) {
            const label = findContinueTarget(node.label && ts.idText(node.label));
            if (label > 0) {
                return createInlineBreak(label, /*location*/ node);
            }
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function transformAndEmitBreakStatement(node: ts.BreakStatement): void {
        const label = findBreakTarget(node.label ? ts.idText(node.label) : undefined);
        if (label > 0) {
            emitBreak(label, /*location*/ node);
        }
        else {
            // invalid break without a containing loop, switch, or labeled statement. Leave the node as is, per #17875.
            emitStatement(node);
        }
    }

    function visitBreakStatement(node: ts.BreakStatement): ts.Statement {
        if (inStatementContainingYield) {
            const label = findBreakTarget(node.label && ts.idText(node.label));
            if (label > 0) {
                return createInlineBreak(label, /*location*/ node);
            }
        }

        return ts.visitEachChild(node, visitor, context);
    }

    function transformAndEmitReturnStatement(node: ts.ReturnStatement): void {
        emitReturn(
            ts.visitNode(node.expression, visitor, ts.isExpression),
            /*location*/ node
        );
    }

    function visitReturnStatement(node: ts.ReturnStatement) {
        return createInlineReturn(
            ts.visitNode(node.expression, visitor, ts.isExpression),
            /*location*/ node
        );
    }

    function transformAndEmitWithStatement(node: ts.WithStatement) {
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
            beginWithBlock(cacheExpression(ts.visitNode(node.expression, visitor, ts.isExpression)));
            transformAndEmitEmbeddedStatement(node.statement);
            endWithBlock();
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function transformAndEmitSwitchStatement(node: ts.SwitchStatement) {
        if (containsYield(node.caseBlock)) {
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

            const expression = cacheExpression(ts.visitNode(node.expression, visitor, ts.isExpression));

            // Create labels for each clause and find the index of the first default clause.
            const clauseLabels: Label[] = [];
            let defaultClauseIndex = -1;
            for (let i = 0; i < numClauses; i++) {
                const clause = caseBlock.clauses[i];
                clauseLabels.push(defineLabel());
                if (clause.kind === ts.SyntaxKind.DefaultClause && defaultClauseIndex === -1) {
                    defaultClauseIndex = i;
                }
            }

            // Emit switch statements for each run of case clauses either from the first case
            // clause or the next case clause with a `yield` in its expression, up to the next
            // case clause with a `yield` in its expression.
            let clausesWritten = 0;
            let pendingClauses: ts.CaseClause[] = [];
            while (clausesWritten < numClauses) {
                let defaultClausesSkipped = 0;
                for (let i = clausesWritten; i < numClauses; i++) {
                    const clause = caseBlock.clauses[i];
                    if (clause.kind === ts.SyntaxKind.CaseClause) {
                        if (containsYield(clause.expression) && pendingClauses.length > 0) {
                            break;
                        }

                        pendingClauses.push(
                            factory.createCaseClause(
                                ts.visitNode(clause.expression, visitor, ts.isExpression),
                                [
                                    createInlineBreak(clauseLabels[i], /*location*/ clause.expression)
                                ]
                            )
                        );
                    }
                    else {
                        defaultClausesSkipped++;
                    }
                }

                if (pendingClauses.length) {
                    emitStatement(factory.createSwitchStatement(expression, factory.createCaseBlock(pendingClauses)));
                    clausesWritten += pendingClauses.length;
                    pendingClauses = [];
                }
                if (defaultClausesSkipped > 0) {
                    clausesWritten += defaultClausesSkipped;
                    defaultClausesSkipped = 0;
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
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function visitSwitchStatement(node: ts.SwitchStatement) {
        if (inStatementContainingYield) {
            beginScriptSwitchBlock();
        }

        node = ts.visitEachChild(node, visitor, context);

        if (inStatementContainingYield) {
            endSwitchBlock();
        }

        return node;
    }

    function transformAndEmitLabeledStatement(node: ts.LabeledStatement) {
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
            beginLabeledBlock(ts.idText(node.label));
            transformAndEmitEmbeddedStatement(node.statement);
            endLabeledBlock();
        }
        else {
            emitStatement(ts.visitNode(node, visitor, ts.isStatement));
        }
    }

    function visitLabeledStatement(node: ts.LabeledStatement) {
        if (inStatementContainingYield) {
            beginScriptLabeledBlock(ts.idText(node.label));
        }

        node = ts.visitEachChild(node, visitor, context);

        if (inStatementContainingYield) {
            endLabeledBlock();
        }

        return node;
    }

    function transformAndEmitThrowStatement(node: ts.ThrowStatement): void {
        // TODO(rbuckton): `expression` should be required on `throw`.
        emitThrow(
            ts.visitNode(node.expression ?? factory.createVoidZero(), visitor, ts.isExpression),
            /*location*/ node
        );
    }

    function transformAndEmitTryStatement(node: ts.TryStatement) {
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
                beginCatchBlock(node.catchClause.variableDeclaration!); // TODO: GH#18217
                transformAndEmitEmbeddedStatement(node.catchClause.block);
            }

            if (node.finallyBlock) {
                beginFinallyBlock();
                transformAndEmitEmbeddedStatement(node.finallyBlock);
            }

            endExceptionBlock();
        }
        else {
            emitStatement(ts.visitEachChild(node, visitor, context));
        }
    }

    function containsYield(node: ts.Node | undefined): boolean {
        return !!node && (node.transformFlags & ts.TransformFlags.ContainsYield) !== 0;
    }

    function countInitialNodesWithoutYield(nodes: ts.NodeArray<ts.Node>) {
        const numNodes = nodes.length;
        for (let i = 0; i < numNodes; i++) {
            if (containsYield(nodes[i])) {
                return i;
            }
        }

        return -1;
    }

    function onSubstituteNode(hint: ts.EmitHint, node: ts.Node): ts.Node {
        node = previousOnSubstituteNode(hint, node);
        if (hint === ts.EmitHint.Expression) {
            return substituteExpression(node as ts.Expression);
        }
        return node;
    }

    function substituteExpression(node: ts.Expression): ts.Expression {
        if (ts.isIdentifier(node)) {
            return substituteExpressionIdentifier(node);
        }
        return node;
    }

    function substituteExpressionIdentifier(node: ts.Identifier) {
        if (!ts.isGeneratedIdentifier(node) && renamedCatchVariables && renamedCatchVariables.has(ts.idText(node))) {
            const original = ts.getOriginalNode(node);
            if (ts.isIdentifier(original) && original.parent) {
                const declaration = resolver.getReferencedValueDeclaration(original);
                if (declaration) {
                    const name = renamedCatchVariableDeclarations[ts.getOriginalNodeId(declaration)];
                    if (name) {
                        // TODO(rbuckton): Does this need to be parented?
                        const clone = ts.setParent(ts.setTextRange(factory.cloneNode(name), name), name.parent);
                        ts.setSourceMapRange(clone, node);
                        ts.setCommentRange(clone, node);
                        return clone;
                    }
                }
            }
        }

        return node;
    }

    function cacheExpression(node: ts.Expression): ts.Identifier {
        if (ts.isGeneratedIdentifier(node) || ts.getEmitFlags(node) & ts.EmitFlags.HelperName) {
            return node as ts.Identifier;
        }

        const temp = factory.createTempVariable(hoistVariableDeclaration);
        emitAssignment(temp, node, /*location*/ node);
        return temp;
    }

    function declareLocal(name?: string): ts.Identifier {
        const temp = name
            ? factory.createUniqueName(name)
            : factory.createTempVariable(/*recordTempVariable*/ undefined);
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

        const label = nextLabelId;
        nextLabelId++;
        labelOffsets[label] = -1;
        return label;
    }

    /**
     * Marks the current operation with the specified label.
     */
    function markLabel(label: Label): void {
        ts.Debug.assert(labelOffsets !== undefined, "No labels were defined.");
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

        const index = blockActions!.length;
        blockActions![index] = BlockAction.Open;
        blockOffsets![index] = operations ? operations.length : 0;
        blocks[index] = block;
        blockStack!.push(block);
        return index;
    }

    /**
     * Ends the current block operation.
     */
    function endBlock(): CodeBlock {
        const block = peekBlock();
        if (block === undefined) return ts.Debug.fail("beginBlock was never called.");

        const index = blockActions!.length;
        blockActions![index] = BlockAction.Close;
        blockOffsets![index] = operations ? operations.length : 0;
        blocks![index] = block;
        blockStack!.pop();
        return block;
    }

    /**
     * Gets the current open block.
     */
    function peekBlock() {
        return ts.lastOrUndefined(blockStack);
    }

    /**
     * Gets the kind of the current open block.
     */
    function peekBlockKind(): CodeBlockKind | undefined {
        const block = peekBlock();
        return block && block.kind;
    }

    /**
     * Begins a code block for a generated `with` statement.
     *
     * @param expression An identifier representing expression for the `with` block.
     */
    function beginWithBlock(expression: ts.Identifier): void {
        const startLabel = defineLabel();
        const endLabel = defineLabel();
        markLabel(startLabel);
        beginBlock({
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
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.With);
        const block = endBlock() as WithBlock;
        markLabel(block.endLabel);
    }

    /**
     * Begins a code block for a generated `try` statement.
     */
    function beginExceptionBlock(): Label {
        const startLabel = defineLabel();
        const endLabel = defineLabel();
        markLabel(startLabel);
        beginBlock({
            kind: CodeBlockKind.Exception,
            state: ExceptionBlockState.Try,
            startLabel,
            endLabel
        });
        emitNop();
        return endLabel;
    }

    /**
     * Enters the `catch` clause of a generated `try` statement.
     *
     * @param variable The catch variable.
     */
    function beginCatchBlock(variable: ts.VariableDeclaration): void {
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.Exception);

        // generated identifiers should already be unique within a file
        let name: ts.Identifier;
        if (ts.isGeneratedIdentifier(variable.name)) {
            name = variable.name;
            hoistVariableDeclaration(variable.name);
        }
        else {
            const text = ts.idText(variable.name as ts.Identifier);
            name = declareLocal(text);
            if (!renamedCatchVariables) {
                renamedCatchVariables = new ts.Map<string, boolean>();
                renamedCatchVariableDeclarations = [];
                context.enableSubstitution(ts.SyntaxKind.Identifier);
            }

            renamedCatchVariables.set(text, true);
            renamedCatchVariableDeclarations[ts.getOriginalNodeId(variable)] = name;
        }

        const exception = peekBlock() as ExceptionBlock;
        ts.Debug.assert(exception.state < ExceptionBlockState.Catch);

        const endLabel = exception.endLabel;
        emitBreak(endLabel);

        const catchLabel = defineLabel();
        markLabel(catchLabel);
        exception.state = ExceptionBlockState.Catch;
        exception.catchVariable = name;
        exception.catchLabel = catchLabel;

        emitAssignment(name, factory.createCallExpression(factory.createPropertyAccessExpression(state, "sent"), /*typeArguments*/ undefined, []));
        emitNop();
    }

    /**
     * Enters the `finally` block of a generated `try` statement.
     */
    function beginFinallyBlock(): void {
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.Exception);

        const exception = peekBlock() as ExceptionBlock;
        ts.Debug.assert(exception.state < ExceptionBlockState.Finally);

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
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.Exception);
        const exception = endBlock() as ExceptionBlock;
        const state = exception.state;
        if (state < ExceptionBlockState.Finally) {
            emitBreak(exception.endLabel);
        }
        else {
            emitEndfinally();
        }

        markLabel(exception.endLabel);
        emitNop();
        exception.state = ExceptionBlockState.Done;
    }

    /**
     * Begins a code block that supports `break` or `continue` statements that are defined in
     * the source tree and not from generated code.
     *
     * @param labelText Names from containing labeled statements.
     */
    function beginScriptLoopBlock(): void {
        beginBlock({
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
        beginBlock({
            kind: CodeBlockKind.Loop,
            isScript: false,
            breakLabel,
            continueLabel,
        });
        return breakLabel;
    }

    /**
     * Ends a code block that supports `break` or `continue` statements that are defined in
     * generated code or in the source tree.
     */
    function endLoopBlock(): void {
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.Loop);
        const block = endBlock() as SwitchBlock;
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
        beginBlock({
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
        beginBlock({
            kind: CodeBlockKind.Switch,
            isScript: false,
            breakLabel,
        });
        return breakLabel;
    }

    /**
     * Ends a code block that supports `break` statements that are defined in generated code.
     */
    function endSwitchBlock(): void {
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.Switch);
        const block = endBlock() as SwitchBlock;
        const breakLabel = block.breakLabel;
        if (!block.isScript) {
            markLabel(breakLabel);
        }
    }

    function beginScriptLabeledBlock(labelText: string) {
        beginBlock({
            kind: CodeBlockKind.Labeled,
            isScript: true,
            labelText,
            breakLabel: -1
        });
    }

    function beginLabeledBlock(labelText: string) {
        const breakLabel = defineLabel();
        beginBlock({
            kind: CodeBlockKind.Labeled,
            isScript: false,
            labelText,
            breakLabel
        });
    }

    function endLabeledBlock() {
        ts.Debug.assert(peekBlockKind() === CodeBlockKind.Labeled);
        const block = endBlock() as LabeledBlock;
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
            const containingBlock = blockStack![j];
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
        if (blockStack) {
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
        }
        return 0;
    }

    /**
     * Finds the label that is the target for a `continue` statement.
     *
     * @param labelText An optional name of a containing labeled statement.
     */
    function findContinueTarget(labelText?: string): Label {
        if (blockStack) {
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
        }
        return 0;
    }

    /**
     * Creates an expression that can be used to indicate the value for a label.
     *
     * @param label A label.
     */
    function createLabel(label: Label | undefined): ts.Expression {
        if (label !== undefined && label > 0) {
            if (labelExpressions === undefined) {
                labelExpressions = [];
            }

            const expression = factory.createNumericLiteral(-1);
            if (labelExpressions[label] === undefined) {
                labelExpressions[label] = [expression];
            }
            else {
                labelExpressions[label].push(expression);
            }

            return expression;
        }

        return factory.createOmittedExpression();
    }

    /**
     * Creates a numeric literal for the provided instruction.
     */
    function createInstruction(instruction: Instruction): ts.NumericLiteral {
        const literal = factory.createNumericLiteral(instruction);
        ts.addSyntheticTrailingComment(literal, ts.SyntaxKind.MultiLineCommentTrivia, getInstructionName(instruction));
        return literal;
    }

    /**
     * Creates a statement that can be used indicate a Break operation to the provided label.
     *
     * @param label A label.
     * @param location An optional source map location for the statement.
     */
    function createInlineBreak(label: Label, location?: ts.TextRange): ts.ReturnStatement {
        ts.Debug.assertLessThan(0, label, "Invalid label");
        return ts.setTextRange(
            factory.createReturnStatement(
                factory.createArrayLiteralExpression([
                    createInstruction(Instruction.Break),
                    createLabel(label)
                ])
            ),
            location
        );
    }

    /**
     * Creates a statement that can be used indicate a Return operation.
     *
     * @param expression The expression for the return statement.
     * @param location An optional source map location for the statement.
     */
    function createInlineReturn(expression?: ts.Expression, location?: ts.TextRange): ts.ReturnStatement {
        return ts.setTextRange(
            factory.createReturnStatement(
                factory.createArrayLiteralExpression(expression
                    ? [createInstruction(Instruction.Return), expression]
                    : [createInstruction(Instruction.Return)]
                )
            ),
            location
        );
    }

    /**
     * Creates an expression that can be used to resume from a Yield operation.
     */
    function createGeneratorResume(location?: ts.TextRange): ts.LeftHandSideExpression {
        return ts.setTextRange(
            factory.createCallExpression(
                factory.createPropertyAccessExpression(state, "sent"),
                /*typeArguments*/ undefined,
                []
            ),
            location
        );
    }

    /**
     * Emits an empty instruction.
     */
    function emitNop() {
        emitWorker(OpCode.Nop);
    }

    /**
     * Emits a Statement.
     *
     * @param node A statement.
     */
    function emitStatement(node: ts.Statement): void {
        if (node) {
            emitWorker(OpCode.Statement, [node]);
        }
        else {
            emitNop();
        }
    }

    /**
     * Emits an Assignment operation.
     *
     * @param left The left-hand side of the assignment.
     * @param right The right-hand side of the assignment.
     * @param location An optional source map location for the assignment.
     */
    function emitAssignment(left: ts.Expression, right: ts.Expression, location?: ts.TextRange): void {
        emitWorker(OpCode.Assign, [left, right], location);
    }

    /**
     * Emits a Break operation to the specified label.
     *
     * @param label A label.
     * @param location An optional source map location for the assignment.
     */
    function emitBreak(label: Label, location?: ts.TextRange): void {
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
    function emitBreakWhenTrue(label: Label, condition: ts.Expression, location?: ts.TextRange): void {
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
    function emitBreakWhenFalse(label: Label, condition: ts.Expression, location?: ts.TextRange): void {
        emitWorker(OpCode.BreakWhenFalse, [label, condition], location);
    }

    /**
     * Emits a YieldStar operation for the provided expression.
     *
     * @param expression An optional value for the yield operation.
     * @param location An optional source map location for the assignment.
     */
    function emitYieldStar(expression?: ts.Expression, location?: ts.TextRange): void {
        emitWorker(OpCode.YieldStar, [expression], location);
    }

    /**
     * Emits a Yield operation for the provided expression.
     *
     * @param expression An optional value for the yield operation.
     * @param location An optional source map location for the assignment.
     */
    function emitYield(expression?: ts.Expression, location?: ts.TextRange): void {
        emitWorker(OpCode.Yield, [expression], location);
    }

    /**
     * Emits a Return operation for the provided expression.
     *
     * @param expression An optional value for the operation.
     * @param location An optional source map location for the assignment.
     */
    function emitReturn(expression?: ts.Expression, location?: ts.TextRange): void {
        emitWorker(OpCode.Return, [expression], location);
    }

    /**
     * Emits a Throw operation for the provided expression.
     *
     * @param expression A value for the operation.
     * @param location An optional source map location for the assignment.
     */
    function emitThrow(expression: ts.Expression, location?: ts.TextRange): void {
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
    function emitWorker(code: OpCode, args?: OperationArguments, location?: ts.TextRange): void {
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
        operationArguments![operationIndex] = args;
        operationLocations![operationIndex] = location;
    }

    /**
     * Builds the generator function body.
     */
    function build() {
        blockIndex = 0;
        labelNumber = 0;
        labelNumbers = undefined;
        lastOperationWasAbrupt = false;
        lastOperationWasCompletion = false;
        clauses = undefined;
        statements = undefined;
        exceptionBlockStack = undefined;
        currentExceptionBlock = undefined;
        withBlockStack = undefined;

        const buildResult = buildStatements();
        return emitHelpers().createGeneratorHelper(
            ts.setEmitFlags(
                factory.createFunctionExpression(
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    [factory.createParameterDeclaration(/*modifiers*/ undefined, /*dotDotDotToken*/ undefined, state)],
                    /*type*/ undefined,
                    factory.createBlock(
                        buildResult,
                        /*multiLine*/ buildResult.length > 0
                    )
                ),
                ts.EmitFlags.ReuseTempVariableScope
            )
        );
    }

    /**
     * Builds the statements for the generator function body.
     */
    function buildStatements(): ts.Statement[] {
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
            const labelExpression = factory.createPropertyAccessExpression(state, "label");
            const switchStatement = factory.createSwitchStatement(labelExpression, factory.createCaseBlock(clauses));
            return [ts.startOnNewLine(switchStatement)];
        }

        if (statements) {
            return statements;
        }

        return [];
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
        if (isFinalLabelReachable(operationIndex)) {
            tryEnterLabel(operationIndex);
            withBlockStack = undefined;
            writeReturn(/*expression*/ undefined, /*operationLocation*/ undefined);
        }

        if (statements && clauses) {
            appendLabel(/*markLabelEnd*/ false);
        }

        updateLabelExpressions();
    }

    /**
     * Tests whether the final label of the generator function body
     * is reachable by user code.
     */
    function isFinalLabelReachable(operationIndex: number) {
        // if the last operation was *not* a completion (return/throw) then
        // the final label is reachable.
        if (!lastOperationWasCompletion) {
            return true;
        }

        // if there are no labels defined or referenced, then the final label is
        // not reachable.
        if (!labelOffsets || !labelExpressions) {
            return false;
        }

        // if the label for this offset is referenced, then the final label
        // is reachable.
        for (let label = 0; label < labelOffsets.length; label++) {
            if (labelOffsets[label] === operationIndex && labelExpressions[label]) {
                return true;
            }
        }

        return false;
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
                    statements = [factory.createWithStatement(withBlock.expression, factory.createBlock(statements))];
                }
            }

            if (currentExceptionBlock) {
                // The previous label was nested inside of an exception block, so we must
                // indicate entry into a protected region by pushing the label numbers
                // for each block in the protected region.
                const { startLabel, catchLabel, finallyLabel, endLabel } = currentExceptionBlock;
                statements.unshift(
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(state, "trys"), "push"),
                            /*typeArguments*/ undefined,
                            [
                                factory.createArrayLiteralExpression([
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
                    factory.createExpressionStatement(
                        factory.createAssignment(
                            factory.createPropertyAccessExpression(state, "label"),
                            factory.createNumericLiteral(labelNumber + 1)
                        )
                    )
                );
            }
        }

        clauses.push(
            factory.createCaseClause(
                factory.createNumericLiteral(labelNumber),
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

        for (let label = 0; label < labelOffsets.length; label++) {
            if (labelOffsets[label] === operationIndex) {
                flushLabel();
                if (labelNumbers === undefined) {
                    labelNumbers = [];
                }
                if (labelNumbers[labelNumber] === undefined) {
                    labelNumbers[labelNumber] = [label];
                }
                else {
                    labelNumbers[labelNumber].push(label);
                }
            }
        }
    }

    /**
     * Updates literal expressions for labels with actual label numbers.
     */
    function updateLabelExpressions() {
        if (labelExpressions !== undefined && labelNumbers !== undefined) {
            for (let labelNumber = 0; labelNumber < labelNumbers.length; labelNumber++) {
                const labels = labelNumbers[labelNumber];
                if (labels !== undefined) {
                    for (const label of labels) {
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
    }

    /**
     * Tries to enter or leave a code block.
     */
    function tryEnterOrLeaveBlock(operationIndex: number): void {
        if (blocks) {
            for (; blockIndex < blockActions!.length && blockOffsets![blockIndex] <= operationIndex; blockIndex++) {
                const block: CodeBlock = blocks[blockIndex];
                const blockAction = blockActions![blockIndex];
                switch (block.kind) {
                    case CodeBlockKind.Exception:
                        if (blockAction === BlockAction.Open) {
                            if (!exceptionBlockStack) {
                                exceptionBlockStack = [];
                            }

                            if (!statements) {
                                statements = [];
                            }

                            exceptionBlockStack.push(currentExceptionBlock!);
                            currentExceptionBlock = block;
                        }
                        else if (blockAction === BlockAction.Close) {
                            currentExceptionBlock = exceptionBlockStack!.pop();
                        }
                        break;
                    case CodeBlockKind.With:
                        if (blockAction === BlockAction.Open) {
                            if (!withBlockStack) {
                                withBlockStack = [];
                            }

                            withBlockStack.push(block);
                        }
                        else if (blockAction === BlockAction.Close) {
                            withBlockStack!.pop();
                        }
                        break;
                    // default: do nothing
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

        const opcode = operations![operationIndex];
        if (opcode === OpCode.Nop) {
            return;
        }
        else if (opcode === OpCode.Endfinally) {
            return writeEndfinally();
        }

        const args = operationArguments![operationIndex]!;
        if (opcode === OpCode.Statement) {
            return writeStatement(args[0] as ts.Statement);
        }

        const location = operationLocations![operationIndex];
        switch (opcode) {
            case OpCode.Assign:
                return writeAssign(args[0] as ts.Expression, args[1] as ts.Expression, location);
            case OpCode.Break:
                return writeBreak(args[0] as Label, location);
            case OpCode.BreakWhenTrue:
                return writeBreakWhenTrue(args[0] as Label, args[1] as ts.Expression, location);
            case OpCode.BreakWhenFalse:
                return writeBreakWhenFalse(args[0] as Label, args[1] as ts.Expression, location);
            case OpCode.Yield:
                return writeYield(args[0] as ts.Expression, location);
            case OpCode.YieldStar:
                return writeYieldStar(args[0] as ts.Expression, location);
            case OpCode.Return:
                return writeReturn(args[0] as ts.Expression, location);
            case OpCode.Throw:
                return writeThrow(args[0] as ts.Expression, location);
        }
    }

    /**
     * Writes a statement to the current label's statement list.
     *
     * @param statement A statement to write.
     */
    function writeStatement(statement: ts.Statement): void {
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
    function writeAssign(left: ts.Expression, right: ts.Expression, operationLocation: ts.TextRange | undefined): void {
        writeStatement(ts.setTextRange(factory.createExpressionStatement(factory.createAssignment(left, right)), operationLocation));
    }

    /**
     * Writes a Throw operation to the current label's statement list.
     *
     * @param expression The value to throw.
     * @param operationLocation The source map location for the operation.
     */
    function writeThrow(expression: ts.Expression, operationLocation: ts.TextRange | undefined): void {
        lastOperationWasAbrupt = true;
        lastOperationWasCompletion = true;
        writeStatement(ts.setTextRange(factory.createThrowStatement(expression), operationLocation));
    }

    /**
     * Writes a Return operation to the current label's statement list.
     *
     * @param expression The value to return.
     * @param operationLocation The source map location for the operation.
     */
    function writeReturn(expression: ts.Expression | undefined, operationLocation: ts.TextRange | undefined): void {
        lastOperationWasAbrupt = true;
        lastOperationWasCompletion = true;
        writeStatement(
            ts.setEmitFlags(
                ts.setTextRange(
                    factory.createReturnStatement(
                        factory.createArrayLiteralExpression(expression
                            ? [createInstruction(Instruction.Return), expression]
                            : [createInstruction(Instruction.Return)]
                        )
                    ),
                    operationLocation
                ),
                ts.EmitFlags.NoTokenSourceMaps
            )
        );
    }

    /**
     * Writes a Break operation to the current label's statement list.
     *
     * @param label The label for the Break.
     * @param operationLocation The source map location for the operation.
     */
    function writeBreak(label: Label, operationLocation: ts.TextRange | undefined): void {
        lastOperationWasAbrupt = true;
        writeStatement(
            ts.setEmitFlags(
                ts.setTextRange(
                    factory.createReturnStatement(
                        factory.createArrayLiteralExpression([
                            createInstruction(Instruction.Break),
                            createLabel(label)
                        ])
                    ),
                    operationLocation
                ),
                ts.EmitFlags.NoTokenSourceMaps
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
    function writeBreakWhenTrue(label: Label, condition: ts.Expression, operationLocation: ts.TextRange | undefined): void {
        writeStatement(
            ts.setEmitFlags(
                factory.createIfStatement(
                    condition,
                    ts.setEmitFlags(
                        ts.setTextRange(
                            factory.createReturnStatement(
                                factory.createArrayLiteralExpression([
                                    createInstruction(Instruction.Break),
                                    createLabel(label)
                                ])
                            ),
                            operationLocation
                        ),
                        ts.EmitFlags.NoTokenSourceMaps
                    )
                ),
                ts.EmitFlags.SingleLine
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
    function writeBreakWhenFalse(label: Label, condition: ts.Expression, operationLocation: ts.TextRange | undefined): void {
        writeStatement(
            ts.setEmitFlags(
                factory.createIfStatement(
                    factory.createLogicalNot(condition),
                    ts.setEmitFlags(
                        ts.setTextRange(
                            factory.createReturnStatement(
                                factory.createArrayLiteralExpression([
                                    createInstruction(Instruction.Break),
                                    createLabel(label)
                                ])
                            ),
                            operationLocation
                        ),
                        ts.EmitFlags.NoTokenSourceMaps
                    )
                ),
                ts.EmitFlags.SingleLine
            )
        );
    }

    /**
     * Writes a Yield operation to the current label's statement list.
     *
     * @param expression The expression to yield.
     * @param operationLocation The source map location for the operation.
     */
    function writeYield(expression: ts.Expression, operationLocation: ts.TextRange | undefined): void {
        lastOperationWasAbrupt = true;
        writeStatement(
            ts.setEmitFlags(
                ts.setTextRange(
                    factory.createReturnStatement(
                        factory.createArrayLiteralExpression(
                            expression
                                ? [createInstruction(Instruction.Yield), expression]
                                : [createInstruction(Instruction.Yield)]
                        )
                    ),
                    operationLocation
                ),
                ts.EmitFlags.NoTokenSourceMaps
            )
        );
    }

    /**
     * Writes a YieldStar instruction to the current label's statement list.
     *
     * @param expression The expression to yield.
     * @param operationLocation The source map location for the operation.
     */
    function writeYieldStar(expression: ts.Expression, operationLocation: ts.TextRange | undefined): void {
        lastOperationWasAbrupt = true;
        writeStatement(
            ts.setEmitFlags(
                ts.setTextRange(
                    factory.createReturnStatement(
                        factory.createArrayLiteralExpression([
                            createInstruction(Instruction.YieldStar),
                            expression
                        ])
                    ),
                    operationLocation
                ),
                ts.EmitFlags.NoTokenSourceMaps
            )
        );
    }

    /**
     * Writes an Endfinally instruction to the current label's statement list.
     */
    function writeEndfinally(): void {
        lastOperationWasAbrupt = true;
        writeStatement(
            factory.createReturnStatement(
                factory.createArrayLiteralExpression([
                    createInstruction(Instruction.Endfinally)
                ])
            )
        );
    }
}
