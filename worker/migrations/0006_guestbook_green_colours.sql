-- Replace the original mixed palette with a subdued green palette.
-- The id modulo keeps existing notes varied and makes the migration repeatable.
UPDATE guestbook_entries
SET color = CASE (id % 15)
  WHEN 0 THEN 'moss'
  WHEN 1 THEN 'sage'
  WHEN 2 THEN 'fern'
  WHEN 3 THEN 'olive'
  WHEN 4 THEN 'eucalyptus'
  WHEN 5 THEN 'juniper'
  WHEN 6 THEN 'celadon'
  WHEN 7 THEN 'lichen'
  WHEN 8 THEN 'willow'
  WHEN 9 THEN 'thyme'
  WHEN 10 THEN 'aloe'
  WHEN 11 THEN 'sea-glass'
  WHEN 12 THEN 'pistachio'
  WHEN 13 THEN 'forest-mist'
  ELSE 'basil'
END;
