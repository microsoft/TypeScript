package implicitfma

type namedFloat64 float64

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

func goodConstant() float64 {
	return 1.5 * 2.5
}

func goodInteger(x, y int) int {
	return x * y
}
