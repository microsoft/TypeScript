package harnessutil

import (
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/vfs"
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

func (fs *OutputRecorderFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	if err := fs.FS.WriteFile(path, data, true); err != nil {
		return err
	}
	path = fs.Realpath(path)
	if writeByteOrderMark {
		data = "\uFEFF" + data
	}
	fs.outputsMut.Lock()
	defer fs.outputsMut.Unlock()
	if index, ok := fs.outputsMap[path]; ok {
		fs.outputs[index] = &TestFile{UnitName: path, Content: data}
	} else {
		index := len(fs.outputs)
		if fs.outputsMap == nil {
			fs.outputsMap = make(map[string]int)
		}
		fs.outputsMap[path] = index
		fs.outputs = append(fs.outputs, &TestFile{UnitName: path, Content: data})
	}
	return nil
}

func (fs *OutputRecorderFS) Outputs() []*TestFile {
	fs.outputsMut.Lock()
	defer fs.outputsMut.Unlock()
	return slices.Clone(fs.outputs)
}
