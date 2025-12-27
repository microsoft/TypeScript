//// [tests/cases/compiler/exhaustiveSwitchSingleEnumMember.ts] ////

//// [exhaustiveSwitchSingleEnumMember.ts]
// Test exhaustiveness checking for single-member enums
// Repro for #23155

// Single enum member should narrow to never in default case
enum SingleMemberEnum {
  VALUE = 'VALUE'
}

function testSingleEnumExhaustive(x: SingleMemberEnum) {
  switch (x) {
    case SingleMemberEnum.VALUE:
      return 1;
  }
  // x should be narrowed to never here
  const n: never = x;
}

// With explicit default clause
function testSingleEnumWithDefault(x: SingleMemberEnum) {
  switch (x) {
    case SingleMemberEnum.VALUE:
      return 1;
    default:
      // x should be narrowed to never in default
      const n: never = x;
      throw new Error("unreachable");
  }
}

// Numeric enum
enum NumericSingleMember {
  ONE = 1
}

function testNumericSingleEnum(x: NumericSingleMember) {
  switch (x) {
    case NumericSingleMember.ONE:
      return 'one';
  }
  const n: never = x;
}

// Test that non-enum single types also work
type SingleLiteral = 'onlyValue';

function testSingleLiteral(x: SingleLiteral) {
  switch (x) {
    case 'onlyValue':
      return 1;
  }
  const n: never = x;
}

// Ensure unions still work correctly (existing behavior)
enum MultiMemberEnum {
  A = 'A',
  B = 'B'
}

function testMultiEnum(x: MultiMemberEnum) {
  switch (x) {
    case MultiMemberEnum.A:
      return 1;
    case MultiMemberEnum.B:
      return 2;
  }
  // Should narrow to never
  const n: never = x;
}

// Test incomplete coverage - should error
function testIncomplete(x: MultiMemberEnum) {
  switch (x) {
    case MultiMemberEnum.A:
      return 1;
  }
  // Should NOT narrow to never - B is not handled
  const n: never = x; // Error expected
}

// Note: Discriminated union narrowing for single-member types requires
// narrowing through property access, which is more complex and not yet implemented.


//// [exhaustiveSwitchSingleEnumMember.js]
"use strict";
// Test exhaustiveness checking for single-member enums
// Repro for #23155
// Single enum member should narrow to never in default case
var SingleMemberEnum;
(function (SingleMemberEnum) {
    SingleMemberEnum["VALUE"] = "VALUE";
})(SingleMemberEnum || (SingleMemberEnum = {}));
function testSingleEnumExhaustive(x) {
    switch (x) {
        case SingleMemberEnum.VALUE:
            return 1;
    }
    // x should be narrowed to never here
    var n = x;
}
// With explicit default clause
function testSingleEnumWithDefault(x) {
    switch (x) {
        case SingleMemberEnum.VALUE:
            return 1;
        default:
            // x should be narrowed to never in default
            var n = x;
            throw new Error("unreachable");
    }
}
// Numeric enum
var NumericSingleMember;
(function (NumericSingleMember) {
    NumericSingleMember[NumericSingleMember["ONE"] = 1] = "ONE";
})(NumericSingleMember || (NumericSingleMember = {}));
function testNumericSingleEnum(x) {
    switch (x) {
        case NumericSingleMember.ONE:
            return 'one';
    }
    var n = x;
}
function testSingleLiteral(x) {
    switch (x) {
        case 'onlyValue':
            return 1;
    }
    var n = x;
}
// Ensure unions still work correctly (existing behavior)
var MultiMemberEnum;
(function (MultiMemberEnum) {
    MultiMemberEnum["A"] = "A";
    MultiMemberEnum["B"] = "B";
})(MultiMemberEnum || (MultiMemberEnum = {}));
function testMultiEnum(x) {
    switch (x) {
        case MultiMemberEnum.A:
            return 1;
        case MultiMemberEnum.B:
            return 2;
    }
    // Should narrow to never
    var n = x;
}
// Test incomplete coverage - should error
function testIncomplete(x) {
    switch (x) {
        case MultiMemberEnum.A:
            return 1;
    }
    // Should NOT narrow to never - B is not handled
    var n = x; // Error expected
}
// Note: Discriminated union narrowing for single-member types requires
// narrowing through property access, which is more complex and not yet implemented.
