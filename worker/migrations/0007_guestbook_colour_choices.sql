-- Give the current notes the supplied palette in display order.
WITH ranked_entries AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at DESC, id DESC) AS position
  FROM guestbook_entries
)
UPDATE guestbook_entries
SET color = CASE ranked_entries.position
  WHEN 1 THEN 'sage-mist'
  WHEN 2 THEN 'moss-fog'
  WHEN 3 THEN 'olive-whisper'
  WHEN 4 THEN 'forest-ash'
  WHEN 5 THEN 'lichen-grey'
  WHEN 6 THEN 'deep-pine-shadow'
  WHEN 7 THEN 'muted-fern'
  WHEN 8 THEN 'dried-herb'
  WHEN 9 THEN 'autumn-sage'
END
FROM ranked_entries
WHERE guestbook_entries.id = ranked_entries.id;
