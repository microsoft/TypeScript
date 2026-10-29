package tsctests

import (
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/execute"
	"gotest.tools/v3/assert"
)

const (
	dependencyProject = "/home/src/workspaces/project/"
	dependencyShared  = "/home/src/workspaces/shared/"
)

func dependencyFiles() FileMap {
	return FileMap{
		dependencyProject + "tsconfig.json": `{"compilerOptions":{"outDir":"out","rootDir":"..","module":"nodenext","target":"es2022"},"files":["index.ts"]}`,
		dependencyProject + "package.json":  `{"type":"module"}`,
		dependencyProject + "index.ts":      `import { value } from "./other.js"; export const result = value;`,
		dependencyProject + "other.ts":      `export const value = "before";`,
		dependencyShared + "other.ts":       `export const value = "before";`,
	}
}

func checkDependencyOutput(t *testing.T, sys *TestSys, path, expected string) {
	t.Helper()
	output := sys.readFileNoError(path)
	assert.Assert(t, strings.Contains(output, expected), "%s must contain %q:\n%s\nwatch output:\n%s", path, expected, output, sys.getOutput(false))
}

func TestBuildWatchDependenciesBeforeStartup(t *testing.T) {
	t.Parallel()
	sys := newTestSys(&tscInput{files: dependencyFiles(), cwd: "/home/src/workspaces/project"}, false)
	result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
	assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
	sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "changed";`)
	sys.clearOutput()
	result = execute.CommandLine(t.Context(), sys, []string{"--build", "--watch", "--verbose"}, sys)
	assert.Equal(t, int(result.Status), 0)
	assert.Assert(t, result.Watcher != nil)
	checkDependencyOutput(t, sys, dependencyProject+"out/project/other.js", `"changed"`)
}

func TestBuildDependencyBeforeRestart(t *testing.T) {
	t.Parallel()
	for _, watch := range []bool{false, true} {
		for _, deleted := range []bool{false, true} {
			t.Run(fmt.Sprintf("watch=%v/deleted=%v", watch, deleted), func(t *testing.T) {
				t.Parallel()
				sys := newTestSys(&tscInput{files: dependencyFiles(), cwd: strings.TrimSuffix(dependencyProject, "/")}, false)
				result := execute.CommandLine(t.Context(), sys, []string{"--build"}, sys)
				assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
				if deleted {
					sys.removeNoError(dependencyProject + "other.ts")
				} else {
					sys.writeFileNoError(dependencyProject+"other.ts", `export const value = "restarted";`)
				}
				sys.clearOutput()
				args := []string{"--build", "--verbose"}
				if watch {
					args = append(args, "--watch")
				}
				result = execute.CommandLine(t.Context(), sys, args, sys)
				if deleted {
					assert.Assert(t, int(result.Status) != 0)
					assert.Assert(t, strings.Contains(sys.getOutput(false), "Cannot find module"))
				} else {
					assert.Equal(t, int(result.Status), 0, "%s", sys.getOutput(false))
					checkDependencyOutput(t, sys, dependencyProject+"out/project/other.js", `"restarted"`)
				}
			})
		}
	}
}
