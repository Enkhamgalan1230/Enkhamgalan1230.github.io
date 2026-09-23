-- Replace the previous palette with the lighter supplied palette.
WITH ranked_entries AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at DESC, id DESC) AS position
  FROM guestbook_entries
)
UPDATE guestbook_entries
SET color = CASE ranked_entries.position
  WHEN 1 THEN 'pale-sage'
  WHEN 2 THEN 'soft-eucalyptus'
  WHEN 3 THEN 'whisper-mint'
  WHEN 4 THEN 'light-moss'
  WHEN 5 THEN 'dusty-celadon'
  WHEN 6 THEN 'faded-fern'
  WHEN 7 THEN 'cream-sage'
  WHEN 8 THEN 'gentle-olive'
  WHEN 9 THEN 'airy-sage'
END
FROM ranked_entries
WHERE guestbook_entries.id = ranked_entries.id;
