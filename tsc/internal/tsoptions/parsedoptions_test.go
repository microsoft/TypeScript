package tsoptions

import (
	"reflect"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

func TestParsedOptionsEquality(t *testing.T) {
	t.Parallel()

	check := func(t *testing.T, a, b *ParsedOptions) {
		t.Helper()
		if got, want := a.Equals(b), reflect.DeepEqual(a, b); got != want {
			t.Fatalf("Got %v, want %v for\n%+v\n%+v", got, want, a, b)
		}
	}
	check(t, nil, nil)
	check(t, nil, &ParsedOptions{})
	check(t, &ParsedOptions{}, nil)
	check(t, &ParsedOptions{}, &ParsedOptions{})
	makeOptions := func() *ParsedOptions {
		return &ParsedOptions{
			CompilerOptions: &core.CompilerOptions{Strict: core.TSTrue},
			WatchOptions: &core.WatchOptions{
				Interval: new(10), FileKind: core.WatchFileKindUseFsEvents,
				ExcludeDir: []string{"dir"}, ExcludeFiles: []string{"file"},
			},
			TypeAcquisition: &core.TypeAcquisition{Enable: core.TSTrue, Include: []string{"a"}, Exclude: []string{"b"}},
			FileNames:       []string{"a.ts", "b.ts"},
			ProjectReferences: []*core.ProjectReference{
				{Path: "/project", OriginalPath: "../project", Circular: true}, nil,
			},
			ContentMappers: []*contentmapper.Mapper{{
				Package: "mapper", Extensions: []string{".vue"}, Options: []byte(`{"setting":true}`),
				Name: "mapper", Version: "1", Exec: []string{"node", "mapper.js"}, CompilerOptions: []string{"target"}, DynamicConfig: true,
				PackageDirectory: "/node_modules/mapper", ContributionID: "extension",
			}, nil},
		}
	}
	check(t, makeOptions(), makeOptions())
	for _, object := range []func(*ParsedOptions) any{
		func(p *ParsedOptions) any { return p },
		func(p *ParsedOptions) any { return p.ContentMappers[0] },
	} {
		typ := reflect.TypeOf(object(makeOptions())).Elem()
		for _, field := range reflect.VisibleFields(typ) {
			if field.Anonymous && field.Type.Kind() == reflect.Struct {
				continue
			}
			t.Run("field coverage/"+typ.Name()+"/"+field.Name, func(t *testing.T) {
				t.Parallel()
				a, b := makeOptions(), makeOptions()
				value := reflect.ValueOf(object(b)).Elem().FieldByIndex(field.Index)
				if !value.CanSet() {
					t.Fatalf("Add explicit equality coverage for %s.%s", typ.Name(), field.Name)
				}
				if value.IsZero() {
					t.Fatalf("Populate %s.%s in makeOptions so its equality is exercised", typ.Name(), field.Name)
				}
				value.SetZero()
				check(t, a, b)
				check(t, b, a)
			})
		}
	}
	for _, test := range []struct {
		name   string
		change func(*ParsedOptions)
	}{
		{"compiler options", func(p *ParsedOptions) { p.CompilerOptions.Strict = core.TSFalse }},
		{"nil compiler options", func(p *ParsedOptions) { p.CompilerOptions = nil }},
		{"nil watch options", func(p *ParsedOptions) { p.WatchOptions = nil }},
		{"watch interval", func(p *ParsedOptions) { p.WatchOptions.Interval = new(20) }},
		{"nil type acquisition", func(p *ParsedOptions) { p.TypeAcquisition = nil }},
		{"type acquisition enable", func(p *ParsedOptions) { p.TypeAcquisition.Enable = core.TSFalse }},
		{"type acquisition include", func(p *ParsedOptions) { p.TypeAcquisition.Include[0] = "other" }},
		{"type acquisition exclude", func(p *ParsedOptions) { p.TypeAcquisition.Exclude[0] = "other" }},
		{"type acquisition filename", func(p *ParsedOptions) { p.TypeAcquisition.DisableFilenameBasedTypeAcquisition = core.TSTrue }},
		{"filenames order", func(p *ParsedOptions) { p.FileNames = []string{"b.ts", "a.ts"} }},
		{"reference path", func(p *ParsedOptions) { p.ProjectReferences[0].Path = "/other" }},
		{"reference original path", func(p *ParsedOptions) { p.ProjectReferences[0].OriginalPath = "./other" }},
		{"reference circular", func(p *ParsedOptions) { p.ProjectReferences[0].Circular = false }},
		{"nil reference", func(p *ParsedOptions) { p.ProjectReferences[0] = nil }},
		{"reference order", func(p *ParsedOptions) {
			p.ProjectReferences[0], p.ProjectReferences[1] = p.ProjectReferences[1], p.ProjectReferences[0]
		}},
		{"mapper package", func(p *ParsedOptions) { p.ContentMappers[0].Package = "other" }},
		{"mapper extension", func(p *ParsedOptions) { p.ContentMappers[0].Extensions[0] = ".other" }},
		{"mapper options", func(p *ParsedOptions) { p.ContentMappers[0].Options = []byte(`{}`) }},
		{"mapper name", func(p *ParsedOptions) { p.ContentMappers[0].Name = "other" }},
		{"mapper version", func(p *ParsedOptions) { p.ContentMappers[0].Version = "2" }},
		{"mapper exec", func(p *ParsedOptions) { p.ContentMappers[0].Exec[1] = "other.js" }},
		{"mapper compiler options", func(p *ParsedOptions) { p.ContentMappers[0].CompilerOptions[0] = "jsx" }},
		{"mapper dynamic config", func(p *ParsedOptions) { p.ContentMappers[0].DynamicConfig = false }},
		{"mapper directory", func(p *ParsedOptions) { p.ContentMappers[0].PackageDirectory = "/other" }},
		{"mapper contribution", func(p *ParsedOptions) { p.ContentMappers[0].ContributionID = "other" }},
		{"nil mapper", func(p *ParsedOptions) { p.ContentMappers[0] = nil }},
		{"mapper order", func(p *ParsedOptions) {
			p.ContentMappers[0], p.ContentMappers[1] = p.ContentMappers[1], p.ContentMappers[0]
		}},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			a, b := makeOptions(), makeOptions()
			test.change(b)
			check(t, a, b)
			check(t, b, a)
			check(t, b, b)
		})
	}

	// Each slice's nil and empty forms remain distinct.
	for _, typ := range []reflect.Type{
		reflect.TypeFor[ParsedOptions](),
		reflect.TypeFor[contentmapper.Definition](), reflect.TypeFor[contentmapper.Manifest](),
	} {
		for field := range typ.Fields() {
			if field.Type.Kind() != reflect.Slice {
				continue
			}
			t.Run(typ.Name()+"/"+field.Name, func(t *testing.T) {
				t.Parallel()
				a, b := makeOptions(), makeOptions()
				for i, p := range []*ParsedOptions{a, b} {
					var object any = p
					switch typ {
					case reflect.TypeFor[contentmapper.Definition]():
						object = &p.ContentMappers[0].Definition
					case reflect.TypeFor[contentmapper.Manifest]():
						object = &p.ContentMappers[0].Manifest
					}
					value := reflect.ValueOf(object).Elem().FieldByIndex(field.Index)
					if i == 0 {
						value.SetZero()
					} else {
						value.Set(reflect.MakeSlice(field.Type, 0, 0))
					}
				}
				check(t, a, b)
				check(t, b, a)
			})
		}
	}

	for field := range reflect.TypeFor[core.WatchOptions]().Fields() {
		t.Run("watch/"+field.Name, func(t *testing.T) {
			t.Parallel()
			for _, aValue := range compilerOptionTestValues(t, field) {
				for _, bValue := range compilerOptionTestValues(t, field) {
					a, b := makeOptions(), makeOptions()
					reflect.ValueOf(a.WatchOptions).Elem().FieldByIndex(field.Index).Set(aValue)
					reflect.ValueOf(b.WatchOptions).Elem().FieldByIndex(field.Index).Set(bValue)
					check(t, a, b)
				}
			}
		})
	}
}

func TestParsedOptionsEqualityIgnoresEmptyTypeAcquisitionLists(t *testing.T) {
	t.Parallel()

	options := []*core.TypeAcquisition{
		{},
		{Include: []string{}},
		{Exclude: []string{}},
		{Include: []string{}, Exclude: []string{}},
	}
	for _, a := range options {
		for _, b := range options {
			left := &ParsedOptions{TypeAcquisition: a}
			right := &ParsedOptions{TypeAcquisition: b}
			if !left.Equals(right) {
				t.Fatalf("Nil and empty type acquisition lists must compare equal: %+v, %+v", a, b)
			}
		}
	}
}

func TestParsedOptionsEqualityIgnoresPathsAllocation(t *testing.T) {
	t.Parallel()

	zero := &collections.OrderedMap[string, []string]{}
	allocated := collections.NewOrderedMapWithSizeHint[string, []string](0)
	a := &ParsedOptions{CompilerOptions: &core.CompilerOptions{Paths: zero}}
	b := &ParsedOptions{CompilerOptions: &core.CompilerOptions{Paths: allocated}}
	if !a.Equals(b) || !b.Equals(a) {
		t.Fatal("Empty paths maps must compare equal regardless of allocation")
	}
}
