import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// This is used to have subbranches of your app, so you can break up your
// routing into multiple files, and define separate middleware for each
// of your subroutes. E.g. for /users/, you might have different middleware
// than for /posts/, and so you break those up in different files.
// A router can't listen on a port (app() does that), but it can do exactly the
// same thing as app.get/app.post, etc. Everything related to routing.
const router = express.Router()

// app.get('/', (req, res) => {
//   res.send({ message: 'hello' })
// })
//
// app.post('/', (req, res) => {
//   console.log(req.body)
//   res.send({ message: 'OK' })
// })

// Here's some middleware: next is the next function in the middleware stack
// that is supposed to be run

router.get('/me', (req, res) => {
  res.send({ message: 'Suck it' })
})
// Now, need to register this router with our route router (i.e. the app), this
// is called mounting
app.use('/api', router)

// Means that you can only find stuff at /api/me, won't find it at /me. That's
// because the router is mounted on /api.

const log = (req, res, next) => {
  console.log('logging')
  // if you pass an arguemnt to next(), it'll be treated as an error which
  // you're passing along to the next function in the middleware to deal with
  next()
}

// Here we pass the middleware function log to app.get(), and the log function
// will be run immediately after this specific request comes in
app.get('/data', log, (req, res) => {
  res.send({ message: 'hello' })
})

// We could also do the following
// app.use(log)
// which would use the middleware for every request coming in that is below
// this line of code

// We could also do the following, passing in an array of middleware functions
// app.get('/data', [log, log, log], (req, res) => {
//   res.send({ message: 'hello' })
// })

// You can also pass data along from middleware to middleware, by attaching
// it to the request

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

// export const start = () => {
//   app.listen(3000, () => {
//     console.log('server is on 3000')
//   })
// }

// Abstracting out some of the code:
// Say you have a cat adoption API, these are the routes you need:
// routes = [
//   'get /cat',
//   'post /cat',
//   'get cat/:id',
//   'put cat/:id',
//   'delete cat/:id'
// ]
//
// // There are only two routes here, but multiple verbs. Can get very repetitive
// // to write app.get(route, middleware, etc). Cleaners way of doing it is:
//
// router
//   .route('/cat')
//   .get()
//   .post()
//
// router
//   .route('/cat/:id')
//   .get()
//   .put()
//   .delete()
