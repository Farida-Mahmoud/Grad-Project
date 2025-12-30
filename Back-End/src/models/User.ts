import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  email: string;
  isVerified: boolean;
  verificationCode?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  age?: number;
  location?: string;
  password?: string;
  confirmpassword?: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    age: { type: Number },
    location: { type: String },
    password: { type: String },
    confirmpassword: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
