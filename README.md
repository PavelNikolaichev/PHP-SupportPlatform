This is a support platform that is based on Laravel framework.

## Installation
Firstly, you need to install the dependencies of the project. These are: `docker`, `nodejs`.

Unfortunately, there is(<i>almost</i>) no way to configure docker with vite-nodejs because of conflict with nginx.
Therefore, you must install and run `nodejs` on your local machine.
After that, execute the following commands to install the project:
```
docker-compose up -d
cd src
npm install
npm run dev
```
Note: you can use `npm run watch` instead of `npm run dev` to watch the changes in the project.

Then you can access the project at http://localhost:8000.