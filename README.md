<a id="top"></a>

<!-- PROJECT SHIELDS -->
![Contributors](https://img.shields.io/github/contributors/kbluescode/cloud-secret-env-js.svg?style=for-the-badge)
![Forks](https://img.shields.io/github/forks/kbluescode/cloud-secret-env-js.svg?style=for-the-badge)
![Stargazers](https://img.shields.io/github/stars/kbluescode/cloud-secret-env-js.svg?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/kbluescode/cloud-secret-env-js.svg?style=for-the-badge)
![MIT License](https://img.shields.io/github/license/kbluescode/cloud-secret-env-js.svg?style=for-the-badge)


<!-- PROJECT LOGO -->
# Cloud Secret Env JS
NodeJS port of [CloudSecretEnv](https://github.com/thinkific/cloud-secret-env) the RubyGem!

[**Explore the docs**](https://github.com/kbluescode/cloud-secret-env-js)

[View Demo](https://github.com/kbluescode/cloud-secret-env-js) | [Report Bug](https://github.com/kbluescode/cloud-secret-env-js/issues) | [Request Feature](https://github.com/kbluescode/cloud-secret-env-js/issues)

## Table of Contents
[About the Project](#about)  
[Getting Started](#start)  
[Usage](#usage)  
[Roadmap](#roadmap)  
[Contributing](#contribute)  
[License](#license)  
[Contact](#contact)  


<a id="about"></a>
## About the Project

### Built With
- [Nodejs](https://nodejs.org/)
- [AWS SecretsManager](https://aws.amazon.com/secrets-manager/)

[Back to top](#top)

<a id="start"></a>
## Getting Started

### Prerequisites
- NodeJS + npm
- To retrieve secrets, an AWS account with the correct KMS + SecretsManager permissions

### Installation

To add to a project, run 
```
npm install @kbluescode/cloud-secret-env
```

[Back to top](#top)

<a id="usage"></a>
## Usage
CloudSecretEnv is meant to plug into your application's boot process. After it runs, the process' environment variables will be set from 

1. Import CloudSecretEnv into your project
2. Create a new CloudSecretEnv object
3. Configure the object
4. Call run() with `async/await` or `.then()`

### Example
```javascript
import CloudSecretEnv from 'cloud-secret-env-js'

const cse = new CloudSecretEnv();

cse.configure({
  // override: true,            // optional: false if not given. When true, overwrites existing ENV vars if a match is found
  profile: 'aws-profile-name',  // optional: falls back on default profile
  provider: PROVIDERS['aws'],   // required: anything not in PROVIDERS object will fail
  region: 'us-east-1',          // required: AWS region for your account
  secretIds: [                  // required: array of Secret names (can be AWS ARNs or human-friendly names)
    'main/secret-1',
    'main/secret-2'
  ]
});

// cse.run() will throw an Error if the Config is invalid or we couldn't retrieve the secrets correctly

// async/await
try {
  await cse.run();
  console.log('done!');
} catch(err) {
  console.log(err);
}

// promise
cse.run()
  .then(() => console.log('done!'))
  .catch((err) => console.log(err))

// after cse.run() completes, your process.env will be populated from your secrets!
```
[Back to top](#top)

<a id="roadmap"></a>
## Roadmap

TBD

See the [open issues](https://github.com/kbluescode/cloud-secret-env-js/issues) for a full list of proposed features (and known issues).

[Back to top](#top)

<a id="contribute"></a>
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion to improve things, please fork the repo and create a pull request. You can also open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

[Back to top](#top)

<a id="license"></a>
## License

Distributed under the MIT License. See [LICENSE](https://github.com/kbluescode/cloud-secret-env-js/blob/main/LICENSE) for more information.

[Back to top](#top)

<a id="contact"></a>
## Contact


Kevin Blues - \<kbluescode\> - kbluescode@gmail.com

Project Link: https://github.com/kbluescode/cloud-secret-env-js



[Back to top](#top)
