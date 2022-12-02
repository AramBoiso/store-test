**Requeriments**
 - nvm 0.39.2v
	 - node lts 18.12.1v
- docker >- 20.10.12v

---

**Notes**:
 - Create file `.env`	on root dir and put the environment variables.
 - Change  database config of `docker-compose` file.
 - When create a customer, change email and password (credentials) of the order.spec file for that tests     worked
---

**Environment Variables**

| NAME | EXAMPLE |
|--|--|
| PORT |  1000|
| DB_HOST | host |
| DB_USER | root |
| DB_PASSWORD | 1234 |
| DB_NAME | database_name |
| DB_PORT | 5050 |
| JWT_SECRET | K45Sl#$ad |

---


**Installation Commands**

 1. `npm install`
 2. `docker-compose up -d postgres`
 3. `npm run migrations:run`
 4. `npm run seed:run`
 5. `npm test` or `npm run dev`

---
**Endpoints**

`POST /api/v1/auth/login` (Login on the app)

    {
     "email": "your email",
     "password": "your password"
    }
---
`GET /api/v1/products` (Get all products)

---
`GET /api/v1/products/:id` (Get product by id)

---
GET /api/v1/customers/profile (Get profile of customer logged)

---
`POST /api/v1/customers` (Create a new customer)

    {
    	"name": "your name",
    	"lastName": "your lastname",
    	"phone": "your phone",
    	"user":{
    		"email": "your email",
    		"password":"your password"
    	}
    }

---
`GET /api/v1/orders/:id` (Get details of specific order)

---
`POST /api/v1/orders` (Create new order for customer logged)

    {
    	"items": [
    		{ 
    			"productId": 1,
    			"amount": 1
    		},
    		{ 
    			"productId": 2,
    			"amount": 1
    		},
    		{ 
    			"productId": 3,
    			"amount": 1
    		}
    	]
    }
---
GET /api/v1/orders (Get all orders of customer logged)

---
**Relational Entity Diagram**
![Diagram of database](https://github.com/AramBoiso/store-test/blob/main/store-test-diagram.jpg)