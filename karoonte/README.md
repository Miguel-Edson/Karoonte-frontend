# Karoonte 🎮

> O clássico Kahoot, mas no mundo físico.

Este repositório contém o **Front-end** do projeto Karoonte, uma aplicação desenvolvida para interagir com um sistema embarcado que utiliza "controles" físicos para simular a experiência de um quiz interativo.

## 📖 Sobre o Projeto

O Karoonte foi desenvolvido como trabalho prático para a disciplina de **Sistemas em Tempo Real (STR)**. O objetivo principal é aplicar os conceitos vistos em sala de aula na integração de um sistema embarcado (hardware) com uma interface de usuário moderna e responsiva (software), garantindo a comunicação e a sincronização em tempo real das respostas dos jogadores.

## 🛠️ Tecnologias Utilizadas

A interface foi construída com foco em performance e componentização, utilizando:

* **[Next.js](https://nextjs.org/)** (App Router)
* **[React](https://reactjs.org/)**
* **[TypeScript](https://www.typescriptlang.org/)**
* **[Tailwind CSS](https://tailwindcss.com/)** para estilização

*(A comunicação com os microcontroladores/sistema embarcado é feita via MQTT)*

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
