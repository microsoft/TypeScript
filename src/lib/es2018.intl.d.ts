declare namespace Intl {
    interface PluralRulesOptions {
        localeMatcher?: 'lookup' | 'best fit';
        type?: 'cardinal' | 'ordinal';
    }

    interface ResolvedPluralRulesOptions {
        locale: string;
        pluralCategories: string[];
        type: 'cardinal' | 'ordinal';
        minimumIntegerDigits: number;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        minimumSignificantDigits: number;
        maximumSignificantDigits: number;
    }

    interface PluralRules {
        resolvedOptions(): ResolvedPluralRulesOptions;
        select(n: number): string;
    }

    const PluralRules: {
        new (locales?: string | string[], options?: PluralRulesOptions): PluralRules;
        (locales?: string | string[], options?: PluralRulesOptions): PluralRules;
        supportedLocalesOf(
            locales: string | string[],
            options?: PluralRulesOptions,
        ): string[];
    };
}
