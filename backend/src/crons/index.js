import tokenCleaner from "./tokenCleaner.js";

const cron = () => {
  tokenCleaner();
}

export default cron;