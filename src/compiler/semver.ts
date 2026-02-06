import {
    compareStringsCaseSensitive,
    compareValues,
    Comparison,
    Debug,
    emptyArray,
    every,
    isArray,
    map,
    some,
} from "./_namespaces/ts.js";

// https://semver.org/#spec-item-2
// > A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative
// > integers, and MUST NOT contain leading zeroes. X is the major version, Y is the minor
// > version, and Z is the patch version. Each element MUST increase numerically.
//
// NOTE: We differ here in that we allow X and X.Y, with missing parts having the default
// value of `0`.
const versionRegExp = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

// https://semver.org/#spec-item-9
// > A pre-release version MAY be denoted by appending a hyphen and a series of dot separated
// > identifiers immediately following the patch version. Identifiers MUST comprise only ASCII
// > alphanumerics and hyphen [0-9A-Za-z-]. Identifiers MUST NOT be empty. Numeric identifiers
// > MUST NOT include leading zeroes.
const prereleaseRegExp = /^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)(?:\.(?:0|[1-9]\d*|[a-z-][a-z0-9-]*))*$/i;
const prereleasePartRegExp = /^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)$/i;

// https://semver.org/#spec-item-10
// > Build metadata MAY be denoted by appending a plus sign and a series of dot separated
// > identifiers immediately following the patch or pre-release version. Identifiers MUST
// > comprise only ASCII alphanumerics and hyphen [0-9A-Za-z-]. Identifiers MUST NOT be empty.
const buildRegExp = /^[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;
const buildPartRegExp = /^[a-z0-9-]+$/i;

// https://semver.org/#spec-item-9
// > Numeric identifiers MUST NOT include leading zeroes.
const numericIdentifierRegExp = /^(?:0|[1-9]\d*)$/;

/**
 * Describes a precise semantic version number, https://semver.org
 *
 * @internal
 */
export class Version {
    static readonly zero: Version = new Version(0, 0, 0, ["0"]);

    readonly major: number;
    readonly minor: number;
    readonly patch: number;
    readonly prerelease: readonly string[];
    readonly build: readonly string[];

    constructor(text: string);
    constructor(major: number, minor?: number, patch?: number, prerelease?: string | readonly string[], build?: string | readonly string[]);
    constructor(major: number | string, minor = 0, patch = 0, prerelease: string | readonly string[] = "", build: string | readonly string[] = "") {
        if (typeof major === "string") {
            const result = Debug.checkDefined(tryParseComponents(major), "Invalid version");
            ({ major, minor, patch, prerelease, build } = result);
        }

        Debug.assert(major >= 0, "Invalid argument: major");
        Debug.assert(minor >= 0, "Invalid argument: minor");
        Debug.assert(patch >= 0, "Invalid argument: patch");

        const prereleaseArray = prerelease ? isArray(prerelease) ? prerelease : prerelease.split(".") : emptyArray;
        const buildArray = build ? isArray(build) ? build : build.split(".") : emptyArray;

        Debug.assert(every(prereleaseArray, s => prereleasePartRegExp.test(s)), "Invalid argument: prerelease");
        Debug.assert(every(buildArray, s => buildPartRegExp.test(s)), "Invalid argument: build");

        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.prerelease = prereleaseArray;
        this.build = buildArray;
    }

    static tryParse(text: string): Version | undefined {
        const result = tryParseComponents(text);
        if (!result) return undefined;

        const { major, minor, patch, prerelease, build } = result;
        return new Version(major, minor, patch, prerelease, build);
    }

    compareTo(other: Version | undefined): Comparison {
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
            || comparePrereleaseIdentifiers(this.prerelease, other.prerelease);
    }

    increment(field: "major" | "minor" | "patch"): Version {
        switch (field) {
            case "major":
                return new Version(this.major + 1, 0, 0);
            case "minor":
                return new Version(this.major, this.minor + 1, 0);
            case "patch":
                return new Version(this.major, this.minor, this.patch + 1);
            default:
                return Debug.assertNever(field);
        }
    }

    with(fields: { major?: number; minor?: number; patch?: number; prerelease?: string | readonly string[]; build?: string | readonly string[]; }): Version {
        const {
            major = this.major,
            minor = this.minor,
            patch = this.patch,
            prerelease = this.prerelease,
            build = this.build,
        } = fields;
        return new Version(major, minor, patch, prerelease, build);
    }

    toString(): string {
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
        build,
    };
}

function comparePrereleaseIdentifiers(left: readonly string[], right: readonly string[]) {
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
 *
 * @internal
 */
export class VersionRange {
    private _alternatives: readonly (readonly Comparator[])[];

    constructor(spec: string) {
        this._alternatives = spec ? Debug.checkDefined(parseRange(spec), "Invalid range spec.") : emptyArray;
    }

    static tryParse(text: string): VersionRange | undefined {
        const sets = parseRange(text);
        if (sets) {
            const range = new VersionRange("");
            range._alternatives = sets;
            return range;
        }
        return undefined;
    }

    /**
     * Tests whether a version matches the range. This is equivalent to `satisfies(version, range, { includePrerelease: true })`.
     * in `node-semver`.
     */
    test(version: Version | string): boolean {
        if (typeof version === "string") version = new Version(version);
        return testDisjunction(version, this._alternatives);
    }

    toString(): string {
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
const logicalOrRegExp = /\|\|/;
const whitespaceRegExp = /\s+/;

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
const partialRegExp = /^([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$/i;

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
const rangeRegExp = /^([~^<>=]|<=|>=)?\s*([a-z0-9-+.*]+)$/i;

function parseRange(text: string) {
    const alternatives: Comparator[][] = [];
    for (let range of text.trim().split(logicalOrRegExp)) {
        if (!range) continue;
        const comparators: Comparator[] = [];
        range = range.trim();
        const match = hyphenRegExp.exec(range);
        if (match) {
            if (!parseHyphen(match[1], match[2], comparators)) return undefined;
        }
        else {
            for (const simple of range.split(whitespaceRegExp)) {
                const match = rangeRegExp.exec(simple.trim());
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
        build,
    );

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
                createComparator("<=", rightResult.version),
        );
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
                comparators.push(createComparator(
                    "<",
                    version.increment(
                        isWildcard(minor) ? "major" :
                            "minor",
                    ),
                ));
                break;
            case "^":
                comparators.push(createComparator(">=", version));
                comparators.push(createComparator(
                    "<",
                    version.increment(
                        version.major > 0 || isWildcard(minor) ? "major" :
                            version.minor > 0 || isWildcard(patch) ? "minor" :
                            "patch",
                    ),
                ));
                break;
            case "<":
            case ">=":
                comparators.push(
                    isWildcard(minor) || isWildcard(patch) ? createComparator(operator, version.with({ prerelease: "0" })) :
                        createComparator(operator, version),
                );
                break;
            case "<=":
            case ">":
                comparators.push(
                    isWildcard(minor) ? createComparator(operator === "<=" ? "<" : ">=", version.increment("major").with({ prerelease: "0" })) :
                        isWildcard(patch) ? createComparator(operator === "<=" ? "<" : ">=", version.increment("minor").with({ prerelease: "0" })) :
                        createComparator(operator, version),
                );
                break;
            case "=":
            case undefined:
                if (isWildcard(minor) || isWildcard(patch)) {
                    comparators.push(createComparator(">=", version.with({ prerelease: "0" })));
                    comparators.push(createComparator("<", version.increment(isWildcard(minor) ? "major" : "minor").with({ prerelease: "0" })));
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

function testDisjunction(version: Version, alternatives: readonly (readonly Comparator[])[]) {
    // an empty disjunction is treated as "*" (all versions)
    if (alternatives.length === 0) return true;
    for (const alternative of alternatives) {
        if (testAlternative(version, alternative)) return true;
    }
    return false;
}

function testAlternative(version: Version, comparators: readonly Comparator[]) {
    for (const comparator of comparators) {
        if (!testComparator(version, comparator.operator, comparator.operand)) return false;
    }
    return true;
}

function testComparator(version: Version, operator: Comparator["operator"], operand: Version) {
    const cmp = version.compareTo(operand);
    switch (operator) {
        case "<":
            return cmp < 0;
        case "<=":
            return cmp <= 0;
        case ">":
            return cmp > 0;
        case ">=":
            return cmp >= 0;
        case "=":
            return cmp === 0;
        default:
            return Debug.assertNever(operator);
    }
}

function formatDisjunction(alternatives: readonly (readonly Comparator[])[]) {
    return map(alternatives, formatAlternative).join(" || ") || "*";
}

function formatAlternative(comparators: readonly Comparator[]) {
    return map(comparators, formatComparator).join(" ");
}

function formatComparator(comparator: Comparator) {
    return `${comparator.operator}${comparator.operand}`;
}
