<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;

    private array $status_codes = [
        'in progress' => 0,
        'freezed' => 1,
        'solved' => 2,
    ];

    public function getStatusAttribute(): string
    {
        return array_flip($this->status_codes)[$this->attributes['status']];
    }

    public function setStatus(string $status)
    {
        $this->status = $this->status_codes[$status];
    }

    public function getUsernameAttribute()
    {
        return $this->belongsTo(User::class, 'user_id')->get()[0]->name;
    }
}
