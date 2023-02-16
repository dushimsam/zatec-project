<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @class Album
 * @brief Album model to contain general properties and methods
 */
class Album extends Model
{

    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["title", "description","release_date"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function songs(){
        return $this->hasMany(Song::class);
    }
}
