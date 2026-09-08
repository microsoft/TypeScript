package tsctests

import (
	"context"
	"fmt"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func TestWatchConfigRetargetWithEqualTime(t *testing.T) {
	t.Parallel()
	for _, build := range []bool{false, true} {
		for _, extended := range []bool{false, true} {
			t.Run(fmt.Sprintf("build=%v/extended=%v", build, extended), func(t *testing.T) {
				t.Parallel()
				root := aliasWatchDirectory(t)
				config := root + "/tsconfig.json"
				link := config
				baseConfig := fmt.Sprintf(`"compilerOptions":{"lib":["es5"],"noEmit":true,"incremental":%v,"noImplicitAny":%%v},"files":["main.ts"],"include":[]`, build)
				if extended {
					link = root + "/options.json"
					writeAliasWatchFile(t, config, fmt.Sprintf(`{%s,"extends":"./options.json"}`, fmt.Sprintf(baseConfig, true)))
					baseConfig = `"compilerOptions":{"strictNullChecks":%v}`
				}
				writeAliasWatchFile(t, root+"/one.json", "{"+fmt.Sprintf(baseConfig, false)+"}")
				writeAliasWatchFile(t, root+"/two.json", "{"+fmt.Sprintf(baseConfig, true)+"}")
				text, diagnostic := "export function f(x) { return x; }", "TS7006"
				if extended {
					text, diagnostic = "export const x: string = null;", "TS2322"
				}
				writeAliasWatchFile(t, root+"/main.ts", text)
				writeAliasWatchFile(t, root+"/lib.es5.d.ts", tscDefaultLibContent)
				stamp := time.Unix(1700000000, 0)
				assert.NilError(t, os.Chtimes(root+"/one.json", stamp, stamp))
				assert.NilError(t, os.Chtimes(root+"/two.json", stamp, stamp))
				if err := os.Symlink(root+"/one.json", link); err != nil {
					t.Skipf("symlinks unavailable: %v", err)
				}
				base := newTestSys(&tscInput{files: FileMap{}, cwd: root}, false)
				base.defaultLibraryPath = root
				base.mockWatchBackend.DirectoryExists = osvfs.FS().DirectoryExists
				base.mockWatchBackend.UseCaseSensitiveFileNames = osvfs.FS().UseCaseSensitiveFileNames()
				sys := &aliasWatchSystem{TestSys: base}
				args := []string{"--watch", "--project", config}
				if build {
					args = []string{"--build", "--watch", config}
				}
				result := execute.CommandLine(context.Background(), sys, args, sys)
				assert.Assert(t, result.Watcher != nil)
				assert.Assert(t, strings.Contains(base.currentWrite.String(), "Found 0 errors"), base.currentWrite.String())
				base.currentWrite.Reset()
				assert.NilError(t, os.Remove(link))
				assert.NilError(t, os.Symlink(root+"/two.json", link))
				sendAliasWatchEvent(t, base.mockWatchBackend, fswatch.Event{Path: link, Kind: fswatch.EventUpdate})
				result.Watcher.DoCycle()
				assert.Assert(t, strings.Contains(base.currentWrite.String(), diagnostic), base.currentWrite.String())
			})
		}
	}
}
