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

var testDataPath = sync.OnceValue(func() string {
	return filepath.Join(rootPath(), "testdata")
})

func TestDataPath() string {
	return testDataPath()
}
