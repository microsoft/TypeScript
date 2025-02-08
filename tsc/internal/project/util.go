package project

import "strings"

func isDynamicFileName(fileName string) bool {
	return strings.HasPrefix(fileName, "^")
}
