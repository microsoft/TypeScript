package ls

import (
	"context"
	"fmt"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type findReferencesParseConfigHost struct {
	fs vfs.FS
}

func (h *findReferencesParseConfigHost) FS() vfs.FS {
	return h.fs
}

func (h *findReferencesParseConfigHost) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return "/"
}

// provideSymbolsAndEntries drives go-to-implementation with a breadth-first worklist. When an
// interface member has K implementations, every one of those K program-wide searches returns
// all K implementations. Without deduplicating, the retained references, the work queue, and the
// retained SymbolsAndEntries groups all grow O(K^2), which can exhaust memory on large,
// deeply-typed programs.
//
// The final LSP response is deduplicated by node, so the blow-up is invisible from the response;
// this white-box test inspects the pre-deduplication data that provideSymbolsAndEntries returns
// and asserts that both the accumulated reference count and the group count grow ~linearly with K
// (quadratic growth roughly quadruples when K doubles; deduplicated growth roughly doubles). The
// reference count is the faithful proxy for the memory cost (the actual OOM is retained references
// x per-reference checker state; a minimal repro has tiny per-reference state, so raw bytes are
// dominated by the inherent O(K^2) search work and do not discriminate). Because each reference
// node is enqueued at most once, the work queue is bounded by the reference count; the group count
// separately guards against retaining one group per search result.
func TestImplementationsWorklistDoesNotBlowUp(t *testing.T) {
	t.Parallel()

	measure := func(k int) (refs int, groups int) {
		var b strings.Builder
		b.WriteString("interface I { m(): void; }\n")
		for i := range k {
			fmt.Fprintf(&b, "const a%d: I = { m() {} };\n", i)
		}
		b.WriteString("declare const i: I;\n")
		b.WriteString("i.m();\n")
		content := b.String()

		fs := vfstest.FromMap(map[string]string{
			"/repro.ts":      content,
			"/tsconfig.json": `{ "compilerOptions": {}, "files": ["repro.ts"] }`,
		}, tspath.CaseInsensitive /*caseSensitivity*/)
		fs = bundled.WrapFS(fs)

		host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
		parseHost := &findReferencesParseConfigHost{fs: fs}
		parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, parseHost, nil)
		assert.Equal(t, len(errors), 0)
		program := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
		program.BindSourceFiles()
		program.GetSemanticDiagnostics(context.Background(), program.GetSourceFile("/repro.ts"))

		sourceFile := program.GetSourceFile("/repro.ts")
		converters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ tspath.RootedFilePath) *lsconv.LSPLineMap {
			return lsconv.ComputeLSPLineStarts(content)
		})
		l := &LanguageService{program: program, converters: converters}

		// Position of the `m` property in the final `i.m();`.
		offset := strings.LastIndex(content, "i.m") + len("i.")
		pos, _ := converters.ToLSPPosition(sourceFile, core.TextPos(offset))

		data, ok := l.provideSymbolsAndEntries(context.Background(), "file:///repro.ts", pos, false /*isRename*/, true /*implementations*/)
		assert.Assert(t, ok)
		for _, se := range data.SymbolsAndEntries {
			refs += len(se.references)
		}
		return refs, len(data.SymbolsAndEntries)
	}

	const k = 40
	smallRefs, smallGroups := measure(k)
	largeRefs, largeGroups := measure(2 * k)
	t.Logf("K=%d -> %d refs / %d groups; K=%d -> %d refs / %d groups (ref ratio %.2f, group ratio %.2f)",
		k, smallRefs, smallGroups, 2*k, largeRefs, largeGroups,
		float64(largeRefs)/float64(smallRefs), float64(largeGroups)/float64(smallGroups))

	// Retained references (and, since each is enqueued at most once, the work queue) must grow
	// ~linearly (~2x when K doubles). The un-deduplicated worklist grows ~4x. Fail above 3x.
	assert.Assert(t, largeRefs <= smallRefs*3,
		"implementations worklist references scale superlinearly: K=%d -> %d, K=%d -> %d (expected ~linear); "+
			"provideSymbolsAndEntries accumulates references without deduplicating by node", k, smallRefs, 2*k, largeRefs)

	// Retained SymbolsAndEntries groups must also grow ~linearly. Appending one group per search
	// result (K searches, each returning all K implementations) grows ~4x; dropping duplicate
	// empty groups keeps it bounded by the distinct definitions. Fail above 3x.
	assert.Assert(t, largeGroups <= smallGroups*3,
		"implementations worklist groups scale superlinearly: K=%d -> %d, K=%d -> %d (expected ~linear); "+
			"provideSymbolsAndEntries retains a group per search result without deduplicating by definition", k, smallGroups, 2*k, largeGroups)
}
