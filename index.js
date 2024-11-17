import inquirer from "inquirer";
import fs from 'fs';
inquirer

const questions = [
    {
      type: "input",
      message: "What would you like to make your title?",
      name: "TitleText",
    },
    {
        type: "input",
        message: "What would you like to make your description? (Include images using markdown syntax ![alt text](image_url)) ",
        name: "DescriptionText",
      },
      {
        type: "input",
        message: "Enter the first item for your Table of Contents.",
        name: "TableOfContents1",
    },
    {
        type: "input",
        message: "Enter the second item for your Table of Contents.",
        name: "TableOfContents2",
    },
    {
        type: "input",
        message: "Enter the third item for your Table of Contents.",
        name: "TableOfContents3",
    },
      {
        type: "input",
        message: "Provide step by step instructions for installation.",
        name: "Instructions",
      },
      {
        type: "input",
        message: "Provide instructions and examples for use.",
        name: "Usage",
      },
      {
        type: "input",
        message: "If there are any collaborators include them here.",
        name: "Collaborators",
      },
      {
        type: "input",
        message: "Add your License",
        name: "License",
      },
      {
        type: "input",
        message: "Add your badges",
        name: "Badges",
      },
      {
        type: "input",
        message: "List your projects features here",
        name: "Features",
      },
      {
        type: "input",
        message: "Tell people how they can contribute",
        name: "Contribution",
      },
      {
        type: "input",
        message: "Add tests for your application",
        name: "Tests",
      },
    ]

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Write to file Complete');
      }
    });
  }

  inquirer.prompt(questions).then((answers) => {
    let data = `## ${answers.TitleText}\n\n` +
               `## Description\n${answers.DescriptionText}\n\n` +
               `## Table of Contents\n\n`;
    if (answers.TableOfContents1) {
        data += `1. [#${answers.TableOfContents1.toLowerCase().replace(/\s+/g,'-')}]\n`;
    }
    if (answers.TableOfContents2) {
        data += `2. [#${answers.TableOfContents2.toLowerCase().replace(/\s+/g,'-')}]\n`;
    }
    if (answers.TableOfContents3) {
        data += `3. [#${answers.TableOfContents3.toLowerCase().replace(/\s+/g,'-')}]\n`;
    }
    if (answers.TableOfContents1 || answers.TableOfContents2 || answers.TableOfContents3) {
        data += '\n';
    }
    if (answers.Instructions) {
        data += `## Instructions\n${answers.Instructions}\n\n`;
    }
    if (answers.Usage) {
        data += `## Usage\n${answers.Usage}\n\n`;
    }
    if (answers.Collaborators) {
        data += `## Collaborators\n${answers.Collaborators}\n\n`;
    }
    if (answers.License) {
        data += `## License\n${answers.License}\n\n`;
    }
    if (answers.Badges) {
        data += `## Badges\n${answers.Badges}\n\n`;
    }
    if (answers.Features) {
        data += `## Features\n${answers.Features}\n\n`;
    }
    if (answers.Contribution) {
        data += `## Contribution\n${answers.Contribution}\n\n`;
    }
    if (answers.Tests) {
        data += `## Test\n${answers.Tests}\n\n`;
    }

    writeToFile('README.md', data);
  });
