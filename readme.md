# Simple Instant Messenger Service (SIMS)

## Getting started

**Setup SIMS**

```bash
git clone https://github.com/pawlikooo/sims.git
cd sims
npm install
```

Edit `config.js` to set your database, user & password.

**Run SIMS**

```bash
npm run-script reset
npm start
```

**Open SIMS**

And then open up [localhost:3000](http://localhost:3000/)

**Data generator**

Also, there is built-in data generator:

```bash
siege -c100 -b -t1M http://localhost:3000/messages/generator
siege -c100 -t1M http://localhost:3000/users/generator
```
