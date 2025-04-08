package ls

import (
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/core"
)

type LineMap struct {
	LineStarts []core.TextPos
	AsciiOnly  bool // TODO(jakebailey): collect ascii-only info per line
}

func ComputeLineStarts(text string) *LineMap {
	// This is like core.ComputeLineStarts, but only considers "\n", "\r", and "\r\n" as line breaks,
	// and reports when the text is ASCII-only.
	lineStarts := make([]core.TextPos, 0, strings.Count(text, "\n")+1)
	asciiOnly := true

	textLen := core.TextPos(len(text))
	var pos core.TextPos
	var lineStart core.TextPos
	for pos < textLen {
		b := text[pos]
		if b < utf8.RuneSelf {
			pos++
			switch b {
			case '\r':
				if pos < textLen && text[pos] == '\n' {
					pos++
				}
				fallthrough
			case '\n':
				lineStarts = append(lineStarts, lineStart)
				lineStart = pos
			}
		} else {
			_, size := utf8.DecodeRuneInString(text[pos:])
			pos += core.TextPos(size)
			asciiOnly = false
		}
	}
	lineStarts = append(lineStarts, lineStart)

	return &LineMap{
		LineStarts: lineStarts,
		AsciiOnly:  asciiOnly,
	}
}
