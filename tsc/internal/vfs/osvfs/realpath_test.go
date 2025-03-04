package osvfs

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
	"gotest.tools/v3/assert/cmp"
)

func TestSymlinkRealpath(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()

	target := filepath.Join(tmp, "target")
	targetFile := filepath.Join(target, "file")

	link := filepath.Join(tmp, "link")
	linkFile := filepath.Join(link, "file")

	const expectedContents = "hello"

	assert.NilError(t, os.MkdirAll(target, 0o777))
	assert.NilError(t, os.WriteFile(targetFile, []byte(expectedContents), 0o666))

	mklink(t, target, link, true)

	gotContents, err := os.ReadFile(linkFile)
	assert.NilError(t, err)
	assert.Equal(t, string(gotContents), expectedContents)

	fs := FS()

	targetRealpath := fs.Realpath(tspath.NormalizePath(targetFile))
	linkRealpath := fs.Realpath(tspath.NormalizePath(linkFile))

	if !assert.Check(t, cmp.Equal(targetRealpath, linkRealpath)) {
		cmd := exec.Command("node", "-e", `console.log({ native: fs.realpathSync.native(process.argv[1]), node: fs.realpathSync(process.argv[1]) })`, linkFile)
		out, err := cmd.CombinedOutput()
		assert.NilError(t, err)
		t.Logf("node: %s", out)
	}
}

func mklink(t *testing.T, target, link string, isDir bool) {
	t.Helper()

	if runtime.GOOS == "windows" && isDir {
		// Don't use os.Symlink on Windows, as it creates a "real" symlink, not a junction.
		assert.NilError(t, exec.Command("cmd", "/c", "mklink", "/J", link, target).Run())
	} else {
		err := os.Symlink(target, link)
		if err != nil && !isDir && runtime.GOOS == "windows" && strings.Contains(err.Error(), "A required privilege is not held by the client") {
			t.Log(err)
			t.Skip("file symlink support is not enabled without elevation or developer mode")
		}
		assert.NilError(t, err)
	}
}

func TestGetAccessibleEntries(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()
	target := filepath.Join(tmp, "target")
	link := filepath.Join(tmp, "link")

	assert.NilError(t, os.MkdirAll(target, 0o777))
	assert.NilError(t, os.MkdirAll(link, 0o777))

	targetFile1 := filepath.Join(target, "file1")
	targetFile2 := filepath.Join(target, "file2")

	assert.NilError(t, os.WriteFile(targetFile1, []byte("hello"), 0o666))
	assert.NilError(t, os.WriteFile(targetFile2, []byte("world"), 0o666))

	targetDir1 := filepath.Join(target, "dir1")
	targetDir2 := filepath.Join(target, "dir2")

	assert.NilError(t, os.MkdirAll(targetDir1, 0o777))
	assert.NilError(t, os.MkdirAll(targetDir2, 0o777))

	mklink(t, targetFile1, filepath.Join(link, "file1"), false)
	mklink(t, targetFile2, filepath.Join(link, "file2"), false)
	mklink(t, targetDir1, filepath.Join(link, "dir1"), true)
	mklink(t, targetDir2, filepath.Join(link, "dir2"), true)

	fs := FS()

	entries := fs.GetAccessibleEntries(tspath.NormalizePath(link))

	assert.DeepEqual(t, entries.Directories, []string{"dir1", "dir2"})
	assert.DeepEqual(t, entries.Files, []string{"file1", "file2"})
}
