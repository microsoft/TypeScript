import { IOptions, IRule, RuleConstructor } from "./language/rule/rule";
export declare function loadRules(ruleOptionsList: IOptions[], rulesDirectories?: string | string[], isJs?: boolean): IRule[];
/** @internal private API */
export declare function findRule(name: string, rulesDirectories?: string | string[]): RuleConstructor | undefined;
