/* @internal */
namespace ts {
    // https://semver.org/#spec-item-2
    // > A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative
    // > integers, and MUST NOT contain leading zeroes. X is the major version, Y is the minor
    // > version, and Z is the patch version. Each element MUST increase numerically.
    //
    // NOTE: We differ here in that we allow X and X.Y, with missing parts having the default
    // value of `0`.
    const versionRegExp = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

    // https://semver.org/#spec-item-9
    // > A pre-release version MAY be denoted by appending a hyphen and a series of dot separated
    // > identifiers immediately following the patch version. Identifiers MUST comprise only ASCII
    // > alphanumerics and hyphen [0-9A-Za-z-]. Identifiers MUST NOT be empty. Numeric identifiers
    // > MUST NOT include leading zeroes.
    const prereleaseRegExp = /^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)(?:\.(?:0|[1-9]\d*|[a-z-][a-z0-9-]*))*$/i;

    // https://semver.org/#spec-item-10
    // > Build metadata MAY be denoted by appending a plus sign and a series of dot separated
    // > identifiers immediately following the patch or pre-release version. Identifiers MUST
    // > comprise only ASCII alphanumerics and hyphen [0-9A-Za-z-]. Identifiers MUST NOT be empty.
    const buildRegExp = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;

    // https://semver.org/#spec-item-9
    // > Numeric identifiers MUST NOT include leading zeroes.
    const numericIdentifierRegExp = /^(0|[1-9]\d*)$/;

    /**
     * Describes a precise semantic version number, https://semver.org
     */
    export class Version {
        readonly major: number;
        readonly minor: number;
        readonly patch: number;
        readonly prerelease: ReadonlyArray<string>;
        readonly build: ReadonlyArray<string>;

        constructor(text: string);
        constructor(major: number, minor?: number, patch?: number, prerelease?: string, build?: string);
        constructor(major: number | string, minor = 0, patch = 0, prerelease = "", build = "") {
            if (typeof major === "string") {
                const result = Debug.assertDefined(tryParseComponents(major), "Invalid version");
                ({ major, minor, patch, prerelease, build } = result);
            }

            Debug.assert(major >= 0, "Invalid argument: major");
            Debug.assert(minor >= 0, "Invalid argument: minor");
            Debug.assert(patch >= 0, "Invalid argument: patch");
            Debug.assert(!prerelease || prereleaseRegExp.test(prerelease), "Invalid argument: prerelease");
            Debug.assert(!build || buildRegExp.test(build), "Invalid argument: build");
            this.major = major;
            this.minor = minor;
            this.patch = patch;
            this.prerelease = prerelease ? prerelease.split(".") : emptyArray;
            this.build = build ? build.split(".") : emptyArray;
        }

        static tryParse(text: string) {
            const result = tryParseComponents(text);
            if (!result) return undefined;

            const { major, minor, patch, prerelease, build } = result;
            return new Version(major, minor, patch, prerelease, build);
        }

        compareTo(other: Version | undefined) {
            // https://semver.org/#spec-item-11
            // > Precedence is determined by the first difference when comparing each of these
            // > identifiers from left to right as follows: Major, minor, and patch versions are
            // > always compared numerically.
            //
            // https://semver.org/#spec-item-11
            // > Precedence for two pre-release versions with the same major, minor, and patch version
            // > MUST be determined by comparing each dot separated identifier from left to right until
            // > a difference is found [...]
            //
            // https://semver.org/#spec-item-11
            // > Build metadata does not figure into precedence
            if (this === other) return Comparison.EqualTo;
            if (other === undefined) return Comparison.GreaterThan;
            return compareValues(this.major, other.major)
                || compareValues(this.minor, other.minor)
                || compareValues(this.patch, other.patch)
                || comparePrerelaseIdentifiers(this.prerelease, other.prerelease);
        }

        toString() {
            let result = `${this.major}.${this.minor}.${this.patch}`;
            if (some(this.prerelease)) result += `-${this.prerelease.join(".")}`;
            if (some(this.build)) result += `+${this.build.join(".")}`;
            return result;
        }
    }

    function tryParseComponents(text: string) {
        const match = versionRegExp.exec(text);
        if (!match) return undefined;

        const [, major, minor = "0", patch = "0", prerelease = "", build = ""] = match;
        if (prerelease && !prereleaseRegExp.test(prerelease)) return undefined;
        if (build && !buildRegExp.test(build)) return undefined;
        return {
            major: parseInt(major, 10),
            minor: parseInt(minor, 10),
            patch: parseInt(patch, 10),
            prerelease,
            build
        };
    }

    function comparePrerelaseIdentifiers(left: ReadonlyArray<string>, right: ReadonlyArray<string>) {
        // https://semver.org/#spec-item-11
        // > When major, minor, and patch are equal, a pre-release version has lower precedence
        // > than a normal version.
        if (left === right) return Comparison.EqualTo;
        if (left.length === 0) return right.length === 0 ? Comparison.EqualTo : Comparison.GreaterThan;
        if (right.length === 0) return Comparison.LessThan;

        // https://semver.org/#spec-item-11
        // > Precedence for two pre-release versions with the same major, minor, and patch version
        // > MUST be determined by comparing each dot separated identifier from left to right until
        // > a difference is found [...]
        const length = Math.min(left.length, right.length);
        for (let i = 0; i < length; i++) {
            const leftIdentifier = left[i];
            const rightIdentifier = right[i];
            if (leftIdentifier === rightIdentifier) continue;

            const leftIsNumeric = numericIdentifierRegExp.test(leftIdentifier);
            const rightIsNumeric = numericIdentifierRegExp.test(rightIdentifier);
            if (leftIsNumeric || rightIsNumeric) {
                // https://semver.org/#spec-item-11
                // > Numeric identifiers always have lower precedence than non-numeric identifiers.
                if (leftIsNumeric !== rightIsNumeric) return leftIsNumeric ? Comparison.LessThan : Comparison.GreaterThan;

                // https://semver.org/#spec-item-11
                // > identifiers consisting of only digits are compared numerically
                const result = compareValues(+leftIdentifier, +rightIdentifier);
                if (result) return result;
            }
            else {
                // https://semver.org/#spec-item-11
                // > identifiers with letters or hyphens are compared lexically in ASCII sort order.
                const result = compareStringsCaseSensitive(leftIdentifier, rightIdentifier);
                if (result) return result;
            }
        }

        // https://semver.org/#spec-item-11
        // > A larger set of pre-release fields has a higher precedence than a smaller set, if all
        // > of the preceding identifiers are equal.
        return compareValues(left.length, right.length);
    }
}