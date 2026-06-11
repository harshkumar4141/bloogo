const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  },
);


const Blog = model("Blog", blogSchema);

module.exports = Blog;