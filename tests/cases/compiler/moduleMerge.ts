// This should not compile both B classes are in the same module this should be a collission

module A
{
    class B
    {
        public Hello(): string
        {
            return "from private B";
        }
    }
}

module A
{
    export class B
    {
        public Hello(): string
        {
            return "from export B";
        }
    }
}