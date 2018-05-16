/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as ts from "typescript";
import { IOptions } from "../rule/rule";
import { RuleWalker } from "./ruleWalker";
/**
 * @deprecated Prefer to manually maintain any contextual information.
 *
 * For example, imagine a `no-break` rule that warns on `break` in `for` but not in `switch`:
 *
 * function walk(ctx: Lint.WalkContext<void>): void {
 *     let isInFor = false;
 *     ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
 *         switch (node.kind) {
 *             case ts.SyntaxKind.Break:
 *                 if (isInFor) {
 *                     ctx.addFailureAtNode(node, "!");
 *                 }
 *                 break;
 *             case ts.SyntaxKind.ForStatement: {
 *                 const old = isInFor;
 *                 isInFor = true;
 *                 ts.forEachChild(node, cb);
 *                 isInFor = old;
 *                 break;
 *             }
 *             case ts.SyntaxKind.SwitchStatement: {
 *                 const old = isInFor;
 *                 isInFor = false;
 *                 ts.forEachChild(node, cb);
 *                 isInFor = old;
 *                 break;
 *             }
 *             default:
 *                 ts.forEachChild(node, cb);
 *         }
 *     });
 * }
 */
export declare abstract class ScopeAwareRuleWalker<T> extends RuleWalker {
    private readonly scopeStack;
    constructor(sourceFile: ts.SourceFile, options: IOptions);
    abstract createScope(node: ts.Node): T;
    getCurrentScope(): T;
    getAllScopes(): T[];
    getCurrentDepth(): number;
    onScopeStart(): void;
    onScopeEnd(): void;
    protected visitNode(node: ts.Node): void;
    protected isScopeBoundary(node: ts.Node): boolean;
}
