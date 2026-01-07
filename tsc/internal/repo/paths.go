package repo

import (
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
)

var rootPath = sync.OnceValue(func() string {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic("could not get current filename")
	}
	filename = filepath.FromSlash(filename) // runtime.Caller always returns forward slashes; https://go.dev/issues/3335, https://go.dev/cl/603275

	if strings.HasPrefix(filename, "github.com/") {
		panic("repo root cannot be found when built with -trimpath")
	}

	if !filepath.IsAbs(filename) {
		panic(filename + " is not an absolute path")
	}

	root := filepath.VolumeName(filename) + string(filepath.Separator)

	dir := filepath.Dir(filename)
	for {
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			return dir
		}
		if dir == root {
			break
		}
		dir = filepath.Dir(dir)
	}

	panic("could not find go.mod above " + filename)
})

func RootPath() string {
	return rootPath()
}

var typeScriptSubmodulePath = sync.OnceValue(func() string {
	return filepath.Join(rootPath(), "_submodules", "TypeScript")
})

func TypeScriptSubmodulePath() string {
	return typeScriptSubmodulePath()
}

var testDataPath = sync.OnceValue(func() string {
	return filepath.Join(rootPath(), "testdata")
})

func TestDataPath() string {
	return testDataPath()
}

var typeScriptSubmoduleExists = sync.OnceValue(func() bool {
	p := filepath.Join(typeScriptSubmodulePath(), "package.json")
	if _, err := os.Stat(p); err != nil {
		if os.IsNotExist(err) {
			return false
		}
		panic(err)
	}
	return true
})

func TypeScriptSubmoduleExists() bool {
	return typeScriptSubmoduleExists()
}

type SkippableTest interface {
	Helper()
	Skipf(format string, args ...any)
}

func SkipIfNoTypeScriptSubmodule(t SkippableTest) {
	t.Helper()
	if !typeScriptSubmoduleExists() {
		t.Skipf("TypeScript submodule does not exist")
	}
}
