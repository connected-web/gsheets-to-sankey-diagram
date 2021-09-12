# gsheets-to-sankey-diagram

Convert data published in a google spreadsheet into a sankey diagram.

## TODO

- Connect the JSON data to the sankey diagram
- Publish to a static website with instructions on how to fork
- See if a static website can dynamically fetch google sheet data and render a sankey diagram without a build pipeline

## Done

- Initialise project
- Get the raw data from google sheets using javascript
- Draw a sankey diagram using HTML in the web browser

## Notes

### Getting the Data

- Run `node src/downloadDataFromGSheet.js` to download data from Google Sheets
- The ID of the sheet to download is hardcoded into `src/downloadDataFromGSheet.js`
- `secure-credentials.json` is required to interact with the Google Sheets API
- Copy `secure-credentials-examples.json`, to `secure-credentials.json` and populate the missing fields by setting up secure credentials in Google's Developer API
- If the spreadsheet you're trying to access is private, then you will need to share the spreadsheet with the `client_email` specified in the credentials
  - e.g. `gsheets-to-sankey-diagram@connected-web.iam.gserviceaccount.com`

### Drawing the Diagram

- Run `node start` to start the local webserver
- Open `http://localhost:8080/template/sankey-diagram.html` to view the interactive sankey diagram in a web browser