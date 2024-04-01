//import  JPTfns          from   '../../._2/JPTs/getAPI.mjs';        var getAPI = JPTfns.getAPI
//import  JPTfns          from    '../._3c1/JPTs/getAPI_u1.02.mjs';  var getAPI = JPTfns.getAPI
  import  JPTfns          from '../../._3c1/JPTs/getAPI_u1.02.mjs';  var getAPI = JPTfns.getAPI
  import  setWorkspaces   from '../models/WorkspacesData_u1.03.mjs' 
  
    var   console_log  =  JPTfns.console_log 

    var __APP_DIR      =  JPTfns.appDir( import.meta.url ) // 's31_text-to-sql-apis' or 's31-openai-sql-generator-apis'
    var SERVER_PORT    =  process.env.SERVER_PORT          // .(40320.01.1 RAM ENV vars set in getAPI.mjs with dotenv )
//  var ANYLLM_API_KEY =  process.env.ANYLLM_API_KEY
//  var OPENAI_API_KEY =  process.env.OPENAI_API_KEY
//  var openaiApiKey   =  process.env.OPENAI_API_KEY

//      --------------------------------------------------------

    var aHost          = `http://localhost:${SERVER_PORT}`
    var bQuiet         =  false 

    var bCalled        =  JPTfns.isCalled( import.meta.url )   
   if (!bCalled) {
    var bQuiet         =  true 

//      --------------------------------------------------------

//      setWorkspaces() 

//      --------------------------------------------------------
 
//  var aPrompt        = "What's it all about"
//  var pResponse      =  await getChatResponse( { message: aPrompt, workspace: 'workspace2', quiet: true } ); 
//  var pResponse      =  await getChatResponse( { message: aPrompt, workspace: 'workspace2' } ); 
//  var pResponse      =  await getChatResponse( { message: aPrompt, quiet: true } ); 
//      console_log(   `  Answer:   ${ pResponse.response}`, 0 )   

//      --------------------------------------------------------

//  var aPrompt        = "What's it all about"
    var aPrompt        = "Can you list the signers and their states"
    var mMessages      =  await getChatMessages( aPrompt, [ ] ) 
//  var mMessages      =  await getChatMessages( aPrompt, [ ], 'workspace2' ) 
//      console_log(   "  Messages:", 0); console_log( mMessages.slice(-2), false )  // get last two items. .splice( -2 ) removes last two items, in place
        console_log(   "  Messages:", mMessages, 0 )  

        } // eof bDoit if bCalled 
// ---------------------------------------------------------------------------------

//  getChatMessages(): Submit a prompt to an LLM and append it to previous messages  
//  --------------------------------------------------------------
  async function getChatMessages( aPrompt, mMessages, aWorkspace ) { 
        aWorkspace =  aWorkspace ? aWorkspace : 'constitution'
/*
    var mMessages   = [ ...mMessages, ...
        [ { role: 'user',      message: "What's up" }
        , { role: 'assistant', message: "Not much" }
        , { role: 'user',      message: "What's really up" }
        , { role: 'assistant', message: "Really not much" }
          ] ];
*/            
    var pData       =  
        {  workspace:  aWorkspace
        ,  message  :  aPrompt 
        ,  mode     : 'chat'
        ,  quiet    :  bQuiet 
           } 
    var pResponse   =  await getChatResponse( pData )   // also contains pResponse.sources   

        mMessages.push( { role: 'user',      message: aPrompt   }
                      , { role: 'assistant', message: pResponse[ pResponse.error ? 'message' : 'response' ] }
                          )       
 return mMessages         
        } // eof getChatMessages
//  --- ------------------------------------------------
    
//  getChatResponse(): Submit a prompt to an LLM established for a Workspace  
//  --------------------------------------------------------------
  async function getChatResponse( aURL, pData ) {  
        JPTfns.setAPIoptions( { bQuiet: true } )

    var bURL         =  typeof( aURL ) == 'string'; pData = bURL ? pData : aURL
        aURL         =  bURL  ? aURL : '/api/v1/workspace/:slug/stream-chat'
        aURL         = `${aHost}/${ aURL.replace( /^\//, '' ) }`;  // or `${aHost}/api/v1/workspaces`
        
    var pDefaults =  
         {  workspace: 'constitution'
         ,  message  : "List the state and signers of the Constitution."
         ,  mode     : 'chat'
         ,  quiet    :  false 
            } 
  
        pData        =  { ...pDefaults, ...pData }
    var aWorkspace   =  pData.workspace;                    delete pData.workspace
    var bQuiet       =  pData.quiet ? pData.quiet : false;  delete pData.quiet
//               var {  workspace, quiet, ...pData2  } = pData
         
        aURL         =  aURL.replace( /:slug/, aWorkspace )
        console_log( `Server API: ${aURL}`, bQuiet )      
        console_log( `  Question: ${pData.message}`, bQuiet )  

    var pResponse    =  await getAPI( aURL, pData ) || { }

    if (pResponse.sources) {
        console_log( `  Sources:  ${ pResponse.sources.length }, Mode: ${ pData.mode }`, bQuiet )
        console_log( `  Answer:   ${ pResponse.response.replace( /\n/g, "\n            ") }`, bQuiet )
    var pResponse = 
         {  error    :  false 
         ,  sources  :  pResponse.sources
         ,  response :  pResponse.response
            } 
    } else {
//      throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
//  var aMsg         = `* API request failed with ${pResponse.status}: ${pResponse.statusText}` 
    var aMsg         = `* API request failed with AnyLLM ${pResponse.type || ''} error: ${pResponse.error}`.replace( /  /, ' ') 
        console_log( aMsg, -2 )
        pResponse = 
         {  error    :  true
         ,  sources  :  [ ] 
         ,  message  :  aMsg 
            } 
//      process.exit( )
        }
 return pResponse 
        } // eof getChatResponse
//  --- ------------------------------------------------



//  --- ------------------------------------------------

export default { getChatResponse, getChatMessages }
