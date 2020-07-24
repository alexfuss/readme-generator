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
    const licenseUrl = questions.licenseURL;
    const contributorNames = questions.gitContributor;
    const tests = questions.testing;

    // Get the data from github
    const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
    console.log(gitResponse);

    // Organize and declare the data being pulled from GitHub
    const gitData = gitResponse.data;
    const gitName = gitData.login;
    const gitEmail = gitData.email;
    const gitlocation = gitData.locaiton;
    const gitUrl = gitData.html_url;
    const gitProfileImg = gitData.avatar_url;

    // Pull the contributor name list in an Array
    const contributorNameArray = contributorNames.split(",");
    console.log(contributorNameArray);

    // Loop through the entire Contributor Array
    var resultContArray;
    for (i = 0; i < contributorNameArray.length; i++) {
        let gitUserCont = contributorNameArray[i]
        const secondGitResponse = await axios.get(`https://api.github.com/users/${gitUserCont}`);
        let contImg = secondGitResponse.data.avatar_url;
        let contUrl = secondGitResponse.data.html_url;
        let contEmail = secondGitResponse.data.email;

        // Add the Contributors to the page
        var resultContArray = resultContArray + (`
        \n <img src="${contImg}" alt="drawing" width="150" display="inline"/> ${contEmail}  GitHubLink: ${contUrl}`);
    }

    // Create the blueprint of the ReadMe file - Template literals
    let finalReadMe = (`
            # ${projectTitle} 
            ${projectDescription}
            \n* [Installation](#Installation)
            \n* [Instructions](#Instructions)
            \n* [License](#License)
            \n* [Contributors](#Contributors)
            \n* [Author](#Author)
            \n* [Tests](#Tests)
            ## Installation
            ${installation}
            ## Instructions
            ${projectInstructions}
            \`\`\`
            ${projectExample}
            \`\`\`
            ## License 
            This project is licensed under the ${license} - see the ${licenseUrl} file for details
            ## Contributors
            ${resultContArray}
            ## Tests
            ${tests}
            ## Author 
            \n![ProfileImage](${gitProfileImg})
            \n**${gitName}**
            \nEmail: ${gitEmail}
            \nLocation:${gitlocation}
            \nGitHub: ${gitUrl}
            `
    )

    // Write the file using the path package
    let writeFile = fs.writeFileSync(path.join(__dirname,'../readme-generator', 'readMe.md'), finalReadMe)
    console.log("File generated.")

};

readMe();

