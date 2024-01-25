<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class MultiImage extends Model
{
    protected $table = 'multi_images';
    protected $fillable = ['location_id', 'url'];

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }
}
