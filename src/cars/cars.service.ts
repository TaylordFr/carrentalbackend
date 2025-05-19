import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarsService {
  constructor(private db: PrismaService){}


  async create(createCarDto: CreateCarDto) {
      const newCar = await this.db.car.create({
        data: createCarDto
      })

      return newCar;
  }

  async findAll() {
    const allCars = await this.db.car.findMany();

    return {
      data: allCars
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
