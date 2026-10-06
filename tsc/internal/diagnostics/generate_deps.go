//go:build generate

package diagnostics

// Keep dependencies used by generate.go visible to go mod tidy.
import _ "github.com/klauspost/compress/gzip"
