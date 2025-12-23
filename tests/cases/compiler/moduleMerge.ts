// This should not compile both B classes are in the same module this should be a collission

namespace A
{
    class B
    {
        public Hello(): string
        {
            return "from private B";
        }
    }
}

namespace A
{
    export class B
    {
        public Hello(): string
        {
            return "from export B";
        }
    }
}