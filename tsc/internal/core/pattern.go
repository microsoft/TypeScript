package core

import "strings"

type Pattern struct {
	Text      string
	StarIndex int // -1 for exact match
}

func TryParsePattern(pattern string) Pattern {
	starIndex := strings.Index(pattern, "*")
	if starIndex == -1 || !strings.Contains(pattern[starIndex+1:], "*") {
		return Pattern{Text: pattern, StarIndex: starIndex}
	}
	return Pattern{}
}

func (p *Pattern) IsValid() bool {
	return p.StarIndex == -1 || p.StarIndex < len(p.Text)
}

func (p *Pattern) Matches(candidate string) bool {
	if p.StarIndex == -1 {
		return p.Text == candidate
	}
	return len(candidate) >= p.StarIndex &&
		strings.HasPrefix(candidate, p.Text[:p.StarIndex]) &&
		strings.HasSuffix(candidate, p.Text[p.StarIndex+1:])
}

func (p *Pattern) MatchedText(candidate string) string {
	if !p.Matches(candidate) {
		panic("candidate does not match pattern")
	}
	if p.StarIndex == -1 {
		return ""
	}
	return candidate[p.StarIndex : len(candidate)-len(p.Text)+p.StarIndex+1]
}

func FindBestPatternMatch(patterns []Pattern, candidate string) Pattern {
	var bestPattern Pattern
	longestMatchPrefixLength := -1
	for _, pattern := range patterns {
		if (pattern.StarIndex == -1 || pattern.StarIndex > longestMatchPrefixLength) && pattern.Matches(candidate) {
			bestPattern = pattern
			longestMatchPrefixLength = pattern.StarIndex
		}
	}
	return bestPattern
}
