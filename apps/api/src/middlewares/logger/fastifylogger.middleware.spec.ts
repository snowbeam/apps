import { FastifyLoggerMiddleware } from './fastifylogger.middleware';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new FastifyLoggerMiddleware()).toBeDefined();
  });
});
