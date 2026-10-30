package api

import (
	"context"
	"fmt"
	"regexp"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/ls"
)

// handleGetSymbolDocumentations returns, for each symbol, the same JSDoc tags
// and documentation comment that getJsDocTags and getDocumentationComment return.
func (s *Session) handleGetSymbolDocumentations(ctx context.Context, params *GetSymbolDocumentationsParams) ([]*SymbolDocumentationResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	results := make([]*SymbolDocumentationResponse, len(params.Symbols))
	for i, symbolReference := range params.Symbols {
		symbol, err := setup.resolveSymbolHandle(symbolReference)
		if err != nil {
			return nil, err
		}
		results[i] = symbolDocumentation(setup.checker, symbol)
	}
	return results, nil
}

// handleGetMembersOfType returns the members of a type that pass the filter.
// Handles match the fine-grained methods: the member symbol is the one
// getPropertiesOfType returns, the declaring symbol is getParentOfSymbol, and
// the declared type is getTypeOfSymbol.
func (s *Session) handleGetMembersOfType(ctx context.Context, params *GetMembersOfTypeParams) ([]*MemberOfTypeResponse, error) {
	setup, err := s.setupChecker(ctx, params.Snapshot, params.Project)
	if err != nil {
		return nil, err
	}
	defer setup.done()

	t, err := setup.resolveTypeHandle(params.Type)
	if err != nil {
		return nil, err
	}

	filter, err := compileMembersOfTypeFilter(setup, t, params.Filter)
	if err != nil {
		return nil, err
	}

	var results []*MemberOfTypeResponse
	for _, prop := range setup.checker.GetPropertiesOfType(t) {
		kind, ok := memberKind(prop)
		if !ok || !filter.allowsKind(kind) || !filter.allowsVisibility(memberVisibility(prop)) {
			continue
		}
		if filter.namePattern != nil && filter.namePattern.MatchString(memberFilterName(prop)) {
			continue
		}
		if !filter.allowsDeclaringSymbol(setup.checker.GetParentOfSymbol(prop)) {
			continue
		}
		docs := symbolDocumentation(setup.checker, prop)
		if filter.excludesDocumentation(docs) {
			continue
		}
		entry := &MemberOfTypeResponse{
			Symbol:  setup.newSymbolResponse(prop),
			Kind:    kind,
			Tags:    docs.Tags,
			Comment: docs.Comment,
		}
		if parent := setup.checker.GetParentOfSymbol(prop); parent != nil {
			entry.DeclaringSymbol = setup.newSymbolResponse(parent)
		}
		if filter.includeDeclaredType {
			entry.DeclaredType = setup.sd.newTypeResponse(setup.projectID, setup.checker.GetTypeOfSymbol(prop), setup.checker)
		}
		results = append(results, entry)
	}
	if results == nil {
		results = []*MemberOfTypeResponse{}
	}
	return results, nil
}

func symbolDocumentation(c *checker.Checker, symbol *ast.Symbol) *SymbolDocumentationResponse {
	tags := ls.GetSymbolJSDocTags(symbol)
	infos := make([]*JSDocTagInfo, len(tags))
	for i, tag := range tags {
		infos[i] = &JSDocTagInfo{Name: tag.Name, Text: tag.Text}
	}
	if len(infos) == 0 {
		infos = nil
	}
	return &SymbolDocumentationResponse{
		Tags:    infos,
		Comment: ls.GetSymbolDocumentationComment(c, symbol),
	}
}

type compiledMembersFilter struct {
	visibility          map[string]struct{}
	kinds               map[string]struct{}
	excludeTags         map[string]struct{}
	namePattern         *regexp.Regexp
	includeAllInherited bool
	// declaringSymbols are the queried type plus any explicitly included bases.
	// Nil means every declaring symbol is allowed.
	declaringSymbols    map[*ast.Symbol]struct{}
	includeDeclaredType bool
}

func compileMembersOfTypeFilter(setup checkerSetup, queried *checker.Type, filter *MembersOfTypeFilter) (*compiledMembersFilter, error) {
	compiled := &compiledMembersFilter{declaringSymbols: map[*ast.Symbol]struct{}{}}
	if own := setup.checker.GetMergedSymbol(queried.Symbol()); own != nil {
		compiled.declaringSymbols[own] = struct{}{}
	} else {
		// An anonymous type has no declaring symbol to compare against, so every
		// member it reports is one of its own.
		compiled.declaringSymbols = nil
	}
	if filter == nil {
		return compiled, nil
	}
	compiled.includeDeclaredType = filter.IncludeDeclaredType
	if len(filter.Visibility) != 0 {
		compiled.visibility = make(map[string]struct{}, len(filter.Visibility))
		for _, visibility := range filter.Visibility {
			switch visibility {
			case MemberVisibilityPublic, MemberVisibilityProtected, MemberVisibilityPrivate:
				compiled.visibility[visibility] = struct{}{}
			default:
				return nil, fmt.Errorf("%w: unknown member visibility %q", ErrClientError, visibility)
			}
		}
	}
	if len(filter.Kinds) != 0 {
		compiled.kinds = make(map[string]struct{}, len(filter.Kinds))
		for _, kind := range filter.Kinds {
			switch kind {
			case MemberKindProperty, MemberKindAccessor, MemberKindMethod, MemberKindParameterProperty:
				compiled.kinds[kind] = struct{}{}
			default:
				return nil, fmt.Errorf("%w: unknown member kind %q", ErrClientError, kind)
			}
		}
	}
	if len(filter.ExcludeJsDocTags) != 0 {
		compiled.excludeTags = make(map[string]struct{}, len(filter.ExcludeJsDocTags))
		for _, tag := range filter.ExcludeJsDocTags {
			compiled.excludeTags[tag] = struct{}{}
		}
	}
	if filter.ExcludeNamePattern != "" {
		pattern, err := regexp.Compile(filter.ExcludeNamePattern)
		if err != nil {
			return nil, fmt.Errorf("%w: invalid excludeNamePattern: %w", ErrClientError, err)
		}
		compiled.namePattern = pattern
	}
	inherited := filter.IncludeInheritedFrom
	if inherited != nil && inherited.All {
		compiled.includeAllInherited = true
		compiled.declaringSymbols = nil
		return compiled, nil
	}
	if inherited != nil && compiled.declaringSymbols != nil {
		for _, id := range inherited.Types {
			base, err := setup.resolveTypeHandle(id)
			if err != nil {
				return nil, err
			}
			if symbol := setup.checker.GetMergedSymbol(base.Symbol()); symbol != nil {
				compiled.declaringSymbols[symbol] = struct{}{}
			}
		}
	}
	return compiled, nil
}

func (filter *compiledMembersFilter) allowsKind(kind string) bool {
	if len(filter.kinds) == 0 {
		return true
	}
	_, ok := filter.kinds[kind]
	return ok
}

func (filter *compiledMembersFilter) allowsVisibility(visibility string) bool {
	if len(filter.visibility) == 0 {
		return true
	}
	_, ok := filter.visibility[visibility]
	return ok
}

func (filter *compiledMembersFilter) allowsDeclaringSymbol(parent *ast.Symbol) bool {
	if filter.includeAllInherited || filter.declaringSymbols == nil {
		return true
	}
	if parent == nil {
		return true
	}
	_, ok := filter.declaringSymbols[parent]
	return ok
}

func (filter *compiledMembersFilter) excludesDocumentation(docs *SymbolDocumentationResponse) bool {
	if len(filter.excludeTags) == 0 || docs == nil {
		return false
	}
	for _, tag := range docs.Tags {
		if _, ok := filter.excludeTags[tag.Name]; ok {
			return true
		}
	}
	return false
}

func memberKind(symbol *ast.Symbol) (string, bool) {
	if decl := symbol.ValueDeclaration(); decl != nil && decl.Parent != nil && ast.IsParameterPropertyDeclaration(decl, decl.Parent) {
		return MemberKindParameterProperty, true
	}
	flags := symbol.Flags()
	switch {
	case flags&ast.SymbolFlagsMethod != 0:
		return MemberKindMethod, true
	case flags&ast.SymbolFlagsAccessor != 0:
		return MemberKindAccessor, true
	case flags&ast.SymbolFlagsValue != 0:
		// getPropertiesOfType also returns variables and functions, such as
		// namespace exports. They are properties of that type for this query.
		return MemberKindProperty, true
	default:
		return "", false
	}
}

// isECMAScriptPrivateName reports a #name member. The binder stores those
// symbols as "\xFE#<classId>@#name". A public string-literal property such as
// "#x" starts with "#" and is not private.
func isECMAScriptPrivateName(symbol *ast.Symbol) bool {
	for _, decl := range symbol.Declarations() {
		if decl != nil && ast.IsPrivateIdentifierClassElementDeclaration(decl) {
			return true
		}
	}
	return strings.HasPrefix(symbol.Name(), ast.InternalSymbolNamePrefix+"#")
}

// memberFilterName is the name a caller writes. ECMAScript private names are
// stored on the symbol in an escaped form; the filter matches the source text
// (`#priv`) so a pattern such as `^_` does not also drop them.
func memberFilterName(symbol *ast.Symbol) string {
	for _, decl := range symbol.Declarations() {
		if decl == nil || decl.Name() == nil || !ast.IsPrivateIdentifier(decl.Name()) {
			continue
		}
		return decl.Name().Text()
	}
	return symbol.Name()
}

func memberVisibility(symbol *ast.Symbol) string {
	if isECMAScriptPrivateName(symbol) {
		return MemberVisibilityPrivate
	}
	flags := checker.GetDeclarationModifierFlagsFromSymbol(symbol)
	switch {
	case flags&ast.ModifierFlagsPrivate != 0:
		return MemberVisibilityPrivate
	case flags&ast.ModifierFlagsProtected != 0:
		return MemberVisibilityProtected
	default:
		return MemberVisibilityPublic
	}
}
