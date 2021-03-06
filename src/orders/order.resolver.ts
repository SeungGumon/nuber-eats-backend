import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {Order} from "./entities/order.entity";
import {OrderService} from "./orders.service";
import {CreateOrderInput, CreateOrderOutput} from "./dtos/create-order.dto";
import {AuthUser} from "../auth/auth-user.decorator";
import {User} from "../users/entities/user.entity";
import {Role} from "../auth/role.decorator";


@Resolver(() => Order)
export class OrderResolver {
    constructor(private readonly ordersService: OrderService) {
    }


    @Mutation(() => CreateOrderOutput)
    @Role(['Client'])
    async createOrder(@AuthUser() customer: User, @Args("input")createOrderInput: CreateOrderInput): Promise<CreateOrderOutput> {
        return {
            ok: true
        }
    }
}