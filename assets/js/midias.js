// Mídias das galerias (abertas no modal). type: 'video' | 'image'.
// Textos em { pt, en } seguem o idioma escolhido no site.
const MIDIAS = 'assets/midias/';

const projectMedia = {
    // A ordem importa: os prints da página abrem a galeria pelo índice (data-index).
    pc: [
        {
            type: 'image',
            title: { pt: 'Quiosque da Praia', en: 'Beach kiosk' },
            description: { pt: 'Versão 1.0: mesa cheia com 12 jogadores, cartas na mão e água de coco na mesa.', en: 'Version 1.0: a full table of 12 players, cards in hand and coconut water on the table.' },
            path: MIDIAS + 'telas/mesa-praia.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Partida no Boteco', en: 'A match at the Boteco' },
            description: { pt: 'A frase da rodada no topo, o placar ao lado e os atalhos de expressão, bebida e petisco.', en: "The round's sentence on top, the scoreboard on the side and the shortcuts for expressions, drinks and snacks." },
            path: MIDIAS + 'telas/partida-boteco.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Menu no Pub', en: 'Pub menu' },
            description: { pt: 'Tela inicial: crie uma sala, entre com código ou veja as salas abertas e escolha seu personagem.', en: 'Home screen: create a room, join with a code or browse open rooms, and pick your character.' },
            path: MIDIAS + 'telas/menu-pub.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Sala de espera', en: 'Waiting room' },
            description: { pt: 'O anfitrião escolhe bar, modo (Casual ou +18) e rodadas; os amigos entram pelo código.', en: 'The host picks the bar, the mode (Casual or 18+) and the rounds; friends join with the code.' },
            path: MIDIAS + 'telas/sala-praia.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Touro com as cartas', en: 'The Bull holding his cards' },
            description: { pt: 'Cada personagem segura a própria mão de cartas durante a rodada.', en: 'Every character holds their own hand of cards during the round.' },
            path: MIDIAS + 'telas/touro-cartas.jpg'
        }
    ],
    web: [
        {
            type: 'image',
            title: { pt: 'Início', en: 'Home' },
            description: { pt: 'Escolha um nome e um personagem, crie uma sala (pública ou com senha) ou entre numa das salas abertas.', en: 'Pick a name and a character, create a room (public or password-protected) or join one of the open rooms.' },
            path: MIDIAS + 'web/inicio.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Sala de espera', en: 'Waiting room' },
            description: { pt: 'Até 12 lugares na mesa. Convide por código, link ou QR Code e escolha entre Casual e +18.', en: 'Up to 12 seats at the table. Invite by code, link or QR Code and choose between Casual and 18+.' },
            path: MIDIAS + 'web/sala.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Rodada', en: 'Round' },
            description: { pt: 'A frase no centro, suas cartas embaixo: toque numa carta para escolher e toque de novo para jogar.', en: 'The sentence in the middle, your cards below: tap a card to select it and tap again to play.' },
            path: MIDIAS + 'web/rodada.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Resultado', en: 'Result' },
            description: { pt: 'Todo mundo vota, e a resposta com mais votos leva o ponto da rodada.', en: 'Everyone votes, and the answer with the most votes takes the round.' },
            path: MIDIAS + 'web/resultado.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Figurinhas', en: 'Stickers' },
            description: { pt: 'Mande figurinhas no meio da partida para provocar (ou comemorar).', en: 'Send stickers mid-match to tease (or celebrate).' },
            path: MIDIAS + 'web/figurinha.jpg'
        }
    ],
    bastidores: [
        {
            type: 'image',
            title: { pt: 'Protótipo — primeira mesa', en: 'Prototype — first table' },
            description: { pt: 'O começo: bonecos de cápsula, uma mesa e o loop de rodada funcionando contra bots.', en: 'The beginning: capsule characters, a table and the round loop running against bots.' },
            path: MIDIAS + 'evolucao/prototipo-1.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — mesa grande', en: 'Prototype — long table' },
            description: { pt: 'Testando a mesa para vários jogadores e a mão de cartas de cada um.', en: 'Testing the table for many players and each one’s hand of cards.' },
            path: MIDIAS + 'evolucao/prototipo-2.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — cartas na mão', en: 'Prototype — cards in hand' },
            description: { pt: 'Primeiras animações dos personagens segurando e jogando cartas.', en: 'First animations of characters holding and playing cards.' },
            path: MIDIAS + 'evolucao/prototipo-3.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Protótipo — votação', en: 'Prototype — voting' },
            description: { pt: 'Pergunta no centro, respostas na mesa e placar: a regra completa já funcionava.', en: 'Question in the middle, answers on the table and a scoreboard: the full ruleset already worked.' },
            path: MIDIAS + 'evolucao/prototipo-4.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Primeiro Boteco — sala', en: 'First Boteco — room' },
            description: { pt: 'Primeiro cenário e interface própria, ainda com os “bichinhos” coloridos.', en: 'First scene and custom interface, still with the colorful placeholder critters.' },
            path: MIDIAS + 'evolucao/boteco-sala.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Primeiro Boteco — votação', en: 'First Boteco — voting' },
            description: { pt: 'Rodada bônus, cronômetro, placar e as cartas de resposta na tela.', en: 'Bonus round, timer, scoreboard and answer cards on screen.' },
            path: MIDIAS + 'evolucao/boteco-votacao.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Menu no editor', en: 'Menu in the editor' },
            description: { pt: 'O menu principal tomando forma dentro da Unity, ainda testando contra o servidor local.', en: 'The main menu taking shape inside Unity, still testing against the local server.' },
            path: MIDIAS + 'evolucao/boteco-menu.jpg'
        },
        {
            type: 'video',
            title: { pt: 'Bastidores no editor', en: 'Behind the scenes in the editor' },
            description: { pt: 'Uma partida rodando na Unity na fase de transição: os bichinhos antigos dividindo a mesa com os novos personagens 3D.', en: 'A match running in Unity during the transition: the old critters sharing the table with the new 3D characters.' },
            path: MIDIAS + 'video/bastidores-editor.mp4',
            thumbnail: MIDIAS + 'video/bastidores-editor.jpg'
        },
        {
            type: 'image',
            title: { pt: 'O Pub com a turma completa', en: 'The Pub with the full crew' },
            description: { pt: 'Os 12 personagens à mesa, vistos pela câmera de cena da Unity.', en: 'All 12 characters at the table, seen from the Unity scene camera.' },
            path: MIDIAS + 'evolucao/pub-editor.jpg'
        },
        {
            type: 'image',
            title: { pt: 'Versão 1.0', en: 'Version 1.0' },
            description: { pt: 'O resultado: mesa cheia no Quiosque da Praia, pronta para jogar.', en: 'The result: a full table at the Beach kiosk, ready to play.' },
            path: MIDIAS + 'telas/mesa-praia.jpg'
        }
    ]
};

// Cartas do baralho do topo da página: qualquer pergunta combina com qualquer resposta.
const deckCards = {
    pt: {
        questions: [
            'Minha avó ficou famosa na internet por causa de ______.',
            'O próximo grande lançamento da tecnologia será ______.',
            'Descobri que meu melhor amigo escondia ______.',
            'O restaurante precisou fechar depois de ______.',
            'O que não pode faltar num pub? ______.',
            'A reunião que podia ser um e-mail terminou em ______.',
            'No churrasco de família, o assunto proibido é ______.',
            'Meu currículo agora tem ______.'
        ],
        answers: [
            'uma figurinha fora de contexto',
            'um hamster com plano de fuga',
            'uma webcam ligada sem querer',
            'confiança injustificada',
            'um cabo que só funciona de um lado',
            'um carrinho de supermercado com roda torta',
            'um relatório sem dados',
            'uma atualização de 8 GB',
            'uma viagem sem GPS',
            'um ventilador barulhento'
        ]
    },
    en: {
        questions: [
            'My grandma went viral because of ______.',
            'The next big thing in tech will be ______.',
            'I found out my best friend was hiding ______.',
            'The restaurant had to close after ______.',
            'What can never be missing at a pub? ______.',
            'The meeting that could have been an email ended in ______.',
            'At the family barbecue, the forbidden topic is ______.',
            'My résumé now includes ______.'
        ],
        answers: [
            'a sticker out of context',
            'a hamster with an escape plan',
            'a webcam left on by accident',
            'unjustified confidence',
            'a cable that only works one way',
            'a shopping cart with a wobbly wheel',
            'a report with no data',
            'an 8 GB update',
            'a road trip without GPS',
            'a noisy fan'
        ]
    }
};
