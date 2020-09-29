# Custom Form with Login and MDD

This is a custom form built with Google Apps Script and Vue Material. The form has a simple login system to validate users, so only registrared users can use the form. And the form has a multiple dependent drowndowns feature which can be configured in the spreadsheet.

### Demo App

[Original](https://script.google.com/macros/s/AKfycbzDLLfWbJVME8-vgTjnfgFfHdG0bgMTBZcMDcYcTxUISCKCT2J2/exec)
[Netlify](https://mdd-form.netlify.app/)

### Script

[Standalone Script](https://script.google.com/d/1FKXPUXoZZgLDtoE2DPV8_BeKW7-hLdYFgQ9gdn2kl1eu3tWihJSaB78T/edit?usp=sharing)
[Spreadsheet as database](https://docs.google.com/spreadsheets/d/183JylbkMxNpPqii21ljh3VPlDl-By2T6wTv4p8CGRTM/copy)

### Configurage

Link the database to the script after you make copies of the script file and spreadsheet file to your Google Drive.

```javascript
const SPREADSHEET_ID = "183JylbkMxNpPqii21ljh3VPlDl-By2T6wTv4p8CGRTM"; // the google spreadsheet id as the database for the app
```

### Screenshots

Users login credentials
![image](https://user-images.githubusercontent.com/16481229/94567186-c39e8900-029d-11eb-8eb9-ef8c2fe35846.png)

Relationships of the multiple dropdowns
![image](https://user-images.githubusercontent.com/16481229/94566110-8dacd500-029c-11eb-9437-088f91ab6c8b.png)

Form login
![image](https://user-images.githubusercontent.com/16481229/94566319-c8af0880-029c-11eb-95f9-5399fe5c7831.png)

Form with MDD
![image](https://user-images.githubusercontent.com/16481229/94567380-fea0bc80-029d-11eb-8670-60311d3d4e3e.png)
