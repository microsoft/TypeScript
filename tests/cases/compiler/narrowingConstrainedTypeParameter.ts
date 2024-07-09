// @strictNullChecks: true

// Repro from #10811

interface Pet {
    name: string;
}

function isPet(pet: any): pet is Pet {
    return typeof pet.name === "string";
}

export function speak<TPet extends Pet>(pet: TPet, voice: (pet: TPet) => string): string {
    if (!isPet(pet)) {
        throw new Error("Expected \"pet\" to be a Pet");
    }
    return voice(pet);
}