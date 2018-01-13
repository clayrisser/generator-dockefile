import Generator from 'yeoman-generator';
import moment from 'moment';
import optionOrPrompt from 'yeoman-option-or-prompt';
import path from 'path';
import {
  copy,
  guessEmail,
  guessUsername,
  guessName,
  guessAuthorName,
  isEmpty
} from './lib';

export default class extends Generator {
  initializing() {
    if (this.options.destination) this.destinationRoot(this.options.destination);
    this.context = {
      moment
    };
    this.optionOrPrompt = optionOrPrompt;
  }

  async prompting() {
    const { name } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: guessName()
      }
    ]);
    const {
      description,
      version,
      license
    } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:',
        default: `Docker image for ${name}`
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: 'MIT'
      }
    ]);
    const {
      authorName,
      authorEmail
    } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author Name:',
        default: guessAuthorName()
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email:',
        default: guessEmail()
      }
    ]);
    const { githubUsername } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub Username:',
        default: guessUsername(authorEmail)
      }
    ]);
    const { authorUrl } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:',
        default: `https://${githubUsername}.com`
      }
    ]);
    const {
      imageName,
      port,
      homepage,
      repository,
      template,
      install
    } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage:',
        default: `https://hub.docker.com/r/${githubUsername}/${name}`
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Repository:',
        default: `https://github.com/${githubUsername}/docker-${name}`
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: ['tini', 'supervisord', 'php'],
        default: 'tini'
      },
      {
        type: 'input',
        name: 'imageName',
        message: 'Image Name',
        default: `${githubUsername}/${name}`
      },
      {
        type: 'input',
        name: 'port',
        message: 'Port',
        default: '8080'
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install Dependencies',
        default: true
      }
    ]);
    this.answers = {
      authorEmail,
      authorName,
      authorUrl,
      description,
      githubUsername,
      homepage,
      imageName,
      install,
      license,
      name,
      port,
      repository,
      template,
      version
    };
    this.context = { ...this.context, ...this.answers };
  }

  configuring() {
    if (!this.options.destination && !isEmpty()) {
      this.destinationRoot(path.resolve(this.answers.name));
    }
  }

  default() {}

  writing() {
    return copy(this);
  }

  conflicts() {}

  install() {
    const install = this.options.install ? this.options.install[0].toLowerCase() : 'y';
    if (!this.answers.install || install === 'n' || install === 'f') return false;
    return true;
  }

  end() {}
}
