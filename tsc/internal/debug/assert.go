//go:build !noassert

package debug

import (
	"fmt"
	"reflect"
)

func Assert(expression bool, message ...any) {
	if !expression {
		var msg string
		if len(message) > 0 {
			msg = "False expression: " + fmt.Sprint(message...)
		} else {
			msg = "False expression."
		}
		Fail(msg)
	}
}

func isNil[T any](value T) bool {
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Pointer, reflect.UnsafePointer, reflect.Interface, reflect.Slice, reflect.Map, reflect.Chan, reflect.Func:
		{
			return v.IsNil()
		}
	default:
		{
			return false
		}
	}
}

func AssertNil(value any, message ...any) {
	if value != nil && !isNil(value) {
		var msg string
		if len(message) > 0 {
			msg = "Nil expression: " + fmt.Sprint(message...)
		} else {
			msg = "Nil expression."
		}
		Fail(msg)
	}
}

func AssertEqual(a fmt.Stringer, b fmt.Stringer, message ...any) {
	if a != b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = fmt.Sprint(message...)
		}
		Fail(fmt.Sprintf("Expected %s == %s. %s", a.String(), b.String(), msg))
	}
}

func AssertLessThan(a int, b int, message ...any) {
	if a >= b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = fmt.Sprint(message...)
		}
		Fail(fmt.Sprintf("Expected %d < %d. %s", a, b, msg))
	}
}

func AssertLessThanOrEqual(a int, b int, message ...any) {
	if a > b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = fmt.Sprint(message...)
		}
		Fail(fmt.Sprintf("Expected %d <= %d. %s", a, b, msg))
	}
}

func AssertGreaterThan(a int, b int, message ...any) {
	if a <= b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = fmt.Sprint(message...)
		}
		Fail(fmt.Sprintf("Expected %d > %d. %s", a, b, msg))
	}
}

func AssertGreaterThanOrEqual(a int, b int, message ...any) {
	if a < b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = fmt.Sprint(message...)
		}
		Fail(fmt.Sprintf("Expected %d >= %d. %s", a, b, msg))
	}
}

func AssertIsDefined(value any, message ...any) {
	if value == nil || isNil(value) { // handle all `nil` interfaces
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = fmt.Sprint(message...)
		}
		Fail(msg)
	}
}

func CheckDefined[T any](value T, message ...any) T {
	AssertIsDefined(value, message...)
	return value
}

func AssertEachIsDefined[TElem any](value []TElem, message ...any) {
	for _, elem := range value {
		AssertIsDefined(elem, message...)
	}
}

func CheckEachIsDefined[TElem any](value []TElem, message ...any) []TElem {
	AssertEachIsDefined(value, message...)
	return value
}

var unexpectedNode []any = []any{"Unexpected node."}

func AssertEachNode[TElem any](nodes []TElem, test func(elem TElem) bool, message ...any) {
	if len(message) == 0 {
		message = unexpectedNode
	}
	for _, elem := range nodes {
		AssertNode(elem, test, message...)
	}
}

func AssertNode[TElem any](node TElem, test func(elem TElem) bool, message ...any) {
	if len(message) == 0 {
		message = unexpectedNode
	}
	AssertIsDefined(node, message...)
	if test != nil {
		Assert(test(node), message...)
	}
}

func AssertNotNode[TElem any](node TElem, test func(elem TElem) bool, message ...any) {
	if isNil(node) {
		return
	}
	if test == nil {
		return
	}
	if len(message) == 0 {
		message = unexpectedNode
	}
	Assert(!test(node), message...)
}

func AssertOptionalNode[TElem any](node TElem, test func(elem TElem) bool, message ...any) {
	if isNil(node) {
		return
	}
	if test == nil {
		return
	}
	if len(message) == 0 {
		message = unexpectedNode
	}
	Assert(test(node), message...)
}

func AssertOptionalToken[TElem interface{ KindValue() int16 }](node TElem, kind int16, message ...any) {
	if isNil(node) {
		return
	}
	if len(message) == 0 {
		message = unexpectedNode
	}
	Assert(node.KindValue() == kind, message...)
}

func AssertMissingNode[TElem any](node TElem, message ...any) {
	if len(message) == 0 {
		message = unexpectedNode
	}
	Assert(isNil(node), message...)
}
