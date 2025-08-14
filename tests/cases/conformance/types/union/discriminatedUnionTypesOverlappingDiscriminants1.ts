// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57231

type Food = "apple" | "orange";
type Vegetable = "spinach" | "carrot";
type Other = "milk" | "water";
type Custom = "air" | "soil";

type Target =
  | {
      audience: "earth";
      meal:
        | Custom
        | `fruit_${Food}`
        | `vegetable_${Vegetable}`
        | `other_${Other}`;
    }
  | {
      audience: "mars" | "jupiter";
      meal: string;
    };

const target1: Target = {
  audience: "earth",
  meal: `vegetable_carrot`,
};

const target2: Target = {
  meal: `vegetable_carrot`,
  audience: "earth",
};

const typedVegetableWithInitializer: Vegetable = 'carrot';

const target3: Target = {
  audience: "earth",
  meal: `vegetable_${typedVegetableWithInitializer}`,
};

const target4: Target = {
  meal: `vegetable_${typedVegetableWithInitializer}`,
  audience: "earth",
};

const typedCarrotWithInitializer: "carrot" = 'carrot';

const target5: Target = {
  audience: "earth",
  meal: `vegetable_${typedCarrotWithInitializer}`,
};

const target6: Target = {
  meal: `vegetable_${typedCarrotWithInitializer}`,
  audience: "earth",
};

const carrotInitializer = 'carrot';

const target7: Target = {
  audience: "earth",
  meal: `vegetable_${carrotInitializer}`,
};

const target8: Target = {
  meal: `vegetable_${carrotInitializer}`,
  audience: "earth",
};

declare const vegetable: Vegetable;

const target9: Target = {
  audience: "earth",
  meal: `vegetable_${vegetable}`,
};

const target10: Target = {
  meal: `vegetable_${vegetable}`,
  audience: "earth",
};

const typedNonVegetableWithInitializer: "cow" | "pig" = "cow";

// error
const target11: Target = {
  audience: "earth",
  meal: `vegetable_${typedNonVegetableWithInitializer}`,
};

// error
const target12: Target = {
  meal: `vegetable_${typedNonVegetableWithInitializer}`,
  audience: "earth",
};

const typedCowWithInitializer: "cow" = "cow";

// error
const target13: Target = {
  audience: "earth",
  meal: `vegetable_${typedCowWithInitializer}`,
};

// error
const target14: Target = {
  meal: `vegetable_${typedCowWithInitializer}`,
  audience: "earth",
};

const cowInitializer = "cow";

// error
const target15: Target = {
  audience: "earth",
  meal: `vegetable_${cowInitializer}`,
};

// error
const target16: Target = {
  meal: `vegetable_${cowInitializer}`,
  audience: "earth",
};

declare const nonVegetable: "cow" | "pig";

// error
const target17: Target = {
  audience: "earth",
  meal: `vegetable_${nonVegetable}`,
};

// error
const target18: Target = {
  meal: `vegetable_${nonVegetable}`,
  audience: "earth",
};
