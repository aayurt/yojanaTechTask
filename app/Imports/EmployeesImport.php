<?php

namespace App\Imports;
use Carbon\Carbon;
use App\Models\Employee;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Validators\Failure;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Illuminate\Validation\Rule;
use Auth;

class EmployeesImport implements ToModel,WithHeadingRow,SkipsOnError,withValidation,SkipsOnFailure
{
        use Importable,SkipsErrors,SkipsFailures;

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    
    public function model(array $row)
    {
       
        return  new Employee([
            'full_name'     => $row["full_name"],
           'date_of_birth'    => Carbon::parse($row["date_of_birth"])->format('Y-m-d H:i:s'), 
           'gender' => $row["gender"],
           'salary' => $row["salary"],
           'designation'=> $row["designation"],
           'is_imported'=> true,
           'imported_date'=> Carbon::now()->format('Y-m-d H:i:s'),
           'imported_by'=> Auth::id(),
        ]);
     
    }


    public function rules():array{
         return [
            'salary'=> 'required|numeric:employees,salary',
            'full_name'=>'required|unique:employees,full_name',
            'date_of_birth'=>'required|date',
            'gender'=>'required|unique:employees,gender',
            'designation'=>'required|unique:employees,designation',
        ];
    }
/* VALIDATION ERROR IF USED NON FORMATABLE */
}
