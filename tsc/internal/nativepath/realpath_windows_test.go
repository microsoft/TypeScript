package nativepath

import (
	"os"
	"path/filepath"
	"testing"

	"gotest.tools/v3/assert"
)

func TestRealpathReservedDeviceName(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()
	dir := filepath.Join(tmp, "con")
	file := filepath.Join(dir, "foo.d.ts")
	extendedDir := `\\?\` + dir

	assert.NilError(t, os.Mkdir(extendedDir, 0o777))
	t.Cleanup(func() {
		assert.NilError(t, os.RemoveAll(extendedDir))
	})
	assert.NilError(t, os.WriteFile(`\\?\`+file, nil, 0o666))

	for _, path := range []string{dir, file} {
		got, err := Realpath(path)
		assert.NilError(t, err)
		assert.Equal(t, got, path)
	}
}

func TestHasReservedPathComponent(t *testing.T) {
	t.Parallel()

	tests := []struct {
		path string
		want bool
	}{
		{path: `C:\src\con\foo.d.ts`, want: true},
		{path: `C:\src\CON\foo.d.ts`, want: true},
		{path: `C:\src\com1\foo.d.ts`, want: true},
		{path: `C:\src\LPT²\foo.d.ts`, want: true},
		{path: `C:\src\conout$\foo.d.ts`, want: true},
		{path: `C:\src\content\foo.d.ts`, want: false},
		{path: `C:\src\com10\foo.d.ts`, want: false},
	}

	for _, test := range tests {
		assert.Equal(t, hasReservedPathComponent(test.path), test.want)
	}

	for _, path := range []string{`C:\src\con\foo.d.ts`, `C:\src\content\foo.d.ts`} {
		allocs := testing.AllocsPerRun(100, func() {
			hasReservedPathComponent(path)
		})
		assert.Equal(t, allocs, float64(0))
	}
}
