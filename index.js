require('dotenv').config()
const Koa = require('koa')
const KoaRouter = require('koa-router')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const Cors = require('@koa/cors')
const Respond = require('koa-respond')

// Middlewares
const Middlewares = require('./middlewares')

/**
 * App Context
 * @typedef {import('koa').BaseContext & import('./repositories').ContextRepo} AppContext
 */

// initialiaze KOA
const app = new Koa()

;(async () => {
  // middleware for handling error
  app.use(Middlewares.middlewareErrorWrapper)

  app.use(Helmet())

  app.use(
    Cors({
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 1728000,
      optionsSuccessStatus: 200
    })
  )

  app.use(
    BodyParser({
      enableTypes: ['json'],
      jsonLimit: '5mb',
      strict: true,
      onerror: (_err, ctx) => {
        ctx.status = 422
        ctx.throw(_err.message, 422)
      }
    })
  )

  app.use(Respond())
  app.use(Middlewares.responseTime)

  // Declare Routes
  const router = new KoaRouter()

  await require('./repositories')(app.context)

  // route is manageable from routes directory
  router.use('/api', require('./routes/api').routes())
  router.use('', require('./routes/web').routes())

  // Router Middleware - that wrap rules to entire routing protocol
  app.use(router.routes()).use(router.allowedMethods())

  // error handling
  app.on('error', (err, ctx) => {
    ctx.status = 500
    ctx.body = {
      success: false,
      message: err.message ?? 'Something went wrong',
      validation: {},
      data: {}
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () =>
    console.log('Service started on port ' + port)
  )
})()
