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

    export function createLocalGenerator(resolver: EmitResolver): LocalGenerator {
        var localIds: Map<number>;
        var generatedLocals: GeneratedNode[];
        var relatedLocation: TextRange;
        var context: Node;

        return {
            setLocation,
            setContext,
            createUniqueIdentifier,
            declareLocal,
            buildLocals
        };

        function setLocation(location: TextRange): void {
            relatedLocation = location;
        }
        
        function setContext(node: Node): void {
            context = node;
        }

        function createUniqueIdentifier(name: string = ""): GeneratedNode {
            if (!name || !resolver.isUnknownIdentifier(context, name)) {
                if (!localIds) localIds = {};
                var nextLocalId = localIds[name] || 0;
                do {
                    var tempName = name + "_" + (nextLocalId < 26 ? String.fromCharCode(nextLocalId + 0x61) : nextLocalId - 26);
                    nextLocalId++;
                }
                while (!resolver.isUnknownIdentifier(context, tempName));
                localIds[name] = nextLocalId;
                name = tempName;
            }

            return factory.createGeneratedNode(name, /*contents*/ undefined, relatedLocation);
        }

        function declareLocal(name?: string): GeneratedNode {
            if (!generatedLocals) generatedLocals = [];
            var localDeclarationName = createUniqueIdentifier(name);
            generatedLocals.push(localDeclarationName);
            return localDeclarationName;
        }

        function buildLocals(): GeneratedNode {
            if (generatedLocals) {
                return factory.createGeneratedNode(`var ${generatedLocals};`, { generatedLocals }, relatedLocation);
            }
        }
    }

    export function createCodeGenerator(locals: LocalGenerator, resolver: EmitResolver, functionLocation: Node, options?: { promiseConstructor: EntityName; }): CodeGenerator {
        // locations
        var bodyLocation: Node = functionLocation;
        var statementsLocation: TextRange = functionLocation;
        var relatedLocation: TextRange = functionLocation;
        var locationStack: TextRange[];
        var context: Node = functionLocation;
        var contextStack: Node[];

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

        var resolve: GeneratedNode;
        var state: GeneratedNode;

        if (isAnyFunction(functionLocation)) {
            bodyLocation = (<FunctionLikeDeclaration>functionLocation).body;
            statementsLocation = bodyLocation;
            if (bodyLocation.kind === SyntaxKind.FunctionBlock) {
                statementsLocation = (<Block>bodyLocation).statements;
            }
        }

        if (options) {
            pushContext(bodyLocation);
            pushLocation(bodyLocation);
            resolve = createUniqueIdentifier("_resolve");
            popLocation();
            popContext();
        }

        return {
            pushContext,
            popContext,
            setContext,
            pushLocation,
            popLocation,
            setLocation,
            addParameter,
            addVariable,
            addFunction,
            declareLocal,
            defineLabel,
            markLabel,
            beginVariableStatement,
            endVariableStatement,
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
            createGeneratedNode,
            createResume,
            buildFunction
        };

        function addParameter(name: Identifier, flags?: NodeFlags): void {
            if (!parameters) parameters = [];
            parameters.push(factory.createParameterDeclaration(name, undefined, relatedLocation, flags));
        }

        function beginVariableStatement(): void {
            variableDeclarations = [];
            pushLocation(relatedLocation);
        }

        function endVariableStatement(): void {
            popLocation();
            variableStatements.push(factory.createVariableStatement(variableDeclarations, relatedLocation));
        }

        function addVariable(name: Identifier, flags?: NodeFlags): void {
            Debug.assert(!!variableDeclarations, "No variable statement was marked.");
            variableDeclarations.push(factory.createVariableDeclaration(name, /*initializer*/ undefined, relatedLocation));
        }

        function addFunction(func: FunctionDeclaration): void {
            if (!functions) functions = [];
            functions.push(func);
        }

        function declareLocal(name: string = ""): GeneratedNode {
            return locals.declareLocal(name);
        }

        function createUniqueIdentifier(name: string = ""): GeneratedNode {
            return locals.createUniqueIdentifier(name);
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
            emit(OpCode.Statement, `\${variable} = \${state}.error;`, { variable, state });
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
            if (typeof args[0] === "string") {
                args = [createGeneratedNode(args[0], args[1])];
            } else if (typeof args[1] === "string") {
                args = [args[0], createGeneratedNode(args[1], args[2])];
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
            operationLocations[operationIndex] = relatedLocation;
        }

        function pushLocation(location: TextRange): void {
            if (!locationStack) locationStack = [];
            locationStack.push(relatedLocation);
            setLocation(location);
        }

        function popLocation(): void {
            if (!locationStack) return;
            setLocation(locationStack.pop());
        }

        function setLocation(location: TextRange): void {
            if (location) {
                relatedLocation = location;
                locals.setLocation(location);
            }
        }

        function pushContext(context: Node): void {
            if (!contextStack) contextStack = [];
            contextStack.push(context);
            setContext(context);
        }

        function popContext(): void {
            if (!contextStack) return;
            setContext(contextStack.pop());
        }

        function setContext(node: Node): void {
            if (node) {
                context = node;
                locals.setContext(node);
            }
        }

        function cacheExpression(node: Expression): GeneratedNode {
            var local = declareLocal();
            emit(OpCode.Statement, createGeneratedNode(`\${local} = \${node};`, { local, node }));
            return local;
        }

        function createLabel(label: Label): GeneratedLabel {
            if (!labelNumbers) labelNumbers = [];
            return factory.createGeneratedLabel(label, labelNumbers, relatedLocation);
        }

        function createGeneratedNode(text: string, content?: Map<Node|Node[]>, leadingComments?: CommentRange[], trailingComment?: CommentRange[]): GeneratedNode {
            return factory.createGeneratedNode(text, content, relatedLocation);
        }

        function createInlineBreak(label: Label): GeneratedNode {
            return createGeneratedNode(`return ["break", \${label}];`, { label: createLabel(label) });
        }

        function createInlineReturn(expression: Expression): GeneratedNode {
            if (expression) {
                return createGeneratedNode(`return ["return", \${expression}];`, { expression });
            } else {
                return createGeneratedNode(`return ["return"];`);
            }
        }

        function createYield(expression: Expression): Statement {
            if (expression) {
                return createGeneratedNode(`return ["yield", \${expression}];`, { expression });
            } else {
                return createGeneratedNode(`return ["yield"];`);
            }
        }

        function createResume(): GeneratedNode {
            var state = getState();
            return createGeneratedNode(`\${state}.sent`, { state });
        }

        function getState(): GeneratedNode {
            if (!state) state = createUniqueIdentifier("_state");
            return state;
        }

        function buildFunction(kind: SyntaxKind, name: DeclarationName) {
            var statements: Statement[] = factory.createNodeArray<Statement>([], statementsLocation);
            pushContext(bodyLocation);
            pushLocation(statementsLocation);
            var generatedLocals = locals.buildLocals();
            if (generatedLocals) {
                statements.push(generatedLocals);
            }

            popContext();
            popLocation();

            if (variableStatements) {
                statements = statements.concat(variableStatements);
            }

            if (functions) {
                statements = statements.concat(functions);
            }


            pushLocation(statementsLocation);
            var state = getState();
            var cases = buildFunctionBody();
            popLocation();

            pushLocation(statementsLocation);
            if (options) {
                pushContext(bodyLocation);
                var resolve = createUniqueIdentifier("_resolve");
                popContext();

                var promiseConstructor = options.promiseConstructor;
                statements.push(createGeneratedNode(`
                    return new \${promiseConstructor}(function (\${resolve}) {
                        \${resolve}(__awaiter(__generator(function (\${state}) {
                            switch (\${state}.label) {
                                @{cases}
                            }
                        })));
                    });`, { promiseConstructor, cases, resolve, state }));
            } else {
                statements.push(createGeneratedNode(`
                    return __generator(function (\${state}) {
                        switch (\${state}.label) {
                            @{cases}
                        }
                    });`, { cases, state }));
            }

            popLocation();

            var body = factory.createFunctionBlock(statements, bodyLocation);
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

            if (hasProtectedRegions) {
                newCase();
                pushLocation(statementsLocation);
                writeStatement(createGeneratedNode(`\${state}.trys = [];`, { state }));
                popLocation();
            }

            if (operations) {
                for (var operationIndex = 0; operationIndex < operations.length; operationIndex++) {
                    var code = operations[operationIndex];
                    var args = operationArguments[operationIndex];
                    ensureLabels();

                    pushContext(bodyLocation);
                    pushLocation(operationLocations[operationIndex]);
                    writeOperation(code, args);
                    popLocation();
                    popContext();
                }
            }

            ensureLabels();

            if (!instructionWasCompletion) {
                pushLocation(statementsLocation);
                writeReturn();
                popLocation();
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
                pushContext(bodyLocation);
                pushLocation(statementsLocation);

                var labelNumber = clauses.length;
                var labelExpression = createGeneratedNode(String(labelNumber));

                // handle implicit fall-through
                if (!instructionWasAbrupt && !instructionWasCompletion && labelNumber > 0) {
                    var labelExpression = createGeneratedNode(String(labelNumber));
                    writeStatement(createGeneratedNode(`\${state}.label = \${labelExpression};`, { state, labelExpression }));
                }

                statements = [];
                instructionWasAbrupt = false;
                instructionWasCompletion = false;

                clauses.push(createGeneratedNode(`
                    case \${labelExpression}:
                        @{statements}`, { labelExpression, statements }));

                popLocation();
                popContext();
            }

            function writeOperation(code: OpCode, args: any[]): void {
                if (blocks) {
                    for (; blockIndex < blockActions.length && blockOffsets[blockIndex] <= operationIndex; blockIndex++) {
                        var block = blocks[blockIndex];
                        if (blockActions[blockIndex] === BlockAction.Open && block.kind === BlockKind.Exception) {
                            var exception = <ExceptionBlock>block;
                            var startLabel = createLabel(exception.startLabel);
                            var endLabel = createLabel(exception.endLabel);
                            if (exception.catchLabel > 0) {
                                var catchLabel = createLabel(exception.catchLabel);
                            }

                            if (exception.finallyLabel > 0) {
                                var finallyLabel = createLabel(exception.finallyLabel);
                            }

                            writeStatement(createGeneratedNode(`\${state}.trys.push([\${startLabel},\${catchLabel},\${finallyLabel},\${endLabel}])`, {
                                state,
                                startLabel,
                                catchLabel,
                                finallyLabel,
                                endLabel
                            }));
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
                    node = factory.createExpressionStatement(node, relatedLocation);
                }

                if (!node.parent) {
                    node.parent = clauses[clauses.length - 1];
                }

                statements.push(<Statement>node);
            }

            function writeAssign(left: Expression, right: Expression): void {
                writeStatement(createGeneratedNode(`\${left} = \${right}`, { left, right }));
            }

            function writeBreak(label: Label): void {
                instructionWasAbrupt = true;
                writeStatement(createInlineBreak(label));
            }

            function writeBrTrue(label: Label, condition: Expression): void {
                var statement = createInlineBreak(label);
                writeStatement(createGeneratedNode(`if (\${condition}) { \${statement} }`, { condition, statement }));
            }

            function writeBrFalse(label: Label, condition: Expression): void {
                var statement = createInlineBreak(label);
                writeStatement(createGeneratedNode(`if (!(\${condition})) { \${statement} }`, { condition, statement }));
            }

            function writeYield(expression: Expression): void {
                instructionWasAbrupt = true;
                writeStatement(createYield(expression));
            }

            function writeReturn(expression?: Expression): void {
                instructionWasCompletion = true;
                writeStatement(createInlineReturn(expression));
            }

            function writeThrow(expression: Expression): void {
                instructionWasCompletion = true;
                writeStatement(createGeneratedNode(`throw \${expression};`, { expression }));
            }

            function writeEndfinally(): void {
                instructionWasAbrupt = true;
                writeStatement(createGeneratedNode(`return ["endfinally"];`));
            }
        }
    }
}
