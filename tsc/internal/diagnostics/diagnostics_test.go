package diagnostics

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/locale"
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
