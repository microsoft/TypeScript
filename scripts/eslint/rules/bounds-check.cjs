/** @import { TSESTree } from "@typescript-eslint/types" */
const { AST_NODE_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");

module.exports = createRule({
    name: "bounds-check",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            codePointUncheckedError: `Use 'codePointChecked' instead of 'codePointUnchecked'`,
            codePointAtError: `Use 'codePointChecked' instead of 'text.codePointAt'`,
            charCodeUncheckedError: `Use 'charCodeChecked' instead of 'charCodeUnchecked'`,
            charCodeAtError: `Use 'charCodeChecked' instead of 'text.charCodeAt'`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],
    create(context) {
        if (!context.filename.endsWith("scanner.ts")) {
            return {};
        }

        return {
            CallExpression(node) {
                if (
                    node.callee.type === AST_NODE_TYPES.MemberExpression &&
                    node.callee.object.type === AST_NODE_TYPES.Identifier &&
                    node.callee.object.name === "text" &&
                    !node.callee.computed
                ) {
                    const name = node.callee.property.name;
                    switch (name) {
                        case "charCodeAt":
                        case "codePointAt": {
                            /** @type {TSESTree.Node | undefined} */
                            let n = node.parent;
                            while (n) {
                                if (n.type === AST_NODE_TYPES.FunctionDeclaration && n.id?.name === "createScanner") {
                                    context.report({ messageId: `${name}Error`, node: node.callee });
                                    break;
                                }
                                n = n.parent;
                            }
                            break;
                        }
                    }
                }
                else if (node.callee.type === AST_NODE_TYPES.Identifier) {
                    switch (node.callee.name) {
                        case "codePointUnchecked":
                        case "charCodeUnchecked": {
                            // perform a rudimentary test to determine if there is a definite bounds check for this node
                            if (!hasDefiniteBoundsCheck(node)) {
                                context.report({ messageId: `${node.callee.name}Error`, node: node.callee });
                            }
                            break;
                        }
                    }
                }
            },
        };
    },
});

/**
 * @param {TSESTree.CallExpression} node
 * @returns {boolean}
 */
function hasDefiniteBoundsCheck(node) {
    if (node.arguments.length === 0) {
        return false;
    }

    let index;
    let offset = 0;
    const arg = node.arguments[0];
    switch (arg.type) {
        case AST_NODE_TYPES.Identifier: {
            // pos
            index = arg.name;
            break;
        }
        case AST_NODE_TYPES.BinaryExpression: {
            switch (arg.operator) {
                case "+":{
                    const { left, right } = arg;
                    if (
                        left.type === AST_NODE_TYPES.Identifier &&
                        right.type === AST_NODE_TYPES.Literal &&
                        typeof right.value === "number"
                    ) {
                        // pos + 1
                        index = left.name;
                        offset = right.value;
                    }
                    else if (
                        right.type === AST_NODE_TYPES.Identifier &&
                        left.type === AST_NODE_TYPES.Literal &&
                        typeof left.value === "number"
                    ) {
                        // 1 + pos
                        index = right.name;
                        offset = left.value;
                    }
                    else {
                        return false;
                    }
                    break;
                }
                case "-": {
                    const { left, right } = arg;
                    if (
                        left.type === AST_NODE_TYPES.Identifier &&
                        right.type === AST_NODE_TYPES.Literal &&
                        typeof right.value === "number"
                    ) {
                        // pos - 1
                        index = left.name;
                        offset = -right.value;
                    }
                    else {
                        return false;
                    }
                    break;
                }
                default: {
                    return false;
                }
            }
            break;
        }
        default: {
            return false;
        }
    }

    /** @type {TSESTree.Node} */
    let n = node;
    let negated = false;
    while (n.parent) {
        switch (n.parent.type) {
            case AST_NODE_TYPES.UnaryExpression: {
                if (n.parent.operator === "!") {
                    negated = !negated;
                }
                else {
                    return false;
                }
                break;
            }
            case AST_NODE_TYPES.LogicalExpression: {
                switch (n.parent.operator) {
                    case "&&": {
                        const { left, right } = n.parent;
                        switch (n) {
                            case left: {
                                break;
                            }
                            case right: {
                                if (inBounds(left, index, offset, negated)) {
                                    return true;
                                }
                                if (containsSideEffect(left, index)) {
                                    return false;
                                }
                                break;
                            }
                        }
                        break;
                    }
                    case "||":
                    case "??": {
                        const { left, right } = n.parent;
                        switch (n) {
                            case left: {
                                break;
                            }
                            case right: {
                                if (inBounds(left, index, offset, !negated)) {
                                    return true;
                                }
                                if (containsSideEffect(left, index)) {
                                    return false;
                                }
                                break;
                            }
                        }
                        break;
                    }
                    default: {
                        return false;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.ConditionalExpression: {
                const { test, consequent, alternate } = n.parent;
                switch (n) {
                    case test: {
                        break;
                    }
                    case consequent: {
                        if (inBounds(test, index, offset, negated)) {
                            return true;
                        }
                        if (containsSideEffect(test, index)) {
                            return false;
                        }
                        break;
                    }
                    case alternate: {
                        if (inBounds(test, index, offset, !negated)) {
                            return true;
                        }
                        if (containsSideEffect(test, index)) {
                            return false;
                        }
                        break;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.BinaryExpression:
            case AST_NODE_TYPES.AssignmentExpression: {
                const { left, right } = n.parent;
                switch (n) {
                    case left: {
                        break;
                    }
                    case right: {
                        if (containsSideEffect(left, index)) {
                            return false;
                        }
                        break;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.SequenceExpression: {
                const { expressions } = n.parent;
                const i = expressions.indexOf(/** @type {TSESTree.Expression} */(n));
                if (expressions.slice(0, i).some(n => containsSideEffect(n, index))) {
                    return false;
                }
                break;
            }
            case AST_NODE_TYPES.CallExpression: {
                const args = n.parent.arguments;
                const i = args.indexOf(/** @type {*} */(n));
                if (args.slice(0, i).some(n => containsSideEffect(n, index))) {
                    return false;
                }
                break;
            }
            case AST_NODE_TYPES.WhileStatement: {
                const { test, body } = n.parent;
                switch (n) {
                    case test: {
                        break;
                    }
                    case body: {
                        if (inBounds(test, index, offset, negated)) {
                            return true;
                        }
                        if (containsSideEffect(test, index)) {
                            return false;
                        }
                        break;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.IfStatement: {
                const { test, consequent, alternate } = n.parent;
                switch (n) {
                    case test: {
                        break;
                    }
                    case consequent: {
                        if (inBounds(test, index, offset, negated)) {
                            return true;
                        }
                        if (containsSideEffect(test, index)) {
                            return false;
                        }
                        break;
                    }
                    case alternate: {
                        if (inBounds(test, index, offset, !negated)) {
                            return true;
                        }
                        if (containsSideEffect(test, index)) {
                            return false;
                        }
                        break;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.BlockStatement: {
                const [first] = n.parent.body;
                switch (n) {
                    case first: {
                        break;
                    }
                    default: {
                        return false;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.ExpressionStatement: {
                break;
            }
            case AST_NODE_TYPES.VariableDeclarator: {
                const { id, init } = n.parent;
                switch (n) {
                    case /** @type {TSESTree.Node} */(id):
                        break;
                    case init:
                        if (containsSideEffect(n, index)) {
                            return false;
                        }
                        break;
                }
                break;
            }
            case AST_NODE_TYPES.VariableDeclaration: {
                const declarations = /** @type {readonly TSESTree.Node[]} */(n.parent.declarations);
                const i = declarations.indexOf(n);
                if (declarations.slice(0, i).some(n => containsSideEffect(n, index))) {
                    return false;
                }
                break;
            }
            default: {
                return false;
            }
        }
        n = n.parent;
    }

    return false;
}

/**
 * @param {TSESTree.Node} node
 * @param {string} index
 * @returns {boolean}
 */
function containsSideEffect(node, index) {
    /**
     * @param {TSESTree.Node} node
     * @returns {boolean}
     */
    function contains(node) {
        switch (node.type) {
            case AST_NODE_TYPES.PrivateIdentifier:
            case AST_NODE_TYPES.Literal:
            case AST_NODE_TYPES.Identifier: {
                return false;
            }
            case AST_NODE_TYPES.MemberExpression: {
                const { object, computed, property } = node;
                return contains(object) || computed && contains(property);
            }
            case AST_NODE_TYPES.UpdateExpression: {
                const { argument } = node;
                return argument.type === AST_NODE_TYPES.Identifier && (argument.name === index || argument.name === "end");
            }
            case AST_NODE_TYPES.AssignmentExpression: {
                const { left, right } = node;
                return left.type === AST_NODE_TYPES.Identifier && (left.name === index || left.name === "end") || contains(right);
            }
            case AST_NODE_TYPES.CallExpression: {
                const { callee, arguments: args } = node;
                if (callee.type === AST_NODE_TYPES.Identifier) {
                    switch (callee.name) {
                        case "codePointChecked":
                        case "codePointUnchecked":
                        case "charCodeChecked":
                        case "charCodeUnchecked": {
                            return args.some(contains);
                        }
                    }

                    // assumes functions named `is*` do not cause side effects
                    if (/^is[A-Z]/.test(callee.name)) {
                        return args.some(contains);
                    }
                }
                break; // assume every other call introduces potential side effects
            }
            case AST_NODE_TYPES.LogicalExpression:
            case AST_NODE_TYPES.BinaryExpression: {
                const { left, right } = node;
                return contains(left) || contains(right);
            }
            case AST_NODE_TYPES.ConditionalExpression: {
                const { test, consequent, alternate } = node;
                return contains(test) || contains(consequent) || contains(alternate);
            }
            case AST_NODE_TYPES.UnaryExpression: {
                return contains(node.argument);
            }
            case AST_NODE_TYPES.SequenceExpression: {
                return node.expressions.some(contains);
            }
            case AST_NODE_TYPES.VariableDeclaration: {
                return node.declarations.some(contains);
            }
            case AST_NODE_TYPES.VariableDeclarator: {
                const { id, init } = node;
                return contains(id) || !!init && contains(init);
            }
        }
        return true; // assume everything else has potential side effects
    }

    return contains(node);
}

/**
 * @typedef {"in-bounds" | "out-of-bounds" | false} Bounds
 *
 * @param {TSESTree.Expression} node
 * @param {string} index
 * @param {number} offset
 * @param {boolean} negated
 * @returns {boolean}
 */
function inBounds(node, index, offset, negated) {
    const result = checkBounds(node, index, offset);
    return result === (negated ? "out-of-bounds" : "in-bounds");
}

/**
 * @param {TSESTree.Expression} node
 * @param {string} index
 * @param {number} offset
 * @returns {Bounds}
 */
function checkBounds(node, index, offset) {
    /**
     * @param {TSESTree.Node} node
     * @returns {Bounds}
     */
    function check(node) {
        switch (node.type) {
            case AST_NODE_TYPES.UnaryExpression: {
                const { operator, argument } = node;
                if (operator === "!") {
                    const result = check(argument);
                    if (result === "in-bounds") return "out-of-bounds";
                    if (result === "out-of-bounds") return "in-bounds";
                }
                break;
            }
            case AST_NODE_TYPES.LogicalExpression: {
                const { left, operator, right } = node;
                if (operator === "&&") {
                    const first = check(left);
                    if (first === "in-bounds") return "in-bounds";
                    const second = check(right);
                    if (second === "in-bounds") return "in-bounds";
                    return first || second;
                }
                break;
            }
            case AST_NODE_TYPES.BinaryExpression: {
                const { left, operator, right } = node;
                switch (operator) {
                    case "<": {
                        switch (true) {
                            case isBound(left, index, offset, op.GE) && isBound(right, "end"):
                            case isBound(left, index) && isBound(right, "end", -offset, op.LE):
                                return "in-bounds";
                            case isBound(left, "end", -offset, op.LE) && isBound(right, index):
                            case isBound(left, "end") && isBound(right, index, offset, op.GE):
                                return "out-of-bounds";
                        }
                        break;
                    }
                    case ">": {
                        const { left, right } = node;
                        switch (true) {
                            case isBound(left, index, offset, op.GE) && isBound(right, "end"):
                            case isBound(left, index) && isBound(right, "end", -offset, op.LE):
                                return "out-of-bounds";
                            case isBound(left, "end", -offset, op.LE) && isBound(right, index):
                            case isBound(left, "end") && isBound(right, index, offset, op.GE):
                                return "in-bounds";
                        }
                        break;
                    }
                    case "<=": {
                        const { left, right } = node;
                        switch (true) {
                            case isBound(right, index, offset) && isBound(left, "end"):
                            case isBound(right, index) && isBound(left, "end", -offset):
                                return "out-of-bounds";
                        }
                        break;
                    }
                    case ">=": {
                        const { left, right } = node;
                        switch (true) {
                            case isBound(left, index, offset) && isBound(right, "end"):
                            case isBound(left, index) && isBound(right, "end", -offset):
                                return "out-of-bounds";
                        }
                        break;
                    }
                }
                break;
            }
            case AST_NODE_TYPES.SequenceExpression: {
                return check(node.expressions[node.expressions.length - 1]);
            }
        }
        return false;
    }

    if (containsSideEffect(node, index)) {
        return false;
    }

    return check(node);
}

/**
 * @param {TSESTree.Node} node
 * @param {string} name
 * @param {number} offset
 * @param {(a: number, b: number) => boolean} [cmp]
 * @returns {boolean}
 */
function isBound(node, name, offset = 0, cmp = op.EQ) {
    switch (node.type) {
        case AST_NODE_TYPES.Identifier: {
            return node.name === name && offset === 0;
        }
        case AST_NODE_TYPES.BinaryExpression: {
            const { left, operator, right } = node;
            switch (operator) {
                case "+": {
                    if (left.type === AST_NODE_TYPES.Identifier) {
                        return left.name === name && right.type === AST_NODE_TYPES.Literal && typeof right.value === "number" && cmp(right.value, offset);
                    }
                    if (right.type === AST_NODE_TYPES.Identifier) {
                        return right.name === name && left.type === AST_NODE_TYPES.Literal && typeof left.value === "number" && cmp(left.value, offset);
                    }
                    break;
                }
                case "-": {
                    if (left.type === AST_NODE_TYPES.Identifier) {
                        switch (cmp) {
                            case op.GE:
                                cmp = op.LE;
                                break;
                            case op.LE:
                                cmp = op.GE;
                                break;
                        }
                        return left.name === name && right.type === AST_NODE_TYPES.Literal && typeof right.value === "number" && cmp(right.value, -offset);
                    }
                    break;
                }
            }
            break;
        }
    }
    return false;
}

const op = {
    /**
     * @param {number} a
     * @param {number} b
     */
    EQ(a, b) { return a === b; },

    /**
     * @param {number} a
     * @param {number} b
     */
    LE(a, b) { return a <= b; },

    /**
     * @param {number} a
     * @param {number} b
     */
    GE(a, b) { return a >= b; },
};

