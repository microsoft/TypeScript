package tsoptions

import (
	"reflect"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
)

func TestParseCompilerOptionNoMissingTristates(t *testing.T) {
	t.Parallel()

	var missingKeys []string
	for _, field := range reflect.VisibleFields(reflect.TypeFor[core.CompilerOptions]()) {
		keyName := field.Name
		// use the JSON key from the tag, if present
		// e.g. `json:"dog[,anythingelse]"` --> dog
		if jsonTag, ok := field.Tag.Lookup("json"); ok {
			keyName = strings.SplitN(jsonTag, ",", 2)[0]
		}

		isTristate := field.Type == reflect.TypeFor[core.Tristate]()
		if isTristate {
			// Set the field on a CompilerOptions to something other than the
			// default (i.e. not TSUnknown), then check whether
			// ParseCompilerOptions does actually update the value for that key.
			testValue := core.TSTrue
			co := core.CompilerOptions{}
			ParseCompilerOptions(keyName, testValue, &co)
			newSetValue := reflect.ValueOf(co).FieldByName(field.Name)
			if !newSetValue.Equal(reflect.ValueOf(testValue)) {
				missingKeys = append(missingKeys, keyName)
			}
		}
	}
	if len(missingKeys) > 0 {
		t.Errorf("The following Tristate keys are missing entries in the ParseCompilerOptions"+
			" switch statement:\n%v", missingKeys)
	}
}
