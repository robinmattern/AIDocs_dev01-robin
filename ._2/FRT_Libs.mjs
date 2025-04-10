   import { join, dirname } from 'path';
   import { readdirSync, readFileSync } from 'fs';
   import { fileURLToPath } from 'url';

//    var __dirname      =  dirname(fileURLToPath(import.meta.url));

// Base path from environment variable (set in your system or .env)
//    var __basedir      =  process.env.REPOS_PATH || process.env.HOME || '/';
      var __dirname      =  dirname( fileURLToPath(import.meta.url) );
//     var  aReposDir    =  findReposDir( "." );
//     var  fullPath     =  resolve( baseDir, reposDir);
       var  aDelim       =  process.platform === 'win32' ? ';' : ':';
//     var  aBin_PATH    =  process.env.PATH.match( /.+?._0\/bin/ ) 
//     var  aBin_PATH    =  process.env.PATH.split( /[:;]/ ).find( p => p.includes( /_0[\\\/]bin/ ) );
       var  aBin_PATH    =  process.env.PATH.split( aDelim ).find( p => /\.?_0[\\\/]bin/.test( p ) )  
        if (aBin_PATH  ===  undefined ) { console.error( "No ._0/bin in PATH" ); process.exit( 1 ) }

       var  bQuiet       =  0                                                           // .(50405.06.1)
       var  pLibs        =  { }
            pLibs.bin    = (      ) => aBin_PATH                                        // .(50405.06.2) 
            pLibs.FRT    = (bQuiet) => getPath( 'frt',    'FRTs', bQuiet )              // .(50405.06.3 Beg) 
            pLibs.JPT    = (bQuiet) => getPath( 'jpt',    'JPTs', bQuiet ) 
            pLibs.MWT    = (bQuiet) => getPath(           'MWTs', bQuiet ) 
            pLibs.AIC    = (bQuiet) => getPath( 'aic',    'FRTs/AICodeR', bQuiet ) 
            pLibs.AIDocs = (bQuiet) => getPath( 'aidocs', 'run-aidocs', bQuiet ).replace( /[\\\/]run-aidocs$/, '' ) 
            pLibs.AnyLLM = (bQuiet) => getPath( 'anyllm', 'AnyLLM', bQuiet )            // .(50405.06.3 End)

//  ------  -----------  =  ---------------------------------------------------------

  function  getPath( aLib, aLIB, bQuiet ) {    
//          console.log(  `  joined path: '${ join( aBin_PATH, aLib ) }'` ) 
            bQuiet       =  (typeof(bQuiet) != 'undefined') ? bQuiet : 0                // .(50405.06.4)
       if (!aLIB) {  return  join( __dirname, aLib ) }
   
       try {
       var  aBin_Script  =  readFileSync( join( aBin_PATH, aLib ), 'ASCII' ) 
        } catch(e) { return null }
       var  aLib_PATH    =  aBin_Script.split( '\n').find( p => p.includes( aLIB)) || '' 
            aLib_PATH    =  aLib_PATH.trim().match( new RegExp( `.+[\\\/]${aLIB}`, 'i' ) )  
        if (aLib_PATH   ==  null ) { if (bQuiet != 1) { 
            console.error( `* No ${aLIB} script path found.` ) }; 
    return  null }
    return  fixPath( aLib_PATH[0] )                                                     // .(50405.06.5 RAM Add fixPath)               
            }  // eof getPath 
//  ------  -----------  =  ---------------------------------------------------------

  function  fixPath( aPath ) {
//     var  r1stLetter   =  /^\/([a-z])\//i;
//  return  aLib_PATH[0] =  resolve( r1stLetter.test(aLib_PATH[0]) ? aLib_PATH[0].replace( r1stLetter, '$1:\\') : aLib_PATH[0] )
       if (!aPath) { return aPath }
        if (process.platform === 'win32') { 
//          aPath        = "file:\\\\" + resolve( aPath.replace( /^\/([a-z])\//i, '$1:\\' ) )
            aPath        = "file:///" + aPath.replace( /\\/g, "/").replace( /^\/([a-z])\//i, '$1:/' )
            }
    return  aPath            
            }  // eof fixPath
//  ------  -----------  =  ---------------------------------------------------------

  function  findReposDir( aDir)  { // Find "Repos" folder case-insensitively
       var  mDirs        =  readdirSync( aDir, { withFileTypes: true });
    return  mDirs.find(d => d.isDirectory() && d.name.toLowerCase() === 'repos')?.name || 'Repos';
            };  // eof findReposDir 
//  ------  -----------  =  ---------------------------------------------------------

//   Object.entries(pLibs).forEach( mLib => { pLibs[ mLib[0] ] = fixPath( mLib[1] ) } ) //#.(50405.06.5) 

    export  default  pLibs 

//  export  default { 
//            Path1: join(fullPath, 'tools', 'lib1.mjs'),
//            Path2: join(fullPath, 'tools', 'lib2.mjs'),
//            };
