import { Router } from 'express'

function controller(req, res) {
  res.send({ message: 'hello' })
}

const router = Router()
// equivalent to: /api/item
// because we're mounting on there in the server.js file.
router
  .route('/')
  .get(controller)
  .post(controller)

// Equivalent to '/api/item/id' because mounted on /api/item
router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
// Export default means that when you import this in another file, you can
// just rename the object whatever you want
