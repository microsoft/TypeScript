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

    export function createLocalsBuilder(resolver: EmitResolver, context: Node, globals: Map<boolean>): LocalsBuilder {
        var locals: Identifier[];
        var tempCount = 0;

        return {
            createUniqueIdentifier,
            recordVariable,
            getVariables
        };

        function hasGlobalIdentifier(name: string): boolean {
            if (globals && hasProperty(globals, name)) {
                return true;
            }
        }

        function isUnknownIdentifier(name: string): boolean {
            return !hasGlobalIdentifier(name) && resolver.isUnknownIdentifier(context, name);
        }
        
        function createUniqueIdentifier(name?: string, globallyUnique?: boolean): Identifier {
            // when we generate a "global" unique identifier, we it to be unique in all contexts. This is 
            // to reduce the possibility of collisions when generating names used to rename symbols during emit
            // for downlevel rewrite of a catch block, and for future support for downlevel let/const.
            // We do this here rather than introduce new symbols into symbol table of the containing scope so that we don't 
            // make changes that would be compatible with incremental parse
            while (true) {
                if (name && resolver.isUnknownIdentifier(context, name)) {
                    break;
                }
                // _a .. _h, _j ... _z, _0, _1, ...
                name = "_" + (tempCount < 25 ? String.fromCharCode(tempCount + (tempCount < 8 ? 0 : 1) + CharacterCodes.a) : tempCount - 25);
                tempCount++;
            }
            
            if (globallyUnique) {
                globals[name] = true;
            }

            return factory.createIdentifier(name);
        }

        function recordVariable(name: Identifier): void {
            if (!locals) {
                locals = [];
            }

            locals.push(name);
        }

        function getVariables(): Identifier[] {
            return locals;
        }
    }

    export function createStatementsGenerator(locals: LocalsBuilder): StatementsGenerator {
        return <StatementsGenerator>createCodeGenerator(locals, /*isStatementsGenerator*/ true);
    }

    export function createFunctionGenerator(locals: LocalsBuilder): FunctionGenerator {
        return <FunctionGenerator>createCodeGenerator(locals, /*isStatementsGenerator*/ false);
    }

    export function createAsyncFunctionGenerator(locals: LocalsBuilder, promiseConstructor: EntityName): FunctionGenerator {
        return <FunctionGenerator>createCodeGenerator(locals, /*isStatementsGenerator*/ false, promiseConstructor);
    }

    function createCodeGenerator(locals: LocalsBuilder, isStatementsGenerator: boolean, promiseConstructor?: EntityName): CodeGenerator {
        // locations
        var pendingLocation: TextRange;

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

        var state: Identifier;

        function createStatementsGenerator(): StatementsGenerator {
            return {
                writeLocation,
                declareLocal,
                defineLabel,
                markLabel,
                emit,
                createUniqueIdentifier,
                buildStatements
            };
        }

        function createFunctionGenerator(): FunctionGenerator {
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
                createUniqueIdentifier,
                createInlineBreak,
                createInlineReturn,
                createResume,
                buildFunction
            };
        }

        return isStatementsGenerator ? createStatementsGenerator() : createFunctionGenerator();

        function declareLocal(name?: string, globallyUnique?: boolean): Identifier {
            var local = locals.createUniqueIdentifier(name, globallyUnique);
            locals.recordVariable(local);
            return local;
        }

        function createUniqueIdentifier(name?: string, globallyUnique?: boolean): Identifier {
            return locals.createUniqueIdentifier(name, globallyUnique);
        }

        function writeLocation(location: TextRange): void {
            pendingLocation = location;
        }

        function readLocation(): TextRange {
            var location = pendingLocation;
            pendingLocation = undefined;
            return location;
        }

        function addParameter(name: Identifier, flags?: NodeFlags): void {
            if (!parameters) parameters = [];
            parameters.push(factory.createParameterDeclaration(name, undefined, readLocation(), flags));
        }

        function addVariable(name: Identifier, flags?: NodeFlags): void {            
            if (!variableDeclarations) {
                variableDeclarations = factory.createNodeArray([]);
            }

            variableDeclarations.push(factory.createVariableDeclaration(factory.createIdentifier(name.text)));
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
            var errorProperty = factory.createPropertyAccessExpression(state, factory.createIdentifier("error"));
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

        function reportUnexpectedOpCode(code: OpCode): void {
            var text: string;
            if (typeof (<any>ts).OpCode === "object") {
                text = (<any>ts).OpCode[code];
            }
            else {
                text = String(code);
            }

            Debug.fail("Unexpected OpCode: " + text);
        }

        function emit(code: OpCode, ...args: any[]): void {
            switch (code) {
                case OpCode.Assign:
                case OpCode.Statement:
                case OpCode.Return:
                case OpCode.Throw:
                    break;

                case OpCode.Break:
                case OpCode.BrFalse:
                case OpCode.BrTrue:
                case OpCode.Endfinally:
                case OpCode.Yield:
                case OpCode.YieldStar:
                    if (!isStatementsGenerator) {
                        break;
                    }

                default:
                    reportUnexpectedOpCode(code);
                    return;
            }

            var location = readLocation();
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

        function createLabel(label: Label): GeneratedLabel {
            if (!labelNumbers) labelNumbers = [];
            return factory.createGeneratedLabel(label, labelNumbers);
        }

        function createInlineBreak(label: Label): ReturnStatement {
            var instruction = factory.createStringLiteral('"break"');
            var returnExpression = factory.createArrayLiteralExpression([instruction, createLabel(label)]);
            return factory.createReturnStatement(returnExpression, readLocation());
        }

        function createInlineReturn(expression: Expression): ReturnStatement {
            var instruction = factory.createStringLiteral('"return"');
            if (expression) {
                var returnExpression = factory.createArrayLiteralExpression([instruction, expression]);
            } else {
                var returnExpression = factory.createArrayLiteralExpression([instruction]);
            }
            return factory.createReturnStatement(returnExpression, readLocation());
        }

        function createResume(): LeftHandSideExpression {
            var state = getState();
            return factory.createPropertyAccessExpression(state, factory.createIdentifier("sent"));
        }

        function getState(): Identifier {
            if (!state) state = createUniqueIdentifier("_state");
            return state;
        }

        function buildFunction(kind: SyntaxKind, name: DeclarationName, location?: TextRange, flags?: NodeFlags, modifiers?: ModifiersArray) {
            var statements: Statement[] = [];
            if (variableDeclarations) {
                var variableDeclarationList = factory.createVariableDeclarationList(variableDeclarations);
                statements.push(factory.createVariableStatement(variableDeclarationList));
            }

            if (functions) {
                statements = statements.concat(functions);
            }

            var state = getState();
            var generatorStatements = buildStatements();
            var generatorFunctionBody = factory.createBlock(generatorStatements);
            var generatorFunction = factory.createFunctionExpression(/*name*/ undefined, generatorFunctionBody, [factory.createParameterDeclaration(state)]);
            var generatorExpression = factory.createCallExpression(factory.createIdentifier("__generator"), [generatorFunction]);

            if (promiseConstructor) {
                var resolve = createUniqueIdentifier("_resolve");
                var promiseConstructorExpression = factory.getExpressionForEntityName(promiseConstructor);
                var awaiterExpression = factory.createCallExpression(factory.createIdentifier("__awaiter"), [generatorExpression]);
                var resolveExpression = factory.createCallExpression(resolve, [awaiterExpression]);
                var promiseFunctionBody = factory.createBlock([factory.createExpressionStatement(resolveExpression)]);
                var promiseFunction = factory.createFunctionExpression(/*name*/ undefined, promiseFunctionBody, [factory.createParameterDeclaration(resolve)]);
                var newPromiseExpression = factory.createNewExpression(promiseConstructorExpression, [promiseFunction]);
                var returnStatement = factory.createReturnStatement(newPromiseExpression);
                statements.push(returnStatement);
            } else {
                var returnStatement = factory.createReturnStatement(generatorExpression);
                statements.push(returnStatement);
            }

            var body = factory.createBlock(factory.createNodeArray<Statement>(statements));
            var node: FunctionLikeDeclaration;
            switch (kind) {
                case SyntaxKind.FunctionDeclaration:
                    return factory.createFunctionDeclaration(<Identifier>name, body, parameters, location, flags, modifiers);
                case SyntaxKind.MethodDeclaration:
                    return factory.createMethodDeclaration(name, body, parameters, location, flags, modifiers);
                case SyntaxKind.GetAccessor:
                    return factory.createGetAccessor(name, body, parameters, location, flags, modifiers);
                case SyntaxKind.FunctionExpression:
                    return factory.createFunctionExpression(<Identifier>name, body, parameters, location, flags, modifiers);
                case SyntaxKind.ArrowFunction:
                    return factory.createArrowFunction(body, parameters, location, flags, modifiers);
                default:
                    Debug.fail("Unexpected node: " + node.kind);
                    return node;
            }
        }

        function buildStatements(): Statement[] {
            var exceptionStack: ExceptionBlock[] = [];
            var clauses: CaseClause[];
            var rootStatements: Statement[] = [];
            var statements = rootStatements;
            var statementsStack: NodeArray<Statement>[] = [];
            var blockIndex: number = 0;
            var instructionWasAbrupt = false;
            var instructionWasCompletion = false;
            var relatedLocation: TextRange;

            if (hasProtectedRegions) {
                startNewCase();

                var trysProperty = factory.createPropertyAccessExpression(getState(), factory.createIdentifier("trys"));
                var trysArray = factory.createArrayLiteralExpression([]);
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
                relatedLocation = undefined;
                writeReturn();
            }

            writePendingCase();
            return rootStatements;

            function ensureSwitchStatement(): void {
                if (rootStatements === statements) {
                    clauses = [];
                    var state = getState();
                    var labelExpression = factory.createPropertyAccessExpression(state, factory.createIdentifier("label"));
                    var switchStatement = factory.createSwitchStatement(labelExpression, clauses);
                    rootStatements = [switchStatement];
                    if (statements.length) {
                        writePendingCase();
                        resetStatements();
                    }
                }
            }

            function ensureLabels(): void {
                if (!labelNumbers) labelNumbers = [];

                var createCase = false;
                for (var label = 0; label < labels.length; label++) {
                    if (labels[label] === operationIndex) {
                        ensureSwitchStatement();
                        labelNumbers[label] = clauses.length;
                        createCase = true;
                    }
                }

                if (createCase) {
                    startNewCase();
                }
            }

            function writeFallThrough(): void {
                if (!statements.length) {
                    return;
                }

                var labelNumber = clauses.length + 1;
                var labelExpression = factory.createNumericLiteral(labelNumber);

                // handle implicit fall-through
                if (!instructionWasAbrupt && !instructionWasCompletion && labelNumber > 0) {
                    var labelProperty = factory.createPropertyAccessExpression(getState(), factory.createIdentifier("label"));
                    var labelAssign = factory.createBinaryExpression(SyntaxKind.EqualsToken, labelProperty, labelExpression);
                    writeStatement(labelAssign);
                }
            }

            function writePendingCase(): void {
                if (!statements.length || rootStatements === statements) {
                    return;
                }

                var labelNumber = clauses.length;
                var labelExpression = factory.createNumericLiteral(labelNumber);
                var caseClause = factory.createCaseClause(labelExpression, statements);
                clauses.push(caseClause);
            }

            function resetStatements(): void {
                statements = [];
                instructionWasAbrupt = false;
                instructionWasCompletion = false;
            }

            function startNewCase() {
                ensureSwitchStatement();
                writeFallThrough();
                writePendingCase();
                resetStatements();
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
                            
                            var labelsArray = factory.createArrayLiteralExpression([startLabel, catchLabel, finallyLabel, endLabel]);
                            var trysProperty = factory.createPropertyAccessExpression(getState(), factory.createIdentifier("trys"));
                            var pushMethod = factory.createPropertyAccessExpression(trysProperty, factory.createIdentifier("push"));
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
                
                if (isExpression(node)) {
                    node = factory.createExpressionStatement(<Expression>node);
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
                var returnExpression = factory.createArrayLiteralExpression([instruction, createLabel(label)]);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                writeStatement(returnStatement);
            }

            function writeBrTrue(label: Label, condition: Expression): void {
                var instruction = factory.createStringLiteral('"break"');
                var returnExpression = factory.createArrayLiteralExpression([instruction, createLabel(label)]);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                var ifStatement = factory.createIfStatement(condition, returnStatement);
                writeStatement(ifStatement);
            }

            function writeBrFalse(label: Label, condition: Expression): void {
                var instruction = factory.createStringLiteral('"break"');
                var returnExpression = factory.createArrayLiteralExpression([instruction, createLabel(label)]);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                var parenExpression = factory.createParenthesizedExpression(condition);
                var notExpression = factory.createPrefixUnaryExpression(SyntaxKind.ExclamationToken, parenExpression);
                var ifStatement = factory.createIfStatement(notExpression, returnStatement);
                writeStatement(ifStatement);
            }

            function writeYield(expression: Expression): void {
                instructionWasAbrupt = true;
                var elements: Expression[] = [factory.createStringLiteral('"yield"')];
                if (expression) {
                    elements.push(expression);
                }
                var returnExpression = factory.createArrayLiteralExpression(elements);
                var returnStatement = factory.createReturnStatement(returnExpression, relatedLocation);
                writeStatement(returnStatement);
            }

            function writeReturn(expression?: Expression): void {
                instructionWasCompletion = true;
                var elements: Expression[] = [factory.createStringLiteral('"return"')];
                if (expression) {
                    elements.push(expression);
                }
                var returnExpression = factory.createArrayLiteralExpression(elements);
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
                var returnExpression = factory.createArrayLiteralExpression([instruction]);
                var returnStatement = factory.createReturnStatement(returnExpression);
                writeStatement(returnStatement);
            }
        }
    }
}
