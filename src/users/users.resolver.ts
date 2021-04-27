import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountInput, CreateAccountOyutput } from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UserProfileInput } from './dto/user-profile.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOyutput)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOyutput> {
        try {
            return this.usersService.createAccount(createAccountInput);
        } catch (e) {
            return {
                error: e,
                ok: false,
            };
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            const { ok, error, token } = await this.usersService.login(loginInput);
            return { ok, error, token };
        } catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }

    @Query(retruns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser;
    }

    @UseGuards(AuthGuard)
    @Query(returns => User)
    userProfile(@Args() userProfileInput: UserProfileInput) {
        return this.usersService.findById(userProfileInput.userId);
    }

}