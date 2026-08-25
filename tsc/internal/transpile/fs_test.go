package transpile

import (
	"testing"
)

func TestTranspileFSDirectoryExists(t *testing.T) {
	t.Parallel()

	fs := &transpileFS{files: map[string]string{"/src/module.ts": ""}}
	if fs.DirectoryExists("/src/module.ts") {
		t.Fatal("file reported as directory")
	}
	if !fs.DirectoryExists("/src") {
		t.Fatal("containing directory not found")
	}
}
