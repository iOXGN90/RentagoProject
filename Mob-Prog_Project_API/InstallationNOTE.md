To create a Base Controller or API/BaseController.php
> php artisan make: controller API/BaseController

To create a API/Register/Controller.php,
> php artisan make:controller API/RegisterController

In RegisterController.php:
<h1> !!! **IMPORTANT** !!!</h1>
    - In *"createToken"* error in RegisterController.php, simply put: 
        > /** @var \App\Models\MyUserModel $user **/
    above the: 
        > $user = Auth::user();

We can also include changing the:
 > use Illuminate\Support\Facades\Validator;
instead of using: 
 > use Validator;
So that Validator in RegisterController.php will run. 


Register API: Verb: GET, URL:http://localhost:8000/api/register
Login API: Verb: GET, URL:http://localhost:8000/api/login




***Note:***
- Current working localhost and port: php artisan serve --host=192.168.1.5 --port=3000

- To create table:
    > php artisan make:model Student -m c 
        - m = model
        - c = controller
    - hence, if you include the -m & c, you're creating model and controller.


- The ***migration*** (./database/migrations) is where you create a table along with its attributes.
    - If we want to edit a tables that are already migrated, we cannot just   migrate it directly since in Laravel, what is currently migrated cannot be undo. So, we need to rollback before the **"migrate"** code. 
    > Edit of the table; could be adding, removing and/or modify, run the: 
        > php artisan migrate:rollback
        > php artisan migrate


- The ***models*** (./app/Models)  are used to interact with the database. Models represent and encapsulate the logic for the database's table, hence, if you I want to put rules on how the data is accessed in the database's table, this is where you put instructions. 

- The Controllers  


