import * as Debug from "../debug";
import {
    BinaryExpression,
    BinaryOperatorToken,
    Expression,
} from "../types";

type BinaryExpressionState = <TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult }, outerState: TOuterState) => number;

/**
 * Handles walking into a `BinaryExpression`.
 * @param machine State machine handler functions
 * @param frame The current frame
 * @returns The new frame
 */
function enter<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, outerState: TOuterState): number {
    const prevUserState = stackIndex > 0 ? userStateStack[stackIndex - 1] : undefined;
    Debug.assertEqual(stateStack[stackIndex], enter);
    userStateStack[stackIndex] = machine.onEnter(nodeStack[stackIndex], prevUserState, outerState);
    stateStack[stackIndex] = nextState(machine, enter);
    return stackIndex;
}

/**
 * Handles walking the `left` side of a `BinaryExpression`.
 * @param machine State machine handler functions
 * @param frame The current frame
 * @returns The new frame
 */
function left<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
    Debug.assertEqual(stateStack[stackIndex], left);
    Debug.assertIsDefined(machine.onLeft);
    stateStack[stackIndex] = nextState(machine, left);
    const nextNode = machine.onLeft(nodeStack[stackIndex].left, userStateStack[stackIndex], nodeStack[stackIndex]);
    if (nextNode) {
        checkCircularity(stackIndex, nodeStack, nextNode);
        return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
    }
    return stackIndex;
}

/**
 * Handles walking the `operatorToken` of a `BinaryExpression`.
 * @param machine State machine handler functions
 * @param frame The current frame
 * @returns The new frame
 */
function operator<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
    Debug.assertEqual(stateStack[stackIndex], operator);
    Debug.assertIsDefined(machine.onOperator);
    stateStack[stackIndex] = nextState(machine, operator);
    machine.onOperator(nodeStack[stackIndex].operatorToken, userStateStack[stackIndex], nodeStack[stackIndex]);
    return stackIndex;
}

/**
 * Handles walking the `right` side of a `BinaryExpression`.
 * @param machine State machine handler functions
 * @param frame The current frame
 * @returns The new frame
 */
function right<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
    Debug.assertEqual(stateStack[stackIndex], right);
    Debug.assertIsDefined(machine.onRight);
    stateStack[stackIndex] = nextState(machine, right);
    const nextNode = machine.onRight(nodeStack[stackIndex].right, userStateStack[stackIndex], nodeStack[stackIndex]);
    if (nextNode) {
        checkCircularity(stackIndex, nodeStack, nextNode);
        return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
    }
    return stackIndex;
}

/**
 * Handles walking out of a `BinaryExpression`.
 * @param machine State machine handler functions
 * @param frame The current frame
 * @returns The new frame
 */
function exit<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult }, _outerState: TOuterState): number {
    Debug.assertEqual(stateStack[stackIndex], exit);
    stateStack[stackIndex] = nextState(machine, exit);
    const result = machine.onExit(nodeStack[stackIndex], userStateStack[stackIndex]);
    if (stackIndex > 0) {
        stackIndex--;
        if (machine.foldState) {
            const side = stateStack[stackIndex] === exit ? "right" : "left";
            userStateStack[stackIndex] = machine.foldState(userStateStack[stackIndex], result, side);
        }
    }
    else {
        resultHolder.value = result;
    }
    return stackIndex;
}

/**
 * Handles a frame that is already done.
 * @returns The `done` state.
 */
function done<TOuterState, TState, TResult>(_machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], _nodeStack: BinaryExpression[], _userStateStack: TState[], _resultHolder: { value: TResult }, _outerState: TOuterState): number {
    Debug.assertEqual(stateStack[stackIndex], done);
    return stackIndex;
}

function nextState<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, currentState: BinaryExpressionState) {
    switch (currentState) {
        case enter:
            if (machine.onLeft) return left;
            // falls through
        case left:
            if (machine.onOperator) return operator;
            // falls through
        case operator:
            if (machine.onRight) return right;
            // falls through
        case right: return exit;
        case exit: return done;
        case done: return done;
        default: Debug.fail("Invalid state");
    }
}

function pushStack<TState>(stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], node: BinaryExpression) {
    stackIndex++;
    stateStack[stackIndex] = enter;
    nodeStack[stackIndex] = node;
    userStateStack[stackIndex] = undefined!;
    return stackIndex;
}

function checkCircularity(stackIndex: number, nodeStack: BinaryExpression[], node: BinaryExpression) {
    if (Debug.shouldAssert(Debug.AssertionLevel.Aggressive)) {
        while (stackIndex >= 0) {
            Debug.assert(nodeStack[stackIndex] !== node, "Circular traversal detected.");
            stackIndex--;
        }
    }
}

/**
 * Holds state machine handler functions
 */
 class BinaryExpressionStateMachine<TOuterState, TState, TResult> {
    constructor(
        readonly onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
        readonly onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
        readonly onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
        readonly onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
        readonly onExit: (node: BinaryExpression, userState: TState) => TResult,
        readonly foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
    ) {
    }
}

/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 *
 * @internal
 */
 export function createBinaryExpressionTrampoline<TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: BinaryExpression) => TResult;
/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 *
 * @internal
 */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: BinaryExpression, outerState: TOuterState) => TResult;

/** @internal */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
) {
    const machine = new BinaryExpressionStateMachine(onEnter, onLeft, onOperator, onRight, onExit, foldState);
    return trampoline;

    function trampoline(node: BinaryExpression, outerState: TOuterState) {
        const resultHolder: { value: TResult } = { value: undefined! };
        const stateStack: BinaryExpressionState[] = [enter];
        const nodeStack: BinaryExpression[] = [node];
        const userStateStack: TState[] = [undefined!];
        let stackIndex = 0;
        while (stateStack[stackIndex] !== done) {
            stackIndex = stateStack[stackIndex](machine, stackIndex, stateStack, nodeStack, userStateStack, resultHolder, outerState);
        }
        Debug.assertEqual(stackIndex, 0);
        return resultHolder.value;
    }
}
