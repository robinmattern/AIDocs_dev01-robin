  import   path from 'path';
  import { fileURLToPath } from 'url';
  import { readFile, writeFile } from 'fs/promises';
  import { Ollama } from 'ollama';

    var __filename = fileURLToPath(import.meta.url);
    var __dirname = path.dirname(__filename);

//  var aBasePath     = '/Users/Shared/Repos/Grading';
//  var aBasePath     = 'E:\\Repos\\Robin\\AIDocs_\\dev01-robin\\server1\\s14_grading-app'
    var aBasePath     = __dirname 

    var aDefaultModel = "gemma2:2b"

    var aModel        =  process.argv[2] ? process.argv[2] : aDefaultModel

    var aPrompt       =  await getPrompt( aBasePath );
//  var aResponse     =  await getResponse1( aModel, aPrompt );
    var aResponse     =  await getResponse2( aModel, aPrompt,);

        console.log(    `\nThe grading response is:\n\n${aResponse} `)

    var aResultFile   = `${ aBasePath }/grading-result-${ aModel.replace( /:/, ";" ) }.txt`
                         await writeFile( aResultFile, aResponse );

// -----------------------------------------------------------------------------

async function getPrompt( aBasePath ) {
  try {

// Define file paths.  Note the use of template literals correctly.
    var gradingPrompt =  await readFile( `${ aBasePath }/prompt-grading.txt`, 'utf8');
    var userPrompt    =  await readFile( `${ aBasePath }/prompt-user.txt`,    'utf8');
    var systemPrompt  =  await readFile( `${ aBasePath }/prompt-system.txt`,  'utf8');
    var responseText  =  await readFile( `${ aBasePath }/response.txt`,       'utf8');

// Combine grading prompt with file contents
    var aPrompt = `
${gradingPrompt}

Input
System Prompt:
${systemPrompt}

User Prompt:
${userPrompt}

Response:
${responseText}
`;

  return aPrompt
  } catch (error) {
    console.error('Error reading prompt files:\n', error); 
  }
}
// -------------------------------------------------------------------------------------------------

async function getResponse1( aModel, aPrompt ) {
    var pParms = {
          model:    aModel,
          prompt:   aPrompt,
          stream:   false,
          verbose:  true
          }
    var pResponse = await fetch('http://localhost:11434/api/generate', {
          method:    'POST',
          headers: { 'Content-Type': 'application/json' },
          body:       JSON.stringify( pParms )
          });
   if (!pResponse.ok) {
          throw new Error(`HTTP error! Status: ${ pResponse.status} `);
          }

    var pData     = await pResponse.json();

 return pData.response;
        }
// -----------------------------------------------------------------------------

async function getResponse2( aModel, aPrompt ) {
  try {
    var ollama    = new Ollama({
          host:    'http://localhost:11434'
          });

    var pResponse = await ollama.generate({
          model:    aModel,
          prompt:   aPrompt,
          stream:   false,
          options:{ verbose: true }
          });

    return pResponse.response;

  } catch (error) {
    console.error( 'Ollama Error:\n', error );
    }
  }
// -----------------------------------------------------------------------------

