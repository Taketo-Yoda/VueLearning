# Google Cloud Run 用 Nuxt.js Dockerfile
FROM node:20-alpine

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係コピー
COPY package*.json ./

# 依存関係インストール
RUN npm install

# アプリケーションの全ファイルをコピー
COPY . .

# 本番ビルド
RUN npm run build

# ポート番号（Cloud Run のデフォルト）
ENV PORT=8080

# サーバ起動
CMD ["npm", "run", "start"]
