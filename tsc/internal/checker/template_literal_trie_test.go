package checker

import (
	"slices"
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

// assertSameTypes asserts that two type slices contain the same types in the same order.
// Types are interned per Checker, so pointer identity is sufficient.
func assertSameTypes(t *testing.T, got []*Type, want []*Type) {
	t.Helper()
	assert.Equal(t, len(got), len(want), "got %d types, want %d", len(got), len(want))
	for i := range want {
		assert.Assert(t, got[i] == want[i], "type %d differs", i)
	}
}

func newTemplateLiteralTestChecker() *Checker {
	c, _ := NewChecker(&templateLiteralTestProgram{options: &core.CompilerOptions{}}, nil)
	return c
}

func TestFindMatchingTemplateLiteralInTrie(t *testing.T) {
	t.Parallel()
	c := newTemplateLiteralTestChecker()

	billing := c.getTemplateLiteralType([]string{"/app/", "/billing"}, []*Type{c.stringType})
	settings := c.getTemplateLiteralType([]string{"/app/", "/settings"}, []*Type{c.stringType})
	catchAllApp := c.getTemplateLiteralType([]string{"/app/", ""}, []*Type{c.stringType})
	overlap := c.getTemplateLiteralType([]string{"aa", "aa"}, []*Type{c.stringType})
	number := c.getTemplateLiteralType([]string{"", ""}, []*Type{c.numberType})

	trie := c.buildTemplateLiteralTrieFromTypes([]*Type{billing, settings, catchAllApp, overlap})

	for _, tc := range []struct {
		value string
		match bool
	}{
		{"/app/acme/billing", true},
		{"/app/acme/settings", true},
		{"/app/anything", true}, // matched by `/app/${string}`
		{"/app/", true},
		{"/app", false}, // shorter than the "/app/" prefix
		{"/admin/acme/billing", false},
		{"aaa", false}, // `aa${string}aa` cannot match: the static prefix and suffix would overlap
		{"aaaa", true},
		{"aa", false},
		{"", false},
	} {
		source := c.getStringLiteralType(tc.value)
		got := c.findMatchingTemplateLiteralInTrie(trie, source, c.compareTypesAssignable)
		assert.Equal(t, got != nil, tc.match, "value %q", tc.value)
	}

	// An empty-prefix template like `${number}` is stored at the root and still matches.
	trie = c.buildTemplateLiteralTrieFromTypes([]*Type{billing, number})
	assert.Assert(t, c.findMatchingTemplateLiteralInTrie(trie, c.getStringLiteralType("123"), c.compareTypesAssignable) != nil)
	assert.Assert(t, c.findMatchingTemplateLiteralInTrie(trie, c.getStringLiteralType("/unrelated"), c.compareTypesAssignable) == nil)
}

func TestRemoveStringLiteralsMatchedByTemplateLiterals(t *testing.T) {
	t.Parallel()

	newTemplate := func(c *Checker, texts ...string) *Type {
		types := make([]*Type, len(texts)-1)
		for i := range types {
			types[i] = c.stringType
		}
		return c.getTemplateLiteralType(texts, types)
	}

	t.Run("small union takes the linear path", func(t *testing.T) {
		t.Parallel()
		c := newTemplateLiteralTestChecker()
		up1 := c.getStringLiteralType("up1")
		other := c.getStringLiteralType("other")
		up := newTemplate(c, "up", "")
		result := c.removeStringLiteralsMatchedByTemplateLiterals([]*Type{up1, other, up})
		assertSameTypes(t, result, []*Type{other, up})
	})

	t.Run("static prefix and suffix cannot overlap", func(t *testing.T) {
		t.Parallel()
		c := newTemplateLiteralTestChecker()
		aaa := c.getStringLiteralType("aaa")
		aaaa := c.getStringLiteralType("aaaa")
		pattern := newTemplate(c, "aa", "aa")
		result := c.removeStringLiteralsMatchedByTemplateLiterals([]*Type{aaa, aaaa, pattern})
		assertSameTypes(t, result, []*Type{aaa, pattern})
	})

	t.Run("empty prefix template", func(t *testing.T) {
		t.Parallel()
		c := newTemplateLiteralTestChecker()
		numeric := c.getStringLiteralType("1")
		alpha := c.getStringLiteralType("a")
		number := c.getTemplateLiteralType([]string{"", ""}, []*Type{c.numberType})
		result := c.removeStringLiteralsMatchedByTemplateLiterals([]*Type{numeric, alpha, number})
		assertSameTypes(t, result, []*Type{alpha, number})
	})

	t.Run("large union takes the trie path", func(t *testing.T) {
		t.Parallel()
		c := newTemplateLiteralTestChecker()
		// 32 literals x 16 templates with a shared prefix and distinct suffixes meets the
		// trie threshold. Even-indexed literals match one template each, odd-indexed
		// literals match nothing.
		types, _, templateTypes := buildTemplateLiteralUnionTypes(c, "sharedPrefixDistinctSuffix", 32, 16)
		result := c.removeStringLiteralsMatchedByTemplateLiterals(slices.Clone(types))

		expected := make([]*Type, 0, 32)
		for i := 1; i < 32; i += 2 {
			expected = append(expected, c.getStringLiteralType("/slug/other"+strconv.Itoa(i)))
		}
		expected = append(expected, templateTypes...)
		assertSameTypes(t, result, expected)
	})
}
