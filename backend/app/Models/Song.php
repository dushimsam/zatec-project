<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @class Song
 * @brief Song model to contain general properties and methods
 */
class Song extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ["title","length","album_id", "genre_id"];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function album(){
        return $this->belongsTo(Album::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function genre(){
        return $this->belongsTo(Genre::class);
    }
}
