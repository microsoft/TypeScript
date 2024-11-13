package packagejson_test

import (
	"encoding/json"
	"testing"

	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"gotest.tools/v3/assert"
)

func TestExpected(t *testing.T) {
	t.Parallel()

	type packageJson struct {
		Name    packagejson.Expected[string] `json:"name"`
		Version packagejson.Expected[string] `json:"version"`
		Exports packagejson.Expected[any]    `json:"exports"`
		Main    packagejson.Expected[string] `json:"main"`
	}

	var p packageJson

	jsonString := `{
		"name": "test",
		"version": 2,
		"exports": null
	}`

	err := json.Unmarshal([]byte(jsonString), &p)
	assert.NilError(t, err)

	assert.Equal(t, p.Name.Valid, true)
	assert.Equal(t, p.Name.Value, "test")

	assert.Equal(t, p.Version.Valid, false)
	assert.Equal(t, p.Version.Value, "")

	assert.Assert(t, p.Exports.Null)
	assert.Equal(t, p.Exports.Valid, false)

	assert.Equal(t, p.Main.Valid, false)
	assert.Equal(t, p.Main.Null, false)
	assert.Equal(t, p.Main.Value, "")
}
