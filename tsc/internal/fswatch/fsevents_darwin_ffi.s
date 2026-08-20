//go:build darwin && (amd64 || arm64)

#include "textflag.h"

// fsevents_darwin_ffi.s: shared (amd64+arm64) assembly trampolines
//
// Provides JMP trampolines for CoreFoundation, libdispatch, and CoreServices
// functions imported via //go:cgo_import_dynamic. Each trampoline is paired
// with a GLOBL/DATA address that makes the ABI0 entry point available as a
// Go uintptr, following the pattern used by golang.org/x/sys/unix/
// zsyscall_darwin_*.s.
//
// Arch-specific trampolines (FSEventStreamCreate and the FSEvents callback)
// live in fsevents_darwin_ffi_{amd64,arm64}.s.

// Each TEXT trampoline JMPs to the corresponding cgo_import_dynamic symbol.
// JMP is a Go pseudo-instruction that works on all architectures.
//
// Trampoline TEXT symbols are file-scoped (`<>` suffix); there is no
// Go-side declaration for them. Only the `_addr` variables (declared
// `·name(SB)` for package-scope) are visible from Go. Following the
// pattern used by golang.org/x/sys/unix/zsyscall_darwin_*.s.
//
// Each trampoline is paired with its GLOBL/DATA address, which makes the
// ABI0 address of the trampoline available as a Go uintptr.

// ----- CoreFoundation -----

TEXT fse_CFRelease_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFRelease(SB)

GLOBL ·fse_CFRelease_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFRelease_trampoline_addr(SB)/8, $fse_CFRelease_trampoline<>(SB)

TEXT fse_CFStringCreateWithCString_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFStringCreateWithCString(SB)

GLOBL ·fse_CFStringCreateWithCString_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFStringCreateWithCString_trampoline_addr(SB)/8, $fse_CFStringCreateWithCString_trampoline<>(SB)

TEXT fse_CFArrayCreate_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFArrayCreate(SB)

GLOBL ·fse_CFArrayCreate_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFArrayCreate_trampoline_addr(SB)/8, $fse_CFArrayCreate_trampoline<>(SB)

TEXT fse_CFArrayGetValueAtIndex_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFArrayGetValueAtIndex(SB)

GLOBL ·fse_CFArrayGetValueAtIndex_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFArrayGetValueAtIndex_trampoline_addr(SB)/8, $fse_CFArrayGetValueAtIndex_trampoline<>(SB)

TEXT fse_CFStringCreateMutableCopy_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFStringCreateMutableCopy(SB)

GLOBL ·fse_CFStringCreateMutableCopy_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFStringCreateMutableCopy_trampoline_addr(SB)/8, $fse_CFStringCreateMutableCopy_trampoline<>(SB)

TEXT fse_CFStringNormalize_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFStringNormalize(SB)

GLOBL ·fse_CFStringNormalize_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFStringNormalize_trampoline_addr(SB)/8, $fse_CFStringNormalize_trampoline<>(SB)

TEXT fse_CFStringGetLength_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFStringGetLength(SB)

GLOBL ·fse_CFStringGetLength_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFStringGetLength_trampoline_addr(SB)/8, $fse_CFStringGetLength_trampoline<>(SB)

TEXT fse_CFStringGetMaximumSizeForEncoding_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFStringGetMaximumSizeForEncoding(SB)

GLOBL ·fse_CFStringGetMaximumSizeForEncoding_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFStringGetMaximumSizeForEncoding_trampoline_addr(SB)/8, $fse_CFStringGetMaximumSizeForEncoding_trampoline<>(SB)

TEXT fse_CFStringGetCString_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_CFStringGetCString(SB)

GLOBL ·fse_CFStringGetCString_trampoline_addr(SB), RODATA, $8
DATA ·fse_CFStringGetCString_trampoline_addr(SB)/8, $fse_CFStringGetCString_trampoline<>(SB)

// ----- libdispatch -----

TEXT fse_dispatch_queue_create_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_dispatch_queue_create(SB)

GLOBL ·fse_dispatch_queue_create_trampoline_addr(SB), RODATA, $8
DATA ·fse_dispatch_queue_create_trampoline_addr(SB)/8, $fse_dispatch_queue_create_trampoline<>(SB)

TEXT fse_dispatch_release_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_dispatch_release(SB)

GLOBL ·fse_dispatch_release_trampoline_addr(SB), RODATA, $8
DATA ·fse_dispatch_release_trampoline_addr(SB)/8, $fse_dispatch_release_trampoline<>(SB)

TEXT fse_dispatch_sync_f_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_dispatch_sync_f(SB)

GLOBL ·fse_dispatch_sync_f_trampoline_addr(SB), RODATA, $8
DATA ·fse_dispatch_sync_f_trampoline_addr(SB)/8, $fse_dispatch_sync_f_trampoline<>(SB)

TEXT fse_dispatch_noop<>(SB), NOSPLIT|NOFRAME, $0
	RET

GLOBL ·fse_dispatch_noop_addr(SB), RODATA, $8
DATA ·fse_dispatch_noop_addr(SB)/8, $fse_dispatch_noop<>(SB)

// ----- CoreServices / FSEvents -----
// (FSEventStreamCreate is arch-specific; see fsevents_darwin_ffi_{arm64,amd64}.s)

TEXT fse_FSEventStreamSetDispatchQueue_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventStreamSetDispatchQueue(SB)

GLOBL ·fse_FSEventStreamSetDispatchQueue_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamSetDispatchQueue_trampoline_addr(SB)/8, $fse_FSEventStreamSetDispatchQueue_trampoline<>(SB)

TEXT fse_FSEventStreamStart_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventStreamStart(SB)

GLOBL ·fse_FSEventStreamStart_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamStart_trampoline_addr(SB)/8, $fse_FSEventStreamStart_trampoline<>(SB)

TEXT fse_FSEventStreamFlushSync_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventStreamFlushSync(SB)

GLOBL ·fse_FSEventStreamFlushSync_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamFlushSync_trampoline_addr(SB)/8, $fse_FSEventStreamFlushSync_trampoline<>(SB)

TEXT fse_FSEventsGetCurrentEventId_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventsGetCurrentEventId(SB)

GLOBL ·fse_FSEventsGetCurrentEventId_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventsGetCurrentEventId_trampoline_addr(SB)/8, $fse_FSEventsGetCurrentEventId_trampoline<>(SB)

TEXT fse_FSEventStreamStop_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventStreamStop(SB)

GLOBL ·fse_FSEventStreamStop_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamStop_trampoline_addr(SB)/8, $fse_FSEventStreamStop_trampoline<>(SB)

TEXT fse_FSEventStreamInvalidate_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventStreamInvalidate(SB)

GLOBL ·fse_FSEventStreamInvalidate_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamInvalidate_trampoline_addr(SB)/8, $fse_FSEventStreamInvalidate_trampoline<>(SB)

TEXT fse_FSEventStreamRelease_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_FSEventStreamRelease(SB)

GLOBL ·fse_FSEventStreamRelease_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamRelease_trampoline_addr(SB)/8, $fse_FSEventStreamRelease_trampoline<>(SB)

// ----- libSystem -----
// free is also called from Go via libcFree, so it has a trampoline address.

TEXT fse_free_trampoline<>(SB), NOSPLIT, $0-0
	JMP fse_free(SB)

GLOBL ·fse_free_trampoline_addr(SB), RODATA, $8
DATA ·fse_free_trampoline_addr(SB)/8, $fse_free_trampoline<>(SB)
