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
import { IWalker, WalkContext } from "../walker";
import { IOptions, IRule, IRuleMetadata, RuleFailure, RuleSeverity } from "./rule";
export declare type NoInfer<T> = T & {
    [K in keyof T]: T[K];
};
export declare abstract class AbstractRule implements IRule {
    private readonly options;
    static metadata: IRuleMetadata;
    protected readonly ruleArguments: any[];
    protected readonly ruleSeverity: RuleSeverity;
    ruleName: string;
    constructor(options: IOptions);
    getOptions(): IOptions;
    abstract apply(sourceFile: ts.SourceFile): RuleFailure[];
    applyWithWalker(walker: IWalker): RuleFailure[];
    isEnabled(): boolean;
    protected applyWithFunction(sourceFile: ts.SourceFile, walkFn: (ctx: WalkContext<void>) => void): RuleFailure[];
    protected applyWithFunction<T>(sourceFile: ts.SourceFile, walkFn: (ctx: WalkContext<T>) => void, options: NoInfer<T>): RuleFailure[];
    protected applyWithFunction<T, U>(sourceFile: ts.SourceFile, walkFn: (ctx: WalkContext<T>, programOrChecker: U) => void, options: NoInfer<T>, checker: NoInfer<U>): RuleFailure[];
    /**
     * @deprecated
     * Failures will be filtered based on `tslint:disable` comments by tslint.
     * This method now does nothing.
     */
    protected filterFailures(failures: RuleFailure[]): RuleFailure[];
}
