import { PrismaClient, userRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import config from "../../config";

const prisma = new PrismaClient();

const createAdminIntoDB = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    config.bcrypt_salt_rounds as string
  );

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: userRole.ADMIN,
      },
    });

    await tx.admin.create({
      data: payload.admin,
    });
  });
  return result;
};

export const UserService = {
  createAdminIntoDB,
};
