# Trabalho-de-app

- Nome: Platinium
- objetivo: Ser uma rede social focada em fóruns de conversa (semelhante a aplicativos como discord e reddit) focado principalmente em dúvidas sobre assuntos diversos (jogos, filmes, até fóruns de escola) que vai contar com chats públicos, posts, comentários e etc.
- ## tabelas:
  - User(Nickname, username, password, description) (código será feito todo em inglês por convenção)
  - Forum(Name, tags, id)
  - post(Title, Message, anexos, id, id_forum, id_user)
  - Chat(name, description, id)
  - message(ou comment)(user, id, content)
 
  - Follow(id_followed, id_follow)
  - like/dislike(Like(boolean or null), id_message, id_user)
 
  Alguns atributos podem ser adicionados conforme o projeto vai ficando mais complexo.
- ## Coisas que talvez sejam adicionadas
  - like e dislike
  - capacidade de seguir um fórum
  - mensagens privadas a uma pessoa
  - cargos (moderação e membros)
  - capacidade de adicionar links
  - personalização de forum (temas, imagens, etc)
  - anexos (imagens, arquivos, vídeos)

 - ## Aplicativos/linguagens usados
   - ### Aplicativos:
     - Pgadmin
     - VsCode
     - Node.JS
   - ### Linguagens
     - HTML/CSS
     - Javascript
     - Sql (postgrees)
