Usage: browserify [entry files] {OPTIONS}

Standard Options:

    --outfile, -o  Write the browserify bundle to this file.
                   If unspecified, browserify prints to stdout.

    --require, -r  A module name or file to bundle.require()
                   Optionally use a colon separator to set the target.

      --entry, -e  An entry point of your app
  
     --ignore, -i  Replace a file with an empty stub. Files can be globs.
 
    --exclude, -u  Omit a file from the output bundle. Files can be globs.

   --external, -x  Reference a file from another bundle. Files can be globs.
  
  --transform, -t  Use a transform module on top-level files.
 
    --command, -c  Use a transform command on top-level files.
   
  --standalone -s  Generate a UMD bundle for the supplied export name.
                   This bundle works with other module systems and sets the name
                   given as a window global if no module system is found.
  
       --debug -d  Enable source maps that allow you to debug your files
                   separately.

       --help, -h  Show this message

For advanced options, type `browserify --help advanced`.

Specify a parameter.
