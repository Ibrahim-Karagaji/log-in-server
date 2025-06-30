const sendGrid = require("@sendgrid/mail");

sendGrid.setApiKey(process.env.SEND_GRID_KEY);

module.exports = sendGrid;
