#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const quizApi = "https://opentdb.com/api.php?amount=6&category=18&type=multiple";
const fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
const data = await fetchData(quizApi);
const startQuiz = async () => {
    let score = 0;
    let user = await inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "What is Your Name? "
        }
    ]);
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt([
            {
                name: "quiz",
                type: "list",
                message: data[i].question,
                choices: answers.map((val) => val)
            }
        ]);
        if (ans.quiz === data[i].correct_answer) {
            ++score;
            console.log(chalk.green.bold.italic("Correct"));
        }
        else {
            console.log(`correct answer is ${chalk.red.
                bold.italic(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.blue.bold(user.username)}, 
    Your Score is ${chalk.green.bold(score)} out of ${chalk.green.bold("5")}`);
};
startQuiz();
