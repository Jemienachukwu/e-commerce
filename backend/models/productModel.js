import mongoose from 'mongoose'
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    Comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: string,
      required: true,
    },
    description: {
      type: string,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: number,
      required: true,
      default: 0,
    },
    price: {
      type: number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('User', productSchema)

export default Product
