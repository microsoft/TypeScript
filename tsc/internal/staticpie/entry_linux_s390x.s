#include "textflag.h"
#include "staticpie.h"

#define R_390_RELATIVE		12
#define SYS_mprotect		125
#define SYS_exit_group		248

// R10 and R11 (REGTMP) and R13 (g) are avoided.
TEXT ·entry(SB),NOSPLIT|NOFRAME,$0
	// Skip argc, argv, and envp to find auxv.
	MOVD	0(R15), R5
	SLD	$3, R5
	ADD	R15, R5
	ADD	$16, R5
envloop:
	MOVD	0(R5), R6
	ADD	$8, R5
	CMPBNE	R6, $0, envloop

	// R7 = AT_PHDR, R8 = AT_PHNUM, R9 = AT_PAGESZ
	MOVD	$0, R7
	MOVD	$0, R8
	MOVD	$0, R9
auxloop:
	MOVD	0(R5), R6
	MOVD	8(R5), R12
	ADD	$16, R5
	CMPBEQ	R6, $0, auxdone
	CMPBNE	R6, $AT_PHDR, notphdraux
	MOVD	R12, R7
notphdraux:
	CMPBNE	R6, $AT_PHNUM, notphnum
	MOVD	R12, R8
notphnum:
	CMPBNE	R6, $AT_PAGESZ, auxloop
	MOVD	R12, R9
	BR	auxloop
auxdone:
	CMPBEQ	R7, $0, fail
	CMPBEQ	R8, $0, fail
	CMPBEQ	R9, $0, fail

	// R14 = load bias, R0 = PT_PHDR seen, R1 = PT_DYNAMIC vaddr,
	// R2 = PT_GNU_RELRO vaddr, R3 = PT_GNU_RELRO memsz
	MOVD	R7, R4
	MOVD	R8, R5
	MOVD	$0, R0
	MOVD	$0, R1
	MOVD	$0, R2
	MOVD	$0, R3
	MOVD	$PT_GNU_RELRO, R6
phloop:
	CMPBEQ	R5, $0, phdone
	MOVWZ	0(R4), R12
	MOVD	P_VADDR(R4), R8
	CMPBNE	R12, $PT_PHDR, notphdr
	SUB	R8, R7, R14
	MOVD	$1, R0
notphdr:
	CMPBNE	R12, $PT_DYNAMIC, notdyn
	MOVD	R8, R1
notdyn:
	CMPBNE	R12, R6, phnext
	MOVD	R8, R2
	MOVD	P_MEMSZ(R4), R3
phnext:
	ADD	$PHDR_SIZE, R4
	SUB	$1, R5
	BR	phloop
phdone:
	CMPBEQ	R0, $0, fail
	CMPBEQ	R1, $0, fail

	// R4 = DT_RELA, R5 = DT_RELASZ
	ADD	R14, R1
	MOVD	$0, R4
	MOVD	$0, R5
dynloop:
	MOVD	0(R1), R12
	MOVD	8(R1), R8
	ADD	$16, R1
	CMPBEQ	R12, $0, dyndone
	CMPBNE	R12, $DT_RELA, notrela
	MOVD	R8, R4
notrela:
	CMPBNE	R12, $DT_RELASZ, dynloop
	MOVD	R8, R5
	BR	dynloop
dyndone:
	ADD	R14, R4
	ADD	R4, R5
relloop:
	CMPBEQ	R4, R5, reldone
	MOVD	R_INFO(R4), R12
	CMPBNE	R12, $R_390_RELATIVE, fail
	MOVD	R_OFFSET(R4), R12
	MOVD	R_ADDEND(R4), R8
	ADD	R14, R8
	MOVD	R8, 0(R14)(R12*1)
	ADD	$RELA_SIZE, R4
	BR	relloop
reldone:
	CMPBEQ	R3, $0, start
	ADD	R14, R2
	ADD	R2, R3
	MOVD	R9, R12
	NEG	R12
	AND	R12, R2
	AND	R12, R3
	SUB	R2, R3
	CMPBEQ	R3, $0, start
	MOVD	$PROT_READ, R4
	MOVD	$SYS_mprotect, R1
	SYSCALL
	CMPBNE	R2, $0, fail
start:
	BR	_rt0_s390x_linux(SB)
fail:
	MOVD	$EXIT_STATUS, R2
	MOVD	$SYS_exit_group, R1
	SYSCALL
	BR	fail

TEXT ·entryAddr(SB),NOSPLIT,$0-8
	MOVD	$·entry(SB), R2
	MOVD	R2, ret+0(FP)
	RET
