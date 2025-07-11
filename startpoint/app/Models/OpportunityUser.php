<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpportunityUser extends Model
{
    use HasFactory;

    protected $table = 'opportunity_user';

    protected $fillable = [
        'user_id',
        'opportunity_id',
        'is_active',
    ];
}
