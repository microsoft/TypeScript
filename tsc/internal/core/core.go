package core

import (
	"iter"
	"regexp"
	"slices"
	"strings"
	"sync"
)

func Filter[T any](slice []T, f func(T) bool) []T {
	for i, value := range slice {
		if !f(value) {
			result := slice[:i]
			for i++; i < len(slice); i++ {
				value = slice[i]
				if f(value) {
					result = append(result, value)
				}
			}
			return result
		}
	}
	return slice
}

func Map[T, U any](slice []T, f func(T) U) []U {
	if len(slice) == 0 {
		return nil
	}
	result := make([]U, len(slice))
	for i, value := range slice {
		result[i] = f(value)
	}
	return result
}

func MapIndex[T, U any](slice []T, f func(T, int) U) []U {
	if len(slice) == 0 {
		return nil
	}
	result := make([]U, len(slice))
	for i, value := range slice {
		result[i] = f(value, i)
	}
	return result
}

func SameMap[T comparable](slice []T, f func(T) T) []T {
	for i, value := range slice {
		mapped := f(value)
		if mapped != value {
			result := make([]T, len(slice))
			copy(result, slice[:i])
			result[i] = mapped
			for j := i + 1; j < len(slice); j++ {
				result[j] = f(slice[j])
			}
			return result
		}
	}
	return slice
}

func SameMapIndex[T comparable](slice []T, f func(T, int) T) []T {
	for i, value := range slice {
		mapped := f(value, i)
		if mapped != value {
			result := make([]T, len(slice))
			copy(result, slice[:i])
			result[i] = mapped
			for j := i + 1; j < len(slice); j++ {
				result[j] = f(slice[j], j)
			}
			return result
		}
	}
	return slice
}

func Same[T any](s1 []T, s2 []T) bool {
	if len(s1) == len(s2) {
		return len(s1) == 0 || &s1[0] == &s2[0]
	}
	return false
}

func Some[T any](slice []T, f func(T) bool) bool {
	for _, value := range slice {
		if f(value) {
			return true
		}
	}
	return false
}

func Every[T any](slice []T, f func(T) bool) bool {
	for _, value := range slice {
		if !f(value) {
			return false
		}
	}
	return true
}

func Find[T any](slice []T, f func(T) bool) T {
	for _, value := range slice {
		if f(value) {
			return value
		}
	}
	return *new(T)
}

func FindLast[T any](slice []T, f func(T) bool) T {
	for i := len(slice) - 1; i >= 0; i-- {
		value := slice[i]
		if f(value) {
			return value
		}
	}
	return *new(T)
}

func FindIndex[T any](slice []T, f func(T) bool) int {
	for i, value := range slice {
		if f(value) {
			return i
		}
	}
	return -1
}

func FindLastIndex[T any](slice []T, f func(T) bool) int {
	for i := len(slice) - 1; i >= 0; i-- {
		value := slice[i]
		if f(value) {
			return i
		}
	}
	return -1
}

func FirstOrNil[T any](slice []T) T {
	if len(slice) != 0 {
		return slice[0]
	}
	return *new(T)
}

func LastOrNil[T any](slice []T) T {
	if len(slice) != 0 {
		return slice[len(slice)-1]
	}
	return *new(T)
}

func FirstOrNilSeq[T any](seq iter.Seq[T]) T {
	if seq != nil {
		for value := range seq {
			return value
		}
	}
	return *new(T)
}

func Concatenate[T any](s1 []T, s2 []T) []T {
	if len(s2) == 0 {
		return s1
	}
	if len(s1) == 0 {
		return s2
	}
	return slices.Concat(s1, s2)
}

func CountWhere[T any](slice []T, f func(T) bool) int {
	count := 0
	for _, value := range slice {
		if f(value) {
			count++
		}
	}
	return count
}

func ReplaceElement[T any](slice []T, i int, t T) []T {
	result := slices.Clone(slice)
	result[i] = t
	return result
}

func InsertSorted[T any](slice []T, element T, cmp func(T, T) int) []T {
	i, _ := slices.BinarySearchFunc(slice, element, cmp)
	return slices.Insert(slice, i, element)
}

func AppendIfUnique[T comparable](slice []T, element T) []T {
	if slices.Contains(slice, element) {
		return slice
	}
	return append(slice, element)
}

var regexps = make(map[string]*regexp.Regexp)
var regexpMutex sync.Mutex

func MakeRegexp(s string) *regexp.Regexp {
	regexpMutex.Lock()
	rx, ok := regexps[s]
	if !ok {
		rx = regexp.MustCompile(s)
		regexps[s] = rx
	}
	regexpMutex.Unlock()
	return rx
}

func EquateStringCaseInsensitive(a, b string) bool {
	// !!!
	// return a == b || strings.ToUpper(a) == strings.ToUpper(b)
	return strings.EqualFold(a, b)
}

func EquateStringCaseSensitive(a, b string) bool {
	return a == b
}
