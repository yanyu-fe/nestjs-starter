import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

export type BusinessError = {
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(err: BusinessError | string, code = BUSINESS_ERROR_CODE.COMMON) {
    if (typeof err === 'string') {
      err = {
        code,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }
}
