package encoder

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
)

type stringTable struct {
	fileText     string
	otherStrings *strings.Builder
	// offsets are pos/end pairs
	offsets []uint32
}

func newStringTable(fileText string, stringCount int) *stringTable {
	builder := &strings.Builder{}
	return &stringTable{
		fileText:     fileText,
		otherStrings: builder,
		offsets:      make([]uint32, 0, stringCount*2),
	}
}

func (t *stringTable) add(text string, kind ast.Kind, pos int, end int) uint32 {
	index := uint32(len(t.offsets))
	if kind == ast.KindSourceFile {
		t.offsets = append(t.offsets, uint32(pos), uint32(end))
		return index
	}
	length := len(text)
	if end-pos > 0 && end <= len(t.fileText) {
		// pos includes leading trivia, but we can usually infer the actual start of the
		// string from the kind and end
		endOffset := 0
		if kind == ast.KindStringLiteral || kind == ast.KindTemplateTail || kind == ast.KindNoSubstitutionTemplateLiteral {
			endOffset = 1
		}
		end = end - endOffset
		start := end - length
		fileSlice := t.fileText[start:end]
		if fileSlice == text {
			t.offsets = append(t.offsets, uint32(start), uint32(end))
			return index
		}
	}
	// no exact match, so we need to add it to the string table
	offset := len(t.fileText) + t.otherStrings.Len()
	t.otherStrings.WriteString(text)
	t.offsets = append(t.offsets, uint32(offset), uint32(offset+length))
	return index
}

func (t *stringTable) encode() []byte {
	result := make([]byte, 0, t.encodedLength())
	result = appendUint32s(result, t.offsets...)
	result = append(result, t.fileText...)
	result = append(result, t.otherStrings.String()...)
	return result
}

func (t *stringTable) stringLength() int {
	return len(t.fileText) + t.otherStrings.Len()
}

func (t *stringTable) encodedLength() int {
	return len(t.offsets)*4 + len(t.fileText) + t.otherStrings.Len()
}
