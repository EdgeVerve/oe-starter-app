var app = require('oe-cloud');
app.boot(__dirname, function (err) {
  if (err) { console.error(err); throw err; }

  var m = require('oe-migration');
  m.migrate({}, function (err, oldDbVersion, migratedVersions) {
    if (err) {
      console.error(err);
      // process.exit(1);
    }
    console.log('Migration completed');
    // eslint-disable-next-line
    process.exit(0);
  });
});
