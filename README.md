# Memo App ( next.js / Laravel )

フロントに next.js、バックに Laravel を使ったメモ投稿アプリ。

## Requirement
インフラは Docker を使用。
* front
  * Node.js: 17.0.10 (FROM node:14-17-alpine)
  * TypeScript: 4.5.5
  * React.js: 17.0.2
  * Next.js: 12.0.8
  * TailwindCSS: ^3.0.15
* back
  * PHP: 8.0.15
  * Laravel: 8.75
* server
  * nginx (FROM nginx:1.19-alpine)
* database
  * mysql (FROM mysql:8.0)

## Installation
### Docker Setup
1. cd ~/projectRoot/ 
2. docker compose build --no-cache --force-rm 
3. docker compose up -d

### Frontend Setup
1. docker compose exec front yarn
2. docker compose exec front yarn dev

### Backend Setup
1. docker compose exec api composer install
2. docker-compose exec api php artisan key:generate
3. docker-compose exec api php artisan migrate --seed

### Migration / Seeder
1. docker-compose exec api php artisan migrate 
2. docker-compose exec api php artisan db:seed

### Others
#### Next.js
* Axios
  * docker-compose exec front yarn add axios

#### Laravel
* sanctum
  * docker-compose exec api php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

## Usage
1. http://localhost:3000 にアクセス
2. テスト用アカウントでログイン
   1. Email: test@example.com
   2. Password: password
3. 後は画面に従っていい感じにメモをしてください。
