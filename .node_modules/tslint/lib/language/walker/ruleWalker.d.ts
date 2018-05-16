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
import { Fix, IOptions, Replacement, RuleFailure } from "../rule/rule";
import { SyntaxWalker } from "./syntaxWalker";
import { IWalker } from "./walker";
export declare class RuleWalker extends SyntaxWalker implements IWalker {
    private readonly sourceFile;
    private readonly limit;
    private readonly options?;
    private readonly failures;
    private readonly ruleName;
    constructor(sourceFile: ts.SourceFile, options: IOptions);
    getSourceFile(): ts.SourceFile;
    getLineAndCharacterOfPosition(position: number): ts.LineAndCharacter;
    getFailures(): RuleFailure[];
    getLimit(): number;
    getOptions(): any;
    hasOption(option: string): boolean;
    /** @deprecated Prefer `addFailureAt` and its variants. */
    createFailure(start: number, width: number, failure: string, fix?: Fix): RuleFailure;
    /** @deprecated Prefer `addFailureAt` and its variants. */
    addFailure(failure: RuleFailure): void;
    /** Add a failure with any arbitrary span. Prefer `addFailureAtNode` if possible. */
    addFailureAt(start: number, width: number, failure: string, fix?: Fix): void;
    /** Like `addFailureAt` but uses start and end instead of start and width. */
    addFailureFromStartToEnd(start: number, end: number, failure: string, fix?: Fix): void;
    /** Add a failure using a node's span. */
    addFailureAtNode(node: ts.Node, failure: string, fix?: Fix): void;
    createReplacement(start: number, length: number, text: string): Replacement;
    appendText(start: number, text: string): Replacement;
    deleteText(start: number, length: number): Replacement;
    deleteFromTo(start: number, end: number): Replacement;
    getRuleName(): string;
}
