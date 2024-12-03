package vfstest

import (
	"fmt"
	"io/fs"
	"path"
	"strings"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type mapFS struct {
	m                         fstest.MapFS
	useCaseSensitiveFileNames bool
}

type sys struct {
	original any
	realpath string
}

// FromTestMapFS creates a new [vfs.FS] from a [fstest.MapFS]. The provided FS will be augmented
// to properly handle case-insensitive queries.
//
// For paths like `c:/foo/bar`, fsys will be used as though it's rooted at `/` and the path is `/c:/foo/bar`.
func FromMapFS(m fstest.MapFS, useCaseSensitiveFileNames bool) vfs.FS {
	return vfs.FromIOFS(convertMapFS(m, useCaseSensitiveFileNames), useCaseSensitiveFileNames)
}

func convertMapFS(m fstest.MapFS, useCaseSensitiveFileNames bool) *mapFS {
	// Create all missing intermediate directories so we can attach the realpath to each of them.
	// fstest.MapFS doesn't require this as it synthesizes directories on the fly, but it's a lot
	// harder to reapply a realpath onto those when we're deep in some FileInfo method.
	newM := make(fstest.MapFS)
	for p, f := range m {
		newM[p] = f

		curr := ""
		remaining := p

		for remaining != "" {
			before, after, _ := strings.Cut(remaining, "/")
			if curr == "" {
				curr = before
			} else {
				curr = curr + "/" + before
			}
			remaining = after

			if _, ok := m[curr]; !ok {
				newM[curr] = &fstest.MapFile{
					Mode: fs.ModeDir | 0555,
				}
			}
		}
	}

	mp := make(fstest.MapFS, len(newM))
	for path, file := range newM {
		canonical := tspath.GetCanonicalFileName(path, useCaseSensitiveFileNames)
		if other, ok := mp[canonical]; ok {
			path2 := other.Sys.(*sys).realpath
			// Ensure consistent panic messages
			path, path2 = min(path, path2), max(path, path2)
			panic(fmt.Sprintf("duplicate path: %q and %q have the same canonical path", path, path2))
		}
		fileCopy := *file
		fileCopy.Sys = &sys{
			original: fileCopy.Sys,
			realpath: path,
		}
		mp[canonical] = &fileCopy
	}
	return &mapFS{
		m:                         mp,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}
}

type fileInfo struct {
	fs.FileInfo
	sys      any
	realpath string
}

func (fi *fileInfo) Name() string {
	return path.Base(fi.realpath)
}

func (fi *fileInfo) Sys() any {
	return fi.sys
}

type file struct {
	fs.File
	fileInfo *fileInfo
}

func (f *file) Stat() (fs.FileInfo, error) {
	return f.fileInfo, nil
}

type dirEntry struct {
	fs.DirEntry
	fileInfo *fileInfo
}

func (e *dirEntry) Name() string {
	return path.Base(e.fileInfo.realpath)
}

func (e *dirEntry) Info() (fs.FileInfo, error) {
	return e.fileInfo, nil
}

type readDirFile struct {
	fs.ReadDirFile
	fileInfo *fileInfo
}

func (f *readDirFile) Stat() (fs.FileInfo, error) {
	return f.fileInfo, nil
}

func (f *readDirFile) ReadDir(n int) ([]fs.DirEntry, error) {
	list, err := f.ReadDirFile.ReadDir(n)
	if err != nil {
		return nil, err
	}

	entries := make([]fs.DirEntry, len(list))
	for i, entry := range list {
		info := must(entry.Info())
		newInfo, ok := convertInfo(info)
		if !ok {
			panic(fmt.Sprintf("unexpected synthesized dir: %q", info.Name()))
		}

		entries[i] = &dirEntry{
			DirEntry: entry,
			fileInfo: newInfo,
		}
	}

	return entries, nil
}

func (m *mapFS) Open(name string) (fs.File, error) {
	f, err := m.m.Open(tspath.GetCanonicalFileName(name, m.useCaseSensitiveFileNames))
	if err != nil {
		return nil, err
	}

	info := must(f.Stat())

	newInfo, ok := convertInfo(info)
	if !ok {
		// This is a synthesized dir.
		if name != "." {
			panic(fmt.Sprintf("unexpected synthesized dir: %q", name))
		}

		return &readDirFile{
			ReadDirFile: f.(fs.ReadDirFile),
			fileInfo: &fileInfo{
				FileInfo: info,
				sys:      info.Sys(),
				realpath: ".",
			},
		}, nil
	}

	if f, ok := f.(fs.ReadDirFile); ok {
		return &readDirFile{
			ReadDirFile: f,
			fileInfo:    newInfo,
		}, nil
	}

	return &file{
		File:     f,
		fileInfo: newInfo,
	}, nil
}

func (m *mapFS) Realpath(name string) (string, error) {
	// TODO: handle symlinks after https://go.dev/cl/385534 is available
	// Don't bother going through fs.Stat.
	canonical := tspath.GetCanonicalFileName(name, m.useCaseSensitiveFileNames)
	file, ok := m.m[canonical]
	if !ok {
		return "", fs.ErrNotExist
	}
	return file.Sys.(*sys).realpath, nil
}

func convertInfo(info fs.FileInfo) (*fileInfo, bool) {
	sys, ok := info.Sys().(*sys)
	if !ok {
		return nil, false
	}
	return &fileInfo{
		FileInfo: info,
		sys:      sys.original,
		realpath: sys.realpath,
	}, true
}

func must[T any](v T, err error) T {
	if err != nil {
		panic(err)
	}
	return v
}
