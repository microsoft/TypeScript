#define AT_PHDR		3
#define AT_PHNUM	5
#define AT_PAGESZ	6

#define PT_DYNAMIC	2
#define PT_PHDR		6
#define PT_GNU_RELRO	0x6474e552

#define DT_RELA		7
#define DT_RELASZ	8

// Elf64_Phdr field offsets and size.
#define P_VADDR		16
#define P_MEMSZ		40
#define PHDR_SIZE	56

// Elf64_Rela field offsets and size.
#define R_OFFSET	0
#define R_INFO		8
#define R_ADDEND	16
#define RELA_SIZE	24

#define PROT_READ	1
#define EXIT_STATUS	127
