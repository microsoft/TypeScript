//go:build darwin && (amd64 || arm64)

package fswatch

// canonicalizePath returns the path in the form the library uses for
// internal bookkeeping and event delivery. On macOS, paths from FSEvents
// arrive using whatever Unicode normalization form is stored on disk;
// usually NFC, but sometimes NFD (e.g. files created on legacy HFS+
// volumes or copied from systems that use NFD). APFS resolves either form
// to the same inode, but raw string comparisons against caller-supplied
// paths (typically NFC) silently break. Normalizing every path the
// library ingests to NFC keeps watch keys, dirWatch lookups, WatchFile
// filters, and event paths all in one consistent form.
func canonicalizePath(p string) string { return normalizeNFC(p) }
