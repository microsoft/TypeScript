import * as ts from "../../_namespaces/ts.js";

describe("unittests:: services:: PatternMatcher", () => {
    describe("BreakIntoCharacterSpans", () => {
        it("EmptyIdentifier", () => {
            verifyBreakIntoCharacterSpans("");
        });

        it("SimpleIdentifier", () => {
            verifyBreakIntoCharacterSpans("foo", "foo");
        });

        it("PrefixUnderscoredIdentifier", () => {
            verifyBreakIntoCharacterSpans("_foo", "_", "foo");
        });

        it("UnderscoredIdentifier", () => {
            verifyBreakIntoCharacterSpans("f_oo", "f", "_", "oo");
        });

        it("PostfixUnderscoredIdentifier", () => {
            verifyBreakIntoCharacterSpans("foo_", "foo", "_");
        });

        it("PrefixUnderscoredIdentifierWithCapital", () => {
            verifyBreakIntoCharacterSpans("_Foo", "_", "Foo");
        });

        it("MUnderscorePrefixed", () => {
            verifyBreakIntoCharacterSpans("m_foo", "m", "_", "foo");
        });

        it("CamelCaseIdentifier", () => {
            verifyBreakIntoCharacterSpans("FogBar", "Fog", "Bar");
        });

        it("MixedCaseIdentifier", () => {
            verifyBreakIntoCharacterSpans("fogBar", "fog", "Bar");
        });

        it("TwoCharacterCapitalIdentifier", () => {
            verifyBreakIntoCharacterSpans("UIElement", "U", "I", "Element");
        });

        it("NumberSuffixedIdentifier", () => {
            verifyBreakIntoCharacterSpans("Foo42", "Foo", "42");
        });

        it("NumberContainingIdentifier", () => {
            verifyBreakIntoCharacterSpans("Fog42Bar", "Fog", "42", "Bar");
        });

        it("NumberPrefixedIdentifier", () => {
            verifyBreakIntoCharacterSpans("42Bar", "42", "Bar");
        });
    });

    describe("BreakIntoWordSpans", () => {
        it("VarbatimIdentifier", () => {
            verifyBreakIntoWordSpans("@int:", "int");
        });

        it("AllCapsConstant", () => {
            verifyBreakIntoWordSpans("C_STYLE_CONSTANT", "C", "_", "STYLE", "_", "CONSTANT");
        });

        it("SingleLetterPrefix1", () => {
            verifyBreakIntoWordSpans("UInteger", "U", "Integer");
        });

        it("SingleLetterPrefix2", () => {
            verifyBreakIntoWordSpans("IDisposable", "I", "Disposable");
        });

        it("TwoCharacterCapitalIdentifier", () => {
            verifyBreakIntoWordSpans("UIElement", "UI", "Element");
        });

        it("XDocument", () => {
            verifyBreakIntoWordSpans("XDocument", "X", "Document");
        });

        it("XMLDocument1", () => {
            verifyBreakIntoWordSpans("XMLDocument", "XML", "Document");
        });

        it("XMLDocument2", () => {
            verifyBreakIntoWordSpans("XmlDocument", "Xml", "Document");
        });

        it("TwoUppercaseCharacters", () => {
            verifyBreakIntoWordSpans("SimpleUIElement", "Simple", "UI", "Element");
        });
    });

    describe("SingleWordPattern", () => {
        it("PreferCaseSensitiveExact", () => {
            assertSegmentMatch("Foo", "Foo", { kind: ts.PatternMatchKind.exact, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveExactInsensitive", () => {
            assertSegmentMatch("foo", "Foo", { kind: ts.PatternMatchKind.exact, isCaseSensitive: false });
        });

        it("PreferCaseSensitivePrefix", () => {
            assertSegmentMatch("Foo", "Fo", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("PreferCaseSensitivePrefixCaseInsensitive", () => {
            assertSegmentMatch("Foo", "fo", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: false });
        });

        it("PreferCaseSensitiveCamelCaseMatchSimple", () => {
            assertSegmentMatch("FogBar", "FB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveCamelCaseMatchPartialPattern", () => {
            assertSegmentMatch("FogBar", "FoB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveCamelCaseMatchToLongPattern1", () => {
            assertSegmentMatch("FogBar", "FBB", undefined);
        });

        it("PreferCaseSensitiveCamelCaseMatchToLongPattern2", () => {
            assertSegmentMatch("FogBar", "FoooB", undefined);
        });

        it("CamelCaseMatchPartiallyUnmatched", () => {
            assertSegmentMatch("FogBarBaz", "FZ", undefined);
        });

        it("CamelCaseMatchCompletelyUnmatched", () => {
            assertSegmentMatch("FogBarBaz", "ZZ", undefined);
        });

        it("TwoUppercaseCharacters", () => {
            assertSegmentMatch("SimpleUIElement", "SiUI", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveLowercasePattern", () => {
            assertSegmentMatch("FogBar", "b", { kind: ts.PatternMatchKind.substring, isCaseSensitive: false });
        });

        it("PreferCaseSensitiveLowercasePattern2", () => {
            assertSegmentMatch("FogBar", "fB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: false });
        });

        it("PreferCaseSensitiveTryUnderscoredName", () => {
            assertSegmentMatch("_fogBar", "_fB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveTryUnderscoredName2", () => {
            assertSegmentMatch("_fogBar", "fB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveTryUnderscoredNameInsensitive", () => {
            assertSegmentMatch("_FogBar", "_fB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: false });
        });

        it("PreferCaseSensitiveMiddleUnderscore", () => {
            assertSegmentMatch("Fog_Bar", "FB", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveMiddleUnderscore2", () => {
            assertSegmentMatch("Fog_Bar", "F_B", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("PreferCaseSensitiveMiddleUnderscore3", () => {
            assertSegmentMatch("Fog_Bar", "F__B", undefined);
        });

        it("PreferCaseSensitiveMiddleUnderscore4", () => {
            assertSegmentMatch("Fog_Bar", "f_B", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: false });
        });

        it("PreferCaseSensitiveMiddleUnderscore5", () => {
            assertSegmentMatch("Fog_Bar", "F_b", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: false });
        });

        it("AllLowerPattern1", () => {
            assertSegmentMatch("FogBarChangedEventArgs", "changedeventargs", { kind: ts.PatternMatchKind.substring, isCaseSensitive: false });
        });

        it("AllLowerPattern2", () => {
            assertSegmentMatch("FogBarChangedEventArgs", "changedeventarrrgh", undefined);
        });

        it("AllLowerPattern3", () => {
            assertSegmentMatch("ABCDEFGH", "bcd", { kind: ts.PatternMatchKind.substring, isCaseSensitive: false });
        });

        it("AllLowerPattern4", () => {
            assertSegmentMatch("AbcdefghijEfgHij", "efghij", undefined);
        });
    });

    describe("MultiWordPattern", () => {
        it("ExactWithLowercase", () => {
            assertSegmentMatch("AddMetadataReference", "addmetadatareference", { kind: ts.PatternMatchKind.exact, isCaseSensitive: false });
        });

        it("SingleLowercasedSearchWord1", () => {
            assertSegmentMatch("AddMetadataReference", "add", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: false });
        });

        it("SingleLowercasedSearchWord2", () => {
            assertSegmentMatch("AddMetadataReference", "metadata", { kind: ts.PatternMatchKind.substring, isCaseSensitive: false });
        });

        it("SingleUppercaseSearchWord1", () => {
            assertSegmentMatch("AddMetadataReference", "Add", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("SingleUppercaseSearchWord2", () => {
            assertSegmentMatch("AddMetadataReference", "Metadata", { kind: ts.PatternMatchKind.substring, isCaseSensitive: true });
        });

        it("SingleUppercaseSearchLetter1", () => {
            assertSegmentMatch("AddMetadataReference", "A", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("SingleUppercaseSearchLetter2", () => {
            assertSegmentMatch("AddMetadataReference", "M", { kind: ts.PatternMatchKind.substring, isCaseSensitive: true });
        });

        it("TwoLowercaseWords0", () => {
            assertSegmentMatch("AddMetadataReference", "add metadata", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: false });
        });

        it("TwoLowercaseWords1", () => {
            assertSegmentMatch("AddMetadataReference", "A M", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("TwoLowercaseWords2", () => {
            assertSegmentMatch("AddMetadataReference", "AM", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("TwoLowercaseWords3", () => {
            assertSegmentMatch("AddMetadataReference", "ref Metadata", { kind: ts.PatternMatchKind.substring, isCaseSensitive: true });
        });

        it("TwoLowercaseWords4", () => {
            assertSegmentMatch("AddMetadataReference", "ref M", { kind: ts.PatternMatchKind.substring, isCaseSensitive: true });
        });

        it("MixedCamelCase", () => {
            assertSegmentMatch("AddMetadataReference", "AMRe", { kind: ts.PatternMatchKind.camelCase, isCaseSensitive: true });
        });

        it("EachWordSeparately1", () => {
            assertSegmentMatch("AddMetadataReference", "add Meta", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: false });
        });

        it("EachWordSeparately2", () => {
            assertSegmentMatch("AddMetadataReference", "Add meta", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("EachWordSeparately3", () => {
            assertSegmentMatch("AddMetadataReference", "Add Meta", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("MixedCasing", () => {
            assertSegmentMatch("AddMetadataReference", "mEta", undefined);
        });

        it("MixedCasing2", () => {
            assertSegmentMatch("AddMetadataReference", "Data", undefined);
        });

        it("AsteriskSplit", () => {
            assertSegmentMatch("GetKeyWord", "K*W", { kind: ts.PatternMatchKind.substring, isCaseSensitive: true });
        });

        it("LowercaseSubstring1", () => {
            assertSegmentMatch("Operator", "a", undefined);
        });

        it("LowercaseSubstring2", () => {
            assertSegmentMatch("FooAttribute", "a", { kind: ts.PatternMatchKind.substring, isCaseSensitive: false });
        });
    });

    describe("DottedPattern", () => {
        it("DottedPattern1", () => {
            assertFullMatch("Foo.Bar.Baz", "Quux", "B.Q", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("DottedPattern2", () => {
            assertFullMatch("Foo.Bar.Baz", "Quux", "C.Q", undefined);
        });

        it("DottedPattern3", () => {
            assertFullMatch("Foo.Bar.Baz", "Quux", "B.B.Q", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("DottedPattern4", () => {
            assertFullMatch("Foo.Bar.Baz", "Quux", "Baz.Quux", { kind: ts.PatternMatchKind.exact, isCaseSensitive: true });
        });

        it("DottedPattern5", () => {
            assertFullMatch("Foo.Bar.Baz", "Quux", "F.B.B.Quux", { kind: ts.PatternMatchKind.prefix, isCaseSensitive: true });
        });

        it("DottedPattern6", () => {
            assertFullMatch("Foo.Bar.Baz", "Quux", "F.F.B.B.Quux", undefined);
        });

        it("DottedPattern7", () => {
            assertSegmentMatch("UIElement", "UIElement", { kind: ts.PatternMatchKind.exact, isCaseSensitive: true });
            assertSegmentMatch("GetKeyword", "UIElement", undefined);
        });
    });

    function assertSegmentMatch(candidate: string, pattern: string, expected: ts.PatternMatch | undefined): void {
        assert.deepEqual(ts.createPatternMatcher(pattern)!.getMatchForLastSegmentOfPattern(candidate), expected);
    }

    function assertFullMatch(dottedContainer: string, candidate: string, pattern: string, expected: ts.PatternMatch | undefined): void {
        assert.deepEqual(ts.createPatternMatcher(pattern)!.getFullMatch(dottedContainer.split("."), candidate), expected);
    }

    function spanListToSubstrings(identifier: string, spans: ts.TextSpan[]) {
        return spans.map(s => identifier.substr(s.start, s.length));
    }

    function breakIntoCharacterSpans(identifier: string) {
        return spanListToSubstrings(identifier, ts.breakIntoCharacterSpans(identifier));
    }

    function breakIntoWordSpans(identifier: string) {
        return spanListToSubstrings(identifier, ts.breakIntoWordSpans(identifier));
    }

    function verifyBreakIntoCharacterSpans(original: string, ...parts: string[]): void {
        assert.deepEqual(parts, breakIntoCharacterSpans(original));
    }

    function verifyBreakIntoWordSpans(original: string, ...parts: string[]): void {
        assert.deepEqual(parts, breakIntoWordSpans(original));
    }
});
