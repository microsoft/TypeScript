package diagnostics

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"golang.org/x/text/language"
	"gotest.tools/v3/assert"
)

func TestLocalize(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		message  *Message
		locale   locale.Locale
		args     []any
		expected string
	}{
		{
			name:     "english default",
			message:  Identifier_expected,
			locale:   locale.Locale(language.English),
			expected: "Identifier expected.",
		},
		{
			name:     "undefined locale uses english",
			message:  Identifier_expected,
			locale:   locale.Locale(language.Und),
			expected: "Identifier expected.",
		},
		{
			name:     "with single argument",
			message:  X_0_expected,
			locale:   locale.Locale(language.English),
			args:     []any{")"},
			expected: "')' expected.",
		},
		{
			name:     "with multiple arguments",
			message:  The_parser_expected_to_find_a_1_to_match_the_0_token_here,
			locale:   locale.Locale(language.English),
			args:     []any{"{", "}"},
			expected: "The parser expected to find a '}' to match the '{' token here.",
		},
		{
			name:     "fallback to english for unknown locale",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("af-ZA")),
			expected: "Identifier expected.",
		},
		{
			name:     "german",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("de-DE")),
			expected: "Es wurde ein Bezeichner erwartet.",
		},
		{
			name:     "french",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("fr-FR")),
			expected: "Identificateur attendu.",
		},
		{
			name:     "spanish",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("es-ES")),
			expected: "Se esperaba un identificador.",
		},
		{
			name:     "japanese",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("ja-JP")),
			expected: "識別子が必要です。",
		},
		{
			name:     "chinese simplified",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("zh-CN")),
			expected: "应为标识符。",
		},
		{
			name:     "korean",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("ko-KR")),
			expected: "식별자가 필요합니다.",
		},
		{
			name:     "russian",
			message:  Identifier_expected,
			locale:   locale.Locale(language.MustParse("ru-RU")),
			expected: "Ожидался идентификатор.",
		},
		{
			name:     "german with args",
			message:  X_0_expected,
			locale:   locale.Locale(language.MustParse("de-DE")),
			args:     []any{")"},
			expected: "\")\" wurde erwartet.",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := tt.message.Localize(tt.locale, tt.args...)
			assert.Equal(t, result, tt.expected)
		})
	}
}

func TestLocalize_ByKey(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		key      Key
		locale   locale.Locale
		args     []string
		expected string
	}{
		{
			name:     "by key without args",
			key:      "Identifier_expected_1003",
			locale:   locale.Locale(language.English),
			expected: "Identifier expected.",
		},
		{
			name:     "by key with args",
			key:      "_0_expected_1005",
			locale:   locale.Locale(language.English),
			args:     []string{")"},
			expected: "')' expected.",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			result := Localize(tt.locale, nil, tt.key, tt.args...)
			assert.Equal(t, result, tt.expected)
		})
	}
}

func TestLocaleFiles(t *testing.T) {
	t.Parallel()

	files, err := filepath.Glob("loc/*.generated.json")
	assert.NilError(t, err)
	assert.Assert(t, len(files) > 0)

	for _, path := range files {
		localeName := strings.TrimSuffix(filepath.Base(path), ".generated.json")
		t.Run(localeName, func(t *testing.T) {
			t.Parallel()

			file, openErr := os.Open(path)
			assert.NilError(t, openErr)
			defer file.Close()

			var handback map[Key]string
			assert.NilError(t, json.UnmarshalRead(file, &handback))
			validateLocalizedMessages(t, handback)

			activeMessages := make(map[Key]string, len(handback))
			for key, text := range handback {
				if keyToMessage(key) != nil {
					activeMessages[key] = text
				}
			}

			actual := getLocalizedMessages(language.MustParse(localeName))
			assert.DeepEqual(t, actual, activeMessages)
		})
	}
}

func TestLocaleFilesIgnoreStaleDiagnostics(t *testing.T) {
	t.Parallel()
	validateLocalizedMessages(t, map[Key]string{
		"Removed_diagnostic_99999": "Stale translation.",
	})
}

func validateLocalizedMessages(t *testing.T, localizedMessages map[Key]string) {
	t.Helper()
	for key, localizedText := range localizedMessages {
		message := keyToMessage(key)
		if message == nil {
			continue
		}
		localizedPlaceholders := placeholderSet(localizedText)
		englishPlaceholders := placeholderSet(message.text)
		assert.Equal(t, len(localizedPlaceholders), len(englishPlaceholders), "placeholder mismatch for %q", key)
		for placeholder := range englishPlaceholders {
			assert.Assert(t, localizedPlaceholders[placeholder], "localized diagnostic %q is missing placeholder %s", key, placeholder)
		}
	}
}

func placeholderSet(text string) map[string]bool {
	result := map[string]bool{}
	for _, placeholder := range placeholderRegexp.FindAllString(text, -1) {
		result[placeholder] = true
	}
	return result
}
