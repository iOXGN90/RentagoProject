<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    protected $table = 'locations';
    protected $guarded = [] ;
public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

public function multiimage(): HasMany
    {
        return $this->hasMany(Multiimage::class);
    }
}
