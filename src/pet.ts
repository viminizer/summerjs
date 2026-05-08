import { Injectable } from "./decorators/injectable.js";
import { User } from "./user.js";

@Injectable()
export class Pet {
  constructor(user: () => User) { }

  print() {
    console.log("\nPet PRINTED")
  }
}
