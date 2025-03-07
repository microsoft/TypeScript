package core

// TextPos

type TextPos int32

// TextRange

type TextRange struct {
	pos TextPos
	end TextPos
}

func NewTextRange(pos int, end int) TextRange {
	return TextRange{pos: TextPos(pos), end: TextPos(end)}
}

func UndefinedTextRange() TextRange {
	return TextRange{pos: TextPos(-1), end: TextPos(-1)}
}

func (t TextRange) Pos() int {
	return int(t.pos)
}

func (t TextRange) End() int {
	return int(t.end)
}

func (t TextRange) Len() int {
	return int(t.end - t.pos)
}

func (t TextRange) IsValid() bool {
	return t.pos >= 0 || t.end >= 0
}

func (t TextRange) Contains(pos int) bool {
	return pos >= int(t.pos) && pos < int(t.end)
}

func (t TextRange) ContainsInclusive(pos int) bool {
	return pos >= int(t.pos) && pos <= int(t.end)
}

func (t TextRange) WithPos(pos int) TextRange {
	return TextRange{pos: TextPos(pos), end: t.end}
}

func (t TextRange) WithEnd(end int) TextRange {
	return TextRange{pos: t.pos, end: TextPos(end)}
}
