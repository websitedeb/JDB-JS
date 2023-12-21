# WELCOME TO JDB.JS #

this page will discuss how to operate with JDB.JS

## What is JDB.JS? ##

JDB.JS is meant to be a NoSQL JSON datbase that people could use

## Dependencies ##
- ### ``` fs ``` ###
- ### ``` path ``` ###

## Installation ##
- ## ``` npm install @web_dev_guy/jdb-js ``` ##

## Linking to your Project Using NPM ##
- ### Import ###
  * ```node
    import { JDB } from "@web_dev_guy/jdb-js";
    ```

- ### Require ###
  * ```node
    const { JDB } = require("@web_dev_guy/jdb-js"); 
    ```

## JDB Class - ##

This is the class which contains all the functions that you can use
the first parameter is the name of your file you will be preforming CRUD on

```node
const { JDB } = require("./JDB/JDB.js") or require("@web_dev_guy/jdb-js");

const jdb = new JDB("jsonfile"); 

// links to "jsonfile.json" in the JDBF folder
```
now we will disscuss the functions in the JDB class

- ``` readData() ```-
  * this function reads the file that you have put as the parameter in the class's constructor.

- ``` writeData(data : String) ```-
  * this function writes the ``` data ``` into the JDBF (Json DataBase Files) , this WILL delete the rest of the contents in the file.

- ``` setData(key : String, value : String | Int) ```-
  * this is basically writeData, but it dosnt delete the existing contents and can only write new data once. It can also change the value of any key you put as the first param any time.

- ``` getData(key : String) ```-
  * this function will get the value of the key which has the same name as the ``` key ``` param.

- ```addData(key : String, value: String | Int) ```-
  * this function appends data (``` "{key}" : "{value}" ```) to the file instead of deleteing the already existing contents.

- ``` addBigData(code : String | Int) ```-
  * this is just add function but you could add lines of JSON code.

- ``` removeData(key : String) ```-
  * this function removes the key and its value from the JDBF code.

- ``` removeAllData(brackets : Boolean) ```-
  * removes all the code from the file, if brackets is true, then the brackets will also be delete, else the brackets will.

- ``` hasData(value : String | Int) ```-
  * returns the name of the key that contains the value that is equal to ``` value ```.

- ``` setKey(name : String, newname : String) ```-
  * changes the key's name from ``` name ``` to ``` newname ```.

- ``` replaceUrl(new_url : String) ```-
  * changes the url of the JDB class to the value of ``` new_url ```.

- ``` terminate() ```-
  * terminates the JDB code

- ``` onReadData(callback(txt : String) : Function) ```-
  * after reading the JDBF and returning the json it will run the ``` callback ``` function that has the param of ``` txt ``` which contains the content of the JDB.

- ``` onWriteData(words : String | Int, callback: Function) ```-
  * after writing the data it runs the ``` callback ``` function.

- ``` onAddData(text : String | Int, callback : Function) ```-
  * its ``` onWriteData ``` but it dosnt delete the existing contents of the text.

## JDB FileSystem - ##

there are also functions that you can use which are not inside of the JDB class, which are super useful.

### ``` CreateJDBF(name : String) ``` -
- This creates a new JDBF in the JDBF folder which has ``` {} ``` as the starting content.

### ``` DestroyJDBF(name : String)``` - ###
- This destorys or deletes the JDBF from the JDBF folder.

### ``` IntegrateJDBF(oldf : String, newf : String) ``` ###
- This moves the data from the file named ``` oldf ``` to the file named ``` newf ```.

### ``` DuplicateJDBF(file : String, name : String) ``` -
- This duplicates the file named ``` file ```. then the duplicated file name is ``` name ```.

### ``` HookJDBF(fileone : String, filetwo : String); ``` -
- This makes ``` filetwo ``` always have the contents of ``` fileone ```.

### Syntax ###

```node
const {CreateJDBF, DeestroyJDBF, IntegrateJDBF} = require("./JDB/JDB.js") or require("@web_dev_guy/jdb-js");

CreateJDBF("example"); // creates new JDBF called example

// ...

IntegrateJDBF("example", "main"); // moves data from example.json to main.json

HookJDBF("main", "main2"); // main is now hooked to main

Duplicate("main", "main_dup"); // duplicated main and renamed the duplicate to main_dup

DestroyJDBF("example"); // destroys the JDBF called example
```
