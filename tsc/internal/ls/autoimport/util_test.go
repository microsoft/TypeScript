package autoimport

import (
	"reflect"
	"testing"
)

func TestWordIndices(t *testing.T) {
	t.Parallel()
	tests := []struct {
		input         string
		expectedWords []string
	}{
		// Basic camelCase
		{
			input:         "camelCase",
			expectedWords: []string{"camelCase", "Case"},
		},
		// snake_case
		{
			input:         "snake_case",
			expectedWords: []string{"snake_case", "case"},
		},
		// ParseURL - uppercase sequence followed by lowercase
		{
			input:         "ParseURL",
			expectedWords: []string{"ParseURL", "URL"},
		},
		// XMLHttpRequest - multiple uppercase sequences
		{
			input:         "XMLHttpRequest",
			expectedWords: []string{"XMLHttpRequest", "HttpRequest", "Request"},
		},
		// Single word lowercase
		{
			input:         "hello",
			expectedWords: []string{"hello"},
		},
		// Single word uppercase
		{
			input:         "HELLO",
			expectedWords: []string{"HELLO"},
		},
		// Mixed with numbers
		{
			input:         "parseHTML5Parser",
			expectedWords: []string{"parseHTML5Parser", "HTML5Parser", "Parser"},
		},
		// Underscore variations
		{
			input:         "__proto__",
			expectedWords: []string{"__proto__", "proto__"},
		},
		{
			input:         "_private_member",
			expectedWords: []string{"_private_member", "member"},
		},
		// Single character
		{
			input:         "a",
			expectedWords: []string{"a"},
		},
		{
			input:         "A",
			expectedWords: []string{"A"},
		},
		// Consecutive underscores
		{
			input:         "test__double__underscore",
			expectedWords: []string{"test__double__underscore", "double__underscore", "underscore"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			t.Parallel()
			indices := wordIndices(tt.input)

			// Convert indices to actual word slices for comparison
			var actualWords []string
			for _, idx := range indices {
				actualWords = append(actualWords, tt.input[idx:])
			}

			if !reflect.DeepEqual(actualWords, tt.expectedWords) {
				t.Errorf("wordIndices(%q) produced words %v, want %v", tt.input, actualWords, tt.expectedWords)
			}
		})
	}
}
