/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
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
import { Fix, RuleFailure } from "../rule/rule";
export declare class WalkContext<T> {
    readonly sourceFile: ts.SourceFile;
    readonly ruleName: string;
    readonly options: T;
    readonly failures: RuleFailure[];
    constructor(sourceFile: ts.SourceFile, ruleName: string, options: T);
    /** Add a failure with any arbitrary span. Prefer `addFailureAtNode` if possible. */
    addFailureAt(start: number, width: number, failure: string, fix?: Fix): void;
    addFailure(start: number, end: number, failure: string, fix?: Fix): void;
    /** Add a failure using a node's span. */
    addFailureAtNode(node: ts.Node, failure: string, fix?: Fix): void;
}
