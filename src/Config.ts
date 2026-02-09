export const Config = {
  AI: {
    URL: process.env.IA_URL ?? "http://localhost:11434/api/generate",
    MODEL: process.env.IA_MODEL ?? "qwen2.5:7b",
  },
  API: {
    HOST: process.env.HOST ?? "http://localhost",
    PORT: process.env.PORT ?? 3000,
  }
  
}
