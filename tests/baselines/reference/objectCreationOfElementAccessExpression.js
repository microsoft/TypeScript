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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Food = (function () {
    function Food(name) {
        this.name = name;
        this.amount = 100;
    }
    Food.prototype.eat = function (amountToEat) {
        this.amount -= amountToEat;
        if (this.amount <= 0) {
            this.amount = 0;
            return false;
        }
        else {
            return true;
        }
    };
    return Food;
}());
var MonsterFood = (function (_super) {
    __extends(MonsterFood, _super);
    function MonsterFood(name, flavor) {
        _super.call(this, name);
        this.flavor = flavor;
    }
    return MonsterFood;
}(Food));
var IceCream = (function (_super) {
    __extends(IceCream, _super);
    function IceCream(flavor) {
        _super.call(this, "Ice Cream", flavor);
        this.flavor = flavor;
    }
    return IceCream;
}(MonsterFood));
var Cookie = (function (_super) {
    __extends(Cookie, _super);
    function Cookie(flavor, isGlutenFree) {
        _super.call(this, "Cookie", flavor);
        this.flavor = flavor;
        this.isGlutenFree = isGlutenFree;
    }
    return Cookie;
}(MonsterFood));
var PetFood = (function (_super) {
    __extends(PetFood, _super);
    function PetFood(name, whereToBuy) {
        _super.call(this, name);
        this.whereToBuy = whereToBuy;
    }
    return PetFood;
}(Food));
var ExpensiveOrganicDogFood = (function (_super) {
    __extends(ExpensiveOrganicDogFood, _super);
    function ExpensiveOrganicDogFood(whereToBuy) {
        _super.call(this, "Origen", whereToBuy);
        this.whereToBuy = whereToBuy;
    }
    return ExpensiveOrganicDogFood;
}(PetFood));
var ExpensiveOrganicCatFood = (function (_super) {
    __extends(ExpensiveOrganicCatFood, _super);
    function ExpensiveOrganicCatFood(whereToBuy, containsFish) {
        _super.call(this, "Nature's Logic", whereToBuy);
        this.whereToBuy = whereToBuy;
        this.containsFish = containsFish;
    }
    return ExpensiveOrganicCatFood;
}(PetFood));
var Slug = (function () {
    function Slug() {
    }
    return Slug;
}());
// ElementAccessExpressions can only contain one expression.  There should be a parse error here.
var foods = new PetFood[new IceCream('Mint chocolate chip'), Cookie('Chocolate chip', false), new Cookie('Peanut butter', true)];
var foods2 = new PetFood[new IceCream('Mint chocolate chip'), Cookie('Chocolate chip', false), new Cookie('Peanut butter', true)];
