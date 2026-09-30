package main

import (
	"bytes"
	"errors"
	"fmt"
	"go/token"
	"slices"
	"strconv"
	"strings"
)

type preferenceField struct {
	name     string
	selector string
	property
}

func (s schema) flattenedFields(name, prefix string) []preferenceField {
	def := s.Defs[name]
	var fields []preferenceField
	for _, ref := range def.AllOf {
		base, _ := s.resolve(ref.Ref)
		fields = append(fields, s.flattenedFields(base, prefix+base+".")...)
	}
	for _, name := range sortedKeys(def.Properties) {
		prop := def.Properties[name]
		fields = append(fields, preferenceField{
			name: name, selector: prefix + goName(name), property: prop,
		})
	}
	return fields
}

func (s schema) writePreferenceMethods(out *bytes.Buffer, imports map[string]string) error {
	root, _ := s.resolve(s.Ref)
	if root != "UserPreferences" {
		return errors.New("preference schema must define UserPreferences as its root")
	}
	imports["json"] = "github.com/microsoft/TypeScript/tsc/internal/json"
	fields := s.flattenedFields(root, "")
	enumTypes := map[string]property{}
	for _, field := range fields {
		if len(field.Enum) != 0 {
			if previous, ok := enumTypes[field.GoType]; ok &&
				(!slices.Equal(previous.Enum, field.Enum) ||
					previous.Default != field.Default ||
					previous.AcceptNumber != field.AcceptNumber ||
					previous.GoUnderlying != field.GoUnderlying) {
				return fmt.Errorf("inconsistent parsing metadata for %s", field.GoType)
			}
			enumTypes[field.GoType] = field.property
		}
	}
	for _, name := range sortedKeys(enumTypes) {
		prop := enumTypes[name]
		writeEnumParser(out, prop)
		imports["strings"] = "strings"
		if prop.serializeEnum() {
			writeEnumSerializer(out, prop)
		}
	}

	fmt.Fprintf(out, "func (p *%s) applyRawPreferences(settings map[string]any) {\n", root)
	out.WriteString("for name, value := range settings {\nif value == nil { continue }\nswitch name {\n")
	for _, field := range fields {
		fmt.Fprintf(out, "case %q:\n", field.name)
		writeAssignment(out, "p."+field.selector, field.property)
	}
	out.WriteString("}\n}\n}\n\n")

	out.WriteString("func (p UserPreferences) withConfig(config map[string]any) UserPreferences {\n")
	out.WriteString("p.applyRawPreferences(config)\nif unstable, ok := config[\"unstable\"].(map[string]any); ok { p.applyRawPreferences(unstable) }\n")
	for _, field := range fields {
		if field.Config == "" {
			continue
		}
		fmt.Fprintf(out, "if value, ok := getPreferenceConfigValue(config, %q", field.Config)
		if field.FallbackConfig != "" {
			for fallback := range strings.SplitSeq(field.FallbackConfig, ";") {
				fmt.Fprintf(out, ", %q", fallback)
			}
		}
		out.WriteString("); ok {\n")
		if field.ConfigParser != "" {
			fmt.Fprintf(out, "p.%s = %s(value)\n", field.selector, field.ConfigParser)
		} else {
			out.WriteString("if value != nil {\n")
			writeAssignment(out, "p."+field.selector, field.property)
			out.WriteString("}\n")
		}
		out.WriteString("}\n")
	}
	for _, field := range fields {
		if field.Validator != "" {
			fmt.Fprintf(out, "p.%s = %s(p.%s)\n", field.selector, field.Validator, field.selector)
		}
	}
	out.WriteString("return p\n}\n\n")

	out.WriteString("func (p *UserPreferences) MarshalJSONTo(enc *json.Encoder) error {\nconfig := make(map[string]any)\n")
	for _, field := range fields {
		target := field.Config
		if target == "" {
			target = "unstable." + field.name
		}
		path, inverted := splitConfigTag(target)
		value := "p." + field.selector
		condition := presentCondition(value, field.property)
		if condition != "true" {
			fmt.Fprintf(out, "if %s {\n", condition)
		}
		goType, _ := field.goType()
		serialized := value
		switch {
		case goType == "core.Tristate":
			serialized += ".IsTrue()"
		case field.serializeEnum():
			serialized = serializerName(field.GoType) + "(" + value + ")"
		case field.goKind() == "string":
			serialized = "string(" + value + ")"
		case field.goKind() == "int":
			serialized = "int(" + value + ")"
		case field.goKind() == "array":
			serialized = "slices.Clone(" + value + ")"
			imports["slices"] = "slices"
		}
		if inverted {
			serialized = "!(" + serialized + ")"
		}
		fmt.Fprintf(out, "setNestedValue(config, %q, %s)\n", path, serialized)
		if condition != "true" {
			out.WriteString("}\n")
		}
	}
	out.WriteString("return json.MarshalEncode(enc, config, json.Deterministic(true))\n}\n\n")
	return nil
}

func writeAssignment(out *bytes.Buffer, target string, prop property) {
	goType, _ := prop.goType()
	switch {
	case len(prop.Enum) != 0:
		fmt.Fprintf(out, "%s = %s(value)\n", target, parserName(prop.GoType))
	case goType == "core.Tristate":
		fmt.Fprintf(out, "%s = parsePreferenceTristate(value)\n", target)
	case prop.goKind() == "int":
		fmt.Fprintf(out, "switch value := value.(type) {\ncase int: %s = %s(value)\ncase float64: %s = %s(value)\n}\n", target, goType, target, goType)
	case prop.goKind() == "array":
		fmt.Fprintf(out, "if values, ok := value.([]any); ok {\nresult := make([]string, 0, len(values))\nfor _, value := range values { if value, ok := value.(string); ok { result = append(result, value) } }\n%s = result\n}\n", target)
	default:
		fmt.Fprintf(out, "if value, ok := value.(%s); ok { %s = %s(value) }\n", prop.goKind(), target, goType)
	}
}

func presentCondition(value string, prop property) string {
	goType, _ := prop.goType()
	if prop.serializeEnum() {
		return "true"
	}
	if goType == "core.Tristate" {
		return "(" + value + ".IsTrue() || " + value + ".IsFalse())"
	}
	switch prop.goKind() {
	case "string":
		return value + ` != ""`
	case "int":
		return value + " != 0"
	case "array":
		return value + " != nil"
	default:
		return "true"
	}
}

func (p property) goKind() string {
	if p.GoUnderlying != "" {
		return p.GoUnderlying
	}
	switch p.Type {
	case "boolean":
		return "bool"
	case "integer":
		return "int"
	default:
		return p.Type
	}
}

func parserName(goType string) string {
	_, name, ok := strings.Cut(goType, ".")
	if !ok {
		name = goType
	}
	return "parsePreference" + name
}

func serializerName(goType string) string {
	return strings.Replace(parserName(goType), "parsePreference", "serializePreference", 1)
}

func writeEnumParser(out *bytes.Buffer, prop property) {
	fmt.Fprintf(out, "func %s(value any) %s {\n", parserName(prop.GoType), prop.GoType)
	out.WriteString("if value, ok := value.(string); ok {\n")
	out.WriteString("switch strings.ToLower(value) {\n")
	for _, literal := range prop.Enum {
		fmt.Fprintf(out, "case %q: return %s\n", strings.ToLower(literal), prop.enumConstant(literal))
	}
	out.WriteString("}\n}\n")
	if prop.AcceptNumber {
		fmt.Fprintf(out, "switch value := value.(type) {\ncase int: return %s(value)\ncase float64: return %s(value)\n}\n", prop.GoType, prop.GoType)
	}
	fallback := prop.GoType + `("")`
	if prop.Default != "" {
		fallback = prop.enumConstant(prop.Default)
	}
	fmt.Fprintf(out, "return %s\n}\n\n", fallback)
}

func writeEnumSerializer(out *bytes.Buffer, prop property) {
	fmt.Fprintf(out, "func %s(value %s) string {\nswitch value {\n", serializerName(prop.GoType), prop.GoType)
	for _, value := range prop.Enum {
		fmt.Fprintf(out, "case %s: return %q\n", prop.enumConstant(value), value)
	}
	fmt.Fprintf(out, "default: return %q\n}\n}\n\n", prop.Default)
}

func (p property) enumConstant(value string) string {
	return p.GoType + goName(value)
}

func (p property) serializeEnum() bool {
	return len(p.Enum) != 0 && p.goKind() != "string" && !p.AcceptNumber
}

func splitConfigTag(tag string) (string, bool) {
	path, modifier, _ := strings.Cut(tag, ",")
	return path, modifier == "invert"
}

func (p property) validateParsing() error {
	if p.GoUnderlying != "" && p.GoUnderlying != "string" && p.GoUnderlying != "int" && p.GoUnderlying != "bool" {
		return fmt.Errorf("unsupported Go underlying type %q", p.GoUnderlying)
	}
	for _, name := range []string{p.ConfigParser, p.Validator} {
		if name != "" && !token.IsIdentifier(name) {
			return fmt.Errorf("invalid preference helper %q", name)
		}
		if p.FallbackConfig != "" && p.Config == "" {
			return errors.New("fallback config paths require a primary config path")
		}
	}
	if p.ConfigParser != "" && (p.Config == "" || p.FallbackConfig != "") {
		return errors.New("custom config parsers require a primary path without fallback paths")
	}
	for _, tag := range append([]string{p.Config}, strings.Split(p.FallbackConfig, ";")...) {
		if tag == "" {
			continue
		}
		path, modifier, _ := strings.Cut(tag, ",")
		if path == "" || modifier != "" && modifier != "invert" {
			return fmt.Errorf("invalid configuration mapping %q", tag)
		}
		if modifier == "invert" && p.Type != "boolean" {
			return errors.New("only boolean preferences can invert configuration values")
		}
	}
	if len(p.Enum) == 0 {
		if p.Default != "" || p.AcceptNumber {
			return errors.New("enum parsing metadata requires enum values")
		}
		return nil
	}
	for _, value := range p.Enum {
		if _, err := (property{GoType: p.enumConstant(value)}).goType(); err != nil {
			return err
		}
	}
	if p.AcceptNumber && p.goKind() != "int" {
		return errors.New("numeric parsing is only supported for integer enums")
	}
	if p.Default != "" && !slices.Contains(p.Enum, p.Default) {
		return errors.New("enum default must have a wire value")
	}
	if p.goKind() != "string" && p.Default == "" {
		return errors.New("non-string Go enums require an explicit default")
	}
	values := map[string]bool{}
	constants := map[string]bool{}
	for _, value := range p.Enum {
		if value == "" || constants[p.enumConstant(value)] {
			return errors.New("enum values must have unique Go constant names")
		}
		constants[p.enumConstant(value)] = true
		value = strings.ToLower(value)
		if values[value] {
			return fmt.Errorf("ambiguous case-insensitive enum value %s", strconv.Quote(value))
		}
		values[value] = true
	}
	return nil
}
