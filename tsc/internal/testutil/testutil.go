package testutil

import (
	"fmt"
	"os"
	"reflect"
	"runtime/debug"
	"strconv"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/testutil/race"
	"gotest.tools/v3/assert"
)

func AssertPanics(tb testing.TB, fn func(), expected any, msgAndArgs ...any) {
	tb.Helper()

	var got any

	func() {
		defer func() {
			got = recover()
		}()
		fn()
	}()

	assert.Assert(tb, got != nil, msgAndArgs...)
	assert.Equal(tb, got, expected, msgAndArgs...)
}

func RecoverAndFail(t *testing.T, msg string) {
	if r := recover(); r != nil {
		stack := debug.Stack()
		t.Fatalf("%s:\n%v\n%s", msg, r, string(stack))
	}
}

var testProgramIsSingleThreaded = sync.OnceValue(func() bool {
	// Leave Program in SingleThreaded mode unless explicitly configured or in race mode.
	if v := os.Getenv("TS_TEST_PROGRAM_SINGLE_THREADED"); v != "" {
		if b, err := strconv.ParseBool(v); err == nil {
			return b
		}
	}
	return !race.Enabled
})

func TestProgramIsSingleThreaded() bool {
	return testProgramIsSingleThreaded()
}

// CheckDataOnly rejects opaque references except within explicitly allowed leaf types.
func CheckDataOnly(root reflect.Type, leaves []reflect.Type) error {
	seen := make(map[reflect.Type]bool)
	for _, leaf := range leaves {
		seen[leaf] = true
	}
	for _, leaf := range []reflect.Type{
		reflect.TypeFor[sync.Mutex](),
		reflect.TypeFor[sync.RWMutex](),
		reflect.TypeFor[sync.Once](),
	} {
		seen[leaf] = true
	}
	var visit func(reflect.Type, string) error
	visit = func(typ reflect.Type, path string) error {
		if seen[typ] {
			return nil
		}
		seen[typ] = true
		switch typ.Kind() {
		case reflect.Func, reflect.Interface, reflect.Chan, reflect.UnsafePointer:
			return fmt.Errorf("%s contains %s; shared data must not retain hosts or opaque payloads", path, typ)
		case reflect.Pointer, reflect.Slice, reflect.Array:
			return visit(typ.Elem(), path+"[]")
		case reflect.Map:
			if err := visit(typ.Key(), path+"[key]"); err != nil {
				return err
			}
			return visit(typ.Elem(), path+"[value]")
		case reflect.Struct:
			for field := range typ.Fields() {
				// SyncMap's zero-length arrays expose K and V for inspection.
				if typ.PkgPath() == "github.com/microsoft/TypeScript/tsc/internal/collections" &&
					strings.HasPrefix(typ.Name(), "SyncMap[") &&
					field.Name == "m" && field.Type == reflect.TypeFor[sync.Map]() {
					continue
				}
				if err := visit(field.Type, path+"."+field.Name); err != nil {
					return err
				}
			}
		}
		return nil
	}
	return visit(root, root.String())
}
