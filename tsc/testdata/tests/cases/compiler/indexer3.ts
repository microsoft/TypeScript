// @target: es2015
var dateMap: { [x: string]: Date; } = {}
var r: Date = dateMap["hello"] // result type includes indexer using BCT