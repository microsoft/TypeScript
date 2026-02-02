package lsp

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/core"
)

func sanitizeStackTrace(stack string) string {
	// TODO: should we just look for the first '(' and
	// just strip everything before the prior newline?
	startIndex := strings.Index(stack, "runtime/debug.Stack()")
	if startIndex < 0 {
		return ""
	}
	stack = stack[startIndex:]

	result := &strings.Builder{}

	for lineNum, line := range core.Enumerate(strings.Lines(stack)) {
		if lineNum > 0 {
			result.WriteByte('\n')
		}

		i := 0
		// Skip whitespace
		for range line {
			if line[i] != ' ' && line[i] != '\t' {
				break
			}
			i++
		}

		result.WriteString(line[:i])

		line = line[i:]

		ourModuleIndex := strings.Index(line, "typescript-go/internal")
		if ourModuleIndex >= 0 {
			line = line[ourModuleIndex:]
			writeSanitizedModuleOrPath(line, result)
		} else {
			result.WriteString("(REDACTED FRAME)")
		}
	}

	return result.String()
}

func writeSanitizedModuleOrPath(line string, result *strings.Builder) {
	// We don't expect things like \r, but it doesn't hurt to trim just in case.
	line = strings.TrimSpace(line)

	for segmentIndex, segment := range strings.Split(line, "/") {
		if segmentIndex > 0 {
			result.WriteString("|>")
		}

		// See if the string ends with ), and strip out all the arguments.
		if strings.HasSuffix(segment, ")") {
			openParenIndex := strings.LastIndexByte(segment, '(')
			if openParenIndex < 0 {
				// Closing parenthesis, but no opening - bail out.
				result.WriteString("???")
				continue
			}

			segment = segment[:openParenIndex]
			result.WriteString(segment)
			result.WriteString("()")
			continue
		}

		result.WriteString(segment)
	}
}
