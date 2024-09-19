import OpenAI from 'openai';
import {OPENAI_KEY} from "./constants"

const openai = new OpenAI({
  //apiKey: process.env[OPENAI_KEY],
 apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true, 
});

export default openai;  
