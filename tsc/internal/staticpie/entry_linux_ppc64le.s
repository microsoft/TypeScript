#include "textflag.h"
#include "staticpie.h"

#define R_PPC64_RELATIVE	22
#define SYS_mprotect		125
#define SYS_exit_group		234

// The kernel sets R12 to the entry address, from which the assembler's
// prologue computes R2 (the TOC pointer), and R13 to zero, which the runtime
// relies on. Neither is touched here, nor is R30 (g) or R31 (REGTMP).
TEXT ·entry(SB),NOSPLIT|NOFRAME,$0
	// Skip argc, argv, and envp to find auxv.
	MOVD	0(R1), R5
	SLD	$3, R5
	ADD	R1, R5
	ADD	$16, R5
envloop:
	MOVD	0(R5), R6
	ADD	$8, R5
	CMP	R6, $0
	BNE	envloop

	// R7 = AT_PHDR, R8 = AT_PHNUM, R9 = AT_PAGESZ
	MOVD	$0, R7
	MOVD	$0, R8
	MOVD	$0, R9
auxloop:
	MOVD	0(R5), R6
	MOVD	8(R5), R10
	ADD	$16, R5
	CMP	R6, $0
	BEQ	auxdone
	CMP	R6, $AT_PHDR
	BNE	notphdraux
	MOVD	R10, R7
notphdraux:
	CMP	R6, $AT_PHNUM
	BNE	notphnum
	MOVD	R10, R8
notphnum:
	CMP	R6, $AT_PAGESZ
	BNE	auxloop
	MOVD	R10, R9
	BR	auxloop
auxdone:
	CMP	R7, $0
	BEQ	fail
	CMP	R8, $0
	BEQ	fail
	CMP	R9, $0
	BEQ	fail

	// R14 = load bias, R15 = PT_PHDR seen, R16 = PT_DYNAMIC vaddr,
	// R17 = PT_GNU_RELRO vaddr, R18 = PT_GNU_RELRO memsz
	MOVD	R7, R11
	MOVD	R8, R19
	MOVD	$0, R15
	MOVD	$0, R16
	MOVD	$0, R17
	MOVD	$0, R18
	MOVD	$PT_GNU_RELRO, R20
phloop:
	CMP	R19, $0
	BEQ	phdone
	MOVWZ	0(R11), R6
	MOVD	P_VADDR(R11), R10
	CMP	R6, $PT_PHDR
	BNE	notphdr
	SUB	R10, R7, R14
	MOVD	$1, R15
notphdr:
	CMP	R6, $PT_DYNAMIC
	BNE	notdyn
	MOVD	R10, R16
notdyn:
	CMP	R6, R20
	BNE	phnext
	MOVD	R10, R17
	MOVD	P_MEMSZ(R11), R18
phnext:
	ADD	$PHDR_SIZE, R11
	ADD	$-1, R19
	BR	phloop
phdone:
	CMP	R15, $0
	BEQ	fail
	CMP	R16, $0
	BEQ	fail

	// R11 = DT_RELA, R19 = DT_RELASZ
	ADD	R14, R16
	MOVD	$0, R11
	MOVD	$0, R19
dynloop:
	MOVD	0(R16), R6
	MOVD	8(R16), R10
	ADD	$16, R16
	CMP	R6, $0
	BEQ	dyndone
	CMP	R6, $DT_RELA
	BNE	notrela
	MOVD	R10, R11
notrela:
	CMP	R6, $DT_RELASZ
	BNE	dynloop
	MOVD	R10, R19
	BR	dynloop
dyndone:
	ADD	R14, R11
	ADD	R11, R19
relloop:
	CMP	R11, R19
	BEQ	reldone
	MOVD	R_INFO(R11), R6
	CMP	R6, $R_PPC64_RELATIVE
	BNE	fail
	MOVD	R_OFFSET(R11), R6
	MOVD	R_ADDEND(R11), R10
	ADD	R14, R10
	MOVD	R10, (R14)(R6)
	ADD	$RELA_SIZE, R11
	BR	relloop
reldone:
	CMP	R18, $0
	BEQ	start
	ADD	R14, R17
	ADD	R17, R18, R6
	NEG	R9, R10
	AND	R10, R17
	AND	R10, R6
	SUB	R17, R6, R4
	CMP	R4, $0
	BEQ	start
	MOVD	R17, R3
	MOVD	$PROT_READ, R5
	MOVD	$SYS_mprotect, R0
	SYSCALL
	BVS	fail
start:
	BR	_rt0_ppc64le_linux(SB)
fail:
	MOVD	$EXIT_STATUS, R3
	MOVD	$SYS_exit_group, R0
	SYSCALL
	BR	fail

TEXT ·entryAddr(SB),NOSPLIT,$0-8
	MOVD	$·entry(SB), R3
	MOVD	R3, ret+0(FP)
	RET
