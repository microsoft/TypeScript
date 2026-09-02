package printer

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

func TestTextWriterCachesUTF16Column(t *testing.T) {
	t.Parallel()

	w := NewTextWriter("\n", 4).(*textWriter)
	w.Write("a𝟘")
	assert.Equal(t, w.GetColumn(), core.UTF16Offset(3))
	assert.Equal(t, w.columnPos, w.builder.Len())

	w.Write("𝟙b")
	assert.Equal(t, w.GetColumn(), core.UTF16Offset(6))
	assert.Equal(t, w.columnPos, w.builder.Len())
}

func TestTextWriterResetsCachedColumnAfterNewLine(t *testing.T) {
	t.Parallel()

	w := NewTextWriter("\n", 4).(*textWriter)
	w.Write("previous line")
	w.GetColumn()
	w.RawWrite("\n𝟘")
	assert.Equal(t, w.GetColumn(), core.UTF16Offset(2))
	assert.Equal(t, w.columnPos, w.builder.Len())

	w.WriteLine()
	w.IncreaseIndent()
	assert.Equal(t, w.GetColumn(), core.UTF16Offset(4))
	w.Write("x")
	assert.Equal(t, w.GetColumn(), core.UTF16Offset(5))
}
