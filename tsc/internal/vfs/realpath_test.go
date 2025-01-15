package vfs

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
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

	if runtime.GOOS == "windows" {
		// Don't use os.Symlink on Windows, as it creates a "real" symlink, not a junction.
		assert.NilError(t, exec.Command("cmd", "/c", "mklink", "/J", link, target).Run())
	} else {
		assert.NilError(t, os.Symlink(target, link))
	}

	gotContents, err := os.ReadFile(linkFile)
	assert.NilError(t, err)
	assert.Equal(t, string(gotContents), expectedContents)

	fs := FromOS()

	targetRealpath := fs.Realpath(tspath.NormalizePath(targetFile))
	linkRealpath := fs.Realpath(tspath.NormalizePath(linkFile))

	if !assert.Check(t, cmp.Equal(targetRealpath, linkRealpath)) {
		cmd := exec.Command("node", "-e", `console.log({ native: fs.realpathSync.native(process.argv[1]), node: fs.realpathSync(process.argv[1]) })`, linkFile)
		out, err := cmd.CombinedOutput()
		assert.NilError(t, err)
		t.Logf("node: %s", out)
	}
}
