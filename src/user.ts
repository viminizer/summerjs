import { Injectable } from "./decorators/injectable.js";
import { Logger } from "./logger.js";

@Injectable()
export class User {
  private readonly logger;

  constructor(logger: Logger) { this.logger = logger }

  print() {
    console.log("\nUSER PRINTED")
    this.logger.log();
  }

}


