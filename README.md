# Documentação
Web Back-end - Server status PoC
Dia 1 - crie todos o C, não consegui testar pois a net caius e não consegui criar um bd no mongo, mas está bem semelhante ao anterior, mas acredito que vou ter que lincar com o projeto anterior e fazer um grande projeto. Adicionei algumas das validações necessárias, faltam as de endereço, IP etc. Revisar validações todos os dias!  

Funcionando conforme as especificações necessárias, validações e CRUD.
Somente faltando 'server disk total/used space can be obtained in a different end-point'
                 Obter o número geral de espaço disponivel para criações de novos servers? Não sei a resposta ainda!

Todas as funcionalidades CRUD estão funcionando conforme pedido, e realizam as ações que se mostram disponiveis:

Para entrar no banco e acessar cada funcionalidade você precisara de um nome e senha além do Link para entrar, solicite na aba de mensagens do gitHUb :)

Vamos começar com o primeiro método CRUD -
        *<<<<<Create>>>>>*

Para acessar esse método será necessário utilizar do Postman ou Insominia:
*C*
_Post_ -> Esse método adiciona um objeto ao banco de dados (MongoDB), esse objeto precissa dos seguinte parâmetros:
{
  *databasePort: number;
  *kafkaPort: number;
  *webserverPort: number;
  *iotHandlerPort: number;
  serverAddress: string;
  storageDirectory: string; // deve ser um folder
  emailAddress: string;
}
*Todos os ports devem ser diferente, no mesmo objeto e devem ser um número entre 1 e 65535.
Cada validação foi testada e confirmada sua veracidade!

*R*
_Get_ -> Esse método mostrará todos os objetos criados no banco de dados.
O Mongo criou um ID personalizado para cada objeto criado, é ele que utilizaremos para acessar os próximos dois métodos. 
Exemplo de Objeto criado.
{
        *"_id": "66e9b804634ead71a13e45eb",
        "databasePort": 1,
        "kafkaPort": 2,
        "webserverPort": 3,
        "iotHandlerPort": 4,
        "serverAddress": "http://exaapaleu.br",
        "storageDirectory": "/exaample/folader",
        "emailAddress": "aaau1@gmail.com",
        "__v": 0
    }
    *_id Personalizado

Teremos dois U's e vou responder em breve o porque!
*U*
_Patch_ -> Esse método atualizara o objeto desejado, sendo buscado por meio do seu *id*, então você utilizara do método _Get_, copiara o id e colocara após o local de acesso no URL:
(Exemplo de URL)
_http://localhost:2187/servers/66e9b71e634ead71a13e45e2_

Atualize a informação que quiser seguindo cada validação para que não ocorra erros.

_Put_ -> Esse método altera o objeto para sua primeira versão, a versão que você inseriu lá no _Post_. Atualizou no Patch e ficou como não era para ficar e não lembra como estava antes use do _Put_ para voltar ao backup original.
Para acessar o put você precisara colocar igual no Patch com um porém o default após o _id_
(Exemplo de URL)
http://localhost:2187/servers/66e9b804634ead71a13e45eb/default

D
_Del_-> Esse método deleta o objeto! Use direito, pois para esse não existe backup!
