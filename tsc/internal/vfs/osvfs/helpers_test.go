package osvfs

import (
	"os"
	"os/exec"
	"runtime"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

func mklink(tb testing.TB, target, link string, isDir bool) {
	tb.Helper()

	if runtime.GOOS == "windows" && isDir {
		// Don't use os.Symlink on Windows, as it creates a "real" symlink, not a junction.
		assert.NilError(tb, exec.Command("cmd", "/c", "mklink", "/J", link, target).Run())
	} else {
		err := os.Symlink(target, link)
		if err != nil && !isDir && runtime.GOOS == "windows" && strings.Contains(err.Error(), "A required privilege is not held by the client") {
			tb.Log(err)
			tb.Skip("file symlink support is not enabled without elevation or developer mode")
		}
		assert.NilError(tb, err)
	}
}
