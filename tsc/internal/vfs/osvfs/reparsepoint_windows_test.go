package osvfs

import (
	"os"
	"os/exec"
	"path/filepath"
	"testing"

	"gotest.tools/v3/assert"
)

func TestIsReparsePoint(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()

	t.Run("regular file", func(t *testing.T) {
		t.Parallel()
		file := filepath.Join(tmp, "regular.txt")
		assert.NilError(t, os.WriteFile(file, []byte("hello"), 0o666))
		assert.Equal(t, isReparsePoint(file), false)
	})

	t.Run("regular directory", func(t *testing.T) {
		t.Parallel()
		dir := filepath.Join(tmp, "regular-dir")
		assert.NilError(t, os.MkdirAll(dir, 0o777))
		assert.Equal(t, isReparsePoint(dir), false)
	})

	t.Run("junction point", func(t *testing.T) {
		t.Parallel()
		target := filepath.Join(tmp, "junction-target")
		link := filepath.Join(tmp, "junction-link")
		assert.NilError(t, os.MkdirAll(target, 0o777))
		mklink(t, target, link, true)
		assert.Equal(t, isReparsePoint(link), true)
	})

	t.Run("file symlink", func(t *testing.T) {
		t.Parallel()
		target := filepath.Join(tmp, "symlink-target.txt")
		link := filepath.Join(tmp, "symlink-link.txt")
		assert.NilError(t, os.WriteFile(target, []byte("hello"), 0o666))
		mklink(t, target, link, false)
		assert.Equal(t, isReparsePoint(link), true)
	})

	t.Run("directory symlink", func(t *testing.T) {
		t.Parallel()
		target := filepath.Join(tmp, "dir-symlink-target")
		link := filepath.Join(tmp, "dir-symlink-link")
		assert.NilError(t, os.MkdirAll(target, 0o777))
		mklink(t, target, link, false)
		assert.Equal(t, isReparsePoint(link), true)
	})

	t.Run("nonexistent path", func(t *testing.T) {
		t.Parallel()
		nonexistent := filepath.Join(tmp, "does-not-exist")
		assert.Equal(t, isReparsePoint(nonexistent), false)
	})

	t.Run("empty path", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, isReparsePoint(""), false)
	})

	t.Run("invalid path with null byte", func(t *testing.T) {
		t.Parallel()
		assert.Equal(t, isReparsePoint("invalid\x00path"), false)
	})
}

func TestIsReparsePointLongPath(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()

	// Create a deeply nested path that exceeds 248 characters
	longPathBase := tmp
	pathComponent := "very_long_directory_name_to_exceed_max_path_limit_abcdefghijklmnopqrstuvwxyz"

	for len(longPathBase) < 250 {
		longPathBase = filepath.Join(longPathBase, pathComponent)
	}

	target := filepath.Join(longPathBase, "target")
	link := filepath.Join(longPathBase, "link")

	// Use \\?\ prefix to enable long path support for mklink
	longTarget := `\\?\` + target
	longLink := `\\?\` + link

	assert.NilError(t, os.MkdirAll(longTarget, 0o777))
	assert.NilError(t, exec.Command("cmd", "/c", "mklink", "/J", longLink, longTarget).Run())

	// With long path support enabled, this should work even for paths >= 248 chars
	assert.Equal(t, isReparsePoint(link), true)
}

func TestIsReparsePointNestedInSymlink(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()

	// Create a structure: target/inner-target, link -> target, then check link/inner-link
	target := filepath.Join(tmp, "target")
	innerTarget := filepath.Join(target, "inner-target")
	assert.NilError(t, os.MkdirAll(innerTarget, 0o777))

	link := filepath.Join(tmp, "link")
	mklink(t, target, link, true)

	// Create a junction inside the target
	innerLink := filepath.Join(target, "inner-link")
	mklink(t, innerTarget, innerLink, true)

	// Check the junction through the symlink path
	nestedPath := filepath.Join(link, "inner-link")
	assert.Equal(t, isReparsePoint(nestedPath), true)
}

func TestIsReparsePointRelativePath(t *testing.T) { //nolint:paralleltest // Cannot use t.Parallel() with t.Chdir()
	tmp := t.TempDir()
	t.Chdir(tmp)

	target := "target-rel"
	link := "link-rel"
	assert.NilError(t, os.MkdirAll(target, 0o777))
	mklink(t, target, link, true)

	assert.Equal(t, isReparsePoint(link), true)
	assert.Equal(t, isReparsePoint(target), false)
}

func BenchmarkIsSymlinkOrJunction(b *testing.B) {
	tmp := b.TempDir()

	regularFile := filepath.Join(tmp, "regular.txt")
	assert.NilError(b, os.WriteFile(regularFile, []byte("hello"), 0o666))

	target := filepath.Join(tmp, "target")
	link := filepath.Join(tmp, "link")
	assert.NilError(b, os.MkdirAll(target, 0o777))
	assert.NilError(b, exec.Command("cmd", "/c", "mklink", "/J", link, target).Run())

	b.Run("regular file", func(b *testing.B) {
		b.ReportAllocs()
		for b.Loop() {
			isReparsePoint(regularFile)
		}
	})

	b.Run("junction", func(b *testing.B) {
		b.ReportAllocs()
		for b.Loop() {
			isReparsePoint(link)
		}
	})

	b.Run("nonexistent", func(b *testing.B) {
		b.ReportAllocs()
		nonexistent := filepath.Join(tmp, "does-not-exist")
		for b.Loop() {
			isReparsePoint(nonexistent)
		}
	})
}
