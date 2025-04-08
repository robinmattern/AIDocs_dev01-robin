/*\
##=========+====================+================================================+
##RD        MWT01_MattFns       | Matt's Utility Functions
##RFILE    +====================+=======+===============+======+=================+
##FD   MWT01_MattFns_u1.03.mjs  |      0|  3/29/25  7:00|     0| p1.03`50329.0700
##FD   MWT01_MattFns_u1.03.mjs  |  18159|  4/02/25  7:20|   343| p1.03`50402.0720
##FD   MWT01_MattFns_u1.03.mjs  |  19735|  4/04/25 12:30|   343| p1.03`50404.1230
##FD   MWT01_MattFns_u1.03.mjs  |  20537|  4/05/25 16:45|   362| p1.03`50405.1645
##FD   MWT01_MattFns_u2.03.mjs  |  20537|  4/07/25 19:xx|   362| p1.03`50407.19xx
#
##DESC     .--------------------+-------+---------------+------+-----------------+
#            This script implements the utility functions for working with Matt
#             Williams example Ollama scripts written between 2/15/24 and 1/30/25.
#
##LIC      .--------------------+----------------------------------------------+
#            Copyright (c) 2025 JScriptWare and 8020Date-FormR * Released under
#            MIT License: http://www.opensource.org/licenses/mit-license.php
##FNS      .--------------------+----------------------------------------------+
#                               |
# async ion  ask4Text(   aPrompt ) {
# async ion  htmlToText( html ) {
#       ion  fmtText(    text ) {
#       ion  fmtResults( results ) {
#       ion  fmtStats(   stats, params ) {
#       ion  showHiddenChars( str ) {
# async ion  fmtStream(  stream ) {
# async ion  fmtStream(  stream ) {
#       ion  createUserInput( )
#       ion  getServerInfo( )
#       ion  wrap( )

##CHGS     .--------------------+----------------------------------------------+
#.(50329.02   3/29/25 XAI  7:00a| Created by Grok xAI
#.(50330.03   3/30/25 RAM  7:00p| Replace createUserInput with ask4Text
#.(50330.04   3/30/25 RAM  7:30p| Write and use getServerInfo
#.(50330.06   3/30/25 XAI  8:15p| Write and use wrap
#.(50330.06a  3/31/25 RAM  8:15a| Add indent to wrap
#.(50331.03   3/31/25 RAM 12:20p| Write and use savStats
#.(50331.04   3/31/25 RAM  1:50p| Write and use getVars
#.(50330.04b  3/31/25 RAM  4:45p| Add more server info
#.(50330.04c  3/31/25 RAM  7:35p| Add web searchPrompt
#.(50331.05   3/31/25 RAM  9:00p| Add ResponseFile to Stats and CSV
#.(50331.05c  3/31/25 RAM 11:00p| Fix Resp_Id for Stats and CSV
#.(50402.03   4/01/25 RAM  7:20a| Fix "Tokens Per Second" CSV heaading
#.(50403.02   4/03/25 RAM  1:40p| Move getEnvVars to AIC90_FileFns.mjs
#.(50403.04   4/03/25 RAM  2:45p| Save Stats to .tab file
#.(50404.01   4/04/25 RAM 12:30p| Write and use shoMsg
#.(50404.05   4/04/25 RAM  3:45p| Add lines and change Stats .tab widths
#.(50407.02   4/07/25 RAM  6:50p| Bump version to 2.03
#.(50407.03   4/07/25 RAM  7:15p| Add Query Prompt Code 

##PRGM     +====================+===============================================+
##ID 69.600. Main0              |
##SRCE     +====================+===============================================+
\*/
//========================================================================================================= #  ===============================  #

   import   inquirer             from 'inquirer'                                        // .(50330.03.1 RAM New console input)
   import   dotenv               from 'dotenv'                                          // .(50330.04.1 RAM Need this)
   import { dirname, join }      from 'path';
   import { fileURLToPath }      from 'url';
import { ftruncate } from 'fs';

// import { Readability   }      from '@mozilla/readability';
// import { JSDOM         }      from 'jsdom';

//   -- --- ---------------  =  ------------------------------------------------------  #  ---------------- #
       var  aVer             = "u2.03"                                                  // .(50407.02.1 Was u0.03)

      var __dirname          =    dirname( fileURLToPath( import.meta.url ) );          // .(50330.04.2)
       var  aEnvDir          =  __dirname.replace( /\._2.*/, '._2' )                    // .(50330.04.3)
            dotenv.config( { path: join( aEnvDir, '.env'), override: true } );          // .(50330.04.4)

//   -- --- ---------------  =  ------------------------------------------------------  #
/*
//function  getEnvVars( aAppDir ) {                                                     //#.(50403.02.5 RAM Move to FileFns).(50331.04.1 RAM Write getVars Beg)
//          dotenv.config( { path: join( aAppDir, '.env'), override: true } );
//  return  process.env
//          }  */                                                                       //#.(50403.02.5).(50331.04.1 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  wrap( text, width, indent1,  indent2 ) {                                    // .(50330.06a.1).(50330.06.1 RAM Write wrap Beg)
            indent2       =    indent2 ? indent2 : 0;   indent1 = indent1 ? indent1 : 0 // .(50330.06a.2)
       if ((indent2 == 0)  &&  indent1 > 0) { indent2 = indent1;  indent1 = 0 }         // .(50330.06a.3 RAM If only one indent

     const  lines = text.split('\n');
     const  wrappedLines = lines.map(line => {
     const  words = line.split(' ');
       let  currentLine = '';
       let  result = [];

       for (const word of words) {
       if ((currentLine + word).length <= width) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            result.push(currentLine);
            currentLine = word;
            }
          }
        if (currentLine) result.push(currentLine);
    return  result.join( '\n'.padEnd( indent2 + 1 ) );                                  // .(50330.06a.4 RAM Add indent2)
            });
    return  wrappedLines.join( '\n'.padEnd( indent1 + 1 ) );                            // .(50330.06a.5 RAM Add indent1)
            }
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  wrap1( text, width, indent1,  indent2 ) {                                   // .(50330.05a.1).(50330.05.1 RAM Write wrap Beg)
            indent2       =    indent2 ? indent2 : 0;   indent1 = indent1 ? indent1 : 0 // .(50330.05a.2)
       if ((indent2 == 0)  &&  indent1 > 0) { indent2 = indent1;  indent1 = 0 }         // .(50330.05a.3 RAM If only one indent
    return  wrap_( text, width, indent1, indent2 )
       var  mLines = text.split( "\n" )
            mLines = mLines.map( aLine => wrap_( aLine, width, indent1, indent2 ) )
    return  mLines.join( '\n'.padEnd( indent1 + 1 ) );
            }

  function  wrap_( text, width, indent1, indent2 ) {                                    // .(50330.05a.1).(50330.05.1 RAM Write wrap Beg)
     const  words       =  text.split(' ');
       let  lines       =  [];

       let  indent      = ''.padEnd( indent1 )                                          // .(50330.05a.4)
       let  currentLine =  '';                                                          //#.(50330.05a.5 RAM Was '')

       for (const word  of words) {
       if ((currentLine +  word).length <= width) {
            currentLine += (currentLine ? ' ' : '' ) + word;                            //#.(50330.05a.6 RAM Was '')
        } else {
            lines.push( indent + currentLine );                                         // .(50330.05a.6 RAM Add indent)
            currentLine =  word;                                                        //#.(50330.05a.7 RAM Add indent )
            }
         }
        if (currentLine) { lines.push( indent + currentLine ); }                        // .(50330.05a.6 RAM Add indent)

//  return  indent + lines.join( '\n'.padEnd( indent2 + 1 ) );                          //#.(50330.05a.8 RAM Add indent )
    return           lines.join( '\n'.padEnd( indent2 + 1 ) );                          // .(50330.05a.8 RAM Add indent )
            } // eof wrap                                                               // .(50330.05.1 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  shoMsg( aSection ) {                                                        // .(50404.01.25 RAM Write shoMsg Beg)
       var  aSections  = `,${global.aPrtSections.toLowerCase()},`
            aSection   = `,${aSection.toLowerCase()},`
        if (aSections == ',all,' || ',all,' == aSection) { return true }
    return  aSections.match( aSection ) ? 1 : 0
            } // eof ask4Text                                                           // .(50404.01.25 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

async  function  ask4Text( aPrompt ) {                                                  // .(50330.03.2 RAM Write ask4Text Beg)
  var  pResponse = await inquirer.prompt([
   {
       type:   'input',
       name:   'aResponse',
       message: aPrompt,
       theme: { prefix: '' } // Removes the '?' prefix
       }
  ]);
 var   aAnswer = pResponse.aResponse;
return aAnswer;
       } // eof ask4Text                                                                // .(50330.03.2 End)
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Converts HTML content to plain text using Mozilla's Readability
 * @param {string} html - HTML content to convert
 * @returns {string} - Extracted text content
 */
async  function  htmlToText(html) {
  const { Readability } = await import('@mozilla/readability');
  const { JSDOM       } = await import('jsdom');

  const dom  = new JSDOM(html);
  const doc  = dom.window.document;
  const text = new Readability(doc).parse();
  return text.textContent;
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats text by cleaning up excessive whitespace and newlines
 * @param {string} text - Text to format
 * @returns {string} - Formatted text
 */
function  fmtText(text) {
     let formattedText = text.replace(/[\n\r]\s*\n/g, "\n");
         formattedText = formattedText.replace(/    /g, " ");
  return formattedText;
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats search results for display
 * @param {Array} results - Array of result objects
 * @returns {string} - Formatted results as string
 */
function  fmtResults(results) {
  if (results.length === 0) { return ''; }
  const urls = results.map(result => `${result.FirstURL.trim()}\n       ${result.Text}`);
  return "\n     " + urls.join("\n     ");
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats Ollama model run statistics
 * @param {Object} stats - Statistics object from Ollama response
 * @param {Object} params - Parameters used for the model
 * @returns {Array} - Array of formatted statistics lines
 */
  function  fmtStats( stats, parms ) {
//    var [ aServer, aCPU_GPU_RAM ] = getServerInfo();                                  //#.(50330.04.5 RAM Use it).(50330.04b.1)
            parms.resp_id  = parms.logfile.split( /[\\\/]/ ).pop().slice(0,24)          // .(50331.05c.1).(50331.05.1)
      var [ aServer, aCPU_GPU, aRAM, aPC_Model, aOS ]  = getServerInfo();               // .(50330.04b.1)
       var  statLines = [];
            statLines.push(`Ollama Run Statistics:`);
            statLines.push(`---------------------------------------------------------`);
            statLines.push(`    Server: ${aServer}` )                                   // .(50330.04.6)
            statLines.push(`    Operating System:  ${ aOS }` )                          // .(50330.04b.2)
            statLines.push(`    CPU/GPU/RAM:       ${ aCPU_GPU }, ${aRAM}` )            // .(50330.04b.3).(50330.04.7)
            statLines.push(`    Computer:          ${ aPC_Model }` )                    // .(50330.04b.4)
            statLines.push(`    Session.Post ID:   ${ parms.resp_id }` );               // .(50331.05.2)
            statLines.push(`    Model Name:        ${ parms.model }` );
            statLines.push(`    Temperature:       ${ parms.temp }` );                  // .(50331.05.3)
            statLines.push(`    Context Window:    ${ parms.options.num_ctx   } bytes`);
            statLines.push(`    Total Duration:    ${(stats.total_duration / 1e9).toFixed(2) } seconds`);
            statLines.push(`    Eval Count:        ${ stats.eval_count        } tokens`);
            statLines.push(`    Eval Duration:     ${(stats.eval_duration  / 1e9).toFixed(2) } seconds`);
            statLines.push(`    Prompt Eval Count: ${ stats.prompt_eval_count } tokens`);
            statLines.push(`    Tokens per Second: ${(stats.eval_count / (stats.eval_duration / 1e9)).toFixed(2) } seconds`);
    return  statLines;
            }
//   -- --- ---------------  =  ------------------------------------------------------  #

//          getServerInfo(); debugger
//    var [ aServer, aCPU_GPU_RAM ] = getServerInfo();
//          console.log( `  CPU/GPU/RAM: ${aCPU_GPU_RAM}` ); debugger

  function  getServerInfo( ) {                                                          // .(50330.04.8 RAM Write getServerInfo Beg)
       var  aServer          =   process.env.THE_SERVER
       var  aCPU_GPU         =`${process.env.THE_CPU}${                                 // .(50330.04b.5 Beg)
                                (process.env.THE_CPU != process.env.THE_GPU)
                          ? `, ${process.env.THE_GPU}` : '' }`
       var  aModel           =   process.env.THE_PC_MODEL
       var  aOS              =   process.env.THE_OS
       var  aRAM             =   process.env.THE_RAM
   return [ aServer, `${aCPU_GPU}`, aRAM, aModel, aOS ]                                 // .(50330.04b.5 Add aModel, aOS End)
// return { THE_SERVER       :  aServer
//        , CPU_GPU_RAM      : `${aCPU_GPU}, ${aRAM}`
//          }
            } // eof getServerInfo                                                      // .(50330.04.8 End)
//   -- --- ---------------  =  ------------------------------------------------------  #

  function  savStats( stats, parms, aExt ) {                                            // .(50403.04.1 RAM Add aExt).(50331.03.1 RAM Write savStats)
      var [ aServer, aCPU_GPU, aRAM, aPC_Model, aOS ]  = getServerInfo();               // .(50330.04b.6)
       var  pStats  = {};
            pStats.RespId           =     parms.resp_id.slice( 0, 11 )                  // .(50331.05c.2).(50331.05.4)
            pStats.ModelName        =` ${(parms.model.padEnd( 25 ) )}`                  // .(50404.05.01 RAM Make model width 25)
            pStats.ContextSize      = `${ parms.options.num_ctx                 }`.padStart(5)                        // .(50404.05.02)
            pStats.Temperature      = `${ parms.temp}`.padStart(4)                                                    // .(50404.05.03)
            pStats.Duration         = `${(stats.total_duration / 1e9).toFixed(2)}`.padStart(7)                        // .(50404.05.04)
            pStats.EvalTokens       = `${ stats.eval_count                      }`.padStart(5)                        // .(50404.05.05)
            pStats.QPC              =     parms.qpc                                                                   // .(50407.03.4 RAM Add QPC)                                                                   
            pStats.QueryPrompts     =     stats.query.length > 27                                                     // .(50407.03.5 RAM Was Query)
                                    ? `${ stats.query.slice(0,24)}...` : stats.query.padEnd(27)                       // .(50407.03.5 RAM Add ...)   
            pStats.EvalDuration     = `${(stats.eval_duration  / 1e9).toFixed(2)}`.padStart(7)                        // .(50404.05.06)
            pStats.PromptEvalTokens = `${ stats.prompt_eval_count               }`.padStart(6)                        // .(50404.05.07)
            pStats.TokensPerSecond  = `${(stats.eval_count / (stats.eval_duration / 1e9)).toFixed(2)}`.padStart(6)    // .(50404.05.08)
            pStats.WebSearch        =     stats.websearch                               // .(50330.04c.4)
            pStats.WebSearchURL     =     stats.url                                     // .(50407.03.6)   
            pStats.Docs             =     stats.docs
            pStats.CPU_GPU          =  aCPU_GPU                                         // .(50330.04b.7 Beg)
            pStats.RAM              =  aRAM.replace( / *GB/, '' )
            pStats.OS               =  aOS
            pStats.Computer         =  aPC_Model                                        // .(50330.04b.7 End)
            pStats.Server           =  aServer
            pStats.ResponseFile     =  `file:///${parms.logfile}`                       // .(50331.05c.3).(50331.05.5)
       var  mStats                  =  Object.entries( pStats ).map( pStat => pStat[1] )
//     var  aCSV                    = `"${ mStats.join( '","' ) }"`                     //#.(50403.04.2 Beg)
//     var  aFlds                   = `Model,URL,Docs,Query,Context,Duration,PromptEvalCount,EvalCount,EvalDuration,TokensPerSecond,Server,CPU_GPU_RAM`
//     var  aFlds                   = `Model,Context,Temperature,Duration,EvalTokens,URL,Docs,Query,EvalDuration,PromptEvalTokens,TokensPerSecond,Server,CPU_GPU_RAM`
//     var  aFlds                   = `RespId,Model,Context,Temperature,Duration,"Eval Tokens",Query,"Eval Duration","Prompt Eval Tokens","Tokens Per Second","Web Search",Docs,URL,CPU_GPU,RAM,OS,Computer,Server,"Response File"`
//     var  mFlds                   = [ "RespId","Model","Context","Temperature","Duration","Eval Tokens","Query","Eval Duration","Prompt Eval Tokens","Tokens Per Second","Web Search","Docs","URL","CPU_GPU","RAM","OS","Computer","Server","Response File" ]  //#.(50407.03.7)
       var  mFlds                   = [ "RespId     ","Model Name               ","Context","Temp","Duration","Eval Tokens","PCD","Model Query Prompt","Eval Duration","Prompt Eval Tokens","Tokens Per Second","Web Search","Docs","Web Search URL","CPU_GPU","RAM","OS","Computer","Server","Response File" ]  // .(50407.03.7 RAM Add QPC column)
       var  aDelim                  =  aExt.match( /tab/ ) ? "\t" : '","',  aQQ = aDelim == "\t" ? '' : '"'
       var  aFlds                   =  mFlds.join( aDelim )
       var  aRow                    =  aQQ + mStats.join( aDelim ) + aQQ                // .(50403.04.2 End)
   return [ pStats, [ aFlds, aRow ] ]                                                   // .(50403.04.3 RAM Was aCSV)
            }                                                                           // .(50331.03.1)
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Shows hidden characters in a string (useful for debugging)
 * @param {string} str - String to analyze
 * @returns {string} - String with visible representations of hidden characters
 */
function  showHiddenChars( str ) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code === 10) result += "[\\n]";      // Newline
    else if (code === 13) result += "[\\r]"; // Carriage return
    else if (code ===  9) result += "[\\t]";  // Tab
    else if (code === 32) result += "[ ]";   // Space
    else result += str[i];
  }
  return result;
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Formats the streaming response from Ollama
 * @param {Stream} stream - Ollama response stream
 * @returns {Promise<Array>} - Promise resolving to array containing [stats, result]
 */
async function  fmtStream(stream) {
  let isNewLine = true;
  let result = "";
  let finalStats = null;

  for await (const chunk of stream) {
    if (isNewLine) {
      result += chunk.response;
      if (global.nLog == 1) {
        process.stdout.write(`    ${chunk.response}`);
      }
    } else {
      result += chunk.response;
      if (global.nLog == 1) {
        process.stdout.write(chunk.response);
      }
    }
    isNewLine = chunk.response.endsWith("\n");
    finalStats = chunk;
  }
  return [finalStats, result];
}
//   -- --- ---------------  =  ------------------------------------------------------  #
/**
 * Creates a readline interface for user input
 * @returns {Object} - Object with promptUser method
 *//*
function  createUserInput() {                             //#.(50330.03.3 RAM Remove createUserInput Beg)
  const { createInterface } = require('readline');

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Function to prompt user asynchronously
  const promptUser = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

  return {
    promptUser,
    close: () => rl.close()
  };                                                      //#.(50330.03.3 End)
} */
//   -- --- ---------------  =  ------------------------------------------------------  #

export default {  // Export as default object with named functions
  wrap,                                                   // .(50330.05.2)
  ask4Text,                                               // .(50330.03.4)
  fmtText,
  htmlToText,
  fmtResults,
  fmtStats,
  savStats,                                               // .(50331.03.3)
//getEnvVars,                                             //#.(50403.02.6).(50331.04.2)
  showHiddenChars,
  fmtStream,
  shoMsg                                                  // .(50404.01.26)
//createUserInput                                         //#.(50330.03.5)
  };
