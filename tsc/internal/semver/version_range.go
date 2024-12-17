package semver

import (
	"regexp"
	"strings"
)

// https://github.com/npm/node-semver#range-grammar
//
// range-set    ::= range ( logical-or range ) *
// range        ::= hyphen | simple ( ' ' simple ) * | ”
// logical-or   ::= ( ' ' ) * '||' ( ' ' ) *
var (
	logicalOrRegExp  = regexp.MustCompile(`\|\|`)
	whitespaceRegExp = regexp.MustCompile(`\s+`)
)

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
var partialRegExp = regexp.MustCompile(`(?i)^([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$`)

// https://github.com/npm/node-semver#range-grammar
//
// hyphen       ::= partial ' - ' partial
var hyphenRegExp = regexp.MustCompile(`(?i)^\s*([a-z0-9-+.*]+)\s+-\s+([a-z0-9-+.*]+)\s*$`)

// https://github.com/npm/node-semver#range-grammar
//
// simple       ::= primitive | partial | tilde | caret
// primitive    ::= ( '<' | '>' | '>=' | '<=' | '=' ) partial
// tilde        ::= '~' partial
// caret        ::= '^' partial
var rangeRegExp = regexp.MustCompile(`(?i)^([~^<>=]|<=|>=)?\s*([a-z0-9-+.*]+)$`)

type VersionRange struct {
	alternatives [][]versionComparator
}

type versionComparator struct {
	operator comparatorOperator
	operand  Version
}

type comparatorOperator string

const (
	rangeLessThan         comparatorOperator = "<"
	rangeLessThanEqual    comparatorOperator = "<="
	rangeEqual            comparatorOperator = "="
	rangeGreaterThanEqual comparatorOperator = ">="
	rangeGreaterThan      comparatorOperator = ">"
)

func (v *VersionRange) String() string {
	var sb strings.Builder
	formatDisjunction(&sb, v.alternatives)
	return sb.String()
}

func formatDisjunction(sb *strings.Builder, alternatives [][]versionComparator) {
	origLen := sb.Len()

	for i, alternative := range alternatives {
		if i > 0 {
			sb.WriteString(" || ")
		}
		formatAlternative(sb, alternative)
	}

	if sb.Len() == origLen {
		sb.WriteString("*")
	}
}

func formatAlternative(sb *strings.Builder, comparators []versionComparator) {
	for i, comparator := range comparators {
		if i > 0 {
			sb.WriteByte(' ')
		}
		formatComparator(sb, comparator)
	}
}

func formatComparator(sb *strings.Builder, comparator versionComparator) {
	sb.WriteString(string(comparator.operator))
	sb.WriteString(comparator.operand.String())
}

func (v *VersionRange) Test(version *Version) bool {
	return testDisjunction(v.alternatives, version)
}

func testDisjunction(alternatives [][]versionComparator, version *Version) bool {
	// an empty disjunction is treated as "*" (all versions)
	if len(alternatives) == 0 {
		return true
	}

	for _, alternative := range alternatives {
		if testAlternative(alternative, version) {
			return true
		}
	}

	return false
}

func testAlternative(alternative []versionComparator, version *Version) bool {
	for _, comparator := range alternative {
		if !testComparator(comparator, version) {
			return false
		}
	}
	return true
}

func testComparator(comparator versionComparator, version *Version) bool {
	cmp := version.Compare(&comparator.operand)
	switch comparator.operator {
	case rangeLessThan:
		return cmp < 0
	case rangeLessThanEqual:
		return cmp <= 0
	case rangeEqual:
		return cmp == 0
	case rangeGreaterThanEqual:
		return cmp >= 0
	case rangeGreaterThan:
		return cmp > 0
	default:
		panic("Unexpected operator: " + comparator.operator)
	}
}

func TryParseVersionRange(text string) (VersionRange, bool) {
	alternatives, ok := parseAlternatives(text)
	return VersionRange{alternatives: alternatives}, ok
}

func parseAlternatives(text string) ([][]versionComparator, bool) {
	var alternatives [][]versionComparator

	text = strings.TrimSpace(text)
	ranges := logicalOrRegExp.Split(text, -1)
	for _, r := range ranges {
		r = strings.TrimSpace(r)
		if r == "" {
			continue
		}

		var comparators []versionComparator

		if hyphenMatch := hyphenRegExp.FindStringSubmatch(r); hyphenMatch != nil {
			if parsedComparators, ok := parseHyphen(hyphenMatch[1], hyphenMatch[2]); ok {
				comparators = append(comparators, parsedComparators...)
			} else {
				return nil, false
			}
		} else {
			for _, simple := range whitespaceRegExp.Split(r, -1) {
				match := rangeRegExp.FindStringSubmatch(strings.TrimSpace(simple))
				if match == nil {
					return nil, false
				}

				if parsedComparators, ok := parseComparator(match[1], match[2]); ok {
					comparators = append(comparators, parsedComparators...)
				} else {
					return nil, false
				}
			}
		}

		alternatives = append(alternatives, comparators)
	}

	return alternatives, true
}

func parseHyphen(left, right string) ([]versionComparator, bool) {
	leftResult, leftOk := parsePartial(left)
	if !leftOk {
		return nil, false
	}

	rightResult, rightOk := parsePartial(right)
	if !rightOk {
		return nil, false
	}

	var comparators []versionComparator
	if !isWildcard(leftResult.majorStr) {
		// `MAJOR.*.*-...` gives us `>=MAJOR.0.0 ...`
		comparators = append(comparators, versionComparator{
			operator: rangeGreaterThanEqual,
			operand:  leftResult.version,
		})
	}

	if !isWildcard(rightResult.majorStr) {
		var operator comparatorOperator
		operand := rightResult.version

		switch {
		case isWildcard(rightResult.minorStr):
			// `...-MAJOR.*.*` gives us `... <(MAJOR+1).0.0`
			operand = operand.incrementMajor()
			operator = rangeLessThan
		case isWildcard(rightResult.patchStr):
			// `...-MAJOR.MINOR.*` gives us `... <MAJOR.(MINOR+1).0`
			operand = operand.incrementMinor()
			operator = rangeLessThan
		default:
			// `...-MAJOR.MINOR.PATCH` gives us `... <=MAJOR.MINOR.PATCH`
			operator = rangeLessThanEqual
		}

		comparators = append(comparators, versionComparator{
			operator: operator,
			operand:  operand,
		})
	}

	return comparators, true
}

type partialVersion struct {
	version  Version
	majorStr string
	minorStr string
	patchStr string
}

// Produces a "partial" version
func parsePartial(text string) (partialVersion, bool) {
	match := partialRegExp.FindStringSubmatch(text)
	if match == nil {
		return partialVersion{}, false
	}

	majorStr := match[1]
	minorStr := match[2]
	patchStr := match[3]
	prereleaseStr := match[4]
	buildStr := match[5]

	if minorStr == "" {
		minorStr = "*"
	}
	if patchStr == "" {
		patchStr = "*"
	}

	var majorNumeric, minorNumeric, patchNumeric uint32
	var err error

	if isWildcard(majorStr) {
		majorNumeric = 0
		minorNumeric = 0
		patchNumeric = 0
	} else {
		majorNumeric, err = getUintComponent(majorStr)
		if err != nil {
			return partialVersion{}, false
		}

		if isWildcard(minorStr) {
			minorNumeric = 0
			patchNumeric = 0
		} else {
			minorNumeric, err = getUintComponent(minorStr)
			if err != nil {
				return partialVersion{}, false
			}

			if isWildcard(patchStr) {
				patchNumeric = 0
			} else {
				patchNumeric, err = getUintComponent(patchStr)
				if err != nil {
					return partialVersion{}, false
				}
			}
		}
	}

	var prerelease []string
	if prereleaseStr != "" {
		prerelease = strings.Split(prereleaseStr, ".")
	}

	var build []string
	if buildStr != "" {
		build = strings.Split(buildStr, ".")
	}

	result := partialVersion{
		version: Version{
			major:      majorNumeric,
			minor:      minorNumeric,
			patch:      patchNumeric,
			prerelease: prerelease,
			build:      build,
		},
		majorStr: majorStr,
		minorStr: minorStr,
		patchStr: patchStr,
	}

	return result, true
}

func parseComparator(op string, text string) ([]versionComparator, bool) {
	operator := comparatorOperator(op)

	result, ok := parsePartial(text)
	if !ok {
		return nil, false
	}

	var comparatorsResult []versionComparator

	if !isWildcard(result.majorStr) {
		switch operator {
		case "~":
			first := versionComparator{rangeGreaterThanEqual, result.version}

			var secondVersion Version
			if isWildcard(result.minorStr) {
				secondVersion = result.version.incrementMajor()
			} else {
				secondVersion = result.version.incrementMinor()
			}

			second := versionComparator{rangeLessThan, secondVersion}
			comparatorsResult = []versionComparator{first, second}

		case "^":
			first := versionComparator{rangeGreaterThanEqual, result.version}

			var secondVersion Version
			if result.version.major > 0 || isWildcard(result.minorStr) {
				secondVersion = result.version.incrementMajor()
			} else if result.version.minor > 0 || isWildcard(result.patchStr) {
				secondVersion = result.version.incrementMinor()
			} else {
				secondVersion = result.version.incrementPatch()
			}
			second := versionComparator{rangeLessThan, secondVersion}
			comparatorsResult = []versionComparator{first, second}

		case "<", ">=":
			version := result.version
			if isWildcard(result.minorStr) || isWildcard(result.patchStr) {
				version.prerelease = []string{"0"}
			}
			comparatorsResult = []versionComparator{
				{operator, version},
			}

		case "<=", ">":
			version := result.version
			if isWildcard(result.minorStr) {
				if operator == rangeLessThanEqual {
					operator = rangeLessThan
				} else {
					operator = rangeGreaterThanEqual
				}

				version = version.incrementMajor()
				version.prerelease = []string{"0"}
			} else if isWildcard(result.patchStr) {
				if operator == rangeLessThanEqual {
					operator = rangeLessThan
				} else {
					operator = rangeGreaterThanEqual
				}

				version = version.incrementMinor()
				version.prerelease = []string{"0"}
			}

			comparatorsResult = []versionComparator{
				{operator, version},
			}
		case "=", "":
			// normalize empty string to `=`
			operator = rangeEqual

			if isWildcard(result.minorStr) || isWildcard(result.patchStr) {
				originalVersion := result.version

				firstVersion := originalVersion
				firstVersion.prerelease = []string{"0"}

				var secondVersion Version
				if isWildcard(result.minorStr) {
					secondVersion = originalVersion.incrementMajor()
				} else {
					secondVersion = originalVersion.incrementMinor()
				}
				secondVersion.prerelease = []string{"0"}

				comparatorsResult = []versionComparator{
					{rangeGreaterThanEqual, firstVersion},
					{rangeLessThan, secondVersion},
				}
			} else {
				comparatorsResult = []versionComparator{
					{operator, result.version},
				}
			}
		default:
			panic("Unexpected operator: " + operator)
		}
	} else {
		if operator == "<" || operator == ">" {
			comparatorsResult = []versionComparator{
				// < 0.0.0-0
				{rangeLessThan, versionZero},
			}
		}
	}

	return comparatorsResult, true
}

func isWildcard(text string) bool {
	return text == "*" || text == "x" || text == "X"
}
