import A = require("../A/A");
import AA = require("../A/AA/AA");

export class B
{
    public Create(): IA
    {
        return new A.A();
    }
}

export interface IA
{
    A(): string;
}
