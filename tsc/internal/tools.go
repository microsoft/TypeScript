//go:build tools

package tools

// Until https://github.com/golang/go/issues/48429

import (
	_ "golang.org/x/tools/cmd/stringer"
)
