package build_test

import (
	"fmt"
	"io"
	"slices"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/execute/build"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsc"
	"github.com/microsoft/TypeScript/tsc/internal/execute/tsctests"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"gotest.tools/v3/assert"
)

func TestBuildOrderGenerator(t *testing.T) {
	t.Parallel()
	testCases := []*buildOrderTestCase{
		{"specify two roots", []string{"A", "G"}, []string{"D", "E", "C", "B", "A", "G"}, []string{"D", "E", "G", "C", "B", "A"}, false},
		{"multiple parts of the same graph in various orders", []string{"A"}, []string{"D", "E", "C", "B", "A"}, []string{"D", "E", "C", "B", "A"}, false},
		{"multiple parts of the same graph in various orders", []string{"A", "C", "D"}, []string{"D", "E", "C", "B", "A"}, []string{"D", "E", "C", "B", "A"}, false},
		{"multiple parts of the same graph in various orders", []string{"D", "C", "A"}, []string{"D", "E", "C", "B", "A"}, []string{"D", "E", "C", "B", "A"}, false},
		{"other orderings", []string{"F"}, []string{"E", "F"}, []string{"E", "F"}, false},
		{"other orderings", []string{"E"}, []string{"E"}, []string{"E"}, false},
		{"other orderings", []string{"F", "C", "A"}, []string{"E", "F", "D", "C", "B", "A"}, []string{"E", "D", "F", "C", "B", "A"}, false},
		{"returns circular order", []string{"H"}, []string{"E", "J", "I", "H"}, []string{"E", "J", "I", "H"}, true},
		{"returns circular order", []string{"A", "H"}, []string{"D", "E", "C", "B", "A", "J", "I", "H"}, []string{"D", "E", "C", "J", "B", "I", "A", "H"}, true},
	}
	for _, testcase := range testCases {
		testcase.run(t)
	}
}

func TestBuildScheduling(t *testing.T) {
	t.Parallel()
	for _, operation := range []struct {
		name     string
		project  string
		refsOnly bool
		order    []string
		schedule []string
	}{
		{"full build", "", false, []string{"Leaf", "Middle", "Independent", "Root", "Other"}, []string{"Leaf", "Independent", "Other", "Middle", "Root"}},
		{"selected project", "Root", false, []string{"Leaf", "Middle", "Independent", "Root"}, []string{"Leaf", "Independent", "Middle", "Root"}},
		{"selected references", "Root", true, []string{"Leaf", "Middle", "Independent"}, []string{"Leaf", "Independent", "Middle"}},
		{"selected chain", "Middle", false, []string{"Leaf", "Middle"}, []string{"Leaf", "Middle"}},
		{"no references", "Leaf", true, []string{}, []string{}},
	} {
		for _, mode := range []struct {
			name string
			args []string
		}{
			{"one builder", []string{"--builders", "1"}},
			{"single threaded", []string{"--singleThreaded"}},
			{"two builders", []string{"--builders", "2"}},
		} {
			t.Run(operation.name+"/"+mode.name, func(t *testing.T) {
				t.Parallel()
				sys := newSchedulingTestSystem()
				var mu sync.Mutex
				visited := []string{}
				independentStarted := make(chan struct{})
				blockLeaf := mode.name == "two builders" && slices.Contains(operation.schedule, "Independent")
				sys.fs.onRead = func(path tspath.RootedFilePath) {
					if path.BaseName() != "index.ts" {
						return
					}
					project := path.Directory().BaseName()
					mu.Lock()
					visited = append(visited, project)
					mu.Unlock()
					if blockLeaf {
						switch project {
						case "Leaf":
							// Independent must start while Leaf is still occupying a builder.
							select {
							case <-independentStarted:
								return
							case <-time.After(5 * time.Second):
								t.Error("Independent was queued behind a builder waiting on Leaf")
							}
						case "Independent":
							close(independentStarted)
						}
					}
				}
				args := append([]string{"--build", "--verbose"}, mode.args...)
				args = append(args, "Root", "Other")
				command := tsoptions.ParseBuildCommandLine(args, sys.FS(), sys.GetCurrentDirectory())
				orchestrator := build.NewOrchestrator(build.Options{Sys: sys, Command: command})
				var result *build.OrchestratorResult
				if operation.refsOnly {
					result = orchestrator.BuildReferences(t.Context(), operation.project)
				} else {
					result = orchestrator.Build(t.Context(), operation.project)
				}
				assert.Equal(t, result.Result.Status, tsc.ExitStatusSuccess)
				assert.Equal(t, result.Statistics.Projects, len(operation.order))
				assert.Equal(t, result.Statistics.ProjectsBuilt, len(operation.order))
				if mode.name == "two builders" {
					slices.Sort(visited)
					expected := slices.Clone(operation.schedule)
					slices.Sort(expected)
					assert.DeepEqual(t, visited, expected)
				} else {
					assert.DeepEqual(t, visited, operation.schedule)
				}
				reported := []string{}
				for line := range strings.SplitSeq(sys.output.String(), "\n") {
					if strings.Contains(line, "Building project") {
						for _, project := range operation.order {
							if strings.Contains(line, "'"+project+"/tsconfig.json'") {
								reported = append(reported, project)
							}
						}
					}
				}
				assert.DeepEqual(t, reported, operation.order)
				for _, project := range []string{"Leaf", "Middle", "Independent", "Root", "Other"} {
					assert.Equal(t, sys.FS().FileExists(sys.GetCurrentDirectory().ResolveFile(project+"/dist/index.js")), slices.Contains(operation.order, project))
				}
			})
		}
	}
}

type schedulingTestFS struct {
	vfs.FS
	onRead func(tspath.RootedFilePath)
}

func (f *schedulingTestFS) ReadFile(path tspath.RootedFilePath) (string, bool) {
	f.onRead(path)
	return f.FS.ReadFile(path)
}

type schedulingTestSystem struct {
	*tsctests.TestSys
	fs     *schedulingTestFS
	output strings.Builder
}

func (s *schedulingTestSystem) FS() vfs.FS        { return s.fs }
func (s *schedulingTestSystem) Writer() io.Writer { return &s.output }

func newSchedulingTestSystem() *schedulingTestSystem {
	files := tsctests.FileMap{
		"/project/lib.d.ts": `
interface Array<T> {}
interface Boolean {}
interface CallableFunction {}
interface Function {}
interface IArguments {}
interface NewableFunction {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}
`,
	}
	deps := map[string][]string{
		"Root":        {"Middle", "Independent"},
		"Middle":      {"Leaf"},
		"Leaf":        {},
		"Independent": {},
		"Other":       {},
	}
	for project, references := range deps {
		files["/project/"+project+"/index.ts"] = "export const value = 1;"
		files["/project/"+project+"/tsconfig.json"] = fmt.Sprintf(`{
			"compilerOptions": { "composite": true, "noLib": true, "outDir": "dist" },
			"files": ["../lib.d.ts", "index.ts"],
			"references": [%s]
		}`, strings.Join(core.Map(references, func(ref string) string {
			return fmt.Sprintf(`{ "path": "../%s" }`, ref)
		}), ","))
	}
	sys := tsctests.NewTscSystem(files, tspath.CaseSensitive, "/project")
	return &schedulingTestSystem{TestSys: sys, fs: &schedulingTestFS{FS: sys.FS()}}
}

type buildOrderTestCase struct {
	name             string
	projects         []string
	expected         []string
	expectedSchedule []string
	circular         bool
}

func (b *buildOrderTestCase) configName(project string) string {
	return fmt.Sprintf("/home/src/workspaces/project/%s/tsconfig.json", project)
}

func (b *buildOrderTestCase) projectName(config string) string {
	str := strings.TrimPrefix(config, "/home/src/workspaces/project/")
	str = strings.TrimSuffix(str, "/tsconfig.json")
	return str
}

func (b *buildOrderTestCase) run(t *testing.T) {
	t.Helper()
	t.Run(b.name+" - "+strings.Join(b.projects, ","), func(t *testing.T) {
		t.Parallel()
		files := make(map[string]any)
		deps := map[string][]string{
			"A": {"B", "C"},
			"B": {"C", "D"},
			"C": {"D", "E"},
			"F": {"E"},
			"H": {"I"},
			"I": {"J"},
			"J": {"H", "E"},
		}
		reverseDeps := map[string][]string{}
		for project, deps := range deps {
			for _, dep := range deps {
				reverseDeps[dep] = append(reverseDeps[dep], project)
			}
		}
		verifyDeps := func(orchestrator *build.Orchestrator, buildOrder []string, hasDownStream bool) {
			for index, project := range buildOrder {
				upstream := core.Map(orchestrator.Upstream(b.configName(project)), b.projectName)
				expectedUpstream := deps[project]
				assert.Assert(t, len(upstream) <= len(expectedUpstream), fmt.Sprintf("Expected upstream for %s to be at most %d, got %d", project, len(expectedUpstream), len(upstream)))
				for _, expected := range expectedUpstream {
					if slices.Contains(buildOrder[:index], expected) {
						assert.Assert(t, slices.Contains(upstream, expected), fmt.Sprintf("Expected upstream for %s to contain %s", project, expected))
					} else {
						assert.Assert(t, !slices.Contains(upstream, expected), fmt.Sprintf("Expected upstream for %s to not contain %s", project, expected))
					}
				}

				downstream := core.Map(orchestrator.Downstream(b.configName(project)), b.projectName)
				expectedDownstream := core.IfElse(hasDownStream, reverseDeps[project], nil)
				assert.Assert(t, len(downstream) <= len(expectedDownstream), fmt.Sprintf("Expected downstream for %s to be at most %d, got %d", project, len(expectedDownstream), len(downstream)))
				for _, expected := range expectedDownstream {
					if slices.Contains(buildOrder[index+1:], expected) {
						assert.Assert(t, slices.Contains(downstream, expected), fmt.Sprintf("Expected downstream for %s to contain %s", project, expected))
					} else {
						assert.Assert(t, !slices.Contains(downstream, expected), fmt.Sprintf("Expected downstream for %s to not contain %s", project, expected))
					}
				}
			}
		}
		for _, project := range []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J"} {
			files[fmt.Sprintf("/home/src/workspaces/project/%s/%s.ts", project, project)] = "export {}"
			referencesStr := ""
			if deps, ok := deps[project]; ok {
				referencesStr = fmt.Sprintf(`, "references": [%s]`, strings.Join(core.Map(deps, func(dep string) string {
					return fmt.Sprintf(`{ "path": "../%s" }`, dep)
				}), ","))
			}
			files[b.configName(project)] = fmt.Sprintf(`{
                "compilerOptions": { "composite": true },
                "files": ["./%s.ts"],
                %s
            }`, project, referencesStr)
		}

		sys := tsctests.NewTscSystem(files, tspath.CaseSensitive, "/home/src/workspaces/project")
		args := append([]string{"--build", "--dry"}, b.projects...)
		buildCommand := tsoptions.ParseBuildCommandLine(args, sys.FS(), sys.GetCurrentDirectory())
		orchestrator := build.NewOrchestrator(build.Options{
			Sys:     sys,
			Command: buildCommand,
		})
		orchestrator.GenerateGraph(nil)
		buildOrder := core.Map(orchestrator.Order(), func(config tspath.RootedFilePath) string { return b.projectName(config.AsString()) })
		assert.DeepEqual(t, buildOrder, b.expected)
		verifyDeps(orchestrator, buildOrder, false)
		scheduleOrder := core.Map(orchestrator.ScheduleOrder(), b.projectName)
		assert.DeepEqual(t, scheduleOrder, b.expectedSchedule)
		verifyDeps(orchestrator, scheduleOrder, false)

		if !b.circular {
			for project, projectDeps := range deps {
				child := b.configName(project)
				childIndex := slices.Index(buildOrder, child)
				if childIndex == -1 {
					continue
				}
				for _, dep := range projectDeps {
					parent := b.configName(dep)
					parentIndex := slices.Index(buildOrder, parent)

					assert.Assert(t, childIndex > parentIndex, fmt.Sprintf("Expecting child %s to be built after parent %s", project, dep))
				}
			}
		}

		orchestrator.GenerateGraphReusingOldTasks()
		buildOrder2 := core.Map(orchestrator.Order(), func(config tspath.RootedFilePath) string { return b.projectName(config.AsString()) })
		assert.DeepEqual(t, buildOrder2, b.expected)

		argsWatch := append([]string{"--build", "--watch"}, b.projects...)
		buildCommandWatch := tsoptions.ParseBuildCommandLine(argsWatch, sys.FS(), sys.GetCurrentDirectory())
		orchestrator = build.NewOrchestrator(build.Options{
			Sys:     sys,
			Command: buildCommandWatch,
		})
		orchestrator.GenerateGraph(nil)
		buildOrder3 := core.Map(orchestrator.Order(), func(config tspath.RootedFilePath) string { return b.projectName(config.AsString()) })
		verifyDeps(orchestrator, buildOrder3, true)
	})
}
