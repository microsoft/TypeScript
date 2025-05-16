package ls

import (
	"context"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func (l *LanguageService) ProvideHover(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (*lsproto.Hover, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		// Avoid giving quickInfo for the sourceFile as a whole.
		return nil, nil
	}
	checker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	result := checker.GetQuickInfoAtLocation(node)
	if result != "" {
		return &lsproto.Hover{
			Contents: lsproto.MarkupContentOrMarkedStringOrMarkedStrings{
				MarkupContent: &lsproto.MarkupContent{
					Kind:  lsproto.MarkupKindMarkdown,
					Value: codeFence("typescript", result),
				},
			},
		}, nil
	}
	return nil, nil
}

func codeFence(lang string, code string) string {
	if code == "" {
		return ""
	}
	ticks := 3
	for strings.Contains(code, strings.Repeat("`", ticks)) {
		ticks++
	}
	var result strings.Builder
	result.Grow(len(code) + len(lang) + 2*ticks + 2)
	for range ticks {
		result.WriteByte('`')
	}
	result.WriteString(lang)
	result.WriteByte('\n')
	result.WriteString(code)
	result.WriteByte('\n')
	for range ticks {
		result.WriteByte('`')
	}
	return result.String()
}
