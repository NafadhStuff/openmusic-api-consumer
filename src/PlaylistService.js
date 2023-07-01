const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const playlistQuery = {
      text: `SELECT playlist.id, name FROM playlist
            INNER JOIN playlist_songs
            ON playlist_songs.playlist_id = playlist.id
            WHERE playlist.id = $1`,
      values: [playlistId],
    }
    const { rows: playlist } = await this._pool.query(playlistQuery);

    const songsQuery = {
      text: `SELECT songs.id, title, performer FROM songs
            LEFT JOIN playlist_songs
            ON playlist_songs.song_id = songs.id
            WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    }
    const songs = await this._pool.query(songsQuery);

    playlist[0].songs = songs.rows;
    const res = {
      playlist: playlist[0],

    }
    return res;
  }
}

module.exports = PlaylistService;
