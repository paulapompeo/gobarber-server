# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um e-mail com intruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios de email em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2hrs;
- O usuário precisa confirmar a nova senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha (e foto);

**RN**

- O usuárionão pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seu agendamentos de um dia específico;
- O usuário deve receber uma notificação sempre que houver um novo agendamento;
- O usuário deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestado devem ser enviadas em tempo real utilizando Socket.io(protocolo em tempo real);

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os pretadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponívelde um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador de serviço;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 8h e as 18h (Primeiro às 8h, último as 17h);
- O usuário não podem agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar horarios consigo;


# Bancos a serem utilizados na aplicação: 

- Postgress
ex: Aluno, Video, Curso, Modulo
- MongoDB -> muitos dados e pouco relacionamento entre esses dados
ex: progresso do aluno -> 10% video x
ex: notificações
- Redis -> informações que são temporárias
ex: cache, filas



- Amazon S3 = CDN (Content Delivery Network) 
Utilizado somente em ambiente de produção. Quando colocamos a aplicação no ar, os servidores são muito otimizados (muita performance e pouco espaço em disco) -> SSD (10gb, 20gb), então não salvamos imagens (entre outros) na nossa aplicação. 
O node tem uma facilidade muito grande quando precisamos escalar nossa aplicação.

Escala vertical -> Aumenta os recursos (memória, processamento).
Escala horizontal -> Cria um novo servidor (distribuição de carga).

e para isso utilizamos um CDN.


- Redis

uma unica grande tabela contendo chave e valor

{
  "appointmensts-list-PROVIDER_ID-05-10-2020"
}

iremos configurar o cache provider da nossa aplicação. Isso vai permitir que a aplicação faça queries no banco postgres apenas quando os dados dentro de uma determinada tabela mudarem, e quando isso não acontecer é o redis quem irá nos prover os dados. Isso porque ele é mais rápido que o postgres e evita que nossa aplicação perca tempo fazendo queries desnecessárias.




