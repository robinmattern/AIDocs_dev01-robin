// run-eval.mjs
import { evaluate } from 'promptfoo';   // aka const { evaluate } = require('promptfoo');
import fs from 'fs';                    // aka const fs = require('fs');  

async function runEvaluation() {
  try {
    // Load config from file
    const configPath = './promptfooconfig.yaml';
    
    console.log('Running evaluation...');
    
    // Run the evaluation
    const results = await evaluate({
      configPath,
      maxConcurrency: 2,
      verbose: true
    });
    
    // Print summary
    console.log('\nEvaluation Results:');
    console.log(`Total test cases: ${results.results.length}`);
    console.log(`Passed: ${results.summary.pass}`);
    console.log(`Failed: ${results.summary.fail}`);
    
    // Save results to file
    fs.writeFileSync('./results.json', JSON.stringify(results, null, 2));
    console.log('\nResults saved to results.json');
    
    // Compare models (optional)
    const providers = [...new Set(results.results.map(r => r.provider))];
    console.log('\nModel Performance:');
    
    providers.forEach(provider => {
      const providerResults = results.results.filter(r => r.provider === provider);
      const passCount = providerResults.filter(r => r.passed).length;
      const passRate = (passCount / providerResults.length * 100).toFixed(2);
      console.log(`${provider}: ${passRate}% pass rate (${passCount}/${providerResults.length})`);
    });
    
  } catch (error) {
    console.error('Error running evaluation:', error);
  }
}

runEvaluation();