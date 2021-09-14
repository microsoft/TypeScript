declare namespace Intl {

    // http://cldr.unicode.org/index/cldr-spec/plural-rules#TOC-Determining-Plural-Categories
    type LDMLPluralRule = "zero" | "one" | "two" | "few" | "many" | "other";
    type PluralRuleType = "cardinal" | "ordinal";

    interface PluralRulesOptions {
        localeMatcher?: "lookup" | "best fit" | undefined;
        type?: PluralRuleType | undefined;
        minimumIntegerDigits?: number | undefined;
        minimumFractionDigits?: number | undefined;
        maximumFractionDigits?: number | undefined;
        minimumSignificantDigits?: number | undefined;
        maximumSignificantDigits?: number | undefined;
    }

    interface ResolvedPluralRulesOptions {
        locale: string;
        pluralCategories: LDMLPluralRule[];
        type: PluralRuleType;
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits?: number;
        maximumSignificantDigits?: number;
    }

    interface PluralRules {
        resolvedOptions(): ResolvedPluralRulesOptions;
        select(n: number): LDMLPluralRule;
    }

    const PluralRules: {
        new (locales?: string | string[], options?: PluralRulesOptions): PluralRules;
        (locales?: string | string[], options?: PluralRulesOptions): PluralRules;

        supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: "lookup" | "best fit" }): string[];
    };

    // We can only have one definition for 'type' in TypeScript, and so you can learn where the keys come from here:
    type ES2018NumberFormatPartType = "literal" | "nan" | "infinity" | "percent" | "integer" | "group" | "decimal" | "fraction" | "plusSign" | "minusSign" | "percentSign" | "currency" | "code" | "symbol" | "name";
    type ES2020NumberFormatPartType = "compact" | "exponentInteger" | "exponentMinusSign" | "exponentSeparator" | "unit" | "unknown";
    type NumberFormatPartType = ES2018NumberFormatPartType | ES2020NumberFormatPartType;

    interface NumberFormatPart {
        type: NumberFormatPartType;
        value: string;
    }

    interface NumberFormat {
        formatToParts(number?: number | bigint): NumberFormatPart[];
    }
}
