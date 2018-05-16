import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.TypedRule {
    static metadata: Lint.IRuleMetadata;
    applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[];
}
export declare type Location = ts.PrefixUnaryExpression | ts.IfStatement | ts.WhileStatement | ts.DoStatement | ts.ForStatement | ts.ConditionalExpression | ts.BinaryExpression;
export declare const enum TypeFailure {
    AlwaysTruthy = 0,
    AlwaysFalsy = 1,
    String = 2,
    Number = 3,
    Null = 4,
    Undefined = 5,
    Enum = 6,
    Mixes = 7,
}
declare module "typescript" {
    interface IntrinsicType extends ts.Type {
        intrinsicName: string;
    }
}
