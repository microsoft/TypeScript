namespace ts {
    describe("unittests:: tsc:: getTypeFactsOfTypes::", () => {
        // See: https://github.com/microsoft/TypeScript/pull/39016
        it("correctly can strip NegativeTypeofFacts when there are PositiveTypeofFacts of the same type via bitmask logic", () => {
            const TypeFacts = (ts as any).TypeFacts;

            // For a set of facts, which include both the positive and negative of each other
            const positiveFacts = [
                TypeFacts.TypeofEQString,
                TypeFacts.TypeofEQNumber,
                TypeFacts.TypeofEQBigInt,
                TypeFacts.TypeofEQBoolean,
                TypeFacts.TypeofEQSymbol,
                TypeFacts.TypeofEQObject,
                TypeFacts.TypeofEQFunction,
                TypeFacts.TypeofEQHostObject,
            ];

            const negativeFacts = [
                TypeFacts.TypeofNEString,
                TypeFacts.TypeofNENumber,
                TypeFacts.TypeofNEBigInt,
                TypeFacts.TypeofNEBoolean,
                TypeFacts.TypeofNESymbol,
                TypeFacts.TypeofNEObject,
                TypeFacts.TypeofNEFunction,
                TypeFacts.TypeofNEHostObject,
            ];

            // Using this line of code (with the 8 which effectively represents the number of EQ types)
            positiveFacts.forEach((pf, i) => {
                const nf = pf << 8;
                assert.equal(nf, negativeFacts[i]);
            });

            // If this test has failed, you _probably_ need to adjust the 8 here, and in the
            // getTypeFactsOfTypes function in checker.ts.
        });
    });
}
