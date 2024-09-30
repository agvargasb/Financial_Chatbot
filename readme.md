# fAInancial - Chatbot

Welcome to the fAInancial project! This repository is organized into two main directories:
chatbot - web

> This guide is under construction!

> You need a Google Gemini key and a Qdrant cluster (you can use the free tier).

> The downloading of the SEC filings and posterior uploading to a Qdrant cluster is done with Google Colab.

> For more details go to the readme files in the subdirectories.

## chatbot

In this directory, you'll find three services that correspond to the chatbot functionality. To get started with these services, follow these steps:

1. Open your terminal and navigate to the `chatbot` directory.

   ```bash
   $ cd chatbot
   ```

2. Run the following command to start the services, ensuring they are built:

   ```bash

   $ cd chatbot
   $ docker-compose up --build
   ```

Be patient, this may take some time to run as it needs to download the embedding models.  Please stop and restart the container when finished.

This command will initiate the chatbot services, allowing you to interact with the chatbot functionality.

## Web

This directory contains three services inside two docker-compose files (in this directories: users_API and web) that are related to the web functionality of the fAInancial project. To launch these services, follow the steps below:

## users_API

Navigate to the users_API directory in your terminal.

Run the following command to start two containers - one for PostgreSQL database and another for the Node.js API:

    ```bash

    $ cd users_API
    $ docker-compose up --build
    ```
    api will be running on http://localhost:3000

## web_ui

Open a new terminal window and navigate to the web_ui directory.

Run the following command to start a container for the React app:

    ```bash

    $ cd web_ui
    $ docker-compose up --build
    ```
If web doesn't start automatically try opening your browser.

web will be running on http://localhost:3001

These steps will launch the web functionality, enabling you to explore the features of the fAInancial project.

### If you don't want to test signup functionality:

Admin user if you don't want to signup to utilize the chatbot :
email = admin@fainancial.com
password = 123456

### If you want to test signup functionality:

After initiating all the services, please provide a valid email address to utilize the chatbot. A confirmation email will be dispatched to your provided email address, and you will be required to activate your account in order to engage with the chatbot.

For detailed information about each service, please refer to the readme.md files located in each respective directory.

