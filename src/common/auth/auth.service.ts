import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async encrypt(payload: { sub: string; [key: string]: any }) {
    return this.jwtService.sign(payload);
  }
}
