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
import { ScopeAwareRuleWalker } from "./scopeAwareRuleWalker";
/**
 * @deprecated See comment on ScopeAwareRuleWalker.
 *
 * An AST walker that is aware of block scopes in addition to regular scopes. Block scopes
 * are a superset of regular scopes (new block scopes are created more frequently in a program).
 */
export declare abstract class BlockScopeAwareRuleWalker<T, U> extends ScopeAwareRuleWalker<T> {
    private readonly blockScopeStack;
    constructor(sourceFile: ts.SourceFile, options: IOptions);
    abstract createBlockScope(node: ts.Node): U;
    getAllBlockScopes(): U[];
    getCurrentBlockScope(): U;
    getCurrentBlockDepth(): number;
    onBlockScopeStart(): void;
    onBlockScopeEnd(): void;
    findBlockScope(predicate: (scope: U) => boolean): U | undefined;
    protected visitNode(node: ts.Node): void;
    private isBlockScopeBoundary(node);
}
