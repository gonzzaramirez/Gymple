# Backend Documentation

## Files

- **`db-model.md`**: ER diagram (Mermaid format) showing the database structure. View it with a Mermaid extension in your editor.
- **`schema.sql`**: Raw PostgreSQL DDL statements for creating all tables, constraints, and indexes. Use this for manual database setup or as reference.

## Related Files

- **`../../Back/prisma/schema.prisma`**: Prisma ORM schema definition. This is the source of truth for Prisma migrations and client generation.

## Workflow

1. Edit `Back/prisma/schema.prisma` when you need to change the database model
2. Run `npx prisma migrate dev --name <migration-name>` to generate and apply migrations
3. Update `db-model.md` and `schema.sql` documentation if needed
