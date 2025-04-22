// test-ollama.mjs
import fs from 'fs';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import yaml from 'js-yaml';
import { evaluate } from 'promptfoo';

const exec = promisify(execCallback);

// Configure the models and prompts you want to test
const config = {
  prompts: [
    "Explain the concept of {{topic}} in simple terms.",
    "Write a short story about {{character}} in {{setting}}."
  ],
  providers: [
    "ollama:llama2",
    "ollama:mistral",
    "ollama:gemma"
  ],
  tests: [
    {
      description: "Technical explanation",
      vars: {
        topic: "quantum computing",
        character: "a scientist",
        setting: "a laboratory"
      }
    },
    {
      description: "Creative writing",
      vars: {
        topic: "artificial intelligence",
        character: "a robot",
        setting: "the future"
      }
    }
  ],
  commandLineOptions: {
    maxConcurrency: 2,
    table: true,
    verbose: true
  }
};

const runTest = async () => {
  try {
    // Save config to file
    fs.writeFileSync('test-config.yaml', yaml.dump(config));
    console.log('Configuration file created.');
    
    // Run evaluation
    console.log('Running evaluation...');
    const { stdout, stderr } = await exec('npx promptfoo eval -c test-config.yaml -o results.json --json');
    
    if (stderr) {
      console.error('Error:', stderr);
    }
    
    console.log('Evaluation complete. Results saved to results.json');
    
    // Additional processing of results can be done here
    const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));
    
    // Print summary
    console.log(`\nTotal test cases: ${results.results.length}`);
    console.log(`Passed: ${results.summary.pass}`);
    console.log(`Failed: ${results.summary.fail}`);
    
    // Compare models
    const providers = [...new Set(results.results.map(r => r.provider))];
    console.log('\nModel Performance:');
    
    providers.forEach(provider => {
      const providerResults = results.results.filter(r => r.provider === provider);
      const passCount = providerResults.filter(r => r.passed).length;
      const passRate = (passCount / providerResults.length * 100).toFixed(2);
      console.log(`${provider}: ${passRate}% pass rate (${passCount}/${providerResults.length})`);
    });
    
  } catch (error) {
    console.error('Execution error:', error);
  }
};

// Alternative approach using the API directly
const runEvaluationAPI = async () => {
  try {
    console.log('Running evaluation via API...');
    
    const results = await evaluate({
      prompts: config.prompts,
      providers: config.providers,
      tests: config.tests,
      maxConcurrency: 2,
      verbose: true
    });
    
    // Print summary
    console.log('\nEvaluation Results:');
    console.log(`Total test cases: ${results.results.length}`);
    console.log(`Passed: ${results.summary.pass}`);
    console.log(`Failed: ${results.summary.fail}`);
    
    // Save results to file
    fs.writeFileSync('./api-results.json', JSON.stringify(results, null, 2));
    console.log('\nResults saved to api-results.json');
    
    return results;
  } catch (error) {
    console.error('Error running evaluation:', error);
  }
};

// Run both methods
const main = async () => {
  // Choose which method to run
  const useAPI = process.argv.includes('--api');
  
  if (useAPI) {
    await runEvaluat