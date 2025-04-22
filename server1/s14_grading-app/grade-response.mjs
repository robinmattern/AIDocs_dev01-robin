// const    fs = require('fs').promises;
// import   fs from 'fs'
   import { promises as fs } from 'fs';
   import   ollama from'ollama';
    
// const axios = require('axios');

// var aDir=process.cwd() + '/._2/MWTs';
   var aDir=process.cwd() + '/server1/s14_grading-app';

   var aModel="llama3.2:3b"
   var aModel = process.argv[2] || aModel

async function gradeResponse() {
try {
// Read input files
var userPrompt   = await fs.readFile( `${aDir}/prompt-user.txt`,    'utf8');
var systemPrompt = await fs.readFile( `${aDir}/prompt-system.txt`,  'utf8');
var responseText = await fs.readFile( `${aDir}/response.txt`,       'utf8');

// Combine grading prompt with file contents
var gradingPrompt = await fs.readFile( `${aDir}/grading-prompt.md`, 'utf8');

// Send request to Ollama
// const response = await axios.post('http://localhost:11434/api/generate', {
//model: 'gemma3:1b',
//prompt: gradingPrompt,
//stream: false
//});

     gradingPrompt = gradingPrompt.replace(/{SystemPrompt}/g, systemPrompt)
     gradingPrompt = gradingPrompt.replace(/{UserPrompt}/g,   userPrompt)
     gradingPrompt = gradingPrompt.replace(/{ResponseText}/g, responseText)
//    gradingPrompt = "what do you know"
/*
var response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    model: 'gemma2:2b',
    headers: { 'Content-Type': 'application/json' },
    body: gradingPrompt,
    stream: false
    });
*/
var pParms = {
    method:    'POST',
    model:      aModel,
    headers: { 'Content-Type': 'application/json' },
    body:       gradingPrompt,
    stream:     false
    }

    var  response          =  await  ollama.generate( pParms );                                           // .(50408.16.1 RAM Run the Model)

// Output the result
console.log(response.data.response);

// Optionally save the result to a file
await fs.writeFile('grading-result.txt', response.data.response);
console.log('Grading result saved to grading-result.txt');

} catch (error) {
console.error('Error during grading:', error.message);
}  // eof try catch block 
}

gradeResponse();