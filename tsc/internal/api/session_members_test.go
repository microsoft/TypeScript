package api

import (
	"context"
	"slices"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

const membersFixture = `
export class Base {
    /** inherited field */
    inherited: number;
    /** @internal hidden from the public surface */
    hidden: string;
    protected prot: boolean;
}
export class Side {
    side: string;
}
export class Derived extends Base {
    /** own field
     * @deprecated replaced
     */
    own: string;
    method(): void {}
    get acc(): number { return 1; }
    constructor(public paramProp: boolean) { super(); }
    _secret: number;
    #priv: number;
    private tsPrivate: number;
    public pub: number;
}
export interface Left { left: number; }
export interface Right { right: string; }
export interface Both extends Left, Right { own: boolean; }
export namespace N {
    export const value = 1;
    export function run(): void {}
}
export interface HashName {
    "#x": number;
}
`

func setupMembersFixture(t *testing.T) (*Session, SnapshotID, project.Handle) {
	t.Helper()
	const fileName = "/home/projects/p/index.ts"
	projectSession, _ := projecttestutil.Setup(map[string]any{fileName: membersFixture})
	t.Cleanup(func() { projectSession.Close() })
	session := NewLSPSession(projectSession, nil)
	t.Cleanup(func() { session.Close() })

	created, err := session.handleCreateSnapshot(context.Background(), &CreateSnapshotParams{
		CreatePrograms: []*CreateSnapshotProgramParams{{
			RootFiles:       []DocumentIdentifier{{FileName: fileName}},
			CompilerOptions: core.CompilerOptions{NoLib: core.TSTrue, Strict: core.TSTrue},
		}},
	})
	assert.NilError(t, err)
	return session, created.Snapshot, created.Projects[0].Handle
}

func (s *Session) classType(t *testing.T, snapshot SnapshotID, projectHandle project.Handle, name string) (*SymbolResponse, *TypeResponse) {
	t.Helper()
	const fileName = "/home/projects/p/index.ts"
	moduleSymbol, err := s.handleGetSymbolOfSourceFile(context.Background(), &GetSymbolOfSourceFileParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		File:     DocumentIdentifier{FileName: fileName},
	})
	assert.NilError(t, err)
	classSymbol, err := s.handleGetMemberInModuleExports(context.Background(), &GetMemberInModuleExportsParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Symbol:   moduleSymbol.Reference,
		Name:     name,
	})
	assert.NilError(t, err)
	assert.Assert(t, classSymbol != nil)
	classType, err := s.handleGetDeclaredTypeOfSymbol(context.Background(), &GetTypeOfSymbolParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Symbol:   classSymbol.Reference,
	})
	assert.NilError(t, err)
	return classSymbol, classType
}

func memberNames(members []*MemberOfTypeResponse) []string {
	names := make([]string, len(members))
	for i, member := range members {
		names[i] = member.Symbol.Name
	}
	return names
}

func TestGetSymbolDocumentationsMatchesFineGrainedReads(t *testing.T) {
	t.Parallel()
	session, snapshot, projectHandle := setupMembersFixture(t)
	_, derivedType := session.classType(t, snapshot, projectHandle, "Derived")

	members, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter: &MembersOfTypeFilter{
			IncludeInheritedFrom: &MembersInheritedFrom{All: true},
		},
	})
	assert.NilError(t, err)

	symbols := make([]SymbolReference, len(members))
	for i, member := range members {
		symbols[i] = member.Symbol.Reference
	}
	docs, err := session.handleGetSymbolDocumentations(context.Background(), &GetSymbolDocumentationsParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Symbols:  symbols,
	})
	assert.NilError(t, err)
	assert.Equal(t, len(docs), len(symbols))

	for i, member := range members {
		tags, err := session.handleGetJSDocTags(context.Background(), &CheckerSymbolParams{
			Snapshot: snapshot,
			Project:  projectHandle,
			Symbol:   member.Symbol.Reference,
		})
		assert.NilError(t, err)
		comment, err := session.handleGetDocumentationComment(context.Background(), &CheckerSymbolParams{
			Snapshot: snapshot,
			Project:  projectHandle,
			Symbol:   member.Symbol.Reference,
		})
		assert.NilError(t, err)
		assert.DeepEqual(t, docs[i].Tags, tags)
		assert.Equal(t, docs[i].Comment, comment)
		assert.DeepEqual(t, member.Tags, tags)
		assert.Equal(t, member.Comment, comment)
	}

	var own *MemberOfTypeResponse
	for _, member := range members {
		if member.Symbol.Name == "own" {
			own = member
		}
	}
	assert.Assert(t, own != nil)
	assert.Equal(t, own.Comment, "own field")
	assert.Equal(t, len(own.Tags), 1)
	assert.Equal(t, own.Tags[0].Name, "deprecated")
	assert.Equal(t, own.Tags[0].Text, "replaced")
}

func TestGetMembersOfTypeFiltersBeforeMaterializingTypes(t *testing.T) {
	t.Parallel()
	session, snapshot, projectHandle := setupMembersFixture(t)
	_, derivedType := session.classType(t, snapshot, projectHandle, "Derived")
	_, baseType := session.classType(t, snapshot, projectHandle, "Base")

	ownOnly, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
	})
	assert.NilError(t, err)
	ownNames := memberNames(ownOnly)
	assert.DeepEqual(t, append(append([]string{}, ownNames[:5]...), ownNames[6:]...), []string{"own", "method", "acc", "paramProp", "_secret", "tsPrivate", "pub"})
	assert.Assert(t, strings.Contains(ownNames[5], "#priv"))

	byKind := map[string]string{}
	for _, member := range ownOnly {
		byKind[member.Symbol.Name] = member.Kind
		assert.Equal(t, member.DeclaringSymbol.Name, "Derived")
		assert.Assert(t, member.DeclaredType == nil)
	}
	assert.Equal(t, byKind["own"], MemberKindProperty)
	assert.Equal(t, byKind["method"], MemberKindMethod)
	assert.Equal(t, byKind["acc"], MemberKindAccessor)
	assert.Equal(t, byKind["paramProp"], MemberKindParameterProperty)
	assert.Equal(t, byKind[ownNames[5]], MemberKindProperty)

	withoutHash, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{ExcludeNamePattern: "^#"},
	})
	assert.NilError(t, err)
	for _, name := range memberNames(withoutHash) {
		assert.Assert(t, !strings.Contains(name, "#priv"))
	}
	withUnderscore, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{ExcludeNamePattern: "^_"},
	})
	assert.NilError(t, err)
	underscoreNames := memberNames(withUnderscore)
	assert.Assert(t, !slices.Contains(underscoreNames, "_secret"))
	assert.Assert(t, slices.Contains(underscoreNames, ownNames[5]))

	publicSurface, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter: &MembersOfTypeFilter{
			Visibility:         []string{MemberVisibilityPublic, MemberVisibilityProtected},
			ExcludeJsDocTags:   []string{"internal"},
			ExcludeNamePattern: "^_",
			IncludeInheritedFrom: &MembersInheritedFrom{
				Types: []TypeID{baseType.Id},
			},
			IncludeDeclaredType: true,
		},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(publicSurface), []string{"own", "method", "acc", "paramProp", "pub", "inherited", "prot"})

	for _, member := range publicSurface {
		assert.Assert(t, member.DeclaredType != nil)
		declared, err := session.handleGetTypeOfSymbol(context.Background(), &GetTypeOfSymbolParams{
			Snapshot: snapshot,
			Project:  projectHandle,
			Symbol:   member.Symbol.Reference,
		})
		assert.NilError(t, err)
		assert.Equal(t, member.DeclaredType.Id, declared.Id)
		if member.Symbol.Name == "inherited" || member.Symbol.Name == "prot" {
			assert.Equal(t, member.DeclaringSymbol.Name, "Base")
		}
	}

	methods, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{Kinds: []string{MemberKindMethod}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(methods), []string{"method"})

	props, err := session.handleGetPropertiesOfType(context.Background(), &CheckerTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
	})
	assert.NilError(t, err)
	all, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{IncludeInheritedFrom: &MembersInheritedFrom{All: true}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(all), len(props))
	for i := range props {
		assert.Equal(t, all[i].Symbol.Reference.Id, props[i].Reference.Id)
		assert.Equal(t, all[i].Symbol.Name, props[i].Name)
	}
}

func TestGetMembersOfTypeSelectsDeclaringInterfaces(t *testing.T) {
	t.Parallel()
	session, snapshot, projectHandle := setupMembersFixture(t)
	_, bothType := session.classType(t, snapshot, projectHandle, "Both")
	_, leftType := session.classType(t, snapshot, projectHandle, "Left")

	own, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     bothType.Id,
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(own), []string{"own"})

	withLeft, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     bothType.Id,
		Filter:   &MembersOfTypeFilter{IncludeInheritedFrom: &MembersInheritedFrom{Types: []TypeID{leftType.Id}}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(withLeft), []string{"own", "left"})
	assert.Equal(t, withLeft[1].DeclaringSymbol.Name, "Left")
}

func TestGetMembersOfTypeKeepsNamespaceValuesAndPublicHashNames(t *testing.T) {
	t.Parallel()
	session, snapshot, projectHandle := setupMembersFixture(t)
	namespaceSymbol, _ := session.classType(t, snapshot, projectHandle, "N")
	namespaceType, err := session.handleGetTypeOfSymbol(context.Background(), &GetTypeOfSymbolParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Symbol:   namespaceSymbol.Reference,
	})
	assert.NilError(t, err)
	_, hashType := session.classType(t, snapshot, projectHandle, "HashName")

	props, err := session.handleGetPropertiesOfType(context.Background(), &CheckerTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     namespaceType.Id,
	})
	assert.NilError(t, err)
	members, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     namespaceType.Id,
		Filter:   &MembersOfTypeFilter{IncludeInheritedFrom: &MembersInheritedFrom{All: true}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(members), []string{"value", "run"})
	assert.Equal(t, len(members), len(props))
	for i := range props {
		assert.Equal(t, members[i].Symbol.Reference.Id, props[i].Reference.Id)
		assert.Equal(t, members[i].Kind, MemberKindProperty)
	}

	publicOnly, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     hashType.Id,
		Filter:   &MembersOfTypeFilter{Visibility: []string{MemberVisibilityPublic}},
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, memberNames(publicOnly), []string{"#x"})

	privateOnly, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     hashType.Id,
		Filter:   &MembersOfTypeFilter{Visibility: []string{MemberVisibilityPrivate}},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(privateOnly), 0)
}

func TestGetMembersOfTypeRejectsInvalidFilters(t *testing.T) {
	t.Parallel()
	session, snapshot, projectHandle := setupMembersFixture(t)
	_, derivedType := session.classType(t, snapshot, projectHandle, "Derived")

	_, err := session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{ExcludeNamePattern: "("},
	})
	assert.ErrorContains(t, err, "invalid excludeNamePattern")

	_, err = session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{Kinds: []string{"field"}},
	})
	assert.ErrorContains(t, err, "unknown member kind")

	_, err = session.handleGetMembersOfType(context.Background(), &GetMembersOfTypeParams{
		Snapshot: snapshot,
		Project:  projectHandle,
		Type:     derivedType.Id,
		Filter:   &MembersOfTypeFilter{Visibility: []string{"hidden"}},
	})
	assert.ErrorContains(t, err, "unknown member visibility")
	assert.Assert(t, strings.Contains(err.Error(), "hidden"))
}
