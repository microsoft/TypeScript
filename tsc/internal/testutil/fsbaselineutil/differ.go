package fsbaselineutil

import (
	"fmt"
	"io"
	"io/fs"
	"maps"
	"slices"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type DiffEntry struct {
	Content       string
	MTime         time.Time
	IsWritten     bool
	SymlinkTarget string
}

type Snapshot struct {
	Snap        map[string]*DiffEntry
	DefaultLibs *collections.SyncSet[string]
}

type FSDiffer struct {
	FS           iovfs.FsWithSys
	DefaultLibs  func() *collections.SyncSet[string]
	WrittenFiles *collections.SyncSet[string]

	serializedDiff *Snapshot
}

func (d *FSDiffer) MapFs() *vfstest.MapFS {
	return d.FS.FSys().(*vfstest.MapFS)
}

func (d *FSDiffer) SerializedDiff() *Snapshot {
	return d.serializedDiff
}

func (d *FSDiffer) BaselineFSwithDiff(baseline io.Writer) {
	// todo: baselines the entire fs, possibly doesn't correctly diff all cases of emitted files, since emit isn't fully implemented and doesn't always emit the same way as strada
	snap := map[string]*DiffEntry{}

	diffs := map[string]string{}

	for path, file := range d.MapFs().Entries() {
		if file.Mode&fs.ModeSymlink != 0 {
			target, ok := d.MapFs().GetTargetOfSymlink(path)
			if !ok {
				panic("Failed to resolve symlink target: " + path)
			}
			newEntry := &DiffEntry{SymlinkTarget: target}
			snap[path] = newEntry
			d.addFsEntryDiff(diffs, newEntry, path)
			continue
		} else if file.Mode.IsRegular() {
			newEntry := &DiffEntry{Content: string(file.Data), MTime: file.ModTime, IsWritten: d.WrittenFiles.Has(path)}
			snap[path] = newEntry
			d.addFsEntryDiff(diffs, newEntry, path)
		}
	}
	if d.serializedDiff != nil {
		for path := range d.serializedDiff.Snap {
			if fileInfo := d.MapFs().GetFileInfo(path); fileInfo == nil {
				// report deleted
				d.addFsEntryDiff(diffs, nil, path)
			}
		}
	}
	var defaultLibs collections.SyncSet[string]
	if d.DefaultLibs != nil && d.DefaultLibs() != nil {
		d.DefaultLibs().Range(func(libPath string) bool {
			defaultLibs.Add(libPath)
			return true
		})
	}
	d.serializedDiff = &Snapshot{
		Snap:        snap,
		DefaultLibs: &defaultLibs,
	}
	diffKeys := slices.Collect(maps.Keys(diffs))
	slices.Sort(diffKeys)
	for _, path := range diffKeys {
		fmt.Fprint(baseline, "//// ["+path+"] ", diffs[path], "\n")
	}
	fmt.Fprintln(baseline)
	*d.WrittenFiles = collections.SyncSet[string]{} // Reset written files after baseline
}

func (d *FSDiffer) addFsEntryDiff(diffs map[string]string, newDirContent *DiffEntry, path string) {
	var oldDirContent *DiffEntry
	var defaultLibs *collections.SyncSet[string]
	if d.serializedDiff != nil {
		oldDirContent = d.serializedDiff.Snap[path]
		defaultLibs = d.serializedDiff.DefaultLibs
	}
	// todo handle more cases of fs changes
	if oldDirContent == nil {
		if d.DefaultLibs == nil || d.DefaultLibs() == nil || !d.DefaultLibs().Has(path) {
			if newDirContent.SymlinkTarget != "" {
				diffs[path] = "-> " + newDirContent.SymlinkTarget + " *new*"
			} else {
				diffs[path] = "*new* \n" + newDirContent.Content
			}
		}
	} else if newDirContent == nil {
		diffs[path] = "*deleted*"
	} else if newDirContent.Content != oldDirContent.Content {
		diffs[path] = "*modified* \n" + newDirContent.Content
	} else if newDirContent.IsWritten {
		diffs[path] = "*rewrite with same content*"
	} else if newDirContent.MTime != oldDirContent.MTime {
		diffs[path] = "*mTime changed*"
	} else if defaultLibs != nil && defaultLibs.Has(path) && d.DefaultLibs != nil && d.DefaultLibs() != nil && !d.DefaultLibs().Has(path) {
		// Lib file that was read
		diffs[path] = "*Lib*\n" + newDirContent.Content
	}
}
