const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
    },
    name: {
      type: String,
      required: [true, "Please add your contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please add your phone number"],
    },
  },
  {
    timestamps: true, // This adds "createdAt" and "updatedAt" fields
  }
);

module.exports = mongoose.model('Contact', contactSchema);
