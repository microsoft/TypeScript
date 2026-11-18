package vfsmock

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWrap(t *testing.T) {
	t.Parallel()

	wrapper := Wrap(vfstest.FromMap(map[string]string{}, tspath.CaseSensitive))

	wrapperValue := reflect.ValueOf(wrapper).Elem()
	wrapperType := wrapperValue.Type()

	for i := range wrapperType.NumField() {
		field := wrapperType.Field(i)
		if field.IsExported() {
			fieldValue := wrapperValue.Field(i)
			assert.Assert(t, !fieldValue.IsZero(), "field %s should not be zero; update Wrap", field.Name)
		}
	}
}
