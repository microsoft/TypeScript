package vfsmock

import (
	"reflect"
	"testing"

	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestWrap(t *testing.T) {
	t.Parallel()

	wrapper := Wrap(vfstest.FromMap(map[string]string{}, true))

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
