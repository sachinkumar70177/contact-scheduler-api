const express=require("express");
const { ContactModel } = require("../model/user.contactmodel");
const contactRouter=express.Router()

contactRouter.post("/create",async (req,res)=>{
const {name,email,phone,label}=req.body;
try {
    const newcontact=new ContactModel({
        name,email,phone,label,booked_slots:[]
    })
    await newcontact.save()
    res.status(201).json({message:"contact is added to the list"})
} catch (error) {
   res.status(400).json({message:error.message}) 
}
})

contactRouter.get("/",async(req,res)=>{
const {q}=req.query;
try {
    const contacts=await ContactModel.find({name:{$regex:new RegExp(q,'i')}})
    res.status(200).json(contacts)
} catch (error) {
    res.status(400).json({message:error.message})
}
})

contactRouter.put("/edit/:id",async(req,res)=>{
    const {name,email,phone,label}=req.body;
try {
    const updatedContacts=await ContactModel.findByIdAndUpdate(req.params.id,{
        name,email,phone,label
    },{
        new:true
    })
    if(!updatedContacts){
        return res.status(404).json({message:"contact not found "})

    }
    res.status(200).json(updatedContacts)
} catch (error) {
    res.status(400).json({message:error.message})
}
})


contactRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const deletecontact=await ContactModel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"contact-deleted"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})




module.exports={
    contactRouter
}