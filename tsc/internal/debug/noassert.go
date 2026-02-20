//go:build noassert

package debug

import (
	"fmt"
)

func Assert(expression bool, message ...string)                                               {}
func AssertNil(value any, message ...string)                                                  {}
func AssertEqual(a fmt.Stringer, b fmt.Stringer, msg ...string)                               {}
func AssertLessThan(a int, b int, message ...string)                                          {}
func AssertLessThanOrEqual(a int, b int, message ...string)                                   {}
func AssertGreaterThan(a int, b int, message ...string)                                       {}
func AssertGreaterThanOrEqual(a int, b int, message ...string)                                {}
func AssertIsDefined(value any, message ...string)                                            {}
func CheckDefined[T any](value T, message ...string) T                                        { return value }
func AssertEachIsDefined[TElem any](value []TElem, message ...string)                         {}
func CheckEachIsDefined[TElem any](value []TElem, message ...string) []TElem                  { return value }
func AssertEachNode[TElem any](nodes []TElem, test func(elem TElem) bool, message ...string)  {}
func AssertNode[TElem any](node TElem, test func(elem TElem) bool, message ...string)         {}
func AssertNotNode[TElem any](node TElem, test func(elem TElem) bool, message ...string)      {}
func AssertOptionalNode[TElem any](node TElem, test func(elem TElem) bool, message ...string) {}
func AssertOptionalToken[TElem interface{ KindValue() int }](node TElem, kind int, message ...string) {
}
func AssertMissingNode[TElem any](node TElem, message ...string) {}
