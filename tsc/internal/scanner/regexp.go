package scanner

import (
	"math"
	"strconv"
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type regularExpressionFlags int32

const (
	regularExpressionFlagsNone           regularExpressionFlags = 0
	regularExpressionFlagsHasIndices     regularExpressionFlags = 1 << 0 // d
	regularExpressionFlagsGlobal         regularExpressionFlags = 1 << 1 // g
	regularExpressionFlagsIgnoreCase     regularExpressionFlags = 1 << 2 // i
	regularExpressionFlagsMultiline      regularExpressionFlags = 1 << 3 // m
	regularExpressionFlagsDotAll         regularExpressionFlags = 1 << 4 // s
	regularExpressionFlagsUnicode        regularExpressionFlags = 1 << 5 // u
	regularExpressionFlagsUnicodeSets    regularExpressionFlags = 1 << 6 // v
	regularExpressionFlagsSticky         regularExpressionFlags = 1 << 7 // y
	regularExpressionFlagsAnyUnicodeMode regularExpressionFlags = regularExpressionFlagsUnicode | regularExpressionFlagsUnicodeSets
	regularExpressionFlagsModifiers      regularExpressionFlags = regularExpressionFlagsIgnoreCase | regularExpressionFlagsMultiline | regularExpressionFlagsDotAll
)

var charCodeToRegExpFlag = map[rune]regularExpressionFlags{
	'd': regularExpressionFlagsHasIndices,
	'g': regularExpressionFlagsGlobal,
	'i': regularExpressionFlagsIgnoreCase,
	'm': regularExpressionFlagsMultiline,
	's': regularExpressionFlagsDotAll,
	'u': regularExpressionFlagsUnicode,
	'v': regularExpressionFlagsUnicodeSets,
	'y': regularExpressionFlagsSticky,
}

var regExpFlagToFirstAvailableLanguageVersion = map[regularExpressionFlags]core.ScriptTarget{
	regularExpressionFlagsHasIndices:  core.ScriptTargetES2022,
	regularExpressionFlagsDotAll:      core.ScriptTargetES2018,
	regularExpressionFlagsUnicodeSets: core.ScriptTargetES2024,
}

func (s *Scanner) checkRegularExpressionFlagAvailability(flag regularExpressionFlags, pos int, size int) {
	if availableFrom, ok := regExpFlagToFirstAvailableLanguageVersion[flag]; ok && s.languageVersion() < availableFrom {
		s.errorAt(diagnostics.This_regular_expression_flag_is_only_available_when_targeting_0_or_later, pos, size, strings.ToLower(availableFrom.String()))
	}
}

type classSetExpressionType int

const (
	classSetExpressionTypeUnknown classSetExpressionType = iota
	classSetExpressionTypeClassUnion
	classSetExpressionTypeClassIntersection
	classSetExpressionTypeClassSubtraction
)

type groupNameReference struct {
	pos  int
	end  int
	name string
}

type decimalEscapeValue struct {
	pos   int
	end   int
	value int
}

type regExpParser struct {
	scanner         *Scanner
	end             int
	regExpFlags     regularExpressionFlags
	anyUnicodeMode  bool
	unicodeSetsMode bool
	annexB          bool

	anyUnicodeModeOrNonAnnexB bool
	namedCaptureGroups        bool

	// See scanClassSetExpression.
	mayContainStrings bool
	// The number of all (named and unnamed) capturing groups defined in the regex.
	numberOfCapturingGroups int
	// All named capturing groups defined in the regex.
	groupSpecifiers map[string]bool
	// All references to named capturing groups in the regex.
	groupNameReferences []groupNameReference
	// All numeric backreferences within the regex.
	decimalEscapes []decimalEscapeValue
	// A stack of scopes for named capturing groups. See scanGroupName.
	namedCapturingGroups []map[string]bool

	// pendingLowSurrogate holds the low surrogate to emit on the next
	// scanSourceCharacter call when Corsa has to split a non-BMP rune into
	// UTF-16 surrogate code units in non-unicode mode. Strada did not need
	// this bookkeeping because its source text was already indexed as UTF-16.
	pendingLowSurrogate rune
}

func (p *regExpParser) pos() int {
	return p.scanner.pos
}

func (p *regExpParser) setPos(v int) {
	p.scanner.pos = v
}

func (p *regExpParser) incPos(n int) {
	p.scanner.pos += n
}

func (p *regExpParser) char() rune {
	return p.scanner.char()
}

func (p *regExpParser) charAt(pos int) rune {
	return p.scanner.charAt(pos - p.pos())
}

func (p *regExpParser) error(msg *diagnostics.Message, pos int, length int, args ...any) {
	p.scanner.errorAt(msg, pos, length, args...)
}

func (p *regExpParser) text() string {
	return p.scanner.text
}

func compareDecimalStrings(a string, b string) int {
	a = strings.TrimLeft(a, "0")
	b = strings.TrimLeft(b, "0")
	if a == "" {
		a = "0"
	}
	if b == "" {
		b = "0"
	}
	if len(a) != len(b) {
		if len(a) < len(b) {
			return -1
		}
		return 1
	}
	return strings.Compare(a, b)
}

// Disjunction ::= Alternative ('|' Alternative)*
func (p *regExpParser) scanDisjunction(isInGroup bool) {
	for {
		p.namedCapturingGroups = append(p.namedCapturingGroups, make(map[string]bool))
		p.scanAlternative(isInGroup)
		p.namedCapturingGroups = p.namedCapturingGroups[:len(p.namedCapturingGroups)-1]
		if p.char() != '|' {
			return
		}
		p.incPos(1)
	}
}

// Alternative ::= Term*
// Term ::=
//
//	| Assertion
//	| Atom Quantifier?
//
// Assertion ::=
//
//	| '^'
//	| '$'
//	| '\b'
//	| '\B'
//	| '(?=' Disjunction ')'
//	| '(?!' Disjunction ')'
//	| '(?<=' Disjunction ')'
//	| '(?<!' Disjunction ')'
//
// Quantifier ::= QuantifierPrefix '?'?
// QuantifierPrefix ::=
//
//	| '*'
//	| '+'
//	| '?'
//	| '{' DecimalDigits (',' DecimalDigits?)? '}'
//
// Atom ::=
//
//	| PatternCharacter
//	| '.'
//	| '\' AtomEscape
//	| CharacterClass
//	| '(?<' RegExpIdentifierName '>' Disjunction ')'
//	| '(?' RegularExpressionFlags ('-' RegularExpressionFlags)? ':' Disjunction ')'
//
// CharacterClass ::= unicodeMode
//
//	? '[' ClassRanges ']'
//	: '[' ClassSetExpression ']'
func (p *regExpParser) scanAlternative(isInGroup bool) {
	isPreviousTermQuantifiable := false
	for p.pos() < p.end {
		start := p.pos()
		ch := p.char()
		switch ch {
		case '^', '$':
			p.incPos(1)
			isPreviousTermQuantifiable = false
		case '\\':
			p.incPos(1)
			switch p.char() {
			case 'b', 'B':
				p.incPos(1)
				isPreviousTermQuantifiable = false
			default:
				p.scanAtomEscape()
				isPreviousTermQuantifiable = true
			}
		case '(':
			p.incPos(1)
			if p.char() == '?' {
				p.incPos(1)
				switch p.char() {
				case '=', '!':
					p.incPos(1)
					// In Annex B, `(?=Disjunction)` and `(?!Disjunction)` are quantifiable
					isPreviousTermQuantifiable = !p.anyUnicodeModeOrNonAnnexB
				case '<':
					groupNameStart := p.pos()
					p.incPos(1)
					switch p.char() {
					case '=', '!':
						p.incPos(1)
						isPreviousTermQuantifiable = false
					default:
						p.scanGroupName(false /*isReference*/)
						p.scanExpectedChar('>')
						if p.scanner.languageVersion() < core.ScriptTargetES2018 {
							p.error(diagnostics.Named_capturing_groups_are_only_available_when_targeting_ES2018_or_later, groupNameStart, p.pos()-groupNameStart)
						}
						p.numberOfCapturingGroups++
						isPreviousTermQuantifiable = true
					}
				default:
					flagsStart := p.pos()
					setFlags := p.scanPatternModifiers(regularExpressionFlagsNone)
					if p.char() == '-' {
						p.incPos(1)
						p.scanPatternModifiers(setFlags)
						if p.pos() == flagsStart+1 {
							p.error(diagnostics.Subpattern_flags_must_be_present_when_there_is_a_minus_sign, flagsStart, p.pos()-flagsStart)
						}
					}
					p.scanExpectedChar(':')
					isPreviousTermQuantifiable = true
				}
			} else {
				p.numberOfCapturingGroups++
				isPreviousTermQuantifiable = true
			}
			p.scanDisjunction(true /*isInGroup*/)
			p.scanExpectedChar(')')
		case '{':
			p.incPos(1)
			digitsStart := p.pos()
			p.scanDigits()
			minStr := p.scanner.tokenValue
			if !p.anyUnicodeModeOrNonAnnexB && minStr == "" {
				isPreviousTermQuantifiable = true
				continue
			}
			if p.char() == ',' {
				p.incPos(1)
				p.scanDigits()
				maxStr := p.scanner.tokenValue
				if minStr == "" {
					if maxStr != "" || p.char() == '}' {
						p.error(diagnostics.Incomplete_quantifier_Digit_expected, digitsStart, 0)
					} else {
						p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, string(ch))
						isPreviousTermQuantifiable = true
						continue
					}
				} else if maxStr != "" {
					if compareDecimalStrings(minStr, maxStr) > 0 && (p.anyUnicodeModeOrNonAnnexB || p.char() == '}') {
						p.error(diagnostics.Numbers_out_of_order_in_quantifier, digitsStart, p.pos()-digitsStart)
					}
				}
			} else if minStr == "" {
				if p.anyUnicodeModeOrNonAnnexB {
					p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, string(ch))
				}
				isPreviousTermQuantifiable = true
				continue
			}
			if p.char() != '}' {
				if p.anyUnicodeModeOrNonAnnexB {
					p.error(diagnostics.X_0_expected, p.pos(), 0, "}")
					p.incPos(-1)
				} else {
					isPreviousTermQuantifiable = true
					continue
				}
			}
			fallthrough
		case '*', '+', '?':
			p.incPos(1)
			if p.char() == '?' {
				// Non-greedy
				p.incPos(1)
			}
			if !isPreviousTermQuantifiable {
				p.error(diagnostics.There_is_nothing_available_for_repetition, start, p.pos()-start)
			}
			isPreviousTermQuantifiable = false
		case '.':
			p.incPos(1)
			isPreviousTermQuantifiable = true
		case '[':
			p.incPos(1)
			if p.unicodeSetsMode {
				p.scanClassSetExpression()
			} else {
				p.scanClassRanges()
				p.pendingLowSurrogate = 0
			}
			p.scanExpectedChar(']')
			isPreviousTermQuantifiable = true
		case ')':
			if isInGroup {
				return
			}
			fallthrough
		case ']', '}':
			if p.anyUnicodeModeOrNonAnnexB || ch == ')' {
				p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos(), 1, string(ch))
			}
			p.incPos(1)
			isPreviousTermQuantifiable = true
		case '/', '|':
			return
		default:
			p.scanSourceCharacter()
			isPreviousTermQuantifiable = true
		}
	}
}

func (p *regExpParser) scanPatternModifiers(currFlags regularExpressionFlags) regularExpressionFlags {
	for p.pos() < p.end {
		ch, size := utf8.DecodeRuneInString(p.text()[p.pos():])
		if ch == utf8.RuneError || !IsIdentifierPart(ch) {
			break
		}
		flag, ok := charCodeToRegExpFlag[ch]
		if !ok {
			p.error(diagnostics.Unknown_regular_expression_flag, p.pos(), size)
		} else if currFlags&flag != 0 {
			p.error(diagnostics.Duplicate_regular_expression_flag, p.pos(), size)
		} else if flag&regularExpressionFlagsModifiers == 0 {
			p.error(diagnostics.This_regular_expression_flag_cannot_be_toggled_within_a_subpattern, p.pos(), size)
		} else {
			currFlags |= flag
			p.scanner.checkRegularExpressionFlagAvailability(flag, p.pos(), size)
		}
		p.incPos(size)
	}
	return currFlags
}

// AtomEscape ::=
//
//	| DecimalEscape
//	| CharacterClassEscape
//	| CharacterEscape
//	| 'k<' RegExpIdentifierName '>'
func (p *regExpParser) scanAtomEscape() {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '\\')
	switch p.char() {
	case 'k':
		p.incPos(1)
		if p.char() == '<' {
			p.incPos(1)
			p.scanGroupName(true /*isReference*/)
			p.scanExpectedChar('>')
		} else if p.anyUnicodeModeOrNonAnnexB || p.namedCaptureGroups {
			p.error(diagnostics.X_k_must_be_followed_by_a_capturing_group_name_enclosed_in_angle_brackets, p.pos()-2, 2)
		}
	case 'q':
		if p.unicodeSetsMode {
			p.incPos(1)
			p.error(diagnostics.X_q_is_only_available_inside_character_class, p.pos()-2, 2)
			return
		}
		fallthrough
	default:
		if !p.scanCharacterClassEscape() && !p.scanDecimalEscape() {
			// Regex literals cannot contain line breaks here, so a character escape must consume something.
			debug.Assert(p.scanCharacterEscape(true /*atomEscape*/) != "")
		}
	}
}

// DecimalEscape ::= [1-9] [0-9]*
func (p *regExpParser) scanDecimalEscape() bool {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '\\')
	ch := p.char()
	if ch >= '1' && ch <= '9' {
		start := p.pos()
		p.scanDigits()
		val, err := strconv.Atoi(p.scanner.tokenValue)
		if err != nil {
			val = math.MaxInt
		}
		p.decimalEscapes = append(p.decimalEscapes, decimalEscapeValue{pos: start, end: p.pos(), value: val})
		return true
	}
	return false
}

// CharacterEscape ::=
//
//	| `c` ControlLetter
//	| IdentityEscape
//	| (Other sequences handled by `scanEscapeSequence`)
//
// IdentityEscape ::=
//
//	| '^' | '$' | '/' | '\' | '.' | '*' | '+' | '?' | '(' | ')' | '[' | ']' | '{' | '}' | '|'
//	| [~AnyUnicodeMode] (any other non-identifier characters)
func (p *regExpParser) scanCharacterEscape(atomEscape bool) string {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '\\')
	ch := p.char()
	switch ch {
	case -1:
		p.error(diagnostics.Undetermined_character_escape, p.pos()-1, 1)
		return "\\"
	case 'c':
		p.incPos(1)
		ch = p.char()
		if stringutil.IsASCIILetter(ch) {
			p.incPos(1)
			return string(ch & 0x1f)
		}
		if p.anyUnicodeModeOrNonAnnexB {
			p.error(diagnostics.X_c_must_be_followed_by_an_ASCII_letter, p.pos()-2, 2)
		} else if atomEscape {
			p.incPos(-1)
			return "\\"
		}
		return string(ch)
	case '^', '$', '/', '\\', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|':
		p.incPos(1)
		return string(ch)
	default:
		p.incPos(-1) // back up to include the backslash for scanEscapeSequence
		flags := EscapeSequenceScanningFlagsRegularExpression
		if p.annexB {
			flags |= EscapeSequenceScanningFlagsAnnexB
		}
		if p.anyUnicodeMode {
			flags |= EscapeSequenceScanningFlagsAnyUnicodeMode
		}
		if atomEscape {
			flags |= EscapeSequenceScanningFlagsAtomEscape
		}
		return p.scanner.scanEscapeSequence(flags)
	}
}

func (p *regExpParser) scanGroupName(isReference bool) {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '<')
	p.scanner.tokenStart = p.pos()
	p.scanner.scanIdentifier(0)
	if p.pos() == p.scanner.tokenStart {
		p.error(diagnostics.Expected_a_capturing_group_name, p.pos(), 0)
	} else if isReference {
		p.groupNameReferences = append(p.groupNameReferences, groupNameReference{pos: p.scanner.tokenStart, end: p.pos(), name: p.scanner.tokenValue})
	} else if p.namedCapturingGroupsContains(p.scanner.tokenValue) {
		p.error(diagnostics.Named_capturing_groups_with_the_same_name_must_be_mutually_exclusive_to_each_other, p.scanner.tokenStart, p.pos()-p.scanner.tokenStart)
	} else {
		if len(p.namedCapturingGroups) > 0 {
			p.namedCapturingGroups[len(p.namedCapturingGroups)-1][p.scanner.tokenValue] = true
		}
		p.groupSpecifiers[p.scanner.tokenValue] = true
	}
}

func (p *regExpParser) namedCapturingGroupsContains(name string) bool {
	for _, group := range p.namedCapturingGroups {
		if group[name] {
			return true
		}
	}
	return false
}

func (p *regExpParser) isClassContentExit(ch rune) bool {
	return ch == ']' || p.pos() >= p.end
}

// ClassRanges ::= '^'? (ClassAtom ('-' ClassAtom)?)*
func (p *regExpParser) scanClassRanges() {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '[')
	p.pendingLowSurrogate = 0
	if p.char() == '^' {
		p.incPos(1)
	}
	for p.pos() < p.end {
		ch := p.char()
		if p.isClassContentExit(ch) {
			return
		}
		minStart := p.pos()
		minCharacter := p.scanClassAtom()
		if p.char() == '-' {
			p.incPos(1)
			ch = p.char()
			if p.isClassContentExit(ch) {
				return
			}
			if minCharacter == "" && p.anyUnicodeModeOrNonAnnexB {
				p.error(diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, minStart, p.pos()-1-minStart)
			}
			maxStart := p.pos()
			maxCharacter := p.scanClassAtom()
			if maxCharacter == "" && p.anyUnicodeModeOrNonAnnexB {
				p.error(diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, maxStart, p.pos()-maxStart)
				continue
			}
			if minCharacter == "" {
				continue
			}
			minCharacterValue, minSize := decodeClassAtomRune(minCharacter)
			maxCharacterValue, maxSize := decodeClassAtomRune(maxCharacter)
			if len(minCharacter) == minSize && len(maxCharacter) == maxSize && minCharacterValue > maxCharacterValue {
				p.error(diagnostics.Range_out_of_order_in_character_class, minStart, p.pos()-minStart)
			}
		}
	}
}

// Static Semantics: MayContainStrings
//     ClassUnion: ClassSetOperands.some(ClassSetOperand => ClassSetOperand.MayContainStrings)
//     ClassIntersection: ClassSetOperands.every(ClassSetOperand => ClassSetOperand.MayContainStrings)
//     ClassSubtraction: ClassSetOperands[0].MayContainStrings
//     ClassSetOperand:
//         || ClassStringDisjunctionContents.MayContainStrings
//         || CharacterClassEscape.UnicodePropertyValueExpression.LoneUnicodePropertyNameOrValue.MayContainStrings
//     ClassStringDisjunctionContents: ClassStrings.some(ClassString => ClassString.ClassSetCharacters.length !== 1)
//     LoneUnicodePropertyNameOrValue: isBinaryUnicodePropertyOfStrings(LoneUnicodePropertyNameOrValue)

// ClassSetExpression ::= '^'? (ClassUnion | ClassIntersection | ClassSubtraction)
// ClassUnion ::= (ClassSetRange | ClassSetOperand)*
// ClassIntersection ::= ClassSetOperand ('&&' ClassSetOperand)+
// ClassSubtraction ::= ClassSetOperand ('--' ClassSetOperand)+
// ClassSetRange ::= ClassSetCharacter '-' ClassSetCharacter
func (p *regExpParser) scanClassSetExpression() {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '[')
	isCharacterComplement := false
	if p.char() == '^' {
		p.incPos(1)
		isCharacterComplement = true
	}
	expressionMayContainStrings := false
	ch := p.char()
	if p.isClassContentExit(ch) {
		return
	}
	start := p.pos()
	var operand string
	twoChars := ""
	if p.pos()+1 < p.end {
		twoChars = p.text()[p.pos() : p.pos()+2]
	}
	switch twoChars {
	case "--", "&&":
		p.error(diagnostics.Expected_a_class_set_operand, p.pos(), 0)
		p.mayContainStrings = false
	default:
		operand = p.scanClassSetOperand()
	}
	switch p.char() {
	case '-':
		if p.pos()+1 < p.end && p.charAt(p.pos()+1) == '-' {
			if isCharacterComplement && p.mayContainStrings {
				p.error(diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, p.pos()-start)
			}
			expressionMayContainStrings = p.mayContainStrings
			p.scanClassSetSubExpression(classSetExpressionTypeClassSubtraction)
			p.mayContainStrings = !isCharacterComplement && expressionMayContainStrings
			return
		}
	case '&':
		if p.pos()+1 < p.end && p.charAt(p.pos()+1) == '&' {
			p.scanClassSetSubExpression(classSetExpressionTypeClassIntersection)
			if isCharacterComplement && p.mayContainStrings {
				p.error(diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, p.pos()-start)
			}
			expressionMayContainStrings = p.mayContainStrings
			p.mayContainStrings = !isCharacterComplement && expressionMayContainStrings
			return
		} else {
			p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos(), 1, string(ch))
		}
	default:
		if isCharacterComplement && p.mayContainStrings {
			p.error(diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, p.pos()-start)
		}
		expressionMayContainStrings = p.mayContainStrings
	}
	for p.pos() < p.end {
		ch = p.char()
		switch ch {
		case '-':
			p.incPos(1)
			ch = p.char()
			if p.isClassContentExit(ch) {
				p.mayContainStrings = !isCharacterComplement && expressionMayContainStrings
				return
			}
			if ch == '-' {
				p.incPos(1)
				p.error(diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, p.pos()-2, 2)
				start = p.pos() - 2
				operand = p.text()[start:p.pos()]
				continue
			} else {
				if operand == "" {
					p.error(diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, start, p.pos()-1-start)
				}
				secondStart := p.pos()
				secondOperand := p.scanClassSetOperand()
				if isCharacterComplement && p.mayContainStrings {
					p.error(diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, secondStart, p.pos()-secondStart)
				}
				expressionMayContainStrings = expressionMayContainStrings || p.mayContainStrings
				if secondOperand == "" {
					p.error(diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, secondStart, p.pos()-secondStart)
				} else if operand != "" {
					minCharacterValue, minSize := decodeClassAtomRune(operand)
					maxCharacterValue, maxSize := decodeClassAtomRune(secondOperand)
					if len(operand) == minSize && len(secondOperand) == maxSize && minCharacterValue > maxCharacterValue {
						p.error(diagnostics.Range_out_of_order_in_character_class, start, p.pos()-start)
					}
				}
			}
		case '&':
			start = p.pos()
			p.incPos(1)
			if p.char() == '&' {
				p.incPos(1)
				p.error(diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, p.pos()-2, 2)
				if p.char() == '&' {
					p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos(), 1, string(ch))
					p.incPos(1)
				}
			} else {
				p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos()-1, 1, string(ch))
			}
			operand = p.text()[start:p.pos()]
			continue
		}
		if p.isClassContentExit(p.char()) {
			break
		}
		start = p.pos()
		twoChars = ""
		if p.pos()+1 < p.end {
			twoChars = p.text()[p.pos() : p.pos()+2]
		}
		switch twoChars {
		case "--", "&&":
			p.error(diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, p.pos(), 2)
			p.incPos(2)
			operand = p.text()[start:p.pos()]
		default:
			operand = p.scanClassSetOperand()
		}
	}
	p.mayContainStrings = !isCharacterComplement && expressionMayContainStrings
}

func (p *regExpParser) scanClassSetSubExpression(expressionType classSetExpressionType) {
	expressionMayContainStrings := p.mayContainStrings
	for p.pos() < p.end {
		ch := p.char()
		if p.isClassContentExit(ch) {
			break
		}
		switch ch {
		case '-':
			p.incPos(1)
			if p.char() == '-' {
				p.incPos(1)
				if expressionType != classSetExpressionTypeClassSubtraction {
					p.error(diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, p.pos()-2, 2)
				}
			} else {
				p.error(diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, p.pos()-1, 1)
			}
		case '&':
			p.incPos(1)
			if p.char() == '&' {
				p.incPos(1)
				if expressionType != classSetExpressionTypeClassIntersection {
					p.error(diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, p.pos()-2, 2)
				}
				if p.char() == '&' {
					p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos(), 1, string(ch))
					p.incPos(1)
				}
			} else {
				p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos()-1, 1, string(ch))
			}
		default:
			switch expressionType {
			case classSetExpressionTypeClassSubtraction:
				p.error(diagnostics.X_0_expected, p.pos(), 0, "--")
			case classSetExpressionTypeClassIntersection:
				p.error(diagnostics.X_0_expected, p.pos(), 0, "&&")
			}
		}
		ch = p.char()
		if p.isClassContentExit(ch) {
			p.error(diagnostics.Expected_a_class_set_operand, p.pos(), 0)
			break
		}
		p.scanClassSetOperand()
		if expressionType == classSetExpressionTypeClassIntersection {
			expressionMayContainStrings = expressionMayContainStrings && p.mayContainStrings
		}
	}
	p.mayContainStrings = expressionMayContainStrings
}

// ClassSetOperand ::=
//
//	| '[' ClassSetExpression ']'
//	| '\' CharacterClassEscape
//	| '\q{' ClassStringDisjunctionContents '}'
//	| ClassSetCharacter
func (p *regExpParser) scanClassSetOperand() string {
	p.mayContainStrings = false
	switch p.char() {
	case '[':
		p.incPos(1)
		p.scanClassSetExpression()
		p.scanExpectedChar(']')
		return ""
	case '\\':
		p.incPos(1)
		if p.scanCharacterClassEscape() {
			return ""
		} else if p.char() == 'q' {
			p.incPos(1)
			if p.char() == '{' {
				p.incPos(1)
				p.scanClassStringDisjunctionContents()
				p.scanExpectedChar('}')
				return ""
			} else {
				p.error(diagnostics.X_q_must_be_followed_by_string_alternatives_enclosed_in_braces, p.pos()-2, 2)
				return "q"
			}
		}
		p.incPos(-1)
		fallthrough
	default:
		return p.scanClassSetCharacter()
	}
}

// ClassStringDisjunctionContents ::= ClassSetCharacter* ('|' ClassSetCharacter*)*
func (p *regExpParser) scanClassStringDisjunctionContents() {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '{')
	characterCount := 0
	for p.pos() < p.end {
		ch := p.char()
		switch ch {
		case '}':
			if characterCount != 1 {
				p.mayContainStrings = true
			}
			return
		case '|':
			if characterCount != 1 {
				p.mayContainStrings = true
			}
			p.incPos(1)
			characterCount = 0
		default:
			p.scanClassSetCharacter()
			characterCount++
		}
	}
}

// ClassSetCharacter ::=
//
//	| SourceCharacter -- ClassSetSyntaxCharacter -- ClassSetReservedDoublePunctuator
//	| '\' (CharacterEscape | ClassSetReservedPunctuator | 'b')
func (p *regExpParser) scanClassSetCharacter() string {
	ch := p.char()
	if ch == '\\' {
		p.incPos(1)
		innerCh := p.char()
		switch innerCh {
		case 'b':
			p.incPos(1)
			return "\b"
		case '&', '-', '!', '#', '%', ',', ':', ';', '<', '=', '>', '@', '`', '~':
			p.incPos(1)
			return string(innerCh)
		default:
			return p.scanCharacterEscape(false /*atomEscape*/)
		}
	} else if p.pos()+1 < p.end && ch == p.charAt(p.pos()+1) {
		switch ch {
		case '&', '!', '#', '%', '*', '+', ',', '.', ':', ';', '<', '=', '>', '?', '@', '`', '~':
			p.error(diagnostics.A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backslash, p.pos(), 2)
			p.incPos(2)
			return p.text()[p.pos()-2 : p.pos()]
		}
	}
	switch ch {
	case '/', '(', ')', '[', ']', '{', '}', '-', '|':
		p.error(diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, p.pos(), 1, string(ch))
		p.incPos(1)
		return string(ch)
	}
	return p.scanSourceCharacter()
}

// ClassAtom ::=
//
//	| SourceCharacter but not one of '\' or ']'
//	| '\' ClassEscape
//
// ClassEscape ::=
//
//	| 'b'
//	| '-'
//	| CharacterClassEscape
//	| CharacterEscape
func (p *regExpParser) scanClassAtom() string {
	if p.char() == '\\' {
		p.incPos(1)
		ch := p.char()
		switch ch {
		case 'b':
			p.incPos(1)
			return "\b"
		case '-':
			p.incPos(1)
			return string(ch)
		default:
			if p.scanCharacterClassEscape() {
				return ""
			}
			return p.scanCharacterEscape(false /*atomEscape*/)
		}
	} else {
		return p.scanSourceCharacter()
	}
}

// CharacterClassEscape ::=
//
//	| 'd' | 'D' | 's' | 'S' | 'w' | 'W'
//	| [+AnyUnicodeMode] ('P' | 'p') '{' UnicodePropertyValueExpression '}'
func (p *regExpParser) scanCharacterClassEscape() bool {
	debug.Assert(p.pos() > 0 && p.text()[p.pos()-1] == '\\')
	isCharacterComplement := false
	start := p.pos() - 1
	ch := p.char()
	switch ch {
	case 'd', 'D', 's', 'S', 'w', 'W':
		p.incPos(1)
		return true
	case 'P':
		isCharacterComplement = true
		fallthrough
	case 'p':
		p.incPos(1)
		if p.char() == '{' {
			p.incPos(1)
			propertyNameOrValueStart := p.pos()
			propertyNameOrValue := p.scanWordCharacters()
			if p.char() == '=' {
				propertyName := nonBinaryUnicodeProperties[propertyNameOrValue]
				if p.pos() == propertyNameOrValueStart {
					p.error(diagnostics.Expected_a_Unicode_property_name, p.pos(), 0)
				} else if propertyName == "" {
					p.error(diagnostics.Unknown_Unicode_property_name, propertyNameOrValueStart, p.pos()-propertyNameOrValueStart)
					suggestion := p.getSpellingSuggestionForUnicodePropertyName(propertyNameOrValue)
					if suggestion != "" {
						p.error(diagnostics.Did_you_mean_0, propertyNameOrValueStart, p.pos()-propertyNameOrValueStart, suggestion)
					}
				}
				p.incPos(1)
				propertyValueStart := p.pos()
				propertyValue := p.scanWordCharacters()
				if p.pos() == propertyValueStart {
					p.error(diagnostics.Expected_a_Unicode_property_value, p.pos(), 0)
				} else if propertyName != "" {
					values := valuesOfNonBinaryUnicodeProperties[propertyName]
					if values != nil && !values.Has(propertyValue) {
						p.error(diagnostics.Unknown_Unicode_property_value, propertyValueStart, p.pos()-propertyValueStart)
						suggestion := p.getSpellingSuggestionForUnicodePropertyValue(propertyName, propertyValue)
						if suggestion != "" {
							p.error(diagnostics.Did_you_mean_0, propertyValueStart, p.pos()-propertyValueStart, suggestion)
						}
					}
				}
			} else {
				if p.pos() == propertyNameOrValueStart {
					p.error(diagnostics.Expected_a_Unicode_property_name_or_value, p.pos(), 0)
				} else if binaryUnicodePropertiesOfStrings.Has(propertyNameOrValue) {
					if !p.unicodeSetsMode {
						p.error(diagnostics.Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_the_Unicode_Sets_v_flag_is_set, propertyNameOrValueStart, p.pos()-propertyNameOrValueStart)
					} else if isCharacterComplement {
						p.error(diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, propertyNameOrValueStart, p.pos()-propertyNameOrValueStart)
					} else {
						p.mayContainStrings = true
					}
				} else if !valuesOfNonBinaryUnicodeProperties["General_Category"].Has(propertyNameOrValue) && !binaryUnicodeProperties.Has(propertyNameOrValue) {
					p.error(diagnostics.Unknown_Unicode_property_name_or_value, propertyNameOrValueStart, p.pos()-propertyNameOrValueStart)
					suggestion := p.getSpellingSuggestionForUnicodePropertyNameOrValue(propertyNameOrValue)
					if suggestion != "" {
						p.error(diagnostics.Did_you_mean_0, propertyNameOrValueStart, p.pos()-propertyNameOrValueStart, suggestion)
					}
				}
			}
			p.scanExpectedChar('}')
			if !p.anyUnicodeMode {
				p.error(diagnostics.Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, p.pos()-start)
			}
		} else if p.anyUnicodeModeOrNonAnnexB {
			p.error(diagnostics.X_0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces, p.pos()-2, 2, string(ch))
		} else {
			p.incPos(-1)
			return false
		}
		return true
	}
	return false
}

func (p *regExpParser) getSpellingSuggestionForUnicodePropertyName(name string) string {
	candidates := make([]string, 0, len(nonBinaryUnicodeProperties))
	for k := range nonBinaryUnicodeProperties {
		candidates = append(candidates, k)
	}
	return core.GetSpellingSuggestion(name, candidates, func(s string) string { return s })
}

func (p *regExpParser) getSpellingSuggestionForUnicodePropertyValue(propertyName string, value string) string {
	values := valuesOfNonBinaryUnicodeProperties[propertyName]
	if values == nil {
		return ""
	}
	candidates := make([]string, 0, values.Len())
	for k := range values.Keys() {
		candidates = append(candidates, k)
	}
	return core.GetSpellingSuggestion(value, candidates, func(s string) string { return s })
}

func (p *regExpParser) getSpellingSuggestionForUnicodePropertyNameOrValue(name string) string {
	var candidates []string
	for k := range valuesOfNonBinaryUnicodeProperties["General_Category"].Keys() {
		candidates = append(candidates, k)
	}
	for k := range binaryUnicodeProperties.Keys() {
		candidates = append(candidates, k)
	}
	for k := range binaryUnicodePropertiesOfStrings.Keys() {
		candidates = append(candidates, k)
	}
	return core.GetSpellingSuggestion(name, candidates, func(s string) string { return s })
}

func (p *regExpParser) scanWordCharacters() string {
	start := p.pos()
	for p.pos() < p.end {
		ch := p.char()
		if !isWordCharacter(ch) {
			break
		}
		p.incPos(1)
	}
	return p.text()[start:p.pos()]
}

func (p *regExpParser) scanSourceCharacter() string {
	if p.pos() >= p.end {
		return ""
	}
	if !p.anyUnicodeMode {
		if p.pendingLowSurrogate != 0 {
			// Second of two surrogate code units for the same non-BMP character.
			// Now advance past the full UTF-8 sequence (the high surrogate call did not advance).
			_, size := utf8.DecodeRuneInString(p.text()[p.pos():])
			p.incPos(size)
			low := p.pendingLowSurrogate
			p.pendingLowSurrogate = 0
			return encodeSurrogate(low)
		}
		ch, size := utf8.DecodeRuneInString(p.text()[p.pos():])
		if ch == utf8.RuneError || size == 0 {
			// Not a valid rune; consume one raw byte.
			p.incPos(1)
			return string(p.text()[p.pos()-1])
		}
		if ch >= surrSelf {
			// Non-BMP character: emit the high surrogate first WITHOUT advancing.
			// The low surrogate will be emitted on the next call, which also advances.
			high := surr1 + (ch-surrSelf)>>10
			low := surr2 + (ch-surrSelf)&0x3FF
			p.pendingLowSurrogate = low
			return encodeSurrogate(high)
		}
		p.incPos(size)
		return string(ch)
	}
	ch, size := utf8.DecodeRuneInString(p.text()[p.pos():])
	if size == 0 || ch == utf8.RuneError {
		return ""
	}
	p.incPos(size)
	return string(ch)
}

func (p *regExpParser) scanExpectedChar(ch rune) {
	if p.char() == ch {
		p.incPos(1)
	} else {
		p.error(diagnostics.X_0_expected, p.pos(), 0, string(ch))
	}
}

func (p *regExpParser) scanDigits() {
	start := p.pos()
	for p.pos() < p.end && stringutil.IsDigit(p.char()) {
		p.incPos(1)
	}
	p.scanner.tokenValue = p.text()[start:p.pos()]
}

func (p *regExpParser) run() {
	// Regular expressions are checked more strictly when either in 'u' or 'v' mode, or
	// when not using the looser interpretation of the syntax from ECMA-262 Annex B.
	p.anyUnicodeModeOrNonAnnexB = p.anyUnicodeMode || !p.annexB

	p.scanDisjunction(false /*isInGroup*/)

	for _, reference := range p.groupNameReferences {
		if !p.groupSpecifiers[reference.name] {
			p.error(diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression, reference.pos, reference.end-reference.pos, reference.name)
			if len(p.groupSpecifiers) > 0 {
				specifiers := make([]string, 0, len(p.groupSpecifiers))
				for k := range p.groupSpecifiers {
					specifiers = append(specifiers, k)
				}
				suggestion := core.GetSpellingSuggestion(reference.name, specifiers, func(s string) string { return s })
				if suggestion != "" {
					p.error(diagnostics.Did_you_mean_0, reference.pos, reference.end-reference.pos, suggestion)
				}
			}
		}
	}
	for _, escape := range p.decimalEscapes {
		// Although a DecimalEscape with a value greater than the number of capturing groups
		// is treated as either a LegacyOctalEscapeSequence or an IdentityEscape in Annex B,
		// an error is nevertheless reported since it's most likely a mistake.
		if escape.value > p.numberOfCapturingGroups {
			if p.numberOfCapturingGroups > 0 {
				p.error(diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_only_0_capturing_groups_in_this_regular_expression, escape.pos, escape.end-escape.pos, p.numberOfCapturingGroups)
			} else {
				p.error(diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_no_capturing_groups_in_this_regular_expression, escape.pos, escape.end-escape.pos)
			}
		}
	}
}
