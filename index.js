// Create constants for node package
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Store all information into a single function for dry code - Run asynchronously
async function readMe() {

    // Add a starting note to the console
    console.log("starting");
    
    // array of questions for user
    const questions = await inquirer
        .prompt ([
            {
                type: "input",
                message: "What is your GitHub user name?",
                name: "username"
            },
            {
                type: "input",
                message: "What is your Project Title?",
                name: "projTitle"
            },
            {
                type: "input",
                message: "Can you provide some details on the project?",
                name: "projDesc"
            },
            {
                type: "input",
                message: "How is the project installed? Please go over the installation process.",
                name: "installProcess"
            },
            {
                type: "input",
                message: "Can you provide instructions on how to use this app?",
                name: "instructions"
            },
            {
                type: "input",
                message: "What is a good example of when to use this app?",
                name: "whenToUse"
            },
            {
                type: "input",
                message: "Please provide a license name.",
                name: "licenseName"
            },
            {
                type: "input",
                message: "Please provide a license URL.",
                name: "licenseURL"
            },
            {
                type: "input",
                message: "Please provide the names of any contributor to the project.",
                name: "gitContributor"
            },
            {
                type: "input",
                message: "Last, provide some examples on how to run testing.",
                name: "testing"
            },

    ]); 
    
    // Log out the users response.
    console.log(questions);

    // Constants for all data points
    const gitUsername = questions.username;
    const projectTitle = questions.projTitle;
    const projectDescription = questions.projDesc;
    const installation = questions.installProcess;
    const projectInstructions = questions.instructions;
    const projectExample = questions.whenToUse;
    const license = questions.licenseName;
    const licenseURL = questions.licenseURL;
    const contributorNames = questions.gitContributor;
    const tests = questions.testing;

    // Get the data from github
    const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
    console.log(gitResponse);


    
};

readMe();

// function to write README file
// function writeToFile(fileName, data) {
// }

// function to initialize program
// function init() {

// }

// function call to initialize program
// init();
