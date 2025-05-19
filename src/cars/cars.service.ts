import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async rent(id: number){
    const selectedCar = await this.db.car.findUnique({
      where: {
        id: id,
      }
    })
    if(!selectedCar){
      throw new HttpException("Car not found", HttpStatus.NOT_FOUND)
    }

    const now = new Date(Date.now());
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const alreadyRented = await this.db.rental.findFirst({
      where : {
          car_id: id,
          start_date: {
            lte: now
          },
          end_date: {
            gte: now
          }
      }
    })

    console.log(alreadyRented)

    if(alreadyRented){
      throw new HttpException("Car already rented", HttpStatus.CONFLICT)
    }

    const newRental = await this.db.rental.create({
      data: {
        start_date: now, 
        end_date: oneWeekLater,
        car_id: id
      }
    })

    return newRental;
  }
}
