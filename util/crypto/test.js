'use strict';

const hash = require('./index');

const password = process.argv[2] || 'nagato';

process.stdout.write(hash(password));
