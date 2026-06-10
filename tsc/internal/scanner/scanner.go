package scanner

import (
	"fmt"
	"iter"
	"maps"
	"strconv"
	"strings"
	"unicode"
	"unicode/utf16"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type EscapeSequenceScanningFlags int32

const (
	EscapeSequenceScanningFlagsString                     EscapeSequenceScanningFlags = 1 << 0
	EscapeSequenceScanningFlagsReportErrors               EscapeSequenceScanningFlags = 1 << 1
	EscapeSequenceScanningFlagsRegularExpression          EscapeSequenceScanningFlags = 1 << 2
	EscapeSequenceScanningFlagsAnnexB                     EscapeSequenceScanningFlags = 1 << 3
	EscapeSequenceScanningFlagsAnyUnicodeMode             EscapeSequenceScanningFlags = 1 << 4
	EscapeSequenceScanningFlagsAtomEscape                 EscapeSequenceScanningFlags = 1 << 5
	EscapeSequenceScanningFlagsReportInvalidEscapeErrors  EscapeSequenceScanningFlags = EscapeSequenceScanningFlagsRegularExpression | EscapeSequenceScanningFlagsReportErrors
	EscapeSequenceScanningFlagsAllowExtendedUnicodeEscape EscapeSequenceScanningFlags = EscapeSequenceScanningFlagsString | EscapeSequenceScanningFlagsAnyUnicodeMode
)

type ErrorCallback func(diagnostic *diagnostics.Message, start, length int, args ...any)

var textToKeyword = map[string]ast.Kind{
	"abstract":    ast.KindAbstractKeyword,
	"accessor":    ast.KindAccessorKeyword,
	"any":         ast.KindAnyKeyword,
	"as":          ast.KindAsKeyword,
	"asserts":     ast.KindAssertsKeyword,
	"assert":      ast.KindAssertKeyword,
	"bigint":      ast.KindBigIntKeyword,
	"boolean":     ast.KindBooleanKeyword,
	"break":       ast.KindBreakKeyword,
	"case":        ast.KindCaseKeyword,
	"catch":       ast.KindCatchKeyword,
	"class":       ast.KindClassKeyword,
	"continue":    ast.KindContinueKeyword,
	"const":       ast.KindConstKeyword,
	"constructor": ast.KindConstructorKeyword,
	"debugger":    ast.KindDebuggerKeyword,
	"declare":     ast.KindDeclareKeyword,
	"default":     ast.KindDefaultKeyword,
	"defer":       ast.KindDeferKeyword,
	"delete":      ast.KindDeleteKeyword,
	"do":          ast.KindDoKeyword,
	"else":        ast.KindElseKeyword,
	"enum":        ast.KindEnumKeyword,
	"export":      ast.KindExportKeyword,
	"extends":     ast.KindExtendsKeyword,
	"false":       ast.KindFalseKeyword,
	"finally":     ast.KindFinallyKeyword,
	"for":         ast.KindForKeyword,
	"from":        ast.KindFromKeyword,
	"function":    ast.KindFunctionKeyword,
	"get":         ast.KindGetKeyword,
	"if":          ast.KindIfKeyword,
	"immediate":   ast.KindImmediateKeyword,
	"implements":  ast.KindImplementsKeyword,
	"import":      ast.KindImportKeyword,
	"in":          ast.KindInKeyword,
	"infer":       ast.KindInferKeyword,
	"instanceof":  ast.KindInstanceOfKeyword,
	"interface":   ast.KindInterfaceKeyword,
	"intrinsic":   ast.KindIntrinsicKeyword,
	"is":          ast.KindIsKeyword,
	"keyof":       ast.KindKeyOfKeyword,
	"let":         ast.KindLetKeyword,
	"module":      ast.KindModuleKeyword,
	"namespace":   ast.KindNamespaceKeyword,
	"never":       ast.KindNeverKeyword,
	"new":         ast.KindNewKeyword,
	"null":        ast.KindNullKeyword,
	"number":      ast.KindNumberKeyword,
	"object":      ast.KindObjectKeyword,
	"package":     ast.KindPackageKeyword,
	"private":     ast.KindPrivateKeyword,
	"protected":   ast.KindProtectedKeyword,
	"public":      ast.KindPublicKeyword,
	"override":    ast.KindOverrideKeyword,
	"out":         ast.KindOutKeyword,
	"readonly":    ast.KindReadonlyKeyword,
	"require":     ast.KindRequireKeyword,
	"global":      ast.KindGlobalKeyword,
	"return":      ast.KindReturnKeyword,
	"satisfies":   ast.KindSatisfiesKeyword,
	"set":         ast.KindSetKeyword,
	"static":      ast.KindStaticKeyword,
	"string":      ast.KindStringKeyword,
	"super":       ast.KindSuperKeyword,
	"switch":      ast.KindSwitchKeyword,
	"symbol":      ast.KindSymbolKeyword,
	"this":        ast.KindThisKeyword,
	"throw":       ast.KindThrowKeyword,
	"true":        ast.KindTrueKeyword,
	"try":         ast.KindTryKeyword,
	"type":        ast.KindTypeKeyword,
	"typeof":      ast.KindTypeOfKeyword,
	"undefined":   ast.KindUndefinedKeyword,
	"unique":      ast.KindUniqueKeyword,
	"unknown":     ast.KindUnknownKeyword,
	"using":       ast.KindUsingKeyword,
	"var":         ast.KindVarKeyword,
	"void":        ast.KindVoidKeyword,
	"while":       ast.KindWhileKeyword,
	"with":        ast.KindWithKeyword,
	"yield":       ast.KindYieldKeyword,
	"async":       ast.KindAsyncKeyword,
	"await":       ast.KindAwaitKeyword,
	"of":          ast.KindOfKeyword,
}

var textToToken = func() map[string]ast.Kind {
	m := map[string]ast.Kind{
		"{":    ast.KindOpenBraceToken,
		"}":    ast.KindCloseBraceToken,
		"(":    ast.KindOpenParenToken,
		")":    ast.KindCloseParenToken,
		"[":    ast.KindOpenBracketToken,
		"]":    ast.KindCloseBracketToken,
		".":    ast.KindDotToken,
		"...":  ast.KindDotDotDotToken,
		";":    ast.KindSemicolonToken,
		",":    ast.KindCommaToken,
		"<":    ast.KindLessThanToken,
		">":    ast.KindGreaterThanToken,
		"<=":   ast.KindLessThanEqualsToken,
		">=":   ast.KindGreaterThanEqualsToken,
		"==":   ast.KindEqualsEqualsToken,
		"!=":   ast.KindExclamationEqualsToken,
		"===":  ast.KindEqualsEqualsEqualsToken,
		"!==":  ast.KindExclamationEqualsEqualsToken,
		"=>":   ast.KindEqualsGreaterThanToken,
		"+":    ast.KindPlusToken,
		"-":    ast.KindMinusToken,
		"**":   ast.KindAsteriskAsteriskToken,
		"*":    ast.KindAsteriskToken,
		"/":    ast.KindSlashToken,
		"%":    ast.KindPercentToken,
		"++":   ast.KindPlusPlusToken,
		"--":   ast.KindMinusMinusToken,
		"<<":   ast.KindLessThanLessThanToken,
		"</":   ast.KindLessThanSlashToken,
		">>":   ast.KindGreaterThanGreaterThanToken,
		">>>":  ast.KindGreaterThanGreaterThanGreaterThanToken,
		"&":    ast.KindAmpersandToken,
		"|":    ast.KindBarToken,
		"^":    ast.KindCaretToken,
		"!":    ast.KindExclamationToken,
		"~":    ast.KindTildeToken,
		"&&":   ast.KindAmpersandAmpersandToken,
		"||":   ast.KindBarBarToken,
		"?":    ast.KindQuestionToken,
		"??":   ast.KindQuestionQuestionToken,
		"?.":   ast.KindQuestionDotToken,
		":":    ast.KindColonToken,
		"=":    ast.KindEqualsToken,
		"+=":   ast.KindPlusEqualsToken,
		"-=":   ast.KindMinusEqualsToken,
		"*=":   ast.KindAsteriskEqualsToken,
		"**=":  ast.KindAsteriskAsteriskEqualsToken,
		"/=":   ast.KindSlashEqualsToken,
		"%=":   ast.KindPercentEqualsToken,
		"<<=":  ast.KindLessThanLessThanEqualsToken,
		">>=":  ast.KindGreaterThanGreaterThanEqualsToken,
		">>>=": ast.KindGreaterThanGreaterThanGreaterThanEqualsToken,
		"&=":   ast.KindAmpersandEqualsToken,
		"|=":   ast.KindBarEqualsToken,
		"^=":   ast.KindCaretEqualsToken,
		"||=":  ast.KindBarBarEqualsToken,
		"&&=":  ast.KindAmpersandAmpersandEqualsToken,
		"??=":  ast.KindQuestionQuestionEqualsToken,
		"@":    ast.KindAtToken,
		"#":    ast.KindHashToken,
		"`":    ast.KindBacktickToken,
	}
	maps.Copy(m, textToKeyword)
	return m
}()

type ScannerState struct {
	pos                       int            // Current position in text (and ending position of current token)
	fullStartPos              int            // Starting position of current token including preceding whitespace
	tokenStart                int            // Starting position of non-whitespace part of current token
	token                     ast.Kind       // Kind of current token
	tokenValue                string         // Parsed value of current token
	tokenFlags                ast.TokenFlags // Flags for current token
	commentDirectives         []ast.CommentDirective
	skipJSDocLeadingAsterisks int // Leading asterisks to skip when scanning types inside JSDoc. Should be 0 outside JSDoc
}

type Scanner struct {
	text            string
	end             int
	languageVariant core.LanguageVariant
	scriptTarget    core.ScriptTarget
	onError         ErrorCallback
	skipTrivia      bool
	ScannerState

	containsNonASCII bool
	numberCache      map[string]string
	hexNumberCache   map[string]string
	hexDigitCache    map[string]string
}

func defaultScanner() Scanner {
	// Using a function rather than a global is intentional; this function is
	// inlined as pure code (zeroing + moves), whereas a global requires write
	// barriers since the memory is mutable.
	return Scanner{skipTrivia: true}
}

func NewScanner() *Scanner {
	s := defaultScanner()
	return &s
}

func (s *Scanner) Reset() {
	numberCache := cleared(s.numberCache)
	hexNumberCache := cleared(s.hexNumberCache)
	hexDigitCache := cleared(s.hexDigitCache)
	*s = defaultScanner()
	s.numberCache = numberCache
	s.hexNumberCache = hexNumberCache
	s.hexDigitCache = hexDigitCache
}

func cleared[M ~map[K]V, K comparable, V any](m M) M {
	clear(m)
	return m
}

func (s *Scanner) Text() string {
	return s.text
}

func (s *Scanner) Token() ast.Kind {
	return s.token
}

func (s *Scanner) TokenFlags() ast.TokenFlags {
	return s.tokenFlags
}

func (s *Scanner) TokenFullStart() int {
	return s.fullStartPos
}

func (s *Scanner) TokenStart() int {
	return s.tokenStart
}

func (s *Scanner) TokenEnd() int {
	return s.pos
}

func (s *Scanner) TokenText() string {
	return s.text[s.tokenStart:s.pos]
}

func (s *Scanner) TokenValue() string {
	return s.tokenValue
}

func (s *Scanner) TokenRange() core.TextRange {
	return core.NewTextRange(s.tokenStart, s.pos)
}

func (s *Scanner) CommentDirectives() []ast.CommentDirective {
	return s.commentDirectives
}

func (s *Scanner) Mark() ScannerState {
	return s.ScannerState
}

func (s *Scanner) Rewind(state ScannerState) {
	s.ScannerState = state
}

func (s *Scanner) ResetPos(pos int) {
	if pos < 0 {
		panic("Cannot reset token state to negative position")
	}
	s.pos = pos
	s.fullStartPos = pos
	s.tokenStart = pos
}

func (s *Scanner) ResetTokenState(pos int) {
	s.ResetPos(pos)
	s.token = ast.KindUnknown
	s.tokenValue = ""
	s.tokenFlags = ast.TokenFlagsNone
}

func (scanner *Scanner) SetSkipJSDocLeadingAsterisks(skip bool) {
	if skip {
		scanner.skipJSDocLeadingAsterisks += 1
	} else {
		scanner.skipJSDocLeadingAsterisks += -1
	}
}

func (scanner *Scanner) SetSkipTrivia(skip bool) {
	scanner.skipTrivia = skip
}

func (s *Scanner) HasUnicodeEscape() bool {
	return s.tokenFlags&ast.TokenFlagsUnicodeEscape != 0
}

// ContainsNonASCII returns true if the scanner encountered any non-ASCII bytes
// during scanning. This is useful for determining whether UTF-8 byte offsets
// may differ from UTF-16 code unit offsets.
func (s *Scanner) ContainsNonASCII() bool {
	return s.containsNonASCII
}

func (s *Scanner) HasExtendedUnicodeEscape() bool {
	return s.tokenFlags&ast.TokenFlagsExtendedUnicodeEscape != 0
}

func (s *Scanner) HasPrecedingLineBreak() bool {
	return s.tokenFlags&ast.TokenFlagsPrecedingLineBreak != 0
}

func (s *Scanner) HasPrecedingJSDocComment() bool {
	return s.tokenFlags&ast.TokenFlagsPrecedingJSDocComment != 0
}

func (s *Scanner) HasPrecedingJSDocLeadingAsterisks() bool {
	return s.tokenFlags&ast.TokenFlagsPrecedingJSDocLeadingAsterisks != 0
}

func (s *Scanner) HasPrecedingJSDocWithDeprecatedTag() bool {
	return s.tokenFlags&ast.TokenFlagsPrecedingJSDocWithDeprecated != 0
}

func (s *Scanner) HasPrecedingJSDocWithSeeOrLink() bool {
	return s.tokenFlags&ast.TokenFlagsPrecedingJSDocWithSeeOrLink != 0
}

// scanJSDocCommentForTags scans a JSDoc comment for @deprecated, @see, and @link tags,
// setting the appropriate token flags. Called during scanning when a JSDoc comment is detected.
func (s *Scanner) scanJSDocCommentForTags(commentText string) {
	for {
		i := strings.IndexByte(commentText, '@')
		if i < 0 {
			return
		}
		commentText = commentText[i+1:]
		if s.tokenFlags&ast.TokenFlagsPrecedingJSDocWithDeprecated == 0 && hasJSDocTag(commentText, "deprecated") {
			s.tokenFlags |= ast.TokenFlagsPrecedingJSDocWithDeprecated
		}
		if s.tokenFlags&ast.TokenFlagsPrecedingJSDocWithSeeOrLink == 0 && hasJSDocTag(commentText, "see", "link", "linkcode", "linkplain") {
			s.tokenFlags |= ast.TokenFlagsPrecedingJSDocWithSeeOrLink
		}
		if s.tokenFlags&(ast.TokenFlagsPrecedingJSDocWithDeprecated|ast.TokenFlagsPrecedingJSDocWithSeeOrLink) ==
			(ast.TokenFlagsPrecedingJSDocWithDeprecated | ast.TokenFlagsPrecedingJSDocWithSeeOrLink) {
			return
		}
	}
}

// hasJSDocTag reports whether text starts with one of the given tag names followed
// by a valid JSDoc tag terminator (whitespace, '}', '*', or end-of-string).
func hasJSDocTag(text string, tags ...string) bool {
	for _, tag := range tags {
		if !strings.HasPrefix(text, tag) {
			continue
		}
		if len(text) == len(tag) {
			return true
		}
		ch := text[len(tag)]
		if ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r' || ch == '}' || ch == '*' {
			return true
		}
	}
	return false
}

func (s *Scanner) SetText(text string) {
	s.text = text
	s.end = len(text)
	s.ScannerState = ScannerState{}
}

func (s *Scanner) SetOnError(errorCallback ErrorCallback) {
	s.onError = errorCallback
}

func (s *Scanner) SetLanguageVariant(languageVariant core.LanguageVariant) {
	s.languageVariant = languageVariant
}

func (s *Scanner) SetScriptTarget(scriptTarget core.ScriptTarget) {
	s.scriptTarget = scriptTarget
}

func (s *Scanner) languageVersion() core.ScriptTarget {
	if s.scriptTarget == core.ScriptTargetNone {
		return core.ScriptTargetLatest
	}
	return s.scriptTarget
}

func (s *Scanner) error(diagnostic *diagnostics.Message) {
	s.errorAt(diagnostic, s.pos, 0)
}

func (s *Scanner) errorAt(diagnostic *diagnostics.Message, pos int, length int, args ...any) {
	if s.onError != nil {
		s.onError(diagnostic, pos, length, args...)
	}
}

// NOTE: even though this returns a rune, it only decodes the current byte.
// It must be checked against utf8.RuneSelf to verify that a call to charAndSize
// is not needed.
func (s *Scanner) char() rune {
	if s.pos < s.end {
		return rune(s.text[s.pos])
	}
	return -1
}

// NOTE: this returns a rune, but only decodes the byte at the offset.
func (s *Scanner) charAt(offset int) rune {
	if s.pos+offset < s.end {
		return rune(s.text[s.pos+offset])
	}
	return -1
}

func (s *Scanner) charAndSize() (rune, int) {
	r, size := utf8.DecodeRuneInString(s.text[s.pos:])
	if size > 1 {
		s.containsNonASCII = true
	}
	return r, size
}

func (s *Scanner) Scan() ast.Kind {
	s.fullStartPos = s.pos
	s.tokenFlags = ast.TokenFlagsNone
	for {
		s.tokenStart = s.pos
		ch := s.char()

		switch ch {
		case '\t', '\v', '\f', ' ':
			s.pos++
			if s.skipTrivia {
				continue
			}
			for {
				ch, size := s.charAndSize()
				if !stringutil.IsWhiteSpaceSingleLine(ch) {
					break
				}
				s.pos += size
			}
			s.token = ast.KindWhitespaceTrivia
		case '\n', '\r':
			s.tokenFlags |= ast.TokenFlagsPrecedingLineBreak
			if s.skipTrivia {
				s.pos++
				continue
			}
			if ch == '\r' && s.charAt(1) == '\n' {
				s.pos += 2
			} else {
				s.pos++
			}
			s.token = ast.KindNewLineTrivia
		case '!':
			if s.charAt(1) == '=' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindExclamationEqualsEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindExclamationEqualsToken
				}
			} else {
				s.pos++
				s.token = ast.KindExclamationToken
			}
		case '"', '\'':
			s.tokenValue = s.scanString(false /*jsxAttributeString*/)
			s.token = ast.KindStringLiteral
		case '`':
			s.token = s.scanTemplateAndSetTokenValue(false /*shouldEmitInvalidEscapeError*/)
		case '%':
			if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindPercentEqualsToken
			} else {
				s.pos++
				s.token = ast.KindPercentToken
			}
		case '&':
			if s.charAt(1) == '&' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindAmpersandAmpersandEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindAmpersandAmpersandToken
				}
			} else if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindAmpersandEqualsToken
			} else {
				s.pos++
				s.token = ast.KindAmpersandToken
			}
		case '(':
			s.pos++
			s.token = ast.KindOpenParenToken
		case ')':
			s.pos++
			s.token = ast.KindCloseParenToken
		case '*':
			if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindAsteriskEqualsToken
			} else if s.charAt(1) == '*' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindAsteriskAsteriskEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindAsteriskAsteriskToken
				}
			} else {
				s.pos++
				if s.skipJSDocLeadingAsterisks != 0 &&
					(s.tokenFlags&ast.TokenFlagsPrecedingJSDocLeadingAsterisks) == 0 &&
					(s.tokenFlags&ast.TokenFlagsPrecedingLineBreak) != 0 {
					s.tokenFlags |= ast.TokenFlagsPrecedingJSDocLeadingAsterisks
					continue
				}
				s.token = ast.KindAsteriskToken
			}
		case '+':
			if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindPlusEqualsToken
			} else if s.charAt(1) == '+' {
				s.pos += 2
				s.token = ast.KindPlusPlusToken
			} else {
				s.pos++
				s.token = ast.KindPlusToken
			}
		case ',':
			s.pos++
			s.token = ast.KindCommaToken
		case '-':
			if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindMinusEqualsToken
			} else if s.charAt(1) == '-' {
				s.pos += 2
				s.token = ast.KindMinusMinusToken
			} else {
				s.pos++
				s.token = ast.KindMinusToken
			}
		case '.':
			if stringutil.IsDigit(s.charAt(1)) {
				s.token = s.scanNumber()
			} else if s.charAt(1) == '.' && s.charAt(2) == '.' {
				s.pos += 3
				s.token = ast.KindDotDotDotToken
			} else {
				s.pos++
				s.token = ast.KindDotToken
			}
		case '/':
			// Single-line comment
			if s.charAt(1) == '/' {
				s.pos += 2

				for {
					ch1, size := s.charAndSize()
					if size == 0 || stringutil.IsLineBreak(ch1) {
						break
					}
					s.pos += size
				}

				s.processCommentDirective(s.tokenStart, s.pos, false)

				if s.skipTrivia {
					continue
				}
				s.token = ast.KindSingleLineCommentTrivia
				return s.token
			}
			// Multi-line comment
			if s.charAt(1) == '*' {
				s.pos += 2
				isJSDoc := s.char() == '*' && s.charAt(1) != '/'

				commentClosed := false
				lastLineStart := s.tokenStart
				for {
					ch1, size := s.charAndSize()
					if size == 0 {
						break
					}

					if ch1 == '*' && s.charAt(1) == '/' {
						s.pos += 2
						commentClosed = true
						break
					}

					s.pos += size

					if stringutil.IsLineBreak(ch1) {
						lastLineStart = s.pos
						s.tokenFlags |= ast.TokenFlagsPrecedingLineBreak
					}
				}

				if isJSDoc {
					s.tokenFlags |= ast.TokenFlagsPrecedingJSDocComment
					s.scanJSDocCommentForTags(s.text[s.tokenStart:s.pos])
				}

				s.processCommentDirective(lastLineStart, s.pos, true)

				if !commentClosed {
					s.error(diagnostics.Asterisk_Slash_expected)
				}

				if s.skipTrivia {
					continue
				}

				if !commentClosed {
					s.tokenFlags |= ast.TokenFlagsUnterminated
				}
				s.token = ast.KindMultiLineCommentTrivia
				return s.token
			}
			if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindSlashEqualsToken
			} else {
				s.pos++
				s.token = ast.KindSlashToken
			}
		case '0':
			if s.charAt(1) == 'X' || s.charAt(1) == 'x' {
				start := s.pos
				s.pos += 2
				digits := s.scanHexDigits(1, true, true)
				if digits == "" {
					s.error(diagnostics.Hexadecimal_digit_expected)
					digits = "0"
				}
				if s.hexNumberCache == nil {
					s.hexNumberCache = make(map[string]string)
				}
				if cachedValue, ok := s.hexNumberCache[digits]; ok {
					s.tokenValue = cachedValue
				} else {
					rawText := s.text[start:s.pos]
					if strings.HasPrefix(rawText, "0x") && rawText[2:] == digits {
						s.tokenValue = rawText
					} else {
						s.tokenValue = "0x" + digits
					}
					s.hexNumberCache[digits] = s.tokenValue
				}
				s.tokenFlags |= ast.TokenFlagsHexSpecifier
				s.token = s.scanBigIntSuffix()
				break
			}
			if s.charAt(1) == 'B' || s.charAt(1) == 'b' {
				s.pos += 2
				digits := s.scanBinaryOrOctalDigits(2)
				if digits == "" {
					s.error(diagnostics.Binary_digit_expected)
					digits = "0"
				}
				s.tokenValue = "0b" + digits
				s.tokenFlags |= ast.TokenFlagsBinarySpecifier
				s.token = s.scanBigIntSuffix()
				break
			}
			if s.charAt(1) == 'O' || s.charAt(1) == 'o' {
				s.pos += 2
				digits := s.scanBinaryOrOctalDigits(8)
				if digits == "" {
					s.error(diagnostics.Octal_digit_expected)
					digits = "0"
				}
				s.tokenValue = "0o" + digits
				s.tokenFlags |= ast.TokenFlagsOctalSpecifier
				s.token = s.scanBigIntSuffix()
				break
			}
			fallthrough
		case '1', '2', '3', '4', '5', '6', '7', '8', '9':
			s.token = s.scanNumber()
		case ':':
			s.pos++
			s.token = ast.KindColonToken
		case ';':
			s.pos++
			s.token = ast.KindSemicolonToken
		case '<':
			if isConflictMarkerTrivia(s.text, s.pos) {
				s.pos = scanConflictMarkerTrivia(s.text, s.pos, s.errorAt)
				if s.skipTrivia {
					continue
				} else {
					s.token = ast.KindConflictMarkerTrivia
					return s.token
				}
			}
			if s.charAt(1) == '<' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindLessThanLessThanEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindLessThanLessThanToken
				}
			} else if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindLessThanEqualsToken
			} else if s.languageVariant == core.LanguageVariantJSX && s.charAt(1) == '/' && s.charAt(2) != '*' {
				s.pos += 2
				s.token = ast.KindLessThanSlashToken
			} else {
				s.pos++
				s.token = ast.KindLessThanToken
			}
		case '=':
			if isConflictMarkerTrivia(s.text, s.pos) {
				s.pos = scanConflictMarkerTrivia(s.text, s.pos, s.errorAt)
				if s.skipTrivia {
					continue
				} else {
					s.token = ast.KindConflictMarkerTrivia
					return s.token
				}
			}
			if s.charAt(1) == '=' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindEqualsEqualsEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindEqualsEqualsToken
				}
			} else if s.charAt(1) == '>' {
				s.pos += 2
				s.token = ast.KindEqualsGreaterThanToken
			} else {
				s.pos++
				s.token = ast.KindEqualsToken
			}
		case '>':
			if isConflictMarkerTrivia(s.text, s.pos) {
				s.pos = scanConflictMarkerTrivia(s.text, s.pos, s.errorAt)
				if s.skipTrivia {
					continue
				} else {
					s.token = ast.KindConflictMarkerTrivia
					return s.token
				}
			}
			s.pos++
			s.token = ast.KindGreaterThanToken
		case '?':
			if s.charAt(1) == '.' && !stringutil.IsDigit(s.charAt(2)) {
				s.pos += 2
				s.token = ast.KindQuestionDotToken
			} else if s.charAt(1) == '?' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindQuestionQuestionEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindQuestionQuestionToken
				}
			} else {
				s.pos++
				s.token = ast.KindQuestionToken
			}
		case '[':
			s.pos++
			s.token = ast.KindOpenBracketToken
		case ']':
			s.pos++
			s.token = ast.KindCloseBracketToken
		case '^':
			if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindCaretEqualsToken
			} else {
				s.pos++
				s.token = ast.KindCaretToken
			}
		case '{':
			s.pos++
			s.token = ast.KindOpenBraceToken
		case '|':
			if isConflictMarkerTrivia(s.text, s.pos) {
				s.pos = scanConflictMarkerTrivia(s.text, s.pos, s.errorAt)
				if s.skipTrivia {
					continue
				} else {
					s.token = ast.KindConflictMarkerTrivia
					return s.token
				}
			}
			if s.charAt(1) == '|' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindBarBarEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindBarBarToken
				}
			} else if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindBarEqualsToken
			} else {
				s.pos++
				s.token = ast.KindBarToken
			}
		case '}':
			s.pos++
			s.token = ast.KindCloseBraceToken
		case '~':
			s.pos++
			s.token = ast.KindTildeToken
		case '@':
			s.pos++
			s.token = ast.KindAtToken
		case '\\':
			cp := s.peekUnicodeEscape()
			if cp >= 0 && IsIdentifierStart(cp) {
				s.tokenValue = string(s.scanUnicodeEscape(true)) + s.scanIdentifierParts()
				s.token = GetIdentifierToken(s.tokenValue)
			} else {
				s.scanInvalidCharacter()
			}
		case '#':
			if s.charAt(1) == '!' {
				if s.pos == 0 {
					s.pos += 2
					for ch, size := s.charAndSize(); size > 0 && !stringutil.IsLineBreak(ch); ch, size = s.charAndSize() {
						s.pos += size
					}
					continue
				}
				s.errorAt(diagnostics.X_can_only_be_used_at_the_start_of_a_file, s.pos, 2)
				s.pos++
				s.token = ast.KindUnknown
				break
			}
			if s.charAt(1) == '\\' {
				s.pos++
				cp := s.peekUnicodeEscape()
				if cp >= 0 && IsIdentifierStart(cp) {
					s.tokenValue = "#" + string(s.scanUnicodeEscape(true)) + s.scanIdentifierParts()
					s.token = ast.KindPrivateIdentifier
					break
				}
				s.pos--
			}
			if !s.scanIdentifier(1) {
				s.errorAt(diagnostics.Invalid_character, s.pos-1, 1)
				s.tokenValue = "#"
			}
			s.token = ast.KindPrivateIdentifier
		default:
			if ch < 0 {
				s.token = ast.KindEndOfFile
				break
			}
			if s.scanIdentifier(0) {
				s.token = GetIdentifierToken(s.tokenValue)
				break
			}
			ch, size := s.charAndSize()
			if ch == utf8.RuneError {
				s.errorAt(diagnostics.File_appears_to_be_binary, 0, 0)
				s.pos = len(s.text)
				s.token = ast.KindNonTextFileMarkerTrivia
				break
			}
			if stringutil.IsWhiteSpaceSingleLine(ch) {
				s.pos += size

				// If we get here and it's not 0x0085 (nextLine), then we're handling non-ASCII whitespace.
				// Handle skipTrivia like we do in the space case above.
				if ch == 0x0085 || s.skipTrivia {
					continue
				}

				for {
					ch, size = s.charAndSize()
					if !stringutil.IsWhiteSpaceSingleLine(ch) {
						break
					}
					s.pos += size
				}
				s.token = ast.KindWhitespaceTrivia
				return s.token
			}
			if stringutil.IsLineBreak(ch) {
				s.tokenFlags |= ast.TokenFlagsPrecedingLineBreak
				s.pos += size
				continue
			}
			s.scanInvalidCharacter()
		}
		return s.token
	}
}

func (s *Scanner) processCommentDirective(start int, end int, multiline bool) {
	// Skip starting slashes and whitespace
	pos := start
	if multiline {
		// Skip whitespace
		for pos < end && (s.text[pos] == ' ' || s.text[pos] == '\t') {
			pos++
		}
		// Skip combinations of / and *
		for pos < end && (s.text[pos] == '/' || s.text[pos] == '*') {
			pos++
		}
	} else {
		// Skip opening //
		pos += 2
		// Skip another / if present
		for pos < end && s.text[pos] == '/' {
			pos++
		}
	}
	// Skip whitespace
	for pos < end && (s.text[pos] == ' ' || s.text[pos] == '\t') {
		pos++
	}
	// Directive must start with '@'
	if !(pos < end && s.text[pos] == '@') {
		return
	}
	pos++
	var kind ast.CommentDirectiveKind
	switch {
	case strings.HasPrefix(s.text[pos:], "ts-expect-error"):
		kind = ast.CommentDirectiveKindExpectError
	case strings.HasPrefix(s.text[pos:], "ts-ignore"):
		kind = ast.CommentDirectiveKindIgnore
	default:
		return
	}
	s.commentDirectives = append(s.commentDirectives, ast.CommentDirective{Loc: core.NewTextRange(start, end), Kind: kind})
}

func (s *Scanner) ReScanLessThanToken() ast.Kind {
	if s.token == ast.KindLessThanLessThanToken {
		s.pos = s.tokenStart + 1
		s.token = ast.KindLessThanToken
	}
	return s.token
}

func (s *Scanner) ReScanGreaterThanToken() ast.Kind {
	if s.token == ast.KindGreaterThanToken {
		s.pos = s.tokenStart + 1
		if s.char() == '>' {
			if s.charAt(1) == '>' {
				if s.charAt(2) == '=' {
					s.pos += 3
					s.token = ast.KindGreaterThanGreaterThanGreaterThanEqualsToken
				} else {
					s.pos += 2
					s.token = ast.KindGreaterThanGreaterThanGreaterThanToken
				}
			} else if s.charAt(1) == '=' {
				s.pos += 2
				s.token = ast.KindGreaterThanGreaterThanEqualsToken
			} else {
				s.pos++
				s.token = ast.KindGreaterThanGreaterThanToken
			}
		} else if s.char() == '=' {
			s.pos++
			s.token = ast.KindGreaterThanEqualsToken
		}
	}
	return s.token
}

func (s *Scanner) ReScanTemplateToken(isTaggedTemplate bool) ast.Kind {
	s.pos = s.tokenStart
	s.token = s.scanTemplateAndSetTokenValue(!isTaggedTemplate)
	return s.token
}

func (s *Scanner) ReScanAsteriskEqualsToken() ast.Kind {
	if s.token != ast.KindAsteriskEqualsToken {
		panic("'ReScanAsteriskEqualsToken' should only be called on a '*='")
	}
	s.pos = s.tokenStart + 1
	s.token = ast.KindEqualsToken
	return s.token
}

func (s *Scanner) ReScanSlashToken(reportErrors ...bool) ast.Kind {
	shouldReportErrors := len(reportErrors) > 0 && reportErrors[0]
	if s.token == ast.KindSlashToken || s.token == ast.KindSlashEqualsToken {
		// Quickly get to the end of regex such that we know the flags
		startOfRegExpBody := s.tokenStart + 1
		p := startOfRegExpBody
		inEscape := false
		namedCaptureGroups := false
		// Although nested character classes are allowed in Unicode Sets mode,
		// an unescaped slash is nevertheless invalid even in a character class in any Unicode mode.
		// This is indicated by Section 12.9.5 Regular Expression Literals of the specification,
		// where nested character classes are not considered at all. (A `[` RegularExpressionClassChar
		// does nothing in a RegularExpressionClass, and a `]` always closes the class.)
		// Additionally, parsing nested character classes will misinterpret regexes like `/[[]/`
		// as unterminated, consuming characters beyond the slash. (This even applies to `/[[]/v`,
		// which should be parsed as a well-terminated regex with an incomplete character class.)
		// Thus we must not handle nested character classes in the first pass.
		inCharacterClass := false
	loop:
		for {
			// If we reach the end of a file, or hit a newline, then this is an unterminated
			// regex. Report error and return what we have so far.
			if p >= s.end {
				s.tokenFlags |= ast.TokenFlagsUnterminated
				break loop
			}
			ch := rune(s.text[p])
			switch {
			case stringutil.IsLineBreak(ch):
				s.tokenFlags |= ast.TokenFlagsUnterminated
				break loop
			case inEscape:
				// Parsing an escape character;
				// reset the flag and just advance to the next char.
				inEscape = false
			case ch == '/' && !inCharacterClass:
				// A slash within a character class is permissible,
				// but in general it signals the end of the regexp literal.
				break loop
			case ch == '[':
				inCharacterClass = true
			case ch == '\\':
				inEscape = true
			case ch == ']':
				inCharacterClass = false
			case !inCharacterClass && ch == '(' &&
				p+1 < s.end && s.text[p+1] == '?' &&
				p+2 < s.end && s.text[p+2] == '<' &&
				(p+3 >= s.end || (s.text[p+3] != '=' && s.text[p+3] != '!')):
				namedCaptureGroups = true
			}
			p++
		}

		endOfRegExpBody := p
		if s.tokenFlags&ast.TokenFlagsUnterminated != 0 {
			// Search for the nearest unbalanced bracket for better recovery. Since the expression is
			// invalid anyways, we take nested square brackets into consideration for the best guess.
			p = startOfRegExpBody
			inEscape = false
			characterClassDepth := 0
			inDecimalQuantifier := false
			groupDepth := 0
			for p < endOfRegExpBody {
				ch := rune(s.text[p])
				if inEscape {
					inEscape = false
				} else if ch == '\\' {
					inEscape = true
				} else if ch == '[' {
					characterClassDepth++
				} else if ch == ']' && characterClassDepth != 0 {
					characterClassDepth--
				} else if characterClassDepth == 0 {
					if ch == '{' {
						inDecimalQuantifier = true
					} else if ch == '}' && inDecimalQuantifier {
						inDecimalQuantifier = false
					} else if !inDecimalQuantifier {
						if ch == '(' {
							groupDepth++
						} else if ch == ')' && groupDepth != 0 {
							groupDepth--
						} else if ch == ')' || ch == ']' || ch == '}' {
							// We encountered an unbalanced bracket outside a character class. Treat this position as the end of regex.
							break
						}
					}
				}
				p++
			}
			// Whitespaces and semicolons at the end are not likely to be part of the regex
			for p > startOfRegExpBody {
				ch, size := utf8.DecodeLastRuneInString(s.text[:p])
				if stringutil.IsWhiteSpaceLike(ch) || ch == ';' {
					p -= size
				} else {
					break
				}
			}
			s.errorAt(diagnostics.Unterminated_regular_expression_literal, s.tokenStart, p-s.tokenStart)
		} else {
			// Consume the slash character
			p++
			var regExpFlags regularExpressionFlags
			for p < s.end {
				ch, size := utf8.DecodeRuneInString(s.text[p:])
				if ch == utf8.RuneError || !IsIdentifierPart(ch) {
					break
				}
				if shouldReportErrors {
					flag, ok := charCodeToRegExpFlag[ch]
					if !ok {
						s.errorAt(diagnostics.Unknown_regular_expression_flag, p, size)
					} else if regExpFlags&flag != 0 {
						s.errorAt(diagnostics.Duplicate_regular_expression_flag, p, size)
					} else if (regExpFlags|flag)&regularExpressionFlagsAnyUnicodeMode == regularExpressionFlagsAnyUnicodeMode {
						s.errorAt(diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously, p, size)
					} else {
						regExpFlags |= flag
						s.checkRegularExpressionFlagAvailability(flag, p, size)
					}
				}
				p += size
			}
			if shouldReportErrors {
				s.pos = startOfRegExpBody
				saveEnd := s.end
				saveTokenPos := s.tokenStart
				saveTokenFlags := s.tokenFlags
				s.end = endOfRegExpBody
				parser := &regExpParser{
					scanner:            s,
					end:                endOfRegExpBody,
					regExpFlags:        regExpFlags,
					anyUnicodeMode:     regExpFlags&regularExpressionFlagsAnyUnicodeMode != 0,
					unicodeSetsMode:    regExpFlags&regularExpressionFlagsUnicodeSets != 0,
					annexB:             true,
					namedCaptureGroups: namedCaptureGroups,
					groupSpecifiers:    make(map[string]bool),
				}
				parser.run()
				s.end = saveEnd
				s.pos = p
				s.tokenStart = saveTokenPos
				s.tokenFlags = saveTokenFlags
			} else {
				s.pos = p
			}
		}

		s.pos = p
		s.tokenValue = s.text[s.tokenStart:s.pos]
		s.token = ast.KindRegularExpressionLiteral
	}
	return s.token
}

func (s *Scanner) ReScanJsxToken(allowMultilineJsxText bool) ast.Kind {
	s.pos = s.fullStartPos
	s.tokenStart = s.fullStartPos
	s.token = s.ScanJsxTokenEx(allowMultilineJsxText)
	return s.token
}

func (s *Scanner) ReScanHashToken() ast.Kind {
	if s.token == ast.KindPrivateIdentifier {
		s.pos = s.tokenStart + 1
		s.token = ast.KindHashToken
	}
	return s.token
}

func (s *Scanner) ReScanQuestionToken() ast.Kind {
	if s.token != ast.KindQuestionQuestionToken {
		panic("'reScanQuestionToken' should only be called on a '??'")
	}
	s.pos = s.tokenStart + 1
	s.token = ast.KindQuestionToken
	return s.token
}

func (s *Scanner) ScanJsxToken() ast.Kind {
	return s.ScanJsxTokenEx(true /*allowMultilineJsxText*/)
}

func (s *Scanner) ScanJsxTokenEx(allowMultilineJsxText bool) ast.Kind {
	s.fullStartPos = s.pos
	s.tokenStart = s.pos
	ch := s.char()
	switch {
	case ch < 0:
		s.token = ast.KindEndOfFile
	case ch == '<':
		if s.charAt(1) == '/' {
			s.pos += 2
			s.token = ast.KindLessThanSlashToken
		} else {
			s.pos++
			s.token = ast.KindLessThanToken
		}
	case ch == '{':
		s.pos++
		s.token = ast.KindOpenBraceToken
	default:
		// First non-whitespace character on this line.
		firstNonWhitespace := 0
		// These initial values are special because the first line is:
		// firstNonWhitespace = 0 to indicate that we want leading whitespace
		for {
			ch, size := s.charAndSize()
			if size == 0 || ch == '{' {
				break
			}
			if ch == '<' {
				if isConflictMarkerTrivia(s.text, s.pos) {
					s.pos = scanConflictMarkerTrivia(s.text, s.pos, s.errorAt)
					s.token = ast.KindConflictMarkerTrivia
					return s.token
				}
				break
			}
			if ch == '>' {
				s.errorAt(diagnostics.Unexpected_token_Did_you_mean_or_gt, s.pos, 1)
			} else if ch == '}' {
				s.errorAt(diagnostics.Unexpected_token_Did_you_mean_or_rbrace, s.pos, 1)
			}
			// FirstNonWhitespace is 0, then we only see whitespaces so far. If we see a linebreak, we want to ignore that whitespaces.
			// i.e (- : whitespace)
			//      <div>----
			//      </div> becomes <div></div>
			//
			//      <div>----</div> becomes <div>----</div>
			if stringutil.IsLineBreak(ch) && firstNonWhitespace == 0 {
				firstNonWhitespace = -1
			} else if !allowMultilineJsxText && stringutil.IsLineBreak(ch) && firstNonWhitespace > 0 {
				// Stop JsxText on each line during formatting. This allows the formatter to
				// indent each line correctly.
				break
			} else if !stringutil.IsWhiteSpaceLike(ch) {
				firstNonWhitespace = s.pos
			}
			s.pos += size
		}
		s.tokenValue = s.text[s.fullStartPos:s.pos]
		s.token = ast.KindJsxText
		if firstNonWhitespace == -1 {
			s.token = ast.KindJsxTextAllWhiteSpaces
		}
	}
	return s.token
}

// Scans a JSX identifier; these differ from normal identifiers in that they allow dashes
func (s *Scanner) ScanJsxIdentifier() ast.Kind {
	if tokenIsIdentifierOrKeyword(s.token) {
		// An identifier or keyword has already been parsed - check for a `-` or a single instance of `:` and then append it and
		// everything after it to the token
		// Do note that this means that `scanJsxIdentifier` effectively _mutates_ the visible token without advancing to a new token
		// Any caller should be expecting this behavior and should only read the pos or token value after calling it.
		for {
			ch := s.char()
			if ch < 0 {
				break
			}
			if ch == '-' {
				s.tokenValue += "-"
				s.pos++
				continue
			}
			oldPos := s.pos
			s.tokenValue += s.scanIdentifierParts() // reuse `scanIdentifierParts` so unicode escapes are handled
			if s.pos == oldPos {
				break
			}
		}
		s.token = GetIdentifierToken(s.tokenValue)
	}
	return s.token
}

func (s *Scanner) ScanJsxAttributeValue() ast.Kind {
	s.fullStartPos = s.pos
	// Skip whitespace between '=' and the value so tokenStart lands on the
	// opening quote, not on trivia.
	for ch, size := s.charAndSize(); size > 0 && stringutil.IsWhiteSpaceLike(ch); ch, size = s.charAndSize() {
		s.pos += size
	}
	s.tokenStart = s.pos
	switch s.char() {
	case '"', '\'':
		s.tokenValue = s.scanString(true /*jsxAttributeString*/)
		s.token = ast.KindStringLiteral
		return s.token
	default:
		// If this scans anything other than `{`, it's a parse error.
		return s.Scan()
	}
}

func (s *Scanner) ReScanJsxAttributeValue() ast.Kind {
	s.pos = s.fullStartPos
	s.tokenStart = s.fullStartPos
	return s.ScanJsxAttributeValue()
}

/** In addition to the usual JSDoc ast.Kinds, can also return ast.KindJSDocCommentTextToken */
func (s *Scanner) ScanJSDocCommentTextToken(inBackticks bool) ast.Kind {
	s.fullStartPos = s.pos
	s.tokenFlags = ast.TokenFlagsNone
	if s.pos >= len(s.text) {
		s.token = ast.KindEndOfFile
		return s.token
	}
	s.tokenStart = s.pos
	for ch, size := s.charAndSize(); s.pos < len(s.text) && !stringutil.IsLineBreak(ch) && ch != '`'; ch, size = s.charAndSize() {
		if !inBackticks {
			if ch == '{' {
				break
			} else if ch == '@' && s.pos >= 0 {
				// @ doesn't start a new tag inside ``, and elsewhere, only after whitespace and before identifier
				previous, _ := utf8.DecodeLastRuneInString(s.text[:s.pos])
				if stringutil.IsWhiteSpaceSingleLine(previous) {
					next, _ := utf8.DecodeRuneInString(s.text[s.pos+size:])
					if IsIdentifierStart(next) {
						break
					}
				}
			}
		}
		s.pos += size
	}
	if s.pos == s.tokenStart {
		return s.ScanJSDocToken()
	}
	s.tokenValue = s.text[s.tokenStart:s.pos]
	s.token = ast.KindJSDocCommentTextToken
	return s.token
}

// Peek at the character at the current scanner position (expected to be right after '@')
// and return true if a JSDoc tag can follow. Identifier starts indicate a tag name.
// Whitespace, newlines, and EOF are also accepted to support incomplete tags for code completion.
func (s *Scanner) CanFollowJSDocAt() bool {
	if s.pos >= len(s.text) {
		return true
	}
	ch, _ := utf8.DecodeRuneInString(s.text[s.pos:])
	return IsIdentifierStart(ch) || stringutil.IsWhiteSpaceSingleLine(ch) || stringutil.IsLineBreak(ch)
}

func (s *Scanner) ScanJSDocToken() ast.Kind {
	s.fullStartPos = s.pos
	s.tokenFlags = ast.TokenFlagsNone
	if s.pos >= len(s.text) {
		s.token = ast.KindEndOfFile
		return s.token
	}

	s.tokenStart = s.pos
	ch, size := s.charAndSize()
	s.pos += size
	switch ch {
	case '\t', '\v', '\f', ' ':
		for ch2, size2 := s.charAndSize(); size2 > 0 && stringutil.IsWhiteSpaceSingleLine(ch2); ch2, size2 = s.charAndSize() {
			s.pos += size2
		}
		s.token = ast.KindWhitespaceTrivia
		return s.token
	case '@':
		s.token = ast.KindAtToken
		return s.token
	case '\r':
		if s.char() == '\n' {
			s.pos++
		}
		fallthrough
	case '\n':
		s.tokenFlags |= ast.TokenFlagsPrecedingLineBreak
		s.token = ast.KindNewLineTrivia
		return s.token
	case '*':
		s.token = ast.KindAsteriskToken
		return s.token
	case '{':
		s.token = ast.KindOpenBraceToken
		return s.token
	case '}':
		s.token = ast.KindCloseBraceToken
		return s.token
	case '[':
		s.token = ast.KindOpenBracketToken
		return s.token
	case ']':
		s.token = ast.KindCloseBracketToken
		return s.token
	case '(':
		s.token = ast.KindOpenParenToken
		return s.token
	case ')':
		s.token = ast.KindCloseParenToken
		return s.token
	case '<':
		s.token = ast.KindLessThanToken
		return s.token
	case '>':
		s.token = ast.KindGreaterThanToken
		return s.token
	case '=':
		s.token = ast.KindEqualsToken
		return s.token
	case ',':
		s.token = ast.KindCommaToken
		return s.token
	case '.':
		s.token = ast.KindDotToken
		return s.token
	case '`':
		s.token = ast.KindBacktickToken
		return s.token
	case '#':
		s.token = ast.KindHashToken
		return s.token
	case '\\':
		s.pos--
		cp := s.peekUnicodeEscape()
		if cp >= 0 && IsIdentifierStart(cp) {
			s.tokenValue = string(s.scanUnicodeEscape(true)) + s.scanIdentifierParts()
			s.token = GetIdentifierToken(s.tokenValue)
		} else {
			s.pos++
			s.token = ast.KindUnknown
		}
		return s.token
	}

	if IsIdentifierStart(ch) {
		char := ch
		for {
			if s.pos >= len(s.text) {
				break
			}
			char, size = s.charAndSize()
			if !IsIdentifierPart(char) && char != '-' {
				break
			}
			s.pos += size
		}
		s.tokenValue = s.text[s.tokenStart:s.pos]
		if char == '\\' {
			s.tokenValue += s.scanIdentifierParts()
		}
		s.token = GetIdentifierToken(s.tokenValue)
		return s.token
	} else {
		s.token = ast.KindUnknown
		return s.token
	}
}

func (s *Scanner) scanIdentifier(prefixLength int) bool {
	start := s.pos
	s.pos += prefixLength
	ch := s.char()
	// Fast path for simple ASCII identifiers
	if stringutil.IsASCIILetter(ch) || ch == '_' || ch == '$' {
		for {
			s.pos++
			ch = s.char()
			if !(isWordCharacter(ch) || ch == '$') {
				break
			}
		}
		if ch < utf8.RuneSelf && ch != '\\' {
			s.tokenValue = s.text[start:s.pos]
			return true
		}
		s.pos = start + prefixLength
	}
	ch, size := s.charAndSize()
	if IsIdentifierStart(ch) {
		for {
			s.pos += size
			ch, size = s.charAndSize()
			if !IsIdentifierPart(ch) {
				break
			}
		}
		s.tokenValue = s.text[start:s.pos]
		if ch == '\\' {
			s.tokenValue += s.scanIdentifierParts()
		}
		return true
	}
	return false
}

func (s *Scanner) scanIdentifierParts() string {
	var sb strings.Builder
	start := s.pos
	for {
		ch, size := s.charAndSize()
		if IsIdentifierPart(ch) {
			s.pos += size
			continue
		}
		if ch == '\\' {
			escaped := s.peekUnicodeEscape()
			if escaped >= 0 && IsIdentifierPart(escaped) {
				sb.WriteString(s.text[start:s.pos])
				sb.WriteRune(s.scanUnicodeEscape(true))
				start = s.pos
				continue
			}
		}
		break
	}
	sb.WriteString(s.text[start:s.pos])
	return sb.String()
}

func (s *Scanner) scanString(jsxAttributeString bool) string {
	quote := s.char()
	if quote == '\'' {
		s.tokenFlags |= ast.TokenFlagsSingleQuote
	}
	s.pos++
	// Fast path for simple strings without escape sequences.
	strLen := strings.IndexRune(s.text[s.pos:], quote)
	if strLen == 0 {
		s.pos++
		return ""
	}
	if strLen > 0 {
		str := s.text[s.pos : s.pos+strLen]
		if !jsxAttributeString && !strings.ContainsAny(str, "\r\n\\") {
			s.pos += strLen + 1
			return str
		}
	}
	var sb strings.Builder
	start := s.pos
	for {
		ch := s.char()
		if ch < 0 {
			sb.WriteString(s.text[start:s.pos])
			s.tokenFlags |= ast.TokenFlagsUnterminated
			s.error(diagnostics.Unterminated_string_literal)
			break
		}
		if ch == quote {
			sb.WriteString(s.text[start:s.pos])
			s.pos++
			break
		}
		if ch == '\\' && !jsxAttributeString {
			sb.WriteString(s.text[start:s.pos])
			sb.WriteString(s.scanEscapeSequence(EscapeSequenceScanningFlagsString | EscapeSequenceScanningFlagsReportErrors))
			start = s.pos
			continue
		}
		if (ch == '\n' || ch == '\r') && !jsxAttributeString {
			sb.WriteString(s.text[start:s.pos])
			s.tokenFlags |= ast.TokenFlagsUnterminated
			s.error(diagnostics.Unterminated_string_literal)
			break
		}
		s.pos++
	}
	return sb.String()
}

func (s *Scanner) scanTemplateAndSetTokenValue(shouldEmitInvalidEscapeError bool) ast.Kind {
	startedWithBacktick := s.char() == '`'
	s.pos++
	start := s.pos
	parts := make([]string, 0, 4)
	var token ast.Kind
	for {
		ch := s.char()
		if ch < 0 || ch == '`' {
			parts = append(parts, s.text[start:s.pos])
			if ch == '`' {
				s.pos++
			} else {
				s.tokenFlags |= ast.TokenFlagsUnterminated
				s.error(diagnostics.Unterminated_template_literal)
			}
			token = core.IfElse(startedWithBacktick, ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateTail)
			break
		}
		if ch == '$' && s.charAt(1) == '{' {
			parts = append(parts, s.text[start:s.pos])
			s.pos += 2
			token = core.IfElse(startedWithBacktick, ast.KindTemplateHead, ast.KindTemplateMiddle)
			break
		}
		if ch == '\\' {
			parts = append(parts, s.text[start:s.pos])
			parts = append(parts, s.scanEscapeSequence(EscapeSequenceScanningFlagsString|core.IfElse(shouldEmitInvalidEscapeError, EscapeSequenceScanningFlagsReportErrors, 0)))
			start = s.pos
			continue
		}
		// Speculated ECMAScript 6 Spec 11.8.6.1:
		// <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for Template Values
		if ch == '\r' {
			parts = append(parts, s.text[start:s.pos])
			s.pos++
			if s.char() == '\n' {
				s.pos++
			}
			parts = append(parts, "\n")
			start = s.pos
			continue
		}
		s.pos++
	}
	s.tokenValue = strings.Join(parts, "")
	return token
}

func (s *Scanner) scanEscapeSequence(flags EscapeSequenceScanningFlags) string {
	start := s.pos
	s.pos++
	ch := s.char()
	if ch < 0 {
		s.error(diagnostics.Unexpected_end_of_text)
		return ""
	}
	s.pos++
	switch ch {
	case '0':
		// Although '0' preceding any digit is treated as LegacyOctalEscapeSequence,
		// '\08' should separately be interpreted as '\0' + '8'.
		if !stringutil.IsDigit(s.char()) {
			return "\x00"
		}
		// '\01', '\011'
		fallthrough
	case '1', '2', '3':
		// '\1', '\17', '\177'
		if stringutil.IsOctalDigit(s.char()) {
			s.pos++
		}
		// '\17', '\177'
		fallthrough
	case '4', '5', '6', '7':
		// '\4', '\47' but not '\477'
		if stringutil.IsOctalDigit(s.char()) {
			s.pos++
		}
		// '\47'
		s.tokenFlags |= ast.TokenFlagsContainsInvalidEscape
		if flags&EscapeSequenceScanningFlagsReportInvalidEscapeErrors != 0 {
			code, _ := strconv.ParseInt(s.text[start+1:s.pos], 8, 32)
			if flags&EscapeSequenceScanningFlagsRegularExpression != 0 && flags&EscapeSequenceScanningFlagsAtomEscape == 0 && ch != '0' {
				s.errorAt(diagnostics.Octal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_If_this_was_intended_as_an_escape_sequence_use_the_syntax_0_instead, start, s.pos-start, fmt.Sprintf("\\x%02x", code))
			} else {
				s.errorAt(diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, s.pos-start, fmt.Sprintf("\\x%02x", code))
			}
			return string(rune(code))
		}
		return s.text[start:s.pos]
	case '8', '9':
		// the invalid '\8' and '\9'
		s.tokenFlags |= ast.TokenFlagsContainsInvalidEscape
		if flags&EscapeSequenceScanningFlagsReportInvalidEscapeErrors != 0 {
			if flags&EscapeSequenceScanningFlagsRegularExpression != 0 && flags&EscapeSequenceScanningFlagsAtomEscape == 0 {
				s.errorAt(diagnostics.Decimal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class, start, s.pos-start)
			} else {
				s.errorAt(diagnostics.Escape_sequence_0_is_not_allowed, start, s.pos-start, s.text[start:s.pos])
			}
			return string(ch)
		}
		return s.text[start:s.pos]
	case 'b':
		return "\b"
	case 't':
		return "\t"
	case 'n':
		return "\n"
	case 'v':
		return "\v"
	case 'f':
		return "\f"
	case 'r':
		return "\r"
	case '\'':
		return "'"
	case '"':
		return "\""
	case 'u':
		// '\uDDDD' and '\u{DDDDDD}'
		extended := s.char() == '{'
		s.pos -= 2
		codePoint := s.scanUnicodeEscape(flags&EscapeSequenceScanningFlagsReportInvalidEscapeErrors != 0)
		if extended {
			if flags&EscapeSequenceScanningFlagsAllowExtendedUnicodeEscape == 0 {
				s.tokenFlags |= ast.TokenFlagsContainsInvalidEscape
				if flags&EscapeSequenceScanningFlagsReportInvalidEscapeErrors != 0 {
					s.errorAt(diagnostics.Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, s.pos-start)
				}
			}
			if codePoint < 0 {
				return s.text[start:s.pos]
			}
			// In string literals, a high surrogate \u{...} followed by a low
			// surrogate escape forms a single code point, exactly as adjacent
			// UTF-16 code units would in a JavaScript string.
			if flags&EscapeSequenceScanningFlagsRegularExpression == 0 && stringutil.IsHighSurrogate(codePoint) {
				if combined, ok := s.scanLowSurrogateEscape(codePoint); ok {
					return string(combined)
				}
			}
			return stringutil.EncodeJSStringRune(codePoint)
		}
		if codePoint < 0 {
			return s.text[start:s.pos]
		} else if stringutil.IsHighSurrogate(codePoint) {
			if flags&EscapeSequenceScanningFlagsRegularExpression == 0 {
				// Combine \uHigh followed by any low surrogate escape (\uLow or
				// \u{Low}) into a single code point in string literals, matching
				// how adjacent UTF-16 code units pair in a JavaScript string.
				if combined, ok := s.scanLowSurrogateEscape(codePoint); ok {
					return string(combined)
				}
			} else if flags&EscapeSequenceScanningFlagsAnyUnicodeMode != 0 &&
				s.char() == '\\' && s.charAt(1) == 'u' && s.charAt(2) != '{' {
				// In regex AnyUnicodeMode, combine \uHigh\uLow so scanClassRanges
				// can compare the pair numerically. In non-unicode regex mode they
				// are separate atoms, and extended \u{...} escapes never combine.
				savedPos := s.pos
				nextCodePoint := s.scanUnicodeEscape(flags&EscapeSequenceScanningFlagsReportInvalidEscapeErrors != 0)
				if stringutil.IsLowSurrogate(nextCodePoint) {
					return string(stringutil.SurrogatePairToCodePoint(codePoint, nextCodePoint))
				}
				s.pos = savedPos
			}
		}
		// Lone surrogate: encode as CESU-8 so it survives losslessly. In a
		// non-unicode regex this also lets scanClassRanges compare it numerically.
		return stringutil.EncodeJSStringRune(codePoint)
	case 'x':
		// '\xDD'
		for ; s.pos < start+4; s.pos++ {
			if !stringutil.IsHexDigit(s.char()) {
				s.tokenFlags |= ast.TokenFlagsContainsInvalidEscape
				if flags&EscapeSequenceScanningFlagsReportInvalidEscapeErrors != 0 {
					s.error(diagnostics.Hexadecimal_digit_expected)
				}
				return s.text[start:s.pos]
			}
		}
		s.tokenFlags |= ast.TokenFlagsHexEscape
		escapedValue, _ := strconv.ParseInt(s.text[start+2:s.pos], 16, 32)
		return string(rune(escapedValue))
	case '\r':
		// when encountering a LineContinuation (i.e. a backslash and a line terminator sequence),
		// the line terminator is interpreted to be "the empty code unit sequence".
		if s.char() == '\n' {
			s.pos++
		}
		fallthrough
	case '\n':
		return ""
	default:
		// ch was read as a single byte; for multi-byte UTF-8 characters,
		// we need to decode the full rune and advance past all its bytes.
		if ch >= utf8.RuneSelf {
			s.pos-- // back up past the single-byte advance
			var size int
			ch, size = utf8.DecodeRuneInString(s.text[s.pos:])
			s.pos += size
			s.containsNonASCII = true
		}
		// LineContinuation: a backslash followed by a line terminator is "the empty code unit sequence".
		if ch == '\u2028' || ch == '\u2029' {
			return ""
		}
		if flags&EscapeSequenceScanningFlagsAnyUnicodeMode != 0 || flags&EscapeSequenceScanningFlagsRegularExpression != 0 && flags&EscapeSequenceScanningFlagsAnnexB == 0 && IsIdentifierPart(ch) {
			s.errorAt(diagnostics.This_character_cannot_be_escaped_in_a_regular_expression, start, s.pos-start)
		}
		return string(ch)
	}
}

// Known to be at \u
func (s *Scanner) scanUnicodeEscape(shouldEmitInvalidEscapeError bool) rune {
	s.pos += 2
	start := s.pos
	extended := s.char() == '{'
	var hexDigits string
	if extended {
		s.pos++
		hexDigits = s.scanHexDigits(1, true, false)
	} else {
		s.tokenFlags |= ast.TokenFlagsUnicodeEscape
		hexDigits = s.scanHexDigits(4, false, false)
	}
	if hexDigits == "" {
		s.tokenFlags |= ast.TokenFlagsContainsInvalidEscape
		if shouldEmitInvalidEscapeError {
			s.error(diagnostics.Hexadecimal_digit_expected)
		}
		return -1
	}
	hexValue, _ := strconv.ParseInt(hexDigits, 16, 32)
	if extended {
		isInvalidExtendedEscape := false
		if hexValue > 0x10FFFF {
			if shouldEmitInvalidEscapeError {
				s.errorAt(diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive, start+1, s.pos-start-1)
			}
			isInvalidExtendedEscape = true
		}
		if s.pos >= s.end {
			if shouldEmitInvalidEscapeError {
				s.error(diagnostics.Unexpected_end_of_text)
			}
			isInvalidExtendedEscape = true
		} else if s.char() == '}' {
			s.pos++
		} else {
			if shouldEmitInvalidEscapeError {
				s.error(diagnostics.Unterminated_Unicode_escape_sequence)
			}
			isInvalidExtendedEscape = true
		}
		if isInvalidExtendedEscape {
			s.tokenFlags |= ast.TokenFlagsContainsInvalidEscape
			return -1
		}
		s.tokenFlags |= ast.TokenFlagsExtendedUnicodeEscape
	}
	return rune(hexValue)
}

// scanLowSurrogateEscape attempts to consume a low-surrogate Unicode escape
// (either '\uLow' or '\u{Low}') immediately following an already-scanned high
// surrogate and combine them into a single supplementary code point. This
// mirrors how adjacent UTF-16 code units form a surrogate pair in a JavaScript
// string, regardless of which escape syntax produced each half. On success it
// returns the combined code point and true; otherwise it restores the scanner
// position and returns false.
func (s *Scanner) scanLowSurrogateEscape(high rune) (rune, bool) {
	if s.char() != '\\' || s.charAt(1) != 'u' {
		return 0, false
	}
	savedPos := s.pos
	savedTokenFlags := s.tokenFlags
	// Speculatively scan the escape with diagnostics suppressed: if it isn't a
	// low surrogate we rewind below, and the caller re-scans the same escape and
	// reports any error then, so reporting here would duplicate diagnostics.
	low := s.scanUnicodeEscape(false)
	if stringutil.IsLowSurrogate(low) {
		return stringutil.SurrogatePairToCodePoint(high, low), true
	}
	s.pos = savedPos
	s.tokenFlags = savedTokenFlags
	return 0, false
}

// Current character is known to be a backslash. Check for Unicode escape of the form '\uXXXX'
// or '\u{XXXXXX}' and return code point value if valid Unicode escape is found. Otherwise return -1.
func (s *Scanner) peekUnicodeEscape() rune {
	if s.charAt(1) == 'u' {
		savePos := s.pos
		saveTokenFlags := s.tokenFlags
		codePoint := s.scanUnicodeEscape(false)
		s.pos = savePos
		s.tokenFlags = saveTokenFlags
		return codePoint
	}
	return -1
}

func (s *Scanner) scanNumber() ast.Kind {
	start := s.pos
	var fixedPart string
	if s.char() == '0' {
		s.pos++
		if s.char() == '_' {
			s.tokenFlags |= ast.TokenFlagsContainsSeparator | ast.TokenFlagsContainsInvalidSeparator
			s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos, 1)
			s.pos = start
			fixedPart = s.scanNumberFragment()
		} else {
			digits, isOctal := s.scanDigits()
			if digits == "" {
				fixedPart = "0"
			} else if !isOctal {
				s.tokenFlags |= ast.TokenFlagsContainsLeadingZero
				fixedPart = digits
			} else {
				val, _ := strconv.ParseInt(digits, 8, 64)
				s.tokenValue = strconv.FormatInt(val, 10)
				s.tokenFlags |= ast.TokenFlagsOctal
				withMinus := s.token == ast.KindMinusToken
				literal := core.IfElse(withMinus, "-", "") + "0o" + strconv.FormatInt(val, 8)
				if withMinus {
					start--
				}
				s.errorAt(diagnostics.Octal_literals_are_not_allowed_Use_the_syntax_0, start, s.pos-start, literal)
				return ast.KindNumericLiteral
			}
		}
	} else {
		fixedPart = s.scanNumberFragment()
	}
	fixedPartEnd := s.pos
	fractionalPart := ""
	exponentPreamble := ""
	exponentPart := ""
	if s.char() == '.' {
		s.pos++
		fractionalPart = s.scanNumberFragment()
	}
	end := s.pos
	if s.char() == 'E' || s.char() == 'e' {
		s.pos++
		s.tokenFlags |= ast.TokenFlagsScientific
		if s.char() == '+' || s.char() == '-' {
			s.pos++
		}
		startNumericPart := s.pos
		exponentPart = s.scanNumberFragment()
		if exponentPart == "" {
			s.error(diagnostics.Digit_expected)
		} else {
			exponentPreamble = s.text[end:startNumericPart]
			end = s.pos
		}
	}
	if s.tokenFlags&ast.TokenFlagsContainsSeparator != 0 {
		s.tokenValue = fixedPart
		if fractionalPart != "" {
			s.tokenValue += "." + fractionalPart
		}
		if exponentPart != "" {
			s.tokenValue += exponentPreamble + exponentPart
		}
	} else {
		s.tokenValue = s.text[start:end]
	}
	if s.tokenFlags&ast.TokenFlagsContainsLeadingZero != 0 {
		s.errorAt(diagnostics.Decimals_with_leading_zeros_are_not_allowed, start, s.pos-start)
		s.tokenValue = jsnum.FromString(s.tokenValue).String()
		return ast.KindNumericLiteral
	}
	var result ast.Kind
	if fixedPartEnd == s.pos {
		result = s.scanBigIntSuffix()
	} else {
		s.tokenValue = jsnum.FromString(s.tokenValue).String()
		result = ast.KindNumericLiteral
	}
	ch, _ := s.charAndSize()
	if IsIdentifierStart(ch) {
		idStart := s.pos
		id := s.scanIdentifierParts()
		if result != ast.KindBigIntLiteral && len(id) == 1 && s.text[idStart] == 'n' {
			if s.tokenFlags&ast.TokenFlagsScientific != 0 {
				s.errorAt(diagnostics.A_bigint_literal_cannot_use_exponential_notation, start, s.pos-start)
				return result
			}
			if fixedPartEnd < idStart {
				s.errorAt(diagnostics.A_bigint_literal_must_be_an_integer, start, s.pos-start)
				return result
			}
		}
		s.errorAt(diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, idStart, s.pos-idStart)
		s.pos = idStart
	}
	return result
}

func (s *Scanner) scanNumberFragment() string {
	start := s.pos
	allowSeparator := false
	isPreviousTokenSeparator := false
	var result strings.Builder
	for {
		ch := s.char()
		if ch == '_' {
			s.tokenFlags |= ast.TokenFlagsContainsSeparator
			if allowSeparator {
				allowSeparator = false
				isPreviousTokenSeparator = true
				result.WriteString(s.text[start:s.pos])
			} else {
				s.tokenFlags |= ast.TokenFlagsContainsInvalidSeparator
				if isPreviousTokenSeparator {
					s.errorAt(diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, s.pos, 1)
				} else {
					s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos, 1)
				}
			}
			s.pos++
			start = s.pos
			continue
		}
		if stringutil.IsDigit(ch) {
			allowSeparator = true
			isPreviousTokenSeparator = false
			s.pos++
			continue
		}
		break
	}
	if isPreviousTokenSeparator {
		s.tokenFlags |= ast.TokenFlagsContainsInvalidSeparator
		s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos-1, 1)
	}
	result.WriteString(s.text[start:s.pos])
	return result.String()
}

func (s *Scanner) scanDigits() (string, bool) {
	start := s.pos
	isOctal := true
	for stringutil.IsDigit(s.char()) {
		if !stringutil.IsOctalDigit(s.char()) {
			isOctal = false
		}
		s.pos++
	}
	return s.text[start:s.pos], isOctal
}

func (s *Scanner) scanHexDigits(minCount int, scanAsManyAsPossible bool, canHaveSeparators bool) string {
	digitCount := 0
	start := s.pos
	allowSeparator := false
	isPreviousTokenSeparator := false
	for digitCount < minCount || scanAsManyAsPossible {
		ch := s.char()
		if stringutil.IsHexDigit(ch) {
			allowSeparator = canHaveSeparators
			isPreviousTokenSeparator = false
			digitCount++
		} else if canHaveSeparators && ch == '_' {
			s.tokenFlags |= ast.TokenFlagsContainsSeparator
			if allowSeparator {
				allowSeparator = false
				isPreviousTokenSeparator = true
			} else if isPreviousTokenSeparator {
				s.errorAt(diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, s.pos, 1)
			} else {
				s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos, 1)
			}
		} else {
			break
		}
		s.pos++
	}
	if isPreviousTokenSeparator {
		s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos-1, 1)
	}
	if digitCount < minCount {
		return ""
	}
	digits := s.text[start:s.pos]
	if s.hexDigitCache == nil {
		s.hexDigitCache = make(map[string]string)
	}
	if cached, ok := s.hexDigitCache[digits]; ok {
		return cached
	} else {
		original := digits
		if s.tokenFlags&ast.TokenFlagsContainsSeparator != 0 {
			digits = strings.ReplaceAll(digits, "_", "")
		}
		digits = strings.ToLower(digits) // standardize hex literals to lowercase
		s.hexDigitCache[original] = digits
		return digits
	}
}

func (s *Scanner) scanBinaryOrOctalDigits(base int32) string {
	var sb strings.Builder
	allowSeparator := false
	isPreviousTokenSeparator := false
	for {
		ch := s.char()
		if stringutil.IsDigit(ch) && ch-'0' < base {
			sb.WriteByte(byte(ch))
			allowSeparator = true
			isPreviousTokenSeparator = false
		} else if ch == '_' {
			s.tokenFlags |= ast.TokenFlagsContainsSeparator
			if allowSeparator {
				allowSeparator = false
				isPreviousTokenSeparator = true
			} else if isPreviousTokenSeparator {
				s.errorAt(diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, s.pos, 1)
			} else {
				s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos, 1)
			}
		} else {
			break
		}
		s.pos++
	}
	if isPreviousTokenSeparator {
		s.errorAt(diagnostics.Numeric_separators_are_not_allowed_here, s.pos-1, 1)
	}
	return sb.String()
}

func (s *Scanner) scanBigIntSuffix() ast.Kind {
	if s.char() == 'n' {
		s.tokenValue += "n"
		if s.tokenFlags&ast.TokenFlagsBinaryOrOctalSpecifier != 0 {
			s.tokenValue = jsnum.ParsePseudoBigInt(s.tokenValue) + "n"
		}
		s.pos++
		return ast.KindBigIntLiteral
	}
	if s.numberCache == nil {
		s.numberCache = make(map[string]string)
	}
	if cached, ok := s.numberCache[s.tokenValue]; ok {
		s.tokenValue = cached
	} else {
		tokenValue := jsnum.FromString(s.tokenValue).String()
		if tokenValue == s.tokenValue {
			tokenValue = s.tokenValue
		}
		s.numberCache[s.tokenValue] = tokenValue
		s.tokenValue = tokenValue
	}
	return ast.KindNumericLiteral
}

func (s *Scanner) scanInvalidCharacter() {
	_, size := s.charAndSize()
	s.errorAt(diagnostics.Invalid_character, s.pos, size)
	s.pos += size
	s.token = ast.KindUnknown
}

func GetIdentifierToken(str string) ast.Kind {
	if len(str) >= 2 && len(str) <= 12 && str[0] >= 'a' && str[0] <= 'z' {
		keyword := textToKeyword[str]
		if keyword != ast.KindUnknown {
			return keyword
		}
	}
	return ast.KindIdentifier
}

func IsValidIdentifier(s string) bool {
	if len(s) == 0 {
		return false
	}
	for i, ch := range s {
		if i == 0 && !IsIdentifierStart(ch) || i != 0 && !IsIdentifierPart(ch) {
			return false
		}
	}
	return true
}

// Section 6.1.4
func isWordCharacter(ch rune) bool {
	return stringutil.IsASCIILetter(ch) || stringutil.IsDigit(ch) || ch == '_'
}

func IsIdentifierStart(ch rune) bool {
	return stringutil.IsASCIILetter(ch) || ch == '_' || ch == '$' || ch >= utf8.RuneSelf && stringutil.IsUnicodeIdentifierStart(ch)
}

func IsIdentifierPart(ch rune) bool {
	return IsIdentifierPartEx(ch, core.LanguageVariantStandard)
}

func IsIdentifierPartEx(ch rune, languageVariant core.LanguageVariant) bool {
	return isWordCharacter(ch) || ch == '$' ||
		ch >= utf8.RuneSelf && stringutil.IsUnicodeIdentifierPart(ch) ||
		languageVariant == core.LanguageVariantJSX && (ch == '-' || ch == ':') // "-" and ":" are valid in JSX Identifiers
}

var tokenToText = func() [ast.KindCount]string {
	var result [ast.KindCount]string
	for text, kind := range textToToken {
		result[kind] = text
	}
	return result
}()

func TokenToString(token ast.Kind) string {
	return tokenToText[token]
}

func StringToToken(s string) ast.Kind {
	kind, ok := textToToken[s]
	if ok {
		return kind
	}
	return ast.KindUnknown
}

func GetViableKeywordSuggestions() []string {
	result := make([]string, 0, len(textToKeyword))
	for text := range textToKeyword {
		if len(text) > 2 {
			result = append(result, text)
		}
	}
	return result
}

func couldStartTrivia(text string, pos int) bool {
	// Keep in sync with skipTrivia
	switch ch := text[pos]; ch {
	// Characters that could start normal trivia
	case '\r', '\n', '\t', '\v', '\f', ' ', '/',
		// Characters that could start conflict marker trivia
		'<', '|', '=', '>':
		return true
	case '#':
		// Only if its the beginning can we have #! trivia
		return pos == 0
	default:
		return ch > maxAsciiCharacter
	}
}

type SkipTriviaOptions struct {
	StopAfterLineBreak bool
	StopAtComments     bool
	InJSDoc            bool
}

func SkipTrivia(text string, pos int) int {
	return SkipTriviaEx(text, pos, nil)
}

func SkipTriviaEx(text string, pos int, options *SkipTriviaOptions) int {
	if ast.PositionIsSynthesized(pos) {
		return pos
	}
	if options == nil {
		options = &SkipTriviaOptions{}
	}

	textLen := len(text)
	canConsumeStar := false
	// Keep in sync with couldStartTrivia
	for {
		if pos >= textLen {
			return pos
		}
		ch, size := utf8.DecodeRuneInString(text[pos:])
		switch ch {
		case '\r':
			if pos+1 < textLen && text[pos+1] == '\n' {
				pos++
			}
			fallthrough
		case '\n':
			pos++
			if options.StopAfterLineBreak {
				return pos
			}
			canConsumeStar = options.InJSDoc
			continue
		case '\t', '\v', '\f', ' ':
			pos++
			continue
		case '/':
			if options.StopAtComments {
				break
			}
			if pos+1 < textLen {
				if text[pos+1] == '/' {
					pos += 2
					for pos < textLen {
						ch, size := utf8.DecodeRuneInString(text[pos:])
						if stringutil.IsLineBreak(ch) {
							break
						}
						pos += size
					}
					canConsumeStar = false
					continue
				}
				if text[pos+1] == '*' {
					pos += 2
					for pos < textLen {
						if text[pos] == '*' && (pos+1 < textLen) && text[pos+1] == '/' {
							pos += 2
							break
						}
						_, size := utf8.DecodeRuneInString(text[pos:])
						pos += size
					}
					canConsumeStar = false
					continue
				}
			}
		case '<', '|', '=', '>':
			if isConflictMarkerTrivia(text, pos) {
				pos = scanConflictMarkerTrivia(text, pos, nil)
				canConsumeStar = false
				continue
			}
		case '#':
			if pos == 0 && isShebangTrivia(text, pos) {
				pos = scanShebangTrivia(text, pos)
				canConsumeStar = false
				continue
			}
		case '*':
			if canConsumeStar {
				pos++
				canConsumeStar = false
				continue
			}
		default:
			if ch > rune(maxAsciiCharacter) && stringutil.IsWhiteSpaceLike(ch) {
				pos += size
				continue
			}
		}
		return pos
	}
}

// All conflict markers consist of the same character repeated seven times.  If it is
// a <<<<<<< or >>>>>>> marker then it is also followed by a space.
var (
	mergeConflictMarkerLength      = len("<<<<<<<")
	maxAsciiCharacter         byte = 127
)

func isConflictMarkerTrivia(text string, pos int) bool {
	if pos < 0 {
		panic("pos < 0")
	}

	// Conflict markers must be at the start of a line.
	var prev rune
	if pos >= 2 {
		prev, _ = utf8.DecodeLastRuneInString(text[:pos-2])
	}
	if pos == 0 || stringutil.IsLineBreak(prev) || pos >= 1 && stringutil.IsLineBreak(rune(text[pos-1])) {
		ch := text[pos]

		if (pos + mergeConflictMarkerLength) < len(text) {
			for i := range mergeConflictMarkerLength {
				if text[pos+i] != ch {
					return false
				}
			}

			return ch == '=' || text[pos+mergeConflictMarkerLength] == ' '
		}
	}

	return false
}

func scanConflictMarkerTrivia(text string, pos int, reportError func(diag *diagnostics.Message, pos int, length int, args ...any)) int {
	if reportError != nil {
		reportError(diagnostics.Merge_conflict_marker_encountered, pos, mergeConflictMarkerLength)
	}
	ch, size := utf8.DecodeRuneInString(text[pos:])
	length := len(text)

	if ch == '<' || ch == '>' {
		for pos < length && !stringutil.IsLineBreak(ch) {
			pos += size
			ch, size = utf8.DecodeRuneInString(text[pos:])
		}
	} else {
		if ch != '|' && ch != '=' {
			panic("Assertion failed: ch must be either '|' or '='")
		}
		// Consume everything from the start of a ||||||| or ======= marker to the start
		// of the next ======= or >>>>>>> marker.
		for pos < length {
			currentChar := text[pos]
			if (currentChar == '=' || currentChar == '>') && rune(currentChar) != ch && isConflictMarkerTrivia(text, pos) {
				break
			}

			pos++
		}
	}

	return pos
}

func isShebangTrivia(text string, pos int) bool {
	if len(text) < 2 {
		return false
	}
	if pos != 0 {
		panic("Shebangs check must only be done at the start of the file")
	}
	return text[0] == '#' && text[1] == '!'
}

func scanShebangTrivia(text string, pos int) int {
	pos += 2
	for pos < len(text) {
		ch, size := utf8.DecodeRuneInString(text[pos:])
		if stringutil.IsLineBreak(ch) {
			break
		}
		pos += size
	}
	return pos
}

func GetShebang(text string) string {
	if !isShebangTrivia(text, 0) {
		return ""
	}

	end := scanShebangTrivia(text, 0)
	return text[:end]
}

func GetScannerForSourceFile(sourceFile *ast.SourceFile, pos int) *Scanner {
	s := NewScanner()
	s.text = sourceFile.Text()
	s.pos = pos
	s.end = len(s.text)
	s.languageVariant = sourceFile.LanguageVariant
	s.Scan()
	return s
}

func ScanTokenAtPosition(sourceFile *ast.SourceFile, pos int) ast.Kind {
	s := GetScannerForSourceFile(sourceFile, pos)
	return s.token
}

func GetRangeOfTokenAtPosition(sourceFile *ast.SourceFile, pos int) core.TextRange {
	s := GetScannerForSourceFile(sourceFile, pos)
	return core.NewTextRange(s.tokenStart, s.pos)
}

func GetTokenPosOfNode(node *ast.Node, sourceFile *ast.SourceFile, includeJSDoc bool) int {
	// With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
	// want to skip trivia because this will launch us forward to the next token.
	if ast.NodeIsMissing(node) {
		return node.Pos()
	}
	if ast.IsJSDocNode(node) || node.Kind == ast.KindJsxText {
		// JsxText cannot actually contain comments, even though the scanner will think it sees comments
		return SkipTriviaEx(sourceFile.Text(), node.Pos(), &SkipTriviaOptions{StopAtComments: true})
	}
	if includeJSDoc && len(node.JSDoc(sourceFile)) > 0 {
		return GetTokenPosOfNode(node.JSDoc(sourceFile)[0], sourceFile, false /*includeJSDoc*/)
	}
	return SkipTriviaEx(sourceFile.Text(), node.Pos(), &SkipTriviaOptions{InJSDoc: node.Flags&ast.NodeFlagsJSDoc != 0})
}

func getErrorRangeForArrowFunction(sourceFile *ast.SourceFile, node *ast.Node) core.TextRange {
	pos := SkipTrivia(sourceFile.Text(), node.Pos())
	body := node.Body()
	if body != nil && body.Kind == ast.KindBlock {
		startLine := GetECMALineOfPosition(sourceFile, body.Pos())
		endLine := GetECMALineOfPosition(sourceFile, body.End())
		if startLine < endLine {
			// The arrow function spans multiple lines, make the error span be the first line, inclusive.
			return core.NewTextRange(pos, GetECMAEndLinePosition(sourceFile, startLine)+1)
		}
	}
	return core.NewTextRange(pos, node.End())
}

func findOriginatingJSDocSatisfiesTag(sourceFile *ast.SourceFile, node *ast.Node) *ast.Node {
	targetType := node.AsSatisfiesExpression().Type
	if targetType.Flags&ast.NodeFlagsReparsed == 0 {
		return nil
	}
	for current := node.Parent; current != nil; current = current.Parent {
		if current.Flags&ast.NodeFlagsHasJSDoc == 0 {
			continue
		}
		var firstSatisfiesTag *ast.Node
		for _, jsDoc := range current.EagerJSDoc(sourceFile) {
			if tags := jsDoc.AsJSDoc().Tags; tags != nil {
				for _, tag := range tags.Nodes {
					if !ast.IsJSDocSatisfiesTag(tag) {
						continue
					}
					if firstSatisfiesTag == nil {
						firstSatisfiesTag = tag
					}
					if typeExpr := tag.AsJSDocSatisfiesTag().TypeExpression; typeExpr != nil {
						if t := typeExpr.Type(); t != nil && t.Loc == targetType.Loc {
							return tag
						}
					}
				}
			}
		}
		return firstSatisfiesTag
	}
	return nil
}

func GetErrorRangeForNode(sourceFile *ast.SourceFile, node *ast.Node) core.TextRange {
	errorNode := node
	switch node.Kind {
	case ast.KindSourceFile:
		pos := SkipTrivia(sourceFile.Text(), 0)
		if pos == len(sourceFile.Text()) {
			return core.NewTextRange(0, 0)
		}
		return GetRangeOfTokenAtPosition(sourceFile, pos)
	// This list is a work in progress. Add missing node kinds to improve their error spans
	case ast.KindFunctionDeclaration, ast.KindMethodDeclaration:
		if node.Flags&ast.NodeFlagsReparsed != 0 {
			errorNode = node
			break
		}
		fallthrough
	case ast.KindVariableDeclaration, ast.KindBindingElement, ast.KindClassDeclaration, ast.KindInterfaceDeclaration,
		ast.KindModuleDeclaration, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindFunctionExpression,
		ast.KindGetAccessor, ast.KindSetAccessor, ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration, ast.KindPropertyDeclaration,
		ast.KindPropertySignature, ast.KindNamespaceImport:
		errorNode = ast.GetNameOfDeclaration(node)
	case ast.KindClassExpression:
		errorNode = node.Name()

	case ast.KindArrowFunction:
		return getErrorRangeForArrowFunction(sourceFile, node)
	case ast.KindCaseClause, ast.KindDefaultClause:
		start := SkipTrivia(sourceFile.Text(), node.Pos())
		end := node.End()
		statements := node.Statements()
		if len(statements) != 0 {
			end = statements[0].Pos()
		}
		return core.NewTextRange(start, end)
	case ast.KindReturnStatement, ast.KindYieldExpression:
		pos := SkipTrivia(sourceFile.Text(), node.Pos())
		return GetRangeOfTokenAtPosition(sourceFile, pos)
	case ast.KindSatisfiesExpression:
		if jsDocSatisfiesTag := findOriginatingJSDocSatisfiesTag(sourceFile, node); jsDocSatisfiesTag != nil {
			pos := SkipTrivia(sourceFile.Text(), jsDocSatisfiesTag.TagName().Pos())
			return GetRangeOfTokenAtPosition(sourceFile, pos)
		}
		pos := SkipTrivia(sourceFile.Text(), node.AsSatisfiesExpression().Expression.End())
		return GetRangeOfTokenAtPosition(sourceFile, pos)
	case ast.KindConstructor:
		if node.Flags&ast.NodeFlagsReparsed != 0 {
			errorNode = node
			break
		}
		scanner := GetScannerForSourceFile(sourceFile, node.Pos())
		start := scanner.TokenStart()
		for scanner.Token() != ast.KindConstructorKeyword && scanner.Token() != ast.KindStringLiteral && scanner.Token() != ast.KindEndOfFile {
			scanner.Scan()
		}
		return core.NewTextRange(start, scanner.TokenEnd())
	}
	if errorNode == nil {
		// If we don't have a better node, then just set the error on the first token of
		// construct.
		return GetRangeOfTokenAtPosition(sourceFile, node.Pos())
	}
	pos := errorNode.Pos()
	if !ast.NodeIsMissing(errorNode) && !ast.IsJsxText(errorNode) {
		pos = SkipTrivia(sourceFile.Text(), pos)
	}
	return core.NewTextRange(pos, errorNode.End())
}

func ComputeLineOfPosition(lineStarts []core.TextPos, pos int) int {
	low := 0
	high := len(lineStarts) - 1
	for low <= high {
		middle := low + ((high - low) >> 1)
		value := int(lineStarts[middle])
		if value < pos {
			low = middle + 1
		} else if value > pos {
			high = middle - 1
		} else {
			return middle
		}
	}
	return low - 1
}

func GetECMALineStarts(sourceFile ast.SourceFileLike) []core.TextPos {
	return sourceFile.ECMALineMap()
}

func GetECMALineOfPosition(sourceFile ast.SourceFileLike, pos int) int {
	lineMap := GetECMALineStarts(sourceFile)
	return ComputeLineOfPosition(lineMap, pos)
}

// GetECMALineAndUTF16CharacterOfPosition returns the 0-based line number and the
// UTF-16 code unit offset from the start of that line for the given byte position.
// Uses ECMAScript line separators (LF, CR, CRLF, LS, PS).
func GetECMALineAndUTF16CharacterOfPosition(sourceFile ast.SourceFileLike, pos int) (line int, character core.UTF16Offset) {
	lineMap := GetECMALineStarts(sourceFile)
	line = ComputeLineOfPosition(lineMap, pos)
	character = core.UTF16Len(sourceFile.Text()[lineMap[line]:pos])
	return line, character
}

// GetECMALineAndByteOffsetOfPosition returns the 0-based line number and the
// raw UTF-8 byte offset from the start of that line for the given byte position.
// Uses ECMAScript line separators (LF, CR, CRLF, LS, PS).
// Unlike GetECMALineAndUTF16CharacterOfPosition, the offset is in bytes, not UTF-16 code units.
func GetECMALineAndByteOffsetOfPosition(sourceFile ast.SourceFileLike, pos int) (line int, byteOffset int) {
	lineMap := GetECMALineStarts(sourceFile)
	line = ComputeLineOfPosition(lineMap, pos)
	byteOffset = pos - int(lineMap[line])
	return line, byteOffset
}

func GetECMAEndLinePosition(sourceFile *ast.SourceFile, line int) int {
	pos := int(GetECMALineStarts(sourceFile)[line])
	for {
		ch, size := utf8.DecodeRuneInString(sourceFile.Text()[pos:])
		if size == 0 || stringutil.IsLineBreak(ch) {
			return pos - 1
		}
		pos += size
	}
}

// GetECMAPositionOfLineAndUTF16Character converts a 0-based line number and UTF-16
// code unit character offset back to an absolute byte position in the source text.
// Uses ECMAScript line separators.
func GetECMAPositionOfLineAndUTF16Character(sourceFile ast.SourceFileLike, line int, character core.UTF16Offset) int {
	lineStarts := GetECMALineStarts(sourceFile)
	return ComputePositionOfLineAndUTF16Character(lineStarts, line, character, sourceFile.Text(), false)
}

// GetECMAPositionOfLineAndByteOffset converts a 0-based line number and byte offset
// from line start back to an absolute byte position in the source text.
// Uses ECMAScript line separators.
func GetECMAPositionOfLineAndByteOffset(sourceFile ast.SourceFileLike, line int, byteOffset int) int {
	return ComputePositionOfLineAndByteOffset(GetECMALineStarts(sourceFile), line, byteOffset)
}

// ComputePositionOfLineAndByteOffset computes a byte position from a line and
// raw byte offset from the line start. This is a simple addition with validation.
func ComputePositionOfLineAndByteOffset(lineStarts []core.TextPos, line int, byteOffset int) int {
	if line < 0 || line >= len(lineStarts) {
		panic(fmt.Sprintf("Bad line number. Line: %d, lineStarts.length: %d.", line, len(lineStarts)))
	}
	return int(lineStarts[line]) + byteOffset
}

// ComputePositionOfLineAndUTF16Character converts a line and UTF-16 character offset
// back to a byte position. The character parameter is measured in UTF-16 code units.
// It scans from the line start to correctly handle multi-byte characters.
// When allowEdits is true, out-of-range values are clamped instead of panicking.
func ComputePositionOfLineAndUTF16Character(lineStarts []core.TextPos, line int, character core.UTF16Offset, text string, allowEdits bool) int {
	if line < 0 || line >= len(lineStarts) {
		if allowEdits {
			// Clamp line to nearest allowable value
			if line < 0 {
				line = 0
			} else if line >= len(lineStarts) {
				line = len(lineStarts) - 1
			}
		} else {
			panic(fmt.Sprintf("Bad line number. Line: %d, lineStarts.length: %d.", line, len(lineStarts)))
		}
	}

	lineStart := int(lineStarts[line])

	if character > 0 {
		// UTF-16 character offset: scan from line start counting UTF-16 code units.
		lineEnd := len(text)
		if line+1 < len(lineStarts) {
			lineEnd = int(lineStarts[line+1])
		}
		utf16Count := core.UTF16Offset(0)
		pos := lineStart
		for pos < lineEnd {
			if utf16Count >= character {
				break
			}
			r, size := utf8.DecodeRuneInString(text[pos:])
			utf16Count += core.UTF16Offset(utf16.RuneLen(r))
			pos += size
		}
		if !allowEdits {
			if pos == lineEnd && utf16Count < character {
				panic(fmt.Sprintf("Bad UTF-16 character offset. Line: %d, character: %d.", line, character))
			}
			debug.Assert(pos <= len(text))
			return pos
		}
		if pos > len(text) {
			return len(text)
		}
		return pos
	}

	// Character is 0: line start position.
	res := lineStart

	if allowEdits {
		if res > len(text) {
			return len(text)
		}
		return res
	}
	debug.Assert(res <= len(text)) // Allow single character overflow for trailing newline
	return res
}

func GetLeadingCommentRanges(f *ast.NodeFactory, text string, pos int) iter.Seq[ast.CommentRange] {
	return iterateCommentRanges(f, text, pos, false)
}

func GetTrailingCommentRanges(f *ast.NodeFactory, text string, pos int) iter.Seq[ast.CommentRange] {
	return iterateCommentRanges(f, text, pos, true)
}

/*
Returns an iterator over each comment range following the provided position.
Single-line comment ranges include the leading double-slash characters but not the ending
line break. Multi-line comment ranges include the leading slash-asterisk and trailing
asterisk-slash characters.
*/
func iterateCommentRanges(f *ast.NodeFactory, text string, pos int, trailing bool) iter.Seq[ast.CommentRange] {
	return func(yield func(ast.CommentRange) bool) {
		var pendingPos int
		var pendingEnd int
		var pendingKind ast.Kind
		var pendingHasTrailingNewLine bool
		hasPendingCommentRange := false
		collecting := trailing
		if pos == 0 {
			collecting = true
			if isShebangTrivia(text, pos) {
				pos = scanShebangTrivia(text, pos)
			}
		}
	scan:
		for pos >= 0 && pos < len(text) {
			ch, size := utf8.DecodeRuneInString(text[pos:])
			switch ch {
			case '\r':
				if pos+1 < len(text) && text[pos+1] == '\n' {
					pos++
				}
				fallthrough
			case '\n':
				pos++
				if trailing {
					break scan
				}

				collecting = true
				if hasPendingCommentRange {
					pendingHasTrailingNewLine = true
				}

				continue
			case '\t', '\v', '\f', ' ':
				pos++
				continue
			case '/':
				var nextChar byte
				if pos+1 < len(text) {
					nextChar = text[pos+1]
				}
				hasTrailingNewLine := false
				if nextChar == '/' || nextChar == '*' {
					var kind ast.Kind
					if nextChar == '/' {
						kind = ast.KindSingleLineCommentTrivia
					} else {
						kind = ast.KindMultiLineCommentTrivia
					}

					startPos := pos
					pos += 2
					if nextChar == '/' {
						for pos < len(text) {
							c, s := utf8.DecodeRuneInString(text[pos:])
							if stringutil.IsLineBreak(c) {
								hasTrailingNewLine = true
								break
							}
							pos += s
						}
					} else {
						for pos < len(text) {
							c, s := utf8.DecodeRuneInString(text[pos:])
							if c == '*' && pos+1 < len(text) && text[pos+1] == '/' {
								pos += 2
								break
							}
							pos += s
						}
					}

					if collecting {
						if hasPendingCommentRange {
							if !yield(f.NewCommentRange(pendingKind, pendingPos, pendingEnd, pendingHasTrailingNewLine)) {
								return
							}
						}

						pendingPos = startPos
						pendingEnd = pos
						pendingKind = kind
						pendingHasTrailingNewLine = hasTrailingNewLine
						hasPendingCommentRange = true
					}

					continue
				}
				break scan
			default:
				if ch > unicode.MaxASCII && stringutil.IsWhiteSpaceLike(ch) {
					if hasPendingCommentRange && stringutil.IsLineBreak(ch) {
						pendingHasTrailingNewLine = true
					}
					pos += size
					continue
				}
				break scan
			}
		}

		if hasPendingCommentRange {
			yield(f.NewCommentRange(pendingKind, pendingPos, pendingEnd, pendingHasTrailingNewLine))
		}
	}
}
