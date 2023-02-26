import * as dotenv from "dotenv";
import twitterClient from "./twitterClient.js";
import fetch from "node-fetch";
import cron from "cron";

dotenv.config();

const url = 'https://dad-jokes.p.rapidapi.com/random/joke';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
  }
};

async function getJoke(){
    try {
        const result = await fetch(url, options);
        const json = await result.json();
        const body = json.body[0];
        const { setup, punchline } = body;
        return { setup, punchline };
    } catch (error) {
        console.error(error)
    }
}

async function tweetJoke(setup, punchline){
    try {
        await twitterClient.v2.tweet(`${setup}\n${punchline}`);
    } catch (error) {
        console.error(error)
    }
}


const job = new cron.CronJob("0 0 10 * * *", async() => {
    const { setup, punchline } = await getJoke();
    await tweetJoke(setup, punchline);
})

job.start();
 
