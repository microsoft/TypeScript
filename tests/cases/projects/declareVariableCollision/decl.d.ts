// bug 535531: duplicate identifier error reported for "import" declarations in separate files

declare module A
{

    class MyRoot { }

    export module B
    {
        class MyClass{ }
    }
}