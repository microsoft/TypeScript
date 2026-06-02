//go:build darwin && arm64

#include "textflag.h"

// fsevents_darwin_ffi_arm64.s: arm64 assembly for the FSEvents backend
//
// Contains two functions:
//
//  1. FSEventStreamCreate trampoline: moves the float64 latency bits
//     from R5 (integer register, where syscall6 puts it) into F0 (the
//     AAPCS64 first float argument register), and hardcodes flags to
//     0x11 (kFSEventStreamCreateFlagUseCFTypes |
//     kFSEventStreamCreateFlagFileEvents).
//
//  2. fsEventsCallbackASM: the C-convention callback invoked by FSEvents
//     on a GCD dispatch queue thread. Retains/copies callback data into a
//     payload, writes the payload pointer to eventPipe to wake the Go event-loop
//     goroutine, then returns. Never enters Go ABI. Uses only caller-saved
//     registers (R0-R17) to avoid
//     clobbering AAPCS64 callee-saved R19-R28 and platform-reserved R18.
//     See TestCallbackASMTouchesOnlySafeRegisters for the static check.

// ---------------------------------------------------------------------------
// FSEventStreamCreate trampoline: shuffles the float64 latency argument.
//
// The runtime's syscall6 trampoline loads 6 args into R0-R5:
//   R0=allocator  R1=callback  R2=ctx  R3=paths
//   R4=sinceWhen  R5=latency(bits)
//
// The C function expects latency in F0 (float register) and flags in R5.
// flags is always 0x11 (kFSEventStreamCreateFlagUseCFTypes |
// kFSEventStreamCreateFlagFileEvents), so we hardcode it.
// ---------------------------------------------------------------------------

TEXT fse_FSEventStreamCreate_trampoline<>(SB), NOSPLIT, $0-0
	FMOVD R5, F0
	MOVD  $0x11, R5
	JMP   fse_FSEventStreamCreate(SB)

GLOBL ·fse_FSEventStreamCreate_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamCreate_trampoline_addr(SB)/8, $fse_FSEventStreamCreate_trampoline<>(SB)

// ---------------------------------------------------------------------------
// FSEvents callback: called from a GCD dispatch queue with C convention.
//   R0=streamRef  R1=info  R2=numEvents  R3=paths  R4=flags  R5=ids
//
// `info` (R1) is a pointer to a streamCallback struct:
//   offset  0: eventPipeWrite fd
//
// Because all memory accesses use offset addressing from R1 (a caller-saved
// register), there are no global symbol loads and no REGTMP/R27 hazard.
//
// Frame layout (80 bytes, 16-byte aligned):
//   RSP+ 0: saved R29 (FP)  ← R29 points here (C frame chain)
//   RSP+ 8: saved R30 (LR)
//   RSP+16: payload pointer bytes written to eventPipe
//   RSP+24: saved info pointer
//   RSP+32: saved numEvents
//   RSP+40: saved original flags pointer
//   RSP+48: retained CFArray paths
//   RSP+56: copied flags pointer
// ---------------------------------------------------------------------------

TEXT fsEventsCallbackASM<>(SB), NOSPLIT|NOFRAME, $0
	SUB  $80, RSP
	MOVD R29, (RSP)
	MOVD R30, 8(RSP)
	MOVD RSP, R29

	MOVD R1, 24(RSP) // info
	MOVD R2, 32(RSP) // numEvents
	MOVD R4, 40(RSP) // original flags

	// Retain the CFArray paths because FSEvents owns the callback argument.
	MOVD R3, R0
	BL   fse_CFRetain(SB)
	CBZ  R0, done
	MOVD R0, 48(RSP)

	// Copy the flags array into C heap memory owned by the Go event loop.
	MOVD 32(RSP), R0
	LSL  $2, R0, R0
	BL   fse_malloc(SB)
	CBZ  R0, releasePaths
	MOVD R0, 56(RSP)

	MOVD R0, R0
	MOVD 40(RSP), R1
	MOVD 32(RSP), R2
	LSL  $2, R2, R2
	BL   fse_memcpy(SB)

	// Allocate and populate fsEventsCallbackPayload.
	MOVD $24, R0
	BL   fse_malloc(SB)
	CBZ  R0, freeFlags
	MOVD R0, 16(RSP)

	MOVD 32(RSP), R6
	MOVD R6, (0*8)(R0)
	MOVD 48(RSP), R6
	MOVD R6, (1*8)(R0)
	MOVD 56(RSP), R6
	MOVD R6, (2*8)(R0)

	// write(info->eventPipeWrite, &payload, sizeof(payload)).
writeAgain:
	MOVD 24(RSP), R6     // reload info
	MOVD (0*8)(R6), R0   // eventPipeWrite
	ADD  $16, RSP, R1    // buf (payload pointer)
	MOVD $8, R2          // count
	BL   fse_write(SB)
	CMP  $8, R0
	BEQ  done
	ADD  $1, R0, R6
	CBNZ R6, freePayload
	BL   fse___error(SB)
	MOVW (R0), R0
	CMPW $4, R0          // EINTR
	BEQ  writeAgain
	B    freePayload

freePayload:
	MOVD 16(RSP), R0
	BL   fse_free(SB)

freeFlags:
	MOVD 56(RSP), R0
	BL   fse_free(SB)

releasePaths:
	MOVD 48(RSP), R0
	BL   fse_CFRelease(SB)

	// Return 0.
done:
	MOVD $0, R0
	MOVD (RSP), R29
	MOVD 8(RSP), R30
	ADD  $80, RSP
	RET

GLOBL ·fsEventsCallbackAsmAddr(SB), RODATA, $8
DATA ·fsEventsCallbackAsmAddr(SB)/8, $fsEventsCallbackASM<>(SB)
