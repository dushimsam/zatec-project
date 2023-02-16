# MUSIC APP 

This is a music app built with Laravel for the backend and Next.js (React) for the frontend.

## START THE BACKEND

### Install Dependencies

`cd backend` <br /><br />
`composer install`


### Update .env file 

###### DB_DATABASE=your_database_name
###### DB_USERNAME=your_database_username
###### DB_PASSWORD=your_database_password

NOTE: Make sure you've created the MySQL database as well

### Run the migration 

`php artisan migrate`

### Start the backend server:

`php artisan serve`

Note: The frontend expects this server to be running at http://localhost:8000/

## START THE FRONTEND

### 1.  Install from the source
#### Install dependencies for the frontend:

`cd ../frontend`
<br /><br />
`npm install`

#### Start the frontend server:

`npm run dev`

###### ALL SET UP NOW 👏 ... , you can access the application at http://localhost:3000/

### 2. Run the Frontend Via docker
Make sure you have docker installed on the PC, then run each of the following commands in order.</br></br>
`docker pull dushsam/zatec_client:latest`</br></br>
`docker run -p 3000:3000 dushsam/zatec_client:latest`

Alternatively, You can also run it after building the image from the source files.

From the project's root directory run the following commands: </br>

`cd frontend` <br /><br />
`docker build --tag zatec_client:latest .` <br /><br />
`docker run -p 3000:3000 zatec_client` <br />

## RUNNING THE TESTS


### Update .env file

###### DB_TEST_DATABASE=your_database_test_name
###### DB_TEST_USERNAME=your_database_test_username
###### DB_TEST_PASSWORD=your_database_test_password

### Clear the application cache and run test-db migrations

From the project's root directory run:

`cd backend` <br /><br />
`php artisan config:clear` <br /><br />
`php artisan migrate --database=testing`<br /><br />
`php artisan test`


### CONTACT

For any issue don't hesitate to reach me out at:

##### Phone Number: +250 786945831
##### Email: [dushsam100@gmail.com]()
##### LinkedIn: [https://www.linkedin.com/in/samuel-dushimimana-364a19194/]() 