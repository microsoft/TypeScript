//// [mappedTypeOverlappingStringEnumKeys.ts]
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


//// [mappedTypeOverlappingStringEnumKeys.js]
// #37859
var TerrestrialAnimalTypes;
(function (TerrestrialAnimalTypes) {
    TerrestrialAnimalTypes["CAT"] = "cat";
    TerrestrialAnimalTypes["DOG"] = "dog";
})(TerrestrialAnimalTypes || (TerrestrialAnimalTypes = {}));
;
var AlienAnimalTypes;
(function (AlienAnimalTypes) {
    AlienAnimalTypes["CAT"] = "cat";
})(AlienAnimalTypes || (AlienAnimalTypes = {}));
;
var catMap = {
    cat: [
        { type: TerrestrialAnimalTypes.CAT, address: "" },
        { type: AlienAnimalTypes.CAT, planet: "" }
    ],
    dog: []
};
