import { readFile } from "fs/promises";
import { convert } from "html-to-text";
import path from 'path'

// const config = JSON.parse( await readFile("./config.json", "utf-8"));

function fixPath( aPath, aFile ) {                                                      // .(50425.03.1 RAM New Version)
    if (!aFile) { aPath = aPath.replace( /^['"]/, "" ).replace( /['"]$/, "" );          // Remove double-quotes
         aFile  = aPath.split( /[\\\/]/ ).slice(-1)[0]
         aPath  = aPath.split( /[\\\/]/ ).slice(0,-1).join( '/' )
         }       
    var  aDrv  = (aPath || ".").match(   /^[\\\/]*([a-zA-Z]:)/); aDrv = aDrv[1] ? aDrv[1] : ""; 
    var  aDir  = (aPath || ".").replace( /^[\\\/]*[a-zA-Z]:/, ""); 
    var  aFilePath = path.resolve( aDrv, aDir, aFile );
 return  aFilePath;
         }                                                                              // .(50425.03.1 RAM New Version)
// ---------------------------------------------------------------

export  async function  getConfig( aDir ) {
   var  aFilePath = fixPath( aDir, "config.json" );
   try {     
    var config = JSON.parse( await readFile( aFilePath, "utf-8"));
 return config;
    } catch (error) {
        console.error("Error reading config.json:", error.message);
 return '';
        }
   }

export  async function  readText( path, file ) {
    //  Test if path is a local file or a remote URL
    var protocol = path.split("://")[0];
    if (protocol === "http" || protocol === "https") {
    var text = await fetch(path).then(x => x.text());
        return convert(text);
    } else {
//  if (!file) { path = path.replace( /^['"]/, "" ).replace( /['"]$/, "" );  // Remove double-quotes
//               file = path.split( /[\\\/]/ ).slice(-1)[0]
//               path = path.split( /[\\\/]/ ).slice(0,-1).join( '/' )
//               }   
//  if (file) { path =  fixPath( path, file ); }
    var aFilePath    =  fixPath( path, file );
        return  (await  readFile( aFilePath, "utf-8" ));
    }
}

 