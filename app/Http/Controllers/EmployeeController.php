<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\EmployeesImport;
use App\Exports\EmployeeExport;
use App\Exports\EmployeeExportQuery;
use App\Models\Employee;

use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;


class EmployeeController extends Controller
{
    public function delete(Request $request){
      
            if(Employee::where('id',$request->id)->exists() || $request->id!== Auth::id()){
                Employee::where('id',$request->id)->delete();
                return ["success"=>true];
              
            }
            else{
              return [
                    "success"=>false,
                    "message"=>"record doesn't exist"
                ];
            }

    }
    // public function multidelete(Request $request){
    //         if(Employee::where('id',$request->id)->exists()){
    //             Employee::where('id',$request->id)->delete();
    //             return ["success"=>true];
              
    //         }
    //         else{
    //           return [
    //                 "success"=>false,
    //                 "message"=>"record doesn't exist"
    //             ];
    //         }

    // }
      public function getIndex(Request $request){
            if(Employee::where('id',$request->id)->exists()){
                $employee = Employee::where('id',$request->id)->get();
                return ["success"=>true,"data"=>$employee[0]];
            }
            else{
              return [
                    "success"=>false,
                    "message"=>"record doesn't exist"
                ];
            }

    }
     public function add(Request $request){
         try {

            $employee = new Employee;
            $employee->full_name = $request->full_name;
            $employee->date_of_birth = $request->date_of_birth;
            $employee->gender = $request->gender;
            $employee->salary = $request->salary;
            $employee->designation = $request->designation;
             if ($request->hasFile('image')) {
            if ($request->file('image')->isValid()) {
                //
                $validated = $request->validate([
                    'full_name' => 'string|max:40',
                    'image' => 'mimes:jpeg,png|max:4096',
                ]);
                $extension = $request->image->getClientOriginalExtension();
                $request->image->storeAs('/public', $validated['full_name'].".".$extension);
                
             $employee->image_url = "/storage/".$validated['full_name'].".".$extension;
}else{
 return response()->json([
        "success" => "fail",
        "message" => "image Upload failed"
    ]);

}
            }
            $employee->save();
            return response()->json([
             "success" => true,
             "message" => "student record created"
    ], 201);
         } catch (\Throwable $th) {
             return response()->json([
        "success" => "fail",
        "message" => $th
    ]);
         }
        }
    public function edit(Request $request){
         try {
         if(!Employee::where('id',$request->id)->exists()
         )
return response()->json([
             "success" => false,
             "message" => "record not found",
            ]);
            $employee = Employee::find($request->id);
            $employee->full_name = $request->full_name;
            $employee->date_of_birth = $request->date_of_birth;
            $employee->gender = $request->gender;
            $employee->salary = $request->salary;
            $employee->designation = $request->designation;
               if ($request->hasFile('image')) {
            if ($request->file('image')->isValid()) {
                //
                $validated = $request->validate([
                    'full_name' => 'string|max:40',
                    'image' => 'mimes:jpeg,png|max:4096',
                ]);
                $extension = $request->image->getClientOriginalExtension();
                $request->image->storeAs('/public', $validated['full_name'].".".$extension);
                
             $employee->image_url = "/storage/".$validated['full_name'].".".$extension;
}else{
 return response()->json([
        "success" => "fail",
        "message" => "image Upload failed"
    ]);

}
            }
            $employee->save();
            return response()->json([
             "success" => true,
             "message" => "student record updated"
            ], 201);
                 } catch (\Throwable $th) {
                   return response()->json([
                 "success" => "fail",
                "message" => $th
            ]);
         }
    }
    public function export() 
    {
        return Excel::download(new EmployeeExport, 'employee.xlsx');
    }
    
   
   
    public function getEmployee() 
    {
        $employees =Employee::where('imported_by',Auth::id())->get();
        return ["status"=>"success","employees"=>$employees];
    }
     public function exportSome(Request $request) 
    {
        $arr = $request->getList;
        if(
       $request->pdfFormat === "pdf"
        )
        return (new EmployeeExportQuery($arr))->download('employee.pdf',\Maatwebsite\Excel\Excel::MPDF);
         if(
       $request->pdfFormat === "csv"
        )
        return (new EmployeeExportQuery($arr))->download('employee.csv',\Maatwebsite\Excel\Excel::CSV);
     return (new EmployeeExportQuery($arr))->download('employee.xlsx',\Maatwebsite\Excel\Excel::XLSX);
    }
   public function import(Request $request) 
    {
        try{
        $file = $request->file('your_file')->store('import');
        $failData = array();
        $errorData = array();
        $import = new EmployeesImport;
        $import->import($file);
         if ($import->failures()->count()>0) {
         foreach ($import->failures() as $failure) {
             array_push($failData,[
                 "row"=> $failure->row(),
                 "fail_errors"=> $failure->errors(),
                 "values"=> $failure->values(),
                 "attribute"=> $failure->attribute(),
             ]);
        }
        return ["message"=>"failure",
            "response"=>$failData,
            "user_id"=>Auth::check()
        ];
    }
  if ($import->errors()->count()>0) {
         foreach ($import->errors() as $error) {
             array_push($errorData,[
                 "status"=>"error",
                 "errors"=> $error,
             ]);
        }
        return $errorData;
    }
    return ["status"=>"Success"];
        }
        catch(\Maatwebsite\Excel\Validators\ValidationException $e){
            $failures = $e->failures();
     foreach ($failures as $failure) {
         $failure->row(); // row that went wrong
         $failure->attribute(); // either heading key (if using heading row concern) or column index
         $failure->errors(); // Actual error messages from Laravel validator
         $failure->values(); // The values of the row that has failed.
     return  $failure;
     }

        }
    }
}
