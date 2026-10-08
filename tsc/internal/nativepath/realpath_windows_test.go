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
	t.Cleanup(func() { _ = os.RemoveAll(extendedDir) })
	assert.NilError(t, os.WriteFile(`\\?\`+file, nil, 0o666))

	resolvedTempDir, err := Realpath(tmp)
	assert.NilError(t, err)
	resolvedDir := filepath.Join(resolvedTempDir, "con")

	for _, test := range []struct {
		path string
		want string
	}{
		{path: dir, want: resolvedDir},
		{path: file, want: filepath.Join(resolvedDir, "foo.d.ts")},
	} {
		got, err := Realpath(test.path)
		assert.NilError(t, err)
		assert.Equal(t, got, test.want)
	}
}

func TestHasReservedPathComponent(t *testing.T) {
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
