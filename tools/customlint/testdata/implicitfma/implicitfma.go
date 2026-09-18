package implicitfma

import "testdata/implicitfma/otherpkg"

type namedFloat64 float64

type storage struct {
	product float64
	other   float64
}

type methodFloat float64

var (
	packageX       float64
	packageY       float64
	packageZ       float64
	badPackageFMA  = packageX*packageY + packageZ
	packageProduct = packageX * packageY
	badPackageFlow = packageProduct + packageZ
)

func badFloat64(x, y, z float64) float64 {
	return x*y + z
}

func badFloat32(x, y, z float32) float32 {
	product := x * y
	return z + product
}

func badNamed(x, y, z namedFloat64) namedFloat64 {
	return x*y - z*x
}

func badGeneric[T ~float32 | ~float64](x, y, z T) T {
	product := x * y
	product += z
	return product
}

func badConversionAroundSum(x, y, z float64) float64 {
	return float64(x*y + z)
}

func goodStandalone(x, y float64) float64 {
	return x * y
}

func goodFloat64(x, y, z float64) float64 {
	return float64(x*y) + z
}

func goodBothProducts(x, y, z float64) float64 {
	return float64(x*y) - float64(z*x)
}

func goodFloatToInt(x, y float64) int {
	return int(x * y)
}

func goodReturnRounded(x, y float64) float64 {
	return float64(x * y)
}

func goodParenthesized(x, y float64) float64 {
	return float64((x * y))
}

func goodNamed(x, y namedFloat64) namedFloat64 {
	return namedFloat64(x * y)
}

func goodConversionToNamed(x, y, z float64) namedFloat64 {
	return namedFloat64(x*y) + namedFloat64(z)
}

func goodDelayedRounding(x, y, z float64) float64 {
	product := x * y
	product = float64(product)
	return product + z
}

func goodSignedRounding(x, y, z float64) float64 {
	return float64(-(x * y)) + z
}

func goodRoundingOnAllPaths(x, y, z float64, chooseLeft bool) float64 {
	product := x * y
	if chooseLeft {
		product = float64(product)
	} else {
		product = float64(product)
	}
	return product + z
}

func badRoundingOnOnePath(x, y, z float64, round bool) float64 {
	product := x * y
	if round {
		product = float64(product)
	}
	return product + z
}

func badAssignmentTarget(values []int, x, y, z float64) {
	values[int(x*y+z)] = 0
}

func badCallTarget(functions []func(), x, y, z float64) {
	functions[int(x*y+z)]()
}

func goodRangeOverwrite(values []float64, x, y, z float64) float64 {
	product := x * y
	for _, product = range values {
		return product + z
	}
	return 0
}

func badRangeMayNotRun(values []float64, x, y, z float64) float64 {
	product := x * y
	for _, product = range values {
	}
	return product + z
}

func goodSelectedReceive(ch <-chan float64, x, y, z float64) float64 {
	product := x * y
	select {
	case product = <-ch:
	}
	return product + z
}

func badUnselectedReceive(ch <-chan float64, x, y, z float64) float64 {
	product := x * y
	select {
	case product = <-ch:
	default:
	}
	return product + z
}

func badPointerStorage(pointer *float64, x, y, z float64) float64 {
	*pointer = x * y
	return *pointer + z
}

func badFieldStorage(value *storage, x, y, z float64) float64 {
	value.product = x * y
	return value.product + z
}

func badIndexStorage(values []float64, x, y, z float64) float64 {
	values[0] = x * y
	return values[0] + z
}

func badCompositeStorage(x, y, z float64) float64 {
	value := storage{product: x * y}
	return value.product + z
}

func goodOtherField(value *storage, x, y, z float64) float64 {
	value.product = x * y
	return value.other + z
}

func multiply(x, y float64) float64 {
	return x * y
}

func badInlinedCall(x, y, z float64) float64 {
	return multiply(x, y) + z
}

func identity(value float64) float64 {
	return value
}

func badIdentityCall(x, y, z float64) float64 {
	return identity(x*y) + z
}

func add(value, z float64) float64 {
	return value + z
}

func badInlinedArgument(x, y, z float64) float64 {
	return add(x*y, z)
}

func badImportedMultiply(x, y, z float64) float64 {
	return otherpkg.Multiply(x, y) + z
}

func badImportedIdentity(x, y, z float64) float64 {
	return otherpkg.Identity(x*y) + z
}

func badImportedArgument(x, y, z float64) float64 {
	return otherpkg.Add(x*y, z)
}

func (value methodFloat) identity() methodFloat {
	return value
}

func badMethodReceiver(x, y, z methodFloat) methodFloat {
	return (x * y).identity() + z
}

func badImmediateClosure(x, y, z float64) float64 {
	product := x * y
	return func() float64 {
		return product + z
	}()
}

func goodConstant() float64 {
	return 1.5 * 2.5
}

func goodInteger(x, y int) int {
	return x * y
}
