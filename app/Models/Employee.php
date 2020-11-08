<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
     protected $fillable = [
        'full_name',
        'date_of_birth',
        'gender',
        'salary',
        'designation',
        'is_imported',
        'imported_date',
        'imported_by'
    ];

}
