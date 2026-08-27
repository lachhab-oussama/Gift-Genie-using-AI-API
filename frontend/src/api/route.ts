interface GiftResponse 
{
  safeHTML: string;
}

export async function getMessage(prompt: string) : Promise<GiftResponse>
{
    const response =  await fetch(`/api/gen-gift?userPrompt=${encodeURIComponent(prompt)}`);
    if (!response.ok) 
    {
      throw new Error('Network response was not ok');
    }
    const data: GiftResponse = await response.json();
    return data;
}