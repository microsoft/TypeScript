// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61207

enum AnimalType {
  cat = "cat",
  dog = "dog",
}

type Animal =
  | {
      type: `${AnimalType.cat}`;
      meow: string;
    }
  | {
      type: `${AnimalType.dog}`;
      bark: string;
    };

function check(p: never) {
  throw new Error("Error!");
}

function action1(animal: Animal) {
  if (animal.type === AnimalType.cat) {
    console.log(animal.meow);
  } else if (animal.type === AnimalType.dog) {
    console.log(animal.bark);
  } else {
    check(animal);
  }
}

function action2(animal: Animal) {
  switch (animal.type) {
    case `${AnimalType.cat}`:
      console.log(animal.meow);
      break;
    case `${AnimalType.dog}`:
      console.log(animal.bark);
      break;
    default:
      check(animal);
  }
}

function action3(animal: Animal) {
  switch (animal.type) {
    case AnimalType.cat:
      console.log(animal.meow);
      break;
    case AnimalType.dog:
      console.log(animal.bark);
      break;
    default:
      check(animal);
  }
}
