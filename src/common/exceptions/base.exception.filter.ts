import { FastifyReply, FastifyRequest } from 'fastify';

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    request.log.error(exception);

    // 非 HTTP 标准异常的处理。
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      // timestamp: new Date().toISOString(),
      // path: request.url,
      msg: '服务器内部错误',
    });
  }
}
