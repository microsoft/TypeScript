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
import { IWalker } from "../walker";
export interface RuleConstructor {
    metadata: IRuleMetadata;
    new (options: IOptions): IRule;
}
export interface IRuleMetadata {
    /**
     * The kebab-case name of the rule.
     */
    ruleName: string;
    /**
     * The type of the rule - its overall purpose
     */
    type: RuleType;
    /**
     * A rule deprecation message, if applicable.
     */
    deprecationMessage?: string;
    /**
     * A short, one line description of what the rule does.
     */
    description: string;
    /**
     * More elaborate details about the rule.
     */
    descriptionDetails?: string;
    /**
     * Whether or not the rule will provide fix suggestions.
     */
    hasFix?: boolean;
    /**
     * An explanation of the available options for the rule.
     */
    optionsDescription: string;
    /**
     * Schema of the options the rule accepts.
     * The first boolean for whether the rule is enabled or not is already implied.
     * This field describes the options after that boolean.
     * If null, this rule has no options and is not configurable.
     */
    options: any;
    /**
     * Examples of what a standard config for the rule might look like.
     * Using a string[] here is deprecated. Write the options as a JSON object instead.
     */
    optionExamples?: Array<true | any[]> | string[];
    /**
     * An explanation of why the rule is useful.
     */
    rationale?: string;
    /**
     * Whether or not the rule requires type info to run.
     */
    requiresTypeInfo?: boolean;
    /**
     * Whether or not the rule use for TypeScript only. If `false`, this rule may be used with .js files.
     */
    typescriptOnly: boolean;
    /**
     * Examples demonstrating what the lint rule will pass and fail
     */
    codeExamples?: ICodeExample[];
}
export declare type RuleType = "functionality" | "maintainability" | "style" | "typescript";
export declare type RuleSeverity = "warning" | "error" | "off";
export interface ICodeExample {
    config: string;
    description: string;
    pass: string;
    fail?: string;
}
export interface IOptions {
    ruleArguments: any[];
    ruleSeverity: RuleSeverity;
    ruleName: string;
    /**
     * @deprecated
     * Tslint now handles disables itself.
     * This will be empty.
     */
    disabledIntervals: IDisabledInterval[];
}
/**
 * @deprecated
 * These are now handled internally.
 */
export interface IDisabledInterval {
    startPosition: number;
    endPosition: number;
}
export interface IRule {
    getOptions(): IOptions;
    isEnabled(): boolean;
    apply(sourceFile: ts.SourceFile): RuleFailure[];
    applyWithWalker(walker: IWalker): RuleFailure[];
}
export interface ITypedRule extends IRule {
    applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): RuleFailure[];
}
export interface IRuleFailureJson {
    endPosition: IRuleFailurePositionJson;
    failure: string;
    fix?: FixJson;
    name: string;
    ruleSeverity: string;
    ruleName: string;
    startPosition: IRuleFailurePositionJson;
}
export interface IRuleFailurePositionJson {
    character: number;
    line: number;
    position: number;
}
export declare function isTypedRule(rule: IRule): rule is ITypedRule;
export interface ReplacementJson {
    innerStart: number;
    innerLength: number;
    innerText: string;
}
export declare class Replacement {
    readonly start: number;
    readonly length: number;
    readonly text: string;
    static applyFixes(content: string, fixes: Fix[]): string;
    static applyAll(content: string, replacements: Replacement[]): string;
    static replaceNode(node: ts.Node, text: string, sourceFile?: ts.SourceFile): Replacement;
    static replaceFromTo(start: number, end: number, text: string): Replacement;
    static deleteText(start: number, length: number): Replacement;
    static deleteFromTo(start: number, end: number): Replacement;
    static appendText(start: number, text: string): Replacement;
    constructor(start: number, length: number, text: string);
    readonly end: number;
    apply(content: string): string;
    toJson(): ReplacementJson;
}
export declare class RuleFailurePosition {
    private readonly position;
    private readonly lineAndCharacter;
    constructor(position: number, lineAndCharacter: ts.LineAndCharacter);
    getPosition(): number;
    getLineAndCharacter(): ts.LineAndCharacter;
    toJson(): IRuleFailurePositionJson;
    equals(ruleFailurePosition: RuleFailurePosition): boolean;
}
export declare type Fix = Replacement | Replacement[];
export declare type FixJson = ReplacementJson | ReplacementJson[];
export declare class RuleFailure {
    private readonly sourceFile;
    private readonly failure;
    private readonly ruleName;
    private readonly fix;
    private readonly fileName;
    private readonly startPosition;
    private readonly endPosition;
    private readonly rawLines;
    private ruleSeverity;
    static compare(a: RuleFailure, b: RuleFailure): number;
    constructor(sourceFile: ts.SourceFile, start: number, end: number, failure: string, ruleName: string, fix?: Replacement | Replacement[] | undefined);
    getFileName(): string;
    getRuleName(): string;
    getStartPosition(): RuleFailurePosition;
    getEndPosition(): RuleFailurePosition;
    getFailure(): string;
    hasFix(): boolean;
    getFix(): Replacement | Replacement[] | undefined;
    getRawLines(): string;
    getRuleSeverity(): RuleSeverity;
    setRuleSeverity(value: RuleSeverity): void;
    toJson(): IRuleFailureJson;
    equals(ruleFailure: RuleFailure): boolean;
    private createFailurePosition(position);
}
