package format

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"gotest.tools/v3/assert"
)

func TestFormattingScannerTriviaOwnership(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name   string
		text   string
		first  ast.Kind
		rescan ast.Kind
	}{
		{"ordinary", "  left /* first */ +\t right // last\n third", ast.KindIdentifier, ast.KindIdentifier},
		{"greater than", "  >> /* first */ next // last\n third", ast.KindGreaterThanToken, ast.KindGreaterThanGreaterThanToken},
		{"regular expression", "  /ab+/g /* first */ next // last\n third", ast.KindSlashToken, ast.KindRegularExpressionLiteral},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			scan := scanner.NewScanner()
			scan.SetSkipTrivia(false)
			scan.SetText(test.text)
			s := formattingScanner{s: scan, endPos: len(test.text), wasNewLine: true}
			s.advance()
			first := s.readTokenInfo(&ast.Node{Kind: test.first})
			firstLeading := slices.Clone(first.leadingTrivia)
			firstTrailing := slices.Clone(first.trailingTrivia)
			rescanned := s.readTokenInfo(&ast.Node{Kind: test.rescan})
			rescannedLeading := slices.Clone(rescanned.leadingTrivia)
			rescannedTrailing := slices.Clone(rescanned.trailingTrivia)
			for s.isOnToken() {
				s.advance()
				if s.isOnToken() {
					s.readTokenInfo(&ast.Node{Kind: scan.Token()})
				}
			}
			s.skipToStartOf(&core.TextRange{})
			assert.Assert(t, slices.Equal(first.leadingTrivia, firstLeading))
			assert.Assert(t, slices.Equal(first.trailingTrivia, firstTrailing))
			assert.Assert(t, slices.Equal(rescanned.leadingTrivia, rescannedLeading))
			assert.Assert(t, slices.Equal(rescanned.trailingTrivia, rescannedTrailing))
		})
	}
}
