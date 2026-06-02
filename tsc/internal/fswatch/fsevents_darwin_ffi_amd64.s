//go:build darwin && amd64

#include "textflag.h"

// fsevents_darwin_ffi_amd64.s: amd64 assembly for the FSEvents backend
//
// Contains two functions:
//
//  1. FSEventStreamCreate trampoline: shuffles the float64 latency arg
//     from R9 (integer register, where syscall6 puts it) into X0 (xmm0,
//     where the System V AMD64 ABI expects the first float argument),
//     and hardcodes the flags argument to 0x11
//     (kFSEventStreamCreateFlagUseCFTypes |
//     kFSEventStreamCreateFlagFileEvents).
//
//  2. fsEventsCallbackASM: the C-convention callback invoked by FSEvents
//     on a GCD dispatch queue thread. Retains/copies callback data into a
//     payload, writes the payload pointer to eventPipe to wake the Go event-loop
//     goroutine, then returns. Never enters Go ABI; stays entirely in System V
//     AMD64 calling convention.

// ---------------------------------------------------------------------------
// FSEventStreamCreate trampoline: shuffles the float64 latency argument.
//
// The runtime's syscall6 trampoline loads 6 args into registers:
//   DI=allocator  SI=callback  DX=ctx  CX=paths
//   R8=sinceWhen  R9=latency(bits)
//
// The C function expects latency in X0 (xmm0) and flags in R9.
// flags is always 0x11 (kFSEventStreamCreateFlagUseCFTypes |
// kFSEventStreamCreateFlagFileEvents), so we hardcode it.
// ---------------------------------------------------------------------------

TEXT fse_FSEventStreamCreate_trampoline<>(SB), NOSPLIT, $0-0
	MOVQ R9, X0
	MOVQ $0x11, R9
	JMP  fse_FSEventStreamCreate(SB)

GLOBL ·fse_FSEventStreamCreate_trampoline_addr(SB), RODATA, $8
DATA ·fse_FSEventStreamCreate_trampoline_addr(SB)/8, $fse_FSEventStreamCreate_trampoline<>(SB)

// ---------------------------------------------------------------------------
// FSEvents callback: called from a GCD dispatch queue with C convention.
//   DI=streamRef  SI=info  DX=numEvents  CX=paths  R8=flags  R9=ids
//
// `info` is a pointer to a streamCallback struct (see fsevents_darwin_ffi.go):
//   offset  0: eventPipeWrite fd    (8 bytes)
//
// Stays entirely in C context (no cgocallback). Saves args to the per-stream
// heap-allocated payload, writes its pointer to the stream's eventPipe to wake
// its Go event loop goroutine, then returns immediately.
//
// NOFRAME: this function is entered from C, not Go. We manage the frame
// ourselves following the System V AMD64 ABI.
//
// Frame layout (88 bytes, 16-byte aligned):
//   On entry from C, RSP ≡ 8 mod 16 (return address pushed by CALL).
//   SUB $88 → RSP ≡ 8-88 = 0 mod 16, aligned for CALL into libc.
//   RSP+ 0: payload pointer bytes written to eventPipe
//   RSP+ 8: saved info pointer
//   RSP+16: saved numEvents
//   RSP+24: saved original flags pointer
//   RSP+32: retained CFArray paths
//   RSP+40: copied flags pointer
//   RSP+80: saved RBP  ← BP points here (C frame chain)
//   RSP+88: return address (pushed by C's CALL)
// ---------------------------------------------------------------------------

TEXT fsEventsCallbackASM<>(SB), NOSPLIT|NOFRAME, $0
	SUBQ $88, SP
	MOVQ BP, 80(SP)
	LEAQ 80(SP), BP

	MOVQ SI, 8(SP)  // info
	MOVQ DX, 16(SP) // numEvents
	MOVQ R8, 24(SP) // original flags

	// Retain the CFArray paths because FSEvents owns the callback argument.
	MOVQ  CX, DI
	XORL  AX, AX
	CALL  fse_CFRetain(SB)
	TESTQ AX, AX
	JEQ   done
	MOVQ  AX, 32(SP)

	// Copy the flags array into C heap memory owned by the Go event loop.
	MOVQ  16(SP), DI
	SHLQ  $2, DI
	XORL  AX, AX
	CALL  fse_malloc(SB)
	TESTQ AX, AX
	JEQ   releasePaths
	MOVQ  AX, 40(SP)

	MOVQ AX, DI
	MOVQ 24(SP), SI
	MOVQ 16(SP), DX
	SHLQ $2, DX
	XORL AX, AX
	CALL fse_memcpy(SB)

	// Allocate and populate fsEventsCallbackPayload.
	MOVQ  $24, DI
	XORL  AX, AX
	CALL  fse_malloc(SB)
	TESTQ AX, AX
	JEQ   freeFlags
	MOVQ  AX, 0(SP)

	MOVQ 16(SP), CX
	MOVQ CX, (0*8)(AX)
	MOVQ 32(SP), CX
	MOVQ CX, (1*8)(AX)
	MOVQ 40(SP), CX
	MOVQ CX, (2*8)(AX)

	// write(info->eventPipeWrite, &payload, sizeof(payload)).
writeAgain:
	MOVQ 8(SP), AX       // reload info
	MOVQ (0*8)(AX), DI   // eventPipeWrite
	LEAQ 0(SP), SI       // buf (payload pointer)
	MOVQ $8, DX          // count
	XORL AX, AX          // no float args
	CALL fse_write(SB)
	CMPQ AX, $8
	JEQ  done
	CMPQ AX, $-1
	JNE  freePayload
	XORL AX, AX          // no float args
	CALL fse___error(SB)
	MOVL (AX), AX
	CMPL AX, $4          // EINTR
	JEQ  writeAgain
	JMP  freePayload

freePayload:
	MOVQ 0(SP), DI
	XORL AX, AX
	CALL fse_free(SB)

freeFlags:
	MOVQ 40(SP), DI
	XORL AX, AX
	CALL fse_free(SB)

releasePaths:
	MOVQ 32(SP), DI
	XORL AX, AX
	CALL fse_CFRelease(SB)

	// Return 0.
done:
	XORL AX, AX
	MOVQ 80(SP), BP
	ADDQ $88, SP
	RET

GLOBL ·fsEventsCallbackAsmAddr(SB), RODATA, $8
DATA ·fsEventsCallbackAsmAddr(SB)/8, $fsEventsCallbackASM<>(SB)
