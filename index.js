import inquirer from "inquirer";
import fs from 'fs';


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
        name: "instructions",
      },
      {
        type: "input",
        message: "Provide instructions and examples for use.",
        name: "usage",
      },
      {
        type: "input",
        message: "If there are any collaborators include them here.",
        name: "collaborators",
      },
      {
        type: "list",
        message: "Choose your License",
        name: "license",
        choices: ["MIT License","Apache 2.0",
          "GNU General Public License (GPL)v3",
          "Mozilla Public License 2.0",
          "BSD3-Clause License"]
      },
      {
        type: "input",
        message: "Add your badges",
        name: "badges",
      },
      {
        type: "input",
        message: "List your projects features here",
        name: "features",
      },
      {
        type: "input",
        message: "Tell people how they can contribute",
        name: "contribution",
      },
      {
        type: "input",
        message: "Add tests for your application",
        name: "tests",
      },
      {
        type: "input",
        message: "Add your preferred method of contact",
        name: "contact",
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

  function renderLicenseSection(license) {
    switch (license) {
        case 'MIT License':
            return `## License\nThis project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.`;
        case 'Apache 2.0':
            return `## License\nThis project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.`;
        case 'GNU General Public License (GPL)v3':
            return `## License\nThis project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.`;
        case 'Mozilla Public License 2.0':
              return `## License\nThis project is licensed under the Mozilla Public License 2.0. See the [LICENSE](LICENSE) file for details.`;
        case 'BSD3-Clause License':
                return `## License\nThis project is licensed under the BSD 3-Clause License. See the [LICENSE](LICENSE) file for details.`;
        default:
            return `## License\nThis project is not licensed under any specific license.`;
    }
}

  function renderLicenseBadge(license) {
  if (license) {
    const formattedLicense = license.replace(/ /g, '%20');
    return `![License](https://img.shields.io/badge/license-${formattedLicense}-blue.svg)`;
  }
  return '';
}

  function init() {
  inquirer.prompt(questions).then((answers) => {
    const badge = renderLicenseBadge(answers.license);
    let data = `## ${answers.TitleText} ${badge} \n\n` +
               `## Description\n${answers.DescriptionText}\n\n` +
               `## Table of Contents\n\n`;
    if (answers.TableOfContents1) {
        data += `1. [${answers.TableOfContents1}](#${answers.TableOfContents1.toLowerCase().replace(/\s+/g,'-')})\n`;
    }
    if (answers.TableOfContents2) {
        data += `2. [${answers.TableOfContents2}](#${answers.TableOfContents2.toLowerCase().replace(/\s+/g,'-')})\n`;
    }
    if (answers.TableOfContents3) {
        data += `3. [${answers.TableOfContents3}](#${answers.TableOfContents3.toLowerCase().replace(/\s+/g,'-')})\n`;
    }
    if (answers.TableOfContents1 || answers.TableOfContents2 || answers.TableOfContents3) {
        data += '\n';
    }
    if (answers.instructions) {
        data += `## Instructions\n${answers.instructions}\n\n`;
    }
    if (answers.usage) {
        data += `## Usage\n${answers.usage}\n\n`;
    }
    if (answers.collaborators) {
        data += `## Collaborators\n${answers.collaborators}\n\n`;
    }
    const licenseSelection = renderLicenseSection(answers.license);
    if (answers.license) {
      data += `## License\n\n${licenseSelection}\n\n`;
    }
    if (answers.features) {
        data += `## Features\n${answers.features}\n\n`;
    }
    if (answers.contribution) {
        data += `## Contribution\n${answers.contribution}\n\n`;
    }
    if (answers.tests) {
        data += `## Tests\n${answers.tests}\n\n`;
    }
    if (answers.contact) {
      data+= `## Questions \n If you have questions please reach out to me at ${answers.contact}\n\n`;
    }

    writeToFile('README.md', data);
  });
  }
  init();
  
