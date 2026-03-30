// Close and open multiline comments if the line already contains more comments.

//@Filename: file.tsx
//// const a = <div>
////     Some[||]e{/* T */}ext
//// </div>;

verify.toggleLineComment(
    `const a = <div>
    {/*Some*/}{/* T */}{/*ext*/}
</div>;`);