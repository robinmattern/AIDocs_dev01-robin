    import  JPTfns    from '../../._3c1/JPTs/getAPI_u1.02.mjs';  var getAPI = JPTfns.getAPI
  
   var  console_log    =  JPTfns.console_log 

  var __APP_DIR        =  JPTfns.appDir( import.meta.url ) // 's31_text-to-sql-apis' or 's31-openai-sql-generator-apis'
  var   SERVER_PORT    =  process.env.SERVER_PORT          // .(40320.01.1 RAM ENV vars set in getAPI.mjs with dotenv )

//      --------------------------------------------------------

    var aHost          = `http://localhost:${SERVER_PORT}`
    var bQuiet         =  false 

    var bCalled        =  JPTfns.isCalled( import.meta.url )   
   if (!bCalled) {
    var bQuiet         =  false 

        setWorkspaces() 
        }
//      --------------------------------------------------------

  async function setWorkspaces( ) {
//      bQuiet =  false 
//      bQuiet =  0;  getWorkspaces( ) 
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader ] ) 
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader,    fmtWorkspaceRow ] ); console_log( aHTML, 0 )
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader,    fmtWorkspaceRow,    fmtWorkspacesFooter ] ); 
    var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader_v2, fmtWorkspaceRow_v2, fmtWorkspacesFooter_v2 ] ); 
//  var aHTML  =  await getWorkspaces( [ fmtWorkspacesHeader_v1, fmtWorkspaceRow_v1, fmtWorkspacesFooter ] ); 

        console_log( "- getWorkspaces:", aHTML, bQuiet )
//      putWorkspace( aHTML, aDiv = "" )
 return aHTML 
        } // eof setWorkspace
// -------------------------------------------------------------------------------------------

//      fmtWorkspacesHeader(): Fmt Heading for Workspaces 
//  --------------------------------------------------------------
function fmtWorkspacesHeader( ) {
//  var mCols    = [ "Id", "Workspace", "':slug'", "Hst", "CreatedAt" ]
    var mCols    = [ "Workspace", "':slug'" ]
    var aColfmt  = `         <th>{Col}</th>` 
    var aCols    = `
     <table>
       <tr>
       ${ mCols.map( aCol => { return aColfmt.replace( /{Col}/, aCol ) } ).join("\n").substr(7) }
       </tr>\n`
 return aCols
        } // eof fmtWorkspacesHeader
//      --------------------------------------------------------

function fmtWorkspacesHeader_v2( ) {
        var aSelect = `\n     <select id="lstWorkspaces">\n`
     return aSelect
            } // eof fmtWorkspacesHeader
    //      --------------------------------------------------------
    
    function fmtWorkspacesFooter( ) {
 return `\n     </table>`
        } // eof fmtWorkspacesFooter
//      --------------------------------------------------------

function fmtWorkspacesFooter_v2( ) {
    return `\n     </select>`
           } // eof fmtWorkspacesFooter
   //      --------------------------------------------------------
   
function fmtWorkspacesHeader_v1( ) {
    var mCols    = [ "Id", "Workspace", "':slug'", "Hst", "CreatedAt" ]
    var aColfmt  = `         <div><u>{Col}</u></div>` 
    var aCols    = `
     <div class="Header" style="display: flex">
     ${ mCols.map( aCol => { return aColfmt.replace( /{Col}/, aCol ) } ).join("\n").substr(7) }
     </div>\n`  
 return aCols
        } // eof 
//      --------------------------------------------------------

//      fmtWorkspaceRow(): Fmt Each Workspace row
//  --------------------------------------------------------------
function fmtWorkspaceRow( pRec, i ) {
    var mCells   = 
//      [ `${pRec.id}`.padStart(3)                              // Id 
        [  pRec.name.trim()                                     // Workspace 
        ,  pRec.slug.trim()                                     // slug
//      ,  pRec.createdAt .substr(2, 17).replace( /T/, " " )    // CreatedAt 
           ]
    var aCells   =  
`       <tr>
        ${ mCells.map( aCell => { return `         <td>${aCell}</td>` } ).join("\n").substr(8) }
       </tr>`
 return aCells 
        } 
//      --------------------------------------------------------
function fmtWorkspaceRow_v1( pRec, i ) {
    var mCells   = 
        [ `${pRec.id}`.padStart(3)                              // Id 
        ,  pRec.name.trim()                                     // Workspace 
        ,  pRec.slug.trim()                                     // slug
        ,  pRec.createdAt .substr(2, 17).replace( /T/, " " )    // CreatedAt 
           ]
    var aCellfmt =  `      <div>{Cell}</div>` 
    var aCells   =  `
    <div class="row" style="display: flex">
      ${ mCells.map( aCell => { return aCellfmt.replace( /{Cell}/, aCell ) } ).join("\n").substr(6) }
    </div>`  
 return aCells 
        } 
//      --------------------------------------------------------
function fmtWorkspaceRow_v2( pRec, i ) {
    var pItem   = 
        {  Name      : pRec.name.trim() 
        ,  Slug      : pRec.slug.trim() 
//      ,  CreatedAt : pRec.createdAt .substr(2, 17).replace( /T/, " " )    // CreatedAt 
        }
    var aItemFmt =  `       <option id="{Slug}">{Name}</option>` 
    var aItem    = aItemFmt
        aItem    = aItem.replace( /{Slug}/, pItem.Slug )   
        aItem    = aItem.replace( /{Name}/, pItem.Name )  
 return aItem 
        } 
//      --------------------------------------------------------

//      getWorkspaces(): Get Workspaces with API_KEY
//  --------------------------------------------------------------
  async function getWorkspaces( aURL, mFmtFns ) {
        JPTfns.setAPIoptions( { bQuiet: true } )

    if (Array.isArray(aURL)) { mFmtFns = aURL; aURL = '' } 
        aURL      =  aURL ? aURL : '/api/v1/workspaces'
    var aURL      = `${aHost}/${ aURL.replace( /^\//, '' ) }`;  // or `${aHost}/api/v1/workspaces`
        console_log( `  Request:  GET ${aURL}`, bQuiet ) 

    var pResponse =  await getAPI( aURL ) || { } 
//      console.log( pResponse || {} )

    if (pResponse.workspaces) {

    var mRecs     =  pResponse.workspaces
    var aFmtText  =  fmtWorkspaces( mRecs, mFmtFns || [] )

        console_log( "- fmtWorkspaces: ", aFmtText, bQuiet )
        return aFmtText
    } else {
//      throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
        process.exit()
        }
//  --- --------------------------------------------------------
   
function fmtWorkspaces( mRecs, mFmtFns ) {

   var fmtWorkspacesHd = mFmtFns[0] ? mFmtFns[0] : fmtWorkspacesHd_ 
   var fmtWorkspaceRow = mFmtFns[1] ? mFmtFns[1] : fmtWorkspaceRow_ 
   var fmtWorkspacesFt = mFmtFns[2] ? mFmtFns[2] : fmtWorkspacesFt_ 

   var aResult =             fmtWorkspacesHd()
       aResult += mRecs.map( fmtWorkspaceRow ).join( "\n" )
       aResult +=            fmtWorkspacesFt()
return aResult 

//      -----------------------------------------------

function fmtWorkspacesHd_( ) {
   var aText = `\n`
//    + `  Id          Workspace                       ':slug'             Hst     CreatedAt          UpdatedAt     `
//    + ` ----  ------------------------------  -------------------------  ---  -----------------  -----------------`
     + `  Id          Workspace                       ':slug'             Hst     CreatedAt     \n`
     + ` ----  ------------------------------  -------------------------  ---  -----------------\n`
 return aText 
        } // eof fmtWorkspaceHd_
//      -----------------------------------------------

function fmtWorkspaceRow_( pRec, i ) {
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
    var aCreatedAt =  pRec.createdAt .substr(2, 17).replace( /T/, " " )
    var aUpdatedAt =  pRec.lastUpdatedAt.substr(2, 17).replace( /T/, " " )

//eturn ` ${aWID}.  ${aWorkspace}  ${aHistory}  ${aCreatedAt}  ${aUpdatedAt}`
 return ` ${aWID}.  ${aWorkspace}  ${aSlug}  ${aHistory}  ${aUpdatedAt}`
        } // eof fmtWorkspaceRow_ 

function fmtWorkspacesFt_( ) {
 return ``    
        } // eof fmtWorkspaceFt
//      -----------------------------------------------
        } // eof fmtWorkspaces 
//  --- --------------------------------------------------------
} // eof getWorkspaces
//  --- ------------------------------------------------------------------

export default setWorkspaces 




