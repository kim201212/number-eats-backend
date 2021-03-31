import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';


@InputType()
export class updateRestauratDtoInputType extends PartialType(CreateRestaurantDto) { }


@InputType()
export class updateRestauratDto{

    @Field(type => Number)
    id:number;

    @Field(type => updateRestauratDtoInputType)
    data: updateRestauratDtoInputType;
}