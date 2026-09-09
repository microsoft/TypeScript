package vfsmock

import "github.com/microsoft/TypeScript/tsc/internal/vfs"

// Wrap wraps a vfs.FS and returns a FSMock which calls it.
func Wrap(fs vfs.FS) *FSMock {
	return &FSMock{
		DirectoryExistsFunc:      fs.DirectoryExists,
		FileExistsFunc:           fs.FileExists,
		GetAccessibleEntriesFunc: fs.GetAccessibleEntries,
		ReadFileFunc:             fs.ReadFile,
		RealpathFunc:             fs.Realpath,
		RemoveFunc:               fs.Remove,
		ChtimesFunc:              fs.Chtimes,
		StatFunc:                 fs.Stat,
		CaseSensitivityFunc:      fs.CaseSensitivity,
		WalkDirFunc:              fs.WalkDir,
		WriteFileFunc:            fs.WriteFile,
		AppendFileFunc:           fs.AppendFile,
	}
}
