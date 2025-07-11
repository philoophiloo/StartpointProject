<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompensationType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'description',
        'is_active',
        'created_by',
    ];
}
