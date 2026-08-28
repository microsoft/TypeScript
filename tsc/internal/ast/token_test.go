package ast

import (
	"reflect"
	"testing"
)

func TestNewTokenUsesCanonicalDataType(t *testing.T) {
	t.Parallel()

	factory := NewNodeFactory(NodeFactoryHooks{})
	for kind := KindFirstToken; kind <= KindLastToken; kind++ {
		node := factory.NewToken(kind)
		actual := reflect.TypeOf(node.data)
		expected := canonicalTokenDataType(kind)
		if actual != expected {
			t.Errorf("NewToken(%s) data type = %v, want %v", kind, actual, expected)
		}
	}
}

func canonicalTokenDataType(kind Kind) reflect.Type {
	switch kind {
	case KindNumericLiteral:
		return reflect.TypeFor[*NumericLiteral]()
	case KindBigIntLiteral:
		return reflect.TypeFor[*BigIntLiteral]()
	case KindStringLiteral:
		return reflect.TypeFor[*StringLiteral]()
	case KindJsxText:
		return reflect.TypeFor[*JsxText]()
	case KindRegularExpressionLiteral:
		return reflect.TypeFor[*RegularExpressionLiteral]()
	case KindNoSubstitutionTemplateLiteral:
		return reflect.TypeFor[*NoSubstitutionTemplateLiteral]()
	case KindTemplateHead:
		return reflect.TypeFor[*TemplateHead]()
	case KindTemplateMiddle:
		return reflect.TypeFor[*TemplateMiddle]()
	case KindTemplateTail:
		return reflect.TypeFor[*TemplateTail]()
	case KindIdentifier:
		return reflect.TypeFor[*Identifier]()
	case KindPrivateIdentifier:
		return reflect.TypeFor[*PrivateIdentifier]()
	case KindFalseKeyword, KindImportKeyword, KindNullKeyword, KindSuperKeyword, KindThisKeyword, KindTrueKeyword:
		return reflect.TypeFor[*KeywordExpression]()
	case KindVoidKeyword, KindAnyKeyword, KindBooleanKeyword, KindIntrinsicKeyword, KindNeverKeyword, KindNumberKeyword,
		KindObjectKeyword, KindStringKeyword, KindSymbolKeyword, KindUndefinedKeyword, KindUnknownKeyword, KindBigIntKeyword:
		return reflect.TypeFor[*KeywordTypeNode]()
	default:
		return reflect.TypeFor[*Token]()
	}
}
