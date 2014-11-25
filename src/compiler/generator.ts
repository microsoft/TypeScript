/// <reference path="types.ts"/>
/// <reference path="factory.ts"/>
module ts {

    enum BlockAction {
        Open,
        Close,
    }

    enum BlockKind {
        Exception,
        ScriptBreak,
        Break,
        ScriptLoop,
        Loop,
        With
    }

    enum ExceptionBlockState {
        Try,
        Catch,
        Finally,
        Done
    }


    interface BlockScope {
        kind: BlockKind;
    }

    interface ExceptionBlock extends BlockScope {
        state: ExceptionBlockState;
        startLabel: Label;
        catchVariable?: Identifier;
        catchLabel?: Label;
        finallyLabel?: Label;
        endLabel: Label;
    }

    interface ContinueBreakBlock extends BlockScope {
        breakLabel?: Label;
        labelSymbol?: Symbol;
        continueLabel?: Label;
    }

    interface WithBlock extends BlockScope {
        expression: Expression;
    }

    export function createCodeGenerator(): CodeGenerator {
        // locations
        var initialLocation: TextRange;
        var relatedLocation: TextRange;
        var locationStack: TextRange[] = [];

        // locals/hoisted variables/hoisted functions
        var nextLocalId: number = 0;
        var locals: VariableDeclaration[] = [];
        var namedLocals: VariableDeclaration[] = [];
        var functions: FunctionDeclaration[] = [];

        // blocks
        var blocks: BlockScope[] = [];
        var blockStack: BlockScope[] = [];
        var blockActions: BlockAction[] = [];
        var blockOffsets: number[] = [];
        var hasProtectedRegions: boolean = false;

        // labels
        var nextLabelId: number = 1;
        var labelNumbers: number[] = [];
        var labels: number[] = [];

        // operations
        var operations: OpCode[] = [];
        var operationArguments: any[][] = [];
        var operationLocations: TextRange[] = [];

        // mark the entry point
        markLabel(defineLabel());

        return {
            addFunction,
            declareLocal,
            defineLabel,
            markLabel,
            beginExceptionBlock,
            beginCatchBlock,
            beginFinallyBlock,
            endExceptionBlock,
            findBreakTarget,
            findContinueTarget,
            beginScriptLoopBlock,
            endScriptLoopBlock,
            beginScriptBreakBlock,
            endScriptBreakBlock,
            beginLoopBlock,
            endLoopBlock,
            beginBreakBlock,
            endBreakBlock,
            beginWithBlock,
            endWithBlock,
            emit,
            emitNode,
            pushLocation,
            popLocation,
            setLocation,
            copy,
            createBreak,
            createReturn,
            createGenerated,
            getFunctions,
            getLocals,
            getBody
        };

        function addFunction(func: FunctionDeclaration): void {
            functions[functions.length] = func;
        }

        function declareLocal(name?: string): Identifier {
            if (name) {
                var list = namedLocals;
            } else {
                name = "__l" + (nextLocalId++)
                var list = locals;
            }

            var localDeclarationName = factory.createIdentifier(name, initialLocation);
            var localDeclaration = factory.createVariableDeclaration(localDeclarationName, undefined, initialLocation);
            list.push(localDeclaration);
            return factory.createIdentifier(name, relatedLocation);
        }

        function defineLabel(): Label {
            var label = nextLabelId++;
            labels[label] = -1;
            return <Label>label;
        }

        function markLabel(label: Label): void {
            labels[<number>label] = operations.length;
        }

        function beginExceptionBlock(): Label {
            var startLabel = defineLabel();
            var endLabel = defineLabel();
            markLabel(startLabel);
            beginBlock<ExceptionBlock>({
                kind: BlockKind.Exception,
                state: ExceptionBlockState.Try,
                startLabel,
                endLabel,
            });
            hasProtectedRegions = true;
            return endLabel;
        }

        function beginCatchBlock(variable: Identifier): void {
            Debug.assert(peekBlockKind() === BlockKind.Exception);
            var exception = <ExceptionBlock>peekBlock();
            var endLabel = exception.endLabel;
            emit(OpCode.Break, endLabel);

            var catchLabel = defineLabel();
            markLabel(catchLabel);
            exception.state = ExceptionBlockState.Catch;
            exception.catchVariable = variable;
            exception.catchLabel = catchLabel;
        }

        function beginFinallyBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Exception);
            var exception = <ExceptionBlock>peekBlock();
            var state = exception.state;
            var endLabel = exception.endLabel;
            emit(OpCode.Break, endLabel);

            var finallyLabel = defineLabel();
            markLabel(finallyLabel);
            exception.state = ExceptionBlockState.Finally;
            exception.finallyLabel = finallyLabel;
        }

        function endExceptionBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Exception);
            var exception = endBlock<ExceptionBlock>();
            var state = exception.state;
            if (state === ExceptionBlockState.Finally) {
                emit(OpCode.Endfinally);
            }

            markLabel(exception.endLabel);
            exception.state = ExceptionBlockState.Done;
        }

        function beginScriptLoopBlock(labelSymbol: Symbol): void {
            beginBlock<ContinueBreakBlock>({
                kind: BlockKind.ScriptLoop,
                labelSymbol: labelSymbol,
                breakLabel: -1,
                continueLabel: -1
            });
        }

        function endScriptLoopBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.ScriptLoop);
            endBlock<ContinueBreakBlock>();
        }

        function beginScriptBreakBlock(labelSymbol: Symbol): void {
            beginBlock<ContinueBreakBlock>({
                kind: BlockKind.ScriptBreak,
                labelSymbol: labelSymbol,
                breakLabel: -1
            });
        }

        function endScriptBreakBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.ScriptBreak);
            endBlock<ContinueBreakBlock>();
        }

        function beginLoopBlock(continueLabel: Label, labelSymbol: Symbol): Label {
            var breakLabel = defineLabel();
            beginBlock<ContinueBreakBlock>({
                kind: BlockKind.Loop,
                labelSymbol: labelSymbol,
                breakLabel: breakLabel,
                continueLabel: continueLabel
            });
            return breakLabel;
        }

        function endLoopBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Loop);
            var block = endBlock<ContinueBreakBlock>();
            var breakLabel = block.breakLabel;
            if (breakLabel > 0) {
                markLabel(breakLabel);
            }
        }

        function beginBreakBlock(labelSymbol: Symbol): Label {
            var breakLabel = defineLabel();
            beginBlock<ContinueBreakBlock>({
                kind: BlockKind.Break,
                labelSymbol: labelSymbol,
                breakLabel: breakLabel
            });
            return breakLabel;
        }

        function endBreakBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Break);
            var block = endBlock<ContinueBreakBlock>();
            var breakLabel = block.breakLabel;
            if (breakLabel > 0) {
                markLabel(breakLabel);
            }
        }

        function beginWithBlock(expression: Expression): void {
            beginBlock<WithBlock>({
                kind: BlockKind.With,
                expression: expression
            });
        }

        function endWithBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.With);
            endBlock<WithBlock>();
        }

        function beginBlock<TBlock extends BlockScope>(block: TBlock): number {
            var index = blockActions.length;
            blockActions[index] = BlockAction.Open;
            blockOffsets[index] = operations.length;
            blocks[index] = block;
            blockStack.push(block);
            return index;
        }

        function endBlock<TBlock extends BlockScope>(): TBlock {
            var block = blockStack.pop();
            var index = blockActions.length;
            blockActions[index] = BlockAction.Close;
            blockOffsets[index] = operations.length;
            blocks[index] = block;
            return <TBlock>block;
        }

        function peekBlock(back: number = 0): BlockScope {
            return blockStack[blockStack.length - (1 + back)];
        }

        function peekBlockKind(back: number = 0): BlockKind {
            var block = peekBlock(back);
            return block && block.kind;
        }

        function findBreakTarget(labelSymbol?: Symbol): Label {
            for (var i = blockStack.length - 1; i >= 0; i--) {
                var block = blockStack[i];
                if (supportsBreak(block)) {
                    var continueBreakBlock = <ContinueBreakBlock>block;
                    if (!labelSymbol || continueBreakBlock.labelSymbol === labelSymbol) {
                        return continueBreakBlock.breakLabel;
                    }
                }
            }

            return 0;
        }

        function findContinueTarget(labelSymbol?: Symbol): Label {
            for (var i = blockStack.length - 1; i >= 0; i--) {
                var block = blockStack[i];
                if (supportsContinue(block)) {
                    var continueBreakBlock = <ContinueBreakBlock>block;
                    if (continueBreakBlock.continueLabel && (!labelSymbol || continueBreakBlock.labelSymbol === labelSymbol)) {
                        return continueBreakBlock.continueLabel;
                    }
                }
            }
        }

        function supportsBreak(block: BlockScope): boolean {
            switch (block.kind) {
                case BlockKind.ScriptBreak:
                case BlockKind.ScriptLoop:
                case BlockKind.Break:
                case BlockKind.Loop:
                    return true;
            }
            return false;
        }

        function supportsContinue(block: BlockScope): boolean {
            switch (block.kind) {
                case BlockKind.ScriptLoop:
                case BlockKind.Loop:
                    return true;
            }
            return false;
        }

        function emit(code: OpCode, ...args: any[]): void {
            if (typeof args[0] === "string") {
                args = [createGenerated(args[0], args[1])];
            } else if (typeof args[1] === "string") {
                args = [args[0], createGenerated(args[1], args[2])];
            }

            if (code === OpCode.Statement) {
                var node = args[0];
                if (!node) {
                    return;
                }
            }

            var operationIndex = operations.length;
            operations[operationIndex] = code;
            operationArguments[operationIndex] = args;
            operationLocations[operationIndex] = relatedLocation;
        }

        function emitNode(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.Block:
                case SyntaxKind.FunctionBlock:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchBlock:
                case SyntaxKind.FinallyBlock:
                    return forEach((<Block>node).statements, emitNode);

                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    return forEach((<CaseOrDefaultClause>node).statements, emitNode);
            }

            emit(OpCode.Statement, node);
        }

        function pushLocation(location: TextRange): void {
            locationStack.push(relatedLocation);
            setLocation(location);
        }

        function popLocation(): void {
            setLocation(locationStack.pop());
        }

        function setLocation(location: TextRange): void {
            if (location) {
                relatedLocation = location;
                if (!initialLocation) {
                    initialLocation = location;
                }
            }
        }

        function copy(node: Expression): Expression {
            var local = declareLocal();
            emit(OpCode.Statement, createGenerated(`\${local} = \${node};`, { local, node }));
            return local;
        }

        function createLabel(label: Label): GeneratedLabel {
            return factory.createGeneratedLabel(label, labelNumbers, relatedLocation);
        }

        function createGenerated(text: string, content?: Map<Node|Node[]>): GeneratedNode {
            return factory.createGeneratedNode(text, content, relatedLocation);
        }

        function createBreak(label: Label): Statement {
            return createGenerated(`return ["break", \${label}]`, { label: createLabel(label) });
        }

        function getReturnLabel(): Label {
            for (var i = blockStack.length - 1; i >= 0; i--) {
                var block = blockStack[i];
                if (block.kind === BlockKind.Exception) {
                    var exception = <ExceptionBlock>block;
                    return exception.endLabel;
                }
            }
        }

        function createReturn(expression: Expression): Statement {
            if (expression) {
                return createGenerated(`return ["return", \${expression}]`, { expression });
            } else {
                return createGenerated(`return ["return"]`);
            }
        }

        function createYield(expression: Expression): Statement {
            if (expression) {
                return createGenerated(`return ["yield", \${expression}]`, { expression });
            } else {
                return createGenerated(`return ["yield"]`);
            }
        }

        function getFunctions(): FunctionDeclaration[] {
            return functions;
        }

        function getLocals(): VariableStatement {
            if (locals.length) {
                return factory.createVariableStatement(factory.createNodeArray(namedLocals.concat(locals), initialLocation), initialLocation);
            }
        }

        function getBody(): NodeArray<CaseOrDefaultClause> {
            var exceptionStack: ExceptionBlock[] = [];
            var withStack: WithBlock[] = [];
            var clauses = factory.createNodeArray<CaseOrDefaultClause>([], initialLocation);
            var statements = <NodeArray<Statement>>[];
            var statementsStack: NodeArray<Statement>[] = [];
            var blockIndex: number = 0;

            for (var operationIndex = 0; operationIndex < operations.length; operationIndex++) {
                var code = operations[operationIndex];
                var args = operationArguments[operationIndex];
                relatedLocation = operationLocations[operationIndex];
                ensureLabels();
                writeOperation(code, args);
            }

            ensureLabels();
            return clauses;

            function ensureLabels(): void {
                var createCase = false;
                for (var label = 0; label < labels.length; label++) {
                    if (labels[label] === operationIndex) {
                        createCase = true;
                    }
                }

                if (createCase) {
                    var labelNumber = clauses.length;
                    labelNumbers[label] = labelNumber;

                    var clause = factory.createCaseClause(createLabel(label), [], relatedLocation);
                    clauses.push(clause);
                    statements = clause.statements;

                    if (labelNumber === 0 && hasProtectedRegions) {
                        writeStatement(createGenerated(`__state.trys = [];`));
                    }
                }
            }

            function writeOperation(code: OpCode, args: any[]): void {
                for (; blockIndex < blockActions.length && blockOffsets[blockIndex] <= operationIndex; blockIndex++) {
                    var block = blocks[blockIndex];
                    if (blockActions[blockIndex] === BlockAction.Open && block.kind === BlockKind.Exception) {
                        var exception = <ExceptionBlock>block;
                        writeStatement(createGenerated(`__state.trys.push([\${startLabel},\${catchLabel},\${finallyLabel},\${endLabel}])`, {
                            startLabel: createLabel(exception.startLabel),
                            catchLabel: createLabel(exception.catchLabel),
                            finallyLabel: createLabel(exception.finallyLabel),
                            endLabel: createLabel(exception.endLabel)
                        }));
                    }
                }

                switch (code) {
                    case OpCode.Statement: return writeStatement(<Node>args[0]);
                    case OpCode.Assign: return writeAssign(<Expression>args[0], <Expression>args[1]);
                    case OpCode.Break: return writeBreak(<Label>args[0]);
                    case OpCode.BrTrue: return writeBrTrue(<Label>args[0], <Expression>args[1]);
                    case OpCode.BrFalse: return writeBrFalse(<Label>args[0], <Expression>args[1]);
                    case OpCode.Yield: return writeYield(<Expression>args[0]);
                    case OpCode.Return: return writeReturn(<Expression>args[0]);
                    case OpCode.Endfinally: return writeEndfinally();
                }
            }

            function writeStatement(node: Node): void {
                if (!isStatement(node) && node.kind !== SyntaxKind.GeneratedNode) {
                    node = factory.createExpressionStatement(node, relatedLocation);
                }

                if (!node.parent) {
                    node.parent = clauses[clauses.length - 1];
                }

                statements.push(<Statement>node);
                statements.end = Math.max(statements.end, node.end);
            }

            function writeAssign(left: Expression, right: Expression): void {
                writeStatement(createGenerated(`\${left} = \${right}`, { left, right }));
            }

            function writeBreak(label: Label): void {
                writeStatement(createBreak(label));
            }

            function writeBrTrue(label: Label, condition: Expression): void {
                var statement = createBreak(label);
                writeStatement(createGenerated(`if (\${condition}) { \${statement} }`, { condition, statement }));
            }

            function writeBrFalse(label: Label, condition: Expression): void {
                var statement = createBreak(label);
                writeStatement(createGenerated(`if (!(\${condition})) { \${statement} }`, { condition, statement }));
            }

            function writeYield(expression: Expression): void {
                writeStatement(createYield(expression));
            }

            function writeReturn(expression: Expression): void {
                writeStatement(createReturn(expression));
            }

            function writeEndfinally(): void {
                writeStatement(createGenerated(`return ["endfinally"];`));
            }
        }
    }
}
