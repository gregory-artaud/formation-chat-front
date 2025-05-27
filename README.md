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

## The main goal

From here, your main goal is to make the chat working with the backend.

The only file you need to modify is `src/hooks/contexts/websocket.context.tsx`.

The boilerplate for the websocket context is already there, you just need to implement the `send` and `subscribe` functions.
Which means you will first need to implement the websocket connection.

You might need to see how your implementation will be used, you can refer to `src/hooks/contexts/messages.context.tsx`.

### TL;DR

In `src/hooks/contexts/websocket.context.tsx`:

1. Implement the websocket connection
2. Implement the websocket send message
3. Implement the websocket subscribe

Your implementation will be used in `src/hooks/contexts/messages.context.tsx`.
