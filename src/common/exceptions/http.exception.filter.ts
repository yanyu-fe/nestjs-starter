import { FastifyReply } from 'fastify';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  BusinessError,
  BusinessException,
} from '@/common/exceptions/business.exception';
import { JWTError, JWTException } from '@/common/exceptions/jwt.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    // const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    if (exception instanceof JWTException) {
      const res: JWTError = exception.getResponse() as JWTError;
      response.status(res.code).send({
        code: res.code,
        msg: res.message,
      });
      return;
    }

    if (exception instanceof BusinessException) {
      const res: BusinessError = exception.getResponse() as BusinessError;
      response.status(HttpStatus.OK).send({
        code: res.code,
        msg: res.message,
      });
      return;
    }

    response.status(status).send({
      code: status,
      // timestamp: new Date().toISOString(),
      // path: request.url,
      msg: exception.getResponse(),
    });
  }
}
