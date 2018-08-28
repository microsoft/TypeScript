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
        static readonly zero = new Version(0, 0, 0);

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

        increment(field: "major" | "minor" | "patch") {
            switch (field) {
                case "major": return new Version(this.major + 1, 0, 0);
                case "minor": return new Version(this.major, this.minor + 1, 0);
                case "patch": return new Version(this.major, this.minor, this.patch + 1);
                default: return Debug.assertNever(field);
            }
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

    /**
     * Describes a semantic version range, per https://github.com/npm/node-semver#ranges
     */
    export class VersionRange {
        private _alternatives: ReadonlyArray<ReadonlyArray<Comparator>>;

        constructor(spec: string) {
            this._alternatives = spec ? Debug.assertDefined(parseRange(spec), "Invalid range spec.") : emptyArray;
        }

        static tryParse(text: string) {
            const sets = parseRange(text);
            if (sets) {
                const range = new VersionRange("");
                range._alternatives = sets;
                return range;
            }
            return undefined;
        }

        test(version: Version | string) {
            if (typeof version === "string") version = new Version(version);
            return testDisjunction(version, this._alternatives);
        }

        toString() {
            return formatDisjunction(this._alternatives);
        }
    }

    interface Comparator {
        readonly operator: "<" | "<=" | ">" | ">=" | "=";
        readonly operand: Version;
    }

    // https://github.com/npm/node-semver#range-grammar
    //
    // range-set    ::= range ( logical-or range ) *
    // range        ::= hyphen | simple ( ' ' simple ) * | ''
    // logical-or   ::= ( ' ' ) * '||' ( ' ' ) *
    const logicalOrRegExp = /\s*\|\|\s*/g;
    const whitespaceRegExp = /\s+/g;

    // https://github.com/npm/node-semver#range-grammar
    //
    // partial      ::= xr ( '.' xr ( '.' xr qualifier ? )? )?
    // xr           ::= 'x' | 'X' | '*' | nr
    // nr           ::= '0' | ['1'-'9'] ( ['0'-'9'] ) *
    // qualifier    ::= ( '-' pre )? ( '+' build )?
    // pre          ::= parts
    // build        ::= parts
    // parts        ::= part ( '.' part ) *
    // part         ::= nr | [-0-9A-Za-z]+
    const partialRegExp = /^([xX*0]|[1-9]\d*)(?:\.([xX*0]|[1-9]\d*)(?:\.([xX*0]|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

    // https://github.com/npm/node-semver#range-grammar
    //
    // hyphen       ::= partial ' - ' partial
    const hyphenRegExp = /^\s*([a-z0-9-+.*]+)\s+-\s+([a-z0-9-+.*]+)\s*$/i;

    // https://github.com/npm/node-semver#range-grammar
    //
    // simple       ::= primitive | partial | tilde | caret
    // primitive    ::= ( '<' | '>' | '>=' | '<=' | '=' ) partial
    // tilde        ::= '~' partial
    // caret        ::= '^' partial
    const rangeRegExp = /^\s*(~|\^|<|<=|>|>=|=)?\s*([a-z0-9-+.*]+)$/i;

    function parseRange(text: string) {
        const alternatives: Comparator[][] = [];
        for (const range of text.trim().split(logicalOrRegExp)) {
            if (!range) continue;
            const comparators: Comparator[] = [];
            const match = hyphenRegExp.exec(range);
            if (match) {
                if (!parseHyphen(match[1], match[2], comparators)) return undefined;
            }
            else {
                for (const simple of range.split(whitespaceRegExp)) {
                    const match = rangeRegExp.exec(simple);
                    if (!match || !parseComparator(match[1], match[2], comparators)) return undefined;
                }
            }
            alternatives.push(comparators);
        }
        return alternatives;
    }

    function parsePartial(text: string) {
        const match = partialRegExp.exec(text);
        if (!match) return undefined;

        const [, major, minor = "*", patch = "*", prerelease, build] = match;
        const version = new Version(
            isWildcard(major) ? 0 : parseInt(major, 10),
            isWildcard(major) || isWildcard(minor) ? 0 : parseInt(minor, 10),
            isWildcard(major) || isWildcard(minor) || isWildcard(patch) ? 0 : parseInt(patch, 10),
            prerelease,
            build);

        return { version, major, minor, patch };
    }

    function parseHyphen(left: string, right: string, comparators: Comparator[]) {
        const leftResult = parsePartial(left);
        if (!leftResult) return false;

        const rightResult = parsePartial(right);
        if (!rightResult) return false;

        if (!isWildcard(leftResult.major)) {
            comparators.push(createComparator(">=", leftResult.version));
        }

        if (!isWildcard(rightResult.major)) {
            comparators.push(
                isWildcard(rightResult.minor) ? createComparator("<", rightResult.version.increment("major")) :
                isWildcard(rightResult.patch) ? createComparator("<", rightResult.version.increment("minor")) :
                createComparator("<=", rightResult.version));
        }

        return true;
    }

    function parseComparator(operator: string, text: string, comparators: Comparator[]) {
        const result = parsePartial(text);
        if (!result) return false;

        const { version, major, minor, patch } = result;
        if (!isWildcard(major)) {
            switch (operator) {
                case "~":
                    comparators.push(createComparator(">=", version));
                    comparators.push(createComparator("<", version.increment(
                        isWildcard(minor) ? "major" :
                        "minor")));
                    break;
                case "^":
                    comparators.push(createComparator(">=", version));
                    comparators.push(createComparator("<", version.increment(
                        version.major > 0 || isWildcard(minor) ? "major" :
                        version.minor > 0 || isWildcard(patch) ? "minor" :
                        "patch")));
                    break;
                case "<":
                case ">=":
                    comparators.push(createComparator(operator, version));
                    break;
                case "<=":
                case ">":
                    comparators.push(
                        isWildcard(minor) ? createComparator(operator === "<=" ? "<" : ">=", version.increment("major")) :
                        isWildcard(patch) ? createComparator(operator === "<=" ? "<" : ">=", version.increment("minor")) :
                        createComparator(operator, version));
                    break;
                case "=":
                case undefined:
                    if (isWildcard(minor) || isWildcard(patch)) {
                        comparators.push(createComparator(">=", version));
                        comparators.push(createComparator("<", version.increment(isWildcard(minor) ? "major" : "minor")));
                    }
                    else {
                        comparators.push(createComparator("=", version));
                    }
                    break;
                default:
                    // unrecognized
                    return false;
            }
        }
        else if (operator === "<" || operator === ">") {
            comparators.push(createComparator("<", Version.zero));
        }

        return true;
    }

    function isWildcard(part: string) {
        return part === "*" || part === "x" || part === "X";
    }

    function createComparator(operator: Comparator["operator"], operand: Version) {
        return { operator, operand };
    }

    function testDisjunction(version: Version, alternatives: ReadonlyArray<ReadonlyArray<Comparator>>) {
        // an empty disjunction is treated as "*" (all versions)
        if (alternatives.length === 0) return true;
        for (const alternative of alternatives) {
            if (testAlternative(version, alternative)) return true;
        }
        return false;
    }

    function testAlternative(version: Version, comparators: ReadonlyArray<Comparator>) {
        for (const comparator of comparators) {
            if (!testComparator(version, comparator.operator, comparator.operand)) return false;
        }
        return true;
    }

    function testComparator(version: Version, operator: Comparator["operator"], operand: Version) {
        const cmp = version.compareTo(operand);
        switch (operator) {
            case "<": return cmp < 0;
            case "<=": return cmp <= 0;
            case ">": return cmp > 0;
            case ">=": return cmp >= 0;
            case "=": return cmp === 0;
            default: return Debug.assertNever(operator);
        }
    }

    function formatDisjunction(alternatives: ReadonlyArray<ReadonlyArray<Comparator>>) {
        return map(alternatives, formatAlternative).join(" || ") || "*";
    }

    function formatAlternative(comparators: ReadonlyArray<Comparator>) {
        return map(comparators, formatComparator).join(" ");
    }

    function formatComparator(comparator: Comparator) {
        return `${comparator.operator}${comparator.operand}`;
    }
}