// New quick fix for adding a private method
export function addPrivateMethodFix() {
    return {
        title: 'Add private method',
        edit: (editor) => {
            editor.insertText('\nprivate _baz() {\n    // method body\n}\n');
        },
        filterText: '_baz'
    };
}