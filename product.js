const mongoose = require('mongoose');



// schema
const productSchema = mongoose.Schema({
    name: {
         type: String,
         required: [true, 'please provide a name for product'],
         unique: [true, 'name must be unique'],
         trim: true,
         minLength: [3, ' name must be three characters or more'],
         maxLength: [30, 'Name can not be more than 15']
    },
    description: {
         type: String,
         required: [true, 'product must have a description']
    },
    price: {
         type: Number,
         required: [true, 'product must have a price'],
         min: [0, "price can not be negative"]
    },
    unit: {
         type: String,
         required: true,
         enum: {
              values: ["kg", "ltr", "pcs"],
              message: "unit value can not be {VALUE}, must be kg/ltr/pcs"
         }
    },
    quantity: {
         type: Number,
         required: true,
         min: [0, 'quantity can not be negative'],
         validate: {
              validator: (value) => {
                   const isInteger = Number.isInteger(value)
                   if (isInteger) {
                        return true
                   } else {
                        return false
                   }
              }
         },
         message: "Quantity must be a Integer"
    },
    status: {
         type: String,
         required: true,
         enum: {
              values: ['in-stock', 'out-of-stock', 'discontinued'],
              message: "status can not be {VALUE}"
         }
    },
    // createdAt:{
    //      type:Date,
    //      default:Date.now()
    // },
    // updatedAt:{
    //      type:Date,
    //      default:Date.now()
    // }
    // supplier:{
    //      type:mongoose.Schema.Types.ObjectId,
    //      ref:"Supplier"
    // },
    // catagories:[{
    //      name:{
    //           type:String,
    //           required:true,
    //      },
    //      _id:mongoose.Schema.Types.ObjectId
    // }]
}, {
    timestamps: true,
})


// mongoose middleware
productSchema.pre("save", function (next) {
    console.log('before saving the data')
    if (this.quantity === 0) {
         this.status = 'out-of-stock'
    }
    next()
})
productSchema.post('save', function (doc, next) {
    console.log('after saving the data')
    next()
})


productSchema.methods.logger = function () {
    console.log(`successfully inserted the ${this.name}`)
}



// model
const Product = mongoose.model('Product', productSchema)


module.exports = Product