package tsctests

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

type lifecycleWatchSystem struct {
	*aliasWatchSystem
	filesystem vfs.FS
}

func (s *lifecycleWatchSystem) FS() vfs.FS { return s.filesystem }

type failedConfigReadFS struct {
	vfs.FS
	config string
	fail   atomic.Bool
}

func (f *failedConfigReadFS) ReadFile(name string) (string, bool) {
	if name == f.config && f.fail.Swap(false) {
		return "", false
	}
	return f.FS.ReadFile(name)
}

func startPhysicalAliasWatch(t *testing.T, root string, build bool, filesystem vfs.FS) (*TestSys, func()) {
	t.Helper()
	writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
	base := newTestSys(&tscInput{files: FileMap{}, cwd: root}, false)
	base.defaultLibraryPath = root
	base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
	base.mockWatchBackend.UseCaseSensitiveFileNames = osvfs.FS().UseCaseSensitiveFileNames()
	sys := &lifecycleWatchSystem{aliasWatchSystem: &aliasWatchSystem{TestSys: base}, filesystem: filesystem}
	args := []string{"--watch", "--project", root + "/tsconfig.json"}
	if build {
		args = []string{"--build", "--watch", root + "/tsconfig.json"}
	}
	result := execute.CommandLine(context.Background(), sys, args, sys)
	assert.Assert(t, result.Watcher != nil)
	assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
	return base, result.Watcher.DoCycle
}

func TestWatchRetargetIdenticalSourceText(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		t.Run(strconv.FormatBool(build), func(t *testing.T) {
			t.Parallel()
			root := aliasWatchDirectory(t)
			stamp := time.Unix(1700000000, 0)
			for _, target := range []string{"one", "two"} {
				writeAliasWatchFile(t, root+"/"+target+"/index.ts", `export {value} from "./dep";`)
				value := "1"
				if target == "two" {
					value = `"two"`
				}
				writeAliasWatchFile(t, root+"/"+target+"/dep.ts", "export const value = "+value+";")
				for _, name := range []string{"index.ts", "dep.ts"} {
					assert.NilError(t, os.Chtimes(root+"/"+target+"/"+name, stamp, stamp))
				}
			}
			link := root + "/linked"
			if err := os.Symlink(root+"/one", link); err != nil {
				t.Skipf("symlinks unavailable: %v", err)
			}
			writeAliasWatchFile(t, root+"/main.ts", `import {value} from "./linked/index"; const x: number = value;`)
			writeAliasWatchFile(t, root+"/tsconfig.json", fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"preserveSymlinks":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build))
			base, cycle := startPhysicalAliasWatch(t, root, build, osvfs.FS())
			base.currentWrite.Reset()
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(root+"/two", link))
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "TS2322"), base.currentWrite.String())
			base.currentWrite.Reset()
			writeAliasWatchFile(t, root+"/two/dep.ts", "export const value = 2;")
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: root + "/two/dep.ts", Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
		})
	}
}

func TestWatchRetargetConfigErrorRecovery(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		t.Run(strconv.FormatBool(build), func(t *testing.T) {
			t.Parallel()
			root := aliasWatchDirectory(t)
			config := fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build)
			writeAliasWatchFile(t, root+"/one/config.json", config)
			writeAliasWatchFile(t, root+"/two/config.json", "{")
			stamp := time.Unix(1700000000, 0)
			assert.NilError(t, os.Chtimes(root+"/one/config.json", stamp, stamp))
			assert.NilError(t, os.Chtimes(root+"/two/config.json", stamp, stamp))
			link := root + "/tsconfig.json"
			if err := os.Symlink(root+"/one/config.json", link); err != nil {
				t.Skipf("symlinks unavailable: %v", err)
			}
			writeAliasWatchFile(t, root+"/main.ts", "export const value = 1;")
			base, cycle := startPhysicalAliasWatch(t, root, build, osvfs.FS())
			base.currentWrite.Reset()
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(root+"/two/config.json", link))
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "TS1005"), base.currentWrite.String())
			base.currentWrite.Reset()
			writeAliasWatchFile(t, root+"/two/config.json", config)
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: root + "/two/config.json", Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
		})
	}
}

func TestWatchRetargetConfigReadFailureRecovery(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		t.Run(strconv.FormatBool(build), func(t *testing.T) {
			t.Parallel()
			root := aliasWatchDirectory(t)
			config := fmt.Sprintf(`{"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v},"files":["main.ts"],"include":[]}`, build)
			writeAliasWatchFile(t, root+"/one/config.json", config)
			writeAliasWatchFile(t, root+"/two/config.json", config)
			link := root + "/tsconfig.json"
			if err := os.Symlink(root+"/one/config.json", link); err != nil {
				t.Skipf("symlinks unavailable: %v", err)
			}
			writeAliasWatchFile(t, root+"/main.ts", "export const value = 1;")
			fs := &failedConfigReadFS{FS: osvfs.FS(), config: link}
			base, cycle := startPhysicalAliasWatch(t, root, build, fs)
			base.currentWrite.Reset()
			assert.NilError(t, os.Remove(link))
			assert.NilError(t, os.Symlink(root+"/two/config.json", link))
			fs.fail.Store(true)
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
			cycle()
			diagnostic := "TS5083"
			if build {
				diagnostic = "TS6053"
			}
			assert.Assert(t, strings.Contains(base.currentWrite.String(), diagnostic), base.currentWrite.String())
			base.currentWrite.Reset()
			sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: root + "/two/config.json", Kind: fswatch.EventUpdate})
			cycle()
			assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
		})
	}
}
