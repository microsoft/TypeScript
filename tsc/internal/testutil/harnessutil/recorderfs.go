package harnessutil

import (
	"slices"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type OutputRecorderFS struct {
	vfs.FS
	outputsMut sync.Mutex
	outputsMap map[string]int
	outputs    []*TestFile
}

func NewOutputRecorderFS(fs vfs.FS) vfs.FS {
	return &OutputRecorderFS{FS: fs}
}

func (fs *OutputRecorderFS) WriteFile(path tspath.RootedFilePath, data string) error {
	if err := fs.FS.WriteFile(path, data); err != nil {
		return err
	}
	realPath := fs.Realpath(path.AsPath())
	pathString := realPath.AsString()
	fs.outputsMut.Lock()
	defer fs.outputsMut.Unlock()
	if index, ok := fs.outputsMap[pathString]; ok {
		fs.outputs[index] = &TestFile{UnitName: pathString, Content: data}
	} else {
		index := len(fs.outputs)
		if fs.outputsMap == nil {
			fs.outputsMap = make(map[string]int)
		}
		fs.outputsMap[pathString] = index
		fs.outputs = append(fs.outputs, &TestFile{UnitName: pathString, Content: data})
	}
	return nil
}

func (fs *OutputRecorderFS) Outputs() []*TestFile {
	fs.outputsMut.Lock()
	defer fs.outputsMut.Unlock()
	return slices.Clone(fs.outputs)
}
