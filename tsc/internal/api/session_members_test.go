package api

import (
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

const membersTestFile = "/home/projects/p/src/index.ts"

const membersTestSource = `export class Base {
    /** base doc */
    readonly baseProp: string = "";
}
export class C extends Base {
    /** doc for own */
    readonly own: number = 1;
    /** @internal */
    readonly hidden = 2;
    private secret = 3;
    readonly _under = 4;
    /** @deprecated gone */
    readonly old = 5;
    #ecmaPrivate = 6;
    constructor(public readonly fromCtor: string) { super(); }
    method(): void {}
    /** accessor doc */
    get size(): number { return 0; }
    set size(value: number) {}
}
`

type membersTestContext struct {
	session  *Session
	snapshot SnapshotID
	project  project.Handle
	source   string
}

func setupMembersTest(t *testing.T) (*membersTestContext, func()) {
	return setupMembersTestWithSource(t, membersTestSource)
}

func setupMembersTestWithSource(t *testing.T, source string) (*membersTestContext, func()) {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}
	files := map[string]any{
		"/home/projects/p/tsconfig.json": `{ "compilerOptions": { "strict": true } }`,
		membersTestFile:                  source,
	}
	projectSession, _ := projecttestutil.Setup(files)
	session := NewLSPSession(projectSession, nil)
	snapshotResp, err := session.handleCreateSnapshot(t.Context(), &CreateSnapshotParams{
		OpenFiles: []DocumentIdentifier{{FileName: membersTestFile}},
	})
	assert.NilError(t, err)
	proj, err := session.handleGetDefaultProjectForFile(t.Context(), &GetDefaultProjectForFileParams{
		Snapshot: snapshotResp.Snapshot,
		File:     DocumentIdentifier{FileName: membersTestFile},
	})
	assert.NilError(t, err)
	assert.Assert(t, proj != nil)
	ctx := &membersTestContext{session: session, snapshot: snapshotResp.Snapshot, project: proj.Handle, source: source}
	return ctx, func() {
		session.Close()
		projectSession.Close()
	}
}

// classSymbol returns the symbol of the class declared as `export class <name>`.
func (c *membersTestContext) classSymbol(t *testing.T, name string) *SymbolResponse {
	t.Helper()
	return c.declarationSymbol(t, "export class "+name)
}

// declarationSymbol returns the symbol of the name that follows `marker` in the source.
func (c *membersTestContext) declarationSymbol(t *testing.T, marker string) *SymbolResponse {
	t.Helper()
	pos := strings.Index(c.source, marker)
	assert.Assert(t, pos >= 0, "marker %q not found", marker)
	symbol, err := c.session.handleGetSymbolAtPosition(t.Context(), &GetSymbolAtPositionParams{
		Snapshot: c.snapshot,
		Project:  c.project,
		File:     DocumentIdentifier{FileName: membersTestFile},
		Position: uint32(pos + len(marker)),
	})
	assert.NilError(t, err)
	assert.Assert(t, symbol != nil, "%q should be followed by a declaration with a symbol", marker)
	return symbol
}

func (c *membersTestContext) declaredType(t *testing.T, symbol *SymbolResponse) *TypeResponse {
	t.Helper()
	typeResp, err := c.session.handleGetDeclaredTypeOfSymbol(t.Context(), &GetTypeOfSymbolParams{
		Snapshot: c.snapshot,
		Project:  c.project,
		Symbol:   symbol.Reference,
	})
	assert.NilError(t, err)
	assert.Assert(t, typeResp != nil)
	return typeResp
}

func memberNames(members []*MemberResponse) []string {
	names := make([]string, len(members))
	for i, m := range members {
		names[i] = m.Symbol.Name
	}
	return names
}

func TestGetMembersOfTypeCombinesPredicatesLikeATraversal(t *testing.T) {
	t.Parallel()
	ctx, cleanup := setupMembersTest(t)
	defer cleanup()

	class := ctx.classSymbol(t, "C")
	instanceType := ctx.declaredType(t, class)

	// jsii's member policy expressed with the neutral predicates: public/protected
	// only, no @internal / @deprecated, no underscore names, own members only.
	members, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter: MemberFilter{
			Visibility:           []string{"public", "protected"},
			ExcludeJsDocTags:     []string{"internal", "deprecated"},
			ExcludeNamePattern:   "^_",
			IncludeInheritedFrom: &InheritedMemberFilter{},
			IncludeDeclaredType:  true,
		},
	})
	assert.NilError(t, err)
	// baseProp is declared on Base (not the queried type); hidden (@internal), secret
	// (private), _under (underscore), #ecmaPrivate (private) and old (@deprecated) are
	// filtered out.
	assert.DeepEqual(t, memberNames(members), []string{"own", "fromCtor", "method", "size"})

	byName := map[string]*MemberResponse{}
	for _, m := range members {
		byName[m.Symbol.Name] = m
	}
	own := byName["own"]
	assert.Equal(t, own.Comment, "doc for own")
	assert.Assert(t, own.DeclaredType != nil, "non-method members carry their declared type")
	assert.Assert(t, !own.IsMethod)
	assert.Assert(t, own.Owner != nil && own.Owner.Reference.Id == class.Reference.Id, "owner is the declaring class")

	fromCtor := byName["fromCtor"]
	assert.Assert(t, fromCtor.IsParameterProperty)
	assert.Assert(t, fromCtor.DeclaredType != nil)

	method := byName["method"]
	assert.Assert(t, method.IsMethod)
	assert.Assert(t, method.DeclaredType == nil, "methods are rendered from their signature, no declared type")

	size := byName["size"]
	assert.Assert(t, !size.IsMethod, "an accessor is not a method")
	assert.Equal(t, size.Comment, "accessor doc")
	assert.Assert(t, size.DeclaredType != nil, "an accessor carries its declared type like a property")

	// The declared type handle is the same type the checker reports for the symbol:
	// one id per type on the single API checker, so handles stay comparable.
	direct, err := ctx.session.handleGetTypeOfSymbol(t.Context(), &GetTypeOfSymbolParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Symbol:   own.Symbol.Reference,
	})
	assert.NilError(t, err)
	assert.Equal(t, direct.Id, own.DeclaredType.Id)
}

func TestGetMembersOfTypeInheritedFromAndKinds(t *testing.T) {
	t.Parallel()
	ctx, cleanup := setupMembersTest(t)
	defer cleanup()

	class := ctx.classSymbol(t, "C")
	base := ctx.classSymbol(t, "Base")
	instanceType := ctx.declaredType(t, class)

	members, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter: MemberFilter{
			Visibility:           []string{"public", "protected"},
			ExcludeNamePattern:   "^_",
			IncludeInheritedFrom: &InheritedMemberFilter{DeclaringTypes: []SymbolReference{base.Reference}},
		},
	})
	assert.NilError(t, err)
	names := strings.Join(memberNames(members), ",")
	assert.Assert(t, strings.Contains(names, "baseProp"), "base members are admitted when the base is a declaring type: %v", names)
	assert.Assert(t, strings.Contains(names, "old"), "deprecated members stay without an excluded tag: %v", names)
	assert.Assert(t, strings.Contains(names, "hidden"), "@internal members stay without an excluded tag: %v", names)
	assert.Assert(t, !strings.Contains(names, "secret") && !strings.Contains(names, "#ecmaPrivate"), "private members are dropped by visibility: %v", names)
	for _, m := range members {
		assert.Assert(t, m.DeclaredType == nil, "no declared types unless requested")
	}

	// nil IncludeInheritedFrom means every declaring type, like getPropertiesOfType.
	all, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
	})
	assert.NilError(t, err)
	props, err := ctx.session.handleGetPropertiesOfType(t.Context(), &CheckerTypeParams{Snapshot: ctx.snapshot, Project: ctx.project, Type: instanceType.Id})
	assert.NilError(t, err)
	assert.Equal(t, len(all), len(props), "an empty filter returns every property")

	// Kinds select by declaration shape.
	methods, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter:   MemberFilter{Kinds: []string{"method"}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(methods), []string{"method"})
	paramProps, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter:   MemberFilter{Kinds: []string{"parameterProperty"}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(paramProps), []string{"fromCtor"})
	accessors, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter:   MemberFilter{Kinds: []string{"accessor"}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(accessors), []string{"size"})
	properties, err := ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter:   MemberFilter{Kinds: []string{"property"}},
	})
	assert.NilError(t, err)
	assert.Assert(t, !slices.Contains(memberNames(properties), "size"), "an accessor is not a property: %v", memberNames(properties))
	assert.Assert(t, !slices.Contains(memberNames(properties), "method"), "a method is not a property: %v", memberNames(properties))
	// isMethod agrees with the "method" kind for every member, whichever filter admitted it.
	for _, m := range all {
		assert.Equal(t, m.IsMethod, slices.Contains(memberNames(methods), m.Symbol.Name), "isMethod of %s", m.Symbol.Name)
	}

	_, err = ctx.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
		Filter:   MemberFilter{ExcludeNamePattern: "("},
	})
	assert.ErrorContains(t, err, "invalid excludeNamePattern")
}

func TestGetSymbolDocumentationsMatchesIndividualCalls(t *testing.T) {
	t.Parallel()
	ctx, cleanup := setupMembersTest(t)
	defer cleanup()

	class := ctx.classSymbol(t, "C")
	instanceType := ctx.declaredType(t, class)
	props, err := ctx.session.handleGetPropertiesOfType(t.Context(), &CheckerTypeParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Type:     instanceType.Id,
	})
	assert.NilError(t, err)
	assert.Assert(t, len(props) > 3)

	refs := make([]SymbolReference, len(props))
	for i, p := range props {
		refs[i] = p.Reference
	}
	docs, err := ctx.session.handleGetSymbolDocumentations(t.Context(), &GetSymbolDocumentationsParams{
		Snapshot: ctx.snapshot,
		Project:  ctx.project,
		Symbols:  refs,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(docs), len(props))
	for i, p := range props {
		tags, err := ctx.session.handleGetJSDocTags(t.Context(), &CheckerSymbolParams{Snapshot: ctx.snapshot, Project: ctx.project, Symbol: p.Reference})
		assert.NilError(t, err)
		comment, err := ctx.session.handleGetDocumentationComment(t.Context(), &CheckerSymbolParams{Snapshot: ctx.snapshot, Project: ctx.project, Symbol: p.Reference})
		assert.NilError(t, err)
		assert.Equal(t, docs[i].Comment, comment, "comment of %s", p.Name)
		assert.Equal(t, len(docs[i].Tags), len(tags), "tags of %s", p.Name)
		for j := range tags {
			assert.Equal(t, *docs[i].Tags[j], *tags[j])
		}
	}
}
