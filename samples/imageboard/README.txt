===== TypeScript Sample: Image Board =====

=== Overview ===

This sample implements a complete Node.js application.
Notable features:
- Typed usage of express for server side MVC
- Typed usage of mongodb for server side database
- Typed usage of Node.js 
- Use of TypeScript module syntax  
- Visual Studio project file for working with the project

=== Running ===

Note: Perform steps 3 - 6 with your working directory set to the folder containing this README:

1. Install MongoDB if necessary (see http://docs.mongodb.org/manual/installation/ )

2. Run the following command to launch the MongoDB process:

<mongoinstalldir>\bin\mongod

3. Restore the sample app data to MongoDB in another command prompt with the following command:

<mongoinstalldir>\bin\mongorestore dump

4. Install the app's node dependencies with the following command:

npm install

5. Compile the app with the following command:

tsc --module commonjs app.ts

6. Launch the Node process to serve the app using the following command:

node app.js

7. Open your favorite browser and going to the following URL to access the app:

http://localhost:3000/
