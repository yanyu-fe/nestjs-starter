import { HttpException, HttpStatus } from '@nestjs/common';

export type JWTError = {
  code: number;
  message: string;
};

export class JWTException extends HttpException {
  constructor(
    err: JWTError | string,
    code: HttpStatus = HttpStatus.UNAUTHORIZED,
  ) {
    if (typeof err === 'string') {
      err = {
        code,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }

  static expire() {
    throw new JWTException('token 过期');
  }
}
