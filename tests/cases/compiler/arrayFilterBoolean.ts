// @strict: true
const mixed = [undefined, "string", null]
const mixedReadonly: Readonly<typeof mixed> = [undefined, "string", null]

const shouldBeJustStringForMutableArray = mixed.filter(Boolean)

const shouldBeJustStringForReadonlyArray = mixedReadonly.filter(Boolean)