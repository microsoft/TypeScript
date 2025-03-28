package compiler

import (
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type testFile struct {
	fileName string
	contents string
}

type programTest struct {
	testName      string
	files         []testFile
	expectedFiles []string
	target        core.ScriptTarget
}

var esnextLibs = []string{
	"lib.es5.d.ts",
	"lib.es2015.d.ts",
	"lib.es2016.d.ts",
	"lib.es2017.d.ts",
	"lib.es2018.d.ts",
	"lib.es2019.d.ts",
	"lib.es2020.d.ts",
	"lib.es2021.d.ts",
	"lib.es2022.d.ts",
	"lib.es2023.d.ts",
	"lib.es2024.d.ts",
	"lib.esnext.d.ts",
	"lib.dom.d.ts",
	"lib.dom.iterable.d.ts",
	"lib.dom.asynciterable.d.ts",
	"lib.webworker.importscripts.d.ts",
	"lib.scripthost.d.ts",
	"lib.es2015.core.d.ts",
	"lib.es2015.collection.d.ts",
	"lib.es2015.generator.d.ts",
	"lib.es2015.iterable.d.ts",
	"lib.es2015.promise.d.ts",
	"lib.es2015.proxy.d.ts",
	"lib.es2015.reflect.d.ts",
	"lib.es2015.symbol.d.ts",
	"lib.es2015.symbol.wellknown.d.ts",
	"lib.es2016.array.include.d.ts",
	"lib.es2016.intl.d.ts",
	"lib.es2017.arraybuffer.d.ts",
	"lib.es2017.date.d.ts",
	"lib.es2017.object.d.ts",
	"lib.es2017.sharedmemory.d.ts",
	"lib.es2017.string.d.ts",
	"lib.es2017.intl.d.ts",
	"lib.es2017.typedarrays.d.ts",
	"lib.es2018.asyncgenerator.d.ts",
	"lib.es2018.asynciterable.d.ts",
	"lib.es2018.intl.d.ts",
	"lib.es2018.promise.d.ts",
	"lib.es2018.regexp.d.ts",
	"lib.es2019.array.d.ts",
	"lib.es2019.object.d.ts",
	"lib.es2019.string.d.ts",
	"lib.es2019.symbol.d.ts",
	"lib.es2019.intl.d.ts",
	"lib.es2020.bigint.d.ts",
	"lib.es2020.date.d.ts",
	"lib.es2020.promise.d.ts",
	"lib.es2020.sharedmemory.d.ts",
	"lib.es2020.string.d.ts",
	"lib.es2020.symbol.wellknown.d.ts",
	"lib.es2020.intl.d.ts",
	"lib.es2020.number.d.ts",
	"lib.es2021.promise.d.ts",
	"lib.es2021.string.d.ts",
	"lib.es2021.weakref.d.ts",
	"lib.es2021.intl.d.ts",
	"lib.es2022.array.d.ts",
	"lib.es2022.error.d.ts",
	"lib.es2022.intl.d.ts",
	"lib.es2022.object.d.ts",
	"lib.es2022.string.d.ts",
	"lib.es2022.regexp.d.ts",
	"lib.es2023.array.d.ts",
	"lib.es2023.collection.d.ts",
	"lib.es2023.intl.d.ts",
	"lib.es2024.arraybuffer.d.ts",
	"lib.es2024.collection.d.ts",
	"lib.es2024.object.d.ts",
	"lib.es2024.promise.d.ts",
	"lib.es2024.regexp.d.ts",
	"lib.es2024.sharedmemory.d.ts",
	"lib.es2024.string.d.ts",
	"lib.esnext.array.d.ts",
	"lib.esnext.collection.d.ts",
	"lib.esnext.intl.d.ts",
	"lib.esnext.disposable.d.ts",
	"lib.esnext.decorators.d.ts",
	"lib.esnext.iterator.d.ts",
	"lib.decorators.d.ts",
	"lib.decorators.legacy.d.ts",
	"lib.esnext.full.d.ts",
}

var programTestCases = []programTest{
	{
		testName: "BasicFileOrdering",
		files: []testFile{
			{fileName: "c:/dev/src/index.ts", contents: "/// <reference path='c:/dev/src2/a/5.ts' />\n/// <reference path='c:/dev/src2/a/10.ts' />"},
			{fileName: "c:/dev/src2/a/5.ts", contents: "/// <reference path='4.ts' />"},
			{fileName: "c:/dev/src2/a/4.ts", contents: "/// <reference path='b/3.ts' />"},
			{fileName: "c:/dev/src2/a/b/3.ts", contents: "/// <reference path='2.ts' />"},
			{fileName: "c:/dev/src2/a/b/2.ts", contents: "/// <reference path='c/1.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');"},
			{fileName: "c:/dev/src2/a/10.ts", contents: "/// <reference path='b/c/d/9.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "/// <reference path='e/8.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "/// <reference path='7.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "/// <reference path='f/6.ts' />"},
			{fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');"},
		},
		expectedFiles: slices.Concat(esnextLibs,
			[]string{
				"c:/dev/src2/a/b/c/1.ts",
				"c:/dev/src2/a/b/2.ts",
				"c:/dev/src2/a/b/3.ts",
				"c:/dev/src2/a/4.ts",
				"c:/dev/src2/a/5.ts",
				"c:/dev/src2/a/b/c/d/e/f/6.ts",
				"c:/dev/src2/a/b/c/d/e/7.ts",
				"c:/dev/src2/a/b/c/d/e/8.ts",
				"c:/dev/src2/a/b/c/d/9.ts",
				"c:/dev/src2/a/10.ts",
				"c:/dev/src/index.ts",
			}),
		target: core.ScriptTargetESNext,
	},
	{
		testName: "FileOrderingImports",
		files: []testFile{
			{fileName: "c:/dev/src/index.ts", contents: "import * as five from '../src2/a/5.ts';\nimport * as ten from '../src2/a/10.ts';"},
			{fileName: "c:/dev/src2/a/5.ts", contents: "import * as four from './4.ts';"},
			{fileName: "c:/dev/src2/a/4.ts", contents: "import * as three from './b/3.ts';"},
			{fileName: "c:/dev/src2/a/b/3.ts", contents: "import * as two from './2.ts';"},
			{fileName: "c:/dev/src2/a/b/2.ts", contents: "import * as one from './c/1.ts';"},
			{fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');"},
			{fileName: "c:/dev/src2/a/10.ts", contents: "import * as nine from './b/c/d/9.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "import * as eight from './e/8.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "import * as seven from './7.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "import * as six from './f/6.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');"},
		},
		expectedFiles: slices.Concat(esnextLibs,
			[]string{
				"c:/dev/src2/a/b/c/1.ts",
				"c:/dev/src2/a/b/2.ts",
				"c:/dev/src2/a/b/3.ts",
				"c:/dev/src2/a/4.ts",
				"c:/dev/src2/a/5.ts",
				"c:/dev/src2/a/b/c/d/e/f/6.ts",
				"c:/dev/src2/a/b/c/d/e/7.ts",
				"c:/dev/src2/a/b/c/d/e/8.ts",
				"c:/dev/src2/a/b/c/d/9.ts",
				"c:/dev/src2/a/10.ts",
				"c:/dev/src/index.ts",
			}),
		target: core.ScriptTargetESNext,
	},
	{
		testName: "FileOrderingCycles",
		files: []testFile{
			{fileName: "c:/dev/src/index.ts", contents: "import * as five from '../src2/a/5.ts';\nimport * as ten from '../src2/a/10.ts';"},
			{fileName: "c:/dev/src2/a/5.ts", contents: "import * as four from './4.ts';"},
			{fileName: "c:/dev/src2/a/4.ts", contents: "import * as three from './b/3.ts';"},
			{fileName: "c:/dev/src2/a/b/3.ts", contents: "import * as two from './2.ts';\nimport * as cycle from 'c:/dev/src/index.ts'; "},
			{fileName: "c:/dev/src2/a/b/2.ts", contents: "import * as one from './c/1.ts';"},
			{fileName: "c:/dev/src2/a/b/c/1.ts", contents: "console.log('hello');"},
			{fileName: "c:/dev/src2/a/10.ts", contents: "import * as nine from './b/c/d/9.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/9.ts", contents: "import * as eight from './e/8.ts';\nimport * as cycle from 'c:/dev/src/index.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/8.ts", contents: "import * as seven from './7.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/7.ts", contents: "import * as six from './f/6.ts';"},
			{fileName: "c:/dev/src2/a/b/c/d/e/f/6.ts", contents: "console.log('world!');"},
		},
		expectedFiles: slices.Concat(esnextLibs,
			[]string{
				"c:/dev/src2/a/b/c/1.ts",
				"c:/dev/src2/a/b/2.ts",
				"c:/dev/src2/a/b/3.ts",
				"c:/dev/src2/a/4.ts",
				"c:/dev/src2/a/5.ts",
				"c:/dev/src2/a/b/c/d/e/f/6.ts",
				"c:/dev/src2/a/b/c/d/e/7.ts",
				"c:/dev/src2/a/b/c/d/e/8.ts",
				"c:/dev/src2/a/b/c/d/9.ts",
				"c:/dev/src2/a/10.ts",
				"c:/dev/src/index.ts",
			}),
		target: core.ScriptTargetESNext,
	},
}

func TestProgram(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	for _, testCase := range programTestCases {
		t.Run(testCase.testName, func(t *testing.T) {
			t.Parallel()
			libPrefix := bundled.LibPath() + "/"
			fs := vfstest.FromMap[any](nil, false /*useCaseSensitiveFileNames*/)
			fs = bundled.WrapFS(fs)

			for _, testFile := range testCase.files {
				_ = fs.WriteFile(testFile.fileName, testFile.contents, false)
			}

			opts := core.CompilerOptions{Target: testCase.target}

			program := NewProgram(ProgramOptions{
				RootFiles:      []string{"c:/dev/src/index.ts"},
				Host:           NewCompilerHost(&opts, "c:/dev/src", fs, bundled.LibPath()),
				Options:        &opts,
				SingleThreaded: false,
			})

			actualFiles := []string{}
			for _, file := range program.files {
				actualFiles = append(actualFiles, strings.TrimPrefix(file.FileName(), libPrefix))
			}

			assert.DeepEqual(t, testCase.expectedFiles, actualFiles)
		})
	}
}
