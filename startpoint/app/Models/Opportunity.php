<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opportunity extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'department',
        'opportunity_type',
        'opportunity_description',
        'core_competencies',
        'compensation_type',
        'compensation_currency',
        'compensation_amount',
        'expiry_date',
        'is_active',
        'created_by',
    ];
}
