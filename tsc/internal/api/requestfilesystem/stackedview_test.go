package requestfilesystem

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// hostFileSource stands in for a snapshot with no cached files or editor overlays.
type hostFileSource struct {
	fs vfs.FS
}

func (s hostFileSource) GetFile(fileName string) project.FileHandle {
	if content, ok := s.fs.ReadFile(fileName); ok {
		return project.NewFileHandle(fileName, content)
	}
	return nil
}

func (s hostFileSource) GetFileByPath(fileName string, _ tspath.Path) project.FileHandle {
	return s.GetFile(fileName)
}

func (s hostFileSource) FileExists(fileName string, _ tspath.Path) bool {
	return s.fs.FileExists(fileName)
}

func (s hostFileSource) DirectoryExists(path string) bool {
	return s.fs.DirectoryExists(path)
}

func (s hostFileSource) GetAccessibleEntries(path string) vfs.Entries {
	return s.fs.GetAccessibleEntries(path)
}

func (s hostFileSource) Realpath(path string) string { return s.fs.Realpath(path) }

func (s hostFileSource) UseCaseSensitiveFileNames() bool { return s.fs.UseCaseSensitiveFileNames() }

// baseFileSource builds the view a base snapshot would present: the given request
// filesystem layer, if any, stacked over host contents.
func baseFileSource(layer *requestFileSystem, host vfs.FS) project.FileSource {
	source := project.FileSource(hostFileSource{fs: host})
	if layer == nil {
		return source
	}
	return layer.Stack(source)
}

// A request filesystem has no standalone behavior: it answers questions only in terms
// of the layers it is stacked over. These tests therefore observe one the way a
// snapshot does, through the project.FileSource that Stack produces, with the host
// standing in for the layers below. Reads that fall past the request layer then reach
// the host directly, which is the arrangement these tests were written against.
//
// Stat and WalkDir have no equivalent here because FileSource deliberately omits
// them; tests that used them assert existence and enumeration instead.
type stackedView struct {
	*requestFileSystem
	host   vfs.FS
	source project.FileSource
}

func stackOverHost(layer *requestFileSystem, host vfs.FS) *stackedView {
	return &stackedView{
		requestFileSystem: layer,
		host:              host,
		source:            baseFileSource(layer, host),
	}
}

func (v *stackedView) toTestPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, v.currentDirectory, v.host.UseCaseSensitiveFileNames())
}

func (v *stackedView) ReadFile(fileName string) (string, bool) {
	file := v.source.GetFileByPath(fileName, v.toTestPath(fileName))
	if file == nil {
		return "", false
	}
	return file.Content(), true
}

func (v *stackedView) FileExists(fileName string) bool {
	return v.source.FileExists(fileName, v.toTestPath(fileName))
}

func (v *stackedView) DirectoryExists(directoryName string) bool {
	return v.source.DirectoryExists(directoryName)
}

func (v *stackedView) GetAccessibleEntries(directoryName string) vfs.Entries {
	return v.source.GetAccessibleEntries(directoryName)
}

func (v *stackedView) Realpath(path string) string {
	return v.source.Realpath(path)
}

// walkEntries lists root and everything beneath it, depth first, the way WalkDir used
// to. Enumeration is the only traversal a snapshot has, so it is what these tests use
// to check that a directory's whole subtree is reachable.
func walkEntries(view *stackedView, root string) []string {
	visited := []string{root}
	entries := view.GetAccessibleEntries(root)
	names := append(slices.Clone(entries.Files), entries.Directories...)
	slices.Sort(names)
	for _, name := range names {
		child := tspath.CombinePaths(root, name)
		if slices.Contains(entries.Directories, name) {
			visited = append(visited, walkEntries(view, child)...)
		} else {
			visited = append(visited, child)
		}
	}
	return visited
}
