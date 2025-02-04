import ReserveModel from "../database/models/ReserveModel";
import DeskModel from "../database/models/DeskModel";

class ReserveService {
  async findAvailableDesk(deskId: number) {
    const desk = await DeskModel.findOne({ where: { id: deskId, status: "Disponivel" } });
    return desk;
  }

  async updateDeskStatus(desk: any, status: string) {
    await desk.update({ status });
  }

  async createReserveRecord(userId: number, deskId: number, reservationDate: string) {
    return await ReserveModel.create({
      userId,
      deskId,
      reservationDate: new Date(reservationDate)
    });
  }

  async findAllReserves(userId: string) {
    return await ReserveModel.findAll({ where: { userId: userId } });
  }

  async activeReservation(id: number, status: string) {
    return await ReserveModel.findOne({ where: { deskId: id, status: status } });
  }

  async findReservationForDate(deskId: number, reservationDate: string) {
    return await ReserveModel.findOne({ where: { deskId: deskId, reservationDate: new Date(reservationDate) } })
  }

  async reservedDesk(id: number, status: string) {
    return await ReserveModel.findOne({ where: { deskId: id, status: status } });
  }
}

export default new ReserveService();