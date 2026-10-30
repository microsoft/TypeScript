package api

import (
	"context"
	"errors"
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

func TestGetAllDependencies(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name                  string
		disableSourceRedirect bool
		expected              []tspath.RootedFilePath
	}{
		{
			name:     "uses sources of project references",
			expected: []tspath.RootedFilePath{"/home/projects/app/src/index.ts", "/home/projects/shared/src/util.ts"},
		},
		{
			name:                  "uses outputs of project references",
			disableSourceRedirect: true,
			expected:              []tspath.RootedFilePath{"/home/projects/app/src/index.ts", "/home/projects/shared/dist/util.d.ts"},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			const configFileName = "/home/projects/app/tsconfig.json"
			projectSession, _ := projecttestutil.Setup(map[string]any{
				"/home/projects/shared/tsconfig.json":  `{ "compilerOptions": { "composite": true, "noLib": true, "rootDir": "src", "outDir": "dist" }, "include": ["src"] }`,
				"/home/projects/shared/src/util.ts":    `export const util = 1;`,
				"/home/projects/shared/dist/util.d.ts": `export declare const util = 1;`,
				configFileName: fmt.Sprintf(
					`{ "compilerOptions": { "noLib": true, "disableSourceOfProjectReferenceRedirect": %t }, "references": [{ "path": "../shared" }], "include": ["src"] }`,
					test.disableSourceRedirect,
				),
				"/home/projects/app/src/index.ts":     `import { util } from "../../shared/src/util"; export const value = util;`,
				"/home/projects/app/src/unrelated.ts": `export const unrelated = 1;`,
			})
			defer projectSession.Close()
			session := NewLSPSession(projectSession, nil)
			defer session.Close()

			snapshot, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
				OpenProjects: []DocumentIdentifier{{FileName: configFileName}},
			})
			assert.NilError(t, err)
			projectHandle := snapshot.Projects[0].Handle

			dependencies, err := session.handleGetAllDependencies(context.Background(), &GetSourceFileParams{
				Snapshot: snapshot.Snapshot,
				Project:  projectHandle,
				File:     DocumentIdentifier{FileName: "/home/projects/app/src/index.ts"},
			})
			assert.NilError(t, err)
			assert.DeepEqual(t, dependencies, test.expected)

			dependencies, err = session.handleGetAllDependencies(context.Background(), &GetSourceFileParams{
				Snapshot: snapshot.Snapshot,
				Project:  projectHandle,
				File:     DocumentIdentifier{FileName: "/home/projects/app/src/unrelated.ts"},
			})
			assert.NilError(t, err)
			assert.DeepEqual(t, dependencies, []tspath.RootedFilePath{"/home/projects/app/src/unrelated.ts"})

			_, err = session.handleGetAllDependencies(context.Background(), &GetSourceFileParams{
				Snapshot: snapshot.Snapshot,
				Project:  projectHandle,
				File:     DocumentIdentifier{FileName: "/home/projects/app/src/missing.ts"},
			})
			assert.Assert(t, errors.Is(err, ErrClientError))
		})
	}
}
