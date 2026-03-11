//go:build noassert

package debug

import (
	"fmt"
)

func Assert(expression bool, message ...any)                                               {}
func AssertNil(value any, message ...any)                                                  {}
func AssertEqual(a fmt.Stringer, b fmt.Stringer, msg ...any)                               {}
func AssertLessThan(a int, b int, message ...any)                                          {}
func AssertLessThanOrEqual(a int, b int, message ...any)                                   {}
func AssertGreaterThan(a int, b int, message ...any)                                       {}
func AssertGreaterThanOrEqual(a int, b int, message ...any)                                {}
func AssertIsDefined(value any, message ...any)                                            {}
func CheckDefined[T any](value T, message ...any) T                                        { return value }
func AssertEachIsDefined[TElem any](value []TElem, message ...any)                         {}
func CheckEachIsDefined[TElem any](value []TElem, message ...any) []TElem                  { return value }
func AssertEachNode[TElem any](nodes []TElem, test func(elem TElem) bool, message ...any)  {}
func AssertNode[TElem any](node TElem, test func(elem TElem) bool, message ...any)         {}
func AssertNotNode[TElem any](node TElem, test func(elem TElem) bool, message ...any)      {}
func AssertOptionalNode[TElem any](node TElem, test func(elem TElem) bool, message ...any) {}
func AssertOptionalToken[TElem interface{ KindValue() int }](node TElem, kind int, message ...any) {
}
func AssertMissingNode[TElem any](node TElem, message ...any) {}
