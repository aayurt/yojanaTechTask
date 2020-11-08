<?php

namespace App\Exports;

use App\Models\Employee;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;

class EmployeeExportQuery implements FromQuery
{
    /**
    * @return \Illuminate\Support\Collection
    */
       use Exportable;

    public function __construct(array $Id)
    {
        $this->Id = $Id;
    }

    public function query()
    {
        return Employee::query()->whereIn('id', $this->Id);
    }

}
