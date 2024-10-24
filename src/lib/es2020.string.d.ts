/// <reference lib="es2015.iterable" />
/// <reference lib="es2020.intl" />
/// <reference lib="es2020.symbol.wellknown" />

interface String {
    /**
     * Matches a string with the regular expression.
     * @param regexp The regular expression for searching. If the provided value is not a RegExp,
     * it is implicitly converted to a RegExp with the the global (`g`) flag set by `new RegExp(regexp, "g")`.
     * @returns An iterable of {@linkcode RegExpMatchArray} that contains all the matched substrings.
     * @throws A {@linkcode TypeError} if the global (`g`) flag is not set on the RegExp.
     */
    matchAll<
        CapturingGroups extends CapturingGroupsArray = CapturingGroupsArray,
        NamedCapturingGroups extends NamedCapturingGroupsObject = NamedCapturingGroupsObject,
        Flags extends Partial<RegExpFlags> & { readonly global: true; } = RegExpFlags & { readonly global: true; },
    >(regexp: RegExp<CapturingGroups, NamedCapturingGroups, Flags> | string): RegExpStringIterator<RegExpExecArray<CapturingGroups, NamedCapturingGroups, Flags>>;

    /**
     * Converts all alphabetic characters in a string to lowercase, taking locale-specific conversion rules into account.
     * @param locales A locale string or array of locale strings that contain one or more BCP 47 language tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the host environment is used.
     */
    toLocaleLowerCase(locales?: string | string[] | Intl.LocalesArgument): string;

    /**
     * Converts all alphabetic characters in a string to uppercase, taking locale-specific conversion rules into account.
     * @param locales A locale string or array of locale strings that contain one or more BCP 47 language tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the host environment is used.
     */
    toLocaleUpperCase(locales?: string | string[] | Intl.LocalesArgument): string;

    /**
     * Determines whether two strings are equivalent in the current or specified locale.
     * @param that String to compare to target string
     * @param locales A locale string or array of locale strings that contain one or more BCP 47 language tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the host environment is used.
     * @param options An object that contains one or more properties that specify comparison options.
     */
    localeCompare(that: string, locales?: string | string[] | Intl.LocalesArgument, options?: Intl.CollatorOptions): number;
}
