import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { updateRestauratDto } from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Query(returns => [Restaurant])
    restaurants(): Promise<Restaurant[]> {
        return this.restaurantService.getAll();
    }
    @Mutation(returns => Boolean)
    async createRestaurant(
        @Args('input') createRestaurantDto: CreateRestaurantDto,
    ): Promise<boolean> {
        console.log(createRestaurantDto);
        try {
            await this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    @Mutation(returns => Boolean)
    async updateRestaurat(
        @Args('input') updateRestauratDto: updateRestauratDto,
    ) :Promise<boolean>{
        try {
            await this.restaurantService.updateRestaurant(updateRestauratDto);
            return true
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}