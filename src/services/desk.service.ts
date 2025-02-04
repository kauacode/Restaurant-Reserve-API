import DeskModel from "../database/models/DeskModel";
import { deskSchemas } from "../validations/validationSchemas";

class DeskService {
  async createDesk(name: string, capacity: number) {
    const validatedBody = deskSchemas.create.parse({ name, capacity });

    return await DeskModel.create({
      name: validatedBody.name,
      capacity: validatedBody.capacity,
      status: "Disponivel"
    });
  }

  async getAllDesks() {
    return await DeskModel.findAll();
  }

  async updateDesk(id: number, updateData: { name?: string; capacity?: number }) {
    const desk = await DeskModel.findOne({ where: { id: id } });

    if (desk) {
      const updates: Partial<{ name: string, capacity: number }> = {};
      if (updateData.name) updates.name = updateData.name;
      if (updateData.capacity) updates.capacity = updateData.capacity;

      await desk.update(updates);
      return desk;
    }
  }

  async removeDesk(id: number) {
    const parsedParams = deskSchemas.updateParams.parse({ id });
    const desk = await DeskModel.findOne({ where: { id: parsedParams } });
    if (desk) {
      await desk.destroy();
      return desk;
    }
  }
}

export default new DeskService();