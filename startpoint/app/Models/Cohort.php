<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cohort extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code_name',
        'president',
        'start_date',
        'end_date',
        'is_active',
        'created_by',
    ];
}
