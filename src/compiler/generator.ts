/// <reference path="types.ts"/>
/// <reference path="factory.ts"/>
module ts {
    export module Locals {
        export function create(resolver: EmitResolver, context: Node, globals: Map<boolean>): Locals {
            return { resolver, context, globals, tempCount: 0 };
        }

        export function copy(source: Locals, target: Locals): Locals {
            if (!source || target === source) {
                return target;
            }
            target.context = source.context;
            target.globals = source.globals;
            target.resolver = source.resolver;
            target.tempCount = source.tempCount;
            target.variables = source.variables;
            return target;
        }

        export function createUniqueIdentifier(locals: Locals, name?: string, globallyUnique?: boolean): Identifier {
            // when we generate a "global" unique identifier, we it to be unique in all contexts. This is 
            // to reduce the possibility of collisions when generating names used to rename symbols during emit
            // for downlevel rewrite of a catch block, and for future support for downlevel let/const.
            // We do this here rather than introduce new symbols into symbol table of the containing scope so that we don't 
            // make changes that would be compatible with incremental parse
            while (true) {
                if (name && locals.resolver.isUnknownIdentifier(locals.context, name)) {
                    break;
                }
                // _a .. _h, _j ... _z, _0, _1, ...
                name = "_" + (locals.tempCount < 25 ? String.fromCharCode(locals.tempCount + (locals.tempCount < 8 ? 0 : 1) + CharacterCodes.a) : locals.tempCount - 25);
                locals.tempCount++;
            }

            if (globallyUnique) {
                locals.globals[name] = true;
            }

            return Factory.createIdentifier(name);
        }

        export function recordVariable(locals: Locals, name: Identifier): void {
            if (!locals.variables) {
                locals.variables = [];
            }

            locals.variables.push(name);
        }

        export function ensureIdentifier(locals: Locals, expression: Expression, writeAssignment: (left: Identifier, right: Expression, state: any) => void, state?: any): Identifier {
            if (expression.kind !== SyntaxKind.Identifier) {
                var local = createUniqueIdentifier(locals);
                writeAssignment(local, expression, state);
                return local;
            }
            return <Identifier>expression;
        }

        export function getValueOrDefault(locals: Locals, value: Expression, defaultValue: Expression, writeAssignment: (left: Identifier, right: Expression, state: any) => void, state?: any): Expression {
            value = ensureIdentifier(locals, value, writeAssignment, state);
            var equalityExpression = Factory.createBinaryExpression(SyntaxKind.EqualsEqualsEqualsToken, value, Factory.createVoidZero());
            var conditionalExpression = Factory.createConditionalExpression(equalityExpression, defaultValue, value);
            return conditionalExpression;
        }
    }

    export module GeneratorFunctionBuilder {
        interface StatementBuilder {
            builder: GeneratorFunctionBuilder;
            operationIndex: number;
            blockIndex: number;
            labelNumber: number;
            lastOperationWasAbrupt?: boolean;
            lastOperationWasCompletion?: boolean;
            clauses?: CaseClause[];
            statements?: Statement[];
            exceptionBlockStack?: ExceptionBlock[];
            currentExceptionBlock?: ExceptionBlock;
            withBlockStack?: WithBlock[];
        }

        export function create(locals: Locals): GeneratorFunctionBuilder {
            return {
                locals,
                flags: 0,
                nextLabelId: 1
            };
        }

        export function declareLocal(builder: GeneratorFunctionBuilder, name?: string, globallyUnique?: boolean): Identifier {
            var local = Locals.createUniqueIdentifier(builder.locals, name, globallyUnique);
            Locals.recordVariable(builder.locals, local);
            return local;
        }

        export function writeLocation(builder: GeneratorFunctionBuilder, location: TextRange): void {
            builder.pendingLocation = location;
        }

        function readLocation(builder: GeneratorFunctionBuilder): TextRange {
            var location = builder.pendingLocation;
            builder.pendingLocation = undefined;
            return location;
        }

        export function addParameter(builder: GeneratorFunctionBuilder, name: Identifier, flags?: NodeFlags): void {
            if (!builder.parameters) {
                builder.parameters = [];
            }

            builder.parameters.push(Factory.createParameterDeclaration(
                name, 
                /*initializer*/ undefined,
                /*type*/ undefined, 
                /*modifiers*/ undefined, 
                /*dotDotDotToken*/ undefined,
                /*questionToken*/ undefined,
                readLocation(builder),
                flags));
        }

        export function addVariable(builder: GeneratorFunctionBuilder, name: Identifier, flags?: NodeFlags): void {
            Locals.recordVariable(builder.locals, name);
        }

        export function addFunction(builder: GeneratorFunctionBuilder, func: FunctionDeclaration): void {
            if (!builder.functions) {
                builder.functions = [];
            }
            builder.functions.push(func);
        }

        export function defineLabel(builder: GeneratorFunctionBuilder): Label {
            if (!builder.labels) {
                builder.labels = [];
            }
            var label = builder.nextLabelId++;
            builder.labels[label] = -1;
            return <Label>label;
        }

        export function markLabel(builder: GeneratorFunctionBuilder, label: Label): void {
            Debug.assert(!!builder.labels, "No labels were defined.");
            builder.labels[<number>label] = builder.operations ? builder.operations.length : 0;
        }

        export function beginWithBlock(builder: GeneratorFunctionBuilder, expression: Identifier): void {
            var startLabel = defineLabel(builder);
            var endLabel = defineLabel(builder);
            markLabel(builder, startLabel);
            beginBlock<WithBlock>(builder, {
                kind: BlockKind.With,
                expression,
                startLabel,
                endLabel
            });
        }

        export function endWithBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.With);
            var withBlock = endBlock<WithBlock>(builder);
            markLabel(builder, withBlock.endLabel);
        }

        export function beginExceptionBlock(builder: GeneratorFunctionBuilder): Label {
            var startLabel = defineLabel(builder);
            var endLabel = defineLabel(builder);
            markLabel(builder, startLabel);
            beginBlock<ExceptionBlock>(builder, {
                kind: BlockKind.Exception,
                state: ExceptionBlockState.Try,
                startLabel,
                endLabel
            });
            builder.flags |= FunctionBuilderFlags.HasProtectedRegions;
            return endLabel;
        }

        export function beginCatchBlock(builder: GeneratorFunctionBuilder, variable: Identifier): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.Exception);

            var exception = <ExceptionBlock>peekBlock(builder);
            Debug.assert(exception.state < ExceptionBlockState.Catch);

            var endLabel = exception.endLabel;
            emit(builder, OpCode.Break, endLabel);

            var catchLabel = defineLabel(builder);
            markLabel(builder, catchLabel);
            exception.state = ExceptionBlockState.Catch;
            exception.catchVariable = variable;
            exception.catchLabel = catchLabel;

            var state = getState(builder);
            var errorProperty = Factory.createPropertyAccessExpression(state, Factory.createIdentifier("error"));
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, variable, errorProperty);
            emit(builder, OpCode.Statement, assignExpression);
        }

        export function beginFinallyBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.Exception);

            var exception = <ExceptionBlock>peekBlock(builder);
            Debug.assert(exception.state < ExceptionBlockState.Finally);

            var state = exception.state;
            var endLabel = exception.endLabel;
            emit(builder, OpCode.Break, endLabel);

            var finallyLabel = defineLabel(builder);
            markLabel(builder, finallyLabel);
            exception.state = ExceptionBlockState.Finally;
            exception.finallyLabel = finallyLabel;
        }

        export function endExceptionBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.Exception);
            var exception = endBlock<ExceptionBlock>(builder);
            var state = exception.state;
            if (state < ExceptionBlockState.Finally) {
                emit(builder, OpCode.Break, exception.endLabel);
            }
            else {
                emit(builder, OpCode.Endfinally);
            }

            markLabel(builder, exception.endLabel);
            exception.state = ExceptionBlockState.Done;
        }

        export function beginScriptContinueBlock(builder: GeneratorFunctionBuilder, labelText: string[]): void {
            beginBlock<ContinueBlock>(builder, {
                kind: BlockKind.ScriptContinue,
                labelText: labelText,
                breakLabel: -1,
                continueLabel: -1
            });
        }

        export function endScriptContinueBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.ScriptContinue);
            endBlock<ContinueBlock>(builder);
        }

        export function beginScriptBreakBlock(builder: GeneratorFunctionBuilder, labelText: string[], requireLabel: boolean): void {
            beginBlock<BreakBlock>(builder, {
                kind: BlockKind.ScriptBreak,
                labelText: labelText,
                breakLabel: -1,
                requireLabel
            });
        }

        export function endScriptBreakBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.ScriptBreak);
            endBlock<BreakBlock>(builder);
        }

        export function beginContinueBlock(builder: GeneratorFunctionBuilder, continueLabel: Label, labelText: string[]): Label {
            var breakLabel = defineLabel(builder);
            beginBlock<ContinueBlock>(builder, {
                kind: BlockKind.Continue,
                labelText: labelText,
                breakLabel: breakLabel,
                continueLabel: continueLabel
            });
            return breakLabel;
        }

        export function endContinueBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.Continue);
            var block = endBlock<BreakBlock>(builder);
            var breakLabel = block.breakLabel;
            if (breakLabel > 0) {
                markLabel(builder, breakLabel);
            }
        }

        export function beginBreakBlock(builder: GeneratorFunctionBuilder, labelText: string[], requireLabel: boolean): Label {
            var breakLabel = defineLabel(builder);
            beginBlock<BreakBlock>(builder, {
                kind: BlockKind.Break,
                labelText: labelText,
                breakLabel: breakLabel,
                requireLabel
            });
            return breakLabel;
        }

        export function endBreakBlock(builder: GeneratorFunctionBuilder): void {
            Debug.assert(peekBlockKind(builder) === BlockKind.Break);
            var block = endBlock<BreakBlock>(builder);
            var breakLabel = block.breakLabel;
            if (breakLabel > 0) {
                markLabel(builder, breakLabel);
            }
        }

        function beginBlock<TBlock extends BlockScope>(builder: GeneratorFunctionBuilder, block: TBlock): number {
            if (!builder.blocks) {
                builder.blocks = [];
                builder.blockActions = [];
                builder.blockOffsets = [];
                builder.blockStack = [];
            }

            var index = builder.blockActions.length;
            builder.blockActions[index] = BlockAction.Open;
            builder.blockOffsets[index] = builder.operations ? builder.operations.length : 0;
            builder.blocks[index] = block;
            builder.blockStack.push(block);
            return index;
        }

        function endBlock<TBlock extends BlockScope>(builder: GeneratorFunctionBuilder): TBlock {
            Debug.assert(!!builder.blocks, "beginBlock was never called.");
            var block = builder.blockStack.pop();
            var index = builder.blockActions.length;
            builder.blockActions[index] = BlockAction.Close;
            builder.blockOffsets[index] = builder.operations ? builder.operations.length : 0;
            builder.blocks[index] = block;
            return <TBlock>block;
        }

        function peekBlock(builder: GeneratorFunctionBuilder, back: number = 0): BlockScope {
            if (builder.blocks) {
                return builder.blockStack[builder.blockStack.length - (1 + back)];
            }
        }

        function peekBlockKind(builder: GeneratorFunctionBuilder, back: number = 0): BlockKind {
            var block = peekBlock(builder, back);
            return block && block.kind;
        }

        export function findBreakTarget(builder: GeneratorFunctionBuilder, labelText?: string): Label {
            if (builder.blocks) {
                for (var i = builder.blockStack.length - 1; i >= 0; i--) {
                    var block = builder.blockStack[i];
                    if (supportsBreak(builder, block)) {
                        var breakBlock = <BreakBlock>block;
                        if ((!labelText && !breakBlock.requireLabel) || breakBlock.labelText && breakBlock.labelText.indexOf(labelText) !== -1) {
                            return breakBlock.breakLabel;
                        }
                    }
                }
            }

            return 0;
        }

        export function findContinueTarget(builder: GeneratorFunctionBuilder, labelText?: string): Label {
            if (builder.blocks) {
                for (var i = builder.blockStack.length - 1; i >= 0; i--) {
                    var block = builder.blockStack[i];
                    if (supportsContinue(builder, block)) {
                        var continueBreakBlock = <ContinueBlock>block;
                        if (!labelText || continueBreakBlock.labelText && continueBreakBlock.labelText.indexOf(labelText) !== -1) {
                            return continueBreakBlock.continueLabel;
                        }
                    }
                }
            }
        }

        function supportsBreak(builder: GeneratorFunctionBuilder, block: BlockScope): boolean {
            switch (block.kind) {
                case BlockKind.ScriptBreak:
                case BlockKind.ScriptContinue:
                case BlockKind.Break:
                case BlockKind.Continue:
                    return true;
            }
            return false;
        }

        function supportsContinue(builder: GeneratorFunctionBuilder, block: BlockScope): boolean {
            switch (block.kind) {
                case BlockKind.ScriptContinue:
                case BlockKind.Continue:
                    return true;
            }
            return false;
        }

        export function emit(builder: GeneratorFunctionBuilder, code: OpCode): void;
        export function emit(builder: GeneratorFunctionBuilder, code: OpCode, label: Label): void;
        export function emit(builder: GeneratorFunctionBuilder, code: OpCode, label: Label, condition: Expression): void;
        export function emit(builder: GeneratorFunctionBuilder, code: OpCode, node: Statement): void;
        export function emit(builder: GeneratorFunctionBuilder, code: OpCode, node: Expression): void;
        export function emit(builder: GeneratorFunctionBuilder, code: OpCode, left: Expression, right: Expression): void;
        export function emit(builder: GeneratorFunctionBuilder, code: OpCode, ...args: any[]): void {
            switch (code) {
                case OpCode.Assign:
                case OpCode.Statement:
                case OpCode.Return:
                case OpCode.Throw:
                case OpCode.Break:
                case OpCode.BrFalse:
                case OpCode.BrTrue:
                case OpCode.Endfinally:
                case OpCode.Yield:
                case OpCode.YieldStar:
                    break;

                default:
                    reportUnexpectedOpCode(code);
                    return;
            }

            var location = readLocation(builder);
            if (code === OpCode.Statement) {
                var node = args[0];
                if (!node) {
                    return;
                }
            }

            if (!builder.operations) {
                builder.operations = [];
                builder.operationArguments = [];
                builder.operationLocations = [];
            }

            if (!builder.labels) {
                // mark entry point
                markLabel(builder, defineLabel(builder));
            }

            var operationIndex = builder.operations.length;
            builder.operations[operationIndex] = code;
            builder.operationArguments[operationIndex] = args;
            builder.operationLocations[operationIndex] = location;
        }

        function createLabel(builder: GeneratorFunctionBuilder, label: Label): GeneratedLabel {
            if (!builder.labelNumbers) {
                builder.labelNumbers = [];
            }
            return Factory.createGeneratedLabel(label, builder.labelNumbers);
        }

        export function createInlineBreak(builder: GeneratorFunctionBuilder, label: Label): ReturnStatement {
            var instruction = Factory.createNumericLiteral('3 /*break*/');
            var returnExpression = Factory.createArrayLiteralExpression([instruction, createLabel(builder, label)]);
            return Factory.createReturnStatement(returnExpression, readLocation(builder));
        }

        export function createInlineReturn(builder: GeneratorFunctionBuilder, expression: Expression): ReturnStatement {
            var instruction = Factory.createNumericLiteral('3 /*return*/');
            if (expression) {
                var returnExpression = Factory.createArrayLiteralExpression([instruction, expression]);
            } else {
                var returnExpression = Factory.createArrayLiteralExpression([instruction]);
            }
            return Factory.createReturnStatement(returnExpression, readLocation(builder));
        }

        export function createResume(builder: GeneratorFunctionBuilder): LeftHandSideExpression {
            var state = getState(builder);
            return Factory.createPropertyAccessExpression(state, Factory.createIdentifier("sent"));
        }

        function getState(builder: GeneratorFunctionBuilder): Identifier {
            if (!builder.state) {
                builder.state = Locals.createUniqueIdentifier(builder.locals, "_state");
            }
            return builder.state;
        }

        export function buildFunction(builder: GeneratorFunctionBuilder, kind: SyntaxKind, name: DeclarationName, location?: TextRange, flags?: NodeFlags, modifiers?: ModifiersArray): FunctionLikeDeclaration {
            var statements: Statement[] = [];
            statements = buildHoistedFunctionDeclarations(builder, statements);

            var generatorStatements = buildStatements(builder);
            var generatorFunctionBody = Factory.createBlock(generatorStatements);
            var generatorFunction = Factory.createFunctionExpression(/*name*/ undefined, [Factory.createParameterDeclaration(getState(builder))], generatorFunctionBody);
            var generatorExpression = Factory.createCallExpression(Factory.createIdentifier("__generator"), [generatorFunction]);
            var returnStatement = Factory.createReturnStatement(generatorExpression);
            statements.push(returnStatement);

            var body = Factory.createBlock(Factory.createNodeArray<Statement>(statements));

            var node: FunctionLikeDeclaration;
            switch (kind) {
                case SyntaxKind.FunctionDeclaration:
                    return Factory.createFunctionDeclaration(<Identifier>name, builder.parameters, body, undefined, undefined, modifiers, undefined, location, flags);
                case SyntaxKind.MethodDeclaration:
                    return Factory.createMethodDeclaration(name, builder.parameters, body, undefined, undefined, modifiers, undefined, location, flags);
                case SyntaxKind.GetAccessor:
                    return Factory.createGetAccessor(name, builder.parameters, body, undefined, undefined, modifiers, location, flags);
                case SyntaxKind.FunctionExpression:
                    return Factory.createFunctionExpression(<Identifier>name, builder.parameters, body, undefined, undefined, modifiers, undefined, location, flags);
                case SyntaxKind.ArrowFunction:
                    return Factory.createArrowFunction(builder.parameters, body, undefined, undefined, modifiers, location, flags);
                default:
                    reportUnexpectedNode(node);
                    return node;
            }
        }

        function buildHoistedFunctionDeclarations(builder: GeneratorFunctionBuilder, statements: Statement[]): Statement[] {
            if (builder.functions) {
                statements = statements.concat(builder.functions);
            }
            return statements;
        }

        function buildStatements(builder: GeneratorFunctionBuilder): Statement[] {
            var { operations, operationArguments, operationLocations } = builder;
            var statementBuilder: StatementBuilder = {
                builder,
                operationIndex: 0,
                blockIndex: 0,
                labelNumber: 0
            };

            if (builder.flags & FunctionBuilderFlags.HasProtectedRegions) {
                initializeProtectedRegions(statementBuilder);
            }

            if (operations) {
                for (statementBuilder.operationIndex = 0; statementBuilder.operationIndex < operations.length; statementBuilder.operationIndex++) {
                    writeOperation(
                        statementBuilder,
                        operations[statementBuilder.operationIndex],
                        operationArguments[statementBuilder.operationIndex],
                        operationLocations[statementBuilder.operationIndex]);
                }
            }

            flushFinalLabel(statementBuilder);

            if (statementBuilder.clauses) {
                var state = getState(builder);
                var labelExpression = Factory.createPropertyAccessExpression(state, Factory.createIdentifier("label"));
                var switchStatement = Factory.createSwitchStatement(labelExpression, statementBuilder.clauses);
                return [switchStatement];
            }

            if (statementBuilder.statements) {
                return statementBuilder.statements;
            }

            return [];
        }

        function initializeProtectedRegions(statementBuilder: StatementBuilder): void {
            var trysProperty = Factory.createPropertyAccessExpression(getState(statementBuilder.builder), Factory.createIdentifier("trys"));
            var trysArray = Factory.createArrayLiteralExpression([]);
            var assignTrys = Factory.createBinaryExpression(SyntaxKind.EqualsToken, trysProperty, trysArray);
            writeStatement(statementBuilder, assignTrys);
            flushLabel(statementBuilder);
        }

        function flushLabel(statementBuilder: StatementBuilder): void {
            if (!statementBuilder.statements) {
                return;
            }

            appendLabel(statementBuilder, /*markLabelEnd*/ !statementBuilder.lastOperationWasAbrupt);

            statementBuilder.lastOperationWasAbrupt = false;
            statementBuilder.lastOperationWasCompletion = false;
            statementBuilder.labelNumber++;
        }

        function flushFinalLabel(statementBuilder: StatementBuilder): void {
            if (!statementBuilder.lastOperationWasCompletion) {
                tryEnterLabel(statementBuilder);
                writeReturn(statementBuilder);
            }

            if (statementBuilder.statements && statementBuilder.clauses) {
                appendLabel(statementBuilder, /*markLabelEnd*/ false);
            }
        }

        function appendLabel(statementBuilder: StatementBuilder, markLabelEnd: boolean): void {
            var { builder, statements, withBlockStack, currentExceptionBlock, labelNumber } = statementBuilder;
            if (!statementBuilder.clauses) {
                statementBuilder.clauses = [];
            }

            if (statements) {
                if (withBlockStack) {
                    for (var i = withBlockStack.length - 1; i >= 0; i--) {
                        var withBlock = withBlockStack[i];
                        statements = [Factory.createWithStatement(withBlock.expression, Factory.createBlock(statements))];
                    }
                }
                if (currentExceptionBlock) {
                    var startLabel = createLabel(builder, currentExceptionBlock.startLabel);
                    var endLabel = createLabel(builder, currentExceptionBlock.endLabel);
                    var catchLabel: Expression;
                    if (currentExceptionBlock.catchLabel > 0) {
                        catchLabel = createLabel(builder, currentExceptionBlock.catchLabel);
                    }
                    else {
                        catchLabel = Factory.createOmittedExpression();
                    }

                    var finallyLabel: Expression;
                    if (currentExceptionBlock.finallyLabel > 0) {
                        finallyLabel = createLabel(builder, currentExceptionBlock.finallyLabel);
                    }
                    else {
                        finallyLabel = Factory.createOmittedExpression();
                    }

                    var labelsArray = Factory.createArrayLiteralExpression([startLabel, catchLabel, finallyLabel, endLabel]);
                    var trysProperty = Factory.createPropertyAccessExpression(getState(builder), Factory.createIdentifier("trys"));
                    var pushMethod = Factory.createPropertyAccessExpression(trysProperty, Factory.createIdentifier("push"));
                    var callExpression = Factory.createCallExpression(pushMethod, [labelsArray]);
                    statements.unshift(Factory.createExpressionStatement(callExpression));
                    statementBuilder.currentExceptionBlock = undefined;
                }
                if (markLabelEnd) {
                    var nextLabelNumberExpression = Factory.createNumericLiteral(labelNumber + 1);
                    var labelProperty = Factory.createPropertyAccessExpression(getState(builder), Factory.createIdentifier("label"));
                    var labelAssign = Factory.createBinaryExpression(SyntaxKind.EqualsToken, labelProperty, nextLabelNumberExpression);
                    statements.push(Factory.createExpressionStatement(labelAssign));
                }
            }

            var labelNumberExpression = Factory.createNumericLiteral(labelNumber);
            var clause = Factory.createCaseClause(labelNumberExpression, statements || []);
            statementBuilder.clauses.push(clause);
            statementBuilder.statements = undefined;
        }

        function tryEnterLabel(statementBuilder: StatementBuilder): void {
            var { operationIndex, builder } = statementBuilder,
                { labels } = builder;

            if (!labels) {
                return;
            }

            var isLabel: boolean = false;
            for (var label = 0; label < labels.length; label++) {
                if (labels[label] === operationIndex) {
                    flushLabel(statementBuilder);
                    if (!builder.labelNumbers) {
                        builder.labelNumbers = [];
                    }
                    builder.labelNumbers[label] = statementBuilder.labelNumber;
                }
            }
        }

        function tryEnterOrLeaveBlock(statementBuilder: StatementBuilder): void {
            var { operationIndex, builder: { blocks, blockActions, blockOffsets } } = statementBuilder;
            if (blocks) {
                for (; statementBuilder.blockIndex < blockActions.length && blockOffsets[statementBuilder.blockIndex] <= operationIndex; statementBuilder.blockIndex++) {
                    statementBuilder.blockIndex = statementBuilder.blockIndex;
                    var block = blocks[statementBuilder.blockIndex];
                    var blockAction = blockActions[statementBuilder.blockIndex];
                    if (blockAction === BlockAction.Open && block.kind === BlockKind.Exception) {
                        var exceptionBlock = <ExceptionBlock>block;
                        if (!statementBuilder.exceptionBlockStack) {
                            statementBuilder.exceptionBlockStack = [];
                        }

                        statementBuilder.exceptionBlockStack.push(statementBuilder.currentExceptionBlock);
                        statementBuilder.currentExceptionBlock = exceptionBlock;
                    }
                    else if (blockAction === BlockAction.Close && block.kind === BlockKind.Exception) {
                        statementBuilder.currentExceptionBlock = statementBuilder.exceptionBlockStack.pop();
                    }
                    else if (blockAction === BlockAction.Open && block.kind === BlockKind.With) {
                        var withBlock = <WithBlock>block;
                        if (!statementBuilder.withBlockStack) {
                            statementBuilder.withBlockStack = [];
                        }
                        statementBuilder.withBlockStack.push(withBlock);
                    }
                    else if (blockAction === BlockAction.Close && block.kind === BlockKind.With) {
                        statementBuilder.withBlockStack.pop();
                    }
                }
            }
        }

        // operations
        function writeOperation(statementBuilder: StatementBuilder, operation: OpCode, operationArguments: any[], operationLocation: TextRange): void {
            tryEnterLabel(statementBuilder);
            tryEnterOrLeaveBlock(statementBuilder);

            // early termination, nothing else to process in this label
            if (statementBuilder.lastOperationWasAbrupt) {
                return;
            }

            statementBuilder.lastOperationWasAbrupt = false;
            statementBuilder.lastOperationWasCompletion = false;
            switch (operation) {
                case OpCode.Statement: return writeStatement(statementBuilder, <Node>operationArguments[0]);
                case OpCode.Assign: return writeAssign(statementBuilder, <Expression>operationArguments[0], <Expression>operationArguments[1], operationLocation);
                case OpCode.Break: return writeBreak(statementBuilder, <Label>operationArguments[0], operationLocation);
                case OpCode.BrTrue: return writeBrTrue(statementBuilder, <Label>operationArguments[0], <Expression>operationArguments[1], operationLocation);
                case OpCode.BrFalse: return writeBrFalse(statementBuilder, <Label>operationArguments[0], <Expression>operationArguments[1], operationLocation);
                case OpCode.YieldStar: return writeYieldStar(statementBuilder, <Expression>operationArguments[0], operationLocation);
                case OpCode.Yield: return writeYield(statementBuilder, <Expression>operationArguments[0], operationLocation);
                case OpCode.Return: return writeReturn(statementBuilder, <Expression>operationArguments[0], operationLocation);
                case OpCode.Throw: return writeThrow(statementBuilder, <Expression>operationArguments[0], operationLocation);
                case OpCode.Endfinally: return writeEndfinally(statementBuilder);
            }
        }

        function writeStatement(statementBuilder: StatementBuilder, node: Node): void {
            if (isExpression(node)) {
                node = Factory.createExpressionStatement(<Expression>node);
            }
            if (!statementBuilder.statements) {
                statementBuilder.statements = [];
            }
            statementBuilder.statements.push(<Statement>node);
        }

        function writeAssign(statementBuilder: StatementBuilder, left: Expression, right: Expression, operationLocation?: TextRange): void {
            var assignExpression = Factory.createBinaryExpression(SyntaxKind.EqualsToken, left, right, operationLocation);
            writeStatement(statementBuilder, assignExpression);
        }

        function writeBreak(statementBuilder: StatementBuilder, label: Label, operationLocation?: TextRange): void {
            statementBuilder.lastOperationWasAbrupt = true;
            var instruction = Factory.createNumericLiteral('3 /*break*/');
            var returnExpression = Factory.createArrayLiteralExpression([instruction, createLabel(statementBuilder.builder, label)]);
            var returnStatement = Factory.createReturnStatement(returnExpression, operationLocation);
            writeStatement(statementBuilder, returnStatement);
        }

        function writeBrTrue(statementBuilder: StatementBuilder, label: Label, condition: Expression, operationLocation?: TextRange): void {
            var instruction = Factory.createNumericLiteral('3 /*break*/');
            var returnExpression = Factory.createArrayLiteralExpression([instruction, createLabel(statementBuilder.builder, label)]);
            var returnStatement = Factory.createReturnStatement(returnExpression, operationLocation);
            var ifStatement = Factory.createIfStatement(condition, returnStatement);
            writeStatement(statementBuilder, ifStatement);
        }

        function writeBrFalse(statementBuilder: StatementBuilder, label: Label, condition: Expression, operationLocation?: TextRange): void {
            var instruction = Factory.createNumericLiteral('3 /*break*/');
            var returnExpression = Factory.createArrayLiteralExpression([instruction, createLabel(statementBuilder.builder, label)]);
            var returnStatement = Factory.createReturnStatement(returnExpression, operationLocation);
            var parenExpression = Factory.createParenthesizedExpression(condition);
            var notExpression = Factory.createPrefixUnaryExpression(SyntaxKind.ExclamationToken, parenExpression);
            var ifStatement = Factory.createIfStatement(notExpression, returnStatement);
            writeStatement(statementBuilder, ifStatement);
        }

        function writeYield(statementBuilder: StatementBuilder, expression: Expression, operationLocation?: TextRange): void {
            statementBuilder.lastOperationWasAbrupt = true;
            var elements: Expression[] = [Factory.createNumericLiteral('4 /*yield*/')];
            if (expression) {
                elements.push(expression);
            }
            var returnExpression = Factory.createArrayLiteralExpression(elements);
            var returnStatement = Factory.createReturnStatement(returnExpression, operationLocation);
            writeStatement(statementBuilder, returnStatement);
        }

        function writeYieldStar(statementBuilder: StatementBuilder, expression: Expression, operationLocation?: TextRange): void {
            statementBuilder.lastOperationWasAbrupt = true;
            var elements: Expression[] = [Factory.createNumericLiteral('5 /*yield**/')];
            if (expression) {
                elements.push(expression);
            }
            var returnExpression = Factory.createArrayLiteralExpression(elements);
            var returnStatement = Factory.createReturnStatement(returnExpression, operationLocation);
            writeStatement(statementBuilder, returnStatement);
        }

        function writeReturn(statementBuilder: StatementBuilder, expression?: Expression, operationLocation?: TextRange): void {
            statementBuilder.lastOperationWasAbrupt = true;
            statementBuilder.lastOperationWasCompletion = true;
            var elements: Expression[] = [Factory.createNumericLiteral('2 /*return*/')];
            if (expression) {
                elements.push(expression);
            }
            var returnExpression = Factory.createArrayLiteralExpression(elements);
            var returnStatement = Factory.createReturnStatement(returnExpression, operationLocation);
            writeStatement(statementBuilder, returnStatement);
        }

        function writeThrow(statementBuilder: StatementBuilder, expression: Expression, operationLocation?: TextRange): void {
            statementBuilder.lastOperationWasAbrupt = true;
            statementBuilder.lastOperationWasCompletion = true;
            var throwStatement = Factory.createThrowStatement(expression, operationLocation);
            writeStatement(statementBuilder, throwStatement);
        }

        function writeEndfinally(statementBuilder: StatementBuilder): void {
            statementBuilder.lastOperationWasAbrupt = true;
            var instruction = Factory.createNumericLiteral('6 /*endfinally*/');
            var returnExpression = Factory.createArrayLiteralExpression([instruction]);
            var returnStatement = Factory.createReturnStatement(returnExpression);
            writeStatement(statementBuilder, returnStatement);
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
    }
}
