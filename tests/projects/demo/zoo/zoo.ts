import { Dog, createDog } from '../animals/index';

export function createZoo(): Array<Dog> {
    return [
        createDog()
    ];
}

