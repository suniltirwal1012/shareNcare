#Backend

steps to configure backend

-npm init

-make a .gitignore file and configure using google 

-change in package.json if you want to use module js for importing(import instead of require).....Go to package.json file....and below the description add   "type": "module",

-install nodemon as -D dependency

-do the necessary changes in script in package.json and write "dev" instead of "test" and its content by "nodemon src/index.js" 

-make various files and folders under src app.js          controllers     index.js        models          utils
contants.js     db              middlewares     routes

-npm i prettier

-configure .prettierrc file and .prettierignore  under root directory 

-connect to database
    -obtain mongoDb_URI from mongoDB atlas.

-delete the ending slash from the mongoDb URI

-now configure dotenv in index.js by importing it and configuring the path and adding the experimental feature in package.json by this flag..."-r dotenv/config --experimental-json-modules"

-npm i cookie-parser cors




