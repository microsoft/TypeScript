package ls

import (
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

// vsImageCatalogGuid is the GUID of the shared VS image catalog (see
// Microsoft.VisualStudio.Imaging.KnownImageIds), mirroring the constant duplicated in
// TypeScript-VS's ImageIdMapping.cs (which avoids taking an assembly reference just for this GUID).
const vsImageCatalogGuid = "ae27a6b0-e345-4288-96df-5eaf394ee369"

// Known image IDs from Microsoft.VisualStudio.Imaging.KnownImageIds, restricted to the subset
// consumed by TypeScript-VS's ImageIdMapping.cs for hover tooltips. Corsa (this LSP server) has no
// TSServer/Roslyn dependency to reuse that mapping from, so the values are duplicated here.
const (
	imageIdWarning            int32 = 0x00000637
	imageIdKeyword            int32 = 0x00000635
	imageIdModulePrivate      int32 = 0x0000077D
	imageIdModuleProtected    int32 = 0x0000077E
	imageIdModulePublic       int32 = 0x0000077F
	imageIdType               int32 = 0x00000CA1
	imageIdNamespace          int32 = 0x0000079F
	imageIdClassPrivate       int32 = 0x000001D7
	imageIdClassProtected     int32 = 0x000001D8
	imageIdClassPublic        int32 = 0x000001D9
	imageIdInterfacePrivate   int32 = 0x00000646
	imageIdInterfaceProtected int32 = 0x00000647
	imageIdInterfacePublic    int32 = 0x00000648
	imageIdEnumPrivate        int32 = 0x00000469
	imageIdEnumProtected      int32 = 0x0000046A
	imageIdEnumPublic         int32 = 0x0000046B
	imageIdEnumMember         int32 = 0x00000465
	imageIdLocalVariable      int32 = 0x000006D3
	imageIdPropertyPrivate    int32 = 0x00000982
	imageIdPropertyProtected  int32 = 0x00000983
	imageIdPropertyPublic     int32 = 0x00000984
	imageIdMethodPrivate      int32 = 0x00000756
	imageIdMethodProtected    int32 = 0x00000757
	imageIdMethodPublic       int32 = 0x00000758
	imageIdLabel              int32 = 0x0000067D
	imageIdAssembly           int32 = 0x000000C4
	imageIdConstantPrivate    int32 = 0x0000026A
	imageIdConstantProtected  int32 = 0x0000026B
	imageIdConstantPublic     int32 = 0x0000026C
)

func newVSImageId(id int32) *lsproto.VSImageId {
	return &lsproto.VSImageId{Guid: vsImageCatalogGuid, Id: id}
}

// getVSHoverImageId maps a symbol's ScriptElementKind/modifiers to the VS image shown next to the
// symbol name in hover tooltips. This mirrors TypeScript-VS's ImageIdMapping.GetImageId, which the
// legacy (TSServer-backed) hover path uses; Corsa has no TSServer to source that mapping from, so
// the LSP hover response must carry the equivalent icon directly.
func getVSHoverImageId(kind lsutil.ScriptElementKind, modifiers lsutil.ScriptElementKindModifier) *lsproto.VSImageId {
	isPrivate := modifiers&lsutil.ScriptElementKindModifierPrivate != 0
	isProtected := modifiers&lsutil.ScriptElementKindModifierProtected != 0

	// No internal/exported arm: the *Internal VS icons carry a chevron overlay that conveys
	// C# assembly-scoped visibility, a concept that doesn't apply to TypeScript.
	pick := func(private, protected, public int32) *lsproto.VSImageId {
		switch {
		case isPrivate:
			return newVSImageId(private)
		case isProtected:
			return newVSImageId(protected)
		default:
			return newVSImageId(public)
		}
	}

	switch kind {
	case lsutil.ScriptElementKindWarning:
		return newVSImageId(imageIdWarning)
	case lsutil.ScriptElementKindKeyword:
		return newVSImageId(imageIdKeyword)
	case lsutil.ScriptElementKindScriptElement:
		return pick(imageIdModulePrivate, imageIdModuleProtected, imageIdModulePublic)
	case lsutil.ScriptElementKindPrimitiveType:
		return newVSImageId(imageIdType)
	case lsutil.ScriptElementKindModuleElement:
		return newVSImageId(imageIdNamespace)
	case lsutil.ScriptElementKindConstructorImplementationElement,
		lsutil.ScriptElementKindClassElement,
		lsutil.ScriptElementKindLocalClassElement,
		lsutil.ScriptElementKindTypeElement:
		return pick(imageIdClassPrivate, imageIdClassProtected, imageIdClassPublic)
	case lsutil.ScriptElementKindInterfaceElement:
		return pick(imageIdInterfacePrivate, imageIdInterfaceProtected, imageIdInterfacePublic)
	case lsutil.ScriptElementKindEnumElement:
		return pick(imageIdEnumPrivate, imageIdEnumProtected, imageIdEnumPublic)
	case lsutil.ScriptElementKindEnumMemberElement:
		return newVSImageId(imageIdEnumMember)
	case lsutil.ScriptElementKindParameterElement,
		lsutil.ScriptElementKindVariableElement,
		lsutil.ScriptElementKindLocalVariableElement,
		lsutil.ScriptElementKindVariableUsingElement,
		lsutil.ScriptElementKindVariableAwaitUsingElement,
		lsutil.ScriptElementKindLetElement,
		lsutil.ScriptElementKindString:
		return newVSImageId(imageIdLocalVariable)
	case lsutil.ScriptElementKindConstElement:
		return pick(imageIdConstantPrivate, imageIdConstantProtected, imageIdConstantPublic)
	case lsutil.ScriptElementKindMemberGetAccessorElement,
		lsutil.ScriptElementKindMemberSetAccessorElement,
		lsutil.ScriptElementKindMemberVariableElement,
		lsutil.ScriptElementKindMemberAccessorVariableElement:
		return pick(imageIdPropertyPrivate, imageIdPropertyProtected, imageIdPropertyPublic)
	case lsutil.ScriptElementKindFunctionElement,
		lsutil.ScriptElementKindLocalFunctionElement,
		lsutil.ScriptElementKindMemberFunctionElement,
		lsutil.ScriptElementKindCallSignatureElement,
		lsutil.ScriptElementKindIndexSignatureElement,
		lsutil.ScriptElementKindConstructSignatureElement:
		return pick(imageIdMethodPrivate, imageIdMethodProtected, imageIdMethodPublic)
	case lsutil.ScriptElementKindTypeParameterElement:
		return newVSImageId(imageIdType)
	case lsutil.ScriptElementKindLabel:
		return newVSImageId(imageIdLabel)
	case lsutil.ScriptElementKindAlias:
		return newVSImageId(imageIdModulePublic)
	default:
		return newVSImageId(imageIdAssembly)
	}
}

// buildVSHoverRawContent assembles the VS-specific rich hover content (symbol icon + colorized
// declaration line, plus an optional colorized documentation block) matching the shape that
// TypeScript-VS's legacy HoverService.cs builds from TSServer's quickinfo-full response
// (ImageElement + ClassifiedTextElement wrapped in a ContainerElement).
func buildVSHoverRawContent(imageId *lsproto.VSImageId, quickInfoRuns []*lsproto.VSClassifiedTextRun, documentationRuns []*lsproto.VSClassifiedTextRun) *lsproto.VSContainerElement {
	if len(quickInfoRuns) == 0 {
		return nil
	}

	displayLine := &lsproto.VSContainerElement{
		Style: lsproto.VSContainerElementStyleWrapped,
		Elements: []lsproto.VSImageElementOrClassifiedTextElementOrContainerElement{
			{ImageElement: &lsproto.VSImageElement{ImageId: imageId}},
			{ClassifiedTextElement: &lsproto.VSClassifiedTextElement{Runs: quickInfoRuns}},
		},
	}

	if len(documentationRuns) == 0 {
		return displayLine
	}

	return &lsproto.VSContainerElement{
		Style: lsproto.VSContainerElementStyleStacked,
		Elements: []lsproto.VSImageElementOrClassifiedTextElementOrContainerElement{
			{ContainerElement: displayLine},
			{ClassifiedTextElement: &lsproto.VSClassifiedTextElement{Runs: documentationRuns}},
		},
	}
}
