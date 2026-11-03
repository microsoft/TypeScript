#include "textflag.h"
#include "staticpie.h"

#define R_LARCH_RELATIVE	3
#define SYS_mprotect		226
#define SYS_exit_group		94

TEXT ·entry(SB),NOSPLIT|NOFRAME,$0
	// Skip argc, argv, and envp to find auxv.
	MOVV	0(R3), R5
	SLLV	$3, R5
	ADDV	R3, R5
	ADDV	$16, R5
envloop:
	MOVV	0(R5), R6
	ADDV	$8, R5
	BNE	R6, envloop

	// R7 = AT_PHDR, R8 = AT_PHNUM, R9 = AT_PAGESZ
	MOVV	R0, R7
	MOVV	R0, R8
	MOVV	R0, R9
auxloop:
	MOVV	0(R5), R6
	MOVV	8(R5), R10
	ADDV	$16, R5
	BEQ	R6, auxdone
	MOVV	$AT_PHDR, R19
	BNE	R6, R19, notphdraux
	MOVV	R10, R7
notphdraux:
	MOVV	$AT_PHNUM, R19
	BNE	R6, R19, notphnum
	MOVV	R10, R8
notphnum:
	MOVV	$AT_PAGESZ, R19
	BNE	R6, R19, auxloop
	MOVV	R10, R9
	JMP	auxloop
auxdone:
	BEQ	R7, fail
	BEQ	R8, fail
	BEQ	R9, fail

	// R14 = load bias, R15 = PT_PHDR seen, R16 = PT_DYNAMIC vaddr,
	// R17 = PT_GNU_RELRO vaddr, R18 = PT_GNU_RELRO memsz
	MOVV	R7, R12
	MOVV	R8, R13
	MOVV	R0, R15
	MOVV	R0, R16
	MOVV	R0, R17
	MOVV	R0, R18
phloop:
	BEQ	R13, phdone
	MOVWU	0(R12), R6
	MOVV	P_VADDR(R12), R10
	MOVV	$PT_PHDR, R19
	BNE	R6, R19, notphdr
	SUBV	R10, R7, R14
	MOVV	$1, R15
notphdr:
	MOVV	$PT_DYNAMIC, R19
	BNE	R6, R19, notdyn
	MOVV	R10, R16
notdyn:
	MOVV	$PT_GNU_RELRO, R19
	BNE	R6, R19, phnext
	MOVV	R10, R17
	MOVV	P_MEMSZ(R12), R18
phnext:
	ADDV	$PHDR_SIZE, R12
	SUBV	$1, R13
	JMP	phloop
phdone:
	BEQ	R15, fail
	BEQ	R16, fail

	// R12 = DT_RELA, R13 = DT_RELASZ
	ADDV	R14, R16
	MOVV	R0, R12
	MOVV	R0, R13
dynloop:
	MOVV	0(R16), R6
	MOVV	8(R16), R10
	ADDV	$16, R16
	BEQ	R6, dyndone
	MOVV	$DT_RELA, R19
	BNE	R6, R19, notrela
	MOVV	R10, R12
notrela:
	MOVV	$DT_RELASZ, R19
	BNE	R6, R19, dynloop
	MOVV	R10, R13
	JMP	dynloop
dyndone:
	ADDV	R14, R12
	ADDV	R12, R13
	MOVV	$R_LARCH_RELATIVE, R19
relloop:
	BEQ	R12, R13, reldone
	MOVV	R_INFO(R12), R6
	BNE	R6, R19, fail
	MOVV	R_OFFSET(R12), R6
	MOVV	R_ADDEND(R12), R10
	ADDV	R14, R10
	ADDV	R14, R6
	MOVV	R10, 0(R6)
	ADDV	$RELA_SIZE, R12
	JMP	relloop
reldone:
	BEQ	R18, start
	ADDV	R14, R17
	ADDV	R17, R18, R6
	SUBV	R9, R0, R10
	AND	R10, R17
	AND	R10, R6
	SUBV	R17, R6, R5
	BEQ	R5, start
	MOVV	R17, R4
	MOVV	$PROT_READ, R6
	MOVV	$SYS_mprotect, R11
	SYSCALL
	BNE	R4, fail
start:
	JMP	_rt0_loong64_linux(SB)
fail:
	MOVV	$EXIT_STATUS, R4
	MOVV	$SYS_exit_group, R11
	SYSCALL
	JMP	fail

TEXT ·entryAddr(SB),NOSPLIT,$0-8
	MOVV	$·entry(SB), R4
	MOVV	R4, ret+0(FP)
	RET
