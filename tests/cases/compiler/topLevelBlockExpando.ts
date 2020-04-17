// https://github.com/microsoft/TypeScript/issues/31972
interface Person {
  first: string;
  last: string;
}

{
  const dice = () => Math.floor(Math.random() * 6);
  dice.first = 'Rando';  
  dice.last = 'Calrissian';
  const diceP: Person = dice;  
}
