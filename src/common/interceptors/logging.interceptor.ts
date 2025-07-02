import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
  /**
   * ExecutionContext: Abstract Wrapper for the context of request, allow to get request, response, handler, etc.
   * CallHandler: Object represent the next handler flow
   */
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log('Before - Incoming request...')

    const now = Date.now()

    return next
      .handle() // Call controller method return Observable
      .pipe(    // Controller return data as Observable
        tap(() => console.log(`Request processed in ${Date.now() - now}ms`))
      )
  }
}