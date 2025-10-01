package sourcemap

import "github.com/microsoft/typescript-go/internal/core"

type ECMALineInfo struct {
	text       string
	lineStarts []core.TextPos
}

func GetECMALineInfo(text string, lineStarts []core.TextPos) *ECMALineInfo {
	return &ECMALineInfo{
		text:       text,
		lineStarts: lineStarts,
	}
}

func (li *ECMALineInfo) LineCount() int {
	return len(li.lineStarts)
}

func (li *ECMALineInfo) LineText(line int) string {
	pos := li.lineStarts[line]
	var end core.TextPos
	if line+1 < len(li.lineStarts) {
		end = li.lineStarts[line+1]
	} else {
		end = core.TextPos(len(li.text))
	}
	return li.text[pos:end]
}
