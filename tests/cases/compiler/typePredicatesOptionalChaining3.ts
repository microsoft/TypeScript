// @strict: true

interface Animal {
  breed?: Breed;
}
interface Breed {
  size?: string;
}

declare function isNil(value: unknown): value is undefined | null;

function getBreedSizeWithoutFunction(animal: Animal): string | undefined {
  if (animal?.breed?.size != null) {
    return animal.breed.size;
  } else {
    return undefined;
  }
}

function getBreedSizeWithFunction(animal: Animal): string | undefined {
  if (!isNil(animal?.breed?.size)) {
    return animal.breed.size;
  } else {
    return undefined;
  }
}
