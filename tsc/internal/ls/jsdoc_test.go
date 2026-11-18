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
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
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

// TestParameterJSDocTagsCollection covers the collection rules of Strada's
// getJSDocCommentsAndTags / getJSDocParameterTags for parameter symbols, with the
// expected values taken from the classic services on the same program:
//
//   - a parameter's own JSDoc tags are kept, before the host's `@param` tags;
//   - binding-pattern parameters match `@param` tags by position;
//   - `@param` tags are collected across the host's whole comment-location chain
//     (an outer tag behind an inner summary) and every match is returned;
//   - implementation signatures of overloads do not pick up `@param` tags from
//     the first overload;
//   - a class that implements itself must not recurse while resolving the
//     base-property fallback of its parameter property.
func TestParameterJSDocTagsCollection(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	content := `export class SelfImplementing implements SelfImplementing { constructor(public x: number) {} }
/** @param options configuration */
export function destructured({ x }: { x: number }) { void x; }
export function localTag(/** @deprecated use another argument */ x: number) { void x; }
/** @param x host doc */
export function localAndHost(/** @deprecated d */ x: number) { void x; }
/** @param x outer docs */
export const outerTag = /** Inner summary */ (x: number) => x;
/**
 * @param x first
 * @param x second
 */
export function duplicated(x: number) { void x; }
/** @param v doc on first overload */
export function overloaded(v: string): void;
export function overloaded(v: number): void;
export function overloaded(v: any) { void v; }
`
	fs := vfstest.FromMap(map[string]string{
		"/main.ts":       content,
		"/tsconfig.json": `{ "compilerOptions": { "strict": true }, "files": ["main.ts"] }`,
	}, tspath.CaseInsensitive /*caseSensitivity*/)
	fs = bundled.WrapFS(fs)

	host := compiler.NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)
	parsed, errors := tsoptions.GetParsedCommandLineOfConfigFile("/tsconfig.json", &core.CompilerOptions{}, nil, tsoptions.NewDefaultParseConfigHost(fs), nil)
	assert.Equal(t, len(errors), 0, "Expected no errors in parsed command line")
	p := compiler.NewProgram(compiler.ProgramOptions{Config: parsed, Host: host})
	p.BindSourceFiles()
	c, done := p.GetTypeChecker(t.Context())
	defer done()
	file := p.GetSourceFile("/main.ts")

	// firstParamOf returns the first parameter symbol of the named function-like
	// declaration: a class constructor, the n-th function declaration with that
	// name (overloads), or the arrow function initializing a const.
	firstParamOf := func(name string, nth int) *ast.Symbol {
		count := 0
		for _, stmt := range file.Statements.Nodes {
			var fn *ast.Node
			switch {
			case ast.IsClassDeclaration(stmt) && stmt.Name().Text() == name:
				fn = core.Find(stmt.Members(), ast.IsConstructorDeclaration)
			case ast.IsFunctionDeclaration(stmt) && stmt.Name().Text() == name:
				fn = stmt
			case ast.IsVariableStatement(stmt):
				for _, d := range stmt.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
					if d.Name().Text() == name && d.Initializer() != nil && ast.IsArrowFunction(d.Initializer()) {
						fn = d.Initializer()
					}
				}
			}
			if fn == nil {
				continue
			}
			if count == nth {
				return fn.Parameters()[0].Symbol()
			}
			count++
		}
		t.Fatalf("declaration %s[%d] not found", name, nth)
		return nil
	}
	tagsOf := func(sym *ast.Symbol) []string {
		var out []string
		for _, tag := range ls.GetSymbolJSDocTags(c, sym) {
			out = append(out, tag.Name+"="+tag.Text)
		}
		return out
	}

	// A class implementing itself: the base-property fallback resolves back to the
	// queried parameter property and must stop instead of recursing.
	self := firstParamOf("SelfImplementing", 0)
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, self), "")
	assert.Equal(t, len(tagsOf(self)), 0)

	// Binding pattern: matched by position.
	destructured := firstParamOf("destructured", 0)
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, destructured), "configuration")
	assert.DeepEqual(t, tagsOf(destructured), []string{"param=options configuration"})

	// Tags attached directly to the parameter are kept; with a host @param the
	// local tags come first and both comments contribute to the documentation.
	local := firstParamOf("localTag", 0)
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, local), "")
	assert.DeepEqual(t, tagsOf(local), []string{"deprecated=use another argument"})
	both := firstParamOf("localAndHost", 0)
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, both), "host doc")
	assert.DeepEqual(t, tagsOf(both), []string{"deprecated=d", "param=x host doc"})

	// The @param on the variable statement is found behind the arrow function's
	// own summary-only JSDoc.
	outer := firstParamOf("outerTag", 0)
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, outer), "outer docs")
	assert.DeepEqual(t, tagsOf(outer), []string{"param=x outer docs"})

	// Every matching @param is returned, and the documentation joins them.
	dup := firstParamOf("duplicated", 0)
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, dup), "first\nsecond")
	assert.DeepEqual(t, tagsOf(dup), []string{"param=x first", "param=x second"})

	// Only the first overload carries the documentation; later signatures and the
	// implementation have their own, undocumented parameters.
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, firstParamOf("overloaded", 0)), "doc on first overload")
	assert.DeepEqual(t, tagsOf(firstParamOf("overloaded", 0)), []string{"param=v doc on first overload"})
	assert.Equal(t, ls.GetSymbolDocumentationComment(c, firstParamOf("overloaded", 2)), "")
	assert.Equal(t, len(tagsOf(firstParamOf("overloaded", 2))), 0)
}
