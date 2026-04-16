package fourslash

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

type SemanticToken struct {
	Type string
	Text string
}

func (f *FourslashTest) VerifySemanticTokens(t *testing.T, expected []SemanticToken) {
	t.Helper()

	params := &lsproto.SemanticTokensParams{
		TextDocument: lsproto.TextDocumentIdentifier{
			Uri: lsconv.FileNameToDocumentURI(f.activeFilename),
		},
	}

	result := sendRequest(t, f, lsproto.TextDocumentSemanticTokensFullInfo, params)

	if result.SemanticTokens == nil {
		if len(expected) == 0 {
			return
		}
		t.Fatal("Expected semantic tokens but got nil")
	}

	// Decode the semantic tokens using token types/modifiers from the test configuration
	actual := decodeSemanticTokens(f, result.SemanticTokens.Data, f.semanticTokenTypes, f.semanticTokenModifiers)

	// Compare with expected
	if len(actual) != len(expected) {
		t.Fatalf("Expected %d semantic tokens, got %d\n\nExpected:\n%s\n\nActual:\n%s",
			len(expected), len(actual),
			formatSemanticTokens(expected),
			formatSemanticTokens(actual))
	}

	for i, exp := range expected {
		act := actual[i]
		if exp.Type != act.Type || exp.Text != act.Text {
			t.Errorf("Token %d mismatch:\n  Expected: {Type: %q, Text: %q}\n  Actual:   {Type: %q, Text: %q}",
				i, exp.Type, exp.Text, act.Type, act.Text)
		}
	}
}

func decodeSemanticTokens(f *FourslashTest, data []uint32, tokenTypes, tokenModifiers []string) []SemanticToken {
	if len(data)%5 != 0 {
		panic(fmt.Sprintf("Invalid semantic tokens data length: %d", len(data)))
	}

	scriptInfo := f.scriptInfos[f.activeFilename]
	converters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *lsconv.LSPLineMap {
		return scriptInfo.lineMap
	})

	var tokens []SemanticToken
	prevLine := uint32(0)
	prevChar := uint32(0)

	for i := 0; i < len(data); i += 5 {
		deltaLine := data[i]
		deltaChar := data[i+1]
		length := data[i+2]
		tokenTypeIdx := data[i+3]
		tokenModifierMask := data[i+4]

		// Calculate absolute position
		line := prevLine + deltaLine
		var char uint32
		if deltaLine == 0 {
			char = prevChar + deltaChar
		} else {
			char = deltaChar
		}

		// Get token type
		if int(tokenTypeIdx) >= len(tokenTypes) {
			panic(fmt.Sprintf("Token type index out of range: %d", tokenTypeIdx))
		}
		tokenType := tokenTypes[tokenTypeIdx]

		// Get modifiers
		var modifiers []string
		for i, mod := range tokenModifiers {
			if tokenModifierMask&(1<<i) != 0 {
				modifiers = append(modifiers, mod)
			}
		}

		// Build full type string (type.modifier1.modifier2)
		typeStr := tokenType
		if len(modifiers) > 0 {
			typeStr = typeStr + "." + strings.Join(modifiers, ".")
		}

		// Get the text
		startPos := lsproto.Position{Line: line, Character: char}
		endPos := lsproto.Position{Line: line, Character: char + length}
		startOffset := int(converters.LineAndCharacterToPosition(scriptInfo, startPos))
		endOffset := int(converters.LineAndCharacterToPosition(scriptInfo, endPos))
		text := scriptInfo.content[startOffset:endOffset]

		tokens = append(tokens, SemanticToken{
			Type: typeStr,
			Text: text,
		})

		prevLine = line
		prevChar = char
	}

	return tokens
}

func formatSemanticTokens(tokens []SemanticToken) string {
	var lines []string
	for i, tok := range tokens {
		lines = append(lines, fmt.Sprintf("  [%d] {Type: %q, Text: %q}", i, tok.Type, tok.Text))
	}
	return strings.Join(lines, "\n")
}
