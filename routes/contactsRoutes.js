const express=require('express')
const router=express.Router();
const {getContacts,createdContact,deleteContact,putContact, getContact}=require('../controllers/contactsControllers');
const validateToken = require('../middleware/validateTokenHandler');
router.use(validateToken)
router.route('/').get(getContacts)
router.route('/').post(createdContact)
router.route('/:id').get(getContact)
router.route('/:id').put(putContact)
router.route('/:id').delete(deleteContact)
module.exports=router;
