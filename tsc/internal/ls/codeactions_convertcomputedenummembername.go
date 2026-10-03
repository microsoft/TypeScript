package ls

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/change"
)

const convertComputedEnumMemberNameFixID = "convertComputedEnumMemberName"

var convertComputedEnumMemberNameErrorCodes = []int32{
	diagnostics.Using_a_string_literal_as_an_enum_member_name_via_a_computed_property_is_deprecated_Use_a_simple_string_literal_instead.Code(),
}

var ConvertComputedEnumMemberNameProvider = &CodeFixProvider{
	ErrorCodes:        convertComputedEnumMemberNameErrorCodes,
	GetCodeActions:    getCodeActionsToConvertComputedEnumMemberName,
	FixIds:            []string{convertComputedEnumMemberNameFixID},
	GetAllCodeActions: getAllCodeActionsToConvertComputedEnumMemberName,
}

func getCodeActionsToConvertComputedEnumMemberName(ctx context.Context, fixContext *CodeFixContext) ([]*CodeAction, error) {
	name := getComputedEnumMemberName(fixContext.SourceFile, fixContext.Span.Pos())
	if name == nil {
		return nil, nil
	}

	tracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
	convertComputedEnumMemberName(tracker, fixContext.SourceFile, name)
	changes := getChanges(tracker, nil, fixContext.SourceFile)
	if len(changes) == 0 {
		return nil, nil
	}

	loc := locale.FromContext(ctx)
	return []*CodeAction{{
		Description:       diagnostics.Remove_unnecessary_computed_property_name_syntax.Localize(loc),
		Changes:           changes,
		FixID:             convertComputedEnumMemberNameFixID,
		FixAllDescription: diagnostics.Remove_all_unnecessary_computed_property_name_syntax.Localize(loc),
	}}, nil
}

func getAllCodeActionsToConvertComputedEnumMemberName(ctx context.Context, fixContext *CodeFixContext) (*CombinedCodeActions, error) {
	tracker := change.NewTracker(ctx, fixContext.Program.Options(), fixContext.LS.FormatOptions(), fixContext.LS.converters)
	for _, diagnostic := range getAllDiagnostics(ctx, fixContext.Program, fixContext.SourceFile) {
		if !isFixableDiagnostic(diagnostic, convertComputedEnumMemberNameErrorCodes) {
			continue
		}
		file := diagnostic.File()
		name := getComputedEnumMemberName(file, diagnostic.Pos())
		if name != nil {
			convertComputedEnumMemberName(tracker, file, name)
		}
	}
	changes := getChanges(tracker, nil, fixContext.SourceFile)
	if len(changes) == 0 {
		return nil, nil
	}
	return &CombinedCodeActions{
		Description: diagnostics.Remove_all_unnecessary_computed_property_name_syntax.Localize(locale.FromContext(ctx)),
		Changes:     changes,
	}, nil
}

func getComputedEnumMemberName(file *ast.SourceFile, pos int) *ast.Node {
	name := astnav.GetTokenAtPosition(file, pos)
	for name != nil && !ast.IsComputedPropertyName(name) {
		name = name.Parent
	}
	if name == nil || !ast.IsEnumMember(name.Parent) || !ast.IsStringLiteralLike(name.Expression()) {
		return nil
	}
	return name
}

func convertComputedEnumMemberName(tracker *change.Tracker, file *ast.SourceFile, name *ast.Node) {
	literal := tracker.NewStringLiteral(name.Expression().Text(), ast.TokenFlagsNone)
	tracker.AssignCommentRange(literal, name.Expression())
	tracker.ReplaceNode(file, name, literal, nil)
}
