# Documentação
Web Back-end - Server status PoC


Dia 1 - criei todos do CRUD, não consegui testar pois a net caiu e não consegui criar um bd no mongo, mas está bem semelhante ao anterior, mas acredito que vou ter que lincar com o projeto anterior e fazer um grande projeto. Adicionei algumas das validações necessárias, faltam as de endereço, IP etc. Revisar validações todos os dias!  

Funcionando conforme as especificações necessárias, validações e CRUD.
Somente faltando 'server disk total/used space can be obtained in a different end-point'
                 Obter o número geral de espaço disponivel para criações de novos servers? Não sei a resposta ainda!

Todas as funcionalidades CRUD estão funcionando conforme pedido, e realizam as ações que se mostram disponiveis:

Para entrar no banco e acessar cada funcionalidade você precisara de um nome e senha além do Link para entrar, solicite na aba de mensagens do gitHUb :)

Vamos começar com o primeiro método CRUD -
        *Create*

Para acessar esse método será necessário utilizar do Postman ou Insominia:

*C*
_Post_ -> Esse método adiciona um objeto ao banco de dados (MongoDB), esse objeto precissa dos seguinte parâmetros:

        {
        
        "databasePort": 1,
        
        "kafkaPort": 2,
        
        "webserverPort": 3,
        
        "iotHandlerPort": 4,
        
        "serverAddress": "http://exaapaleu.br",
        
        "storageDirectory": "/exaample/folader",
        
        "emailAddress": "aaau1@gmail.com",
        
        }

*Todos os ports devem ser diferente, no mesmo objeto e devem ser um número entre 1 e 65535.
Cada validação foi testada e confirmada sua veracidade!

  Por meio desse código:
  
    export class ServerService {
    // Propriedade para armazenar o backup temporário
    private backup: ServersDocument | null = null;
  
    constructor(@InjectModel(Servers.name) private serversModel: Model<ServersDocument>) {}
  
    async create(createServerDto: CreateServerDto): Promise<Servers> {
      const newServer = new this.serversModel(createServerDto);
    
    // Validação de server
      // Salva o backup do servidor antes de salvar o novo servidor
      this.backup = await newServer.save();  // Salva o backup do novo servidor
      return newServer;
      }
  
*R*
_Get_ -> Esse método mostrará todos os objetos da aplicação criados no banco de dados.
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

  Por meio do seguinte código:
          
          async findAll(): Promise<Servers[]> {
          
            return this.serversModel.find().exec();
          }

Teremos dois U's e vou responder em breve o porque!

*U*
_Patch_ -> Esse método atualizara o objeto desejado, sendo buscado por meio do seu *id*, então você utilizara do método _Get_, copiara o id e colocara após o local de acesso no URL:

(Exemplo de URL)

_http://localhost:2187/servers/66e9b71e634ead71a13e45e2_

Atualize a informação que quiser seguindo cada validação para que não ocorra erros.

Pelo seguinte código:

    async update(id: string, updateServerDto: UpdateServerDto): Promise<Servers> {
    // Salva o backup do servidor atual
    const currentServer = await this.serversModel.findById(id).exec();
    if (!currentServer) {
      throw new NotFoundException(`Server with id ${id} not found`);
    }
    this.backup = currentServer;

    // Atualiza o servidor
    const updatedServer = await this.serversModel.findByIdAndUpdate(
      id,
      updateServerDto,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedServer) {
      throw new BadRequestException('Error updating server.');
    }

    return updatedServer;
    }
    
_Put_ -> Esse método altera o objeto para sua primeira versão, a versão que você inseriu lá no _Post_. Atualizou no Patch e ficou como não era para ficar e não lembra como estava antes use do _Put_ para voltar ao backup original.
Para acessar o put você precisara colocar igual no Patch com um porém o default após o _id_

(Exemplo de URL)

http://localhost:2187/servers/66e9b804634ead71a13e45eb/default

Pelo seguinte código:

    async default(id: string): Promise<Servers> {
    // Verifica se o backup está disponível
    if (!this.backup) {
      throw new BadRequestException('No backup found to revert to.');
    }

    // Verifica se o servidor existe
    const existingServer = await this.serversModel.findById(id).exec();
    if (!existingServer) {
      throw new NotFoundException(`Server with id ${id} not found`);
    }

    // Reverte para o backup
    const updatedServer = await this.serversModel.findByIdAndUpdate(
      id,
      this.backup.toObject(),
      { new: true, runValidators: true }
    ).exec();

    if (!updatedServer) {
      throw new BadRequestException('Error updating server to default state.');
    }

    return updatedServer;
    }
    
D
_Del_-> Esse método deleta o objeto! Use direito, pois para esse não existe backup!

Se Você chegou até aqui você quer realmente deletar esse objeto né!?

Vamos lá!

Para deletar basta utilizar do método Del e inserir o mesmo link inserido em patch!

Pelo seguinte código:

    async remove(id: string): Promise<string> {
    const deleted = await this.serversModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Server with id ${id} not found or already deleted!`);
    }

    // Limpa o backup após deltado
    this.backup = null;
    
    return `Server with id: ${id} deleted`;
    }

Pelo seguinte código você consiguira acessa ao disk-usage do seu PC acredite isso faz a diferença no código só não sei como, mas faz!

    async getDiskUsage(): Promise<{ total: number; free: number; used: number }> {
        return new Promise((resolve, reject) => {
          disk.check('/', (err, info) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                total: info.total,
                free: info.free,
                used: info.total - info.free
              });
            }
          });
        });
      }
    
E è isso essas são todas as funcionalidades desse software no demais é bom pra testar conhecimento e aprimorar em TS, Mongodb, CRUD e as funcionalidades de bancos de dados NoSQL.

Tive uma melhora bem significativa com o JS principlamente em entender como cada informação passa pelo código e as interações que acontece por trás de cada Query.
Observei que tive uma melhora bastante boa em achar erros e problemas que podem estar acontecendo para que a aplicação ocorra corretamente em cada requisição.

*_DGOut!_*

🤠🤠🤠🤠🤠🤠🤠🤠 🤠🤠🤠🤠🤠🤠🤠 
