package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideDefinition(ctx context.Context, documentURI lsproto.DocumentUri, position lsproto.Position) (*lsproto.Definition, error) {
	program, file := l.getProgramAndFile(documentURI)
	node := astnav.GetTouchingPropertyName(file, int(l.converters.LineAndCharacterToPosition(file, position)))
	if node.Kind == ast.KindSourceFile {
		return nil, nil
	}

	checker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	if symbol := checker.GetSymbolAtLocation(node); symbol != nil {
		if symbol.Flags&ast.SymbolFlagsAlias != 0 {
			if resolved, ok := checker.ResolveAlias(symbol); ok {
				symbol = resolved
			}
		}

		locations := make([]lsproto.Location, 0, len(symbol.Declarations))
		for _, decl := range symbol.Declarations {
			file := ast.GetSourceFileOfNode(decl)
			loc := decl.Loc
			pos := scanner.GetTokenPosOfNode(decl, file, false /*includeJSDoc*/)
			locations = append(locations, lsproto.Location{
				Uri:   FileNameToDocumentURI(file.FileName()),
				Range: l.converters.ToLSPRange(file, core.NewTextRange(pos, loc.End())),
			})
		}
		return &lsproto.Definition{Locations: &locations}, nil
	}
	return nil, nil
}
