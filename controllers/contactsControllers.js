
const asyncHandler =require('express-async-handler');
const contactsModel = require('../models/contactsModel');

const getContacts=asyncHandler(async(req,res)=>{
    const contacts =await contactsModel.find({user_id:req.user.id});
    res.status(200).json(contacts)
})
const createdContact=asyncHandler(async(req,res)=>{
    console.log('this is the request body',req.body);
    
    const {name,email,phone}=req.body;
    const existingContact = await contactsModel.findOne({ email })
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are required')
    }
    if (existingContact) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    const contact=await contactsModel.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(200).json(contact)
})


const getContact=asyncHandler(async(req,res)=>{
    const contact=await contactsModel.findById(req.params.id)
    if(!contact){
      res.status(404);
      throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})


const putContact=asyncHandler(async(req,res)=>{
    const contact=await contactsModel.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
      }
    if(contact.user_id.toString() !== req.user.id){
      res.status(403)
      throw new Error ("User don't hav permission to update others contact")
    }
    const updatedContact = await contactsModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json(updatedContact)
})


const deleteContact = asyncHandler(async (req, res) => {
    try {
      const contactId=await contactsModel.findById(req.params.id)
      if(contactId.user_id.toString() !== req.user.id){
        throw new Error('use should be your user deleted')
      }
      const contact = await contactsModel.findByIdAndRemove(req.params.id);
  
      if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
      }
      res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports={getContacts,createdContact,getContact,putContact,deleteContact}