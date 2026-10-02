CREATE TABLE IF NOT EXISTS site_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'XX',
  visited_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS site_visits_visited_at_idx
  ON site_visits (visited_at DESC);

CREATE INDEX IF NOT EXISTS site_visits_visitor_id_idx
  ON site_visits (visitor_id, visited_at DESC);

CREATE TABLE IF NOT EXISTS site_presence (
  visitor_id TEXT PRIMARY KEY,
  country TEXT NOT NULL DEFAULT 'XX',
  last_seen TEXT NOT NULL,
  active_until TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS site_presence_active_until_idx
  ON site_presence (active_until);
