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

export async function obterCodigo2FA() {
  const query = `
        SELECT code
	    FROM public."TwoFactorCode"
	    ORDER BY id DESC
	    limit 1;
    `;

  const result = await db.oneOrNone(query);
  return result.code;
}
