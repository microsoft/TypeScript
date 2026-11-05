#include "textflag.h"
#include "staticpie.h"

#define R_AARCH64_RELATIVE	1027
#define SYS_mprotect		226
#define SYS_exit_group		94

TEXT ·entry(SB),NOSPLIT|NOFRAME,$0
	// Skip argc, argv, and envp to find auxv.
	MOVD	0(RSP), R1
	ADD	$16, RSP, R0
	ADD	R1<<3, R0, R0
envloop:
	MOVD.P	8(R0), R2
	CBNZ	R2, envloop

	// R9 = AT_PHDR, R10 = AT_PHNUM, R11 = AT_PAGESZ
	MOVD	ZR, R9
	MOVD	ZR, R10
	MOVD	ZR, R11
auxloop:
	MOVD	0(R0), R2
	MOVD	8(R0), R3
	ADD	$16, R0
	CBZ	R2, auxdone
	CMP	$AT_PHDR, R2
	CSEL	EQ, R3, R9, R9
	CMP	$AT_PHNUM, R2
	CSEL	EQ, R3, R10, R10
	CMP	$AT_PAGESZ, R2
	CSEL	EQ, R3, R11, R11
	B	auxloop
auxdone:
	CBZ	R9, fail
	CBZ	R10, fail
	CBZ	R11, fail

	// R12 = load bias, R13 = PT_PHDR seen, R14 = PT_DYNAMIC vaddr,
	// R15 = PT_GNU_RELRO vaddr, R16 = PT_GNU_RELRO memsz
	MOVD	R9, R4
	MOVD	R10, R5
	MOVD	ZR, R13
	MOVD	ZR, R14
	MOVD	ZR, R15
	MOVD	ZR, R16
	MOVD	$1, R7
	MOVD	$PT_GNU_RELRO, R17
phloop:
	CBZ	R5, phdone
	MOVWU	0(R4), R2
	MOVD	P_VADDR(R4), R3
	MOVD	P_MEMSZ(R4), R6
	SUB	R3, R9, R8
	CMP	$PT_PHDR, R2
	CSEL	EQ, R8, R12, R12
	CSEL	EQ, R7, R13, R13
	CMP	$PT_DYNAMIC, R2
	CSEL	EQ, R3, R14, R14
	CMP	R17, R2
	CSEL	EQ, R3, R15, R15
	CSEL	EQ, R6, R16, R16
	ADD	$PHDR_SIZE, R4
	SUB	$1, R5
	B	phloop
phdone:
	CBZ	R13, fail
	CBZ	R14, fail

	// R4 = DT_RELA, R5 = DT_RELASZ
	ADD	R12, R14
	MOVD	ZR, R4
	MOVD	ZR, R5
dynloop:
	MOVD	0(R14), R2
	MOVD	8(R14), R3
	ADD	$16, R14
	CBZ	R2, dyndone
	CMP	$DT_RELA, R2
	CSEL	EQ, R3, R4, R4
	CMP	$DT_RELASZ, R2
	CSEL	EQ, R3, R5, R5
	B	dynloop
dyndone:
	ADD	R12, R4
	ADD	R4, R5
relloop:
	CMP	R4, R5
	BEQ	reldone
	MOVD	R_INFO(R4), R2
	CMP	$R_AARCH64_RELATIVE, R2
	BNE	fail
	MOVD	R_OFFSET(R4), R2
	MOVD	R_ADDEND(R4), R3
	ADD	R12, R3
	MOVD	R3, (R12)(R2)
	ADD	$RELA_SIZE, R4
	B	relloop
reldone:
	CBZ	R16, start
	ADD	R12, R15
	ADD	R15, R16, R1
	NEG	R11, R2
	AND	R2, R15
	AND	R2, R1
	SUB	R15, R1, R1
	CBZ	R1, start
	MOVD	R15, R0
	MOVD	$PROT_READ, R2
	MOVD	$SYS_mprotect, R8
	SVC
	CBNZ	R0, fail
start:
	B	_rt0_arm64_linux(SB)
fail:
	MOVD	$EXIT_STATUS, R0
	MOVD	$SYS_exit_group, R8
	SVC
	B	fail

TEXT ·entryAddr(SB),NOSPLIT,$0-8
	MOVD	$·entry(SB), R0
	MOVD	R0, ret+0(FP)
	RET
