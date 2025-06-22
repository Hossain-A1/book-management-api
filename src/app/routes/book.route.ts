import express from "express"
import { handleCreateBook, handleDeleteBook, handleGetBook, handleGetsBooks, handleUpdateBook } from "../controllers/book.controller"

const book_router = express.Router()

book_router.post('/',handleCreateBook)
book_router.put('/:bookId',handleUpdateBook)
book_router.delete('/:bookId',handleDeleteBook)
book_router.get('/:bookId',handleGetBook)
book_router.get('/',handleGetsBooks)


export default book_router