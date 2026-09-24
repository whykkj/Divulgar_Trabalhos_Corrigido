# Divulgar Trabalhos

Protótipo acadêmico de divulgação de profissionais e pequenos empreendedores.
Front-end em Vue 3, Vue Router, Vite e Tailwind CSS 4.

Para abrir e publicar pelo VS Code sem digitar comandos, leia **LEIA-ME-PRIMEIRO.txt**.

## Executar

Requisito: Node.js 22.12 ou superior (por exemplo, versão 24).

```sh
npm install
npm run dev
```

No VS Code também é possível usar **Terminal → Executar Tarefa** e selecionar
as tarefas de instalação, execução e compilação já incluídas.

```sh
npm run build
npm run preview
```

O `package-lock.json` fixa as versões das dependências. Para instalação reproduzível,
use `npm ci` como alternativa a `npm install`.

## Estrutura

- `src/views`: páginas do projeto.
- `src/router/index.js`: rotas.
- `src/components`: componentes compartilhados.
- `src/utils/interface.js`: avisos, busca e sessão demonstrativa.
- `src/style.css`: estilos globais e Tailwind.
- `public`: arquivos públicos e imagem de substituição.
- `.vscode/tasks.json`: tarefas para executar pelo VS Code.

## Escopo atual

Este é um front-end demonstrativo, sem servidor e sem banco de dados.
Login e cadastro não autenticam usuários reais e não armazenam senhas.
O perfil profissional é um rascunho local, sem publicação nas listagens.
Profissionais, avaliações, distâncias e estatísticas são exemplos.
Mensagens, notificações, recuperação de senha e contratação não estão implementadas.

A pasta é entregue sem histórico `.git` para publicação em um repositório novo.
Fotos e fontes externas dependem de internet; fotos indisponíveis usam um recurso local.
Para publicar o site em um servidor, além do repositório, configure fallback das rotas
para `index.html`, pois o roteador utiliza `createWebHistory`.
