/// <reference path="..\..\..\services\patternMatcher.ts" />

describe("PatternMatcher", function () {
    describe("BreakIntoCharacterSpans", function () {
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

    describe("BreakIntoWordSpans", function () {
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
            const match = getFirstMatch("Foo", "Foo");

            assert.equal(ts.PatternMatchKind.exact, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveExactInsensitive", () => {
            const match = getFirstMatch("foo", "Foo");

            assert.equal(ts.PatternMatchKind.exact, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitivePrefix", () => {
            const match = getFirstMatch("Foo", "Fo");

            assert.equal(ts.PatternMatchKind.prefix, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitivePrefixCaseInsensitive", () => {
            const match = getFirstMatch("Foo", "fo");

            assert.equal(ts.PatternMatchKind.prefix, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveCamelCaseMatchSimple", () => {
            const match = getFirstMatch("FogBar", "FB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
            assertInRange(match.camelCaseWeight, 1, 1 << 30);
        });

        it("PreferCaseSensitiveCamelCaseMatchPartialPattern", () => {
            const match = getFirstMatch("FogBar", "FoB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveCamelCaseMatchToLongPattern1", () => {
            const match = getFirstMatch("FogBar", "FBB");

            assert.isTrue(match === undefined);
        });

        it("PreferCaseSensitiveCamelCaseMatchToLongPattern2", () => {
            const match = getFirstMatch("FogBar", "FoooB");

            assert.isTrue(match === undefined);
        });

        it("CamelCaseMatchPartiallyUnmatched", () => {
            const match = getFirstMatch("FogBarBaz", "FZ");

            assert.isTrue(match === undefined);
        });

        it("CamelCaseMatchCompletelyUnmatched", () => {
            const match = getFirstMatch("FogBarBaz", "ZZ");

            assert.isTrue(match === undefined);
        });

        it("TwoUppercaseCharacters", () => {
            const match = getFirstMatch("SimpleUIElement", "SiUI");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveLowercasePattern", () => {
            const match = getFirstMatch("FogBar", "b");

            assert.equal(ts.PatternMatchKind.substring, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveLowercasePattern2", () => {
            const match = getFirstMatch("FogBar", "fB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveTryUnderscoredName", () => {
            const match = getFirstMatch("_fogBar", "_fB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveTryUnderscoredName2", () => {
            const match = getFirstMatch("_fogBar", "fB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveTryUnderscoredNameInsensitive", () => {
            const match = getFirstMatch("_FogBar", "_fB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveMiddleUnderscore", () => {
            const match = getFirstMatch("Fog_Bar", "FB");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveMiddleUnderscore2", () => {
            const match = getFirstMatch("Fog_Bar", "F_B");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveMiddleUnderscore3", () => {
            const match = getFirstMatch("Fog_Bar", "F__B");

            assert.isTrue(undefined === match);
        });

        it("PreferCaseSensitiveMiddleUnderscore4", () => {
            const match = getFirstMatch("Fog_Bar", "f_B");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveMiddleUnderscore5", () => {
            const match = getFirstMatch("Fog_Bar", "F_b");

            assert.equal(ts.PatternMatchKind.camelCase, match.kind);
            assert.equal(false, match.isCaseSensitive);
        });

        it("PreferCaseSensitiveRelativeWeights1", () => {
            const match1 = getFirstMatch("FogBarBaz", "FB");
            const match2 = getFirstMatch("FooFlobBaz", "FB");

            // We should prefer something that starts at the beginning if possible
            assertInRange(match1.camelCaseWeight, match2.camelCaseWeight + 1, 1 << 30);
        });

        it("PreferCaseSensitiveRelativeWeights2", () => {
            const match1 = getFirstMatch("BazBarFooFooFoo", "FFF");
            const match2 = getFirstMatch("BazFogBarFooFoo", "FFF");

            // Contiguous things should also be preferred
            assertInRange(match1.camelCaseWeight, match2.camelCaseWeight + 1, 1 << 30);
        });

        it("PreferCaseSensitiveRelativeWeights3", () => {
            const match1 = getFirstMatch("FogBarFooFoo", "FFF");
            const match2 = getFirstMatch("BarFooFooFoo", "FFF");

            // The weight of being first should be greater than the weight of being contiguous
            assertInRange(match1.camelCaseWeight, match2.camelCaseWeight + 1, 1 << 30);
        });

        it("AllLowerPattern1", () => {
            const match = getFirstMatch("FogBarChangedEventArgs", "changedeventargs");

            assert.isTrue(undefined !== match);
        });

        it("AllLowerPattern2", () => {
            const match = getFirstMatch("FogBarChangedEventArgs", "changedeventarrrgh");

            assert.isTrue(undefined === match);
        });

        it("AllLowerPattern3", () => {
            const match = getFirstMatch("ABCDEFGH", "bcd");

            assert.isTrue(undefined !== match);
        });

        it("AllLowerPattern4", () => {
            const match = getFirstMatch("AbcdefghijEfgHij", "efghij");

            assert.isTrue(undefined === match);
        });
    });

    describe("MultiWordPattern", () => {
        it("ExactWithLowercase", () => {
            const matches = getAllMatches("AddMetadataReference", "addmetadatareference");

            assertContainsKind(ts.PatternMatchKind.exact, matches);
        });

        it("SingleLowercasedSearchWord1", () => {
            const matches = getAllMatches("AddMetadataReference", "add");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
        });

        it("SingleLowercasedSearchWord2", () => {
            const matches = getAllMatches("AddMetadataReference", "metadata");

            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("SingleUppercaseSearchWord1", () => {
            const matches = getAllMatches("AddMetadataReference", "Add");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
        });

        it("SingleUppercaseSearchWord2", () => {
            const matches = getAllMatches("AddMetadataReference", "Metadata");

            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("SingleUppercaseSearchLetter1", () => {
            const matches = getAllMatches("AddMetadataReference", "A");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
        });

        it("SingleUppercaseSearchLetter2", () => {
            const matches = getAllMatches("AddMetadataReference", "M");

            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("TwoLowercaseWords", () => {
            const matches = getAllMatches("AddMetadataReference", "add metadata");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("TwoLowercaseWords", () => {
            const matches = getAllMatches("AddMetadataReference", "A M");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("TwoLowercaseWords", () => {
            const matches = getAllMatches("AddMetadataReference", "AM");

            assertContainsKind(ts.PatternMatchKind.camelCase, matches);
        });

        it("TwoLowercaseWords", () => {
            const matches = getAllMatches("AddMetadataReference", "ref Metadata");

            assertArrayEquals(ts.map(matches, m => m.kind), [ts.PatternMatchKind.substring, ts.PatternMatchKind.substring]);
        });

        it("TwoLowercaseWords", () => {
            const matches = getAllMatches("AddMetadataReference", "ref M");

            assertArrayEquals(ts.map(matches, m => m.kind), [ts.PatternMatchKind.substring, ts.PatternMatchKind.substring]);
        });

        it("MixedCamelCase", () => {
            const matches = getAllMatches("AddMetadataReference", "AMRe");

            assertContainsKind(ts.PatternMatchKind.camelCase, matches);
        });

        it("BlankPattern", () => {
            const matches = getAllMatches("AddMetadataReference", "");

            assert.isTrue(matches === undefined);
        });

        it("WhitespaceOnlyPattern", () => {
            const matches = getAllMatches("AddMetadataReference", " ");

            assert.isTrue(matches === undefined);
        });

        it("EachWordSeparately1", () => {
            const matches = getAllMatches("AddMetadataReference", "add Meta");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("EachWordSeparately2", () => {
            const matches = getAllMatches("AddMetadataReference", "Add meta");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("EachWordSeparately3", () => {
            const matches = getAllMatches("AddMetadataReference", "Add Meta");

            assertContainsKind(ts.PatternMatchKind.prefix, matches);
            assertContainsKind(ts.PatternMatchKind.substring, matches);
        });

        it("MixedCasing", () => {
            const matches = getAllMatches("AddMetadataReference", "mEta");

            assert.isTrue(matches === undefined);
        });

        it("MixedCasing2", () => {
            const matches = getAllMatches("AddMetadataReference", "Data");

            assert.isTrue(matches === undefined);
        });

        it("AsteriskSplit", () => {
            const matches = getAllMatches("GetKeyWord", "K*W");

            assertArrayEquals(ts.map(matches, m => m.kind), [ts.PatternMatchKind.substring, ts.PatternMatchKind.substring]);
        });

        it("LowercaseSubstring1", () => {
            const matches = getAllMatches("Operator", "a");

            assert.isTrue(matches === undefined);
        });

        it("LowercaseSubstring2", () => {
            const matches = getAllMatches("FooAttribute", "a");
            assertContainsKind(ts.PatternMatchKind.substring, matches);
            assert.isFalse(matches[0].isCaseSensitive);
        });
    });

    describe("DottedPattern", () => {
        it("DottedPattern1", () => {
            const match = getFirstMatchForDottedPattern("Foo.Bar.Baz", "Quux", "B.Q");

            assert.equal(ts.PatternMatchKind.prefix, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("DottedPattern2", () => {
            const match = getFirstMatchForDottedPattern("Foo.Bar.Baz", "Quux", "C.Q");
            assert.isTrue(match === undefined);
        });

        it("DottedPattern3", () => {
            const match = getFirstMatchForDottedPattern("Foo.Bar.Baz", "Quux", "B.B.Q");
            assert.equal(ts.PatternMatchKind.prefix, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("DottedPattern4", () => {
            const match = getFirstMatchForDottedPattern("Foo.Bar.Baz", "Quux", "Baz.Quux");
            assert.equal(ts.PatternMatchKind.exact, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("DottedPattern5", () => {
            const match = getFirstMatchForDottedPattern("Foo.Bar.Baz", "Quux", "F.B.B.Quux");
            assert.equal(ts.PatternMatchKind.exact, match.kind);
            assert.equal(true, match.isCaseSensitive);
        });

        it("DottedPattern6", () => {
            const match = getFirstMatchForDottedPattern("Foo.Bar.Baz", "Quux", "F.F.B.B.Quux");
            assert.isTrue(match === undefined);
        });

        it("DottedPattern7", () => {
            let match = getFirstMatch("UIElement", "UIElement");
            match = getFirstMatch("GetKeyword", "UIElement");
            assert.isTrue(match === undefined);
        });
    });

    function getFirstMatch(candidate: string, pattern: string): ts.PatternMatch {
        const matches = ts.createPatternMatcher(pattern).getMatchesForLastSegmentOfPattern(candidate);
        return matches ? matches[0] : undefined;
    }

    function getAllMatches(candidate: string, pattern: string): ts.PatternMatch[] {
        return ts.createPatternMatcher(pattern).getMatchesForLastSegmentOfPattern(candidate);
    }

    function getFirstMatchForDottedPattern(dottedContainer: string, candidate: string, pattern: string): ts.PatternMatch {
        const matches = ts.createPatternMatcher(pattern).getMatches(dottedContainer.split("."), candidate);
        return matches ? matches[0] : undefined;
    }

    function spanListToSubstrings(identifier: string, spans: ts.TextSpan[]) {
        return ts.map(spans, s => identifier.substr(s.start, s.length));
    }

    function breakIntoCharacterSpans(identifier: string) {
        return spanListToSubstrings(identifier, ts.breakIntoCharacterSpans(identifier));
    }

    function breakIntoWordSpans(identifier: string) {
        return spanListToSubstrings(identifier, ts.breakIntoWordSpans(identifier));
    }
    function assertArrayEquals<T>(array1: T[], array2: T[]) {
        assert.equal(array1.length, array2.length);

        for (let i = 0; i < array1.length; i++) {
            assert.equal(array1[i], array2[i]);
        }
    }

    function assertInRange(val: number, low: number, high: number) {
        assert.isTrue(val >= low);
        assert.isTrue(val <= high);
    }

    function verifyBreakIntoCharacterSpans(original: string, ...parts: string[]): void {
        assertArrayEquals(parts, breakIntoCharacterSpans(original));
    }

    function verifyBreakIntoWordSpans(original: string, ...parts: string[]): void {
        assertArrayEquals(parts, breakIntoWordSpans(original));
    }

    function assertContainsKind(kind: ts.PatternMatchKind, results: ts.PatternMatch[]) {
        assert.isTrue(ts.forEach(results, r => r.kind === kind));
    }
});
