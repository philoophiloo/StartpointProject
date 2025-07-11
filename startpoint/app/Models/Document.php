<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
protected $table = 'documents';
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'file_path',
        'file_name',
        'file_extension',
        'file_size_in_kilobytes',
        'is_active',
        'created_by',
    ];

    /**
     * Relationship: each document belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
