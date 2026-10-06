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
