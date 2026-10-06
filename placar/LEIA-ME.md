# Placar global e pessoas online

O placar de cada música e o contador de pessoas online ficam num banco gratuito do Firebase
(Realtime Database, plano Spark, sem cartão). O site lê o endereço do banco em `placar/config.json`.
Enquanto ele estiver vazio, o menu mostra "O placar global ainda não foi ligado" e o contador não aparece.

Se você já tinha colado as regras antes, cole o [`regras.json`](regras.json) de novo e publique:
a parte `online` dele é a do contador.

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

## Contador de pessoas online

- No alto do menu aparece quantas pessoas estão com o jogo aberto agora, contando você, e quantas estão tocando.
- Cada navegador marca presença no banco a cada 40 segundos, com um id próprio que não é o do placar.
  Várias abas no mesmo navegador contam como uma pessoa. Quem fecha o jogo sai na hora; se o navegador
  fechar sem avisar, a pessoa sai da conta em uns dois minutos.
- Uma aba esquecida em segundo plano para de contar depois de 5 minutos e volta quando a pessoa abre a aba de novo.
- Como o placar, não tem login: alguém que entenda de programação consegue inflar o número enquanto mantiver um script rodando.
