package sourcemap

import (
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/stringutil"
)

// Tries to find the sourceMappingURL comment at the end of a file.
func TryGetSourceMappingURL(lineInfo *LineInfo) string {
	for index := lineInfo.LineCount() - 1; index >= 0; index-- {
		line := lineInfo.LineText(index)
		line = strings.TrimLeftFunc(line, unicode.IsSpace)
		line = strings.TrimRightFunc(line, stringutil.IsLineBreak)
		if len(line) == 0 {
			continue
		}
		if len(line) < 4 || !strings.HasPrefix(line, "//") || line[2] != '#' && line[2] != '@' || line[3] != ' ' {
			break
		}
		if url, ok := strings.CutPrefix(line[4:], "sourceMappingURL="); ok {
			return strings.TrimRightFunc(url, unicode.IsSpace)
		}
	}
	return ""
}
