# Ionic Pre-populated sqlite

### Plugins

- `https://github.com/an-rahulpandey/cordova-plugin-dbcopy`
- `https://github.com/litehelpers/Cordova-sqlite-storage`

### SQLite create database

```sh
cd ~/path/to/www
sqlite3 populated.db
CREATE TABLE people (id integer primary key, firstname text, lastname text);
```