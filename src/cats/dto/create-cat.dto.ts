import { z } from 'zod';
import { IsString, IsInt } from 'class-validator';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
// export type CreateCatDto = z.infer<typeof createCatSchema>;
// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }

export const updateCatSchema = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string(),
});
export type UpdateCatDto = z.infer<typeof updateCatSchema>;
// export class UpdateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }

export class ListAllEntities {
  limit: number;
}
