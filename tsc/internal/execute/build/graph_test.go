package build_test

import (
	"fmt"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/execute/build"
	"github.com/microsoft/typescript-go/internal/execute/tsctests"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"gotest.tools/v3/assert"
)

func TestBuildOrderGenerator(t *testing.T) {
	t.Parallel()
	testCases := []*buildOrderTestCase{
		{"specify two roots", []string{"A", "G"}, []string{"D", "E", "C", "B", "A", "G"}, false},
		{"multiple parts of the same graph in various orders", []string{"A"}, []string{"D", "E", "C", "B", "A"}, false},
		{"multiple parts of the same graph in various orders", []string{"A", "C", "D"}, []string{"D", "E", "C", "B", "A"}, false},
		{"multiple parts of the same graph in various orders", []string{"D", "C", "A"}, []string{"D", "E", "C", "B", "A"}, false},
		{"other orderings", []string{"F"}, []string{"E", "F"}, false},
		{"other orderings", []string{"E"}, []string{"E"}, false},
		{"other orderings", []string{"F", "C", "A"}, []string{"E", "F", "D", "C", "B", "A"}, false},
		{"returns circular order", []string{"H"}, []string{"E", "J", "I", "H"}, true},
		{"returns circular order", []string{"A", "H"}, []string{"D", "E", "C", "B", "A", "J", "I", "H"}, true},
	}
	for _, testcase := range testCases {
		testcase.run(t)
	}
}

type buildOrderTestCase struct {
	name     string
	projects []string
	expected []string
	circular bool
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

		sys := tsctests.NewTscSystem(files, true, "/home/src/workspaces/project")
		args := append([]string{"--build", "--dry"}, b.projects...)
		buildCommand := tsoptions.ParseBuildCommandLine(args, sys)
		orchestrator := build.NewOrchestrator(build.Options{
			Sys:     sys,
			Command: buildCommand,
		})
		orchestrator.GenerateGraph()
		buildOrder := core.Map(orchestrator.Order(), b.projectName)
		assert.DeepEqual(t, buildOrder, b.expected)

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
		}

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
	})
}
