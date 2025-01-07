package packagejson_test

import (
	"encoding/json"
	"testing"

	json2 "github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"gotest.tools/v3/assert"
)

func TestExports(t *testing.T) {
	t.Parallel()

	t.Run("UnmarshalJSON", func(t *testing.T) {
		t.Parallel()
		testExports(t, json.Unmarshal)
	})
	t.Run("UnmarshalJSONV2", func(t *testing.T) {
		t.Parallel()
		testExports(t, func(in []byte, out any) error { return json2.Unmarshal(in, out) })
	})
}

func testExports(t *testing.T, unmarshal func([]byte, any) error) {
	type Exports struct {
		Exports packagejson.Exports `json:"exports"`
	}

	var e Exports

	jsonString := `{
		"exports": {
			".": {
				"import": "./test.ts",
				"default": "./test.ts"
			},
			"./test": [
				"./test1.ts",
				"./test2.ts",
				null
			],
			"./null": null
		}
	}`

	err := unmarshal([]byte(jsonString), &e)
	assert.NilError(t, err)

	assert.Assert(t, e.Exports.IsSubpaths())
	assert.Equal(t, e.Exports.AsObject().Size(), 3)
	assert.Assert(t, e.Exports.AsObject().GetOrZero(".").IsConditions())
	assert.Assert(t, e.Exports.AsObject().GetOrZero(".").AsObject().GetOrZero("import").Type == packagejson.JSONValueTypeString)
	assert.Equal(t, e.Exports.AsObject().GetOrZero("./test").AsArray()[2].Type, packagejson.JSONValueTypeNull)
	assert.Assert(t, e.Exports.AsObject().GetOrZero("./null").Type == packagejson.JSONValueTypeNull)
}
