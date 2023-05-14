import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const saltRounds = 10;

async function main() {
	await prisma.user.deleteMany();
	await prisma.post.deleteMany();
	await prisma.label.deleteMany();

	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john@gmail.com',
			passwordHash: await bcrypt.hashSync('1234', saltRounds)
		}
	});

	for (let i = 0; i < 5; i++) {
		await prisma.label.create({
			data: {
				name: faker.lorem.word()
			}
		});
	}

	const labelIds = await prisma.label.findMany({ select: { id: true } });

	for (let i = 0; i < 10; i++) {
		await prisma.post.create({
			data: {
				title: faker.lorem.sentence(),
				introduction: faker.lorem.paragraph(),
				content: faker.lorem.paragraphs(5, '<br/>\n'),
				published: faker.datatype.boolean(),
				labels: { connect: [...labelIds.map(({ id }) => ({ id }))] }
			}
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
