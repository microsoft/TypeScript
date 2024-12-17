package repo

import (
	"os"
	"path/filepath"
	"runtime"
	"sync"
)

var (
	RootPath                string
	TypeScriptSubmodulePath string
	TestDataPath            string
)

func init() {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic("could not get current filename")
	}
	filename = filepath.FromSlash(filename) // runtime.Caller always returns forward slashes; https://go.dev/issues/3335, https://go.dev/cl/603275
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

var typeScriptSubmoduleExists = sync.OnceValue(func() bool {
	p := filepath.Join(TypeScriptSubmodulePath, "package.json")
	if _, err := os.Stat(p); err != nil {
		if os.IsNotExist(err) {
			return false
		}
		panic(err)
	}
	return true
})

type skippable interface {
	Helper()
	Skipf(format string, args ...any)
}

func SkipIfNoTypeScriptSubmodule(t skippable) {
	t.Helper()
	if !typeScriptSubmoduleExists() {
		t.Skipf("TypeScript submodule does not exist")
	}
}
