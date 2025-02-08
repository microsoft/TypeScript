package ls

import "github.com/microsoft/typescript-go/internal/core"

type TextChange struct {
	core.TextRange
	NewText string
}

func (t TextChange) ApplyTo(text string) string {
	return text[:t.Pos()] + t.NewText + text[t.End():]
}

type Location struct {
	FileName string
	Range    core.TextRange
}
