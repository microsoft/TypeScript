/// <reference path="types.ts"/>

module ts {
    export function checkControlFlowOfFunction(decl: FunctionLikeDeclaration, noImplicitReturns: boolean, error: (n: Node, message: DiagnosticMessage, arg0?: any) => void) {
        if (!decl.body || decl.body.kind !== SyntaxKind.FunctionBlock) {
            return;
        }

        var finalState = checkControlFlow(decl.body, error);
        if (noImplicitReturns && finalState === ControlFlowState.Reachable) {
            var errorNode: Node = decl.name || decl;
            error(errorNode, Diagnostics.Not_all_code_paths_return_a_value);
        }
    }

    export function checkControlFlowOfBlock(block: Block, error: (n: Node, message: DiagnosticMessage, arg0?: any) => void) {
        checkControlFlow(block, error);
    }

    function checkControlFlow(decl: Node, error: (n: Node, message: DiagnosticMessage, arg0?: any) => void): ControlFlowState {
        var currentState = ControlFlowState.Reachable;

        function setState(newState: ControlFlowState) {
            currentState = newState;
        }

        function or(s1: ControlFlowState, s2: ControlFlowState): ControlFlowState {
            if (s1 === ControlFlowState.Reachable || s2 === ControlFlowState.Reachable) {
                return ControlFlowState.Reachable;
            }
            if (s1 === ControlFlowState.ReportedUnreachable && s2 === ControlFlowState.ReportedUnreachable) {
                return ControlFlowState.ReportedUnreachable;
            }
            return ControlFlowState.Unreachable;
        }

        function reportIfNotReachable(n: Node): boolean {
            switch (currentState) {
                case ControlFlowState.Unreachable:
                    error(n, Diagnostics.Unreachable_code_detected);
                    currentState = ControlFlowState.ReportedUnreachable;
                    return true;
                case ControlFlowState.ReportedUnreachable:
                    return true;
                default:
                    return false;
            }
        }

        // label name -> index in 'labelStack'
        var labels: Map<number> = {};
        // CF state at all seen labels
        var labelStack: ControlFlowState[] = [];
        // indices of implicit labels in 'labelStack'
        var implicitLabels: number[] = [];

        function pushNamedLabel(name: Identifier): boolean {
            if (hasProperty(labels, name.text)) {
                return false;
            }
            var newLen = labelStack.push(ControlFlowState.Uninitialized);
            labels[name.text] = newLen - 1;
            return true;
        }

        function pushImplicitLabel(): number {
            var newLen = labelStack.push(ControlFlowState.Uninitialized);
            implicitLabels.push(newLen - 1);
            return newLen - 1;
        }

        function setFinalStateAtLabel(mergedStates: ControlFlowState, outerState: ControlFlowState, name: Identifier): void {
            if (mergedStates === ControlFlowState.Uninitialized) {
                if (name) {
                    error(name, Diagnostics.Unused_label);
                }
                setState(outerState);
            }
            else {
                setState(or(mergedStates, outerState));
            }
        }

        function popNamedLabel(name: Identifier, outerState: ControlFlowState): void {
            Debug.assert(hasProperty(labels, name.text));
            var index = labels[name.text];
            Debug.assert(labelStack.length === index + 1);
            labels[name.text] = undefined;
            var mergedStates = labelStack.pop();
            setFinalStateAtLabel(mergedStates, outerState, name);
        }

        function popImplicitLabel(index: number, outerState: ControlFlowState): void {
            Debug.assert(labelStack.length === index + 1);
            var i = implicitLabels.pop();
            Debug.assert(index === i);
            var mergedStates = labelStack.pop();
            setFinalStateAtLabel(mergedStates, outerState, /*name*/ undefined);
        }

        function gotoLabel(label: Identifier, outerState: ControlFlowState): void {
            var stateIndex: number;
            if (label) {
                if (!hasProperty(labels, label.text)) {
                    // reference to non-existing label
                    return;
                }
                stateIndex = labels[label.text];
            }
            else {
                if (implicitLabels.length === 0) {
                    // non-labeled break\continue being used outside loops
                    return;
                }
                
                stateIndex = implicitLabels[implicitLabels.length - 1];
            }
            var stateAtLabel = labelStack[stateIndex];
            labelStack[stateIndex] = stateAtLabel === ControlFlowState.Uninitialized ? outerState : or(outerState, stateAtLabel);
        }

        function checkWhileStatement(n: WhileStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            var preWhileState = 
                n.expression.kind === SyntaxKind.FalseKeyword ? ControlFlowState.Unreachable : currentState;
            var postWhileState = 
                n.expression.kind === SyntaxKind.TrueKeyword ? ControlFlowState.Unreachable : currentState;

            setState(preWhileState);

            var index = pushImplicitLabel();
            check(n.statement);
            popImplicitLabel(index, postWhileState);
        }

        function checkDoStatement(n: DoStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            var preDoState = currentState;

            var index = pushImplicitLabel();
            check(n.statement);

            var postDoState = n.expression.kind === SyntaxKind.TrueKeyword ? ControlFlowState.Unreachable : preDoState;
            popImplicitLabel(index, postDoState);
        }

        function checkForStatement(n: ForStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            var preForState = currentState;
            var index = pushImplicitLabel();
            check(n.statement);
            
            // for statement is considered infinite when it condition is either omitted or is true keyword
            // - for(..;;..)
            // - for(..;true;..)
            var isInfiniteLoop = (!n.condition || n.condition.kind === SyntaxKind.TrueKeyword);

            var postForState = isInfiniteLoop ? ControlFlowState.Unreachable : preForState;
            popImplicitLabel(index, postForState);
        }

        function checkForInStatement(n: ForInStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            var preForInState = currentState;
            var index = pushImplicitLabel();
            check(n.statement);
            popImplicitLabel(index, preForInState);
        }

        function checkBlock(n: Block): void {
            forEach(n.statements, check);
        }

        function checkIfStatement(n: IfStatement): void {
            var ifTrueState: ControlFlowState = n.expression.kind === SyntaxKind.FalseKeyword ? ControlFlowState.Unreachable : currentState;
            var ifFalseState: ControlFlowState = n.expression.kind === SyntaxKind.TrueKeyword ? ControlFlowState.Unreachable : currentState;

            setState(ifTrueState);
            check(n.thenStatement);
            ifTrueState = currentState;

            setState(ifFalseState);
            check(n.elseStatement);

            currentState = or(currentState, ifTrueState);
        }

        function checkReturnOrThrow(n: Node): void {
            reportIfNotReachable(n);
            setState(ControlFlowState.Unreachable);
        }

        function checkBreakOrContinueStatement(n: BreakOrContinueStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }
            if (n.kind === SyntaxKind.BreakStatement) {
                gotoLabel(n.label, currentState);
            }
            else {
                gotoLabel(n.label, ControlFlowState.Unreachable); // touch label so it will be marked a used
            }
            setState(ControlFlowState.Unreachable);
        }

        function checkTryStatement(n: TryStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            // catch\finally blocks has the same reachability as try block
            var startState = currentState;
            check(n.tryBlock);
            var postTryState = currentState;

            setState(startState);
            check(n.catchBlock);
            var postCatchState = currentState;

            setState(startState);
            check(n.finallyBlock);
            setState(or(postTryState, postCatchState));
        }

        function checkSwitchStatement(n: SwitchStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            var startState = currentState;
            var hasDefault = false;

            var index = pushImplicitLabel();

            forEach(n.clauses, (c: CaseOrDefaultClause) => {
                hasDefault = hasDefault || c.kind === SyntaxKind.DefaultClause;
                setState(startState);
                forEach(c.statements, check);
                if (c.statements.length && currentState === ControlFlowState.Reachable) {
                    error(c.expression, Diagnostics.Fallthrough_case_in_switch);
                }
            });

            // post switch state is unreachable if switch is exaustive (has a default case ) and does not have fallthrough from the last case
            var postSwitchState = hasDefault && currentState !== ControlFlowState.Reachable ? ControlFlowState.Unreachable : startState;

            popImplicitLabel(index, postSwitchState);
        }

        function checkLabelledStatement(n: LabeledStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            var ok = pushNamedLabel(n.label);
            check(n.statement);
            if (ok) {
                popNamedLabel(n.label, currentState);
            }
        }

        function checkWithStatement(n: WithStatement): void {
            if (reportIfNotReachable(n)) {
                // current state is unreachable.
                // since nothing downstream can change it - no need to continue
                return;
            }

            check(n.statement);
        }

        // current assumption: only statements affect CF
        function check(n: Node): void {
            if (!n || currentState === ControlFlowState.ReportedUnreachable) {
                return;
            }
            switch (n.kind) {
                case SyntaxKind.WhileStatement:
                    checkWhileStatement(<WhileStatement>n);
                    break;
                case SyntaxKind.SourceFile:
                    forEach((<SourceFile>n).statements, check);
                    break;
                case SyntaxKind.Block:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchBlock:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.FunctionBlock:
                    checkBlock(<Block>n);
                    break;
                case SyntaxKind.IfStatement:
                    checkIfStatement(<IfStatement>n);
                    break;
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ThrowStatement:
                    checkReturnOrThrow(n);
                    break;
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    checkBreakOrContinueStatement(<BreakOrContinueStatement>n);
                    break;
                case SyntaxKind.VariableStatement:
                case SyntaxKind.EmptyStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.DebuggerStatement:
                    reportIfNotReachable(n);
                    break;
                case SyntaxKind.DoStatement:
                    checkDoStatement(<DoStatement>n);
                    break;
                case SyntaxKind.ForInStatement:
                    checkForInStatement(<ForInStatement>n);
                    break;
                case SyntaxKind.ForStatement:
                    checkForStatement(<ForStatement>n);
                    break;
                case SyntaxKind.LabeledStatement:
                    checkLabelledStatement(<LabeledStatement>n);
                    break;
                case SyntaxKind.SwitchStatement:
                    checkSwitchStatement(<SwitchStatement>n);
                    break;
                case SyntaxKind.TryStatement:
                    checkTryStatement(<TryStatement>n);
                    break;
                case SyntaxKind.WithStatement:
                    checkWithStatement(<WithStatement>n);
                    break;
            }
        }

        check(decl);
        return currentState;
    }

    const enum ControlFlowState {
        Uninitialized       = 0,
        Reachable           = 1,
        Unreachable         = 2,
        ReportedUnreachable = 3,
    }
}