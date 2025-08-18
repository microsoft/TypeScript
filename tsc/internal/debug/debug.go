//go:build !release

package debug

import (
	"fmt"
	"reflect"
)

func Assert(expression bool, message ...string) {
	if !expression {
		var msg string
		if len(message) > 0 {
			msg = "False expression: " + message[0]
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

func AssertNil(value any, message ...string) {
	if value != nil && !isNil(value) {
		var msg string
		if len(message) > 0 {
			msg = "Nil expression: " + message[0]
		} else {
			msg = "Nil expression."
		}
		Fail(msg)
	}
}

func AssertEqual(a fmt.Stringer, b fmt.Stringer, message ...string) {
	if a != b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = message[0]
		}
		Fail(fmt.Sprintf("Expected %s == %s. %s", a.String(), b.String(), msg))
	}
}

func AssertLessThan(a int, b int, message ...string) {
	if a >= b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = message[0]
		}
		Fail(fmt.Sprintf("Expected %d < %d. %s", a, b, msg))
	}
}

func AssertLessThanOrEqual(a int, b int, message ...string) {
	if a > b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = message[0]
		}
		Fail(fmt.Sprintf("Expected %d <= %d. %s", a, b, msg))
	}
}

func AssertGreaterThan(a int, b int, message ...string) {
	if a <= b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = message[0]
		}
		Fail(fmt.Sprintf("Expected %d > %d. %s", a, b, msg))
	}
}

func AssertGreaterThanOrEqual(a int, b int, message ...string) {
	if a < b {
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = message[0]
		}
		Fail(fmt.Sprintf("Expected %d >= %d. %s", a, b, msg))
	}
}

func AssertIsDefined(value any, message ...string) {
	if value == nil || isNil(value) { // handle all `nil` interfaces
		var msg string
		if len(message) == 0 {
			msg = ""
		} else {
			msg = message[0]
		}
		Fail(msg)
	}
}

func CheckDefined[T any](value T, message ...string) T {
	AssertIsDefined(value, message...)
	return value
}

func AssertEachIsDefined[TElem any](value []TElem, message ...string) {
	for _, elem := range value {
		AssertIsDefined(elem, message...)
	}
}

func CheckEachIsDefined[TElem any](value []TElem, message ...string) []TElem {
	AssertEachIsDefined(value, message...)
	return value
}

var unexpectedNode []string = []string{"Unexpected node."}

func AssertEachNode[TElem any](nodes []TElem, test func(elem TElem) bool, message ...string) {
	if len(message) == 0 {
		message = unexpectedNode
	}
	for _, elem := range nodes {
		AssertNode(elem, test, message...)
	}
}

func AssertNode[TElem any](node TElem, test func(elem TElem) bool, message ...string) {
	if len(message) == 0 {
		message = unexpectedNode
	}
	AssertIsDefined(node, message...)
	if test != nil {
		Assert(test(node), message...)
	}
}

func AssertNotNode[TElem any](node TElem, test func(elem TElem) bool, message ...string) {
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

func AssertOptionalNode[TElem any](node TElem, test func(elem TElem) bool, message ...string) {
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

func AssertOptionalToken[TElem interface{ KindValue() int16 }](node TElem, kind int16, message ...string) {
	if isNil(node) {
		return
	}
	if len(message) == 0 {
		message = unexpectedNode
	}
	Assert(node.KindValue() == kind, message...)
}

func AssertMissingNode[TElem any](node TElem, message ...string) {
	if len(message) == 0 {
		message = unexpectedNode
	}
	Assert(isNil(node), message...)
}
