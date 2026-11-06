package api

import (
	"slices"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

// The differential fixture: a class hierarchy with every member shape a traversal
// tool distinguishes. getMembersOfType must report, for each member, exactly what the
// fine-grained path (getPropertiesOfType + getTypeOfSymbolAtLocation + getJsDocTags +
// getDocumentationComment + the declaration's modifiers) reports, in the same order.
const differentialTestSource = `export interface Shape {
    /** area doc */
    area(): number;
}
export class Base {
    /** base doc */
    readonly baseProp: string = "";
    /** overridden below */
    describe(): string { return ""; }
    protected helper(): void {}
    /** base accessor */
    get size(): number { return 0; }
    set size(value: number) {}
}
export class Derived extends Base implements Shape {
    /** @internal */
    readonly hidden = 2;
    readonly _under = 4;
    /** @deprecated gone */
    readonly old = 5;
    /** own description */
    describe(): string { return "derived"; }
    /** overloaded */
    area(): number;
    area(scale: number): number;
    area(scale?: number): number { return scale ?? 1; }
    /** accessor doc */
    get label(): string { return ""; }
    set label(value: string) {}
    private secret = 3;
    protected guarded = 7;
    #ecmaPrivate = 6;
    constructor(public readonly fromCtor: string, private readonly fromCtorPrivate: number) { super(); }
    static create(): Derived { return new Derived("", 0); }
}
`

// expectedMember is the hand-written description of one instance member of Derived.
type expectedMember struct {
	visibility string
	kind       string
	owner      string
	tags       []string
	comment    string
}

// expectedMembers is keyed by the member's wire-form name (the ECMAScript private
// field is matched by its "__#<n>@#ecmaPrivate" form below).
var expectedMembers = map[string]expectedMember{
	"hidden":          {"public", "property", "Derived", []string{"internal"}, ""},
	"_under":          {"public", "property", "Derived", nil, ""},
	"old":             {"public", "property", "Derived", []string{"deprecated"}, ""},
	"describe":        {"public", "method", "Derived", nil, "own description"},
	"area":            {"public", "method", "Derived", nil, "overloaded"},
	"label":           {"public", "accessor", "Derived", nil, "accessor doc"},
	"secret":          {"private", "property", "Derived", nil, ""},
	"guarded":         {"protected", "property", "Derived", nil, ""},
	"#ecmaPrivate":    {"private", "property", "Derived", nil, ""},
	"fromCtor":        {"public", "parameterProperty", "Derived", nil, ""},
	"fromCtorPrivate": {"private", "parameterProperty", "Derived", nil, ""},
	"baseProp":        {"public", "property", "Base", nil, "base doc"},
	"helper":          {"protected", "method", "Base", nil, ""},
	"size":            {"public", "accessor", "Base", nil, "base accessor"},
}

// displayName maps a wire-form name back to the fixture's key.
func displayName(wireName string) string {
	if i := strings.Index(wireName, "@#"); strings.HasPrefix(wireName, "__#") && i >= 0 {
		return wireName[i+1:]
	}
	return wireName
}

func displayNames(members []*MemberResponse) []string {
	names := make([]string, len(members))
	for i, m := range members {
		names[i] = displayName(m.Symbol.Name)
	}
	return names
}

// fineGrainedMember is what a traversal assembles per property from the existing
// methods, several round trips per member.
type fineGrainedMember struct {
	symbol       *SymbolResponse
	declaredType *TypeResponse
	tags         []*JSDocTagInfo
	comment      string
}

func (c *membersTestContext) fineGrainedMembers(t *testing.T, instanceType *TypeResponse) []fineGrainedMember {
	t.Helper()
	props, err := c.session.handleGetPropertiesOfType(t.Context(), &CheckerTypeParams{Snapshot: c.snapshot, Project: c.project, Type: instanceType.Id})
	assert.NilError(t, err)
	members := make([]fineGrainedMember, len(props))
	for i, prop := range props {
		assert.Assert(t, len(prop.Declarations) > 0, "%s has a declaration", prop.Name)
		declaredType, err := c.session.handleGetTypeOfSymbolAtLocation(t.Context(), &GetTypeOfSymbolAtLocationParams{
			Snapshot: c.snapshot,
			Project:  c.project,
			Symbol:   prop.Reference,
			Location: requestNodeHandle(t, prop.Declarations[0]),
		})
		assert.NilError(t, err)
		tags, err := c.session.handleGetJSDocTags(t.Context(), &CheckerSymbolParams{Snapshot: c.snapshot, Project: c.project, Symbol: prop.Reference})
		assert.NilError(t, err)
		comment, err := c.session.handleGetDocumentationComment(t.Context(), &CheckerSymbolParams{Snapshot: c.snapshot, Project: c.project, Symbol: prop.Reference})
		assert.NilError(t, err)
		members[i] = fineGrainedMember{symbol: prop, declaredType: declaredType, tags: tags, comment: comment}
	}
	return members
}

func (c *membersTestContext) membersOf(t *testing.T, instanceType *TypeResponse, filter MemberFilter) []*MemberResponse {
	t.Helper()
	members, err := c.session.handleGetMembersOfType(t.Context(), &GetMembersOfTypeParams{
		Snapshot: c.snapshot,
		Project:  c.project,
		Type:     instanceType.Id,
		Filter:   filter,
	})
	assert.NilError(t, err)
	return members
}

// requestNodeHandle turns the "index.kind.#fileID.path" handle of a response into the
// "index.#fileID" form a client sends back.
func requestNodeHandle(t *testing.T, handle NodeHandle) NodeHandle {
	t.Helper()
	parts := strings.SplitN(string(handle), ".", 4)
	assert.Assert(t, len(parts) == 4 && strings.HasPrefix(parts[2], "#"), "unexpected node handle %q", handle)
	return NodeHandle(parts[0] + "." + parts[2])
}

func tagNames(tags []*JSDocTagInfo) []string {
	var names []string
	for _, tag := range tags {
		names = append(names, tag.Name)
	}
	return names
}

// expectedNames returns, in the given reference order, the fixture members that
// satisfy pred.
func expectedNames(order []string, pred func(name string, m expectedMember) bool) []string {
	var names []string
	for _, name := range order {
		if pred(name, expectedMembers[name]) {
			names = append(names, name)
		}
	}
	return names
}

func TestGetMembersOfTypeMatchesTheFineGrainedPath(t *testing.T) {
	t.Parallel()
	ctx, cleanup := setupMembersTestWithSource(t, differentialTestSource)
	defer cleanup()

	derived := ctx.classSymbol(t, "Derived")
	base := ctx.classSymbol(t, "Base")
	instanceType := ctx.declaredType(t, derived)
	owners := map[string]*SymbolResponse{"Derived": derived, "Base": base}

	fine := ctx.fineGrainedMembers(t, instanceType)
	order := make([]string, len(fine))
	for i, m := range fine {
		order[i] = displayName(m.symbol.Name)
	}
	// The fixture describes exactly the instance members the checker reports; the
	// static `create` is not among them.
	assert.Equal(t, len(fine), len(expectedMembers), "fixture covers every property: %v", order)
	for _, name := range order {
		_, ok := expectedMembers[name]
		assert.Assert(t, ok, "unexpected property %s", name)
	}

	// 1. With no filter, getMembersOfType is getPropertiesOfType plus, per member,
	//    the same documentation and declared type the fine-grained path obtains, in
	//    the same order and with the same handles.
	coarse := ctx.membersOf(t, instanceType, MemberFilter{IncludeDeclaredType: true})
	assert.DeepEqual(t, displayNames(coarse), order)
	for i, m := range coarse {
		f := fine[i]
		name := order[i]
		want := expectedMembers[name]
		assert.DeepEqual(t, m.Symbol.Reference, f.symbol.Reference)
		assert.Equal(t, m.Comment, f.comment, "comment of %s", name)
		assert.Equal(t, m.Comment, want.comment, "comment of %s", name)
		assert.DeepEqual(t, tagNames(m.Tags), tagNames(f.tags))
		assert.DeepEqual(t, tagNames(m.Tags), want.tags)
		assert.Equal(t, m.IsMethod, want.kind == "method", "isMethod of %s", name)
		assert.Equal(t, m.IsParameterProperty, want.kind == "parameterProperty", "isParameterProperty of %s", name)
		if m.IsMethod {
			assert.Assert(t, m.DeclaredType == nil, "%s: methods are rendered from their signatures", name)
		} else {
			assert.Assert(t, m.DeclaredType != nil, "%s: declared type requested", name)
			assert.Equal(t, m.DeclaredType.Id, f.declaredType.Id, "declared type handle of %s", name)
		}
		assert.Assert(t, m.Owner != nil, "owner of %s", name)
		assert.DeepEqual(t, m.Owner.Reference, owners[want.owner].Reference)
		// The owner is also the member symbol's parent, which is what a fine-grained
		// client would compare against.
		assert.Assert(t, f.symbol.Parent != nil && f.symbol.Parent.Id == m.Owner.Reference.Id, "owner of %s is its symbol's parent", name)
	}

	// 2. Each predicate on its own partitions the members as the fixture says, in
	//    property order.
	for _, visibility := range []string{"public", "protected", "private"} {
		got := ctx.membersOf(t, instanceType, MemberFilter{Visibility: []string{visibility}})
		assert.DeepEqual(t, displayNames(got), expectedNames(order, func(_ string, m expectedMember) bool { return m.visibility == visibility }))
	}
	for _, kind := range []string{"property", "accessor", "method", "parameterProperty"} {
		got := ctx.membersOf(t, instanceType, MemberFilter{Kinds: []string{kind}})
		assert.DeepEqual(t, displayNames(got), expectedNames(order, func(_ string, m expectedMember) bool { return m.kind == kind }))
		for _, m := range got {
			assert.Equal(t, m.IsMethod, kind == "method", "isMethod of %s admitted as %s", m.Symbol.Name, kind)
		}
	}
	for _, owner := range []string{"Derived", "Base"} {
		var filter MemberFilter
		if owner == "Derived" {
			filter.IncludeInheritedFrom = &InheritedMemberFilter{}
		} else {
			filter.IncludeInheritedFrom = &InheritedMemberFilter{DeclaringTypes: []SymbolReference{base.Reference}}
		}
		got := ctx.membersOf(t, instanceType, filter)
		want := expectedNames(order, func(_ string, m expectedMember) bool { return m.owner == "Derived" || m.owner == owner })
		assert.Check(t, slices.Equal(displayNames(got), want), "declaring types up to %s: got %v, want %v", owner, displayNames(got), want)
	}
	// The ECMAScript private field is matched on its wire form.
	got := ctx.membersOf(t, instanceType, MemberFilter{ExcludeNamePattern: ptr("^__#")})
	assert.DeepEqual(t, displayNames(got), slices.DeleteFunc(slices.Clone(order), func(name string) bool { return name == "#ecmaPrivate" }))

	// 3. The combination a binding generator uses: public and protected members,
	//    nothing @internal or @deprecated, no underscore names, declared on the type
	//    itself or on Base. What survives is exactly the fixture's prediction, in
	//    property order, and carries the same information as in 1.
	policy := MemberFilter{
		Visibility:           []string{"public", "protected"},
		ExcludeJsDocTags:     []string{"internal", "deprecated"},
		ExcludeNamePattern:   ptr("^_"),
		IncludeInheritedFrom: &InheritedMemberFilter{DeclaringTypes: []SymbolReference{base.Reference}},
		IncludeDeclaredType:  true,
	}
	survivors := ctx.membersOf(t, instanceType, policy)
	assert.DeepEqual(t, displayNames(survivors), expectedNames(order, func(name string, m expectedMember) bool {
		return m.visibility != "private" && !slices.Contains(m.tags, "internal") && !slices.Contains(m.tags, "deprecated") && !strings.HasPrefix(name, "_")
	}))
	assert.DeepEqual(t, displayNames(survivors), []string{"describe", "area", "label", "guarded", "fromCtor", "baseProp", "helper", "size"})
	byName := map[string]*MemberResponse{}
	for _, m := range coarse {
		byName[displayName(m.Symbol.Name)] = m
	}
	for _, m := range survivors {
		assert.DeepEqual(t, m, byName[displayName(m.Symbol.Name)])
	}
}

func TestGetMembersOfTypeOverloadsAndOverrides(t *testing.T) {
	t.Parallel()
	ctx, cleanup := setupMembersTestWithSource(t, differentialTestSource)
	defer cleanup()

	derived := ctx.classSymbol(t, "Derived")
	base := ctx.classSymbol(t, "Base")
	instanceType := ctx.declaredType(t, derived)
	byName := map[string]*MemberResponse{}
	for _, m := range ctx.membersOf(t, instanceType, MemberFilter{}) {
		byName[displayName(m.Symbol.Name)] = m
	}

	// An override is reported once, as the derived class's own member: the symbol is
	// the derived declaration's and so is the owner, even though Base declares a
	// member of the same name.
	describe := byName["describe"]
	assert.DeepEqual(t, describe.Owner.Reference, derived.Reference)
	assert.Equal(t, describe.Comment, "own description")
	assert.Equal(t, len(describe.Symbol.Declarations), 1)
	// The base class's own view still attributes its member to Base.
	baseType := ctx.declaredType(t, base)
	for _, m := range ctx.membersOf(t, baseType, MemberFilter{}) {
		if displayName(m.Symbol.Name) == "describe" {
			assert.DeepEqual(t, m.Owner.Reference, base.Reference)
			assert.Equal(t, m.Comment, "overridden below")
		}
	}

	// Overloads are one member with one declaration per signature; its
	// documentation comes from the first declaration like getDocumentationComment.
	area := byName["area"]
	assert.Assert(t, area.IsMethod)
	assert.Equal(t, len(area.Symbol.Declarations), 3)
	assert.Equal(t, area.Comment, "overloaded")

	// A getter/setter pair is one accessor member whose declared type is the
	// accessor type.
	label := byName["label"]
	assert.Assert(t, !label.IsMethod)
	assert.Equal(t, len(label.Symbol.Declarations), 2)
	withTypes := ctx.membersOf(t, instanceType, MemberFilter{Kinds: []string{"accessor"}, IncludeDeclaredType: true})
	assert.DeepEqual(t, displayNames(withTypes), []string{"label", "size"})
	for _, m := range withTypes {
		assert.Assert(t, m.DeclaredType != nil, "%s", m.Symbol.Name)
	}
}
