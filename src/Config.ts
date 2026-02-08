export const Config = {
  AI: {
    URL: process.env.OLLAMA_URL ?? "http://localhost:11434/api/generate",
    MODEL: process.env.OLLAMA_MODEL ?? "qwen2.5:7b",
  },
  API: {
    HOST: process.env.HOST ?? "http://localhost",
    PORT: process.env.PORTA ?? 3000,
  }
  
}
