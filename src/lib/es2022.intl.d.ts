declare namespace Intl {
    /**
     * An object with some or all properties of the `Intl.Segmenter` constructor `options` parameter.
     *
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter#parameters)
     */
    interface SegmenterOptions {
        /** The locale matching algorithm to use. For information about this option, see [Intl page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation). */
        localeMatcher?: "best fit" | "lookup" | undefined;
        /** The type of input to be split */
        granularity?: "grapheme" | "word" | "sentence" | undefined;
    }

    interface Segmenter {
        /**
         * Returns `Segments` object containing the segments of the input string, using the segmenter's locale and granularity.
         *
         * @param input - The text to be segmented as a `string`.
         *
         * @returns A new iterable Segments object containing the segments of the input string, using the segmenter's locale and granularity.
         */
        segment(input: string): Segments;
        resolvedOptions(): ResolvedSegmenterOptions;
    }

    interface ResolvedSegmenterOptions {
        locale: string;
        granularity: "grapheme" | "word" | "sentence";
    }

    interface SegmentIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
        [Symbol.iterator](): SegmentIterator<T>;
    }

    interface Segments {
        /**
         * Returns an object describing the segment in the original string that includes the code unit at a specified index.
         *
         * @param codeUnitIndex - A number specifying the index of the code unit in the original input string. If the value is omitted, it defaults to `0`.
         */
        containing(codeUnitIndex?: number): SegmentData;

        /** Returns an iterator to iterate over the segments. */
        [Symbol.iterator](): SegmentIterator<SegmentData>;
    }

    interface SegmentData {
        /** A string containing the segment extracted from the original input string. */
        segment: string;
        /** The code unit index in the original input string at which the segment begins. */
        index: number;
        /** The complete input string that was segmented. */
        input: string;
        /**
         * A boolean value only if granularity is "word"; otherwise, undefined.
         * If granularity is "word", then isWordLike is true when the segment is word-like (i.e., consists of letters/numbers/ideographs/etc.); otherwise, false.
         */
        isWordLike?: boolean;
    }

    const Segmenter: {
        prototype: Segmenter;

        /**
         * Creates a new `Intl.Segmenter` object.
         *
         * @param locales - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such strings.
         *  For the general form and interpretation of the `locales` argument,
         *  see the [`Intl` page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
         *
         * @param options - An [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter#parameters)
         *  with some or all options of `SegmenterOptions`.
         *
         * @returns [Intl.Segmenter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segments) object.
         *
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter).
         */
        new (locales?: LocalesArgument, options?: SegmenterOptions): Segmenter;

        /**
         * Returns an array containing those of the provided locales that are supported without having to fall back to the runtime's default locale.
         *
         * @param locales - A string with a [BCP 47 language tag](http://tools.ietf.org/html/rfc5646), or an array of such strings.
         *  For the general form and interpretation of the `locales` argument,
         *  see the [`Intl` page](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation).
         *
         * @param options An [object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/supportedLocalesOf#parameters).
         *  with some or all possible options.
         *
         * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/supportedLocalesOf)
         */
        supportedLocalesOf(locales: LocalesArgument, options?: Pick<SegmenterOptions, "localeMatcher">): UnicodeBCP47LocaleIdentifier[];
    };

    /**
     * Returns a sorted array of the supported collation, calendar, currency, numbering system, timezones, and units by the implementation.
     * [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf)
     *
     * @param key A string indicating the category of values to return.
     * @returns A sorted array of the supported values.
     */
    function supportedValuesOf(key: "calendar" | "collation" | "currency" | "numberingSystem" | "timeZone" | "unit"): string[];
}
