package core

import "testing"

func TestPatternOverlappingMatch(t *testing.T) {
	t.Parallel()

	p := TryParsePattern("ab*ab")
	if p.Matches("ab") {
		t.Errorf("expected 'ab' not to match 'ab*ab'")
	}
	if !p.Matches("abXab") {
		t.Errorf("expected 'abXab' to match 'ab*ab'")
	}
	if got := p.MatchedText("abXab"); got != "X" {
		t.Errorf("MatchedText = %q, want %q", got, "X")
	}
	if !p.Matches("abab") {
		t.Errorf("expected 'abab' to match 'ab*ab'")
	}
	if got := p.MatchedText("abab"); got != "" {
		t.Errorf("MatchedText = %q, want empty", got)
	}
}
