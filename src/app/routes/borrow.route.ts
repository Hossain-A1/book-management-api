import express from "express"
import { handleBorrowBook, handleBorrowedBooksSummary } from "../controllers/borrow.controller"


const borrow_router = express.Router()

borrow_router.post('/',handleBorrowBook)
borrow_router.get('/',handleBorrowedBooksSummary)


export default borrow_router