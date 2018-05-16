"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var node_1 = require("../typeguard/node");
function endsControlFlow(statement) {
    return getControlFlowEnd(statement).end;
}
exports.endsControlFlow = endsControlFlow;
var defaultControlFlowEnd = { statements: [], end: false };
function getControlFlowEnd(statement) {
    return node_1.isBlockLike(statement) ? handleBlock(statement) : getControlFlowEndWorker(statement);
}
exports.getControlFlowEnd = getControlFlowEnd;
function getControlFlowEndWorker(statement) {
    switch (statement.kind) {
        case ts.SyntaxKind.ReturnStatement:
        case ts.SyntaxKind.ThrowStatement:
        case ts.SyntaxKind.ContinueStatement:
        case ts.SyntaxKind.BreakStatement:
            return { statements: [statement], end: true };
        case ts.SyntaxKind.Block:
            return handleBlock(statement);
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.WhileStatement:
            return handleForAndWhileStatement(statement);
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.ForInStatement:
            return handleForInOrOfStatement(statement);
        case ts.SyntaxKind.DoStatement:
            return matchBreakOrContinue(getControlFlowEndWorker(statement.statement), node_1.isBreakOrContinueStatement);
        case ts.SyntaxKind.IfStatement:
            return handleIfStatement(statement);
        case ts.SyntaxKind.SwitchStatement:
            return matchBreakOrContinue(handleSwitchStatement(statement), node_1.isBreakStatement);
        case ts.SyntaxKind.TryStatement:
            return handleTryStatement(statement);
        case ts.SyntaxKind.LabeledStatement:
            return matchLabel(getControlFlowEndWorker(statement.statement), statement.label);
        case ts.SyntaxKind.WithStatement:
            return getControlFlowEndWorker(statement.statement);
        default:
            return defaultControlFlowEnd;
    }
}
function handleBlock(statement) {
    var result = { statements: [], end: false };
    for (var _i = 0, _a = statement.statements; _i < _a.length; _i++) {
        var s = _a[_i];
        var current = getControlFlowEndWorker(s);
        (_b = result.statements).push.apply(_b, current.statements);
        if (current.end) {
            result.end = true;
            break;
        }
    }
    return result;
    var _b;
}
function handleForInOrOfStatement(statement) {
    var end = matchBreakOrContinue(getControlFlowEndWorker(statement.statement), node_1.isBreakOrContinueStatement);
    end.end = false;
    return end;
}
function handleForAndWhileStatement(statement) {
    var constantCondition = statement.kind === ts.SyntaxKind.WhileStatement
        ? getConstantCondition(statement.expression)
        : statement.condition === undefined || getConstantCondition(statement.condition);
    if (constantCondition === false)
        return defaultControlFlowEnd;
    var end = matchBreakOrContinue(getControlFlowEndWorker(statement.statement), node_1.isBreakOrContinueStatement);
    if (constantCondition === undefined)
        end.end = false;
    return end;
}
function getConstantCondition(node) {
    switch (node.kind) {
        case ts.SyntaxKind.TrueKeyword:
            return true;
        case ts.SyntaxKind.FalseKeyword:
            return false;
        default:
            return;
    }
}
function handleIfStatement(node) {
    switch (getConstantCondition(node.expression)) {
        case true:
            return getControlFlowEndWorker(node.thenStatement);
        case false:
            return node.elseStatement === undefined
                ? defaultControlFlowEnd
                : getControlFlowEndWorker(node.elseStatement);
    }
    var then = getControlFlowEndWorker(node.thenStatement);
    if (node.elseStatement === undefined)
        return {
            statements: then.statements,
            end: false,
        };
    var elze = getControlFlowEndWorker(node.elseStatement);
    return {
        statements: then.statements.concat(elze.statements),
        end: then.end && elze.end,
    };
}
function handleSwitchStatement(node) {
    var hasDefault = false;
    var result = {
        statements: [],
        end: false,
    };
    for (var _i = 0, _a = node.caseBlock.clauses; _i < _a.length; _i++) {
        var clause = _a[_i];
        if (clause.kind === ts.SyntaxKind.DefaultClause)
            hasDefault = true;
        var current = handleBlock(clause);
        result.end = current.end;
        (_b = result.statements).push.apply(_b, current.statements);
    }
    if (!hasDefault)
        result.end = false;
    return result;
    var _b;
}
function handleTryStatement(node) {
    var finallyResult;
    if (node.finallyBlock !== undefined) {
        finallyResult = handleBlock(node.finallyBlock);
        if (finallyResult.end)
            return finallyResult;
    }
    var tryResult = handleBlock(node.tryBlock);
    if (node.catchClause === undefined)
        return { statements: finallyResult.statements.concat(tryResult.statements), end: tryResult.end };
    var catchResult = handleBlock(node.catchClause.block);
    return {
        statements: tryResult.statements
            .filter(function (s) { return s.kind !== ts.SyntaxKind.ThrowStatement; })
            .concat(catchResult.statements, finallyResult === undefined ? [] : finallyResult.statements),
        end: tryResult.end && catchResult.end,
    };
}
function matchBreakOrContinue(current, pred) {
    var result = {
        statements: [],
        end: current.end,
    };
    for (var _i = 0, _a = current.statements; _i < _a.length; _i++) {
        var statement = _a[_i];
        if (pred(statement) && statement.label === undefined) {
            result.end = false;
            continue;
        }
        result.statements.push(statement);
    }
    return result;
}
function matchLabel(current, label) {
    var result = {
        statements: [],
        end: current.end,
    };
    var labelText = label.text;
    for (var _i = 0, _a = current.statements; _i < _a.length; _i++) {
        var statement = _a[_i];
        switch (statement.kind) {
            case ts.SyntaxKind.BreakStatement:
            case ts.SyntaxKind.ContinueStatement:
                if (statement.label !== undefined && statement.label.text === labelText) {
                    result.end = false;
                    continue;
                }
        }
        result.statements.push(statement);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1mbG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udHJvbC1mbG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWlDO0FBQ2pDLDBDQUE4RjtBQUU5Rix5QkFBZ0MsU0FBc0M7SUFDbEUsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDNUMsQ0FBQztBQUZELDBDQUVDO0FBaUJELElBQU0scUJBQXFCLEdBQW1CLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFLM0UsMkJBQWtDLFNBQXNDO0lBQ3BFLE9BQU8sa0JBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRyxDQUFDO0FBRkQsOENBRUM7QUFFRCxpQ0FBaUMsU0FBdUI7SUFDcEQsUUFBUSxTQUFTLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFDbkMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUNsQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUM7UUFDckMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWM7WUFDN0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxDQUF1QixTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDdEUsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxXQUFXLENBQVcsU0FBUyxDQUFDLENBQUM7UUFDNUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUNoQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYztZQUM3QixPQUFPLDBCQUEwQixDQUFz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