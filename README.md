# d-ui

アニメーション・インタラクション重視の React コンポーネントライブラリ。shadcn/ui CLI で簡単に導入できます。

## 使い方

shadcn/ui CLI を使ってプロジェクトに追加できます。

```bash
npx shadcn add https://d-ui.daigo-suhara.com/registry/<component-name>.json
```

例:

```bash
npx shadcn add https://d-ui.daigo-suhara.com/registry/table-of-contents.json
```

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 でプレビューを確認できます。

### コンポーネントの追加

```bash
npm run add-component
```

### Cloudflare へのデプロイ

```bash
npm run deploy
```

## 技術スタック

- [Next.js](https://nextjs.org) 16
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [shadcn/ui](https://ui.shadcn.com) (registry 互換)
- [Cloudflare Workers](https://workers.cloudflare.com) (via OpenNext)
