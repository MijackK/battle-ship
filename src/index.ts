import "./index.css";
import board from "./factories/board";
import {
  player,
  computerPlayer,
  Player,
  ComputerPlayer,
} from "./factories/player";
import { ship } from "./factories/ship";

let playerOne: undefined | Player | ComputerPlayer;
let PlayerTwo: undefined | Player | ComputerPlayer;
