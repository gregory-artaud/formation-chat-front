# Real time chat training (frontend)

This repository is a minimal frontend implementation of a real time chat application.
It is meant to be used with [this minimal backend implementation](https://github.com/gregory-artaud/formation-chat-back).

If you are trying to implement this exercise on your own, you will need to run the backend yourself and use `localhost` in the "Setting up the `.env`" section.

Otherwise, ask me for my local ip if i didn't give it to you.

### Requirements

- `node22`
- `pnpm`

The specific versions i used while making this

- `node v22.11.0`
- `pnpm v9.15.3`

## Setting it up

Clone the repository

```sh
git clone git@github.com:gregory-artaud/formation-chat-front.git
```

Install the dependancies

```sh
pnpm install
```

Setting up the `.env`

```sh
echo 'VITE_API_BASE_URL=<your-backend-ip>' > .env
```

## Run it

```sh
pnpm run dev
```
