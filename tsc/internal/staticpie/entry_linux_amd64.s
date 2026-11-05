#include "textflag.h"
#include "staticpie.h"

#define R_X86_64_RELATIVE	8
#define SYS_mprotect		10
#define SYS_exit_group		231

// R15 is avoided because the assembler clobbers it in -shared mode.
TEXT ·entry(SB),NOSPLIT|NOFRAME,$0
	// Skip argc, argv, and envp to find auxv.
	MOVQ	0(SP), AX
	LEAQ	16(SP)(AX*8), R8
envloop:
	MOVQ	0(R8), AX
	ADDQ	$8, R8
	TESTQ	AX, AX
	JNZ	envloop

	// R9 = AT_PHDR, R10 = AT_PHNUM, R11 = AT_PAGESZ
	XORQ	R9, R9
	XORQ	R10, R10
	XORQ	R11, R11
auxloop:
	MOVQ	0(R8), AX
	MOVQ	8(R8), BX
	ADDQ	$16, R8
	TESTQ	AX, AX
	JZ	auxdone
	CMPQ	AX, $AT_PHDR
	CMOVQEQ	BX, R9
	CMPQ	AX, $AT_PHNUM
	CMOVQEQ	BX, R10
	CMPQ	AX, $AT_PAGESZ
	CMOVQEQ	BX, R11
	JMP	auxloop
auxdone:
	TESTQ	R9, R9
	JZ	fail
	TESTQ	R10, R10
	JZ	fail
	TESTQ	R11, R11
	JZ	fail

	// R12 = load bias, BP = PT_PHDR seen, R13 = PT_DYNAMIC vaddr,
	// R14 = PT_GNU_RELRO vaddr, CX = PT_GNU_RELRO memsz
	MOVQ	R9, SI
	MOVQ	R10, DI
	XORQ	BP, BP
	XORQ	R13, R13
	XORQ	R14, R14
	XORQ	CX, CX
phloop:
	TESTQ	DI, DI
	JZ	phdone
	MOVL	0(SI), AX
	CMPL	AX, $PT_PHDR
	JNE	notphdr
	MOVQ	R9, R12
	SUBQ	P_VADDR(SI), R12
	MOVQ	$1, BP
notphdr:
	CMPL	AX, $PT_DYNAMIC
	JNE	notdyn
	MOVQ	P_VADDR(SI), R13
notdyn:
	CMPL	AX, $PT_GNU_RELRO
	JNE	phnext
	MOVQ	P_VADDR(SI), R14
	MOVQ	P_MEMSZ(SI), CX
phnext:
	ADDQ	$PHDR_SIZE, SI
	DECQ	DI
	JMP	phloop
phdone:
	TESTQ	BP, BP
	JZ	fail
	TESTQ	R13, R13
	JZ	fail

	// SI = DT_RELA, DI = DT_RELASZ
	ADDQ	R12, R13
	XORQ	SI, SI
	XORQ	DI, DI
dynloop:
	MOVQ	0(R13), AX
	MOVQ	8(R13), BX
	ADDQ	$16, R13
	TESTQ	AX, AX
	JZ	dyndone
	CMPQ	AX, $DT_RELA
	CMOVQEQ	BX, SI
	CMPQ	AX, $DT_RELASZ
	CMOVQEQ	BX, DI
	JMP	dynloop
dyndone:
	ADDQ	R12, SI
	ADDQ	SI, DI
relloop:
	CMPQ	SI, DI
	JEQ	reldone
	MOVQ	R_INFO(SI), AX
	CMPQ	AX, $R_X86_64_RELATIVE
	JNE	fail
	MOVQ	R_OFFSET(SI), BX
	MOVQ	R_ADDEND(SI), AX
	ADDQ	R12, AX
	MOVQ	AX, (R12)(BX*1)
	ADDQ	$RELA_SIZE, SI
	JMP	relloop
reldone:
	TESTQ	CX, CX
	JZ	start
	ADDQ	R12, R14
	LEAQ	(R14)(CX*1), SI
	MOVQ	R11, AX
	NEGQ	AX
	ANDQ	AX, R14
	ANDQ	AX, SI
	SUBQ	R14, SI
	JZ	start
	MOVQ	R14, DI
	MOVQ	$PROT_READ, DX
	MOVQ	$SYS_mprotect, AX
	SYSCALL
	TESTQ	AX, AX
	JNZ	fail
start:
	// The ABI says DX holds a function to register with atexit.
	XORQ	DX, DX
	JMP	_rt0_amd64_linux(SB)
fail:
	MOVQ	$EXIT_STATUS, DI
	MOVQ	$SYS_exit_group, AX
	SYSCALL
	JMP	fail

TEXT ·entryAddr(SB),NOSPLIT,$0-8
	LEAQ	·entry(SB), AX
	MOVQ	AX, ret+0(FP)
	RET
