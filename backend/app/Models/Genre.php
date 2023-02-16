<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @class Genre
 * @brief Genre model to contain general properties and methods
 */
class Genre extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["type"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function songs(){
        return $this->hasMany(Song::class);
    }
}
