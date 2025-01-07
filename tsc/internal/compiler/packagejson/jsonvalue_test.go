package packagejson_test

import (
	"encoding/json"
	"testing"

	json2 "github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/compiler/packagejson"
	"gotest.tools/v3/assert"
)

func TestJSONValue(t *testing.T) {
	t.Parallel()

	t.Run("UnmarshalJSON", func(t *testing.T) {
		t.Parallel()
		testJSONValue(t, json.Unmarshal)
	})
	t.Run("UnmarshalJSONV2", func(t *testing.T) {
		t.Parallel()
		testJSONValue(t, func(in []byte, out any) error { return json2.Unmarshal(in, out) })
	})
}

func testJSONValue(t *testing.T, unmarshal func([]byte, any) error) {
	type packageJson struct {
		Private    packagejson.JSONValue `json:"private"`
		False      packagejson.JSONValue `json:"false"`
		Name       packagejson.JSONValue `json:"name"`
		Version    packagejson.JSONValue `json:"version"`
		Exports    packagejson.JSONValue `json:"exports"`
		Imports    packagejson.JSONValue `json:"imports"`
		NotPresent packagejson.JSONValue `json:"notPresent"`
	}

	var p packageJson

	jsonString := `{
		"private": true,
		"false": false,
		"name": "test",
		"version": 2,
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
		},
		"imports": null
	}`

	err := unmarshal([]byte(jsonString), &p)
	assert.NilError(t, err)

	assert.Equal(t, p.Private.Type, packagejson.JSONValueTypeBoolean)
	assert.Equal(t, p.Private.Value, true)

	assert.Equal(t, p.Name.Type, packagejson.JSONValueTypeString)
	assert.Equal(t, p.Name.Value, "test")

	assert.Equal(t, p.Version.Type, packagejson.JSONValueTypeNumber)
	assert.Equal(t, p.Version.Value, float64(2))

	assert.Equal(t, p.Exports.Type, packagejson.JSONValueTypeObject)
	assert.Equal(t, p.Exports.AsObject().Size(), 3)
	assert.Equal(t, p.Exports.AsObject().GetOrZero(".").Type, packagejson.JSONValueTypeObject)
	assert.Equal(t, p.Exports.AsObject().GetOrZero(".").AsObject().GetOrZero("import").Value, "./test.ts")

	assert.Equal(t, p.Exports.AsObject().GetOrZero("./test").Type, packagejson.JSONValueTypeArray)
	assert.Equal(t, len(p.Exports.AsObject().GetOrZero("./test").AsArray()), 3)
	assert.Equal(t, p.Exports.AsObject().GetOrZero("./test").AsArray()[0].Value, "./test1.ts")
	assert.Equal(t, p.Exports.AsObject().GetOrZero("./test").AsArray()[1].Value, "./test2.ts")
	assert.Equal(t, p.Exports.AsObject().GetOrZero("./test").AsArray()[2].Type, packagejson.JSONValueTypeNull)

	assert.Equal(t, p.Exports.AsObject().GetOrZero("./null").Type, packagejson.JSONValueTypeNull)

	assert.Equal(t, p.Imports.Type, packagejson.JSONValueTypeNull)
	assert.Equal(t, p.Imports.Value, nil)

	assert.Equal(t, p.NotPresent.Type, packagejson.JSONValueTypeNotPresent)
	assert.Equal(t, p.NotPresent.Value, nil)
}
