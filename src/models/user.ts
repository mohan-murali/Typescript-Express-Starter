import { model, Schema } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  date?: Date;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model<User>("User", userSchema);
