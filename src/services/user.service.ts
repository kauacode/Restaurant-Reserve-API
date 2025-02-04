import UserModel from "../database/models/UserModel";
import { hash } from "bcryptjs"

class UserService {
  async registeredUser(email: string) {
    return await UserModel.findOne({ where: { email: email } });
  }

  async createNewUser(name: string, email: string, password: string, role: string) {
    const hashedPassword = await hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }
}

export default new UserService();