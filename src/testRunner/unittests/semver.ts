namespace ts {
    import theory = utils.theory;
    describe("semver", () => {
        describe("Version", () => {
            function assertVersion(version: Version, [major, minor, patch, prerelease, build]: [number, number, number, string[]?, string[]?]) {
                assert.strictEqual(version.major, major);
                assert.strictEqual(version.minor, minor);
                assert.strictEqual(version.patch, patch);
                assert.deepEqual(version.prerelease, prerelease || emptyArray);
                assert.deepEqual(version.build, build || emptyArray);
            }
            describe("new", () => {
                it("text", () => {
                    assertVersion(new Version("1.2.3-pre.4+build.5"), [1, 2, 3, ["pre", "4"], ["build", "5"]]);
                });
                it("parts", () => {
                    assertVersion(new Version(1, 2, 3, "pre.4", "build.5"), [1, 2, 3, ["pre", "4"], ["build", "5"]]);
                    assertVersion(new Version(1, 2, 3), [1, 2, 3]);
                    assertVersion(new Version(1, 2), [1, 2, 0]);
                    assertVersion(new Version(1), [1, 0, 0]);
                });
            });
            it("toString", () => {
                assert.strictEqual(new Version(1, 2, 3, "pre.4", "build.5").toString(), "1.2.3-pre.4+build.5");
                assert.strictEqual(new Version(1, 2, 3, "pre.4").toString(), "1.2.3-pre.4");
                assert.strictEqual(new Version(1, 2, 3, /*prerelease*/ undefined, "build.5").toString(), "1.2.3+build.5");
                assert.strictEqual(new Version(1, 2, 3).toString(), "1.2.3");
                assert.strictEqual(new Version(1, 2).toString(), "1.2.0");
                assert.strictEqual(new Version(1).toString(), "1.0.0");
            });
            it("compareTo", () => {
                // https://semver.org/#spec-item-11
                // > Precedence is determined by the first difference when comparing each of these
                // > identifiers from left to right as follows: Major, minor, and patch versions are
                // > always compared numerically.
                assert.strictEqual(new Version("1.0.0").compareTo(new Version("2.0.0")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0").compareTo(new Version("1.1.0")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0").compareTo(new Version("1.0.1")), Comparison.LessThan);
                assert.strictEqual(new Version("2.0.0").compareTo(new Version("1.0.0")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.1.0").compareTo(new Version("1.0.0")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.1").compareTo(new Version("1.0.0")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0").compareTo(new Version("1.0.0")), Comparison.EqualTo);

                // https://semver.org/#spec-item-11
                // > When major, minor, and patch are equal, a pre-release version has lower
                // > precedence than a normal version.
                assert.strictEqual(new Version("1.0.0").compareTo(new Version("1.0.0-pre")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.1-pre").compareTo(new Version("1.0.0")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-pre").compareTo(new Version("1.0.0")), Comparison.LessThan);

                // https://semver.org/#spec-item-11
                // > identifiers consisting of only digits are compared numerically
                assert.strictEqual(new Version("1.0.0-0").compareTo(new Version("1.0.0-1")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-1").compareTo(new Version("1.0.0-0")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-2").compareTo(new Version("1.0.0-10")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-10").compareTo(new Version("1.0.0-2")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-0").compareTo(new Version("1.0.0-0")), Comparison.EqualTo);

                // https://semver.org/#spec-item-11
                // > identifiers with letters or hyphens are compared lexically in ASCII sort order.
                assert.strictEqual(new Version("1.0.0-a").compareTo(new Version("1.0.0-b")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-a-2").compareTo(new Version("1.0.0-a-10")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-b").compareTo(new Version("1.0.0-a")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-a").compareTo(new Version("1.0.0-a")), Comparison.EqualTo);
                assert.strictEqual(new Version("1.0.0-A").compareTo(new Version("1.0.0-a")), Comparison.LessThan);

                // https://semver.org/#spec-item-11
                // > Numeric identifiers always have lower precedence than non-numeric identifiers.
                assert.strictEqual(new Version("1.0.0-0").compareTo(new Version("1.0.0-alpha")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-alpha").compareTo(new Version("1.0.0-0")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-0").compareTo(new Version("1.0.0-0")), Comparison.EqualTo);
                assert.strictEqual(new Version("1.0.0-alpha").compareTo(new Version("1.0.0-alpha")), Comparison.EqualTo);

                // https://semver.org/#spec-item-11
                // > A larger set of pre-release fields has a higher precedence than a smaller set, if all
                // > of the preceding identifiers are equal.
                assert.strictEqual(new Version("1.0.0-alpha").compareTo(new Version("1.0.0-alpha.0")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-alpha.0").compareTo(new Version("1.0.0-alpha")), Comparison.GreaterThan);

                // https://semver.org/#spec-item-11
                // > Precedence for two pre-release versions with the same major, minor, and patch version
                // > MUST be determined by comparing each dot separated identifier from left to right until
                // > a difference is found [...]
                assert.strictEqual(new Version("1.0.0-a.0.b.1").compareTo(new Version("1.0.0-a.0.b.2")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-a.0.b.1").compareTo(new Version("1.0.0-b.0.a.1")), Comparison.LessThan);
                assert.strictEqual(new Version("1.0.0-a.0.b.2").compareTo(new Version("1.0.0-a.0.b.1")), Comparison.GreaterThan);
                assert.strictEqual(new Version("1.0.0-b.0.a.1").compareTo(new Version("1.0.0-a.0.b.1")), Comparison.GreaterThan);

                // https://semver.org/#spec-item-11
                // > Build metadata does not figure into precedence
                assert.strictEqual(new Version("1.0.0+build").compareTo(new Version("1.0.0")), Comparison.EqualTo);
            });
            it("increment", () => {
                assertVersion(new Version(1, 2, 3, "pre.4", "build.5").increment("major"), [2, 0, 0]);
                assertVersion(new Version(1, 2, 3, "pre.4", "build.5").increment("minor"), [1, 3, 0]);
                assertVersion(new Version(1, 2, 3, "pre.4", "build.5").increment("patch"), [1, 2, 4]);
            });
        });
        describe("VersionRange", () => {
            function assertRange(rangeText: string, versionText: string, inRange = true) {
                const range = new VersionRange(rangeText);
                const version = new Version(versionText);
                assert.strictEqual(range.test(version), inRange, `Expected version '${version}' ${inRange ? `to be` : `to not be`} in range '${rangeText}' (${range})`);
            }
            theory("comparators", assertRange, [
                ["", "1.0.0"],
                ["*", "1.0.0"],
                ["1", "1.0.0"],
                ["1", "2.0.0", false],
                ["1.0", "1.0.0"],
                ["1.0", "1.1.0", false],
                ["1.0.0", "1.0.0"],
                ["1.0.0", "1.0.1", false],
                ["1.*", "1.0.0"],
                ["1.*", "2.0.0", false],
                ["1.x", "1.0.0"],
                ["1.x", "2.0.0", false],
                ["=1", "1.0.0"],
                ["=1", "1.1.0"],
                ["=1", "1.0.1"],
                ["=1.0", "1.0.0"],
                ["=1.0", "1.0.1"],
                ["=1.0.0", "1.0.0"],
                ["=*", "0.0.0"],
                ["=*", "1.0.0"],
                [">1", "2"],
                [">1.0", "1.1"],
                [">1.0.0", "1.0.1"],
                [">1.0.0", "1.0.1-pre"],
                [">*", "0.0.0", false],
                [">*", "1.0.0", false],
                [">=1", "1.0.0"],
                [">=1.0", "1.0.0"],
                [">=1.0.0", "1.0.0"],
                [">=1.0.0", "1.0.1-pre"],
                [">=*", "0.0.0"],
                [">=*", "1.0.0"],
                ["<2", "1.0.0"],
                ["<2.1", "2.0.0"],
                ["<2.0.1", "2.0.0"],
                ["<2.0.0", "2.0.0-pre"],
                ["<*", "0.0.0", false],
                ["<*", "1.0.0", false],
                ["<=2", "2.0.0"],
                ["<=2.1", "2.1.0"],
                ["<=2.0.1", "2.0.1"],
                ["<=*", "0.0.0"],
                ["<=*", "1.0.0"],
            ]);
            theory("conjunctions", assertRange, [
                [">1.0.0 <2.0.0", "1.0.1"],
                [">1.0.0 <2.0.0", "2.0.0", false],
                [">1.0.0 <2.0.0", "1.0.0", false],
                [">1 >2", "3.0.0"],
            ]);
            theory("disjunctions", assertRange, [
                [">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "1.0.0"],
                [">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "2.0.0", false],
                [">=1.0.0 <2.0.0 || >=3.0.0 <4.0.0", "3.0.0"],
            ]);
            theory("hyphen", assertRange, [
                ["1.0.0 - 2.0.0", "1.0.0"],
                ["1.0.0 - 2.0.0", "2.0.0"],
                ["1.0.0 - 2.0.0", "3.0.0", false],
            ]);
            theory("tilde", assertRange, [
                ["~0", "0.0.0"],
                ["~0", "0.1.0"],
                ["~0", "0.1.2"],
                ["~0", "0.1.9"],
                ["~0", "1.0.0", false],
                ["~0.1", "0.1.0"],
                ["~0.1", "0.1.2"],
                ["~0.1", "0.1.9"],
                ["~0.1", "0.2.0", false],
                ["~0.1.2", "0.1.2"],
                ["~0.1.2", "0.1.9"],
                ["~0.1.2", "0.2.0", false],
                ["~1", "1.0.0"],
                ["~1", "1.2.0"],
                ["~1", "1.2.3"],
                ["~1", "1.2.0"],
                ["~1", "1.2.3"],
                ["~1", "0.0.0", false],
                ["~1", "2.0.0", false],
                ["~1.2", "1.2.0"],
                ["~1.2", "1.2.3"],
                ["~1.2", "1.1.0", false],
                ["~1.2", "1.3.0", false],
                ["~1.2.3", "1.2.3"],
                ["~1.2.3", "1.2.9"],
                ["~1.2.3", "1.1.0", false],
                ["~1.2.3", "1.3.0", false],
            ]);
            theory("caret", assertRange, [
                ["^0", "0.0.0"],
                ["^0", "0.1.0"],
                ["^0", "0.9.0"],
                ["^0", "0.1.2"],
                ["^0", "0.1.9"],
                ["^0", "1.0.0", false],
                ["^0.1", "0.1.0"],
                ["^0.1", "0.1.2"],
                ["^0.1", "0.1.9"],
                ["^0.1.2", "0.1.2"],
                ["^0.1.2", "0.1.9"],
                ["^0.1.2", "0.0.0", false],
                ["^0.1.2", "0.2.0", false],
                ["^0.1.2", "1.0.0", false],
                ["^1", "1.0.0"],
                ["^1", "1.2.0"],
                ["^1", "1.2.3"],
                ["^1", "1.9.0"],
                ["^1", "0.0.0", false],
                ["^1", "2.0.0", false],
                ["^1.2", "1.2.0"],
                ["^1.2", "1.2.3"],
                ["^1.2", "1.9.0"],
                ["^1.2", "1.1.0", false],
                ["^1.2", "2.0.0", false],
                ["^1.2.3", "1.2.3"],
                ["^1.2.3", "1.9.0"],
                ["^1.2.3", "1.2.2", false],
                ["^1.2.3", "2.0.0", false],
            ]);
        });
    });
}