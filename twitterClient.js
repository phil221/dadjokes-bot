import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi(process.env.TWITTER_USER_TOKEN);

export default client;