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
import * as Configuration from "./configuration";
import * as Formatters from "./formatters";
import { FormatterConstructor } from "./language/formatter/formatter";
import { RuleFailure } from "./language/rule/rule";
import * as Rules from "./rules";
import * as Test from "./test";
import * as Utils from "./utils";
export { Configuration, Formatters, Rules, Test, Utils };
export * from "./linter";
export * from "./language/rule/rule";
export * from "./enableDisableRules";
export * from "./formatterLoader";
export * from "./ruleLoader";
export * from "./language/utils";
export * from "./language/walker";
export * from "./language/formatter/formatter";
export interface LintResult {
    errorCount: number;
    warningCount: number;
    failures: RuleFailure[];
    fixes?: RuleFailure[];
    format: string | FormatterConstructor;
    output: string;
}
export interface ILinterOptions {
    fix: boolean;
    formatter?: string | FormatterConstructor;
    formattersDirectory?: string;
    rulesDirectory?: string | string[];
}
