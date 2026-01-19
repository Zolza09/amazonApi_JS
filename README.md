# Amazon REST API test application using Node.js + express.js + mongoDb stacks. 

1. Download dependency packages  --> npm install
2. Start command: --> npm run dev

Data insert and delete to mongoDB using seeder.js. 
Usage of seeder: npm seeder.js -i and -d  

# For ORM sequelize SQL data base convert to NoSQL database: 
sequelize-auto -h localhost -d amazon -u root -x 'ENTER-PASS'-p 3306 sequelize-auto-settings.json -o amazon