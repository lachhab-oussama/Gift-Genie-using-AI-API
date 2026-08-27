export function checkEnvironment() 
{
  if (!process.env.GROQ_API_KEY) 
  {
    throw new Error("Missing AI_KEY. Your API key is not being picked up.");
  }
}