-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MessageHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "editedById" INTEGER NOT NULL,
    "editedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MessageHistory_originalId_fkey" FOREIGN KEY ("originalId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageHistory_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MessageHistory" ("action", "content", "editedAt", "editedById", "id", "originalId") SELECT "action", "content", "editedAt", "editedById", "id", "originalId" FROM "MessageHistory";
DROP TABLE "MessageHistory";
ALTER TABLE "new_MessageHistory" RENAME TO "MessageHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
