import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserService.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
