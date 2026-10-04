package stringutil

import "testing"

func TestEncodeURI(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "encodes spaces as percent20",
			input:    "a b",
			expected: "a%20b",
		},
		{
			name:     "preserves reserved uri characters",
			input:    ";/?:@&=+$,#",
			expected: ";/?:@&=+$,#",
		},
		{
			name:     "encodes brackets and unicode using utf8 bytes",
			input:    "①Ⅻㄨㄩ U1[abc]",
			expected: "%E2%91%A0%E2%85%AB%E3%84%A8%E3%84%A9%20U1%5Babc%5D",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			if got := EncodeURI(tt.input); got != tt.expected {
				t.Fatalf("EncodeURI(%q) = %q, expected %q", tt.input, got, tt.expected)
			}
		})
	}
}
