package compiler

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type CompilerHost interface {
	FS() vfs.FS
	GetCurrentDirectory() string
	RunTask(fn func())
	WaitForTasks()
}

type FileInfo struct {
	Name string
	Size int64
}

type compilerHost struct {
	options          *core.CompilerOptions
	singleThreaded   bool
	wg               sync.WaitGroup
	currentDirectory string
	fs               vfs.FS
}

func NewCompilerHost(options *core.CompilerOptions, singleThreaded bool, currentDirectory string, fs vfs.FS) CompilerHost {
	h := &compilerHost{}
	h.options = options
	h.singleThreaded = singleThreaded
	h.currentDirectory = currentDirectory
	h.fs = fs
	return h
}

func (h *compilerHost) FS() vfs.FS {
	return h.fs
}

func (h *compilerHost) GetCurrentDirectory() string {
	return h.currentDirectory
}

func (h *compilerHost) RunTask(task func()) {
	if h.singleThreaded {
		task()
		return
	}
	h.wg.Add(1)
	go func() {
		defer h.wg.Done()
		task()
	}()
}

func (h *compilerHost) WaitForTasks() {
	if h.singleThreaded {
		return
	}
	h.wg.Wait()
}
