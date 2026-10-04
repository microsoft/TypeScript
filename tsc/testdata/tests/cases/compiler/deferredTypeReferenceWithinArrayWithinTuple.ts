// @target: es2015
type TypeStructure =
  | ["or", TypeStructure[]] // problem is only here, when using array
  | ["string"]
  | ["number"] 
  | ["list", TypeStructure] // with just this it is ok