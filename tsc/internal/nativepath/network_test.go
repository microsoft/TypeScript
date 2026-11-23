package nativepath

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestIsNetworkPath(t *testing.T) {
	t.Parallel()
	for _, path := range []string{
		"//server",
		"//server/share/file.ts",
		"\\\\server\\share\\file.ts",
		"/\\server/share",
		"\\/server/share",
		"//?/UNC/server/share",
		"\\\\?\\UNC\\server\\share",
		"//./UNC/server/share",
		"\\\\.\\GLOBALROOT\\Device\\Mup\\server\\share",
		"\\\\?\\c:\\file.ts",
		"\\\\wsl$\\Ubuntu\\home",
		"//wsl.localhost/Ubuntu/home",
		"/??",
		"/??/UNC/server/share",
		"\\??\\UNC\\server\\share",
		"\\??\\GLOBALROOT\\Device\\Mup\\server\\share",
	} {
		assert.Assert(t, IsNetworkPath(path), path)
	}
	for _, path := range []string{
		"",
		"/",
		"\\",
		"a",
		"a//b",
		"./a",
		"../a",
		"/a",
		"/a//b",
		"/?",
		"/???",
		"/??a",
		"/a/??/b",
		"c:",
		"c:/",
		"c:\\file.ts",
		"c:file.ts",
		"file:///c:/file.ts",
		"file://server/share",
		"^/untitled/ts-nul-authority/Untitled-1",
		"bundled:///libs/lib.d.ts",
	} {
		assert.Assert(t, !IsNetworkPath(path), path)
	}
}
