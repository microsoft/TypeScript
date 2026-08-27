package api

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"gotest.tools/v3/assert"
)

func TestJSONValueToAny(t *testing.T) {
	t.Parallel()

	var value packagejson.JSONValue
	err := json.Unmarshal([]byte(`{"z":1,"a":{"y":2,"x":3},"m":[{"b":4,"a":5},null],"e":[]}`), &value)
	assert.NilError(t, err)

	root := jsonValueToAny(value).(*collections.OrderedMap[string, any])
	assert.DeepEqual(t, slices.Collect(root.Keys()), []string{"z", "a", "m", "e"})
	assert.Equal(t, root.GetOrZero("z"), float64(1))

	nested := root.GetOrZero("a").(*collections.OrderedMap[string, any])
	assert.DeepEqual(t, slices.Collect(nested.Keys()), []string{"y", "x"})

	array := root.GetOrZero("m").([]any)
	arrayObject := array[0].(*collections.OrderedMap[string, any])
	assert.DeepEqual(t, slices.Collect(arrayObject.Keys()), []string{"b", "a"})
	assert.Equal(t, array[1], nil)

	empty := root.GetOrZero("e").([]any)
	assert.Assert(t, empty != nil)
	assert.Equal(t, len(empty), 0)

 
	var edgeValue packagejson.JSONValue
	err = json.Unmarshal([]byte(`{"emptyObj":{},"boolVal":true,"floatVal":3.14}`), &edgeValue)
	assert.NilError(t, err)

	edgeRoot := jsonValueToAny(edgeValue).(*collections.OrderedMap[string, any])
	
 
	emptyObj := edgeRoot.GetOrZero("emptyObj").(*collections.OrderedMap[string, any])
	assert.Equal(t, len(slices.Collect(emptyObj.Keys())), 0)

 
	assert.Equal(t, edgeRoot.GetOrZero("boolVal"), true)
	assert.Equal(t, edgeRoot.GetOrZero("floatVal"), float64(3.14))
}
