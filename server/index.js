const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const applicationRouter = require('./application');
const open = require('open')
const app = express();

const PORT = 8083
const openUrl = true;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/applications', applicationRouter);
app.use(express.static(path.join(__dirname, '..', 'app', 'dist', 'app')));
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'app', 'dist', 'app', 'index.html')) });
app.use((err, req, res, next) => { if(err) res.status(500).send({ success: false, message: err.message }) });

app.listen(PORT, () => {
  console.log(`Application started on http://localhost:${PORT}/ and already accept connections`);
  if(openUrl) setTimeout( async () => { await open(`http://localhost:${PORT}/`); }, 2000);
});