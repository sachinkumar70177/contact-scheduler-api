const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,required:true},
    label:{type:String,required:true},
    booked_slots:[{
        type:Date
    }]
},{
    versionKey:false
})
const ContactModel=mongoose.model("contact",userSchema)

module.exports={
    ContactModel
}