package autoimport

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestModuleIDVariants(t *testing.T) {
	t.Parallel()

	var zero ModuleID
	_, ok := zero.AsPathKey()
	assert.Assert(t, !ok)
	assert.Equal(t, zero.AsString(), "")
	assert.Assert(t, !zero.IsAmbient())

	path := tspath.PathKey("/project/src/a.ts")
	file := fileModuleID(path)
	filePath, ok := file.AsPathKey()
	assert.Assert(t, ok)
	assert.Equal(t, filePath, path)
	assert.Equal(t, file.AsString(), string(path))
	assert.Assert(t, !file.IsAmbient())

	ambient := ambientModuleID("node:fs")
	_, ok = ambient.AsPathKey()
	assert.Assert(t, !ok)
	assert.Equal(t, ambient.AsString(), "node:fs")
	assert.Assert(t, ambient.IsAmbient())
}
