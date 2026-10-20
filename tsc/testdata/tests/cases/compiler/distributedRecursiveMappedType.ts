// @noEmit: true

type Exact<Shape, Input extends Shape> = Shape extends Shape
    ? { [Key in keyof Shape]: Exact<Shape[Key], Input[Key]> }
    : never;
