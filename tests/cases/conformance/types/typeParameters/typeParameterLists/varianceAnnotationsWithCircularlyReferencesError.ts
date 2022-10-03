// @strict: true
// @declaration: true

type T1<in in> = T1 // Error: circularly references 
type T2<out out> = T2 // Error: circularly references 