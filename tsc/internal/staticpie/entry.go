//go:build linux && (amd64 || arm64 || loong64 || ppc64le || s390x)

package staticpie

// entry is the replacement ELF entry point, implemented in assembly.
//
// It runs before any relocations are applied, so it may only use
// PC-relative addressing. It:
//
//  1. finds the auxiliary vector above argv and envp on the initial stack;
//  2. uses AT_PHDR and the PT_PHDR program header to compute the load bias;
//  3. applies every DT_RELA relocation, failing on anything other than
//     R_*_RELATIVE;
//  4. makes the page-aligned part of PT_GNU_RELRO read-only, as ld.so does;
//  5. jumps to the runtime's _rt0_<arch>_linux with the stack untouched.
//
// It exits with status 127 if anything is unexpected.
func entry()

// entryAddr returns the address of entry. Calling it keeps entry in the
// binary without referencing it from Go, which would make the linker emit
// an ABI wrapper under the same name.
func entryAddr() uintptr

var _ = entryAddr()
