package stringutil

import (
	"fmt"
	"regexp"
	"strconv"
)

var placeholderRegexp = regexp.MustCompile(`{(\d+)}`)

func Format(text string, args []any) string {
	return placeholderRegexp.ReplaceAllStringFunc(text, func(match string) string {
		index, err := strconv.ParseInt(match[1:len(match)-1], 10, 0)
		if err != nil || int(index) >= len(args) {
			panic("Invalid formatting placeholder")
		}
		return fmt.Sprintf("%v", args[int(index)])
	})
}
