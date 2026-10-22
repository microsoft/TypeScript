package ls_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// TestParameterJSDocResolution verifies that parameter documentation follows
// Strada's services semantics:
//
//   - `@param` is only taken from the hosting declaration's own JSDoc:
//     parameters of an overriding method never inherit `@param` docs from base
//     signatures, even when the override has no JSDoc at all;
//   - a CONSTRUCTOR parameter without its own `@param` inherits the
//     documentation of a same-named property on the class's super types
//     (Strada's findBaseOfDeclaration), recursing through undocumented
//     overrides;
//   - Symbol.getJsDocTags for a parameter returns its matching `@param` tag.
func TestParameterJSDocResolution(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	content := `/** A greeter contract with documented method parameters. */
export abstract class MatcherBase {
  /**
   * Tests the value.
   * @param actual the target to match
   */
  public abstract test(actual: string): void;
}

/** Overrides test WITH its own JSDoc (summary only, no @param). */
export class CaptureLike extends MatcherBase {
  /** Captures the value. */
  public test(actual: string): void {
    void actual;
  }
}

/** Overrides test with NO JSDoc at all. */
export class PlainCapture extends MatcherBase {
  public test(actual: string): void {
    void actual;
  }
}

/** Constructor JSDoc with @param tags. */
export class Tagged {
  /**
   * Creates a tag.
   * @param key The string key for the tag.
   */
  constructor(key: string) {
    void key;
  }
}

/** Base class with a documented property. */
export class WithCount {
  /** How many widgets there are. */
  public readonly count: number = 0;
}

/** Subclass ctor without JSDoc: the param doc comes from base property count. */
export class Counted extends WithCount {
  constructor(count: number) {
    super();
    void count;
  }
}`

	fs := vfstest.FromMap(map[string]string{
		"/main.ts": content,
		"/tsconfig.json": `
				{
					"compilerOptions": { "strict": true },
					"files": ["main.ts"]
				}
			`,
	}, tspath.CaseInsensitive /*caseSensitivity*/)
	fs = bundled.WrapFS(fs)

	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, fs, nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")
	p := compiler.NewProgram(compiler.ProgramOptions{
		Config: parsed,
		Host:   host,
	})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/main.ts")

	firstParamOfMember := func(className string, memberName string) *ast.Symbol {
		for _, stmt := range file.Statements.Nodes {
			if !ast.IsClassDeclaration(stmt) || stmt.Name().Text() != className {
				continue
			}
			for _, member := range stmt.Members() {
				isCtor := ast.IsConstructorDeclaration(member)
				if (memberName == "constructor") != isCtor {
					continue
				}
				if !isCtor && (member.Name() == nil || member.Name().Text() != memberName) {
					continue
				}
				param := member.Parameters()[0]
				return param.Symbol()
			}
		}
		t.Fatalf("member %s.%s not found", className, memberName)
		return nil
	}

	docOf := func(className string, memberName string) string {
		return ls.GetSymbolDocumentationComment(c, firstParamOfMember(className, memberName))
	}
	tagsOf := func(className string, memberName string) []ls.JSDocTagInfo {
		return ls.GetSymbolJSDocTags(c, firstParamOfMember(className, memberName))
	}

	// Base declaration: @param from its own JSDoc, and getJsDocTags returns it.
	assert.Equal(t, docOf("MatcherBase", "test"), "the target to match")
	baseTags := tagsOf("MatcherBase", "test")
	assert.Equal(t, len(baseTags), 1)
	assert.Equal(t, baseTags[0].Name, "param")
	assert.Equal(t, baseTags[0].Text, "actual the target to match")

	// Method parameters never inherit @param from base signatures, whether the
	// override has its own (param-less) JSDoc or no JSDoc at all.
	assert.Equal(t, docOf("CaptureLike", "test"), "")
	assert.Equal(t, len(tagsOf("CaptureLike", "test")), 0)
	assert.Equal(t, docOf("PlainCapture", "test"), "")
	assert.Equal(t, len(tagsOf("PlainCapture", "test")), 0)

	// Constructor @param from own JSDoc.
	assert.Equal(t, docOf("Tagged", "constructor"), "The string key for the tag.")
	taggedTags := tagsOf("Tagged", "constructor")
	assert.Equal(t, len(taggedTags), 1)
	assert.Equal(t, taggedTags[0].Text, "key The string key for the tag.")

	// Constructor parameter with no own @param: documentation comes from the
	// same-named property on the base class (findBaseOfDeclaration).
	assert.Equal(t, docOf("Counted", "constructor"), "How many widgets there are.")
	assert.Equal(t, len(tagsOf("Counted", "constructor")), 0)
}
