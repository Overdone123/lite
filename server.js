const express = require("express");
const app = express();
app.use('/assets', express.static('assets'));

const fs = require('fs');

app.get('/', (req, res) => {
  res.redirect('/lite/#Home');
});
app.get('/lite/home.html', (req, res) => {
  res.redirect('/lite/#Home');
});
app.get('/lite/request.html', (req, res) => {
  res.redirect('/lite/#Request');
});
app.get('lite/apply.html', (req, res) => {
  res.redirect('/lite/#Apply');
});
app.get('/lite', (req, res) => {
  res.sendFile(`${__dirname}/resources/lite.html`);
});

app.get('/api/lite/pagerouter', (req, res) => {
  console.log(1)
  let { page } = req.query;
  if (!page) return res.json({ status: 'error', error: { code: 400, message: 'Query "page" not specified.' } });
  let path = `./pages/${page.toLowerCase()}.html`;
  if (!fs.existsSync(path)) return res.json({ status: 'error', error: { code: 404, message: 'Page not found!' } });
  let data = fs.readFileSync(path, 'utf8');
  console.log(data)
  res.json({ status: 'success', data: data });
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});