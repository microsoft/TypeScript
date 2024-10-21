package compiler

import (
	"strconv"
	"strings"
)

func (c *Checker) symbolToString(s *Symbol) string {
	return s.name // !!!
}

func (c *Checker) typeToString(t *Type) string {
	p := c.newPrinter()
	p.printType(t)
	return p.string()
}

type Printer struct {
	c     *Checker
	sb    strings.Builder
	depth int
}

func (c *Checker) newPrinter() *Printer {
	return &Printer{c: c}
}

func (p *Printer) string() string {
	return p.sb.String()
}

func (p *Printer) print(s string) {
	p.sb.WriteString(s)
}

func (p *Printer) printType(t *Type) {
	switch {
	case t.flags&TypeFlagsIntrinsic != 0:
		p.print(t.IntrinsicType().intrinsicName)
	case t.flags&TypeFlagsLiteral != 0:
		p.printLiteralType(t)
	case t.flags&TypeFlagsObject != 0:
		p.printObjectType(t)
	}
}

func (p *Printer) printLiteralType(t *Type) {
	if t.flags&TypeFlagsEnumLiteral != 0 {
		p.printEnumLiteral(t)
	} else {
		switch value := t.LiteralType().value.(type) {
		case string:
			p.printStringLiteral(value)
		case float64:
			p.printNumberLiteral(value)
		case bool:
			p.printBooleanLiteral(value)
		case PseudoBigint:
			p.printBigintLiteral(value)
		}
	}
}

func (p *Printer) printStringLiteral(s string) {
	p.print("\"")
	p.print(s)
	p.print("\"")
}

func (p *Printer) printNumberLiteral(f float64) {
	p.print(strconv.FormatFloat(f, 'g', -1, 64))
}

func (p *Printer) printBooleanLiteral(b bool) {
	p.print(ifElse(b, "true", "false"))
}

func (p *Printer) printBigintLiteral(b PseudoBigint) {
	if b.negative {
		p.print("-")
	}
	p.print(b.base10Value)
}

func (p *Printer) printEnumLiteral(t *Type) {
	p.print(p.c.getParentOfSymbol(t.symbol).name)
	p.print(".")
	p.print(t.symbol.name)
}

func (p *Printer) printObjectType(t *Type) {
	if p.depth != 0 {
		p.print("???")
		return
	}
	p.depth++
	props := p.c.getPropertiesOfObjectType(t)
	sortSymbols(props)
	p.print("{")
	var tail bool
	for _, prop := range props {
		if tail {
			p.print(",")
		}
		p.print(" ")
		p.print(prop.name)
		p.print(": ")
		p.printType(p.c.getTypeOfSymbol(prop))
		tail = true
	}
	if tail {
		p.print(" ")
	}
	p.print("}")
	p.depth--
}
