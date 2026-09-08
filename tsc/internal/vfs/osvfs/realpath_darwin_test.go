package osvfs

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"gotest.tools/v3/assert"
)

func TestRealpathWithParent(t *testing.T) {
	t.Parallel()
	dir := t.TempDir()
	assert.NilError(t, os.Mkdir(dir+"/target", 0o755))
	assert.NilError(t, os.Symlink(dir+"/target", dir+"/link"))
	assert.NilError(t, os.WriteFile(dir+"/target/file.ts", nil, 0o600))
	assert.NilError(t, os.Symlink("file.ts", dir+"/target/symlink.ts"))
	assert.NilError(t, os.Symlink("absent.ts", dir+"/target/dangling.ts"))
	assert.NilError(t, os.Symlink("cycle.ts", dir+"/target/cycle.ts"))
	assert.NilError(t, os.Mkdir(dir+"/target/denied", 0o755))
	assert.NilError(t, os.WriteFile(dir+"/target/denied/file.ts", nil, 0o600))
	assert.NilError(t, os.Chmod(dir+"/target/denied", 0))
	defer os.Chmod(dir+"/target/denied", 0o755)

	fs := FS()
	for _, suffix := range []string{
		"", "/", "/../target/file.ts", "/file.ts", "/symlink.ts", "/dangling.ts", "/cycle.ts",
		"/absent.ts", "/absent/file.ts", "/file.ts/child.ts", "/denied/file.ts",
	} {
		name := dir + "/link" + suffix
		want := fs.Realpath(name)
		for _, filesystem := range []vfs.FS{fs, cachedvfs.From(fs), bundled.WrapFS(fs)} {
			got := vfs.RealpathWithParent(filesystem, name, filesystem.Realpath)
			assert.Equal(t, got, want, "requested %s", name)
		}
	}
	for _, pair := range [][2]string{
		{"s", "\u017f"}, {"SS", "\u00df"}, {"i\u0307", "\u0130"},
		{"ff", "\ufb00"}, {"\u00e9", "e\u0301"},
	} {
		assert.NilError(t, os.Symlink("file.ts", dir+"/target/"+pair[0]))
		name := dir + "/link/" + pair[1]
		// On a sensitive volume, this is an absent path instead of an alias.
		assert.Equal(t, vfs.RealpathWithParent(fs, name, fs.Realpath), fs.Realpath(name))
	}
}

func TestRealpathWithParentRetainsOriginalMissingName(t *testing.T) {
	t.Parallel()
	dir := t.TempDir()
	assert.NilError(t, os.Mkdir(dir+"/target", 0o755))
	assert.NilError(t, os.Symlink(dir+"/target", dir+"/link"))
	fs := FS()
	name := filepath.ToSlash(dir + "/link/missing.ts")
	got := vfs.RealpathWithParent(fs, name, func(string) string {
		t.Fatal("a failed leaf lookup must not resolve or substitute the parent")
		return ""
	})
	assert.Equal(t, got, name)
}
