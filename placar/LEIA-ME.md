# Placar global

O placar de cada música fica num banco gratuito do Firebase (Realtime Database, plano Spark, sem cartão).
O site lê o endereço do banco em `placar/config.json`. Enquanto ele estiver vazio, o menu mostra
"O placar global ainda não foi ligado".

## Como ligar (uma vez só)

1. Abra https://console.firebase.google.com com a sua conta Google e clique em **Criar um projeto**.
   Pode chamar de `riff-relampago` e desligar o Google Analytics.
2. No menu da esquerda, abra **Criação > Realtime Database** e clique em **Criar banco de dados**.
   Escolha o local (Estados Unidos serve) e marque **Iniciar no modo bloqueado**.
3. Na aba **Regras**, apague tudo, cole o conteúdo de [`regras.json`](regras.json) e clique em **Publicar**.
4. Na aba **Dados**, copie o endereço que aparece em cima, parecido com
   `https://riff-relampago-default-rtdb.firebaseio.com/`.
5. No GitHub, abra `placar/config.json`, clique no lápis e cole o endereço entre as aspas:

   ```json
   {
     "firebase": "https://riff-relampago-default-rtdb.firebaseio.com"
   }
   ```

   Salve com **Commit changes**. Em um ou dois minutos o site já usa o placar.

## Como funciona

- Na primeira visita o site pede um nick. Ele fica salvo no navegador e pode ser trocado no placar.
- Cada navegador tem um id próprio. Ao terminar uma música (sozinho ou online), o jogo envia a pontuação
  se ela for a melhor daquele navegador nessa música e dificuldade. As regras do banco recusam pontuação menor,
  apagar pontuações e qualquer campo a mais.
- Não tem login, então alguém que entenda de programação consegue mandar uma pontuação falsa.
  Para tirar uma, abra a aba **Dados** no Firebase, ache a música e apague a linha.
- Músicas de MP3 do computador não entram no placar, porque cada pessoa tem um arquivo diferente.
