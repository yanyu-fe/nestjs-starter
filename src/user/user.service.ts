import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async findOne(email: string) {
    // return this.usersService.findOne(email);
  }
}
