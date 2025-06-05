package core

type TextChange struct {
	TextRange
	NewText string
}

func (t TextChange) ApplyTo(text string) string {
	return text[:t.Pos()] + t.NewText + text[t.End():]
}
