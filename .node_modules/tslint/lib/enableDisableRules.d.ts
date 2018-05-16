import * as ts from "typescript";
import { RuleFailure } from "./language/rule/rule";
/**
 * regex is: start of string followed by any amount of whitespace
 * followed by tslint and colon
 * followed by either "enable" or "disable"
 * followed optionally by -line or -next-line
 * followed by either colon, whitespace or end of string
 */
export declare const ENABLE_DISABLE_REGEX: RegExp;
export declare function removeDisabledFailures(sourceFile: ts.SourceFile, failures: RuleFailure[]): RuleFailure[];
