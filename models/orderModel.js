// orderModel.js

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const AddressSchema = require("./common/AddressSchema");

const Schema = mongoose.Schema;

// schema design for products
const ProductSchema = new Schema({
  sku: {
    type: String,
  },
  shippingDetails: {
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    length: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  },
  images: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  discount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// schema design for orders
const OrderSchema = new Schema({
  shippingAddress: AddressSchema,
  billingAddress: AddressSchema,
  products: [
    {
      quantity: Number,
      product: ProductSchema,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "ordered",
  },
  deliveryType: String,
  isGift: Boolean,
  orderNo: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});
OrderSchema.plugin(AutoIncrement, { inc_field: "orderNo", start_seq: 10000 });

OrderSchema.virtual("products.product.rating", {
  type: "ObjectId",
  ref: "products",
  localField: "products.product._id",
  foreignField: "_id",
  justOne: true,
});

// create model from OrderSchema
const Order = mongoose.model("orders", OrderSchema);

// export model
module.exports = Order;
