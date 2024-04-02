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
        localeMatcher?: "best fit" | "lookup" | undefined;
        granularity?: SegmenterOptionsGranularity | undefined;
    }

    interface ResolvedSegmenterOptions {
        locale: string;
        granularity: SegmenterOptionsGranularity;
    }

    interface Segments {
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
        segment(input: string): Segments;
        resolvedOptions(): ResolvedSegmenterOptions;
    }

    interface SegmenterConstructor {
        new (locales?: LocalesArgument, options?: SegmenterOptions): Segmenter;
        supportedLocalesOf(locales: LocalesArgument, options?: SegmenterOptions): string[];
        readonly prototype: Segmenter;
    }

    var Segmenter: SegmenterConstructor;
}
