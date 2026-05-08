import { SummerContainer } from "./core/container.js";
import { User } from "./user.js";


const container = new SummerContainer()
container.register(User);

const user = container.resolve(User)

user?.print()

