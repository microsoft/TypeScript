package format_test

import (
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"
)

var (
	readmeLinkRe = regexp.MustCompile(`\]\(([^)#\s]+)(?:#[^)]*)?\)`)
	readmeCodeRe = regexp.MustCompile("`([^`]+)`")
	identRe      = regexp.MustCompile(`^[A-Za-z_][A-Za-z0-9_]*\*?$`)
)

// TestReadmeMatchesCode checks that README.md in this package does not refer to
// files or identifiers that no longer exist, such as names left over from the
// TypeScript 6 code base.
func TestReadmeMatchesCode(t *testing.T) {
	t.Parallel()

	content, err := os.ReadFile("README.md")
	if err != nil {
		t.Fatal(err)
	}
	readme := string(content)

	for _, m := range readmeLinkRe.FindAllStringSubmatch(readme, -1) {
		target := m[1]
		if strings.Contains(target, "://") {
			continue
		}
		if _, err := os.Stat(filepath.FromSlash(target)); err != nil {
			t.Errorf("README.md links to %q, which does not exist", target)
		}
	}

	names := packageNames(t)
	for _, m := range readmeCodeRe.FindAllStringSubmatch(readme, -1) {
		name := m[1]
		if !identRe.MatchString(name) {
			continue
		}
		if !names.has(name) {
			t.Errorf("README.md mentions `%s`, which is not declared or used in this package", name)
		}
	}
}

type nameSet map[string]struct{}

// has reports whether name is in the set. A trailing "*" matches any name with that prefix.
func (s nameSet) has(name string) bool {
	if prefix, ok := strings.CutSuffix(name, "*"); ok {
		for n := range s {
			if strings.HasPrefix(n, prefix) {
				return true
			}
		}
		return false
	}
	_, ok := s[name]
	return ok
}

// packageNames collects the names declared in this package's non-test files,
// along with the names it uses from other packages (such as ast.SourceFile).
func packageNames(t *testing.T) nameSet {
	t.Helper()
	files, err := filepath.Glob("*.go")
	if err != nil {
		t.Fatal(err)
	}
	names := nameSet{}
	fset := token.NewFileSet()
	for _, file := range files {
		if strings.HasSuffix(file, "_test.go") {
			continue
		}
		f, err := parser.ParseFile(fset, file, nil, parser.SkipObjectResolution)
		if err != nil {
			t.Fatal(err)
		}
		ast.Inspect(f, func(n ast.Node) bool {
			switch n := n.(type) {
			case *ast.FuncDecl:
				names[n.Name.Name] = struct{}{}
			case *ast.TypeSpec:
				names[n.Name.Name] = struct{}{}
			case *ast.ValueSpec:
				for _, id := range n.Names {
					names[id.Name] = struct{}{}
				}
			case *ast.SelectorExpr:
				names[n.Sel.Name] = struct{}{}
			}
			return true
		})
	}
	return names
}
