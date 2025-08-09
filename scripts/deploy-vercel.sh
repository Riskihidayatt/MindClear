#!/bin/bash
# Auto setup environment variables for Vercel deployment

echo "🔧 Setting up Vercel Environment Variables..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "🔐 Checking Vercel authentication..."
vercel whoami || vercel login

# Add environment variables
echo "📝 Adding environment variables..."

echo "Enter your Gemini API Key:"
read -s GEMINI_API_KEY

vercel env add VITE_GEMINI_API_KEY production <<< "$GEMINI_API_KEY"
vercel env add VITE_GEMINI_API_KEY preview <<< "$GEMINI_API_KEY"
vercel env add VITE_GEMINI_API_KEY development <<< "$GEMINI_API_KEY"

vercel env add VITE_APP_NAME production <<< "MindClear+"
vercel env add VITE_APP_NAME preview <<< "MindClear+"
vercel env add VITE_APP_NAME development <<< "MindClear+"

vercel env add NODE_ENV production <<< "production"

echo "✅ Environment variables setup complete!"
echo "🚀 Deploying to Vercel..."

# Deploy
vercel --prod

echo "🎉 Deployment complete!"
