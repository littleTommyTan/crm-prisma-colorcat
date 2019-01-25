function exec(cmd) {
  console.log(cmd);
  require("child_process").execSync(cmd, { stdio: "inherit" });
}

exec("docker-compose up -d");
exec("npm install typescript -g");
exec("npm install ts-node -g");
exec("npm install pm2@latest -g");
exec(`pm2 install typescript`);
exec("npm install yarn -g");
exec("yarn");
exec("yarn global add prisma@1.22.1");
try {
  exec(`pm2 delete all`);
} catch (error) {}
exec(`pm2 start src/index.ts --name='crm-backend'`);
exec("prisma generate");
exec("prisma deploy --force");
exec(`pm2 startup`);
exec(`pm2 save`);
