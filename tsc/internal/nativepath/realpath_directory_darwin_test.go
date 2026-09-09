//go:build darwin

package nativepath

import (
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"testing"

	"gotest.tools/v3/assert"
)

func TestRealpathDirectoryPreservesDiskCasing(t *testing.T) {
	t.Parallel()

	parent := t.TempDir()
	parent, err := filepath.EvalSymlinks(parent)
	assert.NilError(t, err)
	actual := filepath.Join(parent, "MixedCase")
	requested := filepath.Join(parent, "mixedcase")
	assert.NilError(t, os.Mkdir(actual, 0o755))
	if _, statErr := os.Stat(requested); statErr != nil {
		if errors.Is(statErr, fs.ErrNotExist) {
			t.Skip("filesystem is case-sensitive")
		}
		t.Fatal(statErr)
	}

	got, err := RealpathDirectory(requested)
	assert.NilError(t, err)
	assert.Equal(t, got, actual)
}
