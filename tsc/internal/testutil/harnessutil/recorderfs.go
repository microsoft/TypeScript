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
	outputsMap map[tspath.RootedFilePath]int
	outputs    []recordedOutput
}

type recordedOutput struct {
	path tspath.RootedFilePath
	file *TestFile
}

func NewOutputRecorderFS(fs vfs.FS) vfs.FS {
	return &OutputRecorderFS{FS: fs}
}

func (fs *OutputRecorderFS) WriteFile(path tspath.RootedFilePath, data string) error {
	if err := fs.FS.WriteFile(path, data); err != nil {
		return err
	}
	realPath := tspath.RootedFilePathFromPath(fs.Realpath(path.AsPath()))
	fs.outputsMut.Lock()
	defer fs.outputsMut.Unlock()
	file := &TestFile{UnitName: realPath.AsString(), Content: data}
	if index, ok := fs.outputsMap[realPath]; ok {
		fs.outputs[index] = recordedOutput{path: realPath, file: file}
	} else {
		index := len(fs.outputs)
		if fs.outputsMap == nil {
			fs.outputsMap = make(map[tspath.RootedFilePath]int)
		}
		fs.outputsMap[realPath] = index
		fs.outputs = append(fs.outputs, recordedOutput{path: realPath, file: file})
	}
	return nil
}

func (fs *OutputRecorderFS) recordedOutputs() []recordedOutput {
	fs.outputsMut.Lock()
	defer fs.outputsMut.Unlock()
	return slices.Clone(fs.outputs)
}
