ALTER TABLE guestbook_entries ADD COLUMN visitor_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS guestbook_entries_visitor_id_idx
  ON guestbook_entries (visitor_id)
  WHERE visitor_id IS NOT NULL;
