import { SummerContainer } from "./core/container.js";
import { Injectable } from "./decorators/injectable.js";

class Test {

}

@Injectable({ scope: "TRANSIENT", lazy: true })
class Logger {
  constructor(private tst: Test) { }
  log() {
    console.log("LOGGER PRINTED")
  }
}

@Injectable()
class User {
  private readonly logger;
  constructor(logger: Logger) { this.logger = logger }

  print() {
    console.log("\nUSER PRINTED")
    this.logger.log();
  }

}

@Injectable()
class Pet {
  private logger;
  constructor(logger: Logger) { this.logger = logger }

  print() {
    console.log("\nPet PRINTED")
    this.logger.log();
  }
}

const container = new SummerContainer()
container.register(User);
container.register(Pet);
const user = container.resolve(User)
const pet = container.resolve(Pet)

pet?.print()
user?.print()
