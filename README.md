# Riff Relâmpago

Jogo de ritmo no navegador, no estilo Guitar Hero, para jogar sozinho, em dupla no mesmo computador ou em duelo online.

- 3 músicas originais compostas pelo próprio jogo.
- Carregue um arquivo de música seu (MP3, WAV, OGG) e o jogo cria as notas sozinho.
- Duelo online: um cria a sala e manda o código ou o link, o outro entra de outro computador. A conexão é direta entre os dois navegadores (WebRTC com [PeerJS](https://peerjs.com)).
- Grave o chart de uma música do YouTube tocando junto com o vídeo, e compartilhe o chart com amigos por um código.
- Ou crie o chart de uma música do YouTube automaticamente a partir do seu próprio MP3 dela: o jogo analisa o arquivo e você marca quando a música começa no vídeo para sincronizar.

Tudo roda no navegador, em `index.html` mais a biblioteca PeerJS em `vendor/` (licença MIT, em `vendor/PEERJS-LICENSE`). Nenhuma música com direitos autorais vem junto com o jogo.

## Controles

- Jogador 1: A S D F G, Espaço para o Poder Estelar.
- Jogador 2: H J K L Ç, Enter para o Poder Estelar.
- Modo Palhetada (1 jogador): segure a cor e palhete com Enter, ↑ ou ↓.
- Esc pausa. No celular, toque nas pistas.
