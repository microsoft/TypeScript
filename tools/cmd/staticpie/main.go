// Command staticpie converts a Linux position-independent executable built by
// Go's internal linker into a static-PIE that runs without an ELF interpreter.
//
// Go can only link PIEs that name the system's dynamic loader in PT_INTERP,
// which ties them to glibc-based systems. The binary must link in
// tsc/internal/staticpie, whose entry function applies the relocations that
// the loader would otherwise apply. This command verifies that the binary
// needs nothing else from a loader, then removes PT_INTERP and makes that
// function the ELF entry point.
package main

import (
	"bytes"
	"debug/elf"
	"debug/gosym"
	"encoding/binary"
	"errors"
	"fmt"
	"io"
	"os"
)

const entrySymbol = "github.com/microsoft/TypeScript/tsc/internal/staticpie.entry"

// relativeRelocs maps each supported machine to its R_*_RELATIVE type, the
// only relocation the entry function knows how to apply.
var relativeRelocs = map[elf.Machine]uint64{
	elf.EM_X86_64:    uint64(elf.R_X86_64_RELATIVE),
	elf.EM_AARCH64:   uint64(elf.R_AARCH64_RELATIVE),
	elf.EM_LOONGARCH: uint64(elf.R_LARCH_RELATIVE),
	elf.EM_PPC64:     uint64(elf.R_PPC64_RELATIVE),
	elf.EM_S390:      uint64(elf.R_390_RELATIVE),
}

const (
	ehdrPhoff     = 32
	ehdrEntry     = 24
	ehdrPhentsize = 54
	phdrSize      = 56
	relaSize      = 24
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: staticpie <binary>")
		os.Exit(2)
	}
	if err := run(os.Args[1]); err != nil {
		fmt.Fprintf(os.Stderr, "staticpie: %s: %v\n", os.Args[1], err)
		os.Exit(1)
	}
}

func run(path string) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	if convertErr := convert(data); convertErr != nil {
		return convertErr
	}
	info, err := os.Stat(path)
	if err != nil {
		return err
	}
	return os.WriteFile(path, data, info.Mode())
}

// convert rewrites data, an ELF executable, in place.
func convert(data []byte) error {
	f, err := elf.NewFile(bytes.NewReader(data))
	if err != nil {
		return err
	}
	defer f.Close()

	if f.Class != elf.ELFCLASS64 {
		return errors.New("not a 64-bit ELF file")
	}
	if f.Type != elf.ET_DYN {
		return fmt.Errorf("type is %v, not ET_DYN; was it built with -buildmode=pie?", f.Type)
	}
	relative, ok := relativeRelocs[f.Machine]
	if !ok || f.Machine == elf.EM_PPC64 && f.ByteOrder != binary.LittleEndian {
		return fmt.Errorf("unsupported machine %v (%v)", f.Machine, f.ByteOrder)
	}
	bo := f.ByteOrder
	if phentsize := bo.Uint16(data[ehdrPhentsize:]); phentsize != phdrSize {
		return fmt.Errorf("unexpected program header size %d", phentsize)
	}

	interp := -1
	var dynamic *elf.Prog
	hasPhdr := false
	for i, p := range f.Progs {
		switch p.Type {
		case elf.PT_INTERP:
			if interp >= 0 {
				return errors.New("multiple PT_INTERP headers")
			}
			interp = i
		case elf.PT_DYNAMIC:
			dynamic = p
		case elf.PT_PHDR:
			hasPhdr = true
		case elf.PT_NULL, elf.PT_LOAD, elf.PT_NOTE, elf.PT_TLS, elf.PT_GNU_STACK, elf.PT_GNU_RELRO:
			continue
		default:
			// Unknown headers (e.g. PT_GNU_PROPERTY) may ask the loader
			// for something the entry function does not do.
			return fmt.Errorf("unsupported program header %v", p.Type)
		}
	}
	if interp < 0 {
		return errors.New("no PT_INTERP; is it already static?")
	}
	if dynamic == nil || !hasPhdr {
		return errors.New("missing PT_DYNAMIC or PT_PHDR")
	}

	relocations, err := checkDynamic(f, dynamic)
	if err != nil {
		return err
	}
	for off := 0; off < len(relocations); off += relaSize {
		// Comparing all of r_info also checks that the symbol index is zero.
		if info := bo.Uint64(relocations[off+8:]); info != relative {
			return fmt.Errorf("unsupported relocation with r_info %#x", info)
		}
	}

	entry, err := findEntry(f)
	if err != nil {
		return err
	}

	interpHdr := bo.Uint64(data[ehdrPhoff:]) + uint64(interp)*phdrSize
	bo.PutUint32(data[interpHdr:], uint32(elf.PT_NULL))
	bo.PutUint64(data[ehdrEntry:], entry)
	return nil
}

// checkDynamic verifies that the dynamic section asks for nothing beyond
// RELATIVE relocations, and returns the contents of DT_RELA.
func checkDynamic(f *elf.File, dynamic *elf.Prog) ([]byte, error) {
	dyn, err := io.ReadAll(dynamic.Open())
	if err != nil {
		return nil, err
	}
	bo := f.ByteOrder
	var relaAddr, relaSz uint64
	bindNow := false
loop:
	for off := 0; off+16 <= len(dyn); off += 16 {
		tag := elf.DynTag(bo.Uint64(dyn[off:]))
		val := bo.Uint64(dyn[off+8:])
		switch tag {
		case elf.DT_NULL:
			break loop
		case elf.DT_RELA:
			relaAddr = val
		case elf.DT_RELASZ:
			relaSz = val
		case elf.DT_RELAENT:
			if val != relaSize {
				return nil, fmt.Errorf("unexpected DT_RELAENT %d", val)
			}
		case elf.DT_FLAGS:
			if flags := elf.DynFlag(val); flags&^elf.DF_BIND_NOW != 0 {
				return nil, fmt.Errorf("unsupported DT_FLAGS %v", flags)
			}
			bindNow = bindNow || elf.DynFlag(val)&elf.DF_BIND_NOW != 0
		case elf.DT_FLAGS_1:
			if flags := elf.DynFlag1(val); flags&^(elf.DF_1_NOW|elf.DF_1_PIE) != 0 {
				return nil, fmt.Errorf("unsupported DT_FLAGS_1 %v", flags)
			}
			bindNow = bindNow || elf.DynFlag1(val)&elf.DF_1_NOW != 0
		case elf.DT_HASH, elf.DT_STRTAB, elf.DT_STRSZ, elf.DT_SYMTAB, elf.DT_SYMENT, elf.DT_DEBUG:
			// The symbol tables are for debuggers; DT_DEBUG is filled in
			// by a loader, if present.
		case elf.DT_PLTGOT, elf.DT_PPC64_OPT:
			// Without DT_JMPREL there are no PLT entries for a loader to
			// resolve, and DT_PPC64_OPT only enables loader optimizations.
		default:
			// Anything else may need a loader to act on it.
			return nil, fmt.Errorf("unsupported dynamic tag %v", tag)
		}
	}
	// The entry function applies all relocations up front, so the binary
	// is effectively BIND_NOW; requiring the flag keeps it advertised.
	if !bindNow {
		return nil, errors.New("not linked with -bindnow")
	}
	if relaSz%relaSize != 0 {
		return nil, fmt.Errorf("DT_RELASZ %d is not a multiple of %d", relaSz, relaSize)
	}
	if relaSz == 0 {
		return nil, nil
	}
	relocations := make([]byte, relaSz)
	for _, p := range f.Progs {
		if p.Type == elf.PT_LOAD && p.Vaddr <= relaAddr && relaAddr+relaSz <= p.Vaddr+p.Filesz {
			if _, err := p.ReadAt(relocations, int64(relaAddr-p.Vaddr)); err != nil {
				return nil, err
			}
			return relocations, nil
		}
	}
	return nil, errors.New("DT_RELA is not within a loaded segment")
}

// findEntry looks up the staticpie entry function in the Go symbol table,
// which is kept even in binaries stripped with -s.
func findEntry(f *elf.File) (uint64, error) {
	pclntab := f.Section(".gopclntab")
	text := f.Section(".text")
	if pclntab == nil || text == nil {
		return 0, errors.New("missing .gopclntab or .text")
	}
	pcln, err := pclntab.Data()
	if err != nil {
		return 0, err
	}
	table, err := gosym.NewTable(nil, gosym.NewLineTable(pcln, text.Addr))
	if err != nil {
		return 0, err
	}
	fn := table.LookupFunc(entrySymbol)
	if fn == nil {
		return 0, fmt.Errorf("%s not found; is the staticpie package linked in?", entrySymbol)
	}
	if fn.Entry < text.Addr || fn.Entry >= text.Addr+text.Size {
		return 0, fmt.Errorf("%s at %#x is outside .text", entrySymbol, fn.Entry)
	}
	return fn.Entry, nil
}
