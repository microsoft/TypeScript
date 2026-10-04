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

type fromFile struct {
	name     string
	path     string
	contents func() (string, error)
}

func FromFile(name string, path string) Fixture {
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

func (f *fromFile) Name() string { return f.name }
func (f *fromFile) Path() string { return f.path }

func (f *fromFile) SkipIfNotExist(tb testing.TB) {
	tb.Helper()

	if _, err := os.Stat(f.path); err != nil {
		tb.Skipf("Test fixture %q does not exist", f.path)
	}
}

func (f *fromFile) ReadFile(tb testing.TB) string {
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

func FromString(name string, path string, contents string) Fixture {
	return &fromString{
		name:     name,
		path:     path,
		contents: contents,
	}
}

func (f *fromString) Name() string { return f.name }
func (f *fromString) Path() string { return f.path }

func (f *fromString) SkipIfNotExist(tb testing.TB) {}

func (f *fromString) ReadFile(tb testing.TB) string { return f.contents }
