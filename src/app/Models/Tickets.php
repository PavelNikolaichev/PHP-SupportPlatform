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

    protected $fillable = [
        'title',
        'status',
        'user_id',
    ];

    protected $casts = [
        'freezed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getStatusAttribute(): string
    {
        return array_flip($this->status_codes)[$this->attributes['status']];
    }

    public function setStatusAttribute(string $status)
    {
        $this->attributes['status'] = $this->status_codes[$status];
    }

    public function username()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'ticket_id');
    }
}
