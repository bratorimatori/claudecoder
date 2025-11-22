import OpenAI from 'openai';

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Generate embeddings for text using OpenAI's text-embedding-3-small model
 * Cost: ~$0.00002 per 1K tokens (very cheap)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!openai) {
    console.warn('OpenAI API key not configured - skipping embedding generation');
    return [];
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return [];
  }
}

/**
 * Generate embeddings for multiple texts in batch
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (!openai) {
    console.warn('OpenAI API key not configured - skipping embedding generation');
    return texts.map(() => []);
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: texts,
      encoding_format: 'float',
    });

    return response.data.map((item) => item.embedding);
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return texts.map(() => []);
  }
}

/**
 * Create searchable text from command/workflow/server metadata
 */
export function createSearchableText(item: {
  name: string;
  description: string;
  tags?: string[];
  category?: string;
}): string {
  const parts = [
    item.name,
    item.description,
    item.category,
    ...(item.tags || []),
  ].filter(Boolean);

  return parts.join(' ');
}
