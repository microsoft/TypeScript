package ast

type FunctionFlags uint32

const (
	FunctionFlagsNormal         FunctionFlags = 0
	FunctionFlagsGenerator      FunctionFlags = 1 << 0
	FunctionFlagsAsync          FunctionFlags = 1 << 1
	FunctionFlagsInvalid        FunctionFlags = 1 << 2
	FunctionFlagsAsyncGenerator FunctionFlags = FunctionFlagsAsync | FunctionFlagsGenerator
)

func GetFunctionFlags(node Node) FunctionFlags {
	if node.IsNil() {
		return FunctionFlagsInvalid
	}
	data := node.BodyData()
	if data.IsNil() {
		return FunctionFlagsInvalid
	}
	flags := FunctionFlagsNormal
	switch node.Kind() {
	case KindFunctionDeclaration, KindFunctionExpression, KindMethodDeclaration:
		if !data.AsteriskToken().IsNil() {
			flags |= FunctionFlagsGenerator
		}
		fallthrough
	case KindArrowFunction:
		if HasSyntacticModifier(node, ModifierFlagsAsync) {
			flags |= FunctionFlagsAsync
		}
	}
	if data.Body().IsNil() {
		flags |= FunctionFlagsInvalid
	}
	return flags
}
