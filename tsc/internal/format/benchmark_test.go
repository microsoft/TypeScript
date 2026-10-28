package format_test

import (
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/format"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/filefixture"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/fixtures"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

const editorText = `import { readFile } from "node:fs/promises";

export async function readValues<T>(path:string,convert:(text:string)=>T){
// Ignore empty lines, but preserve quoted text.
const text=await readFile(path,"utf8");
return text.split(/\r?\n/).filter(line=>line.length>0).map(convert);
}

export class Cache<T>{
private values=new Map<string,T>();
get(key:string){return this.values.get(key);}
set(key:string,value:T){this.values.set(key,value);}
}
`

func BenchmarkFormatDocument(b *testing.B) {
	cases := append([]filefixture.Fixture{}, fixtures.BenchFixtures...)
	cases = append(cases,
		filefixture.FromString("editor.ts", "editor.ts", editorText),
		filefixture.FromString("comments.ts", "comments.ts", strings.Repeat(
			"/**\n * "+strings.Repeat("Documentation with ordinary ASCII words. ", 8)+"\n */\n"+
				"export function value(input:string){ // Keep the trailing comment.\n"+
				"return `"+strings.Repeat("template text ", 32)+"${input}`;\n}\n", 64)),
		filefixture.FromString("whitespace.ts", "whitespace.ts", strings.Repeat(
			"export function value(input:number){\n"+
				strings.Repeat(" ", 128)+"const result=input+1;"+strings.Repeat(" ", 128)+"\n"+
				strings.Repeat(" ", 128)+"return result;"+strings.Repeat(" ", 128)+"\n}\n", 128)),
		filefixture.FromString("unicode-crlf.ts", "unicode-crlf.ts", strings.Repeat(
			"// Unicode text: \u03bb \u4e2d \U0001f600\r\n"+
				"export function value(input:string){\r\n"+
				"\t\u00a0const text=\"\u03bb \u4e2d \U0001f600\";\r\n"+
				"\treturn input+text;\t \r\n}\r\n", 128)),
		filefixture.FromString("minified.js", "minified.js", strings.Repeat(
			"function value(input){if(input){return{value:input+1,valid:true};}return null;}", 256)),
	)
	for _, fixture := range cases {
		b.Run(fixture.Name(), func(b *testing.B) {
			fixture.SkipIfNotExist(b)
			fileName := tspath.ToRootedFilePath(fixture.Path(), "/")
			parse := func(text string) *ast.SourceFile {
				return parser.ParseSourceFile(ast.SourceFileParseOptions{
					FileName: fileName,
					PathKey:  tspath.CaseSensitive.PathKey(tspath.RootedPath(fileName)),
				}, text, core.GetScriptKindFromFileName(fileName))
			}
			options := lsutil.GetDefaultFormatCodeSettings()
			options.TrimTrailingWhitespace = core.TSTrue
			ctx := format.WithFormatCodeSettings(b.Context(), options, "\n")
			text := fixture.ReadFile(b)
			file := parse(text)
			assert.Equal(b, len(file.Diagnostics()), 0)
			formatted := applyBulkEdits(text, format.FormatDocument(ctx, file))
			for _, input := range []struct {
				name string
				text string
				file *ast.SourceFile
			}{
				{"original", text, file},
				{"formatted", formatted, parse(formatted)},
			} {
				b.Run(input.name, func(b *testing.B) {
					expected := format.FormatDocument(ctx, input.file)
					if input.name == "formatted" {
						assert.Assert(b, applyBulkEdits(input.text, expected) == input.text)
					}
					b.SetBytes(int64(len(input.text)))
					b.ReportAllocs()
					var edits []core.TextChange
					for b.Loop() {
						edits = format.FormatDocument(ctx, input.file)
					}
					assert.Assert(b, slices.Equal(edits, expected))
				})
			}
		})
	}
}

func BenchmarkFormatEditor(b *testing.B) {
	options := lsutil.GetDefaultFormatCodeSettings()
	options.TrimTrailingWhitespace = core.TSTrue
	ctx := format.WithFormatCodeSettings(b.Context(), options, "\n")
	file := parser.ParseSourceFile(ast.SourceFileParseOptions{
		FileName: "/editor.ts",
		PathKey:  "/editor.ts",
	}, editorText, core.ScriptKindTS)
	for _, operation := range []struct {
		name string
		run  func() []core.TextChange
	}{
		{"selection", func() []core.TextChange {
			return format.FormatSelection(ctx, file, strings.Index(editorText, "const text"), strings.Index(editorText, "\n}\n"))
		}},
		{"semicolon", func() []core.TextChange {
			return format.FormatOnSemicolon(ctx, file, strings.Index(editorText, "utf8\");")+len("utf8\");"))
		}},
		{"enter", func() []core.TextChange {
			return format.FormatOnEnter(ctx, file, strings.Index(editorText, "return text"))
		}},
	} {
		b.Run(operation.name, func(b *testing.B) {
			expected := operation.run()
			assert.Assert(b, len(expected) > 0)
			b.ReportAllocs()
			var edits []core.TextChange
			for b.Loop() {
				edits = operation.run()
			}
			assert.Assert(b, slices.Equal(edits, expected))
		})
	}
}
