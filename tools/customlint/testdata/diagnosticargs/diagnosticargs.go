package diagnosticargs

import d "testdata/internal/diagnostics"

func diagnostic(message *d.Message, args ...any) {}

func nodeDiagnostic(node int, message *d.Message, args ...any) {}

func calls(args []any, message *d.Message) {
	diagnostic(d.Circularity)
	diagnostic(d.Circularity, "a -> b -> a")
	diagnostic(d.Plain)
	diagnostic(d.Plain, "extra")
	diagnostic(d.Multiple, "one")
	diagnostic(d.Multiple, "one", "two")
	diagnostic(d.Multiple, "one", "two", "three")
	diagnostic(d.Sparse, "one", "two")
	diagnostic(d.Sparse, "one", "two", "three")
	nodeDiagnostic(0, d.Circularity)
	nodeDiagnostic(0, d.Circularity, "cycle")
	d.Circularity.Localize()
	d.Circularity.Localize("cycle")
	(*d.Message).Localize(d.Circularity)
	(*d.Message).Localize(d.Circularity, "cycle")
	diagnostic(d.Circularity, args...)
	diagnostic(message)
	local := d.Circularity
	diagnostic(local)
	unrelated := func(value any, args ...any) {}
	unrelated(d.Circularity)
}
