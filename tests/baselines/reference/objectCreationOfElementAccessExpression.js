//// [tests/cases/compiler/objectCreationOfElementAccessExpression.ts] ////

//// [objectCreationOfElementAccessExpression.ts]
class Food {
    private amount: number;
    constructor(public name: string) {
        this.amount = 100;
    }
    public eat(amountToEat: number): boolean {
        this.amount -= amountToEat;
        if (this.amount <= 0) {
            this.amount = 0;
            return false;
        }
        else {
            return true;
        }
    }
}
class MonsterFood extends Food {
    constructor(name: string, public flavor: string) {
        super(name);
    }
}
class IceCream extends MonsterFood {
    private isDairyFree: boolean;
    constructor(public flavor: string) {
        super("Ice Cream", flavor);
    }
}
class Cookie extends MonsterFood {
    constructor(public flavor: string, public isGlutenFree: boolean) {
        super("Cookie", flavor);
    }
}
class PetFood extends Food {
    constructor(name: string, public whereToBuy: number) {
        super(name);
    }
}
class ExpensiveOrganicDogFood extends PetFood {
    constructor(public whereToBuy: number) {
        super("Origen", whereToBuy);
    }
}
class ExpensiveOrganicCatFood extends PetFood {
    constructor(public whereToBuy: number, public containsFish: boolean) {
        super("Nature's Logic", whereToBuy);
    }
}
class Slug {
    // This is NOT a food!!!
}

// ElementAccessExpressions can only contain one expression.  There should be a parse error here.
var foods = new PetFood[new IceCream('Mint chocolate chip') , Cookie('Chocolate chip', false) , new Cookie('Peanut butter', true)];
var foods2: MonsterFood[] = new PetFood[new IceCream('Mint chocolate chip') , Cookie('Chocolate chip', false) , new Cookie('Peanut butter', true)];


//// [objectCreationOfElementAccessExpression.js]
class Food {
    constructor(name) {
        this.name = name;
        this.amount = 100;
    }
    eat(amountToEat) {
        this.amount -= amountToEat;
        if (this.amount <= 0) {
            this.amount = 0;
            return false;
        }
        else {
            return true;
        }
    }
}
class MonsterFood extends Food {
    constructor(name, flavor) {
        super(name);
        this.flavor = flavor;
    }
}
class IceCream extends MonsterFood {
    constructor(flavor) {
        super("Ice Cream", flavor);
        this.flavor = flavor;
    }
}
class Cookie extends MonsterFood {
    constructor(flavor, isGlutenFree) {
        super("Cookie", flavor);
        this.flavor = flavor;
        this.isGlutenFree = isGlutenFree;
    }
}
class PetFood extends Food {
    constructor(name, whereToBuy) {
        super(name);
        this.whereToBuy = whereToBuy;
    }
}
class ExpensiveOrganicDogFood extends PetFood {
    constructor(whereToBuy) {
        super("Origen", whereToBuy);
        this.whereToBuy = whereToBuy;
    }
}
class ExpensiveOrganicCatFood extends PetFood {
    constructor(whereToBuy, containsFish) {
        super("Nature's Logic", whereToBuy);
        this.whereToBuy = whereToBuy;
        this.containsFish = containsFish;
    }
}
class Slug {
}
// ElementAccessExpressions can only contain one expression.  There should be a parse error here.
var foods = new PetFood[new IceCream('Mint chocolate chip'), Cookie('Chocolate chip', false), new Cookie('Peanut butter', true)];
var foods2 = new PetFood[new IceCream('Mint chocolate chip'), Cookie('Chocolate chip', false), new Cookie('Peanut butter', true)];
