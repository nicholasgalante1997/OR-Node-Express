const express = require('express');
const eHandleBars = require('express-handlebars');
const handlers = require('./lib/handlers');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', eHandleBars({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', handlers.home);

app.get('/about', handlers.about);

// custom 404
app.use(handlers.notFound);
// server error
app.use(handlers.serverError);

// O'Reilly gave kind of a shitty answer, however the takeaway here is that if you are running
// a javascript file directly with node, require.main will equal the global module, and if not
// the file is being imported into another file
if (require.main === module) {
  app.listen(port, () => console.log(
    `Express started on port ${port} `
        + 'Press ctrl c to terminate.',
  ));
} else {
  module.exports = app;
}
