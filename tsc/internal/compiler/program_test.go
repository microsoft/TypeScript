package compiler

import (
	"strings"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestLibOrdering(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	fs := vfstest.FromMapFS(fstest.MapFS{}, false /*useCaseSensitiveFileNames*/)
	fs = bundled.WrapFS(fs)

	cd := "/"
	host := NewCompilerHost(nil, "/", fs)
	opts := ProgramOptions{
		Host:               host,
		RootPath:           cd,
		DefaultLibraryPath: bundled.LibPath(),
		Options:            &core.CompilerOptions{Target: core.ScriptTargetESNext},
	}

	p := NewProgram(opts)

	sourceFiles := p.SourceFiles()
	names := make([]string, 0, len(sourceFiles))

	prefix := bundled.LibPath() + "/"

	for _, sf := range sourceFiles {
		names = append(names, strings.TrimPrefix(sf.FileName(), prefix))
	}

	assert.DeepEqual(t, names, []string{
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
		"lib.es2022.sharedmemory.d.ts",
		"lib.es2022.string.d.ts",
		"lib.es2022.regexp.d.ts",
		"lib.es2023.array.d.ts",
		"lib.es2023.collection.d.ts",
		"lib.es2023.intl.d.ts",
		"lib.esnext.array.d.ts",
		"lib.esnext.collection.d.ts",
		"lib.esnext.intl.d.ts",
		"lib.esnext.disposable.d.ts",
		"lib.esnext.string.d.ts",
		"lib.esnext.promise.d.ts",
		"lib.esnext.decorators.d.ts",
		"lib.esnext.object.d.ts",
		"lib.esnext.regexp.d.ts",
		"lib.esnext.iterator.d.ts",
		"lib.decorators.d.ts",
		"lib.decorators.legacy.d.ts",
		"lib.esnext.full.d.ts",
	})
}
