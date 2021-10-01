const express=require('express');
const router=express.Router();
const {protect}=require('../controllers/user.controller');
const {Distroy,get,create}=require('../controllers/todo.controller')
router.post('/',protect,create)
router.get('/',protect,get)
router.delete('/:id',protect,Distroy);

module.exports =router
