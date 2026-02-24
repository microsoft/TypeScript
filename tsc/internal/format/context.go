package format

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type FormattingContext struct {
	currentTokenSpan   TextRangeWithKind
	nextTokenSpan      TextRangeWithKind
	contextNode        *ast.Node
	currentTokenParent *ast.Node
	nextTokenParent    *ast.Node

	contextNodeAllOnSameLine    core.Tristate
	nextNodeAllOnSameLine       core.Tristate
	tokensAreOnSameLine         core.Tristate
	contextNodeBlockIsOnOneLine core.Tristate
	nextNodeBlockIsOnOneLine    core.Tristate

	SourceFile            *ast.SourceFile
	FormattingRequestKind FormatRequestKind
	Options               *lsutil.FormatCodeSettings
}

func NewFormattingContext(file *ast.SourceFile, kind FormatRequestKind, options *lsutil.FormatCodeSettings) *FormattingContext {
	res := &FormattingContext{
		SourceFile:            file,
		FormattingRequestKind: kind,
		Options:               options,
	}
	return res
}

func (this *FormattingContext) UpdateContext(cur TextRangeWithKind, curParent *ast.Node, next TextRangeWithKind, nextParent *ast.Node, commonParent *ast.Node) {
	if curParent == nil {
		panic("nil current range node parent in update context")
	}
	if nextParent == nil {
		panic("nil next range node parent in update context")
	}
	if commonParent == nil {
		panic("nil common parent node in update context")
	}
	this.currentTokenSpan = cur
	this.currentTokenParent = curParent
	this.nextTokenSpan = next
	this.nextTokenParent = nextParent
	this.contextNode = commonParent

	// drop cached results
	this.contextNodeAllOnSameLine = core.TSUnknown
	this.nextNodeAllOnSameLine = core.TSUnknown
	this.tokensAreOnSameLine = core.TSUnknown
	this.contextNodeBlockIsOnOneLine = core.TSUnknown
	this.nextNodeBlockIsOnOneLine = core.TSUnknown
}

func (this *FormattingContext) rangeIsOnOneLine(node core.TextRange) core.Tristate {
	if rangeIsOnOneLine(node, this.SourceFile) {
		return core.TSTrue
	}
	return core.TSFalse
}

func (this *FormattingContext) nodeIsOnOneLine(node *ast.Node) core.Tristate {
	return this.rangeIsOnOneLine(withTokenStart(node, this.SourceFile))
}

func withTokenStart(loc *ast.Node, file *ast.SourceFile) core.TextRange {
	startPos := scanner.GetTokenPosOfNode(loc, file, false)
	return core.NewTextRange(startPos, loc.End())
}

func (this *FormattingContext) blockIsOnOneLine(node *ast.Node) core.Tristate {
	openBrace := astnav.FindChildOfKind(node, ast.KindOpenBraceToken, this.SourceFile)
	closeBrace := astnav.FindChildOfKind(node, ast.KindCloseBraceToken, this.SourceFile)
	if openBrace != nil && closeBrace != nil {
		closeBraceStart := scanner.GetTokenPosOfNode(closeBrace, this.SourceFile, false)
		return this.rangeIsOnOneLine(core.NewTextRange(openBrace.End(), closeBraceStart))
	}
	return core.TSFalse
}

func (this *FormattingContext) ContextNodeAllOnSameLine() bool {
	if this.contextNodeAllOnSameLine == core.TSUnknown {
		this.contextNodeAllOnSameLine = this.nodeIsOnOneLine(this.contextNode)
	}
	return this.contextNodeAllOnSameLine == core.TSTrue
}

func (this *FormattingContext) NextNodeAllOnSameLine() bool {
	if this.nextNodeAllOnSameLine == core.TSUnknown {
		this.nextNodeAllOnSameLine = this.nodeIsOnOneLine(this.nextTokenParent)
	}
	return this.nextNodeAllOnSameLine == core.TSTrue
}

func (this *FormattingContext) TokensAreOnSameLine() bool {
	if this.tokensAreOnSameLine == core.TSUnknown {
		this.tokensAreOnSameLine = this.rangeIsOnOneLine(core.NewTextRange(this.currentTokenSpan.Loc.Pos(), this.nextTokenSpan.Loc.End()))
	}
	return this.tokensAreOnSameLine == core.TSTrue
}

func (this *FormattingContext) ContextNodeBlockIsOnOneLine() bool {
	if this.contextNodeBlockIsOnOneLine == core.TSUnknown {
		this.contextNodeBlockIsOnOneLine = this.blockIsOnOneLine(this.contextNode)
	}
	return this.contextNodeBlockIsOnOneLine == core.TSTrue
}

func (this *FormattingContext) NextNodeBlockIsOnOneLine() bool {
	if this.nextNodeBlockIsOnOneLine == core.TSUnknown {
		this.nextNodeBlockIsOnOneLine = this.blockIsOnOneLine(this.nextTokenParent)
	}
	return this.nextNodeBlockIsOnOneLine == core.TSTrue
}
