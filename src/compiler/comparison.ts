/// <reference path="types.ts" />

/* @internal */
namespace ts {
    export function equateValues<T>(a: T, b: T) {
        return a === b;
    }

    /**
     * Compare the equality of two strings using a case-sensitive ordinal comparison.
     *
     * Case-sensitive comparisons compare both strings one code-point at a time using the integer
     * value of each code-point after applying `toUpperCase` to each string. We always map both
     * strings to their upper-case form as some unicode characters do not properly round-trip to
     * lowercase (such as `ẞ` (German sharp capital s)).
     */
    export function equateStringsCaseInsensitive(a: string, b: string) {
        return a === b
            || a !== undefined
            && b !== undefined
            && a.toUpperCase() === b.toUpperCase();
    }

    /**
     * Compare the equality of two strings using a case-sensitive ordinal comparison.
     *
     * Case-sensitive comparisons compare both strings one code-point at a time using the
     * integer value of each code-point.
     */
    export function equateStringsCaseSensitive(a: string, b: string) {
        return equateValues(a, b);
    }

    function compareComparableValues(a: string, b: string): Comparison;
    function compareComparableValues(a: number, b: number): Comparison;
    function compareComparableValues(a: string | number, b: string | number) {
        return a === b ? Comparison.EqualTo :
            a === undefined ? Comparison.LessThan :
            b === undefined ? Comparison.GreaterThan :
            a < b ? Comparison.LessThan :
            Comparison.GreaterThan;
    }

    /**
     * Compare two numeric values for their order relative to each other.
     * To compare strings, use any of the `compareStrings` functions.
     */
    export function compareValues(a: number, b: number) {
        return compareComparableValues(a, b);
    }

    /**
     * Compare two strings using a case-insensitive ordinal comparison.
     *
     * Ordinal comparisons are based on the difference between the unicode code points of both
     * strings. Characters with multiple unicode representations are considered unequal. Ordinal
     * comparisons provide predictable ordering, but place "a" after "B".
     *
     * Case-insensitive comparisons compare both strings one code-point at a time using the integer
     * value of each code-point after applying `toUpperCase` to each string. We always map both
     * strings to their upper-case form as some unicode characters do not properly round-trip to
     * lowercase (such as `ẞ` (German sharp capital s)).
     */
    export function compareStringsCaseInsensitive(a: string, b: string) {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        a = a.toUpperCase();
        b = b.toUpperCase();
        return a < b ? Comparison.LessThan : a > b ? Comparison.GreaterThan : Comparison.EqualTo;
    }

    /**
     * Compare two strings using a case-sensitive ordinal comparison.
     *
     * Ordinal comparisons are based on the difference between the unicode code points of both
     * strings. Characters with multiple unicode representations are considered unequal. Ordinal
     * comparisons provide predictable ordering, but place "a" after "B".
     *
     * Case-sensitive comparisons compare both strings one code-point at a time using the integer
     * value of each code-point.
     */
    export function compareStringsCaseSensitive(a: string, b: string) {
        return compareComparableValues(a, b);
    }

    /**
     * Creates a string comparer for use with string collation in the UI.
     */
    const createUIStringComparer = (() => {
        let defaultComparer: Comparer<string> | undefined;
        let enUSComparer: Comparer<string> | undefined;

        const stringComparerFactory = getStringComparerFactory();
        return createStringComparer;

        function compareWithCallback(a: string | undefined, b: string | undefined, comparer: (a: string, b: string) => number) {
            if (a === b) return Comparison.EqualTo;
            if (a === undefined) return Comparison.LessThan;
            if (b === undefined) return Comparison.GreaterThan;
            const value = comparer(a, b);
            return value < 0 ? Comparison.LessThan : value > 0 ? Comparison.GreaterThan : Comparison.EqualTo;
        }

        function createIntlCollatorStringComparer(locale: string | undefined): Comparer<string> {
            // Intl.Collator.prototype.compare is bound to the collator. See NOTE in
            // http://www.ecma-international.org/ecma-402/2.0/#sec-Intl.Collator.prototype.compare
            const comparer = new Intl.Collator(locale, { usage: "sort", sensitivity: "variant" }).compare;
            return (a, b) => compareWithCallback(a, b, comparer);
        }

        function createLocaleCompareStringComparer(locale: string | undefined): Comparer<string> {
            // if the locale is not the default locale (`undefined`), use the fallback comparer.
            if (locale !== undefined) return createFallbackStringComparer();

            return (a, b) => compareWithCallback(a, b, compareStrings);

            function compareStrings(a: string, b: string) {
                return a.localeCompare(b);
            }
        }

        function createFallbackStringComparer(): Comparer<string> {
            // An ordinal comparison puts "A" after "b", but for the UI we want "A" before "b".
            // We first sort case insensitively.  So "Aaa" will come before "baa".
            // Then we sort case sensitively, so "aaa" will come before "Aaa".
            //
            // For case insensitive comparisons we always map both strings to their
            // upper-case form as some unicode characters do not properly round-trip to
            // lowercase (such as `ẞ` (German sharp capital s)).
            return (a, b) => compareWithCallback(a, b, compareDictionaryOrder);

            function compareDictionaryOrder(a: string, b: string) {
                return compareStrings(a.toUpperCase(), b.toUpperCase()) || compareStrings(a, b);
            }

            function compareStrings(a: string, b: string) {
                return a < b ? Comparison.LessThan : a > b ? Comparison.GreaterThan : Comparison.EqualTo;
            }
        }

        function getStringComparerFactory() {
            // If the host supports Intl, we use it for comparisons using the default locale.
            if (typeof Intl === "object" && typeof Intl.Collator === "function") {
                return createIntlCollatorStringComparer;
            }

            // If the host does not support Intl, we fall back to localeCompare.
            // localeCompare in Node v0.10 is just an ordinal comparison, so don't use it.
            if (typeof String.prototype.localeCompare === "function" &&
                typeof String.prototype.toLocaleUpperCase === "function" &&
                "a".localeCompare("B") < 0) {
                return createLocaleCompareStringComparer;
            }

            // Otherwise, fall back to ordinal comparison:
            return createFallbackStringComparer;
        }

        function createStringComparer(locale: string | undefined) {
            // Hold onto common string comparers. This avoids constantly reallocating comparers during
            // tests.
            if (locale === undefined) {
                return defaultComparer || (defaultComparer = stringComparerFactory(locale));
            }
            else if (locale === "en-US") {
                return enUSComparer || (enUSComparer = stringComparerFactory(locale));
            }
            else {
                return stringComparerFactory(locale);
            }
        }
    })();

    let uiComparerCaseSensitive: Comparer<string> | undefined;
    let uiLocale: string | undefined;

    export function getUILocale() {
        return uiLocale;
    }

    export function setUILocale(value: string) {
        if (uiLocale !== value) {
            uiLocale = value;
            uiComparerCaseSensitive = undefined;
        }
    }

    /**
     * Compare two strings in a using the case-sensitive sort behavior of the UI locale.
     *
     * Ordering is not predictable between different host locales, but is best for displaying
     * ordered data for UI presentation. Characters with multiple unicode representations may
     * be considered equal.
     *
     * Case-sensitive comparisons compare strings that differ in base characters, or
     * accents/diacritic marks, or case as unequal.
     */
    export function compareStringsCaseSensitiveUI(a: string, b: string) {
        const comparer = uiComparerCaseSensitive || (uiComparerCaseSensitive = createUIStringComparer(uiLocale));
        return comparer(a, b);
    }

    export function compareProperties<T, K extends keyof T>(a: T, b: T, key: K, comparer: Comparer<T[K]>) {
        return a === b ? Comparison.EqualTo :
            a === undefined ? Comparison.LessThan :
            b === undefined ? Comparison.GreaterThan :
            comparer(a[key], b[key]);
    }
}
