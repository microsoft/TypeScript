package checker

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/symlinks"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// templateLiteralTestProgram is a minimal Program implementation, just enough to
// construct a Checker for testing template literal union reduction without
// importing the compiler package (which would create an import cycle).
type templateLiteralTestProgram struct {
	options *core.CompilerOptions
}

func (p *templateLiteralTestProgram) Options() *core.CompilerOptions { return p.options }
func (p *templateLiteralTestProgram) SourceFiles() []*ast.SourceFile { return nil }
func (p *templateLiteralTestProgram) BindSourceFiles()               {}
func (p *templateLiteralTestProgram) FileExists(fileName string) bool {
	return false
}

func (p *templateLiteralTestProgram) GetSourceFile(fileName string) *ast.SourceFile {
	return nil
}

func (p *templateLiteralTestProgram) GetSourceFileForResolvedModule(fileName string) *ast.SourceFile {
	return nil
}

func (p *templateLiteralTestProgram) GetEmitModuleFormatOfFile(sourceFile ast.HasFileName) core.ModuleKind {
	return core.ModuleKindESNext
}

func (p *templateLiteralTestProgram) GetEmitSyntaxForUsageLocation(sourceFile ast.HasFileName, usageLocation *ast.StringLiteralLike) core.ResolutionMode {
	return core.ResolutionModeNone
}

func (p *templateLiteralTestProgram) GetImpliedNodeFormatForEmit(sourceFile ast.HasFileName) core.ModuleKind {
	return core.ModuleKindESNext
}

func (p *templateLiteralTestProgram) GetResolvedModule(currentSourceFile ast.HasFileName, moduleReference string, mode core.ResolutionMode) *module.ResolvedModule {
	return nil
}

func (p *templateLiteralTestProgram) GetResolvedModules() map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule] {
	return nil
}
func (p *templateLiteralTestProgram) GetPackagesMap() map[string]bool { return nil }
func (p *templateLiteralTestProgram) GetSourceFileMetaData(path tspath.Path) ast.SourceFileMetaData {
	return ast.SourceFileMetaData{}
}

func (p *templateLiteralTestProgram) GetJSXRuntimeImportSpecifier(path tspath.Path) (moduleReference string, specifier *ast.Node) {
	return "", nil
}

func (p *templateLiteralTestProgram) GetImportHelpersImportSpecifier(path tspath.Path) *ast.Node {
	return nil
}

func (p *templateLiteralTestProgram) SourceFileMayBeEmitted(sourceFile *ast.SourceFile, forceDtsEmit bool) bool {
	return false
}

func (p *templateLiteralTestProgram) IsSourceFileDefaultLibrary(path tspath.Path) bool {
	return false
}

func (p *templateLiteralTestProgram) GetProjectReferenceFromOutputDts(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return nil
}

func (p *templateLiteralTestProgram) GetRedirectForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
	return nil
}
func (p *templateLiteralTestProgram) CommonSourceDirectory() string { return "" }
func (p *templateLiteralTestProgram) GetSymlinkCache() *symlinks.KnownSymlinks {
	return nil
}
func (p *templateLiteralTestProgram) ContentMapperExtensions() []string     { return nil }
func (p *templateLiteralTestProgram) GetGlobalTypingsCacheLocation() string { return "" }
func (p *templateLiteralTestProgram) UseCaseSensitiveFileNames() bool       { return false }
func (p *templateLiteralTestProgram) GetCurrentDirectory() string           { return "" }
func (p *templateLiteralTestProgram) GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
	return nil
}
func (p *templateLiteralTestProgram) GetRedirectTargets(path tspath.Path) []string { return nil }
func (p *templateLiteralTestProgram) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string {
	return ""
}

func (p *templateLiteralTestProgram) GetNearestAncestorDirectoryWithPackageJson(dirname string) string {
	return ""
}

func (p *templateLiteralTestProgram) GetPackageJsonInfo(pkgJsonPath string) *packagejson.InfoCacheEntry {
	return nil
}

func (p *templateLiteralTestProgram) GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode {
	return core.ResolutionModeNone
}

func (p *templateLiteralTestProgram) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
	return nil
}

func (p *templateLiteralTestProgram) GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode {
	return core.ResolutionModeNone
}

// buildTemplateLiteralUnionTypes creates `literals` string literal types and `templates`
// template literal types for one of three shapes:
//
//   - "sharedPrefixDistinctSuffix": every template is `/${string}/section<i>`, shaped
//     like the dynamic route patterns from
//     https://github.com/microsoft/TypeScript/issues/63342. The shared "/" prefix cannot
//     discriminate between templates; only the final static text can.
//   - "sharedPrefixEmptySuffix": template i consists of i+1 `/${string}` segments with
//     no final static text, so neither prefix nor suffix can discriminate. This is the
//     worst case for the trie: every candidate bucket holds every template.
//   - "distinctPrefix": every template is `/route<i>/${string}` with its own prefix,
//     like `${StaticRoute}${Search}` patterns. The prefix trie prunes aggressively.
//
// In the "sharedPrefixDistinctSuffix" and "distinctPrefix" shapes, half of the literals
// match one template each and the other half match nothing.
func buildTemplateLiteralUnionTypes(c *Checker, shape string, literals int, templates int) (types []*Type, literalTypes []*Type, templateTypes []*Type) {
	for i := range literals {
		var value string
		matching := i%2 == 0 && i/2 < templates
		switch shape {
		case "sharedPrefixDistinctSuffix":
			if matching {
				value = "/slug/section" + strconv.Itoa(i/2)
			} else {
				value = "/slug/other" + strconv.Itoa(i)
			}
		case "sharedPrefixEmptySuffix":
			segments := 1
			if matching {
				segments = i/2 + 1
			}
			var sb strings.Builder
			for j := range segments {
				sb.WriteString("/slug")
				sb.WriteString(strconv.Itoa(j))
			}
			value = sb.String()
		case "distinctPrefix":
			if matching {
				value = "/route" + strconv.Itoa(i/2) + "/rest"
			} else {
				value = "/other" + strconv.Itoa(i) + "/rest"
			}
		}
		t := c.getStringLiteralType(value)
		types = append(types, t)
		literalTypes = append(literalTypes, t)
	}
	for i := range templates {
		var t *Type
		switch shape {
		case "sharedPrefixDistinctSuffix":
			t = c.getTemplateLiteralType([]string{"/", "/section" + strconv.Itoa(i)}, []*Type{c.stringType})
		case "sharedPrefixEmptySuffix":
			texts := make([]string, i+2)
			placeholders := make([]*Type, i+1)
			for j := range texts {
				texts[j] = "/"
			}
			texts[len(texts)-1] = ""
			for j := range placeholders {
				placeholders[j] = c.stringType
			}
			t = c.getTemplateLiteralType(texts, placeholders)
		case "distinctPrefix":
			t = c.getTemplateLiteralType([]string{"/route" + strconv.Itoa(i) + "/", ""}, []*Type{c.stringType})
		}
		types = append(types, t)
		templateTypes = append(templateTypes, t)
	}
	return types, literalTypes, templateTypes
}

var benchmarkShapes = []string{"sharedPrefixDistinctSuffix", "sharedPrefixEmptySuffix", "distinctPrefix"}

func BenchmarkRemoveStringLiteralsMatchedByTemplateLiterals(b *testing.B) {
	c, _ := NewChecker(&templateLiteralTestProgram{options: &core.CompilerOptions{}}, nil)
	for _, shape := range benchmarkShapes {
		for _, literals := range []int{1, 2, 4, 8, 16, 32, 64, 128} {
			for _, templates := range []int{1, 2, 4, 8, 16, 32, 64, 128} {
				types, _, _ := buildTemplateLiteralUnionTypes(c, shape, literals, templates)
				b.Run(fmt.Sprintf("%s/literals=%d/templates=%d", shape, literals, templates), func(b *testing.B) {
					var sink []*Type
					for b.Loop() {
						sink = c.removeStringLiteralsMatchedByTemplateLiterals(slices.Clone(types))
					}
					_ = sink
				})
			}
		}
	}
}

// BenchmarkTemplateLiteralMatchingPaths compares the two matching strategies directly,
// including the per-call trie construction in the trie path, to determine the union
// sizes at which building the trie pays off.
func BenchmarkTemplateLiteralMatchingPaths(b *testing.B) {
	c, _ := NewChecker(&templateLiteralTestProgram{options: &core.CompilerOptions{}}, nil)
	for _, shape := range benchmarkShapes {
		for _, literals := range []int{1, 2, 4, 8, 16, 32, 64, 128} {
			for _, templates := range []int{1, 2, 4, 8, 16, 32, 64, 128} {
				_, literalTypes, templateTypes := buildTemplateLiteralUnionTypes(c, shape, literals, templates)
				b.Run(fmt.Sprintf("%s/literals=%d/templates=%d/linear", shape, literals, templates), func(b *testing.B) {
					var sink bool
					for b.Loop() {
						for _, lit := range literalTypes {
							sink = core.Some(templateTypes, func(tl *Type) bool {
								return c.isTypeMatchedByTemplateLiteralType(lit, tl.AsTemplateLiteralType(), c.compareTypesAssignable)
							})
						}
					}
					_ = sink
				})
				b.Run(fmt.Sprintf("%s/literals=%d/templates=%d/trie", shape, literals, templates), func(b *testing.B) {
					var sink *Type
					for b.Loop() {
						trie := c.buildTemplateLiteralTrieFromTypes(templateTypes)
						for _, lit := range literalTypes {
							sink = c.findMatchingTemplateLiteralInTrie(trie, lit, c.compareTypesAssignable)
						}
					}
					_ = sink
				})
			}
		}
	}
}
