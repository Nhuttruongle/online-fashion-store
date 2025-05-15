import mongoose from 'mongoose'
const { Schema, model } = mongoose

// Tạo schema cho Sản phẩm
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Loại bỏ khoảng trắng đầu/cuối
      text: true // Tạo text index để tìm kiếm nhanh :contentReference[oaicite:0]{index=0}
    },
    description: {
      type: String,
      default: '', // Nếu không truyền, để chuỗi rỗng
      trim: true,
      text: true // Tạo text index cho mô tả :contentReference[oaicite:1]{index=1}
    },
    price: {
      type: Number,
      required: true,
      min: 0 // Giá không thể âm :contentReference[oaicite:2]{index=2}
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0 // nếu không truyền sẽ là 0
    },
    image: [
      {
        type: String,
        trim: true // Mỗi phần tử là URL chuỗi, trim khoảng trắng
      }
    ],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    slug: {
      type: String,
      // required: true,
      lowercase: true, // Chuyển về chữ thường
      trim: true
      // unique: true // Bắt buộc duy nhất để làm URL-friendly :contentReference[oaicite:3]{index=3}
    },
    destroy: {
      type: Boolean,
      default: false // Soft-delete mặc định là false
    },
    origin: {
      type: String,
      required: true, // Quốc gia hoặc nơi sản xuất chính của sản phẩm
      default: 'Việt Nam'
    },
    sizes: {
      type: [String],
      required: true // Kích cỡ (ví dụ: ["S", "M", "L"])
    },
    colors: {
      type: [String],
      required: true // Màu sắc (ví dụ: ["Red", "Blue", "Black"])
    }
  },
  {
    // Tự động thêm createdAt & updatedAt
    timestamps: true
  }
)

// Tạo Model
export const ProductModel = model('Product', productSchema)
