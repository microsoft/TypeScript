package testrunner

import (
	"regexp"
	"strconv"
	"strings"
	"unicode"
)

func compilerTestFileFilter(pattern string) func(string) bool {
	acceptAll := func(string) bool { return true }
	if compilerTestNameNeedsRewrite(pattern) {
		return acceptAll
	}
	parts := splitCompilerTestFilter(pattern)
	if len(parts) < 2 {
		return acceptAll
	}
	component := parts[1]
	anchored := strings.HasPrefix(component, "^")
	expression, err := regexp.Compile(strings.TrimPrefix(component, "^"))
	if err != nil {
		return acceptAll
	}
	prefix, _ := expression.LiteralPrefix()
	if prefix == "" || compilerTestNameNeedsRewrite(prefix) || (!anchored && !strings.ContainsFunc(prefix, unicode.IsUpper)) {
		return acceptAll
	}
	return func(filename string) bool {
		if compilerTestNameNeedsRewrite(filename) {
			return true
		}
		if anchored {
			return strings.HasPrefix(filename, prefix) || strings.HasPrefix(prefix, filename+"_")
		}
		if strings.Contains(filename, prefix) {
			return true
		}
		for index := range filename {
			if strings.HasPrefix(prefix, filename[index:]+"_") {
				return true
			}
		}
		return false
	}
}

func compilerTestNameNeedsRewrite(name string) bool {
	return strings.ContainsFunc(name, func(character rune) bool {
		return unicode.IsSpace(character) || !strconv.IsPrint(character)
	})
}

func splitCompilerTestFilter(pattern string) []string {
	var parts []string
	start, depth := 0, 0
	inClass, escaped := false, false
	for index, character := range pattern {
		if escaped {
			escaped = false
			continue
		}
		if character == '\\' {
			escaped = true
			continue
		}
		if inClass {
			if character == ']' {
				inClass = false
			}
			continue
		}
		switch character {
		case '[':
			inClass = true
		case '(':
			depth++
		case ')':
			depth--
		case '|':
			if depth == 0 {
				return nil
			}
		case '/':
			if depth == 0 {
				parts = append(parts, pattern[start:index])
				start = index + 1
			}
		}
	}
	return append(parts, pattern[start:])
}
