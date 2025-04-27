   import   ollama                 from "ollama";
   import { ChromaClient }         from "chromadb";
   import { getConfig, readText }  from "./utilities.js";
   import { chunkTextBySentences } from "matts-llm-tools";
// import { readFile }             from "fs/promises";

// import   LIBs                   from '../../._2/FRT_Libs.mjs'
      var   LIBs         ={ MWT: () => "../../._2/MWTs" }                                                   // .(50405.06.6)
      var   MWT          =( await  import( `${LIBs.MWT()}/MWT01_MattFns_u2.05.mjs`) ).default               // .(50413.02.8 RAM New Version).(50407.03.1).(50405.06.9)

      var   aMeta        =  await  import.meta.url; 
      var   __dirname    =  aMeta.replace( /file:\/\//, "" ).split( /[\\\/]/ ).slice(0,-1).join( '/' ); 

      var  chroma        =  new ChromaClient({ path: "http://localhost:8000" }); // Explicitly use http://

      var  aCollection   = "buildragwithtypescript"                                     // .(50425.01.1)
//    var  aCollection   = "s13_search-rag-app"                                         // .(50425.01.2)   
//    var  aCollection   = "s13a_apple-p"
//    var  aCollection   = "s13b_apple-pdfs"
//    var  aCollection   = "s13c_rag-architecture-doc"
      var  aCollection   = "s13d_greenbook-docs"
//    var  aCollection   = "s13e_constitution-docs"
//    var  aCollection   = "s13f_eo-docs"

      var  aCollection   =  process.argv[2] ? process.argv[2] : aCollection
//         console.log( `\nCollection: ${aCollection}` ); process.exit()                

      var  aSourceDocs   = "sourcedocs.txt"                                             // .(50425.02.1)
//    var  aSourceDocs   = "s13a_apple-pages.txt"
//    var  aSourceDocs   = "s13b_apple-pages.txt"
//    var  aSourceDocs   = "s13c_rag-architure-doc.txt"
//    var  aSourceDocs   = "s13d_greenbook-docs.txt"
//    var  aSourceDocs   = "s13e_constitution-docs.txt"
//    var  aSourceDocs   = "s13f_eo-docs.txt"
      var  aSourceDocs   = `${aCollection}.txt`

           await deleteCollection( aCollection );                                       // .(50425.01.4)
           await importCollection( aCollection );                                       // .(50425.01.5)
//         await importCollection( aCollection, true );                                 // .(50425.01.6 RAM true = bQuiet, i.e. Don't show every chunk)
           console.log( `\nCollection, '${aCollection}', import complete.`);
           
// --------------------------------------------------------------

async function  deleteCollection( aCollectionName ) {                                   // .(50425.01.3 RAM Use Collection name)
    try {
        await chroma.deleteCollection({ name: aCollectionName });
        console.log(`Deleted collection: '${aCollectionName}'.`);
    } catch (error) {
        console.error(`Error deleting collection: ${aCollectionName}`, error.message);
    }
} // eol deleteCollection
// ----------------------------------------------------------------------------------

async function  importCollection( aCollection, bQuiet ) {                               // .(50425.01.3 RAM Use Collection name)

let collection;
try {
    collection = await chroma.getOrCreateCollection( { 
        name:        aCollection,                                                       // .(50425.01.5) 
        metadata: { "hnsw:space": "cosine" } 
    });
    console.log(`Collection ready:   '${aCollection}'.`);                               // .(50425.01.6) 
} catch (error) {
    console.error(`Error creating/getting collection: ${aCollection}`, error.message);  // .(50425.01.7) 
    process.exit(1); // Exit if collection fails
}
// --------------------------------------------------------------

var { embedmodel, mainmodel } = await getConfig( __dirname );   // .(50424.02.x RAM)

//var docstoimport = (await readFile( "sourcedocs.txt", "utf-8" ) ).split("\n");
  var docstoimport = (await readText( __dirname, aSourceDocs ) ).split("\n");           // .(50425.02.3)
      docstoimport =  docstoimport.filter( doc => doc.match( /^ *[#\/]+/ ) == null ).filter( doc => doc );  // .(50425.02.4)

for (var doc of docstoimport) {
         doc = doc.trim().replace( /^"/, "" ).replace( /"$/, "" );                       // .(50425.02.5)
         console.log(`\nEmbedding chunks from: '${doc}'`);
     if (doc.match( /\.pdf/ )) {
    var  text   = await MWT.extractTextFromPDF( doc );
     } else {
    var  text   = await readText(doc);
         }
    var  chunks = chunkTextBySentences( text, 7, 0 );
    var  currentPosition = 0;                                                            // .(50424.01.1 RAM)
    for (var [index, chunk] of chunks.entries()) {
    try {
         var  embed = (await ollama.embeddings( { model: embedmodel, prompt: chunk })).embedding;
         if (!embed) throw new Error("No embedding returned");
         if (!bQuiet) { 
              console.log(`Embedding chunk ${index} at position: ${currentPosition} + ${chunk.length}`);  
              }
/*         await collection.add({
                ids: [doc + index], 
                embeddings: [embed], 
                metadatas: { source: doc }, 
                documents: [chunk] 
                }); */
         var  pData = 
               { ids:        [doc + index] 
               , embeddings: [embed] 
               , metadatas:  { source: doc 
//                           , position: { beg: currentPosition, end : currentPosition + chunk.length,  len: chunk.length }
                             , position: `${currentPosition} + ${chunk.length}`
                               }
               , documents:  [chunk] 
                 }
       await  collection.add( pData )
              currentPosition = currentPosition + chunk.length
          if (bQuiet) { process.stdout.write(".") };
          } catch (error) {
              console.error(`\nError embedding chunk ${index} from ${doc}:`, error.message);
              }
        }
    } // eol docstoimport 
// --------------------------------------------------------------
} // eof importCollection 
// ----------------------------------------------------------------------------------
