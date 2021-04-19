# Getting Started with 3 Page Website App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You need to have node js and npm installed in your machine for runnig this app. Go to [node js website](https://nodejs.org/en/) and download & install the stable version if not already installed in the machine.

After downloading the repository from git to local machine, navigate to the app folder in cmd and run

### `npm install`

For installing any additional dependency

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## Language Chart

### Description
After starting the app a page containing input box, search button and with pre loaded chart of 30 data points will open in the localhost path. After entering input in the fields and clicking submit you can fetch new data and the chart will be plotted for the same.

### Resources - Stack Exchange API
Using [Stack Exchange API](https://api.stackexchange.com/docs/tags) for fetching data for plotting the graph.


## Copy to Clipboard

### Description
After starting the app a page containing single input box and copy button will open in the localhost path. After entering input in the field and clicking copy the text in the input field will be copied to clipboard. Also if you enter any url with 'q' property in the search params(Ex: http://localhost:3000?q=A1B2C3) the value of q will be extracted and shown separately which can be copied to clipboard using the copy button beside the show element.
