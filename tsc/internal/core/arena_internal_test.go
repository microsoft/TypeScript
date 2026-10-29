package core

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestArenaNewSliceGrowsFromPartiallyUsedChunk(t *testing.T) {
	t.Parallel()
	arena := Arena[int64]{data: make([]int64, 1, 8)}
	slice := arena.NewSlice(8)
	assert.Equal(t, len(slice), 8)
	assert.Equal(t, cap(slice), 8)
	assert.Assert(t, cap(arena.data) >= 16, "next chunk capacity %d did not grow from previous capacity 8", cap(arena.data))
	assert.Equal(t, &arena.data[0], &slice[0], "slice was not carved from the new chunk")
}
