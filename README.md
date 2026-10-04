# Riff Relâmpago

Jogo de ritmo no navegador, no estilo Guitar Hero, para jogar sozinho, em dupla no mesmo computador ou em salas online com até 8 jogadores.

- 3 músicas originais compostas pelo próprio jogo.
- Carregue um arquivo de música seu (MP3, WAV, OGG) e o jogo cria as notas sozinho.
- Salas online com até 8 jogadores: um cria a sala e manda o código ou o link, os outros entram de outros computadores. Durante a música, o placar de todos aparece ao vivo no canto superior direito, e no fim sai a classificação. A conexão é direta entre os navegadores (WebRTC com [PeerJS](https://peerjs.com)).
- Grave o chart de uma música do YouTube tocando junto com o vídeo, e compartilhe o chart com amigos por um código.
- Ou crie o chart de uma música do YouTube automaticamente a partir do seu próprio MP3 dela: o jogo analisa o arquivo e você marca quando a música começa no vídeo para sincronizar.
- Importe charts feitos à mão (notes.chart ou notes.mid do Moonscraper / Clone Hero), com as 4 dificuldades e o Poder Estelar do chart, tocando com o áudio da música (stems como guitar.ogg incluídos) ou com um vídeo do YouTube.
- Modo batalha, em dupla no mesmo PC ou nas salas online: todos no mesmo chart, partes separadas (guitarra, baixo ou guitarra base, nas músicas do jogo e nos charts do Clone Hero que têm essas partes) ou duelo, em que a música é dividida em trechos e cada um toca os seus. No duelo as frases de estrela dão os ataques do Guitar Hero 3 (amplificador estourado, corda quebrada, dificuldade maior, notas em dobro, canhoto, alavanca e roubo), soltos com a tecla de Poder Estelar e que valem na vez de quem foi atacado.
- Placar global de cada música e dificuldade, à esquerda do menu. O site pede um nick na primeira visita. Para ligar o placar, veja [placar/LEIA-ME.md](placar/LEIA-ME.md).
- Músicas da casa: o que estiver na pasta `musicas/` deste repositório (pacotes .sng ou pastas do Clone Hero) aparece no menu para todo mundo. Veja [musicas/LEIA-ME.md](musicas/LEIA-ME.md).
- Biblioteca de músicas: escolha a sua pasta de músicas do Clone Hero (ou arquivos .sng) e todas entram no menu, guardadas no seu navegador. Para tocar uma delas online, cada jogador importa o mesmo chart na própria biblioteca.

Tudo roda no navegador, em `index.html` mais a biblioteca PeerJS em `vendor/` (licença MIT, em `vendor/PEERJS-LICENSE`). Nenhuma música com direitos autorais vem junto com o jogo.

## Controles

- Jogador 1: A S D F G, Espaço para o Poder Estelar.
- Jogador 2: H J K L Ç, Enter para o Poder Estelar.
- Modo Palhetada (1 jogador): segure a cor e palhete com Enter, ↑ ou ↓.
- Esc pausa. No celular, toque nas pistas.
