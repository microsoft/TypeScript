Mecanografiado
Acciones de GitHub CI Estado de compilación de Devops versión npm Descargas

TypeScript es un lenguaje para JavaScript a escala de aplicación. TypeScript agrega tipos opcionales a JavaScript que admiten herramientas para aplicaciones JavaScript a gran escala para cualquier navegador, para cualquier host, en cualquier sistema operativo. TypeScript se compila en JavaScript legible y basado en estándares. Pruébelo en el patio de recreo y manténgase actualizado a través de nuestro blog y cuenta de Twitter .

Encuentre a otros que estén usando TypeScript en nuestra página de la comunidad .

Instalando
Para la última versión estable:

npm install -g mecanografiado
Para nuestras construcciones nocturnas:

npm install -g mecanografiado @ siguiente
Contribuir
Hay muchas formas de contribuir a TypeScript.

Envíe errores y ayúdenos a verificar las correcciones a medida que se registran.
Revise los cambios en el código fuente .
Interactúe con otros usuarios y desarrolladores de TypeScript en StackOverflow .
Ayúdense unos a otros en la discordia comunitaria de TypeScript .
Únase a la discusión #typescript en Twitter.
Contribuya a la corrección de errores .
Lea la especificación de idioma archivada ( docx , pdf , md ).
Este proyecto ha adoptado el Código de conducta de código abierto de Microsoft . Para obtener más información, consulte las preguntas frecuentes sobre el Código de conducta o póngase en contacto con opencode@microsoft.com si tiene preguntas o comentarios adicionales.

Documentación
TypeScript en 5 minutos
Manual de programación
Página principal
Edificio
Para construir el compilador de TypeScript, asegúrese de tener instalados Git y Node.js.

Clona una copia del repositorio:

clon de git https://github.com/microsoft/TypeScript.git
Cambie al directorio de TypeScript:

cd TypeScript
Instale las herramientas de Gulp y las dependencias de desarrollo:

npm install -g trago
npm ci
Utilice uno de los siguientes para compilar y probar:

gulp local             # Build the compiler into built/local.
gulp clean             # Delete the built compiler.
gulp LKG               # Replace the last known good with the built one.
                       # Bootstrapping step to be executed when the built compiler reaches a stable state.
gulp tests             # Build the test infrastructure using the built compiler.
gulp runtests          # Run tests using the built compiler and test infrastructure.
                       # You can override the specific suite runner used or specify a test for this command.
                       # Use --tests=<testPath> for a specific test and/or --runner=<runnerName> for a specific suite.
                       # Valid runners include conformance, compiler, fourslash, project, user, and docker
                       # The user and docker runners are extended test suite runners - the user runner
                       # works on disk in the tests/cases/user directory, while the docker runner works in containers.
                       # You'll need to have the docker executable in your system path for the docker runner to work.
gulp runtests-parallel # Like runtests, but split across multiple threads. Uses a number of threads equal to the system
                       # core count by default. Use --workers=<number> to adjust this.
gulp baseline-accept   # This replaces the baseline test results with the results obtained from gulp runtests.
gulp lint              # Runs eslint on the TypeScript source.
gulp help              # List the above commands.
Uso
nodo construido / local / tsc.js hello.ts
Mapa vial
Para obtener detalles sobre nuestras funciones planificadas y la dirección futura, consulte nuestra hoja de ruta .
