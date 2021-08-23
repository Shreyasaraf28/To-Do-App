import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { Todo } from '../../models/todo'

const router = express.Router()

router.get('/api/todo', async (req: Request, res: Response) => {
  const todo = await Todo.find({})
  return res.status(200).send(todo)
})

router.post('/api/todo', async (req: Request, res: Response) => {
  const { title, description, location } = req.body;
  const todo = Todo.build({ title, description, location })
  todo.save()
  return res.status(201).send(todo)
})

/*I have written the Delete and Patch methods and added the location field field*/
router.delete('/api/todo/:id', async (req: Request, res: Response) => {
 
  const todo = await Todo.findByIdAndRemove(req.params.id);
  return res.status(200).send(todo)
})

router.patch('/api/todo/:id', async (req: Request, res: Response) => {
 
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).send(todo)
})
export { router as todoRouter }