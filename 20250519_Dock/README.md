# Nuxt Minimal Starter


このプロジェクトは Google Cloud Run で稼働させる Nuxt.js アプリケーションです。
Dockerfile でコンテナ化し、8080 ポートで起動します。

詳しくは [Nuxt ドキュメント](https://nuxt.com/docs/getting-started/introduction) を参照してください。

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production


## Google Cloud Run でのデプロイ

### Dockerイメージのビルド

```bash
docker build -t nuxt-cloudrun-app .
```

### ローカルでの動作確認

```bash
docker run -p 8080:8080 nuxt-cloudrun-app
```

### Cloud Run へのデプロイ例

```bash
gcloud run deploy nuxt-cloudrun-app \
  --source . \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

詳細は [Nuxtデプロイメントガイド](https://nuxt.com/docs/getting-started/deployment) も参照してください。
