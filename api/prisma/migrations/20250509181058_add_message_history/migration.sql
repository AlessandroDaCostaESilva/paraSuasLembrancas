-- CreateTable
CREATE TABLE "MessageHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "editedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedById" INTEGER NOT NULL,
    CONSTRAINT "MessageHistory_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
