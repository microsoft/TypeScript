// @strict: true
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: first.ts
interface NumberBase { value: number }
interface StringBase { value: string }

interface Incompatible extends NumberBase {}
interface Incompatible {}
interface LaterBase { value: string }
interface ConflictingBases extends NumberBase {}

class ClassAndInterface { value = ""; }

interface IndexConstraint { [key: string]: number }

// @filename: second.ts
interface Incompatible { value: string }
interface LaterBase extends NumberBase {}
interface ConflictingBases extends StringBase {}
interface ConflictingBases {}

interface ClassAndInterface extends NumberBase {}

interface IndexConstraint { value: string }
