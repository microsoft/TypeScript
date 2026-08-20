package modulespecifiers

import (
	"strings"
)

func CountPathComponents(path string) int {
	initial := 0
	if strings.HasPrefix(path, "./") {
		initial = 2
	}
	return strings.Count(path[initial:], "/")
}
