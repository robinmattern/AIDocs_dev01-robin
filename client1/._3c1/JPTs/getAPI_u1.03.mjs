//            import    dotenv     from  'dotenv'; // dotenv.config()
//            import  { inspect }  from  'util'

        var __fullpath  =   import.meta.url.replace( /\/$/, '' );                                   // .(40402.04.1 RAM Refactor dotenv not installed) // console.log( `__fullname: ${__fullname}`)
        var __filename  = __fullpath.replace( /.+\//, "" );                                         //                                                    console.log( `__filename: ${__filename}`)
        var __dirname   = __fullpath.replace( `/${__filename}`  , "").replace( /^file:\/\//, "" );  //                                                    console.log( `__dirname:  ${__dirname}` )
        var __APP_DIR   = __dirname.replace(  /\/[A-Z]:/, '' );                                     //                                                    console.log( `__APP_DIR:  ${__APP_DIR}` )

  try { var { dotenv  } =  await import( 'dotenv' )                                                 // .(40331.02.1 RAM Beg to work in browser)
        var { inspect } =  await import( 'util'   ) }
//    catch( e ) { bInstalled = !e.message.match( /Cannot find package/ );                          //#.(40402.04.2).(40401.04.2 RAM Beg Oops)
      catch( e ) { if (typeof(window) != 'undefined') { window.process = { env: { } }               // .(40331.02.2 RAM Enable process.env in browser).(40401.0x.x)
     } else { console.log( "\n* Module dotenv not installed. Please run npm install in folder.");   // .(40401.0x.1 RAM Catch Module not installed)
              console.log(   `    ${__APP_DIR.replace( /\/._3c.+/, '' )}\n` );  process.exit() }    // .(40401.0x.2)
        var   inspect = function( pObj ) { return JSON.stringify( pObj ) }
        }                                                                                           // .(40331.02.1 RAM End)
// --------------------------------------------------------------

    if (typeof(dotenv) != 'undefined') {                                                            // .(40331.02.3)
        dotenv.config( { path: `${__APP_DIR}/.env` } )
    } else {                                                                                        // .(40331.02.4 RAM Beg)

//      console.log( `\n* Can find .env file: ${__APP_DIR}/.env`); // process.exit()                //#.(40402.04.3 RAM Beg)
//      console.log( `  Using the ANYLLM_API_KEY: FP1VRGD-5R9M00Q-GYETX1F-5HV8S27\n` )
//      console.log( `  Using the ANYLLM_API_KEY: 6Q5P8YR-JXAMFGB-KGGEZ6T-W94PXE3\n` )              // .(40401.04.4 RAM Key in Vultr ??)
//      bInstalled = false
//      }
//  } else {                                                                                        // .(40331.02.4 RAM Beg)
// if (!bInstalled) {                                                                               //#.(40402.04.3 RAM End)
//      process.env[    'ANYLLM_API_KEY'] = "FP1VRGD-5R9M00Q-GYETX1F-5HV8S27"
        process.env[    'ANYLLM_API_KEY'] = "6Q5P8YR-JXAMFGB-KGGEZ6T-W94PXE3"                       // .(40401.04.5 RAM Key in Vultr)
        process.env[    'SERVER_PORT'   ] =  3001
        }                                                                                           // .(40331.02.4 RAM End)
    var bQuiet = false
    var ANYLLM_API_KEY = process.env.ANYLLM_API_KEY
   if (!ANYLLM_API_KEY) {
        console_log(   `* Error:    ANYLLM_API_KEY not set in:    \n         ${__APP_DIR}/.env` );
//      console_log(   `* Error:    ANYLLM_API_KEY not set in:`, `\n         ${__APP_DIR}/.env`, -2 );
        process.exit()
        }
// --------------------------------------------------------------

  async function getAPI( aURL, aMethod, pData, aAPI_KEY ) {
        aMethod   =  aMethod  ? aMethod  : 'GET'
    if (typeof(aMethod) == 'object') {
        aAPI_KEY  =  pData    // shift 3rd arg to 4th arg
        pData     =  aMethod  // shift 2nd arg to 3rd arg
        aMethod   = 'POST'    // insert           2nd arg
        }
//      dotenv.config( { path: `${__APP_DIR}/.env` } )
//      ANYLLM_API_KEY = process.env.ANYLLM_API_KEY
        aAPI_KEY  =  aAPI_KEY ? aAPI_KEY : ANYLLM_API_KEY
//      console.log( `  Using THE ANYLLM_API_KEY: ${aAPI_KEY}` )  // .(40402.0205)
try {
    if (!bQuiet) {
        console.log(   `  Request:  ${aMethod.toUpperCase()} ${aURL}` );
        }
    var pResponse =  await submitAPI( aURL, aMethod, pData, aAPI_KEY );

    var pJSON     =  { }
//  if (pResponse.headers.get('Content-Type').match( /application\/json/ )) {
    if ( (new RegExp( /application\/json/  )).test( pResponse.headers.get( 'Content-Type' ) ) ) {

    var pJSON     =  await pResponse.json() // failing on DELETE: Cannot read properties of null (reading 'match') because 'Content-Type' not in headers
        } else {

    if ( (new RegExp( /text\/event-stream/ )).test( pResponse.headers.get( 'Content-Type' ) ) ) {

    var aJSON     =  await getReadableStream( pResponse )
    var pJSON     =  parseOpenAI_data( aJSON );                                                               // .(40323.03.1 RAM Use function)
        } else {

    var aJSON     =  await pResponse.text( )      // this is where it waits.  line 37 syncronously executes after await on line 34
    var pJSON_    =  parseOpenAI_data( aJSON );                                                             // .(40323.03.1 RAM Use function)
        pJSON = pJSON_                                                                                      // ?? return pJSON = { data: {"id":"7ca4db98-24d4-49c3-9343-b505c5d37b7d","type":"abort","textResponse":null,"sources":[],"close":true,"error":"No OpenAI API key was set."} }
        console.error( `* Error:    ${aMethod} * API request failed with 401: ${ pJSON_.data.error }` );    // ?? return pJSON = { }
//      } } // eif 'Content-Type != 'application/json' and aText matches /^data: /
        } // eif Content-Type != 'text/event-stream'
        } // eif Content-Type != 'application/json'

// if (!bQuiet) {
        console_log( `  Response: Status ${pResponse.status}`, bQuiet );                                    // (40330.01.1 RAM Use console_log)
//      console.log(    aText )
//      console.dir(    pJSON, { depth: 99 } )
//      console.log(    inspect( pJSON, { depth: 99 } ) )
        console_log(    pJSON, bQuiet )                                                                     // (40330.01.2)
//      }
    } catch ( pError ) {

    if ((pResponse ? pResponse.ok : true) == false) {                                                       // .(40320.02.1 RAM Beg ??? if bQuiet ).(40330.01.3)
        console_log( `* Error:    ${aMethod}, * API request failed with ${pResponse.status}: ${pResponse.statusText}`, -2 );
    } else {
        console_log( `* Error:    ${aMethod}, ${pError.message}. Is ${aURL} alive.`, -2 ); }                // .(40320.02.1 RAM End).(40401.0x.x)
        console_log( `  API_KEY:  ${aAPI_KEY}`, -2 )
        console_log( `  Data:     ${ inspect( pData || {} , { depth: 9 } ) }`, -2 )
 return pResponse                                                                                           // .(40320.02.2)
        }
 return pJSON
        }
// --------------------------------------------------------------

async function submitAPI( aURL, aMethod, pData, aAPI_KEY ) {
    	aAPI_KEY  =  aAPI_KEY ? aAPI_KEY : ANYLLM_API_KEY
    	aMethod   =  aMethod  ? aMethod  : 'GET'

	var pOptions  =      // Define request options
	     {  method:  aMethod.toUpperCase()
	     ,  headers:
	         { 'Content-Type':  'application/json'
	         , 'Authorization': `Bearer ${aAPI_KEY}`
	            }
	        };
	if (pData && aMethod.match( /POST|PUT/ )) {
	    pOptions.body =  JSON.stringify( pData )
	    }
	var pResponse     =  await fetch( aURL, pOptions );

	if (!pResponse.ok) {
	    if (bQuiet) { return pResponse }
	    throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
	    }
 return pResponse;
    } // eof submitAPI
// --------------------------------------------------------------

  async function getReadableStream( response ) {    // Handle ReadableStream response
    if (response.body.readable) {
  const reader = response.body.getReader();
    let chunks = [];

 while (true) {                                     // Read data chunks in a loop
const { done, value } = await reader.read( );
    if (done) break;
        chunks.push(value);
        }
  const responseData = new Blob(chunks);            // Combine chunks into a Blob
 return responseData;                               // You can further process responseData based on your data format (e.g., parse JSON)
    } else {                                        // Handle normal response (text/json)
 return await response.text();                      // Or use response.json() for JSON data
        }
    } // eof getReadableStream
// --------------------------------------------------------------

function parseOpenAI_data( aText ) {
    try {
    var mData     =  aText.match( /data:/g )
    if (mData && mData.length == 1) {
    var aJSON     = "{ " + aText.replace( /data:/, '"data":' ) + "}"
    var pJSON     =  JSON.parse( aJSON )

    } else {
    var mJSON     =  aText.replace( /[\n\r]+/g, " ").split( /data:/ )
        mJSON     = (mJSON[0] == "") ? mJSON.slice(1) : mJSON
    if (mJSON.length > 1) {
    var mJSON           =  mJSON.map( aData => JSON.parse( aData ) ), pJSON = { }  // data stream
        pJSON.response  =  mJSON.filter( pData => ( pData.type == "textResponseChunk" ) ).map( pData => pData.textResponse )
        pJSON.finalize  =  mJSON.filter( pData => ( pData.type == "finalizeResponseStream" ) )[0]
//      pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 1 )[0].sources
        pJSON.sources   =  mJSON.filter( pData => ( pData.sources || [] ).length > 0 )[0].sources  // will fail is no sources elements
        console_log(    `  Response: Found ${pJSON.response.length} chunks.`, bQuiet );
        pJSON.response  =  pJSON.response.join( "" )

    } else {
        console.error(  `* Error:    parseOpenAI_data didn't contain data: { } object(s).` )
        console.log(    `  aJSON:    ${ strip( aText, 1000 ) }` )

    var pJSON          = { response: aText }
      } }
    } catch( e ) {
        console.error( `* Error:    parseOpenAI_data failed with invalid JSON.` )
        console.log(   `  aJSON:    ${ strip( aText, 1000 ) }` )

    var pJSON          = { error: "Invalid OpenAI streaming data", textResponse: strip( aText, 250 ) }
         }
 return pJSON

 function strip(a,n) { return (a.substr(0,n) + "\n\n........\n\n" + a.substr( a.length - n, n)).replace( /[\n\r]+/g, "\n            " )}
    }
// --------------------------------------------------------------

function setAPIoptions( pOptions ) {
        bQuiet = pOptions.bQuiet ? pOptions.bQuiet : bQuiet
        }
// --------------------------------------------------------------

function dirName( aPath ) {
        aPath = aPath ? aPath : import.meta.url
 return aPath.replace( aPath.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" )
    }
// --------------------------------------------------------------

function appDir( aApp ) {     var aPath = ""
    if (aApp.match( /^file:/ )) { aPath = aApp; aApp = "" }
    var aAPP_DIR  =  `${ dirName( aPath ).replace( /\/[A-Z]:/, '' )}/${aApp}`
//      dotenv.config( { path: `${aAPP_DIR}/.env` } )                                                       // .(40331.02.4 RAM End)
 return aAPP_DIR
    }
// --------------------------------------------------------------

function isCalled( aCallee, aCaller ) {
    if (aCallee.match( /^http/) ) { return true }     // .(40331/02/1 RAM to work in browser)
        aCaller = aCaller ? aCaller : process.argv[1]
    var aCallee = aCallee.replace( /^.+[\\\/]/, '' ); // console.log( "aCallee: import.meta.url:", aCallee)
    var aCaller = aCaller.replace( /^.+[\\\/]/, '' ); // console.log( "aCaller: process.argv[1]:", aCaller)
//  var bCalled = aCaller != aCallee;                 // console.log( "bCalled:", bCalled)
//      console.log( "aCallee: import.meta.url:", import.meta.url );
//      console.log( "aCaller: process.argv:", inspect( process.argv, { depth:9 } ) );
//      process.exit()
 return aCaller != aCallee
    }
// -------------------------------------------------

//       console_log( "Hello:\n   ","foo", [-2,3], -2)
//       console_log( "sdf",-2 ); console.log("-----")
function console_log( aMsg, nQuiet ) {                                                                      // (40330.01.3 RAM Beg Write console_log)
//  var aMsg = Object.entries(arguments).join( " -- " )
    var nArgs = arguments.length -1, aMsg = "", nQuiet = 0
        Object.entries(arguments).forEach( (a) => {
//        console.log( a[0], "---", a[1] )
          if (String(a[1]).match(/^(-*[0-2]|true|false)$/) && a[0] == nArgs ) { nQuiet = a[1] * 1; return }
          if (typeof(a[1]) == 'object' ) { aMsg += inspect( a[1], { depth: 9 } ); return }
          aMsg += " " + String( a[1] )
          } )
//  var bQuiet = (nQuiet == -2) ? false : (typeof( nQuiet ) == 'boolean' ? nQuiet : false)
    var bQuiet = (nQuiet == -2) ? false : (nQuiet == 1); aMsg = aMsg.substr(1)   // .(40402.                           // .(40401.0x.1 RAM Remove leading space)
    if (bQuiet) { return }
//  if (typeof(aMsg) == 'object' ) { aMsg = "  " + inspect( aMsg, { depth: 9 } ) }
    if (nQuiet == -1) { aMsg  = "\n" + aMsg   }
    if (nQuiet == -2) { console.error( aMsg ) }
      else {            console.log(   aMsg ) }
        return
        }                                                                                                   // (40330.01.3 RAM End)
// --------------------------------------------------------------

    var JPTfns = { getAPI, dirName, appDir, isCalled, setAPIoptions, console_log }                          // (40330.01.5 RAM Add console_log)
        export default JPTfns;
