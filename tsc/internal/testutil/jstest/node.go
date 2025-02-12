package jstest

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tspath"
)

const loaderScript = `import script from "./script.mjs";
process.stdout.write(JSON.stringify(await script(...process.argv.slice(2))));`

var getNodeExeOnce = sync.OnceValue(func() string {
	const exeName = "node"
	exe, err := exec.LookPath(exeName)
	if err != nil {
		return ""
	}
	return exe
})

// EvalNodeScript imports a Node.js script that deafult-exports a single function,
// calls it with the provided arguments, and unmarshals the JSON-stringified
// awaited return value into T.
func EvalNodeScript[T any](t testing.TB, script string, dir string, args ...string) (result T, err error) {
	return evalNodeScript[T](t, script, loaderScript, dir, args...)
}

// EvalNodeScriptWithTS is like EvalNodeScript, but provides the TypeScript
// library to the script as the first argument.
func EvalNodeScriptWithTS[T any](t testing.TB, script string, dir string, args ...string) (result T, err error) {
	if dir == "" {
		dir = t.TempDir()
	}
	tsSrc := tspath.NormalizePath(filepath.Join(repo.RootPath, "node_modules/typescript/lib/typescript.js"))
	if tsSrc[0] == '/' {
		tsSrc = "file://" + tsSrc
	} else {
		tsSrc = "file:///" + tsSrc
	}
	tsLoaderScript := fmt.Sprintf(`import script from "./script.mjs";
import * as ts from "%s";
process.stdout.write(JSON.stringify(await script(ts, ...process.argv.slice(2))));`, tsSrc)
	return evalNodeScript[T](t, script, tsLoaderScript, dir, args...)
}

func SkipIfNoNodeJS(t testing.TB) {
	t.Helper()
	if getNodeExeOnce() == "" {
		t.Skip("Node.js not found")
	}
}

func evalNodeScript[T any](t testing.TB, script string, loader string, dir string, args ...string) (result T, err error) {
	t.Helper()
	exe := getNodeExe(t)
	scriptPath := dir + "/script.mjs"
	if err = os.WriteFile(scriptPath, []byte(script), 0o644); err != nil {
		return result, err
	}
	loaderPath := dir + "/loader.mjs"
	if err = os.WriteFile(loaderPath, []byte(loader), 0o644); err != nil {
		return result, err
	}

	execArgs := make([]string, 0, 1+len(args))
	execArgs = append(execArgs, loaderPath)
	execArgs = append(execArgs, args...)
	execCmd := exec.Command(exe, execArgs...)
	execCmd.Dir = dir
	output, err := execCmd.CombinedOutput()
	if err != nil {
		return result, fmt.Errorf("failed to run node: %w\n%s", err, output)
	}

	if err = json.Unmarshal(output, &result); err != nil {
		return result, fmt.Errorf("failed to unmarshal JSON output: %w", err)
	}

	return result, nil
}

func getNodeExe(t testing.TB) string {
	if exe := getNodeExeOnce(); exe != "" {
		return exe
	}
	t.Fatal("Node.js not found")
	return ""
}
