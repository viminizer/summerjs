import { Injectable } from "./decorators/injectable.js";
import { Pet } from "./pet.js";

@Injectable()
export class Logger {
  constructor(pet: Pet) { }
  log() {
    console.log("LOGGER PRINTED")
  }
}
