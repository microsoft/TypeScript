/// <reference path="fourslash.ts" />

//// declare const thing: string;

//// // Basic switch block - should prioritize case/default
//// switch (thing) {
////     /*basic*/
//// }

//// // Same - show all completions (not at switch body level)
//// switch (thing) {
////   case 42:
////   /*sameAll1*/
//// }

//// // Same - show all completions (after break at same column as case)
//// switch (thing) {
////   case 42:
////   break;
////   /*sameAll2*/
//// }

//// // Same - show all completions (complex nested structure)
//// switch (thing) {
////   case 42:
////   if (Math.random()) {
////   }
////   else {
////   }
////   /*sameAll3*/
//// }

//// // NEW - prioritize case/default (after break on different column)
//// switch (thing) {
////   case 42:
////     break;
////   /*newPrio1*/
//// }

//// // NEW - prioritize case/default (break on same line)
//// switch (thing) {
////   case 42: break;
////   /*newPrio2*/
//// }

//// // NEW - prioritize case/default (after return)
//// switch (thing) {
////   case 42:
////     return 1;
////   /*newPrio3*/
//// }

//// // NEW - prioritize case/default (after throw)
//// switch (thing) {
////   case 42:
////     throw new Error();
////   /*newPrio4*/
//// }

verify.completions(
    {
        marker: "basic",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "default", sortText: completion.SortText.LocalDeclarationPriority }
        ]
    },
    {
        marker: "sameAll1",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "default", sortText: completion.SortText.GlobalsOrKeywords }
        ]
    },
    {
        marker: "sameAll2",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "default", sortText: completion.SortText.GlobalsOrKeywords }
        ]
    },
    {
        marker: "sameAll3",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "default", sortText: completion.SortText.GlobalsOrKeywords }
        ]
    },
    {
        marker: "newPrio1",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "default", sortText: completion.SortText.LocalDeclarationPriority }
        ]
    },
    {
        marker: "newPrio2",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "default", sortText: completion.SortText.LocalDeclarationPriority }
        ]
    },
    {
        marker: "newPrio3",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "default", sortText: completion.SortText.LocalDeclarationPriority }
        ]
    },
    {
        marker: "newPrio4",
        isNewIdentifierLocation: false,
        includes: [
            { name: "case", sortText: completion.SortText.LocalDeclarationPriority },
            { name: "default", sortText: completion.SortText.LocalDeclarationPriority }
        ]
    }
);