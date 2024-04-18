declare namespace Intl {
    interface DateTimeFormatOptionsTimeZoneNameRegistry {
        shortOffset: never;
        longOffset: never;
        shortGeneric: never;
        longGeneric: never;
    }

    interface DisplayNamesOptionsTypeRegistry {
        calendar: never;
        dateTimeField: never;
    }

    type DisplayNamesOptionsLanguageDisplay = "dialect" | "standard";

    interface DisplayNamesOptions {
        languageDisplay?: DisplayNamesOptionsLanguageDisplay | undefined;
    }

    interface ResolvedDisplayNamesOptions {
        languageDisplay?: DisplayNamesOptionsLanguageDisplay;
    }

    type SegmenterOptionsGranularity = "grapheme" | "word" | "sentence";

    interface SegmenterOptions {
        localeMatcher?: LocaleMatcherAlgorithm | undefined;
        granularity?: SegmenterOptionsGranularity | undefined;
    }

    interface ResolvedSegmenterOptions {
        locale: string;
        granularity: SegmenterOptionsGranularity;
    }

    interface Segments {
        /**
         * Fetches data for the specified segment.
         * @param codeUnitIndex The segment index to fetch. If omitted, defaults to `0`. If the index does not exist, returns `undefined`.
         */
        containing(codeUnitIndex?: number): SegmentData | undefined;

        [Symbol.iterator](): IterableIterator<SegmentData>;
    }

    interface SegmentData {
        segment: string;
        index: number;
        input: string;
        isWordLike?: boolean;
    }

    interface Segmenter {
        /**
         * Segments a string, according to the selected locale and parsing options.
         * @param input The string to parse.
         */
        segment(input: string): Segments;

        /** Returns the locale and options computed during initialization of the `Segmenter`. */
        resolvedOptions(): ResolvedSegmenterOptions;
    }

    interface SegmenterConstructor {
        new (locales?: LocalesArgument, options?: SegmenterOptions): Segmenter;
        readonly prototype: Segmenter;

        /**
         * Takes a list of locales, and returns the subset of locale identifiers that are supported by the current implementation of `Segmenter`.
         * If none of the provided locales are supported, an empty array is returned.
         * @param locales A locale, or list of locales.
         * @param options Options for the locale matching algorithm.
         */
        supportedLocalesOf(locales?: LocalesArgument, options?: SupportedLocalesOptions): string[];
    }

    var Segmenter: SegmenterConstructor;
}
