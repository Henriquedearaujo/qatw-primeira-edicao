import { test, expect } from "@playwright/test";

import { obterCodigo2FA } from "../support/db";

import { LoginPage } from "../pages/LoginPage";

import { DashPage } from "../pages/DashPage";

test("Nao deve logar quando o codigo de altenticacao e invalido", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  const usuario = {
    cpf: "00000014141",
    senha: "147258",
  };

  await loginPage.acessaPagina();
  await loginPage.informaCpf(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);
  await loginPage.informaCodigo2FA('123456');

  await expect(page.locator("span")).toContainText(
    "Código inválido. Por favor, tente novamente."
  );
});

test("Deve acessar a conta do usuario", async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const usuario = {
    cpf: "00000014141",
    senha: "147258",
  };

  await loginPage.acessaPagina();
  await loginPage.informaCpf(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);

  await page.waitForTimeout(5000);

  const codigo = await obterCodigo2FA();

  await loginPage.informaCodigo2FA(codigo);

  await page.waitForTimeout(2000);

  expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00');
});
