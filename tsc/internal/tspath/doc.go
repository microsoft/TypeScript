// Package tspath defines rooted path types and canonical path keys:
//
//	                       RootedFilePath
//	                      /
//	string --> RootedPath
//	                      \
//	                       RootedDirectoryPath
//
//	RootedPath + CaseSensitivity --> PathKey
//
// Rooted paths preserve their normalized path text and casing. RootedFilePath
// and RootedDirectoryPath express intended use; they do not assert filesystem
// existence or kind. Use CaseSensitivity.PathKey to derive a PathKey for
// comparison and lookup. Do not use a PathKey as a rooted path.
//
// Use constructors to resolve, normalize, or validate strings. Converting a
// RootedFilePath or RootedDirectoryPath to RootedPath is lossless. Choosing
// file or directory intent for a RootedPath is explicit.
//
// Use ToRootedPath, ToRootedFilePath, or ToRootedDirectoryPath for a path that
// may be relative and needs resolution against a current directory. Use a
// FromNormalized constructor only when the input is already rooted and
// normalized. Derive a PathKey only when a canonical key is needed for a
// comparison, set, or map lookup.
package tspath
