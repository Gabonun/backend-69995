import { Command } from "commander";
const program = new Command(); 

program
    .option("-p <port>", "Puerto del servidor", 8080)
    .option("--mode <mode>", "Ambiente de trabajo", "desarrollo")
program.parse(); 

export default program; 