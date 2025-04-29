   import   ollama          from "ollama";
   import { ChromaClient }  from "chromadb";
   import { getConfig    }  from "./utilities.js";
      var   aMeta        =  await import.meta.url; 
      var   __dirname    =  aMeta.replace( /file:\/\//, "" ).split( /[\\\/]/ ).slice(0,-1).join( '/' ); 

      var { embedmodel, mainmodel } = await getConfig( __dirname );

       var  chroma = new ChromaClient({ path: "http://localhost:8000" }); // Explicit http://

       var  query = process.argv.slice(2).join(" ");
       var  query = "What are these documents about?";

       var  aCollection="buildragwithtypescript"                                        // .(50425.01.8)
//     var  aCollection="s13_search-rag-app"                                            // .(50425.01.9) 
       var  aCollection   = "buildragwithtypescript"                                    // .(50425.01.1)
       var  aCollection   = "s13_search-rag-app"                                        // .(50425.01.2) 
//     var  aCollection   = "s13a_apple-p"
//     var  aCollection   = "s13b_apple-pdfs"
//     var  aCollection   = "s13c_rag-architecture-doc"
//     var  aCollection   = "s13d_greenbook-docs"
//     var  aCollection   = "s13e_constitution-docs"
//     var  aCollection   = "s13f_eo-docs"

       var  aCollection   =  process.argv[2] ? process.argv[2] : aCollection
//          console.log( `\nCollection: ${aCollection}` ); process.exit()                

       var  pDocs = await getRelevantDocs( aCollection, query )                         // .(50425.01.10) 

            console.log( `\n  pDocs.length: ${pDocs.length}` )
//          console.log( `\n  Docs: ${pDocs.length}` )

     process.exit() 
// --------------------------------------------------------------

async function getRelevantDocs( aCollection, query ) {                                  // .(50425.01.11) 
let collection;
try {
    collection = await chroma.getOrCreateCollection( {
        name:        aCollection,                                                       // .(50425.01.12) 
        metadata: { "hnsw:space": "cosine" } 
        } );
    console.log(`Collection '${aCollection}', ready.`);                                 // .(50425.01.13) 
} catch (error) {
    console.error(`Error creating/getting collection: ${aCollection}`, error.message);  // .(50425.01.14) 
    process.exit(1); // Exit if collection fails
    }
// --------------------------------------------------------------       

let queryembed;
try {
    queryembed = (await ollama.embeddings({ model: embedmodel, prompt: query })).embedding;
    if (!queryembed) throw new Error("No embedding returned from ollama");
} catch (error) {
    console.error("Error generating query embedding:", error.message);
    process.exit(1);
    }
console.log( `\n  Query: ${query}`);

// ------------------------------------------------------------------------------------------------

       var  relevantDocs;
       var  pConfig = 
             {  queryEmbeddings: [queryembed]
             ,  nResults: 5
             ,  includemetadata: true  // This is the key addition
//           ,  include: ["metadatas", "documents", "distances", "data"]
             ,  include: ["metadatas", "documents"]
             ,  whereMetadata: { "$exists": "chroma:document" } // This might he
                };
      try {
//          relevantDocs = (await collection.query({ queryEmbeddings: [queryembed], nResults: 5 })).documents[0].join("\n\n");
       var  queryResults =  await collection.query( pConfig )

        } catch (error) {
            console.error("Error querying collection:", error.message);
            process.exit(1);
            }

// Access documents and metadata separately
       var  relevantDocs     =  queryResults.documents[0];
       var  relevantMetadata =  queryResults.metadatas[0];
            relevantMetadata =  relevantMetadata.map( (item, i) => { 
             var  nBeg       =  item.position.replace( /\+.+/, "" ).trim() * 1
             var  nLen       =  item.position.replace( /.+\+/, "" ).trim() * 1
                  item.text  =  relevantDocs[i] 
                  item.url   = `${item.source}?start=${nBeg},length=${nLen}`
          return  item 
                  } )

// You can now use both
            console.log( "\nRelevant documents:\n",  relevantDocs.map( (pDoc,i) => { return `${ `${i+1}.`.padStart(3) } ${pDoc}` } ).join(`\n${ "".padEnd(100,"-") }\n\n`) );
            console.log( "\nAssociated metadata:",   relevantMetadata );  
     return relevantDocs
} // eof getRelevantDocs   
// ----------------------------------------------------------------------------

const modelQuery = `${query} - Answer that question using the following text as a resource: ${relevantDocs}`;

try {
    const stream = await ollama.generate({ model: mainmodel, prompt: modelQuery, stream: true });
    for await (const chunk of stream) {
        process.stdout.write( chunk.response);
    }
} catch (error) {
    console.error("Error generating response from ollama:", error.message);
}



async function  getDocs( query ) {
    //   const  url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;                 //#.(50408.09.1))
         const  url =  pVars.WEB_SEARCH_URL.replace( /{WebSearch}/, encodeURIComponent(query) )                 // .(50408.09.1 RAM Use WEB_SEARCH_URL)
         const  fallbackURL = pVars.WEB_FALLBACK_URL                                                            // .(50408.09.2)
    
                usrMsg(`  Fetching from:   "${url.replace(/%20/g, "+")}"`, shoMsg('Parms')) // .(50404.01.4)
      try {
         const  response = await fetch(url);
           if (!response.ok) {
                throw new Error( `HTTP error! Status: ${response.status}` );
                }
         const  text     =  await response.text();
           if (!text) {
                usrMsg("\n Empty response from Web Search URL.");                                               // .(50408.09.3 RAM Was DuckDuckGo)
    //  return ["https://www.lexingtonvirginia.com/"];                                                          //#.(50408.09.4)
        return { WebResponse: {}, URLs: [ fallbackURL ] };                                                      // .(50408.09.4)
                }
         const  searchResultsJson = JSON.parse(text);
    
                usrMsg("---------------------------------------------------------------------------------------------- "   , shoMsg('Search')  ) // .(50404.01.5)
                usrMsg("Response from Web Search URL:"                                                                     , shoMsg('Search')  ) // .(50408.09.5 RAM Was DuckDuckGo).(50404.01.6)
           var  pResults =
                 {  AbstractURL:             searchResultsJson.AbstractURL
                 ,  Results: MWT.fmtResults( searchResultsJson.Results )
                 ,  RelatedTopics:           searchResultsJson.RelatedTopics
                           ? MWT.fmtResults( searchResultsJson.RelatedTopics )
                           : []
                    }
           var  aResults =  JSON.stringify(pResults, null, 2).replace(/\\n     /g, "\n     ").replace(/\\n       /g, "\n       ")
                usrMsg(`\n  Web Search Response:\n${ aResults.replace( /{/, "" ).replace(/\n}/, "") }`                     , shoMsg('Search' ) ) // .(50404.01.7)
    
           var  results =                                                                                       // .(50408.07.1 MWT This has many more "results" than pResults above)
                 [ ...( searchResultsJson.Results || [] )
                 , ...( searchResultsJson.RelatedTopics || []).flatMap( item =>
                      "Topics" in item ? item.Topics : [item]
                       ),
                   ].filter( item => item.FirstURL && item.Text);
    
            if (searchResultsJson.AbstractURL) {
                results.unshift( { FirstURL: searchResultsJson.AbstractURL, Text: "Overview" } );
                }
           var  urls = results.map( result => result.FirstURL ).slice(0, 5);                                    // .(50408.07.2 MWT He only returns the first 5 URLs)
            if (urls.length === 0) {
                usrMsg("\n* No URLs found, returning fallback.");
    //  return         ["https://www.lexingtonvirginia.com/"];                                                  //#.(50408.09.6)
        return { WebResponse: {}, URLs: [ fallbackURL ] };                                                      // .(50408.09.6)
                }
                usrMsg(`\n  Found ${urls.length} URLs:`                                                                    , shoMsg('Search')  ) // .(50404.01.8)
        return { WebResponse: pResults, URLs: urls } ;                                                          // .(50408.06.10)
    
            } catch( error ) {
    //          console.error(      "Error in getNewsUrls:", error);                        //#.(50404.08.1)
                sayMsg(`A1201[ 500]* Error in getNewsUrls for query: '${query}'.`, 1, 1);   // .(50404.08.1)
                sayMsg(`${error}`.replace( /\n/, "\n    " ) );                              // .(50404.08.2)
    //  return         ["https://www.lexingtonvirginia.com/"];                                                  //#.(50408.09.7)
        return { WebResponse: {}, URLs: [ fallbackURL ] };                                                      // .(50408.09.7)
                 }
             }; // eof getDocss
    // --  ---  --------  =  --  =  ------------------------------------------------------  #
    