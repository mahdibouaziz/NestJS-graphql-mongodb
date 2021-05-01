import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}
