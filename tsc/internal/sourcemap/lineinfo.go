package sourcemap

import "github.com/microsoft/typescript-go/internal/core"

type LineInfo struct {
	text       string
	lineStarts []core.TextPos
}

func GetLineInfo(text string, lineStarts []core.TextPos) *LineInfo {
	return &LineInfo{
		text:       text,
		lineStarts: lineStarts,
	}
}

func (li *LineInfo) LineCount() int {
	return len(li.lineStarts)
}

func (li *LineInfo) LineText(line int) string {
	pos := li.lineStarts[line]
	var end core.TextPos
	if line+1 < len(li.lineStarts) {
		end = li.lineStarts[line+1]
	} else {
		end = core.TextPos(len(li.text))
	}
	return li.text[pos:end]
}
