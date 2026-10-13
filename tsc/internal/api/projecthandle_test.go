package api

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"gotest.tools/v3/assert"
)

func TestProjectHandles(t *testing.T) {
	t.Parallel()

	id := project.ID("/projecthandle_test/tsconfig.json")
	handle := projectHandles.handleFor(id)
	assert.Equal(t, handle, projectHandles.handleFor(id))
	assert.Assert(t, handle != projectHandles.handleFor("/projecthandle_test/other/tsconfig.json"))

	decoded, err := unmarshalPayload(string(MethodGetSourceFileNames), []byte(`{"snapshot":1,"project":"`+handle+`"}`))
	assert.NilError(t, err)
	assert.Equal(t, decoded.(*GetSourceFileNamesParams).Project, id)

	decoded, err = unmarshalPayload(string(MethodGetSourceFileNames), []byte(`{"snapshot":1,"project":"/full/tsconfig.json"}`))
	assert.NilError(t, err)
	assert.Equal(t, decoded.(*GetSourceFileNamesParams).Project, project.ID("/full/tsconfig.json"))

	_, err = unmarshalPayload(string(MethodGetSourceFileNames), []byte(`{"snapshot":1,"project":"#999999999"}`))
	assert.ErrorContains(t, err, "unknown project handle")
}
