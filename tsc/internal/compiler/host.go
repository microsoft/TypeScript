package compiler

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"sync"
	"unicode/utf16"

	"github.com/microsoft/typescript-go/internal/core"
)

type CompilerHost interface {
	ReadFile(fileName string) (text string, ok bool)
	ReadDirectory(rootPath string, extensions []string) []FileInfo
	AbsFileName(fileName string) string
	RunTask(fn func())
	WaitForTasks()
}

type FileInfo struct {
	Name string
	Size int64
}

type compilerHost struct {
	options        *core.CompilerOptions
	singleThreaded bool
	wg             sync.WaitGroup
	readSema       chan struct{}
}

func NewCompilerHost(options *core.CompilerOptions, singleThreaded bool) CompilerHost {
	h := &compilerHost{}
	h.options = options
	h.singleThreaded = singleThreaded
	h.readSema = make(chan struct{}, 128)
	return h
}

func (h *compilerHost) ReadFile(fileName string) (text string, ok bool) {
	h.readSema <- struct{}{}
	b, err := os.ReadFile(fileName)
	<-h.readSema
	if err != nil {
		return "", false
	}
	var bom [2]byte
	if len(b) >= 2 {
		bom = [2]byte{b[0], b[1]}
		switch bom {
		case [2]byte{0xFF, 0xFE}:
			return decodeUtf16(b[2:], binary.LittleEndian), true
		case [2]byte{0xFE, 0xFF}:
			return decodeUtf16(b[2:], binary.BigEndian), true
		}
	}
	if len(b) >= 3 && b[0] == 0xEF && b[1] == 0xBB && b[2] == 0xBF {
		b = b[3:]
	}
	return string(b), true
}

func decodeUtf16(b []byte, order binary.ByteOrder) string {
	ints := make([]uint16, len(b)/2)
	if err := binary.Read(bytes.NewReader(b), order, &ints); err != nil {
		return ""
	}
	return string(utf16.Decode(ints))
}

func (h *compilerHost) ReadDirectory(rootDir string, extensions []string) []FileInfo {
	var fileInfos []FileInfo
	_ = filepath.Walk(rootDir, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		if !info.IsDir() && slices.ContainsFunc(extensions, func(ext string) bool { return strings.HasSuffix(path, ext) }) {
			fileInfos = append(fileInfos, FileInfo{Name: path, Size: info.Size()})
		}
		return nil
	})
	return fileInfos
}

func (h *compilerHost) AbsFileName(fileName string) string {
	absFileName, err := filepath.Abs(fileName)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	return absFileName
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
