package execute_test

import (
	"fmt"
	"io"
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type FileMap map[string]string

func newTestSys(fileOrFolderList FileMap, cwd string, args ...string) *testSys {
	if cwd == "" {
		cwd = "/home/src/workspaces/project"
	}
	return &testSys{
		fs:                 bundled.WrapFS(vfstest.FromMap(fileOrFolderList, true /*useCaseSensitiveFileNames*/)),
		defaultLibraryPath: bundled.LibPath(),
		cwd:                cwd,
		files:              slices.Collect(maps.Keys(fileOrFolderList)),
		output:             []string{},
		currentWrite:       &strings.Builder{},
	}
}

type testSys struct {
	// todo: original has write to output as a string[] because the separations are needed for baselining
	output             []string
	currentWrite       *strings.Builder
	serializedDiff     map[string]string
	fs                 vfs.FS
	defaultLibraryPath string
	cwd                string
	files              []string
}

func (s *testSys) FS() vfs.FS {
	return s.fs
}

func (s *testSys) DefaultLibraryPath() string {
	return s.defaultLibraryPath
}

func (s *testSys) GetCurrentDirectory() string {
	return s.cwd
}

func (s *testSys) NewLine() string {
	return "\n"
}

func (s *testSys) Writer() io.Writer {
	return s.currentWrite
}

func (s *testSys) EndWrite() {
	// todo: revisit if improving tsc/build/watch unittest baselines
	s.output = append(s.output, s.currentWrite.String())
	s.currentWrite.Reset()
}

func (s *testSys) serializeState(baseline *strings.Builder) {
	s.baselineOutput(baseline)
	s.baselineFSwithDiff(baseline)
	// todo watch
	// this.serializeWatches(baseline);
	// this.timeoutCallbacks.serialize(baseline);
	// this.immediateCallbacks.serialize(baseline);
	// this.pendingInstalls.serialize(baseline);
	// this.service?.baseline();
}

func (s *testSys) baselineOutput(baseline io.Writer) {
	fmt.Fprint(baseline, "\nOutput::\n")
	if len(s.output) == 0 {
		fmt.Fprint(baseline, "No output\n")
	}
	// todo screen clears
	s.baselineOutputs(baseline, 0, len(s.output))
}

func (s *testSys) baselineFSwithDiff(baseline io.Writer) {
	// todo: baselines the entire fs, possibly doesn't correctly diff all cases of emitted files, since emit isn't fully implemented and doesn't always emit the same way as strada
	snap := map[string]string{}

	err := s.FS().WalkDir(s.GetCurrentDirectory(), func(path string, d vfs.DirEntry, e error) error {
		if !s.FS().FileExists(path) {
			return nil
		}

		newContents, ok := s.FS().ReadFile(path)
		if !ok {
			return e
		}
		snap[path] = newContents
		reportFSEntryDiff(baseline, s.serializedDiff[path], newContents, path)

		return nil
	})
	if err != nil {
		panic("walkdir error during diff")
	}
	for path, oldDirContents := range s.serializedDiff {
		if s.FS().FileExists(path) {
			_, ok := s.FS().ReadFile(path)
			if !ok {
				// report deleted
				reportFSEntryDiff(baseline, oldDirContents, "", path)
			}
		}
	}
	s.serializedDiff = snap
	fmt.Fprintln(baseline)
}

func reportFSEntryDiff(baseline io.Writer, oldDirContent string, newDirContent string, path string) {
	// todo handle more cases of fs changes
	if oldDirContent == "" {
		fmt.Fprint(baseline, "//// [", path, "] new file\n", newDirContent, "\n")
	} else if newDirContent == "" {
		fmt.Fprint(baseline, "//// [", path, "] deleted\n")
	} else if newDirContent == oldDirContent {
		fmt.Fprint(baseline, "//// [", path, "] no change\n")
	} else {
		fmt.Fprint(baseline, "//// [", path, "] modified. new content:\n", newDirContent, "\n")
	}
}

func (s *testSys) baselineOutputs(baseline io.Writer, start int, end int) {
	// todo sanitize sys output
	fmt.Fprint(baseline, strings.Join(s.output[start:end], "\n"))
}

type serializeOutputOrder int

const (
	serializeOutputOrderNone   serializeOutputOrder = iota
	serializeOutputOrderBefore serializeOutputOrder = 1
	serializeOutputOrderAfter  serializeOutputOrder = 2
)
