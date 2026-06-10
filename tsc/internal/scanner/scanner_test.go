package scanner

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"gotest.tools/v3/assert"
)

func TestScanStringPreservesLoneSurrogates(t *testing.T) {
	t.Parallel()
	s := NewScanner()
	s.SetText(`"🦀\ud7ff\ud800\ud801\uD83E\uDD80"`)
	assert.Equal(t, s.Scan(), ast.KindStringLiteral)
	assert.Equal(t, s.TokenValue(), "🦀"+
		stringutil.EncodeJSStringRune(0xD7FF)+
		stringutil.EncodeJSStringRune(0xD800)+
		stringutil.EncodeJSStringRune(0xD801)+
		"🦀")
}
