const {createTokenForUser} = require("../services/authentication");
const { createHmac, randomBytes } = require("crypto");

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function () {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password){
    const user = await this.findOne({email});
    if(!user) return new Error("User not found");
    
    const salt = user.salt;
    const hasedPassword = user.password;

    const inputPasswordHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(inputPasswordHash !== hasedPassword) throw new Error("Invalid password");
    
    const token = createTokenForUser(user);
    return token;
})

const user = model("user", userSchema);
module.exports = user;
