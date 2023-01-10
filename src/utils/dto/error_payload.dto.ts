import { ApiProperty } from '@nestjs/swagger';

export class ErrorPayloadDto {
  @ApiProperty() code: number;
  @ApiProperty() msg: string;
  @ApiProperty({ example: false }) status: boolean;
  @ApiProperty({ example: [] }) errors: object;

  constructor({ code = 500, status = false, msg = '', errors = [] }) {
    this.code = code;
    this.status = status;
    this.msg = msg;
    this.errors = errors;
  }
}
