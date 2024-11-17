import inquirer from "inquirer";
import fs from 'fs';


function renderLicenseBadge(license) {
  if (license) {
    return `![License](https://img.shields.io/badge/license-${license}-blue.svg)`;
  }
  return '';
}
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
        type: "list",
        message: "Choose your License",
        name: "license",
        choices: ["MITLicense","Apache2.0",
          "GNUGeneralPublic License(GPL)v3",
          "MozillaPublicLicense 2.0",
          "BSD3-ClauseLicense"]
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

  function renderLicenseSection(license) {
    switch (license) {
        case 'MITLicense':
            return `## License\nThis project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.`;
        case 'Apache2.0':
            return `## License\nThis project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.`;
        case 'GNUGeneralPublicLicense(GPL) v3':
            return `## License\nThis project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.`;
        case 'MozillaPublicLicense2.0':
              return `## License\nThis project is licensed under the Mozilla Public License 2.0. See the [LICENSE](LICENSE) file for details.`;
        case 'BSD3-ClauseLicense':
                return `## License\nThis project is licensed under the BSD 3-Clause License. See the [LICENSE](LICENSE) file for details.`;
        default:
            return `## License\nThis project is not licensed under any specific license.`;
    }
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
    if (answers.Instructions) {
        data += `## Instructions\n${answers.Instructions}\n\n`;
    }
    if (answers.Usage) {
        data += `## Usage\n${answers.Usage}\n\n`;
    }
    if (answers.Collaborators) {
        data += `## Collaborators\n${answers.Collaborators}\n\n`;
    }
    const licenseSelection = renderLicenseSection(answers.license);
    if (answers.license) {
      data += `## License\n\n${licenseSelection}\n\n`;
    }
    if (answers.Features) {
        data += `## Features\n${answers.Features}\n\n`;
    }
    if (answers.Contribution) {
        data += `## Contribution\n${answers.Contribution}\n\n`;
    }
    if (answers.Tests) {
        data += `## Tests\n${answers.Tests}\n\n`;
    }

    writeToFile('README.md', data);
  });
  }
  init();
  
