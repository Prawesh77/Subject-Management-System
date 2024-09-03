import dotenv from "dotenv";
dotenv.config();

//server port no.
export const PORT_SERVER = +process.env.PORT_SERVER!;

//database
export class dB_Env {
  static HOST = process.env.HOST;
  static PORT_DB = process.env.PORT_DB;
  static USERNAME = process.env.USERNAME_DB;
  static PASSWORD = process.env.PASSWORD;
  static DATABASE = process.env.DATABASE;
}