import pgPromise from "pg-promise";

const pgp = pgPromise();
// Motar a instring de conecção
// const db = pgp("postgresql://dba:dba@paybank-db:5432/UserDB");
const db = pgp({
    user: "dba",
    password: "dba",
    host: "paybank-db",
    port: 5432,
    database: "UserDB",
})

export async function obterCodigo2FA(cpf) {
  const query = `
        SELECT t.code
        FROM public."TwoFactorCode" t
        JOIN public."User" u ON u."id" = t."userId"
        WHERE u."cpf" = '${cpf}'
        ORDER BY t."id" DESC
        LIMIT 1;
    `;

  const result = await db.oneOrNone(query);
  return result.code;
}
