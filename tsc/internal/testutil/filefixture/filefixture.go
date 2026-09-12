package filefixture

import (
	"os"
	"sync"
	"testing"
)

type Fixture interface {
	Name() string
	Path() string
	SkipIfNotExist(t testing.TB)
	ReadFile(t testing.TB) string
}

type DefFixture = Fixture /* ref: nonnil */

type fromFile struct {
	name     string
	path     string
	contents func() (string, error) /* ref: nonnil */
}

type defFromFile = *fromFile /* ref: nonnil */

func FromFile(name string, path string) DefFixture {
	return &fromFile{
		name: name,
		path: path,
		// Cache the file contents and errors.
		contents: sync.OnceValues(func() (string, error) {
			b, err := os.ReadFile(path)
			return string(b), err
		}),
	}
}

func (f defFromFile) Name() string { return f.name }
func (f defFromFile) Path() string { return f.path }

func (f defFromFile) SkipIfNotExist(tb testing.TB) {
	tb.Helper()

	if _, err := os.Stat(f.path); err != nil {
		tb.Skipf("Test fixture %q does not exist", f.path)
	}
}

func (f defFromFile) ReadFile(tb testing.TB) string {
	tb.Helper()

	contents, err := f.contents()
	if err != nil {
		tb.Fatalf("Failed to read test fixture %q: %v", f.path, err)
	}
	return contents
}

type fromString struct {
	name     string
	path     string
	contents string
}

type defFromString = *fromString /* ref: nonnil */

func FromString(name string, path string, contents string) DefFixture {
	return &fromString{
		name:     name,
		path:     path,
		contents: contents,
	}
}

func (f defFromString) Name() string { return f.name }
func (f defFromString) Path() string { return f.path }

func (f defFromString) SkipIfNotExist(tb testing.TB) {}

func (f defFromString) ReadFile(tb testing.TB) string { return f.contents }
