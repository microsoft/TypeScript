// #37859

enum TerrestrialAnimalTypes {
  CAT = "cat",
  DOG = "dog"
};

enum AlienAnimalTypes {
  CAT = "cat",
};

type AnimalTypes = TerrestrialAnimalTypes | AlienAnimalTypes;

interface TerrestrialCat {
  type: TerrestrialAnimalTypes.CAT;
  address: string;
}

interface AlienCat {
  type: AlienAnimalTypes.CAT
  planet: string;
}

type Cats = TerrestrialCat | AlienCat;

type CatMap = {
  [V in AnimalTypes]: Extract<Cats, { type: V }>[]
};

const catMap: CatMap = {
  cat: [
    { type: TerrestrialAnimalTypes.CAT, address: "" },
    { type: AlienAnimalTypes.CAT, planet: "" }
  ],
  dog: [] as never[]
};
