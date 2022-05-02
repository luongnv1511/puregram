<!-- inspired by prisma.io & telegraf docs -->

<div align='center'>
  <img src='https://i.imgur.com/ZzjmE8i.png' />
</div>

<br />

<p align='center'>
  powerful and epic overall,
  <code>puregram</code>
  allows you to
  <b>easily interact</b>
  with
  <a href='https://core.telegram.org/bots/api'>Telegram Bot API</a>
  via
  <a href='https://nodejs.org'>Node.js</a>
  😎👍
</p>

<div align='center'>
  <a href='https://github.com/nitreojs/puregram/tree/lord/docs/examples'><b>examples</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href='#typescript-usage'><b>typescript usage</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href='https://t.me/puregram'><b>telegram channel</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href='#faq'><b>faq</b></a>
</div>

## introduction

**first, what are telegram bots?** [telegram][telegram] has their own [bot accounts][telegram/bots]. **bots** are special telegram accounts that can be only accessed via code and were designed to handle messages, inline queries and callback queries automatically. _users can interact with bots by sending them messages, commands and inline requests._

[telegram]: https://t.me
[telegram/bots]: https://core.telegram.org/bots

### example

```js
const { Telegram } = require('puregram')

const telegram = Telegram.fromToken(process.env.TOKEN)

telegram.updates.on('message', context => context.reply('hey!'))
telegram.updates.on('callback_query', context => context.answerCallbackQuery())

telegram.updates.startPolling()
```

you can find more examples [here][examples]

[examples]: https://github.com/nitreojs/puregram/tree/lord/docs/examples

---

## table of contents

- [why `puregram`?](#why-puregram) _(very important!)_
- [**getting started**](#getting-started)
  - [getting token](#getting-token)
  - [installation](#installation)
  - [usage](#usage)
  - [calling api methods](#calling-api-methods)
  - [sending media (`MediaSource`)](#sending-media)
  - [using markdown (`parse_mode`)](#using-markdown)
  - [keyboards (`reply_markup`)](#keyboards)
- [bot information](#bot-information)
- [what are contexts?](#what-are-contexts)
- [`Context` and its varieties](#context-and-its-varieties)
- [middlewares](#middlewares)
- [**typescript usage**](#typescript-usage)
- [**faq**](#faq)

---

## why `puregram`?

- written **by [starków](https://github.com/nitreojs)** ⚠
- very **cool** package name
- package itself is **cool** _(at least i think so)_
- **works** _(i guess)_
- i **understand** only about **30%** of my **code**
- because **why not**?

---

## getting started

### getting token

if you want to develop a bot, firstly you need to [create it][telegram/bots/botfather] via [@botfather][botfather] and get token from it via `/newbot` command.

[telegram/bots/botfather]: https://core.telegram.org/bots#6-botfather
[botfather]: https://t.me/botfather

token looks like this: `123456:abc-def1234ghikl-zyx57w2v1u123ew11`

### installation

```sh
$ yarn add puregram
$ npm i -S puregram
```

### usage

#### initializing `Telegram` instance

let's start with creating a `Telegram` instance:

```js
const { Telegram } = require('puregram')

const bot = new Telegram({
  token: '123456:abc-def1234ghikl-zyx57w2v1u123ew11'
})
```

You can also initialize it via `Telegram.fromToken`:

```js
const bot = Telegram.fromToken('123456:abc-def1234ghikl-zyx57w2v1u123ew11')
```

now, we want to [get updates][getting-updates] from the bot. **how can we do it?**

#### getting updates

there are only **two ways** of getting updates right now:

1. polling via [`getUpdates` method][getUpdates]... or just using `puregram`'s built-in polling logic:

```js
telegram.updates.startPolling()
```

2. setting up a Webhook via [`setWebhook` method][setWebhook]:

```js
const { createServer } = require('http')

// you need to send this request only once
telegram.api.setWebhook({
  url: 'https://www.example.com/'
})

const server = createServer(telegram.updates.getWebhookMiddleware())

server.listen(8443, () => console.log('Started'))
```

remember that there are only four accepted ports for now: `443`, `80`, `88` and `8443`. they are listed [here][setWebhook] under the **Notes** section.

more webhook examples are available [here][webhook-examples]

[getting-updates]: https://core.telegram.org/bots/api#getting-updates
[getUpdates]: https://core.telegram.org/bots/api#getupdates
[setWebhook]: https://core.telegram.org/bots/api#setwebhook
[webhook-examples]: https://github.com/nitreojs/puregram/tree/lord/docs/examples/webhook

#### handling updates

now with this setup we can catch updates like this:

```js
telegram.updates.on('message', context => context.reply('yoo!'))
```

_list of supported updates will be somewhere here when it's done_

#### manual updates handling

if you want to handle updates by yourself, you can use `Updates.handleUpdate` method, which takes one argument and this argument is raw Telegram update:

```js
/** let's pretend i'm polling updates manually... */

const update = await getUpdate(...)

let context

try {
  context = await telegram.updates.handleUpdate(update)
} catch (error) {
  console.log('update is not supported', update)
}

// voila! now you have the right context
// (or you don't if the event is not supported 😢)
```

### calling api methods

there are **three ways** of calling Telegram Bot API methods:

1. using the `telegram.api.call(method, params?)` _(useful when new Bot API update is released and the package is not updated yet)_:

```js
const me = await telegram.api.call('getMe')
```

2. using `telegram.api.method(params?)`:

```js
const me = await telegram.api.getMe()
```

3. using context methods:

```js
telegram.updates.on('message', context => context.send('13² = 169! i mean "169", not "169!'))
```

### sending media

`puregram` allows you to send your local media by using `MediaSource` class.
you can put URLs, `Buffer`s, streams and paths in it.

```js
/** let's imagine we have an image called puppy.jpg in this directory... */

const { createReadStream } = require('fs')

const path = './puppy.jpg'
const stream = createReadStream(path)
const buffer = getBuffer(path)
const url = 'https://puppies.com/random-puppy'

telegram.updates.on('message', (context) => {
  await Promise.all([
    context.sendPhoto(MediaSource.url(path), { caption: 'puppy via path!' })
    context.sendDocument(MediaSource.stream(stream, /* filename: */ 'puppy.jpg'), { caption: 'more puppies via stream!' })
    context.sendPhoto(MediaSource.buffer(buffer), { caption: 'one more puppy via buffer!' })
    context.sendPhoto(MediaSource.url(url), { caption: 'some random puppy sent using an URL!!!' })
  ])
})
```

this works for every method that can send media.

---

### using markdown

if you want to use _markdown_ or _html_, there are **two ways** of doing that:

1. using built-in `HTML`, `Markdown` and `MarkdownV2` classes:

```js
const message = HTML.bold('very bold, such html')
```

3. writing tags manually as it is told [here][formatting-options]:

```js
const message = '*very bold, such markdown*'
```

[formatting-options]: https://core.telegram.org/bots/api#formatting-options

anyways, after writing the text you **need** to add `parse_mode` field. there are also **two ways** of doing that _¯\\\_(ツ)\_/¯_:

3. writing actual parse mode code _like a boss_:

```js
{ parse_mode: 'markdown' }
```

7. passing parse mode class _like a cheems_:

```js
{ parse_mode: HTML }
```

final api request will look like this:

```js
const message = `some ${HTML.bold('bold')} and ${HTML.italic('italic')} here`

context.send(message, { parse_mode: HTML })
```

```js
context.send(`imagine using _classes_ for parse mode, *lol*!`, { parse_mode: 'markdown' })
```

<details>
  <summary><i>the truth...</i></summary>
  <br />
  <img src="https://i.imgur.com/x6EFfCH.png" />
</details>

more markdown examples are available [here][markdown]

[markdown]: https://github.com/nitreojs/puregram/tree/lord/docs/examples/markdown

---

### keyboards

`puregram` has built-in classes for creating basic, inline, force-reply etc. keyboards. they are pretty much easy to use and are definitely more comfortable than building a json.

#### `InlineKeyboard`, `Keyboard` and so on

to create a keyboard, you need to call `keyboard` method from the keyboard class you chose. this method accepts an array of button rows.

```js
const { InlineKeyboard, Keyboard } = require('puregram')

const keyboard = InlineKeyboard.keyboard([
  [ // first row
    InlineKeyboard.textButton({ // first row, first button
      text: 'some text here',
      payload: 'such payload'
    }),

    InlineKeyboard.textButton({ // first row, second button
      text: 'some more text here',
      payload: { json: true }
    })
  ],

  [ // second row
    InlineKeyboard.urlButton({ // second row, first button
      text: 'some url button',
      url: 'https://example.com'
    })
  ]
])
```

```js
// one-row keyboard with two buttons, no brackets for rows needed
const keyboard = Keyboard.keyboard([
  Keyboard.textButton('some one-row keyboard'),
  Keyboard.textButton('with some buttons')
])
```

#### keyboard builders

there are also keyboard **builders** which are designed to be building a keyboard step by step:

```js
const { KeyboardBuilder } = require('puregram')

const keyboard = new KeyboardBuilder()
  .textButton('first row, first button')
  .row()
  .textButton('second row, first button')
  .textButton('second row, second button')
  .resize() // keyboard will be much smaller
```

#### sending keyboards

to send keyboard, you simply need to pass the generated value in `reply_markup` field:

```js
context.send('look, here\'s a keyboard!', { reply_markup: keyboard })
```

more keyboard examples are available [here][keyboards]

[keyboards]: https://github.com/nitreojs/puregram/tree/lord/docs/examples/keyboards

---

## bot information

if you are using `puregram`'s built-in polling logic, after `Updates.startPolling()` is called you have access to `Telegram.bot` property:

```js
telegram.updates.startPolling().then(
  () => console.log(`@${telegram.bot.username} started polling!`)
)
```

---

## what are contexts?

`Context` is a class, containing current `update` object and it's payload _(via `update[updateType]`)_. it is loaded with a ton of useful _(maybe?)_ getters and methods that were made to shorten your code while being same efficient and executing the same code.

```js
telegram.updates.on('message', (context) => {
  const id = context.senderId
  // is the same as
  const id = context.from?.id
})
```

```js
telegram.updates.on('message', (context) => {
  context.send('hey!')
  // equals to
  telegram.api.sendMessage({
    chat_id: context.chat?.id,
    text: 'hey!'
  })
})
```

every context has `telegram` property, so you can call api methods almost everywhere if you have a context nearby.

```js
telegram.updates.on('message', async (context) => {
  const me = await context.telegram.api.getMe()
})
```

---

## `Context` and its varieties

every update in `puregram` is handled by a special context, which is detected via the update key.

every context _(except for manually created ones and some that were created after methods like `sendMessage`)_ will have `updateId` and `update` properties.

| property   | required | description                                                                   |
| ---------- | -------- | ----------------------------------------------------------------------------- |
| `updateId` | _no_     | unique update id. used as an offset when getting new updates                  |
| `update`   | _no_     | update object. current context was created via `this.update[this.updateType]` |

for example, if we have the `message` update, we will get `MessageContext` on this update, `CallbackQueryContext` for `callback_query` update and so on.

every context requires **one argument**:

```ts
interface ContextOptions {
  // main Telegram instance
  telegram: Telegram

  // update type, e.g. 'message', 'callback_query'
  updateType: UpdateName
  
  // whole update object
  // optional, allows user to do the `context.update` to get the whole update object
  update?: TelegramUpdate

  // update id, located at TelegramUpdate
  // optional, allows user to get this update's id
  updateId?: number
}
```

you can also create any context manually:

```js
const { MessageContext } = require('puregram')

const update = await getUpdate()

const context = new MessageContext({
  telegram,
  update,
  updateType: 'message',
  updateId: update.update_id
})
```

every context is listed [here][contexts]

[contexts]: https://github.com/nitreojs/puregram/tree/lord/packages/puregram/src/contexts

---

## middlewares

`puregram` uses middlewares, so you can use them to expand your `context` variables or measure other middlewares.

- `next()` is used to call the next middleware on the chain and wait until it's done

measuring the time it takes to proceed the update:

```js
telegram.updates.use(async (context, next) => {
  const start = Date.now()

  await next() // next() is async, so we need to await it

  const end = Date.now()

  console.log(`${context.updateId ?? '[unknown]'} proceeded in ${end - start}ms`)
})
```

extending the context:

```js
telegram.updates.use(async (context, next) => {
  context.user = await getUser(context.senderId)

  return next()
})

telegram.updates.on('message', (context) => {
  // here we can access property we made in the middleware
  return context.send(`hey, ${context.user.name}!`)
})
```

---

## typescript usage

### importing Telegram interfaces

all Telegram interfaces and method types are auto-generated and put in different files: `telegram-interfaces.ts` for interfaces and `methods.ts` + `api-methods.ts` for api methods. they all exist at the paths `puregram/telegram-interfaces`, `puregram/methods` and `puregram/api-methods` respectively.
also there's a `puregram/generated` export which exports everything from `lib/generated` folder (all of those listed before).

```ts
import { TelegramUpdate, TelegramMessage } from 'puregram/generated'
```

```ts
import { SendDocumentParams } from 'puregram/generated'
```

```ts
import { CopyMessageParams } from 'puregram/methods'
import { InputFile, TelegramUpdate } from 'puregram/telegram-interfaces'
```

### extending contexts

surely enough, you can extend contexts with extra fields and properties you need by intersectioning base context with new properties.

```ts
interface ExtraData {
  name: string
  id?: number
}

/** ... */

telegram.updates.use(async (context, next) => {
  const user = await getUser(context.senderId)

  context.name = user.name
  context.id = user.id

  return next()
})

/**
 * there are 2 ways of updating context's type:
 * 1. external type override:
 * `(context: MessageContext & ExtraData) => ...`
 * 2. using generics:
 * `telegram.updates.on<ExtraData>(...)`
 * 
 * below I will be using the second way.
 */

telegram.updates.on<ExtraData>('message', (context) => {
  assert(context.name !== undefined)
})
```

---

## faq

### `TypeError: Cannot read property '__scene' of undefined`

you are trying to use [`@puregram/scenes`][@scenes] or [`@puregram/hear`][@hear] with [`@puregram/session`][@session], but you're the confusing middlewares order.

you should firstly initialize `@puregram/session`'s middleware and only then initialize other middlewares, depending on it:

```js
const sessionManager = new SessionManager()
const hearManager = new HearManager()

// 1. session middleware first
telegram.updates.on('message', sessionManager.middleware)

// 2. hear middleware second
telegram.updates.on('message', hearManager.middleware)
```

### how do i enable debugging?

if you want to inspect out- and ingoing requests made by `puregram`, you will need to enable `DEBUG` environment variable so the package understands you are ready for logs.

#### how to enable `DEBUG`

| type      | example (unix)           | description                                     |
| --------- | ------------------------ | ----------------------------------------------- |
| `api`     | `DEBUG=puregram:api`     | enables debugging api out- and ingoing requests |
| `updates` | `DEBUG=puregram:updates` | enables debugging ingoing updates               |
| `*`       | `DEBUG=puregram:*`       | enables debugging all of the listed types above |

##### cmd

```cmd
> set "DEBUG=puregram:*" & node index
```

##### powershell

```ps
> $env:DEBUG = "puregram:*"; node index
```

##### linux

```sh
$ DEBUG=puregram:* node index
```

### are there some chats?

yeah, there are.

| language       | link                                                |
| -------------- | --------------------------------------------------- |
| **russian 🇷🇺** | [puregram chat [ru]](https://t.me/puregram_chat_ru) |
| **english 🇬🇧** | [puregram chat [en]](https://t.me/puregram_chat_en) |

there is also a [puregram chats](https://t.me/puregram_chats) channel, which has list of every officially supported `puregram` chat.

### why is your readme lowercased?

because i dont like doing anything that looks in an adult way so i do my own styling :cool:

btw did you see these issues? https://github.com/nitreojs/puregram/issues/63 https://github.com/nitreojs/puregram/issues/62 they confirm im against anything that looks kinda too official

---

## community

these packages are created by the `puregram` community _(and not only)_ and are expanding packages functionality _(i guess)_.

### some official packages

- [`@puregram/hear`][@hear]: simple implementation of hear system
- [`@puregram/scenes`][@scenes]: simple implementation of middleware-based scene management
- [`@puregram/session`][@session]: simple implementation of sessions
- [`@puregram/utils`][@utils]: useful utilities
- [`@puregram/prompt`][@prompt]: basic prompt system implementation

[@hear]: https://github.com/nitreojs/puregram/tree/lord/packages/hear
[@scenes]: https://github.com/nitreojs/puregram/tree/lord/packages/scenes
[@session]: https://github.com/nitreojs/puregram/tree/lord/packages/session
[@utils]: https://github.com/nitreojs/puregram/tree/lord/packages/utils
[@prompt]: https://github.com/nitreojs/puregram/tree/lord/packages/prompt

### non-official ones

- [`nestjs-puregram`][nestjs-puregram]: `puregram` SDK for [NestJS](https://nestjs.com/)

[nestjs-puregram]: https://github.com/ItzNeviKat/nestjs-puregram

---

## thanks to

- [Negezor][negezor] ([negezor/vk-io][negezor/vk-io]) — for inspiration, package idea (!) and some code and implementation ideas

[negezor]: https://github.com/negezor
[negezor/vk-io]: https://github.com/negezor/vk-io
