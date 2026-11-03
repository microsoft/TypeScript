// Package staticpie provides an entry point that lets a Go-linked
// position-independent executable start without an ELF interpreter.
//
// Go's internal linker can only produce PIEs that ask the system's dynamic
// loader (e.g. /lib64/ld-linux-x86-64.so.2) to apply their relocations. That
// loader path does not exist on musl-based systems like Alpine, in distroless
// containers, or on NixOS, so those binaries fail to start there.
//
// The tools/cmd/staticpie post-processor removes PT_INTERP from such a binary
// and points its ELF entry at the entry function in this package, which does
// the loader's remaining work (applying R_*_RELATIVE relocations and
// write-protecting PT_GNU_RELRO) before jumping to the Go runtime's usual
// entry point. The result is a static-PIE that runs on any Linux system.
//
// This package must be linked into the binary for the post-processor to find
// the entry function; it has no effect on binaries that are not
// post-processed.
package staticpie
