package repo

import (
	"os"
	"path/filepath"
	"runtime"
)

var RootPath string
var TypeScriptSubmodulePath string
var TestDataPath string

func init() {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic("could not get current filename")
	}
	RootPath = findGoMod(filepath.Dir(filename))
	TypeScriptSubmodulePath = filepath.Join(RootPath, "_submodules", "TypeScript")
	TestDataPath = filepath.Join(RootPath, "testdata")
}

func findGoMod(dir string) string {
	root := filepath.VolumeName(dir)
	for dir != root {
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			return dir
		}
		dir = filepath.Dir(dir)
	}
	panic("could not find go.mod")
}
