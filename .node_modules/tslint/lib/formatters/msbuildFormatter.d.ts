import { AbstractFormatter } from "../language/formatter/abstractFormatter";
import { IFormatterMetadata } from "../language/formatter/formatter";
import { RuleFailure } from "../language/rule/rule";
export declare class Formatter extends AbstractFormatter {
    static metadata: IFormatterMetadata;
    format(failures: RuleFailure[]): string;
}
