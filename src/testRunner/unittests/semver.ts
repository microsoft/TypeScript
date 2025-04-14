import * as ts from "../_namespaces/ts.js";
import * as Utils from "../_namespaces/Utils.js";

import theory = Utils.theory;
describe("unittests:: semver", () => {
    describe("Version", () => {
        function assertVersion(version: ts.Version, [major, minor, patch, prerelease, build]: [number, number, number, string[]?, string[]?]) {
            assert.strictEqual(version.major, major);
            assert.strictEqual(version.minor, minor);
            assert.strictEqual(version.patch, patch);
            assert.deepEqual(version.prerelease, prerelease || ts.emptyArray);
            assert.deepEqual(version.build, build || ts.emptyArray);
        }
        describe("new", () => {
            it("text", () => {
                assertVersion(new ts.Version("1.2.3-pre.4+build.5"), [1, 2, 3, ["pre", "4"], ["build", "5"]]);
            });
            it("parts", () => {
                assertVersion(new ts.Version(1, 2, 3, "pre.4", "build.5"), [1, 2, 3, ["pre", "4"], ["build", "5"]]);
                assertVersion(new ts.Version(1, 2, 3, ["pre", "4"], ["build", "5"]), [1, 2, 3, ["pre", "4"], ["build", "5"]]);
                assertVersion(new ts.Version(1, 2, 3), [1, 2, 3]);
                assertVersion(new ts.Version(1, 2), [1, 2, 0]);
                assertVersion(new ts.Version(1), [1, 0, 0]);
            });
        });
        it("toString", () => {
            assert.strictEqual(new ts.Version(1, 2, 3, "pre.4", "build.5").toString(), "1.2.3-pre.4+build.5");
            assert.strictEqual(new ts.Version(1, 2, 3, "pre.4").toString(), "1.2.3-pre.4");
            assert.strictEqual(new ts.Version(1, 2, 3, /*prerelease*/ undefined, "build.5").toString(), "1.2.3+build.5");
            assert.strictEqual(new ts.Version(1, 2, 3).toString(), "1.2.3");
            assert.strictEqual(new ts.Version(1, 2).toString(), "1.2.0");
            assert.strictEqual(new ts.Version(1).toString(), "1.0.0");
        });
        it("compareTo", () => {
            // https://semver.org/#spec-item-11
            // > Precedence is determined by the first difference when comparing each of these
            // > identifiers from left to right as follows: Major, minor, and patch versions are
            // > always compared numerically.
            assert.strictEqual(new ts.Version("1.0.0").compareTo(new ts.Version("2.0.0")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0").compareTo(new ts.Version("1.1.0")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0").compareTo(new ts.Version("1.0.1")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("2.0.0").compareTo(new ts.Version("1.0.0")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.1.0").compareTo(new ts.Version("1.0.0")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.1").compareTo(new ts.Version("1.0.0")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0").compareTo(new ts.Version("1.0.0")), ts.Comparison.EqualTo);

            // https://semver.org/#spec-item-11
            // > When major, minor, and patch are equal, a pre-release version has lower
            // > precedence than a normal version.
            assert.strictEqual(new ts.Version("1.0.0").compareTo(new ts.Version("1.0.0-pre")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.1-pre").compareTo(new ts.Version("1.0.0")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-pre").compareTo(new ts.Version("1.0.0")), ts.Comparison.LessThan);

            // https://semver.org/#spec-item-11
            // > identifiers consisting of only digits are compared numerically
            assert.strictEqual(new ts.Version("1.0.0-0").compareTo(new ts.Version("1.0.0-1")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-1").compareTo(new ts.Version("1.0.0-0")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-2").compareTo(new ts.Version("1.0.0-10")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-10").compareTo(new ts.Version("1.0.0-2")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-0").compareTo(new ts.Version("1.0.0-0")), ts.Comparison.EqualTo);

            // https://semver.org/#spec-item-11
            // > identifiers with letters or hyphens are compared lexically in ASCII sort order.
            assert.strictEqual(new ts.Version("1.0.0-a").compareTo(new ts.Version("1.0.0-b")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-a-2").compareTo(new ts.Version("1.0.0-a-10")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-b").compareTo(new ts.Version("1.0.0-a")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-a").compareTo(new ts.Version("1.0.0-a")), ts.Comparison.EqualTo);
            assert.strictEqual(new ts.Version("1.0.0-A").compareTo(new ts.Version("1.0.0-a")), ts.Comparison.LessThan);

            // https://semver.org/#spec-item-11
            // > Numeric identifiers always have lower precedence than non-numeric identifiers.
            assert.strictEqual(new ts.Version("1.0.0-0").compareTo(new ts.Version("1.0.0-alpha")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-alpha").compareTo(new ts.Version("1.0.0-0")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-0").compareTo(new ts.Version("1.0.0-0")), ts.Comparison.EqualTo);
            assert.strictEqual(new ts.Version("1.0.0-alpha").compareTo(new ts.Version("1.0.0-alpha")), ts.Comparison.EqualTo);

            // https://semver.org/#spec-item-11
            // > A larger set of pre-release fields has a higher precedence than a smaller set, if all
            // > of the preceding identifiers are equal.
            assert.strictEqual(new ts.Version("1.0.0-alpha").compareTo(new ts.Version("1.0.0-alpha.0")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-alpha.0").compareTo(new ts.Version("1.0.0-alpha")), ts.Comparison.GreaterThan);

            // https://semver.org/#spec-item-11
            // > Precedence for two pre-release versions with the same major, minor, and patch version
            // > MUST be determined by comparing each dot separated identifier from left to right until
            // > a difference is found [...]
            assert.strictEqual(new ts.Version("1.0.0-a.0.b.1").compareTo(new ts.Version("1.0.0-a.0.b.2")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-a.0.b.1").compareTo(new ts.Version("1.0.0-b.0.a.1")), ts.Comparison.LessThan);
            assert.strictEqual(new ts.Version("1.0.0-a.0.b.2").compareTo(new ts.Version("1.0.0-a.0.b.1")), ts.Comparison.GreaterThan);
            assert.strictEqual(new ts.Version("1.0.0-b.0.a.1").compareTo(new ts.Version("1.0.0-a.0.b.1")), ts.Comparison.GreaterThan);

            // https://semver.org/#spec-item-11
            // > Build metadata does not figure into precedence
            assert.strictEqual(new ts.Version("1.0.0+build").compareTo(new ts.Version("1.0.0")), ts.Comparison.EqualTo);
        });
        it("increment", () => {
            assertVersion(new ts.Version(1, 2, 3, "pre.4", "build.5").increment("major"), [2, 0, 0]);
            assertVersion(new ts.Version(1, 2, 3, "pre.4", "build.5").increment("minor"), [1, 3, 0]);
            assertVersion(new ts.Version(1, 2, 3, "pre.4", "build.5").increment("patch"), [1, 2, 4]);
        });
    });
    describe("VersionRange", () => {
        it("major wildcard types treated the same", () => {
            const versionStrings = [
                "",
                "*",
                "*.*",
                "*.*.*",
                "x",
                "x.x",
                "x.x.x",
                "X",
                "X.X",
                "X.X.X",
            ];
            for (let i = 0; i < versionStrings.length; i++) {
                for (let j = i + 1; j < versionStrings.length; j++) {
                    const left = new ts.VersionRange(versionStrings[i]);
                    const right = new ts.VersionRange(versionStrings[j]);
                    assert.strictEqual(left.toString(), right.toString());
                }
            }
        });

        it("minor wildcard types treated the same", () => {
            const versionStrings = [
                "1.*",
                "1.*.*",
                "1.x",
                "1.x.x",
                "1.X",
                "1.X.X",
            ];
            for (let i = 0; i < versionStrings.length; i++) {
                for (let j = i + 1; j < versionStrings.length; j++) {
                    const left = new ts.VersionRange(versionStrings[i]);
                    const right = new ts.VersionRange(versionStrings[j]);
                    assert.strictEqual(left.toString(), right.toString());
                }
            }
        });

        it("patch wildcard types treated the same", () => {
            const versionStrings = [
                "1.2.*",
                "1.2.x",
                "1.2.X",
            ];
            for (let i = 0; i < versionStrings.length; i++) {
                for (let j = i + 1; j < versionStrings.length; j++) {
                    const left = new ts.VersionRange(versionStrings[i]);
                    const right = new ts.VersionRange(versionStrings[j]);
                    assert.strictEqual(left.toString(), right.toString());
                }
            }
        });

        function assertVersionRange(version: string, good: string[], bad: string[]): () => void {
            return () => {
                const range = ts.VersionRange.tryParse(version)!;
                assert(range);
                for (const g of good) {
                    assert.isTrue(range.test(g), g);
                }
                for (const b of bad) {
                    assert.isFalse(range.test(b), b);
                }
            };
        }

        it("< works", assertVersionRange("<3.8.0", ["3.6", "3.7"], ["3.8", "3.9", "4.0"]));
        it("<= works", assertVersionRange("<=3.8.0", ["3.6", "3.7", "3.8"], ["3.9", "4.0"]));
        it("> works", assertVersionRange(">3.8.0", ["3.9", "4.0"], ["3.6", "3.7", "3.8"]));
        it(">= works", assertVersionRange(">=3.8.0", ["3.8", "3.9", "4.0"], ["3.6", "3.7"]));

        it("< works with prerelease", assertVersionRange("<3.8.0-0", ["3.6", "3.7"], ["3.8", "3.9", "4.0"]));
        it("<= works with prerelease", assertVersionRange("<=3.8.0-0", ["3.6", "3.7"], ["3.8", "3.9", "4.0"]));
        it("> works with prerelease", assertVersionRange(">3.8.0-0", ["3.8", "3.9", "4.0"], ["3.6", "3.7"]));
        it(">= works with prerelease", assertVersionRange(">=3.8.0-0", ["3.8", "3.9", "4.0"], ["3.6", "3.7"]));

        function assertRange(rangeText: string, versionText: string, inRange: boolean) {
            const range = new ts.VersionRange(rangeText);
            const version = new ts.Version(versionText);
            assert.strictEqual(range.test(version), inRange, `Expected version '${version}' ${inRange ? `to be` : `to not be`} in range '${rangeText}' (${range})`);
        }

        theory("comparators", assertRange, [
            // empty (matches everything)
            ["", "2.0.0", true],
            ["", "2.0.0-0", true],
            ["", "1.1.0", true],
            ["", "1.1.0-0", true],
            ["", "1.0.1", true],
            ["", "1.0.1-0", true],
            ["", "1.0.0", true],
            ["", "1.0.0-0", true],
            ["", "0.0.0", true],
            ["", "0.0.0-0", true],

            // wildcard major (matches everything)
            ["*", "2.0.0", true],
            ["*", "2.0.0-0", true],
            ["*", "1.1.0", true],
            ["*", "1.1.0-0", true],
            ["*", "1.0.1", true],
            ["*", "1.0.1-0", true],
            ["*", "1.0.0", true],
            ["*", "1.0.0-0", true],
            ["*", "0.0.0", true],
            ["*", "0.0.0-0", true],

            // wildcard minor
            ["1", "2.0.0", false],
            ["1", "2.0.0-0", false],
            ["1", "1.1.0", true],
            ["1", "1.1.0-0", true],
            ["1", "1.0.1", true],
            ["1", "1.0.1-0", true],
            ["1", "1.0.0", true],
            ["1", "1.0.0-0", true],
            ["1", "0.0.0", false],
            ["1", "0.0.0-0", false],

            // wildcard patch
            ["1.1", "2.0.0", false],
            ["1.1", "2.0.0-0", false],
            ["1.1", "1.1.0", true],
            ["1.1", "1.1.0-0", true],
            ["1.1", "1.0.1", false],
            ["1.1", "1.0.1-0", false],
            ["1.1", "1.0.0", false],
            ["1.1", "1.0.0-0", false],
            ["1.1", "0.0.0", false],
            ["1.1", "0.0.0-0", false],
            ["1.0", "2.0.0", false],
            ["1.0", "2.0.0-0", false],
            ["1.0", "1.1.0", false],
            ["1.0", "1.1.0-0", false],
            ["1.0", "1.0.1", true],
            ["1.0", "1.0.1-0", true],
            ["1.0", "1.0.0", true],
            ["1.0", "1.0.0-0", true],
            ["1.0", "0.0.0", false],
            ["1.0", "0.0.0-0", false],

            // exact
            ["1.1.0", "2.0.0", false],
            ["1.1.0", "2.0.0-0", false],
            ["1.1.0", "1.1.0", true],
            ["1.1.0", "1.1.0-0", false],
            ["1.1.0", "1.0.1", false],
            ["1.1.0", "1.0.1-0", false],
            ["1.1.0", "1.0.0-0", false],
            ["1.1.0", "1.0.0", false],
            ["1.1.0", "0.0.0", false],
            ["1.1.0", "0.0.0-0", false],
            ["1.1.0-0", "2.0.0", false],
            ["1.1.0-0", "2.0.0-0", false],
            ["1.1.0-0", "1.1.0", false],
            ["1.1.0-0", "1.1.0-0", true],
            ["1.1.0-0", "1.0.1", false],
            ["1.1.0-0", "1.0.1-0", false],
            ["1.1.0-0", "1.0.0-0", false],
            ["1.1.0-0", "1.0.0", false],
            ["1.1.0-0", "0.0.0", false],
            ["1.1.0-0", "0.0.0-0", false],
            ["1.0.1", "2.0.0", false],
            ["1.0.1", "2.0.0-0", false],
            ["1.0.1", "1.1.0", false],
            ["1.0.1", "1.1.0-0", false],
            ["1.0.1", "1.0.1", true],
            ["1.0.1", "1.0.1-0", false],
            ["1.0.1", "1.0.0-0", false],
            ["1.0.1", "1.0.0", false],
            ["1.0.1", "0.0.0", false],
            ["1.0.1", "0.0.0-0", false],
            ["1.0.1-0", "2.0.0", false],
            ["1.0.1-0", "2.0.0-0", false],
            ["1.0.1-0", "1.1.0", false],
            ["1.0.1-0", "1.1.0-0", false],
            ["1.0.1-0", "1.0.1", false],
            ["1.0.1-0", "1.0.1-0", true],
            ["1.0.1-0", "1.0.0-0", false],
            ["1.0.1-0", "1.0.0", false],
            ["1.0.1-0", "0.0.0", false],
            ["1.0.1-0", "0.0.0-0", false],
            ["1.0.0", "2.0.0", false],
            ["1.0.0", "2.0.0-0", false],
            ["1.0.0", "1.1.0", false],
            ["1.0.0", "1.1.0-0", false],
            ["1.0.0", "1.0.1", false],
            ["1.0.0", "1.0.1-0", false],
            ["1.0.0", "1.0.0-0", false],
            ["1.0.0", "1.0.0", true],
            ["1.0.0", "0.0.0", false],
            ["1.0.0", "0.0.0-0", false],
            ["1.0.0-0", "2.0.0", false],
            ["1.0.0-0", "2.0.0-0", false],
            ["1.0.0-0", "1.1.0", false],
            ["1.0.0-0", "1.1.0-0", false],
            ["1.0.0-0", "1.0.1", false],
            ["1.0.0-0", "1.0.1-0", false],
            ["1.0.0-0", "1.0.0", false],
            ["1.0.0-0", "1.0.0-0", true],

            // = wildcard major (matches everything)
            ["=*", "2.0.0", true],
            ["=*", "2.0.0-0", true],
            ["=*", "1.1.0", true],
            ["=*", "1.1.0-0", true],
            ["=*", "1.0.1", true],
            ["=*", "1.0.1-0", true],
            ["=*", "1.0.0", true],
            ["=*", "1.0.0-0", true],
            ["=*", "0.0.0", true],
            ["=*", "0.0.0-0", true],

            // = wildcard minor
            ["=1", "2.0.0", false],
            ["=1", "2.0.0-0", false],
            ["=1", "1.1.0", true],
            ["=1", "1.1.0-0", true],
            ["=1", "1.0.1", true],
            ["=1", "1.0.1-0", true],
            ["=1", "1.0.0", true],
            ["=1", "1.0.0-0", true],
            ["=1", "0.0.0", false],
            ["=1", "0.0.0-0", false],

            // = wildcard patch
            ["=1.1", "2.0.0", false],
            ["=1.1", "2.0.0-0", false],
            ["=1.1", "1.1.0", true],
            ["=1.1", "1.1.0-0", true],
            ["=1.1", "1.0.1", false],
            ["=1.1", "1.0.1-0", false],
            ["=1.1", "1.0.0", false],
            ["=1.1", "1.0.0-0", false],
            ["=1.1", "0.0.0", false],
            ["=1.1", "0.0.0-0", false],
            ["=1.0", "2.0.0", false],
            ["=1.0", "2.0.0-0", false],
            ["=1.0", "1.1.0", false],
            ["=1.0", "1.1.0-0", false],
            ["=1.0", "1.0.1", true],
            ["=1.0", "1.0.1-0", true],
            ["=1.0", "1.0.0", true],
            ["=1.0", "1.0.0-0", true],
            ["=1.0", "0.0.0", false],
            ["=1.0", "0.0.0-0", false],

            // = exact
            ["=1.1.0", "2.0.0", false],
            ["=1.1.0", "2.0.0-0", false],
            ["=1.1.0", "1.1.0", true],
            ["=1.1.0", "1.1.0-0", false],
            ["=1.1.0", "1.0.1", false],
            ["=1.1.0", "1.0.1-0", false],
            ["=1.1.0", "1.0.0-0", false],
            ["=1.1.0", "1.0.0", false],
            ["=1.1.0", "0.0.0", false],
            ["=1.1.0", "0.0.0-0", false],
            ["=1.1.0-0", "2.0.0", false],
            ["=1.1.0-0", "2.0.0-0", false],
            ["=1.1.0-0", "1.1.0", false],
            ["=1.1.0-0", "1.1.0-0", true],
            ["=1.1.0-0", "1.0.1", false],
            ["=1.1.0-0", "1.0.1-0", false],
            ["=1.1.0-0", "1.0.0-0", false],
            ["=1.1.0-0", "1.0.0", false],
            ["=1.1.0-0", "0.0.0", false],
            ["=1.1.0-0", "0.0.0-0", false],
            ["=1.0.1", "2.0.0", false],
            ["=1.0.1", "2.0.0-0", false],
            ["=1.0.1", "1.1.0", false],
            ["=1.0.1", "1.1.0-0", false],
            ["=1.0.1", "1.0.1", true],
            ["=1.0.1", "1.0.1-0", false],
            ["=1.0.1", "1.0.0-0", false],
            ["=1.0.1", "1.0.0", false],
            ["=1.0.1", "0.0.0", false],
            ["=1.0.1", "0.0.0-0", false],
            ["=1.0.1-0", "2.0.0", false],
            ["=1.0.1-0", "2.0.0-0", false],
            ["=1.0.1-0", "1.1.0", false],
            ["=1.0.1-0", "1.1.0-0", false],
            ["=1.0.1-0", "1.0.1", false],
            ["=1.0.1-0", "1.0.1-0", true],
            ["=1.0.1-0", "1.0.0-0", false],
            ["=1.0.1-0", "1.0.0", false],
            ["=1.0.1-0", "0.0.0", false],
            ["=1.0.1-0", "0.0.0-0", false],
            ["=1.0.0", "2.0.0", false],
            ["=1.0.0", "2.0.0-0", false],
            ["=1.0.0", "1.1.0", false],
            ["=1.0.0", "1.1.0-0", false],
            ["=1.0.0", "1.0.1", false],
            ["=1.0.0", "1.0.1-0", false],
            ["=1.0.0", "1.0.0-0", false],
            ["=1.0.0", "1.0.0", true],
            ["=1.0.0", "0.0.0", false],
            ["=1.0.0", "0.0.0-0", false],
            ["=1.0.0-0", "2.0.0", false],
            ["=1.0.0-0", "2.0.0-0", false],
            ["=1.0.0-0", "1.1.0", false],
            ["=1.0.0-0", "1.1.0-0", false],
            ["=1.0.0-0", "1.0.1", false],
            ["=1.0.0-0", "1.0.1-0", false],
            ["=1.0.0-0", "1.0.0", false],
            ["=1.0.0-0", "1.0.0-0", true],

            // > wildcard major (matches nothing)
            [">*", "2.0.0", false],
            [">*", "2.0.0-0", false],
            [">*", "1.1.0", false],
            [">*", "1.1.0-0", false],
            [">*", "1.0.1", false],
            [">*", "1.0.1-0", false],
            [">*", "1.0.0", false],
            [">*", "1.0.0-0", false],
            [">*", "0.0.0", false],
            [">*", "0.0.0-0", false],

            // > wildcard minor
            [">1", "2.0.0", true],
            [">1", "2.0.0-0", true],
            [">1", "1.1.0", false],
            [">1", "1.1.0-0", false],
            [">1", "1.0.1", false],
            [">1", "1.0.1-0", false],
            [">1", "1.0.0", false],
            [">1", "1.0.0-0", false],
            [">1", "0.0.0", false],
            [">1", "0.0.0-0", false],

            // > wildcard patch
            [">1.1", "2.0.0", true],
            [">1.1", "2.0.0-0", true],
            [">1.1", "1.1.0", false],
            [">1.1", "1.1.0-0", false],
            [">1.1", "1.0.1", false],
            [">1.1", "1.0.1-0", false],
            [">1.1", "1.0.0", false],
            [">1.1", "1.0.0-0", false],
            [">1.1", "0.0.0", false],
            [">1.1", "0.0.0-0", false],
            [">1.0", "2.0.0", true],
            [">1.0", "2.0.0-0", true],
            [">1.0", "1.1.0", true],
            [">1.0", "1.1.0-0", true],
            [">1.0", "1.0.1", false],
            [">1.0", "1.0.1-0", false],
            [">1.0", "1.0.0", false],
            [">1.0", "1.0.0-0", false],
            [">1.0", "0.0.0", false],
            [">1.0", "0.0.0-0", false],

            // > exact
            [">1.1.0", "2.0.0", true],
            [">1.1.0", "2.0.0-0", true],
            [">1.1.0", "1.1.0", false],
            [">1.1.0", "1.1.0-0", false],
            [">1.1.0", "1.0.1", false],
            [">1.1.0", "1.0.1-0", false],
            [">1.1.0", "1.0.0", false],
            [">1.1.0", "1.0.0-0", false],
            [">1.1.0", "0.0.0", false],
            [">1.1.0", "0.0.0-0", false],
            [">1.1.0-0", "2.0.0", true],
            [">1.1.0-0", "2.0.0-0", true],
            [">1.1.0-0", "1.1.0", true],
            [">1.1.0-0", "1.1.0-0", false],
            [">1.1.0-0", "1.0.1", false],
            [">1.1.0-0", "1.0.1-0", false],
            [">1.1.0-0", "1.0.0", false],
            [">1.1.0-0", "1.0.0-0", false],
            [">1.1.0-0", "0.0.0", false],
            [">1.1.0-0", "0.0.0-0", false],
            [">1.0.1", "2.0.0", true],
            [">1.0.1", "2.0.0-0", true],
            [">1.0.1", "1.1.0", true],
            [">1.0.1", "1.1.0-0", true],
            [">1.0.1", "1.0.1", false],
            [">1.0.1", "1.0.1-0", false],
            [">1.0.1", "1.0.0", false],
            [">1.0.1", "1.0.0-0", false],
            [">1.0.1", "0.0.0", false],
            [">1.0.1", "0.0.0-0", false],
            [">1.0.1-0", "2.0.0", true],
            [">1.0.1-0", "2.0.0-0", true],
            [">1.0.1-0", "1.1.0", true],
            [">1.0.1-0", "1.1.0-0", true],
            [">1.0.1-0", "1.0.1", true],
            [">1.0.1-0", "1.0.1-0", false],
            [">1.0.1-0", "1.0.0", false],
            [">1.0.1-0", "1.0.0-0", false],
            [">1.0.1-0", "0.0.0", false],
            [">1.0.1-0", "0.0.0-0", false],
            [">1.0.0", "2.0.0", true],
            [">1.0.0", "2.0.0-0", true],
            [">1.0.0", "1.1.0", true],
            [">1.0.0", "1.1.0-0", true],
            [">1.0.0", "1.0.1", true],
            [">1.0.0", "1.0.1-0", true],
            [">1.0.0", "1.0.0", false],
            [">1.0.0", "1.0.0-0", false],
            [">1.0.0", "0.0.0", false],
            [">1.0.0", "0.0.0-0", false],
            [">1.0.0-0", "2.0.0", true],
            [">1.0.0-0", "2.0.0-0", true],
            [">1.0.0-0", "1.1.0", true],
            [">1.0.0-0", "1.1.0-0", true],
            [">1.0.0-0", "1.0.1", true],
            [">1.0.0-0", "1.0.1-0", true],
            [">1.0.0-0", "1.0.0", true],
            [">1.0.0-0", "1.0.0-0", false],
            [">1.0.0-0", "0.0.0", false],
            [">1.0.0-0", "0.0.0-0", false],

            // >= wildcard major (matches everything)
            [">=*", "2.0.0", true],
            [">=*", "2.0.0-0", true],
            [">=*", "1.1.0", true],
            [">=*", "1.1.0-0", true],
            [">=*", "1.0.1", true],
            [">=*", "1.0.1-0", true],
            [">=*", "1.0.0", true],
            [">=*", "1.0.0-0", true],
            [">=*", "0.0.0", true],
            [">=*", "0.0.0-0", true],

            // >= wildcard minor
            [">=1", "2.0.0", true],
            [">=1", "2.0.0-0", true],
            [">=1", "1.1.0", true],
            [">=1", "1.1.0-0", true],
            [">=1", "1.0.1", true],
            [">=1", "1.0.1-0", true],
            [">=1", "1.0.0", true],
            [">=1", "1.0.0-0", true],
            [">=1", "0.0.0", false],
            [">=1", "0.0.0-0", false],

            // >= wildcard patch
            [">=1.1", "2.0.0", true],
            [">=1.1", "2.0.0-0", true],
            [">=1.1", "1.1.0", true],
            [">=1.1", "1.1.0-0", true],
            [">=1.1", "1.0.1", false],
            [">=1.1", "1.0.1-0", false],
            [">=1.1", "1.0.0", false],
            [">=1.1", "1.0.0-0", false],
            [">=1.1", "0.0.0", false],
            [">=1.1", "0.0.0-0", false],
            [">=1.0", "2.0.0", true],
            [">=1.0", "2.0.0-0", true],
            [">=1.0", "1.1.0", true],
            [">=1.0", "1.1.0-0", true],
            [">=1.0", "1.0.1", true],
            [">=1.0", "1.0.1-0", true],
            [">=1.0", "1.0.0", true],
            [">=1.0", "1.0.0-0", true],
            [">=1.0", "0.0.0", false],
            [">=1.0", "0.0.0-0", false],

            // >= exact
            [">=1.1.0", "2.0.0", true],
            [">=1.1.0", "2.0.0-0", true],
            [">=1.1.0", "1.1.0", true],
            [">=1.1.0", "1.1.0-0", false],
            [">=1.1.0", "1.0.1", false],
            [">=1.1.0", "1.0.1-0", false],
            [">=1.1.0", "1.0.0", false],
            [">=1.1.0", "1.0.0-0", false],
            [">=1.1.0", "0.0.0", false],
            [">=1.1.0", "0.0.0-0", false],
            [">=1.1.0-0", "2.0.0", true],
            [">=1.1.0-0", "2.0.0-0", true],
            [">=1.1.0-0", "1.1.0", true],
            [">=1.1.0-0", "1.1.0-0", true],
            [">=1.1.0-0", "1.0.1", false],
            [">=1.1.0-0", "1.0.1-0", false],
            [">=1.1.0-0", "1.0.0", false],
            [">=1.1.0-0", "1.0.0-0", false],
            [">=1.1.0-0", "0.0.0", false],
            [">=1.1.0-0", "0.0.0-0", false],
            [">=1.0.1", "2.0.0", true],
            [">=1.0.1", "2.0.0-0", true],
            [">=1.0.1", "1.1.0", true],
            [">=1.0.1", "1.1.0-0", true],
            [">=1.0.1", "1.0.1", true],
            [">=1.0.1", "1.0.1-0", false],
            [">=1.0.1", "1.0.0", false],
            [">=1.0.1", "1.0.0-0", false],
            [">=1.0.1", "0.0.0", false],
            [">=1.0.1", "0.0.0-0", false],
            [">=1.0.1-0", "2.0.0", true],
            [">=1.0.1-0", "2.0.0-0", true],
            [">=1.0.1-0", "1.1.0", true],
            [">=1.0.1-0", "1.1.0-0", true],
            [">=1.0.1-0", "1.0.1", true],
            [">=1.0.1-0", "1.0.1-0", true],
            [">=1.0.1-0", "1.0.0", false],
            [">=1.0.1-0", "1.0.0-0", false],
            [">=1.0.1-0", "0.0.0", false],
            [">=1.0.1-0", "0.0.0-0", false],
            [">=1.0.0", "2.0.0", true],
            [">=1.0.0", "2.0.0-0", true],
            [">=1.0.0", "1.1.0", true],
            [">=1.0.0", "1.1.0-0", true],
            [">=1.0.0", "1.0.1", true],
            [">=1.0.0", "1.0.1-0", true],
            [">=1.0.0", "1.0.0", true],
            [">=1.0.0", "1.0.0-0", false],
            [">=1.0.0", "0.0.0", false],
            [">=1.0.0", "0.0.0-0", false],
            [">=1.0.0-0", "2.0.0", true],
            [">=1.0.0-0", "2.0.0-0", true],
            [">=1.0.0-0", "1.1.0", true],
            [">=1.0.0-0", "1.1.0-0", true],
            [">=1.0.0-0", "1.0.1", true],
            [">=1.0.0-0", "1.0.1-0", true],
            [">=1.0.0-0", "1.0.0", true],
            [">=1.0.0-0", "1.0.0-0", true],
            [">=1.0.0-0", "0.0.0", false],
            [">=1.0.0-0", "0.0.0-0", false],

            // < wildcard major (matches nothing)
            ["<*", "2.0.0", false],
            ["<*", "2.0.0-0", false],
            ["<*", "1.1.0", false],
            ["<*", "1.1.0-0", false],
            ["<*", "1.0.1", false],
            ["<*", "1.0.1-0", false],
            ["<*", "1.0.0", false],
            ["<*", "1.0.0-0", false],
            ["<*", "0.0.0", false],
            ["<*", "0.0.0-0", false],

            // < wildcard minor
            ["<1", "2.0.0", false],
            ["<1", "2.0.0-0", false],
            ["<1", "1.1.0", false],
            ["<1", "1.1.0-0", false],
            ["<1", "1.0.1", false],
            ["<1", "1.0.1-0", false],
            ["<1", "1.0.0", false],
            ["<1", "1.0.0-0", false],
            ["<1", "0.0.0", true],
            ["<1", "0.0.0-0", true],

            // < wildcard patch
            ["<1.1", "2.0.0", false],
            ["<1.1", "2.0.0-0", false],
            ["<1.1", "1.1.0", false],
            ["<1.1", "1.1.0-0", false],
            ["<1.1", "1.0.1", true],
            ["<1.1", "1.0.1-0", true],
            ["<1.1", "1.0.0", true],
            ["<1.1", "1.0.0-0", true],
            ["<1.1", "0.0.0", true],
            ["<1.1", "0.0.0-0", true],
            ["<1.0", "2.0.0", false],
            ["<1.0", "2.0.0-0", false],
            ["<1.0", "1.1.0", false],
            ["<1.0", "1.1.0-0", false],
            ["<1.0", "1.0.1", false],
            ["<1.0", "1.0.1-0", false],
            ["<1.0", "1.0.0", false],
            ["<1.0", "1.0.0-0", false],
            ["<1.0", "0.0.0", true],
            ["<1.0", "0.0.0-0", true],

            // < exact
            ["<1.1.0", "2.0.0", false],
            ["<1.1.0", "2.0.0-0", false],
            ["<1.1.0", "1.1.0", false],
            ["<1.1.0", "1.1.0-0", true],
            ["<1.1.0", "1.0.1", true],
            ["<1.1.0", "1.0.1-0", true],
            ["<1.1.0", "1.0.0", true],
            ["<1.1.0", "1.0.0-0", true],
            ["<1.1.0", "0.0.0", true],
            ["<1.1.0", "0.0.0-0", true],
            ["<1.1.0-0", "2.0.0", false],
            ["<1.1.0-0", "2.0.0-0", false],
            ["<1.1.0-0", "1.1.0", false],
            ["<1.1.0-0", "1.1.0-0", false],
            ["<1.1.0-0", "1.0.1", true],
            ["<1.1.0-0", "1.0.1-0", true],
            ["<1.1.0-0", "1.0.0", true],
            ["<1.1.0-0", "1.0.0-0", true],
            ["<1.1.0-0", "0.0.0", true],
            ["<1.1.0-0", "0.0.0-0", true],
            ["<1.0.1", "2.0.0", false],
            ["<1.0.1", "2.0.0-0", false],
            ["<1.0.1", "1.1.0", false],
            ["<1.0.1", "1.1.0-0", false],
            ["<1.0.1", "1.0.1", false],
            ["<1.0.1", "1.0.1-0", true],
            ["<1.0.1", "1.0.0", true],
            ["<1.0.1", "1.0.0-0", true],
            ["<1.0.1", "0.0.0", true],
            ["<1.0.1", "0.0.0-0", true],
            ["<1.0.1-0", "2.0.0", false],
            ["<1.0.1-0", "2.0.0-0", false],
            ["<1.0.1-0", "1.1.0", false],
            ["<1.0.1-0", "1.1.0-0", false],
            ["<1.0.1-0", "1.0.1", false],
            ["<1.0.1-0", "1.0.1-0", false],
            ["<1.0.1-0", "1.0.0", true],
            ["<1.0.1-0", "1.0.0-0", true],
            ["<1.0.1-0", "0.0.0", true],
            ["<1.0.1-0", "0.0.0-0", true],
            ["<1.0.0", "2.0.0", false],
            ["<1.0.0", "2.0.0-0", false],
            ["<1.0.0", "1.1.0", false],
            ["<1.0.0", "1.1.0-0", false],
            ["<1.0.0", "1.0.1", false],
            ["<1.0.0", "1.0.1-0", false],
            ["<1.0.0", "1.0.0", false],
            ["<1.0.0", "1.0.0-0", true],
            ["<1.0.0", "0.0.0", true],
            ["<1.0.0", "0.0.0-0", true],
            ["<1.0.0-0", "2.0.0", false],
            ["<1.0.0-0", "2.0.0-0", false],
            ["<1.0.0-0", "1.1.0", false],
            ["<1.0.0-0", "1.1.0-0", false],
            ["<1.0.0-0", "1.0.1", false],
            ["<1.0.0-0", "1.0.1-0", false],
            ["<1.0.0-0", "1.0.0", false],
            ["<1.0.0-0", "1.0.0-0", false],
            ["<1.0.0-0", "0.0.0", true],
            ["<1.0.0-0", "0.0.0-0", true],

            // <= wildcard major (matches everything)
            ["<=*", "2.0.0", true],
            ["<=*", "2.0.0-0", true],
            ["<=*", "1.1.0", true],
            ["<=*", "1.1.0-0", true],
            ["<=*", "1.0.1", true],
            ["<=*", "1.0.1-0", true],
            ["<=*", "1.0.0", true],
            ["<=*", "1.0.0-0", true],
            ["<=*", "0.0.0", true],
            ["<=*", "0.0.0-0", true],

            // <= wildcard minor
            ["<=1", "2.0.0", false],
            ["<=1", "2.0.0-0", false],
            ["<=1", "1.1.0", true],
            ["<=1", "1.1.0-0", true],
            ["<=1", "1.0.1", true],
            ["<=1", "1.0.1-0", true],
            ["<=1", "1.0.0", true],
            ["<=1", "1.0.0-0", true],
            ["<=1", "0.0.0", true],
            ["<=1", "0.0.0-0", true],

            // <= wildcard patch
            ["<=1.1", "2.0.0", false],
            ["<=1.1", "2.0.0-0", false],
            ["<=1.1", "1.1.0", true],
            ["<=1.1", "1.1.0-0", true],
            ["<=1.1", "1.0.1", true],
            ["<=1.1", "1.0.1-0", true],
            ["<=1.1", "1.0.0", true],
            ["<=1.1", "1.0.0-0", true],
            ["<=1.1", "0.0.0", true],
            ["<=1.1", "0.0.0-0", true],
            ["<=1.0", "2.0.0", false],
            ["<=1.0", "2.0.0-0", false],
            ["<=1.0", "1.1.0", false],
            ["<=1.0", "1.1.0-0", false],
            ["<=1.0", "1.0.1", true],
            ["<=1.0", "1.0.1-0", true],
            ["<=1.0", "1.0.0", true],
            ["<=1.0", "1.0.0-0", true],
            ["<=1.0", "0.0.0", true],
            ["<=1.0", "0.0.0-0", true],

            // <= exact
            ["<=1.1.0", "2.0.0", false],
            ["<=1.1.0", "2.0.0-0", false],
            ["<=1.1.0", "1.1.0", true],
            ["<=1.1.0", "1.1.0-0", true],
            ["<=1.1.0", "1.0.1", true],
            ["<=1.1.0", "1.0.1-0", true],
            ["<=1.1.0", "1.0.0", true],
            ["<=1.1.0", "1.0.0-0", true],
            ["<=1.1.0", "0.0.0", true],
            ["<=1.1.0", "0.0.0-0", true],
            ["<=1.1.0-0", "2.0.0", false],
            ["<=1.1.0-0", "2.0.0-0", false],
            ["<=1.1.0-0", "1.1.0", false],
            ["<=1.1.0-0", "1.1.0-0", true],
            ["<=1.1.0-0", "1.0.1", true],
            ["<=1.1.0-0", "1.0.1-0", true],
            ["<=1.1.0-0", "1.0.0", true],
            ["<=1.1.0-0", "1.0.0-0", true],
            ["<=1.1.0-0", "0.0.0", true],
            ["<=1.1.0-0", "0.0.0-0", true],
            ["<=1.0.1", "2.0.0", false],
            ["<=1.0.1", "2.0.0-0", false],
            ["<=1.0.1", "1.1.0", false],
            ["<=1.0.1", "1.1.0-0", false],
            ["<=1.0.1", "1.0.1", true],
            ["<=1.0.1", "1.0.1-0", true],
            ["<=1.0.1", "1.0.0", true],
            ["<=1.0.1", "1.0.0-0", true],
            ["<=1.0.1", "0.0.0", true],
            ["<=1.0.1", "0.0.0-0", true],
            ["<=1.0.1-0", "2.0.0", false],
            ["<=1.0.1-0", "2.0.0-0", false],
            ["<=1.0.1-0", "1.1.0", false],
            ["<=1.0.1-0", "1.1.0-0", false],
            ["<=1.0.1-0", "1.0.1", false],
            ["<=1.0.1-0", "1.0.1-0", true],
            ["<=1.0.1-0", "1.0.0", true],
            ["<=1.0.1-0", "1.0.0-0", true],
            ["<=1.0.1-0", "0.0.0", true],
            ["<=1.0.1-0", "0.0.0-0", true],
            ["<=1.0.0", "2.0.0", false],
            ["<=1.0.0", "2.0.0-0", false],
            ["<=1.0.0", "1.1.0", false],
            ["<=1.0.0", "1.1.0-0", false],
            ["<=1.0.0", "1.0.1", false],
            ["<=1.0.0", "1.0.1-0", false],
            ["<=1.0.0", "1.0.0", true],
            ["<=1.0.0", "1.0.0-0", true],
            ["<=1.0.0", "0.0.0", true],
            ["<=1.0.0", "0.0.0-0", true],
            ["<=1.0.0-0", "2.0.0", false],
            ["<=1.0.0-0", "2.0.0-0", false],
            ["<=1.0.0-0", "1.1.0", false],
            ["<=1.0.0-0", "1.1.0-0", false],
            ["<=1.0.0-0", "1.0.1", false],
            ["<=1.0.0-0", "1.0.1-0", false],
            ["<=1.0.0-0", "1.0.0", false],
            ["<=1.0.0-0", "1.0.0-0", true],
            ["<=1.0.0-0", "0.0.0", true],
            ["<=1.0.0-0", "0.0.0-0", true],

            // https://github.com/microsoft/TypeScript/issues/50909
            [">4.8", "4.9.0-beta", true],
            [">=4.9", "4.9.0-beta", true],
            ["<4.9", "4.9.0-beta", false],
            ["<=4.8", "4.9.0-beta", false],
        ]);
        theory("conjunctions", assertRange, [
            [">1.0.0 <2.0.0", "1.0.1", true],
            [">1.0.0 <2.0.0", "2.0.0", false],
            [">1.0.0 <2.0.0", "1.0.0", false],
            [">1 >2", "3.0.0", true],
        ]);
        theory("disjunctions", assertRange, [
            [">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "1.0.0", true],
            [">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "2.0.0", false],
            [">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "3.0.0", true],
        ]);
        theory("hyphen", assertRange, [
            ["1.0.0 - 2.0.0", "1.0.0", true],
            ["1.0.0 - 2.0.0", "2.0.0", true],
            ["1.0.0 - 2.0.0", "3.0.0", false],
        ]);
        theory("tilde", assertRange, [
            ["~0", "0.0.0", true],
            ["~0", "0.1.0", true],
            ["~0", "0.1.2", true],
            ["~0", "0.1.9", true],
            ["~0", "1.0.0", false],
            ["~0.1", "0.1.0", true],
            ["~0.1", "0.1.2", true],
            ["~0.1", "0.1.9", true],
            ["~0.1", "0.2.0", false],
            ["~0.1.2", "0.1.2", true],
            ["~0.1.2", "0.1.9", true],
            ["~0.1.2", "0.2.0", false],
            ["~1", "1.0.0", true],
            ["~1", "1.2.0", true],
            ["~1", "1.2.3", true],
            ["~1", "1.2.0", true],
            ["~1", "1.2.3", true],
            ["~1", "0.0.0", false],
            ["~1", "2.0.0", false],
            ["~1.2", "1.2.0", true],
            ["~1.2", "1.2.3", true],
            ["~1.2", "1.1.0", false],
            ["~1.2", "1.3.0", false],
            ["~1.2.3", "1.2.3", true],
            ["~1.2.3", "1.2.9", true],
            ["~1.2.3", "1.1.0", false],
            ["~1.2.3", "1.3.0", false],
        ]);
        theory("caret", assertRange, [
            ["^0", "0.0.0", true],
            ["^0", "0.1.0", true],
            ["^0", "0.9.0", true],
            ["^0", "0.1.2", true],
            ["^0", "0.1.9", true],
            ["^0", "1.0.0", false],
            ["^0.1", "0.1.0", true],
            ["^0.1", "0.1.2", true],
            ["^0.1", "0.1.9", true],
            ["^0.1.2", "0.1.2", true],
            ["^0.1.2", "0.1.9", true],
            ["^0.1.2", "0.0.0", false],
            ["^0.1.2", "0.2.0", false],
            ["^0.1.2", "1.0.0", false],
            ["^1", "1.0.0", true],
            ["^1", "1.2.0", true],
            ["^1", "1.2.3", true],
            ["^1", "1.9.0", true],
            ["^1", "0.0.0", false],
            ["^1", "2.0.0", false],
            ["^1.2", "1.2.0", true],
            ["^1.2", "1.2.3", true],
            ["^1.2", "1.9.0", true],
            ["^1.2", "1.1.0", false],
            ["^1.2", "2.0.0", false],
            ["^1.2.3", "1.2.3", true],
            ["^1.2.3", "1.9.0", true],
            ["^1.2.3", "1.2.2", false],
            ["^1.2.3", "2.0.0", false],
        ]);
    });
});
