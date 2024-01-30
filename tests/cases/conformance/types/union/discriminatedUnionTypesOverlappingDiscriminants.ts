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
