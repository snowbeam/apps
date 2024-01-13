/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class AuthPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    return value;
  }
}
