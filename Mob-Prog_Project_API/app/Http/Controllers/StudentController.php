<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Http\Controllers\API\BaseController as BaseController;
class StudentController extends BaseController

{
    public function index(){
        return Student::all();
    }
}
