import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./user";
import { UserCreationParams, UserService } from "./userService";

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UserService().get(userId, name);
  }

  @SuccessResponse("201", "Created") //Custom success Response
  @Post()
  public async createuser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); //set return status 201
    new UserService().create(requestBody);
    return;
  }
}
