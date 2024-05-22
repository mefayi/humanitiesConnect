# humanitiesConnect

**humanitiesConnect** is a tool for managing and monitoring Digital Humanities projects as well as other projects. It provides a live status checker for websites and allows the extension of data transfer through plugins that can utilize various data sources.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)
- [Author](#author)
- [Features](#features)

## Description

**humanitiesConnect** offers an overview of Digital Humanities projects and other projects with a live status checker for websites. The unique feature of this tool is the extensibility of data transfer through plugins that use the existing Electron IPCRenderer routes. This allows any possible data source to be used by writing an appropriate plugin.

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mefayi/humanitiesConnect.git
   ```

2. Navigate to the project directory:

   ```bash
   cd humanitiesConnect
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm run start
   ```

## Usage

**humanitiesConnect** features a user-friendly interface. After starting the application, you can:

- Add and manage projects.
- Check the live status of project websites.
- Install plugins to integrate data from various sources.

The application is used intuitively through its graphical user interface.

## Technologies

The project is based on the following technologies:

- [Electron.js](https://www.electronjs.org/)
- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)

No database is used; project data is stored in a JSON file.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

## Author

**Mehmet Fatih Yilmaz** (mefayi)

## Features

- **JSON Storage:** All project data is stored in a JSON file, simplifying data management.
- **Plugin Extensibility:** Data transfer can be extended by writing custom plugins that use the Electron IPCRenderer routes.
