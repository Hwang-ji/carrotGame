"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishPopup = new PopUp();

const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(30)
  .withBugCount(30)
  .build();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLAY?";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WON 😀";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST 🥲";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishPopup.showWithText(message);
});

gameFinishPopup.setClickListener(() => {
  game.start();
});
