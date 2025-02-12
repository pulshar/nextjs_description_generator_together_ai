# Product Description Generator

This is an ecommerce demo that allows you to upload a product image and get detailed descriptions for it in different languages. Powered by [Together AI](https://together.ai) and [Llama 3.2 Vision](https://www.together.ai/blog/llama-3-2-vision-stack).

## Tech stack

- [Llama 3.2 Vision](https://www.together.ai/blog/llama-3-2-vision-stack) from Meta for the Vision model
- [Together AI](https://together.ai) for LLM inference
- [Cloudinary](https://cloudinary.com) for image storage
- Next.js app router with Tailwind


## Cloning & running

1. Clone the repo: `git clone https://github.com/pulshar/nextjs_description_generator_together_ai`
2. Create a `.env` file and add your [Together AI API key](https://togetherai.link/llama3.2vision/?utm_source=example-app): `TOGETHER_API_KEY=`
3. Create a cloudinary free account and add the credentials to your `.env` file. All required values are in the `.env.example` file.
4. Run `npm install` and `npm run dev` to install dependencies and run locally