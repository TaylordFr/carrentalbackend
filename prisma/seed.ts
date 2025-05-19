import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()


async function main() {
  prisma.rental.deleteMany();

  for (let i = 0; i < 15; i++) {
    const newRental = await prisma.rental.create({
      data: {
        car_id: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
        end_date: faker.date.between({ from: Date.now(), to: '2030-01-01' }),
        start_date: faker.date.between({ from: '2000-01-01', to: Date.now() })
      }
    })

    console.log(newRental);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
