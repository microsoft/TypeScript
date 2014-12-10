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
        ScriptContinue,
        Continue
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

    interface BreakBlock extends BlockScope {
        breakLabel: Label;
        labelText?: string;
    }

    interface ContinueBlock extends BreakBlock {
        continueLabel: Label;
    }

    export function createLocalGenerator(resolver: EmitResolver, context: Node): LocalGenerator {
        var localIds: Map<number>;
        var generatedLocals: VariableDeclaration[];

        return {
            createUniqueIdentifier,
            declareLocal,
            buildLocals
        };
        
        function createUniqueIdentifier(name: string = ""): Identifier {
            if (!localIds) localIds = {};
            if (!name || !resolver.isUnknownIdentifier(context, name) || hasProperty(localIds, name)) {
                var nextLocalId = localIds[name] || 0;
                do {
                    var tempName = name + "_" + (nextLocalId < 26 ? String.fromCharCode(nextLocalId + 0x61) : nextLocalId - 26);
                    nextLocalId++;
                }
                while (!resolver.isUnknownIdentifier(context, tempName));
                localIds[name] = nextLocalId;
                name = tempName;
            } else {
                localIds[name] = 0;
            }

            return factory.createIdentifier(name);
        }

        function declareLocal(name?: string): Identifier {
            if (!generatedLocals) generatedLocals = [];
            var localDeclarationName = createUniqueIdentifier(name);
            var localDeclaration = factory.createVariableDeclaration(localDeclarationName);
            generatedLocals.push(localDeclaration);
            return localDeclarationName;
        }

        function buildLocals(): VariableStatement {
            if (generatedLocals) {
                return factory.createVariableStatement(generatedLocals);
            }
        }
    }

    export function createCodeGenerator(locals: LocalGenerator, resolver: EmitResolver, functionLocation: Node, options?: { promiseConstructor: string; }): CodeGenerator {
        // locations
        var bodyLocation: Node = functionLocation;
        var statementsLocation: TextRange = functionLocation;
        var generatedLocation: TextRange = { pos: -1, end: -1 };
        var pendingLocation: TextRange = generatedLocation;

        // locals/hoisted variables/hoisted functions
        var parameters: ParameterDeclaration[];
        var functions: FunctionDeclaration[];
        var variableStatements: VariableStatement[] = [];
        var currentVariableStatement: VariableStatement;
        var variableDeclarations: VariableDeclaration[];

        // blocks
        var blocks: BlockScope[];
        var blockStack: BlockScope[];
        var blockActions: BlockAction[];
        var blockOffsets: number[];
        var hasProtectedRegions: boolean;

        // labels
        var nextLabelId: number = 1;
        var labelNumbers: number[];
        var labels: number[];

        // operations
        var operations: OpCode[];
        var operationArguments: any[][];
        var operationLocations: TextRange[];

        var state: GeneratedNode;

        if (isAnyFunction(functionLocation)) {
            bodyLocation = (<FunctionLikeDeclaration>functionLocation).body;
            statementsLocation = bodyLocation;
            if (bodyLocation.kind === SyntaxKind.FunctionBlock) {
                statementsLocation = (<Block>bodyLocation).statements;
            }
        }

        var declareLocal = locals.declareLocal;
        var createUniqueIdentifier = locals.createUniqueIdentifier;

        return {
            writeLocation,
            addParameter,
            addVariable,
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
            beginScriptContinueBlock,
            endScriptContinueBlock,
            beginScriptBreakBlock,
            endScriptBreakBlock,
            beginContinueBlock,
            endContinueBlock,
            beginBreakBlock,
            endBreakBlock,
            emit,
            cacheExpression,
            createUniqueIdentifier,
            createInlineBreak,
            createInlineReturn,
            createResume,
            buildFunction
        };

        function writeLocation(location: TextRange): void {
            pendingLocation = location;
        }

        function readLocation(): TextRange {
            var location = pendingLocation;
            pendingLocation = generatedLocation;
            return location;
        }

        function addParameter(name: Identifier, flags?: NodeFlags): void {
            if (!parameters) parameters = [];
            parameters.push(factory.createParameterDeclaration(name, undefined, readLocation(), flags));
        }

        function addVariable(name: Identifier, flags?: NodeFlags): void {
            if (!variableDeclarations) {
                variableDeclarations = factory.createNodeArray([], generatedLocation);
            }

            variableDeclarations.push(factory.createVariableDeclaration(factory.createIdentifier(name.text, generatedLocation), /*initializer*/ undefined, generatedLocation));
        }

        function addFunction(func: FunctionDeclaration): void {
            if (!functions) functions = [];
            functions.push(func);
        }

        function defineLabel(): Label {
            if (!labels) labels = [];
            var label = nextLabelId++;
            labels[label] = -1;
            return <Label>label;
        }

        function markLabel(label: Label): void {
            Debug.assert(!!labels, "No labels were defined.");
            labels[<number>label] = operations ? operations.length : 0;
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
            Debug.assert(exception.state < ExceptionBlockState.Catch);

            var endLabel = exception.endLabel;
            emit(OpCode.Break, endLabel);

            var catchLabel = defineLabel();
            markLabel(catchLabel);
            exception.state = ExceptionBlockState.Catch;
            exception.catchVariable = variable;
            exception.catchLabel = catchLabel;

            var state = getState();
            var errorProperty = factory.createPropertyAccess(state, factory.createIdentifier("error"));
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, variable, errorProperty);
            emit(OpCode.Statement, assignExpression);
        }

        function beginFinallyBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Exception);

            var exception = <ExceptionBlock>peekBlock();
            Debug.assert(exception.state < ExceptionBlockState.Finally);

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
            if (state < ExceptionBlockState.Finally) {
                emit(OpCode.Break, exception.endLabel);
            }
            else {
                emit(OpCode.Endfinally);
            }

            markLabel(exception.endLabel);
            exception.state = ExceptionBlockState.Done;
        }

        function beginScriptContinueBlock(labelText: string): void {
            beginBlock<ContinueBlock>({
                kind: BlockKind.ScriptContinue,
                labelText: labelText,
                breakLabel: -1,
                continueLabel: -1
            });
        }

        function endScriptContinueBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.ScriptContinue);
            endBlock<ContinueBlock>();
        }

        function beginScriptBreakBlock(labelText: string): void {
            beginBlock<BreakBlock>({
                kind: BlockKind.ScriptBreak,
                labelSymbol: labelText,
                breakLabel: -1
            });
        }

        function endScriptBreakBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.ScriptBreak);
            endBlock<BreakBlock>();
        }

        function beginContinueBlock(continueLabel: Label, labelText: string): Label {
            var breakLabel = defineLabel();
            beginBlock<ContinueBlock>({
                kind: BlockKind.Continue,
                labelText: labelText,
                breakLabel: breakLabel,
                continueLabel: continueLabel
            });
            return breakLabel;
        }

        function endContinueBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Continue);
            var block = endBlock<BreakBlock>();
            var breakLabel = block.breakLabel;
            if (breakLabel > 0) {
                markLabel(breakLabel);
            }
        }

        function beginBreakBlock(labelText: string): Label {
            var breakLabel = defineLabel();
            beginBlock<BreakBlock>({
                kind: BlockKind.Break,
                labelText: labelText,
                breakLabel: breakLabel
            });
            return breakLabel;
        }

        function endBreakBlock(): void {
            Debug.assert(peekBlockKind() === BlockKind.Break);
            var block = endBlock<BreakBlock>();
            var breakLabel = block.breakLabel;
            if (breakLabel > 0) {
                markLabel(breakLabel);
            }
        }

        function beginBlock<TBlock extends BlockScope>(block: TBlock): number {
            if (!blocks) {
                blocks = [];
                blockActions = [];
                blockOffsets = [];
                blockStack = [];
            }

            var index = blockActions.length;
            blockActions[index] = BlockAction.Open;
            blockOffsets[index] = operations ? operations.length : 0;
            blocks[index] = block;
            blockStack.push(block);
            return index;
        }

        function endBlock<TBlock extends BlockScope>(): TBlock {
            Debug.assert(!!blocks, "beginBlock was never called.");
            var block = blockStack.pop();
            var index = blockActions.length;
            blockActions[index] = BlockAction.Close;
            blockOffsets[index] = operations ? operations.length : 0;
            blocks[index] = block;
            return <TBlock>block;
        }

        function peekBlock(back: number = 0): BlockScope {
            if (blocks) {
                return blockStack[blockStack.length - (1 + back)];
            }
        }

        function peekBlockKind(back: number = 0): BlockKind {
            var block = peekBlock(back);
            return block && block.kind;
        }

        function findBreakTarget(labelText?: string): Label {
            if (blocks) {
                for (var i = blockStack.length - 1; i >= 0; i--) {
                    var block = blockStack[i];
                    if (supportsBreak(block)) {
                        var breakBlock = <BreakBlock>block;
                        if (!labelText || breakBlock.labelText === labelText) {
                            return breakBlock.breakLabel;
                        }
                    }
                }
            }

            return 0;
        }

        function findContinueTarget(labelText?: string): Label {
            if (blocks) {
                for (var i = blockStack.length - 1; i >= 0; i--) {
                    var block = blockStack[i];
                    if (supportsContinue(block)) {
                        var continueBreakBlock = <ContinueBlock>block;
                        if (!labelText || continueBreakBlock.labelText === labelText) {
                            return continueBreakBlock.continueLabel;
                        }
                    }
                }
            }
        }

        function supportsBreak(block: BlockScope): boolean {
            switch (block.kind) {
                case BlockKind.ScriptBreak:
                case BlockKind.ScriptContinue:
                case BlockKind.Break:
                case BlockKind.Continue:
                    return true;
            }
            return false;
        }

        function supportsContinue(block: BlockScope): boolean {
            switch (block.kind) {
                case BlockKind.ScriptContinue:
                case BlockKind.Continue:
                    return true;
            }
            return false;
        }

        function emit(code: OpCode, ...args: any[]): void {
            var location = readLocation();
            if (typeof args[0] === "string") {
                args = [factory.createGeneratedNode(args[0], args[1], location)];
            } else if (typeof args[1] === "string") {
                args = [args[0], factory.createGeneratedNode(args[1], args[2], location)];
            }

            if (code === OpCode.Statement) {
                var node = args[0];
                if (!node) {
                    return;
                }
            }

            if (!operations) {
                operations = [];
                operationArguments = [];
                operationLocations = [];
            }

            if (!labels) {
                // mark entry point
                markLabel(defineLabel());
            }

            var operationIndex = operations.length;
            operations[operationIndex] = code;
            operationArguments[operationIndex] = args;
            operationLocations[operationIndex] = location;
        }

        function cacheExpression(node: Expression): GeneratedNode {
            var local = declareLocal();
            var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, local, node);
            emit(OpCode.Statement, assignExpression);
            return local;
        }

        function createLabel(label: Label): GeneratedLabel {
            if (!labelNumbers) labelNumbers = [];
            return factory.createGeneratedLabel(label, labelNumbers);
        }

        function createInlineBreak(label: Label): ReturnStatement {
            var instruction = factory.createStringLiteral('"break"');
            var returnExpression = factory.createArrayLiteral([instruction, createLabel(label)]);
            return factory.createReturnStatement(returnExpression, readLocation());
        }

        function createInlineReturn(expression: Expression): ReturnStatement {
            var instruction = factory.createStringLiteral('"return"');
            if (expression) {
                var returnExpression = factory.createArrayLiteral([instruction, expression]);
            } else {
                var returnExpression = factory.createArrayLiteral([instruction]);
            }
            return factory.createReturnStatement(returnExpression, readLocation());
        }

        function createResume(): Expression {
            var state = getState();
            return factory.createPropertyAccess(state, factory.createIdentifier("sent"));
        }

        function getState(): GeneratedNode {
            if (!state) state = createUniqueIdentifier("_state");
            return state;
        }

        function buildFunction(kind: SyntaxKind, name: DeclarationName) {
            var statements: Statement[] = [];
            var generatedLocals = locals.buildLocals();
            if (generatedLocals) {
                statements.push(generatedLocals);
            }

            if (variableDeclarations) {
                statements.push(factory.createVariableStatement(variableDeclarations, generatedLocation));
            }

            if (functions) {
                statements = statements.concat(functions);
            }

            var state = getState();
            var cases = buildFunctionBody();

            if (options) {
                var resolve = createUniqueIdentifier("_resolve");
                var promiseConstructor = factory.createGeneratedNode(options.promiseConstructor);
                statements.push(factory.createGeneratedNode(`
                    return new \${promiseConstructor}(function (\${resolve}) {
                        \${resolve}(__awaiter(__generator(function (\${state}) {
                            switch (\${state}.label) {
                                @{cases}
                            }
                        })));
                    });`, { promiseConstructor, cases, resolve, state }));
            } else {
                statements.push(factory.createGeneratedNode(`
                    return __generator(function (\${state}) {
                        switch (\${state}.label) {
                            @{cases}
                        }
                    });`, { cases, state }));
            }

            var body = factory.createFunctionBlock(factory.createNodeArray<Statement>(statements, statementsLocation), bodyLocation);
            var node: FunctionLikeDeclaration;
            switch (kind) {
                case SyntaxKind.FunctionDeclaration:
                    node = factory.createFunctionDeclaration(<Identifier>name, body, parameters, functionLocation);
                    break;

                case SyntaxKind.Method:
                    node = factory.createMethodDeclaration(name, body, parameters, functionLocation);
                    break;

                case SyntaxKind.GetAccessor:
                    node = factory.createGetAccessor(name, body, parameters, functionLocation);
                    break;

                case SyntaxKind.FunctionExpression:
                    node = factory.createFunctionExpression(<Identifier>name, body, parameters, functionLocation);
                    break;

                case SyntaxKind.ArrowFunction:
                    node = factory.createArrowFunction(body, parameters, functionLocation);
                    break;
            }

            return node;
        }

        function buildFunctionBody(): GeneratedNode[] {
            Debug.assert(!!labels, "No labels were defined.");
            var exceptionStack: ExceptionBlock[] = [];
            var clauses: GeneratedNode[] = [];
            var statements: Statement[] = [];
            var statementsStack: NodeArray<Statement>[] = [];
            var blockIndex: number = 0;
            var instructionWasAbrupt = false;
            var instructionWasCompletion = false;
            var state = getState();
            var relatedLocation: TextRange = statementsLocation;

            if (hasProtectedRegions) {
                newCase();

                var trysProperty = factory.createPropertyAccess(state, factory.createIdentifier("trys"));
                var trysArray = factory.createArrayLiteral([]);
                var assignTrys = factory.createBinaryExpression(SyntaxKind.EqualsToken, trysProperty, trysArray);
                writeStatement(assignTrys);
            }

            if (operations) {
                for (var operationIndex = 0; operationIndex < operations.length; operationIndex++) {
                    var code = operations[operationIndex];
                    var args = operationArguments[operationIndex];
                    ensureLabels();

                    relatedLocation = operationLocations[operationIndex];
                    writeOperation(code, args);
                }
            }

            ensureLabels();

            if (!instructionWasCompletion) {
                relatedLocation = generatedLocation;
                writeReturn();
            }

            return clauses;

            function ensureLabels(): void {
                if (!labelNumbers) labelNumbers = [];
                var createCase = false;
                for (var label = 0; label < labels.length; label++) {
                    if (labels[label] === operationIndex) {
                        labelNumbers[label] = clauses.length;
                        createCase = true;
                    }
                }

                if (createCase) {
                    newCase();
                }
            }

            function newCase() {
                var labelNumber = clauses.length;
                var labelExpression = factory.createNumericLiteral(labelNumber);

                // handle implicit fall-through
                if (!instructionWasAbrupt && !instructionWasCompletion && labelNumber > 0) {
                    var labelProperty = factory.createPropertyAccess(state, factory.createIdentifier("label"));
                    var labelAssign = factory.createBinaryExpression(SyntaxKind.EqualsToken, labelProperty, labelExpression);
                    writeStatement(labelAssign);
                }

                statements = [];
                instructionWasAbrupt = false;
                instructionWasCompletion = false;

                clauses.push(factory.createGeneratedNode(`
                    case \${labelExpression}:
                        @{statements}`, { labelExpression, statements }));
            }

            function writeOperation(code: OpCode, args: any[]): void {
                if (blocks) {
                    for (; blockIndex < blockActions.length && blockOffsets[blockIndex] <= operationIndex; blockIndex++) {
                        var block = blocks[blockIndex];
                        if (blockActions[blockIndex] === BlockAction.Open && block.kind === BlockKind.Exception) {
                            var exception = <ExceptionBlock>block;
                            var startLabel = createLabel(exception.startLabel);
                            var endLabel = createLabel(exception.endLabel);
                            var catchLabel: Expression;
                            if (exception.catchLabel > 0) {
                                catchLabel = createLabel(exception.catchLabel);
                            }
                            else {
                                catchLabel = factory.createOmittedExpression();
                            }

                            var finallyLabel: Expression;
                            if (exception.finallyLabel > 0) {
                                finallyLabel = createLabel(exception.finallyLabel);
                            }
                            else {
                                finallyLabel = factory.createOmittedExpression();
                            }
                            
                            var labelsArray = factory.createArrayLiteral([startLabel, catchLabel, finallyLabel, endLabel]);
                            var trysProperty = factory.createPropertyAccess(state, factory.createIdentifier("trys"));
                            var pushMethod = factory.createPropertyAccess(trysProperty, factory.createIdentifier("push"));
                            var callExpression = factory.createCallExpression(pushMethod, [labelsArray]);
                            writeStatement(callExpression);
                        }
                    }
                }

                // early termination, nothing else to process in this label
                if (instructionWasAbrupt || instructionWasCompletion) {
                    return;
                }

                instructionWasAbrupt = false;
                instructionWasCompletion = false;
                switch (code) {
                    case OpCode.Statement: return writeStatement(<Node>args[0]);
                    case OpCode.Assign: return writeAssign(<Expression>args[0], <Expression>args[1]);
                    case OpCode.Break: return writeBreak(<Label>args[0]);
                    case OpCode.BrTrue: return writeBrTrue(<Label>args[0], <Expression>args[1]);
                    case OpCode.BrFalse: return writeBrFalse(<Label>args[0], <Expression>args[1]);
                    case OpCode.Yield: return writeYield(<Expression>args[0]);
                    case OpCode.Return: return writeReturn(<Expression>args[0]);
                    case OpCode.Throw: return writeThrow(<Expression>args[0]);
                    case OpCode.Endfinally: return writeEndfinally();
                }
            }

            function writeStatement(node: Node): void {
                if (!isStatement(node) && node.kind !== SyntaxKind.GeneratedNode && node.kind !== SyntaxKind.Block) {
                    node = factory.createExpressionStatement(node);
                }

                if (!node.parent) {
                    node.parent = clauses[clauses.length - 1];
                }

                statements.push(<Statement>node);
            }

            function writeAssign(left: Expression, right: Expression): void {
                var assignExpression = factory.createBinaryExpression(SyntaxKind.EqualsToken, left, right);
                writeStatement(assignExpression);
            }

            function writeBreak(label: Label): void {
                instructionWasAbrupt = true;
                var instruction = factory.createStringLiteral('"break"');
                var returnExpression = factory.createArrayLiteral([instruction, createLabel(label)]);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                writeStatement(returnStatement);
            }

            function writeBrTrue(label: Label, condition: Expression): void {
                var instruction = factory.createStringLiteral('"break"');
                var returnExpression = factory.createArrayLiteral([instruction, createLabel(label)]);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                var ifStatement = factory.createIfStatement(condition, returnStatement);
                writeStatement(ifStatement);
            }

            function writeBrFalse(label: Label, condition: Expression): void {
                var instruction = factory.createStringLiteral('"break"');
                var returnExpression = factory.createArrayLiteral([instruction, createLabel(label)]);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                var parenExpression = factory.createParenExpression(condition);
                var notExpression = factory.createPrefixOperator(SyntaxKind.ExclamationToken, parenExpression);
                var ifStatement = factory.createIfStatement(notExpression, returnStatement);
                writeStatement(ifStatement);
            }

            function writeYield(expression: Expression): void {
                instructionWasAbrupt = true;
                var elements: Expression[] = [factory.createStringLiteral('"yield"')];
                if (expression) {
                    elements.push(expression);
                }
                var returnExpression = factory.createArrayLiteral(elements);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                writeStatement(returnStatement);
            }

            function writeReturn(expression?: Expression): void {
                instructionWasCompletion = true;
                var elements: Expression[] = [factory.createStringLiteral('"return"')];
                if (expression) {
                    elements.push(expression);
                }
                var returnExpression = factory.createArrayLiteral(elements);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                writeStatement(returnStatement);
            }

            function writeThrow(expression: Expression): void {
                instructionWasCompletion = true;
                var throwStatement = factory.createThrowStatement(expression, relatedLocation);
                writeStatement(throwStatement);
            }

            function writeEndfinally(): void {
                instructionWasAbrupt = true;
                var instruction = factory.createStringLiteral('"endfinally"');
                var returnExpression = factory.createArrayLiteral([instruction]);
                var returnStatement = factory.createReturnStatement(returnExpression);
                writeStatement(returnStatement);
            }
        }
    }
}
