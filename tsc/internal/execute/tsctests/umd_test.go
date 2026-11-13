package tsctests

import "testing"

func TestTscUMD(t *testing.T) {
	t.Parallel()
	for _, args := range [][]string{nil, {"--watch"}} {
		const umdPath = "/home/src/workspaces/project/umd.d.ts"
		const present = "export as namespace UmdApi;\nexport interface Item { value: number }\n"
		(&tscInput{
			subScenario:     "UMD global export changes invalidate unchanged consumers",
			commandLineArgs: args,
			files: FileMap{
				"/home/src/workspaces/project/tsconfig.json": `{"compilerOptions":{"strict":true,"incremental":true,"noEmit":true,"types":[]},"include":["*.ts"]}`,
				umdPath:                                  present,
				"/home/src/workspaces/project/client.ts": "declare const item: UmdApi.Item;\nconst checked: number = item.value;\n",
			},
			edits: []*tscEdit{
				noChange,
				{
					caption: "remove the global namespace export",
					edit: func(sys *TestSys) {
						sys.writeFileNoError(umdPath, "export interface Item { value: number }\n")
					},
				},
				{
					caption: "restore the global namespace export",
					edit: func(sys *TestSys) {
						sys.writeFileNoError(umdPath, present)
					},
				},
				{
					caption: "rename the global namespace export",
					edit: func(sys *TestSys) {
						sys.replaceFileText(umdPath, "UmdApi", "OtherApi")
					},
				},
				{
					caption: "restore the global namespace name",
					edit: func(sys *TestSys) {
						sys.writeFileNoError(umdPath, present)
					},
				},
				{
					caption: "make the exported property incompatible",
					edit: func(sys *TestSys) {
						sys.replaceFileText(umdPath, "value: number", "value: string")
					},
				},
				{
					caption: "restore the exported property type",
					edit: func(sys *TestSys) {
						sys.writeFileNoError(umdPath, present)
					},
				},
				{
					caption: "delete the UMD declaration file",
					edit: func(sys *TestSys) {
						sys.removeNoError(umdPath)
					},
				},
				{
					caption: "restore the UMD declaration file",
					edit: func(sys *TestSys) {
						sys.writeFileNoError(umdPath, present)
					},
				},
				noChange,
			},
		}).run(t, "umd")
	}
}
