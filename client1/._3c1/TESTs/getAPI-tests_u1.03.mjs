    import { inspect } from 'util'
    import   fs        from 'fs'

//  import { getAPI, setAPIoptions  } from          './getAPI.mjs';
//  import   APIfns    from                         './getAPI.mjs';        var getAPI = APIfns.getAPI
//  import   APIfns    from                        '../getAPI.mjs';        var getAPI = APIfns.getAPI
//  import   APIfns    from           '../../._2/TESTs/getAPI.mjs';        var getAPI = APIfns.getAPI
//  import   APIfns    from               '../../TESTs/getAPI.mjs';        var getAPI = APIfns.getAPI
//  import   APIfns    from  '../../client1/._3c1/JPTs/getAPI.mjs';        var getAPI = APIfns.getAPI
//  import   APIfns    from          '../../._3c1/JPTs/getAPI_u1.01.mjs/'; var getAPI = APIfns.getAPI
//  import   APIfns    from          '../../._3c1/JPTs/getAPI_u1.01.mjs';  var getAPI = APIfns.getAPI
//  import   APIfns    from          '../../._3c1/JPTs/getAPI_u1.02.mjs';  var getAPI = APIfns.getAPI                  //#.(40402.03.1)
//  import   APIfns    from          '../../c16_aidocs-review-app/utils/getAPI_u1.02.mjs'; var getAPI = APIfns.getAPI  //#.(40402.03.1 RAM Move getAPI_u1.02.mjs to c16/utils).(40402.06.1)
    import   APIfns    from          '../../._3c1/JPTs/getAPI_u1.03.mjs';  var getAPI = APIfns.getAPI                  // .(40402.06.1 RAM Move getAPI_u1.03 back to ._3/JPTs) 

    var __APP_DIR      =  APIfns.appDir( import.meta.url ) // 's31_text-to-sql-apis' or 's31-openai-sql-generator-apis'
    var SERVER_PORT    =  process.env.SERVER_PORT          // .(40320.01.1 RAM ENV vars set in getAPI.mjs with dotenv )
    var ANYLLM_API_KEY =  process.env.ANYLLM_API_KEY
    var OPENAI_API_KEY =  process.env.OPENAI_API_KEY
    var openaiApiKey   =  process.env.OPENAI_API_KEY; console.log( `Using OPENAI_API_KEY: ${OPENAI_API_KEY}`) // .(40402.03.2)

    var aTests         =  "15" // "18,1"
    var bCalled        =  APIfns.isCalled( import.meta.url )       // aCallee
    var aTests         = (process.argv[2] > "") ? process.argv[2] : (bCalled ? "" : aTests)
//  --------------------------------------------------------------

    var aHost          = `http://localhost:${SERVER_PORT}`
    var aWrksp         = 'workspace2'

    var TheTests =
         {  '1':  { Func: doTest01,  Method: 'GET',    URL: `/api/workspaces`         }
         ,  '2':  { Func: doTest02,  Method: 'GET',    URL: `/api/v1/workspaces`      }
         ,  '3':  { Func: doTest03,  Method: 'GET',    URL: `/api/v1/workspace/:slug` }
         ,  '4':  { Func: doTest04,  Method: 'GET',    URL: `/api/v1/upload`          }
         ,  '5':  { Func: doTest05,  Method: 'POST',   URL: `/api/v1/document/upload-link`,            Data: { "link": "https://www.amazon.com/s?k=projector+4k&i=instant-video ~~ AmazonListParser" } }
         ,  '6':  { Func: doTest06,  Method: 'GET',    URL: `/api/v1/documents/`      }
         ,  '7':  { Func: doTest07,  Method: 'GET',    URL: `/api/v1/document/`       }
         ,  '8':  { Func: doTest08,  Method: 'POST',   URL: `/api/workspace/:slug/update-embeddings/`, Data: { "adds": [ `custom-documents/url-www_amazon.com-s-4fb63e73-5355-4cc3-8dff-ba96c80c95db.json` ], deletes: [ ] } }
         ,  '9':  { Func: doTest09,  Method: 'POST',   URL: `/api/system/update-env/`,                 Data: { "EmbeddingEngine": "openai", "OpenAiKey": OPENAI_API_KEY, "EmbeddingModelPref": "text-embedding-3-small" } }
         , '10':  { Func: doTest10,  Method: 'POST',   URL: `/api/system/update-env/`,                 Data: { "LLMProvider"    : "openai", "OpenAiKey": OPENAI_API_KEY, "EmbeddingModelPref": "gpt-3.5-turbo" } }

         , '12':  { Func: doTest12,  Method: 'POST',   URL: `/api/system/generate-api-key`        }
         , '13':  { Func: doTest13,  Method: 'GET',    URL: `/api/system/api-keys/`   }
         , '14':  { Func: doTest14,  Method: 'DELETE', URL: `/api/system/api-key/:id` }
         , '15':  { Func: doTest15,  Method: 'POST',   URL: `/api/v1/workspace/:slug/stream-chat`,     Data: { "message": "List the state and signers of the Constitution.", "mode": "query" } }
//       , '16':  { Func: doTest16a, Method: 'GET',    URL: `/api/workspace/:slug/stream-chat/`   }
         , '16':  { Func: doTest16b, Method: 'POST',   URL: `/api/workspace/:slug/stream-chat/`   }

         , '17':  { Func: doTest17,  Method: 'GET',    URL: `/api/v1/admin/preferences/`      }
         , '18':  { Func: doTest18,  Method: 'GET',    URL: `/api/admin/system-preferences/`  }  // Unauthorized
         , '28':  { Func: doTest28,  Method: 'GET',    URL: `/api/system/preferences/`        }  // ??
         , '29':  { Func: doTest29,  Method: 'GET',    URL: `/settings/system-preferences/`   }  // client URL

         , '99':  { Func: doTest99,  Method: 'GET',    URL: `/api.example.com/submit`     }
            }

        if (!bCalled) { doTests( aTests ) }

// -----------------------------------------------------------------------------

//  Test No. 1: Get Workspaces without API_KEY
//  --------------------------------------------------------------
  async function doTest01( aURL ) {

    var aURL      = `${aHost}/api/workspaces`;
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof doTest01
//  --- ------------------------------------------------

//  Test No. 2: Get Workspaces with API_KEY
//  --------------------------------------------------------------
  async function doTest02( aURL ) {
    APIfns.setAPIoptions( { bQuiet: true } )

        aURL      =  aURL ? aURL : '/api/v1/workspaces'
    var aURL      = `${aHost}/${ aURL.replace( /^\//, '' ) }`;  // or `${aHost}/api/v1/workspaces`
        console.log( `  Request:  GET ${aURL}` )

    var pResponse =  await getAPI( aURL ) || {}
//      console.log( pResponse || {} )

    if (pResponse.workspaces) {
    var mRecs =  pResponse.workspaces
//      console.log( mAPIkeys )
        console.log( "" )
//      console.log( "  Id          Workspace                       ':slug'             Hst     CreatedAt          UpdatedAt     " )  //#.(40402.09.1)
//      console.log( " ----  ------------------------------  -------------------------  ---  -----------------  -----------------" )  //#.(40402.09.2)
        console.log( "  Id          Workspace                       ':slug'             Hst     UpdatedAt     " )                     // .(40402.09.1 RAM Modify Test02 Heading) 
        console.log( " ----  ------------------------------  -------------------------  ---  -----------------" )                     // .(40402.09.2)
        console.log( mRecs.map( fmtWorkspace ).join( "\n" ) )
    } else {
//      throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
        process.exit()
        }

function fmtWorkspace(  pRec, i ) {
    var aWID       = `${pRec.id}`.padStart(3)
    var aWorkspace =  pRec.name.padEnd( 30 )
    var aSlug      =  pRec.slug.padEnd( 25 )
    var aAIPrompt  =  pRec.openAiPrompt
    var aAITemp    =  pRec.openAiTemp
    var aAILikness =  pRec.similarityThreshold
    var aAITopN    =  pRec.topN
    var aChatModel =  pRec.chatModel
    var aChatMode  =  pRec.chatMode
    var aHistory   = `${pRec.openAiHistory}`.padStart(3)
    var aCreatedAt =  pRec.createdAt.substr(2, 17).replace( /T/, " " )
    var aUpdatedAt =  pRec.lastUpdatedAt.substr(2, 17).replace( /T/, " " )

//      return ` ${aWID}.  ${aWorkspace}  ${aHistory}  ${aCreatedAt}  ${aUpdatedAt}`
        return ` ${aWID}.  ${aWorkspace}  ${aSlug}  ${aHistory}  ${aUpdatedAt}`
        }
        } // eof doTest02
//  --- ------------------------------------------------

//  Test No. 3: Get Workspace {slug}
//  --------------------------------------------------------------
  async function doTest03( aURL ) {

    var aURL      = `${aHost}/api/v1/workspace/:slug`.replace( /:slug/, aWrksp );
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof doTest03
//  --- ------------------------------------------------

//  Test No. 4: Upload File
//  --------------------------------------------------------------
  async function doTest04( aURL ) {

    var aURL      = `${aHost}/api/v1/upload`;
    var pData     = { }
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof doTest04
//  --- ------------------------------------------------

//  Test No. 5: Get Web Upload Link
//  --------------------------------------------------------------
  async function doTest05( aURL, aMethod, pData_ ) {

    var aURL      = `${aHost}/api/v1/document/upload-link`;
//  var pData     =  { link: "https://www.amazon.com/s?k=projector+4k&i=instant-video&crid=2VOPM9RTZWLEE&sprefix=projector+4k%2Cinstant-video%2C74&ref=nb_sb_noss_2" }
    var pData     =  { link: "https://www.amazon.com/s?k=projector+4k&i=instant-video ~~ AmazonListParser" }

    var pResponse =  await getAPI( aURL, pData )  // '( aURL, 'POST', pData )  is assumed
//      console.log( pResponse || {} )
    var aCreated  =  pResponse.documents[0].published
    var aLocation =  pResponse.documents[0].location.replace( /[\\\/]/g, '/' )
    var aFileName =  aLocation.split( '/' ).slice(-1)[0]
        console.log( `  Created: ${aCreated}, FileName: ${aFileName}` )
        } // eof doTest05
//  --- ------------------------------------------------

//  Test No. 6: Get Documents
//  --------------------------------------------------------------
  async function doTest06( aURL ) {
        APIfns.setAPIoptions( { bQuiet: true } )

    var aURL      = `${aHost}/api/v1/documents`;
    var pResponse =  await getAPI( aURL )
        console.log( inspect( pResponse || {}, { depth: 99 } ) )
        } // eof doTest06
//  --- ------------------------------------------------

//  Test No. 7: Get Document
//  --------------------------------------------------------------
  async function doTest07( aURL ) {

//  var aDocName  = `url-www_amazon.com-s-f49b5be1-b23d-410d-964a-0b3de47772d6.json`
    var aDocName  = `url-www_amazon.com-s-9860d2dc-a78a-4921-b886-dea3c4e91aa4.json`  // '3/11/2024, 3:18:00 AM',
    var aURL      = `${aHost}/api/v1/document/{docname}`.replace( /{docname}/, aDocName );
    var pResponse =  await getAPI( aURL )

    var aPath     = `./server/storage/documents/custom-documents/${aDocName}`
    var aPath     = `./storage/documents/custom-documents/${aDocName}`

    var aContents =  fs.readFileSync( aPath, 'ASCII' )
    try {
    var pJSON     =  JSON.parse( aContents )
    var mProducts =  JSON.parse( pJSON.pageContent )
        mProducts.forEach( pProduct => { delete pProduct.productURLs; delete pProduct.imageURLs } )
        console.log( inspect( mProducts, { depth: 99 } ) )
    } catch ( pErr ) {
        console.log( "* ERROR:", pErr )
        }
//      console.log( pResponse || {} )
        } // eof doTest07
//  --- ------------------------------------------------

//  Test No. 8: Change Embeddings
//  --------------------------------------------------------------
  async function doTest08( aURL ) {

    var aDocName1 = `url-www_amazon.com-s-f49b5be1-b23d-410d-964a-0b3de47772d6.json`
    var aDocName2 = `ai210412_RAG-for-NLP-Tasks-(2005.11401).pdf-20f2fbf4-f012-4874-b305-5e3e9a81373e.json`
    var aDocName3 = `ai240105_RAG-for-LLMs-(2312.10997).pdf-2e08b9c0-db76-4e12-a09a-b97790d3551f.json`
    var aDocName4 = `url-www_amazon.com-s-4fb63e73-5355-4cc3-8dff-ba96c80c95db.json`

    var aURL      = `${aHost}/api/workspace/:slug/update-embeddings`.replace( /:slug/, aWrksp );
//                   http://localhost:3001/api/workspace/workspace2/update-embeddings
    var pChanges  ={ adds: [
//                     `custom-documents/${aDocName1}`,
//                     `custom-documents/${aDocName2}`,
//                     `custom-documents/${aDocName3}`,
                       `custom-documents/${aDocName4}`,
                        ],
                     deletes: [
//                     `custom-documents/${aDocName1}`,
                        ],
                     }
//  var pHeaders  = { }

    var pResponse =  await getAPI( aURL, pChanges )
//      console.log( pResponse || {} )

// library.js[26]    prisma:info Starting a sqlite pool with 33 connections.
// index.js[157]     Adding new vectorized document into namespace workspace2
// index.js[190]     Chunks created from document: 139
// index.js[235]     addDocumentToNamespace No OpenAI API key was set.
// documents.js[ 97] Failed to vectorize ai240105_RAG for LLMs (2312.10997).pdf
//                   [Event Logged] - workspace_documents_added

// index.js[226]     Inserting vectorized chunks into LanceDB collection.
// index.js[106]     Caching vectorized results of custom-documents/ai240105_RAG-for-LLMs-(2312.10997).pdf-2e08b9c0-db76-4e12-a09a-b97790d3551f.json to prevent duplicated embedding.
//                   [Event Logged] - workspace_documents_added
        } // eof doTest08
//  --- ------------------------------------------------

//  Test No. 9: Set AI Platform Key
//  --------------------------------------------------------------
  async function doTest09( aURL ) {

    var aURL      = `${aHost}/api/system/update-env`;
    var pData     =
//       { "EmbeddingEngine"   : "openai_"                      // error: 'Invalid Embedding model type. Must be one of openai, azure, localai, native.' // .... }
         { "EmbeddingEngine"   : "openai"                       // ok
//       , "OpenAiKey"         :  OPENAI_API_KEY.substr(3)      // error: 'OpenAI Key must start with sk-'
         , "OpenAiKey"         :  OPENAI_API_KEY.substr(0,20)   // ok, but invalid
//       , "EmbeddingModelPref": "test-embed"                   // ok, butinvalid
         , "EmbeddingModelPref": "text-embedding-3-small"       // pk
            }
    var pResponse =  await getAPI( aURL, pData )
//      console.log( pResponse || {} )
        } // eof doTest09
//  --- ------------------------------------------------
 
//  Test No. 10: Check Model Keys, then Update System ENV Keys
//  --------------------------------------------------------------
  async function doTest10( aURL, aMethod, pData ) {

//  var aURL      = `${aHost}/api/system/update-env`;
    var pData1 =
         { "EmbeddingEngine"   : "openai"
         , "OpenAiKey"         : "sk" + "-7c3IzbQwUEVViVWRe"+"iJTT3BlbkFJOl6lyyl4HIHcpBpc4AFN"
    //   , "EmbeddingModelPref": "text-embedding-3-small"
         , "EmbeddingModelPref": "text-embedding-ada-002"
            }
    var pData2 =
         { "LLMProvider"       : "openai"
//       , "OpenAiKey"         : "sk" + "-7c3IzbQwUEVViVWRe"+"iJTT3BlbkFJOl6lyyl4HIHcpBpc4AFN"
         , "OpenAiKey"         : "sk" + "-tN39187xh3m2foUmr"+"QyRT3BlbkFJ1IrW3MUwa48mkYFPqEr5"
         , "EmbeddingModelPref": "gpt-3.5-turbo"
            }
    var pData3 =
            { "LLMProvider"       : "openai"
            , "OpenAiKey"         : "sk" + "-7c3IzbQwUEVVi"
            , "EmbeddingModelPref": "gpt-3.5-turbo"
               }
    var pData4 =
            { "LLMProvider"       : "openai"
            , "OpenAiKey"         : "7c3IzbQwUEVVi"
            , "EmbeddingModelPref": "gpt-3.5-turbo"
               }

    var pEnvData = pData2
    var pChkData =
            { "apikey"            : pEnvData.OpenAiKey
            , "provider"          : pEnvData.LLMProvider
               }
    var aURL1  = `${aHost}/api/system/custom-models`
    var aURL2  = `${aHost}/api/system/update-env`;

//  var pResponse1  =  await getAPI( aURL1, pChkData ); help_msg( "" )  // { models: [], error: "Invalid provider for custom models" }
//  var pResponse2  =  await getAPI( aURL2, pEnvData )                  // { newValues: {}, error: false }

//  var pResponse1  =  await getAPI( aURL1, pData4 )   // { models: [], error: "Invalid provider for custom models" }
//  var pResponse2  =  await getAPI( aURL2, pData4 )   // { newValues: { LLMProvider: "openai"}, error: "OpenAI Key must start with sk-" }

    var aURL        = `${aHost}/${aURL}`;
    var pData       =  pData ? pData : pData2

    var pResponse   =  await getAPI( aURL, pData )

//      console.log( pResponse1 || {} )
        } // eof doTest10
//  --- ------------------------------------------------

//  Test No. 11: List AI Platform Preferences
//  --------------------------------------------------------------
  async function doTest11( aURL ) {

    var aURL      = `${aHost}/api/???`;
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof doTest11
//  --- ------------------------------------------------

//  Test No. 12: Generate ANYLM_API_KEY
//  --------------------------------------------------------------
  async function doTest12( aURL, aMethod ) {

//  var aURL      = `${aHost}/api/admin/generate-api-key`;   // unauthorized
    var aURL      = `${aHost}/api/system/generate-api-key`;

    var pResponse =  await getAPI( aURL, 'POST' ) || {}
        } // eof doTest12
//  --- ------------------------------------------------

//  Test No. 13: AnythingLLM API_KEYS
//  --------------------------------------------------------------
  async function doTest13( aURL ) {
        APIfns.setAPIoptions( { bQuiet: true } )

//  var aURL      = `${aHost}/api/admin/api-keys`;          // unauthorized
    var aURL      = `${aHost}/api/system/api-keys`;
        console.log( `  Request:  GET ${aURL}` )

    var pResponse =  await getAPI( aURL ) || {}

    if (pResponse.apiKeys) {
        var mAPIkeys  =  pResponse.apiKeys
//      console.log( mAPIkeys )
        console.log( "" )
        console.log( "  Id         ANYLM_API_KEY                 CreatedAt          UpdatedAt    ")
        console.log( " ---- -------------------------------  -----------------  -----------------")
        console.log( mAPIkeys.map( fmtAPI_Key ).join( "\n" ) )
    } else {
//     throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
        process.exit()
        }

function fmtAPI_Key( pRec, i ) {
      var aCreatedAt = pRec.createdAt .substr(2, 17).replace( /T/, " " )
      var aUpdatedAt = pRec.lastUpdatedAt.substr(2, 17).replace( /T/, " " )
//        return `${i+1} ${pRec.id}). ${pRec.secret} ${aCreatedAt} ${aUpdatedAt}`
          return ` ${ `${pRec.id}`.padStart(3) }. ${pRec.secret}  ${aCreatedAt}  ${aUpdatedAt}`
          }
        } // eof doTest13
//  --- ------------------------------------------------

//  Test No. 14: Delete System ANYLM_API_KEY (Not Admin Key)
//  --------------------------------------------------------------
  async function doTest14( aURL, aMethod, iKeyId ) {

    var iKeyId    =  process.argv[3] ? process.argv[3] : ( bCalled ? iKeyId : 0 )
   if (!iKeyId) {
        console.log( `* Enter a KeyId for Delete ANYLM_API_KEY: getAPI_tests 14 {KeyId}` )
        process.exit()
        }
//  var aURL      = `${aHost}/api/admin/delete-api-key/${nKeyId}`;  // unauthorized
//  var aURL      = `${aHost}/api/system/api-keys/`;                // .(40320.03.1 RAM Added)
    var aURL      = `${aHost}/api/system/api-key/${iKeyId}`;

    var pResponse =  await getAPI( aURL, 'DELETE' ) || {}
        } // eof doTest14
//  --- ------------------------------------------------

//  Test No. 15: AnythingLLM API_KEYSworkspace
//  --------------------------------------------------------------
  async function doTest15( aURL, aMethod, pData ) { // this one formats the answer
        APIfns.setAPIoptions( { bQuiet: true } )

//  var aURL      = `${aHost}/api/api/workspace/:slug/stream-chat`;          // unauthorized
    var aURL      = `${aHost}/api/v1/workspace/constitution/stream-chat`;

    var pData     =  pData ? pData :
         { "message": "List the state and signers of the Constitution."
         , "mode"   : "chat"
            }
        console.log( `Server API: ${aURL}`)
        console.log( `  Question: ${pData.message}`)
    var pResponse =  await getAPI( aURL, pData ) || { }

    if (pResponse.response) {
        console.log( `  Sources:  ${ pResponse.sources.length }, Mode: ${ pData.mode }` )
        console.log( `  Answer:   ${ pResponse.response.replace( /\n/g, "\n            ") }` )
    } else {
//     throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
        console.log( `\n* API request failed to return a response. Is .env present.` )           // .(40402.08.1 RAM Add .Env error msg)
        process.exit( )
        }
        } // eof doTest15
//  --- ------------------------------------------------

//  Test No. 16a: /api/workspace/:slug/stream-chat
//  --------------------------------------------------------------
  async function doTest16a( aURL ) {  // this one doesn't work

    const baseHeaders = function( aToken ) { return { Authorization: aToken ? `Bearer ${ aToken }` : ANYLLM_API_KEY }; }
    const v4          = function( ) { return '985cfdcd-496d-4c6a-82b4-6a6dee09f36d' }

// ( chatResult ) => handleChat( chatResult, setLoadingResponse, setChatHistory, remHistory, _chatHistory )
               streamChat( aWrksp, "please summarize", )
async function streamChat( { slug }, message, handleChat ) {
        const ctrl = new AbortController();
        await fetchEventSource( `${API_BASE}/workspace/${slug}/stream-chat`

       , { method: "GET", body: JSON.stringify( { message } ), headers: baseHeaders()
          , signal: ctrl.signal, openWhenHidden: true

          , async onopen( response ) { if (response.ok) { return; // everything's good

                                      } else if ( response.status >= 400 && response.status < 500 && response.status !== 429 ) {
                             handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
                                         , error: `An error occurred while streaming response. Code ${ response.status }` } );
                             ctrl.abort();
                             throw new Error( "Invalid Status code response." );

                                      } else {
                             handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
                                         , error: `An error occurred while streaming response. Unknown Error.`            } );
                             ctrl.abort();
                             throw new Error( "Unknown error" );
                                         } // else
                                       } // eof onopen

          , async onmessage( msg ) { try { const chatResult = JSON.parse( msg.data ); handleChat( chatResult ) } catch {} }
          , onerror( err ) { handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
                                         , error: `An error occurred while streaming response. ${err.message}` } );
                             ctrl.abort();
                             throw new Error(); }
            } ); // eoh fetchEventSource
        } // eof streamChat
        } // eof doTest16a
//  --- ------------------------------------------------

//  Test No. 16b: /api/workspace/:slug/stream-chat
//  --------------------------------------------------------------
  async function doTest16b( aURL ) {  // this one returns data: streams

    var aMessage  =  "List the state and signers of the Constitution"
        console.log( `Server API: ${aURL}`)
        console.log( `  Question: ${aMessage}`)

    var aResponse = await submitMessage( aWrksp, aMessage )
        console.log( `  Response:\n ${aResponse}` )

async function submitMessage( aWrksp, message ) {
    const response = await fetch(`${aHost}/api/workspace/:slug/stream-chat`.replace( /:slug/, aWrksp ), {
      method: "POST",
      body: JSON.stringify( { message } ),
      headers: { Authorization: `Bearer ${ANYLLM_API_KEY}` }
    });

    if (!response.ok) {
      throw new Error(`Error submitting message: ${response.status}`);
    }
    const responseStream = await response.text(); // Read the entire response as text

    // Convert the response stream to a text response (implementation depends on your needs)
    const textResponse = parseResponseStream( responseStream );

    return textResponse;

  // This function (parseResponseStream) needs to be implemented based on your specific response format
  function parseResponseStream( stream ) {
    // Implement logic to parse the received stream data (JSON, plain text, etc.)
    // This might involve splitting on delimiters, JSON parsing, or other processing
    // based on the expected response format from the LLM processor.
    // ...
       var processedTextResponse = stream
    return processedTextResponse;
  } // eof parseResponseStream
} // submitMessage

    	} // eof doTest16b
//  --- ------------------------------------------------

//  Test No. 17: Get Admin Preferences
//  --------------------------------------------------------------
  async function doTest17( aURL ) {
//  APIfns.setAPIoptions( { bQuiet: true } )

    var aURL      = `${aHost}/api/v1/admin/preferences`;
    var pResponse =  await getAPI( aURL ) || {}

    	} // eof doTest17
//  --- ------------------------------------------------

//  Test No. 18: List AI Platform Preferences
//  --------------------------------------------------------------
  async function doTest18( aURL ) {

    var aURL      = `${aHost}/api/admin/system-preferences`;
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof doTest18
//  --- ------------------------------------------------

//  Test No. 28: Get System Preferences
//  --------------------------------------------------------------
  async function doTest28( aURL ) {

        var aURL      = `${aHost}/api/system/preferences`;
        var pResponse =  await getAPI( aURL ) || {}
        } // eof doTest29
//  --- ------------------------------------------------

//  Test No. 29: Get System Preferences
//  --------------------------------------------------------------
  async function doTest29( aURL ) {

    var aURL      = `${aClient}/settings/system-preferences`;
    var pResponse =  await getAPI( aURL ) || {}
    	} // eof doTest29
//  --- ------------------------------------------------

// http://localhost:3001/api/system/document-processing-status

//  Test No. 99: Get Example
//  --------------------------------------------------------------
async function doTest99( aURL ) {

    var aURL     = 'https://api.example.com/submit';
    var aMethod  = 'GET'
    var aAPI_KEY = 'YOUR_ACTUAL_API_KEY';

    var pData    =
         {  name: 'John Doe'
         ,  age:   30
         ,  details:
             {  city: 'New York'
             ,  occupation: 'Software Engineer'
                },
            };

    var pResponse =  await getAPI( aURL, aMethod, pData, aAPI_KEY ) || {}
//      console.log( pResponse )
    	} // eof Test 99
//  --- ------------------------------------------------
//  --------------------------------------------------------------

function help_msg(aMsg) {
         console.log( aMsg )
         }
//  --- ------------------------------------------------

function help( aMsg ) {
         help_msg( `` )
     if (aMsg) { help_msg( `${aMsg}` ) }
         help_msg( `  Run one or more of the following tests, e.g.: node getAPI_test.mjs 3,2, 8` )
         Object.entries(TheTests).map( mTest => {
           help_msg( `  Test ${ `${ mTest[0] }`.padStart(2) }: ${ mTest[1].URL }` ) } )
         }
//  --- ------------------------------------------------

export async function doTests( aTests, pValues ) {
    var mTests         =  `${ aTests || '' }`.split( /[ ,]+/ ), bRam = 0
    var aTests         = `,${ mTests.join() },`, bRam = 0
    if (aTests == ",," || aTests.match(/,(help|--?h|--?help),/i) ) { help( ); return } // process.exit()
//      console.log(   `  aTests: '${aTests}';  bCalled: ${bCalled}` ); process.exit()

        console.log( "-------------------------------------------------------------------------------")
        console.log( `Doing Test${ mTests.length != 1 ? "s" : "" }: ${ mTests.join() }` )
        console.log( "-------------------------------------------------------------------")
//      mTests.map( async aTest => await doTest( aTest, TheTests[ aTest ] ) )
//      mTests.map( aTest => doTest( aTest, TheTests[ aTest ] ) )
   for (const aTest of mTests) {                       // Use a regular for loop for sequential execution
        if (pValues && pValues[ `Test${aTest}` ]) { TheTests[ aTest ].Data = pValues[ `Test${aTest}` ] }
        if (pValues && pValues[ `Workspace`    ]) { aWrksp = pValues[ `Workspace` ] }

        await doTest( aTest, TheTests[ aTest ] );    // Await each test execution
        }

  async function doTest( aTest, pTest ) {
      const aURL = pTest.URL.replace(/^\//, "");
            console.log(`Test ${aTest}: ${pTest.Func.name} is executing`);
            console.log( "-------------------------------------------------------------------")
      await pTest.Func( aURL, pTest.Method, pTest.Data );
            console.log( "" )
            bRam = 1; // Assign bRam after successful execution
//          }
          } // eof doTest
//  ----- ----------------------------------------------

    if (bRam == 0) {
//        help( `* Invalid help number(s): ${ aTests.substr(1).replace( /,$/, '' ) }` )
          help( `* Invalid help number${ mTests.length != 1 ? "s" : "" }: ${ mTests.join() }` )
          }
        } // eof doTests
//  --- ------------------------------------------------
//  --------------------------------------------------------------


