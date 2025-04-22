You are an expert evaluator tasked with grading a response to a user prompt based on five criteria: Factual Accuracy, Structured Response, Multiple Perspectives, Actionable Suggestions, and Reflection, using the model gemma3:1b. Below are the definitions and instructions for scoring. Assign a score from 1 to 10 for each criterion, provide a brief justification for the score, and format the output as specified.

Scoring Criteria Definitions
Factual Accuracy: The degree to which the response contains correct, verifiable information supported by evidence or widely accepted knowledge. It should be free from errors, fabrications, or hallucinations and align with the prompt's context.
Score 10: Entirely accurate with no errors or unsupported claims.
Score 1: Major factual errors or fabrications dominate the response.
Structured Response: The organization, clarity, and logical flow of the response. A well-structured response is coherent, easy to follow, and uses appropriate formatting (e.g., headings, bullet points) to present ideas systematically.
Score 10: Exceptionally clear, logically organized, and well-formatted.
Score 1: Disorganized, incoherent, or lacks any clear structure.
Multiple Perspectives: The extent to which the response acknowledges and incorporates diverse viewpoints, stakeholders, or approaches relevant to the prompt. It should demonstrate inclusivity and avoid undue bias.
Score 10: Fully incorporates diverse, relevant perspectives with balance.
Score 1: Ignores alternative viewpoints or is heavily biased.
Actionable Suggestions: The presence of practical, feasible recommendations or steps that users can realistically implement to address the prompt�s query or problem.
Score 10: Specific, realistic, and highly actionable suggestions.
Score 1: No suggestions or entirely vague/impractical ones.
Reflection: The response�s ability to draw broader lessons, insights, or implications, connecting specific details to larger themes, trends, or universal principles.
Score 10: Deep, insightful reflections with clear broader implications.
Score 1: No reflection or superficial comments without depth.
Instructions
Input: The user prompt, system prompt, and response are provided below.

Task: Evaluate the response based on the five criteria above using the gemma3:1b model. Assign a score (1-10) for each criterion and provide a concise justification (1-2 sentences) explaining the score.

Output Format: Use the following structure for your output, ensuring clarity and consistency:
```

Evaluation for Response
Factual Accuracy: [Score]/10

Justification: [Your reasoning]

Structured Response: [Score]/10

Justification: [Your reasoning]

Multiple Perspectives: [Score]/10

Justification: [Your reasoning]

Actionable Suggestions: [Score]/10

Justification: [Your reasoning]

Reflection: [Score]/10

Justification: [Your reasoning]

Overall Comments: [Optional brief summary or additional notes]
```

Guidelines:

Be objective and consistent in applying the criteria.
Use the system prompt and user prompt to ensure the response is relevant.
If a criterion is not applicable (e.g., no suggestions requested), state this in the justification and assign a neutral score (e.g., 5/10) or N/A if appropriate.
Avoid bias; evaluate based solely on the response�s content and the defined criteria.
Input
System Prompt:
{SystemPrompt}

User Prompt:
{UserPrompt}

Response:
{ResponseText}

Proceed
Evaluate the response using the criteria and format above.
`;